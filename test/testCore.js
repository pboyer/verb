var should = require('should')
	, verb = require('../build/js/verb.js');

console.log(verb);

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

describe("verb.core.BoundingBox.init",function(){

	it('should allow array of point arguments', function(){

		var bb1 = new verb.core.BoundingBox([[5,5,5], [10,10,10]]);

		should.equal( bb1.min[0], 5 );
		should.equal( bb1.min[1], 5 );
		should.equal( bb1.min[2], 5 );

		should.equal( bb1.max[0], 10 );
		should.equal( bb1.max[1], 10 );
		should.equal( bb1.max[2], 10 );

	});

});

describe("verb.core.BoundingBox.intersects",function(){

	it('returns expected results', function(){

		var bb1 = new verb.core.BoundingBox([ [5,5,5], [10,10,10] ])
			, bb2 = new verb.core.BoundingBox([ [0,0,0], [10,10,10] ])
			, bb3 = new verb.core.BoundingBox([ [-2,-2,-2], [-1,-1,-1] ]);

		should.equal( bb1.intersects(bb2), true );
		should.equal( bb1.intersects(bb3), false );
		should.equal( bb2.intersects(bb3), false );

	});

});

describe("verb.core.BoundingBox.intersect",function(){

	it('returns expected results', function(){

		// initialize a bounding box
		var bb1 = new verb.core.BoundingBox([ [5,5,5], [10,10,10] ])
			, bb2 = new verb.core.BoundingBox([ [0,0,0], [10,10,10] ])
			, bb3 = new verb.core.BoundingBox([ [-2,-2,-2], [-1,-1,-1] ]);

		// intersect bounding boxes
		var int_bb1_bb2 = bb1.intersect(bb2)
			, int_bb1_bb3 = bb1.intersect(bb3);

		should.equal( int_bb1_bb2.min[0], 5 );
		should.equal( int_bb1_bb2.min[1], 5 );
		should.equal( int_bb1_bb2.min[2], 5 );

		should.equal( int_bb1_bb2.max[0], 10 );
		should.equal( int_bb1_bb2.max[1], 10 );
		should.equal( int_bb1_bb2.max[2], 10 );

		should.equal( int_bb1_bb3, null ); //non-intersect is null


	});

});

describe("verb.core.BoundingBox.intervalsOverlap",function(){

	it('returns expected results', function(){

		should.equal( verb.core.BoundingBox.intervalsOverlap( 0, 1, 0, 10 ), true );
		should.equal( verb.core.BoundingBox.intervalsOverlap( 0, 1, 1, 10 ), true );
		should.equal( verb.core.BoundingBox.intervalsOverlap( 0, 1, 1+1e-3, 10 ), false );
		should.equal( verb.core.BoundingBox.intervalsOverlap( 0, 1, 2, 10 ), false );

	});

});

describe("verb.core.BoundingBox.contains",function(){

	it('returns expected results', function(){

		var bb4 = new verb.core.BoundingBox([ [0,0,0], [1,1,1] ])
			, bb5 = new verb.core.BoundingBox();

		should.equal( bb4.contains( [0,0,0] ), true );
		should.equal( bb4.contains( [1,1,1] ), true );
		should.equal( bb4.contains( [1,1,1+1e-3] ), false );
		should.equal( bb4.contains( [1,1,1-1e-3] ), true );
		should.equal( bb5.contains( [0,0,0] ), false );

	});

});

describe("verb.core.BoundingBox.contains",function(){

	it('BoundingBox.clear', function(){

		var bb1 = new verb.core.BoundingBox([ [5,5,5], [10,10,10] ]);
		bb1.clear();
		should.equal( bb1.initialized, false );

	});
});

describe("verb.core.BoundingBox.getAxisLength",function(){

	it('should return correct value', function(){

		var bb1 = new verb.core.BoundingBox([ [-1,2,3], [10,10,10] ]);
		should.equal( bb1.getAxisLength(0), 11 );
		should.equal( bb1.getAxisLength(1), 8 );
		should.equal( bb1.getAxisLength(2), 7 );

	});

});

describe("verb.core.BoundingBox.getLongestAxis",function(){

	it('should return correct value', function(){

		var bb1 = new verb.core.BoundingBox([ [-1,2,3], [10,10,10] ]);
		should.equal( bb1.getLongestAxis(0), 0 );

	});

});

