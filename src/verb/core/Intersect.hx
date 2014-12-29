package verb.core;

import verb.core.types.CurveData.Point;

@:expose("core.Intersect")
class Intersect {

    //
    // Find the closest parameter on two rays, see http://geomalgorithms.com/a07-_distance.html
    //
    // **params**
    // + origin for ray 1
    // + direction of ray 1, assumed normalized
    // + origin for ray 1
    // + direction of ray 1, assumed normalized
    //
    // **returns**
    // + a 2d array specifying the intersections on u params of intersections on curve 1 and curve 2
    //

    public static function rays( a0 : Point, a : Point, b0 : Point, b : Point ) : Array<Float> {

        var dab = Vec.dot( a, b ),
        dab0 = Vec.dot( a, b0 ),
        daa0 = Vec.dot( a, a0 ),
        dbb0 = Vec.dot( b, b0 ),
        dba0 = Vec.dot( b, a0 ),
        daa = Vec.dot( a, a ),
        dbb = Vec.dot( b, b ),
        div = daa*dbb - dab*dab;

        // parallel case
        if ( Math.abs( div ) < Constants.EPSILON ) {
            return null;
        }

        var num = dab * (dab0-daa0) - daa * (dbb0-dba0),
        w = num / div,
        t = (dab0 - daa0 + w * dab)/daa;

        return [t, w];

    }

}

