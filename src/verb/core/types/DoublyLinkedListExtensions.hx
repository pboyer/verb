package verb.core.types;

using Lambda;

class DoublyLinkedListExtensions {
    public static function iterate<T:(IDoublyLinkedList<T>)>( t : T ) : Iterable<T> {
        return new DoublyLinkedListIterator(t);
    }

    public static function push<T:(IDoublyLinkedList<T>)>( t : T, i : T ) : T {
        if (t == null) {
            return make(i);
        }

        t.prv.nxt = i;
        i.prv = t.prv;
        t.prv = i;
        i.nxt = t;

        return i;
    }

    public static function kill<T:(IDoublyLinkedList<T>)>( t : T, i : T ) : T {

        if (t.nxt == t){ // a loop
            return null;
        }

        i.prv.nxt = i.nxt;
        i.nxt.prv = i.prv;

        return t;
    }

    public static function make<T:(IDoublyLinkedList<T>)>( t : T ) : T {
        t.nxt = t;
        t.prv = t;

        return t;
    }
}
