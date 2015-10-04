package verb.core;

import verb.core.NurbsCurveData.Point;

@:expose("core.PolylineData")
class PolylineData {
    public var points : Array<Point>;
    public var params : Array<Float>;

    public function new(points, params){
        this.points = points;
        this.params = params;
    }
}