describe("verb.core.BoundingBox.getAxisLength",function(){

	it('should return 0 when given out of bounds index', function(){

		var bb1 = new verb.core.BoundingBox([ [-1,2,3], [10,10,10] ]);
		should.equal( bb1.getAxisLength(8), 0 );
		should.equal( bb1.getAxisLength(-1), 0 );
		should.equal( bb1.getAxisLength(4), 0 );
		should.equal( bb1.getAxisLength(3), 0 );

	});

});

describe("verb.core.BoundingBox.getAxisLength",function(){

	it('should return 0 when given out of bounds index', function(){

		var bb1 = new verb.core.BoundingBox([ [-1,2,3], [10,10,10] ]);
		should.equal( bb1.getAxisLength(8), 0 );
		should.equal( bb1.getAxisLength(-1), 0 );
		should.equal( bb1.getAxisLength(4), 0 );
		should.equal( bb1.getAxisLength(3), 0 );

	});

});

describe("verb.core.BoundingBox.clear",function(){

	it('should set initialized to false', function(){

		var bb1 = new verb.core.BoundingBox([ [5,5,5], [10,10,10] ]);
		bb1.clear();
		should.equal( bb1.initialized, false );

	});

});


function getFlatSurface(){

	var p1 = [0,0,0]
		, p2 = [1,0,0]
		, p3 = [1,1,0]
		, p4 = [0,1,0];

	var p1p4 = verb.core.Vec.mul( 0.5, verb.core.Vec.add( p1, p4 ));
	var p2p3 = verb.core.Vec.mul( 0.5, verb.core.Vec.add( p2, p3 ));
	var p3p4 = verb.core.Vec.mul( 0.5, verb.core.Vec.add( p3, p4 ));
	var p1p2 = verb.core.Vec.mul( 0.5, verb.core.Vec.add( p1, p2 ));
	var p1p4p2p3 = verb.core.Vec.mul( 0.5, verb.core.Vec.add( p1p4, p2p3 ));
	var cpts = [ 	[p1, 		p1p4, 		p4],
					[p1p2, 	    p1p4p2p3, p3p4],
					[p2, 		p2p3, 		p3] ];
	var wts = [[1,1,1], [1,1,1], [1,1,1]];

	cpts = verb.eval.Eval.homogenize2d(cpts, wts);

	return {"knotsU": [0,0,0,1,1,1],
			"knotsV": [0,0,0,1,1,1],
			"controlPoints": cpts,
			"degreeU": 2,
			"degreeV": 2 };

}

describe("verb.core.AdaptiveRefinementNode.constructor",function(){

	it('can be instantiated', function(){

		var f = new verb.core.AdaptiveRefinementNode( getFlatSurface() );

		f.corners[0].uv[0].should.be.equal(0);
		f.corners[2].uv[0].should.be.equal(1);
		f.corners[0].uv[1].should.be.equal(0);
		f.corners[2].uv[1].should.be.equal(1);
		f.corners.length.should.be.equal(4);

	});

});

function extractUv(x){ return x.uv; }

describe("verb.core.AdaptiveRefinementNode.getEdgeCorners",function(){

	it('returns expected result for node without children', function(){

		var f = new verb.core.AdaptiveRefinementNode(getFlatSurface());

		f.getEdgeCorners( 0 ).map(extractUv).should.be.eql( [[0,0]] );
		f.getEdgeCorners( 1 ).map(extractUv).should.be.eql( [[1,0]] );
		f.getEdgeCorners( 2 ).map(extractUv).should.be.eql( [[1,1]] );
		f.getEdgeCorners( 3 ).map(extractUv).should.be.eql( [[0,1]] );

	});

	it('returns expected result for node with children', function(){

		var f = new verb.core.AdaptiveRefinementNode(getFlatSurface());

		f.divide({ minDepth : 1 });

		f.children.length.should.be.equal( 2 );

		// split horizontally
		f.getEdgeCorners(0).map(extractUv).should.be.eql( [ [ 0, 0 ] ] );
		f.getEdgeCorners(1).map(extractUv).should.be.eql( [ [ 1, 0 ], [ 1, 0.5 ] ] );
		f.getEdgeCorners(2).map(extractUv).should.be.eql( [ [ 1, 1 ] ] );
		f.getEdgeCorners(3).map(extractUv).should.be.eql( [ [ 0, 1 ], [ 0, 0.5 ] ] );

	});

	it('returns expected result for node with nested children', function(){

		var f = new verb.core.AdaptiveRefinementNode(getFlatSurface());

		f.divide({ minDepth : 2 });
		f.children.length.should.be.equal( 2 );
		f.children[0].children.length.should.be.equal( 2 );
		f.children[1].children.length.should.be.equal( 2 );

		f.getEdgeCorners(0).map(extractUv).should.be.eql( [ [ 0, 0 ], [ 0.5, 0 ] ] );
		f.getEdgeCorners(1).map(extractUv).should.be.eql( [ [ 1, 0 ], [ 1, 0.5 ] ] );
		f.getEdgeCorners(2).map(extractUv).should.be.eql( [ [ 1, 1 ], [ 0.5, 1 ] ] );
		f.getEdgeCorners(3).map(extractUv).should.be.eql( [ [ 0, 1 ], [ 0, 0.5 ] ] );

	});

});

