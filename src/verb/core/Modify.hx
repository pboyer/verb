package verb.core;

import verb.core.types.Interval;
import verb.core.Mat.Matrix;
import verb.core.types.NurbsCurveData;
import verb.core.types.NurbsCurveData;
import verb.core.types.NurbsSurfaceData;

using Lambda;
using verb.core.ArrayExtensions;

@:expose("core.KnotMultiplicity")
class KnotMultiplicity {
    public var knot : Float;
    public var mult : Int;

    public function new(knot : Float, mult : Int ){
        this.knot = knot;
        this.mult = mult;
    }

    public function inc(){
        mult++;
    }
}

@:expose("core.Modify")
class Modify {

    public static function unifyCurveKnotVectors( curves : Array<NurbsCurveData> ) : Array<NurbsCurveData> {

        curves = curves.map(Make.clonedCurve);

        var maxDegree = curves.fold(function(x,a){ return Modify.imax(x.degree, a); }, 0 );

        // elevate all curves to the same degree
        for (i in 0...curves.length){
            if (curves[i].degree < maxDegree){
                curves[i] = Modify.curveElevateDegree( curves[i], maxDegree );
            }
        }

        var knotIntervals = [ for (c in curves) new Interval( c.knots.first(), c.knots.last() ) ];

        // shift all knot vectors to start at 0.0
        for (i in 0...curves.length){
            var min = knotIntervals[i].min;
            curves[i].knots = curves[i].knots.map(function(x){ return x - min; });
        }

        // find the max knot span
        var knotSpans = knotIntervals.map(function(x){ return x.max - x.min; });
        var maxKnotSpan = knotSpans.fold(function(x,a){ return Math.max(x, a); }, 0.0 );

        // scale all of the knot vectors to match
        for (i in 0...curves.length){
            var scale = maxKnotSpan / knotSpans[i];
            curves[i].knots = curves[i].knots.map(function(x){ return x * scale; });
        }

        // merge all of the knot vectors
        var mergedKnots = curves.fold(function(x,a){ return Vec.sortedSetUnion(x.knots,a); }, []);

        // knot refinement on each curve
        for (i in 0...curves.length){
            var rem = Vec.sortedSetSub( mergedKnots, curves[i].knots );
            if (rem.length == 0) {
                curves[i] = curves[i];
            }
            curves[i] = Modify.curveKnotRefine( curves[i], rem  );
        }

        return curves;
    }

    public static inline function imin( a : Int, b : Int ) : Int {
        return a < b ? a : b;
    }

    public static inline function imax( a : Int, b : Int ) : Int {
        return a > b ? a : b;
    }

