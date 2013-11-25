verb.geom.Polyline = function( points ) {

	this.setAll( {
		"control_points": points ? points.slice(0) : []
	});

	var curve_props = this.nurbsRep();

	verb.geom.NurbsCurve.call(this, curve_props.degree, curve_props.control_points, curve_props.weights, curve_props.knots );

}.inherits(verb.geom.NurbsCurve);

verb.geom.Polyline.prototype.nurbsRep = function(){

	return this.nurbsEngine.eval_sync( 'get_polyline_surface', [ this.get("control_points") ]);

};