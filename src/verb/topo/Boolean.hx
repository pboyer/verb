package verb.topo;

import verb.core.Vec;
import verb.core.Constants;
import verb.core.Intersect;
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

    public function union( a : Solid, b : Solid, tol : Float ){

        var s = split( a, b );
        var cfa = vertexFaceClassify( s.coplanarVerticesA );
        var cfb = vertexFaceClassify( s.coplanarVerticesB );
        var cc = vertexVertexClassification( s.coincidentVertices );

    }

    public static function vertexFaceClassify( a : Array<Pair<Vertex,Face>> ) : Array<VertexFaceClass> {
        return null;
    }

    public static function vertexVertexClassification( a : Array<Pair<Vertex,Vertex>> ) : Array<VertexVertexClass>{
        return null;
    }

    public static function split( a : Solid, b : Solid, tol : Float ) : BooleanSplitResult {

        var va = splitAllEdges( a, b, tol );
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

    // find the intersecting edges of the two solids and split them
    public static function splitAllEdges( a : Solid, b : Solid, tol : Float ) : Array<Pair<Vertex,Vertex>> {
        var c = new Array<Pair<Vertex,Vertex>>();

        // TODO spatial partition
        for (e0 in a.edges()){
            for (e1 in b.edges()){
                var a = splitEdges(e0.item0, e1.item0);
                if (a == null) continue;
                c.push( a );
            }
        }

        return c;
    }

    public static function splitEdges( a : HalfEdge, b : HalfEdge, tol : Float ) : Pair<Vertex, Vertex> {

        // segments( a0 : Point, a1 : Point, b0 : Point, b1 : Point, tol : Float ) : CurveCurveIntersection
        var i = verb.core.Intersect.segments( a.v.pt, a.nxt.v.pt, b.v.pt, b.nxt.v.pt, tol  );

        // no intersection
        if (i == null) {
            return null;
        }

        // if the intersection is on a vertex, ignore
        if ( i.u0 > 1.0 - Constants.EPSILON || i.u0 < Constants.EPSILON ||
             i.u1 > 1.0 - Constants.EPSILON || i.u1 < Constants.EPSILON ){
            return null;
        }

        return new Pair<Vertex,Vertex>( splitEdge(a, i.point0), splitEdge(b, i.point1) );
    }

    private static function splitEdge( e : HalfEdge, pt : Point ) : Vertex {
        var s = e.l.f.s;
        return s.lmev( e, e.opp.nxt, pt );
    }

    // determine if a point is within a face of a solid
    public static function isPointInFace( pt : Point, f : Face ) : Bool {
        return false;
    }

    // find the edges of a that intersect with the vertices of b and intersect them
    public static function splitEdgesByVertices( a : Solid, b : Solid ) : Array<Pair<Vertex,Vertex>> {
        return null;
    }

    // get the vertex pairs that are coincident between a and b, third argument is pair we already know are coincident
    public static function getCoincidentVertices( a : Solid, b : Solid, v : Array<Pair<Vertex,Vertex>> ) : Array<Pair<Vertex,Vertex>> {
        return null;
    }

    // split the edges of a that intersect faces of b
    public static function splitEdgesWithFaces( a : Solid, b : Solid ) : Array<Pair<Vertex, Face>> {
        return null;
    }

    // find the vertices of a that are coplanar with a face of b, third argument is vertices we already know are coplanar
    public static function getCoplanarVertices( a : Solid, b : Solid, v : Array<Pair<Vertex, Face>> ) : Array<Pair<Vertex,Face>> {
        return null;
    }

}
