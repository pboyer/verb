package verb.core;

import verb.core.Intersect.TriTriPoint;
import verb.core.types.Pair;
import verb.core.Mat.Vector;
import verb.core.types.MeshData;
import verb.core.types.CurveData;

@:expose("core.Ray")
class Ray {
    public var origin : Point;
    public var dir : Vector;

    public function new(origin : Point, dir : Vector){
        this.origin = origin;
        this.dir = dir;
    }
}

@:expose("core.Interval")
class Interval<T> {

    public var min : T;
    public var max : T;

    public function new(min, max){
        this.min = min;
        this.max = max;
    }
}

@:expose("core.CurveTriPoint")
class CurveTriPoint {
    public var u : Float;
    public var uv : UV;
    public var point : Point;

    public function new(u : Float, point : Point, uv : UV){
        this.u = u;
        this.point = point;
        this.uv = uv;
    }
}

@:expose("core.TriTriPoint")
class TriTriPoint {
    public var uv0 : UV;
    public var uv1 : UV;
    public var point : Point;

    public function new(uv0, uv1, point){
        this.uv0 = uv0;
        this.uv1 = uv1;
        this.point = point;
    }
}

@:expose("core.TriSegmentIntersection")
class TriSegmentIntersection {

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
    // Approximate the intersection of two NURBS curves by axis-aligned bounding box intersection.
    //
    // **params**
    // + CurveData object representing the first NURBS curve
    // + CurveData object representing the second NURBS curve
    // + tolerance for the inital polygonization of the curves
    // + tolerance for the intersection
    //
    // **returns**
    // + array of parameter pairs representing the intersection of the two parameteric polylines
    //

    public static function rational_curves_by_aabb( crv1 : CurveData,
                                                    crv2 : CurveData,
                                                    sample_tol : Float,
                                                    tol : Float ) : Array<CurveCurveIntersection> {

        var up1 = Tess.rational_curve_adaptive_sample( crv1, sample_tol, true)
        , up2 = Tess.rational_curve_adaptive_sample( crv2, sample_tol, true)
        , u1 = up1.map( function(el : Point) { return el[0]; })
        , u2 = up2.map( function(el : Point) { return el[0]; })
        , p1 = up1.map( function(el : Point) { return el.slice(1); })
        , p2 = up2.map( function(el : Point) { return el.slice(1); });

        return Intersect.parametric_polylines_by_aabb( p1, p2, u1, u2, tol );

    }

    //
    // Intersect two triangles
    //
    // **params**
    // + array of length 3 arrays of numbers representing the points of mesh1
    // + array of length 3 arrays of number representing the triangles of mesh1
    // + array of length 3 arrays of numbers representing the points of mesh2
    // + array of length 3 arrays of number representing the triangles of mesh2
    //
    // **returns**
    // + a point represented by an array of length (dim)
    //

    public static function triangles( mesh0 : MeshData, tri0 : Tri, mesh1 : MeshData, tri1 : Tri ) : Interval<TriTriPoint>{

        // 0) get the plane rep of the two triangles
        var n0 = Mesh.get_tri_norm( mesh0.points, tri0 );
        var n1 = Mesh.get_tri_norm( mesh1.points, tri1 );
        var o0 = mesh0.points[ tri0[0] ];
        var o1 = mesh1.points[ tri1[0] ];

        // 1) intersect with planes to yield ray of intersection
        var ray = Intersect.planes(o0, n0, o1, n1);
        if (ray == null) return null;

        // 2) clip the ray within tri0
        var clip1 = clip_ray_in_coplanar_tri( ray, mesh0, tri0 );
        if (clip1 == null) return null;

        // 3) clip the ray within tri1
        var clip2 = clip_ray_in_coplanar_tri( ray, mesh1, tri1 );
        if (clip2 == null) return null;

        // 4) find the interval that overlaps
        var merged = merge_tri_clip_intervals(clip1, clip2, mesh0, tri0, mesh1, tri1 );
        if (merged == null) return null;

        return return new Interval<TriTriPoint>(    new TriTriPoint(merged.min.uv0, merged.min.uv1, merged.min.point ),
                                                    new TriTriPoint(merged.max.uv0, merged.max.uv1, merged.max.point ));

    }

