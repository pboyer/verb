
#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core.types{
	public  class NurbsCurveData : global::haxe.lang.HxObject {
		public    NurbsCurveData(global::haxe.lang.EmptyObject empty){
			unchecked {
				#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/NurbsCurveData.hx"
				{
				}
				
			}
			#line default
		}
		
		
		public    NurbsCurveData(int degree, global::Array<double> knots, global::Array<object> controlPoints){
			unchecked {
				#line 19 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/NurbsCurveData.hx"
				global::verb.core.types.NurbsCurveData.__hx_ctor_verb_core_types_NurbsCurveData(this, degree, knots, controlPoints);
			}
			#line default
		}
		
		
		public static   void __hx_ctor_verb_core_types_NurbsCurveData(global::verb.core.types.NurbsCurveData __temp_me95, int degree, global::Array<double> knots, global::Array<object> controlPoints){
			unchecked {
				#line 20 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/NurbsCurveData.hx"
				__temp_me95.degree = degree;
				__temp_me95.controlPoints = controlPoints;
				__temp_me95.knots = knots;
			}
			#line default
		}
		
		
		public static  new object __hx_createEmpty(){
			unchecked {
				#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/NurbsCurveData.hx"
				return new global::verb.core.types.NurbsCurveData(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) ));
			}
			#line default
		}
		
		
		public static  new object __hx_create(global::Array arr){
			unchecked {
				#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/NurbsCurveData.hx"
				return new global::verb.core.types.NurbsCurveData(((int) (global::haxe.lang.Runtime.toInt(arr[0])) ), ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (arr[1]) ))) ), ((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (arr[2]) ))) ));
			}
			#line default
		}
		
		
		public  int degree;
		
		public  global::Array<object> controlPoints;
		
		public  global::Array<double> knots;
		
		public override   double __hx_setField_f(string field, int hash, double @value, bool handleProperties){
			unchecked {
				#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/NurbsCurveData.hx"
				switch (hash){
					case 1737785164:
					{
						#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/NurbsCurveData.hx"
						this.degree = ((int) (@value) );
						#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/NurbsCurveData.hx"
						return @value;
					}
					
					
					default:
					{
						#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/NurbsCurveData.hx"
						return base.__hx_setField_f(field, hash, @value, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_setField(string field, int hash, object @value, bool handleProperties){
			unchecked {
				#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/NurbsCurveData.hx"
				switch (hash){
					case 1693067755:
					{
						#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/NurbsCurveData.hx"
						this.knots = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (@value) ))) );
						#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/NurbsCurveData.hx"
						return @value;
					}
					
					
					case 1878152544:
					{
						#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/NurbsCurveData.hx"
						this.controlPoints = ((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (@value) ))) );
						#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/NurbsCurveData.hx"
						return @value;
					}
					
					
					case 1737785164:
					{
						#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/NurbsCurveData.hx"
						this.degree = ((int) (global::haxe.lang.Runtime.toInt(@value)) );
						#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/NurbsCurveData.hx"
						return @value;
					}
					
					
					default:
					{
						#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/NurbsCurveData.hx"
						return base.__hx_setField(field, hash, @value, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_getField(string field, int hash, bool throwErrors, bool isCheck, bool handleProperties){
			unchecked {
				#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/NurbsCurveData.hx"
				switch (hash){
					case 1693067755:
					{
						#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/NurbsCurveData.hx"
						return this.knots;
					}
					
					
					case 1878152544:
					{
						#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/NurbsCurveData.hx"
						return this.controlPoints;
					}
					
					
					case 1737785164:
					{
						#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/NurbsCurveData.hx"
						return this.degree;
					}
					
					
					default:
					{
						#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/NurbsCurveData.hx"
						return base.__hx_getField(field, hash, throwErrors, isCheck, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   double __hx_getField_f(string field, int hash, bool throwErrors, bool handleProperties){
			unchecked {
				#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/NurbsCurveData.hx"
				switch (hash){
					case 1737785164:
					{
						#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/NurbsCurveData.hx"
						return ((double) (this.degree) );
					}
					
					
					default:
					{
						#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/NurbsCurveData.hx"
						return base.__hx_getField_f(field, hash, throwErrors, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   void __hx_getFields(global::Array<object> baseArr){
			unchecked {
				#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/NurbsCurveData.hx"
				baseArr.push("knots");
				#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/NurbsCurveData.hx"
				baseArr.push("controlPoints");
				#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/NurbsCurveData.hx"
				baseArr.push("degree");
				#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/NurbsCurveData.hx"
				{
					#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/NurbsCurveData.hx"
					base.__hx_getFields(baseArr);
				}
				
			}
			#line default
		}
		
		
	}
}


