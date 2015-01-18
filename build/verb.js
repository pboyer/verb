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
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
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
	this.max = null;
	this.min = null;
	this.dim = 3;
	this.initialized = false;
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
		return new verb.BoundingBox([pt]);
	}
	,add: function(point) {
		if(!this.initialized) {
			this.dim = point.length;
			this.min = point.slice(0);
			this.max = point.slice(0);
			this.initialized = true;
			return this;
		}
		var _g1 = 0;
		var _g = this.dim;
		while(_g1 < _g) {
			var i = _g1++;
			if(point[i] > this.max[i]) this.max[i] = point[i];
			if(point[i] < this.min[i]) this.min[i] = point[i];
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
verb.core.Analyze = $hx_exports.core.Analyze = function() { };
verb.core.Analyze.is_rational_surface_closed = function(surface,uDir) {
	if(uDir == null) uDir = true;
	var cpts;
	if(uDir) cpts = surface.controlPoints; else cpts = verb.core.Mat.transpose(surface.controlPoints);
	var _g1 = 0;
	var _g = cpts[0].length;
	while(_g1 < _g) {
		var i = _g1++;
		var test = verb.core.Vec.dist(cpts[0][i],cpts[cpts.length - 1][i]) < verb.core.Constants.EPSILON;
		if(!test) return false;
	}
	return true;
};
verb.core.Analyze.rational_surface_closest_point = function(surface,p) {
	var maxits = 5;
	var i = 0;
	var e;
	var eps1 = 0.0001;
	var eps2 = 0.0005;
	var dif;
	var minu = surface.knotsU[0];
	var maxu = verb.core.ArrayExtensions.last(surface.knotsU);
	var minv = surface.knotsV[0];
	var maxv = verb.core.ArrayExtensions.last(surface.knotsV);
	var closedu = verb.core.Analyze.is_rational_surface_closed(surface);
	var closedv = verb.core.Analyze.is_rational_surface_closed(surface,false);
	var cuv;
	var tess = verb.core.Tess.rational_surface_adaptive(surface,new verb.core.types.AdaptiveRefinementOptions());
	var dmin = Math.POSITIVE_INFINITY;
	var _g1 = 0;
	var _g = tess.points.length;
	while(_g1 < _g) {
		var i1 = _g1++;
		var x = tess.points[i1];
		var d = verb.core.Vec.normSquared(verb.core.Vec.sub(p,x));
		if(d < dmin) {
			dmin = d;
			cuv = tess.uvs[i1];
		}
	}
	var f = function(uv) {
		return verb.core.Eval.rational_surface_derivs(surface,2,uv[0],uv[1]);
	};
	var n = function(uv1,e1,r) {
		var Su = e1[1][0];
		var Sv = e1[0][1];
		var Suu = e1[2][0];
		var Svv = e1[0][2];
		var Suv = e1[1][1];
		var Svu = e1[1][1];
		var f1 = verb.core.Vec.dot(Su,r);
		var g = verb.core.Vec.dot(Sv,r);
		var k = [-f1,-g];
		var J00 = verb.core.Vec.dot(Su,Su) + verb.core.Vec.dot(Suu,r);
		var J01 = verb.core.Vec.dot(Su,Sv) + verb.core.Vec.dot(Suv,r);
		var J10 = verb.core.Vec.dot(Su,Sv) + verb.core.Vec.dot(Svu,r);
		var J11 = verb.core.Vec.dot(Sv,Sv) + verb.core.Vec.dot(Svv,r);
		var J = [[J00,J01],[J10,J11]];
		var d1 = verb.core.Mat.solve(J,k);
		return verb.core.Vec.add(d1,uv1);
	};
	while(i < maxits) {
		e = f(cuv);
		dif = verb.core.Vec.sub(e[0][0],p);
		var c1v = verb.core.Vec.norm(dif);
		var c2an = verb.core.Vec.dot(e[1][0],dif);
		var c2ad = verb.core.Vec.norm(e[1][0]) * c1v;
		var c2bn = verb.core.Vec.dot(e[0][1],dif);
		var c2bd = verb.core.Vec.norm(e[0][1]) * c1v;
		var c2av = c2an / c2ad;
		var c2bv = c2bn / c2bd;
		var c1 = c1v < eps1;
		var c2a = c2av < eps2;
		var c2b = c2bv < eps2;
		if(c1 && c2a && c2b) return cuv;
		var ct = n(cuv,e,dif);
		if(ct[0] < minu) if(closedu) ct = [maxu - (ct[0] - minu),ct[1]]; else ct = [minu + verb.core.Constants.EPSILON,ct[1]]; else if(ct[0] > maxu) if(closedu) ct = [minu + (ct[0] - maxu),ct[1]]; else ct = [maxu - verb.core.Constants.EPSILON,ct[1]];
		if(ct[1] < minv) if(closedv) ct = [ct[0],maxv - (ct[1] - minv)]; else ct = [ct[0],minv + verb.core.Constants.EPSILON]; else if(ct[1] > maxv) if(closedv) ct = [ct[0],minv + (ct[0] - maxv)]; else ct = [ct[0],maxv - verb.core.Constants.EPSILON];
		var c3v0 = verb.core.Vec.norm(verb.core.Vec.mul(ct[0] - cuv[0],e[1][0]));
		var c3v1 = verb.core.Vec.norm(verb.core.Vec.mul(ct[1] - cuv[1],e[0][1]));
		if(c3v0 + c3v1 < eps1) return cuv;
		cuv = ct;
		i++;
	}
	return cuv;
};
verb.core.Analyze.rational_curve_closest_point = function(curve,p) {
	var tol = 1.0e-3;
	var min = Math.POSITIVE_INFINITY;
	var u = 0.0;
	var pts = verb.core.Tess.rational_curve_adaptive_sample(curve,tol,true);
	var _g1 = 0;
	var _g = pts.length - 1;
	while(_g1 < _g) {
		var i = _g1++;
		var u0 = pts[i][0];
		var u1 = pts[i + 1][0];
		var p0 = pts[i].slice(1);
		var p1 = pts[i + 1].slice(1);
		var proj = verb.core.Trig.closest_point_on_segment(p,p0,p1,u0,u1);
		var d = verb.core.Vec.norm(verb.core.Vec.sub(p,proj.pt));
		if(d < min) {
			min = d;
			u = proj.u;
		}
	}
	var maxits = 5;
	var i1 = 0;
	var e;
	var eps1 = 0.0001;
	var eps2 = 0.0005;
	var dif;
	var minu = curve.knots[0];
	var maxu = verb.core.ArrayExtensions.last(curve.knots);
	var closed = verb.core.Vec.normSquared(verb.core.Vec.sub(curve.controlPoints[0],verb.core.ArrayExtensions.last(curve.controlPoints))) < verb.core.Constants.EPSILON;
	var cu = u;
	var f = function(u2) {
		return verb.core.Eval.rational_curve_derivs(curve,u2,2);
	};
	var n = function(u3,e1,d1) {
		var f1 = verb.core.Vec.dot(e1[1],d1);
		var s0 = verb.core.Vec.dot(e1[2],d1);
		var s1 = verb.core.Vec.dot(e1[1],e1[1]);
		var df = s0 + s1;
		return u3 - f1 / df;
	};
	while(i1 < maxits) {
		e = f(cu);
		dif = verb.core.Vec.sub(e[0],p);
		var c1v = verb.core.Vec.norm(dif);
		var c2n = verb.core.Vec.dot(e[1],dif);
		var c2d = verb.core.Vec.norm(e[1]) * c1v;
		var c2v = c2n / c2d;
		var c1 = c1v < eps1;
		var c2 = Math.abs(c2v) < eps2;
		if(c1 && c2) return cu;
		var ct = n(cu,e,dif);
		if(ct < minu) if(closed) ct = maxu - (ct - minu); else ct = minu; else if(ct > maxu) if(closed) ct = minu + (ct - maxu); else ct = maxu;
		var c3v = verb.core.Vec.norm(verb.core.Vec.mul(ct - cu,e[1]));
		if(c3v < eps1) return cu;
		cu = ct;
		i1++;
	}
	return cu;
};
verb.core.Analyze.rational_curve_param_at_arc_length = function(curve,len,tol,beziers,bezierLengths) {
	if(len < verb.core.Constants.EPSILON) return curve.knots[0];
	var crvs;
	if(beziers != null) crvs = beziers; else crvs = verb.core.Modify.curve_bezier_decompose(curve);
	var i = 0;
	var cc = crvs[i];
	var cl = -verb.core.Constants.EPSILON;
	var bezier_lengths;
	if(bezierLengths != null) bezier_lengths = bezierLengths; else bezier_lengths = [];
	while(cl < len && i < crvs.length) {
		if(i < bezier_lengths.length) bezier_lengths[i] = bezier_lengths[i]; else bezier_lengths[i] = verb.core.Analyze.rational_bezier_curve_arc_length(curve);
		cl += bezier_lengths[i];
		if(len < cl + verb.core.Constants.EPSILON) return verb.core.Analyze.rational_bezier_curve_param_at_arc_length(curve,len,tol,bezier_lengths[i]);
		i++;
	}
	return -1;
};
verb.core.Analyze.rational_bezier_curve_param_at_arc_length = function(curve,len,tol,totalLength) {
	if(len < 0) return curve.knots[0];
	var totalLen;
	if(totalLength != null) totalLen = totalLength; else totalLen = verb.core.Analyze.rational_bezier_curve_arc_length(curve);
	if(len > totalLen) return verb.core.ArrayExtensions.last(curve.knots);
	var start_p = curve.knots[0];
	var start_l = 0.0;
	var end_p = verb.core.ArrayExtensions.last(curve.knots);
	var end_l = totalLen;
	var mid_p = 0.0;
	var mid_l = 0.0;
	var tol1;
	if(tol != null) tol1 = tol; else tol1 = verb.core.Constants.TOLERANCE * 2;
	while(end_l - start_l > tol1) {
		mid_p = (start_p + end_p) / 2;
		mid_l = verb.core.Analyze.rational_bezier_curve_arc_length(curve,mid_p);
		if(mid_l > len) {
			end_p = mid_p;
			end_l = mid_l;
		} else {
			start_p = mid_p;
			start_l = mid_l;
		}
	}
	return (start_p + end_p) / 2;
};
verb.core.Analyze.rational_curve_arc_length = function(curve,u,gaussDegIncrease) {
	if(gaussDegIncrease == null) gaussDegIncrease = 16;
	if(u == null) u = verb.core.ArrayExtensions.last(curve.knots); else u = u;
	var crvs = verb.core.Modify.curve_bezier_decompose(curve);
	var i = 0;
	var cc = crvs[0];
	var sum = 0.0;
	while(i < crvs.length && cc.knots[0] + verb.core.Constants.EPSILON < u) {
		var param = Math.min(verb.core.ArrayExtensions.last(cc.knots),u);
		sum += verb.core.Analyze.rational_bezier_curve_arc_length(cc,param,gaussDegIncrease);
		cc = crvs[++i];
	}
	return sum;
};
verb.core.Analyze.rational_bezier_curve_arc_length = function(curve,u,gaussDegIncrease) {
	if(gaussDegIncrease == null) gaussDegIncrease = 16;
	var u1;
	if(u == null) u1 = verb.core.ArrayExtensions.last(curve.knots); else u1 = u;
	var z = (u1 - curve.knots[0]) / 2;
	var sum = 0.0;
	var gaussDeg = curve.degree + gaussDegIncrease;
	var cu;
	var tan;
	var _g = 0;
	while(_g < gaussDeg) {
		var i = _g++;
		cu = z * verb.core.Analyze.Tvalues[gaussDeg][i] + z + curve.knots[0];
		tan = verb.core.Eval.rational_curve_derivs(curve,cu,1);
		sum += verb.core.Analyze.Cvalues[gaussDeg][i] * verb.core.Vec.norm(tan[1]);
	}
	return z * sum;
};
verb.core.ArrayExtensions = function() { };
verb.core.ArrayExtensions.last = function(a) {
	return a[a.length - 1];
};
verb.core.ArrayExtensions.first = function(a) {
	return a[0];
};
verb.core.ArrayExtensions.spliceAndInsert = function(a,start,end,ele) {
	a.splice(start,end);
	a.splice(start,0,ele);
};
verb.core.ArrayExtensions.left = function(arr) {
	if(arr.length == 0) return [];
	var len = Math.ceil(arr.length / 2);
	return arr.slice(0,len);
};
verb.core.ArrayExtensions.right = function(arr) {
	if(arr.length == 0) return [];
	var len = Math.ceil(arr.length / 2);
	return arr.slice(len);
};
verb.core.ArrayExtensions.rightWithPivot = function(arr) {
	if(arr.length == 0) return [];
	var len = Math.ceil(arr.length / 2);
	return arr.slice(len - 1);
};
verb.core.ArrayExtensions.unique = function(arr,comp) {
	if(arr.length == 0) return [];
	var uniques = [arr.pop()];
	while(arr.length > 0) {
		var ele = arr.pop();
		var isUnique = true;
		var _g = 0;
		while(_g < uniques.length) {
			var unique = uniques[_g];
			++_g;
			if(comp(ele,unique)) {
				isUnique = false;
				break;
			}
		}
		if(isUnique) uniques.push(ele);
	}
	return uniques;
};
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
verb.core.Divide = $hx_exports.core.Divide = function() { };
verb.core.Divide.rational_curve_equally_by_arc_length = function(curve,num) {
	var tlen = verb.core.Analyze.rational_curve_arc_length(curve);
	var inc = tlen / num;
	return verb.core.Divide.rational_curve_by_arc_length(curve,inc);
};
verb.core.Divide.rational_curve_by_arc_length = function(curve,l) {
	var crvs = verb.core.Modify.curve_bezier_decompose(curve);
	var crvlens = crvs.map(function(x) {
		return verb.core.Analyze.rational_bezier_curve_arc_length(x);
	});
	var totlen = verb.core.Vec.sum(crvlens);
	var pts = [new verb.core.types.CurveLengthSample(curve.knots[0],0.0)];
	if(l > totlen) return pts;
	var inc = l;
	var i = 0;
	var lc = inc;
	var runsum = 0.0;
	var runsum1 = 0.0;
	var u;
	while(i < crvs.length) {
		runsum += crvlens[i];
		while(lc < runsum + verb.core.Constants.EPSILON) {
			u = verb.core.Analyze.rational_bezier_curve_param_at_arc_length(crvs[i],lc - runsum1,verb.core.Constants.TOLERANCE,crvlens[i]);
			pts.push(new verb.core.types.CurveLengthSample(u,lc));
			lc += inc;
		}
		runsum1 += crvlens[i];
		i++;
	}
	return pts;
};
verb.core.Eval = $hx_exports.core.Eval = function() { };
verb.core.Eval.volume_point = function(volume,u,v,w) {
	var n = volume.knotsU.length - volume.degreeU - 2;
	var m = volume.knotsV.length - volume.degreeV - 2;
	var l = volume.knotsW.length - volume.degreeW - 2;
	return verb.core.Eval.volume_point_given_n_m_l(volume,n,m,l,u,v,w);
};
verb.core.Eval.volume_point_given_n_m_l = function(volume,n,m,l,u,v,w) {
	var control_points = volume.controlPoints;
	var degree_u = volume.degreeU;
	var degree_v = volume.degreeV;
	var degree_w = volume.degreeW;
	var knots_u = volume.knotsU;
	var knots_v = volume.knotsV;
	var knots_w = volume.knotsW;
	var dim = control_points[0][0][0].length;
	var knot_span_index_u = verb.core.Eval.knot_span_given_n(n,degree_u,u,knots_u);
	var knot_span_index_v = verb.core.Eval.knot_span_given_n(m,degree_v,v,knots_v);
	var knot_span_index_w = verb.core.Eval.knot_span_given_n(l,degree_w,w,knots_w);
	var u_basis_vals = verb.core.Eval.basis_functions_given_knot_span_index(knot_span_index_u,u,degree_u,knots_u);
	var v_basis_vals = verb.core.Eval.basis_functions_given_knot_span_index(knot_span_index_v,v,degree_v,knots_v);
	var w_basis_vals = verb.core.Eval.basis_functions_given_knot_span_index(knot_span_index_w,w,degree_w,knots_w);
	var uind = knot_span_index_u - degree_u;
	var position = verb.core.Vec.zeros1d(dim);
	var temp = verb.core.Vec.zeros1d(dim);
	var temp2 = verb.core.Vec.zeros1d(dim);
	var _g1 = 0;
	var _g = degree_w + 1;
	while(_g1 < _g) {
		var i = _g1++;
		temp2 = verb.core.Vec.zeros1d(dim);
		var wind = knot_span_index_w - degree_w + i;
		var _g3 = 0;
		var _g2 = degree_v + 1;
		while(_g3 < _g2) {
			var j = _g3++;
			temp = verb.core.Vec.zeros1d(dim);
			var vind = knot_span_index_v - degree_v + j;
			var _g5 = 0;
			var _g4 = degree_u + 1;
			while(_g5 < _g4) {
				var k = _g5++;
				temp = verb.core.Vec.add(temp,verb.core.Vec.mul(u_basis_vals[k],control_points[uind + k][vind][wind]));
			}
			temp2 = verb.core.Vec.add(temp2,verb.core.Vec.mul(v_basis_vals[j],temp));
		}
		position = verb.core.Vec.add(position,verb.core.Vec.mul(w_basis_vals[i],temp2));
	}
	return position;
};
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
verb.core.Ray = $hx_exports.core.Ray = function(origin,dir) {
	this.origin = origin;
	this.dir = dir;
};
verb.core.Interval = $hx_exports.core.Interval = function(min,max) {
	this.min = min;
	this.max = max;
};
verb.core.CurveTriPoint = $hx_exports.core.CurveTriPoint = function(u,point,uv) {
	this.u = u;
	this.point = point;
	this.uv = uv;
};
verb.core.MeshIntersectionPoint = $hx_exports.core.MeshIntersectionPoint = function(uv0,uv1,point,faceIndex0,faceIndex1) {
	this.visited = false;
	this.adj = null;
	this.opp = null;
	this.uv0 = uv0;
	this.uv1 = uv1;
	this.point = point;
	this.faceIndex0;
	this.faceIndex1;
};
verb.core.TriSegmentIntersection = $hx_exports.core.TriSegmentIntersection = function(point,s,t,r) {
	this.point = point;
	this.s = s;
	this.t = t;
	this.p = r;
};
verb.core.CurveCurveIntersection = $hx_exports.core.CurveCurveIntersection = function(point0,point1,u0,u1) {
	this.point0 = point0;
	this.point1 = point1;
	this.u0 = u0;
	this.u1 = u1;
};
verb.core.CurveCurveIntersectionOptions = $hx_exports.core.CurveCurveIntersectionOptions = function() {
	this.tol = verb.core.Constants.TOLERANCE;
	this.sampleTol = verb.core.Constants.TOLERANCE;
};
verb.core.IBoundingBoxTree = function() { };
verb.core.LazyMeshBoundingBoxTree = function(mesh,faceIndices) {
	this._boundingBox = null;
	this._mesh = mesh;
	if(faceIndices == null) {
		var _g = [];
		var _g2 = 0;
		var _g1 = mesh.faces.length;
		while(_g2 < _g1) {
			var i = _g2++;
			_g.push(i);
		}
		faceIndices = _g;
	}
	this._faceIndices = faceIndices;
};
verb.core.LazyMeshBoundingBoxTree.__interfaces__ = [verb.core.IBoundingBoxTree];
verb.core.LazyMeshBoundingBoxTree.prototype = {
	split: function() {
		var $as = verb.core.Mesh.sort_tris_on_longest_axis(this._boundingBox,this._mesh,this._faceIndices);
		var l = verb.core.ArrayExtensions.left($as);
		var r = verb.core.ArrayExtensions.right($as);
		return new verb.core.types.Pair(new verb.core.LazyMeshBoundingBoxTree(this._mesh,l),new verb.core.LazyMeshBoundingBoxTree(this._mesh,r));
	}
	,boundingBox: function() {
		if(this._boundingBox == null) this._boundingBox = verb.core.Mesh.make_mesh_aabb(this._mesh,this._faceIndices);
		return this._boundingBox;
	}
	,'yield': function() {
		return this._faceIndices[0];
	}
	,indivisible: function(tolerance) {
		return this._faceIndices.length == 1;
	}
	,empty: function() {
		return this._faceIndices.length == 0;
	}
};
verb.core.PolylineData = $hx_exports.core.PolylineData = function(points,params) {
	this.points = points;
	this.params = params;
};
verb.core.LazyPolylineBoundingBoxTree = function(polyline,interval) {
	this._boundingBox = null;
	this._polyline = polyline;
	if(interval == null) interval = new verb.core.Interval(0,polyline.points.length != 0?polyline.points.length - 1:0);
	this._interval = interval;
};
verb.core.LazyPolylineBoundingBoxTree.__interfaces__ = [verb.core.IBoundingBoxTree];
verb.core.LazyPolylineBoundingBoxTree.prototype = {
	split: function() {
		var min = this._interval.min;
		var max = this._interval.max;
		var pivot = min + Math.ceil((max - min) / 2);
		var l = new verb.core.Interval(min,pivot);
		var r = new verb.core.Interval(pivot,max);
		return new verb.core.types.Pair(new verb.core.LazyPolylineBoundingBoxTree(this._polyline,l),new verb.core.LazyPolylineBoundingBoxTree(this._polyline,r));
	}
	,boundingBox: function() {
		if(this._boundingBox == null) this._boundingBox = new verb.BoundingBox(this._polyline.points);
		return this._boundingBox;
	}
	,'yield': function() {
		return this._interval.min;
	}
	,indivisible: function(tolerance) {
		return this._interval.max - this._interval.min == 1;
	}
	,empty: function() {
		return this._interval.max - this._interval.min == 0;
	}
};
verb.core.LazyCurveBoundingBoxTree = function(curve,knotTol) {
	this._boundingBox = null;
	this._curve = curve;
	if(knotTol == null) knotTol = verb.core.ArrayExtensions.last(this._curve.knots) - this._curve.knots[0] / 1000;
	this._knotTol = knotTol;
};
verb.core.LazyCurveBoundingBoxTree.__interfaces__ = [verb.core.IBoundingBoxTree];
verb.core.LazyCurveBoundingBoxTree.prototype = {
	split: function() {
		var min = this._curve.knots[0];
		var max = verb.core.ArrayExtensions.last(this._curve.knots);
		var dom = max - min;
		var crvs = verb.core.Modify.curve_split(this._curve,(max + min) / 2.0 + dom * 0.01 * Math.random());
		return new verb.core.types.Pair(new verb.core.LazyCurveBoundingBoxTree(crvs[0],this._knotTol),new verb.core.LazyCurveBoundingBoxTree(crvs[1],this._knotTol));
	}
	,boundingBox: function() {
		if(this._boundingBox == null) this._boundingBox = new verb.BoundingBox(verb.core.Eval.dehomogenize_1d(this._curve.controlPoints));
		return this._boundingBox;
	}
	,'yield': function() {
		return this._curve;
	}
	,indivisible: function(tolerance) {
		return verb.core.ArrayExtensions.last(this._curve.knots) - this._curve.knots[0] < this._knotTol;
	}
	,empty: function() {
		return false;
	}
};
verb.core.LazySurfaceBoundingBoxTree = function(surface,splitV,knotTolU,knotTolV) {
	if(splitV == null) splitV = false;
	this._boundingBox = null;
	this._surface = surface;
	this._splitV = splitV;
	if(knotTolU == null) knotTolU = (verb.core.ArrayExtensions.last(surface.knotsU) - surface.knotsU[0]) / 1000;
	if(knotTolV == null) knotTolV = (verb.core.ArrayExtensions.last(surface.knotsV) - surface.knotsV[0]) / 1000;
	this._knotTolU = knotTolU;
	this._knotTolV = knotTolV;
};
verb.core.LazySurfaceBoundingBoxTree.__interfaces__ = [verb.core.IBoundingBoxTree];
verb.core.LazySurfaceBoundingBoxTree.prototype = {
	split: function() {
		var min;
		var max;
		if(this._splitV) {
			min = this._surface.knotsV[0];
			max = verb.core.ArrayExtensions.last(this._surface.knotsV);
		} else {
			min = this._surface.knotsU[0];
			max = verb.core.ArrayExtensions.last(this._surface.knotsU);
		}
		var dom = max - min;
		var pivot = (min + max) / 2.0 + dom * 0.01 * Math.random();
		var srfs = verb.core.Modify.surface_split(this._surface,pivot,this._splitV);
		return new verb.core.types.Pair(new verb.core.LazySurfaceBoundingBoxTree(srfs[0],!this._splitV,this._knotTolU,this._knotTolV),new verb.core.LazySurfaceBoundingBoxTree(srfs[1],!this._splitV,this._knotTolU,this._knotTolV));
	}
	,boundingBox: function() {
		if(this._boundingBox == null) {
			this._boundingBox = new verb.BoundingBox();
			var _g = 0;
			var _g1 = this._surface.controlPoints;
			while(_g < _g1.length) {
				var row = _g1[_g];
				++_g;
				this._boundingBox.addRange(verb.core.Eval.dehomogenize_1d(row));
			}
		}
		return this._boundingBox;
	}
	,'yield': function() {
		return this._surface;
	}
	,indivisible: function(tolerance) {
		if(this._splitV) return verb.core.ArrayExtensions.last(this._surface.knotsV) - this._surface.knotsV[0] < this._knotTolV; else return verb.core.ArrayExtensions.last(this._surface.knotsU) - this._surface.knotsU[0] < this._knotTolU;
	}
	,empty: function() {
		return false;
	}
};
verb.core.PolylineMeshIntersection = $hx_exports.core.PolylineMeshIntersection = function(point,u,uv,polylineIndex,faceIndex) {
	this.point = point;
	this.u = u;
	this.uv = uv;
	this.polylineIndex = polylineIndex;
	this.faceIndex = faceIndex;
};
verb.core.CurveSurfaceIntersection = $hx_exports.core.CurveSurfaceIntersection = function(u,uv) {
	this.u = u;
	this.uv = uv;
};
verb.core.SurfaceSurfaceIntersectionPoint = $hx_exports.core.SurfaceSurfaceIntersectionPoint = function(uv0,uv1,point,dist) {
	this.uv0 = uv0;
	this.uv1 = uv1;
	this.point = point;
	this.dist = dist;
};
verb.core.Intersect = $hx_exports.core.Intersect = function() { };
verb.core.Intersect.surfaces = function(surface0,surface1,tol) {
	var tess1 = verb.core.Tess.rational_surface_adaptive(surface0);
	var tess2 = verb.core.Tess.rational_surface_adaptive(surface1);
	var resApprox = verb.core.Intersect.meshes(tess1,tess2);
	var exactPls = resApprox.map(function(pl) {
		return pl.map(function(inter) {
			return verb.core.Intersect.surfaces_at_point_with_estimate(surface0,surface1,inter.uv0,inter.uv1,tol);
		});
	});
	return exactPls.map(function(x) {
		return verb.core.Make.rational_interp_curve(x.map(function(x1) {
			return x1.point;
		}),3);
	});
};
verb.core.Intersect.surfaces_at_point_with_estimate = function(surface0,surface1,uv1,uv2,tol) {
	var pds;
	var p;
	var pn;
	var pu;
	var pv;
	var pd;
	var qds;
	var q;
	var qn;
	var qu;
	var qv;
	var qd;
	var dist;
	var maxits = 10;
	var its = 0;
	do {
		pds = verb.core.Eval.rational_surface_derivs(surface0,1,uv1[0],uv1[1]);
		p = pds[0][0];
		pu = pds[1][0];
		pv = pds[0][1];
		pn = verb.core.Vec.normalized(verb.core.Vec.cross(pu,pv));
		pd = verb.core.Vec.dot(pn,p);
		qds = verb.core.Eval.rational_surface_derivs(surface0,1,uv2[0],uv2[1]);
		q = qds[0][0];
		qu = qds[1][0];
		qv = qds[0][1];
		qn = verb.core.Vec.normalized(verb.core.Vec.cross(qu,qv));
		qd = verb.core.Vec.dot(qn,q);
		dist = verb.core.Vec.norm(verb.core.Vec.sub(p,q));
		if(dist < tol) break;
		var fn = verb.core.Vec.normalized(verb.core.Vec.cross(pn,qn));
		var fd = verb.core.Vec.dot(fn,p);
		var x = verb.core.Intersect.three_planes(pn,pd,qn,qd,fn,fd);
		if(x == null) throw "panic!";
		var pdif = verb.core.Vec.sub(x,p);
		var qdif = verb.core.Vec.sub(x,q);
		var rw = verb.core.Vec.cross(pu,pn);
		var rt = verb.core.Vec.cross(pv,pn);
		var su = verb.core.Vec.cross(qu,qn);
		var sv = verb.core.Vec.cross(qv,qn);
		var dw = verb.core.Vec.dot(rt,pdif) / verb.core.Vec.dot(rt,pu);
		var dt = verb.core.Vec.dot(rw,pdif) / verb.core.Vec.dot(rw,pv);
		var du = verb.core.Vec.dot(sv,qdif) / verb.core.Vec.dot(sv,qu);
		var dv = verb.core.Vec.dot(su,qdif) / verb.core.Vec.dot(su,qv);
		uv1 = verb.core.Vec.add([dw,dt],uv1);
		uv2 = verb.core.Vec.add([du,dv],uv2);
		its++;
	} while(its < maxits);
	return new verb.core.SurfaceSurfaceIntersectionPoint(uv1,uv2,p,dist);
};
verb.core.Intersect.meshes = function(mesh0,mesh1) {
	var bbints = verb.core.Intersect.bounding_box_trees(new verb.core.LazyMeshBoundingBoxTree(mesh0),new verb.core.LazyMeshBoundingBoxTree(mesh1),0);
	var segments = verb.core.ArrayExtensions.unique(bbints.map(function(ids) {
		return verb.core.Intersect.triangles(mesh0,ids.item0,mesh1,ids.item1);
	}).filter(function(x) {
		return x != null;
	}).filter(function(x1) {
		return verb.core.Vec.distSquared(x1.min.point,x1.max.point) > verb.core.Constants.EPSILON;
	}),function(a,b) {
		var s1 = verb.core.Vec.sub(a.min.uv0,b.min.uv0);
		var d1 = verb.core.Vec.dot(s1,s1);
		var s2 = verb.core.Vec.sub(a.max.uv0,b.max.uv0);
		var d2 = verb.core.Vec.dot(s2,s2);
		var s3 = verb.core.Vec.sub(a.min.uv0,b.max.uv0);
		var d3 = verb.core.Vec.dot(s3,s3);
		var s4 = verb.core.Vec.sub(a.max.uv0,b.min.uv0);
		var d4 = verb.core.Vec.dot(s4,s4);
		return d1 < verb.core.Constants.EPSILON && d2 < verb.core.Constants.EPSILON || d3 < verb.core.Constants.EPSILON && d4 < verb.core.Constants.EPSILON;
	});
	if(segments.length == 0) return [];
	return verb.core.Intersect.make_mesh_intersection_polylines(segments);
};
verb.core.Intersect.make_mesh_intersection_polylines = function(segments) {
	var _g = 0;
	while(_g < segments.length) {
		var s = segments[_g];
		++_g;
		s.max.opp = s.min;
		s.min.opp = s.max;
	}
	var tree = verb.core.Intersect.kdtree_from_segs(segments);
	var ends = [];
	var _g1 = 0;
	while(_g1 < segments.length) {
		var seg = segments[_g1];
		++_g1;
		ends.push(seg.min);
		ends.push(seg.max);
	}
	var _g2 = 0;
	while(_g2 < ends.length) {
		var segEnd = ends[_g2];
		++_g2;
		if(segEnd.adj != null) continue;
		var adjEnd = verb.core.Intersect.lookup_adj_segment(segEnd,tree,segments.length);
		if(adjEnd != null && adjEnd.adj == null) {
			segEnd.adj = adjEnd;
			adjEnd.adj = segEnd;
		}
	}
	var freeEnds = ends.filter(function(x) {
		return x.adj == null;
	});
	if(freeEnds.length == 0) freeEnds = ends;
	var pls = [];
	var _g3 = 0;
	while(_g3 < freeEnds.length) {
		var end = freeEnds[_g3];
		++_g3;
		if(end.visited) continue;
		var pl = [];
		var curEnd = end;
		while(curEnd != null) {
			if(curEnd.visited) throw "Segment end encountered twice!";
			curEnd.visited = true;
			curEnd.opp.visited = true;
			pl.push(curEnd);
			curEnd = curEnd.opp.adj;
			if(curEnd == end) break;
		}
		if(pl.length > 0) {
			pl.push(pl[pl.length - 1].opp);
			pls.push(pl);
		}
	}
	return pls;
};
verb.core.Intersect.kdtree_from_segs = function(segments) {
	var treePoints = [];
	var _g = 0;
	while(_g < segments.length) {
		var seg = segments[_g];
		++_g;
		treePoints.push(new verb.core.KdPoint(seg.min.point,seg.min));
		treePoints.push(new verb.core.KdPoint(seg.max.point,seg.max));
	}
	return new verb.core.KdTree(treePoints,verb.core.Vec.distSquared);
};
verb.core.Intersect.lookup_adj_segment = function(segEnd,tree,numSegments) {
	var numResults;
	if(numSegments != null) {
		if(numSegments < 3) numResults = 3; else numResults = numSegments;
	} else numResults = 3;
	var adj = tree.nearest(segEnd.point,numResults,verb.core.Constants.EPSILON).filter(function(r) {
		return segEnd != r.item0.obj;
	}).map(function(r1) {
		return r1.item0.obj;
	});
	if(adj.length == 1) return adj[0]; else return null;
};
verb.core.Intersect.curve_and_surface = function(curve,surface,tol) {
	if(tol == null) tol = 1e-3;
	var ints = verb.core.Intersect.bounding_box_trees(new verb.core.LazyCurveBoundingBoxTree(curve),new verb.core.LazySurfaceBoundingBoxTree(surface),0);
	return ints.map(function(inter) {
		var crvSeg = inter.item0;
		var srfPart = inter.item1;
		var min = crvSeg.knots[0];
		var max = verb.core.ArrayExtensions.last(crvSeg.knots);
		var u = (min + max) / 2.0;
		var minu = srfPart.knotsU[0];
		var maxu = verb.core.ArrayExtensions.last(srfPart.knotsU);
		var minv = srfPart.knotsV[0];
		var maxv = verb.core.ArrayExtensions.last(srfPart.knotsV);
		var uv = [(minu + maxu) / 2.0,(minv + maxv) / 2.0];
		return verb.core.Intersect.curve_and_surface_with_estimate(crvSeg,srfPart,[u].concat(uv),tol);
	});
};
verb.core.Intersect.curve_and_surface_with_estimate = function(curve,surface,start_params,tol) {
	if(tol == null) tol = 1e-3;
	var objective = function(x) {
		var p1 = verb.core.Eval.rational_curve_point(curve,x[0]);
		var p2 = verb.core.Eval.rational_surface_point(surface,x[1],x[2]);
		var p1_p2 = verb.core.Vec.sub(p1,p2);
		return verb.core.Vec.dot(p1_p2,p1_p2);
	};
	var sol_obj = verb.core.Numeric.uncmin(objective,start_params,tol);
	var $final = sol_obj.solution;
	return new verb.core.CurveSurfaceIntersection($final[0],[$final[1],$final[2]]);
};
verb.core.Intersect.polyline_and_mesh = function(polyline,mesh,tol) {
	var res = verb.core.Intersect.bounding_box_trees(new verb.core.LazyPolylineBoundingBoxTree(polyline),new verb.core.LazyMeshBoundingBoxTree(mesh),tol);
	var finalResults = [];
	var _g = 0;
	while(_g < res.length) {
		var event = res[_g];
		++_g;
		var polid = event.item0;
		var faceid = event.item1;
		var inter = verb.core.Intersect.segment_with_tri(polyline.points[polid],polyline.points[polid + 1],mesh.points,mesh.faces[faceid]);
		if(inter == null) continue;
		var pt = inter.point;
		var u = verb.core.Vec.lerp(inter.p,[polyline.params[polid]],[polyline.params[polid + 1]])[0];
		var uv = verb.core.Mesh.tri_uv_from_point(mesh,faceid,pt);
		finalResults.push(new verb.core.PolylineMeshIntersection(pt,u,uv,polid,faceid));
	}
	return finalResults;
};
verb.core.Intersect.mesh_bounding_boxes = function(a,b,tol) {
	return verb.core.Intersect.bounding_box_trees(new verb.core.LazyMeshBoundingBoxTree(a),new verb.core.LazyMeshBoundingBoxTree(b),tol);
};
verb.core.Intersect.bounding_box_trees = function(a,b,tol) {
	if(tol == null) tol = 1e-9;
	if(a.empty() || b.empty()) return [];
	if(!a.boundingBox().intersects(b.boundingBox(),tol)) return [];
	if(a.indivisible(tol) && b.indivisible(tol)) return [new verb.core.types.Pair(a["yield"](),b["yield"]())];
	var asplit = a.split();
	var bsplit = b.split();
	return verb.core.Intersect.bounding_box_trees(asplit.item0,bsplit.item0,tol).concat(verb.core.Intersect.bounding_box_trees(asplit.item0,bsplit.item1,tol)).concat(verb.core.Intersect.bounding_box_trees(asplit.item1,bsplit.item0,tol)).concat(verb.core.Intersect.bounding_box_trees(asplit.item1,bsplit.item1,tol));
};
verb.core.Intersect.curves = function(curve1,curve2,tolerance) {
	var ints = verb.core.Intersect.bounding_box_trees(new verb.core.LazyCurveBoundingBoxTree(curve1),new verb.core.LazyCurveBoundingBoxTree(curve2),0);
	return ints.map(function(x) {
		return verb.core.Intersect.curves_with_estimate(curve1,curve2,x.item0.knots[0],x.item1.knots[0],tolerance);
	});
};
verb.core.Intersect.curves_with_estimate = function(curve0,curve1,u0,u1,tolerance) {
	var objective = function(x) {
		var p1 = verb.core.Eval.rational_curve_point(curve0,x[0]);
		var p2 = verb.core.Eval.rational_curve_point(curve1,x[1]);
		var p1_p2 = verb.core.Vec.sub(p1,p2);
		return verb.core.Vec.dot(p1_p2,p1_p2);
	};
	var sol_obj = verb.core.Numeric.uncmin(objective,[u0,u1],tolerance);
	var u11 = sol_obj.solution[0];
	var u2 = sol_obj.solution[1];
	var p11 = verb.core.Eval.rational_curve_point(curve0,u11);
	var p21 = verb.core.Eval.rational_curve_point(curve1,u2);
	return new verb.core.CurveCurveIntersection(p11,p21,u11,u2);
};
verb.core.Intersect.triangles = function(mesh0,faceIndex0,mesh1,faceIndex1) {
	var tri0 = mesh0.faces[faceIndex0];
	var tri1 = mesh1.faces[faceIndex1];
	var n0 = verb.core.Mesh.get_tri_norm(mesh0.points,tri0);
	var n1 = verb.core.Mesh.get_tri_norm(mesh1.points,tri1);
	var o0 = mesh0.points[tri0[0]];
	var o1 = mesh1.points[tri1[0]];
	var ray = verb.core.Intersect.planes(o0,n0,o1,n1);
	if(ray == null) return null;
	var clip1 = verb.core.Intersect.clip_ray_in_coplanar_tri(ray,mesh0,faceIndex0);
	if(clip1 == null) return null;
	var clip2 = verb.core.Intersect.clip_ray_in_coplanar_tri(ray,mesh1,faceIndex1);
	if(clip2 == null) return null;
	var merged = verb.core.Intersect.merge_tri_clip_intervals(clip1,clip2,mesh0,faceIndex0,mesh1,faceIndex1);
	if(merged == null) return null;
	return new verb.core.Interval(new verb.core.MeshIntersectionPoint(merged.min.uv0,merged.min.uv1,merged.min.point,faceIndex0,faceIndex1),new verb.core.MeshIntersectionPoint(merged.max.uv0,merged.max.uv1,merged.max.point,faceIndex0,faceIndex1));
};
verb.core.Intersect.clip_ray_in_coplanar_tri = function(ray,mesh,faceIndex) {
	var tri = mesh.faces[faceIndex];
	var o = [mesh.points[tri[0]],mesh.points[tri[1]],mesh.points[tri[2]]];
	var uvs = [mesh.uvs[tri[0]],mesh.uvs[tri[1]],mesh.uvs[tri[2]]];
	var uvd = [verb.core.Vec.sub(uvs[1],uvs[0]),verb.core.Vec.sub(uvs[2],uvs[1]),verb.core.Vec.sub(uvs[0],uvs[2])];
	var s = [verb.core.Vec.sub(o[1],o[0]),verb.core.Vec.sub(o[2],o[1]),verb.core.Vec.sub(o[0],o[2])];
	var d = s.map(verb.core.Vec.normalized);
	var l = s.map(verb.core.Vec.norm);
	var minU = null;
	var maxU = null;
	var _g = 0;
	while(_g < 3) {
		var i = _g++;
		var o0 = o[i];
		var d0 = d[i];
		var res = verb.core.Intersect.rays(o0,d0,ray.origin,ray.dir);
		if(res == null) continue;
		var useg = res.u0;
		var uray = res.u1;
		if(useg < -verb.core.Constants.EPSILON || useg > l[i] + verb.core.Constants.EPSILON) continue;
		if(minU == null || uray < minU.u) minU = new verb.core.CurveTriPoint(uray,verb.core.Vec.onRay(ray.origin,ray.dir,uray),verb.core.Vec.onRay(uvs[i],uvd[i],useg / l[i]));
		if(maxU == null || uray > maxU.u) maxU = new verb.core.CurveTriPoint(uray,verb.core.Vec.onRay(ray.origin,ray.dir,uray),verb.core.Vec.onRay(uvs[i],uvd[i],useg / l[i]));
	}
	if(maxU == null || minU == null) return null;
	return new verb.core.Interval(minU,maxU);
};
verb.core.Intersect.merge_tri_clip_intervals = function(clip1,clip2,mesh1,faceIndex1,mesh2,faceIndex2) {
	if(clip2.min.u > clip1.max.u + verb.core.Constants.EPSILON || clip1.min.u > clip2.max.u + verb.core.Constants.EPSILON) return null;
	var min;
	if(clip1.min.u > clip2.min.u) min = new verb.core.types.Pair(clip1.min,0); else min = new verb.core.types.Pair(clip2.min,1);
	var max;
	if(clip1.max.u < clip2.max.u) max = new verb.core.types.Pair(clip1.max,0); else max = new verb.core.types.Pair(clip2.max,1);
	var res = new verb.core.Interval(new verb.core.MeshIntersectionPoint(null,null,min.item0.point,faceIndex1,faceIndex2),new verb.core.MeshIntersectionPoint(null,null,max.item0.point,faceIndex1,faceIndex2));
	if(min.item1 == 0) {
		res.min.uv0 = min.item0.uv;
		res.min.uv1 = verb.core.Mesh.tri_uv_from_point(mesh2,faceIndex2,min.item0.point);
	} else {
		res.min.uv0 = verb.core.Mesh.tri_uv_from_point(mesh1,faceIndex1,min.item0.point);
		res.min.uv1 = min.item0.uv;
	}
	if(max.item1 == 0) {
		res.max.uv0 = max.item0.uv;
		res.max.uv1 = verb.core.Mesh.tri_uv_from_point(mesh2,faceIndex2,max.item0.point);
	} else {
		res.max.uv0 = verb.core.Mesh.tri_uv_from_point(mesh1,faceIndex1,max.item0.point);
		res.max.uv1 = max.item0.uv;
	}
	return res;
};
verb.core.Intersect.planes = function(origin0,normal0,origin1,normal1) {
	var d = verb.core.Vec.cross(normal0,normal1);
	if(verb.core.Vec.dot(d,d) < verb.core.Constants.EPSILON) return null;
	var li = 0;
	var mi = Math.abs(d[0]);
	var m1 = Math.abs(d[1]);
	var m2 = Math.abs(d[2]);
	if(m1 > mi) {
		li = 1;
		mi = m1;
	}
	if(m2 > mi) {
		li = 2;
		mi = m2;
	}
	var a1;
	var b1;
	var a2;
	var b2;
	if(li == 0) {
		a1 = normal0[1];
		b1 = normal0[2];
		a2 = normal1[1];
		b2 = normal1[2];
	} else if(li == 1) {
		a1 = normal0[0];
		b1 = normal0[2];
		a2 = normal1[0];
		b2 = normal1[2];
	} else {
		a1 = normal0[0];
		b1 = normal0[1];
		a2 = normal1[0];
		b2 = normal1[1];
	}
	var d1 = -verb.core.Vec.dot(origin0,normal0);
	var d2 = -verb.core.Vec.dot(origin1,normal1);
	var den = a1 * b2 - b1 * a2;
	var x = (b1 * d2 - d1 * b2) / den;
	var y = (d1 * a2 - a1 * d2) / den;
	var p;
	if(li == 0) p = [0,x,y]; else if(li == 1) p = [x,0,y]; else p = [x,y,0];
	return new verb.core.Ray(p,verb.core.Vec.normalized(d));
};
verb.core.Intersect.three_planes = function(n0,d0,n1,d1,n2,d2) {
	var u = verb.core.Vec.cross(n1,n2);
	var den = verb.core.Vec.dot(n0,u);
	if(Math.abs(den) < verb.core.Constants.EPSILON) return null;
	var diff = verb.core.Vec.sub(verb.core.Vec.mul(d2,n1),verb.core.Vec.mul(d1,n2));
	var num = verb.core.Vec.add(verb.core.Vec.mul(d0,u),verb.core.Vec.cross(n0,diff));
	return verb.core.Vec.mul(1 / den,num);
};
verb.core.Intersect.polylines = function(polyline0,polyline1,tol) {
	var res = verb.core.Intersect.bounding_box_trees(new verb.core.LazyPolylineBoundingBoxTree(polyline0),new verb.core.LazyPolylineBoundingBoxTree(polyline1),tol);
	var finalResults = [];
	var _g = 0;
	while(_g < res.length) {
		var event = res[_g];
		++_g;
		var polid0 = event.item0;
		var polid1 = event.item1;
		var inter = verb.core.Intersect.segments(polyline0.points[polid0],polyline0.points[polid0 + 1],polyline1.points[polid1],polyline1.points[polid1 + 1],tol);
		if(inter == null) continue;
		inter.u0 = verb.core.Vec.lerp(inter.u0,[polyline0.params[polid0]],[polyline0.params[polid0 + 1]])[0];
		inter.u1 = verb.core.Vec.lerp(inter.u1,[polyline1.params[polid1]],[polyline1.params[polid1 + 1]])[0];
		finalResults.push(inter);
	}
	return finalResults;
};
verb.core.Intersect.segments = function(a0,a1,b0,b1,tol) {
	var a1ma0 = verb.core.Vec.sub(a1,a0);
	var aN = Math.sqrt(verb.core.Vec.dot(a1ma0,a1ma0));
	var a = verb.core.Vec.mul(1 / aN,a1ma0);
	var b1mb0 = verb.core.Vec.sub(b1,b0);
	var bN = Math.sqrt(verb.core.Vec.dot(b1mb0,b1mb0));
	var b = verb.core.Vec.mul(1 / bN,b1mb0);
	var int_params = verb.core.Intersect.rays(a0,a,b0,b);
	if(int_params != null) {
		var u0 = Math.min(Math.max(0,int_params.u0 / aN),1.0);
		var u1 = Math.min(Math.max(0,int_params.u1 / bN),1.0);
		var point0 = verb.core.Vec.onRay(a0,a1ma0,u0);
		var point1 = verb.core.Vec.onRay(b0,b1mb0,u1);
		var dist = verb.core.Vec.distSquared(point0,point1);
		if(dist < tol * tol) return new verb.core.CurveCurveIntersection(point0,point1,u0,u1);
	}
	return null;
};
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
	var p0 = verb.core.Vec.onRay(a0,a,t);
	var p1 = verb.core.Vec.onRay(b0,b,w);
	return new verb.core.CurveCurveIntersection(p0,p1,t,w);
};
verb.core.Intersect.segment_with_tri = function(p0,p1,points,tri) {
	var v0 = points[tri[0]];
	var v1 = points[tri[1]];
	var v2 = points[tri[2]];
	var u = verb.core.Vec.sub(v1,v0);
	var v = verb.core.Vec.sub(v2,v0);
	var n = verb.core.Vec.cross(u,v);
	var dir = verb.core.Vec.sub(p1,p0);
	var w0 = verb.core.Vec.sub(p0,v0);
	var a = -verb.core.Vec.dot(n,w0);
	var b = verb.core.Vec.dot(n,dir);
	if(Math.abs(b) < verb.core.Constants.EPSILON) return null;
	var r = a / b;
	if(r < 0 || r > 1) return null;
	var pt = verb.core.Vec.add(p0,verb.core.Vec.mul(r,dir));
	var uv = verb.core.Vec.dot(u,v);
	var uu = verb.core.Vec.dot(u,u);
	var vv = verb.core.Vec.dot(v,v);
	var w = verb.core.Vec.sub(pt,v0);
	var wu = verb.core.Vec.dot(w,u);
	var wv = verb.core.Vec.dot(w,v);
	var denom = uv * uv - uu * vv;
	if(Math.abs(denom) < verb.core.Constants.EPSILON) return null;
	var s = (uv * wv - vv * wu) / denom;
	var t = (uv * wu - uu * wv) / denom;
	if(s > 1.0 + verb.core.Constants.EPSILON || t > 1.0 + verb.core.Constants.EPSILON || t < -verb.core.Constants.EPSILON || s < -verb.core.Constants.EPSILON || s + t > 1.0 + verb.core.Constants.EPSILON) return null;
	return new verb.core.TriSegmentIntersection(pt,s,t,r);
};
verb.core.Intersect.segment_with_plane = function(p0,p1,v0,n) {
	var denom = verb.core.Vec.dot(n,verb.core.Vec.sub(p0,p1));
	if(Math.abs(denom) < verb.core.Constants.EPSILON) return null;
	var numer = verb.core.Vec.dot(n,verb.core.Vec.sub(v0,p0));
	return { p : numer / denom};
};
verb.core.KdPoint = $hx_exports.core.KdPoint = function(point,obj) {
	this.point = point;
	this.obj = obj;
};
verb.core.KdNode = $hx_exports.core.KdNode = function(kdPoint,dimension,parent) {
	this.kdPoint = kdPoint;
	this.left = null;
	this.right = null;
	this.parent = parent;
	this.dimension = dimension;
};
verb.core.KdTree = $hx_exports.core.KdTree = function(points,distanceFunction) {
	this.dim = 3;
	this.points = points;
	this.distanceFunction = distanceFunction;
	this.dim = points[0].point.length;
	this.root = this.buildTree(points,0,null);
};
verb.core.KdTree.prototype = {
	buildTree: function(points,depth,parent) {
		var dim = depth % this.dim;
		var median;
		var node;
		if(points.length == 0) return null;
		if(points.length == 1) return new verb.core.KdNode(points[0],dim,parent);
		points.sort(function(a,b) {
			var diff = a.point[dim] - b.point[dim];
			if(diff == 0.0) return 0; else if(diff > 0) return 1; else return -1;
		});
		median = Math.floor(points.length / 2);
		node = new verb.core.KdNode(points[median],dim,parent);
		node.left = this.buildTree(points.slice(0,median),depth + 1,node);
		node.right = this.buildTree(points.slice(median + 1),depth + 1,node);
		return node;
	}
	,nearest: function(point,maxNodes,maxDistance) {
		var _g = this;
		var bestNodes = new verb.core.BinaryHeap(function(e) {
			return -e.item1;
		});
		var nearestSearch;
		var nearestSearch1 = null;
		nearestSearch1 = function(node) {
			var bestChild;
			var dimension = node.dimension;
			var ownDistance = _g.distanceFunction(point,node.kdPoint.point);
			var linearPoint;
			var _g1 = [];
			var _g3 = 0;
			var _g2 = _g.dim;
			while(_g3 < _g2) {
				var i = _g3++;
				_g1.push(0.0);
			}
			linearPoint = _g1;
			var linearDistance;
			var otherChild;
			var i1;
			var saveNode = function(node1,distance) {
				bestNodes.push(new verb.core.types.Pair(node1,distance));
				if(bestNodes.size() > maxNodes) bestNodes.pop();
			};
			var _g31 = 0;
			var _g21 = _g.dim;
			while(_g31 < _g21) {
				var i2 = _g31++;
				if(i2 == node.dimension) linearPoint[i2] = point[i2]; else linearPoint[i2] = node.kdPoint.point[i2];
			}
			linearDistance = _g.distanceFunction(linearPoint,node.kdPoint.point);
			if(node.right == null && node.left == null) {
				if(bestNodes.size() < maxNodes || ownDistance < bestNodes.peek().item1) saveNode(node,ownDistance);
				return;
			}
			if(node.right == null) bestChild = node.left; else if(node.left == null) bestChild = node.right; else if(point[dimension] < node.kdPoint.point[dimension]) bestChild = node.left; else bestChild = node.right;
			nearestSearch1(bestChild);
			if(bestNodes.size() < maxNodes || ownDistance < bestNodes.peek().item1) saveNode(node,ownDistance);
			if(bestNodes.size() < maxNodes || Math.abs(linearDistance) < bestNodes.peek().item1) {
				if(bestChild == node.left) otherChild = node.right; else otherChild = node.left;
				if(otherChild != null) nearestSearch1(otherChild);
			}
		};
		nearestSearch = nearestSearch1;
		if(maxDistance != null) {
			var _g4 = 0;
			while(_g4 < maxNodes) {
				var i3 = _g4++;
				bestNodes.push(new verb.core.types.Pair(null,maxDistance));
			}
		}
		nearestSearch(this.root);
		var result = [];
		var _g5 = 0;
		while(_g5 < maxNodes) {
			var i4 = _g5++;
			if(bestNodes.content[i4].item0 != null) result.push(new verb.core.types.Pair(bestNodes.content[i4].item0.kdPoint,bestNodes.content[i4].item1));
		}
		return result;
	}
};
verb.core.BinaryHeap = function(scoreFunction) {
	this.content = [];
	this.scoreFunction = scoreFunction;
};
verb.core.BinaryHeap.prototype = {
	push: function(element) {
		this.content.push(element);
		this.bubbleUp(this.content.length - 1);
	}
	,pop: function() {
		var result = this.content[0];
		var end = this.content.pop();
		if(this.content.length > 0) {
			this.content[0] = end;
			this.sinkDown(0);
		}
		return result;
	}
	,peek: function() {
		return this.content[0];
	}
	,remove: function(node) {
		var len = this.content.length;
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			if(this.content[i] == node) {
				var end = this.content.pop();
				if(i != len - 1) {
					this.content[i] = end;
					if(this.scoreFunction(end) < this.scoreFunction(node)) this.bubbleUp(i); else this.sinkDown(i);
				}
				return;
			}
		}
		throw "Node not found.";
	}
	,size: function() {
		return this.content.length;
	}
	,bubbleUp: function(n) {
		var element = this.content[n];
		while(n > 0) {
			var parentN = Math.floor((n + 1.0) / 2) - 1;
			var parent = this.content[parentN];
			if(this.scoreFunction(element) < this.scoreFunction(parent)) {
				this.content[parentN] = element;
				this.content[n] = parent;
				n = parentN;
			} else break;
		}
	}
	,sinkDown: function(n) {
		var length = this.content.length;
		var element = this.content[n];
		var elemScore = this.scoreFunction(element);
		while(true) {
			var child2N = (n + 1) * 2;
			var child1N = child2N - 1;
			var swap = null;
			var child1Score = 0.0;
			if(child1N < length) {
				var child1 = this.content[child1N];
				child1Score = this.scoreFunction(child1);
				if(child1Score < elemScore) swap = child1N;
			}
			if(child2N < length) {
				var child2 = this.content[child2N];
				var child2Score = this.scoreFunction(child2);
				if(child2Score < (swap == null?elemScore:child1Score)) swap = child2N;
			}
			if(swap != null) {
				this.content[n] = this.content[swap];
				this.content[swap] = element;
				n = swap;
			} else break;
		}
	}
};
verb.core.Make = $hx_exports.core.Make = function() { };
verb.core.Make.four_point_surface = function(p1,p2,p3,p4,degree) {
	if(degree == null) degree = 3;
	var degreeFloat = degree;
	var pts = [];
	var _g1 = 0;
	var _g = degree + 1;
	while(_g1 < _g) {
		var i = _g1++;
		var row = [];
		var _g3 = 0;
		var _g2 = degree + 1;
		while(_g3 < _g2) {
			var j = _g3++;
			var l = 1.0 - i / degreeFloat;
			var p1p2 = verb.core.Vec.lerp(l,p1,p2);
			var p4p3 = verb.core.Vec.lerp(l,p4,p3);
			var res = verb.core.Vec.lerp(1.0 - j / degreeFloat,p1p2,p4p3);
			res.push(1.0);
			row.push(res);
		}
		pts.push(row);
	}
	var zeros = verb.core.Vec.rep(degree + 1,0.0);
	var ones = verb.core.Vec.rep(degree + 1,1.0);
	return new verb.core.types.SurfaceData(degree,degree,zeros.concat(ones),zeros.concat(ones),pts);
};
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
		var inters = verb.core.Intersect.rays(P0,verb.core.Vec.mul(1 / verb.core.Vec.norm(T0),T0),P2,verb.core.Vec.mul(1 / verb.core.Vec.norm(T2),T2));
		var P1 = verb.core.Vec.add(P0,verb.core.Vec.mul(inters.u0,T0));
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
				var inters = verb.core.Intersect.rays(P0,verb.core.Vec.mul(1 / verb.core.Vec.norm(T0),T0),P2,verb.core.Vec.mul(1 / verb.core.Vec.norm(T2),T2));
				var P1 = verb.core.Vec.add(P0,verb.core.Vec.mul(inters.u0,T0));
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
		verb.core.ArrayExtensions.spliceAndInsert(A,1,0,tanRow0);
		verb.core.ArrayExtensions.spliceAndInsert(A,A.length - 1,0,tanRow1);
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
			b.push(points[points.length - 1][i3[0]]);
		}
		var x1 = verb.core.Mat.solve(A,b);
		xs.push(x1);
	}
	var controlPts = verb.core.Mat.transpose(xs);
	var weights = verb.core.Vec.rep(controlPts.length,1.0);
	return new verb.core.types.CurveData(degree,knots,verb.core.Eval.homogenize_1d(controlPts,weights));
};
verb.core.LUDecomp = function(lu,p) {
	this.LU = lu;
	this.P = p;
};
verb.core.Mat = $hx_exports.core.Mat = function() { };
verb.core.Mat.mul = function(a,b) {
	var _g = [];
	var _g2 = 0;
	var _g1 = b.length;
	while(_g2 < _g1) {
		var i = _g2++;
		_g.push(verb.core.Vec.mul(a,b[i]));
	}
	return _g;
};
verb.core.Mat.add = function(a,b) {
	var _g = [];
	var _g2 = 0;
	var _g1 = a.length;
	while(_g2 < _g1) {
		var i = _g2++;
		_g.push(verb.core.Vec.add(a[i],b[i]));
	}
	return _g;
};
verb.core.Mat.div = function(a,b) {
	var _g = [];
	var _g2 = 0;
	var _g1 = a.length;
	while(_g2 < _g1) {
		var i = _g2++;
		_g.push(verb.core.Vec.div(a[i],b));
	}
	return _g;
};
verb.core.Mat.sub = function(a,b) {
	var _g = [];
	var _g2 = 0;
	var _g1 = a.length;
	while(_g2 < _g1) {
		var i = _g2++;
		_g.push(verb.core.Vec.sub(a[i],b[i]));
	}
	return _g;
};
verb.core.Mat.dot = function(a,b) {
	var _g = [];
	var _g2 = 0;
	var _g1 = a.length;
	while(_g2 < _g1) {
		var i = _g2++;
		_g.push(verb.core.Vec.dot(a[i],b));
	}
	return _g;
};
verb.core.Mat.identity = function(n) {
	var zeros = verb.core.Vec.zeros2d(n,n);
	var _g = 0;
	while(_g < n) {
		var i = _g++;
		zeros[i][i] = 1.0;
	}
	return zeros;
};
verb.core.Mat.transpose = function(a) {
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
verb.core.Mesh = $hx_exports.core.Mesh = function() { };
verb.core.Mesh.get_tri_norm = function(points,tri) {
	var v0 = points[tri[0]];
	var v1 = points[tri[1]];
	var v2 = points[tri[2]];
	var u = verb.core.Vec.sub(v1,v0);
	var v = verb.core.Vec.sub(v2,v0);
	var n = verb.core.Vec.cross(u,v);
	return verb.core.Vec.mul(1 / verb.core.Vec.norm(n),n);
};
verb.core.Mesh.make_mesh_aabb = function(mesh,faceIndices) {
	var bb = new verb.BoundingBox();
	var _g = 0;
	while(_g < faceIndices.length) {
		var x = faceIndices[_g];
		++_g;
		bb.add(mesh.points[mesh.faces[x][0]]);
		bb.add(mesh.points[mesh.faces[x][1]]);
		bb.add(mesh.points[mesh.faces[x][2]]);
	}
	return bb;
};
verb.core.Mesh.make_mesh_aabb_tree = function(mesh,faceIndices) {
	var aabb = verb.core.Mesh.make_mesh_aabb(mesh,faceIndices);
	if(faceIndices.length == 1) return new verb.core.types.BoundingBoxLeaf(aabb,faceIndices[0]);
	var sortedIndices = verb.core.Mesh.sort_tris_on_longest_axis(aabb,mesh,faceIndices);
	var leftIndices = verb.core.ArrayExtensions.left(sortedIndices);
	var rightIndices = verb.core.ArrayExtensions.right(sortedIndices);
	return new verb.core.types.BoundingBoxInnerNode(aabb,[verb.core.Mesh.make_mesh_aabb_tree(mesh,leftIndices),verb.core.Mesh.make_mesh_aabb_tree(mesh,rightIndices)]);
};
verb.core.Mesh.sort_tris_on_longest_axis = function(bb,mesh,faceIndices) {
	var longAxis = bb.getLongestAxis();
	var minCoordFaceMap = new Array();
	var _g = 0;
	while(_g < faceIndices.length) {
		var faceIndex = faceIndices[_g];
		++_g;
		var tri_min = verb.core.Mesh.get_min_coordinate_on_axis(mesh.points,mesh.faces[faceIndex],longAxis);
		minCoordFaceMap.push(new verb.core.types.Pair(tri_min,faceIndex));
	}
	minCoordFaceMap.sort(function(a,b) {
		var a0 = a.item0;
		var b0 = b.item0;
		if(a0 == b0) return 0; else if(a0 > b0) return 1; else return -1;
	});
	var sortedFaceIndices = new Array();
	var _g1 = 0;
	var _g2 = minCoordFaceMap.length;
	while(_g1 < _g2) {
		var i = _g1++;
		sortedFaceIndices.push(minCoordFaceMap[i].item1);
	}
	return sortedFaceIndices;
};
verb.core.Mesh.get_min_coordinate_on_axis = function(points,tri,axis) {
	var min = Math.POSITIVE_INFINITY;
	var _g = 0;
	while(_g < 3) {
		var i = _g++;
		var coord = points[tri[i]][axis];
		if(coord < min) min = coord;
	}
	return min;
};
verb.core.Mesh.get_tri_centroid = function(points,tri) {
	var centroid = [0.0,0.0,0.0];
	var _g = 0;
	while(_g < 3) {
		var i = _g++;
		var _g1 = 0;
		while(_g1 < 3) {
			var j = _g1++;
			centroid[j] += points[tri[i]][j];
		}
	}
	var _g2 = 0;
	while(_g2 < 3) {
		var i1 = _g2++;
		centroid[i1] /= 3;
	}
	return centroid;
};
verb.core.Mesh.tri_uv_from_point = function(mesh,faceIndex,f) {
	var tri = mesh.faces[faceIndex];
	var p1 = mesh.points[tri[0]];
	var p2 = mesh.points[tri[1]];
	var p3 = mesh.points[tri[2]];
	var uv1 = mesh.uvs[tri[0]];
	var uv2 = mesh.uvs[tri[1]];
	var uv3 = mesh.uvs[tri[2]];
	var f1 = verb.core.Vec.sub(p1,f);
	var f2 = verb.core.Vec.sub(p2,f);
	var f3 = verb.core.Vec.sub(p3,f);
	var a = verb.core.Vec.norm(verb.core.Vec.cross(verb.core.Vec.sub(p1,p2),verb.core.Vec.sub(p1,p3)));
	var a1 = verb.core.Vec.norm(verb.core.Vec.cross(f2,f3)) / a;
	var a2 = verb.core.Vec.norm(verb.core.Vec.cross(f3,f1)) / a;
	var a3 = verb.core.Vec.norm(verb.core.Vec.cross(f1,f2)) / a;
	return verb.core.Vec.add(verb.core.Vec.mul(a1,uv1),verb.core.Vec.add(verb.core.Vec.mul(a2,uv2),verb.core.Vec.mul(a3,uv3)));
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
		ctrlPts = verb.core.Mat.transpose(surface.controlPoints);
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
		newPts = verb.core.Mat.transpose(newPts);
		return new verb.core.types.SurfaceData(surface.degreeU,surface.degreeV,newknots,surface.knotsV.slice(),newPts);
	} else return new verb.core.types.SurfaceData(surface.degreeU,surface.degreeV,surface.knotsU.slice(),newknots,newPts);
};
verb.core.Modify.surface_split = function(surface,u,useV) {
	if(useV == null) useV = false;
	var knots;
	var degree;
	var control_points;
	if(!useV) {
		control_points = verb.core.Mat.transpose(surface.controlPoints);
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
		newpts0 = verb.core.Mat.transpose(newpts0);
		newpts1 = verb.core.Mat.transpose(newpts1);
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
verb.core.MinimizationResult = function(solution,value,gradient,invHessian,iterations,message) {
	this.solution = solution;
	this.value = value;
	this.gradient = gradient;
	this.invHessian = invHessian;
	this.iterations = iterations;
	this.message = message;
};
verb.core.Numeric = function() { };
verb.core.Numeric.numericalGradient = function(f,x) {
	var n = x.length;
	var f0 = f(x);
	if(f0 == Math.NaN) throw "gradient: f(x) is a NaN!";
	var i;
	var x0 = x.slice(0);
	var f1;
	var f2;
	var J = [];
	var errest;
	var roundoff;
	var eps = 1e-3;
	var t0;
	var t1;
	var t2;
	var it = 0;
	var d1;
	var d2;
	var N;
	var _g = 0;
	while(_g < n) {
		var i1 = _g++;
		var h = Math.max(1e-6 * f0,1e-8);
		while(true) {
			++it;
			if(it > 20) throw "Numerical gradient fails";
			x0[i1] = x[i1] + h;
			f1 = f(x0);
			x0[i1] = x[i1] - h;
			f2 = f(x0);
			x0[i1] = x[i1];
			if(Math.isNaN(f1) || Math.isNaN(f2)) {
				h /= 16;
				continue;
			}
			J[i1] = (f1 - f2) / (2 * h);
			t0 = x[i1] - h;
			t1 = x[i1];
			t2 = x[i1] + h;
			d1 = (f1 - f0) / h;
			d2 = (f0 - f2) / h;
			N = verb.core.Vec.max([Math.abs(J[i1]),Math.abs(f0),Math.abs(f1),Math.abs(f2),Math.abs(t0),Math.abs(t1),Math.abs(t2),1e-8]);
			errest = Math.min(verb.core.Vec.max([Math.abs(d1 - J[i1]),Math.abs(d2 - J[i1]),Math.abs(d1 - d2)]) / N,h / N);
			if(errest > eps) h /= 16; else break;
		}
	}
	return J;
};
verb.core.Numeric.uncmin = function(f,x0,tol,gradient,maxit) {
	if(tol == null) tol = 1e-8;
	if(gradient == null) gradient = function(x) {
		return verb.core.Numeric.numericalGradient(f,x);
	};
	if(maxit == null) maxit = 1000;
	x0 = x0.slice(0);
	var n = x0.length;
	var f0 = f(x0);
	var f1 = f0;
	var df0;
	if(Math.isNaN(f0)) throw "uncmin: f(x0) is a NaN!";
	tol = Math.max(tol,verb.core.Constants.EPSILON);
	var step;
	var g0;
	var g1;
	var H1 = verb.core.Mat.identity(n);
	var it = 0;
	var i;
	var s = [];
	var x1;
	var y;
	var Hy;
	var Hs;
	var ys;
	var i0;
	var t;
	var nstep;
	var t1;
	var t2;
	var msg = "";
	g0 = gradient(x0);
	while(it < maxit) {
		if(!verb.core.Vec.all(verb.core.Vec.finite(g0))) {
			msg = "Gradient has Infinity or NaN";
			break;
		}
		step = verb.core.Vec.neg(verb.core.Mat.dot(H1,g0));
		if(!verb.core.Vec.all(verb.core.Vec.finite(step))) {
			msg = "Search direction has Infinity or NaN";
			break;
		}
		nstep = verb.core.Vec.norm(step);
		if(nstep < tol) {
			msg = "Newton step smaller than tol";
			break;
		}
		t = 1.0;
		df0 = verb.core.Vec.dot(g0,step);
		x1 = x0;
		while(it < maxit) {
			if(t * nstep < tol) break;
			s = verb.core.Vec.mul(t,step);
			x1 = verb.core.Vec.add(x0,s);
			f1 = f(x1);
			if(f1 - f0 >= 0.1 * t * df0 || Math.isNaN(f1)) {
				t *= 0.5;
				++it;
				continue;
			}
			break;
		}
		if(t * nstep < tol) {
			msg = "Line search step size smaller than tol";
			break;
		}
		if(it == maxit) {
			msg = "maxit reached during line search";
			break;
		}
		g1 = gradient(x1);
		y = verb.core.Vec.sub(g1,g0);
		ys = verb.core.Vec.dot(y,s);
		Hy = verb.core.Mat.dot(H1,y);
		H1 = verb.core.Mat.sub(verb.core.Mat.add(H1,verb.core.Mat.mul((ys + verb.core.Vec.dot(y,Hy)) / (ys * ys),verb.core.Numeric.tensor(s,s))),verb.core.Mat.div(verb.core.Mat.add(verb.core.Numeric.tensor(Hy,s),verb.core.Numeric.tensor(s,Hy)),ys));
		x0 = x1;
		f0 = f1;
		g0 = g1;
		++it;
	}
	return new verb.core.MinimizationResult(x0,f0,g0,H1,it,msg);
};
verb.core.Numeric.tensor = function(x,y) {
	var m = x.length;
	var n = y.length;
	var A = [];
	var Ai;
	var xi;
	var i = m - 1;
	while(i >= 0) {
		Ai = [];
		xi = x[i];
		var j = n - 1;
		while(j >= 3) {
			Ai[j] = xi * y[j];
			--j;
			Ai[j] = xi * y[j];
			--j;
			Ai[j] = xi * y[j];
			--j;
			Ai[j] = xi * y[j];
			--j;
		}
		while(j >= 0) {
			Ai[j] = xi * y[j];
			--j;
		}
		A[i] = Ai;
		i--;
	}
	return A;
};
verb.core.Tess = $hx_exports.core.Tess = function() { };
verb.core.Tess.rational_curve_regular_sample = function(curve,numSamples,includeU) {
	return verb.core.Tess.rational_curve_regular_sample_range(curve,curve.knots[0],verb.core.ArrayExtensions.last(curve.knots),numSamples,includeU);
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
	return verb.core.Tess.rational_curve_adaptive_sample_range(curve,curve.knots[0],verb.core.ArrayExtensions.last(curve.knots),tol,includeU);
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
verb.core.Tess.rational_surface_naive = function(surface,divs_u,divs_v) {
	if(divs_u < 1) divs_u = 1;
	if(divs_v < 1) divs_v = 1;
	var degree_u = surface.degreeU;
	var degreeV = surface.degreeV;
	var control_points = surface.controlPoints;
	var knotsU = surface.knotsU;
	var knotsV = surface.knotsV;
	var u_span = knotsU[knotsU.length - 1] - knotsU[0];
	var v_span = knotsV[knotsV.length - 1] - knotsV[0];
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
	var umax = verb.core.ArrayExtensions.last(surface.knotsU);
	var umin = surface.knotsU[0];
	var vmax = verb.core.ArrayExtensions.last(surface.knotsV);
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
verb.core.Tess.rational_surface_adaptive = function(surface,options) {
	if(options != null) options = options; else options = new verb.core.types.AdaptiveRefinementOptions();
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
verb.core.Trig.closest_point_on_segment = function(pt,segpt0,segpt1,u0,u1) {
	var dif = verb.core.Vec.sub(segpt1,segpt0);
	var l = verb.core.Vec.norm(dif);
	if(l < verb.core.Constants.EPSILON) return { u : u0, pt : segpt0};
	var o = segpt0;
	var r = verb.core.Vec.mul(1 / l,dif);
	var o2pt = verb.core.Vec.sub(pt,o);
	var do2ptr = verb.core.Vec.dot(o2pt,r);
	if(do2ptr < 0) return { u : u0, pt : segpt0}; else if(do2ptr > l) return { u : u1, pt : segpt1};
	return { u : u0 + (u1 - u0) * do2ptr / l, pt : verb.core.Vec.add(o,verb.core.Vec.mul(do2ptr,r))};
};
verb.core.Vec = $hx_exports.core.Vec = function() { };
verb.core.Vec.range = function(max) {
	var l = [];
	var f = 0.0;
	var _g = 0;
	while(_g < max) {
		var i = _g++;
		l.push(f);
		f += 1.0;
	}
	return l;
};
verb.core.Vec.neg = function(arr) {
	return arr.map(function(x) {
		return -x;
	});
};
verb.core.Vec.min = function(arr) {
	return Lambda.fold(arr,function(x,a) {
		return Math.min(x,a);
	},Math.POSITIVE_INFINITY);
};
verb.core.Vec.max = function(arr) {
	return Lambda.fold(arr,function(x,a) {
		return Math.max(x,a);
	},Math.NEGATIVE_INFINITY);
};
verb.core.Vec.all = function(arr) {
	return Lambda.fold(arr,function(x,a) {
		return a && x;
	},true);
};
verb.core.Vec.finite = function(arr) {
	return arr.map(function(x) {
		return Math.isFinite(x);
	});
};
verb.core.Vec.onRay = function(origin,dir,u) {
	return verb.core.Vec.add(origin,verb.core.Vec.mul(u,dir));
};
verb.core.Vec.lerp = function(i,u,v) {
	return verb.core.Vec.add(verb.core.Vec.mul(i,u),verb.core.Vec.mul(1.0 - i,v));
};
verb.core.Vec.normalized = function(arr) {
	return verb.core.Vec.div(arr,verb.core.Vec.norm(arr));
};
verb.core.Vec.cross = function(u,v) {
	return [u[1] * v[2] - u[2] * v[1],u[2] * v[0] - u[0] * v[2],u[0] * v[1] - u[1] * v[0]];
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
		var u1 = verb.core.ArrayExtensions.last(srf.knotsU);
		var v0 = srf.knotsV[0];
		var v1 = verb.core.ArrayExtensions.last(srf.knotsV);
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
verb.core.types.BoundingBoxNode = $hx_exports.core.BoundingBoxNode = function(bb) {
	this.boundingBox = bb;
};
verb.core.types.BoundingBoxInnerNode = $hx_exports.core.BoundingBoxInnerNode = function(bb,children) {
	verb.core.types.BoundingBoxNode.call(this,bb);
	this.children = children;
};
verb.core.types.BoundingBoxInnerNode.__super__ = verb.core.types.BoundingBoxNode;
verb.core.types.BoundingBoxInnerNode.prototype = $extend(verb.core.types.BoundingBoxNode.prototype,{
});
verb.core.types.BoundingBoxLeaf = $hx_exports.core.BoundingBoxLeaf = function(bb,item) {
	verb.core.types.BoundingBoxNode.call(this,bb);
	this.item = item;
};
verb.core.types.BoundingBoxLeaf.__super__ = verb.core.types.BoundingBoxNode;
verb.core.types.BoundingBoxLeaf.prototype = $extend(verb.core.types.BoundingBoxNode.prototype,{
});
verb.core.types.CurveData = $hx_exports.core.CurveData = function(degree,knots,controlPoints) {
	this.degree = degree;
	this.controlPoints = controlPoints;
	this.knots = knots;
};
verb.core.types.CurveLengthSample = $hx_exports.core.CurveLengthSample = function(u,len) {
	this.u = u;
	this.len = len;
};
verb.core.types.MeshData = $hx_exports.core.MeshData = function(faces,points,normals,uvs) {
	this.faces = faces;
	this.points = points;
	this.normals = normals;
	this.uvs = uvs;
};
verb.core.types.MeshData.empty = function() {
	return new verb.core.types.MeshData([],[],[],[]);
};
verb.core.types.Pair = $hx_exports.core.Pair = function(item1,item2) {
	this.item0 = item1;
	this.item1 = item2;
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
verb.core.types.VolumeData = $hx_exports.core.VolumeData = function(degreeU,degreeV,degreeW,knotsU,knotsV,knotsW,controlPoints) {
	this.degreeU = degreeU;
	this.degreeV = degreeV;
	this.degreeW = degreeW;
	this.knotsU = knotsU;
	this.knotsV = knotsV;
	this.knotsW = knotsW;
	this.controlPoints = controlPoints;
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
verb.core.Analyze.Tvalues = [[],[],[-0.5773502691896257645091487805019574556476,0.5773502691896257645091487805019574556476],[0,-0.7745966692414833770358530799564799221665,0.7745966692414833770358530799564799221665],[-0.3399810435848562648026657591032446872005,0.3399810435848562648026657591032446872005,-0.8611363115940525752239464888928095050957,0.8611363115940525752239464888928095050957],[0,-0.5384693101056830910363144207002088049672,0.5384693101056830910363144207002088049672,-0.9061798459386639927976268782993929651256,0.9061798459386639927976268782993929651256],[0.6612093864662645136613995950199053470064,-0.6612093864662645136613995950199053470064,-0.2386191860831969086305017216807119354186,0.2386191860831969086305017216807119354186,-0.9324695142031520278123015544939946091347,0.9324695142031520278123015544939946091347],[0,0.4058451513773971669066064120769614633473,-0.4058451513773971669066064120769614633473,-0.7415311855993944398638647732807884070741,0.7415311855993944398638647732807884070741,-0.9491079123427585245261896840478512624007,0.9491079123427585245261896840478512624007],[-0.1834346424956498049394761423601839806667,0.1834346424956498049394761423601839806667,-0.5255324099163289858177390491892463490419,0.5255324099163289858177390491892463490419,-0.7966664774136267395915539364758304368371,0.7966664774136267395915539364758304368371,-0.9602898564975362316835608685694729904282,0.9602898564975362316835608685694729904282],[0,-0.8360311073266357942994297880697348765441,0.8360311073266357942994297880697348765441,-0.9681602395076260898355762029036728700494,0.9681602395076260898355762029036728700494,-0.3242534234038089290385380146433366085719,0.3242534234038089290385380146433366085719,-0.6133714327005903973087020393414741847857,0.6133714327005903973087020393414741847857],[-0.1488743389816312108848260011297199846175,0.1488743389816312108848260011297199846175,-0.4333953941292471907992659431657841622000,0.4333953941292471907992659431657841622000,-0.6794095682990244062343273651148735757692,0.6794095682990244062343273651148735757692,-0.8650633666889845107320966884234930485275,0.8650633666889845107320966884234930485275,-0.9739065285171717200779640120844520534282,0.9739065285171717200779640120844520534282],[0,-0.2695431559523449723315319854008615246796,0.2695431559523449723315319854008615246796,-0.5190961292068118159257256694586095544802,0.5190961292068118159257256694586095544802,-0.7301520055740493240934162520311534580496,0.7301520055740493240934162520311534580496,-0.8870625997680952990751577693039272666316,0.8870625997680952990751577693039272666316,-0.9782286581460569928039380011228573907714,0.9782286581460569928039380011228573907714],[-0.1252334085114689154724413694638531299833,0.1252334085114689154724413694638531299833,-0.3678314989981801937526915366437175612563,0.3678314989981801937526915366437175612563,-0.5873179542866174472967024189405342803690,0.5873179542866174472967024189405342803690,-0.7699026741943046870368938332128180759849,0.7699026741943046870368938332128180759849,-0.9041172563704748566784658661190961925375,0.9041172563704748566784658661190961925375,-0.9815606342467192506905490901492808229601,0.9815606342467192506905490901492808229601],[0,-0.2304583159551347940655281210979888352115,0.2304583159551347940655281210979888352115,-0.4484927510364468528779128521276398678019,0.4484927510364468528779128521276398678019,-0.6423493394403402206439846069955156500716,0.6423493394403402206439846069955156500716,-0.8015780907333099127942064895828598903056,0.8015780907333099127942064895828598903056,-0.9175983992229779652065478365007195123904,0.9175983992229779652065478365007195123904,-0.9841830547185881494728294488071096110649,0.9841830547185881494728294488071096110649],[-0.1080549487073436620662446502198347476119,0.1080549487073436620662446502198347476119,-0.3191123689278897604356718241684754668342,0.3191123689278897604356718241684754668342,-0.5152486363581540919652907185511886623088,0.5152486363581540919652907185511886623088,-0.6872929048116854701480198030193341375384,0.6872929048116854701480198030193341375384,-0.8272013150697649931897947426503949610397,0.8272013150697649931897947426503949610397,-0.9284348836635735173363911393778742644770,0.9284348836635735173363911393778742644770,-0.9862838086968123388415972667040528016760,0.9862838086968123388415972667040528016760],[0,-0.2011940939974345223006283033945962078128,0.2011940939974345223006283033945962078128,-0.3941513470775633698972073709810454683627,0.3941513470775633698972073709810454683627,-0.5709721726085388475372267372539106412383,0.5709721726085388475372267372539106412383,-0.7244177313601700474161860546139380096308,0.7244177313601700474161860546139380096308,-0.8482065834104272162006483207742168513662,0.8482065834104272162006483207742168513662,-0.9372733924007059043077589477102094712439,0.9372733924007059043077589477102094712439,-0.9879925180204854284895657185866125811469,0.9879925180204854284895657185866125811469],[-0.0950125098376374401853193354249580631303,0.0950125098376374401853193354249580631303,-0.2816035507792589132304605014604961064860,0.2816035507792589132304605014604961064860,-0.4580167776572273863424194429835775735400,0.4580167776572273863424194429835775735400,-0.6178762444026437484466717640487910189918,0.6178762444026437484466717640487910189918,-0.7554044083550030338951011948474422683538,0.7554044083550030338951011948474422683538,-0.8656312023878317438804678977123931323873,0.8656312023878317438804678977123931323873,-0.9445750230732325760779884155346083450911,0.9445750230732325760779884155346083450911,-0.9894009349916499325961541734503326274262,0.9894009349916499325961541734503326274262],[0,-0.1784841814958478558506774936540655574754,0.1784841814958478558506774936540655574754,-0.3512317634538763152971855170953460050405,0.3512317634538763152971855170953460050405,-0.5126905370864769678862465686295518745829,0.5126905370864769678862465686295518745829,-0.6576711592166907658503022166430023351478,0.6576711592166907658503022166430023351478,-0.7815140038968014069252300555204760502239,0.7815140038968014069252300555204760502239,-0.8802391537269859021229556944881556926234,0.8802391537269859021229556944881556926234,-0.9506755217687677612227169578958030214433,0.9506755217687677612227169578958030214433,-0.9905754753144173356754340199406652765077,0.9905754753144173356754340199406652765077],[-0.0847750130417353012422618529357838117333,0.0847750130417353012422618529357838117333,-0.2518862256915055095889728548779112301628,0.2518862256915055095889728548779112301628,-0.4117511614628426460359317938330516370789,0.4117511614628426460359317938330516370789,-0.5597708310739475346078715485253291369276,0.5597708310739475346078715485253291369276,-0.6916870430603532078748910812888483894522,0.6916870430603532078748910812888483894522,-0.8037049589725231156824174550145907971032,0.8037049589725231156824174550145907971032,-0.8926024664975557392060605911271455154078,0.8926024664975557392060605911271455154078,-0.9558239495713977551811958929297763099728,0.9558239495713977551811958929297763099728,-0.9915651684209309467300160047061507702525,0.9915651684209309467300160047061507702525],[0,-0.1603586456402253758680961157407435495048,0.1603586456402253758680961157407435495048,-0.3165640999636298319901173288498449178922,0.3165640999636298319901173288498449178922,-0.4645707413759609457172671481041023679762,0.4645707413759609457172671481041023679762,-0.6005453046616810234696381649462392798683,0.6005453046616810234696381649462392798683,-0.7209661773352293786170958608237816296571,0.7209661773352293786170958608237816296571,-0.8227146565371428249789224867127139017745,0.8227146565371428249789224867127139017745,-0.9031559036148179016426609285323124878093,0.9031559036148179016426609285323124878093,-0.9602081521348300308527788406876515266150,0.9602081521348300308527788406876515266150,-0.9924068438435844031890176702532604935893,0.9924068438435844031890176702532604935893],[-0.0765265211334973337546404093988382110047,0.0765265211334973337546404093988382110047,-0.2277858511416450780804961953685746247430,0.2277858511416450780804961953685746247430,-0.3737060887154195606725481770249272373957,0.3737060887154195606725481770249272373957,-0.5108670019508270980043640509552509984254,0.5108670019508270980043640509552509984254,-0.6360536807265150254528366962262859367433,0.6360536807265150254528366962262859367433,-0.7463319064601507926143050703556415903107,0.7463319064601507926143050703556415903107,-0.8391169718222188233945290617015206853296,0.8391169718222188233945290617015206853296,-0.9122344282513259058677524412032981130491,0.9122344282513259058677524412032981130491,-0.9639719272779137912676661311972772219120,0.9639719272779137912676661311972772219120,-0.9931285991850949247861223884713202782226,0.9931285991850949247861223884713202782226],[0,-0.1455618541608950909370309823386863301163,0.1455618541608950909370309823386863301163,-0.2880213168024010966007925160646003199090,0.2880213168024010966007925160646003199090,-0.4243421202074387835736688885437880520964,0.4243421202074387835736688885437880520964,-0.5516188358872198070590187967243132866220,0.5516188358872198070590187967243132866220,-0.6671388041974123193059666699903391625970,0.6671388041974123193059666699903391625970,-0.7684399634756779086158778513062280348209,0.7684399634756779086158778513062280348209,-0.8533633645833172836472506385875676702761,0.8533633645833172836472506385875676702761,-0.9200993341504008287901871337149688941591,0.9200993341504008287901871337149688941591,-0.9672268385663062943166222149076951614246,0.9672268385663062943166222149076951614246,-0.9937521706203895002602420359379409291933,0.9937521706203895002602420359379409291933],[-0.0697392733197222212138417961186280818222,0.0697392733197222212138417961186280818222,-0.2078604266882212854788465339195457342156,0.2078604266882212854788465339195457342156,-0.3419358208920842251581474204273796195591,0.3419358208920842251581474204273796195591,-0.4693558379867570264063307109664063460953,0.4693558379867570264063307109664063460953,-0.5876404035069115929588769276386473488776,0.5876404035069115929588769276386473488776,-0.6944872631866827800506898357622567712673,0.6944872631866827800506898357622567712673,-0.7878168059792081620042779554083515213881,0.7878168059792081620042779554083515213881,-0.8658125777203001365364256370193787290847,0.8658125777203001365364256370193787290847,-0.9269567721871740005206929392590531966353,0.9269567721871740005206929392590531966353,-0.9700604978354287271239509867652687108059,0.9700604978354287271239509867652687108059,-0.9942945854823992920730314211612989803930,0.9942945854823992920730314211612989803930],[0,-0.1332568242984661109317426822417661370104,0.1332568242984661109317426822417661370104,-0.2641356809703449305338695382833096029790,0.2641356809703449305338695382833096029790,-0.3903010380302908314214888728806054585780,0.3903010380302908314214888728806054585780,-0.5095014778460075496897930478668464305448,0.5095014778460075496897930478668464305448,-0.6196098757636461563850973116495956533871,0.6196098757636461563850973116495956533871,-0.7186613631319501944616244837486188483299,0.7186613631319501944616244837486188483299,-0.8048884016188398921511184069967785579414,0.8048884016188398921511184069967785579414,-0.8767523582704416673781568859341456716389,0.8767523582704416673781568859341456716389,-0.9329710868260161023491969890384229782357,0.9329710868260161023491969890384229782357,-0.9725424712181152319560240768207773751816,0.9725424712181152319560240768207773751816,-0.9947693349975521235239257154455743605736,0.9947693349975521235239257154455743605736],[-0.0640568928626056260850430826247450385909,0.0640568928626056260850430826247450385909,-0.1911188674736163091586398207570696318404,0.1911188674736163091586398207570696318404,-0.3150426796961633743867932913198102407864,0.3150426796961633743867932913198102407864,-0.4337935076260451384870842319133497124524,0.4337935076260451384870842319133497124524,-0.5454214713888395356583756172183723700107,0.5454214713888395356583756172183723700107,-0.6480936519369755692524957869107476266696,0.6480936519369755692524957869107476266696,-0.7401241915785543642438281030999784255232,0.7401241915785543642438281030999784255232,-0.8200019859739029219539498726697452080761,0.8200019859739029219539498726697452080761,-0.8864155270044010342131543419821967550873,0.8864155270044010342131543419821967550873,-0.9382745520027327585236490017087214496548,0.9382745520027327585236490017087214496548,-0.9747285559713094981983919930081690617411,0.9747285559713094981983919930081690617411,-0.9951872199970213601799974097007368118745,0.9951872199970213601799974097007368118745]];
verb.core.Analyze.Cvalues = [[],[],[1.0,1.0],[0.8888888888888888888888888888888888888888,0.5555555555555555555555555555555555555555,0.5555555555555555555555555555555555555555],[0.6521451548625461426269360507780005927646,0.6521451548625461426269360507780005927646,0.3478548451374538573730639492219994072353,0.3478548451374538573730639492219994072353],[0.5688888888888888888888888888888888888888,0.4786286704993664680412915148356381929122,0.4786286704993664680412915148356381929122,0.2369268850561890875142640407199173626432,0.2369268850561890875142640407199173626432],[0.3607615730481386075698335138377161116615,0.3607615730481386075698335138377161116615,0.4679139345726910473898703439895509948116,0.4679139345726910473898703439895509948116,0.1713244923791703450402961421727328935268,0.1713244923791703450402961421727328935268],[0.4179591836734693877551020408163265306122,0.3818300505051189449503697754889751338783,0.3818300505051189449503697754889751338783,0.2797053914892766679014677714237795824869,0.2797053914892766679014677714237795824869,0.1294849661688696932706114326790820183285,0.1294849661688696932706114326790820183285],[0.3626837833783619829651504492771956121941,0.3626837833783619829651504492771956121941,0.3137066458778872873379622019866013132603,0.3137066458778872873379622019866013132603,0.2223810344533744705443559944262408844301,0.2223810344533744705443559944262408844301,0.1012285362903762591525313543099621901153,0.1012285362903762591525313543099621901153],[0.3302393550012597631645250692869740488788,0.1806481606948574040584720312429128095143,0.1806481606948574040584720312429128095143,0.0812743883615744119718921581105236506756,0.0812743883615744119718921581105236506756,0.3123470770400028400686304065844436655987,0.3123470770400028400686304065844436655987,0.2606106964029354623187428694186328497718,0.2606106964029354623187428694186328497718],[0.2955242247147528701738929946513383294210,0.2955242247147528701738929946513383294210,0.2692667193099963550912269215694693528597,0.2692667193099963550912269215694693528597,0.2190863625159820439955349342281631924587,0.2190863625159820439955349342281631924587,0.1494513491505805931457763396576973324025,0.1494513491505805931457763396576973324025,0.0666713443086881375935688098933317928578,0.0666713443086881375935688098933317928578],[0.2729250867779006307144835283363421891560,0.2628045445102466621806888698905091953727,0.2628045445102466621806888698905091953727,0.2331937645919904799185237048431751394317,0.2331937645919904799185237048431751394317,0.1862902109277342514260976414316558916912,0.1862902109277342514260976414316558916912,0.1255803694649046246346942992239401001976,0.1255803694649046246346942992239401001976,0.0556685671161736664827537204425485787285,0.0556685671161736664827537204425485787285],[0.2491470458134027850005624360429512108304,0.2491470458134027850005624360429512108304,0.2334925365383548087608498989248780562594,0.2334925365383548087608498989248780562594,0.2031674267230659217490644558097983765065,0.2031674267230659217490644558097983765065,0.1600783285433462263346525295433590718720,0.1600783285433462263346525295433590718720,0.1069393259953184309602547181939962242145,0.1069393259953184309602547181939962242145,0.0471753363865118271946159614850170603170,0.0471753363865118271946159614850170603170],[0.2325515532308739101945895152688359481566,0.2262831802628972384120901860397766184347,0.2262831802628972384120901860397766184347,0.2078160475368885023125232193060527633865,0.2078160475368885023125232193060527633865,0.1781459807619457382800466919960979955128,0.1781459807619457382800466919960979955128,0.1388735102197872384636017768688714676218,0.1388735102197872384636017768688714676218,0.0921214998377284479144217759537971209236,0.0921214998377284479144217759537971209236,0.0404840047653158795200215922009860600419,0.0404840047653158795200215922009860600419],[0.2152638534631577901958764433162600352749,0.2152638534631577901958764433162600352749,0.2051984637212956039659240656612180557103,0.2051984637212956039659240656612180557103,0.1855383974779378137417165901251570362489,0.1855383974779378137417165901251570362489,0.1572031671581935345696019386238421566056,0.1572031671581935345696019386238421566056,0.1215185706879031846894148090724766259566,0.1215185706879031846894148090724766259566,0.0801580871597602098056332770628543095836,0.0801580871597602098056332770628543095836,0.0351194603317518630318328761381917806197,0.0351194603317518630318328761381917806197],[0.2025782419255612728806201999675193148386,0.1984314853271115764561183264438393248186,0.1984314853271115764561183264438393248186,0.1861610000155622110268005618664228245062,0.1861610000155622110268005618664228245062,0.1662692058169939335532008604812088111309,0.1662692058169939335532008604812088111309,0.1395706779261543144478047945110283225208,0.1395706779261543144478047945110283225208,0.1071592204671719350118695466858693034155,0.1071592204671719350118695466858693034155,0.0703660474881081247092674164506673384667,0.0703660474881081247092674164506673384667,0.0307532419961172683546283935772044177217,0.0307532419961172683546283935772044177217],[0.1894506104550684962853967232082831051469,0.1894506104550684962853967232082831051469,0.1826034150449235888667636679692199393835,0.1826034150449235888667636679692199393835,0.1691565193950025381893120790303599622116,0.1691565193950025381893120790303599622116,0.1495959888165767320815017305474785489704,0.1495959888165767320815017305474785489704,0.1246289712555338720524762821920164201448,0.1246289712555338720524762821920164201448,0.0951585116824927848099251076022462263552,0.0951585116824927848099251076022462263552,0.0622535239386478928628438369943776942749,0.0622535239386478928628438369943776942749,0.0271524594117540948517805724560181035122,0.0271524594117540948517805724560181035122],[0.1794464703562065254582656442618856214487,0.1765627053669926463252709901131972391509,0.1765627053669926463252709901131972391509,0.1680041021564500445099706637883231550211,0.1680041021564500445099706637883231550211,0.1540457610768102880814315948019586119404,0.1540457610768102880814315948019586119404,0.1351363684685254732863199817023501973721,0.1351363684685254732863199817023501973721,0.1118838471934039710947883856263559267358,0.1118838471934039710947883856263559267358,0.0850361483171791808835353701910620738504,0.0850361483171791808835353701910620738504,0.0554595293739872011294401653582446605128,0.0554595293739872011294401653582446605128,0.0241483028685479319601100262875653246916,0.0241483028685479319601100262875653246916],[0.1691423829631435918406564701349866103341,0.1691423829631435918406564701349866103341,0.1642764837458327229860537764659275904123,0.1642764837458327229860537764659275904123,0.1546846751262652449254180038363747721932,0.1546846751262652449254180038363747721932,0.1406429146706506512047313037519472280955,0.1406429146706506512047313037519472280955,0.1225552067114784601845191268002015552281,0.1225552067114784601845191268002015552281,0.1009420441062871655628139849248346070628,0.1009420441062871655628139849248346070628,0.0764257302548890565291296776166365256053,0.0764257302548890565291296776166365256053,0.0497145488949697964533349462026386416808,0.0497145488949697964533349462026386416808,0.0216160135264833103133427102664524693876,0.0216160135264833103133427102664524693876],[0.1610544498487836959791636253209167350399,0.1589688433939543476499564394650472016787,0.1589688433939543476499564394650472016787,0.1527660420658596667788554008976629984610,0.1527660420658596667788554008976629984610,0.1426067021736066117757461094419029724756,0.1426067021736066117757461094419029724756,0.1287539625393362276755157848568771170558,0.1287539625393362276755157848568771170558,0.1115666455473339947160239016817659974813,0.1115666455473339947160239016817659974813,0.0914900216224499994644620941238396526609,0.0914900216224499994644620941238396526609,0.0690445427376412265807082580060130449618,0.0690445427376412265807082580060130449618,0.0448142267656996003328381574019942119517,0.0448142267656996003328381574019942119517,0.0194617882297264770363120414644384357529,0.0194617882297264770363120414644384357529],[0.1527533871307258506980843319550975934919,0.1527533871307258506980843319550975934919,0.1491729864726037467878287370019694366926,0.1491729864726037467878287370019694366926,0.1420961093183820513292983250671649330345,0.1420961093183820513292983250671649330345,0.1316886384491766268984944997481631349161,0.1316886384491766268984944997481631349161,0.1181945319615184173123773777113822870050,0.1181945319615184173123773777113822870050,0.1019301198172404350367501354803498761666,0.1019301198172404350367501354803498761666,0.0832767415767047487247581432220462061001,0.0832767415767047487247581432220462061001,0.0626720483341090635695065351870416063516,0.0626720483341090635695065351870416063516,0.0406014298003869413310399522749321098790,0.0406014298003869413310399522749321098790,0.0176140071391521183118619623518528163621,0.0176140071391521183118619623518528163621],[0.1460811336496904271919851476833711882448,0.1445244039899700590638271665537525436099,0.1445244039899700590638271665537525436099,0.1398873947910731547221334238675831108927,0.1398873947910731547221334238675831108927,0.1322689386333374617810525744967756043290,0.1322689386333374617810525744967756043290,0.1218314160537285341953671771257335983563,0.1218314160537285341953671771257335983563,0.1087972991671483776634745780701056420336,0.1087972991671483776634745780701056420336,0.0934444234560338615532897411139320884835,0.0934444234560338615532897411139320884835,0.0761001136283793020170516533001831792261,0.0761001136283793020170516533001831792261,0.0571344254268572082836358264724479574912,0.0571344254268572082836358264724479574912,0.0369537897708524937999506682993296661889,0.0369537897708524937999506682993296661889,0.0160172282577743333242246168584710152658,0.0160172282577743333242246168584710152658],[0.1392518728556319933754102483418099578739,0.1392518728556319933754102483418099578739,0.1365414983460151713525738312315173965863,0.1365414983460151713525738312315173965863,0.1311735047870623707329649925303074458757,0.1311735047870623707329649925303074458757,0.1232523768105124242855609861548144719594,0.1232523768105124242855609861548144719594,0.1129322960805392183934006074217843191142,0.1129322960805392183934006074217843191142,0.1004141444428809649320788378305362823508,0.1004141444428809649320788378305362823508,0.0859416062170677274144436813727028661891,0.0859416062170677274144436813727028661891,0.0697964684245204880949614189302176573987,0.0697964684245204880949614189302176573987,0.0522933351526832859403120512732112561121,0.0522933351526832859403120512732112561121,0.0337749015848141547933022468659129013491,0.0337749015848141547933022468659129013491,0.0146279952982722006849910980471854451902,0.0146279952982722006849910980471854451902],[0.1336545721861061753514571105458443385831,0.1324620394046966173716424647033169258050,0.1324620394046966173716424647033169258050,0.1289057221880821499785953393997936532597,0.1289057221880821499785953393997936532597,0.1230490843067295304675784006720096548158,0.1230490843067295304675784006720096548158,0.1149966402224113649416435129339613014914,0.1149966402224113649416435129339613014914,0.1048920914645414100740861850147438548584,0.1048920914645414100740861850147438548584,0.0929157660600351474770186173697646486034,0.0929157660600351474770186173697646486034,0.0792814117767189549228925247420432269137,0.0792814117767189549228925247420432269137,0.0642324214085258521271696151589109980391,0.0642324214085258521271696151589109980391,0.0480376717310846685716410716320339965612,0.0480376717310846685716410716320339965612,0.0309880058569794443106942196418845053837,0.0309880058569794443106942196418845053837,0.0134118594871417720813094934586150649766,0.0134118594871417720813094934586150649766],[0.1279381953467521569740561652246953718517,0.1279381953467521569740561652246953718517,0.1258374563468282961213753825111836887264,0.1258374563468282961213753825111836887264,0.1216704729278033912044631534762624256070,0.1216704729278033912044631534762624256070,0.1155056680537256013533444839067835598622,0.1155056680537256013533444839067835598622,0.1074442701159656347825773424466062227946,0.1074442701159656347825773424466062227946,0.0976186521041138882698806644642471544279,0.0976186521041138882698806644642471544279,0.0861901615319532759171852029837426671850,0.0861901615319532759171852029837426671850,0.0733464814110803057340336152531165181193,0.0733464814110803057340336152531165181193,0.0592985849154367807463677585001085845412,0.0592985849154367807463677585001085845412,0.0442774388174198061686027482113382288593,0.0442774388174198061686027482113382288593,0.0285313886289336631813078159518782864491,0.0285313886289336631813078159518782864491,0.0123412297999871995468056670700372915759,0.0123412297999871995468056670700372915759]];
verb.core.Binomial.memo = new haxe.ds.IntMap();
verb.core.Constants.TOLERANCE = 1e-6;
verb.core.Constants.EPSILON = 1e-10;
verb.Init.main();
})(typeof window != "undefined" ? window : exports);
