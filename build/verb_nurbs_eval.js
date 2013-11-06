if ( typeof exports != 'object' || exports === undefined )  // browser context
{
	importScripts('labor.js');  
}
else // node.js context
{
	var labor = require('labor');
}

var VERB = VERB || {};
VERB.eval = VERB.eval || {};
VERB.eval.nurbs = VERB.eval.nurbs || {};
VERB.eval.mesh = VERB.eval.mesh || {};
VERB.EPSILON = 1e-8;

var router = new labor.Router(VERB.eval.nurbs);
/**
 * Generate the control points, weights, and knots of a revolved surface
 * (Corresponds to Algorithm A7.1 from Piegl & Tiller)
 *
 * @param {Array} center of the rotation axis
 * @param {Array} axis of the rotation axis
 * @param {Number} angle to revolve around axis
 * @param {Number} degree of the generatrix
 * @param {Number} control points of the generatrix
 * @param {Number} weights of the generatrix
 * @return {Object} an object with the following properties: control_points, weights, knots, degree
 * @api public
 */

// helper method

function crossprod(u,v) {
  return [u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]];
}

VERB.eval.nurbs.get_revolved = function(S, T, theta, m, Pj, wj){

	// n is not used
	// U are the knots
	// Pij control points
	// wij weights

	var n, U, Pij, wij;

	if (theta <= Math.PI / 2) {
		narcs = 1;
	} else {
		if (theta <= Math.PI){
			narcs = 2;
			U[3]= U[4] = 0.5;
		} else if (theta <= 3 * Math.PI / 2){
			narcs = 3;
			U[3]= U[4] = 1/3;
			U[5]= U[6] = 2/3;
		} else {
			narcs = 4;
			U[3]= U[4] = 1/3;
			U[5]= U[6] = 2/3;
			U[7]= U[8] = 2/3;
		}
	}

	var dtheta = theta/narcs
		, j = 3 + 2 * (narcs-1);

	for (var i = 0; i < 3; j++, i++){
		U[i] = 0.0;
		U[j] = 1.0;
	}

	var n = 2 * narcs
		, wm = Math.cos(dtheta/2.0)
		, angle = 0.0
		, sines = VERB.eval.nurbs.zeros_1d( narcs )
		, cosines = VERB.eval.nurbs.zeros_1d( narcs )
		, Pij = VERB.eval.nurbs.zeros_2d( 2*narcs, m )
		, wij = VERB.eval.nurbs.zeros_2d( 2*narcs, m );

	for (var i = 1; i <= narcs; i++){
		angle += dtheta;
		cosines[i] = Math.cos(angle);
		sines[i] = Math.sin(angle);
	}

	for (var j = 0; j <= m; j++){

		var O = VERB.eval.geom.closest_point_on_ray(Pj[j], S, T)
			, X = numeric.sub( Pj[j], O )
			, r = numeric.mul( 1 / numeric.norm2(X), X)
			, Y = crossprod(T,X)

		Pij[0][j] = Pj[j];
		P0 = Pj[j];
		wij[0][j] = wj[j];

		var T0 = Y
			, index = 0
			, angle = 0.0;

		for (var i = 1; i <= narcs; i++){

			var P2 = numeric.add( O, numeric.mul( r, cosines[i], X), numeric.mul( r, sines[i], Y) );

			Pij[index+2][j] = P2;
			wij[index+2][j] = wj[j];

			var T2 = numeric.sub( numeric.mul( cosines[i], Y), numeric.mul(sines[i], X));

			var params = VERB.eval.geom.intersect_rays(P0, numeric.mul( 1 / numeric.norm2(T0), T0), P2, numeric.mul( 1 / numeric.norm2(T2), T2));
			Pij[index+1][j] = numeric.add( P0, numeric.mul(T0, params[0]));

			wij[index+1][j] = wm * wj[j];

			index += 2;

			if (i < narcs)
			{
				P0 = P2;
				T0 = T2;
			}

		}
	}

	return {knots: U, control_points: Pij, degree: 2, weights: Wij };

}


/**
 * Generate the control points, weights, and knots of an arbitrary arc
 * (Corresponds to Algorithm A7.1 from Piegl & Tiller)
 *
 * @param {Array} the center of the arc
 * @param {Array} the xaxis of the arc
 * @param {Array} orthogonal yaxis of the arc
 * @param {Number} radius of the arc
 * @param {Number} start angle of the arc, between 0 and 2pi
 * @param {Number} end angle of the arc, between 0 and 2pi, greater than the start angle
 * @return {Object} an object with the following properties: control_points, weights, knots, degree
 * @api public
 */

VERB.eval.nurbs.get_arc = function( center, xaxis, yaxis, radius, start_angle, end_angle ) {

	// if the end angle is less than the start angle, do a circle
	if (end_angle < start_angle) end_angle = 2 * Math.PI + start_angle;

	var theta = end_angle - start_angle
		, narcs = 0;

	// how many arcs?
	if (theta <= Math.PI / 2) {
		narcs = 1;
	} else {
		if (theta <= Math.PI){
			narcs = 2;
		} else if (theta <= 3 * Math.PI / 2){
			narcs = 3;
		} else {
			narcs = 4;
		}
	}

	var dtheta = theta / narcs
		, n = 2 * narcs
		, w1 = Math.cos( dtheta / 2) 
		, P0 = numeric.add( center, numeric.mul( radius, Math.cos(start_angle), xaxis), numeric.mul( radius, Math.sin(start_angle), yaxis ) )
		, T0 = numeric.sub( numeric.mul( Math.cos(start_angle), yaxis ), numeric.mul( Math.sin(start_angle), xaxis) )
		, Pw = VERB.eval.nurbs.zeros_1d( narcs * 2 )
		, U = VERB.eval.nurbs.zeros_1d( 2 * narcs + 3 )
		, index = 0
		, angle = start_angle
		, W = VERB.eval.nurbs.zeros_1d( narcs * 2 );

	Pw[0] = P0;
	W[0] = 1;

	for (var i = 1; i <= narcs; i++){

		angle += dtheta;
		var P2 = numeric.add( center, numeric.mul( radius, Math.cos(angle), xaxis), numeric.mul( radius, Math.sin(angle), yaxis ) )

		W[index+2] = 1;
		Pw[index+2] = P2;

		var T2 = numeric.sub( numeric.mul( Math.cos(angle), yaxis ), numeric.mul( Math.sin(angle), xaxis) )

		var params = VERB.eval.geom.intersect_rays(P0, numeric.mul( 1 / numeric.norm2(T0), T0), P2, numeric.mul( 1 / numeric.norm2(T2), T2));
		var P1 = numeric.add( P0, numeric.mul(T0, params[0]));

		W[index+1] = w1;
		Pw[index+1] = P1;

		index += 2;

		if (i < narcs){
			P0 = P2;
			T0 = T2;
		}
	}

	j = 2 * narcs + 1;

	for (var i = 0; i < 3; i++){
		U[i] = 0.0;
		U[i+j] = 1.0;
	}

	switch (narcs){
		case 1: break;
		case 2: U[3] = U[4] = 0.5; break;
		case 3: U[3] = U[4] = 1/3;
						U[5] = U[6] = 2/3; break;
		case 4: U[3] = U[4] = 0.25;
						U[5] = U[6] = 0.5;
						U[7] = U[8] = 0.75; break;
	}

	return {knots: U, control_points: Pw, degree: 2, weights: W };


}


/**
 * Intersect two NURBS surfaces
 *
 * @param {Number} integer degree of surface in u direction
 * @param {Array} array of nondecreasing knot values in u direction
 * @param {Number} integer degree of surface in v direction
 * @param {Array} array of nondecreasing knot values in v direction
 * @param {Array} 3d array of control points, top to bottom is increasing u direction, left to right is increasing v direction,
 									and where each control point is an array of length (dim+1)
 * @param {Number} u parameter at which to evaluate the surface point
 * @param {Number} v parameter at which to evaluate the surface point
 * @return {Array} a point represented by an array of length (dim)
 * @api public
 */

VERB.eval.nurbs.intersect_rational_surfaces = function( not, sure, yet ) {

	// tesselate two nurbs surfaces
	// VERB.eval.mesh.intersect_meshes_by_aabb
	// refine the curves using the two surfaces

}

/**
 * Intersect two meshes via aabb intersection
 *
 * @param {Number} integer degree of surface in u direction
 * @param {Array} array of nondecreasing knot values in u direction
 * @param {Number} integer degree of surface in v direction
 * @param {Array} array of nondecreasing knot values in v direction
 * @param {Array} 3d array of control points, top to bottom is increasing u direction, left to right is increasing v direction,
 									and where each control point is an array of length (dim+1)
 * @param {Number} u parameter at which to evaluate the surface point
 * @param {Number} v parameter at which to evaluate the surface point
 * @return {Array} a point represented by an array of length (dim)
 * @api public
 */

VERB.eval.mesh.intersect_meshes = function( vertices1, triangles1, uvs1, aabb1, vertices2, triangles2, uvs2, aabb2) {

	// tesselate two nurbs surfaces

	// call subroutine to:
		// put polygons into kd trees
		// intersect polygons via kd trees
		// build up curves
		// return poly line curves for further refinement

		// return collection of lists of points with parameter values

}

/**
 * Intersect two meshes via aabb intersection
 *
 * @param {Number} integer degree of surface in u direction
 * @param {Array} array of nondecreasing knot values in u direction
 * @param {Number} integer degree of surface in v direction
 * @param {Array} array of nondecreasing knot values in v direction
 * @param {Array} 3d array of control points, top to bottom is increasing u direction, left to right is increasing v direction,
 									and where each control point is an array of length (dim+1)
 * @param {Number} u parameter at which to evaluate the surface point
 * @param {Number} v parameter at which to evaluate the surface point
 * @return {Array} a point represented by an array of length (dim)
 * @api public
 */

