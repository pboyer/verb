
#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.exe{
	public  class AsyncObject : global::haxe.lang.HxObject {
		public    AsyncObject(global::haxe.lang.EmptyObject empty){
			unchecked {
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/exe/AsyncObject.hx"
				{
				}
				
			}
			#line default
		}
		
		
		public    AsyncObject(){
			unchecked {
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/exe/AsyncObject.hx"
				global::verb.exe.AsyncObject.__hx_ctor_verb_exe_AsyncObject(this);
			}
			#line default
		}
		
		
		public static   void __hx_ctor_verb_exe_AsyncObject(global::verb.exe.AsyncObject __temp_me107){
			unchecked {
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/exe/AsyncObject.hx"
				{
				}
				
			}
			#line default
		}
		
		
		public static  new object __hx_createEmpty(){
			unchecked {
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/exe/AsyncObject.hx"
				return new global::verb.exe.AsyncObject(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) ));
			}
			#line default
		}
		
		
		public static  new object __hx_create(global::Array arr){
			unchecked {
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/exe/AsyncObject.hx"
				return new global::verb.exe.AsyncObject();
			}
			#line default
		}
		
		
		public virtual   global::promhx.Promise<T> defer<T>(global::System.Type classType, string methodName, global::Array args){
			unchecked {
				#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/exe/AsyncObject.hx"
				return global::verb.exe.Dispatcher.dispatchMethod<T>(classType, methodName, args);
			}
			#line default
		}
		
		
		public override   object __hx_getField(string field, int hash, bool throwErrors, bool isCheck, bool handleProperties){
			unchecked {
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/exe/AsyncObject.hx"
				switch (hash){
					case 1461865842:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/exe/AsyncObject.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("defer") ), ((int) (1461865842) ))) );
					}
					
					
					default:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/exe/AsyncObject.hx"
						return base.__hx_getField(field, hash, throwErrors, isCheck, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_invokeField(string field, int hash, global::Array dynargs){
			unchecked {
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/exe/AsyncObject.hx"
				switch (hash){
					case 1461865842:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/exe/AsyncObject.hx"
						return this.defer<object>(((global::System.Type) (dynargs[0]) ), global::haxe.lang.Runtime.toString(dynargs[1]), ((global::Array) (dynargs[2]) ));
					}
					
					
					default:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/exe/AsyncObject.hx"
						return base.__hx_invokeField(field, hash, dynargs);
					}
					
				}
				
			}
			#line default
		}
		
		
	}
}


