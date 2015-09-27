(function (console, $hx_exports) { "use strict";
$hx_exports.topo = $hx_exports.topo || {};
$hx_exports.geom = $hx_exports.geom || {};
$hx_exports.exe = $hx_exports.exe || {};
$hx_exports.core = $hx_exports.core || {};
$hx_exports.promhx = $hx_exports.promhx || {};
var $estr = function() { return js_Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var HxOverrides = function() { };
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) i = 0;
	}
	while(i < len) {
		if(a[i] === obj) return i;
		i++;
	}
	return -1;
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var Lambda = function() { };
Lambda.__name__ = ["Lambda"];
Lambda.array = function(it) {
	var a = [];
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		a.push(i);
	}
	return a;
};
Lambda.fold = function(it,f,first) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		first = f(x,first);
	}
	return first;
};
var List = function() {
	this.length = 0;
};
List.__name__ = ["List"];
List.prototype = {
	add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,pop: function() {
		if(this.h == null) return null;
		var x = this.h[0];
		this.h = this.h[1];
		if(this.h == null) this.q = null;
		this.length--;
		return x;
	}
	,isEmpty: function() {
		return this.h == null;
	}
};
Math.__name__ = ["Math"];
var Type = function() { };
Type.__name__ = ["Type"];
Type.getClassName = function(c) {
	var a = c.__name__;
	if(a == null) return null;
	return a.join(".");
};
var haxe_IMap = function() { };
haxe_IMap.__name__ = ["haxe","IMap"];
var haxe_Log = function() { };
haxe_Log.__name__ = ["haxe","Log"];
haxe_Log.trace = function(v,infos) {
	js_Boot.__trace(v,infos);
};
var haxe_ds_IntMap = function() {
	this.h = { };
};
haxe_ds_IntMap.__name__ = ["haxe","ds","IntMap"];
haxe_ds_IntMap.__interfaces__ = [haxe_IMap];
haxe_ds_IntMap.prototype = {
	set: function(key,value) {
		this.h[key] = value;
	}
	,remove: function(key) {
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
};
var haxe_ds_Option = { __ename__ : true, __constructs__ : ["Some","None"] };
haxe_ds_Option.Some = function(v) { var $x = ["Some",0,v]; $x.__enum__ = haxe_ds_Option; $x.toString = $estr; return $x; };
haxe_ds_Option.None = ["None",1];
haxe_ds_Option.None.toString = $estr;
haxe_ds_Option.None.__enum__ = haxe_ds_Option;
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	this.message = String(val);
	if(Error.captureStackTrace) Error.captureStackTrace(this,js__$Boot_HaxeError);
};
js__$Boot_HaxeError.__name__ = ["js","_Boot","HaxeError"];
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
});
var js_Boot = function() { };
js_Boot.__name__ = ["js","Boot"];
js_Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
};
js_Boot.__trace = function(v,i) {
	var msg;
	if(i != null) msg = i.fileName + ":" + i.lineNumber + ": "; else msg = "";
	msg += js_Boot.__string_rec(v,"");
	if(i != null && i.customParams != null) {
		var _g = 0;
		var _g1 = i.customParams;
		while(_g < _g1.length) {
			var v1 = _g1[_g];
			++_g;
			msg += "," + js_Boot.__string_rec(v1,"");
		}
	}
	var d;
	if(typeof(document) != "undefined" && (d = document.getElementById("haxe:trace")) != null) d.innerHTML += js_Boot.__unhtml(msg) + "<br/>"; else if(typeof console != "undefined" && console.log != null) console.log(msg);
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str2 = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i1 = _g1++;
					if(i1 != 2) str2 += "," + js_Boot.__string_rec(o[i1],s); else str2 += js_Boot.__string_rec(o[i1],s);
				}
				return str2 + ")";
			}
			var l = o.length;
			var i;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
var promhx_base_AsyncBase = function(d) {
	this._resolved = false;
	this._pending = false;
	this._errorPending = false;
	this._errorHandled = false;
	this._fulfilled = false;
	this._update = [];
	this._error = [];
	this._errored = false;
	if(d != null) promhx_base_AsyncBase.link(d,this,function(x) {
		return x;
	});
};
promhx_base_AsyncBase.__name__ = ["promhx","base","AsyncBase"];
promhx_base_AsyncBase.link = function(current,next,f) {
	current._update.push({ async : next, linkf : function(x) {
		next.handleResolve(f(x));
	}});
	promhx_base_AsyncBase.immediateLinkUpdate(current,next,f);
};
promhx_base_AsyncBase.immediateLinkUpdate = function(current,next,f) {
	if(current._errored && !current._errorPending && !(current._error.length > 0)) next.handleError(current._errorVal);
	if(current._resolved && !current._pending) try {
		next.handleResolve(f(current._val));
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		next.handleError(e);
	}
};
promhx_base_AsyncBase.linkAll = function(all,next) {
	var cthen = function(arr,current,v) {
		if(arr.length == 0 || promhx_base_AsyncBase.allFulfilled(arr)) {
			var vals;
			var _g = [];
			var $it0 = $iterator(all)();
			while( $it0.hasNext() ) {
				var a = $it0.next();
				_g.push(a == current?v:a._val);
			}
			vals = _g;
			next.handleResolve(vals);
		}
		null;
		return;
	};
	var $it1 = $iterator(all)();
	while( $it1.hasNext() ) {
		var a1 = $it1.next();
		a1._update.push({ async : next, linkf : (function(f,a11,a2) {
			return function(v1) {
				f(a11,a2,v1);
				return;
			};
		})(cthen,(function($this) {
			var $r;
			var _g1 = [];
			var $it2 = $iterator(all)();
			while( $it2.hasNext() ) {
				var a21 = $it2.next();
				if(a21 != a1) _g1.push(a21);
			}
			$r = _g1;
			return $r;
		}(this)),a1)});
	}
	if(promhx_base_AsyncBase.allFulfilled(all)) next.handleResolve((function($this) {
		var $r;
		var _g2 = [];
		var $it3 = $iterator(all)();
		while( $it3.hasNext() ) {
			var a3 = $it3.next();
			_g2.push(a3._val);
		}
		$r = _g2;
		return $r;
	}(this)));
};
promhx_base_AsyncBase.pipeLink = function(current,ret,f) {
	var linked = false;
	var linkf = function(x) {
		if(!linked) {
			linked = true;
			var pipe_ret = f(x);
			pipe_ret._update.push({ async : ret, linkf : $bind(ret,ret.handleResolve)});
			promhx_base_AsyncBase.immediateLinkUpdate(pipe_ret,ret,function(x1) {
				return x1;
			});
		}
	};
	current._update.push({ async : ret, linkf : linkf});
	if(current._resolved && !current._pending) try {
		linkf(current._val);
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		ret.handleError(e);
	}
};
promhx_base_AsyncBase.allResolved = function($as) {
	var $it0 = $iterator($as)();
	while( $it0.hasNext() ) {
		var a = $it0.next();
		if(!a._resolved) return false;
	}
	return true;
};
promhx_base_AsyncBase.allFulfilled = function($as) {
	var $it0 = $iterator($as)();
	while( $it0.hasNext() ) {
		var a = $it0.next();
		if(!a._fulfilled) return false;
	}
	return true;
};
promhx_base_AsyncBase.prototype = {
	catchError: function(f) {
		this._error.push(f);
		return this;
	}
	,errorThen: function(f) {
		this._errorMap = f;
		return this;
	}
	,isResolved: function() {
		return this._resolved;
	}
	,isErrored: function() {
		return this._errored;
	}
	,isErrorHandled: function() {
		return this._error.length > 0;
	}
	,isErrorPending: function() {
		return this._errorPending;
	}
	,isFulfilled: function() {
		return this._fulfilled;
	}
	,isPending: function() {
		return this._pending;
	}
	,handleResolve: function(val) {
		this._resolve(val);
	}
	,_resolve: function(val) {
		var _g = this;
		if(this._pending) promhx_base_EventLoop.enqueue((function(f,a1) {
			return function() {
				f(a1);
			};
		})($bind(this,this._resolve),val)); else {
			this._resolved = true;
			this._pending = true;
			promhx_base_EventLoop.queue.add(function() {
				_g._val = val;
				var _g1 = 0;
				var _g2 = _g._update;
				while(_g1 < _g2.length) {
					var up = _g2[_g1];
					++_g1;
					try {
						up.linkf(val);
					} catch( e ) {
						if (e instanceof js__$Boot_HaxeError) e = e.val;
						up.async.handleError(e);
					}
				}
				_g._fulfilled = true;
				_g._pending = false;
			});
			promhx_base_EventLoop.continueOnNextLoop();
		}
	}
	,handleError: function(error) {
		this._handleError(error);
	}
	,_handleError: function(error) {
		var _g = this;
		var update_errors = function(e) {
			if(_g._error.length > 0) {
				var _g1 = 0;
				var _g2 = _g._error;
				while(_g1 < _g2.length) {
					var ef = _g2[_g1];
					++_g1;
					ef(e);
				}
			} else if(_g._update.length > 0) {
				var _g11 = 0;
				var _g21 = _g._update;
				while(_g11 < _g21.length) {
					var up = _g21[_g11];
					++_g11;
					up.async.handleError(e);
				}
			} else throw new js__$Boot_HaxeError(e);
			_g._errorPending = false;
		};
		if(!this._errorPending) {
			this._errorPending = true;
			this._errored = true;
			this._errorVal = error;
			promhx_base_EventLoop.queue.add(function() {
				if(_g._errorMap != null) try {
					_g._resolve(_g._errorMap(error));
				} catch( e1 ) {
					if (e1 instanceof js__$Boot_HaxeError) e1 = e1.val;
					update_errors(e1);
				} else update_errors(error);
			});
			promhx_base_EventLoop.continueOnNextLoop();
		}
	}
	,then: function(f) {
		var ret = new promhx_base_AsyncBase();
		promhx_base_AsyncBase.link(this,ret,f);
		return ret;
	}
	,unlink: function(to) {
		var _g = this;
		promhx_base_EventLoop.queue.add(function() {
			_g._update = _g._update.filter(function(x) {
				return x.async != to;
			});
		});
		promhx_base_EventLoop.continueOnNextLoop();
	}
	,isLinked: function(to) {
		var updated = false;
		var _g = 0;
		var _g1 = this._update;
		while(_g < _g1.length) {
			var u = _g1[_g];
			++_g;
			if(u.async == to) return true;
		}
		return updated;
	}
};
var promhx_Deferred = $hx_exports.promhx.Deferred = function() {
	promhx_base_AsyncBase.call(this);
};
promhx_Deferred.__name__ = ["promhx","Deferred"];
promhx_Deferred.__super__ = promhx_base_AsyncBase;
promhx_Deferred.prototype = $extend(promhx_base_AsyncBase.prototype,{
	resolve: function(val) {
		this.handleResolve(val);
	}
	,throwError: function(e) {
		this.handleError(e);
	}
	,promise: function() {
		return new promhx_Promise(this);
	}
	,stream: function() {
		return new promhx_Stream(this);
	}
	,publicStream: function() {
		return new promhx_PublicStream(this);
	}
});
var promhx_Promise = $hx_exports.promhx.Promise = function(d) {
	promhx_base_AsyncBase.call(this,d);
	this._rejected = false;
};
promhx_Promise.__name__ = ["promhx","Promise"];
promhx_Promise.whenAll = function(itb) {
	var ret = new promhx_Promise();
	promhx_base_AsyncBase.linkAll(itb,ret);
	return ret;
};
promhx_Promise.promise = function(_val) {
	var ret = new promhx_Promise();
	ret.handleResolve(_val);
	return ret;
};
promhx_Promise.__super__ = promhx_base_AsyncBase;
promhx_Promise.prototype = $extend(promhx_base_AsyncBase.prototype,{
	isRejected: function() {
		return this._rejected;
	}
	,reject: function(e) {
		this._rejected = true;
		this.handleError(e);
	}
	,handleResolve: function(val) {
		if(this._resolved) {
			var msg = "Promise has already been resolved";
			throw new js__$Boot_HaxeError(promhx_error_PromiseError.AlreadyResolved(msg));
		}
		this._resolve(val);
	}
	,then: function(f) {
		var ret = new promhx_Promise();
		promhx_base_AsyncBase.link(this,ret,f);
		return ret;
	}
	,unlink: function(to) {
		var _g = this;
		promhx_base_EventLoop.queue.add(function() {
			if(!_g._fulfilled) {
				var msg = "Downstream Promise is not fullfilled";
				_g.handleError(promhx_error_PromiseError.DownstreamNotFullfilled(msg));
			} else _g._update = _g._update.filter(function(x) {
				return x.async != to;
			});
		});
		promhx_base_EventLoop.continueOnNextLoop();
	}
	,handleError: function(error) {
		this._rejected = true;
		this._handleError(error);
	}
	,pipe: function(f) {
		var ret = new promhx_Promise();
		promhx_base_AsyncBase.pipeLink(this,ret,f);
		return ret;
	}
	,errorPipe: function(f) {
		var ret = new promhx_Promise();
		this.catchError(function(e) {
			var piped = f(e);
			piped.then($bind(ret,ret._resolve));
		});
		this.then($bind(ret,ret._resolve));
		return ret;
	}
});
var promhx_Stream = $hx_exports.promhx.Stream = function(d) {
	promhx_base_AsyncBase.call(this,d);
	this._end_deferred = new promhx_Deferred();
	this._end_promise = this._end_deferred.promise();
};
promhx_Stream.__name__ = ["promhx","Stream"];
promhx_Stream.foreach = function(itb) {
	var s = new promhx_Stream();
	var $it0 = $iterator(itb)();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		s.handleResolve(i);
	}
	s.end();
	return s;
};
promhx_Stream.wheneverAll = function(itb) {
	var ret = new promhx_Stream();
	promhx_base_AsyncBase.linkAll(itb,ret);
	return ret;
};
promhx_Stream.concatAll = function(itb) {
	var ret = new promhx_Stream();
	var $it0 = $iterator(itb)();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		ret.concat(i);
	}
	return ret;
};
promhx_Stream.mergeAll = function(itb) {
	var ret = new promhx_Stream();
	var $it0 = $iterator(itb)();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		ret.merge(i);
	}
	return ret;
};
promhx_Stream.stream = function(_val) {
	var ret = new promhx_Stream();
	ret.handleResolve(_val);
	return ret;
};
promhx_Stream.__super__ = promhx_base_AsyncBase;
promhx_Stream.prototype = $extend(promhx_base_AsyncBase.prototype,{
	then: function(f) {
		var ret = new promhx_Stream();
		promhx_base_AsyncBase.link(this,ret,f);
		this._end_promise.then(function(x) {
			ret.end();
		});
		return ret;
	}
	,detachStream: function(str) {
		var filtered = [];
		var removed = false;
		var _g = 0;
		var _g1 = this._update;
		while(_g < _g1.length) {
			var u = _g1[_g];
			++_g;
			if(u.async == str) removed = true; else filtered.push(u);
		}
		this._update = filtered;
		return removed;
	}
	,first: function() {
		var s = new promhx_Promise();
		this.then(function(x) {
			if(!s._resolved) s.handleResolve(x);
		});
		return s;
	}
	,handleResolve: function(val) {
		if(!this._end && !this._pause) this._resolve(val);
	}
	,pause: function(set) {
		if(set == null) set = !this._pause;
		this._pause = set;
	}
	,pipe: function(f) {
		var ret = new promhx_Stream();
		promhx_base_AsyncBase.pipeLink(this,ret,f);
		this._end_promise.then(function(x) {
			ret.end();
		});
		return ret;
	}
	,errorPipe: function(f) {
		var ret = new promhx_Stream();
		this.catchError(function(e) {
			var piped = f(e);
			piped.then($bind(ret,ret._resolve));
			piped._end_promise.then(($_=ret._end_promise,$bind($_,$_._resolve)));
		});
		this.then($bind(ret,ret._resolve));
		this._end_promise.then(function(x) {
			ret.end();
		});
		return ret;
	}
	,handleEnd: function() {
		if(this._pending) {
			promhx_base_EventLoop.queue.add($bind(this,this.handleEnd));
			promhx_base_EventLoop.continueOnNextLoop();
		} else if(this._end_promise._resolved) return; else {
			this._end = true;
			var o;
			if(this._resolved) o = haxe_ds_Option.Some(this._val); else o = haxe_ds_Option.None;
			this._end_promise.handleResolve(o);
			this._update = [];
			this._error = [];
		}
	}
	,end: function() {
		promhx_base_EventLoop.queue.add($bind(this,this.handleEnd));
		promhx_base_EventLoop.continueOnNextLoop();
		return this;
	}
	,endThen: function(f) {
		return this._end_promise.then(f);
	}
	,filter: function(f) {
		var ret = new promhx_Stream();
		this._update.push({ async : ret, linkf : function(x) {
			if(f(x)) ret.handleResolve(x);
		}});
		promhx_base_AsyncBase.immediateLinkUpdate(this,ret,function(x1) {
			return x1;
		});
		return ret;
	}
	,concat: function(s) {
		var ret = new promhx_Stream();
		this._update.push({ async : ret, linkf : $bind(ret,ret.handleResolve)});
		promhx_base_AsyncBase.immediateLinkUpdate(this,ret,function(x) {
			return x;
		});
		this._end_promise.then(function(_) {
			s.pipe(function(x1) {
				ret.handleResolve(x1);
				return ret;
			});
			s._end_promise.then(function(_1) {
				ret.end();
			});
		});
		return ret;
	}
	,merge: function(s) {
		var ret = new promhx_Stream();
		this._update.push({ async : ret, linkf : $bind(ret,ret.handleResolve)});
		s._update.push({ async : ret, linkf : $bind(ret,ret.handleResolve)});
		promhx_base_AsyncBase.immediateLinkUpdate(this,ret,function(x) {
			return x;
		});
		promhx_base_AsyncBase.immediateLinkUpdate(s,ret,function(x1) {
			return x1;
		});
		return ret;
	}
});
var promhx_PublicStream = $hx_exports.promhx.PublicStream = function(def) {
	promhx_Stream.call(this,def);
};
promhx_PublicStream.__name__ = ["promhx","PublicStream"];
promhx_PublicStream.publicstream = function(val) {
	var ps = new promhx_PublicStream();
	ps.handleResolve(val);
	return ps;
};
promhx_PublicStream.__super__ = promhx_Stream;
promhx_PublicStream.prototype = $extend(promhx_Stream.prototype,{
	resolve: function(val) {
		this.handleResolve(val);
	}
	,throwError: function(e) {
		this.handleError(e);
	}
	,update: function(val) {
		this.handleResolve(val);
	}
});
var promhx_base_EventLoop = function() { };
promhx_base_EventLoop.__name__ = ["promhx","base","EventLoop"];
promhx_base_EventLoop.enqueue = function(eqf) {
	promhx_base_EventLoop.queue.add(eqf);
	promhx_base_EventLoop.continueOnNextLoop();
};
promhx_base_EventLoop.set_nextLoop = function(f) {
	if(promhx_base_EventLoop.nextLoop != null) throw new js__$Boot_HaxeError("nextLoop has already been set"); else promhx_base_EventLoop.nextLoop = f;
	return promhx_base_EventLoop.nextLoop;
};
promhx_base_EventLoop.queueEmpty = function() {
	return promhx_base_EventLoop.queue.isEmpty();
};
promhx_base_EventLoop.finish = function(max_iterations) {
	if(max_iterations == null) max_iterations = 1000;
	var fn = null;
	while(max_iterations-- > 0 && (fn = promhx_base_EventLoop.queue.pop()) != null) fn();
	return promhx_base_EventLoop.queue.isEmpty();
};
promhx_base_EventLoop.clear = function() {
	promhx_base_EventLoop.queue = new List();
};
promhx_base_EventLoop.f = function() {
	var fn = promhx_base_EventLoop.queue.pop();
	if(fn != null) fn();
	if(!promhx_base_EventLoop.queue.isEmpty()) promhx_base_EventLoop.continueOnNextLoop();
};
promhx_base_EventLoop.continueOnNextLoop = function() {
	if(promhx_base_EventLoop.nextLoop != null) promhx_base_EventLoop.nextLoop(promhx_base_EventLoop.f); else setImmediate(promhx_base_EventLoop.f);
};
var promhx_error_PromiseError = { __ename__ : true, __constructs__ : ["AlreadyResolved","DownstreamNotFullfilled"] };
promhx_error_PromiseError.AlreadyResolved = function(message) { var $x = ["AlreadyResolved",0,message]; $x.__enum__ = promhx_error_PromiseError; $x.toString = $estr; return $x; };
promhx_error_PromiseError.DownstreamNotFullfilled = function(message) { var $x = ["DownstreamNotFullfilled",1,message]; $x.__enum__ = promhx_error_PromiseError; $x.toString = $estr; return $x; };
var verb_Verb = function() { };
verb_Verb.__name__ = ["verb","Verb"];
verb_Verb.main = function() {
	haxe_Log.trace("verb 0.2.0",{ fileName : "Verb.hx", lineNumber : 56, className : "verb.Verb", methodName : "main"});
};
var verb_core_KnotMultiplicity = $hx_exports.core.KnotMultiplicity = function(knot,mult) {
	this.knot = knot;
	this.mult = mult;
};
verb_core_KnotMultiplicity.__name__ = ["verb","core","KnotMultiplicity"];
verb_core_KnotMultiplicity.prototype = {
	inc: function() {
		this.mult++;
	}
};
var verb_core_Analyze = $hx_exports.core.Analyze = function() { };
verb_core_Analyze.__name__ = ["verb","core","Analyze"];
verb_core_Analyze.knotMultiplicities = function(knots) {
	var mults = [new verb_core_KnotMultiplicity(knots[0],0)];
	var curr = mults[0];
	var _g = 0;
	while(_g < knots.length) {
		var knot = knots[_g];
		++_g;
		if(Math.abs(knot - curr.knot) > 1e-10) {
			curr = new verb_core_KnotMultiplicity(knot,0);
			mults.push(curr);
		}
		curr.inc();
	}
	return mults;
};
verb_core_Analyze.isRationalSurfaceClosed = function(surface,uDir) {
	if(uDir == null) uDir = true;
	var cpts;
	if(uDir) cpts = surface.controlPoints; else cpts = verb_core_Mat.transpose(surface.controlPoints);
	var _g1 = 0;
	var _g = cpts[0].length;
	while(_g1 < _g) {
		var i = _g1++;
		var test = verb_core_Vec.dist(cpts[0][i],cpts[cpts.length - 1][i]) < 1e-10;
		if(!test) return false;
	}
	return true;
};
verb_core_Analyze.rationalSurfaceClosestPoint = function(surface,p) {
	var uv = verb_core_Analyze.rationalSurfaceClosestParam(surface,p);
	return verb_core_Eval.rationalSurfacePoint(surface,uv[0],uv[1]);
};
verb_core_Analyze.rationalSurfaceClosestParam = function(surface,p) {
	var maxits = 5;
	var i = 0;
	var e;
	var eps1 = 0.0001;
	var eps2 = 0.0005;
	var dif;
	var minu = surface.knotsU[0];
	var maxu = verb_core_ArrayExtensions.last(surface.knotsU);
	var minv = surface.knotsV[0];
	var maxv = verb_core_ArrayExtensions.last(surface.knotsV);
	var closedu = verb_core_Analyze.isRationalSurfaceClosed(surface);
	var closedv = verb_core_Analyze.isRationalSurfaceClosed(surface,false);
	var cuv;
	var tess = verb_core_Tess.rationalSurfaceAdaptive(surface,new verb_core_types_AdaptiveRefinementOptions());
	var dmin = Infinity;
	var _g1 = 0;
	var _g = tess.points.length;
	while(_g1 < _g) {
		var i1 = _g1++;
		var x = tess.points[i1];
		var d1 = verb_core_Vec.normSquared(verb_core_Vec.sub(p,x));
		if(d1 < dmin) {
			dmin = d1;
			cuv = tess.uvs[i1];
		}
	}
	var f = function(uv) {
		return verb_core_Eval.rationalSurfaceDerivatives(surface,uv[0],uv[1],2);
	};
	var n = function(uv1,e1,r) {
		var Su = e1[1][0];
		var Sv = e1[0][1];
		var Suu = e1[2][0];
		var Svv = e1[0][2];
		var Suv = e1[1][1];
		var Svu = e1[1][1];
		var f1 = verb_core_Vec.dot(Su,r);
		var g = verb_core_Vec.dot(Sv,r);
		var k = [-f1,-g];
		var J00 = verb_core_Vec.dot(Su,Su) + verb_core_Vec.dot(Suu,r);
		var J01 = verb_core_Vec.dot(Su,Sv) + verb_core_Vec.dot(Suv,r);
		var J10 = verb_core_Vec.dot(Su,Sv) + verb_core_Vec.dot(Svu,r);
		var J11 = verb_core_Vec.dot(Sv,Sv) + verb_core_Vec.dot(Svv,r);
		var J = [[J00,J01],[J10,J11]];
		var d = verb_core_Mat.solve(J,k);
		return verb_core_Vec.add(d,uv1);
	};
	while(i < maxits) {
		e = f(cuv);
		dif = verb_core_Vec.sub(e[0][0],p);
		var c1v = verb_core_Vec.norm(dif);
		var c2an = verb_core_Vec.dot(e[1][0],dif);
		var c2ad = verb_core_Vec.norm(e[1][0]) * c1v;
		var c2bn = verb_core_Vec.dot(e[0][1],dif);
		var c2bd = verb_core_Vec.norm(e[0][1]) * c1v;
		var c2av = c2an / c2ad;
		var c2bv = c2bn / c2bd;
		var c1 = c1v < eps1;
		var c2a = c2av < eps2;
		var c2b = c2bv < eps2;
		if(c1 && c2a && c2b) return cuv;
		var ct = n(cuv,e,dif);
		if(ct[0] < minu) if(closedu) ct = [maxu - (ct[0] - minu),ct[1]]; else ct = [minu + 1e-10,ct[1]]; else if(ct[0] > maxu) if(closedu) ct = [minu + (ct[0] - maxu),ct[1]]; else ct = [maxu - 1e-10,ct[1]];
		if(ct[1] < minv) if(closedv) ct = [ct[0],maxv - (ct[1] - minv)]; else ct = [ct[0],minv + 1e-10]; else if(ct[1] > maxv) if(closedv) ct = [ct[0],minv + (ct[0] - maxv)]; else ct = [ct[0],maxv - 1e-10];
		var c3v0 = verb_core_Vec.norm(verb_core_Vec.mul(ct[0] - cuv[0],e[1][0]));
		var c3v1 = verb_core_Vec.norm(verb_core_Vec.mul(ct[1] - cuv[1],e[0][1]));
		if(c3v0 + c3v1 < eps1) return cuv;
		cuv = ct;
		i++;
	}
	return cuv;
};
verb_core_Analyze.rationalCurveClosestPoint = function(curve,p) {
	return verb_core_Eval.rationalCurvePoint(curve,verb_core_Analyze.rationalCurveClosestParam(curve,p));
};
verb_core_Analyze.rationalCurveClosestParam = function(curve,p) {
	var min = Infinity;
	var u = 0.0;
	var pts = verb_core_Tess.rationalCurveRegularSample(curve,curve.controlPoints.length * curve.degree,true);
	var _g1 = 0;
	var _g = pts.length - 1;
	while(_g1 < _g) {
		var i1 = _g1++;
		var u0 = pts[i1][0];
		var u11 = pts[i1 + 1][0];
		var p0 = pts[i1].slice(1);
		var p1 = pts[i1 + 1].slice(1);
		var proj = verb_core_Trig.segmentClosestPoint(p,p0,p1,u0,u11);
		var d1 = verb_core_Vec.norm(verb_core_Vec.sub(p,proj.pt));
		if(d1 < min) {
			min = d1;
			u = proj.u;
		}
	}
	var maxits = 5;
	var i = 0;
	var e;
	var eps1 = 0.0001;
	var eps2 = 0.0005;
	var dif;
	var minu = curve.knots[0];
	var maxu = verb_core_ArrayExtensions.last(curve.knots);
	var closed = verb_core_Vec.normSquared(verb_core_Vec.sub(curve.controlPoints[0],verb_core_ArrayExtensions.last(curve.controlPoints))) < 1e-10;
	var cu = u;
	var f = function(u1) {
		return verb_core_Eval.rationalCurveDerivatives(curve,u1,2);
	};
	var n = function(u2,e1,d) {
		var f1 = verb_core_Vec.dot(e1[1],d);
		var s0 = verb_core_Vec.dot(e1[2],d);
		var s1 = verb_core_Vec.dot(e1[1],e1[1]);
		var df = s0 + s1;
		return u2 - f1 / df;
	};
	while(i < maxits) {
		e = f(cu);
		dif = verb_core_Vec.sub(e[0],p);
		var c1v = verb_core_Vec.norm(dif);
		var c2n = verb_core_Vec.dot(e[1],dif);
		var c2d = verb_core_Vec.norm(e[1]) * c1v;
		var c2v = c2n / c2d;
		var c1 = c1v < eps1;
		var c2 = Math.abs(c2v) < eps2;
		if(c1 && c2) return cu;
		var ct = n(cu,e,dif);
		if(ct < minu) if(closed) ct = maxu - (ct - minu); else ct = minu; else if(ct > maxu) if(closed) ct = minu + (ct - maxu); else ct = maxu;
		var c3v = verb_core_Vec.norm(verb_core_Vec.mul(ct - cu,e[1]));
		if(c3v < eps1) return cu;
		cu = ct;
		i++;
	}
	return cu;
};
verb_core_Analyze.rationalCurveParamAtArcLength = function(curve,len,tol,beziers,bezierLengths) {
	if(tol == null) tol = 1e-3;
	if(len < 1e-10) return curve.knots[0];
	var crvs;
	if(beziers != null) crvs = beziers; else crvs = verb_core_Modify.decomposeCurveIntoBeziers(curve);
	var i = 0;
	var cc = crvs[i];
	var cl = -1e-10;
	var bezier_lengths;
	if(bezierLengths != null) bezier_lengths = bezierLengths; else bezier_lengths = [];
	while(cl < len && i < crvs.length) {
		if(i < bezier_lengths.length) bezier_lengths[i] = bezier_lengths[i]; else bezier_lengths[i] = verb_core_Analyze.rationalBezierCurveArcLength(curve);
		cl += bezier_lengths[i];
		if(len < cl + 1e-10) return verb_core_Analyze.rationalBezierCurveParamAtArcLength(curve,len,tol,bezier_lengths[i]);
		i++;
	}
	return -1;
};
verb_core_Analyze.rationalBezierCurveParamAtArcLength = function(curve,len,tol,totalLength) {
	if(len < 0) return curve.knots[0];
	var totalLen;
	if(totalLength != null) totalLen = totalLength; else totalLen = verb_core_Analyze.rationalBezierCurveArcLength(curve);
	if(len > totalLen) return verb_core_ArrayExtensions.last(curve.knots);
	var start_p = curve.knots[0];
	var start_l = 0.0;
	var end_p = verb_core_ArrayExtensions.last(curve.knots);
	var end_l = totalLen;
	var mid_p = 0.0;
	var mid_l = 0.0;
	var tol1;
	if(tol != null) tol1 = tol; else tol1 = 2e-06;
	while(end_l - start_l > tol1) {
		mid_p = (start_p + end_p) / 2;
		mid_l = verb_core_Analyze.rationalBezierCurveArcLength(curve,mid_p);
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
verb_core_Analyze.rationalCurveArcLength = function(curve,u,gaussDegIncrease) {
	if(gaussDegIncrease == null) gaussDegIncrease = 16;
	if(u == null) u = verb_core_ArrayExtensions.last(curve.knots); else u = u;
	var crvs = verb_core_Modify.decomposeCurveIntoBeziers(curve);
	var i = 0;
	var cc = crvs[0];
	var sum = 0.0;
	while(i < crvs.length && cc.knots[0] + 1e-10 < u) {
		var param = Math.min(verb_core_ArrayExtensions.last(cc.knots),u);
		sum += verb_core_Analyze.rationalBezierCurveArcLength(cc,param,gaussDegIncrease);
		cc = crvs[++i];
	}
	return sum;
};
verb_core_Analyze.rationalBezierCurveArcLength = function(curve,u,gaussDegIncrease) {
	if(gaussDegIncrease == null) gaussDegIncrease = 16;
	var u1;
	if(u == null) u1 = verb_core_ArrayExtensions.last(curve.knots); else u1 = u;
	var z = (u1 - curve.knots[0]) / 2;
	var sum = 0.0;
	var gaussDeg = curve.degree + gaussDegIncrease;
	var cu;
	var tan;
	var _g = 0;
	while(_g < gaussDeg) {
		var i = _g++;
		cu = z * verb_core_Analyze.Tvalues[gaussDeg][i] + z + curve.knots[0];
		tan = verb_core_Eval.rationalCurveDerivatives(curve,cu,1);
		sum += verb_core_Analyze.Cvalues[gaussDeg][i] * verb_core_Vec.norm(tan[1]);
	}
	return z * sum;
};
var verb_core_ArrayExtensions = function() { };
verb_core_ArrayExtensions.__name__ = ["verb","core","ArrayExtensions"];
verb_core_ArrayExtensions.alloc = function(a,l) {
	if(l < 0) return;
	while(a.length < l) a.push(null);
};
verb_core_ArrayExtensions.reversed = function(a) {
	var ac = a.slice();
	ac.reverse();
	return ac;
};
verb_core_ArrayExtensions.last = function(a) {
	return a[a.length - 1];
};
verb_core_ArrayExtensions.first = function(a) {
	return a[0];
};
verb_core_ArrayExtensions.spliceAndInsert = function(a,start,end,ele) {
	a.splice(start,end);
	a.splice(start,0,ele);
};
verb_core_ArrayExtensions.left = function(arr) {
	if(arr.length == 0) return [];
	var len = Math.ceil(arr.length / 2);
	return arr.slice(0,len);
};
verb_core_ArrayExtensions.right = function(arr) {
	if(arr.length == 0) return [];
	var len = Math.ceil(arr.length / 2);
	return arr.slice(len);
};
verb_core_ArrayExtensions.rightWithPivot = function(arr) {
	if(arr.length == 0) return [];
	var len = Math.ceil(arr.length / 2);
	return arr.slice(len - 1);
};
verb_core_ArrayExtensions.unique = function(arr,comp) {
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
var verb_core_Binomial = function() { };
verb_core_Binomial.__name__ = ["verb","core","Binomial"];
verb_core_Binomial.get = function(n,k) {
	if(k == 0.0) return 1.0;
	if(n == 0 || k > n) return 0.0;
	if(k > n - k) k = n - k;
	if(verb_core_Binomial.memo_exists(n,k)) return verb_core_Binomial.get_memo(n,k);
	var r = 1;
	var n_o = n;
	var _g1 = 1;
	var _g = k + 1;
	while(_g1 < _g) {
		var d = _g1++;
		if(verb_core_Binomial.memo_exists(n_o,d)) {
			n--;
			r = verb_core_Binomial.get_memo(n_o,d);
			continue;
		}
		r *= n--;
		r /= d;
		verb_core_Binomial.memoize(n_o,d,r);
	}
	return r;
};
verb_core_Binomial.get_no_memo = function(n,k) {
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
verb_core_Binomial.memo_exists = function(n,k) {
	return verb_core_Binomial.memo.h.hasOwnProperty(n) && verb_core_Binomial.memo.h[n].h.hasOwnProperty(k);
};
verb_core_Binomial.get_memo = function(n,k) {
	return verb_core_Binomial.memo.h[n].h[k];
};
verb_core_Binomial.memoize = function(n,k,val) {
	if(!verb_core_Binomial.memo.h.hasOwnProperty(n)) verb_core_Binomial.memo.set(n,new haxe_ds_IntMap());
	verb_core_Binomial.memo.h[n].h[k] = val;
};
var verb_core_Check = $hx_exports.core.Check = function() { };
verb_core_Check.__name__ = ["verb","core","Check"];
verb_core_Check.isValidKnotVector = function(vec,degree) {
	if(vec.length == 0) return false;
	if(vec.length < (degree + 1) * 2) return false;
	var rep = vec[0];
	var _g1 = 0;
	var _g = degree + 1;
	while(_g1 < _g) {
		var i = _g1++;
		if(Math.abs(vec[i] - rep) > 1e-10) return false;
	}
	rep = vec[vec.length - 1];
	var _g11 = vec.length - degree - 1;
	var _g2 = vec.length;
	while(_g11 < _g2) {
		var i1 = _g11++;
		if(Math.abs(vec[i1] - rep) > 1e-10) return false;
	}
	return verb_core_Check.isNonDecreasing(vec);
};
verb_core_Check.isNonDecreasing = function(vec) {
	var rep = vec[0];
	var _g1 = 0;
	var _g = vec.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(vec[i] < rep - 1e-10) return false;
		rep = vec[i];
	}
	return true;
};
verb_core_Check.nurbsCurveData = function(data) {
	if(data.controlPoints == null) throw new js__$Boot_HaxeError("Control points array cannot be null!");
	if(data.degree == null) throw new js__$Boot_HaxeError("Degree cannot be null!");
	if(data.degree < 1) throw new js__$Boot_HaxeError("Degree must be greater than 1!");
	if(data.knots == null) throw new js__$Boot_HaxeError("Knots cannot be null!");
	if(data.knots.length != data.controlPoints.length + data.degree + 1) throw new js__$Boot_HaxeError("controlPoints.length + degree + 1 must equal knots.length!");
	if(!verb_core_Check.isValidKnotVector(data.knots,data.degree)) throw new js__$Boot_HaxeError("Invalid knot vector format!  Should begin with degree + 1 repeats and end with degree + 1 repeats!");
	return data;
};
verb_core_Check.nurbsSurfaceData = function(data) {
	if(data.controlPoints == null) throw new js__$Boot_HaxeError("Control points array cannot be null!");
	if(data.degreeU == null) throw new js__$Boot_HaxeError("DegreeU cannot be null!");
	if(data.degreeV == null) throw new js__$Boot_HaxeError("DegreeV cannot be null!");
	if(data.degreeU < 1) throw new js__$Boot_HaxeError("DegreeU must be greater than 1!");
	if(data.degreeV < 1) throw new js__$Boot_HaxeError("DegreeV must be greater than 1!");
	if(data.knotsU == null) throw new js__$Boot_HaxeError("KnotsU cannot be null!");
	if(data.knotsV == null) throw new js__$Boot_HaxeError("KnotsV cannot be null!");
	if(data.knotsU.length != data.controlPoints.length + data.degreeU + 1) throw new js__$Boot_HaxeError("controlPointsU.length + degreeU + 1 must equal knotsU.length!");
	if(data.knotsV.length != data.controlPoints[0].length + data.degreeV + 1) throw new js__$Boot_HaxeError("controlPointsV.length + degreeV + 1 must equal knotsV.length!");
	if(!verb_core_Check.isValidKnotVector(data.knotsU,data.degreeU) || !verb_core_Check.isValidKnotVector(data.knotsV,data.degreeV)) throw new js__$Boot_HaxeError("Invalid knot vector format!  Should begin with degree + 1 repeats and end with degree + 1 repeats!");
	return data;
};
var verb_core_Constants = $hx_exports.core.Constants = function() { };
verb_core_Constants.__name__ = ["verb","core","Constants"];
var verb_core_Divide = $hx_exports.core.Divide = function() { };
verb_core_Divide.__name__ = ["verb","core","Divide"];
verb_core_Divide.rationalCurveByEqualArcLength = function(curve,num) {
	var tlen = verb_core_Analyze.rationalCurveArcLength(curve);
	var inc = tlen / num;
	return verb_core_Divide.rationalCurveByArcLength(curve,inc);
};
verb_core_Divide.rationalCurveByArcLength = function(curve,l) {
	var crvs = verb_core_Modify.decomposeCurveIntoBeziers(curve);
	var crvlens = crvs.map(function(x) {
		return verb_core_Analyze.rationalBezierCurveArcLength(x);
	});
	var totlen = verb_core_Vec.sum(crvlens);
	var pts = [new verb_core_types_CurveLengthSample(curve.knots[0],0.0)];
	if(l > totlen) return pts;
	var inc = l;
	var i = 0;
	var lc = inc;
	var runsum = 0.0;
	var runsum1 = 0.0;
	var u;
	while(i < crvs.length) {
		runsum += crvlens[i];
		while(lc < runsum + 1e-10) {
			u = verb_core_Analyze.rationalBezierCurveParamAtArcLength(crvs[i],lc - runsum1,1e-6,crvlens[i]);
			pts.push(new verb_core_types_CurveLengthSample(u,lc));
			lc += inc;
		}
		runsum1 += crvlens[i];
		i++;
	}
	return pts;
};
var verb_core_Eval = $hx_exports.core.Eval = function() { };
verb_core_Eval.__name__ = ["verb","core","Eval"];
verb_core_Eval.volumePoint = function(volume,u,v,w) {
	var n = volume.knotsU.length - volume.degreeU - 2;
	var m = volume.knotsV.length - volume.degreeV - 2;
	var l = volume.knotsW.length - volume.degreeW - 2;
	return verb_core_Eval.volumePointGivenNML(volume,n,m,l,u,v,w);
};
verb_core_Eval.volumePointGivenNML = function(volume,n,m,l,u,v,w) {
	if(!verb_core_Eval.areValidRelations(volume.degreeU,volume.controlPoints.length,volume.knotsU.length) || !verb_core_Eval.areValidRelations(volume.degreeV,volume.controlPoints[0].length,volume.knotsV.length) || !verb_core_Eval.areValidRelations(volume.degreeW,volume.controlPoints[0][0].length,volume.knotsW.length)) throw new js__$Boot_HaxeError("Invalid relations between control points and knot vector");
	var controlPoints = volume.controlPoints;
	var degreeU = volume.degreeU;
	var degreeV = volume.degreeV;
	var degreeW = volume.degreeW;
	var knotsU = volume.knotsU;
	var knotsV = volume.knotsV;
	var knotsW = volume.knotsW;
	var dim = controlPoints[0][0][0].length;
	var knotSpan_index_u = verb_core_Eval.knotSpanGivenN(n,degreeU,u,knotsU);
	var knotSpan_index_v = verb_core_Eval.knotSpanGivenN(m,degreeV,v,knotsV);
	var knotSpan_index_w = verb_core_Eval.knotSpanGivenN(l,degreeW,w,knotsW);
	var u_basis_vals = verb_core_Eval.basisFunctionsGivenKnotSpanIndex(knotSpan_index_u,u,degreeU,knotsU);
	var v_basis_vals = verb_core_Eval.basisFunctionsGivenKnotSpanIndex(knotSpan_index_v,v,degreeV,knotsV);
	var w_basis_vals = verb_core_Eval.basisFunctionsGivenKnotSpanIndex(knotSpan_index_w,w,degreeW,knotsW);
	var uind = knotSpan_index_u - degreeU;
	var position = verb_core_Vec.zeros1d(dim);
	var temp = verb_core_Vec.zeros1d(dim);
	var temp2 = verb_core_Vec.zeros1d(dim);
	var _g1 = 0;
	var _g = degreeW + 1;
	while(_g1 < _g) {
		var i = _g1++;
		temp2 = verb_core_Vec.zeros1d(dim);
		var wind = knotSpan_index_w - degreeW + i;
		var _g3 = 0;
		var _g2 = degreeV + 1;
		while(_g3 < _g2) {
			var j = _g3++;
			temp = verb_core_Vec.zeros1d(dim);
			var vind = knotSpan_index_v - degreeV + j;
			var _g5 = 0;
			var _g4 = degreeU + 1;
			while(_g5 < _g4) {
				var k = _g5++;
				temp = verb_core_Vec.add(temp,verb_core_Vec.mul(u_basis_vals[k],controlPoints[uind + k][vind][wind]));
			}
			temp2 = verb_core_Vec.add(temp2,verb_core_Vec.mul(v_basis_vals[j],temp));
		}
		position = verb_core_Vec.add(position,verb_core_Vec.mul(w_basis_vals[i],temp2));
	}
	return position;
};
verb_core_Eval.rationalCurveTangent = function(curve,u) {
	var derivs = verb_core_Eval.rationalCurveDerivatives(curve,u,1);
	return derivs[1];
};
verb_core_Eval.rationalSurfaceNormal = function(surface,u,v) {
	var derivs = verb_core_Eval.rationalSurfaceDerivatives(surface,u,v,1);
	return verb_core_Vec.cross(derivs[1][0],derivs[0][1]);
};
verb_core_Eval.rationalSurfaceDerivatives = function(surface,u,v,numDerivs) {
	if(numDerivs == null) numDerivs = 1;
	var ders = verb_core_Eval.surfaceDerivatives(surface,u,v,numDerivs);
	var Aders = verb_core_Eval.rational2d(ders);
	var wders = verb_core_Eval.weight2d(ders);
	var SKL = [];
	var dim = Aders[0][0].length;
	var _g1 = 0;
	var _g = numDerivs + 1;
	while(_g1 < _g) {
		var k = _g1++;
		SKL.push([]);
		var _g3 = 0;
		var _g2 = numDerivs - k + 1;
		while(_g3 < _g2) {
			var l = _g3++;
			var v1 = Aders[k][l];
			var _g5 = 1;
			var _g4 = l + 1;
			while(_g5 < _g4) {
				var j = _g5++;
				v1 = verb_core_Vec.sub(v1,verb_core_Vec.mul(verb_core_Binomial.get(l,j) * wders[0][j],SKL[k][l - j]));
			}
			var _g51 = 1;
			var _g41 = k + 1;
			while(_g51 < _g41) {
				var i = _g51++;
				v1 = verb_core_Vec.sub(v1,verb_core_Vec.mul(verb_core_Binomial.get(k,i) * wders[i][0],SKL[k - i][l]));
				var v2 = verb_core_Vec.zeros1d(dim);
				var _g7 = 1;
				var _g6 = l + 1;
				while(_g7 < _g6) {
					var j1 = _g7++;
					v2 = verb_core_Vec.add(v2,verb_core_Vec.mul(verb_core_Binomial.get(l,j1) * wders[i][j1],SKL[k - i][l - j1]));
				}
				v1 = verb_core_Vec.sub(v1,verb_core_Vec.mul(verb_core_Binomial.get(k,i),v2));
			}
			SKL[k].push(verb_core_Vec.mul(1 / wders[0][0],v1));
		}
	}
	return SKL;
};
verb_core_Eval.rationalSurfacePoint = function(surface,u,v) {
	return verb_core_Eval.dehomogenize(verb_core_Eval.surfacePoint(surface,u,v));
};
verb_core_Eval.rationalCurveDerivatives = function(curve,u,numDerivs) {
	if(numDerivs == null) numDerivs = 1;
	var ders = verb_core_Eval.curveDerivatives(curve,u,numDerivs);
	var Aders = verb_core_Eval.rational1d(ders);
	var wders = verb_core_Eval.weight1d(ders);
	var k = 0;
	var i = 0;
	var CK = [];
	var _g1 = 0;
	var _g = numDerivs + 1;
	while(_g1 < _g) {
		var k1 = _g1++;
		var v = Aders[k1];
		var _g3 = 1;
		var _g2 = k1 + 1;
		while(_g3 < _g2) {
			var i1 = _g3++;
			v = verb_core_Vec.sub(v,verb_core_Vec.mul(verb_core_Binomial.get(k1,i1) * wders[i1],CK[k1 - i1]));
		}
		CK.push(verb_core_Vec.mul(1 / wders[0],v));
	}
	return CK;
};
verb_core_Eval.rationalCurvePoint = function(curve,u) {
	return verb_core_Eval.dehomogenize(verb_core_Eval.curvePoint(curve,u));
};
verb_core_Eval.dehomogenize = function(homoPoint) {
	var dim = homoPoint.length;
	var point = [];
	var wt = homoPoint[dim - 1];
	var l = homoPoint.length - 1;
	var _g = 0;
	while(_g < l) {
		var i = _g++;
		point.push(homoPoint[i] / wt);
	}
	return point;
};
verb_core_Eval.rational1d = function(homoPoints) {
	var dim = homoPoints[0].length - 1;
	return homoPoints.map(function(x) {
		return x.slice(0,dim);
	});
};
verb_core_Eval.rational2d = function(homoPoints) {
	return homoPoints.map(verb_core_Eval.rational1d);
};
verb_core_Eval.weight1d = function(homoPoints) {
	var dim = homoPoints[0].length - 1;
	return homoPoints.map(function(x) {
		return x[dim];
	});
};
verb_core_Eval.weight2d = function(homoPoints) {
	return homoPoints.map(verb_core_Eval.weight1d);
};
verb_core_Eval.dehomogenize1d = function(homoPoints) {
	return homoPoints.map(verb_core_Eval.dehomogenize);
};
verb_core_Eval.dehomogenize2d = function(homoPoints) {
	return homoPoints.map(verb_core_Eval.dehomogenize1d);
};
verb_core_Eval.homogenize1d = function(controlPoints,weights) {
	var rows = controlPoints.length;
	var dim = controlPoints[0].length;
	var homo_controlPoints = [];
	var wt = 0.0;
	var ref_pt = [];
	var weights1;
	if(weights != null) weights1 = weights; else weights1 = verb_core_Vec.rep(controlPoints.length,1.0);
	var _g = 0;
	while(_g < rows) {
		var i = _g++;
		var pt = [];
		ref_pt = controlPoints[i];
		wt = weights1[i];
		var _g1 = 0;
		while(_g1 < dim) {
			var k = _g1++;
			pt.push(ref_pt[k] * wt);
		}
		pt.push(wt);
		homo_controlPoints.push(pt);
	}
	return homo_controlPoints;
};
verb_core_Eval.homogenize2d = function(controlPoints,weights) {
	var rows = controlPoints.length;
	var homo_controlPoints = [];
	var weights1;
	if(weights != null) weights1 = weights; else {
		var _g = [];
		var _g1 = 0;
		while(_g1 < rows) {
			var i = _g1++;
			_g.push(verb_core_Vec.rep(controlPoints[0].length,1.0));
		}
		weights1 = _g;
	}
	var _g11 = 0;
	while(_g11 < rows) {
		var i1 = _g11++;
		homo_controlPoints.push(verb_core_Eval.homogenize1d(controlPoints[i1],weights1[i1]));
	}
	return homo_controlPoints;
};
verb_core_Eval.surfaceDerivatives = function(surface,u,v,numDerivs) {
	var n = surface.knotsU.length - surface.degreeU - 2;
	var m = surface.knotsV.length - surface.degreeV - 2;
	return verb_core_Eval.surfaceDerivativesGivenNM(n,m,surface,u,v,numDerivs);
};
verb_core_Eval.surfaceDerivativesGivenNM = function(n,m,surface,u,v,numDerivs) {
	var degreeU = surface.degreeU;
	var degreeV = surface.degreeV;
	var controlPoints = surface.controlPoints;
	var knotsU = surface.knotsU;
	var knotsV = surface.knotsV;
	if(!verb_core_Eval.areValidRelations(degreeU,controlPoints.length,knotsU.length) || !verb_core_Eval.areValidRelations(degreeV,controlPoints[0].length,knotsV.length)) throw new js__$Boot_HaxeError("Invalid relations between control points, knot vector, and n");
	var dim = controlPoints[0][0].length;
	var du;
	if(numDerivs < degreeU) du = numDerivs; else du = degreeU;
	var dv;
	if(numDerivs < degreeV) dv = numDerivs; else dv = degreeV;
	var SKL = verb_core_Vec.zeros3d(du + 1,dv + 1,dim);
	var knotSpan_index_u = verb_core_Eval.knotSpanGivenN(n,degreeU,u,knotsU);
	var knotSpan_index_v = verb_core_Eval.knotSpanGivenN(m,degreeV,v,knotsV);
	var uders = verb_core_Eval.derivativeBasisFunctionsGivenNI(knotSpan_index_u,u,degreeU,n,knotsU);
	var vders = verb_core_Eval.derivativeBasisFunctionsGivenNI(knotSpan_index_v,v,degreeV,m,knotsV);
	var temp = verb_core_Vec.zeros2d(degreeV + 1,dim);
	var dd = 0;
	var _g1 = 0;
	var _g = du + 1;
	while(_g1 < _g) {
		var k = _g1++;
		var _g3 = 0;
		var _g2 = degreeV + 1;
		while(_g3 < _g2) {
			var s = _g3++;
			temp[s] = verb_core_Vec.zeros1d(dim);
			var _g5 = 0;
			var _g4 = degreeU + 1;
			while(_g5 < _g4) {
				var r = _g5++;
				temp[s] = verb_core_Vec.add(temp[s],verb_core_Vec.mul(uders[k][r],controlPoints[knotSpan_index_u - degreeU + r][knotSpan_index_v - degreeV + s]));
			}
		}
		var nk = numDerivs - k;
		if(nk < dv) dd = nk; else dd = dv;
		var _g31 = 0;
		var _g21 = dd + 1;
		while(_g31 < _g21) {
			var l = _g31++;
			SKL[k][l] = verb_core_Vec.zeros1d(dim);
			var _g51 = 0;
			var _g41 = degreeV + 1;
			while(_g51 < _g41) {
				var s1 = _g51++;
				SKL[k][l] = verb_core_Vec.add(SKL[k][l],verb_core_Vec.mul(vders[l][s1],temp[s1]));
			}
		}
	}
	return SKL;
};
verb_core_Eval.surfacePoint = function(surface,u,v) {
	var n = surface.knotsU.length - surface.degreeU - 2;
	var m = surface.knotsV.length - surface.degreeV - 2;
	return verb_core_Eval.surfacePointGivenNM(n,m,surface,u,v);
};
verb_core_Eval.surfacePointGivenNM = function(n,m,surface,u,v) {
	var degreeU = surface.degreeU;
	var degreeV = surface.degreeV;
	var controlPoints = surface.controlPoints;
	var knotsU = surface.knotsU;
	var knotsV = surface.knotsV;
	if(!verb_core_Eval.areValidRelations(degreeU,controlPoints.length,knotsU.length) || !verb_core_Eval.areValidRelations(degreeV,controlPoints[0].length,knotsV.length)) throw new js__$Boot_HaxeError("Invalid relations between control points, knot vector, and n");
	var dim = controlPoints[0][0].length;
	var knotSpan_index_u = verb_core_Eval.knotSpanGivenN(n,degreeU,u,knotsU);
	var knotSpan_index_v = verb_core_Eval.knotSpanGivenN(m,degreeV,v,knotsV);
	var u_basis_vals = verb_core_Eval.basisFunctionsGivenKnotSpanIndex(knotSpan_index_u,u,degreeU,knotsU);
	var v_basis_vals = verb_core_Eval.basisFunctionsGivenKnotSpanIndex(knotSpan_index_v,v,degreeV,knotsV);
	var uind = knotSpan_index_u - degreeU;
	var vind = knotSpan_index_v;
	var position = verb_core_Vec.zeros1d(dim);
	var temp = verb_core_Vec.zeros1d(dim);
	var _g1 = 0;
	var _g = degreeV + 1;
	while(_g1 < _g) {
		var l = _g1++;
		temp = verb_core_Vec.zeros1d(dim);
		vind = knotSpan_index_v - degreeV + l;
		var _g3 = 0;
		var _g2 = degreeU + 1;
		while(_g3 < _g2) {
			var k = _g3++;
			temp = verb_core_Vec.add(temp,verb_core_Vec.mul(u_basis_vals[k],controlPoints[uind + k][vind]));
		}
		position = verb_core_Vec.add(position,verb_core_Vec.mul(v_basis_vals[l],temp));
	}
	return position;
};
verb_core_Eval.curveDerivatives = function(crv,u,numDerivs) {
	var n = crv.knots.length - crv.degree - 2;
	return verb_core_Eval.curveDerivativesGivenN(n,crv,u,numDerivs);
};
verb_core_Eval.curveDerivativesGivenN = function(n,curve,u,numDerivs) {
	var degree = curve.degree;
	var controlPoints = curve.controlPoints;
	var knots = curve.knots;
	if(!verb_core_Eval.areValidRelations(degree,controlPoints.length,knots.length)) throw new js__$Boot_HaxeError("Invalid relations between control points, knot vector, and n");
	var dim = controlPoints[0].length;
	var du;
	if(numDerivs < degree) du = numDerivs; else du = degree;
	var CK = verb_core_Vec.zeros2d(du + 1,dim);
	var knotSpan_index = verb_core_Eval.knotSpanGivenN(n,degree,u,knots);
	var nders = verb_core_Eval.derivativeBasisFunctionsGivenNI(knotSpan_index,u,degree,du,knots);
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
			CK[k1] = verb_core_Vec.add(CK[k1],verb_core_Vec.mul(nders[k1][j1],controlPoints[knotSpan_index - degree + j1]));
		}
	}
	return CK;
};
verb_core_Eval.curvePoint = function(curve,u) {
	var n = curve.knots.length - curve.degree - 2;
	return verb_core_Eval.curvePointGivenN(n,curve,u);
};
verb_core_Eval.areValidRelations = function(degree,num_controlPoints,knots_length) {
	return num_controlPoints + degree + 1 - knots_length == 0;
};
verb_core_Eval.curvePointGivenN = function(n,curve,u) {
	var degree = curve.degree;
	var controlPoints = curve.controlPoints;
	var knots = curve.knots;
	if(!verb_core_Eval.areValidRelations(degree,controlPoints.length,knots.length)) {
		throw new js__$Boot_HaxeError("Invalid relations between control points, knot Array, and n");
		return null;
	}
	var knotSpan_index = verb_core_Eval.knotSpanGivenN(n,degree,u,knots);
	var basis_values = verb_core_Eval.basisFunctionsGivenKnotSpanIndex(knotSpan_index,u,degree,knots);
	var position = verb_core_Vec.zeros1d(controlPoints[0].length);
	var _g1 = 0;
	var _g = degree + 1;
	while(_g1 < _g) {
		var j = _g1++;
		position = verb_core_Vec.add(position,verb_core_Vec.mul(basis_values[j],controlPoints[knotSpan_index - degree + j]));
	}
	return position;
};
verb_core_Eval.derivativeBasisFunctions = function(u,degree,knots) {
	var knotSpan_index = verb_core_Eval.knotSpan(degree,u,knots);
	var m = knots.length - 1;
	var n = m - degree - 1;
	return verb_core_Eval.derivativeBasisFunctionsGivenNI(knotSpan_index,u,degree,n,knots);
};
verb_core_Eval.derivativeBasisFunctionsGivenNI = function(knotSpan_index,u,p,n,knots) {
	var ndu = verb_core_Vec.zeros2d(p + 1,p + 1);
	var left = verb_core_Vec.zeros1d(p + 1);
	var right = verb_core_Vec.zeros1d(p + 1);
	var saved = 0.0;
	var temp = 0.0;
	ndu[0][0] = 1.0;
	var _g1 = 1;
	var _g = p + 1;
	while(_g1 < _g) {
		var j = _g1++;
		left[j] = u - knots[knotSpan_index + 1 - j];
		right[j] = knots[knotSpan_index + j] - u;
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
	var ders = verb_core_Vec.zeros2d(n + 1,p + 1);
	var a = verb_core_Vec.zeros2d(2,p + 1);
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
verb_core_Eval.basisFunctions = function(u,degree,knots) {
	var knotSpan_index = verb_core_Eval.knotSpan(degree,u,knots);
	return verb_core_Eval.basisFunctionsGivenKnotSpanIndex(knotSpan_index,u,degree,knots);
};
verb_core_Eval.basisFunctionsGivenKnotSpanIndex = function(knotSpan_index,u,degree,knots) {
	var basisFunctions = verb_core_Vec.zeros1d(degree + 1);
	var left = verb_core_Vec.zeros1d(degree + 1);
	var right = verb_core_Vec.zeros1d(degree + 1);
	var saved = 0;
	var temp = 0;
	basisFunctions[0] = 1.0;
	var _g1 = 1;
	var _g = degree + 1;
	while(_g1 < _g) {
		var j = _g1++;
		left[j] = u - knots[knotSpan_index + 1 - j];
		right[j] = knots[knotSpan_index + j] - u;
		saved = 0.0;
		var _g2 = 0;
		while(_g2 < j) {
			var r = _g2++;
			temp = basisFunctions[r] / (right[r + 1] + left[j - r]);
			basisFunctions[r] = saved + right[r + 1] * temp;
			saved = left[j - r] * temp;
		}
		basisFunctions[j] = saved;
	}
	return basisFunctions;
};
verb_core_Eval.knotSpan = function(degree,u,knots) {
	return verb_core_Eval.knotSpanGivenN(knots.length - degree - 2,degree,u,knots);
};
verb_core_Eval.knotSpanGivenN = function(n,degree,u,knots) {
	if(u > knots[n + 1] - 1e-10) return n;
	if(u < knots[degree] + 1e-10) return degree;
	var low = degree;
	var high = n + 1;
	var mid = Math.floor((low + high) / 2);
	while(u < knots[mid] || u >= knots[mid + 1]) {
		if(u < knots[mid]) high = mid; else low = mid;
		mid = Math.floor((low + high) / 2);
	}
	return mid;
};
var verb_core_MarchStepState = { __ename__ : true, __constructs__ : ["OutOfBounds","InsideDomain","AtBoundary","CompleteLoop","CoincidentStartPoint"] };
verb_core_MarchStepState.OutOfBounds = ["OutOfBounds",0];
verb_core_MarchStepState.OutOfBounds.toString = $estr;
verb_core_MarchStepState.OutOfBounds.__enum__ = verb_core_MarchStepState;
verb_core_MarchStepState.InsideDomain = ["InsideDomain",1];
verb_core_MarchStepState.InsideDomain.toString = $estr;
verb_core_MarchStepState.InsideDomain.__enum__ = verb_core_MarchStepState;
verb_core_MarchStepState.AtBoundary = ["AtBoundary",2];
verb_core_MarchStepState.AtBoundary.toString = $estr;
verb_core_MarchStepState.AtBoundary.__enum__ = verb_core_MarchStepState;
verb_core_MarchStepState.CompleteLoop = ["CompleteLoop",3];
verb_core_MarchStepState.CompleteLoop.toString = $estr;
verb_core_MarchStepState.CompleteLoop.__enum__ = verb_core_MarchStepState;
verb_core_MarchStepState.CoincidentStartPoint = ["CoincidentStartPoint",4];
verb_core_MarchStepState.CoincidentStartPoint.toString = $estr;
verb_core_MarchStepState.CoincidentStartPoint.__enum__ = verb_core_MarchStepState;
var verb_core_MarchStep = function(step,olduv0,olduv1,uv0,uv1,oldpoint,point,state,stepCount) {
	this.stepCount = 0;
	this.step = step;
	this.olduv0 = olduv0;
	this.olduv1 = olduv1;
	this.uv0 = uv0;
	this.uv1 = uv1;
	this.oldpoint = oldpoint;
	this.point = point;
	this.state = state;
	this.stepCount = stepCount;
};
verb_core_MarchStep.__name__ = ["verb","core","MarchStep"];
verb_core_MarchStep.outOfBounds = function() {
	return new verb_core_MarchStep(null,null,null,null,null,null,null,verb_core_MarchStepState.OutOfBounds,0);
};
verb_core_MarchStep.init = function(pt) {
	return new verb_core_MarchStep(null,null,null,pt.uv0,pt.uv1,null,pt.point,verb_core_MarchStepState.InsideDomain,0);
};
var verb_core_ExpIntersect = $hx_exports.core.ExpIntersect = function() { };
verb_core_ExpIntersect.__name__ = ["verb","core","ExpIntersect"];
verb_core_ExpIntersect.outsideDomain = function(surface,uv) {
	var u = uv[0];
	var v = uv[1];
	return u < surface.knotsU[0] || v < surface.knotsV[0] || u > verb_core_ArrayExtensions.last(surface.knotsU) || v > verb_core_ArrayExtensions.last(surface.knotsV);
};
verb_core_ExpIntersect.clampToDomain = function(surface,uv) {
	var u = uv[0];
	var v = uv[1];
	if(u < surface.knotsU[0]) u = surface.knotsU[0];
	if(u > verb_core_ArrayExtensions.last(surface.knotsU)) u = verb_core_ArrayExtensions.last(surface.knotsU);
	if(v < surface.knotsV[0]) v = surface.knotsV[0];
	if(v > verb_core_ArrayExtensions.last(surface.knotsV)) u = verb_core_ArrayExtensions.last(surface.knotsV);
	return [u,v];
};
verb_core_ExpIntersect.clampStep = function(surface,uv,step) {
	var u = uv[0];
	var v = uv[1];
	var nu = u + step[0];
	if(nu > verb_core_ArrayExtensions.last(surface.knotsU) + 1e-10) step = verb_core_Vec.mul((verb_core_ArrayExtensions.last(surface.knotsU) - u) / step[0],step); else if(nu < surface.knotsU[0] - 1e-10) step = verb_core_Vec.mul((surface.knotsU[0] - u) / step[0],step);
	var nv = v + step[1];
	if(nv > verb_core_ArrayExtensions.last(surface.knotsV) + 1e-10) step = verb_core_Vec.mul((verb_core_ArrayExtensions.last(surface.knotsV) - v) / step[1],step); else if(nv < surface.knotsV[0] - 1e-10) step = verb_core_Vec.mul((surface.knotsV[0] - v) / step[1],step);
	return step;
};
verb_core_ExpIntersect.march = function(surface0,surface1,prev,currentIndex,allStartPts,tol) {
	var first = allStartPts[currentIndex];
	var uv0 = prev.uv0;
	var uv1 = prev.uv1;
	var derivs0 = verb_core_Eval.rationalSurfaceDerivatives(surface0,uv0[0],uv0[1],1);
	var derivs1 = verb_core_Eval.rationalSurfaceDerivatives(surface1,uv1[0],uv1[1],1);
	var p = derivs0[0][0];
	var q = derivs1[0][0];
	var dfdu = derivs0[1][0];
	var dfdv = derivs0[0][1];
	var dgdu = derivs1[1][0];
	var dgdv = derivs1[0][1];
	var norm0 = verb_core_Vec.cross(dfdu,dfdv);
	var norm1 = verb_core_Vec.cross(dgdu,dgdv);
	var unitStep = verb_core_Vec.normalized(verb_core_Vec.cross(norm0,norm1));
	var stepLength = verb_core_ExpIntersect.INIT_STEP_LENGTH;
	if(prev.oldpoint != null) {
		var denom = Math.acos(verb_core_Vec.dot(verb_core_Vec.normalized(prev.step),unitStep));
		if(Math.abs(denom) < 1e-10) stepLength = verb_core_ExpIntersect.LINEAR_STEP_LENGTH; else {
			var radiusOfCurvature = verb_core_Vec.dist(prev.oldpoint,prev.point) / Math.acos(verb_core_Vec.dot(verb_core_Vec.normalized(prev.step),unitStep));
			var theta = 2 * Math.acos(1 - tol * 4 / radiusOfCurvature);
			stepLength = radiusOfCurvature * Math.tan(theta);
		}
	}
	var step = verb_core_Vec.mul(stepLength,unitStep);
	var x = verb_core_Vec.add(prev.point,step);
	var pdif = verb_core_Vec.sub(x,p);
	var qdif = verb_core_Vec.sub(x,q);
	var rw = verb_core_Vec.cross(dfdu,norm0);
	var rt = verb_core_Vec.cross(dfdv,norm0);
	var su = verb_core_Vec.cross(dgdu,norm1);
	var sv = verb_core_Vec.cross(dgdv,norm1);
	var dw = verb_core_Vec.dot(rt,pdif) / verb_core_Vec.dot(rt,dfdu);
	var dt = verb_core_Vec.dot(rw,pdif) / verb_core_Vec.dot(rw,dfdv);
	var du = verb_core_Vec.dot(sv,qdif) / verb_core_Vec.dot(sv,dgdu);
	var dv = verb_core_Vec.dot(su,qdif) / verb_core_Vec.dot(su,dgdv);
	var stepuv0 = [dw,dt];
	var stepuv1 = [du,dv];
	var newuv0 = verb_core_Vec.add(uv0,stepuv0);
	var newuv1 = verb_core_Vec.add(uv1,stepuv1);
	var state = verb_core_MarchStepState.InsideDomain;
	if(verb_core_ExpIntersect.outsideDomain(surface0,newuv0)) {
		state = verb_core_MarchStepState.AtBoundary;
		var l = verb_core_Vec.norm(stepuv0);
		stepuv0 = verb_core_ExpIntersect.clampStep(surface0,uv0,stepuv0);
		stepuv1 = verb_core_Vec.mul(verb_core_Vec.norm(stepuv0) / l,stepuv1);
	}
	if(verb_core_ExpIntersect.outsideDomain(surface1,newuv1)) {
		state = verb_core_MarchStepState.AtBoundary;
		var l1 = verb_core_Vec.norm(stepuv1);
		stepuv1 = verb_core_ExpIntersect.clampStep(surface1,uv1,stepuv1);
		stepuv0 = verb_core_Vec.mul(verb_core_Vec.norm(stepuv1) / l1,stepuv0);
	}
	newuv0 = verb_core_Vec.add(uv0,stepuv0);
	newuv1 = verb_core_Vec.add(uv1,stepuv1);
	var relaxed = verb_core_Intersect.surfacesAtPointWithEstimate(surface0,surface1,newuv0,newuv1,tol);
	if(prev.stepCount > 5 && prev.olduv0 != null && verb_core_Trig.distToSegment(prev.point,first.point,relaxed.point) < 10 * tol) return new verb_core_MarchStep(step,prev.uv0,prev.uv1,first.uv0,first.uv1,prev.point,first.point,verb_core_MarchStepState.CompleteLoop,prev.stepCount + 1);
	if(prev.stepCount > 5 && verb_core_ExpIntersect.isCoincidentWithStartPoint(relaxed.point,currentIndex,allStartPts,10 * tol)) state = verb_core_MarchStepState.CoincidentStartPoint;
	return new verb_core_MarchStep(step,prev.uv0,prev.uv1,relaxed.uv0,relaxed.uv1,prev.point,relaxed.point,state,prev.stepCount + 1);
};
verb_core_ExpIntersect.isCoincidentWithStartPoint = function(point,currentIndex,allStartPts,tol) {
	if(currentIndex == 0) return false;
	var _g = 0;
	while(_g < currentIndex) {
		var i = _g++;
		var dist = verb_core_Vec.distSquared(allStartPts[i].point,allStartPts[currentIndex].point);
		if(dist < tol) {
			haxe_Log.trace("Coincident start point!",{ fileName : "ExpIntersect.hx", lineNumber : 253, className : "verb.core.ExpIntersect", methodName : "isCoincidentWithStartPoint"});
			return true;
		}
	}
	return false;
};
verb_core_ExpIntersect.completeMarch = function(surface0,surface1,startIndex,allStartPts,tol) {
	var start = allStartPts[startIndex];
	var step = verb_core_ExpIntersect.march(surface0,surface1,verb_core_MarchStep.init(start),startIndex,allStartPts,tol);
	if(step.state == verb_core_MarchStepState.AtBoundary || step.state == verb_core_MarchStepState.CoincidentStartPoint) return null;
	var $final = [];
	$final.push(start);
	while(step.state != verb_core_MarchStepState.CoincidentStartPoint && step.state != verb_core_MarchStepState.AtBoundary && step.state != verb_core_MarchStepState.CompleteLoop) {
		$final.push(new verb_core_types_SurfaceSurfaceIntersectionPoint(step.uv0,step.uv1,step.point,-1));
		if(step.state == verb_core_MarchStepState.CoincidentStartPoint) return null;
		step = verb_core_ExpIntersect.march(surface0,surface1,step,startIndex,allStartPts,tol);
	}
	$final.push(new verb_core_types_SurfaceSurfaceIntersectionPoint(step.uv0,step.uv1,step.point,-1));
	return $final;
};
verb_core_ExpIntersect.surfaces = function(surface0,surface1,tol) {
	var $final = [];
	var startPts = verb_core_ExpIntersect.intersectBoundaryCurves(surface0,surface1,tol);
	var approxInner = verb_core_ExpIntersect.approxInnerCriticalPts(surface0,surface1);
	var refinedInner = verb_core_ExpIntersect.refineInnerCriticalPts(surface0,surface1,approxInner,tol);
	var b = true;
	var _g = 0;
	while(_g < refinedInner.length) {
		var pair = refinedInner[_g];
		++_g;
		var res = verb_core_Intersect.curveAndSurface(verb_core_Make.surfaceIsocurve(surface0,pair.item0[0],false),surface1);
		if(res.length == 0) continue;
		if(!b) continue;
		b = false;
		var $int = new verb_core_types_SurfaceSurfaceIntersectionPoint([pair.item0[0],res[0].u],res[0].uv,res[0].curvePoint,-1);
		startPts.push($int);
	}
	var i = 0;
	while(i < startPts.length) {
		haxe_Log.trace("starting at",{ fileName : "ExpIntersect.hx", lineNumber : 326, className : "verb.core.ExpIntersect", methodName : "surfaces", customParams : [startPts[i].point]});
		var res1 = verb_core_ExpIntersect.completeMarch(surface0,surface1,i,startPts,tol);
		if(res1 != null) {
			$final.push(res1);
			startPts.splice(i,0,res1[res1.length - 1]);
			haxe_Log.trace("inserting",{ fileName : "ExpIntersect.hx", lineNumber : 334, className : "verb.core.ExpIntersect", methodName : "surfaces", customParams : [res1[res1.length - 1].point]});
			i += 2;
		}
		i++;
	}
	var _g1 = [];
	var _g11 = 0;
	while(_g11 < $final.length) {
		var pts = $final[_g11];
		++_g11;
		_g1.push(verb_core_Make.rationalInterpCurve(pts.map(function(x) {
			return x.point;
		})));
	}
	return _g1;
};
verb_core_ExpIntersect.refineInnerCriticalPts = function(surface0,surface1,approx,tol) {
	return approx.map(function(x) {
		return verb_core_ExpIntersect.refineCriticalPt(surface0,surface1,x,tol);
	});
};
verb_core_ExpIntersect.refineCriticalPt = function(surface0,surface1,approx,tol) {
	var obj = function(x) {
		var d0 = verb_core_Eval.rationalSurfaceDerivatives(surface0,x[0],x[1],1);
		var d1 = verb_core_Eval.rationalSurfaceDerivatives(surface1,x[2],x[3],1);
		var n0 = verb_core_Vec.normalized(verb_core_Vec.cross(d0[1][0],d0[0][1]));
		var n1 = verb_core_Vec.normalized(verb_core_Vec.cross(d1[1][0],d1[0][1]));
		var vec = verb_core_Vec.sub(d0[0][0],d1[0][0]);
		var dist = verb_core_Vec.normSquared(vec);
		var vecnorm = verb_core_Vec.dot(vec,n1);
		var normdot = verb_core_Vec.dot(n0,n1);
		return dist - vecnorm * vecnorm + 1 - normdot * normdot;
	};
	var start = [approx.item0[0],approx.item0[1],approx.item1[0],approx.item1[1]];
	var sol = verb_core_Numeric.uncmin(obj,start,tol);
	var $final = sol.solution;
	return new verb_core_types_Pair([$final[0],$final[1]],[$final[2],$final[3]]);
};
verb_core_ExpIntersect.verifyInnerCriticalPts = function(surface0,surface1,approx) {
	return null;
};
verb_core_ExpIntersect.boundingBoxLeaves = function(division) {
	if(division.indivisible(0)) return [division["yield"]()];
	var halves = division.split();
	return verb_core_ExpIntersect.boundingBoxLeaves(halves.item0).concat(verb_core_ExpIntersect.boundingBoxLeaves(halves.item1));
};
verb_core_ExpIntersect.approxInnerCriticalPts = function(surface0,surface1) {
	var div0 = new verb_core_types_LazySurfaceBoundingBoxTree(surface0,false,0.6,0.6);
	var div1 = new verb_core_types_LazySurfaceBoundingBoxTree(surface1,false,0.6,0.6);
	var res = verb_core_Intersect.boundingBoxTrees(div0,div1,0);
	var numSamples = 4;
	var criticalPts = [];
	var _g = 0;
	while(_g < res.length) {
		var srfpair = res[_g];
		++_g;
		var a = verb_core_ExpIntersect.approxSurfaceDelPhiField(srfpair.item0,srfpair.item1,numSamples,numSamples);
		var f = a.delphi;
		var uvs0 = a.uvs0;
		var uvs1 = a.uvs1;
		var _g2 = 1;
		var _g1 = f.length;
		while(_g2 < _g1) {
			var i = _g2++;
			var _g4 = 1;
			var _g3 = f[i].length;
			while(_g4 < _g3) {
				var j = _g4++;
				var num = verb_core_ExpIntersect.approxRotationNumber([f[i][j - 1],f[i][j],f[i - 1][j],f[i - 1][j - 1]]);
				if(num != 0) {
					var midU0 = (uvs0[i][j][1] + uvs0[i][j - 1][1]) / 2;
					var midV0 = (uvs0[i][j][0] + uvs0[i - 1][j][0]) / 2;
					var midU1 = (uvs1[i][j][1] + uvs1[i][j - 1][1]) / 2;
					var midV1 = (uvs1[i][j][0] + uvs1[i - 1][j][0]) / 2;
					criticalPts.push(new verb_core_types_Pair([midU0,midV0],[midU1,midV1]));
				}
			}
		}
	}
	return criticalPts;
};
verb_core_ExpIntersect.approxRotationNumber = function(vs) {
	var sum = 0.0;
	var l = vs.length;
	var _g1 = 1;
	var _g = l + 1;
	while(_g1 < _g) {
		var i = _g1++;
		var ang = verb_core_Vec.angleBetweenNormalized2d(vs[i - 1],vs[i % l]);
		sum += Math.abs(ang);
	}
	return Math.floor(Math.abs(sum / (2 * Math.PI)));
};
verb_core_ExpIntersect.approxSurfaceDelPhiField = function(surface0,surface1,divs_u,divs_v) {
	var tess0 = verb_core_ExpIntersect.sampleSurfaceRegular(surface0,divs_u,divs_v);
	var tess1 = verb_core_ExpIntersect.sampleSurfaceRegular(surface1,divs_u,divs_v);
	var minuvs = [];
	var _g1 = 0;
	var _g = tess0.uvs.length;
	while(_g1 < _g) {
		var i = _g1++;
		var minuvsrow = [];
		minuvs.push(minuvsrow);
		var _g3 = 0;
		var _g2 = tess0.uvs[i].length;
		while(_g3 < _g2) {
			var j = _g3++;
			var minDist = Infinity;
			var minUV = [Infinity,Infinity];
			var _g5 = 0;
			var _g4 = tess1.uvs.length;
			while(_g5 < _g4) {
				var k = _g5++;
				var _g7 = 0;
				var _g6 = tess1.uvs[k].length;
				while(_g7 < _g6) {
					var l = _g7++;
					var dist = verb_core_Vec.distSquared(tess0.points[i][j],tess0.points[k][l]);
					if(dist < minDist) {
						minDist = dist;
						minUV = tess0.uvs[k][l];
					}
				}
			}
			minuvsrow.push(minUV);
		}
	}
	var delphifield = [];
	var _g11 = 0;
	var _g8 = minuvs.length;
	while(_g11 < _g8) {
		var i1 = _g11++;
		var delphirow = [];
		delphifield.push(delphirow);
		var _g31 = 0;
		var _g21 = minuvs[i1].length;
		while(_g31 < _g21) {
			var j1 = _g31++;
			var uv0 = tess0.uvs[i1][j1];
			var uv1 = minuvs[i1][j1];
			var derivs0 = verb_core_Eval.rationalSurfaceDerivatives(surface0,uv0[0],uv0[1]);
			var derivs1 = verb_core_Eval.rationalSurfaceDerivatives(surface1,uv1[0],uv1[1]);
			var n2 = verb_core_Vec.normalized(verb_core_Vec.cross(derivs1[1][0],derivs1[0][1]));
			var ru = derivs0[1][0];
			var rv = derivs0[0][1];
			var delphi = verb_core_Vec.normalized([verb_core_Vec.dot(n2,ru),verb_core_Vec.dot(n2,rv)]);
			delphirow.push(delphi);
		}
	}
	return { uvs0 : tess0.uvs, uvs1 : minuvs, delphi : delphifield};
};
verb_core_ExpIntersect.sampleSurfaceRegular = function(surface,divs_u,divs_v) {
	if(divs_u < 1) divs_u = 1;
	if(divs_v < 1) divs_v = 1;
	var degreeU = surface.degreeU;
	var degreeV = surface.degreeV;
	var controlPoints = surface.controlPoints;
	var knotsU = surface.knotsU;
	var knotsV = surface.knotsV;
	var offset = 0.005;
	var u_span = knotsU[knotsU.length - 1] - knotsU[0] - 2 * offset;
	var v_span = knotsV[knotsV.length - 1] - knotsV[0] - 2 * offset;
	var minu = knotsU[0] + offset;
	var minv = knotsV[0] + offset;
	var span_u = u_span / divs_u;
	var span_v = v_span / divs_v;
	var points = [];
	var uvs = [];
	var _g1 = 0;
	var _g = divs_u + 1;
	while(_g1 < _g) {
		var i = _g1++;
		var uvrow = [];
		uvs.push(uvrow);
		var pointsrow = [];
		points.push(pointsrow);
		var pt_u = minu + i * span_u;
		var _g3 = 0;
		var _g2 = divs_v + 1;
		while(_g3 < _g2) {
			var j = _g3++;
			var pt_v = minv + j * span_v;
			uvrow.push([pt_u,pt_v]);
			pointsrow.push(verb_core_Eval.rationalSurfacePoint(surface,pt_u,pt_v));
		}
	}
	return { uvs : uvs, points : points};
};
verb_core_ExpIntersect.intersectBoundaryCurves = function(surface0,surface1,tol) {
	var srf0bs = verb_core_Make.surfaceBoundaryCurves(surface0);
	var srf1bs = verb_core_Make.surfaceBoundaryCurves(surface1);
	var ints = [];
	var _g1 = 0;
	var _g = srf0bs.length;
	while(_g1 < _g) {
		var i = _g1++;
		var crv = srf0bs[i];
		var res = verb_core_Intersect.curveAndSurface(crv,surface1,tol);
		var _g2 = 0;
		while(_g2 < res.length) {
			var $int = res[_g2];
			++_g2;
			var uv;
			switch(i) {
			case 0:
				uv = [surface0.knotsU[0],$int.u];
				break;
			case 1:
				uv = [verb_core_ArrayExtensions.last(surface0.knotsU),$int.u];
				break;
			case 2:
				uv = [$int.u,surface0.knotsV[0]];
				break;
			default:
				uv = [$int.u,verb_core_ArrayExtensions.last(surface0.knotsV)];
			}
			var dist = verb_core_Vec.dist($int.curvePoint,$int.surfacePoint);
			ints.push(new verb_core_types_SurfaceSurfaceIntersectionPoint(uv,$int.uv,$int.curvePoint,dist));
		}
	}
	var _g11 = 0;
	var _g3 = srf1bs.length;
	while(_g11 < _g3) {
		var i1 = _g11++;
		var crv1 = srf1bs[i1];
		var res1 = verb_core_Intersect.curveAndSurface(crv1,surface0,tol);
		var _g21 = 0;
		while(_g21 < res1.length) {
			var int1 = res1[_g21];
			++_g21;
			var uv1;
			switch(i1) {
			case 0:
				uv1 = [surface1.knotsU[0],int1.u];
				break;
			case 1:
				uv1 = [verb_core_ArrayExtensions.last(surface1.knotsU),int1.u];
				break;
			case 2:
				uv1 = [int1.u,surface1.knotsV[0]];
				break;
			default:
				uv1 = [int1.u,verb_core_ArrayExtensions.last(surface1.knotsV)];
			}
			var dist1 = verb_core_Vec.dist(int1.curvePoint,int1.surfacePoint);
			ints.push(new verb_core_types_SurfaceSurfaceIntersectionPoint(int1.uv,uv1,int1.curvePoint,dist1));
		}
	}
	return verb_core_ArrayExtensions.unique(ints,function(a,b) {
		return Math.abs(a.uv0[0] - b.uv0[0]) < tol && Math.abs(a.uv0[1] - b.uv0[1]) < tol;
	});
};
var verb_core_Intersect = $hx_exports.core.Intersect = function() { };
verb_core_Intersect.__name__ = ["verb","core","Intersect"];
verb_core_Intersect.meshSlices = function(mesh,min,max,step) {
	var bbtree = new verb_core_types_MeshBoundingBoxTree(mesh);
	var bb = bbtree.boundingBox();
	var x0 = bb.min[0];
	var y0 = bb.min[1];
	var x1 = bb.max[0];
	var y1 = bb.max[1];
	var span = verb_core_Vec.span(min,max,step);
	var slices = [];
	var _g = 0;
	while(_g < span.length) {
		var z = span[_g];
		++_g;
		var pts = [[x0,y0,z],[x1,y0,z],[x1,y1,z],[x0,y1,z]];
		var uvs = [[0.0,0.0],[1.0,0.0],[1.0,1.0],[0.0,1.0]];
		var faces = [[0,1,2],[0,2,3]];
		var plane = new verb_core_types_MeshData(faces,pts,null,uvs);
		slices.push(verb_core_Intersect.meshes(mesh,plane,bbtree));
		z += 1.0;
	}
	return slices;
};
verb_core_Intersect.surfaces = function(surface0,surface1,tol) {
	var tess1 = verb_core_Tess.rationalSurfaceAdaptive(surface0);
	var tess2 = verb_core_Tess.rationalSurfaceAdaptive(surface1);
	var resApprox = verb_core_Intersect.meshes(tess1,tess2);
	var exactPls = resApprox.map(function(pl) {
		return pl.map(function(inter) {
			return verb_core_Intersect.surfacesAtPointWithEstimate(surface0,surface1,inter.uv0,inter.uv1,tol);
		});
	});
	return exactPls.map(function(x) {
		return verb_core_Make.rationalInterpCurve(x.map(function(y) {
			return y.point;
		}),3);
	});
};
verb_core_Intersect.surfacesAtPointWithEstimate = function(surface0,surface1,uv1,uv2,tol) {
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
	var maxits = 5;
	var its = 0;
	do {
		pds = verb_core_Eval.rationalSurfaceDerivatives(surface0,uv1[0],uv1[1],1);
		p = pds[0][0];
		pu = pds[1][0];
		pv = pds[0][1];
		pn = verb_core_Vec.normalized(verb_core_Vec.cross(pu,pv));
		pd = verb_core_Vec.dot(pn,p);
		qds = verb_core_Eval.rationalSurfaceDerivatives(surface1,uv2[0],uv2[1],1);
		q = qds[0][0];
		qu = qds[1][0];
		qv = qds[0][1];
		qn = verb_core_Vec.normalized(verb_core_Vec.cross(qu,qv));
		qd = verb_core_Vec.dot(qn,q);
		dist = verb_core_Vec.distSquared(p,q);
		if(dist < tol * tol) break;
		var fn = verb_core_Vec.normalized(verb_core_Vec.cross(pn,qn));
		var fd = verb_core_Vec.dot(fn,p);
		var x = verb_core_Intersect.threePlanes(pn,pd,qn,qd,fn,fd);
		if(x == null) throw new js__$Boot_HaxeError("panic!");
		var pdif = verb_core_Vec.sub(x,p);
		var qdif = verb_core_Vec.sub(x,q);
		var rw = verb_core_Vec.cross(pu,pn);
		var rt = verb_core_Vec.cross(pv,pn);
		var su = verb_core_Vec.cross(qu,qn);
		var sv = verb_core_Vec.cross(qv,qn);
		var dw = verb_core_Vec.dot(rt,pdif) / verb_core_Vec.dot(rt,pu);
		var dt = verb_core_Vec.dot(rw,pdif) / verb_core_Vec.dot(rw,pv);
		var du = verb_core_Vec.dot(sv,qdif) / verb_core_Vec.dot(sv,qu);
		var dv = verb_core_Vec.dot(su,qdif) / verb_core_Vec.dot(su,qv);
		uv1 = verb_core_Vec.add([dw,dt],uv1);
		uv2 = verb_core_Vec.add([du,dv],uv2);
		its++;
	} while(its < maxits);
	return new verb_core_types_SurfaceSurfaceIntersectionPoint(uv1,uv2,p,dist);
};
verb_core_Intersect.meshes = function(mesh0,mesh1,bbtree0,bbtree1) {
	if(bbtree0 == null) bbtree0 = new verb_core_types_LazyMeshBoundingBoxTree(mesh0);
	if(bbtree1 == null) bbtree1 = new verb_core_types_LazyMeshBoundingBoxTree(mesh1);
	var bbints = verb_core_Intersect.boundingBoxTrees(bbtree0,bbtree1,0);
	var segments = verb_core_ArrayExtensions.unique(bbints.map(function(ids) {
		return verb_core_Intersect.triangles(mesh0,ids.item0,mesh1,ids.item1);
	}).filter(function(x) {
		return x != null;
	}).filter(function(x1) {
		return verb_core_Vec.distSquared(x1.min.point,x1.max.point) > 1e-10;
	}),function(a,b) {
		var s1 = verb_core_Vec.sub(a.min.uv0,b.min.uv0);
		var d1 = verb_core_Vec.dot(s1,s1);
		var s2 = verb_core_Vec.sub(a.max.uv0,b.max.uv0);
		var d2 = verb_core_Vec.dot(s2,s2);
		var s3 = verb_core_Vec.sub(a.min.uv0,b.max.uv0);
		var d3 = verb_core_Vec.dot(s3,s3);
		var s4 = verb_core_Vec.sub(a.max.uv0,b.min.uv0);
		var d4 = verb_core_Vec.dot(s4,s4);
		return d1 < 1e-10 && d2 < 1e-10 || d3 < 1e-10 && d4 < 1e-10;
	});
	return verb_core_Intersect.makeMeshIntersectionPolylines(segments);
};
verb_core_Intersect.makeMeshIntersectionPolylines = function(segments) {
	if(segments.length == 0) return [];
	var _g = 0;
	while(_g < segments.length) {
		var s = segments[_g];
		++_g;
		s.max.opp = s.min;
		s.min.opp = s.max;
	}
	var tree = verb_core_Intersect.kdTreeFromSegments(segments);
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
		var adjEnd = verb_core_Intersect.lookupAdjacentSegment(segEnd,tree,segments.length);
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
	var numVisitedEnds = 0;
	var loopDetected = false;
	while(freeEnds.length != 0) {
		var end = freeEnds.pop();
		if(!end.visited) {
			var pl = [];
			var curEnd = end;
			while(curEnd != null) {
				if(curEnd.visited) break;
				curEnd.visited = true;
				curEnd.opp.visited = true;
				pl.push(curEnd);
				numVisitedEnds += 2;
				curEnd = curEnd.opp.adj;
				if(curEnd == end) break;
			}
			if(pl.length > 0) {
				pl.push(pl[pl.length - 1].opp);
				pls.push(pl);
			}
		}
		if(freeEnds.length == 0 && ends.length > 0 && (loopDetected || numVisitedEnds < ends.length)) {
			loopDetected = true;
			var e = ends.pop();
			freeEnds.push(e);
		}
	}
	return pls;
};
verb_core_Intersect.kdTreeFromSegments = function(segments) {
	var treePoints = [];
	var _g = 0;
	while(_g < segments.length) {
		var seg = segments[_g];
		++_g;
		treePoints.push(new verb_core_KdPoint(seg.min.point,seg.min));
		treePoints.push(new verb_core_KdPoint(seg.max.point,seg.max));
	}
	return new verb_core_KdTree(treePoints,verb_core_Vec.distSquared);
};
verb_core_Intersect.lookupAdjacentSegment = function(segEnd,tree,numResults) {
	var adj = tree.nearest(segEnd.point,numResults,1e-10).filter(function(r) {
		return segEnd != r.item0.obj;
	}).map(function(r1) {
		return r1.item0.obj;
	});
	if(adj.length == 1) return adj[0]; else return null;
};
verb_core_Intersect.curveAndSurface = function(curve,surface,tol,crvBbTree,srfBbTree) {
	if(tol == null) tol = 1e-3;
	if(crvBbTree != null) crvBbTree = crvBbTree; else crvBbTree = new verb_core_types_LazyCurveBoundingBoxTree(curve);
	if(srfBbTree != null) srfBbTree = srfBbTree; else srfBbTree = new verb_core_types_LazySurfaceBoundingBoxTree(surface);
	var ints = verb_core_Intersect.boundingBoxTrees(crvBbTree,srfBbTree,tol);
	return verb_core_ArrayExtensions.unique(ints.map(function(inter) {
		var crvSeg = inter.item0;
		var srfPart = inter.item1;
		var min = crvSeg.knots[0];
		var max = verb_core_ArrayExtensions.last(crvSeg.knots);
		var u = (min + max) / 2.0;
		var minu = srfPart.knotsU[0];
		var maxu = verb_core_ArrayExtensions.last(srfPart.knotsU);
		var minv = srfPart.knotsV[0];
		var maxv = verb_core_ArrayExtensions.last(srfPart.knotsV);
		var uv = [(minu + maxu) / 2.0,(minv + maxv) / 2.0];
		return verb_core_Intersect.curveAndSurfaceWithEstimate(crvSeg,srfPart,[u].concat(uv),tol);
	}).filter(function(x) {
		return verb_core_Vec.distSquared(x.curvePoint,x.surfacePoint) < tol * tol;
	}),function(a,b) {
		return Math.abs(a.u - b.u) < 0.5 * tol;
	});
};
verb_core_Intersect.curveAndSurfaceWithEstimate = function(curve,surface,start_params,tol) {
	if(tol == null) tol = 1e-3;
	var objective = function(x) {
		var p1 = verb_core_Eval.rationalCurvePoint(curve,x[0]);
		var p2 = verb_core_Eval.rationalSurfacePoint(surface,x[1],x[2]);
		var p1_p2 = verb_core_Vec.sub(p1,p2);
		return verb_core_Vec.dot(p1_p2,p1_p2);
	};
	var grad = function(x1) {
		var dc = verb_core_Eval.rationalCurveDerivatives(curve,x1[0],1);
		var ds = verb_core_Eval.rationalSurfaceDerivatives(surface,x1[1],x1[2],1);
		var r = verb_core_Vec.sub(ds[0][0],dc[0]);
		var drdt = verb_core_Vec.mul(-1.0,dc[1]);
		var drdu = ds[1][0];
		var drdv = ds[0][1];
		return [2.0 * verb_core_Vec.dot(drdt,r),2.0 * verb_core_Vec.dot(drdu,r),2.0 * verb_core_Vec.dot(drdv,r)];
	};
	var sol_obj = verb_core_Numeric.uncmin(objective,start_params,tol * tol,grad);
	var $final = sol_obj.solution;
	return new verb_core_types_CurveSurfaceIntersection($final[0],[$final[1],$final[2]],verb_core_Eval.rationalCurvePoint(curve,$final[0]),verb_core_Eval.rationalSurfacePoint(surface,$final[1],$final[2]));
};
verb_core_Intersect.polylineAndMesh = function(polyline,mesh,tol) {
	var res = verb_core_Intersect.boundingBoxTrees(new verb_core_types_LazyPolylineBoundingBoxTree(polyline),new verb_core_types_LazyMeshBoundingBoxTree(mesh),tol);
	var finalResults = [];
	var _g = 0;
	while(_g < res.length) {
		var event = res[_g];
		++_g;
		var polid = event.item0;
		var faceid = event.item1;
		var inter = verb_core_Intersect.segmentWithTriangle(polyline.points[polid],polyline.points[polid + 1],mesh.points,mesh.faces[faceid]);
		if(inter == null) continue;
		var pt = inter.point;
		var u = verb_core_Vec.lerp(inter.p,[polyline.params[polid]],[polyline.params[polid + 1]])[0];
		var uv = verb_core_Mesh.triangleUVFromPoint(mesh,faceid,pt);
		finalResults.push(new verb_core_types_PolylineMeshIntersection(pt,u,uv,polid,faceid));
	}
	return finalResults;
};
verb_core_Intersect.boundingBoxTrees = function(ai,bi,tol) {
	if(tol == null) tol = 1e-9;
	var atrees = [];
	var btrees = [];
	atrees.push(ai);
	btrees.push(bi);
	var results = [];
	while(atrees.length > 0) {
		var a = atrees.pop();
		var b = btrees.pop();
		if(a.empty() || b.empty()) continue;
		if(!a.boundingBox().intersects(b.boundingBox(),tol)) continue;
		var ai1 = a.indivisible(tol);
		var bi1 = b.indivisible(tol);
		if(ai1 && bi1) {
			results.push(new verb_core_types_Pair(a["yield"](),b["yield"]()));
			continue;
		} else if(ai1 && !bi1) {
			var bs1 = b.split();
			atrees.push(a);
			btrees.push(bs1.item1);
			atrees.push(a);
			btrees.push(bs1.item0);
			continue;
		} else if(!ai1 && bi1) {
			var as1 = a.split();
			atrees.push(as1.item1);
			btrees.push(b);
			atrees.push(as1.item0);
			btrees.push(b);
			continue;
		}
		var $as = a.split();
		var bs = b.split();
		atrees.push($as.item1);
		btrees.push(bs.item1);
		atrees.push($as.item1);
		btrees.push(bs.item0);
		atrees.push($as.item0);
		btrees.push(bs.item1);
		atrees.push($as.item0);
		btrees.push(bs.item0);
	}
	return results;
};
verb_core_Intersect.curves = function(curve1,curve2,tolerance) {
	var ints = verb_core_Intersect.boundingBoxTrees(new verb_core_types_LazyCurveBoundingBoxTree(curve1),new verb_core_types_LazyCurveBoundingBoxTree(curve2),0);
	return verb_core_ArrayExtensions.unique(ints.map(function(x) {
		return verb_core_Intersect.curvesWithEstimate(curve1,curve2,x.item0.knots[0],x.item1.knots[0],tolerance);
	}).filter(function(x1) {
		return verb_core_Vec.distSquared(x1.point0,x1.point1) < tolerance;
	}),function(a,b) {
		return Math.abs(a.u0 - b.u0) < tolerance * 5;
	});
};
verb_core_Intersect.curvesWithEstimate = function(curve0,curve1,u0,u1,tolerance) {
	var objective = function(x) {
		var p1 = verb_core_Eval.rationalCurvePoint(curve0,x[0]);
		var p2 = verb_core_Eval.rationalCurvePoint(curve1,x[1]);
		var p1_p2 = verb_core_Vec.sub(p1,p2);
		return verb_core_Vec.dot(p1_p2,p1_p2);
	};
	var grad = function(x1) {
		var dc0 = verb_core_Eval.rationalCurveDerivatives(curve0,x1[0],1);
		var dc1 = verb_core_Eval.rationalCurveDerivatives(curve1,x1[1],1);
		var r = verb_core_Vec.sub(dc0[0],dc1[0]);
		var drdu = dc0[1];
		var drdt = verb_core_Vec.mul(-1.0,dc1[1]);
		return [2.0 * verb_core_Vec.dot(drdu,r),2.0 * verb_core_Vec.dot(drdt,r)];
	};
	var sol_obj = verb_core_Numeric.uncmin(objective,[u0,u1],tolerance * tolerance,grad);
	var u11 = sol_obj.solution[0];
	var u2 = sol_obj.solution[1];
	var p11 = verb_core_Eval.rationalCurvePoint(curve0,u11);
	var p21 = verb_core_Eval.rationalCurvePoint(curve1,u2);
	return new verb_core_types_CurveCurveIntersection(p11,p21,u11,u2);
};
verb_core_Intersect.triangles = function(mesh0,faceIndex0,mesh1,faceIndex1) {
	var tri0 = mesh0.faces[faceIndex0];
	var tri1 = mesh1.faces[faceIndex1];
	var n0 = verb_core_Mesh.getTriangleNorm(mesh0.points,tri0);
	var n1 = verb_core_Mesh.getTriangleNorm(mesh1.points,tri1);
	var o0 = mesh0.points[tri0[0]];
	var o1 = mesh1.points[tri1[0]];
	var ray = verb_core_Intersect.planes(o0,n0,o1,n1);
	if(ray == null) return null;
	var clip1 = verb_core_Intersect.clipRayInCoplanarTriangle(ray,mesh0,faceIndex0);
	if(clip1 == null) return null;
	var clip2 = verb_core_Intersect.clipRayInCoplanarTriangle(ray,mesh1,faceIndex1);
	if(clip2 == null) return null;
	var merged = verb_core_Intersect.mergeTriangleClipIntervals(clip1,clip2,mesh0,faceIndex0,mesh1,faceIndex1);
	if(merged == null) return null;
	return new verb_core_types_Interval(new verb_core_types_MeshIntersectionPoint(merged.min.uv0,merged.min.uv1,merged.min.point,faceIndex0,faceIndex1),new verb_core_types_MeshIntersectionPoint(merged.max.uv0,merged.max.uv1,merged.max.point,faceIndex0,faceIndex1));
};
verb_core_Intersect.clipRayInCoplanarTriangle = function(ray,mesh,faceIndex) {
	var tri = mesh.faces[faceIndex];
	var o = [mesh.points[tri[0]],mesh.points[tri[1]],mesh.points[tri[2]]];
	var uvs = [mesh.uvs[tri[0]],mesh.uvs[tri[1]],mesh.uvs[tri[2]]];
	var uvd = [verb_core_Vec.sub(uvs[1],uvs[0]),verb_core_Vec.sub(uvs[2],uvs[1]),verb_core_Vec.sub(uvs[0],uvs[2])];
	var s = [verb_core_Vec.sub(o[1],o[0]),verb_core_Vec.sub(o[2],o[1]),verb_core_Vec.sub(o[0],o[2])];
	var d = s.map(verb_core_Vec.normalized);
	var l = s.map(verb_core_Vec.norm);
	var minU = null;
	var maxU = null;
	var _g = 0;
	while(_g < 3) {
		var i = _g++;
		var o0 = o[i];
		var d0 = d[i];
		var res = verb_core_Intersect.rays(o0,d0,ray.origin,ray.dir);
		if(res == null) continue;
		var useg = res.u0;
		var uray = res.u1;
		if(useg < -1e-10 || useg > l[i] + 1e-10) continue;
		if(minU == null || uray < minU.u) minU = new verb_core_types_CurveTriPoint(uray,verb_core_Vec.onRay(ray.origin,ray.dir,uray),verb_core_Vec.onRay(uvs[i],uvd[i],useg / l[i]));
		if(maxU == null || uray > maxU.u) maxU = new verb_core_types_CurveTriPoint(uray,verb_core_Vec.onRay(ray.origin,ray.dir,uray),verb_core_Vec.onRay(uvs[i],uvd[i],useg / l[i]));
	}
	if(maxU == null || minU == null) return null;
	return new verb_core_types_Interval(minU,maxU);
};
verb_core_Intersect.mergeTriangleClipIntervals = function(clip1,clip2,mesh1,faceIndex1,mesh2,faceIndex2) {
	if(clip2.min.u > clip1.max.u + 1e-10 || clip1.min.u > clip2.max.u + 1e-10) return null;
	var min;
	if(clip1.min.u > clip2.min.u) min = new verb_core_types_Pair(clip1.min,0); else min = new verb_core_types_Pair(clip2.min,1);
	var max;
	if(clip1.max.u < clip2.max.u) max = new verb_core_types_Pair(clip1.max,0); else max = new verb_core_types_Pair(clip2.max,1);
	var res = new verb_core_types_Interval(new verb_core_types_MeshIntersectionPoint(null,null,min.item0.point,faceIndex1,faceIndex2),new verb_core_types_MeshIntersectionPoint(null,null,max.item0.point,faceIndex1,faceIndex2));
	if(min.item1 == 0) {
		res.min.uv0 = min.item0.uv;
		res.min.uv1 = verb_core_Mesh.triangleUVFromPoint(mesh2,faceIndex2,min.item0.point);
	} else {
		res.min.uv0 = verb_core_Mesh.triangleUVFromPoint(mesh1,faceIndex1,min.item0.point);
		res.min.uv1 = min.item0.uv;
	}
	if(max.item1 == 0) {
		res.max.uv0 = max.item0.uv;
		res.max.uv1 = verb_core_Mesh.triangleUVFromPoint(mesh2,faceIndex2,max.item0.point);
	} else {
		res.max.uv0 = verb_core_Mesh.triangleUVFromPoint(mesh1,faceIndex1,max.item0.point);
		res.max.uv1 = max.item0.uv;
	}
	return res;
};
verb_core_Intersect.planes = function(origin0,normal0,origin1,normal1) {
	var d = verb_core_Vec.cross(normal0,normal1);
	if(verb_core_Vec.dot(d,d) < 1e-10) return null;
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
	var d1 = -verb_core_Vec.dot(origin0,normal0);
	var d2 = -verb_core_Vec.dot(origin1,normal1);
	var den = a1 * b2 - b1 * a2;
	var x = (b1 * d2 - d1 * b2) / den;
	var y = (d1 * a2 - a1 * d2) / den;
	var p;
	if(li == 0) p = [0,x,y]; else if(li == 1) p = [x,0,y]; else p = [x,y,0];
	return new verb_core_types_Ray(p,verb_core_Vec.normalized(d));
};
verb_core_Intersect.threePlanes = function(n0,d0,n1,d1,n2,d2) {
	var u = verb_core_Vec.cross(n1,n2);
	var den = verb_core_Vec.dot(n0,u);
	if(Math.abs(den) < 1e-10) return null;
	var diff = verb_core_Vec.sub(verb_core_Vec.mul(d2,n1),verb_core_Vec.mul(d1,n2));
	var num = verb_core_Vec.add(verb_core_Vec.mul(d0,u),verb_core_Vec.cross(n0,diff));
	return verb_core_Vec.mul(1 / den,num);
};
verb_core_Intersect.polylines = function(polyline0,polyline1,tol) {
	var res = verb_core_Intersect.boundingBoxTrees(new verb_core_types_LazyPolylineBoundingBoxTree(polyline0),new verb_core_types_LazyPolylineBoundingBoxTree(polyline1),tol);
	var finalResults = [];
	var _g = 0;
	while(_g < res.length) {
		var event = res[_g];
		++_g;
		var polid0 = event.item0;
		var polid1 = event.item1;
		var inter = verb_core_Intersect.segments(polyline0.points[polid0],polyline0.points[polid0 + 1],polyline1.points[polid1],polyline1.points[polid1 + 1],tol);
		if(inter == null) continue;
		inter.u0 = verb_core_Vec.lerp(inter.u0,[polyline0.params[polid0]],[polyline0.params[polid0 + 1]])[0];
		inter.u1 = verb_core_Vec.lerp(inter.u1,[polyline1.params[polid1]],[polyline1.params[polid1 + 1]])[0];
		finalResults.push(inter);
	}
	return finalResults;
};
verb_core_Intersect.segments = function(a0,a1,b0,b1,tol) {
	var a1ma0 = verb_core_Vec.sub(a1,a0);
	var aN = Math.sqrt(verb_core_Vec.dot(a1ma0,a1ma0));
	var a = verb_core_Vec.mul(1 / aN,a1ma0);
	var b1mb0 = verb_core_Vec.sub(b1,b0);
	var bN = Math.sqrt(verb_core_Vec.dot(b1mb0,b1mb0));
	var b = verb_core_Vec.mul(1 / bN,b1mb0);
	var int_params = verb_core_Intersect.rays(a0,a,b0,b);
	if(int_params != null) {
		var u0 = Math.min(Math.max(0,int_params.u0 / aN),1.0);
		var u1 = Math.min(Math.max(0,int_params.u1 / bN),1.0);
		var point0 = verb_core_Vec.onRay(a0,a1ma0,u0);
		var point1 = verb_core_Vec.onRay(b0,b1mb0,u1);
		var dist = verb_core_Vec.distSquared(point0,point1);
		if(dist < tol * tol) return new verb_core_types_CurveCurveIntersection(point0,point1,u0,u1);
	}
	return null;
};
verb_core_Intersect.rays = function(a0,a,b0,b) {
	var dab = verb_core_Vec.dot(a,b);
	var dab0 = verb_core_Vec.dot(a,b0);
	var daa0 = verb_core_Vec.dot(a,a0);
	var dbb0 = verb_core_Vec.dot(b,b0);
	var dba0 = verb_core_Vec.dot(b,a0);
	var daa = verb_core_Vec.dot(a,a);
	var dbb = verb_core_Vec.dot(b,b);
	var div = daa * dbb - dab * dab;
	if(Math.abs(div) < 1e-10) return null;
	var num = dab * (dab0 - daa0) - daa * (dbb0 - dba0);
	var w = num / div;
	var t = (dab0 - daa0 + w * dab) / daa;
	var p0 = verb_core_Vec.onRay(a0,a,t);
	var p1 = verb_core_Vec.onRay(b0,b,w);
	return new verb_core_types_CurveCurveIntersection(p0,p1,t,w);
};
verb_core_Intersect.segmentWithTriangle = function(p0,p1,points,tri) {
	var v0 = points[tri[0]];
	var v1 = points[tri[1]];
	var v2 = points[tri[2]];
	var u = verb_core_Vec.sub(v1,v0);
	var v = verb_core_Vec.sub(v2,v0);
	var n = verb_core_Vec.cross(u,v);
	var dir = verb_core_Vec.sub(p1,p0);
	var w0 = verb_core_Vec.sub(p0,v0);
	var a = -verb_core_Vec.dot(n,w0);
	var b = verb_core_Vec.dot(n,dir);
	if(Math.abs(b) < 1e-10) return null;
	var r = a / b;
	if(r < 0 || r > 1) return null;
	var pt = verb_core_Vec.add(p0,verb_core_Vec.mul(r,dir));
	var uv = verb_core_Vec.dot(u,v);
	var uu = verb_core_Vec.dot(u,u);
	var vv = verb_core_Vec.dot(v,v);
	var w = verb_core_Vec.sub(pt,v0);
	var wu = verb_core_Vec.dot(w,u);
	var wv = verb_core_Vec.dot(w,v);
	var denom = uv * uv - uu * vv;
	if(Math.abs(denom) < 1e-10) return null;
	var s = (uv * wv - vv * wu) / denom;
	var t = (uv * wu - uu * wv) / denom;
	if(s > 1.0000000001 || t > 1.0000000001 || t < -1e-10 || s < -1e-10 || s + t > 1.0000000001) return null;
	return new verb_core_types_TriSegmentIntersection(pt,s,t,r);
};
verb_core_Intersect.segmentAndPlane = function(p0,p1,v0,n) {
	var denom = verb_core_Vec.dot(n,verb_core_Vec.sub(p1,p0));
	if(Math.abs(denom) < 1e-10) return null;
	var numer = verb_core_Vec.dot(n,verb_core_Vec.sub(v0,p0));
	var p = numer / denom;
	if(p > 1.0000000001 || p < -1e-10) return null;
	return { p : p};
};
var verb_core_KdPoint = $hx_exports.core.KdPoint = function(point,obj) {
	this.point = point;
	this.obj = obj;
};
verb_core_KdPoint.__name__ = ["verb","core","KdPoint"];
var verb_core_KdNode = $hx_exports.core.KdNode = function(kdPoint,dimension,parent) {
	this.kdPoint = kdPoint;
	this.left = null;
	this.right = null;
	this.parent = parent;
	this.dimension = dimension;
};
verb_core_KdNode.__name__ = ["verb","core","KdNode"];
var verb_core_KdTree = $hx_exports.core.KdTree = function(points,distanceFunction) {
	this.dim = 3;
	this.points = points;
	this.distanceFunction = distanceFunction;
	this.dim = points[0].point.length;
	this.root = this.buildTree(points,0,null);
};
verb_core_KdTree.__name__ = ["verb","core","KdTree"];
verb_core_KdTree.prototype = {
	buildTree: function(points,depth,parent) {
		var dim = depth % this.dim;
		var median;
		var node;
		if(points.length == 0) return null;
		if(points.length == 1) return new verb_core_KdNode(points[0],dim,parent);
		points.sort(function(a,b) {
			var diff = a.point[dim] - b.point[dim];
			if(diff == 0.0) return 0; else if(diff > 0) return 1; else return -1;
		});
		median = Math.floor(points.length / 2);
		node = new verb_core_KdNode(points[median],dim,parent);
		node.left = this.buildTree(points.slice(0,median),depth + 1,node);
		node.right = this.buildTree(points.slice(median + 1),depth + 1,node);
		return node;
	}
	,nearest: function(point,maxNodes,maxDistance) {
		var _g = this;
		var bestNodes = new verb_core_BinaryHeap(function(e) {
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
				var i1 = _g3++;
				_g1.push(0.0);
			}
			linearPoint = _g1;
			var linearDistance;
			var otherChild;
			var i;
			var saveNode = function(node1,distance) {
				bestNodes.push(new verb_core_types_Pair(node1,distance));
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
		var _g4 = 0;
		while(_g4 < maxNodes) {
			var i3 = _g4++;
			bestNodes.push(new verb_core_types_Pair(null,maxDistance));
		}
		nearestSearch(this.root);
		var result = [];
		var _g5 = 0;
		while(_g5 < maxNodes) {
			var i4 = _g5++;
			if(bestNodes.content[i4].item0 != null) result.push(new verb_core_types_Pair(bestNodes.content[i4].item0.kdPoint,bestNodes.content[i4].item1));
		}
		return result;
	}
};
var verb_core_BinaryHeap = function(scoreFunction) {
	this.content = [];
	this.scoreFunction = scoreFunction;
};
verb_core_BinaryHeap.__name__ = ["verb","core","BinaryHeap"];
verb_core_BinaryHeap.prototype = {
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
		throw new js__$Boot_HaxeError("Node not found.");
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
			var swap = -1;
			var child1Score = 0.0;
			if(child1N < length) {
				var child1 = this.content[child1N];
				child1Score = this.scoreFunction(child1);
				if(child1Score < elemScore) swap = child1N;
			}
			if(child2N < length) {
				var child2 = this.content[child2N];
				var child2Score = this.scoreFunction(child2);
				if(child2Score < (swap == -1?elemScore:child1Score)) swap = child2N;
			}
			if(swap != -1) {
				this.content[n] = this.content[swap];
				this.content[swap] = element;
				n = swap;
			} else break;
		}
	}
};
var verb_core_Make = $hx_exports.core.Make = function() { };
verb_core_Make.__name__ = ["verb","core","Make"];
verb_core_Make.rationalTranslationalSurface = function(profile,rail) {
	var pt0 = verb_core_Eval.rationalCurvePoint(rail,rail.knots[0]);
	var startu = rail.knots[0];
	var endu = verb_core_ArrayExtensions.last(rail.knots);
	var numSamples = 2 * rail.controlPoints.length;
	var span = (endu - startu) / (numSamples - 1);
	var crvs = [];
	var _g = 0;
	while(_g < numSamples) {
		var i = _g++;
		var pt = verb_core_Vec.sub(verb_core_Eval.rationalCurvePoint(rail,startu + i * span),pt0);
		var crv = verb_core_Modify.rationalCurveTransform(profile,[[1,0,0,pt[0]],[0,1,0,pt[1]],[0,0,1,pt[2]],[0,0,0,1]]);
		crvs.push(crv);
	}
	return verb_core_Make.loftedSurface(crvs);
};
verb_core_Make.surfaceBoundaryCurves = function(surface) {
	var crvs = [];
	var c0 = verb_core_Make.surfaceIsocurve(surface,surface.knotsU[0],false);
	var c1 = verb_core_Make.surfaceIsocurve(surface,verb_core_ArrayExtensions.last(surface.knotsU),false);
	var c2 = verb_core_Make.surfaceIsocurve(surface,surface.knotsV[0],true);
	var c3 = verb_core_Make.surfaceIsocurve(surface,verb_core_ArrayExtensions.last(surface.knotsV),true);
	return [c0,c1,c2,c3];
};
verb_core_Make.surfaceIsocurve = function(surface,u,useV) {
	if(useV == null) useV = false;
	var knots;
	if(useV) knots = surface.knotsV; else knots = surface.knotsU;
	var degree;
	if(useV) degree = surface.degreeV; else degree = surface.degreeU;
	var knotMults = verb_core_Analyze.knotMultiplicities(knots);
	var reqKnotIndex = -1;
	var _g1 = 0;
	var _g = knotMults.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(Math.abs(u - knotMults[i].knot) < 1e-10) {
			reqKnotIndex = i;
			break;
		}
	}
	var numKnotsToInsert = degree + 1;
	if(reqKnotIndex >= 0) numKnotsToInsert = numKnotsToInsert - knotMults[reqKnotIndex].mult;
	var newSrf;
	if(numKnotsToInsert > 0) newSrf = verb_core_Modify.surfaceKnotRefine(surface,verb_core_Vec.rep(numKnotsToInsert,u),useV); else newSrf = surface;
	var span = verb_core_Eval.knotSpan(degree,u,knots);
	if(Math.abs(u - knots[0]) < 1e-10) span = 0; else if(Math.abs(u - knots[knots.length - 1]) < 1e-10) span = (useV?newSrf.controlPoints[0].length:newSrf.controlPoints.length) - 1;
	if(useV) return new verb_core_types_NurbsCurveData(newSrf.degreeU,newSrf.knotsU,(function($this) {
		var $r;
		var _g2 = [];
		{
			var _g11 = 0;
			var _g21 = newSrf.controlPoints;
			while(_g11 < _g21.length) {
				var row = _g21[_g11];
				++_g11;
				_g2.push(row[span]);
			}
		}
		$r = _g2;
		return $r;
	}(this)));
	return new verb_core_types_NurbsCurveData(newSrf.degreeV,newSrf.knotsV,newSrf.controlPoints[span]);
};
verb_core_Make.loftedSurface = function(curves,degreeV) {
	curves = verb_core_Modify.unifyCurveKnotVectors(curves);
	var degreeU = curves[0].degree;
	if(degreeV == null) degreeV = 3;
	if(degreeV > curves.length - 1) degreeV = curves.length - 1;
	var knotsU = curves[0].knots;
	var knotsV = [];
	var controlPoints = [];
	var _g1 = 0;
	var _g = curves[0].controlPoints.length;
	while(_g1 < _g) {
		var i = [_g1++];
		var points = curves.map((function(i) {
			return function(x) {
				return x.controlPoints[i[0]];
			};
		})(i));
		var c = verb_core_Make.rationalInterpCurve(points,degreeV,true);
		controlPoints.push(c.controlPoints);
		knotsV = c.knots;
	}
	return new verb_core_types_NurbsSurfaceData(degreeU,degreeV,knotsU,knotsV,controlPoints);
};
verb_core_Make.clonedCurve = function(curve) {
	return new verb_core_types_NurbsCurveData(curve.degree,curve.knots.slice(),curve.controlPoints.map(function(x) {
		return x.slice();
	}));
};
verb_core_Make.rationalBezierCurve = function(controlPoints,weights) {
	var degree = controlPoints.length - 1;
	var knots = [];
	var _g1 = 0;
	var _g = degree + 1;
	while(_g1 < _g) {
		var i = _g1++;
		knots.push(0.0);
	}
	var _g11 = 0;
	var _g2 = degree + 1;
	while(_g11 < _g2) {
		var i1 = _g11++;
		knots.push(1.0);
	}
	if(weights == null) weights = verb_core_Vec.rep(controlPoints.length,1.0);
	return new verb_core_types_NurbsCurveData(degree,knots,verb_core_Eval.homogenize1d(controlPoints,weights));
};
verb_core_Make.fourPointSurface = function(p1,p2,p3,p4,degree) {
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
			var p1p2 = verb_core_Vec.lerp(l,p1,p2);
			var p4p3 = verb_core_Vec.lerp(l,p4,p3);
			var res = verb_core_Vec.lerp(1.0 - j / degreeFloat,p1p2,p4p3);
			res.push(1.0);
			row.push(res);
		}
		pts.push(row);
	}
	var zeros = verb_core_Vec.rep(degree + 1,0.0);
	var ones = verb_core_Vec.rep(degree + 1,1.0);
	return new verb_core_types_NurbsSurfaceData(degree,degree,zeros.concat(ones),zeros.concat(ones),pts);
};
verb_core_Make.ellipseArc = function(center,xaxis,yaxis,startAngle,endAngle) {
	var xradius = verb_core_Vec.norm(xaxis);
	var yradius = verb_core_Vec.norm(yaxis);
	xaxis = verb_core_Vec.normalized(xaxis);
	yaxis = verb_core_Vec.normalized(yaxis);
	if(endAngle < startAngle) endAngle = 2.0 * Math.PI + startAngle;
	var theta = endAngle - startAngle;
	var numArcs = 0;
	if(theta <= Math.PI / 2) numArcs = 1; else if(theta <= Math.PI) numArcs = 2; else if(theta <= 3 * Math.PI / 2) numArcs = 3; else numArcs = 4;
	var dtheta = theta / numArcs;
	var n = 2 * numArcs;
	var w1 = Math.cos(dtheta / 2);
	var P0 = verb_core_Vec.add(center,verb_core_Vec.add(verb_core_Vec.mul(xradius * Math.cos(startAngle),xaxis),verb_core_Vec.mul(yradius * Math.sin(startAngle),yaxis)));
	var T0 = verb_core_Vec.sub(verb_core_Vec.mul(Math.cos(startAngle),yaxis),verb_core_Vec.mul(Math.sin(startAngle),xaxis));
	var controlPoints = [];
	var knots = verb_core_Vec.zeros1d(2 * numArcs + 3);
	var index = 0;
	var angle = startAngle;
	var weights = verb_core_Vec.zeros1d(numArcs * 2);
	controlPoints[0] = P0;
	weights[0] = 1.0;
	var _g1 = 1;
	var _g = numArcs + 1;
	while(_g1 < _g) {
		var i = _g1++;
		angle += dtheta;
		var P2 = verb_core_Vec.add(center,verb_core_Vec.add(verb_core_Vec.mul(xradius * Math.cos(angle),xaxis),verb_core_Vec.mul(yradius * Math.sin(angle),yaxis)));
		weights[index + 2] = 1;
		controlPoints[index + 2] = P2;
		var T2 = verb_core_Vec.sub(verb_core_Vec.mul(Math.cos(angle),yaxis),verb_core_Vec.mul(Math.sin(angle),xaxis));
		var inters = verb_core_Intersect.rays(P0,verb_core_Vec.mul(1 / verb_core_Vec.norm(T0),T0),P2,verb_core_Vec.mul(1 / verb_core_Vec.norm(T2),T2));
		var P1 = verb_core_Vec.add(P0,verb_core_Vec.mul(inters.u0,T0));
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
	return new verb_core_types_NurbsCurveData(2,knots,verb_core_Eval.homogenize1d(controlPoints,weights));
};
verb_core_Make.arc = function(center,xaxis,yaxis,radius,startAngle,endAngle) {
	return verb_core_Make.ellipseArc(center,verb_core_Vec.mul(radius,verb_core_Vec.normalized(xaxis)),verb_core_Vec.mul(radius,verb_core_Vec.normalized(yaxis)),startAngle,endAngle);
};
verb_core_Make.polyline = function(pts) {
	var knots = [0.0,0.0];
	var lsum = 0.0;
	var _g1 = 0;
	var _g = pts.length - 1;
	while(_g1 < _g) {
		var i = _g1++;
		lsum += verb_core_Vec.dist(pts[i],pts[i + 1]);
		knots.push(lsum);
	}
	knots.push(lsum);
	knots = verb_core_Vec.mul(1 / lsum,knots);
	var weights;
	var _g2 = [];
	var _g21 = 0;
	var _g11 = pts.length;
	while(_g21 < _g11) {
		var i1 = _g21++;
		_g2.push(1.0);
	}
	weights = _g2;
	return new verb_core_types_NurbsCurveData(1,knots,verb_core_Eval.homogenize1d(pts.slice(0),weights));
};
verb_core_Make.extrudedSurface = function(axis,length,profile) {
	var controlPoints = [[],[],[]];
	var weights = [[],[],[]];
	var prof_controlPoints = verb_core_Eval.dehomogenize1d(profile.controlPoints);
	var prof_weights = verb_core_Eval.weight1d(profile.controlPoints);
	var translation = verb_core_Vec.mul(length,axis);
	var halfTranslation = verb_core_Vec.mul(0.5 * length,axis);
	var _g1 = 0;
	var _g = prof_controlPoints.length;
	while(_g1 < _g) {
		var j = _g1++;
		controlPoints[2][j] = prof_controlPoints[j];
		controlPoints[1][j] = verb_core_Vec.add(halfTranslation,prof_controlPoints[j]);
		controlPoints[0][j] = verb_core_Vec.add(translation,prof_controlPoints[j]);
		weights[0][j] = prof_weights[j];
		weights[1][j] = prof_weights[j];
		weights[2][j] = prof_weights[j];
	}
	return new verb_core_types_NurbsSurfaceData(2,profile.degree,[0,0,0,1,1,1],profile.knots,verb_core_Eval.homogenize2d(controlPoints,weights));
};
verb_core_Make.cylindricalSurface = function(axis,xaxis,base,height,radius) {
	var yaxis = verb_core_Vec.cross(axis,xaxis);
	var angle = 2.0 * Math.PI;
	var circ = verb_core_Make.arc(base,xaxis,yaxis,radius,0.0,2 * Math.PI);
	return verb_core_Make.extrudedSurface(axis,height,circ);
};
verb_core_Make.revolvedSurface = function(profile,center,axis,theta) {
	var prof_controlPoints = verb_core_Eval.dehomogenize1d(profile.controlPoints);
	var prof_weights = verb_core_Eval.weight1d(profile.controlPoints);
	var narcs;
	var knotsU;
	var controlPoints;
	var weights;
	if(theta <= Math.PI / 2) {
		narcs = 1;
		knotsU = verb_core_Vec.zeros1d(6 + 2 * (narcs - 1));
	} else if(theta <= Math.PI) {
		narcs = 2;
		knotsU = verb_core_Vec.zeros1d(6 + 2 * (narcs - 1));
		knotsU[3] = knotsU[4] = 0.5;
	} else if(theta <= 3 * Math.PI / 2) {
		narcs = 3;
		knotsU = verb_core_Vec.zeros1d(6 + 2 * (narcs - 1));
		knotsU[3] = knotsU[4] = 0.333333333333333315;
		knotsU[5] = knotsU[6] = 0.66666666666666663;
	} else {
		narcs = 4;
		knotsU = verb_core_Vec.zeros1d(6 + 2 * (narcs - 1));
		knotsU[3] = knotsU[4] = 0.25;
		knotsU[5] = knotsU[6] = 0.5;
		knotsU[7] = knotsU[8] = 0.75;
	}
	var dtheta = theta / narcs;
	var j = 3 + 2 * (narcs - 1);
	var _g = 0;
	while(_g < 3) {
		var i = _g++;
		knotsU[i] = 0.0;
		knotsU[j + i] = 1.0;
	}
	var n = 2 * narcs;
	var wm = Math.cos(dtheta / 2.0);
	var angle = 0.0;
	var sines = verb_core_Vec.zeros1d(narcs + 1);
	var cosines = verb_core_Vec.zeros1d(narcs + 1);
	var controlPoints1 = verb_core_Vec.zeros3d(2 * narcs + 1,prof_controlPoints.length,3);
	var weights1 = verb_core_Vec.zeros2d(2 * narcs + 1,prof_controlPoints.length);
	var _g1 = 1;
	var _g2 = narcs + 1;
	while(_g1 < _g2) {
		var i1 = _g1++;
		angle += dtheta;
		cosines[i1] = Math.cos(angle);
		sines[i1] = Math.sin(angle);
	}
	var _g11 = 0;
	var _g3 = prof_controlPoints.length;
	while(_g11 < _g3) {
		var j1 = _g11++;
		var O = verb_core_Trig.rayClosestPoint(prof_controlPoints[j1],center,axis);
		var X = verb_core_Vec.sub(prof_controlPoints[j1],O);
		var r = verb_core_Vec.norm(X);
		var Y = verb_core_Vec.cross(axis,X);
		if(r > 1e-10) {
			X = verb_core_Vec.mul(1 / r,X);
			Y = verb_core_Vec.mul(1 / r,Y);
		}
		controlPoints1[0][j1] = prof_controlPoints[j1];
		var P0 = prof_controlPoints[j1];
		weights1[0][j1] = prof_weights[j1];
		var T0 = Y;
		var index = 0;
		var angle1 = 0.0;
		var _g31 = 1;
		var _g21 = narcs + 1;
		while(_g31 < _g21) {
			var i2 = _g31++;
			var P2;
			if(r == 0) P2 = O; else P2 = verb_core_Vec.add(O,verb_core_Vec.add(verb_core_Vec.mul(r * cosines[i2],X),verb_core_Vec.mul(r * sines[i2],Y)));
			controlPoints1[index + 2][j1] = P2;
			weights1[index + 2][j1] = prof_weights[j1];
			var T2 = verb_core_Vec.sub(verb_core_Vec.mul(cosines[i2],Y),verb_core_Vec.mul(sines[i2],X));
			if(r == 0) controlPoints1[index + 1][j1] = O; else {
				var inters = verb_core_Intersect.rays(P0,verb_core_Vec.mul(1 / verb_core_Vec.norm(T0),T0),P2,verb_core_Vec.mul(1 / verb_core_Vec.norm(T2),T2));
				var P1 = verb_core_Vec.add(P0,verb_core_Vec.mul(inters.u0,T0));
				controlPoints1[index + 1][j1] = P1;
			}
			weights1[index + 1][j1] = wm * prof_weights[j1];
			index += 2;
			if(i2 < narcs) {
				P0 = P2;
				T0 = T2;
			}
		}
	}
	return new verb_core_types_NurbsSurfaceData(2,profile.degree,knotsU,profile.knots,verb_core_Eval.homogenize2d(controlPoints1,weights1));
};
verb_core_Make.sphericalSurface = function(center,axis,xaxis,radius) {
	var arc = verb_core_Make.arc(center,verb_core_Vec.mul(-1.0,axis),xaxis,radius,0.0,Math.PI);
	return verb_core_Make.revolvedSurface(arc,center,axis,2 * Math.PI);
};
verb_core_Make.conicalSurface = function(axis,xaxis,base,height,radius) {
	var angle = 2 * Math.PI;
	var prof_degree = 1;
	var prof_ctrl_pts = [verb_core_Vec.add(base,verb_core_Vec.mul(height,axis)),verb_core_Vec.add(base,verb_core_Vec.mul(radius,xaxis))];
	var prof_knots = [0.0,0.0,1.0,1.0];
	var prof_weights = [1.0,1.0];
	var prof = new verb_core_types_NurbsCurveData(prof_degree,prof_knots,verb_core_Eval.homogenize1d(prof_ctrl_pts,prof_weights));
	return verb_core_Make.revolvedSurface(prof,base,axis,angle);
};
verb_core_Make.rationalInterpCurve = function(points,degree,homogeneousPoints,start_tangent,end_tangent) {
	if(homogeneousPoints == null) homogeneousPoints = false;
	if(degree == null) degree = 3;
	if(points.length < degree + 1) throw new js__$Boot_HaxeError("You need to supply at least degree + 1 points! You only supplied " + points.length + " points.");
	var us = [0.0];
	var _g1 = 1;
	var _g = points.length;
	while(_g1 < _g) {
		var i = _g1++;
		var chord = verb_core_Vec.norm(verb_core_Vec.sub(points[i],points[i - 1]));
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
	var knotsStart = verb_core_Vec.rep(degree + 1,0.0);
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
	var knots = knotsStart.concat(verb_core_Vec.rep(degree + 1,1.0));
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
		var span = verb_core_Eval.knotSpanGivenN(n,degree,u,knots);
		var basisFuncs = verb_core_Eval.basisFunctionsGivenKnotSpanIndex(span,u,degree,knots);
		var ls = span - degree;
		var rowstart = verb_core_Vec.zeros1d(ls);
		var rowend = verb_core_Vec.zeros1d(ld - ls);
		A.push(rowstart.concat(basisFuncs).concat(rowend));
	}
	if(hasTangents) {
		var ln = A[0].length - 2;
		var tanRow0 = [-1.0,1.0].concat(verb_core_Vec.zeros1d(ln));
		var tanRow1 = verb_core_Vec.zeros1d(ln).concat([-1.0,1.0]);
		verb_core_ArrayExtensions.spliceAndInsert(A,1,0,tanRow0);
		verb_core_ArrayExtensions.spliceAndInsert(A,A.length - 1,0,tanRow1);
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
			return function(x1) {
				return x1[i3[0]];
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
		var x = verb_core_Mat.solve(A,b);
		xs.push(x);
	}
	var controlPts = verb_core_Mat.transpose(xs);
	if(!homogeneousPoints) {
		var weights = verb_core_Vec.rep(controlPts.length,1.0);
		controlPts = verb_core_Eval.homogenize1d(controlPts,weights);
	}
	return new verb_core_types_NurbsCurveData(degree,knots,controlPts);
};
var verb_core_LUDecomp = function(lu,p) {
	this.LU = lu;
	this.P = p;
};
verb_core_LUDecomp.__name__ = ["verb","core","LUDecomp"];
var verb_core_Mat = $hx_exports.core.Mat = function() { };
verb_core_Mat.__name__ = ["verb","core","Mat"];
verb_core_Mat.mul = function(a,b) {
	var _g = [];
	var _g2 = 0;
	var _g1 = b.length;
	while(_g2 < _g1) {
		var i = _g2++;
		_g.push(verb_core_Vec.mul(a,b[i]));
	}
	return _g;
};
verb_core_Mat.mult = function(x,y) {
	var p;
	var q;
	var r;
	var ret;
	var foo;
	var bar;
	var woo;
	var i0;
	var k0;
	var p0;
	var r0;
	p = x.length;
	q = y.length;
	r = y[0].length;
	ret = [];
	var i = p - 1;
	var j = 0;
	var k = 0;
	while(i >= 0) {
		foo = [];
		bar = x[i];
		k = r - 1;
		while(k >= 0) {
			woo = bar[q - 1] * y[q - 1][k];
			j = q - 2;
			while(j >= 1) {
				i0 = j - 1;
				woo += bar[j] * y[j][k] + bar[i0] * y[i0][k];
				j -= 2;
			}
			if(j == 0) woo += bar[0] * y[0][k];
			foo[k] = woo;
			k--;
		}
		ret[i] = foo;
		i--;
	}
	return ret;
};
verb_core_Mat.add = function(a,b) {
	var _g = [];
	var _g2 = 0;
	var _g1 = a.length;
	while(_g2 < _g1) {
		var i = _g2++;
		_g.push(verb_core_Vec.add(a[i],b[i]));
	}
	return _g;
};
verb_core_Mat.div = function(a,b) {
	var _g = [];
	var _g2 = 0;
	var _g1 = a.length;
	while(_g2 < _g1) {
		var i = _g2++;
		_g.push(verb_core_Vec.div(a[i],b));
	}
	return _g;
};
verb_core_Mat.sub = function(a,b) {
	var _g = [];
	var _g2 = 0;
	var _g1 = a.length;
	while(_g2 < _g1) {
		var i = _g2++;
		_g.push(verb_core_Vec.sub(a[i],b[i]));
	}
	return _g;
};
verb_core_Mat.dot = function(a,b) {
	var _g = [];
	var _g2 = 0;
	var _g1 = a.length;
	while(_g2 < _g1) {
		var i = _g2++;
		_g.push(verb_core_Vec.dot(a[i],b));
	}
	return _g;
};
verb_core_Mat.identity = function(n) {
	var zeros = verb_core_Vec.zeros2d(n,n);
	var _g = 0;
	while(_g < n) {
		var i = _g++;
		zeros[i][i] = 1.0;
	}
	return zeros;
};
verb_core_Mat.transpose = function(a) {
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
verb_core_Mat.solve = function(A,b) {
	return verb_core_Mat.LUsolve(verb_core_Mat.LU(A),b);
};
verb_core_Mat.LUsolve = function(LUP,b) {
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
verb_core_Mat.LU = function(A) {
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
	var P = [];
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
	return new verb_core_LUDecomp(A,P);
};
var verb_core_Mesh = $hx_exports.core.Mesh = function() { };
verb_core_Mesh.__name__ = ["verb","core","Mesh"];
verb_core_Mesh.getTriangleNorm = function(points,tri) {
	var v0 = points[tri[0]];
	var v1 = points[tri[1]];
	var v2 = points[tri[2]];
	var u = verb_core_Vec.sub(v1,v0);
	var v = verb_core_Vec.sub(v2,v0);
	var n = verb_core_Vec.cross(u,v);
	return verb_core_Vec.mul(1 / verb_core_Vec.norm(n),n);
};
verb_core_Mesh.makeMeshAabb = function(mesh,faceIndices) {
	var bb = new verb_core_types_BoundingBox();
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
verb_core_Mesh.makeMeshAabbTree = function(mesh,faceIndices) {
	var aabb = verb_core_Mesh.makeMeshAabb(mesh,faceIndices);
	if(faceIndices.length == 1) return new verb_core_types_BoundingBoxLeaf(aabb,faceIndices[0]);
	var sortedIndices = verb_core_Mesh.sortTrianglesOnLongestAxis(aabb,mesh,faceIndices);
	var leftIndices = verb_core_ArrayExtensions.left(sortedIndices);
	var rightIndices = verb_core_ArrayExtensions.right(sortedIndices);
	return new verb_core_types_BoundingBoxInnerNode(aabb,[verb_core_Mesh.makeMeshAabbTree(mesh,leftIndices),verb_core_Mesh.makeMeshAabbTree(mesh,rightIndices)]);
};
verb_core_Mesh.sortTrianglesOnLongestAxis = function(bb,mesh,faceIndices) {
	var longAxis = bb.getLongestAxis();
	var minCoordFaceMap = [];
	var _g = 0;
	while(_g < faceIndices.length) {
		var faceIndex = faceIndices[_g];
		++_g;
		var tri_min = verb_core_Mesh.getMinCoordOnAxis(mesh.points,mesh.faces[faceIndex],longAxis);
		minCoordFaceMap.push(new verb_core_types_Pair(tri_min,faceIndex));
	}
	minCoordFaceMap.sort(function(a,b) {
		var a0 = a.item0;
		var b0 = b.item0;
		if(a0 == b0) return 0; else if(a0 > b0) return 1; else return -1;
	});
	var sortedFaceIndices = [];
	var _g1 = 0;
	var _g2 = minCoordFaceMap.length;
	while(_g1 < _g2) {
		var i = _g1++;
		sortedFaceIndices.push(minCoordFaceMap[i].item1);
	}
	return sortedFaceIndices;
};
verb_core_Mesh.getMinCoordOnAxis = function(points,tri,axis) {
	var min = Infinity;
	var _g = 0;
	while(_g < 3) {
		var i = _g++;
		var coord = points[tri[i]][axis];
		if(coord < min) min = coord;
	}
	return min;
};
verb_core_Mesh.getTriangleCentroid = function(points,tri) {
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
verb_core_Mesh.triangleUVFromPoint = function(mesh,faceIndex,f) {
	var tri = mesh.faces[faceIndex];
	var p1 = mesh.points[tri[0]];
	var p2 = mesh.points[tri[1]];
	var p3 = mesh.points[tri[2]];
	var uv1 = mesh.uvs[tri[0]];
	var uv2 = mesh.uvs[tri[1]];
	var uv3 = mesh.uvs[tri[2]];
	var f1 = verb_core_Vec.sub(p1,f);
	var f2 = verb_core_Vec.sub(p2,f);
	var f3 = verb_core_Vec.sub(p3,f);
	var a = verb_core_Vec.norm(verb_core_Vec.cross(verb_core_Vec.sub(p1,p2),verb_core_Vec.sub(p1,p3)));
	var a1 = verb_core_Vec.norm(verb_core_Vec.cross(f2,f3)) / a;
	var a2 = verb_core_Vec.norm(verb_core_Vec.cross(f3,f1)) / a;
	var a3 = verb_core_Vec.norm(verb_core_Vec.cross(f1,f2)) / a;
	return verb_core_Vec.add(verb_core_Vec.mul(a1,uv1),verb_core_Vec.add(verb_core_Vec.mul(a2,uv2),verb_core_Vec.mul(a3,uv3)));
};
var verb_core_Modify = $hx_exports.core.Modify = function() { };
verb_core_Modify.__name__ = ["verb","core","Modify"];
verb_core_Modify.curveReverse = function(curve) {
	return new verb_core_types_NurbsCurveData(curve.degree,verb_core_Modify.knotsReverse(curve.knots),verb_core_ArrayExtensions.reversed(curve.controlPoints));
};
verb_core_Modify.surfaceReverse = function(surface,useV) {
	if(useV == null) useV = false;
	if(useV) return new verb_core_types_NurbsSurfaceData(surface.degreeU,surface.degreeV,surface.knotsU,verb_core_Modify.knotsReverse(surface.knotsV),(function($this) {
		var $r;
		var _g = [];
		{
			var _g1 = 0;
			var _g2 = surface.controlPoints;
			while(_g1 < _g2.length) {
				var row = _g2[_g1];
				++_g1;
				_g.push(verb_core_ArrayExtensions.reversed(row));
			}
		}
		$r = _g;
		return $r;
	}(this)));
	return new verb_core_types_NurbsSurfaceData(surface.degreeU,surface.degreeV,verb_core_Modify.knotsReverse(surface.knotsU),surface.knotsV,verb_core_ArrayExtensions.reversed(surface.controlPoints));
};
verb_core_Modify.knotsReverse = function(knots) {
	var min = knots[0];
	var max = knots[knots.length - 1];
	var l = [min];
	var len = knots.length;
	var _g = 1;
	while(_g < len) {
		var i = _g++;
		l.push(l[i - 1] + (knots[len - i] - knots[len - i - 1]));
	}
	return l;
};
verb_core_Modify.unifyCurveKnotVectors = function(curves) {
	curves = curves.map(verb_core_Make.clonedCurve);
	var maxDegree = Lambda.fold(curves,function(x,a) {
		return verb_core_Modify.imax(x.degree,a);
	},0);
	var _g1 = 0;
	var _g = curves.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(curves[i].degree < maxDegree) curves[i] = verb_core_Modify.curveElevateDegree(curves[i],maxDegree);
	}
	var knotIntervals;
	var _g2 = [];
	var _g11 = 0;
	while(_g11 < curves.length) {
		var c = curves[_g11];
		++_g11;
		_g2.push(new verb_core_types_Interval(c.knots[0],verb_core_ArrayExtensions.last(c.knots)));
	}
	knotIntervals = _g2;
	var _g21 = 0;
	var _g12 = curves.length;
	while(_g21 < _g12) {
		var i1 = _g21++;
		var min = [knotIntervals[i1].min];
		curves[i1].knots = curves[i1].knots.map((function(min) {
			return function(x4) {
				return x4 - min[0];
			};
		})(min));
	}
	var knotSpans = knotIntervals.map(function(x1) {
		return x1.max - x1.min;
	});
	var maxKnotSpan = Lambda.fold(knotSpans,function(x2,a1) {
		return Math.max(x2,a1);
	},0.0);
	var _g22 = 0;
	var _g13 = curves.length;
	while(_g22 < _g13) {
		var i2 = _g22++;
		var scale = [maxKnotSpan / knotSpans[i2]];
		curves[i2].knots = curves[i2].knots.map((function(scale) {
			return function(x5) {
				return x5 * scale[0];
			};
		})(scale));
	}
	var mergedKnots = Lambda.fold(curves,function(x3,a2) {
		return verb_core_Vec.sortedSetUnion(x3.knots,a2);
	},[]);
	var _g23 = 0;
	var _g14 = curves.length;
	while(_g23 < _g14) {
		var i3 = _g23++;
		var rem = verb_core_Vec.sortedSetSub(mergedKnots,curves[i3].knots);
		if(rem.length == 0) curves[i3] = curves[i3];
		curves[i3] = verb_core_Modify.curveKnotRefine(curves[i3],rem);
	}
	return curves;
};
verb_core_Modify.imin = function(a,b) {
	if(a < b) return a; else return b;
};
verb_core_Modify.imax = function(a,b) {
	if(a > b) return a; else return b;
};
verb_core_Modify.curveElevateDegree = function(curve,finalDegree) {
	if(finalDegree <= curve.degree) return curve;
	var n = curve.knots.length - curve.degree - 2;
	var newDegree = curve.degree;
	var knots = curve.knots;
	var controlPoints = curve.controlPoints;
	var degreeInc = finalDegree - curve.degree;
	var dim = curve.controlPoints[0].length;
	var bezalfs = verb_core_Vec.zeros2d(newDegree + degreeInc + 1,newDegree + 1);
	var bpts = [];
	var ebpts = [];
	var Nextbpts = [];
	var alphas = [];
	var m = n + newDegree + 1;
	var ph = finalDegree;
	var ph2 = Math.floor(ph / 2);
	var Qw = [];
	var Uh = [];
	var nh;
	bezalfs[0][0] = 1.0;
	bezalfs[ph][newDegree] = 1.0;
	var _g1 = 1;
	var _g = ph2 + 1;
	while(_g1 < _g) {
		var i = _g1++;
		var inv = 1.0 / verb_core_Binomial.get(ph,i);
		var mpi;
		if(newDegree < i) mpi = newDegree; else mpi = i;
		var _g3 = verb_core_Modify.imax(0,i - degreeInc);
		var _g2 = mpi + 1;
		while(_g3 < _g2) {
			var j = _g3++;
			bezalfs[i][j] = inv * verb_core_Binomial.get(newDegree,j) * verb_core_Binomial.get(degreeInc,i - j);
		}
	}
	var _g4 = ph2 + 1;
	while(_g4 < ph) {
		var i1 = _g4++;
		var mpi1;
		if(newDegree < i1) mpi1 = newDegree; else mpi1 = i1;
		var _g21 = verb_core_Modify.imax(0,i1 - degreeInc);
		var _g11 = mpi1 + 1;
		while(_g21 < _g11) {
			var j1 = _g21++;
			bezalfs[i1][j1] = bezalfs[ph - i1][newDegree - j1];
		}
	}
	var mh = ph;
	var kind = ph + 1;
	var r = -1;
	var a = newDegree;
	var b = newDegree + 1;
	var cind = 1;
	var ua = knots[0];
	Qw[0] = controlPoints[0];
	var _g12 = 0;
	var _g5 = ph + 1;
	while(_g12 < _g5) {
		var i2 = _g12++;
		Uh[i2] = ua;
	}
	var _g13 = 0;
	var _g6 = newDegree + 1;
	while(_g13 < _g6) {
		var i3 = _g13++;
		bpts[i3] = controlPoints[i3];
	}
	while(b < m) {
		var i4 = b;
		while(b < m && knots[b] == knots[b + 1]) b = b + 1;
		var mul = b - i4 + 1;
		var mh1 = mh + mul + degreeInc;
		var ub = knots[b];
		var oldr = r;
		r = newDegree - mul;
		var lbz;
		if(oldr > 0) lbz = Math.floor((oldr + 2) / 2); else lbz = 1;
		var rbz;
		if(r > 0) rbz = Math.floor(ph - (r + 1) / 2); else rbz = ph;
		if(r > 0) {
			var numer = ub - ua;
			var alfs = [];
			var k = newDegree;
			while(k > mul) {
				alfs[k - mul - 1] = numer / (knots[a + k] - ua);
				k--;
			}
			var _g14 = 1;
			var _g7 = r + 1;
			while(_g14 < _g7) {
				var j2 = _g14++;
				var save = r - j2;
				var s = mul + j2;
				var k1 = newDegree;
				while(k1 >= s) {
					bpts[k1] = verb_core_Vec.add(verb_core_Vec.mul(alfs[k1 - s],bpts[k1]),verb_core_Vec.mul(1.0 - alfs[k1 - s],bpts[k1 - 1]));
					k1--;
				}
				Nextbpts[save] = bpts[newDegree];
			}
		}
		var _g15 = lbz;
		var _g8 = ph + 1;
		while(_g15 < _g8) {
			var i5 = _g15++;
			ebpts[i5] = verb_core_Vec.zeros1d(dim);
			var mpi2;
			if(newDegree < i5) mpi2 = newDegree; else mpi2 = i5;
			var _g31 = verb_core_Modify.imax(0,i5 - degreeInc);
			var _g22 = mpi2 + 1;
			while(_g31 < _g22) {
				var j3 = _g31++;
				ebpts[i5] = verb_core_Vec.add(ebpts[i5],verb_core_Vec.mul(bezalfs[i5][j3],bpts[j3]));
			}
		}
		if(oldr > 1) {
			var first = kind - 2;
			var last = kind;
			var den = ub - ua;
			var bet = (ub - Uh[kind - 1]) / den;
			var _g9 = 1;
			while(_g9 < oldr) {
				var tr = _g9++;
				var i6 = first;
				var j4 = last;
				var kj = j4 - kind + 1;
				while(j4 - i6 > tr) {
					if(i6 < cind) {
						var alf = (ub - Uh[i6]) / (ua - Uh[i6]);
						Qw[i6] = verb_core_Vec.lerp(alf,Qw[i6],Qw[i6 - 1]);
					}
					if(j4 >= lbz) {
						if(j4 - tr <= kind - ph + oldr) {
							var gam = (ub - Uh[j4 - tr]) / den;
							ebpts[kj] = verb_core_Vec.lerp(gam,ebpts[kj],ebpts[kj + 1]);
						}
					} else ebpts[kj] = verb_core_Vec.lerp(bet,ebpts[kj],ebpts[kj + 1]);
					i6 = i6 + 1;
					j4 = j4 - 1;
					kj = kj - 1;
				}
				first = first - 1;
				last = last + 1;
			}
		}
		if(a != newDegree) {
			var _g16 = 0;
			var _g10 = ph - oldr;
			while(_g16 < _g10) {
				var i7 = _g16++;
				Uh[kind] = ua;
				kind = kind + 1;
			}
		}
		var _g17 = lbz;
		var _g18 = rbz + 1;
		while(_g17 < _g18) {
			var j5 = _g17++;
			Qw[cind] = ebpts[j5];
			cind = cind + 1;
		}
		if(b < m) {
			var _g19 = 0;
			while(_g19 < r) {
				var j6 = _g19++;
				bpts[j6] = Nextbpts[j6];
			}
			var _g110 = r;
			var _g20 = newDegree + 1;
			while(_g110 < _g20) {
				var j7 = _g110++;
				bpts[j7] = controlPoints[b - newDegree + j7];
			}
			a = b;
			b = b + 1;
			ua = ub;
		} else {
			var _g111 = 0;
			var _g23 = ph + 1;
			while(_g111 < _g23) {
				var i8 = _g111++;
				Uh[kind + i8] = ub;
			}
		}
	}
	nh = mh - ph - 1;
	return new verb_core_types_NurbsCurveData(finalDegree,Uh,Qw);
};
verb_core_Modify.rationalSurfaceTransform = function(surface,mat) {
	var pts = verb_core_Eval.dehomogenize2d(surface.controlPoints);
	var _g1 = 0;
	var _g = pts.length;
	while(_g1 < _g) {
		var i = _g1++;
		var _g3 = 0;
		var _g2 = pts[i].length;
		while(_g3 < _g2) {
			var j = _g3++;
			var homoPt = pts[i][j];
			homoPt.push(1.0);
			pts[i][j] = verb_core_Mat.dot(mat,homoPt).slice(0,homoPt.length - 1);
		}
	}
	return new verb_core_types_NurbsSurfaceData(surface.degreeU,surface.degreeV,surface.knotsU.slice(),surface.knotsV.slice(),verb_core_Eval.homogenize2d(pts,verb_core_Eval.weight2d(surface.controlPoints)));
};
verb_core_Modify.rationalCurveTransform = function(curve,mat) {
	var pts = verb_core_Eval.dehomogenize1d(curve.controlPoints);
	var _g1 = 0;
	var _g = pts.length;
	while(_g1 < _g) {
		var i = _g1++;
		var homoPt = pts[i];
		homoPt.push(1.0);
		pts[i] = verb_core_Mat.dot(mat,homoPt).slice(0,homoPt.length - 1);
	}
	return new verb_core_types_NurbsCurveData(curve.degree,curve.knots.slice(),verb_core_Eval.homogenize1d(pts,verb_core_Eval.weight1d(curve.controlPoints)));
};
verb_core_Modify.surfaceKnotRefine = function(surface,knotsToInsert,useV) {
	var newPts = [];
	var knots;
	var degree;
	var ctrlPts;
	if(!useV) {
		ctrlPts = verb_core_Mat.transpose(surface.controlPoints);
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
		c = verb_core_Modify.curveKnotRefine(new verb_core_types_NurbsCurveData(degree,knots,cptrow),knotsToInsert);
		newPts.push(c.controlPoints);
	}
	var newknots = c.knots;
	if(!useV) {
		newPts = verb_core_Mat.transpose(newPts);
		return new verb_core_types_NurbsSurfaceData(surface.degreeU,surface.degreeV,newknots,surface.knotsV.slice(),newPts);
	} else return new verb_core_types_NurbsSurfaceData(surface.degreeU,surface.degreeV,surface.knotsU.slice(),newknots,newPts);
};
verb_core_Modify.surfaceSplit = function(surface,u,useV) {
	if(useV == null) useV = false;
	var knots;
	var degree;
	var controlPoints;
	if(!useV) {
		controlPoints = verb_core_Mat.transpose(surface.controlPoints);
		knots = surface.knotsU;
		degree = surface.degreeU;
	} else {
		controlPoints = surface.controlPoints;
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
	var newpts0 = [];
	var newpts1 = [];
	var s = verb_core_Eval.knotSpan(degree,u,knots);
	var res = null;
	var _g11 = 0;
	while(_g11 < controlPoints.length) {
		var cps = controlPoints[_g11];
		++_g11;
		res = verb_core_Modify.curveKnotRefine(new verb_core_types_NurbsCurveData(degree,knots,cps),knots_to_insert);
		newpts0.push(res.controlPoints.slice(0,s + 1));
		newpts1.push(res.controlPoints.slice(s + 1));
	}
	var knots0 = res.knots.slice(0,s + degree + 2);
	var knots1 = res.knots.slice(s + 1);
	if(!useV) {
		newpts0 = verb_core_Mat.transpose(newpts0);
		newpts1 = verb_core_Mat.transpose(newpts1);
		return [new verb_core_types_NurbsSurfaceData(degree,surface.degreeV,knots0,surface.knotsV.slice(),newpts0),new verb_core_types_NurbsSurfaceData(degree,surface.degreeV,knots1,surface.knotsV.slice(),newpts1)];
	}
	return [new verb_core_types_NurbsSurfaceData(surface.degreeU,degree,surface.knotsU.slice(),knots0,newpts0),new verb_core_types_NurbsSurfaceData(surface.degreeU,degree,surface.knotsU.slice(),knots1,newpts1)];
};
verb_core_Modify.decomposeCurveIntoBeziers = function(curve) {
	var degree = curve.degree;
	var controlPoints = curve.controlPoints;
	var knots = curve.knots;
	var knotmults = verb_core_Analyze.knotMultiplicities(knots);
	var reqMult = degree + 1;
	var _g = 0;
	while(_g < knotmults.length) {
		var knotmult = knotmults[_g];
		++_g;
		if(knotmult.mult < reqMult) {
			var knotsInsert = verb_core_Vec.rep(reqMult - knotmult.mult,knotmult.knot);
			var res = verb_core_Modify.curveKnotRefine(new verb_core_types_NurbsCurveData(degree,knots,controlPoints),knotsInsert);
			knots = res.knots;
			controlPoints = res.controlPoints;
		}
	}
	var numCrvs = knots.length / reqMult - 1;
	var crvKnotLength = reqMult * 2;
	var crvs = [];
	var i = 0;
	while(i < controlPoints.length) {
		var kts = knots.slice(i,i + crvKnotLength);
		var pts = controlPoints.slice(i,i + reqMult);
		crvs.push(new verb_core_types_NurbsCurveData(degree,kts,pts));
		i += reqMult;
	}
	return crvs;
};
verb_core_Modify.curveSplit = function(curve,u) {
	var degree = curve.degree;
	var controlPoints = curve.controlPoints;
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
	var res = verb_core_Modify.curveKnotRefine(curve,knots_to_insert);
	var s = verb_core_Eval.knotSpan(degree,u,knots);
	var knots0 = res.knots.slice(0,s + degree + 2);
	var knots1 = res.knots.slice(s + 1);
	var cpts0 = res.controlPoints.slice(0,s + 1);
	var cpts1 = res.controlPoints.slice(s + 1);
	return [new verb_core_types_NurbsCurveData(degree,knots0,cpts0),new verb_core_types_NurbsCurveData(degree,knots1,cpts1)];
};
verb_core_Modify.curveKnotRefine = function(curve,knotsToInsert) {
	if(knotsToInsert.length == 0) return verb_core_Make.clonedCurve(curve);
	var degree = curve.degree;
	var controlPoints = curve.controlPoints;
	var knots = curve.knots;
	var n = controlPoints.length - 1;
	var m = n + degree + 1;
	var r = knotsToInsert.length - 1;
	var a = verb_core_Eval.knotSpan(degree,knotsToInsert[0],knots);
	var b = verb_core_Eval.knotSpan(degree,knotsToInsert[r],knots);
	var controlPoints_post = [];
	var knots_post = [];
	var _g1 = 0;
	var _g = a - degree + 1;
	while(_g1 < _g) {
		var i1 = _g1++;
		controlPoints_post[i1] = controlPoints[i1];
	}
	var _g11 = b - 1;
	var _g2 = n + 1;
	while(_g11 < _g2) {
		var i2 = _g11++;
		controlPoints_post[i2 + r + 1] = controlPoints[i2];
	}
	var _g12 = 0;
	var _g3 = a + 1;
	while(_g12 < _g3) {
		var i3 = _g12++;
		knots_post[i3] = knots[i3];
	}
	var _g13 = b + degree;
	var _g4 = m + 1;
	while(_g13 < _g4) {
		var i4 = _g13++;
		knots_post[i4 + r + 1] = knots[i4];
	}
	var i = b + degree - 1;
	var k = b + degree + r;
	var j = r;
	while(j >= 0) {
		while(knotsToInsert[j] <= knots[i] && i > a) {
			controlPoints_post[k - degree - 1] = controlPoints[i - degree - 1];
			knots_post[k] = knots[i];
			k = k - 1;
			i = i - 1;
		}
		controlPoints_post[k - degree - 1] = controlPoints_post[k - degree];
		var _g14 = 1;
		var _g5 = degree + 1;
		while(_g14 < _g5) {
			var l = _g14++;
			var ind = k - degree + l;
			var alfa = knots_post[k + l] - knotsToInsert[j];
			if(Math.abs(alfa) < 1e-10) controlPoints_post[ind - 1] = controlPoints_post[ind]; else {
				alfa = alfa / (knots_post[k + l] - knots[i - degree + l]);
				controlPoints_post[ind - 1] = verb_core_Vec.add(verb_core_Vec.mul(alfa,controlPoints_post[ind - 1]),verb_core_Vec.mul(1.0 - alfa,controlPoints_post[ind]));
			}
		}
		knots_post[k] = knotsToInsert[j];
		k = k - 1;
		j--;
	}
	return new verb_core_types_NurbsCurveData(degree,knots_post,controlPoints_post);
};
verb_core_Modify.curveKnotInsert = function(curve,u,r) {
	var degree = curve.degree;
	var controlPoints = curve.controlPoints;
	var knots = curve.knots;
	var s = 0;
	var num_pts = controlPoints.length;
	var k = verb_core_Eval.knotSpan(degree,u,knots);
	var num_pts_post = num_pts + r;
	var controlPoints_temp = [];
	var knots_post = [];
	var controlPoints_post = [];
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
		controlPoints_post[i4] = controlPoints[i4];
	}
	var _g5 = k - s;
	while(_g5 < num_pts) {
		var i5 = _g5++;
		controlPoints_post[i5 + r] = controlPoints[i5];
	}
	var _g14 = 0;
	var _g6 = degree - s + 1;
	while(_g14 < _g6) {
		var i6 = _g14++;
		controlPoints_temp[i6] = controlPoints[k - degree + i6];
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
			controlPoints_temp[i7] = verb_core_Vec.add(verb_core_Vec.mul(alpha,controlPoints_temp[i7 + 1]),verb_core_Vec.mul(1.0 - alpha,controlPoints_temp[i7]));
		}
		controlPoints_post[L] = controlPoints_temp[0];
		controlPoints_post[k + r - j - s] = controlPoints_temp[degree - j - s];
	}
	var _g16 = L + 1;
	var _g8 = k - s;
	while(_g16 < _g8) {
		var i8 = _g16++;
		controlPoints_post[i8] = controlPoints_temp[i8 - L];
	}
	return new verb_core_types_NurbsCurveData(degree,knots_post,controlPoints_post);
};
var verb_core_MinimizationResult = function(solution,value,gradient,invHessian,iterations,message) {
	this.solution = solution;
	this.value = value;
	this.gradient = gradient;
	this.invHessian = invHessian;
	this.iterations = iterations;
	this.message = message;
};
verb_core_MinimizationResult.__name__ = ["verb","core","MinimizationResult"];
var verb_core_Numeric = function() { };
verb_core_Numeric.__name__ = ["verb","core","Numeric"];
verb_core_Numeric.numericalGradient = function(f,x) {
	var n = x.length;
	var f0 = f(x);
	if(f0 == NaN) throw new js__$Boot_HaxeError("gradient: f(x) is a NaN!");
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
			if(it > 20) throw new js__$Boot_HaxeError("Numerical gradient fails");
			x0[i1] = x[i1] + h;
			f1 = f(x0);
			x0[i1] = x[i1] - h;
			f2 = f(x0);
			x0[i1] = x[i1];
			if(isNaN(f1) || isNaN(f2)) {
				h /= 16;
				continue;
			}
			J[i1] = (f1 - f2) / (2 * h);
			t0 = x[i1] - h;
			t1 = x[i1];
			t2 = x[i1] + h;
			d1 = (f1 - f0) / h;
			d2 = (f0 - f2) / h;
			N = verb_core_Vec.max([Math.abs(J[i1]),Math.abs(f0),Math.abs(f1),Math.abs(f2),Math.abs(t0),Math.abs(t1),Math.abs(t2),1e-8]);
			errest = Math.min(verb_core_Vec.max([Math.abs(d1 - J[i1]),Math.abs(d2 - J[i1]),Math.abs(d1 - d2)]) / N,h / N);
			if(errest > eps) h /= 16; else break;
		}
	}
	return J;
};
verb_core_Numeric.uncmin = function(f,x0,tol,gradient,maxit) {
	if(tol == null) tol = 1e-8;
	if(gradient == null) gradient = function(x) {
		return verb_core_Numeric.numericalGradient(f,x);
	};
	if(maxit == null) maxit = 1000;
	x0 = x0.slice(0);
	var n = x0.length;
	var f0 = f(x0);
	var f1 = f0;
	var df0;
	if(isNaN(f0)) throw new js__$Boot_HaxeError("uncmin: f(x0) is a NaN!");
	tol = Math.max(tol,1e-10);
	var step;
	var g0;
	var g1;
	var H1 = verb_core_Mat.identity(n);
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
		if(!verb_core_Vec.all(verb_core_Vec.finite(g0))) {
			msg = "Gradient has Infinity or NaN";
			break;
		}
		step = verb_core_Vec.neg(verb_core_Mat.dot(H1,g0));
		if(!verb_core_Vec.all(verb_core_Vec.finite(step))) {
			msg = "Search direction has Infinity or NaN";
			break;
		}
		nstep = verb_core_Vec.norm(step);
		if(nstep < tol) {
			msg = "Newton step smaller than tol";
			break;
		}
		t = 1.0;
		df0 = verb_core_Vec.dot(g0,step);
		x1 = x0;
		while(it < maxit) {
			if(t * nstep < tol) break;
			s = verb_core_Vec.mul(t,step);
			x1 = verb_core_Vec.add(x0,s);
			f1 = f(x1);
			if(f1 - f0 >= 0.1 * t * df0 || isNaN(f1)) {
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
		y = verb_core_Vec.sub(g1,g0);
		ys = verb_core_Vec.dot(y,s);
		Hy = verb_core_Mat.dot(H1,y);
		H1 = verb_core_Mat.sub(verb_core_Mat.add(H1,verb_core_Mat.mul((ys + verb_core_Vec.dot(y,Hy)) / (ys * ys),verb_core_Numeric.tensor(s,s))),verb_core_Mat.div(verb_core_Mat.add(verb_core_Numeric.tensor(Hy,s),verb_core_Numeric.tensor(s,Hy)),ys));
		x0 = x1;
		f0 = f1;
		g0 = g1;
		++it;
	}
	return new verb_core_MinimizationResult(x0,f0,g0,H1,it,msg);
};
verb_core_Numeric.tensor = function(x,y) {
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
var verb_core_Tess = $hx_exports.core.Tess = function() { };
verb_core_Tess.__name__ = ["verb","core","Tess"];
verb_core_Tess.rationalCurveRegularSample = function(curve,numSamples,includeU) {
	return verb_core_Tess.rationalCurveRegularSampleRange(curve,curve.knots[0],verb_core_ArrayExtensions.last(curve.knots),numSamples,includeU);
};
verb_core_Tess.rationalCurveRegularSampleRange = function(curve,start,end,numSamples,includeU) {
	if(numSamples < 1) numSamples = 2;
	var p = [];
	var span = (end - start) / (numSamples - 1);
	var u = 0;
	var _g = 0;
	while(_g < numSamples) {
		var i = _g++;
		u = start + span * i;
		if(includeU) p.push([u].concat(verb_core_Eval.rationalCurvePoint(curve,u))); else p.push(verb_core_Eval.rationalCurvePoint(curve,u));
	}
	return p;
};
verb_core_Tess.rationalCurveAdaptiveSample = function(curve,tol,includeU) {
	if(includeU == null) includeU = false;
	if(tol == null) tol = 1e-6;
	if(curve.degree == 1) {
		if(!includeU) return curve.controlPoints.map(verb_core_Eval.dehomogenize); else {
			var _g = [];
			var _g2 = 0;
			var _g1 = curve.controlPoints.length;
			while(_g2 < _g1) {
				var i = _g2++;
				_g.push([curve.knots[i + 1]].concat(verb_core_Eval.dehomogenize(curve.controlPoints[i])));
			}
			return _g;
		}
	}
	return verb_core_Tess.rationalCurveAdaptiveSampleRange(curve,curve.knots[0],verb_core_ArrayExtensions.last(curve.knots),tol,includeU);
};
verb_core_Tess.rationalCurveAdaptiveSampleRange = function(curve,start,end,tol,includeU) {
	var p1 = verb_core_Eval.rationalCurvePoint(curve,start);
	var p3 = verb_core_Eval.rationalCurvePoint(curve,end);
	var t = 0.5 + 0.2 * Math.random();
	var mid = start + (end - start) * t;
	var p2 = verb_core_Eval.rationalCurvePoint(curve,mid);
	var diff = verb_core_Vec.sub(p1,p3);
	var diff2 = verb_core_Vec.sub(p1,p2);
	if(verb_core_Vec.dot(diff,diff) < tol && verb_core_Vec.dot(diff2,diff2) > tol || !verb_core_Trig.threePointsAreFlat(p1,p2,p3,tol)) {
		var exact_mid = start + (end - start) * 0.5;
		var left_pts = verb_core_Tess.rationalCurveAdaptiveSampleRange(curve,start,exact_mid,tol,includeU);
		var right_pts = verb_core_Tess.rationalCurveAdaptiveSampleRange(curve,exact_mid,end,tol,includeU);
		return left_pts.slice(0,-1).concat(right_pts);
	} else if(includeU) return [[start].concat(p1),[end].concat(p3)]; else return [p1,p3];
};
verb_core_Tess.rationalSurfaceNaive = function(surface,divs_u,divs_v) {
	if(divs_u < 1) divs_u = 1;
	if(divs_v < 1) divs_v = 1;
	var degreeU = surface.degreeU;
	var degreeV = surface.degreeV;
	var controlPoints = surface.controlPoints;
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
			var derivs = verb_core_Eval.rationalSurfaceDerivatives(surface,pt_u,pt_v,1);
			var pt = derivs[0][0];
			points.push(pt);
			var normal = verb_core_Vec.normalized(verb_core_Vec.cross(derivs[1][0],derivs[0][1]));
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
	return new verb_core_types_MeshData(faces,points,normals,uvs);
};
verb_core_Tess.divideRationalSurfaceAdaptive = function(surface,options) {
	if(options == null) options = new verb_core_types_AdaptiveRefinementOptions();
	if(options.minDivsU != null) options.minDivsU = options.minDivsU; else options.minDivsU = 1;
	if(options.minDivsV != null) options.minDivsU = options.minDivsV; else options.minDivsU = 1;
	if(options.refine != null) options.refine = options.refine; else options.refine = true;
	var minU = (surface.controlPoints.length - 1) * 2;
	var minV = (surface.controlPoints[0].length - 1) * 2;
	var divsU;
	if(options.minDivsU > minU) divsU = options.minDivsU = options.minDivsU; else divsU = options.minDivsU = minU;
	var divsV;
	if(options.minDivsV > minV) divsV = options.minDivsV = options.minDivsV; else divsV = options.minDivsV = minV;
	var umax = verb_core_ArrayExtensions.last(surface.knotsU);
	var umin = surface.knotsU[0];
	var vmax = verb_core_ArrayExtensions.last(surface.knotsV);
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
			var ds = verb_core_Eval.rationalSurfaceDerivatives(surface,u,v,1);
			var norm = verb_core_Vec.normalized(verb_core_Vec.cross(ds[0][1],ds[1][0]));
			ptrow.push(new verb_core_types_SurfacePoint(ds[0][0],norm,[u,v],-1,verb_core_Vec.isZero(norm)));
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
			divs.push(new verb_core_types_AdaptiveRefinementNode(surface,corners));
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
			var n = verb_core_Tess.north(ci,i2,j2,divsU,divsV,divs);
			var e = verb_core_Tess.east(ci,i2,j2,divsU,divsV,divs);
			var s = verb_core_Tess.south(ci,i2,j2,divsU,divsV,divs);
			var w = verb_core_Tess.west(ci,i2,j2,divsU,divsV,divs);
			divs[ci].neighbors = [s,e,n,w];
			divs[ci].divide(options);
		}
	}
	return divs;
};
verb_core_Tess.north = function(index,i,j,divsU,divsV,divs) {
	if(i == 0) return null;
	return divs[index - divsU];
};
verb_core_Tess.south = function(index,i,j,divsU,divsV,divs) {
	if(i == divsV - 1) return null;
	return divs[index + divsU];
};
verb_core_Tess.east = function(index,i,j,divsU,divsV,divs) {
	if(j == divsU - 1) return null;
	return divs[index + 1];
};
verb_core_Tess.west = function(index,i,j,divsU,divsV,divs) {
	if(j == 0) return null;
	return divs[index - 1];
};
verb_core_Tess.triangulateAdaptiveRefinementNodeTree = function(arrTree) {
	var mesh = verb_core_types_MeshData.empty();
	var _g = 0;
	while(_g < arrTree.length) {
		var x = arrTree[_g];
		++_g;
		x.triangulate(mesh);
	}
	return mesh;
};
verb_core_Tess.rationalSurfaceAdaptive = function(surface,options) {
	if(options != null) options = options; else options = new verb_core_types_AdaptiveRefinementOptions();
	var arrTrees = verb_core_Tess.divideRationalSurfaceAdaptive(surface,options);
	return verb_core_Tess.triangulateAdaptiveRefinementNodeTree(arrTrees);
};
var verb_core_Trig = $hx_exports.core.Trig = function() { };
verb_core_Trig.__name__ = ["verb","core","Trig"];
verb_core_Trig.isPointInPlane = function(pt,p,tol) {
	return Math.abs(verb_core_Vec.dot(verb_core_Vec.sub(pt,p.o),p.n)) < tol;
};
verb_core_Trig.distToSegment = function(a,b,c) {
	var res = verb_core_Trig.segmentClosestPoint(b,a,c,0.0,1.0);
	return verb_core_Vec.dist(b,res.pt);
};
verb_core_Trig.rayClosestPoint = function(pt,o,r) {
	var o2pt = verb_core_Vec.sub(pt,o);
	var do2ptr = verb_core_Vec.dot(o2pt,r);
	var proj = verb_core_Vec.add(o,verb_core_Vec.mul(do2ptr,r));
	return proj;
};
verb_core_Trig.distToRay = function(pt,o,r) {
	var d = verb_core_Trig.rayClosestPoint(pt,o,r);
	var dif = verb_core_Vec.sub(d,pt);
	return verb_core_Vec.norm(dif);
};
verb_core_Trig.threePointsAreFlat = function(p1,p2,p3,tol) {
	var p2mp1 = verb_core_Vec.sub(p2,p1);
	var p3mp1 = verb_core_Vec.sub(p3,p1);
	var norm = verb_core_Vec.cross(p2mp1,p3mp1);
	var area = verb_core_Vec.dot(norm,norm);
	return area < tol;
};
verb_core_Trig.segmentClosestPoint = function(pt,segpt0,segpt1,u0,u1) {
	var dif = verb_core_Vec.sub(segpt1,segpt0);
	var l = verb_core_Vec.norm(dif);
	if(l < 1e-10) return { u : u0, pt : segpt0};
	var o = segpt0;
	var r = verb_core_Vec.mul(1 / l,dif);
	var o2pt = verb_core_Vec.sub(pt,o);
	var do2ptr = verb_core_Vec.dot(o2pt,r);
	if(do2ptr < 0) return { u : u0, pt : segpt0}; else if(do2ptr > l) return { u : u1, pt : segpt1};
	return { u : u0 + (u1 - u0) * do2ptr / l, pt : verb_core_Vec.add(o,verb_core_Vec.mul(do2ptr,r))};
};
var verb_core_Vec = $hx_exports.core.Vec = function() { };
verb_core_Vec.__name__ = ["verb","core","Vec"];
verb_core_Vec.angleBetween = function(a,b) {
	return Math.acos(verb_core_Vec.dot(a,b) / (verb_core_Vec.norm(a) * verb_core_Vec.norm(b)));
};
verb_core_Vec.positiveAngleBetween = function(a,b,n) {
	var nab = verb_core_Vec.cross(a,b);
	var al = verb_core_Vec.norm(a);
	var bl = verb_core_Vec.norm(b);
	var abl = al * bl;
	var adb = verb_core_Vec.dot(a,b);
	var sina = verb_core_Vec.norm(nab) / abl;
	var cosa = adb / abl;
	var w = Math.atan2(sina,cosa);
	var s = verb_core_Vec.dot(n,nab);
	if(Math.abs(s) < 1e-10) return w;
	if(s > 0) return w; else return -w;
};
verb_core_Vec.signedAngleBetween = function(a,b,n) {
	var nab = verb_core_Vec.cross(a,b);
	var al = verb_core_Vec.norm(a);
	var bl = verb_core_Vec.norm(b);
	var abl = al * bl;
	var adb = verb_core_Vec.dot(a,b);
	var sina = verb_core_Vec.norm(nab) / abl;
	var cosa = adb / abl;
	var w = Math.atan2(sina,cosa);
	var s = verb_core_Vec.dot(n,nab);
	if(s > 0.0) return w; else return 2 * Math.PI - w;
};
verb_core_Vec.angleBetweenNormalized2d = function(a,b) {
	var perpDot = a[0] * b[1] - a[1] * b[0];
	return Math.atan2(perpDot,verb_core_Vec.dot(a,b));
};
verb_core_Vec.domain = function(a) {
	return a[a.length - 1] - a[0];
};
verb_core_Vec.range = function(max) {
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
verb_core_Vec.span = function(min,max,step) {
	if(step == null) return [];
	if(step < 1e-10) return [];
	if(min > max && step > 0.0) return [];
	if(max > min && step < 0.0) return [];
	var l = [];
	var cur = min;
	while(cur <= max) {
		l.push(cur);
		cur += step;
	}
	return l;
};
verb_core_Vec.neg = function(arr) {
	return arr.map(function(x) {
		return -x;
	});
};
verb_core_Vec.min = function(arr) {
	return Lambda.fold(arr,function(x,a) {
		return Math.min(x,a);
	},Infinity);
};
verb_core_Vec.max = function(arr) {
	return Lambda.fold(arr,function(x,a) {
		return Math.max(x,a);
	},-Infinity);
};
verb_core_Vec.all = function(arr) {
	return Lambda.fold(arr,function(x,a) {
		return a && x;
	},true);
};
verb_core_Vec.finite = function(arr) {
	return arr.map(function(x) {
		return isFinite(x);
	});
};
verb_core_Vec.onRay = function(origin,dir,u) {
	return verb_core_Vec.add(origin,verb_core_Vec.mul(u,dir));
};
verb_core_Vec.lerp = function(i,u,v) {
	return verb_core_Vec.add(verb_core_Vec.mul(i,u),verb_core_Vec.mul(1.0 - i,v));
};
verb_core_Vec.normalized = function(arr) {
	return verb_core_Vec.div(arr,verb_core_Vec.norm(arr));
};
verb_core_Vec.cross = function(u,v) {
	return [u[1] * v[2] - u[2] * v[1],u[2] * v[0] - u[0] * v[2],u[0] * v[1] - u[1] * v[0]];
};
verb_core_Vec.dist = function(a,b) {
	return verb_core_Vec.norm(verb_core_Vec.sub(a,b));
};
verb_core_Vec.distSquared = function(a,b) {
	return verb_core_Vec.normSquared(verb_core_Vec.sub(a,b));
};
verb_core_Vec.sum = function(a) {
	return Lambda.fold(a,function(x,a1) {
		return a1 + x;
	},0);
};
verb_core_Vec.addAll = function(a) {
	var i = $iterator(a)();
	if(!i.hasNext()) return null;
	var f = i.next().length;
	return Lambda.fold(a,function(x,a1) {
		return verb_core_Vec.add(a1,x);
	},verb_core_Vec.rep(f,0.0));
};
verb_core_Vec.norm = function(a) {
	var norm2 = verb_core_Vec.normSquared(a);
	if(norm2 != 0.0) return Math.sqrt(norm2); else return norm2;
};
verb_core_Vec.normSquared = function(a) {
	return Lambda.fold(a,function(x,a1) {
		return a1 + x * x;
	},0);
};
verb_core_Vec.rep = function(num,ele) {
	var _g = [];
	var _g1 = 0;
	while(_g1 < num) {
		var i = _g1++;
		_g.push(ele);
	}
	return _g;
};
verb_core_Vec.zeros1d = function(rows) {
	var _g = [];
	var _g1 = 0;
	while(_g1 < rows) {
		var i = _g1++;
		_g.push(0.0);
	}
	return _g;
};
verb_core_Vec.zeros2d = function(rows,cols) {
	var _g = [];
	var _g1 = 0;
	while(_g1 < rows) {
		var i = _g1++;
		_g.push(verb_core_Vec.zeros1d(cols));
	}
	return _g;
};
verb_core_Vec.zeros3d = function(rows,cols,depth) {
	var _g = [];
	var _g1 = 0;
	while(_g1 < rows) {
		var i = _g1++;
		_g.push(verb_core_Vec.zeros2d(cols,depth));
	}
	return _g;
};
verb_core_Vec.dot = function(a,b) {
	var sum = 0;
	var _g1 = 0;
	var _g = a.length;
	while(_g1 < _g) {
		var i = _g1++;
		sum += a[i] * b[i];
	}
	return sum;
};
verb_core_Vec.add = function(a,b) {
	var _g = [];
	var _g2 = 0;
	var _g1 = a.length;
	while(_g2 < _g1) {
		var i = _g2++;
		_g.push(a[i] + b[i]);
	}
	return _g;
};
verb_core_Vec.mul = function(a,b) {
	var _g = [];
	var _g2 = 0;
	var _g1 = b.length;
	while(_g2 < _g1) {
		var i = _g2++;
		_g.push(a * b[i]);
	}
	return _g;
};
verb_core_Vec.div = function(a,b) {
	var _g = [];
	var _g2 = 0;
	var _g1 = a.length;
	while(_g2 < _g1) {
		var i = _g2++;
		_g.push(a[i] / b);
	}
	return _g;
};
verb_core_Vec.sub = function(a,b) {
	var _g = [];
	var _g2 = 0;
	var _g1 = a.length;
	while(_g2 < _g1) {
		var i = _g2++;
		_g.push(a[i] - b[i]);
	}
	return _g;
};
verb_core_Vec.isZero = function(vec) {
	var _g1 = 0;
	var _g = vec.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(Math.abs(vec[i]) > 1e-6) return false;
	}
	return true;
};
verb_core_Vec.sortedSetUnion = function(a,b) {
	var merged = [];
	var ai = 0;
	var bi = 0;
	while(ai < a.length || bi < b.length) {
		if(ai >= a.length) {
			merged.push(b[bi]);
			bi++;
			continue;
		} else if(bi >= b.length) {
			merged.push(a[ai]);
			ai++;
			continue;
		}
		var diff = a[ai] - b[bi];
		if(Math.abs(diff) < 1e-10) {
			merged.push(a[ai]);
			ai++;
			bi++;
			continue;
		}
		if(diff > 0.0) {
			merged.push(b[bi]);
			bi++;
			continue;
		}
		merged.push(a[ai]);
		ai++;
	}
	return merged;
};
verb_core_Vec.sortedSetSub = function(a,b) {
	var result = [];
	var ai = 0;
	var bi = 0;
	while(ai < a.length) {
		if(bi >= b.length) {
			result.push(a[ai]);
			ai++;
			continue;
		}
		if(Math.abs(a[ai] - b[bi]) < 1e-10) {
			ai++;
			bi++;
			continue;
		}
		result.push(a[ai]);
		ai++;
	}
	return result;
};
var verb_core_types_AdaptiveRefinementOptions = function() {
	this.minDivsV = 1;
	this.minDivsU = 1;
	this.refine = true;
	this.maxDepth = 10;
	this.minDepth = 0;
	this.normTol = 2.5e-2;
};
verb_core_types_AdaptiveRefinementOptions.__name__ = ["verb","core","types","AdaptiveRefinementOptions"];
var verb_core_types_AdaptiveRefinementNode = $hx_exports.core.AdaptiveRefinementNode = function(srf,corners,neighbors) {
	this.srf = srf;
	if(neighbors == null) this.neighbors = [null,null,null,null]; else this.neighbors = neighbors;
	this.corners = corners;
	if(this.corners == null) {
		var u0 = srf.knotsU[0];
		var u1 = verb_core_ArrayExtensions.last(srf.knotsU);
		var v0 = srf.knotsV[0];
		var v1 = verb_core_ArrayExtensions.last(srf.knotsV);
		this.corners = [verb_core_types_SurfacePoint.fromUv(u0,v0),verb_core_types_SurfacePoint.fromUv(u1,v0),verb_core_types_SurfacePoint.fromUv(u1,v1),verb_core_types_SurfacePoint.fromUv(u0,v1)];
	}
};
verb_core_types_AdaptiveRefinementNode.__name__ = ["verb","core","types","AdaptiveRefinementNode"];
verb_core_types_AdaptiveRefinementNode.prototype = {
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
		var derivs = verb_core_Eval.rationalSurfaceDerivatives(this.srf,u,v,1);
		var pt = derivs[0][0];
		var norm = verb_core_Vec.cross(derivs[0][1],derivs[1][0]);
		var degen = verb_core_Vec.isZero(norm);
		if(!degen) norm = verb_core_Vec.normalized(norm);
		if(srfPt != null) {
			srfPt.degen = degen;
			srfPt.point = pt;
			srfPt.normal = norm;
			return srfPt;
		} else return new verb_core_types_SurfacePoint(pt,norm,[u,v],-1,degen);
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
		var e = 1e-10;
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
		this.splitVert = verb_core_Vec.normSquared(verb_core_Vec.sub(this.corners[0].normal,this.corners[1].normal)) > options.normTol || verb_core_Vec.normSquared(verb_core_Vec.sub(this.corners[2].normal,this.corners[3].normal)) > options.normTol;
		this.splitHoriz = verb_core_Vec.normSquared(verb_core_Vec.sub(this.corners[1].normal,this.corners[2].normal)) > options.normTol || verb_core_Vec.normSquared(verb_core_Vec.sub(this.corners[3].normal,this.corners[0].normal)) > options.normTol;
		if(this.splitVert || this.splitHoriz) return true;
		var center = this.center();
		return verb_core_Vec.normSquared(verb_core_Vec.sub(center.normal,this.corners[0].normal)) > options.normTol || verb_core_Vec.normSquared(verb_core_Vec.sub(center.normal,this.corners[1].normal)) > options.normTol || verb_core_Vec.normSquared(verb_core_Vec.sub(center.normal,this.corners[2].normal)) > options.normTol || verb_core_Vec.normSquared(verb_core_Vec.sub(center.normal,this.corners[3].normal)) > options.normTol;
	}
	,divide: function(options) {
		if(options == null) options = new verb_core_types_AdaptiveRefinementOptions();
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
			this.children = [new verb_core_types_AdaptiveRefinementNode(this.srf,bott),new verb_core_types_AdaptiveRefinementNode(this.srf,top)];
			this.children[0].neighbors = [this.neighbors[0],this.neighbors[1],this.children[1],this.neighbors[3]];
			this.children[1].neighbors = [this.children[0],this.neighbors[1],this.neighbors[2],this.neighbors[3]];
		} else {
			var left = [this.corners[0],this.midpoint(0),this.midpoint(2),this.corners[3]];
			var right = [this.midpoint(0),this.corners[1],this.corners[2],this.midpoint(2)];
			this.children = [new verb_core_types_AdaptiveRefinementNode(this.srf,left),new verb_core_types_AdaptiveRefinementNode(this.srf,right)];
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
		if(mesh == null) mesh = verb_core_types_MeshData.empty();
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
			var i1 = _g++;
			var edgeCorners = this.getAllCorners(i1);
			if(edgeCorners.length == 2) splitid = i1 + 1;
			var _g2 = 0;
			var _g1 = edgeCorners.length;
			while(_g2 < _g1) {
				var j1 = _g2++;
				uvs.push(edgeCorners[j1]);
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
			mesh.faces.push([ids[splitid],ids[(splitid + 2) % il],ids[(splitid + 1) % il]]);
			mesh.faces.push([ids[(splitid + 4) % il],ids[(splitid + 3) % il],ids[splitid]]);
			mesh.faces.push([ids[splitid],ids[(splitid + 3) % il],ids[(splitid + 2) % il]]);
			return mesh;
		}
		var center = this.center();
		mesh.uvs.push(center.uv);
		mesh.points.push(center.point);
		mesh.normals.push(center.normal);
		var centerIndex = mesh.points.length - 1;
		var i = 0;
		var j = uvs.length - 1;
		while(i < uvs.length) {
			mesh.faces.push([centerIndex,ids[i],ids[j]]);
			j = i++;
		}
		return mesh;
	}
};
var verb_core_types_BoundingBox = $hx_exports.core.BoundingBox = function(pts) {
	this.max = null;
	this.min = null;
	this.dim = 3;
	this.initialized = false;
	if(pts != null) this.addRange(pts);
};
verb_core_types_BoundingBox.__name__ = ["verb","core","types","BoundingBox"];
verb_core_types_BoundingBox.intervalsOverlap = function(a1,a2,b1,b2,tol) {
	if(tol == null) tol = -1;
	var tol1;
	if(tol < -0.5) tol1 = verb_core_types_BoundingBox.TOLERANCE; else tol1 = tol;
	var x1 = Math.min(a1,a2) - tol1;
	var x2 = Math.max(a1,a2) + tol1;
	var y1 = Math.min(b1,b2) - tol1;
	var y2 = Math.max(b1,b2) + tol1;
	return x1 >= y1 && x1 <= y2 || x2 >= y1 && x2 <= y2 || y1 >= x1 && y1 <= x2 || y2 >= x1 && y2 <= x2;
};
verb_core_types_BoundingBox.prototype = {
	fromPoint: function(pt) {
		return new verb_core_types_BoundingBox([pt]);
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
		return this.intersects(new verb_core_types_BoundingBox([point]),tol);
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
			if(!verb_core_types_BoundingBox.intervalsOverlap(a1[i],a2[i],b1[i],b2[i],tol)) return false;
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
		return new verb_core_types_BoundingBox([minbb,maxbb]);
	}
};
var verb_core_types_BoundingBoxNode = $hx_exports.core.BoundingBoxNode = function(bb) {
	this.boundingBox = bb;
};
verb_core_types_BoundingBoxNode.__name__ = ["verb","core","types","BoundingBoxNode"];
var verb_core_types_BoundingBoxInnerNode = $hx_exports.core.BoundingBoxInnerNode = function(bb,children) {
	verb_core_types_BoundingBoxNode.call(this,bb);
	this.children = children;
};
verb_core_types_BoundingBoxInnerNode.__name__ = ["verb","core","types","BoundingBoxInnerNode"];
verb_core_types_BoundingBoxInnerNode.__super__ = verb_core_types_BoundingBoxNode;
verb_core_types_BoundingBoxInnerNode.prototype = $extend(verb_core_types_BoundingBoxNode.prototype,{
});
var verb_core_types_BoundingBoxLeaf = $hx_exports.core.BoundingBoxLeaf = function(bb,item) {
	verb_core_types_BoundingBoxNode.call(this,bb);
	this.item = item;
};
verb_core_types_BoundingBoxLeaf.__name__ = ["verb","core","types","BoundingBoxLeaf"];
verb_core_types_BoundingBoxLeaf.__super__ = verb_core_types_BoundingBoxNode;
verb_core_types_BoundingBoxLeaf.prototype = $extend(verb_core_types_BoundingBoxNode.prototype,{
});
var verb_core_types_CurveCurveIntersection = $hx_exports.core.CurveCurveIntersection = function(point0,point1,u0,u1) {
	this.point0 = point0;
	this.point1 = point1;
	this.u0 = u0;
	this.u1 = u1;
};
verb_core_types_CurveCurveIntersection.__name__ = ["verb","core","types","CurveCurveIntersection"];
var verb_core_types_CurveLengthSample = $hx_exports.core.CurveLengthSample = function(u,len) {
	this.u = u;
	this.len = len;
};
verb_core_types_CurveLengthSample.__name__ = ["verb","core","types","CurveLengthSample"];
var verb_core_types_CurveSurfaceIntersection = $hx_exports.core.CurveSurfaceIntersection = function(u,uv,curvePoint,surfacePoint) {
	this.u = u;
	this.uv = uv;
	this.curvePoint = curvePoint;
	this.surfacePoint = surfacePoint;
};
verb_core_types_CurveSurfaceIntersection.__name__ = ["verb","core","types","CurveSurfaceIntersection"];
var verb_core_types_CurveTriPoint = $hx_exports.core.CurveTriPoint = function(u,point,uv) {
	this.u = u;
	this.point = point;
	this.uv = uv;
};
verb_core_types_CurveTriPoint.__name__ = ["verb","core","types","CurveTriPoint"];
var verb_core_types_DoublyLinkedListExtensions = function() { };
verb_core_types_DoublyLinkedListExtensions.__name__ = ["verb","core","types","DoublyLinkedListExtensions"];
verb_core_types_DoublyLinkedListExtensions.iter = function(t) {
	return new verb_core_types_DoublyLinkedListIterator(t);
};
verb_core_types_DoublyLinkedListExtensions.push = function(t,i) {
	if(t == null) return verb_core_types_DoublyLinkedListExtensions.make(i);
	t.prv.nxt = i;
	i.prv = t.prv;
	t.prv = i;
	i.nxt = t;
	return i;
};
verb_core_types_DoublyLinkedListExtensions.kill = function(t,i) {
	if(t == null) return null;
	if(t.nxt == t) return null;
	i.prv.nxt = i.nxt;
	i.nxt.prv = i.prv;
	if(t == i) t = t.nxt;
	i.nxt = null;
	i.prv = null;
	return t;
};
verb_core_types_DoublyLinkedListExtensions.make = function(t) {
	t.nxt = t;
	t.prv = t;
	return t;
};
var verb_core_types_DoublyLinkedListIterator = function(t) {
	this.t = t;
	this.c = t;
};
verb_core_types_DoublyLinkedListIterator.__name__ = ["verb","core","types","DoublyLinkedListIterator"];
verb_core_types_DoublyLinkedListIterator.prototype = {
	iterator: function() {
		return this;
	}
	,next: function() {
		var cc = this.c;
		if(this.c.nxt == this.t) this.c = null; else this.c = this.c.nxt;
		return cc;
	}
	,hasNext: function() {
		return this.c != null;
	}
};
var verb_core_types_Exception = function(message) {
	this.message = message;
};
verb_core_types_Exception.__name__ = ["verb","core","types","Exception"];
var verb_core_types_IBoundingBoxTree = function() { };
verb_core_types_IBoundingBoxTree.__name__ = ["verb","core","types","IBoundingBoxTree"];
var verb_core_types_IDoublyLinkedList = function() { };
verb_core_types_IDoublyLinkedList.__name__ = ["verb","core","types","IDoublyLinkedList"];
var verb_core_types_Interval = $hx_exports.core.Interval = function(min,max) {
	this.min = min;
	this.max = max;
};
verb_core_types_Interval.__name__ = ["verb","core","types","Interval"];
var verb_core_types_LazyCurveBoundingBoxTree = function(curve,knotTol) {
	this._boundingBox = null;
	this._curve = curve;
	if(knotTol == null) knotTol = verb_core_Vec.domain(this._curve.knots) / 64;
	this._knotTol = knotTol;
};
verb_core_types_LazyCurveBoundingBoxTree.__name__ = ["verb","core","types","LazyCurveBoundingBoxTree"];
verb_core_types_LazyCurveBoundingBoxTree.__interfaces__ = [verb_core_types_IBoundingBoxTree];
verb_core_types_LazyCurveBoundingBoxTree.prototype = {
	split: function() {
		var min = this._curve.knots[0];
		var max = verb_core_ArrayExtensions.last(this._curve.knots);
		var dom = max - min;
		var crvs = verb_core_Modify.curveSplit(this._curve,(max + min) / 2.0 + dom * 0.1 * Math.random());
		return new verb_core_types_Pair(new verb_core_types_LazyCurveBoundingBoxTree(crvs[0],this._knotTol),new verb_core_types_LazyCurveBoundingBoxTree(crvs[1],this._knotTol));
	}
	,boundingBox: function() {
		if(this._boundingBox == null) this._boundingBox = new verb_core_types_BoundingBox(verb_core_Eval.dehomogenize1d(this._curve.controlPoints));
		return this._boundingBox;
	}
	,'yield': function() {
		return this._curve;
	}
	,indivisible: function(tolerance) {
		return verb_core_Vec.domain(this._curve.knots) < this._knotTol;
	}
	,empty: function() {
		return false;
	}
};
var verb_core_types_LazyMeshBoundingBoxTree = function(mesh,faceIndices) {
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
verb_core_types_LazyMeshBoundingBoxTree.__name__ = ["verb","core","types","LazyMeshBoundingBoxTree"];
verb_core_types_LazyMeshBoundingBoxTree.__interfaces__ = [verb_core_types_IBoundingBoxTree];
verb_core_types_LazyMeshBoundingBoxTree.prototype = {
	split: function() {
		var $as = verb_core_Mesh.sortTrianglesOnLongestAxis(this.boundingBox(),this._mesh,this._faceIndices);
		var l = verb_core_ArrayExtensions.left($as);
		var r = verb_core_ArrayExtensions.right($as);
		return new verb_core_types_Pair(new verb_core_types_LazyMeshBoundingBoxTree(this._mesh,l),new verb_core_types_LazyMeshBoundingBoxTree(this._mesh,r));
	}
	,boundingBox: function() {
		if(this._boundingBox == null) this._boundingBox = verb_core_Mesh.makeMeshAabb(this._mesh,this._faceIndices);
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
var verb_core_types_LazyPolylineBoundingBoxTree = function(polyline,interval) {
	this._boundingBox = null;
	this._polyline = polyline;
	if(interval == null) interval = new verb_core_types_Interval(0,polyline.points.length != 0?polyline.points.length - 1:0);
	this._interval = interval;
};
verb_core_types_LazyPolylineBoundingBoxTree.__name__ = ["verb","core","types","LazyPolylineBoundingBoxTree"];
verb_core_types_LazyPolylineBoundingBoxTree.__interfaces__ = [verb_core_types_IBoundingBoxTree];
verb_core_types_LazyPolylineBoundingBoxTree.prototype = {
	split: function() {
		var min = this._interval.min;
		var max = this._interval.max;
		var pivot = min + Math.ceil((max - min) / 2);
		var l = new verb_core_types_Interval(min,pivot);
		var r = new verb_core_types_Interval(pivot,max);
		return new verb_core_types_Pair(new verb_core_types_LazyPolylineBoundingBoxTree(this._polyline,l),new verb_core_types_LazyPolylineBoundingBoxTree(this._polyline,r));
	}
	,boundingBox: function() {
		if(this._boundingBox == null) this._boundingBox = new verb_core_types_BoundingBox(this._polyline.points);
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
var verb_core_types_LazySurfaceBoundingBoxTree = $hx_exports.core.LazySurfaceBoundingBoxTree = function(surface,splitV,knotTolU,knotTolV) {
	if(splitV == null) splitV = false;
	this._boundingBox = null;
	this._surface = surface;
	this._splitV = splitV;
	if(knotTolU == null) knotTolU = verb_core_Vec.domain(surface.knotsU) / 16;
	if(knotTolV == null) knotTolV = verb_core_Vec.domain(surface.knotsV) / 16;
	this._knotTolU = knotTolU;
	this._knotTolV = knotTolV;
};
verb_core_types_LazySurfaceBoundingBoxTree.__name__ = ["verb","core","types","LazySurfaceBoundingBoxTree"];
verb_core_types_LazySurfaceBoundingBoxTree.__interfaces__ = [verb_core_types_IBoundingBoxTree];
verb_core_types_LazySurfaceBoundingBoxTree.prototype = {
	split: function() {
		var min;
		var max;
		if(this._splitV) {
			min = this._surface.knotsV[0];
			max = verb_core_ArrayExtensions.last(this._surface.knotsV);
		} else {
			min = this._surface.knotsU[0];
			max = verb_core_ArrayExtensions.last(this._surface.knotsU);
		}
		var dom = max - min;
		var pivot = (min + max) / 2.0;
		var srfs = verb_core_Modify.surfaceSplit(this._surface,pivot,this._splitV);
		return new verb_core_types_Pair(new verb_core_types_LazySurfaceBoundingBoxTree(srfs[0],!this._splitV,this._knotTolU,this._knotTolV),new verb_core_types_LazySurfaceBoundingBoxTree(srfs[1],!this._splitV,this._knotTolU,this._knotTolV));
	}
	,boundingBox: function() {
		if(this._boundingBox == null) {
			this._boundingBox = new verb_core_types_BoundingBox();
			var _g = 0;
			var _g1 = this._surface.controlPoints;
			while(_g < _g1.length) {
				var row = _g1[_g];
				++_g;
				this._boundingBox.addRange(verb_core_Eval.dehomogenize1d(row));
			}
		}
		return this._boundingBox;
	}
	,'yield': function() {
		return this._surface;
	}
	,indivisible: function(tolerance) {
		return verb_core_Vec.domain(this._surface.knotsV) < this._knotTolV && verb_core_Vec.domain(this._surface.knotsU) < this._knotTolU;
	}
	,empty: function() {
		return false;
	}
};
var verb_core_types_MeshBoundingBoxTree = function(mesh,faceIndices) {
	this._empty = false;
	this._face = -1;
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
	this._boundingBox = verb_core_Mesh.makeMeshAabb(mesh,faceIndices);
	if(faceIndices.length < 1) {
		this._empty = true;
		return;
	} else if(faceIndices.length < 2) {
		this._face = faceIndices[0];
		return;
	}
	var $as = verb_core_Mesh.sortTrianglesOnLongestAxis(this._boundingBox,mesh,faceIndices);
	var l = verb_core_ArrayExtensions.left($as);
	var r = verb_core_ArrayExtensions.right($as);
	this._children = new verb_core_types_Pair(new verb_core_types_MeshBoundingBoxTree(mesh,l),new verb_core_types_MeshBoundingBoxTree(mesh,r));
};
verb_core_types_MeshBoundingBoxTree.__name__ = ["verb","core","types","MeshBoundingBoxTree"];
verb_core_types_MeshBoundingBoxTree.__interfaces__ = [verb_core_types_IBoundingBoxTree];
verb_core_types_MeshBoundingBoxTree.prototype = {
	split: function() {
		return this._children;
	}
	,boundingBox: function() {
		return this._boundingBox;
	}
	,'yield': function() {
		return this._face;
	}
	,indivisible: function(tolerance) {
		return this._children == null;
	}
	,empty: function() {
		return this._empty;
	}
};
var verb_core_types_MeshData = $hx_exports.core.MeshData = function(faces,points,normals,uvs) {
	this.faces = faces;
	this.points = points;
	this.normals = normals;
	this.uvs = uvs;
};
verb_core_types_MeshData.__name__ = ["verb","core","types","MeshData"];
verb_core_types_MeshData.empty = function() {
	return new verb_core_types_MeshData([],[],[],[]);
};
var verb_core_types_MeshIntersectionPoint = $hx_exports.core.MeshIntersectionPoint = function(uv0,uv1,point,faceIndex0,faceIndex1) {
	this.visited = false;
	this.adj = null;
	this.opp = null;
	this.uv0 = uv0;
	this.uv1 = uv1;
	this.point = point;
	this.faceIndex0;
	this.faceIndex1;
};
verb_core_types_MeshIntersectionPoint.__name__ = ["verb","core","types","MeshIntersectionPoint"];
var verb_core_types_NurbsCurveData = $hx_exports.core.NurbsCurveData = function(degree,knots,controlPoints,closed) {
	if(closed == null) closed = false;
	this.degree = degree;
	this.controlPoints = controlPoints;
	this.knots = knots;
	this.closed = closed;
};
verb_core_types_NurbsCurveData.__name__ = ["verb","core","types","NurbsCurveData"];
var verb_core_types_NurbsSurfaceData = $hx_exports.core.NurbsSurfaceData = function(degreeU,degreeV,knotsU,knotsV,controlPoints,closedU,closedV) {
	if(closedV == null) closedV = false;
	if(closedU == null) closedU = false;
	this.degreeU = degreeU;
	this.degreeV = degreeV;
	this.knotsU = knotsU;
	this.knotsV = knotsV;
	this.controlPoints = controlPoints;
	this.closedU = closedU;
	this.closedV = closedV;
};
verb_core_types_NurbsSurfaceData.__name__ = ["verb","core","types","NurbsSurfaceData"];
var verb_core_types_Pair = $hx_exports.core.Pair = function(item1,item2) {
	this.item0 = item1;
	this.item1 = item2;
};
verb_core_types_Pair.__name__ = ["verb","core","types","Pair"];
var verb_core_types_PolylineData = $hx_exports.core.PolylineData = function(points,params) {
	this.points = points;
	this.params = params;
};
verb_core_types_PolylineData.__name__ = ["verb","core","types","PolylineData"];
var verb_core_types_PolylineMeshIntersection = $hx_exports.core.PolylineMeshIntersection = function(point,u,uv,polylineIndex,faceIndex) {
	this.point = point;
	this.u = u;
	this.uv = uv;
	this.polylineIndex = polylineIndex;
	this.faceIndex = faceIndex;
};
verb_core_types_PolylineMeshIntersection.__name__ = ["verb","core","types","PolylineMeshIntersection"];
var verb_core_types_Ray = $hx_exports.core.Ray = function(origin,dir) {
	this.origin = origin;
	this.dir = dir;
};
verb_core_types_Ray.__name__ = ["verb","core","types","Ray"];
var verb_core_types_SurfaceBoundingBoxTree = function(surface,splitV,knotTolU,knotTolV) {
	if(splitV == null) splitV = false;
	this._boundingBox = null;
	this._surface = surface;
	if(knotTolU == null) knotTolU = verb_core_Vec.domain(surface.knotsU) / 16;
	if(knotTolV == null) knotTolV = verb_core_Vec.domain(surface.knotsV) / 16;
	var divisible = false;
	if(splitV) divisible = verb_core_Vec.domain(this._surface.knotsV) > knotTolV; else divisible = verb_core_Vec.domain(this._surface.knotsU) > knotTolU;
	if(!divisible) return;
	var min;
	var max;
	if(splitV) {
		min = this._surface.knotsV[0];
		max = verb_core_ArrayExtensions.last(this._surface.knotsV);
	} else {
		min = this._surface.knotsU[0];
		max = verb_core_ArrayExtensions.last(this._surface.knotsU);
	}
	var dom = max - min;
	var pivot = (min + max) / 2.0 + dom * 0.1 * Math.random();
	var srfs = verb_core_Modify.surfaceSplit(this._surface,pivot,splitV);
	this._children = new verb_core_types_Pair(new verb_core_types_SurfaceBoundingBoxTree(srfs[0],!splitV,knotTolU,knotTolV),new verb_core_types_SurfaceBoundingBoxTree(srfs[1],!splitV,knotTolU,knotTolV));
};
verb_core_types_SurfaceBoundingBoxTree.__name__ = ["verb","core","types","SurfaceBoundingBoxTree"];
verb_core_types_SurfaceBoundingBoxTree.__interfaces__ = [verb_core_types_IBoundingBoxTree];
verb_core_types_SurfaceBoundingBoxTree.prototype = {
	split: function() {
		return this._children;
	}
	,boundingBox: function() {
		if(this._boundingBox == null) {
			this._boundingBox = new verb_core_types_BoundingBox();
			var _g = 0;
			var _g1 = this._surface.controlPoints;
			while(_g < _g1.length) {
				var row = _g1[_g];
				++_g;
				this._boundingBox.addRange(verb_core_Eval.dehomogenize1d(row));
			}
		}
		return this._boundingBox;
	}
	,'yield': function() {
		return this._surface;
	}
	,indivisible: function(tolerance) {
		return this._children == null;
	}
	,empty: function() {
		return false;
	}
};
var verb_core_types_SurfacePoint = function(point,normal,uv,id,degen) {
	if(degen == null) degen = false;
	if(id == null) id = -1;
	this.uv = uv;
	this.point = point;
	this.normal = normal;
	this.id = id;
	this.degen = degen;
};
verb_core_types_SurfacePoint.__name__ = ["verb","core","types","SurfacePoint"];
verb_core_types_SurfacePoint.fromUv = function(u,v) {
	return new verb_core_types_SurfacePoint(null,null,[u,v]);
};
var verb_core_types_SurfaceSurfaceIntersectionPoint = $hx_exports.core.SurfaceSurfaceIntersectionPoint = function(uv0,uv1,point,dist) {
	this.uv0 = uv0;
	this.uv1 = uv1;
	this.point = point;
	this.dist = dist;
};
verb_core_types_SurfaceSurfaceIntersectionPoint.__name__ = ["verb","core","types","SurfaceSurfaceIntersectionPoint"];
var verb_core_types_TriSegmentIntersection = $hx_exports.core.TriSegmentIntersection = function(point,s,t,r) {
	this.point = point;
	this.s = s;
	this.t = t;
	this.p = r;
};
verb_core_types_TriSegmentIntersection.__name__ = ["verb","core","types","TriSegmentIntersection"];
var verb_core_types_VolumeData = $hx_exports.core.VolumeData = function(degreeU,degreeV,degreeW,knotsU,knotsV,knotsW,controlPoints) {
	this.degreeU = degreeU;
	this.degreeV = degreeV;
	this.degreeW = degreeW;
	this.knotsU = knotsU;
	this.knotsV = knotsV;
	this.knotsW = knotsW;
	this.controlPoints = controlPoints;
};
verb_core_types_VolumeData.__name__ = ["verb","core","types","VolumeData"];
var verb_exe_AsyncObject = function() { };
verb_exe_AsyncObject.__name__ = ["verb","exe","AsyncObject"];
verb_exe_AsyncObject.prototype = {
	defer: function(classType,methodName,args) {
		return verb_exe_Dispatcher.dispatchMethod(classType,methodName,args);
	}
};
var verb_exe_Dispatcher = function() { };
verb_exe_Dispatcher.__name__ = ["verb","exe","Dispatcher"];
verb_exe_Dispatcher.init = function() {
	if(verb_exe_Dispatcher._init) return;
	verb_exe_Dispatcher._workerPool = new verb_exe_WorkerPool(verb_exe_Dispatcher.THREADS);
	verb_exe_Dispatcher._init = true;
};
verb_exe_Dispatcher.dispatchMethod = function(classType,methodName,args) {
	verb_exe_Dispatcher.init();
	var def = new promhx_Deferred();
	var callback = function(x) {
		def.resolve(x);
	};
	verb_exe_Dispatcher._workerPool.addWork(Type.getClassName(classType),methodName,args,callback);
	return new promhx_Promise(def);
};
var verb_exe_Work = function(className,methodName,args) {
	this.className = className;
	this.methodName = methodName;
	this.args = args;
	this.id = verb_exe_Work.uuid++;
};
verb_exe_Work.__name__ = ["verb","exe","Work"];
var verb_exe_WorkerPool = $hx_exports.exe.WorkerPool = function(numThreads,fileName) {
	if(fileName == null) fileName = "verb.js";
	this._callbacks = new haxe_ds_IntMap();
	this._working = new haxe_ds_IntMap();
	this._pool = [];
	this._queue = [];
	var _g = 0;
	while(_g < numThreads) {
		var i = _g++;
		this._pool.push(new Worker(verb_exe_WorkerPool.basePath + fileName));
	}
};
verb_exe_WorkerPool.__name__ = ["verb","exe","WorkerPool"];
verb_exe_WorkerPool.prototype = {
	addWork: function(className,methodName,$arguments,callback) {
		var work = new verb_exe_Work(className,methodName,$arguments);
		this._callbacks.set(work.id,callback);
		this._queue.push(work);
		this.processQueue();
	}
	,processQueue: function() {
		var _g = this;
		while(this._queue.length > 0 && this._pool.length > 0) {
			var work = this._queue.shift();
			var workId = [work.id];
			var worker = [this._pool.shift()];
			this._working.h[workId[0]] = worker[0];
			worker[0].onmessage = (function(worker,workId) {
				return function(e) {
					_g._working.remove(workId[0]);
					_g._pool.push(worker[0]);
					try {
						if(_g._callbacks.h.hasOwnProperty(workId[0])) {
							_g._callbacks.h[workId[0]](e.data.result);
							_g._callbacks.remove(workId[0]);
						}
					} catch( error ) {
						if (error instanceof js__$Boot_HaxeError) error = error.val;
						haxe_Log.trace(error,{ fileName : "WorkerPool.hx", lineNumber : 77, className : "verb.exe.WorkerPool", methodName : "processQueue"});
					}
					_g.processQueue();
				};
			})(worker,workId);
			worker[0].postMessage(work);
		}
	}
};
var verb_geom_ICurve = function() { };
verb_geom_ICurve.__name__ = ["verb","geom","ICurve"];
var verb_geom_NurbsCurve = $hx_exports.geom.NurbsCurve = function(data) {
	this._data = verb_core_Check.nurbsCurveData(data);
};
verb_geom_NurbsCurve.__name__ = ["verb","geom","NurbsCurve"];
verb_geom_NurbsCurve.__interfaces__ = [verb_geom_ICurve];
verb_geom_NurbsCurve.byKnotsControlPointsWeights = function(degree,knots,controlPoints,weights) {
	return new verb_geom_NurbsCurve(new verb_core_types_NurbsCurveData(degree,knots.slice(),verb_core_Eval.homogenize1d(controlPoints,weights)));
};
verb_geom_NurbsCurve.byPoints = function(points,degree) {
	if(degree == null) degree = 3;
	return new verb_geom_NurbsCurve(verb_core_Make.rationalInterpCurve(points,degree));
};
verb_geom_NurbsCurve.__super__ = verb_exe_AsyncObject;
verb_geom_NurbsCurve.prototype = $extend(verb_exe_AsyncObject.prototype,{
	degree: function() {
		return this._data.degree;
	}
	,knots: function() {
		return this._data.knots.slice(0);
	}
	,controlPoints: function() {
		return verb_core_Eval.dehomogenize1d(this._data.controlPoints);
	}
	,weights: function() {
		return verb_core_Eval.weight1d(this._data.controlPoints);
	}
	,asNurbs: function() {
		return new verb_core_types_NurbsCurveData(this.degree(),this.knots(),verb_core_Eval.homogenize1d(this.controlPoints(),this.weights()));
	}
	,clone: function() {
		return new verb_geom_NurbsCurve(this._data);
	}
	,domain: function() {
		return new verb_core_types_Interval(this._data.knots[0],verb_core_ArrayExtensions.last(this._data.knots));
	}
	,transform: function(mat) {
		return new verb_geom_NurbsCurve(verb_core_Modify.rationalCurveTransform(this._data,mat));
	}
	,transformAsync: function(mat) {
		return this.defer(verb_core_Modify,"rationalCurveTransform",[this._data,mat]).then(function(x) {
			return new verb_geom_NurbsCurve(x);
		});
	}
	,point: function(u) {
		return verb_core_Eval.rationalCurvePoint(this._data,u);
	}
	,pointAsync: function(u) {
		return this.defer(verb_core_Eval,"rationalCurvePoint",[this._data,u]);
	}
	,tangent: function(u) {
		return verb_core_Eval.rationalCurveTangent(this._data,u);
	}
	,tangentAsync: function(u) {
		return this.defer(verb_core_Eval,"rationalCurveTangent",[this._data,u]);
	}
	,derivatives: function(u,numDerivs) {
		if(numDerivs == null) numDerivs = 1;
		return verb_core_Eval.rationalCurveDerivatives(this._data,u,numDerivs);
	}
	,derivativesAsync: function(u,numDerivs) {
		if(numDerivs == null) numDerivs = 1;
		return this.defer(verb_core_Eval,"rationalCurveDerivatives",[this._data,u,numDerivs]);
	}
	,closestPoint: function(pt) {
		return verb_core_Analyze.rationalCurveClosestPoint(this._data,pt);
	}
	,closestPointAsync: function(pt) {
		return this.defer(verb_core_Analyze,"rationalCurveClosestPoint",[this._data,pt]);
	}
	,closestParam: function(pt) {
		return verb_core_Analyze.rationalCurveClosestParam(this._data,pt);
	}
	,closestParamAsync: function(pt) {
		return this.defer(verb_core_Analyze,"rationalCurveClosestParam",[this._data,pt]);
	}
	,length: function() {
		return verb_core_Analyze.rationalCurveArcLength(this._data);
	}
	,lengthAsync: function() {
		return this.defer(verb_core_Analyze,"rationalCurveArcLength",[this._data]);
	}
	,lengthAtParam: function(u) {
		return verb_core_Analyze.rationalCurveArcLength(this._data,u);
	}
	,lengthAtParamAsync: function() {
		return this.defer(verb_core_Analyze,"rationalCurveArcLength",[this._data]);
	}
	,paramAtLength: function(len,tolerance) {
		return verb_core_Analyze.rationalCurveParamAtArcLength(this._data,len,tolerance);
	}
	,paramAtLengthAsync: function(len,tolerance) {
		return this.defer(verb_core_Analyze,"rationalCurveParamAtArcLength",[this._data,len,tolerance]);
	}
	,divideByEqualArcLength: function(divisions) {
		return verb_core_Divide.rationalCurveByEqualArcLength(this._data,divisions);
	}
	,divideByEqualArcLengthAsync: function(divisions) {
		return this.defer(verb_core_Divide,"rationalCurveByEqualArcLength",[this._data,divisions]);
	}
	,divideByArcLength: function(arcLength) {
		return verb_core_Divide.rationalCurveByArcLength(this._data,arcLength);
	}
	,divideByArcLengthAsync: function(divisions) {
		return this.defer(verb_core_Divide,"rationalCurveByArcLength",[this._data,divisions]);
	}
	,split: function(u) {
		return verb_core_Modify.curveSplit(this._data,u).map(function(x) {
			return new verb_geom_NurbsCurve(x);
		});
	}
	,splitAsync: function(u) {
		return this.defer(verb_core_Modify,"curveSplit",[this._data,u]).then(function(cs) {
			return cs.map(function(x) {
				return new verb_geom_NurbsCurve(x);
			});
		});
	}
	,reverse: function() {
		return new verb_geom_NurbsCurve(verb_core_Modify.curveReverse(this._data));
	}
	,reverseAsync: function() {
		return this.defer(verb_core_Modify,"curveReverse",[this._data]).then(function(c) {
			return new verb_geom_NurbsCurve(c);
		});
	}
	,tessellate: function(tolerance) {
		return verb_core_Tess.rationalCurveAdaptiveSample(this._data,tolerance,false);
	}
	,tessellateAsync: function(tolerance) {
		return this.defer(verb_core_Tess,"rationalCurveAdaptiveSample",[this._data,tolerance,false]);
	}
});
var verb_geom_Arc = $hx_exports.geom.Arc = function(center,xaxis,yaxis,radius,minAngle,maxAngle) {
	verb_geom_NurbsCurve.call(this,verb_core_Make.arc(center,xaxis,yaxis,radius,minAngle,maxAngle));
	this._center = center;
	this._xaxis = xaxis;
	this._yaxis = yaxis;
	this._radius = radius;
	this._minAngle = minAngle;
	this._maxAngle = maxAngle;
};
verb_geom_Arc.__name__ = ["verb","geom","Arc"];
verb_geom_Arc.__super__ = verb_geom_NurbsCurve;
verb_geom_Arc.prototype = $extend(verb_geom_NurbsCurve.prototype,{
	center: function() {
		return this._center;
	}
	,xaxis: function() {
		return this._xaxis;
	}
	,yaxis: function() {
		return this._yaxis;
	}
	,radius: function() {
		return this._radius;
	}
	,minAngle: function() {
		return this._minAngle;
	}
	,maxAngle: function() {
		return this._maxAngle;
	}
});
var verb_geom_BezierCurve = $hx_exports.geom.BezierCurve = function(points,weights) {
	verb_geom_NurbsCurve.call(this,verb_core_Make.rationalBezierCurve(points,weights));
};
verb_geom_BezierCurve.__name__ = ["verb","geom","BezierCurve"];
verb_geom_BezierCurve.__super__ = verb_geom_NurbsCurve;
verb_geom_BezierCurve.prototype = $extend(verb_geom_NurbsCurve.prototype,{
});
var verb_geom_Circle = $hx_exports.geom.Circle = function(center,xaxis,yaxis,radius) {
	verb_geom_Arc.call(this,center,xaxis,yaxis,radius,0,Math.PI * 2);
};
verb_geom_Circle.__name__ = ["verb","geom","Circle"];
verb_geom_Circle.__super__ = verb_geom_Arc;
verb_geom_Circle.prototype = $extend(verb_geom_Arc.prototype,{
});
var verb_geom_ISurface = function() { };
verb_geom_ISurface.__name__ = ["verb","geom","ISurface"];
var verb_geom_NurbsSurface = $hx_exports.geom.NurbsSurface = function(data) {
	this._data = verb_core_Check.nurbsSurfaceData(data);
};
verb_geom_NurbsSurface.__name__ = ["verb","geom","NurbsSurface"];
verb_geom_NurbsSurface.__interfaces__ = [verb_geom_ISurface];
verb_geom_NurbsSurface.byKnotsControlPointsWeights = function(degreeU,degreeV,knotsU,knotsV,controlPoints,weights) {
	return new verb_geom_NurbsSurface(new verb_core_types_NurbsSurfaceData(degreeU,degreeV,knotsU,knotsV,verb_core_Eval.homogenize2d(controlPoints,weights)));
};
verb_geom_NurbsSurface.byCorners = function(point0,point1,point2,point3) {
	return new verb_geom_NurbsSurface(verb_core_Make.fourPointSurface(point0,point1,point2,point3));
};
verb_geom_NurbsSurface.byLoftingCurves = function(curves,degreeV) {
	return new verb_geom_NurbsSurface(verb_core_Make.loftedSurface((function($this) {
		var $r;
		var _g = [];
		{
			var _g1 = 0;
			while(_g1 < curves.length) {
				var c = curves[_g1];
				++_g1;
				_g.push(c.asNurbs());
			}
		}
		$r = _g;
		return $r;
	}(this)),degreeV));
};
verb_geom_NurbsSurface.__super__ = verb_exe_AsyncObject;
verb_geom_NurbsSurface.prototype = $extend(verb_exe_AsyncObject.prototype,{
	degreeU: function() {
		return this._data.degreeU;
	}
	,degreeV: function() {
		return this._data.degreeV;
	}
	,knotsU: function() {
		return this._data.knotsU.slice(0);
	}
	,knotsV: function() {
		return this._data.knotsV.slice(0);
	}
	,controlPoints: function() {
		return verb_core_Eval.dehomogenize2d(this._data.controlPoints);
	}
	,weights: function() {
		return verb_core_Eval.weight2d(this._data.controlPoints);
	}
	,asNurbs: function() {
		return new verb_core_types_NurbsSurfaceData(this.degreeU(),this.degreeV(),this.knotsU(),this.knotsV(),verb_core_Eval.homogenize2d(this.controlPoints(),this.weights()));
	}
	,clone: function() {
		return new verb_geom_NurbsSurface(this.asNurbs());
	}
	,domainU: function() {
		return new verb_core_types_Interval(this._data.knotsU[0],verb_core_ArrayExtensions.last(this._data.knotsU));
	}
	,domainV: function() {
		return new verb_core_types_Interval(this._data.knotsV[0],verb_core_ArrayExtensions.last(this._data.knotsV));
	}
	,point: function(u,v) {
		return verb_core_Eval.rationalSurfacePoint(this._data,u,v);
	}
	,pointAsync: function(u,v) {
		return this.defer(verb_core_Eval,"rationalSurfacePoint",[this._data,u,v]);
	}
	,normal: function(u,v) {
		return verb_core_Eval.rationalSurfaceNormal(this._data,u,v);
	}
	,normalAsync: function(u,v) {
		return this.defer(verb_core_Eval,"rationalSurfaceNormal",[this._data,u,v]);
	}
	,derivatives: function(u,v,numDerivs) {
		if(numDerivs == null) numDerivs = 1;
		return verb_core_Eval.rationalSurfaceDerivatives(this._data,u,v,numDerivs);
	}
	,derivativesAsync: function(u,v,numDerivs) {
		if(numDerivs == null) numDerivs = 1;
		return this.defer(verb_core_Eval,"rationalSurfaceDerivatives",[this._data,u,v,numDerivs]);
	}
	,closestParam: function(pt) {
		return verb_core_Analyze.rationalSurfaceClosestParam(this._data,pt);
	}
	,closestParamAsync: function(pt) {
		return this.defer(verb_core_Analyze,"rationalSurfaceClosestParam",[this._data,pt]);
	}
	,closestPoint: function(pt) {
		return verb_core_Analyze.rationalSurfaceClosestPoint(this._data,pt);
	}
	,closestPointAsync: function(pt) {
		return this.defer(verb_core_Analyze,"rationalSurfaceClosestPoint",[this._data,pt]);
	}
	,split: function(u,useV) {
		if(useV == null) useV = false;
		return verb_core_Modify.surfaceSplit(this._data,u,useV).map(function(x) {
			return new verb_geom_NurbsSurface(x);
		});
	}
	,splitAsync: function(u,useV) {
		if(useV == null) useV = false;
		return this.defer(verb_core_Modify,"surfaceSplit",[this._data,u,useV]).then(function(s) {
			return s.map(function(x) {
				return new verb_geom_NurbsSurface(x);
			});
		});
	}
	,reverse: function(useV) {
		if(useV == null) useV = false;
		return new verb_geom_NurbsSurface(verb_core_Modify.surfaceReverse(this._data,useV));
	}
	,reverseAsync: function(useV) {
		if(useV == null) useV = false;
		return this.defer(verb_core_Modify,"surfaceReverse",[this._data,useV]).then(function(c) {
			return new verb_geom_NurbsSurface(c);
		});
	}
	,isocurve: function(u,useV) {
		if(useV == null) useV = false;
		return new verb_geom_NurbsCurve(verb_core_Make.surfaceIsocurve(this._data,u,useV));
	}
	,isocurveAsync: function(u,useV) {
		if(useV == null) useV = false;
		return this.defer(verb_core_Make,"surfaceIsocurve",[this._data,u,useV]).then(function(x) {
			return new verb_geom_NurbsCurve(x);
		});
	}
	,boundaries: function(options) {
		return verb_core_Make.surfaceBoundaryCurves(this._data).map(function(x) {
			return new verb_geom_NurbsCurve(x);
		});
	}
	,boundariesAsync: function(options) {
		return this.defer(verb_core_Make,"surfaceBoundaryCurves",[this._data]).then(function(cs) {
			return cs.map(function(x) {
				return new verb_geom_NurbsCurve(x);
			});
		});
	}
	,tessellate: function(options) {
		return verb_core_Tess.rationalSurfaceAdaptive(this._data,options);
	}
	,tessellateAsync: function(options) {
		return this.defer(verb_core_Tess,"rationalSurfaceAdaptive",[this._data,options]);
	}
	,transform: function(mat) {
		return new verb_geom_NurbsSurface(verb_core_Modify.rationalSurfaceTransform(this._data,mat));
	}
	,transformAsync: function(mat) {
		return this.defer(verb_core_Modify,"rationalSurfaceTransform",[this._data,mat]).then(function(x) {
			return new verb_geom_NurbsSurface(x);
		});
	}
});
var verb_geom_ConicalSurface = $hx_exports.geom.ConicalSurface = function(axis,xaxis,base,height,radius) {
	verb_geom_NurbsSurface.call(this,verb_core_Make.conicalSurface(axis,xaxis,base,height,radius));
	this._axis = axis;
	this._xaxis = xaxis;
	this._base = base;
	this._height = height;
	this._radius = radius;
};
verb_geom_ConicalSurface.__name__ = ["verb","geom","ConicalSurface"];
verb_geom_ConicalSurface.__super__ = verb_geom_NurbsSurface;
verb_geom_ConicalSurface.prototype = $extend(verb_geom_NurbsSurface.prototype,{
	axis: function() {
		return this._axis;
	}
	,xaxis: function() {
		return this._xaxis;
	}
	,base: function() {
		return this._base;
	}
	,height: function() {
		return this._height;
	}
	,radius: function() {
		return this._radius;
	}
});
var verb_geom_CylindricalSurface = $hx_exports.geom.CylindricalSurface = function(axis,xaxis,base,height,radius) {
	verb_geom_NurbsSurface.call(this,verb_core_Make.cylindricalSurface(axis,xaxis,base,height,radius));
	this._axis = axis;
	this._xaxis = xaxis;
	this._base = base;
	this._height = height;
	this._radius = radius;
};
verb_geom_CylindricalSurface.__name__ = ["verb","geom","CylindricalSurface"];
verb_geom_CylindricalSurface.__super__ = verb_geom_NurbsSurface;
verb_geom_CylindricalSurface.prototype = $extend(verb_geom_NurbsSurface.prototype,{
	axis: function() {
		return this._axis;
	}
	,xaxis: function() {
		return this._xaxis;
	}
	,base: function() {
		return this._base;
	}
	,height: function() {
		return this._height;
	}
	,radius: function() {
		return this._radius;
	}
});
var verb_geom_EllipseArc = $hx_exports.geom.EllipseArc = function(center,xaxis,yaxis,minAngle,maxAngle) {
	verb_geom_NurbsCurve.call(this,verb_core_Make.ellipseArc(center,xaxis,yaxis,minAngle,maxAngle));
	this._center = center;
	this._xaxis = xaxis;
	this._yaxis = yaxis;
	this._minAngle = minAngle;
	this._maxAngle = maxAngle;
};
verb_geom_EllipseArc.__name__ = ["verb","geom","EllipseArc"];
verb_geom_EllipseArc.__super__ = verb_geom_NurbsCurve;
verb_geom_EllipseArc.prototype = $extend(verb_geom_NurbsCurve.prototype,{
	center: function() {
		return this._center;
	}
	,xaxis: function() {
		return this._xaxis;
	}
	,yaxis: function() {
		return this._yaxis;
	}
	,minAngle: function() {
		return this._minAngle;
	}
	,maxAngle: function() {
		return this._maxAngle;
	}
});
var verb_geom_Ellipse = $hx_exports.geom.Ellipse = function(center,xaxis,yaxis) {
	verb_geom_EllipseArc.call(this,center,xaxis,yaxis,0,Math.PI * 2);
};
verb_geom_Ellipse.__name__ = ["verb","geom","Ellipse"];
verb_geom_Ellipse.__super__ = verb_geom_EllipseArc;
verb_geom_Ellipse.prototype = $extend(verb_geom_EllipseArc.prototype,{
});
var verb_geom_ExtrudedSurface = $hx_exports.geom.ExtrudedSurface = function(profile,direction) {
	verb_geom_NurbsSurface.call(this,verb_core_Make.extrudedSurface(verb_core_Vec.normalized(direction),verb_core_Vec.norm(direction),profile.asNurbs()));
	this._profile = profile;
	this._direction = direction;
};
verb_geom_ExtrudedSurface.__name__ = ["verb","geom","ExtrudedSurface"];
verb_geom_ExtrudedSurface.__super__ = verb_geom_NurbsSurface;
verb_geom_ExtrudedSurface.prototype = $extend(verb_geom_NurbsSurface.prototype,{
	profile: function() {
		return this._profile;
	}
	,direction: function() {
		return this._direction;
	}
});
var verb_geom_Intersect = $hx_exports.geom.Intersect = function() { };
verb_geom_Intersect.__name__ = ["verb","geom","Intersect"];
verb_geom_Intersect.curves = function(first,second,tol) {
	if(tol == null) tol = 1e-3;
	return verb_core_Intersect.curves(first.asNurbs(),second.asNurbs(),tol);
};
verb_geom_Intersect.curvesAsync = function(first,second,tol) {
	if(tol == null) tol = 1e-3;
	return verb_exe_Dispatcher.dispatchMethod(verb_core_Intersect,"curves",[first.asNurbs(),second.asNurbs(),tol]);
};
verb_geom_Intersect.curveAndSurface = function(curve,surface,tol) {
	if(tol == null) tol = 1e-3;
	return verb_core_Intersect.curveAndSurface(curve.asNurbs(),surface.asNurbs(),tol);
};
verb_geom_Intersect.curveAndSurfaceAsync = function(curve,surface,tol) {
	if(tol == null) tol = 1e-3;
	return verb_exe_Dispatcher.dispatchMethod(verb_core_Intersect,"curveAndSurface",[curve.asNurbs(),surface.asNurbs(),tol]);
};
verb_geom_Intersect.surfaces = function(first,second,tol) {
	if(tol == null) tol = 1e-3;
	return verb_core_Intersect.surfaces(first.asNurbs(),second.asNurbs(),tol).map(function(cd) {
		return new verb_geom_NurbsCurve(cd);
	});
};
verb_geom_Intersect.surfacesAsync = function(first,second,tol) {
	if(tol == null) tol = 1e-3;
	return verb_exe_Dispatcher.dispatchMethod(verb_core_Intersect,"surfaces",[first.asNurbs(),second.asNurbs(),tol]).then(function(cds) {
		return cds.map(function(cd) {
			return new verb_geom_NurbsCurve(cd);
		});
	});
};
var verb_geom_Line = $hx_exports.geom.Line = function(start,end) {
	verb_geom_NurbsCurve.call(this,verb_core_Make.polyline([start,end]));
	this._start = start;
	this._end = end;
};
verb_geom_Line.__name__ = ["verb","geom","Line"];
verb_geom_Line.__super__ = verb_geom_NurbsCurve;
verb_geom_Line.prototype = $extend(verb_geom_NurbsCurve.prototype,{
	start: function() {
		return this._start;
	}
	,end: function() {
		return this._end;
	}
});
var verb_geom_RevolvedSurface = $hx_exports.geom.RevolvedSurface = function(profile,center,axis,angle) {
	verb_geom_NurbsSurface.call(this,verb_core_Make.revolvedSurface(profile.asNurbs(),center,axis,angle));
	this._profile = profile;
	this._center = center;
	this._axis = axis;
	this._angle = angle;
};
verb_geom_RevolvedSurface.__name__ = ["verb","geom","RevolvedSurface"];
verb_geom_RevolvedSurface.__super__ = verb_geom_NurbsSurface;
verb_geom_RevolvedSurface.prototype = $extend(verb_geom_NurbsSurface.prototype,{
	profile: function() {
		return this._profile;
	}
	,center: function() {
		return this._center;
	}
	,axis: function() {
		return this._center;
	}
	,angle: function() {
		return this._angle;
	}
});
var verb_geom_SphericalSurface = $hx_exports.geom.SphericalSurface = function(center,radius) {
	verb_geom_NurbsSurface.call(this,verb_core_Make.sphericalSurface(center,[0,0,1],[1,0,0],radius));
	this._center = center;
	this._radius = radius;
};
verb_geom_SphericalSurface.__name__ = ["verb","geom","SphericalSurface"];
verb_geom_SphericalSurface.__super__ = verb_geom_NurbsSurface;
verb_geom_SphericalSurface.prototype = $extend(verb_geom_NurbsSurface.prototype,{
	center: function() {
		return this._center;
	}
	,radius: function() {
		return this._radius;
	}
});
var verb_geom_SweptSurface = $hx_exports.geom.SweptSurface = function(profile,rail) {
	verb_geom_NurbsSurface.call(this,verb_core_Make.rationalTranslationalSurface(profile.asNurbs(),rail.asNurbs()));
	this._profile = profile;
	this._rail = rail;
};
verb_geom_SweptSurface.__name__ = ["verb","geom","SweptSurface"];
verb_geom_SweptSurface.__super__ = verb_geom_NurbsSurface;
verb_geom_SweptSurface.prototype = $extend(verb_geom_NurbsSurface.prototype,{
	profile: function() {
		return this._profile;
	}
	,rail: function() {
		return this._rail;
	}
});
var verb_topo_Analyze = $hx_exports.topo.Analyze = function() { };
verb_topo_Analyze.__name__ = ["verb","topo","Analyze"];
verb_topo_Analyze.volume = function(s,o) {
	if(o == null) o = [0.0,0.0,0.0];
	var v = 0.0;
	var $it0 = $iterator(verb_core_types_DoublyLinkedListExtensions.iter(s.f))();
	while( $it0.hasNext() ) {
		var f = $it0.next();
		var $it1 = $iterator(verb_core_types_DoublyLinkedListExtensions.iter(f.l))();
		while( $it1.hasNext() ) {
			var l = $it1.next();
			var se = l.e;
			var ce = se.nxt;
			do {
				v += verb_topo_Analyze.tetravol(se.v.pt,ce.v.pt,ce.nxt.v.pt,o);
				ce = ce.nxt;
			} while(ce.nxt != se);
		}
	}
	return v / 6.0;
};
verb_topo_Analyze.tetravol = function(a,b,c,d) {
	return verb_core_Vec.dot(verb_core_Vec.sub(a,d),verb_core_Vec.cross(verb_core_Vec.sub(b,d),verb_core_Vec.sub(c,d)));
};
verb_topo_Analyze.area = function(s) {
	return Lambda.fold(verb_core_types_DoublyLinkedListExtensions.iter(s.f),function(f,a) {
		return a + verb_topo_Analyze.faceArea(f);
	},0.0);
};
verb_topo_Analyze.faceArea = function(f) {
	var n = f.normal();
	return Lambda.fold(verb_core_types_DoublyLinkedListExtensions.iter(f.l),function(l,a) {
		return a + verb_topo_Analyze.loopArea(l,n);
	},0.0);
};
verb_topo_Analyze.loopArea = function(l,n) {
	var e = l.e;
	if(e == e.nxt || e == e.nxt.nxt) return 0.0;
	var v = 0.0;
	if(n == null) n = l.f.normal();
	var se = l.e;
	var o = l.e.v.pt;
	var ce = se.nxt;
	do {
		var a = ce.v.pt;
		var b = ce.nxt.v.pt;
		v += verb_core_Vec.dot(n,verb_core_Vec.cross(verb_core_Vec.sub(a,o),verb_core_Vec.sub(b,o)));
		ce = ce.nxt;
	} while(ce.nxt != se);
	return v / 2;
};
var verb_topo_FacePosition = { __ename__ : true, __constructs__ : ["On","AonBp","AonBm","BonAp","BonAm","AoutB","AinB","BoutA","BinA"] };
verb_topo_FacePosition.On = ["On",0];
verb_topo_FacePosition.On.toString = $estr;
verb_topo_FacePosition.On.__enum__ = verb_topo_FacePosition;
verb_topo_FacePosition.AonBp = ["AonBp",1];
verb_topo_FacePosition.AonBp.toString = $estr;
verb_topo_FacePosition.AonBp.__enum__ = verb_topo_FacePosition;
verb_topo_FacePosition.AonBm = ["AonBm",2];
verb_topo_FacePosition.AonBm.toString = $estr;
verb_topo_FacePosition.AonBm.__enum__ = verb_topo_FacePosition;
verb_topo_FacePosition.BonAp = ["BonAp",3];
verb_topo_FacePosition.BonAp.toString = $estr;
verb_topo_FacePosition.BonAp.__enum__ = verb_topo_FacePosition;
verb_topo_FacePosition.BonAm = ["BonAm",4];
verb_topo_FacePosition.BonAm.toString = $estr;
verb_topo_FacePosition.BonAm.__enum__ = verb_topo_FacePosition;
verb_topo_FacePosition.AoutB = ["AoutB",5];
verb_topo_FacePosition.AoutB.toString = $estr;
verb_topo_FacePosition.AoutB.__enum__ = verb_topo_FacePosition;
verb_topo_FacePosition.AinB = ["AinB",6];
verb_topo_FacePosition.AinB.toString = $estr;
verb_topo_FacePosition.AinB.__enum__ = verb_topo_FacePosition;
verb_topo_FacePosition.BoutA = ["BoutA",7];
verb_topo_FacePosition.BoutA.toString = $estr;
verb_topo_FacePosition.BoutA.__enum__ = verb_topo_FacePosition;
verb_topo_FacePosition.BinA = ["BinA",8];
verb_topo_FacePosition.BinA.toString = $estr;
verb_topo_FacePosition.BinA.__enum__ = verb_topo_FacePosition;
var verb_topo_BoolOp = { __ename__ : true, __constructs__ : ["Union","Subtract","Intersect"] };
verb_topo_BoolOp.Union = ["Union",0];
verb_topo_BoolOp.Union.toString = $estr;
verb_topo_BoolOp.Union.__enum__ = verb_topo_BoolOp;
verb_topo_BoolOp.Subtract = ["Subtract",1];
verb_topo_BoolOp.Subtract.toString = $estr;
verb_topo_BoolOp.Subtract.__enum__ = verb_topo_BoolOp;
verb_topo_BoolOp.Intersect = ["Intersect",2];
verb_topo_BoolOp.Intersect.toString = $estr;
verb_topo_BoolOp.Intersect.__enum__ = verb_topo_BoolOp;
var verb_topo_SectorIntersection = function() {
	this.intersect = true;
};
verb_topo_SectorIntersection.__name__ = ["verb","topo","SectorIntersection"];
var verb_topo_SectorDescription = function(i,list) {
	this.i = i;
	this.list = list;
};
verb_topo_SectorDescription.__name__ = ["verb","topo","SectorDescription"];
verb_topo_SectorDescription.prototype = {
	nxt: function() {
		var j = (this.i + 1) % this.list.length;
		return this.list[j];
	}
	,prv: function() {
		var j;
		if(this.i == 0) j = this.list.length - 1; else j = this.i - 1;
		return this.list[j];
	}
	,updateNormal: function() {
		this.ref12 = verb_core_Vec.cross(this.ref1,this.ref2);
	}
};
var verb_topo_Boolean = $hx_exports.topo.Boolean = function() { };
verb_topo_Boolean.__name__ = ["verb","topo","Boolean"];
verb_topo_Boolean.union = function(a,b,tol) {
	var op = verb_topo_BoolOp.Union;
	var sg = verb_topo_Boolean.intersect(a,b,tol);
	var clvfa = verb_topo_Boolean.classifyAllVertexFaceEvents(sg.coplanarVerticesOfA,op,true);
	var clvfb = verb_topo_Boolean.classifyAllVertexFaceEvents(sg.coplanarVerticesOfB,op,false);
	var clvv = verb_topo_Boolean.classifyAllVertexVertexEvents(sg.coincidentVertices,op);
	var nea = [];
	var neb = [];
	verb_topo_Boolean.insertAllVertexFaceEventNullEdges(sg.coplanarVerticesOfA,clvfa,op,true,nea,neb);
	verb_topo_Boolean.insertAllVertexFaceEventNullEdges(sg.coplanarVerticesOfB,clvfb,op,false,nea,neb);
	verb_topo_Boolean.insertAllVertexVertexEventNullEdges(clvv,nea,neb);
	var afaces = [];
	var bfaces = [];
	verb_topo_Boolean.connect(nea,neb,afaces,bfaces);
};
verb_topo_Boolean.connect = function(nesa,nesb,afaces,bfaces) {
	verb_topo_Split.lexicographicalSort(nesa);
	verb_topo_Split.lexicographicalSort(nesb);
	var h0;
	var h1;
	var looseendsa = [];
	var looseendsb = [];
	var _g1 = 0;
	var _g = nesa.length;
	while(_g1 < _g) {
		var i = _g1++;
		var nea = nesa[i];
		var neb = nesb[i];
		if((h0 = verb_topo_Boolean.canJoin(nea,neb.opp,looseendsa,looseendsb)) != null) {
			haxe_Log.trace("joining 1!",{ fileName : "Boolean.hx", lineNumber : 165, className : "verb.topo.Boolean", methodName : "connect"});
			var h0a = h0.item0;
			var h0b = h0.item1;
			haxe_Log.trace("connecting:",{ fileName : "Boolean.hx", lineNumber : 170, className : "verb.topo.Boolean", methodName : "connect", customParams : [h0a.id,nea.id]});
			verb_topo_Split.join(h0a,nea);
			if(!verb_topo_Split.isLoose(h0a.opp,looseendsa)) verb_topo_Split.cut(h0a,afaces);
			verb_topo_Split.join(h0b,neb.opp);
			if(!verb_topo_Split.isLoose(h0b.opp,looseendsb)) verb_topo_Split.cut(h0b,bfaces);
		}
		if((h1 = verb_topo_Boolean.canJoin(nea.opp,neb,looseendsa,looseendsb)) != null) {
			haxe_Log.trace("joining 2!",{ fileName : "Boolean.hx", lineNumber : 186, className : "verb.topo.Boolean", methodName : "connect"});
			var h1a = h1.item0;
			var h1b = h1.item1;
			haxe_Log.trace("connecting:",{ fileName : "Boolean.hx", lineNumber : 191, className : "verb.topo.Boolean", methodName : "connect", customParams : [h1a.id,h1b.id,neb.id,nea.opp.id]});
			verb_topo_Split.join(h1a,nea.opp);
			if(!verb_topo_Split.isLoose(h1a.opp,looseendsa)) verb_topo_Split.cut(h1a,afaces);
			haxe_Log.trace("alright",{ fileName : "Boolean.hx", lineNumber : 198, className : "verb.topo.Boolean", methodName : "connect"});
			verb_topo_Split.join(h1b,neb);
			if(!verb_topo_Split.isLoose(h1b.opp,looseendsb)) verb_topo_Split.cut(h1b,bfaces);
		}
		if(h0 != null && h1 != null) {
			haxe_Log.trace("cutting",{ fileName : "Boolean.hx", lineNumber : 206, className : "verb.topo.Boolean", methodName : "connect"});
			verb_topo_Split.cut(nea,afaces);
			verb_topo_Split.cut(neb,bfaces);
		}
	}
};
verb_topo_Boolean.canJoin = function(hea,heb,looseendsa,looseendsb) {
	if(hea != null && heb != null) {
		var _g1 = 0;
		var _g = looseendsa.length;
		while(_g1 < _g) {
			var i = _g1++;
			var n0 = verb_topo_Split.neighbor(hea,looseendsa[i]);
			var n1 = verb_topo_Split.neighbor(heb,looseendsb[i]);
			if(n0 && n1) {
				var ra = looseendsa[i];
				var rb = looseendsb[i];
				looseendsa.splice(i,1);
				looseendsb.splice(i,1);
				return new verb_core_types_Pair(ra,rb);
			}
		}
	}
	if(hea != null) looseendsa.push(hea);
	if(heb != null) looseendsb.push(heb);
	return null;
};
verb_topo_Boolean.insertAllVertexFaceEventNullEdges = function(vfs,efs,op,isA,nea,neb) {
	var _g1 = 0;
	var _g = vfs.length;
	while(_g1 < _g) {
		var i = _g1++;
		verb_topo_Boolean.insertVertexFaceEventNullEdges(vfs[i].item0,vfs[i].item1,efs[i],op,isA,nea,neb);
	}
};
verb_topo_Boolean.insertVertexFaceEventNullEdges = function(v,f,efs,op,isA,nea,neb) {
	verb_topo_Boolean.insertVertexFaceEventNullEdgesCore(v,f,efs,isA,isA?nea:neb);
	verb_topo_Boolean.insertNullEdgeIntoFace(v.pt.slice(),f,isA?neb:nea);
};
verb_topo_Boolean.insertVertexFaceEventNullEdgesCore = function(v,f,efs,isA,nulledges) {
	var s = v.e.l.f.s;
	var i = verb_topo_Boolean.nextOfClass(verb_topo_Boolean.above(isA),efs,0);
	if(i == -1) return;
	if(verb_topo_Boolean.nextOfClass(verb_topo_Boolean.below(isA),efs,0) == -1) return;
	var start = efs[i].edge;
	var head = start;
	var tail = start;
	var el = efs.length;
	while(true) {
		while(efs[i].pos == verb_topo_Boolean.above(isA)) {
			tail = efs[i].edge;
			i = (i + 1) % el;
		}
		s.lmev(head,tail.opp.nxt,head.v.pt.slice());
		nulledges.push(head.prv);
		i = verb_topo_Boolean.nextOfClass(verb_topo_Boolean.above(isA),efs,i);
		if(i == -1) break;
		head = efs[i].edge;
		if(head == start) break;
	}
};
verb_topo_Boolean.nextOfClass = function(cl,ecs,start) {
	var i = start;
	var head = null;
	while(i < ecs.length) {
		if(ecs[i].pos == cl) {
			head = ecs[i];
			break;
		}
		i++;
	}
	if(head != null) return i; else return -1;
};
verb_topo_Boolean.insertNullEdgeIntoFace = function(point,f,nes) {
	var nv = f.s.lmev(f.ol.e,f.ol.e,point);
	var nl = f.s.lkemr(nv.e.prv);
	nes.push(nv.e);
};
verb_topo_Boolean.insertAllVertexVertexEventNullEdges = function(sps,nea,neb) {
	var _g = 0;
	while(_g < sps.length) {
		var sp = sps[_g];
		++_g;
		verb_topo_Boolean.insertVertexVertexEventNullEdges(sp,nea,neb);
	}
};
verb_topo_Boolean.classifyAllVertexVertexEvents = function(vvs,op) {
	var _g = [];
	var _g1 = 0;
	while(_g1 < vvs.length) {
		var vv = vvs[_g1];
		++_g1;
		_g.push(verb_topo_Boolean.classifyVertexVertexEvent(vv.item0,vv.item1,op));
	}
	return _g;
};
verb_topo_Boolean.classifyVertexVertexEvent = function(a,b,op) {
	var sps = verb_topo_Boolean.classifyVertexVertexCore(a,b);
	verb_topo_Boolean.reclassifyCoplanarSectorPairs(sps,op);
	verb_topo_Boolean.reclassifyCoplanarSectorEdge(sps,op);
	return sps;
};
verb_topo_Boolean.insertVertexVertexEventNullEdges = function(ar,nea,neb) {
	var i = 0;
	var arl = ar.length;
	while(true) {
		while(!ar[i].intersect) if(++i == arl) return;
		var ha1 = null;
		var ha2 = null;
		var hb1 = null;
		var hb2 = null;
		if(ar[i].s1a == verb_topo_Boolean.OUT) ha1 = ar[i].SectorA.edge; else ha2 = ar[i].SectorA.edge;
		if(ar[i].s1b == verb_topo_Boolean.IN) hb1 = ar[i++].SectorB.edge; else hb2 = ar[i++].SectorB.edge;
		while(!ar[i].intersect) if(++i == arl) return;
		if(ar[i].s1a == verb_topo_Boolean.OUT) ha1 = ar[i].SectorA.edge; else ha2 = ar[i].SectorA.edge;
		if(ar[i].s1b == verb_topo_Boolean.IN) hb1 = ar[i++].SectorB.edge; else hb2 = ar[i++].SectorB.edge;
		if(ha1 == ha2) {
			verb_topo_Boolean.insertNullEdge(ha1,ha1,0,nea,neb);
			verb_topo_Boolean.insertNullEdge(hb1,hb2,1,nea,neb);
		} else if(hb1 == hb2) {
			verb_topo_Boolean.insertNullEdge(hb1,hb1,1,nea,neb);
			verb_topo_Boolean.insertNullEdge(ha2,ha1,0,nea,neb);
		} else {
			verb_topo_Boolean.insertNullEdge(ha2,ha1,0,nea,neb);
			verb_topo_Boolean.insertNullEdge(hb1,hb2,1,nea,neb);
		}
		if(i == arl) return;
	}
};
verb_topo_Boolean.insertNullEdge = function(t,f,type,nea,neb) {
	t.l.f.s.lmev(f,t,f.v.pt.slice());
	if(type == 0) nea.push(f.prv); else neb.push(f.prv);
};
verb_topo_Boolean.classifyAllVertexFaceEvents = function(a,op,isA) {
	var _g = [];
	var _g1 = 0;
	while(_g1 < a.length) {
		var vf = a[_g1];
		++_g1;
		_g.push(verb_topo_Boolean.classifyVertexFaceEvent(vf.item0,vf.item1,op,isA));
	}
	return _g;
};
verb_topo_Boolean.classifyVertexFaceEvent = function(v,f,op,isA) {
	var p = verb_topo_Boolean.planeFromFace(f);
	var ecs = [];
	var _g = 0;
	var _g1 = v.halfEdges();
	while(_g < _g1.length) {
		var e = _g1[_g];
		++_g;
		ecs.push({ edge : e, pos : verb_topo_Boolean.asFacePosition(verb_topo_Split.classify(e,p),isA)});
		if(verb_topo_Split.wideSector(e)) ecs.push({ edge : e, pos : verb_topo_Boolean.asFacePosition(verb_topo_Split.classifyBisector(e,p),isA)});
	}
	var el = ecs.length;
	var _g2 = 0;
	while(_g2 < el) {
		var i = _g2++;
		var ep = ecs[i];
		if(ep.pos == verb_topo_FacePosition.On) {
			var nc = verb_topo_Boolean.reclassifyCoplanarEdge(ep.edge,p,isA);
			ecs[i].pos = nc;
			ecs[(i + 1) % el].pos = nc;
		}
	}
	var _g3 = 0;
	while(_g3 < el) {
		var i1 = _g3++;
		var ep1 = ecs[i1];
		var ei = ep1.pos[1];
		if(ei > 0 && ei < 5) ep1.pos = verb_topo_Boolean.reclassifyOnSector(ep1.pos,op);
	}
	var _g4 = 0;
	while(_g4 < el) {
		var i2 = _g4++;
		var ep2 = ecs[i2];
		if(ep2.pos == verb_topo_FacePosition.On) {
			var a;
			if(i2 == 0) a = el - 1; else a = i2 - 1;
			var b = (i2 + 1) % el;
			var prv = ecs[a].pos;
			var nxt = ecs[b].pos;
			if(verb_topo_Boolean.isAbove(prv) && verb_topo_Boolean.isAbove(nxt)) ep2.pos = verb_topo_Boolean.below(isA); else if(verb_topo_Boolean.isBelow(prv) && verb_topo_Boolean.isAbove(nxt)) ep2.pos = verb_topo_Boolean.below(isA); else if(verb_topo_Boolean.isAbove(prv) && verb_topo_Boolean.isBelow(nxt)) ep2.pos = verb_topo_Boolean.below(isA); else if(verb_topo_Boolean.isBelow(prv) && verb_topo_Boolean.isBelow(nxt)) ep2.pos = verb_topo_Boolean.above(isA); else throw new js__$Boot_HaxeError(new verb_core_types_Exception("Double On edge encountered!"));
		}
	}
	return ecs;
};
verb_topo_Boolean.reclassifyCoplanarSectorEdge = function(sps,op) {
	var _g = 0;
	while(_g < sps.length) {
		var sp = sps[_g];
		++_g;
		if(!(sp.s1a == 0 || sp.s1b == 0 || sp.s2a == 0 || sp.s2b == 0)) continue;
		throw new js__$Boot_HaxeError(new verb_core_types_Exception("Coplanar sector edge classification not yet implemented!"));
	}
};
verb_topo_Boolean.reclassifyCoplanarSectorPairs = function(sps,op) {
	var _g = 0;
	while(_g < sps.length) {
		var sp = sps[_g];
		++_g;
		if(!(sp.s1a == 0 && sp.s1b == 0 && sp.s2a == 0 && sp.s2b == 0)) continue;
		var sa = sp.SectorA;
		var sb = sp.SectorB;
		var psa = sa.prv();
		var nsa = sa.nxt();
		var psb = sb.prv();
		var nsb = sb.nxt();
		var ha = sa.edge;
		var hb = sb.edge;
		var newsa = 0;
		var newsb = 0;
		var aligned = verb_core_Vec.norm(verb_core_Vec.sub(ha.l.f.normal(),hb.l.f.normal())) < 1e-10;
		if(aligned) {
			if(op == verb_topo_BoolOp.Union) newsa = -1; else newsa = 1;
			if(op == verb_topo_BoolOp.Union) newsb = 1; else newsb = -1;
		} else {
			if(op == verb_topo_BoolOp.Union) newsa = 1; else newsa = -1;
			if(op == verb_topo_BoolOp.Union) newsb = 1; else newsb = -1;
		}
		var _g1 = 0;
		while(_g1 < sps.length) {
			var sp2 = sps[_g1];
			++_g1;
			if(sp2.SectorA == psa && sp2.SectorB == sb && sp2.s1a != 0) sp2.s2a = newsa;
			if(sp2.SectorA == nsa && sp2.SectorB == sb && sp2.s2a != 0) sp2.s1a = newsa;
			if(sp2.SectorA == sa && sp2.SectorB == psb && sp2.s1b != 0) sp2.s2b = newsb;
			if(sp2.s1a == sp2.s2a && sp2.s1a != 0) sp2.intersect = false;
			if(sp2.s1b == sp2.s2b && sp2.s1b != 0) sp2.intersect = false;
		}
		sp.s1a = sp.s2a = newsa;
		sp.s1b = sp.s2b = newsb;
		sp.intersect = false;
	}
};
verb_topo_Boolean.classifyVertexVertexCore = function(a,b) {
	var res = [];
	var svsa = verb_topo_Boolean.preprocessVertexSectors(a);
	var svsb = verb_topo_Boolean.preprocessVertexSectors(b);
	var _g = 0;
	while(_g < svsa.length) {
		var sva = svsa[_g];
		++_g;
		var _g1 = 0;
		while(_g1 < svsb.length) {
			var svb = svsb[_g1];
			++_g1;
			if(verb_topo_Boolean.sectorsIntersect(sva,svb)) {
				var sp = new verb_topo_SectorIntersection();
				res.push(sp);
				sp.SectorA = sva;
				sp.SectorB = svb;
				var na = sva.edge.l.f.normal();
				var nb = svb.edge.l.f.normal();
				sp.s1a = verb_topo_Boolean.comp(verb_core_Vec.dot(nb,sva.ref1),0.0,1e-10);
				sp.s2a = verb_topo_Boolean.comp(verb_core_Vec.dot(nb,sva.ref2),0.0,1e-10);
				sp.s1b = verb_topo_Boolean.comp(verb_core_Vec.dot(na,svb.ref1),0.0,1e-10);
				sp.s2b = verb_topo_Boolean.comp(verb_core_Vec.dot(na,svb.ref2),0.0,1e-10);
			}
		}
	}
	return res;
};
verb_topo_Boolean.sectorsIntersect = function(a,b) {
	var na = a.edge.l.f.normal();
	var nb = b.edge.l.f.normal();
	var $int = verb_core_Vec.cross(na,nb);
	if(verb_core_Vec.norm($int) < 1e-10) return verb_topo_Boolean.sectorsOverlap(a,b);
	if(verb_topo_Boolean.withinSector($int,a) && verb_topo_Boolean.withinSector($int,b)) return true;
	$int = verb_core_Vec.neg($int);
	return verb_topo_Boolean.withinSector($int,a) && verb_topo_Boolean.withinSector($int,b);
};
verb_topo_Boolean.sectorsOverlap = function(a,b) {
	throw new js__$Boot_HaxeError(new verb_core_types_Exception("sectorsOverlap not implemented!"));
	return false;
};
verb_topo_Boolean.withinSector = function(vec,sv) {
	return verb_core_Vec.positiveAngleBetween(vec,sv.ref1,sv.ref12) < verb_core_Vec.positiveAngleBetween(sv.ref1,sv.ref2,sv.ref12);
};
verb_topo_Boolean.comp = function(a,b,tol) {
	if(Math.abs(a - b) < tol) return 0;
	if(a > b) return 1; else return -1;
};
verb_topo_Boolean.preprocessVertexSectors = function(v,tol) {
	if(tol == null) tol = 1.0e-3;
	var svs = [];
	var i = 0;
	var _g = 0;
	var _g1 = v.halfEdges();
	while(_g < _g1.length) {
		var e = _g1[_g];
		++_g;
		var sv = new verb_topo_SectorDescription(i++,svs);
		svs.push(sv);
		sv.edge = e;
		sv.ref1 = verb_core_Vec.sub(e.prv.v.pt,e.v.pt);
		sv.ref2 = verb_core_Vec.sub(e.nxt.v.pt,e.v.pt);
		sv.updateNormal();
		if(verb_core_Vec.norm(sv.ref12) < tol || verb_core_Vec.dot(e.l.f.normal(),sv.ref12) > 0.0) {
			var bisector;
			if(verb_core_Vec.norm(sv.ref12) < tol) throw new js__$Boot_HaxeError(new verb_core_types_Exception("Coincident consecutive edges encountered!")); else bisector = verb_core_Vec.neg(verb_core_Vec.add(sv.ref1,sv.ref2));
			var sv2 = new verb_topo_SectorDescription(i++,svs);
			svs.push(sv2);
			sv2.edge = e;
			sv2.ref2 = sv.ref2.slice();
			sv2.ref1 = bisector;
			sv.ref2 = bisector;
			sv.updateNormal();
			sv2.updateNormal();
		}
	}
	return svs;
};
verb_topo_Boolean.above = function(isA) {
	if(isA) return verb_topo_FacePosition.AoutB; else return verb_topo_FacePosition.BoutA;
};
verb_topo_Boolean.below = function(isA) {
	if(isA) return verb_topo_FacePosition.AinB; else return verb_topo_FacePosition.BinA;
};
verb_topo_Boolean.isAbove = function(pos) {
	return pos == verb_topo_FacePosition.AoutB || pos == verb_topo_FacePosition.BoutA;
};
verb_topo_Boolean.isBelow = function(pos) {
	return pos == verb_topo_FacePosition.AinB || pos == verb_topo_FacePosition.BinA;
};
verb_topo_Boolean.planeFromFace = function(f) {
	return { o : f.l.e.v.pt, n : f.normal()};
};
verb_topo_Boolean.reclassifyCoplanarEdge = function(e,p,isA) {
	var n = e.l.f.normal();
	var ndc = verb_core_Vec.dot(n,p.n);
	var eps2 = 1.0000000000000001e-20;
	if(Math.abs(ndc - 1.0) < eps2) if(isA) return verb_topo_FacePosition.AonBp; else return verb_topo_FacePosition.BonAp;
	if(Math.abs(ndc + 1.0) < eps2) if(isA) return verb_topo_FacePosition.AonBm; else return verb_topo_FacePosition.BonAm;
	return verb_topo_FacePosition.On;
};
verb_topo_Boolean.asFacePosition = function(pos,isA) {
	if(pos == verb_topo_PlanePosition.Above) if(isA) return verb_topo_FacePosition.AoutB; else return verb_topo_FacePosition.BoutA; else if(pos == verb_topo_PlanePosition.Below) if(isA) return verb_topo_FacePosition.AinB; else return verb_topo_FacePosition.BinA;
	return verb_topo_FacePosition.On;
};
verb_topo_Boolean.reclassifyOnSector = function(c,op) {
	return verb_topo_Boolean.boolOnSectorMap[op[1]][c[1]];
};
verb_topo_Boolean.intersect = function(a,b,tol) {
	var va = verb_topo_Boolean.splitAllEdges(a,b,tol);
	var vva = verb_topo_Boolean.splitEdgesByVertices(a,b,tol);
	var vvb = verb_topo_Boolean.splitEdgesByVertices(b,a,tol);
	var vfa = verb_topo_Boolean.splitEdgesWithFaces(a,b,tol);
	var vfb = verb_topo_Boolean.splitEdgesWithFaces(b,a,tol);
	return { coincidentVertices : verb_topo_Boolean.getCoincidentVertices(a,b,va.concat(vva).concat(vvb),tol), coplanarVerticesOfA : verb_topo_Boolean.getCoplanarVertices(a,b,vfa,tol), coplanarVerticesOfB : verb_topo_Boolean.getCoplanarVertices(b,a,vfb,tol)};
};
verb_topo_Boolean.splitAllEdges = function(a,b,tol) {
	var c = [];
	var _g = 0;
	var _g1 = a.edges();
	while(_g < _g1.length) {
		var e0 = _g1[_g];
		++_g;
		var _g2 = 0;
		var _g3 = b.edges();
		while(_g2 < _g3.length) {
			var e1 = _g3[_g2];
			++_g2;
			var a1 = verb_topo_Boolean.splitEdges(e0.item0,e1.item0,tol);
			if(a1 == null) continue;
			c.push(a1);
		}
	}
	return c;
};
verb_topo_Boolean.splitEdges = function(a,b,tol) {
	var i = verb_core_Intersect.segments(a.v.pt,a.nxt.v.pt,b.v.pt,b.nxt.v.pt,tol);
	if(i == null) return null;
	if(i.u0 > 0.9999999999 || i.u0 < 1e-10 || i.u1 > 0.9999999999 || i.u1 < 1e-10) return null;
	return new verb_core_types_Pair(verb_topo_Boolean.splitEdge(a,i.point0),verb_topo_Boolean.splitEdge(b,i.point1));
};
verb_topo_Boolean.splitEdgeByVertex = function(e,v,tol) {
	var i = verb_core_Trig.segmentClosestPoint(v.pt,e.v.pt,e.nxt.v.pt,0.0,1.0);
	var d = verb_core_Vec.distSquared(v.pt,i.pt);
	if(d > tol * tol) return null;
	if(i.u > 0.9999999999 || i.u < 1e-10) return null;
	return verb_topo_Boolean.splitEdge(e,i.pt);
};
verb_topo_Boolean.splitEdge = function(e,pt) {
	var s = e.l.f.s;
	return s.lmev(e,e.opp.nxt,pt);
};
verb_topo_Boolean.isPointInFace = function(pt,f,tol) {
	var n = f.normal();
	var o = f.l.e.v.pt;
	if(!verb_core_Trig.isPointInPlane(pt,{ n : n, o : o},tol)) return false;
	var iol = verb_topo_Boolean.isPointInPolygon(pt,f.ol.points(),n);
	if(!iol) return iol;
	var _g = 0;
	var _g1 = f.rings();
	while(_g < _g1.length) {
		var il = _g1[_g];
		++_g;
		if(verb_topo_Boolean.isPointInPolygon(pt,il.points(),n)) return false;
	}
	return true;
};
verb_topo_Boolean.isPointInPolygon = function(pt,pts,n) {
	var ptsl = pts.length;
	var a = 0.0;
	var _g = 0;
	while(_g < ptsl) {
		var i = _g++;
		var v0 = verb_core_Vec.sub(pts[i],pt);
		var v1 = verb_core_Vec.sub(pts[(i + 1) % ptsl],pt);
		a += verb_core_Vec.positiveAngleBetween(v0,v1,n);
	}
	return Math.abs(a) > Math.PI;
};
verb_topo_Boolean.splitEdgesByVertices = function(a,b,tol) {
	var c = [];
	var _g = 0;
	var _g1 = a.edges();
	while(_g < _g1.length) {
		var e = _g1[_g];
		++_g;
		var $it0 = $iterator(verb_core_types_DoublyLinkedListExtensions.iter(b.v))();
		while( $it0.hasNext() ) {
			var v = $it0.next();
			var a1 = verb_topo_Boolean.splitEdgeByVertex(e.item0,v,tol);
			if(a1 == null) continue;
			c.push(new verb_core_types_Pair(a1,v));
		}
	}
	return c;
};
verb_topo_Boolean.getCoincidentVertices = function(a,b,v,tol) {
	var m_h = { };
	var _g = 0;
	while(_g < v.length) {
		var p = v[_g];
		++_g;
		m_h[p.item0.id] = p.item0;
		m_h[p.item1.id] = p.item1;
	}
	var tol2 = tol * tol;
	var $it0 = $iterator(verb_core_types_DoublyLinkedListExtensions.iter(a.v))();
	while( $it0.hasNext() ) {
		var v0 = $it0.next();
		if(m_h.hasOwnProperty(v0.id)) continue;
		var $it1 = $iterator(verb_core_types_DoublyLinkedListExtensions.iter(b.v))();
		while( $it1.hasNext() ) {
			var v1 = $it1.next();
			if(m_h.hasOwnProperty(v1.id)) continue;
			if(verb_core_Vec.distSquared(v0.pt,v1.pt) < tol2) v.push(new verb_core_types_Pair(v0,v1));
		}
	}
	return v;
};
verb_topo_Boolean.splitEdgesWithFaces = function(a,b,tol) {
	var v = [];
	var _g = 0;
	var _g1 = a.edges();
	while(_g < _g1.length) {
		var e = _g1[_g];
		++_g;
		var $it0 = $iterator(verb_core_types_DoublyLinkedListExtensions.iter(b.f))();
		while( $it0.hasNext() ) {
			var f = $it0.next();
			var r = verb_topo_Boolean.splitEdgeWithFace(e.item0,f,tol);
			if(r == null) continue;
			v.push(new verb_core_types_Pair(r,f));
		}
	}
	return v;
};
verb_topo_Boolean.splitEdgeWithFace = function(he,f,tol) {
	var n = f.normal();
	var o = f.ol.e.v.pt;
	var r = verb_core_Intersect.segmentAndPlane(he.v.pt,he.nxt.v.pt,o,n);
	if(r == null) return null;
	if(r.p > 0.9999999999 || r.p < 1e-10) return null;
	var pt = verb_core_Vec.lerp(r.p,he.nxt.v.pt,he.v.pt);
	if(!verb_topo_Boolean.isPointInFace(pt,f,tol)) return null;
	return verb_topo_Boolean.splitEdge(he,pt);
};
verb_topo_Boolean.getCoplanarVertices = function(a,b,ar,tol) {
	var m_h = { };
	var _g = 0;
	while(_g < ar.length) {
		var p = ar[_g];
		++_g;
		m_h[p.item0.id] = p.item0;
	}
	var $it0 = $iterator(verb_core_types_DoublyLinkedListExtensions.iter(a.v))();
	while( $it0.hasNext() ) {
		var v = $it0.next();
		if(m_h.hasOwnProperty(v.id)) continue;
		var $it1 = $iterator(verb_core_types_DoublyLinkedListExtensions.iter(b.f))();
		while( $it1.hasNext() ) {
			var f = $it1.next();
			if(verb_topo_Boolean.isPointInFace(v.pt,f,tol)) ar.push(new verb_core_types_Pair(v,f));
		}
	}
	return ar;
};
var verb_topo_Topo = function() {
	this.id = verb_topo_Topo.counter++;
};
verb_topo_Topo.__name__ = ["verb","topo","Topo"];
var verb_topo_Face = $hx_exports.topo.Face = function(solid) {
	verb_topo_Topo.call(this);
	this.s = solid;
};
verb_topo_Face.__name__ = ["verb","topo","Face"];
verb_topo_Face.__interfaces__ = [verb_core_types_IDoublyLinkedList];
verb_topo_Face.__super__ = verb_topo_Topo;
verb_topo_Face.prototype = $extend(verb_topo_Topo.prototype,{
	loops: function() {
		return Lambda.array(verb_core_types_DoublyLinkedListExtensions.iter(this.l));
	}
	,rings: function() {
		var a = [];
		var $it0 = $iterator(verb_core_types_DoublyLinkedListExtensions.iter(this.l))();
		while( $it0.hasNext() ) {
			var il = $it0.next();
			if(il == this.ol) continue;
			a.push(il);
		}
		return a;
	}
	,addLoop: function(nl) {
		if(nl == null) nl = new verb_topo_Loop(this);
		if(this.ol == null) this.ol = nl;
		return this.l = verb_core_types_DoublyLinkedListExtensions.push(this.l,nl);
	}
	,delLoop: function(kl) {
		if(kl == this.ol) throw new js__$Boot_HaxeError(new verb_core_types_Exception("Cannot delete outer loop!"));
		this.l = verb_core_types_DoublyLinkedListExtensions.kill(this.l,kl);
	}
	,neighbors: function() {
		var memo_h = { };
		memo_h[this.id] = this;
		var a = [];
		var he = this.halfEdges();
		var _g = 0;
		while(_g < he.length) {
			var e = he[_g];
			++_g;
			if(e.opp == null) continue;
			var f = e.opp.l.f;
			if(memo_h.hasOwnProperty(f.id)) continue;
			memo_h[f.id] = f;
			a.push(f);
		}
		return a;
	}
	,halfEdges: function() {
		return Lambda.fold(this.loops(),function(l,a) {
			return a.concat(l.halfEdges());
		},[]);
	}
	,tessellate: function() {
		var opts = new verb_topo_Tess2Options();
		opts.contours = this.loops().map(function(x) {
			return x.coords();
		}).filter(function(x1) {
			return x1.length > 3;
		});
		opts.windingRule = verb_topo_Tess2.WINDING_POSITIVE;
		opts.elementType = verb_topo_Tess2.POLYGONS;
		opts.polySize = 3;
		opts.normal = this.normal();
		opts.vertexSize = 3;
		return verb_topo_Tess2.tessellate(opts);
	}
	,normal: function() {
		var x = [0.0,0.0,0.0];
		var $it0 = $iterator(verb_core_types_DoublyLinkedListExtensions.iter(this.ol.e))();
		while( $it0.hasNext() ) {
			var ei = $it0.next();
			var v0 = ei.v.pt;
			var v1 = ei.nxt.v.pt;
			var v2 = ei.nxt.nxt.v.pt;
			var v01 = verb_core_Vec.sub(v0,v1);
			var v21 = verb_core_Vec.sub(v2,v1);
			var cv = verb_core_Vec.cross(v21,v01);
			if(verb_core_Vec.normSquared(cv) > 1e-10) x = verb_core_Vec.add(x,cv);
		}
		return verb_core_Vec.normalized(x);
	}
});
var verb_topo_HalfEdge = $hx_exports.topo.HalfEdge = function(loop,vertex) {
	verb_topo_Topo.call(this);
	this.v = vertex;
	this.v.e = this;
	this.l = loop;
};
verb_topo_HalfEdge.__name__ = ["verb","topo","HalfEdge"];
verb_topo_HalfEdge.__interfaces__ = [verb_core_types_IDoublyLinkedList];
verb_topo_HalfEdge.__super__ = verb_topo_Topo;
verb_topo_HalfEdge.prototype = $extend(verb_topo_Topo.prototype,{
	mate: function(he) {
		if(he == null) return this;
		this.opp = he;
		he.opp = this;
		return this;
	}
});
var verb_topo_Loop = $hx_exports.topo.Loop = function(face) {
	verb_topo_Topo.call(this);
	this.f = face;
};
verb_topo_Loop.__name__ = ["verb","topo","Loop"];
verb_topo_Loop.__interfaces__ = [verb_core_types_IDoublyLinkedList];
verb_topo_Loop.__super__ = verb_topo_Topo;
verb_topo_Loop.prototype = $extend(verb_topo_Topo.prototype,{
	halfEdges: function() {
		return Lambda.array(verb_core_types_DoublyLinkedListExtensions.iter(this.e));
	}
	,vertices: function() {
		return this.halfEdges().map(function(e) {
			return e.v;
		});
	}
	,coords: function() {
		return Lambda.fold(this.vertices(),function(v,a) {
			return a.concat(v.pt);
		},[]);
	}
	,points: function() {
		return this.vertices().map(function(v) {
			return v.pt;
		});
	}
	,addHalfEdge: function(vertex,next,opp) {
		if(next != null && next.l != this) throw new js__$Boot_HaxeError(new verb_core_types_Exception("Next HalfEdge is not part of same Loop!"));
		if(next != null && next.opp == null && opp == null) {
			vertex.e = next;
			next.v = vertex;
			return next;
		}
		if(next != null) this.e = next;
		var he = new verb_topo_HalfEdge(this,vertex);
		he.mate(opp);
		return this.e = verb_core_types_DoublyLinkedListExtensions.push(this.e,he);
	}
	,delHalfEdge: function(he) {
		if(he.l != this) throw new js__$Boot_HaxeError(new verb_core_types_Exception("HalfEdge is not part of this Loop!"));
		if(he.nxt == he) {
			he.opp = null;
			this.e = he;
			he.v.e = he;
			return this;
		}
		if(he.opp.nxt != null) he.v.e = he.opp.nxt;
		this.e = verb_core_types_DoublyLinkedListExtensions.kill(this.e,he);
		return this;
	}
});
var verb_topo_Make = $hx_exports.topo.Make = function() { };
verb_topo_Make.__name__ = ["verb","topo","Make"];
verb_topo_Make.lamina = function(profile) {
	var s = verb_topo_Solid.mvfs(profile[0]);
	var p0 = profile[0];
	var e = s.f.l.e;
	var ce = s.f.l.e;
	var _g = 0;
	while(_g < profile.length) {
		var pt = profile[_g];
		++_g;
		if(pt == p0) continue;
		var nv = s.lmev(ce,ce,pt);
		ce = nv.e;
	}
	s.lmef(e.nxt,ce);
	return s;
};
verb_topo_Make.extrusion = function(profile,dir) {
	if(profile.length < 3) throw new js__$Boot_HaxeError(new verb_core_types_Exception("More than three points are required to define a polygon!"));
	var s = verb_topo_Make.lamina(profile);
	var nvs = s.f.l.halfEdges().map(function(e) {
		return s.lmev(e,e,verb_core_Vec.add(e.v.pt,dir));
	});
	nvs.map(function(v) {
		return v.e;
	}).map(function(e1) {
		var nf = s.lmef(e1,e1.nxt.nxt.nxt);
		return nf;
	});
	return s;
};
var verb_topo_Solid = $hx_exports.topo.Solid = function() {
	verb_topo_Topo.call(this);
};
verb_topo_Solid.__name__ = ["verb","topo","Solid"];
verb_topo_Solid.mvfs = function(pt) {
	var s = new verb_topo_Solid();
	var f = s.addFace();
	var l = f.addLoop();
	var h = l.addHalfEdge(s.addVertex(pt));
	return s;
};
verb_topo_Solid.__super__ = verb_topo_Topo;
verb_topo_Solid.prototype = $extend(verb_topo_Topo.prototype,{
	lmev: function(he0,he1,pt) {
		var v = this.addVertex(pt);
		var ov = he0.v;
		var he = he0;
		while(he != he1) {
			he.v = v;
			he = he.opp.nxt;
		}
		var nhe0 = he1.l.addHalfEdge(v,he1);
		var nhe1 = he0.l.addHalfEdge(ov,he0 == he1?nhe0:he0,nhe0);
		return v;
	}
	,lmef: function(he0,he1) {
		if(he0.l != he1.l) throw new js__$Boot_HaxeError(new verb_core_types_Exception("Both HalfEdge's must be part of the same loop!"));
		var nf = this.addFace();
		var nl = nf.addLoop();
		var ol = he1.l;
		var he = he0;
		while(he != he1) {
			he.l = nl;
			he = he.nxt;
		}
		he1.prv.nxt = he0;
		he0.prv.nxt = he1;
		var t = he1.prv;
		he1.prv = he0.prv;
		he0.prv = t;
		var nhe0 = nl.addHalfEdge(he1.v,he0);
		var nhe1 = ol.addHalfEdge(he0.v,he1,nhe0);
		return nf;
	}
	,lkemr: function(he0) {
		var he1 = he0.opp;
		var ol = he0.l;
		var nl = ol.f.addLoop();
		var hea = he0.nxt;
		var heb = he1.nxt;
		heb.v.e = heb;
		hea.v.e = hea;
		he0.prv.nxt = he1.nxt;
		he1.nxt.prv = he0.prv;
		ol.e = he1.nxt;
		he1.nxt = he0;
		he0.prv = he1;
		var che = he0;
		do {
			che.l = nl;
			che = che.nxt;
		} while(che != he0);
		nl.e = he1;
		nl.delHalfEdge(he0);
		nl.delHalfEdge(he1);
		return nl;
	}
	,lkvfs: function(he) {
		var v = he.v;
		this.delVertex(v);
		this.delFace(he.l.f);
		return this;
	}
	,lkev: function(he) {
		if(he.nxt == he) throw new js__$Boot_HaxeError(new verb_core_types_Exception("Cannot lkev the base case!"));
		var kv = he.nxt.v;
		var che = he.nxt;
		do che.v = he.v; while((che.opp.nxt = che) != he.nxt);
		var oe = he.opp;
		he.l.delHalfEdge(he);
		oe.l.delHalfEdge(oe);
		return this.delVertex(kv);
	}
	,lkef: function(he) {
		if(he.opp == null) throw new js__$Boot_HaxeError(new verb_core_types_Exception("Cannot kill base case!"));
		if(he.opp.l.f == he.l.f) throw new js__$Boot_HaxeError(new verb_core_types_Exception("Edge does not traverse two distinct faces!"));
		var kl = he.l;
		var kf = he.l.f;
		var oe = he.opp;
		var ol = oe.l;
		var of = oe.l.f;
		var che = he;
		do che.l = ol; while((che = che.nxt) != he);
		var ha = he.prv;
		var hb = he.nxt;
		var hc = oe.prv;
		var hd = oe.nxt;
		ha.nxt = hd;
		hd.prv = ha;
		hc.nxt = hb;
		hb.prv = hc;
		he.v.e = hd;
		oe.v.e = hb;
		if(ol.e == oe) ol.e = hc;
		var _g = 0;
		var _g1 = kf.rings();
		while(_g < _g1.length) {
			var l = _g1[_g];
			++_g;
			l.f = of;
			verb_core_types_DoublyLinkedListExtensions.push(of.l,l);
		}
		this.delFace(kf);
		return this;
	}
	,lmekr: function(he0,he1) {
		if(he0.l == he1.l) throw new js__$Boot_HaxeError(new verb_core_types_Exception("HalfEdges are not from different loops!"));
		if(he0.l.f != he1.l.f) throw new js__$Boot_HaxeError(new verb_core_types_Exception("HalfEdges must be part of the same face!"));
		var kl = he1.l;
		kl.f.delLoop(kl);
		var l0 = he0.l;
		var $it0 = $iterator(verb_core_types_DoublyLinkedListExtensions.iter(he1))();
		while( $it0.hasNext() ) {
			var he = $it0.next();
			he.l = l0;
		}
		var e0;
		if(he0.nxt == he0) e0 = he0; else e0 = new verb_topo_HalfEdge(l0,he0.v);
		var e1;
		if(he1.nxt == he1) e1 = he1; else e1 = new verb_topo_HalfEdge(l0,he1.v);
		e0.mate(e1);
		he0.prv.nxt = e0;
		he1.prv.nxt = e1;
		e0.prv = he0.prv;
		e1.prv = he1.prv;
		he1.prv = e0;
		he0.prv = e1;
		e0.nxt = he1;
		e1.nxt = he0;
		return e0;
	}
	,lkfmrh: function(kf,tf) {
		if(kf.rings().length > 0) throw new js__$Boot_HaxeError(new verb_core_types_Exception("Cannot insert a face with rings as a ring of another face!"));
		this.delFace(kf);
		kf.ol.f = tf;
		verb_core_types_DoublyLinkedListExtensions.push(tf.l,kf.ol);
		return kf.ol;
	}
	,lmfkrh: function(ol) {
		var of = ol.f;
		of.delLoop(ol);
		var nf = this.addFace();
		nf.addLoop(ol);
		ol.f = nf;
		return nf;
	}
	,addFace: function() {
		return this.f = verb_core_types_DoublyLinkedListExtensions.push(this.f,new verb_topo_Face(this));
	}
	,delFace: function(i) {
		if(i.s != this) throw new js__$Boot_HaxeError(new verb_core_types_Exception("Face is not part of this Solid!"));
		this.f = verb_core_types_DoublyLinkedListExtensions.kill(this.f,i);
		return this;
	}
	,addVertex: function(pt) {
		return this.v = verb_core_types_DoublyLinkedListExtensions.push(this.v,new verb_topo_Vertex(pt));
	}
	,delVertex: function(i) {
		if(i.e.l.f.s != this) throw new js__$Boot_HaxeError(new verb_core_types_Exception("Face is not part of this Solid!"));
		this.v = verb_core_types_DoublyLinkedListExtensions.kill(this.v,i);
		return this;
	}
	,vertices: function() {
		return Lambda.array(verb_core_types_DoublyLinkedListExtensions.iter(this.v));
	}
	,faces: function() {
		return Lambda.array(verb_core_types_DoublyLinkedListExtensions.iter(this.f));
	}
	,loops: function() {
		return Lambda.fold(this.faces(),function(f,acc) {
			return acc.concat(f.loops());
		},[]);
	}
	,halfEdges: function() {
		return Lambda.fold(this.loops(),function(l,acc) {
			return acc.concat(l.halfEdges());
		},[]);
	}
	,edges: function() {
		var m_h = { };
		var a = [];
		var _g = 0;
		var _g1 = this.halfEdges();
		while(_g < _g1.length) {
			var e = _g1[_g];
			++_g;
			if(e.opp == null || m_h.hasOwnProperty(e.id) || m_h.hasOwnProperty(e.opp.id)) continue;
			m_h[e.id] = e;
			m_h[e.opp.id] = e.opp;
			a.push(new verb_core_types_Pair(e,e.opp));
		}
		return a;
	}
	,print: function() {
		return "Solid (" + this.vertices().length + " Vertices, " + this.faces().length + " Faces, " + this.loops().length + " Loops, " + this.halfEdges().length + " HalfEdges" + ")";
	}
});
var verb_topo_PlanePosition = { __ename__ : true, __constructs__ : ["On","Above","Below"] };
verb_topo_PlanePosition.On = ["On",0];
verb_topo_PlanePosition.On.toString = $estr;
verb_topo_PlanePosition.On.__enum__ = verb_topo_PlanePosition;
verb_topo_PlanePosition.Above = ["Above",1];
verb_topo_PlanePosition.Above.toString = $estr;
verb_topo_PlanePosition.Above.__enum__ = verb_topo_PlanePosition;
verb_topo_PlanePosition.Below = ["Below",2];
verb_topo_PlanePosition.Below.toString = $estr;
verb_topo_PlanePosition.Below.__enum__ = verb_topo_PlanePosition;
var verb_topo_Split = $hx_exports.topo.Split = function() { };
verb_topo_Split.__name__ = ["verb","topo","Split"];
verb_topo_Split.solidByPlane = function(s,p) {
	var r = verb_topo_Split.intersect(s,p);
	var vs;
	var _g = [];
	var _g1 = 0;
	while(_g1 < r.length) {
		var ir = r[_g1];
		++_g1;
		_g.push(verb_topo_Split.isCrossingEdge(ir.item1)?verb_topo_Split.splitEdge(ir.item0,ir.item1).v:ir.item0.v);
	}
	vs = _g;
	var nulledges = [];
	var _g11 = 0;
	while(_g11 < vs.length) {
		var v = vs[_g11];
		++_g11;
		verb_topo_Split.insertNullEdges(v,verb_topo_Split.classifyVertex(v,p),nulledges);
	}
	if(nulledges.length == 0) return null;
	var afaces = [];
	verb_topo_Split.connect(nulledges,afaces);
	var a = new verb_topo_Solid();
	var b = new verb_topo_Solid();
	verb_topo_Split.close(afaces,a,b);
	return new verb_core_types_Pair(b,a);
};
verb_topo_Split.close = function(afaces,a,b) {
	var s = afaces[0].s;
	var bfaces;
	var _g = [];
	var _g1 = 0;
	while(_g1 < afaces.length) {
		var f = afaces[_g1];
		++_g1;
		_g.push(s.lmfkrh(f.l));
	}
	bfaces = _g;
	var _g11 = 0;
	while(_g11 < afaces.length) {
		var f1 = afaces[_g11];
		++_g11;
		verb_topo_Split.moveFace(f1,a);
	}
	var _g12 = 0;
	while(_g12 < bfaces.length) {
		var f2 = bfaces[_g12];
		++_g12;
		verb_topo_Split.moveFace(f2,b);
	}
	verb_topo_Split.cleanup(a,s);
	verb_topo_Split.cleanup(b,s);
};
verb_topo_Split.connect = function(nulledges,afaces) {
	verb_topo_Split.lexicographicalSort(nulledges);
	var h0;
	var h1;
	var looseends = [];
	var _g = 0;
	while(_g < nulledges.length) {
		var ne = nulledges[_g];
		++_g;
		if((h0 = verb_topo_Split.canJoin(ne,looseends)) != null) {
			verb_topo_Split.join(h0,ne);
			if(!verb_topo_Split.isLoose(h0.opp,looseends)) verb_topo_Split.cut(h0,afaces);
		}
		if((h1 = verb_topo_Split.canJoin(ne.opp,looseends)) != null) {
			verb_topo_Split.join(h1,ne.opp);
			if(!verb_topo_Split.isLoose(h1.opp,looseends)) verb_topo_Split.cut(h1,afaces);
		}
		if(h0 != null && h1 != null) verb_topo_Split.cut(ne,afaces);
	}
};
verb_topo_Split.insertNullEdges = function(v,ecs,nulledges) {
	var s = v.e.l.f.s;
	var i = verb_topo_Split.nextOfClass(verb_topo_PlanePosition.Above,ecs,0);
	if(i == -1) return;
	if(verb_topo_Split.nextOfClass(verb_topo_PlanePosition.Below,ecs,0) == -1) return;
	var start = ecs[i].edge;
	var head = start;
	var tail = start;
	var el = ecs.length;
	while(true) {
		while(ecs[i].pos == verb_topo_PlanePosition.Above) {
			tail = ecs[i].edge;
			i = (i + 1) % el;
		}
		s.lmev(head,tail.opp.nxt,head.v.pt.slice());
		nulledges.push(head.prv);
		i = verb_topo_Split.nextOfClass(verb_topo_PlanePosition.Above,ecs,i);
		if(i == -1) break;
		head = ecs[i].edge;
		if(head == start) break;
	}
};
verb_topo_Split.classifyVertex = function(v,p) {
	var ecs = [];
	var _g = 0;
	var _g1 = v.halfEdges();
	while(_g < _g1.length) {
		var e = _g1[_g];
		++_g;
		ecs.push({ edge : e, pos : verb_topo_Split.classify(e,p)});
		if(verb_topo_Split.wideSector(e)) ecs.push({ edge : e, pos : verb_topo_Split.classifyBisector(e,p)});
	}
	var el = ecs.length;
	var _g2 = 0;
	while(_g2 < el) {
		var i = _g2++;
		var ep = ecs[i];
		if(ep.pos == verb_topo_PlanePosition.On) {
			var nc = verb_topo_Split.reclassifyCoplanarSector(ep.edge,p);
			ecs[i].pos = nc;
			ecs[(i + 1) % el].pos = nc;
		}
	}
	var _g3 = 0;
	while(_g3 < el) {
		var i1 = _g3++;
		var ep1 = ecs[i1];
		if(ep1.pos == verb_topo_PlanePosition.On) {
			var a;
			if(i1 == 0) a = el - 1; else a = i1 - 1;
			var b = (i1 + 1) % el;
			var prv = ecs[a].pos;
			var nxt = ecs[b].pos;
			if(prv == verb_topo_PlanePosition.Above && nxt == verb_topo_PlanePosition.Above) ep1.pos = verb_topo_PlanePosition.Below; else if(prv == verb_topo_PlanePosition.Below && nxt == verb_topo_PlanePosition.Above) ep1.pos = verb_topo_PlanePosition.Below; else if(prv == verb_topo_PlanePosition.Above && nxt == verb_topo_PlanePosition.Below) ep1.pos = verb_topo_PlanePosition.Below; else if(prv == verb_topo_PlanePosition.Below && nxt == verb_topo_PlanePosition.Below) ep1.pos = verb_topo_PlanePosition.Above; else throw new js__$Boot_HaxeError(new verb_core_types_Exception("Double On edge encountered!"));
		}
	}
	return ecs;
};
verb_topo_Split.moveFace = function(f,s) {
	if(f.s == s) return;
	f.s.f = verb_core_types_DoublyLinkedListExtensions.kill(f.s.f,f);
	s.f = verb_core_types_DoublyLinkedListExtensions.push(s.f,f);
	f.s = s;
	var _g = 0;
	var _g1 = f.neighbors();
	while(_g < _g1.length) {
		var nf = _g1[_g];
		++_g;
		verb_topo_Split.moveFace(nf,s);
	}
};
verb_topo_Split.cleanup = function(s,ks) {
	var memo_h = { };
	var $it0 = $iterator(verb_core_types_DoublyLinkedListExtensions.iter(s.f))();
	while( $it0.hasNext() ) {
		var f = $it0.next();
		var $it1 = $iterator(verb_core_types_DoublyLinkedListExtensions.iter(f.l))();
		while( $it1.hasNext() ) {
			var l = $it1.next();
			var _g = 0;
			var _g1 = l.vertices();
			while(_g < _g1.length) {
				var v = _g1[_g];
				++_g;
				if(!memo_h.hasOwnProperty(v.id)) {
					memo_h[v.id] = v;
					ks.v = verb_core_types_DoublyLinkedListExtensions.kill(ks.v,v);
					s.v = verb_core_types_DoublyLinkedListExtensions.push(s.v,v);
				}
			}
		}
	}
};
verb_topo_Split.canJoin = function(e,looseends) {
	var _g1 = 0;
	var _g = looseends.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(verb_topo_Split.neighbor(e,looseends[i])) {
			var r = looseends[i];
			looseends.splice(i,1);
			return r;
		}
	}
	looseends.push(e);
	return null;
};
verb_topo_Split.neighbor = function(e0,e1) {
	return e0.l.f == e1.l.f;
};
verb_topo_Split.isLoose = function(e,le) {
	return HxOverrides.indexOf(le,e,0) != -1;
};
verb_topo_Split.join = function(e0,e1) {
	var of = e0.l.f;
	var nf = null;
	var s = e0.l.f.s;
	if(e0.l == e1.l) {
		if(e0.prv.prv != e1) nf = s.lmef(e0,e1.nxt);
	} else s.lmekr(e0,e1.nxt);
	if(e0.nxt.nxt != e1) {
		s.lmef(e1,e0.nxt);
		if(nf != null && of.l.nxt != of.l) haxe_Log.trace("PANIC!",{ fileName : "Split.hx", lineNumber : 285, className : "verb.topo.Split", methodName : "join"});
	}
};
verb_topo_Split.cut = function(e,faces) {
	if(e.l == e.opp.l) {
		faces.push(e.l.f);
		e.l.f.s.lkemr(e);
	} else e.l.f.s.lkef(e);
};
verb_topo_Split.lexicographicalSort = function(es) {
	es.sort(function(a,b) {
		var ap = a.v.pt;
		var bp = b.v.pt;
		if(ap[0] < bp[0]) return -1; else if(ap[0] > bp[0]) return 1; else if(ap[1] < bp[1]) return -1; else if(ap[1] > bp[1]) return 1; else if(ap[2] < bp[2]) return -1; else if(ap[2] > bp[2]) return 1;
		return 0;
	});
};
verb_topo_Split.nextOfClass = function(cl,ecs,start) {
	var i = start;
	var head = null;
	while(i < ecs.length) {
		if(ecs[i].pos == cl) {
			head = ecs[i];
			break;
		}
		i++;
	}
	if(head != null) return i; else return -1;
};
verb_topo_Split.wideSector = function(e) {
	var n = e.l.f.normal();
	var a = verb_core_Vec.normalized(verb_core_Vec.sub(e.nxt.v.pt,e.v.pt));
	var b = verb_core_Vec.normalized(verb_core_Vec.sub(e.prv.v.pt,e.v.pt));
	return verb_core_Vec.signedAngleBetween(a,b,n) > Math.PI;
};
verb_topo_Split.classifyBisector = function(e,p) {
	return verb_topo_Split.classifyPoint(verb_core_Vec.mul(0.5,verb_core_Vec.add(e.nxt.v.pt,e.prv.v.pt)),p);
};
verb_topo_Split.reclassifyCoplanarSector = function(e,p) {
	var n = e.l.f.normal();
	var n1 = e.opp.l.f.normal();
	var ndc = verb_core_Vec.dot(n,p.n);
	var ndc1 = verb_core_Vec.dot(n1,p.n);
	var eps2 = 1.0000000000000001e-20;
	if(Math.abs(ndc - 1.0) < eps2 || Math.abs(ndc1 - 1.0) < eps2) return verb_topo_PlanePosition.Below;
	if(Math.abs(ndc + 1.0) < eps2 || Math.abs(ndc1 + 1.0) < eps2) return verb_topo_PlanePosition.Above;
	return verb_topo_PlanePosition.On;
};
verb_topo_Split.classify = function(e,p) {
	return verb_topo_Split.classifyPoint(e.nxt.v.pt,p);
};
verb_topo_Split.classifyPoint = function(pt,p) {
	var s = verb_core_Vec.dot(verb_core_Vec.sub(pt,p.o),p.n);
	if(Math.abs(s) < 1e-10) return verb_topo_PlanePosition.On;
	if(s > 0.0) return verb_topo_PlanePosition.Above; else return verb_topo_PlanePosition.Below;
};
verb_topo_Split.intersect = function(s,p) {
	var $is = [];
	var _g = 0;
	var _g1 = s.edges();
	while(_g < _g1.length) {
		var e = _g1[_g];
		++_g;
		var he = e.item0;
		var r = verb_core_Intersect.segmentAndPlane(he.v.pt,he.nxt.v.pt,p.o,p.n);
		if(r == null) continue;
		if(r.p > 0.9999999999) {
			r.p = 0.0;
			he = he.nxt;
		}
		$is.push(new verb_core_types_Pair(he,r.p));
	}
	return $is;
};
verb_topo_Split.splitEdge = function(e,p) {
	var s = e.l.f.s;
	var pt0 = verb_topo_Split.pointOnHalfEdge(e,p);
	var pt1 = pt0.slice();
	var nv = s.lmev(e,e.opp.nxt,pt1);
	return nv.e;
};
verb_topo_Split.isCrossingEdge = function(p) {
	return p < 0.9999999999 && p > 1e-10;
};
verb_topo_Split.pointOnHalfEdge = function(e,p) {
	return verb_core_Vec.lerp(p,e.nxt.v.pt,e.v.pt);
};
verb_topo_Split.intersectionPoints = function(s,p) {
	var _g = [];
	var _g1 = 0;
	var _g2 = verb_topo_Split.intersect(s,p);
	while(_g1 < _g2.length) {
		var i = _g2[_g1];
		++_g1;
		_g.push(verb_topo_Split.pointOnHalfEdge(i.item0,i.item1));
	}
	return _g;
};
var verb_topo_Tess2Options = $hx_exports.topo.Tess2Options = function() {
	this.contours = [];
	this.debug = false;
	this.normal = [0.0,0.0,1.0];
	this.vertexSize = 2;
	this.polySize = 3;
	this.elementType = verb_topo_Tess2.POLYGONS;
	this.windingRule = verb_topo_Tess2.WINDING_ODD;
};
verb_topo_Tess2Options.__name__ = ["verb","topo","Tess2Options"];
var verb_topo_Tess2Result = $hx_exports.topo.Tess2Result = function(vertices,vertexIndices,vertexCount,elements,elementCount,mesh) {
	this.vertices = vertices;
	this.vertexIndices = vertexIndices;
	this.vertexCount = vertexCount;
	this.elements = elements;
	this.elementCount = elementCount;
	this.mesh = mesh;
};
verb_topo_Tess2Result.__name__ = ["verb","topo","Tess2Result"];
var verb_topo_Tess2 = $hx_exports.topo.Tess2 = function() { };
verb_topo_Tess2.__name__ = ["verb","topo","Tess2"];
verb_topo_Tess2.tessellate = function(opts) {
	var tess = new verb_topo_Tessellator();
	var _g1 = 0;
	var _g = opts.contours.length;
	while(_g1 < _g) {
		var i = _g1++;
		tess.addContour(opts.vertexSize,opts.contours[i]);
	}
	tess.tessellate(opts.windingRule,opts.elementType,opts.polySize,opts.vertexSize,opts.normal);
	return new verb_topo_Tess2Result(tess.vertices,tess.vertexIndices,tess.vertexCount,tess.elements,tess.elementCount,opts.debug?tess.mesh:null);
};
verb_topo_Tess2.assert = function(cond) {
	if(!cond) throw new js__$Boot_HaxeError("Assertion Failed!");
};
var verb_topo_TESSvertex = function() {
	this.next = null;
	this.prev = null;
	this.anEdge = null;
	this.coords = [0,0,0];
	this.s = 0.0;
	this.t = 0.0;
	this.pqHandle = 0;
	this.n = 0;
	this.idx = 0;
};
verb_topo_TESSvertex.__name__ = ["verb","topo","TESSvertex"];
var verb_topo_TESSface = function() {
	this.next = null;
	this.prev = null;
	this.anEdge = null;
	this.n = 0;
	this.marked = false;
	this.inside = false;
};
verb_topo_TESSface.__name__ = ["verb","topo","TESSface"];
var verb_topo_TESShalfEdge = function(side) {
	this.next = null;
	this.Sym = null;
	this.Onext = null;
	this.Lnext = null;
	this.Org = null;
	this.Lface = null;
	this.activeRegion = null;
	this.winding = 0;
	this.side = side;
};
verb_topo_TESShalfEdge.__name__ = ["verb","topo","TESShalfEdge"];
verb_topo_TESShalfEdge.prototype = {
	getRface: function() {
		return this.Sym.Lface;
	}
	,setRface: function(v) {
		this.Sym.Lface = v;
	}
	,getDst: function() {
		return this.Sym.Org;
	}
	,setDst: function(v) {
		this.Sym.Org = v;
	}
	,getOprev: function() {
		return this.Sym.Lnext;
	}
	,setOprev: function(v) {
		this.Sym.Lnext = v;
	}
	,getLprev: function() {
		return this.Onext.Sym;
	}
	,setLprev: function(v) {
		this.Onext.Sym = v;
	}
	,getDprev: function() {
		return this.Lnext.Sym;
	}
	,setDprev: function(v) {
		this.Lnext.Sym = v;
	}
	,getRprev: function() {
		return this.Sym.Onext;
	}
	,setRprev: function(v) {
		this.Sym.Onext = v;
	}
	,getDnext: function() {
		return this.Sym.Onext.Sym;
	}
	,setDnext: function(v) {
		this.Sym.Onext.Sym = v;
	}
	,getRnext: function() {
		return this.Sym.Lnext.Sym;
	}
	,setRnext: function(v) {
		this.Sym.Lnext.Sym = v;
	}
};
var verb_topo_TESSmesh = function() {
	var v = new verb_topo_TESSvertex();
	var f = new verb_topo_TESSface();
	var e = new verb_topo_TESShalfEdge(0);
	var eSym = new verb_topo_TESShalfEdge(1);
	v.next = v.prev = v;
	v.anEdge = null;
	f.next = f.prev = f;
	f.anEdge = null;
	f.marked = false;
	f.inside = false;
	e.next = e;
	e.Sym = eSym;
	e.Onext = null;
	e.Lnext = null;
	e.Org = null;
	e.Lface = null;
	e.winding = 0;
	e.activeRegion = null;
	eSym.next = eSym;
	eSym.Sym = e;
	eSym.Onext = null;
	eSym.Lnext = null;
	eSym.Org = null;
	eSym.Lface = null;
	eSym.winding = 0;
	eSym.activeRegion = null;
	this.vHead = v;
	this.fHead = f;
	this.eHead = e;
	this.eHeadSym = eSym;
};
verb_topo_TESSmesh.__name__ = ["verb","topo","TESSmesh"];
verb_topo_TESSmesh.prototype = {
	makeEdge_: function(eNext) {
		var e = new verb_topo_TESShalfEdge(0);
		var eSym = new verb_topo_TESShalfEdge(1);
		if(eNext.Sym.side < eNext.side) eNext = eNext.Sym;
		var ePrev = eNext.Sym.next;
		eSym.next = ePrev;
		ePrev.Sym.next = e;
		e.next = eNext;
		eNext.Sym.next = eSym;
		e.Sym = eSym;
		e.Onext = e;
		e.Lnext = eSym;
		e.Org = null;
		e.Lface = null;
		e.winding = 0;
		e.activeRegion = null;
		eSym.Sym = e;
		eSym.Onext = eSym;
		eSym.Lnext = e;
		eSym.Org = null;
		eSym.Lface = null;
		eSym.winding = 0;
		eSym.activeRegion = null;
		return e;
	}
	,splice_: function(a,b) {
		var aOnext = a.Onext;
		var bOnext = b.Onext;
		aOnext.Sym.Lnext = b;
		bOnext.Sym.Lnext = a;
		a.Onext = bOnext;
		b.Onext = aOnext;
	}
	,makeVertex_: function(newVertex,eOrig,vNext) {
		var vNew = newVertex;
		verb_topo_Tess2.assert(vNew != null);
		var vPrev = vNext.prev;
		vNew.prev = vPrev;
		vPrev.next = vNew;
		vNew.next = vNext;
		vNext.prev = vNew;
		vNew.anEdge = eOrig;
		var e = eOrig;
		do {
			e.Org = vNew;
			e = e.Onext;
		} while(e != eOrig);
	}
	,makeFace_: function(newFace,eOrig,fNext) {
		var fNew = newFace;
		verb_topo_Tess2.assert(fNew != null);
		var fPrev = fNext.prev;
		fNew.prev = fPrev;
		fPrev.next = fNew;
		fNew.next = fNext;
		fNext.prev = fNew;
		fNew.anEdge = eOrig;
		fNew.marked = false;
		fNew.inside = fNext.inside;
		var e = eOrig;
		do {
			e.Lface = fNew;
			e = e.Lnext;
		} while(e != eOrig);
	}
	,killEdge_: function(eDel) {
		if(eDel.Sym.side < eDel.side) eDel = eDel.Sym;
		var eNext = eDel.next;
		var ePrev = eDel.Sym.next;
		eNext.Sym.next = ePrev;
		ePrev.Sym.next = eNext;
	}
	,killVertex_: function(vDel,newOrg) {
		var eStart = vDel.anEdge;
		var e = eStart;
		do {
			e.Org = newOrg;
			e = e.Onext;
		} while(e != eStart);
		var vPrev = vDel.prev;
		var vNext = vDel.next;
		vNext.prev = vPrev;
		vPrev.next = vNext;
	}
	,killFace_: function(fDel,newLface) {
		var eStart = fDel.anEdge;
		var e = eStart;
		do {
			e.Lface = newLface;
			e = e.Lnext;
		} while(e != eStart);
		var fPrev = fDel.prev;
		var fNext = fDel.next;
		fNext.prev = fPrev;
		fPrev.next = fNext;
	}
	,makeEdge: function() {
		var newVertex1 = new verb_topo_TESSvertex();
		var newVertex2 = new verb_topo_TESSvertex();
		var newFace = new verb_topo_TESSface();
		var e = this.makeEdge_(this.eHead);
		this.makeVertex_(newVertex1,e,this.vHead);
		this.makeVertex_(newVertex2,e.Sym,this.vHead);
		this.makeFace_(newFace,e,this.fHead);
		return e;
	}
	,splice: function(eOrg,eDst) {
		var joiningLoops = false;
		var joiningVertices = false;
		if(eOrg == eDst) return;
		if(eDst.Org != eOrg.Org) {
			joiningVertices = true;
			this.killVertex_(eDst.Org,eOrg.Org);
		}
		if(eDst.Lface != eOrg.Lface) {
			joiningLoops = true;
			this.killFace_(eDst.Lface,eOrg.Lface);
		}
		this.splice_(eDst,eOrg);
		if(!joiningVertices) {
			var newVertex = new verb_topo_TESSvertex();
			this.makeVertex_(newVertex,eDst,eOrg.Org);
			eOrg.Org.anEdge = eOrg;
		}
		if(!joiningLoops) {
			var newFace = new verb_topo_TESSface();
			this.makeFace_(newFace,eDst,eOrg.Lface);
			eOrg.Lface.anEdge = eOrg;
		}
	}
	,'delete': function(eDel) {
		var eDelSym = eDel.Sym;
		var joiningLoops = false;
		if(eDel.Lface != eDel.getRface()) {
			joiningLoops = true;
			this.killFace_(eDel.Lface,eDel.getRface());
		}
		if(eDel.Onext == eDel) this.killVertex_(eDel.Org,null); else {
			eDel.getRface().anEdge = eDel.getOprev();
			eDel.Org.anEdge = eDel.Onext;
			this.splice_(eDel,eDel.getOprev());
			if(!joiningLoops) {
				var newFace = new verb_topo_TESSface();
				this.makeFace_(newFace,eDel,eDel.Lface);
			}
		}
		if(eDelSym.Onext == eDelSym) {
			this.killVertex_(eDelSym.Org,null);
			this.killFace_(eDelSym.Lface,null);
		} else {
			eDel.Lface.anEdge = eDelSym.getOprev();
			eDelSym.Org.anEdge = eDelSym.Onext;
			this.splice_(eDelSym,eDelSym.getOprev());
		}
		this.killEdge_(eDel);
	}
	,addEdgeVertex: function(eOrg) {
		var eNew = this.makeEdge_(eOrg);
		var eNewSym = eNew.Sym;
		this.splice_(eNew,eOrg.Lnext);
		eNew.Org = eOrg.getDst();
		var newVertex = new verb_topo_TESSvertex();
		this.makeVertex_(newVertex,eNewSym,eNew.Org);
		eNew.Lface = eNewSym.Lface = eOrg.Lface;
		return eNew;
	}
	,splitEdge: function(eOrg) {
		var tempHalfEdge = this.addEdgeVertex(eOrg);
		var eNew = tempHalfEdge.Sym;
		this.splice_(eOrg.Sym,eOrg.Sym.getOprev());
		this.splice_(eOrg.Sym,eNew);
		eOrg.setDst(eNew.Org);
		eNew.getDst().anEdge = eNew.Sym;
		eNew.setRface(eOrg.getRface());
		eNew.winding = eOrg.winding;
		eNew.Sym.winding = eOrg.Sym.winding;
		return eNew;
	}
	,connect: function(eOrg,eDst) {
		var joiningLoops = false;
		var eNew = this.makeEdge_(eOrg);
		var eNewSym = eNew.Sym;
		if(eDst.Lface != eOrg.Lface) {
			joiningLoops = true;
			this.killFace_(eDst.Lface,eOrg.Lface);
		}
		this.splice_(eNew,eOrg.Lnext);
		this.splice_(eNewSym,eDst);
		eNew.Org = eOrg.getDst();
		eNewSym.Org = eDst.Org;
		eNew.Lface = eNewSym.Lface = eOrg.Lface;
		eOrg.Lface.anEdge = eNewSym;
		if(!joiningLoops) {
			var newFace = new verb_topo_TESSface();
			this.makeFace_(newFace,eNew,eOrg.Lface);
		}
		return eNew;
	}
	,zapFace: function(fZap) {
		var eStart = fZap.anEdge;
		var e;
		var eNext;
		var eSym;
		var fPrev;
		var fNext;
		eNext = eStart.Lnext;
		do {
			e = eNext;
			eNext = e.Lnext;
			e.Lface = null;
			if(e.getRface() == null) {
				if(e.Onext == e) this.killVertex_(e.Org,null); else {
					e.Org.anEdge = e.Onext;
					this.splice_(e,e.getOprev());
				}
				eSym = e.Sym;
				if(eSym.Onext == eSym) this.killVertex_(eSym.Org,null); else {
					eSym.Org.anEdge = eSym.Onext;
					this.splice_(eSym,eSym.getOprev());
				}
				this.killEdge_(e);
			}
		} while(e != eStart);
		fPrev = fZap.prev;
		fNext = fZap.next;
		fNext.prev = fPrev;
		fPrev.next = fNext;
	}
	,countFaceVerts_: function(f) {
		var eCur = f.anEdge;
		var n = 0;
		do {
			n++;
			eCur = eCur.Lnext;
		} while(eCur != f.anEdge);
		return n;
	}
	,mergeConvexFaces: function(maxVertsPerFace) {
		var eCur;
		var eNext;
		var eSym;
		var vStart;
		var curNv;
		var symNv;
		var f = this.fHead.next;
		while(f != this.fHead) {
			if(!f.inside) {
				f = f.next;
				continue;
			}
			eCur = f.anEdge;
			vStart = eCur.Org;
			while(true) {
				eNext = eCur.Lnext;
				eSym = eCur.Sym;
				if(eSym != null && eSym.Lface != null && eSym.Lface.inside) {
					curNv = this.countFaceVerts_(f);
					symNv = this.countFaceVerts_(eSym.Lface);
					if(curNv + symNv - 2 <= maxVertsPerFace) {
						if(verb_topo_Geom.vertCCW(eCur.getLprev().Org,eCur.Org,eSym.Lnext.Lnext.Org) && verb_topo_Geom.vertCCW(eSym.getLprev().Org,eSym.Org,eCur.Lnext.Lnext.Org)) {
							eNext = eSym.Lnext;
							this["delete"](eSym);
							eCur = null;
							eSym = null;
						}
					}
				}
				if(eCur != null && eCur.Lnext.Org == vStart) break;
				eCur = eNext;
			}
			f = f.next;
		}
		return true;
	}
	,check: function() {
		var fHead = this.fHead;
		var vHead = this.vHead;
		var eHead = this.eHead;
		var f;
		var v;
		var vPrev;
		var e;
		var ePrev;
		var fPrev = fHead;
		while((f = fPrev.next) != fHead) {
			verb_topo_Tess2.assert(f.prev == fPrev);
			e = f.anEdge;
			do {
				verb_topo_Tess2.assert(e.Sym != e);
				verb_topo_Tess2.assert(e.Sym.Sym == e);
				verb_topo_Tess2.assert(e.Lnext.Onext.Sym == e);
				verb_topo_Tess2.assert(e.Onext.Sym.Lnext == e);
				verb_topo_Tess2.assert(e.Lface == f);
				e = e.Lnext;
			} while(e != f.anEdge);
			fPrev = f;
		}
		verb_topo_Tess2.assert(f.prev == fPrev && f.anEdge == null);
		vPrev = vHead;
		while((v = vPrev.next) != vHead) {
			verb_topo_Tess2.assert(v.prev == vPrev);
			e = v.anEdge;
			do {
				verb_topo_Tess2.assert(e.Sym != e);
				verb_topo_Tess2.assert(e.Sym.Sym == e);
				verb_topo_Tess2.assert(e.Lnext.Onext.Sym == e);
				verb_topo_Tess2.assert(e.Onext.Sym.Lnext == e);
				verb_topo_Tess2.assert(e.Org == v);
				e = e.Onext;
			} while(e != v.anEdge);
			vPrev = v;
		}
		verb_topo_Tess2.assert(v.prev == vPrev && v.anEdge == null);
		ePrev = eHead;
		while((e = ePrev.next) != eHead) {
			verb_topo_Tess2.assert(e.Sym.next == ePrev.Sym);
			verb_topo_Tess2.assert(e.Sym != e);
			verb_topo_Tess2.assert(e.Sym.Sym == e);
			verb_topo_Tess2.assert(e.Org != null);
			verb_topo_Tess2.assert(e.getDst() != null);
			verb_topo_Tess2.assert(e.Lnext.Onext.Sym == e);
			verb_topo_Tess2.assert(e.Onext.Sym.Lnext == e);
			ePrev = e;
		}
		verb_topo_Tess2.assert(e.Sym.next == ePrev.Sym && e.Sym == this.eHeadSym && e.Sym.Sym == e && e.Org == null && e.getDst() == null && e.Lface == null && e.getRface() == null);
	}
};
var verb_topo_Geom = function() { };
verb_topo_Geom.__name__ = ["verb","topo","Geom"];
verb_topo_Geom.vertEq = function(u,v) {
	return u.s == v.s && u.t == v.t;
};
verb_topo_Geom.vertLeq = function(u,v) {
	return u.s < v.s || u.s == v.s && u.t <= v.t;
};
verb_topo_Geom.transLeq = function(u,v) {
	return u.t < v.t || u.t == v.t && u.s <= v.s;
};
verb_topo_Geom.edgeGoesLeft = function(e) {
	return verb_topo_Geom.vertLeq(e.getDst(),e.Org);
};
verb_topo_Geom.edgeGoesRight = function(e) {
	return verb_topo_Geom.vertLeq(e.Org,e.getDst());
};
verb_topo_Geom.vertL1dist = function(u,v) {
	return Math.abs(u.s - v.s) + Math.abs(u.t - v.t);
};
verb_topo_Geom.edgeEval = function(u,v,w) {
	verb_topo_Tess2.assert(verb_topo_Geom.vertLeq(u,v) && verb_topo_Geom.vertLeq(v,w));
	var gapL = v.s - u.s;
	var gapR = w.s - v.s;
	if(gapL + gapR > 0.0) {
		if(gapL < gapR) return v.t - u.t + (u.t - w.t) * (gapL / (gapL + gapR)); else return v.t - w.t + (w.t - u.t) * (gapR / (gapL + gapR));
	}
	return 0.0;
};
verb_topo_Geom.edgeSign = function(u,v,w) {
	verb_topo_Tess2.assert(verb_topo_Geom.vertLeq(u,v) && verb_topo_Geom.vertLeq(v,w));
	var gapL = v.s - u.s;
	var gapR = w.s - v.s;
	if(gapL + gapR > 0.0) return (v.t - w.t) * gapL + (v.t - u.t) * gapR;
	return 0.0;
};
verb_topo_Geom.transEval = function(u,v,w) {
	verb_topo_Tess2.assert(verb_topo_Geom.transLeq(u,v) && verb_topo_Geom.transLeq(v,w));
	var gapL = v.t - u.t;
	var gapR = w.t - v.t;
	if(gapL + gapR > 0.0) {
		if(gapL < gapR) return v.s - u.s + (u.s - w.s) * (gapL / (gapL + gapR)); else return v.s - w.s + (w.s - u.s) * (gapR / (gapL + gapR));
	}
	return 0.0;
};
verb_topo_Geom.transSign = function(u,v,w) {
	verb_topo_Tess2.assert(verb_topo_Geom.transLeq(u,v) && verb_topo_Geom.transLeq(v,w));
	var gapL = v.t - u.t;
	var gapR = w.t - v.t;
	if(gapL + gapR > 0.0) return (v.s - w.s) * gapL + (v.s - u.s) * gapR;
	return 0.0;
};
verb_topo_Geom.vertCCW = function(u,v,w) {
	return u.s * (v.t - w.t) + v.s * (w.t - u.t) + w.s * (u.t - v.t) >= 0.0;
};
verb_topo_Geom.interpolate = function(a,x,b,y) {
	var a1;
	if(a < 0) a1 = 0; else a1 = a;
	var b1;
	if(b < 0) b1 = 0; else b1 = b;
	if(a1 <= b1) {
		if(b1 == 0) return (x + y) / 2; else return x + (y - x) * (a1 / (a1 + b1));
	} else return y + (x - y) * (b1 / (a1 + b1));
};
verb_topo_Geom.intersect = function(o1,d1,o2,d2,v) {
	var z1;
	var z2;
	var t;
	if(!verb_topo_Geom.vertLeq(o1,d1)) {
		t = o1;
		o1 = d1;
		d1 = t;
	}
	if(!verb_topo_Geom.vertLeq(o2,d2)) {
		t = o2;
		o2 = d2;
		d2 = t;
	}
	if(!verb_topo_Geom.vertLeq(o1,o2)) {
		t = o1;
		o1 = o2;
		o2 = t;
		t = d1;
		d1 = d2;
		d2 = t;
	}
	if(!verb_topo_Geom.vertLeq(o2,d1)) v.s = (o2.s + d1.s) / 2; else if(verb_topo_Geom.vertLeq(d1,d2)) {
		z1 = verb_topo_Geom.edgeEval(o1,o2,d1);
		z2 = verb_topo_Geom.edgeEval(o2,d1,d2);
		if(z1 + z2 < 0) {
			z1 = -z1;
			z2 = -z2;
		}
		v.s = verb_topo_Geom.interpolate(z1,o2.s,z2,d1.s);
	} else {
		z1 = verb_topo_Geom.edgeSign(o1,o2,d1);
		z2 = -verb_topo_Geom.edgeSign(o1,d2,d1);
		if(z1 + z2 < 0) {
			z1 = -z1;
			z2 = -z2;
		}
		v.s = verb_topo_Geom.interpolate(z1,o2.s,z2,d2.s);
	}
	if(!verb_topo_Geom.transLeq(o1,d1)) {
		t = o1;
		o1 = d1;
		d1 = t;
	}
	if(!verb_topo_Geom.transLeq(o2,d2)) {
		t = o2;
		o2 = d2;
		d2 = t;
	}
	if(!verb_topo_Geom.transLeq(o1,o2)) {
		t = o1;
		o1 = o2;
		o2 = t;
		t = d1;
		d1 = d2;
		d2 = t;
	}
	if(!verb_topo_Geom.transLeq(o2,d1)) v.t = (o2.t + d1.t) / 2; else if(verb_topo_Geom.transLeq(d1,d2)) {
		z1 = verb_topo_Geom.transEval(o1,o2,d1);
		z2 = verb_topo_Geom.transEval(o2,d1,d2);
		if(z1 + z2 < 0) {
			z1 = -z1;
			z2 = -z2;
		}
		v.t = verb_topo_Geom.interpolate(z1,o2.t,z2,d1.t);
	} else {
		z1 = verb_topo_Geom.transSign(o1,o2,d1);
		z2 = -verb_topo_Geom.transSign(o1,d2,d1);
		if(z1 + z2 < 0) {
			z1 = -z1;
			z2 = -z2;
		}
		v.t = verb_topo_Geom.interpolate(z1,o2.t,z2,d2.t);
	}
};
var verb_topo_DictNode = function() {
	this.key = null;
	this.next = null;
	this.prev = null;
};
verb_topo_DictNode.__name__ = ["verb","topo","DictNode"];
var verb_topo_Dict = function(frame,leq) {
	this.head = new verb_topo_DictNode();
	this.head.next = this.head;
	this.head.prev = this.head;
	this.frame = frame;
	this.leq = leq;
};
verb_topo_Dict.__name__ = ["verb","topo","Dict"];
verb_topo_Dict.prototype = {
	min: function() {
		return this.head.next;
	}
	,max: function() {
		return this.head.prev;
	}
	,insert: function(k) {
		return this.insertBefore(this.head,k);
	}
	,search: function(key) {
		var node = this.head;
		do node = node.next; while(node.key != null && !this.leq(this.frame,key,node.key));
		return node;
	}
	,insertBefore: function(node,key) {
		do node = node.prev; while(node.key != null && !this.leq(this.frame,node.key,key));
		var newNode = new verb_topo_DictNode();
		newNode.key = key;
		newNode.next = node.next;
		node.next.prev = newNode;
		newNode.prev = node;
		node.next = newNode;
		return newNode;
	}
	,'delete': function(node) {
		node.next.prev = node.prev;
		node.prev.next = node.next;
	}
};
var verb_topo_PQnode = function() {
	this.handle = null;
};
verb_topo_PQnode.__name__ = ["verb","topo","PQnode"];
var verb_topo_PQhandleElem = function() {
	this.key = null;
	this.node = null;
};
verb_topo_PQhandleElem.__name__ = ["verb","topo","PQhandleElem"];
var verb_topo_PriorityQ = function(size,leq) {
	this.size = 0;
	this.max = size;
	this.nodes = [];
	verb_core_ArrayExtensions.alloc(this.nodes,size + 1);
	var _g1 = 0;
	var _g = this.nodes.length;
	while(_g1 < _g) {
		var i = _g1++;
		this.nodes[i] = new verb_topo_PQnode();
	}
	this.handles = [];
	verb_core_ArrayExtensions.alloc(this.handles,size + 1);
	var _g11 = 0;
	var _g2 = this.handles.length;
	while(_g11 < _g2) {
		var i1 = _g11++;
		this.handles[i1] = new verb_topo_PQhandleElem();
	}
	this.initialized = false;
	this.freeList = 0;
	this.leq = leq;
	this.nodes[1].handle = 1;
	this.handles[1].key = null;
};
verb_topo_PriorityQ.__name__ = ["verb","topo","PriorityQ"];
verb_topo_PriorityQ.prototype = {
	floatDown_: function(curr) {
		var n = this.nodes;
		var h = this.handles;
		var hCurr;
		var hChild;
		var child;
		hCurr = n[curr].handle;
		while(true) {
			child = curr << 1;
			if(child < this.size && this.leq(h[n[child + 1].handle].key,h[n[child].handle].key)) ++child;
			verb_topo_Tess2.assert(child <= this.max);
			hChild = n[child].handle;
			if(child > this.size || this.leq(h[hCurr].key,h[hChild].key)) {
				n[curr].handle = hCurr;
				h[hCurr].node = curr;
				break;
			}
			n[curr].handle = hChild;
			h[hChild].node = curr;
			curr = child;
		}
	}
	,floatUp_: function(curr) {
		var n = this.nodes;
		var h = this.handles;
		var hCurr;
		var hParent;
		var parent;
		hCurr = n[curr].handle;
		while(true) {
			parent = curr >> 1;
			hParent = n[parent].handle;
			if(parent == 0 || this.leq(h[hParent].key,h[hCurr].key)) {
				n[curr].handle = hCurr;
				h[hCurr].node = curr;
				break;
			}
			n[curr].handle = hParent;
			h[hParent].node = curr;
			curr = parent;
		}
	}
	,init: function() {
		var i = this.size;
		while(i >= 1) {
			this.floatDown_(i);
			--i;
		}
		this.initialized = true;
	}
	,min: function() {
		return this.handles[this.nodes[1].handle].key;
	}
	,isEmpty: function() {
		this.size == 0;
	}
	,insert: function(keyNew) {
		var curr;
		var free;
		curr = ++this.size;
		if(curr * 2 > this.max) {
			this.max *= 2;
			var s;
			s = this.nodes.length;
			verb_core_ArrayExtensions.alloc(this.nodes,this.max + 1);
			var _g1 = s;
			var _g = this.nodes.length;
			while(_g1 < _g) {
				var i = _g1++;
				this.nodes[i] = new verb_topo_PQnode();
			}
			s = this.handles.length;
			verb_core_ArrayExtensions.alloc(this.handles,this.max + 1);
			var _g11 = s;
			var _g2 = this.handles.length;
			while(_g11 < _g2) {
				var i1 = _g11++;
				this.handles[i1] = new verb_topo_PQhandleElem();
			}
		}
		if(this.freeList == 0) free = curr; else {
			free = this.freeList;
			this.freeList = this.handles[free].node;
		}
		this.nodes[curr].handle = free;
		this.handles[free].node = curr;
		this.handles[free].key = keyNew;
		if(this.initialized) this.floatUp_(curr);
		return free;
	}
	,extractMin: function() {
		var n = this.nodes;
		var h = this.handles;
		var hMin = n[1].handle;
		var min = h[hMin].key;
		if(this.size > 0) {
			n[1].handle = n[this.size].handle;
			h[n[1].handle].node = 1;
			h[hMin].key = null;
			h[hMin].node = this.freeList;
			this.freeList = hMin;
			--this.size;
			if(this.size > 0) this.floatDown_(1);
		}
		return min;
	}
	,'delete': function(hCurr) {
		var n = this.nodes;
		var h = this.handles;
		var curr;
		verb_topo_Tess2.assert(hCurr >= 1 && hCurr <= this.max && h[hCurr].key != null);
		curr = h[hCurr].node;
		n[curr].handle = n[this.size].handle;
		h[n[curr].handle].node = curr;
		--this.size;
		if(curr <= this.size) {
			if(curr <= 1 || this.leq(h[n[curr >> 1].handle].key,h[n[curr].handle].key)) this.floatDown_(curr); else this.floatUp_(curr);
		}
		h[hCurr].key = null;
		h[hCurr].node = this.freeList;
		this.freeList = hCurr;
	}
};
var verb_topo_ActiveRegion = function() {
	this.eUp = null;
	this.nodeUp = null;
	this.windingNumber = 0;
	this.inside = false;
	this.sentinel = false;
	this.dirty = false;
	this.fixUpperEdge = false;
};
verb_topo_ActiveRegion.__name__ = ["verb","topo","ActiveRegion"];
var verb_topo_Sweep = function() { };
verb_topo_Sweep.__name__ = ["verb","topo","Sweep"];
verb_topo_Sweep.regionBelow = function(r) {
	return r.nodeUp.prev.key;
};
verb_topo_Sweep.regionAbove = function(r) {
	return r.nodeUp.next.key;
};
verb_topo_Sweep.debugEvent = function(tess) {
};
verb_topo_Sweep.addWinding = function(eDst,eSrc) {
	eDst.winding += eSrc.winding;
	eDst.Sym.winding += eSrc.Sym.winding;
};
verb_topo_Sweep.edgeLeq = function(tess,reg1,reg2) {
	var ev = tess.event;
	var t1;
	var t2;
	var e1 = reg1.eUp;
	var e2 = reg2.eUp;
	if(e1.getDst() == ev) {
		if(e2.getDst() == ev) {
			if(verb_topo_Geom.vertLeq(e1.Org,e2.Org)) return verb_topo_Geom.edgeSign(e2.getDst(),e1.Org,e2.Org) <= 0;
			return verb_topo_Geom.edgeSign(e1.getDst(),e2.Org,e1.Org) >= 0;
		}
		return verb_topo_Geom.edgeSign(e2.getDst(),ev,e2.Org) <= 0;
	}
	if(e2.getDst() == ev) return verb_topo_Geom.edgeSign(e1.getDst(),ev,e1.Org) >= 0;
	var t11 = verb_topo_Geom.edgeEval(e1.getDst(),ev,e1.Org);
	var t21 = verb_topo_Geom.edgeEval(e2.getDst(),ev,e2.Org);
	return t11 >= t21;
};
verb_topo_Sweep.deleteRegion = function(tess,reg) {
	if(reg.fixUpperEdge) verb_topo_Tess2.assert(reg.eUp.winding == 0);
	reg.eUp.activeRegion = null;
	tess.dict["delete"](reg.nodeUp);
};
verb_topo_Sweep.fixUpperEdge = function(tess,reg,newEdge) {
	verb_topo_Tess2.assert(reg.fixUpperEdge);
	tess.mesh["delete"](reg.eUp);
	reg.fixUpperEdge = false;
	reg.eUp = newEdge;
	newEdge.activeRegion = reg;
};
verb_topo_Sweep.topLeftRegion = function(tess,reg) {
	var org = reg.eUp.Org;
	var e;
	do reg = verb_topo_Sweep.regionAbove(reg); while(reg.eUp.Org == org);
	if(reg.fixUpperEdge) {
		e = tess.mesh.connect(verb_topo_Sweep.regionBelow(reg).eUp.Sym,reg.eUp.Lnext);
		if(e == null) return null;
		verb_topo_Sweep.fixUpperEdge(tess,reg,e);
		reg = verb_topo_Sweep.regionAbove(reg);
	}
	return reg;
};
verb_topo_Sweep.topRightRegion = function(reg) {
	var dst = reg.eUp.getDst();
	var reg1 = null;
	do reg1 = verb_topo_Sweep.regionAbove(reg1); while(reg1.eUp.getDst() == dst);
	return reg1;
};
verb_topo_Sweep.addRegionBelow = function(tess,regAbove,eNewUp) {
	var regNew = new verb_topo_ActiveRegion();
	regNew.eUp = eNewUp;
	regNew.nodeUp = tess.dict.insertBefore(regAbove.nodeUp,regNew);
	regNew.fixUpperEdge = false;
	regNew.sentinel = false;
	regNew.dirty = false;
	eNewUp.activeRegion = regNew;
	return regNew;
};
verb_topo_Sweep.isWindingInside = function(tess,n) {
	var _g = tess.windingRule;
	switch(_g) {
	case 0:
		return (n & 1) != 0;
	case 1:
		return n != 0;
	case 2:
		return n > 0;
	case 3:
		return n < 0;
	case 4:
		return n >= 2 || n <= -2;
	}
	verb_topo_Tess2.assert(false);
	return false;
};
verb_topo_Sweep.computeWinding = function(tess,reg) {
	reg.windingNumber = verb_topo_Sweep.regionAbove(reg).windingNumber + reg.eUp.winding;
	reg.inside = verb_topo_Sweep.isWindingInside(tess,reg.windingNumber);
};
verb_topo_Sweep.finishRegion = function(tess,reg) {
	var e = reg.eUp;
	var f = e.Lface;
	f.inside = reg.inside;
	f.anEdge = e;
	verb_topo_Sweep.deleteRegion(tess,reg);
};
verb_topo_Sweep.finishLeftRegions = function(tess,regFirst,regLast) {
	var e;
	var ePrev;
	var reg = null;
	var regPrev = regFirst;
	var ePrev1 = regFirst.eUp;
	while(regPrev != regLast) {
		regPrev.fixUpperEdge = false;
		reg = verb_topo_Sweep.regionBelow(regPrev);
		e = reg.eUp;
		if(e.Org != ePrev1.Org) {
			if(!reg.fixUpperEdge) {
				verb_topo_Sweep.finishRegion(tess,regPrev);
				break;
			}
			e = tess.mesh.connect(ePrev1.getLprev(),e.Sym);
			verb_topo_Sweep.fixUpperEdge(tess,reg,e);
		}
		if(ePrev1.Onext != e) {
			tess.mesh.splice(e.getOprev(),e);
			tess.mesh.splice(ePrev1,e);
		}
		verb_topo_Sweep.finishRegion(tess,regPrev);
		ePrev1 = reg.eUp;
		regPrev = reg;
	}
	return ePrev1;
};
verb_topo_Sweep.addRightEdges = function(tess,regUp,eFirst,eLast,eTopLeft,cleanUp) {
	var reg = null;
	var regPrev;
	var e;
	var ePrev;
	var firstTime = true;
	e = eFirst;
	do {
		verb_topo_Tess2.assert(verb_topo_Geom.vertLeq(e.Org,e.getDst()));
		verb_topo_Sweep.addRegionBelow(tess,regUp,e.Sym);
		e = e.Onext;
	} while(e != eLast);
	if(eTopLeft == null) eTopLeft = verb_topo_Sweep.regionBelow(regUp).eUp.getRprev();
	regPrev = regUp;
	ePrev = eTopLeft;
	while(true) {
		reg = verb_topo_Sweep.regionBelow(regPrev);
		e = reg.eUp.Sym;
		if(e.Org != ePrev.Org) break;
		if(e.Onext != ePrev) {
			tess.mesh.splice(e.getOprev(),e);
			tess.mesh.splice(ePrev.getOprev(),e);
		}
		reg.windingNumber = regPrev.windingNumber - e.winding;
		reg.inside = verb_topo_Sweep.isWindingInside(tess,reg.windingNumber);
		regPrev.dirty = true;
		if(!firstTime && verb_topo_Sweep.checkForRightSplice(tess,regPrev)) {
			verb_topo_Sweep.addWinding(e,ePrev);
			verb_topo_Sweep.deleteRegion(tess,regPrev);
			tess.mesh["delete"](ePrev);
		}
		firstTime = false;
		regPrev = reg;
		ePrev = e;
	}
	regPrev.dirty = true;
	verb_topo_Tess2.assert(regPrev.windingNumber - e.winding == reg.windingNumber);
	if(cleanUp) verb_topo_Sweep.walkDirtyRegions(tess,regPrev);
};
verb_topo_Sweep.spliceMergeVertices = function(tess,e1,e2) {
	tess.mesh.splice(e1,e2);
};
verb_topo_Sweep.vertexWeights = function(isect,org,dst) {
	var t1 = verb_topo_Geom.vertL1dist(org,isect);
	var t2 = verb_topo_Geom.vertL1dist(dst,isect);
	var w0 = 0.5 * t2 / (t1 + t2);
	var w1 = 0.5 * t1 / (t1 + t2);
	isect.coords[0] += w0 * org.coords[0] + w1 * dst.coords[0];
	isect.coords[1] += w0 * org.coords[1] + w1 * dst.coords[1];
	isect.coords[2] += w0 * org.coords[2] + w1 * dst.coords[2];
};
verb_topo_Sweep.getIntersectData = function(tess,isect,orgUp,dstUp,orgLo,dstLo) {
	isect.coords[0] = isect.coords[1] = isect.coords[2] = 0;
	isect.idx = -1;
	verb_topo_Sweep.vertexWeights(isect,orgUp,dstUp);
	verb_topo_Sweep.vertexWeights(isect,orgLo,dstLo);
};
verb_topo_Sweep.checkForRightSplice = function(tess,regUp) {
	var regLo = verb_topo_Sweep.regionBelow(regUp);
	var eUp = regUp.eUp;
	var eLo = regLo.eUp;
	if(verb_topo_Geom.vertLeq(eUp.Org,eLo.Org)) {
		if(verb_topo_Geom.edgeSign(eLo.getDst(),eUp.Org,eLo.Org) > 0) return false;
		if(!verb_topo_Geom.vertEq(eUp.Org,eLo.Org)) {
			tess.mesh.splitEdge(eLo.Sym);
			tess.mesh.splice(eUp,eLo.getOprev());
			regUp.dirty = regLo.dirty = true;
		} else if(eUp.Org != eLo.Org) {
			tess.pq["delete"](eUp.Org.pqHandle);
			verb_topo_Sweep.spliceMergeVertices(tess,eLo.getOprev(),eUp);
		}
	} else {
		if(verb_topo_Geom.edgeSign(eUp.getDst(),eLo.Org,eUp.Org) < 0) return false;
		verb_topo_Sweep.regionAbove(regUp).dirty = regUp.dirty = true;
		tess.mesh.splitEdge(eUp.Sym);
		tess.mesh.splice(eLo.getOprev(),eUp);
	}
	return true;
};
verb_topo_Sweep.checkForLeftSplice = function(tess,regUp) {
	var regLo = verb_topo_Sweep.regionBelow(regUp);
	var eUp = regUp.eUp;
	var eLo = regLo.eUp;
	var e;
	verb_topo_Tess2.assert(!verb_topo_Geom.vertEq(eUp.getDst(),eLo.getDst()));
	if(verb_topo_Geom.vertLeq(eUp.getDst(),eLo.getDst())) {
		if(verb_topo_Geom.edgeSign(eUp.getDst(),eLo.getDst(),eUp.Org) < 0) return false;
		verb_topo_Sweep.regionAbove(regUp).dirty = regUp.dirty = true;
		e = tess.mesh.splitEdge(eUp);
		tess.mesh.splice(eLo.Sym,e);
		e.Lface.inside = regUp.inside;
	} else {
		if(verb_topo_Geom.edgeSign(eLo.getDst(),eUp.getDst(),eLo.Org) > 0) return false;
		regUp.dirty = regLo.dirty = true;
		e = tess.mesh.splitEdge(eLo);
		tess.mesh.splice(eUp.Lnext,eLo.Sym);
		e.getRface().inside = regUp.inside;
	}
	return true;
};
verb_topo_Sweep.checkForIntersect = function(tess,regUp) {
	var regLo = verb_topo_Sweep.regionBelow(regUp);
	var eUp = regUp.eUp;
	var eLo = regLo.eUp;
	var orgUp = eUp.Org;
	var orgLo = eLo.Org;
	var dstUp = eUp.getDst();
	var dstLo = eLo.getDst();
	var tMinUp;
	var tMaxLo;
	var isect = new verb_topo_TESSvertex();
	var orgMin;
	var e;
	verb_topo_Tess2.assert(!verb_topo_Geom.vertEq(dstLo,dstUp));
	verb_topo_Tess2.assert(verb_topo_Geom.edgeSign(dstUp,tess.event,orgUp) <= 0);
	verb_topo_Tess2.assert(verb_topo_Geom.edgeSign(dstLo,tess.event,orgLo) >= 0);
	verb_topo_Tess2.assert(orgUp != tess.event && orgLo != tess.event);
	verb_topo_Tess2.assert(!regUp.fixUpperEdge && !regLo.fixUpperEdge);
	if(orgUp == orgLo) return false;
	tMinUp = Math.min(orgUp.t,dstUp.t);
	tMaxLo = Math.max(orgLo.t,dstLo.t);
	if(tMinUp > tMaxLo) return false;
	if(verb_topo_Geom.vertLeq(orgUp,orgLo)) {
		if(verb_topo_Geom.edgeSign(dstLo,orgUp,orgLo) > 0) return false;
	} else if(verb_topo_Geom.edgeSign(dstUp,orgLo,orgUp) < 0) return false;
	verb_topo_Sweep.debugEvent(tess);
	verb_topo_Geom.intersect(dstUp,orgUp,dstLo,orgLo,isect);
	verb_topo_Tess2.assert(Math.min(orgUp.t,dstUp.t) <= isect.t);
	verb_topo_Tess2.assert(isect.t <= Math.max(orgLo.t,dstLo.t));
	verb_topo_Tess2.assert(Math.min(dstLo.s,dstUp.s) <= isect.s);
	verb_topo_Tess2.assert(isect.s <= Math.max(orgLo.s,orgUp.s));
	if(verb_topo_Geom.vertLeq(isect,tess.event)) {
		isect.s = tess.event.s;
		isect.t = tess.event.t;
	}
	if(verb_topo_Geom.vertLeq(orgUp,orgLo)) orgMin = orgUp; else orgMin = orgLo;
	if(verb_topo_Geom.vertLeq(orgMin,isect)) {
		isect.s = orgMin.s;
		isect.t = orgMin.t;
	}
	if(verb_topo_Geom.vertEq(isect,orgUp) || verb_topo_Geom.vertEq(isect,orgLo)) {
		verb_topo_Sweep.checkForRightSplice(tess,regUp);
		return false;
	}
	if(!verb_topo_Geom.vertEq(dstUp,tess.event) && verb_topo_Geom.edgeSign(dstUp,tess.event,isect) >= 0 || !verb_topo_Geom.vertEq(dstLo,tess.event) && verb_topo_Geom.edgeSign(dstLo,tess.event,isect) <= 0) {
		if(dstLo == tess.event) {
			tess.mesh.splitEdge(eUp.Sym);
			tess.mesh.splice(eLo.Sym,eUp);
			regUp = verb_topo_Sweep.topLeftRegion(tess,regUp);
			eUp = verb_topo_Sweep.regionBelow(regUp).eUp;
			verb_topo_Sweep.finishLeftRegions(tess,verb_topo_Sweep.regionBelow(regUp),regLo);
			verb_topo_Sweep.addRightEdges(tess,regUp,eUp.getOprev(),eUp,eUp,true);
			return true;
		}
		if(dstUp == tess.event) {
			tess.mesh.splitEdge(eLo.Sym);
			tess.mesh.splice(eUp.Lnext,eLo.getOprev());
			regLo = regUp;
			regUp = verb_topo_Sweep.topRightRegion(regUp);
			e = verb_topo_Sweep.regionBelow(regUp).eUp.getRprev();
			regLo.eUp = eLo.getOprev();
			eLo = verb_topo_Sweep.finishLeftRegions(tess,regLo,null);
			verb_topo_Sweep.addRightEdges(tess,regUp,eLo.Onext,eUp.getRprev(),e,true);
			return true;
		}
		if(verb_topo_Geom.edgeSign(dstUp,tess.event,isect) >= 0) {
			verb_topo_Sweep.regionAbove(regUp).dirty = regUp.dirty = true;
			tess.mesh.splitEdge(eUp.Sym);
			eUp.Org.s = tess.event.s;
			eUp.Org.t = tess.event.t;
		}
		if(verb_topo_Geom.edgeSign(dstLo,tess.event,isect) <= 0) {
			regUp.dirty = regLo.dirty = true;
			tess.mesh.splitEdge(eLo.Sym);
			eLo.Org.s = tess.event.s;
			eLo.Org.t = tess.event.t;
		}
		return false;
	}
	tess.mesh.splitEdge(eUp.Sym);
	tess.mesh.splitEdge(eLo.Sym);
	tess.mesh.splice(eLo.getOprev(),eUp);
	eUp.Org.s = isect.s;
	eUp.Org.t = isect.t;
	eUp.Org.pqHandle = tess.pq.insert(eUp.Org);
	verb_topo_Sweep.getIntersectData(tess,eUp.Org,orgUp,dstUp,orgLo,dstLo);
	verb_topo_Sweep.regionAbove(regUp).dirty = regUp.dirty = regLo.dirty = true;
	return false;
};
verb_topo_Sweep.walkDirtyRegions = function(tess,regUp) {
	var regLo = verb_topo_Sweep.regionBelow(regUp);
	var eUp;
	var eLo;
	while(true) {
		while(regLo.dirty) {
			regUp = regLo;
			regLo = verb_topo_Sweep.regionBelow(regLo);
		}
		if(!regUp.dirty) {
			regLo = regUp;
			regUp = verb_topo_Sweep.regionAbove(regUp);
			if(regUp == null || !regUp.dirty) return;
		}
		regUp.dirty = false;
		eUp = regUp.eUp;
		eLo = regLo.eUp;
		if(eUp.getDst() != eLo.getDst()) {
			if(verb_topo_Sweep.checkForLeftSplice(tess,regUp)) {
				if(regLo.fixUpperEdge) {
					verb_topo_Sweep.deleteRegion(tess,regLo);
					tess.mesh["delete"](eLo);
					regLo = verb_topo_Sweep.regionBelow(regUp);
					eLo = regLo.eUp;
				} else if(regUp.fixUpperEdge) {
					verb_topo_Sweep.deleteRegion(tess,regUp);
					tess.mesh["delete"](eUp);
					regUp = verb_topo_Sweep.regionAbove(regLo);
					eUp = regUp.eUp;
				}
			}
		}
		if(eUp.Org != eLo.Org) {
			if(eUp.getDst() != eLo.getDst() && !regUp.fixUpperEdge && !regLo.fixUpperEdge && (eUp.getDst() == tess.event || eLo.getDst() == tess.event)) {
				if(verb_topo_Sweep.checkForIntersect(tess,regUp)) return;
			} else verb_topo_Sweep.checkForRightSplice(tess,regUp);
		}
		if(eUp.Org == eLo.Org && eUp.getDst() == eLo.getDst()) {
			verb_topo_Sweep.addWinding(eLo,eUp);
			verb_topo_Sweep.deleteRegion(tess,regUp);
			tess.mesh["delete"](eUp);
			regUp = verb_topo_Sweep.regionAbove(regLo);
		}
	}
};
verb_topo_Sweep.connectRightVertex = function(tess,regUp,eBottomLeft) {
	var eNew;
	var eTopLeft = eBottomLeft.Onext;
	var regLo = verb_topo_Sweep.regionBelow(regUp);
	var eUp = regUp.eUp;
	var eLo = regLo.eUp;
	var degenerate = false;
	if(eUp.getDst() != eLo.getDst()) verb_topo_Sweep.checkForIntersect(tess,regUp);
	if(verb_topo_Geom.vertEq(eUp.Org,tess.event)) {
		tess.mesh.splice(eTopLeft.getOprev(),eUp);
		regUp = verb_topo_Sweep.topLeftRegion(tess,regUp);
		eTopLeft = verb_topo_Sweep.regionBelow(regUp).eUp;
		verb_topo_Sweep.finishLeftRegions(tess,verb_topo_Sweep.regionBelow(regUp),regLo);
		degenerate = true;
	}
	if(verb_topo_Geom.vertEq(eLo.Org,tess.event)) {
		tess.mesh.splice(eBottomLeft,eLo.getOprev());
		eBottomLeft = verb_topo_Sweep.finishLeftRegions(tess,regLo,null);
		degenerate = true;
	}
	if(degenerate) {
		verb_topo_Sweep.addRightEdges(tess,regUp,eBottomLeft.Onext,eTopLeft,eTopLeft,true);
		return;
	}
	if(verb_topo_Geom.vertLeq(eLo.Org,eUp.Org)) eNew = eLo.getOprev(); else eNew = eUp;
	eNew = tess.mesh.connect(eBottomLeft.getLprev(),eNew);
	verb_topo_Sweep.addRightEdges(tess,regUp,eNew,eNew.Onext,eNew.Onext,false);
	eNew.Sym.activeRegion.fixUpperEdge = true;
	verb_topo_Sweep.walkDirtyRegions(tess,regUp);
};
verb_topo_Sweep.connectLeftDegenerate = function(tess,regUp,vEvent) {
	var e;
	var eTopLeft;
	var eTopRight;
	var eLast;
	var reg;
	e = regUp.eUp;
	if(verb_topo_Geom.vertEq(e.Org,vEvent)) {
		verb_topo_Tess2.assert(false);
		verb_topo_Sweep.spliceMergeVertices(tess,e,vEvent.anEdge);
		return;
	}
	if(!verb_topo_Geom.vertEq(e.getDst(),vEvent)) {
		tess.mesh.splitEdge(e.Sym);
		if(regUp.fixUpperEdge) {
			tess.mesh["delete"](e.Onext);
			regUp.fixUpperEdge = false;
		}
		tess.mesh.splice(vEvent.anEdge,e);
		verb_topo_Sweep.sweepEvent(tess,vEvent);
		return;
	}
	verb_topo_Tess2.assert(false);
	regUp = verb_topo_Sweep.topRightRegion(regUp);
	reg = verb_topo_Sweep.regionBelow(regUp);
	eTopRight = reg.eUp.Sym;
	eTopLeft = eLast = eTopRight.Onext;
	if(reg.fixUpperEdge) {
		verb_topo_Tess2.assert(eTopLeft != eTopRight);
		verb_topo_Sweep.deleteRegion(tess,reg);
		tess.mesh["delete"](eTopRight);
		eTopRight = eTopLeft.getOprev();
	}
	tess.mesh.splice(vEvent.anEdge,eTopRight);
	if(!verb_topo_Geom.edgeGoesLeft(eTopLeft)) eTopLeft = null;
	verb_topo_Sweep.addRightEdges(tess,regUp,eTopRight.Onext,eLast,eTopLeft,true);
};
verb_topo_Sweep.connectLeftVertex = function(tess,vEvent) {
	var regUp;
	var regLo;
	var reg;
	var eUp;
	var eLo;
	var eNew;
	var tmp = new verb_topo_ActiveRegion();
	tmp.eUp = vEvent.anEdge.Sym;
	regUp = tess.dict.search(tmp).key;
	regLo = verb_topo_Sweep.regionBelow(regUp);
	if(regLo == null) return;
	eUp = regUp.eUp;
	eLo = regLo.eUp;
	if(verb_topo_Geom.edgeSign(eUp.getDst(),vEvent,eUp.Org) == 0.0) {
		verb_topo_Sweep.connectLeftDegenerate(tess,regUp,vEvent);
		return;
	}
	if(verb_topo_Geom.vertLeq(eLo.getDst(),eUp.getDst())) reg = regUp; else reg = regLo;
	if(regUp.inside || reg.fixUpperEdge) {
		if(reg == regUp) eNew = tess.mesh.connect(vEvent.anEdge.Sym,eUp.Lnext); else {
			var tempHalfEdge = tess.mesh.connect(eLo.getDnext(),vEvent.anEdge);
			eNew = tempHalfEdge.Sym;
		}
		if(reg.fixUpperEdge) verb_topo_Sweep.fixUpperEdge(tess,reg,eNew); else verb_topo_Sweep.computeWinding(tess,verb_topo_Sweep.addRegionBelow(tess,regUp,eNew));
		verb_topo_Sweep.sweepEvent(tess,vEvent);
	} else verb_topo_Sweep.addRightEdges(tess,regUp,vEvent.anEdge,vEvent.anEdge,null,true);
};
verb_topo_Sweep.sweepEvent = function(tess,vEvent) {
	tess.event = vEvent;
	verb_topo_Sweep.debugEvent(tess);
	var e = vEvent.anEdge;
	while(e.activeRegion == null) {
		e = e.Onext;
		if(e == vEvent.anEdge) {
			verb_topo_Sweep.connectLeftVertex(tess,vEvent);
			return;
		}
	}
	var regUp = verb_topo_Sweep.topLeftRegion(tess,e.activeRegion);
	verb_topo_Tess2.assert(regUp != null);
	var reg = verb_topo_Sweep.regionBelow(regUp);
	var eTopLeft = reg.eUp;
	var eBottomLeft = verb_topo_Sweep.finishLeftRegions(tess,reg,null);
	if(eBottomLeft.Onext == eTopLeft) verb_topo_Sweep.connectRightVertex(tess,regUp,eBottomLeft); else verb_topo_Sweep.addRightEdges(tess,regUp,eBottomLeft.Onext,eTopLeft,eTopLeft,true);
};
verb_topo_Sweep.addSentinel = function(tess,smin,smax,t) {
	var reg = new verb_topo_ActiveRegion();
	var e = tess.mesh.makeEdge();
	e.Org.s = smax;
	e.Org.t = t;
	e.getDst().s = smin;
	e.getDst().t = t;
	tess.event = e.getDst();
	reg.eUp = e;
	reg.windingNumber = 0;
	reg.inside = false;
	reg.fixUpperEdge = false;
	reg.sentinel = true;
	reg.dirty = false;
	reg.nodeUp = tess.dict.insert(reg);
};
verb_topo_Sweep.initEdgeDict = function(tess) {
	tess.dict = new verb_topo_Dict(tess,verb_topo_Sweep.edgeLeq);
	var w = tess.bmax[0] - tess.bmin[0];
	var h = tess.bmax[1] - tess.bmin[1];
	var smin = tess.bmin[0] - w;
	var smax = tess.bmax[0] + w;
	var tmin = tess.bmin[1] - h;
	var tmax = tess.bmax[1] + h;
	verb_topo_Sweep.addSentinel(tess,smin,smax,tmin);
	verb_topo_Sweep.addSentinel(tess,smin,smax,tmax);
};
verb_topo_Sweep.doneEdgeDict = function(tess) {
	var reg;
	var fixedEdges = 0;
	while((reg = tess.dict.min().key) != null) {
		if(!reg.sentinel) {
			verb_topo_Tess2.assert(reg.fixUpperEdge);
			verb_topo_Tess2.assert(++fixedEdges == 1);
		}
		verb_topo_Tess2.assert(reg.windingNumber == 0);
		verb_topo_Sweep.deleteRegion(tess,reg);
	}
};
verb_topo_Sweep.removeDegenerateEdges = function(tess) {
	var eNext;
	var eLnext;
	var eHead = tess.mesh.eHead;
	var e = eHead.next;
	while(e != eHead) {
		eNext = e.next;
		eLnext = e.Lnext;
		if(verb_topo_Geom.vertEq(e.Org,e.getDst()) && e.Lnext.Lnext != e) {
			verb_topo_Sweep.spliceMergeVertices(tess,eLnext,e);
			tess.mesh["delete"](e);
			e = eLnext;
			eLnext = e.Lnext;
		}
		if(eLnext.Lnext == e) {
			if(eLnext != e) {
				if(eLnext == eNext || eLnext == eNext.Sym) eNext = eNext.next;
				tess.mesh["delete"](eLnext);
			}
			if(e == eNext || e == eNext.Sym) eNext = eNext.next;
			tess.mesh["delete"](e);
		}
		e = eNext;
	}
};
verb_topo_Sweep.initPriorityQ = function(tess) {
	var pq;
	var vHead;
	var vertexCount = 0;
	vHead = tess.mesh.vHead;
	var v = vHead.next;
	while(v != vHead) {
		vertexCount++;
		v = v.next;
	}
	vertexCount += 8;
	pq = tess.pq = new verb_topo_PriorityQ(vertexCount,verb_topo_Geom.vertLeq);
	vHead = tess.mesh.vHead;
	v = vHead.next;
	while(v != vHead) {
		v.pqHandle = pq.insert(v);
		v = v.next;
	}
	if(v != vHead) return false;
	pq.init();
	return true;
};
verb_topo_Sweep.donePriorityQ = function(tess) {
	tess.pq = null;
};
verb_topo_Sweep.removeDegenerateFaces = function(tess,mesh) {
	var fNext;
	var e;
	var f = mesh.fHead.next;
	while(f != mesh.fHead) {
		fNext = f.next;
		e = f.anEdge;
		verb_topo_Tess2.assert(e.Lnext != e);
		if(e.Lnext.Lnext == e) {
			verb_topo_Sweep.addWinding(e.Onext,e);
			tess.mesh["delete"](e);
		}
		f = fNext;
	}
	return true;
};
verb_topo_Sweep.computeInterior = function(tess) {
	var v;
	var vNext;
	verb_topo_Sweep.removeDegenerateEdges(tess);
	if(!verb_topo_Sweep.initPriorityQ(tess)) return false;
	verb_topo_Sweep.initEdgeDict(tess);
	while((v = tess.pq.extractMin()) != null) {
		while(true) {
			vNext = tess.pq.min();
			if(vNext == null || !verb_topo_Geom.vertEq(vNext,v)) break;
			vNext = tess.pq.extractMin();
			verb_topo_Sweep.spliceMergeVertices(tess,v.anEdge,vNext.anEdge);
		}
		verb_topo_Sweep.sweepEvent(tess,v);
	}
	tess.event = tess.dict.min().key.eUp.Org;
	verb_topo_Sweep.debugEvent(tess);
	verb_topo_Sweep.doneEdgeDict(tess);
	verb_topo_Sweep.donePriorityQ(tess);
	if(!verb_topo_Sweep.removeDegenerateFaces(tess,tess.mesh)) return false;
	tess.mesh.check();
	return true;
};
var verb_topo_Tessellator = function() {
	this.mesh = null;
	this.normal = [0.0,0.0,0.0];
	this.sUnit = [0.0,0.0,0.0];
	this.tUnit = [0.0,0.0,0.0];
	this.bmin = [0.0,0.0];
	this.bmax = [0.0,0.0];
	this.windingRule = verb_topo_Tess2.WINDING_ODD;
	this.dict = null;
	this.pq = null;
	this.event = null;
	this.vertexIndexCounter = 0;
	this.vertices = [];
	this.vertexIndices = [];
	this.vertexCount = 0;
	this.elements = [];
	this.elementCount = 0;
};
verb_topo_Tessellator.__name__ = ["verb","topo","Tessellator"];
verb_topo_Tessellator.prototype = {
	dot_: function(u,v) {
		return u[0] * v[0] + u[1] * v[1] + u[2] * v[2];
	}
	,normalize_: function(v) {
		var len = v[0] * v[0] + v[1] * v[1] + v[2] * v[2];
		verb_topo_Tess2.assert(len > 0.0);
		len = Math.sqrt(len);
		v[0] /= len;
		v[1] /= len;
		v[2] /= len;
	}
	,longAxis_: function(v) {
		var i = 0;
		if(Math.abs(v[1]) > Math.abs(v[0])) i = 1;
		if(Math.abs(v[2]) > Math.abs(v[i])) i = 2;
		return i;
	}
	,computeNormal_: function(norm) {
		var v;
		var v1;
		var v2;
		var c;
		var tLen2;
		var maxLen2;
		var maxVal = [0.0,0.0,0.0];
		var minVal = [0.0,0.0,0.0];
		var d1 = [0.0,0.0,0.0];
		var d2_0 = 0.0;
		var d2_1 = 0.0;
		var d2_2 = 0.0;
		var tNorm_0 = 0.0;
		var tNorm_1 = 0.0;
		var tNorm_2 = 0.0;
		var maxVert = [null,null,null];
		var minVert = [null,null,null];
		var vHead = this.mesh.vHead;
		v = vHead.next;
		var _g = 0;
		while(_g < 3) {
			var i1 = _g++;
			c = v.coords[i1];
			minVal[i1] = c;
			minVert[i1] = v;
			maxVal[i1] = c;
			maxVert[i1] = v;
		}
		v = vHead.next;
		while(v != vHead) {
			var _g1 = 0;
			while(_g1 < 3) {
				var i2 = _g1++;
				c = v.coords[i2];
				if(c < minVal[i2]) {
					minVal[i2] = c;
					minVert[i2] = v;
				}
				if(c > maxVal[i2]) {
					maxVal[i2] = c;
					maxVert[i2] = v;
				}
			}
			v = v.next;
		}
		var i = 0;
		if(maxVal[1] - minVal[1] > maxVal[0] - minVal[0]) i = 1;
		if(maxVal[2] - minVal[2] > maxVal[i] - minVal[i]) i = 2;
		if(minVal[i] >= maxVal[i]) {
			norm[0] = 0.0;
			norm[1] = 0.0;
			norm[2] = 1.0;
			return;
		}
		maxLen2 = 0.0;
		v1 = minVert[i];
		v2 = maxVert[i];
		d1[0] = v1.coords[0] - v2.coords[0];
		d1[1] = v1.coords[1] - v2.coords[1];
		d1[2] = v1.coords[2] - v2.coords[2];
		v = vHead.next;
		while(v != vHead) {
			d2_0 = v.coords[0] - v2.coords[0];
			d2_1 = v.coords[1] - v2.coords[1];
			d2_2 = v.coords[2] - v2.coords[2];
			tNorm_0 = d1[1] * d2_2 - d1[2] * d2_1;
			tNorm_1 = d1[2] * d2_0 - d1[0] * d2_2;
			tNorm_2 = d1[0] * d2_1 - d1[1] * d2_0;
			tLen2 = tNorm_0 * tNorm_0 + tNorm_1 * tNorm_1 + tNorm_2 * tNorm_2;
			if(tLen2 > maxLen2) {
				maxLen2 = tLen2;
				norm[0] = tNorm_0;
				norm[1] = tNorm_1;
				norm[2] = tNorm_2;
			}
			v = v.next;
		}
		if(maxLen2 <= 0) {
			norm[0] = norm[1] = norm[2] = 0;
			norm[this.longAxis_(d1)] = 1;
		}
	}
	,checkOrientation_: function() {
		var area;
		var f;
		var fHead = this.mesh.fHead;
		var v;
		var vHead = this.mesh.vHead;
		var e;
		area = 0.0;
		f = fHead.next;
		while(f != fHead) {
			e = f.anEdge;
			if(e.winding <= 0) continue;
			do {
				area += (e.Org.s - e.getDst().s) * (e.Org.t + e.getDst().t);
				e = e.Lnext;
			} while(e != f.anEdge);
			f = f.next;
		}
		if(area < 0) {
			v = vHead.next;
			while(v != vHead) {
				v.t = -v.t;
				v = v.next;
			}
			this.tUnit[0] = -this.tUnit[0];
			this.tUnit[1] = -this.tUnit[1];
			this.tUnit[2] = -this.tUnit[2];
		}
	}
	,projectPolygon_: function() {
		var v;
		var vHead = this.mesh.vHead;
		var norm = [0.0,0.0,0.0];
		var sUnit;
		var tUnit;
		var i;
		var first;
		var computedNormal = false;
		norm[0] = this.normal[0];
		norm[1] = this.normal[1];
		norm[2] = this.normal[2];
		if(norm[0] == 0.0 && norm[1] == 0.0 && norm[2] == 0.0) {
			this.computeNormal_(norm);
			computedNormal = true;
		}
		sUnit = this.sUnit;
		tUnit = this.tUnit;
		i = this.longAxis_(norm);
		sUnit[i] = 0;
		sUnit[(i + 1) % 3] = 1.0;
		sUnit[(i + 2) % 3] = 0.0;
		tUnit[i] = 0;
		tUnit[(i + 1) % 3] = 0.0;
		if(norm[i] > 0) tUnit[(i + 2) % 3] = 1.0; else tUnit[(i + 2) % 3] = -1.0;
		v = vHead.next;
		while(v != vHead) {
			v.s = this.dot_(v.coords,sUnit);
			v.t = this.dot_(v.coords,tUnit);
			v = v.next;
		}
		if(computedNormal) this.checkOrientation_();
		first = true;
		v = vHead.next;
		while(v != vHead) {
			if(first) {
				this.bmin[0] = this.bmax[0] = v.s;
				this.bmin[1] = this.bmax[1] = v.t;
				first = false;
			} else {
				if(v.s < this.bmin[0]) this.bmin[0] = v.s;
				if(v.s > this.bmax[0]) this.bmax[0] = v.s;
				if(v.t < this.bmin[1]) this.bmin[1] = v.t;
				if(v.t > this.bmax[1]) this.bmax[1] = v.t;
			}
			v = v.next;
		}
	}
	,addWinding_: function(eDst,eSrc) {
		eDst.winding += eSrc.winding;
		eDst.Sym.winding += eSrc.Sym.winding;
	}
	,tessellateMonoRegion_: function(mesh,face) {
		var up;
		var lo;
		up = face.anEdge;
		verb_topo_Tess2.assert(up.Lnext != up && up.Lnext.Lnext != up);
		while(verb_topo_Geom.vertLeq(up.getDst(),up.Org)) up = up.getLprev();
		while(verb_topo_Geom.vertLeq(up.Org,up.getDst())) up = up.Lnext;
		lo = up.getLprev();
		while(up.Lnext != lo) if(verb_topo_Geom.vertLeq(up.getDst(),lo.Org)) {
			while(lo.Lnext != up && (verb_topo_Geom.edgeGoesLeft(lo.Lnext) || verb_topo_Geom.edgeSign(lo.Org,lo.getDst(),lo.Lnext.getDst()) <= 0.0)) {
				var tempHalfEdge = mesh.connect(lo.Lnext,lo);
				lo = tempHalfEdge.Sym;
			}
			lo = lo.getLprev();
		} else {
			while(lo.Lnext != up && (verb_topo_Geom.edgeGoesRight(up.getLprev()) || verb_topo_Geom.edgeSign(up.getDst(),up.Org,up.getLprev().Org) >= 0.0)) {
				var tempHalfEdge1 = mesh.connect(up,up.getLprev());
				up = tempHalfEdge1.Sym;
			}
			up = up.Lnext;
		}
		verb_topo_Tess2.assert(lo.Lnext != up);
		while(lo.Lnext.Lnext != up) {
			var tempHalfEdge2 = mesh.connect(lo.Lnext,lo);
			lo = tempHalfEdge2.Sym;
		}
		return true;
	}
	,tessellateInterior_: function(mesh) {
		var next;
		var f = mesh.fHead.next;
		while(f != mesh.fHead) {
			next = f.next;
			if(f.inside) {
				if(!this.tessellateMonoRegion_(mesh,f)) return false;
			}
			f = next;
		}
		return true;
	}
	,discardExterior_: function(mesh) {
		var next;
		var f = mesh.fHead.next;
		while(f != mesh.fHead) {
			next = f.next;
			if(!f.inside) mesh.zapFace(f);
			f = next;
		}
	}
	,setWindingNumber_: function(mesh,value,keepOnlyBoundary) {
		var e;
		var eNext;
		var e1 = mesh.eHead.next;
		while(e1 != mesh.eHead) {
			eNext = e1.next;
			if(e1.getRface().inside != e1.Lface.inside) if(e1.Lface.inside) e1.winding = value; else e1.winding = -value; else if(!keepOnlyBoundary) e1.winding = 0; else mesh["delete"](e1);
			e1 = eNext;
		}
	}
	,getNeighbourFace_: function(edge) {
		if(edge.getRface() == null) return -1;
		if(!edge.getRface().inside) return -1;
		return edge.getRface().n;
	}
	,outputPolymesh_: function(mesh,elementType,polySize,vertexSize) {
		var v;
		var f;
		var edge;
		var maxFaceCount = 0;
		var maxVertexCount = 0;
		var faceVerts;
		var i;
		var elements = 0;
		var vert;
		if(polySize > 3) mesh.mergeConvexFaces(polySize);
		v = mesh.vHead.next;
		while(v != mesh.vHead) {
			v.n = -1;
			v = v.next;
		}
		f = mesh.fHead.next;
		while(f != mesh.fHead) {
			f.n = -1;
			if(!f.inside) {
				f = f.next;
				continue;
			}
			edge = f.anEdge;
			faceVerts = 0;
			do {
				v = edge.Org;
				if(v.n == -1) {
					v.n = maxVertexCount;
					maxVertexCount++;
				}
				faceVerts++;
				edge = edge.Lnext;
			} while(edge != f.anEdge);
			verb_topo_Tess2.assert(faceVerts <= polySize);
			f.n = maxFaceCount;
			++maxFaceCount;
			f = f.next;
		}
		this.elementCount = maxFaceCount;
		if(elementType == verb_topo_Tess2.CONNECTED_POLYGONS) maxFaceCount *= 2;
		this.elements = [];
		verb_core_ArrayExtensions.alloc(this.elements,maxFaceCount * polySize);
		this.vertexCount = maxVertexCount;
		this.vertices = [];
		verb_core_ArrayExtensions.alloc(this.vertices,maxVertexCount * vertexSize);
		this.vertexIndices = [];
		verb_core_ArrayExtensions.alloc(this.vertexIndices,maxVertexCount);
		v = mesh.vHead.next;
		while(v != mesh.vHead) {
			if(v.n != -1) {
				var idx = v.n * vertexSize;
				this.vertices[idx] = v.coords[0];
				this.vertices[idx + 1] = v.coords[1];
				if(vertexSize > 2) this.vertices[idx + 2] = v.coords[2];
				this.vertexIndices[v.n] = v.idx;
			}
			v = v.next;
		}
		var nel = 0;
		f = mesh.fHead.next;
		while(f != mesh.fHead) {
			if(!f.inside) {
				f = f.next;
				continue;
			}
			edge = f.anEdge;
			faceVerts = 0;
			do {
				v = edge.Org;
				this.elements[nel++] = v.n;
				faceVerts++;
				edge = edge.Lnext;
			} while(edge != f.anEdge);
			var _g = faceVerts;
			while(_g < polySize) {
				var i1 = _g++;
				this.elements[nel++] = -1;
			}
			if(elementType == verb_topo_Tess2.CONNECTED_POLYGONS) {
				edge = f.anEdge;
				do {
					this.elements[nel++] = this.getNeighbourFace_(edge);
					edge = edge.Lnext;
				} while(edge != f.anEdge);
				var _g1 = faceVerts;
				while(_g1 < polySize) {
					var i2 = _g1++;
					this.elements[nel++] = -1;
				}
			}
			f = f.next;
		}
	}
	,outputContours_: function(mesh,vertexSize) {
		var f;
		var edge;
		var start;
		var verts;
		var elements;
		var vertInds;
		var startVert = 0;
		var vertCount = 0;
		this.vertexCount = 0;
		this.elementCount = 0;
		f = mesh.fHead.next;
		while(f != mesh.fHead) {
			if(!f.inside) {
				f = f.next;
				continue;
			}
			start = edge = f.anEdge;
			do {
				this.vertexCount++;
				edge = edge.Lnext;
			} while(edge != start);
			this.elementCount++;
			f = f.next;
		}
		this.elements = [];
		verb_core_ArrayExtensions.alloc(this.elements,this.elementCount * 2);
		this.vertices = [];
		verb_core_ArrayExtensions.alloc(this.vertices,this.vertexCount * vertexSize);
		this.vertexIndices = [];
		verb_core_ArrayExtensions.alloc(this.vertexIndices,this.vertexCount);
		var nv = 0;
		var nvi = 0;
		var nel = 0;
		startVert = 0;
		f = mesh.fHead.next;
		while(f != mesh.fHead) {
			if(!f.inside) {
				f = f.next;
				continue;
			}
			vertCount = 0;
			start = edge = f.anEdge;
			do {
				this.vertices[nv++] = edge.Org.coords[0];
				this.vertices[nv++] = edge.Org.coords[1];
				if(vertexSize > 2) this.vertices[nv++] = edge.Org.coords[2];
				this.vertexIndices[nvi++] = edge.Org.idx;
				vertCount++;
				edge = edge.Lnext;
			} while(edge != start);
			this.elements[nel++] = startVert;
			this.elements[nel++] = vertCount;
			startVert += vertCount;
			f = f.next;
		}
	}
	,addContour: function(size,vertices) {
		var e;
		var i;
		if(this.mesh == null) this.mesh = new verb_topo_TESSmesh();
		if(size < 2) size = 2;
		if(size > 3) size = 3;
		e = null;
		i = 0;
		while(i < vertices.length) {
			if(e == null) {
				e = this.mesh.makeEdge();
				this.mesh.splice(e,e.Sym);
			} else {
				this.mesh.splitEdge(e);
				e = e.Lnext;
			}
			e.Org.coords[0] = vertices[i];
			e.Org.coords[1] = vertices[i + 1];
			if(size > 2) e.Org.coords[2] = vertices[i + 2]; else e.Org.coords[2] = 0.0;
			e.Org.idx = this.vertexIndexCounter++;
			e.winding = 1;
			e.Sym.winding = -1;
			i += size;
		}
	}
	,tessellate: function(windingRule,elementType,polySize,vertexSize,normal) {
		this.vertices = [];
		this.elements = [];
		this.vertexIndices = [];
		this.vertexIndexCounter = 0;
		if(normal != null) {
			this.normal[0] = normal[0];
			this.normal[1] = normal[1];
			this.normal[2] = normal[2];
		}
		this.windingRule = windingRule;
		if(vertexSize < 2) vertexSize = 2;
		if(vertexSize > 3) vertexSize = 3;
		if(this.mesh == null) return false;
		this.projectPolygon_();
		verb_topo_Sweep.computeInterior(this);
		var mesh = this.mesh;
		if(elementType == verb_topo_Tess2.BOUNDARY_CONTOURS) this.setWindingNumber_(mesh,1,true); else this.tessellateInterior_(mesh);
		mesh.check();
		if(elementType == verb_topo_Tess2.BOUNDARY_CONTOURS) this.outputContours_(mesh,vertexSize); else this.outputPolymesh_(mesh,elementType,polySize,vertexSize);
		return true;
	}
};
var verb_topo_Vertex = $hx_exports.topo.Vertex = function(point) {
	verb_topo_Topo.call(this);
	this.pt = point;
};
verb_topo_Vertex.__name__ = ["verb","topo","Vertex"];
verb_topo_Vertex.__interfaces__ = [verb_core_types_IDoublyLinkedList];
verb_topo_Vertex.__super__ = verb_topo_Topo;
verb_topo_Vertex.prototype = $extend(verb_topo_Topo.prototype,{
	neighbors: function() {
		var memo_h = { };
		memo_h[this.id] = this;
		var a = [];
		var ce = this.e;
		var _g = 0;
		var _g1 = this.halfEdges();
		while(_g < _g1.length) {
			var e = _g1[_g];
			++_g;
			var v = e.nxt.v;
			if(memo_h.hasOwnProperty(v.id)) continue;
			a.push(v);
		}
		return a;
	}
	,halfEdges: function() {
		var a = [];
		var ce = this.e;
		do {
			a.push(ce);
			if(ce.opp == null) break;
			ce = ce.opp.nxt;
		} while(ce != this.e);
		return a;
	}
});
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; }
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
String.__name__ = ["String"];
Array.__name__ = ["Array"];
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
var global = window;
(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var setImmediate;

    function addFromSetImmediateArguments(args) {
        tasksByHandle[nextHandle] = partiallyApplied.apply(undefined, args);
        return nextHandle++;
    }

    // This function accepts the same arguments as setImmediate, but
    // returns a function that requires no arguments.
    function partiallyApplied(handler) {
        var args = [].slice.call(arguments, 1);
        return function() {
            if (typeof handler === "function") {
                handler.apply(undefined, args);
            } else {
                (new Function("" + handler))();
            }
        };
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(partiallyApplied(runIfPresent, handle), 0);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    task();
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function installNextTickImplementation() {
        setImmediate = function() {
            var handle = addFromSetImmediateArguments(arguments);
            process.nextTick(partiallyApplied(runIfPresent, handle));
            return handle;
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        setImmediate = function() {
            var handle = addFromSetImmediateArguments(arguments);
            global.postMessage(messagePrefix + handle, "*");
            return handle;
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        setImmediate = function() {
            var handle = addFromSetImmediateArguments(arguments);
            channel.port2.postMessage(handle);
            return handle;
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        setImmediate = function() {
            var handle = addFromSetImmediateArguments(arguments);
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
            return handle;
        };
    }

    function installSetTimeoutImplementation() {
        setImmediate = function() {
            var handle = addFromSetImmediateArguments(arguments);
            setTimeout(partiallyApplied(runIfPresent, handle), 0);
            return handle;
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(new Function("return this")()));
;
promhx_base_EventLoop.queue = new List();
verb_core_Analyze.Tvalues = [[],[],[-0.5773502691896257645091487805019574556476,0.5773502691896257645091487805019574556476],[0,-0.7745966692414833770358530799564799221665,0.7745966692414833770358530799564799221665],[-0.3399810435848562648026657591032446872005,0.3399810435848562648026657591032446872005,-0.8611363115940525752239464888928095050957,0.8611363115940525752239464888928095050957],[0,-0.5384693101056830910363144207002088049672,0.5384693101056830910363144207002088049672,-0.9061798459386639927976268782993929651256,0.9061798459386639927976268782993929651256],[0.6612093864662645136613995950199053470064,-0.6612093864662645136613995950199053470064,-0.2386191860831969086305017216807119354186,0.2386191860831969086305017216807119354186,-0.9324695142031520278123015544939946091347,0.9324695142031520278123015544939946091347],[0,0.4058451513773971669066064120769614633473,-0.4058451513773971669066064120769614633473,-0.7415311855993944398638647732807884070741,0.7415311855993944398638647732807884070741,-0.9491079123427585245261896840478512624007,0.9491079123427585245261896840478512624007],[-0.1834346424956498049394761423601839806667,0.1834346424956498049394761423601839806667,-0.5255324099163289858177390491892463490419,0.5255324099163289858177390491892463490419,-0.7966664774136267395915539364758304368371,0.7966664774136267395915539364758304368371,-0.9602898564975362316835608685694729904282,0.9602898564975362316835608685694729904282],[0,-0.8360311073266357942994297880697348765441,0.8360311073266357942994297880697348765441,-0.9681602395076260898355762029036728700494,0.9681602395076260898355762029036728700494,-0.3242534234038089290385380146433366085719,0.3242534234038089290385380146433366085719,-0.6133714327005903973087020393414741847857,0.6133714327005903973087020393414741847857],[-0.1488743389816312108848260011297199846175,0.1488743389816312108848260011297199846175,-0.4333953941292471907992659431657841622000,0.4333953941292471907992659431657841622000,-0.6794095682990244062343273651148735757692,0.6794095682990244062343273651148735757692,-0.8650633666889845107320966884234930485275,0.8650633666889845107320966884234930485275,-0.9739065285171717200779640120844520534282,0.9739065285171717200779640120844520534282],[0,-0.2695431559523449723315319854008615246796,0.2695431559523449723315319854008615246796,-0.5190961292068118159257256694586095544802,0.5190961292068118159257256694586095544802,-0.7301520055740493240934162520311534580496,0.7301520055740493240934162520311534580496,-0.8870625997680952990751577693039272666316,0.8870625997680952990751577693039272666316,-0.9782286581460569928039380011228573907714,0.9782286581460569928039380011228573907714],[-0.1252334085114689154724413694638531299833,0.1252334085114689154724413694638531299833,-0.3678314989981801937526915366437175612563,0.3678314989981801937526915366437175612563,-0.5873179542866174472967024189405342803690,0.5873179542866174472967024189405342803690,-0.7699026741943046870368938332128180759849,0.7699026741943046870368938332128180759849,-0.9041172563704748566784658661190961925375,0.9041172563704748566784658661190961925375,-0.9815606342467192506905490901492808229601,0.9815606342467192506905490901492808229601],[0,-0.2304583159551347940655281210979888352115,0.2304583159551347940655281210979888352115,-0.4484927510364468528779128521276398678019,0.4484927510364468528779128521276398678019,-0.6423493394403402206439846069955156500716,0.6423493394403402206439846069955156500716,-0.8015780907333099127942064895828598903056,0.8015780907333099127942064895828598903056,-0.9175983992229779652065478365007195123904,0.9175983992229779652065478365007195123904,-0.9841830547185881494728294488071096110649,0.9841830547185881494728294488071096110649],[-0.1080549487073436620662446502198347476119,0.1080549487073436620662446502198347476119,-0.3191123689278897604356718241684754668342,0.3191123689278897604356718241684754668342,-0.5152486363581540919652907185511886623088,0.5152486363581540919652907185511886623088,-0.6872929048116854701480198030193341375384,0.6872929048116854701480198030193341375384,-0.8272013150697649931897947426503949610397,0.8272013150697649931897947426503949610397,-0.9284348836635735173363911393778742644770,0.9284348836635735173363911393778742644770,-0.9862838086968123388415972667040528016760,0.9862838086968123388415972667040528016760],[0,-0.2011940939974345223006283033945962078128,0.2011940939974345223006283033945962078128,-0.3941513470775633698972073709810454683627,0.3941513470775633698972073709810454683627,-0.5709721726085388475372267372539106412383,0.5709721726085388475372267372539106412383,-0.7244177313601700474161860546139380096308,0.7244177313601700474161860546139380096308,-0.8482065834104272162006483207742168513662,0.8482065834104272162006483207742168513662,-0.9372733924007059043077589477102094712439,0.9372733924007059043077589477102094712439,-0.9879925180204854284895657185866125811469,0.9879925180204854284895657185866125811469],[-0.0950125098376374401853193354249580631303,0.0950125098376374401853193354249580631303,-0.2816035507792589132304605014604961064860,0.2816035507792589132304605014604961064860,-0.4580167776572273863424194429835775735400,0.4580167776572273863424194429835775735400,-0.6178762444026437484466717640487910189918,0.6178762444026437484466717640487910189918,-0.7554044083550030338951011948474422683538,0.7554044083550030338951011948474422683538,-0.8656312023878317438804678977123931323873,0.8656312023878317438804678977123931323873,-0.9445750230732325760779884155346083450911,0.9445750230732325760779884155346083450911,-0.9894009349916499325961541734503326274262,0.9894009349916499325961541734503326274262],[0,-0.1784841814958478558506774936540655574754,0.1784841814958478558506774936540655574754,-0.3512317634538763152971855170953460050405,0.3512317634538763152971855170953460050405,-0.5126905370864769678862465686295518745829,0.5126905370864769678862465686295518745829,-0.6576711592166907658503022166430023351478,0.6576711592166907658503022166430023351478,-0.7815140038968014069252300555204760502239,0.7815140038968014069252300555204760502239,-0.8802391537269859021229556944881556926234,0.8802391537269859021229556944881556926234,-0.9506755217687677612227169578958030214433,0.9506755217687677612227169578958030214433,-0.9905754753144173356754340199406652765077,0.9905754753144173356754340199406652765077],[-0.0847750130417353012422618529357838117333,0.0847750130417353012422618529357838117333,-0.2518862256915055095889728548779112301628,0.2518862256915055095889728548779112301628,-0.4117511614628426460359317938330516370789,0.4117511614628426460359317938330516370789,-0.5597708310739475346078715485253291369276,0.5597708310739475346078715485253291369276,-0.6916870430603532078748910812888483894522,0.6916870430603532078748910812888483894522,-0.8037049589725231156824174550145907971032,0.8037049589725231156824174550145907971032,-0.8926024664975557392060605911271455154078,0.8926024664975557392060605911271455154078,-0.9558239495713977551811958929297763099728,0.9558239495713977551811958929297763099728,-0.9915651684209309467300160047061507702525,0.9915651684209309467300160047061507702525],[0,-0.1603586456402253758680961157407435495048,0.1603586456402253758680961157407435495048,-0.3165640999636298319901173288498449178922,0.3165640999636298319901173288498449178922,-0.4645707413759609457172671481041023679762,0.4645707413759609457172671481041023679762,-0.6005453046616810234696381649462392798683,0.6005453046616810234696381649462392798683,-0.7209661773352293786170958608237816296571,0.7209661773352293786170958608237816296571,-0.8227146565371428249789224867127139017745,0.8227146565371428249789224867127139017745,-0.9031559036148179016426609285323124878093,0.9031559036148179016426609285323124878093,-0.9602081521348300308527788406876515266150,0.9602081521348300308527788406876515266150,-0.9924068438435844031890176702532604935893,0.9924068438435844031890176702532604935893],[-0.0765265211334973337546404093988382110047,0.0765265211334973337546404093988382110047,-0.2277858511416450780804961953685746247430,0.2277858511416450780804961953685746247430,-0.3737060887154195606725481770249272373957,0.3737060887154195606725481770249272373957,-0.5108670019508270980043640509552509984254,0.5108670019508270980043640509552509984254,-0.6360536807265150254528366962262859367433,0.6360536807265150254528366962262859367433,-0.7463319064601507926143050703556415903107,0.7463319064601507926143050703556415903107,-0.8391169718222188233945290617015206853296,0.8391169718222188233945290617015206853296,-0.9122344282513259058677524412032981130491,0.9122344282513259058677524412032981130491,-0.9639719272779137912676661311972772219120,0.9639719272779137912676661311972772219120,-0.9931285991850949247861223884713202782226,0.9931285991850949247861223884713202782226],[0,-0.1455618541608950909370309823386863301163,0.1455618541608950909370309823386863301163,-0.2880213168024010966007925160646003199090,0.2880213168024010966007925160646003199090,-0.4243421202074387835736688885437880520964,0.4243421202074387835736688885437880520964,-0.5516188358872198070590187967243132866220,0.5516188358872198070590187967243132866220,-0.6671388041974123193059666699903391625970,0.6671388041974123193059666699903391625970,-0.7684399634756779086158778513062280348209,0.7684399634756779086158778513062280348209,-0.8533633645833172836472506385875676702761,0.8533633645833172836472506385875676702761,-0.9200993341504008287901871337149688941591,0.9200993341504008287901871337149688941591,-0.9672268385663062943166222149076951614246,0.9672268385663062943166222149076951614246,-0.9937521706203895002602420359379409291933,0.9937521706203895002602420359379409291933],[-0.0697392733197222212138417961186280818222,0.0697392733197222212138417961186280818222,-0.2078604266882212854788465339195457342156,0.2078604266882212854788465339195457342156,-0.3419358208920842251581474204273796195591,0.3419358208920842251581474204273796195591,-0.4693558379867570264063307109664063460953,0.4693558379867570264063307109664063460953,-0.5876404035069115929588769276386473488776,0.5876404035069115929588769276386473488776,-0.6944872631866827800506898357622567712673,0.6944872631866827800506898357622567712673,-0.7878168059792081620042779554083515213881,0.7878168059792081620042779554083515213881,-0.8658125777203001365364256370193787290847,0.8658125777203001365364256370193787290847,-0.9269567721871740005206929392590531966353,0.9269567721871740005206929392590531966353,-0.9700604978354287271239509867652687108059,0.9700604978354287271239509867652687108059,-0.9942945854823992920730314211612989803930,0.9942945854823992920730314211612989803930],[0,-0.1332568242984661109317426822417661370104,0.1332568242984661109317426822417661370104,-0.2641356809703449305338695382833096029790,0.2641356809703449305338695382833096029790,-0.3903010380302908314214888728806054585780,0.3903010380302908314214888728806054585780,-0.5095014778460075496897930478668464305448,0.5095014778460075496897930478668464305448,-0.6196098757636461563850973116495956533871,0.6196098757636461563850973116495956533871,-0.7186613631319501944616244837486188483299,0.7186613631319501944616244837486188483299,-0.8048884016188398921511184069967785579414,0.8048884016188398921511184069967785579414,-0.8767523582704416673781568859341456716389,0.8767523582704416673781568859341456716389,-0.9329710868260161023491969890384229782357,0.9329710868260161023491969890384229782357,-0.9725424712181152319560240768207773751816,0.9725424712181152319560240768207773751816,-0.9947693349975521235239257154455743605736,0.9947693349975521235239257154455743605736],[-0.0640568928626056260850430826247450385909,0.0640568928626056260850430826247450385909,-0.1911188674736163091586398207570696318404,0.1911188674736163091586398207570696318404,-0.3150426796961633743867932913198102407864,0.3150426796961633743867932913198102407864,-0.4337935076260451384870842319133497124524,0.4337935076260451384870842319133497124524,-0.5454214713888395356583756172183723700107,0.5454214713888395356583756172183723700107,-0.6480936519369755692524957869107476266696,0.6480936519369755692524957869107476266696,-0.7401241915785543642438281030999784255232,0.7401241915785543642438281030999784255232,-0.8200019859739029219539498726697452080761,0.8200019859739029219539498726697452080761,-0.8864155270044010342131543419821967550873,0.8864155270044010342131543419821967550873,-0.9382745520027327585236490017087214496548,0.9382745520027327585236490017087214496548,-0.9747285559713094981983919930081690617411,0.9747285559713094981983919930081690617411,-0.9951872199970213601799974097007368118745,0.9951872199970213601799974097007368118745]];
verb_core_Analyze.Cvalues = [[],[],[1.0,1.0],[0.8888888888888888888888888888888888888888,0.5555555555555555555555555555555555555555,0.5555555555555555555555555555555555555555],[0.6521451548625461426269360507780005927646,0.6521451548625461426269360507780005927646,0.3478548451374538573730639492219994072353,0.3478548451374538573730639492219994072353],[0.5688888888888888888888888888888888888888,0.4786286704993664680412915148356381929122,0.4786286704993664680412915148356381929122,0.2369268850561890875142640407199173626432,0.2369268850561890875142640407199173626432],[0.3607615730481386075698335138377161116615,0.3607615730481386075698335138377161116615,0.4679139345726910473898703439895509948116,0.4679139345726910473898703439895509948116,0.1713244923791703450402961421727328935268,0.1713244923791703450402961421727328935268],[0.4179591836734693877551020408163265306122,0.3818300505051189449503697754889751338783,0.3818300505051189449503697754889751338783,0.2797053914892766679014677714237795824869,0.2797053914892766679014677714237795824869,0.1294849661688696932706114326790820183285,0.1294849661688696932706114326790820183285],[0.3626837833783619829651504492771956121941,0.3626837833783619829651504492771956121941,0.3137066458778872873379622019866013132603,0.3137066458778872873379622019866013132603,0.2223810344533744705443559944262408844301,0.2223810344533744705443559944262408844301,0.1012285362903762591525313543099621901153,0.1012285362903762591525313543099621901153],[0.3302393550012597631645250692869740488788,0.1806481606948574040584720312429128095143,0.1806481606948574040584720312429128095143,0.0812743883615744119718921581105236506756,0.0812743883615744119718921581105236506756,0.3123470770400028400686304065844436655987,0.3123470770400028400686304065844436655987,0.2606106964029354623187428694186328497718,0.2606106964029354623187428694186328497718],[0.2955242247147528701738929946513383294210,0.2955242247147528701738929946513383294210,0.2692667193099963550912269215694693528597,0.2692667193099963550912269215694693528597,0.2190863625159820439955349342281631924587,0.2190863625159820439955349342281631924587,0.1494513491505805931457763396576973324025,0.1494513491505805931457763396576973324025,0.0666713443086881375935688098933317928578,0.0666713443086881375935688098933317928578],[0.2729250867779006307144835283363421891560,0.2628045445102466621806888698905091953727,0.2628045445102466621806888698905091953727,0.2331937645919904799185237048431751394317,0.2331937645919904799185237048431751394317,0.1862902109277342514260976414316558916912,0.1862902109277342514260976414316558916912,0.1255803694649046246346942992239401001976,0.1255803694649046246346942992239401001976,0.0556685671161736664827537204425485787285,0.0556685671161736664827537204425485787285],[0.2491470458134027850005624360429512108304,0.2491470458134027850005624360429512108304,0.2334925365383548087608498989248780562594,0.2334925365383548087608498989248780562594,0.2031674267230659217490644558097983765065,0.2031674267230659217490644558097983765065,0.1600783285433462263346525295433590718720,0.1600783285433462263346525295433590718720,0.1069393259953184309602547181939962242145,0.1069393259953184309602547181939962242145,0.0471753363865118271946159614850170603170,0.0471753363865118271946159614850170603170],[0.2325515532308739101945895152688359481566,0.2262831802628972384120901860397766184347,0.2262831802628972384120901860397766184347,0.2078160475368885023125232193060527633865,0.2078160475368885023125232193060527633865,0.1781459807619457382800466919960979955128,0.1781459807619457382800466919960979955128,0.1388735102197872384636017768688714676218,0.1388735102197872384636017768688714676218,0.0921214998377284479144217759537971209236,0.0921214998377284479144217759537971209236,0.0404840047653158795200215922009860600419,0.0404840047653158795200215922009860600419],[0.2152638534631577901958764433162600352749,0.2152638534631577901958764433162600352749,0.2051984637212956039659240656612180557103,0.2051984637212956039659240656612180557103,0.1855383974779378137417165901251570362489,0.1855383974779378137417165901251570362489,0.1572031671581935345696019386238421566056,0.1572031671581935345696019386238421566056,0.1215185706879031846894148090724766259566,0.1215185706879031846894148090724766259566,0.0801580871597602098056332770628543095836,0.0801580871597602098056332770628543095836,0.0351194603317518630318328761381917806197,0.0351194603317518630318328761381917806197],[0.2025782419255612728806201999675193148386,0.1984314853271115764561183264438393248186,0.1984314853271115764561183264438393248186,0.1861610000155622110268005618664228245062,0.1861610000155622110268005618664228245062,0.1662692058169939335532008604812088111309,0.1662692058169939335532008604812088111309,0.1395706779261543144478047945110283225208,0.1395706779261543144478047945110283225208,0.1071592204671719350118695466858693034155,0.1071592204671719350118695466858693034155,0.0703660474881081247092674164506673384667,0.0703660474881081247092674164506673384667,0.0307532419961172683546283935772044177217,0.0307532419961172683546283935772044177217],[0.1894506104550684962853967232082831051469,0.1894506104550684962853967232082831051469,0.1826034150449235888667636679692199393835,0.1826034150449235888667636679692199393835,0.1691565193950025381893120790303599622116,0.1691565193950025381893120790303599622116,0.1495959888165767320815017305474785489704,0.1495959888165767320815017305474785489704,0.1246289712555338720524762821920164201448,0.1246289712555338720524762821920164201448,0.0951585116824927848099251076022462263552,0.0951585116824927848099251076022462263552,0.0622535239386478928628438369943776942749,0.0622535239386478928628438369943776942749,0.0271524594117540948517805724560181035122,0.0271524594117540948517805724560181035122],[0.1794464703562065254582656442618856214487,0.1765627053669926463252709901131972391509,0.1765627053669926463252709901131972391509,0.1680041021564500445099706637883231550211,0.1680041021564500445099706637883231550211,0.1540457610768102880814315948019586119404,0.1540457610768102880814315948019586119404,0.1351363684685254732863199817023501973721,0.1351363684685254732863199817023501973721,0.1118838471934039710947883856263559267358,0.1118838471934039710947883856263559267358,0.0850361483171791808835353701910620738504,0.0850361483171791808835353701910620738504,0.0554595293739872011294401653582446605128,0.0554595293739872011294401653582446605128,0.0241483028685479319601100262875653246916,0.0241483028685479319601100262875653246916],[0.1691423829631435918406564701349866103341,0.1691423829631435918406564701349866103341,0.1642764837458327229860537764659275904123,0.1642764837458327229860537764659275904123,0.1546846751262652449254180038363747721932,0.1546846751262652449254180038363747721932,0.1406429146706506512047313037519472280955,0.1406429146706506512047313037519472280955,0.1225552067114784601845191268002015552281,0.1225552067114784601845191268002015552281,0.1009420441062871655628139849248346070628,0.1009420441062871655628139849248346070628,0.0764257302548890565291296776166365256053,0.0764257302548890565291296776166365256053,0.0497145488949697964533349462026386416808,0.0497145488949697964533349462026386416808,0.0216160135264833103133427102664524693876,0.0216160135264833103133427102664524693876],[0.1610544498487836959791636253209167350399,0.1589688433939543476499564394650472016787,0.1589688433939543476499564394650472016787,0.1527660420658596667788554008976629984610,0.1527660420658596667788554008976629984610,0.1426067021736066117757461094419029724756,0.1426067021736066117757461094419029724756,0.1287539625393362276755157848568771170558,0.1287539625393362276755157848568771170558,0.1115666455473339947160239016817659974813,0.1115666455473339947160239016817659974813,0.0914900216224499994644620941238396526609,0.0914900216224499994644620941238396526609,0.0690445427376412265807082580060130449618,0.0690445427376412265807082580060130449618,0.0448142267656996003328381574019942119517,0.0448142267656996003328381574019942119517,0.0194617882297264770363120414644384357529,0.0194617882297264770363120414644384357529],[0.1527533871307258506980843319550975934919,0.1527533871307258506980843319550975934919,0.1491729864726037467878287370019694366926,0.1491729864726037467878287370019694366926,0.1420961093183820513292983250671649330345,0.1420961093183820513292983250671649330345,0.1316886384491766268984944997481631349161,0.1316886384491766268984944997481631349161,0.1181945319615184173123773777113822870050,0.1181945319615184173123773777113822870050,0.1019301198172404350367501354803498761666,0.1019301198172404350367501354803498761666,0.0832767415767047487247581432220462061001,0.0832767415767047487247581432220462061001,0.0626720483341090635695065351870416063516,0.0626720483341090635695065351870416063516,0.0406014298003869413310399522749321098790,0.0406014298003869413310399522749321098790,0.0176140071391521183118619623518528163621,0.0176140071391521183118619623518528163621],[0.1460811336496904271919851476833711882448,0.1445244039899700590638271665537525436099,0.1445244039899700590638271665537525436099,0.1398873947910731547221334238675831108927,0.1398873947910731547221334238675831108927,0.1322689386333374617810525744967756043290,0.1322689386333374617810525744967756043290,0.1218314160537285341953671771257335983563,0.1218314160537285341953671771257335983563,0.1087972991671483776634745780701056420336,0.1087972991671483776634745780701056420336,0.0934444234560338615532897411139320884835,0.0934444234560338615532897411139320884835,0.0761001136283793020170516533001831792261,0.0761001136283793020170516533001831792261,0.0571344254268572082836358264724479574912,0.0571344254268572082836358264724479574912,0.0369537897708524937999506682993296661889,0.0369537897708524937999506682993296661889,0.0160172282577743333242246168584710152658,0.0160172282577743333242246168584710152658],[0.1392518728556319933754102483418099578739,0.1392518728556319933754102483418099578739,0.1365414983460151713525738312315173965863,0.1365414983460151713525738312315173965863,0.1311735047870623707329649925303074458757,0.1311735047870623707329649925303074458757,0.1232523768105124242855609861548144719594,0.1232523768105124242855609861548144719594,0.1129322960805392183934006074217843191142,0.1129322960805392183934006074217843191142,0.1004141444428809649320788378305362823508,0.1004141444428809649320788378305362823508,0.0859416062170677274144436813727028661891,0.0859416062170677274144436813727028661891,0.0697964684245204880949614189302176573987,0.0697964684245204880949614189302176573987,0.0522933351526832859403120512732112561121,0.0522933351526832859403120512732112561121,0.0337749015848141547933022468659129013491,0.0337749015848141547933022468659129013491,0.0146279952982722006849910980471854451902,0.0146279952982722006849910980471854451902],[0.1336545721861061753514571105458443385831,0.1324620394046966173716424647033169258050,0.1324620394046966173716424647033169258050,0.1289057221880821499785953393997936532597,0.1289057221880821499785953393997936532597,0.1230490843067295304675784006720096548158,0.1230490843067295304675784006720096548158,0.1149966402224113649416435129339613014914,0.1149966402224113649416435129339613014914,0.1048920914645414100740861850147438548584,0.1048920914645414100740861850147438548584,0.0929157660600351474770186173697646486034,0.0929157660600351474770186173697646486034,0.0792814117767189549228925247420432269137,0.0792814117767189549228925247420432269137,0.0642324214085258521271696151589109980391,0.0642324214085258521271696151589109980391,0.0480376717310846685716410716320339965612,0.0480376717310846685716410716320339965612,0.0309880058569794443106942196418845053837,0.0309880058569794443106942196418845053837,0.0134118594871417720813094934586150649766,0.0134118594871417720813094934586150649766],[0.1279381953467521569740561652246953718517,0.1279381953467521569740561652246953718517,0.1258374563468282961213753825111836887264,0.1258374563468282961213753825111836887264,0.1216704729278033912044631534762624256070,0.1216704729278033912044631534762624256070,0.1155056680537256013533444839067835598622,0.1155056680537256013533444839067835598622,0.1074442701159656347825773424466062227946,0.1074442701159656347825773424466062227946,0.0976186521041138882698806644642471544279,0.0976186521041138882698806644642471544279,0.0861901615319532759171852029837426671850,0.0861901615319532759171852029837426671850,0.0733464814110803057340336152531165181193,0.0733464814110803057340336152531165181193,0.0592985849154367807463677585001085845412,0.0592985849154367807463677585001085845412,0.0442774388174198061686027482113382288593,0.0442774388174198061686027482113382288593,0.0285313886289336631813078159518782864491,0.0285313886289336631813078159518782864491,0.0123412297999871995468056670700372915759,0.0123412297999871995468056670700372915759]];
verb_core_Binomial.memo = new haxe_ds_IntMap();
verb_core_Constants.TOLERANCE = 1e-6;
verb_core_Constants.EPSILON = 1e-10;
verb_core_ExpIntersect.INIT_STEP_LENGTH = 1e-3;
verb_core_ExpIntersect.LINEAR_STEP_LENGTH = 0.1;
verb_core_types_BoundingBox.TOLERANCE = 1e-4;
verb_exe_Dispatcher.THREADS = 1;
verb_exe_Dispatcher._init = false;
verb_exe_Work.uuid = 0;
verb_exe_WorkerPool.basePath = "";
verb_topo_Boolean.IN = 1;
verb_topo_Boolean.ON = 0;
verb_topo_Boolean.OUT = -1;
verb_topo_Boolean.boolOnSectorMap = [[verb_topo_FacePosition.AoutB,verb_topo_FacePosition.AinB,verb_topo_FacePosition.BinA,verb_topo_FacePosition.BinA],[verb_topo_FacePosition.AinB,verb_topo_FacePosition.AoutB,verb_topo_FacePosition.BoutA,verb_topo_FacePosition.BoutA],[verb_topo_FacePosition.AinB,verb_topo_FacePosition.AoutB,verb_topo_FacePosition.BoutA,verb_topo_FacePosition.BoutA]];
verb_topo_Topo.counter = 0;
verb_topo_Tess2.WINDING_ODD = 0;
verb_topo_Tess2.WINDING_NONZERO = 1;
verb_topo_Tess2.WINDING_POSITIVE = 2;
verb_topo_Tess2.WINDING_NEGATIVE = 3;
verb_topo_Tess2.WINDING_ABS_GEQ_TWO = 4;
verb_topo_Tess2.POLYGONS = 0;
verb_topo_Tess2.CONNECTED_POLYGONS = 1;
verb_topo_Tess2.BOUNDARY_CONTOURS = 2;
verb_Verb.main();
})(typeof console != "undefined" ? console : {log:function(){}}, typeof window != "undefined" ? window : exports);