describe("verb.core.AdaptiveRefinementNode.getAllCorners",function(){

	it('returns expected result for edge with more vertices on opposite side', function(){

		var f = new verb.core.AdaptiveRefinementNode(getFlatSurface());

		f.divide({ minDepth : 1 }); // now f is split in 2 horizontally

		f.children[0].divide({ minDepth : 1 }); //  f[0] is split in 2 vertically
		f.children[1].divide({ minDepth : 1 }); //  f[1] is split in 2 veritcally
		f.children[1].children[1].divide({ minDepth : 1 }); //  f[1][3] is split in 2 horizontally

		f.children[0].getAllCorners(1).map(extractUv).should.eql( [ [ 1, 0 ] ] );
		f.children[0].children[1].getAllCorners(2).map(extractUv).should.eql( [ [ 1, 0.5 ] ] );

	});

	it('returns expected result for edge with neighbors that has with lesser number of vertices on opposite side', function(){

		var f = new verb.core.AdaptiveRefinementNode(getFlatSurface());

		f.divide({ minDepth : 1 });  // now f is split in 2 horizontally

		f.children[0].divide({ minDepth : 1 }); //  f[0] is split in 2 vertically
		f.children[1].divide({ minDepth : 1 }); //  f[1] is split in 2 veritcally
		f.children[1].children[1].divide({ minDepth : 1 }); //  f[1][3] is split in 2 horizontally

		f.children[1].children[1].children[1].getAllCorners(3).map(extractUv).should.eql( [ [ 0, 1 ] ] );

	});

});

describe("verb.core.Vec.signedAngleBetween",function(){
    it('computes correct area for triangular prism', function(){
        verb.core.Vec.signedAngleBetween( [1,0,0], [0,1,0], [0,0,1] ).should.be.approximately( Math.PI / 2, verb.core.Constants.EPSILON );
        verb.core.Vec.signedAngleBetween( [1,0,0], [-1,0,0], [0,0,1] ).should.be.approximately( Math.PI, verb.core.Constants.EPSILON );
        verb.core.Vec.signedAngleBetween( [1,0,0], [0,-1,0], [0,0,1] ).should.be.approximately( 3 * Math.PI / 2, verb.core.Constants.EPSILON );
    });
});

describe("verb.core.Trig.isPointInPlane",function(){
    it('works for a few basic cases', function(){
        verb.core.Trig.isPointInPlane( [0,0,0], new verb.core.Plane( [0,0,0], [1,0,0] ), verb.core.Constants.EPSILON  ).should.be.equal( true );
        verb.core.Trig.isPointInPlane( [0,0,1], new verb.core.Plane( [0,0,0], [1,0,0] ), verb.core.Constants.EPSILON  ).should.be.equal( true );
        verb.core.Trig.isPointInPlane( [1,0,1], new verb.core.Plane( [0,0,0], [1,0,0] ), verb.core.Constants.EPSILON  ).should.be.equal( false );
    });
});

