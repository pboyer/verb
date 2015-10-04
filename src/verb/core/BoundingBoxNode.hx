package verb.core;

@:expose("core.BoundingBoxNode")
class BoundingBoxNode {
    public var boundingBox : BoundingBox;

    public function new(bb : BoundingBox){
        this.boundingBox = bb;
    }
}

@:expose("core.BoundingBoxInnerNode")
class BoundingBoxInnerNode extends BoundingBoxNode {
    public var children : Array<BoundingBoxNode>;

    public function new(bb : BoundingBox, children : Array<BoundingBoxNode>){
        super(bb);
        this.children = children;
    }
}

@:expose("core.BoundingBoxLeaf")
class BoundingBoxLeaf<T> extends BoundingBoxNode {
    public var item : T;

    public function new(bb : BoundingBox, item : T){
        super(bb);
        this.item = item;
    }
}
