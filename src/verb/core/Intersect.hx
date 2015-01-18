package verb.core;

import verb.core.types.AdaptiveRefinementNode.AdaptiveRefinementOptions;
import verb.core.Intersect.PolylineData;
import verb.core.types.SurfaceData;
import verb.core.Intersect.PolylineData;
import verb.core.Intersect.LazyMeshBoundingBoxTree;
import verb.core.types.BoundingBoxNode;
import verb.core.Intersect.MeshIntersectionPoint;
import verb.core.types.Pair;
import verb.core.Mat.Vector;
import verb.core.types.MeshData;
import verb.core.types.CurveData;

using verb.core.ArrayExtensions;

@:expose("core.Ray")
class Ray {
    public var origin : Point;
    public var dir : Vector;

    public function new(origin : Point, dir : Vector){
        this.origin = origin;
        this.dir = dir;
    }
}

@:expose("core.Interval")
class Interval<T> {
    public var min : T;
    public var max : T;

    public function new(min, max){
        this.min = min;
        this.max = max;
    }
}

@:expose("core.CurveTriPoint")
class CurveTriPoint {
    public var u : Float;
    public var uv : UV;
    public var point : Point;

    public function new(u : Float, point : Point, uv : UV){
        this.u = u;
        this.point = point;
        this.uv = uv;
    }
}

@:expose("core.MeshIntersectionPoint")
class MeshIntersectionPoint {
    public var uv0 : UV;
    public var uv1 : UV;
    public var point : Point;

    public var faceIndex0 : Int;
    public var faceIndex1 : Int;

    public function new(uv0, uv1, point, faceIndex0, faceIndex1){
        this.uv0 = uv0;
        this.uv1 = uv1;
        this.point = point;
        this.faceIndex0;
        this.faceIndex1;
    }
}

@:expose("core.TriSegmentIntersection")
class TriSegmentIntersection {

    // where the intersection took place
    public var point : Point;
    // the u param where u is the axis from v0 to v1
    public var s : Float;
    // the v param where v is the axis from v0 to v2
    public var t : Float;
    // the parameter along the segment
    public var p : Float;

    public function new(point, s, t, r){
        this.point = point;
        this.s = s;
        this.t = t;
        this.p = r;
    }
}

@:expose("core.CurveCurveIntersection")
class CurveCurveIntersection {

    // where the intersection took place
    public var point0 : Point;

    // where the intersection took place on the second curve
    public var point1 : Point;

    // the parameter on the first curve
    public var u0 : Float;

    // the parameter on the second curve
    public var u1 : Float;

    public function new(point0, point1, u0, u1){
        this.point0 = point0;
        this.point1 = point1;
        this.u0 = u0;
        this.u1 = u1;
    }

}

@:expose("core.CurveCurveIntersectionOptions")
class CurveCurveIntersectionOptions {

    public var sampleTol : Float = Constants.TOLERANCE;
    public var tol : Float = Constants.TOLERANCE;

    public function new(){ }

}

interface IBoundingBoxTree<T> {
    public function boundingBox() : BoundingBox;
    public function split() : Pair<IBoundingBoxTree<T>, IBoundingBoxTree<T>>;
    public function yield() : T;
    public function indivisible( tolerance : Float ) : Bool;
    public function empty() : Bool;
}

class LazyMeshBoundingBoxTree implements IBoundingBoxTree<Int> {
    var _mesh : MeshData;
    var _faceIndices : Array<Int>;
    var _boundingBox : BoundingBox = null;

    public function new(mesh, faceIndices = null){
        _mesh = mesh;
        if (faceIndices == null) {
            faceIndices = [ for (i in 0...mesh.faces.length) i ];
        }
        _faceIndices = faceIndices;
    }

    public function split() : Pair<IBoundingBoxTree<Int>, IBoundingBoxTree<Int>> {
        var as = Mesh.sort_tris_on_longest_axis( _boundingBox, _mesh, _faceIndices )
            , l = as.left()
            , r = as.right();

        return new Pair<IBoundingBoxTree<Int>, IBoundingBoxTree<Int>>(
            new LazyMeshBoundingBoxTree( _mesh, l),
            new LazyMeshBoundingBoxTree( _mesh, r ));
    }

    public function boundingBox(){
        if (_boundingBox == null){
            _boundingBox = Mesh.make_mesh_aabb( _mesh, _faceIndices );
        }
        return _boundingBox;
    }

    public function yield(){
        return _faceIndices[0];
    }

    public function indivisible( tolerance : Float ){
        return _faceIndices.length == 1;
    }

    public function empty(){
        return _faceIndices.length == 0;
    }
}

@:expose("core.PolylineData")
class PolylineData {
    public var points : Array<Point>;
    public var params : Array<Float>;
    public function new(points, params){
        this.points = points;
        this.params = params;
    }
}

class LazyPolylineBoundingBoxTree implements IBoundingBoxTree<Int> {

    var _interval : Interval<Int>;
    var _polyline : PolylineData;
    var _boundingBox : BoundingBox = null;

