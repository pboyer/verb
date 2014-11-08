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
// ###new Engine( [options] )
//
// Constructor for Engine
//
//
// **params**
// + *Object*, An options object defining the library location, number of threads to use, tolerance of the worker, etc.
//

verb.core.Engine = function(options) {

	// private properties
	var _use_pool = ( typeof Worker === 'function' ) && ( options.use_pool || options.use_pool === undefined );
	var _num_threads = options.num_workers || 2;
	var _tolerance = options.tolerance || 1e-4;
	var _url = options.url || 'js/verbEval.js';
	var _lib = options.library || verb.eval.nurbs;
	var _error_handler = options.error_handler || ( function( message ) { console.warn( message ); } );
	var _pool = undefined;

	// private methods
	var init_pool = function() {

		try {
			_pool = new labor.Pool(_url, _num_threads );
			_pool.start();
		} catch (err) {
			_error_handler( 'Failed to initialize labor.Pool: ' + err );
			return false;
		}
		return true;

	};

	var eval_sync = function(func, arguments_array) {
		return _lib[func].apply(null, arguments_array);
	}

	// ####start()
	//
	// Creates the thread pool if that is being used
	//
	this.start = function() {
		// initialize pool
		if ( _use_pool )
		{
			init_pool();
		}
	};

	// ####eval(func, arguments_array, callback )
	//
	// Evaluate a function asynchronously from the library
	//
	// **params**
	// + *String*, The name of the function to call in the library
	// + *Array*, The array of arguments to the function
	// + *Function*, Function to execute on completion, passing the value to it
	//
	// **returns** 
	// + *Unknown*, the return value of the function
	//
	this.eval = function(func, arguments_array, callback )
	{

		if (!callback){
			return eval_sync(func, arguments_array);
		}

		// if we are to use the pool we must init it 
		if ( _use_pool && ( _pool || ( _pool === undefined && init_pool() ) ) ) {
			_pool.addWork( func, arguments_array, callback );
		}	else {
			setTimeout( function() { callback( eval_sync(func, arguments_array ) ) }, 0);
		}
	}

	// ####setTolerance( tolerance )
	//
	// Set the tolerance of the library
	//
	// **params**
	// + *Number*, The tolerance value
	//
	this.setTolerance = function(tolerance) {
		// TODO: send message to worker pool in labor.js
		_tolerance = tolerance;
	}

	// ####setUsePool( use_pool )
	//
	// Whether to use the thread pool or do evaluations in the main thread
	//
	// **params**
	// + *Boolean*, Use the pool or not
	//
	this.setUsePool = function( use_pool ) {

		if ( use_pool && _pool === undefined && init_pool() ) {
			_use_pool = use_pool;
			return true;
		} else if ( !use_pool ) {
			_pool = null;
			return true;
		} else {
			return false;
		}
		
	}

	// ####setErrorHandler( handler )
	//
	// The error handler function
	//
	// **params**
	// + *Function*, The function that handles errors
	//
	this.setErrorHandler = function( handler ) {
		_error_handler = handler;
	}

	// ####setNumThreads( numThreads )
	//
	// Set the number of threads to use
	//
	// **params**
	// + *Number*, The number of threads to use
	//
	this.setNumThreads = function( num_threads ) {
		_num_threads = num_threads;
		// TODO: implement add or remove workers in labor.js
	}

};


// ###new WatchObject()
//
// Constructor for WatchObject
//
// WatchObject is a simple type with observable properties.  You can register callbacks for
// when these properties change
//

verb.core.WatchObject = function() {

	// name -> { id -> callback }
	var watchers = { "change" : {} };

	// name -> value
	var properties = {};

	// counter for watch ids
	var watcherId = 0;

	var that = this;

	// report a property change to the watchers
	var report = function(name, updateObject){

		if (typeof name === "string"){

			for (var ele in watchers[name]){
				watchers[name][ele]( updateObject );
			}

			for (var ele in watchers["change"]){
				watchers["change"][ele]( updateObject );
			}
			
		} else {
			for (var n in name){
				report( n, updateObject );
			}
		}

	};

	// ####eval(func, arguments_array, callback )
	//
	// Get the value of a property name. 
	//
	// **params**
	// + *String*, The name of the property
	//
	// **returns** 
	// + *Unknown*, The value of the property
	//
	this.get = function( name ){

		return properties[name];

	};

	// ####set( name, value )
	//
	// Set the value of a property and update watchers.  Initializes the value if it doesn't already exist
	//
	// **params**
	// + *String*, The name of the property
	// + *Unknown*, The new value for the property
	this.set = function( name, value ){

		var old = properties[name];

		properties[name] = value;
		watchers[name] = watchers[name] || {};

		report( name, {name: name, old: old, "new": value, target: that, type: "full"});

	};


	// ####setAll( propertyNameValuePairs )
	//
	// Set the value of a collection of properties simultaneously
	//
	// **params**
	// + *Object*, An object literal mapping from property names to new values
	this.setAll = function( propertyNameValuePairs ){

		var oldVals = {};

		for ( var propName in propertyNameValuePairs ){
			oldVals[propName] = properties[propName];
			properties[propName] = propertyNameValuePairs[propName];
			watchers[propName] = watchers[propName] || {};
		}

		report( propertyNameValuePairs, { old: oldVals, "new": propertyNameValuePairs, target: that, type: "multi" } );

	};

	// ####setAt( name, index, value  )
	//
	// Set the value of an array property at a particular index.  Update watchers
	// indicating that it is an "index" type update.
	//
	// **params**
	// + *String*, The name of the property
	// + *Number*, The index at which to change the value
	// + *Unknown*, The new value for the index

	this.setAt = function( name, index, value ){

		var oldArr = properties[name];

		if (oldArr === undefined || oldArr.length >= index || index < 0){
			return;
		}

		var old = properties[name][index];
		properties[name][index] = value;

		report( name, {name: name, index: index, old: old, "new": value, target: that, type: "index"} );

	};

	// ####watch( name, callback )
	//
	// Start watching a particular property.  Use "change" as the name to receive all 
	// updates from this object
	//
	// **params**
	// + *String*, The name of the property
	// + *Function*, The callback
	//
	// **returns** 
	// + *Number*, A watcher id which can be used to unregister the callback
	//
	this.watch = function( name, callback ){

		if ( properties[name] === undefined || !callback ){
			return;
		}

		var id = watcherId++;
		watchers[name][watcherId] = callback;

		return watcherId++;
	};

	// ####watchAll( names, callback )
	//
	// Start watching multiple properties
	//
	// **params**
	// + *Array*, Array of property names
	// + *Function*, The callback
	//
	// **returns** 
	// + *Array*, An array of watcher ids which can be used to unregister the callbacks
	//
	this.watchAll = function( names, callback ){

		var watcherIds = [];

		for (var i = 0; i < names.length; i++){
			watcherIds.push( this.watch( names[i], callback ) );
		}

		return watcherIds;

	};

	// ####watchAll( names, callback )
	//
	// Stop watching a property
	//
	// **params**
	// + *String*, Property name
	// + *Number*, Watcher id to remove

	this.ignore = function( name, watcherId ){
	
		if ( watchers[name] === undefined 
			|| watchers[name][watcherId] === undefined){
			return;
		}

		watchers[name][watcherId] = undefined;

	};

};
// ####uid()
// 
// Generate a unique id.
//
// **returns**
// + *Number*, The id

verb.core.uid = (function(){
	var id = 0;
	return function() {
		return id++;
	};
})();
// ###new NurbsGeometry()
//
// Constructor for Geometry
//
// Geometry is the base class for all Geometry types
verb.geom.Geometry = function() { 

	verb.core.WatchObject.call(this);

	var id = verb.core.uid();
	
	this.uniqueId = function() {
		return id;
	};

}.inherits(verb.core.WatchObject);
// ###new NurbsGeometry()
//
// Constructor for NurbsGeometry
//
// NurbsGeometry is the base class for all NURBS types
verb.geom.NurbsGeometry = function() {

	verb.geom.Geometry.call(this);

}.inherits( verb.geom.Geometry );



// ###new NurbsSurface( degree, controlPoints, weights, knots )
//
// Constructor for a NurbsCurve
//
// **params**
// + *Number*, The degree of the curve
// + *Array*, Array of arrays representing the control points
// + *Array*, Array of numbers representing the control point weights
// + *Array*, Array of numbers representing the knot structure

verb.geom.NurbsCurve = function( degree, controlPoints, weights, knots ) {

	verb.geom.NurbsGeometry.call(this);

	this.setAll({
		"controlPoints": controlPoints,
		"weights": weights,
		"knots": knots ? knots.slice(0) : [],
		"degree": degree
	});

}.inherits( verb.geom.NurbsGeometry );

//
// ####point( u [, callback] )
//
// Sample a point at the given parameter 
//
// **params**
// + *Number*, The parameter to sample the curve
// + *Function*, Optional callback to do it async
//
// **returns**
// + *Array*, An array if called synchronously, otherwise nothing

verb.geom.NurbsCurve.prototype.point = function( u, callback ) {

	return this.nurbsEngine.eval( 'rational_curve_point', [ this.get('degree'), this.get('knots'), this.homogenize(),  u ], callback ); 

};

//
// ####derivatives( u, num_derivs [, callback] )
//
// Get derivatives at a given parameter
//
// **params**
// + *Number*, The parameter to sample the curve
// + *Number*, The number of derivatives to obtain
// + *Number*, The callback, if you want this async
//
// **returns**
// + *Array*, An array if called synchronously, otherwise nothing

verb.geom.NurbsCurve.prototype.derivatives = function( u, num_derivs, callback ) {

	return this.nurbsEngine.eval( 'rational_curve_derivs', [ this.get('degree'), this.get('knots'), this.homogenize(),  u, num_derivs  ], callback ); 

};

//
// ####tessellate(options [, callback] )
//
// Tessellate a curve at a given tolerance
//
// **params**
// + *Number*, The parameter to sample the curve
// + *Number*, The number of derivatives to obtain
// + *Number*, The callback, if you want this async
//
// **returns**
// + *Array*, An array if called synchronously, otherwise nothing

verb.geom.NurbsCurve.prototype.tessellate = function(options, callback){

	var options = options || {};
	options.tolerance = options.tolerance || verb.EPSILON;

	return this.nurbsEngine.eval( 'rational_curve_adaptive_sample', [ this.get('degree'), this.get('knots'), this.homogenize(), options.tolerance ], callback ); 

};

//
// ####split( u [, callback] )
//
// Split the curve at the given parameter
//
// **params**
// + *Number*, The parameter at which to split the curve
// + *Function*, Optional callback to do it async
//
// **returns**
// + *Array*, Two curves - one at the lower end of the parameter range and one at the higher end.  

verb.geom.NurbsCurve.prototype.split = function( u, callback ) {

	var domain = this.domain();

	if ( u <= domain[0] || u >= domain[1] ) {
		throw new Error("Cannot split outside of the domain of the curve!");
	}

	// transform the result from the engine into a valid pair of NurbsCurves
	function asNurbsCurves(res){

		var cpts0 = verb.eval.nurbs.dehomogenize_1d( res[0].control_points );
		var wts0 = verb.eval.nurbs.weight_1d( res[0].control_points );

		var c0 = new verb.geom.NurbsCurve( res[0].degree, cpts0, wts0, res[0].knots );

		var cpts1 = verb.eval.nurbs.dehomogenize_1d( res[1].control_points );
		var wts1 = verb.eval.nurbs.weight_1d( res[1].control_points );

		var c1 = new verb.geom.NurbsCurve( res[1].degree, cpts1, wts1, res[1].knots );

		return [c0, c1];
	}

	if (callback){
		return this.nurbsEngine.eval( 'curve_split', [ this.get('degree'), this.get('knots'), this.homogenize(), u ], function(res){
			return callback( asNurbsCurves(res) );
		});
	} 

	return asNurbsCurves( this.nurbsEngine.eval( 'curve_split', [ this.get('degree'), this.get('knots'), this.homogenize(), u ]));

};


//
// ####domain()
//
// Determine the valid domain of the curve
//
//
// **returns**
// + *Array*, An array representing the high and end point of the domain of the curve 

verb.geom.NurbsCurve.prototype.domain = function() {

	var knots = this.get('knots');
	return [ knots[0], knots[knots.length-1] ];

}

//
// ####transform( mat )
//
// Transform a curve with the given matrix.
//
// **params**
// + *Array*, 4d array representing the transform
//
// **returns**
// + *Array*, An array if called synchronously, otherwise nothing

verb.geom.NurbsCurve.prototype.transform = function( mat ){

	var pts = this.get("controlPoints");

	for (var i = 0; i < pts.length; i++){
		var homoPt = pts[1].push(1);
		pts[i] = numeric.mul( mat, homoPt ).slice( 0, homoPt.length-2 );
	}

	this.set('controlPoints', pts);

	return this;

}; 


//
// ####clone()
//
// Obtain a copy of the curve
//
// **params**
// + *Array*, 4d array representing the transform
//
// **returns**
// + *Array*, An array if called synchronously, otherwise nothing

verb.geom.NurbsCurve.prototype.clone = function(){

	// copy the control points
	var pts = this.get("controlPoints");

	var pts_copy = [];

	for (var i = 0; i < pts.length; i++){
		pts_copy.push( pts[i].slice(0) );
	}

	return new verb.geom.NurbsCurve( this.get('degree'), pts_copy, this.get('weights').slice(0), this.get('knots').slice );

};

//
// ####homogenize()
//
// Obtain the homogeneous representation of the control points
//
// **returns**
// + *Array*, 2d array of homogenized control points

verb.geom.NurbsCurve.prototype.homogenize = function(){

	return verb.eval.nurbs.homogenize_1d( this.get('controlPoints'), this.get('weights') );

};


//
// ####update()
//
// If this is a subtype of the NurbsCurve, this method will update the Nurbs representation
// of the curve from those parameters.  This destroys any manual changes to the Nurbs rep.
verb.geom.NurbsCurve.prototype.update = function(){

	if ( !this.nurbsRep ){
		return;
	}

	var curve_props = this.nurbsRep();

	this.setAll({
		"controlPoints": curve_props.control_points,
		"weights": curve_props.weights,
		"knots": curve_props.knots,
		"degree": curve_props.degree
	});

};

// ###new NurbsSurface( degreeU, knotsU, degreeV, knotsV, controlPoints, weights )
//
// Constructor for a NurbsSurface
//
// **params**
// + *Number*, The degree of the surface in the u direction
// + *Array*, Array of numbers representing the knot positions in the u direction
// + *Number*, The degree of the surface in the v direction
// + *Array*, Array of numbers representing the knot positions in the v direction
// + *Array*, 3d array representing the unweighted control points
// + *Array*, 2d array representing the surface weight structure
//

verb.geom.NurbsSurface = function( degreeU, knotsU, degreeV, knotsV, controlPoints, weights ) {

	verb.geom.NurbsGeometry.call(this);

	this.setAll({
		"controlPoints": controlPoints,
		"weights": weights,
		"knotsU": knotsU ? knotsU.slice(0) : [],
		"knotsV": knotsV ? knotsV.slice(0) : [],
		"degreeU": degreeU,
		"degreeV": degreeV
	});

}.inherits( verb.geom.NurbsGeometry );

//
// ####point( u, v [, callback] )
//
// Sample a point at the given u, v parameter 
//
// **params**
// + *Number*, The u parameter at which to sample
// + *Number*, The v parameter at which to sample
// + *Function*, Optional callback to do it async
//
// **returns**
// + *Array*, An array if called synchronously, otherwise nothing

verb.geom.NurbsSurface.prototype.point = function( u, v, callback ) {

	return this.nurbsEngine.eval( 'rational_surface_point', 
							[ 	this.get('degreeU'), this.get('knotsU'), this.get('degreeV'), this.get('knotsV'), this.homogenize(), u, v ], callback );

};

//
// ####derivatives( u, v, num_derivs [, callback] )
//
// Get derivatives at a given u, v parameter
//
// **params**
// + *Number*, The u parameter to sample the curve
// + *Number*, The v parameter to sample the curve
// + *Number*, The number of derivatives to obtain
// + *Number*, The callback, if you want this async
//
// **returns**
// + *Array*, An array if called synchronously, otherwise nothing

verb.geom.NurbsSurface.prototype.derivatives = function( u, v, num_derivs, callback ) {

	return this.nurbsEngine.eval( 'rational_surface_derivs', 
			[	this.get('degreeU'), this.get('knotsU'), this.get('degreeV'), this.get('knotsV'), this.homogenize(), num_derivs, u, v ], callback ); 

};

//
// ####tessellate(options [, callback] )
//
// tessellate the surface
//
// **params**
// + *Object*, tessellate the surface, given an options object includings a vdivs and udivs property
//
// **returns**
// + *Array*, An array if called synchronously, otherwise nothing

verb.geom.NurbsSurface.prototype.tessellate = function(options, callback){

	var minDivsV = 20
		, minDivsU = 20;

	if (options){
		minDivsV = options.minDivsV || minDivsV;
		minDivsU = options.minDivsU || minDivsU;
	}

	// naive surface tesselation, for now
	return this.nurbsEngine.eval( 'tessellate_rational_surface_naive', 
			[	this.get('degreeU'), this.get('knotsU'), this.get('degreeV'), this.get('knotsV'), this.homogenize(), 
			minDivsU, minDivsV ], callback ); 

};

//
// ####domain()
//
// Determine the valid domain of the surface
//
//
// **returns**
// + *Array*, An 2d array e.g. [[lowU, highU], [lowV, highV]]

verb.geom.NurbsSurface.prototype.domain = function() {

	var knotsU = this.get('knotsU');
	var knotsV = this.get('knotsV');
	return [ [ knotsU[0], knotsU[knotsU.length-1] ], [ knotsV[0], knotsV[knotsV.length-1] ] ];

}

//
// ####transform( mat )
//
// Transform a curve with the given matrix.
//
// **params**
// + *Array*, 4d array representing the transform
//
// **returns**
// + *Array*, An array if called synchronously, otherwise nothing

verb.geom.NurbsSurface.prototype.transform = function( mat ){

	var pts = this.get("controlPoints");

	for (var i = 0; i < pts.length; i++){
		for (var j = 0; j < pts[i].length; j++){
			var homoPt = pts[1].push(1);
			pts[i] = numeric.mul( mat, homoPt ).slice( 0, homoPt.length-2 );
		}
	}

	this.set('controlPoints', pts);

	return this;

};

//
// ####clone()
//
// Obtain a copy of the curve
//
// **params**
// + *Array*, 4d array representing the transform
//
// **returns**
// + *Array*, An array if called synchronously, otherwise nothing

verb.geom.NurbsSurface.prototype.clone = function(){

	// copy the control points
	var pts = this.get("controlPoints");
	var pts_copy = [];

	for (var i = 0; i < pts.length; i++){
		pts_copy.push([]);
		for (var j = 0; j < pts[i].length; j++){
			pts_copy[i].push( pts[i][j].slice( 0 ) );
		}
	}

	// copy the weights
	var weights = this.get("weights");
	var weights_copy = [];

	for (var i = 0; i < weights.length; i++){
		weights_copy.push( weights[i].slice( 0 ) );
	}

	return new verb.geom.NurbsSurface( this.get('degreeU'), this.get('knotsU').slice(0), 
		this.get('degreeV'), this.get('knotsV').slice(0), pts_copy, weights_copy );

};

//
// ####homogenize()
//
// Obtain the homogeneous representation of the control points
//
// **returns**
// + *Array*, 3d array of homogenized control points

verb.geom.NurbsSurface.prototype.homogenize = function(){

	return verb.eval.nurbs.homogenize_2d( this.get('controlPoints'), this.get('weights') );

};

//
// ####update()
//
// If this is a subtype of the NurbsSurface, this method will update the Nurbs representation
// of the curve from those parameters.  This destroys any manual changes to the Nurbs rep.
//

verb.geom.NurbsSurface.prototype.update = function(){

	if ( !this.nurbsRep ){
		return;
	}

	var curve_props = this.nurbsRep();

	this.setAll({
		"controlPoints": curve_props.control_points,
		"weights": curve_props.weights,
		"knotsU": curve_props.knots_u,
		"knotsV": curve_props.knots_v,
		"degreeU": curve_props.degree_u,
		"degreeV": curve_props.degree_v
	});

};
// ###new Arc(center, xaxis, yaxis, radius, interval) 
//
// Constructor for Arc
//
// **params**
// + *Array*, Length 3 array representing the center of the arc
// + *Array*, Length 3 array representing the xaxis
// + *Array*, Length 3 array representing the perpendicular yaxis
// + *Number*, Radius of the arc
// + *Interval*, Interval object representing the interval of the arc

verb.geom.Arc = function(center, xaxis, yaxis, radius, interval) {

	verb.geom.NurbsCurve.call(this);

	this.setAll( {
		"center": center,
		"xaxis": xaxis,
		"yaxis": yaxis,
		"radius": radius,
		"interval": interval 
	});

	this.update();
	this.watchAll( ['center', 'xaxis', 'yaxis', 'radius', 'interval'], this.update );

}.inherits(verb.geom.NurbsCurve);

// #### nurbsRep()
//
// Construct the Nurbs representation
verb.geom.Arc.prototype.nurbsRep = function(){

	return this.nurbsEngine.eval( 'get_arc', [ this.get("center"), 
													 this.get("xaxis"), 
													 this.get("yaxis"), 
													 this.get("radius"), 
													 this.get("interval").get("min"), 
													 this.get("interval").get("max")] );

};

// ###new BezierCurve( control_points [, weights] )
//
// Constructor for BezierCurve
//
// **params**
// + *Array*, Array of Length 3 arrays representing the control pts of the bezier curve
// + *Array*, Array of numbers representing the weights of the bezier curve, omit if you don't want this to be a rational curve

verb.geom.BezierCurve = function( control_points, weights ) {

	verb.geom.NurbsCurve.call(this);
	
	this.setAll( {
		"controlPoints": control_points ? control_points.slice(0) : [],
		"weights": weights ? weights.slice(0) : undefined
	});

	this.update();

}.inherits( verb.geom.NurbsCurve ); 


// #### nurbsRep()
//
// Construct the Nurbs representation
verb.geom.BezierCurve.prototype.nurbsRep = function(){

	var control_points = this.get('controlPoints');
	var weights = this.get('weights');
	var degree = control_points.length - 1;

	var knots = [];
	for (var i = 0; i < degree + 1; i++){ knots.push(0); }
	for (var i = 0; i < degree + 1; i++){ knots.push(1); }

	// if weights aren't provided, build uniform weights
	if (weights === undefined){
		weights = [];
		for (var i = 0; i < control_points.length; i++){
			weights.push(1);
		}
	}

	return {
		degree: degree,
		knots: knots, 
		control_points: control_points,
		weights: weights
	};

};

// ###new BoundingBox([ points ])
// 
// BoundingBox Constructor
//
// **params**
// + *Array*, Points to add, if desired.  Otherwise, will not be initialized until add is called.

verb.geom.BoundingBox = function() {
	this.initialized = false;
	this.min = [0,0,0];
	this.max = [0,0,0];

 	var pt_args = Array.prototype.slice.call( arguments, 0);

 	if (pt_args.length === 1 && pt_args[0] instanceof Array && pt_args[0][0] instanceof Array ){
 		this.add_elements_sync(pt_args[0]);
 	} else {
 		this.add_elements_sync(pt_args);
 	}
}	