VERB.eval.mesh.intersect_meshes_by_aabb = function( points1, tris1, uvs1, points2, tris2, uvs2 ) {

	// build aabb for each mesh
	var tri_indices1 = _.range(tris1.length)
	  , tri_indices2 = _.range(tris2.length)
	  , aabb1 = VERB.eval.mesh.make_mesh_aabb_tree( points1, tris1, tri_indices1 )
	  , aabb2 = VERB.eval.mesh.make_mesh_aabb_tree( points2, tris2, tri_indices2 )
  
  // intersect and get the pairs of triangle intersctions
		, intersection_pairs = VERB.eval.mesh.intersect_aabb_tree( points1, tris1, points2, tris2, aabb1, aabb2 );

	// get the segments of the intersection crv with uvs

	// sort the intersection segments

}

/**
 * Intersect two triangles
 *
 * @param {Array} array of length 3 arrays of numbers representing the points of mesh1
 * @param {Array} array of length 3 arrays of number representing the triangles of mesh1
 * @param {Array} array of length 3 arrays of numbers representing the points of mesh2
 * @param {Array} array of length 3 arrays of number representing the triangles of mesh2
 * @return {Array} a point represented by an array of length (dim)
 * @api public
 */

VERB.eval.geom.intersect_tris = function( points1, tri1, uvs1, points2, tri2, uvs2 ) {

	// unpack the input
  var seg1a = [ points1[ tr1[0] ], points1[ tr1[1] ] ]
  	, seg1b = [ points1[ tr1[1] ], points1[ tr1[2] ] ]
  	, seg1c = [ points1[ tr1[2] ], points1[ tr1[0] ] ]
  	, seg2a = [ points2[ tr2[0] ], points2[ tr2[1] ] ]
  	, seg2b = [ points2[ tr2[1] ], points2[ tr2[2] ] ]
  	, seg2c = [ points2[ tr2[2] ], points2[ tr2[0] ] ] 
  	, segs1 = [ seg1a, seg1b, seg1c ]
  	, segs2 = [ seg2a, seg2b, seg2c ]
  	, int_results = []
  	, tri2norm = VERB.eval.geom.get_tri_norm(points2, tri2)
  	, pt2 = points2[ tr2[0] ];

  for (var i = 0; i < 3; i++){
  	
  	var result = VERB.eval.geom.intersect_segment_with_plane( segs1[i][0], segs2[i][1], pt2, tri2norm );
    
    if ( result.intersects ){
    	int_results.push( result );
    }

  }

  // if you don't have 2 intersections you do not have an intersection,
  // 0 would mean a glancing intersection
  // 3 means we don't have a triangle
  if ( int_results.length !== 2 ){
  	return null;
  }

  // what portions of the segment lie within triangle 2

  // intersect edges of triangle 2 with the segment, obtaining the "inner" triangle
  var seg = [int_results[0].point, int_results[1].point ]
  	, seg_int_results = [];

  for (var i = 0; i < 3; i++){
  	var seg_int_result = VERB.eval.geom.intersect_segments( seg[0], seg[1], seg, b1, tol );
  	if ( seg_int_result ){
  		seg_int_results.push( seg_int_result );
  	}
  }

  // all intersections should be with uv's 

  if ( seg_int_results.length === 0 ) {

  	// tri1 is intersecting and the intersection segment
  	// is inside tri2

  	// return the two outer points

  } else if ( seg_int_results.length === 1 ) {

  	// tri1 is intersecting and the intersection segment
  	// is partially inside tri2

  	// return the end point of seg that is INSIDE tri2 and the intersection

  } else if ( seg_int_results.length === 2 ) {

  	// tri1 is intersecting and the intersection segment's
  	// end points are outside of tri2

  	// return the two seg_int_results 

  } 

}

/**
 *  Intersect ray/segment with triangle (from http://geomalgorithms.com/a06-_intersect-2.html)
 *
 *  If intersecting a ray, the param needs to be between 0 and 1 and the caller is responsible
 *  for making that check
 *
 * @param {Array} array of length 3 representing first point of the segment
 * @param {Array} array of length 3 representing second point of the segment
 * @param {Array} array of length 3 arrays representing the points of the triangle
 * @param {Array} array of length 3 containing int indices in the array of points, this allows passing a full mesh
 * @return {Object} an object with an "intersects" property that is true or false and if true, a 
 			"s" property giving the param on u, and "t" is the property on v, a "point" property
 			where the intersection took place, and "p" property representing the parameter along the segment
 * @api public
 */

VERB.eval.geom.intersect_segment_with_tri = function( p1, p0, points, tri ) {

	var v0 = points[ tri[0] ]
		, v1 = points[ tri[1] ]
		, v2 = points[ tri[2] ]
		, u = numeric.sub( v1, v0 )
		, v = numeric.sub( v2, v0 )
		, udotv = numeric.dot(u,v)
		, udotu = numeric.dot(u,u)
		, vdotv = numeric.dot(v,v)
		, denom = udotv * udotv - udotu * vdotv
		, s = ((udotv * numeric.dot(u,v)) - (vdotv * numeric.dot(w,u))) / denom
		, t = ((udotv * numeric.dot(w,u)) - (udotu * numeric.dot(w,v))) / denom;

	if (s > 1.0 + EPSILON || t > 1.0 + EPSILON || t < -EPSILON || s < -EPSILON || s + t > 1.0 + EPSILON){
		return null;
	}

	var pt = numeric.add( v0, numeric.add( numeric.mul( s, u ), numeric.mul( t, v ) ) )
		, p1mp0 = numeric.sub(p1, p0)
		, p1mp0norm = numeric.dot( p1mp0, p1mp0 )
		, ptmp0 = numeric.sub(pt, p0)
		, ptmp0norm = numeric.dot( ptmp0, ptmp0 )
		, p = ptmp0norm / p1mp0norm;

	return { point: pt, s: s, t: t, param: p };

}

/**
 *  Intersect ray/segment with plane (from http://geomalgorithms.com/a06-_intersect-2.html)
 *
 *  If intersecting a ray, the param needs to be between 0 and 1 and the caller is responsible
 *  for making that check
 *
 * @param {Array} array of length 3 representing first point of the segment
 * @param {Array} array of length 3 representing second point of the segment
 * @param {Array} array of length 3 representing an origin point on the plane
 * @param {Array} array of length 3 representing the normal of the plane
 * @return {Object} an object with an "intersects" property that is true or false and if true, a 
 			"param" property giving the intersection parameter on the ray/segment.  
 * @api public
 */

VERB.eval.geom.intersect_segment_with_plane = function( p0, p1, v0, n ) {

	var denom = numeric.dot( n, numeric.sub(p0,p1) );

	if ( abs( denom ) < EPSILON ) { // parallel case
   	return null;
 	}

 	var numer = numeric.dot( n, numeric.sub(v0,p0) );

	return { param: numer / denom };

}

/**
 *  Intersect two aabb trees - a recursive function
 *
 * @param {Array} array of length 3 arrays of numbers representing the points of mesh1
 * @param {Array} array of length 3 arrays of number representing the triangles of mesh1
 * @param {Array} array of length 3 arrays of numbers representing the points of mesh2
 * @param {Array} array of length 3 arrays of number representing the triangles of mesh2
 * @param {Object} nested object representing the aabb tree of the first mesh
 * @param {Object} nested object representing the aabb tree of the second mesh
 * @return {Array} a list of pairs of triangle indices for mesh1 and mesh2 that are intersecting
 * @api public
 */

VERB.eval.geom.intersect_aabb_trees = function( points1, tris1, points2, tris2, aabb_tree1, aabb_tree2 ) {

  var intersects = aabb_tree1.bounding_box.intersects( aabb_tree2.bounding_box );

  if (!intersects){
  	return [];
  }

  if (aabb_tree1.children.length === 0 && aabb_tree2.children.length === 0){ 

  	return [ [aabb_tree1.triangle, aabb_tree2.triangle ] ]; 

  } else if (aabb_tree1.children.length === 0 && aabb_tree2.children.length != 0){

  	return     VERB.eval.geom.intersect_aabb_trees( points1, tris1, points2, tris2, aabb_tree1, aabb_tree2.children[0] )
  		.concat( VERB.eval.geom.intersect_aabb_trees( points1, tris1, points2, tris2, aabb_tree1, aabb_tree2.children[1] ) );

  } else if (aabb_tree1.children.length != 0 && aabb_tree2.children.length === 0){

  	return     VERB.eval.geom.intersect_aabb_trees( points1, tris1, points2, tris2, aabb_tree1.children[0], aabb_tree2 )
  		.concat( VERB.eval.geom.intersect_aabb_trees( points1, tris1, points2, tris2, aabb_tree1.children[1], aabb_tree2 ) );

  } else if (aabb_tree1.children.length != 0 && aabb_tree2.children.length != 0){

  	return     VERB.eval.geom.intersect_aabb_trees( points1, tris1, points2, tris2, aabb_tree1.children[0], aabb_tree2.children[0] )
  		.concat( VERB.eval.geom.intersect_aabb_trees( points1, tris1, points2, tris2, aabb_tree1.children[0], aabb_tree2.children[1] ) )
  		.concat( VERB.eval.geom.intersect_aabb_trees( points1, tris1, points2, tris2, aabb_tree1.children[1], aabb_tree2.children[0] ) )
  		.concat( VERB.eval.geom.intersect_aabb_trees( points1, tris1, points2, tris2, aabb_tree1.children[1], aabb_tree2.children[1] ) );

  }

}


