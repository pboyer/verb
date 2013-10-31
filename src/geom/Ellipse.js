VERB.geom.Ellipse = function(center, xaxis, yaxis, minorradius, majorradius) {

	VERB.geom.Geometry.call(this);

	// other constructors
	// 3 pts

	this.center = center;
	this.xaxis = xaxis;
	this.yaxis = yaxis;
	this.minorradius = minorradius;
	this.majorradius = majorradius;

};
