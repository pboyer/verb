verb.geom.PolyLine = function( points ) {

	verb.geom.NurbsCurve.call(this);

	this.setAll( {
		"control_points": points ? points.slice(0) : []
	});

	this.update();

}.inherits(verb.geom.NurbsCurve);

verb.geom.PolyLine.prototype.nurbsRep = function(){

	return this.nurbsEngine.eval_sync( 'get_polyline_curve', [ this.get("control_points") ]);

};