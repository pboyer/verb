package verb.eval;

import verb.core.ArrayExtensions;
using verb.core.ArrayExtensions;

import verb.eval.Eval;

import verb.core.Constants;
import verb.core.Mat;
import verb.core.BoundingBox;
import verb.core.Intersections;
import verb.core.Data;
import verb.core.Vec;
import verb.core.Trig;

// `Tess` contains static, immutable algorithms for tessellation of NURBS curves and sufaces. Tessellation is the decomposition
// of the analytical NURBS representation into discrete meshes or polylines that are useful for drawing.
//
// Some of these algorithms are "adaptive" - using certain heuristics to sample geometry where such samples make sense - while
// others are "regular" in that they sample regularly throughout a parametric domain. There are tradeoffs here. While
// adaptive algorithms can sometimes yield "better" results that are smaller or more economical, this can sometimes come at
// increased computational cost. For example, it is sometimes necessarily to compute higher order derivatives in order to
// obtain these more economical results. Your usage of these algorithms should consider these tradeoffs.

// TODO
class NewMeshData {
    var points : Array<Float>;
    var faces : Array<Int>;
    var uvs : Array<Float>;
}

class BezierEdgeIndices {
    public var n : Pair<Int,Int>;
    public var s : Pair<Int,Int>;
    public var e : Pair<Int,Int>;
    public var w : Pair<Int,Int>;
    public function new(){}
}

enum EdgeSide {
    North; South; East; West;
}

@:expose("eval.Tess")
class Tess {

    public static function rationalBezierSurfaceRegularSample( surface : NurbsSurfaceData, divsU : Int, divsV : Int ) : Array<Point> {

        var pts = [];

        // TODO dir is prob wrong
        var u = surface.knotsU[0];
        var t = (surface.knotsU.last( ) - surface.knotsU[0]) / divsU;

        for ( i in 0...divsU ) {
            var iso = Make.surfaceIsocurve( surface, u, true );
            var v = (iso.knots.last( ) - iso.knots[0]) / divsV;
            rationalBezierCurveRegularSamplePointsMutate( iso, pts, iso.knots[0], t, divsV, false );
            u += t;
        }

        return pts;
    }

    private static function northIndex<T>( i, j, divs : Array<Array<T>> ) {
        if ( i <= 0 ) return null;
        return divs[ i - 1 ][ j ];
    }

    private static function southIndex<T>( i, j, divs : Array<Array<T>> ) {
        if ( i >= divs.length - 1 ) return null;
        return divs[ i + 1 ][j];
    }

    private static function eastIndex<T>( i, j, divs : Array<Array<T>> ) {
        if ( j >= divs[i].length - 1 ) return null;
        return divs[ i ][j + 1];
    }

    private static function westIndex<T>( i, j, divs : Array<Array<T>> ) {
        if ( j <= 0 ) return null;
        return divs[ i ][j - 1];
    }

    public static function rationalSurfaceAdaptiveSample( surface : NurbsSurfaceData, tol : Float ) : MeshData {

        // split into bezier patches

        var beziers = Modify.decomposeSurfaceIntoBeziers( surface );

        // get step lengths for patches

        var stepLengths : Array<Array<Pair<Float, Float>>> = []
        , stepLengthRow;

        for ( bezierrow in beziers ) {
            stepLengthRow = [];
            stepLengths.push( stepLengthRow );

            for ( bezier in bezierrow ) {
				var ls = rationalBezierSurfaceStepLength( bezier, tol );

				ls.item0 = Math.min(ls.item0, (bezier.knotsU.last() - bezier.knotsU.first()) / 2);
				ls.item1 = Math.min(ls.item1, (bezier.knotsV.last() - bezier.knotsV.first()) / 2);

				stepLengthRow.push( ls );
            }
        }

        var pts = [],
        edgeRow, n, s, e, w,
        empty = new Pair<Float, Float>(Math.POSITIVE_INFINITY, Math.POSITIVE_INFINITY),
        beis : Array<Array<BezierEdgeIndices>> = [],
        beir : Array<BezierEdgeIndices>,
        bei : BezierEdgeIndices,
        e0 : Int,
        e1 : Int,
        srf;

        // tessellate the edges of the bezier patches

        for (i in 0...beziers.length){

            beir = [];
            beis.push( beir );

            for (j in 0...beziers[i].length){

                srf = beziers[i][j];

                // store the indices of the edge vertices in the pt array

                bei = new BezierEdgeIndices();
                beir.push(bei);

                // obtain the step lengths used to tessellate the south and east edge of the bezier

                s = southIndex( i, j, stepLengths );
                if (s == null) s = empty;

                e = eastIndex( i, j, stepLengths );
                if (e == null) e = empty;

                // if i = 0, tessellate the north edge using the stepLengths for this bezier

                if (i == 0){

                    var ne = Make.surfaceIsocurve( srf, srf.knotsU.first( ), false );

                    e0 = pts.length;

                    rationalBezierCurveRegularSamplePointsMutate2( ne, pts, stepLengths[i][j].item1 );

                    e1 = pts.length;

                    bei.n = new Pair<Int,Int>(e0, e1);

                } else {
                    bei.n = beis[i - 1][j].s;
                }

                // if j = 0, tessellate the west edge using the stepLengths for this bezier

                if (j == 0) {

                    e0 = pts.length;

                    var we = Make.surfaceIsocurve( srf, srf.knotsV.first( ), true );
                    rationalBezierCurveRegularSamplePointsMutate2( we, pts, stepLengths[i][j].item0 );

                    e1 = pts.length;

                    bei.w = new Pair<Int,Int>(e0, e1);

                } else {
                    bei.w = beis[i][j-1].e;
                }

                // tessellate the south edge and record vertex positions

                e0 = pts.length;

                var se = Make.surfaceIsocurve( srf, srf.knotsU.last( ), false );
                rationalBezierCurveRegularSamplePointsMutate2( se, pts, Math.min( s.item1, stepLengths[i][j].item1) );

                e1 = pts.length;

                bei.s = new Pair<Int,Int>(e0, e1);

                // tessellate the east edge and record vertex positions

                e0 = pts.length;

                var ee = Make.surfaceIsocurve( srf, srf.knotsV.last( ), true );
                rationalBezierCurveRegularSamplePointsMutate2( ee, pts, Math.min( e.item0, stepLengths[i][j].item0) );

                e1 = pts.length;

                bei.e = new Pair<Int,Int>(e0, e1);
            }
        }

        // tessellate the patch interior and join to the polyline interiors together

        var faces = [], p0;

        for ( i in 0...beziers.length ) {
            for ( j in 0...beziers[i].length ) {

                // tessellate just the interior of the surface

				// keep track of the position in the pts array

                p0 = pts.length;

                var bezier = beziers[i][j];

                var divsU = Math.ceil( 1.0 / stepLengths[i][j].item0 );

                var domainV = bezier.knotsV.last( ) - bezier.knotsV[0];
                var domainU = bezier.knotsU.last( ) - bezier.knotsU[0];

                var divsV = Math.ceil( 1.0 / stepLengths[i][j].item1 );

                var tessStepV = domainV / divsV;
                var tessStepU = domainU / divsU;

                var u = bezier.knotsU[0] + tessStepU;

				// evaluate all points on the interior of the face

                for ( k in 0...divsU-1 ) {

                    var iso = Make.surfaceIsocurve( bezier, u, false );
                    rationalBezierCurveRegularSamplePointsMutate( iso, pts, iso.knots[0] + tessStepV, tessStepV, divsV - 1, false );

                    u += tessStepU;
                }

                // we don't include the start and end points of every row, so we must adjust these values here

                divsU = divsU - 2;
                divsV = divsV - 2;

                // triangulate the interior of the face after having computed the points

                for ( k in 0...divsU ) {
                    for ( l in 0...divsV ) {

                        var a_k = p0 + k * (divsV + 1) + l,
                        b_k = p0 + (k + 1) * (divsV + 1) + l,
                        c_k = b_k + 1,
                        d_k = a_k + 1,
                        abc = [a_k, b_k, c_k],
                        acd = [a_k, c_k, d_k];

                        faces.push( abc );
                        faces.push( acd );
                    }
                }

                // triangulate the edges, joining the interior pts with the edge pts

                bei = beis[i][j]; // we'll need the edge indices for completing this

                stitchMesh( bezier, faces, bei, divsU, divsV, domainV, p0, tessStepV, EdgeSide.North );
                stitchMesh( bezier, faces, bei, divsU, divsV, domainV, p0, tessStepV, EdgeSide.South );
                stitchMesh( bezier, faces, bei, divsU, divsV, domainU, p0, tessStepU, EdgeSide.East );
                stitchMesh( bezier, faces, bei, divsU, divsV, domainU, p0, tessStepU, EdgeSide.West );
            }
        }

        return new MeshData( faces, pts, null, null );
    }

