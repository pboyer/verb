verb.geom.SweepOneRail = function( rail, profile ) {

	verb.geom.NurbsSurface.call(this);

	this.setAll({
		"rail": rail,
		"profile": profile
	});

	this.update();

	this.watchAll( ['rail', 'profile'], this.update );

}.inherits(verb.geom.NurbsSurface);

verb.geom.SweepOneRail.prototype.nurbsRep = function(){
	
  return this.nurbsEngine.eval_sync( 'get_sweep1_surface', 
										[ this.get("profile").get("knots"), 
										  this.get("profile").get("degree"),
										  this.get("profile").get("controlPoints"),
										  this.get("profile").get("weights"),
										  this.get("rail").get("knots"),
										  this.get("rail").get("degree"),
										  this.get("rail").get("controlPoints"),
										  this.get("rail").get("weights")] );

};