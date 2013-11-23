verb.geom.Arc = function(center, xaxis, yaxis, radius, interval) {

	this.setAll( {
		"center": center,
		"xaxis": xaxis,
		"yaxis": yaxis,
		"radius": radius,
		"interval": interval 
	});

	var curve_props = this.nurbsRep();

	console.log( this.get('center') )

	verb.geom.NurbsCurve.call(this, curve_props.degree, curve_props.control_points, curve_props.weight, curve_props.knots );

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
