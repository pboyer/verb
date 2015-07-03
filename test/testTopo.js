var should = require('should')
	, verb = require('../build/js/verb.js');

// necessary for multi-threading
verb.exe.WorkerPool.basePath = process.cwd() + "/build/js/";

// some testing utilities
function vecShouldBe( expected, test, tol ){

	if (tol === undefined) tol = verb.core.Constants.TOLERANCE;

 	test.length.should.be.equal( expected.length );

 	for (var i = 0; i < test.length; i++){
 		test[i].should.be.approximately( expected[i], tol );
 	}
}

function last(a){
	return a[a.length-1];
}

describe("verb.topo.Solid.mvfs",function(){
    it('provides correctly linked lists, correct number of elements', function(){
        var s = verb.topo.Solid.mvfs( [0,0,0] );

        s.should.not.be.null;

        var e0 = s.f.l.e;
        e0.nxt.should.be.equal(e0);

        var l = s.loops();
        var v = s.vertices();
        var f = s.faces();
        var he = s.halfEdges();

        l.length.should.be.equal(1);
        v.length.should.be.equal(1);
        f.length.should.be.equal(1);
        he.length.should.be.equal(1);

        he[0].v.pt.should.eql([0,0,0]);
        he[0].nxt.should.eql(he[0]);
        he[0].prv.should.eql(he[0]);

        f[0].nxt.should.eql(f[0]);
        f[0].prv.should.eql(f[0]);

        v[0].nxt.should.eql(v[0]);
        v[0].prv.should.eql(v[0]);

        l[0].nxt.should.eql(l[0]);
        l[0].prv.should.eql(l[0]);
    });
});

var Tess2 = require('tess2');

describe("verb.topo.Tess2",function(){
    it('has the same results as JS library for simple example', function(){

        // has library
        var ca = [0,0, 10,0, 5,10];
        var cb = [0,2, 10,2, 10,6, 0,6];
        var contours = [ca,cb];

        var res0 = Tess2.tesselate({
            contours: contours,
            windingRule: Tess2.WINDING_ODD,
            elementType: Tess2.POLYGONS,
            polySize: 3,
            vertexSize: 2
        });

        // haxe port
        var opts2 = new verb.topo.Tess2Options();

        opts2.contours = contours;
        opts2.windingRule = verb.topo.Tess2.WINDING_ODD;
        opts2.elementType = verb.topo.Tess2.POLYGONS;
        opts2.polySize = 3;
        opts2.vertexSize = 2;

        var res1 = verb.topo.Tess2.tessellate(opts2);

        res1.vertices.should.eql(res0.vertices);
        res1.vertexIndices.should.eql(res0.vertexIndices);
        res1.vertexCount.should.eql(res0.vertexCount);
        res1.elements.should.eql(res0.elements);
        res1.elementCount.should.eql(res0.elementCount);
    });

});

describe("verb.core.Intersect.segmentAndPlane",function(){
	it('works for simple cases', function(){
		verb.core.Intersect.segmentAndPlane( [0,0,0], [0,0,1], [0,0,0.5], [0,0,1] ).p.should.be.approximately( 0.5, verb.core.Constants.EPSILON );
		verb.core.Intersect.segmentAndPlane( [0,0,0], [0,0,1], [0,0,0.1], [0,0,1] ).p.should.be.approximately( 0.1, verb.core.Constants.EPSILON );
		verb.core.Intersect.segmentAndPlane( [0,0,0], [0,0,1], [0,0,0.9], [0,0,1] ).p.should.be.approximately( 0.9, verb.core.Constants.EPSILON );
		verb.core.Intersect.segmentAndPlane( [0,0,0], [0,1,0], [0,0.5,0], [0,1,0] ).p.should.be.approximately( 0.5, verb.core.Constants.EPSILON );
		verb.core.Intersect.segmentAndPlane( [0,0,0], [0,1,0], [0,0.1,0], [0,1,0] ).p.should.be.approximately( 0.1, verb.core.Constants.EPSILON );
	});
});

