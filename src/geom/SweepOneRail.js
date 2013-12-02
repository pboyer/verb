verb.geom.SweepOneRail = function( rail, profile ) {

	this.setAll({
		"rail": rail,
		"profile": profile
	});

	var surface_props = this.nurbsRep();

	verb.geom.NurbsSurface.call(this, surface_props.degree_u, surface_props.knots_u, surface_props.degree_v, surface_props.knots_v, surface_props.control_points, surface_props.weights );

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