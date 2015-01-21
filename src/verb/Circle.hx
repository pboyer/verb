package verb;

import verb.core.Mat.Vector;
import verb.core.types.CurveData.Point;
import verb.core.Make;

@:expose("Circle")
class Circle extends Arc {

    private function new(   center : Point,
                            xaxis : Vector,
                            yaxis : Vector,
                            radius : Float ) {
        super( center, xaxis, yaxis, radius, 0, Math.PI * 2 );
    }

    // Create a circle
    //
    // **params**
    // + Length 3 array representing the center of the circle
    // + Length 3 array representing the xaxis
    // + Length 3 array representing the perpendicular yaxis
    // + Radius of the circle
    //
    public static function byCenterAxesRadius(  center : Point,
                                                xaxis : Vector,
                                                yaxis : Vector,
                                                radius : Float ) : Circle {
        return new Circle(center, xaxis, yaxis, radius );
    }

}
