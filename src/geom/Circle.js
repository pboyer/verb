VERB.geom.Circle = function(center, xaxis, yaxis, radius) {

	VERB.geom.Geometry.call(this);

	// other constructors
	// 3 pts

	this.center = center;
	this.xaxis = xaxis;
	this.yaxis = yaxis;
	this.radius = radius;

	this.AsNurbsCurve = function() {
		// construct nurbs surface
	}

};