// ####add_elements( point_array, callback ) 
//
// Asynchronously add an array of points to the bounding box
//
// **params**
// + *Array*, An array of length-3 array of numbers 
// + *Function*, Function to call when all of the points in array have been added.  The only parameter to this
// callback is this bounding box.
//

verb.geom.BoundingBox.prototype.add_elements = function( point_array, callback ) 
{

	var that = this; 
	setTimeout(function() {
		point_array.forEach(function(elem, index) {
			that.add(elem);
		});
		callback(that);
	}, 0);

};

// ####add_elements_sync( point_array ) 
//
// Synchronously add an array of points to the bounding box
//
// **params**
// + *Array*, An array of length-3 array of numbers 
//
// **returns**
// + *Object*, This BoundingBox for chaining
//

verb.geom.BoundingBox.prototype.add_elements_sync = function( point_array ) 
{
	var that = this; 
	point_array.forEach( function(elem) {
		that.add(elem);
	});
	return this;
};
 
// ####add( point ) 
//
// Adds a point to the bounding box, expanding the bounding box if the point is outside of it.
// If the bounding box is not initialized, this method has that side effect.
//
// **params**
// + *Array*, A length-3 array of numbers 
//
// **returns**
// + *Object*, This BoundingBox for chaining
//

verb.geom.BoundingBox.prototype.add = function( point ) 
{
	if ( !this.initialized )
	{
		this.min = point.slice(0);
		this.max = point.slice(0);
		this.initialized = true;
		return this;
	}

	if (point[0] > this.max[0] )
	{
		this.max[0] = point[0];
	}

	if (point[1] > this.max[1] )
	{
		this.max[1] = point[1];
	}

	if (point[2] > this.max[2] )
	{
		this.max[2] = point[2];
	}

	if (point[0] < this.min[0] )
	{
		this.min[0] = point[0];
	}

	if (point[1] < this.min[1] )
	{
		this.min[1] = point[1];
	}

	if (point[2] < this.min[2] )
	{
		this.min[2] = point[2];
	}

	return this;

};

// ####contains( point ) 
//
// Determines if two intervals on the real number line intersect
//
// **params**
// + *Number*, Beginning of first interval
// + *Number*, End of first interval
// + *Number*, Beginning of second interval
// + *Number*, End of second interval
//
// **returns**
// + *Boolean*, true if the two intervals overlap, otherwise false
//

verb.geom.BoundingBox.prototype.contains = function(point, tol) {

	if ( !this.initialized )
	{
		return false;
	}

	return this.intersects( new verb.geom.BoundingBox(point), tol );

}

// #### TOLERANCE
//
// Defines the tolerance for bounding box operations

verb.geom.BoundingBox.prototype.TOLERANCE = 1e-4;


// ####intervals_overlap( a1, a2, b1, b2 )
//
// Determines if two intervals on the real number line intersect
//
// **params**
// + *Number*, Beginning of first interval
// + *Number*, End of first interval
// + *Number*, Beginning of second interval
// + *Number*, End of second interval
//
// **returns**
// + *Boolean*, true if the two intervals overlap, otherwise false
//

verb.geom.BoundingBox.prototype.intervals_overlap = function( a1, a2, b1, b2, tol ) {

	var tol = tol || verb.geom.BoundingBox.prototype.TOLERANCE
		, x1 = Math.min(a1, a2) - tol
		, x2 = Math.max(a1, a2) + tol
		, y1 = Math.min(b1, b2) - tol
		, y2 = Math.max(b1, b2) + tol;

	if ( (x1 >= y1 && x1 <= y2) || (x2 >= y1 && x2 <= y2) || (y1 >= x1 && y1 <= x2) || (y2 >= x1 && y2 <= x2) )
	{
		return true;
	}
	else 
	{
		return false;
	}

}

// ####intersects( bb )
//
// Determines if this bounding box intersects with another
//
// **params**
// + *Object*, BoundingBox to check for intersection with this one
//
// **returns**
// + *Boolean*, true if the two bounding boxes intersect, otherwise false
//

verb.geom.BoundingBox.prototype.intersects = function( bb, tol ) {

	if ( !this.initialized || !bb.initialized )
	{
		return false;
	}

	var a1 = this.min
		, a2 = this.max
		, b1 = bb.min
		, b2 = bb.max;

	if ( this.intervals_overlap(a1[0], a2[0], b1[0], b2[0], tol ) 
			&& this.intervals_overlap(a1[1], a2[1], b1[1], b2[1], tol ) 
			&& this.intervals_overlap(a1[2], a2[2], b1[2], b2[2], tol ) )
	{
		return true;
	}

	return false;

};

// ####clear( bb )
//
// Clear the bounding box, leaving it in an uninitialized state.  Call add, add_elements in order to 
// initialize
//
// **returns**
// + *Object*, this BoundingBox for chaining
//

verb.geom.BoundingBox.prototype.clear = function( bb ) {

	this.initialized = false;
	return this;

};

// ####get_longest_axis( bb )
//
// Get longest axis of bounding box
//
// **returns**
// + *Number*, Index of longest axis
//

verb.geom.BoundingBox.prototype.get_longest_axis = function( bb ) {

	var axis_lengths = [ 	this.get_axis_length(0), 
							this.get_axis_length(1), 
							this.get_axis_length(2)];

	return axis_lengths.indexOf(Math.max.apply(Math, axis_lengths));

};

// ####get_axis_length( i )
//
// Get length of given axis. 
//
// **params**
// + *Number*, Index of axis to inspect (between 0 and 2)
//
// **returns**
// + *Number*, Length of the given axis.  If axis is out of bounds, returns 0.
//

verb.geom.BoundingBox.prototype.get_axis_length = function( i ) {

	if (i < 0 || i > 2) return 0;

	return Math.abs( this.min[i] - this.max[i] );

};

// ####intersect( bb )
//
// Compute the boolean intersection of this with another axis-aligned bounding box.  If the two
// bounding boxes do not intersect, returns null.
//
// **params**
// + *Object*, BoundingBox to intersect with
//
// **returns**
// + *Object*, The bounding box formed by the intersection or null if there is no intersection.
//

verb.geom.BoundingBox.prototype.intersect = function( bb, tol ) {

	if ( !this.initialized )
	{
		return null;
	}

	var a1 = this.min
		, a2 = this.max
		, b1 = bb.min
		, b2 = bb.max;

	if ( !this.intersects( bb, tol ) )
		return null;

	var xmax = Math.min( a2[0], b2[0] )
		, xmin = Math.max( a1[0], b1[0] )
		, ymax = Math.min( a2[1], b2[1] )
		, ymin = Math.max( a1[1], b1[1] )
		, zmax = Math.min( a2[2], b2[2] )
		, zmin = Math.max( a1[2], b1[2] )
		, max_bb = [ xmax, ymax, zmax]
		, min_bb = [ xmin, ymin, zmin];

	return new verb.geom.BoundingBox(min_bb, max_bb);

}


// ###new Circle(center, xaxis, yaxis, xradius, yradius)
//
// Constructor for Circle
//
// **params**
// + *Array*, Length 3 array representing the center of the circle
// + *Array*, Length 3 array representing the xaxis
// + *Array*, Length 3 array representing the perpendicular yaxis
// + *Number*, Radius

verb.geom.Circle = function(center, xaxis, yaxis, radius) {

	verb.geom.NurbsCurve.call(this);
	
	this.setAll({
		"center": center,
		"xaxis": xaxis,
		"yaxis": yaxis,
		"radius": radius 
	});

	this.update();

	this.watchAll( ['center', 'xaxis', 'yaxis', 'radius'], this.update );

}.inherits(verb.geom.NurbsCurve);

// #### nurbsRep()
//
// Construct the Nurbs representation
verb.geom.Circle.prototype.nurbsRep = function(){

	return this.nurbsEngine.eval( 'get_arc', [  this.get("center"), 
																									 this.get("xaxis"), 
																									 this.get("yaxis"), 
																									 this.get("radius"), 
																									 0, 
																									 2 * Math.PI ]);

};

// ###new Cone(axis, xaxis, base, height, radius )
//
// Constructor for Cone
//
// **params**
// + *Array*, Length 3 array representing the axis of the cone
// + *Array*, Length 3 array representing the x axis, perpendicular to the axis
// + *Array*, Length 3 array representing the base of the cone
// + *Number*, Height of the cone
// + *Number*, Radius of the cone

verb.geom.Cone = function(axis, xaxis, base, height, radius ) {

	verb.geom.NurbsSurface.call(this);

	this.setAll({
		"axis": axis,
		"xaxis": xaxis,
		"base": base,
		"height": height,
		"radius": radius 
	});

	var surface_props = this.nurbsRep();

	verb.geom.NurbsSurface.call(this, surface_props.degree_u, surface_props.knots_u, surface_props.degree_v, surface_props.knots_v, surface_props.control_points, surface_props.weights );

	this.watchAll( ['axis', 'xaxis', 'base', 'height', 'radius'], this.update );

}.inherits(verb.geom.NurbsSurface);

// #### nurbsRep()
//
// Construct the Nurbs representation
verb.geom.Cone.prototype.nurbsRep = function(){

	return this.nurbsEngine.eval( 'get_cone_surface', [ this.get("axis"), 
															 this.get("xaxis"), 
															 this.get("base"), 
															 this.get("height"), 
															 this.get("radius") ]);

};
// ###new Cylinder(center, xaxis, yaxis, xradius, yradius)
//
// Constructor for Cylinder
//
// **params**
// + *Array*, Length 3 array representing the axis of the cylinder
// + *Array*, Length 3 array representing the x axis, perpendicular to the axis
// + *Array*, Length 3 array representing the base of the cylinder
// + *Number*, Height of the cylinder
// + *Number*, Radius of the cylinder

verb.geom.Cylinder = function(axis, xaxis, base, height, radius ) {

	this.setAll({
		"axis": axis,
		"xaxis": xaxis,
		"base": base,
		"height": height,
		"radius": radius 
	});

	var surface_props = this.nurbsRep();

	verb.geom.NurbsSurface.call(this, surface_props.degree_u, surface_props.knots_u, surface_props.degree_v, surface_props.knots_v, surface_props.control_points, surface_props.weights );

	this.watchAll( ['axis', 'xaxis', 'base', 'height', 'radius'], this.update );

}.inherits(verb.geom.NurbsSurface);

// #### nurbsRep()
//
// Construct the Nurbs representation
verb.geom.Cylinder.prototype.nurbsRep = function() {

  return this.nurbsEngine.eval( 'get_cylinder_surface', 
						  												 [ this.get("axis"), 
						  												 	 this.get("xaxis"), 
						  													 this.get("base"), 
																				 this.get("height"), 
																				 this.get("radius") ]);

};
// ###new Ellipse(center, xaxis, yaxis, xradius, yradius)
//
// Constructor for EllipseArc
//
// **params**
// + *Array*, Length 3 array representing the center of the arc
// + *Array*, Length 3 array representing the xaxis
// + *Array*, Length 3 array representing the perpendicular yaxis
// + *Number*, Radius of the arc in the x direction
// + *Number*, Radius of the arc in the y direction

verb.geom.Ellipse = function(center, xaxis, yaxis, xradius, yradius) {

	verb.geom.NurbsCurve.call(this);

	this.setAll({
		"center": center,
		"xaxis": xaxis,
		"yaxis": yaxis,
		"xradius": xradius,
		"yradius": yradius
	});

	this.update();

	this.watchAll( ['center', 'xaxis', 'yaxis', 'xradius', 'yradius'], this.update );

}.inherits(verb.geom.NurbsCurve);

// #### nurbsRep()
//
// Construct the Nurbs representation
verb.geom.Ellipse.prototype.nurbsRep = function(){

	return this.nurbsEngine.eval( 'get_ellipse_arc', [ this.get("center"), 
															 this.get("xaxis"), 
															 this.get("yaxis"), 
															 this.get("xradius"), 
															 this.get("yradius"), 
															 0, 
															 2 * Math.PI ]);

};

// ###new EllipseArc(center, xaxis, yaxis, xradius, yradius, interval)
//
// Constructor for EllipseArc
//
// **params**
// + *Array*, Length 3 array representing the center of the arc
// + *Array*, Length 3 array representing the xaxis
// + *Array*, Length 3 array representing the perpendicular yaxis
// + *Number*, Radius of the arc in the x direction
// + *Number*, Radius of the arc in the y direction
// + *Interval*, Interval object representing the interval of the arc

verb.geom.EllipseArc = function(center, xaxis, yaxis, xradius, yradius, interval) {

	verb.geom.NurbsCurve.call(this);
	
	this.setAll({
		"center": center,
		"xaxis": xaxis,
		"yaxis": yaxis,
		"xradius": xradius,
		"yradius": yradius,
		"interval": interval
	});

	this.update();

	this.watchAll( ['center', 'xaxis', 'yaxis', 'xradius', 'yradius', 'interval'], this.update );

}.inherits(verb.geom.NurbsCurve);

// #### nurbsRep()
//
// Construct the Nurbs representation
verb.geom.EllipseArc.prototype.nurbsRep = function(){

	return this.nurbsEngine.eval( 'get_ellipse_arc', [ this.get("center"), 
															 this.get("xaxis"), 
															 this.get("yaxis"), 
															 this.get("xradius"), 
															 this.get("yradius"), 
															 this.get("interval").get("min"), 
													 		 this.get("interval").get("max")] );

};

// ###new Extrusion(p1, p2, p3, pt)
//
// Constructor for Extrusion
//
// **params**
// + *NurbsCurve*, The curve to extrude
// + *Array*, Length 3 representing the direction to extrude
// + *Number*, The distance to extrude

verb.geom.Extrusion = function(profile, axis, length ) {

	verb.geom.NurbsSurface.call(this);

	this.setAll({ 
		  "profile": profile,
		  "axis": axis,
	      "length": length 
	  });

	this.update();

	this.watchAll( ['axis', 'length' ], this.update );
	profile.watchAll( ['knots', 'degree', 'controlPoints', 'weights'], this.update );

}.inherits(verb.geom.NurbsSurface);

// #### nurbsRep()
//
// Construct the Nurbs representation
verb.geom.Extrusion.prototype.nurbsRep = function() {

  return this.nurbsEngine.eval( 'get_extruded_surface', 
									[ this.get("axis"), 
								 	  this.get("length"), 
									  this.get("profile").get("knots"), 
									  this.get("profile").get("degree"), 
									  this.get("profile").get("controlPoints"),
									  this.get("profile").get("weights")] );

};



// ###new FourPointSurface(p1, p2, p3, pt)
//
// Constructor for FourPointSurface
//
// **params**
// + *Array*, Length 3 array representing the first position in ccw direction
// + *Array*, Length 3 array representing the second position in ccw direction
// + *Array*, Length 3 array representing the third position in ccw direction
// + *Array*, Length 3 array representing the fourth position in ccw direction, repeat the third position to get a triangle
//
verb.geom.FourPointSurface = function(p1, p2, p3, p4) {

	verb.geom.NurbsSurface.call(this);

	this.setAll( {
		"p1": p1,
		"p2": p2,
		"p3": p3,
		"p4": p4
	});

	this.update();

	this.watchAll( ['p1', 'p2', 'p3', 'p4'], this.update );

}.inherits(verb.geom.NurbsSurface);

// #### nurbsRep()
//
// Construct the Nurbs representation
verb.geom.FourPointSurface.prototype.nurbsRep = function(){

	return this.nurbsEngine.eval( 'get_4pt_surface', [ this.get("p1"), 
															 this.get("p2"), 
															 this.get("p3"), 
															 this.get("p4") ]);

};

// ###new InterpCurve(pts [, degree])
//
// Constructor for InterpCurve
//
// **params**
// + *Array*, Array of Length 3 arrays representing the points to interpolate (must be > degree + 1)
// + *Number*, Default of 3. Expected degree of curve
//
verb.geom.InterpCurve = function(points, degree) {

	verb.geom.NurbsCurve.call(this);

	this.setAll( {
		"pts": points ? points.slice(0) : [],
		"degree" : degree ? degree : 3
	});

	this.update();

	this.watchAll( ['pts', 'degree'], this.update );

}.inherits(verb.geom.NurbsCurve);

// #### nurbsRep()
//
// Construct the Nurbs representation
verb.geom.InterpCurve.prototype.nurbsRep = function(){

	return this.nurbsEngine.eval( 'rational_interp_curve', [ this.get("pts"), this.get('degree')]);

};

// ###new Interval(min, max)
//
// Constructor for Interval
//
// **params**
// + *Number*, Start of interval 
// + *Number*, End of the interval 
//
verb.geom.Interval = function(min, max) {

	verb.core.WatchObject.call(this);
	
	this.setAll({ 
		"min": min,
		"max": max 
	});

}.inherits(verb.core.WatchObject);

// ###new Interval2(minu, maxu, minv, maxv)
//
// Constructor for Interval2
//
// **params**
// + *Number*, Start of interval in the u direction
// + *Number*, End of the interval in the u direction
// + *Number*, Start of interval in the v direction
// + *Number*, End of the interval in the v direction
//
verb.geom.Interval2 = function(minu, maxu, minv, maxv) {

	verb.core.WatchObject.call(this);
	
	this.setAll({ 
		"uinterval": new verb.geom.Interval(minu, maxu),
		"vinterval": new verb.geom.Interval(minv, maxv)
	});

}.inherits(verb.core.WatchObject);

// ###new Line(start, end)
//
// Constructor for a Line
//
// **params**
// + *Array*, Length 3 array representing the start point
// + *Array*, Length 3 array representing the end point
//
verb.geom.Line = function(start, end) {

	verb.geom.NurbsCurve.call(this);

	this.setAll({ 
		"start": start,
		"end": end
	});

	this.update();

	this.watchAll(['start', 'end'], this.update );

}.inherits(verb.geom.NurbsCurve);

// #### nurbsRep()
//
// Construct the Nurbs representation
verb.geom.Line.prototype.nurbsRep = function(){

	return {
			knots: [0,0,1,1], 
			control_points: [ this.get("start"), this.get("end") ],
			weights: [1,1],
			degree: 1
	};

};



// ###new PlanarSurface( base, uaxis, vaxis, ulength, vlength )
//
// Constructor for PlanarSurface
//
// **params**
// + *Array*, Length 3 array representing the base point
// + *Array*, Length 3 array representing the uaxis, defines the one axis of the planar surface
// + *Array*, Length 3 array representing the vaxis, defines the one second axis of the planar surface
// + *Number*, Length in the u direction 
// + *Number*, Length in the v direction
//
verb.geom.PlanarSurface = function( base, uaxis, vaxis, ulength, vlength ) {

	verb.geom.NurbsSurface.call(this);

	this.setAll({
		"base": base,
		"uaxis": uaxis,
		"vaxis": vaxis,
		"ulength": ulength,
		"vlength": vlength
	});

	this.update();

	this.watchAll( ['base', 'uaxis', 'vaxis', 'ulength', 'vlength'], this.update );

}.inherits(verb.geom.NurbsSurface);

// #### nurbsRep()
//
// Construct the Nurbs representation
verb.geom.PlanarSurface.prototype.nurbsRep = function(){

	var p1 = this.get('base')
		, uedge = numeric.mul( this.get('uaxis'), this.get('ulength'))
		, vedge = numeric.mul( this.get('vaxis'), this.get('vlength'))
		, p2 = numeric.add( p1, uedge )
		, p3 = numeric.add( p1, vedge, uedge )
		, p4 = numeric.add( p1, vedge );

	return this.nurbsEngine.eval( 'get_4pt_surface', [ p1, p2, p3, p4 ]);

};
// ###new PolyLine( points ) 
//
// Constructor for a PolyLine
//
// **params**
// + *Array*, Array of length-3 arrays representing the points
//
verb.geom.PolyLine = function( points ) {

	verb.geom.NurbsCurve.call(this);

	this.setAll( {
		"control_points": points ? points.slice(0) : []
	});

	this.update();

}.inherits(verb.geom.NurbsCurve);

// #### nurbsRep()
//
// Construct the Nurbs representation
verb.geom.PolyLine.prototype.nurbsRep = function(){

	return this.nurbsEngine.eval( 'get_polyline_curve', [ this.get("control_points") ]);

};
// ###new RevolvedSurface( points ) 
//
// Constructor for a RevolvedSurface
//
// **params**
// + *Array*, Length 3 array representing a point on the revolve axis
// + *Array*, The axis of the revolve
// + *Array*, The angle to revolve on
// + *NurbsCurve*, The curve to revolve
//
verb.geom.RevolvedSurface = function( center, axis, angle, profile ) {

	verb.geom.NurbsSurface.call(this);

	this.setAll({
		"center": center,
		"axis": axis,
		"angle": angle,
		"profile": profile
	});

	this.update();

	this.watchAll( ['center', 'axis', 'angle', 'profile'], this.update );

}.inherits(verb.geom.NurbsSurface);

// #### nurbsRep()
//
// Construct the Nurbs representation
verb.geom.RevolvedSurface.prototype.nurbsRep = function(){

	  return this.nurbsEngine.eval( 'get_revolved_surface', 
									[ this.get("center"), 
									  this.get("axis"), 
									  this.get("angle"), 
									  this.get("profile").get("knots"), 
									  this.get("profile").get("degree"), 
									  this.get("profile").get("controlPoints"),
									  this.get("profile").get("weights")] );

};
// ###new Sphere( center, radius ) 
//
// Constructor for a Sphere
//
// **params**
// + *Array*, Length 3 array representing the center
// + *Number*, Radius of the sphere
//
verb.geom.Sphere = function( center, radius ) {

	verb.geom.NurbsSurface.call(this);

	this.setAll({
		"center": center,
		"radius": radius
	});

	this.update();
	this.watchAll( ['center', 'radius'], this.update );

}.inherits(verb.geom.NurbsSurface);

// #### nurbsRep()
//
// Construct the Nurbs representation
verb.geom.Sphere.prototype.nurbsRep = function(){

  return this.nurbsEngine.eval( 'get_sphere_surface', 
										[ this.get("center"), 
										  [0,0,1],
										  [1,0,0],
										  this.get("radius")] );

};
// ###new SweepOneRail( rail, profile )
//
// Constructor for a SweepOneRail
//
// **params**
// + *NurbsCurve*, The path to sweep on
// + *NurbsCurve*, The profile to sweep
//
verb.geom.SweepOneRail = function( rail, profile ) {

	verb.geom.NurbsSurface.call(this);

	this.setAll({
		"rail": rail,
		"profile": profile
	});

	this.update();

	this.watchAll( ['rail', 'profile'], this.update );

}.inherits(verb.geom.NurbsSurface);

