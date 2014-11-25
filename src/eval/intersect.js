

//
// ####intersect_rational_curve_surface_by_aabb( degree_u, knots_u, degree_v, knots_v, homo_control_points, degree_crv, knots_crv, homo_control_points_crv, sample_tol, tol )
//
// Get the intersection of a NURBS curve and a NURBS surface by axis-aligned bounding box intersection and refinement
//
// **params**
// + *Number*, integer degree of surface in u direction
// + *Array*, array of nondecreasing knot values in u direction
// + *Number*, integer degree of surface in v direction
// + *Array*, array of nondecreasing knot values in v direction
// + *Array*, 3d array of homogeneous control points, top to bottom is increasing u direction, left to right is increasing v direction,
// and where each control point is an array of length (dim+1)
// + *Number*, integer degree of curve
// + *Array*, array of nondecreasing knot values
// + *Array*, 2d array of homogeneous control points, where each control point is an array of length (dim+1) 
// and form (wi*pi, wi)
// + *Number*, the sample tolerance of the curve
// + *Number*, tolerance for the curve intersection
// + *Number*, integer number of divisions of the surface in the U direction for initial approximation (placeholder until adaptive tess of surfaces)
// + *Number*, integer number of divisions of the surface in the V direction for initial approximation (placeholder until adaptive tess of surfaces)
// 
// **returns** 
// + *Array*, array of intersection objects, each holding:
// 	- a "point" property where intersections took place
// 	- a "p" the parameter on the curve
//	- a "uv" the parameter on the surface
// 	- a "face" the index of the face where the intersection took place
//

