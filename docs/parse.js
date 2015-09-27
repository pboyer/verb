var fs = require('fs')
    , path = require('path');

parse( path.join( __dirname, "../src/verb/geom/NurbsCurve.hx") );  

function parse(srcfn){

    var input = fs.readFileSync( srcfn, "utf8" ); 

    console.log("being parse");

//    var input = "// ok please do \n public class Foo extends Bar implements Bong, Bing, Bop {";
    
    var tokenStream = new TokenStream( input );
    var parser = new Parser( tokenStream );

    return parser.parse();
}
function Parser( tokenStream ){
    
    var currentToken, lastComment, types = [];
    
    function read(){
        currentToken = tokenStream.read();
         // console.log("current token is" + JSON.stringify(currentToken));
        return currentToken;
    }

    function peak(){
        return tokenStream.peak();
    }

    function parseExtends(){
        // consume "extends"
        read();

        // get the type name
        var r = read();
        return r.contents;
    }
    
    function parseImplements(){
        
        // consume "implements"
        read();
        
        var typeNames = [];

        while ( currentToken.type != "{" ){
            
            read();

            if ( currentToken.type === "identifier" ){
                typeNames.push( currentToken.contents );
            }
        }

        return typeNames;
    }

    function parseClass( visibility ){
      
        // get visibility from current token or default
        visibility = visibility || "public";
        
        // consume "class"
        read();  
       
        // get the type name for the class
        var typeName = read().contents;
    
        // build the class type
        var classDef = new Class( typeName, visibility ); 
    
        // set the description
        if (lastComment){
            classDef.description = lastComment 
        
            // don't reuse the lastComment
            lastComment = undefined;
        }

        var peaked = peak(); 

        // parent class
        if ( peaked.type === "extends" ){

            classDef.parentClass = parseExtends();
            
            // look further ahead
            peaked = peak();
        }
        
        // implements
        if ( peaked.type === "implements" ){
            classDef.interfaces = parseImplements();                       
        }
        
        parseClassBody( classDef );

        console.log(classDef);

        return classDef; 
    }

    function parseClassBody( classDef ){

        

    }

    function parseTypeDefinition(){ 
        var visibility = read().contents;

        var peaked = peak();
        
        if (peaked.contents === "class"){
           return parseClass(); 
        }

        // throw new Error("Not implemented");    
    }

    function parseComment() {
        var squashed = read();

        while ( peak().type === "comment" ){
            currentToken = tokenStream.read();

            squashed.contents += "\n";
            squashed.contents += currentToken.contents; 
        }
    
        return lastComment = squashed;
    }
    
    this.parse = () => {
       
        var peaked;

        while ( (peaked = peak()) ){
            if (peaked.type === "class"){
                types.push( parseClass() ); 
            } else if ( peaked.type === "visibility" ){
                types.push( parseTypeDefinition() ); 
            } else if (peaked.type === "comment"){
                parseComment();
            } else {
                read();
            }
        }

        return types;
    }
}

function TokenStream( input ){

    // token state
    var i = 0;

    // helpers
    var isNumeric = (c) => c === "." || c=== "+" || c === "-" || (c <= '9' && c >= '0');
    var isInnerNumeric = (c) => isNumeric(c) || c === "e" || c === "E";
    var isWhitespace = (c) => c === '\n' || c === '\t' || c === ' ';
    var isComment = (c) => c === '/';
    var isSeparator = (c) => c === "(" || c === ")" || c === "{" || c === "}" || c === "," || c === ":" || c === "="; 
    var isLineEnd = (c) => c === '\n';
    var isAlpha = (c) => (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z');
    var make = (type, contents) => ({ type : type, contents : contents || type });
    var categorizeId = (s) => {

        if (s === "class"){
            return make(s);
        } else if (s === "private"){
            return make("visibility", s);
        } else if (s === "public"){
            return make("visibility", s);
        } else if (s === "extends"){
            return make(s);
        } else if (s === "implements"){
            return make(s);
        } else if (s === "typedef"){
            return make(s);
        } else if (s === "function"){
            return make(s);
        } else if (s === "new"){
            return make(s);
        }

        return make("identifier", s); 

    }

    // functions
    this.empty = () => i >= input.length;
 
    this.peak = () => {
        var m = i;
        var t = this.read();
        i = m;
        return t;
    };

    this.read = () => {
       
        var c = input.charAt(i);
        var s;

        while ( c ){
            
            s = "";
            c = input.charAt(i);
          
            // Separators
            if ( isSeparator( c ) ){
                
                i++;
                return make(c); 

            }
            // Numbers
            else if ( isNumeric( c ) ){
                
                while ( c && isNumeric(c) ){
                    s += c; 
                    c = input.charAt(++i); 
                }

                return make("number", s);
            }
            // Name
            else if ( isAlpha(c) ){

                while ( c && !isWhitespace(c) && !isSeparator(c)){
                    s += c;
                    c = input.charAt(++i);
                }

                return categorizeId(s);

            // Comment
            } else if (isComment(c) && isComment(input.charAt(i+1))) {

                // trim comments
                i += 2;
                c = input.charAt(i);
            
                // trim starting whitespace
                while ( c && isWhitespace(c) ){
                    c = input.charAt(++i);
                }

                // read comments
                while ( c && !isLineEnd(c) ){
                    s += c;
                    c = input.charAt(++i);
                }

                return make("comment", s);    

            }
       
            i++;
        }
            
        return null;
    }
}

function Method(name, args, returnType, description){
    this.name = name;
    this.description = "";
    this.args = args || [];
    this.returnType = returnType;
}

function MethodArgument(name, type, description){
    this.name = name;
    this.type = type;
    this.description = description;
}

function Typedef(name){
    this.name = name;
}

function Enum(name, fields){
    this.name = name;
    this.fields = fields;
}

function Interface(name){
    this.name = name;
    this.description = "";
    this.methods = [];
}

function Class(name, visibility){
    this.visibility = visibility; 
    this.name = name;
    this.description = "";
    this.methods = [];
    this.parentClass = undefined;
    this.interfaces = [];
    this.properties = [];
}


