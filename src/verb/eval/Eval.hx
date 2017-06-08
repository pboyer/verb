package verb.eval;

import verb.core.Data;
import verb.core.Vec;
import verb.core.Binomial;
import verb.core.Constants;

using verb.core.ArrayExtensions;

// `Eval` provides all of the core algorithms for evaluating points and derivatives on NURBS curves and surfaces. Most of the
// time, it makes more sense to use the tools in verb.geom for this, but in some cases this will make more sense.
//
// Eval also provides experimental tools for evaluating points in NURBS volumes.
//
// Many of these algorithms owe their implementation to Piegl & Tiller's "The NURBS Book"

@:expose("eval.Eval")
class Eval {

    //Compute the tangent at a point on a NURBS curve
    //
    //**params**
    //
    //* NurbsCurveData object representing the curve
    //* u parameter
    //* v parameter
    //
    //**returns**
    //
    //* a Vector represented by an array of length (dim)

    public static function rationalCurveTangent( curve : NurbsCurveData, u : Float ) : Array<Float> {
        var derivs = rationalCurveDerivatives( curve, u, 1 );
        return derivs[1];
    }

    //Compute the derivatives at a point on a NURBS surface
    //
    //**params**
    //
    //* NurbsSurfaceData object representing the surface
    //* u parameter
    //* v parameter
    //
    //**returns**
    //
    //* a Vector represented by an array of length (dim)

    public static function rationalSurfaceNormal( surface : NurbsSurfaceData, u : Float, v : Float) : Array<Float> {
        var derivs = rationalSurfaceDerivatives( surface, u, v, 1 );
        return Vec.cross( derivs[1][0], derivs[0][1] );
    }

    //Compute the derivatives at a point on a NURBS surface
    //
    //**params**
    //
    //* NurbsSurfaceData object representing the surface
    //* number of derivatives to evaluate
    //* u parameter at which to evaluate the derivatives
    //* v parameter at which to evaluate the derivatives
    //
    //**returns**
    //
    //* a point represented by an array of length (dim)

    public static function rationalSurfaceDerivatives( 	surface : NurbsSurfaceData,
                                                        u : Float,
                                                        v : Float,
                                                        numDerivs : Int = 1) : Array<Array<Array<Float>>> {

        var ders = surfaceDerivatives( surface, u, v, numDerivs)
        , Aders = rational2d(ders)
        , wders = weight2d(ders)
        , SKL = new Array<Array<Array<Float>>>()
        , dim = Aders[0][0].length;

        for (k in 0...numDerivs+1){
            SKL.push( new Array<Array<Float>>() );

            for (l in 0...numDerivs-k+1){
                var v = Aders[k][l];

                for (j in 1...l+1){
                    Vec.subMulMutate( v, Binomial.get(l, j) * wders[0][j], SKL[k][l-j] );
                }

                for (i in 1...k+1){
                    Vec.subMulMutate( v, Binomial.get(k, i) * wders[i][0], SKL[k-i][l] );

                    var v2 = Vec.zeros1d(dim);

                    for (j in 1...l+1){
                        Vec.addMulMutate( v2, Binomial.get(l, j) * wders[i][j], SKL[k-i][l-j] );
                    }

                    Vec.subMulMutate( v, Binomial.get(k, i), v2 );
                }

                Vec.mulMutate(1 / wders[0][0], v );
                SKL[k].push( v ); //demogenize
            }
        }

        return SKL;
    }

    //Compute a point on a NURBS surface
    //
    //**params**
    //
    //* integer degree of surface in u direction
    //* array of nondecreasing knot values in u direction
    //* integer degree of surface in v direction
    //* array of nondecreasing knot values in v direction
    //* 3d array of control points (tensor), top to bottom is increasing u direction, left to right is increasing v direction,
    //and where each control point is an array of length (dim+1)
    //* u parameter at which to evaluate the surface point
    //* v parameter at which to evaluate the surface point
    //
    //**returns**
    //
    //* a point represented by an array of length (dim)

    public static function rationalSurfacePoint( surface : NurbsSurfaceData, u : Float, v : Float ) : Point {
        return dehomogenize( surfacePoint( surface, u, v ) );
    }

    //Determine the derivatives of a NURBS curve at a given parameter
    //
    //**params**
    //
    //* NurbsCurveData object representing the curve - the control points are in homogeneous coordinates
    //* parameter on the curve at which the point is to be evaluated
    //* number of derivatives to evaluate
    //
    //**returns**
    //
    //* a point represented by an array of length (dim)

    public static function rationalCurveDerivatives( curve : NurbsCurveData, u : Float, numDerivs : Int = 1  ) : Array<Point> {

        var ders = curveDerivatives( curve, u, numDerivs )
        , Aders = rational1d(ders)
        , wders = weight1d(ders)
        , k = 0
        , i  = 0
        , CK = [];

        for (k in 0...numDerivs+1) {
            var v = Aders[k];

            for (i in 1...k+1) {
                Vec.subMulMutate( v, Binomial.get(k, i) * wders[i], CK[k-i] );
            }
            
            Vec.mulMutate( 1/wders[0], v );
            CK.push( v ); //demogenize
        }

        return CK;

    }

    //Compute a point on a NURBS curve
    //
    //**params**
    //
    //* integer degree of curve
    //* array of nondecreasing knot values
    //* 2d array of homogeneous control points, where each control point is an array of length (dim+1)
    //and form (wi*pi, wi)
    //* parameter on the curve at which the point is to be evaluated
    //
    //**returns**
    //
    //* a point represented by an array of length (dim)

    public static function rationalCurvePoint( curve : NurbsCurveData, u : Float) : Point {
        return dehomogenize( curvePoint( curve, u) );
    }

