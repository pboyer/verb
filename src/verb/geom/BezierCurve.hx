package verb.geom;

import verb.core.Eval;
import verb.core.Make;
import verb.core.Mat.Vector;
import verb.core.types.CurveData.Point;

@:expose("geom.BezierCurve")
class BezierCurve extends NurbsCurve {
    private function new( points : Array<Point>, weights : Array<Float> = null ) {
        super( Make.rationalBezierCurve( points, weights ) );
    }

    // Create a bezier curve
    //
    // **params**
    // + Length 3 array representing the start point
    // + Length 3 array representing the end point

    public static function byControlPoints( points : Array<Point> ) : BezierCurve {
        return new BezierCurve( points );
    }
}