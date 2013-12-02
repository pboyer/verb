verb.geom.EllipseArc = function(center, xaxis, yaxis, xradius, yradius, interval) {

	verb.geom.NurbsCurve.call(this);
	
	this.setAll({
		"center": center,
		"xaxis": xaxis,
		"yaxis": yaxis,
		"xradius": xradius,
		"yradius": yradius,
		"interval": interval
	});

	this.update();

	this.watchAll( ['center', 'xaxis', 'yaxis', 'xradius', 'yradius', 'interval'], this.update );

}.inherits(verb.geom.NurbsCurve);

verb.geom.EllipseArc.prototype.nurbsRep = function(){

	return this.nurbsEngine.eval_sync( 'get_ellipse_arc', [ this.get("center"), 
															 this.get("xaxis"), 
															 this.get("yaxis"), 
															 this.get("xradius"), 
															 this.get("yradius"), 
															 this.get("interval").get("min"), 
													 		 this.get("interval").get("max")] );

};
