package verb.topo;

import haxe.ds.IntMap;
import verb.core.types.IDoublyLinkedList;
import verb.core.types.NurbsCurveData.Point;

@:expose("topo.Vertex")
class Vertex implements IDoublyLinkedList<Vertex> extends Topo {
    public var pt : Point;
    public var e : HalfEdge; // a vertex may be "owned" by many HalfEdge's - this is one of them
    public var prv : Vertex;
    public var nxt : Vertex;

    public function new(point) {
        this.pt = point;
    }

    // TODO: test
    public function neighbors() : Array<Vertex> {
        var memo = new IntMap<Vertex>();
        memo.set(id, this); // do not include self ref's

        var a = [];
        var ce = e;
        for (e in halfEdges()){
            var v = e.nxt.v;
            if (memo.exists(v.id)) continue;
            a.push( v );
        }

        return a;
    }

    // TODO: test
    public function halfEdges() : Array<HalfEdge> {
        var a = [];
        var ce = e;
        do {
            a.push(ce);
            if (e.opp == null) break; // the solid base case
            ce = ce.opp.nxt;
        } while (ce != e);

        return a;
    }

}
