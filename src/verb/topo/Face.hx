package verb.topo;

import verb.core.types.Exception;
import haxe.ds.IntMap;

import verb.core.types.DoublyLinkedListExtensions;
import verb.geom.ISurface;

using Lambda;

import verb.core.types.IDoublyLinkedList;
using verb.core.types.DoublyLinkedListExtensions;

import verb.topo.Tess2;

import verb.core.Vec;
using verb.core.Vec;

@:expose("topo.Face")
class Face implements IDoublyLinkedList<Face> extends Topo {

    public var s : Solid;
    public var ol : Loop; // outer loop
    public var l : Loop;
    public var prv : Face;
    public var nxt : Face;
//    public var srf : ISurface; // TODO: all faces now planar

    public function new(solid) {
        this.s = solid;
    }

    public function loops() : Array<Loop> {
        return l.iter().array();
    }

    // TODO: test
    public function rings() : Array<Loop> {
        var a = [];
        for (il in l.iter()){
            if (il == ol) continue;
            a.push(il);
        }
        return a;
    }

    public function addLoop(nl : Loop = null) : Loop {
        if (nl == null) {
            nl = new Loop(this);
        }
        if (ol == null) ol = nl; // the first loop is the outer loop
        return l = l.push(nl);
    }

    public function delLoop(kl : Loop) : Void {
        if (kl == ol) {
            throw new Exception("Cannot delete outer loop!"); // this may be overly conservative
        }
        l = l.kill(kl);
    }

    // TODO: test
    public function neighbors() : Array<Face> {
        var memo = new IntMap<Face>();
        memo.set(id, this); // do not include self

        var a = [];

        var he = halfEdges();
        for (e in he){
            if (e.opp == null) continue;

            var f = e.opp.l.f;
            if (memo.exists(f.id)) continue;

            memo.set(f.id, f);
            a.push(f);
        }

        return a;
    }

    // TODO: test
    public function halfEdges() : Array<HalfEdge>{
        return loops().fold(function(l : Loop, a : Array<HalfEdge>){
            return a.concat( l.halfEdges() );
        }, []);
    }

    public function tessellate(){
        var opts = new Tess2Options();

        opts.contours = loops().map(function(x : Loop){ return x.coords(); });
        opts.windingRule = Tess2.WINDING_ODD; // TODO: is this what I want?
        opts.elementType = Tess2.POLYGONS;
        opts.polySize = 3;
        opts.normal = normal();
        opts.vertexSize = 3;

        return Tess2.tessellate(opts);
    }

    public function normal() : Array<Float> {
        // TODO: specify face eq
        var v0 = l.e.v.pt;
        var v1 = l.e.nxt.v.pt;
        var v2 = l.e.nxt.nxt.v.pt;

        var v01 = v0.sub(v1);
        var v21 = v2.sub(v1);

        return v01.cross(v21).normalized();
    }
}