// #### nurbsRep()
//
// Construct the Nurbs representation
verb.geom.SweepOneRail.prototype.nurbsRep = function(){
	
  return this.nurbsEngine.eval( 'get_sweep1_surface', 
										[ this.get("profile").get("knots"), 
										  this.get("profile").get("degree"),
										  this.get("profile").get("controlPoints"),
										  this.get("profile").get("weights"),
										  this.get("rail").get("knots"),
										  this.get("rail").get("degree"),
										  this.get("rail").get("controlPoints"),
										  this.get("rail").get("weights")] );

};
verb.intersect.curveCurve = function( curve1, curve2, callback ){

	return verb.nurbsEngine.eval( 'intersect_rational_curves_by_aabb_refine', 
							[ 	curve1.get('degree'), curve1.get('knots'), curve1.homogenize(), 
							curve2.get('degree'), curve2.get('knots'), 
							curve2.homogenize(), verb.TOLERANCE, verb.TOLERANCE ], callback );
}
verb.intersect.curveSurface = function( curve, surface, options, callback ){

	options = options || { tolerance: verb.TOLERANCE, sampleTolerance: verb.TOLERANCE, uDivs: 20, vDivs: 20 };

	return verb.nurbsEngine.eval( 'intersect_rational_curve_surface_by_aabb_refine', 
																[ surface.get('degreeU'), 
																	surface.get('knotsU'), 
																	surface.get('degreeV'), 
																	surface.get('knotsV'), 
																	surface.homogenize(), 
																	curve.get('degree'), 
																	curve.get('knots'), 
																	curve.homogenize(), 
																	options.sampleTolerance, 
																	options.tolerance, 
																	options.uDivs,
																	options.vDivs ], callback );
};


//
// ####intersect_rational_curve_surface_by_aabb( degree_u, knots_u, degree_v, knots_v, homo_control_points, degree_crv, knots_crv, homo_control_points_crv, sample_tol, tol )
//
// Get the intersection of a NURBS curve and a NURBS surface by axis-aligned bounding box intersection and refinement
//
// **params**
// + *Number*, integer degree of surface in u direction
// + *Array*, array of nondecreasing knot values in u direction
// + *Number*, integer degree of surface in v direction
// + *Array*, array of nondecreasing knot values in v direction
// + *Array*, 3d array of homogeneous control points, top to bottom is increasing u direction, left to right is increasing v direction,
// and where each control point is an array of length (dim+1)
// + *Number*, integer degree of curve
// + *Array*, array of nondecreasing knot values
// + *Array*, 2d array of homogeneous control points, where each control point is an array of length (dim+1) 
// and form (wi*pi, wi)
// + *Number*, the sample tolerance of the curve
// + *Number*, tolerance for the curve intersection
// + *Number*, integer number of divisions of the surface in the U direction for initial approximation (placeholder until adaptive tess of surfaces)
// + *Number*, integer number of divisions of the surface in the V direction for initial approximation (placeholder until adaptive tess of surfaces)
// 
// **returns** 
// + *Array*, array of intersection objects, each holding:
// 	- a "point" property where intersections took place
// 	- a "p" the parameter on the curve
//	- a "uv" the parameter on the surface
// 	- a "face" the index of the face where the intersection took place
//

verb.eval.nurbs.intersect_rational_curve_surface_by_aabb_refine = function( degree_u, knots_u, degree_v, 
	knots_v, homo_control_points_srf, degree_crv, knots_crv, homo_control_points_crv, sample_tol, tol, 
	divs_u, divs_v ) {

	// get the approximate intersections
	var ints = verb.eval.nurbs.intersect_rational_curve_surface_by_aabb( degree_u, knots_u, degree_v, 
		knots_v, homo_control_points_srf, degree_crv, knots_crv, homo_control_points_crv, sample_tol, tol, 
		divs_u, divs_v );

	// refine them
	return ints.map(function( inter ){

		// get intersection params
		var start_params = [inter.p, inter.uv[0], inter.uv[1] ]

		// refine the parameters
			, refined_params = verb.eval.nurbs.refine_rational_curve_surface_intersection( degree_u, knots_u, degree_v, knots_v, homo_control_points_srf, degree_crv, knots_crv, homo_control_points_crv, start_params );
	
		// update the inter object
		inter.p = refined_params[0];
		inter.uv[0] = refined_params[1];
		inter.uv[1] = refined_params[2];
		inter.distance = refined_params[3];
		delete inter.face;

		return inter;

	});

}

//
// ####refine_rational_curve_surface_intersection( degree_u, knots_u, degree_v, knots_v, homo_control_points_srf, degree_crv, knots_crv, homo_control_points_crv, start_params )
//
// Refine an intersection pair for a surface and curve given an initial guess.  This is an unconstrained minimization,
// so the caller is responsible for providing a very good initial guess.
//
// **params**
// + *Number*, integer degree of surface in u direction
// + *Array*, array of nondecreasing knot values in u direction
// + *Number*, integer degree of surface in v direction
// + *Array*, array of nondecreasing knot values in v direction
// + *Array*, 3d array of homogeneous control points, top to bottom is increasing u direction, left to right is increasing v direction,
// and where each control point is an array of length (dim+1)
// + *Number*, integer degree of curve
// + *Array*, array of nondecreasing knot values
// + *Array*, 2d array of homogeneous control points, where each control point is an array of length (dim+1) 
// and form (wi*pi, wi)
// + *Array*, array of initial parameter values [ u_crv, u_srf, v_srf ]
// 
// **returns** 
// + *Array*, a length 3 array containing the [ u_crv, u_srf, v_srf, final_distance ]
//

verb.eval.nurbs.refine_rational_curve_surface_intersection = function( degree_u, knots_u, degree_v, knots_v, homo_control_points_srf, degree_crv, knots_crv, homo_control_points_crv, start_params ) {

	var objective = function(x) { 

		var p1 = verb.eval.nurbs.rational_curve_point(degree_crv, knots_crv, homo_control_points_crv, x[0])
			, p2 = verb.eval.nurbs.rational_surface_point( degree_u, knots_u,  degree_v, knots_v, homo_control_points_srf, x[1], x[2] )
			, p1_p2 = numeric.sub(p1, p2);

		return numeric.dot(p1_p2, p1_p2);
	}

	var sol_obj = numeric.uncmin( objective, start_params);
	return sol_obj.solution.concat( sol_obj.f );

}



//
// ####intersect_rational_curve_surface_by_aabb( degree_u, knots_u, degree_v, knots_v, homo_control_points, degree_crv, knots_crv, homo_control_points_crv, sample_tol, tol )
//
// Approximate the intersection of two nurbs surface by axis-aligned bounding box intersection.
//
// **params**
// + *Number*, integer degree of surface in u direction
// + *Array*, array of nondecreasing knot values in u direction
// + *Number*, integer degree of surface in v direction
// + *Array*, array of nondecreasing knot values in v direction
// + *Array*, 3d array of homogeneous control points, top to bottom is increasing u direction, left to right is increasing v direction,
// and where each control point is an array of length (dim+1)
// + *Number*, integer degree of curve
// + *Array*, array of nondecreasing knot values
// + *Array*, 2d array of homogeneous control points, where each control point is an array of length (dim+1) 
// and form (wi*pi, wi)
// + *Array*, array of initial parameter values [ u_crv, u_srf, v_srf ]
// + *Number*, the sample tolerance of the curve
// + *Number*, tolerance for the curve intersection
// + *Number*, integer number of divisions of the surface in the U direction
// + *Number*, integer number of divisions of the surface in the V direction
// 
// **returns** 
// + *Array*, array of intersection objects, each holding:
// 	- a "point" property where intersections took place
// 	- a "p" the parameter on the polyline
//	- a "uv" the parameter on the mesh
// 	- a "face" the index of the face where the intersection took place
//

verb.eval.nurbs.intersect_rational_curve_surface_by_aabb = function( degree_u, knots_u, degree_v, knots_v, homo_control_points_srf, degree_crv, knots_crv, homo_control_points_crv, sample_tol, tol, divs_u, divs_v ) {

	// tessellate the curve
	var crv = verb.eval.nurbs.rational_curve_adaptive_sample( degree_crv, knots_crv, homo_control_points_crv, sample_tol, true)

	// tessellate the surface
		, mesh = verb.eval.nurbs.tessellate_rational_surface_naive( degree_u, knots_u, degree_v, knots_v, homo_control_points_srf, divs_u, divs_v )

	// separate parameters from points in the polyline (params are the first index in the array)
		, u1 = crv.map( function(el) { return el[0]; })
		, p1 = crv.map( function(el) { return el.slice(1) })

	// perform intersection
		, res = verb.eval.nurbs.intersect_parametric_polyline_mesh_by_aabb( p1, u1, mesh, verb.range(mesh.faces.length), tol );

	// eliminate duplicate intersections
	return verb.unique( res, function(a, b){
		return numeric.norm2( numeric.sub( a.point, b.point ) ) < tol && Math.abs( a.p - b.p ) < tol && numeric.norm2( numeric.sub( a.uv, b.uv ) ) < tol
	});

}

//
// ####intersect_parametric_polyline_mesh_by_aabb( crv_points, crv_param_points, mesh, included_faces, tol )
//
// Approximate the intersection of a polyline and mesh while maintaining parameter information
//
// **params**
// + *Array*, array of 3d points on the curve
// + *Array*, array of parameters corresponding to the parameters on the curve
// + *Object*, a triangular mesh with a "faces" attribute and "points" attribute
// + *Array*, an array of indices, representing the faces to include in the intersection operation
// + *Number*, tolerance for the intersection
// 
// **returns** 
// + *Array*, array of intersection objects (with potential duplicates ) each holding:
// 	- a "point" property where intersections took place
// 	- a "p" the parameter on the polyline
//	- a "uv" the parameter on the mesh
// 	- a "face" the index of the face where the intersection took place
//

verb.eval.nurbs.intersect_parametric_polyline_mesh_by_aabb = function( crv_points, crv_param_points, mesh, included_faces, tol ) {

	// check if two bounding boxes intersect
	var pl_bb = new verb.geom.BoundingBox( crv_points )
		, mesh_bb = verb.eval.mesh.make_mesh_aabb( mesh.points, mesh.faces, included_faces )
		, rec = verb.eval.nurbs.intersect_parametric_polyline_mesh_by_aabb;

	// if bounding boxes do not intersect, return empty array
	if ( !pl_bb.intersects( mesh_bb, tol ) ) {
		return [];
	}

	if ( crv_points.length === 2 && included_faces.length === 1 ){

			// intersect segment and triangle

			var inter = verb.eval.geom.intersect_segment_with_tri( crv_points[0], crv_points[1], mesh.points, mesh.faces[ included_faces[0] ] );

			if ( inter != null ){

				// map the parameters of the segment to the parametric space of the entire polyline
			 	var p = inter.p * ( crv_param_points[1]-crv_param_points[0] ) + crv_param_points[0];

			 	// map the parameters of the single triangle to the entire parametric space of the triangle
			 	var index_v0 = mesh.faces[ included_faces ][0]
			 		, index_v1 = mesh.faces[ included_faces ][1]
			 		, index_v2 = mesh.faces[ included_faces ][2]
			 		, uv_v0 = mesh.uvs[ index_v0 ]
			 		, uv_v1 = mesh.uvs[ index_v1 ]
			 		, uv_v2 = mesh.uvs[ index_v2 ]
			 		, uv_s_diff = numeric.sub( uv_v1, uv_v0 )
			 		, uv_t_diff = numeric.sub( uv_v2, uv_v0 )
			 		, uv = numeric.add( uv_v0, numeric.mul( inter.s, uv_s_diff ), numeric.mul( inter.t, uv_t_diff ) );

			 	// a pair representing the param on the polyline and the param on the mesh
			 	return [ { point: inter.point, p: p, uv: uv, face: included_faces[0] } ]; 

			}

	} else if ( included_faces.length === 1 ) {

		// intersect triangle and polyline

		// divide polyline in half, rightside includes the pivot
		var crv_points_a = verb.left( crv_points )
			, crv_points_b = verb.rightWithPivot( crv_points )
			, crv_param_points_a = verb.left( crv_param_points )
			, crv_param_points_b = verb.rightWithPivot( crv_param_points );

		return 	 rec( crv_points_a, crv_param_points_a, mesh, included_faces, tol )
		.concat( rec( crv_points_b, crv_param_points_b, mesh, included_faces, tol ) );

	
	} else if ( crv_points.length === 2 ) {

		// intersect mesh >2 faces and line

		// divide mesh in "half" by first sorting then dividing array in half
		var sorted_included_faces = verb.eval.mesh.sort_tris_on_longest_axis( mesh_bb, mesh.points, mesh.faces, included_faces )
			, included_faces_a = verb.left( sorted_included_faces )
			, included_faces_b = verb.right( sorted_included_faces );

		return 		 rec( crv_points, crv_param_points, mesh, included_faces_a, tol )
			.concat( rec( crv_points, crv_param_points, mesh, included_faces_b, tol ));


	} else { 

		// intersect mesh with >2 faces and polyline

		// divide mesh in "half"
		var sorted_included_faces = verb.eval.mesh.sort_tris_on_longest_axis( mesh_bb, mesh.points, mesh.faces, included_faces )
			, included_faces_a = verb.left( sorted_included_faces )
			, included_faces_b = verb.right( sorted_included_faces );

		// divide polyline in half, rightside includes the pivot
		var crv_points_a = verb.left( crv_points )
			, crv_points_b = verb.rightWithPivot( crv_points )
			, crv_param_points_a = verb.left( crv_param_points )
			, crv_param_points_b = verb.rightWithPivot( crv_param_points );

		return 	 	 rec( crv_points_a, crv_param_points_a, mesh, included_faces_a, tol )
			.concat( rec( crv_points_a, crv_param_points_a, mesh, included_faces_b, tol ) )
			.concat( rec( crv_points_b, crv_param_points_b, mesh, included_faces_a, tol ) )
			.concat( rec( crv_points_b, crv_param_points_b, mesh, included_faces_b, tol ) );

	}

	return [];

}

//
// ####intersect_segment_with_tri(  p1, p0, points, tri )
//
//  Intersect segment with triangle (from http://geomalgorithms.com/a06-_intersect-2.html)
//
// **params**
// + *Array*, array of length 3 representing first point of the segment
// + *Array*, array of length 3 representing second point of the segment
// + *Array*, array of length 3 arrays representing the points of the triangle
// + *Array*, array of length 3 containing int indices in the array of points, this allows passing a full mesh
// 
// **returns** 
// + *Object*, an object with an "intersects" property that is true or false and if true, a 
// "s" property giving the param on u, and "t" is the property on v, where u is the 
// axis from v0 to v1, and v is v0 to v1, a "point" property
// where the intersection took place, and "p" property representing the parameter along the segment
//

verb.eval.geom.intersect_segment_with_tri = function( p0, p1, points, tri ) {

	var v0 = points[ tri[0] ]
		, v1 = points[ tri[1] ]
		, v2 = points[ tri[2] ]
		, u = numeric.sub( v1, v0 )
		, v = numeric.sub( v2, v0 )
		, n = numeric.cross( u, v );

	var dir = numeric.sub( p1, p0 )
		, w0 = numeric.sub( p0, v0 )
		, a = -numeric.dot( n, w0 )
		, b = numeric.dot( n, dir )

	// is ray is parallel to triangle plane?
	if ( Math.abs( b ) < verb.EPSILON ){ 
		return null;
	}

	var r = a / b;

	// segment goes away from triangle or is beyond segment
	if ( r < 0 || r > 1 ){
		return null;
	}

	// get proposed intersection
	var pt = numeric.add( p0, numeric.mul( r, dir ) );

	// is I inside T?
	var uv = numeric.dot(u,v)
		, uu = numeric.dot(u,u)
		, vv = numeric.dot(v,v)
		, w = numeric.sub( pt, v0 )
		, wu = numeric.dot( w, u )
		, wv = numeric.dot( w, v )
		, denom = uv * uv - uu * vv
		, s = ( uv * wv - vv * wu ) / denom
		, t = ( uv * wu - uu * wv ) / denom;

	if (s > 1.0 + verb.EPSILON || t > 1.0 + verb.EPSILON || t < -verb.EPSILON || s < -verb.EPSILON || s + t > 1.0 + verb.EPSILON){
		return null;
	}

	return { point: pt, s: s, t: t, p: r };

}

//
// ####intersect_segment_with_plane( p0, p1, v0, n )
//
//  Intersect ray/segment with plane (from http://geomalgorithms.com/a06-_intersect-2.html)
//
//  If intersecting a ray, the param needs to be between 0 and 1 and the caller is responsible
//  for making that check
//
// **params**
// + *Array*, array of length 3 representing first point of the segment
// + *Array*, array of length 3 representing second point of the segment
// + *Array*, array of length 3 representing an origin point on the plane
// + *Array*, array of length 3 representing the normal of the plane
// 
// **returns** 
// null or an object with a p property representing the param on the segment
//

verb.eval.geom.intersect_segment_with_plane = function( p0, p1, v0, n ) {

	var denom = numeric.dot( n, numeric.sub(p0,p1) );

	// parallel case
	if ( abs( denom ) < EPSILON ) { 
   	return null;
 	}

 	var numer = numeric.dot( n, numeric.sub(v0,p0) );

	return { p: numer / denom };

}




//
// ####intersect_aabb_trees( points1, tris1, points2, tris2, aabb_tree1, aabb_tree2 )
//
//  Intersect two aabb trees - a recursive function
//
// **params**
// + *Array*, array of length 3 arrays of numbers representing the points of mesh1
// + *Array*, array of length 3 arrays of number representing the triangles of mesh1
// + *Array*, array of length 3 arrays of numbers representing the points of mesh2
// + *Array*, array of length 3 arrays of number representing the triangles of mesh2
// + *Object*, nested object representing the aabb tree of the first mesh
// + *Object*, nested object representing the aabb tree of the second mesh
// 
// **returns** 
// + *Array*, a list of pairs of triangle indices for mesh1 and mesh2 that are intersecting
//

verb.eval.geom.intersect_aabb_trees = function( points1, tris1, points2, tris2, aabb_tree1, aabb_tree2 ) {

  var intersects = aabb_tree1.bounding_box.intersects( aabb_tree2.bounding_box );

  var recur = verb.eval.geom.intersect_aabb_trees;

  if (!intersects){
  	return [];
  }

  if (aabb_tree1.children.length === 0 && aabb_tree2.children.length === 0){ 

  	return [ [aabb_tree1.triangle, aabb_tree2.triangle ] ]; 

  } else if (aabb_tree1.children.length === 0 && aabb_tree2.children.length != 0){

  	return     recur( points1, tris1, points2, tris2, aabb_tree1, aabb_tree2.children[0] )
  		.concat( recur( points1, tris1, points2, tris2, aabb_tree1, aabb_tree2.children[1] ) );

  } else if (aabb_tree1.children.length != 0 && aabb_tree2.children.length === 0){

  	return     recur( points1, tris1, points2, tris2, aabb_tree1.children[0], aabb_tree2 )
  		.concat( recur( points1, tris1, points2, tris2, aabb_tree1.children[1], aabb_tree2 ) );

  } else if (aabb_tree1.children.length != 0 && aabb_tree2.children.length != 0){

  	return     recur( points1, tris1, points2, tris2, aabb_tree1.children[0], aabb_tree2.children[0] )
  		.concat( recur( points1, tris1, points2, tris2, aabb_tree1.children[0], aabb_tree2.children[1] ) )
  		.concat( recur( points1, tris1, points2, tris2, aabb_tree1.children[1], aabb_tree2.children[0] ) )
  		.concat( recur( points1, tris1, points2, tris2, aabb_tree1.children[1], aabb_tree2.children[1] ) );

  }

}

//
// ####make_mesh_aabb_tree( points, tris, tri_indices )
//
// Make tree of axis aligned bounding boxes 
//
// **params**
// + *Array*, array of length 3 arrays of numbers representing the points
// + *Array*, array of length 3 arrays of number representing the triangles
// + *Array*, array of numbers representing the relevant triangles to use to form aabb
// 
// **returns** 
// + *Array*, a point represented by an array of length (dim)
//

verb.eval.mesh.make_mesh_aabb_tree = function( points, tris, tri_indices ) {

	// build bb
	var aabb = { 	bounding_box: verb.eval.mesh.make_mesh_aabb( points, tris, tri_indices ), 
								children: [] };

	// if only one ele, terminate recursion and store the triangles
	if (tri_indices.length === 1){
		aabb.triangle = tri_indices[0];
		return aabb;
	}

	// sort triangles in sub mesh
	var sorted_tri_indices = verb.eval.mesh.sort_tris_on_longest_axis( aabb.bounding_box, points, tris, tri_indices )
		, tri_indices_a = sorted_tri_indices.slice( 0, Math.floor( sorted_tri_indices.length / 2 ) )
		, tri_indices_b = sorted_tri_indices.slice( Math.floor( sorted_tri_indices.length / 2 ), sorted_tri_indices.length );

	// recurse 
	aabb.children = [ verb.eval.mesh.make_mesh_aabb_tree(points, tris, tri_indices_a), 
										verb.eval.mesh.make_mesh_aabb_tree(points, tris, tri_indices_b) ];

	// return result
	return aabb;

}

//
// ####make_mesh_aabb( points, tris, tri_indices )
//
// Form axis-aligned bounding box from triangles of mesh
//
// **params**
// + *Array*, array of length 3 arrays of numbers representing the points
// + *Array*, array of length 3 arrays of number representing the triangles
// + *Array*, array of numbers representing the relevant triangles
// 
// **returns** 
// + *Array*, a point represented by an array of length (dim)
//

verb.eval.mesh.make_mesh_aabb = function( points, tris, tri_indices ) {

	var bb = new verb.geom.BoundingBox();

	tri_indices.forEach(function(x){
		bb.add( points[ tris[ x ][0] ] );
		bb.add( points[ tris[ x ][1] ] );
		bb.add( points[ tris[ x ][2] ] );
	});

	return bb;

}

//
// ####sort_tris_on_longest_axis( container_bb, points, tris, tri_indices )
//
// Sort triangles on longest axis
//
// **params**
// + *Number*, integer degree of surface in u direction
// + *Array*, array of nondecreasing knot values in u direction
// + *Number*, integer degree of surface in v direction
// + *Array*, array of nondecreasing knot values in v direction
// 
// **returns** 
// + *Array*, a point represented by an array of length (dim)
//

verb.eval.mesh.sort_tris_on_longest_axis = function( container_bb, points, tris, tri_indices ) {

	var long_axis = container_bb.get_longest_axis();

	var axis_position_map = [];
	for (var i = tri_indices.length - 1; i >= 0; i--) {

		var tri_i = tri_indices[i],
			tri_min = verb.eval.mesh.get_min_coordinate_on_axis( points, tris[ tri_i ], long_axis );

		axis_position_map.push( [ tri_min, tri_i ] );

	}

	axis_position_map.sort(function(a,b) { return a[0] > b[0] } );

	var sorted_tri_indices = [];
	for (var i = 0, l = axis_position_map.length; i < l; i++) {
		sorted_tri_indices.push( axis_position_map[i][1] );
	}

	return sorted_tri_indices;

}

//
// ####get_min_coordinate_on_axis( points, tri, axis )
//
// Get min coordinate on axis
//
// **params**
// + *Array*, array of length 3 arrays of numbers representing the points
// + *Array*, length 3 array of point indices for the triangle
// 
// **returns** 
// + *Number*, a point represented by an array of length 3
//

verb.eval.mesh.get_min_coordinate_on_axis = function( points, tri, axis ) {

	var axis_coords = [];

	for (var i = 0; i < 3; i++){
		axis_coords.push( points[ tri[i] ][ axis ] );
	}

	return Math.min.apply(Math, axis_coords);
};

//
// ####get_tri_centroid( points, tri )
//
// Get triangle centroid
//
// **params**
// + *Array*, array of length 3 arrays of numbers representing the points
// + *Array*, length 3 array of point indices for the triangle
// 
// **returns** 
// + *Array*, a point represented by an array of length 3
//

