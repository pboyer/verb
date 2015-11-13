
var Benchmark = require('benchmark')
    , verb = require('../build/js/verb.js');

function getComplexSurface(){

    var degree = 3
        , knotsV = [0, 0, 0, 0, 0.333, 0.666, 1, 1, 1, 1]
        , knotsU = [0, 0, 0, 0, 0.5, 1, 1, 1, 1]
        , controlPoints = [
                    [ [0, 0, -10],  [10, 0, 0],     [20, 0, 0],     [30, 0, 0] ,    [40, 0, 0],     [50, 0, 0] ],
                    [ [0, -10, 0],  [10, -10, 10],  [20, -10, 10],  [30, -10, 0] ,  [40, -10, 0],   [50, -10, 0]    ],
                    [ [0, -20, 0],  [10, -20, 10],  [20, -20, 10],  [30, -20, 0] ,  [40, -20, -2],  [50, -20, 0]    ],
                    [ [0, -30, 0],  [10, -30, 0],   [20, -30, -23], [30, -30, 0] ,  [40, -30, 0],   [50, -30, 0]     ],
                    [ [0, -40, 0],  [10, -40, 0],   [20, -40, 0],   [30, -40, 4] ,  [40, -40, -20], [50, -40, 0]     ] ]
        , surface = new verb.core.NurbsSurfaceData( degree, degree, knotsU, knotsV, controlPoints );


    return surface;
}

module.exports = {
  name: 'Surface knot refinement',
  tests: {
    'surfaceKnotRefine2': function() {
        verb.eval.Modify.surfaceKnotRefine2( getComplexSurface(), [0.2], false );
    },
    'surfaceKnotRefine': function() {
        verb.eval.Modify.surfaceKnotRefine( getComplexSurface(), [0.2], false );
    }
  }
};

