public static function rational_surface_closest_point( degree_u, knots_u, degree_v, knots_v, homo_control_points, p ){

	// for surfaces, we try to minimize the following:
	// 
	// f = Su(u,v) * r = 0
	// g = Sv(u,v) * r = 0
	//
	//  where r = S(u,v) - P
	//
	// Again, this requires newton iteration, but this time our objective function is vector valued
	//
	//    J d = k
	//
	//    d =   [ u* - u, v* - v ]
	//		k = - [ f(u,v), g(u,v) ]
	//		J =
	//          |Su|^2   +  Suu * r       Su*Sv  +  Suv * r
	//				   Su*Sv   +  Svu * r      |Sv|^2  +  Svv * r
	//
	//	
	// 	we have similar halting conditions:
	//
	//  point coincidence
	//
	//		|S(u,v) - p| < e1
	//
	//  cosine
	//
	//   |Su(u,v)*(S(u,v) - P)|
	//   ----------------------  < e2
	//   |Su(u,v)| |S(u,v) - P|
	//
	//   |Sv(u,v)*(S(u,v) - P)|
	//   ----------------------  < e2
	//   |Sv(u,v)| |S(u,v) - P|
	//
	//  1) first check 2 & 3
	// 	2) if at least one of these is not, compute new value, otherwise halt
	// 	3) ensure the parameter stays within range
	// 			* if not closed, don't allow outside of range a-b
	// 			* if closed (e.g. circle), allow to move back to beginning
	//  4)  if |(u* - u)C'(u)| < e1, halt
	//
	
	var maxits = 5;
	var i = 0
		, e
		, eps1 = 0.0001
		, eps2 = 0.0005
		, dif
		, minu = knots_u[0]
		, maxu = verb.last(knots_u)
		, minv = knots_v[0]
		, maxv = verb.last(knots_v)
		, closedu = homo_control_points[0].reduce(function(acc,x,i){ return acc && Vec.normSquared( Vec.sub(x, verb.last(homo_control_points)[i] ) ) < verb.EPSILON; })
		, transposed = Vec.transpose( homo_control_points )
		, closedv = transposed[0].reduce(function(acc, x,i){ return acc && Vec.normSquared( Vec.sub(x, verb.last(transposed)[i] ) ) < verb.EPSILON; })
		, cuv;

	// console.log(closedu, closedv)


	// approximate closest point with tessellation
	var tess = verb.eval.tessellate_rational_surface_adaptive( degree_u, knots_u, degree_v, knots_v, 
		homo_control_points, { normTol: 5e-2 } );

	var dmin = Number.MAX_VALUE;
	tess.points.forEach(function(x,i){

		var d = Vec.normSquared( Vec.sub( p, x ) );

		if ( d < dmin ){
			dmin = d;
			cuv = tess.uvs[i];
		}

	});

	// console.log(dmin)

	function f(uv){
		var d = verb.eval.rational_surface_derivs( degree_u, knots_u, degree_v, knots_v, homo_control_points, 2, uv[0], uv[1] );
		// console.log(d);
		return d;
	}

	function n(uv, e, r){

		// f = Su(u,v) * r = 0
		// g = Sv(u,v) * r = 0

		var Su = e[1][0];
		var Sv = e[0][1];

		var Suu = e[2][0];
		var Svv = e[0][2];

		var Suv = e[1][1];
		var Svu = e[1][1];

		var f = Vec.dot( Su, r );
		var g = Vec.dot( Sv, r );

		var k = [-f, -g];

		var J00 = Vec.dot( Su, Su ) + Vec.dot( Suu, r );
		var J01 = Vec.dot( Su, Sv ) + Vec.dot( Suv, r );
		var J10 = Vec.dot( Su, Sv ) + Vec.dot( Svu, r );
		var J11 = Vec.dot( Sv, Sv ) + Vec.dot( Svv, r );

		var J = [ [ J00, J01 ], [ J10, J11 ] ];

		//    d =   [ u* - u, v* - v ]
		//		k = - [ f(u,v), g(u,v) ]
		//		J =
		//          |Su|^2   +  Suu * r       Su*Sv  +  Suv * r
		//				   Su*Sv   +  Svu * r      |Sv|^2  +  Svv * r
		//

		var d = Vec.solve( J, k );

		return Vec.add( d, uv );

	}

	while( i < maxits ){

		e = f(cuv);
		dif = Vec.sub(e[0][0], p );
	
		// console.log('dist', Vec.normSquared(dif))
		// console.log('uv', cuv)

		//  point coincidence
		//
		//		|S(u,v) - p| < e1
		var c1v = Vec.norm( dif );

		//
		//  cosine
		//
		//   |Su(u,v)*(S(u,v) - P)|
		//   ----------------------  < e2
		//   |Su(u,v)| |S(u,v) - P|
		//
		//   |Sv(u,v)*(S(u,v) - P)|
		//   ----------------------  < e2
		//   |Sv(u,v)| |S(u,v) - P|
		//
		var c2an = Vec.norm( Vec.dot( e[1][0], dif) );
		var c2ad = Vec.norm( e[1][0] ) * c1;

		var c2bn = Vec.norm( Vec.dot( e[0][1], dif) );
		var c2bd = Vec.norm( e[0][1] ) * c1;

		var c2av = c2an / c2ad;
		var c2bv = c2bn / c2bd;

		var c1 = c1v < eps1;
		var c2a = c2av < eps2;
		var c2b = c2bv < eps2;

		// if all of the tolerance are met, we're done
		if (c1 && c2a && c2b){
			return cuv;
		}

		// otherwise, take a step
		var ct = n(cuv, e, dif);

		// console.log('ct prop', ct)

		// correct for exceeding bounds
		if ( ct[0] < minu ){
			ct = closedu ? [ maxu - ( ct[0] - minu ), ct[1] ] : [ minu + verb.EPSILON, ct[1] ];
		} else if (ct[0] > maxu){
			ct = closedu ? [ minu + ( ct[0] - maxu ), ct[1] ] : [ maxu - verb.EPSILON, ct[1] ];
		}

		if ( ct[1] < minv ){
			ct = closedv ? [ ct[0], maxv - ( ct[1] - minv ) ] : [ ct[0], minv + verb.EPSILON ];
		} else if (ct[1] > maxv){
			ct = closedv ? [ ct[0], minv + ( ct[0] - maxv ) ] : [ ct[0], maxv - verb.EPSILON ];
		}

		// if |(u* - u) C'(u)| < e1, halt
		var c3v0 =  Vec.norm( Vec.mul(ct[0] - cuv[0], e[1][0] ) );
		var c3v1 =  Vec.norm( Vec.mul(ct[1] - cuv[1], e[0][1] ) );

		if (c3v0 + c3v1 < eps1) {
			return cuv;
		}

		cuv = ct;
		i++;

	}

	return cuv;

}

