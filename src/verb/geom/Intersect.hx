package verb.geom;

import promhx.Promise;
import verb.exe.Dispatcher;
import verb.core.types.CurveCurveIntersection;
import verb.core.types.CurveSurfaceIntersection;

@:expose("geom.Intersect")
class Intersect {

    // Determine the intersection of two curves
    //
    // **params**
    // + CurveData object representing the first NURBS curve
    // + CurveData object representing the second NURBS curve
    // + tolerance for the intersection
    //
    // **returns**
    // + a possibly empty array of CurveCurveIntersection objects

    public static function curves( first : ICurve, second : ICurve, tol : Float = 1e-3  ) : Array<CurveCurveIntersection> {
        return verb.core.Intersect.curves( first.data(), second.data(), tol );
    }

    public static function curvesAsync( first : ICurve, second : ICurve, tol : Float = 1e-3 ) : Promise<Array<CurveCurveIntersection>> {
        return Dispatcher.dispatchMethod( "verb.core.Intersect", "curves", [first.data(), second.data(), tol ]);
    }

    public static function curveAndSurface( curve : ICurve, surface : ISurface, tol : Float = 1e-3 ) : Array<CurveSurfaceIntersection> {
        return verb.core.Intersect.curveAndSurface( curve.data(), surface.data(), tol);
    }

    public static function curveAndSurfaceAsync( curve : ICurve, surface : ISurface, tol : Float = 1e-3 ) : Promise<Array<CurveSurfaceIntersection>> {
        return Dispatcher.dispatchMethod( "verb.core.Intersect", "curveAndSurface", [curve.data(), surface.data(), tol ]);
    }

    public static function surfaces( first : ISurface, second : ISurface, tol : Float = 1e-3  ) : Array<NurbsCurve> {
        return verb.core.Intersect.surfaces( first.data(), second.data(), tol )
            .map(function(cd){ return new NurbsCurve(cd); });
    }

    public static function surfacesAsync( first : ISurface, second : ISurface, tol : Float = 1e-3  ) : Promise<Array<NurbsCurve>> {
        return Dispatcher.dispatchMethod( "verb.core.Intersect", "surfaces", [first.data(), second.data(), tol])
            .then(function(cds){
                return cds.map(function(cd){ return new NurbsCurve(cd); });
            });
    }
}
