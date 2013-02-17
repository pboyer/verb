if ( typeof exports != 'object' || exports === undefined )  // browser context
{
	var VERB = window.VERB;
}
else // node.js context
{
	var VERB = module.exports = {};

}

(function( VERB ) {

	VERB.geom = {};
	VERB.core = {};
	VERB.eval = {};

	VERB.nurbs_engine = new VERB.core.Engine( VERB.eval.nurbs );

})( VERB );
