VERB.geom.Arc = function(center, xaxis, yaxis, radius, interval) {

	// other constructors
	// circle, interval
	// circle, angle
	// 3 pts

	this.Center = center;
	this.XAxis = xaxis;
	this.YAxis = yaxis;
	this.Radius = radius;
	this.Interval = interval;

	this.AsNurbsCurve = function() {
		
		var curve_props = this.nurbs_engine.eval_sync( 'get_arc', [ this.Center, this.XAxis, this.YAxis, this.Radius, this.Interval.Min, this.Interval.Max ] );
		return new VERB.geom.NurbsCurve(curve_props.degree, curve_props.control_points, curve_props.weight, curve_props.knots );

	};

};
