package verb.core;

import verb.core.Data;

@:expose("core.CurveCurveIntersection")
class CurveCurveIntersection {

    //where the intersection took place
    public var point0 : Point;

    //where the intersection took place on the second curve
    public var point1 : Point;

    //the parameter on the first curve
    public var u0 : Float;

    //the parameter on the second curve
    public var u1 : Float;

    public function new(point0, point1, u0, u1){
        this.point0 = point0;
        this.point1 = point1;
        this.u0 = u0;
        this.u1 = u1;
    }
}

@:expose("core.CurveSurfaceIntersection")
class CurveSurfaceIntersection {

    public var u : Float;
    public var uv : UV;
    public var curvePoint : Point;
    public var surfacePoint : Point;

    public function new( u, uv, curvePoint, surfacePoint ){
        this.u = u;
        this.uv = uv;
        this.curvePoint = curvePoint;
        this.surfacePoint = surfacePoint;
    }
}

@:expose("core.MeshIntersectionPoint")
class MeshIntersectionPoint {

    public var uv0 : UV;
    public var uv1 : UV;
    public var point : Point;

    public var faceIndex0 : Int;
    public var faceIndex1 : Int;

    //tags to navigate a segment structure
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

@:expose("core.PolylineMeshIntersection")
class PolylineMeshIntersection {

    public var point : Point;
    public var u : Float;
    public var uv : UV;
    public var polylineIndex : Int;
    public var faceIndex : Int;

    public function new(point, u, uv, polylineIndex, faceIndex){
        this.point = point;
        this.u = u;
        this.uv = uv;
        this.polylineIndex = polylineIndex;
        this.faceIndex = faceIndex;
    }
}

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

@:expose("core.CurvePoint")
class CurvePoint {
    public var u : Float;
    public var pt : Point;

    public function new(u, pt) {
        this.u = u;
        this.pt = pt;
    }
}