    private static function stitchMesh( bezier : NurbsSurfaceData, faces : Array<Tri>, bei : BezierEdgeIndices,
                                        divsU : Int, divsV : Int, domain : Float, p0 : Int, tessStep : Float, edgeSide : EdgeSide ){

        var edgeIndices;
        var knots;
        var reverseFace = false;
        var tessIStep = 1;

        switch (edgeSide) {
            case EdgeSide.North:
                edgeIndices = bei.n;
                knots = bezier.knotsV;
            case EdgeSide.South:
                edgeIndices = bei.s;
                knots = bezier.knotsV;
                p0 += divsU * (divsV+1);
                reverseFace = true;
            case EdgeSide.East:
                edgeIndices = bei.e;
                knots = bezier.knotsU;
                tessIStep = divsV+1;
                p0 += divsV;
            case EdgeSide.West:
                edgeIndices = bei.w;
                knots = bezier.knotsU;
                tessIStep = divsV+1;
                reverseFace = true;
        }

        // how many indices in the north edge?

        var edgeCount = edgeIndices.item1 - edgeIndices.item0 - 1;

        // what is the north edge's step length

        var edgeStep = domain / edgeCount;

        var edgeU = knots.first();
        var tessU = knots.first() + (3/2) * tessStep;

        var edgeI = 0;
        var tessI = 0;

        // triangulate the northwest corner

        while ( edgeI < edgeCount ){

            while ( edgeU < tessU - Constants.EPSILON && edgeI < edgeCount ){

                var ei = edgeIndices.item0 + edgeI,
                ei2 = ei + 1;

                if (reverseFace){
                    faces.push( [ ei, ei2, p0 + tessI ] );
                } else {
                    faces.push( [ ei, p0 + tessI, ei2 ] );
                }

                edgeI++;
                edgeU += edgeStep;
            }

            if (edgeI < edgeCount){
                var ei = edgeIndices.item0 + edgeI;

                if (reverseFace){
                    faces.push( [ p0 + tessI, ei, p0 + tessI + tessIStep ] );
                } else {
                    faces.push( [ p0 + tessI, p0 + tessI + tessIStep, ei ] );
                }
            }

            tessI += tessIStep;
            tessU += tessStep;
        }
    }


    private static function rationalBezierCurveRegularSamplePointsMutate2(  crv : NurbsCurveData,
                                                                            pts : Array<Point>,
                                                                            step : Float,
                                                                            includeU : Bool = false ) : Void {

        var domain = crv.knots.last( ) - crv.knots[0];
        var steps = Math.ceil( 1.0 / step );
        var len = domain / steps;

        rationalBezierCurveRegularSamplePointsMutate( crv, pts, crv.knots[0], len, steps + 1, false );

    }


