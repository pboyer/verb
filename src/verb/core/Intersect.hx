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

@:expose("core.CurveCurveIntersection")
class CurveCurveIntersection {

    // where the intersection took place
    public var point0 : Point;

    // where the intersection took place on the second curve
    public var point1 : Point;

    // the parameter on the first curve
    public var u0 : Float;

    // the parameter on the second curve
    public var u1 : Float;

    public function new(point0, point1, u0, u1){
        this.point0 = point0;
        this.point1 = point1;
        this.u0 = u0;
        this.u1 = u1;
    }

}

@:expose("core.Intersect")
class Intersect {

    //
    // Intersect two polyline curves, keeping track of parameterization on each
    //
    // **params**
    // + array of point values for curve 1
    // + array of point values for curve 2
    // + array of parameter values for curve 1, same length as first arg
    // + array of parameter values for curve 2, same length as third arg
    // + tolerance for the intersection
    //
    // **returns**
    // + array of parameter pairs representing the intersection of the two parameteric polylines
    //

    public static function parametric_polylines_by_aabb( points0 : Array<Point>,
                                                         points1 : Array<Point>,
                                                         params0 : Array<Float>,
                                                         params1 : Array<Float>,
                                                         tol : Float ) : Array<CurveCurveIntersection> {

        var bb1 = new verb.BoundingBox(points0)
        , bb2 = new verb.BoundingBox(points1);

        if ( !bb1.intersects(bb2, tol) ) {
            return [];
        }

        if (points0.length == 2 && points1.length == 2 ){

            var inter = Intersect.segments(points0[0],points0[1], points1[0], points1[1], tol);

            if ( inter != null ){
                // map the parameters of the segment to the parametric space of the entire polyline
                inter.u0 = inter.u0 * ( params0[1]-params0[0] ) + params0[0];
                inter.u1 = inter.u1 * ( params1[1]-params1[0] ) + params1[0];

                return [ inter ];
            }

        } else if (points0.length == 2) {

            var p2_mid = Math.ceil( points1.length / 2 ),
            p2_a = points1.slice( 0, p2_mid ),
            p2_b = points1.slice( p2_mid-1 ),
            u2_a = params1.slice( 0, p2_mid ),
            u2_b = params1.slice( p2_mid-1 );

            return 	 Intersect.parametric_polylines_by_aabb(points0, p2_a, params0, u2_a, tol)
            .concat( Intersect.parametric_polylines_by_aabb(points0, p2_b, params0, u2_b, tol) );

        } else if (points1.length == 2) {

            var p1_mid = Math.ceil( points0.length / 2 ),
            p1_a = points0.slice( 0, p1_mid ),
            p1_b = points0.slice( p1_mid-1 ),
            u1_a = params0.slice( 0, p1_mid ),
            u1_b = params0.slice( p1_mid-1 );

            return 		 Intersect.parametric_polylines_by_aabb(p1_a, points1, u1_a, params1, tol)
            .concat( Intersect.parametric_polylines_by_aabb(p1_b, points1, u1_b, params1, tol) );

        } else {

            var p1_mid = Math.ceil( points0.length / 2 ),
            p1_a = points0.slice( 0, p1_mid ),
            p1_b = points0.slice( p1_mid-1 ),
            u1_a = params0.slice( 0, p1_mid ),
            u1_b = params0.slice( p1_mid-1 ),

            p2_mid = Math.ceil( points1.length / 2 ),
            p2_a = points1.slice( 0, p2_mid ),
            p2_b = points1.slice( p2_mid-1 ),
            u2_a = params1.slice( 0, p2_mid ),
            u2_b = params1.slice( p2_mid-1 );

            return 		 Intersect.parametric_polylines_by_aabb(p1_a, p2_a, u1_a, u2_a, tol)
            .concat( Intersect.parametric_polylines_by_aabb(p1_a, p2_b, u1_a, u2_b, tol) )
            .concat( Intersect.parametric_polylines_by_aabb(p1_b, p2_a, u1_b, u2_a, tol) )
            .concat( Intersect.parametric_polylines_by_aabb(p1_b, p2_b, u1_b, u2_b, tol) );

        }

        return [];

    }

    //
    // Find the closest parameter on two rays, see http://geomalgorithms.com/a07-_distance.html
    //
    // **params**
    // + first end of the first segment
    // + second end of the first segment
    // + first end of the second segment
    // + second end of the second segment
    // + tolerance for the intersection
    //
    // **returns**
    // + a CurveCurveIntersection object
    //

    public static function segments( a0 : Point, a1 : Point, b0 : Point, b1 : Point, tol : Float ) : CurveCurveIntersection {

        var a1ma0 = Vec.sub(a1, a0),
            aN = Math.sqrt( Vec.dot(a1ma0, a1ma0) ),
            a = Vec.mul( 1/ aN, a1ma0 ),
            b1mb0 = Vec.sub(b1, b0),
            bN = Math.sqrt( Vec.dot(b1mb0, b1mb0) ),
            b = Vec.mul( 1 / bN, b1mb0 ),
            int_params = Intersect.rays(a0, a, b0, b);

        if ( int_params != null ) {

            var u0 = Math.min( Math.max( 0, int_params.u0 / aN ), 1.0),
                u1 = Math.min( Math.max( 0, int_params.u1 / bN ), 1.0),
                point0 = Vec.onLine( a0, a1ma0, u0 ),
                point1 = Vec.onLine( b0, b1mb0, u1 ),
                dist = Vec.distSquared(point0, point1);

            if (  dist < tol*tol ) {
                return new CurveCurveIntersection( point0, point1, u0, u1 );
            }
        }

        return null;
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
    // + a CurveCurveIntersection object
    //

    public static function rays( a0 : Point, a : Point, b0 : Point, b : Point ) : CurveCurveIntersection {

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

        var p0 = Vec.onLine( a0, a, t );
        var p1 = Vec.onLine( b0, b, w );

        return new CurveCurveIntersection( p0, p1, t, w );
    }


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

}

