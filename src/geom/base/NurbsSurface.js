/**
 * Constructor for a NurbsCurve
 *
 * @param {Number} The degree of the surface in the u direction
 * @param {Array} Array of numbers representing the knot positions in the u direction
 * @param {Number} The degree of the surface in the v direction
 * @param {Array} Array of numbers representing the knot positions in the v direction
 * @param {Array} 3d array representing the unweighted control points
 * @param {Array} 2d array representing the surface weight structure
 *
 * @api public
 */

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


/**
 * Sample a point at the given u, v parameter 
 *
 * @param {Number} The u parameter at which to sample
 * @param {Number} The v parameter at which to sample
 * @param {Function} Optional callback to do it async
 *
 * @return {Array} An array if called synchronously, otherwise nothing
 * @api public
 */

verb.geom.NurbsSurface.prototype.point = function( u, v, callback ) {

	if (callback) {
		return this.nurbsEngine.eval( 'rational_surface_point', 
							[ 	this.get('degreeU'), this.get('knotsU'), this.get('degreeV'), this.get('knotsV'), this.homogenize(), u, v ], callback );
	}

	return this.nurbsEngine.eval_sync( 'rational_surface_point', 
										[ 	this.get('degreeU'), this.get('knotsU'), this.get('degreeV'), this.get('knotsV'), this.homogenize(), u, v ] );

};

/**
 * Get derivatives at a given u, v parameter
 *
 * @param {Number} The u parameter to sample the curve
 * @param {Number} The v parameter to sample the curve
 * @param {Number} The number of derivatives to obtain
 * @param {Number} The callback, if you want this async
 *
 * @return {Array} An array if called synchronously, otherwise nothing
 * @api public
 */

verb.geom.NurbsSurface.prototype.derivatives = function( u, v, num_derivs, callback ) {

	if (callback) {
		return this.nurbsEngine.eval( 'rational_surface_derivs', 
			[	this.get('degreeU'), this.get('knotsU'), this.get('degreeV'), this.get('knotsV'), this.homogenize(), num_derivs, u, v ], callback ); 
	}

	return this.nurbsEngine.eval_sync( 'rational_surface_derivs', 
		[	this.get('degreeU'), this.get('knotsU'), this.get('degreeV'), this.get('knotsV'), this.homogenize(), num_derivs, u, v ] );

};

/**
 * Tesselate the surface
 *
 * @param {Number} The number of divisions in the u direction
 * @param {Number} The number of divisions in the v direction
 *
 * @return {Array} An array if called synchronously, otherwise nothing
 * @api public
 */

verb.geom.NurbsSurface.prototype.tesselate = function(udivs, vdivs, callback){

	if (callback) {
		return this.nurbsEngine.eval( 'tesselate_rational_surface_naive', 
			[	this.get('degreeU'), this.get('knotsU'), this.get('degreeV'), this.get('knotsV'), this.homogenize(), udivs, vdivs ], callback ); 
	}

	return this.nurbsEngine.eval_sync( 'tesselate_rational_surface_naive', 
		[	this.get('degreeU'), this.get('knotsU'), this.get('degreeV'), this.get('knotsV'), this.homogenize(), udivs, vdivs ] ); 

};

/**
 * Transform a curve with the given matrix.
 *
 * @param {Array} 4d array representing the transform
 *
 * @return {Array} An array if called synchronously, otherwise nothing
 * @api public
 */

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

/**
 * Obtain a copy of the curve
 *
 * @param {Array} 4d array representing the transform
 *
 * @return {Array} An array if called synchronously, otherwise nothing
 * @api public
 */

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

/**
 * Obtain the homogeneous representation of the control points
 *
 * @returns {Array} 3d array of homogenized control points
 * @api public
 */

verb.geom.NurbsSurface.prototype.homogenize = function(){

	return verb.eval.nurbs.homogenize_2d( this.get('controlPoints'), this.get('weights') );

};

/**
 * If this is a subtype of the NurbsSurface, this method will update the Nurbs representation
 * of the curve from those parameters.  This destroys any manual changes to the Nurbs rep.
 *
 * @api public
 */

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