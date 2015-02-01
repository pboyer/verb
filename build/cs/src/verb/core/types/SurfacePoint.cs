
#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core.types{
	public  class SurfacePoint : global::haxe.lang.HxObject {
		public    SurfacePoint(global::haxe.lang.EmptyObject empty){
			unchecked {
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/SurfacePoint.hx"
				{
				}
				
			}
			#line default
		}
		
		
		public    SurfacePoint(global::Array<double> point, global::Array<double> normal, global::Array<double> uv, global::haxe.lang.Null<int> id, global::haxe.lang.Null<bool> degen){
			unchecked {
				#line 13 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/SurfacePoint.hx"
				global::verb.core.types.SurfacePoint.__hx_ctor_verb_core_types_SurfacePoint(this, point, normal, uv, id, degen);
			}
			#line default
		}
		
		
		public static   void __hx_ctor_verb_core_types_SurfacePoint(global::verb.core.types.SurfacePoint __temp_me103, global::Array<double> point, global::Array<double> normal, global::Array<double> uv, global::haxe.lang.Null<int> id, global::haxe.lang.Null<bool> degen){
			unchecked {
				#line 13 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/SurfacePoint.hx"
				bool __temp_degen102 = ( ( ! (degen.hasValue) ) ? (global::haxe.lang.Runtime.toBool(false)) : (degen.@value) );
				#line 13 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/SurfacePoint.hx"
				int __temp_id101 = ( ( ! (id.hasValue) ) ? (((int) (-1) )) : (id.@value) );
				__temp_me103.uv = uv;
				__temp_me103.point = point;
				__temp_me103.normal = normal;
				__temp_me103.id = __temp_id101;
				__temp_me103.degen = __temp_degen102;
			}
			#line default
		}
		
		
		public static   global::verb.core.types.SurfacePoint fromUv(double u, double v){
			unchecked {
				#line 22 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/SurfacePoint.hx"
				return new global::verb.core.types.SurfacePoint(((global::Array<double>) (default(global::Array<double>)) ), ((global::Array<double>) (default(global::Array<double>)) ), ((global::Array<double>) (new global::Array<double>(new double[]{u, v})) ), ((global::haxe.lang.Null<int>) (default(global::haxe.lang.Null<int>)) ), ((global::haxe.lang.Null<bool>) (default(global::haxe.lang.Null<bool>)) ));
			}
			#line default
		}
		
		
		public static  new object __hx_createEmpty(){
			unchecked {
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/SurfacePoint.hx"
				return new global::verb.core.types.SurfacePoint(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) ));
			}
			#line default
		}
		
		
		public static  new object __hx_create(global::Array arr){
			unchecked {
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/SurfacePoint.hx"
				return new global::verb.core.types.SurfacePoint(((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (arr[0]) ))) ), ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (arr[1]) ))) ), ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (arr[2]) ))) ), global::haxe.lang.Null<object>.ofDynamic<int>(arr[3]), global::haxe.lang.Null<object>.ofDynamic<bool>(arr[4]));
			}
			#line default
		}
		
		
		public  global::Array<double> uv;
		
		public  global::Array<double> point;
		
		public  global::Array<double> normal;
		
		public  int id;
		
		public  bool degen;
		
		public override   double __hx_setField_f(string field, int hash, double @value, bool handleProperties){
			unchecked {
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/SurfacePoint.hx"
				switch (hash){
					case 23515:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/SurfacePoint.hx"
						this.id = ((int) (@value) );
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/SurfacePoint.hx"
						return @value;
					}
					
					
					default:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/SurfacePoint.hx"
						return base.__hx_setField_f(field, hash, @value, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_setField(string field, int hash, object @value, bool handleProperties){
			unchecked {
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/SurfacePoint.hx"
				switch (hash){
					case 1461915567:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/SurfacePoint.hx"
						this.degen = global::haxe.lang.Runtime.toBool(@value);
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/SurfacePoint.hx"
						return @value;
					}
					
					
					case 23515:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/SurfacePoint.hx"
						this.id = ((int) (global::haxe.lang.Runtime.toInt(@value)) );
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/SurfacePoint.hx"
						return @value;
					}
					
					
					case 812216871:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/SurfacePoint.hx"
						this.normal = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (@value) ))) );
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/SurfacePoint.hx"
						return @value;
					}
					
					
					case 1183822928:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/SurfacePoint.hx"
						this.point = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (@value) ))) );
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/SurfacePoint.hx"
						return @value;
					}
					
					
					case 26209:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/SurfacePoint.hx"
						this.uv = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (@value) ))) );
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/SurfacePoint.hx"
						return @value;
					}
					
					
					default:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/SurfacePoint.hx"
						return base.__hx_setField(field, hash, @value, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_getField(string field, int hash, bool throwErrors, bool isCheck, bool handleProperties){
			unchecked {
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/SurfacePoint.hx"
				switch (hash){
					case 1461915567:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/SurfacePoint.hx"
						return this.degen;
					}
					
					
					case 23515:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/SurfacePoint.hx"
						return this.id;
					}
					
					
					case 812216871:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/SurfacePoint.hx"
						return this.normal;
					}
					
					
					case 1183822928:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/SurfacePoint.hx"
						return this.point;
					}
					
					
					case 26209:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/SurfacePoint.hx"
						return this.uv;
					}
					
					
					default:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/SurfacePoint.hx"
						return base.__hx_getField(field, hash, throwErrors, isCheck, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   double __hx_getField_f(string field, int hash, bool throwErrors, bool handleProperties){
			unchecked {
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/SurfacePoint.hx"
				switch (hash){
					case 23515:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/SurfacePoint.hx"
						return ((double) (this.id) );
					}
					
					
					default:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/SurfacePoint.hx"
						return base.__hx_getField_f(field, hash, throwErrors, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   void __hx_getFields(global::Array<object> baseArr){
			unchecked {
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/SurfacePoint.hx"
				baseArr.push("degen");
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/SurfacePoint.hx"
				baseArr.push("id");
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/SurfacePoint.hx"
				baseArr.push("normal");
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/SurfacePoint.hx"
				baseArr.push("point");
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/SurfacePoint.hx"
				baseArr.push("uv");
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/SurfacePoint.hx"
				{
					#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/SurfacePoint.hx"
					base.__hx_getFields(baseArr);
				}
				
			}
			#line default
		}
		
		
	}
}


