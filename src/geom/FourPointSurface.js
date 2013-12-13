// ###new FourPointSurface(p1, p2, p3, pt)
//
// Constructor for FourPointSurface
//
// **params**
// + *Array*, Length 3 array representing the first position in ccw direction
// + *Array*, Length 3 array representing the second position in ccw direction
// + *Array*, Length 3 array representing the third position in ccw direction
// + *Array*, Length 3 array representing the fourth position in ccw direction, repeat the third position to get a triangle
//
verb.geom.FourPointSurface = function(p1, p2, p3, p4) {

	verb.geom.NurbsSurface.call(this);

	this.setAll( {
		"p1": p1,
		"p2": p2,
		"p3": p3,
		"p4": p4
	});

	this.update();

	this.watchAll( ['p1', 'p2', 'p3', 'p4'], this.update );

}.inherits(verb.geom.NurbsSurface);

// #### nurbsRep()
//
// Construct the Nurbs representation
verb.geom.FourPointSurface.prototype.nurbsRep = function(){

	return this.nurbsEngine.eval( 'get_4pt_surface', [ this.get("p1"), 
															 this.get("p2"), 
															 this.get("p3"), 
															 this.get("p4") ]);

};
