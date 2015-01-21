package verb;

import verb.core.Eval;
import verb.core.Make;
import verb.core.Mat.Vector;
import verb.core.types.CurveData.Point;

@:expose("BezierCurve")
class BezierCurve extends NurbsCurve {

    private var _points : Point;

    private function new( start : Point ) {
        super( Make.polyline( [ start, end ] ) );

        _start = start;
        _end = end;
    }

    //
    // Create a line
    //
    // **params**
    // + *Array*, Length 3 array representing the start point
    // + *Array*, Length 3 array representing the end point
    //
    public static function byEnds(  start : Point, end : Point ) : BezierCurve {
        return new BezierCurve(start, end );
    }

    public function start(){ return _start; }
    public function end(){ return _end; }

}