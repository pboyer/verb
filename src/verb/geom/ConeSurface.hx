package verb.geom;

import verb.core.Make;
import verb.core.Mat.Vector;
import verb.core.types.CurveData.Point;

@:expose("geom.ConeSurface")
class ConeSurface extends NurbsSurface {

    // Make a conical surface
    //
    // **params**
    // + Length 3 array representing the axis of the cone
    // + Length 3 array representing the x axis, perpendicular to the axis
    // + Length 3 array representing the base of the cone
    // + Height of the cone
    // + Radius of the cone

    public function new(axis : Vector, xaxis : Vector, base : Point, height : Float, radius : Float )  {
        super( Make.coneSurface(axis, xaxis, base, height, radius ));
    }
}
