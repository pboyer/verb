// ###new BezierCurve( control_points [, weights] )
//
// Constructor for BezierCurve
//
// **params**
// + *Array*, Array of Length 3 arrays representing the control pts of the bezier curve
// + *Array*, Array of numbers representing the weights of the bezier curve, omit if you don't want this to be a rational curve

verb.geom.BezierCurve = function( control_points, weights ) {

	verb.geom.NurbsCurve.call(this);
	
	this.setAll( {
		"controlPoints": control_points ? control_points.slice(0) : [],
		"weights": weights ? weights.slice(0) : undefined
	});

	this.update();

}.inherits( verb.geom.NurbsCurve ); 


// #### nurbsRep()
//
// Construct the Nurbs representation
verb.geom.BezierCurve.prototype.nurbsRep = function(){

	var control_points = this.get('controlPoints');
	var weights = this.get('weights');
	var degree = control_points.length - 1;

	var knots = [];
	for (var i = 0; i < degree + 1; i++){ knots.push(0); }
	for (var i = 0; i < degree + 1; i++){ knots.push(1); }

	// if weights aren't provided, build uniform weights
	if (weights === undefined){
		weights = [];
		for (var i = 0; i < control_points.length; i++){
			weights.push(1);
		}
	}

	return {
		degree: degree,
		knots: knots, 
		control_points: control_points,
		weights: weights
	};

};