/**
 * Make tree of axis aligned bounding boxes 
 *
 * @param {Array} array of length 3 arrays of numbers representing the points
 * @param {Array} array of length 3 arrays of number representing the triangles
 * @param {Array} array of numbers representing the relevant triangles to use to form aabb
 * @return {Array} a point represented by an array of length (dim)
 * @api public
 */

VERB.eval.mesh.make_mesh_aabb_tree = function( points, tris, tri_indices ) {

	// build bb
	var aabb = { 	bounding_box: VERB.eval.mesh.make_mesh_aabb( points, tris, tri_indices ), 
								children: [] };

	// if only one ele, terminate recursion and store the triangles
	if (tri_indices.length === 1){
		aabb.triangle = tri_indices[0];
		return aabb;
	}

	// sort triangles in sub mesh
	var sorted_tri_indices = VERB.eval.mesh.sort_tris_on_longest_axis( aabb.bounding_box, points, tris, tri_indices )
		, tri_indices_a = sorted_tri_indices.slice( 0, Math.floor( sorted_tri_indices.length / 2 ) )
		, tri_indices_b = sorted_tri_indices.slice( Math.floor( sorted_tri_indices.length / 2 ), sorted_tri_indices.length );

	// recurse 
	aabb.children = [ VERB.eval.mesh.make_mesh_aabb_tree(points, tris, tri_indices_a), 
										VERB.eval.mesh.make_mesh_aabb_tree(points, tris, tri_indices_b) ];

	// return result
	return aabb;

}

/**
 * Form axis-aligned bounding box from triangles of mesh
 *
 * @param {Array} array of length 3 arrays of numbers representing the points
 * @param {Array} array of length 3 arrays of number representing the triangles
 * @param {Array} array of numbers representing the relevant triangles
 * @return {Array} a point represented by an array of length (dim)
 * @api public
 */

VERB.eval.mesh.make_mesh_aabb = function( points, tris, tri_indices ) {

	var bb = new VERB.geom.BoundingBox();

	for (var i = tri_indices.length - 1; i >= 0; i--) {
		
		var tri_i = tri_indices[i];

		bb.add( points[ tris[ tri_i ][0] ] );
		bb.add( points[ tris[ tri_i ][1] ] );
		bb.add( points[ tris[ tri_i ][2] ] );

	};

	return bb;

}

/**
 * Sort triangles on longest axis
 *
 * @param {Number} integer degree of surface in u direction
 * @param {Array} array of nondecreasing knot values in u direction
 * @param {Number} integer degree of surface in v direction
 * @param {Array} array of nondecreasing knot values in v direction
 * @return {Array} a point represented by an array of length (dim)
 * @api public
 */

VERB.eval.mesh.sort_tris_on_longest_axis = function( container_bb, points, tris, tri_indices ) {

	// get longest axis of bb
	var long_axis = container_bb.get_longest_axis();

	// map position on longest axis to index in tri_indices
	var axis_position_map = [];
	for (var i = tri_indices.length - 1; i >= 0; i--) {

		// centroid-centered

		// var tri_i = tri_indices[i], 
		// 	tri_centroid = VERB.eval.geom.get_tri_centroid( points, tris[ tri_i ] );
		// axis_position_map.push( [ tri_centroid[long_axis], tri_i ] );

		// min position
		var tri_i = tri_indices[i],
			tri_min = VERB.eval.mesh.get_min_coordinate_on_axis( points, tris[ tri_i ], long_axis );

		axis_position_map.push( [ tri_min, tri_i ] );

	}

	// sort by axis position
	axis_position_map.sort(function(a,b) { return a[0] > b[0] } );

	// box up the tri_indices in sorted_order
	var sorted_tri_indices = [];
	for (var i = 0, l = axis_position_map.length; i < l; i++) {
		sorted_tri_indices.push( axis_position_map[i][1] );
	}

	return sorted_tri_indices;

}

/**
 * Get min coordinate on axis
 *
 * @param {Array} array of length 3 arrays of numbers representing the points
 * @param {Array} length 3 array of point indices for the triangle
 * @return {Number} a point represented by an array of length 3
 * @api public
 */

VERB.eval.mesh.get_min_coordinate_on_axis = function( points, tri, axis ) {

	var axis_coords = [];

	// for each vertex
	for (var i = 0; i < 3; i++){
		axis_coords.push( points[ tri[i] ][ axis ] );
	}

	return Math.min.apply(Math, axis_coords);
};

/**
 * Get triangle centroid
 *
 * @param {Array} array of length 3 arrays of numbers representing the points
 * @param {Array} length 3 array of point indices for the triangle
 * @return {Array} a point represented by an array of length 3
 * @api public
 */

VERB.eval.geom.get_tri_centroid = function( points, tri ) {

	var centroid = [0,0,0];

	// for each vertex
	for (var i = 0; i < 3; i++){
		// for each point index
		for (var j = 0; j < 3; j++){
			centroid[j] += points[ tri[i] ][j];
		}
	}

	for (var i = 0; i < 3; i++){
		centroid[i] /= 3;
	}

	return centroid;

};

/**
 * Get triangle normal
 *
 * @param {Array} array of length 3 arrays of numbers representing the points
 * @param {Array} length 3 array of point indices for the triangle
 * @return {Array} a normal vector represented by an array of length 3
 * @api public
 */

VERB.eval.geom.get_tri_norm = function( points, tri ) {

	var v0 = points[ tri[0] ]
		, v1 = points[ tri[1] ]
		, v2 = points[ tri[2] ]
		, u = numeric.sub( v1, v0 )
		, v = numeric.sub( v2, v0 )
		, n = numeric.cross( u, v );

	return numeric.mul( 1 / numeric.norm2( n ), n );

};

/**
 * Tesselate an untrimmed nurbs surface
 *
 * @param {Number} integer degree of surface in u direction
 * @param {Array} array of nondecreasing knot values in u direction
 * @param {Number} integer degree of surface in v direction
 * @param {Array} array of nondecreasing knot values in v direction
 * @param {Array} 3d array of control points, top to bottom is increasing u direction, left to right is increasing v direction,
 									and where each control point is an array of length (dim+1)
 * @return {Array} first element of array is an array of positions, second element are 3-tuple of triangle windings, third element is the 
                   uvs
 * @api public
 */

VERB.eval.mesh.tesselate_rational_surface_naive = function( degree_u, knot_vector_u, degree_v, knot_vector_v, homo_control_points, divs_u, divs_v ) {

	if ( divs_u < 1 ) {
		divs_u = 1;
	}

	if ( divs_v < 1 ) {
		divs_v = 1;
	}

	var span_u = 1 / divs_u,
		span_v = 1 / divs_v;
  
  var points = [];
  var uvs = [];

  // generate all points
	for (var i = 0; i < divs_u + 1; i++) {
		for (var j = 0; j < divs_v + 1; j++) {

			var pt_u = i * span_u, 
				pt_v = j * span_v;

			uvs.push( [pt_u, pt_v] );
			points.push( VERB.eval.nurbs.rational_surface_point( degree_u, knot_vector_u,  degree_v, knot_vector_v, homo_control_points, pt_u, pt_v ) );

		}
	}

  //  u dir
  //  |
  //  v 
  //
  //  v dir -->
  //
	//  a ---- d 
	//  | \    |
	//  |  \   |
 	//  |   \  |
	//  |    \ | 
	//	b ---- c 
  //

  var faces = [];

  // generate all faces
	for (var i = 0; i < divs_u ; i++) {
		for (var j = 0; j < divs_v ; j++) {

			var a_i = i * (divs_v + 1) + j,
				b_i = (i + 1) * (divs_v + 1) + j,
				c_i = b_i + 1,
				d_i = a_i + 1,
				abc = [a_i, b_i, c_i],
				acd = [a_i, c_i, d_i];

			faces.push(abc);
			faces.push(acd);

		}
	}

	return { points: points, faces : faces, uvs: uvs};

}

/**
 * Refine an intersection pair for two curves given an initial guess.  This is an unconstrained minimization,
 * so the caller is responsible for providing a very good initial guess.
 *
 * @param {Number} integer degree of curve1
 * @param {Array} array of nondecreasing knot values for curve 1
 * @param {Array} 2d array of homogeneous control points, where each control point is an array of length (dim+1) 
 									and form (wi*pi, wi) for curve 1
 * @param {Number} integer degree of curve2
 * @param {Array} array of nondecreasing knot values for curve 2
 * @param {Array} 2d array of homogeneous control points, where each control point is an array of length (dim+1) 
 									and form (wi*pi, wi) for curve 2
 * @param {Array} length 2 array with first param guess in first position and second param guess in second position
 * @return {Array} a length 3 array containing the [ distance * distance, u1, u2 ]
 * @api public
 */

VERB.eval.nurbs.rational_curve_curve_bb_intersect_refine = function( degree1, knot_vector1, control_points1, degree2, knot_vector2, control_points2, start_params ) {

	var objective = function(x) { 

		var p1 = VERB.eval.nurbs.rational_curve_point(degree1, knot_vector1, control_points1, x[0])
			, p2 = VERB.eval.nurbs.rational_curve_point(degree2, knot_vector2, control_points2, x[1])
			, p1_p2 = numeric.sub(p1, p2);

		return numeric.dot(p1_p2, p1_p2);

	}

	var sol_obj = numeric.uncmin( objective, start_params);

	return [sol_obj.f].concat( sol_obj.solution );

}

