// browser context
if ( typeof exports != 'object' || exports === undefined )  
{
	var verb = {}
		, numeric = window.numeric
		, binomial = window.binomial
		, labor = window.labor
		, _ = window.underscore;
}
// node.js context
else 
{
	var verb = module.exports = {}
		, numeric = require('numeric')
		, binomial = require('binomial')
		, labor = require('labor')
		, _ = require('underscore');
}

// Initialize the verb namespace objects
verb.geom = verb.geom || {};
verb.core = verb.core || {};
verb.eval = verb.eval || {};
verb.intersect = verb.intersect || {};
verb.eval.nurbs = verb.eval.nurbs || {};
verb.eval.geom = verb.eval.geom || {};
verb.eval.mesh = verb.eval.mesh || {};

// ####verb.EPSILON
//
// Used for numeric comparisons
verb.EPSILON = 1e-8;

// ####verb.TOLERANCE
//
// Default tolerance for geometric operations - defines "close enough" 
// for tesselation, intersection, and more
verb.TOLERANCE = 1e-3;

// ####init()
//
// Start a default Engine
//
verb.init = function() {
	verb.nurbsEngine = new verb.core.Engine( verb.eval.nurbs );
	verb.geom.NurbsGeometry.prototype.nurbsEngine = verb.nurbsEngine;
}

// ####Douglas Crockford's "method"
//
Function.prototype.method = function (name, func) {
    this.prototype[name] = func;
    return this;
};

// ####Douglas Crockford's "inherits"
//
Function.method('inherits', function (parent) {
    this.prototype = new parent();
    var d = {}, 
        p = this.prototype;
    this.prototype.constructor = parent; 
    return this;
});

// ####Array.flatten()
//
// Extend methods to collapse multidimensional arrays to 1d
//
Array.prototype.flatten = function(){

	if (this.length == 0) return [];

	var merged = [];

	for (var i = 0; i < this.length; i++){
		if (this[i] instanceof Array){
			merged = merged.concat( this[i].flatten() );
		} else {
			merged = merged.concat( this[i] );
		}
	}

	return merged;

}

// ####numeric.normalized( arr )
//
// Extend numeric to obtain the normalized version of an array
//
// **params**
// + *Array*, Array of numbers
//
// **returns**
// + *Array*, The array after normalization

numeric.normalized = function(arr){

	return numeric.div( arr, numeric.norm2(arr) );

}

// ####numeric.cross( u, v )
//
// Extend numeric to form the cross product between two length 3 arrays
//
// **params**
// + *Array*, Length 3 array of numbers
// + *Array*, Length 3 array of numbers
//
// **returns**
// + *Array*, The length 3 array cross product
numeric.cross = function(u, v){

	return [u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]];

}