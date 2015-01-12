


//
// Get the intersection of a NURBS curve and a NURBS surface by axis-aligned bounding box intersection and refinement
//
// **params**
// + integer degree of surface in u direction
// + array of nondecreasing knot values in u direction
// + integer degree of surface in v direction
// + array of nondecreasing knot values in v direction
// + 3d array of homogeneous control points, top to bottom is increasing u direction, left to right is increasing v direction,
// and where each control point is an array of length (dim+1)
// + integer degree of curve
// + array of nondecreasing knot values
// + 2d array of homogeneous control points, where each control point is an array of length (dim+1) 
// and form (wi*pi, wi)
// + the sample tolerance of the curve
// + tolerance for the curve intersection
// + integer number of divisions of the surface in the U direction for initial approximation (placeholder until adaptive tess of surfaces)
// + integer number of divisions of the surface in the V direction for initial approximation (placeholder until adaptive tess of surfaces)
// 
// **returns** 
// + array of intersection objects, each holding:
// 	- a "point" property where intersections took place
// 	- a "p" the parameter on the curve
//	- a "uv" the parameter on the surface
// 	- a "face" the index of the face where the intersection took place
//

public static function rational_curve_surface_by_aabb_refine( degree_u, knots_u, degree_v, 
	knots_v, homo_control_points_srf, degree_crv, knots_crv, homo_control_points_crv, sample_tol, tol, 
	divs_u, divs_v ) {

	// get the approximate intersections
	var ints = verb.eval.rational_curve_surface_by_aabb( degree_u, knots_u, degree_v, 
		knots_v, homo_control_points_srf, degree_crv, knots_crv, homo_control_points_crv, sample_tol, tol, 
		divs_u, divs_v );

	// refine them
	return ints.map(function( inter ){

		// get intersection params
		var start_params = [inter.p, inter.uv[0], inter.uv[1] ]

		// refine the parameters
			, refined_params = verb.eval.refine_rational_curve_surface_intersection( degree_u, knots_u, degree_v, knots_v, homo_control_points_srf, degree_crv, knots_crv, homo_control_points_crv, start_params );
	
		// update the inter object
		inter.p = refined_params[0];
		inter.uv[0] = refined_params[1];
		inter.uv[1] = refined_params[2];
		inter.distance = refined_params[3];
		delete inter.face;

		return inter;

	});

}

//
//
//
// Refine an intersection pair for a surface and curve given an initial guess.  This is an unconstrained minimization,
// so the caller is responsible for providing a very good initial guess.
//
// **params**
// + integer degree of surface in u direction
// + array of nondecreasing knot values in u direction
// + integer degree of surface in v direction
// + array of nondecreasing knot values in v direction
// + 3d array of homogeneous control points, top to bottom is increasing u direction, left to right is increasing v direction,
// and where each control point is an array of length (dim+1)
// + integer degree of curve
// + array of nondecreasing knot values
// + 2d array of homogeneous control points, where each control point is an array of length (dim+1) 
// and form (wi*pi, wi)
// + array of initial parameter values [ u_crv, u_srf, v_srf ]
// 
// **returns** 
// + a length 3 array containing the [ u_crv, u_srf, v_srf, final_distance ]
//

public static function refine_rational_curve_surface_intersection( degree_u, knots_u, degree_v, knots_v, homo_control_points_srf, degree_crv, knots_crv, homo_control_points_crv, start_params ) {

	var objective = function(x) { 

		var p1 = verb.eval.rational_curve_point(degree_crv, knots_crv, homo_control_points_crv, x[0])
			, p2 = verb.eval.rational_surface_point( degree_u, knots_u,  degree_v, knots_v, homo_control_points_srf, x[1], x[2] )
			, p1_p2 = Vec.sub(p1, p2);

		return Vec.dot(p1_p2, p1_p2);
	}

	var sol_obj = Vec.uncmin( objective, start_params);
	return sol_obj.solution.concat( sol_obj.f );

}



//
//
//
// Approximate the intersection of two nurbs surface by axis-aligned bounding box intersection.
//
// **params**
// + integer degree of surface in u direction
// + array of nondecreasing knot values in u direction
// + integer degree of surface in v direction
// + array of nondecreasing knot values in v direction
// + 3d array of homogeneous control points, top to bottom is increasing u direction, left to right is increasing v direction,
// and where each control point is an array of length (dim+1)
// + integer degree of curve
// + array of nondecreasing knot values
// + 2d array of homogeneous control points, where each control point is an array of length (dim+1) 
// and form (wi*pi, wi)
// + array of initial parameter values [ u_crv, u_srf, v_srf ]
// + the sample tolerance of the curve
// + tolerance for the curve intersection
// + integer number of divisions of the surface in the U direction
// + integer number of divisions of the surface in the V direction
// 
// **returns** 
// + array of intersection objects, each holding:
// 	- a "point" property where intersections took place
// 	- a "p" the parameter on the polyline
//	- a "uv" the parameter on the mesh
// 	- a "face" the index of the face where the intersection took place
//