/**
 * Intersect two NURBS curves
 *
 * @param {Number} integer degree of curve1
 * @param {Array} array of nondecreasing knot values for curve 1
 * @param {Array} 2d array of homogeneous control points, where each control point is an array of length (dim+1) 
 									and form (wi*pi, wi) for curve 1
 * @param {Number} integer degree of curve2
 * @param {Array} array of nondecreasing knot values for curve 2
 * @param {Array} 2d array of homogeneous control points, where each control point is an array of length (dim+1) 
 									and form (wi*pi, wi) for curve 2
 * @param {Number} tolerance for the intersection
 * @return {Array} a 2d array specifying the intersections on u params of intersections on curve 1 and cruve 2
 * @api public
 */

VERB.eval.nurbs.intersect_rational_curves_by_aabb = function( degree1, knot_vector1, control_points1, degree2, knot_vector2, control_points2, sample_tol, tol ) {

	// sample the two curves adaptively
	var up1 = VERB.eval.nurbs.parametric_polyline_polyline_bb_intersect( degree1, knot_vector1, control_points1, sample_tol )
		, up2 = VERB.eval.nurbs.parametric_polyline_polyline_bb_intersect( degree1, knot_vector1, control_points1, sample_tol )
		, u1 = _.map(up1, function(el) { return el[0]; })
		, u2 = _.map(up2, function(el) { return el[0]; })
		, p1 = _.map(up1, function(el) { return el.slice(1) })
		, p2 = _.map(up2, function(el) { return el.slice(1) });

	return VERB.eval.nurbs.parametric_polyline_polyline_bb_intersect( p1, p2, u1, u2, tol );

}

/**
 * Intersect two polyline curves, keeping track of parameterization on each
 *
 * @param {Array} array of [parameter point] values for curve 1
 * @param {Array} array of [parameter point] values for curve 2
 * @param {Number} tolerance for the intersection
 * @return {Array} a 2d array specifying the intersections on u params of intersections on curve 1 and cruve 2
 * @api public
 */

VERB.eval.nurbs.intersect_parametric_polylines_by_aabb = function( p1, p2, u1, u2, tol ) {

	var bb1 = new VERB.geom.BoundingBox(p1)
		, bb2 = new VERB.geom.BoundingBox(p2)

	if ( !bb1.intersects(bb2) ) return;

	if (p1.length === 2 && p2.length === 2 ){

			var inter = VERB.eval.geom.segment_segment_intersect(p1[0],p1[1], p2[0], p2[1], tol);

			if ( inter != null ){

				// replace with interpolant
			 	inter[0][0] = inter[0][0] * ( u1[1]-u1[0] ) + u1[0];
			 	inter[1][0] = inter[1][0] * ( u2[1]-u2[0] ) + u2[0];

			 	return inter;

			} 

	} else if (p1.length === 2) {

		var p2_mid = Math.ceil( p2.length / 2 ),
				p2_a = p2.slice( 0, p2_mid ),
				u2_a = u2.slice(0, p2_mid ),
				p2_b = p2.slice( p2_mid-1 )
				u2_b = p2.slice( p2_mid-1 );

		return 	 VERB.eval.nurbs.parametric_polyline_polyline_bb_intersect(p1, p2_a, u1, u2_a, tol)
		.concat( VERB.eval.nurbs.parametric_polyline_polyline_bb_intersect(p1, p2_b, u1, u2_b, tol) );

	} else if (p2.length === 2) {

		var p1_mid = Math.ceil( p1.length / 2 ),
				p1_a = p1.slice( 0, p1_mid ),
				u1_a = u1.slice(0, p1_mid ),
				p1_b = p1.slice( p1_mid-1 )
				u1_b = p1.slice( p1_mid-1 );

		return 		 VERB.eval.nurbs.parametric_polyline_polyline_bb_intersect(p2, p1_a, u2, p1_a, tol)
			.concat( VERB.eval.nurbs.parametric_polyline_polyline_bb_intersect(p2, p1_b, u2, u1_b, tol) );

	} else {

		var p1_mid = Math.ceil( p1.length / 2 ),
				p1_a = p1.slice( 0, p1_mid ),
				u1_a = u1.slice(0, p1_mid ),
				p1_b = p1.slice( p1_mid-1 ),
				u1_b = p1.slice( p1_mid-1 ),
				p2_mid = Math.ceil( p2.length / 2 ),
				p2_a = p2.slice( 0, p2_mid ),
				u2_a = u2.slice(0, p2_mid ),
				p2_b = p2.slice( p2_mid-1 ),
				u2_b = p2.slice( p2_mid-1 );

		return 		 VERB.eval.nurbs.parametric_polyline_polyline_bb_intersect(p1_a, p2_a, u1_a, p2_a, tol)
			.concat( VERB.eval.nurbs.parametric_polyline_polyline_bb_intersect(p1_a, p2_b, u1_a, u2_b, tol) )
			.concat( VERB.eval.nurbs.parametric_polyline_polyline_bb_intersect(p1_b, p2_a, u1_b, u2_a, tol) )
			.concat( VERB.eval.nurbs.parametric_polyline_polyline_bb_intersect(p1_b, p2_b, u1_b, u2_b, tol) );

	}

	return [];

}

/**
 * Find the closest parameter on two rays, see http://geomalgorithms.com/a07-_distance.html
 *
 * @param {Array} first point on a
 * @param {Array} second point on a
 * @param {Array} first point on b
 * @param {Array} second point on b
 * @param {Number} tolerance for the intersection
 * @return {Array} a 2d array specifying the intersections on u params of intersections on curve 1 and cruve 2
 * @api public
 */

VERB.eval.geom.intersect_segments = function( a0, a1, b0, b1, tol ) {

	// get axis and length of segments
	var a1ma0 = numeric.sub(a1, a0),
			aN = Math.sqrt( numeric.dot(a1ma0, a1ma0) ),
			a = numeric.mul( 1/ aN, a1ma0 )
			b1mb0 = numeric.sub(b1, b0),
			bN = Math.sqrt( numeric.dot(b1mb0, b1mb0) ),
			a = numeric.mul( 1 / bN, a1ma0 )
			int_params = ray_ray_intersect(a0, a, b0, b);

	if ( int_params != null ) {

		var u1 = Math.min( Math.max( 0, int_params[0] / a ), 1.0),
				u2 = Math.min( Math.max( 0, int_params[1] / b ), 1.0),
				int_a = numeric.add( numeric.mul( u1, a1ma0 ), a0 ),
				int_b = numeric.add( numeric.mul( u2, b1mb0 ), b0 ),
				dist = numeric.norm2Squared( numeric.sub(int_a, int_b) );

		if (  dist < tolerance*tolerance ) {
			return [ [u1].concat(int_a), [u2].concat(int_b) ] ;
		} 

	}
	
	return null;

 }

/**
 * Find the closest point on a ray
 *
 * @param {Array} point to project
 * @param {Array} origin for ray
 * @param {Array} direction of ray 1, assumed normalized
 * @return {Array} [param, pt]
 * @api public
 */

VERB.eval.geom.closest_point_on_ray = function( pt, o, r ) {

		var o2pt = numeric.sub(pt,o)
			, do2ptr = numeric.dot(o2pt, r)
			, proj = numeric.add(o, numeric.mul(do2ptr, r));

		return proj;

 }

/**
 * Find the closest parameter on two rays, see http://geomalgorithms.com/a07-_distance.html
 *
 * @param {Array} origin for ray 1
 * @param {Array} direction of ray 1, assumed normalized
 * @param {Array} origin for ray 1
 * @param {Array} direction of ray 1, assumed normalized
 * @return {Array} a 2d array specifying the intersections on u params of intersections on curve 1 and curve 2
 * @api public
 */

VERB.eval.geom.intersect_rays = function( a0, a, b0, b ) {

   var dab = numeric.dot( a, b ),
		   dab0 = numeric.dot( a, b0 ),
		   daa0 = numeric.dot( a, a0 ),
		   dbb0 = numeric.dot( b, b0 ),
		   dba0 = numeric.dot( b, a0 ),
		   daa = numeric.dot( a, a ),
		   dbb = numeric.dot( b, b ),
		   div = daa*dbb - dab*dab;

   if ( Math.abs( div ) < VERB.EPSILON ) { // parallel case
	   return null;
   }

   var num = dab * (dab0-daa0) - daa * (dbb0-dba0),
   		 w = num / div,
			 t = (dab0 - daa0 + w * dab)/daa;

		return [t, w];

 }


/**
 * Sample a NURBS curve assuming parameterization 0 to 1, corresponds to http://ariel.chronotext.org/dd/defigueiredo93adaptive.pdf
 *
 * @param {Number} integer degree
 * @param {Array} array of nondecreasing knot values 
 * @param {Array} 1d array of homogeneous control points, where each control point is an array of length (dim+1) and form (wi*pi, wi) 
 * @param {Number} integer number of samples
 * @return {Array} an dictionary of parameter - point pairs
 * @api public
 */

VERB.eval.nurbs.rational_curve_regular_sample = function( degree, knot_vector, control_points, num_samples ) {

	return VERB.eval.nurbs.rational_curve_regular_sample_range( degree, knot_vector, control_points, 0, 1.0, num_samples );

}

/**
 * Sample a NURBS curve assuming parameterization 0 to 1, corresponds to http://ariel.chronotext.org/dd/defigueiredo93adaptive.pdf
 *
 * @param {Number} integer degree
 * @param {Array} array of nondecreasing knot values 
 * @param {Array} 1d array of homogeneous control points, where each control point is an array of length (dim+1) and form (wi*pi, wi) 
 * @param {Number} start parameter for sampling
 * @param {Number} end parameter for sampling
 * @param {Number} integer number of samples
 * @return {Array} an dictionary of parameter - point pairs
 * @api public
 */

