verb.geom.EllipseArc = function(center, xaxis, yaxis, xradius, yradius, interval) {

	this.setAll({
		"center": center,
		"xaxis": xaxis,
		"yaxis": yaxis,
		"xradius": xradius,
		"yradius": yradius,
		"interval": interval
	});

	var curve_props = this.nurbsRep();

	verb.geom.NurbsCurve.call(this, curve_props.degree, curve_props.control_points, curve_props.weight, curve_props.knots );

}.inherits(verb.geom.NurbsCurve);

verb.geom.EllipseArc.prototype.nurbsRep = function(){

	return this.nurbsEngine.eval_sync( 'get_ellipse_arc', [ this.get("center"), 
															 this.get("xaxis"), 
															 this.get("yaxis"), 
															 this.get("xradius"), 
															 this.get("yradius"), 
															 this.get("interval").get("min"), 
													 		 this.get("center").get("max")] );

};
