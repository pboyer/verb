package verb;

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
class NurbsCurve {

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

    public function degree() : Int {
        return _data.degree;
    }

    public function knots() : KnotArray {
        return _data.knots.slice(0);
    }

    public function controlPoints() : Array<Point> {
        return Eval.dehomogenize1d(_data.controlPoints);
    }

    public function weights() : Array<Float> {
        return Eval.weight1d(_data.controlPoints);
    }

    //
    // Sample a point at the given parameter
    //
    // **params**
    // + *Number*, The parameter to sample the curve
    //
    // **returns**
    // + *Array*, An array if called synchronously, otherwise nothing

    public function point( u : Float ) {
        return Eval.rationalCurvePoint( _data, u );
    }

    public function pointAsync( u : Float, callback : Point -> Dynamic ) {
        return Dispatcher.instance().eval( Type.getClassName(Eval), 'rationalCurvePoint', [ _data,  u ], callback );
    }

    //
    // Get derivatives at a given parameter
    //
    // **params**
    // + *Number*, The parameter to sample the curve
    // + *Number*, The number of derivatives to obtain
    //
    // **returns**
    // + *Array*, An array if called synchronously, otherwise nothing

    public function derivatives( u : Float, numDerivatives : Int = 1 ) : Array<Point> {

        return Eval.rationalCurveDerivatives( _data, u, numDerivatives );
        // return this.nurbsEngine.eval( 'rational_curve_derivs', [ this.get('degree'), this.get('knots'), this.homogenize(),  u, num_derivs || 1  ], callback );

    }

    //
    // Determine the closest point on the curve to the given point
    //
    // **params**
    // + *Array*, A length 3 array representing the point
    //
    // **returns**
    // + *Number*, The closest point

    public function closestPoint( pt : Point ) : Point {

        return point( closestParam( pt ) );

        // return this.nurbsEngine.eval( 'rationalCurveClosestPoint', [ this.get('degree'), this.get('knots'), this.homogenize(),  point  ], callback );

    }

    //
    // Determine the closest parameter on the curve to the given point
    //
    // **params**
    // + *Array*, A length 3 array representing the point
    //
    // **returns**
    // + *Number*, The closest parameter

    public function closestParam( pt : Point ) : Float {

        return Analyze.rationalCurveClosestPoint( _data, pt );

    }


    //
    // Determine the arc length of the curve
    //
    // **returns**
    // + *Number*, The length of the curve

    public function length() : Float {

        return Analyze.rationalCurveArcLength( _data );
        // return this.nurbsEngine.eval( 'rationalCurveArcLength', [ this.get('degree'), this.get('knots'), this.homogenize()  ], callback );

    }

    //
    // Determine the arc length of the curve at the given parameter
    //
    // **params**
    // + *Number*, The parameter at which to evaluate
    //
    // **returns**
    // + *Number*, The length of the curve at the given parameter

    public function lengthAtParam( u : Float ) : Float {

        return Analyze.rationalCurveArcLength( _data, u );
        // return this.nurbsEngine.eval( 'rationalCurveArcLength', [ this.get('degree'), this.get('knots'), this.homogenize(), u  ], callback );

    }

    //
    // Determine the parameter of the curve at the given arc length
    //
    // **params**
    // + *Number*, The arc length at which to determine the parameter
    //
    // **returns**
    // + *Number*, The length of the curve at the given parameter

    public function paramAtLength( len : Float, tolerance : Float = null ) : Float {

        return Analyze.rationalCurveParamAtArcLength( _data, len, tolerance );

        // return this.nurbsEngine.eval( 'rationalCurveParamAtArcLength', [ this.get('degree'), this.get('knots'), this.homogenize(), len  ], callback );

    }

    //
    // ####divideByEqualArcLength( divisions [, callback] )
    //
    // Determine the parameters necessary to divide the curve into equal arc length segments
    //
    // **params**
    // + *Number*, Number of divisions of the curve
    //
    // **returns**
    // + *Array*, A collection of parameters

    public function divideByEqualArcLength( divisions : Int ) : Array<CurveLengthSample> {

        return Divide.rationalCurveEquallyByArcLength( _data, divisions );

        // return this.nurbsEngine.eval( 'rationalCurveEquallyByArcLength', [ this.get('degree'), this.get('knots'), this.homogenize(), divisions  ], callback );

    }

    //
    // Given the distance to divide the curve, determine the parameters necessary to divide the curve into equal arc length segments
    //
    // **params**
    // + *Number*, Arc length of each segment
    //
    // **returns**
    // + *Array*, A collection of parameters

    public function divideByArcLength( arcLength : Float ) {

        return Divide.rationalCurveByArcLength( _data, arcLength );

        // return this.nurbsEngine.eval( 'rational_curve_divide_curve_by_arc_length', [ this.get('degree'), this.get('knots'), this.homogenize(), arcLength  ], callback );

    }

    //
    // Tessellate a curve at a given tolerance
    //
    // **params**
    // + *Number*, The parameter to sample the curve
    // + *Number*, The number of derivatives to obtain
    //
    // **returns**
    // + *Array*, An array if called synchronously, otherwise nothing

    public function tessellate(tolerance : Float = null){

        return Tess.rationalCurveAdaptiveSample( _data, tolerance, false );

        // return this.nurbsEngine.eval( 'rational_curve_adaptive_sample', [ this.get('degree'), this.get('knots'), this.homogenize(), options.tolerance ], callback );

    }

    //
    // Split the curve at the given parameter
    //
    // **params**
    // + *Number*, The parameter at which to split the curve
    //
    // **returns**
    // + *Array*, Two curves - one at the lower end of the parameter range and one at the higher end.

    public function split( u : Float ) : Array<NurbsCurve> {

        var domain = this.domain();

        if ( u <= domain.min || u >= domain.max ) {
            throw "Cannot split outside of the domain of the curve!";
        }

        return Modify.curveSplit( _data, u ).map(function(x){ return new NurbsCurve(x); });

//        // transform the result from the engine into a valid pair of NurbsCurves
//        function asNurbsCurves(res){
//
//            var cpts0 = verb.eval.dehomogenize_1d( res[0].control_points );
//            var wts0 = verb.eval.weight_1d( res[0].control_points );
//
//            var c0 = new verb.NurbsCurve( res[0].degree, cpts0, wts0, res[0].knots );
//
//            var cpts1 = verb.eval.dehomogenize_1d( res[1].control_points );
//            var wts1 = verb.eval.weight_1d( res[1].control_points );
//
//            var c1 = new verb.NurbsCurve( res[1].degree, cpts1, wts1, res[1].knots );
//
//            return [c0, c1];
//        }
//
//        if (callback){
//           //  return this.nurbsEngine.eval( 'curve_split', [ this.get('degree'), this.get('knots'), this.homogenize(), u ], function(res){
////                return callback( asNurbsCurves(res) );
////            });
//        }
//
//        return asNurbsCurves( this.nurbsEngine.eval( 'curve_split', [ this.get('degree'), this.get('knots'), this.homogenize(), u ]));

    }


    //
    // Determine the valid domain of the curve
    //
    //
    // **returns**
    // + *Array*, An array representing the high and end point of the domain of the curve

    public function domain() : Interval<Float> {

        return new Interval( _data.knots.first(), _data.knots.last());

    }

    //
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
    //
    public function clone(){

        return new NurbsCurve( this._data );

    }
}
