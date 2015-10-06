package verb.eval;

import verb.geom.NurbsSurface;
import verb.core.Vec;
using verb.core.Vec;
import verb.core.Data;

import verb.core.Constants;
import verb.core.Trig;
import verb.core.Mat;

import verb.core.ArrayExtensions;
using verb.core.ArrayExtensions;

// `Make` provides algorithms for generating NURBS representations of various special surfaces and curves. One of the very
// desirable properties of NURBS is the ability to represent common curve types like conics in NURBS. As a result, verb
// is able to represent many curve types with exceptional economy as many of the algorithms (for example, for intersection)
// can be reused.
//
// This class includes methods for building:
//
//* conics
//* polylines
//* lofts
//* swept surfaces
//
// Many of these algorithms owe their implementation to Piegl & Tiller's "The NURBS Book"

@:expose("eval.Make")
class Make {

    //Generate a surface by translating a profile curve along a rail curve
    //
    //**params**
    //
    //* profile NurbsCurveData
    //* rail NurbsCurveData
    //
    //**returns**
    //
    //* NurbsSurfaceData object

    public static function rationalTranslationalSurface( profile : NurbsCurveData, rail : NurbsCurveData ) : NurbsSurfaceData {

        var pt0 = Eval.rationalCurvePoint( rail, rail.knots.first() )
            , startu = rail.knots.first()
            , endu = rail.knots.last()
            , numSamples = 2 * rail.controlPoints.length
            , span = ( endu - startu ) / (numSamples-1);

        var crvs = [];

        for ( i in 0...numSamples ){

            var pt = Vec.sub( Eval.rationalCurvePoint( rail, startu + i * span ), pt0 );

            var crv = Modify.rationalCurveTransform(profile, [[1,0,0,pt[0]], [0,1,0,pt[1]], [0,0,1,pt[2]], [0,0,0,1]]);
            crvs.push( crv );

        }

        return Make.loftedSurface( crvs );
    }

    //Extract the boundary curves from a surface
    //
    //**returns**
    //
    //* an array containing 4 elements, first 2 curves in the V direction, then 2 curves in the U direction

    public static function surfaceBoundaryCurves(surface : NurbsSurfaceData) : Array<NurbsCurveData> {
        var crvs = [];

        var c0 = Make.surfaceIsocurve( surface, surface.knotsU.first(), false );
        var c1 = Make.surfaceIsocurve( surface, surface.knotsU.last(), false );
        var c2 = Make.surfaceIsocurve( surface, surface.knotsV.first(), true );
        var c3 = Make.surfaceIsocurve( surface, surface.knotsV.last(), true );

        return [c0, c1, c2, c3];
    }


    public static function surfaceIsocurve( surface : NurbsSurfaceData, u : Float, useV : Bool = false ) : NurbsCurveData {

        var knots = useV ? surface.knotsV : surface.knotsU;
        var degree = useV ? surface.degreeV : surface.degreeU;

        var knotMults = Analyze.knotMultiplicities( knots );

        //if the knot already exists in the array, don't make duplicates
        var reqKnotIndex : Int = -1;
        for ( i in 0...knotMults.length ){
            if ( Math.abs( u - knotMults[i].knot ) < Constants.EPSILON ){
                reqKnotIndex = i;
                break;
            }
        }

        var numKnotsToInsert = degree + 1;
        if (reqKnotIndex >= 0){
            numKnotsToInsert = numKnotsToInsert - knotMults[reqKnotIndex].mult;
        }

        //insert the knots
        var newSrf = numKnotsToInsert > 0 ? Modify.surfaceKnotRefine( surface, Vec.rep(numKnotsToInsert, u), useV ) : surface;

        //obtain the correct index of control points to extract
        var span = Eval.knotSpan( degree, u, knots );

        if ( Math.abs( u - knots.first() ) < Constants.EPSILON  ){
            span = 0;
        } else if ( Math.abs( u - knots.last() ) < Constants.EPSILON ) {
            span = ( if (useV) newSrf.controlPoints[0].length else newSrf.controlPoints.length ) - 1;
        }

        if (useV){
            return new NurbsCurveData( newSrf.degreeU, newSrf.knotsU, [ for (row in newSrf.controlPoints) row[span] ]);
        }

        return new NurbsCurveData( newSrf.degreeV, newSrf.knotsV, newSrf.controlPoints[span] );
    }

