package verb.topo;

import verb.core.types.Exception;
import haxe.ds.IntMap;
import verb.core.Trig;
import verb.topo.Split.Plane;
import verb.core.Vec;
import verb.core.Mat;
using verb.core.Vec;

import verb.core.Constants;
import verb.core.Intersect;
import verb.core.types.NurbsCurveData.Point;
import verb.core.types.Pair;

import verb.core.types.IDoublyLinkedList;
import verb.core.types.DoublyLinkedListExtensions;
using verb.core.types.DoublyLinkedListExtensions;

import verb.topo.Split;

typedef BooleanSplitResult = {
    coincidentVertices : Array<Pair<Vertex,Vertex>>,
    coplanarVerticesOfA : Array<Pair<Vertex,Face>>,
    coplanarVerticesOfB : Array<Pair<Vertex,Face>>
}

typedef EdgeFacePosition = {
    edge : HalfEdge,
    pos : FacePosition
}

enum FacePosition {
    On;

    AonBp;
    AonBm;
    BonAp;
    BonAm;

    AoutB;
    AinB;
    BoutA;
    BinA;
}

enum BoolOp {
    Union;
    Subtract;
    Intersect;
}

class SectorIntersection {
    public var SectorA : SectorDescription;
    public var SectorB : SectorDescription;

    // -1, 0, 1
    public var s1a : Int; // whether edge a of sector 1 is in, on, or out
    public var s2a : Int; // whether edge a of sector 2 is in, on, or out
    public var s1b : Int; // whether edge b of sector 1 is in, on, or out
    public var s2b : Int; // whether edge b of sector 2 is in, on, or out

    public var intersect : Bool = true;
    public function new() {}
}

class SectorDescription {
    public var edge : HalfEdge;
    public var ref1 : Array<Float>;
    public var ref2 : Array<Float>;
    public var ref12 : Array<Float>;
    public var i : Int;
    public var list : Array<SectorDescription>;

    public function new( i : Int, list : Array<SectorDescription> ) {
        this.i = i;
        this.list = list;
    }

    public function nxt() {
        var j = (this.i + 1) % this.list.length;
        return this.list[j];
    }

    public function prv() {
        var j = this.i == 0 ? this.list.length - 1 : i - 1;
        return this.list[j];
    }

    public function updateNormal(){
        this.ref12 = ref1.cross(ref2);
    }
}

@:expose("topo.Boolean")
class Boolean {

    public static var IN = 1;
    public static var ON = 0;
    public static var OUT = -1;

    public static function union( a : Solid, b : Solid, tol : Float ){

        var op = BoolOp.Union;

    // 1. Perform geometric intersection of the two solids, and insert vertices where appropriate

        var sg = intersect( a, b, tol );

    // 2. Classify the various intersection events

        var clvfa = classifyAllVertexFaceEvents( sg.coplanarVerticesOfA, op, true );
        var clvfb = classifyAllVertexFaceEvents( sg.coplanarVerticesOfB, op, false );

        var clvv = classifyAllVertexVertexEvents( sg.coincidentVertices, op );

    // 3. Insert null edges into the solids.  We will separate the two solids through these edges.

        var nea = new Array<HalfEdge>();
        var neb = new Array<HalfEdge>();

        insertAllVertexFaceEventNullEdges( sg.coplanarVerticesOfA, clvfa, op, true, nea, neb );
        insertAllVertexFaceEventNullEdges( sg.coplanarVerticesOfB, clvfb, op, false, nea, neb );

        insertAllVertexVertexEventNullEdges( clvv, nea, neb );

    // 4. Connect the null edges into a sequences of edges, forming new faces

        var afaces = [];
        var bfaces = [];

        connect( nea, neb, afaces, bfaces );

    // 5.

//      close( parts, op );  // from the various resultant parts  BinA, AinB, BoutA, etc, reconnect

    }

