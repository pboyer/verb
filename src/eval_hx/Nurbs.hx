import haxe.ds.Vector;
typedef Point = Array<Float>;
typedef KnotVector = Array<Float>;

@:expose("CurveData")
class CurveData {
	var degree : Int;
	var controlPoints : Array<Point>;
	var knots : Array<Float>;

	public function new(degree, controlPoints, knots){
		this.degree = degree;
		this.controlPoints = controlPoints;
		this.knots = knots;
	}
}

@:expose("SurfaceData")
class SurfaceData {
	var degreeU : Int;
	var degreeV : Int;
	var knotsU : Array<Float>;
	var knotsV : Array<Float>;
	var controlPoints : Array<Array<Point>>;

	public function new(degreeU, degreeV, knotsU, knotsV, controlPoints){
		this.degreeU = degreeU;
		this.degreeV = degreeV;
		this.knotsU = knotsU;
		this.knotsV = knotsV;
		this.controlPoints = controlPoints;
	}
}

@:expose("Nurbs")
class Nurbs {

	//
	// ####curve_point_given_n( n, degree, knots, control_points, u)
	//
	// Compute a point on a non-uniform, non-rational b-spline curve
	// (corresponds to algorithm 3.1 from The NURBS book, Piegl & Tiller 2nd edition)
	//
	// **params**
	// + integer number of basis functions - 1 = knots.length - degree - 2
	// + integer degree of curve
	// + array of nondecreasing knot values
	// + 2d array of control points, where each control point is an array of length (dim)
	// + parameter on the curve at which the point is to be evaluated
	//
	// **returns**
	// + a point represented by an array of length (dim)
	//

//	public static function curve_point_given_n( n : Int, curve : CurveData, u : Float) : Point {
//
//		var degree = curve.degree
//			, control_points = curve.controlPoints
//			, knots = curve.knots;
//
//		if ( !are_valid_relations( degree, controlPoints.length, knots.length ) ) {
//			console.error('Invalid relations between control points, knot vector, and n');
//			return null;
//		}
//
//		var knot_span_index = knot_span_given_n( n, degree, u, knots )
//		, basis_values = basis_functions_given_knot_span_index( knot_span_index, u, degree, knots )
//		, position = Utils.zeros_1d( control_points[0].length );
//
//		for (j in 0...degree+1)
////		for (var j = 0; j <= degree; j++ )	{
//			position = numeric.add( position, numeric.mul( basis_values[j], control_points[ knot_span_index - degree + j ] ) );
//		}
//
//		return position;
//	}

	//
	// ####deriv_basis_functions( u, degree, knots )
	//
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

	@:expose("deriv_basis_functions")
	public static function deriv_basis_functions( u : Float, degree : Int, knots : KnotVector ): Vector<Vector<Float>>
	{
		var knot_span_index = knot_span( degree, u, knots )
		, m = knots.length - 1
		, n = m - degree - 1;

		return deriv_basis_functions_given_n_i( knot_span_index, u, degree, n, knots );
	}

	//
	// ####deriv_basis_functions_given_n_i( knot_span_index, u, p, n, knots )
	//
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

	@:expose("deriv_basis_functions_given_n_i")
	public static function deriv_basis_functions_given_n_i( knot_span_index : Int, u : Float, p : Int,
															n : Int, knots : KnotVector ) : Vector<Vector<Float>>
	{
		var ndu = Utils.zeros_2d(p+1, p+1)
		, left = new Vector<Float>( p + 1 )
		, right = new Vector<Float>( p + 1 )
		, saved = 0.0
		, temp = 0.0;

		ndu[0][0] = 1.0;

		for(j in 1...p+1){
//		for(j = 1; j <= p; j++) {

			left[j] = u - knots[knot_span_index+1-j];
			right[j] = knots[knot_span_index+j] - u;
			saved = 0.0;

			for (r in 0...j){
//			for (r = 0; r < j; r++) {

				ndu[j][r] = right[r+1] + left[j-r];
				temp = ndu[r][j-1] / ndu[j][r];

				ndu[r][j] = saved + right[r+1]*temp;
				saved = left[j-r]*temp;

			}
			ndu[j][j] = saved;
		}

		var ders = Utils.zeros_2d(n+1, p+1)
			, a = Utils.zeros_2d(2, p+1)
			, s1 : Int = 0
			, s2 : Int = 1
			, d : Float = 0.0
			, rk : Int = 0
			, pk : Int = 0
			, j1 : Int = 0
			, j2 : Int = 0;

		for (j in 0...p+1){
//		for(j = 0; j <= p; j++) {
			ders[0][j] = ndu[j][p];
		}

		for (r in 0...p+1){
//		for (r = 0; r<=p; r++) {
			s1 = 0;
			s2 = 1;
			a[0][0] = 1.0;

			for (k in 1...n+1)
//			for (k=1; k<=n ;k++)
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
//				for (j = j1; j <= j2; j++) {
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
//		for (k = 1; k <= n; k++) {
			for (j in 0...p+1){
//			for (j = 0; j <= p; j++) {
				ders[k][j] *= acc;
			}
			acc *= (p-k);
		}

		return ders;
	}

	//
	// ####basis_functions( u, degree, knots )
	//
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
	@:expose("basis_functions")
	public static function basis_functions( degree : Int, u : Float, knots : KnotVector)
	{
		var knot_span_index = knot_span(degree, u, knots);
		return basis_functions_given_knot_span_index( knot_span_index, u, degree, knots );
	}

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
	@:expose("knot_span")
	public static function basis_functions_given_knot_span_index( knot_span_index : Int,
																  u : Float,
																  degree : Int,
																  knots : KnotVector )
	{
		var basis_functions = new Vector<Float>( degree + 1 );
		var left = new Vector<Float>( degree + 1 );
		var right = new Vector<Float>( degree + 1 );
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


	//
	// ####knot_span( degree, u, knots )
	//
	// Find the span on the knot vector without supplying n
	//
	// **params**
	// + integer degree of function
	// + float parameter
	// + array of nondecreasing knot values
	// 
	// **returns** 
	// + the index of the knot span
	//
	@:expose("knot_span")
	public static function knot_span( degree : Int, u : Float, knots : Array<Float> ) : Int
	{
		var m = knots.length - 1
			, n = m - degree - 1;

		return knot_span_given_n(n, degree, u, knots);
	}

	//
	// ####knot_span_given_n( n, degree, u, knots )
	//
	// Find the span on the knot vector knots of the given parameter
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
	@:expose("knot_span_given_n")
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