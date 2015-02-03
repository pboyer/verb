package verb.topo;

// TODO

import verb.geom.ISurface;

class Face {

    public var id : String;
    public var s : Solid;
    public var l : Loop;
    public var pre : Face;
    public var nxt : Face;
    public var srf : ISurface;

    public function new() {
    }
}