    public function new(polyline, interval = null){
        _polyline = polyline;

        if (interval == null) {
            interval = new Interval<Int>(0, polyline.points.length != 0 ? polyline.points.length-1 : 0);
        }
        _interval = interval;
    }

    public function split() : Pair<IBoundingBoxTree<Int>, IBoundingBoxTree<Int>> {
        var min = _interval.min;
        var max = _interval.max;

        var pivot = min + Math.ceil( (max-min) / 2 );

        var l = new Interval( min, pivot )
            , r = new Interval( pivot, max );

        return new Pair<IBoundingBoxTree<Int>, IBoundingBoxTree<Int>>(
            new LazyPolylineBoundingBoxTree( _polyline, l ),
            new LazyPolylineBoundingBoxTree( _polyline, r ));

    }

    public function boundingBox(){
        if (_boundingBox == null){
            _boundingBox = new BoundingBox( _polyline.points );
        }

        return _boundingBox;
    }

    public function yield(){
        return _interval.min;
    }

    public function indivisible( tolerance : Float ){
        return _interval.max - _interval.min == 1;
    }

    public function empty(){
        return _interval.max - _interval.min == 0;
    }
}

class LazyCurveBoundingBoxTree implements IBoundingBoxTree<CurveData> {

    var _curve : CurveData;
    var _boundingBox : BoundingBox = null;
    var _knotTol : Float;

    public function new(curve, knotTol : Float = null){
        _curve = curve;
        if (knotTol == null){
            knotTol = _curve.knots.last() - _curve.knots.first() / 1000;
        }
        _knotTol = knotTol;
    }

    public function split() : Pair<IBoundingBoxTree<CurveData>, IBoundingBoxTree<CurveData>> {
        var min = _curve.knots.first();
        var max = _curve.knots.last();
        var dom = max - min;

        var crvs = Modify.curve_split( _curve, (max + min) / 2.0 + dom * 0.01 * Math.random() );

        return new Pair<IBoundingBoxTree<CurveData>, IBoundingBoxTree<CurveData>>(
            new LazyCurveBoundingBoxTree( crvs[0], _knotTol ),
            new LazyCurveBoundingBoxTree( crvs[1], _knotTol ));
    }

    public function boundingBox(){
        if (_boundingBox == null){
            _boundingBox = new BoundingBox( Eval.dehomogenize_1d(_curve.controlPoints) );
        }
        return _boundingBox;
    }

    public function yield(){
        return _curve;
    }

    public function indivisible( tolerance : Float ){
        return _curve.knots.last() - _curve.knots.first() < _knotTol;
    }

    public function empty(){
        return false;
    }
}

class LazySurfaceBoundingBoxTree implements IBoundingBoxTree<SurfaceData> {

    var _surface : SurfaceData;
    var _boundingBox : BoundingBox = null;
    var _splitV : Bool;
    var _knotTolU : Float;
    var _knotTolV : Float;

    public function new(surface, splitV = false, knotTolU = null, knotTolV = null){
        _surface = surface;
        _splitV = splitV;

        if (knotTolU == null){
            knotTolU = (surface.knotsU.last() - surface.knotsU.first()) / 1000;
        }

        if (knotTolV == null){
            knotTolV = (surface.knotsV.last() - surface.knotsV.first()) / 1000;
        }

        _knotTolU = knotTolU;
        _knotTolV = knotTolV;
    }

    public function split() : Pair<IBoundingBoxTree<SurfaceData>, IBoundingBoxTree<SurfaceData>> {

        var min : Float;
        var max : Float;

        if (_splitV){
            min = _surface.knotsV.first();
            max = _surface.knotsV.last();
        } else {
            min = _surface.knotsU.first();
            max = _surface.knotsU.last();
        }

        var dom = max - min;
        var pivot = (min + max) / 2.0 + dom * 0.01 * Math.random();

        var srfs = Modify.surface_split(_surface, pivot, _splitV );

        return new Pair<IBoundingBoxTree<SurfaceData>, IBoundingBoxTree<SurfaceData>>(
            new LazySurfaceBoundingBoxTree( srfs[0], !_splitV, _knotTolU, _knotTolV ),
            new LazySurfaceBoundingBoxTree( srfs[1], !_splitV, _knotTolU, _knotTolV ));
    }

    public function boundingBox(){
        if (_boundingBox == null){
            _boundingBox = new BoundingBox();
            for (row in _surface.controlPoints){
                _boundingBox.addRange( Eval.dehomogenize_1d(row) );
            }
        }
        return _boundingBox;
    }

    public function yield(){
        return _surface;
    }

    public function indivisible( tolerance : Float ){
        if (_splitV){
            return _surface.knotsV.last() - _surface.knotsV.first() < _knotTolV;
        } else {
            return _surface.knotsU.last() - _surface.knotsU.first() < _knotTolU;
        }
    }

    public function empty(){
        return false;
    }
}

@:expose("core.PolylineMeshIntersection")
class PolylineMeshIntersection {

    public var point : Point;
    public var u : Float;
    public var uv : UV;
    public var polylineIndex : Int;
    public var faceIndex : Int;

