/**
 * Cone constructor
 *
 * @return {Object} Newly formed Cone object
 * @api public
 */	

VERB.geom.Cone = function(axis, base, top, radius) {

	VERB.geom.Geometry.call(this);

	this.axis = axis;
	this.base = base;
	this.top = top;
	this.radius = radius;

};

VERB.geom.Cone.prototype = {

  AsNurbsSurface: function() {
    // construct nurbs surface
  }

};