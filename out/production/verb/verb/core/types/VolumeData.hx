package verb.core.types;

import verb.core.types.NurbsCurveData;

@:expose("core.VolumeData")
class VolumeData {

    // integer degree in u direction
    public var degreeU : Int;

    // integer degree in v direction
    public var degreeV : Int;

    // integer degree in w direction
    public var degreeW : Int;

    // array of nondecreasing knot values in u direction
    public var knotsU : KnotArray;

    // array of nondecreasing knot values in v direction
    public var knotsV : KnotArray;

    // array of nondecreasing knot values in w direction
    public var knotsW : KnotArray;

    // 3d array of control points, where rows are the u dir, and columns run along the positive v direction,
    // and where each control point is an array of length (dim)
    public var controlPoints : Array<Array<Array<Point>>>;

    public function new(degreeU, degreeV, degreeW, knotsU, knotsV, knotsW, controlPoints){
        this.degreeU = degreeU;
        this.degreeV = degreeV;
        this.degreeW = degreeW;
        this.knotsU = knotsU;
        this.knotsV = knotsV;
        this.knotsW = knotsW;
        this.controlPoints = controlPoints;
    }
}
