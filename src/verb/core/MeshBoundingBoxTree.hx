package verb.core;

using verb.core.ArrayExtensions;

import verb.core.Data;
import verb.eval.Intersect;

class MeshBoundingBoxTree implements IBoundingBoxTree<Int> {

    var _children : Pair<IBoundingBoxTree<Int>, IBoundingBoxTree<Int>>;
    var _boundingBox : BoundingBox;
    var _face : Int = -1;
    var _empty : Bool = false;

    public function new(mesh : MeshData, faceIndices : Array<Int> = null){

        if (faceIndices == null) {
            faceIndices = [ for (i in 0...mesh.faces.length) i ];
        }

        _boundingBox = Mesh.makeMeshAabb( mesh, faceIndices );

        if (faceIndices.length < 1) {
            _empty = true;
            return;
        } else if (faceIndices.length < 2){
            _face = faceIndices[0];
            return;
        }

        var as = Mesh.sortTrianglesOnLongestAxis( _boundingBox, mesh, faceIndices );
        var l = as.left();
        var r = as.right();

        _children = new Pair<IBoundingBoxTree<Int>, IBoundingBoxTree<Int>>(
            new MeshBoundingBoxTree(mesh, l),
            new MeshBoundingBoxTree(mesh, r)
        );
    }

    public function split() : Pair<IBoundingBoxTree<Int>, IBoundingBoxTree<Int>> {
        return _children;
    }

    public function boundingBox(){
        return _boundingBox;
    }

    public function yield(){
        return _face;
    }

    public function indivisible( tolerance : Float ){
        return _children == null;
    }

    public function empty(){
        return _empty;
    }
}
