/**
 * Constructor for a NurbsCurve
 *
 * @param {Number} The degree of the curve
 * @param {Array} Array of arrays representing the control points
 * @param {Array} Array of numbers representing the control point weights
 * @param {Array} Array of numbers representing the knot structure
 * @api public
 */

verb.geom.NurbsCurve = function( degree, controlPoints, weights, knots ) {

	this.setAll({
		"controlPoints": controlPoints,
		"weights": weights,
		"knots": knots ? knots.slice(0) : [],
		"degree": degree
	});

	verb.geom.NurbsGeometry.call(this);

}.inherits( verb.geom.NurbsGeometry );


/**
 * Obtain the homogeneous representation of the control points
 *
 * @api public
 */

verb.geom.NurbsCurve.prototype.homogenize = function(){

	return verb.eval.nurbs.homogenize_1d( this.get('controlPoints'), this.get('weights') );

};

/**
 * If this is a subtype of the NurbsCurve, this method will update the Nurbs representation
 * of the curve from those parameters.  This destroys any manual changes to the Nurbs rep.
 *
 * @api public
 */

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

/**
 * Sample a point at the given parameter
 * @param {Number} The parameter to sample the curve
 *
 * @returns {Array} The position at the given parameter
 * @api public
 */

verb.geom.NurbsCurve.prototype.pointSync = function( u ) {

	return this.nurbsEngine.eval_sync( 'rational_curve_point', [ this.get('degree'), this.get('knots'), this.homogenize(), u ] );

};

/**
 * Sample a point at the given parameter asynchronously
 * @param {Number} The parameter to sample the curve
 * @param {Function} A callback to call when complete
 *
 * @api public
 */

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

