(function ($hx_exports) { "use strict";
var Analyze = $hx_exports.Analyze = function() { };
Analyze.ok = function() {
	return Tessellate.ok();
};
var Create = $hx_exports.Create = function() { };
Create.ok = function() {
	return Tessellate.ok();
};
var Init = function() { };
Init.main = function() {
	console.log("verb core 0.2.0");
};
var Intersect = $hx_exports.Intersect = function() { };
Intersect.ok = function() {
	return Tessellate.ok();
};
var Mesh = $hx_exports.Mesh = function() {
};
var Modify = $hx_exports.Modify = function() {
};
var CurveData = $hx_exports.CurveData = function(degree,controlPoints,knots) {
	this.degree = degree;
	this.controlPoints = controlPoints;
	this.knots = knots;
};
var SurfaceData = $hx_exports.SurfaceData = function(degreeU,degreeV,knotsU,knotsV,controlPoints) {
	this.degreeU = degreeU;
	this.degreeV = degreeV;
	this.knotsU = knotsU;
	this.knotsV = knotsV;
	this.controlPoints = controlPoints;
};
var Nurbs = $hx_exports.Nurbs = function() { };
Nurbs.curve_point = function(curve,u) {
	var n = curve.knots.length - curve.degree - 2;
	return Nurbs.curve_point_given_n(n,curve,u);
};
Nurbs.are_valid_relations = function(degree,num_control_points,knots_length) {
	if(num_control_points + degree + 1 - knots_length == 0) return true; else return false;
};
Nurbs.curve_point_given_n = function(n,curve,u) {
	var degree = curve.degree;
	var control_points = curve.controlPoints;
	var knots = curve.knots;
	if(!Nurbs.are_valid_relations(degree,control_points.length,knots.length)) {
		console.log("Invalid relations between control points, knot Array, and n");
		return null;
	}
	var knot_span_index = Nurbs.knot_span_given_n(n,degree,u,knots);
	var basis_values = Nurbs.basis_functions_given_knot_span_index(knot_span_index,u,degree,knots);
	var position = Vec.zeros1d(control_points[0].length);
	var _g1 = 0;
	var _g = degree + 1;
	while(_g1 < _g) {
		var j = _g1++;
		position = Vec.add(position,Vec.mul(basis_values[j],control_points[knot_span_index - degree + j]));
	}
	return position;
};
Nurbs.deriv_basis_functions = $hx_exports.deriv_basis_functions = function(u,degree,knots) {
	var knot_span_index = Nurbs.knot_span(degree,u,knots);
	var m = knots.length - 1;
	var n = m - degree - 1;
	return Nurbs.deriv_basis_functions_given_n_i(knot_span_index,u,degree,n,knots);
};
Nurbs.deriv_basis_functions_given_n_i = $hx_exports.deriv_basis_functions_given_n_i = function(knot_span_index,u,p,n,knots) {
	var ndu = Vec.zeros2d(p + 1,p + 1);
	var left = Vec.zeros1d(p + 1);
	var right = Vec.zeros1d(p + 1);
	var saved = 0.0;
	var temp = 0.0;
	ndu[0][0] = 1.0;
	var _g1 = 1;
	var _g = p + 1;
	while(_g1 < _g) {
		var j = _g1++;
		left[j] = u - knots[knot_span_index + 1 - j];
		right[j] = knots[knot_span_index + j] - u;
		saved = 0.0;
		var _g2 = 0;
		while(_g2 < j) {
			var r = _g2++;
			ndu[j][r] = right[r + 1] + left[j - r];
			temp = ndu[r][j - 1] / ndu[j][r];
			ndu[r][j] = saved + right[r + 1] * temp;
			saved = left[j - r] * temp;
		}
		ndu[j][j] = saved;
	}
	var ders = Vec.zeros2d(n + 1,p + 1);
	var a = Vec.zeros2d(2,p + 1);
	var s1 = 0;
	var s2 = 1;
	var d = 0.0;
	var rk = 0;
	var pk = 0;
	var j1 = 0;
	var j2 = 0;
	var _g11 = 0;
	var _g3 = p + 1;
	while(_g11 < _g3) {
		var j3 = _g11++;
		ders[0][j3] = ndu[j3][p];
	}
	var _g12 = 0;
	var _g4 = p + 1;
	while(_g12 < _g4) {
		var r1 = _g12++;
		s1 = 0;
		s2 = 1;
		a[0][0] = 1.0;
		var _g31 = 1;
		var _g21 = n + 1;
		while(_g31 < _g21) {
			var k = _g31++;
			d = 0.0;
			rk = r1 - k;
			pk = p - k;
			if(r1 >= k) {
				a[s2][0] = a[s1][0] / ndu[pk + 1][rk];
				d = a[s2][0] * ndu[rk][pk];
			}
			if(rk >= -1) j1 = 1; else j1 = -rk;
			if(r1 - 1 <= pk) j2 = k - 1; else j2 = p - r1;
			var _g5 = j1;
			var _g41 = j2 + 1;
			while(_g5 < _g41) {
				var j4 = _g5++;
				a[s2][j4] = (a[s1][j4] - a[s1][j4 - 1]) / ndu[pk + 1][rk + j4];
				d += a[s2][j4] * ndu[rk + j4][pk];
			}
			if(r1 <= pk) {
				a[s2][k] = -a[s1][k - 1] / ndu[pk + 1][r1];
				d += a[s2][k] * ndu[r1][pk];
			}
			ders[k][r1] = d;
			var temp1 = s1;
			s1 = s2;
			s2 = temp1;
		}
	}
	var acc = p;
	var _g13 = 1;
	var _g6 = n + 1;
	while(_g13 < _g6) {
		var k1 = _g13++;
		var _g32 = 0;
		var _g22 = p + 1;
		while(_g32 < _g22) {
			var j5 = _g32++;
			ders[k1][j5] *= acc;
		}
		acc *= p - k1;
	}
	return ders;
};
Nurbs.basis_functions = $hx_exports.basis_functions = function(degree,u,knots) {
	var knot_span_index = Nurbs.knot_span(degree,u,knots);
	return Nurbs.basis_functions_given_knot_span_index(knot_span_index,u,degree,knots);
};
Nurbs.basis_functions_given_knot_span_index = $hx_exports.knot_span = function(knot_span_index,u,degree,knots) {
	var basis_functions = Vec.zeros1d(degree + 1);
	var left = Vec.zeros1d(degree + 1);
	var right = Vec.zeros1d(degree + 1);
	var saved = 0;
	var temp = 0;
	basis_functions[0] = 1.0;
	var _g1 = 1;
	var _g = degree + 1;
	while(_g1 < _g) {
		var j = _g1++;
		left[j] = u - knots[knot_span_index + 1 - j];
		right[j] = knots[knot_span_index + j] - u;
		saved = 0.0;
		var _g2 = 0;
		while(_g2 < j) {
			var r = _g2++;
			temp = basis_functions[r] / (right[r + 1] + left[j - r]);
			basis_functions[r] = saved + right[r + 1] * temp;
			saved = left[j - r] * temp;
		}
		basis_functions[j] = saved;
	}
	return basis_functions;
};
Nurbs.knot_span = $hx_exports.knot_span = function(degree,u,knots) {
	var m = knots.length - 1;
	var n = m - degree - 1;
	return Nurbs.knot_span_given_n(n,degree,u,knots);
};
Nurbs.knot_span_given_n = $hx_exports.knot_span_given_n = function(n,degree,u,knots) {
	if(u >= knots[n + 1]) return n;
	if(u < knots[degree]) return degree;
	var low = degree;
	var high = n + 1;
	var mid = Math.floor((low + high) / 2);
	while(u < knots[mid] || u >= knots[mid + 1]) {
		if(u < knots[mid]) high = mid; else low = mid;
		mid = Math.floor((low + high) / 2);
	}
	return mid;
};
var Tessellate = $hx_exports.Tessellate = function() { };
Tessellate.ok = function() {
	return 5;
};
var Utils = function() { };
var Vec = function() { };
Vec.zeros1d = function(rows) {
	var _g = [];
	var _g1 = 0;
	while(_g1 < rows) {
		var i = _g1++;
		_g.push(0.0);
	}
	return _g;
};
Vec.zeros2d = function(rows,cols) {
	var _g = [];
	var _g1 = 0;
	while(_g1 < rows) {
		var i = _g1++;
		_g.push(Vec.zeros1d(cols));
	}
	return _g;
};
Vec.zeros3d = function(rows,cols,depth) {
	var _g = [];
	var _g1 = 0;
	while(_g1 < rows) {
		var i = _g1++;
		_g.push(Vec.zeros2d(cols,depth));
	}
	return _g;
};
Vec.add = function(a,b) {
	var _g = [];
	var _g2 = 0;
	var _g1 = a.length;
	while(_g2 < _g1) {
		var i = _g2++;
		_g.push(a[i] + b[i]);
	}
	return _g;
};
Vec.mul = function(a,b) {
	var _g = [];
	var _g2 = 0;
	var _g1 = b.length;
	while(_g2 < _g1) {
		var i = _g2++;
		_g.push(a * b[i]);
	}
	return _g;
};
Vec.sub = function(a,b) {
	var _g = [];
	var _g2 = 0;
	var _g1 = a.length;
	while(_g2 < _g1) {
		var i = _g2++;
		_g.push(a[i] - b[i]);
	}
	return _g;
};
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i1) {
	return isNaN(i1);
};
Init.main();
})(typeof window != "undefined" ? window : exports);
