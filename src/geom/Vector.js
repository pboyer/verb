VERB.geom.Vector = function(x, y, z) {

  if (arguments.length == 3) {
    this.x = x;
    this.y = y;
    this.z = z;
  } else if ('x' in x) {
    this.x = x.x;
    this.y = x.y;
    this.z = x.z;
  } else {
    this.x = x[0];
    this.y = x[1];
    this.z = x[2];
  }

};

VERB.geom.Vector.prototype = {
  clone: function() {
    return new VERB.geom.Vector(this.x, this.y, this.z);
  },

  negated: function() {
    return new VERB.geom.Vector(-this.x, -this.y, -this.z);
  },

  plus: function(a) {
    return new VERB.geom.Vector(this.x + a.x, this.y + a.y, this.z + a.z);
  },

  minus: function(a) {
    return new VERB.geom.Vector(this.x - a.x, this.y - a.y, this.z - a.z);
  },

  times: function(a) {
    return new VERB.geom.Vector(this.x * a, this.y * a, this.z * a);
  },

  dividedBy: function(a) {
    return new VERB.geom.Vector(this.x / a, this.y / a, this.z / a);
  },

  dot: function(a) {
    return this.x * a.x + this.y * a.y + this.z * a.z;
  },

  lerp: function(a, t) {
    return this.plus(a.minus(this).times(t));
  },

  length: function() {
    return Math.sqrt(this.dot(this));
  },

  unit: function() {
    return this.dividedBy(this.length());
  },

  cross: function(a) {
    return new VERB.geom.Vector(
      this.y * a.z - this.z * a.y,
      this.z * a.x - this.x * a.z,
      this.x * a.y - this.y * a.x
    );
  }
};