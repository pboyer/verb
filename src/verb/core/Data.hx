package verb.core;

typedef Point = Array<Float>;
typedef KnotArray = Array<Float>;
typedef CurvePointArray = Array<Point>;
typedef Plane = {
    n : Array<Float>,
    o : Array<Float>
}

@:expose("core.NurbsSurfaceData")
class NurbsSurfaceData {

    public function new(degreeU, degreeV, knotsU, knotsV, controlPoints, closedU = false, closedV = false){
        this.degreeU = degreeU;
        this.degreeV = degreeV;
        this.knotsU = knotsU;
        this.knotsV = knotsV;
        this.controlPoints = controlPoints;
        this.closedU = closedU;
        this.closedV = closedV;
    }

    //integer degree of surface in u direction
    public var degreeU : Int;

    //integer degree of surface in v direction
    public var degreeV : Int;

    //array of nondecreasing knot values in u direction
    public var knotsU : KnotArray;

    //array of nondecreasing knot values in v direction
    public var knotsV : KnotArray;

    // 2d array of control points, the vertical direction (u) increases from top to bottom, the v direction from left to right,
    //and where each control point is an array of length (dim)
    public var controlPoints : Array<Array<Point>>;

    //is the surface cyclic in U
    public var closedU : Bool;

    //is the surface cyclic in V
    public var closedV : Bool;

}

@:expose("core.NurbsCurveData")
class NurbsCurveData {

    public function new(degree, knots, controlPoints, closed = false){
        this.degree = degree;
        this.controlPoints = controlPoints;
        this.knots = knots;
        this.closed = closed;
    }

    //integer degree of curve
    public var degree : Int;

    // 2d array of control points, where each control point is an array of length (dim)
    public var controlPoints : Array<Point>;

    //array of nondecreasing knot values
    public var knots : Array<Float>;

    //is the surface cyclic in U
    public var closed : Bool;

}

typedef Tri = Array<Int>;
typedef UV = Array<Float>;

@:expose("core.MeshData")
class MeshData {

    public var faces : Array<Tri>;
    public var points : Array<Point>;
    public var normals : Array<Point>;
    public var uvs : Array<UV>;

    public function new(faces : Array<Tri>, points : Array<Point>, normals : Array<Point>, uvs : Array<UV> ) {
        this.faces = faces;
        this.points = points;
        this.normals = normals;
        this.uvs = uvs;
    }

    public static function empty() : MeshData {
        return new MeshData([],[],[],[]);
    }
}

@:expose("core.PolylineData")
class PolylineData {
    public var points : Array<Point>;
    public var params : Array<Float>;

    public function new(points, params){
        this.points = points;
        this.params = params;
    }
}

@:expose("core.VolumeData")
class VolumeData {

    public function new(degreeU, degreeV, degreeW, knotsU, knotsV, knotsW, controlPoints){
        this.degreeU = degreeU;
        this.degreeV = degreeV;
        this.degreeW = degreeW;
        this.knotsU = knotsU;
        this.knotsV = knotsV;
        this.knotsW = knotsW;
        this.controlPoints = controlPoints;
    }

    //integer degree in u direction
    public var degreeU : Int;

    //integer degree in v direction
    public var degreeV : Int;

    //integer degree in w direction
    public var degreeW : Int;

    //array of nondecreasing knot values in u direction
    public var knotsU : KnotArray;

    //array of nondecreasing knot values in v direction
    public var knotsV : KnotArray;

    //array of nondecreasing knot values in w direction
    public var knotsW : KnotArray;

    // 3d array of control points, where rows are the u dir, and columns run along the positive v direction,
    //and where each control point is an array of length (dim)
    public var controlPoints : Array<Array<Array<Point>>>;

}
