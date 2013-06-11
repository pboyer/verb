/**
 * Intersect two NURBS surfaces
 *
 * @param {Number} integer degree of surface in u direction
 * @param {Array} array of nondecreasing knot values in u direction
 * @param {Number} integer degree of surface in v direction
 * @param {Array} array of nondecreasing knot values in v direction
 * @param {Array} 3d array of control points, top to bottom is increasing u direction, left to right is increasing v direction,
 									and where each control point is an array of length (dim+1)
 * @param {Number} u parameter at which to evaluate the surface point
 * @param {Number} v parameter at which to evaluate the surface point
 * @return {Array} a point represented by an array of length (dim)
 * @api public
 */

VERB.eval.nurbs.rational_surface_surface_intersect = function( not, sure, yet ) {



}


/**
 * Intersect two NURBS curves
 *
 * @param {Number} integer degree of curve1
 * @param {Array} array of nondecreasing knot values for curve 1
 * @param {Array} 2d array of homogeneous control points, where each control point is an array of length (dim+1) 
 									and form (wi*pi, wi) for curve 1
 * @param {Number} integer degree of curve2
 * @param {Array} array of nondecreasing knot values for curve 2
 * @param {Array} 2d array of homogeneous control points, where each control point is an array of length (dim+1) 
 									and form (wi*pi, wi) for curve 2
 * @param {Number} tolerance for the intersection
 * @return {Array} a 2d array specifying the intersections on u params of intersections on curve 1 and cruve 2
 * @api public
 */

VERB.eval.nurbs.rational_curve_curve_bb_intersect = function( degree1, knot_vector1, control_points1, degree2, knot_vector2, control_points2, tol ) {



}


/**
 * Sample a NURBS curve assuming parameterization 0 to 1, corresponds to http://ariel.chronotext.org/dd/defigueiredo93adaptive.pdf
 *
 * @param {Number} integer degree
 * @param {Array} array of nondecreasing knot values 
 * @param {Array} 1d array of homogeneous control points, where each control point is an array of length (dim+1) and form (wi*pi, wi) 
 * @param {Number} integer number of samples
 * @return {Array} an dictionary of parameter - point pairs
 * @api public
 */

VERB.eval.nurbs.rational_curve_regular_sample = function( degree, knot_vector, control_points, num_samples ) {

	return VERB.eval.nurbs.rational_curve_regular_sample_range( degree, knot_vector, control_points, 0, 1.0, num_samples );

}

/**
 * Sample a NURBS curve assuming parameterization 0 to 1, corresponds to http://ariel.chronotext.org/dd/defigueiredo93adaptive.pdf
 *
 * @param {Number} integer degree
 * @param {Array} array of nondecreasing knot values 
 * @param {Array} 1d array of homogeneous control points, where each control point is an array of length (dim+1) and form (wi*pi, wi) 
 * @param {Number} start parameter for sampling
 * @param {Number} end parameter for sampling
 * @param {Number} integer number of samples
 * @return {Array} an dictionary of parameter - point pairs
 * @api public
 */

VERB.eval.nurbs.rational_curve_regular_sample_range = function( degree, knot_vector, control_points, start_u, end_u, num_samples ) {

	if (num_samples < 1){
		num_samples = 2;
	}

	var p = [],
		span = (end_u - start_u) / (num_samples - 1),
		u = 0;

	for (var i = 0; i < num_samples; i++){

		u = start_u + span * i;
		p.push( [u].concat( VERB.eval.nurbs.rational_curve_point(degree, knot_vector, control_points, u) ) );
		
	}

	return p;

}

/**
 * Sample a NURBS curve assuming parameterization 0 to 1, corresponds to http://ariel.chronotext.org/dd/defigueiredo93adaptive.pdf
 *
 * @param {Number} integer degree
 * @param {Array} array of nondecreasing knot values 
 * @param {Array} 2d array of homogeneous control points, where each control point is an array of length (dim+1) 
 									and form (wi*pi, wi) 
 * @param {Number} tolerance for the adaptive scheme
 * @return {Array} an array of dim + 1 length where the first element is the param where it was sampled and the remaining the pt
 * @api public
 */

VERB.eval.nurbs.rational_curve_adaptive_sample = function( degree, knot_vector, control_points, tol ) {

	return VERB.eval.nurbs.rational_curve_adaptive_sample_range( degree, knot_vector, control_points, 0, 1.0, tol );

}

/**
 * Sample a NURBS curve at 3 points, facilitating adaptive sampling
 *
 * @param {Number} integer degree
 * @param {Array} array of nondecreasing knot values 
 * @param {Array} 2d array of homogeneous control points, where each control point is an array of length (dim+1) 
 									and form (wi*pi, wi) 
 * @param {Number} start parameter for sampling
 * @param {Number} end parameter for sampling
 * @return {Array} an array of dim + 1 length where the first element is the param where it was sampled and the remaining the pt
 * @api public
 */

