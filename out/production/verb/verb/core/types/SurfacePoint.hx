package verb.core.types;
import verb.core.types.NurbsCurveData.Point;
import verb.core.types.MeshData.UV;

class SurfacePoint {

    public var uv : UV;
    public var point : Point;
    public var normal : Point;
    public var id : Int;
    public var degen : Bool;

    public function new(point : Point, normal : Point, uv : UV, id : Int = -1, degen : Bool = false) {
        this.uv = uv;
        this.point = point;
        this.normal = normal;
        this.id = id;
        this.degen = degen;
    }

    public static function fromUv(u,v){
        return new SurfacePoint(null, null, [u,v] );
    }
}