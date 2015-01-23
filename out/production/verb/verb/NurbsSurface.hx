package verb;

import verb.core.Analyze;
import verb.core.ArrayExtensions;
using verb.core.ArrayExtensions;

import verb.core.types.Interval;
import verb.core.types.CurveData.KnotArray;
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
    public function controlPoints() : Array<Point> { return Eval.dehomogenize2d(_data.controlPoints); }
    public function weights() : Array<Float> { return Eval.weight2d(_data.controlPoints); }

    public function data() : SurfaceData {
        return new SurfaceData( degreeU(), degreeV(), knotsU(), knotsV, Eval.homogenize2d( controlPoints(), weights() ));
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

    public function normal( u : Float, v : Float ) : Point {
        return Eval.rationalSurfaceNormal( _data, u, v );
    }

    public function derivatives( u : Float, v : Float, numDerivs : Int = 1 ) : Array<Array<Vector>> {
        return Eval.rationalSurfaceDerivatives( _data, u, v );
    }

    public function closestParam( pt : Point ) : Float {
        return Analyze.rationalSurfaceClosestParam( _data, pt );
    }

    public function closestPoint( pt : Point ) : Point {
        return Analyze.rationalSurfaceClosestPoint( _data, pt );
    }

}