    public static function rationalBezierSurfaceStepLength( surface : NurbsSurfaceData, tol : Float ) : Pair<Float, Float> {

        // center the control pts at the origin

        var dehomo = Eval.dehomogenize2d( surface.controlPoints );

        var bb = new BoundingBox();
        for ( row in dehomo ) {
            bb.addRange( row );
        }
        var avgPt = Vec.mul( 0.5, Vec.add( bb.min, bb.max ) );

        // clone and translate all control pts

        var m = Mat.identity( 4 );
        m[0][3] = -avgPt[0];
        m[1][3] = -avgPt[1];
        m[2][3] = -avgPt[2];

        var ts = Modify.rationalSurfaceTransform( surface, m ); // todo util methods for translation
        dehomo = Eval.dehomogenize2d( ts.controlPoints );

        // compute r = max( || Pi || )

        var r = 0.0, n;
        for ( i in 0...dehomo.length ) {
            for ( j in 0...dehomo[i].length ) {
                n = Vec.norm( dehomo[i][j] );
                if ( n > r ) r = n;
            }
        }

        // compute Duu

        var duu = Math.NEGATIVE_INFINITY, iduu;

        for ( i in 0...surface.controlPoints.length - 2 ) {
            for ( j in 0...surface.controlPoints[i].length ) {

                iduu =
                Vec.norm( Vec.add( dehomo[i + 2][j], Vec.add( Vec.mul( -2.0, dehomo[i + 1][j] ), dehomo[i][j] ) ) ) -
                (r - tol) * ( ts.controlPoints[i + 2][j].last( ) - 2 * ts.controlPoints[i + 1][j].last( ) + ts.controlPoints[i][j].last( ));

                if ( iduu > duu ) duu = iduu;

            }
        }

        // compute Dvv

        var dvv = Math.NEGATIVE_INFINITY, idvv;

        for ( i in 0...surface.controlPoints.length ) {
            for ( j in 0...surface.controlPoints[i].length - 2 ) {

                idvv =
                Vec.norm( Vec.add( dehomo[i][j + 2], Vec.add( Vec.mul( -2.0, dehomo[i][j + 1] ), dehomo[i][j] ) ) ) -
                (r - tol) * ( ts.controlPoints[i][j + 2].last( ) - 2 * ts.controlPoints[i][j + 1].last( ) + ts.controlPoints[i][j].last( ));

                if ( idvv > dvv ) dvv = idvv;
            }
        }

        // compute Duv

        var duv = Math.NEGATIVE_INFINITY, iduv;

        for ( i in 0...surface.controlPoints.length - 1 ) {
            for ( j in 0...surface.controlPoints[i].length - 1 ) {
                iduv =
                Vec.norm( Vec.addAll( [ dehomo[i + 1][j + 1],
                Vec.mul( -1.0, dehomo[i][j + 1] ),
                Vec.mul( -1.0, dehomo[i + 1][j] ),
                dehomo[i][j] ] ) ) -
                (r - tol) * ( ts.controlPoints[i + 1][j + 1].last( ) - ts.controlPoints[i][j + 1].last( ) - ts.controlPoints[i + 1][j].last( ) + ts.controlPoints[i][j].last( ));

                if ( iduv > duv ) duv = iduv;
            }
        }

        duu *= surface.degreeU * (surface.degreeU - 1);
        dvv *= surface.degreeV * (surface.degreeV - 1);
        duv *= surface.degreeU * surface.degreeV;

        var minw = Math.POSITIVE_INFINITY;
        var w;

        for ( i in 0...surface.controlPoints.length ) {
            for ( j in 0...surface.controlPoints[i].length ) {
                w = surface.controlPoints[i][j].last( );
                if ( w < minw ) minw = w;
            }
        }

        var stepu, stepv;

        if ( Math.abs( duu ) < Constants.TOLERANCE ) {

            stepu = 1.0;

            if ( Math.abs( dvv ) < Constants.TOLERANCE ) {
                stepv = 1.0;
                return new Pair<Float, Float>( stepu, stepv );
            }

            stepv = ( Math.sqrt( duv * duv + 8 * dvv * tol * minw ) - duv ) / dvv;
        }

        if ( Math.abs( dvv ) < Constants.TOLERANCE ) {

            stepv = 1.0;
            stepu = ( Math.sqrt( duv * duv + 8 * duu * tol * minw ) - duv ) / duu;

            return new Pair<Float, Float>( stepu, stepv );
        }

        var unum, vnum, denom;

        unum = 4 * dvv * tol * minw;
        denom = duu * dvv + duv * Math.sqrt( duu * dvv );
        stepu = Math.sqrt( unum / denom );

        vnum = 4 * duu * tol * minw;
        stepv = Math.sqrt( vnum / denom );

        return new Pair<Float, Float>( stepu, stepv );
    }

    // Compute a regularly spaced sequence of points on a non-uniform, rational spline curve. Generally, this algorithm
    // is much faster than computing these points directly. This algorithm is based on the forward difference algorithm
    // presented in chapter 4 of
    // [T. W. Sederberg, BYU, Computer Aided Geometric Design Course Notes](http://cagd.cs.byu.edu/~557/text/cagd.pdf)
    //
    //**params**
    //
    //* NurbsCurveData object representing the curve
    //* number of divisions
    //
    //**returns**
    //
    //* an array of (divs+1) points

    public static function rationalCurveRegularSample( crv : NurbsCurveData, divs : Int, includeU : Bool = false ) : Array<Point> {

        //if degree is 1, just return the dehomogenized control points
        if ( crv.degree == 1 ) {
            var pts = [];
            for ( i in 0...crv.controlPoints.length ) {
                pts.push( Eval.dehomogenize( crv.controlPoints[i] ) );
            }
            if ( includeU ) {
                for ( i in 0...crv.controlPoints.length ) {
                    pts[i].push( crv.knots[i + 1] );
                }
            }
            return pts;
        }

        var range = crv.knots.last( ) - crv.knots[0];
        var beziers = crv.knots.length == (crv.degree + 1) * 2 ? [ crv ] : Modify.decomposeCurveIntoBeziers( crv );
        var pts = [];
        var brange, fraction;

        var currentU = crv.knots[0];
        var step = range / divs;
        var brange, bsteps, nextU;

        for ( i in 0...beziers.length ) {

            brange = beziers[i].knots.last( ) - currentU;
            bsteps = Math.ceil( brange / step );
            nextU = currentU + bsteps * step;

            if ( nextU > beziers[i].knots.last( ) + Constants.TOLERANCE ) {
                nextU -= step;
                bsteps--;
            }

            rationalBezierCurveRegularSamplePointsMutate( beziers[i], pts, currentU, step, bsteps + 1, includeU );

            currentU = nextU + step;
        }

        return pts;
    }

