package verb.eval;

using Lambda;

@:expose("Vec")
class Vec {

    public static function transpose<T>(a : Array<Array<T>>) : Array<Array<T>> {
        if (a.length == 0) return [];
        return [ for (i in 0...a[0].length) [for (j in 0...a.length) a[j][i] ]  ];
    }

    public static function dist(a : Array<Float>, b : Array<Float> ) : Float {
        return norm(sub(a,b));
    }

    public static function distSquared(a : Array<Float>, b : Array<Float> ) : Float {
        return normSquared(sub(a,b));
    }

    public static function sum(a : Iterable<Float>) : Float {
        return a.fold(function(x,a){ return a + x; }, 0);
    }

    public static function norm(a : Iterable<Float> ) : Float {
        return Math.sqrt( normSquared(a) );
    }

    public static function normSquared(a : Iterable<Float> ) : Float {
        return a.fold(function(x,a){ return a + x * x; }, 0);
    }

    public static function rep<T>(num : Int, ele : T ) : Array<T> {
        return [ for (i in 0...num) ele ];
    }

    public static function zeros1d(rows : Int) : Array<Float> {
        return [ for (i in 0...rows) 0.0 ];
    }

    public static function zeros2d(rows : Int, cols : Int) : Array<Array<Float>> {
        return [ for (i in 0...rows) zeros1d(cols) ];
    }

    public static function zeros3d(rows : Int, cols : Int, depth : Int) : Array<Array<Array<Float>>> {
        return [ for (i in 0...rows) zeros2d(cols, depth) ];
    }

    public static function add(a : Array<Float>, b : Array<Float>){
        return [ for (i in 0...a.length) a[i] + b[i] ];
    }

    public static function mul(a : Float, b : Array<Float>){
        return [ for (i in 0...b.length) a * b[i] ];
    }

    public static function sub(a : Array<Float>, b : Array<Float>){
        return [ for (i in 0...a.length) a[i] - b[i] ];
    }
}