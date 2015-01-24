package verb.core.types;

interface IBoundingBoxTree<T> {
    public function boundingBox() : BoundingBox;
    public function split() : Pair<IBoundingBoxTree<T>, IBoundingBoxTree<T>>;
    public function yield() : T;
    public function indivisible( tolerance : Float ) : Bool;
    public function empty() : Bool;
}
