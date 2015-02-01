
#pragma warning disable 109, 114, 219, 429, 168, 162
public  class Math {
	static Math() {
		#line 28 "/usr/lib/haxe/std/cs/_std/Math.hx"
		{
			#line 29 "/usr/lib/haxe/std/cs/_std/Math.hx"
			global::Math.PI = global::System.Math.PI;
			global::Math.NaN = double.NaN;
			global::Math.NEGATIVE_INFINITY = double.NegativeInfinity;
			global::Math.POSITIVE_INFINITY = double.PositiveInfinity;
			global::Math.rand = new global::System.Random();
		}
		
	}
	public    Math(){
		unchecked {
			#line 25 "/usr/lib/haxe/std/cs/_std/Math.hx"
			{
			}
			
		}
		#line default
	}
	
	
	public static  global::System.Random rand;
	
	public static  double PI;
	
	public static  double NaN;
	
	public static  double NEGATIVE_INFINITY;
	
	public static  double POSITIVE_INFINITY;
	
	public static   double abs(double v){
		unchecked {
			#line 45 "/usr/lib/haxe/std/cs/_std/Math.hx"
			return global::System.Math.Abs(((double) (v) ));
		}
		#line default
	}
	
	
	public static   bool isFinite(double f){
		unchecked {
			#line 158 "/usr/lib/haxe/std/cs/_std/Math.hx"
			return !double.IsInfinity(f) && !double.IsNaN(f);
		}
		#line default
	}
	
	
	public static   bool isNaN(double f){
		unchecked {
			#line 163 "/usr/lib/haxe/std/cs/_std/Math.hx"
			return double.IsNaN(f);
		}
		#line default
	}
	
	
}