    public static function loftedSurface( curves : Array<NurbsCurveData>, degreeV : Int = null ) : NurbsSurfaceData {

        curves = Modify.unifyCurveKnotVectors( curves );

        //degree
        var degreeU = curves[0].degree;
        if (degreeV == null) degreeV = 3;
        if (degreeV > curves.length - 1){
            degreeV = curves.length - 1;
        }

        //knots
        var knotsU = curves[0].knots;

        var knotsV = [];
        var controlPoints = [];
        for ( i in 0...curves[0].controlPoints.length ){

            //extract the ith control pt of each curve
            var points = curves.map(function(x){
                return x.controlPoints[i];
            });

            //construct an interpolating curve using this list
            var c = Make.rationalInterpCurve( points, degreeV, true );
            controlPoints.push( c.controlPoints );
            knotsV = c.knots; //redundant computation
        }

        return new NurbsSurfaceData( degreeU, degreeV, knotsU, knotsV, controlPoints );
    }

    public static function clonedCurve( curve : NurbsCurveData ) : NurbsCurveData {
        return new NurbsCurveData( curve.degree, curve.knots.copy(), curve.controlPoints.map(function(x){ return x.copy(); }) );
    }

    //Generate the control points, weights, and knots for a bezier curve of any degree
    //
    //**params**
    //
    //* first point in counter-clockwise form
    //* second point in counter-clockwise form
    //* third point in counter-clockwise form
    //* forth point in counter-clockwise form
    //
    //**returns**
    //
    //* NurbsSurfaceData object

    public static function rationalBezierCurve( controlPoints : Array<Point>, weights : Array<Float> = null ) : NurbsCurveData {

        var degree = controlPoints.length - 1;

        var knots = [];
        for (i in 0...degree+1) { knots.push(0.0); }
        for (i in 0...degree+1) { knots.push(1.0); }

        //if weights aren't provided, build uniform weights
        if (weights == null) weights = Vec.rep( controlPoints.length, 1.0 );

        return new NurbsCurveData( degree, knots, Eval.homogenize1d( controlPoints, weights ));
    }

    //Generate the control points, weights, and knots of a surface defined by 4 points
    //
    //**params**
    //
    //* first point in counter-clockwise form
    //* second point in counter-clockwise form
    //* third point in counter-clockwise form
    //* forth point in counter-clockwise form
    //
    //**returns**
    //
    //* NurbsSurfaceData object

   public static function fourPointSurface( p1 : Point, p2 : Point, p3 : Point, p4 : Point, degree : Int = 3 ) : NurbsSurfaceData {

        var degreeFloat : Float = degree;

        var pts = [];
        for (i in 0...degree+1){

            var row = [];
            for (j in 0...degree+1){

                var l = 1.0 - i / degreeFloat;
                var p1p2 = Vec.lerp( l, p1, p2 );
                var p4p3 = Vec.lerp( l, p4, p3 );

                var res = Vec.lerp( 1.0 - j / degreeFloat, p1p2, p4p3 );
                res.push(1.0); //add the weight

                row.push(res);
            }

            pts.push( row );
        }

       var zeros = Vec.rep(degree+1, 0.0);
       var ones = Vec.rep(degree+1, 1.0);

       return new NurbsSurfaceData( degree, degree, zeros.concat(ones), zeros.concat(ones), pts );

    }

    //Generate the control points, weights, and knots of an elliptical arc
    //
    //**params**
    //
    //* the center
    //* the scaled x axis
    //* the scaled y axis
    //* start angle of the ellipse arc, between 0 and 2pi, where 0 points at the xaxis
    //* end angle of the arc, between 0 and 2pi, greater than the start angle
    //
    //**returns**
    //
    //* a NurbsCurveData object representing a NURBS curve

