package verb.core;

import verb.core.types.NurbsSurfaceData;
import verb.core.types.NurbsCurveData;

using verb.core.ArrayExtensions;

@:expose("core.Check")
class Check {

    public static function isValidKnotVector(vec : Array<Float>, degree : Int) : Bool {

        if (vec.length == 0) return false;
        if (vec.length < (degree + 1) * 2 ) return false;

        var rep = vec.first();

        for (i in 0...degree+1){
            if (Math.abs(vec[i]-rep) > Constants.EPSILON) return false;
        }

        rep = vec.last();

        for (i in vec.length-degree-1...vec.length){
            if (Math.abs(vec[i]-rep) > Constants.EPSILON) return false;
        }

        return isNonDecreasing( vec );
    }

    public static function isNonDecreasing(vec : Array<Float>){
        var rep = vec.first();
        for ( i in 0...vec.length ){
            if (vec[i] < rep - Constants.EPSILON ) return false;
            rep = vec[i];
        }
        return true;
    }

    // Validate a NurbsCurveData object
    //
    // **params**
    // + The data object
    //
    // **returns**
    // + The original, unmodified data

    public static function nurbsCurveData( data : NurbsCurveData ) : NurbsCurveData {
        if ( data.controlPoints == null ) throw "Control points array cannot be null!";
        #if (!cpp && !cs && !java)
            if ( data.degree == null ) throw "Degree cannot be null!";
        #end
        if ( data.degree < 1 ) throw "Degree must be greater than 1!";
        if ( data.knots == null ) throw "Knots cannot be null!";

        if ( data.knots.length != data.controlPoints.length + data.degree + 1 ){
            throw "controlPoints.length + degree + 1 must equal knots.length!";
        }

        if (!Check.isValidKnotVector( data.knots, data.degree )){
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
        #if (!cpp && !cs && !java)
            if ( data.degreeU == null ) throw "DegreeU cannot be null!";
            if ( data.degreeV == null ) throw "DegreeV cannot be null!";
        #end
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

        if (!Check.isValidKnotVector( data.knotsU, data.degreeU ) || !Check.isValidKnotVector( data.knotsV, data.degreeV )){
            throw "Invalid knot vector format!  Should begin with degree + 1 repeats and end with degree + 1 repeats!";
        }

        return data;
    }
}
