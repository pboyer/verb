var should = require('should')
	, verb = require('../build/js/verb.js');

// necessary for multi-threading
verb.exe.WorkerPool.basePath = process.cwd() + "/build/js/";

console.log(verb.exe.WorkerPool.basePath);

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

function sameCurve( crvd0, crvd1 ){

	var u0 = crvd0.knots[0];
	var u1 = crvd0.knots[crvd0.knots.length-1];

	var u01 = crvd1.knots[0];
	var u11 = crvd1.knots[crvd1.knots.length-1];

	u0.should.be.approximately(u01, 1e-10);
	u1.should.be.approximately(u11, 1e-10);

	var numSamples = 100;
	var step = (u1 - u0) / (numSamples-1);

	for (var i  = 0; i < numSamples; i++ ){
		var p0 = verb.eval.Eval.rationalCurvePoint( crvd0, u0 + step*i );
		var p1 = verb.eval.Eval.rationalCurvePoint( crvd1, u0 + step*i );

		var dist = verb.core.Vec.dist( p0, p1 );
		dist.should.be.lessThan( verb.core.Constants.TOLERANCE );
	}
}

describe("verb.geom.NurbsCurve.lengthAtParam",function(){

	var degree = 3
		, knots = [0,0,0,0,0.5,1,1,1,1]
		, controlPoints = [ [0,0,0], [1,0,0], [2,0,0], [3,0,0], [4,0,0] ]
		, weights = [ 1, 1, 1, 1, 1 ]
		, pt = [1,0.2,0.1];

	var crv = verb.geom.NurbsCurve.byKnotsControlPointsWeights( degree, knots, controlPoints, weights );

	it('is correct for basic case', function(){
		var res = crv.lengthAtParam( 1 );
		res.should.be.approximately(4, 1e-3 )
	});

	it('is correct for basic case async', function(done){
		crv.lengthAtParamAsync( 1 ).then(function(res){
			res.should.be.approximately(4, 1e-3 );
			done();
		});
	});
});

describe("verb.geom.NurbsCurve.derivatives",function(){

	var degree = 3
		, knots = [0,0,0,0,0.5,1,1,1,1]
		, controlPoints = [ [0,0,0], [1,0,0], [2,0,0], [3,0,0], [4,0,0] ]
		, weights = [ 1, 1, 1, 1, 1 ]
		, pt = [1,0.2,0];

	var crv = verb.geom.NurbsCurve.byKnotsControlPointsWeights( degree, knots, controlPoints, weights );

	it('returns the derivatives for a straight curve', function(){
		var p = crv.derivatives( 0.5 );
		vecShouldBe( [2,0,0], p[0], 1e-3 );
		vecShouldBe( [3,0,0], p[1], 1e-3 );
	});

	it('returns the derivatives for a straight curve async', function(done){
		crv.derivativesAsync( 0.5 ).then(function(p){
			vecShouldBe( [2,0,0], p[0], 1e-3 );
			vecShouldBe( [3,0,0], p[1], 1e-3 );
			done();
		});
	});
});

describe("verb.geom.NurbsCurve.tangent",function(){

	var degree = 3
		, knots = [0,0,0,0,0.5,1,1,1,1]
		, controlPoints = [ [0,0,0], [1,0,0], [2,0,0], [3,0,0], [4,0,0] ]
		, weights = [ 1, 1, 1, 1, 1 ]
		, pt = [1,0.2,0];

	var crv = verb.geom.NurbsCurve.byKnotsControlPointsWeights( degree, knots, controlPoints, weights );

	it('can get the tangent for a straight curve', function(){
		var p = crv.tangent( 0.5 );
		vecShouldBe( [3,0,0], p, 1e-3 );
	});

	it('can get the tangent for a straight curve async', function(done){
		crv.tangentAsync( 0.5 ).then(function(p){
			vecShouldBe( [3,0,0], p, 1e-3 );
			done();
		});
	});
});

describe("verb.geom.NurbsCurve.paramAtLength",function(){

	var degree = 3
		, knots = [0,0,0,0,0.5,1,1,1,1]
		, controlPoints = [ [0,0,0], [1,0,0], [2,0,0], [3,0,0], [4,0,0] ]
		, weights = [ 1, 1, 1, 1, 1 ]
		, pt = [1,0.2,0];

	var crv = verb.geom.NurbsCurve.byKnotsControlPointsWeights( degree, knots, controlPoints, weights );

	it('can get closest point to straight curve', function(){
		var res = crv.paramAtLength( 2 );
		var p = crv.point( res );
		vecShouldBe( [2,0,0], p, 1e-3 );
	});

	it('can get closest point to straight curve async', function(done){
		crv.paramAtLengthAsync( 2 ).then(function(res){
			var p = crv.point( res );
			vecShouldBe( [2,0,0], p, 1e-3 );
			done();
		});
	});
});

describe("verb.geom.NurbsCurve.divideByEqualArcLength",function(){

	var degree = 3
		, knots = [0,0,0,0,0.5,1,1,1,1]
		, controlPoints = [ [0,0,0], [1,0,0], [2,0,0], [3,0,0], [4,0,0] ]
		, weights = [ 1, 1, 1, 1, 1 ]
		, divs = 10
		, d = 4 / divs;

	var crv = verb.geom.NurbsCurve.byKnotsControlPointsWeights( degree, knots, controlPoints, weights );

	it('can divide straight curve', function(){

		var res = crv.divideByEqualArcLength( divs );

		var tol = 1e-3;

		var s = 0;
		res.forEach(function(u){

			var pt = crv.point( u.u );
			u.len.should.be.approximately( s, tol );

			pt[0].should.be.approximately( s, tol );
			s += d;

		});

	});

	it('can divide straight curve async', function(done){

		crv.divideByEqualArcLengthAsync( divs ).then(function(res){

			var tol = 1e-3;

			var s = 0;
			res.forEach(function(u){

				var pt = crv.point( u.u );
				u.len.should.be.approximately( s, tol );

				pt[0].should.be.approximately( s, tol );
				s += d;

			});

			done();

		})

	});

});

describe("verb.geom.NurbsCurve.divideByArcLength",function(){

	var degree = 3
		, knots = [0,0,0,0,0.5,1,1,1,1]
		, controlPoints = [ [0,0,0], [1,0,0], [2,0,0], [3,0,0], [4,0,0] ]
		, weights = [ 1, 1, 1, 1, 1 ]
		, divs = 10
		, d = 4 / divs;

	var crv = verb.geom.NurbsCurve.byKnotsControlPointsWeights( degree, knots, controlPoints, weights );
	var tol = 1e-3;

	it('can divide straight curve', function(){

		var res = crv.divideByArcLength( d );

		var s = 0;
		res.forEach(function(u){

			var pt = crv.point( u.u );
			u.len.should.be.approximately( s, tol );

			pt[0].should.be.approximately( s, tol );
			s += d;

		});

	});

	it('can divide straight curve async', function(){

		crv.divideByArcLengthAsync( d ).then(function(res){

			var s = 0;
			res.forEach(function(u){

				var pt = crv.point( u.u );
				u.len.should.be.approximately( s, tol );

				pt[0].should.be.approximately( s, tol );
				s += d;

			});

		})

	});

});

describe("verb.geom.NurbsCurve.closestParam",function(){

	var degree = 3
		, knots = [0,0,0,0,0.5,1,1,1,1]
		, controlPoints = [ [0,0,0], [1,0,0], [2,0,0], [3,0,0], [4,0,0] ]
		, weights = [ 1, 1, 1, 1, 1 ];

	var crv = verb.geom.NurbsCurve.byKnotsControlPointsWeights( degree, knots, controlPoints, weights );

	it('can get point on straight curve', function(){

		var pt = [1,0,0];
		var res = crv.closestParam( pt );
		var p = crv.point( res );

		vecShouldBe( [1,0,0], p, 1e-3 );

	});

	it('can get closest point to straight curve', function(){

		var pt = [1,1,0];
		var res = crv.closestParam(pt);
		var p = crv.point( res );

		vecShouldBe( [1,0,0], p, 1e-3 );

	});

	it('can get closest point to straight curve async', function(done){

		var pt = [1,1,0];
		crv.closestParamAsync(pt).then(function(res){
			var p = crv.point( res );

			vecShouldBe( [1,0,0], p, 1e-3 );
			done();
		});

	});

	it('can get point on straight curve of degree 1', function() {

		var degree = 1
			, knots = [0, 0, 1, 1]
			, controlPoints = [[0,0,0], [10,0,0]]
			, weights = [1, 1];

		var crv = verb.geom.NurbsCurve.byKnotsControlPointsWeights(degree, knots, controlPoints, weights);

		var pt = [5,0,0];
		var res = crv.closestParam( pt );
		var p = crv.point( res );

		vecShouldBe([5,0,0], p, 1e-3);
	});
});