    public static function connect( nesa : Array<HalfEdge>,
                                    nesb : Array<HalfEdge>,
                                    afaces : Array<Face>,
                                    bfaces : Array<Face> ) : Void {

        Split.lexicographicalSort( nesa );
        Split.lexicographicalSort( nesb );

        var h0 : Pair<HalfEdge, HalfEdge>;
        var h1 : Pair<HalfEdge, HalfEdge>;

        var looseendsa = [];
        var looseendsb = [];

        // for every pair, one of the edges will be naked!

	// join means to take two vertices and join them into one edge

        for (i in 0...nesa.length){

            var nea = nesa[i];
            var neb = nesb[i];

            if ( (h0 = canJoin( nea, neb.opp, looseendsa, looseendsb )) != null){

                trace("joining 1!");

                var h0a = h0.item0;
                var h0b = h0.item1;

                trace("connecting:", h0a.id, nea.id);

                Split.join( h0a, nea );

                if (!Split.isLoose(h0a.opp, looseendsa)) {
                    Split.cut(h0a, afaces);
                }

                Split.join( h0b, neb.opp );
                if (!Split.isLoose(h0b.opp, looseendsb)) {
                    Split.cut(h0b, bfaces);
                }
            }

            if ( (h1 = canJoin( nea.opp, neb, looseendsa, looseendsb )) != null){

                trace("joining 2!");

                var h1a = h1.item0;
                var h1b = h1.item1;

                trace("connecting:", h1a.id, h1b.id, neb.id, nea.opp.id);

                Split.join( h1a, nea.opp );
                if (!Split.isLoose(h1a.opp, /*ok*/looseendsa)) {
                    Split.cut(h1a, afaces);
                }

                trace('alright');
                Split.join( h1b, neb );
                if (!Split.isLoose(h1b.opp, /*ok*/looseendsb)) {
                    Split.cut(h1b, bfaces);
                }
            }

            if (h0 != null && h1 != null) {
                trace('cutting');

                Split.cut(nea, afaces);
                Split.cut(neb, bfaces);
            }
        }
    }

    public static function canJoin(hea : HalfEdge,
                                   heb : HalfEdge,
                                   looseendsa : Array<HalfEdge>,
                                   looseendsb : Array<HalfEdge>) : Pair<HalfEdge, HalfEdge> {

        if (hea != null && heb != null){
            for (i in 0...looseendsa.length){

                var n0 = Split.neighbor(hea, looseendsa[i]);
                var n1 = Split.neighbor(heb, looseendsb[i]);

                if (n0 && n1){
                    var ra = looseendsa[i];
                    var rb = looseendsb[i];
                    looseendsa.splice(i, 1);
                    looseendsb.splice(i, 1);

                    return new Pair(ra, rb);
                }
            }
        }

        if (hea != null){
            looseendsa.push(hea);
        }

        if (heb != null){
            looseendsb.push(heb);
        }

        return null;
    }

    public static function insertAllVertexFaceEventNullEdges( vfs : Array<Pair<Vertex,Face>>,
                                                              efs : Array<Array<EdgeFacePosition>>,
                                                              op : BoolOp,
                                                              isA : Bool,
                                                              nea : Array<HalfEdge>,
                                                              neb : Array<HalfEdge> ) : Void {

        for (i in 0...vfs.length){
            insertVertexFaceEventNullEdges( vfs[i].item0, vfs[i].item1, efs[i], op, isA, nea, neb );
        }
    }

    public static function insertVertexFaceEventNullEdges( v : Vertex, f : Face, efs : Array<EdgeFacePosition>, op : BoolOp,
                                                           isA : Bool, nea : Array<HalfEdge>, neb : Array<HalfEdge>  ) : Void {

        insertVertexFaceEventNullEdgesCore( v, f, efs, isA, isA ? nea : neb );

        // this results in invalid an edge with an invalid nxt field
        insertNullEdgeIntoFace( v.pt.copy(), f, isA ? neb : nea );
    }