    public function new(point, u, uv, polylineIndex, faceIndex){
        this.point = point;
        this.u = u;
        this.uv = uv;
        this.polylineIndex = polylineIndex;
        this.faceIndex = faceIndex;
    }
}

@:expose("core.CurveSurfaceIntersection")
class CurveSurfaceIntersection {

    public var u : Float;
    public var uv : UV;

    public function new( u, uv ){
        this.u = u;
        this.uv = uv;
    }
}

@:expose("core.Intersect")
class Intersect {

/*

    public static function meshes( mesh0 : MeshData, mesh1 : MeshData ) {

        // bounding box intersection to get all of the face pairs
        var bbints = Intersect.bounding_box_trees(
            new LazyMeshBoundingBoxTree( mesh0 ),
            new LazyMeshBoundingBoxTree( mesh1 ), 0 );

        // get the segments of the intersection crv with uvs
        var segments = bbints.map(function(ids : Pair<Int, Int>){

            var res : Interval<MeshIntersectionPoint> =
                Intersect.triangles( mesh0, ids.item0, mesh1, ids.item1 );

            // not all face pairs necessarily intersect
            if (res == null) return res;
            return res;
        })
        .filter(function(x){ return x; })
        .filter(function(x){
            var dif = Vec.sub( x[0].pt, x[1].pt );
            return Vec.dot( dif, dif ) > verb.EPSILON
        });

        // TODO: this is too expensive and this only occurs when the intersection
        // 		line is on an edge.  we should mark these to avoid doing all of
        //		these computations
        segments = segments.unique(function(a, b){

            var s1 = Vec.sub( a[0].uvtri1, b[0].uvtri1 );
            var d1 = Vec.dot( s1, s1 );

            var s2 = Vec.sub( a[1].uvtri1, b[1].uvtri1 );
            var d2 = Vec.dot( s2, s2 );

            var s3 = Vec.sub( a[0].uvtri1, b[1].uvtri1 );
            var d3 = Vec.dot( s3, s3 );

            var s4 = Vec.sub( a[1].uvtri1, b[0].uvtri1 );
            var d4 = Vec.dot( s4, s4 );

            return ( d1 < verb.EPSILON && d2 < verb.EPSILON ) ||
            ( d3 < verb.EPSILON && d4 < verb.EPSILON );

        });

        if (segments.length == 0) return [];

        return make_polylines( segments );

    }

    private static function make_polylines( segments ) {

        // debug (return all segments)
        // return segments;

        // we need to be able to traverse from one end of a segment to the other
        segments.forEach( function(s){
            s[1].opp = s[0];
            s[0].opp = s[1];
        });

        // construct a tree for fast lookup
        var tree = verb.eval.kdtree_from_segs( segments );

        // flatten everything, we no longer need the segments
        var ends = segments.flatten();

        // step 1: assigning the vertices to the segment ends
        ends.forEach(function(segEnd){

            if (segEnd.adj) return;

            var adjEnd = verb.eval.lookup_adj_segment( segEnd, tree, segments.length );

            if (adjEnd && !adjEnd.adj){

                segEnd.adj = adjEnd;
                adjEnd.adj = segEnd;

            }

        });

        // step 2: traversing the topology to construct the pls
        var freeEnds = ends.filter(function(x){
            return !x.adj;
        });

        // if you cant find one, youve got a loop (or multiple), we run through all
        if (freeEnds.length == 0) {
            freeEnds = ends;
        }

        var pls = [];

        freeEnds.forEach(function(end){

            if (end.v) return;

            // traverse to end
            var pl = [];
            var curEnd = end;

            while (curEnd) {

                // debug
                if (curEnd.v) throw 'Segment end encountered twice!';

                // technically we consume both ends of the segment
                curEnd.v = true;
                curEnd.opp.v = true;

                pl.push(curEnd);

                curEnd = curEnd.opp.adj;

                // loop condition
                if (curEnd == end) break;

            }

            if (pl.length > 0) {
                pl.push( pl[pl.length-1].opp );
                pls.push( pl );
            }

        })

        return pls;

    }

    public static function pt_dist(a, b){
        return Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2) + Math.pow(a.z - b.z, 2);
    }

    private static function kdtree_from_segs( segments ){

        var treePoints = [];

        // for each segment, transform into two elements, each keyed by pt1 and pt2
        segments.forEach(function(seg){
            treePoints.push({ "x": seg[0].pt[0], "y": seg[0].pt[1], "z": seg[0].pt[2], ele: seg[0] });
            treePoints.push({ "x": seg[1].pt[0], "y": seg[1].pt[1], "z": seg[1].pt[2], ele: seg[1] });
        });

        // make our tree
        return new KdTree(treePoints, Vec.distSquared, ["x", "y", "z"]);

    }

    public static function lookup_adj_segment( segEnd, tree, numSegments ) {

        var numResults = numSegments ? Math.min( numSegments, 3 ) : 3;

        // we look up 3 elements because we need to find the unique adj ele
        // we expect one result to be self, one to be neighbor and no more
        var adj = tree.nearest({ x: segEnd.pt[0], y: segEnd.pt[1], z: segEnd.pt[2] }, numResults)
        .filter(function(r){
            return segEnd != r[0].ele && r[1] < verb.EPSILON;
        })
        .map(function(r){ return r[0].ele; });

        // there may be as many as 1 duplicate pt

        // if its not unique (i.e. were at a branching point) we dont return it
        return (adj.length === 1) ? adj[0] : null;

    }
 */

