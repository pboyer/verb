// ###new Line(start, end)
//
// Constructor for a Line
//
// **params**
// + *Array*, Length 3 array representing the start point
// + *Array*, Length 3 array representing the end point
//
verb.Line = function(start, end) {

	verb.NurbsCurve.call(this);

	this.setAll({ 
		"start": start,
		"end": end
	});

	this.update();

	this.watchAll(['start', 'end'], this.update );

}.inherits(verb.NurbsCurve);

// #### nurbsRep()
//
// Construct the Nurbs representation
verb.Line.prototype.nurbsRep = function(){

	return {
			knots: [0,0,1,1], 
			control_points: [ this.get("start"), this.get("end") ],
			weights: [1,1],
			degree: 1
	};

};


