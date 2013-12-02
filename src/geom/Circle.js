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

verb.geom.Circle.prototype.nurbsRep = function(){

	return this.nurbsEngine.eval_sync( 'get_arc', [  this.get("center"), 
																									 this.get("xaxis"), 
																									 this.get("yaxis"), 
																									 this.get("radius"), 
																									 0, 
																									 2 * Math.PI ]);

};
