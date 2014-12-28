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
	// + integer degree
	// + array of nondecreasing knot values
	// + 1d array of homogeneous control points, where each control point is an array of length (dim+1) and form (wi*pi, wi)
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

}

