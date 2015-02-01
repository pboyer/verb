
#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.geom{
	public  class BezierCurve : global::verb.geom.NurbsCurve {
		public    BezierCurve(global::haxe.lang.EmptyObject empty) : base(global::haxe.lang.EmptyObject.EMPTY){
			unchecked {
			}
			#line default
		}
		
		
		public    BezierCurve(global::Array<object> points, global::Array<double> weights) : base(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) )){
			unchecked {
				#line 17 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/BezierCurve.hx"
				global::verb.geom.BezierCurve.__hx_ctor_verb_geom_BezierCurve(this, points, weights);
			}
			#line default
		}
		
		
		public static   void __hx_ctor_verb_geom_BezierCurve(global::verb.geom.BezierCurve __temp_me114, global::Array<object> points, global::Array<double> weights){
			unchecked {
				#line 17 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/BezierCurve.hx"
				global::verb.geom.NurbsCurve.__hx_ctor_verb_geom_NurbsCurve(__temp_me114, global::verb.core.Make.rationalBezierCurve(points, ( (( weights == default(global::Array<double>) )) ? (default(global::Array<double>)) : (weights) )));
			}
			#line default
		}
		
		
		public static  new object __hx_createEmpty(){
			unchecked {
				#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/BezierCurve.hx"
				return new global::verb.geom.BezierCurve(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) ));
			}
			#line default
		}
		
		
		public static  new object __hx_create(global::Array arr){
			unchecked {
				#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/BezierCurve.hx"
				return new global::verb.geom.BezierCurve(((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (arr[0]) ))) ), ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (arr[1]) ))) ));
			}
			#line default
		}
		
		
	}
}


