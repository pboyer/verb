package verb.geom;
import verb.core.Make;
import verb.core.Vec;
import verb.core.Mat.Vector;

@:expose("geom.ExtrudedSurface")
class ExtrudedSurface extends NurbsSurface {

    // Construct a Surface by extruding a curve
    //
    // **params**
    // + The profile curve
    // + The direction and magnitude of the extrusion

    public function new( profile : NurbsCurve, direction : Vector ) {
        super( Make.extrudedSurface( Vec.normalized( direction ), Vec.norm( direction ), profile.data() ));
    }
}
