package verb.core;

// experimental surface intersection work

import verb.core.types.SurfaceBoundingBoxTree;
import verb.core.types.Pair;
import verb.core.types.MeshData.UV;
import verb.core.types.LazySurfaceBoundingBoxTree;
import verb.core.types.CurveSurfaceIntersection;
using verb.core.ArrayExtensions;
using verb.core.Vec;

import verb.core.types.NurbsSurfaceData;
import verb.core.types.NurbsCurveData;

@:expose("core.ExpIntersect")
class ExpIntersect {

    public static function surfaces(surface0 : NurbsSurfaceData, surface1 : NurbsSurfaceData, tol : Float) : Array<Pair<UV,UV>> {

        var exactOuter = intersectBoundaryCurves( surface0, surface1, tol );

//        var approxInner = approxInnerCriticalPts( surface0, surface1 );
//        var refinedInner = refineInnerCriticalPts( surface0, surface1, approxInner, tol );

        return exactOuter;
    }

    public static function refineInnerCriticalPts(surface0 : NurbsSurfaceData,
                                                  surface1 : NurbsSurfaceData,
                                                  approx : Array<Pair<UV,UV>>,
                                                  tol : Float ) : Array<Pair<UV,UV>> {
        return approx.map(function(x){
            return refineCriticalPt(surface0,surface1,x,tol);
        });
    }

    public static function refineCriticalPt(surface0 : NurbsSurfaceData,
                                            surface1 : NurbsSurfaceData,
                                            approx : Pair<UV,UV>,
                                            tol : Float ) : Pair<UV,UV> {

        var obj = function(x){
            var d0 = Eval.rationalSurfaceDerivatives( surface0, x[0], x[1], 1 );
            var d1 = Eval.rationalSurfaceDerivatives( surface1, x[2], x[3], 1 );

            var n0 = Vec.normalized( Vec.cross( d0[1][0], d0[0][1] ) );
            var n1 = Vec.normalized( Vec.cross( d1[1][0], d1[0][1] ) );

            var vec = Vec.sub( d0[0][0], d1[0][0] );
            var dist = Vec.normSquared( vec );
            var vecnorm = Vec.dot( vec, n1 );
            var normdot = Vec.dot( n0, n1 );

            return dist - vecnorm * vecnorm + 1 - normdot * normdot;
        };

        var start = [ approx.item0[0], approx.item0[1], approx.item1[0], approx.item1[1] ];
        var sol = Numeric.uncmin( obj, start, tol );
        var final = sol.solution;

        return new Pair<UV,UV>( [ final[0], final[1] ], [ final[2], final[3] ] );
    }

    public static function verifyInnerCriticalPts(surface0 : NurbsSurfaceData, surface1 : NurbsSurfaceData, approx : Array<UV> ){
        return null;
    }

    public static function approxInnerCriticalPts(surface0 : NurbsSurfaceData, surface1 : NurbsSurfaceData) : Array<Pair<UV,UV>> {

        trace("SURFACE INTERSECTION");

        var div0 = new LazySurfaceBoundingBoxTree( surface0, false, 0.5, 0.5 );
        var div1 = new LazySurfaceBoundingBoxTree( surface1, false, 0.5, 0.5 );

        var res = Intersect.boundingBoxTrees(div0, div1, 0);

        trace(res.length, "TOTAL INTERSECTING SUB-SURFACES");

        var numSamples = 5;

        var criticalPts = [];

        // for each surface pair, construct del phi 2d array
        for (srfpair in res){

            var a = approxSurfaceDelPhiField( srfpair.item0, srfpair.item1, numSamples, numSamples );

            var f = a.delphi;
            var uvs0 = a.uvs0;
            var uvs1 = a.uvs1;

            // iterate through loops in field
            for ( i in 1...f.length ){
                for ( j in 1...f[i].length ){
                    var num = approxRotationNumber( [ f[i][j-1], f[i][j], f[i-1][j], f[i-1][j-1] ] );

                    if (num != 0){
                        var midU0 = (uvs0[i][j][1] + uvs0[i][j-1][1]) / 2;
                        var midV0 = (uvs0[i][j][0] + uvs0[i-1][j][0]) / 2;

                        var midU1 = (uvs1[i][j][1] + uvs1[i][j-1][1]) / 2;
                        var midV1 = (uvs1[i][j][0] + uvs1[i-1][j][0]) / 2;

                        criticalPts.push(new Pair<UV,UV>([ midU0, midV0 ], [midU1, midV1]));
                    }
                }
            }
        }

        return criticalPts;
    }

