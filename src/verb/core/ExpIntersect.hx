package verb.core;

// experimental surface intersection work

import verb.core.types.MeshData.UV;
import verb.core.types.LazySurfaceBoundingBoxTree;
import verb.core.types.CurveSurfaceIntersection;
using verb.core.ArrayExtensions;
using verb.core.Vec;

import verb.core.types.NurbsSurfaceData;
import verb.core.types.NurbsCurveData;

interface ITuple3<T1,T2,T3>{

    public var item0 : T1;
    public var item1 : T2;
    public var item2 : T3;

}

interface ITuple4<T1,T2,T3,T4>{

    public var item0 : T1;
    public var item1 : T2;
    public var item2 : T3;
    public var item3 : T4;

}

class Tuple3<T1,T2,T3> implements ITuple3<T1,T2,T3> {

    public var item0 : T1;
    public var item1 : T2;
    public var item2 : T3;

    public function new(item0, item1, item2){
        this.item0 = item0;
        this.item1 = item1;
        this.item2 = item2;
    }
}

class Tuple4<T1,T2,T3,T4> implements ITuple4<T1,T2,T3,T4> {

    public var item0 : T1;
    public var item1 : T2;
    public var item2 : T3;
    public var item3 : T4;

    public function new(item0, item1, item2, item3){
        this.item0 = item0;
        this.item1 = item1;
        this.item2 = item2;
        this.item3 = item3;
    }
}

interface ITriple<T>{

    public var item0 : T;
    public var item1 : T;
    public var item2 : T;

}

interface IQuadruple<T>{

    public var item0 : T;
    public var item1 : T;
    public var item2 : T;
    public var item3 : T;

}

class Triple<T> implements ITriple<T> {

    public var item0 : T;
    public var item1 : T;
    public var item2 : T;

    public function new(item0, item1, item2){
        this.item0 = item0;
        this.item1 = item1;
        this.item2 = item2;
    }
}

class Quadruple<T> implements IQuadruple<T> {

    public var item0 : T;
    public var item1 : T;
    public var item2 : T;
    public var item3 : T;

    public function new(item0, item1, item2, item3){
        this.item0 = item0;
        this.item1 = item1;
        this.item2 = item2;
        this.item3 = item3;
    }
}

class ExpIntersect {

    public static function intersectBoundaryCurves(surface0 : NurbsSurfaceData, surface1 : NurbsSurfaceData, tol : Float) : Array<CurveSurfaceIntersection> {

        var surface0Boundaries = Make.surfaceBoundaryCurves( surface0 );
        var surface1Boundaries = Make.surfaceBoundaryCurves( surface1 );

        var ints = [];

        for (crv in surface0Boundaries){
            ints = ints.concat(Intersect.curveAndSurface(crv, surface1, tol ));
        }

        for (crv in surface1Boundaries){
            ints = ints.concat(Intersect.curveAndSurface(crv, surface0, tol ));
        }

        return ints;
    }

    public static function surfaces(surface0 : NurbsSurfaceData, surface1 : NurbsSurfaceData, tol : Float) {


        var exactOuter = intersectBoundaryCurves( surface0, surface1, tol );

        var approxInner = approxInnerCriticalPts( surface0, surface1 );
        var refinedInner = refineInnerCriticalPts( surface0, surface1, approxInner );

        return null;
    }

    public static function refineInnerCriticalPts(surface0 : NurbsSurfaceData, surface1 : NurbsSurfaceData, approx : Array<UV> ){

        // perform minimization of function
        // the newton iteration?

        return null;

    }


    public static function verifyInnerCriticalPts(surface0 : NurbsSurfaceData, surface1 : NurbsSurfaceData, approx : Array<UV> ){



        return null;

    }

    public static function approxInnerCriticalPts(surface0 : NurbsSurfaceData, surface1 : NurbsSurfaceData) : Array<UV> {

        // yield a collection of intersecting sub patches
        var maxDivs = 10;

        var div0 = new LazySurfaceBoundingBoxTree( surface0, surface0.knotsU.domain() / maxDivs, surface0.knotsV.domain() / maxDivs );
        var div1 = new LazySurfaceBoundingBoxTree( surface1, surface1.knotsU.domain() / maxDivs, surface1.knotsV.domain() / maxDivs );

        var res = Intersect.boundingBoxTrees(div0, div1);

        // for each surface pair, construct del phi 2d array
        for (srfpair in res){

            var subsrf0 = srfpair.item0;
            var subsrf1 = srfpair.item1;

            // for all control pt pairs, we construct del phi
            var subsrfdelphi = [];

            for (row in subsrf0.controlPoints){

                var delphirow = [];
                subsrfdelphi.push(delphirow);

                for (homopt in row){

                    // dehomogenize the pt
                    var pt = Eval.dehomogenize( homopt );





                }

            }


        }

        return null;
    }





}




// developing the del phi field

    // subdivide two surfaces and intersect via recursive aabb intersection
    //  - this allows us to omit non-intersecting subpatches
    // get closest pt for each

    // dot prod this vector with surface partial derivs to get del phi (pg 45 first paragraph)

// approximating critical pts in field

    // iterate through the rectangles formed by 4 points in the initial subdivision
    // we determine the approximate rotation number in each area by sampling del phi vectors and determining their rotation
    // see second paragraph pg 45

// do minimization to determine minima

/*

Great starting point:
http://www.cs.berkeley.edu/~hling/research/paper/intersection.htm


Notes from: Topological and differential-equation methods for surface intersections

phi - the oriented distance function can be constructed between q(s,t) and a point on another surface r(u,v)
* phi(u,v) = nq[ Q( r(u,v) ) ]  . [r(u,v) - q(Q(r(u,v)))]
* phi is the dot product of the normal of r at the closest point to r
* q(Q(r(u,v))) is unique nearest point to r(u,v) on q
* n2[ Q( r(u,v) ) ] is the unit normal at this closest point on q
* it describes the minimum distance from one surface to the other
* parameterized over uv over r

the intersection curve is the level set of the implicit eq phi(u,v) = 0

the gradient of the distance field (with respect to u,v) can be constructed easily, there is only one term that depends explicitly on u, v

* grad phi = [  nq[ Q( r(u,v) ) ] . ru(u,v),  nq[ Q( r(u,v) ) ] . rv(u,v) ]
* when grad phi /= 0, this is orthogonal to the level curves


we need to discover the significant points

* boundary pts - points on the edge of the parametric domains where phi = 0
* critical points - the local extremum of phi where del phi = 0, i.e. local minima/maxima of phi

boundary pts are easy - just intersect a curve and surface

discovering critical points /= easy

the rotation number (W(V, c))
* the number of rotations of V when traversing c, a closed curve through V
* V may not be 0 on the curve

if the rotation number is nonzero, there must be a critical point within the closed curve!

how to approximate critical points

1) approximate del phi
    i) subdivide the surface
    ii) approximate del phi by n^2 comparison of control pts (aabb's help quick reject)
    iii) these vectors are the approximations, applied at the "nodes"
2) by constructing many loops, we can determine the "rotation number"
	* the rotation number tells us the

*/