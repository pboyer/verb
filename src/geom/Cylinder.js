// ###new Cylinder(center, xaxis, yaxis, xradius, yradius)
//
// Constructor for Cylinder
//
// **params**
// + *Array*, Length 3 array representing the axis of the cylinder
// + *Array*, Length 3 array representing the x axis, perpendicular to the axis
// + *Array*, Length 3 array representing the base of the cylinder
// + *Number*, Height of the cylinder
// + *Number*, Radius of the cylinder

verb.Cylinder = function(axis, xaxis, base, height, radius ) {

	this.setAll({
		"axis": axis,
		"xaxis": xaxis,
		"base": base,
		"height": height,
		"radius": radius 
	});

	var surface_props = this.nurbsRep();

	verb.NurbsSurface.call(this, surface_props.degree_u, surface_props.knots_u, surface_props.degree_v, surface_props.knots_v, surface_props.control_points, surface_props.weights );

	this.watchAll( ['axis', 'xaxis', 'base', 'height', 'radius'], this.update );

}.inherits(verb.NurbsSurface);

// #### nurbsRep()
//
// Construct the Nurbs representation
verb.Cylinder.prototype.nurbsRep = function() {

  return this.nurbsEngine.eval( 'get_cylinder_surface', 
						  												 [ this.get("axis"), 
						  												 	 this.get("xaxis"), 
						  													 this.get("base"), 
																				 this.get("height"), 
																				 this.get("radius") ]);

};