    public static function rationalCurveAdaptiveSample( crv : NurbsCurveData, tol : Float, includeU : Bool = false ) : Array<Point> {

        //if degree is 1, just return the dehomogenized control points
        if ( crv.degree == 1 ) {
            var pts = [];
            for ( i in 0...crv.controlPoints.length ) {
                pts.push( Eval.dehomogenize( crv.controlPoints[i] ) );
            }
            if ( includeU ) {
                for ( i in 0...crv.controlPoints.length ) {
                    pts[i].push( crv.knots[i + 1] );
                }
            }
            return pts;
        }

        var beziers = crv.knots.length == (crv.degree + 1) * 2 ? [ crv ] : Modify.decomposeCurveIntoBeziers( crv );
        var pts = [], steps, domain, len;

        for ( i in 0...beziers.length ) {

            domain = beziers[i].knots.last( ) - beziers[i].knots[0];
            len = rationalBezierCurveStepLength( beziers[i], tol );
            steps = Math.ceil( domain / len );
            len = domain / steps;

            rationalBezierCurveRegularSamplePointsMutate( beziers[i], pts, beziers[i].knots[0], len, steps + 1, includeU );

            if ( i == beziers.length - 1 ) break;
            pts.pop( );
        }

        return pts;
    }

    private static function rationalBezierCurveRegularSamplePointsMutate( crv : NurbsCurveData,
                                                                          pts : Array<Point>,
                                                                          startU : Float,
                                                                          step : Float,
                                                                          numSteps : Int,
                                                                          includeU : Bool = false ) : Void {

        var its = [], ts = [ its ], u = startU, degree1 = crv.degree + 1;

        if ( numSteps <= crv.degree + 1 ) {
            for ( i in 0...numSteps ) {
                pts.push( Eval.rationalCurvePoint( crv, u ) );
                u += step;
            }
            return;
        }

        // initialize forward differencing

        for ( i in 0...degree1 ) {
            its.push( Eval.curvePoint( crv, u ) );
            u += step;
        }

        // compute the differences

        var prev;

        for ( i in 1...degree1 ) {
            its = [];
            ts.push( its );
            prev = ts[i - 1];

            for ( j in 1...prev.length ) {
                its.push( Vec.sub( prev[j], prev[j - 1] ) );
            }
        }

        // evaluate the intial points

        for ( pt in ts[0] ) {
            pts.push( Eval.dehomogenize( pt ) );
        }

        // evaluate the rest of the points

        var front = [ for ( r in ts ) r.last( ) ], k;
        var frlen2 = front.length - 2;

        for ( i in 0...numSteps - degree1 ) {

            // Rright = R + Rdown

            // compute the new forward difference front

            for ( j in 0...front.length - 1 ) {
                k = frlen2 - j; // invert
                Vec.addMutate( front[k], front[k + 1] );
            }

            // add the new pt
            pts.push( Eval.dehomogenize( front[0] ) );
        }

        // add the parameters if required

        u = startU;
        if ( includeU ) {
            for ( pt in pts ) {
                pt.push( u );
                u += step;
            }
        }
    }

    //Compute the regular tessellation step length necessary to approximate a rational Bezier curve to the specified tolerance.
    //
    //**params**
    //
    //* NurbsCurveData object representing the curve
    //* The desired tolerance - the resultant
    //
    //**returns**
    //
    //* The step length - domain / step length yields the number of steps to take within the curve

    public static function rationalBezierCurveStepLength( curve : NurbsCurveData, tol : Float ) : Float {

        // get average pt

        var dehomo = Eval.dehomogenize1d( curve.controlPoints );

        var bb = new BoundingBox( dehomo );
        var avgPt = Vec.mul( 0.5, Vec.add( bb.min, bb.max ) );

        // clone and translate all control pts
        var m = Mat.identity( 4 );
        m[0][3] = -avgPt[0];
        m[1][3] = -avgPt[1];
        m[2][3] = -avgPt[2];

        var tc = Modify.rationalCurveTransform( curve, m ); // todo util methods for translation
        dehomo = Eval.dehomogenize1d( tc.controlPoints );

        // compute r = max( || Pi || )

        var r = 0.0, n;
        for ( i in 0...dehomo.length ) {
            n = Vec.norm( dehomo[i] );
            if ( n > r ) r = n;
        }

        // compute w = min( wi )

        var wts = Eval.weight1d( curve.controlPoints );
        var w = Vec.min( wts );
        var domain = curve.knots.last( ) - curve.knots[0];

        if ( tol < r ) {

            var numer = 8 * w * tol;

            var ws = secondForwardDiff( wts );
            var pts = secondForwardDiff2( dehomo );
            var fs = [ for ( i in 0...pts.length ) Vec.norm( pts[i] ) + (r - tol) * ws[i]];
            var f = Vec.max( fs );
            var denom = curve.degree * (curve.degree - 1.0) * f;

            return domain * Math.sqrt( numer / denom );

        } else if ( r >= tol && tol < 2.0 * r ) {

            var numer = 8 * w * tol;
            var pts = secondForwardDiff2( dehomo );
            var fs = [ for ( i in 0...pts.length ) Vec.norm( pts[i] )];
            var f = Vec.max( fs );
            var denom = curve.degree * (curve.degree - 1.0) * f;

            return domain * Math.sqrt( numer / denom );

        } else {
            return domain;
        }
    }

