package verb.topo;

import verb.core.types.DoublyLinkedListExtensions;
import verb.geom.ISurface;

using Lambda;

import verb.core.types.IDoublyLinkedList;
using verb.core.types.DoublyLinkedListExtensions;

import verb.topo.Tess2;

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

    public static function tessellate(){

        var ca = [0,0, 10,0, 5,10];
        var cb = [0,2, 10,2, 10,6, 0,6];
        var contours = [ca,cb];

        var opts = new Tess2Options();

        opts.contours = contours;
        opts.windingRule = Tess2.WINDING_ODD;
        opts.elementType = Tess2.POLYGONS;
        opts.polySize = 3;
        opts.vertexSize = 2;

        // Tesselate
        return Tess2.tessellate(opts);

    }

}
