package verb.eval;

import verb.eval.types.CurveData;

@:expose("Modify")
class Modify {

//    public static function surface_split( surface : SurfaceData, u : Float, dir : Bool) : Array<SurfaceData> {
//
//        var c
//        , newPts = []
//        , knots
//        , degree
//        , newknots
//        , i;
//
//        if (dir == 0) {
//
//            control_points = Vec.transpose(control_points);
//            knots = knots_u;
//            degree = degree_u;
//
//        } else {
//
//            control_points = control_points;
//            knots = knots_v;
//            degree = degree_v;
//
//        }
//
//        var knots_to_insert = [ for (i in 0...degree+1) u ];
//
//        var newpts0 = new Array<Array<Point>>()
//        , newpts1 = new Array<Array<Point>>()
//        , res;
//
//        var s = knot_span( degree, u, knots );
//
//        for (cps in control_points){
//
//            res = curve_knot_refine( degree, knots, cps, knots_to_insert );
//
//            var cpts0 = res.control_points.slice( 0, s + 1 );
//            var cpts1 = res.control_points.slice( s + 1 );
//
//            newpts0.push( cpts0 );
//            newpts1.push( cpts1 );
//
//        }
//
//        var knots0 = res.knots.slice(0, s + degree + 2);
//        var knots1 = res.knots.slice( s + 1 );
//
//        if (dir == 0){
//            newpts0 = Vec.transpose( newpts0 );
//            newpts1 = Vec.transpose( newpts1 );
//
//            return [ 	new SurfaceData(degree, degree_v, knots0, knots_v, newpts0 ), new SurfaceData(degree, degree_v, knots1, knots_v, newpts1 ) ];
//         }
//
//        // v dir
//        return [ 	new SurfaceData(degree_u, degree, knots_u, knots0, newpts0 ),  new SurfaceData(degree_u, degree, knots_u, knots1, newpts1 ) ];
//    }


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
        , k = Nurbs.knot_span( degree, u, knots ) // the span in which the knot will be inserted
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
