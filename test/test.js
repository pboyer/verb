var should = require('should')
	, verb = require('../build/verb.js');


describe("Array.flatten",function(){

	it('returns a flattened version of a nested array', function(){

		var arr = [ [1,2] , 1, [1, 2, 3, 4], [1, [1,2]]];
		var flattened = arr.flatten();

		flattened.should.eql([1,2,1,1,2,3,4,1,1,2]);

	});

	it('returns an empty array when asked to flatten an empty array', function(){

		var arr = [];
		var flattened = arr.flatten();

		flattened.should.eql([]);

	});

	it('returns a 1d array when asked to flatten a 1d array', function(){

		var arr = [1,2,3,4];
		var flattened = arr.flatten();

		flattened.should.eql([1,2,3,4]);

	});
});

describe("verb.eval.nurbs.knot_span_given_n",function(){

	it('returns correct result', function(){

		var n = 7
			, degree = 2
			, knots = [0, 0, 0, 1, 2, 3, 4, 4, 5, 5, 5];

		should.equal( 4, verb.eval.nurbs.knot_span_given_n( n, degree, 2.5, knots ) );
		should.equal( 3, verb.eval.nurbs.knot_span_given_n( n, degree, 1, knots ) );
		should.equal( 3, verb.eval.nurbs.knot_span_given_n( n, degree, 1.5, knots ) );
		should.equal( 7, verb.eval.nurbs.knot_span_given_n( n, degree, 4.9, knots ) );
		should.equal( 7, verb.eval.nurbs.knot_span_given_n( n, degree, 10, knots ) );
		should.equal( 7, verb.eval.nurbs.knot_span_given_n( n, degree, 5, knots ) );
		should.equal( 2, verb.eval.nurbs.knot_span_given_n( n, degree, 0, knots ) );
		should.equal( 2, verb.eval.nurbs.knot_span_given_n( n, degree, -1, knots ) );

	});

});

describe("verb.eval.nurbs.knot_span",function(){

	it('returns correct result for degree 2 curve', function(){

		var degree = 2
			, knots = [0, 0, 0, 1, 2, 3, 4, 4, 5, 5, 5];

		should.equal( 4, verb.eval.nurbs.knot_span( degree, 2.5, knots ) );
		should.equal( 3, verb.eval.nurbs.knot_span( degree, 1, knots ) );
		should.equal( 3, verb.eval.nurbs.knot_span( degree, 1.5, knots ) );
		should.equal( 7, verb.eval.nurbs.knot_span( degree, 4.9, knots ) );
		should.equal( 7, verb.eval.nurbs.knot_span( degree, 10, knots ) ); // above span
		should.equal( 7, verb.eval.nurbs.knot_span( degree, 5, knots ) ); // top of span
		should.equal( 2, verb.eval.nurbs.knot_span( degree, 0, knots ) ); // bottom span

	});

});

describe("verb.eval.nurbs.basis_functions, basis_functions_given_knot_span_index",function(){

	it('return correct results', function(){

		var degree = 2
			, span = 4
			, knots = [0, 0, 0, 1, 2, 3, 4, 4, 5, 5, 5];

		var N1 = verb.eval.nurbs.basis_functions_given_knot_span_index( 4, 2.5, degree, knots );
		should.equal( 3, N1.length );
		should.equal( 0.125, N1[0] );
		should.equal( 0.75, N1[1] );
		should.equal( 0.125, N1[2] );

		var N2 = verb.eval.nurbs.basis_functions( 2.5, degree, knots );
		should.equal( 3, N2.length );
		should.equal( 0.125, N2[0] );
		should.equal( 0.75, N2[1] );
		should.equal( 0.125, N2[2] );

	});

});

