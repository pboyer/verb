package verb.geom;

import verb.core.types.Interval;

import verb.core.types.NurbsCurveData;
import verb.core.Mat;

interface ICurve {

    function data() : NurbsCurveData;
    function domain() : Interval<Float>;
    function point(u : Float) : Point;
    function derivatives(u : Float, numDerivs : Int = 1) : Array<Vector>;

}
