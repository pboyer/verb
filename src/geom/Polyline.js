// ###new PolyLine( points ) 
//
// Constructor for a PolyLine
//
// **params**
// + *Array*, Array of length-3 arrays representing the points
//
verb.PolyLine = function( points ) {

	verb.NurbsCurve.call(this);

	this.setAll( {
		"control_points": points ? points.slice(0) : []
	});

	this.update();

}.inherits(verb.NurbsCurve);

// #### nurbsRep()
//
// Construct the Nurbs representation
verb.PolyLine.prototype.nurbsRep = function(){

	return this.nurbsEngine.eval( 'get_polyline_curve', [ this.get("control_points") ]);

};