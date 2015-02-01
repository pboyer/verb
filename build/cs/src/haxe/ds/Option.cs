
#pragma warning disable 109, 114, 219, 429, 168, 162
namespace haxe.ds{
	public  class Option : global::haxe.lang.Enum {
		static Option() {
			#line 29 "/usr/lib/haxe/std/haxe/ds/Option.hx"
			global::haxe.ds.Option.constructs = new global::Array<object>(new object[]{"Some", "None"});
			#line 31 "/usr/lib/haxe/std/haxe/ds/Option.hx"
			global::haxe.ds.Option.None = new global::haxe.ds.Option(((int) (1) ), ((global::Array<object>) (new global::Array<object>(new object[]{})) ));
		}
		public    Option(global::haxe.lang.EmptyObject empty) : base(global::haxe.lang.EmptyObject.EMPTY){
			unchecked {
			}
			#line default
		}
		
		
		public    Option(int index, global::Array<object> @params) : base(index, @params){
			unchecked {
			}
			#line default
		}
		
		
		public static  global::Array<object> constructs;
		
		public static   global::haxe.ds.Option Some(object v){
			unchecked {
				#line 30 "/usr/lib/haxe/std/haxe/ds/Option.hx"
				return new global::haxe.ds.Option(((int) (0) ), ((global::Array<object>) (new global::Array<object>(new object[]{v})) ));
			}
			#line default
		}
		
		
		public static  global::haxe.ds.Option None;
		
		public static  new object __hx_createEmpty(){
			unchecked {
				#line 29 "/usr/lib/haxe/std/haxe/ds/Option.hx"
				return new global::haxe.ds.Option(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) ));
			}
			#line default
		}
		
		
		public static  new object __hx_create(global::Array arr){
			unchecked {
				#line 29 "/usr/lib/haxe/std/haxe/ds/Option.hx"
				return new global::haxe.ds.Option(((int) (global::haxe.lang.Runtime.toInt(arr[0])) ), ((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (arr[1]) ))) ));
			}
			#line default
		}
		
		
	}
}


