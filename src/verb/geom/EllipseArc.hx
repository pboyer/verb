package verb.geom;

import verb.eval.Eval;
import verb.eval.Make;
import verb.core.Vec;
import verb.core.Data;

// An EllipseArc is a subset of an Ellipse

@:expose("geom.EllipseArc")
class EllipseArc extends NurbsCurve {

    //Create an EllipseArc
    //
    //**params**
    //
    //* Length 3 array representing the center of the arc
    //* Length 3 array representing the xaxis
    //* Length 3 array representing the perpendicular yaxis
    //* Minimum angle of the EllipseArc
    //* Maximum angle of the EllipseArc

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

    private var _center : Point;
    private var _xaxis : Vector;
    private var _yaxis : Vector;
    private var _minAngle : Float;
    private var _maxAngle : Float;

    //Length 3 array representing the center of the arc
    public function center(){ return _center; }

    //Length 3 array representing the xaxis
    public function xaxis(){ return _xaxis; }

    //Length 3 array representing the perpendicular yaxis
    public function yaxis(){ return _yaxis; }

    //Minimum angle of the EllipseArc
    public function minAngle(){ return _minAngle; }

    //Maximum angle of the EllipseArc
    public function maxAngle(){ return _maxAngle; }


}