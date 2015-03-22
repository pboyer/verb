package verb.topo;

import verb.geom.ICurve;
import verb.core.types.IDoublyLinkedList;

@:expose("topo.HalfEdge")
class HalfEdge implements IDoublyLinkedList<HalfEdge> extends Topo {
    public var v : Vertex;
    public var l : Loop;
    public var opp : HalfEdge;
    public var prv : HalfEdge;
    public var nxt : HalfEdge;
    public var crv : ICurve;

    public function new( loop : Loop, vertex : Vertex ) {
        this.v = vertex;
        this.v.e = this;
        this.l = loop;
    }

    public function mate(he : HalfEdge) : HalfEdge {
        if (he == null) {
            return this;
        }

        this.opp = he;
        he.opp = this;
        return this;
    }
}
