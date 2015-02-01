
#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core.types{
	public  class Pair<T1, T2> : global::haxe.lang.HxObject, global::verb.core.types.Pair {
		public    Pair(global::haxe.lang.EmptyObject empty){
			unchecked {
				#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Pair.hx"
				{
				}
				
			}
			#line default
		}
		
		
		public    Pair(T1 item1, T2 item2){
			unchecked {
				#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Pair.hx"
				global::verb.core.types.Pair<object, object>.__hx_ctor_verb_core_types_Pair<T1, T2>(this, item1, item2);
			}
			#line default
		}
		
		
		public static   void __hx_ctor_verb_core_types_Pair<T1_c, T2_c>(global::verb.core.types.Pair<T1_c, T2_c> __temp_me97, T1_c item1, T2_c item2){
			unchecked {
				#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Pair.hx"
				__temp_me97.item0 = item1;
				__temp_me97.item1 = item2;
			}
			#line default
		}
		
		
		public static   object __hx_cast<T1_c_c, T2_c_c>(global::verb.core.types.Pair me){
			unchecked {
				#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Pair.hx"
				return ( (( me != default(global::verb.core.types.Pair) )) ? (me.verb_core_types_Pair_cast<T1_c_c, T2_c_c>()) : (default(global::verb.core.types.Pair)) );
			}
			#line default
		}
		
		
		public static  new object __hx_createEmpty(){
			unchecked {
				#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Pair.hx"
				return new global::verb.core.types.Pair<object, object>(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) ));
			}
			#line default
		}
		
		
		public static  new object __hx_create(global::Array arr){
			unchecked {
				#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Pair.hx"
				return new global::verb.core.types.Pair<object, object>(((object) (arr[0]) ), ((object) (arr[1]) ));
			}
			#line default
		}
		
		
		public virtual   object verb_core_types_Pair_cast<T1_c, T2_c>(){
			unchecked {
				#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Pair.hx"
				if (( global::haxe.lang.Runtime.eq(typeof(T1), typeof(T1_c)) && global::haxe.lang.Runtime.eq(typeof(T2), typeof(T2_c)) )) {
					#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Pair.hx"
					return this;
				}
				
				#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Pair.hx"
				global::verb.core.types.Pair<T1_c, T2_c> new_me = new global::verb.core.types.Pair<T1_c, T2_c>(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) ));
				#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Pair.hx"
				{
					#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Pair.hx"
					object __temp_iterator176 = global::Reflect.fields(this).iterator();
					#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Pair.hx"
					while (global::haxe.lang.Runtime.toBool(global::haxe.lang.Runtime.callField(__temp_iterator176, "hasNext", 407283053, default(global::Array)))){
						#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Pair.hx"
						string field = global::haxe.lang.Runtime.toString(global::haxe.lang.Runtime.callField(__temp_iterator176, "next", 1224901875, default(global::Array)));
						#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Pair.hx"
						switch (field){
							default:
							{
								#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Pair.hx"
								global::Reflect.setField(new_me, field, ((object) (global::Reflect.field(this, field)) ));
								#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Pair.hx"
								break;
							}
							
						}
						
					}
					
				}
				
				#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Pair.hx"
				return new_me;
			}
			#line default
		}
		
		
		public  T1 item0;
		
		public  T2 item1;
		
		public override   double __hx_setField_f(string field, int hash, double @value, bool handleProperties){
			unchecked {
				#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Pair.hx"
				switch (hash){
					case 1108126654:
					{
						#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Pair.hx"
						this.item1 = global::haxe.lang.Runtime.genericCast<T2>(((object) (@value) ));
						#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Pair.hx"
						return ((double) (global::haxe.lang.Runtime.toDouble(((object) (@value) ))) );
					}
					
					
					case 1108126653:
					{
						#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Pair.hx"
						this.item0 = global::haxe.lang.Runtime.genericCast<T1>(((object) (@value) ));
						#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Pair.hx"
						return ((double) (global::haxe.lang.Runtime.toDouble(((object) (@value) ))) );
					}
					
					
					default:
					{
						#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Pair.hx"
						return base.__hx_setField_f(field, hash, @value, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_setField(string field, int hash, object @value, bool handleProperties){
			unchecked {
				#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Pair.hx"
				switch (hash){
					case 1108126654:
					{
						#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Pair.hx"
						this.item1 = global::haxe.lang.Runtime.genericCast<T2>(@value);
						#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Pair.hx"
						return @value;
					}
					
					
					case 1108126653:
					{
						#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Pair.hx"
						this.item0 = global::haxe.lang.Runtime.genericCast<T1>(@value);
						#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Pair.hx"
						return @value;
					}
					
					
					default:
					{
						#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Pair.hx"
						return base.__hx_setField(field, hash, @value, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_getField(string field, int hash, bool throwErrors, bool isCheck, bool handleProperties){
			unchecked {
				#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Pair.hx"
				switch (hash){
					case 1108126654:
					{
						#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Pair.hx"
						return this.item1;
					}
					
					
					case 1108126653:
					{
						#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Pair.hx"
						return this.item0;
					}
					
					
					default:
					{
						#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Pair.hx"
						return base.__hx_getField(field, hash, throwErrors, isCheck, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   double __hx_getField_f(string field, int hash, bool throwErrors, bool handleProperties){
			unchecked {
				#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Pair.hx"
				switch (hash){
					case 1108126654:
					{
						#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Pair.hx"
						return ((double) (global::haxe.lang.Runtime.toDouble(((object) (this.item1) ))) );
					}
					
					
					case 1108126653:
					{
						#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Pair.hx"
						return ((double) (global::haxe.lang.Runtime.toDouble(((object) (this.item0) ))) );
					}
					
					
					default:
					{
						#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Pair.hx"
						return base.__hx_getField_f(field, hash, throwErrors, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   void __hx_getFields(global::Array<object> baseArr){
			unchecked {
				#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Pair.hx"
				baseArr.push("item1");
				#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Pair.hx"
				baseArr.push("item0");
				#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Pair.hx"
				{
					#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Pair.hx"
					base.__hx_getFields(baseArr);
				}
				
			}
			#line default
		}
		
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core.types{
	public  interface Pair : global::haxe.lang.IHxObject, global::haxe.lang.IGenericObject {
		   object verb_core_types_Pair_cast<T1_c, T2_c>();
		
	}
}


