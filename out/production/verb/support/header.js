// browser context
if ( typeof exports != 'object' || exports === undefined )
{
    // todo fix this
	var verb = exports = {};
} else  {
	var verb = module.exports = {};
}

//class Router
//{
//
//    if ( arguments.callee._singletonInstance )
//        return arguments.callee._singletonInstance;
//
//    arguments.callee._singletonInstance = this;
//
//    this.lib = library;
//
//    var self = this;
//
//    onmessage = function( e ){
//        postMessage( { result: self.lib[ e.data.func ].apply( null, e.data.arguments ), id: e.data.id } );
//    };
//
//}
//
