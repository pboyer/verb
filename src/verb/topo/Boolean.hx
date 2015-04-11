package verb.topo;

import verb.core.types.NurbsCurveData.Point;
import verb.core.types.Pair;

typedef BooleanSplitResult = {
    coincidentVertices : Array<Pair<Vertex,Vertex>>,
    coplanarVerticesA : Array<Pair<Vertex,Face>>,
    coplanarVerticesB : Array<Pair<Vertex,Face>>
}

enum VertexFaceClass { Above; Below; }
enum VertexVertexClass { Above; Below; }

@:expose("topo.Boolean")
class Boolean {

    public function union( a : Solid, b : Solid ){

        var s = split( a, b );
        var cfa = vertexFaceClassify( s.coplanarVerticesA );
        var cfb = vertexFaceClassify( s.coplanarVerticesB );
        var cc = vertexVertexClassification( s.coincidentVertices );



    }

    public function vertexFaceClassify( a : Array<Pair<Vertex,Face>> ) : Array<VertexFaceClass> {
        return null;
    }

    public function vertexVertexClassification( a : Array<Pair<Vertex,Vertex>> ) : Array<VertexVertexClass>{
        return null;
    }

    public function split( a : Solid, b : Solid ) : BooleanSplitResult {

        var va = splitEdges( a, b );
        var vva = splitEdgesByVertices( a, b );
        var vvb = splitEdgesByVertices( b, a );
        var cov = getCoincidentVertices( a, b, va.concat(vva).concat(vvb));
        var vfa = splitEdgesWithFaces( a, b );
        var vfb = splitEdgesWithFaces( b, a );
        var cpva = getCoplanarVertices( a, b, vfa );
        var cpvb = getCoplanarVertices( b, a, vfb );

        return {
            coincidentVertices : cov,
            coplanarVerticesA : cpva,
            coplanarVerticesB : cpvb
        };
    }

    // determine if a point is within a face of a solid
    public function isPointInFace( pt : Point, f : Face ) : Bool {
        return false;
    }

    // find the intersecting edges of the two solids and split them
    public function splitEdges( a : Solid, b : Solid ) : Array<Pair<Vertex,Vertex>> {
        return null;
    }

    // find the edges of a that intersect with the vertices of b and intersect them
    public function splitEdgesByVertices( a : Solid, b : Solid ) : Array<Pair<Vertex,Vertex>> {
        return null;
    }

    // get the vertex pairs that are coincident between a and b, third argument is pair we already know are coincident
    public function getCoincidentVertices( a : Solid, b : Solid, v : Array<Pair<Vertex,Vertex>> ) : Array<Pair<Vertex,Vertex>> {
        return null;
    }

    // split the edges of a that intersect faces of b
    public function splitEdgesWithFaces( a : Solid, b : Solid ) : Array<Pair<Vertex, Face>> {
        return null;
    }

    // find the vertices of a that are coplanar with a face of b, third argument is vertices we already know are coplanar
    public function getCoplanarVertices( a : Solid, b : Solid, v : Array<Pair<Vertex, Face>> ) : Array<Pair<Vertex,Face>> {
        return null;
    }

}