    // approximate the rotation number from del phi
    public static function approxRotationNumber( vs : Array<Array<Float>> ){
        var sum = 0.0;

        var l = vs.length;

        for (i in 1...l+1){
            var ang = Vec.angleBetweenNormalized2d( vs[i-1], vs[i % l] );
            sum += Math.abs( ang );
        }

        return Math.floor( Math.abs(sum / (2 * Math.PI)));
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

                var delphi = Vec.normalized( [ Vec.dot( n2, ru), Vec.dot( n2, rv ) ] );

                delphirow.push( delphi );
            }
        }

        return { uvs0 : tess0.uvs, uvs1 : minuvs, delphi : delphifield };
    }

    public static function sampleSurfaceRegular( surface : NurbsSurfaceData, divs_u : Int, divs_v : Int ){

        if ( divs_u < 1 ) { divs_u = 1; }
        if ( divs_v < 1 ) { divs_v = 1; }

        var degreeU = surface.degreeU
        , degreeV = surface.degreeV
        , controlPoints = surface.controlPoints
        , knotsU = surface.knotsU
        , knotsV = surface.knotsV;

        var offset = 0.005;

        var u_span = knotsU.domain() - 2 * offset;
        var v_span = knotsV.domain() - 2 * offset;

        var minu = knotsU.first() + offset;
        var minv = knotsV.first() + offset;

        var span_u = u_span / divs_u;
        var span_v = v_span / divs_v;

        var points = [];
        var uvs = [];

        for (i in 0...divs_u+1){
            var uvrow = [];
            uvs.push(uvrow);

            var pointsrow = [];
            points.push(pointsrow);
            var pt_u = minu + i * span_u;

            for (j in 0...divs_v+1){
                var pt_v = minv + j * span_v;

                uvrow.push( [pt_u, pt_v] );
                pointsrow.push( Eval.rationalSurfacePoint( surface, pt_u, pt_v ) );
            }
        }

        return { uvs : uvs, points : points };
    }

    public static function intersectBoundaryCurves(surface0 : NurbsSurfaceData,
                                                   surface1 : NurbsSurfaceData,
                                                   tol : Float) : Array<Pair<UV,UV>> {

        var srf0bs = Make.surfaceBoundaryCurves( surface0 );
        var srf1bs = Make.surfaceBoundaryCurves( surface1 );

//        var tree0 = new SurfaceBoundingBoxTree( surface0 );
//        var tree1 = new SurfaceBoundingBoxTree( surface1 );

        var ints = [];

        for (i in 0...srf0bs.length){
            var crv = srf0bs[i];
            var res = Intersect.curveAndSurface( crv, surface1, tol );

            for (int in res){
                // reconstruct the uv on the isocurve
                var uv = switch i {
                    case 0: [ surface0.knotsU.first(), int.u ];
                    case 1: [ surface0.knotsU.last(), int.u ];
                    case 2: [ int.u, surface0.knotsV.first() ];
                    default: [ int.u, surface0.knotsV.last() ];
                }

                ints.push(new Pair<UV,UV>( uv, int.uv ) );
            }
        }

        for (i in 0...srf1bs.length){
            var crv = srf1bs[i];
            var res = Intersect.curveAndSurface( crv, surface0, tol );

            for (int in res){
                // reconstruct the uv on the isocurve
                var uv = switch i {
                    case 0: [ surface1.knotsU.first(), int.u ];
                    case 1: [ surface1.knotsU.last(), int.u ];
                    case 2: [ int.u, surface1.knotsV.first() ];
                    default: [ int.u, surface1.knotsV.last() ];
                }

                ints.push(new Pair<UV,UV>( int.uv, uv) );
            }
        }

        return ints.unique(function(a,b){
            return Math.abs( a.item0[0] - b.item0[0] ) < tol && Math.abs( a.item0[1] - b.item0[1] ) < tol;
        });
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