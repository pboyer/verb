VERB.geom.NurbsCurve = function( degree, control_points, weights, knots ) {

	VERB.geom.Curve.call(this);

	// check for valid relations
	if ( !VERB.eval.nurbs.are_valid_relations( degree, control_points.length, knots.length ) ) 
	{
		console.warn( "Invalid relations were used to instantiate a NurbsCurve - using defaults.")
		var _control_points = [];
		var _homo_control_points = [];
		var _knots = [];
		var _weights = [];
		var _degree = 2;
	} else {
		// private members
		var _control_points = control_points.slice(0);
		var _homo_control_points = VERB.eval.nurbs.homogenize_1d( control_points, weights );
		var _knots = knots.slice(0);
		var _weights = weights.slice(0);
		var _degree = degree;
	}

	this.set_control_point = function( u_index, value ) {
		_control_points[u_index] = value;
		_homo_control_points[u_index] = value * _weights[u_index];
		return this;
	};

	this.set_weight = function( u_index, value ) {
		_weights[u_index] = value;
		set_control_point( u_index, _control_points[u_index] );
		return this;
	};

	this.set_knot = function( u_index, value ) {
		_knots[u_index] = value;
		return this;
	};

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

	this.tesselate = function(){
		
	};

	this.tesselate_sync = function(){

	};

}.inherits( VERB.geom.Geometry );