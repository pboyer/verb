package verb.topo;

import verb.core.types.DoublyLinkedListExtensions;
using Lambda;

import verb.core.types.Pair;
import verb.core.types.NurbsCurveData.Point;

import verb.core.types.IDoublyLinkedList;
using verb.core.types.DoublyLinkedListExtensions;

@:expose("topo.Solid")
class Solid {

    public var v : Vertex;
    public var f : Face;

    public function new(){}

    // make vertex face solid
    public static function mvfs(pt : Point) : Solid {
        var s = new Solid();
        var f = s.addFace();
        var l = f.addLoop();
        var h = l.addHalfEdge( s.addVertex(pt) );

        return s;
    }

    // make edge vertex
    public function lmev(he0 : HalfEdge, he1 : HalfEdge, pt : Point) : Vertex {
        var v = this.addVertex( pt );

        var he = he0;

        while ( he != he1 ) {
            he.v = v;
            he = he.opp.nxt;
        }

        var ov = he0.v;
        var nhe0 = he1.l.addHalfEdge( v, he1 );
        var nhe1 = he0.l.addHalfEdge( ov, if (he0 == he1) nhe0 else he0, nhe0 );

        return v;
    }

    // make edge face
    public function lmef(he0 : HalfEdge, he1 : HalfEdge) : Face {
        var nf = addFace();
        var nl = nf.addLoop();

        var he = he0;
        while (he != he1){
            he.l = nl;
            he = he.nxt;
        }

        var nhe0 = he1.l.addHalfEdge( he0.v, he1 );
        var nhe1 = nl.addHalfEdge( he1.v, he0, nhe0 );

        return nf;
    }

    public function addFace() : Face {
        return f = f.push( new Face(this) );
    }

    public function addVertex( pt ) : Vertex {
        return v = v.push( new Vertex( pt ) );
    }

    public function vertices() : Array<Vertex> {
        return v.iterate().array();
    }

    public function faces() : Array<Face> {
        return f.iterate().array();
    }

    public function loops() : Array<Loop> {
        return faces().fold(function(f : Face, acc : Array<Loop>){ return acc.concat( f.loops() ); }, []);
    }

    public function halfEdges() : Array<HalfEdge> {
        return loops().fold(function(l : Loop, acc : Array<HalfEdge>){ return acc.concat( l.halfEdges() ); }, []);
    }

    public function print(){
        return "Solid (" +
            vertices().length + " Vertices, " +
            faces().length + " Faces, " +
            loops().length + " Loops, " +
            halfEdges().length + " HalfEdges" +
        ")";
    }
}

