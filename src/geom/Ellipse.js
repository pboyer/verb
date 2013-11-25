verb.geom.Ellipse = function(center, xaxis, yaxis, xradius, yradius) {

	this.setAll({
		"center": center,
		"xaxis": xaxis,
		"yaxis": yaxis,
		"xradius": xradius,
		"yradius": yradius
	});

	var curve_props = this.nurbsRep();

	verb.geom.NurbsCurve.call(this, curve_props.degree, curve_props.control_points, curve_props.weight, curve_props.knots );

	this.watchAll( ['center', 'xaxis', 'yaxis', 'xradius', 'yradius'], this.update );

}.inherits(verb.geom.NurbsCurve);

verb.geom.Ellipse.prototype.nurbsRep = function(){

	// very similar to arc, just rotate first then use minor and major radius rather than radius

	return this.nurbsEngine.eval_sync( 'get_ellipse_arc', [ this.get("center"), 
															 this.get("xaxis"), 
															 this.get("yaxis"), 
															 this.get("xradius"), 
															 this.get("yradius"), 
															 0, 
															 2 * Math.PI ]);

};

// implement ellipse
// implement tesselation stuff, proper mesh datatypes

// todo sweep

// prepare demo