describe("verb.core.AdaptiveRefinementNode.divide",function(){

	it('can be called with options.minDepth', function(){

		var f = new verb.core.AdaptiveRefinementNode(getFlatSurface());

		f.divide({ minDepth : 2 });
		f.children.length.should.be.equal( 2 );
		f.children[0].children.length.should.be.equal( 2 );
		f.children[1].children.length.should.be.equal( 2 );

	});

	it('can be called with no options provided', function(){

		var f = new verb.core.AdaptiveRefinementNode(getFlatSurface());

		f.divide();

		// no division is done
		should.equal( f.children, null);

	});

});

describe("verb.core.Trig.distToSegment",function(){

	it('works for simple case', function(){

		verb.core.Trig.distToSegment([ -10,0,0], [3,3,0], [5,0,0] ).should.be.equal( 3 );

	});

});

describe("verb.core.AdaptiveRefinementNode.evalSrf",function(){

	it('works as expected', function(){

		var f = new verb.core.AdaptiveRefinementNode(getFlatSurface());

		var res = f.evalSrf( 0, 0 );

		vecShouldBe( [0,0,0], res.point );
		vecShouldBe( [0,0,-1], res.normal );

		res = f.evalSrf( 1,0 );

		vecShouldBe( [1,0,0], res.point );
		vecShouldBe( [0,0,-1], res.normal );

		res = f.evalSrf( 1,1 );

		vecShouldBe( [1,1,0], res.point );
		vecShouldBe( [0,0,-1], res.normal );

	});

});

describe("verb.core.AdaptiveRefinementNode.triangulate",function(){

	function getWarpedSurface(){

		var p1 = [0,0,0]
			, p2 = [1,0,0]
			, p3 = [1,1,1]
			, p4 = [0,1,0];

		var p1p4 = verb.core.Vec.mul( 0.5, verb.core.Vec.add( p1, p4 ));
		var p2p3 = verb.core.Vec.mul( 0.5, verb.core.Vec.add( p2, p3 ));
		var p3p4 = verb.core.Vec.mul( 0.5, verb.core.Vec.add( p3, p4 ));
		var p1p2 = verb.core.Vec.mul( 0.5, verb.core.Vec.add( p1, p2 ));
		var p1p4p2p3 = verb.core.Vec.mul( 0.5, verb.core.Vec.add( p1p4, p2p3 ));
		var cpts = [ 	[p1, 		p1p4, 		p4],
						[p1p2, 	    p1p4p2p3, p3p4],
						[p2, 		p2p3, 		p3] ];
		var wts = [[1,1,1], [1,1,1], [1,1,1]];

		cpts = verb.eval.Eval.homogenize2d(cpts, wts);

		return {"knotsU": [0,0,0,1,1,1],
				"knotsV": [0,0,0,1,1,1],
				"controlPoints": cpts,
				"degreeU": 2,
				"degreeV": 2 };

	}

	it('can triangulate a square, planar surface with no options defined', function(){

		var srf = getFlatSurface();

		var f = new verb.core.AdaptiveRefinementNode( srf );
		f.divide();
		var mesh = f.triangulate();

		mesh.faces.should.eql( [ [ 0, 3, 1 ], [ 3, 2, 1 ]  ]);
		mesh.points.should.eql([ [ 0, 0, 0 ], [ 1, 0, 0 ], [ 1, 1, 0 ], [ 0, 1, 0 ] ]);
		mesh.uvs.should.eql([ [ 0, 0 ], [ 1, 0 ], [ 1, 1 ], [ 0, 1 ] ]);
		mesh.normals.should.eql( [ [ 0, 0, -1 ], [ 0, 0, -1 ], [ 0, 0, -1 ], [ 0, 0, -1 ] ] );

	});

	it('can triangulate a warped surface with no options defined', function(){

		var srf = getWarpedSurface();

		var f = new verb.core.AdaptiveRefinementNode( srf );

		f.divide();
		var mesh = f.triangulate();

		mesh.faces.length.should.be.greaterThan( 4 );
		mesh.points.length.should.be.greaterThan( 4 );
		mesh.points.forEach(function(x){ x.length.should.be.equal( 3 ); })
		mesh.points.length.should.be.equal( mesh.normals.length );
		mesh.uvs.length.should.be.equal( mesh.normals.length );

	});

	it('can triangulate a node with children', function(){

		var srf = getFlatSurface();

		var f = new verb.core.AdaptiveRefinementNode( srf );

		f.divide({ minDepth: 1 });
		var mesh = f.triangulate();

		mesh.faces.length.should.be.equal( 4 );
		mesh.points.length.should.be.greaterThan( 4 );
		mesh.points.forEach(function(x){ x.length.should.be.equal( 3 ); })
		mesh.points.length.should.be.equal( mesh.normals.length );
		mesh.uvs.length.should.be.equal( mesh.normals.length );

	});

	it('can triangulate a node with children and un-nested neighbors', function(){

		var srf = getFlatSurface();

		var f = new verb.core.AdaptiveRefinementNode( srf );

		f.divide({ minDepth: 1 });
		f.children[0].divide({ minDepth: 1 });

		var mesh = f.triangulate();

		mesh.faces.length.should.be.greaterThan( 4 );
		mesh.points.length.should.be.greaterThan( 4 );
		mesh.points.forEach(function(x){ x.length.should.be.equal( 3 ); })
		mesh.points.length.should.be.equal( mesh.normals.length );
		mesh.uvs.length.should.be.equal( mesh.normals.length );

	});

	it('can triangulate a node with children and equally nested neighbors', function(){

		var srf = getFlatSurface();

		var f = new verb.core.AdaptiveRefinementNode( srf );

		f.divide({ minDepth: 2 });

		var mesh = f.triangulate();

		mesh.faces.length.should.be.equal( 8 );
		mesh.points.length.should.be.greaterThan( 4 );
		mesh.points.forEach(function(x){ x.length.should.be.equal( 3 ); })
		mesh.points.length.should.be.equal( mesh.normals.length );
		mesh.uvs.length.should.be.equal( mesh.normals.length );

	});

	it('can triangulate a node with children and more nested neighbors', function(){

		var srf = getFlatSurface();

		var f = new verb.core.AdaptiveRefinementNode( srf );

		f.divide({ minDepth: 3 });

		var mesh = f.triangulate();

		mesh.faces.length.should.be.equal( 16 );
		mesh.points.length.should.be.greaterThan( 4 );
		mesh.points.forEach(function(x){ x.length.should.be.equal( 3 ); })
		mesh.points.length.should.be.equal( mesh.normals.length );
		mesh.uvs.length.should.be.equal( mesh.normals.length );

	});

});

