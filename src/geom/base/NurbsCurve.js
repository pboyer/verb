// ###new NurbsSurface( degree, controlPoints, weights, knots )
//
// Constructor for a NurbsCurve
//
// **params**
// + *Number*, The degree of the curve
// + *Array*, Array of arrays representing the control points
// + *Array*, Array of numbers representing the control point weights
// + *Array*, Array of numbers representing the knot structure

verb.NurbsCurve = function( degree, controlPoints, weights, knots ) {

	verb.NurbsGeometry.call(this);

	this.setAll({
		"controlPoints": controlPoints,
		"weights": weights,
		"knots": knots ? knots.slice(0) : [],
		"degree": degree
	});

}.inherits( verb.NurbsGeometry );

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

verb.NurbsCurve.prototype.point = function( u, callback ) {

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
// + *Function*, The callback, if you want this async
//
// **returns**
// + *Array*, An array if called synchronously, otherwise nothing

verb.NurbsCurve.prototype.derivatives = function( u, num_derivs, callback ) {

	return this.nurbsEngine.eval( 'rational_curve_derivs', [ this.get('degree'), this.get('knots'), this.homogenize(),  u, num_derivs || 1  ], callback ); 

};

//
// ####closestPoint( point [, callback] )
//
// Determine the closest parameter on the curve to the given point
//
// **params**
// + *Array*, A length 3 array representing the point
// + *Function*, The callback, if you want this async
//
// **returns**
// + *Number*, The parameter of the closest point

verb.NurbsCurve.prototype.closestPoint = function( point, callback ) {

	return this.nurbsEngine.eval( 'rational_curve_closest_point', [ this.get('degree'), this.get('knots'), this.homogenize(),  point  ], callback ); 

};

//
// ####length( [callback] )
//
// Determine the arc length of the curve
//
// **returns**
// + *Number*, The length of the curve

verb.NurbsCurve.prototype.length = function( callback ) {

	return this.nurbsEngine.eval( 'rational_curve_arc_length', [ this.get('degree'), this.get('knots'), this.homogenize()  ], callback ); 

};

//
// ####lengthAtParam( u [, callback] )
//
// Determine the arc length of the curve at the given parameter
//
// **params**
// + *Function*, The callback, if you want this async
//
// **returns**
// + *Number*, The length of the curve at the given parameter

verb.NurbsCurve.prototype.lengthAtParam = function( u, callback ) {

	return this.nurbsEngine.eval( 'rational_curve_arc_length', [ this.get('degree'), this.get('knots'), this.homogenize(), u  ], callback ); 

};

//
// ####lengthAtParam( len [, callback] )
//
// Determine the parameter of the curve at the given arc length
//
// **params**
// + *Number*, The arc length at which to determine the parameter
//
// **returns**
// + *Number*, The length of the curve at the given parameter

verb.NurbsCurve.prototype.paramAtLength = function( len, callback ) {

	return this.nurbsEngine.eval( 'rational_curve_param_at_arc_length', [ this.get('degree'), this.get('knots'), this.homogenize(), len  ], callback ); 

};

//
// ####divideByEqualArcLength( divisions [, callback] )
//
// Determine the parameters necessary to divide the curve into equal arc length segments
//
// **params**
// + *Number*, Number of divisions of the curve
//
// **returns**
// + *Array*, A collection of parameters

verb.NurbsCurve.prototype.divideByEqualArcLength = function( divisions, callback ) {

	return this.nurbsEngine.eval( 'rational_curve_divide_curve_equally_by_arc_length', [ this.get('degree'), this.get('knots'), this.homogenize(), divisions  ], callback ); 

};

//
// ####divideByArcLength( divisions [, callback] )
//
// Given the distance to divide the curve, determine the parameters necessary to divide the curve into equal arc length segments
//
// **params**
// + *Number*, Arc length of each segment
//
// **returns**
// + *Array*, A collection of parameters

verb.NurbsCurve.prototype.divideByArcLength = function( arcLength, callback ) {

	return this.nurbsEngine.eval( 'rational_curve_divide_curve_by_arc_length', [ this.get('degree'), this.get('knots'), this.homogenize(), arcLength  ], callback ); 

};

//
// ####tessellate(options [, callback] )
//
// Tessellate a curve at a given tolerance
//
// **params**
// + *Number*, The parameter to sample the curve
// + *Number*, The number of derivatives to obtain
// + *Function*, The callback, if you want this async
//
// **returns**
// + *Array*, An array if called synchronously, otherwise nothing

verb.NurbsCurve.prototype.tessellate = function(options, callback){

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

verb.NurbsCurve.prototype.split = function( u, callback ) {

	var domain = this.domain();

	if ( u <= domain[0] || u >= domain[1] ) {
		throw new Error("Cannot split outside of the domain of the curve!");
	}

	// transform the result from the engine into a valid pair of NurbsCurves
	function asNurbsCurves(res){

		var cpts0 = verb.eval.dehomogenize_1d( res[0].control_points );
		var wts0 = verb.eval.weight_1d( res[0].control_points );

		var c0 = new verb.NurbsCurve( res[0].degree, cpts0, wts0, res[0].knots );

		var cpts1 = verb.eval.dehomogenize_1d( res[1].control_points );
		var wts1 = verb.eval.weight_1d( res[1].control_points );

		var c1 = new verb.NurbsCurve( res[1].degree, cpts1, wts1, res[1].knots );

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

verb.NurbsCurve.prototype.domain = function() {

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

verb.NurbsCurve.prototype.transform = function( mat ){

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

verb.NurbsCurve.prototype.clone = function(){

	// copy the control points
	var pts = this.get("controlPoints");

	var pts_copy = [];

	for (var i = 0; i < pts.length; i++){
		pts_copy.push( pts[i].slice(0) );
	}

	return new verb.NurbsCurve( this.get('degree'), pts_copy, this.get('weights').slice(0), this.get('knots').slice );

};

//
// ####homogenize()
//
// Obtain the homogeneous representation of the control points
//
// **returns**
// + *Array*, 2d array of homogenized control points

verb.NurbsCurve.prototype.homogenize = function(){

	return verb.eval.homogenize_1d( this.get('controlPoints'), this.get('weights') );

};


//
// ####update()
//
// If this is a subtype of the NurbsCurve, this method will update the Nurbs representation
// of the curve from those parameters.  This destroys any manual changes to the Nurbs rep.
verb.NurbsCurve.prototype.update = function(){

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
