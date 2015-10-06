package verb.core;

import verb.core.Vec;
import verb.core.Data;

// Tools for working with matrices

@:expose("core.Mat")
class Mat {

    // Multiply a `Matrix` by a constant

    public static function mul(a : Float, b : Matrix ) : Matrix {
        return [ for (i in 0...b.length) Vec.mul(a, b[i]) ];
    }

    // Multiply two matrices assuming they are of compatible dimensions.
    //
    // Based on the numeric.js routine - `numeric.dotMMsmall`

    public static function mult(x : Matrix, y : Matrix) : Matrix {

        var p,q,r,ret,foo,bar,woo,i0,k0,p0,r0;

        p = x.length; q = y.length; r = y[0].length;
        ret = new Matrix();

        var i = p-1;
        var j = 0;
        var k = 0;

        while (i>=0){
            foo = new Vector();
            bar = x[i];

            k = r-1;
            while( k >= 0 ){
                woo = bar[q-1]*y[q-1][k];

                j = q-2;
                while ( j >= 1 ){
                    i0 = j-1;
                    woo += bar[j]*y[j][k] + bar[i0]*y[i0][k];
                    j -= 2;
                }
                if(j==0) { woo += bar[0]*y[0][k]; }
                foo[k] = woo;
                k--;
            }
            ret[i] = foo;
            i--;
        }
        return ret;
    }

    // Add two matrices

    public static function add(a : Matrix, b : Matrix ) : Matrix {
        return [ for (i in 0...a.length) Vec.add(a[i], b[i]) ];
    }

    // Divide each of entry of a Matrix by a constant

    public static function div(a : Matrix, b : Float ) : Matrix {
        return [ for (i in 0...a.length) Vec.div(a[i], b) ];
    }

    // Subtract two matrices

    public static function sub(a : Matrix, b : Matrix ) : Matrix {
        return [ for (i in 0...a.length) Vec.sub(a[i], b[i]) ];
    }

    // Multiply a `Matrix` by a `Vector`

    public static function dot(a : Matrix, b : Vector ) : Vector {
        return [ for (i in 0...a.length) Vec.dot(a[i], b) ];
    }

    // Build an identity matrix of a given size

    public static function identity(n : Int) : Matrix {
        var zeros = Vec.zeros2d(n, n);
        for (i in 0...n){ zeros[i][i] = 1.0; }
        return zeros;
    }

    // Transpose a matrix

    public static function transpose<T>(a : Array<Array<T>>) : Array<Array<T>> {
        if (a.length == 0) return [];
        return [ for (i in 0...a[0].length) [for (j in 0...a.length) a[j][i] ]  ];
    }

    // Solve a system of equations

    public static function solve(A : Matrix, b : Vector) : Vector {
        return LUsolve( LU(A), b );
    }

    // Based on methods from numeric.js

    private static function LUsolve(LUP : LUDecomp, b : Vector) : Vector {
        var i, j;
        var LU = LUP.LU;
        var n   = LU.length;
        var x = b.copy();
        var P   = LUP.P;
        var Pi, LUi, LUii, tmp;

        i = n-1;
        while ( i != -1 ){
            x[i] = b[i];
            --i;
        }

        i = 0;
        while (i < n){
            Pi = P[i];
            if (P[i] != i) {
                tmp = x[i];
                x[i] = x[Pi];
                x[Pi] = tmp;
            }

            LUi = LU[i];
            j = 0;
            while (j < i){
                x[i] -= x[j] * LUi[j];
                ++j;
            }
            ++i;
        }

        i = n-1;
        while (i >= 0){
            LUi = LU[i];
            j = i+1;
            while (j < n){
                x[i] -= x[j] * LUi[j];
                ++j;
            }

            x[i] /= LUi[i];
            --i;
        }

        return x;
    }

    // Based on methods from numeric.js

    private static function LU( A : Matrix ) : LUDecomp {

        var abs = Math.abs;
        var i, j, k, absAjk, Akk, Ak, Pk, Ai;
        var max;
        //copy A
        A = [ for (i in 0...A.length) A[i].copy() ];
        var n = A.length, n1 = n-1;
        var P = new Array<Int>(); //new Array(n);

        k = 0;
        while (k < n){
            Pk = k;
            Ak = A[k];
            max = Math.abs(Ak[k]);

            j = k+1;
            while (j < n){
                absAjk = Math.abs(A[j][k]);
                if (max < absAjk) {
                    max = absAjk;
                    Pk = j;
                }
                ++j;
            }
            P[k] = Pk;

            if (Pk != k) {
                A[k] = A[Pk];
                A[Pk] = Ak;
                Ak = A[k];
            }

            Akk = Ak[k];

            i = k+1;
            while (i < n){
                A[i][k] /= Akk;
                ++i;
            }

            i = k+1;
            while (i < n){
                Ai = A[i];
                j = k+1;
                while (j < n1){
                    Ai[j] -= Ai[k] * Ak[j];
                    ++j;
                    Ai[j] -= Ai[k] * Ak[j];
                    ++j;
                }
                if(j==n1) Ai[j] -= Ai[k] * Ak[j];
                ++i;
            }

            ++k;
        }

        return new LUDecomp(A, P);
    }

}

// Based on methods from numeric.js

private class LUDecomp {

    public var LU : Matrix;
    public var P : Array<Int>;
    public function new( lu : Matrix, p : Array<Int> ){
        this.LU = lu;
        this.P = p;
    }

}
