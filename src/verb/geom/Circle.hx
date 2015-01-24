package verb.geom;

import verb.core.Mat.Vector;
import verb.core.types.NurbsCurveData.Point;
import verb.core.Make;

@:expose("geom.Circle")
class Circle extends Arc {

    // Create a circle
    //
    // **params**
    // + Length 3 array representing the center of the circle
    // + Length 3 array representing the xaxis
    // + Length 3 array representing the perpendicular yaxis
    // + Radius of the circle

    public function new(   center : Point,
                            xaxis : Vector,
                            yaxis : Vector,
                            radius : Float ) {
        super( center, xaxis, yaxis, radius, 0, Math.PI * 2 );
    }
}
