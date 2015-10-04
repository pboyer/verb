package verb.eval;

import verb.core.NurbsCurveData;
import verb.core.CurveLengthSample;
import verb.core.Vec;
import verb.core.Constants;

using Lambda;

@:expose("eval.Divide")
class Divide {

    public static function rationalCurveByEqualArcLength(curve : NurbsCurveData, num : Int) : Array<CurveLengthSample> {

        var tlen = Analyze.rationalCurveArcLength( curve );
        var inc = tlen / num;

        return Divide.rationalCurveByArcLength(curve, inc);

    }

    public static function rationalCurveByArcLength(curve : NurbsCurveData, l : Float) : Array<CurveLengthSample> {

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
