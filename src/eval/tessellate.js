

//
// ####rational_curve_regular_sample( degree, knots, control_points, num_samples [, include_u] )
//
// Sample a NURBS curve, corresponds to http://ariel.chronotext.org/dd/defigueiredo93adaptive.pdf
//
// **params**
// + *Number*, integer degree
// + array of nondecreasing knot values
// + 1d array of homogeneous control points, where each control point is an array of length (dim+1) and form (wi*pi, wi)
// + *Number*, integer number of samples
// + *Boolean*, whether to prefix the point with the parameter
//
// **returns**
// + an array of points, prepended by the point param
//

verb.eval.rational_curve_regular_sample = function( degree, knots, control_points, num_samples, include_u ) {

	return verb.eval.rational_curve_regular_sample_range( degree, knots, control_points, knots[0], verb.last(knots), num_samples, include_u);

}

//
// ####rational_curve_regular_sample_range( degree, knots, control_points, start_u, end_u, num_samples, include_u )
//
// Sample a NURBS curve assuming parameterization 0 to 1, corresponds to http://ariel.chronotext.org/dd/defigueiredo93adaptive.pdf
//
// **params**
// + *Number*, integer degree
// + array of nondecreasing knot values
// + 1d array of homogeneous control points, where each control point is an array of length (dim+1) and form (wi*pi, wi)
// + *Number*, start parameter for sampling
// + *Number*, end parameter for sampling
// + *Number*, integer number of samples
// + *Boolean*, whether to prefix the point with the parameter
//
// **returns**
// + an dictionary of parameter - point pairs
//

verb.eval.rational_curve_regular_sample_range = function( degree, knots, control_points, start_u, end_u, num_samples, include_u ) {

	if (num_samples < 1){
		num_samples = 2;
	}

	var p = [],
		span = (end_u - start_u) / (num_samples - 1),
		u = 0;

	for (var i = 0; i < num_samples; i++){

		u = start_u + span * i;
		if ( include_u ){
			p.push( [u].concat( verb.eval.rational_curve_point(degree, knots, control_points, u) ) );
		} else {
			p.push( verb.eval.rational_curve_point(degree, knots, control_points, u) );
		}

	}

	return p;

}
//
// ####tessellate_rational_surface_naive( degree_u, knots_u, degree_v, knots_v, homo_control_points, divs_u, divs_v )
//
// Tessellate a nurbs surface
//
// **params**
// + *Number*, integer degree of surface in u direction
// + array of nondecreasing knot values in u direction
// + *Number*, integer degree of surface in v direction
// + array of nondecreasing knot values in v direction
// + 3d array of control points, top to bottom is increasing u direction, left to right is increasing v direction,
// and where each control point is an array of length (dim+1)
//
// **returns**
// + first element of array is an array of positions, second element are 3-tuple of triangle windings, third element is the
// uvs

verb.eval.tessellate_rational_surface_naive = function( degree_u, knots_u, degree_v, knots_v, homo_control_points, divs_u, divs_v ) {

	if ( divs_u < 1 ) {
		divs_u = 1;
	}

	if ( divs_v < 1 ) {
		divs_v = 1;
	}

	var u_span = knots_u[knots_u.length-1] - knots_u[0];
	var v_span = knots_v[knots_v.length-1] - knots_v[0];

	var span_u = u_span / divs_u,
		span_v = v_span / divs_v;

  var points = [];
  var uvs = [];
  var normals = [];

	for (var i = 0; i < divs_u + 1; i++) {
		for (var j = 0; j < divs_v + 1; j++) {

			var pt_u = i * span_u,
				pt_v = j * span_v;

			uvs.push( [pt_u, pt_v] );

			var derivs = verb.eval.rational_surface_derivs( degree_u, knots_u, degree_v, knots_v, homo_control_points, 1, pt_u, pt_v );
			var pt = derivs[0][0];

			points.push( pt );

			var normal = numeric.normalized( numeric.cross(  derivs[0][1], derivs[1][0] ) );
			normals.push( normal );

		}
	}

  	var faces = [];

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

	return { points: points, faces : faces, uvs: uvs, normals: normals };

}


