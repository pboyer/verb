// browser context
if ( typeof exports != 'object' || exports === undefined )
{
    // todo fix this
	var verb = exports = {};
} else  {
	var verb = module.exports = {};
}

(function ($hx_exports) { "use strict";
$hx_exports.core = $hx_exports.core || {};
var HxOverrides = function() { };
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var Lambda = function() { };
Lambda.fold = function(it,f,first) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		first = f(x,first);
	}
	return first;
};
var IMap = function() { };
var haxe = {};
haxe.ds = {};
haxe.ds.IntMap = function() {
	this.h = { };
};
haxe.ds.IntMap.__interfaces__ = [IMap];
haxe.ds.IntMap.prototype = {
	set: function(key,value) {
		this.h[key] = value;
	}
	,get: function(key) {
		return this.h[key];
	}
	,exists: function(key) {
		return this.h.hasOwnProperty(key);
	}
};
var verb = {};
verb.BoundingBox = $hx_exports.BoundingBox = function(pts) {
	this.dim = 3;
	this.initialized = false;
	this.dim = 3;
	this.min = null;
	this.max = null;
	if(pts != null) this.addRange(pts);
};
verb.BoundingBox.intervalsOverlap = function(a1,a2,b1,b2,tol) {
	if(tol == null) tol = -1;
	var tol1;
	if(tol < 0) tol1 = verb.BoundingBox.TOLERANCE; else tol1 = tol;
	var x1 = Math.min(a1,a2) - tol1;
	var x2 = Math.max(a1,a2) + tol1;
	var y1 = Math.min(b1,b2) - tol1;
	var y2 = Math.max(b1,b2) + tol1;
	return x1 >= y1 && x1 <= y2 || x2 >= y1 && x2 <= y2 || y1 >= x1 && y1 <= x2 || y2 >= x1 && y2 <= x2;
};
verb.BoundingBox.prototype = {
	fromPoint: function(pt) {
		var bb = new verb.BoundingBox(null);
		bb.add(pt);
		return bb;
	}
	,add: function(point) {
		if(!this.initialized) {
			this.dim = point.length;
			this.min = point.slice(0);
			this.max = point.slice(0);
			this.initialized = true;
			return this;
		}
		var i = 0;
		var l = this.dim;
		var _g = 0;
		while(_g < l) {
			var i1 = _g++;
			if(point[i1] > this.max[i1]) this.max[i1] = point[i1];
		}
		var _g1 = 0;
		while(_g1 < l) {
			var i2 = _g1++;
			if(point[i2] < this.min[i2]) this.min[i2] = point[i2];
		}
		return this;
	}
	,addRange: function(points) {
		var l = points.length;
		var _g = 0;
		while(_g < l) {
			var i = _g++;
			this.add(points[i]);
		}
		return this;
	}
	,contains: function(point,tol) {
		if(tol == null) tol = -1;
		if(!this.initialized) return false;
		return this.intersects(new verb.BoundingBox([point]),tol);
	}
	,intersects: function(bb,tol) {
		if(tol == null) tol = -1;
		if(!this.initialized || !bb.initialized) return false;
		var a1 = this.min;
		var a2 = this.max;
		var b1 = bb.min;
		var b2 = bb.max;
		var _g1 = 0;
		var _g = this.dim;
		while(_g1 < _g) {
			var i = _g1++;
			if(!verb.BoundingBox.intervalsOverlap(a1[i],a2[i],b1[i],b2[i],tol)) return false;
		}
		return true;
	}
	,clear: function() {
		this.initialized = false;
		return this;
	}
	,getLongestAxis: function() {
		var max = 0.0;
		var id = 0;
		var _g1 = 0;
		var _g = this.dim;
		while(_g1 < _g) {
			var i = _g1++;
			var l = this.getAxisLength(i);
			if(l > max) {
				max = l;
				id = i;
			}
		}
		return id;
	}
	,getAxisLength: function(i) {
		if(i < 0 || i > this.dim - 1) return 0.0;
		return Math.abs(this.min[i] - this.max[i]);
	}
	,intersect: function(bb,tol) {
		if(!this.initialized) return null;
		var a1 = this.min;
		var a2 = this.max;
		var b1 = bb.min;
		var b2 = bb.max;
		if(!this.intersects(bb,tol)) return null;
		var maxbb = [];
		var minbb = [];
		var _g1 = 0;
		var _g = this.dim;
		while(_g1 < _g) {
			var i = _g1++;
			maxbb.push(Math.min(a2[i],b2[i]));
			minbb.push(Math.max(a1[i],b1[i]));
		}
		return new verb.BoundingBox([minbb,maxbb]);
	}
};
verb.Init = function() { };
verb.Init.main = function() {
	console.log("verb 0.2.0");
};
verb.core = {};
verb.core.Analyze = function() { };
verb.core.Binomial = function() { };
verb.core.Binomial.get = function(n,k) {
	if(k == 0.0) return 1.0;
	if(n == 0 || k > n) return 0.0;
	if(k > n - k) k = n - k;
	if(verb.core.Binomial.memo_exists(n,k)) return verb.core.Binomial.get_memo(n,k);
	var r = 1;
	var n_o = n;
	var _g1 = 1;
	var _g = k + 1;
	while(_g1 < _g) {
		var d = _g1++;
		if(verb.core.Binomial.memo_exists(n_o,d)) {
			n--;
			r = verb.core.Binomial.get_memo(n_o,d);
			continue;
		}
		r *= n--;
		r /= d;
		verb.core.Binomial.memoize(n_o,d,r);
	}
	return r;
};
verb.core.Binomial.get_no_memo = function(n,k) {
	if(k == 0) return 1;
	if(n == 0 || k > n) return 0;
	if(k > n - k) k = n - k;
	var r = 1;
	var n_o = n;
	var _g1 = 1;
	var _g = k + 1;
	while(_g1 < _g) {
		var d = _g1++;
		r *= n--;
		r /= d;
	}
	return r;
};
verb.core.Binomial.memo_exists = function(n,k) {
	return verb.core.Binomial.memo.exists(n) && verb.core.Binomial.memo.get(n).exists(k);
};
verb.core.Binomial.get_memo = function(n,k) {
	return verb.core.Binomial.memo.get(n).get(k);
};
verb.core.Binomial.memoize = function(n,k,val) {
	if(!verb.core.Binomial.memo.exists(n)) verb.core.Binomial.memo.set(n,new haxe.ds.IntMap());
	verb.core.Binomial.memo.get(n).set(k,val);
};
verb.core.Constants = $hx_exports.core.Constants = function() { };
verb.core.Eval = $hx_exports.core.Eval = function() { };
verb.core.Eval.rational_surface_derivs = function(surface,num_derivs,u,v) {
	var ders = verb.core.Eval.surface_derivs(surface,num_derivs,u,v);
	var Aders = verb.core.Eval.rational_2d(ders);
	var wders = verb.core.Eval.weight_2d(ders);
	var SKL = new Array();
	var dim = Aders[0][0].length;
	var _g1 = 0;
	var _g = num_derivs + 1;
	while(_g1 < _g) {
		var k = _g1++;
		SKL.push(new Array());
		var _g3 = 0;
		var _g2 = num_derivs - k + 1;
		while(_g3 < _g2) {
			var l = _g3++;
			var v1 = Aders[k][l];
			var _g5 = 1;
			var _g4 = l + 1;
			while(_g5 < _g4) {
				var j = _g5++;
				v1 = verb.core.Vec.sub(v1,verb.core.Vec.mul(verb.core.Binomial.get(l,j) * wders[0][j],SKL[k][l - j]));
			}
			var _g51 = 1;
			var _g41 = k + 1;
			while(_g51 < _g41) {
				var i = _g51++;
				v1 = verb.core.Vec.sub(v1,verb.core.Vec.mul(verb.core.Binomial.get(k,i) * wders[i][0],SKL[k - i][l]));
				var v2 = verb.core.Vec.zeros1d(dim);
				var _g7 = 1;
				var _g6 = l + 1;
				while(_g7 < _g6) {
					var j1 = _g7++;
					v2 = verb.core.Vec.add(v2,verb.core.Vec.mul(verb.core.Binomial.get(l,j1) * wders[i][j1],SKL[k - i][l - j1]));
				}
				v1 = verb.core.Vec.sub(v1,verb.core.Vec.mul(verb.core.Binomial.get(k,i),v2));
			}
			SKL[k].push(verb.core.Vec.mul(1 / wders[0][0],v1));
		}
	}
	return SKL;
};
verb.core.Eval.rational_surface_point = function(surface,u,v) {
	return verb.core.Eval.dehomogenize(verb.core.Eval.surface_point(surface,u,v));
};
verb.core.Eval.rational_curve_derivs = function(curve,u,num_derivs) {
	var ders = verb.core.Eval.curve_derivs(curve,u,num_derivs);
	var Aders = verb.core.Eval.rational_1d(ders);
	var wders = verb.core.Eval.weight_1d(ders);
	var k = 0;
	var i = 0;
	var CK = [];
	var _g1 = 0;
	var _g = num_derivs + 1;
	while(_g1 < _g) {
		var k1 = _g1++;
		var v = Aders[k1];
		var _g3 = 1;
		var _g2 = k1 + 1;
		while(_g3 < _g2) {
			var i1 = _g3++;
			v = verb.core.Vec.sub(v,verb.core.Vec.mul(verb.core.Binomial.get(k1,i1) * wders[i1],CK[k1 - i1]));
		}
		CK.push(verb.core.Vec.mul(1 / wders[0],v));
	}
	return CK;
};
verb.core.Eval.rational_curve_point = function(curve,u) {
	return verb.core.Eval.dehomogenize(verb.core.Eval.curve_point(curve,u));
};
verb.core.Eval.dehomogenize = function(homo_point) {
	var dim = homo_point.length;
	var point = [];
	var wt = homo_point[dim - 1];
	var l = homo_point.length - 1;
	var _g = 0;
	while(_g < l) {
		var i = _g++;
		point.push(homo_point[i] / wt);
	}
	return point;
};
verb.core.Eval.rational_1d = function(homo_points) {
	var dim = homo_points[0].length - 1;
	return homo_points.map(function(x) {
		return x.slice(0,dim);
	});
};
verb.core.Eval.rational_2d = function(homo_points) {
	return homo_points.map(verb.core.Eval.rational_1d);
};
verb.core.Eval.weight_1d = function(homo_points) {
	var dim = homo_points[0].length - 1;
	return homo_points.map(function(x) {
		return x[dim];
	});
};
verb.core.Eval.weight_2d = function(homo_points) {
	return homo_points.map(verb.core.Eval.weight_1d);
};
verb.core.Eval.dehomogenize_1d = function(homo_points) {
	return homo_points.map(verb.core.Eval.dehomogenize);
};
verb.core.Eval.dehomogenize_2d = function(homo_points) {
	return homo_points.map(verb.core.Eval.dehomogenize_1d);
};
verb.core.Eval.homogenize_1d = function(control_points,weights) {
	var rows = control_points.length;
	var dim = control_points[0].length;
	var homo_control_points = new Array();
	var wt = 0.0;
	var ref_pt = new Array();
	var _g = 0;
	while(_g < rows) {
		var i = _g++;
		var pt = [];
		ref_pt = control_points[i];
		wt = weights[i];
		var _g1 = 0;
		while(_g1 < dim) {
			var k = _g1++;
			pt.push(ref_pt[k] * wt);
		}
		pt.push(wt);
		homo_control_points.push(pt);
	}
	return homo_control_points;
};
verb.core.Eval.homogenize_2d = function(control_points,weights) {
	var rows = control_points.length;
	var homo_control_points = new Array();
	var _g = 0;
	while(_g < rows) {
		var i = _g++;
		homo_control_points.push(verb.core.Eval.homogenize_1d(control_points[i],weights[i]));
	}
	return homo_control_points;
};
verb.core.Eval.surface_derivs = function(surface,num_derivatives,u,v) {
	var n = surface.knotsU.length - surface.degreeU - 2;
	var m = surface.knotsV.length - surface.degreeV - 2;
	return verb.core.Eval.surface_derivs_given_n_m(n,m,surface,num_derivatives,u,v);
};
verb.core.Eval.surface_derivs_given_n_m = function(n,m,surface,num_derivatives,u,v) {
	var degree_u = surface.degreeU;
	var degree_v = surface.degreeV;
	var control_points = surface.controlPoints;
	var knots_u = surface.knotsU;
	var knots_v = surface.knotsV;
	if(!verb.core.Eval.are_valid_relations(degree_u,control_points.length,knots_u.length) || !verb.core.Eval.are_valid_relations(degree_v,control_points[0].length,knots_v.length)) throw "Invalid relations between control points, knot vector, and n";
	var dim = control_points[0][0].length;
	var du;
	if(num_derivatives < degree_u) du = num_derivatives; else du = degree_u;
	var dv;
	if(num_derivatives < degree_v) dv = num_derivatives; else dv = degree_v;
	var SKL = verb.core.Vec.zeros3d(du + 1,dv + 1,dim);
	var knot_span_index_u = verb.core.Eval.knot_span_given_n(n,degree_u,u,knots_u);
	var knot_span_index_v = verb.core.Eval.knot_span_given_n(m,degree_v,v,knots_v);
	var uders = verb.core.Eval.deriv_basis_functions_given_n_i(knot_span_index_u,u,degree_u,n,knots_u);
	var vders = verb.core.Eval.deriv_basis_functions_given_n_i(knot_span_index_v,v,degree_v,m,knots_v);
	var temp = verb.core.Vec.zeros2d(degree_v + 1,dim);
	var dd = 0;
	var _g1 = 0;
	var _g = du + 1;
	while(_g1 < _g) {
		var k = _g1++;
		var _g3 = 0;
		var _g2 = degree_v + 1;
		while(_g3 < _g2) {
			var s = _g3++;
			temp[s] = verb.core.Vec.zeros1d(dim);
			var _g5 = 0;
			var _g4 = degree_u + 1;
			while(_g5 < _g4) {
				var r = _g5++;
				temp[s] = verb.core.Vec.add(temp[s],verb.core.Vec.mul(uders[k][r],control_points[knot_span_index_u - degree_u + r][knot_span_index_v - degree_v + s]));
			}
		}
		var nk = num_derivatives - k;
		if(nk < dv) dd = nk; else dd = dv;
		var _g31 = 0;
		var _g21 = dd + 1;
		while(_g31 < _g21) {
			var l = _g31++;
			SKL[k][l] = verb.core.Vec.zeros1d(dim);
			var _g51 = 0;
			var _g41 = degree_v + 1;
			while(_g51 < _g41) {
				var s1 = _g51++;
				SKL[k][l] = verb.core.Vec.add(SKL[k][l],verb.core.Vec.mul(vders[l][s1],temp[s1]));
			}
		}
	}
	return SKL;
};
verb.core.Eval.surface_point = function(surface,u,v) {
	var n = surface.knotsU.length - surface.degreeU - 2;
	var m = surface.knotsV.length - surface.degreeV - 2;
	return verb.core.Eval.surface_point_given_n_m(n,m,surface,u,v);
};
verb.core.Eval.surface_point_given_n_m = function(n,m,surface,u,v) {
	var degree_u = surface.degreeU;
	var degree_v = surface.degreeV;
	var control_points = surface.controlPoints;
	var knots_u = surface.knotsU;
	var knots_v = surface.knotsV;
	if(!verb.core.Eval.are_valid_relations(degree_u,control_points.length,knots_u.length) || !verb.core.Eval.are_valid_relations(degree_v,control_points[0].length,knots_v.length)) throw "Invalid relations between control points, knot vector, and n";
	var dim = control_points[0][0].length;
	var knot_span_index_u = verb.core.Eval.knot_span_given_n(n,degree_u,u,knots_u);
	var knot_span_index_v = verb.core.Eval.knot_span_given_n(m,degree_v,v,knots_v);
	var u_basis_vals = verb.core.Eval.basis_functions_given_knot_span_index(knot_span_index_u,u,degree_u,knots_u);
	var v_basis_vals = verb.core.Eval.basis_functions_given_knot_span_index(knot_span_index_v,v,degree_v,knots_v);
	var uind = knot_span_index_u - degree_u;
	var vind = knot_span_index_v;
	var position = verb.core.Vec.zeros1d(dim);
	var temp = verb.core.Vec.zeros1d(dim);
	var _g1 = 0;
	var _g = degree_v + 1;
	while(_g1 < _g) {
		var l = _g1++;
		temp = verb.core.Vec.zeros1d(dim);
		vind = knot_span_index_v - degree_v + l;
		var _g3 = 0;
		var _g2 = degree_u + 1;
		while(_g3 < _g2) {
			var k = _g3++;
			temp = verb.core.Vec.add(temp,verb.core.Vec.mul(u_basis_vals[k],control_points[uind + k][vind]));
		}
		position = verb.core.Vec.add(position,verb.core.Vec.mul(v_basis_vals[l],temp));
	}
	return position;
};
verb.core.Eval.curve_derivs = function(crv,u,num_derivs) {
	var n = crv.knots.length - crv.degree - 2;
	return verb.core.Eval.curve_derivs_given_n(n,crv,u,num_derivs);
};
verb.core.Eval.curve_derivs_given_n = function(n,curve,u,num_derivatives) {
	var degree = curve.degree;
	var control_points = curve.controlPoints;
	var knots = curve.knots;
	if(!verb.core.Eval.are_valid_relations(degree,control_points.length,knots.length)) throw "Invalid relations between control points, knot vector, and n";
	var dim = control_points[0].length;
	var du;
	if(num_derivatives < degree) du = num_derivatives; else du = degree;
	var CK = verb.core.Vec.zeros2d(du + 1,dim);
	var knot_span_index = verb.core.Eval.knot_span_given_n(n,degree,u,knots);
	var nders = verb.core.Eval.deriv_basis_functions_given_n_i(knot_span_index,u,degree,du,knots);
	var k = 0;
	var j = 0;
	var _g1 = 0;
	var _g = du + 1;
	while(_g1 < _g) {
		var k1 = _g1++;
		var _g3 = 0;
		var _g2 = degree + 1;
		while(_g3 < _g2) {
			var j1 = _g3++;
			CK[k1] = verb.core.Vec.add(CK[k1],verb.core.Vec.mul(nders[k1][j1],control_points[knot_span_index - degree + j1]));
		}
	}
	return CK;
};
verb.core.Eval.curve_point = function(curve,u) {
	var n = curve.knots.length - curve.degree - 2;
	return verb.core.Eval.curve_point_given_n(n,curve,u);
};
verb.core.Eval.are_valid_relations = function(degree,num_control_points,knots_length) {
	return num_control_points + degree + 1 - knots_length == 0;
};
verb.core.Eval.curve_point_given_n = function(n,curve,u) {
	var degree = curve.degree;
	var control_points = curve.controlPoints;
	var knots = curve.knots;
	if(!verb.core.Eval.are_valid_relations(degree,control_points.length,knots.length)) {
		throw "Invalid relations between control points, knot Array, and n";
		return null;
	}
	var knot_span_index = verb.core.Eval.knot_span_given_n(n,degree,u,knots);
	var basis_values = verb.core.Eval.basis_functions_given_knot_span_index(knot_span_index,u,degree,knots);
	var position = verb.core.Vec.zeros1d(control_points[0].length);
	var _g1 = 0;
	var _g = degree + 1;
	while(_g1 < _g) {
		var j = _g1++;
		position = verb.core.Vec.add(position,verb.core.Vec.mul(basis_values[j],control_points[knot_span_index - degree + j]));
	}
	return position;
};
verb.core.Eval.deriv_basis_functions = function(u,degree,knots) {
	var knot_span_index = verb.core.Eval.knot_span(degree,u,knots);
	var m = knots.length - 1;
	var n = m - degree - 1;
	return verb.core.Eval.deriv_basis_functions_given_n_i(knot_span_index,u,degree,n,knots);
};
verb.core.Eval.deriv_basis_functions_given_n_i = function(knot_span_index,u,p,n,knots) {
	var ndu = verb.core.Vec.zeros2d(p + 1,p + 1);
	var left = verb.core.Vec.zeros1d(p + 1);
	var right = verb.core.Vec.zeros1d(p + 1);
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
	var ders = verb.core.Vec.zeros2d(n + 1,p + 1);
	var a = verb.core.Vec.zeros2d(2,p + 1);
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
verb.core.Eval.basis_functions = function(u,degree,knots) {
	var knot_span_index = verb.core.Eval.knot_span(degree,u,knots);
	return verb.core.Eval.basis_functions_given_knot_span_index(knot_span_index,u,degree,knots);
};
verb.core.Eval.basis_functions_given_knot_span_index = function(knot_span_index,u,degree,knots) {
	var basis_functions = verb.core.Vec.zeros1d(degree + 1);
	var left = verb.core.Vec.zeros1d(degree + 1);
	var right = verb.core.Vec.zeros1d(degree + 1);
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
verb.core.Eval.knot_span = function(degree,u,knots) {
	var m = knots.length - 1;
	var n = m - degree - 1;
	return verb.core.Eval.knot_span_given_n(n,degree,u,knots);
};
verb.core.Eval.knot_span_given_n = function(n,degree,u,knots) {
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
verb.core.Intersect = $hx_exports.core.Intersect = function() { };
verb.core.Intersect.rays = function(a0,a,b0,b) {
	var dab = verb.core.Vec.dot(a,b);
	var dab0 = verb.core.Vec.dot(a,b0);
	var daa0 = verb.core.Vec.dot(a,a0);
	var dbb0 = verb.core.Vec.dot(b,b0);
	var dba0 = verb.core.Vec.dot(b,a0);
	var daa = verb.core.Vec.dot(a,a);
	var dbb = verb.core.Vec.dot(b,b);
	var div = daa * dbb - dab * dab;
	if(Math.abs(div) < verb.core.Constants.EPSILON) return null;
	var num = dab * (dab0 - daa0) - daa * (dbb0 - dba0);
	var w = num / div;
	var t = (dab0 - daa0 + w * dab) / daa;
	return [t,w];
};
verb.core.Make = $hx_exports.core.Make = function() { };
verb.core.Make.sweep1_surface = function(profile,rail) {
	var rail_start = verb.core.Eval.rational_curve_point(rail,0.0);
	var span = 1.0 / rail.controlPoints.length;
	var control_points = [];
	var weights = [];
	var rail_weights = verb.core.Eval.weight_1d(rail.controlPoints);
	var profile_weights = verb.core.Eval.weight_1d(profile.controlPoints);
	var profile_points = verb.core.Eval.dehomogenize_1d(profile.controlPoints);
	var _g1 = 0;
	var _g = rail.controlPoints.length;
	while(_g1 < _g) {
		var i = _g1++;
		var rail_point = verb.core.Eval.rational_curve_point(rail,i * span);
		var rail_offset = verb.core.Vec.sub(rail_point,rail_start);
		var row_control_points = [];
		var row_weights = [];
		var _g3 = 0;
		var _g2 = profile.controlPoints.length;
		while(_g3 < _g2) {
			var j = _g3++;
			row_control_points.push(verb.core.Vec.add(rail_offset,profile_points[j]));
			row_weights.push(profile_weights[j] * rail_weights[i]);
		}
		control_points.push(row_control_points);
		weights.push(row_weights);
	}
	return new verb.core.types.SurfaceData(rail.degree,profile.degree,rail.knots,profile.knots,verb.core.Eval.homogenize_2d(control_points,weights));
};
verb.core.Make.ellipse_arc = function(center,xaxis,yaxis,xradius,yradius,startAngle,endAngle) {
	if(endAngle < startAngle) endAngle = 2.0 * Math.PI + startAngle;
	var theta = endAngle - startAngle;
	var numArcs = 0;
	if(theta <= Math.PI / 2) numArcs = 1; else if(theta <= Math.PI) numArcs = 2; else if(theta <= 3 * Math.PI / 2) numArcs = 3; else numArcs = 4;
	var dtheta = theta / numArcs;
	var n = 2 * numArcs;
	var w1 = Math.cos(dtheta / 2);
	var P0 = verb.core.Vec.add(center,verb.core.Vec.add(verb.core.Vec.mul(xradius * Math.cos(startAngle),xaxis),verb.core.Vec.mul(yradius * Math.sin(startAngle),yaxis)));
	var T0 = verb.core.Vec.sub(verb.core.Vec.mul(Math.cos(startAngle),yaxis),verb.core.Vec.mul(Math.sin(startAngle),xaxis));
	var controlPoints = [];
	var knots = verb.core.Vec.zeros1d(2 * numArcs + 3);
	var index = 0;
	var angle = startAngle;
	var weights = verb.core.Vec.zeros1d(numArcs * 2);
	controlPoints[0] = P0;
	weights[0] = 1.0;
	var _g1 = 1;
	var _g = numArcs + 1;
	while(_g1 < _g) {
		var i = _g1++;
		angle += dtheta;
		var P2 = verb.core.Vec.add(center,verb.core.Vec.add(verb.core.Vec.mul(xradius * Math.cos(angle),xaxis),verb.core.Vec.mul(yradius * Math.sin(angle),yaxis)));
		weights[index + 2] = 1;
		controlPoints[index + 2] = P2;
		var T2 = verb.core.Vec.sub(verb.core.Vec.mul(Math.cos(angle),yaxis),verb.core.Vec.mul(Math.sin(angle),xaxis));
		var params = verb.core.Intersect.rays(P0,verb.core.Vec.mul(1 / verb.core.Vec.norm(T0),T0),P2,verb.core.Vec.mul(1 / verb.core.Vec.norm(T2),T2));
		var P1 = verb.core.Vec.add(P0,verb.core.Vec.mul(params[0],T0));
		weights[index + 1] = w1;
		controlPoints[index + 1] = P1;
		index += 2;
		if(i < numArcs) {
			P0 = P2;
			T0 = T2;
		}
	}
	var j = 2 * numArcs + 1;
	var _g2 = 0;
	while(_g2 < 3) {
		var i1 = _g2++;
		knots[i1] = 0.0;
		knots[i1 + j] = 1.0;
	}
	switch(numArcs) {
	case 2:
		knots[3] = knots[4] = 0.5;
		break;
	case 3:
		knots[3] = knots[4] = 0.333333333333333315;
		knots[5] = knots[6] = 0.66666666666666663;
		break;
	case 4:
		knots[3] = knots[4] = 0.25;
		knots[5] = knots[6] = 0.5;
		knots[7] = knots[8] = 0.75;
		break;
	}
	return new verb.core.types.CurveData(2,knots,verb.core.Eval.homogenize_1d(controlPoints,weights));
};
verb.core.Make.arc = function(center,xaxis,yaxis,radius,start_angle,end_angle) {
	return verb.core.Make.ellipse_arc(center,xaxis,yaxis,radius,radius,start_angle,end_angle);
};
verb.core.Make.polyline_curve = function(pts) {
	var knots = [0.0,0.0];
	var lsum = 0.0;
	var _g1 = 0;
	var _g = pts.length - 1;
	while(_g1 < _g) {
		var i = _g1++;
		lsum += verb.core.Vec.dist(pts[i],pts[i + 1]);
		knots.push(lsum);
	}
	knots.push(lsum);
	knots = verb.core.Vec.mul(1 / lsum,knots);
	var weights;
	var _g2 = [];
	var _g21 = 0;
	var _g11 = pts.length;
	while(_g21 < _g11) {
		var i1 = _g21++;
		_g2.push(1.0);
	}
	weights = _g2;
	return new verb.core.types.CurveData(1,knots,verb.core.Eval.homogenize_1d(pts.slice(0),weights));
};
verb.core.Make.extruded_surface = function(axis,length,profile) {
	var control_points = [[],[],[]];
	var weights = [[],[],[]];
	var prof_control_points = verb.core.Eval.dehomogenize_1d(profile.controlPoints);
	var prof_weights = verb.core.Eval.weight_1d(profile.controlPoints);
	var translation = verb.core.Vec.mul(length,axis);
	var halfTranslation = verb.core.Vec.mul(0.5 * length,axis);
	var _g1 = 0;
	var _g = prof_control_points.length;
	while(_g1 < _g) {
		var j = _g1++;
		control_points[2][j] = prof_control_points[j];
		control_points[1][j] = verb.core.Vec.add(halfTranslation,prof_control_points[j]);
		control_points[0][j] = verb.core.Vec.add(translation,prof_control_points[j]);
		weights[0][j] = prof_weights[j];
		weights[1][j] = prof_weights[j];
		weights[2][j] = prof_weights[j];
	}
	return new verb.core.types.SurfaceData(2,profile.degree,[0,0,0,1,1,1],profile.knots,verb.core.Eval.homogenize_2d(control_points,weights));
};
verb.core.Make.cylinder_surface = function(axis,xaxis,base,height,radius) {
	var yaxis = verb.core.Vec.cross(axis,xaxis);
	var angle = 2.0 * Math.PI;
	var circ = verb.core.Make.arc(base,xaxis,yaxis,radius,0.0,2 * Math.PI);
	return verb.core.Make.extruded_surface(axis,height,circ);
};
verb.core.Make.revolved_surface = function(center,axis,theta,profile) {
	var prof_control_points = verb.core.Eval.dehomogenize_1d(profile.controlPoints);
	var prof_weights = verb.core.Eval.weight_1d(profile.controlPoints);
	var narcs;
	var knots_u;
	var control_points;
	var weights;
	if(theta <= Math.PI / 2) {
		narcs = 1;
		knots_u = verb.core.Vec.zeros1d(6 + 2 * (narcs - 1));
	} else if(theta <= Math.PI) {
		narcs = 2;
		knots_u = verb.core.Vec.zeros1d(6 + 2 * (narcs - 1));
		knots_u[3] = knots_u[4] = 0.5;
	} else if(theta <= 3 * Math.PI / 2) {
		narcs = 3;
		knots_u = verb.core.Vec.zeros1d(6 + 2 * (narcs - 1));
		knots_u[3] = knots_u[4] = 0.333333333333333315;
		knots_u[5] = knots_u[6] = 0.66666666666666663;
	} else {
		narcs = 4;
		knots_u = verb.core.Vec.zeros1d(6 + 2 * (narcs - 1));
		knots_u[3] = knots_u[4] = 0.25;
		knots_u[5] = knots_u[6] = 0.5;
		knots_u[7] = knots_u[8] = 0.75;
	}
	var dtheta = theta / narcs;
	var j = 3 + 2 * (narcs - 1);
	var _g = 0;
	while(_g < 3) {
		var i = _g++;
		knots_u[i] = 0.0;
		knots_u[j + i] = 1.0;
	}
	var n = 2 * narcs;
	var wm = Math.cos(dtheta / 2.0);
	var angle = 0.0;
	var sines = verb.core.Vec.zeros1d(narcs + 1);
	var cosines = verb.core.Vec.zeros1d(narcs + 1);
	var control_points1 = verb.core.Vec.zeros3d(2 * narcs + 1,prof_control_points.length,3);
	var weights1 = verb.core.Vec.zeros2d(2 * narcs + 1,prof_control_points.length);
	var _g1 = 1;
	var _g2 = narcs + 1;
	while(_g1 < _g2) {
		var i1 = _g1++;
		angle += dtheta;
		cosines[i1] = Math.cos(angle);
		sines[i1] = Math.sin(angle);
	}
	var _g11 = 0;
	var _g3 = prof_control_points.length;
	while(_g11 < _g3) {
		var j1 = _g11++;
		var O = verb.core.Trig.closest_point_on_ray(prof_control_points[j1],center,axis);
		var X = verb.core.Vec.sub(prof_control_points[j1],O);
		var r = verb.core.Vec.norm(X);
		var Y = verb.core.Vec.cross(axis,X);
		if(r > verb.core.Constants.EPSILON) {
			X = verb.core.Vec.mul(1 / r,X);
			Y = verb.core.Vec.mul(1 / r,Y);
		}
		control_points1[0][j1] = prof_control_points[j1];
		var P0 = prof_control_points[j1];
		weights1[0][j1] = prof_weights[j1];
		var T0 = Y;
		var index = 0;
		var angle1 = 0.0;
		var _g31 = 1;
		var _g21 = narcs + 1;
		while(_g31 < _g21) {
			var i2 = _g31++;
			var P2;
			if(r == 0) P2 = O; else P2 = verb.core.Vec.add(O,verb.core.Vec.add(verb.core.Vec.mul(r * cosines[i2],X),verb.core.Vec.mul(r * sines[i2],Y)));
			control_points1[index + 2][j1] = P2;
			weights1[index + 2][j1] = prof_weights[j1];
			var T2 = verb.core.Vec.sub(verb.core.Vec.mul(cosines[i2],Y),verb.core.Vec.mul(sines[i2],X));
			if(r == 0) control_points1[index + 1][j1] = O; else {
				var params = verb.core.Intersect.rays(P0,verb.core.Vec.mul(1 / verb.core.Vec.norm(T0),T0),P2,verb.core.Vec.mul(1 / verb.core.Vec.norm(T2),T2));
				var P1 = verb.core.Vec.add(P0,verb.core.Vec.mul(params[0],T0));
				control_points1[index + 1][j1] = P1;
			}
			weights1[index + 1][j1] = wm * prof_weights[j1];
			index += 2;
			if(i2 < narcs) {
				P0 = P2;
				T0 = T2;
			}
		}
	}
	return new verb.core.types.SurfaceData(2,profile.degree,knots_u,profile.knots,verb.core.Eval.homogenize_2d(control_points1,weights1));
};
verb.core.Make.sphere_surface = function(center,axis,xaxis,radius) {
	var arc = verb.core.Make.arc(center,verb.core.Vec.mul(-1.0,axis),xaxis,radius,0.0,Math.PI);
	return verb.core.Make.revolved_surface(center,axis,2 * Math.PI,arc);
};
verb.core.Make.cone_surface = function(axis,xaxis,base,height,radius) {
	var angle = 2 * Math.PI;
	var prof_degree = 1;
	var prof_ctrl_pts = [verb.core.Vec.add(base,verb.core.Vec.mul(height,axis)),verb.core.Vec.add(base,verb.core.Vec.mul(radius,xaxis))];
	var prof_knots = [0.0,0.0,1.0,1.0];
	var prof_weights = [1.0,1.0];
	var prof = new verb.core.types.CurveData(prof_degree,prof_knots,verb.core.Eval.homogenize_1d(prof_ctrl_pts,prof_weights));
	return verb.core.Make.revolved_surface(base,axis,angle,prof);
};
verb.core.Make.rational_interp_curve = function(points,degree,start_tangent,end_tangent) {
	if(degree == null) degree = 3;
	if(points.length < degree + 1) throw "You need to supply at least degree + 1 points!";
	var us = [0.0];
	var _g1 = 1;
	var _g = points.length;
	while(_g1 < _g) {
		var i = _g1++;
		var chord = verb.core.Vec.norm(verb.core.Vec.sub(points[i],points[i - 1]));
		var last = us[us.length - 1];
		us.push(last + chord);
	}
	var max = us[us.length - 1];
	var _g11 = 0;
	var _g2 = us.length;
	while(_g11 < _g2) {
		var i1 = _g11++;
		us[i1] = us[i1] / max;
	}
	var knotsStart = verb.core.Vec.rep(degree + 1,0.0);
	var hasTangents = start_tangent != null && end_tangent != null;
	var start;
	if(hasTangents) start = 0; else start = 1;
	var end;
	if(hasTangents) end = us.length - degree + 1; else end = us.length - degree;
	var _g3 = start;
	while(_g3 < end) {
		var i2 = _g3++;
		var weightSums = 0.0;
		var _g12 = 0;
		while(_g12 < degree) {
			var j = _g12++;
			weightSums += us[i2 + j];
		}
		knotsStart.push(1 / degree * weightSums);
	}
	var knots = knotsStart.concat(verb.core.Vec.rep(degree + 1,1.0));
	var A = [];
	var n;
	if(hasTangents) n = points.length + 1; else n = points.length - 1;
	var lst;
	if(hasTangents) lst = 1; else lst = 0;
	var ld;
	if(hasTangents) ld = points.length - (degree - 1); else ld = points.length - (degree + 1);
	var _g4 = 0;
	while(_g4 < us.length) {
		var u = us[_g4];
		++_g4;
		var span = verb.core.Eval.knot_span_given_n(n,degree,u,knots);
		var basisFuncs = verb.core.Eval.basis_functions_given_knot_span_index(span,u,degree,knots);
		var ls = span - degree;
		var rowstart = verb.core.Vec.zeros1d(ls);
		var rowend = verb.core.Vec.zeros1d(ld - ls);
		A.push(rowstart.concat(basisFuncs).concat(rowend));
	}
	if(hasTangents) {
		var ln = A[0].length - 2;
		var tanRow0 = [-1.0,1.0].concat(verb.core.Vec.zeros1d(ln));
		var tanRow1 = verb.core.Vec.zeros1d(ln).concat([-1.0,1.0]);
		verb.core.Utils.spliceAndInsert(A,1,0,tanRow0);
		verb.core.Utils.spliceAndInsert(A,A.length - 1,0,tanRow1);
	}
	var dim = points[0].length;
	var xs = [];
	var mult1 = (1 - knots[knots.length - degree - 2]) / degree;
	var mult0 = knots[degree + 1] / degree;
	var _g5 = 0;
	while(_g5 < dim) {
		var i3 = [_g5++];
		var b;
		if(!hasTangents) b = points.map((function(i3) {
			return function(x) {
				return x[i3[0]];
			};
		})(i3)); else {
			b = [points[0][i3[0]]];
			b.push(mult0 * start_tangent[i3[0]]);
			var _g21 = 1;
			var _g13 = points.length - 1;
			while(_g21 < _g13) {
				var j1 = _g21++;
				b.push(points[j1][i3[0]]);
			}
			b.push(mult1 * end_tangent[i3[0]]);
			b.push(verb.core.Utils.last(points)[i3[0]]);
		}
		var x1 = verb.core.Mat.solve(A,b);
		xs.push(x1);
	}
	var controlPts = verb.core.Vec.transpose(xs);
	var weights = verb.core.Vec.rep(controlPts.length,1.0);
	return new verb.core.types.CurveData(degree,knots,verb.core.Eval.homogenize_1d(controlPts,weights));
};
verb.core.LUDecomp = function(lu,p) {
	this.LU = lu;
	this.P = p;
};
verb.core.Mat = $hx_exports.core.Mat = function() { };
verb.core.Mat.solve = function(A,b) {
	return verb.core.Mat.LUsolve(verb.core.Mat.LU(A),b);
};
verb.core.Mat.LUsolve = function(LUP,b) {
	var i;
	var j;
	var LU = LUP.LU;
	var n = LU.length;
	var x = b.slice();
	var P = LUP.P;
	var Pi;
	var LUi;
	var LUii;
	var tmp;
	i = n - 1;
	while(i != -1) {
		x[i] = b[i];
		--i;
	}
	i = 0;
	while(i < n) {
		Pi = P[i];
		if(P[i] != i) {
			tmp = x[i];
			x[i] = x[Pi];
			x[Pi] = tmp;
		}
		LUi = LU[i];
		j = 0;
		while(j < i) {
			x[i] -= x[j] * LUi[j];
			++j;
		}
		++i;
	}
	i = n - 1;
	while(i >= 0) {
		LUi = LU[i];
		j = i + 1;
		while(j < n) {
			x[i] -= x[j] * LUi[j];
			++j;
		}
		x[i] /= LUi[i];
		--i;
	}
	return x;
};
verb.core.Mat.LU = function(A) {
	var abs = Math.abs;
	var i;
	var j;
	var k;
	var absAjk;
	var Akk;
	var Ak;
	var Pk;
	var Ai;
	var max;
	var _g = [];
	var _g2 = 0;
	var _g1 = A.length;
	while(_g2 < _g1) {
		var i1 = _g2++;
		_g.push(A[i1].slice());
	}
	A = _g;
	var n = A.length;
	var n1 = n - 1;
	var P = new Array();
	k = 0;
	while(k < n) {
		Pk = k;
		Ak = A[k];
		max = Math.abs(Ak[k]);
		j = k + 1;
		while(j < n) {
			absAjk = Math.abs(A[j][k]);
			if(max < absAjk) {
				max = absAjk;
				Pk = j;
			}
			++j;
		}
		P[k] = Pk;
		if(Pk != k) {
			A[k] = A[Pk];
			A[Pk] = Ak;
			Ak = A[k];
		}
		Akk = Ak[k];
		i = k + 1;
		while(i < n) {
			A[i][k] /= Akk;
			++i;
		}
		i = k + 1;
		while(i < n) {
			Ai = A[i];
			j = k + 1;
			while(j < n1) {
				Ai[j] -= Ai[k] * Ak[j];
				++j;
				Ai[j] -= Ai[k] * Ak[j];
				++j;
			}
			if(j == n1) Ai[j] -= Ai[k] * Ak[j];
			++i;
		}
		++k;
	}
	return new verb.core.LUDecomp(A,P);
};
verb.core.Mesh = function() {
};
verb.core.KnotMultiplicity = $hx_exports.core.KnotMultiplicity = function(knot,mult) {
	this.knot = knot;
	this.mult = mult;
};
verb.core.KnotMultiplicity.prototype = {
	inc: function() {
		this.mult++;
	}
};
verb.core.Modify = $hx_exports.core.Modify = function() { };
verb.core.Modify.surface_knot_refine = function(surface,knots_to_insert,useV) {
	var newPts = [];
	var knots;
	var degree;
	var ctrlPts;
	if(!useV) {
		ctrlPts = verb.core.Vec.transpose(surface.controlPoints);
		knots = surface.knotsU;
		degree = surface.degreeU;
	} else {
		ctrlPts = surface.controlPoints;
		knots = surface.knotsV;
		degree = surface.degreeV;
	}
	var c = null;
	var _g = 0;
	while(_g < ctrlPts.length) {
		var cptrow = ctrlPts[_g];
		++_g;
		c = verb.core.Modify.curve_knot_refine(new verb.core.types.CurveData(degree,knots,cptrow),knots_to_insert);
		newPts.push(c.controlPoints);
	}
	var newknots = c.knots;
	if(!useV) {
		newPts = verb.core.Vec.transpose(newPts);
		return new verb.core.types.SurfaceData(surface.degreeU,surface.degreeV,newknots,surface.knotsV.slice(),newPts);
	} else return new verb.core.types.SurfaceData(surface.degreeU,surface.degreeV,surface.knotsU.slice(),newknots,newPts);
};
verb.core.Modify.surface_split = function(surface,u,useV) {
	if(useV == null) useV = false;
	var knots;
	var degree;
	var control_points;
	if(!useV) {
		control_points = verb.core.Vec.transpose(surface.controlPoints);
		knots = surface.knotsU;
		degree = surface.degreeU;
	} else {
		control_points = surface.controlPoints;
		knots = surface.knotsV;
		degree = surface.degreeV;
	}
	var knots_to_insert;
	var _g = [];
	var _g2 = 0;
	var _g1 = degree + 1;
	while(_g2 < _g1) {
		var i = _g2++;
		_g.push(u);
	}
	knots_to_insert = _g;
	var newpts0 = new Array();
	var newpts1 = new Array();
	var s = verb.core.Eval.knot_span(degree,u,knots);
	var res = null;
	var _g11 = 0;
	while(_g11 < control_points.length) {
		var cps = control_points[_g11];
		++_g11;
		res = verb.core.Modify.curve_knot_refine(new verb.core.types.CurveData(degree,knots,cps),knots_to_insert);
		newpts0.push(res.controlPoints.slice(0,s + 1));
		newpts1.push(res.controlPoints.slice(s + 1));
	}
	var knots0 = res.knots.slice(0,s + degree + 2);
	var knots1 = res.knots.slice(s + 1);
	if(!useV) {
		newpts0 = verb.core.Vec.transpose(newpts0);
		newpts1 = verb.core.Vec.transpose(newpts1);
		return [new verb.core.types.SurfaceData(degree,surface.degreeV,knots0,surface.knotsV.slice(),newpts0),new verb.core.types.SurfaceData(degree,surface.degreeV,knots1,surface.knotsV.slice(),newpts1)];
	}
	return [new verb.core.types.SurfaceData(surface.degreeU,degree,surface.knotsU.slice(),knots0,newpts0),new verb.core.types.SurfaceData(surface.degreeU,degree,surface.knotsU.slice(),knots1,newpts1)];
};
verb.core.Modify.curve_bezier_decompose = function(curve) {
	var degree = curve.degree;
	var control_points = curve.controlPoints;
	var knots = curve.knots;
	var knotmults = verb.core.Modify.knot_multiplicities(knots);
	var reqMult = degree + 1;
	var _g = 0;
	while(_g < knotmults.length) {
		var knotmult = knotmults[_g];
		++_g;
		if(knotmult.mult < reqMult) {
			var knotsInsert = verb.core.Vec.rep(reqMult - knotmult.mult,knotmult.knot);
			var res = verb.core.Modify.curve_knot_refine(new verb.core.types.CurveData(degree,knots,control_points),knotsInsert);
			knots = res.knots;
			control_points = res.controlPoints;
		}
	}
	var numCrvs = knots.length / reqMult - 1;
	var crvKnotLength = reqMult * 2;
	var crvs = [];
	var i = 0;
	while(i < control_points.length) {
		var kts = knots.slice(i,i + crvKnotLength);
		var pts = control_points.slice(i,i + reqMult);
		crvs.push(new verb.core.types.CurveData(degree,kts,pts));
		i += reqMult;
	}
	return crvs;
};
verb.core.Modify.knot_multiplicities = function(knots) {
	var mults = [new verb.core.KnotMultiplicity(knots[0],0)];
	var curr = mults[0];
	var _g = 0;
	while(_g < knots.length) {
		var knot = knots[_g];
		++_g;
		if(Math.abs(knot - curr.knot) > verb.core.Constants.EPSILON) {
			curr = new verb.core.KnotMultiplicity(knot,0);
			mults.push(curr);
		}
		curr.inc();
	}
	return mults;
};
verb.core.Modify.curve_split = function(curve,u) {
	var degree = curve.degree;
	var control_points = curve.controlPoints;
	var knots = curve.knots;
	var knots_to_insert;
	var _g = [];
	var _g2 = 0;
	var _g1 = degree + 1;
	while(_g2 < _g1) {
		var i = _g2++;
		_g.push(u);
	}
	knots_to_insert = _g;
	var res = verb.core.Modify.curve_knot_refine(curve,knots_to_insert);
	var s = verb.core.Eval.knot_span(degree,u,knots);
	var knots0 = res.knots.slice(0,s + degree + 2);
	var knots1 = res.knots.slice(s + 1);
	var cpts0 = res.controlPoints.slice(0,s + 1);
	var cpts1 = res.controlPoints.slice(s + 1);
	return [new verb.core.types.CurveData(degree,knots0,cpts0),new verb.core.types.CurveData(degree,knots1,cpts1)];
};
verb.core.Modify.curve_knot_refine = function(curve,knots_to_insert) {
	var degree = curve.degree;
	var control_points = curve.controlPoints;
	var knots = curve.knots;
	var n = control_points.length - 1;
	var m = n + degree + 1;
	var r = knots_to_insert.length - 1;
	var a = verb.core.Eval.knot_span(degree,knots_to_insert[0],knots);
	var b = verb.core.Eval.knot_span(degree,knots_to_insert[r],knots);
	var control_points_post = new Array();
	var knots_post = new Array();
	var _g1 = 0;
	var _g = a - degree + 1;
	while(_g1 < _g) {
		var i = _g1++;
		control_points_post[i] = control_points[i];
	}
	var _g11 = b - 1;
	var _g2 = n + 1;
	while(_g11 < _g2) {
		var i1 = _g11++;
		control_points_post[i1 + r + 1] = control_points[i1];
	}
	var _g12 = 0;
	var _g3 = a + 1;
	while(_g12 < _g3) {
		var i2 = _g12++;
		knots_post[i2] = knots[i2];
	}
	var _g13 = b + degree;
	var _g4 = m + 1;
	while(_g13 < _g4) {
		var i3 = _g13++;
		knots_post[i3 + r + 1] = knots[i3];
	}
	var i4 = b + degree - 1;
	var k = b + degree + r;
	var j = r;
	while(j >= 0) {
		while(knots_to_insert[j] <= knots[i4] && i4 > a) {
			control_points_post[k - degree - 1] = control_points[i4 - degree - 1];
			knots_post[k] = knots[i4];
			k = k - 1;
			i4 = i4 - 1;
		}
		control_points_post[k - degree - 1] = control_points_post[k - degree];
		var _g14 = 1;
		var _g5 = degree + 1;
		while(_g14 < _g5) {
			var l = _g14++;
			var ind = k - degree + l;
			var alfa = knots_post[k + l] - knots_to_insert[j];
			if(Math.abs(alfa) < verb.core.Constants.EPSILON) control_points_post[ind - 1] = control_points_post[ind]; else {
				alfa = alfa / (knots_post[k + l] - knots[i4 - degree + l]);
				control_points_post[ind - 1] = verb.core.Vec.add(verb.core.Vec.mul(alfa,control_points_post[ind - 1]),verb.core.Vec.mul(1.0 - alfa,control_points_post[ind]));
			}
		}
		knots_post[k] = knots_to_insert[j];
		k = k - 1;
		j--;
	}
	return new verb.core.types.CurveData(degree,knots_post,control_points_post);
};
verb.core.Modify.curve_knot_insert = function(curve,u,r) {
	var degree = curve.degree;
	var control_points = curve.controlPoints;
	var knots = curve.knots;
	var s = 0;
	var num_pts = control_points.length;
	var k = verb.core.Eval.knot_span(degree,u,knots);
	var num_pts_post = num_pts + r;
	var control_points_temp = new Array();
	var knots_post = new Array();
	var control_points_post = new Array();
	var i = 0;
	var _g1 = 1;
	var _g = k + 1;
	while(_g1 < _g) {
		var i1 = _g1++;
		knots_post[i1] = knots[i1];
	}
	var _g11 = 1;
	var _g2 = r + 1;
	while(_g11 < _g2) {
		var i2 = _g11++;
		knots_post[k + i2] = u;
	}
	var _g12 = k + 1;
	var _g3 = knots.length;
	while(_g12 < _g3) {
		var i3 = _g12++;
		knots_post[i3 + r] = knots[i3];
	}
	var _g13 = 0;
	var _g4 = k - degree + 1;
	while(_g13 < _g4) {
		var i4 = _g13++;
		control_points_post[i4] = control_points[i4];
	}
	var _g5 = k - s;
	while(_g5 < num_pts) {
		var i5 = _g5++;
		control_points_post[i5 + r] = control_points[i5];
	}
	var _g14 = 0;
	var _g6 = degree - s + 1;
	while(_g14 < _g6) {
		var i6 = _g14++;
		control_points_temp[i6] = control_points[k - degree + i6];
	}
	var L = 0;
	var alpha = 0;
	var _g15 = 1;
	var _g7 = r + 1;
	while(_g15 < _g7) {
		var j = _g15++;
		L = k - degree + j;
		var _g31 = 0;
		var _g21 = degree - j - s + 1;
		while(_g31 < _g21) {
			var i7 = _g31++;
			alpha = (u - knots[L + i7]) / (knots[i7 + k + 1] - knots[L + i7]);
			control_points_temp[i7] = verb.core.Vec.add(verb.core.Vec.mul(alpha,control_points_temp[i7 + 1]),verb.core.Vec.mul(1.0 - alpha,control_points_temp[i7]));
		}
		control_points_post[L] = control_points_temp[0];
		control_points_post[k + r - j - s] = control_points_temp[degree - j - s];
	}
	var _g16 = L + 1;
	var _g8 = k - s;
	while(_g16 < _g8) {
		var i8 = _g16++;
		control_points_post[i8] = control_points_temp[i8 - L];
	}
	return new verb.core.types.CurveData(degree,knots_post,control_points_post);
};
verb.core.Tess = $hx_exports.core.Tess = function() { };
verb.core.Tess.rational_curve_regular_sample = function(curve,numSamples,includeU) {
	return verb.core.Tess.rational_curve_regular_sample_range(curve,curve.knots[0],verb.core.Utils.last(curve.knots),numSamples,includeU);
};
verb.core.Tess.rational_curve_regular_sample_range = function(curve,start,end,numSamples,includeU) {
	if(numSamples < 1) numSamples = 2;
	var p = [];
	var span = (end - start) / (numSamples - 1);
	var u = 0;
	var _g = 0;
	while(_g < numSamples) {
		var i = _g++;
		u = start + span * i;
		if(includeU) p.push([u].concat(verb.core.Eval.rational_curve_point(curve,u))); else p.push(verb.core.Eval.rational_curve_point(curve,u));
	}
	return p;
};
verb.core.Tess.rational_curve_adaptive_sample = function(curve,tol,includeU) {
	if(curve.degree == 1) {
		if(!includeU) return curve.controlPoints.map(verb.core.Eval.dehomogenize); else {
			var _g = [];
			var _g2 = 0;
			var _g1 = curve.controlPoints.length;
			while(_g2 < _g1) {
				var i = _g2++;
				_g.push([curve.knots[i + 1]].concat(verb.core.Eval.dehomogenize(curve.controlPoints[i])));
			}
			return _g;
		}
	}
	return verb.core.Tess.rational_curve_adaptive_sample_range(curve,curve.knots[0],verb.core.Utils.last(curve.knots),tol,includeU);
};
verb.core.Tess.rational_curve_adaptive_sample_range = function(curve,start,end,tol,includeU) {
	var p1 = verb.core.Eval.rational_curve_point(curve,start);
	var p3 = verb.core.Eval.rational_curve_point(curve,end);
	var t = 0.5 + 0.2 * Math.random();
	var mid = start + (end - start) * t;
	var p2 = verb.core.Eval.rational_curve_point(curve,mid);
	var diff = verb.core.Vec.sub(p1,p3);
	var diff2 = verb.core.Vec.sub(p1,p2);
	if(verb.core.Vec.dot(diff,diff) < tol && verb.core.Vec.dot(diff2,diff2) > tol || !verb.core.Trig.three_points_are_flat(p1,p2,p3,tol)) {
		var exact_mid = start + (end - start) * 0.5;
		var left_pts = verb.core.Tess.rational_curve_adaptive_sample_range(curve,start,exact_mid,tol,includeU);
		var right_pts = verb.core.Tess.rational_curve_adaptive_sample_range(curve,exact_mid,end,tol,includeU);
		return left_pts.slice(0,-1).concat(right_pts);
	} else if(includeU) return [[start].concat(p1),[end].concat(p3)]; else return [p1,p3];
};
verb.core.Tess.tessellate_rational_surface_naive = function(surface,divs_u,divs_v) {
	if(divs_u < 1) divs_u = 1;
	if(divs_v < 1) divs_v = 1;
	var degree_u = surface.degreeU;
	var degreeV = surface.degreeV;
	var control_points = surface.controlPoints;
	var knotsU = surface.knotsU;
	var knotsV = surface.knotsV;
	var u_span = verb.core.Utils.last(knotsU) - knotsU[0];
	var v_span = verb.core.Utils.last(knotsV) - knotsV[0];
	var span_u = u_span / divs_u;
	var span_v = v_span / divs_v;
	var points = [];
	var uvs = [];
	var normals = [];
	var _g1 = 0;
	var _g = divs_u + 1;
	while(_g1 < _g) {
		var i = _g1++;
		var _g3 = 0;
		var _g2 = divs_v + 1;
		while(_g3 < _g2) {
			var j = _g3++;
			var pt_u = i * span_u;
			var pt_v = j * span_v;
			uvs.push([pt_u,pt_v]);
			var derivs = verb.core.Eval.rational_surface_derivs(surface,1,pt_u,pt_v);
			var pt = derivs[0][0];
			points.push(pt);
			var normal = verb.core.Vec.normalized(verb.core.Vec.cross(derivs[1][0],derivs[0][1]));
			normals.push(normal);
		}
	}
	var faces = [];
	var _g4 = 0;
	while(_g4 < divs_u) {
		var i1 = _g4++;
		var _g11 = 0;
		while(_g11 < divs_v) {
			var j1 = _g11++;
			var a_i = i1 * (divs_v + 1) + j1;
			var b_i = (i1 + 1) * (divs_v + 1) + j1;
			var c_i = b_i + 1;
			var d_i = a_i + 1;
			var abc = [a_i,b_i,c_i];
			var acd = [a_i,c_i,d_i];
			faces.push(abc);
			faces.push(acd);
		}
	}
	return new verb.core.types.MeshData(faces,points,normals,uvs);
};
verb.core.Tess.divide_rational_surface_adaptive = function(surface,options) {
	if(options == null) options = new verb.core.types.AdaptiveRefinementOptions();
	if(options.minDivsU != null) options.minDivsU = options.minDivsU; else options.minDivsU = 1;
	if(options.minDivsV != null) options.minDivsU = options.minDivsV; else options.minDivsU = 1;
	if(options.refine != null) options.refine = options.refine; else options.refine = true;
	var minU = (surface.controlPoints.length - 1) * 3;
	var minV = (surface.controlPoints[0].length - 1) * 3;
	var divsU;
	divsU = options.minDivsU > minU?options.minDivsU = options.minDivsU:options.minDivsU = minU;
	var divsV;
	divsV = options.minDivsV > minV?options.minDivsV = options.minDivsV:options.minDivsV = minV;
	var umax = verb.core.Utils.last(surface.knotsU);
	var umin = surface.knotsU[0];
	var vmax = verb.core.Utils.last(surface.knotsV);
	var vmin = surface.knotsV[0];
	var du = (umax - umin) / divsU;
	var dv = (vmax - vmin) / divsV;
	var divs = [];
	var pts = [];
	var _g1 = 0;
	var _g = divsV + 1;
	while(_g1 < _g) {
		var i = _g1++;
		var ptrow = [];
		var _g3 = 0;
		var _g2 = divsU + 1;
		while(_g3 < _g2) {
			var j = _g3++;
			var u = umin + du * j;
			var v = vmin + dv * i;
			var ds = verb.core.Eval.rational_surface_derivs(surface,1,u,v);
			var norm = verb.core.Vec.normalized(verb.core.Vec.cross(ds[0][1],ds[1][0]));
			ptrow.push(new verb.core.types.SurfacePoint(ds[0][0],norm,[u,v],-1,verb.core.Vec.isZero(norm)));
		}
		pts.push(ptrow);
	}
	var _g4 = 0;
	while(_g4 < divsV) {
		var i1 = _g4++;
		var _g11 = 0;
		while(_g11 < divsU) {
			var j1 = _g11++;
			var corners = [pts[divsV - i1 - 1][j1],pts[divsV - i1 - 1][j1 + 1],pts[divsV - i1][j1 + 1],pts[divsV - i1][j1]];
			divs.push(new verb.core.types.AdaptiveRefinementNode(surface,corners));
		}
	}
	if(!options.refine) return divs;
	var _g5 = 0;
	while(_g5 < divsV) {
		var i2 = _g5++;
		var _g12 = 0;
		while(_g12 < divsU) {
			var j2 = _g12++;
			var ci = i2 * divsU + j2;
			var n = verb.core.Tess.north(ci,i2,j2,divsU,divsV,divs);
			var e = verb.core.Tess.east(ci,i2,j2,divsU,divsV,divs);
			var s = verb.core.Tess.south(ci,i2,j2,divsU,divsV,divs);
			var w = verb.core.Tess.west(ci,i2,j2,divsU,divsV,divs);
			divs[ci].neighbors = [s,e,n,w];
			divs[ci].divide(options);
		}
	}
	return divs;
};
verb.core.Tess.north = function(index,i,j,divsU,divsV,divs) {
	if(i == 0) return null;
	return divs[index - divsU];
};
verb.core.Tess.south = function(index,i,j,divsU,divsV,divs) {
	if(i == divsV - 1) return null;
	return divs[index + divsU];
};
verb.core.Tess.east = function(index,i,j,divsU,divsV,divs) {
	if(j == divsU - 1) return null;
	return divs[index + 1];
};
verb.core.Tess.west = function(index,i,j,divsU,divsV,divs) {
	if(j == 0) return null;
	return divs[index - 1];
};
verb.core.Tess.triangulate_adaptive_refinement_node_tree = function(arrTree) {
	var mesh = verb.core.types.MeshData.empty();
	var _g = 0;
	while(_g < arrTree.length) {
		var x = arrTree[_g];
		++_g;
		x.triangulate(mesh);
	}
	return mesh;
};
verb.core.Tess.tessellate_rational_surface_adaptive = function(surface,options) {
	var arrTrees = verb.core.Tess.divide_rational_surface_adaptive(surface,options);
	return verb.core.Tess.triangulate_adaptive_refinement_node_tree(arrTrees);
};
verb.core.Trig = $hx_exports.core.Trig = function() { };
verb.core.Trig.dist_to_seg = function(a,b,c) {
	var acv = verb.core.Vec.sub(c,a);
	var acl = verb.core.Vec.norm(acv);
	var bma = verb.core.Vec.sub(b,a);
	if(acl < verb.core.Constants.TOLERANCE) return verb.core.Vec.norm(bma);
	var ac = verb.core.Vec.mul(1 / acl,acv);
	var p = verb.core.Vec.dot(bma,ac);
	var acd = verb.core.Vec.add(a,verb.core.Vec.mul(p,ac));
	return verb.core.Vec.dist(acd,b);
};
verb.core.Trig.closest_point_on_ray = function(pt,o,r) {
	var o2pt = verb.core.Vec.sub(pt,o);
	var do2ptr = verb.core.Vec.dot(o2pt,r);
	var proj = verb.core.Vec.add(o,verb.core.Vec.mul(do2ptr,r));
	return proj;
};
verb.core.Trig.dist_to_ray = function(pt,o,r) {
	var d = verb.core.Trig.closest_point_on_ray(pt,o,r);
	var dif = verb.core.Vec.sub(d,pt);
	return verb.core.Vec.norm(dif);
};
verb.core.Trig.three_points_are_flat = function(p1,p2,p3,tol) {
	var p2mp1 = verb.core.Vec.sub(p2,p1);
	var p3mp1 = verb.core.Vec.sub(p3,p1);
	var norm = verb.core.Vec.cross(p2mp1,p3mp1);
	var area = verb.core.Vec.dot(norm,norm);
	return area < tol;
};
verb.core.Utils = function() { };
verb.core.Utils.last = function(a) {
	return a[a.length - 1];
};
verb.core.Utils.spliceAndInsert = function(a,start,end,ele) {
	a.splice(start,end);
	a.splice(start,0,ele);
};
verb.core.Vec = $hx_exports.core.Vec = function() { };
verb.core.Vec.normalized = function(arr) {
	return verb.core.Vec.div(arr,verb.core.Vec.norm(arr));
};
verb.core.Vec.cross = function(u,v) {
	return [u[1] * v[2] - u[2] * v[1],u[2] * v[0] - u[0] * v[2],u[0] * v[1] - u[1] * v[0]];
};
verb.core.Vec.transpose = function(a) {
	if(a.length == 0) return [];
	var _g = [];
	var _g2 = 0;
	var _g1 = a[0].length;
	while(_g2 < _g1) {
		var i = _g2++;
		_g.push((function($this) {
			var $r;
			var _g3 = [];
			{
				var _g5 = 0;
				var _g4 = a.length;
				while(_g5 < _g4) {
					var j = _g5++;
					_g3.push(a[j][i]);
				}
			}
			$r = _g3;
			return $r;
		}(this)));
	}
	return _g;
};
verb.core.Vec.dist = function(a,b) {
	return verb.core.Vec.norm(verb.core.Vec.sub(a,b));
};
verb.core.Vec.distSquared = function(a,b) {
	return verb.core.Vec.normSquared(verb.core.Vec.sub(a,b));
};
verb.core.Vec.sum = function(a) {
	return Lambda.fold(a,function(x,a1) {
		return a1 + x;
	},0);
};
verb.core.Vec.norm = function(a) {
	return Math.sqrt(verb.core.Vec.normSquared(a));
};
verb.core.Vec.normSquared = function(a) {
	return Lambda.fold(a,function(x,a1) {
		return a1 + x * x;
	},0);
};
verb.core.Vec.rep = function(num,ele) {
	var _g = [];
	var _g1 = 0;
	while(_g1 < num) {
		var i = _g1++;
		_g.push(ele);
	}
	return _g;
};
verb.core.Vec.zeros1d = function(rows) {
	var _g = [];
	var _g1 = 0;
	while(_g1 < rows) {
		var i = _g1++;
		_g.push(0.0);
	}
	return _g;
};
verb.core.Vec.zeros2d = function(rows,cols) {
	var _g = [];
	var _g1 = 0;
	while(_g1 < rows) {
		var i = _g1++;
		_g.push(verb.core.Vec.zeros1d(cols));
	}
	return _g;
};
verb.core.Vec.zeros3d = function(rows,cols,depth) {
	var _g = [];
	var _g1 = 0;
	while(_g1 < rows) {
		var i = _g1++;
		_g.push(verb.core.Vec.zeros2d(cols,depth));
	}
	return _g;
};
verb.core.Vec.dot = function(a,b) {
	var sum = 0;
	var _g1 = 0;
	var _g = a.length;
	while(_g1 < _g) {
		var i = _g1++;
		sum += a[i] * b[i];
	}
	return sum;
};
verb.core.Vec.add = function(a,b) {
	var _g = [];
	var _g2 = 0;
	var _g1 = a.length;
	while(_g2 < _g1) {
		var i = _g2++;
		_g.push(a[i] + b[i]);
	}
	return _g;
};
verb.core.Vec.mul = function(a,b) {
	var _g = [];
	var _g2 = 0;
	var _g1 = b.length;
	while(_g2 < _g1) {
		var i = _g2++;
		_g.push(a * b[i]);
	}
	return _g;
};
verb.core.Vec.div = function(a,b) {
	var _g = [];
	var _g2 = 0;
	var _g1 = a.length;
	while(_g2 < _g1) {
		var i = _g2++;
		_g.push(a[i] / b);
	}
	return _g;
};
verb.core.Vec.sub = function(a,b) {
	var _g = [];
	var _g2 = 0;
	var _g1 = a.length;
	while(_g2 < _g1) {
		var i = _g2++;
		_g.push(a[i] - b[i]);
	}
	return _g;
};
verb.core.Vec.isZero = function(vec) {
	var _g1 = 0;
	var _g = vec.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(Math.abs(vec[i]) > verb.core.Constants.TOLERANCE) return false;
	}
	return true;
};
verb.core.types = {};
verb.core.types.AdaptiveRefinementOptions = function() {
	this.minDivsV = 1;
	this.minDivsU = 1;
	this.refine = true;
	this.maxDepth = 10;
	this.minDepth = 0;
	this.normTol = 8.5e-2;
};
verb.core.types.AdaptiveRefinementNode = $hx_exports.core.AdaptiveRefinementNode = function(srf,corners,neighbors) {
	this.srf = srf;
	if(neighbors == null) this.neighbors = [null,null,null,null]; else this.neighbors = neighbors;
	this.corners = corners;
	if(this.corners == null) {
		var u0 = srf.knotsU[0];
		var u1 = verb.core.Utils.last(srf.knotsU);
		var v0 = srf.knotsV[0];
		var v1 = verb.core.Utils.last(srf.knotsV);
		this.corners = [verb.core.types.SurfacePoint.fromUv(u0,v0),verb.core.types.SurfacePoint.fromUv(u1,v0),verb.core.types.SurfacePoint.fromUv(u1,v1),verb.core.types.SurfacePoint.fromUv(u0,v1)];
	}
};
verb.core.types.AdaptiveRefinementNode.prototype = {
	isLeaf: function() {
		return this.children == null;
	}
	,center: function() {
		if(this.centerPoint != null) return this.centerPoint; else return this.evalSrf(this.u05,this.v05);
	}
	,evalCorners: function() {
		this.u05 = (this.corners[0].uv[0] + this.corners[2].uv[0]) / 2;
		this.v05 = (this.corners[0].uv[1] + this.corners[2].uv[1]) / 2;
		var _g = 0;
		while(_g < 4) {
			var i = _g++;
			if(this.corners[i].point == null) {
				var c = this.corners[i];
				this.evalSrf(c.uv[0],c.uv[1],c);
			}
		}
	}
	,evalSrf: function(u,v,srfPt) {
		var derivs = verb.core.Eval.rational_surface_derivs(this.srf,1,u,v);
		var pt = derivs[0][0];
		var norm = verb.core.Vec.cross(derivs[0][1],derivs[1][0]);
		var degen = verb.core.Vec.isZero(norm);
		if(!degen) norm = verb.core.Vec.normalized(norm);
		if(srfPt != null) {
			srfPt.degen = degen;
			srfPt.point = pt;
			srfPt.normal = norm;
			return srfPt;
		} else return new verb.core.types.SurfacePoint(pt,norm,[u,v],-1,degen);
	}
	,getEdgeCorners: function(edgeIndex) {
		if(this.isLeaf()) return [this.corners[edgeIndex]];
		if(this.horizontal) switch(edgeIndex) {
		case 0:
			return this.children[0].getEdgeCorners(0);
		case 1:
			return this.children[0].getEdgeCorners(1).concat(this.children[1].getEdgeCorners(1));
		case 2:
			return this.children[1].getEdgeCorners(2);
		case 3:
			return this.children[1].getEdgeCorners(3).concat(this.children[0].getEdgeCorners(3));
		}
		switch(edgeIndex) {
		case 0:
			return this.children[0].getEdgeCorners(0).concat(this.children[1].getEdgeCorners(0));
		case 1:
			return this.children[1].getEdgeCorners(1);
		case 2:
			return this.children[1].getEdgeCorners(2).concat(this.children[0].getEdgeCorners(2));
		case 3:
			return this.children[0].getEdgeCorners(3);
		}
		return null;
	}
	,getAllCorners: function(edgeIndex) {
		var baseArr = [this.corners[edgeIndex]];
		if(this.neighbors[edgeIndex] == null) return baseArr;
		var corners = this.neighbors[edgeIndex].getEdgeCorners((edgeIndex + 2) % 4);
		var funcIndex = edgeIndex % 2;
		var e = verb.core.Constants.EPSILON;
		var that = this;
		var rangeFuncMap = [function(c) {
			return c.uv[0] > that.corners[0].uv[0] + e && c.uv[0] < that.corners[2].uv[0] - e;
		},function(c1) {
			return c1.uv[1] > that.corners[0].uv[1] + e && c1.uv[1] < that.corners[2].uv[1] - e;
		}];
		var cornercopy = corners.filter(rangeFuncMap[funcIndex]);
		cornercopy.reverse();
		return baseArr.concat(cornercopy);
	}
	,midpoint: function(index) {
		if(this.midPoints == null) this.midPoints = [null,null,null,null];
		if(!(this.midPoints[index] == null)) return this.midPoints[index];
		switch(index) {
		case 0:
			this.midPoints[0] = this.evalSrf(this.u05,this.corners[0].uv[1]);
			break;
		case 1:
			this.midPoints[1] = this.evalSrf(this.corners[1].uv[0],this.v05);
			break;
		case 2:
			this.midPoints[2] = this.evalSrf(this.u05,this.corners[2].uv[1]);
			break;
		case 3:
			this.midPoints[3] = this.evalSrf(this.corners[0].uv[0],this.v05);
			break;
		}
		return this.midPoints[index];
	}
	,hasBadNormals: function() {
		return this.corners[0].degen || this.corners[1].degen || this.corners[2].degen || this.corners[3].degen;
	}
	,fixNormals: function() {
		var l = this.corners.length;
		var _g = 0;
		while(_g < l) {
			var i = _g++;
			var corn = this.corners[i];
			if(this.corners[i].degen) {
				var v1 = this.corners[(i + 1) % l];
				var v2 = this.corners[(i + 3) % l];
				if(v1.degen) this.corners[i].normal = v2.normal; else this.corners[i].normal = v1.normal;
			}
		}
	}
	,shouldDivide: function(options,currentDepth) {
		if(currentDepth < options.minDepth) return true;
		if(currentDepth >= options.maxDepth) return false;
		if(this.hasBadNormals()) {
			this.fixNormals();
			return false;
		}
		this.splitVert = verb.core.Vec.normSquared(verb.core.Vec.sub(this.corners[0].normal,this.corners[1].normal)) > options.normTol || verb.core.Vec.normSquared(verb.core.Vec.sub(this.corners[2].normal,this.corners[3].normal)) > options.normTol;
		this.splitHoriz = verb.core.Vec.normSquared(verb.core.Vec.sub(this.corners[1].normal,this.corners[2].normal)) > options.normTol || verb.core.Vec.normSquared(verb.core.Vec.sub(this.corners[3].normal,this.corners[0].normal)) > options.normTol;
		if(this.splitVert || this.splitHoriz) return true;
		var center = this.center();
		return verb.core.Vec.normSquared(verb.core.Vec.sub(center.normal,this.corners[0].normal)) > options.normTol || verb.core.Vec.normSquared(verb.core.Vec.sub(center.normal,this.corners[1].normal)) > options.normTol || verb.core.Vec.normSquared(verb.core.Vec.sub(center.normal,this.corners[2].normal)) > options.normTol || verb.core.Vec.normSquared(verb.core.Vec.sub(center.normal,this.corners[3].normal)) > options.normTol;
	}
	,divide: function(options) {
		if(options == null) options = new verb.core.types.AdaptiveRefinementOptions();
		if(options.normTol == null) options.normTol = 8.5e-2;
		if(options.minDepth == null) options.minDepth = 0;
		if(options.maxDepth == null) options.maxDepth = 10;
		this._divide(options,0,true);
	}
	,_divide: function(options,currentDepth,horiz) {
		this.evalCorners();
		if(!this.shouldDivide(options,currentDepth)) return;
		currentDepth++;
		if(this.splitVert && !this.splitHoriz) horiz = false; else if(!this.splitVert && this.splitHoriz) horiz = true;
		this.horizontal = horiz;
		if(this.horizontal) {
			var bott = [this.corners[0],this.corners[1],this.midpoint(1),this.midpoint(3)];
			var top = [this.midpoint(3),this.midpoint(1),this.corners[2],this.corners[3]];
			this.children = [new verb.core.types.AdaptiveRefinementNode(this.srf,bott),new verb.core.types.AdaptiveRefinementNode(this.srf,top)];
			this.children[0].neighbors = [this.neighbors[0],this.neighbors[1],this.children[1],this.neighbors[3]];
			this.children[1].neighbors = [this.children[0],this.neighbors[1],this.neighbors[2],this.neighbors[3]];
		} else {
			var left = [this.corners[0],this.midpoint(0),this.midpoint(2),this.corners[3]];
			var right = [this.midpoint(0),this.corners[1],this.corners[2],this.midpoint(2)];
			this.children = [new verb.core.types.AdaptiveRefinementNode(this.srf,left),new verb.core.types.AdaptiveRefinementNode(this.srf,right)];
			this.children[0].neighbors = [this.neighbors[0],this.children[1],this.neighbors[2],this.neighbors[3]];
			this.children[1].neighbors = [this.neighbors[0],this.neighbors[1],this.neighbors[2],this.children[0]];
		}
		var _g = 0;
		var _g1 = this.children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			child._divide(options,currentDepth,!horiz);
		}
	}
	,triangulate: function(mesh) {
		if(mesh == null) mesh = verb.core.types.MeshData.empty();
		if(this.isLeaf()) return this.triangulateLeaf(mesh);
		var _g = 0;
		var _g1 = this.children;
		while(_g < _g1.length) {
			var x = _g1[_g];
			++_g;
			if(x == null) break;
			x.triangulate(mesh);
		}
		return mesh;
	}
	,triangulateLeaf: function(mesh) {
		var baseIndex = mesh.points.length;
		var uvs = [];
		var ids = [];
		var splitid = 0;
		var _g = 0;
		while(_g < 4) {
			var i = _g++;
			var edgeCorners = this.getAllCorners(i);
			if(edgeCorners.length == 2) splitid = i + 1;
			var _g2 = 0;
			var _g1 = edgeCorners.length;
			while(_g2 < _g1) {
				var j = _g2++;
				uvs.push(edgeCorners[j]);
			}
		}
		var _g3 = 0;
		while(_g3 < uvs.length) {
			var corner = uvs[_g3];
			++_g3;
			if(corner.id != -1) {
				ids.push(corner.id);
				continue;
			}
			mesh.uvs.push(corner.uv);
			mesh.points.push(corner.point);
			mesh.normals.push(corner.normal);
			corner.id = baseIndex;
			ids.push(baseIndex);
			baseIndex++;
		}
		if(uvs.length == 4) {
			mesh.faces.push([ids[0],ids[3],ids[1]]);
			mesh.faces.push([ids[3],ids[2],ids[1]]);
			return mesh;
		} else if(uvs.length == 5) {
			var il = ids.length;
			mesh.faces.push([ids[splitid],ids[(splitid + 1) % il],ids[(splitid + 2) % il]]);
			mesh.faces.push([ids[(splitid + 4) % il],ids[(splitid + 3) % il],ids[splitid]]);
			mesh.faces.push([ids[splitid],ids[(splitid + 2) % il],ids[(splitid + 3) % il]]);
			return mesh;
		}
		var center = this.center();
		mesh.uvs.push(center.uv);
		mesh.points.push(center.point);
		mesh.normals.push(center.normal);
		var centerIndex = mesh.points.length - 1;
		var i1 = 0;
		var j1 = uvs.length - 1;
		while(i1 < uvs.length) {
			mesh.faces.push([centerIndex,ids[j1],ids[i1]]);
			j1 = i1++;
		}
		return mesh;
	}
};
verb.core.types.CurveData = $hx_exports.core.CurveData = function(degree,knots,controlPoints) {
	this.degree = degree;
	this.controlPoints = controlPoints;
	this.knots = knots;
};
verb.core.types.MeshData = $hx_exports.core.MeshData = function(faces,vertices,normals,uvs) {
	this.faces = faces;
	this.points = vertices;
	this.normals = normals;
	this.uvs = uvs;
};
verb.core.types.MeshData.empty = function() {
	return new verb.core.types.MeshData([],[],[],[]);
};
verb.core.types.SurfaceData = $hx_exports.core.SurfaceData = function(degreeU,degreeV,knotsU,knotsV,controlPoints) {
	this.degreeU = degreeU;
	this.degreeV = degreeV;
	this.knotsU = knotsU;
	this.knotsV = knotsV;
	this.controlPoints = controlPoints;
};
verb.core.types.SurfacePoint = function(point,normal,uv,id,degen) {
	if(degen == null) degen = false;
	if(id == null) id = -1;
	this.uv = uv;
	this.point = point;
	this.normal = normal;
	this.id = id;
	this.degen = degen;
};
verb.core.types.SurfacePoint.fromUv = function(u,v) {
	return new verb.core.types.SurfacePoint(null,null,[u,v]);
};
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; }
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i1) {
	return isNaN(i1);
};
if(Array.prototype.map == null) Array.prototype.map = function(f) {
	var a = [];
	var _g1 = 0;
	var _g = this.length;
	while(_g1 < _g) {
		var i = _g1++;
		a[i] = f(this[i]);
	}
	return a;
};
if(Array.prototype.filter == null) Array.prototype.filter = function(f1) {
	var a1 = [];
	var _g11 = 0;
	var _g2 = this.length;
	while(_g11 < _g2) {
		var i1 = _g11++;
		var e = this[i1];
		if(f1(e)) a1.push(e);
	}
	return a1;
};
verb.BoundingBox.TOLERANCE = 1e-4;
verb.core.Binomial.memo = new haxe.ds.IntMap();
verb.core.Constants.TOLERANCE = 1e-6;
verb.core.Constants.EPSILON = 1e-10;
verb.Init.main();
})(typeof window != "undefined" ? window : exports);
