package verb.core;

import verb.core.Data;
import verb.eval.Intersect;

using verb.core.ArrayExtensions;

class LazyMeshBoundingBoxTree implements IBoundingBoxTree<Int> {
    var _mesh : MeshData;
    var _faceIndices : Array<Int>;
    var _boundingBox : BoundingBox = null;

    public function new(mesh, faceIndices = null){
        _mesh = mesh;
        if (faceIndices == null) {
            faceIndices = [ for (i in 0...mesh.faces.length) i ];
        }
        _faceIndices = faceIndices;
    }

    public function split() : Pair<IBoundingBoxTree<Int>, IBoundingBoxTree<Int>> {
        var as = Mesh.sortTrianglesOnLongestAxis( boundingBox(), _mesh, _faceIndices )
        , l = as.left()
        , r = as.right();

        return new Pair<IBoundingBoxTree<Int>, IBoundingBoxTree<Int>>(
            new LazyMeshBoundingBoxTree( _mesh, l),
            new LazyMeshBoundingBoxTree( _mesh, r ));
    }

    public function boundingBox(){
        if (_boundingBox == null){
            _boundingBox = Mesh.makeMeshAabb( _mesh, _faceIndices );
        }
        return _boundingBox;
    }

    public function yield(){
        return _faceIndices[0];
    }

    public function indivisible( tolerance : Float ){
        return _faceIndices.length == 1;
    }

    public function empty(){
        return _faceIndices.length == 0;
    }
}