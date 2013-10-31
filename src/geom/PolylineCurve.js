var PolylineCurve = function( points ){


	_degree = 1;
	// construct homo control points

	this.point_sync = function( u ) {
		return this.nurbs_engine.eval_sync( 'rational_curve_point', [ _degree, _knot_vector, _homo_control_points, u ] );
	};

	this.derivs_sync = function( u, num_derivs ) {
		return this.nurbs_engine.eval_sync( 'rational_curve_derivs', [ _degree, _knot_vector, _homo_control_points, u, num_derivs] );
	};

	this.point = function( u, callback ) {
		nurbs_engine.eval( 'rational_curve_point', [ _degree, _knot_vector, _homo_control_points, u ], callback ); 
	};

	this.derivs = function( u, num_derivs, callback ) {
		this.nurbs_engine.eval( 'rational_curve_derivs', [ _degree, _knot_vector, _homo_control_points, u, num_derivs  ], callback ); 
	};

	this.points = function( num_samples, callback ) {
		// TODO: here we would use the worker to generate all of the points
		// wait for callback
	};

}