    public static function insertVertexFaceEventNullEdgesCore( v : Vertex, f : Face, efs : Array<EdgeFacePosition>,
                                                           isA : Bool, nulledges : Array<HalfEdge>  ) : Void {

        var s = v.e.l.f.s;
        var i = nextOfClass( above(isA), efs, 0 );

        // there's no above edge in the seq (all below), continue
        if (i == -1) return;

        // if all of the edges are of the same type, just continue
        if (nextOfClass( below(isA), efs, 0 ) == -1) return;

        var start = efs[i].edge;
        var head = start;
        var tail = start;
        var el = efs.length;

        while(true){

            // find the end of the ABOVE sequence
            while (efs[i].pos == above(isA)){
                tail = efs[i].edge;
                i = (i + 1) % el;
            }

            // insert a null edge
            s.lmev( head, tail.opp.nxt, head.v.pt.copy() );
            nulledges.push( head.prv );

            // find the next start sequence and assign to head
            i = nextOfClass( above(isA), efs, i );

            // there is no other above edge, we're done with this vertex
            if (i == -1) break;

            head = efs[i].edge;

            // we've come back to the beginning (should never happen)
            if (head == start) break;
        }

    }

    private static function nextOfClass( cl : FacePosition, ecs : Array<EdgeFacePosition>, start : Int ) : Int {

        var i = start;
        var head : EdgeFacePosition = null;
        while (i < ecs.length){
            if ( ecs[i].pos == cl ) {
                head = ecs[i];
                break;
            }
            i++;
        }
        return head != null ? i : -1;
    }


    public static function insertNullEdgeIntoFace( point : Point, f : Face, nes : Array<HalfEdge> ) : Void {

        var nv = f.s.lmev( f.ol.e, f.ol.e, point );
        var nl = f.s.lkemr(nv.e.prv);

        nes.push( nv.e );
    }

    public static function insertAllVertexVertexEventNullEdges( sps : Array<Array<SectorIntersection>>,
                                                                nea : Array<HalfEdge>,
                                                                neb : Array<HalfEdge> ) : Void {

        for (sp in sps){
            insertVertexVertexEventNullEdges( sp, nea, neb );
        }
    }

    public static function classifyAllVertexVertexEvents ( vvs : Array<Pair<Vertex,Vertex>>, op : BoolOp ) : Array<Array<SectorIntersection>>{
        return [for (vv in vvs) classifyVertexVertexEvent(vv.item0, vv.item1, op )];
    }

    public static function classifyVertexVertexEvent( a : Vertex, b : Vertex, op : BoolOp ) : Array<SectorIntersection> {
        var sps = classifyVertexVertexCore( a, b );
        reclassifyCoplanarSectorPairs( sps, op );
        reclassifyCoplanarSectorEdge( sps, op );
        return sps;
    }

    public static function insertVertexVertexEventNullEdges( ar : Array<SectorIntersection>,
                                                             nea : Array<HalfEdge>,
                                                             neb : Array<HalfEdge> ) : Void {

        var i = 0;
        var arl = ar.length;
        while (true){

            while (!ar[i].intersect)
                if (++i == arl) return;

            var ha1 : HalfEdge = null;
            var ha2 : HalfEdge = null;

            var hb1 : HalfEdge = null;
            var hb2 : HalfEdge = null;

            if (ar[i].s1a == OUT){ ha1 = ar[i].SectorA.edge; } else { ha2 = ar[i].SectorA.edge; }
            if (ar[i].s1b == IN){ hb1 = ar[i++].SectorB.edge; } else { hb2 = ar[i++].SectorB.edge; }

            while (!ar[i].intersect)
                if (++i == arl) return;

            if (ar[i].s1a == OUT){ ha1 = ar[i].SectorA.edge; } else { ha2 = ar[i].SectorA.edge; }
            if (ar[i].s1b == IN){ hb1 = ar[i++].SectorB.edge; } else { hb2 = ar[i++].SectorB.edge; }

            if (ha1 == ha2){
                insertNullEdge(ha1, ha1, 0, nea, neb );
                insertNullEdge(hb1, hb2, 1, nea, neb );
            } else if (hb1 == hb2){
                insertNullEdge(hb1, hb1, 1, nea, neb );
                insertNullEdge(ha2, ha1, 0, nea, neb );
            } else {
                insertNullEdge(ha2, ha1, 0, nea, neb );
                insertNullEdge(hb1, hb2, 1, nea, neb );
            }

            if (i == arl) return;
        }
    }

