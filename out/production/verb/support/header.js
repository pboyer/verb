// browser context
if ( typeof exports != 'object' || exports === undefined )
{
    // todo fix this
	var verb = exports = {};
} else  {
	var Worker = require('webworker-threads').Worker;
}

// web worker context
if ( typeof window != 'object'){

	var global = this;
	var lookup = function(className, methodName){

		var obj = global;

		className.split(".").forEach(function(x){
			if (obj) obj = obj[ x ];
		});

		if (!obj) return null;

		return obj[ methodName ];
	}

	onmessage = function( e ){

		var method = lookup( e.data.className, e.data.methodName );

		if (!method){
			return console.error("could not find " = e.data.className + "." + e.data.methodName)
		}

		postMessage( { result: method.apply( null, e.data.args ), id: e.data.id } );

	};
}