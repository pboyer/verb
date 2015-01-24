package verb.core.types;

import verb.core.types.NurbsCurveData.Point;
@:expose("core.CurveCurveIntersection")
class CurveCurveIntersection {

    // where the intersection took place
    public var point0 : Point;

    // where the intersection took place on the second curve
    public var point1 : Point;

    // the parameter on the first curve
    public var u0 : Float;

    // the parameter on the second curve
    public var u1 : Float;

    public function new(point0, point1, u0, u1){
        this.point0 = point0;
        this.point1 = point1;
        this.u0 = u0;
        this.u1 = u1;
    }

}