describe("verb.eval.nurbs.deriv_basis_functions_given_n_i",function(){

	it('returns correct results', function(){

		// This needs to be tested better
		var degree = 2
			, n = 7
			, span = 4
			, knots = [0, 0, 0, 1, 2, 3, 4, 4, 5, 5, 5];

		var N1 = verb.eval.nurbs.deriv_basis_functions_given_n_i( span, 2.5, degree, n, knots );
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

describe("verb.eval.nurbs.curve_point",function(){

	it('returns correct result for simple curve', function(){

		var degree = 2
			, n = 6
			, knots = [0, 0, 0, 1, 2, 3, 4, 5, 5, 5]
			, control_points = [ [10, 0], [20, 10], [30, 20], [40, 30], [50, 40], [60, 30], [70, 80]];

		var p = verb.eval.nurbs.curve_point_given_n( n, degree, knots, control_points, 2.5);

		should.equal( p[0], 40 );
		should.equal( p[1], 30 );

		var p_start = verb.eval.nurbs.curve_point_given_n( n, degree, knots, control_points, 0);

		should.equal( p_start[0], 10 );
		should.equal( p_start[1], 0 );

		var p_end = verb.eval.nurbs.curve_point_given_n( n, degree, knots, control_points, 5);

		should.equal( p_end[0], 70 );
		should.equal( p_end[1], 80 );

	});
});

describe("verb.eval.nurbs.are_valid_relations",function(){

	it('returns correct result for two cases', function(){

		should.equal( false, verb.eval.nurbs.are_valid_relations( 0, 0, 0 ) );
		should.equal( true, verb.eval.nurbs.are_valid_relations( 2, 2, 5 ) );

	});
});

describe("verb.eval.nurbs.curve_point",function(){

	it('returns correct result for simple curve', function(){

		var degree = 3
			, n = 4
			, u = 0
			, knots = [0, 0, 0, 0, 1, 1, 1, 1]
			, control_points = [ [10, 0], [20, 10], [30, 20], [50, 50] ];

		var p = verb.eval.nurbs.curve_point( degree, knots, control_points, u);

		should.equal( p[0], 10 );
		should.equal( p[1], 0 );

		var p2 = verb.eval.nurbs.curve_point( degree, knots, control_points, 1.0);

		should.equal( p2[0], 50 );
		should.equal( p2[1], 50 );


	});

});

describe("verb.eval.nurbs.curve_derivs_given_n",function(){

	it('returns correct result for simple curve', function(){

		// This needs to be tested better
		var degree = 3
			, n = 3
			, u = 0
			, knots = [0, 0, 0, 0, 1, 1, 1, 1]
			, control_points = [ [10, 0], [20, 10], [30, 20], [50, 50] ]
			, num_derivs = 2;

		var p = verb.eval.nurbs.curve_derivs_given_n( n, degree, knots, control_points, u, num_derivs ) ;

		should.equal( p[0][0], 10 );
		should.equal( p[0][1], 0 );
		should.equal( p[1][0] / p[1][1], 1 );

	});

});

describe("verb.eval.nurbs.curve_derivs",function(){

	it('returns correct result for simple surface', function(){

		// This needs to be tested better
		var degree = 3
			, u = 0
			, knots = [0, 0, 0, 0, 1, 1, 1, 1]
			, control_points = [ [10, 0], [20, 10], [30, 20], [50, 50] ]
			, num_derivs = 2;

		var p = verb.eval.nurbs.curve_derivs( degree, knots, control_points, u, num_derivs ) ;

		should.equal( p[0][0], 10 );
		should.equal( p[0][1], 0 );
		should.equal( p[1][0] / p[1][1], 1 );

	
	});

});

describe("verb.eval.nurbs.surface_point_given_n_m",function(){

	it('returns correct result for simple surface', function(){

		// This needs to be tested better
		var degree_u = 3
			, degree_v = 3
			, knots_u = [0, 0, 0, 0, 1, 1, 1, 1]
			, knots_v =	[0, 0, 0, 0, 1, 1, 1, 1]
			, control_points = [ 	[ [0, 0, 50], 		[10, 0, 0], 		[20, 0, 0], 		[30, 0, 0] 		],
														[ [0, -10, 0], 	[10, -10, 10], 	[20, -10, 10], 	[30, -10, 0] 	],
														[ [0, -20, 0], 	[10, -20, 10], 	[20, -20, 10], 	[30, -20, 0] 	],
														[ [0, -30, 0], 	[10, -30, 0], 	[20, -30, 0], 	[30, -30, 0] 	] ]
			, n = 3
			, m = 3;

		var p = verb.eval.nurbs.surface_point_given_n_m( n, degree_u, knots_u, m, degree_v, knots_v, control_points, 0, 0 );
		
		should.equal( p[0], 0 );
		should.equal( p[1], 0 );
		should.equal( p[2], 50 );

		p = verb.eval.nurbs.surface_point_given_n_m( n, degree_u, knots_u, m, degree_v, knots_v, control_points, 1, 1 );

		should.equal( p[0], 30 );
		should.equal( p[1], -30 );
		should.equal( p[2], 0 );

	});

});

describe("verb.eval.nurbs.surface_point",function(){

	it('returns correct result for simple surface', function(){

		// This needs to be tested better
		var degree_u = 3
			, degree_v = 3
			, knots_u = [0, 0, 0, 0, 1, 1, 1, 1]
			, knots_v =	[0, 0, 0, 0, 1, 1, 1, 1]
			, control_points = [ 	[ [0, 0, 50], 		[10, 0, 0], 		[20, 0, 0], 		[30, 0, 0] 		],
														[ [0, -10, 0], 	[10, -10, 10], 	[20, -10, 10], 	[30, -10, 0] 	],
														[ [0, -20, 0], 	[10, -20, 10], 	[20, -20, 10], 	[30, -20, 0] 	],
														[ [0, -30, 0], 	[10, -30, 0], 	[20, -30, 0], 	[30, -30, 0] 	] ];

		var p = verb.eval.nurbs.surface_point( degree_u, knots_u, degree_v, knots_v, control_points, 0, 0 );

		should.equal( p[0], 0 );
		should.equal( p[1], 0 );
		should.equal( p[2], 50 );

		p = verb.eval.nurbs.surface_point( degree_u, knots_u, degree_v, knots_v, control_points, 1, 1 );

		should.equal( p[0], 30 );
		should.equal( p[1], -30 );
		should.equal( p[2], 0 );

	});

	it('returns correct result for another simple surface', function(){

		var degree_u = 1
			, degree_v = 3
			, knots_u = [0, 0, 1, 1 ]
			, knots_v =	[0, 0, 0, 0, 1, 1, 1, 1]
			, control_points = [ 	[ [0, 0, 50], 		[10, 0, 0], 		[20, 0, 0], 		[30, 0, 0] 		],
														[ [0, -10, 0], 	[10, -10, 10], 	[20, -10, 10], 	[30, -10, 0] 	] ];

		var p = verb.eval.nurbs.surface_point( degree_u, knots_u, degree_v, knots_v, control_points, 0, 0 );

		should.equal( p[0], 0 );
		should.equal( p[1], 0 );
		should.equal( p[2], 50 );

	});

});

describe("verb.eval.nurbs.surface_derivs_given_n_m",function(){

	it('returns correct derivatives for simple surface', function(){

		var degree_u = 3
			, degree_v = 3
			, u = 0.0
			, v = 0.0
			, knots_u = [0, 0, 0, 0, 1, 1, 1, 1]
			, knots_v =	[0, 0, 0, 0, 1, 1, 1, 1]
			, control_points = [ 	[ [0, 0, 0], 		[10, 10, 0], 		[20, 10, 0], 		[30, 0, 0] 		],
														[ [0, -10, 0], 	[10, -10, 10], 	[20, -10, 10], 	[30, -10, 0] 	],
														[ [0, -20, 0], 	[10, -20, 10], 	[20, -20, 10], 	[30, -20, 0] 	],
														[ [0, -30, 0], 	[10, -30, 0], 	[20, -30, 0], 	[30, -30, 0] 	] ]
			, n = 3
			, m = 3
			, num_derivatives = 1;

		var p = verb.eval.nurbs.surface_derivs_given_n_m( n, degree_u, knots_u, m, degree_v, knots_v, control_points, num_derivatives, 0, 0 );

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

describe("verb.eval.nurbs.surface_derivs",function(){

	it('returns correct derivatives for simple surface', function(){

		var degree_u = 3
			, degree_v = 3
			, u = 0.0
			, v = 0.0
			, knots_u = [0, 0, 0, 0, 1, 1, 1, 1]
			, knots_v =	[0, 0, 0, 0, 1, 1, 1, 1]
			, control_points = [ 	[ [0, 0, 0], 		[10, 10, 0], 		[20, 10, 0], 		[30, 0, 0] 		],
														[ [0, -10, 0], 	[10, -10, 10], 	[20, -10, 10], 	[30, -10, 0] 	],
														[ [0, -20, 0], 	[10, -20, 10], 	[20, -20, 10], 	[30, -20, 0] 	],
														[ [0, -30, 0], 	[10, -30, 0], 	[20, -30, 0], 	[30, -30, 0] 	] ]
			, n = 3
			, m = 3
			, num_derivatives = 1;

		var p = verb.eval.nurbs.surface_derivs( degree_u, knots_u, degree_v, knots_v, control_points, num_derivatives, 0, 0 );

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

describe("verb.eval.nurbs.homogenize_1d",function(){

	it('returns correct results', function(){

		var weights = [1, 2, 3, 4]
			, control_points = [ [10, 0], [20, 10], [30, 20], [50, 50] ]
			, homo_control_points = verb.eval.nurbs.homogenize_1d( control_points, weights);

		for (var i = 0; i < control_points.length; i++)
		{
			should.equal( homo_control_points[i][0], weights[i] * control_points[i][0] );
			should.equal( homo_control_points[i][1], weights[i] * control_points[i][1] );
			should.equal( homo_control_points[i][2], weights[i] );
		}

		weights = [1, 2, 3, 4];
		control_points = [ [10, 0, 4], [20, 10, 3], [30, 20, 0], [50, 50, 10] ];
		homo_control_points = verb.eval.nurbs.homogenize_1d( control_points, weights);

		for (var i = 0; i < control_points.length; i++)
		{
			should.equal( homo_control_points[i][0], weights[i] * control_points[i][0] );
			should.equal( homo_control_points[i][1], weights[i] * control_points[i][1] );
			should.equal( homo_control_points[i][2], weights[i] * control_points[i][2] );
			should.equal( homo_control_points[i][3], weights[i] );
		}

	});

});

describe("verb.eval.nurbs.homogenize_2d",function(){

	it('homogenize_2d', function(){

		var weights = [ 	[ 1, 	-2, 3, 	5 	],
											[ 2, 	1, 	5, 	2 	],
											[ -3, 4, 	7, 	2 	],
											[ 1, 	6, 	-2, 12 	] ]
			, control_points = [ 	[ [0, 0, 0], 		[10, 10, 0], 		[20, 10, 0], 		[30, 0, 0] 		],
														[ [0, -10, 0], 	[10, -10, 10], 	[20, -10, 10], 	[30, -10, 0] 	],
														[ [0, -20, 0], 	[10, -20, 10], 	[20, -20, 10], 	[30, -20, 0] 	],
														[ [0, -30, 0], 	[10, -30, 0], 	[20, -30, 0], 	[30, -30, 0] 	] ]
			, homo_control_points = verb.eval.nurbs.homogenize_2d( control_points, weights)
			, j = 0;

		for (var i = 0; i < control_points.length; i++)
		{
			for (j = 0; j < control_points[i].length; j++)
			{
				should.equal( homo_control_points[i][j][0], weights[i][j] * control_points[i][j][0] );
				should.equal( homo_control_points[i][j][1], weights[i][j] * control_points[i][j][1] );
				should.equal( homo_control_points[i][j][2], weights[i][j] * control_points[i][j][2] );
				should.equal( homo_control_points[i][j][3], weights[i][j] );
			}
		}

	});

});

describe("verb.eval.nurbs.dehomogenize",function(){

	it('returns correct result', function(){

		var weights = [ 	[ 1, 	-2, 3, 	5 	],
											[ 2, 	1, 	5, 	2 	],
											[ -3, 4, 	7, 	2 	],
											[ 1, 	6, 	-2, 12 	] ]
			, control_points = [ 	[ [0, 0, 0], 		[10, 10, 0], 		[20, 10, 0], 		[30, 0, 0] 		],
														[ [0, -10, 0], 	[10, -10, 10], 	[20, -10, 10], 	[30, -10, 0] 	],
														[ [0, -20, 0], 	[10, -20, 10], 	[20, -20, 10], 	[30, -20, 0] 	],
														[ [0, -30, 0], 	[10, -30, 0], 	[20, -30, 0], 	[30, -30, 0] 	] ]
			, homo_control_points = verb.eval.nurbs.homogenize_2d( control_points, weights)
			, j = 0
			, dehomo_pt = [];

		for (var i = 0; i < control_points.length; i++)
		{
			for (j = 0; j < control_points[i].length; j++)
			{
				dehomo_pt = verb.eval.nurbs.dehomogenize( homo_control_points[i][j] );
				should.equal( dehomo_pt.length, control_points[i][j].length );
				should.equal( dehomo_pt[0], control_points[i][j][0] );
				should.equal( dehomo_pt[1], control_points[i][j][1] );
				should.equal( dehomo_pt[2], control_points[i][j][2] );
			}
		}

	});

});

describe("verb.eval.nurbs.rational_curve_point",function(){

	it('returns correct result for quarter circle', function(){

		// this represents a single quarter arc, using a rational bezier curve
		var degree = 2
			, knots = [0, 0, 0, 1, 1, 1 ]
			, weights = [1, 1, 2]
			, control_points = [ [1, 0], [1,1], [0,1] ];

		var p = verb.eval.nurbs.rational_curve_point( degree, knots, verb.eval.nurbs.homogenize_1d( control_points, weights) , 0);

		should.equal( p[0], 1 );
		should.equal( p[1], 0 );

		p = verb.eval.nurbs.rational_curve_point( degree, knots, verb.eval.nurbs.homogenize_1d( control_points, weights) , 0.5);

		should.equal( p[0], 0.6 );
		should.equal( p[1], 0.8 );

		p = verb.eval.nurbs.rational_curve_point( degree, knots, verb.eval.nurbs.homogenize_1d( control_points, weights) , 1);

		should.equal( p[0], 0 );
		should.equal( p[1], 1 );

	});

});

describe("verb.eval.nurbs.rational_curve_point",function(){

	it('returns correct result for cylinder patch', function(){

		// quarter cylinder patch
		var degree_u = 1
			, degree_v = 2
			, knots_u = [0, 0, 1, 1 ]
			, knots_v = [0, 0, 0, 1, 1, 1 ]
			, homo_control_points = [ [ [1, 1, 0, 1], 	[1, 1, 1, 1], [2, 0, 2, 2] ],
													 		  [ [-1, 1, 0, 1], 	[-1, 1, 1, 1], [-2, 0, 2, 2] ] ];

		var p = verb.eval.nurbs.rational_surface_point( degree_u, knots_u,  degree_v, knots_v, homo_control_points, 0, 0 );

		should.equal( p[0], 1 );
		should.equal( p[1], 1 );
		should.equal( p[2], 0 );

		p = verb.eval.nurbs.rational_surface_point( degree_u, knots_u,  degree_v, knots_v, homo_control_points, 0.5, 0.5 );

		should.equal( p[0], 0 );
		should.equal( p[1], 0.6 );
		should.equal( p[2], 0.8 );

		p = verb.eval.nurbs.rational_surface_point( degree_u, knots_u,  degree_v, knots_v, homo_control_points, 1, 1 );

		should.equal( p[0], -1 );
		should.equal( p[1], 0 );
		should.equal( p[2], 1 );

	});
});

describe("verb.eval.nurbs.separate_homo_derivs_1d",function(){

	it('returns expected results', function(){

		var CK = [ [1, 1, 0, 1], [1, 1, 1, 1], [2, 0, 2, 2] ]
			, ders = verb.eval.nurbs.separate_homo_derivs_1d( CK )
			, Aders = ders[0]
			, wders = ders[1];

		should.equal( Aders.length, wders.length );
		should.equal( CK.length, wders.length );

		for (var i = 0, l = Aders.length; i < l; i++)
		{
			should.equal( Aders[i].length, 3);
			should.equal( CK[i][0], Aders[i][0] );
			should.equal( CK[i][1], Aders[i][1] );
			should.equal( CK[i][2], Aders[i][2] );
			should.equal( CK[i][3], wders[i] );

		}

	});

});

describe("verb.eval.nurbs.separate_homo_derivs_2d",function(){

	it('returns expected results', function(){

		var SKL = [ [ [1, 1, 0, 1], 	[1, 1, 1, 1], [2, 0, 2, 2] ],
								[ [-1, 1, 0, 1], 	[-1, 1, 1, 1], [-2, 0, 2, 2] ] ]
			, ders = verb.eval.nurbs.separate_homo_derivs_2d( SKL )
			, Aders = ders[0]
			, wders = ders[1];
		
		should.equal( Aders.length, wders.length );
		should.equal( SKL.length, wders.length );

		for (var i = 0, rows = SKL.length, j = 0, cols = 0; i < rows; i++) {
			should.equal( Aders[i].length, wders[i].length );
			should.equal( wders[i].length, SKL[i].length );

			for (j = 0, cols = SKL[i].length; j < cols ; j++) {
				should.equal( Aders[i][j].length, 3);
				should.equal( SKL[i][j][0], Aders[i][j][0] );
				should.equal( SKL[i][j][1], Aders[i][j][1] );
				should.equal( SKL[i][j][2], Aders[i][j][2] );
				should.equal( SKL[i][j][3], wders[i][j] );
			}
		}
	
	});

});

describe("verb.eval.nurbs.rational_curve_derivs",function(){

	it('returns expected results', function(){

		// this represents a single quarter arc, using a rational bezier curve
		var degree = 2
			, knots = [0, 0, 0, 1, 1, 1 ]
			, weights = [1, 1, 2]
			, control_points = [ [1, 0], [1,1], [0,1] ];

		var p = verb.eval.nurbs.rational_curve_derivs( degree, knots, verb.eval.nurbs.homogenize_1d( control_points, weights), 0, 2);

		should.equal( p[0][0], 1 );
		should.equal( p[0][1], 0 );

		should.equal( p[1][0], 0 );
		should.equal( p[1][1], 2 );

		should.equal( p[2][0], -4 );
		should.equal( p[2][1], 0 );

		p = verb.eval.nurbs.rational_curve_derivs( degree, knots, verb.eval.nurbs.homogenize_1d( control_points, weights), 1, 2);

		should.equal( p[0][0], 0 );
		should.equal( p[0][1], 1 );

		should.equal( p[1][0], -1 );
		should.equal( p[1][1], 0 );

		// TODO: need additional checks here
		should.equal( p[2][0], 1 );
		should.equal( p[2][1], -1 );

	});

});

describe("verb.eval.nurbs.rational_surface_derivs",function(){

	it('returns expected results', function(){

		// quarter cylinder patch, axis aligned with x axis, radius: 1
		var degree_u = 1
			, degree_v = 2
			, knots_u = [0, 0, 1, 1 ]
			, knots_v = [0, 0, 0, 1, 1, 1 ]
			, homo_control_points = [ [ [1, 1, 0, 1], 	[1, 1, 1, 1], [2, 0, 2, 2] ],
													 		  [ [-1, 1, 0, 1], 	[-1, 1, 1, 1], [-2, 0, 2, 2] ] ]
			, num_derivatives = 1;

		var p = verb.eval.nurbs.rational_surface_derivs( degree_u, knots_u, degree_v, knots_v, homo_control_points, num_derivatives, 0, 0);

		should.equal( p[0][0][0], 1 );
		should.equal( p[0][0][1], 1 );
		should.equal( p[0][0][2], 0 );

		should.equal( p[0][1][0], 0 );
		should.equal( p[0][1][1], 0 );
		should.equal( p[0][1][2], 2 );

		should.equal( p[1][0][0], -2 );
		should.equal( p[1][0][1], 0 );
		should.equal( p[1][0][2], 0 );

		p = verb.eval.nurbs.rational_surface_derivs( degree_u, knots_u, degree_v, knots_v, homo_control_points, num_derivatives, 1, 1);

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

describe("verb.eval.nurbs.curve_knot_insert",function(){

	it('returns expected results', function(){

		// this represents a single quarter arc, using a rational bezier curve
		var degree = 2
			, u = 0.5
			, knots = [0, 0, 0, 1, 1, 1 ]
			, control_points = [ [1, 0], [1,1], [0,1] ];

		var p = verb.eval.nurbs.curve_knot_insert( degree, knots, control_points, u, 0, 1 );
		// should.equal(0, 1);

	});

});

describe("verb.eval.geom.three_points_are_flat",function(){

	it('should identify flat line by returning true', function(){

		// this represents a single quarter arc, using a rational bezier curve
		var p1 = [0,0,0],
			p2 = [0,2,0],
			p3 = [0,4,0];

		should.equal(true, verb.eval.nurbs.three_points_are_flat(p1,p2,p3,1e-5));

	});

});

describe("verb.eval.nurbs.rational_curve_point",function(){

	it('returns correct results for a line', function(){

		var degree = 1
			, knots = [0, 0, 1, 1]
			, control_points = [ [0, 0, 0], [10, 0, 0] ]
			, weights = [1, 1]
			, u1 = 0.0
			, u2 = 0.5
			, u3 = 1.0;

		var p1 = verb.eval.nurbs.rational_curve_point( degree, knots, verb.eval.nurbs.homogenize_1d( control_points, weights), u1);
		var p2 = verb.eval.nurbs.rational_curve_point( degree, knots, verb.eval.nurbs.homogenize_1d( control_points, weights), u2);
		var p3 = verb.eval.nurbs.rational_curve_point( degree, knots, verb.eval.nurbs.homogenize_1d( control_points, weights), u3);
		
		should.equal(p1[0], 0);
		should.equal(p2[0], 5);
		should.equal(p3[0], 10);

	});

});

describe("verb.eval.nurbs.rational_curve_adaptive_sample",function(){

	it('returns two end points for a line', function(){

		var degree = 1
			, knots = [0, 0, 1, 1]
			, control_points = [ [0, 0, 0], [10, 0, 0] ]
			, weights = [1, 1];

		var p = verb.eval.nurbs.rational_curve_adaptive_sample( degree, knots, verb.eval.nurbs.homogenize_1d( control_points, weights), 1e-5);	
		
		should.equal(p[0][0], 0);
		should.equal(p[1][0], 10);

		p.map( function(e){  e.length.should.be.equal(3); });

	});

	it('returns all the control points for a degree 1 curve', function(){

		var degree = 1
			, knots = [0, 0, 0.25, 0.5, 0.75, 1, 1]
			, control_points = [ [0, 0, 0], [10, 10, 0], [14, 20, 0], [10, 32, 4], [12, 16, 22] ]
			, weights = [1, 1, 1, 1, 1];

		var p = verb.eval.nurbs.rational_curve_adaptive_sample( degree, knots, verb.eval.nurbs.homogenize_1d( control_points, weights), 1e-5);	
		
		p.should.be.instanceof(Array).and.have.lengthOf(5);
		p[0].should.be.instanceof(Array).and.have.lengthOf(3);
		p[0].should.eql([0,0,0]);
		p[4].should.eql([12,16,22]);

		p.map( function(e){  e.length.should.be.equal(3); });

	});

	it('makes more points for an arc', function(){

		var degree = 2
			, knots = [0, 0, 0, 1, 1, 1 ]
			, weights = [1, Math.sqrt(2) / 2, 1]
			, control_points = [ [1, 0, 0], [1, 1, 0], [0, 1, 0] ];

		var p = verb.eval.nurbs.rational_curve_adaptive_sample( degree, knots, verb.eval.nurbs.homogenize_1d( control_points, weights), 1e-8, true);	
		var p2 = verb.eval.nurbs.rational_curve_adaptive_sample( degree, knots, verb.eval.nurbs.homogenize_1d( control_points, weights), 1e-4, true);	
		
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

describe("verb.eval.nurbs.rational_curve_regular_sample",function(){

	it('should return 10 samples when asked to', function(){

		var degree = 2
			, knots = [0, 0, 0, 1, 1, 1 ]
			, weights = [1, 1, 2]
			, control_points = [ [1, 0, 0], [1, 1, 0], [0, 1, 0] ]
			, numSamples = 10;

		var p = verb.eval.nurbs.rational_curve_regular_sample( degree, knots, verb.eval.nurbs.homogenize_1d( control_points, weights), numSamples);	

		should.equal(p.length, 10);

		p.map( function(e){  e.length.should.be.equal(3); });

	});
			
});

describe("verb.eval.mesh.get_tri_centroid",function(){

	it('should return origin for zeroed triangle', function(){

		var points = [[0,0,0],[0,0,0],[0,0,0]]
			, tri = [0,1,2]
			, centroid = verb.eval.geom.get_tri_centroid( points, tri );

		should.equal( 0, centroid[0] );
		should.equal( 0, centroid[1] );
		should.equal( 0, centroid[2] );

	});

});

describe("verb.eval.mesh.get_tri_centroid",function(){

	it('should return correct value', function(){

		var points = [[5,10,2],[3,-4,5],[-10,-3, 10]]
			, tri = [0,1,2]
			, centroid = verb.eval.geom.get_tri_centroid( points, tri );

		should.equal( -2/3, centroid[0] );
		should.equal( 1, centroid[1] );
		should.equal( 17/3, centroid[2] );

	});

});

describe("verb.eval.mesh.get_min_coordinate_on_axis",function(){

	it('should return correct value', function(){

		var points = [[5,10,2],[3,-4,5],[-10,-3, 10]]
			, tri = [0,1,2]
			, a1 = verb.eval.mesh.get_min_coordinate_on_axis( points, tri, 0 )
			, a2 = verb.eval.mesh.get_min_coordinate_on_axis( points, tri, 1 )
			, a3 = verb.eval.mesh.get_min_coordinate_on_axis( points, tri, 2 );

		should.equal( -10, a1 );
		should.equal( -4, a2 );
		should.equal( 2, a3 );

	});

});

describe("verb.eval.mesh.sort_tris_on_longest_axis",function(){

	it('should return correct result with y axis regular array', function(){

		//
		//  0  -  1
		//  | 0 / 3 \ 
		//  2   --  3
		//  | 1 \ 2 /
		//  4  -  5
		// 

		var points = [ [0,0,0], [1,-0.2,0], [0, -1, 0 ], [1, -1.2, 0], [0, -2, 0], [1, -2.2, 0]]
			, tris = [[0,2,1], [2,4,5], [2,5,3], [1,2,3]]
			, tri_indices = [0,1,2,3]
			, aabb = verb.eval.mesh.make_mesh_aabb(points, tris, tri_indices)
			, sort_tri_indices = verb.eval.mesh.sort_tris_on_longest_axis( aabb, points, tris, tri_indices );

		should.equal( 2, sort_tri_indices[0] );
		should.equal( 1, sort_tri_indices[1] );
		should.equal( 3, sort_tri_indices[2] );
		should.equal( 0, sort_tri_indices[3] );

	});

});

describe("verb.eval.mesh.sort_tris_on_longest_axis",function(){

	it('should return correct result', function(){

		// 0 \
		// 1 \\     0
		//     4    2
		// 2 //     1
		// 3 /      

		var points = [ [0,10,0], [0,5,0], [0, 0, 0 ], [0, -5, 0], [0, -2, 0], [1, -2.2, 0]]
			, tris = [[0,1,4], [2,3,4], [1,2,4]]
			, tri_indices = [0,1,2]
			, aabb = verb.eval.mesh.make_mesh_aabb(points, tris, tri_indices)
			, sort_tri_indices = verb.eval.mesh.sort_tris_on_longest_axis( aabb, points, tris, tri_indices );

		should.equal( 1, sort_tri_indices[0] );
		should.equal( 2, sort_tri_indices[1] );
		should.equal( 0, sort_tri_indices[2] );

	});

});

describe("verb.eval.mesh.make_mesh_aabb",function(){

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
			, tri_indices = [0,1,2,3]
			, aabb = verb.eval.mesh.make_mesh_aabb(points, tris, tri_indices);

		should.equal( 2, aabb.max[0] );
		should.equal( 0, aabb.min[0] );
		should.equal( 0, aabb.max[1] );
		should.equal( -2, aabb.min[1] );		
		should.equal( 0, aabb.max[2] );
		should.equal( 0, aabb.min[2] );

	});

});

describe("verb.eval.mesh.make_mesh_aabb",function(){

	it('make_mesh_aabb should return correct result for non-planar mesh', function(){

		//
		//  0  - 1
		//  |  /  \
		//  2   --  3
		//  |  \   /
		//  4  -  5
		// 

		var points = [ [0,0,-5], [1,0,0], [0, -1, 0 ], [2, -1, 0], [0, -2, 0], [1, -2, 4] ]
			, tris = [ [0,2,1], [1,2,3], [2,4,5], [2,5,3] ]
			, tri_indices = [0,1,2,3]
			, aabb = verb.eval.mesh.make_mesh_aabb(points, tris, tri_indices);

		should.equal( 2, aabb.max[0] );
		should.equal( 0, aabb.min[0] );
		should.equal( 0, aabb.max[1] );
		should.equal( -2, aabb.min[1] );		
		should.equal( 4, aabb.max[2] );
		should.equal( -5, aabb.min[2] );

	});

});

describe("verb.eval.mesh.make_mesh_aabb_tree",function(){

	it('make_mesh_aabb_tree should have the correct structure', function(){

		//
		//  0  - 1
		//  |  /  \
		//  2   --  3
		//  |  \   /
		//  4  -  5
		// 

		var points = [ [0,0,0], [1,0,0], [0, -1, 0 ], [2, -1, 0], [0, -2, 0], [1, -2, 0] ]
			, tris = [ [0,2,1], [1,2,3], [2,4,5], [2,5,3] ]
			, tri_indices = [0,1,2,3]
			, root = verb.eval.mesh.make_mesh_aabb_tree( points, tris, tri_indices );

		// root bb is correct
		should.equal( 2, root.bounding_box.max[0] );
		should.equal( 0, root.bounding_box.min[0] );
		should.equal( 0, root.bounding_box.max[1] );
		should.equal( -2, root.bounding_box.min[1] );		
		should.equal( 0, root.bounding_box.max[2] );
		should.equal( 0, root.bounding_box.min[2] );

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

		should.equal( 0, child1child1.children.length );
		should.equal( 0, child1child2.children.length );

		should.equal( 0, child2child1.children.length );
		should.equal( 0, child2child2.children.length );

		// the grandchildren have the correct triangles in them
		should.equal( 2, child1child1.triangle );
		should.equal( 3, child1child2.triangle );

		should.equal( 0, child2child1.triangle );
		should.equal( 1, child2child2.triangle );

	});

});

describe("verb.eval.mesh.intersect_aabb_trees",function(){

	it('intersect_aabb_trees should have the correct result', function(){

		//
		//  0  - 1
		//  |  /  \   
		//  2   --  3
		//  |  \   /
		//  4  -  5
		// 

		var points1 = [ [0,0,0], [1,0,0], [0, -1, 0 ], [2, -1, 0], [0, -2, 0], [1, -2, 0] ]
			, tris1 = [ [0,2,1], [1,2,3], [2,4,5], [2,5,3] ]
			, tri_indices1 = [0,1,2,3]
			, aabb1 = verb.eval.mesh.make_mesh_aabb_tree( points1, tris1, tri_indices1 )

			, points2 = [ [0.5,-2,0.5], [0.5,-2,-1], [1,0.5,-1 ] ]
			, tris2 = [ [0,1,2] ]
			, tri_indices2 = [0]
			, aabb2 = verb.eval.mesh.make_mesh_aabb_tree( points2, tris2, tri_indices2 )
			, inter_result = verb.eval.geom.intersect_aabb_trees( points1, tris1, points2, tris2, aabb1, aabb2 );

		// find all 4 triangle intersections
		should.equal( 4, inter_result.length );

		// find the specific intersections
		should.equal( 2, inter_result[0][0] );
		should.equal( 0, inter_result[0][1] );

		should.equal( 3, inter_result[1][0] );
		should.equal( 0, inter_result[1][1] );

		should.equal( 0, inter_result[2][0] );
		should.equal( 0, inter_result[2][1] );

		should.equal( 1, inter_result[3][0] );
		should.equal( 0, inter_result[3][1] );

	});

});

describe("BoundingBox.init() ",function(){

	it('should allow point arguments', function(){

		var bb1 = new verb.geom.BoundingBox( [5,5,5], [10,10,10]);

		should.equal( bb1.min[0], 5 );
		should.equal( bb1.min[1], 5 );
		should.equal( bb1.min[2], 5 );

		should.equal( bb1.max[0], 10 );
		should.equal( bb1.max[1], 10 );
		should.equal( bb1.max[2], 10 );
	
	});

});

describe("BoundingBox.intersects",function(){

	it('returns expected results', function(){

		var bb1 = new verb.geom.BoundingBox( [5,5,5], [10,10,10])
			, bb2 = new verb.geom.BoundingBox( [0,0,0], [10,10,10])
			, bb3 = new verb.geom.BoundingBox( [-2,-2,-2], [-1,-1,-1] );

		should.equal( bb1.intersects(bb2), true );
		should.equal( bb1.intersects(bb3), false );
		should.equal( bb2.intersects(bb3), false );		

	});

});

describe("BoundingBox.intersect",function(){

	it('returns expected results', function(){

		// initialize a bounding box
		var bb1 = new verb.geom.BoundingBox( [5,5,5], [10,10,10])
			, bb2 = new verb.geom.BoundingBox( [0,0,0], [10,10,10])
			, bb3 = new verb.geom.BoundingBox( [-2,-2,-2], [-1,-1,-1] );

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

describe("BoundingBox.intervals_overlap",function(){

	it('returns expected results', function(){

		should.equal( verb.geom.BoundingBox.prototype.intervals_overlap( 0, 1, 0, 10 ), true );
		should.equal( verb.geom.BoundingBox.prototype.intervals_overlap( 0, 1, 1, 10 ), true );
		should.equal( verb.geom.BoundingBox.prototype.intervals_overlap( 0, 1, 1+1e-3, 10 ), false );
		should.equal( verb.geom.BoundingBox.prototype.intervals_overlap( 0, 1, 2, 10 ), false );

	});

});

describe("BoundingBox.contains",function(){

	it('returns expected results', function(){

		var bb4 = new verb.geom.BoundingBox( [0,0,0], [1,1,1] )
			, bb5 = new verb.geom.BoundingBox();

		should.equal( bb4.contains( [0,0,0] ), true );
		should.equal( bb4.contains( [1,1,1] ), true );
		should.equal( bb4.contains( [1,1,1+1e-3] ), false );
		should.equal( bb4.contains( [1,1,1-1e-3] ), true );
		should.equal( bb5.contains( [0,0,0] ), false );

	});

});

describe("BoundingBox.contains",function(){

	it('BoundingBox.clear', function(){

		var bb1 = new verb.geom.BoundingBox( [5,5,5], [10,10,10] );
		bb1.clear();
		should.equal( bb1.initialized, false );

	});
});

describe("BoundingBox.get_axis_length",function(){

	it('should return correct value', function(){

		var bb1 = new verb.geom.BoundingBox( [-1,2,3], [10,10,10] );
		should.equal( bb1.get_axis_length(0), 11 );
		should.equal( bb1.get_axis_length(1), 8 );
		should.equal( bb1.get_axis_length(2), 7 );

	});

});

describe("BoundingBox.get_longest_axis",function(){

	it('should return correct value', function(){

		var bb1 = new verb.geom.BoundingBox( [-1,2,3], [10,10,10] );
		should.equal( bb1.get_longest_axis(0), 0 );

	});

});

describe("BoundingBox.get_axis_length",function(){

	it('should return 0 when given out of bounds index', function(){

		var bb1 = new verb.geom.BoundingBox( [-1,2,3], [10,10,10] );
		should.equal( bb1.get_axis_length(8), 0 );
		should.equal( bb1.get_axis_length(-1), 0 );
		should.equal( bb1.get_axis_length(4), 0 );
		should.equal( bb1.get_axis_length(3), 0 );

	});

});

describe("BoundingBox.get_axis_length",function(){

	it('should return 0 when given out of bounds index', function(){

		var bb1 = new verb.geom.BoundingBox( [-1,2,3], [10,10,10] );
		should.equal( bb1.get_axis_length(8), 0 );
		should.equal( bb1.get_axis_length(-1), 0 );
		should.equal( bb1.get_axis_length(4), 0 );
		should.equal( bb1.get_axis_length(3), 0 );

	});

});

describe("BoundingBox.clear",function(){

	it('should set initialized to false', function(){

		var bb1 = new verb.geom.BoundingBox( [5,5,5], [10,10,10] );
		bb1.clear();
		should.equal( bb1.initialized, false );

	});

});

describe("verb.eval.geom.closest_point_on_ray",function(){

	it('returns correct result for xaxis and 3d pt', function(){

		var r = [1,0,0]
			, o = [0,0,0]
			, pt = [3,4,-1];

		var proj = verb.eval.geom.closest_point_on_ray(pt, o, r);

		should.equal( Math.abs( proj[0] - 3 ) < verb.EPSILON, true );
		should.equal( Math.abs( proj[1] ) < verb.EPSILON, true );
		should.equal( Math.abs( proj[2] ) < verb.EPSILON, true );

	});

});

describe("verb.eval.nurbs.get_arc",function(){

	it('returns correct result for unit arc from 0 to 90 deg', function(){

		var center = [0,0,0]
			, x = [1,0,0]
			, y = [0,1,0]
			, r = 1
			, start = 0
			, end = Math.PI/2;

		var arc_components = verb.eval.nurbs.get_arc(center, x, y, 1, start, end);

		var p = verb.eval.nurbs.rational_curve_point( arc_components.degree, arc_components.knots, verb.eval.nurbs.homogenize_1d( arc_components.control_points, arc_components.weights), 0.5);

		should.equal( Math.abs( p[0] - Math.sqrt(2)/2 ) < verb.EPSILON, true );
		should.equal( Math.abs( p[1] - Math.sqrt(2)/2 ) < verb.EPSILON, true );
		should.equal( p[2], 0 );

	});

	it('returns correct result for unit arc from 0 to 45 deg', function(){

		var center = [0,0,0]
			, x = [1,0,0]
			, y = [0,1,0]
			, r = 1
			, start = 0
			, end = Math.PI/4;

		var arc_components = verb.eval.nurbs.get_arc(center, x, y, 1, start, end);

		var p = verb.eval.nurbs.rational_curve_point( arc_components.degree, arc_components.knots, verb.eval.nurbs.homogenize_1d( arc_components.control_points, arc_components.weights), 1);

		should.equal( Math.abs( p[0] - Math.sqrt(2)/2 ) < verb.EPSILON, true );
		should.equal( Math.abs( p[1] - Math.sqrt(2)/2 ) < verb.EPSILON, true );
		should.equal( p[2], 0 );

	});

	it('returns correct result for unit arc from 45 to 135 deg', function(){

		var center = [0,0,0]
			, x = [1,0,0]
			, y = [0,1,0]
			, r = 1
			, start = Math.PI/4
			, end = 3*Math.PI/4;

		var arc_components = verb.eval.nurbs.get_arc(center, x, y, 1, start, end);

		var p = verb.eval.nurbs.rational_curve_point( arc_components.degree, arc_components.knots, verb.eval.nurbs.homogenize_1d( arc_components.control_points, arc_components.weights), 0.5);

		should.equal( Math.abs( p[0] ) < verb.EPSILON, true );
		should.equal( Math.abs( p[1] - 1 ) < verb.EPSILON, true );
		should.equal( p[2], 0 );

	});

	it('returns correct result for unit circle', function(){

		var center = [0,0,0]
			, x = [1,0,0]
			, y = [0,1,0]
			, r = 5
			, start = 0
			, end = Math.PI;

		var arc_components = verb.eval.nurbs.get_arc(center, x, y, r, start, end);

		var p = verb.eval.nurbs.rational_curve_point( arc_components.degree, arc_components.knots, verb.eval.nurbs.homogenize_1d( arc_components.control_points, arc_components.weights), 0.5);

		p[0].should.be.approximately( 0, verb.EPSILON );
		p[1].should.be.approximately( 5 , verb.EPSILON);
		p[2].should.be.approximately( 0, verb.EPSILON );

	});

	it('returns correct result for unit circle', function(){

		var center = [0,0,0]
			, x = [1,0,0]
			, y = [0,1,0]
			, r = 1
			, start = 0
			, end = Math.PI * 2;

		var arc_components = verb.eval.nurbs.get_arc(center, x, y, 1, start, end);

		var p = verb.eval.nurbs.rational_curve_point( arc_components.degree, arc_components.knots, verb.eval.nurbs.homogenize_1d( arc_components.control_points, arc_components.weights), 0.5);

		should.equal( Math.abs( p[0] + 1) < verb.EPSILON, true );
		should.equal( Math.abs( p[1] ) < verb.EPSILON, true );
		should.equal( p[2], 0 );

	});

});

describe("verb.eval.nurbs.get_revolved_surface",function(){

	it('creates a 90 degree cone with the given line for a profile', function(){

		var axis = [0,0,1]
			, center = [0,0,0]
			, angle = Math.PI/2
			, prof_degree = 1
			, prof_ctrl_pts = [[0,0,1], [1,0,0]]
			, prof_knots = [0,0,1,1]
			, prof_weights = [1,1];

		var comps = verb.eval.nurbs.get_revolved_surface(center, axis, angle, prof_knots, prof_degree, prof_ctrl_pts, prof_weights);

		// the first row are the profile control pts
		should.equal( 0, comps.control_points[0][0][0] );
		should.equal( 0, comps.control_points[0][0][1] );
		should.equal( 1, comps.control_points[0][0][2] );

		should.equal( 1, comps.control_points[0][1][0] );
		should.equal( 0, comps.control_points[0][1][1] );
		should.equal( 0, comps.control_points[0][1][2] );

		var p = verb.eval.nurbs.rational_surface_point( 2, 
														comps.knots_u, 
														1, 
														comps.knots_v, 
														verb.eval.nurbs.homogenize_2d( comps.control_points, comps.weights), 
														0.5, 
														0.5);

		should.equal( Math.abs( Math.sqrt(2)/4 - p[0]) < verb.EPSILON, true );
		should.equal( Math.abs( Math.sqrt(2)/4 - p[1]) < verb.EPSILON, true );
		should.equal( Math.abs( 0.5 - p[2]) < verb.EPSILON, true );

	});

	it('creates a 180 degree cone with the given line for a profile', function(){

		var axis = [0,0,1]
			, center = [0,0,0]
			, angle = Math.PI
			, prof_degree = 1
			, prof_ctrl_pts = [[0,0,1], [1,0,0]]
			, prof_knots = [0,0,1,1]
			, prof_weights = [1,1];

		var comps = verb.eval.nurbs.get_revolved_surface(center, axis, angle, prof_knots, prof_degree, prof_ctrl_pts, prof_weights);

		// the first row are the profile control pts
		should.equal( 0, comps.control_points[0][0][0] );
		should.equal( 0, comps.control_points[0][0][1] );
		should.equal( 1, comps.control_points[0][0][2] );

		should.equal( 1, comps.control_points[0][1][0] );
		should.equal( 0, comps.control_points[0][1][1] );
		should.equal( 0, comps.control_points[0][1][2] );

		var p = verb.eval.nurbs.rational_surface_point( 2, 
														comps.knots_u, 
														1, 
														comps.knots_v, 
														verb.eval.nurbs.homogenize_2d( comps.control_points, comps.weights), 
														0.5, 
														0.5);

		should.equal( p[0] < verb.EPSILON, true );
		should.equal( Math.abs( 0.5 - p[1]) < verb.EPSILON, true );
		should.equal( Math.abs( 0.5 - p[2]) < verb.EPSILON, true );

	});


	it('creates a 360 degree cone with the given line for a profile', function(){

		var axis = [0,0,1]
			, center = [0,0,0]
			, angle = Math.PI * 2
			, prof_degree = 1
			, prof_ctrl_pts = [[0,0,1], [1,0,0]]
			, prof_knots = [0,0,1,1]
			, prof_weights = [1,1];

		var comps = verb.eval.nurbs.get_revolved_surface(center, axis, angle, prof_knots, prof_degree, prof_ctrl_pts, prof_weights);

		// the first row are the profile control pts
		should.equal( 0, comps.control_points[0][0][0] );
		should.equal( 0, comps.control_points[0][0][1] );
		should.equal( 1, comps.control_points[0][0][2] );

		should.equal( 1, comps.control_points[0][1][0] );
		should.equal( 0, comps.control_points[0][1][1] );
		should.equal( 0, comps.control_points[0][1][2] );

		var p = verb.eval.nurbs.rational_surface_point( 2, 
														comps.knots_u, 
														1, 
														comps.knots_v, 
														verb.eval.nurbs.homogenize_2d( comps.control_points, comps.weights), 
														0.5, 
														0.5);

		p[0].should.be.approximately(-0.5, verb.EPSILON );
		p[1].should.be.approximately(0, verb.EPSILON );
		p[2].should.be.approximately(0.5, verb.EPSILON );

	});

});

describe("verb.eval.nurbs.get_extruded_surface",function(){

	it('can extrude a line into a plane', function(){

		var axis = [0,0,1]
			, length = 5
			, prof_degree = 1
			, prof_ctrl_pts = [[0,1,0], [1,0,0]]
			, prof_knots = [0,0,1,1]
			, prof_weights = [1,1];

		var comps = verb.eval.nurbs.get_extruded_surface(axis, length, prof_knots, prof_degree, prof_ctrl_pts, prof_weights);

		// the first row are the profile control pts
		should.equal( 0, comps.control_points[0][0][0] );
		should.equal( 1, comps.control_points[0][0][1] );
		should.equal( 0, comps.control_points[0][0][2] );

		should.equal( 1, comps.control_points[0][1][0] );
		should.equal( 0, comps.control_points[0][1][1] );
		should.equal( 0, comps.control_points[0][1][2] );

		// sample at the center
		var p = verb.eval.nurbs.rational_surface_point( comps.degree_u,
														comps.knots_u, 
														comps.degree_v,
														comps.knots_v, 
														verb.eval.nurbs.homogenize_2d( comps.control_points, comps.weights), 
														0.5, 
														0.5);

		should.equal( Math.abs( 0.5- p[0]) < verb.EPSILON, true );
		should.equal( Math.abs( 0.5 - p[1]) < verb.EPSILON, true );
		should.equal( Math.abs( 2.5 - p[2]) < verb.EPSILON, true );

	});

	it('can extrude a 90 deg quadratic arc bezier curve', function(){

		var axis = [0,0,1]
			, length = 5
			, prof_degree = 2
			, prof_ctrl_pts = [[0,1,0], [1,1,0], [1,0,0]]
			, prof_knots = [0,0,0,1,1,1]
			, prof_weights = [1, Math.sqrt(2) / 2, 1];

		var comps = verb.eval.nurbs.get_extruded_surface(axis, length, prof_knots, prof_degree, prof_ctrl_pts, prof_weights);

		// the first row are the profile control pts
		should.equal( 0, comps.control_points[0][0][0] );
		should.equal( 1, comps.control_points[0][0][1] );
		should.equal( 0, comps.control_points[0][0][2] );

		should.equal( 1, comps.control_points[0][1][0] );
		should.equal( 1, comps.control_points[0][1][1] );
		should.equal( 0, comps.control_points[0][1][2] );

		should.equal( 1, comps.control_points[0][2][0] );
		should.equal( 0, comps.control_points[0][2][1] );
		should.equal( 0, comps.control_points[0][2][2] );

		// sample at the center
		var p = verb.eval.nurbs.rational_surface_point( comps.degree_u,
														comps.knots_u, 
														comps.degree_v,
														comps.knots_v, 
														verb.eval.nurbs.homogenize_2d( comps.control_points, comps.weights), 
														0.5, 
														0.5);

		should.equal( Math.abs( Math.sqrt(2)/2 - p[0]) < verb.EPSILON, true );
		should.equal( Math.abs( Math.sqrt(2)/2 - p[1]) < verb.EPSILON, true );
		should.equal( Math.abs( 2.5 - p[2]) < verb.EPSILON, true );

	});

});

describe("verb.eval.nurbs.get_cylinder_surface",function(){

	it('can create a cylinder', function(){

		var axis = [0,0,1]
			, xaxis = [1,0,0]
			, base = [0,0,0]
			, height = 5
			, radius = 5;

		var comps = verb.eval.nurbs.get_cylinder_surface(axis, xaxis, base, height, radius);

		comps.degree_u.should.equal(1);
		comps.degree_v.should.equal(2);

		// sample at the center
		var p = verb.eval.nurbs.rational_surface_point( comps.degree_u,
														comps.knots_u, 
														comps.degree_v,
														comps.knots_v, 
														verb.eval.nurbs.homogenize_2d( comps.control_points, comps.weights), 
														0.5, 
														0.5);

		p[0].should.be.approximately(-radius, verb.EPSILON);
		p[1].should.be.approximately(0, verb.EPSILON);
		p[2].should.be.approximately(radius/2, verb.EPSILON);

		p = verb.eval.nurbs.rational_surface_point( comps.degree_u,
														comps.knots_u, 
														comps.degree_v,
														comps.knots_v, 
														verb.eval.nurbs.homogenize_2d( comps.control_points, comps.weights), 
														0, 
														0);

		p[0].should.be.approximately(radius, verb.EPSILON);
		p[1].should.be.approximately(0, verb.EPSILON);
		p[2].should.be.approximately(0, verb.EPSILON);

		p = verb.eval.nurbs.rational_surface_point( comps.degree_u,
														comps.knots_u, 
														comps.degree_v,
														comps.knots_v, 
														verb.eval.nurbs.homogenize_2d( comps.control_points, comps.weights), 
														1, 
														0);

		p[0].should.be.approximately(radius, verb.EPSILON);
		p[1].should.be.approximately(0, verb.EPSILON);
		p[2].should.be.approximately(height, verb.EPSILON);

		p = verb.eval.nurbs.rational_surface_point( comps.degree_u,
														comps.knots_u, 
														comps.degree_v,
														comps.knots_v, 
														verb.eval.nurbs.homogenize_2d( comps.control_points, comps.weights), 
														0, 
														1);
		
		p[0].should.be.approximately(radius, verb.EPSILON);
		p[1].should.be.approximately(0, verb.EPSILON);
		p[2].should.be.approximately(0, verb.EPSILON);

	});

});

describe("verb.eval.nurbs.get_polyline_curve",function(){

	it('can create a polyline with correct structure', function(){

		var degree = 1
			, knots = [0, 0, 0.25, 0.5, 0.75, 1, 1]
			, control_points = [ [0, 0, 0], [10, 10, 0], [14, 20, 0], [10, 32, 4], [12, 16, 22] ]
			, weights = [1, 1, 1, 1, 1];

		var comps = verb.eval.nurbs.get_polyline_curve( control_points );

		comps.degree.should.equal(degree);
		comps.knots.should.eql(knots);
		comps.control_points.should.eql(control_points);
		comps.weights.should.eql(weights);

	});

});

describe("verb.eval.nurbs.get_cone_surface",function(){

	it('can create a cone', function(){

		var axis = [0,0,1]
			, xaxis = [1,0,0]
			, base = [0,0,0]
			, height = 5
			, radius = 10;

		var comps = verb.eval.nurbs.get_cone_surface(axis, xaxis, base, height, radius);

		comps.degree_u.should.equal(2);
		comps.degree_v.should.equal(1);

		// sample at the center
		var p = verb.eval.nurbs.rational_surface_point( comps.degree_u,
														comps.knots_u, 
														comps.degree_v,
														comps.knots_v, 
														verb.eval.nurbs.homogenize_2d( comps.control_points, comps.weights), 
														0.5, 
														0.5);

		p[0].should.be.approximately(-radius/2, verb.EPSILON);
		p[1].should.be.approximately(0, verb.EPSILON);
		p[2].should.be.approximately(height/2, verb.EPSILON);

		p = verb.eval.nurbs.rational_surface_point( comps.degree_u,
														comps.knots_u, 
														comps.degree_v,
														comps.knots_v, 
														verb.eval.nurbs.homogenize_2d( comps.control_points, comps.weights), 
														0, 
														0);

		p[0].should.be.approximately(0, verb.EPSILON);
		p[1].should.be.approximately(0, verb.EPSILON);
		p[2].should.be.approximately(height, verb.EPSILON);

		p = verb.eval.nurbs.rational_surface_point( comps.degree_u,
														comps.knots_u, 
														comps.degree_v,
														comps.knots_v, 
														verb.eval.nurbs.homogenize_2d( comps.control_points, comps.weights), 
														1, 
														0);

		p[0].should.be.approximately(0, verb.EPSILON);
		p[1].should.be.approximately(0, verb.EPSILON);
		p[2].should.be.approximately(height, verb.EPSILON);

		p = verb.eval.nurbs.rational_surface_point( comps.degree_u,
														comps.knots_u, 
														comps.degree_v,
														comps.knots_v, 
														verb.eval.nurbs.homogenize_2d( comps.control_points, comps.weights), 
														0, 
														1);
		
		p[0].should.be.approximately(radius, verb.EPSILON);
		p[1].should.be.approximately(0, verb.EPSILON);
		p[2].should.be.approximately(0, verb.EPSILON);
	});

});


describe("verb.eval.nurbs.get_4pt_surface",function(){

	it('can create an inclined plane', function(){

		var p1 = [0,0,0]
			, p2 = [1,0,0]
			, p3 = [1,1,1]
			, p4 = [0,1,1];

		var comps = verb.eval.nurbs.get_4pt_surface(p1, p2, p3, p4);

		comps.degree_u.should.equal(1);
		comps.degree_v.should.equal(1);
		comps.knots_u.should.eql([0,0,1,1]);
		comps.knots_u.should.eql([0,0,1,1]);
		comps.weights.should.eql([ [1,1], [1, 1] ]);
		comps.control_points.should.eql([ [p1, p4], [p2, p3] ]);

		// sample at the center
		var p = verb.eval.nurbs.rational_surface_point( comps.degree_u,
														comps.knots_u, 
														comps.degree_v,
														comps.knots_v, 
														verb.eval.nurbs.homogenize_2d( comps.control_points, comps.weights), 
														0.5, 
														0.5);

		p[0].should.be.approximately(0.5, verb.EPSILON );
		p[1].should.be.approximately(0.5, verb.EPSILON );
		p[2].should.be.approximately(0.5, verb.EPSILON );

	});

	it('can create a hypar', function(){

		var p1 = [0,0,1]
			, p2 = [1,0,0]
			, p3 = [1,1,1]
			, p4 = [0,1,0];

		var comps = verb.eval.nurbs.get_4pt_surface(p1, p2, p3, p4);

		comps.degree_u.should.equal(1);
		comps.degree_v.should.equal(1);
		comps.knots_u.should.eql([0,0,1,1]);
		comps.knots_u.should.eql([0,0,1,1]);
		comps.weights.should.eql([ [1,1], [1, 1] ]);
		comps.control_points.should.eql([ [p1, p4], [p2, p3] ]);

		// sample at the center
		var p = verb.eval.nurbs.rational_surface_point( comps.degree_u,
														comps.knots_u, 
														comps.degree_v,
														comps.knots_v, 
														verb.eval.nurbs.homogenize_2d( comps.control_points, comps.weights), 
														0.5, 
														0.5);

		p[0].should.be.approximately(0.5, verb.EPSILON );
		p[1].should.be.approximately(0.5, verb.EPSILON );
		p[2].should.be.approximately(0.5, verb.EPSILON );

		// bottom left
		p = verb.eval.nurbs.rational_surface_point( comps.degree_u,
														comps.knots_u, 
														comps.degree_v,
														comps.knots_v, 
														verb.eval.nurbs.homogenize_2d( comps.control_points, comps.weights), 
														0, 
														0);

		p[0].should.be.approximately(0, verb.EPSILON );
		p[1].should.be.approximately(0, verb.EPSILON );
		p[2].should.be.approximately(1, verb.EPSILON );

		// bottom right
		p = verb.eval.nurbs.rational_surface_point( comps.degree_u,
														comps.knots_u, 
														comps.degree_v,
														comps.knots_v, 
														verb.eval.nurbs.homogenize_2d( comps.control_points, comps.weights), 
														1, 
														0);

		p[0].should.be.approximately(1, verb.EPSILON );
		p[1].should.be.approximately(0, verb.EPSILON );
		p[2].should.be.approximately(0, verb.EPSILON );

	});

});

describe("verb.eval.nurbs.get_sphere_surface",function(){

	it('can create a unit sphere', function(){

		var center = [0,0,0]
			, axis = [0,0,1]
			, xaxis = [1,0,0]
			, radius = 1;

		var comps = verb.eval.nurbs.get_sphere_surface(center, axis, xaxis, radius);

		comps.degree_u.should.equal(2);
		comps.degree_v.should.equal(2);

		// sample at the center
		var p = verb.eval.nurbs.rational_surface_point( comps.degree_u,
														comps.knots_u, 
														comps.degree_v,
														comps.knots_v, 
														verb.eval.nurbs.homogenize_2d( comps.control_points, comps.weights), 
														0.5, 
														0.5);

		p[0].should.be.approximately(-1, verb.EPSILON );
		p[1].should.be.approximately(0, verb.EPSILON );
		p[2].should.be.approximately(0, verb.EPSILON );

	});

});


describe("verb.eval.nurbs.get_ellipse_arc",function(){

	it('returns correct result for unit arc from 0 to 90 deg', function(){

		var center = [0,0,0]
			, x = [1,0,0]
			, y = [0,1,0]
			, rx = 5
			, ry = 1
			, start = 0
			, end = Math.PI/2;

		var ellipse = verb.eval.nurbs.get_ellipse_arc(center, x, y, rx, ry, start, end);

		// the typical parametric rep of an ellipse
		var xmid = rx * Math.cos( Math.PI / 4 )
			, ymid = ry * Math.sin( Math.PI / 4 );

		var p = verb.eval.nurbs.rational_curve_point( ellipse.degree, ellipse.knots, verb.eval.nurbs.homogenize_1d( ellipse.control_points, ellipse.weights), 0.5);

		p[0].should.be.approximately( xmid, verb.EPSILON );
		p[1].should.be.approximately( ymid, verb.EPSILON );
		p[2].should.be.approximately( 0, verb.EPSILON );

		p = verb.eval.nurbs.rational_curve_point( ellipse.degree, ellipse.knots, verb.eval.nurbs.homogenize_1d( ellipse.control_points, ellipse.weights), 1);

		p[0].should.be.approximately( 0, verb.EPSILON );
		p[1].should.be.approximately( ry, verb.EPSILON );
		p[2].should.be.approximately( 0, verb.EPSILON );

		p = verb.eval.nurbs.rational_curve_point( ellipse.degree, ellipse.knots, verb.eval.nurbs.homogenize_1d( ellipse.control_points, ellipse.weights), 0);

		p[0].should.be.approximately( rx, verb.EPSILON );
		p[1].should.be.approximately( 0, verb.EPSILON );
		p[2].should.be.approximately( 0, verb.EPSILON );

	});

	it('returns correct result for unit arc from 0 to 90 deg', function(){

		var center = [0,0,0]
			, x = [1,0,0]
			, y = [0,1,0]
			, rx = 5
			, ry = 1
			, start = 0
			, end = Math.PI / 2;

		var arc_components = verb.eval.nurbs.get_ellipse_arc(center, x, y, rx, ry, start, end);

		var p = verb.eval.nurbs.rational_curve_point( arc_components.degree, arc_components.knots, verb.eval.nurbs.homogenize_1d( arc_components.control_points, arc_components.weights), 1);
		
		p[0].should.be.approximately( 0, verb.EPSILON );
		p[1].should.be.approximately( ry, verb.EPSILON );
		p[2].should.be.approximately( 0, verb.EPSILON );

	});

	it('returns correct result for unit arc from 45 to 135 deg', function(){

		var center = [0,0,0]
			, x = [1,0,0]
			, y = [0,1,0]
			, rx = 1
			, ry = 10
			, start = Math.PI/4
			, end = 3 * Math.PI/4;

		var arc_components = verb.eval.nurbs.get_ellipse_arc(center, x, y, rx, ry, start, end);

		var p = verb.eval.nurbs.rational_curve_point( arc_components.degree, arc_components.knots, verb.eval.nurbs.homogenize_1d( arc_components.control_points, arc_components.weights), 1);
		
		// the typical parametric rep of an ellipse
		var xmid = rx * Math.cos( 3 * Math.PI / 4 )
			, ymid = ry * Math.sin( 3 * Math.PI / 4 );

		p[0].should.be.approximately( xmid, verb.EPSILON );
		p[1].should.be.approximately( ymid, verb.EPSILON );
		p[2].should.be.approximately( 0, verb.EPSILON );

	});

	it('returns correct result for complete ellipse', function(){

		var center = [0,0,0]
			, x = [1,0,0]
			, y = [0,1,0]
			, rx = 1
			, ry = 10
			, start = 0
			, end = Math.PI * 2;

		var ellipse = verb.eval.nurbs.get_ellipse_arc(center, x, y, rx, ry, start, end);

		// the typical parametric rep of an ellipse
		var xmid = rx * Math.cos( Math.PI / 4 )
			, ymid = ry * Math.sin( Math.PI / 4 );

		var p = verb.eval.nurbs.rational_curve_point( ellipse.degree, ellipse.knots, verb.eval.nurbs.homogenize_1d( ellipse.control_points, ellipse.weights), 0.125);

		p[0].should.be.approximately( xmid, verb.EPSILON );
		p[1].should.be.approximately( ymid, verb.EPSILON );
		p[2].should.be.approximately( 0, verb.EPSILON );

		p = verb.eval.nurbs.rational_curve_point( ellipse.degree, ellipse.knots, verb.eval.nurbs.homogenize_1d( ellipse.control_points, ellipse.weights), 0.25);

		p[0].should.be.approximately( 0, verb.EPSILON );
		p[1].should.be.approximately( ry, verb.EPSILON );
		p[2].should.be.approximately( 0, verb.EPSILON );

		p = verb.eval.nurbs.rational_curve_point( ellipse.degree, ellipse.knots, verb.eval.nurbs.homogenize_1d( ellipse.control_points, ellipse.weights), 0.5);

		p[0].should.be.approximately( -rx, verb.EPSILON );
		p[1].should.be.approximately( 0, verb.EPSILON );
		p[2].should.be.approximately( 0, verb.EPSILON );

		p = verb.eval.nurbs.rational_curve_point( ellipse.degree, ellipse.knots, verb.eval.nurbs.homogenize_1d( ellipse.control_points, ellipse.weights), 0);

		p[0].should.be.approximately( rx, verb.EPSILON );
		p[1].should.be.approximately( 0, verb.EPSILON );
		p[2].should.be.approximately( 0, verb.EPSILON );

	});

});

describe("WatchObject",function(){

	it('can be created by its constructor', function(){

		var wo = new verb.core.WatchObject();
		should.exist(wo);

	});

});

describe("Interval",function(){

	it('can be created by its constructor', function(){

		var interval = new verb.geom.Interval( 0, 0.5);
		should.exist(interval)
		interval.get("min").should.equal( 0 );
		interval.get("max").should.equal( 0.5 );

	});

});

describe("verb.init",function(){

	it('sets the nurbsEngine property for NurbsGeometry', function(){

		verb.init();

		verb.geom.NurbsGeometry.prototype.nurbsEngine.should.be.instanceof(verb.core.Engine);

	});

});

describe("Arc.constructor",function(){

	it('has correct properties', function(){

		verb.init();
		var arc = new verb.geom.Arc([0,0,0], [1,0,0], [0,1,0], 5, new verb.geom.Interval(0, Math.PI/ 2) );

		should.exist( arc );

		arc.get("radius").should.be.equal(5);
		arc.get("center").should.eql([0,0,0]);
		arc.get("xaxis").should.eql([1,0,0]);
		arc.get("yaxis").should.eql([0,1,0]);
		arc.get("interval").get('min').should.be.equal(0);
		arc.get("interval").get('max').should.be.equal(Math.PI/2);

	});

});

describe("Arc.point",function(){

	it('returns expected results', function(){

		verb.init();

		var arc = new verb.geom.Arc([0,0,1], [1,0,0], [0,1,0], 1, new verb.geom.Interval(0, Math.PI/ 2) );
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

		verb.init();
		
		var arc = new verb.geom.Arc([0,0,1], [1,0,0], [0,1,0], 1, new verb.geom.Interval(0, Math.PI/ 2) );
		
		arc.point(0.5, function(res){	 

			res.should.be.instanceof(Array).and.have.lengthOf(3);
			res[0].should.be.approximately( Math.sqrt(2)/2, 0.001 );
			res[1].should.be.approximately( Math.sqrt(2)/2, 0.001 );
			res[2].should.be.approximately( 1, 0.001 );

			done();
		});

	});

});

describe("Arc.tesselate",function(){

	it('should return a list of vertices', function(){

		verb.init();

		var arc = new verb.geom.Arc([0,0,1], [1,0,0], [0,1,0], 1, new verb.geom.Interval(0, Math.PI/ 2) );
		var pts = arc.tesselate();

		pts.length.should.be.greaterThan(2);

		pts.map( function(e){  e.length.should.be.equal(3); });

	});

});

describe("FourPointSurface.constructor",function(){

	it('can create an instance', function(){

		verb.init();

		var p1 = [0,0,1]
			, p2 = [1,0,0]
			, p3 = [1,1,1]
			, p4 = [0,1,0];

		var srf = new verb.geom.FourPointSurface( p1, p2, p3, p4 );

		should.exist(srf);

	});

});

describe("FourPointSurface.point",function(){

	it('evaluates correctly for hypar', function(){

		verb.init();

		var p1 = [0,0,1]
			, p2 = [1,0,0]
			, p3 = [1,1,1]
			, p4 = [0,1,0];

		var srf = new verb.geom.FourPointSurface( p1, p2, p3, p4 );

		should.exist(srf);

		var p = srf.point(0.5,0.5);

		p[0].should.be.approximately(0.5, verb.EPSILON );
		p[1].should.be.approximately(0.5, verb.EPSILON );
		p[2].should.be.approximately(0.5, verb.EPSILON );

	});

});

describe("FourPointSurface.derivatives",function(){

	it('gives nice result', function(){

		verb.init();

		var p1 = [0,0,1]
			, p2 = [1,0,0]
			, p3 = [1,1,1]
			, p4 = [0,1,0];

		var srf = new verb.geom.FourPointSurface( p1, p2, p3, p4 );

		should.exist(srf);

		var p = srf.derivatives(0.5, 0.5, 1);

		p[0][0].should.eql([0.5,0.5,0.5]);
		p[0][1].should.eql([0,1,0]);
		p[1][0].should.eql([1,0,0]);

	});

});

describe("FourPointSurface.tesselate",function(){

	it('gives mesh result', function(){

		verb.init();

		var p1 = [0,0,1]
			, p2 = [1,0,0]
			, p3 = [1,1,1]
			, p4 = [0,1,0];

		var srf = new verb.geom.FourPointSurface( p1, p2, p3, p4 );

		should.exist(srf);

		var p = srf.tesselate();

		p.uvs.length.should.be.equal(441);
		p.points.length.should.be.equal(441);
		p.faces.length.should.be.equal(800);

		p.points.map(function(e){ e.length.should.be.equal(3); });
		p.uvs.map(function(e){ e.length.should.be.equal(2); });
		p.faces.map(function(e){ e.length.should.be.equal(3); });


	});

});


describe("Line.constructor",function(){

	it('can create an instance', function(){

		verb.init();

		var p1 = [0,0,1]
			, p2 = [1,0,0];

		var c = new verb.geom.Line( p1, p2 );

		should.exist(c);

	});

});

describe("Line.point",function(){

	it('evaluates correctly', function(){

		verb.init();

		var p1 = [0,0,0]
			, p2 = [1,1,1];

		var c = new verb.geom.Line( p1, p2 );

		should.exist(c);

		var p = c.point(0.5);

		p[0].should.be.approximately(0.5, verb.EPSILON );
		p[1].should.be.approximately(0.5, verb.EPSILON );
		p[2].should.be.approximately(0.5, verb.EPSILON );

	});

});

describe("Line.derivatives",function(){

	it('gives nice result', function(){

		verb.init();

		var p1 = [0,0,0]
			, p2 = [1,1,1];

		var c = new verb.geom.Line( p1, p2 );

		should.exist(c);

		var p = c.derivatives(0.5, 1);

		p[0].should.eql([0.5,0.5,0.5]);
		p[1].should.eql([1,1,1]);

	});

});

describe("Line.tesselate",function(){

	it('gives mesh result', function(){

		verb.init();

		var p1 = [0,0,0]
			, p2 = [1,1,1];

		var c = new verb.geom.Line( p1, p2 );

		should.exist(c);

		var p = c.tesselate();

		p.length.should.be.equal(2);
		p[0].length.should.be.equal(3);
		p[1].length.should.be.equal(3);

	});

});

describe("BezierCurve.constructor",function(){

	it('can create an instance', function(){

		verb.init();

		var p1 = [0,0,0]
			, p2 = [1,0,1]
			, p3 = [2,0,-1]
			, p4 = [3,0,0];

		var c = new verb.geom.BezierCurve( [p1, p2, p3, p4] );

		should.exist(c);

	});

});

describe("BezierCurve.point",function(){

	it('evaluates correctly', function(){

		verb.init();

		var p1 = [0,0,0]
			, p2 = [1,0,1]
			, p3 = [2,0,-1]
			, p4 = [3,0,0];

		var c = new verb.geom.BezierCurve( [p1, p2, p3, p4] );

		should.exist(c);

		var p = c.point(0.5);

		p.should.eql([1.5,0,0]);

	});

});

describe("BezierCurve.derivatives",function(){

	it('gives nice result', function(){

		verb.init();


		var p1 = [0,0,0]
			, p2 = [1,0,1]
			, p3 = [2,0,-1]
			, p4 = [3,0,0];

		var c = new verb.geom.BezierCurve( [p1, p2, p3, p4] );

		should.exist(c);

		var p = c.derivatives(0.5, 1);

		p[0].should.eql([1.5,0,0]);
		p[1].should.eql([3, 0, -1.5]);

	});

});

describe("BezierCurve.tesselate",function(){

	it('gives mesh result', function(){

		verb.init();

		var p1 = [0,0,0]
			, p2 = [1,0,1]
			, p3 = [2,0,-1]
			, p4 = [3,0,0];

		var c = new verb.geom.BezierCurve( [p1, p2, p3, p4] );

		should.exist(c);

		var pts = c.tesselate();

		pts.length.should.be.greaterThan(2);

		pts.map( function(e){  e.length.should.be.equal(3); });

	});

});

describe("Circle.constructor",function(){

	it('can create an instance', function(){

		verb.init();

		var c = new verb.geom.Circle([0,0,0], [1,0,0], [0,1,0], 5);

		should.exist(c);

	});

});

describe("Circle.point",function(){

	it('evaluates correctly', function(){

		verb.init();

		var c = new verb.geom.Circle([0,0,0], [1,0,0], [0,1,0], 5);

		should.exist(c);

		var p = c.point(0.5);

		p[0].should.be.approximately(-5, verb.TOLERANCE );
		p[1].should.be.approximately(0, verb.TOLERANCE );
		p[2].should.be.approximately(0, verb.TOLERANCE );

	});

});

describe("Circle.derivatives",function(){

	it('gives correct result', function(){

		verb.init();

		var c = new verb.geom.Circle([0,0,0], [1,0,0], [0,1,0], 5);

		should.exist(c);

		var p = c.derivatives(0.5, 1);

		p[0][0].should.be.approximately(-5, verb.TOLERANCE );
		p[0][1].should.be.approximately(0, verb.TOLERANCE );
		p[0][2].should.be.approximately(0, verb.TOLERANCE );

		// normalize the derivative
		p[1] = numeric.div( p[1], numeric.norm2(p[1]) );

		p[1][0].should.be.approximately(0, verb.TOLERANCE );
		p[1][1].should.be.approximately(-1, verb.TOLERANCE );
		p[1][2].should.be.approximately(0, verb.TOLERANCE );

	});

});

describe("Circle.tesselate",function(){

	it('gives correct result', function(){

		verb.init();

		var c = new verb.geom.Circle([0,0,0], [1,0,0], [0,1,0], 5);

		should.exist(c);

		var pts = c.tesselate();

		pts.length.should.be.greaterThan(2);
		pts.map( function(e){  e.length.should.be.equal(3); });

	});

});



describe("Ellipse.constructor",function(){

	it('can create an instance', function(){

		verb.init();

		var c = new verb.geom.Ellipse([0,0,0], [1,0,0], [0,1,0], 5, 10);

		should.exist(c);

	});

});

describe("Ellipse.point",function(){

	it('evaluates correctly', function(){

		verb.init();

		var c = new verb.geom.Ellipse([0,0,0], [1,0,0], [0,1,0], 5, 10);

		should.exist(c);

		var p = c.point(0.5);

		p[0].should.be.approximately(-5, verb.TOLERANCE );
		p[1].should.be.approximately(0, verb.TOLERANCE );
		p[2].should.be.approximately(0, verb.TOLERANCE );

		var p = c.point(0.25);

		p[0].should.be.approximately(0, verb.TOLERANCE );
		p[1].should.be.approximately(10, verb.TOLERANCE );
		p[2].should.be.approximately(0, verb.TOLERANCE );

	});

});

describe("Ellipse.derivatives",function(){

	it('gives correct result', function(){

		verb.init();

		var c = new verb.geom.Ellipse([0,0,0], [1,0,0], [0,1,0], 5, 10);

		should.exist(c);

		var p = c.derivatives(0.5, 1);

		p[0][0].should.be.approximately(-5, verb.TOLERANCE );
		p[0][1].should.be.approximately(0, verb.TOLERANCE );
		p[0][2].should.be.approximately(0, verb.TOLERANCE );

		// normalize the derivative
		p[1] = numeric.div( p[1], numeric.norm2(p[1]) );

		p[1][0].should.be.approximately(0, verb.TOLERANCE );
		p[1][1].should.be.approximately(-1, verb.TOLERANCE );
		p[1][2].should.be.approximately(0, verb.TOLERANCE );

		p = c.derivatives(0.25, 1);

		p[0][0].should.be.approximately(0, verb.TOLERANCE );
		p[0][1].should.be.approximately(10, verb.TOLERANCE );
		p[0][2].should.be.approximately(0, verb.TOLERANCE );

		// normalize the derivative
		p[1] = numeric.div( p[1], numeric.norm2(p[1]) );

		p[1][0].should.be.approximately(-1, verb.TOLERANCE );
		p[1][1].should.be.approximately(0, verb.TOLERANCE );
		p[1][2].should.be.approximately(0, verb.TOLERANCE );

	});

});

describe("Ellipse.tesselate",function(){

	it('gives correct result', function(){

		verb.init();

		var c = new verb.geom.Ellipse([0,0,0], [1,0,0], [0,1,0], 5, 10);

		should.exist(c);

		var pts = c.tesselate();

		pts.length.should.be.greaterThan(2);
		pts.map( function(e){  e.length.should.be.equal(3); });

	});

});

describe("EllipseArc.constructor",function(){

	it('can create an instance', function(){

		verb.init();

		var c = new verb.geom.EllipseArc([0,0,0], [1,0,0], [0,1,0], 5, 10, new verb.geom.Interval(0, Math.PI));

		should.exist(c);

	});

});

describe("EllipseArc.point",function(){

	it('evaluates correctly', function(){

		verb.init();

		var c = new verb.geom.EllipseArc([0,0,0], [1,0,0], [0,1,0], 5, 10, new verb.geom.Interval(0, Math.PI));

		should.exist(c);

		var p = c.point(0.5);

		p[0].should.be.approximately(0, verb.TOLERANCE );
		p[1].should.be.approximately(10, verb.TOLERANCE );
		p[2].should.be.approximately(0, verb.TOLERANCE );

	});

});

describe("EllipseArc.derivatives",function(){

	it('gives correct result', function(){

		verb.init();

		var c = new verb.geom.EllipseArc([0,0,0], [1,0,0], [0,1,0], 5, 10, new verb.geom.Interval(0, Math.PI));

		should.exist(c);

		var p = c.derivatives(0.5, 1);

		p[0][0].should.be.approximately(0, verb.TOLERANCE );
		p[0][1].should.be.approximately(10, verb.TOLERANCE );
		p[0][2].should.be.approximately(0, verb.TOLERANCE );

		// normalize the derivative
		p[1] = numeric.div( p[1], numeric.norm2(p[1]) );

		p[1][0].should.be.approximately(-1, verb.TOLERANCE );
		p[1][1].should.be.approximately(0, verb.TOLERANCE );
		p[1][2].should.be.approximately(0, verb.TOLERANCE );

	});

});

describe("EllipseArc.tesselate",function(){

	it('gives correct result', function(){

		verb.init();

		var c = new verb.geom.EllipseArc([0,0,0], [1,0,0], [0,1,0], 5, 10, new verb.geom.Interval(0, Math.PI));

		should.exist(c);

		var pts = c.tesselate();

		pts.length.should.be.greaterThan(2);
		pts.map( function(e){  e.length.should.be.equal(3); });

	});

});

describe("PolyLine.constructor",function(){

	it('can create an instance', function(){

		verb.init();

		var c = new verb.geom.PolyLine( [ [0,0,0], [1,0,0], [0,1,0] ] );

		should.exist(c);

	});

});

describe("PolyLine.point",function(){

	it('evaluates correctly', function(){

		verb.init();

		var c = new verb.geom.PolyLine( [ [0,0,0], [1,0,0], [0,1,0] ] );

		should.exist(c);

		var p = c.point(0.5);

		p.should.eql( [1,0,0] );

	});

});

describe("PolyLine.derivatives",function(){

	it('gives correct result', function(){

		verb.init();

		var c = new verb.geom.PolyLine( [ [0,0,0], [1,0,0], [0,1,0] ] );

		should.exist(c);

		var p = c.derivatives(0.5, 1);

		p[0].should.eql( [1,0,0] );

		// normalize the derivative
		p[1] = numeric.div( p[1], numeric.norm2(p[1]) );

		p[1][0].should.be.approximately(-Math.sqrt(2) / 2, verb.TOLERANCE );
		p[1][1].should.be.approximately(Math.sqrt(2) / 2, verb.TOLERANCE );
		p[1][2].should.be.approximately(0, verb.TOLERANCE );

	});

});

describe("PolyLine.tesselate",function(){

	it('gives correct result', function(){

		verb.init();

		var c = new verb.geom.PolyLine( [ [0,0,0], [1,0,0], [0,1,0] ] );

		should.exist(c);

		var pts = c.tesselate();

		pts.length.should.be.equal(3);
		pts.map( function(e){  e.length.should.be.equal(3); });

	});

});


describe("PolyLine.constructor",function(){

	it('can create an instance', function(){

		verb.init();

		var c = new verb.geom.PolyLine( [ [0,0,0], [1,0,0], [0,1,0] ] );

		should.exist(c);

	});

});

describe("PolyLine.point",function(){

	it('evaluates correctly', function(){

		verb.init();

		var c = new verb.geom.PolyLine( [ [0,0,0], [1,0,0], [0,1,0] ] );

		should.exist(c);

		var p = c.point(0.5);

		p.should.eql( [1,0,0] );

	});

});

describe("PolyLine.derivatives",function(){

	it('gives correct result', function(){

		verb.init();

		var c = new verb.geom.PolyLine( [ [0,0,0], [1,0,0], [0,1,0] ] );

		should.exist(c);

		var p = c.derivatives(0.5, 1);

		p[0].should.eql( [1,0,0] );

		// normalize the derivative
		p[1] = numeric.div( p[1], numeric.norm2(p[1]) );

		p[1][0].should.be.approximately(-Math.sqrt(2) / 2, verb.TOLERANCE );
		p[1][1].should.be.approximately(Math.sqrt(2) / 2, verb.TOLERANCE );
		p[1][2].should.be.approximately(0, verb.TOLERANCE );

	});

});

describe("PolyLine.tesselate",function(){

	it('gives correct result', function(){

		verb.init();

		var c = new verb.geom.PolyLine( [ [0,0,0], [1,0,0], [0,1,0] ] );

		should.exist(c);

		var pts = c.tesselate();

		pts.length.should.be.equal(3);
		pts.map( function(e){  e.length.should.be.equal(3); });

	});

});

describe("Cone.constructor",function(){

	it('can create an instance', function(){

		verb.init();

		var axis = [0,0,1]
			, xaxis = [1,0,0]
			, base = [0,0,0]
			, height = 5
			, radius = 3;

		var srf = new verb.geom.Cone( axis, xaxis, base, height, radius );

		should.exist(srf);

	});

});

describe("Cone.point",function(){

	it('evaluates correctly for middle of surface', function(){

		verb.init();

		var axis = [0,0,1]
			, xaxis = [1,0,0]
			, base = [0,0,0]
			, height = 5
			, radius = 3;

		var srf = new verb.geom.Cone( axis, xaxis, base, height, radius );

		should.exist(srf);

		var p = srf.point(0.5,0.5);

		p[0].should.be.approximately(-1.5, verb.EPSILON );
		p[1].should.be.approximately(0, verb.EPSILON );
		p[2].should.be.approximately(2.5, verb.EPSILON );

	});

});

describe("Cone.derivatives",function(){

	it('gives expected result for middle of surface', function(){

		verb.init();

		var axis = [0,0,1]
			, xaxis = [1,0,0]
			, base = [0,0,0]
			, height = 5
			, radius = 3;

		var srf = new verb.geom.Cone( axis, xaxis, base, height, radius );

		should.exist(srf);

		var p = srf.derivatives(0.5, 0.5, 1);

		p[0][0][0].should.be.approximately(-1.5, verb.EPSILON );
		p[0][0][1].should.be.approximately(0, verb.EPSILON );
		p[0][0][2].should.be.approximately(2.5, verb.EPSILON );

		p[0][1][0].should.be.approximately(-3, verb.EPSILON );
		p[0][1][1].should.be.approximately(0, verb.EPSILON );
		p[0][1][2].should.be.approximately(-5, verb.EPSILON );

		p[1][0] = numeric.div( p[1][0], numeric.norm2(p[1][0]) );

		p[1][0][0].should.be.approximately(0, verb.EPSILON );
		p[1][0][1].should.be.approximately(-1, verb.EPSILON );
		p[1][0][2].should.be.approximately(0, verb.EPSILON );

	});

});


describe("Cone.tesselate",function(){

	it('gives mesh result', function(){

		verb.init();

		var axis = [0,0,1]
			, xaxis = [1,0,0]
			, base = [0,0,0]
			, height = 5
			, radius = 3;

		var srf = new verb.geom.Cone( axis, xaxis, base, height, radius );

		should.exist(srf);

		var p = srf.tesselate();

		p.uvs.length.should.be.equal(441);
		p.points.length.should.be.equal(441);
		p.faces.length.should.be.equal(800);

		p.points.map(function(e){ e.length.should.be.equal(3); });
		p.uvs.map(function(e){ e.length.should.be.equal(2); });
		p.faces.map(function(e){ e.length.should.be.equal(3); });


	});

});

describe("Cylinder.constructor",function(){

	it('can create an instance', function(){

		verb.init();

		var axis = [0,0,1]
			, xaxis = [1,0,0]
			, base = [0,0,0]
			, height = 5
			, radius = 3;

		var srf = new verb.geom.Cylinder( axis, xaxis, base, height, radius );

		should.exist(srf);

	});

});

describe("Cylinder.point",function(){

	it('evaluates correctly for middle of surface', function(){

		verb.init();

		var axis = [0,0,1]
			, xaxis = [1,0,0]
			, base = [0,0,0]
			, height = 5
			, radius = 3;

		var srf = new verb.geom.Cylinder( axis, xaxis, base, height, radius );

		should.exist(srf);

		var p = srf.point(0.5,0.5);

		p[0].should.be.approximately(-3, verb.EPSILON );
		p[1].should.be.approximately(0, verb.EPSILON );
		p[2].should.be.approximately(2.5, verb.EPSILON );

	});

});

describe("Cylinder.derivatives",function(){

	it('gives expected result for middle of surface', function(){

		verb.init();

		var axis = [0,0,1]
			, xaxis = [1,0,0]
			, base = [0,0,0]
			, height = 5
			, radius = 3;

		var srf = new verb.geom.Cylinder( axis, xaxis, base, height, radius );

		should.exist(srf);

		var p = srf.derivatives(0.5, 0.5, 1);

		p[0][0][0].should.be.approximately(-3, verb.EPSILON );
		p[0][0][1].should.be.approximately(0, verb.EPSILON );
		p[0][0][2].should.be.approximately(2.5, verb.EPSILON );

		p[1][0][0].should.be.approximately(0, verb.EPSILON );
		p[1][0][1].should.be.approximately(0, verb.EPSILON );
		p[1][0][2].should.be.approximately(5, verb.EPSILON );

		p[0][1] = numeric.div( p[0][1], numeric.norm2(p[0][1]) );

		p[0][1][0].should.be.approximately(0, verb.EPSILON );
		p[0][1][1].should.be.approximately(-1, verb.EPSILON );
		p[0][1][2].should.be.approximately(0, verb.EPSILON );

	});

});


describe("Cylinder.tesselate",function(){

	it('gives mesh result', function(){

		verb.init();

		var axis = [0,0,1]
			, xaxis = [1,0,0]
			, base = [0,0,0]
			, height = 5
			, radius = 3;

		var srf = new verb.geom.Cylinder( axis, xaxis, base, height, radius );

		should.exist(srf);

		var p = srf.tesselate();

		p.uvs.length.should.be.equal(441);
		p.points.length.should.be.equal(441);
		p.faces.length.should.be.equal(800);

		p.points.map(function(e){ e.length.should.be.equal(3); });
		p.uvs.map(function(e){ e.length.should.be.equal(2); });
		p.faces.map(function(e){ e.length.should.be.equal(3); });


	});

});

describe("Extrusion.constructor",function(){

	it('can create an instance', function(){

		verb.init();

		var profile = new verb.geom.Line( [0,0,0], [1,1,1] )
			, axis = [0,0,1]
			, length = 3;

		var srf = new verb.geom.Extrusion( profile, axis, length);

		should.exist(srf);

	});

});

describe("Extrusion.point",function(){

	it('evaluates correctly for middle of surface', function(){

		verb.init();

		var profile = new verb.geom.Line( [0,0,0], [1,1,0] )
			, axis = [0,0,1]
			, length = 3;

		var srf = new verb.geom.Extrusion( profile, axis, length);

		should.exist(srf);

		var p = srf.point(0.5,0.5);

		p[0].should.be.approximately(0.5, verb.EPSILON );
		p[1].should.be.approximately(0.5, verb.EPSILON );
		p[2].should.be.approximately(1.5, verb.EPSILON );

	});

});

describe("Extrusion.derivatives",function(){

	it('gives expected result for middle of surface', function(){

		verb.init();

		var profile = new verb.geom.Line( [0,0,0], [1,1,0] )
			, axis = [0,0,1]
			, length = 3;

		var srf = new verb.geom.Extrusion( profile, axis, length);

		should.exist(srf);

		var p = srf.derivatives(0.5, 0.5, 1);

		p[0][0][0].should.be.approximately(0.5, verb.EPSILON );
		p[0][0][1].should.be.approximately(0.5, verb.EPSILON );
		p[0][0][2].should.be.approximately(1.5, verb.EPSILON );

		p[0][1][0].should.be.approximately(1, verb.EPSILON );
		p[0][1][1].should.be.approximately(1, verb.EPSILON );
		p[0][1][2].should.be.approximately(0, verb.EPSILON );

		p[1][0][0].should.be.approximately(0, verb.EPSILON );
		p[1][0][1].should.be.approximately(0, verb.EPSILON );
		p[1][0][2].should.be.approximately(3, verb.EPSILON );

	});

});


describe("Extrusion.tesselate",function(){

	it('gives mesh result', function(){

		verb.init();

		var profile = new verb.geom.Line( [0,0,0], [1,1,0] )
			, axis = [0,0,1]
			, length = 3;

		var srf = new verb.geom.Extrusion( profile, axis, length);

		should.exist(srf);

		var p = srf.tesselate();

		p.uvs.length.should.be.equal(441);
		p.points.length.should.be.equal(441);
		p.faces.length.should.be.equal(800);

		p.points.map(function(e){ e.length.should.be.equal(3); });
		p.uvs.map(function(e){ e.length.should.be.equal(2); });
		p.faces.map(function(e){ e.length.should.be.equal(3); });


	});

});

describe("PlanarSurface.constructor",function(){

	it('can create an instance', function(){

		verb.init();

		var base = [0,0,0]
			, uaxis = [1,0,0]
			, vaxis = [0,1,0]
			, ulength = 10
			, vlength = 4;

		var srf = new verb.geom.PlanarSurface( base, uaxis, vaxis, ulength, vlength );

		should.exist(srf);

	});

});

describe("PlanarSurface.point",function(){

	it('evaluates correctly for middle of surface', function(){

		verb.init();

		var base = [0,0,0]
			, uaxis = [1,0,0]
			, vaxis = [0,1,0]
			, ulength = 10
			, vlength = 4;

		var srf = new verb.geom.PlanarSurface( base, uaxis, vaxis, ulength, vlength );

		should.exist(srf);

		var p = srf.point(0.5,0.5);

		p[0].should.be.approximately(5, verb.EPSILON );
		p[1].should.be.approximately(2, verb.EPSILON );
		p[2].should.be.approximately(0, verb.EPSILON );

	});

});

describe("PlanarSurface.derivatives",function(){

	it('gives expected result for middle of surface', function(){

		verb.init();

		var base = [0,0,0]
			, uaxis = [1,0,0]
			, vaxis = [0,1,0]
			, ulength = 10
			, vlength = 4;

		var srf = new verb.geom.PlanarSurface( base, uaxis, vaxis, ulength, vlength );

		should.exist(srf);

		var p = srf.derivatives(0.5, 0.5, 1);

		p[0][0][0].should.be.approximately(5, verb.EPSILON );
		p[0][0][1].should.be.approximately(2, verb.EPSILON );
		p[0][0][2].should.be.approximately(0, verb.EPSILON );

		p[0][1][0].should.be.approximately(0, verb.EPSILON );
		p[0][1][1].should.be.approximately(4, verb.EPSILON );
		p[0][1][2].should.be.approximately(0, verb.EPSILON );

		p[1][0][0].should.be.approximately(10, verb.EPSILON );
		p[1][0][1].should.be.approximately(0, verb.EPSILON );
		p[1][0][2].should.be.approximately(0, verb.EPSILON );

	});

});


describe("PlanarSurface.tesselate",function(){

	it('gives mesh result', function(){

		verb.init();

		var base = [0,0,0]
			, uaxis = [1,0,0]
			, vaxis = [0,1,0]
			, ulength = 10
			, vlength = 4;

		var srf = new verb.geom.PlanarSurface( base, uaxis, vaxis, ulength, vlength );

		should.exist(srf);

		var p = srf.tesselate();

		p.uvs.length.should.be.equal(441);
		p.points.length.should.be.equal(441);
		p.faces.length.should.be.equal(800);

		p.points.map(function(e){ e.length.should.be.equal(3); });
		p.uvs.map(function(e){ e.length.should.be.equal(2); });
		p.faces.map(function(e){ e.length.should.be.equal(3); });


	});

});

describe("RevolvedSurface.constructor",function(){

	it('can create an instance', function(){

		verb.init();

		var base = [0,0,0]
			, axis = [0,0,1]
			, angle = Math.PI
			, profile = new verb.geom.Line( [1, 0, 10], [10, 0, 1] );

		var srf = new verb.geom.RevolvedSurface( base, axis, angle, profile );

		should.exist(srf);

	});

});

describe("RevolvedSurface.point",function(){

	it('evaluates correctly for middle of surface', function(){

		verb.init();

		var base = [0,0,0]
			, axis = [0,0,1]
			, angle = Math.PI
			, profile = new verb.geom.Line( [1, 0, 10], [10, 0, 1] );

		var srf = new verb.geom.RevolvedSurface( base, axis, angle, profile );

		should.exist(srf);

		var p = srf.point(0.5,0.5);

		p[0].should.be.approximately(0, verb.EPSILON );
		p[1].should.be.approximately(5.5, verb.EPSILON );
		p[2].should.be.approximately(5.5, verb.EPSILON );

	});

});

describe("RevolvedSurface.derivatives",function(){

	it('gives expected result for middle of surface', function(){

		verb.init();

		var base = [0,0,0]
			, axis = [0,0,1]
			, angle = Math.PI
			, profile = new verb.geom.Line( [1, 0, 10], [10, 0, 1] );

		var srf = new verb.geom.RevolvedSurface( base, axis, angle, profile );

		should.exist(srf);

		var p = srf.derivatives(0.5, 0.5, 1);

		p[0][0][0].should.be.approximately(0, verb.EPSILON );
		p[0][0][1].should.be.approximately(5.5, verb.EPSILON );
		p[0][0][2].should.be.approximately(5.5, verb.EPSILON );

		
		p[0][1][0].should.be.approximately(0, verb.EPSILON );
		p[0][1][1].should.be.approximately(9, verb.EPSILON );
		p[0][1][2].should.be.approximately(-9, verb.EPSILON );

	  p[1][0] = numeric.normalized( p[1][0] );

		p[1][0][0].should.be.approximately(-1, verb.EPSILON );
		p[1][0][1].should.be.approximately(0, verb.EPSILON );
		p[1][0][2].should.be.approximately(0, verb.EPSILON );

	});

});


describe("RevolvedSurface.tesselate",function(){

	it('gives mesh result', function(){

		verb.init();

		var base = [0,0,0]
			, axis = [0,0,1]
			, angle = Math.PI
			, profile = new verb.geom.Line( [1, 0, 10], [10, 0, 1] );

		var srf = new verb.geom.RevolvedSurface( base, axis, angle, profile );

		should.exist(srf);

		var p = srf.tesselate();

		p.uvs.length.should.be.equal(441);
		p.points.length.should.be.equal(441);
		p.faces.length.should.be.equal(800);

		p.points.map(function(e){ e.length.should.be.equal(3); });
		p.uvs.map(function(e){ e.length.should.be.equal(2); });
		p.faces.map(function(e){ e.length.should.be.equal(3); });


	});



});


describe("Sphere.constructor",function(){

	it('can create an instance', function(){

		verb.init();

		var center = [0,0,0]
			, radius = 5;

		var srf = new verb.geom.Sphere( center, radius );

		should.exist(srf);

	});

});

describe("Sphere.point",function(){

	it('evaluates correctly for middle of surface', function(){

		verb.init();

		var center = [0,0,0]
			, radius = 5;

		var srf = new verb.geom.Sphere( center, radius );

		should.exist(srf);

		var p = srf.point(0.5,0.5);

		p[0].should.be.approximately(-radius, verb.EPSILON );
		p[1].should.be.approximately(0, verb.EPSILON );
		p[2].should.be.approximately(0, verb.EPSILON );

	});

});

describe("Sphere.derivatives",function(){

	it('gives expected result for middle of surface', function(){

		verb.init();

		var center = [0,0,0]
			, radius = 5;

		var srf = new verb.geom.Sphere( center, radius );

		should.exist(srf);

		var p = srf.derivatives(0.5, 0.5, 1);

		p[0][0][0].should.be.approximately(-radius, verb.EPSILON );
		p[0][0][1].should.be.approximately(0, verb.EPSILON );
		p[0][0][2].should.be.approximately(0, verb.EPSILON );

		p[0][1] = numeric.normalized( p[0][1] );

		p[0][1][0].should.be.approximately(0, verb.EPSILON );
		p[0][1][1].should.be.approximately(0, verb.EPSILON );
		p[0][1][2].should.be.approximately(1, verb.EPSILON );

	  p[1][0] = numeric.normalized( p[1][0] );

		p[1][0][0].should.be.approximately(0, verb.EPSILON );
		p[1][0][1].should.be.approximately(-1, verb.EPSILON );
		p[1][0][2].should.be.approximately(0, verb.EPSILON );

	});

});


describe("Sphere.tesselate",function(){

	it('gives mesh result', function(){

		verb.init();

		var center = [0,0,0]
			, radius = 5;

		var srf = new verb.geom.Sphere( center, radius );

		should.exist(srf);

		var p = srf.tesselate();

		p.uvs.length.should.be.equal(441);
		p.points.length.should.be.equal(441);
		p.faces.length.should.be.equal(800);

		p.points.map(function(e){ e.length.should.be.equal(3); });
		p.uvs.map(function(e){ e.length.should.be.equal(2); });
		p.faces.map(function(e){ e.length.should.be.equal(3); });


	});
});

describe("SweepOneRail.constructor",function(){

	it('can create an instance', function(){

		verb.init();
		
		var p1 = [0,0,0]
			, p2 = [1,0,1]
			, p3 = [2,0,-1]
			, p4 = [3,0,0];

		var rail = new verb.geom.BezierCurve( [p1, p2, p3, p4] )
			, profile = new verb.geom.Line( [0,1,0], [0,-1,0]  );

		var srf = new verb.geom.SweepOneRail( rail, profile );

		should.exist(srf);

	});

});

describe("SweepOneRail.point",function(){

	it('evaluates correctly for middle of surface', function(){

		verb.init();

		var p1 = [0,0,0]
			, p2 = [1,0,1]
			, p3 = [2,0,-1]
			, p4 = [3,0,0];

		var rail = new verb.geom.BezierCurve( [p1, p2, p3, p4] )
			, profile = new verb.geom.Line( [0,1,0], [0,-1,0]  )

		var srf = new verb.geom.SweepOneRail( rail, profile );

		should.exist(srf);

		var p = srf.point(0.5,0.5);

		should.exist(p);

		p[0].should.be.greaterThan( 0 );
		p[1].should.be.approximately(0, verb.EPSILON );
		p[2].should.be.greaterThan(0, verb.EPSILON );

	});

});

describe("SweepOneRail.derivatives",function(){

	it('gives expected result for middle of surface', function(){

		verb.init();

		var p1 = [0,0,0]
			, p2 = [1,0,1]
			, p3 = [2,0,-1]
			, p4 = [3,0,0];

		var rail = new verb.geom.BezierCurve( [p1, p2, p3, p4] )
			, profile = new verb.geom.Line( [0,1,0], [0,-1,0]  )

		var srf = new verb.geom.SweepOneRail( rail, profile );

		should.exist(srf);

		var p = srf.derivatives(0.5, 0.5, 1);

		p[0][0][0].should.be.greaterThan( 0 );
		p[0][0][1].should.be.approximately(0, verb.EPSILON );
		p[0][0][2].should.be.greaterThan(0, verb.EPSILON );

		p[0][1][0].should.be.approximately(0, verb.EPSILON );
		p[0][1][1].should.be.approximately(-2, verb.EPSILON );
		p[0][1][2].should.be.approximately(0, verb.EPSILON );

		p[0][0][0].should.be.greaterThan( 0 );
		p[0][0][1].should.be.approximately(0, verb.EPSILON );
		p[0][0][2].should.be.greaterThan( 0  );

	});

});


describe("SweepOneRail.tesselate",function(){

	it('gives mesh result', function(){

		verb.init();

		var p1 = [0,0,0]
			, p2 = [1,0,1]
			, p3 = [2,0,-1]
			, p4 = [3,0,0];

		var rail = new verb.geom.BezierCurve( [p1, p2, p3, p4] )
			, profile = new verb.geom.Line( [0,1,0], [0,-1,0]  )

		var srf = new verb.geom.SweepOneRail( rail, profile );

		should.exist(srf);

		var p = srf.tesselate();

		p.uvs.length.should.be.equal(441);
		p.points.length.should.be.equal(441);
		p.faces.length.should.be.equal(800);

		p.points.map(function(e){ e.length.should.be.equal(3); });
		p.uvs.map(function(e){ e.length.should.be.equal(2); });
		p.faces.map(function(e){ e.length.should.be.equal(3); });


	});


});

describe("verb.eval.nurbs.intersect_rational_curves_by_aabb",function(){

	it('gives valid result for two planar lines', function(){

		var degree1 = 1,
				knots1 = [0,0,1,1],
				control_points1 = [[0,0,0,1], [2,0,0,1]],
				degree2 = 1,
				knots2 = [0,0,1,1],
				control_points2 = [[0.5,0.5,0,1], [0.5,-1.5,0,1]]
				sample_tol = 1e-6,
				tol = 0.0001;

		var res = verb.eval.nurbs.intersect_rational_curves_by_aabb( 	degree1, 
																																	knots1, 
																																	control_points1, 
																																	degree2, 
																																	knots2, 
																																	control_points2, 
																																	sample_tol, 
																																	tol );

		res[0][0].should.be.approximately(0.25, verb.TOLERANCE );
		res[0][1].should.be.approximately(0.25, verb.TOLERANCE );

	});

	it('gives valid result for  planar degree 2 bezier and planar line', function(){

		var degree1 = 1,
				knots1 = [0,0,1,1],
				control_points1 = [[0,0,0,1], [2,0,0,1]],
				degree2 = 2,
				knots2 = [0,0,0,1,1,1],
				control_points2 = [[0.5,0.5,0,1], [0.7,0,0,1], [0.5,-1.5,0,1]]
				sample_tol = 1e-6,
				tol = 0.0001;

		var res = verb.eval.nurbs.intersect_rational_curves_by_aabb( 	degree1, 
																																	knots1, 
																																	control_points1, 
																																	degree2, 
																																	knots2, 
																																	control_points2, 
																																	sample_tol, 
																																	tol );
		var match_tol = 0.01;

		res[0][0].should.be.approximately(0.296, match_tol );
		res[0][1].should.be.approximately(0.36, match_tol );

	});

	it('gives valid result for planar line and planar degree 2 bezier as second arg', function(){

		var degree1 = 1,
				knots1 = [0,0,1,1],
				control_points1 = [[0,0,0,1], [2,0,0,1]],
				degree2 = 2,
				knots2 = [0,0,0,1,1,1],
				control_points2 = [[0.5,0.5,0,1], [0.7,0,0,1], [0.5,-1.5,0,1]]
				sample_tol = 1e-6,
				tol = 0.0001;

		var res = verb.eval.nurbs.intersect_rational_curves_by_aabb( 	degree2, 
																																	knots2, 
																																	control_points2, 
																																	degree1, 
																																	knots1, 
																																	control_points1, 
																																	sample_tol, 
																																	tol );

		var match_tol = 0.01;

		res[0][0].should.be.approximately(0.36, match_tol );
		res[0][1].should.be.approximately(0.29, match_tol );

	});

	it('gives valid result for 2 planar degree 2 beziers', function(){

		var degree1 = 2,
				knots1 = [0,0,0,1,1,1],
				control_points1 = [[0,0,0,1], [0.5,0.1,0,1],  [2,0,0,1]],
				degree2 = 2,
				knots2 = [0,0,0,1,1,1],
				control_points2 = [[0.5,0.5,0,1], [0.7,0,0,1], [0.5,-1.5,0,1]]
				sample_tol = 1e-6,
				tol = 0.0001;

		var res = verb.eval.nurbs.intersect_rational_curves_by_aabb( 	degree1, 
																																	knots1, 
																																	control_points1, 
																																	degree2, 
																																	knots2, 
																																	control_points2, 
																																	sample_tol, 
																																	tol );
		var match_tol = 0.01;

		res[0][0].should.be.approximately(0.41, match_tol );
		res[0][1].should.be.approximately(0.33, match_tol );

	});


});

describe("verb.eval.nurbs.refine_rational_curve_intersection",function(){

	it('gives valid result for two lines', function(){

		var degree1 = 1,
				knots1 = [0,0,1,1],
				control_points1 = [[0,0,0,1], [2,0,0,1]],
				degree2 = 1,
				knots2 = [0,0,1,1],
				control_points2 = [[0.5,0.5,0,1], [0.5,-1.5,0,1]],
				start_params = [0.26, 0.24 ];

		var res = verb.eval.nurbs.refine_rational_curve_intersection( degree1, knots1, control_points1, degree2, knots2, control_points2, start_params );

		res[0].should.be.approximately(0.25, verb.TOLERANCE );
		res[1].should.be.approximately(0.25, verb.TOLERANCE );

	});

	it('gives valid result for  planar degree 2 bezier and planar line', function(){

		var degree1 = 1,
				knots1 = [0,0,1,1],
				control_points1 = [[0,0,0,1], [2,0,0,1]],
				degree2 = 2,
				knots2 = [0,0,0,1,1,1],
				control_points2 = [[0.5,0.5,0,1], [0.7,0,0,1], [0.5,-1.5,0,1]]
				start_params = [0.29, 0.36 ];

		var res = verb.eval.nurbs.refine_rational_curve_intersection( degree1, knots1, control_points1, degree2, knots2, control_points2, start_params );

		res[0].should.be.approximately(0.2964101616038012, verb.TOLERANCE );
		res[1].should.be.approximately(0.3660254038069307, verb.TOLERANCE );

	});

	it('gives valid result for planar line and planar degree 2 bezier as second arg', function(){

		var degree1 = 1,
				knots1 = [0,0,1,1],
				control_points1 = [[0,0,0,1], [2,0,0,1]],
				degree2 = 2,
				knots2 = [0,0,0,1,1,1],
				control_points2 = [[0.5,0.5,0,1], [0.7,0,0,1], [0.5,-1.5,0,1]],
				start_params = [ 0.36, 0.29 ];

		var res = verb.eval.nurbs.refine_rational_curve_intersection( 	degree2, 
																																	knots2, 
																																	control_points2, 
																																	degree1, 
																																	knots1, 
																																	control_points1, 
																																	start_params );

		res[0].should.be.approximately(0.3660254038069307, verb.TOLERANCE );
		res[1].should.be.approximately(0.2964101616038012, verb.TOLERANCE );

	});

	it('gives valid result for 2 planar degree 2 beziers', function(){

		var degree1 = 2,
				knots1 = [0,0,0,1,1,1],
				control_points1 = [[0,0,0,1], [0.5,0.1,0,1],  [2,0,0,1]],
				degree2 = 2,
				knots2 = [0,0,0,1,1,1],
				control_points2 = [[0.5,0.5,0,1], [0.7,0,0,1], [0.5,-1.5,0,1]],
				start_params = [ 0.41, 0.33 ];

		var res = verb.eval.nurbs.refine_rational_curve_intersection( degree1, knots1, control_points1, degree2, knots2, control_points2, start_params );

		
		res[0].should.be.approximately(0.416208132514572, verb.TOLERANCE );
		res[1].should.be.approximately(0.3374987853196129, verb.TOLERANCE );

	});

});

describe("verb.eval.nurbs.intersect_rational_curves_by_aabb_refine",function(){

	it('gives valid result for two planar lines', function(){

		var degree1 = 1,
				knots1 = [0,0,1,1],
				control_points1 = [[0,0,0,1], [2,0,0,1]],
				degree2 = 1,
				knots2 = [0,0,1,1],
				control_points2 = [[0.5,0.5,0,1], [0.5,-1.5,0,1]]
				sample_tol = 1e-6,
				tol = 0.0001;

		var res = verb.eval.nurbs.intersect_rational_curves_by_aabb_refine( 	degree1, 
																																	knots1, 
																																	control_points1, 
																																	degree2, 
																																	knots2, 
																																	control_points2, 
																																	sample_tol, 
																																	tol );

		res[0][0].should.be.approximately(0.25, verb.TOLERANCE );
		res[0][1].should.be.approximately(0.25, verb.TOLERANCE );

	});

	it('gives valid result for  planar degree 2 bezier and planar line', function(){

		var degree1 = 1,
				knots1 = [0,0,1,1],
				control_points1 = [[0,0,0,1], [2,0,0,1]],
				degree2 = 2,
				knots2 = [0,0,0,1,1,1],
				control_points2 = [[0.5,0.5,0,1], [0.7,0,0,1], [0.5,-1.5,0,1]]
				sample_tol = 1e-6,
				tol = 0.0001;

		var res = verb.eval.nurbs.intersect_rational_curves_by_aabb_refine( 	degree1, 
																																	knots1, 
																																	control_points1, 
																																	degree2, 
																																	knots2, 
																																	control_points2, 
																																	sample_tol, 
																																	tol );

		res[0][0].should.be.approximately(0.2964101616038012, verb.TOLERANCE );
		res[0][1].should.be.approximately(0.3660254038069307, verb.TOLERANCE );

	});

	it('gives valid result for planar line and planar degree 2 bezier as second arg', function(){

		var degree1 = 1,
				knots1 = [0,0,1,1],
				control_points1 = [[0,0,0,1], [2,0,0,1]],
				degree2 = 2,
				knots2 = [0,0,0,1,1,1],
				control_points2 = [[0.5,0.5,0,1], [0.7,0,0,1], [0.5,-1.5,0,1]]
				sample_tol = 1e-6,
				tol = 0.0001;

		var res = verb.eval.nurbs.intersect_rational_curves_by_aabb_refine( 	degree2, 
																																	knots2, 
																																	control_points2, 
																																	degree1, 
																																	knots1, 
																																	control_points1, 
																																	sample_tol, 
																																	tol );

		res[0][0].should.be.approximately(0.3660254038069307, verb.TOLERANCE );
		res[0][1].should.be.approximately(0.2964101616038012, verb.TOLERANCE );

	});

	it('gives valid result for 2 planar degree 2 beziers', function(){

		var degree1 = 2,
				knots1 = [0,0,0,1,1,1],
				control_points1 = [[0,0,0,1], [0.5,0.1,0,1],  [2,0,0,1]],
				degree2 = 2,
				knots2 = [0,0,0,1,1,1],
				control_points2 = [[0.5,0.5,0,1], [0.7,0,0,1], [0.5,-1.5,0,1]]
				sample_tol = 1e-6,
				tol = 0.0001;

		var res = verb.eval.nurbs.intersect_rational_curves_by_aabb_refine( 	degree1, 
																																	knots1, 
																																	control_points1, 
																																	degree2, 
																																	knots2, 
																																	control_points2, 
																																	sample_tol, 
																																	tol );
		var match_tol = 0.01;

		res[0][0].should.be.approximately(0.416208132514572, verb.TOLERANCE );
		res[0][1].should.be.approximately(0.3374987853196129, verb.TOLERANCE );

	});


});

describe("verb.intersect.curveCurve",function(){

	it('gives valid result for 2 planar degree 2 beziers', function(){

		verb.init();

		// build a bezier curve
		var p1 = [0,0,0]
			, p2 = [1,0,1]
			, p3 = [2,0,1]
			, p4 = [3,0,0];

		var curve1 = new verb.geom.BezierCurve( [p1, p2, p3, p4] );

		// build another
		var c1 = [-5,0,3]
			, c2 = [1,0,0]
			, c3 = [2,0,0]
			, c4 = [3,0,1];

		var curve2 = new verb.geom.BezierCurve( [c1, c2, c3, c4] );

		// make sync work
		var res = verb.intersect.curveCurve( curve1, curve2 );

		res.length.should.be.equal(2);
		res[0].length.should.be.equal(3);
		res[1].length.should.be.equal(3);

		res[0][0].should.be.approximately(0.23545561131691756, verb.TOLERANCE);
		res[0][1].should.be.approximately(0.4756848757799639, verb.TOLERANCE);

		res[1][0].should.be.approximately(0.7756197831105017, verb.TOLERANCE);
		res[1][1].should.be.approximately(0.7908648647054176, verb.TOLERANCE);


	});

});

describe("verb.eval.nurbs.intersect_rational_curve_surface_by_aabb",function(){

	it('gives valid result for planar surface and line', function(){

		// verb.init();

		// // build planar surface in the xy plane
		// var homo_control_points_srf = [ [ [0,0,0,1], [10,0,0,1] ], [[0,10,0,1], [10,10,0,1] ] ]
		// 	, degree_u  = 1
		// 	, degree_v = 1
		// 	, knots_u = [0,0,1,1]
		// 	, knots_v = [0,0,1,1];

		// // line from [5,5,5] to [5,5,-5]
		// var degree_crv = 1
		// 	, knots_crv = [0,0,1,1]
		// 	, homo_control_points_crv = [ [5,5,5,1], [5,5,-5,1] ];

		// var sample_tol = 1e-6
		// 	, tol = 0.0001
		// 	, divs_u = 2
		// 	, divs_v = 2;

		// var res =  verb.eval.nurbs.intersect_rational_curve_surface_by_aabb( 	degree_u, 
		// 																																			knots_u, 
		// 																																			degree_v, 
		// 																																			knots_v, 
		// 																																			homo_control_points_srf, 

		// 																																			degree_crv, 
		// 																																			knots_crv, 
		// 																																			homo_control_points_crv, 

		// 																																			sample_tol, 
		// 																																			tol, 
		// 																																			divs_u, 
		// 																																			divs_v );

		// res.length.should.be.equal(1);
		// res[0].p.approximately(0.5, verb.TOLERANCE);
		// res[0].uv[0].approximately(0.5, verb.TOLERANCE);
		// res[0].uv[1].approximately(0.5, verb.TOLERANCE);

	});

});

describe("verb.eval.geom.intersect_segment_with_tri",function(){

	it('gives correct result for intersecting axis aligned segment and triangle ', function(){

		// line from [5,5,5] to [5,5,-5]
		var p0 = [ 5,5,5 ]
			, p1 = [ 5,5,-10 ]
			, points = [ [0,0,0], [10,0,0], [5,10,1] ]
			, tri = [ 0, 1, 2 ];

		var res = verb.eval.geom.intersect_segment_with_tri( p0, p1, points, tri );

		res.p.should.be.approximately(0.3, verb.TOLERANCE);
		res.s.should.be.approximately(0.25, verb.TOLERANCE);
		res.t.should.be.approximately(0.5, verb.TOLERANCE);

		var p_srf = numeric.add( 	points[0], 
															numeric.mul( res.s, numeric.sub(points[1], points[0])), 
															numeric.mul( res.t, numeric.sub(points[2], points[0])) );

		numeric.norm2( numeric.sub( res.point, p_srf ) ).should.be.approximately(0, verb.TOLERANCE );

	});

	it('gives correct result for intersecting axis aligned segment and planar triangle ', function(){

		// line from [5,5,5] to [5,5,-5]
		var p0 = [ 5,5,5 ]
			, p1 = [ 5,5,-10 ]
			, points = [ [0,0,0], [10,0,0], [5,10,0] ]
			, tri = [ 0, 1, 2 ];

		var res = verb.eval.geom.intersect_segment_with_tri( p0, p1, points, tri );

		res.p.should.be.approximately(0.333333333333, verb.TOLERANCE);
		res.s.should.be.approximately(0.25, verb.TOLERANCE);
		res.t.should.be.approximately(0.5, verb.TOLERANCE);

		var p_srf = numeric.add( 	points[0], 
															numeric.mul( res.s, numeric.sub(points[1], points[0])), 
															numeric.mul( res.t, numeric.sub(points[2], points[0])) );

		numeric.norm2( numeric.sub( res.point, p_srf ) ).should.be.approximately(0, verb.TOLERANCE );

	});

	it('gives null for non-intersecting segment and triangle', function(){

		// line from [5,5,5] to [5,5,-5]
		var p0 = [ 5,5,5 ]
			, p1 = [ 5,5,4 ]

			// planar triangle
			, points = [ [0,0,0], [10,0,0], [5,10,0] ]
			, tri = [ 0, 1, 2 ];

		var res = verb.eval.geom.intersect_segment_with_tri( p0, p1, points, tri );

		(null === res).should.be.true;

	});

});


