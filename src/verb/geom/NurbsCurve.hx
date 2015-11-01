package verb.geom;

import verb.eval.Check;
import verb.core.Vec;
import verb.eval.Make;
import promhx.Promise;

import verb.core.Data;
import verb.core.Mat;

import verb.exe.Dispatcher;

import verb.core.ArrayExtensions;
using verb.core.ArrayExtensions;

import verb.eval.Modify;
import verb.eval.Tess;
import verb.eval.Divide;
import verb.eval.Analyze;
import verb.eval.Eval;

import verb.core.Serialization;

// A NURBS curve - this class represents the base class of many of verb.geom's curve types and provides many tools for analysis and evaluation.
// This object is deliberately constrained to be immutable. The methods to inspect the properties of this class deliberately return copies. `asNurbs` can
// be used to obtain a simplified NurbsCurveData object that can be used with `verb.core` or for serialization purposes.
//
// Under the hood, this type takes advantage of verb's asynchronous runtime using the _Async methods. Calling one of these
// methods returns a `Promise` instead of the value. This allows you to run the computation in a background thread and obtain the value asynchronously.
//
// You can find further documentation for using `Promise`'s at [https://github.com/jdonaldson/promhx](https://github.com/jdonaldson/promhx).

@:expose("geom.NurbsCurve")
class NurbsCurve extends SerializableBase implements ICurve {

    //Construct a NurbsCurve by a NurbsCurveData object
    //
    //**params**
    //
    //* The data object
    //
    //**returns**
    //
    //* A new NurbsCurve

    public function new( data : NurbsCurveData ) {
        this._data = Check.isValidNurbsCurveData( data );
    }

    //Construct a NurbsCurve by degree, knots, control points, weights
    //
    //**params**
    //
    //* The degree
    //* The knot array
    //* Array of control points
    //* Array of weight values
    //
    //**returns**
    //
    //* A new NurbsCurve

    public static function byKnotsControlPointsWeights( degree : Int,
                                                        knots : KnotArray,
                                                        controlPoints : Array<Point>,
                                                        weights : Array<Float> = null ) : NurbsCurve {
        return new NurbsCurve( new NurbsCurveData( degree, knots.copy(), Eval.homogenize1d( controlPoints, weights) ) );
    }

    //Construct a NurbsCurve by interpolating a collection of points.  The resultant curve
    //will pass through all of the points.
    //
    //**params**
    //
    //* An array of points
    //* Optional : The degree of resultant curve
    //
    //**returns**
    //
    //* A new NurbsCurve

    public static function byPoints( points : Array<Point>, degree : Int = 3 ) : NurbsCurve {
        return new NurbsCurve( Make.rationalInterpCurve(points, degree) );
    }

    //underlying serializable, data object
    private var _data : NurbsCurveData;

    //The degree of the curve
    public function degree() : Int { return _data.degree; }

    //The knot array
    public function knots() : KnotArray { return _data.knots.slice(0); }

    //Array of control points
    public function controlPoints() : Array<Point> { return Eval.dehomogenize1d(_data.controlPoints); }

    //Array of weight values
    public function weights() : Array<Float> { return Eval.weight1d(_data.controlPoints); }

    //Obtain a copy of the underlying data structure for the Curve. Used with verb.core.
    //
    //**returns**
    //
    //* A new NurbsCurveData object

    public function asNurbs() : NurbsCurveData {
        return new NurbsCurveData( degree(), knots(), Eval.homogenize1d( controlPoints(), weights() ));
    }

    //Obtain a copy of the curve
    //
    //**returns**
    //
    //* The copied curve

    public function clone(){
        return new NurbsCurve( this._data );
    }

    //Determine the valid domain of the curve
    //
    //**returns**
    //
    //* An array representing the high and end point of the domain of the curve

    public function domain() : Interval<Float> {
        return new Interval( _data.knots.first(), _data.knots.last());
    }

    //Transform a curve with the given matrix.
    //
    //**params**
    //
    //* 4d array representing the transform
    //
    //**returns**
    //
    //* A point represented as an array

