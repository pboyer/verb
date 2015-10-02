package verb.geom;

import verb.core.Make;
import verb.core.Mat.Vector;
import verb.core.types.NurbsCurveData.Point;

@:expose("geom.ConicalSurface")
class ConicalSurface extends NurbsSurface {

    private var _axis : Vector;
    private var _xaxis : Vector;
    private var _base : Point;
    private var _height : Float;
    private var _radius : Float;

    public function axis(){ return _axis; }
    public function xaxis(){ return _xaxis; }
    public function base(){ return _base; }
    public function height(){ return _height; }
    public function radius(){ return _radius; }

    // Make a conical surface
    //
    // **params**
    // + Length 3 array representing the axis of the cone
    // + Length 3 array representing the x axis, perpendicular to the axis
    // + Length 3 array representing the base of the cone
    // + Height of the cone
    // + Radius of the cone

    public function new(axis : Vector, xaxis : Vector, base : Point, height : Float, radius : Float )  {
        super( Make.conicalSurface(axis, xaxis, base, height, radius ));

        _axis = axis;
        _xaxis = xaxis;
        _base = base;
        _height = height;
        _radius = radius;
    }
}
