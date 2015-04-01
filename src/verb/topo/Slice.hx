package verb.topo;

import verb.topo.Slice.SectorClass;
import verb.core.types.Exception;
import haxe.ds.IntMap;
import verb.core.Constants;
import verb.core.Vec;
using verb.core.Vec;
import verb.core.types.NurbsCurveData.Point;
import verb.core.types.Pair;
import verb.core.Intersect;

typedef Plane = {
    n : Array<Float>,
    o : Array<Float>
}

typedef SectorClass = {
    edge : HalfEdge,
    cl : VertexClass
}

enum VertexClass { On; Above; Below; }

@:expose("topo.Slice")
class Slice {

    public static function slice( s : Solid, p : Plane ) : Pair<Solid,Solid> {

        // intersect
        var r = intersect(s, p);

        // identify crossing edges and coplanar vertices
        var vs : IntMap<Vertex> = new IntMap<Vertex>();
        for (ir in r){
            if ( isCrossingEdge(ir.item1) ){
                var nhe = splitEdge(ir.item0, ir.item1);
                vs.set( nhe.v.id, nhe.v );
            } else {
                var v = ir.item0.v;
                if (!vs.exists(v.id)){ vs.set(v.id, v); }
            }
        }

        // now we need to classify the edges emanating
        // from our coplanar vertices
        var ecs : Array<SectorClass> = new Array<SectorClass>();

            // 1. classify vertex edges based on opposite vertex's signed distance from the cutting plane
            for (v in vs.iterator()){
                for (e in v.halfEdges()){
                    ecs.push({ edge: e, cl : classify(e, p) });

                    // for each edge, we also need to check the sector width - i.e. the angle
                    // bisector between two adjacent edges if more than 180, we bisect the edge
                    if ( wideSector(e) ){
                        ecs.push({ edge: e, cl : classifyBisector(e) });
                    }
                }
            }

            // 2. now, for each "on" edge, we need to determine its face - is this face aligned with the plane normal?
            // if so,
            //      if aligned with plane normal (dot(fn, sp) > 0), BELOW, along with the next edge
            //      else ABOVE
            var el = ecs.length;
            for (i in 0...el){
                var ep = ecs[i];
                if (ep.cl == VertexClass.On){
                    var nc = reclassifyCoplanarSector(ep.edge, p);
                    ecs[i].cl = nc;
                    ecs[i+1 % el].cl = nc;
                }
            }

            // 3. now, go through all of the edges, search for ON edges, reclassify them based on rules on pg 245
            var el = ecs.length;
            for (i in 0...el){
                var ep = ecs[i];
                if (ep.cl == VertexClass.On){
                    var prv = ecs[i-1 % el].cl;
                    var nxt = ecs[i+1 % el].cl;

                    // TODO: this could be simplified but let's keep for debugging purposes
                    if ( prv == VertexClass.Above && nxt == VertexClass.Above ){
                        ep.cl = VertexClass.Below;
                    } else if ( prv == VertexClass.Below && nxt == VertexClass.Above ) {
                        ep.cl = VertexClass.Below;
                    } else if ( prv == VertexClass.Above && nxt == VertexClass.Below ) {
                        ep.cl = VertexClass.Below;
                    } else if ( prv == VertexClass.Below && nxt == VertexClass.Below ) {
                        ep.cl = VertexClass.Above;
                    } else {
                        throw new Exception("Double On edge encountered!");
                    }
                }
            }

        return null;
    }

    // TODO
    private static function wideSector ( e : HalfEdge ) : Bool {
        return false;
    }

    // TODO
    private static function classifyBisector( e : HalfEdge ) : VertexClass {
        return VertexClass.On;
    }

    // TODO
    private static function reclassifyCoplanarSector( e : HalfEdge, p : Plane ) : VertexClass {
        var n = e.l.f.normal(); // TODO: cache me

        var c = n.cross(p.n);

        if ( c.dot(c) > Constants.EPSILON * Constants.EPSILON ) return VertexClass.On;

        return null;

    }

    private static function classify(e : HalfEdge, p : Plane) : VertexClass {

        // project the edge end onto the plane normal
        var pt : Array<Float> = e.nxt.v.pt;
        var s = pt.sub( p.o ).dot( p.n );

        if (Math.abs(s) < Constants.EPSILON) return VertexClass.On;

        if (s > 0.0) return VertexClass.Above else return VertexClass.Below;

    }

    private static function intersect( s : Solid, p : Plane ) : Array<Pair<HalfEdge,Float>> {
        var is = [];
        for (e in s.edges()){
            var he : HalfEdge = e.item0;
            var r = verb.core.Intersect.segmentAndPlane(he.v.pt, he.nxt.v.pt, p.o, p.n );
            if (r == null) continue;
            is.push( new Pair(he, r.p) );
        }
        return is;
    }

    public static function splitEdge( e : HalfEdge, p : Float ) : HalfEdge {
        var s = e.l.f.s;

        // given the intersecting halfedge, is there a way to use the euler operators?
        var pt0 = pointOnHalfEdge( e, p );
        var pt1 = pt0.copy();

        // insert a coincident vertices along the HalfEdge
        var nv = s.lmev( e, e.opp.nxt, pt0 );

        return nv.e;
    }

    private static function isCrossingEdge( p : Float ){
        return p < 1.0 - Constants.EPSILON || p > Constants.EPSILON;
    }

    private static function pointOnHalfEdge( e : HalfEdge, p : Float ) : Point {
        return Vec.lerp( p, e.v.pt, e.nxt.v.pt );
    }

    public static function intersectionPoints( s : Solid, p : Plane ) : Array<Point> {
        return [ for (i in intersect(s,p)) pointOnHalfEdge( i.item0, i.item1 ) ];
    }
}


