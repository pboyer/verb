//
// ####surface_curvature( degree_u, knots_u, degree_v, knots_v, control_points, u, v, options )
//
// Compute the gaussian curvature on a non-uniform, non-rational B spline surface
//
// **params**
// + integer degree of surface in u direction
// + array of nondecreasing knot values in u direction
// + integer degree of surface in v direction
// + array of nondecreasing knot values in v direction
// + 3d array of control points, where rows are the u dir, and columns run alonsg the positive v direction,
// and where each control point is an array of length (dim)
// + u parameter at which to evaluate the derivatives
// + v parameter at which to evaluate the derivatives
//
// **returns**
// + a point represented by an array of length (dim)
//

public static function rational_surface_curvature( degree_u, knots_u, degree_v, knots_v, homo_control_points, u, v ) {

	// compute the first fundamental form

		// symmetric matrix where
		//
		// I = [ E F; F G ]
		//
		// where:
		//
		// E = Xu * Xu
		// F = Xu * Xv
		// G = Xv * Xv

	// second fundamental form (shape operator)

		// symmetric matrix where
		//
		// II = [ L M; M N ]
		//
		// where:
		//
		// L = Xuu * n
		// M = Xuv * n
		// N = Xvv * n

	// principal curvatures are the eigenvalues of the second fundamental form

	var derivs = rational_surface_derivs( 	degree_u,
															knots_u,
															degree_v,
															knots_v,
															homo_control_points,
															2, u, v );


	// structure of the derivatives

	// pos  du  vuu
	// dv   duv
  // dvv

  var du = derivs[0][1];
  var dv = derivs[1][0];
  var duu = derivs[0][2];
  var dvv = derivs[2][0];
  var duv = derivs[1][1];

  var n = Vec.cross( du, dv );
  var L = Vec.dot( duu, n );
  var M = Vec.dot( duv, n );
  var N = Vec.dot( dvv, n );

  var shapeOperator = [ [ L, M ], [ M, N ] ];

	var eigs = Vec.eig( shapeOperator );

	// contains: lambda - x
	// 			     E - x

	var k1 = eigs.lambda.x[0];
	var k2 = eigs.lambda.x[1];
	var mean = 0.5 * ( k1 + k2 );
	var gaussian = k1 * k2;
	var p1 = Vec.add( Vec.mul( eigs.E.x[0][0], du ), Vec.mul( eigs.E.x[0][1], dv ) );
	var p2 = Vec.add( Vec.mul( eigs.E.x[1][0], du ), Vec.mul( eigs.E.x[1][1], dv ) );

	return { point: derivs[0][0], normal: n, mean: mean, gaussian: gaussian, shapeOperator: shapeOperator, k1: k1, k2: k2, p1: p1, p2: p2, p1p : eigs.E.x[0], p2p: eigs.E.x[1]  };

};

