var fs = require('fs')
    , path = require('path')
    , glob = require('glob');

//glob("../src/verb/**/*.hx", (er, files) => {
//    files.forEach((srcfn) => {
//        console.log( "parsing: " + srcfn );
//        parse(srcfn);
//    });
//});

//parse( path.join( __dirname, "../src/verb/core/types/DoublyLinkedListExtensions.hx") );  

exports.parse = parse;

function parse(srcfn){

    console.log("Parsing ", srcfn);
    var input = fs.readFileSync( srcfn, "utf8" ); 
    
    var tokenStream = new TokenStream( input );
    var parser = new Parser( tokenStream );

    return parser.parse();
}

//
// An incomplete parser for Haxe powerful enough to aid in 
// constructing documentation
//

function Parser( tokenStream ){
   
    var debug = false;

    var currentToken, lastComment, types = [];
   
    function isAnyOf( type, possibleTypes ){
        for(var i = 0; i < possibleTypes.length; i++) {
            if ( possibleTypes[i] === type ){ 
                return true;
            }
        }
    
        return false;
    }

    function error( message ){
        throw new Error( message + 
            "\nAt line: " + currentToken.line + ", col: " +  currentToken.col + "\n\n" +
            tokenStream.neighborhood()
        );
    }

    function consume( expectedType ){
        currentToken = tokenStream.consume();

        if (debug) console.log("currentToken", currentToken);

        if ( expectedType && !isAnyOf( currentToken.type, Array.prototype.slice.call(arguments) )){
            error( "syntax error - expected \"" + Array.prototype.join.call( arguments, ", ") + "\", but got \"" + currentToken.type + "\"" ); 
        } 

        return currentToken;
    }

    function peak(){
        return tokenStream.peak();
    }

    function parseExtendsList(){
        
        consume("extends");

        return parseIdList();
    }
   

    function parseExtends(){
        
        consume("extends");

        // get the type name
        var r = consume();
        return r.contents;
    }
   
    function parseIdList(){

        var idlist = []
            , peaked;

        do {
            consume();

            if ( currentToken.type === "id" ){
                idlist.push( currentToken.contents );
            }
        } while ( (peaked = peak()) && (peaked.type === "id" || peaked.type === ",") )

        return idlist;
    }

    function parseImplements(){
         
        consume("implements");
        return parseIdList();

    }

    function parseClass( visibility ){
     
        // get visibility from current token or default
        visibility = visibility || "public";
        
        consume("class");  
       
        // get the type name for the class
        var typeName = consume().contents;
    
        // build the class type
        var def = new Class( typeName, visibility ); 
        def.line = currentToken.line;
    
        // set the description
        def.description = getLastComment();

        var peaked = peak(); 
        var parsedExtends = false;
    
        // parent class
        if ( peaked.type === "extends" ){
            parsedExtends = true;
            def.parentClass = parseExtends();
            peaked = peak();
        }
        
        // parse interfaces
        if ( peaked.type === "implements" ){
            def.interfaces = parseImplements();                       
            peaked = peak();
        }
 
        // parent class
        if ( peaked.type === "extends" ){
            if (parsedExtends) error("Duplicate extends encountered");
            def.parentClass = parseExtends();
        }       

        parseClassBody( def );

        if (debug) console.log(def);

        return def; 
    }

    function consumeBlock(){

        consume("{");
        var parenCount = 1;

        while ( parenCount != 0 ){
            consume();

            if (currentToken.type === "{") {
                parenCount++;
            } else if (currentToken.type === "}"){
                parenCount--;
            }
        }
    }

    function consumeWhile(){
        
        var possibleTypes = Array.prototype.slice.call(arguments);
        
        var consumed = [];
        while (isAnyOf( peak().type, possibleTypes)){
            consumed.push(consume.apply(null, arguments));
        }
        return consumed;
    }

    function consumeIf(){

        var possibleTypes = Array.prototype.slice.call(arguments);
        var peaked = peak();
        if (isAnyOf(peaked.type, possibleTypes)) consume();
    }

    function consumeUntil(){

        var possibleTypes = Array.prototype.slice.call(arguments);
        var peaked;
        while ( (peaked = peak()) && !isAnyOf( peaked.type, possibleTypes) ){
            consume();
        }
    }

    function consumeUntilInclusive(char){
        consumeUntil(char);
        consume(char);
    }

    function parseProperty( isStatic ){

        var currentLine = currentToken.line;

        consume("var");

        var name = consume().contents;
        var type;

        var peaked = peak();
        
        if (peaked.type === ":"){
           
            consume(":");
            type = consume("id").contents; 
            peaked = peak();
            
        }
       
        consumeUntilInclusive(";");

        var prop = new Property( name, type, getLastComment() ); 
        prop.line = currentLine;
        return prop;
    }
  
    function parseMethodArgument(){
    
        // id : Type = expression
        var name = consume("id").contents;
      
        var peaked = peak();

        var type;
        if (peaked.type === ":"){
            type = parseTypeAnnotation();
            peaked = peak();
        }

        var defaultVal;
        if (peaked.type === "="){    
            consume("=");
            defaultVal = consume("number", "string", "boolean", "null").contents; 
        }

        return new MethodArgument(name, type, defaultVal);
    }

    function parseTypeAnnotation(){
        consume(":");
        var ids = consumeWhile("id","->");
        return ids.reduce((a,x) => x.contents + a, "");
    }

    function parseMethodArguments(){

        // ( methodArgument, methodArgument )
        consume("(");

        var peaked, args = [];

        while ( (peaked = peak()) && peaked.type != ")"){
            
            if (peaked.type === "id"){
                args.push( parseMethodArgument() );
            } else if (peaked.type === ","){
                consume(","); // consume the ","
            } else {
                error("Failed to parse method arguments!");                
            }

        }
       
        consume(")");
        return args;
    }

    function getLastComment(){

        var lc = lastComment;
        lastComment = undefined;
        return lc ? lc.contents : lc;

    }

    function parseMethod( isStatic ){
    
        var currentLine = currentToken.line;

        // function MethodName( methodArgument, methodArgument ) : ExpectedType { ... } 
        consume("function");

        var name = consume("id", "new").contents;
        
        var args = parseMethodArguments();

        peaked = peak();
   
        var type;
        if (peaked.type === ":"){
           type = parseTypeAnnotation(); 
        }
    
        consumeBlock();

        var method = new Method( name, args, type, getLastComment() );
        method.line = currentLine;
        method.isStatic = isStatic;
        return method;
    }

    function parseClassMember( def, visibility ){

        // parse "public" or "private"
        var visibility = visibility ? visibility : consume("visibility").contents;     

        // hack to ignore private members
        if ( visibility === "private"){
            def = new Class();
        }

        var peaked = peak();
        var isStatic = false;
    
        if ( peaked.type === "static" ){
            isStatic = true;
            
            consume("static");
            peaked = peak();
        }

        if ( peaked.type === "inline" ){
           
            // TODO - parse inline
            consume("inline");
            peaked = peak();
        }
        
        if ( peaked.type === "var" ){
            return def.properties.push( parseProperty( isStatic ));
        } else if (peaked.type === "function"){
            return def.methods.push( parseMethod( isStatic )); 
        }

        throw new Error("Unknown class member encountered" + JSON.stringify( peaked ));
    }

    function parseClassBody( def ){

        consume("{");

        var peaked; 

        while ( (peaked = peak()) && peaked.type != "}"){
            if (peaked.type === "comment"){    
                parseComment();
                continue;
            } else if (peaked.type === "visibility"){
                parseClassMember( def );
                continue;
            } else if (peaked.type === "function"){
                parseClassMember( def, "private" );
                continue;
            } else if (peaked.type === "var"){
                parseClassMember( def, "private" );
                continue;
            } else if (peaked.type === "static"){
                parseClassMember( def, "private" );
                continue; 
            }

            consume();
        }

        consume("}");
    }

    function parseMethodDefinition(){
    
        // function MethodName( methodArgument, methodArgument ) : ExpectedType; 
        consume("function");

        var currentLine = currentToken.line;
        var name = consume("id", "new").contents;
        
        var args = parseMethodArguments();

        peaked = peak();
   
        var type;
        if (peaked.type === ":"){
           type = parseTypeAnnotation(); 
        }
    
        consumeUntilInclusive(";");

        var method = new Method( name, args, type, getLastComment() );
        method.line = currentLine;
        return method;
    }

    function parseInterfaceMember( def, visibility ){

        var visibility = visibility ? visibility : consume("visibility").contents;     

        // hack to ignore private members
        if ( visibility === "private"){
            def = new Interface();
        }

        var peaked = peak();
    
        if ( peaked.type === "var" ){
            return def.properties.push( parseProperty());
        } else if (peaked.type === "function"){
            return def.methods.push( parseMethodDefinition()); 
        }

        throw new Error("Unknown interface member type encountered" + JSON.stringify( peaked ));
    }
    
    function parseInterfaceBody( def ){

        consume("{");

        var peaked; 

        while ( (peaked = peak()) && peaked.type != "}"){
            if (peaked.type === "comment"){    
                parseComment();
                continue;
            } else if (peaked.type === "visibility"){
                parseInterfaceMember( def );
                continue;
            } else if (peaked.type === "function"){
                parseInterfaceMember( def, "public" );
                continue;
            }  

            consume();
        }

        consume("}");
    }

    function parseInterface( visibility ){

        visibility = visibility || "public";
        
        consume("interface");  
       
        // get the type name for the class
        var typeName = consume().contents;
    
        var def = new Interface( typeName, visibility ); 
        def.line = currentToken.line; 
        def.description = getLastComment();
        
        if ( peak().type === "extends" ){
            def.interfaces = parseExtendsList();
        }
        
        parseInterfaceBody( def );

        if (debug) console.log( def );

        return def; 
    }

    function parseTypedefBody( def ){

        def.isAnonymousObject = true;
        consume("{");

        var peaked; 

        while ( (peaked = peak()) && peaked.type != "}"){
            if (peaked.type === "comment"){    
                parseComment();
                continue;
            } else if (peaked.type === "var"){
                def.anonymousObject.properties.push(parseProperty());
                continue;
            } 

            consume();
        }

        consume("}");
    }

    function parseTypedef( visibility ){
      
        visibility = visibility || "public";
        
        consume("typedef");  
       
        var typeName = consume().contents;
   
        consume("=");

        var def = new Typedef( typeName, visibility ); 
        def.line = currentToken.line;
        def.description = getLastComment();
      
        // anonymous object body
        if (peak().type === "{"){
            parseTypedefBody( def );
        } else {
           def.alias = consume("id").contents;
        }

        if( debug ) console.log( def );

        return def; 
    }

    function parseComment() {
        var squashed = consume("comment");

        var peaked;
        while ( (peaked = peak()) && peaked.type === "comment" ){
            currentToken = consume();
            
            squashed.contents += "\n";
            squashed.contents += currentToken.contents; 
        }
    
        return lastComment = squashed;
    }

    function parseType(){ 
        
        var peaked = peak();
        var visibility = "public";
        
        if (peaked.type === "visibility"){
            consume("visibility");
            peaked = peak();
        }

        if (peaked.type === "class"){
            return parseClass( visibility ); 
        } else if (peaked.type === "interface"){
            return parseInterface( visibility ); 
        } else if (peaked.type === "typedef"){
            return parseTypedef( visibility );    
        } 

        error("Parser for type not implemented");    
    }
    
    this.parse = () => {
       
        var peaked;

        var types = [];
    
        while ( (peaked = peak()) ){
            if (peaked.type === "expose"){
                consume("expose"); 
                types.push( parseType() ); 
            } else if (peaked.type === "class"){
                parseClass(); 
            } else if (peaked.type === "typedef"){
                types.push( parseTypedef() ); 
            } else if (peaked.type === "interface"){
                types.push( parseInterface() ); 
            } else if ( peaked.type === "visibility" ){
                if (peaked.contents === "private") {
                    // parse, but don't add to types
                    parseType();
                    continue;
                }
                types.push( parseType() ); 
            } else if (peaked.type === "comment"){
                parseComment();
            } else {
                consume();
            }
        }

        return types;
    }
}

