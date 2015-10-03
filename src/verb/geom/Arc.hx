package verb.geom;

import verb.core.Eval;
import verb.core.Make;
import verb.core.Mat.Vector;
import verb.core.types.NurbsCurveData.Point;

@:expose("geom.Arc")
class Arc extends NurbsCurve {

    private var _center : Point;
    private var _xaxis : Vector;
    private var _yaxis : Vector;
    private var _radius : Float;
    private var _minAngle : Float;
    private var _maxAngle : Float;

    //public properties

    public function center(){ return _center; }
    public function xaxis(){ return _xaxis; }
    public function yaxis(){ return _yaxis; }
    public function radius(){ return _radius; }
    public function minAngle(){ return _minAngle; }
    public function maxAngle(){ return _maxAngle; }

    //Constructor for Arc
    //
    //**params**
    //
    //* Length 3 array representing the center of the arc
    //* Length 3 array representing the xaxis
    //* Length 3 array representing the perpendicular yaxis
    //* Radius of the arc arc
    //* Start angle in radians
    //* End angle in radians

    public function new(   center : Point,
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
}