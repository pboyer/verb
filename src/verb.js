"use strict";

// browser context
if ( typeof exports != 'object' || exports === undefined )  
{
	var verb = {}
		, numeric = window.numeric
		, binomial = window.binomial
		, labor = window.labor;
} else  {
	var verb = module.exports = {}
		, numeric = require('numeric')
		, binomial = require('binomial')
		, labor = require('labor');
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
verb.TOLERANCE = 1e-6;

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

//
// ####left(arr)
//
// Get the first half of an array including the pivot
//
// **params**
// + *Array*, array of stuff
// 
// **returns** 
// + *Array*, the right half
//

verb.left = function(arr){ 
	if (arr.length === 0) return [];
	var len = Math.ceil( arr.length / 2 ); 
	return arr.slice( 0, len );
}

//
// ####right(arr)
//
// Get the second half of an array, not including the pivot
//
// **params**
// + *Array*, array of stuff
// 
// **returns** 
// + *Array*, the right half
//

verb.right = function(arr){
	if (arr.length === 0) return [];
	var len = Math.ceil( arr.length / 2 );
	return arr.slice( len );
}

//
// ####rightWithPivot(arr)
//
// Get the second half of an array including the pivot
//
// **params**
// + *Array*, array of stuff
// 
// **returns** 
// + *Array*, the right half
//

verb.rightWithPivot = function(arr){
	if (arr.length === 0) return [];
	var len = Math.ceil( arr.length / 2 );
	return arr.slice( len-1 );
}

//
// ####unique(arr, comparator)
//
// Obtain the unique set of elements in an array
//
// **params**
// + *Array*, array of stuff
// + *Function*, a function that receives two arguments (two objects from the array).  Returning true indicates
// the objects are equal.  
// 
// **returns** 
// + *Array*, array of unique elements
//

verb.unique = function( arr, comparator ){

	if (arr.length === 0) return [];

	var uniques = [ arr.pop() ];

	for (var i = 0; i < arr.length; i++ ){

		var ele = arr.pop();
		var isUnique = true;

		for (var j = 0; j < uniques.length; j++ ){
			if ( comparator( ele, uniques[i] ) ){
				isUnique = false;
				break;
			}
		}

		if ( isUnique ){
			uniques.push( ele );
		}

	}

	return uniques;

}

	//
	// ####range(start, stop, step)
	//
	// Obtain a range of numbers
	//
	// Borrowed from underscore.js port of the python function
	// of the same name
	//
	// **params**
	// + *Number*, start point
	// + *Number*, end point 
	// + *Number*, step
	// 
	// **returns** 
	// + *Array*, range array
	//
  verb.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = arguments[2] || 1;

    var len = Math.max(Math.ceil((stop - start) / step), 0);
    var idx = 0;
    var range = new Array(len);

    while(idx < len) {
      range[idx++] = start;
      start += step;
    }

    return range;
  };