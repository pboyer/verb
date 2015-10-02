package verb.geom;

import verb.core.types.NurbsCurveData.Point;
import verb.core.Make;
import verb.core.Mat;

@:expose("geom.CylindricalSurface")
class CylindricalSurface extends NurbsSurface {

    private var _axis : Vector;
    private var _xaxis : Vector;
    private var _base : Point;
    private var _height : Float;
    private var _radius : Float;

    // public properties

    public function axis(){ return _axis; }
    public function xaxis(){ return _xaxis; }
    public function base(){ return _base; }
    public function height(){ return _height; }
    public function radius(){ return _radius; }

    // Constructor for Cylinder
    //
    // **params**
    // + Length 3 array representing the axis of the cylinder
    // + Length 3 array representing the x axis, perpendicular to the axis
    // + Length 3 array representing the base of the cylinder
    // + Height of the cylinder
    // + Radius of the cylinder

    public function new(axis : Vector, xaxis : Vector, base : Point, height : Float, radius : Float) {
        super(Make.cylindricalSurface(axis, xaxis, base, height, radius));

        _axis = axis;
        _xaxis = xaxis;
        _base = base;
        _height = height;
        _radius = radius;
    }
}