    public static function insertNullEdge(t : HalfEdge, f : HalfEdge, type : Int, nea : Array<HalfEdge>, neb : Array<HalfEdge> ){
        t.l.f.s.lmev(f, t, f.v.pt.copy());
        if (type == 0){
            nea.push( f.prv );
        } else {
            neb.push( f.prv );
        }
    }


    public static function classifyAllVertexFaceEvents( a : Array<Pair<Vertex,Face>>, op : BoolOp, isA : Bool ) : Array<Array<EdgeFacePosition>> {
        return [for (vf in a) classifyVertexFaceEvent( vf.item0, vf.item1, op, isA )];
    }

    public static function classifyVertexFaceEvent( v : Vertex, f : Face, op : BoolOp, isA : Bool ) : Array<EdgeFacePosition> {

        var p = planeFromFace(f);
        var ecs = new Array<EdgeFacePosition>();

        // 1. classify vertex edges based on opposite vertex's signed distance from the cutting plane
        for (e in v.halfEdges()){
            ecs.push({ edge: e, pos : asFacePosition(Split.classify(e, p), isA) });

            // for each edge, we also need to check the sector width - i.e. the angle
            // bisector between two adjacent edges. If more than 180, we bisect the edge
            if ( Split.wideSector(e) ){
                ecs.push({ edge: e, pos : asFacePosition(Split.classifyBisector(e, p), isA) });
            }
        }

        // 2. now, for each "on" edge, we need to determine if its face is aligned with the plane normal
        // if so,
        //      if aligned with plane normal (dot(fn, sp) > 0), AonBp else AonBm
        var el = ecs.length;
        for (i in 0...el){
            var ep = ecs[i];
            if (ep.pos == FacePosition.On){
                var nc = reclassifyCoplanarEdge(ep.edge, p, isA);
                ecs[i].pos = nc;
                ecs[(i+1) % el].pos = nc;
            }
        }

        // reclassify faces that are on
        for (i in 0...el){
            var ep = ecs[i];
            var ei = Type.enumIndex( ep.pos );
            if (ei > 0 && ei < 5){
                ep.pos = reclassifyOnSector( ep.pos, op );
            }
        }

        // it's possible that an edge was on, but its neighbors were not, indicating that its parent face is not coplanar
        // here, we reclassify based on neighbor edges
        for (i in 0...el){
            var ep = ecs[i];
            if (ep.pos == FacePosition.On){

                var a = i == 0 ? el-1 : i-1;
                var b = (i+1) % el;

                var prv = ecs[a].pos;
                var nxt = ecs[b].pos;

                if ( isAbove( prv ) && isAbove( nxt ) ){
                    ep.pos = below( isA );
                } else if ( isBelow( prv ) && isAbove( nxt ) ) {
                    ep.pos = below( isA );
                } else if ( isAbove( prv ) && isBelow( nxt ) ) {
                    ep.pos = below( isA );
                } else if ( isBelow( prv ) && isBelow( nxt ) ) {
                    ep.pos = above( isA );
                } else {
                    throw new Exception("Double On edge encountered!");
                }
            }
        }

        return ecs;
    }

