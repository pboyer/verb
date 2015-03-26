package verb.topo;

import verb.topo.Tess2.PriorityQ;
import verb.core.Intersect;
import verb.core.Vec;
import verb.core.Trig;
import verb.core.types.Ray;
import haxe.ds.IntMap;
import verb.core.types.Exception;
import verb.core.types.DoublyLinkedListExtensions;
using Lambda;

using verb.core.Vec;

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
    public function lkev(he : HalfEdge) : Solid {
        if (he.nxt == he){
            throw new Exception("Cannot lkev the base case!");
        }

        var kv = he.nxt.v;  // in lkev, he.v's vertex needs to be set correctly

        // loop around the second vertex, assigning the start vertex
        var che = he.nxt;
        do {
            che.v = he.v;
        } while ( ( che.opp.nxt = che) != he.nxt);

        // remove the two half edges from their parent loops
        var oe = he.opp;
        he.l.delHalfEdge(he);
        oe.l.delHalfEdge(oe);

        return this.delVertex( kv );
    }

    // unlike kef, which splits a face - this lkef joins two faces together
    public function lkef(he : HalfEdge) : Solid {

        // what if the face has internal rings?
        // what if the two faces are equal?

        if (he.opp == null){
            throw new Exception("Cannot kill base case!");
        }

        if (he.opp.l.f == he.l.f){
            throw new Exception("Edge does not traverse two distinct faces!");
        }

        var kl = he.l; // what about internal loops?

        // the face to remove
        var kf = he.l.f;

        // the opposite edge and loop that we will maintain
        var oe = he.opp;
        var ol = oe.l;
        var of = oe.l.f;

        // assign the edges of the given edge to the opposite loop
        var che = he;
        do {
            che.l = ol;
        } while ( (che = che.nxt) != he);

        // store the adjacent edges
        var ha = he.prv;
        var hb = he.nxt;

        var hc = oe.prv;
        var hd = oe.nxt;

        // properly set adjacent edges
        ha.nxt = hd;
        hd.prv = ha;

        hc.nxt = hb;
        hb.prv = hc;

        // set the vertex parents correctly
        he.v.e = hd;
        oe.v.e = hb;

        // assign the edge correctly
        if (ol.e == oe){
            ol.e = hc;
        }

        // move kf's internal rings to of
        for (l in kf.rings()){
            l.f = of;
            of.l.push( l );
        }

        // delete the old face from the solid
        this.delFace( kf );

        return this;
    }

    // TODO: test
    // inverse of lkemr
    // introduces a new edge between two loops, forming a single loop
    public function lmekr(he0: HalfEdge, he1 : HalfEdge) : HalfEdge {

        // check if the two edges aren't already part of the same loop
        if (he0.l == he1.l){
            throw new Exception("HalfEdges are not from different loops!");
        }

        if (he0.l.f == he1.l.f){
            throw new Exception("HalfEdges must be part of the same face!");
        }

        // we keep the first loop arg
        var l0 = he0.l;

        // for all the edges in loop1, set loop0 as parent
        for (he in he1.iter()){ he.l = l0; }

        // create two new half edges in loop0
        var ne0 = new HalfEdge(l0, he0.v);
        var ne1 = new HalfEdge(l0, he1.v);
        ne0.mate(ne1);

        // using the two new half edges, rejoin the loop
        he0.prv.nxt = ne0;
        he1.prv.nxt = ne1;

        ne0.prv = he0.prv;
        ne1.prv = he1.prv;

        he1.prv = ne0;
        he0.prv = ne1;

        ne0.nxt = he1;
        ne1.nxt = he0;

        return ne0;
    }

    // TODO: test
    // kill face make ring hole
    // we kill the face by making it a ring inside of the face
    public function lkfmrh(he0 : HalfEdge, he1 : HalfEdge){

        // the face to remove
        var of = he0.l.f;

        // the target face
        var tf = he1.l.f;

        // what to do if the face has rings in it? don't allow it?
        if (he0.l != of.ol || he0.l.nxt != he0.l){
            throw new Exception("First edge must be from outer loop of face with no interior rings!");
        }

        // move the original loop to new edge as an interior ring
        he0.l.f = tf;
        tf.l.push( he0.l );

        delFace( he0.l.f );

        return he0.l;
    }

    // TODO: test
    // create a face by extracting a ring from a face
    public function lmfkrh( he : HalfEdge ){

        // the original loop (ring)
        var ol = he.l;

        // its parent face
        var of = ol.f;

        // remove the original ring from its parent face
        of.delLoop( ol );

        // the new face
        var nf = this.addFace();

        // insert the old loop into its parent
        nf.addLoop(ol);

        return nf;
    }

    private function addFace() : Face {
        return f = f.push( new Face(this) );
    }

    private function delFace( i : Face ) : Solid {
        if ( i.s != this) {
            throw new Exception("Face is not part of this Solid!");
        }

        f = f.kill(i);
        return this;
    }

    private function addVertex( pt ) : Vertex {
        return v = v.push( new Vertex( pt ) );
    }

    private function delVertex( i : Vertex ) : Solid {
        if ( i.e.l.f.s != this) {
            throw new Exception("Face is not part of this Solid!");
        }

        v = v.kill(i);
        return this;
    }

    public function vertices() : Array<Vertex> {
        return v.iter().array();
    }

    public function faces() : Array<Face> {
        return f.iter().array();
    }

    public function loops() : Array<Loop> {
        return faces().fold(function(f : Face, acc : Array<Loop>){ return acc.concat( f.loops() ); }, []);
    }

    public function halfEdges() : Array<HalfEdge> {
        return loops().fold(function(l : Loop, acc : Array<HalfEdge>){ return acc.concat( l.halfEdges() ); }, []);
    }

    public function edges() : Array<Pair<HalfEdge, HalfEdge>> {
        var m = new IntMap<HalfEdge>();

        var a = [];
        for (e in halfEdges()){
            if (e.opp == null || m.exists(e.id) || m.exists(e.opp.id)) continue;
            m.set( e.id, e );
            m.set( e.opp.id, e.opp );
            a.push( new Pair(e, e.opp) );
        }

        return a;
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