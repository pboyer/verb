// ###new Extrusion(p1, p2, p3, pt)
//
// Constructor for Extrusion
//
// **params**
// + *NurbsCurve*, The curve to extrude
// + *Array*, Length 3 representing the direction to extrude
// + *Number*, The distance to extrude

verb.geom.Extrusion = function(profile, axis, length ) {

	verb.geom.NurbsSurface.call(this);

	this.setAll({ 
		  "profile": profile,
		  "axis": axis,
	      "length": length 
	  });

	this.update();

	this.watchAll( ['axis', 'length' ], this.update );
	profile.watchAll( ['knots', 'degree', 'controlPoints', 'weights'], this.update );

}.inherits(verb.geom.NurbsSurface);

// #### nurbsRep()
//
// Construct the Nurbs representation
verb.geom.Extrusion.prototype.nurbsRep = function() {

  return this.nurbsEngine.eval( 'get_extruded_surface', 
									[ this.get("axis"), 
								 	  this.get("length"), 
									  this.get("profile").get("knots"), 
									  this.get("profile").get("degree"), 
									  this.get("profile").get("controlPoints"),
									  this.get("profile").get("weights")] );

};


