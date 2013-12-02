verb.geom.FourPointSurface = function(p1, p2, p3, p4) {

	this.setAll( {
		"p1": p1,
		"p2": p2,
		"p3": p3,
		"p4": p4
	});

	var surface_props = this.nurbsRep();

	verb.geom.NurbsSurface.call(this, surface_props.degree_u, surface_props.knots_u, surface_props.degree_v, surface_props.knots_v, surface_props.control_points, surface_props.weights );

	this.watchAll( ['p1', 'p2', 'p3', 'p4'], this.update );

}.inherits(verb.geom.NurbsSurface);

verb.geom.FourPointSurface.prototype.nurbsRep = function(){

	return this.nurbsEngine.eval_sync( 'get_4pt_surface', [ this.get("p1"), 
															 this.get("p2"), 
															 this.get("p3"), 
															 this.get("p4") ]);

};
