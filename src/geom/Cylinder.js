VERB.geom.Cylinder = function(axis, base, height) {

	this.set( "axis", axis );
	this.set( "base", base );
	this.set( "height", height );
	this.set( "radius", radius );

	this.nurbsRep = function() {

	  return this.nurbs_engine.eval_sync( 'get_cylinder_surface', 
							  												 [ this.get("axis"), 
							  													 this.get("base"), 
																					 this.get("height"), 
																					 this.get("radius") ]);

	}

	var surface_props = this.nurbsRep();

	VERB.geom.NurbsSurface.call(this, surface_props.degree, surface_props.control_points, surface_props.weight, surface_props.knots );

};
