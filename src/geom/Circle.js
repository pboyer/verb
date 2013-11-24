verb.geom.Circle = function(center, xaxis, yaxis, radius) {

	this.setAll({
		"center": center,
		"xaxis": xaxis,
		"yaxis": yaxis,
		"radius": radius 
	});

	var curve_props = this.nurbsRep();

	verb.geom.NurbsCurve.call(this, curve_props.degree, curve_props.control_points, curve_props.weight, curve_props.knots );

}.inherits(verb.geom.NurbsCurve);

verb.geom.Circle.prototype.nurbsRep = function(){

	return this.nurbsEngine.eval_sync( 'get_arc', [  this.get("center"), 
																									 this.get("xaxis"), 
																									 this.get("yaxis"), 
																									 this.get("radius"), 
																									 0, 
																									 2 * Math.PI ]);

};