    public static function reclassifyCoplanarSectorEdge( sps : Array<SectorIntersection>, op : BoolOp ){

        for (sp in sps){

            if ( !(sp.s1a == 0 || sp.s1b == 0 || sp.s2a == 0 || sp.s2b == 0) ) continue;

            throw new Exception("Coplanar sector edge classification not yet implemented!");

            // TODO: 2 varieties
                // edges lying within a sector face
                    // look at neighbor sectors of the edge
                        // both in -> in
                        // both out -> out
                        // in-out -> not an intersection?
            // edges aligned with an edge from the other solid
                //

        }

    }

    public static function reclassifyCoplanarSectorPairs( sps : Array<SectorIntersection>, op : BoolOp ) : Void {

        for (sp in sps){

            if (!( sp.s1a == 0 && sp.s1b == 0 && sp.s2a == 0 && sp.s2b == 0 ) ) continue;

            // do reclassification
            var sa = sp.SectorA;
            var sb = sp.SectorB;

            var psa = sa.prv();
            var nsa = sa.nxt();

            var psb = sb.prv();
            var nsb = sb.nxt();

            var ha = sa.edge;
            var hb = sb.edge;

            var newsa : Int = 0;
            var newsb : Int = 0;

            var aligned = ha.l.f.normal().sub( hb.l.f.normal() ).norm() < Constants.EPSILON;

            if (aligned){
                newsa = (op == BoolOp.Union) ? -1 : 1;
                newsb = (op == BoolOp.Union) ? 1 : -1;
            } else {
                newsa = (op == BoolOp.Union) ? 1 : -1;
                newsb = (op == BoolOp.Union) ? 1 : -1;
            }

            for (sp2 in sps){
                if ( sp2.SectorA == psa  && sp2.SectorB == sb && sp2.s1a != 0 ){
                    sp2.s2a = newsa;
                }

                if ( sp2.SectorA == nsa  && sp2.SectorB == sb && sp2.s2a != 0){
                    sp2.s1a = newsa;
                }

                if ( sp2.SectorA == sa  && sp2.SectorB == psb && sp2.s1b != 0){
                    sp2.s2b = newsb;
                }

                if ( sp2.s1a == sp2.s2a  && sp2.s1a != 0 ){
                    sp2.intersect = false;
                }

                if ( sp2.s1b == sp2.s2b  && sp2.s1b != 0 ){
                    sp2.intersect = false;
                }
            }

            sp.s1a = sp.s2a = newsa;
            sp.s1b = sp.s2b = newsb;
            sp.intersect = false;
        }

    }

    public static function classifyVertexVertexCore( a : Vertex, b : Vertex ) : Array<SectorIntersection> {

        var res = new Array<SectorIntersection>();

        // preprocess the sectors with extra geometric info
        var svsa = preprocessVertexSectors( a );
        var svsb = preprocessVertexSectors( b );

        // for each sector pair
        for (sva in svsa){
            for (svb in svsb){

                // if the pair intersects, classify the pair
                if ( sectorsIntersect( sva, svb ) ){

                    var sp = new SectorIntersection();
                    res.push( sp );

                    sp.SectorA = sva;
                    sp.SectorB = svb;

                    var na = sva.edge.l.f.normal();
                    var nb = svb.edge.l.f.normal();

                    sp.s1a = comp( nb.dot( sva.ref1 ), 0.0, Constants.EPSILON );
                    sp.s2a = comp( nb.dot( sva.ref2 ), 0.0, Constants.EPSILON );
                    sp.s1b = comp( na.dot( svb.ref1 ), 0.0, Constants.EPSILON );
                    sp.s2b = comp( na.dot( svb.ref2 ), 0.0, Constants.EPSILON );
                }
            }
        }

        return res;
    }