    public static function clip_ray_in_coplanar_tri(ray : Ray, mesh : MeshData, tri : Tri ) : Interval<CurveTriPoint> {

        // 0) construct rays for each edge of the triangle
        var o = [ mesh.points[ tri[0] ], mesh.points[ tri[1] ], mesh.points[ tri[2] ] ]
        , uvs = [ mesh.uvs[ tri[0] ], mesh.uvs[ tri[1] ], mesh.uvs[ tri[2] ] ]
        , uvd = [ Vec.sub(uvs[1], uvs[0]), Vec.sub(uvs[2], uvs[1]), Vec.sub(uvs[0], uvs[2]) ]
        , s = [ Vec.sub( o[1], o[0] ), Vec.sub( o[2], o[1] ), Vec.sub( o[0], o[2] ) ]
        , d = s.map( Vec.normalized )
        , l = s.map( Vec.norm );

        // 1) for each tri ray, if intersects and in segment interval, store minU, maxU
        var minU : CurveTriPoint = null;
        var maxU : CurveTriPoint = null;

        // need to clip in order to maximize the width of the intervals
        for (i in 0...3){
            var o0 = o[i];
            var d0 = d[i];

            var res = Intersect.rays( o0, d0, ray.origin, ray.dir );

            if (res == null) {
                continue;
            }

            var useg = res.u0;
            var uray = res.u1;

            // if outside of triangle edge interval, discard
            if (useg < -Constants.EPSILON || useg > l[i] + Constants.EPSILON) continue;

            // if inside interval
            if (minU == null || uray < minU.u){
                minU = new CurveTriPoint( uray, Vec.onRay( ray.origin, ray.dir, uray ), Vec.onRay( uvs[i], uvd[i], useg / l[i]));
            }

            if (maxU == null || uray > maxU.u){
                maxU = new CurveTriPoint( uray, Vec.onRay( ray.origin, ray.dir, uray ), Vec.onRay( uvs[i], uvd[i], useg / l[i]));
            }
        }

        if (maxU == null || minU == null) {
            return null;
        }

        // 3) otherwise, return minU maxU along with uv info
        return new Interval<CurveTriPoint>(minU, maxU);

    }

    public static function merge_tri_clip_intervals(clip1 : Interval<CurveTriPoint>, clip2 : Interval<CurveTriPoint>,
                                                    mesh1 : MeshData, tri1 : Tri, mesh2 : MeshData, tri2 : Tri ) : Interval<TriTriPoint> {

        // if the intervals dont overlap, fail
        if ( clip2.min.u > clip1.max.u + Constants.EPSILON
            || clip1.min.u > clip2.max.u + Constants.EPSILON) {
            return null;
        }

        // are these assigned properly?
        var min = (clip1.min.u > clip2.min.u) ? new Pair<CurveTriPoint, Int>(clip1.min, 0) : new Pair<CurveTriPoint, Int>(clip2.min, 1);
        var max = (clip1.max.u < clip2.max.u) ? new Pair<CurveTriPoint, Int>(clip1.max, 0) : new Pair<CurveTriPoint, Int>(clip2.max, 1);

        var res = new Interval<TriTriPoint>( new TriTriPoint(null, null, min.item0.point),
                                             new TriTriPoint(null, null, max.item0.point));

        if (min.item1 == 0){
            res.min.uv0 = min.item0.uv;
            res.min.uv1 = tri_uv_from_point( mesh2, tri2, min.item0.point );
        } else {
            res.min.uv0 = tri_uv_from_point( mesh1, tri1, min.item0.point );
            res.min.uv1 = min.item0.uv;
        }

        if (max.item1 == 0){
            res.max.uv0 = max.item0.uv;
            res.max.uv1 = tri_uv_from_point( mesh2, tri2, max.item0.point );
        } else {
            res.max.uv0 = tri_uv_from_point( mesh1, tri1, max.item0.point );
            res.max.uv1 = max.item0.uv;
        }

        return res;
    }

