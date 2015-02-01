
#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core.types{
	public  class CurveSurfaceIntersection : global::haxe.lang.HxObject {
		public    CurveSurfaceIntersection(global::haxe.lang.EmptyObject empty){
			unchecked {
				#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveSurfaceIntersection.hx"
				{
				}
				
			}
			#line default
		}
		
		
		public    CurveSurfaceIntersection(double u, global::Array<double> uv){
			unchecked {
				#line 11 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveSurfaceIntersection.hx"
				global::verb.core.types.CurveSurfaceIntersection.__hx_ctor_verb_core_types_CurveSurfaceIntersection(this, u, uv);
			}
			#line default
		}
		
		
		public static   void __hx_ctor_verb_core_types_CurveSurfaceIntersection(global::verb.core.types.CurveSurfaceIntersection __temp_me84, double u, global::Array<double> uv){
			unchecked {
				#line 12 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveSurfaceIntersection.hx"
				__temp_me84.u = u;
				__temp_me84.uv = uv;
			}
			#line default
		}
		
		
		public static  new object __hx_createEmpty(){
			unchecked {
				#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveSurfaceIntersection.hx"
				return new global::verb.core.types.CurveSurfaceIntersection(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) ));
			}
			#line default
		}
		
		
		public static  new object __hx_create(global::Array arr){
			unchecked {
				#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveSurfaceIntersection.hx"
				return new global::verb.core.types.CurveSurfaceIntersection(((double) (global::haxe.lang.Runtime.toDouble(arr[0])) ), ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (arr[1]) ))) ));
			}
			#line default
		}
		
		
		public  double u;
		
		public  global::Array<double> uv;
		
		public override   double __hx_setField_f(string field, int hash, double @value, bool handleProperties){
			unchecked {
				#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveSurfaceIntersection.hx"
				switch (hash){
					case 117:
					{
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveSurfaceIntersection.hx"
						this.u = ((double) (@value) );
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveSurfaceIntersection.hx"
						return @value;
					}
					
					
					default:
					{
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveSurfaceIntersection.hx"
						return base.__hx_setField_f(field, hash, @value, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_setField(string field, int hash, object @value, bool handleProperties){
			unchecked {
				#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveSurfaceIntersection.hx"
				switch (hash){
					case 26209:
					{
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveSurfaceIntersection.hx"
						this.uv = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (@value) ))) );
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveSurfaceIntersection.hx"
						return @value;
					}
					
					
					case 117:
					{
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveSurfaceIntersection.hx"
						this.u = ((double) (global::haxe.lang.Runtime.toDouble(@value)) );
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveSurfaceIntersection.hx"
						return @value;
					}
					
					
					default:
					{
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveSurfaceIntersection.hx"
						return base.__hx_setField(field, hash, @value, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_getField(string field, int hash, bool throwErrors, bool isCheck, bool handleProperties){
			unchecked {
				#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveSurfaceIntersection.hx"
				switch (hash){
					case 26209:
					{
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveSurfaceIntersection.hx"
						return this.uv;
					}
					
					
					case 117:
					{
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveSurfaceIntersection.hx"
						return this.u;
					}
					
					
					default:
					{
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveSurfaceIntersection.hx"
						return base.__hx_getField(field, hash, throwErrors, isCheck, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   double __hx_getField_f(string field, int hash, bool throwErrors, bool handleProperties){
			unchecked {
				#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveSurfaceIntersection.hx"
				switch (hash){
					case 117:
					{
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveSurfaceIntersection.hx"
						return this.u;
					}
					
					
					default:
					{
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveSurfaceIntersection.hx"
						return base.__hx_getField_f(field, hash, throwErrors, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   void __hx_getFields(global::Array<object> baseArr){
			unchecked {
				#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveSurfaceIntersection.hx"
				baseArr.push("uv");
				#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveSurfaceIntersection.hx"
				baseArr.push("u");
				#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveSurfaceIntersection.hx"
				{
					#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveSurfaceIntersection.hx"
					base.__hx_getFields(baseArr);
				}
				
			}
			#line default
		}
		
		
	}
}


