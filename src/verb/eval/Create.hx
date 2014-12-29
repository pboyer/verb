package verb.eval;

class Create {

    //
    // ####get_4pt_surface( p1, p2, p3, p4 )
    //
    // Generate the control points, weights, and knots of a surface define by 3 points
    //
    // **params**
    // + *Array*, first point in counter-clockwise form
    // + *Array*, second point in counter-clockwise form
    // + *Array*, third point in counter-clockwise form
    // + *Array*, forth point in counter-clockwise form
    //
    // **returns**
    // + *Object*, an object with the following properties: control_points, weights, knots_u, knots_v, degree_u, degree_v
    //

    verb.eval.get_4pt_surface = function( p1, p2, p3, p4 ){

    var p1p4 = numeric.mul( 0.5, numeric.add( p1, p4 ));
    var p2p3 = numeric.mul( 0.5, numeric.add( p2, p3 ));
    var p3p4 = numeric.mul( 0.5, numeric.add( p3, p4 ));
    var p1p2 = numeric.mul( 0.5, numeric.add( p1, p2 ));
    var p1p4p2p3 = numeric.mul( 0.5, numeric.add( p1p4, p2p3 ));

    return {"knots_u": [0,0,0,1,1,1],
    "knots_v": [0,0,0,1,1,1],
    "control_points": [ [p1, 		p1p4, 		p4],
    [p1p2, 	p1p4p2p3, p3p4],
    [p2, 		p2p3, 		p3] ],
    "degree_u": 2,
    "degree_v": 2,
    "weights": [ [ 1, 1, 1],
    [ 1, 1, 1],
    [ 1, 1, 1] ] };

    }

}