verb.eval.geom.get_tri_centroid = function( points, tri ) {

	var centroid = [0,0,0];

	for (var i = 0; i < 3; i++){
		for (var j = 0; j < 3; j++){
			centroid[j] += points[ tri[i] ][j];
		}
	}

	for (var i = 0; i < 3; i++){
		centroid[i] /= 3;
	}

	return centroid;

};

//
// ####get_tri_norm( points, tri )
//
// Get triangle normal
//
// **params**
// + *Array*, array of length 3 arrays of numbers representing the points
// + *Array*, length 3 array of point indices for the triangle
// 
// **returns** 
// + *Array*, a normal vector represented by an array of length 3
//

verb.eval.geom.get_tri_norm = function( points, tri ) {

	var v0 = points[ tri[0] ]
		, v1 = points[ tri[1] ]
		, v2 = points[ tri[2] ]
		, u = numeric.sub( v1, v0 )
		, v = numeric.sub( v2, v0 )
		, n = numeric.cross( u, v );

	return numeric.mul( 1 / numeric.norm2( n ), n );

};

//
// ####intersect_rational_curves_by_aabb_refine( degree1, knots1, homo_control_points1, degree2, knots2, homo_control_points2, sample_tol, tol )
//
// Approximate the intersection of two nurbs surface by axis-aligned bounding box intersection and then refine all solutions.
//
// **params**
// + *Number*, integer degree of curve1
// + *Array*, array of nondecreasing knot values for curve 1
// + *Array*, 2d array of homogeneous control points, where each control point is an array of length (dim+1) and form (wi*pi, wi) for curve 1
// + *Number*, integer degree of curve2
// + *Array*, array of nondecreasing knot values for curve 2
// + *Array*, 2d array of homogeneous control points, where each control point is an array of length (dim+1) and form (wi*pi, wi) for curve 2
// + *Number*, tolerance for the intersection
// 
// **returns** 
// + *Array*, a 2d array specifying the intersections on u params of intersections on curve 1 and cruve 2
//

verb.eval.nurbs.intersect_rational_curves_by_aabb_refine = function( degree1, knots1, homo_control_points1, degree2, knots2, homo_control_points2, sample_tol, tol ) {

	var ints = verb.eval.nurbs.intersect_rational_curves_by_aabb( degree1, knots1, homo_control_points1, degree2, knots2, homo_control_points2, sample_tol, tol );

	return ints.map(function(start_params){
		return verb.eval.nurbs.refine_rational_curve_intersection( degree1, knots1, homo_control_points1, degree2, knots2, homo_control_points2, start_params )
	});

}


//
// ####rational_curve_curve_bb_intersect_refine( degree1, knots1, control_points1, degree2, knots2, control_points2, start_params )
//
// Refine an intersection pair for two curves given an initial guess.  This is an unconstrained minimization,
// so the caller is responsible for providing a very good initial guess.
//
// **params**
// + *Number*, integer degree of curve1
// + *Array*, array of nondecreasing knot values for curve 1
// + *Array*, 2d array of homogeneous control points, where each control point is an array of length (dim+1) 
 									// and form (wi*pi, wi) for curve 1
// + *Number*, integer degree of curve2
// + *Array*, array of nondecreasing knot values for curve 2
// + *Array*, 2d array of homogeneous control points, where each control point is an array of length (dim+1) 
 									// and form (wi*pi, wi) for curve 2
// + *Array*, length 2 array with first param guess in first position and second param guess in second position
// 
// **returns** 
// + *Array*, a length 3 array containing the [ distance// distance, u1, u2 ]
//

verb.eval.nurbs.refine_rational_curve_intersection = function( degree1, knots1, control_points1, degree2, knots2, control_points2, start_params ) {

	var objective = function(x) { 

		var p1 = verb.eval.nurbs.rational_curve_point(degree1, knots1, control_points1, x[0])
			, p2 = verb.eval.nurbs.rational_curve_point(degree2, knots2, control_points2, x[1])
			, p1_p2 = numeric.sub(p1, p2);

		return numeric.dot(p1_p2, p1_p2);
	}

	var sol_obj = numeric.uncmin( objective, start_params);
	return sol_obj.solution.concat( sol_obj.f );

}

//
// ####intersect_rational_curves_by_aabb( degree1, knots1, homo_control_points1, degree2, knots2, homo_control_points2, sample_tol, tol )
//
// Approximate the intersection of two nurbs surface by axis-aligned bounding box intersection.
//
// **params**
// + *Number*, integer degree of curve1
// + *Array*, array of nondecreasing knot values for curve 1
// + *Array*, 2d array of homogeneous control points, where each control point is an array of length (dim+1) and form (wi*pi, wi) for curve 1
// + *Number*, integer degree of curve2
// + *Array*, array of nondecreasing knot values for curve 2
// + *Array*, 2d array of homogeneous control points, where each control point is an array of length (dim+1) and form (wi*pi, wi) for curve 2
// + *Number*, tolerance for the intersection
// 
// **returns** 
// + *Array*, array of parameter pairs representing the intersection of the two parameteric polylines
//

verb.eval.nurbs.intersect_rational_curves_by_aabb = function( degree1, knots1, homo_control_points1, degree2, knots2, homo_control_points2, sample_tol, tol ) {

	var up1 = verb.eval.nurbs.rational_curve_adaptive_sample( degree1, knots1, homo_control_points1, sample_tol, true)
		, up2 = verb.eval.nurbs.rational_curve_adaptive_sample( degree2, knots2, homo_control_points2, sample_tol, true)
		, u1 = up1.map( function(el) { return el[0]; })
		, u2 = up2.map( function(el) { return el[0]; })
		, p1 = up1.map( function(el) { return el.slice(1) })
		, p2 = up2.map( function(el) { return el.slice(1) });

	return verb.eval.nurbs.intersect_parametric_polylines_by_aabb( p1, p2, u1, u2, tol );

}

//
// ####intersect_parametric_polylines_by_aabb( p1, p2, u1, u2, tol )
//
// Intersect two polyline curves, keeping track of parameterization on each
//
// **params**
// + *Array*, array of point values for curve 1
// + *Array*, array of parameter values for curve 1, same length as first arg
// + *Array*, array of point values for curve 2
// + *Array*, array of parameter values for curve 2, same length as third arg
// + *Number*, tolerance for the intersection
// 
// **returns** 
// + *Array*, array of parameter pairs representing the intersection of the two parameteric polylines
//

verb.eval.nurbs.intersect_parametric_polylines_by_aabb = function( p1, p2, u1, u2, tol ) {

	var bb1 = new verb.geom.BoundingBox(p1)
		, bb2 = new verb.geom.BoundingBox(p2);

	if ( !bb1.intersects(bb2, tol) ) {
		return [];
	}

	if (p1.length === 2 && p2.length === 2 ){

			var inter = verb.eval.geom.intersect_segments(p1[0],p1[1], p2[0], p2[1], tol);

			if ( inter != null ){

				// map the parameters of the segment to the parametric space of the entire polyline
			 	inter[0][0] = inter[0][0] * ( u1[1]-u1[0] ) + u1[0];
			 	inter[1][0] = inter[1][0] * ( u2[1]-u2[0] ) + u2[0];

			 	return [ [ inter[0][0], inter[1][0] ] ];

			} 

	} else if (p1.length === 2) {

		var p2_mid = Math.ceil( p2.length / 2 ),
				p2_a = p2.slice( 0, p2_mid ),
				p2_b = p2.slice( p2_mid-1 ),
				u2_a = u2.slice( 0, p2_mid ),
				u2_b = u2.slice( p2_mid-1 );

		return 	 verb.eval.nurbs.intersect_parametric_polylines_by_aabb(p1, p2_a, u1, u2_a, tol)
		.concat( verb.eval.nurbs.intersect_parametric_polylines_by_aabb(p1, p2_b, u1, u2_b, tol) );

	} else if (p2.length === 2) {

		var p1_mid = Math.ceil( p1.length / 2 ),
				p1_a = p1.slice( 0, p1_mid ),
				p1_b = p1.slice( p1_mid-1 ),
				u1_a = u1.slice( 0, p1_mid ),
				u1_b = u1.slice( p1_mid-1 );

		return 		 verb.eval.nurbs.intersect_parametric_polylines_by_aabb(p1_a, p2, u1_a, u2, tol)
			.concat( verb.eval.nurbs.intersect_parametric_polylines_by_aabb(p1_b, p2, u1_b, u2, tol) );

	} else {

		var p1_mid = Math.ceil( p1.length / 2 ),
				p1_a = p1.slice( 0, p1_mid ),
				p1_b = p1.slice( p1_mid-1 ),
				u1_a = u1.slice( 0, p1_mid ),
				u1_b = u1.slice( p1_mid-1 ),

				p2_mid = Math.ceil( p2.length / 2 ),
				p2_a = p2.slice( 0, p2_mid ),
				p2_b = p2.slice( p2_mid-1 ),
				u2_a = u2.slice( 0, p2_mid ),
				u2_b = u2.slice( p2_mid-1 );

		return 		 verb.eval.nurbs.intersect_parametric_polylines_by_aabb(p1_a, p2_a, u1_a, u2_a, tol)
			.concat( verb.eval.nurbs.intersect_parametric_polylines_by_aabb(p1_a, p2_b, u1_a, u2_b, tol) )
			.concat( verb.eval.nurbs.intersect_parametric_polylines_by_aabb(p1_b, p2_a, u1_b, u2_a, tol) )
			.concat( verb.eval.nurbs.intersect_parametric_polylines_by_aabb(p1_b, p2_b, u1_b, u2_b, tol) );

	}

	return [];

}

//
// ####intersect_segments( a0, a1, b0, b1, tol )
//
// Find the closest parameter on two rays, see http://geomalgorithms.com/a07-_distance.html
//
// **params**
// + *Array*, first point on a
// + *Array*, second point on a
// + *Array*, first point on b
// + *Array*, second point on b
// + *Number*, tolerance for the intersection
// 
// **returns** 
// + *Array*, a 2d array specifying the intersections on u params of intersections on curve 1 and cruve 2
//

verb.eval.geom.intersect_segments = function( a0, a1, b0, b1, tol ) {

	// get axis and length of segments
	var a1ma0 = numeric.sub(a1, a0),
			aN = Math.sqrt( numeric.dot(a1ma0, a1ma0) ),
			a = numeric.mul( 1/ aN, a1ma0 ),
			b1mb0 = numeric.sub(b1, b0),
			bN = Math.sqrt( numeric.dot(b1mb0, b1mb0) ),
			b = numeric.mul( 1 / bN, b1mb0 ),
			int_params = verb.eval.geom.intersect_rays(a0, a, b0, b);

	if ( int_params != null ) {

		var u1 = Math.min( Math.max( 0, int_params[0] / aN ), 1.0),
				u2 = Math.min( Math.max( 0, int_params[1] / bN ), 1.0),
				int_a = numeric.add( numeric.mul( u1, a1ma0 ), a0 ),
				int_b = numeric.add( numeric.mul( u2, b1mb0 ), b0 ),
				dist = numeric.norm2Squared( numeric.sub(int_a, int_b) );

		if (  dist < tol*tol ) {
			return [ [u1].concat(int_a), [u2].concat(int_b) ] ;
		} 

	}
	
	return null;

 }

//
// ####closest_point_on_ray( pt, o, r )
//
// Find the closest point on a ray
//
// **params**
// + *Array*, point to project
// + *Array*, origin for ray
// + *Array*, direction of ray 1, assumed normalized
// 
// **returns** 
// + *Array*, [param, pt]
//

verb.eval.geom.closest_point_on_ray = function( pt, o, r ) {

		var o2pt = numeric.sub(pt,o)
			, do2ptr = numeric.dot(o2pt, r)
			, proj = numeric.add(o, numeric.mul(do2ptr, r));

		return proj;

 }

//
// ####intersect_rays( a0, a, b0, b )
//
// Find the closest parameter on two rays, see http://geomalgorithms.com/a07-_distance.html
//
// **params**
// + *Array*, origin for ray 1
// + *Array*, direction of ray 1, assumed normalized
// + *Array*, origin for ray 1
// + *Array*, direction of ray 1, assumed normalized
// 
// **returns** 
// + *Array*, a 2d array specifying the intersections on u params of intersections on curve 1 and curve 2
//

verb.eval.geom.intersect_rays = function( a0, a, b0, b ) {

   var dab = numeric.dot( a, b ),
		   dab0 = numeric.dot( a, b0 ),
		   daa0 = numeric.dot( a, a0 ),
		   dbb0 = numeric.dot( b, b0 ),
		   dba0 = numeric.dot( b, a0 ),
		   daa = numeric.dot( a, a ),
		   dbb = numeric.dot( b, b ),
		   div = daa*dbb - dab*dab;

	// parallel case
   if ( Math.abs( div ) < verb.EPSILON ) { 
	   return null;
   }

   var num = dab * (dab0-daa0) - daa * (dbb0-dba0),
   		 w = num / div,
			 t = (dab0 - daa0 + w * dab)/daa;

		return [t, w];

 }




//
// ####intersect_meshes_by_aabb( points1, tris1, uvs1, points2, tris2, uvs2 )
//
// Intersect two meshes via aabb intersection
//
// **params**
// + *Number*, integer degree of surface in u direction
// + *Array*, array of nondecreasing knot values in u direction
// + *Number*, integer degree of surface in v direction
// + *Array*, array of nondecreasing knot values in v direction
// + *Array*, 3d array of control points, top to bottom is increasing u direction, left to right is increasing v direction,
// and where each control point is an array of length (dim+1)
// + *Number*, u parameter at which to evaluate the surface point
// + *Number*, v parameter at which to evaluate the surface point
// 
// **returns** 
// + *Array*, a point represented by an array of length (dim)
//

verb.eval.mesh.intersect_meshes_by_aabb = function( points1, tris1, uvs1, points2, tris2, uvs2 ) {

	// build aabb for each mesh
	var tri_indices1 = verb.range(tris1.length)
	  , tri_indices2 = verb.range(tris2.length)
	  , aabb1 = verb.eval.mesh.make_mesh_aabb_tree( points1, tris1, tri_indices1 )
	  , aabb2 = verb.eval.mesh.make_mesh_aabb_tree( points2, tris2, tri_indices2 )
  
  // intersect and get the pairs of triangle intersctions
		, intersection_pairs = verb.eval.mesh.intersect_aabb_tree( points1, tris1, points2, tris2, aabb1, aabb2 );

	// get the segments of the intersection crv with uvs

	// sort the intersection segments

	// TODO

}

//
// ####intersect_tris( points1, tri1, uvs1, points2, tri2, uvs2 )
//
// Intersect two triangles
//
// **params**
// + *Array*, array of length 3 arrays of numbers representing the points of mesh1
// + *Array*, array of length 3 arrays of number representing the triangles of mesh1
// + *Array*, array of length 3 arrays of numbers representing the points of mesh2
// + *Array*, array of length 3 arrays of number representing the triangles of mesh2
// 
// **returns** 
// + *Array*, a point represented by an array of length (dim)
//

verb.eval.geom.intersect_tris = function( points1, tri1, uvs1, points2, tri2, uvs2 ) {

  var seg1a = [ points1[ tr1[0] ], points1[ tr1[1] ] ]
  	, seg1b = [ points1[ tr1[1] ], points1[ tr1[2] ] ]
  	, seg1c = [ points1[ tr1[2] ], points1[ tr1[0] ] ]
  	, seg2a = [ points2[ tr2[0] ], points2[ tr2[1] ] ]
  	, seg2b = [ points2[ tr2[1] ], points2[ tr2[2] ] ]
  	, seg2c = [ points2[ tr2[2] ], points2[ tr2[0] ] ] 
  	, segs1 = [ seg1a, seg1b, seg1c ]
  	, segs2 = [ seg2a, seg2b, seg2c ]
  	, int_results = []
  	, tri2norm = verb.eval.geom.get_tri_norm(points2, tri2)
  	, pt2 = points2[ tr2[0] ];

  for (var i = 0; i < 3; i++){
  	
  	var result = verb.eval.geom.intersect_segment_with_plane( segs1[i][0], segs2[i][1], pt2, tri2norm );
    
    if ( result.intersects ){
    	int_results.push( result );
    }

  }

  // if you don't have 2 intersections you do not have an intersection,
  // 0 would mean a glancing intersection
  // 3 means we don't have a triangle
  if ( int_results.length !== 2 ){
  	return null;
  }

  // what portions of the segment lie within triangle 2

  // intersect edges of triangle 2 with the segment, obtaining the "inner" triangle
  var seg = [int_results[0].point, int_results[1].point ]
  	, seg_int_results = [];

  for (var i = 0; i < 3; i++){
  	var seg_int_result = verb.eval.geom.intersect_segments( seg[0], seg[1], seg, b1, tol );
  	if ( seg_int_result ){
  		seg_int_results.push( seg_int_result );
  	}
  }

  // all intersections should be with uv's 

  if ( seg_int_results.length === 0 ) {

  	// tri1 is intersecting and the intersection segment
  	// is inside tri2

  	// TODO

  	// return the two outer points

  } else if ( seg_int_results.length === 1 ) {

  	// tri1 is intersecting and the intersection segment
  	// is partially inside tri2

  	// TODO

  	// return the end point of seg that is INSIDE tri2 and the intersection

  } else if ( seg_int_results.length === 2 ) {

  	// tri1 is intersecting and the intersection segment's
  	// end points are outside of tri2

  	// TODO

  	// return the two seg_int_results 

  } 

}
//
// ####tessellate_rational_surface_uniform_cubic( degree_u, knots_u, degree_v, knots_v, homo_control_points, tol )
//
// Tessellate a NURBS surface given a tolerance.  The result is a uniform triangular mesh.  The surface must be >=degree 3
// in both directions.
//
// See Piegl & Richard, Tessellating Trimmed NURBS Surfaces, 1995
//
// **params**
// + *Number*, integer degree of surface in u direction
// + *Array*, array of nondecreasing knot values in u direction
// + *Number*, integer degree of surface in v direction
// + *Array*, array of nondecreasing knot values in v direction
// + *Array*, 3d array of control points, top to bottom is increasing u direction, left to right is increasing v direction,
// and where each control point is an array of length (dim+1)
// + *Number*, maximum deviation from the surface
// 
// **returns** 
// + *Array*, first element of array is an array of positions, second element are 3-tuple of triangle windings, third element is the 
// uvs
verb.eval.nurbs.tessellate_rational_surface_uniform_cubic = function( degree_u, knots_u, degree_v, knots_v, homo_control_points, tol ){

	if (degree_u < 3 || degree_v < 3) throw new Error("The surface must be degree >=3 in both directions!")

	var stepSize = verb.eval.nurbs.compute_rational_surface_max_edge_length( degree_u, knots_u, degree_v, knots_v, homo_control_points, tol );
	
	var udom = knots_u[knots_u.length-1] - knots_u[0];
	var vdom = knots_v[knots_v.length-1] - knots_v[0];

	var uSteps = (udom / stepSize) + 1;
	var vSteps = (vdom / stepSize) + 1;

	return verb.eval.nurbs.tessellate_rational_surface_naive( degree_u, knots_u, degree_v, knots_v, homo_control_points, uSteps, vSteps );

}

//
// ####compute_rational_surface_max_edge_length( degree_u, knots_u, degree_v, knots_v, homo_control_points, tol )
//
// Determine the step size for a given surface in order to be under the supplied maximum deviation
//
// **params**
// + *Number*, integer degree of surface in u direction
// + *Array*, array of nondecreasing knot values in u direction
// + *Number*, integer degree of surface in v direction
// + *Array*, array of nondecreasing knot values in v direction
// + *Array*, 3d array of control points, top to bottom is increasing u direction, left to right is increasing v direction,
// and where each control point is an array of length (dim+1)
// + *Number*, maximum deviation from the surface
// 
// **returns** 
// + *Number*, the step size to use in both directions
//
verb.eval.nurbs.compute_rational_surface_max_edge_length = function( degree_u, knots_u, degree_v, knots_v, homo_control_points, tol ){

	// using the second derivative surfaces, compute the max edge length according to (22)

	// min w * ( eps / (1 + max( len(p) ) ) )

	var nu = homo_control_points.length;
	var nv = homo_control_points[0].length;

	var maxlen = 0;

	for (var i = 0; i < nu; i++){
		for (var j = 0; j < nv; j++){
			var len = numeric.norm2( homo_control_points[i][j] );
			if (len > maxlen) maxlen = len;
		}
	}

	var denom = 1 + maxlen;
	var wi = homo_control_points[0][0].length - 1;

	var epsw = Number.MAX_VALUE;

	for (var i = 0; i < nu; i++){
		for (var j = 0; j < nv; j++){
			var wt = homo_control_points[i][j][wi];
			var val = wt * tol / denom;
			if (val < epsw) epsw = val;
		}
	}

	var d2bounds = verb.eval.nurbs.compute_rational_surface_deriv2_bounds( degree_u, knots_u, degree_v, knots_v, homo_control_points );

	// use equation (22) to determine the bounds on the surface
	return (Math.sqrt(2) / 2) *  3 * Math.sqrt( epsw / (2 * ( d2bounds[0] + d2bounds[1] + 2 * d2bounds[2])));

}

//
// ####compute_rational_surface_deriv2_bounds( degree_u, knots_u, degree_v, knots_v, homo_control_points )
//
// Compute the maximum magnitude of the second derivative on the surface.  This is done by forming the second
// derivative surfaces and inspecting the magnitudes of their control points.
//
// **params**
// + *Number*, integer degree of surface in u direction
// + *Array*, array of nondecreasing knot values in u direction
// + *Number*, integer degree of surface in v direction
// + *Array*, array of nondecreasing knot values in v direction
// + *Array*, 3d array of control points, top to bottom is increasing u direction, left to right is increasing v direction,
// and where each control point is an array of length (dim+1)
// 
// **returns** 
// + *Array*, [ maxp20, maxp02, maxp11 ]
//
verb.eval.nurbs.compute_rational_surface_deriv2_bounds = function( degree_u, u, degree_v, v, pts ){

	// we find the bounds on the second derivatives of the surface
	// by constructing second partial derivative surfaces

	// construct the second derivative surface control points according to (9), (11), (13) 
	var n = pts.length;
	var m = pts[0].length;

	// form the control points of the p20 surface
	var n2 = n-2;
	var p = degree_u;
	var pp1 = p * (p-1);

	var maxp20 = 0;

	for(var i = 0; i < n2; i++){
		for(var j = 0; j < m; j++){

			var pij = pts[i][j];
			var pi1j = pts[i+1][j];
			var pi2j = pts[i+2][j];
			
			var ptdiff1 = numeric.sub( pi2j, pi1j );
			var ptdiff2 = numeric.sub( pi1j, pij );

			var ptdiffscaled1 = numeric.mul( 1 / (u[i+p+2] - u[i+2]), ptdiff1 );
			var ptdiffscaled2 = numeric.mul( 1 / (u[i+p+1] - u[i+1]), ptdiff2 );

			var ptdiffFinal = numeric.sub( ptdiffscaled1, ptdiffscaled2 );
			var finalScale = pp1 / ( u[i+p+1] - u[i+2] );

			var max = numeric.norm2( numeric.mul( finalScale, ptdiffFinal ) );
			if (max > maxp20) maxp20 = max;
			
		}
	}

	// form the control points of the p02 surface
	var q = degree_v; 
	var qq1 = q * (q-1);
	var m2 = m - 2;

	var maxp02 = 0;

	for(var i = 0; i < n; i++){
		for(var j = 0; j < m2; j++){

			var pij = pts[i][j];
			var pij1 = pts[i][j+1];
			var pij2 = pts[i][j+2];
			
			var ptdiff1 = numeric.sub( pij2, pij1 );
			var ptdiff2 = numeric.sub( pij1, pij );

			var ptdiffscaled1 = numeric.mul( 1 / (v[j+q+2] - v[j+2]), ptdiff1 );
			var ptdiffscaled2 = numeric.mul( 1 / (v[j+q+1] - v[j+1]), ptdiff2 );

			var ptdiffFinal = numeric.sub( ptdiffscaled1, ptdiffscaled2 );
			var finalScale = qq1 / ( v[j+q+1] - v[j+2] );

			var max = numeric.norm2( numeric.mul( finalScale, ptdiffFinal ) );
			if (max > maxp02) maxp02 = max;
			
		}
	}

	// form the control points of the p11 surface
	var p11pts = [];
	var pq = p * q;
	var n1 = n - 1;
	var m1 = m - 1;

	var maxp11 = 0;

	for(var i = 0; i < n1; i++){
		for(var j = 0; j < m1; j++){

			var pij = pts[i][j];
			var pi1j = pts[i+1][j];
			var pij1 = pts[i][j+1];
			var pi1j1 = pts[i+1][j+1];
			
			var ptdiff = numeric.add( numeric.sub( numeric.sub( pi1j1, pij1 ), pi1j), pij );
			var ptdiffscaled = numeric.mul( 1 / (u[i+p+1] - u[i+1]), ptdiff );

			var finalScale = pq / (v[j+q+1] - v[j+1]);

			var max = numeric.norm2( numeric.mul( finalScale, ptdiffscaled ) );
			if (max > maxp11) maxp11 = max;
			
		}
	}

	return [maxp20, maxp02, maxp11];

}


