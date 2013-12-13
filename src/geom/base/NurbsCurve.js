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
// ####tesselate(options [, callback] )
//
// Tesselate a curve at a given tolerance
//
// **params**
// + *Number*, The parameter to sample the curve
// + *Number*, The number of derivatives to obtain
// + *Number*, The callback, if you want this async
//
// **returns**
// + *Array*, An array if called synchronously, otherwise nothing

verb.geom.NurbsCurve.prototype.tesselate = function(options, callback){

	var options = options || {};
	options.tolerance = options.tolerance || verb.EPSILON;

	return this.nurbsEngine.eval( 'rational_curve_adaptive_sample', [ this.get('degree'), this.get('knots'), this.homogenize(), options.tolerance ], callback ); 

};

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
