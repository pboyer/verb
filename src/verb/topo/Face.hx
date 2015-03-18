package verb.topo;

import verb.core.types.DoublyLinkedListExtensions;
import verb.geom.ISurface;

using Lambda;

import verb.core.types.IDoublyLinkedList;
using verb.core.types.DoublyLinkedListExtensions;

import verb.topo.Tess2;

import verb.core.Vec;
using verb.core.Vec;

@:expose("topo.Face")
class Face implements IDoublyLinkedList<Face> {

    public var s : Solid;
    public var l : Loop;
    public var prv : Face;
    public var nxt : Face;
    public var srf : ISurface;

    public function new(solid) {
        this.s = solid;
    }

    public function loops() : Array<Loop> {
        return l.iterate().array();
    }

    public function addLoop() : Loop {
        return l = l.push(new Loop(this));
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