public static function rational_curve_closest_point( degree, knots, control_points, p ){

	//  We want to solve:
	// 
	//   C'(u) * ( C(u) - P ) = 0 = f(u)
	//
	//  C(u) is the curve, p is the point, * is a dot product
	// 
	// We'll use newton's method:
	// 
	// 	 u* = u - f / f'  
	//
	// We use the product rule in order to form the derivative, f':
	//
	//	f' = C"(u) * ( C(u) - p ) + C'(u) * C'(u)
	//
	// What is the conversion criteria? (Piegl & Tiller suggest)
	//
	// |C(u) - p| < e1
	//
	// |C'(u)*(C(u) - P)|
	// ------------------  < e2
	// |C'(u)| |C(u) - P|
	//
	//  1) first check 2 & 3
	// 	2) if at least one of these is not, compute new value, otherwise halt
	// 	3) ensure the parameter stays within range
	// 			* if not closed, don't allow outside of range a-b
	// 			* if closed (e.g. circle), allow to move back to beginning
	//  4)  if |(u* - u)C'(u)| < e1, halt
	//

	var tol = 1e-3;
	var min = Number.MAX_VALUE;
	var u = 0;

	var pts = verb.eval.rational_curve_adaptive_sample( degree, knots, control_points, tol, true )

	for (var i = 0; i < pts.length-1; i++){

		var u0 = pts[i][0];
		var u1 = pts[i+1][0];

		var p0 = pts[i].slice(1);
		var p1 = pts[i+1].slice(1);

		var proj = verb.eval.closest_point_on_segment( p, p0, p1, u0, u1 );
		var d = Vec.norm( Vec.sub( p, proj.pt ) );

		if ( d < min ){
			min = d;
			u = proj.u;
		}
	}

	var maxits = 5
		, i = 0
		, e
		, eps1 = 0.0001
		, eps2 = 0.0005
		, dif
		, minu = knots[0]
		, maxu = verb.last(knots)
		, closed = Vec.normSquared( Vec.sub(control_points[0], verb.last( control_points) ) ) < verb.EPSILON
		, cu = u; 

	function f(u){
		return verb.eval.rational_curve_derivs( degree, knots, control_points, u, 2 );
	}

	function n(u, e, d){

		//   C'(u) * ( C(u) - P ) = 0 = f(u)
		var f = Vec.dot( e[1], d );

		//	f' = C"(u) * ( C(u) - p ) + C'(u) * C'(u)
		var s0 = Vec.dot( e[2], d )
			, s1 = Vec.dot( e[1], e[1] )
			, df = s0 + s1;

		return u - f / df;

	}

	while( i < maxits ){

		e = f( cu );
		dif = Vec.sub( e[0], p );

		// |C(u) - p| < e1
		var c1v = Vec.norm( dif );
		
		// C'(u) * (C(u) - P)
		// ------------------ < e2
		// |C'(u)| |C(u) - P|
		var c2n = Vec.dot( e[1], dif);
		var c2d = Vec.norm( e[1] ) * c1v;

		var c2v = c2n / c2d;

		var c1 = c1v < eps1;
		var c2 = Math.abs(c2v) < eps2;

		// if both tolerances are met
		if (c1 && c2){
			return cu;
		}

		var ct = n(cu, e, dif);

		// are we outside of the bounds of the curve?
		if ( ct < minu ){
			ct = closed ? maxu - ( ct - minu ) : minu;
		} else if (ct > maxu){
			ct = closed ? minu + ( ct - maxu ) : maxu;
		}

		// will our next step force us out of the curve?
		var c3v = Vec.norm( Vec.mul(ct - cu, e[1] ) );
		if (c3v < eps1) {
			return cu;
		}

		cu = ct;
		i++;

	}

	return cu;

}

