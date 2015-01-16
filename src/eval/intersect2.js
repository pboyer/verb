





public static function refine_rational_surface_point(uv1, uv2, degree_u1, knots_u1, degree_v1, knots_v1, homo_control_points1, degree_u2, knots_u2, degree_v2, knots_v2, homo_control_points2, tol){

 var pds, p, pn, pu, pv, pd, qds, q, qn, qu, qv, qd, dist;
 var maxits = 1;
 var its = 0;

 var r = function(u, v){
 	return verb.eval.rational_surface_derivs( degree_u1, knots_u1, degree_v1, knots_v1, 
			homo_control_points1, 1, u, v );
 }

 var s = function(u, v){
 	return verb.eval.rational_surface_derivs( degree_u2, knots_u2, degree_v2, knots_v2, 
			homo_control_points2, 1, u, v );
 }

 do {

	// 1) eval normals, pts on respective surfaces (p, q, pn, qn)

		pds = r( uv1[0], uv1[1] );
		p = pds[0][0];
		pu = pds[1][0];
		pv = pds[0][1];
		pn = Vec.normalized( Vec.cross( pu, pv ) );
		pd = Vec.dot( pn, p );
		
		qds = s( uv2[0], uv2[1] );
		q = qds[0][0];
		qu = qds[1][0];
		qv = qds[0][1];
		qn = Vec.normalized( Vec.cross( qu, qv ) );
		qd = Vec.dot( qn, q );

		// if tolerance is met, exit loop
		dist = Vec.norm( Vec.sub(p, q) );

		
		if (dist < tol) {
			break;
		}

 	// 2) construct plane perp to both that passes through p (fn)

		var fn = Vec.normalized( Vec.cross( pn, qn ) );
		var fd = Vec.dot( fn, p );

 	// 3) x = intersection of all 3 planes
		var x = verb.eval.three_planes( pn, pd, qn, qd, fn, fd );

		if (x === null) throw new Error("panic!")

 	// 4) represent the difference vectors (pd = x - p, qd = x - q) in the partial 
	// 		derivative vectors of the respective surfaces (pu, pv, qu, qv)

		var pdif = Vec.sub( x, p );
		var qdif = Vec.sub( x, q );

		var rw = Vec.cross( pu, pn ); 
		var rt = Vec.cross( pv, pn );

		var su = Vec.cross( qu, qn );
		var sv = Vec.cross( qv, qn );

		var dw = Vec.dot( rt, pdif ) / Vec.dot( rt, pu );
		var dt = Vec.dot( rw, pdif ) / Vec.dot( rw, pv );

		var du = Vec.dot( sv, qdif ) / Vec.dot( sv, qu );
		var dv = Vec.dot( su, qdif ) / Vec.dot( su, qv );

		uv1 = Vec.add( [dw, dt], uv1 );
		uv2 = Vec.add( [du, dv], uv2 );

 	// repeat
 		its++;

 } while( its < maxits ) // tolerance is not met? not sure what this should be

 return {uv1: uv1, uv2: uv2, pt: p, d: dist };

}

