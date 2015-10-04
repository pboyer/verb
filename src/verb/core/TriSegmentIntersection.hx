package verb.core;

import verb.core.NurbsCurveData.Point;

@:expose("core.TriSegmentIntersection")
class TriSegmentIntersection {

    //where the intersection took place
    public var point : Point;
    //the u param where u is the axis from v0 to v1
    public var s : Float;
    //the v param where v is the axis from v0 to v2
    public var t : Float;
    //the parameter along the segment
    public var p : Float;

    public function new(point, s, t, r){
        this.point = point;
        this.s = s;
        this.t = t;
        this.p = r;
    }
}