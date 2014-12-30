package verb.core;

import verb.core.types.CurveData;
import verb.core.types.CurveLengthSample;
using Lambda;

@:expose("core.Divide")
class Divide {

    public static function rational_curve_equally_by_arc_length(curve : CurveData, num : Int){

        var tlen = Analyze.rational_curve_arc_length( curve );
        var inc = tlen / num;

        return Divide.rational_curve_by_arc_length(curve, inc);

    }

    public static function rational_curve_by_arc_length(curve : CurveData, l : Float) : Array<CurveLengthSample> {

        var crvs = Modify.curve_bezier_decompose( curve )
        , crvlens = crvs.map(function(x){ return Analyze.rational_bezier_curve_arc_length(x); })
        , totlen = Vec.sum(crvlens)
        , pts = [ new CurveLengthSample( curve.knots[0], 0.0 ) ];

        if (l > totlen) return pts;

        var inc = l
        , i = 0
        , lc = inc
        , runsum = 0.0
        , runsum1 = 0.0
        , u;

        while ( i < crvs.length ){

            runsum += crvlens[i];

            while ( lc < runsum + Constants.EPSILON ){

                u = Analyze.rational_bezier_curve_param_at_arc_length( crvs[i], lc - runsum1, Constants.TOLERANCE, crvlens[i] );

                pts.push( new CurveLengthSample( u, lc ) );
                lc += inc;

            }

            runsum1 += crvlens[i];

            i++;

        }

        return pts;

    }

}
