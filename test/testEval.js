var should = require('should')
    , verb = require('../build/js/verb.js');

// necessary for multi-threading
verb.exe.WorkerPool.basePath = process.cwd() + "/build/js/";

// some testing utilities
function vecShouldBe( expected, test, tol ){

    if (tol === undefined) tol = verb.core.Constants.TOLERANCE;

    test.length.should.be.equal( expected.length );

    for (var i = 0; i < test.length; i++){
        test[i].should.be.approximately( expected[i], tol );
    }
}

function last(a){
    return a[a.length-1];
}

/*

describe("verb.eval.Eval.knotSpanGivenN",function(){

    it('returns correct result', () => {

        var n = 7
            , degree = 2
            , knots = [0, 0, 0, 1, 2, 3, 4, 4, 5, 5, 5];

        should.equal( 4, verb.eval.Eval.knotSpanGivenN( n, degree, 2.5, knots ) );
        should.equal( 3, verb.eval.Eval.knotSpanGivenN( n, degree, 1, knots ) );
        should.equal( 3, verb.eval.Eval.knotSpanGivenN( n, degree, 1.5, knots ) );
        should.equal( 7, verb.eval.Eval.knotSpanGivenN( n, degree, 4.9, knots ) );
        should.equal( 7, verb.eval.Eval.knotSpanGivenN( n, degree, 10, knots ) );
        should.equal( 7, verb.eval.Eval.knotSpanGivenN( n, degree, 5, knots ) );
        should.equal( 2, verb.eval.Eval.knotSpanGivenN( n, degree, 0, knots ) );
        should.equal( 2, verb.eval.Eval.knotSpanGivenN( n, degree, -1, knots ) );

    });

});

describe("verb.eval.Eval.knotSpan",() => {

    it('returns correct result for degree 2 curve', () => {

        var degree = 2
            , knots = [0, 0, 0, 1, 2, 3, 4, 4, 5, 5, 5];

        should.equal( 4, verb.eval.Eval.knotSpan( degree, 2.5, knots ) );
        should.equal( 3, verb.eval.Eval.knotSpan( degree, 1, knots ) );
        should.equal( 3, verb.eval.Eval.knotSpan( degree, 1.5, knots ) );
        should.equal( 7, verb.eval.Eval.knotSpan( degree, 4.9, knots ) );
        should.equal( 7, verb.eval.Eval.knotSpan( degree, 10, knots ) ); // above span
        should.equal( 7, verb.eval.Eval.knotSpan( degree, 5, knots ) ); // top of span
        should.equal( 2, verb.eval.Eval.knotSpan( degree, 0, knots ) ); // bottom span

    });

});

describe("verb.eval.Eval.basisFunctions, basisFunctionsGivenKnotSpanIndex",() => {

    it('return correct results', () => {

        var degree = 2
            , span = 4
            , knots = [0, 0, 0, 1, 2, 3, 4, 4, 5, 5, 5];

        var N1 = verb.eval.Eval.basisFunctionsGivenKnotSpanIndex( 4, 2.5, degree, knots );
        should.equal( 3, N1.length );
        should.equal( 0.125, N1[0] );
        should.equal( 0.75, N1[1] );
        should.equal( 0.125, N1[2] );

        var N2 = verb.eval.Eval.basisFunctions( 2.5, degree, knots );
        should.equal( 3, N2.length );
        should.equal( 0.125, N2[0] );
        should.equal( 0.75, N2[1] );
        should.equal( 0.125, N2[2] );

    });

});

describe("verb.eval.Eval.curvePoint",() => {

    it('returns correct result for simple curve', () => {

        var degree = 2
            , n = 6
            , knots = [0, 0, 0, 1, 2, 3, 4, 5, 5, 5]
            , controlPoints = [ [10, 0], [20, 10], [30, 20], [40, 30], [50, 40], [60, 30], [70, 80]]
            , crv = new verb.core.NurbsCurveData( degree, knots, controlPoints  );

        var p = verb.eval.Eval.curvePointGivenN( n, crv, 2.5);

        should.equal( p[0], 40 );
        should.equal( p[1], 30 );

        var p_start = verb.eval.Eval.curvePointGivenN( n, crv, 0);

        should.equal( p_start[0], 10 );
        should.equal( p_start[1], 0 );

        var p_end = verb.eval.Eval.curvePointGivenN( n, crv, 5);

        should.equal( p_end[0], 70 );
        should.equal( p_end[1], 80 );

    });

});

describe("verb.eval.Eval.curvePointGivenN",() => {

    it('returns correct result for simple curve', () => {

        var degree = 3
            , n = 4
            , u = 0
            , knots = [0, 0, 0, 0, 1, 1, 1, 1]
            , controlPoints = [ [10, 0], [20, 10], [30, 20], [50, 50] ]
            , crv = new verb.core.NurbsCurveData( degree, knots, controlPoints );

        var p = verb.eval.Eval.curvePoint( crv, u);

        should.equal( p[0], 10 );
        should.equal( p[1], 0 );

        var p2 = verb.eval.Eval.curvePoint( crv, 1.0);

        should.equal( p2[0], 50 );
        should.equal( p2[1], 50 );


    });
});

describe("verb.eval.Eval.areValidRelations",() => {

    it('returns correct result for two cases', () => {

        should.equal( false, verb.eval.Eval.areValidRelations( 0, 0, 0 ) );
        should.equal( true, verb.eval.Eval.areValidRelations( 2, 2, 5 ) );

    });
});

describe("verb.eval.Eval.derivativeBasisFunctionsGivenNI",() => {

    it('returns correct results', () => {

        // This needs to be tested better
        var degree = 2
            , n = 7
            , span = 4
            , knots = [0, 0, 0, 1, 2, 3, 4, 4, 5, 5, 5];

        var N1 = verb.eval.Eval.derivativeBasisFunctionsGivenNI( span, 2.5, degree, n, knots );
        // weights
        should.equal( 0.125, N1[0][0] );
        should.equal( 0.75, N1[0][1] );
        should.equal( 0.125, N1[0][2] );

        // derivatives
        should.equal( -0.5, N1[1][0] );
        should.equal( 1, N1[2][0] );
        should.equal( 0, N1[1][1] );
        should.equal( -2, N1[2][1] );
        should.equal( 0.5, N1[1][2] );
        should.equal( 1, N1[2][2] );

        // length
        should.equal( n + 1, N1.length );
        should.equal( degree + 1, N1[0].length );

    });

});

describe("verb.eval.Eval.curveDerivativesGivenN",() => {

    it('returns correct result for simple curve', () => {

        var degree = 3
            , n = 3
            , u = 0
            , knots = [0, 0, 0, 0, 1, 1, 1, 1]
            , controlPoints = [ [10, 0], [20, 10], [30, 20], [50, 50] ]
            , num_derivs = 2
            , crv = new verb.core.NurbsCurveData( degree, knots, controlPoints );

        var p = verb.eval.Eval.curveDerivativesGivenN( n, crv, u, num_derivs ) ;

        should.equal( p[0][0], 10 );
        should.equal( p[0][1], 0 );
        should.equal( p[1][0] / p[1][1], 1 );

    });

});

describe("verb.eval.Eval.curveDerivatives",() => {

    it('returns correct result for simple curve', () => {

        // This needs to be tested better
        var degree = 3
            , u = 0
            , knots = [0, 0, 0, 0, 1, 1, 1, 1]
            , controlPoints = [ [10, 0], [20, 10], [30, 20], [50, 50] ]
            , num_derivs = 2
            , crv = new verb.core.NurbsCurveData( degree, knots, controlPoints );

        var p = verb.eval.Eval.curveDerivatives( crv, u, num_derivs ) ;

        should.equal( p[0][0], 10 );
        should.equal( p[0][1], 0 );
        should.equal( p[1][0] / p[1][1], 1 );


    });

});

describe("verb.eval.Eval.surfacePointGivenNM",() => {

    it('returns correct result for simple surface', () => {

        // This needs to be tested better
        var degreeU = 3
            , degreeV = 3
            , knotsU = [0, 0, 0, 0, 1, 1, 1, 1]
            , knotsV =  [0, 0, 0, 0, 1, 1, 1, 1]
            , controlPoints = [     [ [0, 0, 50],       [10, 0, 0],         [20, 0, 0],         [30, 0, 0]      ],
                                                        [ [0, -10, 0],  [10, -10, 10],  [20, -10, 10],  [30, -10, 0]    ],
                                                        [ [0, -20, 0],  [10, -20, 10],  [20, -20, 10],  [30, -20, 0]    ],
                                                        [ [0, -30, 0],  [10, -30, 0],   [20, -30, 0],   [30, -30, 0]    ] ]
            , surface = new verb.core.NurbsSurfaceData( degreeU, degreeV, knotsU, knotsV, controlPoints )
            , n = 3
            , m = 3;

        var p = verb.eval.Eval.surfacePointGivenNM( n, m, surface, 0, 0 );

        should.equal( p[0], 0 );
        should.equal( p[1], 0 );
        should.equal( p[2], 50 );

        p = verb.eval.Eval.surfacePointGivenNM( n, m, surface, 1, 1 );

        should.equal( p[0], 30 );
        should.equal( p[1], -30 );
        should.equal( p[2], 0 );

    });

});

describe("verb.eval.Eval.surfacePoint",() => {

    it('returns correct result for simple surface', () => {

        // This needs to be tested better
        var degreeU = 3
            , degreeV = 3
            , knotsU = [0, 0, 0, 0, 1, 1, 1, 1]
            , knotsV =  [0, 0, 0, 0, 1, 1, 1, 1]
            , controlPoints = [     [ [0, 0, 50],       [10, 0, 0],         [20, 0, 0],         [30, 0, 0]      ],
                                    [ [0, -10, 0],  [10, -10, 10],  [20, -10, 10],  [30, -10, 0]    ],
                                    [ [0, -20, 0],  [10, -20, 10],  [20, -20, 10],  [30, -20, 0]    ],
                                    [ [0, -30, 0],  [10, -30, 0],   [20, -30, 0],   [30, -30, 0]    ] ]
            , surface = new verb.core.NurbsSurfaceData( degreeU, degreeV, knotsU, knotsV, controlPoints );

        var p = verb.eval.Eval.surfacePoint( surface, 0, 0 );

        should.equal( p[0], 0 );
        should.equal( p[1], 0 );
        should.equal( p[2], 50 );

        p = verb.eval.Eval.surfacePoint( surface, 1, 1 );

        should.equal( p[0], 30 );
        should.equal( p[1], -30 );
        should.equal( p[2], 0 );

    });

    it('returns correct result for another simple surface', () => {

        var degreeU = 1
            , degreeV = 3
            , knotsU = [0, 0, 1, 1 ]
            , knotsV =  [0, 0, 0, 0, 1, 1, 1, 1]
            , controlPoints = [     [ [0, 0, 50],       [10, 0, 0],         [20, 0, 0],         [30, 0, 0]      ],
                                    [ [0, -10, 0],  [10, -10, 10],  [20, -10, 10],  [30, -10, 0]    ] ]
            , surface = new verb.core.NurbsSurfaceData( degreeU, degreeV, knotsU, knotsV, controlPoints );

        var p = verb.eval.Eval.surfacePoint( surface, 0, 0 );

        should.equal( p[0], 0 );
        should.equal( p[1], 0 );
        should.equal( p[2], 50 );

    });

});

describe("verb.eval.Eval.surfaceDerivativesGivenNM",() => {

    it('returns correct derivatives for simple surface', () => {

        var degreeU = 3
            , degreeV = 3
            , u = 0.0
            , v = 0.0
            , knotsU = [0, 0, 0, 0, 1, 1, 1, 1]
            , knotsV =  [0, 0, 0, 0, 1, 1, 1, 1]
            , controlPoints = [     [ [0, 0, 0],        [10, 10, 0],        [20, 10, 0],        [30, 0, 0]      ],
                                                        [ [0, -10, 0],  [10, -10, 10],  [20, -10, 10],  [30, -10, 0]    ],
                                                        [ [0, -20, 0],  [10, -20, 10],  [20, -20, 10],  [30, -20, 0]    ],
                                                        [ [0, -30, 0],  [10, -30, 0],   [20, -30, 0],   [30, -30, 0]    ] ]
            , n = 3
            , m = 3
            , num_derivatives = 1
            , surface = new verb.core.NurbsSurfaceData( degreeU, degreeV, knotsU, knotsV, controlPoints );

        var p = verb.eval.Eval.surfaceDerivativesGivenNM( n, m, surface, 0, 0, num_derivatives );

        // 0th derivative with respect to u & v
        should.equal( p[0][0][0], 0 );
        should.equal( p[0][0][1], 0 );
        should.equal( p[0][0][2], 0 );

        // d/du
        should.equal( p[0][1][0] / p[0][1][0], 1 );
        should.equal( p[0][1][2], 0 );

        // d/dv
        should.equal( p[1][0][0] , 0 );
        should.equal( p[1][0][1] , -30 );
        should.equal( p[1][0][2] , 0 );

        // dd/dudv
        should.equal( p[1][1][0] , 0 );
        should.equal( p[1][1][1] , 0 );
        should.equal( p[1][1][2] , 0 );

    });
});

describe("verb.eval.Eval.surfaceDerivatives",() => {

    it('returns correct derivatives for simple surface', () => {

        var degreeU = 3
            , degreeV = 3
            , u = 0.0
            , v = 0.0
            , knotsU = [0, 0, 0, 0, 1, 1, 1, 1]
            , knotsV =  [0, 0, 0, 0, 1, 1, 1, 1]
            , controlPoints = [     [ [0, 0, 0],        [10, 10, 0],        [20, 10, 0],        [30, 0, 0]      ],
                                                        [ [0, -10, 0],  [10, -10, 10],  [20, -10, 10],  [30, -10, 0]    ],
                                                        [ [0, -20, 0],  [10, -20, 10],  [20, -20, 10],  [30, -20, 0]    ],
                                                        [ [0, -30, 0],  [10, -30, 0],   [20, -30, 0],   [30, -30, 0]    ] ]
            , n = 3
            , m = 3
            , num_derivatives = 1
            , surface = new verb.core.NurbsSurfaceData( degreeU, degreeV, knotsU, knotsV, controlPoints );

        var p = verb.eval.Eval.surfaceDerivatives( surface, 0, 0, num_derivatives );

        // 0th derivative with respect to u & v
        should.equal( p[0][0][0], 0 );
        should.equal( p[0][0][1], 0 );
        should.equal( p[0][0][2], 0 );

        // d/du
        should.equal( p[0][1][0] / p[0][1][0], 1 );
        should.equal( p[0][1][2], 0 );

        // d/dv
        should.equal( p[1][0][0] , 0 );
        should.equal( p[1][0][1] , -30 );
        should.equal( p[1][0][2] , 0 );

        // dd/dudv
        should.equal( p[1][1][0] , 0 );
        should.equal( p[1][1][1] , 0 );
        should.equal( p[1][1][2] , 0 );

    });

});

describe("verb.eval.Eval.homogenize1d",() => {

    it('returns correct results', () => {

        var weights = [1, 2, 3, 4]
            , controlPoints = [ [10, 0], [20, 10], [30, 20], [50, 50] ]
            , homo_controlPoints = verb.eval.Eval.homogenize1d( controlPoints, weights);

        for (var i = 0; i < controlPoints.length; i++)
        {
            should.equal( homo_controlPoints[i][0], weights[i] * controlPoints[i][0] );
            should.equal( homo_controlPoints[i][1], weights[i] * controlPoints[i][1] );
            should.equal( homo_controlPoints[i][2], weights[i] );
        }

        weights = [1, 2, 3, 4];
        controlPoints = [ [10, 0, 4], [20, 10, 3], [30, 20, 0], [50, 50, 10] ];
        homo_controlPoints = verb.eval.Eval.homogenize1d( controlPoints, weights);

        for (var i = 0; i < controlPoints.length; i++)
        {
            should.equal( homo_controlPoints[i][0], weights[i] * controlPoints[i][0] );
            should.equal( homo_controlPoints[i][1], weights[i] * controlPoints[i][1] );
            should.equal( homo_controlPoints[i][2], weights[i] * controlPoints[i][2] );
            should.equal( homo_controlPoints[i][3], weights[i] );
        }

    });

});

describe("verb.eval.Eval.homogenize2d",() => {

    it('homogenize2d', () => {

        var weights = [     [ 1,    -2, 3,  5   ],
                                            [ 2,    1,  5,  2   ],
                                            [ -3, 4,    7,  2   ],
                                            [ 1,    6,  -2, 12  ] ]
            , controlPoints = [     [ [0, 0, 0],        [10, 10, 0],        [20, 10, 0],        [30, 0, 0]      ],
                                                        [ [0, -10, 0],  [10, -10, 10],  [20, -10, 10],  [30, -10, 0]    ],
                                                        [ [0, -20, 0],  [10, -20, 10],  [20, -20, 10],  [30, -20, 0]    ],
                                                        [ [0, -30, 0],  [10, -30, 0],   [20, -30, 0],   [30, -30, 0]    ] ]
            , homo_controlPoints = verb.eval.Eval.homogenize2d( controlPoints, weights)
            , j = 0;

        for (var i = 0; i < controlPoints.length; i++)
        {
            for (j = 0; j < controlPoints[i].length; j++)
            {
                should.equal( homo_controlPoints[i][j][0], weights[i][j] * controlPoints[i][j][0] );
                should.equal( homo_controlPoints[i][j][1], weights[i][j] * controlPoints[i][j][1] );
                should.equal( homo_controlPoints[i][j][2], weights[i][j] * controlPoints[i][j][2] );
                should.equal( homo_controlPoints[i][j][3], weights[i][j] );
            }
        }

    });

});

describe("verb.eval.Eval.dehomogenize",() => {

    it('returns correct result', () => {

        var weights = [     [ 1,    -2, 3,  5   ],
                                            [ 2,    1,  5,  2   ],
                                            [ -3, 4,    7,  2   ],
                                            [ 1,    6,  -2, 12  ] ]
            , controlPoints = [     [ [0, 0, 0],        [10, 10, 0],        [20, 10, 0],        [30, 0, 0]      ],
                                                        [ [0, -10, 0],  [10, -10, 10],  [20, -10, 10],  [30, -10, 0]    ],
                                                        [ [0, -20, 0],  [10, -20, 10],  [20, -20, 10],  [30, -20, 0]    ],
                                                        [ [0, -30, 0],  [10, -30, 0],   [20, -30, 0],   [30, -30, 0]    ] ]
            , homo_controlPoints = verb.eval.Eval.homogenize2d( controlPoints, weights)
            , j = 0
            , dehomo_pt = [];

        for (var i = 0; i < controlPoints.length; i++)
        {
            for (j = 0; j < controlPoints[i].length; j++)
            {
                dehomo_pt = verb.eval.Eval.dehomogenize( homo_controlPoints[i][j] );
                should.equal( dehomo_pt.length, controlPoints[i][j].length );
                should.equal( dehomo_pt[0], controlPoints[i][j][0] );
                should.equal( dehomo_pt[1], controlPoints[i][j][1] );
                should.equal( dehomo_pt[2], controlPoints[i][j][2] );
            }
        }

    });

});

describe("verb.eval.Eval.rationalCurvePoint",() => {

    it('returns correct result for quarter circle', () => {

        // this represents a single quarter arc, using a rational bezier curve
        var degree = 2
            , knots = [0, 0, 0, 1, 1, 1 ]
            , controlPoints = [ [1, 0, 1], [1,1,1], [0,2,2] ]
            , crv = new verb.core.NurbsCurveData( degree, knots, controlPoints );

        var p = verb.eval.Eval.rationalCurvePoint( crv, 0);

        should.equal( p[0], 1 );
        should.equal( p[1], 0 );

        p = verb.eval.Eval.rationalCurvePoint( crv, 0.5);

        should.equal( p[0], 0.6 );
        should.equal( p[1], 0.8 );

        p = verb.eval.Eval.rationalCurvePoint( crv, 1);

        should.equal( p[0], 0 );
        should.equal( p[1], 1 );

    });

});

describe("verb.eval.Eval.rationalSurfacePoint",() => {

    it('returns correct result for cylinder patch', () => {

        // quarter cylinder patch
        var degreeU = 1
            , degreeV = 2
            , knotsU = [0, 0, 1, 1 ]
            , knotsV = [0, 0, 0, 1, 1, 1 ]
            , controlPoints = [ [ [1, 1, 0, 1],     [1, 1, 1, 1], [2, 0, 2, 2] ],
                                                              [ [-1, 1, 0, 1],  [-1, 1, 1, 1], [-2, 0, 2, 2] ] ]
            , surface = new verb.core.NurbsSurfaceData( degreeU, degreeV, knotsU, knotsV, controlPoints );

        var p = verb.eval.Eval.rationalSurfacePoint( surface, 0, 0 );

        should.equal( p[0], 1 );
        should.equal( p[1], 1 );
        should.equal( p[2], 0 );

        p = verb.eval.Eval.rationalSurfacePoint( surface, 0.5, 0.5 );

        should.equal( p[0], 0 );
        should.equal( p[1], 0.6 );
        should.equal( p[2], 0.8 );

        p = verb.eval.Eval.rationalSurfacePoint( surface, 1, 1 );

        should.equal( p[0], -1 );
        should.equal( p[1], 0 );
        should.equal( p[2], 1 );

    });
});

describe("verb.eval.Eval.rationalCurveDerivatives",() => {

    it('returns expected results', () => {

        // this represents a single quarter arc, using a rational bezier curve
        var degree = 2
            , knots = [0, 0, 0, 1, 1, 1 ]
            , controlPoints = [ [1,0,1], [1,1,1], [0,2,2] ]
            , crv = new verb.core.NurbsCurveData( degree, knots, controlPoints );

        var p = verb.eval.Eval.rationalCurveDerivatives( crv, 0, 2);

        should.equal( p[0][0], 1 );
        should.equal( p[0][1], 0 );

        should.equal( p[1][0], 0 );
        should.equal( p[1][1], 2 );

        should.equal( p[2][0], -4 );
        should.equal( p[2][1], 0 );

		p = verb.eval.Eval.rationalCurveDerivatives( crv, 1, num_derivatives);

        should.equal( p[0][0], 0 );
        should.equal( p[0][1], 1 );

        should.equal( p[1][0], -1 );
        should.equal( p[1][1], 0 );

        should.equal( p[2][0], 1 );
        should.equal( p[2][1], -1 );

    });

	it('returns expected results with 3 derivatives', function(){
		var num_derivatives = 3;

describe("verb.eval.Eval.rationalSurfaceDerivatives",() => {

    it('returns expected results', () => {

        // quarter cylinder patch, axis aligned with x axis, radius: 1
        var degreeU = 1
            , degreeV = 2
            , knotsU = [0, 0, 1, 1 ]
            , knotsV = [0, 0, 0, 1, 1, 1 ]
            , controlPoints = [ [ [1, 1, 0, 1],     [1, 1, 1, 1], [2, 0, 2, 2] ],
                                [ [-1, 1, 0, 1],    [-1, 1, 1, 1], [-2, 0, 2, 2] ] ]
            , num_derivatives = 1
            , surface = new verb.core.NurbsSurfaceData( degreeU, degreeV, knotsU, knotsV, controlPoints );

        var p = verb.eval.Eval.rationalSurfaceDerivatives( surface, 0, 0, num_derivatives );

        should.equal( p[0][0][0], 1 );
        should.equal( p[0][0][1], 1 );
        should.equal( p[0][0][2], 0 );

        should.equal( p[0][1][0], 0 );
        should.equal( p[0][1][1], 0 );
        should.equal( p[0][1][2], 2 );

        should.equal( p[1][0][0], -2 );
        should.equal( p[1][0][1], 0 );
        should.equal( p[1][0][2], 0 );

        p = verb.eval.Eval.rationalSurfaceDerivatives( surface, 1, 1, num_derivatives);

        should.equal( p[0][0][0], -1 );
        should.equal( p[0][0][1], 0 );
        should.equal( p[0][0][2], 1 );

        should.equal( p[0][1][0], 0 );
        should.equal( p[0][1][1], -1 );
        should.equal( p[0][1][2], 0 );

        should.equal( p[1][0][0], -2 );
        should.equal( p[1][0][1], 0 );
        should.equal( p[1][0][2], 0 );

    });

	it('returns expected results with 2 derivatives', function(){
		var num_derivatives = 2;

		var p = verb.eval.Eval.rationalSurfaceDerivatives( surface, 0, 0, num_derivatives );

		should.equal( p[0][2][0], 0 );
		should.equal( p[0][2][1], -4 );
		should.equal( p[0][2][2], 0 );

		should.equal( p[1][1][0], 0 );
		should.equal( p[1][1][1], 0 );
		should.equal( p[1][1][2], 0 );

		should.equal( p[2][0][0], 0 );
		should.equal( p[2][0][1], 0 );
		should.equal( p[2][0][2], 0 );

		p = verb.eval.Eval.rationalSurfaceDerivatives( surface, 1, 1, num_derivatives);

		should.equal( p[0][2][0], 0 );
		should.equal( p[0][2][1], 1 );
		should.equal( p[0][2][2], -1 );

		should.equal( p[1][1][0], 0 );
		should.equal( p[1][1][1], 0 );
		should.equal( p[1][1][2], 0 );

		should.equal( p[2][0][0], 0 );
		should.equal( p[2][0][1], 0 );
		should.equal( p[2][0][2], 0 );

	});

});

describe("verb.eval.Eval.rationalCurvePoint",() => {

    it('returns correct results for a line', () => {

        var degree = 1
            , knots = [0, 0, 1, 1]
            , controlPoints = [ [0, 0, 0, 1], [10, 0, 0, 1] ]
            , weights = [1, 1]
            , u1 = 0.0
            , u2 = 0.5
            , u3 = 1.0
            , crv = new verb.core.NurbsCurveData( degree, knots, controlPoints );

        var p1 = verb.eval.Eval.rationalCurvePoint( crv, u1);
        var p2 = verb.eval.Eval.rationalCurvePoint( crv, u2);
        var p3 = verb.eval.Eval.rationalCurvePoint( crv, u3);

        should.equal(p1[0], 0);
        should.equal(p2[0], 5);
        should.equal(p3[0], 10);

    });

});

describe("verb.eval.Modify.curveKnotInsert",() => {

    it('returns expected results when inserting 1 knot in the middle of a non-rational, cubic b-spline', () => {

        var degree = 3
            , u = 2.5
            , knots = [ 0, 0, 0, 0, 1, 2, 3, 4, 5, 5, 5, 5 ]
            , r = 1;

        var controlPoints = [];
        for (var i = 0; i < 8; i++) controlPoints.push([i, 0, 0]);

        var crv = new verb.core.NurbsCurveData( degree, knots, controlPoints );

        var after = verb.eval.Modify.curveKnotInsert( crv, u, r );

        after.controlPoints.forEach(function(cp){ should.exist(cp); });
        after.knots.forEach(function(cp){ should.exist(cp); });

        should.equal(knots.length + r, after.knots.length);
        should.equal(controlPoints.length + r, after.controlPoints.length);

        after.controlPoints[3][0].should.be.approximately( 2.8333333333, verb.core.Constants.TOLERANCE );
        after.controlPoints[4][0].should.be.approximately( 3.5, verb.core.Constants.TOLERANCE );
        after.controlPoints[5][0].should.be.approximately( 4.1666666666, verb.core.Constants.TOLERANCE );

        var p0 = verb.eval.Eval.curvePoint( crv, 2.5);
        var p1 = verb.eval.Eval.curvePoint( after, 2.5);

        p0[0].should.be.approximately(p1[0], verb.core.Constants.TOLERANCE);
        p0[1].should.be.approximately(p1[1], verb.core.Constants.TOLERANCE);
        p0[2].should.be.approximately(p1[2], verb.core.Constants.TOLERANCE);

    });

    it('returns expected results when inserting 3 knots at the middle of a non-rational, cubic b-spline', () => {

        var degree = 3
            , u = 2.5
            , knots = [ 0, 0, 0, 0, 1, 2, 3, 4, 5, 5, 5, 5 ]
            , r = 3;

        var controlPoints = [];
        for (var i = 0; i < 8; i++) controlPoints.push([i, 0, 0]);

        var crv = new verb.core.NurbsCurveData( degree, knots, controlPoints );

        var after = verb.eval.Modify.curveKnotInsert( crv, u, r );

        after.controlPoints.forEach(function(cp){ should.exist(cp); });
        after.knots.forEach(function(cp){ should.exist(cp); });

        should.equal(knots.length + r, after.knots.length);
        should.equal(controlPoints.length + r, after.controlPoints.length);

        var p0 = verb.eval.Eval.curvePoint( crv, 2.5);
        var p1 = verb.eval.Eval.curvePoint( after, 2.5);

        p0[0].should.be.approximately(p1[0], verb.core.Constants.TOLERANCE);
        p0[1].should.be.approximately(p1[1], verb.core.Constants.TOLERANCE);
        p0[2].should.be.approximately(p1[2], verb.core.Constants.TOLERANCE);

    });

    it('returns expected results when inserting 1 knots at the beginning of a non-rational, cubic b-spline', () => {

        var degree = 3
            , u = 0.5
            , knots = [ 0, 0, 0, 0, 1, 2, 3, 4, 5, 5, 5, 5 ]
            , r = 1;

        var controlPoints = [];
        for (var i = 0; i < 8; i++) controlPoints.push([i, 0, 0]);

        var crv = new verb.core.NurbsCurveData( degree, knots, controlPoints );
        var after = verb.eval.Modify.curveKnotInsert( crv, u, r );

        after.controlPoints.forEach(function(cp){ should.exist(cp); });
        after.knots.forEach(function(cp){ should.exist(cp); });

        should.equal(knots.length + r, after.knots.length);
        should.equal(controlPoints.length + r, after.controlPoints.length);

        var p0 = verb.eval.Eval.curvePoint( crv, 2.5);
        var p1 = verb.eval.Eval.curvePoint( after, 2.5);

        p0[0].should.be.approximately(p1[0], verb.core.Constants.TOLERANCE);
        p0[1].should.be.approximately(p1[1], verb.core.Constants.TOLERANCE);
        p0[2].should.be.approximately(p1[2], verb.core.Constants.TOLERANCE);

    });

    it('returns expected results when inserting 1 knot at the middle of a non-rational, linear b-spline', () => {

        var degree = 1
            , u = 0.5
            , knots = [ 0, 0, 1, 2, 3, 4, 5, 5 ]
            , r = 1;

        var controlPoints = [];
        for (var i = 0; i < 6; i++) controlPoints.push([i, 0, 0]);

        var crv = new verb.core.NurbsCurveData( degree, knots, controlPoints );
        var after = verb.eval.Modify.curveKnotInsert( crv, u, r );

        after.controlPoints.forEach(function(cp){ should.exist(cp); });
        after.knots.forEach(function(cp){ should.exist(cp); });

        should.equal(knots.length + r, after.knots.length);
        should.equal(controlPoints.length + r, after.controlPoints.length);

        var p0 = verb.eval.Eval.curvePoint( crv, 2.5);
        var p1 = verb.eval.Eval.curvePoint( after, 2.5);

        p0[0].should.be.approximately(p1[0], verb.core.Constants.TOLERANCE);
        p0[1].should.be.approximately(p1[1], verb.core.Constants.TOLERANCE);
        p0[2].should.be.approximately(p1[2], verb.core.Constants.TOLERANCE);

    });
});


describe("verb.eval.Divide.curveSplit",() => {

    function cubicSplit(u){

        var degree = 3
            , knots = [ 0, 0, 0, 0, 1, 2, 3, 4, 5, 5, 5, 5 ];

        var controlPoints = [];
        for (var i = 0; i < 8; i++) controlPoints.push([i, 0, 0, 1]);

        var crv = new verb.core.NurbsCurveData( degree, knots, controlPoints );
        var after = verb.eval.Divide.curveSplit( crv, u );

        for (var i = 0; i < degree + 1; i++ ){
            var d = after[0].knots.length - (degree+1);
            after[0].knots[d+i].should.be.approximately(u, verb.core.Constants.TOLERANCE);
        }

        for (var i = 0; i < degree + 1; i++){
            var d = 0;
            after[1].knots[d+i].should.be.approximately(u, verb.core.Constants.TOLERANCE);
        }

        // a point evaluated on each curve is the same
        var p0 = verb.eval.Eval.curvePoint( after[0], after[0].knots[ after[0].knots.length-1] );
        var p1 = verb.eval.Eval.curvePoint( after[1], after[1].knots[ 0] );

        p0[0].should.be.approximately(p1[0], verb.core.Constants.TOLERANCE);
        p0[1].should.be.approximately(p1[1], verb.core.Constants.TOLERANCE);
        p0[2].should.be.approximately(p1[2], verb.core.Constants.TOLERANCE);

    }

    it('returns expected results when splitting a non-rational, cubic b-spline', () => {

        cubicSplit( 0.5 );
        cubicSplit( 3.5 );

    });

});

describe("verb.eval.Analyze.knotMultiplicities",() => {

    it('is correct for a basic example', () => {

        var res = verb.eval.Analyze.knotMultiplicities( [ 0, 0, 0, 0, 1, 1, 2, 2, 2, 3, 3.3] );

        res.length.should.be.equal( 5 );

        res[0].knot.should.be.equal( 0 );
        res[0].mult.should.be.equal( 4 );

        res[1].knot.should.be.equal( 1 );
        res[1].mult.should.be.equal( 2 );

        res[2].knot.should.be.equal( 2 );
        res[2].mult.should.be.equal( 3 );

        res[3].knot.should.be.equal( 3 );
        res[3].mult.should.be.equal( 1 );

        res[4].knot.should.be.equal( 3.3 );
        res[4].mult.should.be.equal( 1 );

    });
});

describe("verb.core.Mat.transpose",() => {
    it('is correct for a basic example', () => {
        var a = [ [6,5,4], [1,2,3] ];
        verb.core.Mat.transpose(a).should.eql( [[6,1], [5,2], [4,3]])
    });


    it('is correct for empty array', () => {
        verb.core.Mat.transpose([]).should.eql( [] );
    });
});


describe("verb.eval.Divide.surfaceSplit", () => {

    var degree = 3
        , knotsV = [0, 0, 0, 0, 0.333, 0.666, 1, 1, 1, 1]
        , knotsU = [0, 0, 0, 0, 0.5, 1, 1, 1, 1]
        , controlPoints = [
                    [ [0, 0, -10],  [10, 0, 0],         [20, 0, 0],         [30, 0, 0] ,        [40, 0, 0],         [50, 0, 0] ],
                    [ [0, -10, 0],  [10, -10, 10],  [20, -10, 10],  [30, -10, 0] ,  [40, -10, 0],   [50, -10, 0]    ],
                    [ [0, -20, 0],  [10, -20, 10],  [20, -20, 10],  [30, -20, 0] ,  [40, -20, -2],  [50, -20, 0]    ],
                    [ [0, -30, 0],  [10, -30, 0],   [20, -30, -23], [30, -30, 0] ,  [40, -30, 0],   [50, -30, 0]     ],
                    [ [0, -40, 0],  [10, -40, 0],   [20, -40, 0],   [30, -40, 4] ,  [40, -40, -20], [50, -40, 0]     ] ]
        , surface = new verb.core.NurbsSurfaceData( degree, degree, knotsU, knotsV, controlPoints );

    it('can split a surface in the u direction', () => {

        var u = 0.2;

        var res = verb.eval.Divide.surfaceSplit( surface, u, false );

        res[0].controlPoints.forEach(function(cp){ should.exist(cp); });
        res[0].knotsU.forEach(function(cp){ should.exist(cp); });
        res[0].knotsV.forEach(function(cp){ should.exist(cp); });
        should.exist( res[0].degreeU );
        should.exist( res[0].degreeV );

        res[1].controlPoints.forEach(function(cp){ should.exist(cp); });
        res[1].knotsU.forEach(function(cp){ should.exist(cp); });
        res[1].knotsV.forEach(function(cp){ should.exist(cp); });
        should.exist( res[1].degreeU );
        should.exist( res[1].degreeV );

        var p0 = verb.eval.Eval.surfacePoint( surface, 0.1, 0.1 );
        var p1 = verb.eval.Eval.surfacePoint( res[0], 0.1, 0.1);

        p0[0].should.be.approximately(p1[0], verb.core.Constants.TOLERANCE);
        p0[1].should.be.approximately(p1[1], verb.core.Constants.TOLERANCE);
        p0[2].should.be.approximately(p1[2], verb.core.Constants.TOLERANCE);

        p0 = verb.eval.Eval.surfacePoint( surface, 0.8, 0.8 );
        p1 = verb.eval.Eval.surfacePoint( res[1], 0.8, 0.8);

        p0[0].should.be.approximately(p1[0], verb.core.Constants.TOLERANCE);
        p0[1].should.be.approximately(p1[1], verb.core.Constants.TOLERANCE);
        p0[2].should.be.approximately(p1[2], verb.core.Constants.TOLERANCE);


    });

    it('can split a surface in the v direction', () => {

        var u = 0.2;

        var res = verb.eval.Divide.surfaceSplit( surface, u, true );

        res[0].controlPoints.forEach(function(cp){ should.exist(cp); });
        res[0].knotsU.forEach(function(cp){ should.exist(cp); });
        res[0].knotsV.forEach(function(cp){ should.exist(cp); });
        should.exist( res[0].degreeU );
        should.exist( res[0].degreeV );

        res[1].controlPoints.forEach(function(cp){ should.exist(cp); });
        res[1].knotsU.forEach(function(cp){ should.exist(cp); });
        res[1].knotsV.forEach(function(cp){ should.exist(cp); });
        should.exist( res[1].degreeU );
        should.exist( res[1].degreeV );

        var p0 = verb.eval.Eval.surfacePoint( surface, 0.1, 0.1 );
        var p1 = verb.eval.Eval.surfacePoint( res[0], 0.1, 0.1);

        p0[0].should.be.approximately(p1[0], verb.core.Constants.TOLERANCE);
        p0[1].should.be.approximately(p1[1], verb.core.Constants.TOLERANCE);
        p0[2].should.be.approximately(p1[2], verb.core.Constants.TOLERANCE);

        p0 = verb.eval.Eval.surfacePoint( surface, 0.8, 0.8 );
        p1 = verb.eval.Eval.surfacePoint( res[1], 0.8, 0.8);

        p0[0].should.be.approximately(p1[0], verb.core.Constants.TOLERANCE);
        p0[1].should.be.approximately(p1[1], verb.core.Constants.TOLERANCE);
        p0[2].should.be.approximately(p1[2], verb.core.Constants.TOLERANCE);


    });

});

describe("verb.eval.Eval.rationalCurveRegularSample",() => {
    it('should return 11 samples when asked to', () => {

        var degree = 2
            , knots = [0, 0, 0, 1, 1, 1 ]
            , controlPoints = [ [1, 0, 0, 1], [1, 1, 0, 1], [0, 2, 0, 2] ]
            , numSamples = 10
            , curve = new verb.core.NurbsCurveData( degree, knots, controlPoints );

        var p = verb.eval.Tess.rationalCurveRegularSample( curve, numSamples);

        should.equal(p.length, 11);

        p.map( function(e){  e.length.should.be.equal(3); });

    });
});

describe("verb.eval.Eval.threePointsAreFlat",() => {

    it('should identify flat line by returning true', () => {

        // this represents a single quarter arc, using a rational bezier curve
        var p1 = [0,0,0],
            p2 = [0,2,0],
            p3 = [0,4,0];

        should.equal(true, verb.core.Trig.threePointsAreFlat(p1,p2,p3,1e-5));

    });

});

describe("verb.eval.Tess.rationalCurveAdaptiveSample",() => {

    it('returns two end points for a line', () => {

        var degree = 1
            , knots = [0, 0, 1, 1]
            , controlPoints = [ [0, 0, 0, 1], [10, 0, 0, 1] ]
            , curve = new verb.core.NurbsCurveData( degree, knots, controlPoints );

        var p = verb.eval.Tess.rationalCurveAdaptiveSample( curve, 1e-5);

        should.equal(p[0][0], 0);
        should.equal(p[1][0], 10);

        p.map( function(e){  e.length.should.be.equal(3); });

    });

    it('returns all the control points for a degree 1 curve', () => {

        var degree = 1
            , knots = [0, 0, 0.25, 0.5, 0.75, 1, 1]
            , controlPoints = [ [0, 0, 0, 1], [10, 10, 0, 1], [14, 20, 0, 1], [10, 32, 4, 1], [12, 16, 22, 1]]
            , curve = new verb.core.NurbsCurveData( degree, knots, controlPoints );

        var p = verb.eval.Tess.rationalCurveAdaptiveSample( curve, 1e-5);

        p.should.be.instanceof(Array).and.have.lengthOf(5);
        p[0].should.be.instanceof(Array).and.have.lengthOf(3);
        p[0].should.eql([0,0,0]);
        p[4].should.eql([12,16,22]);

        p.map( function(e){  e.length.should.be.equal(3); });

    });

    it('makes more points for an arc', () => {

        var degree = 2
            , knots = [0, 0, 0, 1, 1, 1 ]
            , v = Math.sqrt(2) / 2
            , controlPoints = [ [1, 0, 0, 1], [v, v, 0, v], [0, 1, 0, 1] ]
            , curve = new verb.core.NurbsCurveData( degree, knots, controlPoints );

        var p = verb.eval.Tess.rationalCurveAdaptiveSample( curve, 1e-8, true);
        var p2 = verb.eval.Tess.rationalCurveAdaptiveSample( curve, 1e-4, true);

        var prev = - 1e-8;
        for (var i = 0; i < p.length; i++){
            p[i][3].should.be.above(prev);
            p[i][3].should.be.within(-1e-8, 1 + 1e-8);
            prev = p[i][3];
        }

        p.should.be.instanceof(Array).and.not.have.lengthOf(0);
        p2.should.be.instanceof(Array).and.not.have.lengthOf(0);
        p.should.be.instanceof(Array).and.not.have.lengthOf(p2.length);

        p[p.length-1][3].should.be.approximately(1.0, 1e-6);
        p2[p2.length-1][3].should.be.approximately(1.0, 1e-6);

        p.map( function(e){  e.length.should.be.equal(4); });
        p2.map( function(e){  e.length.should.be.equal(4); });

    });

});

describe("verb.eval.Tess.rationalSurfaceAdaptive",() => {

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

    it('produces a mesh from a divided surface', () => {

        var srf = getComplexSurface();

        var mesh = verb.eval.Tess.rationalSurfaceAdaptive( srf, { minDivsU: 1, minDivsV: 4 } );

        mesh.faces.length.should.be.greaterThan( 8 );
        mesh.points.forEach(function(x){ x.length.should.be.equal( 3 ); })
        mesh.points.length.should.be.equal( mesh.normals.length );
        mesh.uvs.length.should.be.equal( mesh.normals.length );

    });
});

describe("verb.eval.Make.ellipseArc",() => {

    it('returns correct result for unit arc from 0 to 90 deg', () => {

        var center = [0,0,0]
            , rx = 5
            , ry = 1
            , x = [rx,0,0]
            , y = [0,ry,0]
            , start = 0
            , end = Math.PI/2;

        var ellipse = verb.eval.Make.ellipseArc(center, x, y, start, end);

        // the typical parametric rep of an ellipse
        var xmid = rx * Math.cos( Math.PI / 4 )
            , ymid = ry * Math.sin( Math.PI / 4 );

        var p = verb.eval.Eval.rationalCurvePoint( ellipse, 0.5);

        p[0].should.be.approximately( xmid, verb.core.Constants.EPSILON );
        p[1].should.be.approximately( ymid, verb.core.Constants.EPSILON );
        p[2].should.be.approximately( 0, verb.core.Constants.EPSILON );

        p = verb.eval.Eval.rationalCurvePoint( ellipse, 1);

        p[0].should.be.approximately( 0, verb.core.Constants.EPSILON );
        p[1].should.be.approximately( ry, verb.core.Constants.EPSILON );
        p[2].should.be.approximately( 0, verb.core.Constants.EPSILON );

        p = verb.eval.Eval.rationalCurvePoint( ellipse, 0);

        p[0].should.be.approximately( rx, verb.core.Constants.EPSILON );
        p[1].should.be.approximately( 0, verb.core.Constants.EPSILON );
        p[2].should.be.approximately( 0, verb.core.Constants.EPSILON );

    });

    it('returns correct result for unit arc from 0 to 90 deg', () => {

        var center = [0,0,0]
            , rx = 5
            , ry = 1
            , x = [rx,0,0]
            , y = [0,ry,0]
            , start = 0
            , end = Math.PI / 2;

        var arc = verb.eval.Make.ellipseArc(center, x, y, start, end);

        var p = verb.eval.Eval.rationalCurvePoint( arc, 1);

        p[0].should.be.approximately( 0, verb.core.Constants.EPSILON );
        p[1].should.be.approximately( ry, verb.core.Constants.EPSILON );
        p[2].should.be.approximately( 0, verb.core.Constants.EPSILON );

    });

    it('returns correct result for unit arc from 45 to 135 deg', () => {

        var center = [0,0,0]
            , rx = 1
            , ry = 10
            , x = [rx,0,0]
            , y = [0,ry,0]
            , start = Math.PI/4
            , end = 3 * Math.PI/4;

        var arc = verb.eval.Make.ellipseArc(center, x, y, start, end);

        var p = verb.eval.Eval.rationalCurvePoint( arc, 1);

        // the typical parametric rep of an ellipse
        var xmid = rx * Math.cos( 3 * Math.PI / 4 )
            , ymid = ry * Math.sin( 3 * Math.PI / 4 );

        p[0].should.be.approximately( xmid, verb.core.Constants.EPSILON );
        p[1].should.be.approximately( ymid, verb.core.Constants.EPSILON );
        p[2].should.be.approximately( 0, verb.core.Constants.EPSILON );

    });

    it('returns correct result for complete ellipse', () => {

        var center = [0,0,0]
            , rx = 1
            , ry = 10
            , x = [rx,0,0]
            , y = [0,ry,0]
            , start = 0
            , end = Math.PI * 2;

        var ellipse = verb.eval.Make.ellipseArc(center, x, y, start, end);

        // the typical parametric rep of an ellipse
        var xmid = rx * Math.cos( Math.PI / 4 )
            , ymid = ry * Math.sin( Math.PI / 4 );

        var p = verb.eval.Eval.rationalCurvePoint( ellipse, 0.125);

        p[0].should.be.approximately( xmid, verb.core.Constants.EPSILON );
        p[1].should.be.approximately( ymid, verb.core.Constants.EPSILON );
        p[2].should.be.approximately( 0, verb.core.Constants.EPSILON );

        p = verb.eval.Eval.rationalCurvePoint( ellipse, 0.25);

        p[0].should.be.approximately( 0, verb.core.Constants.EPSILON );
        p[1].should.be.approximately( ry, verb.core.Constants.EPSILON );
        p[2].should.be.approximately( 0, verb.core.Constants.EPSILON );

        p = verb.eval.Eval.rationalCurvePoint( ellipse, 0.5);

        p[0].should.be.approximately( -rx, verb.core.Constants.EPSILON );
        p[1].should.be.approximately( 0, verb.core.Constants.EPSILON );
        p[2].should.be.approximately( 0, verb.core.Constants.EPSILON );

        p = verb.eval.Eval.rationalCurvePoint( ellipse, 0);

        p[0].should.be.approximately( rx, verb.core.Constants.EPSILON );
        p[1].should.be.approximately( 0, verb.core.Constants.EPSILON );
        p[2].should.be.approximately( 0, verb.core.Constants.EPSILON );

    });

});

describe("verb.eval.Make.extrudedSurface",() => {

    it('can extrude a line into a plane', () => {

        var axis = [0,0,1]
            , length = 5
            , prof_degree = 1
            , prof_ctrl_pts = [[0,1,0,1], [1,0,0,1]]
            , prof_knots = [0,0,1,1]
            , profile = new verb.core.NurbsCurveData( prof_degree, prof_knots, prof_ctrl_pts  );

        var comps = verb.eval.Make.extrudedSurface(axis, length, profile);

        // the first row are the profile control pts
        should.equal( 0, comps.controlPoints[2][0][0] );
        should.equal( 1, comps.controlPoints[2][0][1] );
        should.equal( 0, comps.controlPoints[2][0][2] );

        should.equal( 1, comps.controlPoints[2][1][0] );
        should.equal( 0, comps.controlPoints[2][1][1] );
        should.equal( 0, comps.controlPoints[2][1][2] );

        // sample at the center
        var p = verb.eval.Eval.rationalSurfacePoint( comps, 0.5, 0.5);

        should.equal( Math.abs( 0.5 - p[0]) < verb.core.Constants.EPSILON, true );
        should.equal( Math.abs( 0.5 - p[1]) < verb.core.Constants.EPSILON, true );
        should.equal( Math.abs( 2.5 - p[2]) < verb.core.Constants.EPSILON, true );

    });

    it('can extrude a 90 deg quadratic arc bezier curve', () => {

        var axis = [0,0,1]
            , length = 5
            , prof_degree = 2
            , prof_ctrl_pts = [[0,1,0], [1,1,0], [1,0,0]]
            , prof_knots = [0,0,0,1,1,1]
            , prof_weights = [1, Math.sqrt(2) / 2, 1]
            , profile = new verb.core.NurbsCurveData( prof_degree, prof_knots,
                                                    verb.eval.Eval.homogenize1d(prof_ctrl_pts, prof_weights)  );

        var comps = verb.eval.Make.extrudedSurface(axis, length, profile);

        // the first row are the profile control pts
        should.equal( 0, comps.controlPoints[2][0][0] );
        should.equal( 1, comps.controlPoints[2][0][1] );
        should.equal( 0, comps.controlPoints[2][0][2] );
        should.equal( 1, comps.controlPoints[2][0][3] );

        should.equal( Math.sqrt(2) / 2, comps.controlPoints[2][1][0] );
        should.equal( Math.sqrt(2) / 2, comps.controlPoints[2][1][1] );
        should.equal( 0, comps.controlPoints[2][1][2] );
        should.equal( Math.sqrt(2) / 2, comps.controlPoints[2][1][3] );

        should.equal( 1, comps.controlPoints[2][2][0] );
        should.equal( 0, comps.controlPoints[2][2][1] );
        should.equal( 0, comps.controlPoints[2][2][2] );
        should.equal( 1, comps.controlPoints[2][2][3] );

        // sample at the center
        var p = verb.eval.Eval.rationalSurfacePoint( comps, 0.5, 0.5);

        should.equal( Math.abs( Math.sqrt(2)/2 - p[0]) < verb.core.Constants.EPSILON, true );
        should.equal( Math.abs( Math.sqrt(2)/2 - p[1]) < verb.core.Constants.EPSILON, true );
        should.equal( Math.abs( 2.5 - p[2]) < verb.core.Constants.EPSILON, true );

    });

});

describe("verb.eval.Make.arc",() => {

    it('returns correct result for unit arc from 0 to 90 deg', () => {

        var center = [0,0,0]
            , x = [1,0,0]
            , y = [0,1,0]
            , r = 1
            , start = 0
            , end = Math.PI/2;

        var arc = verb.eval.Make.arc(center, x, y, 1, start, end);

        var p = verb.eval.Eval.rationalCurvePoint( arc, 0.5);

        should.equal( Math.abs( p[0] - Math.sqrt(2)/2 ) < verb.core.Constants.EPSILON, true );
        should.equal( Math.abs( p[1] - Math.sqrt(2)/2 ) < verb.core.Constants.EPSILON, true );
        should.equal( p[2], 0 );

    });

    it('returns correct result for unit arc from 0 to 45 deg', () => {

        var center = [0,0,0]
            , x = [1,0,0]
            , y = [0,1,0]
            , r = 1
            , start = 0
            , end = Math.PI/4;

        var arc = verb.eval.Make.arc(center, x, y, 1, start, end);

        var p = verb.eval.Eval.rationalCurvePoint( arc, 1);

        should.equal( Math.abs( p[0] - Math.sqrt(2)/2 ) < verb.core.Constants.EPSILON, true );
        should.equal( Math.abs( p[1] - Math.sqrt(2)/2 ) < verb.core.Constants.EPSILON, true );
        should.equal( p[2], 0 );

    });

    it('returns correct result for unit arc from 45 to 135 deg', () => {

        var center = [0,0,0]
            , x = [1,0,0]
            , y = [0,1,0]
            , r = 1
            , start = Math.PI/4
            , end = 3 * Math.PI/4;

        var arc = verb.eval.Make.arc(center, x, y, 1, start, end);

        var p = verb.eval.Eval.rationalCurvePoint( arc, 0.5);

        should.equal( Math.abs( p[0] ) < verb.core.Constants.EPSILON, true );
        should.equal( Math.abs( p[1] - 1 ) < verb.core.Constants.EPSILON, true );
        should.equal( p[2], 0 );

    });

    it('returns correct result for unit circle', () => {

        var center = [0,0,0]
            , x = [1,0,0]
            , y = [0,1,0]
            , r = 5
            , start = 0
            , end = Math.PI;

        var arc = verb.eval.Make.arc(center, x, y, r, start, end);

        var p = verb.eval.Eval.rationalCurvePoint( arc, 0.5);

        p[0].should.be.approximately( 0, verb.core.Constants.EPSILON );
        p[1].should.be.approximately( 5 , verb.core.Constants.EPSILON);
        p[2].should.be.approximately( 0, verb.core.Constants.EPSILON );

    });

    it('returns correct result for unit circle', () => {

        var center = [0,0,0]
            , x = [1,0,0]
            , y = [0,1,0]
            , r = 1
            , start = 0
            , end = Math.PI * 2;

        var arc = verb.eval.Make.arc(center, x, y, 1, start, end);

        var p = verb.eval.Eval.rationalCurvePoint( arc, 0.5);

        should.equal( Math.abs( p[0] + 1) < verb.core.Constants.EPSILON, true );
        should.equal( Math.abs( p[1] ) < verb.core.Constants.EPSILON, true );
        should.equal( p[2], 0 );

    });

});

describe("verb.eval.Make.polyline",() => {

    it('can create a polyline with correct structure', () => {

        var degree = 1
            , knots = [0, 0, 0.25, 0.5, 0.75, 1, 1]
            , controlPoints = [ [0, 0, 0], [10, 10, 0], [14, 20, 0], [10, 32, 4], [12, 16, 22] ]
            , weights = [1, 1, 1, 1, 1];

        var comps = verb.eval.Make.polyline( controlPoints );

        comps.degree.should.equal(degree);
        comps.controlPoints.should.eql( verb.eval.Eval.homogenize1d( controlPoints, weights ));

        // natural parameterization
        for (var i = 1; i < knots.length-1; i++){
            vecShouldBe( controlPoints[i-1], verb.eval.Eval.rationalCurvePoint(comps, comps.knots[i] ) );
        }

    });

});

describe("verb.eval.Make.cylindricalSurface",() => {

    it('can create a cylinder', () => {

        var axis = [0,0,1]
            , xaxis = [1,0,0]
            , base = [0,0,0]
            , height = 5
            , radius = 5;

        var comps = verb.eval.Make.cylindricalSurface(axis, xaxis, base, height, radius);

        comps.degreeU.should.equal(2);
        comps.degreeV.should.equal(2);

        // sample at the center
        var p = verb.eval.Eval.rationalSurfacePoint( comps, 0.5, 0.5);

        p[0].should.be.approximately(-radius, verb.core.Constants.EPSILON);
        p[1].should.be.approximately(0, verb.core.Constants.EPSILON);
        p[2].should.be.approximately(radius/2, verb.core.Constants.EPSILON);

        p = verb.eval.Eval.rationalSurfacePoint( comps,
                                                        0,
                                                        0);

        p[0].should.be.approximately(radius, verb.core.Constants.EPSILON);
        p[1].should.be.approximately(0, verb.core.Constants.EPSILON);
        p[2].should.be.approximately(height, verb.core.Constants.EPSILON);

        p = verb.eval.Eval.rationalSurfacePoint( comps,
                                                        1,
                                                        0);

        p[0].should.be.approximately(radius, verb.core.Constants.EPSILON);
        p[1].should.be.approximately(0, verb.core.Constants.EPSILON);
        p[2].should.be.approximately(0, verb.core.Constants.EPSILON);

        p = verb.eval.Eval.rationalSurfacePoint( comps,
                                                        0,
                                                        1);

        p[0].should.be.approximately(radius, verb.core.Constants.EPSILON);
        p[1].should.be.approximately(0, verb.core.Constants.EPSILON);
        p[2].should.be.approximately(height, verb.core.Constants.EPSILON);

    });

});

describe("verb.eval.Make.revolvedSurface",() => {

    it('creates a 90 degree cone with the given line for a profile', () => {

        var axis = [0,0,1]
            , center = [0,0,0]
            , angle = Math.PI/2
            , prof_degree = 1
            , prof_ctrl_pts = [[0,0,1,1], [1,0,0,1]]
            , prof_knots = [0,0,1,1]
            , profile = new verb.core.NurbsCurveData( prof_degree, prof_knots, prof_ctrl_pts );

        var comps = verb.eval.Make.revolvedSurface(profile, center, axis, angle );

        // the first row are the profile control pts
        should.equal( 0, comps.controlPoints[0][0][0] );
        should.equal( 0, comps.controlPoints[0][0][1] );
        should.equal( 1, comps.controlPoints[0][0][2] );
        should.equal( 1, comps.controlPoints[0][0][3] );

        should.equal( 1, comps.controlPoints[0][1][0] );
        should.equal( 0, comps.controlPoints[0][1][1] );
        should.equal( 0, comps.controlPoints[0][1][2] );
        should.equal( 1, comps.controlPoints[0][1][3] );

        var p = verb.eval.Eval.rationalSurfacePoint( comps,
                                                        0.5,
                                                        0.5);

        should.equal( Math.abs( Math.sqrt(2)/4 - p[0]) < verb.core.Constants.EPSILON, true );
        should.equal( Math.abs( Math.sqrt(2)/4 - p[1]) < verb.core.Constants.EPSILON, true );
        should.equal( Math.abs( 0.5 - p[2]) < verb.core.Constants.EPSILON, true );

    });

    it('creates a 180 degree cone with the given line for a profile', () => {

        var axis = [0,0,1]
            , center = [0,0,0]
            , angle = Math.PI
            , prof_degree = 1
            , prof_ctrl_pts = [[0,0,1,1], [1,0,0,1]]
            , prof_knots = [0,0,1,1]
            , profile = new verb.core.NurbsCurveData( prof_degree, prof_knots, prof_ctrl_pts );

        var comps = verb.eval.Make.revolvedSurface( profile, center, axis, angle );

        // the first row are the profile control pts
        should.equal( 0, comps.controlPoints[0][0][0] );
        should.equal( 0, comps.controlPoints[0][0][1] );
        should.equal( 1, comps.controlPoints[0][0][2] );
        should.equal( 1, comps.controlPoints[0][0][2] );

        should.equal( 1, comps.controlPoints[0][1][0] );
        should.equal( 0, comps.controlPoints[0][1][1] );
        should.equal( 0, comps.controlPoints[0][1][2] );
        should.equal( 0, comps.controlPoints[0][1][2] );

        var p = verb.eval.Eval.rationalSurfacePoint( comps,
                                                        0.5,
                                                        0.5);

        should.equal( p[0] < verb.core.Constants.EPSILON, true );
        should.equal( Math.abs( 0.5 - p[1]) < verb.core.Constants.EPSILON, true );
        should.equal( Math.abs( 0.5 - p[2]) < verb.core.Constants.EPSILON, true );

    });


    it('creates a 360 degree cone with the given line for a profile', () => {

        var axis = [0,0,1]
            , center = [0,0,0]
            , angle = Math.PI * 2
            , prof_degree = 1
            , prof_ctrl_pts = [[0,0,1,1], [1,0,0,1]]
            , prof_knots = [0,0,1,1]
            , profile = new verb.core.NurbsCurveData( prof_degree, prof_knots, prof_ctrl_pts );

        var comps = verb.eval.Make.revolvedSurface( profile, center, axis, angle );

        // the first row are the profile control pts
        should.equal( 0, comps.controlPoints[0][0][0] );
        should.equal( 0, comps.controlPoints[0][0][1] );
        should.equal( 1, comps.controlPoints[0][0][2] );
        should.equal( 1, comps.controlPoints[0][0][3] );

        should.equal( 1, comps.controlPoints[0][1][0] );
        should.equal( 0, comps.controlPoints[0][1][1] );
        should.equal( 0, comps.controlPoints[0][1][2] );
        should.equal( 1, comps.controlPoints[0][1][3] );

        var p = verb.eval.Eval.rationalSurfacePoint( comps,
                                                        0.5,
                                                        0.5);

        p[0].should.be.approximately(-0.5, verb.core.Constants.EPSILON );
        p[1].should.be.approximately(0, verb.core.Constants.EPSILON );
        p[2].should.be.approximately(0.5, verb.core.Constants.EPSILON );

    });

});

describe("verb.core.Trig.rayClosestPoint",() => {

    it('returns correct result for xaxis and 3d pt', () => {

        var r = [1,0,0]
            , o = [0,0,0]
            , pt = [3,4,-1];

        var proj = verb.core.Trig.rayClosestPoint(pt, o, r);

        should.equal( Math.abs( proj[0] - 3 ) < verb.core.Constants.EPSILON, true );
        should.equal( Math.abs( proj[1] ) < verb.core.Constants.EPSILON, true );
        should.equal( Math.abs( proj[2] ) < verb.core.Constants.EPSILON, true );

    });

});

describe("verb.core.Trig.distToRay",() => {

    it('returns correct result for xaxis and 3d pt', () => {

        var r = [1,0,0]
            , o = [0,0,0]
            , pt = [3,4,-1];

        var d = verb.core.Trig.distToRay(pt, o, r);

        d.should.be.approximately( Math.sqrt( 17 ), verb.core.Constants.TOLERANCE );

    });

});

describe("verb.eval.Make.conicalSurface",() => {

    it('can create a cone', () => {

        var axis = [0,0,1]
            , xaxis = [1,0,0]
            , base = [0,0,0]
            , height = 5
            , radius = 10;

        var comps = verb.eval.Make.conicalSurface(axis, xaxis, base, height, radius);

        comps.degreeU.should.equal(2);
        comps.degreeV.should.equal(1);

        // sample at the center
        var p = verb.eval.Eval.rationalSurfacePoint( comps,
                                                        0.5,
                                                        0.5);

        p[0].should.be.approximately(-radius/2, verb.core.Constants.EPSILON);
        p[1].should.be.approximately(0, verb.core.Constants.EPSILON);
        p[2].should.be.approximately(height/2, verb.core.Constants.EPSILON);

        p = verb.eval.Eval.rationalSurfacePoint( comps,
                                                        0,
                                                        0);

        p[0].should.be.approximately(0, verb.core.Constants.EPSILON);
        p[1].should.be.approximately(0, verb.core.Constants.EPSILON);
        p[2].should.be.approximately(height, verb.core.Constants.EPSILON);

        p = verb.eval.Eval.rationalSurfacePoint( comps,
                                                        1,
                                                        0);

        p[0].should.be.approximately(0, verb.core.Constants.EPSILON);
        p[1].should.be.approximately(0, verb.core.Constants.EPSILON);
        p[2].should.be.approximately(height, verb.core.Constants.EPSILON);

        p = verb.eval.Eval.rationalSurfacePoint( comps,
                                                        0,
                                                        1);

        p[0].should.be.approximately(radius, verb.core.Constants.EPSILON);
        p[1].should.be.approximately(0, verb.core.Constants.EPSILON);
        p[2].should.be.approximately(0, verb.core.Constants.EPSILON);
    });

});

describe("verb.eval.Make.sphericalSurface",() => {

    it('can create a unit sphere', () => {

        var center = [0,0,0]
            , axis = [0,0,1]
            , xaxis = [1,0,0]
            , radius = 1;

        var comps = verb.eval.Make.sphericalSurface(center, axis, xaxis, radius);

        comps.degreeU.should.equal(2);
        comps.degreeV.should.equal(2);

        // sample at the center
        var p = verb.eval.Eval.rationalSurfacePoint( comps,
                                                        0.5,
                                                        0.5);

        p[0].should.be.approximately(-1, verb.core.Constants.EPSILON );
        p[1].should.be.approximately(0, verb.core.Constants.EPSILON );
        p[2].should.be.approximately(0, verb.core.Constants.EPSILON );

    });

});


describe("verb.eval.Analyze.rationalBezierCurveArcLength",() => {

    it('can compute entire arc length of straight cubic bezier parameterized from 0 to 1', () => {

        var degree = 3
            , knots = [0,0,0,0,1,1,1,1]
            , controlPoints = [ [0,0,0,1], [1.5,0,0,1], [2,0,0,1], [3,0,0,1] ]
            , curve = new verb.core.NurbsCurveData( degree, knots, controlPoints );

        var res = verb.eval.Analyze.rationalBezierCurveArcLength( curve, 1 );

        res.should.be.approximately( 3, verb.core.Constants.TOLERANCE );

    });

    it('can compute entire arc length of straight cubic bezier parameterized from 1 to 4', () => {

        var degree = 3
            , knots = [1,1,1,1,4,4,4,4]
            , controlPoints = [ [0,0,0,1], [1,0,0,1], [2,0,0,1], [3,0,0,1] ]
            , curve = new verb.core.NurbsCurveData( degree, knots, controlPoints );

        var res = verb.eval.Analyze.rationalBezierCurveArcLength( curve, 4 );

        res.should.be.approximately( 3, verb.core.Constants.TOLERANCE );

    });

});

describe("verb.eval.Analyze.rationalCurveArcLength",() => {

    it('can compute entire arc length of straight nurbs curve parameterized from 0 to 2', () => {

        var degree = 3
            , knots = [0,0,0,0,0.5,2,2,2,2]
            , controlPoints = [ [0,0,0,1], [1.5,0,0,1], [1.8,0,0,1], [2,0,0,1], [3,0,0,1] ]
            , curve = new verb.core.NurbsCurveData( degree, knots, controlPoints );

        var u = 0;
        var steps = 2;
        var inc = (last(knots) - knots[0]) / (steps-1);
        for (var i = 0; i < steps; i++){
            var pt = verb.eval.Eval.rationalCurvePoint( curve, u );
            var res2 = verb.eval.Analyze.rationalCurveArcLength( curve, u );

            res2.should.be.approximately( verb.core.Vec.norm( pt ), verb.core.Constants.TOLERANCE );

            u += inc;
        }
    });

    it('can compute entire arc length of curved nurbs curve parameterized from 0 to 1', () => {

        var degree = 3
            , knots = [0,0,0,0,0.5,1,1,1,1]
            , controlPoints = [ [1,1,1,1], [1.5,0,1,1], [1.8,0,0,1], [2,0.1,5,1], [3.1,0,0,1] ]
            , curve = new verb.core.NurbsCurveData( degree, knots, controlPoints );

        var gaussLen = verb.eval.Analyze.rationalCurveArcLength( curve );

        // sample the curve with 10,000 pts
        var samples = verb.eval.Tess.rationalCurveRegularSample( curve, 10000 );

        var red = samples.reduce(function(acc, v){
            return { pt: v, l : acc.l + verb.core.Vec.norm( verb.core.Vec.sub( acc.pt, v ) ) };
        }, { pt: samples[0], l : 0 });

        gaussLen.should.be.approximately( red.l, 1e-3 )

    });

    it('can compute entire arc length of straight nurbs curve parameterized from 0 to 2', () => {

        var degree = 3
            , knots = [0,0,0,0,0.5,2,2,2,2]
            , controlPoints = [ [0,0,0,1], [1.5,0,0,1], [1.8,0,0,1], [2,0,0,1], [3,0,0,1] ]
            , curve = new verb.core.NurbsCurveData( degree, knots, controlPoints );

        var u = 0;
        var steps = 10;
        var inc = (last(knots) - knots[0]) / (steps-1);
        for (var i = 0; i < steps; i++){

            var pt = verb.eval.Eval.rationalCurvePoint( curve, u );
            var res2 = verb.eval.Analyze.rationalCurveArcLength( curve, u );

            res2.should.be.approximately( verb.core.Vec.norm( pt ), verb.core.Constants.TOLERANCE );

            u += inc;
        }

    });

});

describe("verb.eval.Analyze.rationalBezierCurveParamAtArcLength",() => {

    it('can compute parameter at arc length of straight bezier curve', () => {

        var degree = 3
            , knots = [0,0,0,0,1,1,1,1]
            , controlPoints = [ [0,0,0,1], [1.5,0,0,1], [2,0,0,1], [3,0,0,1] ]
            , curve = new verb.core.NurbsCurveData( degree, knots, controlPoints );

        var tol = 1e-3;
        var d = 0;
        var steps = 10;
        var inc = 3 / (steps-1);;

        for (var i = 0; i < steps; i++){

            var u = verb.eval.Analyze.rationalBezierCurveParamAtArcLength(curve, d, tol);
            var len = verb.eval.Analyze.rationalBezierCurveArcLength(curve, u);

            len.should.be.approximately( d, tol );

            d += inc;
        }

    });

    it('can compute parameter at arc length of curved bezier curve', () => {

        var degree = 3
            , knots = [0,0,0,0,1,1,1,1]
            , controlPoints = [ [1,0,0,1], [1,0,-1,1], [2,0,0,1], [5,0,0,1] ]
            , curve = new verb.core.NurbsCurveData( degree, knots, controlPoints );

        var tol = 1e-3;
        var d = 0;
        var steps = 10;
        var inc = 3 / (steps-1);

        for (var i = 0; i < steps; i++){

            var u = verb.eval.Analyze.rationalBezierCurveParamAtArcLength(curve, d, tol);
            var len = verb.eval.Analyze.rationalBezierCurveArcLength(curve, u);

            len.should.be.approximately( d, tol );

            d += inc;
        }

    });

});

describe("verb.eval.Analyze.rationalCurveParamAtArcLength",() => {

    it('can compute parameter at arc length of straight NURBS curve', () => {

        var degree = 3
            , knots = [0,0,0,0,0.5,1,1,1,1]
            , controlPoints = [ [0,0,0,1], [1,0,0,1], [2,0,0,1], [3,0,0,1], [4,0,0,1] ]
            , curve = new verb.core.NurbsCurveData( degree, knots, controlPoints );

        var tol = 1e-3;
        var d = 0;
        var steps = 10;
        var inc = 4 / (steps-1);

        var u = verb.eval.Analyze.rationalCurveParamAtArcLength(curve, 2, tol);

        for (var i = 0; i < steps; i++){

            var u = verb.eval.Analyze.rationalCurveParamAtArcLength(curve, d, tol);
            var len = verb.eval.Analyze.rationalCurveArcLength(curve, u);

            len.should.be.approximately( d, tol );

            d += inc;
        }

    });

    it('can compute parameter at arc length of curved NURBS curve', () => {

        var degree = 3
            , knots = [0,0,0,0,0.5,1,1,1,1]
            , controlPoints = [ [1,0,0,1], [1,0,-1,1], [2,0,0,1], [3,0,1,1], [5,0,0,1] ]
            , curve = new verb.core.NurbsCurveData( degree, knots, controlPoints );

        var tol = 1e-3;
        var d = 0;
        var steps = 10;
        var inc = 3 / (steps-1);

        for (var i = 0; i < steps; i++){

            var u = verb.eval.Analyze.rationalCurveParamAtArcLength(curve, d, tol);
            var len = verb.eval.Analyze.rationalCurveArcLength(curve, u);

            len.should.be.approximately( d, tol );

            d += inc;
        }

    });

});

describe("verb.eval.Divide.rationalCurveByArcLength",() => {

    it('can divide a straight NURBS curve', () => {

        var degree = 3
            , knots = [0,0,0,0,0.5,1,1,1,1]
            , controlPoints = [ [0,0,0,1], [1,0,0,1], [2,0,0,1], [3,0,0,1], [4,0,0,1] ]
            , curve = new verb.core.NurbsCurveData( degree, knots, controlPoints )
            , d = 0.5
            , tol = 1e-3;

        var res = verb.eval.Divide.rationalCurveByArcLength(curve, d);

        var s = 0;
        res.forEach(function(u){

            var pt = verb.eval.Eval.rationalCurvePoint( curve, u.u );
            u.len.should.be.approximately( s, tol );
            s += d;

        });

    });

});

describe("verb.eval.Divide.rationalCurveByEqualArcLength",() => {

    it('can divide a straight NURBS curve', () => {

        var degree = 3
            , knots = [0,0,0,0,0.5,1,1,1,1]
            , controlPoints = [ [0,0,0,1], [1,0,0,1], [2,0,0,1], [3,0,0,1], [4,0,0,1] ]
            , curve = new verb.core.NurbsCurveData( degree, knots, controlPoints )
            , divs = 8
            , tol = 1e-3
            , d = 4 / divs;

        var res = verb.eval.Divide.rationalCurveByEqualArcLength(curve, divs );

        var s = 0;
        res.forEach(function(u){

            var pt = verb.eval.Eval.rationalCurvePoint( curve, u.u );
            u.len.should.be.approximately( s, tol );
            s += d;

        });

    });

});

describe("verb.eval.Analyze.rationalCurveClosestParam",() => {

    it('can get closest point to a straight curve', () => {

        var degree = 3
            , knots = [0,0,0,0,0.5,1,1,1,1]
            , controlPoints = [ [0,0,0,1], [1,0,0,1], [2,0,0,1], [3,0,0,1], [4,0,0,1] ]
            , curve = new verb.core.NurbsCurveData( degree, knots, controlPoints )
            , pt = [1,0.2,0];

        var res = verb.eval.Analyze.rationalCurveClosestParam(curve, [1,0.2,0] );
        var p = verb.eval.Eval.rationalCurvePoint( curve, res );

        vecShouldBe( [1,0,0], p, 1e-3 );

        res = verb.eval.Analyze.rationalCurveClosestParam(curve, [2,0.2,0] );
        p = verb.eval.Eval.rationalCurvePoint( curve, res );

        vecShouldBe( [2,0,0], p, 1e-3 );

        // before start
        res = verb.eval.Analyze.rationalCurveClosestParam(curve, [-1,0.2,1] );
        p = verb.eval.Eval.rationalCurvePoint( curve, res );

        vecShouldBe( [0,0,0], p, 1e-3 );

        // beyond end
        res = verb.eval.Analyze.rationalCurveClosestParam(curve, [5,0.2,0] );
        p = verb.eval.Eval.rationalCurvePoint( curve, res );

        vecShouldBe( [4,0,0], p, 1e-3 );

    });

});

describe("verb.eval.Analyze.rationalSurfaceClosestParam",() => {

    it('can get closest point to flat bezier patch', () => {

        var degreeU = 3
            , degreeV = 3
            , knotsU = [0, 0, 0, 0, 1, 1, 1, 1]
            , knotsV =  [0, 0, 0, 0, 1, 1, 1, 1]
            , controlPoints = [     [ [0, 0, 0, 1],         [10, 0, 0, 1],      [20, 0, 0, 1],      [30, 0, 0, 1]       ],
                                    [ [0, -10, 0, 1],   [10, -10, 0, 1],    [20, -10, 0, 1],    [30, -10, 0, 1]     ],
                                    [ [0, -20, 0, 1],   [10, -20, 0, 1],    [20, -20, 0, 1],    [30, -20, 0, 1]     ],
                                    [ [0, -30, 0, 1],   [10, -30, 0, 1],    [20, -30, 0, 1],    [30, -30, 0, 1]     ] ]
            , surface = new verb.core.NurbsSurfaceData( degreeU, degreeV, knotsU, knotsV, controlPoints )
            , point = [12,-20,5];

        var res = verb.eval.Analyze.rationalSurfaceClosestParam( surface, point );
        var p = verb.eval.Eval.rationalSurfacePoint( surface, res[0], res[1] );

        vecShouldBe( [12,-20,0], p, 1e-3 );

    });

});

describe("verb.eval.Intersect.segmentWithTriangle",() => {

    it('gives correct result for intersecting axis aligned segment and triangle ', () => {

        // line from [5,5,5] to [5,5,-5]
        var p0 = [ 5,5,5 ]
            , p1 = [ 5,5,-10 ]
            , points = [ [0,0,0], [10,0,0], [5,10,1] ]
            , tri = [ 0, 1, 2 ];

        var res = verb.eval.Intersect.segmentWithTriangle( p0, p1, points, tri );

        res.p.should.be.approximately(0.3, verb.core.Constants.TOLERANCE);
        res.s.should.be.approximately(0.25, verb.core.Constants.TOLERANCE);
        res.t.should.be.approximately(0.5, verb.core.Constants.TOLERANCE);

        console.log()

        var p_srf = verb.core.Vec.add(  points[0],
                                        verb.core.Vec.add(  verb.core.Vec.mul( res.s, verb.core.Vec.sub(points[1], points[0])),
                                                            verb.core.Vec.mul( res.t, verb.core.Vec.sub(points[2], points[0]))));

        verb.core.Vec.norm( verb.core.Vec.sub( res.point, p_srf ) ).should.be.approximately(0, verb.core.Constants.TOLERANCE );

    });

    it('gives correct result for intersecting axis aligned segment and planar triangle ', () => {

        // line from [5,5,5] to [5,5,-5]
        var p0 = [ 5,5,5 ]
            , p1 = [ 5,5,-10 ]
            , points = [ [0,0,0], [10,0,0], [5,10,0] ]
            , tri = [ 0, 1, 2 ];

        var res = verb.eval.Intersect.segmentWithTriangle( p0, p1, points, tri );

        res.p.should.be.approximately(0.333333333333, verb.core.Constants.TOLERANCE);
        res.s.should.be.approximately(0.25, verb.core.Constants.TOLERANCE);
        res.t.should.be.approximately(0.5, verb.core.Constants.TOLERANCE);

        var p_srf = verb.core.Vec.add(  points[0],
                                        verb.core.Vec.add(  verb.core.Vec.mul( res.s, verb.core.Vec.sub(points[1], points[0])),
                                                            verb.core.Vec.mul( res.t, verb.core.Vec.sub(points[2], points[0]))));

        verb.core.Vec.norm( verb.core.Vec.sub( res.point, p_srf ) ).should.be.approximately(0, verb.core.Constants.TOLERANCE );

    });

    it('gives null for non-intersecting segment and triangle', () => {

        // line from [5,5,5] to [5,5,-5]
        var p0 = [ 5,5,5 ]
            , p1 = [ 5,5,4 ]

            // planar triangle
            , points = [ [0,0,0], [10,0,0], [5,10,0] ]
            , tri = [ 0, 1, 2 ];

        var res = verb.eval.Intersect.segmentWithTriangle( p0, p1, points, tri );

        (null === res).should.be.true;

    });

});


describe("verb.eval.Make.fourPointSurface",() => {

    it('can create an inclined plane', () => {

        var p1 = [0,0,0]
            , p2 = [1,0,0]
            , p3 = [1,1,1]
            , p4 = [0,1,1];

        var comps = verb.eval.Make.fourPointSurface(p1, p2, p3, p4);

        comps.degreeU.should.equal(3);
        comps.degreeV.should.equal(3);

        // sample at the center
        var p = verb.eval.Eval.rationalSurfacePoint( comps,
                                                        0.5,
                                                        0.5);

        p[0].should.be.approximately(0.5, verb.core.Constants.EPSILON );
        p[1].should.be.approximately(0.5, verb.core.Constants.EPSILON );
        p[2].should.be.approximately(0.5, verb.core.Constants.EPSILON );

    });

    it('can create a hypar', () => {

        var p1 = [0,0,1]
            , p2 = [1,0,0]
            , p3 = [1,1,1]
            , p4 = [0,1,0];

        var comps = verb.eval.Make.fourPointSurface(p1, p2, p3, p4);

        comps.degreeU.should.equal(3);
        comps.degreeV.should.equal(3);

        // sample at the center
        var p = verb.eval.Eval.rationalSurfacePoint( comps,
                                                        0.5,
                                                        0.5);

        p[0].should.be.approximately(0.5, verb.core.Constants.EPSILON );
        p[1].should.be.approximately(0.5, verb.core.Constants.EPSILON );
        p[2].should.be.approximately(0.5, verb.core.Constants.EPSILON );

        // bottom left
        p = verb.eval.Eval.rationalSurfacePoint( comps,
                                                        0,
                                                        0);

        p[0].should.be.approximately(0, verb.core.Constants.EPSILON );
        p[1].should.be.approximately(0, verb.core.Constants.EPSILON );
        p[2].should.be.approximately(1, verb.core.Constants.EPSILON );

        // bottom right
        p = verb.eval.Eval.rationalSurfacePoint( comps,
                                                        1,
                                                        0);

        p[0].should.be.approximately(1, verb.core.Constants.EPSILON );
        p[1].should.be.approximately(0, verb.core.Constants.EPSILON );
        p[2].should.be.approximately(0, verb.core.Constants.EPSILON );

    });

});

describe("verb.eval.Intersect.polylines",() => {

    it('can intersect two simple lines', () => {

        var p1 = [0,0,0]
            , p2 = [0,1,0]
            , p3 = [-0.5,0.5,0]
            , p4 = [0.5,0.5,0]
            , pl0 = new verb.core.PolylineData([ p1, p2 ], [0, 1])
            , pl1 = new verb.core.PolylineData([ p3, p4 ], [0, 1]);

        var inter = verb.eval.Intersect.polylines( pl0, pl1, verb.core.Constants.TOLERANCE );

        inter.length.should.be.equal(1);

        inter[0].u0.should.be.approximately(0.5, verb.core.Constants.TOLERANCE );
        inter[0].u1.should.be.approximately(0.5, verb.core.Constants.TOLERANCE );
        vecShouldBe( [0, 0.5, 0], inter[0].point0 );
        vecShouldBe( [0, 0.5, 0], inter[0].point1 );

    });

    it('can intersect a length 2 polyline and line', () => {

        var p1 = [0,0.5,0]
            , p2 = [2,0.5,0]
            , p3 = [0,0,0]
            , p4 = [1,0,0]
            , p5 = [1,1,0]
            , pl0 = new verb.core.PolylineData([ p1, p2 ], [0, 1])
            , pl1 = new verb.core.PolylineData([ p3, p4, p5], [0, 0.5, 1]);

        var inter = verb.eval.Intersect.polylines( pl0, pl1, verb.core.Constants.TOLERANCE );

        inter.length.should.be.equal(1);

        inter[0].u0.should.be.approximately(0.5, verb.core.Constants.TOLERANCE );
        inter[0].u1.should.be.approximately(0.75, verb.core.Constants.TOLERANCE );

        vecShouldBe( [1, 0.5, 0], inter[0].point0 );
        vecShouldBe( [1, 0.5, 0], inter[0].point1 );

    });

    it('can intersect two length 2 polylines', () => {

        var p1 = [0.5,-0.5,0]
            , p2 = [0.5,0.5,0]
            , p3 = [1.5,0.5,0]
            , p4 = [0,0,0]
            , p5 = [1,0,0]
            , p6 = [1,1,0]
            , pl0 = new verb.core.PolylineData([ p1, p2, p3 ], [0, 0.5, 1])
            , pl1 = new verb.core.PolylineData([ p4, p5, p6 ], [0, 0.5, 1]);

        var inter = verb.eval.Intersect.polylines( pl0, pl1, verb.core.Constants.TOLERANCE );

        inter.length.should.be.equal(2);

        inter[0].u0.should.be.approximately(0.25, verb.core.Constants.TOLERANCE );
        inter[0].u1.should.be.approximately(0.25, verb.core.Constants.TOLERANCE );

        inter[1].u0.should.be.approximately(0.75, verb.core.Constants.TOLERANCE );
        inter[1].u1.should.be.approximately(0.75, verb.core.Constants.TOLERANCE );

        vecShouldBe( [0.5, 0, 0], inter[0].point0 );
        vecShouldBe( [0.5, 0, 0], inter[0].point1 );

        vecShouldBe( [1, 0.5, 0], inter[1].point0 );
        vecShouldBe( [1, 0.5, 0], inter[1].point1 );

    });

    it('correctly misses when two lines do not intersect', () => {

        var p1 = [0,0,0.5]
            , p2 = [0,1,0.5]
            , p3 = [-0.5,0.5,0]
            , p4 = [0.5,0.5,0]
            , pl0 = new verb.core.PolylineData([ p1, p2 ], [0, 1])
            , pl1 = new verb.core.PolylineData([ p3, p4 ], [0, 1]);

        var inter = verb.eval.Intersect.polylines( pl0, pl1, verb.core.Constants.TOLERANCE );

        inter.length.should.be.equal(0);

    });
});

describe("verb.eval.Intersect.threePlanes",() => {

    it('is correct for intersection of 3 basis planes', () => {

        var d1 = 0;
        var n1 = [1,0,0];
        var d2 = 0;
        var n2 = [0,1,0];
        var d3 = 0;
        var n3 = [0,0,1];

        var res = verb.eval.Intersect.threePlanes(n1, d1, n2, d2, n3, d3);
        res.should.be.eql( [0,0,0] );

    });

    it('is correct for intersection of shifted basis planes', () => {

        var n1 = [1,0,0];
        var n2 = [0,1,0];
        var n3 = [0,0,1];
        var d1, d2, d3, res;

        for (var i = 0; i < 100; i++){

            d1 = (Math.random() - 0.5) * 10000;
            d2 = (Math.random() - 0.5) * 10000;
            d3 = (Math.random() - 0.5) * 10000;

            res = verb.eval.Intersect.threePlanes(n1, d1, n2, d2, n3, d3);

            res[0].should.be.approximately( d1, verb.core.Constants.EPSILON );
            res[1].should.be.approximately( d2, verb.core.Constants.EPSILON );
            res[2].should.be.approximately( d3, verb.core.Constants.EPSILON );

        }

    });

    it('is null for repeat planes', () => {

        var d1 = 10;
        var n1 = [0,1,0];
        var d2 = 0;
        var n2 = [0,1,0];
        var d3 = 10;
        var n3 = [0,0,1];

        var res = verb.eval.Intersect.threePlanes(n1, d1, n2, d2, n3, d3);
        should.equal( res, null ); //non-intersect is null

    });

});

describe("verb.eval.Intersect.planes",() => {

    it('is correct for intersection of xz and yz planes', () => {

        var o1 = [0,0,0];
        var n1 = [1,0,0];
        var o2 = [0,0,0];
        var n2 = [0,1,0];

        var res = verb.eval.Intersect.planes(o1, n1, o2, n2);

        res.origin.should.be.eql( [0,0,0] );
        res.dir.should.be.eql( [0,0,1] );

    });

    it('is correct for intersection of xz and shifted yz plane', () => {

        var o1 = [20,0,0];
        var n1 = [1,0,0];
        var o2 = [0,0,0];
        var n2 = [0,1,0];

        var res = verb.eval.Intersect.planes(o1, n1, o2, n2);

        res.origin.should.be.eql( [20,0,0] );
        res.dir.should.be.eql( [0,0,1] );

    });

    it('is correct for intersection of shifted xz and yz plane', () => {

        var o1 = [0,0,0];
        var n1 = [1,0,0];
        var o2 = [0,20,0];
        var n2 = [0,1,0];

        // should be z-axis
        var res = verb.eval.Intersect.planes(o1, n1, o2, n2);

        res.origin.should.be.eql( [0,20,0] );
        res.dir.should.be.eql( [0,0,1] );

    });

});

describe("verb.eval.Intersect.clipRayInCoplanarTriangle",() => {

    it('is correct for a basic example 1', () => {

        var o = [0,1,0];
        var d = [1,0,0];

        var pts = [ [0,0,0], [2,0,0], [2, 2,0] ];
        var tri = [[ 0, 1, 2 ]];
        var uvs = [ [0,0], [2,0], [2, 2] ];
        var mesh = new verb.core.MeshData(tri, pts, null, uvs);

        var res = verb.eval.Intersect.clipRayInCoplanarTriangle(new verb.core.Ray(o, d), mesh, 0);



        res.min.u.should.be.approximately(1, verb.core.Constants.TOLERANCE);
        res.max.u.should.be.approximately(2, verb.core.Constants.TOLERANCE);

        vecShouldBe( [1,1], res.min.uv );
        vecShouldBe( [2,1], res.max.uv );

        vecShouldBe( [1,1,0], res.min.point );
        vecShouldBe( [2,1,0], res.max.point );

    });

    it('is correct for a basic example 2', () => {

        var o = [0.5,-0.5,0];
        var d = [0,1,0];

        var pts = [ [0,0,0], [2,0,0], [2, 2,0] ];
        var tri = [[ 0, 1, 2 ]];
        var uvs = [ [0,0], [2,0], [2, 2] ];

        var mesh = new verb.core.MeshData(tri, pts, null, uvs);
        var res = verb.eval.Intersect.clipRayInCoplanarTriangle(new verb.core.Ray(o, d), mesh, 0 );

        res.min.u.should.be.approximately(0.5, verb.core.Constants.TOLERANCE);
        res.max.u.should.be.approximately(1, verb.core.Constants.TOLERANCE);

        vecShouldBe( [0.5,0], res.min.uv );
        vecShouldBe( [0.5,0.5], res.max.uv );

        vecShouldBe( [0.5,0,0], res.min.point );
        vecShouldBe( [0.5,0.5,0], res.max.point );

    });

    it('is correct for a basic example 3', () => {

        var o = [0.5,-0.5,0];
        var d = [Math.sqrt(2)/2,Math.sqrt(2)/2,0];

        var pts = [ [0,0,0], [2,0,0], [2, 2,0] ];
        var tri = [[ 0, 1, 2 ]];
        var uvs = [ [0,0], [2,0], [2, 2] ];

        var mesh = new verb.core.MeshData(tri, pts, null, uvs);
        var res = verb.eval.Intersect.clipRayInCoplanarTriangle(new verb.core.Ray(o, d), mesh, 0 );

        res.min.u.should.be.approximately(Math.sqrt(2)/2, verb.core.Constants.TOLERANCE);
        res.max.u.should.be.approximately(3 * Math.sqrt(2)/2, verb.core.Constants.TOLERANCE);

        vecShouldBe( [1,0], res.min.uv );
        vecShouldBe( [2,1], res.max.uv );

        vecShouldBe( [1,0,0], res.min.point );
        vecShouldBe( [2,1,0], res.max.point );

    });

    it('is correct for a basic example 4', () => {

        var o = [0, 2,0];
        var d = [Math.sqrt(2)/2,-Math.sqrt(2)/2,0];

        var pts = [ [0,0,0], [2,0,0], [2, 2,0] ];
        var tri = [[ 0, 1, 2 ]];
        var uvs = [ [0,0], [2,0], [2, 2] ];

        var mesh = new verb.core.MeshData(tri, pts, null, uvs);
        var res = verb.eval.Intersect.clipRayInCoplanarTriangle(new verb.core.Ray(o, d), mesh, 0 );

        res.min.u.should.be.approximately(Math.sqrt(2), verb.core.Constants.TOLERANCE);
        res.max.u.should.be.approximately(2 * Math.sqrt(2), verb.core.Constants.TOLERANCE);

        vecShouldBe( [1,1], res.min.uv );
        vecShouldBe( [2,0], res.max.uv );

        vecShouldBe( [1,1,0], res.min.point );
        vecShouldBe( [2,0,0], res.max.point );

    });

    it('is correct for a basic example 5', () => {

        var o = [1,1,0];
        var d = [Math.sqrt(2)/2,-Math.sqrt(2)/2,0];

        var pts = [ [0,0,0], [2,0,0], [2, 2,0] ];
        var tri = [[ 0, 1, 2 ]];
        var uvs = [ [0,0], [2,0], [2, 2] ];

        var mesh = new verb.core.MeshData(tri, pts, null, uvs);
        var res = verb.eval.Intersect.clipRayInCoplanarTriangle(new verb.core.Ray(o, d), mesh, 0 );

        res.min.u.should.be.approximately(0, verb.core.Constants.TOLERANCE);
        res.max.u.should.be.approximately(Math.sqrt(2), verb.core.Constants.TOLERANCE);

        vecShouldBe( [1,1], res.min.uv );
        vecShouldBe( [2,0], res.max.uv );

        vecShouldBe( [1,1,0], res.min.point );
        vecShouldBe( [2,0,0], res.max.point );

    });

    it('is correct for a basic example 6', () => {

        var o = [3,1,0];
        var d = [-1,0,0];

        var pts = [ [0,0,0], [2,0,0], [2, 2,0] ];
        var tri = [[ 0, 1, 2 ]];
        var uvs = [ [0,0], [2,0], [2, 2] ];

        var mesh = new verb.core.MeshData(tri, pts, null, uvs);
        var res = verb.eval.Intersect.clipRayInCoplanarTriangle(new verb.core.Ray(o, d), mesh, 0 );

        res.min.u.should.be.approximately(1, verb.core.Constants.TOLERANCE);
        res.max.u.should.be.approximately(2, verb.core.Constants.TOLERANCE);

        vecShouldBe( [2,1], res.min.uv );
        vecShouldBe( [1,1], res.max.uv );

        vecShouldBe( [2,1,0], res.min.point );
        vecShouldBe( [1,1,0], res.max.point );

    });

});

describe("verb.eval.Intersect.mergeTriangleClipIntervals",() => {

    it('is correct for a basic example', () => {

        var o = [1,0,0];
        var d = [0,1,0];

        var pts1 = [ [0,0,0], [2,0,0], [2, 2,0] ];
        var tri1 = [[ 0, 1, 2 ]];
        var uvs1 = [ [0,0], [2,0], [2, 2] ];
        var mesh1 = new verb.core.MeshData(tri1, pts1, null, uvs1);

        var clip1 = verb.eval.Intersect.clipRayInCoplanarTriangle(new verb.core.Ray(o, d), mesh1, 0 );

        var pts2 = [ [1,0.5,-1], [1,2.5,-1], [1,0.5,1] ];
        var tri2 = [[ 0, 1, 2 ]];
        var uvs2 = [ [0,0], [2,0], [0,2] ];
        var mesh2 = new verb.core.MeshData(tri2, pts2, null, uvs2);

        var clip2 = verb.eval.Intersect.clipRayInCoplanarTriangle(new verb.core.Ray(o, d), mesh2, 0 );

        var res = verb.eval.Intersect.mergeTriangleClipIntervals(clip1, clip2, mesh1, 0, mesh2, 0);

        vecShouldBe( [1, 0.5], res.min.uv0 );
        vecShouldBe( [0, 1], res.min.uv1 );
        vecShouldBe( [1, 0.5, 0], res.min.point );

        vecShouldBe( [1, 1], res.max.uv0 );
        vecShouldBe( [0.5, 1], res.max.uv1 );
        vecShouldBe( [1, 1, 0], res.max.point );

    });

    it('is correct for triangles sharing an edge', () => {

        var o = [2,-1,0];
        var d = [0,1,0];

        var pts1 = [ [0,0,0], [2,0,0], [2, 2,0] ];
        var tri1 = [[ 0, 1, 2 ]];
        var uvs1 = [ [0,0], [2,0], [2, 2] ];
        var mesh1 = new verb.core.MeshData(tri1, pts1, null, uvs1);

        var clip1 = verb.eval.Intersect.clipRayInCoplanarTriangle(new verb.core.Ray(o, d), mesh1, 0 );

        var pts2 = [ [2,0,0], [2, 2, 0], [2, 0, 2] ];
        var tri2 = [[ 0, 1, 2 ]];
        var uvs2 = [ [0,0], [2,0], [0,2] ];
        var mesh2 = new verb.core.MeshData(tri2, pts2, null, uvs2);

        var clip2 = verb.eval.Intersect.clipRayInCoplanarTriangle(new verb.core.Ray(o, d), mesh2, 0 );

        var res = verb.eval.Intersect.mergeTriangleClipIntervals(clip1, clip2, mesh1, 0, mesh2, 0);

        vecShouldBe( [2, 0], res.min.uv0 );
        vecShouldBe( [0, 0], res.min.uv1 );
        vecShouldBe( [2, 0, 0], res.min.point );

        vecShouldBe( [2, 2], res.max.uv0 );
        vecShouldBe( [2, 0], res.max.uv1 );
        vecShouldBe( [2, 2, 0], res.max.point );

    });

});

describe("verb.eval.Intersect.triangles",() => {

    it('is correct for a basic example', () => {

        var pts1 = [ [0,0,0], [2,0,0], [2, 2,0] ];
        var tri1 = [[ 0, 1, 2 ]];
        var uvs1 = [ [0,0], [2,0], [2, 2] ];
        var mesh1 = new verb.core.MeshData(tri1, pts1, null, uvs1);

        var pts2 = [ [1,0.5,-1], [1,2.5,-1], [1,0.5,1] ];
        var tri2 = [[ 0, 1, 2 ]];
        var uvs2 = [ [0,0], [2,0], [0,2] ];
        var mesh2 = new verb.core.MeshData(tri2, pts2, null, uvs2);

        var res = verb.eval.Intersect.triangles( mesh1, 0, mesh2, 0 );

        vecShouldBe( [1, 0.5], res.min.uv0 );
        vecShouldBe( [0, 1], res.min.uv1 );
        vecShouldBe( [1, 0.5, 0], res.min.point );

        vecShouldBe( [1, 1], res.max.uv0 );
        vecShouldBe( [0.5, 1], res.max.uv1 );
        vecShouldBe( [1, 1, 0], res.max.point );

    });

    it('is correct for triangles sharing an edge', () => {

        var pts1 = [ [0,0,0], [2,0,0], [2, 2,0] ];
        var tri1 = [[ 0, 1, 2 ]];
        var uvs1 = [ [0,0], [2,0], [2, 2] ];
        var mesh1 = new verb.core.MeshData(tri1, pts1, null, uvs1);

        var pts2 = [ [2, 0, 0], [2, 2, 0], [2,0,2] ];
        var tri2 = [[ 0, 1, 2 ]];
        var uvs2 = [ [0,0], [2,0], [0,2] ];
        var mesh2 = new verb.core.MeshData(tri2, pts2, null, uvs2);

        var res = verb.eval.Intersect.triangles( mesh1, 0, mesh2, 0 );

        vecShouldBe( [2,0], res.min.uv0 );
        vecShouldBe( [0,0], res.min.uv1 );
        vecShouldBe( [2,0,0], res.min.point );

        vecShouldBe( [2,2], res.max.uv0 );
        vecShouldBe( [2,0], res.max.uv1 );
        vecShouldBe( [2, 2, 0], res.max.point );

    });


});

describe("verb.eval.Intersect.curves",() => {

    it('gives valid result for two planar lines', () => {

        var degree1 = 1,
                knots1 = [0,0,1,1],
                controlPoints1 = [[0,0,0,1], [2,0,0,1]],
                curve1 = new verb.core.NurbsCurveData( degree1, knots1, controlPoints1 ),
                degree2 = 1,
                knots2 = [0,0,1,1],
                controlPoints2 = [[0.5,0.5,0,1], [0.5,-1.5,0,1]]
                curve2 = new verb.core.NurbsCurveData( degree2, knots2, controlPoints2 );

        var res = verb.eval.Intersect.curves( curve1, curve2, verb.core.Constants.TOLERANCE );

        res.length.should.be.equal(1);

        res[0].u0.should.be.approximately(0.25, verb.core.Constants.TOLERANCE );
        res[0].u1.should.be.approximately(0.25, verb.core.Constants.TOLERANCE );

    });

    it('gives valid result for planar degree 2 bezier and planar line', () => {

        var degree1 = 1,
                knots1 = [0,0,1,1],
                controlPoints1 = [[0,0,0,1], [2,0,0,1]],
                curve1 = new verb.core.NurbsCurveData( degree1, knots1, controlPoints1 ),
                degree2 = 2,
                knots2 = [0,0,0,1,1,1],
                controlPoints2 = [[0.5,0.5,0,1], [0.7,0,0,1], [0.5,-1.5,0,1]]
                curve2 = new verb.core.NurbsCurveData( degree2, knots2, controlPoints2 );

        var res = verb.eval.Intersect.curves(   curve1,curve2, verb.core.Constants.TOLERANCE );

        res.length.should.be.equal(1);

        res[0].u0.should.be.approximately(0.2964101616038012, verb.core.Constants.TOLERANCE );
        res[0].u1.should.be.approximately(0.3660254038069307, verb.core.Constants.TOLERANCE );

    });

    it('gives valid result for planar line and planar degree 2 bezier as second arg', () => {

        var degree1 = 1,
                knots1 = [0,0,1,1],
                controlPoints1 = [[0,0,0,1], [2,0,0,1]],
                curve1 = new verb.core.NurbsCurveData( degree1, knots1, controlPoints1 ),
                degree2 = 2,
                knots2 = [0,0,0,1,1,1],
                controlPoints2 = [[0.5,0.5,0,1], [0.7,0,0,1], [0.5,-1.5,0,1]]
                curve2 = new verb.core.NurbsCurveData( degree2, knots2, controlPoints2 );

        var res = verb.eval.Intersect.curves(curve2, curve1, verb.core.Constants.TOLERANCE );

        res.length.should.be.equal(1);

        res[0].u0.should.be.approximately(0.3660254038069307, verb.core.Constants.TOLERANCE );
        res[0].u1.should.be.approximately(0.2964101616038012, verb.core.Constants.TOLERANCE );

    });

    it('gives valid result for 2 planar degree 2 beziers', () => {

        var degree1 = 2,
                knots1 = [0,0,0,1,1,1],
                controlPoints1 = [[0,0,0,1], [0.5,0.1,0,1],  [2,0,0,1]],
                curve1 = new verb.core.NurbsCurveData( degree1, knots1, controlPoints1 ),
                degree2 = 2,
                knots2 = [0,0,0,1,1,1],
                controlPoints2 = [[0.5,0.5,0,1], [0.7,0,0,1], [0.5,-1.5,0,1]]
                curve2 = new verb.core.NurbsCurveData( degree2, knots2, controlPoints2 );

        var res = verb.eval.Intersect.curves( curve1, curve2, verb.core.Constants.TOLERANCE );

        res.length.should.be.equal(1);

        verb.core.Vec.dist( res[0].point0, res[0].point1 ).should.be.lessThan( verb.core.Constants.TOLERANCE );

    });

});

describe("verb.eval.Intersect.curveAndSurface",() => {

    it('gives valid result for planar surface and line', () => {

        // build planar surface in the xy plane
        var homo_controlPoints_srf = [ [ [0,0,0,1], [20,0,0,1] ], [[0,10,0,1], [20,10,0,1] ] ]
            , degreeU  = 1
            , degreeV = 1
            , knotsU = [0,0,1,1]
            , knotsV = [0,0,1,1]
            , surface = new verb.core.NurbsSurfaceData( degreeU, degreeV, knotsU, knotsV, homo_controlPoints_srf );

        // line from [5,5,5] to [5,5,-5]
        var degree_crv = 1
            , knots_crv = [0,0,1,1]
            , homo_controlPoints_crv = [ [5.2,5.2,5,1], [5.2,5.2,-10,1] ]
            , curve = new verb.core.NurbsCurveData( degree_crv, knots_crv, homo_controlPoints_crv );

        var res = verb.eval.Intersect.curveAndSurface( curve, surface, verb.core.Constants.TOLERANCE );

        res.length.should.be.equal( 1 );

        res[0].u.should.be.approximately( 1/3, 1e-3 );
        res[0].uv[0].should.be.approximately( 0.52, 1e-3 );
        res[0].uv[1].should.be.approximately( 0.26, 1e-3 );

    });

    it('gives valid result for planar surface and degree 1 nurbs', () => {

        // build planar surface in the xy plane
        var homo_controlPoints_srf = [ [ [0,0,0,1], [20,0,0,1] ], [[0,10,0,1], [20,10,0,1] ] ]
            , degreeU  = 1
            , degreeV = 1
            , knotsU = [0,0,1,1]
            , knotsV = [0,0,1,1]
            , surface = new verb.core.NurbsSurfaceData( degreeU, degreeV, knotsU, knotsV, homo_controlPoints_srf );

        // line from [5,5,5] to [5,5,-5]
        var degree_crv = 1
            , knots_crv = [0,0,0.5,1,1]
            , homo_controlPoints_crv = [ [5.2,5.2,5,1], [5.2,5.2,-2.5,1], [5.2,5.2,-10,1] ]
            , curve = new verb.core.NurbsCurveData( degree_crv, knots_crv, homo_controlPoints_crv );

        var res = verb.eval.Intersect.curveAndSurface( curve, surface, verb.core.Constants.TOLERANCE );

        res.length.should.be.equal( 1 );
        res[0].u.should.be.approximately( 1/3, 1e-3 );
        res[0].uv[0].should.be.approximately( 0.52, 1e-3 );
        res[0].uv[1].should.be.approximately( 0.26, 1e-3 );

    });

    it('gives valid result for planar surface and degree 2 bezier', () => {

        // build planar surface in the xy plane
        var homo_controlPoints_srf = [ [ [0,0,0,1], [0,10,0,1] ], [[20,0,0,1], [20,10,0,1] ] ]
            , degreeU  = 1
            , degreeV = 1
            , knotsU = [0,0,1,1]
            , knotsV = [0,0,1,1]
            , surface = new verb.core.NurbsSurfaceData( degreeU, degreeV, knotsU, knotsV, homo_controlPoints_srf );

        // line from [5,5,5] to [5,5,-5]
        var degree_crv = 2
            , knots_crv = [0,0,0,1,1,1]
            , homo_controlPoints_crv = [ [5.2,5.2,5,1], [5.4,4.8,0,1], [5.2,5.2,-5,1] ]
            , curve = new verb.core.NurbsCurveData( degree_crv, knots_crv, homo_controlPoints_crv );

        var res =  verb.eval.Intersect.curveAndSurface( curve, surface, verb.core.Constants.TOLERANCE  );

        res.length.should.be.equal( 1 );
        res[0].u.should.be.approximately( 0.5, 1e-3 );
        res[0].uv[0].should.be.approximately( 0.265, 1e-3 );
        res[0].uv[1].should.be.approximately( 0.5, 1e-3 );

    });

    it('gives valid result for non-intersecting planar surface and line', () => {

        // build planar surface in the xy plane
        var homo_controlPoints_srf = [ [ [0,0,0,1], [20,0,0,1] ], [[0,10,0,1], [20,10,0,1] ] ]
            , degreeU  = 1
            , degreeV = 1
            , knotsU = [0,0,1,1]
            , knotsV = [0,0,1,1]
            , surface = new verb.core.NurbsSurfaceData( degreeU, degreeV, knotsU, knotsV, homo_controlPoints_srf );

        // line from [5,5,5] to [5,5,-5]
        var degree_crv = 1
            , knots_crv = [0,0,1,1]
            , homo_controlPoints_crv = [ [5.2,5.2,5,1], [5.2,5.2,2,1] ]
            , curve = new verb.core.NurbsCurveData( degree_crv, knots_crv, homo_controlPoints_crv );

        var res =  verb.eval.Intersect.curveAndSurface( curve, surface );
        res.length.should.be.equal( 0 );

    });

});

describe("verb.eval.Intersect.curveAndSurfaceWithEstimate",() => {

    it('gives valid result for planar surface and degree 2 bezier', () => {

        var homo_controlPoints_srf = [ [ [0,0,0,1], [0,10,0,1] ], [[20,0,0,1], [20,10,0,1] ] ]
            , degreeU  = 1
            , degreeV = 1
            , knotsU = [0,0,1,1]
            , knotsV = [0,0,1,1]
            , surface = new verb.core.NurbsSurfaceData( degreeU, degreeV, knotsU, knotsV, homo_controlPoints_srf );

        var degree_crv = 2
            , knots_crv = [0,0,0,1,1,1]
            , homo_controlPoints_crv = [ [5.2,5.2,5,1], [5.4,4.8,0,1], [5.2,5.2,-5,1] ]
            , curve = new verb.core.NurbsCurveData( degree_crv, knots_crv, homo_controlPoints_crv );

        var start_params = [ 0.45, 0.25, 0.55 ];

        var res = verb.eval.Intersect.curveAndSurfaceWithEstimate( curve, surface, start_params, verb.core.Constants.TOLERANCE );

        res.u.should.be.approximately(0.5, 1e-3);
        res.uv[0].should.be.approximately(0.265, 1e-3);
        res.uv[1].should.be.approximately(0.5, 1e-3);

    });

});


describe("verb.eval.Intersect.lookupAdjacentSegment",() => {

    var segs = [
        new verb.core.Interval(
            new verb.core.MeshIntersectionPoint([0,0], [0,0], [1,2,3], 0, 0 ),
            new verb.core.MeshIntersectionPoint([0,0], [0,0], [5,6,7], 0, 0 )),
        new verb.core.Interval(
            new verb.core.MeshIntersectionPoint([0,0], [0,0], [2,2,3], 0, 0 ),
            new verb.core.MeshIntersectionPoint([0,0], [0,0], [6,6,7], 0, 0 )),
        new verb.core.Interval(
            new verb.core.MeshIntersectionPoint([0,0], [0,0], [3,2,3], 0, 0 ),
            new verb.core.MeshIntersectionPoint([0,0], [0,0], [7,6,7], 0, 0 ))  ];

    it('returns null when only nearest is argument itself', () => {

        var end = segs[0].min;

        var tree = verb.eval.Intersect.kdTreeFromSegments( segs );
        var nearest = verb.eval.Intersect.lookupAdjacentSegment( end, tree, 3 );

        should.equal( nearest, null );

    });

    it('is correct for a basic example', () => {

        var end = new verb.core.MeshIntersectionPoint([0,0], [0,0], [1,2,3], 0, 0 ); // same pos, but different object

        var tree = verb.eval.Intersect.kdTreeFromSegments( segs );
        var nearest = verb.eval.Intersect.lookupAdjacentSegment( end, tree, 3 );

        nearest.should.be.equal(segs[0].min)

    });

});

describe("verb.eval.Intersect.makeMeshIntersectionPolylines ",() => {

    it('is correct for a basic example', () => {

        var segs = [
            new verb.core.Interval(
                new verb.core.MeshIntersectionPoint([0,0], [0,0], [10,0,0], 0, 0 ),
                new verb.core.MeshIntersectionPoint([0,0], [0,0], [10,10,0], 0, 0 )),
            new verb.core.Interval(
                new verb.core.MeshIntersectionPoint([0,0], [0,0], [0,10,0], 0, 0 ),
                new verb.core.MeshIntersectionPoint([0,0], [0,0], [10,10,0], 0, 0 )),
            new verb.core.Interval(
                new verb.core.MeshIntersectionPoint([0,0], [0,0], [5,0,0], 0, 0 ),
                new verb.core.MeshIntersectionPoint([0,0], [0,0], [0,10,0], 0, 0 ))  ];

        var pls = verb.eval.Intersect.makeMeshIntersectionPolylines( segs );


        pls.length.should.be.equal( 1 );
        pls[0].length.should.be.equal( 4 );
        pls[0][0].point.should.be.eql( [5,0,0] );
        pls[0][1].point.should.be.eql( [0,10,0] );
        pls[0][2].point.should.be.eql( [10,10,0] );
        pls[0][3].point.should.be.eql( [10,0,0] );

    });

});

describe("verb.eval.Intersect.kdTreeFromSegments",() => {

    it('is correct for a basic example', () => {

        var segs = [
            new verb.core.Interval(
                new verb.core.MeshIntersectionPoint([0,0], [0,0], [1,2,3], 0, 0 ),
                new verb.core.MeshIntersectionPoint([0,0], [0,0], [5,6,7], 0, 0 )),
            new verb.core.Interval(
                new verb.core.MeshIntersectionPoint([0,0], [0,0], [2,2,3], 0, 0 ),
                new verb.core.MeshIntersectionPoint([0,0], [0,0], [6,6,7], 0, 0 )),
            new verb.core.Interval(
                new verb.core.MeshIntersectionPoint([0,0], [0,0], [3,2,3], 0, 0 ),
                new verb.core.MeshIntersectionPoint([0,0], [0,0], [7,6,7], 0, 0 ))  ];

        var tree = verb.eval.Intersect.kdTreeFromSegments( segs );

        tree.should.not.be.null;

    });

});

describe("verb.eval.Intersect.meshes",() => {

    it('is correct for two intersecting triangles', () => {

        var pts1 = [ [0,0,0], [2,0,0], [2, 2,0] ];
        var tris1 = [[ 0, 1, 2 ]];
        var uvs1 = [ [0,0], [2,0], [2, 2] ];
        var mesh1 = new verb.core.MeshData(tris1, pts1, null, uvs1);

        var pts2 = [ [1,1,-1], [1,1,5], [1,-5,-1] ];
        var tris2 = [[ 0, 1, 2 ]];
        var uvs2 = [ [0,0], [3,0], [3,3] ];
        var mesh2 = new verb.core.MeshData(tris2, pts2, null, uvs2);

        var pls = verb.eval.Intersect.meshes( mesh1, mesh2 );

        pls.length.should.be.equal( 1 );
        pls[0].length.should.be.equal( 2 );

    });

    it('is correct for two non-intersecting triangles', () => {

        var pts1 = [ [10,10,10], [2,10,10], [2, 2,10] ];
        var tris1 = [[ 0, 1, 2 ]];
        var uvs1 = [ [0,0], [2,0], [2, 2] ];
        var mesh1 = new verb.core.MeshData(tris1, pts1, null, uvs1);

        var pts2 = [ [1,1,-1], [3,1,-1], [3,1,2] ];
        var tris2 = [[ 0, 1, 2 ]];
        var uvs2 = [ [0,0], [3,0], [3,3] ];
        var mesh2 = new verb.core.MeshData(tris2, pts2, null, uvs2);

        var res = verb.eval.Intersect.meshes( mesh1, mesh2 );

        res.length.should.be.equal( 0 );

    });

    it('is correct for two intersecting four point surfaces', () => {

        var p1 = [0,0,0]
            , p2 = [1,0,0]
            , p3 = [1,1,0]
            , p4 = [0,1,0];

        var srf1 = verb.eval.Make.fourPointSurface( p1, p2, p3, p4 );

        var p5 = [0.5,-0.5,-0.5]
            , p6 = [0.5,0.5,-0.5]
            , p7 = [0.5,0.5,0.5]
            , p8 = [0.5,-0.5,0.5];

        var srf2 = verb.eval.Make.fourPointSurface( p5, p6, p7, p8 );

        var tess1 = verb.eval.Tess.rationalSurfaceAdaptive( srf1 );
        var tess2 = verb.eval.Tess.rationalSurfaceAdaptive( srf2 );

        var res = verb.eval.Intersect.meshes( tess1, tess2 );

        res.length.should.be.equal( 1 );
    });

});


describe("verb.eval.Eval.volumePoint",() => {

    it('gives valid result for uniform 3x3x3 cube', () => {

        var degreeU = 1
            , knotsU = [ 0,0,0.5,1,1 ]
            , degreeV = 1
            , knotsV = [ 0,0,0.5,1,1 ]
            , degreeW = 1
            , knotsW = [ 0,0,0.5,1,1 ]
            , controlPoints = [];

        // build a 3d grid of points
        for (var i = 0; i < 3; i++){

            var row = [];
            controlPoints.push( row );

            for (var j = 0; j < 3; j++){

                var col = [];
                row.push( col );

                for (var k = 0; k < 3; k++){

                    col.push( [ i/2, j/2, k/2 ] );

                }
            }
        }

        var volume = new verb.core.VolumeData( degreeU, degreeV, degreeW, knotsU, knotsV, knotsW, controlPoints );

        // sample a bunch of times and confirm the values are as expected
        for (var i = 0; i < 10; i++){

            var u = Math.random(), v = Math.random(), w = Math.random()
            var result = verb.eval.Eval.volumePoint( volume, u, v, w );

            result[0].should.be.approximately( u, verb.core.Constants.TOLERANCE );
            result[1].should.be.approximately( v, verb.core.Constants.TOLERANCE );
            result[2].should.be.approximately( w, verb.core.Constants.TOLERANCE );

        }

    });

});
function sameCurve( crvd0, crvd1 ){

    var u0 = crvd0.knots[0];
    var u1 = crvd0.knots[crvd0.knots.length-1];

    var u01 = crvd1.knots[0];
    var u11 = crvd1.knots[crvd1.knots.length-1];

    u0.should.be.approximately(u01, 1e-10);
    u1.should.be.approximately(u11, 1e-10);

    var numSamples = 100;
    var step = (u1 - u0) / (numSamples-1);

    for (var i  = 0; i < numSamples; i++ ){
        var p0 = verb.eval.Eval.rationalCurvePoint( crvd0, u0 + step*i );
        var p1 = verb.eval.Eval.rationalCurvePoint( crvd1, u0 + step*i );

        var dist = verb.core.Vec.dist( p0, p1 );
        dist.should.be.lessThan( verb.core.Constants.TOLERANCE );
    }
}

describe("verb.eval.Modify.curveElevateDegree",() => {

    // line from [5,5,5] to [5,5,-5]
    var degree_crv = 2
        , knots_crv = [1,1,1,2,2,2]
        , homo_controlPoints_crv = [ [5.2,5.2,5,1], [5.4,4.8,0,1], [5.2,5.2,-5,1] ]
        , bezierCurveData = new verb.core.NurbsCurveData( degree_crv, knots_crv, homo_controlPoints_crv );

    var lineCurveData = new verb.core.NurbsCurveData( 1, [0,0,1,1], [[7,3,-10,1], [5,4,3,1]] );

    it('can elevate degree 2 bezier to degree 3', () => {
        var curveData = verb.eval.Modify.curveElevateDegree( bezierCurveData, 3 );

        curveData.degree.should.be.equal( 3 );
        sameCurve( bezierCurveData, curveData );
    });

    it('can elevate degree 2 bezier to degree 4', () => {
        var curveData = verb.eval.Modify.curveElevateDegree( bezierCurveData, 4 );

        curveData.degree.should.be.equal( 4 );
        sameCurve( bezierCurveData, curveData );
    });

    it('can elevate degree 1 line to degree 3', () => {
        var curveData = verb.eval.Modify.curveElevateDegree( lineCurveData, 3 );

        curveData.degree.should.be.equal( 3 );
        sameCurve( lineCurveData, curveData );
    });
});


describe("verb.eval.Modify.unifyCurveKnotVectors",() => {

    var c0 = new verb.core.NurbsCurveData( 2, [0,0,0,1,1,1], [ [0,0,0,1], [1,0,0,1], [2,0,0,1] ] );
    var c1 = new verb.core.NurbsCurveData( 3, [0,0,0,0,1,1,1,1], [ [0,0,0,1], [1,0,0,1], [2,0,0,1], [3,0,0,1] ] );
    var c2 = new verb.core.NurbsCurveData( 3, [0,0,0,0,0.5,1,1,1,1], [ [0,0,0,1], [1,0,0,1], [2,0,0,1], [3,0,0,1], [4,0,0,1] ] );

    it('can handle straight beziers', () => {

        var curves = [c0, c1, c2]
        var res = verb.eval.Modify.unifyCurveKnotVectors(curves);

        res.forEach(function(x,i){
            sameCurve(x, curves[i]);
            x.knots.should.eql( c2.knots );
        });

    });
});

describe("verb.eval.Make.loftedSurface",() => {

    var c0 = new verb.core.NurbsCurveData( 2, [0,0,0,1,1,1], [ [0,0,0,1], [1,0,0,1], [2,0,0,1] ] );
    var c1 = new verb.core.NurbsCurveData( 3, [0,0,0,0,1,1,1,1], [ [0,0,1,1], [1,0,1,1], [2,0,1,1], [3,0,1,1] ] );
    var c2 = new verb.core.NurbsCurveData( 3, [0,0,0,0,0.5,1,1,1,1], [ [0,0,2,1], [1,0,2,1], [2,0,2,1], [3,0,2,1], [4,0,2,1] ] );

    it('can handle straight beziers', () => {

        var curves = [c0, c1, c2];
        var surface = verb.eval.Make.loftedSurface( curves );

        var p0 = verb.eval.Eval.dehomogenize( c0.controlPoints[0] );
        var closest0 = verb.eval.Analyze.rationalSurfaceClosestPoint( surface, p0 ) ;
        vecShouldBe( p0, closest0 );

        var p1 = verb.eval.Eval.dehomogenize( c0.controlPoints[2] );
        var closest1 = verb.eval.Analyze.rationalSurfaceClosestPoint( surface, p1 ) ;
        vecShouldBe( p1, closest1 );

        var p2 = verb.eval.Eval.dehomogenize( c1.controlPoints[0] );
        var closest2 = verb.eval.Analyze.rationalSurfaceClosestPoint( surface, p2 ) ;
        vecShouldBe( p2, closest2 );

        var p3 = verb.eval.Eval.dehomogenize( c1.controlPoints[3] );
        var closest3 = verb.eval.Analyze.rationalSurfaceClosestPoint( surface, p3 ) ;
        vecShouldBe( p3, closest3 );

        var p4 = verb.eval.Eval.dehomogenize( c2.controlPoints[0] );
        var closest4 = verb.eval.Analyze.rationalSurfaceClosestPoint( surface, p4 ) ;
        vecShouldBe( p4, closest4 );

        var p5 = verb.eval.Eval.dehomogenize( c2.controlPoints[4] );
        var closest5 = verb.eval.Analyze.rationalSurfaceClosestPoint( surface, p5 ) ;
        vecShouldBe( p5, closest5 );

    });
});
describe("verb.eval.Check.isValidNurbsCurveData",() => {

    it('is correct for basic case', () => {
        var c = new verb.core.NurbsCurveData( 2, [0,0,0,1,1,1], [ [0,0,0,1], [1,0,0,1], [2,0,0,1] ] );
        verb.eval.Check.isValidNurbsCurveData(c);
    });

    it('detects negative degree', function( done ){
        var c = new verb.core.NurbsCurveData( -1, [0,0,0,1,1,1], [ [0,0,0,1], [1,0,0,1], [2,0,0,1] ] );
        try { verb.eval.Check.isValidNurbsCurveData(c) } catch (e) { done(); }
    });

    it('detects low degree', function( done ){
        var c = new verb.core.NurbsCurveData( 1, [0,0,0,1,1,1], [ [0,0,0,1], [1,0,0,1], [2,0,0,1] ] );
        try { verb.eval.Check.isValidNurbsCurveData(c) } catch (e) { done(); }
    });

    it('detects high degree', function( done ){
        var c = new verb.core.NurbsCurveData( 3, [0,0,0,1,1,1], [ [0,0,0,1], [1,0,0,1], [2,0,0,1] ] );
        try { verb.eval.Check.isValidNurbsCurveData(c) } catch (e) { done(); }
    });

    it('detects null degree', function( done ){
        var c = new verb.core.NurbsCurveData( null, [0,0,0,0.5,1,1,2], [ [0,0,0,1], [1,0,0,1], [2,0,0,1] ] );
        try { verb.eval.Check.isValidNurbsCurveData(c) } catch (e) { done(); }
    });

    it('detects null knots', function( done ){
        var c = new verb.core.NurbsCurveData( 2, null, [ [0,0,0,1], [1,0,0,1], [2,0,0,1] ] );
        try { verb.eval.Check.isValidNurbsCurveData(c) } catch (e) { done(); }
    });

    it('detects null control points', function( done ){
        var c = new verb.core.NurbsCurveData( 2, [0,0,0,0.5,1,1,2], null );
        try { verb.eval.Check.isValidNurbsCurveData(c) } catch (e) { done(); }
    });

    it('detects too few control points', function( done ){
        var c = new verb.core.NurbsCurveData( 2, [0,0,0,0.5,1,1,2], [ [0,0,0,1],  [2,0,0,1] ] );
        try { verb.eval.Check.isValidNurbsCurveData(c) } catch (e) { done(); }
    });

    it('detects too many control points', function( done ){
        var c = new verb.core.NurbsCurveData( 2, [0,0,0,0.5,1,1,2], [ [0,0,0,1], [1,0,0,1], [2,0,0,1], [2,0,0,1] ] );
        try { verb.eval.Check.isValidNurbsCurveData(c) } catch (e) { done(); }
    });

});

describe("verb.eval.Check.isValidNurbsSurfaceData",() => {


    var degreeU = 3
        , degreeV = 3
        , knotsU = [0, 0, 0, 0, 1, 1, 1, 1]
        , knotsV =  [0, 0, 0, 0, 1, 1, 1, 1]
        , controlPoints = [     [ [0, 0, 50],       [10, 0, 0],         [20, 0, 0],         [30, 0, 0]      ],
                                                    [ [0, -10, 0],  [10, -10, 10],  [20, -10, 10],  [30, -10, 0]    ],
                                                    [ [0, -20, 0],  [10, -20, 10],  [20, -20, 10],  [30, -20, 0]    ],
                                                    [ [0, -30, 0],  [10, -30, 0],   [20, -30, 0],   [30, -30, 0]    ] ];

    it('is correct for basic case', () => {
        var c = new verb.core.NurbsSurfaceData( degreeU, degreeV, knotsU, knotsV, controlPoints );
        verb.eval.Check.isValidNurbsSurfaceData(c);
    });

    it('detects negative degree', function( done ){
        var c = new verb.core.NurbsSurfaceData( -1, degreeV, knotsU, knotsV, controlPoints );
        try { verb.eval.Check.isValidNurbsSurfaceData(c) } catch (e) { done(); }
    });

    it('detects negative degree', function( done ){
        var c = new verb.core.NurbsSurfaceData( degreeU, -1, knotsU, knotsV, controlPoints );
        try { verb.eval.Check.isValidNurbsSurfaceData(c) } catch (e) { done(); }
    });

    it('detects low degreeU', function( done ){
        var c = new verb.core.NurbsSurfaceData( degreeU, 1, knotsU, knotsV, controlPoints );
        try { verb.eval.Check.isValidNurbsSurfaceData(c) } catch (e) { done(); }
    });

    it('detects low degreeV', function( done ){
        var c = new verb.core.NurbsSurfaceData( 1, degreeV, knotsU, knotsV, controlPoints );
        try { verb.eval.Check.isValidNurbsSurfaceData(c) } catch (e) { done(); }
    });

    it('detects high degreeU', function( done ){
        var c = new verb.core.NurbsSurfaceData( degreeU, 5, knotsU, knotsV, controlPoints );
        try { verb.eval.Check.isValidNurbsSurfaceData(c) } catch (e) { done(); }
    });

    it('detects high degreeV', function( done ){
        var c = new verb.core.NurbsSurfaceData( 5, degreeV, knotsU, knotsV, controlPoints );
        try { verb.eval.Check.isValidNurbsSurfaceData(c) } catch (e) { done(); }
    });

    it('detects null degreeU', function( done ){
        var c = new verb.core.NurbsSurfaceData( degreeU, 1, knotsU, knotsV, controlPoints );
        try { verb.eval.Check.isValidNurbsSurfaceData(c) } catch (e) { done(); }
    });

    it('detects null degreeV', function( done ){
        var c = new verb.core.NurbsSurfaceData( 1, degreeV, knotsU, knotsV, controlPoints );
        try { verb.eval.Check.isValidNurbsSurfaceData(c) } catch (e) { done(); }
    });

    it('detects null knotsU', function( done ){
        var c = new verb.core.NurbsSurfaceData( degreeU, degreeV, knotsU, null, controlPoints );
        try { verb.eval.Check.isValidNurbsSurfaceData(c) } catch (e) { done(); }
    });

    it('detects null knotsV', function( done ){
        var c = new verb.core.NurbsSurfaceData( degreeU, degreeV, null, knotsV, controlPoints );
        try { verb.eval.Check.isValidNurbsSurfaceData(c) } catch (e) { done(); }
    });

    it('detects null control points', function( done ){
        var c = new verb.core.NurbsSurfaceData( degreeU, degreeV, knotsU, knotsV, null );
        try { verb.eval.Check.isValidNurbsSurfaceData(c) } catch (e) { done(); }
    });

    it('detects too few control points', function( done ){
        var controlPoints = [   [ [0, 0, 50],       [10, 0, 0],         [20, 0, 0],         [30, 0, 0]      ],
                                [ [0, -10, 0],  [10, -10, 10],  [20, -10, 10],  [30, -10, 0]    ],
                                [ [0, -20, 0],  [10, -20, 10],  [20, -20, 10],  [30, -20, 0]    ] ];
        var c = new verb.core.NurbsSurfaceData( degreeU, degreeV, knotsU, knotsV, controlPoints );
        try { verb.eval.Check.isValidNurbsSurfaceData(c) } catch (e) { done(); }
    });

    it('detects too many control points', function( done ){
        var controlPoints = [   [ [0, 0, 50],   [10, 0, 0],     [20, 0, 0],     [30, 0, 0]      ],
                                [ [0, -10, 0],  [10, -10, 10],  [20, -10, 10],  [30, -10, 0]    ],
                                [ [0, -20, 0],  [10, -20, 10],  [20, -20, 10],  [30, -20, 0]    ],
                                [ [0, -20, 0],  [10, -20, 10],  [20, -20, 10],  [30, -20, 0]    ],
                                [ [0, -30, 0],  [10, -30, 0],   [20, -30, 0],   [30, -30, 0]    ] ];

        var c = new verb.core.NurbsSurfaceData( degreeU, degreeV, knotsU, knotsV, controlPoints );
        try { verb.eval.Check.isValidNurbsSurfaceData(c) } catch (e) { done(); }

    });

});

describe("verb.eval.Check.isValidKnotVector",() => {

    it('detects correct knot vector', () => {
        verb.eval.Check.isValidKnotVector( [0,0,0,1,1,1], 2 ).should.be.equal(true);
        verb.eval.Check.isValidKnotVector( [0,0,0,0.5,1,1,1], 2 ).should.be.equal(true);
    });

    it('detects incorrect knot vector 0', () => {
        verb.eval.Check.isValidKnotVector( [0,0,1,1,1], 2 ).should.be.equal(false);
    });

    it('detects incorrect knot vector 1', () => {
        verb.eval.Check.isValidKnotVector( [0,0,0.5,1,1,1], 2 ).should.be.equal(false);
    });

    it('detects incorrect knot vector 2', () => {
        verb.eval.Check.isValidKnotVector( [0,0,0,1,1,2], 2 ).should.be.equal(false);
    });

    it('detects incorrect knot vector 3', () => {
        verb.eval.Check.isValidKnotVector( [0,0,0,0.5,1,1,2], 2 ).should.be.equal(false);
    });

    it('detects incorrect knot vector 4', () => {
        verb.eval.Check.isValidKnotVector( [0,0,0,0.5,0.25,1,1,1], 2 ).should.be.equal(false);
    });
});

describe("verb.eval.Intersect.meshes",() => {

    function glancingPlaneCylindricalSurface(){

        var axis = [0,0,1]
            , xaxis = [1,0,0]
            , base = [0,0,0]
            , height = 5
            , radius = 3;

        var srf1 = new verb.geom.CylindricalSurface( axis, xaxis, base, height, radius );

        var p5  = [5,5,0]
            , p6 = [-5,5,0]
            , p7 = [-5,-5,0]
            , p8 = [5,-5,0];

        var srf2 = verb.geom.NurbsSurface.byCorners( p5, p6, p7, p8 );

        return [srf1, srf2];

    }

    function nurbsSurfacePlane(){

        var degree = 3
            , knots = [0, 0, 0, 0, 0.333, 0.666, 1, 1, 1, 1]
            , pts = [   [ [0, 0, -10],  [10, 0, 0],     [20, 0, 0],     [30, 0, 0] ,    [40, 0, 0], [50, 0, 9] ],
                        [ [0, -10, 0],  [10, -10, 10],  [20, -10, 10],  [30, -10, 0] , [40, -10, 0], [50, -10, 0]   ],
                        [ [0, -20, 0],  [10, -20, 10],  [20, -20, 10],  [30, -20, 0] , [40, -20, -2], [50, -20, 0]  ],
                        [ [0, -30, 0],  [10, -30, 0],   [20, -30, 0],   [30, -30, 0] , [40, -30, 0], [50, -30, 0]     ],
                        [ [0, -40, 0],  [10, -40, 0],   [20, -40, 0],   [30, -40, 4] , [40, -40, -20], [50, -40, 0]     ],
                        [ [0, -50, 12], [10, -50, 0],   [20, -50, 0],   [30, -50, 0] , [50, -50, 0], [50, -50, 15]     ],     ];
        var srf1 = new verb.geom.NurbsSurface.byKnotsControlPointsWeights( degree, degree, knots, knots, pts );

        var p5 = [50,-50,3]
            , p6 = [50,0,3]
            , p7 = [0,0,3]
            , p8 = [0,-50,5];

        var srf2 = verb.geom.NurbsSurface.byCorners( p5, p6, p7, p8 );

        return [srf1,srf2];
    }

    function torusCylindricalSurface(){
        // center, xaxis, yaxis, radius
        var profile = new verb.geom.Circle( [5,0,0], [1,0,0], [0,0,1], 2 );

        var base = [0,0,0];
        var axis = [0,0,1];
        var angle = 2 * Math.PI
        var srf1 = new verb.geom.RevolvedSurface( profile, base, axis, angle );

        var axis = [-1,0,0]
            , xaxis = [0,0,1]
            , base = [8,0,0]
            , height = 16
            , radius = 2;

        var srf2 = new verb.geom.CylindricalSurface( axis, xaxis, base, height, radius );

        return [srf1,srf2];
    }

    it('detects all 4 polylines in nurbs surface plane intersection', () => {
        var srfs = nurbsSurfacePlane();
        var res = verb.eval.Intersect.meshes( srfs[0].tessellate(), srfs[1].tessellate() );

        res.length.should.be.equal( 4 );
    });

    it('detects all 8 intersection lines in torus cylinder intersection', () => {
        var srfs = torusCylindricalSurface();
        var res = verb.eval.Intersect.meshes( srfs[0].tessellate(), srfs[1].tessellate() );

        res.length.should.be.equal( 8 );
    });

    it('detects glancing intersection between cylinder and plane', () => {
        var srfs = glancingPlaneCylindricalSurface();
        var res = verb.eval.Intersect.meshes( srfs[0].tessellate(), srfs[1].tessellate() );

        res.length.should.be.equal( 1 );
    });

});

describe("verb.eval.Modify.knotsReverse",() => {
    it('can reverse basic knot array', () => {
        verb.eval.Modify.knotsReverse( [0,1,3,5] ).should.be.eql( [0,2,4,5] );
    });
 });

describe("verb.eval.Modify.curveReverse",() => {
    it('can reverse curve with uneven parameterization', () => {
        var c = new verb.core.NurbsCurveData( 2, [0,0,0,0.24,1,1,1], [ [0,0,0,1], [1,0,0,1], [0.5,1,0,1], [2,0,0,1] ] );
        var cr = verb.eval.Modify.curveReverse( c );
        var crr = verb.eval.Modify.curveReverse( cr );

        var cp0 = verb.eval.Eval.rationalCurvePoint( c, 0 );
        var cp1 = verb.eval.Eval.rationalCurvePoint( cr, 1.0 );

        vecShouldBe( cp0, cp1, verb.core.Constants.EPSILON );

        sameCurve( c, crr );
    });
});

describe("verb.eval.Modify.surfaceReverse",() => {

    var degreeU = 3
        , degreeV = 3
        , knotsU = [0, 0, 0, 0, 0.25, 1, 1, 1, 1]
        , knotsV =  [0, 0, 0, 0, 0.70, 1, 1, 1, 1]
        , controlPoints = [     [ [0, 0, 0],    [10, 0, 0],     [20, 0, 0],     [25, 0, 0],     [30, 0, 0]      ],
                                [ [0, -10, 0],  [10, -10, 0],   [20, -10, 0],   [25, -10, 0],   [30, -10, 0]    ],
                                [ [0, -20, 0],  [10, -20, 0],   [20, -20, 0],   [25, -20, 0],   [30, -20, 0]    ],
                                [ [0, -20, 0],  [10, -20, 0],   [20, -20, 0],   [25, -20, 0],   [30, -20, 0]    ],
                                [ [0, -30, 0],  [10, -30, 0],   [20, -30, 0],   [25, -30, 0],   [30, -30, 0]    ] ]
        , s = new verb.core.NurbsSurfaceData( degreeU, degreeV, knotsU, knotsV, controlPoints );

    it('is correct for u direction', () => {

        var sr = verb.eval.Modify.surfaceReverse( s, true );

        var sp0 = verb.eval.Eval.surfacePoint( s, 0, 0 );
        var sp1 = verb.eval.Eval.surfacePoint( sr, 0, 1.0 );
        vecShouldBe( sp0, sp1, verb.core.Constants.EPSILON );

        var srr = verb.eval.Modify.surfaceReverse( sr, true );

        var sp0 = verb.eval.Eval.surfacePoint( s, 0, 0 );
        var sp1 = verb.eval.Eval.surfacePoint( srr, 0, 0 );
        vecShouldBe( sp0, sp1, verb.core.Constants.EPSILON );

        var sp0 = verb.eval.Eval.surfacePoint( s, 1.0, 0 );
        var sp1 = verb.eval.Eval.surfacePoint( srr, 1.0, 0 );
        vecShouldBe( sp0, sp1, verb.core.Constants.EPSILON );


    });

    it('is correct for v direction', () => {

        var sr = verb.eval.Modify.surfaceReverse( s, false );

        var sp0 = verb.eval.Eval.surfacePoint( s, 0, 0 );
        var sp1 = verb.eval.Eval.surfacePoint( sr, 1.0, 0 );
        vecShouldBe( sp0, sp1, verb.core.Constants.EPSILON );

        var srr = verb.eval.Modify.surfaceReverse( sr, false );

        sp0 = verb.eval.Eval.surfacePoint( s, 0, 0 );
        sp1 = verb.eval.Eval.surfacePoint( srr, 0, 0 );
        vecShouldBe( sp0, sp1, verb.core.Constants.EPSILON );

        sp0 = verb.eval.Eval.surfacePoint( s, 1.0, 0 );
        sp1 = verb.eval.Eval.surfacePoint( srr, 1.0, 0 );
        vecShouldBe( sp0, sp1, verb.core.Constants.EPSILON );


    });
});

describe("verb.eval.Intersect.sliceMeshes",() => {

    it('is correct for basic example', () => {

        var srf = verb.geom.NurbsSurface.byCorners( [0,1,0], [10,0,0], [10,10,10], [0,10,10] );
        var mesh = srf.tessellate();

        var res = verb.eval.Intersect.meshSlices( mesh, 0, 10, 0.5 );

        // need better example

    });
});


describe("verb.eval.Make.rationalTranslationalSurface",() => {

    it('provides expected result for linear rail and profile', () => {

        var rail = verb.eval.Make.rationalBezierCurve( [[0,0,0], [1,1,1]] );
        var prof = verb.eval.Make.rationalBezierCurve( [[0,0,0], [1,0,0]] );

        var srf = verb.eval.Make.rationalTranslationalSurface( prof, rail );

        vecShouldBe( verb.eval.Eval.rationalSurfacePoint( srf, 0, 0 ), [0,0,0] );
        vecShouldBe( verb.eval.Eval.rationalSurfacePoint( srf, 1, 0 ), [1,0,0] );
        vecShouldBe( verb.eval.Eval.rationalSurfacePoint( srf, 1, 1 ), [2,1,1] );
        vecShouldBe( verb.eval.Eval.rationalSurfacePoint( srf, 0, 1 ), [1,1,1] );

    });

    it('provides expected result for linear profile, curved rail', () => {

        var rail = verb.eval.Make.rationalBezierCurve( [[0,0,0], [1,0.5,1], [2,1,1]] );
        var prof = verb.eval.Make.rationalBezierCurve( [[0,0,0], [2,0,0]] );

        var srf = verb.eval.Make.rationalTranslationalSurface( prof, rail );

        vecShouldBe( verb.eval.Eval.rationalSurfacePoint( srf, 0, 0 ), [0,0,0] );
        vecShouldBe( verb.eval.Eval.rationalSurfacePoint( srf, 1, 0 ), [2,0,0] );
        vecShouldBe( verb.eval.Eval.rationalSurfacePoint( srf, 1, 1 ), [4,1,1] );
        vecShouldBe( verb.eval.Eval.rationalSurfacePoint( srf, 0, 1 ), [2,1,1] );

    });

});

describe("verb.eval.Make.surfaceIsocurve",() => {

    var degreeU = 3
        , degreeV = 3
        , knotsU = [0, 0, 0, 0, 1, 1, 1, 1]
        , knotsV =  [0, 0, 0, 0, 1, 1, 1, 1]
        , controlPoints = [     [ [0, 0, 0],    [10, 0, 0],     [20, 0, 0],     [30, 0, 0]      ],
                                [ [0, -10, 0],  [10, -10, 0],   [20, -10, 0],   [30, -10, 0]    ],
                                [ [0, -20, 0],  [10, -20, 0],   [20, -20, 0],   [30, -20, 0]    ],
                                [ [0, -30, 0],  [10, -30, 0],   [20, -30, 0],   [30, -30, 0]    ] ]
        , bezier = new verb.core.NurbsSurfaceData( degreeU, degreeV, knotsU, knotsV, controlPoints );


    it('provides boundary isocurves at extremes of domain', () => {

        var res = verb.eval.Make.surfaceIsocurve( bezier, 0, false );

        var cpts = res.controlPoints;

        var pt0 = verb.eval.Eval.surfacePoint( bezier, 0, 0.0 );
        var pt1 = verb.eval.Eval.surfacePoint( bezier, 0, 1.0 );

        vecShouldBe( pt0, cpts[0] );
        vecShouldBe( pt1, cpts[cpts.length-1] );

    });

    it('provides isocurves at expected location in v direction', () => {

        for (var i = 0; i <= 1.0; i += 0.1 ){

            var res = verb.eval.Make.surfaceIsocurve( bezier, i, true );

            var cpts = res.controlPoints;

            var pt0 = verb.eval.Eval.surfacePoint( bezier, 0.0, i );
            var pt1 = verb.eval.Eval.surfacePoint( bezier, 1.0, i );

            vecShouldBe( pt0, cpts[0] );
            vecShouldBe( pt1, cpts[cpts.length-1] );

        }

    });

});
describe("verb.eval.Make.surfaceBoundaryCurves",() => {

    it('provides expected result for planar surface', () => {

        var a = [0,0,0];
        var b = [1,0,0];
        var c = [1,1,0];
        var d = [0,1,0];

        var srf = verb.eval.Make.fourPointSurface( a, b, c, d );

        var crvs = verb.eval.Make.surfaceBoundaryCurves( srf );

        crvs[0].degree.should.be.equal( srf.degreeV );
        crvs[1].degree.should.be.equal( srf.degreeV );
        crvs[2].degree.should.be.equal( srf.degreeU );
        crvs[3].degree.should.be.equal( srf.degreeU );

        vecShouldBe( verb.eval.Eval.dehomogenize( crvs[0].controlPoints[0] ), a );
        vecShouldBe( verb.eval.Eval.dehomogenize( crvs[0].controlPoints[3] ), d );

        vecShouldBe( verb.eval.Eval.dehomogenize( crvs[1].controlPoints[0] ), b );
        vecShouldBe( verb.eval.Eval.dehomogenize( crvs[1].controlPoints[3] ), c );

        vecShouldBe( verb.eval.Eval.dehomogenize( crvs[2].controlPoints[0] ), a );
        vecShouldBe( verb.eval.Eval.dehomogenize( crvs[2].controlPoints[3] ), b );

        vecShouldBe( verb.eval.Eval.dehomogenize( crvs[3].controlPoints[0] ), d );
        vecShouldBe( verb.eval.Eval.dehomogenize( crvs[3].controlPoints[3] ), c );

    });

});

describe("verb.eval.Intersect.segmentAndPlane",() => {
    it('works for simple cases', () => {
        verb.eval.Intersect.segmentAndPlane( [0,0,0], [0,0,1], [0,0,0.5], [0,0,1] ).p.should.be.approximately( 0.5, verb.core.Constants.EPSILON );
        verb.eval.Intersect.segmentAndPlane( [0,0,0], [0,0,1], [0,0,0.1], [0,0,1] ).p.should.be.approximately( 0.1, verb.core.Constants.EPSILON );
        verb.eval.Intersect.segmentAndPlane( [0,0,0], [0,0,1], [0,0,0.9], [0,0,1] ).p.should.be.approximately( 0.9, verb.core.Constants.EPSILON );
        verb.eval.Intersect.segmentAndPlane( [0,0,0], [0,1,0], [0,0.5,0], [0,1,0] ).p.should.be.approximately( 0.5, verb.core.Constants.EPSILON );
        verb.eval.Intersect.segmentAndPlane( [0,0,0], [0,1,0], [0,0.1,0], [0,1,0] ).p.should.be.approximately( 0.1, verb.core.Constants.EPSILON );
    });
});


describe("verb.eval.Make.rationalInterpCurve",() => {

    function shouldInterpPointsWithTangents(pts, degree, isHomo, start_tangent, end_tangent){

        var crv = shouldInterpPoints(pts, degree, isHomo, start_tangent, end_tangent);

        var tan0 = verb.eval.Eval.rationalCurveDerivatives( crv, 0, 1)[1];
        var tan1 = verb.eval.Eval.rationalCurveDerivatives( crv, 1, 1)[1];

        vecShouldBe( start_tangent, tan0 );
        vecShouldBe( end_tangent, tan1 );

    }

    function shouldInterpPoints(pts, degree, isHomo, start_tangent, end_tangent){

        var crv = verb.eval.Make.rationalInterpCurve( pts, degree, isHomo, start_tangent, end_tangent );

        crv.degree.should.be.equal( degree );

        crv.controlPoints[0][0].should.be.approximately(pts[0][0], verb.core.Constants.TOLERANCE);
        crv.controlPoints[0][1].should.be.approximately(pts[0][1], verb.core.Constants.TOLERANCE);

        last(crv.controlPoints)[0].should.be.approximately(last(pts)[0], verb.core.Constants.TOLERANCE);
        last(crv.controlPoints)[1].should.be.approximately(last(pts)[1], verb.core.Constants.TOLERANCE);

        // // the internal points are interped
        var tess = verb.eval.Tess.rationalCurveAdaptiveSample( crv, 1e-3  );

        for (var j = 0; j < pts.length; j++){

            var min = Number.MAX_VALUE;
            for (var i = 1; i < tess.length; i++){

                var pt = pts[j];
                var o = tess[i-1];
                var r = verb.core.Vec.normalized( verb.core.Vec.sub( tess[i], tess[i-1] ) );

                var dist = verb.core.Trig.distToRay( pt, o, r );

                if (dist < min) {
                    min = dist;
                }
            }

            min.should.be.lessThan( 1e-3 );
        }

        return crv;
    }

    it('can compute valid cubic interpolating curve for 4 points', () => {

        var pts = [ [0, 0, 1], [3,4, 0], [-1,4, 0], [-4,0, 0] ];

        shouldInterpPoints( pts, 3 );

    });

    it('can compute valid degree 4 interpolating curve for 4 points', () => {

        var pts = [ [0, 0, 0], [3,4, 0], [-1,4, 0], [-4,0, 0], [-4,-3, 0] ];

        shouldInterpPoints( pts, 4 );

    });

    it('can compute valid quadratic interpolating curve for 4 points', () => {

        var pts = [ [0, 0, 0], [3,4, 0], [-1,4, 0], [-4,0, 0], [-4,-3, 0] ];

        shouldInterpPoints( pts, 2 );

    });

    it('can compute valid cubic interpolating curve for 100 points', () => {

        var pts = [];
        for (var i = 0; i < 100; i++){

            pts.push( [ 50 * Math.sin( (i / 100) * Math.PI ),
                                    50 * Math.cos( (i / 100) * Math.PI ),
                                    0 ]);

        }

        shouldInterpPoints( pts, 3 );

    });

    it('can compute valid cubic interpolating points and tangents', () => {

        var pts = [ [0, 0, 0], [3,4, 0], [-1,4, 0], [-4,0, 0], [-4,-3, 0] ];

        shouldInterpPointsWithTangents( pts, 3, false, [1,0,0], [0,1,0] );

    });

    // this fails occasionally - don't know why
    // it('can compute valid quadratic curve interpolating points and tangents', () => {

    //  var pts = [ [0, 0, 0], [3,4, 0], [-1,4, 0], [-4,0, 0], [-4,-3, 0] ];

    //  shouldInterpPointsWithTangents( pts, 2, false, [1,0,0], [0,1,0] );

    // });

    // it('can compute valid quadratic curve interpolating points and tangents', () => {

    //  var pts = [ [0, 0, 0], [3,4, 0], [-1,4, 0], [-4,0, 0], [-4,-3, 0] ];

    //  shouldInterpPointsWithTangents( pts, 4, false, [1,0,0], [0,1,0] );

    // });

});



describe("verb.eval.Tess.surfaceRegularSample",() => {

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

    var complexSurface = getComplexSurface();

    it('returns correct result for complex surface', () => {

        var p = verb.eval.Tess.surfaceRegularSample( complexSurface, 10, 10 );

        var ar = [];
        var sp = 1 / 10;

        var i, j;

        for (i = 0; i < 11; i++){
            var ari = [];
            ar.push(ari);
            for (var j = 0; j < 11; j++){
                ari.push( verb.eval.Eval.surfacePoint( complexSurface, i*sp, j*sp ) )
            }
        }

        p.length.should.equal(ar.length);

        for (i = 0; i < ar.length; i++){

            p[i].length.should.equal(ar[i].length);

            for (j = 0; j < ar[i].length; j++){
                vecShouldBe( p[i][j], ar[i][j] );
            }
        }
    });
});


describe("verb.eval.Modify.decomposeCurveIntoBeziers",() => {

    it('is correct for a degree 3 spline curve with 5 internal knot spans', () => {

        var degree = 3
            , knots = [ 0, 0, 0, 0, 1, 2, 3, 4, 5, 5, 5, 5 ];

        var controlPoints = [];
        for (var i = 0; i < 8; i++) {
            controlPoints.push([i, 0, 0]);
        }

        var crv = new verb.core.NurbsCurveData( degree, knots, controlPoints );

        var res = verb.eval.Modify.decomposeCurveIntoBeziers( crv );

        res.length.should.be.equal( 5 );

        res.forEach(function(x){

            var u0 = x.knots[0];

            var pt0 = verb.eval.Eval.curvePoint( x, u0);
            var pt1 = verb.eval.Eval.curvePoint( crv, u0);

            ( verb.core.Vec.norm(verb.core.Vec.sub(pt0, pt1))).should.be.approximately(0, verb.core.Constants.TOLERANCE );

        });
    });

    it('is correct for a degree 3 spline curve with 2 internal knot spans', () => {

        var degree = 3
            , knots = [0, 0, 0, 0, 0.3, 0.666, 1, 1, 1, 1 ]
            , controlPoints = [ [1,0,1], [1,2,1], [1,1,1], [0,1,2], [0,2,2], [0,2,2] ]
            , crv = new verb.core.NurbsCurveData( degree, knots, controlPoints );

        var res = verb.eval.Modify.decomposeCurveIntoBeziers( crv );

        res.length.should.be.equal( 3 );

        res.forEach(function(x){

            var u0 = x.knots[0];

            var pt0 = verb.eval.Eval.curvePoint( x, u0);
            var pt1 = verb.eval.Eval.curvePoint( crv, u0);

            ( verb.core.Vec.norm(verb.core.Vec.sub(pt0, pt1))).should.be.approximately(0, verb.core.Constants.TOLERANCE );

        });

    });
});

describe("verb.eval.Tess.rationalCurveRegularSample",() => {

    function evalAndCompare(crv){

        var divs = 100;
        var p = verb.eval.Tess.rationalCurveRegularSample( crv, divs );

        var p2 = [];
        var sp = 1 / divs;

        for (var i = 0; i < divs+1; i++){
            p2.push( verb.eval.Eval.rationalCurvePoint( crv, i*sp ) )
        }

        p.length.should.equal( p2.length );

        for (var i = 0; i < p.length; i++){
            vecShouldBe( p[i], p2[i] );
        }
    }

    it('returns correct result for basic bezier curve', () => {

        var crv = verb.eval.Make.rationalBezierCurve( [[0,0,0], [1,1,1], [2,1,1], [3,1,0]] );
        evalAndCompare(crv);

    });

    it('returns correct result for degree 2 b spline curve with 2 internal knot spans', () => {

        var degree = 2
            , knots = [0, 0, 0, 0.3, 1, 1, 1 ]
            , controlPoints = [ [1,0,1], [1,2,1], [1,1,1], [0,2,2] ]
            , crv = new verb.core.NurbsCurveData( degree, knots, controlPoints );

        evalAndCompare(crv);

    });

    it('returns correct result for degree 2 b spline curve with 3 internal knot spans', () => {

        var degree = 2
            , knots = [0, 0, 0, 0.3, 0.666, 1, 1, 1 ]
            , controlPoints = [ [1,0,1], [1,2,1], [1,1,1], [0,1,2], [0,2,2] ]
            , crv = new verb.core.NurbsCurveData( degree, knots, controlPoints );

        evalAndCompare(crv);

    });

});

describe("verb.eval.Tess.rationalBezierCurveStepLength",() => {
	it('works for simple cases', () => {

		var pts = [ [0, 0, 0], [1, 2, 0], [2, 0, 0], [3, 0, 0] ];
		var crv = verb.eval.Make.rationalInterpCurve( pts, 3, false );
		var l = verb.eval.Tess.rationalBezierCurveStepLength( crv, 0.001 );

		console.log( l );

	});
});



describe("verb.eval.Tess.rationalBezierSurfaceStepLength",() => {

    function getComplexSurface(){

        var degree = 3
            , knots = [0, 0, 0, 0, 1, 1, 1, 1]
            , pts = [   [ [0, 0, -1],  [10, 0, 0],     [20, 0, 0], [30, 0, 0] ],
                        [ [0, -10, 0],  [10, -10, 0],  [20, -10, 0], [30, -10, 0]   ],
                        [ [0, -20, 0],  [10, -20, 0],  [20, -20, -2], [30, -20, 0]  ],
                        [ [0, -30, 0],  [10, -30, 0],   [20, -30, 0], [30, -30, 0]     ]  ]
            , wts = [   [ 1, 1, 1, 1, 1, 1],
                        [ 1, 1, 1, 1, 1, 1],
                        [ 1, 1, 1, 1, 1, 1],
                        [ 1, 1, 1, 1, 1, 1],
                        [ 1, 1, 1, 1, 1, 1],
                        [ 1, 1, 1, 1, 1, 1] ];

        pts = verb.eval.Eval.homogenize2d(pts, wts);

        return {
            degreeU : degree,
            degreeV : degree,
            knotsU : knots,
            knotsV : knots,
            controlPoints : pts
        };
    }

	it('works for simple cases', () => {

		var l = verb.eval.Tess.rationalBezierSurfaceStepLength( getComplexSurface(), 0.001 );

		console.log( l );

	});
});



describe("verb.eval.Eval.curveKnotRefine",() => {

    function cubicInsert(u, r){

        var degree = 3
            , knots = [ 0, 0, 0, 0, 1, 2, 3, 4, 5, 5, 5, 5 ]
            , new_knots = [];

        for (var i = 0; i < r; i++){
            new_knots.push(u);
        }

        var controlPoints = [];
        for (var i = 0; i < 8; i++) controlPoints.push([i, 0, 0]);

        var crv = new verb.core.NurbsCurveData( degree, knots, controlPoints );
        var after = verb.eval.Modify.curveKnotRefine( crv, new_knots );

        after.controlPoints.forEach(function(cp){ should.exist(cp); });
        after.knots.forEach(function(cp){ should.exist(cp); });

        should.equal(knots.length + r, after.knots.length);
        should.equal(controlPoints.length + r, after.controlPoints.length);

        var p0 = verb.eval.Eval.curvePoint( crv, 2.5);
        var p1 = verb.eval.Eval.curvePoint( after, 2.5);

        p0[0].should.be.approximately(p1[0], verb.core.Constants.TOLERANCE);
        p0[1].should.be.approximately(p1[1], verb.core.Constants.TOLERANCE);
        p0[2].should.be.approximately(p1[2], verb.core.Constants.TOLERANCE);

    }

    it('returns expected results when inserting multiple knots in the middle of a non-rational, cubic b-spline', () => {

        cubicInsert(2.5, 1);
        cubicInsert(2.5, 2);
        cubicInsert(2.5, 3);
        cubicInsert(2.5, 4);

        cubicInsert(0.5, 1);
        cubicInsert(0.5, 2);
        cubicInsert(0.5, 3);
        cubicInsert(0.5, 4);

        cubicInsert(3, 1);
        cubicInsert(3, 2);

    });

});


describe("verb.eval.Modify.surfaceKnotRefine",() => {

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

    it('can add knots into a surface in the u direction', () => {

        var r = 3;
        var u = 0.2;
        var new_knots = [];

        for (var i = 0; i < r; i++){
            new_knots.push(u);
        }

        var res = verb.eval.Modify.surfaceKnotRefine( surface, new_knots, false );

        res.controlPoints.forEach(function(cp){ should.exist(cp); });
        res.knotsU.forEach(function(cp){ should.exist(cp); });
        res.knotsV.forEach(function(cp){ should.exist(cp); });

        should.equal(knotsU.length + r, res.knotsU.length);
        should.equal(controlPoints.length + r, res.controlPoints.length);

        var p0 = verb.eval.Eval.surfacePoint( surface, 0.5, 0.25 );
        var p1 = verb.eval.Eval.surfacePoint( res, 0.5, 0.25);

        p0[0].should.be.approximately(p1[0], verb.core.Constants.TOLERANCE);
        p0[1].should.be.approximately(p1[1], verb.core.Constants.TOLERANCE);
        p0[2].should.be.approximately(p1[2], verb.core.Constants.TOLERANCE);

    });

    it('can add knots into a surface in the v direction', () => {

        var r = 3;
        var u = 0.2;
        var new_knots = [];

        for (var i = 0; i < r; i++){
            new_knots.push(u);
        }

        var res = verb.eval.Modify.surfaceKnotRefine( surface, new_knots, true );

        res.controlPoints.forEach(function(cp){ should.exist(cp); });
        res.knotsU.forEach(function(cp){ should.exist(cp); });
        res.knotsV.forEach(function(cp){ should.exist(cp); });

        should.equal(knotsV.length + r, res.knotsV.length);
        should.equal(controlPoints[0].length + r, res.controlPoints[0].length);

        var p0 = verb.eval.Eval.surfacePoint( surface, 0.5, 0.25 );
        var p1 = verb.eval.Eval.surfacePoint( res, 0.5, 0.25);

        p0[0].should.be.approximately(p1[0], verb.core.Constants.TOLERANCE);
        p0[1].should.be.approximately(p1[1], verb.core.Constants.TOLERANCE);
        p0[2].should.be.approximately(p1[2], verb.core.Constants.TOLERANCE);

    });
});


*/

