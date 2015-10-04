package verb.geom;

import verb.eval.Make;
import verb.core.Vec;
import verb.core.Data;

// A SweptSurface uses a profile curve and a guide rail to form a surface. The profile curve is "swept" along the guide
// rail by a lofting operation.

@:expose("geom.SweptSurface")
class SweptSurface extends NurbsSurface {

    //Construct a Surface by translating along a rail curve
    //
    //**params**
    //
    //* The profile curve
    //* The rail curve

    public function new( profile : ICurve, rail : ICurve ) {
        super( Make.rationalTranslationalSurface( profile.asNurbs(), rail.asNurbs() ));

        _profile = profile;
        _rail = rail;
    }

    private var _profile : ICurve;
    private var _rail : ICurve;

    //The profile curve

    public function profile() : ICurve { return _profile; }

    //The rail curve

    public function rail() : ICurve { return _rail; }


}