describe("verb.core.Mat.solve",function(){

	it('can solve simple case', function(){

		var A = [[1,0.4], [-0.2,1]];
		var At = verb.core.Mat.transpose(A);
		var b = [5,4];

		var x = verb.core.Mat.solve( A, b);

		var s = verb.core.Vec.add(
			verb.core.Vec.mul( x[0], At[0] ),
			verb.core.Vec.mul( x[1], At[1] )
		);

		vecShouldBe( b, s );

	});

	function rand1d(n){

		var row = [];
		for (var j = 0; j < n; j++){
			row.push(Math.random());
		}

		return row;

	}

	function rand2d(n){

		var a = [];
		for (var i = 0; i < n; i++){
			a.push(rand1d(n));
		}

		return a;

	}

	it('can solve complex case', function(){

		var n = 5;
		var A = rand2d(n);
		var At = verb.core.Mat.transpose(A);
		var b = rand1d(n);

		var x = verb.core.Mat.solve( A, b);

		var s = x.reduce(function(acc, v, i){
			return verb.core.Vec.add( acc, verb.core.Vec.mul( v, At[i] ) )
		}, verb.core.Vec.zeros1d(n) );

		vecShouldBe( b, s );

	});
});


describe("verb.core.Mesh.makeMeshAabb",function(){

	it('should return correct result for planar mesh', function(){

		//
		//  0  - 1
		//  |  /  \
		//  2   --  3
		//  |  \   /
		//  4  -  5
		//

		var points = [ [0,0,0], [1,0,0], [0, -1, 0 ], [2, -1, 0], [0, -2, 0], [1, -2, 0] ]
			, tris = [ [0,2,1], [1,2,3], [2,4,5], [2,5,3] ]
			, mesh = new verb.core.MeshData(tris, points, null, null)
			, tri_indices = [0,1,2,3]
			, aabb = verb.core.Mesh.makeMeshAabb(mesh, tri_indices);

		should.equal( 2, aabb.max[0] );
		should.equal( 0, aabb.min[0] );
		should.equal( 0, aabb.max[1] );
		should.equal( -2, aabb.min[1] );
		should.equal( 0, aabb.max[2] );
		should.equal( 0, aabb.min[2] );

	});

	it('makeMeshAabb should return correct result for non-planar mesh', function(){

		//
		//  0  - 1
		//  |  /  \
		//  2   --  3
		//  |  \   /
		//  4  -  5
		//

		var points = [ [0,0,-5], [1,0,0], [0, -1, 0 ], [2, -1, 0], [0, -2, 0], [1, -2, 4] ]
			, tris = [ [0,2,1], [1,2,3], [2,4,5], [2,5,3] ]
			, mesh = new verb.core.MeshData(tris, points, null, null)
			, tri_indices = [0,1,2,3]
			, aabb = verb.core.Mesh.makeMeshAabb(mesh, tri_indices);

		should.equal( 2, aabb.max[0] );
		should.equal( 0, aabb.min[0] );
		should.equal( 0, aabb.max[1] );
		should.equal( -2, aabb.min[1] );
		should.equal( 4, aabb.max[2] );
		should.equal( -5, aabb.min[2] );

	});

});

