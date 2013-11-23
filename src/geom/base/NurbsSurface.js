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