VERB.eval.nurbs.rational_curve_regular_sample_range = function( degree, knot_vector, control_points, start_u, end_u, num_samples ) {

	if (num_samples < 1){
		num_samples = 2;
	}

	var p = [],
		span = (end_u - start_u) / (num_samples - 1),
		u = 0;

	for (var i = 0; i < num_samples; i++){

		u = start_u + span * i;
		p.push( [u].concat( VERB.eval.nurbs.rational_curve_point(degree, knot_vector, control_points, u) ) );

	}

	return p;

}

/**
 * Sample a NURBS curve assuming parameterization 0 to 1, corresponds to http://ariel.chronotext.org/dd/defigueiredo93adaptive.pdf
 *
 * @param {Number} integer degree
 * @param {Array} array of nondecreasing knot values 
 * @param {Array} 2d array of homogeneous control points, where each control point is an array of length (dim+1) 
 									and form (wi*pi, wi) 
 * @param {Number} tolerance for the adaptive scheme
 * @return {Array} an array of dim + 1 length where the first element is the param where it was sampled and the remaining the pt
 * @api public
 */

VERB.eval.nurbs.rational_curve_adaptive_sample = function( degree, knot_vector, control_points, tol ) {

	return VERB.eval.nurbs.rational_curve_adaptive_sample_range( degree, knot_vector, control_points, 0, 1.0, tol );

}

/**
 * Sample a NURBS curve at 3 points, facilitating adaptive sampling
 *
 * @param {Number} integer degree
 * @param {Array} array of nondecreasing knot values 
 * @param {Array} 2d array of homogeneous control points, where each control point is an array of length (dim+1) 
 									and form (wi*pi, wi) 
 * @param {Number} start parameter for sampling
 * @param {Number} end parameter for sampling
 * @return {Array} an array of dim + 1 length where the first element is the param where it was sampled and the remaining the pt
 * @api public
 */

VERB.eval.nurbs.rational_curve_adaptive_sample_range = function( degree, knot_vector, control_points, start_u, end_u, tol ) {

	// sample curve at three pts
	var p1 = VERB.eval.nurbs.rational_curve_point(degree, knot_vector, control_points, start_u),
		p3 = VERB.eval.nurbs.rational_curve_point(degree, knot_vector, control_points, end_u),
		t = 0.45 + 0.1 * Math.random(),
		mid_u = start_u + (end_u - start_u) * t,
		p2 = VERB.eval.nurbs.rational_curve_point(degree, knot_vector, control_points, mid_u);

		// the if three points are "flat", return the two end pts
		if ( VERB.eval.nurbs.three_points_are_flat( p1, p2, p3, tol ) ) {

			return [ 	[start_u, p1[0], p1[1], p1[2]], 
								[ end_u, p3[0], p3[1], p3[2] ] ];

		} else {

			// recurse on the two halves
			var left_pts = VERB.eval.nurbs.rational_curve_adaptive_sample_range( degree, knot_vector, control_points, start_u, mid_u, tol )
				, right_pts = VERB.eval.nurbs.rational_curve_adaptive_sample_range( degree, knot_vector, control_points, mid_u, end_u, tol );

			// concatenate the two		
			return left_pts.slice(0, -1).concat(right_pts);

		}
}

/**
 * Determine if three points form a straight line within a given tolerance for their 2 * squared area
 *
 *          * p2
 *         / \
 *        /   \
 *       /     \ 
 *      /       \
 *  p1 * -------- * p3
 *
 * The area metric is 2 * the squared norm of the cross product of two edges, requiring no square roots and no divisions
 *
 * @param {Array} p1
 * @param {Array} p2
 * @param {Array} p3
 * @param {Number} The tolerance for whether the three points form a line
 * @return {Boolean} Whether the triangle passes the test
 * @api public
 */

VERB.eval.nurbs.three_points_are_flat = function( p1_arr, p2_arr, p3_arr, tol ) {

	// convert to vectors, this is probably unnecessary
	var p1 = new VERB.geom.Vector3( p1_arr ),
		p2 = new VERB.geom.Vector3( p2_arr ),
		p3 = new VERB.geom.Vector3( p3_arr );

	// find the area of the triangle wihout using a square root
	var norm = p2.minus( p1 ).cross( p3.minus( p1 ) ),
			area = norm.dot( norm );

	return area < tol;

}



/**
 * Insert a knot along a rational curve
 *
 * @param {Number} integer degree of surface in u direction
 * @param {Array} array of nondecreasing knot values in u direction
 * @param {Number} integer degree of surface in v direction
 * @param {Array} array of nondecreasing knot values in v direction
 * @param {Array} 3d array of control points, where rows are the u dir, and columns run along the positive v direction, 
 									and where each control point is an array of length (dim)  
 * @param {Number} u parameter at which to evaluate the derivatives
 * @param {Number} v parameter at which to evaluate the derivatives
 * @param {Array} 1d array of control point weights 
 * @return {Array} a point represented by an array of length (dim)
 * @api public
 */

VERB.eval.nurbs.curve_knot_insert = function( degree, knots, control_points, u, s, r ) {

	// np is n for the initial curve
	// nq is n for the output curve with knots inserted
	// k is the span on which the knots are inserted
	// s is the initial multiplicity of the point
	// r is the number of times to insert the knot
	// control_points is initial set of control points

	var dim = control_points[0].length
		, np = knots.length - degree - 2
		, num_pts = control_points.length
		, k = VERB.eval.nurbs.knot_span( degree, u, knots )
		, mp = np + degree + 1
		, nq = np + r
		, num_pts_post = num_pts + r    
		, Rw = new Array( degree + 1 )  
		, knots_post = new Array( knots.length + r ) 
		, control_points_post = new Array( num_pts_post ) 
		, i = 0;

	// new knot vector
	for (i = 0; i <= k; i++) {
		knots_post[i] = knots[i];
	}
	
	for (i = 1; i <= r; i++) {
		knots_post[k+i] = u; 
	}

	for (i = k+1; i <= mp; i++)
	{
		knots_post[i+r] = knots[i];
	}

	// control point generation
	for (i = 0; i <= k-degree; i++)
	{
		control_points_post[i] = control_points[i]; 
	}

	for (i = k-s; i <= np; i++)
	{
		control_points_post[i+r] = control_points[i];
	}

	for (i = 0; i <= degree-s; i++)
	{
		Rw[i] = control_points[k-degree+1];
	}

	var L = 0
		, alpha = 0;

	// insert knot r times
	for (var j = 1; j <= r; j++) {

		L = k-degree+j;

		for (i = 0; i <= degree-j-s; i++) {

			alpha = ( u - knots[L+i] ) / ( knots[i+k+1] - knots[L+i] );
			Rw[i] = numeric.add( numeric.mul( alpha, Rw[i+1] ), numeric.mul( (1.0 - alpha), Rw[i]) );

		}

		control_points_post[ L ] = Rw[0];
		control_points_post[k+r-j-s] = Rw[degree-j-s];

	}

	// not so confident about this part
	for (i = L+1; i < k-s; i++) // set remaining control points
	{
		control_points_post[i] = Rw[ i - L ];
	}

	return [knots_post, control_points_post];

}

/**
 * Compute the derivatives at a point on a NURBS surface
 *
 * @param {Number} integer degree of surface in u direction
 * @param {Array} array of nondecreasing knot values in u direction
 * @param {Number} integer degree of surface in v direction
 * @param {Array} array of nondecreasing knot values in v direction
 * @param {Array} 3d array of control points, where rows are the u dir, and columns run along the positive v direction, 
 									and where each control point is an array of length (dim)  
 * @param {Number} u parameter at which to evaluate the derivatives
 * @param {Number} v parameter at which to evaluate the derivatives
 * @param {Array} 1d array of control point weights 
 * @return {Array} a point represented by an array of length (dim)
 * @api public
 */

VERB.eval.nurbs.rational_surface_derivs = function( degree_u, knot_vector_u, degree_v, knot_vector_v, homo_control_points, num_derivs, u, v) {

	var SKL_homo = VERB.eval.nurbs.surface_derivs( degree_u, knot_vector_u, degree_v, knot_vector_v, homo_control_points, num_derivs, u, v )
		, ders = VERB.eval.nurbs.separate_homo_derivs_2d( SKL_homo )
		, Aders = ders[0]
		, wders = ders[1]
		, k = 0
		, i  = 0
		, j = 0
		, l = 0
		, SKL = []
		, dim = Aders[0][0].length;

	for (k = 0; k <= num_derivs; k++) {
		SKL.push([]);

		for (l = 0; l <= num_derivs-k; l++) {

			var v = Aders[k][l];
			for (j=1; j <= l; j++) {
				v = numeric.sub( v, numeric.mul( numeric.mul( binomial.get(l, j), wders[0][j] ), SKL[k][l-j] ) );
			}

			for (i = 1; i <= k; i++) {
				v = numeric.sub( v, numeric.mul( numeric.mul( binomial.get(k, i), wders[i][0] ), SKL[k-i][l] ) );
				
				var v2 = VERB.eval.nurbs.zeros_1d(dim);

				for (j = 1; j <= l; j++) {
					v2 = numeric.add( v2, numeric.mul( numeric.mul( binomial.get(l, j), wders[i][j] ), SKL[k-i][l-j] ) );
				}

				v = numeric.sub( v, numeric.mul( binomial.get(k, i), v2) );

			}
			SKL[k].push( numeric.mul(1/wders[0][0], v )); // demogenize

		}
	}

	return SKL;

}

