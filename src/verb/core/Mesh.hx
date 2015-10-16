package verb.core;

import verb.core.BoundingBox;
import verb.core.Data;

using verb.core.ArrayExtensions;

// `Mesh` provides various convenience methods for working with meshes.

@:expose("core.Mesh")
class Mesh {

    //Get triangle normal
    //
    //**params**
    //
    //* array of length 3 arrays of numbers representing the points
    //* length 3 array of point indices for the triangle
    //
    //**returns**
    //
    //* a normal vector represented by an array of length 3
    //

    public static function getTriangleNorm( points : Array<Point>, tri : Tri ) : Point {

        var v0 = points[ tri[0] ]
        , v1 = points[ tri[1] ]
        , v2 = points[ tri[2] ]
        , u = Vec.sub( v1, v0 )
        , v = Vec.sub( v2, v0 )
        , n = Vec.cross( u, v );

        return Vec.mul( 1 / Vec.norm( n ), n );

    }

    //Form axis-aligned bounding box from triangles of mesh
    //
    //**params**
    //
    //* a mesh
    //* face indices of the mesh to include in the bounding box
    //
    //**returns**
    //
    //* a BoundingBox containing the mesh
    //

    public static function makeMeshAabb( mesh : MeshData, faceIndices : Array<Int> ) : BoundingBox {

        var bb = new verb.core.BoundingBox();

        for ( x in faceIndices ){
            bb.add( mesh.points[ mesh.faces[ x ][0] ] );
            bb.add( mesh.points[ mesh.faces[ x ][1] ] );
            bb.add( mesh.points[ mesh.faces[ x ][2] ] );
        }

        return bb;
    }

    //Sort particular faces of a mesh on the longest axis
    //
    //**params**
    //
    //* bounding box containing the faces
    //* the mesh it self
    //* the indices of the mesh faces to inspect
    //
    //**returns**
    //
    //* a point represented by an array of length (dim)
    //

    public static function sortTrianglesOnLongestAxis( bb : BoundingBox, mesh : MeshData, faceIndices : Array<Int> ) : Array<Int> {

        var longAxis = bb.getLongestAxis();

        var minCoordFaceMap = new Array<Pair<Float, Int>>();
        for ( faceIndex in faceIndices){
            var tri_min = getMinCoordOnAxis( mesh.points, mesh.faces[ faceIndex ], longAxis );
            minCoordFaceMap.push( new Pair<Float,Int>(tri_min, faceIndex) );
        }

        minCoordFaceMap.sort(function(a : Pair<Float,Int>, b : Pair<Float, Int>):Int {
            var a0 = a.item0;
            var b0 = b.item0;

            if (a0 == b0) return 0 else if (a0 > b0) return 1 else return -1;
        });

        var sortedFaceIndices = new Array<Int>();
        for ( i in 0...minCoordFaceMap.length){
            sortedFaceIndices.push( minCoordFaceMap[i].item1 );
        }

        return sortedFaceIndices;
    }

    //Get min coordinate on an axis
    //
    //**params**
    //
    //* array of length 3 arrays of numbers representing the points
    //* length 3 array of point indices for the triangle
    //* index of the axis to test - 0 for x, 1 for y, 2 for z
    //
    //**returns**
    //
    //* the minimum coordinate

    private static function getMinCoordOnAxis( points : Array<Point>, tri : Tri, axis : Int ) : Float {

        var min = Math.POSITIVE_INFINITY;

        for (i in 0...3){
            var coord = points[ tri[i] ][ axis ];
            if (coord < min) min = coord;
        }

        return min;
    }

    //Get triangle centroid
    //
    //**params**
    //
    //* array of length 3 arrays of numbers representing the points
    //* length 3 array of point indices for the triangle
    //
    //**returns**
    //
    //* a point represented by an array of length 3
    //

    public static function getTriangleCentroid( points : Array<Point>, tri : Tri ) : Point {

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

    //Given a point on a mesh triangle, obtain the UV on the triangle
    //
    //**params**
    //
    //* the mesh
    //* index of the face to test
    //
    //**returns**
    //
    //* the UV on the face

    public static function triangleUVFromPoint( mesh : MeshData, faceIndex : Int, f : Point ) : UV {

        var tri = mesh.faces[faceIndex];

        var p1 = mesh.points[ tri[0] ];
        var p2 = mesh.points[ tri[1] ];
        var p3 = mesh.points[ tri[2] ];

        var uv1 = mesh.uvs[ tri[0] ];
        var uv2 = mesh.uvs[ tri[1] ];
        var uv3 = mesh.uvs[ tri[2] ];

        var f1 = Vec.sub(p1, f);
        var f2 = Vec.sub(p2, f);
        var f3 = Vec.sub(p3, f);

        //calculate the areas and factors (order of parameters doesn't matter):
        var a = Vec.norm( Vec.cross( Vec.sub(p1, p2), Vec.sub(p1, p3) ) ); //main triangle area a
        var a1 = Vec.norm( Vec.cross(f2, f3) ) / a; //p1's triangle area / a
        var a2 = Vec.norm( Vec.cross(f3, f1) ) / a; //p2's triangle area / a
        var a3 = Vec.norm( Vec.cross(f1, f2) ) / a; //p3's triangle area / a

        //find the uv corresponding to point f (uv1/uv2/uv3 are associated to p1/p2/p3):
        return Vec.add( Vec.mul( a1, uv1), Vec.add( Vec.mul( a2, uv2), Vec.mul( a3, uv3)));
    }
}