    private static function secondForwardDiff( array : Array<Float> ) {
        var i = 0, res = [];
        while ( i < array.length - 2 ) {
            res.push( array[i + 2] - 2.0 * array[i + 1] + array[i] );
            i++;
        }

        return res;
    }

    private static function secondForwardDiff2( array : Array<Point> ) {
        var i = 0, res = [];
        while ( i < array.length - 2 ) {
            res.push( Vec.add( array[i + 2], Vec.add( Vec.mul( -2.0, array[i + 1] ), array[i] ) ) );
            i++;
        }

        return res;
    }

    //Tessellate a NURBS surface on equal spaced intervals in the parametric domain
    //
    //**params**
    //
    //* NurbsSurfaceData object
    //* number of divisions in the u direction
    //* number of divisions in the v direction
    //
    //**returns**
    //
    //* MeshData object

    public static function rationalSurfaceNaive( surface : NurbsSurfaceData, divs_u : Int, divs_v : Int ) : MeshData {

        if ( divs_u < 1 ) { divs_u = 1; }
        if ( divs_v < 1 ) { divs_v = 1; }

        var degreeU = surface.degreeU
        , degreeV = surface.degreeV
        , controlPoints = surface.controlPoints
        , knotsU = surface.knotsU
        , knotsV = surface.knotsV;

        var u_span = knotsU.last( ) - knotsU[0];
        var v_span = knotsV.last( ) - knotsV[0];

        var span_u = u_span / divs_u,
        span_v = v_span / divs_v;

        var points = [];
        var uvs = [];
        var normals = [];

        for ( i in 0...divs_u + 1 ) {
            for ( j in 0...divs_v + 1 ) {

                var pt_u = knotsU[0] + i * span_u,
                pt_v = knotsV[0] + j * span_v;

                uvs.push( [pt_u, pt_v] );

                var derivs = Eval.rationalSurfaceDerivatives( surface, pt_u, pt_v, 1 );
                var pt = derivs[0][0];

                points.push( pt );

                var normal = Vec.normalized( Vec.cross( derivs[1][0], derivs[0][1] ) );
                normals.push( normal );
            }
        }

        var faces = [];

        for ( i in 0...divs_u ) {
            for ( j in 0...divs_v ) {
                var a_i = i * (divs_v + 1) + j,
                b_i = (i + 1) * (divs_v + 1) + j,
                c_i = b_i + 1,
                d_i = a_i + 1,
                abc = [a_i, b_i, c_i],
                acd = [a_i, c_i, d_i];

                faces.push( abc );
                faces.push( acd );
            }
        }

        return new MeshData( faces, points, normals, uvs );

    }

    //Divide a NURBS surface int equal spaced intervals in the parametric domain as AdaptiveRefinementNodes
    //
    //**params**
    //
    //* NurbsSurfaceData object
    //* SurfaceDivideOptions object
    //
    //**returns**
    //
    //* MeshData object

    public static function divideRationalSurfaceAdaptive( surface : NurbsSurfaceData, options : AdaptiveRefinementOptions = null ) : Array<AdaptiveRefinementNode> {

        if ( options == null ) options = new AdaptiveRefinementOptions();

        #if (!cs && !cpp && !java)
        options.minDivsU = options.minDivsU != null ? options.minDivsU : 1;
        options.minDivsU = options.minDivsV != null ? options.minDivsV : 1;
        options.refine = options.refine != null ? options.refine : true;
        #end

        var minU = (surface.controlPoints.length - 1) * 2;
        var minV = (surface.controlPoints[0].length - 1) * 2;

        var divsU = options.minDivsU = options.minDivsU > minU ? options.minDivsU : minU;
        var divsV = options.minDivsV = options.minDivsV > minV ? options.minDivsV : minV;

        //get necessary intervals
        var umax = surface.knotsU.last( );
        var umin = surface.knotsU[0];
        var vmax = surface.knotsV.last( );
        var vmin = surface.knotsV[0];

        var du = (umax - umin) / divsU
        , dv = (vmax - vmin) / divsV;

        var divs = [];
        var pts = [];

        // 1) evaluate all of the corners
        for ( i in 0...divsV + 1 ) {
            var ptrow = [];
            for ( j in 0...divsU + 1 ) {

                var u = umin + du * j
                , v = vmin + dv * i;

                //todo: make this faster by specifying n,m
                var ds = Eval.rationalSurfaceDerivatives( surface, u, v, 1 );

                var norm = Vec.normalized( Vec.cross( ds[0][1], ds[1][0] ) );
                ptrow.push( new SurfacePoint( ds[0][0], norm, [u, v], -1, Vec.isZero( norm ) ) );
            }
            pts.push( ptrow );
        }

        // 2) make all of the nodes
        for ( i in 0...divsV ) {
            for ( j in 0...divsU ) {
                var corners = [ pts[divsV - i - 1][j],
                pts[divsV - i - 1][j + 1],
                pts[divsV - i][j + 1],
                pts[divsV - i][j] ];

                divs.push( new AdaptiveRefinementNode( surface, corners ) );
            }
        }

        if ( !options.refine ) return divs;

        // 3) assign all of the neighbors and divide
        for ( i in 0...divsV ) {
            for ( j in 0...divsU ) {

                var ci = i * divsU + j
                , n = north( ci, i, j, divsU, divsV, divs )
                , e = east( ci, i, j, divsU, divsV, divs )
                , s = south( ci, i, j, divsU, divsV, divs )
                , w = west( ci, i, j, divsU, divsV, divs );

                divs[ci].neighbors = [ s, e, n, w ];
                divs[ci].divide( options );
            }
        }

        return divs;
    }

    private static function north( index, i, j, divsU, divsV, divs ) {
        if ( i == 0 ) return null;
        return divs[ index - divsU ];
    }

    private static function south( index, i, j, divsU, divsV, divs ) {
        if ( i == divsV - 1 ) return null;
        return divs[ index + divsU ];
    }