describe("verb.geom.NurbsCurve.split",function(){

	var degree = 3
		, knots = [ 0, 0, 0, 0, 1, 2, 3, 4, 5, 5, 5, 5 ];

	var controlPoints = [];
	var weights = [];
	for (var i = 0; i < 8; i++) {
		weights.push(1);
		controlPoints.push([i, 0, 0]);
	}

	var crv = verb.geom.NurbsCurve.byKnotsControlPointsWeights( degree, knots, controlPoints, weights );

	function cubicSplitAsync(u, done){

		var res = crv.splitAsync(0.5);
		check(u, res);

	}

	function check(u, res){

		var crv0 = res[0];
		var crv1 = res[1];

		// a point evaluated on each curve is the same
		var p0 = crv0.point(crv0.domain().max);
		var p1 = crv1.point(crv1.domain().min);

		p0[0].should.be.approximately(p1[0], verb.core.Constants.TOLERANCE);
		p0[1].should.be.approximately(p1[1], verb.core.Constants.TOLERANCE);
		p0[2].should.be.approximately(p1[2], verb.core.Constants.TOLERANCE);

	}

	it('returns expected results when splitting curve', function(){

		var res = crv.split( 2.5 );
		check(2.5, res);

	});

	it('returns expected results when splitting curve async', function(done){
		crv.splitAsync( 2.5 ).then(function(res){
			check(2.5, res);
			done();
		});
	});

});

describe("verb.geom.NurbsCurve.transform",function(){

	var degree = 3
		, knots = [0,0,0,0,0.5,1,1,1,1]
		, controlPoints = [ [0,0,0], [1,0,0], [2,0,0], [3,0,0], [4,0,0] ]
		, weights = [ 1, 1, 1, 1, 1 ];

	var t = [ [ 1, 0, 0, 5 ],
			  [ 0, 1, 0, 2 ],
			  [ 0, 0, 1, -1],
			  [ 0, 0, 0, 1 ] ];

	var crv = verb.geom.NurbsCurve.byKnotsControlPointsWeights( degree, knots, controlPoints, weights );

	it('works for basic case', function(){
		var ta = crv.transform( t );
		ta.point( 0.5 ).should.be.eql([2 + 5, 2, -1 ]);
	});

	it('works for basic case async', function(done){
		crv.transformAsync( t ).then(function(ta){
			ta.point( 0.5 ).should.be.eql([2 + 5, 2, -1 ]);
			done();
		});
	});
});

describe("verb.geom.Arc.constructor",function(){

	it('has correct properties', function(){

		var arc = new verb.geom.Arc([0,0,0], [1,0,0], [0,1,0], 5, 0, Math.PI/ 2 );

		should.exist( arc );

		arc.radius().should.be.equal(5);
		arc.center().should.eql([0,0,0]);
		arc.xaxis().should.eql([1,0,0]);
		arc.yaxis().should.eql([0,1,0]);
		arc.minAngle().should.be.equal(0);
		arc.maxAngle().should.be.equal(Math.PI/2);

	});

});

describe("verb.geom.Arc.point",function(){

	it('returns expected results', function(){

		var arc = new verb.geom.Arc([0,0,1], [1,0,0], [0,1,0], 1, 0, Math.PI/ 2 );
		var p1 = arc.point(0);
		var p2 = arc.point(0.5);
		var p3 = arc.point(1);

		p1.should.be.instanceof(Array).and.have.lengthOf(3);
		p1[0].should.be.approximately( 1, 0.001 );
		p1[1].should.be.approximately( 0, 0.001 );
		p1[2].should.be.approximately( 1, 0.001 );

		p2.should.be.instanceof(Array).and.have.lengthOf(3);
		p2[0].should.be.approximately( Math.sqrt(2)/2, 0.001 );
		p2[1].should.be.approximately( Math.sqrt(2)/2, 0.001 );
		p2[2].should.be.approximately( 1, 0.001 );

		p3.should.be.instanceof(Array).and.have.lengthOf(3);
		p3[0].should.be.approximately( 0, 0.001 );
		p3[1].should.be.approximately( 1, 0.001 );
		p3[2].should.be.approximately( 1, 0.001 );
	});

	it('creates the expected result when given a callback', function(done){

		var arc = new verb.geom.Arc([0,0,1], [1,0,0], [0,1,0], 1, 0, Math.PI/ 2 );

		arc.pointAsync(0.5).then(function(res){

			res.should.be.instanceof(Array).and.have.lengthOf(3);
			res[0].should.be.approximately( Math.sqrt(2)/2, 0.001 );
			res[1].should.be.approximately( Math.sqrt(2)/2, 0.001 );
			res[2].should.be.approximately( 1, 0.001 );

			done();
		});

	});

});

describe("verb.geom.Arc.tessellate",function(){

	it('should return a list of vertices', function(){

		var arc = new verb.geom.Arc([0,0,1], [1,0,0], [0,1,0], 1, 0, Math.PI/ 2 );
		var pts = arc.tessellate();

		pts.length.should.be.greaterThan(2);

		pts.map( function(e){  e.length.should.be.equal(3); });

	});

});

describe("new verb.geom.Line",function(){

	it('can create an instance', function(){

		var p1 = [0,0,1]
			, p2 = [1,0,0];

		var c = new verb.geom.Line( p1, p2 );

		should.exist(c);

	});

});

describe("verb.geom.Line.point",function(){

	it('evaluates correctly', function(){

		var p1 = [0,0,0]
			, p2 = [1,1,1];

		var c = new verb.geom.Line( p1, p2 );

		should.exist(c);

		var p = c.point(0.5);

		p[0].should.be.approximately(0.5, verb.core.Constants.EPSILON );
		p[1].should.be.approximately(0.5, verb.core.Constants.EPSILON );
		p[2].should.be.approximately(0.5, verb.core.Constants.EPSILON );

	});

});

describe("verb.geom.Line.derivatives",function(){

	it('gives nice result', function(){

		var p1 = [0,0,0]
			, p2 = [1,1,1];

		var c = new verb.geom.Line( p1, p2 );

		should.exist(c);

		var p = c.derivatives(0.5, 1);

		p[0].should.eql([0.5,0.5,0.5]);
		p[1].should.eql([1,1,1]);

	});

});

describe("verb.geom.Line.tessellate",function(){

	it('gives mesh result', function(){

		var p1 = [0,0,0]
			, p2 = [1,1,1];

		var c = new verb.geom.Line( p1, p2 );

		should.exist(c);

		var p = c.tessellate();

		p.length.should.be.equal(2);
		p[0].length.should.be.equal(3);
		p[1].length.should.be.equal(3);

	});

});

describe("verb.geom.BezierCurve.constructor",function(){

	it('can create an instance', function(){

		var p1 = [0,0,0]
			, p2 = [1,0,1]
			, p3 = [2,0,-1]
			, p4 = [3,0,0];

		var c = new verb.geom.BezierCurve( [p1, p2, p3, p4] );

		should.exist(c);

	});

});

describe("verb.geom.BezierCurve.point",function(){

	it('evaluates correctly', function(){

		var p1 = [0,0,0]
			, p2 = [1,0,1]
			, p3 = [2,0,-1]
			, p4 = [3,0,0];

		var c = new verb.geom.BezierCurve( [p1, p2, p3, p4] );

		should.exist(c);

		var p = c.point(0.5);

		p.should.eql([1.5,0,0]);

	});

});

describe("verb.geom.BezierCurve.derivatives",function(){

	it('gives nice result', function(){

		var p1 = [0,0,0]
			, p2 = [1,0,1]
			, p3 = [2,0,-1]
			, p4 = [3,0,0];

		var c = new verb.geom.BezierCurve( [p1, p2, p3, p4] );

		should.exist(c);

		var p = c.derivatives(0.5, 1);

		p[0].should.eql([1.5,0,0]);
		p[1].should.eql([3, 0, -1.5]);

	});

});

describe("verb.geom.BezierCurve.tessellate",function(){

	it('gives mesh result', function(){

		var p1 = [0,0,0]
			, p2 = [1,0,1]
			, p3 = [2,0,-1]
			, p4 = [3,0,0];

		var c = new verb.geom.BezierCurve( [p1, p2, p3, p4] );

		should.exist(c);

		var pts = c.tessellate();

		pts.length.should.be.greaterThan(2);

		pts.map( function(e){  e.length.should.be.equal(3); });

	});

});

describe("verb.geom.Circle.constructor",function(){

	it('can create an instance', function(){

		var c = new verb.geom.Circle([0,0,0], [1,0,0], [0,1,0], 5);

		should.exist(c);

	});

});

describe("verb.geom.Circle.point",function(){

	it('evaluates correctly', function(){

		var c = new verb.geom.Circle([0,0,0], [1,0,0], [0,1,0], 5);

		should.exist(c);

		var p = c.point(0.5);

		p[0].should.be.approximately(-5, verb.core.Constants.TOLERANCE );
		p[1].should.be.approximately(0, verb.core.Constants.TOLERANCE );
		p[2].should.be.approximately(0, verb.core.Constants.TOLERANCE );

	});

});

