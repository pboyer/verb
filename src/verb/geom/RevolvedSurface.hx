package verb.geom;
import verb.core.Mat.Vector;
import verb.core.types.NurbsCurveData.Point;
import verb.core.Make;

@:expose("geom.RevolvedSurface")
class RevolvedSurface extends NurbsSurface {

    private var _profile : ICurve;
    private var _center : Point;
    private var _axis : Vector;
    private var _angle : Float;

    public function profile() { return _profile; }
    public function center() { return _center; }
    public function axis() { return _center; }
    public function angle() { return _angle; }

    //Construct a revolved surface
    //
    //**params**
    //
    //* The profile curve
    //* A point on the axis of revolution
    //* The direction of the axis of revolution
    //* The angle to revolve around.  2 * Math.PI corresponds to a complete revolution

    public function new( profile : NurbsCurve, center : Point, axis : Vector, angle : Float )  {
        super( Make.revolvedSurface( profile.asNurbs(), center, axis, angle ) );

        _profile = profile;
        _center = center;
        _axis = axis;
        _angle = angle;
    }
}
