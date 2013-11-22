VERB.geom.Ellipse = function(center, xaxis, yaxis, minorradius, majorradius) {

	VERB.geom.Geometry.call(this);

	// other constructors
	// 3 pts

	this.center = center;
	this.xaxis = xaxis;
	this.yaxis = yaxis;
	this.minorradius = minorradius;
	this.majorradius = majorradius;


	this.set( "center", center );
	this.set( "xaxis", xaxis );
	this.set( "yaxis", yaxis );
	this.set( "radius", radius );

	this.nurbsRep = function(){

		return this.nurbs_engine.eval_sync( 'get_arc', [ this.get("center"), 
														 this.get("xaxis"), 
														 this.get("yaxis"), 
														 this.get("radius"), 
														 0, 
														 2 * Math.PI );

	};

	var curve_props = this.nurbsRep();

	VERB.geom.NurbsCurve.call(this, curve_props.degree, curve_props.control_points, curve_props.weight, curve_props.knots );


	// not done....

	// very similar to arc, just rotate first then use minor and major radius rather than radius

};

// todo do polyline, plane, 4 point surface, revsurface, sphere, think about sweep
// make sure it all builds again, may need to reorder the build process

// implement ellipse
// implement tesselation stuff, proper mesh datatypes

// prepare demo