//
// ####tessellate_rational_surface_naive( degree_u, knots_u, degree_v, knots_v, homo_control_points, divs_u, divs_v )
//
// Tessellate a nurbs surface
//
// **params**
// + *Number*, integer degree of surface in u direction
// + *Array*, array of nondecreasing knot values in u direction
// + *Number*, integer degree of surface in v direction
// + *Array*, array of nondecreasing knot values in v direction
// + *Array*, 3d array of control points, top to bottom is increasing u direction, left to right is increasing v direction,
// and where each control point is an array of length (dim+1)
// 
// **returns** 
// + *Array*, first element of array is an array of positions, second element are 3-tuple of triangle windings, third element is the 
// uvs

verb.eval.nurbs.tessellate_rational_surface_naive = function( degree_u, knots_u, degree_v, knots_v, homo_control_points, divs_u, divs_v ) {

	if ( divs_u < 1 ) {
		divs_u = 1;
	}

	if ( divs_v < 1 ) {
		divs_v = 1;
	}

	var span_u = 1 / divs_u,
		span_v = 1 / divs_v;
  
  var points = [];
  var uvs = [];
  var normals = [];

	for (var i = 0; i < divs_u + 1; i++) {
		for (var j = 0; j < divs_v + 1; j++) {

			var pt_u = i * span_u, 
				pt_v = j * span_v;

			uvs.push( [pt_u, pt_v] );

			var derivs = verb.eval.nurbs.rational_surface_derivs( degree_u, knots_u, degree_v, knots_v, homo_control_points, 1, pt_u, pt_v );
			var pt = derivs[0][0];

			points.push( pt );

			var normal = numeric.cross(  derivs[0][1], derivs[1][0] );
			normals.push( normal );

		}
	}

  	var faces = [];

	for (var i = 0; i < divs_u ; i++) {
		for (var j = 0; j < divs_v ; j++) {

			var a_i = i * (divs_v + 1) + j,
				b_i = (i + 1) * (divs_v + 1) + j,
				c_i = b_i + 1,
				d_i = a_i + 1,
				abc = [a_i, b_i, c_i],
				acd = [a_i, c_i, d_i];

			faces.push(abc);
			faces.push(acd);

		}
	}

	return { points: points, faces : faces, uvs: uvs, normals: normals };

}



//
// ####rational_curve_regular_sample( degree, knots, control_points, num_samples [, include_u] )
//
// Sample a NURBS curve assuming parameterization 0 to 1, corresponds to http://ariel.chronotext.org/dd/defigueiredo93adaptive.pdf
//
// **params**
// + *Number*, integer degree
// + *Array*, array of nondecreasing knot values 
// + *Array*, 1d array of homogeneous control points, where each control point is an array of length (dim+1) and form (wi*pi, wi) 
// + *Number*, integer number of samples
// 
// **returns** 
// + *Array*, an array of points, prepended by the point param
//

verb.eval.nurbs.rational_curve_regular_sample = function( degree, knots, control_points, num_samples, include_u ) {

	return verb.eval.nurbs.rational_curve_regular_sample_range( degree, knots, control_points, 0, 1.0, num_samples, include_u);

}

//
// ####rational_curve_regular_sample_range( degree, knots, control_points, start_u, end_u, num_samples, include_u )
//
// Sample a NURBS curve assuming parameterization 0 to 1, corresponds to http://ariel.chronotext.org/dd/defigueiredo93adaptive.pdf
//
// **params**
// + *Number*, integer degree
// + *Array*, array of nondecreasing knot values 
// + *Array*, 1d array of homogeneous control points, where each control point is an array of length (dim+1) and form (wi*pi, wi) 
// + *Number*, start parameter for sampling
// + *Number*, end parameter for sampling
// + *Number*, integer number of samples
// + *Boolean*, whether to prefix the point with the parameter
// 
// **returns** 
// + *Array*, an dictionary of parameter - point pairs
//

verb.eval.nurbs.rational_curve_regular_sample_range = function( degree, knots, control_points, start_u, end_u, num_samples, include_u ) {

	if (num_samples < 1){
		num_samples = 2;
	}

	var p = [],
		span = (end_u - start_u) / (num_samples - 1),
		u = 0;

	for (var i = 0; i < num_samples; i++){

		u = start_u + span * i;
		if ( include_u ){
			p.push( [u].concat( verb.eval.nurbs.rational_curve_point(degree, knots, control_points, u) ) );
		} else {
			p.push( verb.eval.nurbs.rational_curve_point(degree, knots, control_points, u) );
		}
	
	}

	return p;

}

//
// ####rational_curve_adaptive_sample( degree, knots, control_points, tol, include_u )
//
// Sample a NURBS curve assuming parameterization 0 to 1, corresponds to http://ariel.chronotext.org/dd/defigueiredo93adaptive.pdf
//
// **params**
// + *Number*, integer degree
// + *Array*, array of nondecreasing knot values 
// + *Array*, 2d array of homogeneous control points, where each control point is an array of length (dim+1) 
// and form (wi*pi, wi) 
// + *Number*, tol for the adaptive scheme
// + *Boolean*, whether to prefix the point with the parameter
// 
// **returns** 
// + *Array*, an array of dim + 1 length where the first element is the param where it was sampled and the remaining the pt
//

verb.eval.nurbs.rational_curve_adaptive_sample = function( degree, knots, control_points, tol, include_u ) {

	// if degree is 1, just return the dehomogenized control points
	if (degree === 1){ 
		if ( !include_u ) {
			return control_points.map( verb.eval.nurbs.dehomogenize );
		} else {
			// the first element of each array is the parameter
			return control_points.map(function(x, i){
				return [ knots[i+1] ].concat( verb.eval.nurbs.dehomogenize( x ) );
			});
		}
	}

	return verb.eval.nurbs.rational_curve_adaptive_sample_range( degree, knots, control_points, knots[0], knots[knots.length-1], tol, include_u );

}

//
// ####rational_curve_adaptive_sample_range( degree, knots, control_points, start_u, end_u, tol, include_u )
//
// Sample a NURBS curve at 3 points, facilitating adaptive sampling
//
// **params**
// + *Number*, integer degree
// + *Array*, array of nondecreasing knot values 
// + *Array*, 2d array of homogeneous control points, where each control point is an array of length (dim+1) 
// and form (wi*pi, wi) 
// + *Number*, start parameter for sampling
// + *Number*, end parameter for sampling
// + *Boolean*, whether to prefix the point with the parameter
// 
// **returns** 
// + *Array*, an array of dim + 1 length where the first element is the param where it was sampled and the remaining the pt
//

verb.eval.nurbs.rational_curve_adaptive_sample_range = function( degree, knots, control_points, start_u, end_u, tol, include_u ) {

	// sample curve at three pts
	var p1 = verb.eval.nurbs.rational_curve_point(degree, knots, control_points, start_u),
		p3 = verb.eval.nurbs.rational_curve_point(degree, knots, control_points, end_u),
		t = 0.5 + 0.2 * Math.random(),
		mid_u = start_u + (end_u - start_u) * t,
		p2 = verb.eval.nurbs.rational_curve_point(degree, knots, control_points, mid_u);

		// if the two end control points are coincident, the three point test will always return 0, let's split the curve
		var diff = numeric.sub( p1, p3);
		var diff2 = numeric.sub( p1, p2);

		// the first condition checks if the curve makes up a loop, if so, we will need to continue evaluation
		if ( ( numeric.dot( diff, diff ) < tol && numeric.dot( diff2, diff2 ) > tol ) || !verb.eval.nurbs.three_points_are_flat( p1, p2, p3, tol ) ) {

			// get the exact middle
			var exact_mid_u = start_u + (end_u - start_u) * 0.5;

			// recurse on the two halves
			var left_pts = verb.eval.nurbs.rational_curve_adaptive_sample_range( degree, knots, control_points, start_u, exact_mid_u, tol, include_u )
				, right_pts = verb.eval.nurbs.rational_curve_adaptive_sample_range( degree, knots, control_points, exact_mid_u, end_u, tol, include_u );

			// concatenate the two		
			return left_pts.slice(0, -1).concat(right_pts);

		} else {

			if (include_u){
				return [ 	[ start_u ].concat(p1) , [end_u].concat(p3) ];
			} else {
				return [ 	p1, p3 ];
			}

		}
}






//
// ####three_points_are_flat( p1, p2, p3, tol )
//
// Determine if three points form a straight line within a given tolerance for their 2 * squared area
//
//          * p2
//         / \
//        /   \
//       /     \ 
//      /       \
//     * p1 ---- * p3
//
// The area metric is 2 * the squared norm of the cross product of two edges, requiring no square roots and no divisions
//
// **params**
// + *Array*, p1
// + *Array*, p2
// + *Array*, p3
// + *Number*, The tolerance for whether the three points form a line
//
// **returns** 
// + *Number*, Whether the triangle passes the test
//
verb.eval.nurbs.three_points_are_flat = function( p1, p2, p3, tol ) {


	// find the area of the triangle without using a square root
	var p2mp1 = numeric.sub( p2, p1 )
		, p3mp1 = numeric.sub( p3, p1 )
		, norm = crossprod( p2mp1, p3mp1 )
		, area = numeric.dot( norm, norm );

	return area < tol;

}

function getEastNeighbor(index, i, j, min_divs_u, min_divs_v, divs){
	
	if (j === min_divs_v - 1){
		return null;
	}

	return divs[ index + 1 ];

}

function getNorthNeighbor(index, i, j, min_divs_u, min_divs_v, divs){

	if (i === 0){
		return null;
	}

	return divs[ index - min_divs_v ];

}

function getSouthNeighbor(index, i, j, min_divs_u, min_divs_v, divs){

	if (i === min_divs_u - 1){
		return null;
	}

	return divs[ index + min_divs_v ];

}

function getWestNeighbor(index, i, j, min_divs_u, min_divs_v, divs){

	if (j === 0){
		return null;
	}

	return divs[ index - 1 ];

}

verb.eval.nurbs.divide_rational_surface_adaptive = function( degree_u, knots_u, degree_v, knots_v, homo_control_points, options ) {

	// degree_u, knots_u, degree_v, knots_v, homo_control_points, 
	var srf = {
		degree_u: degree_u,
		knots_u: knots_u,
		degree_v: degree_v,
		knots_v: knots_v,
		homo_control_points: homo_control_points
	};

	var min_divs_u = options.minDivsU;
	var min_divs_v = options.minDivsV;

	// get necessary intervals
	var max_u = Math.max.apply(null, knots_u);
	var min_u = Math.min.apply(null, knots_u);
	var max_v = Math.max.apply(null, knots_v);
	var min_v = Math.min.apply(null, knots_v);

	var u_interval = (max_u - min_u) / min_divs_u
		, v_interval = (max_v - min_v) / min_divs_v;

	var divs = [];

	// make all of the nodes
	for (var i = 0; i < min_divs_u; i++){
		for (var j = 0; j < min_divs_v; j++){

			var u0 = min_u + u_interval * i
				, u1 = min_u + u_interval * (i + 1)
				, v0 = min_v + v_interval * j
				, v1 = min_v + v_interval * (j + 1);

		  divs.push( new verb.eval.nurbs.AdaptiveRefinementNode( srf, u0, u1, v0, v1, null, null ) );

		}
	}

	// assign all of the neighbors and divide
	for (var i = 0; i < min_divs_u; i++){
		for (var j = 0; j < min_divs_v; j++){

			var index = i * min_divs_v + j
				, n = getNorthNeighbor( index, i, j, min_divs_u, min_divs_v, divs )
				, e = getEastNeighbor( index, i, j, min_divs_u, min_divs_v, divs  )
				, s = getSouthNeighbor( index, i, j, min_divs_u, min_divs_v, divs )
				, w = getWestNeighbor( index, i, j, min_divs_u, min_divs_v, divs  );

		  divs[index].neighbors = [ n, e, s, w ];

		  divs.divide( options );

		}
	}

	return divs;

}

verb.eval.nurbs.is_rational_surface_domain_flat = function(srf, u0, u1, v0, v1, options ){

	var eval_srf = verb.eval.nurbs.rational_surface_point
		, u_half_step = (u[1] - u[0] / 2) * ( Math.random() * 0.1 + 1 )
		, v_half_step = (v[1] - v[0] / 2) * ( Math.random() * 0.1 + 1 )
		, p1 = eval_srf( srf.degree_u, srf.knots_u, srf.degree_v, srf.knots_v, srf.homo_control_points, u[0], v[0] )
		, p2 = eval_srf( srf.degree_u, srf.knots_u, srf.degree_v, srf.knots_v, srf.homo_control_points, u[0] + u_half_step, v[0] + v_half_step )
		, p3 = eval_srf( srf.degree_u, srf.knots_u, srf.degree_v, srf.knots_v, srf.homo_control_points, u[1], v[1] );

	return verb.eval.nurbs.three_points_are_flat( p1, p2 , p3, tol );

}

verb.eval.nurbs.triangulate_adaptive_refinement_node_tree = function( arrTree ){

	// triangulate all of the nodes of the tree
	var mesh = { uvs : [], points : [], normals : [], faces : [] };
	mesh.faces = arrTree.map(function(x){  x.triangulate( mesh ); }).flatten();
	return mesh;

};

verb.eval.nurbs.tessellate_rational_surface_adaptive = function( degree_u, knots_u, degree_v, knots_v, homo_control_points, options ) {

	// division step
	var arrArray = verb.eval.nurbs.divide_rational_surface_adaptive( degree_u, knots_u, degree_v, knots_v, homo_control_points, options );

	// triangulation step
	var res = verb.eval.nurbs.triangulate_adaptive_refinement_node_tree( arrTree );

	return verb.eval.nurbs.unique_mesh( res );

}

verb.eval.nurbs.unique_mesh = function( mesh ) {

	return mesh;

}


Array.prototype.where = function( predicate ){

	if (this.length === 0) return this;

	var res = [];

	for (var i = 0; i < this.length; i++){
		if ( predicate( this[i] ) ) res.push( this[i] );
	}

	return res;

}

verb.eval.nurbs.AdaptiveRefinementNode = function( srf, u0, u1, v0, v1, parentNode, neighbors ) {

	// 
	// Structure of the child nodes
	// in the adaptive refinement tree
  //      
  //  +--> u
  //  |
  //  v
  //  v
  // 
  //                        neighbors[0]
  //
	//                (u0,v0)---(u05,v0)---(u1,v0)
	//                  |           |          |
	//                  |     0     |     1    |
	//                  |           |          |
	// neighbors[3]   (u0,v05)--(u05,v05)--(u1,v05)   neighbors[1] 
	//                  |           |          | 
	//                  |     3     |     2    |
	//                  |           |          |
	//                (u0,v1)---(u05,v1)---(u1,v1)
	//
	//                        neighbors[2]
	//

	this.srf = srf;
	this.u0 = u0;
	this.u1 = u1;
	this.v0 = v0;
	this.v1 = v1;
	this.parentNode = parentNode;
	this.neighbors = neighbors;
	this.leafEdgeUvs = [[ u0, v0 ], [ u1, v0 ], [ u1, v1 ], [ u0, v1 ]];
	this.cachedEdgeUvs = [];

}

verb.eval.nurbs.AdaptiveRefinementNode.prototype.isLeaf = function(){
	return (this.children === undefined);
};


verb.eval.nurbs.AdaptiveRefinementNode.prototype.evalSurface = function( uv ){

	var derivs = verb.eval.nurbs.rational_surface_derivs( this.srf.degree_u, 
																												this.srf.knots_u, 
																												this.srf.degree_v, 
																												this.srf.knots_v, 
																												this.srf.homo_control_points, 
																												1, 
																												pt_u, 
																												pt_v );
	var pt = derivs[0][0];

	points.push( pt );

	var normal = numeric.cross(  derivs[0][1], derivs[1][0] );

	return { point: pt, normal: normal };

};


verb.eval.nurbs.AdaptiveRefinementNode.prototype.getEdgeUvs = function( edgeIndex ){

	// if its a leaf, there are no children to obtain uvs from
	if ( this.isLeaf() ) return [ this.leafEdgeUvs[ edgeIndex ] ]

	// get the uvs owned by the children along this edge
	this.cachedEdgeUvs[edgeIndex] = this.cachedEdgeUvs[edgeIndex] || this.children[ edgeIndex ].getEdgeUvs( edgeIndex )
																						 												.concat( this.children[ (edgeIndex + 1) % 4 ].getEdgeUvs( edgeIndex ));
	return this.cachedEdgeUvs[edgeIndex];
};

verb.eval.nurbs.AdaptiveRefinementNode.prototype.getAllEdgeUvs = function( edgeIndex ){

	var baseArr = [ this.leafEdgeUvs[edgeIndex] ];

	if ( this.neighbors[edgeIndex] === null ) return baseArr;

	// get opposite edges uvs
	var uvs = this.neighbors[edgeIndex].getEdgeUvs( ( edgeIndex + 2 ) % 4 );

	var funcIndex = edgeIndex % 2;

	var that = this;

	// range clipping functions
	var rangeFuncMap = [
		function(x){ return x[0] > that.u0 + verb.EPSILON && x[0] < that.u1 - verb.EPSILON; },
		function(x){ return x[1] > that.v0 + verb.EPSILON && x[1] < that.v1 - verb.EPSILON; }
	];

	// clip the range of uvs to match this one
	return baseArr.concat( uvs.where( rangeFuncMap[ funcIndex ] ).reverse() ) ;

};

verb.eval.nurbs.AdaptiveRefinementNode.prototype.triangulateLeaf = function( mesh ){

		var baseIndex = mesh.points.length - 1;

		var uvs = [];

		// enumerate all uvs in counter clockwise direction
		for (var i = 0; i < 4; i++){
			uvs.concat( this.getAllEdgeUvs(i) ); 
		}

		uvs.forEach(function(x){
			mesh.uvs.push(x);
			var point = this.evalSurface( x );

			mesh.points.push( point.point );
			mesh.normals.push( point.normal );

		});

		if (uvs.length === 4){

			// if the number of points is 4, we're just doing a
			// rectangle - just build the basic triangulated square
			mesh.faces.push( [ baseIndex + 1, baseIndex + 4, baseIndex + 2 ] );
			mesh.faces.push( [ baseIndex + 4, baseIndex + 3, baseIndex + 2 ] );

			// all done ;)
			return;

		}

		this.u05 = this.u05 || (this.u0 + this.u1) / 2;
		this.v05 = this.v05 || (this.v0 + this.v1) / 2;

		// make point at center of face
		mesh.uvs.push( [  this.u05, this.v05 ] );
		var center = this.evalSurface( [ this.u05, this.v05 ] );
		mesh.points.push( center.point );
		mesh.normals.push( center.normal );

		// get index 
		var centerIndex = mesh.points.length - 1;

		// build triangle fan from center
		for (var i = 0; i < uvs.length; i++){

			mesh.faces.push( [	centerIndex, 
													(baseIndex + i + 2) % uvs.length, 
													(baseIndex + i + 1) % uvs.length   ]);

		}

};

verb.eval.nurbs.AdaptiveRefinementNode.prototype.triangulate = function( mesh ){

	if ( this.isLeaf() ) return this.triangulateLeaf( mesh );

	// recurse on the children
	this.children.forEach(function(x){
		if (x === null) return;
		x.triangulate( mesh );
	});

};

verb.eval.nurbs.AdaptiveRefinementNode.prototype.shouldDivide = function( options, currentDepth ){

	if ( ( options.minDepth && currentDepth < options.minDepth ) ){
		return true;
	} else if ( this.srf && !verb.eval.nurbs.is_rational_surface_domain_flat( this.srf, this.u0, this.u1, this.v0, this.v1, options ) ){
		return true;
	}

	return false;

}

verb.eval.nurbs.AdaptiveRefinementNode.prototype.divide = function( options, currentDepth ){

	// initialize currentDepth if it's not present
	if (currentDepth === undefined) currentDepth = 0;

	if ( !this.shouldDivide( options, currentDepth )  ) return;

	// increment the depth
	currentDepth++;

	// divide the domain
	this.u05 = (this.u0 + this.u1) / 2;
	this.v05 = (this.v0 + this.v1) / 2;

	// create the children
	this.children = [ 	new verb.eval.nurbs.AdaptiveRefinementNode( this.srf, this.u0, this.u05, 	this.v0, 	this.v05, this ),
											new verb.eval.nurbs.AdaptiveRefinementNode( this.srf, this.u05, this.u1, 	this.v0, 	this.v05, this ),
											new verb.eval.nurbs.AdaptiveRefinementNode( this.srf, this.u05, this.u1, 	this.v05, this.v1, 	this ),
											new verb.eval.nurbs.AdaptiveRefinementNode( this.srf, this.u0, 	this.u05, this.v05, this.v1, 	this ) ];

	// correctly assign neighbors
	this.children[0].neighbors = [ this.neighbors[0], this.children[1], this.children[3], this.neighbors[3] ];
	this.children[1].neighbors = [ this.neighbors[0], this.neighbors[1], this.children[2], this.children[0] ];
	this.children[2].neighbors = [ this.children[1], this.neighbors[1], this.neighbors[2], this.children[3] ];
	this.children[3].neighbors = [ this.children[0], this.children[2], this.neighbors[2], this.neighbors[3] ];

	// divide all children recursively
	this.children.forEach(function(x){ x.divide( options,currentDepth ); })

};




// ###verb.eval
// This defines verb's core geometry library which is called by the current Engine.

