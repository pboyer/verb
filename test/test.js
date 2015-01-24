var should = require('should')
	, verb = require('../build/verb.js');

// necessary for multi-threading
verb.exe.WorkerPool.basePath = process.cwd() + "/build/";

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


describe("verb.core.Eval.knotSpanGivenN",function(){

	it('returns correct result', function(){

		var n = 7
			, degree = 2
			, knots = [0, 0, 0, 1, 2, 3, 4, 4, 5, 5, 5];

		should.equal( 4, verb.core.Eval.knotSpanGivenN( n, degree, 2.5, knots ) );
		should.equal( 3, verb.core.Eval.knotSpanGivenN( n, degree, 1, knots ) );
		should.equal( 3, verb.core.Eval.knotSpanGivenN( n, degree, 1.5, knots ) );
		should.equal( 7, verb.core.Eval.knotSpanGivenN( n, degree, 4.9, knots ) );
		should.equal( 7, verb.core.Eval.knotSpanGivenN( n, degree, 10, knots ) );
		should.equal( 7, verb.core.Eval.knotSpanGivenN( n, degree, 5, knots ) );
		should.equal( 2, verb.core.Eval.knotSpanGivenN( n, degree, 0, knots ) );
		should.equal( 2, verb.core.Eval.knotSpanGivenN( n, degree, -1, knots ) );

	});

});

describe("verb.core.Eval.knotSpan",function(){

	it('returns correct result for degree 2 curve', function(){

		var degree = 2
			, knots = [0, 0, 0, 1, 2, 3, 4, 4, 5, 5, 5];

		should.equal( 4, verb.core.Eval.knotSpan( degree, 2.5, knots ) );
		should.equal( 3, verb.core.Eval.knotSpan( degree, 1, knots ) );
		should.equal( 3, verb.core.Eval.knotSpan( degree, 1.5, knots ) );
		should.equal( 7, verb.core.Eval.knotSpan( degree, 4.9, knots ) );
		should.equal( 7, verb.core.Eval.knotSpan( degree, 10, knots ) ); // above span
		should.equal( 7, verb.core.Eval.knotSpan( degree, 5, knots ) ); // top of span
		should.equal( 2, verb.core.Eval.knotSpan( degree, 0, knots ) ); // bottom span

	});

});

describe("verb.core.Eval.basisFunctions, basisFunctionsGivenKnotSpanIndex",function(){

	it('return correct results', function(){

		var degree = 2
			, span = 4
			, knots = [0, 0, 0, 1, 2, 3, 4, 4, 5, 5, 5];

		var N1 = verb.core.Eval.basisFunctionsGivenKnotSpanIndex( 4, 2.5, degree, knots );
		should.equal( 3, N1.length );
		should.equal( 0.125, N1[0] );
		should.equal( 0.75, N1[1] );
		should.equal( 0.125, N1[2] );

		var N2 = verb.core.Eval.basisFunctions( 2.5, degree, knots );
		should.equal( 3, N2.length );
		should.equal( 0.125, N2[0] );
		should.equal( 0.75, N2[1] );
		should.equal( 0.125, N2[2] );

	});

});

describe("verb.core.Eval.curvePoint",function(){

	it('returns correct result for simple curve', function(){

		var degree = 2
			, n = 6
			, knots = [0, 0, 0, 1, 2, 3, 4, 5, 5, 5]
			, controlPoints = [ [10, 0], [20, 10], [30, 20], [40, 30], [50, 40], [60, 30], [70, 80]]
			, crv = new verb.core.CurveData( degree, knots, controlPoints  );

		var p = verb.core.Eval.curvePointGivenN( n, crv, 2.5);

		should.equal( p[0], 40 );
		should.equal( p[1], 30 );

		var p_start = verb.core.Eval.curvePointGivenN( n, crv, 0);

		should.equal( p_start[0], 10 );
		should.equal( p_start[1], 0 );

		var p_end = verb.core.Eval.curvePointGivenN( n, crv, 5);

		should.equal( p_end[0], 70 );
		should.equal( p_end[1], 80 );

	});

});

describe("verb.core.Eval.curvePointGivenN",function(){

	it('returns correct result for simple curve', function(){

		var degree = 3
			, n = 4
			, u = 0
			, knots = [0, 0, 0, 0, 1, 1, 1, 1]
			, controlPoints = [ [10, 0], [20, 10], [30, 20], [50, 50] ]
			, crv = new verb.core.CurveData( degree, knots, controlPoints );

		var p = verb.core.Eval.curvePoint( crv, u);

		should.equal( p[0], 10 );
		should.equal( p[1], 0 );

		var p2 = verb.core.Eval.curvePoint( crv, 1.0);

		should.equal( p2[0], 50 );
		should.equal( p2[1], 50 );


	});
});

describe("verb.core.Eval.areValidRelations",function(){

	it('returns correct result for two cases', function(){

		should.equal( false, verb.core.Eval.areValidRelations( 0, 0, 0 ) );
		should.equal( true, verb.core.Eval.areValidRelations( 2, 2, 5 ) );

	});
});

