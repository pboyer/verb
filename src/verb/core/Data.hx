package verb.core;

import verb.core.Serialization;

// A `Point` in verb is represented simply by an array of floating point numbers.
//
// So, in JavaScript, one would write simply `[0,0,0]` to create a Point at the origin.

typedef Point = Array<Float>;

// Like a `Point`, a `Vector` is simply an array of floating point numbers
//
// So, in JavaScript, one would write simply `[1,0,0]` to create the a unit vector in the x direction

typedef Vector = Array<Float>

// `Matrix` is represented by a nested array of floating point number arrays
//
// So, in JavaScript, one would write simply `[[1,0],[0,1]]` to create a 2x2 identity matrix

typedef Matrix = Array<Array<Float>>

// A `KnotArray` is a non-decreasing sequence of floating point . Use the methods in `Check` to validate `KnotArray`'s

typedef KnotArray = Array<Float>;

// A `Plane` is simply an origin point and normal

@:expose("core.Plane")
class Plane extends SerializableBase {

    public var normal : Vector;
    public var origin : Point;

    public function new(origin, normal){
        this.origin = origin;
        this.normal = normal;
    }
}

// A `Ray` is simply an origin point and a direction

@:expose("core.Ray")
class Ray extends SerializableBase {

    public var dir : Vector;
    public var origin : Point;

    public function new(origin, dir){
        this.origin = origin;
        this.dir = dir;
    }
}

// A simple data structure representing a NURBS curve. `NurbsCurveData` does no checks for legality. You can use
// `verb.eval.Check` for that.

@:expose("core.NurbsCurveData")
class NurbsCurveData extends SerializableBase {

    public function new(degree, knots, controlPoints){
        this.degree = degree;
        this.controlPoints = controlPoints;
        this.knots = knots;
    }

    //integer degree of curve
    public var degree : Int;

    // 2d array of control points, where each control point is an array of length (dim)
    public var controlPoints : Array<Point>;

    //array of nondecreasing knot values
    public var knots : Array<Float>;

}

// A simple data structure representing a NURBS surface. `NurbsSurfaceData` does no checks for legality. You can use
// `verb.eval.Check` for that.

@:expose("core.NurbsSurfaceData")
class NurbsSurfaceData extends SerializableBase {

    public function new(degreeU, degreeV, knotsU, knotsV, controlPoints){
        this.degreeU = degreeU;
        this.degreeV = degreeV;
        this.knotsU = knotsU;
        this.knotsV = knotsV;
        this.controlPoints = controlPoints;
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

}

// A triangular face of a mesh

typedef Tri = Array<Int>;

// A `UV` is simply an array of floating point numbers.
//
// So, in JavaScript, one would write simply `[1,0]` to create a UV

typedef UV = Array<Float>;

// A simple data structure representing a mesh. `MeshData` does not check for legality.

@:expose("core.MeshData")
class MeshData extends SerializableBase {

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

// A simple data structure representing a polyline. `PolylineData` is useful, for example, as the result of a curve tessellation.

@:expose("core.PolylineData")
class PolylineData extends SerializableBase {

    // The points in the polyline
    public var points : Array<Point>;

    // The parameters of the individual points
    public var params : Array<Float>;

    public function new(points, params){
        this.points = points;
        this.params = params;
    }
}

// A simple data structure representing a NURBS volume. This data structure is largely experimental in intent. Like CurveData
// and SurfaceData, this data structure does no legality checks.

@:expose("core.VolumeData")
class VolumeData extends SerializableBase {

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

// A simple parametric data type representing a pair of two objects

@:expose("core.Pair")
class Pair<T1, T2> {
    public var item0 : T1;
    public var item1 : T2;

    public function new(item1 : T1, item2 : T2) {
        this.item0 = item1;
        this.item1 = item2;
    }
}

// A simple parametric data type representing an "interval" between two numbers. This data structure does no legality checks.

@:expose("core.Interval")
class Interval<T> {
    public var min : T;
    public var max : T;

    public function new(min, max){
        this.min = min;
        this.max = max;
    }
}