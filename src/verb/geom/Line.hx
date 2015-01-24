package verb.geom;

import verb.core.Eval;
import verb.core.Make;
import verb.core.Mat.Vector;
import verb.core.types.CurveData.Point;

@:expose("geom.Line")
class Line extends NurbsCurve {

    private var _start : Point;
    private var _end : Point;

    private function new( start : Point, end : Point ) {
        super( Make.polyline( [ start, end ] ) );

        _start = start;
        _end = end;
    }

    // Create a line
    //
    // **params**
    // + Length 3 array representing the start point
    // + Length 3 array representing the end point

    public static function byEnds(  start : Point, end : Point ) : Line {
        return new Line(start, end );
    }

    public function start(){ return _start; }
    public function end(){ return _end; }

}