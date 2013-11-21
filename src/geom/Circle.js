VERB.geom.Circle = function(center, xaxis, yaxis, radius) {

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

}.inherits(VERB.geom.NurbsCurve);
