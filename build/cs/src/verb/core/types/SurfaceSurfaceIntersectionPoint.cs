
#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core.types{
	public  class SurfaceSurfaceIntersectionPoint : global::haxe.lang.HxObject {
		public    SurfaceSurfaceIntersectionPoint(global::haxe.lang.EmptyObject empty){
			unchecked {
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/SurfaceSurfaceIntersectionPoint.hx"
				{
				}
				
			}
			#line default
		}
		
		
		public    SurfaceSurfaceIntersectionPoint(global::Array<double> uv0, global::Array<double> uv1, global::Array<double> point, double dist){
			unchecked {
				#line 14 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/SurfaceSurfaceIntersectionPoint.hx"
				global::verb.core.types.SurfaceSurfaceIntersectionPoint.__hx_ctor_verb_core_types_SurfaceSurfaceIntersectionPoint(this, uv0, uv1, point, dist);
			}
			#line default
		}
		
		
		public static   void __hx_ctor_verb_core_types_SurfaceSurfaceIntersectionPoint(global::verb.core.types.SurfaceSurfaceIntersectionPoint __temp_me104, global::Array<double> uv0, global::Array<double> uv1, global::Array<double> point, double dist){
			unchecked {
				#line 15 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/SurfaceSurfaceIntersectionPoint.hx"
				__temp_me104.uv0 = uv0;
				__temp_me104.uv1 = uv1;
				__temp_me104.point = point;
				__temp_me104.dist = dist;
			}
			#line default
		}
		
		
		public static  new object __hx_createEmpty(){
			unchecked {
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/SurfaceSurfaceIntersectionPoint.hx"
				return new global::verb.core.types.SurfaceSurfaceIntersectionPoint(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) ));
			}
			#line default
		}
		
		
		public static  new object __hx_create(global::Array arr){
			unchecked {
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/SurfaceSurfaceIntersectionPoint.hx"
				return new global::verb.core.types.SurfaceSurfaceIntersectionPoint(((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (arr[0]) ))) ), ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (arr[1]) ))) ), ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (arr[2]) ))) ), ((double) (global::haxe.lang.Runtime.toDouble(arr[3])) ));
			}
			#line default
		}
		
		
		public  global::Array<double> uv0;
		
		public  global::Array<double> uv1;
		
		public  global::Array<double> point;
		
		public  double dist;
		
		public override   double __hx_setField_f(string field, int hash, double @value, bool handleProperties){
			unchecked {
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/SurfaceSurfaceIntersectionPoint.hx"
				switch (hash){
					case 1114204006:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/SurfaceSurfaceIntersectionPoint.hx"
						this.dist = ((double) (@value) );
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/SurfaceSurfaceIntersectionPoint.hx"
						return @value;
					}
					
					
					default:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/SurfaceSurfaceIntersectionPoint.hx"
						return base.__hx_setField_f(field, hash, @value, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_setField(string field, int hash, object @value, bool handleProperties){
			unchecked {
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/SurfaceSurfaceIntersectionPoint.hx"
				switch (hash){
					case 1114204006:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/SurfaceSurfaceIntersectionPoint.hx"
						this.dist = ((double) (global::haxe.lang.Runtime.toDouble(@value)) );
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/SurfaceSurfaceIntersectionPoint.hx"
						return @value;
					}
					
					
					case 1183822928:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/SurfaceSurfaceIntersectionPoint.hx"
						this.point = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (@value) ))) );
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/SurfaceSurfaceIntersectionPoint.hx"
						return @value;
					}
					
					
					case 5844656:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/SurfaceSurfaceIntersectionPoint.hx"
						this.uv1 = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (@value) ))) );
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/SurfaceSurfaceIntersectionPoint.hx"
						return @value;
					}
					
					
					case 5844655:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/SurfaceSurfaceIntersectionPoint.hx"
						this.uv0 = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (@value) ))) );
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/SurfaceSurfaceIntersectionPoint.hx"
						return @value;
					}
					
					
					default:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/SurfaceSurfaceIntersectionPoint.hx"
						return base.__hx_setField(field, hash, @value, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_getField(string field, int hash, bool throwErrors, bool isCheck, bool handleProperties){
			unchecked {
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/SurfaceSurfaceIntersectionPoint.hx"
				switch (hash){
					case 1114204006:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/SurfaceSurfaceIntersectionPoint.hx"
						return this.dist;
					}
					
					
					case 1183822928:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/SurfaceSurfaceIntersectionPoint.hx"
						return this.point;
					}
					
					
					case 5844656:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/SurfaceSurfaceIntersectionPoint.hx"
						return this.uv1;
					}
					
					
					case 5844655:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/SurfaceSurfaceIntersectionPoint.hx"
						return this.uv0;
					}
					
					
					default:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/SurfaceSurfaceIntersectionPoint.hx"
						return base.__hx_getField(field, hash, throwErrors, isCheck, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   double __hx_getField_f(string field, int hash, bool throwErrors, bool handleProperties){
			unchecked {
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/SurfaceSurfaceIntersectionPoint.hx"
				switch (hash){
					case 1114204006:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/SurfaceSurfaceIntersectionPoint.hx"
						return this.dist;
					}
					
					
					default:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/SurfaceSurfaceIntersectionPoint.hx"
						return base.__hx_getField_f(field, hash, throwErrors, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   void __hx_getFields(global::Array<object> baseArr){
			unchecked {
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/SurfaceSurfaceIntersectionPoint.hx"
				baseArr.push("dist");
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/SurfaceSurfaceIntersectionPoint.hx"
				baseArr.push("point");
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/SurfaceSurfaceIntersectionPoint.hx"
				baseArr.push("uv1");
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/SurfaceSurfaceIntersectionPoint.hx"
				baseArr.push("uv0");
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/SurfaceSurfaceIntersectionPoint.hx"
				{
					#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/SurfaceSurfaceIntersectionPoint.hx"
					base.__hx_getFields(baseArr);
				}
				
			}
			#line default
		}
		
		
	}
}


