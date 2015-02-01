
#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core{
	public  class Check : global::haxe.lang.HxObject {
		public    Check(global::haxe.lang.EmptyObject empty){
			unchecked {
				#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Check.hx"
				{
				}
				
			}
			#line default
		}
		
		
		public    Check(){
			unchecked {
				#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Check.hx"
				global::verb.core.Check.__hx_ctor_verb_core_Check(this);
			}
			#line default
		}
		
		
		public static   void __hx_ctor_verb_core_Check(global::verb.core.Check __temp_me41){
			unchecked {
				#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Check.hx"
				{
				}
				
			}
			#line default
		}
		
		
		public static   bool isValidKnotVector(global::Array<double> vec, int degree){
			unchecked {
				#line 13 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Check.hx"
				if (( vec.length == 0 )) {
					#line 13 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Check.hx"
					return false;
				}
				
				#line 14 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Check.hx"
				if (( vec.length < ( (( degree + 1 )) * 2 ) )) {
					#line 14 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Check.hx"
					return false;
				}
				
				#line 16 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Check.hx"
				double rep = vec[0];
				#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Check.hx"
				{
					#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Check.hx"
					int _g1 = 0;
					#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Check.hx"
					int _g = ( degree + 1 );
					#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Check.hx"
					while (( _g1 < _g )){
						#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Check.hx"
						int i = _g1++;
						if (( global::System.Math.Abs(((double) (( vec[i] - rep )) )) > 1e-10 )) {
							#line 19 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Check.hx"
							return false;
						}
						
					}
					
				}
				
				#line 22 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Check.hx"
				rep = vec[( vec.length - 1 )];
				#line 24 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Check.hx"
				{
					#line 24 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Check.hx"
					int _g11 = ( ( vec.length - degree ) - 1 );
					#line 24 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Check.hx"
					int _g2 = vec.length;
					#line 24 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Check.hx"
					while (( _g11 < _g2 )){
						#line 24 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Check.hx"
						int i1 = _g11++;
						if (( global::System.Math.Abs(((double) (( vec[i1] - rep )) )) > 1e-10 )) {
							#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Check.hx"
							return false;
						}
						
					}
					
				}
				
				#line 28 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Check.hx"
				return global::verb.core.Check.isNonDecreasing(vec);
			}
			#line default
		}
		
		
		public static   bool isNonDecreasing(global::Array<double> vec){
			unchecked {
				#line 32 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Check.hx"
				double rep = vec[0];
				{
					#line 33 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Check.hx"
					int _g1 = 0;
					#line 33 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Check.hx"
					int _g = vec.length;
					#line 33 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Check.hx"
					while (( _g1 < _g )){
						#line 33 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Check.hx"
						int i = _g1++;
						if (( vec[i] < ( rep - 1e-10 ) )) {
							#line 34 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Check.hx"
							return false;
						}
						
						#line 35 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Check.hx"
						rep = vec[i];
					}
					
				}
				
				#line 37 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Check.hx"
				return true;
			}
			#line default
		}
		
		
		public static   global::verb.core.types.NurbsCurveData nurbsCurveData(global::verb.core.types.NurbsCurveData data){
			unchecked {
				#line 49 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Check.hx"
				if (( data.controlPoints == default(global::Array<object>) )) {
					#line 49 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Check.hx"
					throw global::haxe.lang.HaxeException.wrap("Control points array cannot be null!");
				}
				
				#line 53 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Check.hx"
				if (( data.degree < 1 )) {
					#line 53 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Check.hx"
					throw global::haxe.lang.HaxeException.wrap("Degree must be greater than 1!");
				}
				
				#line 54 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Check.hx"
				if (( data.knots == default(global::Array<double>) )) {
					#line 54 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Check.hx"
					throw global::haxe.lang.HaxeException.wrap("Knots cannot be null!");
				}
				
				#line 56 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Check.hx"
				if (( data.knots.length != ( ( data.controlPoints.length + data.degree ) + 1 ) )) {
					#line 57 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Check.hx"
					throw global::haxe.lang.HaxeException.wrap("controlPoints.length + degree + 1 must equal knots.length!");
				}
				
				#line 60 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Check.hx"
				if ( ! (global::verb.core.Check.isValidKnotVector(data.knots, data.degree)) ) {
					#line 61 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Check.hx"
					throw global::haxe.lang.HaxeException.wrap("Invalid knot vector format!  Should begin with degree + 1 repeats and end with degree + 1 repeats!");
				}
				
				#line 64 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Check.hx"
				return data;
			}
			#line default
		}
		
		
		public static   global::verb.core.types.NurbsSurfaceData nurbsSurfaceData(global::verb.core.types.NurbsSurfaceData data){
			unchecked {
				#line 76 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Check.hx"
				if (( data.controlPoints == default(global::Array<object>) )) {
					#line 76 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Check.hx"
					throw global::haxe.lang.HaxeException.wrap("Control points array cannot be null!");
				}
				
				#line 81 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Check.hx"
				if (( data.degreeU < 1 )) {
					#line 81 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Check.hx"
					throw global::haxe.lang.HaxeException.wrap("DegreeU must be greater than 1!");
				}
				
				#line 82 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Check.hx"
				if (( data.degreeV < 1 )) {
					#line 82 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Check.hx"
					throw global::haxe.lang.HaxeException.wrap("DegreeV must be greater than 1!");
				}
				
				#line 83 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Check.hx"
				if (( data.knotsU == default(global::Array<double>) )) {
					#line 83 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Check.hx"
					throw global::haxe.lang.HaxeException.wrap("KnotsU cannot be null!");
				}
				
				#line 84 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Check.hx"
				if (( data.knotsV == default(global::Array<double>) )) {
					#line 84 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Check.hx"
					throw global::haxe.lang.HaxeException.wrap("KnotsV cannot be null!");
				}
				
				#line 86 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Check.hx"
				if (( data.knotsU.length != ( ( data.controlPoints.length + data.degreeU ) + 1 ) )) {
					#line 87 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Check.hx"
					throw global::haxe.lang.HaxeException.wrap("controlPointsU.length + degreeU + 1 must equal knotsU.length!");
				}
				
				#line 90 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Check.hx"
				if (( data.knotsV.length != ( ( ((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (data.controlPoints[0]) ))) ).length + data.degreeV ) + 1 ) )) {
					#line 91 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Check.hx"
					throw global::haxe.lang.HaxeException.wrap("controlPointsV.length + degreeV + 1 must equal knotsV.length!");
				}
				
				#line 94 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Check.hx"
				if ((  ! (global::verb.core.Check.isValidKnotVector(data.knotsU, data.degreeU))  ||  ! (global::verb.core.Check.isValidKnotVector(data.knotsV, data.degreeV))  )) {
					#line 95 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Check.hx"
					throw global::haxe.lang.HaxeException.wrap("Invalid knot vector format!  Should begin with degree + 1 repeats and end with degree + 1 repeats!");
				}
				
				#line 98 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Check.hx"
				return data;
			}
			#line default
		}
		
		
		public static  new object __hx_createEmpty(){
			unchecked {
				#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Check.hx"
				return new global::verb.core.Check(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) ));
			}
			#line default
		}
		
		
		public static  new object __hx_create(global::Array arr){
			unchecked {
				#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Check.hx"
				return new global::verb.core.Check();
			}
			#line default
		}
		
		
	}
}


