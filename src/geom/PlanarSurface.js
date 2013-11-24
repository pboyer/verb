verb.geom.PlanarSurface = function( base, uaxis, vaxis, ulength, vlength ) {

	this.setAll({
		"base": center,
		"uaxis": xaxis,
		"vaxis": yaxis,
		"ulength": xradius,
		"vlength": yradius
	});

	var surface_props = this.nurbsRep();

	verb.geom.NurbsSurface.call(this, surface_props.degree, surface_props.control_points, surface_props.weight, surface_props.knots );

	this.watchAll( ['base', 'uaxis', 'vaxis', 'ulength', 'vlength'], this.update );

}.inherits(verb.geom.NurbsSurface);

verb.geom.Cone.prototype.nurbsRep = function(){

	var p1 = this.get('base')
		, uedge = numeric.mul( this.get('uaxis'), this.get('ulength'))
		, vedge = numeric.mul( this.get('vaxis'), this.get('vlength'))
		, p2 = numeric.add( base, uedge )
		, p3 = numeric.add( base, vedge, uedge )
		, p4 = numeric.add( base, vedge );

	return this.nurbsEngine.eval_sync( 'get_4pt_surface', [ p1, p2, p3, p4 ]);

};