//
// ####rational_curve_adaptive_sample( degree, knots, control_points, tol, include_u )
//
// Sample a NURBS curve assuming parameterization 0 to 1, corresponds to http://ariel.chronotext.org/dd/defigueiredo93adaptive.pdf
//
// **params**
// + *Number*, integer degree
// + array of nondecreasing knot values
// + 2d array of homogeneous control points, where each control point is an array of length (dim+1)
// and form (wi*pi, wi)
// + *Number*, tol for the adaptive scheme
// + *Boolean*, whether to prefix the point with the parameter
//
// **returns**
// + an array of dim + 1 length where the first element is the param where it was sampled and the remaining the pt
//

verb.eval.rational_curve_adaptive_sample = function( degree, knots, control_points, tol, include_u ) {

	// if degree is 1, just return the dehomogenized control points
	if (degree === 1){
		if ( !include_u ) {
			return control_points.map( verb.eval.dehomogenize );
		} else {
			// the first element of each array is the parameter
			return control_points.map(function(x, i){
				return [ knots[i+1] ].concat( verb.eval.dehomogenize( x ) );
			});
		}
	}

	return verb.eval.rational_curve_adaptive_sample_range( degree, knots, control_points, knots[0], knots[knots.length-1], tol, include_u );

}

//
// ####rational_curve_adaptive_sample_range( degree, knots, control_points, start_u, end_u, tol, include_u )
//
// Sample a NURBS curve at 3 points, facilitating adaptive sampling
//
// **params**
// + *Number*, integer degree
// + array of nondecreasing knot values
// + 2d array of homogeneous control points, where each control point is an array of length (dim+1)
// and form (wi*pi, wi)
// + *Number*, start parameter for sampling
// + *Number*, end parameter for sampling
// + *Boolean*, whether to prefix the point with the parameter
//
// **returns**
// + an array of dim + 1 length where the first element is the param where it was sampled and the remaining the pt
//

verb.eval.rational_curve_adaptive_sample_range = function( degree, knots, control_points, start_u, end_u, tol, include_u ) {

	// sample curve at three pts
	var p1 = verb.eval.rational_curve_point(degree, knots, control_points, start_u),
		p3 = verb.eval.rational_curve_point(degree, knots, control_points, end_u),
		t = 0.5 + 0.2 * Math.random(),
		mid_u = start_u + (end_u - start_u) * t,
		p2 = verb.eval.rational_curve_point(degree, knots, control_points, mid_u);

	// if the two end control points are coincident, the three point test will always return 0, let's split the curve
	var diff = numeric.sub( p1, p3);
	var diff2 = numeric.sub( p1, p2);

	// the first condition checks if the curve makes up a loop, if so, we will need to continue evaluation
	if ( ( numeric.dot( diff, diff ) < tol && numeric.dot( diff2, diff2 ) > tol ) || !verb.eval.three_points_are_flat( p1, p2, p3, tol ) ) {

		// get the exact middle
		var exact_mid_u = start_u + (end_u - start_u) * 0.5;

		// recurse on the two halves
		var left_pts = verb.eval.rational_curve_adaptive_sample_range( degree, knots, control_points, start_u, exact_mid_u, tol, include_u )
			, right_pts = verb.eval.rational_curve_adaptive_sample_range( degree, knots, control_points, exact_mid_u, end_u, tol, include_u );

		// concatenate the two
		return left_pts.slice(0, -1).concat(right_pts);

	} else {

		if (include_u){
			return [ 	[ start_u ].concat(p1) , [end_u].concat(p3) ];
		} else {
			return [ 	p1, p3 ];
		}
	}
}

