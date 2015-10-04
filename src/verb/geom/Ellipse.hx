package verb.geom;

import verb.core.Vec;
import verb.core.Data;

// A CylindricalSurface is a surface making up part of a cylinder.

@:expose("geom.Ellipse")
class Ellipse extends EllipseArc {

    //Create an ellipse
    //
    //**params**
    //
    //
    //* Length 3 array representing the center of the circle
    //* Length 3 array representing the xaxis
    //* Length 3 array representing the perpendicular yaxis

    public function new(   center : Point,
                            xaxis : Vector,
                            yaxis : Vector ) {
        super( center, xaxis, yaxis, 0, Math.PI * 2 );
    }
}
