package verb.core;

//experimental surface intersection work

import verb.core.types.IBoundingBoxTree;
import verb.core.types.SurfaceSurfaceIntersectionPoint;
import verb.core.types.SurfaceBoundingBoxTree;
import verb.core.types.Pair;
import verb.core.types.MeshData.UV;
import verb.core.types.LazySurfaceBoundingBoxTree;
import verb.core.types.CurveSurfaceIntersection;
using verb.core.ArrayExtensions;
using verb.core.Vec;

import verb.core.types.NurbsSurfaceData;
import verb.core.types.NurbsCurveData;


enum MarchStepState { OutOfBounds; InsideDomain; AtBoundary; CompleteLoop; CoincidentStartPoint; }

class MarchStep {

    public var stepCount = 0;

    //the last step taken
    public var step : Point;

    //the uv from which the last step was taken on srf0
    public var olduv0 : UV;

    //the uv after the step was taken
    public var uv0 : UV;

    //the uv from which the last step was taken on srf0
    public var olduv1 : UV;

    //the uv after the step was taken
    public var uv1 : UV;

    //the point from which last step was taken
    public var oldpoint : Point;

    //the point after the step was taken
    public var point : Point;

    public var state : MarchStepState;

    public function new( step, olduv0, olduv1, uv0, uv1, oldpoint, point, state, stepCount ){
        this.step = step;
        this.olduv0 = olduv0;
        this.olduv1 = olduv1;
        this.uv0 = uv0;
        this.uv1 = uv1;
        this.oldpoint = oldpoint;
        this.point = point;
        this.state = state;
        this.stepCount = stepCount;
    }

    public static function outOfBounds(){
        return new MarchStep( null, null, null, null, null, null, null, MarchStepState.OutOfBounds, 0 );
    }

    public static function init(pt : SurfaceSurfaceIntersectionPoint){
        return new MarchStep( null, null, null, pt.uv0, pt.uv1, null, pt.point, MarchStepState.InsideDomain, 0 );
    }
}

@:expose("core.ExpIntersect")
class ExpIntersect {

    public static function outsideDomain( surface : NurbsSurfaceData, uv : UV) : Bool {
        var u = uv[0];
        var v = uv[1];

        return u < surface.knotsU.first() || v < surface.knotsV.first() ||
            u > surface.knotsU.last() || v > surface.knotsV.last();
    }

    public static function clampToDomain( surface : NurbsSurfaceData, uv : UV) : UV {
        var u = uv[0];
        var v = uv[1];

        if (u < surface.knotsU.first()){
            u = surface.knotsU.first();
        }

        if (u > surface.knotsU.last()){
            u = surface.knotsU.last();
        }

        if (v < surface.knotsV.first()){
            v = surface.knotsV.first();
        }

        if (v > surface.knotsV.last()){
            u = surface.knotsV.last();
        }

        return [u,v];
    }

    public static function clampStep( surface : NurbsSurfaceData, uv : UV, step : UV ) : UV {
        var u = uv[0];
        var v = uv[1];

        var nu = u + step[0];

        if (nu > surface.knotsU.last() + Constants.EPSILON){
            step = Vec.mul( (surface.knotsU.last() - u) / step[0], step  );
        } else if ( nu < surface.knotsU.first() - Constants.EPSILON ){
            step = Vec.mul( (surface.knotsU.first() - u) / step[0], step );
        }

        var nv = v + step[1];

        if (nv > surface.knotsV.last() + Constants.EPSILON){
            step = Vec.mul( (surface.knotsV.last() - v) / step[1], step );
        } else if (nv < surface.knotsV.first() - Constants.EPSILON){
            step = Vec.mul( (surface.knotsV.first() - v ) / step[1], step );
        }

        return step;
    }

