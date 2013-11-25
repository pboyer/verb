verb.geom.Sphere = function( center, radius ) {

	this.setAll({
		"center": center,
		"radius": radius
	});

	var surface_props = this.nurbsRep();

	verb.geom.NurbsSurface.call(this, surface_props.degree, surface_props.control_points, surface_props.weight, surface_props.knots );

	this.watchAll( ['center', 'radius'], this.update );

}.inherits(verb.geom.NurbsSurface);

verb.geom.Sphere.prototype.nurbsRep = function(){

  return this.nurbsEngine.eval_sync( 'get_sphere_surface', 
										[ this.get("center"), 
										  [0,0,1],
										  [1,0,0],
										  this.get("radius")] );

};