VERB.eval.nurbs.rational_curve_adaptive_sample_range = function( degree, knot_vector, control_points, start_u, end_u, tol ) {

	// sample curve at three pts
	var p1 = VERB.eval.nurbs.rational_curve_point(degree, knot_vector, control_points, start_u),
		p3 = VERB.eval.nurbs.rational_curve_point(degree, knot_vector, control_points, end_u),
		t = 0.45 + 0.1 * Math.random(),
		mid_u = start_u + (end_u - start_u) * t,
		p2 = VERB.eval.nurbs.rational_curve_point(degree, knot_vector, control_points, mid_u);

		// the if three points are "flat", return the two end pts
		if ( VERB.eval.nurbs.three_points_are_flat( p1, p2, p3, tol ) ) {

			return [ 	[start_u, p1[0], p1[1], p1[2]], 
								[ end_u, p3[0], p3[1], p3[2] ] ];

		} else {

			// recurse on the two halves
			var left_pts = VERB.eval.nurbs.rational_curve_adaptive_sample_range( degree, knot_vector, control_points, start_u, mid_u, tol )
				, right_pts = VERB.eval.nurbs.rational_curve_adaptive_sample_range( degree, knot_vector, control_points, mid_u, end_u, tol );

			// concatenate the two		
			return left_pts.slice(0, -1).concat(right_pts);

		}
}

/**
 * Determine if three points form a straight line within a given tolerance for their 2 * squared area
 *
 *          * p2
 *         / \
 *        /   \
 *       /     \ 
 *      /       \
 *  p1 * -------- * p3
 *
 * The area metric is 2 * the squared norm of the cross product of two edges, requiring no square roots and no divisions
 *
 * @param {Array} p1
 * @param {Array} p2
 * @param {Array} p3
 * @param {Number} The tolerance for whether the three points form a line
 * @return {Boolean} Whether the triangle passes the test
 * @api public
 */

VERB.eval.nurbs.three_points_are_flat = function( p1_arr, p2_arr, p3_arr, tol ) {

	// convert to vectors, this is probably unnecessary
	var p1 = new VERB.geom.Vector( p1_arr ),
		p2 = new VERB.geom.Vector( p2_arr ),
		p3 = new VERB.geom.Vector( p3_arr );

	// find the area of the triangle wihout using a square root
	var norm = p2.minus( p1 ).cross( p3.minus( p1 ) ),
			area = norm.dot( norm );

	return area < tol;

}



/**
 * Compute the derivatives at a point on a NURBS surface
 *
 * @param {Number} integer degree of surface in u direction
 * @param {Array} array of nondecreasing knot values in u direction
 * @param {Number} integer degree of surface in v direction
 * @param {Array} array of nondecreasing knot values in v direction
 * @param {Array} 3d array of control points, where rows are the u dir, and columns run along the positive v direction, 
 									and where each control point is an array of length (dim)  
 * @param {Number} u parameter at which to evaluate the derivatives
 * @param {Number} v parameter at which to evaluate the derivatives
 * @param {Array} 1d array of control point weights 
 * @return {Array} a point represented by an array of length (dim)
 * @api public
 */

VERB.eval.nurbs.curve_knot_insert = function( degree, knots, control_points, u, s, r ) {

	// np is n for the initial curve
	// nq is n for the output curve with knots inserted
	// k is the span on which the knots are inserted
	// s is the initial multiplicity of the point
	// r is the number of times to insert the knot
	// control_points is initial set of control points

	var dim = control_points[0].length
		, np = knots.length - degree - 2
		, num_pts = control_points.length
		, k = VERB.eval.nurbs.knot_span( degree, u, knots )
		, mp = np + degree + 1
		, nq = np + r
		, num_pts_post = num_pts + r    
		, Rw = new Array( degree + 1 )  
		, knots_post = new Array( knots.length + r ) 
		, control_points_post = new Array( num_pts_post ) 
		, i = 0;

	// new knot vector
	for (i = 0; i <= k; i++) {
		knots_post[i] = knots[i];
	}
	
	for (i = 1; i <= r; i++) {
		knots_post[k+i] = u; 
	}

	for (i = k+1; i <= mp; i++)
	{
		knots_post[i+r] = knots[i];
	}

	// control point generation
	for (i = 0; i <= k-degree; i++)
	{
		control_points_post[i] = control_points[i]; 
	}

	for (i = k-s; i <= np; i++)
	{
		control_points_post[i+r] = control_points[i];
	}

	for (i = 0; i <= degree-s; i++)
	{
		Rw[i] = control_points[k-degree+1];
	}

	var L = 0
		, alpha = 0;

	// insert knot r times
	for (var j = 1; j <= r; j++) {

		L = k-degree+j;

		for (i = 0; i <= degree-j-s; i++) {

			alpha = ( u - knots[L+i] ) / ( knots[i+k+1] - knots[L+i] );
			Rw[i] = numeric.add( numeric.mul( alpha, Rw[i+1] ), numeric.mul( (1.0 - alpha), Rw[i]) );

		}

		control_points_post[ L ] = Rw[0];
		control_points_post[k+r-j-s] = Rw[degree-j-s];

	}

	// not so confident about this part
	for (i = L+1; i < k-s; i++) // set remaining control points
	{
		control_points_post[i] = Rw[ i - L ];
	}

	return [knots_post, control_points_post];

}

