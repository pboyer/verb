
#pragma warning disable 109, 114, 219, 429, 168, 162
public  class Std {
	public    Std(){
		unchecked {
			#line 26 "/usr/lib/haxe/std/cs/_std/Std.hx"
			{
			}
			
		}
		#line default
	}
	
	
	public static   bool @is(object v, object t){
		unchecked {
			#line 29 "/usr/lib/haxe/std/cs/_std/Std.hx"
			if (global::haxe.lang.Runtime.eq(v, default(object))) {
				#line 30 "/usr/lib/haxe/std/cs/_std/Std.hx"
				return global::haxe.lang.Runtime.eq(t, typeof(object));
			}
			
			#line 31 "/usr/lib/haxe/std/cs/_std/Std.hx"
			if (global::haxe.lang.Runtime.eq(t, default(object))) {
				#line 32 "/usr/lib/haxe/std/cs/_std/Std.hx"
				return false;
			}
			
			#line 33 "/usr/lib/haxe/std/cs/_std/Std.hx"
			global::System.Type clt = ((global::System.Type) (t) );
			if (global::haxe.lang.Runtime.typeEq(clt, default(global::System.Type))) {
				#line 35 "/usr/lib/haxe/std/cs/_std/Std.hx"
				return false;
			}
			
			#line 36 "/usr/lib/haxe/std/cs/_std/Std.hx"
			string name = global::haxe.lang.Runtime.toString(clt);
			#line 38 "/usr/lib/haxe/std/cs/_std/Std.hx"
			switch (name){
				case "System.Double":
				{
					#line 41 "/usr/lib/haxe/std/cs/_std/Std.hx"
					return v is double || v is int;
				}
				
				
				case "System.Int32":
				{
					#line 43 "/usr/lib/haxe/std/cs/_std/Std.hx"
					return haxe.lang.Runtime.isInt(v);
				}
				
				
				case "System.Boolean":
				{
					#line 45 "/usr/lib/haxe/std/cs/_std/Std.hx"
					return v is bool;
				}
				
				
				case "System.Object":
				{
					#line 47 "/usr/lib/haxe/std/cs/_std/Std.hx"
					return true;
				}
				
				
			}
			
			#line 50 "/usr/lib/haxe/std/cs/_std/Std.hx"
			return clt.IsAssignableFrom(((global::System.Type) (global::cs.Lib.nativeType(v)) ));
		}
		#line default
	}
	
	
	public static   string @string(object s){
		unchecked {
			#line 54 "/usr/lib/haxe/std/cs/_std/Std.hx"
			if (global::haxe.lang.Runtime.eq(s, default(object))) {
				#line 55 "/usr/lib/haxe/std/cs/_std/Std.hx"
				return "null";
			}
			
			#line 56 "/usr/lib/haxe/std/cs/_std/Std.hx"
			if (( s is bool )) {
				#line 57 "/usr/lib/haxe/std/cs/_std/Std.hx"
				if (global::haxe.lang.Runtime.toBool(s)) {
					#line 57 "/usr/lib/haxe/std/cs/_std/Std.hx"
					return "true";
				}
				 else {
					#line 57 "/usr/lib/haxe/std/cs/_std/Std.hx"
					return "false";
				}
				
			}
			
			#line 59 "/usr/lib/haxe/std/cs/_std/Std.hx"
			return s.ToString();
		}
		#line default
	}
	
	
}


