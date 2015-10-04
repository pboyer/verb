package verb.core;

@:expose("core.Interval")
class Interval<T> {
    public var min : T;
    public var max : T;

    public function new(min, max){
        this.min = min;
        this.max = max;
    }
}