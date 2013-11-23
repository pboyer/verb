if ( typeof exports != 'object' || exports === undefined )  // browser context
{
	importScripts('labor.js');  
}
else // node.js context
{
	var labor = require('labor');
}

var verb = verb || {};
verb.eval = verb.eval || {};
verb.eval.nurbs = verb.eval.nurbs || {};
verb.eval.mesh = verb.eval.mesh || {};
verb.geom = verb.geom || {};
verb.EPSILON = 1e-8;
verb.TOLERANCE = 1e-3;

var router = new labor.Router(verb.eval.nurbs);