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
			[	this.get('degreeU'), this.get('knotsU'), this.get('degreeV'), this.get('knotsV'), this.homogenize(), num_derivs || 1, u, v ], callback ); 

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