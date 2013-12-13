// ###new PolyLine( points ) 
//
// Constructor for a PolyLine
//
// **params**
// + *Array*, Array of length-3 arrays representing the points
//
verb.geom.PolyLine = function( points ) {

	verb.geom.NurbsCurve.call(this);

	this.setAll( {
		"control_points": points ? points.slice(0) : []
	});

	this.update();

}.inherits(verb.geom.NurbsCurve);

// #### nurbsRep()
//
// Construct the Nurbs representation
verb.geom.PolyLine.prototype.nurbsRep = function(){

	return this.nurbsEngine.eval( 'get_polyline_curve', [ this.get("control_points") ]);

};