function TokenStream( input ){

    // token state
    var i = 0;
    var peaking = false;
    var line = 1;
    var col = 0;

    // helpers
    var isNumeric = (c) => c === "." || c=== "+" || c === "-" || (c <= '9' && c >= '0');
    var isInnerNumeric = (c) => isNumeric(c) || c === "e" || c === "E";
    var isWhitespace = (c) => c === '\n' || c === '\t' || c === ' ';
    var isComment = (c) => c === '/';
    var isSeparator = (c) => c === ";" || c === "(" || c === ")" || c === "{" || c === "}" || c === "," || c === ":" || c === "="; 
    var isLineEnd = (c) => c === '\n';
    var isAlpha = (c) => (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || c === "_";
    var make = (type, contents) => ({ type : type, contents : contents, line: line, col: col });
    var categorizeId = (s) => {

        if (s === "class"){
            return make(s,s);
        } else if (s === "interface") {
            return make(s,s);
        } else if (s === "true"){
            return make("boolean", s);
        } else if (s === "false"){
            return make("boolean", s);
        } else if (s === "private"){
            return make("visibility", s);
        } else if (s === "public"){
            return make("visibility", s);
        } else if (s === "extends"){
            return make(s,s);
        } else if (s === "implements"){
            return make(s,s);
        } else if (s === "typedef"){
            return make(s,s);
        } else if (s === "function"){
            return make(s,s);
        } else if (s === "static"){
            return make(s,s);
        } else if (s === "new"){
            return make(s,s);
        } else if (s === "null"){
            return make(s,s);
        } else if (s === "var"){
            return make(s,s);
        } else if (s === "inline"){
            return make(s,s);
        }

        return make("id", s); 
    };

    var lastNewLine = 0;
    var inc = () => {
        if (!peaking){
            col++;

            if (input.charAt(i) === '\n'){
                lastNewLine = i;
                line++;
                col = 0;
            } 
        }
        i++;
        return i;
    };

    // functions
    this.empty = () => i >= input.length;
    this.peak = () => {
        peaking = true;
        var m = i;
        var t = this.consume();
        i = m;
        peaking = false;
        return t;
    };
    this.neighborhood = () => {
        
        var currentChar, nextNewLine = i;
        while ( (currentChar = input.charAt(nextNewLine++)) && currentChar != "\n"){}
        
        var snapshot = input.slice( lastNewLine, nextNewLine );
        var positionIndicator = "";
        for (var j = 0; j < (i - lastNewLine - 1); j++) positionIndicator += " ";
        positionIndicator += "^";
        
        return input.slice( lastNewLine, nextNewLine ) + "\n" + positionIndicator; 

    }
    this.consume = () => {
       
        var c = input.charAt(i);
        var s;

        while ( c ){
            
            s = "";
            c = input.charAt(i);
          
            // Separators
            if ( isSeparator( c ) ){
                
                inc();
                return make(c,c); 

            }
            // @
            else if ( c === "@" ){

                while ( c && !isWhitespace(c) ){
                    s += c;
                    c = input.charAt(inc());
                }

                return make("expose", s);
            }
            // Name
            else if ( isAlpha(c) ){

                var genericNestingDepth = 0;
    
                while ( c &&
                    // this is ugly code, but allows us to handle generic types with multiple 
                    // generic parameters with spaces and commas as we would any other type
                    (!isWhitespace(c) || (genericNestingDepth > 0 && c === " ")) && 
                    (!isSeparator(c) || (genericNestingDepth > 0 && (c === "," || c === ":" || c === "(" || c === ")")))){
                    
                    if (c === "<") genericNestingDepth++;
                    else if (c === ">") genericNestingDepth--;

                    s += c;
                    c = input.charAt(inc());
                }

                return categorizeId(s);
            }
            // ->
            else if ( c === "-" && input.charAt(i+1) === ">" ){
                s += c;
                inc();
                s += c;
                return make("id",s);
            // String
            } else if ( c === "\"" ){

                inc(); 
                while ( c && c != "\""){
                    s += c;
                    c = input.charAt(inc());
                }

                return make("string", s);
            // Numbers
            } else if ( isNumeric( c ) ){
                
                while ( c && isNumeric(c) ){
                    s += c; 
                    c = input.charAt(inc()); 
                }

                return make("number", s);
            // /* */ Comment
            } else if (isComment(c) && input.charAt(i+1) === "*") {

                inc();
                inc();

                // consume comments
                while ( c && !(c === "*" && input.charAt(i+1) === "/") ){
                    s += c;
                    c = input.charAt(inc());
                }
                
                return make("comment", s.slice(0,-1));    

            // // style Comment
            } else if (isComment(c) && isComment(input.charAt(i+1))) {

                // trim comments
                while (isComment(input.charAt(i))){ inc() } 
                
                c = input.charAt(i);

                // consume comments
                while ( c && !isLineEnd(c) ){
                    s += c;
                    c = input.charAt(inc());
                }
                
                return make("comment", s);    

            }
       
            inc();
        }
            
        return null;
    }
}

function Method(name, args, returnType, description){
    this.$type = "Method";
    this.name = name;
    this.isStatic = false;
    this.description = description || "";
    this.args = args || [];
    this.returnType = returnType;
}

function MethodArgument(name, type, defaultValue){
    this.$type = "MethodArgument";
    this.name = name;
    this.type = type;
    this.defaultValue = defaultValue;
}

function Property(name, type, description){
    this.$type = "Property";
    this.name = name;
    this.type = type;
    this.description = description;
    this.isStatic = false;
    this.value = undefined;
}

function Typedef(name, alias){
    this.$type = "Typedef";
    this.name = name;
    this.alias = alias;
    
    this.isAnonymousObject = false;
    this.anonymousObject = {};
    this.anonymousObject.properties = [];
}

function Enum(name, fields){
    this.$type = "Enum";
    this.name = name;
    this.fields = fields;
}

function Interface(name){
    this.$type = "Interface";
    this.name = name;
    this.description = "";
    this.properties = [];
    this.methods = [];
}

function Class(name, visibility){
    this.$type = "Class";
    this.visibility = visibility; 
    this.name = name;
    this.description = "";
    this.methods = [];
    this.parentClass = undefined;
    this.interfaces = [];
    this.properties = [];
}