    public static function curveElevateDegree( curve : NurbsCurveData, finalDegree : Int ) : NurbsCurveData {

        if (finalDegree <= curve.degree) return curve;

        // args
        var n = curve.knots.length - curve.degree - 2;
        var newDegree = curve.degree;
        var knots = curve.knots;
        var controlPoints = curve.controlPoints;
        var degreeInc = finalDegree - curve.degree;

        var dim = curve.controlPoints[0].length;

        // intermediate values
        var bezalfs = Vec.zeros2d( newDegree + degreeInc + 1, newDegree + 1);
        var bpts = [];
        var ebpts = [];
        var Nextbpts = [];
        var alphas = [];

        var m = n + newDegree + 1;
        var ph = finalDegree;
        var ph2 = Math.floor(ph / 2);

        // return values
        var Qw = [];
        var Uh = [];
        var nh;

        bezalfs[0][0] = 1.0;
        bezalfs[ph][newDegree] = 1.0;

        for (i in 1...ph2+1){
            var inv = 1.0 / Binomial.get( ph, i );
            var mpi = imin(newDegree,i);
            for (j in imax(0,i-degreeInc)...mpi+1){
                bezalfs[i][j] = inv * Binomial.get(newDegree,j) * Binomial.get(degreeInc,i-j);
            }
        }
        for (i in ph2+1...ph){
            var mpi = imin(newDegree,i);
            for (j in imax(0,i-degreeInc)...mpi+1){
                bezalfs[i][j] = bezalfs[ph-i][newDegree-j];
            }
        }
        var mh = ph;
        var kind = ph+1;
        var r = -1;
        var a = newDegree;
        var b = newDegree+1;
        var cind = 1;
        var ua = knots[0];
        Qw[0] = controlPoints[0];
        for (i in 0...ph+1){
            Uh[i] = ua;
        }
        for (i in 0...newDegree+1){
            bpts[i] = controlPoints[i];
        }
        while (b < m){
            var i = b;
            while( b < m && knots[b] == knots[b+1]){
                b = b+1;
            }
            var mul = b-i+1;
            var mh = mh+mul+degreeInc;
            var ub = knots[b];
            var oldr = r;
            r = newDegree-mul;
            // check for integer arithmetic
            var lbz = oldr > 0 ? Math.floor((oldr+2)/2) : 1;
            var rbz = r > 0 ? Math.floor(ph-(r+1)/2) : ph;
            if (r > 0){
                var numer = ub-ua;
                var alfs = [];
                var k = newDegree;
                while (k > mul){
                    alfs[k-mul-1] = numer/(knots[a+k]-ua); // integer arithmetic?
                    k--;
                }
                for( j in 1...r+1){
                    var save = r-j;
                    var s = mul+j;
                    var k = newDegree;
                    while ( k >= s ){
                        bpts[k] = Vec.add( Vec.mul(alfs[k-s],bpts[k]), Vec.mul(1.0-alfs[k-s], bpts[k-1]));
                        k--;
                    }
                    Nextbpts[save] = bpts[newDegree];
                }
            }

            for( i in lbz...ph+1){
                ebpts[i] = Vec.zeros1d( dim );
                var mpi = imin(newDegree,i);
                for (j in imax(0,i-degreeInc)...mpi+1){
                    ebpts[i] = Vec.add( ebpts[i], Vec.mul( bezalfs[i][j], bpts[j]));
                }
            }

            if (oldr > 1){
                var first = kind-2;
                var last = kind;
                var den = ub-ua;
                var bet = (ub-Uh[kind-1])/den; // integer arithmetic?
                for (tr in 1...oldr){
                    var i = first;
                    var j = last;
                    var kj = j-kind+1;
                    while (j-i > tr){
                        if (i < cind){
                            var alf = (ub-Uh[i])/(ua-Uh[i]); // integer arithmetic?
                            Qw[i] = Vec.lerp(alf, Qw[i], Qw[i-1]);
                        }
                        if ( j >= lbz ){
                            if ( j-tr <= kind-ph+oldr ){
                                var gam = (ub-Uh[j-tr])/den;
                                ebpts[kj] = Vec.lerp(gam, ebpts[kj], ebpts[kj+1]);
                            }
                        } else {
                            ebpts[kj] = Vec.lerp(bet, ebpts[kj], ebpts[kj+1]);
                        }
                        i = i+1;
                        j = j-1;
                        kj = kj-1;
                    }
                    first = first-1;
                    last = last+1;
                }
            }

            if (a != newDegree){
                for (i in 0...ph-oldr){
                    Uh[kind] = ua;
                    kind = kind+1;
                }
            }

            for (j in lbz...rbz+1){
                Qw[cind] = ebpts[j];
                cind = cind + 1;
            }

            if (b < m){
                for (j in 0...r){
                    bpts[j] = Nextbpts[j];
                }
                for (j in r...newDegree+1){
                    bpts[j] = controlPoints[b-newDegree+j];
                }
                a = b;
                b = b+1;
                ua = ub;
            }
            else {
                for (i in 0...ph+1){
                    Uh[kind+i] = ub;
                }
            }
        }
        nh = mh-ph-1;

        return new NurbsCurveData( finalDegree, Uh, Qw );
    }

    public static function rationalSurfaceTransform( surface : NurbsSurfaceData, mat : Matrix ) : NurbsSurfaceData {

        var pts = Eval.dehomogenize2d( surface.controlPoints );

        for (i in 0...pts.length){
            for (j in 0...pts[i].length){
                var homoPt = pts[i][j];
                homoPt.push(1.0);

                pts[i][j] = Mat.dot( mat, homoPt ).slice( 0, homoPt.length - 1 );
            }
        }

        return new NurbsSurfaceData( surface.degreeU, surface.degreeV, surface.knotsU.copy(), surface.knotsV.copy(), Eval.homogenize2d(pts, Eval.weight2d( surface.controlPoints)) );
    }

