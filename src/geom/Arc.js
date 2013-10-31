VERB.geom.Arc = function(center, xaxis, yaxis, start_angle, end_angle) {

	VERB.geom.Geometry.call(this);

	this.center = center;
	this.xaxis = xaxis;
	this.yaxis = yaxis;
	this.start_angle = start_angle;
	this.end_angle = end_angle;

};

VERB.geom.Arc.prototype = {

  AsNurbsCurve: function() {
    // construct nurbs surface
  }

};