VERB.geom.NurbsSurface = function( degree, control_points, weights, knots ) {

	VERB.geom.Surface.call(this);

	// private members
	var _control_points = control_points.slice(0);
	var _knots = knots.slice(0);
	var _weights = weights.slice(0);
	var _degree = degree;

	this.set_control_point = function(u_index, v_index, value) {
		
	};

	this.set_weight = function(u_index, v_index, value) {

	};

	this.point = function(u, v, callback) {

	};

	this.derivs = function(u, v, num_u, num_v, callback) {

	};

	this.point_sync = function(u, v) {

	};

	this.derivs_sync = function(u, v, num_u, num_v) {

	};

	this.tesselate = function(){
		
	};

	this.tesselate_sync = function(){

	};

};


