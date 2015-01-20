package verb.core.types;

import verb.core.types.CurveData.Point;
import verb.core.types.MeshData.UV;

@:expose("core.MeshIntersectionPoint")
class MeshIntersectionPoint {
    public var uv0 : UV;
    public var uv1 : UV;
    public var point : Point;

    public var faceIndex0 : Int;
    public var faceIndex1 : Int;

// tags to navigate a segment structure
    public var opp : MeshIntersectionPoint = null;
    public var adj : MeshIntersectionPoint = null;
    public var visited : Bool = false;

    public function new(uv0, uv1, point, faceIndex0, faceIndex1){
        this.uv0 = uv0;
        this.uv1 = uv1;
        this.point = point;
        this.faceIndex0;
        this.faceIndex1;
    }
}