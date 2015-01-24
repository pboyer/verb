package verb.geom;
import verb.core.types.CurveData.Point;
import verb.core.Make;

@:expose("geom.RevolvedSurface")

class RevolvedSurface extends NurbsSurface {

    // Construct a revolved surface
    //
    // **params**
    // + The profile curve
    // + A point on the axis of revolution
    // + The direction of the axis of revolution
    // + The angle to revolve around.  2 * Math.PI corresponds to a complete revolution

    public function new( profile : NurbsCurve, center : Point, axis : Point, angle : Float )  {
        super( Make.revolvedSurface( profile.data(), center, axis, angle ) );
    }
}
