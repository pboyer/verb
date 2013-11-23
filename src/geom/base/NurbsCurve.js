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

	return this.nurbsEngine.eval_sync( 'rational_curve_point', [ this.get('degree'), this.get('knots'), this.get('homoControlPoints'), u ] );

};

verb.geom.NurbsCurve.prototype.point = function( u, callback ) {

	this.nurbsEngine.eval( 'rational_curve_point', [ this.get('degree'), this.get('knots'), this.get('homoControlPoints'),  u ], callback ); 

};

verb.geom.NurbsCurve.prototype.derivatives = function( u, num_derivs, callback ) {

	this.nurbsEngine.eval( 'rational_curve_derivs', [ this.get('degree'), this.get('knots'), this.get('homoControlPoints'),  u, num_derivs  ], callback ); 

};

verb.geom.NurbsCurve.prototype.derivativesSync = function( u, num_derivs ) {

	return this.nurbsEngine.eval_sync( 'rational_curve_derivs', [ this.get('degree'), this.get('knots'), this.get('homoControlPoints'),  u, num_derivs] );

};

verb.geom.NurbsCurve.prototype.tesselate = function(tol){

	if (tol === undefined){
		tol = verb.TOLERANCE;
	}

	this.nurbsEngine.eval( 'rational_curve_adaptive_sample', [ this.get('degree'), this.get('knots'), this.get('homoControlPoints'), tol ], callback ); 

};

verb.geom.NurbsCurve.prototype.tesselateSync = function(){

	if (tol === undefined){
		tol = verb.TOLERANCE;
	}

	return this.nurbsEngine.eval_sync( 'rational_curve_adaptive_sample', [ this.get('degree'), this.get('knots'), this.get('homoControlPoints'), tol ] ); 

};

