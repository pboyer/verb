// Header for verb for JavaScript
// Borrowed from browserify, this header supports AMD (define) and common js (require) style modules

(function(f){
    if(typeof exports==="object"&&typeof module!=="undefined"){
        module.exports=f()
    } else if(typeof define==="function"&&define.amd){
        define([],f)
    } else {
        var g;
        if(typeof window!=="undefined"){
            g=window
        } else if(typeof global!=="undefined"){
            g=global
        } else if(typeof self!=="undefined"){
            g=self
        } else{
            g=this
        }

        g.verb = f()
    }
})(function(){
    var verb = {};

    var global = this;

    var isBrowser = new Function("try {return this===window;}catch(e){ return false;}");
    var isNode=new Function("try {return this===global;}catch(e){return false;}");
    var isWebworker=new Function("try {return typeof importScripts === 'function';}catch(e){return false;}");

    // node.js context, but not WebWorker
    if ( isNode() && !isWebworker() ){
        Worker = require('webworker-threads').Worker;
    }

    // WebWorker or node.js context
    if ( isNode() || isWebworker() ){

        var window = global; // required for promhx

        // WebWorker
        if ( isWebworker() ){

            var lookup = function(className, methodName){

                var obj = global;

                className.split(".").forEach(function(x){
                    if (obj) obj = obj[ x ];
                });

                if (!obj) return null;

                return obj[ methodName ];
            }

            onmessage = function( e ){

                if (!e.data.className || !e.data.methodName) return;

                var method = lookup( e.data.className, e.data.methodName );

                if (!method){
                    return console.error("could not find " + e.data.className + "." + e.data.methodName)
                }

                postMessage( { result: method.apply( null, e.data.args ), id: e.data.id } );

            };
        }
    }