    public function transform( mat : Matrix ) : NurbsCurve {
        return new NurbsCurve( Modify.rationalCurveTransform( _data, mat ) );
    }

    //The async version of `transform`

    public function transformAsync( mat : Matrix ) : Promise<NurbsCurve> {
        return Dispatcher.dispatchMethod( Modify, 'rationalCurveTransform', [ _data,  mat ] )
            .then(function(x){ return new NurbsCurve(x); });
    }

    //Sample a point at the given parameter
    //
    //**params**
    //
    //* The parameter to sample the curve
    //
    //**returns**
    //
    //* A point represented as an array

    public function point( u : Float ) : Point {
        return Eval.rationalCurvePoint( _data, u );
    }

    //The async version of `point`

    public function pointAsync( u : Float) : Promise<Point> {
        return Dispatcher.dispatchMethod( Eval, 'rationalCurvePoint', [ _data,  u ] );
    }

    //Obtain the curve tangent at the given parameter.  This is the first derivative and is
    //not normalized
    //
    //**params**
    //
    //* The parameter to sample the curve
    //
    //**returns**
    //
    //* A point represented as an array

    public function tangent( u : Float ) : Vector {
        return Eval.rationalCurveTangent( _data, u );
    }

    //The async version of `tangent`

    public function tangentAsync( u : Float ) : Promise<Vector> {
        return Dispatcher.dispatchMethod( Eval, 'rationalCurveTangent', [ _data, u ] );
    }

    //Get derivatives at a given parameter
    //
    //**params**
    //
    //* The parameter to sample the curve
    //* The number of derivatives to obtain
    //
    //**returns**
    //
    //* A point represented as an array

    public function derivatives( u : Float, numDerivs : Int = 1 ) : Array<Vector> {
        return Eval.rationalCurveDerivatives( _data, u, numDerivs );
    }

    //The async version of `derivatives`

    public function derivativesAsync( u : Float, numDerivs : Int = 1 ) : Promise<Array<Vector>> {
        return Dispatcher.dispatchMethod( Eval, 'rationalCurveDerivatives', [ _data, u, numDerivs ] );
    }

    //Determine the closest point on the curve to the given point
    //
    //**params**
    //
    //* A length 3 array representing the point
    //
    //**returns**
    //
    //* The closest point

    public function closestPoint( pt : Point ) : Point {
        return Analyze.rationalCurveClosestPoint( _data, pt );
    }

    //The async version of `closestPoint`

    public function closestPointAsync( pt : Point ) : Promise<Point> {
        return Dispatcher.dispatchMethod( Analyze, 'rationalCurveClosestPoint', [ _data,  pt ] );
    }

    //Determine the closest parameter on the curve to the given point
    //
    //**params**
    //
    //* A length 3 array representing the point
    //
    //**returns**
    //
    //* The closest parameter

    public function closestParam( pt : Point ) : Float {
        return Analyze.rationalCurveClosestParam( _data, pt );
    }

    //The async version of `length`

    public function closestParamAsync( pt : Dynamic ) : Promise<Point> {
        return Dispatcher.dispatchMethod( Analyze, 'rationalCurveClosestParam', [ _data,  pt ] );
    }

    //Determine the arc length of the curve
    //
    //**returns**
    //
    //* The length of the curve

    public function length() : Float {
        return Analyze.rationalCurveArcLength( _data );
    }

    //The async version of `length`

    public function lengthAsync() : Promise<Float> {
        return Dispatcher.dispatchMethod( Analyze, 'rationalCurveArcLength', [ _data ] );
    }

    //Determine the arc length of the curve at the given parameter
    //
    //**params**
    //
    //* The parameter at which to evaluate
    //
    //**returns**
    //
    //* The length of the curve at the given parameter

    public function lengthAtParam( u : Float ) : Float {
        return Analyze.rationalCurveArcLength( _data, u );
    }

    //The async version of `lengthAtParam`