describe("verb.geom.Circle.derivatives",function(){

	it('gives correct result', function(){

		var c = new verb.geom.Circle([0,0,0], [1,0,0], [0,1,0], 5);

		should.exist(c);

		var p = c.derivatives(0.5, 1);

		p[0][0].should.be.approximately(-5, verb.core.Constants.TOLERANCE );
		p[0][1].should.be.approximately(0, verb.core.Constants.TOLERANCE );
		p[0][2].should.be.approximately(0, verb.core.Constants.TOLERANCE );

		// normalize the derivative
		p[1] = verb.core.Vec.div( p[1], verb.core.Vec.norm(p[1]) );

		p[1][0].should.be.approximately(0, verb.core.Constants.TOLERANCE );
		p[1][1].should.be.approximately(-1, verb.core.Constants.TOLERANCE );
		p[1][2].should.be.approximately(0, verb.core.Constants.TOLERANCE );

	});

});

describe("verb.geom.Circle.tessellate",function(){

	it('gives correct result', function(){

		var c = new verb.geom.Circle([0,0,0], [1,0,0], [0,1,0], 5);

		should.exist(c);

		var pts = c.tessellate();

		pts.length.should.be.greaterThan(2);
		pts.map( function(e){  e.length.should.be.equal(3); });

	});

});

describe("verb.geom.Ellipse.constructor",function(){

	it('can create an instance', function(){

		var c = new verb.geom.Ellipse([0,0,0], [5,0,0], [0,10,0]);

		should.exist(c);

	});

});

describe("verb.geom.Ellipse.point",function(){

	it('evaluates correctly', function(){

		var c = new verb.geom.Ellipse([0,0,0], [5,0,0], [0,10,0]);

		should.exist(c);

		var p = c.point(0.5);

		p[0].should.be.approximately(-5, verb.core.Constants.TOLERANCE );
		p[1].should.be.approximately(0, verb.core.Constants.TOLERANCE );
		p[2].should.be.approximately(0, verb.core.Constants.TOLERANCE );

		var p = c.point(0.25);

		p[0].should.be.approximately(0, verb.core.Constants.TOLERANCE );
		p[1].should.be.approximately(10, verb.core.Constants.TOLERANCE );
		p[2].should.be.approximately(0, verb.core.Constants.TOLERANCE );

	});

});

describe("verb.geom.Ellipse.derivatives",function(){

	it('gives correct result', function(){

		var c = new verb.geom.Ellipse([0,0,0], [5,0,0], [0,10,0]);

		should.exist(c);

		var p = c.derivatives(0.5, 1);

		p[0][0].should.be.approximately(-5, verb.core.Constants.TOLERANCE );
		p[0][1].should.be.approximately(0, verb.core.Constants.TOLERANCE );
		p[0][2].should.be.approximately(0, verb.core.Constants.TOLERANCE );

		// normalize the derivative
		p[1] = verb.core.Vec.div( p[1], verb.core.Vec.norm(p[1]) );

		p[1][0].should.be.approximately(0, verb.core.Constants.TOLERANCE );
		p[1][1].should.be.approximately(-1, verb.core.Constants.TOLERANCE );
		p[1][2].should.be.approximately(0, verb.core.Constants.TOLERANCE );

		p = c.derivatives(0.25, 1);

		p[0][0].should.be.approximately(0, verb.core.Constants.TOLERANCE );
		p[0][1].should.be.approximately(10, verb.core.Constants.TOLERANCE );
		p[0][2].should.be.approximately(0, verb.core.Constants.TOLERANCE );

		// normalize the derivative
		p[1] = verb.core.Vec.div( p[1], verb.core.Vec.norm(p[1]) );

		p[1][0].should.be.approximately(-1, verb.core.Constants.TOLERANCE );
		p[1][1].should.be.approximately(0, verb.core.Constants.TOLERANCE );
		p[1][2].should.be.approximately(0, verb.core.Constants.TOLERANCE );

	});

});

describe("verb.geom.Ellipse.tessellate",function(){

	it('gives correct result', function(){

		var c = new verb.geom.Ellipse([0,0,0], [5,0,0], [0,10,0]);

		should.exist(c);

		var pts = c.tessellate();

		pts.length.should.be.greaterThan(2);
		pts.map( function(e){  e.length.should.be.equal(3); });

	});

});

describe("verb.geom.EllipseArc.constructor",function(){

	it('can create an instance', function(){

		var c = new verb.geom.EllipseArc([0,0,0], [1,0,0], [0,1,0], 0, Math.PI);

		should.exist(c);

	});

});

describe("verb.geom.EllipseArc.point",function(){

	it('evaluates correctly', function(){

		var c = new verb.geom.EllipseArc([0,0,0], [1,0,0], [0,10,0], 0, Math.PI);

		should.exist(c);

		var p = c.point(0.5);

		p[0].should.be.approximately(0, verb.core.Constants.TOLERANCE );
		p[1].should.be.approximately(10, verb.core.Constants.TOLERANCE );
		p[2].should.be.approximately(0, verb.core.Constants.TOLERANCE );

	});

});

describe("verb.geom.EllipseArc.derivatives",function(){

	it('gives correct result', function(){

		var c = new verb.geom.EllipseArc([0,0,0], [1,0,0], [0,10,0], 0, Math.PI);

		should.exist(c);

		var p = c.derivatives(0.5, 1);

		p[0][0].should.be.approximately(0, verb.core.Constants.TOLERANCE );
		p[0][1].should.be.approximately(10, verb.core.Constants.TOLERANCE );
		p[0][2].should.be.approximately(0, verb.core.Constants.TOLERANCE );

		// normalize the derivative
		p[1] = verb.core.Vec.div( p[1], verb.core.Vec.norm(p[1]) );

		p[1][0].should.be.approximately(-1, verb.core.Constants.TOLERANCE );
		p[1][1].should.be.approximately(0, verb.core.Constants.TOLERANCE );
		p[1][2].should.be.approximately(0, verb.core.Constants.TOLERANCE );

	});

});

describe("verb.geom.EllipseArc.tessellate",function(){

	it('gives correct result', function(){

		var c = new verb.geom.EllipseArc([0,0,0], [1,0,0], [0,10,0], 0, Math.PI);

		should.exist(c);

		var pts = c.tessellate();

		pts.length.should.be.greaterThan(2);
		pts.map( function(e){  e.length.should.be.equal(3); });

	});

});

describe("verb.geom.NurbsSurface.byKnotsControlPointsWeights",function(){

	var degreeU = 3
		, degreeV = 3
		, knotsU = [0, 0, 0, 0, 1, 1, 1, 1]
		, knotsV =	[0, 0, 0, 0, 1, 1, 1, 1]
		, controlPoints = [ 	[ [0, 0, 0], 	[10, 0, 0], 	[20, 0, 0], 	[30, 0, 0] 		],
								[ [0, -10, 0], 	[10, -10, 0], 	[20, -10, 0], 	[30, -10, 0] 	],
								[ [0, -20, 0], 	[10, -20, 0], 	[20, -20, 0], 	[30, -20, 0] 	],
								[ [0, -30, 0], 	[10, -30, 0], 	[20, -30, 0], 	[30, -30, 0] 	] ]
		, weights = [ 	[ 1, 1, 1, 1 ],
						[ 1, 1, 1, 1 ],
						[ 1, 1, 1, 1 ],
						[ 1, 1, 1, 1 ] ]
		, surface = verb.geom.NurbsSurface.byKnotsControlPointsWeights( degreeU, degreeV, knotsU, knotsV, controlPoints, weights );

	it('has expected properties', function(){

		surface.degreeU().should.be.equal( 3 );
		surface.degreeV().should.be.equal( 3 );
		surface.knotsU().should.be.eql( knotsU );
		surface.knotsV().should.be.eql( knotsV );
		surface.controlPoints().should.be.eql( controlPoints );
		surface.weights().should.be.eql( weights );

	});

});

describe("verb.geom.NurbsSurface.domainU",function(){

	var degreeU = 3
		, degreeV = 3
		, knotsU = [0, 0, 0, 0, 1, 1, 1, 1]
		, knotsV =	[0, 0, 0, 0, 1, 1, 1, 1]
		, controlPoints = [ 	[ [0, 0, 0], 	[10, 0, 0], 	[20, 0, 0], 	[30, 0, 0] 		],
								[ [0, -10, 0], 	[10, -10, 0], 	[20, -10, 0], 	[30, -10, 0] 	],
								[ [0, -20, 0], 	[10, -20, 0], 	[20, -20, 0], 	[30, -20, 0] 	],
								[ [0, -30, 0], 	[10, -30, 0], 	[20, -30, 0], 	[30, -30, 0] 	] ]
		, weights = [ 	[ 1, 1, 1, 1 ],
						[ 1, 1, 1, 1 ],
						[ 1, 1, 1, 1 ],
						[ 1, 1, 1, 1 ] ]
		, surface = verb.geom.NurbsSurface.byKnotsControlPointsWeights( degreeU, degreeV, knotsU, knotsV, controlPoints, weights );

	it('is correct for basic case', function(){
		var d = surface.domainU();

		d.min.should.be.equal( 0 );
		d.max.should.be.equal( 1 );
	});
});

