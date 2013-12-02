verb.geom.PlanarSurface = function( base, uaxis, vaxis, ulength, vlength ) {

	this.setAll({
		"base": base,
		"uaxis": uaxis,
		"vaxis": vaxis,
		"ulength": ulength,
		"vlength": vlength
	});

	var surface_props = this.nurbsRep();

	verb.geom.NurbsSurface.call(this, surface_props.degree_u, surface_props.knots_u, surface_props.degree_v, surface_props.knots_v, surface_props.control_points, surface_props.weights );

	this.watchAll( ['base', 'uaxis', 'vaxis', 'ulength', 'vlength'], this.update );

}.inherits(verb.geom.NurbsSurface);

verb.geom.PlanarSurface.prototype.nurbsRep = function(){

	var p1 = this.get('base')
		, uedge = numeric.mul( this.get('uaxis'), this.get('ulength'))
		, vedge = numeric.mul( this.get('vaxis'), this.get('vlength'))
		, p2 = numeric.add( p1, uedge )
		, p3 = numeric.add( p1, vedge, uedge )
		, p4 = numeric.add( p1, vedge );

	return this.nurbsEngine.eval_sync( 'get_4pt_surface', [ p1, p2, p3, p4 ]);

};