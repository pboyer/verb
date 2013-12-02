verb.geom.RevolvedSurface = function( center, axis, angle, profile ) {

	verb.geom.NurbsSurface.call(this);

	this.setAll({
		"center": center,
		"axis": axis,
		"angle": angle,
		"profile": profile
	});

	this.update();

	this.watchAll( ['center', 'axis', 'angle', 'profile'], this.update );

}.inherits(verb.geom.NurbsSurface);

verb.geom.RevolvedSurface.prototype.nurbsRep = function(){

	  return this.nurbsEngine.eval_sync( 'get_revolved_surface', 
									[ this.get("center"), 
									  this.get("axis"), 
									  this.get("angle"), 
									  this.get("profile").get("knots"), 
									  this.get("profile").get("degree"), 
									  this.get("profile").get("controlPoints"),
									  this.get("profile").get("weights")] );

};