describe("verb.geom.NurbsSurface.domainV",function(){

	var degreeU = 3
		, degreeV = 3
		, knotsU = [0, 0, 0, 0, 1, 1, 1, 1]
		, knotsV =	[0, 0, 0, 0, 2, 2, 2, 2]
		, controlPoints = [ 	[ [0, 0, 0], 	[10, 0, 0], 	[20, 0, 0], 	[30, 0, 0] 		],
								[ [0, -10, 0], 	[10, -10, 0], 	[20, -10, 0], 	[30, -10, 0] 	],
								[ [0, -20, 0], 	[10, -20, 0], 	[20, -20, 0], 	[30, -20, 0] 	],
								[ [0, -30, 0], 	[10, -30, 0], 	[20, -30, 0], 	[30, -30, 0] 	] ]
		, weights = [ 	[ 1, 1, 1, 1 ],
						[ 1, 1, 1, 1 ],
						[ 1, 1, 1, 1 ],
						[ 1, 1, 1, 1 ] ]
		, surface = verb.geom.NurbsSurface.byKnotsControlPointsWeights( degreeU, degreeV, knotsU, knotsV, controlPoints, weights );

	it('is correct for basic case', function(){
		var d = surface.domainU();

		d.min.should.be.equal( 0 );
		d.max.should.be.equal( 1 );
	});
});

describe("verb.geom.NurbsSurface.point",function(){

	var degreeU = 3
		, degreeV = 3
		, knotsU = [0, 0, 0, 0, 1, 1, 1, 1]
		, knotsV =	[0, 0, 0, 0, 1, 1, 1, 1]
		, controlPoints = [ 	[ [0, 0, 0], 	[10, 0, 0], 	[20, 0, 0], 	[30, 0, 0] 		],
								[ [0, -10, 0], 	[10, -10, 0], 	[20, -10, 0], 	[30, -10, 0] 	],
								[ [0, -20, 0], 	[10, -20, 0], 	[20, -20, 0], 	[30, -20, 0] 	],
								[ [0, -30, 0], 	[10, -30, 0], 	[20, -30, 0], 	[30, -30, 0] 	] ]
		, weights = [ 	[ 1, 1, 1, 1 ],
						[ 1, 1, 1, 1 ],
						[ 1, 1, 1, 1 ],
						[ 1, 1, 1, 1 ] ]
		, surface = verb.geom.NurbsSurface.byKnotsControlPointsWeights( degreeU, degreeV, knotsU, knotsV, controlPoints, weights );

	it('is correct for basic case', function(){

		vecShouldBe( [15, -15, 0], surface.point(0.5,0.5) );

	});

	it('is correct for basic case async', function(done){

		surface.pointAsync(0.5,0.5).then(function(x){
			vecShouldBe( [15, -15, 0], x );
			done();
		});

	});

});

describe("verb.geom.NurbsSurface.normal",function(){

	var degreeU = 3
		, degreeV = 3
		, knotsU = [0, 0, 0, 0, 1, 1, 1, 1]
		, knotsV =	[0, 0, 0, 0, 1, 1, 1, 1]
		, controlPoints = [ 	[ [0, 0, 0], 	[10, 0, 0], 	[20, 0, 0], 	[30, 0, 0] 		],
								[ [0, -10, 0], 	[10, -10, 0], 	[20, -10, 0], 	[30, -10, 0] 	],
								[ [0, -20, 0], 	[10, -20, 0], 	[20, -20, 0], 	[30, -20, 0] 	],
								[ [0, -30, 0], 	[10, -30, 0], 	[20, -30, 0], 	[30, -30, 0] 	] ]
		, weights = [ 	[ 1, 1, 1, 1 ],
						[ 1, 1, 1, 1 ],
						[ 1, 1, 1, 1 ],
						[ 1, 1, 1, 1 ] ]
		, surface = verb.geom.NurbsSurface.byKnotsControlPointsWeights( degreeU, degreeV, knotsU, knotsV, controlPoints, weights );

	it('is correct for basic case', function(){
		vecShouldBe( [0, 0, 900], surface.normal(0.5,0.5) );
	});

	it('is correct for basic case async', function(done){

		surface.normalAsync(0.5,0.5).then(function(x){
			vecShouldBe( [0, 0, 900], x );
			done();
		});

	});

});

describe("verb.geom.NurbsSurface.derivatives",function(){

	var degreeU = 3
		, degreeV = 3
		, knotsU = [0, 0, 0, 0, 1, 1, 1, 1]
		, knotsV =	[0, 0, 0, 0, 1, 1, 1, 1]
		, controlPoints = [ 	[ [0, 0, 0], 	[10, 0, 0], 	[20, 0, 0], 	[30, 0, 0] 		],
								[ [0, -10, 0], 	[10, -10, 0], 	[20, -10, 0], 	[30, -10, 0] 	],
								[ [0, -20, 0], 	[10, -20, 0], 	[20, -20, 0], 	[30, -20, 0] 	],
								[ [0, -30, 0], 	[10, -30, 0], 	[20, -30, 0], 	[30, -30, 0] 	] ]
		, weights = [ 	[ 1, 1, 1, 1 ],
						[ 1, 1, 1, 1 ],
						[ 1, 1, 1, 1 ],
						[ 1, 1, 1, 1 ] ]
		, surface = verb.geom.NurbsSurface.byKnotsControlPointsWeights( degreeU, degreeV, knotsU, knotsV, controlPoints, weights );

	it('is correct for basic case', function(){
		var d = surface.derivatives( 0.5, 0.5, 1 );

		vecShouldBe( [15, -15, 0], d[0][0] );
		vecShouldBe( [0, -30, 0], d[1][0] );
		vecShouldBe( [30, 0, 0], d[0][1] );
	});

	it('is correct for basic case async', function(done){
		surface.derivativesAsync( 0.5, 0.5, 1 ).then(function(d){

			vecShouldBe( [15, -15, 0], d[0][0] );
			vecShouldBe( [0, -30, 0], d[1][0] );
			vecShouldBe( [30, 0, 0], d[0][1] );

			done();
		});
	});

});

describe("verb.geom.NurbsSurface.closestParam",function(){

	var degreeU = 3
		, degreeV = 3
		, knotsU = [0, 0, 0, 0, 1, 1, 1, 1]
		, knotsV =	[0, 0, 0, 0, 1, 1, 1, 1]
		, controlPoints = [ 	[ [0, 0, 0], 	[10, 0, 0], 	[20, 0, 0], 	[30, 0, 0] 		],
								[ [0, -10, 0], 	[10, -10, 0], 	[20, -10, 0], 	[30, -10, 0] 	],
								[ [0, -20, 0], 	[10, -20, 0], 	[20, -20, 0], 	[30, -20, 0] 	],
								[ [0, -30, 0], 	[10, -30, 0], 	[20, -30, 0], 	[30, -30, 0] 	] ]
		, weights = [ 	[ 1, 1, 1, 1 ],
						[ 1, 1, 1, 1 ],
						[ 1, 1, 1, 1 ],
						[ 1, 1, 1, 1 ] ]
		, surface = verb.geom.NurbsSurface.byKnotsControlPointsWeights( degreeU, degreeV, knotsU, knotsV, controlPoints, weights );

	it('is correct for basic case', function(){
		var d = surface.closestParam( [ 15, -15, 1] );
		vecShouldBe( [0.5, 0.5], d );
	});

	it('is correct for basic case async', function(done){
		surface.closestParamAsync(  [15, -15, 1] ).then(function(d){
			vecShouldBe( [0.5, 0.5], d );
			done();
		});
	});

	it('is correct for basic case of degree 1 in both directions', function() {
		var degreeU = 1
			, degreeV = 1
			, knotsU = [0, 0, 1, 1]
			, knotsV =	[0, 0, 1, 1]
			, controlPoints = [ 	[ [0, 0, 0], 	[10, 0, 0] 	],
									[ [0, 20, 0], 	[10, 20, 0]	] ]
			, weights = [ 	[ 1, 1 ],
							[ 1, 1 ] ]
			, surface = verb.geom.NurbsSurface.byKnotsControlPointsWeights( degreeU, degreeV, knotsU, knotsV, controlPoints, weights );

		var d = surface.closestParam( [ 5, 10, 1] );
		vecShouldBe( [0.5, 0.5], d );
	});

	it('is correct for basic case of degree 1 in one direction', function() {
		var degreeU = 1
			, degreeV = 2
			, knotsU = [0, 0, 1, 1]
			, knotsV =	[0, 0, 0, 1, 1, 1]
			, controlPoints = [ 	[ [0, 0, 0], 	[5, 0, 0],	[10, 0, 0] 	],
									[ [0, 20, 0], 	[5, 20, 0],	[10, 20, 0]	] ]
			, weights = [ 	[ 1, 1, 1],
							[ 1, 1, 1 ] ]
			, surface = verb.geom.NurbsSurface.byKnotsControlPointsWeights( degreeU, degreeV, knotsU, knotsV, controlPoints, weights );

		var d = surface.closestParam( [ 5, 10, 1] );
		vecShouldBe( [0.5, 0.5], d );
	});
});