    public static function march(   surface0 : NurbsSurfaceData,
                                    surface1 : NurbsSurfaceData,
                                    prev : MarchStep,
                                    currentIndex : Int,
                                    allStartPts : Array<SurfaceSurfaceIntersectionPoint>,
                                    tol : Float ) {
    
        var first = allStartPts[currentIndex];

        var uv0 = prev.uv0;
        var uv1 = prev.uv1;

        var derivs0 = Eval.rationalSurfaceDerivatives( surface0, uv0[0], uv0[1], 1 );
        var derivs1 = Eval.rationalSurfaceDerivatives( surface1, uv1[0], uv1[1], 1 );

        // 1) get normal to both surfaces
        var p = derivs0[0][0];
        var q = derivs1[0][0];

        var dfdu = derivs0[1][0];
        var dfdv = derivs0[0][1];

        var dgdu = derivs1[1][0];
        var dgdv = derivs1[0][1];

        var norm0 = dfdu.cross( dfdv );
        var norm1 = dgdu.cross( dgdv );

        // 2) the cross product is step direction
        var unitStep = norm0.cross( norm1 ).normalized();

        // 3) determine the new step length
        var stepLength = INIT_STEP_LENGTH;

        //if possible, build adaptive step
        if ( prev.oldpoint != null ){

            var denom = Math.acos( Vec.dot( prev.step.normalized(), unitStep ) );

            //linear intersection curve
            if ( Math.abs( denom ) < Constants.EPSILON ){
                stepLength = LINEAR_STEP_LENGTH;
            } else {
                var radiusOfCurvature = Vec.dist( prev.oldpoint, prev.point ) / Math.acos( Vec.dot( prev.step.normalized(), unitStep ) );
                var theta = 2 * Math.acos( 1 - tol * 4 / radiusOfCurvature );

                stepLength = radiusOfCurvature * Math.tan( theta );
            }
        }

        //scale the step
        var step = Vec.mul( stepLength, unitStep );

        //project the step back to the surfaces
        var x = prev.point.add(step);

        var pdif = x.sub(p);
        var qdif = x.sub(q);

        var rw = dfdu.cross(norm0);
        var rt = dfdv.cross(norm0);

        var su = dgdu.cross(norm1);
        var sv = dgdv.cross(norm1);

        var dw = rt.dot(pdif) / rt.dot(dfdu);
        var dt = rw.dot(pdif) / rw.dot(dfdv);

        var du = sv.dot(qdif) / sv.dot(dgdu);
        var dv = su.dot(qdif) / su.dot(dgdv);

        var stepuv0 = [dw, dt];
        var stepuv1 = [du, dv];

        var newuv0 = uv0.add( stepuv0 );
        var newuv1 = uv1.add( stepuv1 );

        var state = MarchStepState.InsideDomain;

        if ( outsideDomain( surface0, newuv0 ) ){
            state = MarchStepState.AtBoundary;

            var l = stepuv0.norm();
            stepuv0 = clampStep( surface0, uv0, stepuv0 );
            stepuv1 = Vec.mul( stepuv0.norm() / l, stepuv1 );
        }

        if ( outsideDomain( surface1, newuv1 ) ){
            state = MarchStepState.AtBoundary;

            var l = stepuv1.norm();
            stepuv1 = clampStep( surface1, uv1, stepuv1 );
            stepuv0 = Vec.mul( stepuv1.norm() / l, stepuv0 );
        }

        newuv0 = uv0.add( stepuv0 );
        newuv1 = uv1.add( stepuv1 );

        //TODO: if doesn't converge, make d smaller
        var relaxed = Intersect.surfacesAtPointWithEstimate( surface0, surface1, newuv0, newuv1, tol );

        //have we made a loop?
        if ( prev.stepCount > 5 && prev.olduv0 != null && Trig.distToSegment( prev.point, first.point, relaxed.point ) < 10 * tol ){
            return new MarchStep( step, prev.uv0, prev.uv1, first.uv0, first.uv1, prev.point, first.point, MarchStepState.CompleteLoop, prev.stepCount+1 );
        }

        if ( prev.stepCount > 5 && isCoincidentWithStartPoint( relaxed.point, currentIndex, allStartPts, 10 * tol )){
            state = MarchStepState.CoincidentStartPoint;
        }

        return new MarchStep( step, prev.uv0, prev.uv1, relaxed.uv0, relaxed.uv1, prev.point, relaxed.point, state, prev.stepCount+1 );
    }

    private static var INIT_STEP_LENGTH = 1e-3;
    private static var LINEAR_STEP_LENGTH = 0.1;

    public static function isCoincidentWithStartPoint(  point : Point,
                                                        currentIndex : Int, 
                                                        allStartPts : Array<SurfaceSurfaceIntersectionPoint>, 
                                                        tol : Float ) : Bool {
        //if were marching along the first point, then we couldn't possibly be
        if (currentIndex == 0) return false;

        for (i in 0...currentIndex){
            
            var dist = Vec.distSquared( allStartPts[i].point, allStartPts[currentIndex].point );  
            if ( dist < tol ){
                trace("Coincident start point!");
                return true;
            }
        }

        //are we coincident with a point from which we've already started?
        return false;
    }

    public static function completeMarch(surface0 : NurbsSurfaceData,
                                         surface1 : NurbsSurfaceData,
                                         startIndex : Int,
                                         allStartPts : Array<SurfaceSurfaceIntersectionPoint>,
                                         tol : Float ) : Array<SurfaceSurfaceIntersectionPoint> {

        var start = allStartPts[startIndex];

        //take first step along curve
        var step = march( surface0, surface1, MarchStep.init( start ), startIndex, allStartPts, tol );

        //if we're out of bounds, exit
        if (step.state == MarchStepState.AtBoundary || step.state == MarchStepState.CoincidentStartPoint ){
            return null;
        }

        //march until you hit a boundary or a start point we already traversed
        var final = [];
        final.push( start );

        while ( step.state != MarchStepState.CoincidentStartPoint && 
                step.state != MarchStepState.AtBoundary && 
                step.state != MarchStepState.CompleteLoop ) {
            final.push( new SurfaceSurfaceIntersectionPoint( step.uv0, step.uv1, step.point, -1 ) );

            if ( step.state == MarchStepState.CoincidentStartPoint ){
                return null;
            }

            step = march( surface0, surface1, step, startIndex, allStartPts, tol );
        }
    
        final.push( new SurfaceSurfaceIntersectionPoint( step.uv0, step.uv1, step.point, -1 ) );

        return final;
    }