    public static function sectorsIntersect( a : SectorDescription, b : SectorDescription ) : Bool {

        var na = a.edge.l.f.normal();
        var nb = b.edge.l.f.normal();

        var int = na.cross(nb);

        if (int.norm() < Constants.EPSILON){
            return sectorsOverlap( a, b );
        }

        if ( withinSector( int, a ) && withinSector( int, b ) ){
            return true;
        }

        int = int.neg();
        return withinSector( int, a ) && withinSector( int, b );
    }

    public static function sectorsOverlap( a : SectorDescription, b : SectorDescription ) : Bool {
        throw new Exception("sectorsOverlap not implemented!");
        return false;
    }

    public static function withinSector( vec : Array<Float>, sv : SectorDescription ) : Bool {
        // TODO: not sure how robust this is
        return vec.positiveAngleBetween( sv.ref1, sv.ref12 ) < sv.ref1.positiveAngleBetween( sv.ref2, sv.ref12 );
    }

    public static function comp(a : Float, b : Float, tol : Float ) : Int {
        if ( Math.abs(a - b) < tol ){
            return 0;
        }
        return ( a > b ) ? 1 : -1;
    }

    public static function preprocessVertexSectors( v : Vertex, tol : Float = 1.0e-3 ) : Array<SectorDescription> {

        var svs = new Array<SectorDescription>();

        var i = 0;

        for (e in v.halfEdges()){

            var sv = new SectorDescription(i++, svs);
            svs.push(sv);

            sv.edge = e;
            sv.ref1 = e.prv.v.pt.sub( e.v.pt );
            sv.ref2 = e.nxt.v.pt.sub( e.v.pt );
            sv.updateNormal();

            // are the two edges coincident? or is the angle between them > 180?
            if (sv.ref12.norm() < tol || e.l.f.normal().dot( sv.ref12 ) > 0.0 ){

                // bisect the sector!
                var bisector : Array<Float>;

                if ( sv.ref12.norm() < tol ){
                    // TODO not sure how to handle this case
                    throw new Exception("Coincident consecutive edges encountered!");
//                    bisector = inside( e );
                } else {
                    bisector = sv.ref1.add( sv.ref2 ).neg();
                }

                var sv2 = new SectorDescription(i++, svs);
                svs.push( sv2 );

                sv2.edge = e;
                sv2.ref2 = sv.ref2.copy();
                sv2.ref1 = bisector;
                sv.ref2 = bisector;

                sv.updateNormal();
                sv2.updateNormal();
            }
        }

        return svs;
    }

    public static function above( isA : Bool ) : FacePosition {
        return isA ? FacePosition.AoutB : FacePosition.BoutA;
    }

    public static function below( isA : Bool ) : FacePosition {
        return isA ? FacePosition.AinB : FacePosition.BinA;
    }

    public static function isAbove( pos : FacePosition ) : Bool {
        return pos == FacePosition.AoutB || pos == FacePosition.BoutA;
    }

    public static function isBelow( pos : FacePosition ) : Bool {
        return pos == FacePosition.AinB || pos == FacePosition.BinA;
    }

    public static function planeFromFace( f : Face ){
        return { o : f.l.e.v.pt, n : f.normal() };
    }

    private static function reclassifyCoplanarEdge( e : HalfEdge, p : Plane, isA : Bool ) : FacePosition {

        var n = e.l.f.normal(); // TODO: cache me
        var ndc = n.dot(p.n);

        var eps2 = Constants.EPSILON * Constants.EPSILON;

        // face and plane are aligned
        if ( Math.abs(ndc - 1.0) < eps2 ) {
            return isA ? FacePosition.AonBp : FacePosition.BonAp;
        }

        if ( Math.abs(ndc + 1.0) < eps2 ) {
            return isA ? FacePosition.AonBm : FacePosition.BonAm;
        }

        return FacePosition.On;
    }

    private static function asFacePosition( pos : PlanePosition, isA : Bool ) : FacePosition {
        if (pos == PlanePosition.Above){
            return isA ? FacePosition.AoutB : FacePosition.BoutA;
        } else if (pos == PlanePosition.Below) {
            return isA ? FacePosition.AinB : FacePosition.BinA;
        }

        return FacePosition.On; // will need to be recategorized later
    }