    public static function ellipseArc( center : Point, xaxis : Point, yaxis : Point, startAngle : Float, endAngle : Float ) : NurbsCurveData {

        var xradius = Vec.norm( xaxis );
        var yradius = Vec.norm( yaxis );

        xaxis = Vec.normalized( xaxis );
        yaxis = Vec.normalized( yaxis );

        //if the end angle is less than the start angle, do a circle
        if (endAngle < startAngle) endAngle = 2.0 * Math.PI + startAngle;

        var theta = endAngle - startAngle
        , numArcs = 0;

        //how many arcs?
        if (theta <= Math.PI / 2) {
            numArcs = 1;
        } else {
            if (theta <= Math.PI){
                numArcs = 2;
            } else if (theta <= 3 * Math.PI / 2){
                numArcs = 3;
            } else {
                numArcs = 4;
            }
        }

        var dtheta = theta / numArcs
        , n = 2 * numArcs
        , w1 = Math.cos( dtheta / 2)
        , P0 = Vec.add( center, Vec.add( Vec.mul( xradius * Math.cos(startAngle), xaxis), Vec.mul( yradius * Math.sin(startAngle), yaxis ) ) )
        , T0 = Vec.sub( Vec.mul( Math.cos(startAngle), yaxis ), Vec.mul( Math.sin(startAngle), xaxis) )
        , controlPoints = []
        , knots = Vec.zeros1d( 2 *numArcs + 3 )
        , index = 0
        , angle = startAngle
        , weights = Vec.zeros1d( numArcs * 2 );

        controlPoints[0] = P0;
        weights[0] = 1.0;

        for (i in 1...numArcs+1){

            angle += dtheta;
            var P2 = Vec.add( center,
                                Vec.add( Vec.mul( xradius * Math.cos(angle), xaxis), Vec.mul( yradius * Math.sin(angle), yaxis ) ) );

            weights[index+2] = 1;
            controlPoints[index+2] = P2;

            var T2 = Vec.sub( Vec.mul( Math.cos(angle), yaxis ), Vec.mul( Math.sin(angle), xaxis) );

            var inters = Intersect.rays(P0, Vec.mul( 1 / Vec.norm(T0), T0), P2, Vec.mul( 1 / Vec.norm(T2), T2));
            var P1 = Vec.add( P0, Vec.mul(inters.u0, T0));

            weights[index+1] = w1;
            controlPoints[index+1] = P1;

            index += 2;

            if (i < numArcs){
                P0 = P2;
                T0 = T2;
            }
        }

        var j = 2 * numArcs + 1;

        for (i in 0...3){
            knots[i] = 0.0;
            knots[i+j] = 1.0;
        }

        switch (numArcs){
            case 2:
                knots[3] = knots[4] = 0.5;
            case 3:
                knots[3] = knots[4] = 1/3;
                knots[5] = knots[6] = 2/3;
            case 4:
                knots[3] = knots[4] = 0.25;
                knots[5] = knots[6] = 0.5;
                knots[7] = knots[8] = 0.75;
        }

        return new NurbsCurveData( 2, knots, Eval.homogenize1d( controlPoints, weights ));
    }


    //Generate the control points, weights, and knots of an arbitrary arc
    // (Corresponds to Algorithm A7.1 from Piegl & Tiller)
    //
    //**params**
    //
    //* the center of the arc
    //* the xaxis of the arc
    //* orthogonal yaxis of the arc
    //* radius of the arc
    //* start angle of the arc, between 0 and 2pi
    //* end angle of the arc, between 0 and 2pi, greater than the start angle
    //
    //**returns**
    //
    //* a NurbsCurveData object representing a NURBS curve

    public static function arc( center : Point, xaxis : Vector, yaxis : Vector, radius : Float, startAngle : Float,
                                endAngle : Float ) : NurbsCurveData {
        return ellipseArc(  center, Vec.mul( radius, Vec.normalized( xaxis ) ), Vec.mul( radius, Vec.normalized( yaxis ) ), startAngle, endAngle );
    }

    //Generate the control points, weights, and knots of a polyline curve
    //
    //**params**
    //
    //* array of points in curve
    //
    //**returns**
    //
    //* a NurbsCurveData object representing a NURBS curve

    public static function polyline( pts : Array<Point>) : NurbsCurveData {

        var knots = [0.0,0.0];
        var lsum = 0.0;

        for (i in 0...pts.length-1) {
            lsum += Vec.dist( pts[i], pts[i+1] );
            knots.push( lsum );
        }
        knots.push( lsum );

        //normalize the knot array
        knots = Vec.mul( 1 / lsum, knots );

        var weights = [ for (i in 0...pts.length) 1.0 ];

        return new NurbsCurveData( 1, knots, Eval.homogenize1d(pts.slice(0), weights ));

    }

