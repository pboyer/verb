package verb.geom;

import verb.core.Make;
@:expose("geom.CylinderSurface")
class CylinderSurface extends NurbsSurface {

    // Constructor for Cylinder
    //
    // **params**
    // + *Array*, Length 3 array representing the axis of the cylinder
    // + *Array*, Length 3 array representing the x axis, perpendicular to the axis
    // + *Array*, Length 3 array representing the base of the cylinder
    // + *Number*, Height of the cylinder
    // + *Number*, Radius of the cylinder

    public function new(axis, xaxis, base, height, radius) {
        super(Make.cylinderSurface(axis, xaxis, base, height, radius));
    }
}
