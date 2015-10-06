package verb.core;

// A `Point` in verb is represented simply by an array of floating point numbers

typedef Point = Array<Float>;

// Like a `Point`, a `Vector` is simply an array of floating point numbers

typedef Vector = Array<Float>

// `Matrix` is represented by a nested array of floating point number arrays

typedef Matrix = Array<Array<Float>>

// A `KnotArray` is a non-decreasing sequence of floating point . Use the methods in `Check` to validate `KnotArray`'s

typedef KnotArray = Array<Float>;

// A `Plane` is simply an origin point and normal

@:expose("core.Plane")
class Plane {

    public var normal : Vector;
    public var origin : Point;

    public function new(origin, normal){
        this.origin = origin;
        this.normal = normal;
    }
}

// A `Ray` is simply an origin point and a direction

@:expose("core.Ray")
class Ray {

    public var dir : Vector;
    public var origin : Point;

    public function new(origin, dir){
        this.origin = origin;
        this.dir = dir;
    }
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

@:expose("core.Pair")
class Pair<T1, T2> {
    public var item0 : T1;
    public var item1 : T2;

    public function new(item1 : T1, item2 : T2) {
        this.item0 = item1;
        this.item1 = item2;
    }
}

@:expose("core.Interval")
class Interval<T> {
    public var min : T;
    public var max : T;

    public function new(min, max){
        this.min = min;
        this.max = max;
    }
}