verb.geom.FourPointSurface = function(p1, p2, p3, p4) {

	verb.geom.NurbsSurface.call(this);

	this.setAll( {
		"p1": p1,
		"p2": p2,
		"p3": p3,
		"p4": p4
	});

	this.update();

	this.watchAll( ['p1', 'p2', 'p3', 'p4'], this.update );

}.inherits(verb.geom.NurbsSurface);

verb.geom.FourPointSurface.prototype.nurbsRep = function(){

	return this.nurbsEngine.eval_sync( 'get_4pt_surface', [ this.get("p1"), 
															 this.get("p2"), 
															 this.get("p3"), 
															 this.get("p4") ]);

};
