
#pragma warning disable 109, 114, 219, 429, 168, 162
namespace promhx{
	public  class Stream<T> : global::promhx.@base.AsyncBase<T>, global::promhx.Stream {
		public    Stream(global::haxe.lang.EmptyObject empty) : base(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) )){
			unchecked {
			}
			#line default
		}
		
		
		public    Stream(global::promhx.Deferred<T> d) : base(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) )){
			unchecked {
				#line 21 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				global::promhx.Stream<object>.__hx_ctor_promhx_Stream<T>(this, d);
			}
			#line default
		}
		
		
		public static   void __hx_ctor_promhx_Stream<T_c>(global::promhx.Stream<T_c> __temp_me28, global::promhx.Deferred<T_c> d){
			unchecked {
				#line 21 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				global::promhx.@base.AsyncBase<object>.__hx_ctor_promhx_base_AsyncBase<T_c>(__temp_me28, ( (( d == default(global::promhx.Deferred<T_c>) )) ? (default(global::promhx.Deferred<T_c>)) : (d) ));
				__temp_me28._end_deferred = new global::promhx.Deferred<object>();
				__temp_me28._end_promise = __temp_me28._end_deferred.promise();
			}
			#line default
		}
		
		
		public static  new object __hx_cast<T_c_c>(global::promhx.Stream me){
			unchecked {
				#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				return ( (( me != default(global::promhx.Stream) )) ? (me.promhx_Stream_cast<T_c_c>()) : (default(global::promhx.Stream)) );
			}
			#line default
		}
		
		
		public static   global::promhx.Stream<T1> @foreach<T1>(object itb){
			unchecked {
				#line 72 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				global::promhx.Stream<T1> s = new global::promhx.Stream<T1>(((global::promhx.Deferred<T1>) (default(global::promhx.Deferred<T1>)) ));
				{
					#line 73 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
					object __temp_iterator162 = ((object) (global::haxe.lang.Runtime.callField(itb, "iterator", 328878574, default(global::Array))) );
					#line 73 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
					while (global::haxe.lang.Runtime.toBool(global::haxe.lang.Runtime.callField(__temp_iterator162, "hasNext", 407283053, default(global::Array)))){
						#line 73 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
						T1 i = global::haxe.lang.Runtime.genericCast<T1>(global::haxe.lang.Runtime.callField(__temp_iterator162, "next", 1224901875, default(global::Array)));
						#line 73 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
						s.handleResolve(i);
					}
					
				}
				
				#line 74 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				s.end();
				return s;
			}
			#line default
		}
		
		
		public static   global::promhx.Stream<object> wheneverAll<T2>(object itb){
			unchecked {
				#line 105 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				global::promhx.Stream<object> ret = new global::promhx.Stream<object>(((global::promhx.Deferred<object>) (default(global::promhx.Deferred<object>)) ));
				{
					#line 106 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
					global::Array<object> all = new global::Array<object>(new object[]{itb});
					#line 106 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
					global::Array<object> next = new global::Array<object>(new object[]{ret});
					#line 106 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
					global::haxe.lang.Function cthen = new global::promhx.Stream_wheneverAll_106__Fun_0<T2>(((global::Array<object>) (next) ), ((global::Array<object>) (all) ));
					#line 106 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
					{
						#line 106 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
						object __temp_iterator164 = ((object) (global::haxe.lang.Runtime.callField(all[0], "iterator", 328878574, default(global::Array))) );
						#line 106 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
						while (global::haxe.lang.Runtime.toBool(global::haxe.lang.Runtime.callField(__temp_iterator164, "hasNext", 407283053, default(global::Array)))){
							#line 106 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
							global::promhx.@base.AsyncBase<T2> a1 = ((global::promhx.@base.AsyncBase<T2>) (global::promhx.@base.AsyncBase<object>.__hx_cast<T2>(((global::promhx.@base.AsyncBase) (global::haxe.lang.Runtime.callField(__temp_iterator164, "next", 1224901875, default(global::Array))) ))) );
							#line 106 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
							object __temp_stmt239 = default(object);
							#line 106 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
							{
								#line 106 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
								global::promhx.@base.AsyncBase<object> __temp_odecl237 = ((global::promhx.@base.AsyncBase<object>) (global::promhx.@base.AsyncBase<object>.__hx_cast<object>(((global::promhx.@base.AsyncBase) (next[0]) ))) );
								#line 106 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
								global::haxe.lang.Function __temp_odecl238 = default(global::haxe.lang.Function);
								#line 106 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
								{
									#line 106 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
									global::Array<object> f = new global::Array<object>(new object[]{cthen});
									#line 106 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
									global::Array<object> __temp_stmt240 = default(global::Array<object>);
									#line 106 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
									{
										#line 106 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
										global::Array<object> _g1 = new global::Array<object>(new object[]{});
										#line 106 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
										{
											#line 106 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
											object __temp_iterator165 = ((object) (global::haxe.lang.Runtime.callField(all[0], "iterator", 328878574, default(global::Array))) );
											#line 106 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
											while (global::haxe.lang.Runtime.toBool(global::haxe.lang.Runtime.callField(__temp_iterator165, "hasNext", 407283053, default(global::Array)))){
												#line 106 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
												global::promhx.@base.AsyncBase<T2> a2 = ((global::promhx.@base.AsyncBase<T2>) (global::promhx.@base.AsyncBase<object>.__hx_cast<T2>(((global::promhx.@base.AsyncBase) (global::haxe.lang.Runtime.callField(__temp_iterator165, "next", 1224901875, default(global::Array))) ))) );
												#line 106 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
												if (( a2 != a1 )) {
													#line 106 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
													_g1.push(a2);
												}
												
											}
											
										}
										
										#line 106 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
										__temp_stmt240 = _g1;
									}
									
									#line 106 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
									global::Array<object> a11 = new global::Array<object>(new object[]{__temp_stmt240});
									#line 106 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
									global::Array<object> a21 = new global::Array<object>(new object[]{a1});
									#line 106 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
									__temp_odecl238 = new global::promhx.Stream_wheneverAll_106__Fun<T2>(((global::Array<object>) (a21) ), ((global::Array<object>) (f) ), ((global::Array<object>) (a11) ));
								}
								
								#line 106 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
								__temp_stmt239 = new global::haxe.lang.DynamicObject(new global::Array<int>(new int[]{641597244, 1963057964}), new global::Array<object>(new object[]{__temp_odecl237, __temp_odecl238}), new global::Array<int>(new int[]{}), new global::Array<double>(new double[]{}));
							}
							
							#line 106 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
							a1._update.push(__temp_stmt239);
						}
						
					}
					
					#line 106 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
					if (global::promhx.@base.AsyncBase<object>.allFulfilled(all[0])) {
						#line 106 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
						global::Array<T2> __temp_stmt241 = default(global::Array<T2>);
						#line 106 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
						{
							#line 106 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
							global::Array<T2> _g2 = new global::Array<T2>(new T2[]{});
							#line 106 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
							{
								#line 106 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
								object __temp_iterator166 = ((object) (global::haxe.lang.Runtime.callField(all[0], "iterator", 328878574, default(global::Array))) );
								#line 106 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
								while (global::haxe.lang.Runtime.toBool(global::haxe.lang.Runtime.callField(__temp_iterator166, "hasNext", 407283053, default(global::Array)))){
									#line 106 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
									global::promhx.@base.AsyncBase<T2> a3 = ((global::promhx.@base.AsyncBase<T2>) (global::promhx.@base.AsyncBase<object>.__hx_cast<T2>(((global::promhx.@base.AsyncBase) (global::haxe.lang.Runtime.callField(__temp_iterator166, "next", 1224901875, default(global::Array))) ))) );
									#line 106 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
									_g2.push(a3._val);
								}
								
							}
							
							#line 106 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
							__temp_stmt241 = _g2;
						}
						
						#line 106 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
						((global::promhx.@base.AsyncBase<object>) (global::promhx.@base.AsyncBase<object>.__hx_cast<object>(((global::promhx.@base.AsyncBase) (next[0]) ))) ).handleResolve(__temp_stmt241);
					}
					
				}
				
				#line 107 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				return ret;
			}
			#line default
		}
		
		
		public static   global::promhx.Stream<T3> concatAll<T3>(object itb){
			unchecked {
				#line 115 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				global::promhx.Stream<T3> ret = new global::promhx.Stream<T3>(((global::promhx.Deferred<T3>) (default(global::promhx.Deferred<T3>)) ));
				{
					#line 116 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
					object __temp_iterator167 = ((object) (global::haxe.lang.Runtime.callField(itb, "iterator", 328878574, default(global::Array))) );
					#line 116 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
					while (global::haxe.lang.Runtime.toBool(global::haxe.lang.Runtime.callField(__temp_iterator167, "hasNext", 407283053, default(global::Array)))){
						#line 116 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
						global::promhx.Stream<T3> i = ((global::promhx.Stream<T3>) (global::promhx.Stream<object>.__hx_cast<T3>(((global::promhx.Stream) (global::haxe.lang.Runtime.callField(__temp_iterator167, "next", 1224901875, default(global::Array))) ))) );
						#line 116 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
						ret.concat(i);
					}
					
				}
				
				#line 117 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				return ret;
			}
			#line default
		}
		
		
		public static   global::promhx.Stream<T4> mergeAll<T4>(object itb){
			unchecked {
				#line 125 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				global::promhx.Stream<T4> ret = new global::promhx.Stream<T4>(((global::promhx.Deferred<T4>) (default(global::promhx.Deferred<T4>)) ));
				{
					#line 126 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
					object __temp_iterator168 = ((object) (global::haxe.lang.Runtime.callField(itb, "iterator", 328878574, default(global::Array))) );
					#line 126 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
					while (global::haxe.lang.Runtime.toBool(global::haxe.lang.Runtime.callField(__temp_iterator168, "hasNext", 407283053, default(global::Array)))){
						#line 126 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
						global::promhx.Stream<T4> i = ((global::promhx.Stream<T4>) (global::promhx.Stream<object>.__hx_cast<T4>(((global::promhx.Stream) (global::haxe.lang.Runtime.callField(__temp_iterator168, "next", 1224901875, default(global::Array))) ))) );
						#line 126 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
						ret.merge(i);
					}
					
				}
				
				#line 127 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				return ret;
			}
			#line default
		}
		
		
		public static   global::promhx.Stream<A> stream<A>(A _val){
			unchecked {
				#line 259 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				global::promhx.Stream<A> ret = new global::promhx.Stream<A>(((global::promhx.Deferred<A>) (default(global::promhx.Deferred<A>)) ));
				ret.handleResolve(_val);
				return ret;
			}
			#line default
		}
		
		
		public static  new object __hx_createEmpty(){
			unchecked {
				#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				return new global::promhx.Stream<object>(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) ));
			}
			#line default
		}
		
		
		public static  new object __hx_create(global::Array arr){
			unchecked {
				#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				return new global::promhx.Stream<object>(((global::promhx.Deferred<object>) (global::promhx.Deferred<object>.__hx_cast<object>(((global::promhx.Deferred) (arr[0]) ))) ));
			}
			#line default
		}
		
		
		public virtual   object promhx_Stream_cast<T_c>(){
			unchecked {
				#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				if (global::haxe.lang.Runtime.eq(typeof(T), typeof(T_c))) {
					#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
					return this;
				}
				
				#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				global::promhx.Stream<T_c> new_me = new global::promhx.Stream<T_c>(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) ));
				#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				{
					#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
					object __temp_iterator161 = global::Reflect.fields(this).iterator();
					#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
					while (global::haxe.lang.Runtime.toBool(global::haxe.lang.Runtime.callField(__temp_iterator161, "hasNext", 407283053, default(global::Array)))){
						#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
						string field = global::haxe.lang.Runtime.toString(global::haxe.lang.Runtime.callField(__temp_iterator161, "next", 1224901875, default(global::Array)));
						#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
						switch (field){
							default:
							{
								#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
								global::Reflect.setField(new_me, field, ((object) (global::Reflect.field(this, field)) ));
								#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
								break;
							}
							
						}
						
					}
					
				}
				
				#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				return new_me;
			}
			#line default
		}
		
		
		public virtual   object promhx_base_AsyncBase_cast<T_c>(){
			unchecked {
				#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				return this.promhx_Stream_cast<T_c>();
			}
			#line default
		}
		
		
		public  global::promhx.Deferred<T> deferred;
		
		public  bool _pause;
		
		public  bool _end;
		
		public  global::promhx.Promise<object> _end_promise;
		
		public  global::promhx.Deferred<object> _end_deferred;
		
		public override   global::promhx.@base.AsyncBase<A> then<A>(global::haxe.lang.Function f){
			unchecked {
				#line 83 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				global::Array<object> ret = new global::Array<object>(new object[]{new global::promhx.Stream<A>(((global::promhx.Deferred<A>) (default(global::promhx.Deferred<A>)) ))});
				{
					#line 84 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
					global::Array<object> next = new global::Array<object>(new object[]{((global::promhx.Stream<A>) (global::promhx.Stream<object>.__hx_cast<A>(((global::promhx.Stream) (ret[0]) ))) )});
					#line 84 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
					global::Array<object> f1 = new global::Array<object>(new object[]{f});
					#line 84 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
					object __temp_stmt222 = default(object);
					#line 84 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
					{
						#line 84 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
						global::promhx.@base.AsyncBase<A> __temp_odecl220 = ((global::promhx.@base.AsyncBase<A>) (global::promhx.@base.AsyncBase<object>.__hx_cast<A>(((global::promhx.@base.AsyncBase) (next[0]) ))) );
						#line 84 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
						global::haxe.lang.Function __temp_odecl221 = new global::promhx.Stream_then_84__Fun<A, T>(((global::Array<object>) (next) ), ((global::Array<object>) (f1) ));
						#line 84 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
						__temp_stmt222 = new global::haxe.lang.DynamicObject(new global::Array<int>(new int[]{641597244, 1963057964}), new global::Array<object>(new object[]{__temp_odecl220, __temp_odecl221}), new global::Array<int>(new int[]{}), new global::Array<double>(new double[]{}));
					}
					
					#line 84 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
					this._update.push(__temp_stmt222);
					#line 84 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
					global::promhx.@base.AsyncBase<object>.immediateLinkUpdate<T, A>(this, ((global::promhx.@base.AsyncBase<A>) (global::promhx.@base.AsyncBase<object>.__hx_cast<A>(((global::promhx.@base.AsyncBase) (next[0]) ))) ), ((global::haxe.lang.Function) (f1[0]) ));
				}
				
				#line 85 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				global::promhx.Promise<object>.__hx_cast<object>(((global::promhx.Promise) (this._end_promise.then<object>(new global::promhx.Stream_then_85__Fun<A, T>(((global::Array<object>) (ret) )))) ));
				return ((global::promhx.Stream<A>) (global::promhx.Stream<object>.__hx_cast<A>(((global::promhx.Stream) (ret[0]) ))) );
			}
			#line default
		}
		
		
		public virtual   bool detachStream(global::promhx.Stream str){
			unchecked {
				#line 90 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				global::Array<object> filtered = new global::Array<object>(new object[]{});
				bool removed = false;
				{
					#line 92 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
					int _g = 0;
					#line 92 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
					global::Array<object> _g1 = this._update;
					#line 92 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
					while (( _g < _g1.length )){
						#line 92 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
						object u = _g1[_g];
						#line 92 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
						 ++ _g;
						if (( ((global::promhx.@base.AsyncBase) (global::haxe.lang.Runtime.getField(u, "async", 641597244, true)) ) == str )) {
							#line 93 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
							removed = true;
						}
						 else {
							#line 94 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
							filtered.push(u);
						}
						
					}
					
				}
				
				#line 96 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				this._update = filtered;
				return removed;
			}
			#line default
		}
		
		
		public   global::promhx.Promise<T> first(){
			unchecked {
				#line 134 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				global::Array<object> s = new global::Array<object>(new object[]{new global::promhx.Promise<T>(((global::promhx.Deferred<T>) (default(global::promhx.Deferred<T>)) ))});
				global::promhx.Stream<object>.__hx_cast<object>(((global::promhx.Stream) (this.then<object>(new global::promhx.Stream_first_135__Fun<T>(((global::Array<object>) (s) )))) ));
				return ((global::promhx.Promise<T>) (global::promhx.Promise<object>.__hx_cast<T>(((global::promhx.Promise) (s[0]) ))) );
			}
			#line default
		}
		
		
		public override   void handleResolve(T val){
			unchecked {
				#line 140 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				if ((  ! (this._end)  &&  ! (this._pause)  )) {
					#line 140 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
					this._resolve(val);
				}
				
			}
			#line default
		}
		
		
		public virtual   void pause(global::haxe.lang.Null<bool> @set){
			unchecked {
				#line 148 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				if ( ! (@set.hasValue) ) {
					#line 148 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
					@set = new global::haxe.lang.Null<bool>( ! (this._pause) , true);
				}
				
				#line 149 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				this._pause = @set.@value;
			}
			#line default
		}
		
		
		public virtual   global::promhx.Stream<A> pipe<A>(global::haxe.lang.Function f){
			unchecked {
				#line 153 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				global::Array<object> ret = new global::Array<object>(new object[]{new global::promhx.Stream<A>(((global::promhx.Deferred<A>) (default(global::promhx.Deferred<A>)) ))});
				{
					#line 154 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
					global::Array<object> ret1 = new global::Array<object>(new object[]{((global::promhx.Stream<A>) (global::promhx.Stream<object>.__hx_cast<A>(((global::promhx.Stream) (ret[0]) ))) )});
					#line 154 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
					global::Array<object> f1 = new global::Array<object>(new object[]{f});
					#line 154 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
					global::Array<bool> linked = new global::Array<bool>(new bool[]{false});
					#line 154 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
					global::haxe.lang.Function linkf = new global::promhx.Stream_pipe_154__Fun<A, T>(((global::Array<object>) (f1) ), ((global::Array<bool>) (linked) ), ((global::Array<object>) (ret1) ));
					#line 154 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
					object __temp_stmt226 = default(object);
					#line 154 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
					{
						#line 154 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
						global::promhx.@base.AsyncBase<A> __temp_odecl225 = ((global::promhx.@base.AsyncBase<A>) (global::promhx.@base.AsyncBase<object>.__hx_cast<A>(((global::promhx.@base.AsyncBase) (ret1[0]) ))) );
						#line 154 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
						__temp_stmt226 = new global::haxe.lang.DynamicObject(new global::Array<int>(new int[]{641597244, 1963057964}), new global::Array<object>(new object[]{__temp_odecl225, linkf}), new global::Array<int>(new int[]{}), new global::Array<double>(new double[]{}));
					}
					
					#line 154 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
					this._update.push(__temp_stmt226);
					#line 154 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
					if (( this._resolved &&  ! (this._pending)  )) {
						#line 154 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
						try {
							#line 154 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
							linkf.__hx_invoke1_o(default(double), this._val);
						}
						catch (global::System.Exception __temp_catchallException223){
							#line 154 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
							global::haxe.lang.Exceptions.exception = __temp_catchallException223;
							#line 154 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
							object __temp_catchall224 = __temp_catchallException223;
							#line 154 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
							if (( __temp_catchall224 is global::haxe.lang.HaxeException )) {
								#line 154 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
								__temp_catchall224 = ((global::haxe.lang.HaxeException) (__temp_catchallException223) ).obj;
							}
							
							#line 154 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
							{
								#line 154 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
								object e = __temp_catchall224;
								#line 154 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
								((global::promhx.@base.AsyncBase<A>) (global::promhx.@base.AsyncBase<object>.__hx_cast<A>(((global::promhx.@base.AsyncBase) (ret1[0]) ))) ).handleError(e);
							}
							
						}
						
						
					}
					
				}
				
				#line 155 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				global::promhx.Promise<object>.__hx_cast<object>(((global::promhx.Promise) (this._end_promise.then<object>(new global::promhx.Stream_pipe_155__Fun<A, T>(((global::Array<object>) (ret) )))) ));
				return ((global::promhx.Stream<A>) (global::promhx.Stream<object>.__hx_cast<A>(((global::promhx.Stream) (ret[0]) ))) );
			}
			#line default
		}
		
		
		public virtual   global::promhx.Stream<T> errorPipe(global::haxe.lang.Function f){
			unchecked {
				#line 162 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				global::Array<object> f1 = new global::Array<object>(new object[]{f});
				global::Array<object> ret = new global::Array<object>(new object[]{new global::promhx.Stream<T>(((global::promhx.Deferred<T>) (default(global::promhx.Deferred<T>)) ))});
				this.catchError(new global::promhx.Stream_errorPipe_164__Fun<T>(((global::Array<object>) (f1) ), ((global::Array<object>) (ret) )));
				#line 169 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				global::promhx.Stream<object>.__hx_cast<object>(((global::promhx.Stream) (this.then<object>(((global::haxe.lang.Function) (new global::haxe.lang.Closure(((global::promhx.Stream<T>) (global::promhx.Stream<object>.__hx_cast<T>(((global::promhx.Stream) (ret[0]) ))) ), ((string) ("_resolve") ), ((int) (555248749) ))) ))) ));
				global::promhx.Promise<object>.__hx_cast<object>(((global::promhx.Promise) (this._end_promise.then<object>(new global::promhx.Stream_errorPipe_170__Fun<T>(((global::Array<object>) (ret) )))) ));
				return ((global::promhx.Stream<T>) (global::promhx.Stream<object>.__hx_cast<T>(((global::promhx.Stream) (ret[0]) ))) );
			}
			#line default
		}
		
		
		public virtual   void handleEnd(){
			unchecked {
				#line 179 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				if (this._pending) {
					#line 179 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
					global::promhx.@base.EventLoop.queue.@add(((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("handleEnd") ), ((int) (710340883) ))) ));
					#line 179 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
					global::promhx.@base.EventLoop.continueOnNextLoop();
				}
				 else {
					#line 180 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
					if (this._end_promise._resolved) {
						#line 180 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
						return ;
					}
					 else {
						#line 182 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
						this._end = true;
						global::haxe.ds.Option o = default(global::haxe.ds.Option);
						#line 183 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
						if (this._resolved) {
							#line 183 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
							o = global::haxe.ds.Option.Some(this._val);
						}
						 else {
							#line 183 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
							o = global::haxe.ds.Option.None;
						}
						
						#line 184 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
						this._end_promise.handleResolve(o);
						this._update = new global::Array<object>(new object[]{});
						this._error = new global::Array<object>(new object[]{});
					}
					
				}
				
			}
			#line default
		}
		
		
		public virtual   global::promhx.Stream<T> end(){
			unchecked {
				#line 191 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				{
					#line 191 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
					global::promhx.@base.EventLoop.queue.@add(((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("handleEnd") ), ((int) (710340883) ))) ));
					#line 191 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
					global::promhx.@base.EventLoop.continueOnNextLoop();
				}
				
				#line 192 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				return this;
			}
			#line default
		}
		
		
		public   global::promhx.Promise<A> endThen<A>(global::haxe.lang.Function f){
			unchecked {
				#line 196 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				return ((global::promhx.Promise<A>) (global::promhx.Promise<object>.__hx_cast<A>(((global::promhx.Promise) (this._end_promise.then<A>(f)) ))) );
			}
			#line default
		}
		
		
		public virtual   global::promhx.Stream<T> filter(global::haxe.lang.Function f){
			unchecked {
				#line 203 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				global::Array<object> f1 = new global::Array<object>(new object[]{f});
				global::Array<object> ret = new global::Array<object>(new object[]{new global::promhx.Stream<T>(((global::promhx.Deferred<T>) (default(global::promhx.Deferred<T>)) ))});
				object __temp_stmt229 = default(object);
				#line 205 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				{
					#line 206 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
					global::promhx.Stream<T> __temp_odecl227 = ((global::promhx.Stream<T>) (global::promhx.Stream<object>.__hx_cast<T>(((global::promhx.Stream) (ret[0]) ))) );
					global::haxe.lang.Function __temp_odecl228 = new global::promhx.Stream_filter_207__Fun<T>(((global::Array<object>) (ret) ), ((global::Array<object>) (f1) ));
					#line 205 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
					__temp_stmt229 = new global::haxe.lang.DynamicObject(new global::Array<int>(new int[]{641597244, 1963057964}), new global::Array<object>(new object[]{__temp_odecl227, __temp_odecl228}), new global::Array<int>(new int[]{}), new global::Array<double>(new double[]{}));
				}
				
				#line 205 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				this._update.push(__temp_stmt229);
				#line 209 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				global::promhx.@base.AsyncBase<object>.immediateLinkUpdate<T, T>(this, ((global::promhx.Stream<T>) (global::promhx.Stream<object>.__hx_cast<T>(((global::promhx.Stream) (ret[0]) ))) ), new global::promhx.Stream_filter_209__Fun<T>());
				return ((global::promhx.Stream<T>) (global::promhx.Stream<object>.__hx_cast<T>(((global::promhx.Stream) (ret[0]) ))) );
			}
			#line default
		}
		
		
		public virtual   global::promhx.Stream<T> concat(global::promhx.Stream<T> s){
			unchecked {
				#line 218 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				global::Array<object> s1 = new global::Array<object>(new object[]{s});
				global::Array<object> ret = new global::Array<object>(new object[]{new global::promhx.Stream<T>(((global::promhx.Deferred<T>) (default(global::promhx.Deferred<T>)) ))});
				object __temp_stmt232 = default(object);
				#line 220 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				{
					#line 221 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
					global::promhx.Stream<T> __temp_odecl230 = ((global::promhx.Stream<T>) (global::promhx.Stream<object>.__hx_cast<T>(((global::promhx.Stream) (ret[0]) ))) );
					global::haxe.lang.Function __temp_odecl231 = ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((global::promhx.Stream<T>) (global::promhx.Stream<object>.__hx_cast<T>(((global::promhx.Stream) (ret[0]) ))) ), ((string) ("handleResolve") ), ((int) (2144664612) ))) );
					#line 220 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
					__temp_stmt232 = new global::haxe.lang.DynamicObject(new global::Array<int>(new int[]{641597244, 1963057964}), new global::Array<object>(new object[]{__temp_odecl230, __temp_odecl231}), new global::Array<int>(new int[]{}), new global::Array<double>(new double[]{}));
				}
				
				#line 220 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				this._update.push(__temp_stmt232);
				#line 224 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				global::promhx.@base.AsyncBase<object>.immediateLinkUpdate<T, T>(this, ((global::promhx.Stream<T>) (global::promhx.Stream<object>.__hx_cast<T>(((global::promhx.Stream) (ret[0]) ))) ), new global::promhx.Stream_concat_224__Fun<T>());
				global::promhx.Promise<object>.__hx_cast<object>(((global::promhx.Promise) (this._end_promise.then<object>(new global::promhx.Stream_concat_225__Fun<T>(((global::Array<object>) (ret) ), ((global::Array<object>) (s1) )))) ));
				#line 234 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				return ((global::promhx.Stream<T>) (global::promhx.Stream<object>.__hx_cast<T>(((global::promhx.Stream) (ret[0]) ))) );
			}
			#line default
		}
		
		
		public virtual   global::promhx.Stream<T> merge(global::promhx.Stream<T> s){
			unchecked {
				#line 241 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				global::promhx.Stream<T> ret = new global::promhx.Stream<T>(((global::promhx.Deferred<T>) (default(global::promhx.Deferred<T>)) ));
				object __temp_stmt235 = default(object);
				#line 242 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				{
					#line 244 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
					global::haxe.lang.Function __temp_odecl233 = ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (ret) ), ((string) ("handleResolve") ), ((int) (2144664612) ))) );
					#line 242 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
					__temp_stmt235 = new global::haxe.lang.DynamicObject(new global::Array<int>(new int[]{641597244, 1963057964}), new global::Array<object>(new object[]{((global::promhx.@base.AsyncBase) (ret) ), __temp_odecl233}), new global::Array<int>(new int[]{}), new global::Array<double>(new double[]{}));
				}
				
				#line 242 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				this._update.push(__temp_stmt235);
				#line 246 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				object __temp_stmt236 = default(object);
				#line 246 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				{
					#line 248 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
					global::haxe.lang.Function __temp_odecl234 = ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (ret) ), ((string) ("handleResolve") ), ((int) (2144664612) ))) );
					#line 246 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
					__temp_stmt236 = new global::haxe.lang.DynamicObject(new global::Array<int>(new int[]{641597244, 1963057964}), new global::Array<object>(new object[]{((global::promhx.@base.AsyncBase) (ret) ), __temp_odecl234}), new global::Array<int>(new int[]{}), new global::Array<double>(new double[]{}));
				}
				
				#line 246 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				s._update.push(__temp_stmt236);
				#line 250 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				global::promhx.@base.AsyncBase<object>.immediateLinkUpdate<T, T>(this, ret, new global::promhx.Stream_merge_250__Fun<T>());
				global::promhx.@base.AsyncBase<object>.immediateLinkUpdate<T, T>(s, ret, new global::promhx.Stream_merge_251__Fun<T>());
				return ret;
			}
			#line default
		}
		
		
		public override   object __hx_setField(string field, int hash, object @value, bool handleProperties){
			unchecked {
				#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				switch (hash){
					case 309375522:
					{
						#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
						this._end_deferred = ((global::promhx.Deferred<object>) (global::promhx.Deferred<object>.__hx_cast<object>(((global::promhx.Deferred) (@value) ))) );
						#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
						return @value;
					}
					
					
					case 1975036920:
					{
						#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
						this._end_promise = ((global::promhx.Promise<object>) (global::promhx.Promise<object>.__hx_cast<object>(((global::promhx.Promise) (@value) ))) );
						#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
						return @value;
					}
					
					
					case 1058556124:
					{
						#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
						this._end = global::haxe.lang.Runtime.toBool(@value);
						#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
						return @value;
					}
					
					
					case 960437815:
					{
						#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
						this._pause = global::haxe.lang.Runtime.toBool(@value);
						#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
						return @value;
					}
					
					
					case 2067595039:
					{
						#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
						this.deferred = ((global::promhx.Deferred<T>) (global::promhx.Deferred<object>.__hx_cast<T>(((global::promhx.Deferred) (@value) ))) );
						#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
						return @value;
					}
					
					
					default:
					{
						#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
						return base.__hx_setField(field, hash, @value, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_getField(string field, int hash, bool throwErrors, bool isCheck, bool handleProperties){
			unchecked {
				#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				switch (hash){
					case 96903864:
					{
						#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("merge") ), ((int) (96903864) ))) );
					}
					
					
					case 1204816148:
					{
						#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("concat") ), ((int) (1204816148) ))) );
					}
					
					
					case 87367608:
					{
						#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("filter") ), ((int) (87367608) ))) );
					}
					
					
					case 790674520:
					{
						#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("endThen") ), ((int) (790674520) ))) );
					}
					
					
					case 5047259:
					{
						#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("end") ), ((int) (5047259) ))) );
					}
					
					
					case 710340883:
					{
						#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("handleEnd") ), ((int) (710340883) ))) );
					}
					
					
					case 1891659798:
					{
						#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("errorPipe") ), ((int) (1891659798) ))) );
					}
					
					
					case 1247278126:
					{
						#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("pipe") ), ((int) (1247278126) ))) );
					}
					
					
					case 1029166838:
					{
						#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("pause") ), ((int) (1029166838) ))) );
					}
					
					
					case 2144664612:
					{
						#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("handleResolve") ), ((int) (2144664612) ))) );
					}
					
					
					case 10319920:
					{
						#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("first") ), ((int) (10319920) ))) );
					}
					
					
					case 1589257779:
					{
						#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("detachStream") ), ((int) (1589257779) ))) );
					}
					
					
					case 1291584221:
					{
						#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("then") ), ((int) (1291584221) ))) );
					}
					
					
					case 309375522:
					{
						#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
						return this._end_deferred;
					}
					
					
					case 1975036920:
					{
						#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
						return this._end_promise;
					}
					
					
					case 1058556124:
					{
						#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
						return this._end;
					}
					
					
					case 960437815:
					{
						#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
						return this._pause;
					}
					
					
					case 2067595039:
					{
						#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
						return this.deferred;
					}
					
					
					default:
					{
						#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
						return base.__hx_getField(field, hash, throwErrors, isCheck, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_invokeField(string field, int hash, global::Array dynargs){
			unchecked {
				#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				switch (hash){
					case 1291584221:case 2144664612:
					{
						#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
						return global::haxe.lang.Runtime.slowCallField(this, field, dynargs);
					}
					
					
					case 96903864:
					{
						#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
						return this.merge(((global::promhx.Stream<T>) (global::promhx.Stream<object>.__hx_cast<T>(((global::promhx.Stream) (dynargs[0]) ))) ));
					}
					
					
					case 1204816148:
					{
						#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
						return this.concat(((global::promhx.Stream<T>) (global::promhx.Stream<object>.__hx_cast<T>(((global::promhx.Stream) (dynargs[0]) ))) ));
					}
					
					
					case 87367608:
					{
						#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
						return this.filter(((global::haxe.lang.Function) (dynargs[0]) ));
					}
					
					
					case 790674520:
					{
						#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
						return this.endThen<object>(((global::haxe.lang.Function) (dynargs[0]) ));
					}
					
					
					case 5047259:
					{
						#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
						return this.end();
					}
					
					
					case 710340883:
					{
						#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
						this.handleEnd();
						#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
						break;
					}
					
					
					case 1891659798:
					{
						#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
						return this.errorPipe(((global::haxe.lang.Function) (dynargs[0]) ));
					}
					
					
					case 1247278126:
					{
						#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
						return this.pipe<object>(((global::haxe.lang.Function) (dynargs[0]) ));
					}
					
					
					case 1029166838:
					{
						#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
						this.pause(global::haxe.lang.Null<object>.ofDynamic<bool>(dynargs[0]));
						#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
						break;
					}
					
					
					case 10319920:
					{
						#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
						return this.first();
					}
					
					
					case 1589257779:
					{
						#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
						return this.detachStream(((global::promhx.Stream) (dynargs[0]) ));
					}
					
					
					default:
					{
						#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
						return base.__hx_invokeField(field, hash, dynargs);
					}
					
				}
				
				#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				return default(object);
			}
			#line default
		}
		
		
		public override   void __hx_getFields(global::Array<object> baseArr){
			unchecked {
				#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				baseArr.push("_end_deferred");
				#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				baseArr.push("_end_promise");
				#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				baseArr.push("_end");
				#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				baseArr.push("_pause");
				#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				baseArr.push("deferred");
				#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				{
					#line 13 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
					base.__hx_getFields(baseArr);
				}
				
			}
			#line default
		}
		
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace promhx{
	public  class Stream_then_84__Fun<A, T> : global::haxe.lang.Function {
		public    Stream_then_84__Fun(global::Array<object> next, global::Array<object> f1) : base(1, 0){
			unchecked {
				#line 84 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				this.next = next;
				#line 84 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				this.f1 = f1;
			}
			#line default
		}
		
		
		public override   object __hx_invoke1_o(double __fn_float1, object __fn_dyn1){
			unchecked {
				#line 84 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				T x = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (global::haxe.lang.Runtime.genericCast<T>(((object) (__fn_float1) ))) : (global::haxe.lang.Runtime.genericCast<T>(__fn_dyn1)) );
				#line 84 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				((global::promhx.@base.AsyncBase<A>) (global::promhx.@base.AsyncBase<object>.__hx_cast<A>(((global::promhx.@base.AsyncBase) (this.next[0]) ))) ).handleResolve(global::haxe.lang.Runtime.genericCast<A>(((global::haxe.lang.Function) (this.f1[0]) ).__hx_invoke1_o(default(double), x)));
				#line 84 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				return default(object);
			}
			#line default
		}
		
		
		public  global::Array<object> next;
		
		public  global::Array<object> f1;
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace promhx{
	public  class Stream_then_85__Fun<A, T> : global::haxe.lang.Function {
		public    Stream_then_85__Fun(global::Array<object> ret) : base(1, 0){
			unchecked {
				#line 85 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				this.ret = ret;
			}
			#line default
		}
		
		
		public override   object __hx_invoke1_o(double __fn_float1, object __fn_dyn1){
			unchecked {
				#line 85 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				global::haxe.ds.Option x1 = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (((global::haxe.ds.Option) (((object) (__fn_float1) )) )) : (((global::haxe.ds.Option) (__fn_dyn1) )) );
				#line 85 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				((global::promhx.Stream<A>) (global::promhx.Stream<object>.__hx_cast<A>(((global::promhx.Stream) (this.ret[0]) ))) ).end();
				#line 85 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				return default(object);
			}
			#line default
		}
		
		
		public  global::Array<object> ret;
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace promhx{
	public  class Stream_first_135__Fun<T> : global::haxe.lang.Function {
		public    Stream_first_135__Fun(global::Array<object> s) : base(1, 0){
			unchecked {
				#line 135 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				this.s = s;
			}
			#line default
		}
		
		
		public override   object __hx_invoke1_o(double __fn_float1, object __fn_dyn1){
			unchecked {
				#line 135 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				T x = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (global::haxe.lang.Runtime.genericCast<T>(((object) (__fn_float1) ))) : (global::haxe.lang.Runtime.genericCast<T>(__fn_dyn1)) );
				#line 135 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				if ( ! (((global::promhx.Promise<T>) (global::promhx.Promise<object>.__hx_cast<T>(((global::promhx.Promise) (this.s[0]) ))) )._resolved) ) {
					#line 135 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
					((global::promhx.Promise<T>) (global::promhx.Promise<object>.__hx_cast<T>(((global::promhx.Promise) (this.s[0]) ))) ).handleResolve(x);
				}
				
				#line 135 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				return default(object);
			}
			#line default
		}
		
		
		public  global::Array<object> s;
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace promhx{
	public  class Stream_pipe_154__Fun_0<A> : global::haxe.lang.Function {
		public    Stream_pipe_154__Fun_0() : base(1, 0){
			unchecked {
			}
			#line default
		}
		
		
		public override   object __hx_invoke1_o(double __fn_float1, object __fn_dyn1){
			unchecked {
				#line 154 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				A x1 = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (global::haxe.lang.Runtime.genericCast<A>(((object) (__fn_float1) ))) : (global::haxe.lang.Runtime.genericCast<A>(__fn_dyn1)) );
				#line 154 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				return x1;
			}
			#line default
		}
		
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace promhx{
	public  class Stream_pipe_154__Fun<A, T> : global::haxe.lang.Function {
		public    Stream_pipe_154__Fun(global::Array<object> f1, global::Array<bool> linked, global::Array<object> ret1) : base(1, 0){
			unchecked {
				#line 154 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				this.f1 = f1;
				#line 154 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				this.linked = linked;
				#line 154 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				this.ret1 = ret1;
			}
			#line default
		}
		
		
		public override   object __hx_invoke1_o(double __fn_float1, object __fn_dyn1){
			unchecked {
				#line 154 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				T x = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (global::haxe.lang.Runtime.genericCast<T>(((object) (__fn_float1) ))) : (global::haxe.lang.Runtime.genericCast<T>(__fn_dyn1)) );
				#line 154 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				if ( ! (this.linked[0]) ) {
					#line 154 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
					this.linked[0] = true;
					#line 154 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
					global::promhx.@base.AsyncBase<A> pipe_ret = ((global::promhx.@base.AsyncBase<A>) (global::promhx.@base.AsyncBase<object>.__hx_cast<A>(((global::promhx.@base.AsyncBase) (((global::haxe.lang.Function) (this.f1[0]) ).__hx_invoke1_o(default(double), x)) ))) );
					#line 154 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
					object __temp_stmt244 = default(object);
					#line 154 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
					{
						#line 154 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
						global::promhx.@base.AsyncBase<A> __temp_odecl242 = ((global::promhx.@base.AsyncBase<A>) (global::promhx.@base.AsyncBase<object>.__hx_cast<A>(((global::promhx.@base.AsyncBase) (this.ret1[0]) ))) );
						#line 154 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
						global::haxe.lang.Function __temp_odecl243 = ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((global::promhx.@base.AsyncBase<A>) (global::promhx.@base.AsyncBase<object>.__hx_cast<A>(((global::promhx.@base.AsyncBase) (this.ret1[0]) ))) ), ((string) ("handleResolve") ), ((int) (2144664612) ))) );
						#line 154 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
						__temp_stmt244 = new global::haxe.lang.DynamicObject(new global::Array<int>(new int[]{641597244, 1963057964}), new global::Array<object>(new object[]{__temp_odecl242, __temp_odecl243}), new global::Array<int>(new int[]{}), new global::Array<double>(new double[]{}));
					}
					
					#line 154 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
					pipe_ret._update.push(__temp_stmt244);
					#line 154 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
					global::promhx.@base.AsyncBase<object>.immediateLinkUpdate<A, A>(pipe_ret, ((global::promhx.@base.AsyncBase<A>) (global::promhx.@base.AsyncBase<object>.__hx_cast<A>(((global::promhx.@base.AsyncBase) (this.ret1[0]) ))) ), new global::promhx.Stream_pipe_154__Fun_0<A>());
				}
				
				#line 154 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				return default(object);
			}
			#line default
		}
		
		
		public  global::Array<object> f1;
		
		public  global::Array<bool> linked;
		
		public  global::Array<object> ret1;
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace promhx{
	public  class Stream_pipe_155__Fun<A, T> : global::haxe.lang.Function {
		public    Stream_pipe_155__Fun(global::Array<object> ret) : base(1, 0){
			unchecked {
				#line 155 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				this.ret = ret;
			}
			#line default
		}
		
		
		public override   object __hx_invoke1_o(double __fn_float1, object __fn_dyn1){
			unchecked {
				#line 155 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				global::haxe.ds.Option x2 = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (((global::haxe.ds.Option) (((object) (__fn_float1) )) )) : (((global::haxe.ds.Option) (__fn_dyn1) )) );
				#line 155 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				((global::promhx.Stream<A>) (global::promhx.Stream<object>.__hx_cast<A>(((global::promhx.Stream) (this.ret[0]) ))) ).end();
				#line 155 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				return default(object);
			}
			#line default
		}
		
		
		public  global::Array<object> ret;
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace promhx{
	public  class Stream_errorPipe_164__Fun<T> : global::haxe.lang.Function {
		public    Stream_errorPipe_164__Fun(global::Array<object> f1, global::Array<object> ret) : base(1, 0){
			unchecked {
				#line 164 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				this.f1 = f1;
				#line 164 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				this.ret = ret;
			}
			#line default
		}
		
		
		public override   object __hx_invoke1_o(double __fn_float1, object __fn_dyn1){
			unchecked {
				#line 164 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				object e = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (((object) (__fn_float1) )) : (((object) (__fn_dyn1) )) );
				global::promhx.Stream<T> piped = ((global::promhx.Stream<T>) (global::promhx.Stream<object>.__hx_cast<T>(((global::promhx.Stream) (((global::haxe.lang.Function) (this.f1[0]) ).__hx_invoke1_o(default(double), e)) ))) );
				global::promhx.Stream<object>.__hx_cast<object>(((global::promhx.Stream) (piped.then<object>(((global::haxe.lang.Function) (new global::haxe.lang.Closure(((global::promhx.Stream<T>) (global::promhx.Stream<object>.__hx_cast<T>(((global::promhx.Stream) (this.ret[0]) ))) ), ((string) ("_resolve") ), ((int) (555248749) ))) ))) ));
				global::promhx.Promise<object>.__hx_cast<object>(((global::promhx.Promise) (piped._end_promise.then<object>(((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (((global::promhx.Stream<T>) (global::promhx.Stream<object>.__hx_cast<T>(((global::promhx.Stream) (this.ret[0]) ))) )._end_promise) ), ((string) ("_resolve") ), ((int) (555248749) ))) ))) ));
				#line 164 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				return default(object);
			}
			#line default
		}
		
		
		public  global::Array<object> f1;
		
		public  global::Array<object> ret;
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace promhx{
	public  class Stream_errorPipe_170__Fun<T> : global::haxe.lang.Function {
		public    Stream_errorPipe_170__Fun(global::Array<object> ret) : base(1, 0){
			unchecked {
				#line 170 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				this.ret = ret;
			}
			#line default
		}
		
		
		public override   object __hx_invoke1_o(double __fn_float1, object __fn_dyn1){
			unchecked {
				#line 170 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				global::haxe.ds.Option x = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (((global::haxe.ds.Option) (((object) (__fn_float1) )) )) : (((global::haxe.ds.Option) (__fn_dyn1) )) );
				#line 170 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				((global::promhx.Stream<T>) (global::promhx.Stream<object>.__hx_cast<T>(((global::promhx.Stream) (this.ret[0]) ))) ).end();
				#line 170 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				return default(object);
			}
			#line default
		}
		
		
		public  global::Array<object> ret;
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace promhx{
	public  class Stream_filter_207__Fun<T> : global::haxe.lang.Function {
		public    Stream_filter_207__Fun(global::Array<object> ret, global::Array<object> f1) : base(1, 0){
			unchecked {
				#line 207 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				this.ret = ret;
				#line 207 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				this.f1 = f1;
			}
			#line default
		}
		
		
		public override   object __hx_invoke1_o(double __fn_float1, object __fn_dyn1){
			unchecked {
				#line 207 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				T x = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (global::haxe.lang.Runtime.genericCast<T>(((object) (__fn_float1) ))) : (global::haxe.lang.Runtime.genericCast<T>(__fn_dyn1)) );
				#line 207 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				if (global::haxe.lang.Runtime.toBool(((global::haxe.lang.Function) (this.f1[0]) ).__hx_invoke1_o(default(double), x))) {
					#line 207 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
					((global::promhx.Stream<T>) (global::promhx.Stream<object>.__hx_cast<T>(((global::promhx.Stream) (this.ret[0]) ))) ).handleResolve(x);
				}
				
				#line 207 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
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
	public  class Stream_filter_209__Fun<T> : global::haxe.lang.Function {
		public    Stream_filter_209__Fun() : base(1, 0){
			unchecked {
			}
			#line default
		}
		
		
		public override   object __hx_invoke1_o(double __fn_float1, object __fn_dyn1){
			unchecked {
				#line 209 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				T x1 = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (global::haxe.lang.Runtime.genericCast<T>(((object) (__fn_float1) ))) : (global::haxe.lang.Runtime.genericCast<T>(__fn_dyn1)) );
				#line 209 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				return x1;
			}
			#line default
		}
		
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace promhx{
	public  class Stream_concat_224__Fun<T> : global::haxe.lang.Function {
		public    Stream_concat_224__Fun() : base(1, 0){
			unchecked {
			}
			#line default
		}
		
		
		public override   object __hx_invoke1_o(double __fn_float1, object __fn_dyn1){
			unchecked {
				#line 224 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				T x = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (global::haxe.lang.Runtime.genericCast<T>(((object) (__fn_float1) ))) : (global::haxe.lang.Runtime.genericCast<T>(__fn_dyn1)) );
				#line 224 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				return x;
			}
			#line default
		}
		
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace promhx{
	public  class Stream_concat_226__Fun<T> : global::haxe.lang.Function {
		public    Stream_concat_226__Fun(global::Array<object> ret) : base(1, 0){
			unchecked {
				#line 226 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				this.ret = ret;
			}
			#line default
		}
		
		
		public override   object __hx_invoke1_o(double __fn_float1, object __fn_dyn1){
			unchecked {
				#line 226 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				T x1 = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (global::haxe.lang.Runtime.genericCast<T>(((object) (__fn_float1) ))) : (global::haxe.lang.Runtime.genericCast<T>(__fn_dyn1)) );
				((global::promhx.Stream<T>) (global::promhx.Stream<object>.__hx_cast<T>(((global::promhx.Stream) (this.ret[0]) ))) ).handleResolve(x1);
				return ((global::promhx.Stream<T>) (global::promhx.Stream<object>.__hx_cast<T>(((global::promhx.Stream) (this.ret[0]) ))) );
			}
			#line default
		}
		
		
		public  global::Array<object> ret;
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace promhx{
	public  class Stream_concat_230__Fun<T> : global::haxe.lang.Function {
		public    Stream_concat_230__Fun(global::Array<object> ret) : base(1, 0){
			unchecked {
				#line 231 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				this.ret = ret;
			}
			#line default
		}
		
		
		public override   object __hx_invoke1_o(double __fn_float1, object __fn_dyn1){
			unchecked {
				#line 230 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				global::haxe.ds.Option _1 = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (((global::haxe.ds.Option) (((object) (__fn_float1) )) )) : (((global::haxe.ds.Option) (__fn_dyn1) )) );
				((global::promhx.Stream<T>) (global::promhx.Stream<object>.__hx_cast<T>(((global::promhx.Stream) (this.ret[0]) ))) ).end();
				#line 231 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				return default(object);
			}
			#line default
		}
		
		
		public  global::Array<object> ret;
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace promhx{
	public  class Stream_concat_225__Fun<T> : global::haxe.lang.Function {
		public    Stream_concat_225__Fun(global::Array<object> ret, global::Array<object> s1) : base(1, 0){
			unchecked {
				#line 225 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				this.ret = ret;
				#line 225 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				this.s1 = s1;
			}
			#line default
		}
		
		
		public override   object __hx_invoke1_o(double __fn_float1, object __fn_dyn1){
			unchecked {
				#line 225 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				global::haxe.ds.Option _ = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (((global::haxe.ds.Option) (((object) (__fn_float1) )) )) : (((global::haxe.ds.Option) (__fn_dyn1) )) );
				((global::promhx.Stream<T>) (global::promhx.Stream<object>.__hx_cast<T>(((global::promhx.Stream) (this.s1[0]) ))) ).pipe<T>(new global::promhx.Stream_concat_226__Fun<T>(((global::Array<object>) (this.ret) )));
				#line 230 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				global::promhx.Promise<object>.__hx_cast<object>(((global::promhx.Promise) (((global::promhx.Stream<T>) (global::promhx.Stream<object>.__hx_cast<T>(((global::promhx.Stream) (this.s1[0]) ))) )._end_promise.then<object>(new global::promhx.Stream_concat_230__Fun<T>(((global::Array<object>) (this.ret) )))) ));
				#line 225 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				return default(object);
			}
			#line default
		}
		
		
		public  global::Array<object> ret;
		
		public  global::Array<object> s1;
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace promhx{
	public  class Stream_merge_250__Fun<T> : global::haxe.lang.Function {
		public    Stream_merge_250__Fun() : base(1, 0){
			unchecked {
			}
			#line default
		}
		
		
		public override   object __hx_invoke1_o(double __fn_float1, object __fn_dyn1){
			unchecked {
				#line 250 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				T x = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (global::haxe.lang.Runtime.genericCast<T>(((object) (__fn_float1) ))) : (global::haxe.lang.Runtime.genericCast<T>(__fn_dyn1)) );
				#line 250 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				return x;
			}
			#line default
		}
		
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace promhx{
	public  class Stream_merge_251__Fun<T> : global::haxe.lang.Function {
		public    Stream_merge_251__Fun() : base(1, 0){
			unchecked {
			}
			#line default
		}
		
		
		public override   object __hx_invoke1_o(double __fn_float1, object __fn_dyn1){
			unchecked {
				#line 251 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				T x1 = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (global::haxe.lang.Runtime.genericCast<T>(((object) (__fn_float1) ))) : (global::haxe.lang.Runtime.genericCast<T>(__fn_dyn1)) );
				#line 251 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				return x1;
			}
			#line default
		}
		
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace promhx{
	public  class Stream_wheneverAll_106__Fun_0<T2> : global::haxe.lang.Function {
		public    Stream_wheneverAll_106__Fun_0(global::Array<object> next, global::Array<object> all) : base(3, 0){
			unchecked {
				#line 106 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				this.next = next;
				#line 106 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				this.all = all;
			}
			#line default
		}
		
		
		public override   object __hx_invoke3_o(double __fn_float1, object __fn_dyn1, double __fn_float2, object __fn_dyn2, double __fn_float3, object __fn_dyn3){
			unchecked {
				#line 106 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				T2 v = ( (global::haxe.lang.Runtime.eq(__fn_dyn3, global::haxe.lang.Runtime.undefined)) ? (global::haxe.lang.Runtime.genericCast<T2>(((object) (__fn_float3) ))) : (global::haxe.lang.Runtime.genericCast<T2>(__fn_dyn3)) );
				#line 106 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				global::promhx.@base.AsyncBase<T2> current = ( (global::haxe.lang.Runtime.eq(__fn_dyn2, global::haxe.lang.Runtime.undefined)) ? (((global::promhx.@base.AsyncBase<T2>) (global::promhx.@base.AsyncBase<object>.__hx_cast<T2>(((global::promhx.@base.AsyncBase) (((object) (__fn_float2) )) ))) )) : (((global::promhx.@base.AsyncBase<T2>) (global::promhx.@base.AsyncBase<object>.__hx_cast<T2>(((global::promhx.@base.AsyncBase) (__fn_dyn2) ))) )) );
				#line 106 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				global::Array<object> arr = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (((object) (__fn_float1) )) ))) )) : (((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (__fn_dyn1) ))) )) );
				#line 106 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				if (( ( arr.length == 0 ) || global::promhx.@base.AsyncBase<object>.allFulfilled(arr) )) {
					#line 106 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
					global::Array<T2> vals = default(global::Array<T2>);
					#line 106 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
					{
						#line 106 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
						global::Array<T2> _g = new global::Array<T2>(new T2[]{});
						#line 106 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
						{
							#line 106 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
							object __temp_iterator163 = ((object) (global::haxe.lang.Runtime.callField(this.all[0], "iterator", 328878574, default(global::Array))) );
							#line 106 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
							while (global::haxe.lang.Runtime.toBool(global::haxe.lang.Runtime.callField(__temp_iterator163, "hasNext", 407283053, default(global::Array)))){
								#line 106 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
								global::promhx.@base.AsyncBase<T2> a = ((global::promhx.@base.AsyncBase<T2>) (global::promhx.@base.AsyncBase<object>.__hx_cast<T2>(((global::promhx.@base.AsyncBase) (global::haxe.lang.Runtime.callField(__temp_iterator163, "next", 1224901875, default(global::Array))) ))) );
								#line 106 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
								_g.push(( (( a == current )) ? (v) : (a._val) ));
							}
							
						}
						
						#line 106 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
						vals = _g;
					}
					
					#line 106 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
					((global::promhx.@base.AsyncBase<object>) (global::promhx.@base.AsyncBase<object>.__hx_cast<object>(((global::promhx.@base.AsyncBase) (this.next[0]) ))) ).handleResolve(vals);
				}
				
				#line 106 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				return default(object);
			}
			#line default
		}
		
		
		public  global::Array<object> next;
		
		public  global::Array<object> all;
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace promhx{
	public  class Stream_wheneverAll_106__Fun<T2> : global::haxe.lang.Function {
		public    Stream_wheneverAll_106__Fun(global::Array<object> a21, global::Array<object> f, global::Array<object> a11) : base(1, 0){
			unchecked {
				#line 106 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				this.a21 = a21;
				#line 106 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				this.f = f;
				#line 106 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				this.a11 = a11;
			}
			#line default
		}
		
		
		public override   object __hx_invoke1_o(double __fn_float1, object __fn_dyn1){
			unchecked {
				#line 106 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				T2 v1 = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (global::haxe.lang.Runtime.genericCast<T2>(((object) (__fn_float1) ))) : (global::haxe.lang.Runtime.genericCast<T2>(__fn_dyn1)) );
				#line 106 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/Stream.hx"
				return ((global::haxe.lang.Function) (this.f[0]) ).__hx_invoke3_o(default(double), ((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (this.a11[0]) ))) ), default(double), ((global::promhx.@base.AsyncBase<T2>) (global::promhx.@base.AsyncBase<object>.__hx_cast<T2>(((global::promhx.@base.AsyncBase) (this.a21[0]) ))) ), default(double), v1);
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
	public  interface Stream : global::haxe.lang.IHxObject, global::promhx.@base.AsyncBase, global::haxe.lang.IGenericObject {
		   object promhx_Stream_cast<T_c>();
		
	}
}


