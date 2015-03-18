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

        var nhe0 = nl.addHalfEdge( he1.v, he0 );
        var nhe1 = he1.l.addHalfEdge( he0.v, he1, nhe0 );

        nhe0.prv.nxt = nhe1;
        nhe1.prv.nxt = nhe0;
        var temp = nhe0.prv;
        nhe0.prv = nhe1.prv;
        nhe1.prv = temp;

        return nf;
    }

    // lkemr
    public function lkemr(he0 : HalfEdge) : Loop {

        // result is -1 (sometimes -2) half edges and +1 loop
        var he1 = he0.opp;
        var nl = he0.l.f.addLoop();

        var hea = he0.nxt;
        var heb = he1.nxt;

        // ensure vertex edge pointers are pointing at valid edges
        heb.v.e = heb;
        hea.v.e = hea;

        // split the original loop
        he0.prv.nxt = he1.nxt;
        he1.nxt.prv = he0.prv;

        // the two edges now loop around in nl
        he1.nxt = he0;
        he0.prv = he1;

        // move he0, he1 and edges in between to nl
        var che = he0;
        do {
            che.l = nl;
        } while( (che = che.nxt) != heb);

        // delete the half-edges from the new loop
        nl.delHalfEdge( he0 );
        nl.delHalfEdge( he1 ); // properly handles the length-1 loop case

        return nl;
    }


    public function lkvfs(face : Face) : Void {
        // remove an face with a single vertex
    }

    public function lkev(he : HalfEdge) : Void {
        // unlike kev which splits a vertex in two, this should join two adj vertices together

        // loop around the second vertex, assigning the start vertex
        var che = he.nxt;
        do {
            che.v = he.v;
        } while ( ( che.opp.nxt = che) != he.nxt);

        // remove the two half edges
        var oe = he.opp;
        he.l.delHalfEdge(he);
        oe.l.delHalfEdge(oe);

        // TODO!

    }

    public function lkef(he : HalfEdge) : Void {
        // unlike kef, which splits a face - this should join two faces together

        // what if the face has internal rings?

        // the face to remove
        var kl = he.l;
        var kf = he.l.f;

        var oe = he.opp;
        var ol = oe.l;

        // assign the edges to the other loop
        var che = he;
        do {
            che.l = ol;
        } while ( (che = he.nxt) != he);

        // remove the two halfEdges and properly fix predecessors
        // TODO!

        // remove the face

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

// Key
//
// m = make
// k = kill
// s = split
// j = join
// v = vertex
// e = edge
// f = face
// s = solid
// h = hole
// r = ring