    private static var boolOnSectorMap =
    [
        [ FacePosition.AoutB, FacePosition.AinB, FacePosition.BinA, FacePosition.BinA ],
        [ FacePosition.AinB, FacePosition.AoutB, FacePosition.BoutA, FacePosition.BoutA ],
        [ FacePosition.AinB, FacePosition.AoutB, FacePosition.BoutA, FacePosition.BoutA ]
    ];

    public static function reclassifyOnSector( c : FacePosition, op : BoolOp ) : FacePosition {
        return boolOnSectorMap[ Type.enumIndex(op) ][ Type.enumIndex(c) ];
    }

    public static function intersect( a : Solid, b : Solid, tol : Float ) : BooleanSplitResult {

        var va = splitAllEdges( a, b, tol );
        var vva = splitEdgesByVertices( a, b, tol );
        var vvb = splitEdgesByVertices( b, a, tol );
        var vfa = splitEdgesWithFaces( a, b, tol );
        var vfb = splitEdgesWithFaces( b, a, tol );

        return {
            coincidentVertices : getCoincidentVertices( a, b, va.concat(vva).concat(vvb), tol ),
            coplanarVerticesOfA : getCoplanarVertices( a, b, vfa, tol ),
            coplanarVerticesOfB : getCoplanarVertices( b, a, vfb, tol )
        };
    }

    // find the intersecting edges of the two solids and split them
    public static function splitAllEdges( a : Solid, b : Solid, tol : Float ) : Array<Pair<Vertex,Vertex>> {
        var c = new Array<Pair<Vertex,Vertex>>();

        // TODO spatial partition
        for (e0 in a.edges()){
            for (e1 in b.edges()){
                var a = splitEdges(e0.item0, e1.item0, tol);
                if (a == null) continue;
                c.push( a );
            }
        }

        return c;
    }

    public static function splitEdges( a : HalfEdge, b : HalfEdge, tol : Float ) : Pair<Vertex, Vertex> {

        var i = verb.core.Intersect.segments( a.v.pt, a.nxt.v.pt, b.v.pt, b.nxt.v.pt, tol  );

        // no intersection
        if (i == null) {
            return null;
        }

        // if the intersection is on a vertex, ignore it
        if ( i.u0 > 1.0 - Constants.EPSILON || i.u0 < Constants.EPSILON ||
             i.u1 > 1.0 - Constants.EPSILON || i.u1 < Constants.EPSILON ){
            return null;
        }

        return new Pair<Vertex,Vertex>( splitEdge(a, i.point0), splitEdge(b, i.point1) );
    }

    private static function splitEdgeByVertex( e : HalfEdge, v : Vertex, tol : Float ) : Vertex {

        var i = Trig.segmentClosestPoint( v.pt, e.v.pt, e.nxt.v.pt, 0.0, 1.0 );
        var d = v.pt.distSquared( i.pt );

        // too far
        if ( d > tol*tol ) {
            return null;
        }

        // if the intersection is on a vertex, ignore it
        if ( i.u > 1.0 - Constants.EPSILON || i.u < Constants.EPSILON ){
            return null;
        }

        return splitEdge( e, i.pt );
    }

    private static function splitEdge( e : HalfEdge, pt : Point ) : Vertex {
        var s = e.l.f.s;
        return s.lmev( e, e.opp.nxt, pt );
    }

    // determine if a point is within a face of a solid
    // TODO test
    public static function isPointInFace( pt : Point, f : Face, tol : Float ) : Bool {

        var n = f.normal();
        var o = f.l.e.v.pt;

        if ( !Trig.isPointInPlane(pt, { n : n, o : o}, tol) ) return false;

        var iol = isPointInPolygon( pt, f.ol.points(), n );
        if (!iol) return iol;

        for (il in f.rings()) {
            if ( isPointInPolygon(pt, il.points(), n) ) return false;
        }

        return true;
    }

