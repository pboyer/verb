package verb.eval;

@:expose("eval.Trig")
class Trig {

    // Determine if three points form a straight line within a given tolerance for their 2 * squared area
    //
    //          * p2
    //         / \
    //        /   \
    //       /     \
    //      /       \
    //     * p1 ---- * p3
    //
    // The area metric is 2 * the squared norm of the cross product of two edges, requiring no square roots and no divisions
    //
    // **params**
    // + p1
    // + p2
    // + p3
    // + The tolerance
    //
    // **returns**
    // + Whether the triangle passes the test
    //
    public static function three_points_are_flat( p1, p2, p3, tol ) {

        // find the area of the triangle without using a square root
        var p2mp1 = Vec.sub( p2, p1 )
        , p3mp1 = Vec.sub( p3, p1 )
        , norm = Vec.cross( p2mp1, p3mp1 )
        , area = Vec.dot( norm, norm );

        return area < tol;

    }
}
