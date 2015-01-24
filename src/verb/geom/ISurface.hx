package verb.geom;

import verb.core.types.NurbsSurfaceData;
import verb.core.types.Interval;
import verb.core.types.NurbsCurveData.Point;
import verb.core.Mat;

interface ISurface {

    function asNurbs() : NurbsSurfaceData;
    function domainU() : Interval<Float>;
    function domainV() : Interval<Float>;
    function point(u : Float, v : Float) : Point;
    function derivatives(u : Float, v : Float, numDerivs : Int = 1) : Array<Array<Vector>>;

}
