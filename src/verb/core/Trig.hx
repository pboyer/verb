package verb.core;

import verb.core.Vec;
import verb.core.Data;
import verb.core.Intersections;
using verb.core.Vec;

// `Trig` provides various convenient methods for trigonometry

@:expose("core.Trig")
class Trig {

    public static function isPointInPlane( pt : Point, p : Plane, tol : Float ) : Bool{
        return Math.abs( pt.sub( p.origin ).dot( p.normal ) ) < tol;
    }

    public static function distToSegment(a : Point, b : Point, c : Point){
        var res = segmentClosestPoint( b, a, c, 0.0, 1.0 );
        return Vec.dist( b, res.pt );
    }

    //Find the closest point on a ray
    //
    //**params**
    //
    //* point to project
    //* origin for ray
    //* direction of ray 1, assumed normalized
    //
    //**returns**
    //
    //* pt

    public static function rayClosestPoint( pt, o, r ) {
        var o2pt = Vec.sub(pt,o)
        , do2ptr = Vec.dot(o2pt, r)
        , proj = Vec.add(o, Vec.mul(do2ptr, r));

        return proj;
    }

    //Find the distance of a point to a ray
    //
    //**params**
    //
    //* point to project
    //* origin for ray
    //* direction of ray 1, assumed normalized
    //
    //**returns**
    //
    //* the distance

    public static function distToRay( pt, o, r ) {
        var d = rayClosestPoint( pt, o, r );
        var dif = Vec.sub( d, pt );

        return Vec.norm( dif );

    }

    //Determine if three points form a straight line within a given tolerance for their 2 * squared area
    //
    //          * p2
    //         / \
    //        /   \
    //       /     \
    //      /       \
    //     * p1 ---- * p3
    //
    //The area metric is 2 * the squared norm of the cross product of two edges, requiring no square roots and no divisions
    //
    //**params**
    //
    //* p1
    //* p2
    //* p3
    //* The tolerance
    //
    //**returns**
    //
    //* Whether the triangle passes the test

    public static function threePointsAreFlat( p1, p2, p3, tol ) {

        //find the area of the triangle without using a square root
        var p2mp1 = Vec.sub( p2, p1 )
        , p3mp1 = Vec.sub( p3, p1 )
        , norm = Vec.cross( p2mp1, p3mp1 )
        , area = Vec.dot( norm, norm );

        return area < tol;

    }

    //Find the closest point on a segment
    //
    //**params**
    //
    //* point to project
    //* first point of segment
    //* second point of segment
    //* first param of segment
    //* second param of segment
    //
    //**returns**
    //
    //* *Object* with u and pt properties

    public static function segmentClosestPoint( pt : Point, segpt0 : Point, segpt1 : Point, u0 : Float, u1 : Float ) {

        var dif = Vec.sub( segpt1, segpt0 )
        , l = Vec.norm( dif );

        if (l < Constants.EPSILON ) {
            return { u: u0, pt : segpt0 };
        }

        var o = segpt0
        , r = Vec.mul( 1 / l, dif )
        , o2pt = Vec.sub(pt, o)
        , do2ptr = Vec.dot(o2pt, r);

        if (do2ptr < 0){
            return { u: u0,  pt : segpt0 };
        } else if (do2ptr > l){
            return { u: u1,  pt : segpt1 };
        }

        return { 	u: u0 + (u1 - u0) * do2ptr / l, pt : Vec.add(o, Vec.mul( do2ptr, r ) ) };

    }

}
