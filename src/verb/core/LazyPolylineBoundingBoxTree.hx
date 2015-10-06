package verb.core;

import verb.core.Data;
import verb.eval.Intersect;

class LazyPolylineBoundingBoxTree implements IBoundingBoxTree<Int> {

    var _interval : Interval<Int>;
    var _polyline : PolylineData;
    var _boundingBox : BoundingBox = null;

    public function new(polyline, interval = null){
        _polyline = polyline;

        if (interval == null) {
            interval = new Interval<Int>(0, polyline.points.length != 0 ? polyline.points.length-1 : 0);
        }
        _interval = interval;
    }

    public function split() : Pair<IBoundingBoxTree<Int>, IBoundingBoxTree<Int>> {
        var min = _interval.min;
        var max = _interval.max;

        var pivot = min + Math.ceil( (max-min) / 2 );

        var l = new Interval( min, pivot )
        , r = new Interval( pivot, max );

        return new Pair<IBoundingBoxTree<Int>, IBoundingBoxTree<Int>>(
            new LazyPolylineBoundingBoxTree( _polyline, l ),
            new LazyPolylineBoundingBoxTree( _polyline, r ));

    }

    public function boundingBox(){
        if (_boundingBox == null){
            _boundingBox = new BoundingBox( _polyline.points );
        }

        return _boundingBox;
    }

    public function yield(){
        return _interval.min;
    }

    public function indivisible( tolerance : Float ){
        return _interval.max - _interval.min == 1;
    }

    public function empty(){
        return _interval.max - _interval.min == 0;
    }
}