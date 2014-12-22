// ###new InterpCurve(pts [, degree, startTangent, endTangent])
//
// Constructor for InterpCurve
//
// Note that you must supply both start and end tangent if you do include this parameter
//
// **params**
// + *Array*, Array of Length 3 arrays representing the points to interpolate (must be > degree + 1)
// + *Number*, Default of 3. Expected degree of curve.
// + *Array*, No default. The tangent vector (first derivative) at the start of the curve.
// + *Array*, No default. The tangent vector (second derivative) at the end of the curve.
//
verb.InterpCurve = function(points, degree, startTangent, endTangent ) {

	verb.NurbsCurve.call(this);

	var atts = {
		"pts": points ? points.slice(0) : [],
		"degree" : degree ? degree : 3
	};

	if (startTangent && endTangent){
		atts.startTangent = startTangent;
		atts.endTangent = endTangent;
	}

	this.setAll( atts );

	this.update();

	var watchList = ['pts', 'degree'];

	if (startTangent && endTangent){
		watchList.push( "startTangent" );
		watchList.push( "endTangent" );
	}

	this.watchAll( watchList, this.update );

}.inherits(verb.NurbsCurve);

// #### nurbsRep()
//
// Construct the Nurbs representation
verb.InterpCurve.prototype.nurbsRep = function(){

	return this.nurbsEngine.eval( 'rational_interp_curve', [ this.get("pts"), this.get('degree'), this.get('startTangent'), this.get('endTangent')]);

};
