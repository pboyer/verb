package verb;

import verb.core.Mat.Vector;
import verb.core.types.CurveData.Point;

@:expose("Ellipse")
class Ellipse extends EllipseArc {

    private function new(   center : Point,
                            xaxis : Vector,
                            yaxis : Vector ) {
        super( center, xaxis, yaxis, 0, Math.PI * 2 );
    }

    // Create an ellipse
    //
    // **params**
    // + Length 3 array representing the center of the circle
    // + Length 3 array representing the xaxis
    // + Length 3 array representing the perpendicular yaxis
    //
    public static function byCenterAxes(center : Point,
                                        xaxis : Vector,
                                        yaxis : Vector ) : Ellipse {
        return new Ellipse( center, xaxis, yaxis );
    }

}
