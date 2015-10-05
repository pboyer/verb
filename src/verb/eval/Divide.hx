package verb.eval;

import verb.core.Mat;
import verb.core.Data;
import verb.core.Vec;
import verb.core.Constants;

using Lambda;

// Divide provides various tools for dividing and splitting NURBS geometry.

@:expose("eval.Divide")
class Divide {

    //Split a NURBS surface in two at a given parameter
    //
    //**params**
    //
    //* The surface to split
    //* The parameter at which to split the surface
    //* Whether to split in the U direction or V direction of the surface
    //
    //**returns**
    //
    //* A length two array of new surfaces

    public static function surfaceSplit( surface : NurbsSurfaceData, u : Float, useV : Bool = false) : Array<NurbsSurfaceData> {

        var knots
        , degree
        , controlPoints;

        if (!useV) {
            controlPoints = Mat.transpose( surface.controlPoints );
            knots = surface.knotsU;
            degree = surface.degreeU;
        } else {
            controlPoints = surface.controlPoints;
            knots = surface.knotsV;
            degree = surface.degreeV;
        }

        var knots_to_insert = [ for (i in 0...degree+1) u ];

        var newpts0 = new Array<Array<Point>>()
        , newpts1 = new Array<Array<Point>>();

        var s = Eval.knotSpan( degree, u, knots );
        var res : NurbsCurveData = null;

        for (cps in controlPoints){
            res = Modify.curveKnotRefine( new NurbsCurveData(degree, knots, cps), knots_to_insert );

            newpts0.push( res.controlPoints.slice( 0, s + 1 ) );
            newpts1.push( res.controlPoints.slice( s + 1 ) );
        }

        var knots0 = res.knots.slice(0, s + degree + 2);
        var knots1 = res.knots.slice( s + 1 );

        if (!useV){
            newpts0 = Mat.transpose( newpts0 );
            newpts1 = Mat.transpose( newpts1 );

            return [ new NurbsSurfaceData(degree, surface.degreeV, knots0, surface.knotsV.copy(), newpts0 ),
            new NurbsSurfaceData(degree, surface.degreeV, knots1, surface.knotsV.copy(), newpts1 ) ];
        }

        //v dir
        return [ new NurbsSurfaceData(surface.degreeU, degree, surface.knotsU.copy(), knots0, newpts0 ),
        new NurbsSurfaceData(surface.degreeU, degree, surface.knotsU.copy(), knots1, newpts1 ) ];
    }

    //Split a NURBS curve into two parts at a given parameter
    //
    //**params**
    //
    //* NurbsCurveData object representing the curve
    //* location to split the curve
    //
    //**returns**
    //
    //* *Array* two new curves, defined by degree, knots, and control points

    public static function curveSplit( curve : NurbsCurveData, u : Float ) : Array<NurbsCurveData> {

        var degree = curve.degree
        , controlPoints = curve.controlPoints
        , knots = curve.knots;

        var knots_to_insert = [for (i in 0...degree+1) u];
        var res = Modify.curveKnotRefine( curve, knots_to_insert );

        var s = Eval.knotSpan( degree, u, knots );

        var knots0 = res.knots.slice(0, s + degree + 2);
        var knots1 = res.knots.slice( s + 1 );

        var cpts0 = res.controlPoints.slice( 0, s + 1 );
        var cpts1 = res.controlPoints.slice( s + 1 );

        return [
            new NurbsCurveData( degree, knots0, cpts0 ),
            new NurbsCurveData( degree, knots1, cpts1 )
        ];

    }

    //Divide a NURBS curve given a given number of times, including the end points. The result is not split curves
    //but a collection of `CurveLengthSample` objects that can be used for splitting. As with all arc length methods,
    //the result is an approximation.
    //
    //**params**
    //
    //* NurbsCurveData object representing the curve
    //* The number of parts to split the curve into
    //
    //**returns**
    //
    //* An array of `CurveLengthSample` objects

    public static function rationalCurveByEqualArcLength(curve : NurbsCurveData, num : Int) : Array<CurveLengthSample> {

        var tlen = Analyze.rationalCurveArcLength( curve );
        var inc = tlen / num;

        return Divide.rationalCurveByArcLength(curve, inc);

    }

    //Divide a NURBS curve given a given number of times, including the end points.
    //
    //**params**
    //
    //* NurbsCurveData object representing the curve
    //* The arc length separating the resultant samples
    //
    //**returns**
    //
    //* A sequence of `CurveLengthSample` objects

    public static function rationalCurveByArcLength(curve : NurbsCurveData, l : Float) : Array<CurveLengthSample> {

        var crvs = Modify.decomposeCurveIntoBeziers( curve )
        , crvlens = crvs.map(function(x){ return Analyze.rationalBezierCurveArcLength(x); })
        , totlen = Vec.sum(crvlens)
        , pts = [ new CurveLengthSample( curve.knots[0], 0.0 ) ];

        if (l > totlen) return pts;

        var inc = l
        , i = 0
        , lc = inc
        , runsum = 0.0
        , runsum1 = 0.0
        , u;

        while ( i < crvs.length ){

            runsum += crvlens[i];

            while ( lc < runsum + Constants.EPSILON ){

                u = Analyze.rationalBezierCurveParamAtArcLength( crvs[i], lc - runsum1, Constants.TOLERANCE, crvlens[i] );

                pts.push( new CurveLengthSample( u, lc ) );
                lc += inc;

            }

            runsum1 += crvlens[i];

            i++;

        }

        return pts;

    }

}


@:expose("eval.CurveLengthSample")
class CurveLengthSample {
    public var u : Float;
    public var len : Float;

    public function new(u, len) {
        this.u = u;
        this.len = len;
    }
}