    //Generate the control points, weights, and knots of an extruded surface
    //
    //**params**
    //
    //* axis of the extrusion
    //* length of the extrusion
    //* a NurbsCurveData object representing a NURBS surface
    //
    //**returns**
    //
    //* an object with the following properties: controlPoints, weights, knots, degree

    public static function extrudedSurface( axis : Point, length : Float, profile : NurbsCurveData ) : NurbsSurfaceData {

        var controlPoints = [[],[],[]]
        , weights = [[],[],[]];

        var prof_controlPoints = Eval.dehomogenize1d( profile.controlPoints );
        var prof_weights = Eval.weight1d( profile.controlPoints );

        var translation = Vec.mul( length, axis );
        var halfTranslation = Vec.mul( 0.5 * length, axis );

        //original control points
        for (j in 0...prof_controlPoints.length){

            controlPoints[2][j] = prof_controlPoints[j];
            controlPoints[1][j] = Vec.add( halfTranslation, prof_controlPoints[j] );
            controlPoints[0][j] = Vec.add( translation, prof_controlPoints[j] );

            weights[0][j] = prof_weights[j];
            weights[1][j] = prof_weights[j];
            weights[2][j] = prof_weights[j];
        }

        return new NurbsSurfaceData( 2, profile.degree, [0,0,0,1,1,1], profile.knots, Eval.homogenize2d( controlPoints, weights) );
    }

    //Generate the control points, weights, and knots of a cylinder
    //
    //**params**
    //
    //* normalized axis of cylinder
    //* xaxis in plane of cylinder
    //* position of base of cylinder
    //* height from base to top
    //* radius of the cylinder
    //
    //**returns**
    //
    //* an object with the following properties: controlPoints, weights, knotsU, knotsV, degreeU, degreeV

    public static function cylindricalSurface( axis : Point, xaxis : Point, base : Point, height : Float, radius : Float ) : NurbsSurfaceData {

        var yaxis = Vec.cross( axis, xaxis )
        , angle = 2.0 * Math.PI
        , circ = Make.arc( base, xaxis, yaxis, radius, 0.0, 2 * Math.PI );

        return Make.extrudedSurface( axis, height, circ );

    }

    //Generate the control points, weights, and knots of a revolved surface
    // (Corresponds to Algorithm A7.1 from Piegl & Tiller)
    //
    //**params**
    //
    //* center of the rotation axis
    //* axis of the rotation axis
    //* angle to revolve around axis
    //* degree of the generatrix
    //* control points of the generatrix
    //* weights of the generatrix
    //
    //**returns**
    //
    //* an object with the following properties: controlPoints, weights, knots, degree