public static function rational_curve_divide_curve_equally_by_arc_length(degree, knots, control_points, num){

	var tlen = verb.eval.rational_curve_arc_length( degree, knots, control_points );
	var inc = tlen / num;

	return verb.eval.rational_curve_divide_curve_by_arc_length(degree, knots, control_points, inc);

}

function CurvePoint(u, len){
	this.u = u;
	this.len = len;
}

public static function rational_curve_divide_curve_by_arc_length(degree, knots, control_points, l){

	var crvs = verb.eval.curve_bezier_decompose( degree, knots, control_points )
		, crvlens = crvs.map(function(x){ return verb.eval.rational_bezier_curve_arc_length( x.degree, x.knots, x.control_points ); })
		, totlen = crvlens.reduce(function(acc, l){ return acc + l; }, 0)
		, pts = [ new CurvePoint( knots[0], 0 ) ];

	if (l > totlen) return pts;

	var inc = l
		, i = 0
		, lc = inc
		, runsum = 0
		, runsum1 = 0
		, u;

	while ( i < crvs.length ){

		runsum += crvlens[i];

		while ( lc < runsum + verb.EPSILON ){

			u = verb.eval.rational_bezier_curve_param_at_arc_length( crvs[i].degree, crvs[i].knots, crvs[i].control_points, 
				lc - runsum1, verb.TOLERANCE, crvlens[i] );

			pts.push( new CurvePoint( u, lc ) );
			lc += inc;

		}

		runsum1 += crvlens[i];

		i++;

	}

	return pts;

}

public static function rational_curve_param_at_arc_length(degree, knots, control_points, len, tol, beziers, bezier_lengths){

	if (len < verb.EPSILON) return knots[0];

	var crvs = beziers || verb.eval.curve_bezier_decompose( degree, knots, control_points )
		, i = 0
		, cc = crvs[i]
		, cl = -verb.EPSILON
		, bezier_lengths = bezier_lengths || [];

	// iterate through the curves consuming the bezier's, summing their length along the way
	for (var i = 0; cl < len && i < crvs.length; i++){

		bezier_lengths[i] = bezier_lengths[i] != undefined ? 
			bezier_lengths[i] : verb.eval.rational_bezier_curve_arc_length( degree, knots, control_points ); 

		cl += bezier_lengths[i];

		if (len < cl + verb.EPSILON){
			return verb.eval.rational_bezier_curve_param_at_arc_length(degree, knots, 
				control_points, len, tol, bezier_lengths[i]);
		}

	}
	
	return -1;

}

public static function rational_bezier_curve_param_at_arc_length(degree, knots, control_points, len, tol, total_len){

	if (len < 0) return knots[0];

	// we compute the whole length.  if desired length is outside of that, give up
	var totalLen = total_len || verb.eval.rational_bezier_curve_arc_length( degree, knots, control_points );

	if (len > totalLen) return verb.last( knots );

	// divide & conquer
	// TODO: newton's method formulation
	var start = { p : knots[0], l : 0 }
		, end = { p : verb.last( knots ), l : totalLen }
		, mid = { p : 0, l : 0 }
		, tol = tol || verb.TOLERANCE * 2;

	while ( (end.l - start.l) > tol ){

		mid.p = (start.p + end.p) / 2;
		mid.l = verb.eval.rational_bezier_curve_arc_length(degree, knots, control_points, mid.p );

		if (mid.l > len){
			end.p = mid.p;
			end.l = mid.l;
		} else {
			start.p = mid.p;
			start.l = mid.l;
		}

	}

	return (start.p + end.p) / 2;

}
