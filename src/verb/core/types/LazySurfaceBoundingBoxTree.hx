package verb.core.types;

using verb.core.ArrayExtensions;

class LazySurfaceBoundingBoxTree implements IBoundingBoxTree<SurfaceData> {

    var _surface : SurfaceData;
    var _boundingBox : BoundingBox = null;
    var _splitV : Bool;
    var _knotTolU : Float;
    var _knotTolV : Float;

    public function new(surface, splitV = false, knotTolU = null, knotTolV = null){
        _surface = surface;
        _splitV = splitV;

        if (knotTolU == null){
            knotTolU = (surface.knotsU.last() - surface.knotsU.first()) / 1000;
        }

        if (knotTolV == null){
            knotTolV = (surface.knotsV.last() - surface.knotsV.first()) / 1000;
        }

        _knotTolU = knotTolU;
        _knotTolV = knotTolV;
    }

    public function split() : Pair<IBoundingBoxTree<SurfaceData>, IBoundingBoxTree<SurfaceData>> {

        var min : Float;
        var max : Float;

        if (_splitV){
            min = _surface.knotsV.first();
            max = _surface.knotsV.last();
        } else {
            min = _surface.knotsU.first();
            max = _surface.knotsU.last();
        }

        var dom = max - min;
        var pivot = (min + max) / 2.0 + dom * 0.01 * Math.random();

        var srfs = Modify.surface_split(_surface, pivot, _splitV );

        return new Pair<IBoundingBoxTree<SurfaceData>, IBoundingBoxTree<SurfaceData>>(
        new LazySurfaceBoundingBoxTree( srfs[0], !_splitV, _knotTolU, _knotTolV ),
        new LazySurfaceBoundingBoxTree( srfs[1], !_splitV, _knotTolU, _knotTolV ));
    }

    public function boundingBox(){
        if (_boundingBox == null){
            _boundingBox = new BoundingBox();
            for (row in _surface.controlPoints){
                _boundingBox.addRange( Eval.dehomogenize_1d(row) );
            }
        }
        return _boundingBox;
    }

    public function yield(){
        return _surface;
    }

    public function indivisible( tolerance : Float ){
        if (_splitV){
            return _surface.knotsV.last() - _surface.knotsV.first() < _knotTolV;
        } else {
            return _surface.knotsU.last() - _surface.knotsU.first() < _knotTolU;
        }
    }

    public function empty(){
        return false;
    }
}