    //
    // Get the intersection of a NURBS curve and a NURBS surface without an estimate
    //
    // **params**
    // + CurveData
    // + SurfaceData
    // + tolerance for the curve intersection
    //
    // **returns**
    // + array of CurveSurfaceIntersection objects
    //

    public static function curve_and_surface( curve : CurveData,
                                              surface : SurfaceData,
                                              tol : Float = 1e-3 )  {

        var ints = Intersect.bounding_box_trees(
            new LazyCurveBoundingBoxTree( curve ),
            new LazySurfaceBoundingBoxTree( surface ), 0 );

        return ints.map(function( inter ){

            var crvSeg = inter.item0;
            var srfPart = inter.item1;

            // get the middle param of the curve
            var min = crvSeg.knots.first();
            var max = crvSeg.knots.last();

            var u = (min + max) / 2.0;

            // get the middle param of the surface
            var minu = srfPart.knotsU.first();
            var maxu = srfPart.knotsU.last();

            var minv = srfPart.knotsV.first();
            var maxv = srfPart.knotsV.last();

            var uv = [ (minu + maxu) / 2.0, (minv + maxv) / 2.0 ];

            return Intersect.curve_and_surface_with_estimate( crvSeg, srfPart, [u].concat(uv), tol );

        });
    }

    //
    // Refine an intersection pair for a surface and curve given an initial guess.  This is an unconstrained minimization,
    // so the caller is responsible for providing a very good initial guess.
    //
    // **params**
    // + CurveData
    // + SurfaceData
    // + array of initial parameter values [ u_crv, u_srf, v_srf ]
    //
    // **returns**
    // + a CurveSurfaceIntersection object
    //

    public static function curve_and_surface_with_estimate(    curve : CurveData,
                                                               surface : SurfaceData,
                                                               start_params : Array<Float>,
                                                               tol : Float = 1e-3 ) : CurveSurfaceIntersection {

        var objective = function(x) {
            var p1 = Eval.rational_curve_point( curve, x[0])
            , p2 = Eval.rational_surface_point( surface, x[1], x[2] )
            , p1_p2 = Vec.sub(p1, p2);

            return Vec.dot(p1_p2, p1_p2);
        }

        var sol_obj = Numeric.uncmin( objective, start_params, tol );
        var final = sol_obj.solution;

        return new CurveSurfaceIntersection( final[0], [ final[1], final[2] ] );
    }

    //
    // Approximate the intersection of a polyline and mesh while maintaining parameter information
    //
    // **params**
    // + PolylineData
    // + MeshData
    //
    // **returns**
    // + an array of PolylineMeshIntersection object
    //

    public static function polyline_and_mesh( polyline : PolylineData,
                                              mesh : MeshData,
                                              tol : Float ) : Array<PolylineMeshIntersection> {

        var res = Intersect.bounding_box_trees(
            new LazyPolylineBoundingBoxTree( polyline ),
            new LazyMeshBoundingBoxTree( mesh ), tol );

        var finalResults = [];

        for (event in res) {

            var polid = event.item0;
            var faceid = event.item1;

            var inter = Intersect.segment_with_tri( polyline.points[polid], polyline.points[polid + 1], mesh.points, mesh.faces[ faceid ] );
            if ( inter == null ) continue;

            var pt = inter.point;
            var u = Vec.lerp(inter.p, [ polyline.params[polid] ], [ polyline.params[polid+1] ] )[0];
            var uv = Intersect.tri_uv_from_point( mesh, faceid,  pt );

            finalResults.push(new PolylineMeshIntersection( pt, u, uv, polid, faceid ));

        }

        return finalResults;
    }





    public static function mesh_bounding_boxes( a : MeshData, b : MeshData, tol : Float ) : Array<Pair<Int,Int>> {

        return Intersect.bounding_box_trees(new LazyMeshBoundingBoxTree(a), new LazyMeshBoundingBoxTree(b), tol );

    }

    //
    // The core algorithm for bounding box tree intersection, supporting both lazy and pre-computed bounding box trees
    // via the IBoundingBoxTree interface
    //
    // **params**
    // + an IBoundingBoxTree object
    // + a second IBoundingBoxTree object
    // + the tolerance for the intersection, used by BoundingBox.intersects
    //
    // **returns**
    // + an array of Pair objects extracted from the yield method of IBoundingBoxTree
    //
    public static function bounding_box_trees<T1, T2>( a : IBoundingBoxTree<T1>, b : IBoundingBoxTree<T2>, tol : Float = 1e-9 )
        : Array<Pair<T1,T2>> {

        if (a.empty() || b.empty()) return [];

        if ( !a.boundingBox().intersects( b.boundingBox(), tol ) ) return [];

        if (a.indivisible(tol) && b.indivisible(tol) ) return [ new Pair(a.yield(), b.yield()) ];

        var asplit = a.split()
            , bsplit = b.split();

        return     Intersect.bounding_box_trees( asplit.item0, bsplit.item0, tol )
            .concat( Intersect.bounding_box_trees( asplit.item0, bsplit.item1, tol  ) )
            .concat( Intersect.bounding_box_trees( asplit.item1, bsplit.item0, tol  ) )
            .concat( Intersect.bounding_box_trees( asplit.item1, bsplit.item1, tol  ) );
    }

