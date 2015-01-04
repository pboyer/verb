package verb.core;

import verb.core.types.SurfaceData;
import verb.core.types.CurveData;

import verb.core.Binomial;

@:expose("core.Eval")
class Eval {

	// Compute the derivatives at a point on a NURBS surface
	//
	// **params**
	// + SurfaceData object representing the surface
	// + number of derivatives to evaluate
	// + u parameter at which to evaluate the derivatives
	// + v parameter at which to evaluate the derivatives
	//
	// **returns**
	// + a point represented by an array of length (dim)
	//

	public static function rational_surface_derivs( surface : SurfaceData,
													num_derivs : Int,
													u : Float,
													v : Float) : Array<Array<Array<Float>>>{

		var ders = surface_derivs( surface, num_derivs, u, v )
		, Aders = rational_2d(ders)
		, wders = weight_2d(ders)
		, SKL = new Array<Array<Array<Float>>>()
		, dim = Aders[0][0].length;

		for (k in 0...num_derivs+1){
			SKL.push( new Array<Array<Float>>() );

			for (l in 0...num_derivs-k+1){
				var v = Aders[k][l];

				for (j in 1...l+1){
					v = Vec.sub( v, Vec.mul( Binomial.get(l, j) * wders[0][j], SKL[k][l-j] ) );
				}

				for (i in 1...k+1){
					v = Vec.sub( v, Vec.mul( Binomial.get(k, i) * wders[i][0], SKL[k-i][l] ) );

					var v2 = Vec.zeros1d(dim);

					for (j in 1...l+1){
						v2 = Vec.add( v2, Vec.mul( Binomial.get(l, j) * wders[i][j], SKL[k-i][l-j] ) );
					}

					v = Vec.sub( v, Vec.mul( Binomial.get(k, i), v2) );

				}

				SKL[k].push( Vec.mul(1 / wders[0][0], v )); // demogenize
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
	// + integer degree of surface in u direction
	// + array of nondecreasing knot values in u direction
	// + integer degree of surface in v direction
	// + array of nondecreasing knot values in v direction
	// + 3d array of control points (tensor), top to bottom is increasing u direction, left to right is increasing v direction,
	// and where each control point is an array of length (dim+1)
	// + u parameter at which to evaluate the surface point
	// + v parameter at which to evaluate the surface point
	//
	// **returns**
	// + a point represented by an array of length (dim)
	//

	public static function rational_surface_point( surface : SurfaceData, u : Float, v : Float ) : Point {
		return dehomogenize( surface_point( surface, u, v ) );
	}

	// Determine the derivatives of a NURBS curve at a given parameter
	//
	// **params**
	// + CurveData object representing the curve - the control points are in homogeneous coordinates
	// + parameter on the curve at which the point is to be evaluated
	// + number of derivatives to evaluate
	//
	// **returns**
	// + a point represented by an array of length (dim)
	//

	public static function rational_curve_derivs( curve : CurveData, u : Float, num_derivs : Int ) : Array<Point> {

		var ders = curve_derivs( curve, u, num_derivs )
		, Aders = rational_1d(ders)
		, wders = weight_1d(ders)
		, k = 0
		, i  = 0
		, CK = [];

		for (k in 0...num_derivs+1) {
			var v = Aders[k];

			for (i in 1...k+1) {
				v = Vec.sub( v, Vec.mul( Binomial.get(k, i) * wders[i], CK[k-i] ) );
			}
			CK.push( Vec.mul(1/wders[0], v )); // demogenize
		}

		return CK;

	}

	// Compute a point on a NURBS curve
	//
	// **params**
	// + integer degree of curve
	// + array of nondecreasing knot values
	// + 2d array of homogeneous control points, where each control point is an array of length (dim+1)
	// and form (wi*pi, wi)
	// + parameter on the curve at which the point is to be evaluated
	//
	// **returns**
	// + a point represented by an array of length (dim)
	//

	public static function rational_curve_point( curve : CurveData, u : Float) : Point {
		return dehomogenize( curve_point( curve, u) );
	}

	// Dehomogenize a point
	//
	// **params**
	// + a point represented by an array (wi*pi, wi) with length (dim+1)
	//
	// **returns**
	// + a point represented by an array pi with length (dim)
	//

	
	public static function dehomogenize( homo_point : Point ) : Point {

		var dim = homo_point.length
		, point = []
		, wt = homo_point[dim-1]
		, l = homo_point.length - 1;

		for (i in 0...l){
			point.push( homo_point[i] / wt );
		}

		return point;
	}

	// Obtain the point from a point in homogeneous space without dehomogenization, assuming all are the same
	// length
	//
	// **params**
	// + array of points represented by an array (wi*pi, wi) with length (dim+1)
	//
	// **returns**
	// + array of points represented by an array (wi*pi) with length (dim)
	//

	
	public static function rational_1d( homo_points : Array<Point> ) : Array<Point> {
		var dim = homo_points[0].length - 1;
		return homo_points.map(function(x : Point){ return x.slice(0,dim); });
	}

	// Obtain the weight from a collection of points in homogeneous space, assuming all
	// are the same dimension
	//
	// **params**
	// + array of arrays of of points represented by an array (wi*pi, wi) with length (dim+1)
	//
	// **returns**
	// +  array of arrays of points, each represented by an array pi with length (dim)
	//

	
	public static function rational_2d( homo_points : Array<Array<Point>> ) : Array<Array<Point>> {
		return homo_points.map(rational_1d);
	}

	// Obtain the weight from a collection of points in homogeneous space, assuming all
	// are the same dimension
	//
	// **params**
	// + array of points represented by an array (wi*pi, wi) with length (dim+1)
	//
	// **returns**
	// + a point represented by an array pi with length (dim)
	//

	
	public static function weight_1d( homo_points : Array<Point> ) : Array<Float> {
		var dim = homo_points[0].length - 1;
		return homo_points.map(function(x){ return x[dim]; });
	}

	// Obtain the weight from a collection of points in homogeneous space, assuming all
	// are the same dimension
	//
	// **params**
	// + array of arrays of of points represented by an array (wi*pi, wi) with length (dim+1)
	//
	// **returns**
	// +  array of arrays of points, each represented by an array pi with length (dim)
	//

	
	public static function weight_2d( homo_points : Array<Array<Point>> ) : Array<Array<Float>> {
		return homo_points.map(weight_1d);
	}


	// Dehomogenize an array of points
	//
	// **params**
	// + array of points represented by an array (wi*pi, wi) with length (dim+1)
	//
	// **returns**
	// + an array of points, each of length dim
	//

	
	public static function dehomogenize_1d( homo_points : Array<Point> ) : Array<Point>{
		return homo_points.map(dehomogenize);
	}

	// Dehomogenize a 2d array of pts
	//
	// **params**
	// + array of arrays of points represented by an array (wi*pi, wi) with length (dim+1)
	//
	// **returns**
	// + array of arrays of points, each of length dim
	//

	
	public static function dehomogenize_2d( homo_points : Array<Array<Point>> ) : Array<Array<Point>> {
		return homo_points.map(dehomogenize_1d);
	}

	// Transform a 1d array of points into their homogeneous equivalents
	//
	// **params**
	// + 1d array of control points, (actually a 2d array of size (m x dim) )
	// + array of control point weights, the same size as the array of control points (m x 1)
	//
	// **returns**
	// + 1d array of control points where each point is (wi*pi, wi) where wi
	// i the ith control point weight and pi is the ith control point,
	// hence the dimension of the point is dim + 1
	//

	
	public static function homogenize_1d( control_points : Array<Point>, weights : Array<Float>) : Array<Point> {

		var rows = control_points.length
		, dim = control_points[0].length
		, homo_control_points = new Array<Point>()
		, wt : Float = 0.0
		, ref_pt = new Point();

		for (i in 0...rows) {

			var pt = [];
			ref_pt = control_points[i];
			wt = weights[i];

			for (k in 0...dim) {
				pt.push( ref_pt[k] * wt );
			}

			// append the weight
			pt.push(wt);

			homo_control_points.push(pt);
		}

		return homo_control_points;

	}

	// **params**
	// + 2d array of control points, (actually a 3d array of size m x n x dim)
	// + array of control point weights, the same size as the control points array (m x n x 1)
	//
	// **returns**
	// + 1d array of control points where each point is (wi*pi, wi) where wi
	// i the ith control point weight and pi is the ith control point, the size is
	// (m x n x dim+1)
	//

	
	public static function homogenize_2d( control_points : Array<Array<Point>>,
										  weights: Array<Array<Float>>) : Array<Array<Point>> {
		var rows = control_points.length
		, homo_control_points = new Array<Array<Point>>();

		for (i in 0...rows) {
			homo_control_points.push( homogenize_1d(control_points[i], weights[i]) );
		}

		return homo_control_points;
	}


	// Compute the derivatives on a non-uniform, non-rational B spline surface
	//
	// **params**
	// + SurfaceData object representing the surface
	// + number of derivatives to evaluate
	// + u parameter at which to evaluate the derivatives
	// + v parameter at which to evaluate the derivatives
	//
	// **returns**
	// + a 2d jagged array representing the derivatives - u derivatives increase by row, v by column
	//

	
	public static function surface_derivs( surface : SurfaceData, num_derivatives : Int, u : Float, v : Float ) : Array<Array<Point>> {

		var n = surface.knotsU.length - surface.degreeU - 2
		, m = surface.knotsV.length - surface.degreeV - 2;

		return surface_derivs_given_n_m( n, m, surface, num_derivatives, u, v );

	}

	// Compute the derivatives on a non-uniform, non-rational B spline surface
	// (corresponds to algorithm 3.6 from The NURBS book, Piegl & Tiller 2nd edition)
	//
	// **params**
	// + integer number of basis functions in u dir - 1 = knots_u.length - degree_u - 2
	// + integer number of basis functions in v dir - 1 = knots_u.length - degree_u - 2
	// + SurfaceData object representing the surface
	// + u parameter at which to evaluate the derivatives
	// + v parameter at which to evaluate the derivatives
	//
	// **returns**
	// + a 2d jagged array representing the derivatives - u derivatives increase by row, v by column
	//

	
	public static function surface_derivs_given_n_m( n : Int,
													 m : Int,
													 surface : SurfaceData,
													 num_derivatives : Int,
													 u : Float,
													 v: Float) : Array<Array<Point>>{

		var degree_u = surface.degreeU
		, degree_v = surface.degreeV
		, control_points = surface.controlPoints
		, knots_u = surface.knotsU
		, knots_v = surface.knotsV;

		if ( !are_valid_relations(degree_u, control_points.length, knots_u.length ) ||
			!are_valid_relations(degree_v, control_points[0].length, knots_v.length ) ) {

			throw 'Invalid relations between control points, knot vector, and n';
		}

		var dim = control_points[0][0].length
		, du = num_derivatives < degree_u ? num_derivatives : degree_u
		, dv = num_derivatives < degree_v ? num_derivatives : degree_v
		, SKL = Vec.zeros3d( du+1, dv+1, dim )
		, knot_span_index_u = knot_span_given_n( n, degree_u, u, knots_u )
		, knot_span_index_v = knot_span_given_n( m, degree_v, v, knots_v )
		, uders = deriv_basis_functions_given_n_i( knot_span_index_u, u, degree_u, n, knots_u )
		, vders = deriv_basis_functions_given_n_i( knot_span_index_v, v, degree_v, m, knots_v )
		, temp = Vec.zeros2d( degree_v+1, dim )
		, dd = 0;

		for (k in 0...du+1){
			for (s in 0...degree_v+1) {
				temp[s] = Vec.zeros1d( dim );

				for (r in 0...degree_u+1){
					temp[s] = Vec.add( temp[s],
						Vec.mul( uders[k][r], control_points[knot_span_index_u-degree_u+r][knot_span_index_v-degree_v+s]) );
				}
			}

			var nk = num_derivatives - k;
			dd = nk < dv ? nk : dv;

			for (l in 0...dd+1){
				SKL[k][l] = Vec.zeros1d( dim );

				for (s in 0...degree_v+1){
					SKL[k][l] = Vec.add( SKL[k][l], Vec.mul( vders[l][s], temp[s] ) );
				}
			}
		}

		return SKL;
	}
	
	// Compute a point on a non-uniform, non-rational B-spline surface
	//
	// **params**
	// + SurfaceData object representing the surface
	// + u parameter at which to evaluate the surface point
	// + v parameter at which to evaluate the surface point
	//
	// **returns**
	// + a point represented by an array of length (dim)
	//

	
	public static function surface_point( surface : SurfaceData, u : Float, v : Float) : Point {

		var n = surface.knotsU.length - surface.degreeU - 2
		, m = surface.knotsV.length - surface.degreeV - 2;

		return surface_point_given_n_m( n, m, surface, u, v );

	}

	// Compute a point on a non-uniform, non-rational B spline surface
	// (corresponds to algorithm 3.5 from The NURBS book, Piegl & Tiller 2nd edition)
	//
	// **params**
	// + integer number of basis functions in u dir - 1 = knots_u.length - degree_u - 2
	// + integer number of basis functions in v dir - 1 = knots_v.length - degree_v - 2
	// + SurfaceData object representing the surface
	// + u parameter at which to evaluate the surface point
	// + v parameter at which to evaluate the surface point
	//
	// **returns**
	// + a point represented by an array of length (dim)
	//

	
	public static function surface_point_given_n_m( n : Int, m : Int, surface : SurfaceData, u : Float, v : Float ) : Point {

		var degree_u = surface.degreeU
		, degree_v = surface.degreeV
		, control_points = surface.controlPoints
		, knots_u = surface.knotsU
		, knots_v = surface.knotsV;

		if ( !are_valid_relations(degree_u, control_points.length, knots_u.length ) ||
			!are_valid_relations(degree_v, control_points[0].length, knots_v.length ) ) {

			throw 'Invalid relations between control points, knot vector, and n';
		}

		var dim = control_points[0][0].length
		, knot_span_index_u = knot_span_given_n( n, degree_u, u, knots_u )
		, knot_span_index_v = knot_span_given_n( m, degree_v, v, knots_v )
		, u_basis_vals = basis_functions_given_knot_span_index( knot_span_index_u, u, degree_u, knots_u )
		, v_basis_vals = basis_functions_given_knot_span_index( knot_span_index_v, v, degree_v, knots_v )
		, uind = knot_span_index_u - degree_u
		, vind = knot_span_index_v
		, position = Vec.zeros1d( dim )
		, temp = Vec.zeros1d( dim );

		for (l in 0...degree_v + 1){

			temp = Vec.zeros1d( dim );
			vind = knot_span_index_v - degree_v + l;

			// sample u isoline
			for (k in 0...degree_u + 1) {
				temp = Vec.add( temp, Vec.mul( u_basis_vals[k], control_points[uind+k][vind]) );
			}

			// add point from u isoline
			position = Vec.add( position, Vec.mul(v_basis_vals[l], temp) );
		}

		return position;
	}


	// Determine the derivatives of a non-uniform, non-rational B-spline curve at a given parameter
	//
	// **params**
	// + CurveData object representing the curve
	// + parameter on the curve at which the point is to be evaluated
	// + number of derivatives to evaluate
	//
	// **returns**
	// + a point represented by an array of length (dim)
	//

	
	public static function curve_derivs( crv : CurveData, u : Float, num_derivs : Int ) : Array<Point> {

		var n = crv.knots.length - crv.degree - 2;
		return curve_derivs_given_n( n, crv, u, num_derivs );

	}

	// Determine the derivatives of a non-uniform, non-rational B-spline curve at a given parameter
	// (corresponds to algorithm 3.1 from The NURBS book, Piegl & Tiller 2nd edition)
	//
	// **params**
	// + integer number of basis functions - 1 = knots.length - degree - 2
	// + CurveData object representing the curve
	// + parameter on the curve at which the point is to be evaluated
	//
	// **returns**
	// + a point represented by an array of length (dim)
	//

	
	public static function curve_derivs_given_n( n : Int, curve : CurveData, u : Float, num_derivatives : Int ) : Array<Point> {

		var degree = curve.degree
		, control_points = curve.controlPoints
		, knots = curve.knots;

		if ( !are_valid_relations( degree, control_points.length, knots.length ) ) {
			throw 'Invalid relations between control points, knot vector, and n';
		}

		var dim = control_points[0].length
		, du = num_derivatives < degree ? num_derivatives : degree
		, CK = Vec.zeros2d( du+1, dim )
		, knot_span_index = knot_span_given_n( n, degree, u, knots )
		, nders = deriv_basis_functions_given_n_i( knot_span_index, u, degree, du, knots )
		, k = 0
		, j = 0;

		for (k in 0...du+1) {
			for (j in 0...degree+1){
				CK[k] = Vec.add( CK[k], Vec.mul( nders[k][j], control_points[ knot_span_index - degree + j ] ) );
			}
		}
		return CK;
	}

	// Compute a point on a non-uniform, non-rational b-spline curve
	//
	// **params**
	// + CurveData object representing the curve
	// + parameter on the curve at which the point is to be evaluated
	//
	// **returns**
	// + a point represented by an array of length (dim)
	//

	
	public static function curve_point( curve : CurveData, u : Float) {
		var n = curve.knots.length - curve.degree - 2;
		return curve_point_given_n( n, curve, u);
	}

	// Confirm the relations between degree (p), number of control points(n+1), and the number of knots (m+1)
	// via The NURBS Book (section 3.2, Second Edition)
	//
	// **params**
	// + integer degree
	// + integer number of control points
	// + integer length of the knot Array (including duplicate knots)
	//
	// **returns**
	// + whether the values are correct
	//

	
	public static function are_valid_relations( degree : Int, num_control_points : Int, knots_length : Int ) : Bool {
		return num_control_points + degree + 1 - knots_length == 0;
	}

	// Compute a point on a non-uniform, non-rational b-spline curve
	// (corresponds to algorithm 3.1 from The NURBS book, Piegl & Tiller 2nd edition)
	//
	// **params**
	// + integer number of basis functions - 1 = knots.length - degree - 2
	// + CurveData object representing the curve
	// + parameter on the curve at which the point is to be evaluated
	//
	// **returns**
	// + a point represented by an array of length (dim)
	//

	
	public static function curve_point_given_n( n : Int, curve : CurveData, u : Float) : Point {

		var degree = curve.degree
			, control_points = curve.controlPoints
			, knots = curve.knots;

		if ( !are_valid_relations( degree, control_points.length, knots.length ) ) {
			throw 'Invalid relations between control points, knot Array, and n';
			return null;
		}

		var knot_span_index = knot_span_given_n( n, degree, u, knots );
		var basis_values = basis_functions_given_knot_span_index( knot_span_index, u, degree, knots );
		var position = Vec.zeros1d( control_points[0].length );

		for (j in 0...degree+1){
			position = Vec.add( position,
								Vec.mul( basis_values[j],
										control_points[ knot_span_index - degree + j ] ) );
		}

		return position;
	}

	// Compute the non-vanishing basis functions and their derivatives
	//
	// **params**
	// + float parameter
	// + integer degree
	// + array of nondecreasing knot values
	//
	// **returns**
	// + 2d array of basis and derivative values of size (n+1, p+1) The nth row is the nth derivative and the first row is made up of the basis function values.
	//

	
	public static function deriv_basis_functions( u : Float, degree : Int, knots : KnotArray ): Array<Array<Float>>
	{
		var knot_span_index = knot_span( degree, u, knots )
		, m = knots.length - 1
		, n = m - degree - 1;

		return deriv_basis_functions_given_n_i( knot_span_index, u, degree, n, knots );
	}

	// Compute the non-vanishing basis functions and their derivatives
	// (corresponds to algorithm 2.3 from The NURBS book, Piegl & Tiller 2nd edition)
	//
	// **params**
	// + integer knot span index
	// + float parameter
	// + integer degree
	// + integer number of basis functions - 1 = knots.length - degree - 2
	// + array of nondecreasing knot values
	//
	// **returns**
	// + 2d array of basis and derivative values of size (n+1, p+1) The nth row is the nth derivative and the first row is made up of the basis function values.
	//

	
	public static function deriv_basis_functions_given_n_i( knot_span_index : Int, u : Float, p : Int,
															n : Int, knots : KnotArray ) : Array<Array<Float>>
	{
		var ndu = Vec.zeros2d( p+1, p+1 )
		, left = Vec.zeros1d( p + 1 )
		, right = Vec.zeros1d( p + 1 )
		, saved = 0.0
		, temp = 0.0;

		ndu[0][0] = 1.0;

		for(j in 1...p+1){
			left[j] = u - knots[knot_span_index+1-j];
			right[j] = knots[knot_span_index+j] - u;
			saved = 0.0;

			for (r in 0...j){
				ndu[j][r] = right[r+1] + left[j-r];
				temp = ndu[r][j-1] / ndu[j][r];

				ndu[r][j] = saved + right[r+1]*temp;
				saved = left[j-r]*temp;

			}
			ndu[j][j] = saved;
		}

		var ders = Vec.zeros2d(n+1, p+1)
			, a = Vec.zeros2d(2, p+1)
			, s1 : Int = 0
			, s2 : Int = 1
			, d : Float = 0.0
			, rk : Int = 0
			, pk : Int = 0
			, j1 : Int = 0
			, j2 : Int = 0;

		for (j in 0...p+1){
			ders[0][j] = ndu[j][p];
		}

		for (r in 0...p+1){
			s1 = 0;
			s2 = 1;
			a[0][0] = 1.0;

			for (k in 1...n+1)
			{
				d = 0.0;
				rk = r - k;
				pk = p - k;

				if (r >= k) {
					a[s2][0] = a[s1][0] / ndu[pk+1][rk];
					d = a[s2][0] * ndu[rk][pk];
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

				for (j in j1...j2+1) {
					a[s2][j] = ( a[s1][j] - a[s1][ j - 1 ] ) / ndu[ pk + 1 ][ rk + j ];
					d += a[s2][j]*ndu[rk+j][pk];
				}

				if (r <= pk){
					a[s2][k] = -a[s1][k-1]/ndu[pk+1][r];
					d += a[s2][k] * ndu[r][pk];
				}

				ders[k][r] = d;

				var temp = s1;
				s1 = s2;
				s2 = temp;
			}
		}

		var acc = p;
		for (k in 1...n+1) {
			for (j in 0...p+1){
				ders[k][j] *= acc;
			}
			acc *= (p-k);
		}

		return ders;
	}


	// Compute the non-vanishing basis functions
	//
	// **params**
	// + float parameter
	// + integer degree of function
	// + array of nondecreasing knot values
	//
	// **returns**
	// + list of non-vanishing basis functions
	//
	
	public static function basis_functions( u : Float, degree : Int, knots : KnotArray)
	{
		var knot_span_index = knot_span(degree, u, knots);
		return basis_functions_given_knot_span_index( knot_span_index, u, degree, knots );
	}

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
	
	public static function basis_functions_given_knot_span_index( knot_span_index : Int,
																  u : Float,
																  degree : Int,
																  knots : KnotArray )
	{
		var basis_functions = Vec.zeros1d( degree + 1 );
		var left = Vec.zeros1d( degree + 1 );
		var right = Vec.zeros1d( degree + 1 );
		var saved : Float = 0;
		var temp : Float = 0;

		basis_functions[0] = 1.0;

		for( j in 1...degree+1 ){
			left[j] = u - knots[knot_span_index+1-j];
			right[j] = knots[knot_span_index+j] - u;
			saved = 0.0;

			for (r in 0...j){
				temp = basis_functions[r] / ( right[r+1] + left[j-r] );
				basis_functions[r] = saved + right[r+1]*temp;
				saved = left[j-r]*temp;
			}

			basis_functions[j] = saved;
		}

		return basis_functions;
	}


	// Find the span on the knot Array without supplying n
	//
	// **params**
	// + integer degree of function
	// + float parameter
	// + array of nondecreasing knot values
	// 
	// **returns** 
	// + the index of the knot span
	//
	
	public static function knot_span( degree : Int, u : Float, knots : Array<Float> ) : Int
	{
		var m = knots.length - 1
			, n = m - degree - 1;

		return knot_span_given_n(n, degree, u, knots);
	}

	// Find the span on the knot Array knots of the given parameter
	// (corresponds to algorithm 2.1 from The NURBS book, Piegl & Tiller 2nd edition)
	//
	// **params**
	// + integer number of basis functions - 1 = knots.length - degree - 2
	// + integer degree of function
	// + parameter
	// + array of nondecreasing knot values
	// 
	// **returns** 
	// + the index of the knot span
	//
	
	public static function knot_span_given_n( n : Int, degree : Int, u : Float, knots : Array<Float> ) : Int
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
	}
}