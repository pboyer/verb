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
		// construct nurbs surface
	}

};
