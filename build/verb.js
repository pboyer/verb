if ( typeof exports != 'object' || exports === undefined )  // browser context
{
	var verb = {}
		, numeric = window.numeric
		, binomial = window.binomial
		, labor = window.labor
		, _ = window.underscore;
}
else // node.js context
{
	var verb = module.exports = {}
		, numeric = require('numeric')
		, binomial = require('binomial')
		, labor = require('labor')
		, _ = require('underscore');
}

verb.geom = {};
verb.core = {};
verb.eval = {};

verb.eval.nurbs = verb.eval.nurbs || {};
verb.eval.geom = verb.eval.geom || {};
verb.eval.mesh = verb.eval.mesh || {};

verb.EPSILON = 1e-8;

verb.init = function() {
	verb.nurbsEngine = new verb.core.Engine( verb.eval.nurbs );
	verb.geom.NurbsGeometry.prototype.nurbsEngine = verb.nurbsEngine;
}

if (typeof Object.create !== 'function') {
    Object.create = function (o) {
        function F() {}
        F.prototype = o;
        return new F();
    };
}

Function.prototype.method = function (name, func) {
    this.prototype[name] = func;
    return this;
};

Function.method('inherits', function (parent) {
    this.prototype = new parent();
    var d = {}, 
        p = this.prototype;
    this.prototype.constructor = parent; 
    return this;
});

// engine nurbs handles nurbs eval requests
// it also acknowledges whether there are web workers available 
// in the broswer, if not, it defaults to blocking evaluation
// also handles situations where the server is unavailable
verb.core.Engine = function(options) {

	// private properties
	var _use_pool = ( typeof Worker === 'function' ) && ( options.use_pool || options.use_pool === undefined );
	var _num_threads = options.num_workers || 2;
	var _tolerance = options.tolerance || 1e-4;
	var _url = options.url || 'verb_nurbs_eval.js';
	var _lib = options.library || verb.eval.nurbs;
	var _error_handler = options.error_handler || ( function( message ) { console.warn( message ); } );
	var _pool = undefined;

	// private methods
	var init_pool = function() {

		try {
			_pool = new labor.Pool(_url, _num_threads );
			_pool.start();
		} catch (err) {
			_error_handler( 'Failed to initialize labor.Pool.' );
			return false;
		}
		return true;

	};

	// privleged methods
	this.start = function() {
		// initialize pool
		if ( _use_pool )
		{
			init_pool();
		}
	};

	this.eval = function(func, arguments_array, callback )
	{
		// if we are to use the pool we must init it 
		if ( _use_pool && ( _pool || ( _pool === undefined && init_pool() ) ) ) {
			_pool.addWork( func, arguments_array, callback );
		}	else {
			var that = this;
			setTimeout( function() { callback( that.eval_sync(func, arguments_array ) ) }, 0);
		}
	}

	this.eval_sync = function(func, arguments_array) {
		return _lib[func].apply(null, arguments_array);
	}

	this.set_tolerance = function(tolerance) {
		// TODO: send message to worker pool in labor.js
		_tolerance = tolerance;
	}

	this.set_use_pool = function( use_pool ) {

		if ( use_pool && _pool === undefined && init_pool() ) {
			_use_pool = use_pool;
			return true;
		} else if ( !use_pool ) {
			_pool = null;
			delete _pool;
			return true;
		} else {
			return false;
		}
		
	}

	this.set_error_handler = function( handler ) {
		_error_handler = handler;
	}

	this.set_num_threads = function( num_threads ) {
		_num_threads = num_threads;
		// TODO: implement add or remove workers in labor.js
	}

};


// A simple class that allows clients to register
// a callback to be updated when a property is changed
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

		for (ele in watchers[name]){
			watchers[ele]( updateObject );
		}

		for (ele in watchers["change"]){
			watchers[ele]( updateObject );
		}

	};

	// get the value of a property name
	this.get = function( name ){

		return properties[name];

	};

	// set the value of a property and update watchers
	this.set = function( name, value ){

		var old = properties[name];
		properties[name] = value;

		report({name: name, old: old, "new": value, target: that, type: "full"});

	};

	// set a number of properties given an object containing all of the properties
	this.setAll = function( propertyNameValuePairs ){

		var oldVals = {};

		for ( propName in propertyNameValuePairs ){
			oldVals[propName] = properties[propName];
			properties[propName] = propertyNameValuePairs[propName];
		}

		report({old: oldVals, "new": propertyNameValuePairs, target: that, type: "multi"});

	};

	// set an index of array property and update watchers
	this.setAt = function( name, index, value ){

		var oldArr = properties[name];

		if (oldArr === undefined || oldArr.length >= index || index < 0){
			return;
		}

		var old = properties[name][index];
		properties[name][index] = value;

		report( {name: name, index: index, old: old, "new": value, target: that, type: "index"} );

	};

	// start watching a particular property.  use "name" to receive all 
	// updates
	this.watch = function( name, callback ){

		if ( watchers[name] === undefined || !callback ){
			return;
		}

		var id = watcherId++;
		watchers[name][watcherId] = callback;

		return watcherId++;
	};

	// start watching a list of properties
	this.watchAll = function( names, callback ){

		var watcherIds = [];

		for (var i = 0; i < names.length; i++){
			watcherIds.push( this.watch( names[i], callback ) );
		}

		return watcherIds;

	};

	// stop watching a particular property, given a propertyName
	// and watcherId
	this.ignore = function( name, watcherId ){
	
		if ( watchers[name] === undefined 
			|| watchers[name][watcherId] === undefined){
			return;
		}

		watchers[name][watcherId] = undefined;

	};

};
/**
 * Generate a unique id.
 *
 * @return {Number} The id
 * @api public
 */

verb.core.uid = (function(){
	var id = 0;
	return function() {
		return id++;
	};
})();
verb.geom.Geometry = function() { 

	var id = verb.core.uid();
	this.GetUniqueId = function() {
		return id;
	};

}.inherits(verb.core.WatchObject);
verb.geom.NurbsGeometry = function() {

	verb.geom.Geometry.call(this);

}.inherits( verb.geom.Geometry );
verb.geom.NurbsCurve = function( degree, controlPoints, weights, knots ) {

	this.setAll({
		"controlPoints": controlPoints,
		"weights": weights,
		"knots": knots ? knots.slice(0) : [],
		"degree": degree
	});

	verb.geom.NurbsGeometry.call(this);

}.inherits( verb.geom.NurbsGeometry );


verb.geom.NurbsCurve.prototype.homogenize = function(){

	return verb.eval.nurbs.homogenize_1d( this.get('controlPoints'), this.get('weights') );

};

verb.geom.NurbsCurve.prototype.update = function(){

	if ( !this.nurbsRep ){
		return;
	}

	var curve_props = this.nurbsRep();

	this.setAll({
		"controlPoints": curve_props.control_points,
		"weights": curve_props.weights,
		"knots": curve_props.knots,
		"degree": degree
	});

};

verb.geom.NurbsCurve.prototype.pointSync = function( u ) {

	return this.nurbsEngine.eval_sync( 'rational_curve_point', [ this.get('degree'), this.get('knots'), this.homogenize(), u ] );

};

verb.geom.NurbsCurve.prototype.point = function( u, callback ) {

	this.nurbsEngine.eval( 'rational_curve_point', [ this.get('degree'), this.get('knots'), this.homogenize(),  u ], callback ); 

};

verb.geom.NurbsCurve.prototype.derivatives = function( u, num_derivs, callback ) {

	this.nurbsEngine.eval( 'rational_curve_derivs', [ this.get('degree'), this.get('knots'), this.homogenize(),  u, num_derivs  ], callback ); 

};

verb.geom.NurbsCurve.prototype.derivativesSync = function( u, num_derivs ) {

	return this.nurbsEngine.eval_sync( 'rational_curve_derivs', [ this.get('degree'), this.get('knots'), this.homogenize(),  u, num_derivs] );

};

verb.geom.NurbsCurve.prototype.tesselate = function(tol){

	if (tol === undefined){
		tol = verb.TOLERANCE;
	}

	this.nurbsEngine.eval( 'rational_curve_adaptive_sample', [ this.get('degree'), this.get('knots'), this.homogenize(), tol ], callback ); 

};

verb.geom.NurbsCurve.prototype.tesselateSync = function(){

	if (tol === undefined){
		tol = verb.TOLERANCE;
	}

	return this.nurbsEngine.eval_sync( 'rational_curve_adaptive_sample', [ this.get('degree'), this.get('knots'), this.homogenize(), tol ] ); 

};


verb.geom.NurbsSurface = function( degreeU, knotsU, degreeV, knotsV, controlPoints, weights ) {

	this.setAll({
		"controlPoints": controlPoints,
		"weights": weights,
		"knotsU": knotsU ? knotsU.slice(0) : [],
		"knotsV": knotsV ? knotsV.slice(0) : [],
		"degreeU": degreeU,
		"degreeV": degreeV
	});

	verb.geom.NurbsGeometry.call(this);

}.inherits( verb.geom.NurbsGeometry );


verb.geom.NurbsSurface.prototype.homogenize = function(){

	return verb.eval.nurbs.homogenize_2d( this.get('controlPoints'), this.get('weights') );

};

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
verb.geom.NurbsSurface.prototype.pointSync = function( u, v ) {

	return this.nurbsEngine.eval_sync( 'rational_surface_point', 
										[ 	this.get('degreeU'), this.get('knotsU'), this.get('degreeV'), this.get('knotsV'), this.homogenize(), u, v ] );

};

verb.geom.NurbsSurface.prototype.point = function( u, v, callback ) {

	this.nurbsEngine.eval( 'rational_surface_point', 
							[ 	this.get('degreeU'), this.get('knotsU'), this.get('degreeV'), this.get('knotsV'), this.homogenize(), u, v ], callback );

};

verb.geom.NurbsSurface.prototype.derivatives = function( u, v, num_derivs, callback ) {

	this.nurbsEngine.eval( 'rational_surface_derivs', 
		[	this.get('degreeU'), this.get('knotsU'), this.get('degreeV'), this.get('knotsV'), this.homogenize(), num_derivs, u, v ], callback ); 

};

verb.geom.NurbsSurface.prototype.derivativesSync = function( u, v, num_derivs ) {

	return this.nurbsEngine.eval_sync( 'rational_surface_derivs', 
		[	this.get('degreeU'), this.get('knotsU'), this.get('degreeV'), this.get('knotsV'), this.homogenize(), num_derivs, u, v ] );

};

verb.geom.NurbsSurface.prototype.tesselate = function(udivs, vdivs){

	this.nurbsEngine.eval( 'tesselate_rational_surface_naive', 
		[	this.get('degreeU'), this.get('knotsU'), this.get('degreeV'), this.get('knotsV'), this.homogenize(), udivs, vdivs ], callback ); 

};

verb.geom.NurbsSurface.prototype.tesselateSync = function(udivs, vdivs){

	return this.nurbsEngine.eval( 'tesselate_rational_surface_naive', 
		[	this.get('degreeU'), this.get('knotsU'), this.get('degreeV'), this.get('knotsV'), this.homogenize(), udivs, vdivs ] ); 

};
verb.geom.Arc = function(center, xaxis, yaxis, radius, interval) {

	this.setAll( {
		"center": center,
		"xaxis": xaxis,
		"yaxis": yaxis,
		"radius": radius,
		"interval": interval 
	});

	var curve_props = this.nurbsRep();

	verb.geom.NurbsCurve.call(this, curve_props.degree, curve_props.control_points, curve_props.weights, curve_props.knots );

	this.watchAll( ['center', 'xaxis', 'yaxis', 'radius', 'interval'], this.update );

}.inherits(verb.geom.NurbsCurve);

