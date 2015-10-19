var glob = require('glob')
    , mkdirp = require('mkdirp')
    , fs = require('fs')
    , path = require('path')
    , rimraf = require('rimraf')
    , _ = require('underscore')
    , parseHaxe = require('./parse').parse;
    
//
// CONSTANTS
//

var REPO_URL = "https://github.com/pboyer/verb/";
var TARGET_DIR = __dirname + "/docs"; 
var SRC = path.resolve(__dirname, "..", "src/verb");
var HX_GLOB = SRC + "/*/*.hx";
var HX_EXT = ".hx";
var MD_EXT = ".md";
var TEMPLATE_SRC = fs.readFileSync(path.join(__dirname, "template.md"), "utf8");
var TEMPLATE = _.template( TEMPLATE_SRC );

//
// THE ACTUAL SCRIPT
//

// Remove the existing docs directory, if present

if (fs.existsSync(TARGET_DIR)) {
    console.log("REMOVING TARGET DIRS: ", TARGET_DIR);
    
    getDirectories(TARGET_DIR)
        .map((d) => path.join(TARGET_DIR, d))
        .forEach( rmdir );
} 

// Get all of the hx files, and generate their md files

glob(HX_GLOB, (er, files) => {
    
    // for each file, generate the corresponding doc file
    files.forEach((srcfn) => {
        // remove the trailing file name
        var cleanfn = srcfn.slice( SRC.length ).slice(0, -HX_EXT.length);

        // build the name of the output file
        var outputfn = TARGET_DIR + cleanfn + MD_EXT;
        
        // make the doc file
        gen( srcfn, outputfn );
    });
});

// 
// HELPERS
//

function gen(srcfn, outputfn) {
    console.log("GEN: ", outputfn);

    // make the directory (doing nothing if it already exists) 
    mkdirp.sync( path.dirname( outputfn ) );
   
    // compile the doc file
    compile(srcfn, outputfn);
};

function compile(srcfn, outputfn){

    var parsed = parseHaxe(srcfn); 
    if (parsed.length === 0) return;
    
    var stream = fs.createWriteStream(outputfn);

    // build the url of the file on github
    var index0 = srcfn.indexOf("src/verb"); 
    var fn = srcfn.slice( index0 );
    var loc = REPO_URL + "blob/master/" + fn + "/";  // verb/Verb.hx/

    var sfn = fn.slice(9, -3);
    var index1 = sfn.lastIndexOf("/");
    var name = sfn.slice(0, index1);
    var index2 = name.lastIndexOf("/");
    var namespace = name.slice(0, index1);

    writeln(stream,TEMPLATE({ types: parsed, sourceFile: loc, fn : fn, namespace : namespace }));
    stream.end();
}

function writeln(stream, text){
    return stream.write(text+ "\n");
}

function rmdir(dirpath){
    console.log("REMOVING DIRECTORY: ", dirpath);
    rimraf.sync(dirpath); 
}

function getDirectories(srcpath) {
    return fs.readdirSync(srcpath).filter((file) => {
        return fs.statSync(path.join(srcpath, file)).isDirectory();
    });
}
