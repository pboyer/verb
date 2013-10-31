VERB.geom.PlaneSurface = function( plane ) {

	VERB.geom.Surface.call(this);

	var _plane = plane;

	this.point = function(u, v, callback) {

	};

	this.derivs = function(u, v, num_u, num_v, callback) {

	};

	this.point_sync = function(u, v) {

	};

	this.derivs_sync = function( u, v, num_u, num_v ) {

	};

}.inherits( VERB.geom.Surface );


