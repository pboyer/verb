package verb;

import verb.core.Vec;
import verb.core.Make;
import promhx.Promise;
import verb.core.types.MeshData;
import verb.core.types.AdaptiveRefinementNode.AdaptiveRefinementOptions;
import verb.core.Tess;
import verb.core.Modify;
import verb.core.Analyze;
import verb.core.ArrayExtensions;
using verb.core.ArrayExtensions;

import verb.core.types.Interval;
import verb.core.types.CurveData;
import verb.core.Eval;
import verb.core.types.SurfaceData;
import verb.exe.AsyncObject;
import verb.core.Mat;

@:expose("NurbsSurface")
class NurbsSurface extends AsyncObject {

    private var _data : SurfaceData;

    private function new( data : SurfaceData ) {
        _data = data;
    }

    public static function byControlPointsWeights( degreeU : Int,
                                                   degreeV : Int,
                                                   knotsU : KnotArray,
                                                   knotsV : KnotArray,
                                                   controlPoints : Array<Array<Point>>,
                                                   weights : Array<Array<Float>> ) : NurbsSurface {
        return new NurbsSurface( new SurfaceData( degreeU, degreeV, knotsU, knotsV, Eval.homogenize2d(controlPoints, weights) ) );
    }

    public static function byExtrusion( profile : NurbsCurve, direction : Vector ) : NurbsSurface {
        return new NurbsSurface(
            Make.extrudedSurface( Vec.normalized( direction ), Vec.norm( direction ), profile.data() ));
    }

    public static function byFourPoints( point0 : Point, point1 : Point, point2 : Point, point3 : Point ) : NurbsSurface {
        return new NurbsSurface( Make.fourPointSurface( point0, point1, point2, point3 ) );
    }

    public static function byRevolution( profile : NurbsCurve, center : Point, axis : Point, angle : Float ) : NurbsSurface {
        return new NurbsSurface( Make.revolvedSurface( profile.data(), center, axis, angle ) );
    }

    public function degreeU() : Int { return _data.degreeU; }
    public function degreeV() : Int { return _data.degreeV; }
    public function knotsU() : Array<Float> { return _data.knotsU.slice(0); }
    public function knotsV() : Array<Float> { return _data.knotsV.slice(0); }
    public function controlPoints() : Array<Array<Point>> { return Eval.dehomogenize2d(_data.controlPoints); }
    public function weights() : Array<Point> { return Eval.weight2d(_data.controlPoints); }

    public function data() : SurfaceData {
        return new SurfaceData( degreeU(), degreeV(), knotsU(), knotsV(), Eval.homogenize2d( controlPoints(), weights() ));
    }

    public function clone() : NurbsSurface {
        return new NurbsSurface( data() );
    }

    public function domainU() : Interval<Float> {
        return new Interval( _data.knotsU.first(), _data.knotsU.last());
    }

    public function domainV() : Interval<Float> {
        return new Interval( _data.knotsV.first(), _data.knotsV.last());
    }

    public function point( u : Float, v : Float ) : Point {
        return Eval.rationalSurfacePoint( _data, u, v );
    }

    public function pointAsync( u : Float, v : Float ) : Promise<Point> {
        return defer( Eval, 'rationalSurfacePoint', [ _data, u, v ] );
    }

    public function normal( u : Float, v : Float ) : Point {
        return Eval.rationalSurfaceNormal( _data, u, v );
    }

    public function normalAsync( u : Float, v : Float ) : Promise<Array<Array<Vector>>> {
        return defer( Eval, 'rationalSurfaceNormal', [ _data, u, v ] );
    }

    public function derivatives( u : Float, v : Float, numDerivs : Int = 1 ) : Array<Array<Vector>> {
        return Eval.rationalSurfaceDerivatives( _data, u, v, numDerivs );
    }

    public function derivativesAsync( u : Float, v : Float, numDerivs : Int = 1 ) : Promise<Array<Array<Vector>>> {
        return defer( Eval, 'rationalSurfaceDerivatives', [ _data, u, v, numDerivs ] );
    }

    public function closestParam( pt : Point ) : UV {
        return Analyze.rationalSurfaceClosestParam( _data, pt );
    }

    public function closestParamAsync( pt : Point ) : Promise<UV> {
        return defer( Analyze, 'rationalSurfaceClosestParam', [ _data, pt ] );
    }

    public function closestPoint( pt : Point ) : Point {
        return Analyze.rationalSurfaceClosestPoint( _data, pt );
    }

    public function closestPointAsync( pt : Point ) : Promise<Point> {
        return defer( Analyze, 'rationalSurfaceClosestPoint', [ _data, pt ] );
    }

    public function split( u : Float, useV : Bool = false ) : Array<NurbsSurface> {
        return Modify.surfaceSplit( _data, u, useV )
            .map(function(x){ return new NurbsSurface(x); });
    }

    public function splitAsync( u : Float, useV : Bool = false ) : Promise<NurbsSurface> {
        return defer( Modify, 'surfaceSplit', [ _data, u, useV ] )
            .then(function(s){
                return s.map(function(x){ return new NurbsSurface(x); });
            });
    }

    public function tessellate( options : AdaptiveRefinementOptions = null) : MeshData {
        return Tess.rationalSurfaceAdaptive( _data, options );
    }

    public function tessellateAsync( options : AdaptiveRefinementOptions = null ) : Promise<MeshData> {
        return defer( Tess, 'rationalSurfaceAdaptive', [ _data,  options ] );
    }

    public function transform( mat : Matrix ) : NurbsSurface {
        return new NurbsSurface( Modify.rationalSurfaceTransform( _data, mat ) );
    }

    public function transformAsync( mat : Matrix ) : Promise<NurbsSurface> {
        return defer( Modify, 'rationalSurfaceTransform', [ _data,  mat ] )
            .then(function(x){ return new NurbsSurface(x); });
    }
}
