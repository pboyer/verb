/**
 * Index / Entry point for the VERB-NURBS package.
 */

// provide window as required by the promhx library
if (typeof window === "undefined") {
  var window = global;
}

// setup the promise handling for async method invocations
const lookup = function(className, methodName){
  var obj = { verb: verb };

  className.split(".").forEach(function(x){
    if (obj) obj = obj[ x ];
  });

  if (!obj) return null;

  return obj[ methodName ];
}

const onmessage = function( e ) {
  if (!e.data || !e.data.className || !e.data.methodName) return;

  const method = lookup( e.data.className, e.data.methodName );

  if (!method){
    return console.error("could not find " + e.data.className + "." + e.data.methodName)
  }

  postMessage( { result: method.apply( null, e.data.args ), id: e.data.id } );
}


// provide the Worker class for async library functions
if (typeof Worker === "undefined") {
  var Worker = require("web-worker")
}

// import and re-export the Javascript library
const verb = require('./verbHaxe.js');

module.exports = verb
