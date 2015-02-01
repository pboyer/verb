
#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.exe{
	public  class Dispatcher : global::haxe.lang.HxObject {
		static Dispatcher() {
			#line 14 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/exe/Dispatcher.hx"
			global::verb.exe.Dispatcher.THREADS = 1;
			#line 16 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/exe/Dispatcher.hx"
			global::verb.exe.Dispatcher._instance = default(global::verb.exe.Dispatcher);
			#line 24 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/exe/Dispatcher.hx"
			global::verb.exe.Dispatcher._init = false;
		}
		public    Dispatcher(global::haxe.lang.EmptyObject empty){
			unchecked {
				#line 12 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/exe/Dispatcher.hx"
				{
				}
				
			}
			#line default
		}
		
		
		public    Dispatcher(){
			unchecked {
				#line 12 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/exe/Dispatcher.hx"
				global::verb.exe.Dispatcher.__hx_ctor_verb_exe_Dispatcher(this);
			}
			#line default
		}
		
		
		public static   void __hx_ctor_verb_exe_Dispatcher(global::verb.exe.Dispatcher __temp_me108){
			unchecked {
				#line 12 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/exe/Dispatcher.hx"
				{
				}
				
			}
			#line default
		}
		
		
		public static  int THREADS;
		
		public static  global::verb.exe.Dispatcher _instance;
		
		public static  bool _init;
		
		public static   void init(){
			unchecked {
				#line 28 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/exe/Dispatcher.hx"
				if (global::verb.exe.Dispatcher._init) {
					#line 28 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/exe/Dispatcher.hx"
					return ;
				}
				
				#line 36 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/exe/Dispatcher.hx"
				global::verb.exe.Dispatcher._init = true;
			}
			#line default
		}
		
		
		public static   global::promhx.Promise<T> dispatchMethod<T>(global::System.Type classType, string methodName, global::Array args){
			unchecked {
				#line 42 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/exe/Dispatcher.hx"
				global::verb.exe.Dispatcher.init();
				#line 44 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/exe/Dispatcher.hx"
				global::Array<object> def = new global::Array<object>(new object[]{new global::promhx.Deferred<T>()});
				#line 46 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/exe/Dispatcher.hx"
				global::haxe.lang.Function callback = new global::verb.exe.Dispatcher_dispatchMethod_46__Fun<T>(((global::Array<object>) (def) ));
				#line 57 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/exe/Dispatcher.hx"
				T result = global::haxe.lang.Runtime.genericCast<T>(global::Reflect.callMethod(classType, global::Reflect.field(classType, methodName), args));
				callback.__hx_invoke1_o(default(double), result);
				#line 61 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/exe/Dispatcher.hx"
				return new global::promhx.Promise<T>(((global::promhx.Deferred<T>) (global::promhx.Deferred<object>.__hx_cast<T>(((global::promhx.Deferred) (def[0]) ))) ));
			}
			#line default
		}
		
		
		public static  new object __hx_createEmpty(){
			unchecked {
				#line 12 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/exe/Dispatcher.hx"
				return new global::verb.exe.Dispatcher(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) ));
			}
			#line default
		}
		
		
		public static  new object __hx_create(global::Array arr){
			unchecked {
				#line 12 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/exe/Dispatcher.hx"
				return new global::verb.exe.Dispatcher();
			}
			#line default
		}
		
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.exe{
	public  class Dispatcher_dispatchMethod_46__Fun<T> : global::haxe.lang.Function {
		public    Dispatcher_dispatchMethod_46__Fun(global::Array<object> def) : base(1, 0){
			unchecked {
				#line 47 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/exe/Dispatcher.hx"
				this.def = def;
			}
			#line default
		}
		
		
		public override   object __hx_invoke1_o(double __fn_float1, object __fn_dyn1){
			unchecked {
				#line 46 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/exe/Dispatcher.hx"
				T x = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (global::haxe.lang.Runtime.genericCast<T>(((object) (__fn_float1) ))) : (global::haxe.lang.Runtime.genericCast<T>(__fn_dyn1)) );
				((global::promhx.Deferred<T>) (global::promhx.Deferred<object>.__hx_cast<T>(((global::promhx.Deferred) (this.def[0]) ))) ).resolve(x);
				#line 47 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/exe/Dispatcher.hx"
				return default(object);
			}
			#line default
		}
		
		
		public  global::Array<object> def;
		
	}
}


