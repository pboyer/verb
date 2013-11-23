verb.geom.Polyline = function(points) {

	if (points){
		this.points = points;
	} else {
		this.points = [];
	}

}.inherits(verb.geom.NurbsCurve);