function triangularLamina(){
    var s = verb.topo.Solid.mvfs( [0,0,0] );

    var e0 = s.f.l.e;
    var v0 = s.v;
    var f0 = s.f;

    var nv0 = s.lmev( e0, e0, [10,0,0] );
    nv1 = s.lmev( nv0.e, nv0.e, [10,10,0] );

    var nf = s.lmef( v0.e, v0.e.nxt.nxt );

    return s;
}

function triangularPrism(){
    var s = triangularLamina();

    var nvs = s.f.l.halfEdges().map(function(e){
        return s.lmev( e, e, verb.core.Vec.add( e.v.pt, [0,0,10]) );
    });

    var nfs = nvs
        .map(function(v){
            return v.e;
        })
        .map(function(e){
            var nf = s.lmef(e, e.nxt.nxt.nxt);
            return nf;
        });

    return s;
}


describe("verb.topo.Solid.lmef",function(){
    it('can close a single triangular loop into a lamina', function(){
        var s = verb.topo.Solid.mvfs( [0,0,0] );

        var e0 = s.f.l.e;
        var v0 = s.v;
        var f0 = s.f;

        var nv0 = s.lmev( e0, e0, [1,0,0] );
        nv1 = s.lmev( nv0.e, nv0.e, [1,1,0] );

        var nf = s.lmef( v0.e, v0.e.nxt.nxt );

        e0.should.equal( e0.nxt.nxt.nxt );
        e0.opp.should.not.equal( e0 );
        e0.opp.should.equal( e0.opp.nxt.nxt.nxt );

        var l = s.loops();
        var v = s.vertices();
        var f = s.faces();
        var he = s.halfEdges();

        f[0].loops()[0].halfEdges().length.should.be.equal( 3 );
        f[1].loops()[0].halfEdges().length.should.be.equal( 3 );

        l.length.should.be.equal(2);
        v.length.should.be.equal(3);
        f.length.should.be.equal(2);
        he.length.should.be.equal(6);

        v.forEach(function(x){
            x.neighbors().length.should.be.equal(2);
        });

        l.forEach(function(x){
            x.vertices().length.should.be.equal(3);
        });

        l.forEach(function(x){
            x.f.should.not.be.null;
        });

    });

    it('can close a single rectangular loop into a lamina', function(){
        var s = verb.topo.Solid.mvfs( [0,0,0] );

        var e0 = s.f.l.e;
        var v0 = s.v;
        var f0 = s.f;

        var nv0 = s.lmev( e0, e0, [1,0,0] );
        nv1 = s.lmev( nv0.e, nv0.e, [1,1,0] );
        s.lmev( nv1.e, nv1.e, [0,1,0] );

        var nf = s.lmef( v0.e, v0.e.nxt.nxt.nxt );

        e0.should.equal( e0.nxt.nxt.nxt.nxt );
        e0.opp.should.not.equal( e0 );
        e0.opp.l.should.not.equal( e0.l );
        e0.opp.should.equal( e0.opp.nxt.nxt.nxt.nxt );

        var l = s.loops();
        var v = s.vertices();
        var f = s.faces();
        var he = s.halfEdges();

        f[0].loops()[0].halfEdges().length.should.be.equal( 4 );
        f[1].loops()[0].halfEdges().length.should.be.equal( 4 );

        l.length.should.be.equal(2);
        v.length.should.be.equal(4);
        f.length.should.be.equal(2);
        he.length.should.be.equal(8);
    });

    it('can be used to create a single new face, extending from a triangular lamina', function(){
        var s = triangularLamina();

        var l = s.f.l;

        var nvs = l.halfEdges().map(function(e){
            return s.lmev( e, e, verb.core.Vec.add( e.v.pt, [0,0,1]) );
        });

        var he0 = l.halfEdges()[1];
        var he1 = he0.nxt.nxt.nxt;

        var nf = s.lmef(he0, he1);

        nf.l.halfEdges().length.should.equal( 4 );

        var l = s.loops();
        var v = s.vertices();
        var f = s.faces();
        var he = s.halfEdges();

        l.length.should.be.equal(3);
        v.length.should.be.equal(6);
        f.length.should.be.equal(3);
        he.length.should.be.equal(14);

        // each vertex has >=1 neighbors
        v.forEach(function(x){
            x.neighbors().length.should.be.greaterThan(0);
        });

        // each loop has >=3 vertices
        l.forEach(function(x){
            x.vertices().length.should.be.greaterThan(2);
        });

        // each loop is non-null
        f.forEach(function(x){
            x.l.should.not.be.null;
        });
    });

    it('can be used to close a lamina with extended edges into a prism', function(){
        var s = triangularLamina();

        var nvs = s.f.l.halfEdges().map(function(e){
            return s.lmev( e, e, verb.core.Vec.add( e.v.pt, [0,0,1]) );
        });

        var nfs = nvs
            .map(function(v){
                // get the halfEdges
                return v.e;
            })
            .map(function(e){
                // form the new side faces
                var nf = s.lmef(e, e.nxt.nxt.nxt);
                nf.l.halfEdges().length.should.equal( 4 );
                return nf;
            });

        var l = s.loops();
        var v = s.vertices();
        var f = s.faces();
        var he = s.halfEdges();

        v.length.should.be.equal(6);
        f.length.should.be.equal(5);
        l.length.should.be.equal(5);
        he.length.should.be.equal(18);

        // each vertex has 3 neighbors
        v.forEach(function(x){
            x.neighbors().length.should.be.equal(3);
        });

        // each loop has >=3 vertices
        l.forEach(function(x){
            x.vertices().length.should.be.greaterThan(2);
        });

        // each loop is non-null
        f.forEach(function(x){
            x.l.should.not.be.null;
        });
    });

    it('can split a quad face of a solid into two triangles', function(){

        var s = triangularPrism();

        var tfl = s.faces().filter(function(x){
            return verb.core.Vec.dot( x.normal(), [0,-1,0] ) > 0;
        });

        tfl.length.should.be.equal( 1 );

        var of = tfl[0];
        var nf = s.lmef( of.ol.e, of.ol.e.nxt.nxt );

        of.ol.vertices().length.should.be.equal(3);
        nf.ol.vertices().length.should.be.equal(3);

        var l = s.loops();
        var v = s.vertices();
        var f = s.faces();
        var he = s.halfEdges();

        l.length.should.be.equal(6);
        v.length.should.be.equal(6);
        f.length.should.be.equal(6);
        he.length.should.be.equal(20);

    });
});

