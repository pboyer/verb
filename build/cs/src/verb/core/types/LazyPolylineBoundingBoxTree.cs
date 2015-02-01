
#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core.types{
	public  class LazyPolylineBoundingBoxTree : global::haxe.lang.HxObject, global::verb.core.types.IBoundingBoxTree<int> {
		public    LazyPolylineBoundingBoxTree(global::haxe.lang.EmptyObject empty){
			unchecked {
				#line 3 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyPolylineBoundingBoxTree.hx"
				{
				}
				
			}
			#line default
		}
		
		
		public    LazyPolylineBoundingBoxTree(global::verb.core.types.PolylineData polyline, global::verb.core.types.Interval<int> interval){
			unchecked {
				#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyPolylineBoundingBoxTree.hx"
				global::verb.core.types.LazyPolylineBoundingBoxTree.__hx_ctor_verb_core_types_LazyPolylineBoundingBoxTree(this, polyline, interval);
			}
			#line default
		}
		
		
		public static   void __hx_ctor_verb_core_types_LazyPolylineBoundingBoxTree(global::verb.core.types.LazyPolylineBoundingBoxTree __temp_me89, global::verb.core.types.PolylineData polyline, global::verb.core.types.Interval<int> interval){
			unchecked {
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyPolylineBoundingBoxTree.hx"
				__temp_me89._boundingBox = default(global::verb.core.types.BoundingBox);
				#line 10 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyPolylineBoundingBoxTree.hx"
				__temp_me89._polyline = polyline;
				#line 12 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyPolylineBoundingBoxTree.hx"
				if (( interval == default(global::verb.core.types.Interval<int>) )) {
					#line 13 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyPolylineBoundingBoxTree.hx"
					interval = new global::verb.core.types.Interval<int>(((int) (0) ), ((int) (( (( polyline.points.length != 0 )) ? (( polyline.points.length - 1 )) : (0) )) ));
				}
				
				#line 15 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyPolylineBoundingBoxTree.hx"
				__temp_me89._interval = interval;
			}
			#line default
		}
		
		
		public static  new object __hx_createEmpty(){
			unchecked {
				#line 3 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyPolylineBoundingBoxTree.hx"
				return new global::verb.core.types.LazyPolylineBoundingBoxTree(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) ));
			}
			#line default
		}
		
		
		public static  new object __hx_create(global::Array arr){
			unchecked {
				#line 3 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyPolylineBoundingBoxTree.hx"
				return new global::verb.core.types.LazyPolylineBoundingBoxTree(((global::verb.core.types.PolylineData) (arr[0]) ), ((global::verb.core.types.Interval<int>) (global::verb.core.types.Interval<object>.__hx_cast<int>(((global::verb.core.types.Interval) (arr[1]) ))) ));
			}
			#line default
		}
		
		
		public virtual   object verb_core_types_IBoundingBoxTree_cast<T_c>(){
			unchecked {
				#line 3 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyPolylineBoundingBoxTree.hx"
				return this;
			}
			#line default
		}
		
		
		public  global::verb.core.types.Interval<int> _interval;
		
		public  global::verb.core.types.PolylineData _polyline;
		
		public  global::verb.core.types.BoundingBox _boundingBox;
		
		public virtual   global::verb.core.types.Pair<object, object> split(){
			unchecked {
				#line 19 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyPolylineBoundingBoxTree.hx"
				int min = this._interval.min;
				int max = this._interval.max;
				#line 22 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyPolylineBoundingBoxTree.hx"
				int pivot = default(int);
				#line 22 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyPolylineBoundingBoxTree.hx"
				int __temp_stmt261 = default(int);
				#line 22 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyPolylineBoundingBoxTree.hx"
				{
					#line 22 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyPolylineBoundingBoxTree.hx"
					double x = global::System.Math.Ceiling(((double) (( ((double) ((( max - min ))) ) / 2 )) ));
					#line 22 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyPolylineBoundingBoxTree.hx"
					__temp_stmt261 = ((int) (x) );
				}
				
				#line 22 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyPolylineBoundingBoxTree.hx"
				pivot = ( min + __temp_stmt261 );
				#line 24 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyPolylineBoundingBoxTree.hx"
				global::verb.core.types.Interval<int> l = new global::verb.core.types.Interval<int>(((int) (min) ), ((int) (pivot) ));
				global::verb.core.types.Interval<int> r = new global::verb.core.types.Interval<int>(((int) (pivot) ), ((int) (max) ));
				#line 27 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyPolylineBoundingBoxTree.hx"
				return new global::verb.core.types.Pair<object, object>(((object) (new global::verb.core.types.LazyPolylineBoundingBoxTree(((global::verb.core.types.PolylineData) (this._polyline) ), ((global::verb.core.types.Interval<int>) (l) ))) ), ((object) (new global::verb.core.types.LazyPolylineBoundingBoxTree(((global::verb.core.types.PolylineData) (this._polyline) ), ((global::verb.core.types.Interval<int>) (r) ))) ));
			}
			#line default
		}
		
		
		public virtual   global::verb.core.types.BoundingBox boundingBox(){
			unchecked {
				#line 34 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyPolylineBoundingBoxTree.hx"
				if (( this._boundingBox == default(global::verb.core.types.BoundingBox) )) {
					#line 35 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyPolylineBoundingBoxTree.hx"
					this._boundingBox = new global::verb.core.types.BoundingBox(((global::Array<object>) (this._polyline.points) ));
				}
				
				#line 38 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyPolylineBoundingBoxTree.hx"
				return this._boundingBox;
			}
			#line default
		}
		
		
		public virtual   int @yield(){
			unchecked {
				#line 42 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyPolylineBoundingBoxTree.hx"
				return this._interval.min;
			}
			#line default
		}
		
		
		public virtual   bool indivisible(double tolerance){
			unchecked {
				#line 46 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyPolylineBoundingBoxTree.hx"
				return ( ( this._interval.max - this._interval.min ) == 1 );
			}
			#line default
		}
		
		
		public virtual   bool empty(){
			unchecked {
				#line 50 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyPolylineBoundingBoxTree.hx"
				return ( ( this._interval.max - this._interval.min ) == 0 );
			}
			#line default
		}
		
		
		public override   object __hx_setField(string field, int hash, object @value, bool handleProperties){
			unchecked {
				#line 3 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyPolylineBoundingBoxTree.hx"
				switch (hash){
					case 1806779144:
					{
						#line 3 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyPolylineBoundingBoxTree.hx"
						this._boundingBox = ((global::verb.core.types.BoundingBox) (@value) );
						#line 3 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyPolylineBoundingBoxTree.hx"
						return @value;
					}
					
					
					case 1999676319:
					{
						#line 3 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyPolylineBoundingBoxTree.hx"
						this._polyline = ((global::verb.core.types.PolylineData) (@value) );
						#line 3 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyPolylineBoundingBoxTree.hx"
						return @value;
					}
					
					
					case 1880256676:
					{
						#line 3 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyPolylineBoundingBoxTree.hx"
						this._interval = ((global::verb.core.types.Interval<int>) (global::verb.core.types.Interval<object>.__hx_cast<int>(((global::verb.core.types.Interval) (@value) ))) );
						#line 3 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyPolylineBoundingBoxTree.hx"
						return @value;
					}
					
					
					default:
					{
						#line 3 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyPolylineBoundingBoxTree.hx"
						return base.__hx_setField(field, hash, @value, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_getField(string field, int hash, bool throwErrors, bool isCheck, bool handleProperties){
			unchecked {
				#line 3 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyPolylineBoundingBoxTree.hx"
				switch (hash){
					case 1876572813:
					{
						#line 3 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyPolylineBoundingBoxTree.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("empty") ), ((int) (1876572813) ))) );
					}
					
					
					case 2052836104:
					{
						#line 3 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyPolylineBoundingBoxTree.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("indivisible") ), ((int) (2052836104) ))) );
					}
					
					
					case 1899010637:
					{
						#line 3 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyPolylineBoundingBoxTree.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("yield") ), ((int) (1899010637) ))) );
					}
					
					
					case 94868743:
					{
						#line 3 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyPolylineBoundingBoxTree.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("boundingBox") ), ((int) (94868743) ))) );
					}
					
					
					case 24046298:
					{
						#line 3 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyPolylineBoundingBoxTree.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("split") ), ((int) (24046298) ))) );
					}
					
					
					case 1806779144:
					{
						#line 3 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyPolylineBoundingBoxTree.hx"
						return this._boundingBox;
					}
					
					
					case 1999676319:
					{
						#line 3 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyPolylineBoundingBoxTree.hx"
						return this._polyline;
					}
					
					
					case 1880256676:
					{
						#line 3 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyPolylineBoundingBoxTree.hx"
						return this._interval;
					}
					
					
					default:
					{
						#line 3 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyPolylineBoundingBoxTree.hx"
						return base.__hx_getField(field, hash, throwErrors, isCheck, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_invokeField(string field, int hash, global::Array dynargs){
			unchecked {
				#line 3 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyPolylineBoundingBoxTree.hx"
				switch (hash){
					case 1876572813:
					{
						#line 3 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyPolylineBoundingBoxTree.hx"
						return this.empty();
					}
					
					
					case 2052836104:
					{
						#line 3 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyPolylineBoundingBoxTree.hx"
						return this.indivisible(((double) (global::haxe.lang.Runtime.toDouble(dynargs[0])) ));
					}
					
					
					case 1899010637:
					{
						#line 3 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyPolylineBoundingBoxTree.hx"
						return this.@yield();
					}
					
					
					case 94868743:
					{
						#line 3 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyPolylineBoundingBoxTree.hx"
						return this.boundingBox();
					}
					
					
					case 24046298:
					{
						#line 3 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyPolylineBoundingBoxTree.hx"
						return this.split();
					}
					
					
					default:
					{
						#line 3 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyPolylineBoundingBoxTree.hx"
						return base.__hx_invokeField(field, hash, dynargs);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   void __hx_getFields(global::Array<object> baseArr){
			unchecked {
				#line 3 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyPolylineBoundingBoxTree.hx"
				baseArr.push("_boundingBox");
				#line 3 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyPolylineBoundingBoxTree.hx"
				baseArr.push("_polyline");
				#line 3 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyPolylineBoundingBoxTree.hx"
				baseArr.push("_interval");
				#line 3 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyPolylineBoundingBoxTree.hx"
				{
					#line 3 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyPolylineBoundingBoxTree.hx"
					base.__hx_getFields(baseArr);
				}
				
			}
			#line default
		}
		
		
	}
}


