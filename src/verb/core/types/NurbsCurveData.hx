package verb.core.types;

typedef Point = Array<Float>;
typedef KnotArray = Array<Float>;
typedef CurvePointArray = Array<Point>;

@:expose("core.NurbsCurveData")
class NurbsCurveData {

    // integer degree of curve
    public var degree : Int;

    // 2d array of control points, where each control point is an array of length (dim)
    public var controlPoints : Array<Point>;

    // array of nondecreasing knot values
    public var knots : Array<Float>;

    // is the surface cyclic in U
    public var closed : Bool;

    public function new(degree, knots, controlPoints, closed = false){
        this.degree = degree;
        this.controlPoints = controlPoints;
        this.knots = knots;
        this.closed = closed;
    }
}

