verb.geom.Extrusion = function(profile, axis, length ) {

	this.setAll({ 
		  "profile": profile,
		  "axis": axis,
	      "length": length 
	  });

	var surface_props = this.nurbsRep();

	verb.geom.NurbsSurface.call(this, surface_props.degree, surface_props.control_points, surface_props.weight, surface_props.knots );

	this.watchAll( ['axis', 'length' ], this.update );
	profile.watchAll( ['knots', 'degree', 'controlPoints', 'weights'], this.update );

}.inherits(verb.geom.NurbsSurface);

verb.geom.Extrusion.prototype.nurbsRep = function() {

  return this.nurbsEngine.eval_sync( 'get_extruded_surface', 
									[ this.get("axis"), 
								 	  this.get("length"), 
									  this.get("profile").get("knots"), 
									  this.get("profile").get("degree"), 
									  this.get("profile").get("controlPoints"),
									  this.get("profile").get("weights")] );

};