describe("verb.geom.NurbsSurface.closestPoint",function(){

	var degreeU = 3
		, degreeV = 3
		, knotsU = [0, 0, 0, 0, 1, 1, 1, 1]
		, knotsV =	[0, 0, 0, 0, 1, 1, 1, 1]
		, controlPoints = [ 	[ [0, 0, 0], 	[10, 0, 0], 	[20, 0, 0], 	[30, 0, 0] 		],
								[ [0, -10, 0], 	[10, -10, 0], 	[20, -10, 0], 	[30, -10, 0] 	],
								[ [0, -20, 0], 	[10, -20, 0], 	[20, -20, 0], 	[30, -20, 0] 	],
								[ [0, -30, 0], 	[10, -30, 0], 	[20, -30, 0], 	[30, -30, 0] 	] ]
		, weights = [ 	[ 1, 1, 1, 1 ],
						[ 1, 1, 1, 1 ],
						[ 1, 1, 1, 1 ],
						[ 1, 1, 1, 1 ] ]
		, surface = verb.geom.NurbsSurface.byKnotsControlPointsWeights( degreeU, degreeV, knotsU, knotsV, controlPoints, weights );

	it('is correct for basic case', function(){
		var d = surface.closestPoint( [ 15, -15, 1] );
		vecShouldBe( [15, -15, 0], d );
	});

	it('is correct for basic case async', function(done){
		surface.closestPointAsync(  [15, -15, 1] ).then(function(d){
			vecShouldBe( [15, -15, 0], d );
			done();
		});
	});
});

describe("verb.geom.NurbsSurface.split",function(){

	var degreeU = 3
		, degreeV = 3
		, knotsU = [0, 0, 0, 0, 1, 1, 1, 1]
		, knotsV =	[0, 0, 0, 0, 1, 1, 1, 1]
		, controlPoints = [ 	[ [0, 0, 0], 	[10, 0, 0], 	[20, 0, 0], 	[30, 0, 0] 		],
								[ [0, -10, 0], 	[10, -10, 0], 	[20, -10, 0], 	[30, -10, 0] 	],
								[ [0, -20, 0], 	[10, -20, 0], 	[20, -20, 0], 	[30, -20, 0] 	],
								[ [0, -30, 0], 	[10, -30, 0], 	[20, -30, 0], 	[30, -30, 0] 	] ]
		, weights = [ 	[ 1, 1, 1, 1 ],
						[ 1, 1, 1, 1 ],
						[ 1, 1, 1, 1 ],
						[ 1, 1, 1, 1 ] ]
		, surface = verb.geom.NurbsSurface.byKnotsControlPointsWeights( degreeU, degreeV, knotsU, knotsV, controlPoints, weights );

	it('is correct for basic case 1', function(){
		var d = surface.split( 0.5, true );

		d[0].domainV().min.should.be.equal(0);
		d[0].domainV().max.should.be.equal(0.5);

		d[0].domainU().min.should.be.equal(0);
		d[0].domainU().max.should.be.equal(1.0);

		d[1].domainV().min.should.be.equal(0.5);
		d[1].domainV().max.should.be.equal(1.0);

		d[1].domainU().min.should.be.equal(0);
		d[1].domainU().max.should.be.equal(1.0);
	});

	it('is correct for basic case 2', function(){
		var d = surface.split( 0.5, false );

		d[0].domainV().min.should.be.equal(0);
		d[0].domainV().max.should.be.equal(1.0);

		d[0].domainU().min.should.be.equal(0);
		d[0].domainU().max.should.be.equal(0.5);

		d[1].domainV().min.should.be.equal(0);
		d[1].domainV().max.should.be.equal(1.0);

		d[1].domainU().min.should.be.equal(0.5);
		d[1].domainU().max.should.be.equal(1.0);
	});

	it('is correct for basic case async', function(done){
		surface.splitAsync( 0.5, true ).then(function(d){

			d[0].domainV().min.should.be.equal(0);
			d[0].domainV().max.should.be.equal(0.5);

			d[0].domainU().min.should.be.equal(0);
			d[0].domainU().max.should.be.equal(1.0);

			d[1].domainV().min.should.be.equal(0.5);
			d[1].domainV().max.should.be.equal(1.0);

			d[1].domainU().min.should.be.equal(0);
			d[1].domainU().max.should.be.equal(1.0);

			done();
		});
	});
});

describe("verb.geom.NurbsSurface.tessellate",function(){

	var degreeU = 3
		, degreeV = 3
		, knotsU = [0, 0, 0, 0, 1, 1, 1, 1]
		, knotsV =	[0, 0, 0, 0, 1, 1, 1, 1]
		, controlPoints = [ 	[ [0, 0, 0], 	[10, 0, 0], 	[20, 0, 0], 	[30, 0, 0] 		],
								[ [0, -10, 0], 	[10, -10, 0], 	[20, -10, 0], 	[30, -10, 0] 	],
								[ [0, -20, 0], 	[10, -20, 0], 	[20, -20, 0], 	[30, -20, 0] 	],
								[ [0, -30, 0], 	[10, -30, 0], 	[20, -30, 0], 	[30, -30, 0] 	] ]
		, weights = [ 	[ 1, 1, 1, 1 ],
						[ 1, 1, 1, 1 ],
						[ 1, 1, 1, 1 ],
						[ 1, 1, 1, 1 ] ]
		, surface = verb.geom.NurbsSurface.byKnotsControlPointsWeights( degreeU, degreeV, knotsU, knotsV, controlPoints, weights );

	it('is correct for basic case with no options', function(){
		var d = surface.tessellate();

		d.faces.length.should.be.greaterThan( 2 );
		d.normals.length.should.be.greaterThan( 2 );
		d.points.length.should.be.greaterThan( 2 );
		d.uvs.length.should.be.greaterThan( 2 );

	});

//	it('is correct for basic case async', function(done){
//		surface.tessellateAsync( 0.5, true ).then(function(d){
//			console.log("Hello");
//
//			d.faces.length.should.be.greaterThan( 2 );
//			d.normals.length.should.be.greaterThan( 2 );
//			d.points.length.should.be.greaterThan( 2 );
//			d.uvs.length.should.be.greaterThan( 2 );
//
//			done();
//		});
//	});
});

describe("verb.geom.NurbsSurface.transform",function(){

	var degreeU = 3
		, degreeV = 3
		, knotsU = [0, 0, 0, 0, 1, 1, 1, 1]
		, knotsV =	[0, 0, 0, 0, 1, 1, 1, 1]
		, controlPoints = [ 	[ [0, 0, 0], 	[10, 0, 0], 	[20, 0, 0], 	[30, 0, 0] 		],
								[ [0, -10, 0], 	[10, -10, 0], 	[20, -10, 0], 	[30, -10, 0] 	],
								[ [0, -20, 0], 	[10, -20, 0], 	[20, -20, 0], 	[30, -20, 0] 	],
								[ [0, -30, 0], 	[10, -30, 0], 	[20, -30, 0], 	[30, -30, 0] 	] ]
		, weights = [ 	[ 1, 1, 1, 1 ],
						[ 1, 1, 1, 1 ],
						[ 1, 1, 1, 1 ],
						[ 1, 1, 1, 1 ] ]
		, surface = verb.geom.NurbsSurface.byKnotsControlPointsWeights( degreeU, degreeV, knotsU, knotsV, controlPoints, weights );

	var t = [ [ 1, 0, 0, 5 ],
			  [ 0, 1, 0, 2 ],
			  [ 0, 0, 1, -1],
			  [ 0, 0, 0, 1 ] ];

	it('is correct for basic case with no options', function(){

		var ta = surface.transform( t );

		ta.point(0.5,0.5).should.be.eql( [ 15 + 5, -15 + 2, 0 - 1] );
	});

	it('is correct for basic case async', function(done){
		surface.transformAsync( t ).then(function(ta){

			ta.point(0.5,0.5).should.be.eql( [ 15 + 5, -15 + 2, 0 - 1] );

			done();
		});
	});
});

describe("verb.geom.NurbsCurve.byPoints",function(){

	function shouldInterpPoints(curve, pts){

		// // the internal points are interped
		var tess = curve.tessellate( 1e-8  );

		for (var j = 0; j < pts.length; j++){

			var min = Number.MAX_VALUE;
			for (var i = 1; i < tess.length; i++){

				var pt = pts[j];
				var o = tess[i-1];
				var r = verb.core.Vec.normalized( verb.core.Vec.sub( tess[i], tess[i-1] ) );

				var dist = verb.core.Trig.distToRay( pt, o, r );

				if (dist < min) {
					min = dist;
				}
			}

			min.should.be.lessThan( 1e-3 );
		}
	}

	var pts = [ [0, 0, 1], [3,4, 0], [-1,4, 0], [-4,0, 0], [-4,-3, 0] ];

	it('can compute valid cubic interpolating curve for 4 points', function(){
		shouldInterpPoints( verb.geom.NurbsCurve.byPoints( pts ), pts );
	});

});

describe("verb.geom.ExtrudedSurface",function(){

	it('can create an instance', function(){

		var profile = new verb.geom.Line( [0,0,0], [1,1,1] )
			, axis = [0,0,1]
			, length = 3;

		var srf = new verb.geom.ExtrudedSurface( profile, axis, length);

		should.exist(srf);

	});

});

