verb.geom.Cone = function(axis, xaxis, base, height, radius ) {

	verb.geom.NurbsSurface.call(this);

	this.setAll({
		"axis": axis,
		"xaxis": xaxis,
		"base": base,
		"height": height,
		"radius": radius 
	});

	var surface_props = this.nurbsRep();

	verb.geom.NurbsSurface.call(this, surface_props.degree_u, surface_props.knots_u, surface_props.degree_v, surface_props.knots_v, surface_props.control_points, surface_props.weights );

	this.watchAll( ['axis', 'xaxis', 'base', 'height', 'radius'], this.update );

}.inherits(verb.geom.NurbsSurface);

verb.geom.Cone.prototype.nurbsRep = function(){

	return this.nurbsEngine.eval_sync( 'get_cone_surface', [ this.get("axis"), 
															 this.get("xaxis"), 
															 this.get("base"), 
															 this.get("height"), 
															 this.get("radius") ]);

};