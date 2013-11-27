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


verb.geom.NurbsSurface.prototype.point = function( u, v, callback ) {

	if (callback) {
		return this.nurbsEngine.eval( 'rational_surface_point', 
							[ 	this.get('degreeU'), this.get('knotsU'), this.get('degreeV'), this.get('knotsV'), this.homogenize(), u, v ], callback );
	}

	return this.nurbsEngine.eval_sync( 'rational_surface_point', 
										[ 	this.get('degreeU'), this.get('knotsU'), this.get('degreeV'), this.get('knotsV'), this.homogenize(), u, v ] );

};

verb.geom.NurbsSurface.prototype.derivatives = function( u, v, num_derivs, callback ) {

	if (callback) {
		return this.nurbsEngine.eval( 'rational_surface_derivs', 
			[	this.get('degreeU'), this.get('knotsU'), this.get('degreeV'), this.get('knotsV'), this.homogenize(), num_derivs, u, v ], callback ); 
	}

	return this.nurbsEngine.eval_sync( 'rational_surface_derivs', 
		[	this.get('degreeU'), this.get('knotsU'), this.get('degreeV'), this.get('knotsV'), this.homogenize(), num_derivs, u, v ] );

};

verb.geom.NurbsSurface.prototype.tesselate = function(udivs, vdivs){

	if (callback) {
		return this.nurbsEngine.eval( 'tesselate_rational_surface_naive', 
			[	this.get('degreeU'), this.get('knotsU'), this.get('degreeV'), this.get('knotsV'), this.homogenize(), udivs, vdivs ], callback ); 
	}

	return this.nurbsEngine.eval( 'tesselate_rational_surface_naive', 
		[	this.get('degreeU'), this.get('knotsU'), this.get('degreeV'), this.get('knotsV'), this.homogenize(), udivs, vdivs ] ); 

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