describe("verb.eval.Modify.surfaceKnotRefine",() => {

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

    it('can add knots into a surface in the u direction', () => {

        var r = 1;
        var u = 0.2;
        var new_knots = [];

        for (var i = 0; i < r; i++){
            new_knots.push(u);
        }

        var res = verb.eval.Modify.surfaceKnotRefine( surface, new_knots, false );

        res.controlPoints.forEach(function(cp){ should.exist(cp); });
        res.knotsU.forEach(function(cp){ should.exist(cp); });
        res.knotsV.forEach(function(cp){ should.exist(cp); });

        should.equal(knotsU.length + r, res.knotsU.length);
        should.equal(controlPoints.length + r, res.controlPoints.length);

        var p0 = verb.eval.Eval.surfacePoint( surface, 0.5, 0.25 );
        var p1 = verb.eval.Eval.surfacePoint( res, 0.5, 0.25);

        p0[0].should.be.approximately(p1[0], verb.core.Constants.TOLERANCE);
        p0[1].should.be.approximately(p1[1], verb.core.Constants.TOLERANCE);
        p0[2].should.be.approximately(p1[2], verb.core.Constants.TOLERANCE);

    });

    it('can add multiple knots into a surface in the u direction', () => {

        var r = 3;
        var u = 0.2;
        var new_knots = [];

        for (var i = 0; i < r; i++){
            new_knots.push(u);
        }

        var res = verb.eval.Modify.surfaceKnotRefine( surface, new_knots, false );

        res.controlPoints.forEach(function(cp){ should.exist(cp); });
        res.knotsU.forEach(function(cp){ should.exist(cp); });
        res.knotsV.forEach(function(cp){ should.exist(cp); });

        should.equal(knotsU.length + r, res.knotsU.length);
        should.equal(controlPoints.length + r, res.controlPoints.length);

        var p0 = verb.eval.Eval.surfacePoint( surface, 0.5, 0.25 );
        var p1 = verb.eval.Eval.surfacePoint( res, 0.5, 0.25);

        p0[0].should.be.approximately(p1[0], verb.core.Constants.TOLERANCE);
        p0[1].should.be.approximately(p1[1], verb.core.Constants.TOLERANCE);
        p0[2].should.be.approximately(p1[2], verb.core.Constants.TOLERANCE);

    });

    it('can add knots into a surface in the v direction', () => {

        var r = 1;
        var u = 0.2;
        var new_knots = [];

        for (var i = 0; i < r; i++){
            new_knots.push(u);
        }

        var res = verb.eval.Modify.surfaceKnotRefine( surface, new_knots, true );

        res.controlPoints.forEach(function(cp){ should.exist(cp); });
        res.knotsU.forEach(function(cp){ should.exist(cp); });
        res.knotsV.forEach(function(cp){ should.exist(cp); });

        should.equal(knotsV.length + r, res.knotsV.length);
        should.equal(controlPoints[0].length + r, res.controlPoints[0].length);

        var p0 = verb.eval.Eval.surfacePoint( surface, 0.5, 0.25 );
        var p1 = verb.eval.Eval.surfacePoint( res, 0.5, 0.25);

        p0[0].should.be.approximately(p1[0], verb.core.Constants.TOLERANCE);
        p0[1].should.be.approximately(p1[1], verb.core.Constants.TOLERANCE);
        p0[2].should.be.approximately(p1[2], verb.core.Constants.TOLERANCE);


    });

    it('can add multiple duplicate knots into a surface in the v direction', () => {

        var r = 4;
        var u = 0.2;
        var new_knots = [];

        for (var i = 0; i < r; i++){
            new_knots.push(u);
        }

        var res = verb.eval.Modify.surfaceKnotRefine( surface, new_knots, true );

        res.controlPoints.forEach(function(cp){ should.exist(cp); });
        res.knotsU.forEach(function(cp){ should.exist(cp); });
        res.knotsV.forEach(function(cp){ should.exist(cp); });

        should.equal(knotsV.length + r, res.knotsV.length);
        should.equal(controlPoints[0].length + r, res.controlPoints[0].length);

        var p0 = verb.eval.Eval.surfacePoint( surface, 0.5, 0.25 );
        var p1 = verb.eval.Eval.surfacePoint( res, 0.5, 0.25);

        p0[0].should.be.approximately(p1[0], verb.core.Constants.TOLERANCE);
        p0[1].should.be.approximately(p1[1], verb.core.Constants.TOLERANCE);
        p0[2].should.be.approximately(p1[2], verb.core.Constants.TOLERANCE);

    });

   it('can add multiple duplicate knots into a bezier patch in the u direction', () => {

        var degreeU = 3
        , degreeV = 3
        , knotsU = [0, 0, 0, 0, 1, 1, 1, 1]
        , knotsV =  [0, 0, 0, 0, 1, 1, 1, 1]
        , controlPoints = [     [ [0, 0, 0],    [10, 0, 0],     [20, 0, 0],     [30, 0, 0]      ],
                                [ [0, -10, 0],  [10, -10, 0],   [20, -10, 0],   [30, -10, 0]    ],
                                [ [0, -20, 0],  [10, -20, 0],   [20, -20, 0],   [30, -20, 0]    ],
                                [ [0, -30, 0],  [10, -30, 0],   [20, -30, 0],   [30, -30, 0]    ] ]
        , bezier = new verb.core.NurbsSurfaceData( degreeU, degreeV, knotsU, knotsV, controlPoints );

        var r = 4;
        var u = 0.2;
        var new_knots = [];

        for (var i = 0; i < r; i++){
            new_knots.push(u);
        }

        var res = verb.eval.Modify.surfaceKnotRefine( bezier, new_knots, false );

        var d = 20;

        var u0 = u = res.knotsU[0];
        var v0 = v = res.knotsV[0];

        var ur = res.knotsU[res.knotsU.length-1] - res.knotsV[0];
        var vr = res.knotsV[res.knotsV.length-1] - res.knotsV[0];

        var us = ur / (d-1);
        var vs = vr / (d-1);

        for (var i = 0; i < d; i++){

             v = v0;

             for (var j= 0; j < d; j++){
                var p0 = verb.eval.Eval.surfacePoint( bezier, u, v);
                var p1 = verb.eval.Eval.surfacePoint( res, u, v);

                vecShouldBe(p0, p1);

                u += us;
             }

             v += vs;
        }


        res.controlPoints.forEach(function(cp){ should.exist(cp); });
        res.knotsU.forEach(function(cp){ should.exist(cp); });
        res.knotsV.forEach(function(cp){ should.exist(cp); });

        should.equal(knotsU.length + r, res.knotsU.length);
        should.equal(controlPoints.length + r, res.controlPoints.length);

        var p0 = verb.eval.Eval.surfacePoint( bezier, 0.5, 0.25 );
        var p1 = verb.eval.Eval.surfacePoint( res, 0.5, 0.25);

        p0[0].should.be.approximately(p1[0], verb.core.Constants.TOLERANCE);
        p0[1].should.be.approximately(p1[1], verb.core.Constants.TOLERANCE);
        p0[2].should.be.approximately(p1[2], verb.core.Constants.TOLERANCE);

    });

   it('can add multiple duplicate knots into a bezier patch in the v direction', () => {

        var degreeU = 3
        , degreeV = 3
        , knotsU = [0, 0, 0, 0, 1, 1, 1, 1]
        , knotsV =  [0, 0, 0, 0, 1, 1, 1, 1]
        , controlPoints = [     [ [0, 0, 0],    [10, 0, 0],     [20, 0, 0],     [30, 0, 0]      ],
                                [ [0, -10, 0],  [10, -10, 0],   [20, -10, 0],   [30, -10, 0]    ],
                                [ [0, -20, 0],  [10, -20, 0],   [20, -20, 0],   [30, -20, 0]    ],
                                [ [0, -30, 0],  [10, -30, 0],   [20, -30, 0],   [30, -30, 0]    ] ]
        , bezier = new verb.core.NurbsSurfaceData( degreeU, degreeV, knotsU, knotsV, controlPoints );

        var r = 4;
        var u = 0.2;
        var new_knots = [];

        for (var i = 0; i < r; i++){
            new_knots.push(u);
        }

        var res = verb.eval.Modify.surfaceKnotRefine( bezier, new_knots, true );

        var d = 20;

        var u0 = u = res.knotsU[0];
        var v0 = v = res.knotsV[0];

        var ur = res.knotsU[res.knotsU.length-1] - res.knotsV[0];
        var vr = res.knotsV[res.knotsV.length-1] - res.knotsV[0];

        var us = ur / (d-1);
        var vs = vr / (d-1);

        for (var i = 0; i < d; i++){

             v = v0;

             for (var j= 0; j < d; j++){
                var p0 = verb.eval.Eval.surfacePoint( bezier, u, v);
                var p1 = verb.eval.Eval.surfacePoint( res, u, v);

                vecShouldBe(p0, p1);

                u += us;
             }

             v += vs;
        }

        res.controlPoints.forEach(function(cp){ should.exist(cp); });
        res.knotsU.forEach(function(cp){ should.exist(cp); });
        res.knotsV.forEach(function(cp){ should.exist(cp); });

        should.equal(knotsV.length + r, res.knotsV.length);
        should.equal(controlPoints[0].length + r, res.controlPoints[0].length);

        var p0 = verb.eval.Eval.surfacePoint( bezier, 0.5, 0.25 );
        var p1 = verb.eval.Eval.surfacePoint( res, 0.5, 0.25);

        p0[0].should.be.approximately(p1[0], verb.core.Constants.TOLERANCE);
        p0[1].should.be.approximately(p1[1], verb.core.Constants.TOLERANCE);
        p0[2].should.be.approximately(p1[2], verb.core.Constants.TOLERANCE);

    });

});


