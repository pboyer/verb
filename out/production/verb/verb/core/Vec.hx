package verb.core;

import verb.core.types.NurbsCurveData.Point;
import verb.core.Mat.Vector;

using Lambda;

@:expose("core.Vec")
class Vec {

    public static function range(max : Int) : Array<Float> {
        var l = [];
        var f = 0.0;
        for ( i in 0...max ){
            l.push(f);
            f += 1.0;
        }
        return l;
    }

    public static function neg(arr : Array<Float>) : Array<Float> {
        return arr.map(function(x){ return -x; });
    }

    public static function min(arr : Array<Float>) : Float {
        return arr.fold(function(x,a){ return Math.min(x,a); }, Math.POSITIVE_INFINITY);
    }

    public static function max(arr : Array<Float>) : Float {
        return arr.fold(function(x,a){ return Math.max(x,a); }, Math.NEGATIVE_INFINITY);
    }

    public static function all(arr : Array<Bool>) : Bool {
        return arr.fold(function(x,a){ return a && x; }, true);
    }

    public static function finite(arr : Array<Float>) : Array<Bool> {
        return arr.map(function(x){ return Math.isFinite(x); });
    }

    public static function onRay(origin : Point, dir : Vector, u : Float) : Array<Float> {
        return Vec.add( origin, Vec.mul(u, dir) );
    }

    public static function lerp(i : Float, u : Array<Float>, v : Array<Float>) : Array<Float>{
        return Vec.add( Vec.mul( i, u ), Vec.mul( 1.0 - i, v) );
    }

    public static function normalized( arr : Array<Float> ){
        return div( arr, norm(arr) );
    }

    public static function cross(u : Array<Float>, v : Array<Float>) : Array<Float>{
        return [u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]];
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
        var norm2 = normSquared(a);
        return norm2 != 0.0 ? Math.sqrt( norm2 ) : norm2;
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

    public static function dot(a : Array<Float>, b : Array<Float>) : Float {
        var sum : Float = 0;
        for (i in 0...a.length){
            sum += a[i] * b[i];
        }
        return sum;
    }

    public static function add(a : Array<Float>, b : Array<Float>) : Array<Float>{
        return [ for (i in 0...a.length) a[i] + b[i] ];
    }

    public static function mul(a : Float, b : Array<Float>) : Array<Float>{
        return [ for (i in 0...b.length) a * b[i] ];
    }

    public static function div(a : Array<Float>, b : Float ) : Array<Float>{
        return [ for (i in 0...a.length) a[i] / b ];
    }

    public static function sub(a : Array<Float>, b : Array<Float>) : Array<Float>{
        return [ for (i in 0...a.length) a[i] - b[i] ];
    }

    public static function isZero( vec : Array<Float> ){

        for (i in 0...vec.length){
            if (Math.abs( vec[i] ) > verb.core.Constants.TOLERANCE ) return false;
        }

        return true;
    }
}