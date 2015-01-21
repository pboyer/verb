package verb;

import verb.core.Eval;
import verb.core.Make;
import verb.core.Mat.Vector;
import verb.core.types.CurveData.Point;

@:expose("Line")
class Line extends NurbsCurve {

    private var _start : Point;
    private var _end : Vector;

    private function new( start : Point, end : Vector ) {
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
    public static function byEnds(  start : Point, end : Point ) : Line {
        return new Line(start, end );
    }

    public function start(){ return _start; }
    public function end(){ return _end; }

}