describe("verb.core.Mesh.getTriangleCentroid",function(){

	it('should return origin for zeroed triangle', function(){

		var points = [[0,0,0],[0,0,0],[0,0,0]]
			, tri = [0,1,2]
			, centroid = verb.core.Mesh.getTriangleCentroid( points, tri );

		should.equal( 0, centroid[0] );
		should.equal( 0, centroid[1] );
		should.equal( 0, centroid[2] );

	});

	it('should return correct value', function(){

		var points = [[5,10,2],[3,-4,5],[-10,-3, 10]]
			, tri = [0,1,2]
			, centroid = verb.core.Mesh.getTriangleCentroid( points, tri );

		should.equal( -2/3, centroid[0] );
		should.equal( 1, centroid[1] );
		should.equal( 17/3, centroid[2] );

	});

});

describe("verb.eval.Eval.getMinCoordOnAxis",function(){

	it('should return correct value', function(){

		var points = [[5,10,2],[3,-4,5],[-10,-3, 10]]
			, tri = [0,1,2]
			, a1 = verb.core.Mesh.getMinCoordOnAxis( points, tri, 0 )
			, a2 = verb.core.Mesh.getMinCoordOnAxis( points, tri, 1 )
			, a3 = verb.core.Mesh.getMinCoordOnAxis( points, tri, 2 );

		should.equal( -10, a1 );
		should.equal( -4, a2 );
		should.equal( 2, a3 );

	});
});

describe("verb.core.Mesh.sortTrianglesOnLongestAxis",function(){

	it('should return correct result with y axis regular array', function(){

		//
		//  0  -  1
		//  | 0 / 3 \
		//  2   --  3
		//  | 1 \ 2 /
		//  4  -  5
		//

		var points = [ [0,0,0], [1,-0.2,0], [0, -1, 0 ], [1, -1.2, 0], [0, -2.2, 0], [1, -2, 0]]
			, tris = [[0,2,1], [2,4,5], [2,5,3], [1,2,3]]
			, mesh = new verb.core.MeshData(tris, points, null, null)
			, tri_indices = [0,1,2,3]
			, aabb = verb.core.Mesh.makeMeshAabb(mesh, tri_indices)
			, sort_tri_indices = verb.core.Mesh.sortTrianglesOnLongestAxis( aabb, mesh, tri_indices );

		sort_tri_indices.should.eql([ 1, 2, 3, 0 ])

	});

	it('should return correct result', function(){

		var points = [ [0,10,0], [0,5,0], [0, 0, 0 ], [0, -5, 0], [0, -2, 0], [1, -2.2, 0]]
			, tris = [[0,1,4], [2,3,4], [1,2,4]]
			, mesh = new verb.core.MeshData(tris, points, null, null)
			, tri_indices = [0,1,2]
			, aabb = verb.core.Mesh.makeMeshAabb(mesh, tri_indices)
			, sort_tri_indices = verb.core.Mesh.sortTrianglesOnLongestAxis( aabb, mesh, tri_indices );

		sort_tri_indices.should.eql([ 1, 0, 2 ])
	});

});

