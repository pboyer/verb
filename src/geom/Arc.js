VERB.geom.Arc = function(center, xaxis, yaxis, interval) {

	VERB.geom.Geometry.call(this);

	// other constructors
	// circle, interval
	// circle, angle
	// 3 pts

	var _center = center;
	var _xaxis = xaxis;
	var _yaxis = yaxis;
	var _interval = interval;

	this.as_nurbs_curve = function() {
		// construct nurbs surface
	}

};
