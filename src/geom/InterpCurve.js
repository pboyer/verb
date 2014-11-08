// ###new InterpCurve(pts [, degree])
//
// Constructor for InterpCurve
//
// **params**
// + *Array*, Array of Length 3 arrays representing the points to interpolate (must be > degree + 1)
// + *Number*, Default of 3. Expected degree of curve
//
verb.geom.InterpCurve = function(points, degree) {

	verb.geom.NurbsCurve.call(this);

	this.setAll( {
		"pts": points ? points.slice(0) : [],
		"degree" : degree ? degree : 3
	});

	this.update();

	this.watchAll( ['pts', 'degree'], this.update );

}.inherits(verb.geom.NurbsCurve);

// #### nurbsRep()
//
// Construct the Nurbs representation
verb.geom.InterpCurve.prototype.nurbsRep = function(){

	return this.nurbsEngine.eval( 'rational_interp_curve', [ this.get("pts"), this.get('degree')]);

};