public static function rational_curve_surface_by_aabb( degree_u, knots_u, degree_v, knots_v, homo_control_points_srf, degree_crv, knots_crv, homo_control_points_crv, sample_tol, tol, divs_u, divs_v ) {

	// tessellate the curve
	var crv = verb.eval.rational_curve_adaptive_sample( degree_crv, knots_crv, homo_control_points_crv, sample_tol, true)

	// tessellate the surface
		, mesh = verb.eval.tessellate_rational_surface_naive( degree_u, knots_u, degree_v, knots_v, homo_control_points_srf, divs_u, divs_v )

	// separate parameters from points in the polyline (params are the first index in the array)
		, u1 = crv.map( function(el) { return el[0]; })
		, p1 = crv.map( function(el) { return el.slice(1) })

	// perform intersection
		, res = verb.eval.parametric_polyline_mesh_by_aabb( p1, u1, mesh, verb.range(mesh.faces.length), tol );

	// eliminate duplicate intersections
	return verb.unique( res, function(a, b){
		return Vec.norm( Vec.sub( a.point, b.point ) ) < tol && Math.abs( a.p - b.p ) < tol && Vec.norm( Vec.sub( a.uv, b.uv ) ) < tol
	});

}

//
//
//
// Approximate the intersection of a polyline and mesh while maintaining parameter information
//
// **params**
// + array of 3d points on the curve
// + array of parameters corresponding to the parameters on the curve
// + *Object*, a triangular mesh with a "faces" attribute and "points" attribute
// + an array of indices, representing the faces to include in the intersection operation
// + tolerance for the intersection
// 
// **returns** 
// + array of intersection objects (with potential duplicates ) each holding:
// 	- a "point" property where intersections took place
// 	- a "p" the parameter on the polyline
//	- a "uv" the parameter on the mesh
// 	- a "face" the index of the face where the intersection took place
//

public static function parametric_polyline_mesh_by_aabb( crv_points, crv_param_points, mesh, included_faces, tol ) {

	// check if two bounding boxes intersect
	var pl_bb = new verb.BoundingBox( crv_points )
		, mesh_bb = verb.eval.make_mesh_aabb( mesh.points, mesh.faces, included_faces )
		, rec = verb.eval.parametric_polyline_mesh_by_aabb;

	// if bounding boxes do not intersect, return empty array
	if ( !pl_bb.intersects( mesh_bb, tol ) ) {
		return [];
	}

	if ( crv_points.length === 2 && included_faces.length === 1 ){

			// intersect segment and triangle

			var inter = verb.eval.segment_with_tri( crv_points[0], crv_points[1], mesh.points, mesh.faces[ included_faces[0] ] );

			if ( inter != null ){

				// map the parameters of the segment to the parametric space of the entire polyline
			 	var p = inter.p * ( crv_param_points[1]-crv_param_points[0] ) + crv_param_points[0];

			 	// map the parameters of the single triangle to the entire parametric space of the triangle
			 	var index_v0 = mesh.faces[ included_faces ][0]
			 		, index_v1 = mesh.faces[ included_faces ][1]
			 		, index_v2 = mesh.faces[ included_faces ][2]
			 		, uv_v0 = mesh.uvs[ index_v0 ]
			 		, uv_v1 = mesh.uvs[ index_v1 ]
			 		, uv_v2 = mesh.uvs[ index_v2 ]
			 		, uv_s_diff = Vec.sub( uv_v1, uv_v0 )
			 		, uv_t_diff = Vec.sub( uv_v2, uv_v0 )
			 		, uv = Vec.add( uv_v0, Vec.mul( inter.s, uv_s_diff ), Vec.mul( inter.t, uv_t_diff ) );

			 	// a pair representing the param on the polyline and the param on the mesh
			 	return [ { point: inter.point, p: p, uv: uv, face: included_faces[0] } ]; 

			}

	} else if ( included_faces.length === 1 ) {

		// intersect triangle and polyline

		// divide polyline in half, rightside includes the pivot
		var crv_points_a = verb.left( crv_points )
			, crv_points_b = verb.rightWithPivot( crv_points )
			, crv_param_points_a = verb.left( crv_param_points )
			, crv_param_points_b = verb.rightWithPivot( crv_param_points );

		return 	 rec( crv_points_a, crv_param_points_a, mesh, included_faces, tol )
		.concat( rec( crv_points_b, crv_param_points_b, mesh, included_faces, tol ) );

	
	} else if ( crv_points.length === 2 ) {

		// intersect mesh >2 faces and line

		// divide mesh in "half" by first sorting then dividing array in half
		var sorted_included_faces = verb.eval.sort_tris_on_longest_axis( mesh_bb, mesh.points, mesh.faces, included_faces )
			, included_faces_a = verb.left( sorted_included_faces )
			, included_faces_b = verb.right( sorted_included_faces );

		return 		 rec( crv_points, crv_param_points, mesh, included_faces_a, tol )
			.concat( rec( crv_points, crv_param_points, mesh, included_faces_b, tol ));


	} else { 

		// intersect mesh with >2 faces and polyline

		// divide mesh in "half"
		var sorted_included_faces = verb.eval.sort_tris_on_longest_axis( mesh_bb, mesh.points, mesh.faces, included_faces )
			, included_faces_a = verb.left( sorted_included_faces )
			, included_faces_b = verb.right( sorted_included_faces );

		// divide polyline in half, rightside includes the pivot
		var crv_points_a = verb.left( crv_points )
			, crv_points_b = verb.rightWithPivot( crv_points )
			, crv_param_points_a = verb.left( crv_param_points )
			, crv_param_points_b = verb.rightWithPivot( crv_param_points );

		return 	 	 rec( crv_points_a, crv_param_points_a, mesh, included_faces_a, tol )
			.concat( rec( crv_points_a, crv_param_points_a, mesh, included_faces_b, tol ) )
			.concat( rec( crv_points_b, crv_param_points_b, mesh, included_faces_a, tol ) )
			.concat( rec( crv_points_b, crv_param_points_b, mesh, included_faces_b, tol ) );

	}

	return [];

}

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