    private static function east( index, i, j, divsU, divsV, divs ) {
        if ( j == divsU - 1 ) return null;
        return divs[ index + 1 ];
    }

    private static function west( index, i, j, divsU, divsV, divs ) {
        if ( j == 0 ) return null;
        return divs[ index - 1 ];
    }

    private static function triangulateAdaptiveRefinementNodeTree( arrTree : Array<AdaptiveRefinementNode> ) : MeshData {

        //triangulate all of the nodes of the tree
        var mesh = MeshData.empty( );
        for ( x in arrTree ) x.triangulate( mesh );
        return mesh;

    }

    public static function rationalSurfaceAdaptive( surface : NurbsSurfaceData, options : AdaptiveRefinementOptions = null ) : MeshData {

        options = options != null ? options : new AdaptiveRefinementOptions();

        //adaptive divide
        var arrTrees = divideRationalSurfaceAdaptive( surface, options );

        //triangulation
        return triangulateAdaptiveRefinementNodeTree( arrTrees );
    }

    // Compute a regularly spaced grid of points on a non-uniform, rational, B spline surface. Generally, this algorithm
    // is faster than directly evaluating these as we can pre-compute all of the basis function arrays
    //
    //**params**
    //
    //* NurbsSurfaceData object representing the surface
    //* number of divisions in the U direction
    //* number of divisions in the V direction
    //
    //**returns**
    //
    //* a 2d array of dimension (divsU+1, divsV+1) of points

    public static function rationalSurfaceRegularSample( surface : NurbsSurfaceData, divsU : Int, divsV : Int ) : Array<Array<Point>> {
        return Eval.dehomogenize2d( surfaceRegularSample( surface, divsU, divsV ) );
    }

    // Compute a regularly spaced grid of points on a non-uniform, non-rational, B spline surface. Generally, this algorithm
    // is faster than directly evaluating these as we can pre-compute all of the basis function arrays
    //
    //**params**
    //
    //* NurbsSurfaceData object representing the surface
    //* number of divisions in the U direction
    //* number of divisions in the V direction
    //
    //**returns**
    //
    //* a 2d array of dimension (divsU+1, divsV+1) of points

    public static function surfaceRegularSample( surface : NurbsSurfaceData, divsU : Int, divsV : Int ) : Array<Array<Point>> {

        var degreeU = surface.degreeU
        , degreeV = surface.degreeV
        , controlPoints = surface.controlPoints
        , knotsU = surface.knotsU
        , knotsV = surface.knotsV;

        var dim = controlPoints[0][0].length
        , spanU = (knotsU.last( ) - knotsU[0]) / divsU
        , spanV = (knotsV.last( ) - knotsV[0]) / divsV
        , knotSpansBasesU = Eval.regularlySpacedBasisFunctions( degreeU, knotsU, divsU )
        , knotSpansU = knotSpansBasesU.item0
        , basesU = knotSpansBasesU.item1
        , knotSpansBasesV = Eval.regularlySpacedBasisFunctions( degreeV, knotsV, divsV )
        , knotSpansV = knotSpansBasesV.item0
        , basesV = knotSpansBasesV.item1
        , pts = []
        , divsU1 = divsU + 1
        , divsV1 = divsV + 1;

        for ( i in 0...divsU1 ) {
            var ptsi = [];
            pts.push( ptsi );

            for ( j in 0...divsV1 ) {
                ptsi.push( Eval.surfacePointGivenBasesKnotSpans( degreeU, degreeV, controlPoints, knotSpansU[i], knotSpansV[j], basesU[i], basesV[j], dim ) );
            }
        }

        return pts;
    }

    public static function surfaceRegularSample2( surface : NurbsSurfaceData, divsU : Int, divsV : Int ) : Array<Array<Point>> {

        var pts = [];

        // TODO dir is prob wrong
        var u = surface.knotsU[0];
        var t = (surface.knotsU.last( ) - surface.knotsU[0]) / divsU;

        for ( i in 0...divsU ) {
            var iso = Make.surfaceIsocurve( surface, u, true );
            pts.push( rationalCurveRegularSample( iso, divsV ) );
            u += t;
        }

        return pts;
    }
}

@:expose("core.AdaptiveRefinementOptions")
class AdaptiveRefinementOptions {
    public var normTol : Float = 2.5e-2;
    public var minDepth : Int = 0;
    public var maxDepth : Int = 10;
    public var refine : Bool = true;
    public var minDivsU : Int = 1;
    public var minDivsV : Int = 1;

    public function new( ) {}

}

//```
//Structure of the child nodes
//in the adaptive refinement tree
//
//  v
//  ^
//  |
//  +--> u
//
//                        neighbors[2]
//
//                (u0,v1)---(u05,v1)---(u1,v1)
//                  |           |          |
//                  |     3     |     2    |
//                  |           |          |
//neighbors[3]   (u0,v05)--(u05,v05)--(u1,v05)   neighbors[1]
//                  |           |          |
//                  |     0     |     1    |
//                  |           |          |
//                (u0,v0)---(u05,v0)---(u1,v0)
//
//                        neighbors[0]
//```

@:expose("core.AdaptiveRefinementNode")
class AdaptiveRefinementNode {

    var srf : NurbsSurfaceData;
    public var neighbors : Array<AdaptiveRefinementNode>;
    var children : Array<AdaptiveRefinementNode>;
    var corners : Array<SurfacePoint>;
    var midPoints : Array<SurfacePoint>;
    var centerPoint : SurfacePoint;
    var splitVert : Bool;
    var splitHoriz : Bool;
    var horizontal : Bool;
    var u05 : Float;
    var v05 : Float;

