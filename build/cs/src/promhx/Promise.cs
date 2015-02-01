
#pragma warning disable 109, 114, 219, 429, 168, 162
namespace promhx{
	public  class Promise<T> : global::promhx.@base.AsyncBase<T>, global::promhx.Promise {
		public    Promise(global::haxe.lang.EmptyObject empty) : base(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) )){
			unchecked {
			}
			#line default
		}
		
		
		public    Promise(global::promhx.Deferred<T> d) : base(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) )){
			unchecked {
				#line 16 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
				global::promhx.Promise<object>.__hx_ctor_promhx_Promise<T>(this, d);
			}
			#line default
		}
		
		
		public static   void __hx_ctor_promhx_Promise<T_c>(global::promhx.Promise<T_c> __temp_me27, global::promhx.Deferred<T_c> d){
			unchecked {
				#line 16 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
				global::promhx.@base.AsyncBase<object>.__hx_ctor_promhx_base_AsyncBase<T_c>(__temp_me27, ( (( d == default(global::promhx.Deferred<T_c>) )) ? (default(global::promhx.Deferred<T_c>)) : (d) ));
				__temp_me27._rejected = false;
			}
			#line default
		}
		
		
		public static  new object __hx_cast<T_c_c>(global::promhx.Promise me){
			unchecked {
				#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
				return ( (( me != default(global::promhx.Promise) )) ? (me.promhx_Promise_cast<T_c_c>()) : (default(global::promhx.Promise)) );
			}
			#line default
		}
		
		
		public static   global::promhx.Promise<object> whenAll<T1>(object itb){
			unchecked {
				#line 81 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
				global::promhx.Promise<object> ret = new global::promhx.Promise<object>(((global::promhx.Deferred<object>) (default(global::promhx.Deferred<object>)) ));
				{
					#line 82 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
					global::Array<object> all = new global::Array<object>(new object[]{itb});
					#line 82 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
					global::Array<object> next = new global::Array<object>(new object[]{ret});
					#line 82 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
					global::haxe.lang.Function cthen = new global::promhx.Promise_whenAll_82__Fun_0<T1>(((global::Array<object>) (all) ), ((global::Array<object>) (next) ));
					#line 82 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
					{
						#line 82 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
						object __temp_iterator158 = ((object) (global::haxe.lang.Runtime.callField(all[0], "iterator", 328878574, default(global::Array))) );
						#line 82 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
						while (global::haxe.lang.Runtime.toBool(global::haxe.lang.Runtime.callField(__temp_iterator158, "hasNext", 407283053, default(global::Array)))){
							#line 82 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
							global::promhx.@base.AsyncBase<T1> a1 = ((global::promhx.@base.AsyncBase<T1>) (global::promhx.@base.AsyncBase<object>.__hx_cast<T1>(((global::promhx.@base.AsyncBase) (global::haxe.lang.Runtime.callField(__temp_iterator158, "next", 1224901875, default(global::Array))) ))) );
							#line 82 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
							object __temp_stmt214 = default(object);
							#line 82 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
							{
								#line 82 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
								global::promhx.@base.AsyncBase<object> __temp_odecl212 = ((global::promhx.@base.AsyncBase<object>) (global::promhx.@base.AsyncBase<object>.__hx_cast<object>(((global::promhx.@base.AsyncBase) (next[0]) ))) );
								#line 82 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
								global::haxe.lang.Function __temp_odecl213 = default(global::haxe.lang.Function);
								#line 82 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
								{
									#line 82 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
									global::Array<object> f = new global::Array<object>(new object[]{cthen});
									#line 82 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
									global::Array<object> __temp_stmt215 = default(global::Array<object>);
									#line 82 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
									{
										#line 82 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
										global::Array<object> _g1 = new global::Array<object>(new object[]{});
										#line 82 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
										{
											#line 82 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
											object __temp_iterator159 = ((object) (global::haxe.lang.Runtime.callField(all[0], "iterator", 328878574, default(global::Array))) );
											#line 82 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
											while (global::haxe.lang.Runtime.toBool(global::haxe.lang.Runtime.callField(__temp_iterator159, "hasNext", 407283053, default(global::Array)))){
												#line 82 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
												global::promhx.@base.AsyncBase<T1> a2 = ((global::promhx.@base.AsyncBase<T1>) (global::promhx.@base.AsyncBase<object>.__hx_cast<T1>(((global::promhx.@base.AsyncBase) (global::haxe.lang.Runtime.callField(__temp_iterator159, "next", 1224901875, default(global::Array))) ))) );
												#line 82 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
												if (( a2 != a1 )) {
													#line 82 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
													_g1.push(a2);
												}
												
											}
											
										}
										
										#line 82 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
										__temp_stmt215 = _g1;
									}
									
									#line 82 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
									global::Array<object> a11 = new global::Array<object>(new object[]{__temp_stmt215});
									#line 82 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
									global::Array<object> a21 = new global::Array<object>(new object[]{a1});
									#line 82 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
									__temp_odecl213 = new global::promhx.Promise_whenAll_82__Fun<T1>(((global::Array<object>) (a21) ), ((global::Array<object>) (f) ), ((global::Array<object>) (a11) ));
								}
								
								#line 82 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
								__temp_stmt214 = new global::haxe.lang.DynamicObject(new global::Array<int>(new int[]{641597244, 1963057964}), new global::Array<object>(new object[]{__temp_odecl212, __temp_odecl213}), new global::Array<int>(new int[]{}), new global::Array<double>(new double[]{}));
							}
							
							#line 82 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
							a1._update.push(__temp_stmt214);
						}
						
					}
					
					#line 82 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
					if (global::promhx.@base.AsyncBase<object>.allFulfilled(all[0])) {
						#line 82 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
						global::Array<T1> __temp_stmt216 = default(global::Array<T1>);
						#line 82 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
						{
							#line 82 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
							global::Array<T1> _g2 = new global::Array<T1>(new T1[]{});
							#line 82 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
							{
								#line 82 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
								object __temp_iterator160 = ((object) (global::haxe.lang.Runtime.callField(all[0], "iterator", 328878574, default(global::Array))) );
								#line 82 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
								while (global::haxe.lang.Runtime.toBool(global::haxe.lang.Runtime.callField(__temp_iterator160, "hasNext", 407283053, default(global::Array)))){
									#line 82 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
									global::promhx.@base.AsyncBase<T1> a3 = ((global::promhx.@base.AsyncBase<T1>) (global::promhx.@base.AsyncBase<object>.__hx_cast<T1>(((global::promhx.@base.AsyncBase) (global::haxe.lang.Runtime.callField(__temp_iterator160, "next", 1224901875, default(global::Array))) ))) );
									#line 82 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
									_g2.push(a3._val);
								}
								
							}
							
							#line 82 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
							__temp_stmt216 = _g2;
						}
						
						#line 82 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
						((global::promhx.@base.AsyncBase<object>) (global::promhx.@base.AsyncBase<object>.__hx_cast<object>(((global::promhx.@base.AsyncBase) (next[0]) ))) ).handleResolve(__temp_stmt216);
					}
					
				}
				
				#line 83 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
				return ret;
			}
			#line default
		}
		
		
		public static   global::promhx.Promise<T2> promise<T2>(T2 _val){
			unchecked {
				#line 146 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
				global::promhx.Promise<T2> ret = new global::promhx.Promise<T2>(((global::promhx.Deferred<T2>) (default(global::promhx.Deferred<T2>)) ));
				ret.handleResolve(_val);
				return ret;
			}
			#line default
		}
		
		
		public static  new object __hx_createEmpty(){
			unchecked {
				#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
				return new global::promhx.Promise<object>(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) ));
			}
			#line default
		}
		
		
		public static  new object __hx_create(global::Array arr){
			unchecked {
				#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
				return new global::promhx.Promise<object>(((global::promhx.Deferred<object>) (global::promhx.Deferred<object>.__hx_cast<object>(((global::promhx.Deferred) (arr[0]) ))) ));
			}
			#line default
		}
		
		
		public virtual   object promhx_Promise_cast<T_c>(){
			unchecked {
				#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
				if (global::haxe.lang.Runtime.eq(typeof(T), typeof(T_c))) {
					#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
					return this;
				}
				
				#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
				global::promhx.Promise<T_c> new_me = new global::promhx.Promise<T_c>(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) ));
				#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
				{
					#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
					object __temp_iterator156 = global::Reflect.fields(this).iterator();
					#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
					while (global::haxe.lang.Runtime.toBool(global::haxe.lang.Runtime.callField(__temp_iterator156, "hasNext", 407283053, default(global::Array)))){
						#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
						string field = global::haxe.lang.Runtime.toString(global::haxe.lang.Runtime.callField(__temp_iterator156, "next", 1224901875, default(global::Array)));
						#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
						switch (field){
							default:
							{
								#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
								global::Reflect.setField(new_me, field, ((object) (global::Reflect.field(this, field)) ));
								#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
								break;
							}
							
						}
						
					}
					
				}
				
				#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
				return new_me;
			}
			#line default
		}
		
		
		public virtual   object promhx_base_AsyncBase_cast<T_c>(){
			unchecked {
				#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
				return this.promhx_Promise_cast<T_c>();
			}
			#line default
		}
		
		
		public  bool _rejected;
		
		public   bool isRejected(){
			unchecked {
				#line 65 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
				return this._rejected;
			}
			#line default
		}
		
		
		public virtual   void reject(object e){
			unchecked {
				#line 72 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
				this._rejected = true;
				this.handleError(e);
			}
			#line default
		}
		
		
		public override   void handleResolve(T val){
			unchecked {
				#line 90 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
				if (this._resolved) {
					#line 91 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
					string msg = "Promise has already been resolved";
					throw global::haxe.lang.HaxeException.wrap(global::promhx.error.PromiseError.AlreadyResolved(msg));
				}
				
				#line 94 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
				this._resolve(val);
			}
			#line default
		}
		
		
		public override   global::promhx.@base.AsyncBase<A> then<A>(global::haxe.lang.Function f){
			unchecked {
				#line 101 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
				global::promhx.Promise<A> ret = new global::promhx.Promise<A>(((global::promhx.Deferred<A>) (default(global::promhx.Deferred<A>)) ));
				{
					#line 102 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
					global::Array<object> next = new global::Array<object>(new object[]{ret});
					#line 102 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
					global::Array<object> f1 = new global::Array<object>(new object[]{f});
					#line 102 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
					object __temp_stmt207 = default(object);
					#line 102 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
					{
						#line 102 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
						global::promhx.@base.AsyncBase<A> __temp_odecl205 = ((global::promhx.@base.AsyncBase<A>) (global::promhx.@base.AsyncBase<object>.__hx_cast<A>(((global::promhx.@base.AsyncBase) (next[0]) ))) );
						#line 102 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
						global::haxe.lang.Function __temp_odecl206 = new global::promhx.Promise_then_102__Fun<A, T>(((global::Array<object>) (f1) ), ((global::Array<object>) (next) ));
						#line 102 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
						__temp_stmt207 = new global::haxe.lang.DynamicObject(new global::Array<int>(new int[]{641597244, 1963057964}), new global::Array<object>(new object[]{__temp_odecl205, __temp_odecl206}), new global::Array<int>(new int[]{}), new global::Array<double>(new double[]{}));
					}
					
					#line 102 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
					this._update.push(__temp_stmt207);
					#line 102 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
					global::promhx.@base.AsyncBase<object>.immediateLinkUpdate<T, A>(this, ((global::promhx.@base.AsyncBase<A>) (global::promhx.@base.AsyncBase<object>.__hx_cast<A>(((global::promhx.@base.AsyncBase) (next[0]) ))) ), ((global::haxe.lang.Function) (f1[0]) ));
				}
				
				#line 103 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
				return ret;
			}
			#line default
		}
		
		
		public override   void unlink(global::promhx.@base.AsyncBase to){
			unchecked {
				#line 106 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
				global::Array<object> to1 = new global::Array<object>(new object[]{to});
				#line 106 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
				global::Array<object> _g = new global::Array<object>(new object[]{this});
				{
					#line 107 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
					global::promhx.@base.EventLoop.queue.@add(new global::promhx.Promise_unlink_107__Fun<T>(((global::Array<object>) (to1) ), ((global::Array<object>) (_g) )));
					#line 107 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
					global::promhx.@base.EventLoop.continueOnNextLoop();
				}
				
			}
			#line default
		}
		
		
		public override   void handleError(object error){
			unchecked {
				#line 119 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
				this._rejected = true;
				this._handleError(error);
			}
			#line default
		}
		
		
		public virtual   global::promhx.Promise<A> pipe<A>(global::haxe.lang.Function f){
			unchecked {
				#line 124 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
				global::promhx.Promise<A> ret = new global::promhx.Promise<A>(((global::promhx.Deferred<A>) (default(global::promhx.Deferred<A>)) ));
				{
					#line 125 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
					global::Array<object> ret1 = new global::Array<object>(new object[]{ret});
					#line 125 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
					global::Array<object> f1 = new global::Array<object>(new object[]{f});
					#line 125 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
					global::Array<bool> linked = new global::Array<bool>(new bool[]{false});
					#line 125 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
					global::haxe.lang.Function linkf = new global::promhx.Promise_pipe_125__Fun<A, T>(((global::Array<object>) (ret1) ), ((global::Array<object>) (f1) ), ((global::Array<bool>) (linked) ));
					#line 125 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
					object __temp_stmt211 = default(object);
					#line 125 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
					{
						#line 125 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
						global::promhx.@base.AsyncBase<A> __temp_odecl210 = ((global::promhx.@base.AsyncBase<A>) (global::promhx.@base.AsyncBase<object>.__hx_cast<A>(((global::promhx.@base.AsyncBase) (ret1[0]) ))) );
						#line 125 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
						__temp_stmt211 = new global::haxe.lang.DynamicObject(new global::Array<int>(new int[]{641597244, 1963057964}), new global::Array<object>(new object[]{__temp_odecl210, linkf}), new global::Array<int>(new int[]{}), new global::Array<double>(new double[]{}));
					}
					
					#line 125 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
					this._update.push(__temp_stmt211);
					#line 125 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
					if (( this._resolved &&  ! (this._pending)  )) {
						#line 125 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
						try {
							#line 125 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
							linkf.__hx_invoke1_o(default(double), this._val);
						}
						catch (global::System.Exception __temp_catchallException208){
							#line 125 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
							global::haxe.lang.Exceptions.exception = __temp_catchallException208;
							#line 125 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
							object __temp_catchall209 = __temp_catchallException208;
							#line 125 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
							if (( __temp_catchall209 is global::haxe.lang.HaxeException )) {
								#line 125 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
								__temp_catchall209 = ((global::haxe.lang.HaxeException) (__temp_catchallException208) ).obj;
							}
							
							#line 125 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
							{
								#line 125 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
								object e = __temp_catchall209;
								#line 125 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
								((global::promhx.@base.AsyncBase<A>) (global::promhx.@base.AsyncBase<object>.__hx_cast<A>(((global::promhx.@base.AsyncBase) (ret1[0]) ))) ).handleError(e);
							}
							
						}
						
						
					}
					
				}
				
				#line 126 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
				return ret;
			}
			#line default
		}
		
		
		public virtual   global::promhx.Promise<T> errorPipe(global::haxe.lang.Function f){
			unchecked {
				#line 132 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
				global::Array<object> f1 = new global::Array<object>(new object[]{f});
				global::Array<object> ret = new global::Array<object>(new object[]{new global::promhx.Promise<T>(((global::promhx.Deferred<T>) (default(global::promhx.Deferred<T>)) ))});
				this.catchError(new global::promhx.Promise_errorPipe_134__Fun<T>(((global::Array<object>) (ret) ), ((global::Array<object>) (f1) )));
				#line 138 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
				global::promhx.Promise<object>.__hx_cast<object>(((global::promhx.Promise) (this.then<object>(((global::haxe.lang.Function) (new global::haxe.lang.Closure(((global::promhx.Promise<T>) (global::promhx.Promise<object>.__hx_cast<T>(((global::promhx.Promise) (ret[0]) ))) ), ((string) ("_resolve") ), ((int) (555248749) ))) ))) ));
				return ((global::promhx.Promise<T>) (global::promhx.Promise<object>.__hx_cast<T>(((global::promhx.Promise) (ret[0]) ))) );
			}
			#line default
		}
		
		
		public override   object __hx_setField(string field, int hash, object @value, bool handleProperties){
			unchecked {
				#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
				switch (hash){
					case 1931081437:
					{
						#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
						this._rejected = global::haxe.lang.Runtime.toBool(@value);
						#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
						return @value;
					}
					
					
					default:
					{
						#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
						return base.__hx_setField(field, hash, @value, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_getField(string field, int hash, bool throwErrors, bool isCheck, bool handleProperties){
			unchecked {
				#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
				switch (hash){
					case 1891659798:
					{
						#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("errorPipe") ), ((int) (1891659798) ))) );
					}
					
					
					case 1247278126:
					{
						#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("pipe") ), ((int) (1247278126) ))) );
					}
					
					
					case 628324096:
					{
						#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("handleError") ), ((int) (628324096) ))) );
					}
					
					
					case 1703419603:
					{
						#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("unlink") ), ((int) (1703419603) ))) );
					}
					
					
					case 1291584221:
					{
						#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("then") ), ((int) (1291584221) ))) );
					}
					
					
					case 2144664612:
					{
						#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("handleResolve") ), ((int) (2144664612) ))) );
					}
					
					
					case 42291551:
					{
						#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("reject") ), ((int) (42291551) ))) );
					}
					
					
					case 640881032:
					{
						#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("isRejected") ), ((int) (640881032) ))) );
					}
					
					
					case 1931081437:
					{
						#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
						return this._rejected;
					}
					
					
					default:
					{
						#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
						return base.__hx_getField(field, hash, throwErrors, isCheck, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_invokeField(string field, int hash, global::Array dynargs){
			unchecked {
				#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
				switch (hash){
					case 2144664612:case 1291584221:case 1703419603:case 628324096:
					{
						#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
						return global::haxe.lang.Runtime.slowCallField(this, field, dynargs);
					}
					
					
					case 1891659798:
					{
						#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
						return this.errorPipe(((global::haxe.lang.Function) (dynargs[0]) ));
					}
					
					
					case 1247278126:
					{
						#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
						return this.pipe<object>(((global::haxe.lang.Function) (dynargs[0]) ));
					}
					
					
					case 42291551:
					{
						#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
						this.reject(dynargs[0]);
						#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
						break;
					}
					
					
					case 640881032:
					{
						#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
						return this.isRejected();
					}
					
					
					default:
					{
						#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
						return base.__hx_invokeField(field, hash, dynargs);
					}
					
				}
				
				#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
				return default(object);
			}
			#line default
		}
		
		
		public override   void __hx_getFields(global::Array<object> baseArr){
			unchecked {
				#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
				baseArr.push("_rejected");
				#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
				{
					#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
					base.__hx_getFields(baseArr);
				}
				
			}
			#line default
		}
		
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace promhx{
	public  class Promise_then_102__Fun<A, T> : global::haxe.lang.Function {
		public    Promise_then_102__Fun(global::Array<object> f1, global::Array<object> next) : base(1, 0){
			unchecked {
				#line 102 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
				this.f1 = f1;
				#line 102 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
				this.next = next;
			}
			#line default
		}
		
		
		public override   object __hx_invoke1_o(double __fn_float1, object __fn_dyn1){
			unchecked {
				#line 102 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
				T x = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (global::haxe.lang.Runtime.genericCast<T>(((object) (__fn_float1) ))) : (global::haxe.lang.Runtime.genericCast<T>(__fn_dyn1)) );
				#line 102 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
				((global::promhx.@base.AsyncBase<A>) (global::promhx.@base.AsyncBase<object>.__hx_cast<A>(((global::promhx.@base.AsyncBase) (this.next[0]) ))) ).handleResolve(global::haxe.lang.Runtime.genericCast<A>(((global::haxe.lang.Function) (this.f1[0]) ).__hx_invoke1_o(default(double), x)));
				#line 102 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
				return default(object);
			}
			#line default
		}
		
		
		public  global::Array<object> f1;
		
		public  global::Array<object> next;
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace promhx{
	public  class Promise_unlink_113__Fun<T> : global::haxe.lang.Function {
		public    Promise_unlink_113__Fun(global::Array<object> to1) : base(1, 0){
			unchecked {
				#line 113 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
				this.to1 = to1;
			}
			#line default
		}
		
		
		public override   object __hx_invoke1_o(double __fn_float1, object __fn_dyn1){
			unchecked {
				#line 113 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
				object x = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (((object) (__fn_float1) )) : (((object) (__fn_dyn1) )) );
				#line 113 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
				return ( ((global::promhx.@base.AsyncBase) (global::haxe.lang.Runtime.getField(x, "async", 641597244, true)) ) != ((global::promhx.@base.AsyncBase) (this.to1[0]) ) );
			}
			#line default
		}
		
		
		public  global::Array<object> to1;
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace promhx{
	public  class Promise_unlink_107__Fun<T> : global::haxe.lang.Function {
		public    Promise_unlink_107__Fun(global::Array<object> to1, global::Array<object> _g) : base(0, 0){
			unchecked {
				#line 108 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
				this.to1 = to1;
				#line 108 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
				this._g = _g;
			}
			#line default
		}
		
		
		public override   object __hx_invoke0_o(){
			unchecked {
				#line 108 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
				if ( ! (((global::promhx.Promise<T>) (global::promhx.Promise<object>.__hx_cast<T>(((global::promhx.Promise) (this._g[0]) ))) )._fulfilled) ) {
					#line 109 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
					string msg = "Downstream Promise is not fullfilled";
					((global::promhx.Promise<T>) (global::promhx.Promise<object>.__hx_cast<T>(((global::promhx.Promise) (this._g[0]) ))) ).handleError(global::promhx.error.PromiseError.DownstreamNotFullfilled(msg));
				}
				 else {
					#line 113 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
					((global::promhx.Promise<T>) (global::promhx.Promise<object>.__hx_cast<T>(((global::promhx.Promise) (this._g[0]) ))) )._update = ((global::promhx.Promise<T>) (global::promhx.Promise<object>.__hx_cast<T>(((global::promhx.Promise) (this._g[0]) ))) )._update.filter(new global::promhx.Promise_unlink_113__Fun<T>(((global::Array<object>) (this.to1) )));
				}
				
				#line 108 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
				return default(object);
			}
			#line default
		}
		
		
		public  global::Array<object> to1;
		
		public  global::Array<object> _g;
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace promhx{
	public  class Promise_pipe_125__Fun_0<A> : global::haxe.lang.Function {
		public    Promise_pipe_125__Fun_0() : base(1, 0){
			unchecked {
			}
			#line default
		}
		
		
		public override   object __hx_invoke1_o(double __fn_float1, object __fn_dyn1){
			unchecked {
				#line 125 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
				A x1 = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (global::haxe.lang.Runtime.genericCast<A>(((object) (__fn_float1) ))) : (global::haxe.lang.Runtime.genericCast<A>(__fn_dyn1)) );
				#line 125 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
				return x1;
			}
			#line default
		}
		
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace promhx{
	public  class Promise_pipe_125__Fun<A, T> : global::haxe.lang.Function {
		public    Promise_pipe_125__Fun(global::Array<object> ret1, global::Array<object> f1, global::Array<bool> linked) : base(1, 0){
			unchecked {
				#line 125 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
				this.ret1 = ret1;
				#line 125 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
				this.f1 = f1;
				#line 125 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
				this.linked = linked;
			}
			#line default
		}
		
		
		public override   object __hx_invoke1_o(double __fn_float1, object __fn_dyn1){
			unchecked {
				#line 125 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
				T x = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (global::haxe.lang.Runtime.genericCast<T>(((object) (__fn_float1) ))) : (global::haxe.lang.Runtime.genericCast<T>(__fn_dyn1)) );
				#line 125 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
				if ( ! (this.linked[0]) ) {
					#line 125 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
					this.linked[0] = true;
					#line 125 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
					global::promhx.@base.AsyncBase<A> pipe_ret = ((global::promhx.@base.AsyncBase<A>) (global::promhx.@base.AsyncBase<object>.__hx_cast<A>(((global::promhx.@base.AsyncBase) (((global::haxe.lang.Function) (this.f1[0]) ).__hx_invoke1_o(default(double), x)) ))) );
					#line 125 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
					object __temp_stmt219 = default(object);
					#line 125 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
					{
						#line 125 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
						global::promhx.@base.AsyncBase<A> __temp_odecl217 = ((global::promhx.@base.AsyncBase<A>) (global::promhx.@base.AsyncBase<object>.__hx_cast<A>(((global::promhx.@base.AsyncBase) (this.ret1[0]) ))) );
						#line 125 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
						global::haxe.lang.Function __temp_odecl218 = ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((global::promhx.@base.AsyncBase<A>) (global::promhx.@base.AsyncBase<object>.__hx_cast<A>(((global::promhx.@base.AsyncBase) (this.ret1[0]) ))) ), ((string) ("handleResolve") ), ((int) (2144664612) ))) );
						#line 125 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
						__temp_stmt219 = new global::haxe.lang.DynamicObject(new global::Array<int>(new int[]{641597244, 1963057964}), new global::Array<object>(new object[]{__temp_odecl217, __temp_odecl218}), new global::Array<int>(new int[]{}), new global::Array<double>(new double[]{}));
					}
					
					#line 125 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
					pipe_ret._update.push(__temp_stmt219);
					#line 125 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
					global::promhx.@base.AsyncBase<object>.immediateLinkUpdate<A, A>(pipe_ret, ((global::promhx.@base.AsyncBase<A>) (global::promhx.@base.AsyncBase<object>.__hx_cast<A>(((global::promhx.@base.AsyncBase) (this.ret1[0]) ))) ), new global::promhx.Promise_pipe_125__Fun_0<A>());
				}
				
				#line 125 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
				return default(object);
			}
			#line default
		}
		
		
		public  global::Array<object> ret1;
		
		public  global::Array<object> f1;
		
		public  global::Array<bool> linked;
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace promhx{
	public  class Promise_errorPipe_134__Fun<T> : global::haxe.lang.Function {
		public    Promise_errorPipe_134__Fun(global::Array<object> ret, global::Array<object> f1) : base(1, 0){
			unchecked {
				#line 134 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
				this.ret = ret;
				#line 134 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
				this.f1 = f1;
			}
			#line default
		}
		
		
		public override   object __hx_invoke1_o(double __fn_float1, object __fn_dyn1){
			unchecked {
				#line 134 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
				object e = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (((object) (__fn_float1) )) : (((object) (__fn_dyn1) )) );
				global::promhx.Promise<T> piped = ((global::promhx.Promise<T>) (global::promhx.Promise<object>.__hx_cast<T>(((global::promhx.Promise) (((global::haxe.lang.Function) (this.f1[0]) ).__hx_invoke1_o(default(double), e)) ))) );
				global::promhx.Promise<object>.__hx_cast<object>(((global::promhx.Promise) (piped.then<object>(((global::haxe.lang.Function) (new global::haxe.lang.Closure(((global::promhx.Promise<T>) (global::promhx.Promise<object>.__hx_cast<T>(((global::promhx.Promise) (this.ret[0]) ))) ), ((string) ("_resolve") ), ((int) (555248749) ))) ))) ));
				#line 134 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
				return default(object);
			}
			#line default
		}
		
		
		public  global::Array<object> ret;
		
		public  global::Array<object> f1;
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace promhx{
	public  class Promise_whenAll_82__Fun_0<T1> : global::haxe.lang.Function {
		public    Promise_whenAll_82__Fun_0(global::Array<object> all, global::Array<object> next) : base(3, 0){
			unchecked {
				#line 82 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
				this.all = all;
				#line 82 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
				this.next = next;
			}
			#line default
		}
		
		
		public override   object __hx_invoke3_o(double __fn_float1, object __fn_dyn1, double __fn_float2, object __fn_dyn2, double __fn_float3, object __fn_dyn3){
			unchecked {
				#line 82 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
				T1 v = ( (global::haxe.lang.Runtime.eq(__fn_dyn3, global::haxe.lang.Runtime.undefined)) ? (global::haxe.lang.Runtime.genericCast<T1>(((object) (__fn_float3) ))) : (global::haxe.lang.Runtime.genericCast<T1>(__fn_dyn3)) );
				#line 82 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
				global::promhx.@base.AsyncBase<T1> current = ( (global::haxe.lang.Runtime.eq(__fn_dyn2, global::haxe.lang.Runtime.undefined)) ? (((global::promhx.@base.AsyncBase<T1>) (global::promhx.@base.AsyncBase<object>.__hx_cast<T1>(((global::promhx.@base.AsyncBase) (((object) (__fn_float2) )) ))) )) : (((global::promhx.@base.AsyncBase<T1>) (global::promhx.@base.AsyncBase<object>.__hx_cast<T1>(((global::promhx.@base.AsyncBase) (__fn_dyn2) ))) )) );
				#line 82 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
				global::Array<object> arr = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (((object) (__fn_float1) )) ))) )) : (((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (__fn_dyn1) ))) )) );
				#line 82 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
				if (( ( arr.length == 0 ) || global::promhx.@base.AsyncBase<object>.allFulfilled(arr) )) {
					#line 82 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
					global::Array<T1> vals = default(global::Array<T1>);
					#line 82 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
					{
						#line 82 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
						global::Array<T1> _g = new global::Array<T1>(new T1[]{});
						#line 82 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
						{
							#line 82 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
							object __temp_iterator157 = ((object) (global::haxe.lang.Runtime.callField(this.all[0], "iterator", 328878574, default(global::Array))) );
							#line 82 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
							while (global::haxe.lang.Runtime.toBool(global::haxe.lang.Runtime.callField(__temp_iterator157, "hasNext", 407283053, default(global::Array)))){
								#line 82 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
								global::promhx.@base.AsyncBase<T1> a = ((global::promhx.@base.AsyncBase<T1>) (global::promhx.@base.AsyncBase<object>.__hx_cast<T1>(((global::promhx.@base.AsyncBase) (global::haxe.lang.Runtime.callField(__temp_iterator157, "next", 1224901875, default(global::Array))) ))) );
								#line 82 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
								_g.push(( (( a == current )) ? (v) : (a._val) ));
							}
							
						}
						
						#line 82 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
						vals = _g;
					}
					
					#line 82 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
					((global::promhx.@base.AsyncBase<object>) (global::promhx.@base.AsyncBase<object>.__hx_cast<object>(((global::promhx.@base.AsyncBase) (this.next[0]) ))) ).handleResolve(vals);
				}
				
				#line 82 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
				return default(object);
			}
			#line default
		}
		
		
		public  global::Array<object> all;
		
		public  global::Array<object> next;
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace promhx{
	public  class Promise_whenAll_82__Fun<T1> : global::haxe.lang.Function {
		public    Promise_whenAll_82__Fun(global::Array<object> a21, global::Array<object> f, global::Array<object> a11) : base(1, 0){
			unchecked {
				#line 82 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
				this.a21 = a21;
				#line 82 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
				this.f = f;
				#line 82 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
				this.a11 = a11;
			}
			#line default
		}
		
		
		public override   object __hx_invoke1_o(double __fn_float1, object __fn_dyn1){
			unchecked {
				#line 82 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
				T1 v1 = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (global::haxe.lang.Runtime.genericCast<T1>(((object) (__fn_float1) ))) : (global::haxe.lang.Runtime.genericCast<T1>(__fn_dyn1)) );
				#line 82 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Promise.hx"
				return ((global::haxe.lang.Function) (this.f[0]) ).__hx_invoke3_o(default(double), ((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (this.a11[0]) ))) ), default(double), ((global::promhx.@base.AsyncBase<T1>) (global::promhx.@base.AsyncBase<object>.__hx_cast<T1>(((global::promhx.@base.AsyncBase) (this.a21[0]) ))) ), default(double), v1);
			}
			#line default
		}
		
		
		public  global::Array<object> a21;
		
		public  global::Array<object> f;
		
		public  global::Array<object> a11;
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace promhx{
	public  interface Promise : global::haxe.lang.IHxObject, global::promhx.@base.AsyncBase, global::haxe.lang.IGenericObject {
		   object promhx_Promise_cast<T_c>();
		
	}
}


