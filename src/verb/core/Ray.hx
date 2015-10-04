package verb.core;

import verb.core.Data;
import verb.core.Vec;

@:expose("core.Ray")
class Ray {
    public var origin : Point;
    public var dir : Vector;

    public function new(origin : Point, dir : Vector){
        this.origin = origin;
        this.dir = dir;
    }
}

