package verb;

import verb.core.Eval;
import verb.core.Make;
import verb.core.Mat.Vector;
import verb.core.types.CurveData.Point;

@:expose("EllipseArc")
class EllipseArc extends NurbsCurve {

    private var _center : Point;
    private var _xaxis : Vector;
    private var _yaxis : Vector;
    private var _minAngle : Float;
    private var _maxAngle : Float;

    private function new(   center : Point,
                            xaxis : Vector,
                            yaxis : Vector,
                            minAngle : Float,
                            maxAngle : Float ) {
        super( Make.ellipseArc(center, xaxis, yaxis, minAngle, maxAngle) );

        _center = center;
        _xaxis = xaxis;
        _yaxis = yaxis;
        _minAngle = minAngle;
        _maxAngle = maxAngle;
    }

    //
    // Create an EllipseArc
    //
    // **params**
    // + Length 3 array representing the center of the arc
    // + Length 3 array representing the xaxis
    // + Length 3 array representing the perpendicular yaxis
    // + Minimum angle of the EllipseArc
    // + Maximum angle of the EllipseArc
    //
    public static function byCenterAxesSpan(    center : Point,
                                                xaxis : Vector,
                                                yaxis : Vector,
                                                minAngle : Float,
                                                maxAngle : Float ) : EllipseArc {
        return new EllipseArc(center, xaxis, yaxis, minAngle, maxAngle );
    }

    public function center(){ return _center; }
    public function xaxis(){ return _xaxis; }
    public function yaxis(){ return _yaxis; }
    public function minAngle(){ return _minAngle; }
    public function maxAngle(){ return _maxAngle; }

}