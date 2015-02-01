
#pragma warning disable 109, 114, 219, 429, 168, 162
public  class Lambda : global::haxe.lang.HxObject {
	public    Lambda(global::haxe.lang.EmptyObject empty){
		unchecked {
			#line 35 "/usr/lib/haxe/std/Lambda.hx"
			{
			}
			
		}
		#line default
	}
	
	
	public    Lambda(){
		unchecked {
			#line 35 "/usr/lib/haxe/std/Lambda.hx"
			global::Lambda.__hx_ctor__Lambda(this);
		}
		#line default
	}
	
	
	public static   void __hx_ctor__Lambda(global::Lambda __temp_me6){
		unchecked {
			#line 35 "/usr/lib/haxe/std/Lambda.hx"
			{
			}
			
		}
		#line default
	}
	
	
	public static   B fold<A, B>(object it, global::haxe.lang.Function f, B first){
		unchecked {
			#line 180 "/usr/lib/haxe/std/Lambda.hx"
			{
				#line 180 "/usr/lib/haxe/std/Lambda.hx"
				object __temp_iterator143 = ((object) (global::haxe.lang.Runtime.callField(it, "iterator", 328878574, default(global::Array))) );
				#line 180 "/usr/lib/haxe/std/Lambda.hx"
				while (global::haxe.lang.Runtime.toBool(global::haxe.lang.Runtime.callField(__temp_iterator143, "hasNext", 407283053, default(global::Array)))){
					#line 180 "/usr/lib/haxe/std/Lambda.hx"
					A x = global::haxe.lang.Runtime.genericCast<A>(global::haxe.lang.Runtime.callField(__temp_iterator143, "next", 1224901875, default(global::Array)));
					first = global::haxe.lang.Runtime.genericCast<B>(f.__hx_invoke2_o(default(double), x, default(double), first));
				}
				
			}
			
			#line 182 "/usr/lib/haxe/std/Lambda.hx"
			return first;
		}
		#line default
	}
	
	
	public static  new object __hx_createEmpty(){
		unchecked {
			#line 35 "/usr/lib/haxe/std/Lambda.hx"
			return new global::Lambda(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) ));
		}
		#line default
	}
	
	
	public static  new object __hx_create(global::Array arr){
		unchecked {
			#line 35 "/usr/lib/haxe/std/Lambda.hx"
			return new global::Lambda();
		}
		#line default
	}
	
	
}


