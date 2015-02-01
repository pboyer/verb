
#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.geom{
	public  class Ellipse : global::verb.geom.EllipseArc {
		public    Ellipse(global::haxe.lang.EmptyObject empty) : base(global::haxe.lang.EmptyObject.EMPTY){
			unchecked {
			}
			#line default
		}
		
		
		public    Ellipse(global::Array<double> center, global::Array<double> xaxis, global::Array<double> yaxis) : base(global::haxe.lang.EmptyObject.EMPTY){
			unchecked {
				#line 19 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/Ellipse.hx"
				global::verb.geom.Ellipse.__hx_ctor_verb_geom_Ellipse(this, center, xaxis, yaxis);
			}
			#line default
		}
		
		
		public static   void __hx_ctor_verb_geom_Ellipse(global::verb.geom.Ellipse __temp_me128, global::Array<double> center, global::Array<double> xaxis, global::Array<double> yaxis){
			unchecked {
				#line 19 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/Ellipse.hx"
				global::verb.geom.EllipseArc.__hx_ctor_verb_geom_EllipseArc(__temp_me128, center, xaxis, yaxis, ((double) (0) ), ( global::Math.PI * 2 ));
			}
			#line default
		}
		
		
		public static  new object __hx_createEmpty(){
			unchecked {
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/Ellipse.hx"
				return new global::verb.geom.Ellipse(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) ));
			}
			#line default
		}
		
		
		public static  new object __hx_create(global::Array arr){
			unchecked {
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/Ellipse.hx"
				return new global::verb.geom.Ellipse(((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (arr[0]) ))) ), ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (arr[1]) ))) ), ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (arr[2]) ))) ));
			}
			#line default
		}
		
		
	}
}