/**
 * Compute a point on a NURBS surface
 *
 * @param {Number} integer degree of surface in u direction
 * @param {Array} array of nondecreasing knot values in u direction
 * @param {Number} integer degree of surface in v direction
 * @param {Array} array of nondecreasing knot values in v direction
 * @param {Array} 3d array of control points, top to bottom is increasing u direction, left to right is increasing v direction,
 									and where each control point is an array of length (dim+1)
 * @param {Number} u parameter at which to evaluate the surface point
 * @param {Number} v parameter at which to evaluate the surface point
 * @return {Array} a point represented by an array of length (dim)
 * @api public
 */

VERB.eval.nurbs.rational_surface_point = function( degree_u, knot_vector_u,  degree_v, knot_vector_v, homo_control_points, u, v ) {

	return VERB.eval.nurbs.dehomogenize( VERB.eval.nurbs.surface_point( degree_u, knot_vector_u,  degree_v, knot_vector_v, homo_control_points, u, v ) );

}

/**
 * Determine the derivatives of a NURBS curve at a given parameter
 *
 * @param {Number} integer degree of curve
 * @param {Array} array of nondecreasing knot values
 * @param {Array} 2d array of homogeneous control points, where each control point is an array of length (dim+1) and form (wi*pi, wi)
 * @param {Number} parameter on the curve at which the point is to be evaluated
 * @return {Array} a point represented by an array of length (dim)
 * @api public
 */

VERB.eval.nurbs.rational_curve_derivs = function( degree, knot_vector, homo_control_points, u, num_derivs ) {

	// compute the derivatives of the control points
	// separate derivative array into two
	var ders = VERB.eval.nurbs.separate_homo_derivs_1d( VERB.eval.nurbs.curve_derivs( degree, knot_vector, homo_control_points, u, num_derivs ) )
		, Aders = ders[0]
		, wders = ders[1]
		, k = 0
		, i  = 0
		, CK = [];

	for (k = 0; k <= num_derivs; k++) {
		var v = Aders[k];

		for (i = 1; i <= k; i++) {
			v = numeric.sub( v, numeric.mul( numeric.mul( binomial.get(k, i), wders[i] ), CK[k-i] ) );
		}
		CK.push( numeric.mul(1/wders[0], v )); // demogenize
	}

	return CK;

}		

/**
 * Separate the array of derivatives into the A(u) component and w(u), i.e. the weight and everything else without dehomogenization
 *
 * @param {Array} 1d array of homogeneous derivatives
 * @return {Array} an array with Aders and wders as element 0 and 1, respectively
 * @api public
 */

VERB.eval.nurbs.separate_homo_derivs_1d = function( CK ) {

	var dim = CK[0].length
		, last = dim-1
		, Aders = []
		, wders = [];

	for ( var i = 0, l = CK.length; i < l; i++ ) {
		Aders.push( CK[i].slice(0, last) );
		wders.push( CK[i][last] );
	}

	return [Aders, wders];

}	

/**
 * Separate the array of derivatives into the A(u) component and w(u), i.e. the weight and everything else without dehomogenization
 *
 * @param {Array} 2d array of homogeneous derivatives
 * @return {Array} an array with Aders and wders as element 0 and 1, respectively
 * @api public
 */

VERB.eval.nurbs.separate_homo_derivs_2d = function( SKL ) {

	var Aders = []
		, wders = [];

	for ( var i = 0, l = SKL.length; i < l; i++ ) {
		var CK = VERB.eval.nurbs.separate_homo_derivs_1d( SKL[i] );
		Aders.push( CK[0] );
		wders.push( CK[1] );
	}

	return [Aders, wders];

}	


/**
 * Compute a point on a NURBS curve
 *
 * @param {Number} integer degree of curve
 * @param {Array} array of nondecreasing knot values
 * @param {Array} 2d array of homogeneous control points, where each control point is an array of length (dim+1) 
 									and form (wi*pi, wi)
 * @param {Number} parameter on the curve at which the point is to be evaluated
 * @return {Array} a point represented by an array of length (dim)
 * @api public
 */

VERB.eval.nurbs.rational_curve_point = function( degree, knot_vector, homo_control_points, u) {

	return VERB.eval.nurbs.dehomogenize( VERB.eval.nurbs.curve_point( degree, knot_vector, homo_control_points, u) );

}	

/**
 * Dehomogenize a point 
 *
 * @param {Array} a point represented by an array (wi*pi, wi) with length (dim+1)
 * @return {Array} a point represented by an array pi with length (dim)
 * @api public
 */

VERB.eval.nurbs.dehomogenize = function( homo_point ) {

	var dim = homo_point.length
		, point = []
		, wt = homo_point[dim-1];

	for (var i = 0; i < homo_point.length-1;i++)
		point.push( homo_point[i] / wt );

	return point;

}

/**
 * Transform a 1d array of points into their homogeneous equivalents
 *
 * @param {Array} 1d array of control points, (actually a 2d array of size (m x dim) )
 * @param {Array} array of control point weights, the same size as the array of control points (m x 1)
 * @return {Array} 1d array of control points where each point is (wi*pi, wi) where wi 
 									 is the ith control point weight and pi is the ith control point, 
 									 hence the dimension of the point is dim + 1
 * @api public
 */

VERB.eval.nurbs.homogenize_1d = function( control_points, weights) {

	var rows = control_points.length
		, dim = control_points[0].length
		, k = 0
		, homo_control_points = []
		, wt = 0
		, ref_pt = [];

	for (var i = 0; i < rows; i++) {

		var pt = [];
		ref_pt = control_points[i];
		wt = weights[i];

		for (k = 0; k < dim; k++) {
			pt.push( ref_pt[k] * wt );
		}

		// append the weight
		pt.push(wt);

		homo_control_points.push(pt);
	}

	return homo_control_points;

}

/**
 * Transform a 2d array of points into their homogeneous equivalents
 *
 * @param {Array} 2d array of control points, (actually a 3d array of size m x n x dim)
 * @param {Array} array of control point weights, the same size as the control points array (m x n x 1)
 * @return {Array} 1d array of control points where each point is (wi*pi, wi) where wi 
 									 is the ith control point weight and pi is the ith control point, the size is 
 									 (m x n x dim+1)
 * @api public
 */

VERB.eval.nurbs.homogenize_2d = function( control_points, weights) {

	var rows = control_points.length
		, cols = control_points[0].length
		, dim = control_points[0][0].length
		, j = 0
		, k = 0
		, homo_control_points = []
		, wt = 0
		, ref_pt = [];

	for (var i = 0; i < rows; i++) {
		homo_control_points.push( VERB.eval.nurbs.homogenize_1d(control_points[i], weights[i]) );
	}

	return homo_control_points;

}

/**
 * Compute the derivatives on a non-uniform, non-rational B spline surface
 *
 * @param {Number} integer degree of surface in u direction
 * @param {Array} array of nondecreasing knot values in u direction
 * @param {Number} integer degree of surface in v direction
 * @param {Array} array of nondecreasing knot values in v direction
 * @param {Array} 3d array of control points, where rows are the u dir, and columns run along the positive v direction, 
 									and where each control point is an array of length (dim)  
 * @param {Number} u parameter at which to evaluate the derivatives
 * @param {Number} v parameter at which to evaluate the derivatives
 * @return {Array} a point represented by an array of length (dim)
 * @api public
 */

VERB.eval.nurbs.surface_derivs = function( degree_u, knot_vector_u, degree_v, knot_vector_v, control_points, num_derivatives, u, v ) {

	var n = knot_vector_u.length - degree_u - 2
		, m = knot_vector_v.length - degree_v - 2;

	return VERB.eval.nurbs.surface_derivs_given_n_m( n, degree_u, knot_vector_u, m, degree_v, knot_vector_v, control_points, num_derivatives, u, v );

}

/**
 * Compute the derivatives on a non-uniform, non-rational B spline surface 
 * (corresponds to algorithm 3.6 from The NURBS book, Piegl & Tiller 2nd edition)
 *
 * @param {Number} integer number of basis functions in u dir - 1 = knot_vector_u.length - degree_u - 2
 * @param {Number} integer degree of surface in u direction
 * @param {Array} array of nondecreasing knot values in u direction
 * @param {Number} integer number of basis functions in v dir - 1 = knot_vector_u.length - degree_u - 2
 * @param {Number} integer degree of surface in v direction
 * @param {Array} array of nondecreasing knot values in v direction
 * @param {Array} 3d array of control points, where rows are the u dir, and columns run along the positive v direction, 
 									and where each control point is an array of length (dim)  
 * @param {Number} u parameter at which to evaluate the derivatives
 * @param {Number} v parameter at which to evaluate the derivatives
 * @return {Array} a point represented by an array of length (dim)
 * @api public
 */

