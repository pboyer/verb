var Benchmark = require('benchmark')
	, verb = require('../build/js/verb.js');


var crv = verb.eval.Make.rationalBezierCurve( [[0,0,0], [1,1,1], [2,1,1], [3,1,0]] );

module.exports = {
  name: 'Regular curve sampling',
  tests: {
    'curveRegularSamplePoints (100)': function() {
		var p = verb.eval.Eval.curveRegularSamplePoints( crv, 100 );
    },
    'direct evaluation (100)': function() {
        var p = [];
		var sp = 1 / 100;

		for (var i = 0; i < 101; i++){
			p.push( verb.eval.Eval.rationalCurvePoint( crv, i*sp ) )
		}
    }
  }
};

