if ( typeof exports != 'object' || exports === undefined )  // browser context
{
	var verb = {}
		, numeric = window.numeric
		, binomial = window.binomial
		, labor = window.labor
		, _ = window.underscore;
}
else // node.js context
{
	var verb = module.exports = {}
		, numeric = require('numeric')
		, binomial = require('binomial')
		, labor = require('labor')
		, _ = require('underscore');
}

verb.geom = {};
verb.core = {};
verb.eval = {};

verb.eval.nurbs = verb.eval.nurbs || {};
verb.eval.geom = verb.eval.geom || {};
verb.eval.mesh = verb.eval.mesh || {};

verb.EPSILON = 1e-8;

verb.init = function() {
	verb.nurbsEngine = new verb.core.Engine( verb.eval.nurbs );
	verb.geom.NurbsGeometry.prototype.nurbsEngine = verb.nurbsEngine;
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
