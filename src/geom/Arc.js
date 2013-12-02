verb.geom.Arc = function(center, xaxis, yaxis, radius, interval) {

	verb.geom.NurbsCurve.call(this);

	this.setAll( {
		"center": center,
		"xaxis": xaxis,
		"yaxis": yaxis,
		"radius": radius,
		"interval": interval 
	});

	this.update();
	this.watchAll( ['center', 'xaxis', 'yaxis', 'radius', 'interval'], this.update );

}.inherits(verb.geom.NurbsCurve);

verb.geom.Arc.prototype.nurbsRep = function(){

	return this.nurbsEngine.eval_sync( 'get_arc', [ this.get("center"), 
													 this.get("xaxis"), 
													 this.get("yaxis"), 
													 this.get("radius"), 
													 this.get("interval").get("min"), 
													 this.get("interval").get("max")] );

};
