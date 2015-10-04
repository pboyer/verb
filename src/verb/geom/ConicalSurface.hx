package verb.geom;

import verb.eval.Make;
import verb.core.Data;
import verb.core.Vec;

// A ConicalSurface is a surface making up the curve surface of a cone

@:expose("geom.ConicalSurface")
class ConicalSurface extends NurbsSurface {

    //Make a conical surface
    //
    //**params**
    //
    //* Length 3 array representing the axis of the cone
    //* Length 3 array representing the x axis, perpendicular to the axis
    //* Length 3 array representing the base of the cone
    //* Height of the cone
    //* Radius of the cone

    public function new(axis : Vector, xaxis : Vector, base : Point, height : Float, radius : Float )  {
        super( Make.conicalSurface(axis, xaxis, base, height, radius ));

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

    //Length 3 array representing the axis of the cone
    public function axis(){ return _axis; }

    //Length 3 array representing the x axis, perpendicular to the axis
    public function xaxis(){ return _xaxis; }

    //Length 3 array representing the base of the cone
    public function base(){ return _base; }

    //Height of the cone
    public function height(){ return _height; }

    //Radius of the cone
    public function radius(){ return _radius; }

}
