package verb.geom;

import verb.core.Eval;
import verb.core.Make;
import verb.core.Mat.Vector;
import verb.core.types.NurbsCurveData.Point;

@:expose("geom.BezierCurve")
class BezierCurve extends NurbsCurve {

    //Create a bezier curve
    //
    //**params**
    //
    //* Array of control points

    public function new( points : Array<Point>, weights : Array<Float> = null ) {
        super( Make.rationalBezierCurve( points, weights ) );
    }
}