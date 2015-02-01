
#pragma warning disable 109, 114, 219, 429, 168, 162
namespace haxe.lang{
	public  class Exceptions {
		public    Exceptions(){
			unchecked {
				#line 25 "/usr/lib/haxe/std/cs/internal/Exceptions.hx"
				{
				}
				
			}
			#line default
		}
		
		
		[System.ThreadStaticAttribute]
		public static  global::System.Exception exception;
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace haxe.lang{
	public  class HaxeException : global::System.Exception {
		public    HaxeException(object obj) : base(){
			unchecked {
				#line 41 "/usr/lib/haxe/std/cs/internal/Exceptions.hx"
				if (( obj is global::haxe.lang.HaxeException )) {
					#line 43 "/usr/lib/haxe/std/cs/internal/Exceptions.hx"
					global::haxe.lang.HaxeException _obj = ((global::haxe.lang.HaxeException) (obj) );
					obj = _obj.getObject();
				}
				
				#line 46 "/usr/lib/haxe/std/cs/internal/Exceptions.hx"
				this.obj = obj;
			}
			#line default
		}
		
		
		public static   global::System.Exception wrap(object obj){
			unchecked {
				#line 61 "/usr/lib/haxe/std/cs/internal/Exceptions.hx"
				if (( obj is global::System.Exception )) {
					#line 61 "/usr/lib/haxe/std/cs/internal/Exceptions.hx"
					return ((global::System.Exception) (obj) );
				}
				
				#line 63 "/usr/lib/haxe/std/cs/internal/Exceptions.hx"
				return new global::haxe.lang.HaxeException(((object) (obj) ));
			}
			#line default
		}
		
		
		public  object obj;
		
		public virtual   object getObject(){
			unchecked {
				#line 51 "/usr/lib/haxe/std/cs/internal/Exceptions.hx"
				return this.obj;
			}
			#line default
		}
		
		
		public virtual   string toString(){
			unchecked {
				#line 56 "/usr/lib/haxe/std/cs/internal/Exceptions.hx"
				return global::haxe.lang.Runtime.concat("Haxe Exception: ", global::Std.@string(this.obj));
			}
			#line default
		}
		
		
		public override string ToString(){
			return this.toString();
		}
		
		
	}
}


