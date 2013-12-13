// ###new EllipseArc(center, xaxis, yaxis, xradius, yradius, interval)
//
// Constructor for EllipseArc
//
// **params**
// + *Array*, Length 3 array representing the center of the arc
// + *Array*, Length 3 array representing the xaxis
// + *Array*, Length 3 array representing the perpendicular yaxis
// + *Number*, Radius of the arc in the x direction
// + *Number*, Radius of the arc in the y direction
// + *Interval*, Interval object representing the interval of the arc

verb.geom.EllipseArc = function(center, xaxis, yaxis, xradius, yradius, interval) {

	verb.geom.NurbsCurve.call(this);
	
	this.setAll({
		"center": center,
		"xaxis": xaxis,
		"yaxis": yaxis,
		"xradius": xradius,
		"yradius": yradius,
		"interval": interval
	});

	this.update();

	this.watchAll( ['center', 'xaxis', 'yaxis', 'xradius', 'yradius', 'interval'], this.update );

}.inherits(verb.geom.NurbsCurve);

// #### nurbsRep()
//
// Construct the Nurbs representation
verb.geom.EllipseArc.prototype.nurbsRep = function(){

	return this.nurbsEngine.eval( 'get_ellipse_arc', [ this.get("center"), 
															 this.get("xaxis"), 
															 this.get("yaxis"), 
															 this.get("xradius"), 
															 this.get("yradius"), 
															 this.get("interval").get("min"), 
													 		 this.get("interval").get("max")] );

};
