package verb.topo;

import verb.core.types.DoublyLinkedListExtensions;
import verb.geom.ISurface;

using Lambda;

import verb.core.types.IDoublyLinkedList;
using verb.core.types.DoublyLinkedListExtensions;

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
}
