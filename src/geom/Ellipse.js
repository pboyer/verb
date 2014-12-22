// ###new Ellipse(center, xaxis, yaxis, xradius, yradius)
//
// Constructor for EllipseArc
//
// **params**
// + *Array*, Length 3 array representing the center of the arc
// + *Array*, Length 3 array representing the xaxis
// + *Array*, Length 3 array representing the perpendicular yaxis
// + *Number*, Radius of the arc in the x direction
// + *Number*, Radius of the arc in the y direction

verb.Ellipse = function(center, xaxis, yaxis, xradius, yradius) {

	verb.NurbsCurve.call(this);

	this.setAll({
		"center": center,
		"xaxis": xaxis,
		"yaxis": yaxis,
		"xradius": xradius,
		"yradius": yradius
	});

	this.update();

	this.watchAll( ['center', 'xaxis', 'yaxis', 'xradius', 'yradius'], this.update );

}.inherits(verb.NurbsCurve);

// #### nurbsRep()
//
// Construct the Nurbs representation
verb.Ellipse.prototype.nurbsRep = function(){

	return this.nurbsEngine.eval( 'get_ellipse_arc', [ this.get("center"), 
															 this.get("xaxis"), 
															 this.get("yaxis"), 
															 this.get("xradius"), 
															 this.get("yradius"), 
															 0, 
															 2 * Math.PI ]);

};
