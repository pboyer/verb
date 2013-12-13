if ( typeof exports != 'object' || exports === undefined )  // browser context
{
	importScripts('labor.js');  
	importScripts('binomial.js');  
	importScripts('numeric-1.2.6.min.js');  
}
else // node.js context
{
	var labor = require('labor');
}

var verb = verb || {};
verb.eval = verb.eval || {};
verb.eval.nurbs = verb.eval.nurbs || {};
verb.eval.mesh = verb.eval.mesh || {};
verb.eval.geom = verb.eval.geom || {};
verb.geom = verb.geom || {};
verb.EPSILON = 1e-8;
verb.TOLERANCE = 1e-3;

var router = new labor.Router(verb.eval.nurbs);

numeric.normalized = function(arr){
	return numeric.div( arr, numeric.norm2(arr) );
}

numeric.cross = function(u, v){
	return [u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]];
}