    //
    // Approximate the intersection of two NURBS curves
    //
    // **params**
    // + CurveData object representing the first NURBS curve
    // + CurveData object representing the second NURBS curve
    // + tolerance for the intersection
    //
    // **returns**
    // + the intersections
    //

    public static function curves( curve1 : CurveData, curve2 : CurveData, tolerance : Float ) : Array<CurveCurveIntersection> {

        var ints = Intersect.bounding_box_trees(
            new LazyCurveBoundingBoxTree( curve1 ),
            new LazyCurveBoundingBoxTree( curve2 ), 0 );

        return ints.map(function(x : Pair<CurveData, CurveData>) : CurveCurveIntersection {
            return Intersect.curves_with_estimate( curve1, curve2, x.item0.knots.first(), x.item1.knots.first(), tolerance );
        });
    }

    //
    // Refine an intersection pair for two curves given an initial guess.  This is an unconstrained minimization,
    // so the caller is responsible for providing a very good initial guess.
    //
    // **params**
    // + CurveData object representing the first NURBS curve
    // + CurveData object representing the second NURBS curve
    // + guess for first parameter
    // + guess for second parameter
    // + tolerance for the intersection
    //
    // **returns**
    // + array of CurveCurveIntersection objects
    //

    private static function curves_with_estimate( curve0 : CurveData,
                                                  curve1 : CurveData,
                                                  u0 : Float,
                                                  u1 : Float,
                                                  tolerance : Float ) : CurveCurveIntersection
    {
        var objective = function( x : Vector ) : Float {
            var p1 = Eval.rational_curve_point(curve0, x[0])
            , p2 = Eval.rational_curve_point(curve1, x[1])
            , p1_p2 = Vec.sub(p1, p2);

            return Vec.dot(p1_p2, p1_p2);
        }

        var sol_obj = Numeric.uncmin( objective, [u0, u1], tolerance );

        var u1 = sol_obj.solution[0]
            , u2 = sol_obj.solution[1];

        var p1 = Eval.rational_curve_point(curve0, u1)
        , p2 = Eval.rational_curve_point(curve1, u2 );

        return new CurveCurveIntersection(p1, p2, u1, u2);
    }

    //
    // Intersect two triangles
    //
    // **params**
    // + array of length 3 arrays of numbers representing the points of mesh1
    // + array of length 3 arrays of number representing the triangles of mesh1
    // + array of length 3 arrays of numbers representing the points of mesh2
    // + array of length 3 arrays of number representing the triangles of mesh2
    //
    // **returns**
    // + a point represented by an array of length (dim)
    //

    public static function triangles( mesh0 : MeshData, faceIndex0 : Int, mesh1 : MeshData, faceIndex1 : Int ) : Interval<MeshIntersectionPoint>{

        var tri0 = mesh0.faces[faceIndex0];
        var tri1 = mesh1.faces[faceIndex1];

        // 0) get the plane rep of the two triangles
        var n0 = Mesh.get_tri_norm( mesh0.points, tri0 );
        var n1 = Mesh.get_tri_norm( mesh1.points, tri1 );
        var o0 = mesh0.points[ tri0[0] ];
        var o1 = mesh1.points[ tri1[0] ];

        // 1) intersect with planes to yield ray of intersection
        var ray = Intersect.planes(o0, n0, o1, n1);
        if (ray == null) return null;

        // 2) clip the ray within tri0
        var clip1 = clip_ray_in_coplanar_tri( ray, mesh0, faceIndex0 );
        if (clip1 == null) return null;

        // 3) clip the ray within tri1
        var clip2 = clip_ray_in_coplanar_tri( ray, mesh1, faceIndex1 );
        if (clip2 == null) return null;

        // 4) find the interval that overlaps
        var merged = merge_tri_clip_intervals(clip1, clip2, mesh0, faceIndex0, mesh1, faceIndex1 );
        if (merged == null) return null;

        return return new Interval(
            new MeshIntersectionPoint(merged.min.uv0, merged.min.uv1, merged.min.point, faceIndex0, faceIndex1 ),
            new MeshIntersectionPoint(merged.max.uv0, merged.max.uv1, merged.max.point, faceIndex0, faceIndex1 ));

    }

