package verb.topo;

// TODO

import verb.core.types.NurbsCurveData.Point;

class Vertex {

    public var id : Int;
    public var p : Point;
    public var e : Edge;
    public var pre : Vertex;
    public var nxt : Vertex;

    public function new() {
    }
}
