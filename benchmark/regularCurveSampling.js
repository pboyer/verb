var Benchmark = require('benchmark')
	, verb = require('../build/js/verb.js');

var crv = verb.eval.Make.rationalBezierCurve( [[0,0,0], [1,1,1], [2,1,1], [3,1,0]] );

module.exports = {
 name: 'Regular curve sampling',
 tests: {
   'rationalCurveRegularSample (6560)': function() {
       var p = verb.eval.Tess.rationalCurveRegularSample( crv, 6560 );
   },
   'direct evaluation (6560)': function() {
       var p = [];
		var sp = 1 / 6560;

		for (var i = 0; i < 6561; i++){
			p.push( verb.eval.Eval.rationalCurvePoint( crv, i*sp ) )
		}
   }
 }
};