    //Compute the derivatives on a non-uniform, non-rational B spline surface
    //
    //**params**
    //
    //* NurbsSurfaceData object representing the surface
    //* number of derivatives to evaluate
    //* u parameter at which to evaluate the derivatives
    //* v parameter at which to evaluate the derivatives
    //
    //**returns**
    //
    //* a 2d jagged array representing the derivatives - u derivatives increase by row, v by column

    public static function surfaceDerivatives( surface : NurbsSurfaceData, u : Float, v : Float, numDerivs : Int ) : Array<Array<Point>> {

        var n = surface.knotsU.length - surface.degreeU - 2
        , m = surface.knotsV.length - surface.degreeV - 2;

        return surfaceDerivativesGivenNM( n, m, surface, u, v, numDerivs );

    }

    // Compute the derivatives on a non-uniform, non-rational B spline surface
    // (corresponds to algorithm 3.6 from The NURBS book, Piegl & Tiller 2nd edition)
    //
    //**params**
    //
    //* integer number of basis functions in u dir - 1 = knotsU.length - degreeU - 2
    //* integer number of basis functions in v dir - 1 = knotsU.length - degreeU - 2
    //* NurbsSurfaceData object representing the surface
    //* u parameter at which to evaluate the derivatives
    //* v parameter at which to evaluate the derivatives
    //
    //**returns**
    //
    //* a 2d jagged array representing the derivatives - u derivatives increase by row, v by column

    public static function surfaceDerivativesGivenNM( n : Int,
                                                     m : Int,
                                                     surface : NurbsSurfaceData,
                                                     u : Float,
                                                     v: Float,
                                                     numDerivs : Int ) : Array<Array<Point>>{

        var degreeU = surface.degreeU
        , degreeV = surface.degreeV
        , controlPoints = surface.controlPoints
        , knotsU = surface.knotsU
        , knotsV = surface.knotsV;

        if ( !areValidRelations(degreeU, controlPoints.length, knotsU.length ) ||
            !areValidRelations(degreeV, controlPoints[0].length, knotsV.length ) ) {

            throw 'Invalid relations between control points, knot vector, and n';
        }

        var dim = controlPoints[0][0].length
        , du = numDerivs < degreeU ? numDerivs : degreeU
        , dv = numDerivs < degreeV ? numDerivs : degreeV
        , SKL = Vec.zeros3d( numDerivs+1, numDerivs+1, dim )
        , knotSpan_index_u = knotSpanGivenN( n, degreeU, u, knotsU )
        , knotSpan_index_v = knotSpanGivenN( m, degreeV, v, knotsV )
        , uders = derivativeBasisFunctionsGivenNI( knotSpan_index_u, u, degreeU, n, knotsU )
        , vders = derivativeBasisFunctionsGivenNI( knotSpan_index_v, v, degreeV, m, knotsV )
        , temp = Vec.zeros2d( degreeV+1, dim )
        , dd = 0;

        for (k in 0...du+1){
            for (s in 0...degreeV+1) {
                temp[s] = Vec.zeros1d( dim );

                for (r in 0...degreeU+1){
                    Vec.addMulMutate( temp[s], uders[k][r], controlPoints[knotSpan_index_u-degreeU+r][knotSpan_index_v-degreeV+s]);
                }
            }

            var nk = numDerivs - k;
            dd = nk < dv ? nk : dv;

            for (l in 0...dd+1){
                SKL[k][l] = Vec.zeros1d( dim );

                for (s in 0...degreeV+1){
                    Vec.addMulMutate( SKL[k][l], vders[l][s], temp[s] );
                }
            }
        }

        return SKL;
    }

    //Compute a point on a non-uniform, non-rational B-spline surface
    //
    //**params**
    //
    //* NurbsSurfaceData object representing the surface
    //* u parameter at which to evaluate the surface point
    //* v parameter at which to evaluate the surface point
    //
    //**returns**
    //
    //* a point represented by an array of length (dim)

    public static function surfacePoint( surface : NurbsSurfaceData, u : Float, v : Float) : Point {

        var n = surface.knotsU.length - surface.degreeU - 2
        , m = surface.knotsV.length - surface.degreeV - 2;

        return surfacePointGivenNM( n, m, surface, u, v );

    }

    //Compute a point on a non-uniform, non-rational B spline surface
    // (corresponds to algorithm 3.5 from The NURBS book, Piegl & Tiller 2nd edition)
    //
    //**params**
    //
    //* integer number of basis functions in u dir - 1 = knotsU.length - degreeU - 2
    //* integer number of basis functions in v dir - 1 = knotsV.length - degreeV - 2
    //* NurbsSurfaceData object representing the surface
    //* u parameter at which to evaluate the surface point
    //* v parameter at which to evaluate the surface point
    //
    //**returns**
    //
    //* a point represented by an array of length (dim)

    public static function surfacePointGivenNM( n : Int, m : Int, surface : NurbsSurfaceData, u : Float, v : Float ) : Point {

        var degreeU = surface.degreeU
        , degreeV = surface.degreeV
        , controlPoints = surface.controlPoints
        , knotsU = surface.knotsU
        , knotsV = surface.knotsV;

        if ( !areValidRelations(degreeU, controlPoints.length, knotsU.length ) ||
            !areValidRelations(degreeV, controlPoints[0].length, knotsV.length ) ) {

            throw 'Invalid relations between control points, knot vector, and n';
        }

        var dim = controlPoints[0][0].length
        , knotSpan_index_u = knotSpanGivenN( n, degreeU, u, knotsU )
        , knotSpan_index_v = knotSpanGivenN( m, degreeV, v, knotsV )
        , u_basis_vals = basisFunctionsGivenKnotSpanIndex( knotSpan_index_u, u, degreeU, knotsU )
        , v_basis_vals = basisFunctionsGivenKnotSpanIndex( knotSpan_index_v, v, degreeV, knotsV )
        , uind = knotSpan_index_u - degreeU
        , vind = knotSpan_index_v
        , position = Vec.zeros1d( dim )
        , temp = Vec.zeros1d( dim );

        for (l in 0...degreeV + 1){

            temp = Vec.zeros1d( dim );
            vind = knotSpan_index_v - degreeV + l;

            //sample u isoline
            for (k in 0...degreeU + 1) {
                Vec.addMulMutate( temp, u_basis_vals[k], controlPoints[uind+k][vind] );
            }

            //add point from u isoline
            Vec.addMulMutate( position, v_basis_vals[l], temp );
        }

        return position;
    }