describe("verb.topo.Solid.lkemr",function(){
    it('can be used to insert an empty ring into a face', function(){
        var s = triangularPrism();

        // get the top face
        var tfl = s.faces().filter(function(x){
            return verb.core.Vec.dot( x.normal(), [0,0,1] ) > 0;
        });

        tfl.length.should.be.equal( 1 );

        var tf = tfl[0];

        // insert new vertex and two new half-edges into face
        var nv = s.lmev( tf.l.e, tf.l.e, [0.1,0.1,1] );

        // now the face has 5 edges
        nv.e.l.halfEdges().length.should.be.equal(5);

        // remove the edges connecting this vertex to the outer face, making this into a new ring (i.e. inner loop)
        var nl = s.lkemr(nv.e.prv);

        nl.halfEdges().length.should.be.equal(1);
        nl.f.loops().length.should.be.equal(2);
        nl.f.neighbors().length.should.be.equal(3);

        nv.e.l.halfEdges().length.should.be.equal(1);
        nv.neighbors().length.should.be.equal(0);

        var fl = nl.f.loops();
        var ol = fl[0] != nl ? fl[0] : fl[1];

        ol.halfEdges().length.should.be.equal(3);
        nl.f.rings().length.should.be.equal(1);
    });
});

describe("verb.topo.Solid.lkev",function(){
    it('can be used to reduce a single edge back to the base', function(){
        // 2 vertex, 2 half edge topo
        var s = verb.topo.Solid.mvfs([0,0,0]);
        var e = s.f.l.e;
        var v = s.lmev( e, e, [0,0,1] );

        s.lkev( e );

        var l = s.loops();
        var v = s.vertices();
        var f = s.faces();
        var he = s.halfEdges();

        v.length.should.be.equal(1);
        f.length.should.be.equal(1);
        l.length.should.be.equal(1);
        he.length.should.be.equal(1);

        v[0].neighbors().length.should.be.equal(0);
        f[0].neighbors().length.should.be.equal(0);
        l[0].halfEdges().length.should.be.equal(1);
        he[0].nxt.should.be.equal(he[0]); // loop

        s.edges().length.should.be.equal(0);
    });
});