verb.geom.Arc.prototype.nurbsRep = function(){

	return this.nurbsEngine.eval_sync( 'get_arc', [ this.get("center"), 
													 this.get("xaxis"), 
													 this.get("yaxis"), 
													 this.get("radius"), 
													 this.get("interval").get("min"), 
													 this.get("interval").get("max")] );

};

verb.geom.BezierCurve = function( degree, control_points, weights) {

	// a bezier can be represented exactly as a rational b-spline curve
	// the form of the knot vector is [0,0,..,1,1] - the number of 0s is the degree + 1
	// e.g. the cubic bezier has this knot vector [0,0,0,0,1,1,1,1]

	// build the knots
	var knots = [];
	for (var i = 0; i < degree + 1; i++){ knots.push(0); }
	for (var i = 0; i < degree + 1; i++){ knots.push(1); }

	// build the control points
	var ctrlPoints = control_points.slice(0);

	// if weights aren't provided, build uniform weights
	if (weights === undefined){
		weights = [];
		for (var i = 0; i < ctrlPoints.length; i++){
			weights.push(1);
		}
	}

	verb.geom.NurbsCurve.call(this, degree, control_points, weight, knots );

}.inherits( verb.geom.NurbsCurve ); 


/**
 * BoundngBox Constructor
 *
 * @param {Array} Points to add, if desired.  Otherwise, will not be initialized until add is called.
 * @return {Object} Newly formed BoundingBox object
 * @api public
 */	

verb.geom.BoundingBox = function() {
	this.initialized = false;
	this.min = [0,0,0];
	this.max = [0,0,0];

 	var pt_args = Array.prototype.slice.call( arguments, 0);
 	this.add_elements_sync(pt_args);
}	

/**
 * Asynchronously add an array of points to the bounding box
 *
 * @param {Array} An array of length-3 array of numbers 
 * @param {Function} Function to call when all of the points in array have been added.  The only parameter to this
 * callback is this bounding box.
 * @api public
 */

verb.geom.BoundingBox.prototype.add_elements = function( point_array, callback ) 
{

	var that = this; 
	_.defer(function() {
		_.each( point_array, function(elem, index) {
			that.add(elem);
		});
		callback(that);
	});

};

/**
 * Synchronously add an array of points to the bounding box
 *
 * @param {Array} An array of length-3 array of numbers 
 * @return {Object} This BoundingBox for chaining
 * @api public
 */

verb.geom.BoundingBox.prototype.add_elements_sync = function( point_array ) 
{
	var that = this; 
	_.each( point_array, function(elem) {
		that.add(elem);
	});
	return this;
};

/** 
 * Adds a point to the bounding box, expanding the bounding box if the point is outside of it.
 * If the bounding box is not initialized, this method has that side effect.
 *
 * @param {Array} A length-3 array of numbers 
 * @return {Object} This BoundingBox for chaining
 * @api public
 */

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

/**
 * Determines if two intervals on the real number line intersect
 *
 * @param {Number} Beginning of first interval
 * @param {Number} End of first interval
 * @param {Number} Beginning of second interval
 * @param {Number} End of second interval
 * @return {Boolean} true if the two intervals overlap, otherwise false
 * @api public
 */

verb.geom.BoundingBox.prototype.contains = function(point) {

	if ( !this.initialized )
	{
		return false;
	}

	return this.intersects( new verb.geom.BoundingBox(point) );

}

/**
 * Defines the tolerance for bounding box operations
 *
 * @api public
 */

verb.geom.BoundingBox.prototype.TOLERANCE = 1e-4;

/**
 * Determines if two intervals on the real number line intersect
 *
 * @param {Number} Beginning of first interval
 * @param {Number} End of first interval
 * @param {Number} Beginning of second interval
 * @param {Number} End of second interval
 * @return {Boolean} true if the two intervals overlap, otherwise false
 * @api public
 */

