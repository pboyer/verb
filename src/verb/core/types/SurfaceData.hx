package verb.core.types;

import verb.core.types.CurveData;

@:expose("core.SurfaceData")
class SurfaceData {

    // integer degree of surface in u direction
    public var degreeU : Int;

    // integer degree of surface in v direction
    public var degreeV : Int;

    // array of nondecreasing knot values in u direction
    public var knotsU : KnotArray;

    // array of nondecreasing knot values in v direction
    public var knotsV : KnotArray;

    // 3d array of control points, where rows are the u dir, and columns run along the positive v direction,
    // and where each control point is an array of length (dim)
    public var controlPoints : Array<Array<Point>>;

    public function new(degreeU, degreeV, knotsU, knotsV, controlPoints){
        this.degreeU = degreeU;
        this.degreeV = degreeV;
        this.knotsU = knotsU;
        this.knotsV = knotsV;
        this.controlPoints = controlPoints;
    }
}
