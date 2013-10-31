VERB.geom.LineCurve = function( line ) {

	VERB.geom.Curve.call(this);

	var _line = line;

	this.point = function(u){
		// lerp
	}

	this.deriv = function(u){
		// axis, the rest are 0
	}

}.inherits( VERB.geom.Curve ); 