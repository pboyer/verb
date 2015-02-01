
#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core.types{
	public  class PolylineMeshIntersection : global::haxe.lang.HxObject {
		public    PolylineMeshIntersection(global::haxe.lang.EmptyObject empty){
			unchecked {
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/PolylineMeshIntersection.hx"
				{
				}
				
			}
			#line default
		}
		
		
		public    PolylineMeshIntersection(global::Array<double> point, double u, global::Array<double> uv, int polylineIndex, int faceIndex){
			unchecked {
				#line 15 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/PolylineMeshIntersection.hx"
				global::verb.core.types.PolylineMeshIntersection.__hx_ctor_verb_core_types_PolylineMeshIntersection(this, point, u, uv, polylineIndex, faceIndex);
			}
			#line default
		}
		
		
		public static   void __hx_ctor_verb_core_types_PolylineMeshIntersection(global::verb.core.types.PolylineMeshIntersection __temp_me99, global::Array<double> point, double u, global::Array<double> uv, int polylineIndex, int faceIndex){
			unchecked {
				#line 16 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/PolylineMeshIntersection.hx"
				__temp_me99.point = point;
				__temp_me99.u = u;
				__temp_me99.uv = uv;
				__temp_me99.polylineIndex = polylineIndex;
				__temp_me99.faceIndex = faceIndex;
			}
			#line default
		}
		
		
		public static  new object __hx_createEmpty(){
			unchecked {
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/PolylineMeshIntersection.hx"
				return new global::verb.core.types.PolylineMeshIntersection(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) ));
			}
			#line default
		}
		
		
		public static  new object __hx_create(global::Array arr){
			unchecked {
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/PolylineMeshIntersection.hx"
				return new global::verb.core.types.PolylineMeshIntersection(((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (arr[0]) ))) ), ((double) (global::haxe.lang.Runtime.toDouble(arr[1])) ), ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (arr[2]) ))) ), ((int) (global::haxe.lang.Runtime.toInt(arr[3])) ), ((int) (global::haxe.lang.Runtime.toInt(arr[4])) ));
			}
			#line default
		}
		
		
		public  global::Array<double> point;
		
		public  double u;
		
		public  global::Array<double> uv;
		
		public  int polylineIndex;
		
		public  int faceIndex;
		
		public override   double __hx_setField_f(string field, int hash, double @value, bool handleProperties){
			unchecked {
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/PolylineMeshIntersection.hx"
				switch (hash){
					case 6782261:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/PolylineMeshIntersection.hx"
						this.faceIndex = ((int) (@value) );
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/PolylineMeshIntersection.hx"
						return @value;
					}
					
					
					case 1280243378:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/PolylineMeshIntersection.hx"
						this.polylineIndex = ((int) (@value) );
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/PolylineMeshIntersection.hx"
						return @value;
					}
					
					
					case 117:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/PolylineMeshIntersection.hx"
						this.u = ((double) (@value) );
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/PolylineMeshIntersection.hx"
						return @value;
					}
					
					
					default:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/PolylineMeshIntersection.hx"
						return base.__hx_setField_f(field, hash, @value, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_setField(string field, int hash, object @value, bool handleProperties){
			unchecked {
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/PolylineMeshIntersection.hx"
				switch (hash){
					case 6782261:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/PolylineMeshIntersection.hx"
						this.faceIndex = ((int) (global::haxe.lang.Runtime.toInt(@value)) );
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/PolylineMeshIntersection.hx"
						return @value;
					}
					
					
					case 1280243378:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/PolylineMeshIntersection.hx"
						this.polylineIndex = ((int) (global::haxe.lang.Runtime.toInt(@value)) );
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/PolylineMeshIntersection.hx"
						return @value;
					}
					
					
					case 26209:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/PolylineMeshIntersection.hx"
						this.uv = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (@value) ))) );
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/PolylineMeshIntersection.hx"
						return @value;
					}
					
					
					case 117:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/PolylineMeshIntersection.hx"
						this.u = ((double) (global::haxe.lang.Runtime.toDouble(@value)) );
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/PolylineMeshIntersection.hx"
						return @value;
					}
					
					
					case 1183822928:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/PolylineMeshIntersection.hx"
						this.point = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (@value) ))) );
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/PolylineMeshIntersection.hx"
						return @value;
					}
					
					
					default:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/PolylineMeshIntersection.hx"
						return base.__hx_setField(field, hash, @value, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_getField(string field, int hash, bool throwErrors, bool isCheck, bool handleProperties){
			unchecked {
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/PolylineMeshIntersection.hx"
				switch (hash){
					case 6782261:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/PolylineMeshIntersection.hx"
						return this.faceIndex;
					}
					
					
					case 1280243378:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/PolylineMeshIntersection.hx"
						return this.polylineIndex;
					}
					
					
					case 26209:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/PolylineMeshIntersection.hx"
						return this.uv;
					}
					
					
					case 117:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/PolylineMeshIntersection.hx"
						return this.u;
					}
					
					
					case 1183822928:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/PolylineMeshIntersection.hx"
						return this.point;
					}
					
					
					default:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/PolylineMeshIntersection.hx"
						return base.__hx_getField(field, hash, throwErrors, isCheck, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   double __hx_getField_f(string field, int hash, bool throwErrors, bool handleProperties){
			unchecked {
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/PolylineMeshIntersection.hx"
				switch (hash){
					case 6782261:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/PolylineMeshIntersection.hx"
						return ((double) (this.faceIndex) );
					}
					
					
					case 1280243378:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/PolylineMeshIntersection.hx"
						return ((double) (this.polylineIndex) );
					}
					
					
					case 117:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/PolylineMeshIntersection.hx"
						return this.u;
					}
					
					
					default:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/PolylineMeshIntersection.hx"
						return base.__hx_getField_f(field, hash, throwErrors, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   void __hx_getFields(global::Array<object> baseArr){
			unchecked {
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/PolylineMeshIntersection.hx"
				baseArr.push("faceIndex");
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/PolylineMeshIntersection.hx"
				baseArr.push("polylineIndex");
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/PolylineMeshIntersection.hx"
				baseArr.push("uv");
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/PolylineMeshIntersection.hx"
				baseArr.push("u");
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/PolylineMeshIntersection.hx"
				baseArr.push("point");
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/PolylineMeshIntersection.hx"
				{
					#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/PolylineMeshIntersection.hx"
					base.__hx_getFields(baseArr);
				}
				
			}
			#line default
		}
		
		
	}
}


