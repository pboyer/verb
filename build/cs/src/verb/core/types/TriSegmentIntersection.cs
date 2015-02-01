
#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core.types{
	public  class TriSegmentIntersection : global::haxe.lang.HxObject {
		public    TriSegmentIntersection(global::haxe.lang.EmptyObject empty){
			unchecked {
				#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/TriSegmentIntersection.hx"
				{
				}
				
			}
			#line default
		}
		
		
		public    TriSegmentIntersection(global::Array<double> point, double s, double t, double r){
			unchecked {
				#line 17 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/TriSegmentIntersection.hx"
				global::verb.core.types.TriSegmentIntersection.__hx_ctor_verb_core_types_TriSegmentIntersection(this, point, s, t, r);
			}
			#line default
		}
		
		
		public static   void __hx_ctor_verb_core_types_TriSegmentIntersection(global::verb.core.types.TriSegmentIntersection __temp_me105, global::Array<double> point, double s, double t, double r){
			unchecked {
				#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/TriSegmentIntersection.hx"
				__temp_me105.point = point;
				__temp_me105.s = s;
				__temp_me105.t = t;
				__temp_me105.p = r;
			}
			#line default
		}
		
		
		public static  new object __hx_createEmpty(){
			unchecked {
				#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/TriSegmentIntersection.hx"
				return new global::verb.core.types.TriSegmentIntersection(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) ));
			}
			#line default
		}
		
		
		public static  new object __hx_create(global::Array arr){
			unchecked {
				#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/TriSegmentIntersection.hx"
				return new global::verb.core.types.TriSegmentIntersection(((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (arr[0]) ))) ), ((double) (global::haxe.lang.Runtime.toDouble(arr[1])) ), ((double) (global::haxe.lang.Runtime.toDouble(arr[2])) ), ((double) (global::haxe.lang.Runtime.toDouble(arr[3])) ));
			}
			#line default
		}
		
		
		public  global::Array<double> point;
		
		public  double s;
		
		public  double t;
		
		public  double p;
		
		public override   double __hx_setField_f(string field, int hash, double @value, bool handleProperties){
			unchecked {
				#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/TriSegmentIntersection.hx"
				switch (hash){
					case 112:
					{
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/TriSegmentIntersection.hx"
						this.p = ((double) (@value) );
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/TriSegmentIntersection.hx"
						return @value;
					}
					
					
					case 116:
					{
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/TriSegmentIntersection.hx"
						this.t = ((double) (@value) );
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/TriSegmentIntersection.hx"
						return @value;
					}
					
					
					case 115:
					{
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/TriSegmentIntersection.hx"
						this.s = ((double) (@value) );
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/TriSegmentIntersection.hx"
						return @value;
					}
					
					
					default:
					{
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/TriSegmentIntersection.hx"
						return base.__hx_setField_f(field, hash, @value, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_setField(string field, int hash, object @value, bool handleProperties){
			unchecked {
				#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/TriSegmentIntersection.hx"
				switch (hash){
					case 112:
					{
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/TriSegmentIntersection.hx"
						this.p = ((double) (global::haxe.lang.Runtime.toDouble(@value)) );
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/TriSegmentIntersection.hx"
						return @value;
					}
					
					
					case 116:
					{
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/TriSegmentIntersection.hx"
						this.t = ((double) (global::haxe.lang.Runtime.toDouble(@value)) );
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/TriSegmentIntersection.hx"
						return @value;
					}
					
					
					case 115:
					{
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/TriSegmentIntersection.hx"
						this.s = ((double) (global::haxe.lang.Runtime.toDouble(@value)) );
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/TriSegmentIntersection.hx"
						return @value;
					}
					
					
					case 1183822928:
					{
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/TriSegmentIntersection.hx"
						this.point = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (@value) ))) );
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/TriSegmentIntersection.hx"
						return @value;
					}
					
					
					default:
					{
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/TriSegmentIntersection.hx"
						return base.__hx_setField(field, hash, @value, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_getField(string field, int hash, bool throwErrors, bool isCheck, bool handleProperties){
			unchecked {
				#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/TriSegmentIntersection.hx"
				switch (hash){
					case 112:
					{
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/TriSegmentIntersection.hx"
						return this.p;
					}
					
					
					case 116:
					{
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/TriSegmentIntersection.hx"
						return this.t;
					}
					
					
					case 115:
					{
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/TriSegmentIntersection.hx"
						return this.s;
					}
					
					
					case 1183822928:
					{
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/TriSegmentIntersection.hx"
						return this.point;
					}
					
					
					default:
					{
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/TriSegmentIntersection.hx"
						return base.__hx_getField(field, hash, throwErrors, isCheck, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   double __hx_getField_f(string field, int hash, bool throwErrors, bool handleProperties){
			unchecked {
				#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/TriSegmentIntersection.hx"
				switch (hash){
					case 112:
					{
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/TriSegmentIntersection.hx"
						return this.p;
					}
					
					
					case 116:
					{
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/TriSegmentIntersection.hx"
						return this.t;
					}
					
					
					case 115:
					{
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/TriSegmentIntersection.hx"
						return this.s;
					}
					
					
					default:
					{
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/TriSegmentIntersection.hx"
						return base.__hx_getField_f(field, hash, throwErrors, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   void __hx_getFields(global::Array<object> baseArr){
			unchecked {
				#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/TriSegmentIntersection.hx"
				baseArr.push("p");
				#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/TriSegmentIntersection.hx"
				baseArr.push("t");
				#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/TriSegmentIntersection.hx"
				baseArr.push("s");
				#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/TriSegmentIntersection.hx"
				baseArr.push("point");
				#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/TriSegmentIntersection.hx"
				{
					#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/TriSegmentIntersection.hx"
					base.__hx_getFields(baseArr);
				}
				
			}
			#line default
		}
		
		
	}
}


