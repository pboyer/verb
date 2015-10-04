package verb.topo;
import verb.core.Trig;
import verb.core.Intersect;
import verb.core.Vec;
using verb.core.Vec;
import verb.core.Ray;

import verb.core.DoublyLinkedListExtensions;
using verb.core.DoublyLinkedListExtensions;

class RayCast {

    //TODO : slow as shit
    public static function raycast(s : Solid, ray : Ray, tol : Float = 0.001) : RayCastResult {

        var s0 = ray.origin;
        var s1 = Vec.add( ray.origin, Vec.mul(1.0e6, ray.dir) );

        var d = Math.POSITIVE_INFINITY;
        var ct = RayCastResultKind.None;
        var ce : HalfEdge = null;
        var cv : Vertex = null;
        var cf : Face = null;

        for (e in s.edges()){
            var r = Intersect.segments( e.item0.v.pt, e.item0.nxt.v.pt, s0, s1, tol );
            if (r == null) continue;

            var cd = Vec.distSquared(r.point1, ray.origin);
            if (r.u1 > 0.0 && cd < d ){
                ct = RayCastResultKind.HalfEdge;
                d = cd;
            }
        }

        for (v in s.v.iter()){
            var r = Trig.rayClosestPoint( v.pt, ray.origin, ray.dir );
            if (Vec.distSquared(r, v.pt) > tol) continue;

            var cd = Vec.distSquared(r, ray.origin);
            if (cd < d && ray.dir.dot(Vec.sub( r, ray.origin )) > 0.0){
                ct = RayCastResultKind.Vertex;
                d = cd;
            }
        }

        for (f in s.faces()){

        }

        return {
            distance: d,
            kind : ct,
            edge : ce,
            face : cf,
            vertex : cv
        };
    }
}

enum RayCastResultKind {
    None; HalfEdge; Vertex;  //Face;
}

typedef RayCastResult = {
distance : Float,
kind : RayCastResultKind,
edge : HalfEdge,
face : Face,
vertex : Vertex
}
