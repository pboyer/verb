package verb.core;

import verb.core.NurbsCurveData.Point;
import verb.core.Vec.Vector;

@:expose("core.Ray")
class Ray {
    public var origin : Point;
    public var dir : Vector;

    public function new(origin : Point, dir : Vector){
        this.origin = origin;
        this.dir = dir;
    }
}

