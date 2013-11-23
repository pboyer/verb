verb.geom.BezierCurve = function( degree, control_points, weights) {

	// a bezier can be represented exactly as a rational b-spline curve
	// the form of the knot vector is [0,0,..,1,1] - the number of 0s is the degree + 1
	// IOW, the cubic bezier has this knot vector [0,0,0,0,1,1,1,1]

	// build the knots
	var knots = [];
	for (var i = 0; i < degree + 1; i++){ knots.push(0); }
	for (var i = 0; i < degree + 1; i++){ knots.push(1); }

	// build the control points
	var ctrlPoints = control_points.slice(0);

	// if weights aren't provided, build uniform weights
	if (weights === undefined){
		weights = [];
		for (var i = 0; i < ctrlPoints.length; i++){
			weights.push(1);
		}
	}

	verb.geom.NurbsCurve.call(this, degree, control_points, weight, knots );

}.inherits( verb.geom.NurbsCurve ); 

