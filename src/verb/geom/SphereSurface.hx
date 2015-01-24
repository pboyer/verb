package verb.geom;

import verb.core.Make;
import verb.core.types.CurveData;
import verb.core.Mat;

@:expose("geom.SphereSurface")
class SphereSurface extends NurbsSurface {

    private var _center : Point;
    private var _radius : Float;

    // public properties

    public function center(){ return _center; }
    public function radius(){ return _radius; }

    // Create a spherical surface
    //
    // **params**
    // + Length 3 array representing the center of the circle
    // + Radius of the circle

    public function new(   center : Point,
                           radius : Float ) {
        super( Make.sphereSurface( center, [0,0,1], [1,0,0], radius ));

        _center = center;
        _radius = radius;
    }
}
