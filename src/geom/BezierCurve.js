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

}.inherits( VERB.geom.NurbsCurve ); 

