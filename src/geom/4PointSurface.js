verb.geom.4PointSurface = function(p1, p2, p3, p4) {

	this.setAll( {
		"center": center,
		"xaxis": xaxis,
		"yaxis": yaxis,
		"radius": radius,
		"interval": interval 
	});

	var curve_props = this.nurbsRep();

	verb.geom.NurbsCurve.call(this, curve_props.degree, curve_props.control_points, curve_props.weight, curve_props.knots );

	this.watchAll( ['center', 'xaxis', 'yaxis', 'radius', 'interval'], this.update );

}.inherits(verb.geom.NurbsCurve);

verb.geom.4PointSurface.prototype.nurbsRep = function(){

	return this.nurbsEngine.eval_sync( 'get_4pt_surface', [ this.get("p1"), 
															 this.get("p2"), 
															 this.get("p3"), 
															 this.get("p4") ]);

};