    public function new( srf : NurbsSurfaceData, corners : Array<SurfacePoint>, neighbors : Array<AdaptiveRefinementNode> = null ) {


        this.srf = srf;
        this.neighbors = neighbors == null ? [null, null, null, null] : neighbors;

        this.corners = corners;

        //if no corners, we need to construct initial corners from the surface
        if ( this.corners == null ) {
            var u0 : Float = srf.knotsU[0];
            var u1 : Float = srf.knotsU.last( );
            var v0 : Float = srf.knotsV[0];
            var v1 : Float = srf.knotsV.last( );

            this.corners = [
                SurfacePoint.fromUv( u0, v0 ),
                SurfacePoint.fromUv( u1, v0 ),
                SurfacePoint.fromUv( u1, v1 ),
                SurfacePoint.fromUv( u0, v1 ) ];
        }

    }

    public function isLeaf( ) {
        return this.children == null;
    }

    public function center( ) {
        return this.centerPoint != null ? this.centerPoint : this.evalSrf( this.u05, this.v05 );
    }

    public function evalCorners( ) {

        //eval the center
        this.u05 = (this.corners[0].uv[0] + this.corners[2].uv[0]) / 2;
        this.v05 = (this.corners[0].uv[1] + this.corners[2].uv[1]) / 2;

        //eval all of the corners
        for ( i in 0...4 ) {
            //if it's not already evaluated
            if ( this.corners[i].point == null ) {
                //evaluate it
                var c = this.corners[i];
                this.evalSrf( c.uv[0], c.uv[1], c );
            }
        }
    }

    public function evalSrf( u : Float, v : Float, srfPt : SurfacePoint = null ) : SurfacePoint {

        var derivs = Eval.rationalSurfaceDerivatives( this.srf, u, v, 1 );
        var pt = derivs[0][0];
        var norm = Vec.cross( derivs[0][1], derivs[1][0] );
        var degen = Vec.isZero( norm );

        if ( !degen ) norm = Vec.normalized( norm );

        if ( srfPt != null ) {
            srfPt.degen = degen;
            srfPt.point = pt;
            srfPt.normal = norm;
            return srfPt;
        } else {
            return new SurfacePoint( pt, norm, [u, v], -1, degen );
        }
    }

    public function getEdgeCorners( edgeIndex : Int ) : Array<SurfacePoint> {

        //if its a leaf, there are no children to obtain uvs from
        if ( this.isLeaf( ) ) return [ this.corners[ edgeIndex ] ];

        if ( this.horizontal ) {

            switch (edgeIndex){
                case 0:
                    return this.children[0].getEdgeCorners( 0 );
                case 1:
                    return this.children[0].getEdgeCorners( 1 ).concat( this.children[1].getEdgeCorners( 1 ) );
                case 2:
                    return this.children[1].getEdgeCorners( 2 );
                case 3:
                    return this.children[1].getEdgeCorners( 3 ).concat( this.children[0].getEdgeCorners( 3 ) );
            }

        }

        //vertical case
        switch (edgeIndex) {
            case 0:
                return this.children[0].getEdgeCorners( 0 ).concat( this.children[1].getEdgeCorners( 0 ) );
            case 1:
                return this.children[1].getEdgeCorners( 1 );
            case 2:
                return this.children[1].getEdgeCorners( 2 ).concat( this.children[0].getEdgeCorners( 2 ) );
            case 3:
                return this.children[0].getEdgeCorners( 3 );
        }

        return null;
    }

    public function getAllCorners( edgeIndex : Int ) : Array<SurfacePoint> {

        var baseArr = [ this.corners[edgeIndex] ];

        if ( this.neighbors[edgeIndex] == null ) {
            return baseArr;
        }

        //get opposite edges uvs
        var corners = this.neighbors[edgeIndex].getEdgeCorners( ( edgeIndex + 2 ) % 4 );

        var funcIndex = edgeIndex % 2;

        var e = verb.core.Constants.EPSILON;
        var that = this;

        //range clipping functions
        var rangeFuncMap = [
            function( c ) { return c.uv[0] > that.corners[0].uv[0] + e && c.uv[0] < that.corners[2].uv[0] - e; },
            function( c ) { return c.uv[1] > that.corners[0].uv[1] + e && c.uv[1] < that.corners[2].uv[1] - e; }
        ];

        //clip the range of uvs to match this one
        var cornercopy = corners.filter( rangeFuncMap[ funcIndex ] );
        cornercopy.reverse( );
        return baseArr.concat( cornercopy );

    }

    public function midpoint( index ) {

        if ( this.midPoints == null ) this.midPoints = [null, null, null, null];
        if ( !(this.midPoints[index] == null) ) return this.midPoints[index];

        switch (index){
            case 0:
                this.midPoints[0] = this.evalSrf( this.u05, this.corners[0].uv[1] );
            case 1:
                this.midPoints[1] = this.evalSrf( this.corners[1].uv[0], this.v05 );
            case 2:
                this.midPoints[2] = this.evalSrf( this.u05, this.corners[2].uv[1] );
            case 3:
                this.midPoints[3] = this.evalSrf( this.corners[0].uv[0], this.v05 );
        }

        return this.midPoints[index];

    }

    public function hasBadNormals( ) : Bool {
        return this.corners[0].degen || this.corners[1].degen || this.corners[2].degen || this.corners[3].degen;
    }

    public function fixNormals( ) : Void {
        var l = this.corners.length;

        for ( i in 0...l ) {
            var corn = this.corners[i];

            if ( this.corners[i].degen ) {
                //get neighbors
                var v1 = this.corners[(i + 1) % l];
                var v2 = this.corners[(i + 3) % l];

                //correct the normal
                this.corners[i].normal = v1.degen ? v2.normal : v1.normal;
            }
        }
    }

