package verb.core;

import verb.core.Data;
using verb.core.ArrayExtensions;
using verb.core.Vec;
import verb.eval.Divide;
import verb.eval.Eval;
import verb.eval.Intersect;

class SurfaceBoundingBoxTree implements IBoundingBoxTree<NurbsSurfaceData> {

    var _children : Pair<IBoundingBoxTree<NurbsSurfaceData>, IBoundingBoxTree<NurbsSurfaceData>>;
    var _surface : NurbsSurfaceData;
    var _boundingBox : BoundingBox = null;

    public function new(surface, splitV = false, knotTolU = null, knotTolV = null){
        _surface = surface;

        if (knotTolU == null){
            knotTolU = (surface.knotsU.domain()) / 16;
        }

        if (knotTolV == null){
            knotTolV = (surface.knotsV.domain()) / 16;
        }

        var divisible = false;

        if (splitV){
            divisible = _surface.knotsV.domain() > knotTolV;
        } else {
            divisible = _surface.knotsU.domain() > knotTolU;
        }

        if ( !divisible ) return;

        var min : Float;
        var max : Float;

        if (splitV){
            min = _surface.knotsV.first();
            max = _surface.knotsV.last();
        } else {
            min = _surface.knotsU.first();
            max = _surface.knotsU.last();
        }

        var dom = max - min;
        var pivot = (min + max) / 2.0 + dom * 0.1 * Math.random();

        var srfs = Divide.surfaceSplit( _surface, pivot, splitV );

        _children = new Pair<IBoundingBoxTree<NurbsSurfaceData>, IBoundingBoxTree<NurbsSurfaceData>>(
            new SurfaceBoundingBoxTree( srfs[0], !splitV, knotTolU, knotTolV ),
            new SurfaceBoundingBoxTree( srfs[1], !splitV, knotTolU, knotTolV ));

    }

    public function split() : Pair<IBoundingBoxTree<NurbsSurfaceData>, IBoundingBoxTree<NurbsSurfaceData>> {
        return _children;
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
        return _children == null;
    }

    public function empty(){
        return false;
    }
}