describe("verb.topo.Solid.lkef",function(){
    it('can rejoin a face on a quad face of a solid', function(){

        var s = triangularPrism();

        var tf = s.faces().filter(function(x){
            return verb.core.Vec.dot( x.normal(), [0,-1,0] ) > 0;
        })[0];

        var oe = tf.ol.e;
        var f = s.lmef( oe, oe.nxt.nxt );

        s.faces().length.should.be.equal( 6 );

        s.lkef( oe.prv );

        var l = s.loops();
        var v = s.vertices();
        var f = s.faces();
        var he = s.halfEdges();

        v.length.should.be.equal(6);
        f.length.should.be.equal(5);
        l.length.should.be.equal(5);
        he.length.should.be.equal(18);

        // each vertex has 3 neighbors
        v.forEach(function(x){
            x.neighbors().length.should.be.equal(3);
        });

        // each loop has >=3 vertices
        l.forEach(function(x){
            x.vertices().length.should.be.greaterThan(2);
        });

        // each loop is non-null
        f.forEach(function(x){
            x.l.should.not.be.null;
        });

    });
});

describe("verb.topo.Solid.lmekr",function(){
    it('can be used to undo a single lkemr to a lone vertex', function(){
        var s = triangularPrism();

        var tfl = s.faces().filter(function(x){
            return verb.core.Vec.dot( x.normal(), [0,0,1] ) > 0;
        });

        var tf = tfl[0];

        var e0 = tf.l.e.prv;

        var nv = s.lmev( tf.l.e, tf.l.e, [0.1,0.1,1] );
        var nl = s.lkemr(nv.e.prv); // now there's a hanging vertex in the face

        var ohe = s.halfEdges();
        var oe = s.edges();
        var ol = s.loops();

        var ne = s.lmekr( e0.nxt, nl.e );

        s.edges().length.should.be.equal( oe.length + 1 );

        // the solid should have one more edge
        s.halfEdges().length.should.be.equal( ohe.length + 1 );

        // one less loop
        s.loops().length.should.be.equal( ol.length - 1 );

        // the face should have a single loop
        ne.l.halfEdges().length.should.equal( 5 );
    });
});

describe("verb.topo.Solid.lkfmrh",function(){
    it('can be used to form a new hole', function(){

        var s = triangularPrism();

        var tfl = s.faces().filter(function(x){
            return verb.core.Vec.dot( x.normal(), [0,0,1] ) > 0;
        });

        var bf = s.faces().filter(function(x){
            return verb.core.Vec.dot( x.normal(), [0,0,-1] ) > 0;
        })[0];

        var tf = tfl[0];

        var e0 = tf.l.e.prv;

        var nv = s.lmev( tf.l.e, tf.l.e, [2,1,0] );
        var nl = s.lkemr(nv.e.prv);

        var v0 = nl.e.v;

        // make new face inside of this one
        var nv1 = s.lmev( nl.e, nl.e, [9,1,0] );
        var nv2 = s.lmev( nv1.e, nv1.e, [9,8,0] );
        var nf = s.lmef( v0.e, v0.e.nxt.nxt );

        // on each vertex of the outer loop of the new face, do an mev
        var nvs = nf.l.halfEdges().map(function(e){
            return s.lmev( e, e, verb.core.Vec.add( e.v.pt, [0,0,10]) ); // this extends up to the top face
        });

        // now iterate around, introducing new faces on every side, now we're extruding the interior face
        var nfs = nvs
            .map(function(v){
                return v.e;
            })
            .map(function(e){
                var nf = s.lmef(e, e.nxt.nxt.nxt);
                nf.l.halfEdges().length.should.equal( 4 );
                return nf;
            });

        // before apply lkfmrh
        var ohe = s.halfEdges();
        var oe = s.edges();
        var ol = s.loops();
        var of = s.faces();

        // insert nf into the top face as a ring
        s.lkfmrh( nf, bf );

        s.edges().length.should.be.equal( oe.length );
        s.halfEdges().length.should.be.equal( ohe.length );
        s.loops().length.should.be.equal( ol.length );

        // the face should now have an inner ring
        bf.loops().length.should.equal( 2 );

        // one less face!
        s.faces().length.should.equal( of.length - 1 );
    });
});


