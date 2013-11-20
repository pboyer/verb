VERB.geom.PolylineCurve = function( polyline ){

	_degree = 1;
	_control_points = polyline.points.slice(0);

}.inherits( VERB.geom.NurbsCurve );