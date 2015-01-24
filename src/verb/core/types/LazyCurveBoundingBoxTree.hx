package verb.core.types;

import verb.geom.BoundingBox;
using verb.core.ArrayExtensions;

class LazyCurveBoundingBoxTree implements IBoundingBoxTree<CurveData> {

    var _curve : CurveData;
    var _boundingBox : BoundingBox = null;
    var _knotTol : Float;

    public function new(curve, knotTol : Float = null){
        _curve = curve;
        if (knotTol == null){
            knotTol = _curve.knots.last() - _curve.knots.first() / 1000;
        }
        _knotTol = knotTol;
    }

    public function split() : Pair<IBoundingBoxTree<CurveData>, IBoundingBoxTree<CurveData>> {
        var min = _curve.knots.first();
        var max = _curve.knots.last();
        var dom = max - min;

        var crvs = Modify.curveSplit( _curve, (max + min) / 2.0 + dom * 0.01 * Math.random() );

        return new Pair<IBoundingBoxTree<CurveData>, IBoundingBoxTree<CurveData>>(
            new LazyCurveBoundingBoxTree( crvs[0], _knotTol ),
            new LazyCurveBoundingBoxTree( crvs[1], _knotTol ));
    }

    public function boundingBox(){
        if (_boundingBox == null){
            _boundingBox = new BoundingBox( Eval.dehomogenize1d(_curve.controlPoints) );
        }
        return _boundingBox;
    }

    public function yield(){
        return _curve;
    }

    public function indivisible( tolerance : Float ){
        return _curve.knots.last() - _curve.knots.first() < _knotTol;
    }

    public function empty(){
        return false;
    }
}