    public static function revolvedSurface( profile : NurbsCurveData, center : Point, axis : Point, theta : Float ) : NurbsSurfaceData {

        var prof_controlPoints = Eval.dehomogenize1d( profile.controlPoints )
            , prof_weights = Eval.weight1d( profile.controlPoints );

        var narcs, knotsU, controlPoints, weights;

        if (theta <= Math.PI / 2) { //less than 90
            narcs = 1;
            knotsU = Vec.zeros1d( 6 + 2  * (narcs-1) );
        } else {
            if (theta <= Math.PI){  //between 90 and 180
                narcs = 2;
                knotsU = Vec.zeros1d( 6 + 2 * (narcs-1) );
                knotsU[3]= knotsU[4] = 0.5;
            } else if (theta <= 3 * Math.PI / 2){ //between 180 and 270
                narcs = 3;
                knotsU = Vec.zeros1d( 6 + 2 * (narcs-1) );
                knotsU[3]= knotsU[4] = 1/3;
                knotsU[5]= knotsU[6] = 2/3;
            } else { //between 270 and 360
                narcs = 4;
                knotsU = Vec.zeros1d( 6 + 2 * (narcs-1) );
                knotsU[3]= knotsU[4] = 1/4;
                knotsU[5]= knotsU[6] = 1/2;
                knotsU[7]= knotsU[8] = 3/4;
            }
        }

        var dtheta = theta / narcs //divide the interval into several points
        , j = 3 + 2 * (narcs-1);

        //initialize the start and end knots
        //keep in mind that we only return the knot vector for thes
        for (i in 0...3){
            knotsU[i] = 0.0;
            knotsU[j+i] = 1.0;
        }

        //do some initialization
        var n = 2 * narcs
        , wm = Math.cos( dtheta/2.0 )
        , angle = 0.0
        , sines = Vec.zeros1d( narcs + 1)
        , cosines = Vec.zeros1d( narcs + 1)
        , controlPoints = Vec.zeros3d( 2*narcs + 1, prof_controlPoints.length, 3 )
        , weights = Vec.zeros2d( 2*narcs + 1, prof_controlPoints.length );

        //initialize the sines and cosines
        for (i in 1...narcs+1){
            angle += dtheta;
            cosines[i] = Math.cos(angle);
            sines[i] = Math.sin(angle);
        }

        //for each pt in the generatrix
        //i.e. for each row of the 2d knot vectors
        for (j in 0...prof_controlPoints.length){

            //get the closest point of the generatrix point on the axis
            var O = Trig.rayClosestPoint(prof_controlPoints[j], center, axis)
            //X is the vector from the axis to generatrix control pt
            , X = Vec.sub( prof_controlPoints[j], O )
            //radius at that height
            , r = Vec.norm(X)
            //Y is perpendicular to X and axis, and complete the coordinate system
            , Y = Vec.cross(axis,X);

            if ( r > Constants.EPSILON ){
                X = Vec.mul( 1 / r, X);
                Y = Vec.mul( 1 / r, Y);
            }

            //the first row of controlPoints and weights is just the generatrix
            controlPoints[0][j] = prof_controlPoints[j];
            var P0 = prof_controlPoints[j];
            weights[0][j] = prof_weights[j];

            //store T0 as the Y vector
            var T0 = Y
            , index = 0
            , angle = 0.0;

            //proceed around the circle
            for (i in 1...narcs+1){

                //O + r * cos(theta) * X + r * sin(theta) * Y
                //rotated generatrix pt
                var P2 = r == 0 ? O : Vec.add( O, Vec.add( Vec.mul( r * cosines[i], X), Vec.mul( r * sines[i], Y) ) );

                controlPoints[index+2][j] = P2;
                weights[index+2][j] = prof_weights[j];

                //construct the vector tangent to the rotation
                var T2 = Vec.sub( Vec.mul( cosines[i], Y), Vec.mul(sines[i], X));

                 //construct the next control pt
                if (r == 0){
                    controlPoints[index+1][j] = O;
                } else {

                    var inters = Intersect.rays(P0, Vec.mul( 1 / Vec.norm(T0), T0), P2, Vec.mul( 1 / Vec.norm(T2), T2));
                    var P1 = Vec.add( P0, Vec.mul(inters.u0, T0));

                    controlPoints[index+1][j] = P1;
                }

                weights[index+1][j] = wm * prof_weights[j];

                index += 2;

                if (i < narcs) {
                    P0 = P2;
                    T0 = T2;
                }
            }
        }

        return new NurbsSurfaceData( 2, profile.degree, knotsU, profile.knots, Eval.homogenize2d( controlPoints, weights ) );

    }

    //Generate the control points, weights, and knots of a sphere
    //
    //**params**
    //
    //* the center of the sphere
    //* normalized axis of sphere
    //* vector perpendicular to axis of sphere, starting the rotation of the sphere
    //* radius of the sphere
    //
    //**returns**
    //
    //* an object with the following properties: controlPoints, weights, knotsU, knotsV, degreeU, degreeV
    //

    public static function sphericalSurface( center : Point, axis : Point, xaxis : Point, radius : Float ){

        var arc = arc(center, Vec.mul( -1.0, axis ), xaxis, radius, 0.0, Math.PI );
        return revolvedSurface( arc, center, axis, 2 * Math.PI );

    }

    //Generate the control points, weights, and knots of a cone
    //
    //**params**
    //
    //* normalized axis of cone
    //* position of base of cone
    //* height from base to tip
    //* radius at the base of the cone
    //
    //**returns**
    //
    //* an object with the following properties: controlPoints, weights, knots, degree
    //

