VERB.geom.Extrusion = function(profile, axis, length ) 

	this.set( "profile", profile );
	this.set( "axis", axis );
	this.set( "length", length );

	this.nurbsRep = function() {

	  return this.nurbs_engine.eval_sync( 'get_extruded_surface', 
										[ this.get("axis"), 
									 	  this.get("length"), 
										  this.get("profile").get("knots"), 
										  this.get("profile").get("degree"), 
										  this.get("profile").get("controlPoints"),
										  this.get("profile").get("weights")] );

	};

	var surface_props = this.nurbsRep();

	VERB.geom.NurbsSurface.call(this, surface_props.degree, surface_props.control_points, surface_props.weight, surface_props.knots );

}.inherits(VERB.geom.NurbsSurface);