package verb.geom;

import verb.eval.Eval;
import verb.eval.Make;
import verb.core.Vec;
import verb.core.Data;

import haxe.Serializer;
import haxe.Unserializer;

// An Arc is a three dimensional curve representing a subset of a full Circle

@:expose("geom.Arc")
class Arc extends NurbsCurve {

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

    private var _center : Point;
    private var _xaxis : Vector;
    private var _yaxis : Vector;
    private var _radius : Float;
    private var _minAngle : Float;
    private var _maxAngle : Float;

    //Length 3 array representing the center of the arc
    public function center() : Point { return _center; }

    //Length 3 array representing the xaxis
    public function xaxis() : Vector { return _xaxis; }

    //Length 3 array representing the perpendicular yaxis
    public function yaxis() : Vector { return _yaxis; }

    //Radius of the arc
    public function radius() : Float { return _radius; }

    //Start angle in radians
    public function minAngle() : Float { return _minAngle; }

    //End angle in radians
    public function maxAngle() : Float { return _maxAngle; }

}