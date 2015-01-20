package verb.core;

import verb.core.types.CurveData;
import verb.core.types.CurveLengthSample;
using Lambda;

@:expose("core.Divide")
class Divide {

    public static function rationalCurveEquallyByArcLength(curve : CurveData, num : Int) : Array<CurveLengthSample> {

        var tlen = Analyze.rationalCurveArcLength( curve );
        var inc = tlen / num;

        return Divide.rationalCurveByArcLength(curve, inc);

    }

    public static function rationalCurveByArcLength(curve : CurveData, l : Float) : Array<CurveLengthSample> {

        var crvs = Modify.decomposeCurveIntoBeziers( curve )
        , crvlens = crvs.map(function(x){ return Analyze.rationalBezierCurveArcLength(x); })
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

                u = Analyze.rationalBezierCurveParamAtArcLength( crvs[i], lc - runsum1, Constants.TOLERANCE, crvlens[i] );

                pts.push( new CurveLengthSample( u, lc ) );
                lc += inc;

            }

            runsum1 += crvlens[i];

            i++;

        }

        return pts;

    }

}
