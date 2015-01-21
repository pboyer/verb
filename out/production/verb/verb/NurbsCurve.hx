package verb;

import promhx.Promise;

import verb.exe.AsyncObject;
import verb.core.types.CurveData;
import verb.core.Mat;
import verb.exe.Dispatcher;
import verb.core.ArrayExtensions;
using verb.core.ArrayExtensions;

import verb.core.types.CurveLengthSample;
import verb.core.Modify;
import verb.core.Tess;
import verb.core.Divide;
import verb.core.Analyze;
import verb.core.Eval;
import verb.core.types.Interval;
import verb.core.types.CurveData;

@:expose("NurbsCurve")
class NurbsCurve extends AsyncObject {

    private var _data : CurveData;

    private function new( data : CurveData ) {
        this._data = data;
    }

    public static function byControlPointsWeights(  degree : Int,
                                                    knots : KnotArray,
                                                    controlPoints : Array<Point>,
                                                    weights : Array<Float> ) : NurbsCurve {
        return new NurbsCurve( new CurveData( degree, knots.copy(), Eval.homogenize1d(controlPoints, weights) ) );
    }

    function data() : CurveData {
        return new CurveData( degree(), knots(), Eval.homogenize1d( controlPoints(), weights() ));
    }

    public function degree() : Int { return _data.degree; }
    public function knots() : KnotArray { return _data.knots.slice(0); }
    public function controlPoints() : Array<Point> { return Eval.dehomogenize1d(_data.controlPoints); }
    public function weights() : Array<Float> { return Eval.weight1d(_data.controlPoints); }

    // Sample a point at the given parameter
    //
    // **params**
    // + *Number*, The parameter to sample the curve
    //
    // **returns**
    // + *Array*, An array if called synchronously, otherwise nothing

    public function point( u : Float ) : Point {
        return Eval.rationalCurvePoint( _data, u );
    }

    public function pointAsync( u : Float) : Promise<Point> {
        return applyMethod( Eval, 'rationalCurvePoint', [ _data,  u ] );
    }

    // Get derivatives at a given parameter
    //
    // **params**
    // + *Number*, The parameter to sample the curve
    // + *Number*, The number of derivatives to obtain
    //
    // **returns**
    // + *Array*, An array if called synchronously, otherwise nothing

    public function derivatives( u : Float, numDerivs : Int = 1 ) : Array<Point> {
        return Eval.rationalCurveDerivatives( _data, u, numDerivs );
    }

    public function derivativesAsync( u : Float, numDerivs : Int = 1 ) : Promise<Array<Point>> {
        return applyMethod( Eval, 'rationalCurveDerivatives', [ _data, u, numDerivs ] );
    }

    // Determine the closest point on the curve to the given point
    //
    // **params**
    // + *Array*, A length 3 array representing the point
    //
    // **returns**
    // + *Number*, The closest point

    public function closestPoint( pt : Point ) : Point {
        return Analyze.rationalCurveClosestPoint( _data, pt );
    }

    public function closestPointAsync( pt : Point ) : Promise<Point> {
        return applyMethod( Analyze, 'rationalCurveClosestPoint', [ _data,  pt ] );
    }

    // Determine the closest parameter on the curve to the given point
    //
    // **params**
    // + *Array*, A length 3 array representing the point
    //
    // **returns**
    // + *Number*, The closest parameter

    public function closestParam( pt : Point ) : Float {
        return Analyze.rationalCurveClosestParam( _data, pt );
    }

    public function closestParamAsync( pt : Point ) : Promise<Point> {
        return applyMethod( Analyze, 'rationalCurveClosestParam', [ _data,  pt ] );
    }

    // Determine the arc length of the curve
    //
    // **returns**
    // + *Number*, The length of the curve

    public function length() : Float {
        return Analyze.rationalCurveArcLength( _data );
    }

    public function lengthAsync() : Promise<Float> {
        return applyMethod( Analyze, 'rationalCurveArcLength', [ _data ] );
    }

    // Determine the arc length of the curve at the given parameter
    //
    // **params**
    // + *Number*, The parameter at which to evaluate
    //
    // **returns**
    // + *Number*, The length of the curve at the given parameter

    public function lengthAtParam( u : Float ) : Float {
        return Analyze.rationalCurveArcLength( _data, u );
    }