    public function shouldDivide( options : AdaptiveRefinementOptions, currentDepth : Int ) {

        if ( currentDepth < options.minDepth ) return true;
        if ( currentDepth >= options.maxDepth ) return false;

        if ( this.hasBadNormals( ) ) {
            this.fixNormals( );
            //don't divide any further when encountering a degenerate normal
            return false;
        }

        this.splitVert = Vec.normSquared( Vec.sub( this.corners[0].normal, this.corners[1].normal ) ) > options.normTol ||
        Vec.normSquared( Vec.sub( this.corners[2].normal, this.corners[3].normal ) ) > options.normTol;

        this.splitHoriz = Vec.normSquared( Vec.sub( this.corners[1].normal, this.corners[2].normal ) ) > options.normTol ||
        Vec.normSquared( Vec.sub( this.corners[3].normal, this.corners[0].normal ) ) > options.normTol;

        if ( this.splitVert || this.splitHoriz ) return true;

        var center = this.center( );

        return Vec.normSquared( Vec.sub( center.normal, this.corners[0].normal ) ) > options.normTol ||
        Vec.normSquared( Vec.sub( center.normal, this.corners[1].normal ) ) > options.normTol ||
        Vec.normSquared( Vec.sub( center.normal, this.corners[2].normal ) ) > options.normTol ||
        Vec.normSquared( Vec.sub( center.normal, this.corners[3].normal ) ) > options.normTol;
    }

    public function divide( options : AdaptiveRefinementOptions = null ) : Void {
        if ( options == null ) options = new AdaptiveRefinementOptions();
        #if (!cpp && !cs && !java)
        if ( options.normTol == null ) options.normTol = 8.5e-2;
        if ( options.minDepth == null ) options.minDepth = 0;
        if ( options.maxDepth == null ) options.maxDepth = 10;
        #end

        this._divide( options, 0, true );
    }

    private function _divide( options : AdaptiveRefinementOptions, currentDepth : Int, horiz : Bool ) : Void {

        this.evalCorners( );

        if ( !this.shouldDivide( options, currentDepth ) ) return;

        currentDepth++;

        //is the quad flat in one dir and curved in the other?
        if ( this.splitVert && !this.splitHoriz ) {
            horiz = false;
        } else if ( !this.splitVert && this.splitHoriz ) {
            horiz = true;
        }

        this.horizontal = horiz;

        if ( this.horizontal ) {

            var bott = [ this.corners[0], this.corners[1], this.midpoint( 1 ), this.midpoint( 3 ) ];
            var top = [ this.midpoint( 3 ), this.midpoint( 1 ), this.corners[2], this.corners[3] ];

            this.children = [ new AdaptiveRefinementNode( this.srf, bott ), new AdaptiveRefinementNode( this.srf, top ) ];

            //assign neighbors to bottom node
            this.children[0].neighbors = [ this.neighbors[0], this.neighbors[1], this.children[1], this.neighbors[3] ];

            //assign neighbors to top node
            this.children[1].neighbors = [ this.children[0], this.neighbors[1], this.neighbors[2], this.neighbors[3] ];

        } else {

            var left = [ this.corners[0], this.midpoint( 0 ), this.midpoint( 2 ), this.corners[3] ];
            var right = [ this.midpoint( 0 ), this.corners[1], this.corners[2], this.midpoint( 2 ) ];

            this.children = [ new AdaptiveRefinementNode( this.srf, left ), new AdaptiveRefinementNode( this.srf, right ) ];

            this.children[0].neighbors = [ this.neighbors[0], this.children[1], this.neighbors[2], this.neighbors[3] ];
            this.children[1].neighbors = [ this.neighbors[0], this.neighbors[1], this.neighbors[2], this.children[0] ];

        }

        //divide all children recursively
        for ( child in this.children ) {
            child._divide( options, currentDepth, !horiz );
        }

    }

    public function triangulate( mesh : MeshData = null ) : MeshData {

        if ( mesh == null ) mesh = MeshData.empty( );

        if ( this.isLeaf( ) ) return this.triangulateLeaf( mesh );

        //recurse on the children
        for ( x in this.children ) {
            if ( x == null ) break;
            x.triangulate( mesh );
        }

        return mesh;
    }

    public function triangulateLeaf( mesh : MeshData ) : MeshData {

        var baseIndex = mesh.points.length
        , uvs = []
        , ids = []
        , splitid = 0;

        //enumerate all uvs in counter clockwise direction
        for ( i in 0...4 ) {

            var edgeCorners = this.getAllCorners( i );

            //this is the vertex that is split
            if ( edgeCorners.length == 2 ) splitid = i + 1;

            for ( j in 0...edgeCorners.length ) {
                uvs.push( edgeCorners[j] );
            }
        }

        for ( corner in uvs ) {

            //if the id is defined, we can just push it and continue
            if ( corner.id != -1 ) {
                ids.push( corner.id );
                continue;
            }

            mesh.uvs.push( corner.uv );
            mesh.points.push( corner.point );
            mesh.normals.push( corner.normal );

            corner.id = baseIndex;
            ids.push( baseIndex );

            baseIndex++;
        }

        if ( uvs.length == 4 ) {

            //if the number of points is 4, we're just doing a
            //rectangle - just build the basic triangulated square
            mesh.faces.push( [ ids[0], ids[3], ids[1] ] );
            mesh.faces.push( [ ids[3], ids[2], ids[1] ] );

            //all done
            return mesh;

        } else if ( uvs.length == 5 ) {

            //use the splitcorner to triangulate
            var il = ids.length;

            //there will be 3 triangles
            mesh.faces.push( [ ids[ splitid ], ids[ (splitid + 2) % il ], ids[ (splitid + 1) % il ] ] );
            mesh.faces.push( [ ids[ (splitid + 4) % il ], ids[ (splitid + 3) % il ], ids[ splitid ] ] );
            mesh.faces.push( [ ids[ splitid ], ids[ (splitid + 3) % il ], ids[ (splitid + 2) % il ] ] );

            return mesh;

        }

        //make point at center of face
        var center = this.center( );

        mesh.uvs.push( center.uv );
        mesh.points.push( center.point );
        mesh.normals.push( center.normal );

        //get index
        var centerIndex = mesh.points.length - 1;

        //build triangle fan from center
        var i = 0;
        var j = uvs.length - 1;
        while ( i < uvs.length ) {
            mesh.faces.push( [ centerIndex, ids[i], ids[j] ] );
            j = i++;
        }

        return mesh;

    }
}