    public static function curveRegularSamplePoints( crv : NurbsCurveData, divs : Int ){

        // initialize the derivative set
        var derivs = curveDerivatives( crv, crv.knots[0], crv.degree );

        // expand the taylor series

        var t = 1.0 / divs;
        var temp = t * t;

        var f = derivs[0];
        var fd = Vec.mul(t, derivs[1] );
        var fdd_per2 = Vec.mul( temp * 0.5, derivs[2] );
        var fddd_per2 = Vec.mul( temp * t * 0.5, derivs[3] );

        var fdd = Vec.add( fdd_per2, fdd_per2 );
        var fddd = Vec.add( fddd_per2, fddd_per2 );
        var fddd_per6 = Vec.mul( 1/3, fddd_per2 );

        // evaluate the points
        var pts = [];

        for (i in 0...divs+1){

            pts.push(dehomogenize(f));

            Vec.addAllMutate([ f, fd, fdd_per2, fddd_per6 ]);
            Vec.addAllMutate([ fd, fdd, fddd_per2 ]);
            Vec.addAllMutate([ fdd, fddd ]);
            Vec.addAllMutate([ fdd_per2, fddd_per2 ]);
        }

        return pts;

    }

    public static function curveRegularSamplePoints2( crv : NurbsCurveData, divs : Int ){

        // initialize the derivative set
        var derivs = curveDerivatives( crv, crv.knots[0], crv.degree );

        // expand the taylor series

        var t = 1.0 / divs;
        var temp = t * t;

        var f = derivs[0];
        var fd = Vec.mul(t, derivs[1] );
        var fdd_per2 = Vec.mul( temp * 0.5, derivs[2] );
        var fddd_per2 = Vec.mul( temp * t * 0.5, derivs[3] );

        var fdd = Vec.add( fdd_per2, fdd_per2 );
        var fddd = Vec.add( fddd_per2, fddd_per2 );
        var fddd_per6 = Vec.mul( 1/3, fddd_per2 );

        // evaluate the points
        var pts = [];

        for (i in 0...divs+1){
            pts.push(dehomogenize(f));

            Vec.addAllMutate([ f, fd, fdd_per2, fddd_per6 ]);
            Vec.addAllMutate([ fd, fdd, fddd_per2 ]);
            Vec.addAllMutate([ fdd, fddd ]);
            Vec.addAllMutate([ fdd_per2, fddd_per2 ]);
        }

        return pts;
    }

    // Compute a regularly spaced grid of derivatives on a non-uniform, rational, B spline surface. Generally, this algorithm
    // is faster than directly evaluating these as we can pre-compute all of the basis function arrays
    //
    //**params**
    //
    //* NurbsSurfaceData object representing the surface
    //* number of divisions in the U direction
    //* number of divisions in the V direction
    //* number of derivatives
    //
    //**returns**
    //
    //* a 2d array of dimension (divsU+1, divsV+1) of derivative values where each entry is similar to that returned by `rationalSurfaceDerivatives`

    public static function rationalSurfaceRegularSampleDerivatives( surface : NurbsSurfaceData, divsU : Int, divsV : Int, numDerivs : Int ) {

        var allders = surfaceRegularSampleDerivatives( surface, divsU, divsV, numDerivs );

        var allratders = [];
        var divsU1 = divsU+1;
        var divsV1 = divsV+1;
        var numDerivs1 = numDerivs+1;

        for (i in 0...divsU1){

            var rowders = [];
            allratders.push(rowders);

            for (j in 0...divsV1){

                var ders = allders[i][j]
                , Aders = rational2d(ders)
                , wders = weight2d(ders)
                , SKL = new Array<Array<Array<Float>>>()
                , dim = Aders[0][0].length;

                for (k in 0...numDerivs1){
                    SKL.push( new Array<Array<Float>>() );

                    for (l in 0...numDerivs1-k){
                        var v = Aders[k][l];

                        for (j in 1...l+1){
                            Vec.subMulMutate( v, Binomial.get(l, j) * wders[0][j], SKL[k][l-j] );
                        }

                        for (i in 1...k+1){
                            Vec.subMulMutate( v, Binomial.get(k, i) * wders[i][0], SKL[k-i][l] );

                            var v2 = Vec.zeros1d(dim);

                            for (j in 1...l+1){
                                Vec.addMulMutate( v2, Binomial.get(l, j) * wders[i][j], SKL[k-i][l-j] );
                            }

                            Vec.subMulMutate( v, Binomial.get(k, i), v2 );

                        }
                            
                        Vec.mulMutate(1 / wders[0][0], v );
                        SKL[k].push( v ); //demogenize
                    }
                }

                rowders.push(SKL);
            }
        }

        return allratders;
    }

    // Compute a regularly spaced grid of derivatives on a non-uniform, non-rational, B spline surface. Generally, this algorithm
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
    //* a 2d array of dimension (divsU+1, divsV+1) of derivative values where each entry is similar to that returned by surfaceDerivatives

