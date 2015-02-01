
#pragma warning disable 109, 114, 219, 429, 168, 162
namespace promhx.error{
	public  class PromiseError : global::haxe.lang.Enum {
		static PromiseError() {
			#line 3 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/error/PromiseError.hx"
			global::promhx.error.PromiseError.constructs = new global::Array<object>(new object[]{"AlreadyResolved", "DownstreamNotFullfilled"});
		}
		public    PromiseError(global::haxe.lang.EmptyObject empty) : base(global::haxe.lang.EmptyObject.EMPTY){
			unchecked {
			}
			#line default
		}
		
		
		public    PromiseError(int index, global::Array<object> @params) : base(index, @params){
			unchecked {
			}
			#line default
		}
		
		
		public static  global::Array<object> constructs;
		
		public static   global::promhx.error.PromiseError AlreadyResolved(string message){
			unchecked {
				#line 4 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/error/PromiseError.hx"
				return new global::promhx.error.PromiseError(((int) (0) ), ((global::Array<object>) (new global::Array<object>(new object[]{message})) ));
			}
			#line default
		}
		
		
		public static   global::promhx.error.PromiseError DownstreamNotFullfilled(string message){
			unchecked {
				#line 5 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/error/PromiseError.hx"
				return new global::promhx.error.PromiseError(((int) (1) ), ((global::Array<object>) (new global::Array<object>(new object[]{message})) ));
			}
			#line default
		}
		
		
		public static  new object __hx_createEmpty(){
			unchecked {
				#line 3 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/error/PromiseError.hx"
				return new global::promhx.error.PromiseError(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) ));
			}
			#line default
		}
		
		
		public static  new object __hx_create(global::Array arr){
			unchecked {
				#line 3 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/error/PromiseError.hx"
				return new global::promhx.error.PromiseError(((int) (global::haxe.lang.Runtime.toInt(arr[0])) ), ((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (arr[1]) ))) ));
			}
			#line default
		}
		
		
	}
}