verb.geom.BoundingBox.prototype.intervals_overlap = function( a1, a2, b1, b2 ) {

	var tol = verb.geom.BoundingBox.prototype.TOLERANCE
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

/**
 * Determines if this bounding box intersects with another
 *
 * @param {Object} BoundingBox to check for intersection with this one
 * @return {Boolean} true if the two bounding boxes intersect, otherwise false
 * @api public
 */

verb.geom.BoundingBox.prototype.intersects = function( bb ) {

	if ( !this.initialized || !bb.initialized )
	{
		return false;
	}

	var a1 = this.min
		, a2 = this.max
		, b1 = bb.min
		, b2 = bb.max;

	if ( this.intervals_overlap(a1[0], a2[0], b1[0], b2[0]) 
			&& this.intervals_overlap(a1[1], a2[1], b1[1], b2[1]) 
			&& this.intervals_overlap(a1[2], a2[2], b1[2], b2[2] ) )
	{
		return true;
	}

	return false;

};

/**
 * Clear the bounding box, leaving it in an uninitialized state.  Call add, add_elements in order to 
 * initialize
 *
 * @return {Object} this BoundingBox for chaining
 * @api public
 */

verb.geom.BoundingBox.prototype.clear = function( bb ) {

	this.initialized = false;
	return this;

};

/**
 * Get longest axis of bounding box
 *
 * @return {Number} Index of longest axis
 * @api public
 */

verb.geom.BoundingBox.prototype.get_longest_axis = function( bb ) {

	var axis_lengths = [ 	this.get_axis_length(0), 
							this.get_axis_length(1), 
							this.get_axis_length(2)];

	return axis_lengths.indexOf(Math.max.apply(Math, axis_lengths));

};

/**
 * Get length of given axis. 
 *
 * @param {Number} Index of axis to inspect (between 0 and 2)
 * @return {Number} Length of the given axis.  If axis is out of bounds, returns 0.
 * @api public
 */

verb.geom.BoundingBox.prototype.get_axis_length = function( i ) {

	if (i < 0 || i > 2) return 0;

	return Math.abs( this.min[i] - this.max[i] );

};

/**
 * Compute the boolean intersection of this with another axis-aligned bounding box.  If the two
 * bounding boxes do not intersect, returns null.
 *
 * @param {Object} BoundingBox to intersect with
 * @return {Object} The bounding box formed by the intersection or null if there is no intersection.
 * @api public
 */

verb.geom.BoundingBox.prototype.intersect = function( bb ) {

	if ( !this.initialized )
	{
		return null;
	}

	var a1 = this.min
		, a2 = this.max
		, b1 = bb.min
		, b2 = bb.max;

	if ( !this.intersects(bb) )
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


verb.geom.Circle = function(center, xaxis, yaxis, radius) {

	this.setAll({
		"center": center,
		"xaxis": xaxis,
		"yaxis": yaxis,
		"radius": radius 
	});

	var curve_props = this.nurbsRep();

	verb.geom.NurbsCurve.call(this, curve_props.degree, curve_props.control_points, curve_props.weight, curve_props.knots );

	this.watchAll( ['center', 'xaxis', 'yaxis', 'radius'], this.update );

}.inherits(verb.geom.NurbsCurve);

verb.geom.Circle.prototype.nurbsRep = function(){

	return this.nurbsEngine.eval_sync( 'get_arc', [  this.get("center"), 
																									 this.get("xaxis"), 
																									 this.get("yaxis"), 
																									 this.get("radius"), 
																									 0, 
																									 2 * Math.PI ]);

};



verb.geom.Cone = function(axis, xaxis, base, height, radius ) {

	this.setAll({
		"axis": axis,
		"xaxis": xaxis,
		"base": base,
		"height": height,
		"radius": radius 
	});

	var surface_props = this.nurbsRep();

	verb.geom.NurbsSurface.call(this, surface_props.degree, surface_props.control_points, surface_props.weight, surface_props.knots );

	this.watchAll( ['axis', 'xaxis', 'base', 'height', 'radius'], this.update );

}.inherits(verb.geom.NurbsSurface);

verb.geom.Cone.prototype.nurbsRep = function(){

	return this.nurbsEngine.eval_sync( 'get_cone_surface', [ this.get("axis"), 
															 this.get("xaxis"), 
															 this.get("base"), 
															 this.get("height"), 
															 this.get("radius") ]);

};
verb.geom.Cylinder = function(axis, xaxis, base, height, radius ) {

	this.setAll({
		"axis": axis,
		"xaxis": xaxis,
		"base": base,
		"height": height,
		"radius": radius 
	});

	var surface_props = this.nurbsRep();

	verb.geom.NurbsSurface.call(this, surface_props.degree, surface_props.control_points, surface_props.weight, surface_props.knots );

	this.watchAll( ['axis', 'xaxis', 'base', 'height', 'radius'], this.update );

}.inherits(verb.geom.NurbsSurface);

verb.geom.Cylinder.prototype.nurbsRep = function() {

  return this.nurbsEngine.eval_sync( 'get_cylinder_surface', 
						  												 [ this.get("axis"), 
						  												 	 this.get("xaxis"), 
						  													 this.get("base"), 
																				 this.get("height"), 
																				 this.get("radius") ]);

};
verb.geom.Ellipse = function(center, xaxis, yaxis, xradius, yradius) {

	this.setAll({
		"center": center,
		"xaxis": xaxis,
		"yaxis": yaxis,
		"xradius": xradius,
		"yradius": yradius
	});

	var curve_props = this.nurbsRep();

	verb.geom.NurbsCurve.call(this, curve_props.degree, curve_props.control_points, curve_props.weight, curve_props.knots );

	this.watchAll( ['center', 'xaxis', 'yaxis', 'xradius', 'yradius'], this.update );

}.inherits(verb.geom.NurbsCurve);

verb.geom.Ellipse.prototype.nurbsRep = function(){

	// very similar to arc, just rotate first then use minor and major radius rather than radius

	return this.nurbsEngine.eval_sync( 'get_ellipse_arc', [ this.get("center"), 
															 this.get("xaxis"), 
															 this.get("yaxis"), 
															 this.get("xradius"), 
															 this.get("yradius"), 
															 0, 
															 2 * Math.PI ]);

};

// todo do polyline, plane, revsurface, sphere, think about sweep
// make sure it all builds again, may need to reorder the build process

// implement ellipse
// implement tesselation stuff, proper mesh datatypes

// prepare demo

verb.geom.EllipseArc = function(center, xaxis, yaxis, xradius, yradius, interval) {

	this.setAll({
		"center": center,
		"xaxis": xaxis,
		"yaxis": yaxis,
		"xradius": xradius,
		"yradius": yradius,
		"interval": interval
	});

	var curve_props = this.nurbsRep();

	verb.geom.NurbsCurve.call(this, curve_props.degree, curve_props.control_points, curve_props.weight, curve_props.knots );

	this.watchAll( ['center', 'xaxis', 'yaxis', 'xradius', 'yradius', 'interval'], this.update );

}.inherits(verb.geom.NurbsCurve);

verb.geom.EllipseArc.prototype.nurbsRep = function(){

	return this.nurbsEngine.eval_sync( 'get_ellipse_arc', [ this.get("center"), 
															 this.get("xaxis"), 
															 this.get("yaxis"), 
															 this.get("xradius"), 
															 this.get("yradius"), 
															 this.get("interval").get("min"), 
													 		 this.get("center").get("max")] );

};

verb.geom.Extrusion = function(profile, axis, length ) {

	this.setAll({ 
		  "profile": profile,
		  "axis": axis,
	      "length": length 
	  });

	var surface_props = this.nurbsRep();

	verb.geom.NurbsSurface.call(this, surface_props.degree, surface_props.control_points, surface_props.weight, surface_props.knots );

	this.watchAll( ['axis', 'length' ], this.update );
	profile.watchAll( ['knots', 'degree', 'controlPoints', 'weights'], this.update );

}.inherits(verb.geom.NurbsSurface);

verb.geom.Extrusion.prototype.nurbsRep = function() {

  return this.nurbsEngine.eval_sync( 'get_extruded_surface', 
									[ this.get("axis"), 
								 	  this.get("length"), 
									  this.get("profile").get("knots"), 
									  this.get("profile").get("degree"), 
									  this.get("profile").get("controlPoints"),
									  this.get("profile").get("weights")] );

};



verb.geom.FourPointSurface = function(p1, p2, p3, p4) {

	this.setAll( {
		"p1": center,
		"p2": xaxis,
		"p3": yaxis,
		"p4": radius
	});

	var curve_props = this.nurbsRep();

	verb.geom.NurbsCurve.call(this, curve_props.degree, curve_props.control_points, curve_props.weight, curve_props.knots );

	this.watchAll( ['p1', 'p2', 'p3', 'p4'], this.update );

}.inherits(verb.geom.NurbsCurve);

verb.geom.FourPointSurface.prototype.nurbsRep = function(){

	return this.nurbsEngine.eval_sync( 'get_4pt_surface', [ this.get("p1"), 
															 this.get("p2"), 
															 this.get("p3"), 
															 this.get("p4") ]);

};

verb.geom.Interval = function(min, max) {

	this.setAll({ 
		"min": min,
		"max": max 
	});

}.inherits(verb.core.WatchObject);

verb.geom.Interval2 = function(minu, maxu, minv, maxv) {

	this.setAll({ 
		"uinterval": new verb.geom.Interval(minu, maxu),
		"vinterval": new verb.geom.Interval(minv, maxv)
	});

}.inherits(verb.core.WatchObject);

verb.geom.Line = function(start, end) {

	this.setAll({ 
		"start": start,
		"end": end
	});

	var curve_props = this.nurbsRep();

	verb.geom.NurbsCurve.call(this, curve_props.degree, curve_props.control_points, curve_props.weight, curve_props.knots );

	this.watchAll(['start', 'end'], this.update );

}.inherits(verb.geom.NurbsCurve);

verb.geom.Line.prototype.nurbsRep = function(){

	return {
			knots: [0,0,1,1], 
			control_points: [ this.get("start"), this.get("end") ],
			weights: [1,1],
			degree: 1
	};

};



// a 4x4 matrix that can transform a vector
// a data structure representing a winged edge mesh  - inherits from Geometry
// a quad or tri
// point on a mesh
verb.geom.PlanarSurface = function( base, uaxis, vaxis, ulength, vlength ) {

	this.setAll({
		"base": center,
		"uaxis": xaxis,
		"vaxis": yaxis,
		"ulength": xradius,
		"vlength": yradius
	});

	var surface_props = this.nurbsRep();

	verb.geom.NurbsSurface.call(this, surface_props.degree, surface_props.control_points, surface_props.weight, surface_props.knots );

	this.watchAll( ['base', 'uaxis', 'vaxis', 'ulength', 'vlength'], this.update );

}.inherits(verb.geom.NurbsSurface);

verb.geom.Cone.prototype.nurbsRep = function(){

	var p1 = this.get('base')
		, uedge = numeric.mul( this.get('uaxis'), this.get('ulength'))
		, vedge = numeric.mul( this.get('vaxis'), this.get('vlength'))
		, p2 = numeric.add( base, uedge )
		, p3 = numeric.add( base, vedge, uedge )
		, p4 = numeric.add( base, vedge );

	return this.nurbsEngine.eval_sync( 'get_4pt_surface', [ p1, p2, p3, p4 ]);

};
verb.geom.PolylineCurve = function( points ){

	// construct some sort of parameter mapping to subcurves

	this.point_sync = function( u ) {
		// return this.nurbsEngine.eval_sync( 'rational_curve_point', [ _degree, _knot_vector, _homo_control_points, u ] );
	};

	this.derivs_sync = function( u, num_derivs ) {
		// return this.nurbsEngine.eval_sync( 'rational_curve_derivs', [ _degree, _knot_vector, _homo_control_points, u, num_derivs] );
	};

	this.point = function( u, callback ) {
		// nurbsEngine.eval( 'rational_curve_point', [ _degree, _knot_vector, _homo_control_points, u ], callback ); 
	};

	this.derivs = function( u, num_derivs, callback ) {
		// this.nurbsEngine.eval( 'rational_curve_derivs', [ _degree, _knot_vector, _homo_control_points, u, num_derivs  ], callback ); 
	};

	this.points = function( num_samples, callback ) {
		// TODO: here we would use the worker to generate all of the points
		// wait for callback
	};

}
verb.geom.Polyline = function(points) {

	if (points){
		this.points = points;
	} else {
		this.points = [];
	}

}.inherits(verb.geom.NurbsCurve);
verb.geom.PolylineCurve = function( polyline ){

	_degree = 1;
	_control_points = polyline.points.slice(0);

}.inherits( verb.geom.NurbsCurve );


// a data structure representing a sphere

// center and radius

// converted to nurbs surface as a revolved surface


// 
verb.geom.Vector3 = function(x, y, z) {

  if (arguments.length == 3) {
    this.x = x;
    this.y = y;
    this.z = z;
  } else if ('x' in x) {
    this.x = x.x;
    this.y = x.y;
    this.z = x.z;
  } else {
    this.x = x[0];
    this.y = x[1];
    this.z = x[2];
  }

};

verb.geom.Vector3.prototype = {
  clone: function() {
    return new verb.geom.Vector3(this.x, this.y, this.z);
  },

  negated: function() {
    return new verb.geom.Vector3(-this.x, -this.y, -this.z);
  },

  plus: function(a) {
    return new verb.geom.Vector3(this.x + a.x, this.y + a.y, this.z + a.z);
  },

  minus: function(a) {
    return new verb.geom.Vector3(this.x - a.x, this.y - a.y, this.z - a.z);
  },

  times: function(a) {
    return new verb.geom.Vector3(this.x * a, this.y * a, this.z * a);
  },

  dividedBy: function(a) {
    return new verb.geom.Vector3(this.x / a, this.y / a, this.z / a);
  },

  dot: function(a) {
    return this.x * a.x + this.y * a.y + this.z * a.z;
  },

  lerp: function(a, t) {
    return this.plus(a.minus(this).times(t));
  },

  length: function() {
    return Math.sqrt(this.dot(this));
  },

  unit: function() {
    return this.dividedBy(this.length());
  },

  cross: function(a) {
    return new verb.geom.Vector3(
      this.y * a.z - this.z * a.y,
      this.z * a.x - this.x * a.z,
      this.x * a.y - this.y * a.x
    );
  }
};
/**
 * Generate the control points, weights, and knots of a surface define by 3 points
 *
 * @param {Array} first point in counter-clockwise form
 * @param {Array} second point in counter-clockwise form
 * @param {Array} third point in counter-clockwise form
 * @param {Array} forth point in counter-clockwise form
 * @return {Object} an object with the following properties: control_points, weights, knots_u, knots_v, degree_u, degree_v
 * @api public
 */

  // * @param {Array} 3d array of control points, where rows are the u dir, and columns run along the positive v direction, 
 	// 								and where each control point is an array of length (dim)  

verb.eval.nurbs.get_4pt_surface = function( p1, p2, p3, p4 ){

	return {"knot_vector_u": [0,0,1,1], 
			"knot_vector_v": [0,0,1,1], 
			"control_points": [ [p1, p4], [p2, p3] ], 
			"degree_u": 1, 
			"degree_v": 1,
			"weights": [ [1, 1], [1, 1] ] };
			
}

/**
 * Generate the control points, weights, and knots of a cylinder
 *
 * @param {Array} normalized axis of cylinder
 * @param {Array} xaxis in plane of cylinder
 * @param {Array} position of base of cylinder
 * @param {Number} height from base to top
 * @param {Number} radius of the cylinder
 * @return {Object} an object with the following properties: control_points, weights, knots_u, knots_v, degree_u, degree_v
 * @api public
 */

verb.eval.nurbs.get_cylinder_surface = function( axis, xaxis, base, height, radius ){

	var yaxis = crossprod( axis, xaxis )
		, angle = 2 * Math.PI
		, circ = verb.eval.nurbs.get_arc( base, xaxis, yaxis, radius, 0, 2 * Math.PI );

	return verb.eval.nurbs.get_extruded_surface( axis, height, circ.knots, circ.degree, circ.control_points, circ.weights );

}

/**
 * Generate the control points, weights, and knots of a cone
 *
 * @param {Array} normalized axis of cone
 * @param {Array} position of base of cone
 * @param {Number} height from base to tip
 * @param {Number} radius at the base of the cone
 * @return {Object} an object with the following properties: control_points, weights, knots, degree
 * @api public
 */

verb.eval.nurbs.get_cone_surface = function( axis, xaxis, base, height, radius ){

	var angle = 2 * Math.PI
		, prof_degree = 1
		, prof_ctrl_pts = [ numeric.add( base, numeric.mul( height, axis ) ), numeric.add( base, numeric.mul( radius, xaxis ) )]
		, prof_knots = [0,0,1,1]
		, prof_weights = [1,1];

	return verb.eval.nurbs.get_revolved_surface(base, axis, angle, prof_knots, prof_degree, prof_ctrl_pts, prof_weights);

}

/**
 * Generate the control points, weights, and knots of an extruded surface
 *
 * @param {Array} axis of the extrusion
 * @param {Array} length of the extrusion
 * @param {Number} degree of the profile
 * @param {Number} control points of the profile
 * @param {Number} weights of the profile
 * @return {Object} an object with the following properties: control_points, weights, knots, degree
 * @api public
 */

verb.eval.nurbs.get_extruded_surface = function( axis, length, prof_knots, prof_degree, prof_control_points, prof_weights){

	var control_points = verb.eval.nurbs.zeros_2d( 2, prof_control_points.length )
		, weights = verb.eval.nurbs.zeros_2d( 2, prof_control_points.length );

	// original control points
	for (var j = 0; j < prof_control_points.length; j++){
		control_points[0][j] = prof_control_points[j];
		weights[0][j] = prof_weights[j];
	}

	// build translated control points
	var translation = numeric.mul(axis, length);

	for (var j = 0; j < prof_control_points.length; j++){
		control_points[1][j] = numeric.add( translation, prof_control_points[j] );
		weights[1][j] = prof_weights[j];
	}

	// return all parameters
	return {"knot_vector_u": [0,0,1,1], 
			"knot_vector_v": prof_knots, 
			"control_points": control_points, 
			"degree_u": 1, 
			"degree_v": prof_degree, 
			"weights": weights };
}

/**
 * Generate the control points, weights, and knots of a revolved surface
 * (Corresponds to Algorithm A7.1 from Piegl & Tiller)
 *
 * @param {Array} center of the rotation axis
 * @param {Array} axis of the rotation axis
 * @param {Number} angle to revolve around axis
 * @param {Number} degree of the generatrix
 * @param {Number} control points of the generatrix
 * @param {Number} weights of the generatrix
 * @return {Object} an object with the following properties: control_points, weights, knots, degree
 * @api public
 */

// helper method

function crossprod(u,v) {
  return [u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]];
}

verb.eval.nurbs.get_revolved_surface = function( center, axis, theta, prof_knots, prof_degree, prof_control_points, prof_weights){

	var narcs, knots_u, control_points, weights;

	if (theta <= Math.PI / 2) { // less than 90
		narcs = 1;
		knots_u = verb.eval.nurbs.zeros_1d( 6 + 2 * (narcs-1) );
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
	return {"knot_vector_u": knots_u, 
			"knot_vector_v": prof_knots, 
			"control_points": control_points, 
			"degree_u": 2, 
			"degree_v": prof_degree, 
			"weights": weights };

}

/**
 * Generate the control points, weights, and knots of an arbitrary arc
 * (Corresponds to Algorithm A7.1 from Piegl & Tiller)
 *
 * @param {Array} the center of the arc
 * @param {Array} the xaxis of the arc
 * @param {Array} orthogonal yaxis of the arc
 * @param {Number} radius of the arc
 * @param {Number} start angle of the arc, between 0 and 2pi
 * @param {Number} end angle of the arc, between 0 and 2pi, greater than the start angle
 * @return {Object} an object with the following properties: control_points, weights, knots, degree
 * @api public
 */

verb.eval.nurbs.get_arc = function( center, xaxis, yaxis, radius, start_angle, end_angle ) {

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
		, P0 = numeric.add( center, numeric.mul( radius, Math.cos(start_angle), xaxis), numeric.mul( radius, Math.sin(start_angle), yaxis ) )
		, T0 = numeric.sub( numeric.mul( Math.cos(start_angle), yaxis ), numeric.mul( Math.sin(start_angle), xaxis) )
		, Pw = verb.eval.nurbs.zeros_1d( narcs * 2 )
		, U = verb.eval.nurbs.zeros_1d( 2 * narcs + 3 )
		, index = 0
		, angle = start_angle
		, W = verb.eval.nurbs.zeros_1d( narcs * 2 );

	Pw[0] = P0;
	W[0] = 1;

	for (var i = 1; i <= narcs; i++){

		angle += dtheta;
		var P2 = numeric.add( center, numeric.mul( radius, Math.cos(angle), xaxis), numeric.mul( radius, Math.sin(angle), yaxis ) )

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

	var j = 2 * narcs + 1;

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


/**
 * Intersect two NURBS surfaces
 *
 * @param {Number} integer degree of surface in u direction
 * @param {Array} array of nondecreasing knot values in u direction
 * @param {Number} integer degree of surface in v direction
 * @param {Array} array of nondecreasing knot values in v direction
 * @param {Array} 3d array of control points, top to bottom is increasing u direction, left to right is increasing v direction,
 									and where each control point is an array of length (dim+1)
 * @param {Number} u parameter at which to evaluate the surface point
 * @param {Number} v parameter at which to evaluate the surface point
 * @return {Array} a point represented by an array of length (dim)
 * @api public
 */

verb.eval.nurbs.intersect_rational_surfaces = function( not, sure, yet ) {

	// tesselate two nurbs surfaces
	// verb.eval.mesh.intersect_meshes_by_aabb
	// refine the curves using the two surfaces

}

/**
 * Intersect two meshes via aabb intersection
 *
 * @param {Number} integer degree of surface in u direction
 * @param {Array} array of nondecreasing knot values in u direction
 * @param {Number} integer degree of surface in v direction
 * @param {Array} array of nondecreasing knot values in v direction
 * @param {Array} 3d array of control points, top to bottom is increasing u direction, left to right is increasing v direction,
 									and where each control point is an array of length (dim+1)
 * @param {Number} u parameter at which to evaluate the surface point
 * @param {Number} v parameter at which to evaluate the surface point
 * @return {Array} a point represented by an array of length (dim)
 * @api public
 */

verb.eval.mesh.intersect_meshes = function( vertices1, triangles1, uvs1, aabb1, vertices2, triangles2, uvs2, aabb2) {

	// tesselate two nurbs surfaces

	// call subroutine to:
		// put polygons into kd trees
		// intersect polygons via kd trees
		// build up curves
		// return poly line curves for further refinement

		// return collection of lists of points with parameter values

}

/**
 * Intersect two meshes via aabb intersection
 *
 * @param {Number} integer degree of surface in u direction
 * @param {Array} array of nondecreasing knot values in u direction
 * @param {Number} integer degree of surface in v direction
 * @param {Array} array of nondecreasing knot values in v direction
 * @param {Array} 3d array of control points, top to bottom is increasing u direction, left to right is increasing v direction,
 									and where each control point is an array of length (dim+1)
 * @param {Number} u parameter at which to evaluate the surface point
 * @param {Number} v parameter at which to evaluate the surface point
 * @return {Array} a point represented by an array of length (dim)
 * @api public
 */

verb.eval.mesh.intersect_meshes_by_aabb = function( points1, tris1, uvs1, points2, tris2, uvs2 ) {

	// build aabb for each mesh
	var tri_indices1 = _.range(tris1.length)
	  , tri_indices2 = _.range(tris2.length)
	  , aabb1 = verb.eval.mesh.make_mesh_aabb_tree( points1, tris1, tri_indices1 )
	  , aabb2 = verb.eval.mesh.make_mesh_aabb_tree( points2, tris2, tri_indices2 )
  
  // intersect and get the pairs of triangle intersctions
		, intersection_pairs = verb.eval.mesh.intersect_aabb_tree( points1, tris1, points2, tris2, aabb1, aabb2 );

	// get the segments of the intersection crv with uvs

	// sort the intersection segments

}

/**
 * Intersect two triangles
 *
 * @param {Array} array of length 3 arrays of numbers representing the points of mesh1
 * @param {Array} array of length 3 arrays of number representing the triangles of mesh1
 * @param {Array} array of length 3 arrays of numbers representing the points of mesh2
 * @param {Array} array of length 3 arrays of number representing the triangles of mesh2
 * @return {Array} a point represented by an array of length (dim)
 * @api public
 */

verb.eval.geom.intersect_tris = function( points1, tri1, uvs1, points2, tri2, uvs2 ) {

	// unpack the input
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

  	// return the two outer points

  } else if ( seg_int_results.length === 1 ) {

  	// tri1 is intersecting and the intersection segment
  	// is partially inside tri2

  	// return the end point of seg that is INSIDE tri2 and the intersection

  } else if ( seg_int_results.length === 2 ) {

  	// tri1 is intersecting and the intersection segment's
  	// end points are outside of tri2

  	// return the two seg_int_results 

  } 

}

/**
 *  Intersect ray/segment with triangle (from http://geomalgorithms.com/a06-_intersect-2.html)
 *
 *  If intersecting a ray, the param needs to be between 0 and 1 and the caller is responsible
 *  for making that check
 *
 * @param {Array} array of length 3 representing first point of the segment
 * @param {Array} array of length 3 representing second point of the segment
 * @param {Array} array of length 3 arrays representing the points of the triangle
 * @param {Array} array of length 3 containing int indices in the array of points, this allows passing a full mesh
 * @return {Object} an object with an "intersects" property that is true or false and if true, a 
 			"s" property giving the param on u, and "t" is the property on v, a "point" property
 			where the intersection took place, and "p" property representing the parameter along the segment
 * @api public
 */

verb.eval.geom.intersect_segment_with_tri = function( p1, p0, points, tri ) {

	var v0 = points[ tri[0] ]
		, v1 = points[ tri[1] ]
		, v2 = points[ tri[2] ]
		, u = numeric.sub( v1, v0 )
		, v = numeric.sub( v2, v0 )
		, udotv = numeric.dot(u,v)
		, udotu = numeric.dot(u,u)
		, vdotv = numeric.dot(v,v)
		, denom = udotv * udotv - udotu * vdotv
		, s = ((udotv * numeric.dot(u,v)) - (vdotv * numeric.dot(w,u))) / denom
		, t = ((udotv * numeric.dot(w,u)) - (udotu * numeric.dot(w,v))) / denom;

	if (s > 1.0 + EPSILON || t > 1.0 + EPSILON || t < -EPSILON || s < -EPSILON || s + t > 1.0 + EPSILON){
		return null;
	}

	var pt = numeric.add( v0, numeric.add( numeric.mul( s, u ), numeric.mul( t, v ) ) )
		, p1mp0 = numeric.sub(p1, p0)
		, p1mp0norm = numeric.dot( p1mp0, p1mp0 )
		, ptmp0 = numeric.sub(pt, p0)
		, ptmp0norm = numeric.dot( ptmp0, ptmp0 )
		, p = ptmp0norm / p1mp0norm;

	return { point: pt, s: s, t: t, param: p };

}

/**
 *  Intersect ray/segment with plane (from http://geomalgorithms.com/a06-_intersect-2.html)
 *
 *  If intersecting a ray, the param needs to be between 0 and 1 and the caller is responsible
 *  for making that check
 *
 * @param {Array} array of length 3 representing first point of the segment
 * @param {Array} array of length 3 representing second point of the segment
 * @param {Array} array of length 3 representing an origin point on the plane
 * @param {Array} array of length 3 representing the normal of the plane
 * @return {Object} an object with an "intersects" property that is true or false and if true, a 
 			"param" property giving the intersection parameter on the ray/segment.  
 * @api public
 */

verb.eval.geom.intersect_segment_with_plane = function( p0, p1, v0, n ) {

	var denom = numeric.dot( n, numeric.sub(p0,p1) );

	if ( abs( denom ) < EPSILON ) { // parallel case
   	return null;
 	}

 	var numer = numeric.dot( n, numeric.sub(v0,p0) );

	return { param: numer / denom };

}

/**
 *  Intersect two aabb trees - a recursive function
 *
 * @param {Array} array of length 3 arrays of numbers representing the points of mesh1
 * @param {Array} array of length 3 arrays of number representing the triangles of mesh1
 * @param {Array} array of length 3 arrays of numbers representing the points of mesh2
 * @param {Array} array of length 3 arrays of number representing the triangles of mesh2
 * @param {Object} nested object representing the aabb tree of the first mesh
 * @param {Object} nested object representing the aabb tree of the second mesh
 * @return {Array} a list of pairs of triangle indices for mesh1 and mesh2 that are intersecting
 * @api public
 */

verb.eval.geom.intersect_aabb_trees = function( points1, tris1, points2, tris2, aabb_tree1, aabb_tree2 ) {

  var intersects = aabb_tree1.bounding_box.intersects( aabb_tree2.bounding_box );

  if (!intersects){
  	return [];
  }

  if (aabb_tree1.children.length === 0 && aabb_tree2.children.length === 0){ 

  	return [ [aabb_tree1.triangle, aabb_tree2.triangle ] ]; 

  } else if (aabb_tree1.children.length === 0 && aabb_tree2.children.length != 0){

  	return     verb.eval.geom.intersect_aabb_trees( points1, tris1, points2, tris2, aabb_tree1, aabb_tree2.children[0] )
  		.concat( verb.eval.geom.intersect_aabb_trees( points1, tris1, points2, tris2, aabb_tree1, aabb_tree2.children[1] ) );

  } else if (aabb_tree1.children.length != 0 && aabb_tree2.children.length === 0){

  	return     verb.eval.geom.intersect_aabb_trees( points1, tris1, points2, tris2, aabb_tree1.children[0], aabb_tree2 )
  		.concat( verb.eval.geom.intersect_aabb_trees( points1, tris1, points2, tris2, aabb_tree1.children[1], aabb_tree2 ) );

  } else if (aabb_tree1.children.length != 0 && aabb_tree2.children.length != 0){

  	return     verb.eval.geom.intersect_aabb_trees( points1, tris1, points2, tris2, aabb_tree1.children[0], aabb_tree2.children[0] )
  		.concat( verb.eval.geom.intersect_aabb_trees( points1, tris1, points2, tris2, aabb_tree1.children[0], aabb_tree2.children[1] ) )
  		.concat( verb.eval.geom.intersect_aabb_trees( points1, tris1, points2, tris2, aabb_tree1.children[1], aabb_tree2.children[0] ) )
  		.concat( verb.eval.geom.intersect_aabb_trees( points1, tris1, points2, tris2, aabb_tree1.children[1], aabb_tree2.children[1] ) );

  }

}


/**
 * Make tree of axis aligned bounding boxes 
 *
 * @param {Array} array of length 3 arrays of numbers representing the points
 * @param {Array} array of length 3 arrays of number representing the triangles
 * @param {Array} array of numbers representing the relevant triangles to use to form aabb
 * @return {Array} a point represented by an array of length (dim)
 * @api public
 */

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

/**
 * Form axis-aligned bounding box from triangles of mesh
 *
 * @param {Array} array of length 3 arrays of numbers representing the points
 * @param {Array} array of length 3 arrays of number representing the triangles
 * @param {Array} array of numbers representing the relevant triangles
 * @return {Array} a point represented by an array of length (dim)
 * @api public
 */

verb.eval.mesh.make_mesh_aabb = function( points, tris, tri_indices ) {

	var bb = new verb.geom.BoundingBox();

	for (var i = tri_indices.length - 1; i >= 0; i--) {
		
		var tri_i = tri_indices[i];

		bb.add( points[ tris[ tri_i ][0] ] );
		bb.add( points[ tris[ tri_i ][1] ] );
		bb.add( points[ tris[ tri_i ][2] ] );

	};

	return bb;

}

/**
 * Sort triangles on longest axis
 *
 * @param {Number} integer degree of surface in u direction
 * @param {Array} array of nondecreasing knot values in u direction
 * @param {Number} integer degree of surface in v direction
 * @param {Array} array of nondecreasing knot values in v direction
 * @return {Array} a point represented by an array of length (dim)
 * @api public
 */

verb.eval.mesh.sort_tris_on_longest_axis = function( container_bb, points, tris, tri_indices ) {

	// get longest axis of bb
	var long_axis = container_bb.get_longest_axis();

	// map position on longest axis to index in tri_indices
	var axis_position_map = [];
	for (var i = tri_indices.length - 1; i >= 0; i--) {

		// centroid-centered

		// var tri_i = tri_indices[i], 
		// 	tri_centroid = verb.eval.geom.get_tri_centroid( points, tris[ tri_i ] );
		// axis_position_map.push( [ tri_centroid[long_axis], tri_i ] );

		// min position
		var tri_i = tri_indices[i],
			tri_min = verb.eval.mesh.get_min_coordinate_on_axis( points, tris[ tri_i ], long_axis );

		axis_position_map.push( [ tri_min, tri_i ] );

	}

	// sort by axis position
	axis_position_map.sort(function(a,b) { return a[0] > b[0] } );

	// box up the tri_indices in sorted_order
	var sorted_tri_indices = [];
	for (var i = 0, l = axis_position_map.length; i < l; i++) {
		sorted_tri_indices.push( axis_position_map[i][1] );
	}

	return sorted_tri_indices;

}

/**
 * Get min coordinate on axis
 *
 * @param {Array} array of length 3 arrays of numbers representing the points
 * @param {Array} length 3 array of point indices for the triangle
 * @return {Number} a point represented by an array of length 3
 * @api public
 */

verb.eval.mesh.get_min_coordinate_on_axis = function( points, tri, axis ) {

	var axis_coords = [];

	// for each vertex
	for (var i = 0; i < 3; i++){
		axis_coords.push( points[ tri[i] ][ axis ] );
	}

	return Math.min.apply(Math, axis_coords);
};

/**
 * Get triangle centroid
 *
 * @param {Array} array of length 3 arrays of numbers representing the points
 * @param {Array} length 3 array of point indices for the triangle
 * @return {Array} a point represented by an array of length 3
 * @api public
 */

verb.eval.geom.get_tri_centroid = function( points, tri ) {

	var centroid = [0,0,0];

	// for each vertex
	for (var i = 0; i < 3; i++){
		// for each point index
		for (var j = 0; j < 3; j++){
			centroid[j] += points[ tri[i] ][j];
		}
	}

	for (var i = 0; i < 3; i++){
		centroid[i] /= 3;
	}

	return centroid;

};

/**
 * Get triangle normal
 *
 * @param {Array} array of length 3 arrays of numbers representing the points
 * @param {Array} length 3 array of point indices for the triangle
 * @return {Array} a normal vector represented by an array of length 3
 * @api public
 */

verb.eval.geom.get_tri_norm = function( points, tri ) {

	var v0 = points[ tri[0] ]
		, v1 = points[ tri[1] ]
		, v2 = points[ tri[2] ]
		, u = numeric.sub( v1, v0 )
		, v = numeric.sub( v2, v0 )
		, n = numeric.cross( u, v );

	return numeric.mul( 1 / numeric.norm2( n ), n );

};

/**
 * Tesselate an untrimmed nurbs surface
 *
 * @param {Number} integer degree of surface in u direction
 * @param {Array} array of nondecreasing knot values in u direction
 * @param {Number} integer degree of surface in v direction
 * @param {Array} array of nondecreasing knot values in v direction
 * @param {Array} 3d array of control points, top to bottom is increasing u direction, left to right is increasing v direction,
 									and where each control point is an array of length (dim+1)
 * @return {Array} first element of array is an array of positions, second element are 3-tuple of triangle windings, third element is the 
                   uvs
 * @api public
 */

verb.eval.mesh.tesselate_rational_surface_naive = function( degree_u, knot_vector_u, degree_v, knot_vector_v, homo_control_points, divs_u, divs_v ) {

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

  // generate all points
	for (var i = 0; i < divs_u + 1; i++) {
		for (var j = 0; j < divs_v + 1; j++) {

			var pt_u = i * span_u, 
				pt_v = j * span_v;

			uvs.push( [pt_u, pt_v] );
			points.push( verb.eval.nurbs.rational_surface_point( degree_u, knot_vector_u,  degree_v, knot_vector_v, homo_control_points, pt_u, pt_v ) );

		}
	}

  //  u dir
  //  |
  //  v 
  //
  //  v dir -->
  //
	//  a ---- d 
	//  | \    |
	//  |  \   |
 	//  |   \  |
	//  |    \ | 
	//	b ---- c 
  //

  var faces = [];

  // generate all faces
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

	return { points: points, faces : faces, uvs: uvs};

}

/**
 * Refine an intersection pair for two curves given an initial guess.  This is an unconstrained minimization,
 * so the caller is responsible for providing a very good initial guess.
 *
 * @param {Number} integer degree of curve1
 * @param {Array} array of nondecreasing knot values for curve 1
 * @param {Array} 2d array of homogeneous control points, where each control point is an array of length (dim+1) 
 									and form (wi*pi, wi) for curve 1
 * @param {Number} integer degree of curve2
 * @param {Array} array of nondecreasing knot values for curve 2
 * @param {Array} 2d array of homogeneous control points, where each control point is an array of length (dim+1) 
 									and form (wi*pi, wi) for curve 2
 * @param {Array} length 2 array with first param guess in first position and second param guess in second position
 * @return {Array} a length 3 array containing the [ distance * distance, u1, u2 ]
 * @api public
 */

verb.eval.nurbs.rational_curve_curve_bb_intersect_refine = function( degree1, knot_vector1, control_points1, degree2, knot_vector2, control_points2, start_params ) {

	var objective = function(x) { 

		var p1 = verb.eval.nurbs.rational_curve_point(degree1, knot_vector1, control_points1, x[0])
			, p2 = verb.eval.nurbs.rational_curve_point(degree2, knot_vector2, control_points2, x[1])
			, p1_p2 = numeric.sub(p1, p2);

		return numeric.dot(p1_p2, p1_p2);

	}

	var sol_obj = numeric.uncmin( objective, start_params);

	return [sol_obj.f].concat( sol_obj.solution );

}

/**
 * Intersect two NURBS curves
 *
 * @param {Number} integer degree of curve1
 * @param {Array} array of nondecreasing knot values for curve 1
 * @param {Array} 2d array of homogeneous control points, where each control point is an array of length (dim+1) 
 									and form (wi*pi, wi) for curve 1
 * @param {Number} integer degree of curve2
 * @param {Array} array of nondecreasing knot values for curve 2
 * @param {Array} 2d array of homogeneous control points, where each control point is an array of length (dim+1) 
 									and form (wi*pi, wi) for curve 2
 * @param {Number} tolerance for the intersection
 * @return {Array} a 2d array specifying the intersections on u params of intersections on curve 1 and cruve 2
 * @api public
 */

verb.eval.nurbs.intersect_rational_curves_by_aabb = function( degree1, knot_vector1, control_points1, degree2, knot_vector2, control_points2, sample_tol, tol ) {

	// sample the two curves adaptively
	var up1 = verb.eval.nurbs.parametric_polyline_polyline_bb_intersect( degree1, knot_vector1, control_points1, sample_tol )
		, up2 = verb.eval.nurbs.parametric_polyline_polyline_bb_intersect( degree1, knot_vector1, control_points1, sample_tol )
		, u1 = _.map(up1, function(el) { return el[0]; })
		, u2 = _.map(up2, function(el) { return el[0]; })
		, p1 = _.map(up1, function(el) { return el.slice(1) })
		, p2 = _.map(up2, function(el) { return el.slice(1) });

	return verb.eval.nurbs.parametric_polyline_polyline_bb_intersect( p1, p2, u1, u2, tol );

}

/**
 * Intersect two polyline curves, keeping track of parameterization on each
 *
 * @param {Array} array of [parameter point] values for curve 1
 * @param {Array} array of [parameter point] values for curve 2
 * @param {Number} tolerance for the intersection
 * @return {Array} a 2d array specifying the intersections on u params of intersections on curve 1 and cruve 2
 * @api public
 */

verb.eval.nurbs.intersect_parametric_polylines_by_aabb = function( p1, p2, u1, u2, tol ) {

	var bb1 = new verb.geom.BoundingBox(p1)
		, bb2 = new verb.geom.BoundingBox(p2)

	if ( !bb1.intersects(bb2) ) return;

	if (p1.length === 2 && p2.length === 2 ){

			var inter = verb.eval.geom.segment_segment_intersect(p1[0],p1[1], p2[0], p2[1], tol);

			if ( inter != null ){

				// replace with interpolant
			 	inter[0][0] = inter[0][0] * ( u1[1]-u1[0] ) + u1[0];
			 	inter[1][0] = inter[1][0] * ( u2[1]-u2[0] ) + u2[0];

			 	return inter;

			} 

	} else if (p1.length === 2) {

		var p2_mid = Math.ceil( p2.length / 2 ),
				p2_a = p2.slice( 0, p2_mid ),
				u2_a = u2.slice(0, p2_mid ),
				p2_b = p2.slice( p2_mid-1 )
				u2_b = p2.slice( p2_mid-1 );

		return 	 verb.eval.nurbs.parametric_polyline_polyline_bb_intersect(p1, p2_a, u1, u2_a, tol)
		.concat( verb.eval.nurbs.parametric_polyline_polyline_bb_intersect(p1, p2_b, u1, u2_b, tol) );

	} else if (p2.length === 2) {

		var p1_mid = Math.ceil( p1.length / 2 ),
				p1_a = p1.slice( 0, p1_mid ),
				u1_a = u1.slice(0, p1_mid ),
				p1_b = p1.slice( p1_mid-1 )
				u1_b = p1.slice( p1_mid-1 );

		return 		 verb.eval.nurbs.parametric_polyline_polyline_bb_intersect(p2, p1_a, u2, p1_a, tol)
			.concat( verb.eval.nurbs.parametric_polyline_polyline_bb_intersect(p2, p1_b, u2, u1_b, tol) );

	} else {

		var p1_mid = Math.ceil( p1.length / 2 ),
				p1_a = p1.slice( 0, p1_mid ),
				u1_a = u1.slice(0, p1_mid ),
				p1_b = p1.slice( p1_mid-1 ),
				u1_b = p1.slice( p1_mid-1 ),
				p2_mid = Math.ceil( p2.length / 2 ),
				p2_a = p2.slice( 0, p2_mid ),
				u2_a = u2.slice(0, p2_mid ),
				p2_b = p2.slice( p2_mid-1 ),
				u2_b = p2.slice( p2_mid-1 );

		return 		 verb.eval.nurbs.parametric_polyline_polyline_bb_intersect(p1_a, p2_a, u1_a, p2_a, tol)
			.concat( verb.eval.nurbs.parametric_polyline_polyline_bb_intersect(p1_a, p2_b, u1_a, u2_b, tol) )
			.concat( verb.eval.nurbs.parametric_polyline_polyline_bb_intersect(p1_b, p2_a, u1_b, u2_a, tol) )
			.concat( verb.eval.nurbs.parametric_polyline_polyline_bb_intersect(p1_b, p2_b, u1_b, u2_b, tol) );

	}

	return [];

}

/**
 * Find the closest parameter on two rays, see http://geomalgorithms.com/a07-_distance.html
 *
 * @param {Array} first point on a
 * @param {Array} second point on a
 * @param {Array} first point on b
 * @param {Array} second point on b
 * @param {Number} tolerance for the intersection
 * @return {Array} a 2d array specifying the intersections on u params of intersections on curve 1 and cruve 2
 * @api public
 */

verb.eval.geom.intersect_segments = function( a0, a1, b0, b1, tol ) {

	// get axis and length of segments
	var a1ma0 = numeric.sub(a1, a0),
			aN = Math.sqrt( numeric.dot(a1ma0, a1ma0) ),
			a = numeric.mul( 1/ aN, a1ma0 )
			b1mb0 = numeric.sub(b1, b0),
			bN = Math.sqrt( numeric.dot(b1mb0, b1mb0) ),
			a = numeric.mul( 1 / bN, a1ma0 )
			int_params = ray_ray_intersect(a0, a, b0, b);

	if ( int_params != null ) {

		var u1 = Math.min( Math.max( 0, int_params[0] / a ), 1.0),
				u2 = Math.min( Math.max( 0, int_params[1] / b ), 1.0),
				int_a = numeric.add( numeric.mul( u1, a1ma0 ), a0 ),
				int_b = numeric.add( numeric.mul( u2, b1mb0 ), b0 ),
				dist = numeric.norm2Squared( numeric.sub(int_a, int_b) );

		if (  dist < tolerance*tolerance ) {
			return [ [u1].concat(int_a), [u2].concat(int_b) ] ;
		} 

	}
	
	return null;

 }

/**
 * Find the closest point on a ray
 *
 * @param {Array} point to project
 * @param {Array} origin for ray
 * @param {Array} direction of ray 1, assumed normalized
 * @return {Array} [param, pt]
 * @api public
 */

verb.eval.geom.closest_point_on_ray = function( pt, o, r ) {

		var o2pt = numeric.sub(pt,o)
			, do2ptr = numeric.dot(o2pt, r)
			, proj = numeric.add(o, numeric.mul(do2ptr, r));

		return proj;

 }

/**
 * Find the closest parameter on two rays, see http://geomalgorithms.com/a07-_distance.html
 *
 * @param {Array} origin for ray 1
 * @param {Array} direction of ray 1, assumed normalized
 * @param {Array} origin for ray 1
 * @param {Array} direction of ray 1, assumed normalized
 * @return {Array} a 2d array specifying the intersections on u params of intersections on curve 1 and curve 2
 * @api public
 */

verb.eval.geom.intersect_rays = function( a0, a, b0, b ) {

   var dab = numeric.dot( a, b ),
		   dab0 = numeric.dot( a, b0 ),
		   daa0 = numeric.dot( a, a0 ),
		   dbb0 = numeric.dot( b, b0 ),
		   dba0 = numeric.dot( b, a0 ),
		   daa = numeric.dot( a, a ),
		   dbb = numeric.dot( b, b ),
		   div = daa*dbb - dab*dab;

   if ( Math.abs( div ) < verb.EPSILON ) { // parallel case
	   return null;
   }

   var num = dab * (dab0-daa0) - daa * (dbb0-dba0),
   		 w = num / div,
			 t = (dab0 - daa0 + w * dab)/daa;

		return [t, w];

 }


/**
 * Sample a NURBS curve assuming parameterization 0 to 1, corresponds to http://ariel.chronotext.org/dd/defigueiredo93adaptive.pdf
 *
 * @param {Number} integer degree
 * @param {Array} array of nondecreasing knot values 
 * @param {Array} 1d array of homogeneous control points, where each control point is an array of length (dim+1) and form (wi*pi, wi) 
 * @param {Number} integer number of samples
 * @return {Array} an dictionary of parameter - point pairs
 * @api public
 */

verb.eval.nurbs.rational_curve_regular_sample = function( degree, knot_vector, control_points, num_samples ) {

	return verb.eval.nurbs.rational_curve_regular_sample_range( degree, knot_vector, control_points, 0, 1.0, num_samples );

}

/**
 * Sample a NURBS curve assuming parameterization 0 to 1, corresponds to http://ariel.chronotext.org/dd/defigueiredo93adaptive.pdf
 *
 * @param {Number} integer degree
 * @param {Array} array of nondecreasing knot values 
 * @param {Array} 1d array of homogeneous control points, where each control point is an array of length (dim+1) and form (wi*pi, wi) 
 * @param {Number} start parameter for sampling
 * @param {Number} end parameter for sampling
 * @param {Number} integer number of samples
 * @return {Array} an dictionary of parameter - point pairs
 * @api public
 */

verb.eval.nurbs.rational_curve_regular_sample_range = function( degree, knot_vector, control_points, start_u, end_u, num_samples ) {

	if (num_samples < 1){
		num_samples = 2;
	}

	var p = [],
		span = (end_u - start_u) / (num_samples - 1),
		u = 0;

	for (var i = 0; i < num_samples; i++){

		u = start_u + span * i;
		p.push( [u].concat( verb.eval.nurbs.rational_curve_point(degree, knot_vector, control_points, u) ) );

	}

	return p;

}

/**
 * Sample a NURBS curve assuming parameterization 0 to 1, corresponds to http://ariel.chronotext.org/dd/defigueiredo93adaptive.pdf
 *
 * @param {Number} integer degree
 * @param {Array} array of nondecreasing knot values 
 * @param {Array} 2d array of homogeneous control points, where each control point is an array of length (dim+1) 
 									and form (wi*pi, wi) 
 * @param {Number} tolerance for the adaptive scheme
 * @return {Array} an array of dim + 1 length where the first element is the param where it was sampled and the remaining the pt
 * @api public
 */

verb.eval.nurbs.rational_curve_adaptive_sample = function( degree, knot_vector, control_points, tol ) {

	// if degree is 1, just return the dehomogenized control points
	if (degree === 1){
		return control_points.map( verb.eval.nurbs.dehomogenize );
	}

	return verb.eval.nurbs.rational_curve_adaptive_sample_range( degree, knot_vector, control_points, 0, 1.0, tol );

}

/**
 * Sample a NURBS curve at 3 points, facilitating adaptive sampling
 *
 * @param {Number} integer degree
 * @param {Array} array of nondecreasing knot values 
 * @param {Array} 2d array of homogeneous control points, where each control point is an array of length (dim+1) 
 									and form (wi*pi, wi) 
 * @param {Number} start parameter for sampling
 * @param {Number} end parameter for sampling
 * @return {Array} an array of dim + 1 length where the first element is the param where it was sampled and the remaining the pt
 * @api public
 */

verb.eval.nurbs.rational_curve_adaptive_sample_range = function( degree, knot_vector, control_points, start_u, end_u, tol ) {

	// sample curve at three pts
	var p1 = verb.eval.nurbs.rational_curve_point(degree, knot_vector, control_points, start_u),
		p3 = verb.eval.nurbs.rational_curve_point(degree, knot_vector, control_points, end_u),
		t = 0.45 + 0.1 * Math.random(),
		mid_u = start_u + (end_u - start_u) * t,
		p2 = verb.eval.nurbs.rational_curve_point(degree, knot_vector, control_points, mid_u);

		// the if three points are "flat", return the two end pts
		if ( verb.eval.nurbs.three_points_are_flat( p1, p2, p3, tol ) ) {

			return [ 	[start_u, p1[0], p1[1], p1[2]], 
								[ end_u, p3[0], p3[1], p3[2] ] ];

		} else {

			// recurse on the two halves
			var left_pts = verb.eval.nurbs.rational_curve_adaptive_sample_range( degree, knot_vector, control_points, start_u, mid_u, tol )
				, right_pts = verb.eval.nurbs.rational_curve_adaptive_sample_range( degree, knot_vector, control_points, mid_u, end_u, tol );

			// concatenate the two		
			return left_pts.slice(0, -1).concat(right_pts);

		}
}

/**
 * Determine if three points form a straight line within a given tolerance for their 2 * squared area
 *
 *          * p2
 *         / \
 *        /   \
 *       /     \ 
 *      /       \
 *  p1 * -------- * p3
 *
 * The area metric is 2 * the squared norm of the cross product of two edges, requiring no square roots and no divisions
 *
 * @param {Array} p1
 * @param {Array} p2
 * @param {Array} p3
 * @param {Number} The tolerance for whether the three points form a line
 * @return {Boolean} Whether the triangle passes the test
 * @api public
 */

verb.eval.nurbs.three_points_are_flat = function( p1_arr, p2_arr, p3_arr, tol ) {

	// convert to vectors, this is probably unnecessary
	var p1 = new verb.geom.Vector3( p1_arr ),
		p2 = new verb.geom.Vector3( p2_arr ),
		p3 = new verb.geom.Vector3( p3_arr );

	// find the area of the triangle wihout using a square root
	var norm = p2.minus( p1 ).cross( p3.minus( p1 ) ),
			area = norm.dot( norm );

	return area < tol;

}



/**
 * Insert a knot along a rational curve
 *
 * @param {Number} integer degree of surface in u direction
 * @param {Array} array of nondecreasing knot values in u direction
 * @param {Number} integer degree of surface in v direction
 * @param {Array} array of nondecreasing knot values in v direction
 * @param {Array} 3d array of control points, where rows are the u dir, and columns run along the positive v direction, 
 									and where each control point is an array of length (dim)  
 * @param {Number} u parameter at which to evaluate the derivatives
 * @param {Number} v parameter at which to evaluate the derivatives
 * @param {Array} 1d array of control point weights 
 * @return {Array} a point represented by an array of length (dim)
 * @api public
 */

verb.eval.nurbs.curve_knot_insert = function( degree, knots, control_points, u, s, r ) {

	// np is n for the initial curve
	// nq is n for the output curve with knots inserted
	// k is the span on which the knots are inserted
	// s is the initial multiplicity of the point
	// r is the number of times to insert the knot
	// control_points is initial set of control points

	var dim = control_points[0].length
		, np = knots.length - degree - 2
		, num_pts = control_points.length
		, k = verb.eval.nurbs.knot_span( degree, u, knots )
		, mp = np + degree + 1
		, nq = np + r
		, num_pts_post = num_pts + r    
		, Rw = new Array( degree + 1 )  
		, knots_post = new Array( knots.length + r ) 
		, control_points_post = new Array( num_pts_post ) 
		, i = 0;

	// new knot vector
	for (i = 0; i <= k; i++) {
		knots_post[i] = knots[i];
	}
	
	for (i = 1; i <= r; i++) {
		knots_post[k+i] = u; 
	}

	for (i = k+1; i <= mp; i++)
	{
		knots_post[i+r] = knots[i];
	}

	// control point generation
	for (i = 0; i <= k-degree; i++)
	{
		control_points_post[i] = control_points[i]; 
	}

	for (i = k-s; i <= np; i++)
	{
		control_points_post[i+r] = control_points[i];
	}

	for (i = 0; i <= degree-s; i++)
	{
		Rw[i] = control_points[k-degree+1];
	}

	var L = 0
		, alpha = 0;

	// insert knot r times
	for (var j = 1; j <= r; j++) {

		L = k-degree+j;

		for (i = 0; i <= degree-j-s; i++) {

			alpha = ( u - knots[L+i] ) / ( knots[i+k+1] - knots[L+i] );
			Rw[i] = numeric.add( numeric.mul( alpha, Rw[i+1] ), numeric.mul( (1.0 - alpha), Rw[i]) );

		}

		control_points_post[ L ] = Rw[0];
		control_points_post[k+r-j-s] = Rw[degree-j-s];

	}

	// not so confident about this part
	for (i = L+1; i < k-s; i++) // set remaining control points
	{
		control_points_post[i] = Rw[ i - L ];
	}

	return [knots_post, control_points_post];

}

/**
 * Compute the derivatives at a point on a NURBS surface
 *
 * @param {Number} integer degree of surface in u direction
 * @param {Array} array of nondecreasing knot values in u direction
 * @param {Number} integer degree of surface in v direction
 * @param {Array} array of nondecreasing knot values in v direction
 * @param {Array} 3d array of control points, where rows are the u dir, and columns run along the positive v direction, 
 									and where each control point is an array of length (dim)  
 * @param {Number} u parameter at which to evaluate the derivatives
 * @param {Number} v parameter at which to evaluate the derivatives
 * @param {Array} 1d array of control point weights 
 * @return {Array} a point represented by an array of length (dim)
 * @api public
 */

verb.eval.nurbs.rational_surface_derivs = function( degree_u, knot_vector_u, degree_v, knot_vector_v, homo_control_points, num_derivs, u, v) {

	var SKL_homo = verb.eval.nurbs.surface_derivs( degree_u, knot_vector_u, degree_v, knot_vector_v, homo_control_points, num_derivs, u, v )
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

/**
 * Compute a point on a NURBS surface
 *
 * @param {Number} integer degree of surface in u direction
 * @param {Array} array of nondecreasing knot values in u direction
 * @param {Number} integer degree of surface in v direction
 * @param {Array} array of nondecreasing knot values in v direction
 * @param {Array} 3d array of control points (tensor), top to bottom is increasing u direction, left to right is increasing v direction,
 									and where each control point is an array of length (dim+1)
 * @param {Number} u parameter at which to evaluate the surface point
 * @param {Number} v parameter at which to evaluate the surface point
 * @return {Array} a point represented by an array of length (dim)
 * @api public
 */

verb.eval.nurbs.rational_surface_point = function( degree_u, knot_vector_u,  degree_v, knot_vector_v, homo_control_points, u, v ) {

	return verb.eval.nurbs.dehomogenize( verb.eval.nurbs.surface_point( degree_u, knot_vector_u,  degree_v, knot_vector_v, homo_control_points, u, v ) );

};

/**
 * Determine the derivatives of a NURBS curve at a given parameter
 *
 * @param {Number} integer degree of curve
 * @param {Array} array of nondecreasing knot values
 * @param {Array} 2d array of homogeneous control points, where each control point is an array of length (dim+1) and form (wi*pi, wi)
 * @param {Number} parameter on the curve at which the point is to be evaluated
 * @return {Array} a point represented by an array of length (dim)
 * @api public
 */

verb.eval.nurbs.rational_curve_derivs = function( degree, knot_vector, homo_control_points, u, num_derivs ) {

	// compute the derivatives of the control points
	// separate derivative array into two
	var ders = verb.eval.nurbs.separate_homo_derivs_1d( verb.eval.nurbs.curve_derivs( degree, knot_vector, homo_control_points, u, num_derivs ) )
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

/**
 * Separate the array of derivatives into the A(u) component and w(u), i.e. the weight and everything else without dehomogenization
 *
 * @param {Array} 1d array of homogeneous derivatives
 * @return {Array} an array with Aders and wders as element 0 and 1, respectively
 * @api public
 */

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

/**
 * Separate the array of derivatives into the A(u) component and w(u), i.e. the weight and everything else without dehomogenization
 *
 * @param {Array} 2d array of homogeneous derivatives
 * @return {Array} an array with Aders and wders as element 0 and 1, respectively
 * @api public
 */

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


/**
 * Compute a point on a NURBS curve
 *
 * @param {Number} integer degree of curve
 * @param {Array} array of nondecreasing knot values
 * @param {Array} 2d array of homogeneous control points, where each control point is an array of length (dim+1) 
 									and form (wi*pi, wi)
 * @param {Number} parameter on the curve at which the point is to be evaluated
 * @return {Array} a point represented by an array of length (dim)
 * @api public
 */

verb.eval.nurbs.rational_curve_point = function( degree, knot_vector, homo_control_points, u) {

	return verb.eval.nurbs.dehomogenize( verb.eval.nurbs.curve_point( degree, knot_vector, homo_control_points, u) );

};

/**
 * Dehomogenize a point 
 *
 * @param {Array} a point represented by an array (wi*pi, wi) with length (dim+1)
 * @return {Array} a point represented by an array pi with length (dim)
 * @api public
 */

verb.eval.nurbs.dehomogenize = function( homo_point ) {

	var dim = homo_point.length
		, point = []
		, wt = homo_point[dim-1];

	for (var i = 0; i < homo_point.length-1;i++)
		point.push( homo_point[i] / wt );

	return point;

};

/**
 * Transform a 1d array of points into their homogeneous equivalents
 *
 * @param {Array} 1d array of control points, (actually a 2d array of size (m x dim) )
 * @param {Array} array of control point weights, the same size as the array of control points (m x 1)
 * @return {Array} 1d array of control points where each point is (wi*pi, wi) where wi 
 									 is the ith control point weight and pi is the ith control point, 
 									 hence the dimension of the point is dim + 1
 * @api public
 */

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

/**
 * Transform a 2d array of points into their homogeneous equivalents
 *
 * @param {Array} 2d array of control points, (actually a 3d array of size m x n x dim)
 * @param {Array} array of control point weights, the same size as the control points array (m x n x 1)
 * @return {Array} 1d array of control points where each point is (wi*pi, wi) where wi 
 									 is the ith control point weight and pi is the ith control point, the size is 
 									 (m x n x dim+1)
 * @api public
 */

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

/**
 * Compute the derivatives on a non-uniform, non-rational B spline surface
 *
 * @param {Number} integer degree of surface in u direction
 * @param {Array} array of nondecreasing knot values in u direction
 * @param {Number} integer degree of surface in v direction
 * @param {Array} array of nondecreasing knot values in v direction
 * @param {Array} 3d array of control points, where rows are the u dir, and columns run along the positive v direction, 
 									and where each control point is an array of length (dim)  
 * @param {Number} u parameter at which to evaluate the derivatives
 * @param {Number} v parameter at which to evaluate the derivatives
 * @return {Array} a point represented by an array of length (dim)
 * @api public
 */

verb.eval.nurbs.surface_derivs = function( degree_u, knot_vector_u, degree_v, knot_vector_v, control_points, num_derivatives, u, v ) {

	var n = knot_vector_u.length - degree_u - 2
		, m = knot_vector_v.length - degree_v - 2;

	return verb.eval.nurbs.surface_derivs_given_n_m( n, degree_u, knot_vector_u, m, degree_v, knot_vector_v, control_points, num_derivatives, u, v );

};

/**
 * Compute the derivatives on a non-uniform, non-rational B spline surface 
 * (corresponds to algorithm 3.6 from The NURBS book, Piegl & Tiller 2nd edition)
 *
 * @param {Number} integer number of basis functions in u dir - 1 = knot_vector_u.length - degree_u - 2
 * @param {Number} integer degree of surface in u direction
 * @param {Array} array of nondecreasing knot values in u direction
 * @param {Number} integer number of basis functions in v dir - 1 = knot_vector_u.length - degree_u - 2
 * @param {Number} integer degree of surface in v direction
 * @param {Array} array of nondecreasing knot values in v direction
 * @param {Array} 3d array of control points, where rows are the u dir, and columns run along the positive v direction, 
 									and where each control point is an array of length (dim)  
 * @param {Number} u parameter at which to evaluate the derivatives
 * @param {Number} v parameter at which to evaluate the derivatives
 * @return {Array} a point represented by an array of length (dim)
 * @api public
 */

verb.eval.nurbs.surface_derivs_given_n_m = function( n, degree_u, knot_vector_u, m, degree_v, knot_vector_v, control_points, num_derivatives, u, v ) {

	if ( verb.eval.nurbs.are_valid_relations(degree_u, control_points.length, knot_vector_u.length ) === false ||
		verb.eval.nurbs.are_valid_relations(degree_v, control_points[0].length, knot_vector_v.length ) === false ) {
		console.error('Invalid relations between control points, knot vector, and n');
		return null;
	}

	var dim = control_points[0][0].length
		, du = Math.min(num_derivatives, degree_u)
		, dv = Math.min(num_derivatives, degree_v)
		, SKL = verb.eval.nurbs.zeros_3d( du+1, dv+1, dim )
		, knot_span_index_u = verb.eval.nurbs.knot_span_given_n( n, degree_u, u, knot_vector_u )
		, knot_span_index_v = verb.eval.nurbs.knot_span_given_n( m, degree_v, v, knot_vector_v )
		, uders = verb.eval.nurbs.deriv_basis_functions_given_n_i( knot_span_index_u, u, degree_u, n, knot_vector_u )  
		, vders = verb.eval.nurbs.deriv_basis_functions_given_n_i( knot_span_index_v, v, degree_v, m, knot_vector_v )
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

/**
 * Compute a point on a non-uniform, non-rational B-spline surface
 *
 * @param {Number} integer degree of surface in u direction
 * @param {Array} array of nondecreasing knot values in u direction
 * @param {Number} integer degree of surface in v direction
 * @param {Array} array of nondecreasing knot values in v direction
 * @param {Array} 3d array of control points, where rows are the u dir, and columns run along the positive v direction, 
 									and where each control point is an array of length (dim)  
 * @param {Number} u parameter at which to evaluate the surface point
 * @param {Number} v parameter at which to evaluate the surface point
 * @return {Array} a point represented by an array of length (dim)
 * @api public
 */

verb.eval.nurbs.surface_point = function( degree_u, knot_vector_u, degree_v, knot_vector_v, control_points, u, v) {

	var n = knot_vector_u.length - degree_u - 2
		, m = knot_vector_v.length - degree_v - 2;

	return 	verb.eval.nurbs.surface_point_given_n_m( n, degree_u, knot_vector_u, m, degree_v, knot_vector_v, control_points, u, v );

}

/**
 * Compute a point on a non-uniform, non-rational B spline surface
 * (corresponds to algorithm 3.5 from The NURBS book, Piegl & Tiller 2nd edition)
 *
 * @param {Number} integer number of basis functions in u dir - 1 = knot_vector_u.length - degree_u - 2
 * @param {Number} integer degree of surface in u direction
 * @param {Array} array of nondecreasing knot values in u direction
 * @param {Number} integer degree of surface in v direction
 * @param {Array} array of nondecreasing knot values in v direction
 * @param {Array} 3d array of control points, where rows are the u dir, and columns run along the positive v direction, 
 									and where each control point is an array of length (dim)  
 * @param {Number} u parameter at which to evaluate the surface point
 * @param {Number} v parameter at which to evaluate the surface point
 * @return {Array} a point represented by an array of length (dim)
 * @api public
 */

verb.eval.nurbs.surface_point_given_n_m = function( n, degree_u, knot_vector_u, m, degree_v, knot_vector_v, control_points, u, v ) {

	if ( verb.eval.nurbs.are_valid_relations(degree_u, control_points.length, knot_vector_u.length ) === false ||
		verb.eval.nurbs.are_valid_relations(degree_v, control_points[0].length, knot_vector_v.length ) === false ) {
		console.error('Invalid relations between control points, knot vector, and n');
		return null;
	}

	var dim = control_points[0][0].length
		, knot_span_index_u = verb.eval.nurbs.knot_span_given_n( n, degree_u, u, knot_vector_u )
		, knot_span_index_v = verb.eval.nurbs.knot_span_given_n( m, degree_v, v, knot_vector_v )
		, u_basis_vals = verb.eval.nurbs.basis_functions_given_knot_span_index( knot_span_index_u, u, degree_u, knot_vector_u )
		, v_basis_vals = verb.eval.nurbs.basis_functions_given_knot_span_index( knot_span_index_v, v, degree_v, knot_vector_v )
		, uind = knot_span_index_u - degree_u
		, vind = knot_span_index_v
		, position = verb.eval.nurbs.zeros_1d( dim )
		, temp = verb.eval.nurbs.zeros_1d( dim )
		, l = 0
		, k = 0;

	for (l = 0; l <= degree_v; l++) {	

		temp = verb.eval.nurbs.zeros_1d( dim );
		vind = knot_span_index_v - degree_v + l;

		for (k = 0; k <= degree_u; k++) {	
			temp = numeric.add( temp, numeric.mul( u_basis_vals[k], control_points[uind+k][vind]) );
		}

		position = numeric.add( position, numeric.mul(v_basis_vals[l], temp) );
	}

	return position;
}

/**
 * Determine the derivatives of a non-uniform, non-rational B-spline curve at a given parameter
 *
 * @param {Number} integer degree of curve
 * @param {Array} array of nondecreasing knot values
 * @param {Array} 2d array of control points, where each control point is an array of length (dim)  
 * @param {Number} parameter on the curve at which the point is to be evaluated
 * @return {Array} a point represented by an array of length (dim)
 * @api public
 */

verb.eval.nurbs.curve_derivs = function( degree, knot_vector, control_points, u, num_derivs ) {

	var n = knot_vector.length - degree - 2;
	return verb.eval.nurbs.curve_derivs_given_n( n, degree, knot_vector, control_points, u, num_derivs );

}		

/**
 * Determine the derivatives of a non-uniform, non-rational B-spline curve at a given parameter
 * (corresponds to algorithm 3.1 from The NURBS book, Piegl & Tiller 2nd edition)
 *
 * @param {Number} integer number of basis functions - 1 = knot_vector.length - degree - 2
 * @param {Number} integer degree of curve
 * @param {Array} array of nondecreasing knot values
 * @param {Array} 2d array of control points, where each control point is an array of length (dim)  
 * @param {Number} parameter on the curve at which the point is to be evaluated
 * @return {Array} a point represented by an array of length (dim)
 * @api public
 */

verb.eval.nurbs.curve_derivs_given_n = function( n, degree, knot_vector, control_points, u, num_derivatives ) {

	if ( verb.eval.nurbs.are_valid_relations(degree, control_points.length, knot_vector.length ) === false ) {
		console.error('Invalid relations between control points, knot vector, and n');
		return null;
	}

	var dim = control_points[0].length
		, du = Math.min(num_derivatives, degree)
		, CK = verb.eval.nurbs.zeros_2d( du+1, dim )
		, knot_span_index = verb.eval.nurbs.knot_span_given_n( n, degree, u, knot_vector )
		, nders = verb.eval.nurbs.deriv_basis_functions_given_n_i( knot_span_index, u, degree, du, knot_vector )
		, k = 0
		, j = 0;

	for (k = 0; k <= du; k++) {	
		for (j = 0; j <= degree; j++) {
			CK[k] = numeric.add( CK[k], numeric.mul( nders[k][j], control_points[ knot_span_index - degree + j ] ) )
		}
	}
	return CK;

}		

/**
 * Confirm the relations between degree (p), number of control points(n+1), and the number of knots (m+1)
 * via The NURBS Book (section 3.2, Second Edition)
 *
 * @param {Number} integer degree
 * @param {Number} integer number of control points
 * @param {Number} integer length of the knot vector (including duplicate knots)
 * @return {Boolean} whether the values are correct
 * @api public
 */

verb.eval.nurbs.are_valid_relations = function( degree, num_control_points, knot_vector_length ) {

	return ( num_control_points + degree + 1 - knot_vector_length ) === 0 ? true : false;

}		

/**
 * Compute a point on a non-uniform, non-rational b-spline curve
 *
 * @param {Number} integer degree of curve
 * @param {Array} array of nondecreasing knot values
 * @param {Array} 2d array of control points, where each control point is an array of length (dim)  
 * @param {Number} parameter on the curve at which the point is to be evaluated
 * @return {Array} a point represented by an array of length (dim)
 * @api public
 */

verb.eval.nurbs.curve_point = function( degree, knot_vector, control_points, u) {

	var n = knot_vector.length - degree - 2;
	return verb.eval.nurbs.curve_point_given_n( n, degree, knot_vector, control_points, u);

}		

/**
 * Compute a point on a non-uniform, non-rational b-spline curve
 * (corresponds to algorithm 3.1 from The NURBS book, Piegl & Tiller 2nd edition)
 *
 * @param {Number} integer number of basis functions - 1 = knot_vector.length - degree - 2
 * @param {Number} integer degree of curve
 * @param {Array} array of nondecreasing knot values
 * @param {Array} 2d array of control points, where each control point is an array of length (dim)  
 * @param {Number} parameter on the curve at which the point is to be evaluated
 * @return {Array} a point represented by an array of length (dim)
 * @api public
 */

verb.eval.nurbs.curve_point_given_n = function( n, degree, knot_vector, control_points, u) {

	if ( verb.eval.nurbs.are_valid_relations(degree, control_points.length, knot_vector.length ) === false ) {
		console.error('Invalid relations between control points, knot vector, and n');
		return null;
	}

	var knot_span_index = verb.eval.nurbs.knot_span_given_n( n, degree, u, knot_vector )
		, basis_values = verb.eval.nurbs.basis_functions_given_knot_span_index( knot_span_index, u, degree, knot_vector ) 
		, position = verb.eval.nurbs.zeros_1d( control_points[0].length );

		for (var j = 0; j <= degree; j++ )	{
			position = numeric.add( position, numeric.mul( basis_values[j], control_points[ knot_span_index - degree + j ] ) );
		}

		return position;
}	

/**
 * Generate a 1d array of zeros
 *
 * @param {Number} integer number of rows
 * @return {Array} 1d array of given size
 * @api public
 */

verb.eval.nurbs.zeros_1d = function(size) {
  size = size > 0 ? size : 0;

  var arr = [];

  while(size--) {
    arr.push(0);
  }

  return arr;
}

/**
 * Generate a 2D array of zeros
 *
 * @param {Number} integer number of rows
 * @param {Number} integer number of columns
 * @return {Array} 2d array of given size
 * @api public
 */

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

/**
 * Generate a 3D array of zeros
 *
 * @param {Number} integer number of rows
 * @param {Number} integer number of columns
 * @param {Number} integer depth (i.e. dimension of arrays in 2d matrix)
 * @return {Array} 3d array of given size
 * @api public
 */

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

/**
 * Compute the non-vanishing basis functions and their derivatives
 *
 * @param {Number} float parameter
 * @param {Number} integer degree
 * @param {Array} array of nondecreasing knot values
 * @return {Array} 2d array of basis and derivative values of size (n+1, p+1) The nth row is the nth derivative and the first row is made up of the basis function values.
 * @api public
 */

verb.eval.nurbs.deriv_basis_functions = function( u, degree, knot_vector )
{
	var knot_span_index = verb.eval.nurbs.knot_span( degree, u, knot_vector )
		, m = knot_vector.length - 1
		, n = m - degree - 1;

	return verb.eval.nurbs.deriv_basis_functions_given_n_i( knot_span_index, u, degree, n, knot_vector );
}	

/**
 * Compute the non-vanishing basis functions and their derivatives
 * (corresponds to algorithm 2.3 from The NURBS book, Piegl & Tiller 2nd edition)
 *
 * @param {Number} integer knot span index
 * @param {Number} float parameter
 * @param {Number} integer degree
 * @param {Number} integer number of basis functions - 1 = knot_vector.length - degree - 2
 * @param {Array} array of nondecreasing knot values
 * @return {Array} 2d array of basis and derivative values of size (n+1, p+1) The nth row is the nth derivative and the first row is made up of the basis function values.
 * @api public
 */

verb.eval.nurbs.deriv_basis_functions_given_n_i = function( knot_span_index, u, p, n, knot_vector )
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

		left[j] = u - knot_vector[knot_span_index+1-j];
		right[j] = knot_vector[knot_span_index+j] - u;
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

/**
 * Compute the non-vanishing basis functions
 *
 * @param {Number} float parameter
 * @param {Number} integer degree of function
 * @param {Array} array of nondecreasing knot values
 * @return {Array} list of non-vanishing basis functions
 * @api public
 */

verb.eval.nurbs.basis_functions = function( u, degree, knot_vector )
{
	var knot_span_index = verb.eval.nurbs.knot_span(u, degree, knot_vector);
	return verb.eval.nurbs.basis_functions_given_knot_span_index( knot_span_index, u, degree, knot_vector );
};

/**
 * Compute the non-vanishing basis functions
 * (corresponds to algorithm 2.2 from The NURBS book, Piegl & Tiller 2nd edition)
 *
 * @param {Number} integer knot span index
 * @param {Number} float parameter
 * @param {Number} integer degree of function
 * @param {Array} array of nondecreasing knot values
 * @return {Array} list of non-vanishing basis functions
 * @api public
 */

verb.eval.nurbs.basis_functions_given_knot_span_index = function( knot_span_index, u, degree, knot_vector )
{
	var basis_functions = new Array( degree + 1 )
		, left = new Array( degree + 1 )
		, right = new Array( degree + 1 )
		, saved = 0
		, temp = 0;

	basis_functions[0] = 1.0;

	for(var j = 1; j <= degree; j++) {

		left[j] = u - knot_vector[knot_span_index+1-j];
		right[j] = knot_vector[knot_span_index+j] - u;
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


/**
 * Find the span on the knot vector without supplying n
 *
 * @param {Number} integer degree of function
 * @param {Number} float parameter
 * @param {Array} array of nondecreasing knot values
 * @return {Number} the index of the knot span
 * @api public
 */

verb.eval.nurbs.knot_span = function( degree, u, knot_vector )
{

	var m = knot_vector.length - 1
		, n = m - degree - 1;

	return verb.eval.nurbs.knot_span_given_n(n, degree, u, knot_vector);

};

/**
 * Find the span on the knot vector knot_vector of the given parameter
 * (corresponds to algorithm 2.1 from The NURBS book, Piegl & Tiller 2nd edition)
 *
 * @param {Number} integer number of basis functions - 1 = knot_vector.length - degree - 2
 * @param {Number} integer degree of function
 * @param {Number} float parameter
 * @param {Array} array of nondecreasing knot values
 * @return {Number} the index of the knot span
 * @api public
 */

verb.eval.nurbs.knot_span_given_n = function( n, degree, u, knot_vector )
{
	if ( u >= knot_vector[n+1] )
	{
		return n;
	}

	if ( u < knot_vector[degree] )
	{
		return degree;
	}

	var low = degree
		, high = n+1
		, mid = Math.floor( (low + high) / 2 );

	while( u < knot_vector[ mid ] || u >= knot_vector[ mid + 1 ] )
	{
		if ( u < knot_vector[ mid ] )
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
