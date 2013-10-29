if ( typeof exports != 'object' || exports === undefined )  // browser context
{
	var VERB = {}
		, numeric = window.numeric
		, binomial = window.binomial
		, labor = window.labor
		, _ = window.underscore;
}
else // node.js context
{
	var VERB = module.exports = {}
		, numeric = require('numeric')
		, binomial = require('binomial')
		, labor = require('labor')
		, _ = require('underscore');
}

VERB.geom = {};
VERB.core = {};
VERB.eval = {};

VERB.eval.nurbs = VERB.eval.nurbs || {};
VERB.eval.geom = VERB.eval.geom || {};
VERB.eval.mesh = VERB.eval.mesh || {};

VERB.EPSILON = 1e-8;

VERB.init = function() {
	VERB.nurbs_engine = new VERB.core.Engine( VERB.eval.nurbs );
	VERB.geom.NURBSGeometry.prototype.nurbs_engine = VERB.nurbs_engine;
}

if (typeof Object.create !== 'function') {
    Object.create = function (o) {
        function F() {}
        F.prototype = o;
        return new F();
    };
}

Function.prototype.method = function (name, func) {
    this.prototype[name] = func;
    return this;
};

Function.method('inherits', function (parent) {
    this.prototype = new parent();
    var d = {}, 
        p = this.prototype;
    this.prototype.constructor = parent; 
    return this;
});
