
#pragma warning disable 109, 114, 219, 429, 168, 162
public  class StringBuf : global::haxe.lang.HxObject {
	public    StringBuf(global::haxe.lang.EmptyObject empty){
		unchecked {
			#line 23 "/usr/lib/haxe/std/cs/_std/StringBuf.hx"
			{
			}
			
		}
		#line default
	}
	
	
	public    StringBuf(){
		unchecked {
			#line 29 "/usr/lib/haxe/std/cs/_std/StringBuf.hx"
			global::StringBuf.__hx_ctor__StringBuf(this);
		}
		#line default
	}
	
	
	public static   void __hx_ctor__StringBuf(global::StringBuf __temp_me9){
		unchecked {
			#line 30 "/usr/lib/haxe/std/cs/_std/StringBuf.hx"
			__temp_me9.b = new global::System.Text.StringBuilder();
		}
		#line default
	}
	
	
	public static  new object __hx_createEmpty(){
		unchecked {
			#line 23 "/usr/lib/haxe/std/cs/_std/StringBuf.hx"
			return new global::StringBuf(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) ));
		}
		#line default
	}
	
	
	public static  new object __hx_create(global::Array arr){
		unchecked {
			#line 23 "/usr/lib/haxe/std/cs/_std/StringBuf.hx"
			return new global::StringBuf();
		}
		#line default
	}
	
	
	public  global::System.Text.StringBuilder b;
	
	public virtual   string toString(){
		unchecked {
			#line 51 "/usr/lib/haxe/std/cs/_std/StringBuf.hx"
			return this.b.ToString();
		}
		#line default
	}
	
	
	public override   object __hx_setField(string field, int hash, object @value, bool handleProperties){
		unchecked {
			#line 23 "/usr/lib/haxe/std/cs/_std/StringBuf.hx"
			switch (hash){
				case 98:
				{
					#line 23 "/usr/lib/haxe/std/cs/_std/StringBuf.hx"
					this.b = ((global::System.Text.StringBuilder) (@value) );
					#line 23 "/usr/lib/haxe/std/cs/_std/StringBuf.hx"
					return @value;
				}
				
				
				default:
				{
					#line 23 "/usr/lib/haxe/std/cs/_std/StringBuf.hx"
					return base.__hx_setField(field, hash, @value, handleProperties);
				}
				
			}
			
		}
		#line default
	}
	
	
	public override   object __hx_getField(string field, int hash, bool throwErrors, bool isCheck, bool handleProperties){
		unchecked {
			#line 23 "/usr/lib/haxe/std/cs/_std/StringBuf.hx"
			switch (hash){
				case 946786476:
				{
					#line 23 "/usr/lib/haxe/std/cs/_std/StringBuf.hx"
					return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("toString") ), ((int) (946786476) ))) );
				}
				
				
				case 98:
				{
					#line 23 "/usr/lib/haxe/std/cs/_std/StringBuf.hx"
					return this.b;
				}
				
				
				default:
				{
					#line 23 "/usr/lib/haxe/std/cs/_std/StringBuf.hx"
					return base.__hx_getField(field, hash, throwErrors, isCheck, handleProperties);
				}
				
			}
			
		}
		#line default
	}
	
	
	public override   object __hx_invokeField(string field, int hash, global::Array dynargs){
		unchecked {
			#line 23 "/usr/lib/haxe/std/cs/_std/StringBuf.hx"
			switch (hash){
				case 946786476:
				{
					#line 23 "/usr/lib/haxe/std/cs/_std/StringBuf.hx"
					return this.toString();
				}
				
				
				default:
				{
					#line 23 "/usr/lib/haxe/std/cs/_std/StringBuf.hx"
					return base.__hx_invokeField(field, hash, dynargs);
				}
				
			}
			
		}
		#line default
	}
	
	
	public override   void __hx_getFields(global::Array<object> baseArr){
		unchecked {
			#line 23 "/usr/lib/haxe/std/cs/_std/StringBuf.hx"
			baseArr.push("b");
			#line 23 "/usr/lib/haxe/std/cs/_std/StringBuf.hx"
			{
				#line 23 "/usr/lib/haxe/std/cs/_std/StringBuf.hx"
				base.__hx_getFields(baseArr);
			}
			
		}
		#line default
	}
	
	
	public override string ToString(){
		return this.toString();
	}
	
	
}