//
// ####three_points_are_flat( p1, p2, p3, tol )
//
// Determine if three points form a straight line within a given tolerance for their 2 * squared area
//
//          * p2
//         / \
//        /   \
//       /     \
//      /       \
//     * p1 ---- * p3
//
// The area metric is 2 * the squared norm of the cross product of two edges, requiring no square roots and no divisions
//
// **params**
// + p1
// + p2
// + p3
// + *Number*, The tolerance for whether the three points form a line
//
// **returns**
// + *Number*, Whether the triangle passes the test
//
verb.eval.three_points_are_flat = function( p1, p2, p3, tol ) {

	// find the area of the triangle without using a square root
	var p2mp1 = numeric.sub( p2, p1 )
		, p3mp1 = numeric.sub( p3, p1 )
		, norm = crossprod( p2mp1, p3mp1 )
		, area = numeric.dot( norm, norm );

	return area < tol;

}

verb.eval.divide_rational_surface_adaptive = function( degree_u, knots_u, degree_v, knots_v, homo_control_points, options ) {

	var i, j, li, lj;

	var srf = {
		degree_u: degree_u,
		knots_u: knots_u,
		degree_v: degree_v,
		knots_v: knots_v,
		homo_control_points: homo_control_points
	};

	options = options || {};
	options.minDivsU = options.minDivsU || 1;
	options.minDivsV = options.minDivsV || 1;
	options.refine = options.refine != undefined ? options.refine : true;

	var divsU = options.minDivsU = Math.max( options.minDivsU, (homo_control_points.length - 1) * 3 );
	var divsV = options.minDivsV = Math.max( options.minDivsV, (homo_control_points.length - 1) * 3 );

	// get necessary intervals
	var umax = verb.last(knots_u);
	var umin = knots_u[0];
	var vmax = verb.last(knots_v);
	var vmin = knots_v[0];

	var du = (umax - umin) / divsU
		, dv = (vmax - vmin) / divsV;

	var divs = [];
	var pts = [];

	// 1) evaluate all of the corners
	for (i = 0, li = divsV + 1; i < li; i++){
		var ptrow = [];
		for (j = 0, lj = divsU + 1; j < lj; j++){

			var u = umin + du * j
				, v = vmin + dv * i;

			// todo: make this faster by specifying n,m
			var ds = verb.eval.rational_surface_derivs( degree_u, 
																												knots_u, 
																												degree_v, 
																												knots_v, 
																												homo_control_points, 
																												1, 
																												u, 
																												v );

			var norm = numeric.normalized( numeric.cross(  ds[0][1], ds[1][0] ) );
		  ptrow.push( new verb.SurfacePoint( ds[0][0], 
		  																				norm, 
		  																				[u,v],
		  																				null, 
		  																				verb.isZero( norm ) ) );
		}
		pts.push( ptrow );
	}

	// 2) make all of the nodes
	for (i = 0; i < divsV; i++){
		for (j = 0; j < divsU; j++){
			var corners = [ pts[divsV - i - 1][j],
											pts[divsV - i - 1][j+1],
											pts[divsV - i][j+1],
											pts[divsV - i][j] ];

		  divs.push( new verb.eval.AdaptiveRefinementNode( srf, corners ) );
		}
	}

	if (!options.refine) return divs;

	// 3) assign all of the neighbors and divide
	for (i = 0; i < divsV; i++){
		for (j = 0; j < divsU; j++){

			var ci = i * divsU + j
				, n = verb.north( ci, i, j, divsU, divsV, divs )
				, e = verb.east( ci, i, j, divsU, divsV, divs  )
				, s = verb.south( ci, i, j, divsU, divsV, divs )
				, w = verb.west( ci, i, j, divsU, divsV, divs  );

		  divs[ci].neighbors = [ s, e, n, w ];
			divs[ci].divide( options );
		}
	}

	return divs;

}

verb.north = function(index, i, j, divsU, divsV, divs){
	if (i === 0) return null;
	return divs[ index - divsU ];
}

verb.south = function(index, i, j, divsU, divsV, divs){
	if (i === divsV - 1) return null;
	return divs[ index + divsU ];
}

verb.east = function(index, i, j, divsU, divsV, divs){
	if (j === divsU - 1) return null;
	return divs[ index + 1 ];
}

