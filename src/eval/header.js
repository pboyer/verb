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