describe("verb.geom.ExtrudedSurface.point",function(){

	it('evaluates correctly for middle of surface', function(){

		var profile = new verb.geom.Line( [0,0,0], [1,1,0] )
			, axis = [0,0,3];

		var srf = new verb.geom.ExtrudedSurface( profile, axis );

		should.exist(srf);

		var p = srf.point(0.5,0.5);

		p[0].should.be.approximately(0.5, verb.core.Constants.EPSILON );
		p[1].should.be.approximately(0.5, verb.core.Constants.EPSILON );
		p[2].should.be.approximately(1.5, verb.core.Constants.EPSILON );

	});

});

describe("verb.geom.ExtrudedSurface.derivatives",function(){

	it('gives expected result for middle of surface', function(){

		var profile = new verb.geom.Line( [0,0,0], [1,1,0] )
			, axis = [0,0,3];

		var srf = new verb.geom.ExtrudedSurface( profile, axis );

		should.exist(srf);

		var p = srf.derivatives(0.5, 0.5, 1);

		p[0][0][0].should.be.approximately(0.5, verb.core.Constants.EPSILON );
		p[0][0][1].should.be.approximately(0.5, verb.core.Constants.EPSILON );
		p[0][0][2].should.be.approximately(1.5, verb.core.Constants.EPSILON );

		p[0][1][0].should.be.approximately(1, verb.core.Constants.EPSILON );
		p[0][1][1].should.be.approximately(1, verb.core.Constants.EPSILON );
		p[0][1][2].should.be.approximately(0, verb.core.Constants.EPSILON );

		p[1][0][0].should.be.approximately(0, verb.core.Constants.EPSILON );
		p[1][0][1].should.be.approximately(0, verb.core.Constants.EPSILON );
		p[1][0][2].should.be.approximately(-3, verb.core.Constants.EPSILON );

	});

});


describe("verb.geom.ExtrudedSurface.tessellate",function(){

	it('gives mesh result', function(){

		var profile = new verb.geom.Line( [0,0,0], [1,1,0] )
			, axis = [0,0,3];

		var srf = new verb.geom.ExtrudedSurface( profile, axis );

		should.exist(srf);

		var p = srf.tessellate();

		p.uvs.length.should.be.greaterThan(10);
		p.points.length.should.be.greaterThan(10);
		p.faces.length.should.be.greaterThan(10);
		p.normals.length.should.be.greaterThan(10);

		p.points.map(function(e){ e.length.should.be.equal(3); });
		p.uvs.map(function(e){ e.length.should.be.equal(2); });
		p.faces.map(function(e){ e.length.should.be.equal(3); });
		p.normals.map(function(e){ e.length.should.be.equal(3); });


	});

});

describe("verb.geom.RevolvedSurface.constructor",function(){

	it('can create an instance', function(){

		var base = [0,0,0]
			, axis = [0,0,1]
			, angle = Math.PI
			, profile = new verb.geom.Line( [1, 0, 10], [10, 0, 1] );

		var srf = new verb.geom.RevolvedSurface( profile, base, axis, angle );

		should.exist(srf);

	});

});

describe("verb.geom.RevolvedSurface.point",function(){

	it('evaluates correctly for middle of surface', function(){

		var base = [0,0,0]
			, axis = [0,0,1]
			, angle = Math.PI
			, profile = new verb.geom.Line( [1, 0, 10], [10, 0, 1] );

		var srf = new verb.geom.RevolvedSurface( profile, base, axis, angle );

		should.exist(srf);

		var p = srf.point(0.5,0.5);

		p[0].should.be.approximately(0, verb.core.Constants.EPSILON );
		p[1].should.be.approximately(5.5, verb.core.Constants.EPSILON );
		p[2].should.be.approximately(5.5, verb.core.Constants.EPSILON );

	});

});

describe("verb.geom.RevolvedSurface.derivatives",function(){

	it('gives expected result for middle of surface', function(){

		var base = [0,0,0]
			, axis = [0,0,1]
			, angle = Math.PI
			, profile = new verb.geom.Line( [1, 0, 10], [10, 0, 1] );

		var srf = new verb.geom.RevolvedSurface( profile, base, axis, angle );

		should.exist(srf);

		var p = srf.derivatives(0.5, 0.5, 1);

		p[0][0][0].should.be.approximately(0, verb.core.Constants.EPSILON );
		p[0][0][1].should.be.approximately(5.5, verb.core.Constants.EPSILON );
		p[0][0][2].should.be.approximately(5.5, verb.core.Constants.EPSILON );


		p[0][1][0].should.be.approximately(0, verb.core.Constants.EPSILON );
		p[0][1][1].should.be.approximately(9, verb.core.Constants.EPSILON );
		p[0][1][2].should.be.approximately(-9, verb.core.Constants.EPSILON );

	  p[1][0] = verb.core.Vec.normalized( p[1][0] );

		p[1][0][0].should.be.approximately(-1, verb.core.Constants.EPSILON );
		p[1][0][1].should.be.approximately(0, verb.core.Constants.EPSILON );
		p[1][0][2].should.be.approximately(0, verb.core.Constants.EPSILON );

	});

});

describe("verb.geom.RevolvedSurface.tessellate",function(){

	it('gives mesh result', function(){

		var base = [0,0,0]
			, axis = [0,0,1]
			, angle = Math.PI
			, profile = new verb.geom.Line( [1, 0, 10], [10, 0, 1] );

		var srf = new verb.geom.RevolvedSurface( profile, base, axis, angle );

		should.exist(srf);

		var p = srf.tessellate();

		p.uvs.length.should.be.greaterThan(10);
		p.points.length.should.be.greaterThan(10);
		p.faces.length.should.be.greaterThan(10);
		p.normals.length.should.be.greaterThan(10);

		p.points.map(function(e){ e.length.should.be.equal(3); });
		p.uvs.map(function(e){ e.length.should.be.equal(2); });
		p.faces.map(function(e){ e.length.should.be.equal(3); });
		p.normals.map(function(e){ e.length.should.be.equal(3); });


	});

});

describe("verb.geom.SphericalSurface.constructor",function(){

	it('can create an instance', function(){

		var center = [0,0,0]
			, radius = 5;

		var srf = new verb.geom.SphericalSurface( center, radius );

		should.exist(srf);

		srf.center().should.eql( center );
		srf.radius().should.eql( radius );

	});

});

describe("verb.geom.SphericalSurface.point",function(){

	it('evaluates correctly for middle of surface', function(){

		var center = [0,0,0]
			, radius = 5;

		var srf = new verb.geom.SphericalSurface( center, radius );

		should.exist(srf);

		var p = srf.point(0.5,0.5);

		p[0].should.be.approximately(-radius, verb.core.Constants.EPSILON );
		p[1].should.be.approximately(0, verb.core.Constants.EPSILON );
		p[2].should.be.approximately(0, verb.core.Constants.EPSILON );

	});

});

describe("verb.geom.SphericalSurface.derivatives",function(){

	it('gives expected result for middle of surface', function(){

		var center = [0,0,0]
			, radius = 5;

		var srf = new verb.geom.SphericalSurface( center, radius );

		should.exist(srf);

		var p = srf.derivatives(0.5, 0.5, 1);

		p[0][0][0].should.be.approximately(-radius, verb.core.Constants.EPSILON );
		p[0][0][1].should.be.approximately(0, verb.core.Constants.EPSILON );
		p[0][0][2].should.be.approximately(0, verb.core.Constants.EPSILON );

		p[0][1] = verb.core.Vec.normalized( p[0][1] );

		p[0][1][0].should.be.approximately(0, verb.core.Constants.EPSILON );
		p[0][1][1].should.be.approximately(0, verb.core.Constants.EPSILON );
		p[0][1][2].should.be.approximately(1, verb.core.Constants.EPSILON );

	  p[1][0] = verb.core.Vec.normalized( p[1][0] );

		p[1][0][0].should.be.approximately(0, verb.core.Constants.EPSILON );
		p[1][0][1].should.be.approximately(-1, verb.core.Constants.EPSILON );
		p[1][0][2].should.be.approximately(0, verb.core.Constants.EPSILON );

	});

});

describe("verb.geom.SphericalSurface.tessellate",function(){

	it('gives mesh result', function(){

		var center = [0,0,0]
			, radius = 5;

		var srf = new verb.geom.SphericalSurface( center, radius );

		should.exist(srf);

		var p = srf.tessellate();

		p.uvs.length.should.be.greaterThan(10);
		p.points.length.should.be.greaterThan(10);
		p.faces.length.should.be.greaterThan(10);
		p.normals.length.should.be.greaterThan(10);

		p.points.map(function(e){ e.length.should.be.equal(3); });
		p.uvs.map(function(e){ e.length.should.be.equal(2); });
		p.faces.map(function(e){ e.length.should.be.equal(3); });
		p.normals.map(function(e){ e.length.should.be.equal(3); });


	});
});


describe("verb.geom.CylindricalSurface.constructor",function(){

	it('can create an instance', function(){

		var axis = [0,0,1]
			, xaxis = [1,0,0]
			, base = [0,0,0]
			, height = 5
			, radius = 3;

		var srf = new verb.geom.CylindricalSurface( axis, xaxis, base, height, radius );

		should.exist(srf);

		srf.axis().should.eql( axis );
		srf.xaxis().should.eql( xaxis );
		srf.base().should.eql( base );
		srf.height().should.eql( height );
		srf.radius().should.eql( radius );

	});

});

