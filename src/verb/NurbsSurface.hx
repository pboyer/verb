package verb;

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

class NurbsSurface extends AsyncObject {

    private var _data : SurfaceData;

    private function new( data : SurfaceData ) {
        _data = data;
    }

    private function byControlPointsWeights( degreeU, degreeV, knotsU, knotsV, controlPoints, weights ) {
        return new NurbsSurface( new SurfaceData( degreeU, degreeV, knotsU, knotsV, Eval.homogenize2d(controlPoints, weights) ) );
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

    public function split( u : Float, v : Float, useV : Bool = false ) : Array<NurbsSurface> {
        return Modify.surfaceSplit( _data, u, useV ).map(function(x){ return new NurbsSurface(x); });
    }

    public function splitAsync( u : Float, v : Float, useV : Bool = false ) : Promise<NurbsSurface> {
        return defer( Tess, 'surfaceSplit', [ _data, u, v, useV ] );
    }

    public function tessellate(options : AdaptiveRefinementOptions = null) : MeshData {
        return Tess.rationalSurfaceAdaptive( _data, options );
    }

    public function tessellateAsync( options : AdaptiveRefinementOptions = null ) : Promise<MeshData> {
        return defer( Tess, 'rationalSurfaceAdaptive', [ _data,  options ] );
    }

    public function transform( mat : Matrix ) : NurbsSurface {
        return new NurbsSurface( Modify.rationalSurfaceTransform( _data, mat ) );
    }

    public function transformAsync( mat : Matrix ) : Promise<NurbsSurface> {
        return defer( Modify, 'rationalSurfaceTransform', [ _data,  mat ] );
    }
}
