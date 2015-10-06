package verb.core;

using verb.core.ArrayExtensions;
using verb.core.Vec;
import verb.core.Data;

import verb.eval.Eval;
import verb.eval.Divide;
import verb.eval.Intersect;

class LazyCurveBoundingBoxTree implements IBoundingBoxTree<NurbsCurveData> {

    var _curve : NurbsCurveData;
    var _boundingBox : BoundingBox = null;
    var _knotTol : Float;

    public function new(curve, knotTol : Float = null){
        _curve = curve;
        if (knotTol == null){
            knotTol = _curve.knots.domain() / 64;
        }
        _knotTol = knotTol;
    }

    public function split() : Pair<IBoundingBoxTree<NurbsCurveData>, IBoundingBoxTree<NurbsCurveData>> {
        var min = _curve.knots.first();
        var max = _curve.knots.last();
        var dom = max - min;

        var crvs = Divide.curveSplit( _curve, (max + min) / 2.0 + dom * 0.1 * Math.random());

        return new Pair<IBoundingBoxTree<NurbsCurveData>, IBoundingBoxTree<NurbsCurveData>>(
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
        return _curve.knots.domain() < _knotTol;
    }

    public function empty(){
        return false;
    }
}