    public static function clip_ray_in_coplanar_tri(ray : Ray, mesh : MeshData, faceIndex : Int ) : Interval<CurveTriPoint> {

        // 0) construct rays for each edge of the triangle
        var tri = mesh.faces[faceIndex]
        , o = [ mesh.points[ tri[0] ], mesh.points[ tri[1] ], mesh.points[ tri[2] ] ]
        , uvs = [ mesh.uvs[ tri[0] ], mesh.uvs[ tri[1] ], mesh.uvs[ tri[2] ] ]
        , uvd = [ Vec.sub(uvs[1], uvs[0]), Vec.sub(uvs[2], uvs[1]), Vec.sub(uvs[0], uvs[2]) ]
        , s = [ Vec.sub( o[1], o[0] ), Vec.sub( o[2], o[1] ), Vec.sub( o[0], o[2] ) ]
        , d = s.map( Vec.normalized )
        , l = s.map( Vec.norm );

        // 1) for each tri ray, if intersects and in segment interval, store minU, maxU
        var minU : CurveTriPoint = null;
        var maxU : CurveTriPoint = null;

        // need to clip in order to maximize the width of the intervals
        for (i in 0...3){
            var o0 = o[i];
            var d0 = d[i];

            var res = Intersect.rays( o0, d0, ray.origin, ray.dir );

            if (res == null) {
                continue;
            }

            var useg = res.u0;
            var uray = res.u1;

            // if outside of triangle edge interval, discard
            if (useg < -Constants.EPSILON || useg > l[i] + Constants.EPSILON) continue;

            // if inside interval
            if (minU == null || uray < minU.u){
                minU = new CurveTriPoint( uray, Vec.onRay( ray.origin, ray.dir, uray ), Vec.onRay( uvs[i], uvd[i], useg / l[i]));
            }

            if (maxU == null || uray > maxU.u){
                maxU = new CurveTriPoint( uray, Vec.onRay( ray.origin, ray.dir, uray ), Vec.onRay( uvs[i], uvd[i], useg / l[i]));
            }
        }

        if (maxU == null || minU == null) {
            return null;
        }

        // 3) otherwise, return minU maxU along with uv info
        return new Interval<CurveTriPoint>(minU, maxU);

    }

    public static function merge_tri_clip_intervals(clip1 : Interval<CurveTriPoint>, clip2 : Interval<CurveTriPoint>,
                                                    mesh1 : MeshData, faceIndex1 : Int, mesh2 : MeshData, faceIndex2 : Int ) : Interval<MeshIntersectionPoint> {

        // if the intervals dont overlap, fail
        if ( clip2.min.u > clip1.max.u + Constants.EPSILON
            || clip1.min.u > clip2.max.u + Constants.EPSILON) {
            return null;
        }

        // are these assigned properly?
        var min = (clip1.min.u > clip2.min.u) ? new Pair<CurveTriPoint, Int>(clip1.min, 0) : new Pair<CurveTriPoint, Int>(clip2.min, 1);
        var max = (clip1.max.u < clip2.max.u) ? new Pair<CurveTriPoint, Int>(clip1.max, 0) : new Pair<CurveTriPoint, Int>(clip2.max, 1);

        var res = new Interval(
            new MeshIntersectionPoint(null, null, min.item0.point, faceIndex1, faceIndex2),
            new MeshIntersectionPoint(null, null, max.item0.point, faceIndex1, faceIndex2));

        if (min.item1 == 0){
            res.min.uv0 = min.item0.uv;
            res.min.uv1 = tri_uv_from_point( mesh2, faceIndex2, min.item0.point );
        } else {
            res.min.uv0 = tri_uv_from_point( mesh1, faceIndex1, min.item0.point );
            res.min.uv1 = min.item0.uv;
        }

        if (max.item1 == 0){
            res.max.uv0 = max.item0.uv;
            res.max.uv1 = tri_uv_from_point( mesh2, faceIndex2, max.item0.point );
        } else {
            res.max.uv0 = tri_uv_from_point( mesh1, faceIndex1, max.item0.point );
            res.max.uv1 = max.item0.uv;
        }

        return res;
    }

    public static function tri_uv_from_point( mesh : MeshData, faceIndex : Int, f : Point ) : UV {

        var tri = mesh.faces[faceIndex];

        var p1 = mesh.points[ tri[0] ];
        var p2 = mesh.points[ tri[1] ];
        var p3 = mesh.points[ tri[2] ];

        var uv1 = mesh.uvs[ tri[0] ];
        var uv2 = mesh.uvs[ tri[1] ];
        var uv3 = mesh.uvs[ tri[2] ];

        var f1 = Vec.sub(p1, f);
        var f2 = Vec.sub(p2, f);
        var f3 = Vec.sub(p3, f);

        // calculate the areas and factors (order of parameters doesn't matter):
        var a = Vec.norm( Vec.cross( Vec.sub(p1, p2), Vec.sub(p1, p3) ) ); // main triangle area a
        var a1 = Vec.norm( Vec.cross(f2, f3) ) / a; // p1's triangle area / a
        var a2 = Vec.norm( Vec.cross(f3, f1) ) / a; // p2's triangle area / a
        var a3 = Vec.norm( Vec.cross(f1, f2) ) / a; // p3's triangle area / a

        // find the uv corresponding to point f (uv1/uv2/uv3 are associated to p1/p2/p3):
        return Vec.add( Vec.mul( a1, uv1), Vec.add( Vec.mul( a2, uv2), Vec.mul( a3, uv3)));
    }

