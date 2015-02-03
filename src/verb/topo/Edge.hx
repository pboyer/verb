package verb.topo;

// TODO

import verb.geom.ICurve;

class Edge {

    public var l : Loop;
    public var o : Edge;
    public var pre : Edge;
    public var nxt : Edge;
    public var v : Vertex;
    public var crv : ICurve;

    public function new() {
    }
}
