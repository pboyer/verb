
#pragma warning disable 109, 114, 219, 429, 168, 162
namespace promhx{
	public  class Deferred<T> : global::promhx.@base.AsyncBase<T>, global::promhx.Deferred {
		public    Deferred(global::haxe.lang.EmptyObject empty) : base(global::haxe.lang.EmptyObject.EMPTY){
			unchecked {
			}
			#line default
		}
		
		
		public    Deferred() : base(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) )){
			unchecked {
				#line 7 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Deferred.hx"
				global::promhx.Deferred<object>.__hx_ctor_promhx_Deferred<T>(this);
			}
			#line default
		}
		
		
		public static   void __hx_ctor_promhx_Deferred<T_c>(global::promhx.Deferred<T_c> __temp_me26){
			unchecked {
				#line 7 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Deferred.hx"
				global::promhx.@base.AsyncBase<object>.__hx_ctor_promhx_base_AsyncBase<T_c>(__temp_me26, default(global::promhx.Deferred<T_c>));
			}
			#line default
		}
		
		
		public static  new object __hx_cast<T_c_c>(global::promhx.Deferred me){
			unchecked {
				#line 5 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Deferred.hx"
				return ( (( me != default(global::promhx.Deferred) )) ? (me.promhx_Deferred_cast<T_c_c>()) : (default(global::promhx.Deferred)) );
			}
			#line default
		}
		
		
		public static  new object __hx_createEmpty(){
			unchecked {
				#line 5 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Deferred.hx"
				return new global::promhx.Deferred<object>(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) ));
			}
			#line default
		}
		
		
		public static  new object __hx_create(global::Array arr){
			unchecked {
				#line 5 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Deferred.hx"
				return new global::promhx.Deferred<object>();
			}
			#line default
		}
		
		
		public virtual   object promhx_Deferred_cast<T_c>(){
			unchecked {
				#line 5 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Deferred.hx"
				if (global::haxe.lang.Runtime.eq(typeof(T), typeof(T_c))) {
					#line 5 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Deferred.hx"
					return this;
				}
				
				#line 5 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Deferred.hx"
				global::promhx.Deferred<T_c> new_me = new global::promhx.Deferred<T_c>(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) ));
				#line 5 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Deferred.hx"
				{
					#line 5 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Deferred.hx"
					object __temp_iterator155 = global::Reflect.fields(this).iterator();
					#line 5 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Deferred.hx"
					while (global::haxe.lang.Runtime.toBool(global::haxe.lang.Runtime.callField(__temp_iterator155, "hasNext", 407283053, default(global::Array)))){
						#line 5 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Deferred.hx"
						string field = global::haxe.lang.Runtime.toString(global::haxe.lang.Runtime.callField(__temp_iterator155, "next", 1224901875, default(global::Array)));
						#line 5 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Deferred.hx"
						switch (field){
							default:
							{
								#line 5 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Deferred.hx"
								global::Reflect.setField(new_me, field, ((object) (global::Reflect.field(this, field)) ));
								#line 5 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Deferred.hx"
								break;
							}
							
						}
						
					}
					
				}
				
				#line 5 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Deferred.hx"
				return new_me;
			}
			#line default
		}
		
		
		public virtual   object promhx_base_AsyncBase_cast<T_c>(){
			unchecked {
				#line 5 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Deferred.hx"
				return this.promhx_Deferred_cast<T_c>();
			}
			#line default
		}
		
		
		public virtual   void resolve(T val){
			unchecked {
				#line 12 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Deferred.hx"
				this.handleResolve(val);
			}
			#line default
		}
		
		
		public   void throwError(object e){
			unchecked {
				#line 14 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Deferred.hx"
				this.handleError(e);
			}
			#line default
		}
		
		
		public virtual   global::promhx.Promise<T> promise(){
			unchecked {
				#line 20 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Deferred.hx"
				return new global::promhx.Promise<T>(((global::promhx.Deferred<T>) (this) ));
			}
			#line default
		}
		
		
		public virtual   global::promhx.Stream<T> stream(){
			unchecked {
				#line 27 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Deferred.hx"
				return new global::promhx.Stream<T>(((global::promhx.Deferred<T>) (this) ));
			}
			#line default
		}
		
		
		public virtual   global::promhx.PublicStream<T> publicStream(){
			unchecked {
				#line 34 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Deferred.hx"
				return new global::promhx.PublicStream<T>(((global::promhx.Deferred<T>) (this) ));
			}
			#line default
		}
		
		
		public override   object __hx_getField(string field, int hash, bool throwErrors, bool isCheck, bool handleProperties){
			unchecked {
				#line 5 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Deferred.hx"
				switch (hash){
					case 335572489:
					{
						#line 5 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Deferred.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("publicStream") ), ((int) (335572489) ))) );
					}
					
					
					case 288167040:
					{
						#line 5 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Deferred.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("stream") ), ((int) (288167040) ))) );
					}
					
					
					case 2011811227:
					{
						#line 5 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Deferred.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("promise") ), ((int) (2011811227) ))) );
					}
					
					
					case 1860531394:
					{
						#line 5 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Deferred.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("throwError") ), ((int) (1860531394) ))) );
					}
					
					
					case 1734349548:
					{
						#line 5 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Deferred.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("resolve") ), ((int) (1734349548) ))) );
					}
					
					
					default:
					{
						#line 5 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Deferred.hx"
						return base.__hx_getField(field, hash, throwErrors, isCheck, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_invokeField(string field, int hash, global::Array dynargs){
			unchecked {
				#line 5 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Deferred.hx"
				switch (hash){
					case 335572489:
					{
						#line 5 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Deferred.hx"
						return this.publicStream();
					}
					
					
					case 288167040:
					{
						#line 5 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Deferred.hx"
						return this.stream();
					}
					
					
					case 2011811227:
					{
						#line 5 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Deferred.hx"
						return this.promise();
					}
					
					
					case 1860531394:
					{
						#line 5 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Deferred.hx"
						this.throwError(dynargs[0]);
						#line 5 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Deferred.hx"
						break;
					}
					
					
					case 1734349548:
					{
						#line 5 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Deferred.hx"
						this.resolve(global::haxe.lang.Runtime.genericCast<T>(dynargs[0]));
						#line 5 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Deferred.hx"
						break;
					}
					
					
					default:
					{
						#line 5 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Deferred.hx"
						return base.__hx_invokeField(field, hash, dynargs);
					}
					
				}
				
				#line 5 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Deferred.hx"
				return default(object);
			}
			#line default
		}
		
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace promhx{
	public  interface Deferred : global::haxe.lang.IHxObject, global::promhx.@base.AsyncBase, global::haxe.lang.IGenericObject {
		   object promhx_Deferred_cast<T_c>();
		
	}
}