describe("verb.geom.CylindricalSurface.point",function(){

	it('evaluates correctly for middle of surface', function(){

		var axis = [0,0,1]
			, xaxis = [1,0,0]
			, base = [0,0,0]
			, height = 5
			, radius = 3;

		var srf = new verb.geom.CylindricalSurface( axis, xaxis, base, height, radius );

		console.log( srf.serialize() );

		should.exist(srf);

		var p = srf.point(0.5,0.5);

		p[0].should.be.approximately(-3, verb.core.Constants.EPSILON );
		p[1].should.be.approximately(0, verb.core.Constants.EPSILON );
		p[2].should.be.approximately(2.5, verb.core.Constants.EPSILON );

	});

});

describe("verb.geom.CylindricalSurface.derivatives",function(){

	it('gives expected result for middle of surface', function(){

		var axis = [0,0,1]
			, xaxis = [1,0,0]
			, base = [0,0,0]
			, height = 5
			, radius = 3;

		var srf = new verb.geom.CylindricalSurface( axis, xaxis, base, height, radius );

		should.exist(srf);

		var p = srf.derivatives(0.5, 0.5, 1);

		p[0][0][0].should.be.approximately(-3, verb.core.Constants.EPSILON );
		p[0][0][1].should.be.approximately(0, verb.core.Constants.EPSILON );
		p[0][0][2].should.be.approximately(2.5, verb.core.Constants.EPSILON );

		p[1][0][0].should.be.approximately(0, verb.core.Constants.EPSILON );
		p[1][0][1].should.be.approximately(0, verb.core.Constants.EPSILON );
		p[1][0][2].should.be.approximately(-5, verb.core.Constants.EPSILON );

		p[0][1] = verb.core.Vec.div( p[0][1], verb.core.Vec.norm(p[0][1]) );

		p[0][1][0].should.be.approximately(0, verb.core.Constants.EPSILON );
		p[0][1][1].should.be.approximately(-1, verb.core.Constants.EPSILON );
		p[0][1][2].should.be.approximately(0, verb.core.Constants.EPSILON );

	});

});

describe("verb.geom.CylindricalSurface.tessellate",function(){

	it('gives mesh result', function(){

		var axis = [0,0,1]
			, xaxis = [1,0,0]
			, base = [0,0,0]
			, height = 5
			, radius = 3;

		var srf = new verb.geom.CylindricalSurface( axis, xaxis, base, height, radius );

		should.exist(srf);

		var p = srf.tessellate();

		p.uvs.length.should.be.greaterThan(10);
		p.points.length.should.be.greaterThan(10);
		p.faces.length.should.be.greaterThan(10);
		p.normals.length.should.be.greaterThan(10);

		p.points.map(function(e){ e.length.should.be.equal(3); });
		p.uvs.map(function(e){ e.length.should.be.equal(2); });
		p.faces.map(function(e){ e.length.should.be.equal(3); });
		p.normals.map(function(e){ e.length.should.be.equal(3); });


	});

});

describe("verb.geom.NurbsSurface.byCorners",function(){

	it('can create an instance', function(){

		var p1 = [0,0,1]
			, p2 = [1,0,0]
			, p3 = [1,1,1]
			, p4 = [0,1,0];

		var srf = verb.geom.NurbsSurface.byCorners( p1, p2, p3, p4 );

		should.exist(srf);

	});

});

describe("verb.geom.NurbsSurface.byCorners -> verb.geom.NurbsSurface.point",function(){

	it('evaluates correctly for hypar', function(){

		var p1 = [0,0,1]
			, p2 = [1,0,0]
			, p3 = [1,1,1]
			, p4 = [0,1,0];

		var srf = verb.geom.NurbsSurface.byCorners( p1, p2, p3, p4 );

		should.exist(srf);

		var p = srf.point(0.5,0.5);

		p[0].should.be.approximately(0.5, verb.core.Constants.EPSILON );
		p[1].should.be.approximately(0.5, verb.core.Constants.EPSILON );
		p[2].should.be.approximately(0.5, verb.core.Constants.EPSILON );

	});

});

describe("verb.geom.NurbsSurface.byCorners -> verb.geom.NurbsSurface.derivatives",function(){

	it('gives nice result', function(){

		var p1 = [0,0,1]
			, p2 = [1,0,0]
			, p3 = [1,1,1]
			, p4 = [0,1,0];

		var srf = verb.geom.NurbsSurface.byCorners( p1, p2, p3, p4 );

		should.exist(srf);

		var p = srf.derivatives(0.5, 0.5, 1);

		vecShouldBe( [0.5,0.5,0.5], p[0][0] );
		vecShouldBe( [0,1,0], p[0][1] );
		vecShouldBe( [1,0,0], p[1][0] );

	});

});

describe("verb.geom.NurbsSurface.byCorners -> verb.geom.NurbsSurface.tessellate",function(){

	it('gives mesh result', function(){

		var p1 = [0,0,1]
			, p2 = [1,0,0]
			, p3 = [1,1,1]
			, p4 = [0,1,0];

		var srf = verb.geom.NurbsSurface.byCorners( p1, p2, p3, p4 );

		should.exist(srf);

		var p = srf.tessellate();

		p.uvs.length.should.be.greaterThan(10);
		p.points.length.should.be.greaterThan(10);
		p.faces.length.should.be.greaterThan(10);
		p.normals.length.should.be.greaterThan(10);

		p.points.map(function(e){ e.length.should.be.equal(3); });
		p.uvs.map(function(e){ e.length.should.be.equal(2); });
		p.faces.map(function(e){ e.length.should.be.equal(3); });
		p.normals.map(function(e){ e.length.should.be.equal(3); });


	});

});


describe("verb.geom.ConicalSurface.constructor",function(){

	it('can create an instance', function(){

		var axis = [0,0,1]
			, xaxis = [1,0,0]
			, base = [0,0,0]
			, height = 5
			, radius = 3;

		var srf = new verb.geom.ConicalSurface( axis, xaxis, base, height, radius );

		should.exist(srf);

		srf.axis().should.eql( axis );
		srf.xaxis().should.eql( xaxis );
		srf.base().should.eql( base );
		srf.height().should.eql( height );
		srf.radius().should.eql( radius );

	});

});

describe("verb.geom.ConicalSurface.point",function(){

	it('evaluates correctly for middle of surface', function(){

		var axis = [0,0,1]
			, xaxis = [1,0,0]
			, base = [0,0,0]
			, height = 5
			, radius = 3;

		var srf = new verb.geom.ConicalSurface( axis, xaxis, base, height, radius );

		should.exist(srf);

		var p = srf.point(0.5,0.5);

		p[0].should.be.approximately(-1.5, verb.core.Constants.EPSILON );
		p[1].should.be.approximately(0, verb.core.Constants.EPSILON );
		p[2].should.be.approximately(2.5, verb.core.Constants.EPSILON );

	});

});

describe("verb.geom.ConicalSurface.derivatives",function(){

	it('gives expected result for middle of surface', function(){

		var axis = [0,0,1]
			, xaxis = [1,0,0]
			, base = [0,0,0]
			, height = 5
			, radius = 3;

		var srf = new verb.geom.ConicalSurface( axis, xaxis, base, height, radius );

		should.exist(srf);

		var p = srf.derivatives(0.5, 0.5, 1);

		p[0][0][0].should.be.approximately(-1.5, verb.core.Constants.EPSILON );
		p[0][0][1].should.be.approximately(0, verb.core.Constants.EPSILON );
		p[0][0][2].should.be.approximately(2.5, verb.core.Constants.EPSILON );

		p[0][1][0].should.be.approximately(-3, verb.core.Constants.EPSILON );
		p[0][1][1].should.be.approximately(0, verb.core.Constants.EPSILON );
		p[0][1][2].should.be.approximately(-5, verb.core.Constants.EPSILON );

		p[1][0] = verb.core.Vec.div( p[1][0], verb.core.Vec.norm(p[1][0]) );

		p[1][0][0].should.be.approximately(0, verb.core.Constants.EPSILON );
		p[1][0][1].should.be.approximately(-1, verb.core.Constants.EPSILON );
		p[1][0][2].should.be.approximately(0, verb.core.Constants.EPSILON );

	});

});


describe("verb.geom.ConicalSurface.tessellate",function(){

	it('gives mesh result', function(){

		var axis = [0,0,1]
			, xaxis = [1,0,0]
			, base = [0,0,0]
			, height = 5
			, radius = 3;

		var srf = new verb.geom.ConicalSurface( axis, xaxis, base, height, radius );

		should.exist(srf);

		var p = srf.tessellate();

		p.uvs.length.should.be.greaterThan(10);
		p.points.length.should.be.greaterThan(10);
		p.faces.length.should.be.greaterThan(10);
		p.normals.length.should.be.greaterThan(10);

		p.points.map(function(e){ e.length.should.be.equal(3); });
		p.uvs.map(function(e){ e.length.should.be.equal(2); });
		p.faces.map(function(e){ e.length.should.be.equal(3); });
		p.normals.map(function(e){ e.length.should.be.equal(3); });


	});

});

