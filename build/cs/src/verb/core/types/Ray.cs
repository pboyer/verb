
#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core.types{
	public  class Ray : global::haxe.lang.HxObject {
		public    Ray(global::haxe.lang.EmptyObject empty){
			unchecked {
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Ray.hx"
				{
				}
				
			}
			#line default
		}
		
		
		public    Ray(global::Array<double> origin, global::Array<double> dir){
			unchecked {
				#line 11 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Ray.hx"
				global::verb.core.types.Ray.__hx_ctor_verb_core_types_Ray(this, origin, dir);
			}
			#line default
		}
		
		
		public static   void __hx_ctor_verb_core_types_Ray(global::verb.core.types.Ray __temp_me100, global::Array<double> origin, global::Array<double> dir){
			unchecked {
				#line 12 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Ray.hx"
				__temp_me100.origin = origin;
				__temp_me100.dir = dir;
			}
			#line default
		}
		
		
		public static  new object __hx_createEmpty(){
			unchecked {
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Ray.hx"
				return new global::verb.core.types.Ray(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) ));
			}
			#line default
		}
		
		
		public static  new object __hx_create(global::Array arr){
			unchecked {
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Ray.hx"
				return new global::verb.core.types.Ray(((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (arr[0]) ))) ), ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (arr[1]) ))) ));
			}
			#line default
		}
		
		
		public  global::Array<double> origin;
		
		public  global::Array<double> dir;
		
		public override   object __hx_setField(string field, int hash, object @value, bool handleProperties){
			unchecked {
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Ray.hx"
				switch (hash){
					case 4996429:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Ray.hx"
						this.dir = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (@value) ))) );
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Ray.hx"
						return @value;
					}
					
					
					case 1258363366:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Ray.hx"
						this.origin = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (@value) ))) );
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Ray.hx"
						return @value;
					}
					
					
					default:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Ray.hx"
						return base.__hx_setField(field, hash, @value, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_getField(string field, int hash, bool throwErrors, bool isCheck, bool handleProperties){
			unchecked {
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Ray.hx"
				switch (hash){
					case 4996429:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Ray.hx"
						return this.dir;
					}
					
					
					case 1258363366:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Ray.hx"
						return this.origin;
					}
					
					
					default:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Ray.hx"
						return base.__hx_getField(field, hash, throwErrors, isCheck, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   void __hx_getFields(global::Array<object> baseArr){
			unchecked {
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Ray.hx"
				baseArr.push("dir");
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Ray.hx"
				baseArr.push("origin");
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Ray.hx"
				{
					#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Ray.hx"
					base.__hx_getFields(baseArr);
				}
				
			}
			#line default
		}
		
		
	}
}


