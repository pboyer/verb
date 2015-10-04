package verb.core;

import verb.core.types.NurbsCurveData;

@:expose("core.NurbsSurfaceData")
class NurbsSurfaceData {

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

    public function new(degreeU, degreeV, knotsU, knotsV, controlPoints, closedU = false, closedV = false){
        this.degreeU = degreeU;
        this.degreeV = degreeV;
        this.knotsU = knotsU;
        this.knotsV = knotsV;
        this.controlPoints = controlPoints;
        this.closedU = closedU;
        this.closedV = closedV;
    }
}
