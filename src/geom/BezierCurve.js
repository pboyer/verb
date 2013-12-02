verb.geom.BezierCurve = function( control_points, weights) {

	var degree = control_points.length - 1;

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

	verb.geom.NurbsCurve.call(this, degree, ctrlPoints, weights, knots );

}.inherits( verb.geom.NurbsCurve ); 

