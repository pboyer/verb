package verb.core;

using verb.core.ArrayExtensions;
using verb.core.Vec;

import verb.eval.Eval;
import verb.eval.Divide;
import verb.core.Data;
import verb.eval.Intersect;

class LazySurfaceBoundingBoxTree implements IBoundingBoxTree<NurbsSurfaceData> {

    var _surface : NurbsSurfaceData;
    var _boundingBox : BoundingBox = null;
    var _splitV : Bool;
    var _knotTolU : Float;
    var _knotTolV : Float;

    public function new(surface, splitV = false, knotTolU = null, knotTolV = null){
        _surface = surface;
        _splitV = splitV;

        if (knotTolU == null){
            knotTolU = (surface.knotsU.domain()) / 16;
        }

        if (knotTolV == null){
            knotTolV = (surface.knotsV.domain()) / 16;
        }

        _knotTolU = knotTolU;
        _knotTolV = knotTolV;
    }

    public function split() : Pair<IBoundingBoxTree<NurbsSurfaceData>, IBoundingBoxTree<NurbsSurfaceData>> {
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
        var pivot = (min + max) / 2.0; //* dom * 0.01 * Math.random();

        var srfs = Divide.surfaceSplit( _surface, pivot, _splitV );

        return new Pair<IBoundingBoxTree<NurbsSurfaceData>, IBoundingBoxTree<NurbsSurfaceData>>(
            new LazySurfaceBoundingBoxTree( srfs[0], !_splitV, _knotTolU, _knotTolV ),
            new LazySurfaceBoundingBoxTree( srfs[1], !_splitV, _knotTolU, _knotTolV ));
    }

    public function boundingBox(){
        if (_boundingBox == null){
            _boundingBox = new BoundingBox();
            for (row in _surface.controlPoints){
                _boundingBox.addRange( Eval.dehomogenize1d(row) );
            }
        }
        return _boundingBox;
    }

    public function yield(){
        return _surface;
    }

    public function indivisible( tolerance : Float ){
        return _surface.knotsV.domain() < _knotTolV && _surface.knotsU.domain() < _knotTolU;
    }

    public function empty(){
        return false;
    }
}