/**
 * Compute the derivatives at a point on a NURBS surface
 *
 * @param {Number} integer degree of surface in u direction
 * @param {Array} array of nondecreasing knot values in u direction
 * @param {Number} integer degree of surface in v direction
 * @param {Array} array of nondecreasing knot values in v direction
 * @param {Array} 3d array of control points, where rows are the u dir, and columns run along the positive v direction, 
 									and where each control point is an array of length (dim)  
 * @param {Number} u parameter at which to evaluate the derivatives
 * @param {Number} v parameter at which to evaluate the derivatives
 * @param {Array} 1d array of control point weights 
 * @return {Array} a point represented by an array of length (dim)
 * @api public
 */

VERB.eval.nurbs.rational_surface_derivs = function( degree_u, knot_vector_u, degree_v, knot_vector_v, homo_control_points, num_derivs, u, v) {

	var SKL_homo = VERB.eval.nurbs.surface_derivs( degree_u, knot_vector_u, degree_v, knot_vector_v, homo_control_points, num_derivs, u, v )
		, ders = VERB.eval.nurbs.separate_homo_derivs_2d( SKL_homo )
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
				
				var v2 = VERB.eval.nurbs.zeros_1d(dim);

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

/**
 * Compute a point on a NURBS surface
 *
 * @param {Number} integer degree of surface in u direction
 * @param {Array} array of nondecreasing knot values in u direction
 * @param {Number} integer degree of surface in v direction
 * @param {Array} array of nondecreasing knot values in v direction
 * @param {Array} 3d array of control points, top to bottom is increasing u direction, left to right is increasing v direction,
 									and where each control point is an array of length (dim+1)
 * @param {Number} u parameter at which to evaluate the surface point
 * @param {Number} v parameter at which to evaluate the surface point
 * @return {Array} a point represented by an array of length (dim)
 * @api public
 */

VERB.eval.nurbs.rational_surface_point = function( degree_u, knot_vector_u,  degree_v, knot_vector_v, homo_control_points, u, v ) {

	return VERB.eval.nurbs.dehomogenize( VERB.eval.nurbs.surface_point( degree_u, knot_vector_u,  degree_v, knot_vector_v, homo_control_points, u, v ) );

}

/**
 * Determine the derivatives of a NURBS curve at a given parameter
 *
 * @param {Number} integer degree of curve
 * @param {Array} array of nondecreasing knot values
 * @param {Array} 2d array of homogeneous control points, where each control point is an array of length (dim+1) and form (wi*pi, wi)
 * @param {Number} parameter on the curve at which the point is to be evaluated
 * @return {Array} a point represented by an array of length (dim)
 * @api public
 */

VERB.eval.nurbs.rational_curve_derivs = function( degree, knot_vector, homo_control_points, u, num_derivs ) {

	// compute the derivatives of the control points
	// separate derivative array into two
	var ders = VERB.eval.nurbs.separate_homo_derivs_1d( VERB.eval.nurbs.curve_derivs( degree, knot_vector, homo_control_points, u, num_derivs ) )
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

}		

/**
 * Separate the array of derivatives into the A(u) component and w(u), i.e. the weight and everything else without dehomogenization
 *
 * @param {Array} 1d array of homogeneous derivatives
 * @return {Array} an array with Aders and wders as element 0 and 1, respectively
 * @api public
 */

VERB.eval.nurbs.separate_homo_derivs_1d = function( CK ) {

	var dim = CK[0].length
		, last = dim-1
		, Aders = []
		, wders = [];

	for ( var i = 0, l = CK.length; i < l; i++ ) {
		Aders.push( CK[i].slice(0, last) );
		wders.push( CK[i][last] );
	}

	return [Aders, wders];

}	

/**
 * Separate the array of derivatives into the A(u) component and w(u), i.e. the weight and everything else without dehomogenization
 *
 * @param {Array} 2d array of homogeneous derivatives
 * @return {Array} an array with Aders and wders as element 0 and 1, respectively
 * @api public
 */

VERB.eval.nurbs.separate_homo_derivs_2d = function( SKL ) {

	var Aders = []
		, wders = [];

	for ( var i = 0, l = SKL.length; i < l; i++ ) {
		var CK = VERB.eval.nurbs.separate_homo_derivs_1d( SKL[i] );
		Aders.push( CK[0] );
		wders.push( CK[1] );
	}

	return [Aders, wders];

}	


/**
 * Compute a point on a NURBS curve
 *
 * @param {Number} integer degree of curve
 * @param {Array} array of nondecreasing knot values
 * @param {Array} 2d array of homogeneous control points, where each control point is an array of length (dim+1) 
 									and form (wi*pi, wi)
 * @param {Number} parameter on the curve at which the point is to be evaluated
 * @return {Array} a point represented by an array of length (dim)
 * @api public
 */

VERB.eval.nurbs.rational_curve_point = function( degree, knot_vector, homo_control_points, u) {

	return VERB.eval.nurbs.dehomogenize( VERB.eval.nurbs.curve_point( degree, knot_vector, homo_control_points, u) );

}	

/**
 * Dehomogenize a point 
 *
 * @param {Array} a point represented by an array (wi*pi, wi) with length (dim+1)
 * @return {Array} a point represented by an array pi with length (dim)
 * @api public
 */

VERB.eval.nurbs.dehomogenize = function( homo_point ) {

	var dim = homo_point.length
		, point = []
		, wt = homo_point[dim-1];

	for (var i = 0; i < homo_point.length-1;i++)
		point.push( homo_point[i] / wt );

	return point;

}

/**
 * Transform a 1d array of points into their homogeneous equivalents
 *
 * @param {Array} 1d array of control points, (actually a 2d array of size (m x dim) )
 * @param {Array} array of control point weights, the same size as the array of control points (m x 1)
 * @return {Array} 1d array of control points where each point is (wi*pi, wi) where wi 
 									 is the ith control point weight and pi is the ith control point, 
 									 hence the dimension of the point is dim + 1
 * @api public
 */

VERB.eval.nurbs.homogenize_1d = function( control_points, weights) {

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

}

/**
 * Transform a 2d array of points into their homogeneous equivalents
 *
 * @param {Array} 2d array of control points, (actually a 3d array of size m x n x dim)
 * @param {Array} array of control point weights, the same size as the control points array (m x n x 1)
 * @return {Array} 1d array of control points where each point is (wi*pi, wi) where wi 
 									 is the ith control point weight and pi is the ith control point, the size is 
 									 (m x n x dim+1)
 * @api public
 */

VERB.eval.nurbs.homogenize_2d = function( control_points, weights) {

	var rows = control_points.length
		, cols = control_points[0].length
		, dim = control_points[0][0].length
		, j = 0
		, k = 0
		, homo_control_points = []
		, wt = 0
		, ref_pt = [];

	for (var i = 0; i < rows; i++) {
		homo_control_points.push( VERB.eval.nurbs.homogenize_1d(control_points[i], weights[i]) );
	}

	return homo_control_points;

}

/**
 * Compute the derivatives on a non-uniform, non-rational B spline surface
 *
 * @param {Number} integer degree of surface in u direction
 * @param {Array} array of nondecreasing knot values in u direction
 * @param {Number} integer degree of surface in v direction
 * @param {Array} array of nondecreasing knot values in v direction
 * @param {Array} 3d array of control points, where rows are the u dir, and columns run along the positive v direction, 
 									and where each control point is an array of length (dim)  
 * @param {Number} u parameter at which to evaluate the derivatives
 * @param {Number} v parameter at which to evaluate the derivatives
 * @return {Array} a point represented by an array of length (dim)
 * @api public
 */

VERB.eval.nurbs.surface_derivs = function( degree_u, knot_vector_u, degree_v, knot_vector_v, control_points, num_derivatives, u, v ) {

	var n = knot_vector_u.length - degree_u - 2
		, m = knot_vector_v.length - degree_v - 2;

	return VERB.eval.nurbs.surface_derivs_given_n_m( n, degree_u, knot_vector_u, m, degree_v, knot_vector_v, control_points, num_derivatives, u, v );

}

/**
 * Compute the derivatives on a non-uniform, non-rational B spline surface 
 * (corresponds to algorithm 3.6 from The NURBS book, Piegl & Tiller 2nd edition)
 *
 * @param {Number} integer number of basis functions in u dir - 1 = knot_vector_u.length - degree_u - 2
 * @param {Number} integer degree of surface in u direction
 * @param {Array} array of nondecreasing knot values in u direction
 * @param {Number} integer number of basis functions in v dir - 1 = knot_vector_u.length - degree_u - 2
 * @param {Number} integer degree of surface in v direction
 * @param {Array} array of nondecreasing knot values in v direction
 * @param {Array} 3d array of control points, where rows are the u dir, and columns run along the positive v direction, 
 									and where each control point is an array of length (dim)  
 * @param {Number} u parameter at which to evaluate the derivatives
 * @param {Number} v parameter at which to evaluate the derivatives
 * @return {Array} a point represented by an array of length (dim)
 * @api public
 */

VERB.eval.nurbs.surface_derivs_given_n_m = function( n, degree_u, knot_vector_u, m, degree_v, knot_vector_v, control_points, num_derivatives, u, v ) {

	if ( VERB.eval.nurbs.are_valid_relations(degree_u, control_points.length, knot_vector_u.length ) === false ||
		VERB.eval.nurbs.are_valid_relations(degree_v, control_points[0].length, knot_vector_v.length ) === false ) {
		console.error('Invalid relations between control points, knot vector, and n');
		return null;
	}

	var dim = control_points[0][0].length
		, du = Math.min(num_derivatives, degree_u)
		, dv = Math.min(num_derivatives, degree_v)
		, SKL = VERB.eval.nurbs.zeros_3d( du+1, dv+1, dim )
		, knot_span_index_u = VERB.eval.nurbs.knot_span_given_n( n, degree_u, u, knot_vector_u )
		, knot_span_index_v = VERB.eval.nurbs.knot_span_given_n( m, degree_v, v, knot_vector_v )
		, uders = VERB.eval.nurbs.deriv_basis_functions_given_n_i( knot_span_index_u, u, degree_u, n, knot_vector_u )  
		, vders = VERB.eval.nurbs.deriv_basis_functions_given_n_i( knot_span_index_v, v, degree_v, m, knot_vector_v )
		, temp = VERB.eval.nurbs.zeros_2d( degree_v+1, dim )
		, k = 0
		, s = 0
		, r = 0
		, l = 0
		, dd = 0;

	for (k = 0; k <= du; k++) {	
		for (s = 0; s <= degree_v; s++) {		
			temp[s] = VERB.eval.nurbs.zeros_1d( dim );

			for (r = 0; r <= degree_u; r++) {	
				temp[s] = numeric.add( temp[s], numeric.mul( uders[k][r], control_points[knot_span_index_u-degree_u+r][knot_span_index_v-degree_v+s]) );
			}
		}

		dd = Math.min(num_derivatives-k, dv);

		for (l = 0; l <= dd; l++) {	
			SKL[k][l] = VERB.eval.nurbs.zeros_1d( dim );

			for (s = 0; s <= degree_v; s++) {	
				SKL[k][l] = numeric.add( SKL[k][l], numeric.mul( vders[l][s], temp[s] ) );
			}
		}
	}

	return SKL;
}

/**
 * Compute a point on a non-uniform, non-rational B-spline surface
 *
 * @param {Number} integer degree of surface in u direction
 * @param {Array} array of nondecreasing knot values in u direction
 * @param {Number} integer degree of surface in v direction
 * @param {Array} array of nondecreasing knot values in v direction
 * @param {Array} 3d array of control points, where rows are the u dir, and columns run along the positive v direction, 
 									and where each control point is an array of length (dim)  
 * @param {Number} u parameter at which to evaluate the surface point
 * @param {Number} v parameter at which to evaluate the surface point
 * @return {Array} a point represented by an array of length (dim)
 * @api public
 */

VERB.eval.nurbs.surface_point = function( degree_u, knot_vector_u,  degree_v, knot_vector_v, control_points, u, v ) {

	var n = knot_vector_u.length - degree_u - 2
		, m = knot_vector_v.length - degree_v - 2;

	return 	VERB.eval.nurbs.surface_point_given_n_m( n, degree_u, knot_vector_u, m, degree_v, knot_vector_v, control_points, u, v );

}

/**
 * Compute a point on a non-uniform, non-rational B spline surface
 * (corresponds to algorithm 3.5 from The NURBS book, Piegl & Tiller 2nd edition)
 *
 * @param {Number} integer number of basis functions in u dir - 1 = knot_vector_u.length - degree_u - 2
 * @param {Number} integer degree of surface in u direction
 * @param {Array} array of nondecreasing knot values in u direction
 * @param {Number} integer degree of surface in v direction
 * @param {Array} array of nondecreasing knot values in v direction
 * @param {Array} 3d array of control points, where rows are the u dir, and columns run along the positive v direction, 
 									and where each control point is an array of length (dim)  
 * @param {Number} u parameter at which to evaluate the surface point
 * @param {Number} v parameter at which to evaluate the surface point
 * @return {Array} a point represented by an array of length (dim)
 * @api public
 */

VERB.eval.nurbs.surface_point_given_n_m = function( n, degree_u, knot_vector_u, m, degree_v, knot_vector_v, control_points, u, v ) {

	if ( VERB.eval.nurbs.are_valid_relations(degree_u, control_points.length, knot_vector_u.length ) === false ||
		VERB.eval.nurbs.are_valid_relations(degree_v, control_points[0].length, knot_vector_v.length ) === false ) {
		console.error('Invalid relations between control points, knot vector, and n');
		return null;
	}

	var dim = control_points[0][0].length
		, knot_span_index_u = VERB.eval.nurbs.knot_span_given_n( n, degree_u, u, knot_vector_u )
		, knot_span_index_v = VERB.eval.nurbs.knot_span_given_n( m, degree_v, v, knot_vector_v )
		, u_basis_vals = VERB.eval.nurbs.basis_functions_given_knot_span_index( knot_span_index_u, u, degree_u, knot_vector_u )
		, v_basis_vals = VERB.eval.nurbs.basis_functions_given_knot_span_index( knot_span_index_v, v, degree_v, knot_vector_v )
		, uind = knot_span_index_u - degree_u
		, vind = knot_span_index_v
		, position = VERB.eval.nurbs.zeros_1d( control_points[0][0].length )
		, temp = VERB.eval.nurbs.zeros_1d( control_points[0][0].length )
		, l = 0
		, k = 0;

	for (l = 0; l <= degree_v; l++) {	

		temp = VERB.eval.nurbs.zeros_1d( control_points[0][0].length );
		vind = knot_span_index_v - degree_v + l;

		for (k = 0; k <= degree_u; k++) {	
			temp = numeric.add( temp, numeric.mul( u_basis_vals[k], control_points[uind+k][vind]) );
		}
		position = numeric.add( position, numeric.mul(v_basis_vals[l], temp) );
	}

	return position;
}

/**
 * Determine the derivatives of a non-uniform, non-rational B-spline curve at a given parameter
 *
 * @param {Number} integer degree of curve
 * @param {Array} array of nondecreasing knot values
 * @param {Array} 2d array of control points, where each control point is an array of length (dim)  
 * @param {Number} parameter on the curve at which the point is to be evaluated
 * @return {Array} a point represented by an array of length (dim)
 * @api public
 */

VERB.eval.nurbs.curve_derivs = function( degree, knot_vector, control_points, u, num_derivs ) {

	var n = knot_vector.length - degree - 2;
	return VERB.eval.nurbs.curve_derivs_given_n( n, degree, knot_vector, control_points, u, num_derivs );

}		

/**
 * Determine the derivatives of a non-uniform, non-rational B-spline curve at a given parameter
 * (corresponds to algorithm 3.1 from The NURBS book, Piegl & Tiller 2nd edition)
 *
 * @param {Number} integer number of basis functions - 1 = knot_vector.length - degree - 2
 * @param {Number} integer degree of curve
 * @param {Array} array of nondecreasing knot values
 * @param {Array} 2d array of control points, where each control point is an array of length (dim)  
 * @param {Number} parameter on the curve at which the point is to be evaluated
 * @return {Array} a point represented by an array of length (dim)
 * @api public
 */

VERB.eval.nurbs.curve_derivs_given_n = function( n, degree, knot_vector, control_points, u, num_derivatives ) {

	if ( VERB.eval.nurbs.are_valid_relations(degree, control_points.length, knot_vector.length ) === false ) {
		console.error('Invalid relations between control points, knot vector, and n');
		return null;
	}

	var dim = control_points[0].length
		, du = Math.min(num_derivatives, degree)
		, CK = VERB.eval.nurbs.zeros_2d( du+1, dim )
		, knot_span_index = VERB.eval.nurbs.knot_span_given_n( n, degree, u, knot_vector )
		, nders = VERB.eval.nurbs.deriv_basis_functions_given_n_i( knot_span_index, u, degree, du, knot_vector )
		, k = 0
		, j = 0;

	for (k = 0; k <= du; k++) {	
		for (j = 0; j <= degree; j++) {
			CK[k] = numeric.add( CK[k], numeric.mul( nders[k][j], control_points[ knot_span_index - degree + j ] ) )
		}
	}
	return CK;

}		

/**
 * Confirm the relations between degree (p), number of control points(n+1), and the number of knots (m+1)
 * via The NURBS Book (section 3.2, Second Edition)
 *
 * @param {Number} integer degree
 * @param {Number} integer number of control points
 * @param {Number} integer length of the knot vector (including duplicate knots)
 * @return {Boolean} whether the values are correct
 * @api public
 */

VERB.eval.nurbs.are_valid_relations = function( degree, num_control_points, knot_vector_length ) {

	return ( num_control_points + degree + 1 - knot_vector_length ) === 0 ? true : false;

}		

/**
 * Compute a point on a non-uniform, non-rational b-spline curve
 *
 * @param {Number} integer degree of curve
 * @param {Array} array of nondecreasing knot values
 * @param {Array} 2d array of control points, where each control point is an array of length (dim)  
 * @param {Number} parameter on the curve at which the point is to be evaluated
 * @return {Array} a point represented by an array of length (dim)
 * @api public
 */

VERB.eval.nurbs.curve_point = function( degree, knot_vector, control_points, u) {

	var n = knot_vector.length - degree - 2;
	return VERB.eval.nurbs.curve_point_given_n( n, degree, knot_vector, control_points, u);

}		

/**
 * Compute a point on a non-uniform, non-rational b-spline curve
 * (corresponds to algorithm 3.1 from The NURBS book, Piegl & Tiller 2nd edition)
 *
 * @param {Number} integer number of basis functions - 1 = knot_vector.length - degree - 2
 * @param {Number} integer degree of curve
 * @param {Array} array of nondecreasing knot values
 * @param {Array} 2d array of control points, where each control point is an array of length (dim)  
 * @param {Number} parameter on the curve at which the point is to be evaluated
 * @return {Array} a point represented by an array of length (dim)
 * @api public
 */

VERB.eval.nurbs.curve_point_given_n = function( n, degree, knot_vector, control_points, u) {

	if ( VERB.eval.nurbs.are_valid_relations(degree, control_points.length, knot_vector.length ) === false ) {
		console.error('Invalid relations between control points, knot vector, and n');
		return null;
	}

	var knot_span_index = VERB.eval.nurbs.knot_span_given_n( n, degree, u, knot_vector )
		, basis_values = VERB.eval.nurbs.basis_functions_given_knot_span_index( knot_span_index, u, degree, knot_vector ) 
		, position = VERB.eval.nurbs.zeros_1d( control_points[0].length );

		for (var j = 0; j <= degree; j++ )	{
			position = numeric.add( position, numeric.mul( basis_values[j], control_points[ knot_span_index - degree + j ] ) );
		}

		return position;
}	

/**
 * Generate a 1d array of zeros
 *
 * @param {Number} integer number of rows
 * @return {Array} 1d array of given size
 * @api public
 */

VERB.eval.nurbs.zeros_1d = function(size) {
  size = size > 0 ? size : 0;

  var arr = [];

  while(size--) {
    arr.push(0);
  }

  return arr;
}

/**
 * Generate a 2D array of zeros
 *
 * @param {Number} integer number of rows
 * @param {Number} integer number of columns
 * @return {Array} 2d array of given size
 * @api public
 */

VERB.eval.nurbs.zeros_2d = function(rows, cols) {
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

/**
 * Generate a 3D array of zeros
 *
 * @param {Number} integer number of rows
 * @param {Number} integer number of columns
 * @param {Number} integer depth (i.e. dimension of arrays in 2d matrix)
 * @return {Array} 3d array of given size
 * @api public
 */

VERB.eval.nurbs.zeros_3d = function(rows, cols, dim) {
  cols = cols > 0 ? cols : 0;
  rows = rows > 0 ? rows : 0;

  var arr = [];
  var cols_temp = cols;
  var rows_temp = rows;

  while(rows--) {
    arr.push([]);

    while(cols_temp--) {
      arr[rows_temp-rows-1].push( VERB.eval.nurbs.zeros_1d(dim) );
    }
    cols_temp = cols;
  }

  return arr;
}

/**
 * Compute the non-vanishing basis functions and their derivatives
 *
 * @param {Number} float parameter
 * @param {Number} integer degree
 * @param {Array} array of nondecreasing knot values
 * @return {Array} 2d array of basis and derivative values of size (n+1, p+1) The nth row is the nth derivative and the first row is made up of the basis function values.
 * @api public
 */

VERB.eval.nurbs.deriv_basis_functions = function( u, degree, knot_vector )
{
	var knot_span_index = VERB.eval.nurbs.knot_span( degree, u, knot_vector )
		, m = knot_vector.length - 1
		, n = m - degree - 1;

	return VERB.eval.nurbs.deriv_basis_functions_given_n_i( knot_span_index, u, degree, n, knot_vector );
}	

/**
 * Compute the non-vanishing basis functions and their derivatives
 * (corresponds to algorithm 2.3 from The NURBS book, Piegl & Tiller 2nd edition)
 *
 * @param {Number} integer knot span index
 * @param {Number} float parameter
 * @param {Number} integer degree
 * @param {Number} integer number of basis functions - 1 = knot_vector.length - degree - 2
 * @param {Array} array of nondecreasing knot values
 * @return {Array} 2d array of basis and derivative values of size (n+1, p+1) The nth row is the nth derivative and the first row is made up of the basis function values.
 * @api public
 */

VERB.eval.nurbs.deriv_basis_functions_given_n_i = function( knot_span_index, u, p, n, knot_vector )
{
	var ndu = VERB.eval.nurbs.zeros_2d(p+1, p+1)
		, left = new Array( p + 1 )
		, right = new Array( p + 1 )
		, saved = 0
		, temp = 0
		, j = 1
		, r = 0;

	ndu[0][0] = 1.0;

	for(j = 1; j <= p; j++) {

		left[j] = u - knot_vector[knot_span_index+1-j];
		right[j] = knot_vector[knot_span_index+j] - u;
		saved = 0.0;

		for (r = 0; r < j; r++) {

			ndu[j][r] = right[r+1] + left[j-r];
			temp = ndu[r][j-1] / ndu[j][r];

			ndu[r][j] = saved + right[r+1]*temp;
			saved = left[j-r]*temp;

		}
		ndu[j][j] = saved;
	}


	var ders = VERB.eval.nurbs.zeros_2d(n+1, p+1)
		, a = VERB.eval.nurbs.zeros_2d(2, p+1)
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

/**
 * Compute the non-vanishing basis functions
 *
 * @param {Number} float parameter
 * @param {Number} integer degree of function
 * @param {Array} array of nondecreasing knot values
 * @return {Array} list of non-vanishing basis functions
 * @api public
 */

VERB.eval.nurbs.basis_functions = function( u, degree, knot_vector )
{
	var knot_span_index = VERB.eval.nurbs.knot_span(u, degree, knot_vector);
	return VERB.eval.nurbs.basis_functions_given_knot_span_index( knot_span_index, u, degree, knot_vector );
};

/**
 * Compute the non-vanishing basis functions
 * (corresponds to algorithm 2.2 from The NURBS book, Piegl & Tiller 2nd edition)
 *
 * @param {Number} integer knot span index
 * @param {Number} float parameter
 * @param {Number} integer degree of function
 * @param {Array} array of nondecreasing knot values
 * @return {Array} list of non-vanishing basis functions
 * @api public
 */

VERB.eval.nurbs.basis_functions_given_knot_span_index = function( knot_span_index, u, degree, knot_vector )
{
	var basis_functions = new Array( degree + 1 )
		, left = new Array( degree + 1 )
		, right = new Array( degree + 1 )
		, saved = 0
		, temp = 0;

	basis_functions[0] = 1.0;

	for(var j = 1; j <= degree; j++) {

		left[j] = u - knot_vector[knot_span_index+1-j];
		right[j] = knot_vector[knot_span_index+j] - u;
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


/**
 * Find the span on the knot vector without supplying n
 *
 * @param {Number} integer degree of function
 * @param {Number} float parameter
 * @param {Array} array of nondecreasing knot values
 * @return {Number} the index of the knot span
 * @api public
 */

VERB.eval.nurbs.knot_span = function( degree, u, knot_vector )
{

	var m = knot_vector.length - 1
		, n = m - degree - 1;

	return VERB.eval.nurbs.knot_span_given_n(n, degree, u, knot_vector);

};

/**
 * Find the span on the knot vector knot_vector of the given parameter
 * (corresponds to algorithm 2.1 from The NURBS book, Piegl & Tiller 2nd edition)
 *
 * @param {Number} integer number of basis functions - 1 = knot_vector.length - degree - 2
 * @param {Number} integer degree of function
 * @param {Number} float parameter
 * @param {Array} array of nondecreasing knot values
 * @return {Number} the index of the knot span
 * @api public
 */

VERB.eval.nurbs.knot_span_given_n = function( n, degree, u, knot_vector )
{
	if ( u >= knot_vector[n+1] )
	{
		return n;
	}

	if ( u < knot_vector[degree] )
	{
		return degree;
	}

	var low = degree
		, high = n+1
		, mid = Math.floor( (low + high) / 2 );

	while( u < knot_vector[ mid ] || u >= knot_vector[ mid + 1 ] )
	{
		if ( u < knot_vector[ mid ] )
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
