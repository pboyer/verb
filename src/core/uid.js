if ( typeof exports != 'object' || exports === undefined )  // browser context
{
	var VERB = window.VERB
		, numeric = window.numeric
		, labor = window.labor;
}
else // node.js context
{
	var VERB = module.exports = require('./verb')
		, numeric = require('numeric')
		, _ = require('underscore')
		, labor = require('labor');
}

(function( VERB, numeric, pool ) {

	VERB.nurbs_engine = new VERB.core.Engine();

	// engine nurbs handles nurbs eval requests
	// it also acknowledges whether there are web workers available 
	// in the broswer, if not, it defaults to blocking evaluation
	// also handles situations where the server is unavailable

	VERB.core.Engine = function(options) {

		// private properties
		var _use_pool = ( typeof Worker === 'function' ) && ( options.use_pool || options.use_pool === undefined );
		var _num_threads = options.num_workers || 2;
		var _tolerance = options.tolerance || 1e-4;
		var _url = options.url || 'verb_nurbs_eval.js';
		var _error_handler = options.error_handler || ( function( message ) { console.warn( message ); } );
		var _pool = undefined;

		// private methods
		var init_pool = function() {

			try {
				_pool = new labor.Pool(_url, _num_threads );
				_pool.start();
			} catch {
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
			if ( _use_pool && ( _pool || ( _pool === undefined && init_pool() ) ) )
			{
				pool.addWork( func, arguments_array, callback );
			}	else {
				var that = this;
				_.defer( function() { callback( that.eval_sync(func, arguments_array ) ) } );
			}
		}

		this.eval_sync = function(func, arguments_array) {
			return nurbs[func].apply(null, arguments_array);
		}

		this.set_tolerance = function(tolerance) {
			// TODO: implement message to worker pool
			_tolerance = tolerance;
		}

		this.set_use_pool = function( use_pool ) {

			if ( use_pool && _pool === undefined && init_pool()  {
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


	/* Douglas Crockford's  solution to object instantiation */
	if (typeof Object.create !== 'function') {
	    Object.create = function (o) {
	      function F() {}
	      F.prototype = o;
	      return new F();
	    };
	}

	// Douglas Crockford's inherits function for pseudoclassical inheritance
	Function.method('inherits', function(Parent) {
		this.prototype = new Parent();
		return this;
	});

	

	/**
	 * BoundngBox Constructor
	 *
	 * @param {Array} Points to add, if desired.  Otherwise, will not be initialized until add is called.
	 * @return {Object} Newly formed BoundingBox object
	 * @api public
	 */	

	VERB.geom.BoundingBox = function() {
		this.initialized = false;
		this.min = [0,0,0];
		this.max = [0,0,0];

	 	var pt_args = Array.prototype.slice.call( arguments, 0);
	 	this.add_points_sync(pt_args);
	}	

	/**
	 * Asynchronously add an array of points to the bounding box
	 *
	 * @param {Array} An array of length-3 array of numbers 
	 * @param {Function} Function to call when all of the points in array have been added.  The only parameter to this
	 * callback is this bounding box.
	 * @api public
	 */

	VERB.geom.BoundingBox.prototype.add_points = function( point_array, callback ) 
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

	VERB.geom.BoundingBox.prototype.add_points_sync = function( point_array ) 
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

	VERB.geom.BoundingBox.prototype.add = function( point ) 
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

	VERB.geom.BoundingBox.prototype.contains = function(point) {

		if ( !this.initialized )
		{
			return false;
		}

		return this.intersects( new VERB.geom.BoundingBox(point) );

	}

	/**
	 * Defines the tolerance for bounding box operations
	 *
	 * @api public
	 */

	VERB.geom.BoundingBox.prototype.TOLERANCE = 1e-4;

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

	VERB.geom.BoundingBox.prototype.intervals_overlap = function( a1, a2, b1, b2 ) {

		var tol = VERB.geom.BoundingBox.prototype.TOLERANCE
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

	VERB.geom.BoundingBox.prototype.intersects = function( bb ) {

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
	 * Clear the bounding box, leaving it in an uninitialized state.  Call add, add_points in order to 
	 * initialize
	 *
	 * @return {Object} this BoundingBox for chaining
	 * @api public
	 */

	VERB.geom.BoundingBox.prototype.clear = function( bb ) {

		this.initialized = false;
		return this;

	};

	/**
	 * Compute the boolean intersection of this with another axis-aligned bounding box.  If the two
	 * bounding boxes do not intersect, returns null.
	 *
	 * @param {Object} BoundingBox to intersect with
	 * @return {Object} The bounding box formed by the intersection or null if there is no intersection.
	 * @api public
	 */

	VERB.geom.BoundingBox.prototype.intersect = function( bb ) {

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

		return new VERB.geom.BoundingBox(min_bb, max_bb);

	}

	/**
	 * Generate a unique id.
	 *
	 * @return {Number} The id
	 * @api public
	 */

	VERB.core.uid = (function(){
		var id = 0;
		return function() {
			return id++;
		};
	})();

	/**
	 * Geometry Constructor.
	 *
	 * @return {Object} Newly formed Geometry object
	 * @api public
	 */	

	VERB.geom.Geometry = function() { 

		var id = VERB.core.uid();
		this.uid = function() {
			return id;
		};

	};


	VERB.geom.NURBSGeometry = function() {

		VERB.geom.Geometry.call(this);

	}.inherits(VERB.geom.Geometry);

	VERB.geom.NURBSGeometry.prototype.nurbs_engine = VERB.nurbs_engine;



	VERB.geom.NurbsCurve = function( degree, control_points, weights, knots ) {

		VERB.geom.NURBSGeometry.call(this);

		// check for valid relations
		if ( !VERB.geom.are_valid_relations( degree, control_points.length, knots.length ) ) 
		{
			console.warn( "Invalid relations were used to instantiate a NurbsCurve - using defaults.")
			var _control_points = [];
			var _homo_control_points = [];
			var _knots = [];
			var _weights = [];
			var _degree = 2;
		}
		else
		{
			// private members
			var _control_points = control_points.slice(0);
			var _homo_control_points = VERB.geom.homogenize_1d( control_points, weights );
			var _knots = knots.slice(0);
			var _weights = weights.slice(0);
			var _degree = degree;
		}

		// PRIVILEGED METHODS
		this.set_control_point = function( u_index, value ) {
			_control_points[u_index] = value;
			_homo_control_points[u_index] = value * _weights[u_index];
			return this;
		};

		this.set_weight = function( u_index, value ) {
			_weights[u_index] = value;
			set_control_point( u_index, _control_points[u_index] );
			return this;
		};

		this.set_knot = function( u_index, value ) {
			_knots[u_index] = value;
			return this;
		};

		this.point_sync = function( u ) {
			return this.nurbs_engine.eval_sync( 'rational_curve_point', _degree, _knot_vector, _homo_control_points, u ] );
		};

		this.derivs_sync = function( u, num_derivs ) {
			return this.nurbs_engine.eval_sync( 'rational_curve_derivs', [ _degree, _knot_vector, _homo_control_points, u, num_derivs] );
		};

		this.point = function( u, callback ) {
			nurbs_engine.eval( 'rational_curve_point', [ _degree, _knot_vector, _homo_control_points, u ], callback ); 
		};

		this.derivs = function( u, num_derivs, callback ) {
			this.nurbs_engine.eval( 'rational_curve_derivs', [ _degree, _knot_vector, _homo_control_points, u, num_derivs  ], callback ); 
		};

		// this.points = function( num_samples, callback ) {
		// 	// TODO: here we would use the worker to generate all of the points
		// 	// wait for callback
		// };

	}.inherits(VERB.geom.NURBSGeometry);


	VERB.geom.NurbsSurface = function( degree, control_points, weights, knots ) {

		VERB.geom.NURBSGeometry.call(this);

		// private members
		var _control_points = control_points.slice(0);
		var _knots = knots.slice(0);
		var _weights = weights.slice(0);
		var _degree = degree;

		this.set_control_point = function(u_index, v_index, value) {

		};

		this.set_weight = function(u_index, v_index, value) {

		};

		this.set_control_point = function(u_index, v_index, value) {

		};

		// privileged methods
		this.point = function(u, v, callback) {

		};

		this.derivs = function(u, v, num_u, num_v, callback) {

		};

	}.inherits( VERB.geom.NURBSGeometry );


})( VERB, numeric );
