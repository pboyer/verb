package verb.geom;

import verb.core.Data;
import verb.core.Vec;

import verb.eval.Make;

// A Circle is a three dimensional curve representing the points that are equidistant from a point in a particular plane

@:expose("geom.Circle")
class Circle extends Arc {

    //Create a circle
    //
    //**params**
    //
    //* Length 3 array representing the center of the circle
    //* Length 3 array representing the xaxis
    //* Length 3 array representing the perpendicular yaxis
    //* Radius of the circle

    public function new(   center : Point,
                            xaxis : Vector,
                            yaxis : Vector,
                            radius : Float ) {
        super( center, xaxis, yaxis, radius, 0, Math.PI * 2 );
    }
}
