package verb.core;

import verb.core.types.MeshData.Tri;
import verb.core.types.CurveData.Point;

@:expose("core.TriangleSegmentIntersection")
class TriangleSegmentIntersection {

    // where the intersection took place
    public var point : Point;
    // the u param where u is the axis from v0 to v1
    public var s : Float;
    // the v param where v is the axis from v0 to v2
    public var t : Float;
    // the parameter along the segment
    public var p : Float;

    public function new(point, s, t, r){
        this.point = point;
        this.s = s;
        this.t = t;
        this.p = r;
    }

}

@:expose("core.Intersect")
class Intersect {

    //
    //  Intersect segment with triangle (from http://geomalgorithms.com/a06-_intersect-2.html)
    //
    // **params**
    // + array of length 3 representing first point of the segment
    // + array of length 3 representing second point of the segment
    // + array of length 3 arrays representing the points of the triangle
    // + array of length 3 containing int indices in the array of points, this allows passing a full mesh
    //
    // **returns**
    // + a TriangleSegmentIntersection or null if failed
    //

    public static function segment_with_tri( p0 : Point, p1 : Point, points : Array<Point>, tri : Tri ) : TriangleSegmentIntersection {

        var v0 = points[ tri[0] ]
        , v1 = points[ tri[1] ]
        , v2 = points[ tri[2] ]
        , u = Vec.sub( v1, v0 )
        , v = Vec.sub( v2, v0 )
        , n = Vec.cross( u, v );

        var dir = Vec.sub( p1, p0 )
        , w0 = Vec.sub( p0, v0 )
        , a = -Vec.dot( n, w0 )
        , b = Vec.dot( n, dir );

        // is ray is parallel to triangle plane?
        if ( Math.abs( b ) < Constants.EPSILON ){
            return null;
        }

        var r = a / b;

        // segment goes away from triangle or is beyond segment
        if ( r < 0 || r > 1 ){
            return null;
        }

        // get proposed intersection
        var pt = Vec.add( p0, Vec.mul( r, dir ) );

        // is I inside T?
        var uv = Vec.dot(u,v)
        , uu = Vec.dot(u,u)
        , vv = Vec.dot(v,v)
        , w = Vec.sub( pt, v0 )
        , wu = Vec.dot( w, u )
        , wv = Vec.dot( w, v )
        , denom = uv * uv - uu * vv;

        if (Math.abs(denom) < Constants.EPSILON){
            return null;
        }

        var s = ( uv * wv - vv * wu ) / denom
        , t = ( uv * wu - uu * wv ) / denom;

        if (s > 1.0 + Constants.EPSILON || t > 1.0 + Constants.EPSILON || t < -Constants.EPSILON || s < -Constants.EPSILON || s + t > 1.0 + Constants.EPSILON){
            return null;
        }

        return new TriangleSegmentIntersection(pt, s, t, r );

    }
    //
    //  Intersect ray/segment with plane (from http://geomalgorithms.com/a06-_intersect-2.html)
    //
    //  If intersecting a ray, the param needs to be between 0 and 1 and the caller is responsible
    //  for making that check
    //
    // **params**
    // + array of length 3 representing first point of the segment
    // + array of length 3 representing second point of the segment
    // + array of length 3 representing an origin point on the plane
    // + array of length 3 representing the normal of the plane
    //
    // **returns**
    // null or an object with a p property representing the param on the segment
    //

    public static function segment_with_plane( p0 : Point, p1 : Point, v0 : Point, n : Point ) {

        var denom = Vec.dot( n, Vec.sub(p0,p1) );

        // parallel case
        if ( Math.abs( denom ) < Constants.EPSILON ) {
            return null;
        }

        var numer = Vec.dot( n, Vec.sub(v0,p0) );

        return { p: numer / denom };

    }

    //
    // Find the closest parameter on two rays, see http://geomalgorithms.com/a07-_distance.html
    //
    // **params**
    // + origin for ray 1
    // + direction of ray 1, assumed normalized
    // + origin for ray 1
    // + direction of ray 1, assumed normalized
    //
    // **returns**
    // + a 2d array specifying the intersections on u params of intersections on curve 1 and curve 2
    //

    public static function rays( a0 : Point, a : Point, b0 : Point, b : Point ) : Array<Float> {

        var dab = Vec.dot( a, b ),
        dab0 = Vec.dot( a, b0 ),
        daa0 = Vec.dot( a, a0 ),
        dbb0 = Vec.dot( b, b0 ),
        dba0 = Vec.dot( b, a0 ),
        daa = Vec.dot( a, a ),
        dbb = Vec.dot( b, b ),
        div = daa*dbb - dab*dab;

        // parallel case
        if ( Math.abs( div ) < Constants.EPSILON ) {
            return null;
        }

        var num = dab * (dab0-daa0) - daa * (dbb0-dba0),
        w = num / div,
        t = (dab0 - daa0 + w * dab)/daa;

        return [t, w];

    }

}

