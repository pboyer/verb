package verb.geom;

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

@:expose("geom.NurbsSurface")
class NurbsSurface extends AsyncObject implements ISurface {

    // underlying serializable, data object
    private var _data : SurfaceData;

    // public properties

    public function degreeU() : Int { return _data.degreeU; }
    public function degreeV() : Int { return _data.degreeV; }
    public function knotsU() : Array<Float> { return _data.knotsU.slice(0); }
    public function knotsV() : Array<Float> { return _data.knotsV.slice(0); }
    public function controlPoints() : Array<Array<Point>> { return Eval.dehomogenize2d(_data.controlPoints); }
    public function weights() : Array<Point> { return Eval.weight2d(_data.controlPoints); }

    // Construct a NurbsSurface by a SurfaceData object
    //
    // **params**
    // + The data object
    //
    // **returns**
    // + A new NurbsSurface

    public function new( data : SurfaceData ) {
        _data = data;
    }

    // Construct a NurbsSurface by degree, knots, control points, weights
    //
    // **params**
    // + The degree in the U direction
    // + The degree in the V direction
    // + The knot array in the U direction
    // + The knot array in the V direction
    // + Two dimensional array of points
    // + Two dimensional array of weight values
    //
    // **returns**
    // + A new NurbsSurface

    public static function byControlPointsWeights( degreeU : Int,
                                                   degreeV : Int,
                                                   knotsU : KnotArray,
                                                   knotsV : KnotArray,
                                                   controlPoints : Array<Array<Point>>,
                                                   weights : Array<Array<Float>> ) : NurbsSurface {
        return new NurbsSurface( new SurfaceData( degreeU, degreeV, knotsU, knotsV, Eval.homogenize2d(controlPoints, weights) ) );
    }

    // Construct a NurbsSurface from four perimeter points in counter-clockwise order
    //
    // **params**
    // + The first point
    // + The second point
    // + The third point
    // + The fourth point
    //
    // **returns**
    // + A new NurbsSurface

    public static function byCorners( point0 : Point, point1 : Point, point2 : Point, point3 : Point ) : NurbsSurface {
        return new NurbsSurface( Make.fourPointSurface( point0, point1, point2, point3 ) );
    }

    // Obtain a copy of the underlying data structure for the Surface. Used with verb.core.
    //
    // **returns**
    // + A new SurfaceData object

    public function data() : SurfaceData {
        return new SurfaceData( degreeU(), degreeV(), knotsU(), knotsV(), Eval.homogenize2d( controlPoints(), weights() ));
    }

    // Obtain a copy of the Surface
    //
    // **returns**
    // + A new NurbsSurface

    public function clone() : NurbsSurface {
        return new NurbsSurface( data() );
    }

    // The parametric domain in the U direction
    //
    // **returns**
    // + An Interval object with min and max property

    public function domainU() : Interval<Float> {
        return new Interval( _data.knotsU.first(), _data.knotsU.last());
    }

    // The parametric domain in the V direction
    //
    // **returns**
    // + An Interval object with min and max property

    public function domainV() : Interval<Float> {
        return new Interval( _data.knotsV.first(), _data.knotsV.last());
    }

    // Obtain a point on the surface at the given parameter
    //
    // **params**
    // + The u parameter
    // + The v parameter
    //
    // **returns**
    // + A point on the surface

    public function point( u : Float, v : Float ) : Point {
        return Eval.rationalSurfacePoint( _data, u, v );
    }

    public function pointAsync( u : Float, v : Float ) : Promise<Point> {
        return defer( Eval, 'rationalSurfacePoint', [ _data, u, v ] );
    }

    // Obtain the normal to the surface at the given parameter
    //
    // **params**
    // + The u parameter
    // + The v parameter
    //
    // **returns**
    // + A normalized vector normal to the surface

    public function normal( u : Float, v : Float ) : Point {
        return Eval.rationalSurfaceNormal( _data, u, v );
    }

    public function normalAsync( u : Float, v : Float ) : Promise<Array<Array<Vector>>> {
        return defer( Eval, 'rationalSurfaceNormal', [ _data, u, v ] );
    }

    // Obtain the derivatives of the NurbsSurface.  Returns a two dimensional array
    // containing the derivative vectors.  Increasing U partial derivatives are increasing
    // row-wise.  Increasing V partial derivatives are increasing column-wise.  Therefore,
    // the [0][0] position is a point on the surface, [n][0] is the nth V partial derivative,
    // the [1][1] position is twist vector or mixed partial derivative Puv.
    //
    // **params**
    // + The u parameter
    // + The v parameter
    // + Number of derivatives to evaluate
    //
    // **returns**
    // + A two dimensional array of vectors

    public function derivatives( u : Float, v : Float, numDerivs : Int = 1 ) : Array<Array<Vector>> {
        return Eval.rationalSurfaceDerivatives( _data, u, v, numDerivs );
    }

    public function derivativesAsync( u : Float, v : Float, numDerivs : Int = 1 ) : Promise<Array<Array<Vector>>> {
        return defer( Eval, 'rationalSurfaceDerivatives', [ _data, u, v, numDerivs ] );
    }

    // Get the closest parameter on the surface to a point
    //
    // **params**
    // + The point
    //
    // **returns**
    // + The closest point

    public function closestParam( pt : Point ) : UV {
        return Analyze.rationalSurfaceClosestParam( _data, pt );
    }

    public function closestParamAsync( pt : Point ) : Promise<UV> {
        return defer( Analyze, 'rationalSurfaceClosestParam', [ _data, pt ] );
    }

    // Get the closest point on the surface to a point
    //
    // **params**
    // + The point
    //
    // **returns**
    // + The closest point

    public function closestPoint( pt : Point ) : Point {
        return Analyze.rationalSurfaceClosestPoint( _data, pt );
    }

    public function closestPointAsync( pt : Point ) : Promise<Point> {
        return defer( Analyze, 'rationalSurfaceClosestPoint', [ _data, pt ] );
    }

    // Split a surface
    //
    // **params**
    // + The parameter to do the split
    // + Whether to divide in V or U
    //
    // **returns**
    // + A length 2 array with two new NurbsSurface objects

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

    // Tessellate the surface
    //
    // **params**
    // + an AdaptiveRefinementOptions object
    //
    // **returns**
    // + A MeshData object

    public function tessellate( options : AdaptiveRefinementOptions = null) : MeshData {
        return Tess.rationalSurfaceAdaptive( _data, options );
    }

    public function tessellateAsync( options : AdaptiveRefinementOptions = null ) : Promise<MeshData> {
        return defer( Tess, 'rationalSurfaceAdaptive', [ _data,  options ] );
    }

    // Transform a Surface with the given matrix.
    //
    // **params**
    // + 4x4 array representing the transform
    //
    // **returns**
    // + A new Surface

    public function transform( mat : Matrix ) : NurbsSurface {
        return new NurbsSurface( Modify.rationalSurfaceTransform( _data, mat ) );
    }

    public function transformAsync( mat : Matrix ) : Promise<NurbsSurface> {
        return defer( Modify, 'rationalSurfaceTransform', [ _data,  mat ] )
            .then(function(x){ return new NurbsSurface(x); });
    }
}