    //
    // Intersect two planes, yielding a Ray
    //
    // **params**
    // + point in plane 0
    // + normal to plane 0
    // + point in plane 1
    // + normal to plane 1
    //
    // **returns**
    // + a point represented by an array of length (dim)
    //

    public static function planes(origin0 : Point, normal0 : Vector, origin1 : Point, normal1: Vector) : Ray {

        var d = Vec.cross(normal0, normal1);

        if (Vec.dot(d, d) < Constants.EPSILON) return null;

        // find the largest index of d
        var li = 0;
        var mi = Math.abs( d[0] );
        var m1 = Math.abs( d[1] );
        var m2 = Math.abs( d[2] );

        if ( m1 > mi ){
            li = 1;
            mi = m1;
        }

        if ( m2 > mi ){
            li = 2;
            mi = m2;
        }

        var a1, b1, a2, b2;

        if ( li == 0 ){
            a1 = normal0[1];
            b1 = normal0[2];
            a2 = normal1[1];
            b2 = normal1[2];
        } else if ( li == 1 ){
            a1 = normal0[0];
            b1 = normal0[2];
            a2 = normal1[0];
            b2 = normal1[2];
        } else {
            a1 = normal0[0];
            b1 = normal0[1];
            a2 = normal1[0];
            b2 = normal1[1];
        }

        // n dot X = d
        var d1 = -Vec.dot( origin0, normal0 );
        var d2 = -Vec.dot( origin1, normal1 );

        var den = a1 * b2 - b1 * a2;

        var x = (b1 * d2 - d1 * b2) / den;
        var y = (d1 * a2 - a1 * d2) / den;
        var p;

        if ( li == 0 ){
            p = [0,x,y];
        } else if ( li == 1 ){
            p = [x,0,y];
        } else {
            p = [x,y,0];
        }

        return new Ray(p, Vec.normalized( d ) );

    }

    //
    // Intersect three planes, expects the planes to form a single point of
    // intersection
    //
    // **params**
    // + normal for plane 0
    // + d for plane 0 ( where the plane eq is normal * (x,y,z) = d )
    // + normal for plane 1
    // + d for plane 1 ( where the plane eq is normal * (x,y,z) = d )
    // + normal for plane 2
    // + d for plane 2 ( where the plane eq is normal * (x,y,z) = d )
    //
    // **returns**
    // + the point representing the intersection
    //
    public static function three_planes(n0 : Point, d0 : Float, n1 : Point, d1 : Float, n2 : Point, d2 : Float) : Point {

        var u = Vec.cross( n1, n2 );
        var den = Vec.dot( n0, u );

        if (Math.abs(den) < Constants.EPSILON) return null;

        var diff = Vec.sub( Vec.mul( d2, n1 ), Vec.mul( d1, n2 ) );
        var num = Vec.add( Vec.mul( d0, u ), Vec.cross( n0, diff));

        return Vec.mul( 1 / den, num );

    }

    //
    // Intersect two polyline curves, keeping track of parameterization on each
    //
    // **params**
    // + PolylineData for first polyline
    // + PolylineData for second polyline
    // + tolerance for the intersection
    //
    // **returns**
    // + array of parameter pairs representing the intersection of the two parameteric polylines
    //

    public static function polylines( polyline0 : PolylineData, polyline1 : PolylineData, tol : Float )
        : Array<CurveCurveIntersection> {

        var res = Intersect.bounding_box_trees(
            new LazyPolylineBoundingBoxTree( polyline0 ),
            new LazyPolylineBoundingBoxTree( polyline1 ), tol );

        var finalResults = [];

        for (event in res) {
            var polid0 = event.item0;
            var polid1 = event.item1;

            var inter = Intersect.segments(polyline0.points[polid0],polyline0.points[polid0+1],
            polyline1.points[polid1],polyline1.points[polid1+1], tol);

            if ( inter == null ) continue;

            // remap to full parametric domain of polyline
            inter.u0 = Vec.lerp(inter.u0, [ polyline0.params[polid0] ], [ polyline0.params[polid0+1] ] )[0];
            inter.u1 = Vec.lerp(inter.u1, [ polyline1.params[polid1] ], [ polyline1.params[polid1+1] ] )[0];

            finalResults.push(inter);
        }

        return finalResults;
    }

    //
    // Find the closest parameter on two rays, see http://geomalgorithms.com/a07-_distance.html
    //
    // **params**
    // + first end of the first segment
    // + second end of the first segment
    // + first end of the second segment
    // + second end of the second segment
    // + tolerance for the intersection
    //
    // **returns**
    // + a CurveCurveIntersection object
    //