    public static function tri_uv_from_point( mesh : MeshData, tri : Tri, f : Point ) : UV {

        var p1 = mesh.points[ tri[0] ];
        var p2 = mesh.points[ tri[1] ];
        var p3 = mesh.points[ tri[2] ];

        var uv1 = mesh.uvs[ tri[0] ];
        var uv2 = mesh.uvs[ tri[1] ];
        var uv3 = mesh.uvs[ tri[2] ];

        var f1 = Vec.sub(p1, f);
        var f2 = Vec.sub(p2, f);
        var f3 = Vec.sub(p3, f);

        // calculate the areas and factors (order of parameters doesn't matter):
        var a = Vec.norm( Vec.cross( Vec.sub(p1, p2), Vec.sub(p1, p3) ) ); // main triangle area a
        var a1 = Vec.norm( Vec.cross(f2, f3) ) / a; // p1's triangle area / a
        var a2 = Vec.norm( Vec.cross(f3, f1) ) / a; // p2's triangle area / a
        var a3 = Vec.norm( Vec.cross(f1, f2) ) / a; // p3's triangle area / a

        // find the uv corresponding to point f (uv1/uv2/uv3 are associated to p1/p2/p3):
        return Vec.add( Vec.mul( a1, uv1), Vec.add( Vec.mul( a2, uv2), Vec.mul( a3, uv3)));
    }

    //
    // Intersect two planes, yielding a Ray
    //
    // **params**
    // + point in plane 0
    // + normal to plane 0
    // + point in plane 1
    // + normal to plane 1
    //
    // **returns**
    // + a point represented by an array of length (dim)
    //

    public static function planes(origin0 : Point, normal0 : Vector, origin1 : Point, normal1: Vector) : Ray {

        var d = Vec.cross(normal0, normal1);

        if (Vec.dot(d, d) < Constants.EPSILON) return null;

        // find the largest index of d
        var li = 0;
        var mi = Math.abs( d[0] );
        var m1 = Math.abs( d[1] );
        var m2 = Math.abs( d[2] );

        if ( m1 > mi ){
            li = 1;
            mi = m1;
        }

        if ( m2 > mi ){
            li = 2;
            mi = m2;
        }

        var a1, b1, a2, b2;

        if ( li == 0 ){
            a1 = normal0[1];
            b1 = normal0[2];
            a2 = normal1[1];
            b2 = normal1[2];
        } else if ( li == 1 ){
            a1 = normal0[0];
            b1 = normal0[2];
            a2 = normal1[0];
            b2 = normal1[2];
        } else {
            a1 = normal0[0];
            b1 = normal0[1];
            a2 = normal1[0];
            b2 = normal1[1];
        }

        // n dot X = d
        var d1 = -Vec.dot( origin0, normal0 );
        var d2 = -Vec.dot( origin1, normal1 );

        var den = a1 * b2 - b1 * a2;

        var x = (b1 * d2 - d1 * b2) / den;
        var y = (d1 * a2 - a1 * d2) / den;
        var p;

        if ( li == 0 ){
            p = [0,x,y];
        } else if ( li == 1 ){
            p = [x,0,y];
        } else {
            p = [x,y,0];
        }

        return new Ray(p, Vec.normalized( d ) );

    }

    //
    // Intersect three planes, expects the planes to form a single point of
    // intersection
    //
    // **params**
    // + normal for plane 0
    // + d for plane 0 ( where the plane eq is normal * (x,y,z) = d )
    // + normal for plane 1
    // + d for plane 1 ( where the plane eq is normal * (x,y,z) = d )
    // + normal for plane 2
    // + d for plane 2 ( where the plane eq is normal * (x,y,z) = d )
    //
    // **returns**
    // + the point representing the intersection
    //
    public static function three_planes(n0 : Point, d0 : Float, n1 : Point, d1 : Float, n2 : Point, d2 : Float) : Point {

        var u = Vec.cross( n1, n2 );
        var den = Vec.dot( n0, u );

        if (Math.abs(den) < Constants.EPSILON) return null;

        var diff = Vec.sub( Vec.mul( d2, n1 ), Vec.mul( d1, n2 ) );
        var num = Vec.add( Vec.mul( d0, u ), Vec.cross( n0, diff));

        return Vec.mul( 1 / den, num );

    }

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
                point0 = Vec.onRay( a0, a1ma0, u0 ),
                point1 = Vec.onRay( b0, b1mb0, u1 ),
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

        var p0 = Vec.onRay( a0, a, t );
        var p1 = Vec.onRay( b0, b, w );

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

    public static function segment_with_tri( p0 : Point, p1 : Point, points : Array<Point>, tri : Tri ) : TriSegmentIntersection {

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

        return new TriSegmentIntersection(pt, s, t, r );

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

