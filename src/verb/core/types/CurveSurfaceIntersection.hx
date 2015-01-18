package verb.core.types;

import verb.core.types.MeshData.UV;

@:expose("core.CurveSurfaceIntersection")
class CurveSurfaceIntersection {

    public var u : Float;
    public var uv : UV;

    public function new( u, uv ){
        this.u = u;
        this.uv = uv;
    }
}
