package verb.core.types;

class DoublyLinkedListIterator<T:(IDoublyLinkedList<T>)> {
    private var t : T;
    private var c : T;

    public function new(t : T){
        this.t = t;
        this.c = t;
    }

    public function iterator() {
        return this;
    }

    public function next() : T {
        var cc = c;
        c = c.nxt == t ? null : c.nxt;
        return cc;
    }

    public function hasNext() : Bool {
        return c != null;
    }
}