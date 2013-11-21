VERB.geom.Cone = function(axis, base, height, radius ) {

	this.set( "axis", axis );
	this.set( "base", base );
	this.set( "height", height );
	this.set( "radius", radius );

	this.nurbsRep = function(){

		return this.nurbs_engine.eval_sync( 'get_cone_surface', [ this.get("center"), 
																 this.get("xaxis"), 
																 this.get("yaxis"), 
																 this.get("radius"), 
																 0, 
																 2 * Math.PI );

	};

	var surface_props = this.nurbsRep();

	VERB.geom.NurbsSurface.call(this, surface_props.degree, surface_props.control_points, surface_props.weight, surface_props.knots );

}.inherits(VERB.geom.NurbsSurface);
