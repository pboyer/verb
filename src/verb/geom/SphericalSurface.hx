package verb.geom;

import verb.eval.Make;
import verb.core.Vec;
import verb.core.Data;
import verb.core.Mat;

// A surface representing the doubly curved surface of a sphere

@:expose("geom.SphericalSurface")
class SphericalSurface extends NurbsSurface {

    //Create a spherical surface
    //
    //**params**
    //
    //* Length 3 array representing the center of the circle
    //* Radius of the circle

    public function new(   center : Point,
                           radius : Float ) {
        super( Make.sphericalSurface( center, [0,0,1], [1,0,0], radius ));

        _center = center;
        _radius = radius;
    }

    private var _center : Point;
    private var _radius : Float;

    //Length 3 array representing the center of the circle

    public function center() : Point{ return _center; }

    //Radius of the circle

    public function radius() : Float{ return _radius; }


}
