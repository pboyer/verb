package verb.geom;

import verb.core.Data;
import verb.core.Vec;
import verb.core.Mat;
import verb.core.Serialization;

//An interface representing a Curve

interface ICurve extends ISerializable {

    //Provide the NURBS representation of the curve
    //
    //**returns**
    //
    //* A NurbsCurveData object representing the curve

    function asNurbs() : NurbsCurveData;

    //Obtain the parametric domain of the curve
    //
    //**returns**
    //
    //* An Interval object containing the min and max of the domain

    function domain() : Interval<Float>;

    //Evaluate a point on the curve
    //
    //**params**
    //
    //* The parameter on the curve
    //
    //**returns**
    //
    //* The evaluated point

    function point(u : Float) : Point;

    //Evaluate the derivatives at a point on a curve
    //
    //**params**
    //
    //* The parameter on the curve
    //* The number of derivatives to evaluate on the curve
    //
    //**returns**
    //
    //* An array of derivative vectors

    function derivatives(u : Float, numDerivs : Int = 1) : Array<Vector>;
}