    public static function surfaces(surface0 : NurbsSurfaceData, surface1 : NurbsSurfaceData, tol : Float) {

        var final = [];

	    var startPts = intersectBoundaryCurves( surface0, surface1, tol );

        var approxInner = approxInnerCriticalPts( surface0, surface1 );
        var refinedInner = refineInnerCriticalPts( surface0, surface1, approxInner, tol );

        //todo prevent duplicate points
        var b = true;

        for (pair in refinedInner){
            var res = Intersect.curveAndSurface( Make.surfaceIsocurve( surface0, pair.item0[0], false ), surface1 );

            if (res.length == 0 ) continue;

            if (!b) continue;
            b = false;

            var int = new SurfaceSurfaceIntersectionPoint( [ pair.item0[0], res[0].u ], res[0].uv, res[0].curvePoint, -1 );
            
            startPts.push( int );
        }

        var i = 0; 
        while (i < startPts.length){
            trace( "starting at", startPts[i].point ); 
            var res = completeMarch( surface0, surface1, i, startPts, tol );
            
            if (res != null){
                final.push( res );
                
                startPts.insert( i, res.last() );
               
                trace("inserting", res.last().point );

                i += 2;
            
            }
            i++;
        }

        return [ for (pts in final) Make.rationalInterpCurve( pts.map(function(x){ return x.point; }) )];

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

    public static function boundingBoxLeaves<T>( division : IBoundingBoxTree<T> ) : Array<T> {
        if ( division.indivisible(0) ) return [ division.yield() ];

        var halves = division.split();
        return boundingBoxLeaves( halves.item0 ).concat( boundingBoxLeaves( halves.item1 ) );
    }

    public static function approxInnerCriticalPts(surface0 : NurbsSurfaceData, surface1 : NurbsSurfaceData) : Array<Pair<UV,UV>> {

        //TODO: adaptive division

        var div0 = new LazySurfaceBoundingBoxTree( surface0, false, 0.6, 0.6 );
        var div1 = new LazySurfaceBoundingBoxTree( surface1, false, 0.6, 0.6 );

        var res = Intersect.boundingBoxTrees(div0, div1, 0);

        //TODO sampling density?
        //faster closest point?
        var numSamples = 4;

        var criticalPts = [];

        //for each surface pair, construct del phi 2d array
        for (srfpair in res){
            var a = approxSurfaceDelPhiField( srfpair.item0, srfpair.item1, numSamples, numSamples );

            var f = a.delphi;
            var uvs0 = a.uvs0;
            var uvs1 = a.uvs1;

            //iterate through loops in field
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

    //approximate the rotation number from del phi
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

                //for each pt in second sampling
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

        //develop del phi field using min uvs
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
                                                   tol : Float) : Array<SurfaceSurfaceIntersectionPoint> {

        var srf0bs = Make.surfaceBoundaryCurves( surface0 );
        var srf1bs = Make.surfaceBoundaryCurves( surface1 );

        var ints = [];

        for (i in 0...srf0bs.length){
            var crv = srf0bs[i];
            var res = Intersect.curveAndSurface( crv, surface1, tol );

            for (int in res){
                //reconstruct the uv on the isocurve
                var uv = switch i {
                    case 0: [ surface0.knotsU.first(), int.u ];
                    case 1: [ surface0.knotsU.last(), int.u ];
                    case 2: [ int.u, surface0.knotsV.first() ];
                    default: [ int.u, surface0.knotsV.last() ];
                }

                var dist = Vec.dist( int.curvePoint, int.surfacePoint );
                ints.push(new SurfaceSurfaceIntersectionPoint( uv, int.uv, int.curvePoint, dist ) );
            }
        }

        for (i in 0...srf1bs.length){
            var crv = srf1bs[i];
            var res = Intersect.curveAndSurface( crv, surface0, tol );

            for (int in res){
                //reconstruct the uv on the isocurve
                var uv = switch i {
                    case 0: [ surface1.knotsU.first(), int.u ];
                    case 1: [ surface1.knotsU.last(), int.u ];
                    case 2: [ int.u, surface1.knotsV.first() ];
                    default: [ int.u, surface1.knotsV.last() ];
                }

                var dist = Vec.dist( int.curvePoint, int.surfacePoint );
                ints.push(new SurfaceSurfaceIntersectionPoint( int.uv, uv, int.curvePoint, dist ) );
            }
        }

        return ints.unique(function(a,b){
            return Math.abs( a.uv0[0] - b.uv0[0] ) < tol && Math.abs( a.uv0[1] - b.uv0[1] ) < tol;
        });
    }

}


//developing the del phi field

    //subdivide two surfaces and intersect via recursive aabb intersection
    //  - this allows us to omit non-intersecting subpatches
    //get closest pt for each

    //dot prod this vector with surface partial derivs to get del phi (pg 45 first paragraph)

//approximating critical pts in field

    //iterate through the rectangles formed by 4 points in the initial subdivision
    //we determine the approximate rotation number in each area by sampling del phi vectors and determining their rotation
    //see second paragraph pg 45

//do minimization to determine minima

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