describe("verb.core.Eval.derivativeBasisFunctionsGivenNI",function(){

	it('returns correct results', function(){

		// This needs to be tested better
		var degree = 2
			, n = 7
			, span = 4
			, knots = [0, 0, 0, 1, 2, 3, 4, 4, 5, 5, 5];

		var N1 = verb.core.Eval.derivativeBasisFunctionsGivenNI( span, 2.5, degree, n, knots );
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

describe("verb.core.Eval.curveDerivativesGivenN",function(){

	it('returns correct result for simple curve', function(){

		var degree = 3
			, n = 3
			, u = 0
			, knots = [0, 0, 0, 0, 1, 1, 1, 1]
			, controlPoints = [ [10, 0], [20, 10], [30, 20], [50, 50] ]
			, num_derivs = 2
			, crv = new verb.core.CurveData( degree, knots, controlPoints );

		var p = verb.core.Eval.curveDerivativesGivenN( n, crv, u, num_derivs ) ;

		should.equal( p[0][0], 10 );
		should.equal( p[0][1], 0 );
		should.equal( p[1][0] / p[1][1], 1 );

	});

});

describe("verb.core.Eval.curveDerivatives",function(){

	it('returns correct result for simple curve', function(){

		// This needs to be tested better
		var degree = 3
			, u = 0
			, knots = [0, 0, 0, 0, 1, 1, 1, 1]
			, controlPoints = [ [10, 0], [20, 10], [30, 20], [50, 50] ]
			, num_derivs = 2
			, crv = new verb.core.CurveData( degree, knots, controlPoints );

		var p = verb.core.Eval.curveDerivatives( crv, u, num_derivs ) ;

		should.equal( p[0][0], 10 );
		should.equal( p[0][1], 0 );
		should.equal( p[1][0] / p[1][1], 1 );

	
	});

});

describe("verb.core.Eval.surfacePointGivenNM",function(){

	it('returns correct result for simple surface', function(){

		// This needs to be tested better
		var degreeU = 3
			, degreeV = 3
			, knotsU = [0, 0, 0, 0, 1, 1, 1, 1]
			, knotsV =	[0, 0, 0, 0, 1, 1, 1, 1]
			, controlPoints = [ 	[ [0, 0, 50], 		[10, 0, 0], 		[20, 0, 0], 		[30, 0, 0] 		],
														[ [0, -10, 0], 	[10, -10, 10], 	[20, -10, 10], 	[30, -10, 0] 	],
														[ [0, -20, 0], 	[10, -20, 10], 	[20, -20, 10], 	[30, -20, 0] 	],
														[ [0, -30, 0], 	[10, -30, 0], 	[20, -30, 0], 	[30, -30, 0] 	] ]
			, surface = new verb.core.SurfaceData( degreeU, degreeV, knotsU, knotsV, controlPoints )
			, n = 3
			, m = 3;

		var p = verb.core.Eval.surfacePointGivenNM( n, m, surface, 0, 0 );
		
		should.equal( p[0], 0 );
		should.equal( p[1], 0 );
		should.equal( p[2], 50 );

		p = verb.core.Eval.surfacePointGivenNM( n, m, surface, 1, 1 );

		should.equal( p[0], 30 );
		should.equal( p[1], -30 );
		should.equal( p[2], 0 );

	});

});

describe("verb.core.Eval.surfacePoint",function(){

	it('returns correct result for simple surface', function(){

		// This needs to be tested better
		var degreeU = 3
			, degreeV = 3
			, knotsU = [0, 0, 0, 0, 1, 1, 1, 1]
			, knotsV =	[0, 0, 0, 0, 1, 1, 1, 1]
			, controlPoints = [ 	[ [0, 0, 50], 		[10, 0, 0], 		[20, 0, 0], 		[30, 0, 0] 		],
									[ [0, -10, 0], 	[10, -10, 10], 	[20, -10, 10], 	[30, -10, 0] 	],
									[ [0, -20, 0], 	[10, -20, 10], 	[20, -20, 10], 	[30, -20, 0] 	],
									[ [0, -30, 0], 	[10, -30, 0], 	[20, -30, 0], 	[30, -30, 0] 	] ]
			, surface = new verb.core.SurfaceData( degreeU, degreeV, knotsU, knotsV, controlPoints );

		var p = verb.core.Eval.surfacePoint( surface, 0, 0 );

		should.equal( p[0], 0 );
		should.equal( p[1], 0 );
		should.equal( p[2], 50 );

		p = verb.core.Eval.surfacePoint( surface, 1, 1 );

		should.equal( p[0], 30 );
		should.equal( p[1], -30 );
		should.equal( p[2], 0 );

	});

	it('returns correct result for another simple surface', function(){

		var degreeU = 1
			, degreeV = 3
			, knotsU = [0, 0, 1, 1 ]
			, knotsV =	[0, 0, 0, 0, 1, 1, 1, 1]
			, controlPoints = [ 	[ [0, 0, 50], 		[10, 0, 0], 		[20, 0, 0], 		[30, 0, 0] 		],
									[ [0, -10, 0], 	[10, -10, 10], 	[20, -10, 10], 	[30, -10, 0] 	] ]
			, surface = new verb.core.SurfaceData( degreeU, degreeV, knotsU, knotsV, controlPoints );

		var p = verb.core.Eval.surfacePoint( surface, 0, 0 );

		should.equal( p[0], 0 );
		should.equal( p[1], 0 );
		should.equal( p[2], 50 );

	});

});

describe("verb.core.Eval.surfaceDerivativesGivenNM",function(){

	it('returns correct derivatives for simple surface', function(){

		var degreeU = 3
			, degreeV = 3
			, u = 0.0
			, v = 0.0
			, knotsU = [0, 0, 0, 0, 1, 1, 1, 1]
			, knotsV =	[0, 0, 0, 0, 1, 1, 1, 1]
			, controlPoints = [ 	[ [0, 0, 0], 		[10, 10, 0], 		[20, 10, 0], 		[30, 0, 0] 		],
														[ [0, -10, 0], 	[10, -10, 10], 	[20, -10, 10], 	[30, -10, 0] 	],
														[ [0, -20, 0], 	[10, -20, 10], 	[20, -20, 10], 	[30, -20, 0] 	],
														[ [0, -30, 0], 	[10, -30, 0], 	[20, -30, 0], 	[30, -30, 0] 	] ]
			, n = 3
			, m = 3
			, num_derivatives = 1
			, surface = new verb.core.SurfaceData( degreeU, degreeV, knotsU, knotsV, controlPoints );

		var p = verb.core.Eval.surfaceDerivativesGivenNM( n, m, surface, 0, 0, num_derivatives );

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

describe("verb.core.Eval.surfaceDerivatives",function(){

	it('returns correct derivatives for simple surface', function(){

		var degreeU = 3
			, degreeV = 3
			, u = 0.0
			, v = 0.0
			, knotsU = [0, 0, 0, 0, 1, 1, 1, 1]
			, knotsV =	[0, 0, 0, 0, 1, 1, 1, 1]
			, controlPoints = [ 	[ [0, 0, 0], 		[10, 10, 0], 		[20, 10, 0], 		[30, 0, 0] 		],
														[ [0, -10, 0], 	[10, -10, 10], 	[20, -10, 10], 	[30, -10, 0] 	],
														[ [0, -20, 0], 	[10, -20, 10], 	[20, -20, 10], 	[30, -20, 0] 	],
														[ [0, -30, 0], 	[10, -30, 0], 	[20, -30, 0], 	[30, -30, 0] 	] ]
			, n = 3
			, m = 3
			, num_derivatives = 1
			, surface = new verb.core.SurfaceData( degreeU, degreeV, knotsU, knotsV, controlPoints );

		var p = verb.core.Eval.surfaceDerivatives( surface, 0, 0, num_derivatives );

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

describe("verb.core.Eval.homogenize1d",function(){

	it('returns correct results', function(){

		var weights = [1, 2, 3, 4]
			, controlPoints = [ [10, 0], [20, 10], [30, 20], [50, 50] ]
			, homo_controlPoints = verb.core.Eval.homogenize1d( controlPoints, weights);

		for (var i = 0; i < controlPoints.length; i++)
		{
			should.equal( homo_controlPoints[i][0], weights[i] * controlPoints[i][0] );
			should.equal( homo_controlPoints[i][1], weights[i] * controlPoints[i][1] );
			should.equal( homo_controlPoints[i][2], weights[i] );
		}

		weights = [1, 2, 3, 4];
		controlPoints = [ [10, 0, 4], [20, 10, 3], [30, 20, 0], [50, 50, 10] ];
		homo_controlPoints = verb.core.Eval.homogenize1d( controlPoints, weights);

		for (var i = 0; i < controlPoints.length; i++)
		{
			should.equal( homo_controlPoints[i][0], weights[i] * controlPoints[i][0] );
			should.equal( homo_controlPoints[i][1], weights[i] * controlPoints[i][1] );
			should.equal( homo_controlPoints[i][2], weights[i] * controlPoints[i][2] );
			should.equal( homo_controlPoints[i][3], weights[i] );
		}

	});

});

describe("verb.core.Eval.homogenize2d",function(){

	it('homogenize2d', function(){

		var weights = [ 	[ 1, 	-2, 3, 	5 	],
											[ 2, 	1, 	5, 	2 	],
											[ -3, 4, 	7, 	2 	],
											[ 1, 	6, 	-2, 12 	] ]
			, controlPoints = [ 	[ [0, 0, 0], 		[10, 10, 0], 		[20, 10, 0], 		[30, 0, 0] 		],
														[ [0, -10, 0], 	[10, -10, 10], 	[20, -10, 10], 	[30, -10, 0] 	],
														[ [0, -20, 0], 	[10, -20, 10], 	[20, -20, 10], 	[30, -20, 0] 	],
														[ [0, -30, 0], 	[10, -30, 0], 	[20, -30, 0], 	[30, -30, 0] 	] ]
			, homo_controlPoints = verb.core.Eval.homogenize2d( controlPoints, weights)
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

describe("verb.core.Eval.dehomogenize",function(){

	it('returns correct result', function(){

		var weights = [ 	[ 1, 	-2, 3, 	5 	],
											[ 2, 	1, 	5, 	2 	],
											[ -3, 4, 	7, 	2 	],
											[ 1, 	6, 	-2, 12 	] ]
			, controlPoints = [ 	[ [0, 0, 0], 		[10, 10, 0], 		[20, 10, 0], 		[30, 0, 0] 		],
														[ [0, -10, 0], 	[10, -10, 10], 	[20, -10, 10], 	[30, -10, 0] 	],
														[ [0, -20, 0], 	[10, -20, 10], 	[20, -20, 10], 	[30, -20, 0] 	],
														[ [0, -30, 0], 	[10, -30, 0], 	[20, -30, 0], 	[30, -30, 0] 	] ]
			, homo_controlPoints = verb.core.Eval.homogenize2d( controlPoints, weights)
			, j = 0
			, dehomo_pt = [];

		for (var i = 0; i < controlPoints.length; i++)
		{
			for (j = 0; j < controlPoints[i].length; j++)
			{
				dehomo_pt = verb.core.Eval.dehomogenize( homo_controlPoints[i][j] );
				should.equal( dehomo_pt.length, controlPoints[i][j].length );
				should.equal( dehomo_pt[0], controlPoints[i][j][0] );
				should.equal( dehomo_pt[1], controlPoints[i][j][1] );
				should.equal( dehomo_pt[2], controlPoints[i][j][2] );
			}
		}

	});

});

describe("verb.core.Eval.rationalCurvePoint",function(){

	it('returns correct result for quarter circle', function(){

		// this represents a single quarter arc, using a rational bezier curve
		var degree = 2
			, knots = [0, 0, 0, 1, 1, 1 ]
			, controlPoints = [ [1, 0, 1], [1,1,1], [0,2,2] ]
			, crv = new verb.core.CurveData( degree, knots, controlPoints );

		var p = verb.core.Eval.rationalCurvePoint( crv, 0);

		should.equal( p[0], 1 );
		should.equal( p[1], 0 );

		p = verb.core.Eval.rationalCurvePoint( crv, 0.5);

		should.equal( p[0], 0.6 );
		should.equal( p[1], 0.8 );

		p = verb.core.Eval.rationalCurvePoint( crv, 1);

		should.equal( p[0], 0 );
		should.equal( p[1], 1 );

	});

});

describe("verb.core.Eval.rationalSurfacePoint",function(){

	it('returns correct result for cylinder patch', function(){

		// quarter cylinder patch
		var degreeU = 1
			, degreeV = 2
			, knotsU = [0, 0, 1, 1 ]
			, knotsV = [0, 0, 0, 1, 1, 1 ]
			, controlPoints = [ [ [1, 1, 0, 1], 	[1, 1, 1, 1], [2, 0, 2, 2] ],
													 		  [ [-1, 1, 0, 1], 	[-1, 1, 1, 1], [-2, 0, 2, 2] ] ]
			, surface = new verb.core.SurfaceData( degreeU, degreeV, knotsU, knotsV, controlPoints );

		var p = verb.core.Eval.rationalSurfacePoint( surface, 0, 0 );

		should.equal( p[0], 1 );
		should.equal( p[1], 1 );
		should.equal( p[2], 0 );

		p = verb.core.Eval.rationalSurfacePoint( surface, 0.5, 0.5 );

		should.equal( p[0], 0 );
		should.equal( p[1], 0.6 );
		should.equal( p[2], 0.8 );

		p = verb.core.Eval.rationalSurfacePoint( surface, 1, 1 );

		should.equal( p[0], -1 );
		should.equal( p[1], 0 );
		should.equal( p[2], 1 );

	});
});

describe("verb.core.Eval.rationalCurveDerivatives",function(){

	it('returns expected results', function(){

		// this represents a single quarter arc, using a rational bezier curve
		var degree = 2
			, knots = [0, 0, 0, 1, 1, 1 ]
			, controlPoints = [ [1,0,1], [1,1,1], [0,2,2] ]
			, crv = new verb.core.CurveData( degree, knots, controlPoints );

		var p = verb.core.Eval.rationalCurveDerivatives( crv, 0, 2);

		should.equal( p[0][0], 1 );
		should.equal( p[0][1], 0 );

		should.equal( p[1][0], 0 );
		should.equal( p[1][1], 2 );

		should.equal( p[2][0], -4 );
		should.equal( p[2][1], 0 );

		p = verb.core.Eval.rationalCurveDerivatives( crv, 1, 2);

		should.equal( p[0][0], 0 );
		should.equal( p[0][1], 1 );

		should.equal( p[1][0], -1 );
		should.equal( p[1][1], 0 );

		should.equal( p[2][0], 1 );
		should.equal( p[2][1], -1 );

	});

});

describe("verb.core.Eval.rationalSurfaceDerivatives",function(){

	it('returns expected results', function(){

		// quarter cylinder patch, axis aligned with x axis, radius: 1
		var degreeU = 1
			, degreeV = 2
			, knotsU = [0, 0, 1, 1 ]
			, knotsV = [0, 0, 0, 1, 1, 1 ]
			, controlPoints = [ [ [1, 1, 0, 1], 	[1, 1, 1, 1], [2, 0, 2, 2] ],
													 		  [ [-1, 1, 0, 1], 	[-1, 1, 1, 1], [-2, 0, 2, 2] ] ]
			, num_derivatives = 1
			, surface = new verb.core.SurfaceData( degreeU, degreeV, knotsU, knotsV, controlPoints );

		var p = verb.core.Eval.rationalSurfaceDerivatives( surface, 0, 0, num_derivatives );

		should.equal( p[0][0][0], 1 );
		should.equal( p[0][0][1], 1 );
		should.equal( p[0][0][2], 0 );

		should.equal( p[0][1][0], 0 );
		should.equal( p[0][1][1], 0 );
		should.equal( p[0][1][2], 2 );

		should.equal( p[1][0][0], -2 );
		should.equal( p[1][0][1], 0 );
		should.equal( p[1][0][2], 0 );

		p = verb.core.Eval.rationalSurfaceDerivatives( surface, 1, 1, num_derivatives);

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
});

describe("verb.core.Eval.rationalCurvePoint",function(){

	it('returns correct results for a line', function(){

		var degree = 1
			, knots = [0, 0, 1, 1]
			, controlPoints = [ [0, 0, 0, 1], [10, 0, 0, 1] ]
			, weights = [1, 1]
			, u1 = 0.0
			, u2 = 0.5
			, u3 = 1.0
			, crv = new verb.core.CurveData( degree, knots, controlPoints );

		var p1 = verb.core.Eval.rationalCurvePoint( crv, u1);
		var p2 = verb.core.Eval.rationalCurvePoint( crv, u2);
		var p3 = verb.core.Eval.rationalCurvePoint( crv, u3);

		should.equal(p1[0], 0);
		should.equal(p2[0], 5);
		should.equal(p3[0], 10);

	});

});

describe("verb.core.Modify.curveKnotInsert",function(){

	it('returns expected results when inserting 1 knot in the middle of a non-rational, cubic b-spline', function(){

		var degree = 3
			, u = 2.5
			, knots = [ 0, 0, 0, 0, 1, 2, 3, 4, 5, 5, 5, 5 ]
			, r = 1;

		var controlPoints = [];
		for (var i = 0; i < 8; i++) controlPoints.push([i, 0, 0]);

		var crv = new verb.core.CurveData( degree, knots, controlPoints );

		var after = verb.core.Modify.curveKnotInsert( crv, u, r );

		after.controlPoints.forEach(function(cp){ should.exist(cp); });
		after.knots.forEach(function(cp){ should.exist(cp); });

		should.equal(knots.length + r, after.knots.length);
		should.equal(controlPoints.length + r, after.controlPoints.length);

		after.controlPoints[3][0].should.be.approximately( 2.8333333333, verb.core.Constants.TOLERANCE );
		after.controlPoints[4][0].should.be.approximately( 3.5, verb.core.Constants.TOLERANCE );
		after.controlPoints[5][0].should.be.approximately( 4.1666666666, verb.core.Constants.TOLERANCE );

		var p0 = verb.core.Eval.curvePoint( crv, 2.5);
		var p1 = verb.core.Eval.curvePoint( after, 2.5);

		p0[0].should.be.approximately(p1[0], verb.core.Constants.TOLERANCE);
		p0[1].should.be.approximately(p1[1], verb.core.Constants.TOLERANCE);
		p0[2].should.be.approximately(p1[2], verb.core.Constants.TOLERANCE);

	});

	it('returns expected results when inserting 3 knots at the middle of a non-rational, cubic b-spline', function(){

		var degree = 3
			, u = 2.5
			, knots = [ 0, 0, 0, 0, 1, 2, 3, 4, 5, 5, 5, 5 ]
			, r = 3;

		var controlPoints = [];
		for (var i = 0; i < 8; i++) controlPoints.push([i, 0, 0]);
		
		var crv = new verb.core.CurveData( degree, knots, controlPoints );

		var after = verb.core.Modify.curveKnotInsert( crv, u, r );

		after.controlPoints.forEach(function(cp){ should.exist(cp); });
		after.knots.forEach(function(cp){ should.exist(cp); });

		should.equal(knots.length + r, after.knots.length);
		should.equal(controlPoints.length + r, after.controlPoints.length);

		var p0 = verb.core.Eval.curvePoint( crv, 2.5);
		var p1 = verb.core.Eval.curvePoint( after, 2.5);

		p0[0].should.be.approximately(p1[0], verb.core.Constants.TOLERANCE);
		p0[1].should.be.approximately(p1[1], verb.core.Constants.TOLERANCE);
		p0[2].should.be.approximately(p1[2], verb.core.Constants.TOLERANCE);

	});

	it('returns expected results when inserting 1 knots at the beginning of a non-rational, cubic b-spline', function(){

		var degree = 3
			, u = 0.5
			, knots = [ 0, 0, 0, 0, 1, 2, 3, 4, 5, 5, 5, 5 ]
			, r = 1;

		var controlPoints = [];
		for (var i = 0; i < 8; i++) controlPoints.push([i, 0, 0]);

		var crv = new verb.core.CurveData( degree, knots, controlPoints );
		var after = verb.core.Modify.curveKnotInsert( crv, u, r );

		after.controlPoints.forEach(function(cp){ should.exist(cp); });
		after.knots.forEach(function(cp){ should.exist(cp); });

		should.equal(knots.length + r, after.knots.length);
		should.equal(controlPoints.length + r, after.controlPoints.length);

		var p0 = verb.core.Eval.curvePoint( crv, 2.5);
		var p1 = verb.core.Eval.curvePoint( after, 2.5);

		p0[0].should.be.approximately(p1[0], verb.core.Constants.TOLERANCE);
		p0[1].should.be.approximately(p1[1], verb.core.Constants.TOLERANCE);
		p0[2].should.be.approximately(p1[2], verb.core.Constants.TOLERANCE);

	});

	it('returns expected results when inserting 1 knot at the middle of a non-rational, linear b-spline', function(){

		var degree = 1
			, u = 0.5
			, knots = [ 0, 0, 1, 2, 3, 4, 5, 5 ]
			, r = 1;

		var controlPoints = [];
		for (var i = 0; i < 6; i++) controlPoints.push([i, 0, 0]);

		var crv = new verb.core.CurveData( degree, knots, controlPoints );
		var after = verb.core.Modify.curveKnotInsert( crv, u, r );

		after.controlPoints.forEach(function(cp){ should.exist(cp); });
		after.knots.forEach(function(cp){ should.exist(cp); });

		should.equal(knots.length + r, after.knots.length);
		should.equal(controlPoints.length + r, after.controlPoints.length);

		var p0 = verb.core.Eval.curvePoint( crv, 2.5);
		var p1 = verb.core.Eval.curvePoint( after, 2.5);

		p0[0].should.be.approximately(p1[0], verb.core.Constants.TOLERANCE);
		p0[1].should.be.approximately(p1[1], verb.core.Constants.TOLERANCE);
		p0[2].should.be.approximately(p1[2], verb.core.Constants.TOLERANCE);

	});
});

describe("verb.core.Eval.curveKnotRefine",function(){

	function cubicInsert(u, r){

		var degree = 3
			, knots = [ 0, 0, 0, 0, 1, 2, 3, 4, 5, 5, 5, 5 ]
			, new_knots = [];

		for (var i = 0; i < r; i++){
			new_knots.push(u);
		}

		var controlPoints = [];
		for (var i = 0; i < 8; i++) controlPoints.push([i, 0, 0]);

		var crv = new verb.core.CurveData( degree, knots, controlPoints );
		var after = verb.core.Modify.curveKnotRefine( crv, new_knots );

		after.controlPoints.forEach(function(cp){ should.exist(cp); });
		after.knots.forEach(function(cp){ should.exist(cp); });

		should.equal(knots.length + r, after.knots.length);
		should.equal(controlPoints.length + r, after.controlPoints.length);

		var p0 = verb.core.Eval.curvePoint( crv, 2.5);
		var p1 = verb.core.Eval.curvePoint( after, 2.5);

		p0[0].should.be.approximately(p1[0], verb.core.Constants.TOLERANCE);
		p0[1].should.be.approximately(p1[1], verb.core.Constants.TOLERANCE);
		p0[2].should.be.approximately(p1[2], verb.core.Constants.TOLERANCE);

	}

	it('returns expected results when inserting multiple knots in the middle of a non-rational, cubic b-spline', function(){

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

describe("verb.core.Modify.curveSplit",function(){

	function cubicSplit(u){

		var degree = 3
			, knots = [ 0, 0, 0, 0, 1, 2, 3, 4, 5, 5, 5, 5 ];

		var controlPoints = [];
		for (var i = 0; i < 8; i++) controlPoints.push([i, 0, 0, 1]);

		var crv = new verb.core.CurveData( degree, knots, controlPoints );
		var after = verb.core.Modify.curveSplit( crv, u );

		for (var i = 0; i < degree + 1; i++ ){
			var d = after[0].knots.length - (degree+1);
			after[0].knots[d+i].should.be.approximately(u, verb.core.Constants.TOLERANCE);
		}

		for (var i = 0; i < degree + 1; i++){
			var d = 0;
			after[1].knots[d+i].should.be.approximately(u, verb.core.Constants.TOLERANCE);
		}

		// a point evaluated on each curve is the same
		var p0 = verb.core.Eval.curvePoint( after[0], after[0].knots[ after[0].knots.length-1] );
		var p1 = verb.core.Eval.curvePoint( after[1], after[1].knots[ 0] );

		p0[0].should.be.approximately(p1[0], verb.core.Constants.TOLERANCE);
		p0[1].should.be.approximately(p1[1], verb.core.Constants.TOLERANCE);
		p0[2].should.be.approximately(p1[2], verb.core.Constants.TOLERANCE);

	}

	it('returns expected results when splitting a non-rational, cubic b-spline', function(){

		cubicSplit( 0.5 );
		cubicSplit( 3.5 );

	});

});

describe("verb.core.Modify.knotMultiplicities",function(){

	it('is correct for a basic example', function(){

		var res = verb.core.Modify.knotMultiplicities( [ 0, 0, 0, 0, 1, 1, 2, 2, 2, 3, 3.3] );

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

describe("verb.core.Modify.decomposeCurveIntoBeziers",function(){

	it('is correct for a basic example', function(){

		var degree = 3
			, knots = [ 0, 0, 0, 0, 1, 2, 3, 4, 5, 5, 5, 5 ];

		var controlPoints = [];
		for (var i = 0; i < 8; i++) {
			controlPoints.push([i, 0, 0]);
		}

		var crv = new verb.core.CurveData( degree, knots, controlPoints );
		var res = verb.core.Modify.decomposeCurveIntoBeziers( crv );

		res.length.should.be.equal( 5 );

		res.forEach(function(x){

			var u0 = x.knots[0];

			var pt0 = verb.core.Eval.curvePoint( x, u0);
			var pt1 = verb.core.Eval.curvePoint( crv, u0);

			( verb.core.Vec.norm(verb.core.Vec.sub(pt0, pt1))).should.be.approximately(0, verb.core.Constants.TOLERANCE );

		});

	});
});

describe("verb.core.Mat.transpose",function(){
	it('is correct for a basic example', function(){
		var a = [ [6,5,4], [1,2,3] ];
		verb.core.Mat.transpose(a).should.eql( [[6,1], [5,2], [4,3]])
	});


	it('is correct for empty array', function(){
		verb.core.Mat.transpose([]).should.eql( [] );
	});
});

describe("verb.core.Modify.surfaceKnotRefine",function(){

	var degree = 3
		, knotsV = [0, 0, 0, 0, 0.333, 0.666, 1, 1, 1, 1]
		, knotsU = [0, 0, 0, 0, 0.5, 1, 1, 1, 1]
		, controlPoints = [
					[ [0, 0, -10], 	[10, 0, 0], 	[20, 0, 0], 	[30, 0, 0] , 	[40, 0, 0], 	[50, 0, 0] ],
					[ [0, -10, 0], 	[10, -10, 10], 	[20, -10, 10], 	[30, -10, 0] , 	[40, -10, 0], 	[50, -10, 0]	],
					[ [0, -20, 0], 	[10, -20, 10], 	[20, -20, 10], 	[30, -20, 0] , 	[40, -20, -2],	[50, -20, 0] 	],
					[ [0, -30, 0], 	[10, -30, 0], 	[20, -30, -23], [30, -30, 0] , 	[40, -30, 0], 	[50, -30, 0]     ],
					[ [0, -40, 0], 	[10, -40, 0], 	[20, -40, 0], 	[30, -40, 4] , 	[40, -40, -20],	[50, -40, 0]     ] ]
		, surface = new verb.core.SurfaceData( degree, degree, knotsU, knotsV, controlPoints );

	it('can add knots into a surface in the u direction', function(){

		var r = 1;
		var u = 0.2;
		var new_knots = [];

		for (var i = 0; i < r; i++){
			new_knots.push(u);
		}

		var res = verb.core.Modify.surfaceKnotRefine( surface, new_knots, false );

		res.controlPoints.forEach(function(cp){ should.exist(cp); });
		res.knotsU.forEach(function(cp){ should.exist(cp); });
		res.knotsV.forEach(function(cp){ should.exist(cp); });

		should.equal(knotsU.length + r, res.knotsU.length);
		should.equal(controlPoints.length + r, res.controlPoints.length);

		var p0 = verb.core.Eval.surfacePoint( surface, 0.5, 0.25 );
		var p1 = verb.core.Eval.surfacePoint( res, 0.5, 0.25);

		p0[0].should.be.approximately(p1[0], verb.core.Constants.TOLERANCE);
		p0[1].should.be.approximately(p1[1], verb.core.Constants.TOLERANCE);
		p0[2].should.be.approximately(p1[2], verb.core.Constants.TOLERANCE);

	});

	it('can add knots into a surface in the v direction', function(){

		var r = 1;
		var u = 0.2;
		var new_knots = [];

		for (var i = 0; i < r; i++){
			new_knots.push(u);
		}

		var res = verb.core.Modify.surfaceKnotRefine( surface, new_knots, true );

		res.controlPoints.forEach(function(cp){ should.exist(cp); });
		res.knotsU.forEach(function(cp){ should.exist(cp); });
		res.knotsV.forEach(function(cp){ should.exist(cp); });

		should.equal(knotsV.length + r, res.knotsV.length);
		should.equal(controlPoints[0].length + r, res.controlPoints[0].length);

		var p0 = verb.core.Eval.surfacePoint( surface, 0.5, 0.25 );
		var p1 = verb.core.Eval.surfacePoint( res, 0.5, 0.25);

		p0[0].should.be.approximately(p1[0], verb.core.Constants.TOLERANCE);
		p0[1].should.be.approximately(p1[1], verb.core.Constants.TOLERANCE);
		p0[2].should.be.approximately(p1[2], verb.core.Constants.TOLERANCE);


	});
});

describe("verb.core.Modify.surfaceSplit", function(){

	var degree = 3
		, knotsV = [0, 0, 0, 0, 0.333, 0.666, 1, 1, 1, 1]
		, knotsU = [0, 0, 0, 0, 0.5, 1, 1, 1, 1]
		, controlPoints = [
					[ [0, 0, -10], 	[10, 0, 0], 		[20, 0, 0], 		[30, 0, 0] , 		[40, 0, 0], 		[50, 0, 0] ],
					[ [0, -10, 0], 	[10, -10, 10], 	[20, -10, 10], 	[30, -10, 0] , 	[40, -10, 0], 	[50, -10, 0]	],
					[ [0, -20, 0], 	[10, -20, 10], 	[20, -20, 10], 	[30, -20, 0] , 	[40, -20, -2],	[50, -20, 0] 	],
					[ [0, -30, 0], 	[10, -30, 0], 	[20, -30, -23], [30, -30, 0] , 	[40, -30, 0], 	[50, -30, 0]     ],
					[ [0, -40, 0], 	[10, -40, 0], 	[20, -40, 0], 	[30, -40, 4] , 	[40, -40, -20],	[50, -40, 0]     ] ]
		, surface = new verb.core.SurfaceData( degree, degree, knotsU, knotsV, controlPoints );

	it('can split a surface in the u direction', function(){

		var u = 0.2;

		var res = verb.core.Modify.surfaceSplit( surface, u, false );

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

		var p0 = verb.core.Eval.surfacePoint( surface, 0.1, 0.1 );
		var p1 = verb.core.Eval.surfacePoint( res[0], 0.1, 0.1);

		p0[0].should.be.approximately(p1[0], verb.core.Constants.TOLERANCE);
		p0[1].should.be.approximately(p1[1], verb.core.Constants.TOLERANCE);
		p0[2].should.be.approximately(p1[2], verb.core.Constants.TOLERANCE);

		p0 = verb.core.Eval.surfacePoint( surface, 0.8, 0.8 );
		p1 = verb.core.Eval.surfacePoint( res[1], 0.8, 0.8);

		p0[0].should.be.approximately(p1[0], verb.core.Constants.TOLERANCE);
		p0[1].should.be.approximately(p1[1], verb.core.Constants.TOLERANCE);
		p0[2].should.be.approximately(p1[2], verb.core.Constants.TOLERANCE);


	});

	it('can split a surface in the v direction', function(){

		var u = 0.2;

		var res = verb.core.Modify.surfaceSplit( surface, u, true );

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

		var p0 = verb.core.Eval.surfacePoint( surface, 0.1, 0.1 );
		var p1 = verb.core.Eval.surfacePoint( res[0], 0.1, 0.1);

		p0[0].should.be.approximately(p1[0], verb.core.Constants.TOLERANCE);
		p0[1].should.be.approximately(p1[1], verb.core.Constants.TOLERANCE);
		p0[2].should.be.approximately(p1[2], verb.core.Constants.TOLERANCE);

		p0 = verb.core.Eval.surfacePoint( surface, 0.8, 0.8 );
		p1 = verb.core.Eval.surfacePoint( res[1], 0.8, 0.8);

		p0[0].should.be.approximately(p1[0], verb.core.Constants.TOLERANCE);
		p0[1].should.be.approximately(p1[1], verb.core.Constants.TOLERANCE);
		p0[2].should.be.approximately(p1[2], verb.core.Constants.TOLERANCE);


	});

});

describe("verb.BoundingBox.init",function(){

	it('should allow array of point arguments', function(){

		var bb1 = new verb.BoundingBox([[5,5,5], [10,10,10]]);

		should.equal( bb1.min[0], 5 );
		should.equal( bb1.min[1], 5 );
		should.equal( bb1.min[2], 5 );

		should.equal( bb1.max[0], 10 );
		should.equal( bb1.max[1], 10 );
		should.equal( bb1.max[2], 10 );

	});

});

describe("verb.BoundingBox.intersects",function(){

	it('returns expected results', function(){

		var bb1 = new verb.BoundingBox([ [5,5,5], [10,10,10] ])
			, bb2 = new verb.BoundingBox([ [0,0,0], [10,10,10] ])
			, bb3 = new verb.BoundingBox([ [-2,-2,-2], [-1,-1,-1] ]);

		should.equal( bb1.intersects(bb2), true );
		should.equal( bb1.intersects(bb3), false );
		should.equal( bb2.intersects(bb3), false );

	});

});

describe("verb.BoundingBox.intersect",function(){

	it('returns expected results', function(){

		// initialize a bounding box
		var bb1 = new verb.BoundingBox([ [5,5,5], [10,10,10] ])
			, bb2 = new verb.BoundingBox([ [0,0,0], [10,10,10] ])
			, bb3 = new verb.BoundingBox([ [-2,-2,-2], [-1,-1,-1] ]);

		// intersect bounding boxes
		var int_bb1_bb2 = bb1.intersect(bb2)
			, int_bb1_bb3 = bb1.intersect(bb3);

		should.equal( int_bb1_bb2.min[0], 5 );
		should.equal( int_bb1_bb2.min[1], 5 );
		should.equal( int_bb1_bb2.min[2], 5 );

		should.equal( int_bb1_bb2.max[0], 10 );
		should.equal( int_bb1_bb2.max[1], 10 );
		should.equal( int_bb1_bb2.max[2], 10 );

		should.equal( int_bb1_bb3, null ); //non-intersect is null


	});

});

describe("verb.BoundingBox.intervalsOverlap",function(){

	it('returns expected results', function(){

		should.equal( verb.BoundingBox.intervalsOverlap( 0, 1, 0, 10 ), true );
		should.equal( verb.BoundingBox.intervalsOverlap( 0, 1, 1, 10 ), true );
		should.equal( verb.BoundingBox.intervalsOverlap( 0, 1, 1+1e-3, 10 ), false );
		should.equal( verb.BoundingBox.intervalsOverlap( 0, 1, 2, 10 ), false );

	});

});

describe("verb.BoundingBox.contains",function(){

	it('returns expected results', function(){

		var bb4 = new verb.BoundingBox([ [0,0,0], [1,1,1] ])
			, bb5 = new verb.BoundingBox();

		should.equal( bb4.contains( [0,0,0] ), true );
		should.equal( bb4.contains( [1,1,1] ), true );
		should.equal( bb4.contains( [1,1,1+1e-3] ), false );
		should.equal( bb4.contains( [1,1,1-1e-3] ), true );
		should.equal( bb5.contains( [0,0,0] ), false );

	});

});

describe("verb.BoundingBox.contains",function(){

	it('BoundingBox.clear', function(){

		var bb1 = new verb.BoundingBox([ [5,5,5], [10,10,10] ]);
		bb1.clear();
		should.equal( bb1.initialized, false );

	});
});

describe("verb.BoundingBox.getAxisLength",function(){

	it('should return correct value', function(){

		var bb1 = new verb.BoundingBox([ [-1,2,3], [10,10,10] ]);
		should.equal( bb1.getAxisLength(0), 11 );
		should.equal( bb1.getAxisLength(1), 8 );
		should.equal( bb1.getAxisLength(2), 7 );

	});

});

describe("verb.BoundingBox.getLongestAxis",function(){

	it('should return correct value', function(){

		var bb1 = new verb.BoundingBox([ [-1,2,3], [10,10,10] ]);
		should.equal( bb1.getLongestAxis(0), 0 );

	});

});

describe("verb.BoundingBox.getAxisLength",function(){

	it('should return 0 when given out of bounds index', function(){

		var bb1 = new verb.BoundingBox([ [-1,2,3], [10,10,10] ]);
		should.equal( bb1.getAxisLength(8), 0 );
		should.equal( bb1.getAxisLength(-1), 0 );
		should.equal( bb1.getAxisLength(4), 0 );
		should.equal( bb1.getAxisLength(3), 0 );

	});

});

describe("verb.BoundingBox.getAxisLength",function(){

	it('should return 0 when given out of bounds index', function(){

		var bb1 = new verb.BoundingBox([ [-1,2,3], [10,10,10] ]);
		should.equal( bb1.getAxisLength(8), 0 );
		should.equal( bb1.getAxisLength(-1), 0 );
		should.equal( bb1.getAxisLength(4), 0 );
		should.equal( bb1.getAxisLength(3), 0 );

	});

});

describe("verb.BoundingBox.clear",function(){

	it('should set initialized to false', function(){

		var bb1 = new verb.BoundingBox([ [5,5,5], [10,10,10] ]);
		bb1.clear();
		should.equal( bb1.initialized, false );

	});

});

describe("verb.core.Eval.rationalCurveRegularSample",function(){
	it('should return 10 samples when asked to', function(){

		var degree = 2
			, knots = [0, 0, 0, 1, 1, 1 ]
			, controlPoints = [ [1, 0, 0, 1], [1, 1, 0, 1], [0, 2, 0, 2] ]
			, numSamples = 10
			, curve = new verb.core.CurveData( degree, knots, controlPoints );

		var p = verb.core.Tess.rationalCurveRegularSample( curve, numSamples);

		should.equal(p.length, 10);

		p.map( function(e){  e.length.should.be.equal(3); });

	});
});

describe("verb.core.Eval.threePointsAreFlat",function(){

	it('should identify flat line by returning true', function(){

		// this represents a single quarter arc, using a rational bezier curve
		var p1 = [0,0,0],
			p2 = [0,2,0],
			p3 = [0,4,0];

		should.equal(true, verb.core.Trig.threePointsAreFlat(p1,p2,p3,1e-5));

	});

});

describe("verb.core.Tess.rationalCurveAdaptiveSample",function(){

	it('returns two end points for a line', function(){

		var degree = 1
			, knots = [0, 0, 1, 1]
			, controlPoints = [ [0, 0, 0, 1], [10, 0, 0, 1] ]
			, curve = new verb.core.CurveData( degree, knots, controlPoints );

		var p = verb.core.Tess.rationalCurveAdaptiveSample( curve, 1e-5);
		
		should.equal(p[0][0], 0);
		should.equal(p[1][0], 10);

		p.map( function(e){  e.length.should.be.equal(3); });

	});

	it('returns all the control points for a degree 1 curve', function(){

		var degree = 1
			, knots = [0, 0, 0.25, 0.5, 0.75, 1, 1]
			, controlPoints = [ [0, 0, 0, 1], [10, 10, 0, 1], [14, 20, 0, 1], [10, 32, 4, 1], [12, 16, 22, 1]]
			, curve = new verb.core.CurveData( degree, knots, controlPoints );

		var p = verb.core.Tess.rationalCurveAdaptiveSample( curve, 1e-5);
		
		p.should.be.instanceof(Array).and.have.lengthOf(5);
		p[0].should.be.instanceof(Array).and.have.lengthOf(3);
		p[0].should.eql([0,0,0]);
		p[4].should.eql([12,16,22]);

		p.map( function(e){  e.length.should.be.equal(3); });

	});

	it('makes more points for an arc', function(){

		var degree = 2
			, knots = [0, 0, 0, 1, 1, 1 ]
			, v = Math.sqrt(2) / 2
			, controlPoints = [ [1, 0, 0, 1], [v, v, 0, v], [0, 1, 0, 1] ]
			, curve = new verb.core.CurveData( degree, knots, controlPoints );

		var p = verb.core.Tess.rationalCurveAdaptiveSample( curve, 1e-8, true);
		var p2 = verb.core.Tess.rationalCurveAdaptiveSample( curve, 1e-4, true);
		
		var prev = - 1e-8;
		for (var i = 0; i < p.length; i++){
			p[i][0].should.be.above(prev);
			p[i][0].should.be.within(-1e-8, 1 + 1e-8);
			prev = p[i][0];
		}

		p.should.be.instanceof(Array).and.not.have.lengthOf(0);
		p2.should.be.instanceof(Array).and.not.have.lengthOf(0);
		p.should.be.instanceof(Array).and.not.have.lengthOf(p2.length);

		should.equal(p[p.length-1][0], 1.0);
		should.equal(p2[p2.length-1][0], 1.0);

		p.map( function(e){  e.length.should.be.equal(4); });
		p2.map( function(e){  e.length.should.be.equal(4); });

	});

});

function getFlatSurface(){

	var p1 = [0,0,0]
		, p2 = [1,0,0]
		, p3 = [1,1,0]
		, p4 = [0,1,0];

	var p1p4 = verb.core.Vec.mul( 0.5, verb.core.Vec.add( p1, p4 ));
	var p2p3 = verb.core.Vec.mul( 0.5, verb.core.Vec.add( p2, p3 ));
	var p3p4 = verb.core.Vec.mul( 0.5, verb.core.Vec.add( p3, p4 ));
	var p1p2 = verb.core.Vec.mul( 0.5, verb.core.Vec.add( p1, p2 ));
	var p1p4p2p3 = verb.core.Vec.mul( 0.5, verb.core.Vec.add( p1p4, p2p3 ));
	var cpts = [ 	[p1, 		p1p4, 		p4],
					[p1p2, 	    p1p4p2p3, p3p4],
					[p2, 		p2p3, 		p3] ];
	var wts = [[1,1,1], [1,1,1], [1,1,1]];

	cpts = verb.core.Eval.homogenize2d(cpts, wts);

	return {"knotsU": [0,0,0,1,1,1],
			"knotsV": [0,0,0,1,1,1],
			"controlPoints": cpts,
			"degreeU": 2,
			"degreeV": 2 };

}

describe("verb.core.AdaptiveRefinementNode.constructor",function(){

	it('can be instantiated', function(){

		var f = new verb.core.AdaptiveRefinementNode( getFlatSurface() );

		f.corners[0].uv[0].should.be.equal(0);
		f.corners[2].uv[0].should.be.equal(1);
		f.corners[0].uv[1].should.be.equal(0);
		f.corners[2].uv[1].should.be.equal(1);
		f.corners.length.should.be.equal(4);

	});

});

function extractUv(x){ return x.uv; }

describe("verb.core.AdaptiveRefinementNode.getEdgeCorners",function(){

	it('returns expected result for node without children', function(){

		var f = new verb.core.AdaptiveRefinementNode(getFlatSurface());

		f.getEdgeCorners( 0 ).map(extractUv).should.be.eql( [[0,0]] );
		f.getEdgeCorners( 1 ).map(extractUv).should.be.eql( [[1,0]] );
		f.getEdgeCorners( 2 ).map(extractUv).should.be.eql( [[1,1]] );
		f.getEdgeCorners( 3 ).map(extractUv).should.be.eql( [[0,1]] );

	});

	it('returns expected result for node with children', function(){

		var f = new verb.core.AdaptiveRefinementNode(getFlatSurface());

		f.divide({ minDepth : 1 });

		f.children.length.should.be.equal( 2 );

		// split horizontally
		f.getEdgeCorners(0).map(extractUv).should.be.eql( [ [ 0, 0 ] ] );
		f.getEdgeCorners(1).map(extractUv).should.be.eql( [ [ 1, 0 ], [ 1, 0.5 ] ] );
		f.getEdgeCorners(2).map(extractUv).should.be.eql( [ [ 1, 1 ] ] );
		f.getEdgeCorners(3).map(extractUv).should.be.eql( [ [ 0, 1 ], [ 0, 0.5 ] ] );

	});

	it('returns expected result for node with nested children', function(){

		var f = new verb.core.AdaptiveRefinementNode(getFlatSurface());

		f.divide({ minDepth : 2 });
		f.children.length.should.be.equal( 2 );
		f.children[0].children.length.should.be.equal( 2 );
		f.children[1].children.length.should.be.equal( 2 );

		f.getEdgeCorners(0).map(extractUv).should.be.eql( [ [ 0, 0 ], [ 0.5, 0 ] ] );
		f.getEdgeCorners(1).map(extractUv).should.be.eql( [ [ 1, 0 ], [ 1, 0.5 ] ] );
		f.getEdgeCorners(2).map(extractUv).should.be.eql( [ [ 1, 1 ], [ 0.5, 1 ] ] );
		f.getEdgeCorners(3).map(extractUv).should.be.eql( [ [ 0, 1 ], [ 0, 0.5 ] ] );

	});

});

describe("verb.core.AdaptiveRefinementNode.getAllCorners",function(){

	it('returns expected result for edge with more vertices on opposite side', function(){

		var f = new verb.core.AdaptiveRefinementNode(getFlatSurface());

		f.divide({ minDepth : 1 }); // now f is split in 2 horizontally

		f.children[0].divide({ minDepth : 1 }); //  f[0] is split in 2 vertically
		f.children[1].divide({ minDepth : 1 }); //  f[1] is split in 2 veritcally
		f.children[1].children[1].divide({ minDepth : 1 }); //  f[1][3] is split in 2 horizontally

		f.children[0].getAllCorners(1).map(extractUv).should.eql( [ [ 1, 0 ] ] );
		f.children[0].children[1].getAllCorners(2).map(extractUv).should.eql( [ [ 1, 0.5 ] ] );

	});

	it('returns expected result for edge with neighbors that has with lesser number of vertices on opposite side', function(){

		var f = new verb.core.AdaptiveRefinementNode(getFlatSurface());

		f.divide({ minDepth : 1 });  // now f is split in 2 horizontally

		f.children[0].divide({ minDepth : 1 }); //  f[0] is split in 2 vertically
		f.children[1].divide({ minDepth : 1 }); //  f[1] is split in 2 veritcally
		f.children[1].children[1].divide({ minDepth : 1 }); //  f[1][3] is split in 2 horizontally

		f.children[1].children[1].children[1].getAllCorners(3).map(extractUv).should.eql( [ [ 0, 1 ] ] );

	});

});

describe("verb.core.AdaptiveRefinementNode.divide",function(){

	it('can be called with options.minDepth', function(){

		var f = new verb.core.AdaptiveRefinementNode(getFlatSurface());

		f.divide({ minDepth : 2 });
		f.children.length.should.be.equal( 2 );
		f.children[0].children.length.should.be.equal( 2 );
		f.children[1].children.length.should.be.equal( 2 );

	});

	it('can be called with no options provided', function(){

		var f = new verb.core.AdaptiveRefinementNode(getFlatSurface());

		f.divide();

		// no division is done
		should.equal( f.children, null);

	});

});

describe("verb.core.Trig.distToSegment",function(){

	it('works for simple case', function(){

		verb.core.Trig.distToSegment([-10,0,0], [3,3,0], [2,0,0] ).should.be.equal( 3 );

	});

});

describe("verb.core.AdaptiveRefinementNode.evalSrf",function(){

	it('works as expected', function(){

		var f = new verb.core.AdaptiveRefinementNode(getFlatSurface());

		var res = f.evalSrf( 0, 0 );

		vecShouldBe( [0,0,0], res.point );
		vecShouldBe( [0,0,-1], res.normal );

		res = f.evalSrf( 1,0 );

		vecShouldBe( [1,0,0], res.point );
		vecShouldBe( [0,0,-1], res.normal );

		res = f.evalSrf( 1,1 );

		vecShouldBe( [1,1,0], res.point );
		vecShouldBe( [0,0,-1], res.normal );

	});

});

describe("verb.core.AdaptiveRefinementNode.triangulate",function(){

	function getWarpedSurface(){

		var p1 = [0,0,0]
			, p2 = [1,0,0]
			, p3 = [1,1,1]
			, p4 = [0,1,0];

		var p1p4 = verb.core.Vec.mul( 0.5, verb.core.Vec.add( p1, p4 ));
		var p2p3 = verb.core.Vec.mul( 0.5, verb.core.Vec.add( p2, p3 ));
		var p3p4 = verb.core.Vec.mul( 0.5, verb.core.Vec.add( p3, p4 ));
		var p1p2 = verb.core.Vec.mul( 0.5, verb.core.Vec.add( p1, p2 ));
		var p1p4p2p3 = verb.core.Vec.mul( 0.5, verb.core.Vec.add( p1p4, p2p3 ));
		var cpts = [ 	[p1, 		p1p4, 		p4],
						[p1p2, 	    p1p4p2p3, p3p4],
						[p2, 		p2p3, 		p3] ];
		var wts = [[1,1,1], [1,1,1], [1,1,1]];

		cpts = verb.core.Eval.homogenize2d(cpts, wts);

		return {"knotsU": [0,0,0,1,1,1],
				"knotsV": [0,0,0,1,1,1],
				"controlPoints": cpts,
				"degreeU": 2,
				"degreeV": 2 };

	}

	it('can triangulate a square, planar surface with no options defined', function(){

		var srf = getFlatSurface();

		var f = new verb.core.AdaptiveRefinementNode( srf );
		f.divide();
		var mesh = f.triangulate();

		mesh.faces.should.eql( [ [ 0, 3, 1 ], [ 3, 2, 1 ]  ]);
		mesh.points.should.eql([ [ 0, 0, 0 ], [ 1, 0, 0 ], [ 1, 1, 0 ], [ 0, 1, 0 ] ]);
		mesh.uvs.should.eql([ [ 0, 0 ], [ 1, 0 ], [ 1, 1 ], [ 0, 1 ] ]);
		mesh.normals.should.eql( [ [ 0, 0, -1 ], [ 0, 0, -1 ], [ 0, 0, -1 ], [ 0, 0, -1 ] ] );

	});

	it('can triangulate a warped surface with no options defined', function(){

		var srf = getWarpedSurface();

		var f = new verb.core.AdaptiveRefinementNode( srf );

		f.divide();
		var mesh = f.triangulate();

		mesh.faces.length.should.be.greaterThan( 4 );
		mesh.points.length.should.be.greaterThan( 4 );
		mesh.points.forEach(function(x){ x.length.should.be.equal( 3 ); })
		mesh.points.length.should.be.equal( mesh.normals.length );
		mesh.uvs.length.should.be.equal( mesh.normals.length );

	});

	it('can triangulate a node with children', function(){

		var srf = getFlatSurface();

		var f = new verb.core.AdaptiveRefinementNode( srf );

		f.divide({ minDepth: 1 });
		var mesh = f.triangulate();

		mesh.faces.length.should.be.equal( 4 );
		mesh.points.length.should.be.greaterThan( 4 );
		mesh.points.forEach(function(x){ x.length.should.be.equal( 3 ); })
		mesh.points.length.should.be.equal( mesh.normals.length );
		mesh.uvs.length.should.be.equal( mesh.normals.length );

	});

	it('can triangulate a node with children and un-nested neighbors', function(){

		var srf = getFlatSurface();

		var f = new verb.core.AdaptiveRefinementNode( srf );

		f.divide({ minDepth: 1 });
		f.children[0].divide({ minDepth: 1 });

		var mesh = f.triangulate();

		mesh.faces.length.should.be.greaterThan( 4 );
		mesh.points.length.should.be.greaterThan( 4 );
		mesh.points.forEach(function(x){ x.length.should.be.equal( 3 ); })
		mesh.points.length.should.be.equal( mesh.normals.length );
		mesh.uvs.length.should.be.equal( mesh.normals.length );

	});

	it('can triangulate a node with children and equally nested neighbors', function(){

		var srf = getFlatSurface();

		var f = new verb.core.AdaptiveRefinementNode( srf );

		f.divide({ minDepth: 2 });

		var mesh = f.triangulate();

		mesh.faces.length.should.be.equal( 8 );
		mesh.points.length.should.be.greaterThan( 4 );
		mesh.points.forEach(function(x){ x.length.should.be.equal( 3 ); })
		mesh.points.length.should.be.equal( mesh.normals.length );
		mesh.uvs.length.should.be.equal( mesh.normals.length );

	});

	it('can triangulate a node with children and more nested neighbors', function(){

		var srf = getFlatSurface();

		var f = new verb.core.AdaptiveRefinementNode( srf );

		f.divide({ minDepth: 3 });

		var mesh = f.triangulate();

		mesh.faces.length.should.be.equal( 16 );
		mesh.points.length.should.be.greaterThan( 4 );
		mesh.points.forEach(function(x){ x.length.should.be.equal( 3 ); })
		mesh.points.length.should.be.equal( mesh.normals.length );
		mesh.uvs.length.should.be.equal( mesh.normals.length );

	});

});

describe("verb.core.Tess.rationalSurfaceAdaptive",function(){

	function getComplexSurface(){

		var degree = 3
			, knots = [0, 0, 0, 0, 0.333, 0.666, 1, 1, 1, 1]
			, pts = [ 	[ [0, 0, -10], 	[10, 0, 0], 	[20, 0, 0], 	[30, 0, 0] , 	[40, 0, 0], [50, 0, 0] ],
						[ [0, -10, 0], 	[10, -10, 10], 	[20, -10, 10], 	[30, -10, 0] , [40, -10, 0], [50, -10, 0]	],
						[ [0, -20, 0], 	[10, -20, 10], 	[20, -20, 10], 	[30, -20, 0] , [40, -20, -2], [50, -20, 0] 	],
						[ [0, -30, 0], 	[10, -30, 0], 	[20, -30, -23], 	[30, -30, 0] , [40, -30, 0], [50, -30, 0]     ],
						[ [0, -40, 0], 	[10, -40, 0], 	[20, -40, 0], 	[30, -40, 4] , [40, -40, -20], [50, -40, 0]     ],
						[ [0, -50, 12], [10, -50, 0], 	[20, -50, 0], 	[30, -50, 0] , [50, -50, 0], [50, -50, -15]     ],     ]
			, wts = [ 	[ 1, 1, 1, 1, 1, 1],
						[ 1, 1, 1, 1, 1, 1],
						[ 1, 1, 1, 1, 1, 1],
						[ 1, 1, 1, 1, 1, 1],
						[ 1, 1, 1, 1, 1, 1],
						[ 1, 1, 1, 1, 1, 1] ];

		pts = verb.core.Eval.homogenize2d(pts, wts);

		var srfObj = {
			degreeU : degree,
			degreeV : degree,
			knotsU : knots,
			knotsV : knots,
			controlPoints : pts
		};

		return srfObj;
	}

	it('produces a mesh from a divided surface', function(){

		var srf = getComplexSurface();

		var mesh = verb.core.Tess.rationalSurfaceAdaptive( srf, { minDivsU: 1, minDivsV: 4 } );

		mesh.faces.length.should.be.greaterThan( 8 );
		mesh.points.forEach(function(x){ x.length.should.be.equal( 3 ); })
		mesh.points.length.should.be.equal( mesh.normals.length );
		mesh.uvs.length.should.be.equal( mesh.normals.length );

	});
});

describe("verb.core.Make.ellipseArc",function(){

	it('returns correct result for unit arc from 0 to 90 deg', function(){

		var center = [0,0,0]
			, rx = 5
      		, ry = 1
			, x = [rx,0,0]
			, y = [0,ry,0]
			, start = 0
			, end = Math.PI/2;

		var ellipse = verb.core.Make.ellipseArc(center, x, y, start, end);

		// the typical parametric rep of an ellipse
		var xmid = rx * Math.cos( Math.PI / 4 )
			, ymid = ry * Math.sin( Math.PI / 4 );

		var p = verb.core.Eval.rationalCurvePoint( ellipse, 0.5);

		p[0].should.be.approximately( xmid, verb.core.Constants.EPSILON );
		p[1].should.be.approximately( ymid, verb.core.Constants.EPSILON );
		p[2].should.be.approximately( 0, verb.core.Constants.EPSILON );

		p = verb.core.Eval.rationalCurvePoint( ellipse, 1);

		p[0].should.be.approximately( 0, verb.core.Constants.EPSILON );
		p[1].should.be.approximately( ry, verb.core.Constants.EPSILON );
		p[2].should.be.approximately( 0, verb.core.Constants.EPSILON );

		p = verb.core.Eval.rationalCurvePoint( ellipse, 0);

		p[0].should.be.approximately( rx, verb.core.Constants.EPSILON );
		p[1].should.be.approximately( 0, verb.core.Constants.EPSILON );
		p[2].should.be.approximately( 0, verb.core.Constants.EPSILON );

	});

	it('returns correct result for unit arc from 0 to 90 deg', function(){

		var center = [0,0,0]
			, rx = 5
      		, ry = 1
			, x = [rx,0,0]
			, y = [0,ry,0]
			, start = 0
			, end = Math.PI / 2;

		var arc = verb.core.Make.ellipseArc(center, x, y, start, end);

		var p = verb.core.Eval.rationalCurvePoint( arc, 1);
		
		p[0].should.be.approximately( 0, verb.core.Constants.EPSILON );
		p[1].should.be.approximately( ry, verb.core.Constants.EPSILON );
		p[2].should.be.approximately( 0, verb.core.Constants.EPSILON );

	});

	it('returns correct result for unit arc from 45 to 135 deg', function(){

		var center = [0,0,0]
			, rx = 1
      		, ry = 10
			, x = [rx,0,0]
			, y = [0,ry,0]
			, start = Math.PI/4
			, end = 3 * Math.PI/4;

		var arc = verb.core.Make.ellipseArc(center, x, y, start, end);

		var p = verb.core.Eval.rationalCurvePoint( arc, 1);
		
		// the typical parametric rep of an ellipse
		var xmid = rx * Math.cos( 3 * Math.PI / 4 )
			, ymid = ry * Math.sin( 3 * Math.PI / 4 );

		p[0].should.be.approximately( xmid, verb.core.Constants.EPSILON );
		p[1].should.be.approximately( ymid, verb.core.Constants.EPSILON );
		p[2].should.be.approximately( 0, verb.core.Constants.EPSILON );

	});

	it('returns correct result for complete ellipse', function(){

		var center = [0,0,0]
			, rx = 1
      		, ry = 10
			, x = [rx,0,0]
			, y = [0,ry,0]
			, start = 0
			, end = Math.PI * 2;

		var ellipse = verb.core.Make.ellipseArc(center, x, y, start, end);

		// the typical parametric rep of an ellipse
		var xmid = rx * Math.cos( Math.PI / 4 )
			, ymid = ry * Math.sin( Math.PI / 4 );

		var p = verb.core.Eval.rationalCurvePoint( ellipse, 0.125);

		p[0].should.be.approximately( xmid, verb.core.Constants.EPSILON );
		p[1].should.be.approximately( ymid, verb.core.Constants.EPSILON );
		p[2].should.be.approximately( 0, verb.core.Constants.EPSILON );

		p = verb.core.Eval.rationalCurvePoint( ellipse, 0.25);

		p[0].should.be.approximately( 0, verb.core.Constants.EPSILON );
		p[1].should.be.approximately( ry, verb.core.Constants.EPSILON );
		p[2].should.be.approximately( 0, verb.core.Constants.EPSILON );

		p = verb.core.Eval.rationalCurvePoint( ellipse, 0.5);

		p[0].should.be.approximately( -rx, verb.core.Constants.EPSILON );
		p[1].should.be.approximately( 0, verb.core.Constants.EPSILON );
		p[2].should.be.approximately( 0, verb.core.Constants.EPSILON );

		p = verb.core.Eval.rationalCurvePoint( ellipse, 0);

		p[0].should.be.approximately( rx, verb.core.Constants.EPSILON );
		p[1].should.be.approximately( 0, verb.core.Constants.EPSILON );
		p[2].should.be.approximately( 0, verb.core.Constants.EPSILON );

	});

});

describe("verb.core.Make.extrudedSurface",function(){

	it('can extrude a line into a plane', function(){

		var axis = [0,0,1]
			, length = 5
			, prof_degree = 1
			, prof_ctrl_pts = [[0,1,0,1], [1,0,0,1]]
			, prof_knots = [0,0,1,1]
			, profile = new verb.core.CurveData( prof_degree, prof_knots, prof_ctrl_pts  );

		var comps = verb.core.Make.extrudedSurface(axis, length, profile);

		// the first row are the profile control pts
		should.equal( 0, comps.controlPoints[2][0][0] );
		should.equal( 1, comps.controlPoints[2][0][1] );
		should.equal( 0, comps.controlPoints[2][0][2] );

		should.equal( 1, comps.controlPoints[2][1][0] );
		should.equal( 0, comps.controlPoints[2][1][1] );
		should.equal( 0, comps.controlPoints[2][1][2] );

		// sample at the center
		var p = verb.core.Eval.rationalSurfacePoint( comps, 0.5, 0.5);

		should.equal( Math.abs( 0.5 - p[0]) < verb.core.Constants.EPSILON, true );
		should.equal( Math.abs( 0.5 - p[1]) < verb.core.Constants.EPSILON, true );
		should.equal( Math.abs( 2.5 - p[2]) < verb.core.Constants.EPSILON, true );

	});

	it('can extrude a 90 deg quadratic arc bezier curve', function(){

		var axis = [0,0,1]
			, length = 5
			, prof_degree = 2
			, prof_ctrl_pts = [[0,1,0], [1,1,0], [1,0,0]]
			, prof_knots = [0,0,0,1,1,1]
			, prof_weights = [1, Math.sqrt(2) / 2, 1]
			, profile = new verb.core.CurveData( prof_degree, prof_knots,
													verb.core.Eval.homogenize1d(prof_ctrl_pts, prof_weights)  );

		var comps = verb.core.Make.extrudedSurface(axis, length, profile);

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
		var p = verb.core.Eval.rationalSurfacePoint( comps, 0.5, 0.5);

		should.equal( Math.abs( Math.sqrt(2)/2 - p[0]) < verb.core.Constants.EPSILON, true );
		should.equal( Math.abs( Math.sqrt(2)/2 - p[1]) < verb.core.Constants.EPSILON, true );
		should.equal( Math.abs( 2.5 - p[2]) < verb.core.Constants.EPSILON, true );

	});

});

describe("verb.core.Make.arc",function(){

	it('returns correct result for unit arc from 0 to 90 deg', function(){

		var center = [0,0,0]
			, x = [1,0,0]
			, y = [0,1,0]
			, r = 1
			, start = 0
			, end = Math.PI/2;

		var arc = verb.core.Make.arc(center, x, y, 1, start, end);

		var p = verb.core.Eval.rationalCurvePoint( arc, 0.5);

		should.equal( Math.abs( p[0] - Math.sqrt(2)/2 ) < verb.core.Constants.EPSILON, true );
		should.equal( Math.abs( p[1] - Math.sqrt(2)/2 ) < verb.core.Constants.EPSILON, true );
		should.equal( p[2], 0 );

	});

	it('returns correct result for unit arc from 0 to 45 deg', function(){

		var center = [0,0,0]
			, x = [1,0,0]
			, y = [0,1,0]
			, r = 1
			, start = 0
			, end = Math.PI/4;

		var arc = verb.core.Make.arc(center, x, y, 1, start, end);

		var p = verb.core.Eval.rationalCurvePoint( arc, 1);

		should.equal( Math.abs( p[0] - Math.sqrt(2)/2 ) < verb.core.Constants.EPSILON, true );
		should.equal( Math.abs( p[1] - Math.sqrt(2)/2 ) < verb.core.Constants.EPSILON, true );
		should.equal( p[2], 0 );

	});

	it('returns correct result for unit arc from 45 to 135 deg', function(){

		var center = [0,0,0]
			, x = [1,0,0]
			, y = [0,1,0]
			, r = 1
			, start = Math.PI/4
			, end = 3 * Math.PI/4;

		var arc = verb.core.Make.arc(center, x, y, 1, start, end);

		var p = verb.core.Eval.rationalCurvePoint( arc, 0.5);

		should.equal( Math.abs( p[0] ) < verb.core.Constants.EPSILON, true );
		should.equal( Math.abs( p[1] - 1 ) < verb.core.Constants.EPSILON, true );
		should.equal( p[2], 0 );

	});

	it('returns correct result for unit circle', function(){

		var center = [0,0,0]
			, x = [1,0,0]
			, y = [0,1,0]
			, r = 5
			, start = 0
			, end = Math.PI;

		var arc = verb.core.Make.arc(center, x, y, r, start, end);

		var p = verb.core.Eval.rationalCurvePoint( arc, 0.5);

		p[0].should.be.approximately( 0, verb.core.Constants.EPSILON );
		p[1].should.be.approximately( 5 , verb.core.Constants.EPSILON);
		p[2].should.be.approximately( 0, verb.core.Constants.EPSILON );

	});

	it('returns correct result for unit circle', function(){

		var center = [0,0,0]
			, x = [1,0,0]
			, y = [0,1,0]
			, r = 1
			, start = 0
			, end = Math.PI * 2;

		var arc = verb.core.Make.arc(center, x, y, 1, start, end);

		var p = verb.core.Eval.rationalCurvePoint( arc, 0.5);

		should.equal( Math.abs( p[0] + 1) < verb.core.Constants.EPSILON, true );
		should.equal( Math.abs( p[1] ) < verb.core.Constants.EPSILON, true );
		should.equal( p[2], 0 );

	});

});

describe("verb.core.Make.polyline",function(){

	it('can create a polyline with correct structure', function(){

		var degree = 1
			, knots = [0, 0, 0.25, 0.5, 0.75, 1, 1]
			, controlPoints = [ [0, 0, 0], [10, 10, 0], [14, 20, 0], [10, 32, 4], [12, 16, 22] ]
			, weights = [1, 1, 1, 1, 1];

		var comps = verb.core.Make.polyline( controlPoints );

		comps.degree.should.equal(degree);
		comps.controlPoints.should.eql( verb.core.Eval.homogenize1d( controlPoints, weights ));

		// natural parameterization
		for (var i = 1; i < knots.length-1; i++){
			vecShouldBe( controlPoints[i-1], verb.core.Eval.rationalCurvePoint(comps, comps.knots[i] ) );
		}

	});

});

describe("verb.core.Make.cylinderSurface",function(){

	it('can create a cylinder', function(){

		var axis = [0,0,1]
			, xaxis = [1,0,0]
			, base = [0,0,0]
			, height = 5
			, radius = 5;

		var comps = verb.core.Make.cylinderSurface(axis, xaxis, base, height, radius);

		comps.degreeU.should.equal(2);
		comps.degreeV.should.equal(2);

		// sample at the center
		var p = verb.core.Eval.rationalSurfacePoint( comps, 0.5, 0.5);

		p[0].should.be.approximately(-radius, verb.core.Constants.EPSILON);
		p[1].should.be.approximately(0, verb.core.Constants.EPSILON);
		p[2].should.be.approximately(radius/2, verb.core.Constants.EPSILON);

		p = verb.core.Eval.rationalSurfacePoint( comps,
														0,
														0);

		p[0].should.be.approximately(radius, verb.core.Constants.EPSILON);
		p[1].should.be.approximately(0, verb.core.Constants.EPSILON);
		p[2].should.be.approximately(height, verb.core.Constants.EPSILON);

		p = verb.core.Eval.rationalSurfacePoint( comps,
														1,
														0);

		p[0].should.be.approximately(radius, verb.core.Constants.EPSILON);
		p[1].should.be.approximately(0, verb.core.Constants.EPSILON);
		p[2].should.be.approximately(0, verb.core.Constants.EPSILON);

		p = verb.core.Eval.rationalSurfacePoint( comps,
														0,
														1);

		p[0].should.be.approximately(radius, verb.core.Constants.EPSILON);
		p[1].should.be.approximately(0, verb.core.Constants.EPSILON);
		p[2].should.be.approximately(height, verb.core.Constants.EPSILON);

	});

});

describe("verb.core.Make.revolvedSurface",function(){

	it('creates a 90 degree cone with the given line for a profile', function(){

		var axis = [0,0,1]
			, center = [0,0,0]
			, angle = Math.PI/2
			, prof_degree = 1
			, prof_ctrl_pts = [[0,0,1,1], [1,0,0,1]]
			, prof_knots = [0,0,1,1]
			, profile = new verb.core.CurveData( prof_degree, prof_knots, prof_ctrl_pts );

		var comps = verb.core.Make.revolvedSurface(center, axis, angle, profile );

		// the first row are the profile control pts
		should.equal( 0, comps.controlPoints[0][0][0] );
		should.equal( 0, comps.controlPoints[0][0][1] );
		should.equal( 1, comps.controlPoints[0][0][2] );
		should.equal( 1, comps.controlPoints[0][0][3] );

		should.equal( 1, comps.controlPoints[0][1][0] );
		should.equal( 0, comps.controlPoints[0][1][1] );
		should.equal( 0, comps.controlPoints[0][1][2] );
		should.equal( 1, comps.controlPoints[0][1][3] );

		var p = verb.core.Eval.rationalSurfacePoint( comps,
														0.5,
														0.5);

		should.equal( Math.abs( Math.sqrt(2)/4 - p[0]) < verb.core.Constants.EPSILON, true );
		should.equal( Math.abs( Math.sqrt(2)/4 - p[1]) < verb.core.Constants.EPSILON, true );
		should.equal( Math.abs( 0.5 - p[2]) < verb.core.Constants.EPSILON, true );

	});

	it('creates a 180 degree cone with the given line for a profile', function(){

		var axis = [0,0,1]
			, center = [0,0,0]
			, angle = Math.PI
			, prof_degree = 1
			, prof_ctrl_pts = [[0,0,1,1], [1,0,0,1]]
			, prof_knots = [0,0,1,1]
			, profile = new verb.core.CurveData( prof_degree, prof_knots, prof_ctrl_pts );

		var comps = verb.core.Make.revolvedSurface(center, axis, angle, profile);

		// the first row are the profile control pts
		should.equal( 0, comps.controlPoints[0][0][0] );
		should.equal( 0, comps.controlPoints[0][0][1] );
		should.equal( 1, comps.controlPoints[0][0][2] );
		should.equal( 1, comps.controlPoints[0][0][2] );

		should.equal( 1, comps.controlPoints[0][1][0] );
		should.equal( 0, comps.controlPoints[0][1][1] );
		should.equal( 0, comps.controlPoints[0][1][2] );
		should.equal( 0, comps.controlPoints[0][1][2] );

		var p = verb.core.Eval.rationalSurfacePoint( comps,
														0.5,
														0.5);

		should.equal( p[0] < verb.core.Constants.EPSILON, true );
		should.equal( Math.abs( 0.5 - p[1]) < verb.core.Constants.EPSILON, true );
		should.equal( Math.abs( 0.5 - p[2]) < verb.core.Constants.EPSILON, true );

	});


	it('creates a 360 degree cone with the given line for a profile', function(){

		var axis = [0,0,1]
			, center = [0,0,0]
			, angle = Math.PI * 2
			, prof_degree = 1
			, prof_ctrl_pts = [[0,0,1,1], [1,0,0,1]]
			, prof_knots = [0,0,1,1]
			, profile = new verb.core.CurveData( prof_degree, prof_knots, prof_ctrl_pts );

		var comps = verb.core.Make.revolvedSurface(center, axis, angle, profile);

		// the first row are the profile control pts
		should.equal( 0, comps.controlPoints[0][0][0] );
		should.equal( 0, comps.controlPoints[0][0][1] );
		should.equal( 1, comps.controlPoints[0][0][2] );
		should.equal( 1, comps.controlPoints[0][0][3] );

		should.equal( 1, comps.controlPoints[0][1][0] );
		should.equal( 0, comps.controlPoints[0][1][1] );
		should.equal( 0, comps.controlPoints[0][1][2] );
		should.equal( 1, comps.controlPoints[0][1][3] );

		var p = verb.core.Eval.rationalSurfacePoint( comps,
														0.5,
														0.5);

		p[0].should.be.approximately(-0.5, verb.core.Constants.EPSILON );
		p[1].should.be.approximately(0, verb.core.Constants.EPSILON );
		p[2].should.be.approximately(0.5, verb.core.Constants.EPSILON );

	});

});

describe("verb.core.Trig.rayClosestPoint",function(){

	it('returns correct result for xaxis and 3d pt', function(){

		var r = [1,0,0]
			, o = [0,0,0]
			, pt = [3,4,-1];

		var proj = verb.core.Trig.rayClosestPoint(pt, o, r);

		should.equal( Math.abs( proj[0] - 3 ) < verb.core.Constants.EPSILON, true );
		should.equal( Math.abs( proj[1] ) < verb.core.Constants.EPSILON, true );
		should.equal( Math.abs( proj[2] ) < verb.core.Constants.EPSILON, true );

	});

});

describe("verb.core.Trig.distToRay",function(){

	it('returns correct result for xaxis and 3d pt', function(){

		var r = [1,0,0]
			, o = [0,0,0]
			, pt = [3,4,-1];

		var d = verb.core.Trig.distToRay(pt, o, r);

		d.should.be.approximately( Math.sqrt( 17 ), verb.core.Constants.TOLERANCE );

	});

});

describe("verb.core.Make.coneSurface",function(){

	it('can create a cone', function(){

		var axis = [0,0,1]
			, xaxis = [1,0,0]
			, base = [0,0,0]
			, height = 5
			, radius = 10;

		var comps = verb.core.Make.coneSurface(axis, xaxis, base, height, radius);

		comps.degreeU.should.equal(2);
		comps.degreeV.should.equal(1);

		// sample at the center
		var p = verb.core.Eval.rationalSurfacePoint( comps,
														0.5,
														0.5);

		p[0].should.be.approximately(-radius/2, verb.core.Constants.EPSILON);
		p[1].should.be.approximately(0, verb.core.Constants.EPSILON);
		p[2].should.be.approximately(height/2, verb.core.Constants.EPSILON);

		p = verb.core.Eval.rationalSurfacePoint( comps,
														0,
														0);

		p[0].should.be.approximately(0, verb.core.Constants.EPSILON);
		p[1].should.be.approximately(0, verb.core.Constants.EPSILON);
		p[2].should.be.approximately(height, verb.core.Constants.EPSILON);

		p = verb.core.Eval.rationalSurfacePoint( comps,
														1,
														0);

		p[0].should.be.approximately(0, verb.core.Constants.EPSILON);
		p[1].should.be.approximately(0, verb.core.Constants.EPSILON);
		p[2].should.be.approximately(height, verb.core.Constants.EPSILON);

		p = verb.core.Eval.rationalSurfacePoint( comps,
														0,
														1);

		p[0].should.be.approximately(radius, verb.core.Constants.EPSILON);
		p[1].should.be.approximately(0, verb.core.Constants.EPSILON);
		p[2].should.be.approximately(0, verb.core.Constants.EPSILON);
	});

});

describe("verb.core.Make.sphereSurface",function(){

	it('can create a unit sphere', function(){

		var center = [0,0,0]
			, axis = [0,0,1]
			, xaxis = [1,0,0]
			, radius = 1;

		var comps = verb.core.Make.sphereSurface(center, axis, xaxis, radius);

		comps.degreeU.should.equal(2);
		comps.degreeV.should.equal(2);

		// sample at the center
		var p = verb.core.Eval.rationalSurfacePoint( comps,
														0.5,
														0.5);

		p[0].should.be.approximately(-1, verb.core.Constants.EPSILON );
		p[1].should.be.approximately(0, verb.core.Constants.EPSILON );
		p[2].should.be.approximately(0, verb.core.Constants.EPSILON );

	});

});

describe("verb.core.Mat.solve",function(){

	it('can solve simple case', function(){

		var A = [[1,0.4], [-0.2,1]];
		var At = verb.core.Mat.transpose(A);
		var b = [5,4];

		var x = verb.core.Mat.solve( A, b);

		var s = verb.core.Vec.add(
			verb.core.Vec.mul( x[0], At[0] ),
			verb.core.Vec.mul( x[1], At[1] )
		);

		vecShouldBe( b, s );

	});

	function rand1d(n){

		var row = [];
		for (var j = 0; j < n; j++){
			row.push(Math.random());
		}

		return row;

	}

	function rand2d(n){

		var a = [];
		for (var i = 0; i < n; i++){
			a.push(rand1d(n));
		}

		return a;

	}

	it('can solve complex case', function(){

		var n = 5;
		var A = rand2d(n);
		var At = verb.core.Mat.transpose(A);
		var b = rand1d(n);

		var x = verb.core.Mat.solve( A, b);

		var s = x.reduce(function(acc, v, i){
			return verb.core.Vec.add( acc, verb.core.Vec.mul( v, At[i] ) )
		}, verb.core.Vec.zeros1d(n) );

		vecShouldBe( b, s );

	});
});

describe("verb.core.Make.rationalInterpCurve",function(){

	function shouldInterpPointsWithTangents(pts, degree, start_tangent, end_tangent){

		var crv = shouldInterpPoints(pts, degree, start_tangent, end_tangent);

		var tan0 = verb.core.Eval.rationalCurveDerivatives( crv, 0, 1)[1];
		var tan1 = verb.core.Eval.rationalCurveDerivatives( crv, 1, 1)[1];

		vecShouldBe( start_tangent, tan0 );
		vecShouldBe( end_tangent, tan1 );

	}

	function shouldInterpPoints(pts, degree, start_tangent, end_tangent){

		var crv = verb.core.Make.rationalInterpCurve( pts, degree, start_tangent, end_tangent );

		crv.degree.should.be.equal( degree );

		crv.controlPoints[0][0].should.be.approximately(pts[0][0], verb.core.Constants.TOLERANCE);
		crv.controlPoints[0][1].should.be.approximately(pts[0][1], verb.core.Constants.TOLERANCE);

		last(crv.controlPoints)[0].should.be.approximately(last(pts)[0], verb.core.Constants.TOLERANCE);
		last(crv.controlPoints)[1].should.be.approximately(last(pts)[1], verb.core.Constants.TOLERANCE);

		// // the internal points are interped (TODO: do this more efficiently)
		var tess = verb.core.Tess.rationalCurveAdaptiveSample( crv, 1e-8  );

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

	it('can compute valid cubic interpolating curve for 4 points', function(){

		var pts = [ [0, 0, 1], [3,4, 0], [-1,4, 0], [-4,0, 0], [-4,-3, 0] ];

		shouldInterpPoints( pts, 3 );

	});


	it('can compute valid degree 4 interpolating curve for 4 points', function(){

		var pts = [ [0, 0, 0], [3,4, 0], [-1,4, 0], [-4,0, 0], [-4,-3, 0] ];

		shouldInterpPoints( pts, 4 );

	});

	it('can compute valid quadratic interpolating curve for 4 points', function(){

		var pts = [ [0, 0, 0], [3,4, 0], [-1,4, 0], [-4,0, 0], [-4,-3, 0] ];

		shouldInterpPoints( pts, 2 );

	});

	it('can compute valid cubic interpolating curve for 100 points', function(){

		var pts = [];
		for (var i = 0; i < 100; i++){

			pts.push( [ 50 * Math.sin( (i / 100) * Math.PI ),
									50 * Math.cos( (i / 100) * Math.PI ),
									0 ]);

		}

		shouldInterpPoints( pts, 3 );

	});

	it('can compute valid cubic interpolating points and tangents', function(){

		var pts = [ [0, 0, 0], [3,4, 0], [-1,4, 0], [-4,0, 0], [-4,-3, 0] ];

		shouldInterpPointsWithTangents( pts, 3, [1,0,0], [0,1,0] );

	});

	// this fails occasionally - don't know why
	// it('can compute valid quadratic curve interpolating points and tangents', function(){

	// 	var pts = [ [0, 0, 0], [3,4, 0], [-1,4, 0], [-4,0, 0], [-4,-3, 0] ];

	// 	shouldInterpPointsWithTangents( pts, 2, [1,0,0], [0,1,0] );

	// });

	// it('can compute valid quadratic curve interpolating points and tangents', function(){

	// 	var pts = [ [0, 0, 0], [3,4, 0], [-1,4, 0], [-4,0, 0], [-4,-3, 0] ];

	// 	shouldInterpPointsWithTangents( pts, 4, [1,0,0], [0,1,0] );

	// });

});

describe("verb.core.Analyze.rationalBezierCurveArcLength",function(){

	it('can compute entire arc length of straight cubic bezier parameterized from 0 to 1', function(){

		var degree = 3
			, knots = [0,0,0,0,1,1,1,1]
			, controlPoints = [ [0,0,0,1], [1.5,0,0,1], [2,0,0,1], [3,0,0,1] ]
			, curve = new verb.core.CurveData( degree, knots, controlPoints );

		var res = verb.core.Analyze.rationalBezierCurveArcLength( curve, 1 );

		res.should.be.approximately( 3, verb.core.Constants.TOLERANCE );

	});

	it('can compute entire arc length of straight cubic bezier parameterized from 1 to 4', function(){

		var degree = 3
			, knots = [1,1,1,1,4,4,4,4]
			, controlPoints = [ [0,0,0,1], [1,0,0,1], [2,0,0,1], [3,0,0,1] ]
			, curve = new verb.core.CurveData( degree, knots, controlPoints );

		var res = verb.core.Analyze.rationalBezierCurveArcLength( curve, 4 );

		res.should.be.approximately( 3, verb.core.Constants.TOLERANCE );

	});

});

describe("verb.core.Analyze.rationalCurveArcLength",function(){

	it('can compute entire arc length of straight nurbs curve parameterized from 0 to 2', function(){

		var degree = 3
			, knots = [0,0,0,0,0.5,2,2,2,2]
			, controlPoints = [ [0,0,0,1], [1.5,0,0,1], [1.8,0,0,1], [2,0,0,1], [3,0,0,1] ]
			, curve = new verb.core.CurveData( degree, knots, controlPoints );

		var u = 0;
		var steps = 2;
		var inc = (last(knots) - knots[0]) / (steps-1);
		for (var i = 0; i < steps; i++){
			var pt = verb.core.Eval.rationalCurvePoint( curve, u );
			var res2 = verb.core.Analyze.rationalCurveArcLength( curve, u );

			res2.should.be.approximately( verb.core.Vec.norm( pt ), verb.core.Constants.TOLERANCE );

			u += inc;
		}
	});

	it('can compute entire arc length of curved nurbs curve parameterized from 0 to 1', function(){

		var degree = 3
			, knots = [0,0,0,0,0.5,1,1,1,1]
			, controlPoints = [ [1,1,1,1], [1.5,0,1,1], [1.8,0,0,1], [2,0.1,5,1], [3.1,0,0,1] ]
			, curve = new verb.core.CurveData( degree, knots, controlPoints );

		var gaussLen = verb.core.Analyze.rationalCurveArcLength( curve );

		// sample the curve with 10,000 pts
		var samples = verb.core.Tess.rationalCurveRegularSampleRange( curve, 0, 1, 10000 );

		var red = samples.reduce(function(acc, v){
			return { pt: v, l : acc.l + verb.core.Vec.norm( verb.core.Vec.sub( acc.pt, v ) ) };
		}, { pt: samples[0], l : 0 });

		gaussLen.should.be.approximately( red.l, 1e-3 )

	});

	it('can compute entire arc length of straight nurbs curve parameterized from 0 to 2', function(){

		var degree = 3
			, knots = [0,0,0,0,0.5,2,2,2,2]
			, controlPoints = [ [0,0,0,1], [1.5,0,0,1], [1.8,0,0,1], [2,0,0,1], [3,0,0,1] ]
			, curve = new verb.core.CurveData( degree, knots, controlPoints );

		var u = 0;
		var steps = 10;
		var inc = (last(knots) - knots[0]) / (steps-1);
		for (var i = 0; i < steps; i++){

			var pt = verb.core.Eval.rationalCurvePoint( curve, u );
			var res2 = verb.core.Analyze.rationalCurveArcLength( curve, u );

			res2.should.be.approximately( verb.core.Vec.norm( pt ), verb.core.Constants.TOLERANCE );

			u += inc;
		}

	});

});

describe("verb.core.Analyze.rationalBezierCurveParamAtArcLength",function(){

	it('can compute parameter at arc length of straight bezier curve', function(){

		var degree = 3
			, knots = [0,0,0,0,1,1,1,1]
			, controlPoints = [ [0,0,0,1], [1.5,0,0,1], [2,0,0,1], [3,0,0,1] ]
			, curve = new verb.core.CurveData( degree, knots, controlPoints );

		var tol = 1e-3;
		var d = 0;
		var steps = 10;
		var inc = 3 / (steps-1);;

		for (var i = 0; i < steps; i++){

			var u = verb.core.Analyze.rationalBezierCurveParamAtArcLength(curve, d, tol);
			var len = verb.core.Analyze.rationalBezierCurveArcLength(curve, u);

			len.should.be.approximately( d, tol );

			d += inc;
		}

	});

	it('can compute parameter at arc length of curved bezier curve', function(){

		var degree = 3
			, knots = [0,0,0,0,1,1,1,1]
			, controlPoints = [ [1,0,0,1], [1,0,-1,1], [2,0,0,1], [5,0,0,1] ]
			, curve = new verb.core.CurveData( degree, knots, controlPoints );

		var tol = 1e-3;
		var d = 0;
		var steps = 10;
		var inc = 3 / (steps-1);

		for (var i = 0; i < steps; i++){

			var u = verb.core.Analyze.rationalBezierCurveParamAtArcLength(curve, d, tol);
			var len = verb.core.Analyze.rationalBezierCurveArcLength(curve, u);

			len.should.be.approximately( d, tol );

			d += inc;
		}

	});

});

describe("verb.core.Analyze.rationalCurveParamAtArcLength",function(){

	it('can compute parameter at arc length of straight NURBS curve', function(){

		var degree = 3
			, knots = [0,0,0,0,0.5,1,1,1,1]
			, controlPoints = [ [0,0,0,1], [1,0,0,1], [2,0,0,1], [3,0,0,1], [4,0,0,1] ]
			, curve = new verb.core.CurveData( degree, knots, controlPoints );

		var tol = 1e-3;
		var d = 0;
		var steps = 10;
		var inc = 4 / (steps-1);

		var u = verb.core.Analyze.rationalCurveParamAtArcLength(curve, 2, tol);

		for (var i = 0; i < steps; i++){

			var u = verb.core.Analyze.rationalCurveParamAtArcLength(curve, d, tol);
			var len = verb.core.Analyze.rationalCurveArcLength(curve, u);

			len.should.be.approximately( d, tol );

			d += inc;
		}

	});

	it('can compute parameter at arc length of curved NURBS curve', function(){

		var degree = 3
			, knots = [0,0,0,0,0.5,1,1,1,1]
			, controlPoints = [ [1,0,0,1], [1,0,-1,1], [2,0,0,1], [3,0,1,1], [5,0,0,1] ]
			, curve = new verb.core.CurveData( degree, knots, controlPoints );

		var tol = 1e-3;
		var d = 0;
		var steps = 10;
		var inc = 3 / (steps-1);

		for (var i = 0; i < steps; i++){

			var u = verb.core.Analyze.rationalCurveParamAtArcLength(curve, d, tol);
			var len = verb.core.Analyze.rationalCurveArcLength(curve, u);

			len.should.be.approximately( d, tol );

			d += inc;
		}

	});

});

describe("verb.core.Divide.rationalCurveByArcLength",function(){

	it('can divide a straight NURBS curve', function(){

		var degree = 3
			, knots = [0,0,0,0,0.5,1,1,1,1]
			, controlPoints = [ [0,0,0,1], [1,0,0,1], [2,0,0,1], [3,0,0,1], [4,0,0,1] ]
			, curve = new verb.core.CurveData( degree, knots, controlPoints )
			, d = 0.5
			, tol = 1e-3;

		var res = verb.core.Divide.rationalCurveByArcLength(curve, d);

		var s = 0;
		res.forEach(function(u){

			var pt = verb.core.Eval.rationalCurvePoint( curve, u.u );
			u.len.should.be.approximately( s, tol );
			s += d;

		});

	});

});

describe("verb.core.Divide.rationalCurveByEqualArcLength",function(){

	it('can divide a straight NURBS curve', function(){

		var degree = 3
			, knots = [0,0,0,0,0.5,1,1,1,1]
			, controlPoints = [ [0,0,0,1], [1,0,0,1], [2,0,0,1], [3,0,0,1], [4,0,0,1] ]
			, curve = new verb.core.CurveData( degree, knots, controlPoints )
			, divs = 8
			, tol = 1e-3
			, d = 4 / divs;

		var res = verb.core.Divide.rationalCurveByEqualArcLength(curve, divs );

		var s = 0;
		res.forEach(function(u){

			var pt = verb.core.Eval.rationalCurvePoint( curve, u.u );
			u.len.should.be.approximately( s, tol );
			s += d;

		});

	});

});

describe("verb.core.Analyze.rationalCurveClosestParam",function(){

	it('can get closest point to a straight curve', function(){

		var degree = 3
			, knots = [0,0,0,0,0.5,1,1,1,1]
			, controlPoints = [ [0,0,0,1], [1,0,0,1], [2,0,0,1], [3,0,0,1], [4,0,0,1] ]
			, curve = new verb.core.CurveData( degree, knots, controlPoints )
			, pt = [1,0.2,0];

		var res = verb.core.Analyze.rationalCurveClosestParam(curve, [1,0.2,0] );
		var p = verb.core.Eval.rationalCurvePoint( curve, res );

		vecShouldBe( [1,0,0], p, 1e-3 );

		res = verb.core.Analyze.rationalCurveClosestParam(curve, [2,0.2,0] );
		p = verb.core.Eval.rationalCurvePoint( curve, res );

		vecShouldBe( [2,0,0], p, 1e-3 );

		// before start
		res = verb.core.Analyze.rationalCurveClosestParam(curve, [-1,0.2,1] );
		p = verb.core.Eval.rationalCurvePoint( curve, res );

		vecShouldBe( [0,0,0], p, 1e-3 );

		// beyond end
		res = verb.core.Analyze.rationalCurveClosestParam(curve, [5,0.2,0] );
		p = verb.core.Eval.rationalCurvePoint( curve, res );

		vecShouldBe( [4,0,0], p, 1e-3 );

	});

});

describe("verb.core.Analyze.rationalSurfaceClosestParam",function(){

	it('can get closest point to flat bezier patch', function(){

		var degreeU = 3
			, degreeV = 3
			, knotsU = [0, 0, 0, 0, 1, 1, 1, 1]
			, knotsV =	[0, 0, 0, 0, 1, 1, 1, 1]
			, controlPoints = [ 	[ [0, 0, 0, 1], 		[10, 0, 0, 1], 		[20, 0, 0, 1], 		[30, 0, 0, 1] 		],
									[ [0, -10, 0, 1], 	[10, -10, 0, 1], 	[20, -10, 0, 1], 	[30, -10, 0, 1] 	],
									[ [0, -20, 0, 1], 	[10, -20, 0, 1], 	[20, -20, 0, 1], 	[30, -20, 0, 1] 	],
									[ [0, -30, 0, 1], 	[10, -30, 0, 1], 	[20, -30, 0, 1], 	[30, -30, 0, 1] 	] ]
			, surface = new verb.core.SurfaceData( degreeU, degreeV, knotsU, knotsV, controlPoints )
			, point = [12,-20,5];

		var res = verb.core.Analyze.rationalSurfaceClosestParam( surface, point );
		var p = verb.core.Eval.rationalSurfacePoint( surface, res[0], res[1] );

		vecShouldBe( [12,-20,0], p, 1e-3 );

	});

});

describe("verb.core.Intersect.segmentWithTriangle",function(){

	it('gives correct result for intersecting axis aligned segment and triangle ', function(){

		// line from [5,5,5] to [5,5,-5]
		var p0 = [ 5,5,5 ]
			, p1 = [ 5,5,-10 ]
			, points = [ [0,0,0], [10,0,0], [5,10,1] ]
			, tri = [ 0, 1, 2 ];

		var res = verb.core.Intersect.segmentWithTriangle( p0, p1, points, tri );

		res.p.should.be.approximately(0.3, verb.core.Constants.TOLERANCE);
		res.s.should.be.approximately(0.25, verb.core.Constants.TOLERANCE);
		res.t.should.be.approximately(0.5, verb.core.Constants.TOLERANCE);

		console.log()

		var p_srf = verb.core.Vec.add( 	points[0],
										verb.core.Vec.add( 	verb.core.Vec.mul( res.s, verb.core.Vec.sub(points[1], points[0])),
															verb.core.Vec.mul( res.t, verb.core.Vec.sub(points[2], points[0]))));

		verb.core.Vec.norm( verb.core.Vec.sub( res.point, p_srf ) ).should.be.approximately(0, verb.core.Constants.TOLERANCE );

	});

	it('gives correct result for intersecting axis aligned segment and planar triangle ', function(){

		// line from [5,5,5] to [5,5,-5]
		var p0 = [ 5,5,5 ]
			, p1 = [ 5,5,-10 ]
			, points = [ [0,0,0], [10,0,0], [5,10,0] ]
			, tri = [ 0, 1, 2 ];

		var res = verb.core.Intersect.segmentWithTriangle( p0, p1, points, tri );

		res.p.should.be.approximately(0.333333333333, verb.core.Constants.TOLERANCE);
		res.s.should.be.approximately(0.25, verb.core.Constants.TOLERANCE);
		res.t.should.be.approximately(0.5, verb.core.Constants.TOLERANCE);

		var p_srf = verb.core.Vec.add( 	points[0],
										verb.core.Vec.add( 	verb.core.Vec.mul( res.s, verb.core.Vec.sub(points[1], points[0])),
															verb.core.Vec.mul( res.t, verb.core.Vec.sub(points[2], points[0]))));

		verb.core.Vec.norm( verb.core.Vec.sub( res.point, p_srf ) ).should.be.approximately(0, verb.core.Constants.TOLERANCE );

	});

	it('gives null for non-intersecting segment and triangle', function(){

		// line from [5,5,5] to [5,5,-5]
		var p0 = [ 5,5,5 ]
			, p1 = [ 5,5,4 ]

			// planar triangle
			, points = [ [0,0,0], [10,0,0], [5,10,0] ]
			, tri = [ 0, 1, 2 ];

		var res = verb.core.Intersect.segmentWithTriangle( p0, p1, points, tri );

		(null === res).should.be.true;

	});

});

describe("verb.core.Mesh.makeMeshAabb",function(){

	it('should return correct result for planar mesh', function(){

		//
		//  0  - 1
		//  |  /  \
		//  2   --  3
		//  |  \   /
		//  4  -  5
		//

		var points = [ [0,0,0], [1,0,0], [0, -1, 0 ], [2, -1, 0], [0, -2, 0], [1, -2, 0] ]
			, tris = [ [0,2,1], [1,2,3], [2,4,5], [2,5,3] ]
			, mesh = new verb.core.MeshData(tris, points, null, null)
			, tri_indices = [0,1,2,3]
			, aabb = verb.core.Mesh.makeMeshAabb(mesh, tri_indices);

		should.equal( 2, aabb.max[0] );
		should.equal( 0, aabb.min[0] );
		should.equal( 0, aabb.max[1] );
		should.equal( -2, aabb.min[1] );
		should.equal( 0, aabb.max[2] );
		should.equal( 0, aabb.min[2] );

	});

	it('makeMeshAabb should return correct result for non-planar mesh', function(){

		//
		//  0  - 1
		//  |  /  \
		//  2   --  3
		//  |  \   /
		//  4  -  5
		//

		var points = [ [0,0,-5], [1,0,0], [0, -1, 0 ], [2, -1, 0], [0, -2, 0], [1, -2, 4] ]
			, tris = [ [0,2,1], [1,2,3], [2,4,5], [2,5,3] ]
			, mesh = new verb.core.MeshData(tris, points, null, null)
			, tri_indices = [0,1,2,3]
			, aabb = verb.core.Mesh.makeMeshAabb(mesh, tri_indices);

		should.equal( 2, aabb.max[0] );
		should.equal( 0, aabb.min[0] );
		should.equal( 0, aabb.max[1] );
		should.equal( -2, aabb.min[1] );
		should.equal( 4, aabb.max[2] );
		should.equal( -5, aabb.min[2] );

	});

});

describe("verb.core.Mesh.makeMeshAabbTree",function(){

	it('should return the correct structure', function(){

		//
		//  0 --  1
		//  |   /  \
		//  2  ---  3
		//  |   \  /
		//  4 --  5
		//

		var points = [ [0,0,0], [1,0,0], [0, -1, 0 ], [2, -1, 0], [0, -2, 0], [1, -2, 0] ]
			, tris = [ [0,2,1], [1,2,3], [2,4,5], [2,5,3] ]
			, mesh = new verb.core.MeshData(tris, points, null, null)
			, tri_indices = [0,1,2,3]
			, root = verb.core.Mesh.makeMeshAabbTree( mesh, tri_indices );

		// root bb is correct
		should.equal( 2, root.boundingBox.max[0] );
		should.equal( 0, root.boundingBox.min[0] );
		should.equal( 0, root.boundingBox.max[1] );
		should.equal( -2, root.boundingBox.min[1] );
		should.equal( 0, root.boundingBox.max[2] );
		should.equal( 0, root.boundingBox.min[2] );

		// root is not a leaf
		should.equal( 2, root.children.length);

		// children should have 2 children, too
		var child1 = root.children[0],
			child2 = root.children[1];

		should.equal( 2, child1.children.length );
		should.equal( 2, child2.children.length );

		// the children's children should be leaves
		var child1child1 = child1.children[0],
			child1child2 = child1.children[1],
			child2child1 = child2.children[0],
			child2child2 = child2.children[1];

		should.not.exist( child1child1.children );
		should.not.exist( child1child2.children );
		should.not.exist( child2child1.children );
		should.not.exist( child2child2.children );

		// the grandchildren have the correct items in them
		should.equal( 0, child1child1.item );
		should.equal( 1, child1child2.item );

		should.equal( 2, child2child1.item );
		should.equal( 3, child2child2.item );
	});

});

describe("verb.core.Mesh.getTriangleCentroid",function(){

	it('should return origin for zeroed triangle', function(){

		var points = [[0,0,0],[0,0,0],[0,0,0]]
			, tri = [0,1,2]
			, centroid = verb.core.Mesh.getTriangleCentroid( points, tri );

		should.equal( 0, centroid[0] );
		should.equal( 0, centroid[1] );
		should.equal( 0, centroid[2] );

	});

	it('should return correct value', function(){

		var points = [[5,10,2],[3,-4,5],[-10,-3, 10]]
			, tri = [0,1,2]
			, centroid = verb.core.Mesh.getTriangleCentroid( points, tri );

		should.equal( -2/3, centroid[0] );
		should.equal( 1, centroid[1] );
		should.equal( 17/3, centroid[2] );

	});

});

describe("verb.core.Eval.getMinCoordOnAxis",function(){

	it('should return correct value', function(){

		var points = [[5,10,2],[3,-4,5],[-10,-3, 10]]
			, tri = [0,1,2]
			, a1 = verb.core.Mesh.getMinCoordOnAxis( points, tri, 0 )
			, a2 = verb.core.Mesh.getMinCoordOnAxis( points, tri, 1 )
			, a3 = verb.core.Mesh.getMinCoordOnAxis( points, tri, 2 );

		should.equal( -10, a1 );
		should.equal( -4, a2 );
		should.equal( 2, a3 );

	});
});

describe("verb.core.Mesh.sortTrianglesOnLongestAxis",function(){

	it('should return correct result with y axis regular array', function(){

		//
		//  0  -  1
		//  | 0 / 3 \
		//  2   --  3
		//  | 1 \ 2 /
		//  4  -  5
		//

		var points = [ [0,0,0], [1,-0.2,0], [0, -1, 0 ], [1, -1.2, 0], [0, -2.2, 0], [1, -2, 0]]
			, tris = [[0,2,1], [2,4,5], [2,5,3], [1,2,3]]
			, mesh = new verb.core.MeshData(tris, points, null, null)
			, tri_indices = [0,1,2,3]
			, aabb = verb.core.Mesh.makeMeshAabb(mesh, tri_indices)
			, sort_tri_indices = verb.core.Mesh.sortTrianglesOnLongestAxis( aabb, mesh, tri_indices );

		sort_tri_indices.should.eql([ 1, 2, 3, 0 ])

	});

	it('should return correct result', function(){

		var points = [ [0,10,0], [0,5,0], [0, 0, 0 ], [0, -5, 0], [0, -2, 0], [1, -2.2, 0]]
			, tris = [[0,1,4], [2,3,4], [1,2,4]]
			, mesh = new verb.core.MeshData(tris, points, null, null)
			, tri_indices = [0,1,2]
			, aabb = verb.core.Mesh.makeMeshAabb(mesh, tri_indices)
			, sort_tri_indices = verb.core.Mesh.sortTrianglesOnLongestAxis( aabb, mesh, tri_indices );

		sort_tri_indices.should.eql([ 1, 0, 2 ])
	});

});

describe("verb.core.Make.fourPointSurface",function(){

	it('can create an inclined plane', function(){

		var p1 = [0,0,0]
			, p2 = [1,0,0]
			, p3 = [1,1,1]
			, p4 = [0,1,1];

		var comps = verb.core.Make.fourPointSurface(p1, p2, p3, p4);

		comps.degreeU.should.equal(3);
		comps.degreeV.should.equal(3);

		// sample at the center
		var p = verb.core.Eval.rationalSurfacePoint( comps,
														0.5,
														0.5);

		p[0].should.be.approximately(0.5, verb.core.Constants.EPSILON );
		p[1].should.be.approximately(0.5, verb.core.Constants.EPSILON );
		p[2].should.be.approximately(0.5, verb.core.Constants.EPSILON );

	});

	it('can create a hypar', function(){

		var p1 = [0,0,1]
			, p2 = [1,0,0]
			, p3 = [1,1,1]
			, p4 = [0,1,0];

		var comps = verb.core.Make.fourPointSurface(p1, p2, p3, p4);

		comps.degreeU.should.equal(3);
		comps.degreeV.should.equal(3);

		// sample at the center
		var p = verb.core.Eval.rationalSurfacePoint( comps,
														0.5,
														0.5);

		p[0].should.be.approximately(0.5, verb.core.Constants.EPSILON );
		p[1].should.be.approximately(0.5, verb.core.Constants.EPSILON );
		p[2].should.be.approximately(0.5, verb.core.Constants.EPSILON );

		// bottom left
		p = verb.core.Eval.rationalSurfacePoint( comps,
														0,
														0);

		p[0].should.be.approximately(0, verb.core.Constants.EPSILON );
		p[1].should.be.approximately(0, verb.core.Constants.EPSILON );
		p[2].should.be.approximately(1, verb.core.Constants.EPSILON );

		// bottom right
		p = verb.core.Eval.rationalSurfacePoint( comps,
														1,
														0);

		p[0].should.be.approximately(1, verb.core.Constants.EPSILON );
		p[1].should.be.approximately(0, verb.core.Constants.EPSILON );
		p[2].should.be.approximately(0, verb.core.Constants.EPSILON );

	});

});

describe("verb.core.Intersect.polylines",function(){

	it('can intersect two simple lines', function(){

		var p1 = [0,0,0]
			, p2 = [0,1,0]
			, p3 = [-0.5,0.5,0]
			, p4 = [0.5,0.5,0]
			, pl0 = new verb.core.PolylineData([ p1, p2 ], [0, 1])
			, pl1 = new verb.core.PolylineData([ p3, p4 ], [0, 1]);

		var inter = verb.core.Intersect.polylines( pl0, pl1, verb.core.Constants.TOLERANCE );

		inter.length.should.be.equal(1);

		inter[0].u0.should.be.approximately(0.5, verb.core.Constants.TOLERANCE );
		inter[0].u1.should.be.approximately(0.5, verb.core.Constants.TOLERANCE );
		vecShouldBe( [0, 0.5, 0], inter[0].point0 );
		vecShouldBe( [0, 0.5, 0], inter[0].point1 );

	});

	it('can intersect a length 2 polyline and line', function(){

		var p1 = [0,0.5,0]
			, p2 = [2,0.5,0]
			, p3 = [0,0,0]
			, p4 = [1,0,0]
			, p5 = [1,1,0]
			, pl0 = new verb.core.PolylineData([ p1, p2 ], [0, 1])
			, pl1 = new verb.core.PolylineData([ p3, p4, p5], [0, 0.5, 1]);

		var inter = verb.core.Intersect.polylines( pl0, pl1, verb.core.Constants.TOLERANCE );

		inter.length.should.be.equal(1);

		inter[0].u0.should.be.approximately(0.5, verb.core.Constants.TOLERANCE );
		inter[0].u1.should.be.approximately(0.75, verb.core.Constants.TOLERANCE );

		vecShouldBe( [1, 0.5, 0], inter[0].point0 );
		vecShouldBe( [1, 0.5, 0], inter[0].point1 );

	});

	it('can intersect two length 2 polylines', function(){

		var p1 = [0.5,-0.5,0]
			, p2 = [0.5,0.5,0]
			, p3 = [1.5,0.5,0]
			, p4 = [0,0,0]
			, p5 = [1,0,0]
			, p6 = [1,1,0]
			, pl0 = new verb.core.PolylineData([ p1, p2, p3 ], [0, 0.5, 1])
			, pl1 = new verb.core.PolylineData([ p4, p5, p6 ], [0, 0.5, 1]);

		var inter = verb.core.Intersect.polylines( pl0, pl1, verb.core.Constants.TOLERANCE );

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

	it('correctly misses when two lines do not intersect', function(){

		var p1 = [0,0,0.5]
			, p2 = [0,1,0.5]
			, p3 = [-0.5,0.5,0]
			, p4 = [0.5,0.5,0]
			, pl0 = new verb.core.PolylineData([ p1, p2 ], [0, 1])
			, pl1 = new verb.core.PolylineData([ p3, p4 ], [0, 1]);

		var inter = verb.core.Intersect.polylines( pl0, pl1, verb.core.Constants.TOLERANCE );

		inter.length.should.be.equal(0);

	});
});

describe("verb.core.Intersect.threePlanes",function(){

	it('is correct for intersection of 3 basis planes', function(){

		var d1 = 0;
		var n1 = [1,0,0];
		var d2 = 0;
		var n2 = [0,1,0];
		var d3 = 0;
		var n3 = [0,0,1];

		var res = verb.core.Intersect.threePlanes(n1, d1, n2, d2, n3, d3);
		res.should.be.eql( [0,0,0] );

	});

	it('is correct for intersection of shifted basis planes', function(){

		var n1 = [1,0,0];
		var n2 = [0,1,0];
		var n3 = [0,0,1];
		var d1, d2, d3, res;

		for (var i = 0; i < 100; i++){

			d1 = (Math.random() - 0.5) * 10000;
			d2 = (Math.random() - 0.5) * 10000;
			d3 = (Math.random() - 0.5) * 10000;

			res = verb.core.Intersect.threePlanes(n1, d1, n2, d2, n3, d3);

			res[0].should.be.approximately( d1, verb.core.Constants.EPSILON );
			res[1].should.be.approximately( d2, verb.core.Constants.EPSILON );
			res[2].should.be.approximately( d3, verb.core.Constants.EPSILON );

		}

	});

	it('is null for repeat planes', function(){

		var d1 = 10;
		var n1 = [0,1,0];
		var d2 = 0;
		var n2 = [0,1,0];
		var d3 = 10;
		var n3 = [0,0,1];

		var res = verb.core.Intersect.threePlanes(n1, d1, n2, d2, n3, d3);
		should.equal( res, null ); //non-intersect is null

	});

});

describe("verb.core.Intersect.planes",function(){

	it('is correct for intersection of xz and yz planes', function(){

		var o1 = [0,0,0];
		var n1 = [1,0,0];
		var o2 = [0,0,0];
		var n2 = [0,1,0];

		var res = verb.core.Intersect.planes(o1, n1, o2, n2);

		res.origin.should.be.eql( [0,0,0] );
		res.dir.should.be.eql( [0,0,1] );

	});

	it('is correct for intersection of xz and shifted yz plane', function(){

		var o1 = [20,0,0];
		var n1 = [1,0,0];
		var o2 = [0,0,0];
		var n2 = [0,1,0];

		var res = verb.core.Intersect.planes(o1, n1, o2, n2);

		res.origin.should.be.eql( [20,0,0] );
		res.dir.should.be.eql( [0,0,1] );

	});

	it('is correct for intersection of shifted xz and yz plane', function(){

		var o1 = [0,0,0];
		var n1 = [1,0,0];
		var o2 = [0,20,0];
		var n2 = [0,1,0];

		// should be z-axis
		var res = verb.core.Intersect.planes(o1, n1, o2, n2);

		res.origin.should.be.eql( [0,20,0] );
		res.dir.should.be.eql( [0,0,1] );

	});

});

describe("verb.core.Intersect.clipRayInCoplanarTriangle",function(){

	it('is correct for a basic example 1', function(){

		var o = [0,1,0];
		var d = [1,0,0];

		var pts = [ [0,0,0], [2,0,0], [2, 2,0] ];
		var tri = [[ 0, 1, 2 ]];
		var uvs = [ [0,0], [2,0], [2, 2] ];
		var mesh = new verb.core.MeshData(tri, pts, null, uvs);

		var res = verb.core.Intersect.clipRayInCoplanarTriangle(new verb.core.Ray(o, d), mesh, 0);



		res.min.u.should.be.approximately(1, verb.core.Constants.TOLERANCE);
		res.max.u.should.be.approximately(2, verb.core.Constants.TOLERANCE);

		vecShouldBe( [1,1], res.min.uv );
		vecShouldBe( [2,1], res.max.uv );

		vecShouldBe( [1,1,0], res.min.point );
		vecShouldBe( [2,1,0], res.max.point );

	});

	it('is correct for a basic example 2', function(){

		var o = [0.5,-0.5,0];
		var d = [0,1,0];

		var pts = [ [0,0,0], [2,0,0], [2, 2,0] ];
		var tri = [[ 0, 1, 2 ]];
		var uvs = [ [0,0], [2,0], [2, 2] ];

		var mesh = new verb.core.MeshData(tri, pts, null, uvs);
		var res = verb.core.Intersect.clipRayInCoplanarTriangle(new verb.core.Ray(o, d), mesh, 0 );

		res.min.u.should.be.approximately(0.5, verb.core.Constants.TOLERANCE);
		res.max.u.should.be.approximately(1, verb.core.Constants.TOLERANCE);

		vecShouldBe( [0.5,0], res.min.uv );
		vecShouldBe( [0.5,0.5], res.max.uv );

		vecShouldBe( [0.5,0,0], res.min.point );
		vecShouldBe( [0.5,0.5,0], res.max.point );

	});

	it('is correct for a basic example 3', function(){

		var o = [0.5,-0.5,0];
		var d = [Math.sqrt(2)/2,Math.sqrt(2)/2,0];

		var pts = [ [0,0,0], [2,0,0], [2, 2,0] ];
		var tri = [[ 0, 1, 2 ]];
		var uvs = [ [0,0], [2,0], [2, 2] ];

		var mesh = new verb.core.MeshData(tri, pts, null, uvs);
		var res = verb.core.Intersect.clipRayInCoplanarTriangle(new verb.core.Ray(o, d), mesh, 0 );

		res.min.u.should.be.approximately(Math.sqrt(2)/2, verb.core.Constants.TOLERANCE);
		res.max.u.should.be.approximately(3 * Math.sqrt(2)/2, verb.core.Constants.TOLERANCE);

		vecShouldBe( [1,0], res.min.uv );
		vecShouldBe( [2,1], res.max.uv );

		vecShouldBe( [1,0,0], res.min.point );
		vecShouldBe( [2,1,0], res.max.point );

	});

	it('is correct for a basic example 4', function(){

		var o = [0, 2,0];
		var d = [Math.sqrt(2)/2,-Math.sqrt(2)/2,0];

		var pts = [ [0,0,0], [2,0,0], [2, 2,0] ];
		var tri = [[ 0, 1, 2 ]];
		var uvs = [ [0,0], [2,0], [2, 2] ];

		var mesh = new verb.core.MeshData(tri, pts, null, uvs);
		var res = verb.core.Intersect.clipRayInCoplanarTriangle(new verb.core.Ray(o, d), mesh, 0 );

		res.min.u.should.be.approximately(Math.sqrt(2), verb.core.Constants.TOLERANCE);
		res.max.u.should.be.approximately(2 * Math.sqrt(2), verb.core.Constants.TOLERANCE);

		vecShouldBe( [1,1], res.min.uv );
		vecShouldBe( [2,0], res.max.uv );

		vecShouldBe( [1,1,0], res.min.point );
		vecShouldBe( [2,0,0], res.max.point );

	});

	it('is correct for a basic example 5', function(){

		var o = [1,1,0];
		var d = [Math.sqrt(2)/2,-Math.sqrt(2)/2,0];

		var pts = [ [0,0,0], [2,0,0], [2, 2,0] ];
		var tri = [[ 0, 1, 2 ]];
		var uvs = [ [0,0], [2,0], [2, 2] ];

		var mesh = new verb.core.MeshData(tri, pts, null, uvs);
		var res = verb.core.Intersect.clipRayInCoplanarTriangle(new verb.core.Ray(o, d), mesh, 0 );

		res.min.u.should.be.approximately(0, verb.core.Constants.TOLERANCE);
		res.max.u.should.be.approximately(Math.sqrt(2), verb.core.Constants.TOLERANCE);

		vecShouldBe( [1,1], res.min.uv );
		vecShouldBe( [2,0], res.max.uv );

		vecShouldBe( [1,1,0], res.min.point );
		vecShouldBe( [2,0,0], res.max.point );

	});

	it('is correct for a basic example 6', function(){

		var o = [3,1,0];
		var d = [-1,0,0];

		var pts = [ [0,0,0], [2,0,0], [2, 2,0] ];
		var tri = [[ 0, 1, 2 ]];
		var uvs = [ [0,0], [2,0], [2, 2] ];

		var mesh = new verb.core.MeshData(tri, pts, null, uvs);
		var res = verb.core.Intersect.clipRayInCoplanarTriangle(new verb.core.Ray(o, d), mesh, 0 );

		res.min.u.should.be.approximately(1, verb.core.Constants.TOLERANCE);
		res.max.u.should.be.approximately(2, verb.core.Constants.TOLERANCE);

		vecShouldBe( [2,1], res.min.uv );
		vecShouldBe( [1,1], res.max.uv );

		vecShouldBe( [2,1,0], res.min.point );
		vecShouldBe( [1,1,0], res.max.point );

	});

});

describe("verb.core.Intersect.mergeTriangleClipIntervals",function(){

	it('is correct for a basic example', function(){

		var o = [1,0,0];
		var d = [0,1,0];

		var pts1 = [ [0,0,0], [2,0,0], [2, 2,0] ];
		var tri1 = [[ 0, 1, 2 ]];
		var uvs1 = [ [0,0], [2,0], [2, 2] ];
		var mesh1 = new verb.core.MeshData(tri1, pts1, null, uvs1);

		var clip1 = verb.core.Intersect.clipRayInCoplanarTriangle(new verb.core.Ray(o, d), mesh1, 0 );

		var pts2 = [ [1,0.5,-1], [1,2.5,-1], [1,0.5,1] ];
		var tri2 = [[ 0, 1, 2 ]];
		var uvs2 = [ [0,0], [2,0], [0,2] ];
		var mesh2 = new verb.core.MeshData(tri2, pts2, null, uvs2);

		var clip2 = verb.core.Intersect.clipRayInCoplanarTriangle(new verb.core.Ray(o, d), mesh2, 0 );

		var res = verb.core.Intersect.mergeTriangleClipIntervals(clip1, clip2, mesh1, 0, mesh2, 0);

		vecShouldBe( [1, 0.5], res.min.uv0 );
		vecShouldBe( [0, 1], res.min.uv1 );
		vecShouldBe( [1, 0.5, 0], res.min.point );

		vecShouldBe( [1, 1], res.max.uv0 );
		vecShouldBe( [0.5, 1], res.max.uv1 );
		vecShouldBe( [1, 1, 0], res.max.point );

	});

	it('is correct for triangles sharing an edge', function(){

		var o = [2,-1,0];
		var d = [0,1,0];

		var pts1 = [ [0,0,0], [2,0,0], [2, 2,0] ];
		var tri1 = [[ 0, 1, 2 ]];
		var uvs1 = [ [0,0], [2,0], [2, 2] ];
		var mesh1 = new verb.core.MeshData(tri1, pts1, null, uvs1);

		var clip1 = verb.core.Intersect.clipRayInCoplanarTriangle(new verb.core.Ray(o, d), mesh1, 0 );

		var pts2 = [ [2,0,0], [2, 2, 0], [2, 0, 2] ];
		var tri2 = [[ 0, 1, 2 ]];
		var uvs2 = [ [0,0], [2,0], [0,2] ];
		var mesh2 = new verb.core.MeshData(tri2, pts2, null, uvs2);

		var clip2 = verb.core.Intersect.clipRayInCoplanarTriangle(new verb.core.Ray(o, d), mesh2, 0 );

		var res = verb.core.Intersect.mergeTriangleClipIntervals(clip1, clip2, mesh1, 0, mesh2, 0);

		vecShouldBe( [2, 0], res.min.uv0 );
		vecShouldBe( [0, 0], res.min.uv1 );
		vecShouldBe( [2, 0, 0], res.min.point );

		vecShouldBe( [2, 2], res.max.uv0 );
		vecShouldBe( [2, 0], res.max.uv1 );
		vecShouldBe( [2, 2, 0], res.max.point );

	});

});

describe("verb.core.Intersect.triangles",function(){

	it('is correct for a basic example', function(){

		var pts1 = [ [0,0,0], [2,0,0], [2, 2,0] ];
		var tri1 = [[ 0, 1, 2 ]];
		var uvs1 = [ [0,0], [2,0], [2, 2] ];
		var mesh1 = new verb.core.MeshData(tri1, pts1, null, uvs1);

		var pts2 = [ [1,0.5,-1], [1,2.5,-1], [1,0.5,1] ];
		var tri2 = [[ 0, 1, 2 ]];
		var uvs2 = [ [0,0], [2,0], [0,2] ];
		var mesh2 = new verb.core.MeshData(tri2, pts2, null, uvs2);

		var res = verb.core.Intersect.triangles( mesh1, 0, mesh2, 0 );

		vecShouldBe( [1, 0.5], res.min.uv0 );
		vecShouldBe( [0, 1], res.min.uv1 );
		vecShouldBe( [1, 0.5, 0], res.min.point );

		vecShouldBe( [1, 1], res.max.uv0 );
		vecShouldBe( [0.5, 1], res.max.uv1 );
		vecShouldBe( [1, 1, 0], res.max.point );

	});

	it('is correct for triangles sharing an edge', function(){

		var pts1 = [ [0,0,0], [2,0,0], [2, 2,0] ];
		var tri1 = [[ 0, 1, 2 ]];
		var uvs1 = [ [0,0], [2,0], [2, 2] ];
		var mesh1 = new verb.core.MeshData(tri1, pts1, null, uvs1);

		var pts2 = [ [2, 0, 0], [2, 2, 0], [2,0,2] ];
		var tri2 = [[ 0, 1, 2 ]];
		var uvs2 = [ [0,0], [2,0], [0,2] ];
		var mesh2 = new verb.core.MeshData(tri2, pts2, null, uvs2);

		var res = verb.core.Intersect.triangles( mesh1, 0, mesh2, 0 );

		vecShouldBe( [2,0], res.min.uv0 );
		vecShouldBe( [0,0], res.min.uv1 );
		vecShouldBe( [2,0,0], res.min.point );

		vecShouldBe( [2,2], res.max.uv0 );
		vecShouldBe( [2,0], res.max.uv1 );
		vecShouldBe( [2, 2, 0], res.max.point );

	});


});

describe("verb.core.Intersect.curves",function(){

	it('gives valid result for two planar lines', function(){

		var degree1 = 1,
				knots1 = [0,0,1,1],
				controlPoints1 = [[0,0,0,1], [2,0,0,1]],
				curve1 = new verb.core.CurveData( degree1, knots1, controlPoints1 ),
				degree2 = 1,
				knots2 = [0,0,1,1],
				controlPoints2 = [[0.5,0.5,0,1], [0.5,-1.5,0,1]]
				curve2 = new verb.core.CurveData( degree2, knots2, controlPoints2 );

		var res = verb.core.Intersect.curves( curve1, curve2, verb.core.Constants.TOLERANCE );

		res.length.should.be.equal(1);

		res[0].u0.should.be.approximately(0.25, verb.core.Constants.TOLERANCE );
		res[0].u1.should.be.approximately(0.25, verb.core.Constants.TOLERANCE );

	});

	it('gives valid result for planar degree 2 bezier and planar line', function(){

		var degree1 = 1,
				knots1 = [0,0,1,1],
				controlPoints1 = [[0,0,0,1], [2,0,0,1]],
				curve1 = new verb.core.CurveData( degree1, knots1, controlPoints1 ),
				degree2 = 2,
				knots2 = [0,0,0,1,1,1],
				controlPoints2 = [[0.5,0.5,0,1], [0.7,0,0,1], [0.5,-1.5,0,1]]
				curve2 = new verb.core.CurveData( degree2, knots2, controlPoints2 );

		var res = verb.core.Intersect.curves( 	curve1,curve2, verb.core.Constants.TOLERANCE );

		res.length.should.be.equal(1);

		res[0].u0.should.be.approximately(0.2964101616038012, verb.core.Constants.TOLERANCE );
		res[0].u1.should.be.approximately(0.3660254038069307, verb.core.Constants.TOLERANCE );

	});

	it('gives valid result for planar line and planar degree 2 bezier as second arg', function(){

		var degree1 = 1,
				knots1 = [0,0,1,1],
				controlPoints1 = [[0,0,0,1], [2,0,0,1]],
				curve1 = new verb.core.CurveData( degree1, knots1, controlPoints1 ),
				degree2 = 2,
				knots2 = [0,0,0,1,1,1],
				controlPoints2 = [[0.5,0.5,0,1], [0.7,0,0,1], [0.5,-1.5,0,1]]
				curve2 = new verb.core.CurveData( degree2, knots2, controlPoints2 );

		var res = verb.core.Intersect.curves(curve2, curve1, verb.core.Constants.TOLERANCE );

		res.length.should.be.equal(1);

		res[0].u0.should.be.approximately(0.3660254038069307, verb.core.Constants.TOLERANCE );
		res[0].u1.should.be.approximately(0.2964101616038012, verb.core.Constants.TOLERANCE );

	});

	it('gives valid result for 2 planar degree 2 beziers', function(){

		var degree1 = 2,
				knots1 = [0,0,0,1,1,1],
				controlPoints1 = [[0,0,0,1], [0.5,0.1,0,1],  [2,0,0,1]],
				curve1 = new verb.core.CurveData( degree1, knots1, controlPoints1 ),
				degree2 = 2,
				knots2 = [0,0,0,1,1,1],
				controlPoints2 = [[0.5,0.5,0,1], [0.7,0,0,1], [0.5,-1.5,0,1]]
				curve2 = new verb.core.CurveData( degree2, knots2, controlPoints2 );

		var res = verb.core.Intersect.curves( curve1,curve2, verb.core.Constants.TOLERANCE );

		res.length.should.be.equal(1);

		res[0].u0.should.be.approximately(0.416208132514572, verb.core.Constants.TOLERANCE );
		res[0].u1.should.be.approximately(0.3374987853196129, verb.core.Constants.TOLERANCE );

	});

});

describe("verb.core.Intersect.curveAndSurface",function(){

	it('gives valid result for planar surface and line', function(){

		// build planar surface in the xy plane
		var homo_controlPoints_srf = [ [ [0,0,0,1], [20,0,0,1] ], [[0,10,0,1], [20,10,0,1] ] ]
			, degreeU  = 1
			, degreeV = 1
			, knotsU = [0,0,1,1]
			, knotsV = [0,0,1,1]
			, surface = new verb.core.SurfaceData( degreeU, degreeV, knotsU, knotsV, homo_controlPoints_srf );

		// line from [5,5,5] to [5,5,-5]
		var degree_crv = 1
			, knots_crv = [0,0,1,1]
			, homo_controlPoints_crv = [ [5.2,5.2,5,1], [5.2,5.2,-10,1] ]
			, curve = new verb.core.CurveData( degree_crv, knots_crv, homo_controlPoints_crv );

		var res = verb.core.Intersect.curveAndSurface( curve, surface, verb.core.Constants.TOLERANCE );

		res.length.should.be.equal( 1 );

		res[0].u.should.be.approximately( 1/3, 1e-3 );
		res[0].uv[0].should.be.approximately( 0.52, 1e-3 );
		res[0].uv[1].should.be.approximately( 0.26, 1e-3 );

	});

	it('gives valid result for planar surface and degree 1 nurbs', function(){

		// build planar surface in the xy plane
		var homo_controlPoints_srf = [ [ [0,0,0,1], [20,0,0,1] ], [[0,10,0,1], [20,10,0,1] ] ]
			, degreeU  = 1
			, degreeV = 1
			, knotsU = [0,0,1,1]
			, knotsV = [0,0,1,1]
			, surface = new verb.core.SurfaceData( degreeU, degreeV, knotsU, knotsV, homo_controlPoints_srf );

		// line from [5,5,5] to [5,5,-5]
		var degree_crv = 1
			, knots_crv = [0,0,0.5,1,1]
			, homo_controlPoints_crv = [ [5.2,5.2,5,1], [5.2,5.2,-2.5,1], [5.2,5.2,-10,1] ]
			, curve = new verb.core.CurveData( degree_crv, knots_crv, homo_controlPoints_crv );

		var res = verb.core.Intersect.curveAndSurface( curve, surface, verb.core.Constants.TOLERANCE );

		res.length.should.be.equal( 1 );
		res[0].u.should.be.approximately( 1/3, 1e-3 );
		res[0].uv[0].should.be.approximately( 0.52, 1e-3 );
		res[0].uv[1].should.be.approximately( 0.26, 1e-3 );

	});

	it('gives valid result for planar surface and degree 2 bezier', function(){

		// build planar surface in the xy plane
		var homo_controlPoints_srf = [ [ [0,0,0,1], [0,10,0,1] ], [[20,0,0,1], [20,10,0,1] ] ]
			, degreeU  = 1
			, degreeV = 1
			, knotsU = [0,0,1,1]
			, knotsV = [0,0,1,1]
			, surface = new verb.core.SurfaceData( degreeU, degreeV, knotsU, knotsV, homo_controlPoints_srf );

		// line from [5,5,5] to [5,5,-5]
		var degree_crv = 2
			, knots_crv = [0,0,0,1,1,1]
			, homo_controlPoints_crv = [ [5.2,5.2,5,1], [5.4,4.8,0,1], [5.2,5.2,-5,1] ]
			, curve = new verb.core.CurveData( degree_crv, knots_crv, homo_controlPoints_crv );

		var res =  verb.core.Intersect.curveAndSurface( curve, surface, verb.core.Constants.TOLERANCE  );

		res.length.should.be.equal( 1 );
		res[0].u.should.be.approximately( 0.5, 1e-3 );
		res[0].uv[0].should.be.approximately( 0.265, 1e-3 );
		res[0].uv[1].should.be.approximately( 0.5, 1e-3 );

	});

	it('gives valid result for non-intersecting planar surface and line', function(){

		// build planar surface in the xy plane
		var homo_controlPoints_srf = [ [ [0,0,0,1], [20,0,0,1] ], [[0,10,0,1], [20,10,0,1] ] ]
			, degreeU  = 1
			, degreeV = 1
			, knotsU = [0,0,1,1]
			, knotsV = [0,0,1,1]
			, surface = new verb.core.SurfaceData( degreeU, degreeV, knotsU, knotsV, homo_controlPoints_srf );

		// line from [5,5,5] to [5,5,-5]
		var degree_crv = 1
			, knots_crv = [0,0,1,1]
			, homo_controlPoints_crv = [ [5.2,5.2,5,1], [5.2,5.2,2,1] ]
			, curve = new verb.core.CurveData( degree_crv, knots_crv, homo_controlPoints_crv );

		var res =  verb.core.Intersect.curveAndSurface( curve, surface );
		res.length.should.be.equal( 0 );

	});

});

describe("verb.core.Intersect.curveAndSurfaceWithEstimate",function(){

	it('gives valid result for planar surface and degree 2 bezier', function(){

		var homo_controlPoints_srf = [ [ [0,0,0,1], [0,10,0,1] ], [[20,0,0,1], [20,10,0,1] ] ]
			, degreeU  = 1
			, degreeV = 1
			, knotsU = [0,0,1,1]
			, knotsV = [0,0,1,1]
			, surface = new verb.core.SurfaceData( degreeU, degreeV, knotsU, knotsV, homo_controlPoints_srf );

		var degree_crv = 2
			, knots_crv = [0,0,0,1,1,1]
			, homo_controlPoints_crv = [ [5.2,5.2,5,1], [5.4,4.8,0,1], [5.2,5.2,-5,1] ]
			, curve = new verb.core.CurveData( degree_crv, knots_crv, homo_controlPoints_crv );

		var start_params = [ 0.45, 0.25, 0.55 ];

		var res = verb.core.Intersect.curveAndSurfaceWithEstimate( curve, surface, start_params, verb.core.Constants.TOLERANCE );

		res.u.should.be.approximately(0.5, 1e-3);
		res.uv[0].should.be.approximately(0.265, 1e-3);
		res.uv[1].should.be.approximately(0.5, 1e-3);

	});

});

describe("verb.core.KdTree",function(){

	var pts = [
		new verb.core.KdPoint( [0,1,1], "a" ),
		new verb.core.KdPoint( [0,2,1], "b" ),
		new verb.core.KdPoint( [2,2,1], "c" )
	];

	it('gives correct results when requesting a single node', function(){

		var tree = new verb.core.KdTree(pts, verb.core.Vec.distSquared );
		var res = tree.nearest( [0,2.1,1], 1 );

		res[0].item0.point.should.eql(pts[1].point);

	});

	it('gives correct results for multiple nodes', function(){

		var tree = new verb.core.KdTree(pts, verb.core.Vec.distSquared );
		var res1 = tree.nearest( [0,1.1,1], 2 );

		res1[1].item0.point.should.eql(pts[0].point);
		res1[0].item0.point.should.eql(pts[1].point);

	});

});

describe("verb.core.Intersect.lookupAdjacentSegment",function(){

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

	it('returns null when only nearest is argument itself', function(){

		var end = segs[0].min;

		var tree = verb.core.Intersect.kdTreeFromSegments( segs );
		var nearest = verb.core.Intersect.lookupAdjacentSegment( end, tree );

		should.equal( nearest, null );

	});

	it('is correct for a basic example', function(){

		var end = new verb.core.MeshIntersectionPoint([0,0], [0,0], [1,2,3], 0, 0 ); // same pos, but different object

		var tree = verb.core.Intersect.kdTreeFromSegments( segs );
		var nearest = verb.core.Intersect.lookupAdjacentSegment( end, tree );

		nearest.should.be.equal(segs[0].min)

	});

});

describe("verb.core.Intersect.makeMeshIntersectionPolylines ",function(){

	it('is correct for a basic example', function(){

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

		var pls = verb.core.Intersect.makeMeshIntersectionPolylines( segs );

		// discovers one continuous polyline
		pls.length.should.be.equal( 1 );
		pls[0].length.should.be.equal( 4 );
		pls[0][0].point.should.be.eql( [10,0,0] );
		pls[0][1].point.should.be.eql( [10,10,0] );
		pls[0][2].point.should.be.eql( [0,10,0] );
		pls[0][3].point.should.be.eql( [5,0,0] );

	});

});

describe("verb.core.Intersect.kdTreeFromSegments",function(){

	it('is correct for a basic example', function(){

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

		var tree = verb.core.Intersect.kdTreeFromSegments( segs );

		tree.should.not.be.null;

	});

});

describe("verb.core.Intersect.meshes",function(){

	it('is correct for two intersecting triangles', function(){

		var pts1 = [ [0,0,0], [2,0,0], [2, 2,0] ];
		var tris1 = [[ 0, 1, 2 ]];
		var uvs1 = [ [0,0], [2,0], [2, 2] ];
		var mesh1 = new verb.core.MeshData(tris1, pts1, null, uvs1);

		var pts2 = [ [1,1,-1], [1,1,5], [1,-5,-1] ];
		var tris2 = [[ 0, 1, 2 ]];
		var uvs2 = [ [0,0], [3,0], [3,3] ];
		var mesh2 = new verb.core.MeshData(tris2, pts2, null, uvs2);

		var pls = verb.core.Intersect.meshes( mesh1, mesh2 );

		pls.length.should.be.equal( 1 );
		pls[0].length.should.be.equal( 2 );

	});

	it('is correct for two non-intersecting triangles', function(){

		var pts1 = [ [10,10,10], [2,10,10], [2, 2,10] ];
		var tris1 = [[ 0, 1, 2 ]];
		var uvs1 = [ [0,0], [2,0], [2, 2] ];
		var mesh1 = new verb.core.MeshData(tris1, pts1, null, uvs1);

		var pts2 = [ [1,1,-1], [3,1,-1], [3,1,2] ];
		var tris2 = [[ 0, 1, 2 ]];
		var uvs2 = [ [0,0], [3,0], [3,3] ];
		var mesh2 = new verb.core.MeshData(tris2, pts2, null, uvs2);

		var res = verb.core.Intersect.meshes( mesh1, mesh2 );

		res.length.should.be.equal( 0 );

	});

	it('is correct for two intersecting four point surfaces', function(){

		var p1 = [0,0,0]
			, p2 = [1,0,0]
			, p3 = [1,1,0]
			, p4 = [0,1,0];

		var srf1 = verb.core.Make.fourPointSurface( p1, p2, p3, p4 );

		var p5 = [0.5,-0.5,-0.5]
			, p6 = [0.5,0.5,-0.5]
			, p7 = [0.5,0.5,0.5]
			, p8 = [0.5,-0.5,0.5];

		var srf2 = verb.core.Make.fourPointSurface( p5, p6, p7, p8 );

		var tess1 = verb.core.Tess.rationalSurfaceAdaptive( srf1 );
		var tess2 = verb.core.Tess.rationalSurfaceAdaptive( srf2 );

		var res = verb.core.Intersect.meshes( tess1, tess2 );

		res.length.should.be.equal( 1 );
	});

});

describe("verb.core.Mesh.triangleUVFromPoint",function(){

	it('is correct for a basic example', function(){

		var uvs = [ [0,0], [1,0], [1,1] ];
		var pts = [ [0,0,0], [1,0,0], [1,1,0] ];
		var tris = [[ 0, 1, 2 ]];
		var pt = [0.5, 0.25, 0];
		var mesh = new verb.core.MeshData(tris, pts, null, uvs);

		var uv = verb.core.Mesh.triangleUVFromPoint( mesh, 0, pt );

		uv[0].should.be.approximately( pt[0], verb.core.Constants.TOLERANCE );
		uv[1].should.be.approximately( pt[1], verb.core.Constants.TOLERANCE );

	});
});

describe("verb.core.Eval.volumePoint",function(){

	it('gives valid result for uniform 3x3x3 cube', function(){

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
			var result = verb.core.Eval.volumePoint( volume, u, v, w );

			result[0].should.be.approximately( u, verb.core.Constants.TOLERANCE );
			result[1].should.be.approximately( v, verb.core.Constants.TOLERANCE );
			result[2].should.be.approximately( w, verb.core.Constants.TOLERANCE );

		}

	});

});

describe("verb.NurbsCurve.lengthAtParam",function(){

	it('can get closest point to straight curve', function(){

		var degree = 3
			, knots = [0,0,0,0,0.5,1,1,1,1]
			, controlPoints = [ [0,0,0], [1,0,0], [2,0,0], [3,0,0], [4,0,0] ]
			, weights = [ 1, 1, 1, 1, 1 ]
			, pt = [1,0.2,0.1];

		var crv = verb.NurbsCurve.byControlPointsWeights( degree, knots, controlPoints, weights );
		var res = crv.lengthAtParam( 1 );

		res.should.be.approximately(4, 1e-3 )

	});

});

describe("verb.NurbsCurve.derivatives",function(){

	var degree = 3
		, knots = [0,0,0,0,0.5,1,1,1,1]
		, controlPoints = [ [0,0,0], [1,0,0], [2,0,0], [3,0,0], [4,0,0] ]
		, weights = [ 1, 1, 1, 1, 1 ]
		, pt = [1,0.2,0];

	var crv = verb.NurbsCurve.byControlPointsWeights( degree, knots, controlPoints, weights );

	it('returns the derivatives for a straight curve', function(){

		var p = crv.derivatives( 0.5 );

		vecShouldBe( [2,0,0], p[0], 1e-3 );
		vecShouldBe( [3,0,0], p[1], 1e-3 );

	});

	it('returns the derivatives for a straight curve async', function(done){

		crv.derivativesAsync( 0.5 ).then(function(p){

			vecShouldBe( [2,0,0], p[0], 1e-3 );
			vecShouldBe( [3,0,0], p[1], 1e-3 );

			done();
		});

	});
});

describe("verb.NurbsCurve.tangent",function(){

	var degree = 3
		, knots = [0,0,0,0,0.5,1,1,1,1]
		, controlPoints = [ [0,0,0], [1,0,0], [2,0,0], [3,0,0], [4,0,0] ]
		, weights = [ 1, 1, 1, 1, 1 ]
		, pt = [1,0.2,0];

	var crv = verb.NurbsCurve.byControlPointsWeights( degree, knots, controlPoints, weights );

	it('can get the tangent for a straight curve', function(){

		var p = crv.tangent( 0.5 );

		vecShouldBe( [3,0,0], p, 1e-3 );

	});

	it('can get the tangent for a straight curve async', function(done){

		crv.tangentAsync( 0.5 ).then(function(p){

			vecShouldBe( [3,0,0], p, 1e-3 );

			done();
		});

	});

});

describe("verb.NurbsCurve.paramAtLength",function(){

	var degree = 3
		, knots = [0,0,0,0,0.5,1,1,1,1]
		, controlPoints = [ [0,0,0], [1,0,0], [2,0,0], [3,0,0], [4,0,0] ]
		, weights = [ 1, 1, 1, 1, 1 ]
		, pt = [1,0.2,0];

	var crv = verb.NurbsCurve.byControlPointsWeights( degree, knots, controlPoints, weights );

	it('can get closest point to straight curve', function(){

		var res = crv.paramAtLength( 2 );
		var p = crv.point( res );

		vecShouldBe( [2,0,0], p, 1e-3 );

	});

	it('can get closest point to straight curve async', function(done){

		crv.paramAtLengthAsync( 2 ).then(function(res){
			var p = crv.point( res );
			vecShouldBe( [2,0,0], p, 1e-3 );

			done();
		});

	});

});

describe("verb.NurbsCurve.divideByEqualArcLength",function(){

	var degree = 3
		, knots = [0,0,0,0,0.5,1,1,1,1]
		, controlPoints = [ [0,0,0], [1,0,0], [2,0,0], [3,0,0], [4,0,0] ]
		, weights = [ 1, 1, 1, 1, 1 ]
		, divs = 10
		, d = 4 / divs;

	var crv = verb.NurbsCurve.byControlPointsWeights( degree, knots, controlPoints, weights );

	it('can divide straight curve', function(){

		var res = crv.divideByEqualArcLength( divs );

		var tol = 1e-3;

		var s = 0;
		res.forEach(function(u){

			var pt = crv.point( u.u );
			u.len.should.be.approximately( s, tol );

			pt[0].should.be.approximately( s, tol );
			s += d;

		});

	});

	it('can divide straight curve async', function(done){

		crv.divideByEqualArcLengthAsync( divs ).then(function(res){

			var tol = 1e-3;

			var s = 0;
			res.forEach(function(u){

				var pt = crv.point( u.u );
				u.len.should.be.approximately( s, tol );

				pt[0].should.be.approximately( s, tol );
				s += d;

			});

			done();

		})

	});

});

describe("verb.NurbsCurve.divideByArcLength",function(){

	var degree = 3
		, knots = [0,0,0,0,0.5,1,1,1,1]
		, controlPoints = [ [0,0,0], [1,0,0], [2,0,0], [3,0,0], [4,0,0] ]
		, weights = [ 1, 1, 1, 1, 1 ]
		, divs = 10
		, d = 4 / divs;

	var crv = verb.NurbsCurve.byControlPointsWeights( degree, knots, controlPoints, weights );
	var tol = 1e-3;

	it('can divide straight curve', function(){

		var res = crv.divideByArcLength( d );

		var s = 0;
		res.forEach(function(u){

			var pt = crv.point( u.u );
			u.len.should.be.approximately( s, tol );

			pt[0].should.be.approximately( s, tol );
			s += d;

		});

	});

	it('can divide straight curve async', function(){

		crv.divideByArcLengthAsync( d ).then(function(res){

			var s = 0;
			res.forEach(function(u){

				var pt = crv.point( u.u );
				u.len.should.be.approximately( s, tol );

				pt[0].should.be.approximately( s, tol );
				s += d;

			});

		})

	});

});

describe("verb.NurbsCurve.closestParam",function(){

	var degree = 3
		, knots = [0,0,0,0,0.5,1,1,1,1]
		, controlPoints = [ [0,0,0], [1,0,0], [2,0,0], [3,0,0], [4,0,0] ]
		, weights = [ 1, 1, 1, 1, 1 ];

	var crv = verb.NurbsCurve.byControlPointsWeights( degree, knots, controlPoints, weights );

	it('can get point on straight curve', function(){

		var pt = [1,0,0];
		var res = crv.closestParam( pt );
		var p = crv.point( res );

		vecShouldBe( [1,0,0], p, 1e-3 );

	});

	it('can get closest point to straight curve', function(){

		var pt = [1,1,0];
		var res = crv.closestParam(pt);
		var p = crv.point( res );

		vecShouldBe( [1,0,0], p, 1e-3 );

	});

	it('can get closest point to straight curve async', function(done){

		var pt = [1,1,0];
		crv.closestParamAsync(pt).then(function(res){
			var p = crv.point( res );

			vecShouldBe( [1,0,0], p, 1e-3 );
			done();
		});

	});

});

describe("verb.NurbsCurve.split",function(){

	var degree = 3
		, knots = [ 0, 0, 0, 0, 1, 2, 3, 4, 5, 5, 5, 5 ];

	var controlPoints = [];
	var weights = [];
	for (var i = 0; i < 8; i++) {
		weights.push(1);
		controlPoints.push([i, 0, 0]);
	}

	var crv = verb.NurbsCurve.byControlPointsWeights( degree, knots, controlPoints, weights );

	function cubicSplitAsync(u, done){

		var res = crv.splitAsync(0.5);
		check(u, res);

	}

	function check(u, res){

		var crv0 = res[0];
		var crv1 = res[1];

		// a point evaluated on each curve is the same
		var p0 = crv0.point(crv0.domain().max);
		var p1 = crv1.point(crv1.domain().min);

		p0[0].should.be.approximately(p1[0], verb.core.Constants.TOLERANCE);
		p0[1].should.be.approximately(p1[1], verb.core.Constants.TOLERANCE);
		p0[2].should.be.approximately(p1[2], verb.core.Constants.TOLERANCE);

	}

	it('returns expected results when splitting curve', function(){

		var res = crv.split( 2.5 );
		check(2.5, res);

	});

	it('returns expected results when splitting curve async', function(done){

		crv.splitAsync( 2.5 ).then(function(res){

			check(2.5, res);
			done();

		});

	});

});

describe("verb.Arc.constructor",function(){

	it('has correct properties', function(){

		var arc = verb.Arc.byCenterAxesRadiusSpan([0,0,0], [1,0,0], [0,1,0], 5, 0, Math.PI/ 2 );

		should.exist( arc );

		arc.radius().should.be.equal(5);
		arc.center().should.eql([0,0,0]);
		arc.xaxis().should.eql([1,0,0]);
		arc.yaxis().should.eql([0,1,0]);
		arc.minAngle().should.be.equal(0);
		arc.maxAngle().should.be.equal(Math.PI/2);

	});

});

describe("verb.Arc.point",function(){

	it('returns expected results', function(){

		var arc = verb.Arc.byCenterAxesRadiusSpan([0,0,1], [1,0,0], [0,1,0], 1, 0, Math.PI/ 2 );
		var p1 = arc.point(0);
		var p2 = arc.point(0.5);
		var p3 = arc.point(1);

		p1.should.be.instanceof(Array).and.have.lengthOf(3);
		p1[0].should.be.approximately( 1, 0.001 );
		p1[1].should.be.approximately( 0, 0.001 );
		p1[2].should.be.approximately( 1, 0.001 );

		p2.should.be.instanceof(Array).and.have.lengthOf(3);
		p2[0].should.be.approximately( Math.sqrt(2)/2, 0.001 );
		p2[1].should.be.approximately( Math.sqrt(2)/2, 0.001 );
		p2[2].should.be.approximately( 1, 0.001 );

		p3.should.be.instanceof(Array).and.have.lengthOf(3);
		p3[0].should.be.approximately( 0, 0.001 );
		p3[1].should.be.approximately( 1, 0.001 );
		p3[2].should.be.approximately( 1, 0.001 );
	});

	it('creates the expected result when given a callback', function(done){

		var arc = verb.Arc.byCenterAxesRadiusSpan([0,0,1], [1,0,0], [0,1,0], 1, 0, Math.PI/ 2 );

		arc.pointAsync(0.5).then(function(res){

			res.should.be.instanceof(Array).and.have.lengthOf(3);
			res[0].should.be.approximately( Math.sqrt(2)/2, 0.001 );
			res[1].should.be.approximately( Math.sqrt(2)/2, 0.001 );
			res[2].should.be.approximately( 1, 0.001 );

			done();
		});

	});

});

describe("verb.Arc.tessellate",function(){

	it('should return a list of vertices', function(){

		var arc = verb.Arc.byCenterAxesRadiusSpan([0,0,1], [1,0,0], [0,1,0], 1, 0, Math.PI/ 2 );
		var pts = arc.tessellate();

		pts.length.should.be.greaterThan(2);

		pts.map( function(e){  e.length.should.be.equal(3); });

	});

});

describe("verb.Line.byEnds",function(){

	it('can create an instance', function(){

		var p1 = [0,0,1]
			, p2 = [1,0,0];

		var c = verb.Line.byEnds( p1, p2 );

		should.exist(c);

	});

});

describe("verb.Line.point",function(){

	it('evaluates correctly', function(){

		var p1 = [0,0,0]
			, p2 = [1,1,1];

		var c = verb.Line.byEnds( p1, p2 );

		should.exist(c);

		var p = c.point(0.5);

		p[0].should.be.approximately(0.5, verb.core.Constants.EPSILON );
		p[1].should.be.approximately(0.5, verb.core.Constants.EPSILON );
		p[2].should.be.approximately(0.5, verb.core.Constants.EPSILON );

	});

});

describe("verb.Line.derivatives",function(){

	it('gives nice result', function(){

		var p1 = [0,0,0]
			, p2 = [1,1,1];

		var c = verb.Line.byEnds( p1, p2 );

		should.exist(c);

		var p = c.derivatives(0.5, 1);

		p[0].should.eql([0.5,0.5,0.5]);
		p[1].should.eql([1,1,1]);

	});

});

describe("verb.Line.tessellate",function(){

	it('gives mesh result', function(){

		var p1 = [0,0,0]
			, p2 = [1,1,1];

		var c = verb.Line.byEnds( p1, p2 );

		should.exist(c);

		var p = c.tessellate();

		p.length.should.be.equal(2);
		p[0].length.should.be.equal(3);
		p[1].length.should.be.equal(3);

	});

});

describe("verb.BezierCurve.constructor",function(){

	it('can create an instance', function(){

		var p1 = [0,0,0]
			, p2 = [1,0,1]
			, p3 = [2,0,-1]
			, p4 = [3,0,0];

		var c = verb.BezierCurve.byControlPoints( [p1, p2, p3, p4] );

		should.exist(c);

	});

});

describe("verb.BezierCurve.point",function(){

	it('evaluates correctly', function(){

		var p1 = [0,0,0]
			, p2 = [1,0,1]
			, p3 = [2,0,-1]
			, p4 = [3,0,0];

		var c = verb.BezierCurve.byControlPoints( [p1, p2, p3, p4] );

		should.exist(c);

		var p = c.point(0.5);

		p.should.eql([1.5,0,0]);

	});

});

describe("verb.BezierCurve.derivatives",function(){

	it('gives nice result', function(){


		var p1 = [0,0,0]
			, p2 = [1,0,1]
			, p3 = [2,0,-1]
			, p4 = [3,0,0];

		var c = verb.BezierCurve.byControlPoints( [p1, p2, p3, p4] );

		should.exist(c);

		var p = c.derivatives(0.5, 1);

		p[0].should.eql([1.5,0,0]);
		p[1].should.eql([3, 0, -1.5]);

	});

});

describe("verb.BezierCurve.tessellate",function(){

	it('gives mesh result', function(){

		var p1 = [0,0,0]
			, p2 = [1,0,1]
			, p3 = [2,0,-1]
			, p4 = [3,0,0];

		var c = verb.BezierCurve.byControlPoints( [p1, p2, p3, p4] );

		should.exist(c);

		var pts = c.tessellate();

		pts.length.should.be.greaterThan(2);

		pts.map( function(e){  e.length.should.be.equal(3); });

	});

});

describe("verb.Circle.constructor",function(){

	it('can create an instance', function(){

		var c = verb.Circle.byCenterAxesRadius([0,0,0], [1,0,0], [0,1,0], 5);

		should.exist(c);

	});

});

describe("verb.Circle.point",function(){

	it('evaluates correctly', function(){

		var c = verb.Circle.byCenterAxesRadius([0,0,0], [1,0,0], [0,1,0], 5);

		should.exist(c);

		var p = c.point(0.5);

		p[0].should.be.approximately(-5, verb.core.Constants.TOLERANCE );
		p[1].should.be.approximately(0, verb.core.Constants.TOLERANCE );
		p[2].should.be.approximately(0, verb.core.Constants.TOLERANCE );

	});

});

describe("verb.Circle.derivatives",function(){

	it('gives correct result', function(){

		var c = verb.Circle.byCenterAxesRadius([0,0,0], [1,0,0], [0,1,0], 5);

		should.exist(c);

		var p = c.derivatives(0.5, 1);

		p[0][0].should.be.approximately(-5, verb.core.Constants.TOLERANCE );
		p[0][1].should.be.approximately(0, verb.core.Constants.TOLERANCE );
		p[0][2].should.be.approximately(0, verb.core.Constants.TOLERANCE );

		// normalize the derivative
		p[1] = verb.core.Vec.div( p[1], verb.core.Vec.norm(p[1]) );

		p[1][0].should.be.approximately(0, verb.core.Constants.TOLERANCE );
		p[1][1].should.be.approximately(-1, verb.core.Constants.TOLERANCE );
		p[1][2].should.be.approximately(0, verb.core.Constants.TOLERANCE );

	});

});

describe("verb.Circle.tessellate",function(){

	it('gives correct result', function(){

		var c = verb.Circle.byCenterAxesRadius([0,0,0], [1,0,0], [0,1,0], 5);

		should.exist(c);

		var pts = c.tessellate();

		pts.length.should.be.greaterThan(2);
		pts.map( function(e){  e.length.should.be.equal(3); });

	});

});

describe("verb.Ellipse.constructor",function(){

	it('can create an instance', function(){

		var c = verb.Ellipse.byCenterAxes([0,0,0], [5,0,0], [0,10,0]);

		should.exist(c);

	});

});

describe("verb.Ellipse.point",function(){

	it('evaluates correctly', function(){

		var c = verb.Ellipse.byCenterAxes([0,0,0], [5,0,0], [0,10,0]);

		should.exist(c);

		var p = c.point(0.5);

		p[0].should.be.approximately(-5, verb.core.Constants.TOLERANCE );
		p[1].should.be.approximately(0, verb.core.Constants.TOLERANCE );
		p[2].should.be.approximately(0, verb.core.Constants.TOLERANCE );

		var p = c.point(0.25);

		p[0].should.be.approximately(0, verb.core.Constants.TOLERANCE );
		p[1].should.be.approximately(10, verb.core.Constants.TOLERANCE );
		p[2].should.be.approximately(0, verb.core.Constants.TOLERANCE );

	});

});

describe("verb.Ellipse.derivatives",function(){

	it('gives correct result', function(){

		var c = verb.Ellipse.byCenterAxes([0,0,0], [5,0,0], [0,10,0]);

		should.exist(c);

		var p = c.derivatives(0.5, 1);

		p[0][0].should.be.approximately(-5, verb.core.Constants.TOLERANCE );
		p[0][1].should.be.approximately(0, verb.core.Constants.TOLERANCE );
		p[0][2].should.be.approximately(0, verb.core.Constants.TOLERANCE );

		// normalize the derivative
		p[1] = verb.core.Vec.div( p[1], verb.core.Vec.norm(p[1]) );

		p[1][0].should.be.approximately(0, verb.core.Constants.TOLERANCE );
		p[1][1].should.be.approximately(-1, verb.core.Constants.TOLERANCE );
		p[1][2].should.be.approximately(0, verb.core.Constants.TOLERANCE );

		p = c.derivatives(0.25, 1);

		p[0][0].should.be.approximately(0, verb.core.Constants.TOLERANCE );
		p[0][1].should.be.approximately(10, verb.core.Constants.TOLERANCE );
		p[0][2].should.be.approximately(0, verb.core.Constants.TOLERANCE );

		// normalize the derivative
		p[1] = verb.core.Vec.div( p[1], verb.core.Vec.norm(p[1]) );

		p[1][0].should.be.approximately(-1, verb.core.Constants.TOLERANCE );
		p[1][1].should.be.approximately(0, verb.core.Constants.TOLERANCE );
		p[1][2].should.be.approximately(0, verb.core.Constants.TOLERANCE );

	});

});

describe("verb.Ellipse.tessellate",function(){

	it('gives correct result', function(){

		var c = verb.Ellipse.byCenterAxes([0,0,0], [5,0,0], [0,10,0]);

		should.exist(c);

		var pts = c.tessellate();

		pts.length.should.be.greaterThan(2);
		pts.map( function(e){  e.length.should.be.equal(3); });

	});

});

describe("verb.EllipseArc.constructor",function(){

	it('can create an instance', function(){

		var c = verb.EllipseArc.byCenterAxesSpan([0,0,0], [1,0,0], [0,1,0], 0, Math.PI);

		should.exist(c);

	});

});

describe("verb.EllipseArc.point",function(){

	it('evaluates correctly', function(){

		var c = verb.EllipseArc.byCenterAxesSpan([0,0,0], [1,0,0], [0,10,0], 0, Math.PI);

		should.exist(c);

		var p = c.point(0.5);

		p[0].should.be.approximately(0, verb.core.Constants.TOLERANCE );
		p[1].should.be.approximately(10, verb.core.Constants.TOLERANCE );
		p[2].should.be.approximately(0, verb.core.Constants.TOLERANCE );

	});

});

describe("verb.EllipseArc.derivatives",function(){

	it('gives correct result', function(){

		var c = verb.EllipseArc.byCenterAxesSpan([0,0,0], [1,0,0], [0,10,0], 0, Math.PI);

		should.exist(c);

		var p = c.derivatives(0.5, 1);

		p[0][0].should.be.approximately(0, verb.core.Constants.TOLERANCE );
		p[0][1].should.be.approximately(10, verb.core.Constants.TOLERANCE );
		p[0][2].should.be.approximately(0, verb.core.Constants.TOLERANCE );

		// normalize the derivative
		p[1] = verb.core.Vec.div( p[1], verb.core.Vec.norm(p[1]) );

		p[1][0].should.be.approximately(-1, verb.core.Constants.TOLERANCE );
		p[1][1].should.be.approximately(0, verb.core.Constants.TOLERANCE );
		p[1][2].should.be.approximately(0, verb.core.Constants.TOLERANCE );

	});

});

describe("verb.EllipseArc.tessellate",function(){

	it('gives correct result', function(){

		var c = verb.EllipseArc.byCenterAxesSpan([0,0,0], [1,0,0], [0,10,0], 0, Math.PI);

		should.exist(c);

		var pts = c.tessellate();

		pts.length.should.be.greaterThan(2);
		pts.map( function(e){  e.length.should.be.equal(3); });

	});

});

/*

describe("FourPointSurface.constructor",function(){

	it('can create an instance', function(){

		var p1 = [0,0,1]
			, p2 = [1,0,0]
			, p3 = [1,1,1]
			, p4 = [0,1,0];

		var srf = new verb.FourPointSurface( p1, p2, p3, p4 );

		should.exist(srf);

	});

});

describe("FourPointSurface.point",function(){

	it('evaluates correctly for hypar', function(){

		var p1 = [0,0,1]
			, p2 = [1,0,0]
			, p3 = [1,1,1]
			, p4 = [0,1,0];

		var srf = new verb.FourPointSurface( p1, p2, p3, p4 );

		should.exist(srf);

		var p = srf.point(0.5,0.5);

		p[0].should.be.approximately(0.5, verb.core.Constants.EPSILON );
		p[1].should.be.approximately(0.5, verb.core.Constants.EPSILON );
		p[2].should.be.approximately(0.5, verb.core.Constants.EPSILON );

	});

});

describe("FourPointSurface.derivatives",function(){

	it('gives nice result', function(){

		var p1 = [0,0,1]
			, p2 = [1,0,0]
			, p3 = [1,1,1]
			, p4 = [0,1,0];

		var srf = new verb.FourPointSurface( p1, p2, p3, p4 );

		should.exist(srf);

		var p = srf.derivatives(0.5, 0.5, 1);

		p[0][0].should.eql([0.5,0.5,0.5]);
		p[0][1].should.eql([0,1,0]);
		p[1][0].should.eql([1,0,0]);

	});

});

describe("FourPointSurface.tessellate",function(){

	it('gives mesh result', function(){

		var p1 = [0,0,1]
			, p2 = [1,0,0]
			, p3 = [1,1,1]
			, p4 = [0,1,0];

		var srf = new verb.FourPointSurface( p1, p2, p3, p4 );

		should.exist(srf);

		var p = srf.tessellate();

		p.uvs.length.should.be.greaterThan(10);
		p.points.length.should.be.greaterThan(10);
		p.faces.length.should.be.greaterThan(10);
		p.normals.length.should.be.greaterThan(10);

		p.points.map(function(e){ e.length.should.be.equal(3); });
		p.uvs.map(function(e){ e.length.should.be.equal(2); });
		p.faces.map(function(e){ e.length.should.be.equal(3); });
		p.normals.map(function(e){ e.length.should.be.equal(3); });


	});

});

describe("PolyLine.constructor",function(){

	it('can create an instance', function(){

		var c = new verb.PolyLine( [ [0,0,0], [1,0,0], [0,1,0] ] );

		should.exist(c);

	});

});

describe("PolyLine.point",function(){

	it('evaluates correctly', function(){

		var c = new verb.PolyLine( [ [0,0,0], [1,0,0], [0,1,0] ] );

		should.exist(c);

		var p = c.point(0.5);

		p.should.eql( [1,0,0] );

	});

});

describe("PolyLine.derivatives",function(){

	it('gives correct result', function(){

		var c = new verb.PolyLine( [ [0,0,0], [1,0,0], [0,1,0] ] );

		should.exist(c);

		var p = c.derivatives(0.5, 1);

		p[0].should.eql( [1,0,0] );

		// normalize the derivative
		p[1] = verb.core.Vec.div( p[1], verb.core.Vec.norm(p[1]) );

		p[1][0].should.be.approximately(-Math.sqrt(2) / 2, verb.core.Constants.TOLERANCE );
		p[1][1].should.be.approximately(Math.sqrt(2) / 2, verb.core.Constants.TOLERANCE );
		p[1][2].should.be.approximately(0, verb.core.Constants.TOLERANCE );

	});

});

describe("PolyLine.tessellate",function(){

	it('gives correct result', function(){

		var c = new verb.PolyLine( [ [0,0,0], [1,0,0], [0,1,0] ] );

		should.exist(c);

		var pts = c.tessellate();

		pts.length.should.be.equal(3);
		pts.map( function(e){  e.length.should.be.equal(3); });

	});

});


describe("PolyLine.constructor",function(){

	it('can create an instance', function(){

		var c = new verb.PolyLine( [ [0,0,0], [1,0,0], [0,1,0] ] );

		should.exist(c);

	});

});

describe("PolyLine.point",function(){

	it('evaluates correctly', function(){

		var c = new verb.PolyLine( [ [0,0,0], [1,0,0], [0,1,0] ] );

		should.exist(c);

		var p = c.point(0.5);

		p.should.eql( [1,0,0] );

	});

});

describe("PolyLine.derivatives",function(){

	it('gives correct result', function(){

		var c = new verb.PolyLine( [ [0,0,0], [1,0,0], [0,1,0] ] );

		should.exist(c);

		var p = c.derivatives(0.5, 1);

		p[0].should.eql( [1,0,0] );

		// normalize the derivative
		p[1] = verb.core.Vec.div( p[1], verb.core.Vec.norm(p[1]) );

		p[1][0].should.be.approximately(-Math.sqrt(2) / 2, verb.core.Constants.TOLERANCE );
		p[1][1].should.be.approximately(Math.sqrt(2) / 2, verb.core.Constants.TOLERANCE );
		p[1][2].should.be.approximately(0, verb.core.Constants.TOLERANCE );

	});

});

describe("PolyLine.tessellate",function(){

	it('gives correct result', function(){

		var c = new verb.PolyLine( [ [0,0,0], [1,0,0], [0,1,0] ] );

		should.exist(c);

		var pts = c.tessellate();

		pts.length.should.be.equal(3);
		pts.map( function(e){  e.length.should.be.equal(3); });

	});

});

describe("Cone.constructor",function(){

	it('can create an instance', function(){

		var axis = [0,0,1]
			, xaxis = [1,0,0]
			, base = [0,0,0]
			, height = 5
			, radius = 3;

		var srf = new verb.Cone( axis, xaxis, base, height, radius );

		should.exist(srf);

	});

});

describe("Cone.point",function(){

	it('evaluates correctly for middle of surface', function(){

		var axis = [0,0,1]
			, xaxis = [1,0,0]
			, base = [0,0,0]
			, height = 5
			, radius = 3;

		var srf = new verb.Cone( axis, xaxis, base, height, radius );

		should.exist(srf);

		var p = srf.point(0.5,0.5);

		p[0].should.be.approximately(-1.5, verb.core.Constants.EPSILON );
		p[1].should.be.approximately(0, verb.core.Constants.EPSILON );
		p[2].should.be.approximately(2.5, verb.core.Constants.EPSILON );

	});

});

describe("Cone.derivatives",function(){

	it('gives expected result for middle of surface', function(){

		var axis = [0,0,1]
			, xaxis = [1,0,0]
			, base = [0,0,0]
			, height = 5
			, radius = 3;

		var srf = new verb.Cone( axis, xaxis, base, height, radius );

		should.exist(srf);

		var p = srf.derivatives(0.5, 0.5, 1);

		p[0][0][0].should.be.approximately(-1.5, verb.core.Constants.EPSILON );
		p[0][0][1].should.be.approximately(0, verb.core.Constants.EPSILON );
		p[0][0][2].should.be.approximately(2.5, verb.core.Constants.EPSILON );

		p[0][1][0].should.be.approximately(-3, verb.core.Constants.EPSILON );
		p[0][1][1].should.be.approximately(0, verb.core.Constants.EPSILON );
		p[0][1][2].should.be.approximately(-5, verb.core.Constants.EPSILON );

		p[1][0] = verb.core.Vec.div( p[1][0], verb.core.Vec.norm(p[1][0]) );

		p[1][0][0].should.be.approximately(0, verb.core.Constants.EPSILON );
		p[1][0][1].should.be.approximately(-1, verb.core.Constants.EPSILON );
		p[1][0][2].should.be.approximately(0, verb.core.Constants.EPSILON );

	});

});


describe("Cone.tessellate",function(){

	it('gives mesh result', function(){

		var axis = [0,0,1]
			, xaxis = [1,0,0]
			, base = [0,0,0]
			, height = 5
			, radius = 3;

		var srf = new verb.Cone( axis, xaxis, base, height, radius );

		should.exist(srf);

		var p = srf.tessellate();

		p.uvs.length.should.be.greaterThan(10);
		p.points.length.should.be.greaterThan(10);
		p.faces.length.should.be.greaterThan(10);
		p.normals.length.should.be.greaterThan(10);

		p.points.map(function(e){ e.length.should.be.equal(3); });
		p.uvs.map(function(e){ e.length.should.be.equal(2); });
		p.faces.map(function(e){ e.length.should.be.equal(3); });
		p.normals.map(function(e){ e.length.should.be.equal(3); });


	});

});

describe("Cylinder.constructor",function(){

	it('can create an instance', function(){

		var axis = [0,0,1]
			, xaxis = [1,0,0]
			, base = [0,0,0]
			, height = 5
			, radius = 3;

		var srf = new verb.Cylinder( axis, xaxis, base, height, radius );

		should.exist(srf);

	});

});

describe("Cylinder.point",function(){

	it('evaluates correctly for middle of surface', function(){

		var axis = [0,0,1]
			, xaxis = [1,0,0]
			, base = [0,0,0]
			, height = 5
			, radius = 3;

		var srf = new verb.Cylinder( axis, xaxis, base, height, radius );

		should.exist(srf);

		var p = srf.point(0.5,0.5);

		p[0].should.be.approximately(-3, verb.core.Constants.EPSILON );
		p[1].should.be.approximately(0, verb.core.Constants.EPSILON );
		p[2].should.be.approximately(2.5, verb.core.Constants.EPSILON );

	});

});

describe("Cylinder.derivatives",function(){

	it('gives expected result for middle of surface', function(){

		var axis = [0,0,1]
			, xaxis = [1,0,0]
			, base = [0,0,0]
			, height = 5
			, radius = 3;

		var srf = new verb.Cylinder( axis, xaxis, base, height, radius );

		should.exist(srf);

		var p = srf.derivatives(0.5, 0.5, 1);

		p[0][0][0].should.be.approximately(-3, verb.core.Constants.EPSILON );
		p[0][0][1].should.be.approximately(0, verb.core.Constants.EPSILON );
		p[0][0][2].should.be.approximately(2.5, verb.core.Constants.EPSILON );

		p[1][0][0].should.be.approximately(0, verb.core.Constants.EPSILON );
		p[1][0][1].should.be.approximately(0, verb.core.Constants.EPSILON );
		p[1][0][2].should.be.approximately(-5, verb.core.Constants.EPSILON );

		p[0][1] = verb.core.Vec.div( p[0][1], verb.core.Vec.norm(p[0][1]) );

		p[0][1][0].should.be.approximately(0, verb.core.Constants.EPSILON );
		p[0][1][1].should.be.approximately(-1, verb.core.Constants.EPSILON );
		p[0][1][2].should.be.approximately(0, verb.core.Constants.EPSILON );

	});

});


describe("Cylinder.tessellate",function(){

	it('gives mesh result', function(){

		var axis = [0,0,1]
			, xaxis = [1,0,0]
			, base = [0,0,0]
			, height = 5
			, radius = 3;

		var srf = new verb.Cylinder( axis, xaxis, base, height, radius );

		should.exist(srf);

		var p = srf.tessellate();

		p.uvs.length.should.be.greaterThan(10);
		p.points.length.should.be.greaterThan(10);
		p.faces.length.should.be.greaterThan(10);
		p.normals.length.should.be.greaterThan(10);

		p.points.map(function(e){ e.length.should.be.equal(3); });
		p.uvs.map(function(e){ e.length.should.be.equal(2); });
		p.faces.map(function(e){ e.length.should.be.equal(3); });
		p.normals.map(function(e){ e.length.should.be.equal(3); });


	});

});

describe("Extrusion.constructor",function(){

	it('can create an instance', function(){

		var profile = verb.Line.byEnds( [0,0,0], [1,1,1] )
			, axis = [0,0,1]
			, length = 3;

		var srf = new verb.Extrusion( profile, axis, length);

		should.exist(srf);

	});

});

describe("Extrusion.point",function(){

	it('evaluates correctly for middle of surface', function(){

		var profile = verb.Line.byEnds( [0,0,0], [1,1,0] )
			, axis = [0,0,1]
			, length = 3;

		var srf = new verb.Extrusion( profile, axis, length);

		should.exist(srf);

		var p = srf.point(0.5,0.5);

		p[0].should.be.approximately(0.5, verb.core.Constants.EPSILON );
		p[1].should.be.approximately(0.5, verb.core.Constants.EPSILON );
		p[2].should.be.approximately(1.5, verb.core.Constants.EPSILON );

	});

});

describe("Extrusion.derivatives",function(){

	it('gives expected result for middle of surface', function(){

		var profile = verb.Line.byEnds( [0,0,0], [1,1,0] )
			, axis = [0,0,1]
			, length = 3;

		var srf = new verb.Extrusion( profile, axis, length);

		should.exist(srf);

		var p = srf.derivatives(0.5, 0.5, 1);

		p[0][0][0].should.be.approximately(0.5, verb.core.Constants.EPSILON );
		p[0][0][1].should.be.approximately(0.5, verb.core.Constants.EPSILON );
		p[0][0][2].should.be.approximately(1.5, verb.core.Constants.EPSILON );

		p[0][1][0].should.be.approximately(1, verb.core.Constants.EPSILON );
		p[0][1][1].should.be.approximately(1, verb.core.Constants.EPSILON );
		p[0][1][2].should.be.approximately(0, verb.core.Constants.EPSILON );

		p[1][0][0].should.be.approximately(0, verb.core.Constants.EPSILON );
		p[1][0][1].should.be.approximately(0, verb.core.Constants.EPSILON );
		p[1][0][2].should.be.approximately(-3, verb.core.Constants.EPSILON );

	});

});


describe("Extrusion.tessellate",function(){

	it('gives mesh result', function(){

		var profile = verb.Line.byEnds( [0,0,0], [1,1,0] )
			, axis = [0,0,1]
			, length = 3;

		var srf = new verb.Extrusion( profile, axis, length);

		should.exist(srf);

		var p = srf.tessellate();

		p.uvs.length.should.be.greaterThan(10);
		p.points.length.should.be.greaterThan(10);
		p.faces.length.should.be.greaterThan(10);
		p.normals.length.should.be.greaterThan(10);

		p.points.map(function(e){ e.length.should.be.equal(3); });
		p.uvs.map(function(e){ e.length.should.be.equal(2); });
		p.faces.map(function(e){ e.length.should.be.equal(3); });
		p.normals.map(function(e){ e.length.should.be.equal(3); });


	});

});

describe("PlanarSurface.constructor",function(){

	it('can create an instance', function(){

		var base = [0,0,0]
			, uaxis = [1,0,0]
			, vaxis = [0,1,0]
			, ulength = 10
			, vlength = 4;

		var srf = new verb.PlanarSurface( base, uaxis, vaxis, ulength, vlength );

		should.exist(srf);

	});

});

describe("PlanarSurface.point",function(){

	it('evaluates correctly for middle of surface', function(){

		var base = [0,0,0]
			, uaxis = [1,0,0]
			, vaxis = [0,1,0]
			, ulength = 10
			, vlength = 4;

		var srf = new verb.PlanarSurface( base, uaxis, vaxis, ulength, vlength );

		should.exist(srf);

		var p = srf.point(0.5,0.5);

		p[0].should.be.approximately(5, verb.core.Constants.EPSILON );
		p[1].should.be.approximately(2, verb.core.Constants.EPSILON );
		p[2].should.be.approximately(0, verb.core.Constants.EPSILON );

	});

});

describe("PlanarSurface.derivatives",function(){

	it('gives expected result for middle of surface', function(){

		var base = [0,0,0]
			, uaxis = [1,0,0]
			, vaxis = [0,1,0]
			, ulength = 10
			, vlength = 4;

		var srf = new verb.PlanarSurface( base, uaxis, vaxis, ulength, vlength );

		should.exist(srf);

		var p = srf.derivatives(0.5, 0.5, 1);

		p[0][0][0].should.be.approximately(5, verb.core.Constants.EPSILON );
		p[0][0][1].should.be.approximately(2, verb.core.Constants.EPSILON );
		p[0][0][2].should.be.approximately(0, verb.core.Constants.EPSILON );

		p[0][1][0].should.be.approximately(0, verb.core.Constants.EPSILON );
		p[0][1][1].should.be.approximately(4, verb.core.Constants.EPSILON );
		p[0][1][2].should.be.approximately(0, verb.core.Constants.EPSILON );

		p[1][0][0].should.be.approximately(10, verb.core.Constants.EPSILON );
		p[1][0][1].should.be.approximately(0, verb.core.Constants.EPSILON );
		p[1][0][2].should.be.approximately(0, verb.core.Constants.EPSILON );

	});

});

describe("PlanarSurface.tessellate",function(){

	it('gives mesh result', function(){

		var base = [0,0,0]
			, uaxis = [1,0,0]
			, vaxis = [0,1,0]
			, ulength = 10
			, vlength = 4;

		var srf = new verb.PlanarSurface( base, uaxis, vaxis, ulength, vlength );

		should.exist(srf);

		var p = srf.tessellate();

		p.uvs.length.should.be.greaterThan(10);
		p.points.length.should.be.greaterThan(10);
		p.faces.length.should.be.greaterThan(10);
		p.normals.length.should.be.greaterThan(10);

		p.points.map(function(e){ e.length.should.be.equal(3); });
		p.uvs.map(function(e){ e.length.should.be.equal(2); });
		p.faces.map(function(e){ e.length.should.be.equal(3); });
		p.normals.map(function(e){ e.length.should.be.equal(3); });


	});

});

describe("RevolvedSurface.constructor",function(){

	it('can create an instance', function(){

		var base = [0,0,0]
			, axis = [0,0,1]
			, angle = Math.PI
			, profile = verb.Line.byEnds( [1, 0, 10], [10, 0, 1] );

		var srf = new verb.RevolvedSurface( base, axis, angle, profile );

		should.exist(srf);

	});

});

describe("RevolvedSurface.point",function(){

	it('evaluates correctly for middle of surface', function(){

		var base = [0,0,0]
			, axis = [0,0,1]
			, angle = Math.PI
			, profile = verb.Line.byEnds( [1, 0, 10], [10, 0, 1] );

		var srf = new verb.RevolvedSurface( base, axis, angle, profile );

		should.exist(srf);

		var p = srf.point(0.5,0.5);

		p[0].should.be.approximately(0, verb.core.Constants.EPSILON );
		p[1].should.be.approximately(5.5, verb.core.Constants.EPSILON );
		p[2].should.be.approximately(5.5, verb.core.Constants.EPSILON );

	});

});

describe("RevolvedSurface.derivatives",function(){

	it('gives expected result for middle of surface', function(){

		var base = [0,0,0]
			, axis = [0,0,1]
			, angle = Math.PI
			, profile = verb.Line.byEnds( [1, 0, 10], [10, 0, 1] );

		var srf = new verb.RevolvedSurface( base, axis, angle, profile );

		should.exist(srf);

		var p = srf.derivatives(0.5, 0.5, 1);

		p[0][0][0].should.be.approximately(0, verb.core.Constants.EPSILON );
		p[0][0][1].should.be.approximately(5.5, verb.core.Constants.EPSILON );
		p[0][0][2].should.be.approximately(5.5, verb.core.Constants.EPSILON );


		p[0][1][0].should.be.approximately(0, verb.core.Constants.EPSILON );
		p[0][1][1].should.be.approximately(9, verb.core.Constants.EPSILON );
		p[0][1][2].should.be.approximately(-9, verb.core.Constants.EPSILON );

	  p[1][0] = verb.core.Vec.normalized( p[1][0] );

		p[1][0][0].should.be.approximately(-1, verb.core.Constants.EPSILON );
		p[1][0][1].should.be.approximately(0, verb.core.Constants.EPSILON );
		p[1][0][2].should.be.approximately(0, verb.core.Constants.EPSILON );

	});

});


describe("RevolvedSurface.tessellate",function(){

	it('gives mesh result', function(){

		var base = [0,0,0]
			, axis = [0,0,1]
			, angle = Math.PI
			, profile = verb.Line.byEnds( [1, 0, 10], [10, 0, 1] );

		var srf = new verb.RevolvedSurface( base, axis, angle, profile );

		should.exist(srf);

		var p = srf.tessellate();

		p.uvs.length.should.be.greaterThan(10);
		p.points.length.should.be.greaterThan(10);
		p.faces.length.should.be.greaterThan(10);
		p.normals.length.should.be.greaterThan(10);

		p.points.map(function(e){ e.length.should.be.equal(3); });
		p.uvs.map(function(e){ e.length.should.be.equal(2); });
		p.faces.map(function(e){ e.length.should.be.equal(3); });
		p.normals.map(function(e){ e.length.should.be.equal(3); });


	});



});


describe("Sphere.constructor",function(){

	it('can create an instance', function(){

		var center = [0,0,0]
			, radius = 5;

		var srf = new verb.Sphere( center, radius );

		should.exist(srf);

	});

});

describe("Sphere.point",function(){

	it('evaluates correctly for middle of surface', function(){

		var center = [0,0,0]
			, radius = 5;

		var srf = new verb.Sphere( center, radius );

		should.exist(srf);

		var p = srf.point(0.5,0.5);

		p[0].should.be.approximately(-radius, verb.core.Constants.EPSILON );
		p[1].should.be.approximately(0, verb.core.Constants.EPSILON );
		p[2].should.be.approximately(0, verb.core.Constants.EPSILON );

	});

});

describe("Sphere.derivatives",function(){

	it('gives expected result for middle of surface', function(){

		var center = [0,0,0]
			, radius = 5;

		var srf = new verb.Sphere( center, radius );

		should.exist(srf);

		var p = srf.derivatives(0.5, 0.5, 1);

		p[0][0][0].should.be.approximately(-radius, verb.core.Constants.EPSILON );
		p[0][0][1].should.be.approximately(0, verb.core.Constants.EPSILON );
		p[0][0][2].should.be.approximately(0, verb.core.Constants.EPSILON );

		p[0][1] = verb.core.Vec.normalized( p[0][1] );

		p[0][1][0].should.be.approximately(0, verb.core.Constants.EPSILON );
		p[0][1][1].should.be.approximately(0, verb.core.Constants.EPSILON );
		p[0][1][2].should.be.approximately(1, verb.core.Constants.EPSILON );

	  p[1][0] = verb.core.Vec.normalized( p[1][0] );

		p[1][0][0].should.be.approximately(0, verb.core.Constants.EPSILON );
		p[1][0][1].should.be.approximately(-1, verb.core.Constants.EPSILON );
		p[1][0][2].should.be.approximately(0, verb.core.Constants.EPSILON );

	});

});

describe("Sphere.tessellate",function(){

	it('gives mesh result', function(){

		var center = [0,0,0]
			, radius = 5;

		var srf = new verb.Sphere( center, radius );

		should.exist(srf);

		var p = srf.tessellate();

		p.uvs.length.should.be.greaterThan(10);
		p.points.length.should.be.greaterThan(10);
		p.faces.length.should.be.greaterThan(10);
		p.normals.length.should.be.greaterThan(10);

		p.points.map(function(e){ e.length.should.be.equal(3); });
		p.uvs.map(function(e){ e.length.should.be.equal(2); });
		p.faces.map(function(e){ e.length.should.be.equal(3); });
		p.normals.map(function(e){ e.length.should.be.equal(3); });


	});
});

describe("SweepOneRail.constructor",function(){

	it('can create an instance', function(){

		var p1 = [0,0,0]
			, p2 = [1,0,1]
			, p3 = [2,0,-1]
			, p4 = [3,0,0];

		var rail = verb.BezierCurve.byControlPoints( [p1, p2, p3, p4] )
			, profile = verb.Line.byEnds( [0,1,0], [0,-1,0]  );

		var srf = new verb.SweepOneRail( rail, profile );

		should.exist(srf);

	});

});

describe("SweepOneRail.point",function(){

	it('evaluates correctly for middle of surface', function(){

		var p1 = [0,0,0]
			, p2 = [1,0,1]
			, p3 = [2,0,-1]
			, p4 = [3,0,0];

		var rail = verb.BezierCurve.byControlPoints( [p1, p2, p3, p4] )
			, profile = verb.Line.byEnds( [0,1,0], [0,-1,0]  )

		var srf = new verb.SweepOneRail( rail, profile );

		should.exist(srf);

		var p = srf.point(0.5,0.5);

		should.exist(p);

		p[0].should.be.greaterThan( 0 );
		p[1].should.be.approximately(0, verb.core.Constants.EPSILON );
		p[2].should.be.greaterThan(0, verb.core.Constants.EPSILON );

	});

});

describe("SweepOneRail.derivatives",function(){

	it('gives expected result for middle of surface', function(){

		var p1 = [0,0,0]
			, p2 = [1,0,1]
			, p3 = [2,0,-1]
			, p4 = [3,0,0];

		var rail = verb.BezierCurve.byControlPoints( [p1, p2, p3, p4] )
			, profile = verb.Line.byEnds( [0,1,0], [0,-1,0]  )

		var srf = new verb.SweepOneRail( rail, profile );

		should.exist(srf);

		var p = srf.derivatives(0.5, 0.5, 1);

		p[0][0][0].should.be.greaterThan( 0 );
		p[0][0][1].should.be.approximately(0, verb.core.Constants.EPSILON );
		p[0][0][2].should.be.greaterThan(0, verb.core.Constants.EPSILON );

		p[0][1][0].should.be.approximately(0, verb.core.Constants.EPSILON );
		p[0][1][1].should.be.approximately(-2, verb.core.Constants.EPSILON );
		p[0][1][2].should.be.approximately(0, verb.core.Constants.EPSILON );

		p[0][0][0].should.be.greaterThan( 0 );
		p[0][0][1].should.be.approximately(0, verb.core.Constants.EPSILON );
		p[0][0][2].should.be.greaterThan( 0  );

	});

});


describe("SweepOneRail.tessellate",function(){

	it('gives mesh result', function(){

		var p1 = [0,0,0]
			, p2 = [1,0,1]
			, p3 = [2,0,-1]
			, p4 = [3,0,0];

		var rail = verb.BezierCurve.byControlPoints( [p1, p2, p3, p4] )
			, profile = verb.Line.byEnds( [0,1,0], [0,-1,0]  )

		var srf = new verb.SweepOneRail( rail, profile );

		should.exist(srf);

		var p = srf.tessellate();

		p.uvs.length.should.be.greaterThan(10);
		p.points.length.should.be.greaterThan(10);
		p.faces.length.should.be.greaterThan(10);
		p.normals.length.should.be.greaterThan(10);

		p.points.map(function(e){ e.length.should.be.equal(3); });
		p.uvs.map(function(e){ e.length.should.be.equal(2); });
		p.faces.map(function(e){ e.length.should.be.equal(3); });
		p.normals.map(function(e){ e.length.should.be.equal(3); });

	});


});

describe("verb.intersectCurves",function(){

	it('gives valid result for 2 planar degree 2 beziers', function(){

		// build a bezier curve
		var p1 = [0,0,0]
			, p2 = [1,0,1]
			, p3 = [2,0,1]
			, p4 = [3,0,0];

		var curve1 = verb.BezierCurve.byControlPoints( [p1, p2, p3, p4] );

		// build another
		var c1 = [-5,0,3]
			, c2 = [1,0,0]
			, c3 = [2,0,0]
			, c4 = [3,0,1];

		var curve2 = verb.BezierCurve.byControlPoints( [c1, c2, c3, c4] );

		// make sync work
		var res = verb.intersectCurves( curve1, curve2 );

		res.length.should.be.equal(2);
		res[0].length.should.be.equal(3);
		res[1].length.should.be.equal(3);

		res[0][0].should.be.approximately(0.23545561131691756, verb.core.Constants.TOLERANCE);
		res[0][1].should.be.approximately(0.4756848757799639, verb.core.Constants.TOLERANCE);

		res[1][0].should.be.approximately(0.7756197831105017, verb.core.Constants.TOLERANCE);
		res[1][1].should.be.approximately(0.7908648647054176, verb.core.Constants.TOLERANCE);


	});

});


describe("verb.intersectCurveSurface",function(){

	it('gives valid result for planar surface and degree 2 bezier', function(){

		var base = [0,0,0]
			, uaxis = [1,0,0]
			, vaxis = [0,1,0]
			, ulength = 20
			, vlength = 10;

		var srf = new verb.PlanarSurface( base, uaxis, vaxis, ulength, vlength );
		var crv = verb.BezierCurve.byControlPoints( [ [5.2,5.2,5], [5.4,4.8,0], [5.2,5.2,-5] ] );

		var options = {
			sampleTolerance: 1e-12,
			tolerance: 1e-5,
			uDivs: 10,
			vDivs: 15
		};

		var res = verb.intersectCurveSurface( crv, srf, options );

		res.length.should.be.equal( 1 );
		res[0].p.should.be.approximately(0.5, verb.core.Constants.TOLERANCE);
		res[0].uv[0].should.be.approximately(0.265, verb.core.Constants.TOLERANCE);
		res[0].uv[1].should.be.approximately(0.5, verb.core.Constants.TOLERANCE);

	});

});


describe("verb.InterpCurve",function(){

	function shouldInterpPointsWithTangents(pts, degree, start_tangent, end_tangent){

		var crv = shouldInterpPoints(pts, degree, start_tangent, end_tangent);

		var tan0 = crv.derivatives(0, 1)[1];
		var tan1 = crv.derivatives(1, 1)[1];

		vecShouldBe( start_tangent, tan0 );
		vecShouldBe( end_tangent, tan1 );

	}

	function shouldInterpPoints(pts, degree, start_tangent, end_tangent){

		var crv = new verb.InterpCurve( pts, degree, start_tangent, end_tangent );

		crv.get('degree').should.be.equal( degree );

		var tess = crv.tessellate();

		for (var j = 0; j < pts.length; j++){

			var min = Number.MAX_VALUE;
			for (var i = 1; i < tess.length; i++){

				var pt = pts[j];
				var o = tess[i-1];
				var r = verb.core.Vec.normalized( verb.core.Vec.sub( tess[i], tess[i-1] ) );

				var res = verb.core.Eval.rayClosestPoint( pt, o, r );
				var dist = verb.core.Vec.norm( verb.core.Vec.sub( pts[j], res ) );

				if (dist < min) {
					min = dist;
				}
			}

			min.should.be.lessThan( 1e-3 );

		}

		return crv;
	}

	it('can compute valid cubic interpolating curve for 5 points', function(){

		var pts = [ [0, 0, 0], [3,4, 0], [-1,4, 0], [-4,0, 0], [-4,-3, 0] ]; 
		shouldInterpPoints( pts, 2 );

	});

	it('can compute valid cubic interpolating curve for 4 points', function(){

		var pts = [ [0, 0, 0], [3,4, 0], [-1,4, 0], [-4,0, 0], [-4,-3, 0] ]; 
		shouldInterpPointsWithTangents(pts, 3, [1,0,0], [0,1,0] )

	});

});

describe("verb.core.Eval.rational_surface_curvature ",function(){

	it('returns expected result for cylinder', function(){

		var axis = [0,0,1]
			, xaxis = [1,0,0]
			, base = [0,0,0]
			, height = 1
			, radius = 1;

		var srf = new verb.Cylinder( axis, xaxis, base, height, radius );

		var res = verb.core.Eval.rational_surface_curvature( srf.get('degreeU'),
																													srf.get('knotsU'),
																													srf.get('degreeV'),
																													srf.get('knotsV'),
																													srf.homogenize(),
																													0.5, 0.5 );

		res.point[0].should.be.approximately( -1, verb.core.Constants.TOLERANCE );
		res.point[1].should.be.approximately( 0, verb.core.Constants.TOLERANCE );
		res.point[2].should.be.approximately( 0.5, verb.core.Constants.TOLERANCE );

		res.normal[0].should.be.approximately( 5.656854, verb.core.Constants.TOLERANCE );
		res.normal[1].should.be.approximately( 0, verb.core.Constants.TOLERANCE );
		res.normal[2].should.be.approximately( 0, verb.core.Constants.TOLERANCE );

		res.mean.should.be.greaterThan( 0 );
		res.gaussian.should.be.approximately( 0, verb.core.Constants.TOLERANCE );

		res.p1[0].should.be.approximately( 0, verb.core.Constants.TOLERANCE );
		res.p1[1].should.be.approximately( -5.656854249, verb.core.Constants.TOLERANCE );
		res.p1[2].should.be.approximately( 0, verb.core.Constants.TOLERANCE );

		res.p2[0].should.be.approximately( 0, verb.core.Constants.TOLERANCE );
		res.p2[1].should.be.approximately( 0, verb.core.Constants.TOLERANCE );
		res.p2[2].should.be.approximately( -1, verb.core.Constants.TOLERANCE );

		res.k1.should.be.approximately( 181.01933598, verb.core.Constants.TOLERANCE );
		res.k2.should.be.approximately( 0, verb.core.Constants.TOLERANCE );


	});

	it('returns expected result for sphere', function(){

		var center = [0,0,0]
			, radius = 1;

		var srf = new verb.Sphere( center, radius );

		var res = verb.core.Eval.rational_surface_curvature( srf.get('degreeU'),
																													srf.get('knotsU'),
																													srf.get('degreeV'),
																													srf.get('knotsV'),
																													srf.homogenize(),
																													0.5, 0.9 );

		// res.point[0].should.be.approximately( -1, verb.core.Constants.TOLERANCE );
		// res.point[1].should.be.approximately( 0, verb.core.Constants.TOLERANCE );
		// res.point[2].should.be.approximately( 0.5, verb.core.Constants.TOLERANCE );

		// res.normal[0].should.be.approximately( -5.656854, verb.core.Constants.TOLERANCE );
		// res.normal[1].should.be.approximately( 0, verb.core.Constants.TOLERANCE );
		// res.normal[2].should.be.approximately( 0, verb.core.Constants.TOLERANCE );

		// res.mean.should.be.lessThan( 0 );
		// res.gaussian.should.be.approximately( 0, verb.core.Constants.TOLERANCE );

		// res.p1[0].should.be.approximately( 0, verb.core.Constants.TOLERANCE );
		// res.p1[1].should.be.approximately( -5.656854249, verb.core.Constants.TOLERANCE );
		// res.p1[2].should.be.approximately( 0, verb.core.Constants.TOLERANCE );

		// res.p2[0].should.be.approximately( 0, verb.core.Constants.TOLERANCE );
		// res.p2[1].should.be.approximately( 0, verb.core.Constants.TOLERANCE );
		// res.p2[2].should.be.approximately( 1, verb.core.Constants.TOLERANCE );

		// res.k1.should.be.approximately( -181.01933598, verb.core.Constants.TOLERANCE );
		// res.k2.should.be.approximately( 0, verb.core.Constants.TOLERANCE );


	});

});

*/

describe("verb.NurbsSurface.byControlPointsWeights",function(){

	var degreeU = 3
		, degreeV = 3
		, knotsU = [0, 0, 0, 0, 1, 1, 1, 1]
		, knotsV =	[0, 0, 0, 0, 1, 1, 1, 1]
		, controlPoints = [ 	[ [0, 0, 0], 	[10, 0, 0], 	[20, 0, 0], 	[30, 0, 0] 		],
								[ [0, -10, 0], 	[10, -10, 0], 	[20, -10, 0], 	[30, -10, 0] 	],
								[ [0, -20, 0], 	[10, -20, 0], 	[20, -20, 0], 	[30, -20, 0] 	],
								[ [0, -30, 0], 	[10, -30, 0], 	[20, -30, 0], 	[30, -30, 0] 	] ]
		, weights = [ 	[ 1, 1, 1, 1 ],
						[ 1, 1, 1, 1 ],
						[ 1, 1, 1, 1 ],
						[ 1, 1, 1, 1 ] ]
		, surface = verb.NurbsSurface.byControlPointsWeights( degreeU, degreeV, knotsU, knotsV, controlPoints, weights );

	it('has expected properties', function(){

		surface.degreeU().should.be.equal( 3 );
		surface.degreeV().should.be.equal( 3 );
		surface.knotsU().should.be.eql( knotsU );
		surface.knotsV().should.be.eql( knotsV );
		surface.controlPoints().should.be.eql( controlPoints );
		surface.weights().should.be.eql( weights );

	});

});

describe("verb.NurbsSurface.domainU",function(){

	var degreeU = 3
		, degreeV = 3
		, knotsU = [0, 0, 0, 0, 1, 1, 1, 1]
		, knotsV =	[0, 0, 0, 0, 1, 1, 1, 1]
		, controlPoints = [ 	[ [0, 0, 0], 	[10, 0, 0], 	[20, 0, 0], 	[30, 0, 0] 		],
								[ [0, -10, 0], 	[10, -10, 0], 	[20, -10, 0], 	[30, -10, 0] 	],
								[ [0, -20, 0], 	[10, -20, 0], 	[20, -20, 0], 	[30, -20, 0] 	],
								[ [0, -30, 0], 	[10, -30, 0], 	[20, -30, 0], 	[30, -30, 0] 	] ]
		, weights = [ 	[ 1, 1, 1, 1 ],
						[ 1, 1, 1, 1 ],
						[ 1, 1, 1, 1 ],
						[ 1, 1, 1, 1 ] ]
		, surface = verb.NurbsSurface.byControlPointsWeights( degreeU, degreeV, knotsU, knotsV, controlPoints, weights );

	it('is correct for basic case', function(){
		var d = surface.domainU();

		d.min.should.be.equal( 0 );
		d.max.should.be.equal( 1 );
	});
});

describe("verb.NurbsSurface.domainV",function(){

	var degreeU = 3
		, degreeV = 3
		, knotsU = [0, 0, 0, 0, 1, 1, 1, 1]
		, knotsV =	[0, 0, 0, 0, 2, 2, 2, 2]
		, controlPoints = [ 	[ [0, 0, 0], 	[10, 0, 0], 	[20, 0, 0], 	[30, 0, 0] 		],
								[ [0, -10, 0], 	[10, -10, 0], 	[20, -10, 0], 	[30, -10, 0] 	],
								[ [0, -20, 0], 	[10, -20, 0], 	[20, -20, 0], 	[30, -20, 0] 	],
								[ [0, -30, 0], 	[10, -30, 0], 	[20, -30, 0], 	[30, -30, 0] 	] ]
		, weights = [ 	[ 1, 1, 1, 1 ],
						[ 1, 1, 1, 1 ],
						[ 1, 1, 1, 1 ],
						[ 1, 1, 1, 1 ] ]
		, surface = verb.NurbsSurface.byControlPointsWeights( degreeU, degreeV, knotsU, knotsV, controlPoints, weights );

	it('is correct for basic case', function(){
		var d = surface.domainU();

		d.min.should.be.equal( 0 );
		d.max.should.be.equal( 1 );
	});
});

describe("verb.NurbsSurface.point",function(){

	var degreeU = 3
		, degreeV = 3
		, knotsU = [0, 0, 0, 0, 1, 1, 1, 1]
		, knotsV =	[0, 0, 0, 0, 1, 1, 1, 1]
		, controlPoints = [ 	[ [0, 0, 0], 	[10, 0, 0], 	[20, 0, 0], 	[30, 0, 0] 		],
								[ [0, -10, 0], 	[10, -10, 0], 	[20, -10, 0], 	[30, -10, 0] 	],
								[ [0, -20, 0], 	[10, -20, 0], 	[20, -20, 0], 	[30, -20, 0] 	],
								[ [0, -30, 0], 	[10, -30, 0], 	[20, -30, 0], 	[30, -30, 0] 	] ]
		, weights = [ 	[ 1, 1, 1, 1 ],
						[ 1, 1, 1, 1 ],
						[ 1, 1, 1, 1 ],
						[ 1, 1, 1, 1 ] ]
		, surface = verb.NurbsSurface.byControlPointsWeights( degreeU, degreeV, knotsU, knotsV, controlPoints, weights );

	it('is correct for basic case', function(){

		vecShouldBe( [15, -15, 0], surface.point(0.5,0.5) );

	});

	it('is correct for basic case async', function(done){

		surface.pointAsync(0.5,0.5).then(function(x){
			vecShouldBe( [15, -15, 0], x );
			done();
		});

	});

});

describe("verb.NurbsSurface.normal",function(){

	var degreeU = 3
		, degreeV = 3
		, knotsU = [0, 0, 0, 0, 1, 1, 1, 1]
		, knotsV =	[0, 0, 0, 0, 1, 1, 1, 1]
		, controlPoints = [ 	[ [0, 0, 0], 	[10, 0, 0], 	[20, 0, 0], 	[30, 0, 0] 		],
								[ [0, -10, 0], 	[10, -10, 0], 	[20, -10, 0], 	[30, -10, 0] 	],
								[ [0, -20, 0], 	[10, -20, 0], 	[20, -20, 0], 	[30, -20, 0] 	],
								[ [0, -30, 0], 	[10, -30, 0], 	[20, -30, 0], 	[30, -30, 0] 	] ]
		, weights = [ 	[ 1, 1, 1, 1 ],
						[ 1, 1, 1, 1 ],
						[ 1, 1, 1, 1 ],
						[ 1, 1, 1, 1 ] ]
		, surface = verb.NurbsSurface.byControlPointsWeights( degreeU, degreeV, knotsU, knotsV, controlPoints, weights );

	it('is correct for basic case', function(){
		vecShouldBe( [0, 0, 900], surface.normal(0.5,0.5) );
	});

	it('is correct for basic case async', function(done){

		surface.normalAsync(0.5,0.5).then(function(x){
			vecShouldBe( [0, 0, 900], x );
			done();
		});

	});

});

describe("verb.NurbsSurface.derivatives",function(){

	var degreeU = 3
		, degreeV = 3
		, knotsU = [0, 0, 0, 0, 1, 1, 1, 1]
		, knotsV =	[0, 0, 0, 0, 1, 1, 1, 1]
		, controlPoints = [ 	[ [0, 0, 0], 	[10, 0, 0], 	[20, 0, 0], 	[30, 0, 0] 		],
								[ [0, -10, 0], 	[10, -10, 0], 	[20, -10, 0], 	[30, -10, 0] 	],
								[ [0, -20, 0], 	[10, -20, 0], 	[20, -20, 0], 	[30, -20, 0] 	],
								[ [0, -30, 0], 	[10, -30, 0], 	[20, -30, 0], 	[30, -30, 0] 	] ]
		, weights = [ 	[ 1, 1, 1, 1 ],
						[ 1, 1, 1, 1 ],
						[ 1, 1, 1, 1 ],
						[ 1, 1, 1, 1 ] ]
		, surface = verb.NurbsSurface.byControlPointsWeights( degreeU, degreeV, knotsU, knotsV, controlPoints, weights );

	it('is correct for basic case', function(){
		var d = surface.derivatives( 0.5, 0.5, 1 );

		vecShouldBe( [15, -15, 0], d[0][0] );
		vecShouldBe( [0, -30, 0], d[1][0] );
		vecShouldBe( [30, 0, 0], d[0][1] );
	});

	it('is correct for basic case async', function(done){
		surface.derivativesAsync( 0.5, 0.5, 1 ).then(function(d){

			vecShouldBe( [15, -15, 0], d[0][0] );
			vecShouldBe( [0, -30, 0], d[1][0] );
			vecShouldBe( [30, 0, 0], d[0][1] );

			done();
		});
	});

});

describe("verb.NurbsSurface.closestParam",function(){

	var degreeU = 3
		, degreeV = 3
		, knotsU = [0, 0, 0, 0, 1, 1, 1, 1]
		, knotsV =	[0, 0, 0, 0, 1, 1, 1, 1]
		, controlPoints = [ 	[ [0, 0, 0], 	[10, 0, 0], 	[20, 0, 0], 	[30, 0, 0] 		],
								[ [0, -10, 0], 	[10, -10, 0], 	[20, -10, 0], 	[30, -10, 0] 	],
								[ [0, -20, 0], 	[10, -20, 0], 	[20, -20, 0], 	[30, -20, 0] 	],
								[ [0, -30, 0], 	[10, -30, 0], 	[20, -30, 0], 	[30, -30, 0] 	] ]
		, weights = [ 	[ 1, 1, 1, 1 ],
						[ 1, 1, 1, 1 ],
						[ 1, 1, 1, 1 ],
						[ 1, 1, 1, 1 ] ]
		, surface = verb.NurbsSurface.byControlPointsWeights( degreeU, degreeV, knotsU, knotsV, controlPoints, weights );

	it('is correct for basic case', function(){
		var d = surface.closestParam( [ 15, -15, 1] );
		vecShouldBe( [0.5, 0.5], d );
	});

	it('is correct for basic case async', function(done){
		surface.closestParamAsync(  [15, -15, 1] ).then(function(d){
			vecShouldBe( [0.5, 0.5], d );
			done();
		});
	});
});

describe("verb.NurbsSurface.closestPoint",function(){

	var degreeU = 3
		, degreeV = 3
		, knotsU = [0, 0, 0, 0, 1, 1, 1, 1]
		, knotsV =	[0, 0, 0, 0, 1, 1, 1, 1]
		, controlPoints = [ 	[ [0, 0, 0], 	[10, 0, 0], 	[20, 0, 0], 	[30, 0, 0] 		],
								[ [0, -10, 0], 	[10, -10, 0], 	[20, -10, 0], 	[30, -10, 0] 	],
								[ [0, -20, 0], 	[10, -20, 0], 	[20, -20, 0], 	[30, -20, 0] 	],
								[ [0, -30, 0], 	[10, -30, 0], 	[20, -30, 0], 	[30, -30, 0] 	] ]
		, weights = [ 	[ 1, 1, 1, 1 ],
						[ 1, 1, 1, 1 ],
						[ 1, 1, 1, 1 ],
						[ 1, 1, 1, 1 ] ]
		, surface = verb.NurbsSurface.byControlPointsWeights( degreeU, degreeV, knotsU, knotsV, controlPoints, weights );

	it('is correct for basic case', function(){
		var d = surface.closestPoint( [ 15, -15, 1] );
		vecShouldBe( [15, -15, 0], d );
	});

	it('is correct for basic case async', function(done){
		surface.closestPointAsync(  [15, -15, 1] ).then(function(d){
			vecShouldBe( [15, -15, 0], d );
			done();
		});
	});
});

describe("verb.NurbsSurface.split",function(){

	var degreeU = 3
		, degreeV = 3
		, knotsU = [0, 0, 0, 0, 1, 1, 1, 1]
		, knotsV =	[0, 0, 0, 0, 1, 1, 1, 1]
		, controlPoints = [ 	[ [0, 0, 0], 	[10, 0, 0], 	[20, 0, 0], 	[30, 0, 0] 		],
								[ [0, -10, 0], 	[10, -10, 0], 	[20, -10, 0], 	[30, -10, 0] 	],
								[ [0, -20, 0], 	[10, -20, 0], 	[20, -20, 0], 	[30, -20, 0] 	],
								[ [0, -30, 0], 	[10, -30, 0], 	[20, -30, 0], 	[30, -30, 0] 	] ]
		, weights = [ 	[ 1, 1, 1, 1 ],
						[ 1, 1, 1, 1 ],
						[ 1, 1, 1, 1 ],
						[ 1, 1, 1, 1 ] ]
		, surface = verb.NurbsSurface.byControlPointsWeights( degreeU, degreeV, knotsU, knotsV, controlPoints, weights );

	it('is correct for basic case 1', function(){
		var d = surface.split( 0.5, true );

		d[0].domainV().min.should.be.equal(0);
		d[0].domainV().max.should.be.equal(0.5);

		d[0].domainU().min.should.be.equal(0);
		d[0].domainU().max.should.be.equal(1.0);

		d[1].domainV().min.should.be.equal(0.5);
		d[1].domainV().max.should.be.equal(1.0);

		d[1].domainU().min.should.be.equal(0);
		d[1].domainU().max.should.be.equal(1.0);
	});

	it('is correct for basic case 2', function(){
		var d = surface.split( 0.5, false );

		d[0].domainV().min.should.be.equal(0);
		d[0].domainV().max.should.be.equal(1.0);

		d[0].domainU().min.should.be.equal(0);
		d[0].domainU().max.should.be.equal(0.5);

		d[1].domainV().min.should.be.equal(0);
		d[1].domainV().max.should.be.equal(1.0);

		d[1].domainU().min.should.be.equal(0.5);
		d[1].domainU().max.should.be.equal(1.0);
	});

	it('is correct for basic case async', function(done){
		surface.splitAsync( 0.5, true ).then(function(d){

			d[0].domainV().min.should.be.equal(0);
			d[0].domainV().max.should.be.equal(0.5);

			d[0].domainU().min.should.be.equal(0);
			d[0].domainU().max.should.be.equal(1.0);

			d[1].domainV().min.should.be.equal(0.5);
			d[1].domainV().max.should.be.equal(1.0);

			d[1].domainU().min.should.be.equal(0);
			d[1].domainU().max.should.be.equal(1.0);

			done();
		});
	});
});

describe("verb.NurbsSurface.tessellate",function(){

	var degreeU = 3
		, degreeV = 3
		, knotsU = [0, 0, 0, 0, 1, 1, 1, 1]
		, knotsV =	[0, 0, 0, 0, 1, 1, 1, 1]
		, controlPoints = [ 	[ [0, 0, 0], 	[10, 0, 0], 	[20, 0, 0], 	[30, 0, 0] 		],
								[ [0, -10, 0], 	[10, -10, 0], 	[20, -10, 0], 	[30, -10, 0] 	],
								[ [0, -20, 0], 	[10, -20, 0], 	[20, -20, 0], 	[30, -20, 0] 	],
								[ [0, -30, 0], 	[10, -30, 0], 	[20, -30, 0], 	[30, -30, 0] 	] ]
		, weights = [ 	[ 1, 1, 1, 1 ],
						[ 1, 1, 1, 1 ],
						[ 1, 1, 1, 1 ],
						[ 1, 1, 1, 1 ] ]
		, surface = verb.NurbsSurface.byControlPointsWeights( degreeU, degreeV, knotsU, knotsV, controlPoints, weights );

	it('is correct for basic case with no options', function(){
		var d = surface.tessellate();

		d.faces.length.should.be.greaterThan( 2 );
		d.normals.length.should.be.greaterThan( 2 );
		d.points.length.should.be.greaterThan( 2 );
		d.uvs.length.should.be.greaterThan( 2 );

	});

	it('is correct for basic case async', function(done){
		surface.tessellateAsync( 0.5, true ).then(function(d){

			d.faces.length.should.be.greaterThan( 2 );
			d.normals.length.should.be.greaterThan( 2 );
			d.points.length.should.be.greaterThan( 2 );
			d.uvs.length.should.be.greaterThan( 2 );

			done();
		});
	});
});

describe("verb.NurbsSurface.transform",function(){

	var degreeU = 3
		, degreeV = 3
		, knotsU = [0, 0, 0, 0, 1, 1, 1, 1]
		, knotsV =	[0, 0, 0, 0, 1, 1, 1, 1]
		, controlPoints = [ 	[ [0, 0, 0], 	[10, 0, 0], 	[20, 0, 0], 	[30, 0, 0] 		],
								[ [0, -10, 0], 	[10, -10, 0], 	[20, -10, 0], 	[30, -10, 0] 	],
								[ [0, -20, 0], 	[10, -20, 0], 	[20, -20, 0], 	[30, -20, 0] 	],
								[ [0, -30, 0], 	[10, -30, 0], 	[20, -30, 0], 	[30, -30, 0] 	] ]
		, weights = [ 	[ 1, 1, 1, 1 ],
						[ 1, 1, 1, 1 ],
						[ 1, 1, 1, 1 ],
						[ 1, 1, 1, 1 ] ]
		, surface = verb.NurbsSurface.byControlPointsWeights( degreeU, degreeV, knotsU, knotsV, controlPoints, weights );

	var t = [ [ 1, 0, 0, 5 ],
			  [ 0, 1, 0, 2 ],
			  [ 0, 0, 1, -1],
			  [ 0, 0, 0, 1 ] ];

	it('is correct for basic case with no options', function(){

		var ta = surface.transform( t );

		ta.point(0.5,0.5).should.be.eql( [ 15 + 5, -15 + 2, 0 - 1] );
	});

	it('is correct for basic case async', function(done){
		surface.transformAsync( t ).then(function(ta){

			ta.point(0.5,0.5).should.be.eql( [ 15 + 5, -15 + 2, 0 - 1] );

			done();
		});
	});
});