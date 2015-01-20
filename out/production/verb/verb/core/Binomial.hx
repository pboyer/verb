package verb.core;

import haxe.ds.IntMap;

class Binomial {

    static var memo = new IntMap<IntMap<Float>>();

    public static function get(n : Int, k : Int) : Float {
        if (k == 0.0) {
            return 1.0;
        }

        if (n == 0 || k > n) {
            return 0.0;
        }

        if (k > n - k) {
            k = n - k;
        }

        if ( memo_exists(n,k) ) {
            return get_memo(n,k);
        }

        var r : Float = 1,
        n_o = n;

        for (d in 1...k+1){

            if ( memo_exists(n_o, d) ) {
                n--;
                r = get_memo(n_o, d);
                continue;
            }

            r *= n--;
            r /= d;

            memoize(n_o, d, r);

        }

        return r;
    }

    public static function get_no_memo(n : Int, k : Int) : Float {
        if (k == 0) {
            return 1;
        }

        if (n == 0 || k > n) {
            return 0;
        }

        if (k > n - k) {
            k = n - k;
        }

        var r : Float = 1,
        n_o = n;

        for (d in 1...k+1){
            r *= n--;
            r /= d;
        }

        return r;
    }

    private static function memo_exists(n : Int, k : Int) : Bool {
        return ( memo.exists(n) && memo.get(n).exists(k) );
    }

    private static function get_memo(n : Int, k : Int) : Float {
        return memo.get(n).get(k);
    }

    private static function  memoize(n, k, val) {
        if ( !memo.exists(n) ) {
            memo.set( n, new IntMap<Float>() );
        }

        memo.get( n ).set( k, val );
    }
}