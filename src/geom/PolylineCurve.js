verb.geom.PolylineCurve = function( polyline ){

	_degree = 1;
	_control_points = polyline.points.slice(0);

}.inherits( verb.geom.NurbsCurve );