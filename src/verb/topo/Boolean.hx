package verb.topo;

import verb.core.types.Exception;
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

import verb.topo.Split;

typedef BooleanSplitResult = {
    coincidentVertices : Array<Pair<Vertex,Vertex>>,
    coplanarVerticesOfA : Array<Pair<Vertex,Face>>,
    coplanarVerticesOfB : Array<Pair<Vertex,Face>>
}

typedef EdgeFacePosition = {
    edge : HalfEdge,
    pos : FacePosition
}

enum FacePosition {
    On;

    AonBp;
    AonBm;
    BonAp;
    BonAm;

    AoutB;
    AinB;
    BoutA;
    BinA;
}

enum BoolOp {
    Union;
    Subtract;
    Intersect;
}

@:expose("topo.Boolean")
class Boolean {

    public function union( a : Solid, b : Solid, tol : Float ){

        var s = split( a, b, tol );
        var cfa = classifyAllVertexFace( s.coplanarVerticesOfA, BoolOp.Union, true );
        var cfb = classifyAllVertexFace( s.coplanarVerticesOfB, BoolOp.Union, false );
        var cc = classifyAllVertexVertex( s.coincidentVertices, BoolOp.Union );
//      var parts = connect( cfa, cfb, cc );  // reconnect the two solids
//      categorize( parts, BoolOp.Union );  // from the various resultant parts  BinA, AinB, BoutA, etc, reconnect

    }

    public static function classifyAllVertexVertex( a : Array<Pair<Vertex,Vertex>>, op : BoolOp ){
        // in essence, this involves classifying the surrounding intersecting sectors of the vertices
        return null;
    }

    public static function classifyAllVertexFace( a : Array<Pair<Vertex,Face>>, op : BoolOp, isA : Bool ) : Array<Array<EdgeFacePosition>> {
        return [for (vf in a) classifyVertexFace( vf.item0, vf.item1, op, isA )];
    }

    public static function classifyVertexFace( v : Vertex, f : Face, op : BoolOp, isA : Bool ) : Array<EdgeFacePosition> {

        var p = planeFromFace(f);
        var ecs = new Array<EdgeFacePosition>();

        // 1. classify vertex edges based on opposite vertex's signed distance from the cutting plane
        for (e in v.halfEdges()){
            ecs.push({ edge: e, pos : asFacePosition(Split.classify(e, p), isA) });

            // for each edge, we also need to check the sector width - i.e. the angle
            // bisector between two adjacent edges. If more than 180, we bisect the edge
            if ( Split.wideSector(e) ){
                ecs.push({ edge: e, pos : asFacePosition(Split.classifyBisector(e, p), isA) });
            }
        }

        // 2. now, for each "on" edge, we need to determine if its face is aligned with the plane normal
        // if so,
        //      if aligned with plane normal (dot(fn, sp) > 0), AonBp else AonBm
        var el = ecs.length;
        for (i in 0...el){
            var ep = ecs[i];
            if (ep.pos == FacePosition.On){
                var nc = reclassifyCoplanarEdge(ep.edge, p, isA);
                ecs[i].pos = nc;
                ecs[(i+1) % el].pos = nc;
            }
        }

        // 3. now, go through all of the edges, search for ON edges, reclassify them based on the kind of op
        for (i in 0...el){
            var ep = ecs[i];
            var ei = Type.enumIndex( ep.pos );
            if (ei > 0 && ei < 5){
                ep.pos = reclassifyOnSector( ep.pos, op );
            }
        }

        return ecs;
    }

    public static function planeFromFace( f : Face ){
        return { o : f.l.e.v.pt, n : f.normal() };
    }

    private static function reclassifyCoplanarEdge( e : HalfEdge, p : Plane, isA : Bool ) : FacePosition {

        var n = e.l.f.normal(); // TODO: cache me

        var ndc = n.dot(p.n);

        var eps2 = Constants.EPSILON * Constants.EPSILON;

        // face and plane are aligned
        if ( Math.abs(ndc - 1.0) < eps2 ) {
            return isA ? FacePosition.AonBp : FacePosition.BonAp;
        }

        if ( Math.abs(ndc + 1.0) < eps2 ) {
            return isA ? FacePosition.AonBm : FacePosition.BonAm;
        }

        throw new Exception("Cannot categorize on edge!");  // TODO we need more positional information about the face

        return FacePosition.On;
    }

    private static function asFacePosition( pos : PlanePosition, isA : Bool ) : FacePosition {
        if (pos == PlanePosition.Above){
            return isA ? FacePosition.AoutB : FacePosition.BoutA;
        } else if (pos == PlanePosition.Below) {
            return isA ? FacePosition.AinB : FacePosition.BinA;
        }

        return FacePosition.On; // will need to be recategorized later
    }

    private static var boolOnSectorMap =
    [
        [ FacePosition.AoutB, FacePosition.AinB, FacePosition.BinA, FacePosition.BinA ],
        [ FacePosition.AinB, FacePosition.AoutB, FacePosition.BoutA, FacePosition.BoutA ],
        [ FacePosition.AinB, FacePosition.AoutB, FacePosition.BoutA, FacePosition.BoutA ]
    ];

    public static function reclassifyOnSector( c : FacePosition, op : BoolOp ) : FacePosition {
        return boolOnSectorMap[ Type.enumIndex(op) ][ Type.enumIndex(c) ];
    }

    public static function split( a : Solid, b : Solid, tol : Float ) : BooleanSplitResult {

        var va = splitAllEdges( a, b, tol );
        var vva = splitEdgesByVertices( a, b, tol );
        var vvb = splitEdgesByVertices( b, a, tol );
        var vfa = splitEdgesWithFaces( a, b, tol );
        var vfb = splitEdgesWithFaces( b, a, tol );

        return {
            coincidentVertices : getCoincidentVertices( a, b, va.concat(vva).concat(vvb), tol ),
            coplanarVerticesOfA : getCoplanarVertices( a, b, vfa, tol ),
            coplanarVerticesOfB : getCoplanarVertices( b, a, vfb, tol )
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
        var d = v.pt.distSquared( i.pt );

        // too far
        if ( d > tol*tol ) {
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
            for (f in b.f.iter()){
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
        if (r == null) {
            return null;
        }

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
