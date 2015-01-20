package verb.core.types;

import verb.core.types.CurveData.Point;
import verb.core.types.MeshData.UV;

@:expose("core.CurveTriPoint")
class CurveTriPoint {
    public var u : Float;
    public var uv : UV;
    public var point : Point;

    public function new(u : Float, point : Point, uv : UV){
        this.u = u;
        this.point = point;
        this.uv = uv;
    }
}

