verb.geom.SweepOneRail = function( rail, profile ) {

	this.setAll({
		"rail": rail,
		"profile": profile
	});

	var surface_props = this.nurbsRep();

	verb.geom.NurbsSurface.call(this, surface_props.degree, surface_props.control_points, surface_props.weight, surface_props.knots );

	this.watchAll( ['rail', 'profile'], this.update );

}.inherits(verb.geom.NurbsSurface);

verb.geom.SweepOneRail.prototype.nurbsRep = function(){

  return this.nurbsEngine.eval_sync( 'get_sweep_surface', 
										[ this.get("center"), 
										  [0,0,1],
										  [1,0,0],
										  this.get("radius")] );

};