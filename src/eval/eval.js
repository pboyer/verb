//
// ####curve_bezier_decompose( degree, knots, control_points, u )
//
// Decompose a NURBS curve into a collection of bezier's.  Useful
// as each bezier fits into it's convex hull.  This is a useful starting
// point for intersection, closest point, algorithms
//
// **params**
// + *Number*, integer degree
// + *Array*, array of nondecreasing knot values
// + *Array*, array of control points
// 
// **returns** 
// + *Array* of curves, defined by degree, knots, and control points
//
verb.eval.nurbs.curve_bezier_decompose = function( degree, knots, control_points ) {

	// find all of the unique knot values and their multiplicity
	// for each, increase their multiplicity to degree + 1
	
}

//
// ####curve_split( degree, knots, control_points, u )
//
// Split a curve into two parts
//
// **params**
// + *Number*, integer degree
// + *Array*, array of nondecreasing knot values
// + *Array*, array of control points
// + *Number*, location to split the curve
// 
// **returns** 
// + *Array* two new curves, defined by degree, knots, and control points
//
verb.eval.nurbs.curve_split = function( degree, knots, control_points, u ) {

	var knots_to_insert = [];
	for (var i = 0; i < degree+1; i++) knots_to_insert.push(u);
	var res = verb.eval.nurbs.curve_knot_refine( degree, knots, control_points, knots_to_insert );

	var s = verb.eval.nurbs.knot_span( degree, u, knots );

	var knots0 = res.knots.slice(0, s + degree + 2);
	var knots1 = res.knots.slice( s + 1 );

	var cpts0 = res.control_points.slice( 0, s + 1 );
	var cpts1 = res.control_points.slice( s + 1 );

	return [
		{ degree: degree, knots: knots0, control_points: cpts0 },
		{ degree: degree, knots: knots1, control_points: cpts1 }
	];

}

//
// ####curve_knot_refine( degree, knots, control_points, knots_to_insert )
//
// Insert a collection of knots on a curve
//
// Corresponds to Algorithm A5.4 (Piegl & Tiller)
//
// **params**
// + *Number*, integer degree
// + *Array*, array of nondecreasing knot values
// + *Array*, array of control points
// + *Array*, knots to insert
// 
// **returns** 
// + *Object* the new curve, defined by knots and control_points
//

verb.eval.nurbs.curve_knot_refine = function( degree, knots, control_points, knots_to_insert ) {

	var n = control_points.length - 1
		, m = n + degree + 1
		, r = knots_to_insert.length - 1
		, a = verb.eval.nurbs.knot_span( degree, knots_to_insert[0], knots ) 
		, b = verb.eval.nurbs.knot_span( degree, knots_to_insert[r], knots )
		, control_points_post = new Array( control_points.length + r + 1 )
		, knots_post = new Array( knots.length + r + 1 )
		, i = 0
		, j = 0;

	// new control pts
	for (i = 0; i <= a - degree; i++) {
		control_points_post[i] = control_points[i];
	}

	for (i = b-1; i <= n; i++) {
		control_points_post[i+r+1] = control_points[i];
	}

	// new knot vector
	for (i = 0; i <= a; i++) {
		knots_post[i] = knots[i];
	}

	for (i = b+degree; i <= m; i++){
		knots_post[i+r+1] = knots[i];
	}

	i = b + degree - 1;
	k = b + degree + r;

	for (j=r; j>=0; j--) {

		while (knots_to_insert[j] <= knots[i] && i > a){

			control_points_post[k-degree-1] = control_points[i-degree-1];
			knots_post[k] = knots[i];
			k = k-1;
			i = i-1;

		}

		control_points_post[k-degree-1] = control_points_post[k-degree];

		for (var l = 1; l <= degree; l++){

			var ind = k-degree+l;
			var alfa = knots_post[k+l] - knots_to_insert[j];

			if (Math.abs(alfa) < verb.EPSILON){
				control_points_post[ind-1] = control_points_post[ind];
			} else {
				alfa = alfa / (knots_post[k+l] - knots[i-degree+l]);
				control_points_post[ind-1] =
									numeric.add( 
										numeric.mul( alfa, control_points_post[ind-1] ), 
										numeric.mul( (1.0 - alfa), control_points_post[ind]) 
									);
			}

		}

		knots_post[k] = knots_to_insert[j];
		k = k - 1;

	}

	return { knots: knots_post, control_points: control_points_post };

}

//
// ####curve_knot_insert( degree, knots, control_points, u, r )
//
// Insert a knot along a rational curve.  Note that this algorithm only works
// for r + s <= degree, where s is the initial multiplicity (number of duplicates) of the knot.
//
// Corresponds to algorithm A5.1 (Piegl & Tiller)
//
// Use the curve_knot_refine for applications like curve splitting.
//
// **params**
// + *Number*, integer degree
// + *Array*, array of nondecreasing knot values
// + *Array*, array of control points
// + *Number*, parameter at which to insert the knot
// + *Number*, number of times to insert the knot
// 
// **returns** 
// + *Object* the new curve, defined by knots and control_points
//