describe("verb.eval.Modify.decomposeSurfaceIntoBeziers",() => {

    var getSurface11 = () => {

        var degreeU = 3
            , degreeV = 3
            , knotsU = [0, 0, 0, 0, 1, 1, 1, 1]
            , knotsV =  [0, 0, 0, 0, 1, 1, 1, 1]
            , controlPoints = [     [ [0, 0, 0],    [10, 0, 0],     [20, 0, 0],     [30, 0, 0]      ],
                                    [ [0, -10, 0],  [10, -10, 0],   [20, -10, 0],   [30, -10, 0]    ],
                                    [ [0, -20, 0],  [10, -20, 0],   [20, -20, 0],   [30, -20, 0]    ],
                                    [ [0, -30, 0],  [10, -30, 0],   [20, -30, 0],   [30, -30, 0]    ] ]
            , bezier = new verb.core.NurbsSurfaceData( degreeU, degreeV, knotsU, knotsV, controlPoints );

        return bezier;
    };

    var getSurface23 = () => {

        var degree = 3
            , knotsV = [0, 0, 0, 0, 0.333, 0.666, 1, 1, 1, 1]
            , knotsU = [0, 0, 0, 0, 0.5, 1, 1, 1, 1]
            , controlPoints = [
                        [ [0, 0, 0],    [10, 0, 0],     [20, 0, 0],     [30, 0, 0] ,    [40, 0, 0],     [50, 0, 0] ],
                        [ [0, -10, 0],  [10, -10, 0],  [20, -10, 0],  [30, -10, 0] ,  [40, -10, 0],   [50, -10, 0]    ],
                        [ [0, -20, 0],  [10, -20, 0],  [20, -20, 0],  [30, -20, 0] ,  [40, -20, 0],  [50, -20, 0]    ],
                        [ [0, -30, 0],  [10, -30, 0],   [20, -30, 0], [30, -30, 0] ,  [40, -30, 0],   [50, -30, 0]     ],
                        [ [0, -40, 0],  [10, -40, 0],   [20, -40, 0],   [30, -40, 0] ,  [40, -40, -20], [50, -40, 0]     ] ]
            , surface23 = new verb.core.NurbsSurfaceData( degree, degree, knotsU, knotsV, controlPoints );

        return surface23;
    };

    var checkSurfaceDecomposition = (surface, decomp, divsU, divsV) => {

        should.equal( divsU, decomp.length );

        for (var i = 0; i < divsU; i++){
            should.equal( divsV, decomp[i].length );
        }

        var d = 10;

        decomp.forEach((x,k) => {
            x.forEach((y, l) => {

                var u0 = u = y.knotsU[0];
                var v0 = v = y.knotsV[0];

                var ur = y.knotsU[y.knotsU.length-1] - y.knotsV[0];
                var vr = y.knotsV[y.knotsV.length-1] - y.knotsV[0];

                var us = ur / (d-1);
                var vs = vr / (d-1);

                for (var i = 0; i < d; i++){

                     v = v0;

                     for (var j= 0; j < d; j++){
                        var p0 = verb.eval.Eval.surfacePoint( surface, u, v);
                        var p1 = verb.eval.Eval.surfacePoint( y, u, v);

                        vecShouldBe(p0, p1);

                        u += us;
                     }

                     v += vs;
                }
            });
        });

    };

    it('can decompose into 2 x 3 set of bezier patches with no distortion', () => {

        var surface23 = getSurface23();
        var res = verb.eval.Modify.decomposeSurfaceIntoBeziers( surface23 );

        checkSurfaceDecomposition( surface23, res, 2, 3 );

     });

    it('can decompose into 1 x 1 set of bezier patches with no distortion', () => {

        var surface11 = getSurface11();
        var res = verb.eval.Modify.decomposeSurfaceIntoBeziers( surface11 );

        checkSurfaceDecomposition( surface11, res, 1, 1 );

    });
});