    public static function rationalCurveTransform( curve : NurbsCurveData, mat : Matrix ) : NurbsCurveData {

        var pts = Eval.dehomogenize1d( curve.controlPoints );

        for (i in 0...pts.length){

            var homoPt = pts[i];
            homoPt.push(1.0);

            pts[i] = Mat.dot( mat, homoPt ).slice( 0, homoPt.length - 1 );
        }

        return new NurbsCurveData( curve.degree, curve.knots.copy(), Eval.homogenize1d( pts, Eval.weight1d( curve.controlPoints) ) );

    }

    public static function surfaceKnotRefine( surface : NurbsSurfaceData, knotsToInsert : Array<Float>, useV : Bool ) : NurbsSurfaceData {

        // TODO: make this faster by taking advantage of repeat computations in every row
        // 			 i.e. no reason to recompute the knot vectors on every row

        var newPts = []
        , knots
        , degree
        , ctrlPts;

        // u dir
        if (!useV){
            ctrlPts = Mat.transpose( surface.controlPoints );
            knots = surface.knotsU;
            degree = surface.degreeU;
        // v dir
        } else {
            ctrlPts = surface.controlPoints;
            knots = surface.knotsV;
            degree = surface.degreeV;
        }

        // do knot refinement on every row
        var c : NurbsCurveData = null;
        for (cptrow in ctrlPts){
            c = curveKnotRefine( new NurbsCurveData(degree, knots, cptrow), knotsToInsert );
            newPts.push( c.controlPoints );
        }

        var newknots = c.knots;

        // u dir
        if (!useV){
            newPts = Mat.transpose( newPts );
            return new NurbsSurfaceData( surface.degreeU, surface.degreeV, newknots, surface.knotsV.copy(), newPts );
        // v dir
        } else {
            return new NurbsSurfaceData( surface.degreeU, surface.degreeV, surface.knotsU.copy(), newknots, newPts );
        }

    }

    public static function surfaceSplit( surface : NurbsSurfaceData, u : Float, useV : Bool = false) : Array<NurbsSurfaceData> {

        var knots
        , degree
        , controlPoints;

        if (!useV) {

            controlPoints = Mat.transpose( surface.controlPoints );
            knots = surface.knotsU;
            degree = surface.degreeU;

        } else {

            controlPoints = surface.controlPoints;
            knots = surface.knotsV;
            degree = surface.degreeV;

        }

        var knots_to_insert = [ for (i in 0...degree+1) u ];

        var newpts0 = new Array<Array<Point>>()
        , newpts1 = new Array<Array<Point>>();

        var s = Eval.knotSpan( degree, u, knots );
        var res : NurbsCurveData = null;

        for (cps in controlPoints){

            res = curveKnotRefine( new NurbsCurveData(degree, knots, cps), knots_to_insert );

            newpts0.push( res.controlPoints.slice( 0, s + 1 ) );
            newpts1.push( res.controlPoints.slice( s + 1 ) );

        }

        var knots0 = res.knots.slice(0, s + degree + 2);
        var knots1 = res.knots.slice( s + 1 );

        if (!useV){
            newpts0 = Mat.transpose( newpts0 );
            newpts1 = Mat.transpose( newpts1 );

            return [ new NurbsSurfaceData(degree, surface.degreeV, knots0, surface.knotsV.copy(), newpts0 ),
                new NurbsSurfaceData(degree, surface.degreeV, knots1, surface.knotsV.copy(), newpts1 ) ];
         }

        // v dir
        return [ new NurbsSurfaceData(surface.degreeU, degree, surface.knotsU.copy(), knots0, newpts0 ),
                    new NurbsSurfaceData(surface.degreeU, degree, surface.knotsU.copy(), knots1, newpts1 ) ];
    }

