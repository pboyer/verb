package verb.core.types;

@:expose("core.Pair")
class Pair<T1, T2> {
    public var item1 : T1;
    public var item2 : T2;

    public function new(item1 : T1, item2 : T2) {
        this.item1 = item1;
        this.item2 = item2;
    }
}