verb.eval.nurbs.curve_knot_insert = function( degree, knots, control_points, u, r ) {

	// num_pts is num control points for the initial curve
	// k is the span on which the knots are inserted
	// s is the initial multiplicity of the knot
	// r is the number of times to insert the knot
	// control_points is initial set of control points

	var s = 0; // assume original multiplicity is 0 - TODO add check for multiplicity in knots

	var num_pts = control_points.length
		, k = verb.eval.nurbs.knot_span( degree, u, knots ) // the span in which the knot will be inserted
		, num_pts_post = num_pts + r // a new control pt for every new knot    
		, control_points_temp = new Array( degree - s )  
		, knots_post = new Array( knots.length + r )  // r new knots
		, control_points_post = new Array( num_pts_post ) 
		, i = 0;

	// new knot vector

		// insert the k knots that will not be affected
		for (i = 0; i <= k; i++) {
			knots_post[i] = knots[i];
		}
		
		// insert the new repeat knots
		for (i = 1; i <= r; i++) {
			knots_post[k+i] = u; 
		}

		// insert the rest of the knots
		for (i = k+1; i < knots.length; i++) {
			knots_post[i+r] = knots[i];
		}

	// control point generation

		// copy the original control points before the insertion span
		for (i = 0; i <= k - degree; i++) {
			control_points_post[i] = control_points[i]; 
		}

		// copy the original controls after the insertion span
		for (i = k-s; i < num_pts; i++) {
			control_points_post[i+r] = control_points[i];
		}

		// collect the affected control points in this temporary array
		for (i = 0; i <= degree-s; i++) {
			control_points_temp[i] = control_points[k-degree+i];
		}

	var L = 0
		, alpha = 0;

	// insert knot r times
	for (var j = 1; j <= r; j++) {

		L = k-degree+j;

		for (i = 0; i <= degree-j-s; i++) {

			alpha = ( u - knots[L+i] ) / ( knots[i+k+1] - knots[L+i] );

			control_points_temp[i] = 
				numeric.add( 
					numeric.mul( alpha, control_points_temp[i+1] ), 
					numeric.mul( (1.0 - alpha), control_points_temp[i]) 
				);


		}

		control_points_post[ L ] = control_points_temp[0];
		control_points_post[k+r-j-s] = control_points_temp[degree-j-s];

	}

	// not so confident about this part
	for (i = L+1; i < k-s; i++) {
		control_points_post[i] = control_points_temp[ i - L ];
	}

	return { knots: knots_post, control_points: control_points_post };

}


//
// ####surface_curvature( degree_u, knots_u, degree_v, knots_v, control_points, u, v, options )
//
// Compute the gaussian curvature on a non-uniform, non-rational B spline surface
//
// **params**
// + *Number*, integer degree of surface in u direction
// + *Array*, array of nondecreasing knot values in u direction
// + *Number*, integer degree of surface in v direction
// + *Array*, array of nondecreasing knot values in v direction
// + *Array*, 3d array of control points, where rows are the u dir, and columns run alonsg the positive v direction, 
// and where each control point is an array of length (dim)  
// + *Number*, u parameter at which to evaluate the derivatives
// + *Number*, v parameter at which to evaluate the derivatives
// 
// **returns** 
// + *Array*, a point represented by an array of length (dim)
//