    //
    // Decompose a NURBS curve into a collection of bezier's.  Useful
    // as each bezier fits into it's convex hull.  This is a useful starting
    // point for intersection, closest point, divide & conquer algorithms
    //
    // **params**
    // + NurbsCurveData object representing the curve
    //
    // **returns**
    // + *Array* of NurbsCurveData objects, defined by degree, knots, and control points
    //
    public static function decomposeCurveIntoBeziers( curve : NurbsCurveData ) : Array<NurbsCurveData> {

        var degree = curve.degree
        , controlPoints = curve.controlPoints
        , knots = curve.knots;

        // find all of the unique knot values and their multiplicity
        // for each, increase their multiplicity to degree + 1

        var knotmults = knotMultiplicities( knots );
        var reqMult = degree + 1;

        // insert the knots
        for (knotmult in knotmults) { // (var i = 0; i < mults.length; i++){
            if ( knotmult.mult < reqMult ){

                var knotsInsert = Vec.rep( reqMult - knotmult.mult, knotmult.knot );
                var res = curveKnotRefine( new NurbsCurveData(degree, knots, controlPoints), knotsInsert );

                knots = res.knots;
                controlPoints = res.controlPoints;
            }
        }

        var numCrvs = knots.length / reqMult - 1;
        var crvKnotLength = reqMult * 2;

        var crvs = [];

        var i = 0;
        while ( i < controlPoints.length){
            var kts = knots.slice( i, i + crvKnotLength );
            var pts = controlPoints.slice( i, i + reqMult );

            crvs.push( new NurbsCurveData(degree, kts, pts ) );

            i += reqMult;
        }

        return crvs;

    }

    //
    // Determine the multiplicities of the values in a knot vector
    //
    // **params**
    // + array of nondecreasing knot values
    //
    // **returns**
    // + *Array* of length 2 arrays, [knotValue, knotMultiplicity]
    //
    public static function knotMultiplicities( knots : KnotArray ) : Array<KnotMultiplicity> {

        var mults = [  new KnotMultiplicity( knots[0], 0 ) ];
        var curr : KnotMultiplicity = mults[0];

        for (knot in knots){
            if ( (Math.abs(knot - curr.knot)) > Constants.EPSILON ){
                curr = new KnotMultiplicity(knot, 0);
                mults.push(curr);
            }

            curr.inc();
        }

        return mults;
    }

    // Split a curve into two parts
    //
    // **params**
    // + NurbsCurveData object representing the curve
    // + location to split the curve
    //
    // **returns**
    // + *Array* two new curves, defined by degree, knots, and control points
    //
    public static function curveSplit( curve : NurbsCurveData, u : Float ) : Array<NurbsCurveData> {

        var degree = curve.degree
        , controlPoints = curve.controlPoints
        , knots = curve.knots;

        var knots_to_insert = [for (i in 0...degree+1) u];
        var res = curveKnotRefine( curve, knots_to_insert );

        var s = Eval.knotSpan( degree, u, knots );

        var knots0 = res.knots.slice(0, s + degree + 2);
        var knots1 = res.knots.slice( s + 1 );

        var cpts0 = res.controlPoints.slice( 0, s + 1 );
        var cpts1 = res.controlPoints.slice( s + 1 );

        return [
            new NurbsCurveData( degree, knots0, cpts0 ),
            new NurbsCurveData( degree, knots1, cpts1 )
        ];

    }

    // Insert a collection of knots on a curve
    //
    // Corresponds to Algorithm A5.4 (Piegl & Tiller)
    //
    // **params**
    // + NurbsCurveData object representing the curve
    // + array of knots to insert
    //
    // **returns**
    // +  NurbsCurveData object representing the curve
    //

    public static function curveKnotRefine( curve : NurbsCurveData, knotsToInsert : Array<Float> ) : NurbsCurveData {

        if ( knotsToInsert.length == 0 ) return Make.clonedCurve(curve);

        var degree = curve.degree
        , controlPoints = curve.controlPoints
        , knots = curve.knots;

        var n = controlPoints.length - 1
        , m = n + degree + 1
        , r = knotsToInsert.length - 1
        , a = Eval.knotSpan( degree, knotsToInsert[0], knots )
        , b = Eval.knotSpan( degree, knotsToInsert[r], knots )
        , controlPoints_post = new CurvePointArray()
        , knots_post = new KnotArray();

        // new control pts
        for (i in 0...a-degree+1){
            controlPoints_post[i] = controlPoints[i];
        }

        for (i in b-1...n+1){
            controlPoints_post[i+r+1] = controlPoints[i];
        }

        // new knot vector
        for (i in 0...a+1){
            knots_post[i] = knots[i];
        }

        for (i in b+degree...m+1){
            knots_post[i+r+1] = knots[i];
        }

        var i = b + degree - 1;
        var k = b + degree + r;
        var j = r;

        while ( j >= 0 ) {

            while (knotsToInsert[j] <= knots[i] && i > a){
                controlPoints_post[k-degree-1] = controlPoints[i-degree-1];
                knots_post[k] = knots[i];
                k = k-1;
                i = i-1;
            }

            controlPoints_post[k-degree-1] = controlPoints_post[k-degree];

            for ( l in 1...degree+1){

                var ind = k-degree+l;
                var alfa = knots_post[k+l] - knotsToInsert[j];

                if (Math.abs(alfa) < Constants.EPSILON){
                    controlPoints_post[ind-1] = controlPoints_post[ind];
                } else {
                    alfa = alfa / (knots_post[k+l] - knots[i-degree+l]);

                    controlPoints_post[ind-1] = Vec.add(
                        Vec.mul( alfa, controlPoints_post[ind-1] ),
                        Vec.mul( (1.0 - alfa), controlPoints_post[ind]) );
                }

            }

            knots_post[k] = knotsToInsert[j];
            k = k - 1;

            j--;

        }

        return new NurbsCurveData(degree, knots_post, controlPoints_post );
    }

