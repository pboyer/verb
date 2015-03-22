package verb.topo;

import verb.core.types.Exception;
import verb.core.types.DoublyLinkedListExtensions;
using Lambda;

import verb.core.types.Pair;
import verb.core.types.NurbsCurveData.Point;

import verb.core.types.IDoublyLinkedList;
using verb.core.types.DoublyLinkedListExtensions;

@:expose("topo.Solid")
class Solid extends Topo {

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
        if (he0.l != he1.l) {
            throw new Exception("Both HalfEdge's must be part of the same loop!");
        }

        var nf = addFace();
        var nl = nf.addLoop();
        var ol = he1.l;

        var he = he0;
        while (he != he1){
            he.l = nl;
            he = he.nxt;
        }

        // close the two loops
        he1.prv.nxt = he0;
        he0.prv.nxt = he1;

        var t = he1.prv;
        he1.prv = he0.prv;
        he0.prv = t;

        // insert new edges into the two loops
        var nhe0 = nl.addHalfEdge( he1.v, he0 );
        var nhe1 = ol.addHalfEdge( he0.v, he1, nhe0 );

        return nf;
    }

    // kill edge make ring
    public function lkemr(he0 : HalfEdge) : Loop {

        // result is -1 (sometimes -2) half edges and +1 loop
        var he1 = he0.opp;
        var ol = he0.l;
        var nl = ol.f.addLoop();

        var hea = he0.nxt;
        var heb = he1.nxt;

        // ensure vertex edge pointers are pointing at valid edges
        heb.v.e = heb;
        hea.v.e = hea;

        // split the original loop
        he0.prv.nxt = he1.nxt;
        he1.nxt.prv = he0.prv;

        // ensure the old loop has a valid edge ptr
        ol.e = he1.nxt;

        // the two edges now loop back around in nl
        he1.nxt = he0;
        he0.prv = he1;

        // move he0, he1 and edges in between to nl
        var che = he0;
        do {
            che.l = nl;
            che = che.nxt;
        } while( che != he0 );

        // move the edges to nl
        nl.e = he1;

        // delete the half-edges from the new loop
        nl.delHalfEdge( he0 );
        nl.delHalfEdge( he1 ); // properly handles the length-1 loop case

        return nl;
    }

    // TODO: test
    public function lkvfs(he : HalfEdge) : Solid {
        // remove an face with a single vertex
        // should remove a face that contains one vertex, halfedge, and loop

        // remove the face
        // remove the vertex

        // TODO: check if other edges ref this one?

        var v = he.v;
        this.delVertex( v );
        this.delFace( he.l.f );
        return this;
    }

    // unlike lkev which splits a vertex in two, this should
    // join two adj vertices together

    // TODO: test
    public function lkev(he : HalfEdge) : Solid {

        // loop around the second vertex, assigning the start vertex
        var che = he.nxt;
        do {
            che.v = he.v;
        } while ( ( che.opp.nxt = che) != he.nxt);

        // remove the two half edges
        var oe = he.opp;
        he.l.delHalfEdge(he);
        oe.l.delHalfEdge(oe);

        return this;
    }

    // unlike kef, which splits a face - this should join two faces together

    // TODO: test
    public function lkef(he : HalfEdge) : Solid {

        // what if the face has internal rings?
        // what if the two faces are equal?

        // the face to remove
        var kl = he.l;
        var kf = he.l.f; // what about internal loops?

        // the opposite edge and loop
        var oe = he.opp;
        var ol = oe.l;

        // assign the edges of the given edge to the opposite loop
        var che = he;
        do {
            che.l = ol;
        } while ( (che = he.nxt) != he);

        // store the edges adjacent edges
        var ha = he.prv;
        var hb = he.nxt;

        var hc = oe.prv;
        var hd = oe.nxt;

        // properly set before & after of leftover adjacent edges
        ha.nxt = hd;
        hd.prv = ha;

        hc.nxt = hb;
        hb.prv = hc;

        // assign the edge correctly
        if (ol.e == oe){
            ol.e = hc;
        }

        return this;
    }

    public function addFace() : Face {
        return f = f.push( new Face(this) );
    }

    // TODO: test
    public function delFace( i : Face ) : Solid {
        if ( i.s != this) {
            throw new Exception("Face is not part of this Solid!");
        }

        f = f.kill(i);
        return this;
    }

    public function addVertex( pt ) : Vertex {
        return v = v.push( new Vertex( pt ) );
    }

    // TODO: test
    public function delVertex( i : Vertex ) : Solid {
        if ( i.e.l.f.s != this) {
            throw new Exception("Face is not part of this Solid!");
        }

        v = v.kill(i);
        return this;
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