package verb.topo;
class Loop {

    public var face : Face;
    public var edge : Edge;
    public var pre : Loop;
    public var nxt : Loop;

    public function new(face : Face, vertex : Vertex = null) {
        this.face = face;

        if (vertex != null){

            edge = new Edge();

            edge.v = vertex;
            edge.next = edge;
            edge.prev = edge;
        }
    }

}
