
#pragma warning disable 109, 114, 219, 429, 168, 162
namespace cs{
	public  class Lib : global::haxe.lang.HxObject {
		public    Lib(global::haxe.lang.EmptyObject empty){
			unchecked {
				#line 29 "/usr/lib/haxe/std/cs/Lib.hx"
				{
				}
				
			}
			#line default
		}
		
		
		public    Lib(){
			unchecked {
				#line 29 "/usr/lib/haxe/std/cs/Lib.hx"
				global::cs.Lib.__hx_ctor_cs_Lib(this);
			}
			#line default
		}
		
		
		public static   void __hx_ctor_cs_Lib(global::cs.Lib __temp_me13){
			unchecked {
				#line 29 "/usr/lib/haxe/std/cs/Lib.hx"
				{
				}
				
			}
			#line default
		}
		
		
		public static  string decimalSeparator;
		
		public static   void applyCultureChanges(){
			
			System.Globalization.CultureInfo ci = new System.Globalization.CultureInfo(System.Threading.Thread.CurrentThread.CurrentCulture.Name, true);
			decimalSeparator = ci.NumberFormat.NumberDecimalSeparator;
            ci.NumberFormat.NumberDecimalSeparator = ".";
            System.Threading.Thread.CurrentThread.CurrentCulture = ci;
	
		}
		
		
		public static   global::System.Type nativeType(object obj){
			unchecked {
				#line 121 "/usr/lib/haxe/std/cs/Lib.hx"
				return obj.GetType();
			}
			#line default
		}
		
		
		public static   global::Array<T> array<T>(T[] native){
			unchecked {
				#line 131 "/usr/lib/haxe/std/cs/Lib.hx"
				return global::Array<object>.ofNative<T>(native);
			}
			#line default
		}
		
		
		public static  new object __hx_createEmpty(){
			unchecked {
				#line 29 "/usr/lib/haxe/std/cs/Lib.hx"
				return new global::cs.Lib(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) ));
			}
			#line default
		}
		
		
		public static  new object __hx_create(global::Array arr){
			unchecked {
				#line 29 "/usr/lib/haxe/std/cs/Lib.hx"
				return new global::cs.Lib();
			}
			#line default
		}
		
		
	}
}


