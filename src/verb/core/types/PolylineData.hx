package verb.core.types;

import verb.core.types.CurveData.Point;

@:expose("core.PolylineData")
class PolylineData {
    public var points : Array<Point>;
    public var params : Array<Float>;

    public function new(points, params){
        this.points = points;
        this.params = params;
    }
}