describe("verb.core.KdTree",function(){

	var pts = [
		new verb.core.KdPoint( [0,1,1], "a" ),
		new verb.core.KdPoint( [0,2,1], "b" ),
		new verb.core.KdPoint( [2,2,1], "c" )
	];

	it('gives correct results when requesting a single node', function(){

		var tree = new verb.core.KdTree(pts, verb.core.Vec.distSquared );
		var res = tree.nearest( [0,2.1,1], 1, 1.0 );

		res[0].item0.point.should.eql(pts[1].point);

	});

	it('gives correct results for multiple nodes', function(){

		var tree = new verb.core.KdTree(pts, verb.core.Vec.distSquared );
		var res1 = tree.nearest( [0,1.1,1], 2, 1.0 );

		res1[1].item0.point.should.eql(pts[0].point, 1.0);
		res1[0].item0.point.should.eql(pts[1].point);

	});

});

describe("verb.core.Mesh.triangleUVFromPoint",function(){

	it('is correct for a basic example', function(){

		var uvs = [ [0,0], [1,0], [1,1] ];
		var pts = [ [0,0,0], [1,0,0], [1,1,0] ];
		var tris = [[ 0, 1, 2 ]];
		var pt = [0.5, 0.25, 0];
		var mesh = new verb.core.MeshData(tris, pts, null, uvs);

		var uv = verb.core.Mesh.triangleUVFromPoint( mesh, 0, pt );

		uv[0].should.be.approximately( pt[0], verb.core.Constants.TOLERANCE );
		uv[1].should.be.approximately( pt[1], verb.core.Constants.TOLERANCE );

	});
});

describe("verb.core.Vec.sortedSetUnion",function(){
 	it('can merge two empty arrays', function(){
		verb.core.Vec.sortedSetUnion([],[]).should.be.eql([]);
 	});

	it('can merge array and empty array', function(){
		verb.core.Vec.sortedSetUnion([],[1,2]).should.be.eql([1,2]);
		verb.core.Vec.sortedSetUnion([1.3, 2],[]).should.be.eql([1.3,2]);
	});

	it('can merge two identical arrays', function(){
		verb.core.Vec.sortedSetUnion([1,2],[1,2]).should.be.eql([1,2]);
	});

	it('can merge two differing arrays', function(){
		verb.core.Vec.sortedSetUnion([1,2,3],[1,2,5,6]).should.be.eql([1,2,3,5,6]);
		verb.core.Vec.sortedSetUnion([1,3],[1,2,5,6]).should.be.eql([1,2,3,5,6]);
		verb.core.Vec.sortedSetUnion([1,27],[1,2,5,6]).should.be.eql([1,2,5,6,27]);
		verb.core.Vec.sortedSetUnion([1,1.1,2,5,6,13],[1,2,5,6]).should.be.eql([1,1.1,2,5,6,13]);
	});
 });

describe("verb.core.Vec.sortedSetSub",function(){

  	it('can handle two empty arrays', function(){
 		verb.core.Vec.sortedSetSub([],[]).should.be.eql([]);
  	});

 	it('can subtract empty array from non-empty array', function(){
 		verb.core.Vec.sortedSetSub([1,2],[]).should.be.eql([1,2]);
 	});

 	it('can subtract two identical arrays', function(){
		verb.core.Vec.sortedSetSub([1,2],[1,2]).should.be.eql([]);
 	});

 	it('can subtract two non-equal arrays', function(){
		verb.core.Vec.sortedSetSub([1,2],[1]).should.be.eql([2]);
		verb.core.Vec.sortedSetSub([1,2,3],[1,3]).should.be.eql([2]);
		verb.core.Vec.sortedSetSub([-1,1,2,3],[1,3]).should.be.eql([-1,2]);
		verb.core.Vec.sortedSetSub([0,0,0,0,0.5,1,1,1,1],[0,0,0,0,0.5,1,1,1,1]).should.be.eql([]);
 	});

  });


describe("verb.core.Mat.mult",function(){
    it('works for a few basic cases', function(){
        var mat = [[1,2], [2,3]];

        verb.core.Mat.mult( verb.core.Mat.identity(2), mat ).should.eql( mat );
        verb.core.Mat.mult( mat, verb.core.Mat.identity(2) ).should.eql( mat );
    });
});

