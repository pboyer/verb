// browser context
if ( typeof exports != 'object' || exports === undefined )
{
    // todo fix this
	var verb = exports = {};
} else  {
	var Worker = require('webworker-threads').Worker;
}

// web worker context
if ( typeof window != 'object'){

	var global = this;
	var window = global; // required for promhx
	var lookup = function(className, methodName){

		var obj = global;

		className.split(".").forEach(function(x){
			if (obj) obj = obj[ x ];
		});

		if (!obj) return null;

		return obj[ methodName ];
	}

	onmessage = function( e ){

		var method = lookup( e.data.className, e.data.methodName );

		if (!method){
			return console.error("could not find " + e.data.className + "." + e.data.methodName)
		}

		postMessage( { result: method.apply( null, e.data.args ), id: e.data.id } );

	};
}
(function ($hx_exports) { "use strict";
$hx_exports.geom = $hx_exports.geom || {};
$hx_exports.exe = $hx_exports.exe || {};
$hx_exports.core = $hx_exports.core || {};
$hx_exports.promhx = $hx_exports.promhx || {};
var $estr = function() { return js.Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var HxOverrides = function() { };
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var Lambda = function() { };
Lambda.__name__ = ["Lambda"];
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
var IMap = function() { };
IMap.__name__ = ["IMap"];
Math.__name__ = ["Math"];
var Type = function() { };
Type.__name__ = ["Type"];
Type.getClassName = function(c) {
	var a = c.__name__;
	return a.join(".");
};
var haxe = {};
haxe.Log = function() { };
haxe.Log.__name__ = ["haxe","Log"];
haxe.Log.trace = function(v,infos) {
	js.Boot.__trace(v,infos);
};
haxe.ds = {};
haxe.ds.IntMap = function() {
	this.h = { };
};
haxe.ds.IntMap.__name__ = ["haxe","ds","IntMap"];
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
	,remove: function(key) {
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
};
haxe.ds.Option = { __ename__ : true, __constructs__ : ["Some","None"] };
haxe.ds.Option.Some = function(v) { var $x = ["Some",0,v]; $x.__enum__ = haxe.ds.Option; $x.toString = $estr; return $x; };
haxe.ds.Option.None = ["None",1];
haxe.ds.Option.None.toString = $estr;
haxe.ds.Option.None.__enum__ = haxe.ds.Option;
var js = {};
js.Boot = function() { };
js.Boot.__name__ = ["js","Boot"];
js.Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
};
js.Boot.__trace = function(v,i) {
	var msg;
	if(i != null) msg = i.fileName + ":" + i.lineNumber + ": "; else msg = "";
	msg += js.Boot.__string_rec(v,"");
	if(i != null && i.customParams != null) {
		var _g = 0;
		var _g1 = i.customParams;
		while(_g < _g1.length) {
			var v1 = _g1[_g];
			++_g;
			msg += "," + js.Boot.__string_rec(v1,"");
		}
	}
	var d;
	if(typeof(document) != "undefined" && (d = document.getElementById("haxe:trace")) != null) d.innerHTML += js.Boot.__unhtml(msg) + "<br/>"; else if(typeof console != "undefined" && console.log != null) console.log(msg);
};
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i1;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js.Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str2 = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str2.length != 2) str2 += ", \n";
		str2 += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str2 += "\n" + s + "}";
		return str2;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
var promhx = {};
promhx.base = {};
promhx.base.AsyncBase = function(d) {
	this._resolved = false;
	this._pending = false;
	this._errorPending = false;
	this._fulfilled = false;
	this._update = [];
	this._error = [];
	this._errored = false;
	if(d != null) promhx.base.AsyncBase.link(d,this,function(x) {
		return x;
	});
};
promhx.base.AsyncBase.__name__ = ["promhx","base","AsyncBase"];
promhx.base.AsyncBase.link = function(current,next,f) {
	current._update.push({ async : next, linkf : function(x) {
		next.handleResolve(f(x));
	}});
	promhx.base.AsyncBase.immediateLinkUpdate(current,next,f);
};
promhx.base.AsyncBase.immediateLinkUpdate = function(current,next,f) {
	if(current._errored) next.handleError(current._errorVal);
	if(current._resolved && !current._pending) try {
		next.handleResolve(f(current._val));
	} catch( e ) {
		next.handleError(e);
	}
};
promhx.base.AsyncBase.linkAll = function(all,next) {
	var cthen = function(arr,current,v) {
		if(arr.length == 0 || promhx.base.AsyncBase.allFulfilled(arr)) {
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
		return null;
	};
	var $it1 = $iterator(all)();
	while( $it1.hasNext() ) {
		var a1 = $it1.next();
		a1._update.push({ async : next, linkf : (function(f,a11,a2) {
			return function(v1) {
				return f(a11,a2,v1);
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
	if(promhx.base.AsyncBase.allFulfilled(all)) next.handleResolve((function($this) {
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
promhx.base.AsyncBase.pipeLink = function(current,ret,f) {
	var linked = false;
	var linkf = function(x) {
		if(!linked) {
			linked = true;
			var pipe_ret = f(x);
			pipe_ret._update.push({ async : ret, linkf : $bind(ret,ret.handleResolve)});
			promhx.base.AsyncBase.immediateLinkUpdate(pipe_ret,ret,function(x1) {
				return x1;
			});
		}
	};
	current._update.push({ async : ret, linkf : linkf});
	if(current._resolved && !current._pending) try {
		linkf(current._val);
	} catch( e ) {
		ret.handleError(e);
	}
};
promhx.base.AsyncBase.allResolved = function($as) {
	var $it0 = $iterator($as)();
	while( $it0.hasNext() ) {
		var a = $it0.next();
		if(!a._resolved) return false;
	}
	return true;
};
promhx.base.AsyncBase.allFulfilled = function($as) {
	var $it0 = $iterator($as)();
	while( $it0.hasNext() ) {
		var a = $it0.next();
		if(!a._fulfilled) return false;
	}
	return true;
};
promhx.base.AsyncBase.prototype = {
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
		if(this._pending) promhx.base.EventLoop.enqueue((function(f,a1) {
			return function() {
				return f(a1);
			};
		})($bind(this,this._resolve),val)); else {
			this._resolved = true;
			this._pending = true;
			promhx.base.EventLoop.queue.add(function() {
				_g._val = val;
				var _g1 = 0;
				var _g2 = _g._update;
				while(_g1 < _g2.length) {
					var up = _g2[_g1];
					++_g1;
					try {
						up.linkf(val);
					} catch( e ) {
						up.async.handleError(e);
					}
				}
				_g._fulfilled = true;
				_g._pending = false;
			});
			promhx.base.EventLoop.continueOnNextLoop();
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
			} else throw e;
			_g._errorPending = false;
		};
		if(!this._errorPending) {
			this._errorPending = true;
			this._errored = true;
			this._errorVal = error;
			promhx.base.EventLoop.queue.add(function() {
				if(_g._errorMap != null) try {
					_g._resolve(_g._errorMap(error));
				} catch( e1 ) {
					update_errors(e1);
				} else update_errors(error);
			});
			promhx.base.EventLoop.continueOnNextLoop();
		}
	}
	,then: function(f) {
		var ret = new promhx.base.AsyncBase();
		promhx.base.AsyncBase.link(this,ret,f);
		return ret;
	}
	,unlink: function(to) {
		var _g = this;
		promhx.base.EventLoop.queue.add(function() {
			_g._update = _g._update.filter(function(x) {
				return x.async != to;
			});
		});
		promhx.base.EventLoop.continueOnNextLoop();
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
promhx.Deferred = $hx_exports.promhx.Deferred = function() {
	promhx.base.AsyncBase.call(this);
};
promhx.Deferred.__name__ = ["promhx","Deferred"];
promhx.Deferred.__super__ = promhx.base.AsyncBase;
promhx.Deferred.prototype = $extend(promhx.base.AsyncBase.prototype,{
	resolve: function(val) {
		this.handleResolve(val);
	}
	,throwError: function(e) {
		this.handleError(e);
	}
	,promise: function() {
		return new promhx.Promise(this);
	}
	,stream: function() {
		return new promhx.Stream(this);
	}
	,publicStream: function() {
		return new promhx.PublicStream(this);
	}
});
promhx.Promise = $hx_exports.promhx.Promise = function(d) {
	promhx.base.AsyncBase.call(this,d);
	this._rejected = false;
};
promhx.Promise.__name__ = ["promhx","Promise"];
promhx.Promise.whenAll = function(itb) {
	var ret = new promhx.Promise();
	promhx.base.AsyncBase.linkAll(itb,ret);
	return ret;
};
promhx.Promise.promise = function(_val) {
	var ret = new promhx.Promise();
	ret.handleResolve(_val);
	return ret;
};
promhx.Promise.__super__ = promhx.base.AsyncBase;
promhx.Promise.prototype = $extend(promhx.base.AsyncBase.prototype,{
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
			throw promhx.error.PromiseError.AlreadyResolved(msg);
		}
		this._resolve(val);
	}
	,then: function(f) {
		var ret = new promhx.Promise();
		promhx.base.AsyncBase.link(this,ret,f);
		return ret;
	}
	,unlink: function(to) {
		var _g = this;
		promhx.base.EventLoop.queue.add(function() {
			if(!_g._fulfilled) {
				var msg = "Downstream Promise is not fullfilled";
				_g.handleError(promhx.error.PromiseError.DownstreamNotFullfilled(msg));
			} else _g._update = _g._update.filter(function(x) {
				return x.async != to;
			});
		});
		promhx.base.EventLoop.continueOnNextLoop();
	}
	,handleError: function(error) {
		this._rejected = true;
		this._handleError(error);
	}
	,pipe: function(f) {
		var ret = new promhx.Promise();
		promhx.base.AsyncBase.pipeLink(this,ret,f);
		return ret;
	}
	,errorPipe: function(f) {
		var ret = new promhx.Promise();
		this.catchError(function(e) {
			var piped = f(e);
			piped.then($bind(ret,ret._resolve));
		});
		this.then($bind(ret,ret._resolve));
		return ret;
	}
});
promhx.Stream = $hx_exports.promhx.Stream = function(d) {
	promhx.base.AsyncBase.call(this,d);
	this._end_deferred = new promhx.Deferred();
	this._end_promise = this._end_deferred.promise();
};
promhx.Stream.__name__ = ["promhx","Stream"];
promhx.Stream.foreach = function(itb) {
	var s = new promhx.Stream();
	var $it0 = $iterator(itb)();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		s.handleResolve(i);
	}
	s.end();
	return s;
};
promhx.Stream.wheneverAll = function(itb) {
	var ret = new promhx.Stream();
	promhx.base.AsyncBase.linkAll(itb,ret);
	return ret;
};
promhx.Stream.concatAll = function(itb) {
	var ret = new promhx.Stream();
	var $it0 = $iterator(itb)();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		ret.concat(i);
	}
	return ret;
};
promhx.Stream.mergeAll = function(itb) {
	var ret = new promhx.Stream();
	var $it0 = $iterator(itb)();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		ret.merge(i);
	}
	return ret;
};
promhx.Stream.stream = function(_val) {
	var ret = new promhx.Stream();
	ret.handleResolve(_val);
	return ret;
};
promhx.Stream.__super__ = promhx.base.AsyncBase;
promhx.Stream.prototype = $extend(promhx.base.AsyncBase.prototype,{
	then: function(f) {
		var ret = new promhx.Stream();
		promhx.base.AsyncBase.link(this,ret,f);
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
		var s = new promhx.Promise();
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
		var ret = new promhx.Stream();
		promhx.base.AsyncBase.pipeLink(this,ret,f);
		this._end_promise.then(function(x) {
			ret.end();
		});
		return ret;
	}
	,errorPipe: function(f) {
		var ret = new promhx.Stream();
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
			promhx.base.EventLoop.queue.add($bind(this,this.handleEnd));
			promhx.base.EventLoop.continueOnNextLoop();
		} else if(this._end_promise._resolved) return; else {
			this._end = true;
			var o;
			if(this._resolved) o = haxe.ds.Option.Some(this._val); else o = haxe.ds.Option.None;
			this._end_promise.handleResolve(o);
			this._update = [];
			this._error = [];
		}
	}
	,end: function() {
		promhx.base.EventLoop.queue.add($bind(this,this.handleEnd));
		promhx.base.EventLoop.continueOnNextLoop();
		return this;
	}
	,endThen: function(f) {
		return this._end_promise.then(f);
	}
	,filter: function(f) {
		var ret = new promhx.Stream();
		this._update.push({ async : ret, linkf : function(x) {
			if(f(x)) ret.handleResolve(x);
		}});
		promhx.base.AsyncBase.immediateLinkUpdate(this,ret,function(x1) {
			return x1;
		});
		return ret;
	}
	,concat: function(s) {
		var ret = new promhx.Stream();
		this._update.push({ async : ret, linkf : $bind(ret,ret.handleResolve)});
		promhx.base.AsyncBase.immediateLinkUpdate(this,ret,function(x) {
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
		var ret = new promhx.Stream();
		this._update.push({ async : ret, linkf : $bind(ret,ret.handleResolve)});
		s._update.push({ async : ret, linkf : $bind(ret,ret.handleResolve)});
		promhx.base.AsyncBase.immediateLinkUpdate(this,ret,function(x) {
			return x;
		});
		promhx.base.AsyncBase.immediateLinkUpdate(s,ret,function(x1) {
			return x1;
		});
		return ret;
	}
});
promhx.PublicStream = $hx_exports.promhx.PublicStream = function(def) {
	promhx.Stream.call(this,def);
};
promhx.PublicStream.__name__ = ["promhx","PublicStream"];
promhx.PublicStream.publicstream = function(val) {
	var ps = new promhx.PublicStream();
	ps.handleResolve(val);
	return ps;
};
promhx.PublicStream.__super__ = promhx.Stream;
promhx.PublicStream.prototype = $extend(promhx.Stream.prototype,{
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
promhx.base.EventLoop = function() { };
promhx.base.EventLoop.__name__ = ["promhx","base","EventLoop"];
promhx.base.EventLoop.enqueue = function(eqf) {
	promhx.base.EventLoop.queue.add(eqf);
	promhx.base.EventLoop.continueOnNextLoop();
};
promhx.base.EventLoop.set_nextLoop = function(f) {
	if(promhx.base.EventLoop.nextLoop != null) throw "nextLoop has already been set"; else promhx.base.EventLoop.nextLoop = f;
	return promhx.base.EventLoop.nextLoop;
};
promhx.base.EventLoop.queueEmpty = function() {
	return promhx.base.EventLoop.queue.isEmpty();
};
promhx.base.EventLoop.finish = function(max_iterations) {
	if(max_iterations == null) max_iterations = 1000;
	var fn = null;
	while(max_iterations-- > 0 && (fn = promhx.base.EventLoop.queue.pop()) != null) fn();
	return promhx.base.EventLoop.queue.isEmpty();
};
promhx.base.EventLoop.clear = function() {
	promhx.base.EventLoop.queue = new List();
};
promhx.base.EventLoop.f = function() {
	var fn = promhx.base.EventLoop.queue.pop();
	if(fn != null) fn();
	if(!promhx.base.EventLoop.queue.isEmpty()) promhx.base.EventLoop.continueOnNextLoop();
};
promhx.base.EventLoop.continueOnNextLoop = function() {
	if(promhx.base.EventLoop.nextLoop != null) promhx.base.EventLoop.nextLoop(promhx.base.EventLoop.f); else setImmediate(promhx.base.EventLoop.f);
};
promhx.error = {};
promhx.error.PromiseError = { __ename__ : true, __constructs__ : ["AlreadyResolved","DownstreamNotFullfilled"] };
promhx.error.PromiseError.AlreadyResolved = function(message) { var $x = ["AlreadyResolved",0,message]; $x.__enum__ = promhx.error.PromiseError; $x.toString = $estr; return $x; };
promhx.error.PromiseError.DownstreamNotFullfilled = function(message) { var $x = ["DownstreamNotFullfilled",1,message]; $x.__enum__ = promhx.error.PromiseError; $x.toString = $estr; return $x; };
var verb = {};
verb.Verb = function() { };
verb.Verb.__name__ = ["verb","Verb"];
verb.Verb.main = function() {
	haxe.Log.trace("verb 0.2.0",{ fileName : "Verb.hx", lineNumber : 44, className : "verb.Verb", methodName : "main"});
};
verb.core = {};
verb.core.KnotMultiplicity = $hx_exports.core.KnotMultiplicity = function(knot,mult) {
	this.knot = knot;
	this.mult = mult;
};
verb.core.KnotMultiplicity.__name__ = ["verb","core","KnotMultiplicity"];
verb.core.KnotMultiplicity.prototype = {
	inc: function() {
		this.mult++;
	}
};
verb.core.Analyze = $hx_exports.core.Analyze = function() { };
verb.core.Analyze.__name__ = ["verb","core","Analyze"];
verb.core.Analyze.knotMultiplicities = function(knots) {
	var mults = [new verb.core.KnotMultiplicity(knots[0],0)];
	var curr = mults[0];
	var _g = 0;
	while(_g < knots.length) {
		var knot = knots[_g];
		++_g;
		if(Math.abs(knot - curr.knot) > 1e-10) {
			curr = new verb.core.KnotMultiplicity(knot,0);
			mults.push(curr);
		}
		curr.inc();
	}
	return mults;
};
verb.core.Analyze.isRationalSurfaceClosed = function(surface,uDir) {
	if(uDir == null) uDir = true;
	var cpts;
	if(uDir) cpts = surface.controlPoints; else cpts = verb.core.Mat.transpose(surface.controlPoints);
	var _g1 = 0;
	var _g = cpts[0].length;
	while(_g1 < _g) {
		var i = _g1++;
		var test = verb.core.Vec.dist(cpts[0][i],cpts[cpts.length - 1][i]) < 1e-10;
		if(!test) return false;
	}
	return true;
};
verb.core.Analyze.rationalSurfaceClosestPoint = function(surface,p) {
	var uv = verb.core.Analyze.rationalSurfaceClosestParam(surface,p);
	return verb.core.Eval.rationalSurfacePoint(surface,uv[0],uv[1]);
};
verb.core.Analyze.rationalSurfaceClosestParam = function(surface,p) {
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
	var closedu = verb.core.Analyze.isRationalSurfaceClosed(surface);
	var closedv = verb.core.Analyze.isRationalSurfaceClosed(surface,false);
	var cuv;
	var tess = verb.core.Tess.rationalSurfaceAdaptive(surface,new verb.core.types.AdaptiveRefinementOptions());
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
		return verb.core.Eval.rationalSurfaceDerivatives(surface,uv[0],uv[1],2);
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
		if(ct[0] < minu) if(closedu) ct = [maxu - (ct[0] - minu),ct[1]]; else ct = [minu + 1e-10,ct[1]]; else if(ct[0] > maxu) if(closedu) ct = [minu + (ct[0] - maxu),ct[1]]; else ct = [maxu - 1e-10,ct[1]];
		if(ct[1] < minv) if(closedv) ct = [ct[0],maxv - (ct[1] - minv)]; else ct = [ct[0],minv + 1e-10]; else if(ct[1] > maxv) if(closedv) ct = [ct[0],minv + (ct[0] - maxv)]; else ct = [ct[0],maxv - 1e-10];
		var c3v0 = verb.core.Vec.norm(verb.core.Vec.mul(ct[0] - cuv[0],e[1][0]));
		var c3v1 = verb.core.Vec.norm(verb.core.Vec.mul(ct[1] - cuv[1],e[0][1]));
		if(c3v0 + c3v1 < eps1) return cuv;
		cuv = ct;
		i++;
	}
	return cuv;
};
verb.core.Analyze.rationalCurveClosestPoint = function(curve,p) {
	return verb.core.Eval.rationalCurvePoint(curve,verb.core.Analyze.rationalCurveClosestParam(curve,p));
};
verb.core.Analyze.rationalCurveClosestParam = function(curve,p) {
	var min = Math.POSITIVE_INFINITY;
	var u = 0.0;
	var pts = verb.core.Tess.rationalCurveRegularSample(curve,curve.controlPoints.length * curve.degree,true);
	var _g1 = 0;
	var _g = pts.length - 1;
	while(_g1 < _g) {
		var i = _g1++;
		var u0 = pts[i][0];
		var u1 = pts[i + 1][0];
		var p0 = pts[i].slice(1);
		var p1 = pts[i + 1].slice(1);
		var proj = verb.core.Trig.segmentClosestPoint(p,p0,p1,u0,u1);
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
	var closed = verb.core.Vec.normSquared(verb.core.Vec.sub(curve.controlPoints[0],verb.core.ArrayExtensions.last(curve.controlPoints))) < 1e-10;
	var cu = u;
	var f = function(u2) {
		return verb.core.Eval.rationalCurveDerivatives(curve,u2,2);
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
verb.core.Analyze.rationalCurveParamAtArcLength = function(curve,len,tol,beziers,bezierLengths) {
	if(tol == null) tol = 1e-3;
	if(len < 1e-10) return curve.knots[0];
	var crvs;
	if(beziers != null) crvs = beziers; else crvs = verb.core.Modify.decomposeCurveIntoBeziers(curve);
	var i = 0;
	var cc = crvs[i];
	var cl = -1e-10;
	var bezier_lengths;
	if(bezierLengths != null) bezier_lengths = bezierLengths; else bezier_lengths = [];
	while(cl < len && i < crvs.length) {
		if(i < bezier_lengths.length) bezier_lengths[i] = bezier_lengths[i]; else bezier_lengths[i] = verb.core.Analyze.rationalBezierCurveArcLength(curve);
		cl += bezier_lengths[i];
		if(len < cl + 1e-10) return verb.core.Analyze.rationalBezierCurveParamAtArcLength(curve,len,tol,bezier_lengths[i]);
		i++;
	}
	return -1;
};
verb.core.Analyze.rationalBezierCurveParamAtArcLength = function(curve,len,tol,totalLength) {
	if(len < 0) return curve.knots[0];
	var totalLen;
	if(totalLength != null) totalLen = totalLength; else totalLen = verb.core.Analyze.rationalBezierCurveArcLength(curve);
	if(len > totalLen) return verb.core.ArrayExtensions.last(curve.knots);
	var start_p = curve.knots[0];
	var start_l = 0.0;
	var end_p = verb.core.ArrayExtensions.last(curve.knots);
	var end_l = totalLen;
	var mid_p = 0.0;
	var mid_l = 0.0;
	var tol1;
	if(tol != null) tol1 = tol; else tol1 = 2e-06;
	while(end_l - start_l > tol1) {
		mid_p = (start_p + end_p) / 2;
		mid_l = verb.core.Analyze.rationalBezierCurveArcLength(curve,mid_p);
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
verb.core.Analyze.rationalCurveArcLength = function(curve,u,gaussDegIncrease) {
	if(gaussDegIncrease == null) gaussDegIncrease = 16;
	if(u == null) u = verb.core.ArrayExtensions.last(curve.knots); else u = u;
	var crvs = verb.core.Modify.decomposeCurveIntoBeziers(curve);
	var i = 0;
	var cc = crvs[0];
	var sum = 0.0;
	while(i < crvs.length && cc.knots[0] + 1e-10 < u) {
		var param = Math.min(verb.core.ArrayExtensions.last(cc.knots),u);
		sum += verb.core.Analyze.rationalBezierCurveArcLength(cc,param,gaussDegIncrease);
		cc = crvs[++i];
	}
	return sum;
};
verb.core.Analyze.rationalBezierCurveArcLength = function(curve,u,gaussDegIncrease) {
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
		tan = verb.core.Eval.rationalCurveDerivatives(curve,cu,1);
		sum += verb.core.Analyze.Cvalues[gaussDeg][i] * verb.core.Vec.norm(tan[1]);
	}
	return z * sum;
};
verb.core.ArrayExtensions = function() { };
verb.core.ArrayExtensions.__name__ = ["verb","core","ArrayExtensions"];
verb.core.ArrayExtensions.reversed = function(a) {
	var ac = a.slice();
	ac.reverse();
	return ac;
};
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
verb.core.Binomial.__name__ = ["verb","core","Binomial"];
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
verb.core.Check = $hx_exports.core.Check = function() { };
verb.core.Check.__name__ = ["verb","core","Check"];
verb.core.Check.isValidKnotVector = function(vec,degree) {
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
	return verb.core.Check.isNonDecreasing(vec);
};
verb.core.Check.isNonDecreasing = function(vec) {
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
verb.core.Check.nurbsCurveData = function(data) {
	if(data.controlPoints == null) throw "Control points array cannot be null!";
	if(data.degree == null) throw "Degree cannot be null!";
	if(data.degree < 1) throw "Degree must be greater than 1!";
	if(data.knots == null) throw "Knots cannot be null!";
	if(data.knots.length != data.controlPoints.length + data.degree + 1) throw "controlPoints.length + degree + 1 must equal knots.length!";
	if(!verb.core.Check.isValidKnotVector(data.knots,data.degree)) throw "Invalid knot vector format!  Should begin with degree + 1 repeats and end with degree + 1 repeats!";
	return data;
};
verb.core.Check.nurbsSurfaceData = function(data) {
	if(data.controlPoints == null) throw "Control points array cannot be null!";
	if(data.degreeU == null) throw "DegreeU cannot be null!";
	if(data.degreeV == null) throw "DegreeV cannot be null!";
	if(data.degreeU < 1) throw "DegreeU must be greater than 1!";
	if(data.degreeV < 1) throw "DegreeV must be greater than 1!";
	if(data.knotsU == null) throw "KnotsU cannot be null!";
	if(data.knotsV == null) throw "KnotsV cannot be null!";
	if(data.knotsU.length != data.controlPoints.length + data.degreeU + 1) throw "controlPointsU.length + degreeU + 1 must equal knotsU.length!";
	if(data.knotsV.length != data.controlPoints[0].length + data.degreeV + 1) throw "controlPointsV.length + degreeV + 1 must equal knotsV.length!";
	if(!verb.core.Check.isValidKnotVector(data.knotsU,data.degreeU) || !verb.core.Check.isValidKnotVector(data.knotsV,data.degreeV)) throw "Invalid knot vector format!  Should begin with degree + 1 repeats and end with degree + 1 repeats!";
	return data;
};
verb.core.Constants = $hx_exports.core.Constants = function() { };
verb.core.Constants.__name__ = ["verb","core","Constants"];
verb.core.Divide = $hx_exports.core.Divide = function() { };
verb.core.Divide.__name__ = ["verb","core","Divide"];
verb.core.Divide.rationalCurveByEqualArcLength = function(curve,num) {
	var tlen = verb.core.Analyze.rationalCurveArcLength(curve);
	var inc = tlen / num;
	return verb.core.Divide.rationalCurveByArcLength(curve,inc);
};
verb.core.Divide.rationalCurveByArcLength = function(curve,l) {
	var crvs = verb.core.Modify.decomposeCurveIntoBeziers(curve);
	var crvlens = crvs.map(function(x) {
		return verb.core.Analyze.rationalBezierCurveArcLength(x);
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
		while(lc < runsum + 1e-10) {
			u = verb.core.Analyze.rationalBezierCurveParamAtArcLength(crvs[i],lc - runsum1,1e-6,crvlens[i]);
			pts.push(new verb.core.types.CurveLengthSample(u,lc));
			lc += inc;
		}
		runsum1 += crvlens[i];
		i++;
	}
	return pts;
};
verb.core.Eval = $hx_exports.core.Eval = function() { };
verb.core.Eval.__name__ = ["verb","core","Eval"];
verb.core.Eval.volumePoint = function(volume,u,v,w) {
	var n = volume.knotsU.length - volume.degreeU - 2;
	var m = volume.knotsV.length - volume.degreeV - 2;
	var l = volume.knotsW.length - volume.degreeW - 2;
	return verb.core.Eval.volumePointGivenNML(volume,n,m,l,u,v,w);
};
verb.core.Eval.volumePointGivenNML = function(volume,n,m,l,u,v,w) {
	if(!verb.core.Eval.areValidRelations(volume.degreeU,volume.controlPoints.length,volume.knotsU.length) || !verb.core.Eval.areValidRelations(volume.degreeV,volume.controlPoints[0].length,volume.knotsV.length) || !verb.core.Eval.areValidRelations(volume.degreeW,volume.controlPoints[0][0].length,volume.knotsW.length)) throw "Invalid relations between control points and knot vector";
	var controlPoints = volume.controlPoints;
	var degreeU = volume.degreeU;
	var degreeV = volume.degreeV;
	var degreeW = volume.degreeW;
	var knotsU = volume.knotsU;
	var knotsV = volume.knotsV;
	var knotsW = volume.knotsW;
	var dim = controlPoints[0][0][0].length;
	var knotSpan_index_u = verb.core.Eval.knotSpanGivenN(n,degreeU,u,knotsU);
	var knotSpan_index_v = verb.core.Eval.knotSpanGivenN(m,degreeV,v,knotsV);
	var knotSpan_index_w = verb.core.Eval.knotSpanGivenN(l,degreeW,w,knotsW);
	var u_basis_vals = verb.core.Eval.basisFunctionsGivenKnotSpanIndex(knotSpan_index_u,u,degreeU,knotsU);
	var v_basis_vals = verb.core.Eval.basisFunctionsGivenKnotSpanIndex(knotSpan_index_v,v,degreeV,knotsV);
	var w_basis_vals = verb.core.Eval.basisFunctionsGivenKnotSpanIndex(knotSpan_index_w,w,degreeW,knotsW);
	var uind = knotSpan_index_u - degreeU;
	var position = verb.core.Vec.zeros1d(dim);
	var temp = verb.core.Vec.zeros1d(dim);
	var temp2 = verb.core.Vec.zeros1d(dim);
	var _g1 = 0;
	var _g = degreeW + 1;
	while(_g1 < _g) {
		var i = _g1++;
		temp2 = verb.core.Vec.zeros1d(dim);
		var wind = knotSpan_index_w - degreeW + i;
		var _g3 = 0;
		var _g2 = degreeV + 1;
		while(_g3 < _g2) {
			var j = _g3++;
			temp = verb.core.Vec.zeros1d(dim);
			var vind = knotSpan_index_v - degreeV + j;
			var _g5 = 0;
			var _g4 = degreeU + 1;
			while(_g5 < _g4) {
				var k = _g5++;
				temp = verb.core.Vec.add(temp,verb.core.Vec.mul(u_basis_vals[k],controlPoints[uind + k][vind][wind]));
			}
			temp2 = verb.core.Vec.add(temp2,verb.core.Vec.mul(v_basis_vals[j],temp));
		}
		position = verb.core.Vec.add(position,verb.core.Vec.mul(w_basis_vals[i],temp2));
	}
	return position;
};
verb.core.Eval.rationalCurveTangent = function(curve,u) {
	var derivs = verb.core.Eval.rationalCurveDerivatives(curve,u,1);
	return derivs[1];
};
verb.core.Eval.rationalSurfaceNormal = function(surface,u,v) {
	var derivs = verb.core.Eval.rationalSurfaceDerivatives(surface,u,v,1);
	return verb.core.Vec.cross(derivs[1][0],derivs[0][1]);
};
verb.core.Eval.rationalSurfaceDerivatives = function(surface,u,v,numDerivs) {
	if(numDerivs == null) numDerivs = 1;
	var ders = verb.core.Eval.surfaceDerivatives(surface,u,v,numDerivs);
	var Aders = verb.core.Eval.rational2d(ders);
	var wders = verb.core.Eval.weight2d(ders);
	var SKL = new Array();
	var dim = Aders[0][0].length;
	var _g1 = 0;
	var _g = numDerivs + 1;
	while(_g1 < _g) {
		var k = _g1++;
		SKL.push(new Array());
		var _g3 = 0;
		var _g2 = numDerivs - k + 1;
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
verb.core.Eval.rationalSurfacePoint = function(surface,u,v) {
	return verb.core.Eval.dehomogenize(verb.core.Eval.surfacePoint(surface,u,v));
};
verb.core.Eval.rationalCurveDerivatives = function(curve,u,numDerivs) {
	if(numDerivs == null) numDerivs = 1;
	var ders = verb.core.Eval.curveDerivatives(curve,u,numDerivs);
	var Aders = verb.core.Eval.rational1d(ders);
	var wders = verb.core.Eval.weight1d(ders);
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
			v = verb.core.Vec.sub(v,verb.core.Vec.mul(verb.core.Binomial.get(k1,i1) * wders[i1],CK[k1 - i1]));
		}
		CK.push(verb.core.Vec.mul(1 / wders[0],v));
	}
	return CK;
};
verb.core.Eval.rationalCurvePoint = function(curve,u) {
	return verb.core.Eval.dehomogenize(verb.core.Eval.curvePoint(curve,u));
};
verb.core.Eval.dehomogenize = function(homoPoint) {
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
verb.core.Eval.rational1d = function(homoPoints) {
	var dim = homoPoints[0].length - 1;
	return homoPoints.map(function(x) {
		return x.slice(0,dim);
	});
};
verb.core.Eval.rational2d = function(homoPoints) {
	return homoPoints.map(verb.core.Eval.rational1d);
};
verb.core.Eval.weight1d = function(homoPoints) {
	var dim = homoPoints[0].length - 1;
	return homoPoints.map(function(x) {
		return x[dim];
	});
};
verb.core.Eval.weight2d = function(homoPoints) {
	return homoPoints.map(verb.core.Eval.weight1d);
};
verb.core.Eval.dehomogenize1d = function(homoPoints) {
	return homoPoints.map(verb.core.Eval.dehomogenize);
};
verb.core.Eval.dehomogenize2d = function(homoPoints) {
	return homoPoints.map(verb.core.Eval.dehomogenize1d);
};
verb.core.Eval.homogenize1d = function(controlPoints,weights) {
	var rows = controlPoints.length;
	var dim = controlPoints[0].length;
	var homo_controlPoints = new Array();
	var wt = 0.0;
	var ref_pt = new Array();
	var weights1;
	if(weights != null) weights1 = weights; else weights1 = verb.core.Vec.rep(controlPoints.length,1.0);
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
verb.core.Eval.homogenize2d = function(controlPoints,weights) {
	var rows = controlPoints.length;
	var homo_controlPoints = new Array();
	var weights1;
	if(weights != null) weights1 = weights; else {
		var _g = [];
		var _g1 = 0;
		while(_g1 < rows) {
			var i = _g1++;
			_g.push(verb.core.Vec.rep(controlPoints[0].length,1.0));
		}
		weights1 = _g;
	}
	var _g11 = 0;
	while(_g11 < rows) {
		var i1 = _g11++;
		homo_controlPoints.push(verb.core.Eval.homogenize1d(controlPoints[i1],weights1[i1]));
	}
	return homo_controlPoints;
};
verb.core.Eval.surfaceDerivatives = function(surface,u,v,numDerivs) {
	var n = surface.knotsU.length - surface.degreeU - 2;
	var m = surface.knotsV.length - surface.degreeV - 2;
	return verb.core.Eval.surfaceDerivativesGivenNM(n,m,surface,u,v,numDerivs);
};
verb.core.Eval.surfaceDerivativesGivenNM = function(n,m,surface,u,v,numDerivs) {
	var degreeU = surface.degreeU;
	var degreeV = surface.degreeV;
	var controlPoints = surface.controlPoints;
	var knotsU = surface.knotsU;
	var knotsV = surface.knotsV;
	if(!verb.core.Eval.areValidRelations(degreeU,controlPoints.length,knotsU.length) || !verb.core.Eval.areValidRelations(degreeV,controlPoints[0].length,knotsV.length)) throw "Invalid relations between control points, knot vector, and n";
	var dim = controlPoints[0][0].length;
	var du;
	if(numDerivs < degreeU) du = numDerivs; else du = degreeU;
	var dv;
	if(numDerivs < degreeV) dv = numDerivs; else dv = degreeV;
	var SKL = verb.core.Vec.zeros3d(du + 1,dv + 1,dim);
	var knotSpan_index_u = verb.core.Eval.knotSpanGivenN(n,degreeU,u,knotsU);
	var knotSpan_index_v = verb.core.Eval.knotSpanGivenN(m,degreeV,v,knotsV);
	var uders = verb.core.Eval.derivativeBasisFunctionsGivenNI(knotSpan_index_u,u,degreeU,n,knotsU);
	var vders = verb.core.Eval.derivativeBasisFunctionsGivenNI(knotSpan_index_v,v,degreeV,m,knotsV);
	var temp = verb.core.Vec.zeros2d(degreeV + 1,dim);
	var dd = 0;
	var _g1 = 0;
	var _g = du + 1;
	while(_g1 < _g) {
		var k = _g1++;
		var _g3 = 0;
		var _g2 = degreeV + 1;
		while(_g3 < _g2) {
			var s = _g3++;
			temp[s] = verb.core.Vec.zeros1d(dim);
			var _g5 = 0;
			var _g4 = degreeU + 1;
			while(_g5 < _g4) {
				var r = _g5++;
				temp[s] = verb.core.Vec.add(temp[s],verb.core.Vec.mul(uders[k][r],controlPoints[knotSpan_index_u - degreeU + r][knotSpan_index_v - degreeV + s]));
			}
		}
		var nk = numDerivs - k;
		if(nk < dv) dd = nk; else dd = dv;
		var _g31 = 0;
		var _g21 = dd + 1;
		while(_g31 < _g21) {
			var l = _g31++;
			SKL[k][l] = verb.core.Vec.zeros1d(dim);
			var _g51 = 0;
			var _g41 = degreeV + 1;
			while(_g51 < _g41) {
				var s1 = _g51++;
				SKL[k][l] = verb.core.Vec.add(SKL[k][l],verb.core.Vec.mul(vders[l][s1],temp[s1]));
			}
		}
	}
	return SKL;
};
verb.core.Eval.surfacePoint = function(surface,u,v) {
	var n = surface.knotsU.length - surface.degreeU - 2;
	var m = surface.knotsV.length - surface.degreeV - 2;
	return verb.core.Eval.surfacePointGivenNM(n,m,surface,u,v);
};
verb.core.Eval.surfacePointGivenNM = function(n,m,surface,u,v) {
	var degreeU = surface.degreeU;
	var degreeV = surface.degreeV;
	var controlPoints = surface.controlPoints;
	var knotsU = surface.knotsU;
	var knotsV = surface.knotsV;
	if(!verb.core.Eval.areValidRelations(degreeU,controlPoints.length,knotsU.length) || !verb.core.Eval.areValidRelations(degreeV,controlPoints[0].length,knotsV.length)) throw "Invalid relations between control points, knot vector, and n";
	var dim = controlPoints[0][0].length;
	var knotSpan_index_u = verb.core.Eval.knotSpanGivenN(n,degreeU,u,knotsU);
	var knotSpan_index_v = verb.core.Eval.knotSpanGivenN(m,degreeV,v,knotsV);
	var u_basis_vals = verb.core.Eval.basisFunctionsGivenKnotSpanIndex(knotSpan_index_u,u,degreeU,knotsU);
	var v_basis_vals = verb.core.Eval.basisFunctionsGivenKnotSpanIndex(knotSpan_index_v,v,degreeV,knotsV);
	var uind = knotSpan_index_u - degreeU;
	var vind = knotSpan_index_v;
	var position = verb.core.Vec.zeros1d(dim);
	var temp = verb.core.Vec.zeros1d(dim);
	var _g1 = 0;
	var _g = degreeV + 1;
	while(_g1 < _g) {
		var l = _g1++;
		temp = verb.core.Vec.zeros1d(dim);
		vind = knotSpan_index_v - degreeV + l;
		var _g3 = 0;
		var _g2 = degreeU + 1;
		while(_g3 < _g2) {
			var k = _g3++;
			temp = verb.core.Vec.add(temp,verb.core.Vec.mul(u_basis_vals[k],controlPoints[uind + k][vind]));
		}
		position = verb.core.Vec.add(position,verb.core.Vec.mul(v_basis_vals[l],temp));
	}
	return position;
};
verb.core.Eval.curveDerivatives = function(crv,u,numDerivs) {
	var n = crv.knots.length - crv.degree - 2;
	return verb.core.Eval.curveDerivativesGivenN(n,crv,u,numDerivs);
};
verb.core.Eval.curveDerivativesGivenN = function(n,curve,u,numDerivs) {
	var degree = curve.degree;
	var controlPoints = curve.controlPoints;
	var knots = curve.knots;
	if(!verb.core.Eval.areValidRelations(degree,controlPoints.length,knots.length)) throw "Invalid relations between control points, knot vector, and n";
	var dim = controlPoints[0].length;
	var du;
	if(numDerivs < degree) du = numDerivs; else du = degree;
	var CK = verb.core.Vec.zeros2d(du + 1,dim);
	var knotSpan_index = verb.core.Eval.knotSpanGivenN(n,degree,u,knots);
	var nders = verb.core.Eval.derivativeBasisFunctionsGivenNI(knotSpan_index,u,degree,du,knots);
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
			CK[k1] = verb.core.Vec.add(CK[k1],verb.core.Vec.mul(nders[k1][j1],controlPoints[knotSpan_index - degree + j1]));
		}
	}
	return CK;
};
verb.core.Eval.curvePoint = function(curve,u) {
	var n = curve.knots.length - curve.degree - 2;
	return verb.core.Eval.curvePointGivenN(n,curve,u);
};
verb.core.Eval.areValidRelations = function(degree,num_controlPoints,knots_length) {
	return num_controlPoints + degree + 1 - knots_length == 0;
};
verb.core.Eval.curvePointGivenN = function(n,curve,u) {
	var degree = curve.degree;
	var controlPoints = curve.controlPoints;
	var knots = curve.knots;
	if(!verb.core.Eval.areValidRelations(degree,controlPoints.length,knots.length)) {
		throw "Invalid relations between control points, knot Array, and n";
		return null;
	}
	var knotSpan_index = verb.core.Eval.knotSpanGivenN(n,degree,u,knots);
	var basis_values = verb.core.Eval.basisFunctionsGivenKnotSpanIndex(knotSpan_index,u,degree,knots);
	var position = verb.core.Vec.zeros1d(controlPoints[0].length);
	var _g1 = 0;
	var _g = degree + 1;
	while(_g1 < _g) {
		var j = _g1++;
		position = verb.core.Vec.add(position,verb.core.Vec.mul(basis_values[j],controlPoints[knotSpan_index - degree + j]));
	}
	return position;
};
verb.core.Eval.derivativeBasisFunctions = function(u,degree,knots) {
	var knotSpan_index = verb.core.Eval.knotSpan(degree,u,knots);
	var m = knots.length - 1;
	var n = m - degree - 1;
	return verb.core.Eval.derivativeBasisFunctionsGivenNI(knotSpan_index,u,degree,n,knots);
};
verb.core.Eval.derivativeBasisFunctionsGivenNI = function(knotSpan_index,u,p,n,knots) {
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
verb.core.Eval.basisFunctions = function(u,degree,knots) {
	var knotSpan_index = verb.core.Eval.knotSpan(degree,u,knots);
	return verb.core.Eval.basisFunctionsGivenKnotSpanIndex(knotSpan_index,u,degree,knots);
};
verb.core.Eval.basisFunctionsGivenKnotSpanIndex = function(knotSpan_index,u,degree,knots) {
	var basisFunctions = verb.core.Vec.zeros1d(degree + 1);
	var left = verb.core.Vec.zeros1d(degree + 1);
	var right = verb.core.Vec.zeros1d(degree + 1);
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
verb.core.Eval.knotSpan = function(degree,u,knots) {
	var m = knots.length - 1;
	var n = m - degree - 1;
	return verb.core.Eval.knotSpanGivenN(n,degree,u,knots);
};
verb.core.Eval.knotSpanGivenN = function(n,degree,u,knots) {
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
verb.core.MarchStepState = { __ename__ : true, __constructs__ : ["OutOfBounds","InsideDomain","AtBoundary"] };
verb.core.MarchStepState.OutOfBounds = ["OutOfBounds",0];
verb.core.MarchStepState.OutOfBounds.toString = $estr;
verb.core.MarchStepState.OutOfBounds.__enum__ = verb.core.MarchStepState;
verb.core.MarchStepState.InsideDomain = ["InsideDomain",1];
verb.core.MarchStepState.InsideDomain.toString = $estr;
verb.core.MarchStepState.InsideDomain.__enum__ = verb.core.MarchStepState;
verb.core.MarchStepState.AtBoundary = ["AtBoundary",2];
verb.core.MarchStepState.AtBoundary.toString = $estr;
verb.core.MarchStepState.AtBoundary.__enum__ = verb.core.MarchStepState;
verb.core.MarchStep = function(step,olduv0,olduv1,uv0,uv1,oldpoint,point,state) {
	this.step = step;
	this.olduv0 = olduv0;
	this.olduv1 = olduv1;
	this.uv0 = uv0;
	this.uv1 = uv1;
	this.oldpoint = oldpoint;
	this.point = point;
	this.state = state;
};
verb.core.MarchStep.__name__ = ["verb","core","MarchStep"];
verb.core.MarchStep.outOfBounds = function() {
	return new verb.core.MarchStep(null,null,null,null,null,null,null,verb.core.MarchStepState.OutOfBounds);
};
verb.core.MarchStep.init = function(pt) {
	return new verb.core.MarchStep(null,null,null,pt.uv0,pt.uv1,null,pt.point,verb.core.MarchStepState.InsideDomain);
};
verb.core.ExpIntersect = $hx_exports.core.ExpIntersect = function() { };
verb.core.ExpIntersect.__name__ = ["verb","core","ExpIntersect"];
verb.core.ExpIntersect.outsideDomain = function(surface,uv) {
	var u = uv[0];
	var v = uv[1];
	return u < surface.knotsU[0] || v < surface.knotsV[0] || u > verb.core.ArrayExtensions.last(surface.knotsU) || v > verb.core.ArrayExtensions.last(surface.knotsV);
};
verb.core.ExpIntersect.clampToDomain = function(surface,uv) {
	var u = uv[0];
	var v = uv[1];
	if(u < surface.knotsU[0]) u = surface.knotsU[0];
	if(u > verb.core.ArrayExtensions.last(surface.knotsU)) u = verb.core.ArrayExtensions.last(surface.knotsU);
	if(v < surface.knotsV[0]) v = surface.knotsV[0];
	if(v > verb.core.ArrayExtensions.last(surface.knotsV)) u = verb.core.ArrayExtensions.last(surface.knotsV);
	return [u,v];
};
verb.core.ExpIntersect.clampStep = function(surface,uv,step) {
	var u = uv[0];
	var v = uv[1];
	var nu = u + step[0];
	if(nu > verb.core.ArrayExtensions.last(surface.knotsU) + 1e-10) step = verb.core.Vec.mul((verb.core.ArrayExtensions.last(surface.knotsU) - u) / step[0],step); else if(nu < surface.knotsU[0] - 1e-10) step = verb.core.Vec.mul((surface.knotsU[0] - u) / step[0],step);
	var nv = v + step[1];
	if(nv > verb.core.ArrayExtensions.last(surface.knotsV) + 1e-10) step = verb.core.Vec.mul((verb.core.ArrayExtensions.last(surface.knotsV) - v) / step[1],step); else if(nv < surface.knotsV[0] - 1e-10) step = verb.core.Vec.mul((surface.knotsV[0] - v) / step[1],step);
	return step;
};
verb.core.ExpIntersect.march = function(surface0,surface1,prev,tol) {
	var uv0 = prev.uv0;
	var uv1 = prev.uv1;
	var derivs0 = verb.core.Eval.rationalSurfaceDerivatives(surface0,uv0[0],uv0[1],1);
	var derivs1 = verb.core.Eval.rationalSurfaceDerivatives(surface1,uv1[0],uv1[1],1);
	var p = derivs0[0][0];
	var q = derivs1[0][0];
	var dfdu = derivs0[1][0];
	var dfdv = derivs0[0][1];
	var dgdu = derivs1[1][0];
	var dgdv = derivs1[0][1];
	var norm0 = verb.core.Vec.cross(dfdu,dfdv);
	var norm1 = verb.core.Vec.cross(dgdu,dgdv);
	var unitStep = verb.core.Vec.normalized(verb.core.Vec.cross(norm0,norm1));
	var stepLength = verb.core.ExpIntersect.INIT_STEP_LENGTH;
	if(prev.oldpoint != null) {
		var denom = Math.acos(verb.core.Vec.dot(verb.core.Vec.normalized(prev.step),unitStep));
		if(Math.abs(denom) < 1e-10) stepLength = verb.core.ExpIntersect.LINEAR_STEP_LENGTH; else {
			var radiusOfCurvature = verb.core.Vec.dist(prev.oldpoint,prev.point) / Math.acos(verb.core.Vec.dot(verb.core.Vec.normalized(prev.step),unitStep));
			var theta = 2 * Math.acos(1 - tol / radiusOfCurvature);
			stepLength = radiusOfCurvature * Math.tan(theta);
		}
	}
	var step = verb.core.Vec.mul(stepLength,unitStep);
	var x = verb.core.Vec.add(prev.point,step);
	var pdif = verb.core.Vec.sub(x,p);
	var qdif = verb.core.Vec.sub(x,q);
	var rw = verb.core.Vec.cross(dfdu,norm0);
	var rt = verb.core.Vec.cross(dfdv,norm0);
	var su = verb.core.Vec.cross(dgdu,norm1);
	var sv = verb.core.Vec.cross(dgdv,norm1);
	var dw = verb.core.Vec.dot(rt,pdif) / verb.core.Vec.dot(rt,dfdu);
	var dt = verb.core.Vec.dot(rw,pdif) / verb.core.Vec.dot(rw,dfdv);
	var du = verb.core.Vec.dot(sv,qdif) / verb.core.Vec.dot(sv,dgdu);
	var dv = verb.core.Vec.dot(su,qdif) / verb.core.Vec.dot(su,dgdv);
	var stepuv0 = [dw,dt];
	var stepuv1 = [du,dv];
	var state = verb.core.MarchStepState.InsideDomain;
	var newuv0 = verb.core.Vec.add(uv0,stepuv0);
	var newuv1 = verb.core.Vec.add(uv1,stepuv1);
	if(verb.core.ExpIntersect.outsideDomain(surface0,newuv0)) {
		state = verb.core.MarchStepState.AtBoundary;
		var l = verb.core.Vec.norm(stepuv0);
		stepuv0 = verb.core.ExpIntersect.clampStep(surface0,uv0,stepuv0);
		stepuv1 = verb.core.Vec.mul(verb.core.Vec.norm(stepuv0) / l,stepuv1);
	}
	if(verb.core.ExpIntersect.outsideDomain(surface1,newuv1)) {
		state = verb.core.MarchStepState.AtBoundary;
		var l1 = verb.core.Vec.norm(stepuv1);
		stepuv1 = verb.core.ExpIntersect.clampStep(surface1,uv1,stepuv1);
		stepuv0 = verb.core.Vec.mul(verb.core.Vec.norm(stepuv1) / l1,stepuv0);
	}
	newuv0 = verb.core.Vec.add(uv0,stepuv0);
	newuv1 = verb.core.Vec.add(uv1,stepuv1);
	var relaxed = verb.core.Intersect.surfacesAtPointWithEstimate(surface0,surface1,newuv0,newuv1,tol);
	return new verb.core.MarchStep(step,prev.uv0,prev.uv1,relaxed.uv0,relaxed.uv1,prev.point,relaxed.point,state);
};
verb.core.ExpIntersect.completeMarch = function(surface0,surface1,start,tol) {
	var step = verb.core.ExpIntersect.march(surface0,surface1,verb.core.MarchStep.init(start),tol);
	if(step.state == verb.core.MarchStepState.AtBoundary) return null;
	var $final = [];
	$final.push(start);
	while(step.state != verb.core.MarchStepState.AtBoundary) {
		$final.push(new verb.core.types.SurfaceSurfaceIntersectionPoint(step.uv0,step.uv1,step.point,-1));
		step = verb.core.ExpIntersect.march(surface0,surface1,step,tol);
	}
	$final.push(new verb.core.types.SurfaceSurfaceIntersectionPoint(step.uv0,step.uv1,step.point,-1));
	return $final;
};
verb.core.ExpIntersect.surfaces = function(surface0,surface1,tol) {
	var exactOuter = verb.core.ExpIntersect.intersectBoundaryCurves(surface0,surface1,tol);
	var $final = [];
	var _g = 0;
	while(_g < exactOuter.length) {
		var $int = exactOuter[_g];
		++_g;
		var res = verb.core.ExpIntersect.completeMarch(surface0,surface1,$int,tol);
		if(res != null) $final.push(res);
	}
	var approxInner = verb.core.ExpIntersect.approxInnerCriticalPts(surface0,surface1);
	return $final;
};
verb.core.ExpIntersect.refineInnerCriticalPts = function(surface0,surface1,approx,tol) {
	return approx.map(function(x) {
		return verb.core.ExpIntersect.refineCriticalPt(surface0,surface1,x,tol);
	});
};
verb.core.ExpIntersect.refineCriticalPt = function(surface0,surface1,approx,tol) {
	var obj = function(x) {
		var d0 = verb.core.Eval.rationalSurfaceDerivatives(surface0,x[0],x[1],1);
		var d1 = verb.core.Eval.rationalSurfaceDerivatives(surface1,x[2],x[3],1);
		var n0 = verb.core.Vec.normalized(verb.core.Vec.cross(d0[1][0],d0[0][1]));
		var n1 = verb.core.Vec.normalized(verb.core.Vec.cross(d1[1][0],d1[0][1]));
		var vec = verb.core.Vec.sub(d0[0][0],d1[0][0]);
		var dist = verb.core.Vec.normSquared(vec);
		var vecnorm = verb.core.Vec.dot(vec,n1);
		var normdot = verb.core.Vec.dot(n0,n1);
		return dist - vecnorm * vecnorm + 1 - normdot * normdot;
	};
	var start = [approx.item0[0],approx.item0[1],approx.item1[0],approx.item1[1]];
	var sol = verb.core.Numeric.uncmin(obj,start,tol);
	var $final = sol.solution;
	return new verb.core.types.Pair([$final[0],$final[1]],[$final[2],$final[3]]);
};
verb.core.ExpIntersect.verifyInnerCriticalPts = function(surface0,surface1,approx) {
	return null;
};
verb.core.ExpIntersect.boundingBoxLeaves = function(division) {
	if(division.indivisible(0)) return [division["yield"]()];
	var halves = division.split();
	return verb.core.ExpIntersect.boundingBoxLeaves(halves.item0).concat(verb.core.ExpIntersect.boundingBoxLeaves(halves.item1));
};
verb.core.ExpIntersect.approxInnerCriticalPts = function(surface0,surface1) {
	var div0 = new verb.core.types.LazySurfaceBoundingBoxTree(surface0,false,0.125,0.125);
	var div1 = new verb.core.types.LazySurfaceBoundingBoxTree(surface1,false,0.125,0.125);
	var res = verb.core.Intersect.boundingBoxTrees(div0,div1,0);
	haxe.Log.trace(res.length,{ fileName : "ExpIntersect.hx", lineNumber : 327, className : "verb.core.ExpIntersect", methodName : "approxInnerCriticalPts", customParams : ["TOTAL INTERSECTING SUB-SURFACES"]});
	var numSamples = 5;
	var criticalPts = [];
	var _g = 0;
	while(_g < res.length) {
		var srfpair = res[_g];
		++_g;
		var a = verb.core.ExpIntersect.approxSurfaceDelPhiField(srfpair.item0,srfpair.item1,numSamples,numSamples);
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
				var num = verb.core.ExpIntersect.approxRotationNumber([f[i][j - 1],f[i][j],f[i - 1][j],f[i - 1][j - 1]]);
				if(num != 0) {
					var midU0 = (uvs0[i][j][1] + uvs0[i][j - 1][1]) / 2;
					var midV0 = (uvs0[i][j][0] + uvs0[i - 1][j][0]) / 2;
					var midU1 = (uvs1[i][j][1] + uvs1[i][j - 1][1]) / 2;
					var midV1 = (uvs1[i][j][0] + uvs1[i - 1][j][0]) / 2;
					criticalPts.push(new verb.core.types.Pair([midU0,midV0],[midU1,midV1]));
				}
			}
		}
	}
	return criticalPts;
};
verb.core.ExpIntersect.approxRotationNumber = function(vs) {
	var sum = 0.0;
	var l = vs.length;
	var _g1 = 1;
	var _g = l + 1;
	while(_g1 < _g) {
		var i = _g1++;
		var ang = verb.core.Vec.angleBetweenNormalized2d(vs[i - 1],vs[i % l]);
		sum += Math.abs(ang);
	}
	return Math.floor(Math.abs(sum / (2 * Math.PI)));
};
verb.core.ExpIntersect.approxSurfaceDelPhiField = function(surface0,surface1,divs_u,divs_v) {
	var tess0 = verb.core.ExpIntersect.sampleSurfaceRegular(surface0,divs_u,divs_v);
	var tess1 = verb.core.ExpIntersect.sampleSurfaceRegular(surface1,divs_u,divs_v);
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
			var minDist = Math.POSITIVE_INFINITY;
			var minUV = [Math.POSITIVE_INFINITY,Math.POSITIVE_INFINITY];
			var _g5 = 0;
			var _g4 = tess1.uvs.length;
			while(_g5 < _g4) {
				var k = _g5++;
				var _g7 = 0;
				var _g6 = tess1.uvs[k].length;
				while(_g7 < _g6) {
					var l = _g7++;
					var dist = verb.core.Vec.distSquared(tess0.points[i][j],tess0.points[k][l]);
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
			var derivs0 = verb.core.Eval.rationalSurfaceDerivatives(surface0,uv0[0],uv0[1]);
			var derivs1 = verb.core.Eval.rationalSurfaceDerivatives(surface1,uv1[0],uv1[1]);
			var n2 = verb.core.Vec.normalized(verb.core.Vec.cross(derivs1[1][0],derivs1[0][1]));
			var ru = derivs0[1][0];
			var rv = derivs0[0][1];
			var delphi = verb.core.Vec.normalized([verb.core.Vec.dot(n2,ru),verb.core.Vec.dot(n2,rv)]);
			delphirow.push(delphi);
		}
	}
	return { uvs0 : tess0.uvs, uvs1 : minuvs, delphi : delphifield};
};
verb.core.ExpIntersect.sampleSurfaceRegular = function(surface,divs_u,divs_v) {
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
			pointsrow.push(verb.core.Eval.rationalSurfacePoint(surface,pt_u,pt_v));
		}
	}
	return { uvs : uvs, points : points};
};
verb.core.ExpIntersect.intersectBoundaryCurves = function(surface0,surface1,tol) {
	var srf0bs = verb.core.Make.surfaceBoundaryCurves(surface0);
	var srf1bs = verb.core.Make.surfaceBoundaryCurves(surface1);
	var ints = [];
	var _g1 = 0;
	var _g = srf0bs.length;
	while(_g1 < _g) {
		var i = _g1++;
		var crv = srf0bs[i];
		var res = verb.core.Intersect.curveAndSurface(crv,surface1,tol);
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
				uv = [verb.core.ArrayExtensions.last(surface0.knotsU),$int.u];
				break;
			case 2:
				uv = [$int.u,surface0.knotsV[0]];
				break;
			default:
				uv = [$int.u,verb.core.ArrayExtensions.last(surface0.knotsV)];
			}
			var dist = verb.core.Vec.dist($int.curvePoint,$int.surfacePoint);
			ints.push(new verb.core.types.SurfaceSurfaceIntersectionPoint(uv,$int.uv,$int.curvePoint,dist));
		}
	}
	var _g11 = 0;
	var _g3 = srf1bs.length;
	while(_g11 < _g3) {
		var i1 = _g11++;
		var crv1 = srf1bs[i1];
		var res1 = verb.core.Intersect.curveAndSurface(crv1,surface0,tol);
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
				uv1 = [verb.core.ArrayExtensions.last(surface1.knotsU),int1.u];
				break;
			case 2:
				uv1 = [int1.u,surface1.knotsV[0]];
				break;
			default:
				uv1 = [int1.u,verb.core.ArrayExtensions.last(surface1.knotsV)];
			}
			var dist1 = verb.core.Vec.dist(int1.curvePoint,int1.surfacePoint);
			ints.push(new verb.core.types.SurfaceSurfaceIntersectionPoint(int1.uv,uv1,int1.curvePoint,dist1));
		}
	}
	return verb.core.ArrayExtensions.unique(ints,function(a,b) {
		return Math.abs(a.uv0[0] - b.uv0[0]) < tol && Math.abs(a.uv0[1] - b.uv0[1]) < tol;
	});
};
verb.core.Intersect = $hx_exports.core.Intersect = function() { };
verb.core.Intersect.__name__ = ["verb","core","Intersect"];
verb.core.Intersect.meshSlices = function(mesh,min,max,step) {
	var bbtree = new verb.core.types.MeshBoundingBoxTree(mesh);
	var bb = bbtree.boundingBox();
	var x0 = bb.min[0];
	var y0 = bb.min[1];
	var x1 = bb.max[0];
	var y1 = bb.max[1];
	var span = verb.core.Vec.span(min,max,step);
	var slices = [];
	var _g = 0;
	while(_g < span.length) {
		var z = span[_g];
		++_g;
		var pts = [[x0,y0,z],[x1,y0,z],[x1,y1,z],[x0,y1,z]];
		var uvs = [[0.0,0.0],[1.0,0.0],[1.0,1.0],[0.0,1.0]];
		var faces = [[0,1,2],[0,2,3]];
		var plane = new verb.core.types.MeshData(faces,pts,null,uvs);
		slices.push(verb.core.Intersect.meshes(mesh,plane,bbtree));
		z += 1.0;
	}
	return slices;
};
verb.core.Intersect.surfaces = function(surface0,surface1,tol) {
	var tess1 = verb.core.Tess.rationalSurfaceAdaptive(surface0);
	var tess2 = verb.core.Tess.rationalSurfaceAdaptive(surface1);
	var resApprox = verb.core.Intersect.meshes(tess1,tess2);
	var exactPls = resApprox.map(function(pl) {
		return pl.map(function(inter) {
			return verb.core.Intersect.surfacesAtPointWithEstimate(surface0,surface1,inter.uv0,inter.uv1,tol);
		});
	});
	return exactPls.map(function(x) {
		return verb.core.Make.rationalInterpCurve(x.map(function(y) {
			return y.point;
		}),3);
	});
};
verb.core.Intersect.surfacesAtPointWithEstimate = function(surface0,surface1,uv1,uv2,tol) {
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
		pds = verb.core.Eval.rationalSurfaceDerivatives(surface0,uv1[0],uv1[1],1);
		p = pds[0][0];
		pu = pds[1][0];
		pv = pds[0][1];
		pn = verb.core.Vec.normalized(verb.core.Vec.cross(pu,pv));
		pd = verb.core.Vec.dot(pn,p);
		qds = verb.core.Eval.rationalSurfaceDerivatives(surface1,uv2[0],uv2[1],1);
		q = qds[0][0];
		qu = qds[1][0];
		qv = qds[0][1];
		qn = verb.core.Vec.normalized(verb.core.Vec.cross(qu,qv));
		qd = verb.core.Vec.dot(qn,q);
		dist = verb.core.Vec.distSquared(p,q);
		if(dist < tol * tol) break;
		var fn = verb.core.Vec.normalized(verb.core.Vec.cross(pn,qn));
		var fd = verb.core.Vec.dot(fn,p);
		var x = verb.core.Intersect.threePlanes(pn,pd,qn,qd,fn,fd);
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
	return new verb.core.types.SurfaceSurfaceIntersectionPoint(uv1,uv2,p,dist);
};
verb.core.Intersect.meshes = function(mesh0,mesh1,bbtree0,bbtree1) {
	if(bbtree0 == null) bbtree0 = new verb.core.types.LazyMeshBoundingBoxTree(mesh0);
	if(bbtree1 == null) bbtree1 = new verb.core.types.LazyMeshBoundingBoxTree(mesh1);
	var bbints = verb.core.Intersect.boundingBoxTrees(bbtree0,bbtree1,0);
	var segments = verb.core.ArrayExtensions.unique(bbints.map(function(ids) {
		return verb.core.Intersect.triangles(mesh0,ids.item0,mesh1,ids.item1);
	}).filter(function(x) {
		return x != null;
	}).filter(function(x1) {
		return verb.core.Vec.distSquared(x1.min.point,x1.max.point) > 1e-10;
	}),function(a,b) {
		var s1 = verb.core.Vec.sub(a.min.uv0,b.min.uv0);
		var d1 = verb.core.Vec.dot(s1,s1);
		var s2 = verb.core.Vec.sub(a.max.uv0,b.max.uv0);
		var d2 = verb.core.Vec.dot(s2,s2);
		var s3 = verb.core.Vec.sub(a.min.uv0,b.max.uv0);
		var d3 = verb.core.Vec.dot(s3,s3);
		var s4 = verb.core.Vec.sub(a.max.uv0,b.min.uv0);
		var d4 = verb.core.Vec.dot(s4,s4);
		return d1 < 1e-10 && d2 < 1e-10 || d3 < 1e-10 && d4 < 1e-10;
	});
	return verb.core.Intersect.makeMeshIntersectionPolylines(segments);
};
verb.core.Intersect.makeMeshIntersectionPolylines = function(segments) {
	if(segments.length == 0) return [];
	var _g = 0;
	while(_g < segments.length) {
		var s = segments[_g];
		++_g;
		s.max.opp = s.min;
		s.min.opp = s.max;
	}
	var tree = verb.core.Intersect.kdTreeFromSegments(segments);
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
		var adjEnd = verb.core.Intersect.lookupAdjacentSegment(segEnd,tree,segments.length);
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
verb.core.Intersect.kdTreeFromSegments = function(segments) {
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
verb.core.Intersect.lookupAdjacentSegment = function(segEnd,tree,numResults) {
	var adj = tree.nearest(segEnd.point,numResults,1e-10).filter(function(r) {
		return segEnd != r.item0.obj;
	}).map(function(r1) {
		return r1.item0.obj;
	});
	if(adj.length == 1) return adj[0]; else return null;
};
verb.core.Intersect.curveAndSurface = function(curve,surface,tol,crvBbTree,srfBbTree) {
	if(tol == null) tol = 1e-3;
	if(crvBbTree != null) crvBbTree = crvBbTree; else crvBbTree = new verb.core.types.LazyCurveBoundingBoxTree(curve);
	if(srfBbTree != null) srfBbTree = srfBbTree; else srfBbTree = new verb.core.types.LazySurfaceBoundingBoxTree(surface);
	var ints = verb.core.Intersect.boundingBoxTrees(crvBbTree,srfBbTree,tol);
	return verb.core.ArrayExtensions.unique(ints.map(function(inter) {
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
		return verb.core.Intersect.curveAndSurfaceWithEstimate(crvSeg,srfPart,[u].concat(uv),tol);
	}).filter(function(x) {
		return verb.core.Vec.distSquared(x.curvePoint,x.surfacePoint) < tol * tol;
	}),function(a,b) {
		return Math.abs(a.u - b.u) < 0.5 * tol;
	});
};
verb.core.Intersect.curveAndSurfaceWithEstimate = function(curve,surface,start_params,tol) {
	if(tol == null) tol = 1e-3;
	var objective = function(x) {
		var p1 = verb.core.Eval.rationalCurvePoint(curve,x[0]);
		var p2 = verb.core.Eval.rationalSurfacePoint(surface,x[1],x[2]);
		var p1_p2 = verb.core.Vec.sub(p1,p2);
		return verb.core.Vec.dot(p1_p2,p1_p2);
	};
	var grad = function(x1) {
		var dc = verb.core.Eval.rationalCurveDerivatives(curve,x1[0],1);
		var ds = verb.core.Eval.rationalSurfaceDerivatives(surface,x1[1],x1[2],1);
		var r = verb.core.Vec.sub(ds[0][0],dc[0]);
		var drdt = verb.core.Vec.mul(-1.0,dc[1]);
		var drdu = ds[1][0];
		var drdv = ds[0][1];
		return [2.0 * verb.core.Vec.dot(drdt,r),2.0 * verb.core.Vec.dot(drdu,r),2.0 * verb.core.Vec.dot(drdv,r)];
	};
	var sol_obj = verb.core.Numeric.uncmin(objective,start_params,tol * tol,grad);
	var $final = sol_obj.solution;
	return new verb.core.types.CurveSurfaceIntersection($final[0],[$final[1],$final[2]],verb.core.Eval.rationalCurvePoint(curve,$final[0]),verb.core.Eval.rationalSurfacePoint(surface,$final[1],$final[2]));
};
verb.core.Intersect.polylineAndMesh = function(polyline,mesh,tol) {
	var res = verb.core.Intersect.boundingBoxTrees(new verb.core.types.LazyPolylineBoundingBoxTree(polyline),new verb.core.types.LazyMeshBoundingBoxTree(mesh),tol);
	var finalResults = [];
	var _g = 0;
	while(_g < res.length) {
		var event = res[_g];
		++_g;
		var polid = event.item0;
		var faceid = event.item1;
		var inter = verb.core.Intersect.segmentWithTriangle(polyline.points[polid],polyline.points[polid + 1],mesh.points,mesh.faces[faceid]);
		if(inter == null) continue;
		var pt = inter.point;
		var u = verb.core.Vec.lerp(inter.p,[polyline.params[polid]],[polyline.params[polid + 1]])[0];
		var uv = verb.core.Mesh.triangleUVFromPoint(mesh,faceid,pt);
		finalResults.push(new verb.core.types.PolylineMeshIntersection(pt,u,uv,polid,faceid));
	}
	return finalResults;
};
verb.core.Intersect.boundingBoxTrees = function(a,b,tol) {
	if(tol == null) tol = 1e-9;
	if(a.empty() || b.empty()) return [];
	if(!a.boundingBox().intersects(b.boundingBox(),tol)) return [];
	var ai = a.indivisible(tol);
	var bi = b.indivisible(tol);
	if(ai && bi) return [new verb.core.types.Pair(a["yield"](),b["yield"]())]; else if(ai && !bi) {
		var bs = b.split();
		return verb.core.Intersect.boundingBoxTrees(a,bs.item0,tol).concat(verb.core.Intersect.boundingBoxTrees(a,bs.item1,tol));
	} else if(!ai && bi) {
		var $as = a.split();
		return verb.core.Intersect.boundingBoxTrees($as.item0,b,tol).concat(verb.core.Intersect.boundingBoxTrees($as.item1,b,tol));
	}
	var as1 = a.split();
	var bs1 = b.split();
	return verb.core.Intersect.boundingBoxTrees(as1.item0,bs1.item0,tol).concat(verb.core.Intersect.boundingBoxTrees(as1.item0,bs1.item1,tol)).concat(verb.core.Intersect.boundingBoxTrees(as1.item1,bs1.item0,tol)).concat(verb.core.Intersect.boundingBoxTrees(as1.item1,bs1.item1,tol));
};
verb.core.Intersect.curves = function(curve1,curve2,tolerance) {
	var ints = verb.core.Intersect.boundingBoxTrees(new verb.core.types.LazyCurveBoundingBoxTree(curve1),new verb.core.types.LazyCurveBoundingBoxTree(curve2),0);
	return verb.core.ArrayExtensions.unique(ints.map(function(x) {
		return verb.core.Intersect.curvesWithEstimate(curve1,curve2,x.item0.knots[0],x.item1.knots[0],tolerance);
	}).filter(function(x1) {
		return verb.core.Vec.distSquared(x1.point0,x1.point1) < tolerance;
	}),function(a,b) {
		return Math.abs(a.u0 - b.u0) < tolerance * 5;
	});
};
verb.core.Intersect.curvesWithEstimate = function(curve0,curve1,u0,u1,tolerance) {
	var objective = function(x) {
		var p1 = verb.core.Eval.rationalCurvePoint(curve0,x[0]);
		var p2 = verb.core.Eval.rationalCurvePoint(curve1,x[1]);
		var p1_p2 = verb.core.Vec.sub(p1,p2);
		return verb.core.Vec.dot(p1_p2,p1_p2);
	};
	var grad = function(x1) {
		var dc0 = verb.core.Eval.rationalCurveDerivatives(curve0,x1[0],1);
		var dc1 = verb.core.Eval.rationalCurveDerivatives(curve1,x1[1],1);
		var r = verb.core.Vec.sub(dc0[0],dc1[0]);
		var drdu = dc0[1];
		var drdt = verb.core.Vec.mul(-1.0,dc1[1]);
		return [2.0 * verb.core.Vec.dot(drdu,r),2.0 * verb.core.Vec.dot(drdt,r)];
	};
	var sol_obj = verb.core.Numeric.uncmin(objective,[u0,u1],tolerance * tolerance,grad);
	var u11 = sol_obj.solution[0];
	var u2 = sol_obj.solution[1];
	var p11 = verb.core.Eval.rationalCurvePoint(curve0,u11);
	var p21 = verb.core.Eval.rationalCurvePoint(curve1,u2);
	return new verb.core.types.CurveCurveIntersection(p11,p21,u11,u2);
};
verb.core.Intersect.triangles = function(mesh0,faceIndex0,mesh1,faceIndex1) {
	var tri0 = mesh0.faces[faceIndex0];
	var tri1 = mesh1.faces[faceIndex1];
	var n0 = verb.core.Mesh.getTriangleNorm(mesh0.points,tri0);
	var n1 = verb.core.Mesh.getTriangleNorm(mesh1.points,tri1);
	var o0 = mesh0.points[tri0[0]];
	var o1 = mesh1.points[tri1[0]];
	var ray = verb.core.Intersect.planes(o0,n0,o1,n1);
	if(ray == null) return null;
	var clip1 = verb.core.Intersect.clipRayInCoplanarTriangle(ray,mesh0,faceIndex0);
	if(clip1 == null) return null;
	var clip2 = verb.core.Intersect.clipRayInCoplanarTriangle(ray,mesh1,faceIndex1);
	if(clip2 == null) return null;
	var merged = verb.core.Intersect.mergeTriangleClipIntervals(clip1,clip2,mesh0,faceIndex0,mesh1,faceIndex1);
	if(merged == null) return null;
	return new verb.core.types.Interval(new verb.core.types.MeshIntersectionPoint(merged.min.uv0,merged.min.uv1,merged.min.point,faceIndex0,faceIndex1),new verb.core.types.MeshIntersectionPoint(merged.max.uv0,merged.max.uv1,merged.max.point,faceIndex0,faceIndex1));
};
verb.core.Intersect.clipRayInCoplanarTriangle = function(ray,mesh,faceIndex) {
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
		if(useg < -1e-10 || useg > l[i] + 1e-10) continue;
		if(minU == null || uray < minU.u) minU = new verb.core.types.CurveTriPoint(uray,verb.core.Vec.onRay(ray.origin,ray.dir,uray),verb.core.Vec.onRay(uvs[i],uvd[i],useg / l[i]));
		if(maxU == null || uray > maxU.u) maxU = new verb.core.types.CurveTriPoint(uray,verb.core.Vec.onRay(ray.origin,ray.dir,uray),verb.core.Vec.onRay(uvs[i],uvd[i],useg / l[i]));
	}
	if(maxU == null || minU == null) return null;
	return new verb.core.types.Interval(minU,maxU);
};
verb.core.Intersect.mergeTriangleClipIntervals = function(clip1,clip2,mesh1,faceIndex1,mesh2,faceIndex2) {
	if(clip2.min.u > clip1.max.u + 1e-10 || clip1.min.u > clip2.max.u + 1e-10) return null;
	var min;
	if(clip1.min.u > clip2.min.u) min = new verb.core.types.Pair(clip1.min,0); else min = new verb.core.types.Pair(clip2.min,1);
	var max;
	if(clip1.max.u < clip2.max.u) max = new verb.core.types.Pair(clip1.max,0); else max = new verb.core.types.Pair(clip2.max,1);
	var res = new verb.core.types.Interval(new verb.core.types.MeshIntersectionPoint(null,null,min.item0.point,faceIndex1,faceIndex2),new verb.core.types.MeshIntersectionPoint(null,null,max.item0.point,faceIndex1,faceIndex2));
	if(min.item1 == 0) {
		res.min.uv0 = min.item0.uv;
		res.min.uv1 = verb.core.Mesh.triangleUVFromPoint(mesh2,faceIndex2,min.item0.point);
	} else {
		res.min.uv0 = verb.core.Mesh.triangleUVFromPoint(mesh1,faceIndex1,min.item0.point);
		res.min.uv1 = min.item0.uv;
	}
	if(max.item1 == 0) {
		res.max.uv0 = max.item0.uv;
		res.max.uv1 = verb.core.Mesh.triangleUVFromPoint(mesh2,faceIndex2,max.item0.point);
	} else {
		res.max.uv0 = verb.core.Mesh.triangleUVFromPoint(mesh1,faceIndex1,max.item0.point);
		res.max.uv1 = max.item0.uv;
	}
	return res;
};
verb.core.Intersect.planes = function(origin0,normal0,origin1,normal1) {
	var d = verb.core.Vec.cross(normal0,normal1);
	if(verb.core.Vec.dot(d,d) < 1e-10) return null;
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
	return new verb.core.types.Ray(p,verb.core.Vec.normalized(d));
};
verb.core.Intersect.threePlanes = function(n0,d0,n1,d1,n2,d2) {
	var u = verb.core.Vec.cross(n1,n2);
	var den = verb.core.Vec.dot(n0,u);
	if(Math.abs(den) < 1e-10) return null;
	var diff = verb.core.Vec.sub(verb.core.Vec.mul(d2,n1),verb.core.Vec.mul(d1,n2));
	var num = verb.core.Vec.add(verb.core.Vec.mul(d0,u),verb.core.Vec.cross(n0,diff));
	return verb.core.Vec.mul(1 / den,num);
};
verb.core.Intersect.polylines = function(polyline0,polyline1,tol) {
	var res = verb.core.Intersect.boundingBoxTrees(new verb.core.types.LazyPolylineBoundingBoxTree(polyline0),new verb.core.types.LazyPolylineBoundingBoxTree(polyline1),tol);
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
		if(dist < tol * tol) return new verb.core.types.CurveCurveIntersection(point0,point1,u0,u1);
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
	if(Math.abs(div) < 1e-10) return null;
	var num = dab * (dab0 - daa0) - daa * (dbb0 - dba0);
	var w = num / div;
	var t = (dab0 - daa0 + w * dab) / daa;
	var p0 = verb.core.Vec.onRay(a0,a,t);
	var p1 = verb.core.Vec.onRay(b0,b,w);
	return new verb.core.types.CurveCurveIntersection(p0,p1,t,w);
};
verb.core.Intersect.segmentWithTriangle = function(p0,p1,points,tri) {
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
	if(Math.abs(b) < 1e-10) return null;
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
	if(Math.abs(denom) < 1e-10) return null;
	var s = (uv * wv - vv * wu) / denom;
	var t = (uv * wu - uu * wv) / denom;
	if(s > 1.0000000001 || t > 1.0000000001 || t < -1e-10 || s < -1e-10 || s + t > 1.0000000001) return null;
	return new verb.core.types.TriSegmentIntersection(pt,s,t,r);
};
verb.core.Intersect.segmentAndPlane = function(p0,p1,v0,n) {
	var denom = verb.core.Vec.dot(n,verb.core.Vec.sub(p0,p1));
	if(Math.abs(denom) < 1e-10) return null;
	var numer = verb.core.Vec.dot(n,verb.core.Vec.sub(v0,p0));
	return { p : numer / denom};
};
verb.core.KdPoint = $hx_exports.core.KdPoint = function(point,obj) {
	this.point = point;
	this.obj = obj;
};
verb.core.KdPoint.__name__ = ["verb","core","KdPoint"];
verb.core.KdNode = $hx_exports.core.KdNode = function(kdPoint,dimension,parent) {
	this.kdPoint = kdPoint;
	this.left = null;
	this.right = null;
	this.parent = parent;
	this.dimension = dimension;
};
verb.core.KdNode.__name__ = ["verb","core","KdNode"];
verb.core.KdTree = $hx_exports.core.KdTree = function(points,distanceFunction) {
	this.dim = 3;
	this.points = points;
	this.distanceFunction = distanceFunction;
	this.dim = points[0].point.length;
	this.root = this.buildTree(points,0,null);
};
verb.core.KdTree.__name__ = ["verb","core","KdTree"];
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
		var _g4 = 0;
		while(_g4 < maxNodes) {
			var i3 = _g4++;
			bestNodes.push(new verb.core.types.Pair(null,maxDistance));
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
verb.core.BinaryHeap.__name__ = ["verb","core","BinaryHeap"];
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
verb.core.Make = $hx_exports.core.Make = function() { };
verb.core.Make.__name__ = ["verb","core","Make"];
verb.core.Make.rationalTranslationalSurface = function(profile,rail) {
	var pt0 = verb.core.Eval.rationalCurvePoint(rail,rail.knots[0]);
	var startu = rail.knots[0];
	var endu = verb.core.ArrayExtensions.last(rail.knots);
	var numSamples = 2 * rail.controlPoints.length;
	var span = (endu - startu) / (numSamples - 1);
	var crvs = [];
	var _g = 0;
	while(_g < numSamples) {
		var i = _g++;
		var pt = verb.core.Vec.sub(verb.core.Eval.rationalCurvePoint(rail,startu + i * span),pt0);
		var crv = verb.core.Modify.rationalCurveTransform(profile,[[1,0,0,pt[0]],[0,1,0,pt[1]],[0,0,1,pt[2]],[0,0,0,1]]);
		crvs.push(crv);
	}
	return verb.core.Make.loftedSurface(crvs);
};
verb.core.Make.surfaceBoundaryCurves = function(surface) {
	var crvs = [];
	var c0 = verb.core.Make.surfaceIsocurve(surface,surface.knotsU[0],false);
	var c1 = verb.core.Make.surfaceIsocurve(surface,verb.core.ArrayExtensions.last(surface.knotsU),false);
	var c2 = verb.core.Make.surfaceIsocurve(surface,surface.knotsV[0],true);
	var c3 = verb.core.Make.surfaceIsocurve(surface,verb.core.ArrayExtensions.last(surface.knotsV),true);
	return [c0,c1,c2,c3];
};
verb.core.Make.surfaceIsocurve = function(surface,u,useV) {
	if(useV == null) useV = false;
	var knots;
	if(useV) knots = surface.knotsV; else knots = surface.knotsU;
	var degree;
	if(useV) degree = surface.degreeV; else degree = surface.degreeU;
	var knotMults = verb.core.Analyze.knotMultiplicities(knots);
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
	if(numKnotsToInsert > 0) newSrf = verb.core.Modify.surfaceKnotRefine(surface,verb.core.Vec.rep(numKnotsToInsert,u),useV); else newSrf = surface;
	var span = verb.core.Eval.knotSpan(degree,u,knots);
	if(Math.abs(u - knots[0]) < 1e-10) span = 0; else if(Math.abs(u - knots[knots.length - 1]) < 1e-10) span = (useV?newSrf.controlPoints[0].length:newSrf.controlPoints.length) - 1;
	if(useV) return new verb.core.types.NurbsCurveData(newSrf.degreeU,newSrf.knotsU,(function($this) {
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
	return new verb.core.types.NurbsCurveData(newSrf.degreeV,newSrf.knotsV,newSrf.controlPoints[span]);
};
verb.core.Make.loftedSurface = function(curves,degreeV) {
	curves = verb.core.Modify.unifyCurveKnotVectors(curves);
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
		var c = verb.core.Make.rationalInterpCurve(points,degreeV,true);
		controlPoints.push(c.controlPoints);
		knotsV = c.knots;
	}
	return new verb.core.types.NurbsSurfaceData(degreeU,degreeV,knotsU,knotsV,controlPoints);
};
verb.core.Make.clonedCurve = function(curve) {
	return new verb.core.types.NurbsCurveData(curve.degree,curve.knots.slice(),curve.controlPoints.map(function(x) {
		return x.slice();
	}));
};
verb.core.Make.rationalBezierCurve = function(controlPoints,weights) {
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
	if(weights == null) weights = verb.core.Vec.rep(controlPoints.length,1.0);
	return new verb.core.types.NurbsCurveData(degree,knots,verb.core.Eval.homogenize1d(controlPoints,weights));
};
verb.core.Make.fourPointSurface = function(p1,p2,p3,p4,degree) {
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
	return new verb.core.types.NurbsSurfaceData(degree,degree,zeros.concat(ones),zeros.concat(ones),pts);
};
verb.core.Make.ellipseArc = function(center,xaxis,yaxis,startAngle,endAngle) {
	var xradius = verb.core.Vec.norm(xaxis);
	var yradius = verb.core.Vec.norm(yaxis);
	xaxis = verb.core.Vec.normalized(xaxis);
	yaxis = verb.core.Vec.normalized(yaxis);
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
	return new verb.core.types.NurbsCurveData(2,knots,verb.core.Eval.homogenize1d(controlPoints,weights));
};
verb.core.Make.arc = function(center,xaxis,yaxis,radius,startAngle,endAngle) {
	return verb.core.Make.ellipseArc(center,verb.core.Vec.mul(radius,verb.core.Vec.normalized(xaxis)),verb.core.Vec.mul(radius,verb.core.Vec.normalized(yaxis)),startAngle,endAngle);
};
verb.core.Make.polyline = function(pts) {
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
	return new verb.core.types.NurbsCurveData(1,knots,verb.core.Eval.homogenize1d(pts.slice(0),weights));
};
verb.core.Make.extrudedSurface = function(axis,length,profile) {
	var controlPoints = [[],[],[]];
	var weights = [[],[],[]];
	var prof_controlPoints = verb.core.Eval.dehomogenize1d(profile.controlPoints);
	var prof_weights = verb.core.Eval.weight1d(profile.controlPoints);
	var translation = verb.core.Vec.mul(length,axis);
	var halfTranslation = verb.core.Vec.mul(0.5 * length,axis);
	var _g1 = 0;
	var _g = prof_controlPoints.length;
	while(_g1 < _g) {
		var j = _g1++;
		controlPoints[2][j] = prof_controlPoints[j];
		controlPoints[1][j] = verb.core.Vec.add(halfTranslation,prof_controlPoints[j]);
		controlPoints[0][j] = verb.core.Vec.add(translation,prof_controlPoints[j]);
		weights[0][j] = prof_weights[j];
		weights[1][j] = prof_weights[j];
		weights[2][j] = prof_weights[j];
	}
	return new verb.core.types.NurbsSurfaceData(2,profile.degree,[0,0,0,1,1,1],profile.knots,verb.core.Eval.homogenize2d(controlPoints,weights));
};
verb.core.Make.cylindricalSurface = function(axis,xaxis,base,height,radius) {
	var yaxis = verb.core.Vec.cross(axis,xaxis);
	var angle = 2.0 * Math.PI;
	var circ = verb.core.Make.arc(base,xaxis,yaxis,radius,0.0,2 * Math.PI);
	return verb.core.Make.extrudedSurface(axis,height,circ);
};
verb.core.Make.revolvedSurface = function(profile,center,axis,theta) {
	var prof_controlPoints = verb.core.Eval.dehomogenize1d(profile.controlPoints);
	var prof_weights = verb.core.Eval.weight1d(profile.controlPoints);
	var narcs;
	var knotsU;
	var controlPoints;
	var weights;
	if(theta <= Math.PI / 2) {
		narcs = 1;
		knotsU = verb.core.Vec.zeros1d(6 + 2 * (narcs - 1));
	} else if(theta <= Math.PI) {
		narcs = 2;
		knotsU = verb.core.Vec.zeros1d(6 + 2 * (narcs - 1));
		knotsU[3] = knotsU[4] = 0.5;
	} else if(theta <= 3 * Math.PI / 2) {
		narcs = 3;
		knotsU = verb.core.Vec.zeros1d(6 + 2 * (narcs - 1));
		knotsU[3] = knotsU[4] = 0.333333333333333315;
		knotsU[5] = knotsU[6] = 0.66666666666666663;
	} else {
		narcs = 4;
		knotsU = verb.core.Vec.zeros1d(6 + 2 * (narcs - 1));
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
	var sines = verb.core.Vec.zeros1d(narcs + 1);
	var cosines = verb.core.Vec.zeros1d(narcs + 1);
	var controlPoints1 = verb.core.Vec.zeros3d(2 * narcs + 1,prof_controlPoints.length,3);
	var weights1 = verb.core.Vec.zeros2d(2 * narcs + 1,prof_controlPoints.length);
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
		var O = verb.core.Trig.rayClosestPoint(prof_controlPoints[j1],center,axis);
		var X = verb.core.Vec.sub(prof_controlPoints[j1],O);
		var r = verb.core.Vec.norm(X);
		var Y = verb.core.Vec.cross(axis,X);
		if(r > 1e-10) {
			X = verb.core.Vec.mul(1 / r,X);
			Y = verb.core.Vec.mul(1 / r,Y);
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
			if(r == 0) P2 = O; else P2 = verb.core.Vec.add(O,verb.core.Vec.add(verb.core.Vec.mul(r * cosines[i2],X),verb.core.Vec.mul(r * sines[i2],Y)));
			controlPoints1[index + 2][j1] = P2;
			weights1[index + 2][j1] = prof_weights[j1];
			var T2 = verb.core.Vec.sub(verb.core.Vec.mul(cosines[i2],Y),verb.core.Vec.mul(sines[i2],X));
			if(r == 0) controlPoints1[index + 1][j1] = O; else {
				var inters = verb.core.Intersect.rays(P0,verb.core.Vec.mul(1 / verb.core.Vec.norm(T0),T0),P2,verb.core.Vec.mul(1 / verb.core.Vec.norm(T2),T2));
				var P1 = verb.core.Vec.add(P0,verb.core.Vec.mul(inters.u0,T0));
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
	return new verb.core.types.NurbsSurfaceData(2,profile.degree,knotsU,profile.knots,verb.core.Eval.homogenize2d(controlPoints1,weights1));
};
verb.core.Make.sphericalSurface = function(center,axis,xaxis,radius) {
	var arc = verb.core.Make.arc(center,verb.core.Vec.mul(-1.0,axis),xaxis,radius,0.0,Math.PI);
	return verb.core.Make.revolvedSurface(arc,center,axis,2 * Math.PI);
};
verb.core.Make.conicalSurface = function(axis,xaxis,base,height,radius) {
	var angle = 2 * Math.PI;
	var prof_degree = 1;
	var prof_ctrl_pts = [verb.core.Vec.add(base,verb.core.Vec.mul(height,axis)),verb.core.Vec.add(base,verb.core.Vec.mul(radius,xaxis))];
	var prof_knots = [0.0,0.0,1.0,1.0];
	var prof_weights = [1.0,1.0];
	var prof = new verb.core.types.NurbsCurveData(prof_degree,prof_knots,verb.core.Eval.homogenize1d(prof_ctrl_pts,prof_weights));
	return verb.core.Make.revolvedSurface(prof,base,axis,angle);
};
verb.core.Make.rationalInterpCurve = function(points,degree,homogeneousPoints,start_tangent,end_tangent) {
	if(homogeneousPoints == null) homogeneousPoints = false;
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
		var span = verb.core.Eval.knotSpanGivenN(n,degree,u,knots);
		var basisFuncs = verb.core.Eval.basisFunctionsGivenKnotSpanIndex(span,u,degree,knots);
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
	if(!homogeneousPoints) {
		var weights = verb.core.Vec.rep(controlPts.length,1.0);
		controlPts = verb.core.Eval.homogenize1d(controlPts,weights);
	}
	return new verb.core.types.NurbsCurveData(degree,knots,controlPts);
};
verb.core.LUDecomp = function(lu,p) {
	this.LU = lu;
	this.P = p;
};
verb.core.LUDecomp.__name__ = ["verb","core","LUDecomp"];
verb.core.Mat = $hx_exports.core.Mat = function() { };
verb.core.Mat.__name__ = ["verb","core","Mat"];
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
verb.core.Mesh.__name__ = ["verb","core","Mesh"];
verb.core.Mesh.getTriangleNorm = function(points,tri) {
	var v0 = points[tri[0]];
	var v1 = points[tri[1]];
	var v2 = points[tri[2]];
	var u = verb.core.Vec.sub(v1,v0);
	var v = verb.core.Vec.sub(v2,v0);
	var n = verb.core.Vec.cross(u,v);
	return verb.core.Vec.mul(1 / verb.core.Vec.norm(n),n);
};
verb.core.Mesh.makeMeshAabb = function(mesh,faceIndices) {
	var bb = new verb.core.types.BoundingBox();
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
verb.core.Mesh.makeMeshAabbTree = function(mesh,faceIndices) {
	var aabb = verb.core.Mesh.makeMeshAabb(mesh,faceIndices);
	if(faceIndices.length == 1) return new verb.core.types.BoundingBoxLeaf(aabb,faceIndices[0]);
	var sortedIndices = verb.core.Mesh.sortTrianglesOnLongestAxis(aabb,mesh,faceIndices);
	var leftIndices = verb.core.ArrayExtensions.left(sortedIndices);
	var rightIndices = verb.core.ArrayExtensions.right(sortedIndices);
	return new verb.core.types.BoundingBoxInnerNode(aabb,[verb.core.Mesh.makeMeshAabbTree(mesh,leftIndices),verb.core.Mesh.makeMeshAabbTree(mesh,rightIndices)]);
};
verb.core.Mesh.sortTrianglesOnLongestAxis = function(bb,mesh,faceIndices) {
	var longAxis = bb.getLongestAxis();
	var minCoordFaceMap = new Array();
	var _g = 0;
	while(_g < faceIndices.length) {
		var faceIndex = faceIndices[_g];
		++_g;
		var tri_min = verb.core.Mesh.getMinCoordOnAxis(mesh.points,mesh.faces[faceIndex],longAxis);
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
verb.core.Mesh.getMinCoordOnAxis = function(points,tri,axis) {
	var min = Math.POSITIVE_INFINITY;
	var _g = 0;
	while(_g < 3) {
		var i = _g++;
		var coord = points[tri[i]][axis];
		if(coord < min) min = coord;
	}
	return min;
};
verb.core.Mesh.getTriangleCentroid = function(points,tri) {
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
verb.core.Mesh.triangleUVFromPoint = function(mesh,faceIndex,f) {
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
verb.core.Modify = $hx_exports.core.Modify = function() { };
verb.core.Modify.__name__ = ["verb","core","Modify"];
verb.core.Modify.curveReverse = function(curve) {
	return new verb.core.types.NurbsCurveData(curve.degree,verb.core.Modify.knotsReverse(curve.knots),verb.core.ArrayExtensions.reversed(curve.controlPoints));
};
verb.core.Modify.surfaceReverse = function(surface,useV) {
	if(useV == null) useV = false;
	if(useV) return new verb.core.types.NurbsSurfaceData(surface.degreeU,surface.degreeV,surface.knotsU,verb.core.Modify.knotsReverse(surface.knotsV),(function($this) {
		var $r;
		var _g = [];
		{
			var _g1 = 0;
			var _g2 = surface.controlPoints;
			while(_g1 < _g2.length) {
				var row = _g2[_g1];
				++_g1;
				_g.push(verb.core.ArrayExtensions.reversed(row));
			}
		}
		$r = _g;
		return $r;
	}(this)));
	return new verb.core.types.NurbsSurfaceData(surface.degreeU,surface.degreeV,verb.core.Modify.knotsReverse(surface.knotsU),surface.knotsV,verb.core.ArrayExtensions.reversed(surface.controlPoints));
};
verb.core.Modify.knotsReverse = function(knots) {
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
verb.core.Modify.unifyCurveKnotVectors = function(curves) {
	curves = curves.map(verb.core.Make.clonedCurve);
	var maxDegree = Lambda.fold(curves,function(x,a) {
		return verb.core.Modify.imax(x.degree,a);
	},0);
	var _g1 = 0;
	var _g = curves.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(curves[i].degree < maxDegree) curves[i] = verb.core.Modify.curveElevateDegree(curves[i],maxDegree);
	}
	var knotIntervals;
	var _g2 = [];
	var _g11 = 0;
	while(_g11 < curves.length) {
		var c = curves[_g11];
		++_g11;
		_g2.push(new verb.core.types.Interval(c.knots[0],verb.core.ArrayExtensions.last(c.knots)));
	}
	knotIntervals = _g2;
	var _g21 = 0;
	var _g12 = curves.length;
	while(_g21 < _g12) {
		var i1 = _g21++;
		var min = [knotIntervals[i1].min];
		curves[i1].knots = curves[i1].knots.map((function(min) {
			return function(x1) {
				return x1 - min[0];
			};
		})(min));
	}
	var knotSpans = knotIntervals.map(function(x2) {
		return x2.max - x2.min;
	});
	var maxKnotSpan = Lambda.fold(knotSpans,function(x3,a1) {
		return Math.max(x3,a1);
	},0.0);
	var _g22 = 0;
	var _g13 = curves.length;
	while(_g22 < _g13) {
		var i2 = _g22++;
		var scale = [maxKnotSpan / knotSpans[i2]];
		curves[i2].knots = curves[i2].knots.map((function(scale) {
			return function(x4) {
				return x4 * scale[0];
			};
		})(scale));
	}
	var mergedKnots = Lambda.fold(curves,function(x5,a2) {
		return verb.core.Vec.sortedSetUnion(x5.knots,a2);
	},[]);
	var _g23 = 0;
	var _g14 = curves.length;
	while(_g23 < _g14) {
		var i3 = _g23++;
		var rem = verb.core.Vec.sortedSetSub(mergedKnots,curves[i3].knots);
		if(rem.length == 0) curves[i3] = curves[i3];
		curves[i3] = verb.core.Modify.curveKnotRefine(curves[i3],rem);
	}
	return curves;
};
verb.core.Modify.imin = function(a,b) {
	if(a < b) return a; else return b;
};
verb.core.Modify.imax = function(a,b) {
	if(a > b) return a; else return b;
};
verb.core.Modify.curveElevateDegree = function(curve,finalDegree) {
	if(finalDegree <= curve.degree) return curve;
	var n = curve.knots.length - curve.degree - 2;
	var newDegree = curve.degree;
	var knots = curve.knots;
	var controlPoints = curve.controlPoints;
	var degreeInc = finalDegree - curve.degree;
	var dim = curve.controlPoints[0].length;
	var bezalfs = verb.core.Vec.zeros2d(newDegree + degreeInc + 1,newDegree + 1);
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
		var inv = 1.0 / verb.core.Binomial.get(ph,i);
		var mpi;
		if(newDegree < i) mpi = newDegree; else mpi = i;
		var _g3 = verb.core.Modify.imax(0,i - degreeInc);
		var _g2 = mpi + 1;
		while(_g3 < _g2) {
			var j = _g3++;
			bezalfs[i][j] = inv * verb.core.Binomial.get(newDegree,j) * verb.core.Binomial.get(degreeInc,i - j);
		}
	}
	var _g4 = ph2 + 1;
	while(_g4 < ph) {
		var i1 = _g4++;
		var mpi1;
		if(newDegree < i1) mpi1 = newDegree; else mpi1 = i1;
		var _g21 = verb.core.Modify.imax(0,i1 - degreeInc);
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
					bpts[k1] = verb.core.Vec.add(verb.core.Vec.mul(alfs[k1 - s],bpts[k1]),verb.core.Vec.mul(1.0 - alfs[k1 - s],bpts[k1 - 1]));
					k1--;
				}
				Nextbpts[save] = bpts[newDegree];
			}
		}
		var _g15 = lbz;
		var _g8 = ph + 1;
		while(_g15 < _g8) {
			var i5 = _g15++;
			ebpts[i5] = verb.core.Vec.zeros1d(dim);
			var mpi2;
			if(newDegree < i5) mpi2 = newDegree; else mpi2 = i5;
			var _g31 = verb.core.Modify.imax(0,i5 - degreeInc);
			var _g22 = mpi2 + 1;
			while(_g31 < _g22) {
				var j3 = _g31++;
				ebpts[i5] = verb.core.Vec.add(ebpts[i5],verb.core.Vec.mul(bezalfs[i5][j3],bpts[j3]));
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
						Qw[i6] = verb.core.Vec.lerp(alf,Qw[i6],Qw[i6 - 1]);
					}
					if(j4 >= lbz) {
						if(j4 - tr <= kind - ph + oldr) {
							var gam = (ub - Uh[j4 - tr]) / den;
							ebpts[kj] = verb.core.Vec.lerp(gam,ebpts[kj],ebpts[kj + 1]);
						}
					} else ebpts[kj] = verb.core.Vec.lerp(bet,ebpts[kj],ebpts[kj + 1]);
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
	return new verb.core.types.NurbsCurveData(finalDegree,Uh,Qw);
};
verb.core.Modify.rationalSurfaceTransform = function(surface,mat) {
	var pts = verb.core.Eval.dehomogenize2d(surface.controlPoints);
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
			pts[i][j] = verb.core.Mat.dot(mat,homoPt).slice(0,homoPt.length - 1);
		}
	}
	return new verb.core.types.NurbsSurfaceData(surface.degreeU,surface.degreeV,surface.knotsU.slice(),surface.knotsV.slice(),verb.core.Eval.homogenize2d(pts,verb.core.Eval.weight2d(surface.controlPoints)));
};
verb.core.Modify.rationalCurveTransform = function(curve,mat) {
	var pts = verb.core.Eval.dehomogenize1d(curve.controlPoints);
	var _g1 = 0;
	var _g = pts.length;
	while(_g1 < _g) {
		var i = _g1++;
		var homoPt = pts[i];
		homoPt.push(1.0);
		pts[i] = verb.core.Mat.dot(mat,homoPt).slice(0,homoPt.length - 1);
	}
	return new verb.core.types.NurbsCurveData(curve.degree,curve.knots.slice(),verb.core.Eval.homogenize1d(pts,verb.core.Eval.weight1d(curve.controlPoints)));
};
verb.core.Modify.surfaceKnotRefine = function(surface,knotsToInsert,useV) {
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
		c = verb.core.Modify.curveKnotRefine(new verb.core.types.NurbsCurveData(degree,knots,cptrow),knotsToInsert);
		newPts.push(c.controlPoints);
	}
	var newknots = c.knots;
	if(!useV) {
		newPts = verb.core.Mat.transpose(newPts);
		return new verb.core.types.NurbsSurfaceData(surface.degreeU,surface.degreeV,newknots,surface.knotsV.slice(),newPts);
	} else return new verb.core.types.NurbsSurfaceData(surface.degreeU,surface.degreeV,surface.knotsU.slice(),newknots,newPts);
};
verb.core.Modify.surfaceSplit = function(surface,u,useV) {
	if(useV == null) useV = false;
	var knots;
	var degree;
	var controlPoints;
	if(!useV) {
		controlPoints = verb.core.Mat.transpose(surface.controlPoints);
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
	var newpts0 = new Array();
	var newpts1 = new Array();
	var s = verb.core.Eval.knotSpan(degree,u,knots);
	var res = null;
	var _g11 = 0;
	while(_g11 < controlPoints.length) {
		var cps = controlPoints[_g11];
		++_g11;
		res = verb.core.Modify.curveKnotRefine(new verb.core.types.NurbsCurveData(degree,knots,cps),knots_to_insert);
		newpts0.push(res.controlPoints.slice(0,s + 1));
		newpts1.push(res.controlPoints.slice(s + 1));
	}
	var knots0 = res.knots.slice(0,s + degree + 2);
	var knots1 = res.knots.slice(s + 1);
	if(!useV) {
		newpts0 = verb.core.Mat.transpose(newpts0);
		newpts1 = verb.core.Mat.transpose(newpts1);
		return [new verb.core.types.NurbsSurfaceData(degree,surface.degreeV,knots0,surface.knotsV.slice(),newpts0),new verb.core.types.NurbsSurfaceData(degree,surface.degreeV,knots1,surface.knotsV.slice(),newpts1)];
	}
	return [new verb.core.types.NurbsSurfaceData(surface.degreeU,degree,surface.knotsU.slice(),knots0,newpts0),new verb.core.types.NurbsSurfaceData(surface.degreeU,degree,surface.knotsU.slice(),knots1,newpts1)];
};
verb.core.Modify.decomposeCurveIntoBeziers = function(curve) {
	var degree = curve.degree;
	var controlPoints = curve.controlPoints;
	var knots = curve.knots;
	var knotmults = verb.core.Analyze.knotMultiplicities(knots);
	var reqMult = degree + 1;
	var _g = 0;
	while(_g < knotmults.length) {
		var knotmult = knotmults[_g];
		++_g;
		if(knotmult.mult < reqMult) {
			var knotsInsert = verb.core.Vec.rep(reqMult - knotmult.mult,knotmult.knot);
			var res = verb.core.Modify.curveKnotRefine(new verb.core.types.NurbsCurveData(degree,knots,controlPoints),knotsInsert);
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
		crvs.push(new verb.core.types.NurbsCurveData(degree,kts,pts));
		i += reqMult;
	}
	return crvs;
};
verb.core.Modify.curveSplit = function(curve,u) {
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
	var res = verb.core.Modify.curveKnotRefine(curve,knots_to_insert);
	var s = verb.core.Eval.knotSpan(degree,u,knots);
	var knots0 = res.knots.slice(0,s + degree + 2);
	var knots1 = res.knots.slice(s + 1);
	var cpts0 = res.controlPoints.slice(0,s + 1);
	var cpts1 = res.controlPoints.slice(s + 1);
	return [new verb.core.types.NurbsCurveData(degree,knots0,cpts0),new verb.core.types.NurbsCurveData(degree,knots1,cpts1)];
};
verb.core.Modify.curveKnotRefine = function(curve,knotsToInsert) {
	if(knotsToInsert.length == 0) return verb.core.Make.clonedCurve(curve);
	var degree = curve.degree;
	var controlPoints = curve.controlPoints;
	var knots = curve.knots;
	var n = controlPoints.length - 1;
	var m = n + degree + 1;
	var r = knotsToInsert.length - 1;
	var a = verb.core.Eval.knotSpan(degree,knotsToInsert[0],knots);
	var b = verb.core.Eval.knotSpan(degree,knotsToInsert[r],knots);
	var controlPoints_post = new Array();
	var knots_post = new Array();
	var _g1 = 0;
	var _g = a - degree + 1;
	while(_g1 < _g) {
		var i = _g1++;
		controlPoints_post[i] = controlPoints[i];
	}
	var _g11 = b - 1;
	var _g2 = n + 1;
	while(_g11 < _g2) {
		var i1 = _g11++;
		controlPoints_post[i1 + r + 1] = controlPoints[i1];
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
		while(knotsToInsert[j] <= knots[i4] && i4 > a) {
			controlPoints_post[k - degree - 1] = controlPoints[i4 - degree - 1];
			knots_post[k] = knots[i4];
			k = k - 1;
			i4 = i4 - 1;
		}
		controlPoints_post[k - degree - 1] = controlPoints_post[k - degree];
		var _g14 = 1;
		var _g5 = degree + 1;
		while(_g14 < _g5) {
			var l = _g14++;
			var ind = k - degree + l;
			var alfa = knots_post[k + l] - knotsToInsert[j];
			if(Math.abs(alfa) < 1e-10) controlPoints_post[ind - 1] = controlPoints_post[ind]; else {
				alfa = alfa / (knots_post[k + l] - knots[i4 - degree + l]);
				controlPoints_post[ind - 1] = verb.core.Vec.add(verb.core.Vec.mul(alfa,controlPoints_post[ind - 1]),verb.core.Vec.mul(1.0 - alfa,controlPoints_post[ind]));
			}
		}
		knots_post[k] = knotsToInsert[j];
		k = k - 1;
		j--;
	}
	return new verb.core.types.NurbsCurveData(degree,knots_post,controlPoints_post);
};
verb.core.Modify.curveKnotInsert = function(curve,u,r) {
	var degree = curve.degree;
	var controlPoints = curve.controlPoints;
	var knots = curve.knots;
	var s = 0;
	var num_pts = controlPoints.length;
	var k = verb.core.Eval.knotSpan(degree,u,knots);
	var num_pts_post = num_pts + r;
	var controlPoints_temp = new Array();
	var knots_post = new Array();
	var controlPoints_post = new Array();
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
			controlPoints_temp[i7] = verb.core.Vec.add(verb.core.Vec.mul(alpha,controlPoints_temp[i7 + 1]),verb.core.Vec.mul(1.0 - alpha,controlPoints_temp[i7]));
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
	return new verb.core.types.NurbsCurveData(degree,knots_post,controlPoints_post);
};
verb.core.MinimizationResult = function(solution,value,gradient,invHessian,iterations,message) {
	this.solution = solution;
	this.value = value;
	this.gradient = gradient;
	this.invHessian = invHessian;
	this.iterations = iterations;
	this.message = message;
};
verb.core.MinimizationResult.__name__ = ["verb","core","MinimizationResult"];
verb.core.Numeric = function() { };
verb.core.Numeric.__name__ = ["verb","core","Numeric"];
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
	tol = Math.max(tol,1e-10);
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
verb.core.Tess.__name__ = ["verb","core","Tess"];
verb.core.Tess.rationalCurveRegularSample = function(curve,numSamples,includeU) {
	return verb.core.Tess.rationalCurveRegularSampleRange(curve,curve.knots[0],verb.core.ArrayExtensions.last(curve.knots),numSamples,includeU);
};
verb.core.Tess.rationalCurveRegularSampleRange = function(curve,start,end,numSamples,includeU) {
	if(numSamples < 1) numSamples = 2;
	var p = [];
	var span = (end - start) / (numSamples - 1);
	var u = 0;
	var _g = 0;
	while(_g < numSamples) {
		var i = _g++;
		u = start + span * i;
		if(includeU) p.push([u].concat(verb.core.Eval.rationalCurvePoint(curve,u))); else p.push(verb.core.Eval.rationalCurvePoint(curve,u));
	}
	return p;
};
verb.core.Tess.rationalCurveAdaptiveSample = function(curve,tol,includeU) {
	if(includeU == null) includeU = false;
	if(tol == null) tol = 1e-6;
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
	return verb.core.Tess.rationalCurveAdaptiveSampleRange(curve,curve.knots[0],verb.core.ArrayExtensions.last(curve.knots),tol,includeU);
};
verb.core.Tess.rationalCurveAdaptiveSampleRange = function(curve,start,end,tol,includeU) {
	var p1 = verb.core.Eval.rationalCurvePoint(curve,start);
	var p3 = verb.core.Eval.rationalCurvePoint(curve,end);
	var t = 0.5 + 0.2 * Math.random();
	var mid = start + (end - start) * t;
	var p2 = verb.core.Eval.rationalCurvePoint(curve,mid);
	var diff = verb.core.Vec.sub(p1,p3);
	var diff2 = verb.core.Vec.sub(p1,p2);
	if(verb.core.Vec.dot(diff,diff) < tol && verb.core.Vec.dot(diff2,diff2) > tol || !verb.core.Trig.threePointsAreFlat(p1,p2,p3,tol)) {
		var exact_mid = start + (end - start) * 0.5;
		var left_pts = verb.core.Tess.rationalCurveAdaptiveSampleRange(curve,start,exact_mid,tol,includeU);
		var right_pts = verb.core.Tess.rationalCurveAdaptiveSampleRange(curve,exact_mid,end,tol,includeU);
		return left_pts.slice(0,-1).concat(right_pts);
	} else if(includeU) return [[start].concat(p1),[end].concat(p3)]; else return [p1,p3];
};
verb.core.Tess.rationalSurfaceNaive = function(surface,divs_u,divs_v) {
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
			var derivs = verb.core.Eval.rationalSurfaceDerivatives(surface,pt_u,pt_v,1);
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
verb.core.Tess.divideRationalSurfaceAdaptive = function(surface,options) {
	if(options == null) options = new verb.core.types.AdaptiveRefinementOptions();
	if(options.minDivsU != null) options.minDivsU = options.minDivsU; else options.minDivsU = 1;
	if(options.minDivsV != null) options.minDivsU = options.minDivsV; else options.minDivsU = 1;
	if(options.refine != null) options.refine = options.refine; else options.refine = true;
	var minU = (surface.controlPoints.length - 1) * 2;
	var minV = (surface.controlPoints[0].length - 1) * 2;
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
			var ds = verb.core.Eval.rationalSurfaceDerivatives(surface,u,v,1);
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
verb.core.Tess.triangulateAdaptiveRefinementNodeTree = function(arrTree) {
	var mesh = verb.core.types.MeshData.empty();
	var _g = 0;
	while(_g < arrTree.length) {
		var x = arrTree[_g];
		++_g;
		x.triangulate(mesh);
	}
	return mesh;
};
verb.core.Tess.rationalSurfaceAdaptive = function(surface,options) {
	if(options != null) options = options; else options = new verb.core.types.AdaptiveRefinementOptions();
	var arrTrees = verb.core.Tess.divideRationalSurfaceAdaptive(surface,options);
	return verb.core.Tess.triangulateAdaptiveRefinementNodeTree(arrTrees);
};
verb.core.Trig = $hx_exports.core.Trig = function() { };
verb.core.Trig.__name__ = ["verb","core","Trig"];
verb.core.Trig.distToSegment = function(a,b,c) {
	var acv = verb.core.Vec.sub(c,a);
	var acl = verb.core.Vec.norm(acv);
	var bma = verb.core.Vec.sub(b,a);
	if(acl < 1e-6) return verb.core.Vec.norm(bma);
	var ac = verb.core.Vec.mul(1 / acl,acv);
	var p = verb.core.Vec.dot(bma,ac);
	var acd = verb.core.Vec.add(a,verb.core.Vec.mul(p,ac));
	return verb.core.Vec.dist(acd,b);
};
verb.core.Trig.rayClosestPoint = function(pt,o,r) {
	var o2pt = verb.core.Vec.sub(pt,o);
	var do2ptr = verb.core.Vec.dot(o2pt,r);
	var proj = verb.core.Vec.add(o,verb.core.Vec.mul(do2ptr,r));
	return proj;
};
verb.core.Trig.distToRay = function(pt,o,r) {
	var d = verb.core.Trig.rayClosestPoint(pt,o,r);
	var dif = verb.core.Vec.sub(d,pt);
	return verb.core.Vec.norm(dif);
};
verb.core.Trig.threePointsAreFlat = function(p1,p2,p3,tol) {
	var p2mp1 = verb.core.Vec.sub(p2,p1);
	var p3mp1 = verb.core.Vec.sub(p3,p1);
	var norm = verb.core.Vec.cross(p2mp1,p3mp1);
	var area = verb.core.Vec.dot(norm,norm);
	return area < tol;
};
verb.core.Trig.segmentClosestPoint = function(pt,segpt0,segpt1,u0,u1) {
	var dif = verb.core.Vec.sub(segpt1,segpt0);
	var l = verb.core.Vec.norm(dif);
	if(l < 1e-10) return { u : u0, pt : segpt0};
	var o = segpt0;
	var r = verb.core.Vec.mul(1 / l,dif);
	var o2pt = verb.core.Vec.sub(pt,o);
	var do2ptr = verb.core.Vec.dot(o2pt,r);
	if(do2ptr < 0) return { u : u0, pt : segpt0}; else if(do2ptr > l) return { u : u1, pt : segpt1};
	return { u : u0 + (u1 - u0) * do2ptr / l, pt : verb.core.Vec.add(o,verb.core.Vec.mul(do2ptr,r))};
};
verb.core.Vec = $hx_exports.core.Vec = function() { };
verb.core.Vec.__name__ = ["verb","core","Vec"];
verb.core.Vec.angleBetween = function(a,b) {
	return Math.acos(verb.core.Vec.dot(a,b) / (verb.core.Vec.norm(a) * verb.core.Vec.norm(b)));
};
verb.core.Vec.angleBetweenNormalized2d = function(a,b) {
	var perpDot = a[0] * b[1] - a[1] * b[0];
	return Math.atan2(perpDot,verb.core.Vec.dot(a,b));
};
verb.core.Vec.domain = function(a) {
	return a[a.length - 1] - a[0];
};
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
verb.core.Vec.span = function(min,max,step) {
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
	var norm2 = verb.core.Vec.normSquared(a);
	if(norm2 != 0.0) return Math.sqrt(norm2); else return norm2;
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
		if(Math.abs(vec[i]) > 1e-6) return false;
	}
	return true;
};
verb.core.Vec.sortedSetUnion = function(a,b) {
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
verb.core.Vec.sortedSetSub = function(a,b) {
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
verb.core.types = {};
verb.core.types.AdaptiveRefinementOptions = function() {
	this.minDivsV = 1;
	this.minDivsU = 1;
	this.refine = true;
	this.maxDepth = 10;
	this.minDepth = 0;
	this.normTol = 8.5e-2;
};
verb.core.types.AdaptiveRefinementOptions.__name__ = ["verb","core","types","AdaptiveRefinementOptions"];
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
verb.core.types.AdaptiveRefinementNode.__name__ = ["verb","core","types","AdaptiveRefinementNode"];
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
		var derivs = verb.core.Eval.rationalSurfaceDerivatives(this.srf,u,v,1);
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
		var i1 = 0;
		var j1 = uvs.length - 1;
		while(i1 < uvs.length) {
			mesh.faces.push([centerIndex,ids[i1],ids[j1]]);
			j1 = i1++;
		}
		return mesh;
	}
};
verb.core.types.BoundingBox = $hx_exports.core.BoundingBox = function(pts) {
	this.max = null;
	this.min = null;
	this.dim = 3;
	this.initialized = false;
	if(pts != null) this.addRange(pts);
};
verb.core.types.BoundingBox.__name__ = ["verb","core","types","BoundingBox"];
verb.core.types.BoundingBox.intervalsOverlap = function(a1,a2,b1,b2,tol) {
	if(tol == null) tol = -1;
	var tol1;
	if(tol < -0.5) tol1 = verb.core.types.BoundingBox.TOLERANCE; else tol1 = tol;
	var x1 = Math.min(a1,a2) - tol1;
	var x2 = Math.max(a1,a2) + tol1;
	var y1 = Math.min(b1,b2) - tol1;
	var y2 = Math.max(b1,b2) + tol1;
	return x1 >= y1 && x1 <= y2 || x2 >= y1 && x2 <= y2 || y1 >= x1 && y1 <= x2 || y2 >= x1 && y2 <= x2;
};
verb.core.types.BoundingBox.prototype = {
	fromPoint: function(pt) {
		return new verb.core.types.BoundingBox([pt]);
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
		return this.intersects(new verb.core.types.BoundingBox([point]),tol);
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
			if(!verb.core.types.BoundingBox.intervalsOverlap(a1[i],a2[i],b1[i],b2[i],tol)) return false;
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
		return new verb.core.types.BoundingBox([minbb,maxbb]);
	}
};
verb.core.types.BoundingBoxNode = $hx_exports.core.BoundingBoxNode = function(bb) {
	this.boundingBox = bb;
};
verb.core.types.BoundingBoxNode.__name__ = ["verb","core","types","BoundingBoxNode"];
verb.core.types.BoundingBoxInnerNode = $hx_exports.core.BoundingBoxInnerNode = function(bb,children) {
	verb.core.types.BoundingBoxNode.call(this,bb);
	this.children = children;
};
verb.core.types.BoundingBoxInnerNode.__name__ = ["verb","core","types","BoundingBoxInnerNode"];
verb.core.types.BoundingBoxInnerNode.__super__ = verb.core.types.BoundingBoxNode;
verb.core.types.BoundingBoxInnerNode.prototype = $extend(verb.core.types.BoundingBoxNode.prototype,{
});
verb.core.types.BoundingBoxLeaf = $hx_exports.core.BoundingBoxLeaf = function(bb,item) {
	verb.core.types.BoundingBoxNode.call(this,bb);
	this.item = item;
};
verb.core.types.BoundingBoxLeaf.__name__ = ["verb","core","types","BoundingBoxLeaf"];
verb.core.types.BoundingBoxLeaf.__super__ = verb.core.types.BoundingBoxNode;
verb.core.types.BoundingBoxLeaf.prototype = $extend(verb.core.types.BoundingBoxNode.prototype,{
});
verb.core.types.CurveCurveIntersection = $hx_exports.core.CurveCurveIntersection = function(point0,point1,u0,u1) {
	this.point0 = point0;
	this.point1 = point1;
	this.u0 = u0;
	this.u1 = u1;
};
verb.core.types.CurveCurveIntersection.__name__ = ["verb","core","types","CurveCurveIntersection"];
verb.core.types.CurveLengthSample = $hx_exports.core.CurveLengthSample = function(u,len) {
	this.u = u;
	this.len = len;
};
verb.core.types.CurveLengthSample.__name__ = ["verb","core","types","CurveLengthSample"];
verb.core.types.CurveSurfaceIntersection = $hx_exports.core.CurveSurfaceIntersection = function(u,uv,curvePoint,surfacePoint) {
	this.u = u;
	this.uv = uv;
	this.curvePoint = curvePoint;
	this.surfacePoint = surfacePoint;
};
verb.core.types.CurveSurfaceIntersection.__name__ = ["verb","core","types","CurveSurfaceIntersection"];
verb.core.types.CurveTriPoint = $hx_exports.core.CurveTriPoint = function(u,point,uv) {
	this.u = u;
	this.point = point;
	this.uv = uv;
};
verb.core.types.CurveTriPoint.__name__ = ["verb","core","types","CurveTriPoint"];
verb.core.types.IBoundingBoxTree = function() { };
verb.core.types.IBoundingBoxTree.__name__ = ["verb","core","types","IBoundingBoxTree"];
verb.core.types.Interval = $hx_exports.core.Interval = function(min,max) {
	this.min = min;
	this.max = max;
};
verb.core.types.Interval.__name__ = ["verb","core","types","Interval"];
verb.core.types.LazyCurveBoundingBoxTree = function(curve,knotTol) {
	this._boundingBox = null;
	this._curve = curve;
	if(knotTol == null) knotTol = verb.core.Vec.domain(this._curve.knots) / 64;
	this._knotTol = knotTol;
};
verb.core.types.LazyCurveBoundingBoxTree.__name__ = ["verb","core","types","LazyCurveBoundingBoxTree"];
verb.core.types.LazyCurveBoundingBoxTree.__interfaces__ = [verb.core.types.IBoundingBoxTree];
verb.core.types.LazyCurveBoundingBoxTree.prototype = {
	split: function() {
		var min = this._curve.knots[0];
		var max = verb.core.ArrayExtensions.last(this._curve.knots);
		var dom = max - min;
		var crvs = verb.core.Modify.curveSplit(this._curve,(max + min) / 2.0 + dom * 0.1 * Math.random());
		return new verb.core.types.Pair(new verb.core.types.LazyCurveBoundingBoxTree(crvs[0],this._knotTol),new verb.core.types.LazyCurveBoundingBoxTree(crvs[1],this._knotTol));
	}
	,boundingBox: function() {
		if(this._boundingBox == null) this._boundingBox = new verb.core.types.BoundingBox(verb.core.Eval.dehomogenize1d(this._curve.controlPoints));
		return this._boundingBox;
	}
	,'yield': function() {
		return this._curve;
	}
	,indivisible: function(tolerance) {
		return verb.core.Vec.domain(this._curve.knots) < this._knotTol;
	}
	,empty: function() {
		return false;
	}
};
verb.core.types.LazyMeshBoundingBoxTree = function(mesh,faceIndices) {
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
verb.core.types.LazyMeshBoundingBoxTree.__name__ = ["verb","core","types","LazyMeshBoundingBoxTree"];
verb.core.types.LazyMeshBoundingBoxTree.__interfaces__ = [verb.core.types.IBoundingBoxTree];
verb.core.types.LazyMeshBoundingBoxTree.prototype = {
	split: function() {
		var $as = verb.core.Mesh.sortTrianglesOnLongestAxis(this.boundingBox(),this._mesh,this._faceIndices);
		var l = verb.core.ArrayExtensions.left($as);
		var r = verb.core.ArrayExtensions.right($as);
		return new verb.core.types.Pair(new verb.core.types.LazyMeshBoundingBoxTree(this._mesh,l),new verb.core.types.LazyMeshBoundingBoxTree(this._mesh,r));
	}
	,boundingBox: function() {
		if(this._boundingBox == null) this._boundingBox = verb.core.Mesh.makeMeshAabb(this._mesh,this._faceIndices);
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
verb.core.types.LazyPolylineBoundingBoxTree = function(polyline,interval) {
	this._boundingBox = null;
	this._polyline = polyline;
	if(interval == null) interval = new verb.core.types.Interval(0,polyline.points.length != 0?polyline.points.length - 1:0);
	this._interval = interval;
};
verb.core.types.LazyPolylineBoundingBoxTree.__name__ = ["verb","core","types","LazyPolylineBoundingBoxTree"];
verb.core.types.LazyPolylineBoundingBoxTree.__interfaces__ = [verb.core.types.IBoundingBoxTree];
verb.core.types.LazyPolylineBoundingBoxTree.prototype = {
	split: function() {
		var min = this._interval.min;
		var max = this._interval.max;
		var pivot = min + Math.ceil((max - min) / 2);
		var l = new verb.core.types.Interval(min,pivot);
		var r = new verb.core.types.Interval(pivot,max);
		return new verb.core.types.Pair(new verb.core.types.LazyPolylineBoundingBoxTree(this._polyline,l),new verb.core.types.LazyPolylineBoundingBoxTree(this._polyline,r));
	}
	,boundingBox: function() {
		if(this._boundingBox == null) this._boundingBox = new verb.core.types.BoundingBox(this._polyline.points);
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
verb.core.types.LazySurfaceBoundingBoxTree = $hx_exports.core.LazySurfaceBoundingBoxTree = function(surface,splitV,knotTolU,knotTolV) {
	if(splitV == null) splitV = false;
	this._boundingBox = null;
	this._surface = surface;
	this._splitV = splitV;
	if(knotTolU == null) knotTolU = verb.core.Vec.domain(surface.knotsU) / 16;
	if(knotTolV == null) knotTolV = verb.core.Vec.domain(surface.knotsV) / 16;
	this._knotTolU = knotTolU;
	this._knotTolV = knotTolV;
};
verb.core.types.LazySurfaceBoundingBoxTree.__name__ = ["verb","core","types","LazySurfaceBoundingBoxTree"];
verb.core.types.LazySurfaceBoundingBoxTree.__interfaces__ = [verb.core.types.IBoundingBoxTree];
verb.core.types.LazySurfaceBoundingBoxTree.prototype = {
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
		var pivot = (min + max) / 2.0;
		var srfs = verb.core.Modify.surfaceSplit(this._surface,pivot,this._splitV);
		return new verb.core.types.Pair(new verb.core.types.LazySurfaceBoundingBoxTree(srfs[0],!this._splitV,this._knotTolU,this._knotTolV),new verb.core.types.LazySurfaceBoundingBoxTree(srfs[1],!this._splitV,this._knotTolU,this._knotTolV));
	}
	,boundingBox: function() {
		if(this._boundingBox == null) {
			this._boundingBox = new verb.core.types.BoundingBox();
			var _g = 0;
			var _g1 = this._surface.controlPoints;
			while(_g < _g1.length) {
				var row = _g1[_g];
				++_g;
				this._boundingBox.addRange(verb.core.Eval.dehomogenize1d(row));
			}
		}
		return this._boundingBox;
	}
	,'yield': function() {
		return this._surface;
	}
	,indivisible: function(tolerance) {
		return verb.core.Vec.domain(this._surface.knotsV) < this._knotTolV && verb.core.Vec.domain(this._surface.knotsU) < this._knotTolU;
	}
	,empty: function() {
		return false;
	}
};
verb.core.types.MeshBoundingBoxTree = function(mesh,faceIndices) {
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
	this._boundingBox = verb.core.Mesh.makeMeshAabb(mesh,faceIndices);
	if(faceIndices.length < 1) {
		this._empty = true;
		return;
	} else if(faceIndices.length < 2) {
		this._face = faceIndices[0];
		return;
	}
	var $as = verb.core.Mesh.sortTrianglesOnLongestAxis(this._boundingBox,mesh,faceIndices);
	var l = verb.core.ArrayExtensions.left($as);
	var r = verb.core.ArrayExtensions.right($as);
	this._children = new verb.core.types.Pair(new verb.core.types.MeshBoundingBoxTree(mesh,l),new verb.core.types.MeshBoundingBoxTree(mesh,r));
};
verb.core.types.MeshBoundingBoxTree.__name__ = ["verb","core","types","MeshBoundingBoxTree"];
verb.core.types.MeshBoundingBoxTree.__interfaces__ = [verb.core.types.IBoundingBoxTree];
verb.core.types.MeshBoundingBoxTree.prototype = {
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
verb.core.types.MeshData = $hx_exports.core.MeshData = function(faces,points,normals,uvs) {
	this.faces = faces;
	this.points = points;
	this.normals = normals;
	this.uvs = uvs;
};
verb.core.types.MeshData.__name__ = ["verb","core","types","MeshData"];
verb.core.types.MeshData.empty = function() {
	return new verb.core.types.MeshData([],[],[],[]);
};
verb.core.types.MeshIntersectionPoint = $hx_exports.core.MeshIntersectionPoint = function(uv0,uv1,point,faceIndex0,faceIndex1) {
	this.visited = false;
	this.adj = null;
	this.opp = null;
	this.uv0 = uv0;
	this.uv1 = uv1;
	this.point = point;
	this.faceIndex0;
	this.faceIndex1;
};
verb.core.types.MeshIntersectionPoint.__name__ = ["verb","core","types","MeshIntersectionPoint"];
verb.core.types.NurbsCurveData = $hx_exports.core.NurbsCurveData = function(degree,knots,controlPoints,closed) {
	if(closed == null) closed = false;
	this.degree = degree;
	this.controlPoints = controlPoints;
	this.knots = knots;
	this.closed = closed;
};
verb.core.types.NurbsCurveData.__name__ = ["verb","core","types","NurbsCurveData"];
verb.core.types.NurbsSurfaceData = $hx_exports.core.NurbsSurfaceData = function(degreeU,degreeV,knotsU,knotsV,controlPoints,closedU,closedV) {
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
verb.core.types.NurbsSurfaceData.__name__ = ["verb","core","types","NurbsSurfaceData"];
verb.core.types.Pair = $hx_exports.core.Pair = function(item1,item2) {
	this.item0 = item1;
	this.item1 = item2;
};
verb.core.types.Pair.__name__ = ["verb","core","types","Pair"];
verb.core.types.PolylineData = $hx_exports.core.PolylineData = function(points,params) {
	this.points = points;
	this.params = params;
};
verb.core.types.PolylineData.__name__ = ["verb","core","types","PolylineData"];
verb.core.types.PolylineMeshIntersection = $hx_exports.core.PolylineMeshIntersection = function(point,u,uv,polylineIndex,faceIndex) {
	this.point = point;
	this.u = u;
	this.uv = uv;
	this.polylineIndex = polylineIndex;
	this.faceIndex = faceIndex;
};
verb.core.types.PolylineMeshIntersection.__name__ = ["verb","core","types","PolylineMeshIntersection"];
verb.core.types.Ray = $hx_exports.core.Ray = function(origin,dir) {
	this.origin = origin;
	this.dir = dir;
};
verb.core.types.Ray.__name__ = ["verb","core","types","Ray"];
verb.core.types.SurfaceBoundingBoxTree = function(surface,splitV,knotTolU,knotTolV) {
	if(splitV == null) splitV = false;
	this._boundingBox = null;
	this._surface = surface;
	if(knotTolU == null) knotTolU = verb.core.Vec.domain(surface.knotsU) / 16;
	if(knotTolV == null) knotTolV = verb.core.Vec.domain(surface.knotsV) / 16;
	var divisible = false;
	if(splitV) divisible = verb.core.Vec.domain(this._surface.knotsV) > knotTolV; else divisible = verb.core.Vec.domain(this._surface.knotsU) > knotTolU;
	if(!divisible) return;
	var min;
	var max;
	if(splitV) {
		min = this._surface.knotsV[0];
		max = verb.core.ArrayExtensions.last(this._surface.knotsV);
	} else {
		min = this._surface.knotsU[0];
		max = verb.core.ArrayExtensions.last(this._surface.knotsU);
	}
	var dom = max - min;
	var pivot = (min + max) / 2.0 + dom * 0.1 * Math.random();
	var srfs = verb.core.Modify.surfaceSplit(this._surface,pivot,splitV);
	this._children = new verb.core.types.Pair(new verb.core.types.SurfaceBoundingBoxTree(srfs[0],!splitV,knotTolU,knotTolV),new verb.core.types.SurfaceBoundingBoxTree(srfs[1],!splitV,knotTolU,knotTolV));
};
verb.core.types.SurfaceBoundingBoxTree.__name__ = ["verb","core","types","SurfaceBoundingBoxTree"];
verb.core.types.SurfaceBoundingBoxTree.__interfaces__ = [verb.core.types.IBoundingBoxTree];
verb.core.types.SurfaceBoundingBoxTree.prototype = {
	split: function() {
		return this._children;
	}
	,boundingBox: function() {
		if(this._boundingBox == null) {
			this._boundingBox = new verb.core.types.BoundingBox();
			var _g = 0;
			var _g1 = this._surface.controlPoints;
			while(_g < _g1.length) {
				var row = _g1[_g];
				++_g;
				this._boundingBox.addRange(verb.core.Eval.dehomogenize1d(row));
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
verb.core.types.SurfacePoint = function(point,normal,uv,id,degen) {
	if(degen == null) degen = false;
	if(id == null) id = -1;
	this.uv = uv;
	this.point = point;
	this.normal = normal;
	this.id = id;
	this.degen = degen;
};
verb.core.types.SurfacePoint.__name__ = ["verb","core","types","SurfacePoint"];
verb.core.types.SurfacePoint.fromUv = function(u,v) {
	return new verb.core.types.SurfacePoint(null,null,[u,v]);
};
verb.core.types.SurfaceSurfaceIntersectionPoint = $hx_exports.core.SurfaceSurfaceIntersectionPoint = function(uv0,uv1,point,dist) {
	this.uv0 = uv0;
	this.uv1 = uv1;
	this.point = point;
	this.dist = dist;
};
verb.core.types.SurfaceSurfaceIntersectionPoint.__name__ = ["verb","core","types","SurfaceSurfaceIntersectionPoint"];
verb.core.types.TriSegmentIntersection = $hx_exports.core.TriSegmentIntersection = function(point,s,t,r) {
	this.point = point;
	this.s = s;
	this.t = t;
	this.p = r;
};
verb.core.types.TriSegmentIntersection.__name__ = ["verb","core","types","TriSegmentIntersection"];
verb.core.types.VolumeData = $hx_exports.core.VolumeData = function(degreeU,degreeV,degreeW,knotsU,knotsV,knotsW,controlPoints) {
	this.degreeU = degreeU;
	this.degreeV = degreeV;
	this.degreeW = degreeW;
	this.knotsU = knotsU;
	this.knotsV = knotsV;
	this.knotsW = knotsW;
	this.controlPoints = controlPoints;
};
verb.core.types.VolumeData.__name__ = ["verb","core","types","VolumeData"];
verb.exe = {};
verb.exe.AsyncObject = function() { };
verb.exe.AsyncObject.__name__ = ["verb","exe","AsyncObject"];
verb.exe.AsyncObject.prototype = {
	defer: function(classType,methodName,args) {
		return verb.exe.Dispatcher.dispatchMethod(classType,methodName,args);
	}
};
verb.exe.Dispatcher = function() { };
verb.exe.Dispatcher.__name__ = ["verb","exe","Dispatcher"];
verb.exe.Dispatcher.init = function() {
	if(verb.exe.Dispatcher._init) return;
	verb.exe.Dispatcher._workerPool = new verb.exe.WorkerPool(verb.exe.Dispatcher.THREADS);
	verb.exe.Dispatcher._init = true;
};
verb.exe.Dispatcher.dispatchMethod = function(classType,methodName,args) {
	verb.exe.Dispatcher.init();
	var def = new promhx.Deferred();
	var callback = function(x) {
		def.resolve(x);
	};
	verb.exe.Dispatcher._workerPool.addWork(Type.getClassName(classType),methodName,args,callback);
	return new promhx.Promise(def);
};
verb.exe.Work = function(className,methodName,args) {
	this.className = className;
	this.methodName = methodName;
	this.args = args;
	this.id = verb.exe.Work.uuid++;
};
verb.exe.Work.__name__ = ["verb","exe","Work"];
verb.exe.WorkerPool = $hx_exports.exe.WorkerPool = function(numThreads,fileName) {
	if(fileName == null) fileName = "verb.js";
	this._callbacks = new haxe.ds.IntMap();
	this._working = new haxe.ds.IntMap();
	this._pool = [];
	this._queue = [];
	var _g = 0;
	while(_g < numThreads) {
		var i = _g++;
		this._pool.push(new Worker(verb.exe.WorkerPool.basePath + fileName));
	}
};
verb.exe.WorkerPool.__name__ = ["verb","exe","WorkerPool"];
verb.exe.WorkerPool.prototype = {
	addWork: function(className,methodName,$arguments,callback) {
		var work = new verb.exe.Work(className,methodName,$arguments);
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
			this._working.set(workId[0],worker[0]);
			worker[0].onmessage = (function(worker,workId) {
				return function(e) {
					_g._working.remove(workId[0]);
					_g._pool.push(worker[0]);
					try {
						if(_g._callbacks.exists(workId[0])) {
							(_g._callbacks.get(workId[0]))(e.data.result);
							_g._callbacks.remove(workId[0]);
						}
					} catch( error ) {
						haxe.Log.trace(error,{ fileName : "WorkerPool.hx", lineNumber : 77, className : "verb.exe.WorkerPool", methodName : "processQueue"});
					}
					_g.processQueue();
				};
			})(worker,workId);
			worker[0].postMessage(work);
		}
	}
};
verb.geom = {};
verb.geom.ICurve = function() { };
verb.geom.ICurve.__name__ = ["verb","geom","ICurve"];
verb.geom.NurbsCurve = $hx_exports.geom.NurbsCurve = function(data) {
	this._data = verb.core.Check.nurbsCurveData(data);
};
verb.geom.NurbsCurve.__name__ = ["verb","geom","NurbsCurve"];
verb.geom.NurbsCurve.__interfaces__ = [verb.geom.ICurve];
verb.geom.NurbsCurve.byKnotsControlPointsWeights = function(degree,knots,controlPoints,weights) {
	return new verb.geom.NurbsCurve(new verb.core.types.NurbsCurveData(degree,knots.slice(),verb.core.Eval.homogenize1d(controlPoints,weights)));
};
verb.geom.NurbsCurve.byPoints = function(points,degree) {
	if(degree == null) degree = 3;
	return new verb.geom.NurbsCurve(verb.core.Make.rationalInterpCurve(points,degree));
};
verb.geom.NurbsCurve.__super__ = verb.exe.AsyncObject;
verb.geom.NurbsCurve.prototype = $extend(verb.exe.AsyncObject.prototype,{
	degree: function() {
		return this._data.degree;
	}
	,knots: function() {
		return this._data.knots.slice(0);
	}
	,controlPoints: function() {
		return verb.core.Eval.dehomogenize1d(this._data.controlPoints);
	}
	,weights: function() {
		return verb.core.Eval.weight1d(this._data.controlPoints);
	}
	,asNurbs: function() {
		return new verb.core.types.NurbsCurveData(this.degree(),this.knots(),verb.core.Eval.homogenize1d(this.controlPoints(),this.weights()));
	}
	,clone: function() {
		return new verb.geom.NurbsCurve(this._data);
	}
	,domain: function() {
		return new verb.core.types.Interval(this._data.knots[0],verb.core.ArrayExtensions.last(this._data.knots));
	}
	,transform: function(mat) {
		return new verb.geom.NurbsCurve(verb.core.Modify.rationalCurveTransform(this._data,mat));
	}
	,transformAsync: function(mat) {
		return this.defer(verb.core.Modify,"rationalCurveTransform",[this._data,mat]).then(function(x) {
			return new verb.geom.NurbsCurve(x);
		});
	}
	,point: function(u) {
		return verb.core.Eval.rationalCurvePoint(this._data,u);
	}
	,pointAsync: function(u) {
		return this.defer(verb.core.Eval,"rationalCurvePoint",[this._data,u]);
	}
	,tangent: function(u) {
		return verb.core.Eval.rationalCurveTangent(this._data,u);
	}
	,tangentAsync: function(u) {
		return this.defer(verb.core.Eval,"rationalCurveTangent",[this._data,u]);
	}
	,derivatives: function(u,numDerivs) {
		if(numDerivs == null) numDerivs = 1;
		return verb.core.Eval.rationalCurveDerivatives(this._data,u,numDerivs);
	}
	,derivativesAsync: function(u,numDerivs) {
		if(numDerivs == null) numDerivs = 1;
		return this.defer(verb.core.Eval,"rationalCurveDerivatives",[this._data,u,numDerivs]);
	}
	,closestPoint: function(pt) {
		return verb.core.Analyze.rationalCurveClosestPoint(this._data,pt);
	}
	,closestPointAsync: function(pt) {
		return this.defer(verb.core.Analyze,"rationalCurveClosestPoint",[this._data,pt]);
	}
	,closestParam: function(pt) {
		return verb.core.Analyze.rationalCurveClosestParam(this._data,pt);
	}
	,closestParamAsync: function(pt) {
		return this.defer(verb.core.Analyze,"rationalCurveClosestParam",[this._data,pt]);
	}
	,length: function() {
		return verb.core.Analyze.rationalCurveArcLength(this._data);
	}
	,lengthAsync: function() {
		return this.defer(verb.core.Analyze,"rationalCurveArcLength",[this._data]);
	}
	,lengthAtParam: function(u) {
		return verb.core.Analyze.rationalCurveArcLength(this._data,u);
	}
	,lengthAtParamAsync: function() {
		return this.defer(verb.core.Analyze,"rationalCurveArcLength",[this._data]);
	}
	,paramAtLength: function(len,tolerance) {
		return verb.core.Analyze.rationalCurveParamAtArcLength(this._data,len,tolerance);
	}
	,paramAtLengthAsync: function(len,tolerance) {
		return this.defer(verb.core.Analyze,"rationalCurveParamAtArcLength",[this._data,len,tolerance]);
	}
	,divideByEqualArcLength: function(divisions) {
		return verb.core.Divide.rationalCurveByEqualArcLength(this._data,divisions);
	}
	,divideByEqualArcLengthAsync: function(divisions) {
		return this.defer(verb.core.Divide,"rationalCurveByEqualArcLength",[this._data,divisions]);
	}
	,divideByArcLength: function(arcLength) {
		return verb.core.Divide.rationalCurveByArcLength(this._data,arcLength);
	}
	,divideByArcLengthAsync: function(divisions) {
		return this.defer(verb.core.Divide,"rationalCurveByArcLength",[this._data,divisions]);
	}
	,split: function(u) {
		return verb.core.Modify.curveSplit(this._data,u).map(function(x) {
			return new verb.geom.NurbsCurve(x);
		});
	}
	,splitAsync: function(u) {
		return this.defer(verb.core.Modify,"curveSplit",[this._data,u]).then(function(cs) {
			return cs.map(function(x) {
				return new verb.geom.NurbsCurve(x);
			});
		});
	}
	,reverse: function() {
		return new verb.geom.NurbsCurve(verb.core.Modify.curveReverse(this._data));
	}
	,reverseAsync: function() {
		return this.defer(verb.core.Modify,"curveReverse",[this._data]).then(function(c) {
			return new verb.geom.NurbsCurve(c);
		});
	}
	,tessellate: function(tolerance) {
		return verb.core.Tess.rationalCurveAdaptiveSample(this._data,tolerance,false);
	}
	,tessellateAsync: function(tolerance) {
		return this.defer(verb.core.Tess,"rationalCurveAdaptiveSample",[this._data,tolerance,false]);
	}
});
verb.geom.Arc = $hx_exports.geom.Arc = function(center,xaxis,yaxis,radius,minAngle,maxAngle) {
	verb.geom.NurbsCurve.call(this,verb.core.Make.arc(center,xaxis,yaxis,radius,minAngle,maxAngle));
	this._center = center;
	this._xaxis = xaxis;
	this._yaxis = yaxis;
	this._radius = radius;
	this._minAngle = minAngle;
	this._maxAngle = maxAngle;
};
verb.geom.Arc.__name__ = ["verb","geom","Arc"];
verb.geom.Arc.__super__ = verb.geom.NurbsCurve;
verb.geom.Arc.prototype = $extend(verb.geom.NurbsCurve.prototype,{
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
verb.geom.BezierCurve = $hx_exports.geom.BezierCurve = function(points,weights) {
	verb.geom.NurbsCurve.call(this,verb.core.Make.rationalBezierCurve(points,weights));
};
verb.geom.BezierCurve.__name__ = ["verb","geom","BezierCurve"];
verb.geom.BezierCurve.__super__ = verb.geom.NurbsCurve;
verb.geom.BezierCurve.prototype = $extend(verb.geom.NurbsCurve.prototype,{
});
verb.geom.Circle = $hx_exports.geom.Circle = function(center,xaxis,yaxis,radius) {
	verb.geom.Arc.call(this,center,xaxis,yaxis,radius,0,Math.PI * 2);
};
verb.geom.Circle.__name__ = ["verb","geom","Circle"];
verb.geom.Circle.__super__ = verb.geom.Arc;
verb.geom.Circle.prototype = $extend(verb.geom.Arc.prototype,{
});
verb.geom.ISurface = function() { };
verb.geom.ISurface.__name__ = ["verb","geom","ISurface"];
verb.geom.NurbsSurface = $hx_exports.geom.NurbsSurface = function(data) {
	this._data = verb.core.Check.nurbsSurfaceData(data);
};
verb.geom.NurbsSurface.__name__ = ["verb","geom","NurbsSurface"];
verb.geom.NurbsSurface.__interfaces__ = [verb.geom.ISurface];
verb.geom.NurbsSurface.byKnotsControlPointsWeights = function(degreeU,degreeV,knotsU,knotsV,controlPoints,weights) {
	return new verb.geom.NurbsSurface(new verb.core.types.NurbsSurfaceData(degreeU,degreeV,knotsU,knotsV,verb.core.Eval.homogenize2d(controlPoints,weights)));
};
verb.geom.NurbsSurface.byCorners = function(point0,point1,point2,point3) {
	return new verb.geom.NurbsSurface(verb.core.Make.fourPointSurface(point0,point1,point2,point3));
};
verb.geom.NurbsSurface.byLoftingCurves = function(curves,degreeV) {
	return new verb.geom.NurbsSurface(verb.core.Make.loftedSurface((function($this) {
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
verb.geom.NurbsSurface.__super__ = verb.exe.AsyncObject;
verb.geom.NurbsSurface.prototype = $extend(verb.exe.AsyncObject.prototype,{
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
		return verb.core.Eval.dehomogenize2d(this._data.controlPoints);
	}
	,weights: function() {
		return verb.core.Eval.weight2d(this._data.controlPoints);
	}
	,asNurbs: function() {
		return new verb.core.types.NurbsSurfaceData(this.degreeU(),this.degreeV(),this.knotsU(),this.knotsV(),verb.core.Eval.homogenize2d(this.controlPoints(),this.weights()));
	}
	,clone: function() {
		return new verb.geom.NurbsSurface(this.asNurbs());
	}
	,domainU: function() {
		return new verb.core.types.Interval(this._data.knotsU[0],verb.core.ArrayExtensions.last(this._data.knotsU));
	}
	,domainV: function() {
		return new verb.core.types.Interval(this._data.knotsV[0],verb.core.ArrayExtensions.last(this._data.knotsV));
	}
	,point: function(u,v) {
		return verb.core.Eval.rationalSurfacePoint(this._data,u,v);
	}
	,pointAsync: function(u,v) {
		return this.defer(verb.core.Eval,"rationalSurfacePoint",[this._data,u,v]);
	}
	,normal: function(u,v) {
		return verb.core.Eval.rationalSurfaceNormal(this._data,u,v);
	}
	,normalAsync: function(u,v) {
		return this.defer(verb.core.Eval,"rationalSurfaceNormal",[this._data,u,v]);
	}
	,derivatives: function(u,v,numDerivs) {
		if(numDerivs == null) numDerivs = 1;
		return verb.core.Eval.rationalSurfaceDerivatives(this._data,u,v,numDerivs);
	}
	,derivativesAsync: function(u,v,numDerivs) {
		if(numDerivs == null) numDerivs = 1;
		return this.defer(verb.core.Eval,"rationalSurfaceDerivatives",[this._data,u,v,numDerivs]);
	}
	,closestParam: function(pt) {
		return verb.core.Analyze.rationalSurfaceClosestParam(this._data,pt);
	}
	,closestParamAsync: function(pt) {
		return this.defer(verb.core.Analyze,"rationalSurfaceClosestParam",[this._data,pt]);
	}
	,closestPoint: function(pt) {
		return verb.core.Analyze.rationalSurfaceClosestPoint(this._data,pt);
	}
	,closestPointAsync: function(pt) {
		return this.defer(verb.core.Analyze,"rationalSurfaceClosestPoint",[this._data,pt]);
	}
	,split: function(u,useV) {
		if(useV == null) useV = false;
		return verb.core.Modify.surfaceSplit(this._data,u,useV).map(function(x) {
			return new verb.geom.NurbsSurface(x);
		});
	}
	,splitAsync: function(u,useV) {
		if(useV == null) useV = false;
		return this.defer(verb.core.Modify,"surfaceSplit",[this._data,u,useV]).then(function(s) {
			return s.map(function(x) {
				return new verb.geom.NurbsSurface(x);
			});
		});
	}
	,reverse: function(useV) {
		if(useV == null) useV = false;
		return new verb.geom.NurbsSurface(verb.core.Modify.surfaceReverse(this._data,useV));
	}
	,reverseAsync: function(useV) {
		if(useV == null) useV = false;
		return this.defer(verb.core.Modify,"surfaceReverse",[this._data,useV]).then(function(c) {
			return new verb.geom.NurbsSurface(c);
		});
	}
	,isocurve: function(u,useV) {
		if(useV == null) useV = false;
		return new verb.geom.NurbsCurve(verb.core.Make.surfaceIsocurve(this._data,u,useV));
	}
	,isocurveAsync: function(u,useV) {
		if(useV == null) useV = false;
		return this.defer(verb.core.Make,"surfaceIsocurve",[this._data,u,useV]).then(function(x) {
			return new verb.geom.NurbsCurve(x);
		});
	}
	,boundaries: function(options) {
		return verb.core.Make.surfaceBoundaryCurves(this._data).map(function(x) {
			return new verb.geom.NurbsCurve(x);
		});
	}
	,boundariesAsync: function(options) {
		return this.defer(verb.core.Make,"surfaceBoundaryCurves",[this._data]).then(function(cs) {
			return cs.map(function(x) {
				return new verb.geom.NurbsCurve(x);
			});
		});
	}
	,tessellate: function(options) {
		return verb.core.Tess.rationalSurfaceAdaptive(this._data,options);
	}
	,tessellateAsync: function(options) {
		return this.defer(verb.core.Tess,"rationalSurfaceAdaptive",[this._data,options]);
	}
	,transform: function(mat) {
		return new verb.geom.NurbsSurface(verb.core.Modify.rationalSurfaceTransform(this._data,mat));
	}
	,transformAsync: function(mat) {
		return this.defer(verb.core.Modify,"rationalSurfaceTransform",[this._data,mat]).then(function(x) {
			return new verb.geom.NurbsSurface(x);
		});
	}
});
verb.geom.ConicalSurface = $hx_exports.geom.ConicalSurface = function(axis,xaxis,base,height,radius) {
	verb.geom.NurbsSurface.call(this,verb.core.Make.conicalSurface(axis,xaxis,base,height,radius));
	this._axis = axis;
	this._xaxis = xaxis;
	this._base = base;
	this._height = height;
	this._radius = radius;
};
verb.geom.ConicalSurface.__name__ = ["verb","geom","ConicalSurface"];
verb.geom.ConicalSurface.__super__ = verb.geom.NurbsSurface;
verb.geom.ConicalSurface.prototype = $extend(verb.geom.NurbsSurface.prototype,{
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
verb.geom.CylindricalSurface = $hx_exports.geom.CylindricalSurface = function(axis,xaxis,base,height,radius) {
	verb.geom.NurbsSurface.call(this,verb.core.Make.cylindricalSurface(axis,xaxis,base,height,radius));
	this._axis = axis;
	this._xaxis = xaxis;
	this._base = base;
	this._height = height;
	this._radius = radius;
};
verb.geom.CylindricalSurface.__name__ = ["verb","geom","CylindricalSurface"];
verb.geom.CylindricalSurface.__super__ = verb.geom.NurbsSurface;
verb.geom.CylindricalSurface.prototype = $extend(verb.geom.NurbsSurface.prototype,{
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
verb.geom.EllipseArc = $hx_exports.geom.EllipseArc = function(center,xaxis,yaxis,minAngle,maxAngle) {
	verb.geom.NurbsCurve.call(this,verb.core.Make.ellipseArc(center,xaxis,yaxis,minAngle,maxAngle));
	this._center = center;
	this._xaxis = xaxis;
	this._yaxis = yaxis;
	this._minAngle = minAngle;
	this._maxAngle = maxAngle;
};
verb.geom.EllipseArc.__name__ = ["verb","geom","EllipseArc"];
verb.geom.EllipseArc.__super__ = verb.geom.NurbsCurve;
verb.geom.EllipseArc.prototype = $extend(verb.geom.NurbsCurve.prototype,{
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
verb.geom.Ellipse = $hx_exports.geom.Ellipse = function(center,xaxis,yaxis) {
	verb.geom.EllipseArc.call(this,center,xaxis,yaxis,0,Math.PI * 2);
};
verb.geom.Ellipse.__name__ = ["verb","geom","Ellipse"];
verb.geom.Ellipse.__super__ = verb.geom.EllipseArc;
verb.geom.Ellipse.prototype = $extend(verb.geom.EllipseArc.prototype,{
});
verb.geom.ExtrudedSurface = $hx_exports.geom.ExtrudedSurface = function(profile,direction) {
	verb.geom.NurbsSurface.call(this,verb.core.Make.extrudedSurface(verb.core.Vec.normalized(direction),verb.core.Vec.norm(direction),profile.asNurbs()));
	this._profile = profile;
	this._direction = direction;
};
verb.geom.ExtrudedSurface.__name__ = ["verb","geom","ExtrudedSurface"];
verb.geom.ExtrudedSurface.__super__ = verb.geom.NurbsSurface;
verb.geom.ExtrudedSurface.prototype = $extend(verb.geom.NurbsSurface.prototype,{
	profile: function() {
		return this._profile;
	}
	,direction: function() {
		return this._direction;
	}
});
verb.geom.Intersect = $hx_exports.geom.Intersect = function() { };
verb.geom.Intersect.__name__ = ["verb","geom","Intersect"];
verb.geom.Intersect.curves = function(first,second,tol) {
	if(tol == null) tol = 1e-3;
	return verb.core.Intersect.curves(first.asNurbs(),second.asNurbs(),tol);
};
verb.geom.Intersect.curvesAsync = function(first,second,tol) {
	if(tol == null) tol = 1e-3;
	return verb.exe.Dispatcher.dispatchMethod(verb.core.Intersect,"curves",[first.asNurbs(),second.asNurbs(),tol]);
};
verb.geom.Intersect.curveAndSurface = function(curve,surface,tol) {
	if(tol == null) tol = 1e-3;
	return verb.core.Intersect.curveAndSurface(curve.asNurbs(),surface.asNurbs(),tol);
};
verb.geom.Intersect.curveAndSurfaceAsync = function(curve,surface,tol) {
	if(tol == null) tol = 1e-3;
	return verb.exe.Dispatcher.dispatchMethod(verb.core.Intersect,"curveAndSurface",[curve.asNurbs(),surface.asNurbs(),tol]);
};
verb.geom.Intersect.surfaces = function(first,second,tol) {
	if(tol == null) tol = 1e-3;
	return verb.core.Intersect.surfaces(first.asNurbs(),second.asNurbs(),tol).map(function(cd) {
		return new verb.geom.NurbsCurve(cd);
	});
};
verb.geom.Intersect.surfacesAsync = function(first,second,tol) {
	if(tol == null) tol = 1e-3;
	return verb.exe.Dispatcher.dispatchMethod(verb.core.Intersect,"surfaces",[first.asNurbs(),second.asNurbs(),tol]).then(function(cds) {
		return cds.map(function(cd) {
			return new verb.geom.NurbsCurve(cd);
		});
	});
};
verb.geom.Line = $hx_exports.geom.Line = function(start,end) {
	verb.geom.NurbsCurve.call(this,verb.core.Make.polyline([start,end]));
	this._start = start;
	this._end = end;
};
verb.geom.Line.__name__ = ["verb","geom","Line"];
verb.geom.Line.__super__ = verb.geom.NurbsCurve;
verb.geom.Line.prototype = $extend(verb.geom.NurbsCurve.prototype,{
	start: function() {
		return this._start;
	}
	,end: function() {
		return this._end;
	}
});
verb.geom.RevolvedSurface = $hx_exports.geom.RevolvedSurface = function(profile,center,axis,angle) {
	verb.geom.NurbsSurface.call(this,verb.core.Make.revolvedSurface(profile.asNurbs(),center,axis,angle));
	this._profile = profile;
	this._center = center;
	this._axis = axis;
	this._angle = angle;
};
verb.geom.RevolvedSurface.__name__ = ["verb","geom","RevolvedSurface"];
verb.geom.RevolvedSurface.__super__ = verb.geom.NurbsSurface;
verb.geom.RevolvedSurface.prototype = $extend(verb.geom.NurbsSurface.prototype,{
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
verb.geom.SphericalSurface = $hx_exports.geom.SphericalSurface = function(center,radius) {
	verb.geom.NurbsSurface.call(this,verb.core.Make.sphericalSurface(center,[0,0,1],[1,0,0],radius));
	this._center = center;
	this._radius = radius;
};
verb.geom.SphericalSurface.__name__ = ["verb","geom","SphericalSurface"];
verb.geom.SphericalSurface.__super__ = verb.geom.NurbsSurface;
verb.geom.SphericalSurface.prototype = $extend(verb.geom.NurbsSurface.prototype,{
	center: function() {
		return this._center;
	}
	,radius: function() {
		return this._radius;
	}
});
verb.geom.SweptSurface = $hx_exports.geom.SweptSurface = function(profile,rail) {
	verb.geom.NurbsSurface.call(this,verb.core.Make.rationalTranslationalSurface(profile.asNurbs(),rail.asNurbs()));
	this._profile = profile;
	this._rail = rail;
};
verb.geom.SweptSurface.__name__ = ["verb","geom","SweptSurface"];
verb.geom.SweptSurface.__super__ = verb.geom.NurbsSurface;
verb.geom.SweptSurface.prototype = $extend(verb.geom.NurbsSurface.prototype,{
	profile: function() {
		return this._profile;
	}
	,rail: function() {
		return this._rail;
	}
});
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

    var tasks = (function () {
        function Task(handler, args) {
            this.handler = handler;
            this.args = args;
        }
        Task.prototype.run = function () {
            // See steps in section 5 of the spec.
            if (typeof this.handler === "function") {
                // Choice of `thisArg` is not in the setImmediate spec; `undefined` is in the setTimeout spec though:
                // http://www.whatwg.org/specs/web-apps/current-work/multipage/timers.html
                this.handler.apply(undefined, this.args);
            } else {
                var scriptSource = "" + this.handler;
                /*jshint evil: true */
                eval(scriptSource);
            }
        };

        var nextHandle = 1; // Spec says greater than zero
        var tasksByHandle = {};
        var currentlyRunningATask = false;

        return {
            addFromSetImmediateArguments: function (args) {
                var handler = args[0];
                var argsToHandle = Array.prototype.slice.call(args, 1);
                var task = new Task(handler, argsToHandle);

                var thisHandle = nextHandle++;
                tasksByHandle[thisHandle] = task;
                return thisHandle;
            },
            runIfPresent: function (handle) {
                // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
                // So if we're currently running a task, we'll need to delay this invocation.
                if (!currentlyRunningATask) {
                    var task = tasksByHandle[handle];
                    if (task) {
                        currentlyRunningATask = true;
                        try {
                            task.run();
                        } finally {
                            delete tasksByHandle[handle];
                            currentlyRunningATask = false;
                        }
                    }
                } else {
                    // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
                    // "too much recursion" error.
                    global.setTimeout(function () {
                        tasks.runIfPresent(handle);
                    }, 0);
                }
            },
            remove: function (handle) {
                delete tasksByHandle[handle];
            }
        };
    }());

    function canUseNextTick() {
        // Don't get fooled by e.g. browserify environments.
        return typeof process === "object" &&
               Object.prototype.toString.call(process) === "[object process]";
    }

    function canUseMessageChannel() {
        return !!global.MessageChannel;
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.

        if (!global.postMessage || global.importScripts) {
            return false;
        }

        var postMessageIsAsynchronous = true;
        var oldOnMessage = global.onmessage;
        global.onmessage = function () {
            postMessageIsAsynchronous = false;
        };
        global.postMessage("", "*");
        global.onmessage = oldOnMessage;

        return postMessageIsAsynchronous;
    }

    function canUseReadyStateChange() {
        return "document" in global && "onreadystatechange" in global.document.createElement("script");
    }

    function installNextTickImplementation(attachTo) {
        attachTo.setImmediate = function () {
            var handle = tasks.addFromSetImmediateArguments(arguments);

            process.nextTick(function () {
                tasks.runIfPresent(handle);
            });

            return handle;
        };
    }

    function installMessageChannelImplementation(attachTo) {
        var channel = new global.MessageChannel();
        channel.port1.onmessage = function (event) {
            var handle = event.data;
            tasks.runIfPresent(handle);
        };
        attachTo.setImmediate = function () {
            var handle = tasks.addFromSetImmediateArguments(arguments);

            channel.port2.postMessage(handle);

            return handle;
        };
    }

    function installPostMessageImplementation(attachTo) {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var MESSAGE_PREFIX = "com.bn.NobleJS.setImmediate" + Math.random();

        function isStringAndStartsWith(string, putativeStart) {
            return typeof string === "string" && string.substring(0, putativeStart.length) === putativeStart;
        }

        function onGlobalMessage(event) {
            // This will catch all incoming messages (even from other windows!), so we need to try reasonably hard to
            // avoid letting anyone else trick us into firing off. We test the origin is still this window, and that a
            // (randomly generated) unpredictable identifying prefix is present.
            if (event.source === global && isStringAndStartsWith(event.data, MESSAGE_PREFIX)) {
                var handle = event.data.substring(MESSAGE_PREFIX.length);
                tasks.runIfPresent(handle);
            }
        }
        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        attachTo.setImmediate = function () {
            var handle = tasks.addFromSetImmediateArguments(arguments);

            // Make `global` post a message to itself with the handle and identifying prefix, thus asynchronously
            // invoking our onGlobalMessage listener above.
            global.postMessage(MESSAGE_PREFIX + handle, "*");

            return handle;
        };
    }

    function installReadyStateChangeImplementation(attachTo) {
        attachTo.setImmediate = function () {
            var handle = tasks.addFromSetImmediateArguments(arguments);

            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var scriptEl = global.document.createElement("script");
            scriptEl.onreadystatechange = function () {
                tasks.runIfPresent(handle);

                scriptEl.onreadystatechange = null;
                scriptEl.parentNode.removeChild(scriptEl);
                scriptEl = null;
            };
            global.document.documentElement.appendChild(scriptEl);

            return handle;
        };
    }

    function installSetTimeoutImplementation(attachTo) {
        attachTo.setImmediate = function () {
            var handle = tasks.addFromSetImmediateArguments(arguments);

            global.setTimeout(function () {
                tasks.runIfPresent(handle);
            }, 0);

            return handle;
        };
    }

    if (!global.setImmediate) {
        // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
        var attachTo = typeof Object.getPrototypeOf === "function" && "setTimeout" in Object.getPrototypeOf(global) ?
                          Object.getPrototypeOf(global)
                        : global;

        if (canUseNextTick()) {
            // For Node.js before 0.9
            installNextTickImplementation(attachTo);
        } else if (canUsePostMessage()) {
            // For non-IE10 modern browsers
            installPostMessageImplementation(attachTo);
        } else if (canUseMessageChannel()) {
            // For web workers, where supported
            installMessageChannelImplementation(attachTo);
        } else if (canUseReadyStateChange()) {
            // For IE 6–8
            installReadyStateChangeImplementation(attachTo);
        } else {
            // For older browsers
            installSetTimeoutImplementation(attachTo);
        }

        attachTo.clearImmediate = tasks.remove;
    }
}(typeof global === "object" && global ? global : this));
;
promhx.base.EventLoop.queue = new List();
verb.core.Analyze.Tvalues = [[],[],[-0.5773502691896257645091487805019574556476,0.5773502691896257645091487805019574556476],[0,-0.7745966692414833770358530799564799221665,0.7745966692414833770358530799564799221665],[-0.3399810435848562648026657591032446872005,0.3399810435848562648026657591032446872005,-0.8611363115940525752239464888928095050957,0.8611363115940525752239464888928095050957],[0,-0.5384693101056830910363144207002088049672,0.5384693101056830910363144207002088049672,-0.9061798459386639927976268782993929651256,0.9061798459386639927976268782993929651256],[0.6612093864662645136613995950199053470064,-0.6612093864662645136613995950199053470064,-0.2386191860831969086305017216807119354186,0.2386191860831969086305017216807119354186,-0.9324695142031520278123015544939946091347,0.9324695142031520278123015544939946091347],[0,0.4058451513773971669066064120769614633473,-0.4058451513773971669066064120769614633473,-0.7415311855993944398638647732807884070741,0.7415311855993944398638647732807884070741,-0.9491079123427585245261896840478512624007,0.9491079123427585245261896840478512624007],[-0.1834346424956498049394761423601839806667,0.1834346424956498049394761423601839806667,-0.5255324099163289858177390491892463490419,0.5255324099163289858177390491892463490419,-0.7966664774136267395915539364758304368371,0.7966664774136267395915539364758304368371,-0.9602898564975362316835608685694729904282,0.9602898564975362316835608685694729904282],[0,-0.8360311073266357942994297880697348765441,0.8360311073266357942994297880697348765441,-0.9681602395076260898355762029036728700494,0.9681602395076260898355762029036728700494,-0.3242534234038089290385380146433366085719,0.3242534234038089290385380146433366085719,-0.6133714327005903973087020393414741847857,0.6133714327005903973087020393414741847857],[-0.1488743389816312108848260011297199846175,0.1488743389816312108848260011297199846175,-0.4333953941292471907992659431657841622000,0.4333953941292471907992659431657841622000,-0.6794095682990244062343273651148735757692,0.6794095682990244062343273651148735757692,-0.8650633666889845107320966884234930485275,0.8650633666889845107320966884234930485275,-0.9739065285171717200779640120844520534282,0.9739065285171717200779640120844520534282],[0,-0.2695431559523449723315319854008615246796,0.2695431559523449723315319854008615246796,-0.5190961292068118159257256694586095544802,0.5190961292068118159257256694586095544802,-0.7301520055740493240934162520311534580496,0.7301520055740493240934162520311534580496,-0.8870625997680952990751577693039272666316,0.8870625997680952990751577693039272666316,-0.9782286581460569928039380011228573907714,0.9782286581460569928039380011228573907714],[-0.1252334085114689154724413694638531299833,0.1252334085114689154724413694638531299833,-0.3678314989981801937526915366437175612563,0.3678314989981801937526915366437175612563,-0.5873179542866174472967024189405342803690,0.5873179542866174472967024189405342803690,-0.7699026741943046870368938332128180759849,0.7699026741943046870368938332128180759849,-0.9041172563704748566784658661190961925375,0.9041172563704748566784658661190961925375,-0.9815606342467192506905490901492808229601,0.9815606342467192506905490901492808229601],[0,-0.2304583159551347940655281210979888352115,0.2304583159551347940655281210979888352115,-0.4484927510364468528779128521276398678019,0.4484927510364468528779128521276398678019,-0.6423493394403402206439846069955156500716,0.6423493394403402206439846069955156500716,-0.8015780907333099127942064895828598903056,0.8015780907333099127942064895828598903056,-0.9175983992229779652065478365007195123904,0.9175983992229779652065478365007195123904,-0.9841830547185881494728294488071096110649,0.9841830547185881494728294488071096110649],[-0.1080549487073436620662446502198347476119,0.1080549487073436620662446502198347476119,-0.3191123689278897604356718241684754668342,0.3191123689278897604356718241684754668342,-0.5152486363581540919652907185511886623088,0.5152486363581540919652907185511886623088,-0.6872929048116854701480198030193341375384,0.6872929048116854701480198030193341375384,-0.8272013150697649931897947426503949610397,0.8272013150697649931897947426503949610397,-0.9284348836635735173363911393778742644770,0.9284348836635735173363911393778742644770,-0.9862838086968123388415972667040528016760,0.9862838086968123388415972667040528016760],[0,-0.2011940939974345223006283033945962078128,0.2011940939974345223006283033945962078128,-0.3941513470775633698972073709810454683627,0.3941513470775633698972073709810454683627,-0.5709721726085388475372267372539106412383,0.5709721726085388475372267372539106412383,-0.7244177313601700474161860546139380096308,0.7244177313601700474161860546139380096308,-0.8482065834104272162006483207742168513662,0.8482065834104272162006483207742168513662,-0.9372733924007059043077589477102094712439,0.9372733924007059043077589477102094712439,-0.9879925180204854284895657185866125811469,0.9879925180204854284895657185866125811469],[-0.0950125098376374401853193354249580631303,0.0950125098376374401853193354249580631303,-0.2816035507792589132304605014604961064860,0.2816035507792589132304605014604961064860,-0.4580167776572273863424194429835775735400,0.4580167776572273863424194429835775735400,-0.6178762444026437484466717640487910189918,0.6178762444026437484466717640487910189918,-0.7554044083550030338951011948474422683538,0.7554044083550030338951011948474422683538,-0.8656312023878317438804678977123931323873,0.8656312023878317438804678977123931323873,-0.9445750230732325760779884155346083450911,0.9445750230732325760779884155346083450911,-0.9894009349916499325961541734503326274262,0.9894009349916499325961541734503326274262],[0,-0.1784841814958478558506774936540655574754,0.1784841814958478558506774936540655574754,-0.3512317634538763152971855170953460050405,0.3512317634538763152971855170953460050405,-0.5126905370864769678862465686295518745829,0.5126905370864769678862465686295518745829,-0.6576711592166907658503022166430023351478,0.6576711592166907658503022166430023351478,-0.7815140038968014069252300555204760502239,0.7815140038968014069252300555204760502239,-0.8802391537269859021229556944881556926234,0.8802391537269859021229556944881556926234,-0.9506755217687677612227169578958030214433,0.9506755217687677612227169578958030214433,-0.9905754753144173356754340199406652765077,0.9905754753144173356754340199406652765077],[-0.0847750130417353012422618529357838117333,0.0847750130417353012422618529357838117333,-0.2518862256915055095889728548779112301628,0.2518862256915055095889728548779112301628,-0.4117511614628426460359317938330516370789,0.4117511614628426460359317938330516370789,-0.5597708310739475346078715485253291369276,0.5597708310739475346078715485253291369276,-0.6916870430603532078748910812888483894522,0.6916870430603532078748910812888483894522,-0.8037049589725231156824174550145907971032,0.8037049589725231156824174550145907971032,-0.8926024664975557392060605911271455154078,0.8926024664975557392060605911271455154078,-0.9558239495713977551811958929297763099728,0.9558239495713977551811958929297763099728,-0.9915651684209309467300160047061507702525,0.9915651684209309467300160047061507702525],[0,-0.1603586456402253758680961157407435495048,0.1603586456402253758680961157407435495048,-0.3165640999636298319901173288498449178922,0.3165640999636298319901173288498449178922,-0.4645707413759609457172671481041023679762,0.4645707413759609457172671481041023679762,-0.6005453046616810234696381649462392798683,0.6005453046616810234696381649462392798683,-0.7209661773352293786170958608237816296571,0.7209661773352293786170958608237816296571,-0.8227146565371428249789224867127139017745,0.8227146565371428249789224867127139017745,-0.9031559036148179016426609285323124878093,0.9031559036148179016426609285323124878093,-0.9602081521348300308527788406876515266150,0.9602081521348300308527788406876515266150,-0.9924068438435844031890176702532604935893,0.9924068438435844031890176702532604935893],[-0.0765265211334973337546404093988382110047,0.0765265211334973337546404093988382110047,-0.2277858511416450780804961953685746247430,0.2277858511416450780804961953685746247430,-0.3737060887154195606725481770249272373957,0.3737060887154195606725481770249272373957,-0.5108670019508270980043640509552509984254,0.5108670019508270980043640509552509984254,-0.6360536807265150254528366962262859367433,0.6360536807265150254528366962262859367433,-0.7463319064601507926143050703556415903107,0.7463319064601507926143050703556415903107,-0.8391169718222188233945290617015206853296,0.8391169718222188233945290617015206853296,-0.9122344282513259058677524412032981130491,0.9122344282513259058677524412032981130491,-0.9639719272779137912676661311972772219120,0.9639719272779137912676661311972772219120,-0.9931285991850949247861223884713202782226,0.9931285991850949247861223884713202782226],[0,-0.1455618541608950909370309823386863301163,0.1455618541608950909370309823386863301163,-0.2880213168024010966007925160646003199090,0.2880213168024010966007925160646003199090,-0.4243421202074387835736688885437880520964,0.4243421202074387835736688885437880520964,-0.5516188358872198070590187967243132866220,0.5516188358872198070590187967243132866220,-0.6671388041974123193059666699903391625970,0.6671388041974123193059666699903391625970,-0.7684399634756779086158778513062280348209,0.7684399634756779086158778513062280348209,-0.8533633645833172836472506385875676702761,0.8533633645833172836472506385875676702761,-0.9200993341504008287901871337149688941591,0.9200993341504008287901871337149688941591,-0.9672268385663062943166222149076951614246,0.9672268385663062943166222149076951614246,-0.9937521706203895002602420359379409291933,0.9937521706203895002602420359379409291933],[-0.0697392733197222212138417961186280818222,0.0697392733197222212138417961186280818222,-0.2078604266882212854788465339195457342156,0.2078604266882212854788465339195457342156,-0.3419358208920842251581474204273796195591,0.3419358208920842251581474204273796195591,-0.4693558379867570264063307109664063460953,0.4693558379867570264063307109664063460953,-0.5876404035069115929588769276386473488776,0.5876404035069115929588769276386473488776,-0.6944872631866827800506898357622567712673,0.6944872631866827800506898357622567712673,-0.7878168059792081620042779554083515213881,0.7878168059792081620042779554083515213881,-0.8658125777203001365364256370193787290847,0.8658125777203001365364256370193787290847,-0.9269567721871740005206929392590531966353,0.9269567721871740005206929392590531966353,-0.9700604978354287271239509867652687108059,0.9700604978354287271239509867652687108059,-0.9942945854823992920730314211612989803930,0.9942945854823992920730314211612989803930],[0,-0.1332568242984661109317426822417661370104,0.1332568242984661109317426822417661370104,-0.2641356809703449305338695382833096029790,0.2641356809703449305338695382833096029790,-0.3903010380302908314214888728806054585780,0.3903010380302908314214888728806054585780,-0.5095014778460075496897930478668464305448,0.5095014778460075496897930478668464305448,-0.6196098757636461563850973116495956533871,0.6196098757636461563850973116495956533871,-0.7186613631319501944616244837486188483299,0.7186613631319501944616244837486188483299,-0.8048884016188398921511184069967785579414,0.8048884016188398921511184069967785579414,-0.8767523582704416673781568859341456716389,0.8767523582704416673781568859341456716389,-0.9329710868260161023491969890384229782357,0.9329710868260161023491969890384229782357,-0.9725424712181152319560240768207773751816,0.9725424712181152319560240768207773751816,-0.9947693349975521235239257154455743605736,0.9947693349975521235239257154455743605736],[-0.0640568928626056260850430826247450385909,0.0640568928626056260850430826247450385909,-0.1911188674736163091586398207570696318404,0.1911188674736163091586398207570696318404,-0.3150426796961633743867932913198102407864,0.3150426796961633743867932913198102407864,-0.4337935076260451384870842319133497124524,0.4337935076260451384870842319133497124524,-0.5454214713888395356583756172183723700107,0.5454214713888395356583756172183723700107,-0.6480936519369755692524957869107476266696,0.6480936519369755692524957869107476266696,-0.7401241915785543642438281030999784255232,0.7401241915785543642438281030999784255232,-0.8200019859739029219539498726697452080761,0.8200019859739029219539498726697452080761,-0.8864155270044010342131543419821967550873,0.8864155270044010342131543419821967550873,-0.9382745520027327585236490017087214496548,0.9382745520027327585236490017087214496548,-0.9747285559713094981983919930081690617411,0.9747285559713094981983919930081690617411,-0.9951872199970213601799974097007368118745,0.9951872199970213601799974097007368118745]];
verb.core.Analyze.Cvalues = [[],[],[1.0,1.0],[0.8888888888888888888888888888888888888888,0.5555555555555555555555555555555555555555,0.5555555555555555555555555555555555555555],[0.6521451548625461426269360507780005927646,0.6521451548625461426269360507780005927646,0.3478548451374538573730639492219994072353,0.3478548451374538573730639492219994072353],[0.5688888888888888888888888888888888888888,0.4786286704993664680412915148356381929122,0.4786286704993664680412915148356381929122,0.2369268850561890875142640407199173626432,0.2369268850561890875142640407199173626432],[0.3607615730481386075698335138377161116615,0.3607615730481386075698335138377161116615,0.4679139345726910473898703439895509948116,0.4679139345726910473898703439895509948116,0.1713244923791703450402961421727328935268,0.1713244923791703450402961421727328935268],[0.4179591836734693877551020408163265306122,0.3818300505051189449503697754889751338783,0.3818300505051189449503697754889751338783,0.2797053914892766679014677714237795824869,0.2797053914892766679014677714237795824869,0.1294849661688696932706114326790820183285,0.1294849661688696932706114326790820183285],[0.3626837833783619829651504492771956121941,0.3626837833783619829651504492771956121941,0.3137066458778872873379622019866013132603,0.3137066458778872873379622019866013132603,0.2223810344533744705443559944262408844301,0.2223810344533744705443559944262408844301,0.1012285362903762591525313543099621901153,0.1012285362903762591525313543099621901153],[0.3302393550012597631645250692869740488788,0.1806481606948574040584720312429128095143,0.1806481606948574040584720312429128095143,0.0812743883615744119718921581105236506756,0.0812743883615744119718921581105236506756,0.3123470770400028400686304065844436655987,0.3123470770400028400686304065844436655987,0.2606106964029354623187428694186328497718,0.2606106964029354623187428694186328497718],[0.2955242247147528701738929946513383294210,0.2955242247147528701738929946513383294210,0.2692667193099963550912269215694693528597,0.2692667193099963550912269215694693528597,0.2190863625159820439955349342281631924587,0.2190863625159820439955349342281631924587,0.1494513491505805931457763396576973324025,0.1494513491505805931457763396576973324025,0.0666713443086881375935688098933317928578,0.0666713443086881375935688098933317928578],[0.2729250867779006307144835283363421891560,0.2628045445102466621806888698905091953727,0.2628045445102466621806888698905091953727,0.2331937645919904799185237048431751394317,0.2331937645919904799185237048431751394317,0.1862902109277342514260976414316558916912,0.1862902109277342514260976414316558916912,0.1255803694649046246346942992239401001976,0.1255803694649046246346942992239401001976,0.0556685671161736664827537204425485787285,0.0556685671161736664827537204425485787285],[0.2491470458134027850005624360429512108304,0.2491470458134027850005624360429512108304,0.2334925365383548087608498989248780562594,0.2334925365383548087608498989248780562594,0.2031674267230659217490644558097983765065,0.2031674267230659217490644558097983765065,0.1600783285433462263346525295433590718720,0.1600783285433462263346525295433590718720,0.1069393259953184309602547181939962242145,0.1069393259953184309602547181939962242145,0.0471753363865118271946159614850170603170,0.0471753363865118271946159614850170603170],[0.2325515532308739101945895152688359481566,0.2262831802628972384120901860397766184347,0.2262831802628972384120901860397766184347,0.2078160475368885023125232193060527633865,0.2078160475368885023125232193060527633865,0.1781459807619457382800466919960979955128,0.1781459807619457382800466919960979955128,0.1388735102197872384636017768688714676218,0.1388735102197872384636017768688714676218,0.0921214998377284479144217759537971209236,0.0921214998377284479144217759537971209236,0.0404840047653158795200215922009860600419,0.0404840047653158795200215922009860600419],[0.2152638534631577901958764433162600352749,0.2152638534631577901958764433162600352749,0.2051984637212956039659240656612180557103,0.2051984637212956039659240656612180557103,0.1855383974779378137417165901251570362489,0.1855383974779378137417165901251570362489,0.1572031671581935345696019386238421566056,0.1572031671581935345696019386238421566056,0.1215185706879031846894148090724766259566,0.1215185706879031846894148090724766259566,0.0801580871597602098056332770628543095836,0.0801580871597602098056332770628543095836,0.0351194603317518630318328761381917806197,0.0351194603317518630318328761381917806197],[0.2025782419255612728806201999675193148386,0.1984314853271115764561183264438393248186,0.1984314853271115764561183264438393248186,0.1861610000155622110268005618664228245062,0.1861610000155622110268005618664228245062,0.1662692058169939335532008604812088111309,0.1662692058169939335532008604812088111309,0.1395706779261543144478047945110283225208,0.1395706779261543144478047945110283225208,0.1071592204671719350118695466858693034155,0.1071592204671719350118695466858693034155,0.0703660474881081247092674164506673384667,0.0703660474881081247092674164506673384667,0.0307532419961172683546283935772044177217,0.0307532419961172683546283935772044177217],[0.1894506104550684962853967232082831051469,0.1894506104550684962853967232082831051469,0.1826034150449235888667636679692199393835,0.1826034150449235888667636679692199393835,0.1691565193950025381893120790303599622116,0.1691565193950025381893120790303599622116,0.1495959888165767320815017305474785489704,0.1495959888165767320815017305474785489704,0.1246289712555338720524762821920164201448,0.1246289712555338720524762821920164201448,0.0951585116824927848099251076022462263552,0.0951585116824927848099251076022462263552,0.0622535239386478928628438369943776942749,0.0622535239386478928628438369943776942749,0.0271524594117540948517805724560181035122,0.0271524594117540948517805724560181035122],[0.1794464703562065254582656442618856214487,0.1765627053669926463252709901131972391509,0.1765627053669926463252709901131972391509,0.1680041021564500445099706637883231550211,0.1680041021564500445099706637883231550211,0.1540457610768102880814315948019586119404,0.1540457610768102880814315948019586119404,0.1351363684685254732863199817023501973721,0.1351363684685254732863199817023501973721,0.1118838471934039710947883856263559267358,0.1118838471934039710947883856263559267358,0.0850361483171791808835353701910620738504,0.0850361483171791808835353701910620738504,0.0554595293739872011294401653582446605128,0.0554595293739872011294401653582446605128,0.0241483028685479319601100262875653246916,0.0241483028685479319601100262875653246916],[0.1691423829631435918406564701349866103341,0.1691423829631435918406564701349866103341,0.1642764837458327229860537764659275904123,0.1642764837458327229860537764659275904123,0.1546846751262652449254180038363747721932,0.1546846751262652449254180038363747721932,0.1406429146706506512047313037519472280955,0.1406429146706506512047313037519472280955,0.1225552067114784601845191268002015552281,0.1225552067114784601845191268002015552281,0.1009420441062871655628139849248346070628,0.1009420441062871655628139849248346070628,0.0764257302548890565291296776166365256053,0.0764257302548890565291296776166365256053,0.0497145488949697964533349462026386416808,0.0497145488949697964533349462026386416808,0.0216160135264833103133427102664524693876,0.0216160135264833103133427102664524693876],[0.1610544498487836959791636253209167350399,0.1589688433939543476499564394650472016787,0.1589688433939543476499564394650472016787,0.1527660420658596667788554008976629984610,0.1527660420658596667788554008976629984610,0.1426067021736066117757461094419029724756,0.1426067021736066117757461094419029724756,0.1287539625393362276755157848568771170558,0.1287539625393362276755157848568771170558,0.1115666455473339947160239016817659974813,0.1115666455473339947160239016817659974813,0.0914900216224499994644620941238396526609,0.0914900216224499994644620941238396526609,0.0690445427376412265807082580060130449618,0.0690445427376412265807082580060130449618,0.0448142267656996003328381574019942119517,0.0448142267656996003328381574019942119517,0.0194617882297264770363120414644384357529,0.0194617882297264770363120414644384357529],[0.1527533871307258506980843319550975934919,0.1527533871307258506980843319550975934919,0.1491729864726037467878287370019694366926,0.1491729864726037467878287370019694366926,0.1420961093183820513292983250671649330345,0.1420961093183820513292983250671649330345,0.1316886384491766268984944997481631349161,0.1316886384491766268984944997481631349161,0.1181945319615184173123773777113822870050,0.1181945319615184173123773777113822870050,0.1019301198172404350367501354803498761666,0.1019301198172404350367501354803498761666,0.0832767415767047487247581432220462061001,0.0832767415767047487247581432220462061001,0.0626720483341090635695065351870416063516,0.0626720483341090635695065351870416063516,0.0406014298003869413310399522749321098790,0.0406014298003869413310399522749321098790,0.0176140071391521183118619623518528163621,0.0176140071391521183118619623518528163621],[0.1460811336496904271919851476833711882448,0.1445244039899700590638271665537525436099,0.1445244039899700590638271665537525436099,0.1398873947910731547221334238675831108927,0.1398873947910731547221334238675831108927,0.1322689386333374617810525744967756043290,0.1322689386333374617810525744967756043290,0.1218314160537285341953671771257335983563,0.1218314160537285341953671771257335983563,0.1087972991671483776634745780701056420336,0.1087972991671483776634745780701056420336,0.0934444234560338615532897411139320884835,0.0934444234560338615532897411139320884835,0.0761001136283793020170516533001831792261,0.0761001136283793020170516533001831792261,0.0571344254268572082836358264724479574912,0.0571344254268572082836358264724479574912,0.0369537897708524937999506682993296661889,0.0369537897708524937999506682993296661889,0.0160172282577743333242246168584710152658,0.0160172282577743333242246168584710152658],[0.1392518728556319933754102483418099578739,0.1392518728556319933754102483418099578739,0.1365414983460151713525738312315173965863,0.1365414983460151713525738312315173965863,0.1311735047870623707329649925303074458757,0.1311735047870623707329649925303074458757,0.1232523768105124242855609861548144719594,0.1232523768105124242855609861548144719594,0.1129322960805392183934006074217843191142,0.1129322960805392183934006074217843191142,0.1004141444428809649320788378305362823508,0.1004141444428809649320788378305362823508,0.0859416062170677274144436813727028661891,0.0859416062170677274144436813727028661891,0.0697964684245204880949614189302176573987,0.0697964684245204880949614189302176573987,0.0522933351526832859403120512732112561121,0.0522933351526832859403120512732112561121,0.0337749015848141547933022468659129013491,0.0337749015848141547933022468659129013491,0.0146279952982722006849910980471854451902,0.0146279952982722006849910980471854451902],[0.1336545721861061753514571105458443385831,0.1324620394046966173716424647033169258050,0.1324620394046966173716424647033169258050,0.1289057221880821499785953393997936532597,0.1289057221880821499785953393997936532597,0.1230490843067295304675784006720096548158,0.1230490843067295304675784006720096548158,0.1149966402224113649416435129339613014914,0.1149966402224113649416435129339613014914,0.1048920914645414100740861850147438548584,0.1048920914645414100740861850147438548584,0.0929157660600351474770186173697646486034,0.0929157660600351474770186173697646486034,0.0792814117767189549228925247420432269137,0.0792814117767189549228925247420432269137,0.0642324214085258521271696151589109980391,0.0642324214085258521271696151589109980391,0.0480376717310846685716410716320339965612,0.0480376717310846685716410716320339965612,0.0309880058569794443106942196418845053837,0.0309880058569794443106942196418845053837,0.0134118594871417720813094934586150649766,0.0134118594871417720813094934586150649766],[0.1279381953467521569740561652246953718517,0.1279381953467521569740561652246953718517,0.1258374563468282961213753825111836887264,0.1258374563468282961213753825111836887264,0.1216704729278033912044631534762624256070,0.1216704729278033912044631534762624256070,0.1155056680537256013533444839067835598622,0.1155056680537256013533444839067835598622,0.1074442701159656347825773424466062227946,0.1074442701159656347825773424466062227946,0.0976186521041138882698806644642471544279,0.0976186521041138882698806644642471544279,0.0861901615319532759171852029837426671850,0.0861901615319532759171852029837426671850,0.0733464814110803057340336152531165181193,0.0733464814110803057340336152531165181193,0.0592985849154367807463677585001085845412,0.0592985849154367807463677585001085845412,0.0442774388174198061686027482113382288593,0.0442774388174198061686027482113382288593,0.0285313886289336631813078159518782864491,0.0285313886289336631813078159518782864491,0.0123412297999871995468056670700372915759,0.0123412297999871995468056670700372915759]];
verb.core.Binomial.memo = new haxe.ds.IntMap();
verb.core.Constants.TOLERANCE = 1e-6;
verb.core.Constants.EPSILON = 1e-10;
verb.core.ExpIntersect.INIT_STEP_LENGTH = 1e-3;
verb.core.ExpIntersect.LINEAR_STEP_LENGTH = 0.1;
verb.core.types.BoundingBox.TOLERANCE = 1e-4;
verb.exe.Dispatcher.THREADS = 1;
verb.exe.Dispatcher._init = false;
verb.exe.Work.uuid = 0;
verb.exe.WorkerPool.basePath = "";
verb.Verb.main();
})(typeof verb != "undefined" ? verb : exports);
