
#pragma warning disable 109, 114, 219, 429, 168, 162
namespace promhx.@base{
	public  class EventLoop : global::haxe.lang.HxObject {
		static EventLoop() {
			#line 6 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/EventLoop.hx"
			global::promhx.@base.EventLoop.queue = new global::List<object>();
		}
		public    EventLoop(global::haxe.lang.EmptyObject empty){
			unchecked {
				#line 5 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/EventLoop.hx"
				{
				}
				
			}
			#line default
		}
		
		
		public    EventLoop(){
			unchecked {
				#line 5 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/EventLoop.hx"
				global::promhx.@base.EventLoop.__hx_ctor_promhx_base_EventLoop(this);
			}
			#line default
		}
		
		
		public static   void __hx_ctor_promhx_base_EventLoop(global::promhx.@base.EventLoop __temp_me31){
			unchecked {
				#line 5 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/EventLoop.hx"
				{
				}
				
			}
			#line default
		}
		
		
		public static  global::List<object> queue;
		
		public static  global::haxe.lang.Function nextLoop;
		
		public static   void enqueue(global::haxe.lang.Function eqf){
			unchecked {
				#line 22 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/EventLoop.hx"
				global::promhx.@base.EventLoop.queue.@add(eqf);
				global::promhx.@base.EventLoop.continueOnNextLoop();
			}
			#line default
		}
		
		
		public static   global::haxe.lang.Function set_nextLoop(global::haxe.lang.Function f){
			unchecked {
				#line 26 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/EventLoop.hx"
				if (( global::promhx.@base.EventLoop.nextLoop != default(global::haxe.lang.Function) )) {
					#line 26 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/EventLoop.hx"
					throw global::haxe.lang.HaxeException.wrap("nextLoop has already been set");
				}
				 else {
					#line 27 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/EventLoop.hx"
					global::promhx.@base.EventLoop.nextLoop = f;
				}
				
				#line 28 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/EventLoop.hx"
				return global::promhx.@base.EventLoop.nextLoop;
			}
			#line default
		}
		
		
		public static   bool queueEmpty(){
			unchecked {
				#line 35 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/EventLoop.hx"
				return global::promhx.@base.EventLoop.queue.isEmpty();
			}
			#line default
		}
		
		
		public static   bool finish(global::haxe.lang.Null<int> max_iterations){
			unchecked {
				#line 43 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/EventLoop.hx"
				int __temp_max_iterations30 = ( ( ! (max_iterations.hasValue) ) ? (((int) (1000) )) : (max_iterations.@value) );
				global::haxe.lang.Function fn = default(global::haxe.lang.Function);
				while (( ( __temp_max_iterations30-- > 0 ) && ( (fn = ((global::haxe.lang.Function) (global::promhx.@base.EventLoop.queue.pop().@value) )) != default(global::haxe.lang.Function) ) )){
					#line 46 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/EventLoop.hx"
					fn.__hx_invoke0_o();
				}
				
				#line 48 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/EventLoop.hx"
				return global::promhx.@base.EventLoop.queue.isEmpty();
			}
			#line default
		}
		
		
		public static   void clear(){
			unchecked {
				#line 55 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/EventLoop.hx"
				global::promhx.@base.EventLoop.queue = new global::List<object>();
			}
			#line default
		}
		
		
		public static   void f(){
			unchecked {
				#line 59 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/EventLoop.hx"
				global::haxe.lang.Function fn = ((global::haxe.lang.Function) (global::promhx.@base.EventLoop.queue.pop().@value) );
				if (( fn != default(global::haxe.lang.Function) )) {
					#line 60 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/EventLoop.hx"
					fn.__hx_invoke0_o();
				}
				
				#line 61 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/EventLoop.hx"
				if ( ! (global::promhx.@base.EventLoop.queue.isEmpty()) ) {
					#line 61 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/EventLoop.hx"
					global::promhx.@base.EventLoop.continueOnNextLoop();
				}
				
			}
			#line default
		}
		
		
		public static   void continueOnNextLoop(){
			unchecked {
				#line 65 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/EventLoop.hx"
				if (( global::promhx.@base.EventLoop.nextLoop != default(global::haxe.lang.Function) )) {
					#line 65 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/EventLoop.hx"
					global::promhx.@base.EventLoop.nextLoop.__hx_invoke1_o(default(double), ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (typeof(global::promhx.@base.EventLoop)) ), ((string) ("f") ), ((int) (102) ))) ));
				}
				 else {
					#line 77 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/EventLoop.hx"
					global::promhx.@base.EventLoop.f();
				}
				
			}
			#line default
		}
		
		
		public static  new object __hx_createEmpty(){
			unchecked {
				#line 5 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/EventLoop.hx"
				return new global::promhx.@base.EventLoop(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) ));
			}
			#line default
		}
		
		
		public static  new object __hx_create(global::Array arr){
			unchecked {
				#line 5 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/EventLoop.hx"
				return new global::promhx.@base.EventLoop();
			}
			#line default
		}
		
		
	}
}