VERB.eval.nurbs.surface_derivs_given_n_m = function( n, degree_u, knot_vector_u, m, degree_v, knot_vector_v, control_points, num_derivatives, u, v ) {

	if ( VERB.eval.nurbs.are_valid_relations(degree_u, control_points.length, knot_vector_u.length ) === false ||
		VERB.eval.nurbs.are_valid_relations(degree_v, control_points[0].length, knot_vector_v.length ) === false ) {
		console.error('Invalid relations between control points, knot vector, and n');
		return null;
	}

	var dim = control_points[0][0].length
		, du = Math.min(num_derivatives, degree_u)
		, dv = Math.min(num_derivatives, degree_v)
		, SKL = VERB.eval.nurbs.zeros_3d( du+1, dv+1, dim )
		, knot_span_index_u = VERB.eval.nurbs.knot_span_given_n( n, degree_u, u, knot_vector_u )
		, knot_span_index_v = VERB.eval.nurbs.knot_span_given_n( m, degree_v, v, knot_vector_v )
		, uders = VERB.eval.nurbs.deriv_basis_functions_given_n_i( knot_span_index_u, u, degree_u, n, knot_vector_u )  
		, vders = VERB.eval.nurbs.deriv_basis_functions_given_n_i( knot_span_index_v, v, degree_v, m, knot_vector_v )
		, temp = VERB.eval.nurbs.zeros_2d( degree_v+1, dim )
		, k = 0
		, s = 0
		, r = 0
		, l = 0
		, dd = 0;

	for (k = 0; k <= du; k++) {	
		for (s = 0; s <= degree_v; s++) {		
			temp[s] = VERB.eval.nurbs.zeros_1d( dim );

			for (r = 0; r <= degree_u; r++) {	
				temp[s] = numeric.add( temp[s], numeric.mul( uders[k][r], control_points[knot_span_index_u-degree_u+r][knot_span_index_v-degree_v+s]) );
			}
		}

		dd = Math.min(num_derivatives-k, dv);

		for (l = 0; l <= dd; l++) {	
			SKL[k][l] = VERB.eval.nurbs.zeros_1d( dim );

			for (s = 0; s <= degree_v; s++) {	
				SKL[k][l] = numeric.add( SKL[k][l], numeric.mul( vders[l][s], temp[s] ) );
			}
		}
	}

	return SKL;
}

/**
 * Compute a point on a non-uniform, non-rational B-spline surface
 *
 * @param {Number} integer degree of surface in u direction
 * @param {Array} array of nondecreasing knot values in u direction
 * @param {Number} integer degree of surface in v direction
 * @param {Array} array of nondecreasing knot values in v direction
 * @param {Array} 3d array of control points, where rows are the u dir, and columns run along the positive v direction, 
 									and where each control point is an array of length (dim)  
 * @param {Number} u parameter at which to evaluate the surface point
 * @param {Number} v parameter at which to evaluate the surface point
 * @return {Array} a point represented by an array of length (dim)
 * @api public
 */

VERB.eval.nurbs.surface_point = function( degree_u, knot_vector_u,  degree_v, knot_vector_v, control_points, u, v ) {

	var n = knot_vector_u.length - degree_u - 2
		, m = knot_vector_v.length - degree_v - 2;

	return 	VERB.eval.nurbs.surface_point_given_n_m( n, degree_u, knot_vector_u, m, degree_v, knot_vector_v, control_points, u, v );

}

/**
 * Compute a point on a non-uniform, non-rational B spline surface
 * (corresponds to algorithm 3.5 from The NURBS book, Piegl & Tiller 2nd edition)
 *
 * @param {Number} integer number of basis functions in u dir - 1 = knot_vector_u.length - degree_u - 2
 * @param {Number} integer degree of surface in u direction
 * @param {Array} array of nondecreasing knot values in u direction
 * @param {Number} integer degree of surface in v direction
 * @param {Array} array of nondecreasing knot values in v direction
 * @param {Array} 3d array of control points, where rows are the u dir, and columns run along the positive v direction, 
 									and where each control point is an array of length (dim)  
 * @param {Number} u parameter at which to evaluate the surface point
 * @param {Number} v parameter at which to evaluate the surface point
 * @return {Array} a point represented by an array of length (dim)
 * @api public
 */

VERB.eval.nurbs.surface_point_given_n_m = function( n, degree_u, knot_vector_u, m, degree_v, knot_vector_v, control_points, u, v ) {

	if ( VERB.eval.nurbs.are_valid_relations(degree_u, control_points.length, knot_vector_u.length ) === false ||
		VERB.eval.nurbs.are_valid_relations(degree_v, control_points[0].length, knot_vector_v.length ) === false ) {
		console.error('Invalid relations between control points, knot vector, and n');
		return null;
	}

	var dim = control_points[0][0].length
		, knot_span_index_u = VERB.eval.nurbs.knot_span_given_n( n, degree_u, u, knot_vector_u )
		, knot_span_index_v = VERB.eval.nurbs.knot_span_given_n( m, degree_v, v, knot_vector_v )
		, u_basis_vals = VERB.eval.nurbs.basis_functions_given_knot_span_index( knot_span_index_u, u, degree_u, knot_vector_u )
		, v_basis_vals = VERB.eval.nurbs.basis_functions_given_knot_span_index( knot_span_index_v, v, degree_v, knot_vector_v )
		, uind = knot_span_index_u - degree_u
		, vind = knot_span_index_v
		, position = VERB.eval.nurbs.zeros_1d( control_points[0][0].length )
		, temp = VERB.eval.nurbs.zeros_1d( control_points[0][0].length )
		, l = 0
		, k = 0;

	for (l = 0; l <= degree_v; l++) {	

		temp = VERB.eval.nurbs.zeros_1d( control_points[0][0].length );
		vind = knot_span_index_v - degree_v + l;

		for (k = 0; k <= degree_u; k++) {	
			temp = numeric.add( temp, numeric.mul( u_basis_vals[k], control_points[uind+k][vind]) );
		}
		position = numeric.add( position, numeric.mul(v_basis_vals[l], temp) );
	}

	return position;
}

/**
 * Determine the derivatives of a non-uniform, non-rational B-spline curve at a given parameter
 *
 * @param {Number} integer degree of curve
 * @param {Array} array of nondecreasing knot values
 * @param {Array} 2d array of control points, where each control point is an array of length (dim)  
 * @param {Number} parameter on the curve at which the point is to be evaluated
 * @return {Array} a point represented by an array of length (dim)
 * @api public
 */

VERB.eval.nurbs.curve_derivs = function( degree, knot_vector, control_points, u, num_derivs ) {

	var n = knot_vector.length - degree - 2;
	return VERB.eval.nurbs.curve_derivs_given_n( n, degree, knot_vector, control_points, u, num_derivs );

}		

/**
 * Determine the derivatives of a non-uniform, non-rational B-spline curve at a given parameter
 * (corresponds to algorithm 3.1 from The NURBS book, Piegl & Tiller 2nd edition)
 *
 * @param {Number} integer number of basis functions - 1 = knot_vector.length - degree - 2
 * @param {Number} integer degree of curve
 * @param {Array} array of nondecreasing knot values
 * @param {Array} 2d array of control points, where each control point is an array of length (dim)  
 * @param {Number} parameter on the curve at which the point is to be evaluated
 * @return {Array} a point represented by an array of length (dim)
 * @api public
 */

VERB.eval.nurbs.curve_derivs_given_n = function( n, degree, knot_vector, control_points, u, num_derivatives ) {

	if ( VERB.eval.nurbs.are_valid_relations(degree, control_points.length, knot_vector.length ) === false ) {
		console.error('Invalid relations between control points, knot vector, and n');
		return null;
	}

	var dim = control_points[0].length
		, du = Math.min(num_derivatives, degree)
		, CK = VERB.eval.nurbs.zeros_2d( du+1, dim )
		, knot_span_index = VERB.eval.nurbs.knot_span_given_n( n, degree, u, knot_vector )
		, nders = VERB.eval.nurbs.deriv_basis_functions_given_n_i( knot_span_index, u, degree, du, knot_vector )
		, k = 0
		, j = 0;

	for (k = 0; k <= du; k++) {	
		for (j = 0; j <= degree; j++) {
			CK[k] = numeric.add( CK[k], numeric.mul( nders[k][j], control_points[ knot_span_index - degree + j ] ) )
		}
	}
	return CK;

}		

/**
 * Confirm the relations between degree (p), number of control points(n+1), and the number of knots (m+1)
 * via The NURBS Book (section 3.2, Second Edition)
 *
 * @param {Number} integer degree
 * @param {Number} integer number of control points
 * @param {Number} integer length of the knot vector (including duplicate knots)
 * @return {Boolean} whether the values are correct
 * @api public
 */

VERB.eval.nurbs.are_valid_relations = function( degree, num_control_points, knot_vector_length ) {

	return ( num_control_points + degree + 1 - knot_vector_length ) === 0 ? true : false;

}		

/**
 * Compute a point on a non-uniform, non-rational b-spline curve
 *
 * @param {Number} integer degree of curve
 * @param {Array} array of nondecreasing knot values
 * @param {Array} 2d array of control points, where each control point is an array of length (dim)  
 * @param {Number} parameter on the curve at which the point is to be evaluated
 * @return {Array} a point represented by an array of length (dim)
 * @api public
 */

VERB.eval.nurbs.curve_point = function( degree, knot_vector, control_points, u) {

	var n = knot_vector.length - degree - 2;
	return VERB.eval.nurbs.curve_point_given_n( n, degree, knot_vector, control_points, u);

}		

/**
 * Compute a point on a non-uniform, non-rational b-spline curve
 * (corresponds to algorithm 3.1 from The NURBS book, Piegl & Tiller 2nd edition)
 *
 * @param {Number} integer number of basis functions - 1 = knot_vector.length - degree - 2
 * @param {Number} integer degree of curve
 * @param {Array} array of nondecreasing knot values
 * @param {Array} 2d array of control points, where each control point is an array of length (dim)  
 * @param {Number} parameter on the curve at which the point is to be evaluated
 * @return {Array} a point represented by an array of length (dim)
 * @api public
 */