    // Insert a knot along a rational curve.  Note that this algorithm only works
    // for r + s <= degree, where s is the initial multiplicity (number of duplicates) of the knot.
    //
    // Corresponds to algorithm A5.1 (Piegl & Tiller)
    //
    // Use the curveKnotRefine for applications like curve splitting.
    //
    // **params**
    // + integer degree
    // + array of nondecreasing knot values
    // + array of control points
    // + parameter at which to insert the knot
    // + number of times to insert the knot
    //
    // **returns**
    // + *Object* the new curve, defined by knots and controlPoints
    //

    public static function curveKnotInsert( curve : NurbsCurveData, u : Float, r : Int ) : NurbsCurveData {

        var degree = curve.degree
        , controlPoints = curve.controlPoints
        , knots = curve.knots;

        // num_pts is num control points for the initial curve
        // k is the span on which the knots are inserted
        // s is the initial multiplicity of the knot
        // r is the number of times to insert the knot
        // controlPoints is initial set of control points

        var s = 0; // assume original multiplicity is 0 - TODO add check for multiplicity in knots

        var num_pts = controlPoints.length
        , k = Eval.knotSpan( degree, u, knots ) // the span in which the knot will be inserted
        , num_pts_post = num_pts + r // a new control pt for every new knot
        , controlPoints_temp = new CurvePointArray() // new Array( degree - s )
        , knots_post = new KnotArray() // new Array( knots.length + r )  // r new knots
        , controlPoints_post = new CurvePointArray() // new Array( num_pts_post )
        , i = 0;

        // new knot vector

        // insert the k knots that will not be affected
        for (i in 1...k+1){
            knots_post[i] = knots[i];
        }

        // insert the new repeat knots
        for (i in 1...r+1){
            knots_post[k+i] = u;
        }

        // insert the rest of the knots
        for (i in k+1...knots.length){
            knots_post[i+r] = knots[i];
        }

        // control point generation

        // copy the original control points before the insertion span
        for (i in 0...k - degree + 1){
            controlPoints_post[i] = controlPoints[i];
        }

        // copy the original controls after the insertion span
        for (i in k-s...num_pts){
            controlPoints_post[i+r] = controlPoints[i];
        }

        // collect the affected control points in this temporary array
        for (i in 0...degree-s+1){
            controlPoints_temp[i] = controlPoints[k-degree+i];
        }

        var L : Int = 0
        , alpha : Float = 0;

        // insert knot r times
        for (j in 1...r+1){

            L = k-degree+j;

            for (i in 0...degree-j-s+1){

                alpha = ( u - knots[L+i] ) / ( knots[i+k+1] - knots[L+i] );

                controlPoints_temp[i] = Vec.add(
                        Vec.mul( alpha, controlPoints_temp[i+1] ),
                        Vec.mul( (1.0 - alpha), controlPoints_temp[i])
                    );
            }

            controlPoints_post[ L ] = controlPoints_temp[0];
            controlPoints_post[k+r-j-s] = controlPoints_temp[degree-j-s];

        }

        // not so confident about this part
        for (i in L+1...k-s){
            controlPoints_post[i] = controlPoints_temp[ i - L ];
        }

        return new NurbsCurveData(degree, knots_post, controlPoints_post);
    }

}
