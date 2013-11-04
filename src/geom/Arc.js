VERB.geom.Arc = function(center, xaxis, yaxis, radius, interval) {

	// other constructors
	// circle, interval
	// circle, angle
	// 3 pts

	this.center = center;
	this.xaxis = xaxis;
	this.yaxis = yaxis;
	this.radius = radius;
	this.interval = interval;

	this.as_nurbs_curve = function() {
		
		var curve_props = this.nurbs_engine.eval_sync( 'get_arc', [ this.center, this.xaxis, this.yaxis, this.radius, this.start_interval, this.end_interval ] );
		return new VERB.geom.NurbsCurve(curve_props.degree, curve_props.control_points, curve_props.weight, curve_props.knots );

	}

};