verb.eval.nurbs.rational_interp_curve = function( points, degree ) {

	// 0) build knot vector for curve by normalized chord length
	// 1) construct effective basis function in square matrix (W)
	// 2) construct set of coordinattes to interpolate vector (p)
	// 3) set of control points (c)

		// Wc = p

	// 4) solve for c in all 3 dimensions

	degree = degree || 3;
	
	var us = [ 0 ]; 
	for (var i = 1; i < points.length; i++){

		var chord = numeric.norm2( numeric.sub( points[i], points[i-1] ) );
		var last = us[us.length - 1];
		us.push( last + chord );

	}

	// normalize
	var max = us[us.length-1];
	for (var i = 0; i < us.length; i++){
		us[i] = us[i] / max;
	}

	var knotsStart = numeric.rep( [ degree + 1 ], 0 ); // [ 0, 0, 0, 0 ];

	var n = points.length - 1;
	var innerKnotNum = n - degree;


	for (var i = 1, l = us.length - degree; i < l; i++){

		var weightSums = 0;
		for (var j = 0; j < degree; j++){
			weightSums += us[i + j]
		}

		knotsStart.push( (1 / degree) * weightSums );
	}

	var knots = knotsStart.concat( numeric.rep( [ degree + 1 ], 1 ) );

	// build matrix of basis function coeffs (TODO: use sparse rep)
	var A = [];
	for ( var i = 0; i < us.length; i++ ){

		var u = us[i];

		var span = verb.eval.nurbs.knot_span_given_n( n, degree, u, knots )
		var basisFuncs = verb.eval.nurbs.basis_functions_given_knot_span_index( span, u, degree, knots );

		var ls = span - degree;
		var rowstart = verb.eval.nurbs.zeros_1d( ls );
		var rowend = verb.eval.nurbs.zeros_1d( points.length - (degree + 1) - ls );

		A.push( rowstart.concat(basisFuncs).concat(rowend) );

	}

	// for each dimension, solve
	var dim = points[0].length;
	var xs = [];

	for (var i = 0; i < dim; i++){
		var b = points.map(function(x){ return x[i]; });
		var x = numeric.solve( A, b );

		xs.push(x);
	}

	var controlPts = numeric.transpose(xs);
	var weights = numeric.rep([controlPts.length], 1);

	return { control_points: controlPts, knots: knots, degree: degree, weights: weights };

}

//
// ####get_sweep1_surface( profile_knots, profile_degree, profile_control_points, profile_weights, rail_knots, rail_degree, rail_control_points, rail_weights )
//
// Generate the control points, weights, and knots of an elliptical arc
//
// **params**
// + *Array*, the center
// + *Array*, the xaxis
// + *Array*, orthogonal yaxis
// + *Number*, xradius of the ellipse arc
// + *Number*, yradius of the ellipse arc
// + *Number*, start angle of the ellipse arc, between 0 and 2pi, where 0 points at the xaxis
// + *Number*, end angle of the arc, between 0 and 2pi, greater than the start angle
// 
// **returns** 
// + *Object*, an object with the following properties: control_points, weights, knots, degree
//
verb.eval.nurbs.get_sweep1_surface = function( profile_knots, profile_degree, profile_control_points, profile_weights, rail_knots, rail_degree, rail_control_points, rail_weights ) {

	// for each point on rail, move all of the points
	var homo_rail = verb.eval.nurbs.homogenize_1d( rail_control_points, rail_weights )
		, rail_start = verb.eval.nurbs.rational_curve_point( rail_degree, rail_knots, homo_rail, 0 )
		, span = 1.0 / rail_control_points.length
		, control_points = []
		, weights = [];

	for (var i = 0; i < rail_control_points.length; i++ ){

		// evaluate the point on the curve, subtracting it from the first point
		var rail_point = verb.eval.nurbs.rational_curve_point( rail_degree, rail_knots, homo_rail, i * span )
			, rail_offset = numeric.sub( rail_point, rail_start )
			, row_control_points = []
			, row_weights = [];

		for (var j = 0; j < profile_control_points.length; j++ ){

			row_control_points.push( numeric.add(rail_offset, profile_control_points[j] ) );
			row_weights.push( profile_weights[j] * rail_weights[i] );

		}

		control_points.push( row_control_points);
		weights.push( row_weights );
	}

	return {"knots_u": rail_knots, 
			"knots_v": profile_knots,
			"control_points": control_points, 
			"degree_u": rail_degree, 
			"degree_v": profile_degree, 
			"weights": weights };

}

//
// ####get_ellipse_arc( center, xaxis, yaxis, xradius, yradius, start_angle, end_angle )
//
// Generate the control points, weights, and knots of an elliptical arc
//
// **params**
// + *Array*, the center
// + *Array*, the xaxis
// + *Array*, orthogonal yaxis
// + *Number*, xradius of the ellipse arc
// + *Number*, yradius of the ellipse arc
// + *Number*, start angle of the ellipse arc, between 0 and 2pi, where 0 points at the xaxis
// + *Number*, end angle of the arc, between 0 and 2pi, greater than the start angle
// 
// **returns** 
// + *Object*, an object with the following properties: control_points, weights, knots, degree
//

verb.eval.nurbs.get_ellipse_arc = function( center, xaxis, yaxis, xradius, yradius, start_angle, end_angle ) {

	// if the end angle is less than the start angle, do a circle
	if (end_angle < start_angle) end_angle = 2 * Math.PI + start_angle;

	var theta = end_angle - start_angle
		, narcs = 0;

	// how many arcs?
	if (theta <= Math.PI / 2) {
		narcs = 1;
	} else {
		if (theta <= Math.PI){
			narcs = 2;
		} else if (theta <= 3 * Math.PI / 2){
			narcs = 3;
		} else {
			narcs = 4;
		}
	}

	var dtheta = theta / narcs
		, n = 2 * narcs
		, w1 = Math.cos( dtheta / 2) 
		, P0 = numeric.add( center, numeric.mul( xradius, Math.cos(start_angle), xaxis), numeric.mul( yradius, Math.sin(start_angle), yaxis ) )
		, T0 = numeric.sub( numeric.mul( Math.cos(start_angle), yaxis ), numeric.mul( Math.sin(start_angle), xaxis) )
		, Pw = verb.eval.nurbs.zeros_1d( narcs * 2 )
		, U = verb.eval.nurbs.zeros_1d( 2 *narcs + 3 )
		, index = 0
		, angle = start_angle
		, W = verb.eval.nurbs.zeros_1d( narcs * 2 );

	Pw[0] = P0;
	W[0] = 1;

	for (var i = 1; i <= narcs; i++){

		angle += dtheta;
		var P2 = numeric.add( center, numeric.mul( xradius, Math.cos(angle), xaxis), numeric.mul( yradius, Math.sin(angle), yaxis ) )

		W[index+2] = 1;
		Pw[index+2] = P2;

		var T2 = numeric.sub( numeric.mul( Math.cos(angle), yaxis ), numeric.mul( Math.sin(angle), xaxis) )

		var params = verb.eval.geom.intersect_rays(P0, numeric.mul( 1 / numeric.norm2(T0), T0), P2, numeric.mul( 1 / numeric.norm2(T2), T2));
		var P1 = numeric.add( P0, numeric.mul(T0, params[0]));

		W[index+1] = w1;
		Pw[index+1] = P1;

		index += 2;

		if (i < narcs){
			P0 = P2;
			T0 = T2;
		}
	}

	var j = 2 *  narcs + 1;

	for (var i = 0; i < 3; i++){
		U[i] = 0.0;
		U[i+j] = 1.0;
	}

	switch (narcs){
		case 1: break;
		case 2: U[3] = U[4] = 0.5; break;
		case 3: U[3] = U[4] = 1/3;
						U[5] = U[6] = 2/3; break;
		case 4: U[3] = U[4] = 0.25;
						U[5] = U[6] = 0.5;
						U[7] = U[8] = 0.75; break;
	}

	return {knots: U, control_points: Pw, degree: 2, weights: W };

}

//
// ####get_sphere_surface( center, axis, xaxis, radius )
//
// Generate the control points, weights, and knots of a sphere
//
// **params**
// + *Array*, the center of the sphere
// + *Array*, normalized axis of sphere
// + *Array*, vector perpendicular to axis of sphere, starting the rotation of the sphere
// + *Number*, radius of the sphere
// 
// **returns** 
// + *Object*, an object with the following properties: control_points, weights, knots_u, knots_v, degree_u, degree_v
//

verb.eval.nurbs.get_sphere_surface = function( center, axis, xaxis, radius ){

	var arc = verb.eval.nurbs.get_arc(center, numeric.mul(axis, -1), xaxis, radius, 0, Math.PI );

	return verb.eval.nurbs.get_revolved_surface( center, axis, 2 * Math.PI, arc.knots, arc.degree, arc.control_points, arc.weights );

}


//
// ####get_polyline_curve( pts )
//
// Generate the control points, weights, and knots of a polyline curve
//
// **params**
// + *Array*, array of points in curve
// 
// **returns** 
// + *Object*, an object with the following properties: control_points, weights, knots, degree
//

verb.eval.nurbs.get_polyline_curve = function( pts ){

	var num_spans = pts.length - 1
		, span = 1.0 / num_spans
		, knots = [0,0];

	for (var i = 1; i < num_spans; i++){
		knots.push(i * span);
	}

	knots.push(1);
	knots.push(1);

	var weights = [];

	for (var i = 0; i < pts.length; i++){
		weights.push(1);
	}

	return {
			"knots": knots, 
			"control_points": pts.slice(0), 
			"degree": 1,
			"weights": weights 
		};
			
}

//
// ####get_4pt_surface( p1, p2, p3, p4 )
//
// Generate the control points, weights, and knots of a surface define by 3 points
//
// **params**
// + *Array*, first point in counter-clockwise form
// + *Array*, second point in counter-clockwise form
// + *Array*, third point in counter-clockwise form
// + *Array*, forth point in counter-clockwise form
// 
// **returns** 
// + *Object*, an object with the following properties: control_points, weights, knots_u, knots_v, degree_u, degree_v
//

verb.eval.nurbs.get_4pt_surface = function( p1, p2, p3, p4 ){

	var p1p4 = numeric.mul( 0.5, numeric.add( p1, p4 ));
	var p2p3 = numeric.mul( 0.5, numeric.add( p2, p3 ));
	var p3p4 = numeric.mul( 0.5, numeric.add( p3, p4 ));
	var p1p2 = numeric.mul( 0.5, numeric.add( p1, p2 ));
	var p1p4p2p3 = numeric.mul( 0.5, numeric.add( p1p4, p2p3 ));

	return {"knots_u": [0,0,0,1,1,1], 
			"knots_v": [0,0,0,1,1,1], 
			"control_points": [ [p1, 		p1p4, 		p4], 
													[p1p2, 	p1p4p2p3, p3p4], 
													[p2, 		p2p3, 		p3] ], 
			"degree_u": 2, 
			"degree_v": 2,
			"weights": [ [ 1, 1, 1], 
									 [ 1, 1, 1], 
									 [ 1, 1, 1] ] };
			
}

//
// ####get_cylinder_surface( axis, xaxis, base, height, radius )
//
// Generate the control points, weights, and knots of a cylinder
//
// **params**
// + *Array*, normalized axis of cylinder
// + *Array*, xaxis in plane of cylinder
// + *Array*, position of base of cylinder
// + *Number*, height from base to top
// + *Number*, radius of the cylinder
// 
// **returns** 
// + *Object*, an object with the following properties: control_points, weights, knots_u, knots_v, degree_u, degree_v
//

verb.eval.nurbs.get_cylinder_surface = function( axis, xaxis, base, height, radius ){

	var yaxis = crossprod( axis, xaxis )
		, angle = 2 * Math.PI
		, circ = verb.eval.nurbs.get_arc( base, xaxis, yaxis, radius, 0, 2 * Math.PI );

	return verb.eval.nurbs.get_extruded_surface( axis, height, circ.knots, circ.degree, circ.control_points, circ.weights );

}

//
// ####get_cone_surface( axis, xaxis, base, height, radius )
//
// Generate the control points, weights, and knots of a cone
//
// **params**
// + *Array*, normalized axis of cone
// + *Array*, position of base of cone
// + *Number*, height from base to tip
// + *Number*, radius at the base of the cone
// 
// **returns** 
// + *Object*, an object with the following properties: control_points, weights, knots, degree
//

verb.eval.nurbs.get_cone_surface = function( axis, xaxis, base, height, radius ){

	var angle = 2 * Math.PI
		, prof_degree = 1
		, prof_ctrl_pts = [ numeric.add( base, numeric.mul( height, axis ) ), numeric.add( base, numeric.mul( radius, xaxis ) )]
		, prof_knots = [0,0,1,1]
		, prof_weights = [1,1];

	return verb.eval.nurbs.get_revolved_surface(base, axis, angle, prof_knots, prof_degree, prof_ctrl_pts, prof_weights);

}

//
// ####get_extruded_surface( axis, length, prof_knots, prof_degree, prof_control_points, prof_weights)
//
// Generate the control points, weights, and knots of an extruded surface
//
// **params**
// + *Array*, axis of the extrusion
// + *Array*, length of the extrusion
// + *Number*, degree of the profile
// + *Number*, control points of the profile
// + *Number*, weights of the profile
// 
// **returns** 
// + *Object*, an object with the following properties: control_points, weights, knots, degree
//

verb.eval.nurbs.get_extruded_surface = function( axis, length, prof_knots, prof_degree, prof_control_points, prof_weights){

	var control_points = verb.eval.nurbs.zeros_2d( 3, prof_control_points.length )
		, weights = verb.eval.nurbs.zeros_2d( 3, prof_control_points.length );

	var translation = numeric.mul(axis, length);
	var halfTranslation = numeric.mul(axis, 0.5 * length);

	// original control points
	for (var j = 0; j < prof_control_points.length; j++){
		control_points[0][j] = prof_control_points[j];
		control_points[1][j] = numeric.add( halfTranslation, prof_control_points[j] );
		control_points[2][j] = numeric.add( translation, prof_control_points[j] );

		weights[0][j] = prof_weights[j];
		weights[1][j] = prof_weights[j];
		weights[2][j] = prof_weights[j];
	}

	// return all parameters
	return {"knots_u": [0,0,0,1,1,1], 
			"knots_v": prof_knots, 
			"control_points": control_points, 
			"degree_u": 2, 
			"degree_v": prof_degree, 
			"weights": weights };
}

//
// ####get_revolved_surface( center, axis, theta, prof_knots, prof_degree, prof_control_points, prof_weights)
//
// Generate the control points, weights, and knots of a revolved surface
// (Corresponds to Algorithm A7.1 from Piegl & Tiller)
//
// **params**
// + *Array*, center of the rotation axis
// + *Array*, axis of the rotation axis
// + *Number*, angle to revolve around axis
// + *Number*, degree of the generatrix
// + *Number*, control points of the generatrix
// + *Number*, weights of the generatrix
// 
// **returns** 
// + *Object*, an object with the following properties: control_points, weights, knots, degree
//

// helper method

function crossprod(u,v) {
  return [u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]];
}

verb.eval.nurbs.get_revolved_surface = function( center, axis, theta, prof_knots, prof_degree, prof_control_points, prof_weights){

	var narcs, knots_u, control_points, weights;

	if (theta <= Math.PI / 2) { // less than 90
		narcs = 1;
		knots_u = verb.eval.nurbs.zeros_1d( 6 + 2  * (narcs-1) );
	} else {
		if (theta <= Math.PI){  // between 90 and 180
			narcs = 2;
			knots_u = verb.eval.nurbs.zeros_1d( 6 + 2 * (narcs-1) );
			knots_u[3]= knots_u[4] = 0.5;
		} else if (theta <= 3 * Math.PI / 2){ // between 180 and 270
			narcs = 3;
			knots_u = verb.eval.nurbs.zeros_1d( 6 + 2 * (narcs-1) );
			knots_u[3]= knots_u[4] = 1/3;
			knots_u[5]= knots_u[6] = 2/3;
		} else { // between 270 and 360
			narcs = 4;
			knots_u = verb.eval.nurbs.zeros_1d( 6 + 2 * (narcs-1) );
			knots_u[3]= knots_u[4] = 1/4;
			knots_u[5]= knots_u[6] = 1/2;
			knots_u[7]= knots_u[8] = 3/4;
		}
	}

	var dtheta = theta / narcs // divide the interval into several points
		, j = 3 + 2 * (narcs-1);

	// initialize the start and end knots
	// keep in mind that we only return the knot vector for the 

	for (var i = 0; i < 3; j++, i++){
		knots_u[i] = 0.0;
		knots_u[j] = 1.0;
	}

	// do some initialization
	var n = 2 * narcs 
		, wm = Math.cos( dtheta/2.0 )
		, angle = 0.0
		, sines = verb.eval.nurbs.zeros_1d( narcs + 1)
		, cosines = verb.eval.nurbs.zeros_1d( narcs + 1)
		, control_points = verb.eval.nurbs.zeros_2d( 2*narcs + 1, prof_control_points.length )
		, weights = verb.eval.nurbs.zeros_2d( 2*narcs + 1, prof_control_points.length );

	// initialize the sines and cosines
	for (var i = 1; i <= narcs; i++){
		angle += dtheta;
		cosines[i] = Math.cos(angle);
		sines[i] = Math.sin(angle);
	}

	// for each pt in the generatrix
	// i.e. for each row of the 2d knot vectors
	for (j = 0; j < prof_control_points.length; j++){

		// get the closest point of the generatrix point on the axis
		var O = verb.eval.geom.closest_point_on_ray(prof_control_points[j], center, axis)
			// X is the vector from the axis to generatrix control pt
			, X = numeric.sub( prof_control_points[j], O )
			// radius at that height
			, r = numeric.norm2(X)
			// Y is perpendicular to X and axis, and complete the coordinate system
			, Y = crossprod(axis,X); 

		if ( r > verb.EPSILON ){
			X = numeric.mul( 1 / r, X);
			Y = numeric.mul( 1 / r, Y);
		}

		// the first row of control_points and weights is just the generatrix
		control_points[0][j] = prof_control_points[j];
		var P0 = prof_control_points[j];
		weights[0][j] = prof_weights[j];

		// store T0 as the Y vector
		var T0 = Y
			, index = 0
			, angle = 0.0;

		// proceed around the circle
		for (var i = 1; i <= narcs; i++){	

			// O + r * cos(theta) * X + r * sin(theta) * Y
			// rotated generatrix pt
			var P2 = r == 0 ? O : numeric.add( O, numeric.mul( r, cosines[i], X), numeric.mul( r, sines[i], Y) );

			control_points[index+2][j] = P2;
			weights[index+2][j] = prof_weights[j];

			// construct the vector tangent to the rotation
			var T2 = numeric.sub( numeric.mul( cosines[i], Y), numeric.mul(sines[i], X));

			// construct the next control pt
			if (r == 0){
				control_points[index+1][j] = O;
			} else {
				var params = verb.eval.geom.intersect_rays(P0, numeric.mul( 1 / numeric.norm2(T0), T0), P2, numeric.mul( 1 / numeric.norm2(T2), T2));
				var P1 = numeric.add( P0, numeric.mul(T0, params[0]));

				control_points[index+1][j] = P1;
			}

			weights[index+1][j] = wm * prof_weights[j];

			index += 2;

			if (i < narcs)
			{
				P0 = P2;
				T0 = T2;
			}

		}
	}

	// store all of the parameters
	return {"knots_u": knots_u, 
			"knots_v": prof_knots, 
			"control_points": control_points, 
			"degree_u": 2, 
			"degree_v": prof_degree, 
			"weights": weights };

}



//
// ####get_arc( center, xaxis, yaxis, radius, start_angle, end_angle )
//
// Generate the control points, weights, and knots of an arbitrary arc
// (Corresponds to Algorithm A7.1 from Piegl & Tiller)
//
// **params**
// + *Array*, the center of the arc
// + *Array*, the xaxis of the arc
// + *Array*, orthogonal yaxis of the arc
// + *Number*, radius of the arc
// + *Number*, start angle of the arc, between 0 and 2pi
// + *Number*, end angle of the arc, between 0 and 2pi, greater than the start angle
// 
// **returns** 
// + *Object*, an object with the following properties: control_points, weights, knots, degree
//

verb.eval.nurbs.get_arc = function( center, xaxis, yaxis, radius, start_angle, end_angle ) {

	return verb.eval.nurbs.get_ellipse_arc( center, xaxis, yaxis, radius, radius, start_angle, end_angle );

}


//
// ####curve_bezier_decompose( degree, knots, control_points )
//
// Decompose a NURBS curve into a collection of bezier's.  Useful
// as each bezier fits into it's convex hull.  This is a useful starting
// point for intersection, closest point, algorithms
//
// **params**
// + *Number*, integer degree
// + *Array*, array of nondecreasing knot values
// + *Array*, array of control points
// 
// **returns** 
// + *Array* of curves, defined by degree, knots, and control points
//
verb.eval.nurbs.curve_bezier_decompose = function( degree, knots, control_points ) {

	// find all of the unique knot values and their multiplicity
	// for each, increase their multiplicity to degree + 1

	var mults = verb.eval.nurbs.knot_multiplicities( knots );
	var reqMult = degree + 1;
	var refine = verb.eval.nurbs.curve_knot_refine;

	// insert the knots
	for (var i = 0; i < mults.length; i++){
		if ( mults[i][1] < reqMult ){

			var knotsInsert = numeric.rep( [ reqMult - mults[i][1] ], mults[i][0] );
			var res = refine( degree, knots, control_points, knotsInsert );

			knots = res.knots;
			control_points = res.control_points;

		}
	}

	var numCrvs = knots.length / reqMult - 1;
	var crvKnotLength = reqMult * 2;

	var crvs = [];

	for (var i = 0; i < control_points.length; i += reqMult ){

		var kts = knots.slice( i, i + crvKnotLength );
		var pts = control_points.slice( i, i + reqMult );

		crvs.push( { degree : degree, knots: kts, control_points: pts } );

	}

	return crvs;

}

//
// ####knot_multiplicities( knots )
//
// Determine the multiplicities of the values in a knot vector
//
// **params**
// + *Array*, array of nondecreasing knot values
// 
// **returns** 
// + *Array* of length 2 arrays, [knotValue, knotMultiplicity]
//
verb.eval.nurbs.knot_multiplicities = function(knots){

	// initialize
	var mults = [ [ knots[0], 0 ] ];
	var curr = mults[0];

	for (var i = 0; i < knots.length; i++){

		if ( (Math.abs(knots[i] - curr[0])) > verb.EPSILON ){

			curr = [knots[i], 0];
			mults.push(curr);

		} 

		curr[1]++;

	}

	return mults;

}

//
// ####curve_split( degree, knots, control_points, u )
//
// Split a curve into two parts
//
// **params**
// + *Number*, integer degree
// + *Array*, array of nondecreasing knot values
// + *Array*, array of control points
// + *Number*, location to split the curve
// 
// **returns** 
// + *Array* two new curves, defined by degree, knots, and control points
//
verb.eval.nurbs.curve_split = function( degree, knots, control_points, u ) {

	var knots_to_insert = [];
	for (var i = 0; i < degree+1; i++) knots_to_insert.push(u);
	var res = verb.eval.nurbs.curve_knot_refine( degree, knots, control_points, knots_to_insert );

	var s = verb.eval.nurbs.knot_span( degree, u, knots );

	var knots0 = res.knots.slice(0, s + degree + 2);
	var knots1 = res.knots.slice( s + 1 );

	var cpts0 = res.control_points.slice( 0, s + 1 );
	var cpts1 = res.control_points.slice( s + 1 );

	return [
		{ degree: degree, knots: knots0, control_points: cpts0 },
		{ degree: degree, knots: knots1, control_points: cpts1 }
	];

}

