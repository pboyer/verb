
#pragma warning disable 109, 114, 219, 429, 168, 162
namespace promhx{
	public  class PublicStream<T> : global::promhx.Stream<T>, global::promhx.PublicStream {
		public    PublicStream(global::haxe.lang.EmptyObject empty) : base(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) )){
			unchecked {
			}
			#line default
		}
		
		
		public    PublicStream(global::promhx.Deferred<T> def) : base(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) )){
			unchecked {
				#line 7 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/PublicStream.hx"
				global::promhx.PublicStream<object>.__hx_ctor_promhx_PublicStream<T>(this, def);
			}
			#line default
		}
		
		
		public static   void __hx_ctor_promhx_PublicStream<T_c>(global::promhx.PublicStream<T_c> __temp_me29, global::promhx.Deferred<T_c> def){
			unchecked {
				#line 7 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/PublicStream.hx"
				global::promhx.Stream<object>.__hx_ctor_promhx_Stream<T_c>(__temp_me29, ( (( def == default(global::promhx.Deferred<T_c>) )) ? (default(global::promhx.Deferred<T_c>)) : (def) ));
			}
			#line default
		}
		
		
		public static  new object __hx_cast<T_c_c>(global::promhx.PublicStream me){
			unchecked {
				#line 5 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/PublicStream.hx"
				return ( (( me != default(global::promhx.PublicStream) )) ? (me.promhx_PublicStream_cast<T_c_c>()) : (default(global::promhx.PublicStream)) );
			}
			#line default
		}
		
		
		public static   global::promhx.PublicStream<T1> publicstream<T1>(T1 val){
			unchecked {
				#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/PublicStream.hx"
				global::promhx.PublicStream<T1> ps = new global::promhx.PublicStream<T1>(((global::promhx.Deferred<T1>) (default(global::promhx.Deferred<T1>)) ));
				ps.handleResolve(val);
				return ps;
			}
			#line default
		}
		
		
		public static  new object __hx_createEmpty(){
			unchecked {
				#line 5 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/PublicStream.hx"
				return new global::promhx.PublicStream<object>(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) ));
			}
			#line default
		}
		
		
		public static  new object __hx_create(global::Array arr){
			unchecked {
				#line 5 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/PublicStream.hx"
				return new global::promhx.PublicStream<object>(((global::promhx.Deferred<object>) (global::promhx.Deferred<object>.__hx_cast<object>(((global::promhx.Deferred) (arr[0]) ))) ));
			}
			#line default
		}
		
		
		public virtual   object promhx_PublicStream_cast<T_c>(){
			unchecked {
				#line 5 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/PublicStream.hx"
				if (global::haxe.lang.Runtime.eq(typeof(T), typeof(T_c))) {
					#line 5 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/PublicStream.hx"
					return this;
				}
				
				#line 5 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/PublicStream.hx"
				global::promhx.PublicStream<T_c> new_me = new global::promhx.PublicStream<T_c>(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) ));
				#line 5 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/PublicStream.hx"
				{
					#line 5 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/PublicStream.hx"
					object __temp_iterator169 = global::Reflect.fields(this).iterator();
					#line 5 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/PublicStream.hx"
					while (global::haxe.lang.Runtime.toBool(global::haxe.lang.Runtime.callField(__temp_iterator169, "hasNext", 407283053, default(global::Array)))){
						#line 5 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/PublicStream.hx"
						string field = global::haxe.lang.Runtime.toString(global::haxe.lang.Runtime.callField(__temp_iterator169, "next", 1224901875, default(global::Array)));
						#line 5 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/PublicStream.hx"
						switch (field){
							default:
							{
								#line 5 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/PublicStream.hx"
								global::Reflect.setField(new_me, field, ((object) (global::Reflect.field(this, field)) ));
								#line 5 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/PublicStream.hx"
								break;
							}
							
						}
						
					}
					
				}
				
				#line 5 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/PublicStream.hx"
				return new_me;
			}
			#line default
		}
		
		
		public override   object promhx_base_AsyncBase_cast<T_c>(){
			unchecked {
				#line 5 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/PublicStream.hx"
				return this.promhx_PublicStream_cast<T_c>();
			}
			#line default
		}
		
		
		public virtual   object promhx_Stream_cast<T_c>(){
			unchecked {
				#line 5 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/PublicStream.hx"
				return this.promhx_PublicStream_cast<T_c>();
			}
			#line default
		}
		
		
		public   void resolve(T val){
			unchecked {
				#line 9 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/PublicStream.hx"
				this.handleResolve(val);
			}
			#line default
		}
		
		
		public   void throwError(object e){
			unchecked {
				#line 10 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/PublicStream.hx"
				this.handleError(e);
			}
			#line default
		}
		
		
		public   void update(T val){
			unchecked {
				#line 11 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/PublicStream.hx"
				this.handleResolve(val);
			}
			#line default
		}
		
		
		public override   object __hx_getField(string field, int hash, bool throwErrors, bool isCheck, bool handleProperties){
			unchecked {
				#line 5 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/PublicStream.hx"
				switch (hash){
					case 117802505:
					{
						#line 5 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/PublicStream.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("update") ), ((int) (117802505) ))) );
					}
					
					
					case 1860531394:
					{
						#line 5 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/PublicStream.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("throwError") ), ((int) (1860531394) ))) );
					}
					
					
					case 1734349548:
					{
						#line 5 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/PublicStream.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("resolve") ), ((int) (1734349548) ))) );
					}
					
					
					default:
					{
						#line 5 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/PublicStream.hx"
						return base.__hx_getField(field, hash, throwErrors, isCheck, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_invokeField(string field, int hash, global::Array dynargs){
			unchecked {
				#line 5 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/PublicStream.hx"
				switch (hash){
					case 117802505:
					{
						#line 5 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/PublicStream.hx"
						this.update(global::haxe.lang.Runtime.genericCast<T>(dynargs[0]));
						#line 5 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/PublicStream.hx"
						break;
					}
					
					
					case 1860531394:
					{
						#line 5 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/PublicStream.hx"
						this.throwError(dynargs[0]);
						#line 5 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/PublicStream.hx"
						break;
					}
					
					
					case 1734349548:
					{
						#line 5 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/PublicStream.hx"
						this.resolve(global::haxe.lang.Runtime.genericCast<T>(dynargs[0]));
						#line 5 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/PublicStream.hx"
						break;
					}
					
					
					default:
					{
						#line 5 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/PublicStream.hx"
						return base.__hx_invokeField(field, hash, dynargs);
					}
					
				}
				
				#line 5 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/PublicStream.hx"
				return default(object);
			}
			#line default
		}
		
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace promhx{
	public  interface PublicStream : global::haxe.lang.IHxObject, global::promhx.Stream, global::haxe.lang.IGenericObject {
		   object promhx_PublicStream_cast<T_c>();
		
	}
}


