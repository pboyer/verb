if ( typeof exports != 'object' || exports === undefined )  // browser context
{
	var VERB = {}
		, numeric = window.numeric
		, binomial = window.binomial
		, labor = window.labor;
}
else // node.js context
{
	var VERB = module.exports = {}
		, numeric = require('numeric')
		, binomial = require('binomial')
		, labor = require('labor')
}

VERB.geom = {};
VERB.core = {};
VERB.eval = {};

VERB.init = function() {

	VERB.nurbs_engine = new VERB.core.Engine( VERB.eval.nurbs );
	VERB.geom.NURBSGeometry.prototype.nurbs_engine = VERB.nurbs_engine;
	
}
