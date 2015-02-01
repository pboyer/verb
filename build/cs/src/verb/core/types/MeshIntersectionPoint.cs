
#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core.types{
	public  class MeshIntersectionPoint : global::haxe.lang.HxObject {
		public    MeshIntersectionPoint(global::haxe.lang.EmptyObject empty){
			unchecked {
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshIntersectionPoint.hx"
				{
				}
				
			}
			#line default
		}
		
		
		public    MeshIntersectionPoint(global::Array<double> uv0, global::Array<double> uv1, global::Array<double> point, int faceIndex0, int faceIndex1){
			unchecked {
				#line 20 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshIntersectionPoint.hx"
				global::verb.core.types.MeshIntersectionPoint.__hx_ctor_verb_core_types_MeshIntersectionPoint(this, uv0, uv1, point, faceIndex0, faceIndex1);
			}
			#line default
		}
		
		
		public static   void __hx_ctor_verb_core_types_MeshIntersectionPoint(global::verb.core.types.MeshIntersectionPoint __temp_me94, global::Array<double> uv0, global::Array<double> uv1, global::Array<double> point, int faceIndex0, int faceIndex1){
			unchecked {
				#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshIntersectionPoint.hx"
				__temp_me94.visited = false;
				#line 17 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshIntersectionPoint.hx"
				__temp_me94.adj = default(global::verb.core.types.MeshIntersectionPoint);
				#line 16 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshIntersectionPoint.hx"
				__temp_me94.opp = default(global::verb.core.types.MeshIntersectionPoint);
				#line 21 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshIntersectionPoint.hx"
				__temp_me94.uv0 = uv0;
				__temp_me94.uv1 = uv1;
				__temp_me94.point = point;
				int __temp_expr266 = __temp_me94.faceIndex0;
				int __temp_expr267 = __temp_me94.faceIndex1;
			}
			#line default
		}
		
		
		public static  new object __hx_createEmpty(){
			unchecked {
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshIntersectionPoint.hx"
				return new global::verb.core.types.MeshIntersectionPoint(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) ));
			}
			#line default
		}
		
		
		public static  new object __hx_create(global::Array arr){
			unchecked {
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshIntersectionPoint.hx"
				return new global::verb.core.types.MeshIntersectionPoint(((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (arr[0]) ))) ), ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (arr[1]) ))) ), ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (arr[2]) ))) ), ((int) (global::haxe.lang.Runtime.toInt(arr[3])) ), ((int) (global::haxe.lang.Runtime.toInt(arr[4])) ));
			}
			#line default
		}
		
		
		public  global::Array<double> uv0;
		
		public  global::Array<double> uv1;
		
		public  global::Array<double> point;
		
		public  int faceIndex0;
		
		public  int faceIndex1;
		
		public  global::verb.core.types.MeshIntersectionPoint opp;
		
		public  global::verb.core.types.MeshIntersectionPoint adj;
		
		public  bool visited;
		
		public override   double __hx_setField_f(string field, int hash, double @value, bool handleProperties){
			unchecked {
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshIntersectionPoint.hx"
				switch (hash){
					case 1512444252:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshIntersectionPoint.hx"
						this.faceIndex1 = ((int) (@value) );
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshIntersectionPoint.hx"
						return @value;
					}
					
					
					case 1512444251:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshIntersectionPoint.hx"
						this.faceIndex0 = ((int) (@value) );
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshIntersectionPoint.hx"
						return @value;
					}
					
					
					default:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshIntersectionPoint.hx"
						return base.__hx_setField_f(field, hash, @value, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_setField(string field, int hash, object @value, bool handleProperties){
			unchecked {
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshIntersectionPoint.hx"
				switch (hash){
					case 590486250:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshIntersectionPoint.hx"
						this.visited = global::haxe.lang.Runtime.toBool(@value);
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshIntersectionPoint.hx"
						return @value;
					}
					
					
					case 4846119:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshIntersectionPoint.hx"
						this.adj = ((global::verb.core.types.MeshIntersectionPoint) (@value) );
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshIntersectionPoint.hx"
						return @value;
					}
					
					
					case 5545007:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshIntersectionPoint.hx"
						this.opp = ((global::verb.core.types.MeshIntersectionPoint) (@value) );
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshIntersectionPoint.hx"
						return @value;
					}
					
					
					case 1512444252:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshIntersectionPoint.hx"
						this.faceIndex1 = ((int) (global::haxe.lang.Runtime.toInt(@value)) );
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshIntersectionPoint.hx"
						return @value;
					}
					
					
					case 1512444251:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshIntersectionPoint.hx"
						this.faceIndex0 = ((int) (global::haxe.lang.Runtime.toInt(@value)) );
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshIntersectionPoint.hx"
						return @value;
					}
					
					
					case 1183822928:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshIntersectionPoint.hx"
						this.point = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (@value) ))) );
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshIntersectionPoint.hx"
						return @value;
					}
					
					
					case 5844656:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshIntersectionPoint.hx"
						this.uv1 = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (@value) ))) );
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshIntersectionPoint.hx"
						return @value;
					}
					
					
					case 5844655:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshIntersectionPoint.hx"
						this.uv0 = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (@value) ))) );
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshIntersectionPoint.hx"
						return @value;
					}
					
					
					default:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshIntersectionPoint.hx"
						return base.__hx_setField(field, hash, @value, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_getField(string field, int hash, bool throwErrors, bool isCheck, bool handleProperties){
			unchecked {
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshIntersectionPoint.hx"
				switch (hash){
					case 590486250:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshIntersectionPoint.hx"
						return this.visited;
					}
					
					
					case 4846119:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshIntersectionPoint.hx"
						return this.adj;
					}
					
					
					case 5545007:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshIntersectionPoint.hx"
						return this.opp;
					}
					
					
					case 1512444252:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshIntersectionPoint.hx"
						return this.faceIndex1;
					}
					
					
					case 1512444251:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshIntersectionPoint.hx"
						return this.faceIndex0;
					}
					
					
					case 1183822928:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshIntersectionPoint.hx"
						return this.point;
					}
					
					
					case 5844656:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshIntersectionPoint.hx"
						return this.uv1;
					}
					
					
					case 5844655:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshIntersectionPoint.hx"
						return this.uv0;
					}
					
					
					default:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshIntersectionPoint.hx"
						return base.__hx_getField(field, hash, throwErrors, isCheck, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   double __hx_getField_f(string field, int hash, bool throwErrors, bool handleProperties){
			unchecked {
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshIntersectionPoint.hx"
				switch (hash){
					case 1512444252:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshIntersectionPoint.hx"
						return ((double) (this.faceIndex1) );
					}
					
					
					case 1512444251:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshIntersectionPoint.hx"
						return ((double) (this.faceIndex0) );
					}
					
					
					default:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshIntersectionPoint.hx"
						return base.__hx_getField_f(field, hash, throwErrors, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   void __hx_getFields(global::Array<object> baseArr){
			unchecked {
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshIntersectionPoint.hx"
				baseArr.push("visited");
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshIntersectionPoint.hx"
				baseArr.push("adj");
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshIntersectionPoint.hx"
				baseArr.push("opp");
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshIntersectionPoint.hx"
				baseArr.push("faceIndex1");
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshIntersectionPoint.hx"
				baseArr.push("faceIndex0");
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshIntersectionPoint.hx"
				baseArr.push("point");
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshIntersectionPoint.hx"
				baseArr.push("uv1");
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshIntersectionPoint.hx"
				baseArr.push("uv0");
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshIntersectionPoint.hx"
				{
					#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshIntersectionPoint.hx"
					base.__hx_getFields(baseArr);
				}
				
			}
			#line default
		}
		
		
	}
}