verb.west = function(index, i, j, divsU, divsV, divs){
	if (j === 0) return null;		
	return divs[ index - 1 ];
}

verb.eval.triangulate_adaptive_refinement_node_tree = function( arrTree ){

	// triangulate all of the nodes of the tree
	var mesh = verb.TriMesh.empty();
	arrTree.forEach(function(x){  x.triangulate( mesh ); });
	return mesh;

}

verb.eval.tessellate_rational_surface_adaptive = function( degree_u, knots_u, degree_v, knots_v, homo_control_points, options ) {

	// adaptive divide
	var arrTrees = verb.eval.divide_rational_surface_adaptive( degree_u, knots_u, degree_v, knots_v, homo_control_points, options );

	// triangulation
	return verb.eval.triangulate_adaptive_refinement_node_tree( arrTrees );
}

verb.eval.dist_to_seg = function(a, b, c){

	// check if ac is zero length
	var acv = numeric.sub( c, a );
	var acl = numeric.norm2( acv );

	// subtract b from a
	var bma = numeric.sub(b, a);

	if ( acl < verb.TOLERANCE ){
		return numeric.norm2( bma ); 
	}

	// normalized ac
	var ac = numeric.mul( 1 / acl, acv );

	// project b - a to ac = p
	var p = numeric.dot( bma, ac );

	// multiply ac by d = acd
	var acd = numeric.add( a, numeric.mul( p, ac ) );

	// subtract acd from adp
	return numeric.norm2( numeric.sub( acd, b ) );

}

verb.SurfacePoint = function(point, normal, uv, id, degen){
	this.uv = uv;
	this.point = point;
	this.normal = normal;
	this.id = id;
	this.degen = degen;
}

verb.SurfacePoint.fromUv = function(u,v){
	return new verb.SurfacePoint(null, null, [u,v], null, null);
}

verb.TriMesh = function(faces, points, uvs, normals){
	this.faces = faces;
	this.points = points;
	this.uvs = uvs;
	this.normals = normals;
}

verb.TriMesh.empty = function(){
	return new verb.TriMesh([],[],[],[]);
}

verb.eval.AdaptiveRefinementNode = function( srf, corners, parentNode, neighbors ) {

	// 
	// Structure of the child nodes
	// in the adaptive refinement tree
  //
  //  v
  //  ^
  //  | 
  //  +--> u
  // 
  //                        neighbors[2]
  //
	//                (u0,v1)---(u05,v1)---(u1,v1)
	//                  |           |          |
	//                  |     3     |     2    |
	//                  |           |          |
	// neighbors[3]   (u0,v05)--(u05,v05)--(u1,v05)   neighbors[1] 
	//                  |           |          | 
	//                  |     0     |     1    |
	//                  |           |          |
	//                (u0,v0)---(u05,v0)---(u1,v0)
	//
	//                        neighbors[0]
	//

	this.srf = srf;

	this.parentNode = parentNode;
	this.neighbors = neighbors || [null, null, null, null];

	// if no corners, we need to construct initial corners from the surface
	if (!corners){
		var u0 = srf ? srf.knots_u[0] : null;
		var u1 = srf ? verb.last( srf.knots_u ) : null;
		var v0 = srf ? srf.knots_v[0] : null;
		var v1 = srf ? verb.last( srf.knots_v ) : null;

		corners = [ verb.SurfacePoint.fromUv( u0, v0 ),
								verb.SurfacePoint.fromUv( u1, v0 ),
								verb.SurfacePoint.fromUv( u1, v1 ),
								verb.SurfacePoint.fromUv( u0, v1 ) ];

	}

	this.corners = corners;

}

verb.eval.AdaptiveRefinementNode.prototype.isLeaf = function(){
	return this.children === undefined;
};

verb.eval.AdaptiveRefinementNode.prototype.center = function(){
	return this.centerPoint || this.evalSrf( this.u05, this.v05 );
}

