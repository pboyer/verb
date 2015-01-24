package verb.geom;

import verb.core.Make;
import verb.core.Mat.Vector;
import verb.core.types.CurveData.Point;

@:expose("geom.ConeSurface")
class ConeSurface extends NurbsSurface {

    public var _axis : Vector;
    public var _xaxis : Vector;
    public var _base : Point;
    public var _height : Float;
    public var _radius : Float;

    // public properties

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
        super( Make.coneSurface(axis, xaxis, base, height, radius ));

        _axis = axis;
        _xaxis = xaxis;
        _base = base;
        _height = height;
        _radius = radius;
    }
}
