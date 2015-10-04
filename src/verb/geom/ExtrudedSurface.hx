package verb.geom;
import verb.eval.Make;
import verb.core.Vec;
import verb.core.Data;

// Form a Surface by extruding a curve along a vector

@:expose("geom.ExtrudedSurface")
class ExtrudedSurface extends NurbsSurface {

    //Construct a Surface by extruding a curve
    //
    //**params**
    //
    //* The profile curve
    //* The direction and magnitude of the extrusion

    public function new( profile : ICurve, direction : Vector ) {
        super( Make.extrudedSurface( Vec.normalized( direction ), Vec.norm( direction ), profile.asNurbs() ));

        _profile = profile;
        _direction = direction;
    }

    private var _profile : ICurve;
    private var _direction : Vector;

    //The profile curve

    public function profile() : ICurve { return _profile; }

    //The direction and magnitude of the extrusion

    public function direction() : Vector { return _direction; }

}
