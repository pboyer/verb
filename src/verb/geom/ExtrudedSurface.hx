package verb.geom;
import verb.core.Make;
import verb.core.Vec;
import verb.core.Mat.Vector;

@:expose("geom.ExtrudedSurface")
class ExtrudedSurface extends NurbsSurface {

    private var _profile : ICurve;
    private var _direction : Vector;

    // public properties

    public function profile() { return _profile; }
    public function direction() { return _direction; }

    // Construct a Surface by extruding a curve
    //
    // **params**
    // + The profile curve
    // + The direction and magnitude of the extrusion

    public function new( profile : ICurve, direction : Vector ) {
        super( Make.extrudedSurface( Vec.normalized( direction ), Vec.norm( direction ), profile.data() ));

        _profile = profile;
        _direction = direction;
    }

}