verb.eval.AdaptiveRefinementNode.prototype.evalCorners = function(){

	// eval the center
	this.u05 = this.u05 || (this.corners[0].uv[0] + this.corners[2].uv[0]) / 2;
	this.v05 = this.v05 || (this.corners[0].uv[1] + this.corners[2].uv[1]) / 2;

	// eval all of the corners
	for (var i = 0; i < 4; i++) {
		// if it's not already evaluated
		if ( !this.corners[i].point ){
			// evaluate it
			var c = this.corners[i];
			this.evalSrf( c.uv[0], c.uv[1], c )
		} 
	}
}

verb.eval.AdaptiveRefinementNode.prototype.evalSrf = function( u, v, srfPt ){

	var derivs = verb.eval.rational_surface_derivs( this.srf.degree_u, 
																												this.srf.knots_u, 
																												this.srf.degree_v, 
																												this.srf.knots_v, 
																												this.srf.homo_control_points, 
																												1, 
																												u, 
																												v );
	var pt = derivs[0][0];
	var norm = numeric.cross(  derivs[0][1], derivs[1][0] );
	var degen = verb.isZero( norm );
	
	if (!degen) norm = numeric.normalized( norm );

	if (srfPt){
		srfPt.degen = degen;
		srfPt.point = pt;
		srfPt.normal = norm;
		return srfPt;
	} else {
		return new verb.SurfacePoint( pt, norm, [u,v], null, degen );
	}

};

verb.eval.AdaptiveRefinementNode.prototype.getEdgeCorners = function( edgeIndex ){

	// if its a leaf, there are no children to obtain uvs from
	if ( this.isLeaf() ) return [ this.corners[ edgeIndex ] ]

	if ( this.horizontal ){

		switch (edgeIndex){
			case 0:
				return this.children[0].getEdgeCorners( 0 );
			case 1:
				return this.children[0].getEdgeCorners( 1 ).concat( this.children[1].getEdgeCorners( 1 ) );
			case 2:
				return this.children[1].getEdgeCorners( 2 );
			case 3:
				return this.children[1].getEdgeCorners( 3 ).concat( this.children[0].getEdgeCorners( 3 ) );
		}

	}

	// vertical case

	switch (edgeIndex) {
		case 0:
			return this.children[0].getEdgeCorners( 0 ).concat( this.children[1].getEdgeCorners( 0 ) );
		case 1:
			return this.children[1].getEdgeCorners( 1 );
		case 2:
			return this.children[1].getEdgeCorners( 2 ).concat( this.children[0].getEdgeCorners( 2 ) );
		case 3:
			return this.children[0].getEdgeCorners( 3 );
	}

	// get the uvs owned by the children along this edge
	// return this.children[ edgeIndex ]
	// 						.getEdgeCorners( edgeIndex )
	// 						.concat( this.children[ (edgeIndex + 1) % 4 ].getEdgeCorners( edgeIndex ));

};

verb.eval.AdaptiveRefinementNode.prototype.getAllCorners = function( edgeIndex ){

	var baseArr = [ this.corners[edgeIndex] ];

	if ( !this.neighbors[edgeIndex] ) {
		return baseArr;
	}

	// get opposite edges uvs
	var corners = this.neighbors[edgeIndex].getEdgeCorners( ( edgeIndex + 2 ) % 4 );

	var funcIndex = edgeIndex % 2;

	var e = verb.EPSILON;
	var that = this;

	// range clipping functions
	var rangeFuncMap = [
		function(c){ return c.uv[0] > that.corners[0].uv[0] + e && c.uv[0] < that.corners[2].uv[0] - e;  },
		function(c){ return c.uv[1] > that.corners[0].uv[1] + e && c.uv[1] < that.corners[2].uv[1] - e;  },
	];

	// clip the range of uvs to match this one
	return baseArr.concat( corners.filter( rangeFuncMap[ funcIndex ] ).reverse() ) ;

};

