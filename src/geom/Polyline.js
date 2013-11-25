verb.geom.Polyline = function(points) {



}.inherits(verb.geom.NurbsCurve);

verb.geom.Polyline.prototype.nurbsRep = function(){

	








	return this.nurbsEngine.eval_sync( 'get_cone_surface', [ this.get("axis"), 
																												 this.get("xaxis"), 
																												 this.get("base"), 
																												 this.get("height"), 
																												 this.get("radius") ]);

};