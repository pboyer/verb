verb.geom.Cylinder = function(axis, base, height, radius) {

	this.setAll({
		"axis": axis,
		"base": base,
		"height": height,
		"radius": radius 
	});

	var surface_props = this.nurbsRep();

	verb.geom.NurbsSurface.call(this, surface_props.degree, surface_props.control_points, surface_props.weight, surface_props.knots );

}.inherits(verb.geom.NurbsSurface);

verb.geom.Cylinder.prototype.nurbsRep = function() {

  return this.nurbsEngine.eval_sync( 'get_cylinder_surface', 
						  												 [ this.get("axis"), 
						  													 this.get("base"), 
																				 this.get("height"), 
																				 this.get("radius") ]);

};