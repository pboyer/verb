verb.geom.PolylineCurve = function( points ){

	// construct some sort of parameter mapping to subcurves

	this.point_sync = function( u ) {
		// return this.nurbsEngine.eval_sync( 'rational_curve_point', [ _degree, _knots, _homo_control_points, u ] );
	};

	this.derivs_sync = function( u, num_derivs ) {
		// return this.nurbsEngine.eval_sync( 'rational_curve_derivs', [ _degree, _knots, _homo_control_points, u, num_derivs] );
	};

	this.point = function( u, callback ) {
		// nurbsEngine.eval( 'rational_curve_point', [ _degree, _knots, _homo_control_points, u ], callback ); 
	};

	this.derivs = function( u, num_derivs, callback ) {
		// this.nurbsEngine.eval( 'rational_curve_derivs', [ _degree, _knots, _homo_control_points, u, num_derivs  ], callback ); 
	};

	this.points = function( num_samples, callback ) {
		// TODO: here we would use the worker to generate all of the points
		// wait for callback
	};

}