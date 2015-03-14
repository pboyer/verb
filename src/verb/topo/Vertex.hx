package verb.topo;

import verb.core.types.IDoublyLinkedList;
import verb.core.types.NurbsCurveData.Point;

@:expose("topo.Vertex")
class Vertex implements IDoublyLinkedList<Vertex> {
    public var pt : Point;
    public var e : HalfEdge; // a vertex may be "owned" by many HalfEdge's - this is one of them
    public var prv : Vertex;
    public var nxt : Vertex;

    public function new(point) {
        this.pt = point;
    }
}
