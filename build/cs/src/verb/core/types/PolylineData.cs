
#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core.types{
	public  class PolylineData : global::haxe.lang.HxObject {
		public    PolylineData(global::haxe.lang.EmptyObject empty){
			unchecked {
				#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/PolylineData.hx"
				{
				}
				
			}
			#line default
		}
		
		
		public    PolylineData(global::Array<object> points, global::Array<double> @params){
			unchecked {
				#line 10 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/PolylineData.hx"
				global::verb.core.types.PolylineData.__hx_ctor_verb_core_types_PolylineData(this, points, @params);
			}
			#line default
		}
		
		
		public static   void __hx_ctor_verb_core_types_PolylineData(global::verb.core.types.PolylineData __temp_me98, global::Array<object> points, global::Array<double> @params){
			unchecked {
				#line 11 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/PolylineData.hx"
				__temp_me98.points = points;
				__temp_me98.@params = @params;
			}
			#line default
		}
		
		
		public static  new object __hx_createEmpty(){
			unchecked {
				#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/PolylineData.hx"
				return new global::verb.core.types.PolylineData(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) ));
			}
			#line default
		}
		
		
		public static  new object __hx_create(global::Array arr){
			unchecked {
				#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/PolylineData.hx"
				return new global::verb.core.types.PolylineData(((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (arr[0]) ))) ), ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (arr[1]) ))) ));
			}
			#line default
		}
		
		
		public  global::Array<object> points;
		
		public  global::Array<double> @params;
		
		public override   object __hx_setField(string field, int hash, object @value, bool handleProperties){
			unchecked {
				#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/PolylineData.hx"
				switch (hash){
					case 1836776262:
					{
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/PolylineData.hx"
						this.@params = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (@value) ))) );
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/PolylineData.hx"
						return @value;
					}
					
					
					case 1999508003:
					{
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/PolylineData.hx"
						this.points = ((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (@value) ))) );
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/PolylineData.hx"
						return @value;
					}
					
					
					default:
					{
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/PolylineData.hx"
						return base.__hx_setField(field, hash, @value, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_getField(string field, int hash, bool throwErrors, bool isCheck, bool handleProperties){
			unchecked {
				#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/PolylineData.hx"
				switch (hash){
					case 1836776262:
					{
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/PolylineData.hx"
						return this.@params;
					}
					
					
					case 1999508003:
					{
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/PolylineData.hx"
						return this.points;
					}
					
					
					default:
					{
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/PolylineData.hx"
						return base.__hx_getField(field, hash, throwErrors, isCheck, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   void __hx_getFields(global::Array<object> baseArr){
			unchecked {
				#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/PolylineData.hx"
				baseArr.push("params");
				#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/PolylineData.hx"
				baseArr.push("points");
				#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/PolylineData.hx"
				{
					#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/PolylineData.hx"
					base.__hx_getFields(baseArr);
				}
				
			}
			#line default
		}
		
		
	}
}