describe("verb.eval.Tess.rationalSurfaceAdaptiveSample",() => {

    var getSurface11 = () => {

        var degreeU = 3
            , degreeV = 3
            , knotsU = [0, 0, 0, 0, 1, 1, 1, 1]
            , knotsV =  [0, 0, 0, 0, 1, 1, 1, 1]
            , pts = [     [ [0, 0, 0],    [10, 0, 0],     [20, 0, 0],     [30, 0, 0]      ],
                                    [ [0, -10, 0],  [10, -10, 0],   [20, -10, 0],   [30, -10, 0]    ],
                                    [ [0, -20, 0],  [10, -20, 0],   [20, -20, 0],   [30, -20, 0]    ],
                                    [ [0, -30, 0],  [10, -30, 0],   [20, -30, 0],   [30, -30, 0]    ] ]
			, wts = [   [ 1, 1, 1, 1],
						[ 1, 1, 1, 1],
						[ 1, 1, 1, 1],
						[ 1, 1, 1, 1],
						[ 1, 1, 1, 1],
						[ 1, 1, 1, 1] ]
            , bezier = new verb.core.NurbsSurfaceData( degreeU, degreeV, knotsU, knotsV, verb.eval.Eval.homogenize2d(pts, wts) );

        return bezier;
    };

    var getSurface23 = () => {

        var degree = 3
            , knotsV = [0, 0, 0, 0, 0.333, 0.666, 1, 1, 1, 1]
            , knotsU = [0, 0, 0, 0, 0.5, 1, 1, 1, 1]
            , pts = [ [ [0, 0, 0],    [10, 0, 0],     [20, 0, 0],     [30, 0, 0],    [40, 0, 0],     [50, 0, 0] ],
                        [ [0, -10, 0],  [10, -10, 0],  [20, -10, 0],  [30, -10, 0],  [40, -10, 0],   [50, -10, 0]    ],
                        [ [0, -20, 0],  [10, -20, 0],  [20, -20, 0],  [30, -20, 0],  [40, -20, 0],  [50, -20, 0]    ],
                        [ [0, -30, 0],  [10, -30, 0],   [20, -30, 0], [30, -30, 0],  [40, -30, 0],   [50, -30, 0]     ],
                        [ [0, -40, 0],  [10, -40, 0],   [20, -40, 0],   [30, -40, 0],  [40, -40, 0], [50, -40, 0]     ] ]
			, wts = [   [ 1, 1, 1, 1, 1, 1],
						[ 1, 1, 1, 1, 1, 1],
						[ 1, 1, 1, 1, 1, 1],
						[ 1, 1, 1, 1, 1, 1],
						[ 1, 1, 1, 1, 1, 1] ]
            , surface23 = new verb.core.NurbsSurfaceData( degree, degree, knotsU, knotsV, verb.eval.Eval.homogenize2d(pts, wts) );

        return surface23;
    };

	var getSurface23Curved = () => {

		var degree = 3
			, knotsV = [0, 0, 0, 0, 0.333, 0.666, 1, 1, 1, 1]
			, knotsU = [0, 0, 0, 0, 0.5, 1, 1, 1, 1]
			, pts = [ [ [0, 0, 0],    [10, 0, 0],     [20, 0, 23],     [30, 0, 0],    [40, 0, 0],     [50, 0, 0] ],
						[ [0, -10, 0],  [10, -10, 0],  [20, -10, 0],  [30, -10, 0],  [40, -10, 0],   [50, -10, 0]    ],
						[ [0, -20, 0],  [10, -20, 0],  [20, -20, 0],  [30, -20, 0],  [40, -20, 0],  [50, -20, 0]    ],
						[ [0, -30, 0],  [10, -30, 0],   [20, -30, 0], [30, -30, -32],  [40, -30, 0],   [50, -30, 0]     ],
						[ [0, -40, 0],  [10, -40, 0],   [20, -40, 0],   [30, -40, 0],  [40, -40, 0], [50, -40, 0]     ] ]
			, wts = [   [ 1, 1, 1, 1, 1, 1],
						[ 1, 1, 1, 1, 1, 1],
						[ 1, 1, 1, 1, 1, 1],
						[ 1, 1, 1, 1, 1, 1],
						[ 1, 1, 1, 1, 1, 1] ]
			, surface23 = new verb.core.NurbsSurfaceData( degree, degree, knotsU, knotsV, verb.eval.Eval.homogenize2d(pts, wts) );

		return surface23;
	};

	var getSurface23Deg2Curved = () => {
		var degree = 2
			, knotsV = [0, 0, 0, 0.333, 0.666, 1, 1, 1]
			, knotsU = [0, 0, 0, 0.5, 1, 1, 1]
			, pts = [ [ [0, 0, 0],    [10, 0, 0],     [20, 0, 23],     [30, 0, 0],    [40, 0, 0] ],
						[ [0, -10, 0],  [10, -10, 0],  [20, -10, 0],  [30, -10, 0],  [40, -10, 0]   ],
						[ [0, -20, 0],  [10, -20, 0],  [20, -20, 0],  [30, -20, 0],  [40, -20, 0]    ],
						[ [0, -30, 0],  [10, -30, 0],   [20, -30, 0], [30, -30, -32],  [40, -30, 0]     ] ]
			, wts = [   [ 1, 1, 1, 1, 1],
						[ 1, 1, 1, 1, 1],
						[ 1, 1, 1, 1, 1],
						[ 1, 1, 1, 1, 1],
						[ 1, 1, 1, 1, 1] ]
			, surface23 = new verb.core.NurbsSurfaceData( degree, degree, knotsU, knotsV, verb.eval.Eval.homogenize2d(pts, wts) );

		return surface23;
	};

	it('can tessellate rational flat patch 1x1', () => {
		var res = verb.eval.Tess.rationalSurfaceAdaptiveSample( getSurface11(), 1 );

		should.equal( 8, res.faces.length );
	});

	it('can tessellate 2 x 3 rational flat patch', () => {
		var surface23 = getSurface23();
		var res = verb.eval.Tess.rationalSurfaceAdaptiveSample( surface23, 1 );

		should.equal( 320, res.faces.length );
	});

	it('can tessellate 2 x 3 rational non-flat patch', () => {
		var surface23 = getSurface23Curved();
		var res = verb.eval.Tess.rationalSurfaceAdaptiveSample( surface23, 1 );

		should.equal( 663, res.faces.length );
	});

	it('throws with degree2 patch', () => {
		var surface23 = getSurface23Deg2Curved();
		console.log( verb.eval.Check.isValidNurbsSurfaceData(surface23) );

		var res = verb.eval.Tess.rationalSurfaceAdaptiveSample( surface23, 1 );

		should.equal( 663, res.faces.length );
	});


});