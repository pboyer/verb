package verb.core;

import verb.core.types.CurveData;
import verb.core.types.CurveData;
import verb.core.types.SurfaceData;

@:expose("core.KnotMultiplicity")
class KnotMultiplicity {
    public var knot : Float;
    public var mult : Int;

    public function new(knot : Float, mult : Int ){
        this.knot = knot;
        this.mult = mult;
    }

    public function inc(){
        mult++;
    }
}

@:expose("core.Modify")
class Modify {

    public static function surface_knot_refine( surface : SurfaceData, knots_to_insert : Array<Float>, useV : Bool ) : SurfaceData {

        // TODO: make this faster by taking advantage of repeat computations in every row
        // 			 i.e. no reason to recompute the knot vectors on every row

        var newPts = []
        , knots
        , degree
        , ctrlPts;

        // u dir
        if (!useV){
            ctrlPts = Mat.transpose( surface.controlPoints );
            knots = surface.knotsU;
            degree = surface.degreeU;
        // v dir
        } else {
            ctrlPts = surface.controlPoints;
            knots = surface.knotsV;
            degree = surface.degreeV;
        }

        // do knot refinement on every row
        var c : CurveData = null;
        for (cptrow in ctrlPts){
            c = curve_knot_refine( new CurveData(degree, knots, cptrow), knots_to_insert );
            newPts.push( c.controlPoints );
        }

        var newknots = c.knots;

        // u dir
        if (!useV){
            newPts = Mat.transpose( newPts );
            return new SurfaceData( surface.degreeU, surface.degreeV, newknots, surface.knotsV.copy(), newPts );
        // v dir
        } else {
            return new SurfaceData( surface.degreeU, surface.degreeV, surface.knotsU.copy(), newknots, newPts );
        }

    }

    public static function surface_split( surface : SurfaceData, u : Float, useV : Bool = false) : Array<SurfaceData> {

        var knots
        , degree
        , control_points;

        if (!useV) {

            control_points = Mat.transpose( surface.controlPoints );
            knots = surface.knotsU;
            degree = surface.degreeU;

        } else {

            control_points = surface.controlPoints;
            knots = surface.knotsV;
            degree = surface.degreeV;

        }

        var knots_to_insert = [ for (i in 0...degree+1) u ];

        var newpts0 = new Array<Array<Point>>()
        , newpts1 = new Array<Array<Point>>();

        var s = Eval.knot_span( degree, u, knots );
        var res : CurveData = null;

        for (cps in control_points){

            res = curve_knot_refine( new CurveData(degree, knots, cps), knots_to_insert );

            newpts0.push( res.controlPoints.slice( 0, s + 1 ) );
            newpts1.push( res.controlPoints.slice( s + 1 ) );

        }

        var knots0 = res.knots.slice(0, s + degree + 2);
        var knots1 = res.knots.slice( s + 1 );

        if (!useV){
            newpts0 = Mat.transpose( newpts0 );
            newpts1 = Mat.transpose( newpts1 );

            return [ new SurfaceData(degree, surface.degreeV, knots0, surface.knotsV.copy(), newpts0 ),
                new SurfaceData(degree, surface.degreeV, knots1, surface.knotsV.copy(), newpts1 ) ];
         }

        // v dir
        return [ new SurfaceData(surface.degreeU, degree, surface.knotsU.copy(), knots0, newpts0 ),
                    new SurfaceData(surface.degreeU, degree, surface.knotsU.copy(), knots1, newpts1 ) ];
    }

