package verb.core;

// experimental surface intersection work

import verb.core.types.MeshData.UV;
import verb.core.types.LazySurfaceBoundingBoxTree;
import verb.core.types.CurveSurfaceIntersection;
using verb.core.ArrayExtensions;
using verb.core.Vec;

import verb.core.types.NurbsSurfaceData;
import verb.core.types.NurbsCurveData;

@:expose("core.ExpIntersect")
class ExpIntersect {

    public static function intersectBoundaryCurves(surface0 : NurbsSurfaceData, surface1 : NurbsSurfaceData, tol : Float) : Array<CurveSurfaceIntersection> {

        var surface0Boundaries = Make.surfaceBoundaryCurves( surface0 );
        var surface1Boundaries = Make.surfaceBoundaryCurves( surface1 );

        trace( surface0Boundaries[0] );
        trace( surface1Boundaries );

        var ints = [];

        for (crv in surface0Boundaries){
            ints = ints.concat( Intersect.curveAndSurface( crv, surface1, tol ) );
        }

        for (crv in surface1Boundaries){
            ints = ints.concat( Intersect.curveAndSurface( crv, surface0, tol ) );
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

        var numSamples = 10;

        // for each surface pair, construct del phi 2d array
        for (srfpair in res){

            var delphi = approxSurfaceDelPhiField( srfpair.item0, srfpair.item1, numSamples, numSamples );



        }

        return null;
    }



    public static function approxSurfaceDelPhiField( surface0 : NurbsSurfaceData, surface1 : NurbsSurfaceData, divs_u : Int, divs_v : Int){

        var tess0 = sampleSurfaceRegular( surface0, divs_u, divs_v );
        var tess1 = sampleSurfaceRegular( surface1, divs_u, divs_v );

        var minuvs = [];

        for (i in 0...tess0.uvs.length){

            var minuvsrow = [];
            minuvs.push( minuvsrow );

            for (j in 0...tess0.uvs[i].length){

                var minDist = Math.POSITIVE_INFINITY;
                var minUV = [ Math.POSITIVE_INFINITY, Math.POSITIVE_INFINITY ];

                // for each pt in second sampling
                for (k in 0...tess1.uvs.length){
                    for (l in 0...tess1.uvs[k].length){

                        var dist = Vec.distSquared( tess0.points[i][j], tess0.points[k][l] );
                        if (dist < minDist){
                            minDist = dist;
                            minUV = tess0.uvs[k][l];
                        }
                    }
                }
                minuvsrow.push( minUV );
            }
        }

        var delphifield = [];

        // develop del phi field using min uvs
        for (i in 0...minuvs.length){

            var delphirow = [];
            delphifield.push( delphirow );

            for (j in 0...minuvs[i].length){

                var uv0 = tess0.uvs[i][j];
                var uv1 = minuvs[i][j];

                var derivs0 = Eval.rationalSurfaceDerivatives( surface0, uv0[0], uv0[1] );
                var derivs1 = Eval.rationalSurfaceDerivatives( surface1, uv1[0], uv1[1] );

                var n2 = Vec.normalized( Vec.cross( derivs1[1][0], derivs1[0][1] ) );

                var ru = derivs0[1][0];
                var rv = derivs0[0][1];

                var delphi = [ Vec.dot( n2, ru), Vec.dot( n2, rv ) ];

                delphirow.push( delphi );
            }
        }

        return { ruvs : tess0.uvs, quvs : minuvs, delphi : delphifield };
    }

    public static function sampleSurfaceRegular( surface : NurbsSurfaceData, divs_u : Int, divs_v : Int ){

        if ( divs_u < 1 ) { divs_u = 1; }
        if ( divs_v < 1 ) { divs_v = 1; }

        var degreeU = surface.degreeU
        , degreeV = surface.degreeV
        , controlPoints = surface.controlPoints
        , knotsU = surface.knotsU
        , knotsV = surface.knotsV;

        var u_span = knotsU.domain();
        var v_span = knotsV.domain();

        var span_u = u_span / divs_u;
        var span_v = v_span / divs_v;

        var points = [];
        var uvs = [];

        for (i in 0...divs_u+1){
            var uvrow = [];
            uvs.push(uvrow);

            var pointsrow = [];
            points.push(pointsrow);

            for (j in 0...divs_v+1){
                var pt_u = i * span_u,
                pt_v = j * span_v;

                uvrow.push( [pt_u, pt_v] );
                pointsrow.push( Eval.rationalSurfacePoint( surface, pt_u, pt_v ) );
            }
        }

        return { uvs : uvs, points : points };
    }

    // approximate the rotation number from 4 points on a surface

    public static function approxRotationNumber( v0 : Array<Float>, v1 : Array<Float>, v2 : Array<Float>, v3 : Array<Float> ){



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