verb.eval.AdaptiveRefinementNode.prototype.midpoint = function( index ){

	if (!this.midPoints) this.midpoints = [null, null, null, null];
	if (this.midpoints[index]) return this.midpoints[index];

	switch (index){
		case 0:
			this.midpoints[0] = this.evalSrf( this.u05, this.corners[0].uv[1] );
			break;
		case 1:
			this.midpoints[1] = this.evalSrf( this.corners[1].uv[0], this.v05 );
			break;
		case 2:
			this.midpoints[2] = this.evalSrf( this.u05, this.corners[2].uv[1] );
			break;
		case 3:
			this.midpoints[3] = this.evalSrf( this.corners[0].uv[0], this.v05 );
			break;
	}

	return this.midpoints[index];

} 

verb.eval.AdaptiveRefinementNode.prototype.hasBadNormals = function( vec ){
	return this.corners[0].degen || this.corners[1].degen || this.corners[2].degen || this.corners[3].degen;
} 

verb.eval.AdaptiveRefinementNode.prototype.fixNormals = function(){
	for (var i = 0, l = this.corners.length; i < l; i++){
		
		var corn = this.corners[i];

		if (this.corners[i].degen) {

			// get neighbors
			var v1 = this.corners[(i + 1) % l];
			var v2 = this.corners[(i + 3) % l];

			// correct the normal
			this.corners[i].normal = v1.degen ? v2.normal : v1.normal;

		}

	}
} 

verb.eval.AdaptiveRefinementNode.prototype.shouldDivide = function( options, currentDepth ){

	if ( currentDepth < options.minDepth ) return true;
	if ( currentDepth >= options.maxDepth ) return false;

	if ( this.hasBadNormals() ) {
		this.fixNormals();
		// don't divide any further when encountering a degenerate normal
		return false; 
	}

	this.splitVert = numeric.norm2Squared( numeric.sub( this.corners[0].normal, this.corners[1].normal ) ) > options.normTol || 
		numeric.norm2Squared( numeric.sub( this.corners[2].normal, this.corners[3].normal ) ) > options.normTol;

	this.splitHoriz = numeric.norm2Squared( numeric.sub( this.corners[1].normal, this.corners[2].normal ) ) > options.normTol || 
		numeric.norm2Squared( numeric.sub( this.corners[3].normal, this.corners[0].normal ) ) > options.normTol;

	if ( this.splitVert || this.splitHoriz ) return true;

	var center = this.center();

	return numeric.norm2Squared( numeric.sub( center.normal, this.corners[0].normal ) ) > options.normTol ||
				 numeric.norm2Squared( numeric.sub( center.normal, this.corners[1].normal ) ) > options.normTol || 
				 numeric.norm2Squared( numeric.sub( center.normal, this.corners[2].normal ) ) > options.normTol || 
				 numeric.norm2Squared( numeric.sub( center.normal, this.corners[3].normal ) ) > options.normTol;
}

verb.eval.AdaptiveRefinementNode.prototype.divide = function( options ){

	options = options || {};
	options.normTol = options.normTol || 8.5e-2;
	options.minDepth = options.minDepth != undefined ? options.minDepth : 0;
	options.maxDepth = options.maxDepth != undefined ? options.maxDepth : 10;

	this._divide( options, 0, true );

};