//
// ####curve_knot_refine( degree, knots, control_points, knots_to_insert )
//
// Insert a collection of knots on a curve
//
// Corresponds to Algorithm A5.4 (Piegl & Tiller)
//
// **params**
// + *Number*, integer degree
// + *Array*, array of nondecreasing knot values
// + *Array*, array of control points
// + *Array*, knots to insert
// 
// **returns** 
// + *Object* the new curve, defined by knots and control_points
//

verb.eval.nurbs.curve_knot_refine = function( degree, knots, control_points, knots_to_insert ) {

	var n = control_points.length - 1
		, m = n + degree + 1
		, r = knots_to_insert.length - 1
		, a = verb.eval.nurbs.knot_span( degree, knots_to_insert[0], knots ) 
		, b = verb.eval.nurbs.knot_span( degree, knots_to_insert[r], knots )
		, control_points_post = new Array( control_points.length + r + 1 )
		, knots_post = new Array( knots.length + r + 1 )
		, i = 0
		, j = 0;

	// new control pts
	for (i = 0; i <= a - degree; i++) {
		control_points_post[i] = control_points[i];
	}

	for (i = b-1; i <= n; i++) {
		control_points_post[i+r+1] = control_points[i];
	}

	// new knot vector
	for (i = 0; i <= a; i++) {
		knots_post[i] = knots[i];
	}

	for (i = b+degree; i <= m; i++){
		knots_post[i+r+1] = knots[i];
	}

	i = b + degree - 1;
	var k = b + degree + r;

	for (j=r; j>=0; j--) {

		while (knots_to_insert[j] <= knots[i] && i > a){

			control_points_post[k-degree-1] = control_points[i-degree-1];
			knots_post[k] = knots[i];
			k = k-1;
			i = i-1;

		}

		control_points_post[k-degree-1] = control_points_post[k-degree];

		for (var l = 1; l <= degree; l++){

			var ind = k-degree+l;
			var alfa = knots_post[k+l] - knots_to_insert[j];

			if (Math.abs(alfa) < verb.EPSILON){
				control_points_post[ind-1] = control_points_post[ind];
			} else {
				alfa = alfa / (knots_post[k+l] - knots[i-degree+l]);
				control_points_post[ind-1] =
									numeric.add( 
										numeric.mul( alfa, control_points_post[ind-1] ), 
										numeric.mul( (1.0 - alfa), control_points_post[ind]) 
									);
			}

		}

		knots_post[k] = knots_to_insert[j];
		k = k - 1;

	}

	return { knots: knots_post, control_points: control_points_post };

}

//
// ####curve_knot_insert( degree, knots, control_points, u, r )
//
// Insert a knot along a rational curve.  Note that this algorithm only works
// for r + s <= degree, where s is the initial multiplicity (number of duplicates) of the knot.
//
// Corresponds to algorithm A5.1 (Piegl & Tiller)
//
// Use the curve_knot_refine for applications like curve splitting.
//
// **params**
// + *Number*, integer degree
// + *Array*, array of nondecreasing knot values
// + *Array*, array of control points
// + *Number*, parameter at which to insert the knot
// + *Number*, number of times to insert the knot
// 
// **returns** 
// + *Object* the new curve, defined by knots and control_points
//

verb.eval.nurbs.curve_knot_insert = function( degree, knots, control_points, u, r ) {

	// num_pts is num control points for the initial curve
	// k is the span on which the knots are inserted
	// s is the initial multiplicity of the knot
	// r is the number of times to insert the knot
	// control_points is initial set of control points

	var s = 0; // assume original multiplicity is 0 - TODO add check for multiplicity in knots

	var num_pts = control_points.length
		, k = verb.eval.nurbs.knot_span( degree, u, knots ) // the span in which the knot will be inserted
		, num_pts_post = num_pts + r // a new control pt for every new knot    
		, control_points_temp = new Array( degree - s )  
		, knots_post = new Array( knots.length + r )  // r new knots
		, control_points_post = new Array( num_pts_post ) 
		, i = 0;

	// new knot vector

		// insert the k knots that will not be affected
		for (i = 0; i <= k; i++) {
			knots_post[i] = knots[i];
		}
		
		// insert the new repeat knots
		for (i = 1; i <= r; i++) {
			knots_post[k+i] = u; 
		}

		// insert the rest of the knots
		for (i = k+1; i < knots.length; i++) {
			knots_post[i+r] = knots[i];
		}

	// control point generation

		// copy the original control points before the insertion span
		for (i = 0; i <= k - degree; i++) {
			control_points_post[i] = control_points[i]; 
		}

		// copy the original controls after the insertion span
		for (i = k-s; i < num_pts; i++) {
			control_points_post[i+r] = control_points[i];
		}

		// collect the affected control points in this temporary array
		for (i = 0; i <= degree-s; i++) {
			control_points_temp[i] = control_points[k-degree+i];
		}

	var L = 0
		, alpha = 0;

	// insert knot r times
	for (var j = 1; j <= r; j++) {

		L = k-degree+j;

		for (i = 0; i <= degree-j-s; i++) {

			alpha = ( u - knots[L+i] ) / ( knots[i+k+1] - knots[L+i] );

			control_points_temp[i] = 
				numeric.add( 
					numeric.mul( alpha, control_points_temp[i+1] ), 
					numeric.mul( (1.0 - alpha), control_points_temp[i]) 
				);


		}

		control_points_post[ L ] = control_points_temp[0];
		control_points_post[k+r-j-s] = control_points_temp[degree-j-s];

	}

	// not so confident about this part
	for (i = L+1; i < k-s; i++) {
		control_points_post[i] = control_points_temp[ i - L ];
	}

	return { knots: knots_post, control_points: control_points_post };

}


//
// ####surface_curvature( degree_u, knots_u, degree_v, knots_v, control_points, u, v, options )
//
// Compute the gaussian curvature on a non-uniform, non-rational B spline surface
//
// **params**
// + *Number*, integer degree of surface in u direction
// + *Array*, array of nondecreasing knot values in u direction
// + *Number*, integer degree of surface in v direction
// + *Array*, array of nondecreasing knot values in v direction
// + *Array*, 3d array of control points, where rows are the u dir, and columns run alonsg the positive v direction, 
// and where each control point is an array of length (dim)  
// + *Number*, u parameter at which to evaluate the derivatives
// + *Number*, v parameter at which to evaluate the derivatives
// 
// **returns** 
// + *Array*, a point represented by an array of length (dim)
//

verb.eval.nurbs.rational_surface_curvature = function( degree_u, knots_u, degree_v, knots_v, homo_control_points, u, v ) {

	// compute the first fundamental form

		// symmetric matrix where
		//
		// I = [ E F; F G ]
		//
		// where:
		//
		// E = Xu * Xu
		// F = Xu * Xv
		// G = Xv * Xv

	// second fundamental form (shape operator)

		// symmetric matrix where
		//
		// II = [ L M; M N ]
		//
		// where:
		//
		// L = Xuu * n
		// M = Xuv * n
		// N = Xvv * n

	// principal curvatures are the eigenvalues of the second fundamental form

	var derivs = verb.eval.nurbs.rational_surface_derivs( 	degree_u, 
															knots_u, 
															degree_v, 
															knots_v, 
															homo_control_points, 
															2, u, v );


	// structure of the derivatives

	// pos  du  vuu
	// dv   duv
  // dvv 

 
  var du = derivs[0][1];
  var dv = derivs[1][0];
  var duu = derivs[0][2];
  var dvv = derivs[2][0];
  var duv = derivs[1][1];

  var n = numeric.cross( du, dv );
  var L = numeric.dot( duu, n );
  var M = numeric.dot( duv, n );
  var N = numeric.dot( dvv, n );

  var shapeOperator = [ [ L, M ], [ M, N ] ];

	var eigs = numeric.eig( shapeOperator );

	// contains: lambda - x
	// 			     E - x
	
	var k1 = eigs.lambda.x[0];
	var k2 = eigs.lambda.x[1];
	var mean = 0.5 * ( k1 + k2 );
	var gaussian = k1 * k2;
	var p1 = numeric.add( numeric.mul( eigs.E.x[0][0], du ), numeric.mul( eigs.E.x[0][1], dv ) );
	var p2 = numeric.add( numeric.mul( eigs.E.x[1][0], du ), numeric.mul( eigs.E.x[1][1], dv ) );

	return { point: derivs[0][0], normal: n, mean: mean, gaussian: gaussian, shapeOperator: shapeOperator, k1: k1, k2: k2, p1: p1, p2: p2, p1p : eigs.E.x[0], p2p: eigs.E.x[1]  };

};


//
// ####rational_surface_derivs( degree_u, knots_u, degree_v, knots_v, homo_control_points, num_derivs, u, v)
//
// Compute the derivatives at a point on a NURBS surface
//
// **params**
// + *Number*, integer degree of surface in u direction
// + *Array*, array of nondecreasing knot values in u direction
// + *Number*, integer degree of surface in v direction
// + *Array*, array of nondecreasing knot values in v direction
// + *Array*, 3d array of control points, where rows are the u dir, and columns run along the positive v direction, 
// and where each control point is an array of length (dim)  
// + *Number*, u parameter at which to evaluate the derivatives
// + *Number*, v parameter at which to evaluate the derivatives
// + *Array*, 1d array of control point weights 
// 
// **returns** 
// + *Array*, a point represented by an array of length (dim)
//

verb.eval.nurbs.rational_surface_derivs = function( degree_u, knots_u, degree_v, knots_v, homo_control_points, num_derivs, u, v) {

	var SKL_homo = verb.eval.nurbs.surface_derivs( degree_u, knots_u, degree_v, knots_v, homo_control_points, num_derivs, u, v )
		, ders = verb.eval.nurbs.separate_homo_derivs_2d( SKL_homo )
		, Aders = ders[0]
		, wders = ders[1]
		, k = 0
		, i  = 0
		, j = 0
		, l = 0
		, SKL = []
		, dim = Aders[0][0].length;

	for (k = 0; k <= num_derivs; k++) {
		SKL.push([]);

		for (l = 0; l <= num_derivs-k; l++) {

			var v = Aders[k][l];
			for (j=1; j <= l; j++) {
				v = numeric.sub( v, numeric.mul( numeric.mul( binomial.get(l, j), wders[0][j] ), SKL[k][l-j] ) );
			}

			for (i = 1; i <= k; i++) {
				v = numeric.sub( v, numeric.mul( numeric.mul( binomial.get(k, i), wders[i][0] ), SKL[k-i][l] ) );
				
				var v2 = verb.eval.nurbs.zeros_1d(dim);

				for (j = 1; j <= l; j++) {
					v2 = numeric.add( v2, numeric.mul( numeric.mul( binomial.get(l, j), wders[i][j] ), SKL[k-i][l-j] ) );
				}

				v = numeric.sub( v, numeric.mul( binomial.get(k, i), v2) );

			}
			SKL[k].push( numeric.mul(1/wders[0][0], v )); // demogenize

		}
	}

	return SKL;

}

//
// ####rational_surface_point( degree_u, knots_u,  degree_v, knots_v, homo_control_points, u, v )
//
// Compute a point on a NURBS surface
//
// **params**
// + *Number*, integer degree of surface in u direction
// + *Array*, array of nondecreasing knot values in u direction
// + *Number*, integer degree of surface in v direction
// + *Array*, array of nondecreasing knot values in v direction
// + *Array*, 3d array of control points (tensor), top to bottom is increasing u direction, left to right is increasing v direction,
// and where each control point is an array of length (dim+1)
// + *Number*, u parameter at which to evaluate the surface point
// + *Number*, v parameter at which to evaluate the surface point
// 
// **returns** 
// + *Array*, a point represented by an array of length (dim)
//

verb.eval.nurbs.rational_surface_point = function( degree_u, knots_u,  degree_v, knots_v, homo_control_points, u, v ) {

	return verb.eval.nurbs.dehomogenize( verb.eval.nurbs.surface_point( degree_u, knots_u,  degree_v, knots_v, homo_control_points, u, v ) );

};

//`
// ####rational_curve_derivs( degree, knots, homo_control_points, u, num_derivs )
//
// Determine the derivatives of a NURBS curve at a given parameter
//
// **params**
// + *Number*, integer degree of curve
// + *Array*, array of nondecreasing knot values
// + *Array*, 2d array of homogeneous control points, where each control point is an array of length (dim+1) and form (wi*pi, wi)
// + *Number*, parameter on the curve at which the point is to be evaluated
// 
// **returns** 
// + *Array*, a point represented by an array of length (dim)
//

verb.eval.nurbs.rational_curve_derivs = function( degree, knots, homo_control_points, u, num_derivs ) {

	// compute the derivatives of the control points
	// separate derivative array into two
	var ders = verb.eval.nurbs.separate_homo_derivs_1d( verb.eval.nurbs.curve_derivs( degree, knots, homo_control_points, u, num_derivs ) )
		, Aders = ders[0]
		, wders = ders[1]
		, k = 0
		, i  = 0
		, CK = [];

	for (k = 0; k <= num_derivs; k++) {
		var v = Aders[k];

		for (i = 1; i <= k; i++) {
			v = numeric.sub( v, numeric.mul( numeric.mul( binomial.get(k, i), wders[i] ), CK[k-i] ) );
		}
		CK.push( numeric.mul(1/wders[0], v )); // demogenize
	}

	return CK;

};	


//
// ####separate_homo_derivs_1d( ck )
//
// Separate the array of derivatives into the A(u) component and w(u), i.e. the weight and everything else without dehomogenization
//
// **params**
// + *Array*, 1d array of homogeneous derivatives
// 
// **returns** 
// + *Array*, an array with Aders and wders as element 0 and 1, respectively
//

verb.eval.nurbs.separate_homo_derivs_1d = function( CK ) {

	var dim = CK[0].length
		, last = dim-1
		, Aders = []
		, wders = [];

	for ( var i = 0, l = CK.length; i < l; i++ ) {
		Aders.push( CK[i].slice(0, last) );
		wders.push( CK[i][last] );
	}

	return [Aders, wders];

};

//
// ####separate_homo_derivs_2d( skl )
//
// Separate the array of derivatives into the A(u) component and w(u), i.e. the weight and everything else without dehomogenization
//
// **params**
// + *Array*, 2d array of homogeneous derivatives
// 
// **returns** 
// + *Array*, an array with Aders and wders as element 0 and 1, respectively
//

verb.eval.nurbs.separate_homo_derivs_2d = function( SKL ) {

	var Aders = []
		, wders = [];

	for ( var i = 0, l = SKL.length; i < l; i++ ) {
		var CK = verb.eval.nurbs.separate_homo_derivs_1d( SKL[i] );
		Aders.push( CK[0] );
		wders.push( CK[1] );
	}

	return [Aders, wders];

};


//
// ####rational_curve_point( degree, knots, homo_control_points, u)
//
// Compute a point on a NURBS curve
//
// **params**
// + *Number*, integer degree of curve
// + *Array*, array of nondecreasing knot values
// + *Array*, 2d array of homogeneous control points, where each control point is an array of length (dim+1) 
// and form (wi*pi, wi)
// + *Number*, parameter on the curve at which the point is to be evaluated
// 
// **returns** 
// + *Array*, a point represented by an array of length (dim)
//

verb.eval.nurbs.rational_curve_point = function( degree, knots, homo_control_points, u) {

	return verb.eval.nurbs.dehomogenize( verb.eval.nurbs.curve_point( degree, knots, homo_control_points, u) );

};

//
// ####dehomogenize( homo_point )
//
// Dehomogenize a point 
//
// **params**
// + *Array*, a point represented by an array (wi*pi, wi) with length (dim+1)
// 
// **returns** 
// + *Array*, a point represented by an array pi with length (dim)
//

verb.eval.nurbs.dehomogenize = function( homo_point ) {

	var dim = homo_point.length
		, point = []
		, wt = homo_point[dim-1];

	for (var i = 0; i < homo_point.length-1;i++)
		point.push( homo_point[i] / wt );

	return point;

};

//
// ####weights_1d( homo_points )
//
// Obtain the weight from a collection of points in homogeneous space, assuming all
// are the same dimension
//
// **params**
// + *Array*, array of points represented by an array (wi*pi, wi) with length (dim+1)
// 
// **returns** 
// + *Array*, a point represented by an array pi with length (dim)
//

verb.eval.nurbs.weight_1d = function( homo_points ) {

	var dim = homo_points[0].length - 1;

	return homo_points.map(function(x){ return x[dim]; });

};

//
// ####dehomogenize_1d( homo_points )
//
// Dehomogenize a point 
//
// **params**
// + *Array*, array of points represented by an array (wi*pi, wi) with length (dim+1)
// 
// **returns** 
// + *Array*, an array of points, each of length dim
//

verb.eval.nurbs.dehomogenize_1d = function( homo_points ) {

	return homo_points.map(function(x){ return verb.eval.nurbs.dehomogenize( x ); });

};

//
// ####homogenize_1d( control_points, weights) 
//
// Transform a 1d array of points into their homogeneous equivalents
//
// **params**
// + *Array*, 1d array of control points, (actually a 2d array of size (m x dim) )
// + *Array*, array of control point weights, the same size as the array of control points (m x 1)
// 
// **returns** 
// + *Array*, 1d array of control points where each point is (wi*pi, wi) where wi 
// i the ith control point weight and pi is the ith control point, 
// hence the dimension of the point is dim + 1

//

verb.eval.nurbs.homogenize_1d = function( control_points, weights) {

	var rows = control_points.length
		, dim = control_points[0].length
		, k = 0
		, homo_control_points = []
		, wt = 0
		, ref_pt = [];

	for (var i = 0; i < rows; i++) {

		var pt = [];
		ref_pt = control_points[i];
		wt = weights[i];

		for (k = 0; k < dim; k++) {
			pt.push( ref_pt[k] * wt );
		}

		// append the weight
		pt.push(wt);

		homo_control_points.push(pt);
	}

	return homo_control_points;

};

//
// ####homogenize_2d( control_points, weights) 
//
// **params**
// + *Array*, 2d array of control points, (actually a 3d array of size m x n x dim)
// + *Array*, array of control point weights, the same size as the control points array (m x n x 1)
// 
// **returns** 
// + *Array*, 1d array of control points where each point is (wi*pi, wi) where wi 
// i the ith control point weight and pi is the ith control point, the size is 
// (m x n x dim+1)

//

verb.eval.nurbs.homogenize_2d = function( control_points, weights) {

	var rows = control_points.length
		, cols = control_points[0].length
		, dim = control_points[0][0].length
		, j = 0
		, k = 0
		, homo_control_points = []
		, wt = 0
		, ref_pt = [];

	for (var i = 0; i < rows; i++) {
		homo_control_points.push( verb.eval.nurbs.homogenize_1d(control_points[i], weights[i]) );
	}

	return homo_control_points;

};

//
// ####surface_derivs( degree_u, knots_u, degree_v, knots_v, control_points, num_derivatives, u, v )
//
// Compute the derivatives on a non-uniform, non-rational B spline surface
//
// **params**
// + *Number*, integer degree of surface in u direction
// + *Array*, array of nondecreasing knot values in u direction
// + *Number*, integer degree of surface in v direction
// + *Array*, array of nondecreasing knot values in v direction
// + *Array*, 3d array of control points, where rows are the u dir, and columns run along the positive v direction, 
// and where each control point is an array of length (dim)  
// + *Number*, u parameter at which to evaluate the derivatives
// + *Number*, v parameter at which to evaluate the derivatives
// 
// **returns** 
// + *Array*, a point represented by an array of length (dim)
//

verb.eval.nurbs.surface_derivs = function( degree_u, knots_u, degree_v, knots_v, control_points, num_derivatives, u, v ) {

	var n = knots_u.length - degree_u - 2
		, m = knots_v.length - degree_v - 2;

	return verb.eval.nurbs.surface_derivs_given_n_m( n, degree_u, knots_u, m, degree_v, knots_v, control_points, num_derivatives, u, v );

};

//
// ####surface_derivs_given_n_m( n, degree_u, knots_u, m, degree_v, knots_v, control_points, num_derivatives, u, v )
//
// Compute the derivatives on a non-uniform, non-rational B spline surface 
// (corresponds to algorithm 3.6 from The NURBS book, Piegl & Tiller 2nd edition)
//
// **params**
// + *Number*, integer number of basis functions in u dir - 1 = knots_u.length - degree_u - 2
// + *Number*, integer degree of surface in u direction
// + *Array*, array of nondecreasing knot values in u direction
// + *Number*, integer number of basis functions in v dir - 1 = knots_u.length - degree_u - 2
// + *Number*, integer degree of surface in v direction
// + *Array*, array of nondecreasing knot values in v direction
// + *Array*, 3d array of control points, where rows are the u dir, and columns run along the positive v direction, 
// and where each control point is an array of length (dim)  
// + *Number*, u parameter at which to evaluate the derivatives
// + *Number*, v parameter at which to evaluate the derivatives
// 
// **returns** 
// + *Array*, a point represented by an array of length (dim)
//

verb.eval.nurbs.surface_derivs_given_n_m = function( n, degree_u, knots_u, m, degree_v, knots_v, control_points, num_derivatives, u, v ) {

	if ( verb.eval.nurbs.are_valid_relations(degree_u, control_points.length, knots_u.length ) === false ||
		verb.eval.nurbs.are_valid_relations(degree_v, control_points[0].length, knots_v.length ) === false ) {
		console.error('Invalid relations between control points, knot vector, and n');
		return null;
	}

	var dim = control_points[0][0].length
		, du = Math.min(num_derivatives, degree_u)
		, dv = Math.min(num_derivatives, degree_v)
		, SKL = verb.eval.nurbs.zeros_3d( du+1, dv+1, dim )
		, knot_span_index_u = verb.eval.nurbs.knot_span_given_n( n, degree_u, u, knots_u )
		, knot_span_index_v = verb.eval.nurbs.knot_span_given_n( m, degree_v, v, knots_v )
		, uders = verb.eval.nurbs.deriv_basis_functions_given_n_i( knot_span_index_u, u, degree_u, n, knots_u )  
		, vders = verb.eval.nurbs.deriv_basis_functions_given_n_i( knot_span_index_v, v, degree_v, m, knots_v )
		, temp = verb.eval.nurbs.zeros_2d( degree_v+1, dim )
		, k = 0
		, s = 0
		, r = 0
		, l = 0
		, dd = 0;

	for (k = 0; k <= du; k++) {	
		for (s = 0; s <= degree_v; s++) {		
			temp[s] = verb.eval.nurbs.zeros_1d( dim );

			for (r = 0; r <= degree_u; r++) {	
				temp[s] = numeric.add( temp[s], numeric.mul( uders[k][r], control_points[knot_span_index_u-degree_u+r][knot_span_index_v-degree_v+s]) );
			}
		}

		dd = Math.min(num_derivatives-k, dv);

		for (l = 0; l <= dd; l++) {	
			SKL[k][l] = verb.eval.nurbs.zeros_1d( dim );

			for (s = 0; s <= degree_v; s++) {	
				SKL[k][l] = numeric.add( SKL[k][l], numeric.mul( vders[l][s], temp[s] ) );
			}
		}
	}

	return SKL;
}