verb.eval.nurbs.intersect_rational_curve_surface_by_aabb_refine = function( degree_u, knots_u, degree_v, 
	knots_v, homo_control_points_srf, degree_crv, knots_crv, homo_control_points_crv, sample_tol, tol, 
	divs_u, divs_v ) {

	// get the approximate intersections
	var ints = verb.eval.nurbs.intersect_rational_curve_surface_by_aabb( degree_u, knots_u, degree_v, 
		knots_v, homo_control_points_srf, degree_crv, knots_crv, homo_control_points_crv, sample_tol, tol, 
		divs_u, divs_v );

	// refine them
	return ints.map(function( inter ){

		// get intersection params
		var start_params = [inter.p, inter.uv[0], inter.uv[1] ]

		// refine the parameters
			, refined_params = verb.eval.nurbs.refine_rational_curve_surface_intersection( degree_u, knots_u, degree_v, knots_v, homo_control_points_srf, degree_crv, knots_crv, homo_control_points_crv, start_params );
	
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
// ####refine_rational_curve_surface_intersection( degree_u, knots_u, degree_v, knots_v, homo_control_points_srf, degree_crv, knots_crv, homo_control_points_crv, start_params )
//
// Refine an intersection pair for a surface and curve given an initial guess.  This is an unconstrained minimization,
// so the caller is responsible for providing a very good initial guess.
//
// **params**
// + *Number*, integer degree of surface in u direction
// + *Array*, array of nondecreasing knot values in u direction
// + *Number*, integer degree of surface in v direction
// + *Array*, array of nondecreasing knot values in v direction
// + *Array*, 3d array of homogeneous control points, top to bottom is increasing u direction, left to right is increasing v direction,
// and where each control point is an array of length (dim+1)
// + *Number*, integer degree of curve
// + *Array*, array of nondecreasing knot values
// + *Array*, 2d array of homogeneous control points, where each control point is an array of length (dim+1) 
// and form (wi*pi, wi)
// + *Array*, array of initial parameter values [ u_crv, u_srf, v_srf ]
// 
// **returns** 
// + *Array*, a length 3 array containing the [ u_crv, u_srf, v_srf, final_distance ]
//

verb.eval.nurbs.refine_rational_curve_surface_intersection = function( degree_u, knots_u, degree_v, knots_v, homo_control_points_srf, degree_crv, knots_crv, homo_control_points_crv, start_params ) {

	var objective = function(x) { 

		var p1 = verb.eval.nurbs.rational_curve_point(degree_crv, knots_crv, homo_control_points_crv, x[0])
			, p2 = verb.eval.nurbs.rational_surface_point( degree_u, knots_u,  degree_v, knots_v, homo_control_points_srf, x[1], x[2] )
			, p1_p2 = numeric.sub(p1, p2);

		return numeric.dot(p1_p2, p1_p2);
	}

	var sol_obj = numeric.uncmin( objective, start_params);
	return sol_obj.solution.concat( sol_obj.f );

}



//
// ####intersect_rational_curve_surface_by_aabb( degree_u, knots_u, degree_v, knots_v, homo_control_points, degree_crv, knots_crv, homo_control_points_crv, sample_tol, tol )
//
// Approximate the intersection of two nurbs surface by axis-aligned bounding box intersection.
//
// **params**
// + *Number*, integer degree of surface in u direction
// + *Array*, array of nondecreasing knot values in u direction
// + *Number*, integer degree of surface in v direction
// + *Array*, array of nondecreasing knot values in v direction
// + *Array*, 3d array of homogeneous control points, top to bottom is increasing u direction, left to right is increasing v direction,
// and where each control point is an array of length (dim+1)
// + *Number*, integer degree of curve
// + *Array*, array of nondecreasing knot values
// + *Array*, 2d array of homogeneous control points, where each control point is an array of length (dim+1) 
// and form (wi*pi, wi)
// + *Array*, array of initial parameter values [ u_crv, u_srf, v_srf ]
// + *Number*, the sample tolerance of the curve
// + *Number*, tolerance for the curve intersection
// + *Number*, integer number of divisions of the surface in the U direction
// + *Number*, integer number of divisions of the surface in the V direction
// 
// **returns** 
// + *Array*, array of intersection objects, each holding:
// 	- a "point" property where intersections took place
// 	- a "p" the parameter on the polyline
//	- a "uv" the parameter on the mesh
// 	- a "face" the index of the face where the intersection took place
//

verb.eval.nurbs.intersect_rational_curve_surface_by_aabb = function( degree_u, knots_u, degree_v, knots_v, homo_control_points_srf, degree_crv, knots_crv, homo_control_points_crv, sample_tol, tol, divs_u, divs_v ) {

	// tessellate the curve
	var crv = verb.eval.nurbs.rational_curve_adaptive_sample( degree_crv, knots_crv, homo_control_points_crv, sample_tol, true)

	// tessellate the surface
		, mesh = verb.eval.nurbs.tessellate_rational_surface_naive( degree_u, knots_u, degree_v, knots_v, homo_control_points_srf, divs_u, divs_v )

	// separate parameters from points in the polyline (params are the first index in the array)
		, u1 = crv.map( function(el) { return el[0]; })
		, p1 = crv.map( function(el) { return el.slice(1) })

	// perform intersection
		, res = verb.eval.nurbs.intersect_parametric_polyline_mesh_by_aabb( p1, u1, mesh, verb.range(mesh.faces.length), tol );

	// eliminate duplicate intersections
	return verb.unique( res, function(a, b){
		return numeric.norm2( numeric.sub( a.point, b.point ) ) < tol && Math.abs( a.p - b.p ) < tol && numeric.norm2( numeric.sub( a.uv, b.uv ) ) < tol
	});

}

//
// ####intersect_parametric_polyline_mesh_by_aabb( crv_points, crv_param_points, mesh, included_faces, tol )
//
// Approximate the intersection of a polyline and mesh while maintaining parameter information
//
// **params**
// + *Array*, array of 3d points on the curve
// + *Array*, array of parameters corresponding to the parameters on the curve
// + *Object*, a triangular mesh with a "faces" attribute and "points" attribute
// + *Array*, an array of indices, representing the faces to include in the intersection operation
// + *Number*, tolerance for the intersection
// 
// **returns** 
// + *Array*, array of intersection objects (with potential duplicates ) each holding:
// 	- a "point" property where intersections took place
// 	- a "p" the parameter on the polyline
//	- a "uv" the parameter on the mesh
// 	- a "face" the index of the face where the intersection took place
//

verb.eval.nurbs.intersect_parametric_polyline_mesh_by_aabb = function( crv_points, crv_param_points, mesh, included_faces, tol ) {

	// check if two bounding boxes intersect
	var pl_bb = new verb.geom.BoundingBox( crv_points )
		, mesh_bb = verb.eval.mesh.make_mesh_aabb( mesh.points, mesh.faces, included_faces )
		, rec = verb.eval.nurbs.intersect_parametric_polyline_mesh_by_aabb;

	// if bounding boxes do not intersect, return empty array
	if ( !pl_bb.intersects( mesh_bb, tol ) ) {
		return [];
	}

	if ( crv_points.length === 2 && included_faces.length === 1 ){

			// intersect segment and triangle

			var inter = verb.eval.geom.intersect_segment_with_tri( crv_points[0], crv_points[1], mesh.points, mesh.faces[ included_faces[0] ] );

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
			 		, uv_s_diff = numeric.sub( uv_v1, uv_v0 )
			 		, uv_t_diff = numeric.sub( uv_v2, uv_v0 )
			 		, uv = numeric.add( uv_v0, numeric.mul( inter.s, uv_s_diff ), numeric.mul( inter.t, uv_t_diff ) );

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
		var sorted_included_faces = verb.eval.mesh.sort_tris_on_longest_axis( mesh_bb, mesh.points, mesh.faces, included_faces )
			, included_faces_a = verb.left( sorted_included_faces )
			, included_faces_b = verb.right( sorted_included_faces );

		return 		 rec( crv_points, crv_param_points, mesh, included_faces_a, tol )
			.concat( rec( crv_points, crv_param_points, mesh, included_faces_b, tol ));


	} else { 

		// intersect mesh with >2 faces and polyline

		// divide mesh in "half"
		var sorted_included_faces = verb.eval.mesh.sort_tris_on_longest_axis( mesh_bb, mesh.points, mesh.faces, included_faces )
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

//
// ####intersect_segment_with_tri(  p1, p0, points, tri )
//
//  Intersect segment with triangle (from http://geomalgorithms.com/a06-_intersect-2.html)
//
// **params**
// + *Array*, array of length 3 representing first point of the segment
// + *Array*, array of length 3 representing second point of the segment
// + *Array*, array of length 3 arrays representing the points of the triangle
// + *Array*, array of length 3 containing int indices in the array of points, this allows passing a full mesh
// 
// **returns** 
// + *Object*, an object with an "intersects" property that is true or false and if true, a 
// "s" property giving the param on u, and "t" is the property on v, where u is the 
// axis from v0 to v1, and v is v0 to v1, a "point" property
// where the intersection took place, and "p" property representing the parameter along the segment
//

verb.eval.geom.intersect_segment_with_tri = function( p0, p1, points, tri ) {

	var v0 = points[ tri[0] ]
		, v1 = points[ tri[1] ]
		, v2 = points[ tri[2] ]
		, u = numeric.sub( v1, v0 )
		, v = numeric.sub( v2, v0 )
		, n = numeric.cross( u, v );

	var dir = numeric.sub( p1, p0 )
		, w0 = numeric.sub( p0, v0 )
		, a = -numeric.dot( n, w0 )
		, b = numeric.dot( n, dir )

	// is ray is parallel to triangle plane?
	if ( Math.abs( b ) < verb.EPSILON ){ 
		return null;
	}

	var r = a / b;

	// segment goes away from triangle or is beyond segment
	if ( r < 0 || r > 1 ){
		return null;
	}

	// get proposed intersection
	var pt = numeric.add( p0, numeric.mul( r, dir ) );

	// is I inside T?
	var uv = numeric.dot(u,v)
		, uu = numeric.dot(u,u)
		, vv = numeric.dot(v,v)
		, w = numeric.sub( pt, v0 )
		, wu = numeric.dot( w, u )
		, wv = numeric.dot( w, v )
		, denom = uv * uv - uu * vv
		, s = ( uv * wv - vv * wu ) / denom
		, t = ( uv * wu - uu * wv ) / denom;

	if (s > 1.0 + verb.EPSILON || t > 1.0 + verb.EPSILON || t < -verb.EPSILON || s < -verb.EPSILON || s + t > 1.0 + verb.EPSILON){
		return null;
	}

	return { point: pt, s: s, t: t, p: r };

}

//
// ####intersect_segment_with_plane( p0, p1, v0, n )
//
//  Intersect ray/segment with plane (from http://geomalgorithms.com/a06-_intersect-2.html)
//
//  If intersecting a ray, the param needs to be between 0 and 1 and the caller is responsible
//  for making that check
//
// **params**
// + *Array*, array of length 3 representing first point of the segment
// + *Array*, array of length 3 representing second point of the segment
// + *Array*, array of length 3 representing an origin point on the plane
// + *Array*, array of length 3 representing the normal of the plane
// 
// **returns** 
// null or an object with a p property representing the param on the segment
//

verb.eval.geom.intersect_segment_with_plane = function( p0, p1, v0, n ) {

	var denom = numeric.dot( n, numeric.sub(p0,p1) );

	// parallel case
	if ( abs( denom ) < EPSILON ) { 
   	return null;
 	}

 	var numer = numeric.dot( n, numeric.sub(v0,p0) );

	return { p: numer / denom };

}

//
// ####intersect_aabb_trees( points1, tris1, points2, tris2, aabb_tree1, aabb_tree2 )
//
//  Intersect two aabb trees - a recursive function
//
// **params**
// + *Array*, array of length 3 arrays of numbers representing the points of mesh1
// + *Array*, array of length 3 arrays of number representing the triangles of mesh1
// + *Array*, array of length 3 arrays of numbers representing the points of mesh2
// + *Array*, array of length 3 arrays of number representing the triangles of mesh2
// + *Object*, nested object representing the aabb tree of the first mesh
// + *Object*, nested object representing the aabb tree of the second mesh
// 
// **returns** 
// + *Array*, a list of pairs of triangle indices for mesh1 and mesh2 that are intersecting
//

verb.eval.geom.intersect_aabb_trees = function( points1, tris1, points2, tris2, aabb_tree1, aabb_tree2 ) {

  var intersects = aabb_tree1.bounding_box.intersects( aabb_tree2.bounding_box );

  var recur = verb.eval.geom.intersect_aabb_trees;

  if (!intersects){
  	return [];
  }

  if (aabb_tree1.children.length === 0 && aabb_tree2.children.length === 0){ 

  	return [ [aabb_tree1.triangle, aabb_tree2.triangle ] ]; 

  } else if (aabb_tree1.children.length === 0 && aabb_tree2.children.length != 0){

  	return     recur( points1, tris1, points2, tris2, aabb_tree1, aabb_tree2.children[0] )
  		.concat( recur( points1, tris1, points2, tris2, aabb_tree1, aabb_tree2.children[1] ) );

  } else if (aabb_tree1.children.length != 0 && aabb_tree2.children.length === 0){

  	return     recur( points1, tris1, points2, tris2, aabb_tree1.children[0], aabb_tree2 )
  		.concat( recur( points1, tris1, points2, tris2, aabb_tree1.children[1], aabb_tree2 ) );

  } else if (aabb_tree1.children.length != 0 && aabb_tree2.children.length != 0){

  	return     recur( points1, tris1, points2, tris2, aabb_tree1.children[0], aabb_tree2.children[0] )
  		.concat( recur( points1, tris1, points2, tris2, aabb_tree1.children[0], aabb_tree2.children[1] ) )
  		.concat( recur( points1, tris1, points2, tris2, aabb_tree1.children[1], aabb_tree2.children[0] ) )
  		.concat( recur( points1, tris1, points2, tris2, aabb_tree1.children[1], aabb_tree2.children[1] ) );

  }

}

//
// ####make_mesh_aabb_tree( points, tris, tri_indices )
//
// Make tree of axis aligned bounding boxes 
//
// **params**
// + *Array*, array of length 3 arrays of numbers representing the points
// + *Array*, array of length 3 arrays of number representing the triangles
// + *Array*, array of numbers representing the relevant triangles to use to form aabb
// 
// **returns** 
// + *Array*, a point represented by an array of length (dim)
//

verb.eval.mesh.make_mesh_aabb_tree = function( points, tris, tri_indices ) {

	// build bb
	var aabb = { 	bounding_box: verb.eval.mesh.make_mesh_aabb( points, tris, tri_indices ), 
								children: [] };

	// if only one ele, terminate recursion and store the triangles
	if (tri_indices.length === 1){
		aabb.triangle = tri_indices[0];
		return aabb;
	}

	// sort triangles in sub mesh
	var sorted_tri_indices = verb.eval.mesh.sort_tris_on_longest_axis( aabb.bounding_box, points, tris, tri_indices )
		, tri_indices_a = sorted_tri_indices.slice( 0, Math.floor( sorted_tri_indices.length / 2 ) )
		, tri_indices_b = sorted_tri_indices.slice( Math.floor( sorted_tri_indices.length / 2 ), sorted_tri_indices.length );

	// recurse 
	aabb.children = [ verb.eval.mesh.make_mesh_aabb_tree(points, tris, tri_indices_a), 
										verb.eval.mesh.make_mesh_aabb_tree(points, tris, tri_indices_b) ];

	// return result
	return aabb;

}

//
// ####make_mesh_aabb( points, tris, tri_indices )
//
// Form axis-aligned bounding box from triangles of mesh
//
// **params**
// + *Array*, array of length 3 arrays of numbers representing the points
// + *Array*, array of length 3 arrays of number representing the triangles
// + *Array*, array of numbers representing the relevant triangles
// 
// **returns** 
// + *Array*, a point represented by an array of length (dim)
//

verb.eval.mesh.make_mesh_aabb = function( points, tris, tri_indices ) {

	var bb = new verb.geom.BoundingBox();

	tri_indices.forEach(function(x){
		bb.add( points[ tris[ x ][0] ] );
		bb.add( points[ tris[ x ][1] ] );
		bb.add( points[ tris[ x ][2] ] );
	});

	return bb;

}

//
// ####sort_tris_on_longest_axis( container_bb, points, tris, tri_indices )
//
// Sort triangles on longest axis
//
// **params**
// + *Number*, integer degree of surface in u direction
// + *Array*, array of nondecreasing knot values in u direction
// + *Number*, integer degree of surface in v direction
// + *Array*, array of nondecreasing knot values in v direction
// 
// **returns** 
// + *Array*, a point represented by an array of length (dim)
//

verb.eval.mesh.sort_tris_on_longest_axis = function( container_bb, points, tris, tri_indices ) {

	var long_axis = container_bb.get_longest_axis();

	var axis_position_map = [];
	for (var i = tri_indices.length - 1; i >= 0; i--) {

		var tri_i = tri_indices[i],
			tri_min = verb.eval.mesh.get_min_coordinate_on_axis( points, tris[ tri_i ], long_axis );

		axis_position_map.push( [ tri_min, tri_i ] );

	}

	axis_position_map.sort(function(a,b) { return a[0] > b[0] } );

	var sorted_tri_indices = [];
	for (var i = 0, l = axis_position_map.length; i < l; i++) {
		sorted_tri_indices.push( axis_position_map[i][1] );
	}

	return sorted_tri_indices;

}

//
// ####get_min_coordinate_on_axis( points, tri, axis )
//
// Get min coordinate on axis
//
// **params**
// + *Array*, array of length 3 arrays of numbers representing the points
// + *Array*, length 3 array of point indices for the triangle
// 
// **returns** 
// + *Number*, a point represented by an array of length 3
//

verb.eval.mesh.get_min_coordinate_on_axis = function( points, tri, axis ) {

	var axis_coords = [];

	for (var i = 0; i < 3; i++){
		axis_coords.push( points[ tri[i] ][ axis ] );
	}

	return Math.min.apply(Math, axis_coords);
};

//
// ####get_tri_centroid( points, tri )
//
// Get triangle centroid
//
// **params**
// + *Array*, array of length 3 arrays of numbers representing the points
// + *Array*, length 3 array of point indices for the triangle
// 
// **returns** 
// + *Array*, a point represented by an array of length 3
//

verb.eval.geom.get_tri_centroid = function( points, tri ) {

	var centroid = [0,0,0];

	for (var i = 0; i < 3; i++){
		for (var j = 0; j < 3; j++){
			centroid[j] += points[ tri[i] ][j];
		}
	}

	for (var i = 0; i < 3; i++){
		centroid[i] /= 3;
	}

	return centroid;

};

//
// ####get_tri_norm( points, tri )
//
// Get triangle normal
//
// **params**
// + *Array*, array of length 3 arrays of numbers representing the points
// + *Array*, length 3 array of point indices for the triangle
// 
// **returns** 
// + *Array*, a normal vector represented by an array of length 3
//

verb.eval.geom.get_tri_norm = function( points, tri ) {

	var v0 = points[ tri[0] ]
		, v1 = points[ tri[1] ]
		, v2 = points[ tri[2] ]
		, u = numeric.sub( v1, v0 )
		, v = numeric.sub( v2, v0 )
		, n = numeric.cross( u, v );

	return numeric.mul( 1 / numeric.norm2( n ), n );

};

//
// ####intersect_rational_curves_by_aabb_refine( degree1, knots1, homo_control_points1, degree2, knots2, homo_control_points2, sample_tol, tol )
//
// Approximate the intersection of two nurbs surface by axis-aligned bounding box intersection and then refine all solutions.
//
// **params**
// + *Number*, integer degree of curve1
// + *Array*, array of nondecreasing knot values for curve 1
// + *Array*, 2d array of homogeneous control points, where each control point is an array of length (dim+1) and form (wi*pi, wi) for curve 1
// + *Number*, integer degree of curve2
// + *Array*, array of nondecreasing knot values for curve 2
// + *Array*, 2d array of homogeneous control points, where each control point is an array of length (dim+1) and form (wi*pi, wi) for curve 2
// + *Number*, tolerance for the intersection
// 
// **returns** 
// + *Array*, a 2d array specifying the intersections on u params of intersections on curve 1 and cruve 2
//

verb.eval.nurbs.intersect_rational_curves_by_aabb_refine = function( degree1, knots1, homo_control_points1, degree2, knots2, homo_control_points2, sample_tol, tol ) {

	var ints = verb.eval.nurbs.intersect_rational_curves_by_aabb( degree1, knots1, homo_control_points1, degree2, knots2, homo_control_points2, sample_tol, tol );

	return ints.map(function(start_params){
		return verb.eval.nurbs.refine_rational_curve_intersection( degree1, knots1, homo_control_points1, degree2, knots2, homo_control_points2, start_params )
	});

}


//
// ####rational_curve_curve_bb_intersect_refine( degree1, knots1, control_points1, degree2, knots2, control_points2, start_params )
//
// Refine an intersection pair for two curves given an initial guess.  This is an unconstrained minimization,
// so the caller is responsible for providing a very good initial guess.
//
// **params**
// + *Number*, integer degree of curve1
// + *Array*, array of nondecreasing knot values for curve 1
// + *Array*, 2d array of homogeneous control points, where each control point is an array of length (dim+1) 
 									// and form (wi*pi, wi) for curve 1
// + *Number*, integer degree of curve2
// + *Array*, array of nondecreasing knot values for curve 2
// + *Array*, 2d array of homogeneous control points, where each control point is an array of length (dim+1) 
 									// and form (wi*pi, wi) for curve 2
// + *Array*, length 2 array with first param guess in first position and second param guess in second position
// 
// **returns** 
// + *Array*, a length 3 array containing the [ distance// distance, u1, u2 ]
//

verb.eval.nurbs.refine_rational_curve_intersection = function( degree1, knots1, control_points1, degree2, knots2, control_points2, start_params ) {

	var objective = function(x) { 

		var p1 = verb.eval.nurbs.rational_curve_point(degree1, knots1, control_points1, x[0])
			, p2 = verb.eval.nurbs.rational_curve_point(degree2, knots2, control_points2, x[1])
			, p1_p2 = numeric.sub(p1, p2);

		return numeric.dot(p1_p2, p1_p2);
	}

	var sol_obj = numeric.uncmin( objective, start_params);
	return sol_obj.solution.concat( sol_obj.f );

}

//
// ####intersect_rational_curves_by_aabb( degree1, knots1, homo_control_points1, degree2, knots2, homo_control_points2, sample_tol, tol )
//
// Approximate the intersection of two nurbs surface by axis-aligned bounding box intersection.
//
// **params**
// + *Number*, integer degree of curve1
// + *Array*, array of nondecreasing knot values for curve 1
// + *Array*, 2d array of homogeneous control points, where each control point is an array of length (dim+1) and form (wi*pi, wi) for curve 1
// + *Number*, integer degree of curve2
// + *Array*, array of nondecreasing knot values for curve 2
// + *Array*, 2d array of homogeneous control points, where each control point is an array of length (dim+1) and form (wi*pi, wi) for curve 2
// + *Number*, tolerance for the intersection
// 
// **returns** 
// + *Array*, array of parameter pairs representing the intersection of the two parameteric polylines
//

verb.eval.nurbs.intersect_rational_curves_by_aabb = function( degree1, knots1, homo_control_points1, degree2, knots2, homo_control_points2, sample_tol, tol ) {

	var up1 = verb.eval.nurbs.rational_curve_adaptive_sample( degree1, knots1, homo_control_points1, sample_tol, true)
		, up2 = verb.eval.nurbs.rational_curve_adaptive_sample( degree2, knots2, homo_control_points2, sample_tol, true)
		, u1 = up1.map( function(el) { return el[0]; })
		, u2 = up2.map( function(el) { return el[0]; })
		, p1 = up1.map( function(el) { return el.slice(1) })
		, p2 = up2.map( function(el) { return el.slice(1) });

	return verb.eval.nurbs.intersect_parametric_polylines_by_aabb( p1, p2, u1, u2, tol );

}

//
// ####intersect_parametric_polylines_by_aabb( p1, p2, u1, u2, tol )
//
// Intersect two polyline curves, keeping track of parameterization on each
//
// **params**
// + *Array*, array of point values for curve 1
// + *Array*, array of parameter values for curve 1, same length as first arg
// + *Array*, array of point values for curve 2
// + *Array*, array of parameter values for curve 2, same length as third arg
// + *Number*, tolerance for the intersection
// 
// **returns** 
// + *Array*, array of parameter pairs representing the intersection of the two parameteric polylines
//

verb.eval.nurbs.intersect_parametric_polylines_by_aabb = function( p1, p2, u1, u2, tol ) {

	var bb1 = new verb.geom.BoundingBox(p1)
		, bb2 = new verb.geom.BoundingBox(p2);

	if ( !bb1.intersects(bb2, tol) ) {
		return [];
	}

	if (p1.length === 2 && p2.length === 2 ){

			var inter = verb.eval.geom.intersect_segments(p1[0],p1[1], p2[0], p2[1], tol);

			if ( inter != null ){

				// map the parameters of the segment to the parametric space of the entire polyline
			 	inter[0][0] = inter[0][0] * ( u1[1]-u1[0] ) + u1[0];
			 	inter[1][0] = inter[1][0] * ( u2[1]-u2[0] ) + u2[0];

			 	return [ [ inter[0][0], inter[1][0] ] ];

			} 

	} else if (p1.length === 2) {

		var p2_mid = Math.ceil( p2.length / 2 ),
				p2_a = p2.slice( 0, p2_mid ),
				p2_b = p2.slice( p2_mid-1 ),
				u2_a = u2.slice( 0, p2_mid ),
				u2_b = u2.slice( p2_mid-1 );

		return 	 verb.eval.nurbs.intersect_parametric_polylines_by_aabb(p1, p2_a, u1, u2_a, tol)
		.concat( verb.eval.nurbs.intersect_parametric_polylines_by_aabb(p1, p2_b, u1, u2_b, tol) );

	} else if (p2.length === 2) {

		var p1_mid = Math.ceil( p1.length / 2 ),
				p1_a = p1.slice( 0, p1_mid ),
				p1_b = p1.slice( p1_mid-1 ),
				u1_a = u1.slice( 0, p1_mid ),
				u1_b = u1.slice( p1_mid-1 );

		return 		 verb.eval.nurbs.intersect_parametric_polylines_by_aabb(p1_a, p2, u1_a, u2, tol)
			.concat( verb.eval.nurbs.intersect_parametric_polylines_by_aabb(p1_b, p2, u1_b, u2, tol) );

	} else {

		var p1_mid = Math.ceil( p1.length / 2 ),
				p1_a = p1.slice( 0, p1_mid ),
				p1_b = p1.slice( p1_mid-1 ),
				u1_a = u1.slice( 0, p1_mid ),
				u1_b = u1.slice( p1_mid-1 ),

				p2_mid = Math.ceil( p2.length / 2 ),
				p2_a = p2.slice( 0, p2_mid ),
				p2_b = p2.slice( p2_mid-1 ),
				u2_a = u2.slice( 0, p2_mid ),
				u2_b = u2.slice( p2_mid-1 );

		return 		 verb.eval.nurbs.intersect_parametric_polylines_by_aabb(p1_a, p2_a, u1_a, u2_a, tol)
			.concat( verb.eval.nurbs.intersect_parametric_polylines_by_aabb(p1_a, p2_b, u1_a, u2_b, tol) )
			.concat( verb.eval.nurbs.intersect_parametric_polylines_by_aabb(p1_b, p2_a, u1_b, u2_a, tol) )
			.concat( verb.eval.nurbs.intersect_parametric_polylines_by_aabb(p1_b, p2_b, u1_b, u2_b, tol) );

	}

	return [];

}

//
// ####intersect_segments( a0, a1, b0, b1, tol )
//
// Find the closest parameter on two rays, see http://geomalgorithms.com/a07-_distance.html
//
// **params**
// + *Array*, first point on a
// + *Array*, second point on a
// + *Array*, first point on b
// + *Array*, second point on b
// + *Number*, tolerance for the intersection
// 
// **returns** 
// + *Array*, a 2d array specifying the intersections on u params of intersections on curve 1 and cruve 2
//

verb.eval.geom.intersect_segments = function( a0, a1, b0, b1, tol ) {

	// get axis and length of segments
	var a1ma0 = numeric.sub(a1, a0),
			aN = Math.sqrt( numeric.dot(a1ma0, a1ma0) ),
			a = numeric.mul( 1/ aN, a1ma0 ),
			b1mb0 = numeric.sub(b1, b0),
			bN = Math.sqrt( numeric.dot(b1mb0, b1mb0) ),
			b = numeric.mul( 1 / bN, b1mb0 ),
			int_params = verb.eval.geom.intersect_rays(a0, a, b0, b);

	if ( int_params != null ) {

		var u1 = Math.min( Math.max( 0, int_params[0] / aN ), 1.0),
				u2 = Math.min( Math.max( 0, int_params[1] / bN ), 1.0),
				int_a = numeric.add( numeric.mul( u1, a1ma0 ), a0 ),
				int_b = numeric.add( numeric.mul( u2, b1mb0 ), b0 ),
				dist = numeric.norm2Squared( numeric.sub(int_a, int_b) );

		if (  dist < tol*tol ) {
			return [ [u1].concat(int_a), [u2].concat(int_b) ] ;
		} 

	}
	
	return null;

 }

//
// ####closest_point_on_ray( pt, o, r )
//
// Find the closest point on a ray
//
// **params**
// + *Array*, point to project
// + *Array*, origin for ray
// + *Array*, direction of ray 1, assumed normalized
// 
// **returns** 
// + *Array*, pt
//

verb.eval.geom.closest_point_on_ray = function( pt, o, r ) {

		var o2pt = numeric.sub(pt,o)
			, do2ptr = numeric.dot(o2pt, r)
			, proj = numeric.add(o, numeric.mul(do2ptr, r));

		return proj;

 }

//
// ####dist_to_ray( pt, o, r )
//
// Find the distance of a point to a ray
//
// **params**
// + *Array*, point to project
// + *Array*, origin for ray
// + *Array*, direction of ray 1, assumed normalized
// 
// **returns** 
// + *Number*, the distance
//

verb.eval.geom.dist_to_ray = function( pt, o, r ) {

	var d = verb.eval.geom.closest_point_on_ray( pt, o, r );
	var dif = numeric.sub( d, pt );

	return numeric.norm2( dif );

 }


//
// ####intersect_rays( a0, a, b0, b )
//
// Find the closest parameter on two rays, see http://geomalgorithms.com/a07-_distance.html
//
// **params**
// + *Array*, origin for ray 1
// + *Array*, direction of ray 1, assumed normalized
// + *Array*, origin for ray 1
// + *Array*, direction of ray 1, assumed normalized
// 
// **returns** 
// + *Array*, a 2d array specifying the intersections on u params of intersections on curve 1 and curve 2
//

verb.eval.geom.intersect_rays = function( a0, a, b0, b ) {

   var dab = numeric.dot( a, b ),
		   dab0 = numeric.dot( a, b0 ),
		   daa0 = numeric.dot( a, a0 ),
		   dbb0 = numeric.dot( b, b0 ),
		   dba0 = numeric.dot( b, a0 ),
		   daa = numeric.dot( a, a ),
		   dbb = numeric.dot( b, b ),
		   div = daa*dbb - dab*dab;

	// parallel case
   if ( Math.abs( div ) < verb.EPSILON ) { 
	   return null;
   }

   var num = dab * (dab0-daa0) - daa * (dbb0-dba0),
   		 w = num / div,
			 t = (dab0 - daa0 + w * dab)/daa;

		return [t, w];

}

verb.eval.geom.intersect_3_planes = function(n0, d0, n1, d1, n2, d2){

	var u = numeric.cross( n1, n2 );
	var den = numeric.dot( n0, u );

	if (Math.abs(den) < verb.EPSILON) return null;

	var num = numeric.add(
							numeric.mul( d0, u ), 
							numeric.cross( n0, 
								numeric.sub( 	numeric.mul( d2, n1 ), numeric.mul( d1, n2 ) )));

	return numeric.mul( 1 / den, num );

}

verb.eval.nurbs.refine_rational_surface_intersect_point = function(uv1, uv2, degree_u1, knots_u1, degree_v1, knots_v1, homo_control_points1, degree_u2, knots_u2, degree_v2, knots_v2, homo_control_points2, tol){

 var pds, p, pn, pu, pv, pd, qds, q, qn, qu, qv, qd, dist;
 var maxits = 1;
 var its = 0;

 var r = function(u, v){
 	return verb.eval.nurbs.rational_surface_derivs( degree_u1, knots_u1, degree_v1, knots_v1, 
			homo_control_points1, 1, u, v );
 }

 var s = function(u, v){
 	return verb.eval.nurbs.rational_surface_derivs( degree_u2, knots_u2, degree_v2, knots_v2, 
			homo_control_points2, 1, u, v );
 }

 do {

	// 1) eval normals, pts on respective surfaces (p, q, pn, qn)

		pds = r( uv1[0], uv1[1] );
		p = pds[0][0];
		pu = pds[1][0];
		pv = pds[0][1];
		pn = numeric.normalized( numeric.cross( pu, pv ) );
		pd = numeric.dot( pn, p );
		
		qds = s( uv2[0], uv2[1] );
		q = qds[0][0];
		qu = qds[1][0];
		qv = qds[0][1];
		qn = numeric.normalized( numeric.cross( qu, qv ) );
		qd = numeric.dot( qn, q );

		// if tolerance is met, exit loop
		dist = numeric.norm2( numeric.sub(p, q) );

		
		if (dist < tol) {
			console.log("distf = ", dist);
			break;
		}

 	// 2) construct plane perp to both that passes through p (fn)

		var fn = numeric.normalized( numeric.cross( pn, qn ) );
		var fd = numeric.dot( fn, p );

 	// 3) x = intersection of all 3 planes
		var x = verb.eval.geom.intersect_3_planes( pn, pd, qn, qd, fn, fd );

		if (x === null) throw new Error("panic!")

 	// 4) represent the difference vectors (pd = x - p, qd = x - q) in the partial 
	// 		derivative vectors of the respective surfaces (pu, pv, qu, qv)

		var pdif = numeric.sub( x, p );
		var qdif = numeric.sub( x, q );

		var rw = numeric.cross( pu, pn ); 
		var rt = numeric.cross( pv, pn );

		var su = numeric.cross( qu, qn );
		var sv = numeric.cross( qv, qn );

		var dw = numeric.dot( rt, pdif ) / numeric.dot( rt, pu );
		var dt = numeric.dot( rw, pdif ) / numeric.dot( rw, pv );

		var du = numeric.dot( sv, qdif ) / numeric.dot( sv, qu );
		var dv = numeric.dot( su, qdif ) / numeric.dot( su, qv );

		uv1 = numeric.add( [dw, dt], uv1 );
		uv2 = numeric.add( [du, dv], uv2 );

 	// repeat
 		its++;

 } while( its < maxits ) // tolerance is not met? not sure what this should be

 return {uv1: uv1, uv2: uv2, pt: p, d: dist };

}

verb.eval.nurbs.intersect_rational_surface_surface_by_aabb_refine = function( degree_u1, knots_u1, degree_v1, knots_v1, homo_control_points_srf1, degree_u2, knots_u2, degree_v2, knots_v2, homo_control_points_srf2, tol, divs_u, divs_v ) {

	// 1) tessellate the meshes to get the approximate intersections
	var tess1 = verb.eval.nurbs.tessellate_rational_surface_naive( degree_u1, knots_u1, degree_v1, knots_v1, homo_control_points_srf1, divs_u, divs_v );
	var tess2 = verb.eval.nurbs.tessellate_rational_surface_naive( degree_u2, knots_u2, degree_v2, knots_v2, homo_control_points_srf2, divs_u, divs_v );
	var resApprox = verb.eval.mesh.intersect_meshes_by_aabb( tess1.points, tess1.faces, tess1.uvs, tess2.points, tess2.faces, tess2.uvs );

	// 2) refine the intersection points so that they lie on both surfaces
	var exactPls = resApprox.map(function(pl){
		return pl.map( function(inter){
			return verb.eval.nurbs.refine_rational_surface_intersect_point(inter.uvtri1, inter.uvtri2, degree_u1, knots_u1, degree_v1, knots_v1, homo_control_points_srf1, 
				degree_u2, knots_u2, degree_v2, knots_v2, homo_control_points_srf2, tol );
		});
	});

	// 3) perform cubic interpolation
	return exactPls.map(function(x){
		return verb.eval.nurbs.rational_interp_curve( x.map(function(x){ return x.pt; }), 3 ); 
	});

	// TODO: represent this in uv space
	// TODO: refine between initial points
	// TODO: use adaptive sampling of surfaces

}

verb.eval.mesh.intersect_meshes_by_aabb = function( points1, tris1, uvs1, points2, tris2, uvs2 ) {

	// build aabb for each mesh
	var tri_indices1 = verb.range(tris1.length)
	  , tri_indices2 = verb.range(tris2.length)
	  , aabb1 = verb.eval.mesh.make_mesh_aabb_tree( points1, tris1, tri_indices1 )
	  , aabb2 = verb.eval.mesh.make_mesh_aabb_tree( points2, tris2, tri_indices2 );

  // intersect and get the pairs of triangle intersctions
	var bbints = verb.eval.geom.intersect_aabb_trees( points1, tris1, points2, tris2, aabb1, aabb2 );

	// get the segments of the intersection crv with uvs
	var segments = bbints.map(function(ids){
													var res = verb.eval.geom.intersect_tris( points1, tris1[ ids[0] ], uvs1, points2, tris2[ ids[1] ], uvs2 );
													if (!res) return res;

													res[0].tri1id = ids[0];
													res[1].tri1id = ids[0];
													res[0].tri2id = ids[1];
													res[1].tri2id = ids[1];

													return res;
												})
												.filter(function(x){ return x; })
												.filter(function(x){ 
													var dif = numeric.sub( x[0].pt, x[1].pt );
													return numeric.dot( dif, dif ) > verb.TOLERANCE 
												});

	// TODO: this is too expensive and this only occurs when the intersection
	// 			 line is on an edge.  we should mark these to avoid doing all of 
	//			 these computations
	segments = verb.unique( segments, function(a, b){

		var s1 = numeric.sub( a[0].uvtri1, b[0].uvtri1 );
		var d1 = numeric.dot( s1, s1 );

		var s2 = numeric.sub( a[1].uvtri1, b[1].uvtri1 );
		var d2 = numeric.dot( s2, s2 );

		var s3 = numeric.sub( a[0].uvtri1, b[1].uvtri1 );
		var d3 = numeric.dot( s3, s3 );

		var s4 = numeric.sub( a[1].uvtri1, b[0].uvtri1 );
		var d4 = numeric.dot( s4, s4 );

		return ( d1 < verb.TOLERANCE && d2 < verb.TOLERANCE ) || 
			( d3 < verb.TOLERANCE && d4 < verb.TOLERANCE );

	});

	if (segments.length === 0) return [];

	return verb.eval.mesh.make_intersect_polylines( segments );

}


verb.eval.mesh.make_intersect_polylines = function( segments ) {

	// debug (return all segments)
	// return segments;

	// we need to be able to traverse from one end of a segment to the other
	segments.forEach( function(s){
		s[1].opp = s[0];
		s[0].opp = s[1];
	});

	// construct a tree for fast lookup 
	var tree = verb.eval.mesh.kdtree_from_segs( segments );

	// flatten everything, we no longer need the segments
	var ends = segments.flatten();

	// step 1: assigning the vertices to the segment ends 
	ends.forEach(function(segEnd){

			if (segEnd.adj) return;

			var adjEnd = verb.eval.mesh.lookup_adj_segment( segEnd, tree, segments.length );

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

verb.eval.mesh.pt_dist = function(a, b){
  return Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2) + Math.pow(a.z - b.z, 2);
};

verb.eval.mesh.kdtree_from_segs = function( segments ){

	var treePoints = [];

	// for each segment, transform into two elements, each keyed by pt1 and pt2
	segments.forEach(function(seg){
		treePoints.push({ "x": seg[0].pt[0], "y": seg[0].pt[1], "z": seg[0].pt[2], ele: seg[0] });
		treePoints.push({ "x": seg[1].pt[0], "y": seg[1].pt[1], "z": seg[1].pt[2], ele: seg[1] });
	});

	// make our tree
	return new KdTree(treePoints, verb.eval.mesh.pt_dist, ["x", "y", "z"]);

}

verb.eval.mesh.lookup_adj_segment = function( segEnd, tree, numSegments ) {

	var numResults = numSegments ? Math.min( numSegments, 3 ) : 3;

	// we look up 3 elements because we need to find the unique adj ele
	// we expect one result to be self, one to be neighbor and no more
	var adj = tree.nearest({ x: segEnd.pt[0], y: segEnd.pt[1], z: segEnd.pt[2] }, numResults)
								.filter(function(r){ 
									return segEnd != r[0].ele && r[1] < verb.TOLERANCE;
								})
								.map(function(r){ return r[0].ele; });

	// there may be as many as 1 duplicate pt

	// if its not unique (i.e. were at a branching point) we dont return it
	return (adj.length === 1) ? adj[0] : null;

}

//
// ####intersect_tris( points1, tri1, uvs1, points2, tri2, uvs2 )
//
// Intersect two triangles
//
// **params**
// + *Array*, array of length 3 arrays of numbers representing the points of mesh1
// + *Array*, array of length 3 arrays of number representing the triangles of mesh1
// + *Array*, array of length 3 arrays of numbers representing the points of mesh2
// + *Array*, array of length 3 arrays of number representing the triangles of mesh2
// 
// **returns** 
// + *Array*, a point represented by an array of length (dim)
//

verb.eval.geom.intersect_tris = function( points1, tri1, uvs1, points2, tri2, uvs2 ){

	// 0) get the plane rep of the two triangles
	var n0 = verb.eval.geom.get_tri_norm( points1, tri1 );
	var n1 = verb.eval.geom.get_tri_norm( points2, tri2 );
	var o0 = points1[ tri1[0] ];
	var o1 = points2[ tri2[0] ];

// TODO: fail early if all of the points of tri1 are on the same side of plane of tri2
// TODO: mark appropriately if the intersection is along an edge
	
	// 1) intersect with planes to yield ray of intersection
	var ray = verb.eval.geom.intersect_planes(o0, n0, o1, n1);
	if (!ray.intersects) return null;

	// 2) clip the ray within tri1
	var clip1 = verb.eval.geom.clip_ray_in_coplanar_tri( ray.origin, ray.dir, points1, tri1, uvs1 );
	if (clip1 === null) return null;

	// 3) clip the ray within tri2
	var clip2 = verb.eval.geom.clip_ray_in_coplanar_tri( ray.origin, ray.dir, points2, tri2, uvs2 );
	if (clip2 === null) return null;

	// 4) find the interval that overlaps
	var merged = verb.eval.geom.merge_tri_clip_intervals(clip1, clip2, points1, tri1, uvs1, points2, tri2, uvs2 );
	if (merged === null) return null;

	return [ 	{ uvtri1 : merged.uv1tri1, uvtri2: merged.uv1tri2, pt: merged.pt1 }, 
						{ uvtri1 : merged.uv2tri1, uvtri2: merged.uv2tri2, pt: merged.pt2 } ];

}

verb.eval.geom.clip_ray_in_coplanar_tri = function(o1, d1, points, tri, uvs ){

	// 0) construct rays for each edge of the triangle
	var o = [ points[ tri[0] ], points[ tri[1] ], points[ tri[2] ] ]

		, uvs = [ uvs[ tri[0] ], uvs[ tri[1] ], uvs[ tri[2] ] ]

		, uvd = [ numeric.sub(uvs[1], uvs[0]), numeric.sub(uvs[2], uvs[1]), numeric.sub(uvs[0], uvs[2]) ] 

		, s = [ numeric.sub( o[1], o[0] ), numeric.sub( o[2], o[1] ), numeric.sub( o[0], o[2] ) ]

		, d = s.map( numeric.normalized )
		, l = s.map( numeric.norm2 )

	// 1) for each tri ray, if intersects and in segment interval, store minU, maxU
	var minU = null;
	var maxU = null;

	// need to clip in order to maximize the width of the intervals

	for (var i = 0; i < 3; i++){

		var o0 = o[i];
		var d0 = d[i];

		var res = verb.eval.geom.intersect_rays( o0, d0, o1, d1 );

		// the rays are parallel
		if (res === null) {
			continue;
		}

		var useg = res[0];
		var uray = res[1];

		// if outside of triangle edge interval, discard
		if (useg < -verb.EPSILON || useg > l[i] + verb.EPSILON) continue;

		// if inside interval
		if (minU === null || uray < minU.u){
			minU = { 	u: uray, 
								pt: verb.eval.geom.point_on_ray( o1, d1, uray ),
								uv: numeric.add( uvs[i], numeric.mul( useg / l[i], uvd[i] ) ) };

		}

		if (maxU === null || uray > maxU.u){
			maxU = { 	u: uray, 
								pt: verb.eval.geom.point_on_ray( o1, d1, uray ),
								uv: numeric.add( uvs[i], numeric.mul( useg / l[i], uvd[i] ) ) };

		}
	}

	if (maxU === null || minU === null) {
		return null;
	}

	// 3) otherwise, return minU maxU along with uv info
	return { min : minU, max: maxU };
	
}

verb.eval.geom.point_on_ray = function(o, d, u){

	return numeric.add( o, numeric.mul( u, d ));

}

verb.eval.geom.merge_tri_clip_intervals = function(clip1, clip2, points1, tri1, uvs1, points2, tri2, uvs2){

	// if the intervals dont overlap, fail
	if (clip2.min.u > clip1.max.u + verb.EPSILON 
		|| clip1.min.u > clip2.max.u + verb.EPSILON) {
		return null;
	}

	// label each clip to indicate which triangle it came from
	clip1.min.tri = 0;
	clip1.max.tri = 0;
	clip2.min.tri = 1;
	clip2.max.tri = 1;

	// are these assigned properly?  

	var min = (clip1.min.u > clip2.min.u) ? clip1.min : clip2.min;
	var max = (clip1.max.u < clip2.max.u) ? clip1.max : clip2.max;

	var res = {};

	if (min.tri === 0){

		res.uv1tri1 = min.uv;
		res.uv1tri2 = verb.eval.geom.tri_uv_from_point( points2, tri2, uvs2, min.pt );

	} else {

		res.uv1tri1 = verb.eval.geom.tri_uv_from_point( points1, tri1, uvs1, min.pt );
		res.uv1tri2 = min.uv;

	}

	res.pt1 = min.pt;

	if (max.tri === 0){

		res.uv2tri1 = max.uv;
		res.uv2tri2 = verb.eval.geom.tri_uv_from_point( points2, tri2, uvs2, max.pt );

	} else {

		res.uv2tri1 = verb.eval.geom.tri_uv_from_point( points1, tri1, uvs1, max.pt );
		res.uv2tri2 = max.uv;

	}

	res.pt2 = max.pt;

	return res;

}

verb.eval.geom.intersect_planes = function(o1, n1, o2, n2){

	var d = numeric.cross(n1, n2);

	if (numeric.dot(d, d) < verb.EPSILON) return { intersects: false };

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

	if ( li === 0 ){
		a1 = n1[1];
		b1 = n1[2];
		a2 = n2[1];
		b2 = n2[2];
	} else if ( li === 1 ){
		a1 = n1[0];
		b1 = n1[2];
		a2 = n2[0];
		b2 = n2[2];
	} else {
		a1 = n1[0];
		b1 = n1[1];
		a2 = n2[0];
		b2 = n2[1];
	}

	// n dot X = d
	var d1 = -numeric.dot( o1, n1 );
	var d2 = -numeric.dot( o2, n2 );

	var den = a1 * b2 - b1 * a2;

	var x = (b1 * d2 - d1 * b2) / den;
	var y = (d1 * a2 - a1 * d2) / den;
	var p;

	if ( li === 0 ){
		p = [0,x,y];
	} else if ( li === 1 ){
		p = [x,0,y];
	} else {
		p = [x,y,0];
	}

	return { intersects: true, origin: p, dir : numeric.normalized( d ) };

}

verb.eval.geom.tri_uv_from_point = function( points, tri, uvs, f ){

	var p1 = points[ tri[0] ];
	var p2 = points[ tri[1] ];
	var p3 = points[ tri[2] ];

	var uv1 = uvs[ tri[0] ];
	var uv2 = uvs[ tri[1] ];
	var uv3 = uvs[ tri[2] ];

	var f1 = numeric.sub(p1, f);
	var f2 = numeric.sub(p2, f);
	var f3 = numeric.sub(p3, f);

	// calculate the areas and factors (order of parameters doesn't matter):
	var a = numeric.norm2( numeric.cross( numeric.sub(p1, p2), numeric.sub(p1, p3) ) ); // main triangle area a
	var a1 = numeric.norm2( numeric.cross(f2, f3) ) / a; // p1's triangle area / a
	var a2 = numeric.norm2( numeric.cross(f3, f1) ) / a; // p2's triangle area / a 
	var a3 = numeric.norm2( numeric.cross(f1, f2) ) / a; // p3's triangle area / a

	// find the uv corresponding to point f (uv1/uv2/uv3 are associated to p1/p2/p3):
	return numeric.add( numeric.mul( a1, uv1), numeric.mul( a2, uv2), numeric.mul( a3, uv3) );

}