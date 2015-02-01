
#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core.types{
	public  class Interval<T> : global::haxe.lang.HxObject, global::verb.core.types.Interval {
		public    Interval(global::haxe.lang.EmptyObject empty){
			unchecked {
				#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Interval.hx"
				{
				}
				
			}
			#line default
		}
		
		
		public    Interval(T min, T max){
			unchecked {
				#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Interval.hx"
				global::verb.core.types.Interval<object>.__hx_ctor_verb_core_types_Interval<T>(this, min, max);
			}
			#line default
		}
		
		
		public static   void __hx_ctor_verb_core_types_Interval<T_c>(global::verb.core.types.Interval<T_c> __temp_me86, T_c min, T_c max){
			unchecked {
				#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Interval.hx"
				__temp_me86.min = min;
				__temp_me86.max = max;
			}
			#line default
		}
		
		
		public static   object __hx_cast<T_c_c>(global::verb.core.types.Interval me){
			unchecked {
				#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Interval.hx"
				return ( (( me != default(global::verb.core.types.Interval) )) ? (me.verb_core_types_Interval_cast<T_c_c>()) : (default(global::verb.core.types.Interval)) );
			}
			#line default
		}
		
		
		public static  new object __hx_createEmpty(){
			unchecked {
				#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Interval.hx"
				return new global::verb.core.types.Interval<object>(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) ));
			}
			#line default
		}
		
		
		public static  new object __hx_create(global::Array arr){
			unchecked {
				#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Interval.hx"
				return new global::verb.core.types.Interval<object>(((object) (arr[0]) ), ((object) (arr[1]) ));
			}
			#line default
		}
		
		
		public virtual   object verb_core_types_Interval_cast<T_c>(){
			unchecked {
				#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Interval.hx"
				if (global::haxe.lang.Runtime.eq(typeof(T), typeof(T_c))) {
					#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Interval.hx"
					return this;
				}
				
				#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Interval.hx"
				global::verb.core.types.Interval<T_c> new_me = new global::verb.core.types.Interval<T_c>(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) ));
				#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Interval.hx"
				{
					#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Interval.hx"
					object __temp_iterator175 = global::Reflect.fields(this).iterator();
					#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Interval.hx"
					while (global::haxe.lang.Runtime.toBool(global::haxe.lang.Runtime.callField(__temp_iterator175, "hasNext", 407283053, default(global::Array)))){
						#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Interval.hx"
						string field = global::haxe.lang.Runtime.toString(global::haxe.lang.Runtime.callField(__temp_iterator175, "next", 1224901875, default(global::Array)));
						#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Interval.hx"
						switch (field){
							default:
							{
								#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Interval.hx"
								global::Reflect.setField(new_me, field, ((object) (global::Reflect.field(this, field)) ));
								#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Interval.hx"
								break;
							}
							
						}
						
					}
					
				}
				
				#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Interval.hx"
				return new_me;
			}
			#line default
		}
		
		
		public  T min;
		
		public  T max;
		
		public override   double __hx_setField_f(string field, int hash, double @value, bool handleProperties){
			unchecked {
				#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Interval.hx"
				switch (hash){
					case 5442212:
					{
						#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Interval.hx"
						this.max = global::haxe.lang.Runtime.genericCast<T>(((object) (@value) ));
						#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Interval.hx"
						return ((double) (global::haxe.lang.Runtime.toDouble(((object) (@value) ))) );
					}
					
					
					case 5443986:
					{
						#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Interval.hx"
						this.min = global::haxe.lang.Runtime.genericCast<T>(((object) (@value) ));
						#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Interval.hx"
						return ((double) (global::haxe.lang.Runtime.toDouble(((object) (@value) ))) );
					}
					
					
					default:
					{
						#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Interval.hx"
						return base.__hx_setField_f(field, hash, @value, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_setField(string field, int hash, object @value, bool handleProperties){
			unchecked {
				#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Interval.hx"
				switch (hash){
					case 5442212:
					{
						#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Interval.hx"
						this.max = global::haxe.lang.Runtime.genericCast<T>(@value);
						#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Interval.hx"
						return @value;
					}
					
					
					case 5443986:
					{
						#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Interval.hx"
						this.min = global::haxe.lang.Runtime.genericCast<T>(@value);
						#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Interval.hx"
						return @value;
					}
					
					
					default:
					{
						#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Interval.hx"
						return base.__hx_setField(field, hash, @value, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_getField(string field, int hash, bool throwErrors, bool isCheck, bool handleProperties){
			unchecked {
				#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Interval.hx"
				switch (hash){
					case 5442212:
					{
						#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Interval.hx"
						return this.max;
					}
					
					
					case 5443986:
					{
						#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Interval.hx"
						return this.min;
					}
					
					
					default:
					{
						#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Interval.hx"
						return base.__hx_getField(field, hash, throwErrors, isCheck, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   double __hx_getField_f(string field, int hash, bool throwErrors, bool handleProperties){
			unchecked {
				#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Interval.hx"
				switch (hash){
					case 5442212:
					{
						#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Interval.hx"
						return ((double) (global::haxe.lang.Runtime.toDouble(((object) (this.max) ))) );
					}
					
					
					case 5443986:
					{
						#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Interval.hx"
						return ((double) (global::haxe.lang.Runtime.toDouble(((object) (this.min) ))) );
					}
					
					
					default:
					{
						#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Interval.hx"
						return base.__hx_getField_f(field, hash, throwErrors, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   void __hx_getFields(global::Array<object> baseArr){
			unchecked {
				#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Interval.hx"
				baseArr.push("max");
				#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Interval.hx"
				baseArr.push("min");
				#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Interval.hx"
				{
					#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/Interval.hx"
					base.__hx_getFields(baseArr);
				}
				
			}
			#line default
		}
		
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core.types{
	public  interface Interval : global::haxe.lang.IHxObject, global::haxe.lang.IGenericObject {
		   object verb_core_types_Interval_cast<T_c>();
		
	}
}