    public function lengthAtParamAsync() : Promise<Float> {
        return Dispatcher.dispatchMethod( Analyze, 'rationalCurveArcLength', [ _data ] );
    }

    //Determine the parameter of the curve at the given arc length
    //
    //**params**
    //
    //* The arc length at which to determine the parameter
    //
    //**returns**
    //
    //* The length of the curve at the given parameter

    public function paramAtLength( len : Float, tolerance : Float = null ) : Float {
        return Analyze.rationalCurveParamAtArcLength( _data, len, tolerance );
    }

    //The async version of `paramAtLength`

    public function paramAtLengthAsync( len : Float, tolerance : Float = null ) : Promise<Float> {
        return Dispatcher.dispatchMethod( Analyze, 'rationalCurveParamAtArcLength', [ _data, len, tolerance ] );
    }

    //Determine the parameters necessary to divide the curve into equal arc length segments
    //
    //**params**
    //
    //* Number of divisions of the curve
    //
    //**returns**
    //
    //* A collection of parameters

    public function divideByEqualArcLength( divisions : Int ) : Array<CurveLengthSample> {
        return Divide.rationalCurveByEqualArcLength( _data, divisions );
    }

    //The async version of `divideByEqualArcLength``

    public function divideByEqualArcLengthAsync( divisions : Int ) : Promise<Array<CurveLengthSample>> {
        return Dispatcher.dispatchMethod( Divide, 'rationalCurveByEqualArcLength', [ _data, divisions ] );
    }

    //Given the distance to divide the curve, determine the parameters necessary to divide the curve into equal arc length segments
    //
    //**params**
    //
    //* Arc length of each segment
    //
    //**returns**
    //
    //* A collection of parameters

    public function divideByArcLength( arcLength : Float ) : Array<CurveLengthSample> {
        return Divide.rationalCurveByArcLength( _data, arcLength );
    }

    //The async version of `divideByArcLength`

    public function divideByArcLengthAsync( divisions : Int ) : Promise<Array<CurveLengthSample>> {
        return Dispatcher.dispatchMethod( Divide, 'rationalCurveByArcLength', [ _data, divisions ] );
    }

    //Split the curve at the given parameter
    //
    //**params**
    //
    //* The parameter at which to split the curve
    //
    //**returns**
    //
    //* Two curves - one at the lower end of the parameter range and one at the higher end.

    public function split( u : Float ) : Array<NurbsCurve> {
        return Divide.curveSplit( _data, u ).map(function(x){ return new NurbsCurve(x); });
    }

    // The async version of `split`

    public function splitAsync( u : Float ) : Promise<Array<NurbsCurve>> {
        return Dispatcher.dispatchMethod( Divide, 'curveSplit', [ _data, u ])
        .then(function(cs : Array<NurbsCurveData>) : Array<NurbsCurve>{
            return cs.map(function(x){ return new NurbsCurve(x); });
        });
    }

    //Reverse the parameterization of the curve
    //
    //**returns**
    //
    //* A reversed curve

    public function reverse() : NurbsCurve {
        return new NurbsCurve( Modify.curveReverse( _data ) );
    }

    // The async version of `reverse`

    public function reverseAsync() : Promise<NurbsCurve> {
        return Dispatcher.dispatchMethod( Modify, 'curveReverse', [ _data ])
            .then(function(c){ return new NurbsCurve(c); });
    }

    //Tessellate a curve at a given tolerance
    //
    //**params**
    //
    //* The tolerance at which to sample the curve
    //
    //**returns**
    //
    //* A point represented as an array

    public function tessellate(tolerance : Float = null) : Array<Point> {
        return Tess.rationalCurveAdaptiveSample( _data, tolerance, false );
    }

    // The async version of `tessellate`

    public function tessellateAsync( tolerance : Float = null ) : Promise<Array<Point>> {
        return Dispatcher.dispatchMethod( Tess, 'rationalCurveAdaptiveSample', [ _data, tolerance, false ] );
    }

}
