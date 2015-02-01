package verb.geom;

import verb.core.Make;

@:expose("geom.SweptSurface")
class SweptSurface extends NurbsSurface {

    private var _profile : ICurve;
    private var _rail : ICurve;

    // public properties

    public function profile() { return _profile; }
    public function rail() { return _rail; }

    // Construct a Surface by translating along a rail curve
    //
    // **params**
    // + The profile curve
    // + The rail curve

    public function new( profile : ICurve, rail : ICurve ) {
        super( Make.rationalTranslationalSurface( profile.asNurbs(), rail.asNurbs() ));

        _profile = profile;
        _rail = rail;
    }

}
