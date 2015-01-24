package verb.geom;

import verb.core.Eval;
import verb.core.Make;
import verb.core.Mat.Vector;
import verb.core.types.NurbsCurveData.Point;

@:expose("geom.EllipseArc")
class EllipseArc extends NurbsCurve {

    private var _center : Point;
    private var _xaxis : Vector;
    private var _yaxis : Vector;
    private var _minAngle : Float;
    private var _maxAngle : Float;

    // public properties

    public function center(){ return _center; }
    public function xaxis(){ return _xaxis; }
    public function yaxis(){ return _yaxis; }
    public function minAngle(){ return _minAngle; }
    public function maxAngle(){ return _maxAngle; }

    // Create an EllipseArc
    //
    // **params**
    // + Length 3 array representing the center of the arc
    // + Length 3 array representing the xaxis
    // + Length 3 array representing the perpendicular yaxis
    // + Minimum angle of the EllipseArc
    // + Maximum angle of the EllipseArc

    public function new(   center : Point,
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
}