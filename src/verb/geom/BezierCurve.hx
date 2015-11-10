package verb.geom;

import haxe.io.Error;
import verb.eval.Eval;
import verb.eval.Make;
import verb.core.Vec;
import verb.core.Data;

//A Bezier curve is a common spline curve
@:expose("geom.BezierCurve")
class BezierCurve extends NurbsCurve {

    //Create a bezier curve
    //
    //**params**
    //
    //* Array of control points
    //* Array of control point weights (optional)

    public function new( points : Array<Point>, weights : Array<Float> = null ) {
        super( Make.rationalBezierCurve( points, weights ) );
    }
}