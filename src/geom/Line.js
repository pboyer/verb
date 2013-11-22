VERB.geom.Line = function(start, end) {

	this.start = start;
	this.end = end;

	this.nurbsRep = function(){

		return this.nurbs_engine.eval_sync( 'get_arc', [ this.get("center"), 
														 this.get("xaxis"), 
														 this.get("yaxis"), 
														 this.get("radius"), 
														 this.get("interval").get("start"), 
														 this.get("center").get("end")] );

	};

};