    public static function surfaceRegularSampleDerivatives( surface : NurbsSurfaceData, divsU : Int, divsV : Int, numDerivs : Int ) {

        var degreeU = surface.degreeU
        , degreeV = surface.degreeV
        , controlPoints = surface.controlPoints
        , knotsU = surface.knotsU
        , knotsV = surface.knotsV;

        var dim = controlPoints[0][0].length
        , spanU = (knotsU.last() - knotsU[0]) / divsU
        , spanV = (knotsV.last() - knotsV[0]) / divsV
        , knotSpansBasesU = regularlySpacedDerivativeBasisFunctions( degreeU, knotsU, divsU )
        , knotSpansU = knotSpansBasesU.item0
        , basesU = knotSpansBasesU.item1
        , knotSpansBasesV = regularlySpacedDerivativeBasisFunctions( degreeV, knotsV, divsV )
        , knotSpansV = knotSpansBasesV.item0
        , basesV = knotSpansBasesV.item1
        , pts = []
        , divsU1 = divsU+1
        , divsV1 = divsV+1;

        for (i in 0...divsU1){
            var ptsi = [];
            pts.push( ptsi );

            for (j in 0...divsV1){
                ptsi.push( surfaceDerivativesGivenBasesKnotSpans( degreeU, degreeV, controlPoints, knotSpansU[i], knotSpansV[j], basesU[i], basesV[j], dim, numDerivs ) );
            }
        }

        return pts;
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

    public static function rationalSurfaceRegularSamplePoints( surface : NurbsSurfaceData, divsU : Int, divsV : Int ) : Array<Array<Point>> {
        return dehomogenize2d( surfaceRegularSamplePoints( surface, divsU, divsV ) );
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

    public static function surfaceRegularSamplePoints( surface : NurbsSurfaceData, divsU : Int, divsV : Int ) : Array<Array<Point>> {

        var degreeU = surface.degreeU
        , degreeV = surface.degreeV
        , controlPoints = surface.controlPoints
        , knotsU = surface.knotsU
        , knotsV = surface.knotsV;

        var dim = controlPoints[0][0].length
        , spanU = (knotsU.last() - knotsU[0]) / divsU
        , spanV = (knotsV.last() - knotsV[0]) / divsV
        , knotSpansBasesU = regularlySpacedBasisFunctions( degreeU, knotsU, divsU )
        , knotSpansU = knotSpansBasesU.item0
        , basesU = knotSpansBasesU.item1
        , knotSpansBasesV = regularlySpacedBasisFunctions( degreeV, knotsV, divsV )
        , knotSpansV = knotSpansBasesV.item0
        , basesV = knotSpansBasesV.item1
        , pts = []
        , divsU1 = divsU+1
        , divsV1 = divsV+1;

        for (i in 0...divsU1){
            var ptsi = [];
            pts.push( ptsi );

            for (j in 0...divsV1){
                ptsi.push( surfacePointGivenBasesKnotSpans( degreeU, degreeV, controlPoints, knotSpansU[i], knotSpansV[j], basesU[i], basesV[j], dim ) );
            }
        }

        return pts;
    }

    private static function regularlySpacedBasisFunctions( degree : Int, knots : KnotArray, divs : Int ) : Pair<Array<Int>, Array<Array<Float>>> {

        var n : Int = knots.length - degree - 2;
        var span : Float = (knots.last() - knots[0]) / divs;

        var bases = [];
        var knotspans = [];
        var u = knots[0];
        var knotIndex = knotSpanGivenN( n, degree, u, knots );
        var div1 = divs + 1;

        // compute all of the basis functions in given dir
        for (i in 0...div1){
            while ( u >= knots[knotIndex+1] ) knotIndex++;
            knotspans.push( knotIndex );
            bases.push( basisFunctionsGivenKnotSpanIndex( knotIndex, u, degree, knots ) );
            u += span;
        }

        return new Pair<Array<Int>, Array<Array<Float>>>( knotspans, bases );
    }

    private static function regularlySpacedDerivativeBasisFunctions(degree : Int, knots : KnotArray, divs : Int){

        var n : Int = knots.length - degree - 2;
        var span : Float = (knots.last() - knots[0]) / divs;

        var bases = [];
        var knotspans = [];
        var u = knots[0];
        var knotIndex = knotSpanGivenN( n, degree, u, knots );
        var div1 = divs + 1;

        // compute all of the basis functions in given dir
        for (i in 0...div1){
            while ( u >= knots[knotIndex+1] ) knotIndex++;
            knotspans.push( knotIndex );
            bases.push( derivativeBasisFunctionsGivenNI( knotIndex, u, degree, n, knots ) );
            u += span;
        }

        return new Pair<Array<Int>, Array<Array<Array<Float>>>>( knotspans, bases );
    }

    private static function surfacePointGivenBasesKnotSpans( degreeU : Int,
                                                             degreeV : Int,
                                                             controlPoints : Array<Array<Point>>,
                                                             knotSpanU : Int,
                                                             knotSpanV : Int,
                                                             basesU : Array<Float>,
                                                             basesV : Array<Float>,
                                                             dim : Int) : Point {

        var position = Vec.zeros1d( dim )
        , temp : Array<Float>;

        // could be precomputed
        var uind = knotSpanU - degreeU;
        var vind = knotSpanV - degreeV;

        for (l in 0...degreeV + 1){

            temp = Vec.zeros1d( dim );

            for (k in 0...degreeU + 1) {
                Vec.addMulMutate( temp, basesU[k], controlPoints[uind+k][vind] );
            }

            vind++;

            Vec.addMulMutate( position, basesV[l], temp );
        }

        return position;
    }

    private static function surfaceDerivativesGivenBasesKnotSpans(degreeU : Int,
                                                                  degreeV : Int,
                                                                  controlPoints : Array<Array<Point>>,
                                                                  knotSpanU : Int,
                                                                  knotSpanV : Int,
                                                                  basesU : Array<Array<Float>>,
                                                                  basesV : Array<Array<Float>>,
                                                                  dim : Int,
                                                                  numDerivs : Int ){

        var dim = controlPoints[0][0].length
        , du = numDerivs < degreeU ? numDerivs : degreeU
        , dv = numDerivs < degreeV ? numDerivs : degreeV
        , SKL = Vec.zeros3d( du+1, dv+1, dim )
        , temp = Vec.zeros2d( degreeV+1, dim )
        , dd = 0;

        for (k in 0...du+1){
            for (s in 0...degreeV+1) {
                temp[s] = Vec.zeros1d( dim );

                for (r in 0...degreeU+1){
                    Vec.addMulMutate( temp[s], basesU[k][r], controlPoints[knotSpanU-degreeU+r][knotSpanV-degreeV+s] );
                }
            }

            var nk = numDerivs - k;
            dd = nk < dv ? nk : dv;

            for (l in 0...dd+1){
                SKL[k][l] = Vec.zeros1d( dim );

                for (s in 0...degreeV+1){
                    Vec.addMulMutate( SKL[k][l], basesV[l][s], temp[s] );
                }
            }
        }

        return SKL;
    }

    //Determine the derivatives of a non-uniform, non-rational B-spline curve at a given parameter
    //
    //**params**
    //
    //* NurbsCurveData object representing the curve
    //* parameter on the curve at which the point is to be evaluated
    //* number of derivatives to evaluate
    //
    //**returns**
    //
    //* a point represented by an array of length (dim)

    public static function curveDerivatives( crv : NurbsCurveData, u : Float, numDerivs : Int ) : Array<Point> {

        var n = crv.knots.length - crv.degree - 2;
        return curveDerivativesGivenN( n, crv, u, numDerivs);

    }

    //Determine the derivatives of a non-uniform, non-rational B-spline curve at a given parameter
    // (corresponds to algorithm 3.1 from The NURBS book, Piegl & Tiller 2nd edition)
    //
    //**params**
    //
    //* integer number of basis functions - 1 = knots.length - degree - 2
    //* NurbsCurveData object representing the curve
    //* parameter on the curve at which the point is to be evaluated
    //
    //**returns**
    //
    //* a point represented by an array of length (dim)

    public static function curveDerivativesGivenN( n : Int, curve : NurbsCurveData, u : Float, numDerivs : Int ) : Array<Point> {

        var degree = curve.degree
        , controlPoints = curve.controlPoints
        , knots = curve.knots;

        if ( !areValidRelations( degree, controlPoints.length, knots.length ) ) {
            throw 'Invalid relations between control points, knot vector, and n';
        }

        var dim = controlPoints[0].length
        , du = numDerivs < degree ? numDerivs : degree
        , CK = Vec.zeros2d( numDerivs+1, dim )
        , knotSpan_index = knotSpanGivenN( n, degree, u, knots )
        , nders = derivativeBasisFunctionsGivenNI( knotSpan_index, u, degree, du, knots )
        , k = 0
        , j = 0;

        for (k in 0...du+1) {
            for (j in 0...degree+1){
                Vec.addMulMutate( CK[k], nders[k][j], controlPoints[ knotSpan_index - degree + j ] );
            }
        }
        return CK;
    }

    //Compute a point on a non-uniform, non-rational b-spline curve
    //
    //**params**
    //
    //* NurbsCurveData object representing the curve
    //* parameter on the curve at which the point is to be evaluated
    //
    //**returns**
    //
    //* a point represented by an array of length (dim)

    public static function curvePoint( curve : NurbsCurveData, u : Float) {
        var n = curve.knots.length - curve.degree - 2;
        return curvePointGivenN( n, curve, u);
    }

    //Confirm the relations between degree (p), number of control points(n+1), and the number of knots (m+1)
    //via The NURBS Book (section 3.2, Second Edition)
    //
    //**params**
    //
    //* integer degree
    //* integer number of control points
    //* integer length of the knot Array (including duplicate knots)
    //
    //**returns**
    //
    //* whether the values are correct

    public static function areValidRelations( degree : Int, num_controlPoints : Int, knots_length : Int ) : Bool {
        return num_controlPoints + degree + 1 - knots_length == 0;
    }

    //Compute a point on a non-uniform, non-rational b-spline curve
    // (corresponds to algorithm 3.1 from The NURBS book, Piegl & Tiller 2nd edition)
    //
    //**params**
    //
    //* integer number of basis functions - 1 = knots.length - degree - 2
    //* NurbsCurveData object representing the curve
    //* parameter on the curve at which the point is to be evaluated
    //
    //**returns**
    //
    //* a point represented by an array of length (dim)

    public static function curvePointGivenN( n : Int, curve : NurbsCurveData, u : Float) : Point {

        var degree = curve.degree
            , controlPoints = curve.controlPoints
            , knots = curve.knots;

        if ( !areValidRelations( degree, controlPoints.length, knots.length ) ) {
            throw 'Invalid relations between control points, knot Array, and n';
            return null;
        }

        var knotSpan_index = knotSpanGivenN( n, degree, u, knots );
        var basis_values = basisFunctionsGivenKnotSpanIndex( knotSpan_index, u, degree, knots );
        var position = Vec.zeros1d( controlPoints[0].length );

        for (j in 0...degree+1){
            Vec.addMulMutate( position, basis_values[j], controlPoints[ knotSpan_index - degree + j ] );
        }

        return position;
    }

    //Compute a point in a non-uniform, non-rational B spline volume
    //
    //**params**
    //
    //* VolumeData
    //* u parameter at which to evaluate the volume point
    //* v parameter at which to evaluate the volume point
    //* w parameter at which to evaluate the volume point
    //
    //**returns**
    //
    //* a point represented by an array of length (dim)

    public static function volumePoint( volume : VolumeData, u : Float, v : Float, w : Float ) : Point {
        var n = volume.knotsU.length - volume.degreeU - 2
        , m = volume.knotsV.length - volume.degreeV - 2
        , l = volume.knotsW.length - volume.degreeW - 2;

        return volumePointGivenNML( volume, n, m, l, u, v, w );
    }

    //Compute a point in a non-uniform, non-rational B spline volume
    //
    //**params**
    //
    //* VolumeData
    //* u parameter at which to evaluate the volume point
    //* v parameter at which to evaluate the volume point
    //* w parameter at which to evaluate the volume point
    //
    //**returns**
    //
    //* a point represented by an array of length (dim)

    public static function volumePointGivenNML( volume : VolumeData,
                                                n : Int,
                                                m : Int,
                                                l : Int,
                                                u : Float,
                                                v : Float,
                                                w : Float  ) : Point {

        if ( !areValidRelations(volume.degreeU, volume.controlPoints.length, volume.knotsU.length ) ||
        !areValidRelations(volume.degreeV, volume.controlPoints[0].length, volume.knotsV.length ) ||
        !areValidRelations(volume.degreeW, volume.controlPoints[0][0].length, volume.knotsW.length ) ) {
            throw 'Invalid relations between control points and knot vector';
        }

        var controlPoints = volume.controlPoints
        , degreeU = volume.degreeU
        , degreeV = volume.degreeV
        , degreeW = volume.degreeW
        , knotsU = volume.knotsU
        , knotsV = volume.knotsV
        , knotsW = volume.knotsW;

        var dim = controlPoints[0][0][0].length
        , knotSpan_index_u = knotSpanGivenN( n, degreeU, u, knotsU )
        , knotSpan_index_v = knotSpanGivenN( m, degreeV, v, knotsV )
        , knotSpan_index_w = knotSpanGivenN( l, degreeW, w, knotsW )
        , u_basis_vals = basisFunctionsGivenKnotSpanIndex( knotSpan_index_u, u, degreeU, knotsU )
        , v_basis_vals = basisFunctionsGivenKnotSpanIndex( knotSpan_index_v, v, degreeV, knotsV )
        , w_basis_vals = basisFunctionsGivenKnotSpanIndex( knotSpan_index_w, w, degreeW, knotsW )
        , uind = knotSpan_index_u - degreeU
        , position = Vec.zeros1d( dim )
        , temp = Vec.zeros1d( dim )
        , temp2 = Vec.zeros1d( dim );

        for ( i in 0...degreeW + 1 ){

            temp2 = Vec.zeros1d( dim );
            var wind = knotSpan_index_w - degreeW + i;

            for ( j in 0...degreeV + 1 ){

                temp = Vec.zeros1d( dim );
                var vind = knotSpan_index_v  - degreeV + j;

                for ( k in 0...degreeU + 1 ){
                    Vec.addMulMutate( temp, u_basis_vals[k], controlPoints[uind+k][vind][wind] );
                }

             //add weighted contribution of u isoline
                Vec.addMulMutate( temp2, v_basis_vals[j], temp );
            }

            //add weighted contribution from uv isosurfaces
            Vec.addMulMutate( position, w_basis_vals[i], temp2 );
        }

        return position;
    }

    //Compute the non-vanishing basis functions and their derivatives
    //
    //**params**
    //
    //* float parameter
    //* integer degree
    //* array of nondecreasing knot values
    //
    //**returns**
    //
    //* 2d array of basis and derivative values of size (n+1, p+1) The nth row is the nth derivative and the first row is made up of the basis function values.

    public static function derivativeBasisFunctions( u : Float, degree : Int, knots : KnotArray ): Array<Array<Float>>
    {
        var knotSpan_index = knotSpan( degree, u, knots )
        , m = knots.length - 1
        , n = m - degree - 1;

        return derivativeBasisFunctionsGivenNI( knotSpan_index, u, degree, n, knots );
    }

    // Compute the non-vanishing basis functions and their derivatives
    // (corresponds to algorithm 2.3 from The NURBS book, Piegl & Tiller 2nd edition)
    //
    //**params**
    //
    //* integer knot span index
    //* float parameter
    //* integer degree
    //* integer number of basis functions - 1 = knots.length - degree - 2
    //* array of nondecreasing knot values
    //
    //**returns**
    //
    //* 2d array of basis and derivative values of size (n+1, p+1) The nth row is the nth derivative and the first row is made up of the basis function values.

    public static function derivativeBasisFunctionsGivenNI( knotIndex : Int, u : Float, p : Int,
                                                            n : Int, knots : KnotArray ) : Array<Array<Float>>
    {
        var ndu = Vec.zeros2d( p+1, p+1 )
        , left = Vec.zeros1d( p + 1 )
        , right = Vec.zeros1d( p + 1 )
        , saved = 0.0
        , temp = 0.0;

        ndu[0][0] = 1.0;

        for(j in 1...p+1){
            left[j] = u - knots[knotIndex+1-j];
            right[j] = knots[knotIndex+j] - u;
            saved = 0.0;

            for (r in 0...j){
                ndu[j][r] = right[r+1] + left[j-r];
                temp = ndu[r][j-1] / ndu[j][r];

                ndu[r][j] = saved + right[r+1]*temp;
                saved = left[j-r]*temp;

            }
            ndu[j][j] = saved;
        }

        var ders = Vec.zeros2d(n+1, p+1)
            , a = Vec.zeros2d(2, p+1)
            , s1 : Int = 0
            , s2 : Int = 1
            , d : Float = 0.0
            , rk : Int = 0
            , pk : Int = 0
            , j1 : Int = 0
            , j2 : Int = 0;

        for (j in 0...p+1){
            ders[0][j] = ndu[j][p];
        }

        for (r in 0...p+1){
            s1 = 0;
            s2 = 1;
            a[0][0] = 1.0;

            for (k in 1...n+1)
            {
                d = 0.0;
                rk = r - k;
                pk = p - k;

                if (r >= k) {
                    a[s2][0] = a[s1][0] / ndu[pk+1][rk];
                    d = a[s2][0] * ndu[rk][pk];
                }

                if (rk >= -1) {
                    j1 = 1;
                } else {
                    j1 = -rk;
                }

                if (r-1 <= pk) {
                    j2 = k-1;
                } else {
                    j2 = p - r;
                }

                for (j in j1...j2+1) {
                    a[s2][j] = ( a[s1][j] - a[s1][ j - 1 ] ) / ndu[ pk + 1 ][ rk + j ];
                    d += a[s2][j]*ndu[rk+j][pk];
                }

                if (r <= pk){
                    a[s2][k] = -a[s1][k-1]/ndu[pk+1][r];
                    d += a[s2][k] * ndu[r][pk];
                }

                ders[k][r] = d;

                var temp = s1;
                s1 = s2;
                s2 = temp;
            }
        }

        var acc = p;
        for (k in 1...n+1) {
            for (j in 0...p+1){
                ders[k][j] *= acc;
            }
            acc *= (p-k);
        }

        return ders;
    }


    //Compute the non-vanishing basis functions
    //
    //**params**
    //
    //* float parameter
    //* integer degree of function
    //* array of nondecreasing knot values
    //
    //**returns**
    //
    //* list of non-vanishing basis functions
    //

    public static function basisFunctions( u : Float, degree : Int, knots : KnotArray) : Array<Float>
    {
        var knotSpan_index = knotSpan(degree, u, knots);
        return basisFunctionsGivenKnotSpanIndex( knotSpan_index, u, degree, knots );
    }

    //Compute the non-vanishing basis functions
    // (corresponds to algorithm 2.2 from The NURBS book, Piegl & Tiller 2nd edition)
    //
    //**params**
    //
    //* *Number*, integer knot span index
    //* *Number*, float parameter
    //* *Number*, integer degree of function
    //* array of nondecreasing knot values
    //
    //**returns**
    //
    //* list of non-vanishing basis functions
    //

    public static function basisFunctionsGivenKnotSpanIndex( knotSpan_index : Int,
                                                                  u : Float,
                                                                  degree : Int,
                                                                  knots : KnotArray ) : Array<Float>
    {
        var basisFunctions = Vec.zeros1d( degree + 1 );
        var left = Vec.zeros1d( degree + 1 );
        var right = Vec.zeros1d( degree + 1 );
        var saved : Float = 0;
        var temp : Float = 0;

        basisFunctions[0] = 1.0;

        for( j in 1...degree+1 ){
            left[j] = u - knots[knotSpan_index+1-j];
            right[j] = knots[knotSpan_index+j] - u;
            saved = 0.0;

            for (r in 0...j){
                temp = basisFunctions[r] / ( right[r+1] + left[j-r] );
                basisFunctions[r] = saved + right[r+1]*temp;
                saved = left[j-r]*temp;
            }

            basisFunctions[j] = saved;
        }

        return basisFunctions;
    }

    //Find the span on the knot Array without supplying n
    //
    //**params**
    //
    //* integer degree of function
    //* float parameter
    //* array of nondecreasing knot values
    //
    //**returns**
    //
    //* the index of the knot span
    //

    public static function knotSpan( degree : Int, u : Float, knots : Array<Float> ) : Int
    {
        return knotSpanGivenN(knots.length - degree - 2, degree, u, knots);
    }

    //Find the span on the knot Array knots of the given parameter
    // (corresponds to algorithm 2.1 from The NURBS book, Piegl & Tiller 2nd edition)
    //
    //**params**
    //
    //* integer number of basis functions - 1 = knots.length - degree - 2
    //* integer degree of function
    //* parameter
    //* array of nondecreasing knot values
    //
    //**returns**
    //
    //* the index of the knot span
    //

    public static function knotSpanGivenN( n : Int, degree : Int, u : Float, knots : Array<Float> ) : Int
    {
        if ( u > knots[n+1] - Constants.EPSILON )
        {
            return n;
        }

        if ( u < knots[degree] + Constants.EPSILON )
        {
            return degree;
        }

        var low = degree
            , high = n+1
            , mid = Math.floor( (low + high) / 2 );

        while( u < knots[ mid ] || u >= knots[ mid + 1 ] )
        {
            if ( u < knots[ mid ] )
            {
                high = mid;
            }
            else
            {
                low = mid;
            }
            mid = Math.floor( (low + high) / 2 );
        }

        return mid;
    }

    //Dehomogenize a point
    //
    //**params**
    //
    //* a point represented by an array (wi*pi, wi) with length (dim+1)
    //
    //**returns**
    //
    //* a point represented by an array pi with length (dim)

    public static function dehomogenize( homoPoint : Point ) : Point {

        var dim = homoPoint.length
        , point = []
        , wt = homoPoint[dim-1]
        , l = homoPoint.length - 1;

        for (i in 0...l){
            point.push( homoPoint[i] / wt );
        }

        return point;
    }

    //Obtain the point from a point in homogeneous space without dehomogenization, assuming all are the same
    //length
    //
    //**params**
    //
    //* array of points represented by an array (wi*pi, wi) with length (dim+1)
    //
    //**returns**
    //
    //* array of points represented by an array (wi*pi) with length (dim)

    public static function rational1d( homoPoints : Array<Point> ) : Array<Point> {
        var dim = homoPoints[0].length - 1;
        return homoPoints.map(function(x : Point){ return x.slice(0,dim); });
    }

    //Obtain the weight from a collection of points in homogeneous space, assuming all
    //are the same dimension
    //
    //**params**
    //
    //* array of arrays of of points represented by an array (wi*pi, wi) with length (dim+1)
    //
    //**returns**
    //
    //*  array of arrays of points, each represented by an array pi with length (dim)

    public static function rational2d( homoPoints : Array<Array<Point>> ) : Array<Array<Point>> {
        return homoPoints.map(rational1d);
    }

    //Obtain the weight from a collection of points in homogeneous space, assuming all
    //are the same dimension
    //
    //**params**
    //
    //* array of points represented by an array (wi*pi, wi) with length (dim+1)
    //
    //**returns**
    //
    //* a point represented by an array pi with length (dim)

    public static function weight1d( homoPoints : Array<Point> ) : Array<Float> {
        var dim = homoPoints[0].length - 1;
        return homoPoints.map(function(x){ return x[dim]; });
    }

    //Obtain the weight from a collection of points in homogeneous space, assuming all
    //are the same dimension
    //
    //**params**
    //
    //* array of arrays of of points represented by an array (wi*pi, wi) with length (dim+1)
    //
    //**returns**
    //
    //*  array of arrays of points, each represented by an array pi with length (dim)

    public static function weight2d( homoPoints : Array<Array<Point>> ) : Array<Array<Float>> {
        return homoPoints.map(weight1d);
    }

    //Dehomogenize an array of points
    //
    //**params**
    //
    //* array of points represented by an array (wi*pi, wi) with length (dim+1)
    //
    //**returns**
    //
    //* an array of points, each of length dim

    public static function dehomogenize1d( homoPoints : Array<Point> ) : Array<Point>{
        return homoPoints.map(dehomogenize);
    }

    //Dehomogenize a 2d array of pts
    //
    //**params**
    //
    //* array of arrays of points represented by an array (wi*pi, wi) with length (dim+1)
    //
    //**returns**
    //
    //* array of arrays of points, each of length dim

    public static function dehomogenize2d( homoPoints : Array<Array<Point>> ) : Array<Array<Point>> {
        return homoPoints.map(dehomogenize1d);
    }

    //Transform a 1d array of points into their homogeneous equivalents
    //
    //**params**
    //
    //* 1d array of control points, (actually a 2d array of size (m x dim) )
    //* array of control point weights, the same size as the array of control points (m x 1)
    //
    //**returns**
    //
    //* 1d array of control points where each point is (wi*pi, wi) where wi
    //i the ith control point weight and pi is the ith control point,
    //hence the dimension of the point is dim + 1

    public static function homogenize1d( controlPoints : Array<Point>, weights : Array<Float> = null) : Array<Point> {

        var rows = controlPoints.length
        , dim = controlPoints[0].length
        , homo_controlPoints = new Array<Point>()
        , wt : Float = 0.0
        , ref_pt = new Point()
        , weights = weights != null ? weights : Vec.rep( controlPoints.length, 1.0 );

        for (i in 0...rows) {

            var pt = [];
            ref_pt = controlPoints[i];
            wt = weights[i];

            for (k in 0...dim) {
                pt.push( ref_pt[k] * wt );
            }

            //append the weight
            pt.push(wt);

            homo_controlPoints.push(pt);
        }

        return homo_controlPoints;

    }

    //**params**
    //
    //* 2d array of control points, (actually a 3d array of size m x n x dim)
    //* array of control point weights, the same size as the control points array (m x n x 1)
    //
    //**returns**
    //
    //* 1d array of control points where each point is (wi*pi, wi) where wi
    //i the ith control point weight and pi is the ith control point, the size is
    // (m x n x dim+1)

    public static function homogenize2d( controlPoints : Array<Array<Point>>,
                                         weights: Array<Array<Float>> = null ) : Array<Array<Point>> {
        var rows = controlPoints.length
        , homo_controlPoints = new Array<Array<Point>>()
        , weights = weights != null ? weights : [ for (i in 0...rows ) Vec.rep( controlPoints[0].length, 1.0 ) ];

        for (i in 0...rows) {
            homo_controlPoints.push( homogenize1d(controlPoints[i], weights[i]) );
        }

        return homo_controlPoints;
    }

}

/*
//
//Compute the gaussian curvature on a non-uniform, non-rational B spline surface
//
//**params**
//* integer degree of surface in u direction
//* array of nondecreasing knot values in u direction
//* integer degree of surface in v direction
//* array of nondecreasing knot values in v direction
//* 3d array of control points, where rows are the u dir, and columns run alonsg the positive v direction,
//and where each control point is an array of length (dim)
//* u parameter at which to evaluate the derivatives
//* v parameter at which to evaluate the derivatives
//
//**returns**
//* a point represented by an array of length (dim)
//

public static function rational_surface_curvature( degree_u, knots_u, degree_v, knots_v, homo_control_points, u, v ) {

//compute the first fundamental form

//symmetric matrix where
//
//I = [ E F; F G ]
//
//where:
//
//E = Xu * Xu
//F = Xu * Xv
//G = Xv * Xv

//second fundamental form (shape operator)

//symmetric matrix where
//
//II = [ L M; M N ]
//
//where:
//
//L = Xuu * n
//M = Xuv * n
//N = Xvv * n

//principal curvatures are the eigenvalues of the second fundamental form

var derivs = rational_surface_derivs( 	degree_u,
knots_u,
degree_v,
knots_v,
homo_control_points,
2, u, v );


//structure of the derivatives

//pos  du  vuu
//dv   duv
//dvv

var du = derivs[0][1];
var dv = derivs[1][0];
var duu = derivs[0][2];
var dvv = derivs[2][0];
var duv = derivs[1][1];

var n = Vec.cross( du, dv );
var L = Vec.dot( duu, n );
var M = Vec.dot( duv, n );
var N = Vec.dot( dvv, n );

var shapeOperator = [ [ L, M ], [ M, N ] ];

var eigs = Vec.eig( shapeOperator );

//contains: lambda - x
// 			     E - x

var k1 = eigs.lambda.x[0];
var k2 = eigs.lambda.x[1];
var mean = 0.5 * ( k1 + k2 );
var gaussian = k1 * k2;
var p1 = Vec.add( Vec.mul( eigs.E.x[0][0], du ), Vec.mul( eigs.E.x[0][1], dv ) );
var p2 = Vec.add( Vec.mul( eigs.E.x[1][0], du ), Vec.mul( eigs.E.x[1][1], dv ) );

return { point: derivs[0][0], normal: n, mean: mean, gaussian: gaussian, shapeOperator: shapeOperator, k1: k1, k2: k2, p1: p1, p2: p2, p1p : eigs.E.x[0], p2p: eigs.E.x[1]  };

};
*/