    public static function segments( a0 : Point, a1 : Point, b0 : Point, b1 : Point, tol : Float ) : CurveCurveIntersection {

        var a1ma0 = Vec.sub(a1, a0),
            aN = Math.sqrt( Vec.dot(a1ma0, a1ma0) ),
            a = Vec.mul( 1/ aN, a1ma0 ),
            b1mb0 = Vec.sub(b1, b0),
            bN = Math.sqrt( Vec.dot(b1mb0, b1mb0) ),
            b = Vec.mul( 1 / bN, b1mb0 ),
            int_params = Intersect.rays(a0, a, b0, b);

        if ( int_params != null ) {

            var u0 = Math.min( Math.max( 0, int_params.u0 / aN ), 1.0),
                u1 = Math.min( Math.max( 0, int_params.u1 / bN ), 1.0),
                point0 = Vec.onRay( a0, a1ma0, u0 ),
                point1 = Vec.onRay( b0, b1mb0, u1 ),
                dist = Vec.distSquared(point0, point1);

            if (  dist < tol*tol ) {
                return new CurveCurveIntersection( point0, point1, u0, u1 );
            }
        }

        return null;
    }

    //
    // Find the closest parameter on two rays, see http://geomalgorithms.com/a07-_distance.html
    //
    // **params**
    // + origin for ray 1
    // + direction of ray 1, assumed normalized
    // + origin for ray 1
    // + direction of ray 1, assumed normalized
    //
    // **returns**
    // + a CurveCurveIntersection object
    //

    public static function rays( a0 : Point, a : Point, b0 : Point, b : Point ) : CurveCurveIntersection {

        var dab = Vec.dot( a, b ),
        dab0 = Vec.dot( a, b0 ),
        daa0 = Vec.dot( a, a0 ),
        dbb0 = Vec.dot( b, b0 ),
        dba0 = Vec.dot( b, a0 ),
        daa = Vec.dot( a, a ),
        dbb = Vec.dot( b, b ),
        div = daa*dbb - dab*dab;

        // parallel case
        if ( Math.abs( div ) < Constants.EPSILON ) {
            return null;
        }

        var num = dab * (dab0-daa0) - daa * (dbb0-dba0),
        w = num / div,
        t = (dab0 - daa0 + w * dab)/daa;

        var p0 = Vec.onRay( a0, a, t );
        var p1 = Vec.onRay( b0, b, w );

        return new CurveCurveIntersection( p0, p1, t, w );
    }


    //
    //  Intersect segment with triangle (from http://geomalgorithms.com/a06-_intersect-2.html)
    //
    // **params**
    // + array of length 3 representing first point of the segment
    // + array of length 3 representing second point of the segment
    // + array of length 3 arrays representing the points of the triangle
    // + array of length 3 containing int indices in the array of points, this allows passing a full mesh
    //
    // **returns**
    // + a TriangleSegmentIntersection or null if failed
    //

    public static function segment_with_tri( p0 : Point, p1 : Point, points : Array<Point>, tri : Tri ) : TriSegmentIntersection {

        var v0 = points[ tri[0] ]
        , v1 = points[ tri[1] ]
        , v2 = points[ tri[2] ]
        , u = Vec.sub( v1, v0 )
        , v = Vec.sub( v2, v0 )
        , n = Vec.cross( u, v );

        var dir = Vec.sub( p1, p0 )
        , w0 = Vec.sub( p0, v0 )
        , a = -Vec.dot( n, w0 )
        , b = Vec.dot( n, dir );

        // is ray is parallel to triangle plane?
        if ( Math.abs( b ) < Constants.EPSILON ){
            return null;
        }

        var r = a / b;

        // segment goes away from triangle or is beyond segment
        if ( r < 0 || r > 1 ){
            return null;
        }

        // get proposed intersection
        var pt = Vec.add( p0, Vec.mul( r, dir ) );

        // is I inside T?
        var uv = Vec.dot(u,v)
        , uu = Vec.dot(u,u)
        , vv = Vec.dot(v,v)
        , w = Vec.sub( pt, v0 )
        , wu = Vec.dot( w, u )
        , wv = Vec.dot( w, v )
        , denom = uv * uv - uu * vv;

        if (Math.abs(denom) < Constants.EPSILON){
            return null;
        }

        var s = ( uv * wv - vv * wu ) / denom
        , t = ( uv * wu - uu * wv ) / denom;

        if (s > 1.0 + Constants.EPSILON || t > 1.0 + Constants.EPSILON || t < -Constants.EPSILON || s < -Constants.EPSILON || s + t > 1.0 + Constants.EPSILON){
            return null;
        }

        return new TriSegmentIntersection(pt, s, t, r );

    }
    //
    //  Intersect ray/segment with plane (from http://geomalgorithms.com/a06-_intersect-2.html)
    //
    //  If intersecting a ray, the param needs to be between 0 and 1 and the caller is responsible
    //  for making that check
    //
    // **params**
    // + array of length 3 representing first point of the segment
    // + array of length 3 representing second point of the segment
    // + array of length 3 representing an origin point on the plane
    // + array of length 3 representing the normal of the plane
    //
    // **returns**
    // null or an object with a p property representing the param on the segment
    //

    public static function segment_with_plane( p0 : Point, p1 : Point, v0 : Point, n : Point ) {

        var denom = Vec.dot( n, Vec.sub(p0,p1) );

        // parallel case
        if ( Math.abs( denom ) < Constants.EPSILON ) {
            return null;
        }

        var numer = Vec.dot( n, Vec.sub(v0,p0) );

        return { p: numer / denom };

    }

}

