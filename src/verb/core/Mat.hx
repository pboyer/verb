package verb.core;

typedef Matrix = Array<Array<Float>>
typedef Vector = Array<Float>

class LUDecomp {

    public var LU : Matrix;
    public var P : Array<Int>;
    public function new( lu : Matrix, p : Array<Int> ){
        this.LU = lu;
        this.P = p;
    }

}

@:expose("core.Mat")
class Mat {

    public static function solve(A : Matrix, b : Vector) : Vector {
        return LUsolve( LU(A), b );
    }

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

    private static function LU( A : Matrix ) : LUDecomp {

        var abs = Math.abs;
        var i, j, k, absAjk, Akk, Ak, Pk, Ai;
        var max;
        // copy A
        A = [ for (i in 0...A.length) A[i].copy() ];
        var n = A.length, n1 = n-1;
        var P = new Array<Int>(); // new Array(n);

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
