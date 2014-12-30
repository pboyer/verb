package verb.core;

class Utils {

    public static inline function last<T>(a : Array<T>) : T {
        return a[a.length-1];
    }

    public static inline function first<T>(a : Array<T>) : T {
        return a[0];
    }

    public static function spliceAndInsert<T>(a : Array<T>, start : Int, end : Int, ele : T) : Void {
        a.splice(start, end);
        a.insert(start, ele);
    }

}
