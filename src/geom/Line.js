verb.geom.Line = function(start, end) {

	verb.geom.NurbsCurve.call(this);

	this.setAll({ 
		"start": start,
		"end": end
	});

	this.update();

	this.watchAll(['start', 'end'], this.update );

}.inherits(verb.geom.NurbsCurve);

verb.geom.Line.prototype.nurbsRep = function(){

	return {
			knots: [0,0,1,1], 
			control_points: [ this.get("start"), this.get("end") ],
			weights: [1,1],
			degree: 1
	};

};


