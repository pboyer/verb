package verb.topo;

// TODO

import verb.geom.ISurface;

class Face {

    public var solid : Solid;
    public var loop : Loop;
    public var prev : Face;
    public var next : Face;
    public var srf : ISurface;

    public function new(solid) {
        this.solid = solid;
    }

    public function addLoop(vertex : Vertex = null){
        var nl = new Loop(this, vertex);

        if (loop != null){
            loop.pre = nl;
            nl.nxt = loop;
        }

        return loop = nl;
    }
}
