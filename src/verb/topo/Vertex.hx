package verb.topo;

// TODO

import verb.core.types.NurbsCurveData.Point;

class Vertex {

    public var point : Point;
    public var e : Edge;
    public var prev : Vertex;
    public var next : Vertex;

    public function new(point) {
        this.point = point;
    }
}
