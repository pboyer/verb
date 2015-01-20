package verb.core.types;

import verb.core.types.CurveData.Point;

@:expose("core.CurvePoint")
class CurvePoint {
    public var u : Float;
    public var pt : Point;

    public function new(u, pt) {
        this.u = u;
        this.pt = pt;
    }
}