    public static function conicalSurface( axis : Point, xaxis : Point, base : Point, height : Float, radius : Float ) : NurbsSurfaceData {

        var angle = 2 * Math.PI
        , prof_degree = 1
        , prof_ctrl_pts = [ Vec.add( base, Vec.mul( height, axis ) ), Vec.add( base, Vec.mul( radius, xaxis ) )]
        , prof_knots = [0.0,0.0,1.0,1.0]
        , prof_weights = [1.0,1.0]
        , prof = new NurbsCurveData( prof_degree, prof_knots, Eval.homogenize1d( prof_ctrl_pts, prof_weights ) );

        return revolvedSurface(prof, base, axis, angle );

    }

    public static function rationalInterpCurve( points : Array<Array<Float>>,
                                                degree : Int = 3,
                                                homogeneousPoints : Bool = false,
                                                start_tangent : Point = null,
                                                end_tangent : Point = null ) : NurbsCurveData {

        // 0) build knot vector for curve by normalized chord length
        // 1) construct effective basis function in square matrix (W)
        // 2) construct set of coordinattes to interpolate vector (p)
        // 3) set of control points (c)

        //Wc = p

        // 4) solve for c in all 3 dimensions

        if (points.length < degree + 1){
            throw "You need to supply at least degree + 1 points! You only supplied " + points.length + " points.";
        }

        var us = [ 0.0 ];
        for (i in 1...points.length){
            var chord = Vec.norm( Vec.sub( points[i], points[i-1] ) );
            var last = us[us.length - 1];
            us.push( last + chord );
        }

        //normalize
        var max = us[us.length-1];
        for (i in 0...us.length){
            us[i] = us[i] / max;
        }

        var knotsStart = Vec.rep( degree + 1, 0.0 );

        //we need two more control points, two more knots

        var hasTangents = start_tangent != null && end_tangent != null;
        var start = hasTangents ? 0 : 1;
        var end = hasTangents ? us.length - degree + 1 : us.length - degree;

        for (i in start...end){
            var weightSums = 0.0;
            for (j in 0...degree){
                weightSums += us[i + j];
            }

            knotsStart.push( (1 / degree) * weightSums );
        }

        var knots = knotsStart.concat( Vec.rep( degree + 1, 1.0 ) );

        //build matrix of basis function coeffs (TODO: use sparse rep)
        var A = [];
        var n = hasTangents ? points.length + 1 : points.length - 1;

        var lst = hasTangents ? 1 : 0;
        var ld = hasTangents ? points.length - (degree - 1) : points.length - (degree + 1);

        for (u in us){
            var span = Eval.knotSpanGivenN( n, degree, u, knots );
            var basisFuncs = Eval.basisFunctionsGivenKnotSpanIndex( span, u, degree, knots );

            var ls = span - degree;

            var rowstart = Vec.zeros1d( ls );
            var rowend = Vec.zeros1d( ld - ls );

            A.push( rowstart.concat(basisFuncs).concat(rowend) );
        }

        if (hasTangents){
            var ln = A[0].length - 2;

            var tanRow0 = [-1.0,1.0].concat( Vec.zeros1d( ln ) );
            var tanRow1 = Vec.zeros1d( ln ).concat( [-1.0,1.0] );

            A.spliceAndInsert( 1, 0, tanRow0 );
            A.spliceAndInsert( A.length-1, 0, tanRow1 );
        }

        //for each dimension, solve
        var dim = points[0].length;
        var xs = [];

        var mult1 = (1 - knots[knots.length - degree - 2] ) / degree;
        var mult0 = knots[degree + 1] / degree;

        for (i in 0...dim){
            var b : Array<Float>;

            if (!hasTangents){
                b = points.map(function(x){ return x[i]; });
            }

            else {
                //insert the tangents at the second and second to last index
                b = [ points[0][i] ];
                b.push( mult0 * start_tangent[i]);
                for (j in 1...points.length-1) b.push( points[j][i] );
                b.push( mult1 * end_tangent[i] );
                b.push( points.last()[i] );
            }

            var x = Mat.solve( A, b );
            xs.push(x);
        }

        var controlPts = Mat.transpose(xs);

        if (!homogeneousPoints){
            var weights = Vec.rep(controlPts.length, 1.0);
            controlPts = Eval.homogenize1d(controlPts, weights);
        }

        return new NurbsCurveData( degree, knots, controlPts );

    }
}
