package verb.geom;

import verb.core.Make;
import verb.core.types.CurveData;
import verb.core.Mat;

@:expose("geom.Sphere")
class Sphere extends NurbsSurface {

    private function new(   center : Point,
                            radius : Float ) {
        super( Make.sphereSurface( center, [0,0,1], [1,0,0], radius ));
    }

    // Create a spherical surface
    //
    // **params**
    // + Length 3 array representing the center of the circle
    // + Radius of the circle
    //
    // **returns**
    // A Sphere object

    public static function byCenterRadius(  center : Point,
                                            radius : Float ) : Sphere {
        return new Sphere(center, radius );
    }
}
