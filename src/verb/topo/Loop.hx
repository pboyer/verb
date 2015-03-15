package verb.topo;

import verb.core.types.NurbsCurveData.Point;
import verb.core.types.Exception;
import verb.core.types.DoublyLinkedListExtensions;
using Lambda;

import verb.core.types.IDoublyLinkedList;
using verb.core.types.DoublyLinkedListExtensions;

@:expose("topo.Loop")
class Loop implements IDoublyLinkedList<Loop> {
    public var f : Face;
    public var e : HalfEdge;
    public var prv : Loop;
    public var nxt : Loop;

    public function new(face : Face) {
        this.f = face;
    }

    public function addHalfEdge(vertex : Vertex, next : HalfEdge = null, opp : HalfEdge = null ) : HalfEdge {
        if (vertex == null) {
            throw new Exception("vertex cannot be null!");
        }

        if (next != null && next.l != this){
            throw new Exception("Next HalfEdge is not part of same Loop!");
        }

        if (next != null && next.opp == null && opp == null ){
            vertex.e = next;
            next.v = vertex;
            return next;
        }

        if (next != null){ e = next; }

        var he = new HalfEdge( this, vertex );
        he.mate(opp);

        return e = e.push( he );
    }

    public function halfEdges() : Array<HalfEdge> {
        return e.iterate().array();
    }

    public function vertices() : Array<Vertex> {
        return halfEdges().map(function(e : HalfEdge){ return e.v; });
    }

    public function points() : Array<Point> {
        return vertices().map(function(v : Vertex){ return v.pt; });
    }

}
