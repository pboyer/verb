package verb.core.types;

using Lambda;

class DoublyLinkedListExtensions {
    public static function iterate<T:(IDoublyLinkedList<T>)>( t : T ) : Iterable<T> {
        return new DoublyLinkedListIterator(t);
    }

    public static function push<T:(IDoublyLinkedList<T>)>( t : T, i : T ) : T {
        if (t == null) {
            return makeList(i);
        }

        t.prv.nxt = i;
        i.prv = t.prv;
        t.prv = i;
        i.nxt = t;

        return i;
    }

    public static function makeList<T:(IDoublyLinkedList<T>)>( t : T ) : T {
        t.nxt = t;
        t.prv = t;

        return t;
    }
}
