
#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core.types{
	public  class NurbsSurfaceData : global::haxe.lang.HxObject {
		public    NurbsSurfaceData(global::haxe.lang.EmptyObject empty){
			unchecked {
				#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/NurbsSurfaceData.hx"
				{
				}
				
			}
			#line default
		}
		
		
		public    NurbsSurfaceData(int degreeU, int degreeV, global::Array<double> knotsU, global::Array<double> knotsV, global::Array<object> controlPoints){
			unchecked {
				#line 24 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/NurbsSurfaceData.hx"
				global::verb.core.types.NurbsSurfaceData.__hx_ctor_verb_core_types_NurbsSurfaceData(this, degreeU, degreeV, knotsU, knotsV, controlPoints);
			}
			#line default
		}
		
		
		public static   void __hx_ctor_verb_core_types_NurbsSurfaceData(global::verb.core.types.NurbsSurfaceData __temp_me96, int degreeU, int degreeV, global::Array<double> knotsU, global::Array<double> knotsV, global::Array<object> controlPoints){
			unchecked {
				#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/NurbsSurfaceData.hx"
				__temp_me96.degreeU = degreeU;
				__temp_me96.degreeV = degreeV;
				__temp_me96.knotsU = knotsU;
				__temp_me96.knotsV = knotsV;
				__temp_me96.controlPoints = controlPoints;
			}
			#line default
		}
		
		
		public static  new object __hx_createEmpty(){
			unchecked {
				#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/NurbsSurfaceData.hx"
				return new global::verb.core.types.NurbsSurfaceData(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) ));
			}
			#line default
		}
		
		
		public static  new object __hx_create(global::Array arr){
			unchecked {
				#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/NurbsSurfaceData.hx"
				return new global::verb.core.types.NurbsSurfaceData(((int) (global::haxe.lang.Runtime.toInt(arr[0])) ), ((int) (global::haxe.lang.Runtime.toInt(arr[1])) ), ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (arr[2]) ))) ), ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (arr[3]) ))) ), ((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (arr[4]) ))) ));
			}
			#line default
		}
		
		
		public  int degreeU;
		
		public  int degreeV;
		
		public  global::Array<double> knotsU;
		
		public  global::Array<double> knotsV;
		
		public  global::Array<object> controlPoints;
		
		public override   double __hx_setField_f(string field, int hash, double @value, bool handleProperties){
			unchecked {
				#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/NurbsSurfaceData.hx"
				switch (hash){
					case 979035018:
					{
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/NurbsSurfaceData.hx"
						this.degreeV = ((int) (@value) );
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/NurbsSurfaceData.hx"
						return @value;
					}
					
					
					case 979035017:
					{
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/NurbsSurfaceData.hx"
						this.degreeU = ((int) (@value) );
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/NurbsSurfaceData.hx"
						return @value;
					}
					
					
					default:
					{
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/NurbsSurfaceData.hx"
						return base.__hx_setField_f(field, hash, @value, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_setField(string field, int hash, object @value, bool handleProperties){
			unchecked {
				#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/NurbsSurfaceData.hx"
				switch (hash){
					case 1878152544:
					{
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/NurbsSurfaceData.hx"
						this.controlPoints = ((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (@value) ))) );
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/NurbsSurfaceData.hx"
						return @value;
					}
					
					
					case 1744471051:
					{
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/NurbsSurfaceData.hx"
						this.knotsV = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (@value) ))) );
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/NurbsSurfaceData.hx"
						return @value;
					}
					
					
					case 1744471050:
					{
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/NurbsSurfaceData.hx"
						this.knotsU = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (@value) ))) );
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/NurbsSurfaceData.hx"
						return @value;
					}
					
					
					case 979035018:
					{
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/NurbsSurfaceData.hx"
						this.degreeV = ((int) (global::haxe.lang.Runtime.toInt(@value)) );
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/NurbsSurfaceData.hx"
						return @value;
					}
					
					
					case 979035017:
					{
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/NurbsSurfaceData.hx"
						this.degreeU = ((int) (global::haxe.lang.Runtime.toInt(@value)) );
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/NurbsSurfaceData.hx"
						return @value;
					}
					
					
					default:
					{
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/NurbsSurfaceData.hx"
						return base.__hx_setField(field, hash, @value, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_getField(string field, int hash, bool throwErrors, bool isCheck, bool handleProperties){
			unchecked {
				#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/NurbsSurfaceData.hx"
				switch (hash){
					case 1878152544:
					{
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/NurbsSurfaceData.hx"
						return this.controlPoints;
					}
					
					
					case 1744471051:
					{
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/NurbsSurfaceData.hx"
						return this.knotsV;
					}
					
					
					case 1744471050:
					{
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/NurbsSurfaceData.hx"
						return this.knotsU;
					}
					
					
					case 979035018:
					{
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/NurbsSurfaceData.hx"
						return this.degreeV;
					}
					
					
					case 979035017:
					{
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/NurbsSurfaceData.hx"
						return this.degreeU;
					}
					
					
					default:
					{
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/NurbsSurfaceData.hx"
						return base.__hx_getField(field, hash, throwErrors, isCheck, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   double __hx_getField_f(string field, int hash, bool throwErrors, bool handleProperties){
			unchecked {
				#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/NurbsSurfaceData.hx"
				switch (hash){
					case 979035018:
					{
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/NurbsSurfaceData.hx"
						return ((double) (this.degreeV) );
					}
					
					
					case 979035017:
					{
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/NurbsSurfaceData.hx"
						return ((double) (this.degreeU) );
					}
					
					
					default:
					{
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/NurbsSurfaceData.hx"
						return base.__hx_getField_f(field, hash, throwErrors, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   void __hx_getFields(global::Array<object> baseArr){
			unchecked {
				#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/NurbsSurfaceData.hx"
				baseArr.push("controlPoints");
				#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/NurbsSurfaceData.hx"
				baseArr.push("knotsV");
				#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/NurbsSurfaceData.hx"
				baseArr.push("knotsU");
				#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/NurbsSurfaceData.hx"
				baseArr.push("degreeV");
				#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/NurbsSurfaceData.hx"
				baseArr.push("degreeU");
				#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/NurbsSurfaceData.hx"
				{
					#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/NurbsSurfaceData.hx"
					base.__hx_getFields(baseArr);
				}
				
			}
			#line default
		}
		
		
	}
}


