VERB.geom.BezierCurve = function( degree, control_points ) {

	VERB.geom.Curve.call(this);

	// a bezier can be represented exactly as a rational b-spline curve
	// the form of the knot vector is [0,0,..,1,1] - the number of 0s is the degree + 1
	// IOW, the cubic bezier has this knot vector [0,0,0,0,1,1,1,1]
	var _knot_vector = [];
	for (var i = 0; i < degree + 1; i++){ _knots.push(0); }
	for (var i = 0; i < degree + 1; i++){ _knots.push(1); }

	var _control_points = control_points.slice(0);
	var _degree = degree;

	this.set_control_point = function( index, value ) {
		if (index < 0 || index >= _control_points.length ) {
			return this;
		}
		_control_points[index] = value;
		return this;
	};

	this.point_sync = function( u ) {
		return this.nurbs_engine.eval_sync( 'curve_point', [ _degree, _knot_vector, _control_points, u ] );
	};

	this.derivs_sync = function( u, num_derivs ) {
		return this.nurbs_engine.eval_sync( 'curve_derivs', [ _degree, _knot_vector, _control_points, u, num_derivs] );
	};

	this.point = function( u, callback ) {
		nurbs_engine.eval( 'curve_point', [ _degree, _knot_vector, _control_points, u ], callback ); 
		return this;
	};

	this.derivs = function( u, num_derivs, callback ) {
		this.nurbs_engine.eval( 'curve_derivs', [ _degree, _knot_vector, _control_points, u, num_derivs  ], callback ); 
		return this;
	};

	this.points = function( num_samples, callback ) {

	};

}.inherits(VERB.geom.Curve);