function hollowPrism(){

    var s = triangularPrism();

    var tfl = s.faces().filter(function(x){
        return verb.core.Vec.dot( x.normal(), [0,0,1] ) > 0;
    });

    var bf = s.faces().filter(function(x){
        return verb.core.Vec.dot( x.normal(), [0,0,-1] ) > 0;
    })[0];

    var tf = tfl[0];
    var e0 = tf.l.e.prv;

    var nv = s.lmev( tf.l.e, tf.l.e, [2,1,10] );
    var nl = s.lkemr(nv.e.prv);

    var v0 = nl.e.v;

    // make new face inside of this one
    var nv1 = s.lmev( nl.e, nl.e, [9,1,10] );
    var nv2 = s.lmev( nv1.e, nv1.e, [9,8,10] );
    var nf = s.lmef( v0.e, v0.e.nxt.nxt );

    // on each vertex of the outer loop of the new face, do an mev
    var nvs = nf.l.halfEdges().map(function(e){
        return s.lmev( e, e, verb.core.Vec.add( e.v.pt, [0,0,-10]) ); // this extends up to the top face
    });

    // now iterate around, introducing new faces on every side, now we're extruding the interior face
    var nfs = nvs
        .map(function(v){
            return v.e;
        })
        .map(function(e){
            return s.lmef(e, e.nxt.nxt.nxt);
        });

    s.lkfmrh( nf, bf );

    return s;
}

describe("verb.topo.Analyze.volume",function(){
    it('computes correct volume for triangular prism', function(){
        var s = triangularPrism();
        verb.topo.Analyze.volume( s ).should.equal( 500 );
    });

    it('computes correct volume for hollow prism', function(){
        var s = hollowPrism();
        verb.topo.Analyze.volume( s ).should.equal( 500 - 245 );
    });
});

describe("verb.topo.Analyze.area",function(){
    it('computes correct area for triangular prism', function(){
        var s = triangularPrism();
        verb.topo.Analyze.area( s ).should.equal( 200 + 100 + 10 * 10 * Math.sqrt(2) );
    });

    it('computes correct volume for hollow prism', function(){
        var s = hollowPrism();
        verb.topo.Analyze.area( s ).should.equal( 200 + (100 - 49) + 10 * 10 * Math.sqrt(2) + 10*7*Math.sqrt(2) + 2*7*10  );
    });
});