    // determine if a point is within a polygon
    public static function isPointInPolygon( pt : Point, pts : Array<Point>, n : Array<Float> ) : Bool {
        var ptsl = pts.length;
        var a = 0.0;

        for ( i in 0...ptsl ){
            var v0 = pts[i].sub( pt );
            var v1 = pts[(i+1) % ptsl].sub( pt );

            a += Vec.positiveAngleBetween( v0, v1, n );
        }

        return Math.abs(a) > Math.PI;
    }

    // find the edges of a that intersect with the vertices of b and intersect them
    public static function splitEdgesByVertices( a : Solid, b : Solid, tol : Float ) : Array<Pair<Vertex,Vertex>> {
        var c = new Array<Pair<Vertex,Vertex>>();

        // TODO spatial partition
        for (e in a.edges()){
            for (v in b.v.iter()){
                var a = splitEdgeByVertex(e.item0, v, tol);
                if (a == null) continue;
                c.push( new Pair(a,v));
            }
        }

        return c;
    }

    // get the vertex pairs that are coincident between a and b, third argument is array of pairs we already know are coincident
    public static function getCoincidentVertices( a : Solid, b : Solid, v : Array<Pair<Vertex,Vertex>>, tol : Float ) : Array<Pair<Vertex,Vertex>> {

        // prevent formation of duplicates
        var m = new IntMap<Vertex>();

        for (p in v){
            m.set( p.item0.id, p.item0 );
            m.set( p.item1.id, p.item1 );
        }

        var tol2 = tol * tol;

        for ( v0 in a.v.iter() ){

            if (m.exists(v0.id)) continue;
            for ( v1 in b.v.iter() ){

                if (m.exists(v1.id)) continue;

                if (v0.pt.distSquared(v1.pt) < tol2){
                    v.push( new Pair(v0, v1) );
                }
            }
        }

        return v;
    }

    // split the edges of a that intersect faces of b
    public static function splitEdgesWithFaces( a : Solid, b : Solid, tol : Float ) : Array<Pair<Vertex, Face>> {
        var v = new Array<Pair<Vertex, Face>>();

        for (e in a.edges()){
            for (f in b.f.iter()){
                var r = splitEdgeWithFace( e.item0, f, tol );
                if (r == null) continue;
                v.push( new Pair(r, f) );
            }
        }

        return v;
    }

    public static function splitEdgeWithFace( he : HalfEdge, f : Face, tol : Float ) : Vertex {
        var n = f.normal();
        var o = f.ol.e.v.pt;

        var r = verb.core.Intersect.segmentAndPlane(he.v.pt, he.nxt.v.pt, o, n );

        // no intersection
        if (r == null) {
            return null;
        }

        // on vertex
        if ( r.p > 1.0 - Constants.EPSILON || r.p < Constants.EPSILON ){
            return null;
        }

        // get the actual intersection point
        var pt = Vec.lerp( r.p, he.nxt.v.pt, he.v.pt );

        if (!isPointInFace( pt, f, tol )){
            return null;
        }

        return splitEdge( he, pt );
    }

    // find the vertices of a that are coplanar with a face of b, third argument is vertices we already know are coplanar
    public static function getCoplanarVertices( a : Solid, b : Solid, ar : Array<Pair<Vertex, Face>>, tol : Float ) : Array<Pair<Vertex,Face>> {

        // prevent formation of duplicates
        var m = new IntMap<Vertex>();

        for (p in ar){
            m.set( p.item0.id, p.item0 );
        }

        for ( v in a.v.iter() ){

            if (m.exists(v.id)) continue;

            for ( f in b.f.iter() ){

                if (isPointInFace( v.pt, f, tol )){
                    ar.push( new Pair(v, f) );
                }
            }
        }

        return ar;
    }

}