    //
    // Decompose a NURBS curve into a collection of bezier's.  Useful
    // as each bezier fits into it's convex hull.  This is a useful starting
    // point for intersection, closest point, divide & conquer algorithms
    //
    // **params**
    // + CurveData object representing the curve
    //
    // **returns**
    // + *Array* of CurveData objects, defined by degree, knots, and control points
    //
    public static function curve_bezier_decompose( curve : CurveData ) : Array<CurveData> {

        var degree = curve.degree
        , control_points = curve.controlPoints
        , knots = curve.knots;

        // find all of the unique knot values and their multiplicity
        // for each, increase their multiplicity to degree + 1

        var knotmults = knot_multiplicities( knots );
        var reqMult = degree + 1;

        // insert the knots
        for (knotmult in knotmults) { // (var i = 0; i < mults.length; i++){
            if ( knotmult.mult < reqMult ){

                var knotsInsert = Vec.rep( reqMult - knotmult.mult, knotmult.knot );
                var res = curve_knot_refine( new CurveData(degree, knots, control_points), knotsInsert );

                knots = res.knots;
                control_points = res.controlPoints;
            }
        }

        var numCrvs = knots.length / reqMult - 1;
        var crvKnotLength = reqMult * 2;

        var crvs = [];

        var i = 0;
        while ( i < control_points.length){
            var kts = knots.slice( i, i + crvKnotLength );
            var pts = control_points.slice( i, i + reqMult );

            crvs.push( new CurveData(degree, kts, pts ) );

            i += reqMult;
        }

        return crvs;

    }

    //
    // Determine the multiplicities of the values in a knot vector
    //
    // **params**
    // + array of nondecreasing knot values
    //
    // **returns**
    // + *Array* of length 2 arrays, [knotValue, knotMultiplicity]
    //
    public static function knot_multiplicities( knots : KnotArray) : Array<KnotMultiplicity> {

        var mults = [  new KnotMultiplicity( knots[0], 0 ) ];
        var curr : KnotMultiplicity = mults[0];

        for (knot in knots){
            if ( (Math.abs(knot - curr.knot)) > Constants.EPSILON ){
                curr = new KnotMultiplicity(knot, 0);
                mults.push(curr);
            }

            curr.inc();
        }

        return mults;
    }

    // Split a curve into two parts
    //
    // **params**
    // + CurveData object representing the curve
    // + location to split the curve
    //
    // **returns**
    // + *Array* two new curves, defined by degree, knots, and control points
    //
    public static function curve_split( curve : CurveData, u : Float ) : Array<CurveData> {

        var degree = curve.degree
        , control_points = curve.controlPoints
        , knots = curve.knots;

        var knots_to_insert = [for (i in 0...degree+1) u];
        var res = curve_knot_refine( curve, knots_to_insert );

        var s = Eval.knot_span( degree, u, knots );

        var knots0 = res.knots.slice(0, s + degree + 2);
        var knots1 = res.knots.slice( s + 1 );

        var cpts0 = res.controlPoints.slice( 0, s + 1 );
        var cpts1 = res.controlPoints.slice( s + 1 );

        return [
            new CurveData( degree, knots0, cpts0 ),
            new CurveData( degree, knots1, cpts1 )
        ];

    }

    // Insert a collection of knots on a curve
    //
    // Corresponds to Algorithm A5.4 (Piegl & Tiller)
    //
    // **params**
    // + CurveData object representing the curve
    // + array of knots to insert
    //
    // **returns**
    // +  CurveData object representing the curve
    //

    public static function curve_knot_refine( curve : CurveData, knots_to_insert : Array<Float> ) : CurveData {

        var degree = curve.degree
        , control_points = curve.controlPoints
        , knots = curve.knots;

        var n = control_points.length - 1
        , m = n + degree + 1
        , r = knots_to_insert.length - 1
        , a = Eval.knot_span( degree, knots_to_insert[0], knots )
        , b = Eval.knot_span( degree, knots_to_insert[r], knots )
        , control_points_post = new CurvePointArray()
        , knots_post = new KnotArray();

        // new control pts
        for (i in 0...a-degree+1){
            control_points_post[i] = control_points[i];
        }

        for (i in b-1...n+1){
            control_points_post[i+r+1] = control_points[i];
        }

        // new knot vector
        for (i in 0...a+1){
            knots_post[i] = knots[i];
        }

        for (i in b+degree...m+1){
            knots_post[i+r+1] = knots[i];
        }

        var i = b + degree - 1;
        var k = b + degree + r;
        var j = r;

        while ( j >= 0 ) {

            while (knots_to_insert[j] <= knots[i] && i > a){

                control_points_post[k-degree-1] = control_points[i-degree-1];
                knots_post[k] = knots[i];
                k = k-1;
                i = i-1;

            }

            control_points_post[k-degree-1] = control_points_post[k-degree];

            for ( l in 1...degree+1){

                var ind = k-degree+l;
                var alfa = knots_post[k+l] - knots_to_insert[j];

                if (Math.abs(alfa) < Constants.EPSILON){
                    control_points_post[ind-1] = control_points_post[ind];
                } else {
                    alfa = alfa / (knots_post[k+l] - knots[i-degree+l]);

                    control_points_post[ind-1] = Vec.add(
                        Vec.mul( alfa, control_points_post[ind-1] ),
                        Vec.mul( (1.0 - alfa), control_points_post[ind]) );
                }

            }

            knots_post[k] = knots_to_insert[j];
            k = k - 1;

            j--;

        }

        return new CurveData(degree, knots_post, control_points_post );
    }

