var Benchmark = require('benchmark')
    , verb = require('../build/js/verb.js');

function getComplexSurface(){

    var degree = 3
        , knots = [0, 0, 0, 0, 0.333, 0.666, 1, 1, 1, 1]
        , pts = [   [ [0, 0, -10],  [10, 0, 0],     [20, 0, 0],     [30, 0, 0] ,    [40, 0, 0], [50, 0, 0] ],
                    [ [0, -10, 0],  [10, -10, 10],  [20, -10, 10],  [30, -10, 0] , [40, -10, 0], [50, -10, 0]   ],
                    [ [0, -20, 0],  [10, -20, 10],  [20, -20, 10],  [30, -20, 0] , [40, -20, -2], [50, -20, 0]  ],
                    [ [0, -30, 0],  [10, -30, 0],   [20, -30, -23],     [30, -30, 0] , [40, -30, 0], [50, -30, 0]     ],
                    [ [0, -40, 0],  [10, -40, 0],   [20, -40, 0],   [30, -40, 4] , [40, -40, -20], [50, -40, 0]     ],
                    [ [0, -50, 12], [10, -50, 0],   [20, -50, 0],   [30, -50, 0] , [50, -50, 0], [50, -50, -15]     ],     ]
        , wts = [   [ 1, 1, 1, 1, 1, 1],
                    [ 1, 1, 1, 1, 1, 1],
                    [ 1, 1, 1, 1, 1, 1],
                    [ 1, 1, 1, 1, 1, 1],
                    [ 1, 1, 1, 1, 1, 1],
                    [ 1, 1, 1, 1, 1, 1] ];

    pts = verb.eval.Eval.homogenize2d(pts, wts);

    var srfObj = {
        degreeU : degree,
        degreeV : degree,
        knotsU : knots,
        knotsV : knots,
        controlPoints : pts
    };

    return srfObj;
}

var surface = getComplexSurface();

module.exports = {
  name: 'rationalSurfaceAdaptiveSample',
  tests: {
    'rationalSurfaceAdaptiveSample (tol 0.2)': function() {
        var mesh = verb.eval.Tess.rationalSurfaceAdaptiveSample( surface, 0.1 );
    },
    'rationalSurfaceAdaptive (default)': function() {
        var mesh = verb.eval.Tess.rationalSurfaceAdaptive( surface );
    }
  }
};

