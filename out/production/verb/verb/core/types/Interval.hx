package verb.core.types;

@:expose("core.Interval")
class Interval<T> {
    public var min : T;
    public var max : T;

    public function new(min, max){
        this.min = min;
        this.max = max;
    }
}