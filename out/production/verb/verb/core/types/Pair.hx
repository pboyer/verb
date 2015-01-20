package verb.core.types;

@:expose("core.Pair")
class Pair<T1, T2> {
    public var item0 : T1;
    public var item1 : T2;

    public function new(item1 : T1, item2 : T2) {
        this.item0 = item1;
        this.item1 = item2;
    }
}
