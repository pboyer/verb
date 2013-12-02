verb.geom.Sphere = function( center, radius ) {

	verb.geom.NurbsSurface.call(this);

	this.setAll({
		"center": center,
		"radius": radius
	});

	this.update();
	this.watchAll( ['center', 'radius'], this.update );

}.inherits(verb.geom.NurbsSurface);

verb.geom.Sphere.prototype.nurbsRep = function(){

  return this.nurbsEngine.eval_sync( 'get_sphere_surface', 
										[ this.get("center"), 
										  [0,0,1],
										  [1,0,0],
										  this.get("radius")] );

};