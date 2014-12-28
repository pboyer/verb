package verb.eval;

using verb.eval.Utils;

import verb.eval.types.CurveData;

@:expose("eval.Tess")
class Tess {

	//
	// Sample a NURBS curve at equally spaced parametric intervals
	//
	// **params**
	// + CurveData object
	// + integer number of samples
	// + whether to prefix the point with the parameter
	//
	// **returns**
	// + an array of points, prepended by the point param if required
	//

	public static function rational_curve_regular_sample( curve : CurveData, numSamples : Int, includeU : Bool ) : Array<Point> {
		return rational_curve_regular_sample_range( curve, curve.knots[0], curve.knots.last(), numSamples, includeU);
	}

	//
	// Sample a range of a NURBS curve at equally spaced parametric intervals
	//
	// **params**
	// + CurveData object
	// + start parameter for sampling
	// + end parameter for sampling
	// + integer number of samples
	// + whether to prefix the point with the parameter
	//
	// **returns**
	// + an dictionary of parameter - point pairs
	//

	public static function rational_curve_regular_sample_range( curve : CurveData, start : Float, end : Float,
																numSamples : Int, includeU  : Bool) : Array<Point>  {

		if (numSamples < 1){
			numSamples = 2;
		}

		var p = [];
		var span : Float = (end - start) / (numSamples - 1);
		var u : Float = 0;

		for (i in 0...numSamples){

			u = start + span * i;

			if ( includeU ){
				p.push( [u].concat( Nurbs.rational_curve_point(curve, u) ) );
			} else {
				p.push( Nurbs.rational_curve_point(curve, u) );
			}

		}

		return p;
	}


	//
	// Sample a NURBS curve over its entire domain, corresponds to http://ariel.chronotext.org/dd/defigueiredo93adaptive.pdf
	//
	// **params**
	// + CurveData object
	// + tol for the adaptive scheme
	// + whether to prefix the point with the parameter
	//
	// **returns**
	// + an array of dim + 1 length where the first element is the param where it was sampled and the remaining the pt
	//

	public static function rational_curve_adaptive_sample( curve : CurveData, tol : Float, includeU : Bool ) : Array<Point> {

		// if degree is 1, just return the dehomogenized control points
		if (curve.degree == 1){
			if ( !includeU ) {
				return curve.controlPoints.map( Nurbs.dehomogenize );
			} else {
				// the first element of each array is the parameter
				return [ for (i in 0...curve.controlPoints.length)
					[ curve.knots[i+1] ].concat( Nurbs.dehomogenize( curve.controlPoints[i] ) ) ];
			}
		}

		return rational_curve_adaptive_sample_range( curve, curve.knots[0], curve.knots.last(), tol, includeU );
	}

	//
	// Sample a NURBS curve at 3 points, facilitating adaptive sampling
	//
	// **params**
	// + CurveData object
	// + start parameter for sampling
	// + end parameter for sampling
	// + whether to prefix the point with the parameter
	//
	// **returns**
	// + an array of dim + 1 length where the first element is the param where it was sampled and the remaining the pt
	//

	public static function rational_curve_adaptive_sample_range( curve : CurveData, start, end, tol, includeU ) : Array<Point>{

		// sample curve at three pts
		var p1 = Nurbs.rational_curve_point(curve, start),
			p3 = Nurbs.rational_curve_point(curve, end),
			t = 0.5 + 0.2 * Math.random(),
			mid = start + (end - start) * t,
			p2 = Nurbs.rational_curve_point(curve, mid);

		// if the two end control points are coincident, the three point test will always return 0, let's split the curve
		var diff = Vec.sub( p1, p3);
		var diff2 = Vec.sub( p1, p2);

		// the first condition checks if the curve makes up a loop, if so, we will need to continue evaluation
		if ( ( Vec.dot( diff, diff ) < tol && Vec.dot( diff2, diff2 ) > tol ) || !Trig.three_points_are_flat( p1, p2, p3, tol ) ) {

			// get the exact middle
			var exact_mid = start + (end - start) * 0.5;

			// recurse on the two halves
			var left_pts = rational_curve_adaptive_sample_range( curve, start, exact_mid, tol, includeU )
			, right_pts = rational_curve_adaptive_sample_range( curve, exact_mid, end, tol, includeU );

			// concatenate the two
			return left_pts.slice(0, -1).concat(right_pts);

		} else {
			if (includeU){
				return [ 	[ start ].concat(p1) , [end].concat(p3) ];
			} else {
				return [ 	p1, p3 ];
			}
		}
	}

}