verb.eval.AdaptiveRefinementNode.prototype._divide = function( options, currentDepth, horiz ){

	this.evalCorners();

	if ( !this.shouldDivide( options, currentDepth )  ) return;
	
	currentDepth++;
	
	// is the quad flat in one dir and curved in the other?  
	if (this.splitVert && !this.splitHoriz) {
		horiz = false;
	} else if (!this.splitVert && this.splitHoriz){
		horiz = true;
	 }

	this.horizontal = horiz;

	if (this.horizontal){

		var bott = 	[ this.corners[0], this.corners[1], this.midpoint(1), this.midpoint(3)  ];
		var top = 	[ this.midpoint(3), this.midpoint(1), this.corners[2], this.corners[3]  ];

		this.children = [ 	new verb.eval.AdaptiveRefinementNode( this.srf, bott, this ),
												new verb.eval.AdaptiveRefinementNode( this.srf, top, this ) ];

		// assign neighbors to bottom node
		this.children[0].neighbors = [ this.neighbors[0], this.neighbors[1], this.children[1], this.neighbors[3] ];

		// assign neighbors to top node
		this.children[1].neighbors = [ this.children[0], this.neighbors[1], this.neighbors[2], this.neighbors[3] ];

	} else {

		var left = [ this.corners[0], this.midpoint(0), this.midpoint(2), this.corners[3]  ];
		var right = [ this.midpoint(0), this.corners[1], this.corners[2], this.midpoint(2)  ];

		this.children = [ 	new verb.eval.AdaptiveRefinementNode( this.srf, left, this ),
												new verb.eval.AdaptiveRefinementNode( this.srf, right, this ) ];

		this.children[0].neighbors = [ this.neighbors[0], this.children[1], this.neighbors[2], this.neighbors[3] ];
		this.children[1].neighbors = [ this.neighbors[0], this.neighbors[1], this.neighbors[2], this.children[0] ];

	}

	// divide all children recursively
	this.children.forEach(function(x){ x._divide( options, currentDepth, !horiz ); })

};

verb.eval.AdaptiveRefinementNode.prototype.triangulate = function( mesh ){

	mesh = mesh || verb.TriMesh.empty();

	if ( this.isLeaf() ) return this.triangulateLeaf( mesh );

	// recurse on the children
	this.children.forEach(function(x){
		if (!x) return;
		x.triangulate( mesh );
	});

	return mesh;

};

verb.eval.AdaptiveRefinementNode.prototype.triangulateLeaf = function( mesh ){

	var baseIndex = mesh.points.length 
		, uvs = []
		, ids = []
		, i = 0
		, corner
		, l
		, j
		, splitid;

	// enumerate all uvs in counter clockwise direction
	for (i = 0; i < 4; i++){

		var edgeCorners = this.getAllCorners(i);

		// this is the vertex that is split
		if (edgeCorners.length === 2 ) splitid = i + 1;

		for (j = 0; j < edgeCorners.length; j++) 
			uvs.push(edgeCorners[j])
	}

	for (i = 0, l = uvs.length; i < l; i++){
		corner = uvs[i];

		// if the id is defined, we can just push it and continue
		if (corner.id != undefined){
			ids.push(corner.id);
			continue;
		}

		mesh.uvs.push( corner.uv );
		mesh.points.push( corner.point );
		mesh.normals.push( corner.normal );

		corner.id = baseIndex;
		ids.push( baseIndex );

		baseIndex++;
	}

	if (uvs.length === 4){

		// if the number of points is 4, we're just doing a
		// rectangle - just build the basic triangulated square
		mesh.faces.push( [ ids[0], ids[3], ids[1] ] );
		mesh.faces.push( [ ids[3], ids[2], ids[1] ] );

		// all done 
		return mesh;

	} else if (uvs.length === 5){

		// use the splitcorner to triangulate
		var il = ids.length;

		// there will be 3 triangles
		mesh.faces.push( [ ids[ splitid ], 
											 ids[ (splitid + 1) % il ], 
											 ids[ (splitid + 2) % il ] ] );

		mesh.faces.push( [ ids[ (splitid + 4) % il ], 
											 ids[ (splitid + 3) % il ], 
											 ids[ splitid ] ] );

		mesh.faces.push( [ ids[ splitid ], 
		 									 ids[ (splitid + 2) % il ],
		 									 ids[ (splitid + 3) % il ] ]);

		return mesh;

	}

	// make point at center of face
	var center = this.center();

	mesh.uvs.push( center.uv );	
	mesh.points.push( center.point );
	mesh.normals.push( center.normal );

	// get index 
	var centerIndex = mesh.points.length - 1;

	// build triangle fan from center
	for (i = 0, j = uvs.length-1; i < uvs.length; j = i++){
		mesh.faces.push( [	centerIndex, ids[j], ids[i]   ]);
	}

	return mesh;

};


