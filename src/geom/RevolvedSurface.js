// ###new RevolvedSurface( points ) 
//
// Constructor for a RevolvedSurface
//
// **params**
// + *Array*, Length 3 array representing a point on the revolve axis
// + *Array*, The axis of the revolve
// + *Array*, The angle to revolve on
// + *NurbsCurve*, The curve to revolve
//
verb.geom.RevolvedSurface = function( center, axis, angle, profile ) {

	verb.geom.NurbsSurface.call(this);

	this.setAll({
		"center": center,
		"axis": axis,
		"angle": angle,
		"profile": profile
	});

	this.update();

	this.watchAll( ['center', 'axis', 'angle', 'profile'], this.update );

}.inherits(verb.geom.NurbsSurface);

// #### nurbsRep()
//
// Construct the Nurbs representation
verb.geom.RevolvedSurface.prototype.nurbsRep = function(){

	  return this.nurbsEngine.eval( 'get_revolved_surface', 
									[ this.get("center"), 
									  this.get("axis"), 
									  this.get("angle"), 
									  this.get("profile").get("knots"), 
									  this.get("profile").get("degree"), 
									  this.get("profile").get("controlPoints"),
									  this.get("profile").get("weights")] );

};