//
// ####surface_point( degree_u, knots_u, degree_v, knots_v, control_points, u, v)
//
// Compute a point on a non-uniform, non-rational B-spline surface
//
// **params**
// + *Number*, integer degree of surface in u direction
// + *Array*, array of nondecreasing knot values in u direction
// + *Number*, integer degree of surface in v direction
// + *Array*, array of nondecreasing knot values in v direction
// + *Array*, 3d array of control points, where rows are the u dir, and columns run along the positive v direction, 
// and where each control point is an array of length (dim)  
// + *Number*, u parameter at which to evaluate the surface point
// + *Number*, v parameter at which to evaluate the surface point
// 
// **returns** 
// + *Array*, a point represented by an array of length (dim)
//

verb.eval.nurbs.surface_point = function( degree_u, knots_u, degree_v, knots_v, control_points, u, v) {

	var n = knots_u.length - degree_u - 2
		, m = knots_v.length - degree_v - 2;

	return 	verb.eval.nurbs.surface_point_given_n_m( n, degree_u, knots_u, m, degree_v, knots_v, control_points, u, v );

}

//
// ####volume_point( degree_u, knots_u, degree_v, knots_v, degree_w, knots_w, control_points, u, v, w  )
//
// Compute a point in a non-uniform, non-rational B spline volume
//
// **params**
// + *Number*, integer number of basis functions in u dir - 1 = knots_u.length - degree_u - 2
// + *Number*, integer degree of volume in u direction
// + *Array*, array of nondecreasing knot values in u direction
// + *Number*, integer number of basis functions in v dir - 1 = knots_v.length - degree_v - 2
// + *Number*, integer degree of volume in v direction
// + *Array*, array of nondecreasing knot values in v direction
// + *Number*, integer number of basis functions in w dir - 1 = knots_w.length - degree_w - 2
// + *Number*, integer degree of volume in w direction
// + *Array*, array of nondecreasing knot values in w direction
// + *Array*, 4d array of control points where each control point is an array of length (dim)  
// + *Number*, u parameter at which to evaluate the volume point
// + *Number*, v parameter at which to evaluate the volume point
// + *Number*, w parameter at which to evaluate the volume point
// 
// **returns** 
// + *Array*, a point represented by an array of length (dim)
//

verb.eval.nurbs.volume_point = function( degree_u, knots_u, degree_v, knots_v, degree_w, knots_w, control_points, u, v, w ) {

	var n = knots_u.length - degree_u - 2
		, m = knots_v.length - degree_v - 2
		, l = knots_w.length - degree_w - 2;

	return verb.eval.nurbs.volume_point_given_n_m_l( n, degree_u, knots_u, m, degree_v, knots_v, l, degree_w, knots_w, control_points, u, v, w );

}

//
// ####volume_point_given_n_m_l( n, degree_u, knots_u, m, degree_v, knots_v, l, degree_w, knots_w, control_points, u, v, w )
//
// Compute a point in a non-uniform, non-rational B spline volume
//
// **params**
// + *Number*, integer number of basis functions in u dir - 1 = knots_u.length - degree_u - 2
// + *Number*, integer degree of volume in u direction
// + *Array*, array of nondecreasing knot values in u direction
// + *Number*, integer number of basis functions in v dir - 1 = knots_v.length - degree_v - 2
// + *Number*, integer degree of volume in v direction
// + *Array*, array of nondecreasing knot values in v direction
// + *Number*, integer number of basis functions in w dir - 1 = knots_w.length - degree_w - 2
// + *Number*, integer degree of volume in w direction
// + *Array*, array of nondecreasing knot values in w direction
// + *Array*, 4d array of control points where each control point is an array of length (dim)  
// + *Number*, u parameter at which to evaluate the volume point
// + *Number*, v parameter at which to evaluate the volume point
// + *Number*, w parameter at which to evaluate the volume point
// 
// **returns** 
// + *Array*, a point represented by an array of length (dim)
//

verb.eval.nurbs.volume_point_given_n_m_l = function( n, degree_u, knots_u, m, degree_v, knots_v, l, degree_w, knots_w, control_points, u, v, w ) {

	if ( 	!verb.eval.nurbs.are_valid_relations(degree_u, control_points.length, knots_u.length ) ||
				!verb.eval.nurbs.are_valid_relations(degree_v, control_points[0].length, knots_v.length ) || 
				!verb.eval.nurbs.are_valid_relations(degree_w, control_points[0][0].length, knots_w.length ) ) {
		console.error('Invalid relations between control points and knot vector');
		return null;
	}

	var dim = control_points[0][0][0].length
		, knot_span_index_u = verb.eval.nurbs.knot_span_given_n( n, degree_u, u, knots_u )
		, knot_span_index_v = verb.eval.nurbs.knot_span_given_n( m, degree_v, v, knots_v )
		, knot_span_index_w = verb.eval.nurbs.knot_span_given_n( l, degree_w, w, knots_w )
		, u_basis_vals = verb.eval.nurbs.basis_functions_given_knot_span_index( knot_span_index_u, u, degree_u, knots_u )
		, v_basis_vals = verb.eval.nurbs.basis_functions_given_knot_span_index( knot_span_index_v, v, degree_v, knots_v )
		, w_basis_vals = verb.eval.nurbs.basis_functions_given_knot_span_index( knot_span_index_w, w, degree_w, knots_w )
		, uind = knot_span_index_u - degree_u
		, vind = knot_span_index_v
		, wind = knot_span_index_w
		, position = verb.eval.nurbs.zeros_1d( dim )
		, temp = verb.eval.nurbs.zeros_1d( dim )
		, temp2 = verb.eval.nurbs.zeros_1d( dim )
		, j = 0
		, k = 0;

	for (var i = 0; i <= degree_w; i++){

		temp2 = verb.eval.nurbs.zeros_1d( dim );
		wind = knot_span_index_w - degree_w + i;

		for (j = 0; j <= degree_v; j++) {	

			temp = verb.eval.nurbs.zeros_1d( dim );
			vind = knot_span_index_v  - degree_v + j;

			for (k = 0; k <= degree_u; k++) {	

				// sample u isoline
				temp = numeric.add( temp, 
														numeric.mul( u_basis_vals[k], control_points[uind+k][vind][wind] ));
			}

			// add weighted contribution of u isoline
			temp2 = numeric.add( temp2, 
													numeric.mul( v_basis_vals[j], temp ) );
		}

		// add weighted contribution from uv isosurfaces
		position = numeric.add( position, 
														numeric.mul( w_basis_vals[i], temp2 ) );

	}

	return position;
}

//
// ####surface_point_given_n_m( n, degree_u, knots_u, m, degree_v, knots_v, control_points, u, v )
//
// Compute a point on a non-uniform, non-rational B spline surface
// (corresponds to algorithm 3.5 from The NURBS book, Piegl & Tiller 2nd edition)
//
// **params**
// + *Number*, integer number of basis functions in u dir - 1 = knots_u.length - degree_u - 2
// + *Number*, integer degree of surface in u direction
// + *Array*, array of nondecreasing knot values in u direction
// + *Number*, integer degree of surface in v direction
// + *Array*, array of nondecreasing knot values in v direction
// + *Array*, 3d array of control points, where rows are the u dir, and columns run along the positive v direction, 
// and where each control point is an array of length (dim)  
// + *Number*, u parameter at which to evaluate the surface point
// + *Number*, v parameter at which to evaluate the surface point
// 
// **returns** 
// + *Array*, a point represented by an array of length (dim)
//

verb.eval.nurbs.surface_point_given_n_m = function( n, degree_u, knots_u, m, degree_v, knots_v, control_points, u, v ) {

	if ( verb.eval.nurbs.are_valid_relations(degree_u, control_points.length, knots_u.length ) === false ||
		verb.eval.nurbs.are_valid_relations(degree_v, control_points[0].length, knots_v.length ) === false ) {
		console.error('Invalid relations between control points, knot vector, and n');
		return null;
	}

	var dim = control_points[0][0].length
		, knot_span_index_u = verb.eval.nurbs.knot_span_given_n( n, degree_u, u, knots_u )
		, knot_span_index_v = verb.eval.nurbs.knot_span_given_n( m, degree_v, v, knots_v )
		, u_basis_vals = verb.eval.nurbs.basis_functions_given_knot_span_index( knot_span_index_u, u, degree_u, knots_u )
		, v_basis_vals = verb.eval.nurbs.basis_functions_given_knot_span_index( knot_span_index_v, v, degree_v, knots_v )
		, uind = knot_span_index_u - degree_u
		, vind = knot_span_index_v
		, position = verb.eval.nurbs.zeros_1d( dim )
		, temp = verb.eval.nurbs.zeros_1d( dim )
		, l = 0
		, k = 0;

	for (l = 0; l <= degree_v; l++) {	

		temp = verb.eval.nurbs.zeros_1d( dim );
		vind = knot_span_index_v - degree_v + l;

		// sample u isoline
		for (k = 0; k <= degree_u; k++) {	
			temp = numeric.add( temp, numeric.mul( u_basis_vals[k], control_points[uind+k][vind]) );
		}

		// add point from u isoline
		position = numeric.add( position, numeric.mul(v_basis_vals[l], temp) );
	}

	return position;
}

//
// ####curve_derivs( degree, knots, control_points, u, num_derivs )
//
// Determine the derivatives of a non-uniform, non-rational B-spline curve at a given parameter
//
// **params**
// + *Number*, integer degree of curve
// + *Array*, array of nondecreasing knot values
// + *Array*, 2d array of control points, where each control point is an array of length (dim)  
// + *Number*, parameter on the curve at which the point is to be evaluated
// 
// **returns** 
// + *Array*, a point represented by an array of length (dim)
//

verb.eval.nurbs.curve_derivs = function( degree, knots, control_points, u, num_derivs ) {

	var n = knots.length - degree - 2;
	return verb.eval.nurbs.curve_derivs_given_n( n, degree, knots, control_points, u, num_derivs );

}		

//
// ####curve_derivs_given_n( n, degree, knots, control_points, u, num_derivatives )
//
// Determine the derivatives of a non-uniform, non-rational B-spline curve at a given parameter
// (corresponds to algorithm 3.1 from The NURBS book, Piegl & Tiller 2nd edition)
//
// **params**
// + *Number*, integer number of basis functions - 1 = knots.length - degree - 2
// + *Number*, integer degree of curve
// + *Array*, array of nondecreasing knot values
// + *Array*, 2d array of control points, where each control point is an array of length (dim)  
// + *Number*, parameter on the curve at which the point is to be evaluated
// 
// **returns** 
// + *Array*, a point represented by an array of length (dim)
//

verb.eval.nurbs.curve_derivs_given_n = function( n, degree, knots, control_points, u, num_derivatives ) {

	if ( verb.eval.nurbs.are_valid_relations(degree, control_points.length, knots.length ) === false ) {
		console.error('Invalid relations between control points, knot vector, and n');
		return null;
	}

	var dim = control_points[0].length
		, du = Math.min(num_derivatives, degree)
		, CK = verb.eval.nurbs.zeros_2d( du+1, dim )
		, knot_span_index = verb.eval.nurbs.knot_span_given_n( n, degree, u, knots )
		, nders = verb.eval.nurbs.deriv_basis_functions_given_n_i( knot_span_index, u, degree, du, knots )
		, k = 0
		, j = 0;

	for (k = 0; k <= du; k++) {	
		for (j = 0; j <= degree; j++) {
			CK[k] = numeric.add( CK[k], numeric.mul( nders[k][j], control_points[ knot_span_index - degree + j ] ) )
		}
	}
	return CK;

}		

//
// ####are_valid_relations( degree, num_control_points, knots_length )
//
// Confirm the relations between degree (p), number of control points(n+1), and the number of knots (m+1)
// via The NURBS Book (section 3.2, Second Edition)
//
// **params**
// + *Number*, integer degree
// + *Number*, integer number of control points
// + *Number*, integer length of the knot vector (including duplicate knots)
// 
// **returns** 
// + *Boolean*, whether the values are correct
//

verb.eval.nurbs.are_valid_relations = function( degree, num_control_points, knots_length ) {

	return ( num_control_points + degree + 1 - knots_length ) === 0 ? true : false;

}		

//
// ####curve_point( degree, knots, control_points, u)
//
// Compute a point on a non-uniform, non-rational b-spline curve
//
// **params**
// + *Number*, integer degree of curve
// + *Array*, array of nondecreasing knot values
// + *Array*, 2d array of control points, where each control point is an array of length (dim)  
// + *Number*, parameter on the curve at which the point is to be evaluated
// 
// **returns** 
// + *Array*, a point represented by an array of length (dim)
//

verb.eval.nurbs.curve_point = function( degree, knots, control_points, u) {

	var n = knots.length - degree - 2;
	return verb.eval.nurbs.curve_point_given_n( n, degree, knots, control_points, u);

}		

//
// ####curve_point_given_n( n, degree, knots, control_points, u)
//
// Compute a point on a non-uniform, non-rational b-spline curve
// (corresponds to algorithm 3.1 from The NURBS book, Piegl & Tiller 2nd edition)
//
// **params**
// + *Number*, integer number of basis functions - 1 = knots.length - degree - 2
// + *Number*, integer degree of curve
// + *Array*, array of nondecreasing knot values
// + *Array*, 2d array of control points, where each control point is an array of length (dim)  
// + *Number*, parameter on the curve at which the point is to be evaluated
// 
// **returns** 
// + *Array*, a point represented by an array of length (dim)
//

verb.eval.nurbs.curve_point_given_n = function( n, degree, knots, control_points, u) {

	if ( verb.eval.nurbs.are_valid_relations(degree, control_points.length, knots.length ) === false ) {
		console.error('Invalid relations between control points, knot vector, and n');
		return null;
	}

	var knot_span_index = verb.eval.nurbs.knot_span_given_n( n, degree, u, knots )
		, basis_values = verb.eval.nurbs.basis_functions_given_knot_span_index( knot_span_index, u, degree, knots ) 
		, position = verb.eval.nurbs.zeros_1d( control_points[0].length );

		for (var j = 0; j <= degree; j++ )	{
			position = numeric.add( position, numeric.mul( basis_values[j], control_points[ knot_span_index - degree + j ] ) );
		}

		return position;
}	

//
// ####zeros_1d(size)
//
// Generate a 1d array of zeros
//
// **params**
// + *Number*, integer number of rows
// 
// **returns** 
// + *Array*, 1d array of given size
//

verb.eval.nurbs.zeros_1d = function(size) {
  size = size > 0 ? size : 0;

  var arr = [];

  while(size--) {
    arr.push(0);
  }

  return arr;
}

//
// ####zeros_2d(rows, cols)
//
// Generate a 2D array of zeros
//
// **params**
// + *Number*, integer number of rows
// + *Number*, integer number of columns
// 
// **returns** 
// + *Array*, 2d array of given size
//

verb.eval.nurbs.zeros_2d = function(rows, cols) {
  cols = cols > 0 ? cols : 0;
  rows = rows > 0 ? rows : 0;

  var arr = [];
  var cols_temp = cols;
  var rows_temp = rows;

  while(rows--) {
    arr.push([]);

    while(cols_temp--) {
      arr[rows_temp-rows-1].push(0);
    }
    cols_temp = cols;
  }

  return arr;
}

//
// ####zeros_3d(rows, cols, dim)
//
// Generate a 3D array of zeros
//
// **params**
// + *Number*, integer number of rows
// + *Number*, integer number of columns
// + *Number*, integer depth (i.e. dimension of arrays in 2d matrix)
// 
// **returns** 
// + *Array*, 3d array of given size
//

verb.eval.nurbs.zeros_3d = function(rows, cols, dim) {
  cols = cols > 0 ? cols : 0;
  rows = rows > 0 ? rows : 0;

  var arr = [];
  var cols_temp = cols;
  var rows_temp = rows;

  while(rows--) {
    arr.push([]);

    while(cols_temp--) {
      arr[rows_temp-rows-1].push( verb.eval.nurbs.zeros_1d(dim) );
    }
    cols_temp = cols;
  }

  return arr;
}

//
// ####deriv_basis_functions( u, degree, knots )
//
// Compute the non-vanishing basis functions and their derivatives
//
// **params**
// + *Number*, float parameter
// + *Number*, integer degree
// + *Array*, array of nondecreasing knot values
// 
// **returns** 
// + *Array*, 2d array of basis and derivative values of size (n+1, p+1) The nth row is the nth derivative and the first row is made up of the basis function values.
//

verb.eval.nurbs.deriv_basis_functions = function( u, degree, knots )
{
	var knot_span_index = verb.eval.nurbs.knot_span( degree, u, knots )
		, m = knots.length - 1
		, n = m - degree - 1;

	return verb.eval.nurbs.deriv_basis_functions_given_n_i( knot_span_index, u, degree, n, knots );
}	

//
// ####deriv_basis_functions_given_n_i( knot_span_index, u, p, n, knots )
//
// Compute the non-vanishing basis functions and their derivatives
// (corresponds to algorithm 2.3 from The NURBS book, Piegl & Tiller 2nd edition)
//
// **params**
// + *Number*, integer knot span index
// + *Number*, float parameter
// + *Number*, integer degree
// + *Number*, integer number of basis functions - 1 = knots.length - degree - 2
// + *Array*, array of nondecreasing knot values
// 
// **returns** 
// + *Array*, 2d array of basis and derivative values of size (n+1, p+1) The nth row is the nth derivative and the first row is made up of the basis function values.
//

verb.eval.nurbs.deriv_basis_functions_given_n_i = function( knot_span_index, u, p, n, knots )
{
	var ndu = verb.eval.nurbs.zeros_2d(p+1, p+1)
		, left = new Array( p + 1 )
		, right = new Array( p + 1 )
		, saved = 0
		, temp = 0
		, j = 1
		, r = 0;

	ndu[0][0] = 1.0;

	for(j = 1; j <= p; j++) {

		left[j] = u - knots[knot_span_index+1-j];
		right[j] = knots[knot_span_index+j] - u;
		saved = 0.0;

		for (r = 0; r < j; r++) {

			ndu[j][r] = right[r+1] + left[j-r];
			temp = ndu[r][j-1] / ndu[j][r];

			ndu[r][j] = saved + right[r+1]*temp;
			saved = left[j-r]*temp;

		}
		ndu[j][j] = saved;
	}


	var ders = verb.eval.nurbs.zeros_2d(n+1, p+1)
		, a = verb.eval.nurbs.zeros_2d(2, p+1)
		, k = 1
		, s1 = 0
		, s2 = 1
		, d = 0
		, rk = 0
		, pk = 0
		, j1 = 0
		, j2 = 0;

	for(j = 0; j <= p; j++) {
		ders[0][j] = ndu[j][p];
	}

	for (r = 0; r<=p; r++) {
		s1 = 0;
		s2 = 1;
		a[0][0] = 1.0;

		for (k=1; k<=n ;k++)
		{
			d = 0.0;
			rk = r - k;
			pk = p - k;

			if (r >= k) {
				a[s2][0] = a[s1][0] / ndu[pk+1][rk];
				d = a[s2][0]*ndu[rk][pk];
			}

			if (rk >= -1) {
				j1 = 1;
			} else {
				j1 = -rk;
			}

			if (r-1 <= pk) {
				j2 = k-1;
			} else {
				j2 = p - r;
			}

			for (j = j1; j <= j2; j++) {
				a[s2][j] = ( a[s1][j] - a[s1][ j - 1 ] ) / ndu[ pk + 1 ][ rk + j ];
				d += a[s2][j]*ndu[rk+j][pk];
			}

			if (r <= pk)
			{
				a[s2][k] = -a[s1][k-1]/ndu[pk+1][r];
				d += a[s2][k] * ndu[r][pk];
			}

			ders[k][r] = d;
			j = s1;
			s1 = s2;
			s2 = j;
		}
	}

	r = p;
	for (k = 1; k <= n; k++) {
		for (j = 0; j <= p; j++) {
			ders[k][j] *= r;
		}
		r *= (p-k);
	}

	return ders;

};

//
// ####basis_functions( u, degree, knots )
//
// Compute the non-vanishing basis functions
//
// **params**
// + *Number*, float parameter
// + *Number*, integer degree of function
// + *Array*, array of nondecreasing knot values
// 
// **returns** 
// + *Array*, list of non-vanishing basis functions
//

verb.eval.nurbs.basis_functions = function( u, degree, knots )
{
	var knot_span_index = verb.eval.nurbs.knot_span(u, degree, knots);
	return verb.eval.nurbs.basis_functions_given_knot_span_index( knot_span_index, u, degree, knots );
};

//
// ####basis_functions_given_knot_span_index( knot_span_index, u, degree, knots )
//
// Compute the non-vanishing basis functions
// (corresponds to algorithm 2.2 from The NURBS book, Piegl & Tiller 2nd edition)
//
// **params**
// + *Number*, integer knot span index
// + *Number*, float parameter
// + *Number*, integer degree of function
// + *Array*, array of nondecreasing knot values
// 
// **returns** 
// + *Array*, list of non-vanishing basis functions
//

verb.eval.nurbs.basis_functions_given_knot_span_index = function( knot_span_index, u, degree, knots )
{
	var basis_functions = new Array( degree + 1 )
		, left = new Array( degree + 1 )
		, right = new Array( degree + 1 )
		, saved = 0
		, temp = 0;

	basis_functions[0] = 1.0;

	for(var j = 1; j <= degree; j++) {

		left[j] = u - knots[knot_span_index+1-j];
		right[j] = knots[knot_span_index+j] - u;
		saved = 0.0;

		for (var r = 0; r < j; r++) {

			temp = basis_functions[r] / ( right[r+1] + left[j-r] );
			basis_functions[r] = saved + right[r+1]*temp;
			saved = left[j-r]*temp;

		}

		basis_functions[j] = saved;
	}

	return basis_functions;
};


//
// ####knot_span( degree, u, knots )
//
// Find the span on the knot vector without supplying n
//
// **params**
// + *Number*, integer degree of function
// + *Number*, float parameter
// + *Array*, array of nondecreasing knot values
// 
// **returns** 
// + *Number*, the index of the knot span
//

verb.eval.nurbs.knot_span = function( degree, u, knots )
{

	var m = knots.length - 1
		, n = m - degree - 1;

	return verb.eval.nurbs.knot_span_given_n(n, degree, u, knots);

};

//
// ####knot_span_given_n( n, degree, u, knots )
//
// Find the span on the knot vector knots of the given parameter
// (corresponds to algorithm 2.1 from The NURBS book, Piegl & Tiller 2nd edition)
//
// **params**
// + *Number*, integer number of basis functions - 1 = knots.length - degree - 2
// + *Number*, integer degree of function
// + *Number*, float parameter
// + *Array*, array of nondecreasing knot values
// 
// **returns** 
// + *Number*, the index of the knot span
//

verb.eval.nurbs.knot_span_given_n = function( n, degree, u, knots )
{
	if ( u >= knots[n+1] )
	{
		return n;
	}

	if ( u < knots[degree] )
	{
		return degree;
	}

	var low = degree
		, high = n+1
		, mid = Math.floor( (low + high) / 2 );

	while( u < knots[ mid ] || u >= knots[ mid + 1 ] )
	{
		if ( u < knots[ mid ] )
		{
			high = mid;
		}
		else 
		{
			low = mid;
		}
		mid = Math.floor( (low + high) / 2 );
	}

	return mid;

};
