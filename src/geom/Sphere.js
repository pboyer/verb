// ###new Sphere( center, radius ) 
//
// Constructor for a Sphere
//
// **params**
// + *Array*, Length 3 array representing the center
// + *Number*, Radius of the sphere
//
verb.geom.Sphere = function( center, radius ) {

	verb.geom.NurbsSurface.call(this);

	this.setAll({
		"center": center,
		"radius": radius
	});

	this.update();
	this.watchAll( ['center', 'radius'], this.update );

}.inherits(verb.geom.NurbsSurface);

// #### nurbsRep()
//
// Construct the Nurbs representation
verb.geom.Sphere.prototype.nurbsRep = function(){

  return this.nurbsEngine.eval( 'get_sphere_surface', 
										[ this.get("center"), 
										  [0,0,1],
										  [1,0,0],
										  this.get("radius")] );

};