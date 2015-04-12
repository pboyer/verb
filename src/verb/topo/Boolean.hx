package verb.topo;

import haxe.ds.IntMap;
import verb.core.Trig;
import verb.topo.Split.Plane;
import verb.core.Vec;
using verb.core.Vec;

import verb.core.Constants;
import verb.core.Intersect;
import verb.core.types.NurbsCurveData.Point;
import verb.core.types.Pair;

import verb.core.types.IDoublyLinkedList;
import verb.core.types.DoublyLinkedListExtensions;
using verb.core.types.DoublyLinkedListExtensions;

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

        var s = split( a, b, tol );
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
        var vva = splitEdgesByVertices( a, b, tol );
        var vvb = splitEdgesByVertices( b, a, tol );
        var cov = getCoincidentVertices( a, b, va.concat(vva).concat(vvb), tol );
        var vfa = splitEdgesWithFaces( a, b, tol );
        var vfb = splitEdgesWithFaces( b, a, tol );
        var cpva = getCoplanarVertices( a, b, vfa, tol );
        var cpvb = getCoplanarVertices( b, a, vfb, tol );

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
                var a = splitEdges(e0.item0, e1.item0, tol);
                if (a == null) continue;
                c.push( a );
            }
        }

        return c;
    }

    public static function splitEdges( a : HalfEdge, b : HalfEdge, tol : Float ) : Pair<Vertex, Vertex> {

        var i = verb.core.Intersect.segments( a.v.pt, a.nxt.v.pt, b.v.pt, b.nxt.v.pt, tol  );

        // no intersection
        if (i == null) {
            return null;
        }

        // if the intersection is on a vertex, ignore it
        if ( i.u0 > 1.0 - Constants.EPSILON || i.u0 < Constants.EPSILON ||
             i.u1 > 1.0 - Constants.EPSILON || i.u1 < Constants.EPSILON ){
            return null;
        }

        return new Pair<Vertex,Vertex>( splitEdge(a, i.point0), splitEdge(b, i.point1) );
    }

    private static function splitEdgeByVertex( e : HalfEdge, v : Vertex, tol : Float ) : Vertex {

        var i = Trig.segmentClosestPoint( v.pt, e.v.pt, e.nxt.v.pt, 0.0, 1.0 );

        // too far
        if (v.pt.dist( i.pt ) < tol) {
            return null;
        }

        // if the intersection is on a vertex, ignore it
        if ( i.u > 1.0 - Constants.EPSILON || i.u < Constants.EPSILON ){
            return null;
        }

        return splitEdge( e, i.pt );
    }

    private static function splitEdge( e : HalfEdge, pt : Point ) : Vertex {
        var s = e.l.f.s;
        return s.lmev( e, e.opp.nxt, pt );
    }

    // determine if a point is within a face of a solid
    // TODO test
    public static function isPointInFace( pt : Point, f : Face, tol : Float ) : Bool {

        var n = f.normal();
        var o = f.l.e.v.pt;

        if ( !Trig.isPointInPlane(pt, { n : n, o : o}, tol) ) return false;

        var iol = isPointInPolygon( pt, f.ol.points(), n );
        if (!iol) return iol;

        for (il in f.rings()) {
            if ( isPointInPolygon(pt, il.points(), n) ) return false;
        }

        return true;
    }

    // determine if a point is within a polygon
    public static function isPointInPolygon( pt : Point, pts : Array<Point>, n : Array<Float> ) : Bool {
        var ptsl = pts.length;
        var a = 0.0;

        for ( i in 0...ptsl ){
            var v0 = pts[i].sub( pt );
            var v1 = pts[(i+1) % ptsl].sub( pt );

            a += Vec.signedAngleBetween2( v0, v1, n );
        }

        return Math.abs(a) > Math.PI;
    }

    // find the edges of a that intersect with the vertices of b and intersect them
    public static function splitEdgesByVertices( a : Solid, b : Solid, tol : Float ) : Array<Pair<Vertex,Vertex>> {
        var c = new Array<Pair<Vertex,Vertex>>();

        // TODO spatial partition
        for (e in a.edges()){
            for (v in b.v.iter()){
                var a = splitEdgeByVertex(e.item0, v, tol);
                if (a == null) continue;
                c.push( new Pair(a,v));
            }
        }

        return c;
    }

    // get the vertex pairs that are coincident between a and b, third argument is array of pairs we already know are coincident
    public static function getCoincidentVertices( a : Solid, b : Solid, v : Array<Pair<Vertex,Vertex>>, tol : Float ) : Array<Pair<Vertex,Vertex>> {

        // prevent formation of duplicates
        var m = new IntMap<Vertex>();

        for (p in v){
            m.set( p.item0.id, p.item0 );
            m.set( p.item1.id, p.item1 );
        }

        var tol2 = tol * tol;

        for ( v0 in a.v.iter() ){
            if (m.exists(v0.id)) continue;
            for ( v1 in b.v.iter() ){
                if (m.exists(v1.id)) continue;

                if (v0.pt.distSquared(v1.pt) < tol2){
                    v.push( new Pair(v0, v1) );
                }
            }
        }

        return v;
    }

    // split the edges of a that intersect faces of b
    public static function splitEdgesWithFaces( a : Solid, b : Solid, tol : Float ) : Array<Pair<Vertex, Face>> {
        var v = new Array<Pair<Vertex, Face>>();

        for (e in a.edges()){
            for (f in a.f.iter()){
                var r = splitEdgeWithFace( e.item0, f, tol );
                if (r == null) continue;
                v.push( new Pair(r, f) );
            }
        }

        return v;
    }

    public static function splitEdgeWithFace( he : HalfEdge, f : Face, tol : Float ) : Vertex {
        var n = f.normal();
        var o = f.ol.e.v.pt;

        var r = verb.core.Intersect.segmentAndPlane(he.v.pt, he.nxt.v.pt, o, n );

        // no intersection
        if (r == null) return null;

        // on vertex
        if ( r.p > 1.0 - Constants.EPSILON || r.p < Constants.EPSILON ){
            return null;
        }

        // get the actual intersection point
        var pt = Vec.lerp( r.p, he.nxt.v.pt, he.v.pt );

        if (!isPointInFace( pt, f, tol )){
            return null;
        }

        return splitEdge( he, pt );
    }

    // find the vertices of a that are coplanar with a face of b, third argument is vertices we already know are coplanar
    public static function getCoplanarVertices( a : Solid, b : Solid, ar : Array<Pair<Vertex, Face>>, tol : Float ) : Array<Pair<Vertex,Face>> {

        // prevent formation of duplicates
        var m = new IntMap<Vertex>();

        for (p in ar){
            m.set( p.item0.id, p.item0 );
        }

        for ( v in a.v.iter() ){

            if (m.exists(v.id)) continue;

            for ( f in b.f.iter() ){

                if (isPointInFace( v.pt, f, tol )){
                    ar.push( new Pair(v, f) );
                }
            }
        }

        return ar;
    }

}
