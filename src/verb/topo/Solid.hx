package verb.topo;

class Solid {

    public var v : Vertex;
    public var f : Face;

    function new() {

    }

    public static function mvfs() : Solid {
        var s = new Solid();
        s.addFace().addLoop( s.addVertex() );

        return s;
    }

    public function addFace() : Face {
        var nf = new Face();

        if (f != null){
            f.prev = nf;
            nf.next = f;
        }

        return f = nf;
    }

    public function addVertex(pt) : Vertex {
        var nv = new Vertex(pt);

        if (v != null){
            v.prev = nv;
            nv.next = v;
        }

        return v = nv;
    }
}
