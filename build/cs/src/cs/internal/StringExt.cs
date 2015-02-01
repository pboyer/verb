
#pragma warning disable 109, 114, 219, 429, 168, 162
namespace haxe.lang{
	public  class StringExt {
		public    StringExt(){
			unchecked {
				#line 26 "/usr/lib/haxe/std/cs/internal/StringExt.hx"
				{
				}
				
			}
			#line default
		}
		
		
		public static   string charAt(string me, int index){
			
			if ( ((uint) index) >= me.Length)
				return "";
			else
				return new string(me[index], 1);
	
		}
		
		
		public static   global::haxe.lang.Null<int> charCodeAt(string me, int index){
			
			if ( ((uint) index) >= me.Length)
				return default(haxe.lang.Null<int>);
			else
				return new haxe.lang.Null<int>((int)me[index], true);
	
		}
		
		
		public static   int indexOf(string me, string str, global::haxe.lang.Null<int> startIndex){
			
			uint sIndex = (startIndex.hasValue) ? ((uint) startIndex.@value) : 0;
			if (sIndex >= me.Length)
				return -1;
			return me.IndexOf(str, (int)sIndex);
	
		}
		
		
		public static   int lastIndexOf(string me, string str, global::haxe.lang.Null<int> startIndex){
			
			int sIndex = (startIndex.hasValue) ? (startIndex.@value) : (me.Length - 1);
			if (sIndex >= me.Length)
				sIndex = me.Length - 1;
			else if (sIndex < 0)
				return -1;

			//TestBaseTypes.hx@133 fix
			if (startIndex.hasValue)
			{
				for(int i = sIndex; i >= 0; i--)
				{
					bool found = true;
					for(int j = 0; j < str.Length; j++)
					{
						if(me[i + j] != str[j])
						{
							found = false;
							break;
						}
					}

					if (found)
						return i;
				}

				return -1;
			} else {
				return me.LastIndexOf(str, sIndex);
			}
	
		}
		
		
		public static   global::Array<object> split(string me, string delimiter){
			
			string[] native;
			if (delimiter.Length == 0)
			{
				int len = me.Length;
				native = new string[len];
				for (int i = 0; i < len; i++)
					native[i] = new string(me[i], 1);
			} else {
				native = me.Split(new string[] { delimiter }, System.StringSplitOptions.None);
			}
			return new Array<object>(native);
	
		}
		
		
		public static   string substr(string me, int pos, global::haxe.lang.Null<int> len){
			
			int meLen = me.Length;
			int targetLen = meLen;
			if (len.hasValue)
			{
				targetLen = len.@value;
				if (targetLen == 0)
					return "";
				if( pos != 0 && targetLen < 0 ){
					return "";
				}
			}

			if( pos < 0 ){
				pos = meLen + pos;
				if( pos < 0 ) pos = 0;
			} else if( targetLen < 0 ){
				targetLen = meLen + targetLen - pos;
			}

			if( pos + targetLen > meLen ){
				targetLen = meLen - pos;
			}

			if ( pos < 0 || targetLen <= 0 ) return "";

			return me.Substring(pos, targetLen);
	
		}
		
		
		public static   string substring(string me, int startIndex, global::haxe.lang.Null<int> endIndex){
			
		int endIdx;
		int len = me.Length;
		if ( !endIndex.hasValue ) {
			endIdx = len;
		} else if ( (endIdx = endIndex.@value) < 0 ) {
			endIdx = 0;
		} else if ( endIdx > len ) {
			endIdx = len;
		}

		if ( startIndex < 0 ) {
			startIndex = 0;
		} else if ( startIndex > len ) {
			startIndex = len;
		}

		if ( startIndex > endIdx ) {
			int tmp = startIndex;
			startIndex = endIdx;
			endIdx = tmp;
		}

		return me.Substring(startIndex, endIdx - startIndex);
	
		}
		
		
		public static   string toString(string me){
			unchecked {
				#line 181 "/usr/lib/haxe/std/cs/internal/StringExt.hx"
				return me;
			}
			#line default
		}
		
		
		public static   string toLowerCase(string me){
			
			return me.ToLower();
	
		}
		
		
		public static   string toUpperCase(string me){
			
			return me.ToUpper();
	
		}
		
		
		public static   string toNativeString(string me){
			unchecked {
				#line 202 "/usr/lib/haxe/std/cs/internal/StringExt.hx"
				return me;
			}
			#line default
		}
		
		
		public static   string fromCharCode(int code){
			
			return new string( (char) code, 1 );
	
		}
		
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace haxe.lang{
	public  class StringRefl {
		static StringRefl() {
			#line 216 "/usr/lib/haxe/std/cs/internal/StringExt.hx"
			global::haxe.lang.StringRefl.fields = new global::Array<object>(new object[]{"length", "toUpperCase", "toLowerCase", "charAt", "charCodeAt", "indexOf", "lastIndexOf", "split", "substr", "substring"});
		}
		public    StringRefl(){
			unchecked {
				#line 214 "/usr/lib/haxe/std/cs/internal/StringExt.hx"
				{
				}
				
			}
			#line default
		}
		
		
		public static  global::Array<object> fields;
		
		public static   object handleGetField(string str, string f, bool throwErrors){
			unchecked {
				#line 220 "/usr/lib/haxe/std/cs/internal/StringExt.hx"
				switch (f){
					case "length":
					{
						#line 222 "/usr/lib/haxe/std/cs/internal/StringExt.hx"
						return str.Length;
					}
					
					
					case "toUpperCase":case "toLowerCase":case "charAt":case "charCodeAt":case "indexOf":case "lastIndexOf":case "split":case "substr":case "substring":
					{
						#line 224 "/usr/lib/haxe/std/cs/internal/StringExt.hx"
						return new global::haxe.lang.Closure(((object) (str) ), ((string) (f) ), ((int) (0) ));
					}
					
					
					default:
					{
						#line 226 "/usr/lib/haxe/std/cs/internal/StringExt.hx"
						if (throwErrors) {
							#line 227 "/usr/lib/haxe/std/cs/internal/StringExt.hx"
							throw global::haxe.lang.HaxeException.wrap(global::haxe.lang.Runtime.concat(global::haxe.lang.Runtime.concat("Field not found: \'", f), "\' in String"));
						}
						 else {
							#line 229 "/usr/lib/haxe/std/cs/internal/StringExt.hx"
							return default(object);
						}
						
					}
					
				}
				
			}
			#line default
		}
		
		
		public static   object handleCallField(string str, string f, global::Array args){
			unchecked {
				#line 235 "/usr/lib/haxe/std/cs/internal/StringExt.hx"
				global::Array _args = new global::Array<object>(new object[]{str});
				if (( args == default(global::Array) )) {
					#line 237 "/usr/lib/haxe/std/cs/internal/StringExt.hx"
					args = _args;
				}
				 else {
					#line 239 "/usr/lib/haxe/std/cs/internal/StringExt.hx"
					args = ((global::Array) (global::haxe.lang.Runtime.callField(_args, "concat", 1204816148, new global::Array<object>(new object[]{args}))) );
				}
				
				#line 241 "/usr/lib/haxe/std/cs/internal/StringExt.hx"
				return global::haxe.lang.Runtime.slowCallField(typeof(global::haxe.lang.StringExt), f, args);
			}
			#line default
		}
		
		
	}
}