public static function rational_surface_surface_by_aabb_refine( degree_u1, knots_u1, degree_v1, knots_v1, homo_control_points_srf1, degree_u2, knots_u2, degree_v2, knots_v2, homo_control_points_srf2, tol ) {

	// 1) tessellate the meshes to get the approximate intersections
	var srfObj1 = {
		degree_u : degree_u1,
		degree_v : degree_v1,
		knots_u : knots_u1,
		knots_v : knots_v1,
		homo_control_points : homo_control_points_srf1
	};

	// todo: need to be able to predict the number of divisions

	var tess1 = verb.eval.tessellate_rational_surface_adaptive( srfObj1.degree_u,
		srfObj1.knots_u,
		srfObj1.degree_v,
		srfObj1.knots_v, 
		srfObj1.homo_control_points);

	var srfObj2 = {
		degree_u : degree_u2,
		degree_v : degree_v2,
		knots_u : knots_u2,
		knots_v : knots_v2,
		homo_control_points : homo_control_points_srf2
	};

	var tess2 = verb.eval.tessellate_rational_surface_adaptive( srfObj2.degree_u,
		srfObj2.knots_u,
		srfObj2.degree_v,
		srfObj2.knots_v, 
		srfObj2.homo_control_points);

	var resApprox = verb.eval.meshes_by_aabb( tess1.points, tess1.faces, tess1.uvs, tess2.points, tess2.faces, tess2.uvs );

	// 2) refine the intersection points so that they lie on both surfaces
	var exactPls = resApprox.map(function(pl){
		return pl.map( function(inter){
			return verb.eval.refine_rational_surface_point(inter.uvtri1, inter.uvtri2, degree_u1, knots_u1, degree_v1, knots_v1, homo_control_points_srf1, 
				degree_u2, knots_u2, degree_v2, knots_v2, homo_control_points_srf2, tol );
		});
	});

	// 3) perform cubic interpolation
	return exactPls.map(function(x){
		return verb.eval.rational_interp_curve( x.map(function(x){ return x.pt; }), 3 ); 
	});

	// TODO: represent this in uv space
	// TODO: refine between initial points

}

public static function meshes_by_aabb( points1, tris1, uvs1, points2, tris2, uvs2 ) {

	// build aabb for each mesh
	var tri_indices1 = verb.range(tris1.length)
	  , tri_indices2 = verb.range(tris2.length)
	  , aabb1 = verb.eval.make_mesh_aabb_tree( points1, tris1, tri_indices1 )
	  , aabb2 = verb.eval.make_mesh_aabb_tree( points2, tris2, tri_indices2 );

  // intersect and get the pairs of triangle intersctions
	var bbints = verb.eval.aabb_trees( points1, tris1, points2, tris2, aabb1, aabb2 );

	// get the segments of the intersection crv with uvs
	var segments = bbints.map(function(ids){
													var res = verb.eval.tris( points1, tris1[ ids[0] ], uvs1, points2, tris2[ ids[1] ], uvs2 );
													if (!res) return res;

													res[0].tri1id = ids[0];
													res[1].tri1id = ids[0];
													res[0].tri2id = ids[1];
													res[1].tri2id = ids[1];

													return res;
												}).filter(function(x){ return x; })
												.filter(function(x){ 
													var dif = Vec.sub( x[0].pt, x[1].pt );
													return Vec.dot( dif, dif ) > verb.EPSILON 
												});

	// TODO: this is too expensive and this only occurs when the intersection
	// 			 line is on an edge.  we should mark these to avoid doing all of 
	//			 these computations
	segments = verb.unique( segments, function(a, b){

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

	if (segments.length === 0) return [];

	return verb.eval.make_polylines( segments );

}

public static function make_polylines( segments ) {

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
	if (freeEnds.length === 0) {
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
			if (curEnd.v) throw new Error('Segment end encountered twice!');

			// technically we consume both ends of the segment
			curEnd.v = true;
			curEnd.opp.v = true;

			pl.push(curEnd);

			curEnd = curEnd.opp.adj;

			// loop condition
			if (curEnd === end) break;

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
};

public static function kdtree_from_segs( segments ){

	var treePoints = [];

	// for each segment, transform into two elements, each keyed by pt1 and pt2
	segments.forEach(function(seg){
		treePoints.push({ "x": seg[0].pt[0], "y": seg[0].pt[1], "z": seg[0].pt[2], ele: seg[0] });
		treePoints.push({ "x": seg[1].pt[0], "y": seg[1].pt[1], "z": seg[1].pt[2], ele: seg[1] });
	});

	// make our tree
	return new KdTree(treePoints, verb.eval.pt_dist, ["x", "y", "z"]);

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

