package verb.core;

import verb.core.types.NurbsCurveData.Point;
import verb.core.types.MeshData.UV;

@:expose("core.SurfaceSurfaceIntersectionPoint")
class SurfaceSurfaceIntersectionPoint {

    public var uv0 : UV;
    public var uv1 : UV;
    public var point : Point;
    public var dist : Float;

    public function new( uv0, uv1, point, dist ){
        this.uv0 = uv0;
        this.uv1 = uv1;
        this.point = point;
        this.dist = dist;
    }
}