describe("verb.topo.Solid.lmev",function(){
    it('adds 2 new HalfEdges, one new vertex on first call', function(){
        var s = verb.topo.Solid.mvfs( [0,0,0] );

        var e0 = s.f.l.e;
        var v0 = s.f.l.e.v;

        var nv = s.lmev( e0, e0, [1,0,0] );
        nv.pt.should.eql([1,0,0]);

        e0.v.should.be.equal( nv );
        e0.nxt.v.should.be.equal( v0 );
        e0.nxt.nxt.v.should.be.equal( e0.v );

        var l = s.loops();
        var v = s.vertices();
        var f = s.faces();
        var he = s.halfEdges();

        l.length.should.be.equal(1);
        v.length.should.be.equal(2);
        f.length.should.be.equal(1);
        he.length.should.be.equal(2);
    });

    it('adds 2 new HalfEdges, one new vertex on second call', function(){
        var s = verb.topo.Solid.mvfs( [0,0,0] );

        var e0 = s.f.l.e;
        var v0 = s.f.l.e.v;

        var nv0 = s.lmev( e0, e0, [1,0,0] );
        nv0.pt.should.eql([1,0,0]);

        nv1 = s.lmev( nv0.e, nv0.e, [1,1,0] );
        nv1.pt.should.eql( [1,1,0] );

        e0.v.should.be.equal( nv0 );
        e0.nxt.v.should.be.equal( v0 );
        e0.nxt.nxt.v.should.be.equal( nv0 );
        e0.nxt.nxt.nxt.v.should.be.equal( nv1 );

        var l = s.loops();
        var v = s.vertices();
        var f = s.faces();
        var he = s.halfEdges();

        l.length.should.be.equal(1);
        v.length.should.be.equal(3);
        f.length.should.be.equal(1);
        he.length.should.be.equal(4);

    });

    it('can extend edges from a triangular lamina', function(){
        var s = triangularLamina();

        var vs = s.vertices();

        // each vertex has 2 neighbors originally
        vs.forEach(function(x){
            x.neighbors().length.should.be.equal(2);
        });

        var l = s.f.l;

        // extend every vertex in the loop with an lmev
        var nvs = l.halfEdges().map(function(e){
            return s.lmev( e, e, verb.core.Vec.add( e.v.pt, [0,0,1]) );
        });

        l.halfEdges().length.should.be.equal(9);
        s.f.nxt.l.halfEdges().length.should.be.equal(3);

        // each of the original vertices has 3 neighbors afterwards
        vs.forEach(function(x){
            x.neighbors().length.should.be.equal(3);
        });
    });

});


describe("verb.topo.Split.solidByPlane",function(){
    function cube(){
        var pts = [[0,0,0], [10,0,0], [10,10,0], [0,10,0] ];
        return verb.topo.Make.extrusion( pts, [0,0,10] );
    }

    it('can split a cube in half', function(){
        var p = { n : [0,0,1], o : [0,0,5] };
        var res = verb.topo.Split.solidByPlane( cube(), p );

        verb.topo.Analyze.volume(res.item0).should.be.approximately( 500, verb.core.Constants.EPSILON );
        verb.topo.Analyze.volume(res.item1).should.be.approximately( 500, verb.core.Constants.EPSILON );
    });

    it('can split a cube in quarters', function(){
        var p = { n : [0,0,1], o : [0,0,2.5] };
        var res = verb.topo.Split.solidByPlane( cube(), p );

        verb.topo.Analyze.volume(res.item0).should.be.approximately( 750, verb.core.Constants.EPSILON );
        verb.topo.Analyze.volume(res.item1).should.be.approximately( 250, verb.core.Constants.EPSILON );
    });

    it('does not split when plane is coplanar with bottom face of cube', function(){
        var res = verb.topo.Split.solidByPlane( cube(), { n : [0,0,1], o : [0,0,0] } );
        should.equal(null, res);
    });

    it('does not split when plane is coplanar with top face of cube', function(){
        var res = verb.topo.Split.solidByPlane( cube(), { n : [0,0,1], o : [0,0,10] } );
        should.equal(null, res);
    });

    it('does not split when plane is coplanar with side face of cube', function(){
        var res = verb.topo.Split.solidByPlane( cube(), { n : [1,0,0], o : [10,0,0] } );
        should.equal(null, res);
    });

    it('does not split when plane is non-intersecting', function(){
        var res = verb.topo.Split.solidByPlane( cube(), { n : [1,0,0], o : [20,0,0] } );
        should.equal(null, res);
    });

    it('can split cube through the center', function(){
        var n = [ 1 / Math.sqrt(3), 1 / Math.sqrt(3), 1 / Math.sqrt(3) ];
        var res = verb.topo.Split.solidByPlane( cube(), { n : n, o : [5,5,5] } );

        verb.topo.Analyze.volume(res.item0).should.be.approximately( 500, verb.core.Constants.EPSILON );
        verb.topo.Analyze.volume(res.item1).should.be.approximately( 500, verb.core.Constants.EPSILON );
    });

    it('can split an l-shaped solid', function(){
        var pts = [[0,0,0], [10,0,0], [10,10,0] , [20,10,0], [20,20,0], [0,20,0] ];
        var s = verb.topo.Make.extrusion( pts, [0,0,10] );
        var v = verb.topo.Analyze.volume( s );

        var p = { n : [0,0,1], o : [0,0,5] };
        var res = verb.topo.Split.solidByPlane( s, p );

        verb.topo.Analyze.volume(res.item0).should.be.approximately( v/2, verb.core.Constants.EPSILON );
        verb.topo.Analyze.volume(res.item1).should.be.approximately( v/2, verb.core.Constants.EPSILON );
    });
});

