package verb.core;

import verb.core.types.Pair;
import verb.core.types.BoundingBoxNode;
import verb.core.types.MeshData;
import verb.core.types.CurveData.Point;

using verb.core.ArrayExtensions;

@:expose("core.Mesh")
class Mesh {

    //
    // Form axis-aligned bounding box from triangles of mesh
    //
    // **params**
    // + a mesh
    // + face indices of the mesh to include in the bounding box
    //
    // **returns**
    // + a BoundingBox containing the mesh
    //

    public static function make_mesh_aabb( mesh : MeshData, faceIndices : Array<Int> ) : BoundingBox {

        var bb = new verb.BoundingBox();

        for ( x in faceIndices ){
            bb.add( mesh.points[ mesh.faces[ x ][0] ] );
            bb.add( mesh.points[ mesh.faces[ x ][1] ] );
            bb.add( mesh.points[ mesh.faces[ x ][2] ] );
        }

        return bb;
    }

    //
    // Make tree of axis aligned bounding boxes
    //
    // **params**
    // + array of length 3 arrays of numbers representing the points
    // + array of length 3 arrays of number representing the triangles
    // + array of numbers representing the relevant triangles to use to form aabb
    //
    // **returns**
    // + a point represented by an array of length (dim)
    //

    public static function make_mesh_aabb_tree( mesh : MeshData, faceIndices : Array<Int> ) : BoundingBoxNode {

        var aabb = make_mesh_aabb( mesh, faceIndices );

        if (faceIndices.length == 1){
            return new BoundingBoxLeaf<Int>( aabb, faceIndices[0] );
        }

        var sortedIndices = sort_tris_on_longest_axis( aabb, mesh, faceIndices )
        , leftIndices = sortedIndices.left() // slice( 0, Math.floor( sorted_tri_indices.length / 2 ) )
        , rightIndices = sortedIndices.right(); // slice( Math.floor( sorted_tri_indices.length / 2 ), sorted_tri_indices.length );

        return new BoundingBoxInnerNode( aabb, [ make_mesh_aabb_tree(mesh, leftIndices), make_mesh_aabb_tree(mesh, rightIndices) ]);
    }

    //
    // Sort particular faces of a mesh on the longest axis
    //
    // **params**
    // + bounding box containing the faces
    // + the mesh it self
    // + the indices of the mesh faces to inspect
    //
    // **returns**
    // + a point represented by an array of length (dim)
    //

    public static function sort_tris_on_longest_axis( bb : BoundingBox, mesh : MeshData, faceIndices : Array<Int> ) : Array<Int> {

        var longAxis = bb.getLongestAxis();

        var minCoordFaceMap = new Array<Pair<Float, Int>>();
        for ( faceIndex in faceIndices){
            var tri_min = get_min_coordinate_on_axis( mesh.points, mesh.faces[ faceIndex ], longAxis );
            minCoordFaceMap.push( new Pair<Float,Int>(tri_min, faceIndex) );
        }

        minCoordFaceMap.sort(function(a : Pair<Float,Int>, b : Pair<Float, Int>):Int {
            var a0 = a.item1;
            var b0 = b.item1;

            if (a0 == b0) return 0 else if (a0 > b0) return 1 else return -1;
        });

        var sortedFaceIndices = new Array<Int>();
        for ( i in 0...minCoordFaceMap.length){
            sortedFaceIndices.push( minCoordFaceMap[i].item2 );
        }

        return sortedFaceIndices;
    }

    //
    // Get min coordinate on an axis
    //
    // **params**
    // + array of length 3 arrays of numbers representing the points
    // + length 3 array of point indices for the triangle
    // + index of the axis to test - 0 for x, 1 for y, 2 for z
    //
    // **returns**
    // + the minimum coordinate
    //

    private static function get_min_coordinate_on_axis( points : Array<Point>, tri : Tri, axis : Int ) : Float {

        var min = Math.POSITIVE_INFINITY;

        for (i in 0...3){
            var coord = points[ tri[i] ][ axis ];
            if (coord < min) min = coord;
        }

        return min;
    }

    //
    // Get triangle centroid
    //
    // **params**
    // + array of length 3 arrays of numbers representing the points
    // + length 3 array of point indices for the triangle
    //
    // **returns**
    // + a point represented by an array of length 3
    //

    public static function get_tri_centroid( points : Array<Point>, tri : Tri ) : Point {

        var centroid = [0.0,0.0,0.0];

        for (i in 0...3){
            for (j in 0...3){
                centroid[j] += points[ tri[i] ][j];
            }
        }

        for (i in 0...3){
            centroid[i] /= 3;
        }

        return centroid;

    }
}