    public function lengthAtParamAsync() : Promise<Float> {
        return applyMethod( Analyze, 'rationalCurveArcLength', [ _data ] );
    }

    // Determine the parameter of the curve at the given arc length
    //
    // **params**
    // + *Number*, The arc length at which to determine the parameter
    //
    // **returns**
    // + *Number*, The length of the curve at the given parameter

    public function paramAtLength( len : Float, tolerance : Float = null ) : Float {
        return Analyze.rationalCurveParamAtArcLength( _data, len, tolerance );
    }

    public function paramAtLengthAsync( len : Float, tolerance : Float = null ) : Promise<Float> {
        return applyMethod( Analyze, 'rationalCurveParamAtArcLength', [ _data, len, tolerance ] );
    }

    // Determine the parameters necessary to divide the curve into equal arc length segments
    //
    // **params**
    // + *Number*, Number of divisions of the curve
    //
    // **returns**
    // + *Array*, A collection of parameters

    public function divideByEqualArcLength( divisions : Int ) : Array<CurveLengthSample> {
        return Divide.rationalCurveByEqualArcLength( _data, divisions );
    }

    public function divideByEqualArcLengthAsync( divisions : Int ) : Promise<Array<CurveLengthSample>> {
        return applyMethod( Divide, 'rationalCurveByEqualArcLength', [ _data, divisions ] );
    }

    // Given the distance to divide the curve, determine the parameters necessary to divide the curve into equal arc length segments
    //
    // **params**
    // + *Number*, Arc length of each segment
    //
    // **returns**
    // + *Array*, A collection of parameters

    public function divideByArcLength( arcLength : Float ) : Array<CurveLengthSample> {
        return Divide.rationalCurveByArcLength( _data, arcLength );
    }

    public function divideByArcLengthAsync( divisions : Int ) : Promise<Array<CurveLengthSample>> {
        return applyMethod( Divide, 'rationalCurveByArcLength', [ _data, divisions ] );
    }

    // Tessellate a curve at a given tolerance
    //
    // **params**
    // + *Number*, The parameter to sample the curve
    // + *Number*, The number of derivatives to obtain
    //
    // **returns**
    // + *Array*, An array if called synchronously, otherwise nothing

    public function tessellate(tolerance : Float = null) : Array<Point> {
        return Tess.rationalCurveAdaptiveSample( _data, tolerance, false );
    }

    public function tessellateAsync( tolerance : Float = null ) : Promise<Array<Point>> {
        return applyMethod( Tess, 'rationalCurveAdaptiveSample', [ _data, tolerance, false ] );
    }

    // Split the curve at the given parameter
    //
    // **params**
    // + *Number*, The parameter at which to split the curve
    //
    // **returns**
    // + *Array*, Two curves - one at the lower end of the parameter range and one at the higher end.

    public function split( u : Float ) : Array<NurbsCurve> {
        return Modify.curveSplit( _data, u ).map(function(x){ return new NurbsCurve(x); });
    }

//    public function splitAsync( u : Float : Array<NurbsCurve> -> Dynamic ) : Void {
//        return dispatch( Modify, 'curveSplit', [ _data, u ], function(cs : Array<CurveData>){
//            cs.map(function(x){ return new NurbsCurve(x); }) );
//        });
//    }

    // Determine the valid domain of the curve
    //
    //
    // **returns**
    // + *Array*, An array representing the high and end point of the domain of the curve

    public function domain() : Interval<Float> {
        return new Interval( _data.knots.first(), _data.knots.last());
    }

    // Transform a curve with the given matrix.
    //
    // **params**
    // + *Array*, 4d array representing the transform
    //
    // **returns**
    // + *Array*, An array if called synchronously, otherwise nothing

    public function transform( mat : Matrix ) : NurbsCurve {
        var pts = controlPoints();

        for (i in 0...pts.length){

            var homoPt = pts[i];
            homoPt.push(1.0);

            pts[i] = Mat.dot( mat, homoPt ).slice( 0, homoPt.length - 2 );
        }

        return new NurbsCurve( new CurveData( degree(), knots(), Eval.homogenize1d( pts, weights() ) ) );
    }

    //
    // Obtain a copy of the curve
    //
    // **returns**
    // + *NurbsCurve*, The copied curve

    public function clone(){
        return new NurbsCurve( this._data );
    }
}
