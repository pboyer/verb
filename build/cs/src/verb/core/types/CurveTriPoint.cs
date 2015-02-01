
#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core.types{
	public  class CurveTriPoint : global::haxe.lang.HxObject {
		public    CurveTriPoint(global::haxe.lang.EmptyObject empty){
			unchecked {
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveTriPoint.hx"
				{
				}
				
			}
			#line default
		}
		
		
		public    CurveTriPoint(double u, global::Array<double> point, global::Array<double> uv){
			unchecked {
				#line 12 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveTriPoint.hx"
				global::verb.core.types.CurveTriPoint.__hx_ctor_verb_core_types_CurveTriPoint(this, u, point, uv);
			}
			#line default
		}
		
		
		public static   void __hx_ctor_verb_core_types_CurveTriPoint(global::verb.core.types.CurveTriPoint __temp_me85, double u, global::Array<double> point, global::Array<double> uv){
			unchecked {
				#line 13 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveTriPoint.hx"
				__temp_me85.u = u;
				__temp_me85.point = point;
				__temp_me85.uv = uv;
			}
			#line default
		}
		
		
		public static  new object __hx_createEmpty(){
			unchecked {
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveTriPoint.hx"
				return new global::verb.core.types.CurveTriPoint(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) ));
			}
			#line default
		}
		
		
		public static  new object __hx_create(global::Array arr){
			unchecked {
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveTriPoint.hx"
				return new global::verb.core.types.CurveTriPoint(((double) (global::haxe.lang.Runtime.toDouble(arr[0])) ), ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (arr[1]) ))) ), ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (arr[2]) ))) ));
			}
			#line default
		}
		
		
		public  double u;
		
		public  global::Array<double> uv;
		
		public  global::Array<double> point;
		
		public override   double __hx_setField_f(string field, int hash, double @value, bool handleProperties){
			unchecked {
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveTriPoint.hx"
				switch (hash){
					case 117:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveTriPoint.hx"
						this.u = ((double) (@value) );
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveTriPoint.hx"
						return @value;
					}
					
					
					default:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveTriPoint.hx"
						return base.__hx_setField_f(field, hash, @value, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_setField(string field, int hash, object @value, bool handleProperties){
			unchecked {
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveTriPoint.hx"
				switch (hash){
					case 1183822928:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveTriPoint.hx"
						this.point = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (@value) ))) );
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveTriPoint.hx"
						return @value;
					}
					
					
					case 26209:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveTriPoint.hx"
						this.uv = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (@value) ))) );
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveTriPoint.hx"
						return @value;
					}
					
					
					case 117:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveTriPoint.hx"
						this.u = ((double) (global::haxe.lang.Runtime.toDouble(@value)) );
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveTriPoint.hx"
						return @value;
					}
					
					
					default:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveTriPoint.hx"
						return base.__hx_setField(field, hash, @value, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_getField(string field, int hash, bool throwErrors, bool isCheck, bool handleProperties){
			unchecked {
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveTriPoint.hx"
				switch (hash){
					case 1183822928:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveTriPoint.hx"
						return this.point;
					}
					
					
					case 26209:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveTriPoint.hx"
						return this.uv;
					}
					
					
					case 117:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveTriPoint.hx"
						return this.u;
					}
					
					
					default:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveTriPoint.hx"
						return base.__hx_getField(field, hash, throwErrors, isCheck, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   double __hx_getField_f(string field, int hash, bool throwErrors, bool handleProperties){
			unchecked {
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveTriPoint.hx"
				switch (hash){
					case 117:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveTriPoint.hx"
						return this.u;
					}
					
					
					default:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveTriPoint.hx"
						return base.__hx_getField_f(field, hash, throwErrors, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   void __hx_getFields(global::Array<object> baseArr){
			unchecked {
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveTriPoint.hx"
				baseArr.push("point");
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveTriPoint.hx"
				baseArr.push("uv");
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveTriPoint.hx"
				baseArr.push("u");
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveTriPoint.hx"
				{
					#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveTriPoint.hx"
					base.__hx_getFields(baseArr);
				}
				
			}
			#line default
		}
		
		
	}
}