describe("verb.topo.Boolean.isPointInPolygon",function(){
    it('works for a few basic cases', function(){
        var tri = [ [0,0,0], [1,0,0], [1,1,0] ];
        var rect = [ [0,0,0], [1,0,0], [1,1,0], [0,1,0] ];
        var rectin = [ [0,0,0], [0.5,0.2,0], [1,0,0], [1,1,0], [0,1,0], [0.5,0.5,0] ];
        var l = [ [0,0,0], [1,0,0], [1,1,0], [2,1,0], [2,2,0], [0,2,0] ];

        verb.topo.Boolean.isPointInPolygon( [0.5,0.5,0], tri, [0,0,1]  ).should.be.equal( true );
        verb.topo.Boolean.isPointInPolygon( [0.5,0.5,0], rect, [0,0,1] ).should.be.equal( true );
        verb.topo.Boolean.isPointInPolygon( [0.1,0.3,0], rect, [0,0,1]  ).should.be.equal( true );
        verb.topo.Boolean.isPointInPolygon( [0.9,0.1,0], rect, [0,0,1]  ).should.be.equal( true );

        verb.topo.Boolean.isPointInPolygon( [2,0.5,0], rect, [0,0,1]  ).should.be.equal( false );
        verb.topo.Boolean.isPointInPolygon( [-2,0.5,0], rect, [0,0,1]  ).should.be.equal( false );
        verb.topo.Boolean.isPointInPolygon( [2,2,0], rect, [0,0,1]  ).should.be.equal( false );
        verb.topo.Boolean.isPointInPolygon( [-2,-2,0], rect, [0,0,1]  ).should.be.equal( false );

        verb.topo.Boolean.isPointInPolygon( [0,0.5,0], rectin, [0,0,1]  ).should.be.equal( false );
        verb.topo.Boolean.isPointInPolygon( [0.5,0.9,0], rectin, [0,0,1]  ).should.be.equal( true );

        verb.topo.Boolean.isPointInPolygon( [2,0,0], l, [0,0,1]  ).should.be.equal( false );
        verb.topo.Boolean.isPointInPolygon( [0.5,0.9,0], l, [0,0,1]  ).should.be.equal( true );
    });
});

function cube(){
    var ptsa = [[0,0,0], [10,0,0], [10,10,0], [0,10,0] ];
    return verb.topo.Make.extrusion( ptsa, [0,0,10] );
}



describe("verb.topo.Boolean.insertNullEdgeIntoFace",function(){
    it('testing', function(){

        var c = cube();

        var f = c.faces()[0];

        var centroid = verb.core.Vec.div( verb.core.Vec.addAll( f.l.points() ), f.l.points().length );





    });
});


describe("verb.topo.Boolean.union",function(){
    it('testing', function(){
        var a = cube();

        var ptsb = [[5,5,-5], [15,5,-5], [15,15,-5], [5,15,-5] ];
        var b = verb.topo.Make.extrusion( ptsb, [0,0,10] );

        var res = verb.topo.Boolean.union( a, b, 1e-6 );

        // TODO test that classifyVertexFace returns 3 inside, outside pairs




    });
}); 
