// ###new Arc(center, xaxis, yaxis, radius, interval) 
//
// Constructor for Arc
//
// **params**
// + *Array*, Length 3 array representing the center of the arc
// + *Array*, Length 3 array representing the xaxis
// + *Array*, Length 3 array representing the perpendicular yaxis
// + *Number*, Radius of the arc
// + *Interval*, Interval object representing the interval of the arc

verb.Arc = function(center, xaxis, yaxis, radius, interval) {

	verb.NurbsCurve.call(this);

	this.setAll( {
		"center": center,
		"xaxis": xaxis,
		"yaxis": yaxis,
		"radius": radius,
		"interval": interval 
	});

	this.update();
	this.watchAll( ['center', 'xaxis', 'yaxis', 'radius', 'interval'], this.update );

}.inherits(verb.NurbsCurve);

// #### nurbsRep()
//
// Construct the Nurbs representation
verb.Arc.prototype.nurbsRep = function(){

	return this.nurbsEngine.eval( 'get_arc', [ this.get("center"), 
													 this.get("xaxis"), 
													 this.get("yaxis"), 
													 this.get("radius"), 
													 this.get("interval").get("min"), 
													 this.get("interval").get("max")] );

};
