package verb.core.types;

import verb.core.types.CurveData.Point;

typedef Tri = Array<Int>;
typedef UV = Array<Float>;

@:expose("core.MeshData")
class MeshData {

    public var faces : Array<Tri>;
    public var points : Array<Point>;
    public var normals : Array<Point>;
    public var uvs : Array<UV>;

    public function new(faces : Array<Tri>, vertices : Array<Point>, normals : Array<Point>, uvs : Array<UV> ) {
        this.faces = faces;
        this.points = vertices;
        this.normals = normals;
        this.uvs = uvs;
    }

    public static function empty() : MeshData {
        return new MeshData([],[],[],[]);
    }
}
