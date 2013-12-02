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

	verb.geom.NurbsGeometry.call(this);

	this.setAll({
		"controlPoints": controlPoints,
		"weights": weights,
		"knots": knots ? knots.slice(0) : [],
		"degree": degree
	});

}.inherits( verb.geom.NurbsGeometry );


/**
 * Sample a point at the given parameter 
 *
 * @param {Number} The parameter to sample the curve
 * @param {Function} Optional callback to do it async
 *
 * @return {Array} An array if called synchronously, otherwise nothing
 * @api public
 */

verb.geom.NurbsCurve.prototype.point = function( u, callback ) {

	if (callback){
		this.nurbsEngine.eval( 'rational_curve_point', [ this.get('degree'), this.get('knots'), this.homogenize(),  u ], callback ); 
		return;
	}

	return this.nurbsEngine.eval_sync( 'rational_curve_point', [ this.get('degree'), this.get('knots'), this.homogenize(), u ] );

};

/**
 * Get derivatives at a given parameter
 *
 * @param {Number} The parameter to sample the curve
 * @param {Number} The number of derivatives to obtain
 * @param {Number} The callback, if you want this async
 *
 * @return {Array} An array if called synchronously, otherwise nothing
 * @api public
 */

verb.geom.NurbsCurve.prototype.derivatives = function( u, num_derivs, callback ) {

	if (callback){
		this.nurbsEngine.eval( 'rational_curve_derivs', [ this.get('degree'), this.get('knots'), this.homogenize(),  u, num_derivs  ], callback ); 
		return;
	}

	return this.nurbsEngine.eval_sync( 'rational_curve_derivs', [ this.get('degree'), this.get('knots'), this.homogenize(),  u, num_derivs] );

};

/**
 * Tesselate a curve at a given tolerance
 *
 * @param {Number} The parameter to sample the curve
 * @param {Number} The number of derivatives to obtain
 * @param {Number} The callback, if you want this async
 *
 * @return {Array} An array if called synchronously, otherwise nothing
 * @api public
 */

verb.geom.NurbsCurve.prototype.tesselate = function(callback){

	if (callback){
		return this.nurbsEngine.eval( 'rational_curve_adaptive_sample', [ this.get('degree'), this.get('knots'), this.homogenize(), verb.TOLERANCE ], callback ); 
	}

	return this.nurbsEngine.eval_sync( 'rational_curve_adaptive_sample', [ this.get('degree'), this.get('knots'), this.homogenize(), verb.TOLERANCE ] ); 

};

/**
 * Transform a curve with the given matrix.
 *
 * @param {Array} 4d array representing the transform
 *
 * @return {Array} An array if called synchronously, otherwise nothing
 * @api public
 */

verb.geom.NurbsCurve.prototype.transform = function( mat ){

	var pts = this.get("controlPoints");

	for (var i = 0; i < pts.length; i++){
		var homoPt = pts[1].push(1);
		pts[i] = numeric.mul( mat, homoPt ).slice( 0, homoPt.length-2 );
	}

	this.set('controlPoints', pts);

	return this;

}; 

/**
 * Obtain a copy of the curve
 *
 * @param {Array} 4d array representing the transform
 *
 * @return {Array} An array if called synchronously, otherwise nothing
 * @api public
 */

verb.geom.NurbsCurve.prototype.clone = function(){

	// copy the control points
	var pts = this.get("controlPoints");

	var pts_copy = [];

	for (var i = 0; i < pts.length; i++){
		pts_copy.push( pts[i].slice(0) );
	}

	return new verb.geom.NurbsCurve( this.get('degree'), pts_copy, this.get('weights').slice(0), this.get('knots').slice );

};

/**
 * Obtain the homogeneous representation of the control points
 *
 * @returns {Array} 2d array of homogenized control points
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
		"degree": curve_props.degree
	});

};