describe("verb.geom.Intersect.curves",function(){

	var curve1 = new verb.geom.BezierCurve( [[0,0,0], 	[0.5,0.1,0], [2,0,0]] ),
		curve2 = new verb.geom.BezierCurve( [[0.5,0.5,0], [0.7,0,0], [0.5,-1.5,0]] );

	it('gives valid result for 2 planar degree 2 beziers', function(){

		var res = verb.geom.Intersect.curves( curve1, curve2, verb.core.Constants.TOLERANCE );

		res.length.should.be.equal(1);

		verb.core.Vec.dist( res[0].point0, res[0].point1 ).should.be.lessThan( verb.core.Constants.TOLERANCE );

	});

	it('gives valid result for 2 planar degree 2 beziers', function(done){

		verb.geom.Intersect.curvesAsync( curve1, curve2, verb.core.Constants.TOLERANCE )
			.then(function(res){

				res.length.should.be.equal(1);

		        verb.core.Vec.dist( res[0].point0, res[0].point1 ).should.be.lessThan( verb.core.Constants.TOLERANCE );

				done();
			});
	});

});

describe("verb.geom.Intersect.curveAndSurface",function(){

	// build planar surface in the xy plane
	var homo_controlPoints_srf = [ [ [0,0,0,1], [0,10,0,1] ], [[20,0,0,1], [20,10,0,1] ] ]
		, degreeU  = 1
		, degreeV = 1
		, knotsU = [0,0,1,1]
		, knotsV = [0,0,1,1]
		, surfaceData = new verb.core.NurbsSurfaceData( degreeU, degreeV, knotsU, knotsV, homo_controlPoints_srf )
		, surface = new verb.geom.NurbsSurface( surfaceData );

	// line from [5,5,5] to [5,5,-5]
	var degree_crv = 2
		, knots_crv = [0,0,0,1,1,1]
		, homo_controlPoints_crv = [ [5.2,5.2,5,1], [5.4,4.8,0,1], [5.2,5.2,-5,1] ]
		, curveData = new verb.core.NurbsCurveData( degree_crv, knots_crv, homo_controlPoints_crv )
		, curve = new verb.geom.NurbsCurve( curveData );

	it('gives valid result for planar surface and degree 2 bezier', function(){
		var res =  verb.geom.Intersect.curveAndSurface( curve, surface, verb.core.Constants.TOLERANCE  );

		res.length.should.be.equal( 1 );
		res[0].u.should.be.approximately( 0.5, 1e-3 );
		res[0].uv[0].should.be.approximately( 0.265, 1e-3 );
		res[0].uv[1].should.be.approximately( 0.5, 1e-3 );
	});

	it('gives valid result for planar surface and degree 2 bezier async', function(done){
		verb.geom.Intersect.curveAndSurfaceAsync( curve, surface, verb.core.Constants.TOLERANCE  )
			.then(function(res){

				res.length.should.be.equal( 1 );
				res[0].u.should.be.approximately( 0.5, 1e-3 );
				res[0].uv[0].should.be.approximately( 0.265, 1e-3 );
				res[0].uv[1].should.be.approximately( 0.5, 1e-3 );

				done();
			});
	});
});

describe("verb.geom.NurbsCurve.reverse",function(){

	it('is correct', function(){
		var cd = new verb.core.NurbsCurveData( 2, [0,0,0,0.24,1,1,1], [ [0,0,0,1], [1,0,0,1], [0.5,1,0,1], [2,0,0,1] ] );
		var c = new verb.geom.NurbsCurve( cd );

		var cr = c.reverse();
		var crr = cr.reverse();

		var cp0 = c.point( 0 );
		var cp1 = cr.point( 1.0 );

		vecShouldBe( cp0, cp1, verb.core.Constants.EPSILON );

		sameCurve( c.asNurbs(), crr.asNurbs() );
	});

	it('is correct for 90 degree arc', function(){
        var c = new verb.geom.Arc([0,0,0], [1,0,0], [0,1,0], 5, 0, Math.PI/ 2 );
        var cr = c.reverse(); // returns a reversed copy
        var crr = cr.reverse(); // returns the original

        var cp0 = c.point( 0 );
        var cp1 = cr.point( 1.0 );

        vecShouldBe( cp0, cp1, verb.core.Constants.EPSILON );

        var cp2 = c.point( 1.0 );
        var cp3 = cr.point( 0 );

        vecShouldBe( cp2, cp3, verb.core.Constants.EPSILON );

        sameCurve( c.asNurbs(), crr.asNurbs() );

	});

});

describe("verb.geom.NurbsSurface.reverse",function(){

	var degreeU = 3
		, degreeV = 3
		, knotsU = [0, 0, 0, 0, 0.25, 1, 1, 1, 1]
		, knotsV =	[0, 0, 0, 0, 0.70, 1, 1, 1, 1]
		, controlPoints = [ 	[ [0, 0, 0], 	[10, 0, 0], 	[20, 0, 0],  	[25, 0, 0], 	[30, 0, 0] 		],
								[ [0, -10, 0], 	[10, -10, 0], 	[20, -10, 0],   [25, -10, 0],	[30, -10, 0] 	],
								[ [0, -20, 0], 	[10, -20, 0], 	[20, -20, 0], 	[25, -20, 0],   [30, -20, 0] 	],
								[ [0, -20, 0], 	[10, -20, 0], 	[20, -20, 0], 	[25, -20, 0], 	[30, -20, 0] 	],
								[ [0, -30, 0], 	[10, -30, 0], 	[20, -30, 0], 	[25, -30, 0], 	[30, -30, 0] 	] ];

	it('is correct for u direction', function(){
		var s = verb.geom.NurbsSurface.byKnotsControlPointsWeights( degreeU, degreeV, knotsU, knotsV, controlPoints );

		var sr = s.reverse( true );

		var sp0 = s.point( 0, 0 );
		var sp1 = sr.point( 0, 1.0 );
		vecShouldBe( sp0, sp1, verb.core.Constants.EPSILON );

		var srr = sr.reverse( true );

		sp0 = s.point( 0, 0 );
		sp1 = srr.point( 0, 0 );
		vecShouldBe( sp0, sp1, verb.core.Constants.EPSILON );

		sp0 = s.point( 1.0, 0 );
		sp1 = srr.point( 1.0, 0 );
		vecShouldBe( sp0, sp1, verb.core.Constants.EPSILON );
	});
});

describe("verb.geom.Deserializer",function(){
    it('foo', function(){
		var rail = new verb.geom.BezierCurve( [[0,0,0], [1,0.5,1], [2,1,1]] );
		var prof = new verb.geom.BezierCurve( [[0,0,0], [2,0,0]] );

		var srf = new verb.geom.SweptSurface( prof, rail );
    });
});


describe("verb.geom.SweptSurface",function(){

    it('provides expected result for linear profile, curved rail', function(){

        var rail = new verb.geom.BezierCurve( [[0,0,0], [1,0.5,1], [2,1,1], [2,1,1]] );
        var prof = new verb.geom.BezierCurve( [[0,0,0], [2,0,0]] );

        var srf = new verb.geom.SweptSurface( prof, rail );

        vecShouldBe( srf.point( 0, 0 ), [0,0,0] );
        vecShouldBe( srf.point( 1, 0 ), [2,0,0] );
        vecShouldBe( srf.point( 1, 1 ), [4,1,1] );
        vecShouldBe( srf.point( 0, 1 ), [2,1,1] );

    });
});

describe("verb.geom.NurbsSurface.isocurve",function(){
	var degreeU = 3
		, degreeV = 3
		, knotsU = [0, 0, 0, 0, 1, 1, 1, 1]
		, knotsV =	[0, 0, 0, 0, 1, 1, 1, 1]
		, controlPoints = [ 	[ [0, 0, 0], 	[10, 0, 0], 	[20, 0, 0], 	[30, 0, 0] 		],
								[ [0, -10, 0], 	[10, -10, 0], 	[20, -10, 0], 	[30, -10, 0] 	],
								[ [0, -20, 0], 	[10, -20, 0], 	[20, -20, 0], 	[30, -20, 0] 	],
								[ [0, -30, 0], 	[10, -30, 0], 	[20, -30, 0], 	[30, -30, 0] 	] ]
		, bezier = verb.geom.NurbsSurface.byKnotsControlPointsWeights( degreeU, degreeV, knotsU, knotsV, controlPoints );

	it('provides isocurves at expected location in u direction', function(){

		var i = 0.5;
		var res = bezier.isocurve( i, false );

		var cpts = res.controlPoints();

		var pt0 = bezier.point( i, 0.0 );
		var pt1 = bezier.point( i, 1.0 );

		vecShouldBe( pt0, cpts[0] );
		vecShouldBe( pt1, cpts[cpts.length-1] );

	});

	it('provides isocurves at expected location in u direction async', function(done){

		var i = 0.5;
		bezier.isocurveAsync( i, false ).then(function(res){

			var cpts = res.controlPoints();

			var pt0 = bezier.point( i, 0.0 );
			var pt1 = bezier.point( i, 1.0 );

			vecShouldBe( pt0, cpts[0] );
			vecShouldBe( pt1, cpts[cpts.length-1] );

			done();

		});
	});
});


