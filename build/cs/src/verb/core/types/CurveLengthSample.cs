
#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core.types{
	public  class CurveLengthSample : global::haxe.lang.HxObject {
		public    CurveLengthSample(global::haxe.lang.EmptyObject empty){
			unchecked {
				#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveLengthSample.hx"
				{
				}
				
			}
			#line default
		}
		
		
		public    CurveLengthSample(double u, double len){
			unchecked {
				#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveLengthSample.hx"
				global::verb.core.types.CurveLengthSample.__hx_ctor_verb_core_types_CurveLengthSample(this, u, len);
			}
			#line default
		}
		
		
		public static   void __hx_ctor_verb_core_types_CurveLengthSample(global::verb.core.types.CurveLengthSample __temp_me83, double u, double len){
			unchecked {
				#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveLengthSample.hx"
				__temp_me83.u = u;
				__temp_me83.len = len;
			}
			#line default
		}
		
		
		public static  new object __hx_createEmpty(){
			unchecked {
				#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveLengthSample.hx"
				return new global::verb.core.types.CurveLengthSample(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) ));
			}
			#line default
		}
		
		
		public static  new object __hx_create(global::Array arr){
			unchecked {
				#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveLengthSample.hx"
				return new global::verb.core.types.CurveLengthSample(((double) (global::haxe.lang.Runtime.toDouble(arr[0])) ), ((double) (global::haxe.lang.Runtime.toDouble(arr[1])) ));
			}
			#line default
		}
		
		
		public  double u;
		
		public  double len;
		
		public override   double __hx_setField_f(string field, int hash, double @value, bool handleProperties){
			unchecked {
				#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveLengthSample.hx"
				switch (hash){
					case 5393365:
					{
						#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveLengthSample.hx"
						this.len = ((double) (@value) );
						#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveLengthSample.hx"
						return @value;
					}
					
					
					case 117:
					{
						#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveLengthSample.hx"
						this.u = ((double) (@value) );
						#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveLengthSample.hx"
						return @value;
					}
					
					
					default:
					{
						#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveLengthSample.hx"
						return base.__hx_setField_f(field, hash, @value, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_setField(string field, int hash, object @value, bool handleProperties){
			unchecked {
				#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveLengthSample.hx"
				switch (hash){
					case 5393365:
					{
						#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveLengthSample.hx"
						this.len = ((double) (global::haxe.lang.Runtime.toDouble(@value)) );
						#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveLengthSample.hx"
						return @value;
					}
					
					
					case 117:
					{
						#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveLengthSample.hx"
						this.u = ((double) (global::haxe.lang.Runtime.toDouble(@value)) );
						#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveLengthSample.hx"
						return @value;
					}
					
					
					default:
					{
						#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveLengthSample.hx"
						return base.__hx_setField(field, hash, @value, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_getField(string field, int hash, bool throwErrors, bool isCheck, bool handleProperties){
			unchecked {
				#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveLengthSample.hx"
				switch (hash){
					case 5393365:
					{
						#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveLengthSample.hx"
						return this.len;
					}
					
					
					case 117:
					{
						#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveLengthSample.hx"
						return this.u;
					}
					
					
					default:
					{
						#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveLengthSample.hx"
						return base.__hx_getField(field, hash, throwErrors, isCheck, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   double __hx_getField_f(string field, int hash, bool throwErrors, bool handleProperties){
			unchecked {
				#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveLengthSample.hx"
				switch (hash){
					case 5393365:
					{
						#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveLengthSample.hx"
						return this.len;
					}
					
					
					case 117:
					{
						#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveLengthSample.hx"
						return this.u;
					}
					
					
					default:
					{
						#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveLengthSample.hx"
						return base.__hx_getField_f(field, hash, throwErrors, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   void __hx_getFields(global::Array<object> baseArr){
			unchecked {
				#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveLengthSample.hx"
				baseArr.push("len");
				#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveLengthSample.hx"
				baseArr.push("u");
				#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveLengthSample.hx"
				{
					#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveLengthSample.hx"
					base.__hx_getFields(baseArr);
				}
				
			}
			#line default
		}
		
		
	}
}