    // Insert a knot along a rational curve.  Note that this algorithm only works
    // for r + s <= degree, where s is the initial multiplicity (number of duplicates) of the knot.
    //
    // Corresponds to algorithm A5.1 (Piegl & Tiller)
    //
    // Use the curve_knot_refine for applications like curve splitting.
    //
    // **params**
    // + integer degree
    // + array of nondecreasing knot values
    // + array of control points
    // + parameter at which to insert the knot
    // + number of times to insert the knot
    //
    // **returns**
    // + *Object* the new curve, defined by knots and control_points
    //

    public static function curve_knot_insert( curve : CurveData, u : Float, r : Int ) : CurveData {

        var degree = curve.degree
        , control_points = curve.controlPoints
        , knots = curve.knots;

        // num_pts is num control points for the initial curve
        // k is the span on which the knots are inserted
        // s is the initial multiplicity of the knot
        // r is the number of times to insert the knot
        // control_points is initial set of control points

        var s = 0; // assume original multiplicity is 0 - TODO add check for multiplicity in knots

        var num_pts = control_points.length
        , k = Eval.knot_span( degree, u, knots ) // the span in which the knot will be inserted
        , num_pts_post = num_pts + r // a new control pt for every new knot
        , control_points_temp = new CurvePointArray() // new Array( degree - s )
        , knots_post = new KnotArray() // new Array( knots.length + r )  // r new knots
        , control_points_post = new CurvePointArray() // new Array( num_pts_post )
        , i = 0;

        // new knot vector

        // insert the k knots that will not be affected
        for (i in 1...k+1){
            knots_post[i] = knots[i];
        }

        // insert the new repeat knots
        for (i in 1...r+1){
            knots_post[k+i] = u;
        }

        // insert the rest of the knots
        for (i in k+1...knots.length){
            knots_post[i+r] = knots[i];
        }

        // control point generation

        // copy the original control points before the insertion span
        for (i in 0...k - degree + 1){
            control_points_post[i] = control_points[i];
        }

        // copy the original controls after the insertion span
        for (i in k-s...num_pts){
            control_points_post[i+r] = control_points[i];
        }

        // collect the affected control points in this temporary array
        for (i in 0...degree-s+1){
            control_points_temp[i] = control_points[k-degree+i];
        }

        var L : Int = 0
        , alpha : Float = 0;

        // insert knot r times
        for (j in 1...r+1){

            L = k-degree+j;

            for (i in 0...degree-j-s+1){

                alpha = ( u - knots[L+i] ) / ( knots[i+k+1] - knots[L+i] );

                control_points_temp[i] = Vec.add(
                        Vec.mul( alpha, control_points_temp[i+1] ),
                        Vec.mul( (1.0 - alpha), control_points_temp[i])
                    );
            }

            control_points_post[ L ] = control_points_temp[0];
            control_points_post[k+r-j-s] = control_points_temp[degree-j-s];

        }

        // not so confident about this part
        for (i in L+1...k-s){
            control_points_post[i] = control_points_temp[ i - L ];
        }

        return new CurveData(degree, knots_post, control_points_post);
    }

}
