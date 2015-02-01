
#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core.types{
	public  class CurveCurveIntersection : global::haxe.lang.HxObject {
		public    CurveCurveIntersection(global::haxe.lang.EmptyObject empty){
			unchecked {
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveCurveIntersection.hx"
				{
				}
				
			}
			#line default
		}
		
		
		public    CurveCurveIntersection(global::Array<double> point0, global::Array<double> point1, double u0, double u1){
			unchecked {
				#line 19 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveCurveIntersection.hx"
				global::verb.core.types.CurveCurveIntersection.__hx_ctor_verb_core_types_CurveCurveIntersection(this, point0, point1, u0, u1);
			}
			#line default
		}
		
		
		public static   void __hx_ctor_verb_core_types_CurveCurveIntersection(global::verb.core.types.CurveCurveIntersection __temp_me82, global::Array<double> point0, global::Array<double> point1, double u0, double u1){
			unchecked {
				#line 20 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveCurveIntersection.hx"
				__temp_me82.point0 = point0;
				__temp_me82.point1 = point1;
				__temp_me82.u0 = u0;
				__temp_me82.u1 = u1;
			}
			#line default
		}
		
		
		public static  new object __hx_createEmpty(){
			unchecked {
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveCurveIntersection.hx"
				return new global::verb.core.types.CurveCurveIntersection(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) ));
			}
			#line default
		}
		
		
		public static  new object __hx_create(global::Array arr){
			unchecked {
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveCurveIntersection.hx"
				return new global::verb.core.types.CurveCurveIntersection(((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (arr[0]) ))) ), ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (arr[1]) ))) ), ((double) (global::haxe.lang.Runtime.toDouble(arr[2])) ), ((double) (global::haxe.lang.Runtime.toDouble(arr[3])) ));
			}
			#line default
		}
		
		
		public  global::Array<double> point0;
		
		public  global::Array<double> point1;
		
		public  double u0;
		
		public  double u1;
		
		public override   double __hx_setField_f(string field, int hash, double @value, bool handleProperties){
			unchecked {
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveCurveIntersection.hx"
				switch (hash){
					case 26140:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveCurveIntersection.hx"
						this.u1 = ((double) (@value) );
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveCurveIntersection.hx"
						return @value;
					}
					
					
					case 26139:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveCurveIntersection.hx"
						this.u0 = ((double) (@value) );
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveCurveIntersection.hx"
						return @value;
					}
					
					
					default:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveCurveIntersection.hx"
						return base.__hx_setField_f(field, hash, @value, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_setField(string field, int hash, object @value, bool handleProperties){
			unchecked {
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveCurveIntersection.hx"
				switch (hash){
					case 26140:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveCurveIntersection.hx"
						this.u1 = ((double) (global::haxe.lang.Runtime.toDouble(@value)) );
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveCurveIntersection.hx"
						return @value;
					}
					
					
					case 26139:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveCurveIntersection.hx"
						this.u0 = ((double) (global::haxe.lang.Runtime.toDouble(@value)) );
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveCurveIntersection.hx"
						return @value;
					}
					
					
					case 1999507937:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveCurveIntersection.hx"
						this.point1 = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (@value) ))) );
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveCurveIntersection.hx"
						return @value;
					}
					
					
					case 1999507936:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveCurveIntersection.hx"
						this.point0 = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (@value) ))) );
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveCurveIntersection.hx"
						return @value;
					}
					
					
					default:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveCurveIntersection.hx"
						return base.__hx_setField(field, hash, @value, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_getField(string field, int hash, bool throwErrors, bool isCheck, bool handleProperties){
			unchecked {
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveCurveIntersection.hx"
				switch (hash){
					case 26140:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveCurveIntersection.hx"
						return this.u1;
					}
					
					
					case 26139:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveCurveIntersection.hx"
						return this.u0;
					}
					
					
					case 1999507937:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveCurveIntersection.hx"
						return this.point1;
					}
					
					
					case 1999507936:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveCurveIntersection.hx"
						return this.point0;
					}
					
					
					default:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveCurveIntersection.hx"
						return base.__hx_getField(field, hash, throwErrors, isCheck, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   double __hx_getField_f(string field, int hash, bool throwErrors, bool handleProperties){
			unchecked {
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveCurveIntersection.hx"
				switch (hash){
					case 26140:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveCurveIntersection.hx"
						return this.u1;
					}
					
					
					case 26139:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveCurveIntersection.hx"
						return this.u0;
					}
					
					
					default:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveCurveIntersection.hx"
						return base.__hx_getField_f(field, hash, throwErrors, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   void __hx_getFields(global::Array<object> baseArr){
			unchecked {
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveCurveIntersection.hx"
				baseArr.push("u1");
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveCurveIntersection.hx"
				baseArr.push("u0");
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveCurveIntersection.hx"
				baseArr.push("point1");
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveCurveIntersection.hx"
				baseArr.push("point0");
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveCurveIntersection.hx"
				{
					#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/CurveCurveIntersection.hx"
					base.__hx_getFields(baseArr);
				}
				
			}
			#line default
		}
		
		
	}
}


