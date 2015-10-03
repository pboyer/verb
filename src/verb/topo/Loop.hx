package verb.topo;

import verb.core.types.NurbsCurveData.Point;
import verb.core.types.Exception;
import verb.core.types.DoublyLinkedListExtensions;

using Lambda;

import verb.core.types.IDoublyLinkedList;
using verb.core.types.DoublyLinkedListExtensions;

@:expose("topo.Loop")
class Loop implements IDoublyLinkedList<Loop> extends Topo {
    public var f : Face;
    public var e : HalfEdge;
    public var prv : Loop;
    public var nxt : Loop;

    public function new(face : Face) {
        this.f = face;
    }

    public function halfEdges() : Array<HalfEdge> {
        return e.iter().array();
    }

    public function vertices() : Array<Vertex> {
        return halfEdges().map(function(e : HalfEdge){ return e.v; });
    }

    public function coords() : Array<Float> {
        return vertices().fold(function(v : Vertex, a : Array<Float>){ return a.concat(v.pt); }, []);
    }

    public function points() : Array<Point> {
        return vertices().map(function(v : Vertex){ return v.pt; });
    }

    public function addHalfEdge(vertex : Vertex, next : HalfEdge = null, opp : HalfEdge = null ) : HalfEdge {
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

    public function delHalfEdge( he : HalfEdge ) : Loop {
        if ( he.l != this) {
            throw new Exception("HalfEdge is not part of this Loop!");
        }

        //the base case - a half-edge cycle
        if (he.nxt == he){
            he.opp = null;
            this.e = he;
            he.v.e = he;
            return this;
        }

        //reassign parent edge for vertex
        if (he.opp.nxt != null){
            he.v.e = he.opp.nxt;
        }

        this.e = e.kill(he);
        return this;
    }
}