VERB.eval.nurbs.curve_point_given_n = function( n, degree, knot_vector, control_points, u) {

	if ( VERB.eval.nurbs.are_valid_relations(degree, control_points.length, knot_vector.length ) === false ) {
		console.error('Invalid relations between control points, knot vector, and n');
		return null;
	}

	var knot_span_index = VERB.eval.nurbs.knot_span_given_n( n, degree, u, knot_vector )
		, basis_values = VERB.eval.nurbs.basis_functions_given_knot_span_index( knot_span_index, u, degree, knot_vector ) 
		, position = VERB.eval.nurbs.zeros_1d( control_points[0].length );

		for (var j = 0; j <= degree; j++ )	{
			position = numeric.add( position, numeric.mul( basis_values[j], control_points[ knot_span_index - degree + j ] ) );
		}

		return position;
}	

/**
 * Generate a 1d array of zeros
 *
 * @param {Number} integer number of rows
 * @return {Array} 1d array of given size
 * @api public
 */

VERB.eval.nurbs.zeros_1d = function(size) {
  size = size > 0 ? size : 0;

  var arr = [];

  while(size--) {
    arr.push(0);
  }

  return arr;
}

/**
 * Generate a 2D array of zeros
 *
 * @param {Number} integer number of rows
 * @param {Number} integer number of columns
 * @return {Array} 2d array of given size
 * @api public
 */

VERB.eval.nurbs.zeros_2d = function(rows, cols) {
  cols = cols > 0 ? cols : 0;
  rows = rows > 0 ? rows : 0;

  var arr = [];
  var cols_temp = cols;
  var rows_temp = rows;

  while(rows--) {
    arr.push([]);

    while(cols_temp--) {
      arr[rows_temp-rows-1].push(0);
    }
    cols_temp = cols;
  }

  return arr;
}

/**
 * Generate a 3D array of zeros
 *
 * @param {Number} integer number of rows
 * @param {Number} integer number of columns
 * @param {Number} integer depth (i.e. dimension of arrays in 2d matrix)
 * @return {Array} 3d array of given size
 * @api public
 */

VERB.eval.nurbs.zeros_3d = function(rows, cols, dim) {
  cols = cols > 0 ? cols : 0;
  rows = rows > 0 ? rows : 0;

  var arr = [];
  var cols_temp = cols;
  var rows_temp = rows;

  while(rows--) {
    arr.push([]);

    while(cols_temp--) {
      arr[rows_temp-rows-1].push( VERB.eval.nurbs.zeros_1d(dim) );
    }
    cols_temp = cols;
  }

  return arr;
}

/**
 * Compute the non-vanishing basis functions and their derivatives
 *
 * @param {Number} float parameter
 * @param {Number} integer degree
 * @param {Array} array of nondecreasing knot values
 * @return {Array} 2d array of basis and derivative values of size (n+1, p+1) The nth row is the nth derivative and the first row is made up of the basis function values.
 * @api public
 */

VERB.eval.nurbs.deriv_basis_functions = function( u, degree, knot_vector )
{
	var knot_span_index = VERB.eval.nurbs.knot_span( degree, u, knot_vector )
		, m = knot_vector.length - 1
		, n = m - degree - 1;

	return VERB.eval.nurbs.deriv_basis_functions_given_n_i( knot_span_index, u, degree, n, knot_vector );
}	

/**
 * Compute the non-vanishing basis functions and their derivatives
 * (corresponds to algorithm 2.3 from The NURBS book, Piegl & Tiller 2nd edition)
 *
 * @param {Number} integer knot span index
 * @param {Number} float parameter
 * @param {Number} integer degree
 * @param {Number} integer number of basis functions - 1 = knot_vector.length - degree - 2
 * @param {Array} array of nondecreasing knot values
 * @return {Array} 2d array of basis and derivative values of size (n+1, p+1) The nth row is the nth derivative and the first row is made up of the basis function values.
 * @api public
 */

VERB.eval.nurbs.deriv_basis_functions_given_n_i = function( knot_span_index, u, p, n, knot_vector )
{
	var ndu = VERB.eval.nurbs.zeros_2d(p+1, p+1)
		, left = new Array( p + 1 )
		, right = new Array( p + 1 )
		, saved = 0
		, temp = 0
		, j = 1
		, r = 0;

	ndu[0][0] = 1.0;

	for(j = 1; j <= p; j++) {

		left[j] = u - knot_vector[knot_span_index+1-j];
		right[j] = knot_vector[knot_span_index+j] - u;
		saved = 0.0;

		for (r = 0; r < j; r++) {

			ndu[j][r] = right[r+1] + left[j-r];
			temp = ndu[r][j-1] / ndu[j][r];

			ndu[r][j] = saved + right[r+1]*temp;
			saved = left[j-r]*temp;

		}
		ndu[j][j] = saved;
	}


	var ders = VERB.eval.nurbs.zeros_2d(n+1, p+1)
		, a = VERB.eval.nurbs.zeros_2d(2, p+1)
		, k = 1
		, s1 = 0
		, s2 = 1
		, d = 0
		, rk = 0
		, pk = 0
		, j1 = 0
		, j2 = 0;

	for(j = 0; j <= p; j++) {
		ders[0][j] = ndu[j][p];
	}

	for (r = 0; r<=p; r++) {
		s1 = 0;
		s2 = 1;
		a[0][0] = 1.0;

		for (k=1; k<=n ;k++)
		{
			d = 0.0;
			rk = r - k;
			pk = p - k;

			if (r >= k) {
				a[s2][0] = a[s1][0] / ndu[pk+1][rk];
				d = a[s2][0]*ndu[rk][pk];
			}

			if (rk >= -1) {
				j1 = 1;
			} else {
				j1 = -rk;
			}

			if (r-1 <= pk) {
				j2 = k-1;
			} else {
				j2 = p - r;
			}

			for (j = j1; j <= j2; j++) {
				a[s2][j] = ( a[s1][j] - a[s1][ j - 1 ] ) / ndu[ pk + 1 ][ rk + j ];
				d += a[s2][j]*ndu[rk+j][pk];
			}

			if (r <= pk)
			{
				a[s2][k] = -a[s1][k-1]/ndu[pk+1][r];
				d += a[s2][k] * ndu[r][pk];
			}

			ders[k][r] = d;
			j = s1;
			s1 = s2;
			s2 = j;
		}
	}

	r = p;
	for (k = 1; k <= n; k++) {
		for (j = 0; j <= p; j++) {
			ders[k][j] *= r;
		}
		r *= (p-k);
	}

	return ders;

};

/**
 * Compute the non-vanishing basis functions
 *
 * @param {Number} float parameter
 * @param {Number} integer degree of function
 * @param {Array} array of nondecreasing knot values
 * @return {Array} list of non-vanishing basis functions
 * @api public
 */

VERB.eval.nurbs.basis_functions = function( u, degree, knot_vector )
{
	var knot_span_index = VERB.eval.nurbs.knot_span(u, degree, knot_vector);
	return VERB.eval.nurbs.basis_functions_given_knot_span_index( knot_span_index, u, degree, knot_vector );
};

/**
 * Compute the non-vanishing basis functions
 * (corresponds to algorithm 2.2 from The NURBS book, Piegl & Tiller 2nd edition)
 *
 * @param {Number} integer knot span index
 * @param {Number} float parameter
 * @param {Number} integer degree of function
 * @param {Array} array of nondecreasing knot values
 * @return {Array} list of non-vanishing basis functions
 * @api public
 */

VERB.eval.nurbs.basis_functions_given_knot_span_index = function( knot_span_index, u, degree, knot_vector )
{
	var basis_functions = new Array( degree + 1 )
		, left = new Array( degree + 1 )
		, right = new Array( degree + 1 )
		, saved = 0
		, temp = 0;

	basis_functions[0] = 1.0;

	for(var j = 1; j <= degree; j++) {

		left[j] = u - knot_vector[knot_span_index+1-j];
		right[j] = knot_vector[knot_span_index+j] - u;
		saved = 0.0;

		for (var r = 0; r < j; r++) {

			temp = basis_functions[r] / ( right[r+1] + left[j-r] );
			basis_functions[r] = saved + right[r+1]*temp;
			saved = left[j-r]*temp;

		}

		basis_functions[j] = saved;
	}

	return basis_functions;
};


/**
 * Find the span on the knot vector without supplying n
 *
 * @param {Number} integer degree of function
 * @param {Number} float parameter
 * @param {Array} array of nondecreasing knot values
 * @return {Number} the index of the knot span
 * @api public
 */

VERB.eval.nurbs.knot_span = function( degree, u, knot_vector )
{

	var m = knot_vector.length - 1
		, n = m - degree - 1;

	return VERB.eval.nurbs.knot_span_given_n(n, degree, u, knot_vector);

};

/**
 * Find the span on the knot vector knot_vector of the given parameter
 * (corresponds to algorithm 2.1 from The NURBS book, Piegl & Tiller 2nd edition)
 *
 * @param {Number} integer number of basis functions - 1 = knot_vector.length - degree - 2
 * @param {Number} integer degree of function
 * @param {Number} float parameter
 * @param {Array} array of nondecreasing knot values
 * @return {Number} the index of the knot span
 * @api public
 */

VERB.eval.nurbs.knot_span_given_n = function( n, degree, u, knot_vector )
{
	if ( u >= knot_vector[n+1] )
	{
		return n;
	}

	if ( u < knot_vector[degree] )
	{
		return degree;
	}

	var low = degree
		, high = n+1
		, mid = Math.floor( (low + high) / 2 );

	while( u < knot_vector[ mid ] || u >= knot_vector[ mid + 1 ] )
	{
		if ( u < knot_vector[ mid ] )
		{
			high = mid;
		}
		else 
		{
			low = mid;
		}
		mid = Math.floor( (low + high) / 2 );
	}

	return mid;

};
