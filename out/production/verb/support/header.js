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
	onmessage = function( e ){
		postMessage( { result: verb.core[ e.data.className ][ e.data.methodName ].apply( null, e.data.arguments ), id: e.data.id } );
	};
}