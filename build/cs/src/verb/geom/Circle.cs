
#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.geom{
	public  class Circle : global::verb.geom.Arc {
		public    Circle(global::haxe.lang.EmptyObject empty) : base(global::haxe.lang.EmptyObject.EMPTY){
			unchecked {
			}
			#line default
		}
		
		
		public    Circle(global::Array<double> center, global::Array<double> xaxis, global::Array<double> yaxis, double radius) : base(global::haxe.lang.EmptyObject.EMPTY){
			unchecked {
				#line 22 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/Circle.hx"
				global::verb.geom.Circle.__hx_ctor_verb_geom_Circle(this, center, xaxis, yaxis, radius);
			}
			#line default
		}
		
		
		public static   void __hx_ctor_verb_geom_Circle(global::verb.geom.Circle __temp_me115, global::Array<double> center, global::Array<double> xaxis, global::Array<double> yaxis, double radius){
			unchecked {
				#line 22 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/Circle.hx"
				global::verb.geom.Arc.__hx_ctor_verb_geom_Arc(__temp_me115, center, xaxis, yaxis, radius, ((double) (0) ), ( global::Math.PI * 2 ));
			}
			#line default
		}
		
		
		public static  new object __hx_createEmpty(){
			unchecked {
				#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/Circle.hx"
				return new global::verb.geom.Circle(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) ));
			}
			#line default
		}
		
		
		public static  new object __hx_create(global::Array arr){
			unchecked {
				#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/Circle.hx"
				return new global::verb.geom.Circle(((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (arr[0]) ))) ), ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (arr[1]) ))) ), ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (arr[2]) ))) ), ((double) (global::haxe.lang.Runtime.toDouble(arr[3])) ));
			}
			#line default
		}
		
		
	}
}


