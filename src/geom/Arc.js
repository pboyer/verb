VERB.geom.Arc = function(center, xaxis, yaxis, radius, interval) {

	this.set( "center", center );
	this.set( "xaxis", xaxis );
	this.set( "yaxis", yaxis );
	this.set( "radius", radius );
	this.set( "interval", interval );

	this.nurbsRep = function(){

		return this.nurbs_engine.eval_sync( 'get_arc', [ this.get("center"), 
														 this.get("xaxis"), 
														 this.get("yaxis"), 
														 this.get("radius"), 
														 this.get("interval").get("start"), 
														 this.get("center").get("end")] );

	};

	var curve_props = this.nurbsRep();

	VERB.geom.NurbsCurve.call(this, curve_props.degree, curve_props.control_points, curve_props.weight, curve_props.knots );


	// TODO: override closest point


}.inherits(VERB.geom.NurbsCurve);
