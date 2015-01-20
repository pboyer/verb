package verb;

import verb.core.Eval;
import verb.core.Make;
import verb.core.Mat.Vector;
import verb.core.types.CurveData.Point;

@:expose("Arc")
class Arc extends NurbsCurve {

    private var _center : Point;
    private var _xaxis : Vector;
    private var _yaxis : Vector;
    private var _radius : Float;
    private var _minAngle : Float;
    private var _maxAngle : Float;

    function new(   center : Point,
                    xaxis : Vector,
                    yaxis : Vector,
                    radius : Float,
                    minAngle : Float,
                    maxAngle : Float ) {

        super( Make.arc(center, xaxis, yaxis, radius, minAngle, maxAngle ) );

        _center = center;
        _xaxis = xaxis;
        _yaxis = yaxis;
        _radius = radius;
        _minAngle = minAngle;
        _maxAngle = maxAngle;

    }

    public static function byCenterAxesRadius(  center : Point,
                                                xaxis : Vector,
                                                yaxis : Vector,
                                                radius : Float,
                                                minAngle : Float,
                                                maxAngle : Float ) {

        return new Arc(center, xaxis, yaxis, radius, minAngle, maxAngle );
    }

    public function center(){
        return _center;
    }

    public function xaxis(){
        return _xaxis;
    }

    public function yaxis(){
        return _yaxis;
    }

    public function radius(){
        return _radius;
    }

    public function minAngle(){
        return _minAngle;
    }

    public function maxAngle(){
        return _maxAngle;
    }
}