verb.eval.nurbs.rational_surface_curvature = function( degree_u, knots_u, degree_v, knots_v, homo_control_points, u, v ) {

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

	var derivs = verb.eval.nurbs.rational_surface_derivs( 	degree_u, 
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

  var n = numeric.cross( du, dv );
  var L = numeric.dot( duu, n );
  var M = numeric.dot( duv, n );
  var N = numeric.dot( dvv, n );

  var shapeOperator = [ [ L, M ], [ M, N ] ];

	var eigs = numeric.eig( shapeOperator );

	// contains: lambda - x
	// 			     E - x
	
	var k1 = eigs.lambda.x[0];
	var k2 = eigs.lambda.x[1];
	var mean = 0.5 * ( k1 + k2 );
	var gaussian = k1 * k2;
	var p1 = numeric.add( numeric.mul( eigs.E.x[0][0], du ), numeric.mul( eigs.E.x[0][1], dv ) );
	var p2 = numeric.add( numeric.mul( eigs.E.x[1][0], du ), numeric.mul( eigs.E.x[1][1], dv ) );

	return { point: derivs[0][0], normal: n, mean: mean, gaussian: gaussian, shapeOperator: shapeOperator, k1: k1, k2: k2, p1: p1, p2: p2, p1p : eigs.E.x[0], p2p: eigs.E.x[1]  };

};


//
// ####rational_surface_derivs( degree_u, knots_u, degree_v, knots_v, homo_control_points, num_derivs, u, v)
//
// Compute the derivatives at a point on a NURBS surface
//
// **params**
// + *Number*, integer degree of surface in u direction
// + *Array*, array of nondecreasing knot values in u direction
// + *Number*, integer degree of surface in v direction
// + *Array*, array of nondecreasing knot values in v direction
// + *Array*, 3d array of control points, where rows are the u dir, and columns run along the positive v direction, 
// and where each control point is an array of length (dim)  
// + *Number*, u parameter at which to evaluate the derivatives
// + *Number*, v parameter at which to evaluate the derivatives
// + *Array*, 1d array of control point weights 
// 
// **returns** 
// + *Array*, a point represented by an array of length (dim)
//

verb.eval.nurbs.rational_surface_derivs = function( degree_u, knots_u, degree_v, knots_v, homo_control_points, num_derivs, u, v) {

	var SKL_homo = verb.eval.nurbs.surface_derivs( degree_u, knots_u, degree_v, knots_v, homo_control_points, num_derivs, u, v )
		, ders = verb.eval.nurbs.separate_homo_derivs_2d( SKL_homo )
		, Aders = ders[0]
		, wders = ders[1]
		, k = 0
		, i  = 0
		, j = 0
		, l = 0
		, SKL = []
		, dim = Aders[0][0].length;

	for (k = 0; k <= num_derivs; k++) {
		SKL.push([]);

		for (l = 0; l <= num_derivs-k; l++) {

			var v = Aders[k][l];
			for (j=1; j <= l; j++) {
				v = numeric.sub( v, numeric.mul( numeric.mul( binomial.get(l, j), wders[0][j] ), SKL[k][l-j] ) );
			}

			for (i = 1; i <= k; i++) {
				v = numeric.sub( v, numeric.mul( numeric.mul( binomial.get(k, i), wders[i][0] ), SKL[k-i][l] ) );
				
				var v2 = verb.eval.nurbs.zeros_1d(dim);

				for (j = 1; j <= l; j++) {
					v2 = numeric.add( v2, numeric.mul( numeric.mul( binomial.get(l, j), wders[i][j] ), SKL[k-i][l-j] ) );
				}

				v = numeric.sub( v, numeric.mul( binomial.get(k, i), v2) );

			}
			SKL[k].push( numeric.mul(1/wders[0][0], v )); // demogenize

		}
	}

	return SKL;

}

//
// ####rational_surface_point( degree_u, knots_u,  degree_v, knots_v, homo_control_points, u, v )
//
// Compute a point on a NURBS surface
//
// **params**
// + *Number*, integer degree of surface in u direction
// + *Array*, array of nondecreasing knot values in u direction
// + *Number*, integer degree of surface in v direction
// + *Array*, array of nondecreasing knot values in v direction
// + *Array*, 3d array of control points (tensor), top to bottom is increasing u direction, left to right is increasing v direction,
// and where each control point is an array of length (dim+1)
// + *Number*, u parameter at which to evaluate the surface point
// + *Number*, v parameter at which to evaluate the surface point
// 
// **returns** 
// + *Array*, a point represented by an array of length (dim)
//

verb.eval.nurbs.rational_surface_point = function( degree_u, knots_u,  degree_v, knots_v, homo_control_points, u, v ) {

	return verb.eval.nurbs.dehomogenize( verb.eval.nurbs.surface_point( degree_u, knots_u,  degree_v, knots_v, homo_control_points, u, v ) );

};

//`
// ####rational_curve_derivs( degree, knots, homo_control_points, u, num_derivs )
//
// Determine the derivatives of a NURBS curve at a given parameter
//
// **params**
// + *Number*, integer degree of curve
// + *Array*, array of nondecreasing knot values
// + *Array*, 2d array of homogeneous control points, where each control point is an array of length (dim+1) and form (wi*pi, wi)
// + *Number*, parameter on the curve at which the point is to be evaluated
// 
// **returns** 
// + *Array*, a point represented by an array of length (dim)
//

verb.eval.nurbs.rational_curve_derivs = function( degree, knots, homo_control_points, u, num_derivs ) {

	// compute the derivatives of the control points
	// separate derivative array into two
	var ders = verb.eval.nurbs.separate_homo_derivs_1d( verb.eval.nurbs.curve_derivs( degree, knots, homo_control_points, u, num_derivs ) )
		, Aders = ders[0]
		, wders = ders[1]
		, k = 0
		, i  = 0
		, CK = [];

	for (k = 0; k <= num_derivs; k++) {
		var v = Aders[k];

		for (i = 1; i <= k; i++) {
			v = numeric.sub( v, numeric.mul( numeric.mul( binomial.get(k, i), wders[i] ), CK[k-i] ) );
		}
		CK.push( numeric.mul(1/wders[0], v )); // demogenize
	}

	return CK;

};	


//
// ####separate_homo_derivs_1d( ck )
//
// Separate the array of derivatives into the A(u) component and w(u), i.e. the weight and everything else without dehomogenization
//
// **params**
// + *Array*, 1d array of homogeneous derivatives
// 
// **returns** 
// + *Array*, an array with Aders and wders as element 0 and 1, respectively
//

verb.eval.nurbs.separate_homo_derivs_1d = function( CK ) {

	var dim = CK[0].length
		, last = dim-1
		, Aders = []
		, wders = [];

	for ( var i = 0, l = CK.length; i < l; i++ ) {
		Aders.push( CK[i].slice(0, last) );
		wders.push( CK[i][last] );
	}

	return [Aders, wders];

};

//
// ####separate_homo_derivs_2d( skl )
//
// Separate the array of derivatives into the A(u) component and w(u), i.e. the weight and everything else without dehomogenization
//
// **params**
// + *Array*, 2d array of homogeneous derivatives
// 
// **returns** 
// + *Array*, an array with Aders and wders as element 0 and 1, respectively
//

verb.eval.nurbs.separate_homo_derivs_2d = function( SKL ) {

	var Aders = []
		, wders = [];

	for ( var i = 0, l = SKL.length; i < l; i++ ) {
		var CK = verb.eval.nurbs.separate_homo_derivs_1d( SKL[i] );
		Aders.push( CK[0] );
		wders.push( CK[1] );
	}

	return [Aders, wders];

};


//
// ####rational_curve_point( degree, knots, homo_control_points, u)
//
// Compute a point on a NURBS curve
//
// **params**
// + *Number*, integer degree of curve
// + *Array*, array of nondecreasing knot values
// + *Array*, 2d array of homogeneous control points, where each control point is an array of length (dim+1) 
// and form (wi*pi, wi)
// + *Number*, parameter on the curve at which the point is to be evaluated
// 
// **returns** 
// + *Array*, a point represented by an array of length (dim)
//

verb.eval.nurbs.rational_curve_point = function( degree, knots, homo_control_points, u) {

	return verb.eval.nurbs.dehomogenize( verb.eval.nurbs.curve_point( degree, knots, homo_control_points, u) );

};

//
// ####dehomogenize( homo_point )
//
// Dehomogenize a point 
//
// **params**
// + *Array*, a point represented by an array (wi*pi, wi) with length (dim+1)
// 
// **returns** 
// + *Array*, a point represented by an array pi with length (dim)
//

verb.eval.nurbs.dehomogenize = function( homo_point ) {

	var dim = homo_point.length
		, point = []
		, wt = homo_point[dim-1];

	for (var i = 0; i < homo_point.length-1;i++)
		point.push( homo_point[i] / wt );

	return point;

};

//
// ####weights_1d( homo_points )
//
// Obtain the weight from a collection of points in homogeneous space, assuming all
// are the same dimension
//
// **params**
// + *Array*, array of points represented by an array (wi*pi, wi) with length (dim+1)
// 
// **returns** 
// + *Array*, a point represented by an array pi with length (dim)
//

verb.eval.nurbs.weight_1d = function( homo_points ) {

	var dim = homo_points[0].length - 1;

	return homo_points.map(function(x){ return x[dim]; });

};

//
// ####dehomogenize_1d( homo_points )
//
// Dehomogenize a point 
//
// **params**
// + *Array*, array of points represented by an array (wi*pi, wi) with length (dim+1)
// 
// **returns** 
// + *Array*, an array of points, each of length dim
//

verb.eval.nurbs.dehomogenize_1d = function( homo_points ) {

	return homo_points.map(function(x){ return verb.eval.nurbs.dehomogenize( x ); });

};

//
// ####homogenize_1d( control_points, weights) 
//
// Transform a 1d array of points into their homogeneous equivalents
//
// **params**
// + *Array*, 1d array of control points, (actually a 2d array of size (m x dim) )
// + *Array*, array of control point weights, the same size as the array of control points (m x 1)
// 
// **returns** 
// + *Array*, 1d array of control points where each point is (wi*pi, wi) where wi 
// i the ith control point weight and pi is the ith control point, 
// hence the dimension of the point is dim + 1

//

verb.eval.nurbs.homogenize_1d = function( control_points, weights) {

	var rows = control_points.length
		, dim = control_points[0].length
		, k = 0
		, homo_control_points = []
		, wt = 0
		, ref_pt = [];

	for (var i = 0; i < rows; i++) {

		var pt = [];
		ref_pt = control_points[i];
		wt = weights[i];

		for (k = 0; k < dim; k++) {
			pt.push( ref_pt[k] * wt );
		}

		// append the weight
		pt.push(wt);

		homo_control_points.push(pt);
	}

	return homo_control_points;

};

//
// ####homogenize_2d( control_points, weights) 
//
// **params**
// + *Array*, 2d array of control points, (actually a 3d array of size m x n x dim)
// + *Array*, array of control point weights, the same size as the control points array (m x n x 1)
// 
// **returns** 
// + *Array*, 1d array of control points where each point is (wi*pi, wi) where wi 
// i the ith control point weight and pi is the ith control point, the size is 
// (m x n x dim+1)

//

verb.eval.nurbs.homogenize_2d = function( control_points, weights) {

	var rows = control_points.length
		, cols = control_points[0].length
		, dim = control_points[0][0].length
		, j = 0
		, k = 0
		, homo_control_points = []
		, wt = 0
		, ref_pt = [];

	for (var i = 0; i < rows; i++) {
		homo_control_points.push( verb.eval.nurbs.homogenize_1d(control_points[i], weights[i]) );
	}

	return homo_control_points;

};

//
// ####surface_derivs( degree_u, knots_u, degree_v, knots_v, control_points, num_derivatives, u, v )
//
// Compute the derivatives on a non-uniform, non-rational B spline surface
//
// **params**
// + *Number*, integer degree of surface in u direction
// + *Array*, array of nondecreasing knot values in u direction
// + *Number*, integer degree of surface in v direction
// + *Array*, array of nondecreasing knot values in v direction
// + *Array*, 3d array of control points, where rows are the u dir, and columns run along the positive v direction, 
// and where each control point is an array of length (dim)  
// + *Number*, u parameter at which to evaluate the derivatives
// + *Number*, v parameter at which to evaluate the derivatives
// 
// **returns** 
// + *Array*, a point represented by an array of length (dim)
//

verb.eval.nurbs.surface_derivs = function( degree_u, knots_u, degree_v, knots_v, control_points, num_derivatives, u, v ) {

	var n = knots_u.length - degree_u - 2
		, m = knots_v.length - degree_v - 2;

	return verb.eval.nurbs.surface_derivs_given_n_m( n, degree_u, knots_u, m, degree_v, knots_v, control_points, num_derivatives, u, v );

};

//
// ####surface_derivs_given_n_m( n, degree_u, knots_u, m, degree_v, knots_v, control_points, num_derivatives, u, v )
//
// Compute the derivatives on a non-uniform, non-rational B spline surface 
// (corresponds to algorithm 3.6 from The NURBS book, Piegl & Tiller 2nd edition)
//
// **params**
// + *Number*, integer number of basis functions in u dir - 1 = knots_u.length - degree_u - 2
// + *Number*, integer degree of surface in u direction
// + *Array*, array of nondecreasing knot values in u direction
// + *Number*, integer number of basis functions in v dir - 1 = knots_u.length - degree_u - 2
// + *Number*, integer degree of surface in v direction
// + *Array*, array of nondecreasing knot values in v direction
// + *Array*, 3d array of control points, where rows are the u dir, and columns run along the positive v direction, 
// and where each control point is an array of length (dim)  
// + *Number*, u parameter at which to evaluate the derivatives
// + *Number*, v parameter at which to evaluate the derivatives
// 
// **returns** 
// + *Array*, a point represented by an array of length (dim)
//

verb.eval.nurbs.surface_derivs_given_n_m = function( n, degree_u, knots_u, m, degree_v, knots_v, control_points, num_derivatives, u, v ) {

	if ( verb.eval.nurbs.are_valid_relations(degree_u, control_points.length, knots_u.length ) === false ||
		verb.eval.nurbs.are_valid_relations(degree_v, control_points[0].length, knots_v.length ) === false ) {
		console.error('Invalid relations between control points, knot vector, and n');
		return null;
	}

	var dim = control_points[0][0].length
		, du = Math.min(num_derivatives, degree_u)
		, dv = Math.min(num_derivatives, degree_v)
		, SKL = verb.eval.nurbs.zeros_3d( du+1, dv+1, dim )
		, knot_span_index_u = verb.eval.nurbs.knot_span_given_n( n, degree_u, u, knots_u )
		, knot_span_index_v = verb.eval.nurbs.knot_span_given_n( m, degree_v, v, knots_v )
		, uders = verb.eval.nurbs.deriv_basis_functions_given_n_i( knot_span_index_u, u, degree_u, n, knots_u )  
		, vders = verb.eval.nurbs.deriv_basis_functions_given_n_i( knot_span_index_v, v, degree_v, m, knots_v )
		, temp = verb.eval.nurbs.zeros_2d( degree_v+1, dim )
		, k = 0
		, s = 0
		, r = 0
		, l = 0
		, dd = 0;

	for (k = 0; k <= du; k++) {	
		for (s = 0; s <= degree_v; s++) {		
			temp[s] = verb.eval.nurbs.zeros_1d( dim );

			for (r = 0; r <= degree_u; r++) {	
				temp[s] = numeric.add( temp[s], numeric.mul( uders[k][r], control_points[knot_span_index_u-degree_u+r][knot_span_index_v-degree_v+s]) );
			}
		}

		dd = Math.min(num_derivatives-k, dv);

		for (l = 0; l <= dd; l++) {	
			SKL[k][l] = verb.eval.nurbs.zeros_1d( dim );

			for (s = 0; s <= degree_v; s++) {	
				SKL[k][l] = numeric.add( SKL[k][l], numeric.mul( vders[l][s], temp[s] ) );
			}
		}
	}

	return SKL;
}

//
// ####surface_point( degree_u, knots_u, degree_v, knots_v, control_points, u, v)
//
// Compute a point on a non-uniform, non-rational B-spline surface
//
// **params**
// + *Number*, integer degree of surface in u direction
// + *Array*, array of nondecreasing knot values in u direction
// + *Number*, integer degree of surface in v direction
// + *Array*, array of nondecreasing knot values in v direction
// + *Array*, 3d array of control points, where rows are the u dir, and columns run along the positive v direction, 
// and where each control point is an array of length (dim)  
// + *Number*, u parameter at which to evaluate the surface point
// + *Number*, v parameter at which to evaluate the surface point
// 
// **returns** 
// + *Array*, a point represented by an array of length (dim)
//

verb.eval.nurbs.surface_point = function( degree_u, knots_u, degree_v, knots_v, control_points, u, v) {

	var n = knots_u.length - degree_u - 2
		, m = knots_v.length - degree_v - 2;

	return 	verb.eval.nurbs.surface_point_given_n_m( n, degree_u, knots_u, m, degree_v, knots_v, control_points, u, v );

}

//
// ####volume_point( degree_u, knots_u, degree_v, knots_v, degree_w, knots_w, control_points, u, v, w  )
//
// Compute a point in a non-uniform, non-rational B spline volume
//
// **params**
// + *Number*, integer number of basis functions in u dir - 1 = knots_u.length - degree_u - 2
// + *Number*, integer degree of volume in u direction
// + *Array*, array of nondecreasing knot values in u direction
// + *Number*, integer number of basis functions in v dir - 1 = knots_v.length - degree_v - 2
// + *Number*, integer degree of volume in v direction
// + *Array*, array of nondecreasing knot values in v direction
// + *Number*, integer number of basis functions in w dir - 1 = knots_w.length - degree_w - 2
// + *Number*, integer degree of volume in w direction
// + *Array*, array of nondecreasing knot values in w direction
// + *Array*, 4d array of control points where each control point is an array of length (dim)  
// + *Number*, u parameter at which to evaluate the volume point
// + *Number*, v parameter at which to evaluate the volume point
// + *Number*, w parameter at which to evaluate the volume point
// 
// **returns** 
// + *Array*, a point represented by an array of length (dim)
//

verb.eval.nurbs.volume_point = function( degree_u, knots_u, degree_v, knots_v, degree_w, knots_w, control_points, u, v, w ) {

	var n = knots_u.length - degree_u - 2
		, m = knots_v.length - degree_v - 2
		, l = knots_w.length - degree_w - 2;

	return verb.eval.nurbs.volume_point_given_n_m_l( n, degree_u, knots_u, m, degree_v, knots_v, l, degree_w, knots_w, control_points, u, v, w );

}

//
// ####volume_point_given_n_m_l( n, degree_u, knots_u, m, degree_v, knots_v, l, degree_w, knots_w, control_points, u, v, w )
//
// Compute a point in a non-uniform, non-rational B spline volume
//
// **params**
// + *Number*, integer number of basis functions in u dir - 1 = knots_u.length - degree_u - 2
// + *Number*, integer degree of volume in u direction
// + *Array*, array of nondecreasing knot values in u direction
// + *Number*, integer number of basis functions in v dir - 1 = knots_v.length - degree_v - 2
// + *Number*, integer degree of volume in v direction
// + *Array*, array of nondecreasing knot values in v direction
// + *Number*, integer number of basis functions in w dir - 1 = knots_w.length - degree_w - 2
// + *Number*, integer degree of volume in w direction
// + *Array*, array of nondecreasing knot values in w direction
// + *Array*, 4d array of control points where each control point is an array of length (dim)  
// + *Number*, u parameter at which to evaluate the volume point
// + *Number*, v parameter at which to evaluate the volume point
// + *Number*, w parameter at which to evaluate the volume point
// 
// **returns** 
// + *Array*, a point represented by an array of length (dim)
//

verb.eval.nurbs.volume_point_given_n_m_l = function( n, degree_u, knots_u, m, degree_v, knots_v, l, degree_w, knots_w, control_points, u, v, w ) {

	if ( 	!verb.eval.nurbs.are_valid_relations(degree_u, control_points.length, knots_u.length ) ||
				!verb.eval.nurbs.are_valid_relations(degree_v, control_points[0].length, knots_v.length ) || 
				!verb.eval.nurbs.are_valid_relations(degree_w, control_points[0][0].length, knots_w.length ) ) {
		console.error('Invalid relations between control points and knot vector');
		return null;
	}

	var dim = control_points[0][0][0].length
		, knot_span_index_u = verb.eval.nurbs.knot_span_given_n( n, degree_u, u, knots_u )
		, knot_span_index_v = verb.eval.nurbs.knot_span_given_n( m, degree_v, v, knots_v )
		, knot_span_index_w = verb.eval.nurbs.knot_span_given_n( l, degree_w, w, knots_w )
		, u_basis_vals = verb.eval.nurbs.basis_functions_given_knot_span_index( knot_span_index_u, u, degree_u, knots_u )
		, v_basis_vals = verb.eval.nurbs.basis_functions_given_knot_span_index( knot_span_index_v, v, degree_v, knots_v )
		, w_basis_vals = verb.eval.nurbs.basis_functions_given_knot_span_index( knot_span_index_w, w, degree_w, knots_w )
		, uind = knot_span_index_u - degree_u
		, vind = knot_span_index_v
		, wind = knot_span_index_w
		, position = verb.eval.nurbs.zeros_1d( dim )
		, temp = verb.eval.nurbs.zeros_1d( dim )
		, temp2 = verb.eval.nurbs.zeros_1d( dim )
		, j = 0
		, k = 0;

	for (var i = 0; i <= degree_w; i++){

		temp2 = verb.eval.nurbs.zeros_1d( dim );
		wind = knot_span_index_w - degree_w + i;

		for (j = 0; j <= degree_v; j++) {	

			temp = verb.eval.nurbs.zeros_1d( dim );
			vind = knot_span_index_v  - degree_v + j;

			for (k = 0; k <= degree_u; k++) {	

				// sample u isoline
				temp = numeric.add( temp, 
														numeric.mul( u_basis_vals[k], control_points[uind+k][vind][wind] ));
			}

			// add weighted contribution of u isoline
			temp2 = numeric.add( temp2, 
													numeric.mul( v_basis_vals[j], temp ) );
		}

		// add weighted contribution from uv isosurfaces
		position = numeric.add( position, 
														numeric.mul( w_basis_vals[i], temp2 ) );

	}

	return position;
}

//
// ####surface_point_given_n_m( n, degree_u, knots_u, m, degree_v, knots_v, control_points, u, v )
//
// Compute a point on a non-uniform, non-rational B spline surface
// (corresponds to algorithm 3.5 from The NURBS book, Piegl & Tiller 2nd edition)
//
// **params**
// + *Number*, integer number of basis functions in u dir - 1 = knots_u.length - degree_u - 2
// + *Number*, integer degree of surface in u direction
// + *Array*, array of nondecreasing knot values in u direction
// + *Number*, integer degree of surface in v direction
// + *Array*, array of nondecreasing knot values in v direction
// + *Array*, 3d array of control points, where rows are the u dir, and columns run along the positive v direction, 
// and where each control point is an array of length (dim)  
// + *Number*, u parameter at which to evaluate the surface point
// + *Number*, v parameter at which to evaluate the surface point
// 
// **returns** 
// + *Array*, a point represented by an array of length (dim)
//

verb.eval.nurbs.surface_point_given_n_m = function( n, degree_u, knots_u, m, degree_v, knots_v, control_points, u, v ) {

	if ( verb.eval.nurbs.are_valid_relations(degree_u, control_points.length, knots_u.length ) === false ||
		verb.eval.nurbs.are_valid_relations(degree_v, control_points[0].length, knots_v.length ) === false ) {
		console.error('Invalid relations between control points, knot vector, and n');
		return null;
	}

	var dim = control_points[0][0].length
		, knot_span_index_u = verb.eval.nurbs.knot_span_given_n( n, degree_u, u, knots_u )
		, knot_span_index_v = verb.eval.nurbs.knot_span_given_n( m, degree_v, v, knots_v )
		, u_basis_vals = verb.eval.nurbs.basis_functions_given_knot_span_index( knot_span_index_u, u, degree_u, knots_u )
		, v_basis_vals = verb.eval.nurbs.basis_functions_given_knot_span_index( knot_span_index_v, v, degree_v, knots_v )
		, uind = knot_span_index_u - degree_u
		, vind = knot_span_index_v
		, position = verb.eval.nurbs.zeros_1d( dim )
		, temp = verb.eval.nurbs.zeros_1d( dim )
		, l = 0
		, k = 0;

	for (l = 0; l <= degree_v; l++) {	

		temp = verb.eval.nurbs.zeros_1d( dim );
		vind = knot_span_index_v - degree_v + l;

		// sample u isoline
		for (k = 0; k <= degree_u; k++) {	
			temp = numeric.add( temp, numeric.mul( u_basis_vals[k], control_points[uind+k][vind]) );
		}

		// add point from u isoline
		position = numeric.add( position, numeric.mul(v_basis_vals[l], temp) );
	}

	return position;
}

//
// ####curve_derivs( degree, knots, control_points, u, num_derivs )
//
// Determine the derivatives of a non-uniform, non-rational B-spline curve at a given parameter
//
// **params**
// + *Number*, integer degree of curve
// + *Array*, array of nondecreasing knot values
// + *Array*, 2d array of control points, where each control point is an array of length (dim)  
// + *Number*, parameter on the curve at which the point is to be evaluated
// 
// **returns** 
// + *Array*, a point represented by an array of length (dim)
//

verb.eval.nurbs.curve_derivs = function( degree, knots, control_points, u, num_derivs ) {

	var n = knots.length - degree - 2;
	return verb.eval.nurbs.curve_derivs_given_n( n, degree, knots, control_points, u, num_derivs );

}		

//
// ####curve_derivs_given_n( n, degree, knots, control_points, u, num_derivatives )
//
// Determine the derivatives of a non-uniform, non-rational B-spline curve at a given parameter
// (corresponds to algorithm 3.1 from The NURBS book, Piegl & Tiller 2nd edition)
//
// **params**
// + *Number*, integer number of basis functions - 1 = knots.length - degree - 2
// + *Number*, integer degree of curve
// + *Array*, array of nondecreasing knot values
// + *Array*, 2d array of control points, where each control point is an array of length (dim)  
// + *Number*, parameter on the curve at which the point is to be evaluated
// 
// **returns** 
// + *Array*, a point represented by an array of length (dim)
//

verb.eval.nurbs.curve_derivs_given_n = function( n, degree, knots, control_points, u, num_derivatives ) {

	if ( verb.eval.nurbs.are_valid_relations(degree, control_points.length, knots.length ) === false ) {
		console.error('Invalid relations between control points, knot vector, and n');
		return null;
	}

	var dim = control_points[0].length
		, du = Math.min(num_derivatives, degree)
		, CK = verb.eval.nurbs.zeros_2d( du+1, dim )
		, knot_span_index = verb.eval.nurbs.knot_span_given_n( n, degree, u, knots )
		, nders = verb.eval.nurbs.deriv_basis_functions_given_n_i( knot_span_index, u, degree, du, knots )
		, k = 0
		, j = 0;

	for (k = 0; k <= du; k++) {	
		for (j = 0; j <= degree; j++) {
			CK[k] = numeric.add( CK[k], numeric.mul( nders[k][j], control_points[ knot_span_index - degree + j ] ) )
		}
	}
	return CK;

}		

//
// ####are_valid_relations( degree, num_control_points, knots_length )
//
// Confirm the relations between degree (p), number of control points(n+1), and the number of knots (m+1)
// via The NURBS Book (section 3.2, Second Edition)
//
// **params**
// + *Number*, integer degree
// + *Number*, integer number of control points
// + *Number*, integer length of the knot vector (including duplicate knots)
// 
// **returns** 
// + *Boolean*, whether the values are correct
//

verb.eval.nurbs.are_valid_relations = function( degree, num_control_points, knots_length ) {

	return ( num_control_points + degree + 1 - knots_length ) === 0 ? true : false;

}		

//
// ####curve_point( degree, knots, control_points, u)
//
// Compute a point on a non-uniform, non-rational b-spline curve
//
// **params**
// + *Number*, integer degree of curve
// + *Array*, array of nondecreasing knot values
// + *Array*, 2d array of control points, where each control point is an array of length (dim)  
// + *Number*, parameter on the curve at which the point is to be evaluated
// 
// **returns** 
// + *Array*, a point represented by an array of length (dim)
//

verb.eval.nurbs.curve_point = function( degree, knots, control_points, u) {

	var n = knots.length - degree - 2;
	return verb.eval.nurbs.curve_point_given_n( n, degree, knots, control_points, u);

}		

//
// ####curve_point_given_n( n, degree, knots, control_points, u)
//
// Compute a point on a non-uniform, non-rational b-spline curve
// (corresponds to algorithm 3.1 from The NURBS book, Piegl & Tiller 2nd edition)
//
// **params**
// + *Number*, integer number of basis functions - 1 = knots.length - degree - 2
// + *Number*, integer degree of curve
// + *Array*, array of nondecreasing knot values
// + *Array*, 2d array of control points, where each control point is an array of length (dim)  
// + *Number*, parameter on the curve at which the point is to be evaluated
// 
// **returns** 
// + *Array*, a point represented by an array of length (dim)
//

verb.eval.nurbs.curve_point_given_n = function( n, degree, knots, control_points, u) {

	if ( verb.eval.nurbs.are_valid_relations(degree, control_points.length, knots.length ) === false ) {
		console.error('Invalid relations between control points, knot vector, and n');
		return null;
	}

	var knot_span_index = verb.eval.nurbs.knot_span_given_n( n, degree, u, knots )
		, basis_values = verb.eval.nurbs.basis_functions_given_knot_span_index( knot_span_index, u, degree, knots ) 
		, position = verb.eval.nurbs.zeros_1d( control_points[0].length );

		for (var j = 0; j <= degree; j++ )	{
			position = numeric.add( position, numeric.mul( basis_values[j], control_points[ knot_span_index - degree + j ] ) );
		}

		return position;
}	

//
// ####zeros_1d(size)
//
// Generate a 1d array of zeros
//
// **params**
// + *Number*, integer number of rows
// 
// **returns** 
// + *Array*, 1d array of given size
//

verb.eval.nurbs.zeros_1d = function(size) {
  size = size > 0 ? size : 0;

  var arr = [];

  while(size--) {
    arr.push(0);
  }

  return arr;
}

//
// ####zeros_2d(rows, cols)
//
// Generate a 2D array of zeros
//
// **params**
// + *Number*, integer number of rows
// + *Number*, integer number of columns
// 
// **returns** 
// + *Array*, 2d array of given size
//

verb.eval.nurbs.zeros_2d = function(rows, cols) {
  cols = cols > 0 ? cols : 0;
  rows = rows > 0 ? rows : 0;

  var arr = [];
  var cols_temp = cols;
  var rows_temp = rows;

  while(rows--) {
    arr.push([]);

    while(cols_temp--) {
      arr[rows_temp-rows-1].push(0);
    }
    cols_temp = cols;
  }

  return arr;
}

//
// ####zeros_3d(rows, cols, dim)
//
// Generate a 3D array of zeros
//
// **params**
// + *Number*, integer number of rows
// + *Number*, integer number of columns
// + *Number*, integer depth (i.e. dimension of arrays in 2d matrix)
// 
// **returns** 
// + *Array*, 3d array of given size
//

verb.eval.nurbs.zeros_3d = function(rows, cols, dim) {
  cols = cols > 0 ? cols : 0;
  rows = rows > 0 ? rows : 0;

  var arr = [];
  var cols_temp = cols;
  var rows_temp = rows;

  while(rows--) {
    arr.push([]);

    while(cols_temp--) {
      arr[rows_temp-rows-1].push( verb.eval.nurbs.zeros_1d(dim) );
    }
    cols_temp = cols;
  }

  return arr;
}

//
// ####deriv_basis_functions( u, degree, knots )
//
// Compute the non-vanishing basis functions and their derivatives
//
// **params**
// + *Number*, float parameter
// + *Number*, integer degree
// + *Array*, array of nondecreasing knot values
// 
// **returns** 
// + *Array*, 2d array of basis and derivative values of size (n+1, p+1) The nth row is the nth derivative and the first row is made up of the basis function values.
//

verb.eval.nurbs.deriv_basis_functions = function( u, degree, knots )
{
	var knot_span_index = verb.eval.nurbs.knot_span( degree, u, knots )
		, m = knots.length - 1
		, n = m - degree - 1;

	return verb.eval.nurbs.deriv_basis_functions_given_n_i( knot_span_index, u, degree, n, knots );
}	

//
// ####deriv_basis_functions_given_n_i( knot_span_index, u, p, n, knots )
//
// Compute the non-vanishing basis functions and their derivatives
// (corresponds to algorithm 2.3 from The NURBS book, Piegl & Tiller 2nd edition)
//
// **params**
// + *Number*, integer knot span index
// + *Number*, float parameter
// + *Number*, integer degree
// + *Number*, integer number of basis functions - 1 = knots.length - degree - 2
// + *Array*, array of nondecreasing knot values
// 
// **returns** 
// + *Array*, 2d array of basis and derivative values of size (n+1, p+1) The nth row is the nth derivative and the first row is made up of the basis function values.
//

verb.eval.nurbs.deriv_basis_functions_given_n_i = function( knot_span_index, u, p, n, knots )
{
	var ndu = verb.eval.nurbs.zeros_2d(p+1, p+1)
		, left = new Array( p + 1 )
		, right = new Array( p + 1 )
		, saved = 0
		, temp = 0
		, j = 1
		, r = 0;

	ndu[0][0] = 1.0;

	for(j = 1; j <= p; j++) {

		left[j] = u - knots[knot_span_index+1-j];
		right[j] = knots[knot_span_index+j] - u;
		saved = 0.0;

		for (r = 0; r < j; r++) {

			ndu[j][r] = right[r+1] + left[j-r];
			temp = ndu[r][j-1] / ndu[j][r];

			ndu[r][j] = saved + right[r+1]*temp;
			saved = left[j-r]*temp;

		}
		ndu[j][j] = saved;
	}


	var ders = verb.eval.nurbs.zeros_2d(n+1, p+1)
		, a = verb.eval.nurbs.zeros_2d(2, p+1)
		, k = 1
		, s1 = 0
		, s2 = 1
		, d = 0
		, rk = 0
		, pk = 0
		, j1 = 0
		, j2 = 0;

	for(j = 0; j <= p; j++) {
		ders[0][j] = ndu[j][p];
	}

	for (r = 0; r<=p; r++) {
		s1 = 0;
		s2 = 1;
		a[0][0] = 1.0;

		for (k=1; k<=n ;k++)
		{
			d = 0.0;
			rk = r - k;
			pk = p - k;

			if (r >= k) {
				a[s2][0] = a[s1][0] / ndu[pk+1][rk];
				d = a[s2][0]*ndu[rk][pk];
			}

			if (rk >= -1) {
				j1 = 1;
			} else {
				j1 = -rk;
			}

			if (r-1 <= pk) {
				j2 = k-1;
			} else {
				j2 = p - r;
			}

			for (j = j1; j <= j2; j++) {
				a[s2][j] = ( a[s1][j] - a[s1][ j - 1 ] ) / ndu[ pk + 1 ][ rk + j ];
				d += a[s2][j]*ndu[rk+j][pk];
			}

			if (r <= pk)
			{
				a[s2][k] = -a[s1][k-1]/ndu[pk+1][r];
				d += a[s2][k] * ndu[r][pk];
			}

			ders[k][r] = d;
			j = s1;
			s1 = s2;
			s2 = j;
		}
	}

	r = p;
	for (k = 1; k <= n; k++) {
		for (j = 0; j <= p; j++) {
			ders[k][j] *= r;
		}
		r *= (p-k);
	}

	return ders;

};

//
// ####basis_functions( u, degree, knots )
//
// Compute the non-vanishing basis functions
//
// **params**
// + *Number*, float parameter
// + *Number*, integer degree of function
// + *Array*, array of nondecreasing knot values
// 
// **returns** 
// + *Array*, list of non-vanishing basis functions
//

verb.eval.nurbs.basis_functions = function( u, degree, knots )
{
	var knot_span_index = verb.eval.nurbs.knot_span(u, degree, knots);
	return verb.eval.nurbs.basis_functions_given_knot_span_index( knot_span_index, u, degree, knots );
};

//
// ####basis_functions_given_knot_span_index( knot_span_index, u, degree, knots )
//
// Compute the non-vanishing basis functions
// (corresponds to algorithm 2.2 from The NURBS book, Piegl & Tiller 2nd edition)
//
// **params**
// + *Number*, integer knot span index
// + *Number*, float parameter
// + *Number*, integer degree of function
// + *Array*, array of nondecreasing knot values
// 
// **returns** 
// + *Array*, list of non-vanishing basis functions
//

verb.eval.nurbs.basis_functions_given_knot_span_index = function( knot_span_index, u, degree, knots )
{
	var basis_functions = new Array( degree + 1 )
		, left = new Array( degree + 1 )
		, right = new Array( degree + 1 )
		, saved = 0
		, temp = 0;

	basis_functions[0] = 1.0;

	for(var j = 1; j <= degree; j++) {

		left[j] = u - knots[knot_span_index+1-j];
		right[j] = knots[knot_span_index+j] - u;
		saved = 0.0;

		for (var r = 0; r < j; r++) {

			temp = basis_functions[r] / ( right[r+1] + left[j-r] );
			basis_functions[r] = saved + right[r+1]*temp;
			saved = left[j-r]*temp;

		}

		basis_functions[j] = saved;
	}

	return basis_functions;
};


//
// ####knot_span( degree, u, knots )
//
// Find the span on the knot vector without supplying n
//
// **params**
// + *Number*, integer degree of function
// + *Number*, float parameter
// + *Array*, array of nondecreasing knot values
// 
// **returns** 
// + *Number*, the index of the knot span
//

verb.eval.nurbs.knot_span = function( degree, u, knots )
{

	var m = knots.length - 1
		, n = m - degree - 1;

	return verb.eval.nurbs.knot_span_given_n(n, degree, u, knots);

};

//
// ####knot_span_given_n( n, degree, u, knots )
//
// Find the span on the knot vector knots of the given parameter
// (corresponds to algorithm 2.1 from The NURBS book, Piegl & Tiller 2nd edition)
//
// **params**
// + *Number*, integer number of basis functions - 1 = knots.length - degree - 2
// + *Number*, integer degree of function
// + *Number*, float parameter
// + *Array*, array of nondecreasing knot values
// 
// **returns** 
// + *Number*, the index of the knot span
//

verb.eval.nurbs.knot_span_given_n = function( n, degree, u, knots )
{
	if ( u >= knots[n+1] )
	{
		return n;
	}

	if ( u < knots[degree] )
	{
		return degree;
	}

	var low = degree
		, high = n+1
		, mid = Math.floor( (low + high) / 2 );

	while( u < knots[ mid ] || u >= knots[ mid + 1 ] )
	{
		if ( u < knots[ mid ] )
		{
			high = mid;
		}
		else 
		{
			low = mid;
		}
		mid = Math.floor( (low + high) / 2 );
	}

	return mid;

};
