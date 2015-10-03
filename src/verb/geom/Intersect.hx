package verb.geom;

import promhx.Promise;
import verb.exe.Dispatcher;
import verb.core.types.CurveCurveIntersection;
import verb.core.types.CurveSurfaceIntersection;

@:expose("geom.Intersect")
class Intersect {

    //Determine the intersection of two curves
    //
    //**params**
    //
    //* ICurve object
    //* ICurve object
    //* tolerance for the intersection
    //
    //**returns**
    //
    //* a possibly empty array of CurveCurveIntersection objects

    public static function curves( first : ICurve, second : ICurve, tol : Float = 1e-3  ) : Array<CurveCurveIntersection> {
        return verb.core.Intersect.curves( first.asNurbs(), second.asNurbs(), tol );
    }

    // The async version of the same method

    public static function curvesAsync( first : ICurve, second : ICurve, tol : Float = 1e-3 ) : Promise<Array<CurveCurveIntersection>> {
        return Dispatcher.dispatchMethod( verb.core.Intersect, "curves", [first.asNurbs(), second.asNurbs(), tol ]);
    }

    //Determine the intersection of a curve and a surface
    //
    //**params**
    //
    //* ICurve
    //* ISurface
    //* tolerance for the curve intersection
    //
    //**returns**
    //
    //* array of CurveSurfaceIntersection objects

    public static function curveAndSurface( curve : ICurve, surface : ISurface, tol : Float = 1e-3 ) : Array<CurveSurfaceIntersection> {
        return verb.core.Intersect.curveAndSurface( curve.asNurbs(), surface.asNurbs(), tol);
    }

    // The async version of the same method

    public static function curveAndSurfaceAsync( curve : ICurve, surface : ISurface, tol : Float = 1e-3 ) : Promise<Array<CurveSurfaceIntersection>> {
        return Dispatcher.dispatchMethod( verb.core.Intersect, "curveAndSurface", [curve.asNurbs(), surface.asNurbs(), tol ]);
    }

    //Determine the intersection of two surfaces
    //
    //**params**
    //
    //* ISurface
    //* ISurface
    //
    //**returns**
    //
    //* array of NurbsCurveData objects

    public static function surfaces( first : ISurface, second : ISurface, tol : Float = 1e-3  ) : Array<NurbsCurve> {
        return verb.core.Intersect.surfaces( first.asNurbs(), second.asNurbs(), tol )
            .map(function(cd){ return new NurbsCurve(cd); });
    }

    // The async version of the same method

    public static function surfacesAsync( first : ISurface, second : ISurface, tol : Float = 1e-3  ) : Promise<Array<NurbsCurve>> {
        return Dispatcher.dispatchMethod( verb.core.Intersect, "surfaces", [first.asNurbs(), second.asNurbs(), tol])
            .then(function(cds){
                return cds.map(function(cd){ return new NurbsCurve(cd); });
            });
    }
}
