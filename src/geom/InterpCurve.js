// ###new InterpCurve(pts)
//
// Constructor for InterpCurve
//
// **params**
// + *Array*, Array of Length 3 arrays representing the points to interpolate
//
verb.geom.InterpCurve = function(points) {

	verb.geom.NurbsCurve.call(this);

	this.setAll( {
		"pts": points ? points.slice(0) : []
	});

	this.update();

	this.watchAll( ['pts'], this.update );

}.inherits(verb.geom.NurbsCurve);

// #### nurbsRep()
//
// Construct the Nurbs representation
verb.geom.InterpCurve.prototype.nurbsRep = function(){

	return this.nurbsEngine.eval( 'rational_interp_curve', [ this.get("pts") ]);

};
