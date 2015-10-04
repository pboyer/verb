package verb.geom;

import verb.core.Data;
import verb.core.Vec;
import verb.eval.Make;

// A surface formed by revolving a profile curve around a given axis line

@:expose("geom.RevolvedSurface")
class RevolvedSurface extends NurbsSurface {

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

    private var _profile : ICurve;
    private var _center : Point;
    private var _axis : Vector;
    private var _angle : Float;

    //The profile curve

    public function profile() : ICurve { return _profile; }

    //A point on the axis of revolution

    public function center() : Point { return _center; }

    //The direction of the axis of revolution

    public function axis() : Vector { return _center; }

    //The angle to revolve around.  2 * Math.PI corresponds to a complete revolution

    public function angle() : Float { return _angle; }

}
