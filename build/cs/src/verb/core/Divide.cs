
#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core{
	public  class Divide : global::haxe.lang.HxObject {
		public    Divide(global::haxe.lang.EmptyObject empty){
			unchecked {
				#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Divide.hx"
				{
				}
				
			}
			#line default
		}
		
		
		public    Divide(){
			unchecked {
				#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Divide.hx"
				global::verb.core.Divide.__hx_ctor_verb_core_Divide(this);
			}
			#line default
		}
		
		
		public static   void __hx_ctor_verb_core_Divide(global::verb.core.Divide __temp_me43){
			unchecked {
				#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Divide.hx"
				{
				}
				
			}
			#line default
		}
		
		
		public static   global::Array<object> rationalCurveByEqualArcLength(global::verb.core.types.NurbsCurveData curve, int num){
			unchecked {
				#line 12 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Divide.hx"
				double tlen = global::verb.core.Analyze.rationalCurveArcLength(curve, default(global::haxe.lang.Null<double>), default(global::haxe.lang.Null<int>));
				double inc = ( tlen / num );
				#line 15 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Divide.hx"
				return global::verb.core.Divide.rationalCurveByArcLength(curve, inc);
			}
			#line default
		}
		
		
		public static   global::Array<object> rationalCurveByArcLength(global::verb.core.types.NurbsCurveData curve, double l){
			unchecked {
				#line 21 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Divide.hx"
				global::Array<object> crvs = global::verb.core.Modify.decomposeCurveIntoBeziers(curve);
				global::Array<double> crvlens = crvs.map<double>(( (( global::verb.core.Divide_rationalCurveByArcLength_22__Fun.__hx_current != default(global::verb.core.Divide_rationalCurveByArcLength_22__Fun) )) ? (global::verb.core.Divide_rationalCurveByArcLength_22__Fun.__hx_current) : (global::verb.core.Divide_rationalCurveByArcLength_22__Fun.__hx_current = ((global::verb.core.Divide_rationalCurveByArcLength_22__Fun) (new global::verb.core.Divide_rationalCurveByArcLength_22__Fun()) )) ));
				double totlen = global::verb.core.Vec.sum(crvlens);
				global::Array<object> pts = new global::Array<object>(new object[]{new global::verb.core.types.CurveLengthSample(((double) (curve.knots[0]) ), ((double) (0.0) ))});
				#line 26 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Divide.hx"
				if (( l > totlen )) {
					#line 26 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Divide.hx"
					return pts;
				}
				
				#line 28 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Divide.hx"
				double inc = l;
				int i = 0;
				double lc = inc;
				double runsum = 0.0;
				double runsum1 = 0.0;
				#line 28 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Divide.hx"
				double u = default(double);
				#line 35 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Divide.hx"
				while (( i < crvs.length )){
					#line 37 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Divide.hx"
					runsum += crvlens[i];
					#line 39 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Divide.hx"
					while (( lc < ( runsum + 1e-10 ) )){
						#line 41 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Divide.hx"
						u = global::verb.core.Analyze.rationalBezierCurveParamAtArcLength(((global::verb.core.types.NurbsCurveData) (crvs[i]) ), ( lc - runsum1 ), new global::haxe.lang.Null<double>(1e-6, true), new global::haxe.lang.Null<double>(crvlens[i], true));
						#line 43 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Divide.hx"
						pts.push(new global::verb.core.types.CurveLengthSample(((double) (u) ), ((double) (lc) )));
						lc += inc;
					}
					
					#line 48 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Divide.hx"
					runsum1 += crvlens[i];
					#line 50 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Divide.hx"
					i++;
				}
				
				#line 54 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Divide.hx"
				return pts;
			}
			#line default
		}
		
		
		public static  new object __hx_createEmpty(){
			unchecked {
				#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Divide.hx"
				return new global::verb.core.Divide(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) ));
			}
			#line default
		}
		
		
		public static  new object __hx_create(global::Array arr){
			unchecked {
				#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Divide.hx"
				return new global::verb.core.Divide();
			}
			#line default
		}
		
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core{
	public  class Divide_rationalCurveByArcLength_22__Fun : global::haxe.lang.Function {
		public    Divide_rationalCurveByArcLength_22__Fun() : base(1, 1){
			unchecked {
			}
			#line default
		}
		
		
		public static  global::verb.core.Divide_rationalCurveByArcLength_22__Fun __hx_current;
		
		public override   double __hx_invoke1_f(double __fn_float1, object __fn_dyn1){
			unchecked {
				#line 22 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Divide.hx"
				global::verb.core.types.NurbsCurveData x = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (((global::verb.core.types.NurbsCurveData) (((object) (__fn_float1) )) )) : (((global::verb.core.types.NurbsCurveData) (__fn_dyn1) )) );
				#line 22 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Divide.hx"
				return global::verb.core.Analyze.rationalBezierCurveArcLength(x, default(global::haxe.lang.Null<double>), default(global::haxe.lang.Null<int>));
			}
			#line default
		}
		
		
	}
}


