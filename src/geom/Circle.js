// ###new Circle(center, xaxis, yaxis, xradius, yradius)
//
// Constructor for Circle
//
// **params**
// + *Array*, Length 3 array representing the center of the circle
// + *Array*, Length 3 array representing the xaxis
// + *Array*, Length 3 array representing the perpendicular yaxis
// + *Number*, Radius

verb.geom.Circle = function(center, xaxis, yaxis, radius) {

	verb.geom.NurbsCurve.call(this);
	
	this.setAll({
		"center": center,
		"xaxis": xaxis,
		"yaxis": yaxis,
		"radius": radius 
	});

	this.update();

	this.watchAll( ['center', 'xaxis', 'yaxis', 'radius'], this.update );

}.inherits(verb.geom.NurbsCurve);

// #### nurbsRep()
//
// Construct the Nurbs representation
verb.geom.Circle.prototype.nurbsRep = function(){

	return this.nurbsEngine.eval( 'get_arc', [  this.get("center"), 
																									 this.get("xaxis"), 
																									 this.get("yaxis"), 
																									 this.get("radius"), 
																									 0, 
																									 2 * Math.PI ]);

};
