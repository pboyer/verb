package verb.geom;


import verb.eval.Make;
import verb.core.Mat;
import verb.core.Vec;
import verb.core.Data;

// A CylindricalSurface is a surface making up the curve surface of a cylinder

@:expose("geom.CylindricalSurface")
class CylindricalSurface extends NurbsSurface {

    //Constructor for Cylinder
    //
    //**params**
    //
    //* Length 3 array representing the axis of the cylinder
    //* Length 3 array representing the x axis, perpendicular to the axis
    //* Length 3 array representing the base of the cylinder
    //* Height of the cylinder
    //* Radius of the cylinder

    public function new(axis : Vector, xaxis : Vector, base : Point, height : Float, radius : Float) {
        super(Make.cylindricalSurface(axis, xaxis, base, height, radius));

        _axis = axis;
        _xaxis = xaxis;
        _base = base;
        _height = height;
        _radius = radius;
    }

    private var _axis : Vector;
    private var _xaxis : Vector;
    private var _base : Point;
    private var _height : Float;
    private var _radius : Float;

    //Length 3 array representing the axis of the cylinder
    public function axis(){ return _axis; }

    //Length 3 array representing the x axis, perpendicular to the axis
    public function xaxis(){ return _xaxis; }

    //Length 3 array representing the base of the cylinder
    public function base(){ return _base; }

    //Height of the cylinder
    public function height(){ return _height; }

    //Radius of the cylinder
    public function radius(){ return _radius; }
}
