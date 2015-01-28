package verb.core;

import verb.core.types.NurbsSurfaceData;
import verb.core.types.NurbsCurveData;

@:expose("core.Check")
class Check {

    // Validate a NurbsCurveData object
    //
    // **params**
    // + The data object
    //
    // **returns**
    // + The original, unmodified data

    public static function nurbsCurveData( data : NurbsCurveData ) : NurbsCurveData {
        if ( data.controlPoints == null ) throw "Control points array cannot be null!";
        if ( data.degree == null ) throw "Degree cannot be null!";
        if ( data.degree < 1 ) throw "Degree must be greater than 1!";
        if ( data.knots == null ) throw "Knots cannot be null!";

        if ( data.knots.length != data.controlPoints.length + data.degree + 1 ){
            throw "controlPoints.length + degree + 1 must equal knots.length!";
        }

        if (!Vec.isValidKnotVector( data.knots, data.degree )){
            throw "Invalid knot vector format!  Should begin with degree + 1 repeats and end with degree + 1 repeats!";
        }

        return data;
    }

    // Validate a NurbsSurfaceData object
    //
    // **params**
    // + The data object
    //
    // **returns**
    // + The original, unmodified data

    public static function nurbsSurfaceData( data : NurbsSurfaceData ) : NurbsSurfaceData {
        if ( data.controlPoints == null ) throw "Control points array cannot be null!";
        if ( data.degreeU == null ) throw "DegreeU cannot be null!";
        if ( data.degreeV == null ) throw "DegreeV cannot be null!";
        if ( data.degreeU < 1 ) throw "DegreeU must be greater than 1!";
        if ( data.degreeV < 1 ) throw "DegreeV must be greater than 1!";
        if ( data.knotsU == null ) throw "KnotsU cannot be null!";
        if ( data.knotsV == null ) throw "KnotsV cannot be null!";

        if ( data.knotsU.length != data.controlPoints.length + data.degreeU + 1 ){
            throw "controlPointsU.length + degreeU + 1 must equal knotsU.length!";
        }

        if ( data.knotsV.length != data.controlPoints[0].length + data.degreeV + 1 ){
            throw "controlPointsV.length + degreeV + 1 must equal knotsV.length!";
        }

        if (!Vec.isValidKnotVector( data.knotsU, data.degreeU ) || !Vec.isValidKnotVector( data.knotsV, data.degreeV )){
            throw "Invalid knot vector format!  Should begin with degree + 1 repeats and end with degree + 1 repeats!";
        }

        return data;
    }
}
