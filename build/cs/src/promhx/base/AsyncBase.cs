
#pragma warning disable 109, 114, 219, 429, 168, 162
namespace promhx.@base{
	public  class AsyncBase<T> : global::haxe.lang.HxObject, global::promhx.@base.AsyncBase {
		public    AsyncBase(global::haxe.lang.EmptyObject empty){
			unchecked {
				#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				{
				}
				
			}
			#line default
		}
		
		
		public    AsyncBase(global::promhx.Deferred<T> d){
			unchecked {
				#line 40 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				global::promhx.@base.AsyncBase<object>.__hx_ctor_promhx_base_AsyncBase<T>(this, d);
			}
			#line default
		}
		
		
		public static   void __hx_ctor_promhx_base_AsyncBase<T_c>(global::promhx.@base.AsyncBase<T_c> __temp_me25, global::promhx.Deferred<T_c> d){
			unchecked {
				#line 42 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				__temp_me25._resolved = false;
				__temp_me25._pending = false;
				__temp_me25._errorPending = false;
				__temp_me25._fulfilled = false;
				__temp_me25._update = new global::Array<object>(new object[]{});
				__temp_me25._error = new global::Array<object>(new object[]{});
				__temp_me25._errored = false;
				#line 50 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				if (( d != default(global::promhx.Deferred<T_c>) )) {
					#line 51 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
					global::Array<object> next = new global::Array<object>(new object[]{__temp_me25});
					#line 51 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
					global::Array<object> f = new global::Array<object>(new object[]{new global::promhx.@base.AsyncBase___hx_ctor_promhx_base_AsyncBase_51__Fun_0<T_c>()});
					#line 51 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
					object __temp_stmt183 = default(object);
					#line 51 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
					{
						#line 51 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						global::promhx.@base.AsyncBase<T_c> __temp_odecl181 = ((global::promhx.@base.AsyncBase<T_c>) (global::promhx.@base.AsyncBase<object>.__hx_cast<T_c>(((global::promhx.@base.AsyncBase) (next[0]) ))) );
						#line 51 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						global::haxe.lang.Function __temp_odecl182 = new global::promhx.@base.AsyncBase___hx_ctor_promhx_base_AsyncBase_51__Fun<T_c>(((global::Array<object>) (next) ), ((global::Array<object>) (f) ));
						#line 51 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						__temp_stmt183 = new global::haxe.lang.DynamicObject(new global::Array<int>(new int[]{641597244, 1963057964}), new global::Array<object>(new object[]{__temp_odecl181, __temp_odecl182}), new global::Array<int>(new int[]{}), new global::Array<double>(new double[]{}));
					}
					
					#line 51 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
					d._update.push(__temp_stmt183);
					#line 51 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
					global::promhx.@base.AsyncBase<object>.immediateLinkUpdate<T_c, T_c>(d, ((global::promhx.@base.AsyncBase<T_c>) (global::promhx.@base.AsyncBase<object>.__hx_cast<T_c>(((global::promhx.@base.AsyncBase) (next[0]) ))) ), ((global::haxe.lang.Function) (f[0]) ));
				}
				
			}
			#line default
		}
		
		
		public static   object __hx_cast<T_c_c>(global::promhx.@base.AsyncBase me){
			unchecked {
				#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				return ( (( me != default(global::promhx.@base.AsyncBase) )) ? (me.promhx_base_AsyncBase_cast<T_c_c>()) : (default(global::promhx.@base.AsyncBase)) );
			}
			#line default
		}
		
		
		public static   void link<A, B>(global::promhx.@base.AsyncBase<A> current, global::promhx.@base.AsyncBase<B> next, global::haxe.lang.Function f){
			unchecked {
				#line 216 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				global::Array<object> f1 = new global::Array<object>(new object[]{f});
				#line 216 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				global::Array<object> next1 = new global::Array<object>(new object[]{next});
				#line 222 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				object __temp_stmt186 = default(object);
				#line 222 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				{
					#line 223 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
					global::promhx.@base.AsyncBase<B> __temp_odecl184 = ((global::promhx.@base.AsyncBase<B>) (global::promhx.@base.AsyncBase<object>.__hx_cast<B>(((global::promhx.@base.AsyncBase) (next1[0]) ))) );
					global::haxe.lang.Function __temp_odecl185 = new global::promhx.@base.AsyncBase_link_224__Fun<B, A>(((global::Array<object>) (next1) ), ((global::Array<object>) (f1) ));
					#line 222 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
					__temp_stmt186 = new global::haxe.lang.DynamicObject(new global::Array<int>(new int[]{641597244, 1963057964}), new global::Array<object>(new object[]{__temp_odecl184, __temp_odecl185}), new global::Array<int>(new int[]{}), new global::Array<double>(new double[]{}));
				}
				
				#line 222 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				current._update.push(__temp_stmt186);
				#line 228 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				global::promhx.@base.AsyncBase<object>.immediateLinkUpdate<A, B>(current, ((global::promhx.@base.AsyncBase<B>) (global::promhx.@base.AsyncBase<object>.__hx_cast<B>(((global::promhx.@base.AsyncBase) (next1[0]) ))) ), ((global::haxe.lang.Function) (f1[0]) ));
			}
			#line default
		}
		
		
		public static   void immediateLinkUpdate<A, B>(global::promhx.@base.AsyncBase<A> current, global::promhx.@base.AsyncBase<B> next, global::haxe.lang.Function f){
			unchecked {
				#line 235 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				if (current._errored) {
					#line 235 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
					next.handleError(current._errorVal);
				}
				
				#line 238 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				if (( current._resolved &&  ! (current._pending)  )) {
					#line 243 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
					try {
						#line 243 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						next.handleResolve(global::haxe.lang.Runtime.genericCast<B>(f.__hx_invoke1_o(default(double), current._val)));
					}
					catch (global::System.Exception __temp_catchallException187){
						#line 243 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						global::haxe.lang.Exceptions.exception = __temp_catchallException187;
						object __temp_catchall188 = __temp_catchallException187;
						#line 244 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						if (( __temp_catchall188 is global::haxe.lang.HaxeException )) {
							#line 244 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
							__temp_catchall188 = ((global::haxe.lang.HaxeException) (__temp_catchallException187) ).obj;
						}
						
						#line 244 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						{
							#line 244 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
							object e = __temp_catchall188;
							#line 244 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
							next.handleError(e);
						}
						
					}
					
					
				}
				
			}
			#line default
		}
		
		
		public static   void linkAll<T1>(object all, global::promhx.@base.AsyncBase<object> next){
			unchecked {
				#line 250 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				global::Array<object> next1 = new global::Array<object>(new object[]{next});
				#line 250 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				global::Array<object> all1 = new global::Array<object>(new object[]{all});
				#line 257 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				global::haxe.lang.Function cthen = new global::promhx.@base.AsyncBase_linkAll_257__Fun<T1>(((global::Array<object>) (next1) ), ((global::Array<object>) (all1) ));
				#line 264 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				{
					#line 264 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
					object __temp_iterator150 = ((object) (global::haxe.lang.Runtime.callField(all1[0], "iterator", 328878574, default(global::Array))) );
					#line 264 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
					while (global::haxe.lang.Runtime.toBool(global::haxe.lang.Runtime.callField(__temp_iterator150, "hasNext", 407283053, default(global::Array)))){
						#line 264 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						global::promhx.@base.AsyncBase<T1> a1 = ((global::promhx.@base.AsyncBase<T1>) (global::promhx.@base.AsyncBase<object>.__hx_cast<T1>(((global::promhx.@base.AsyncBase) (global::haxe.lang.Runtime.callField(__temp_iterator150, "next", 1224901875, default(global::Array))) ))) );
						object __temp_stmt191 = default(object);
						#line 265 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						{
							#line 266 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
							global::promhx.@base.AsyncBase<object> __temp_odecl189 = ((global::promhx.@base.AsyncBase<object>) (global::promhx.@base.AsyncBase<object>.__hx_cast<object>(((global::promhx.@base.AsyncBase) (next1[0]) ))) );
							global::haxe.lang.Function __temp_odecl190 = default(global::haxe.lang.Function);
							#line 267 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
							{
								#line 267 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
								global::Array<object> f = new global::Array<object>(new object[]{cthen});
								#line 267 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
								global::Array<object> __temp_stmt192 = default(global::Array<object>);
								#line 267 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
								{
									#line 267 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
									global::Array<object> _g1 = new global::Array<object>(new object[]{});
									#line 267 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
									{
										#line 267 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
										object __temp_iterator151 = ((object) (global::haxe.lang.Runtime.callField(all1[0], "iterator", 328878574, default(global::Array))) );
										#line 267 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
										while (global::haxe.lang.Runtime.toBool(global::haxe.lang.Runtime.callField(__temp_iterator151, "hasNext", 407283053, default(global::Array)))){
											#line 267 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
											global::promhx.@base.AsyncBase<T1> a2 = ((global::promhx.@base.AsyncBase<T1>) (global::promhx.@base.AsyncBase<object>.__hx_cast<T1>(((global::promhx.@base.AsyncBase) (global::haxe.lang.Runtime.callField(__temp_iterator151, "next", 1224901875, default(global::Array))) ))) );
											#line 267 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
											if (( a2 != a1 )) {
												#line 267 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
												_g1.push(a2);
											}
											
										}
										
									}
									
									#line 267 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
									__temp_stmt192 = _g1;
								}
								
								#line 267 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
								global::Array<object> a11 = new global::Array<object>(new object[]{__temp_stmt192});
								#line 267 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
								global::Array<object> a21 = new global::Array<object>(new object[]{a1});
								#line 267 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
								__temp_odecl190 = new global::promhx.@base.AsyncBase_linkAll_267__Fun<T1>(((global::Array<object>) (a21) ), ((global::Array<object>) (a11) ), ((global::Array<object>) (f) ));
							}
							
							#line 265 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
							__temp_stmt191 = new global::haxe.lang.DynamicObject(new global::Array<int>(new int[]{641597244, 1963057964}), new global::Array<object>(new object[]{__temp_odecl189, __temp_odecl190}), new global::Array<int>(new int[]{}), new global::Array<double>(new double[]{}));
						}
						
						#line 265 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						a1._update.push(__temp_stmt191);
					}
					
				}
				
				#line 271 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				if (global::promhx.@base.AsyncBase<object>.allFulfilled(all1[0])) {
					#line 272 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
					global::Array<T1> __temp_stmt193 = default(global::Array<T1>);
					#line 272 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
					{
						#line 272 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						global::Array<T1> _g2 = new global::Array<T1>(new T1[]{});
						#line 272 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						{
							#line 272 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
							object __temp_iterator152 = ((object) (global::haxe.lang.Runtime.callField(all1[0], "iterator", 328878574, default(global::Array))) );
							#line 272 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
							while (global::haxe.lang.Runtime.toBool(global::haxe.lang.Runtime.callField(__temp_iterator152, "hasNext", 407283053, default(global::Array)))){
								#line 272 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
								global::promhx.@base.AsyncBase<T1> a3 = ((global::promhx.@base.AsyncBase<T1>) (global::promhx.@base.AsyncBase<object>.__hx_cast<T1>(((global::promhx.@base.AsyncBase) (global::haxe.lang.Runtime.callField(__temp_iterator152, "next", 1224901875, default(global::Array))) ))) );
								#line 272 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
								_g2.push(a3._val);
							}
							
						}
						
						#line 272 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						__temp_stmt193 = _g2;
					}
					
					#line 272 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
					((global::promhx.@base.AsyncBase<object>) (global::promhx.@base.AsyncBase<object>.__hx_cast<object>(((global::promhx.@base.AsyncBase) (next1[0]) ))) ).handleResolve(__temp_stmt193);
				}
				
			}
			#line default
		}
		
		
		public static   void pipeLink<A, B>(global::promhx.@base.AsyncBase<A> current, global::promhx.@base.AsyncBase<B> ret, global::haxe.lang.Function f){
			unchecked {
				#line 280 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				global::Array<object> f1 = new global::Array<object>(new object[]{f});
				#line 280 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				global::Array<object> ret1 = new global::Array<object>(new object[]{ret});
				#line 283 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				global::Array<bool> linked = new global::Array<bool>(new bool[]{false});
				global::haxe.lang.Function linkf = new global::promhx.@base.AsyncBase_pipeLink_284__Fun<B, A>(((global::Array<bool>) (linked) ), ((global::Array<object>) (ret1) ), ((global::Array<object>) (f1) ));
				#line 296 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				object __temp_stmt197 = default(object);
				#line 296 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				{
					#line 297 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
					global::promhx.@base.AsyncBase<B> __temp_odecl196 = ((global::promhx.@base.AsyncBase<B>) (global::promhx.@base.AsyncBase<object>.__hx_cast<B>(((global::promhx.@base.AsyncBase) (ret1[0]) ))) );
					#line 296 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
					__temp_stmt197 = new global::haxe.lang.DynamicObject(new global::Array<int>(new int[]{641597244, 1963057964}), new global::Array<object>(new object[]{__temp_odecl196, linkf}), new global::Array<int>(new int[]{}), new global::Array<double>(new double[]{}));
				}
				
				#line 296 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				current._update.push(__temp_stmt197);
				#line 301 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				if (( current._resolved &&  ! (current._pending)  )) {
					#line 305 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
					try {
						#line 305 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						linkf.__hx_invoke1_o(default(double), current._val);
					}
					catch (global::System.Exception __temp_catchallException194){
						#line 305 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						global::haxe.lang.Exceptions.exception = __temp_catchallException194;
						object __temp_catchall195 = __temp_catchallException194;
						#line 306 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						if (( __temp_catchall195 is global::haxe.lang.HaxeException )) {
							#line 306 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
							__temp_catchall195 = ((global::haxe.lang.HaxeException) (__temp_catchallException194) ).obj;
						}
						
						#line 306 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						{
							#line 306 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
							object e = __temp_catchall195;
							#line 306 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
							((global::promhx.@base.AsyncBase<B>) (global::promhx.@base.AsyncBase<object>.__hx_cast<B>(((global::promhx.@base.AsyncBase) (ret1[0]) ))) ).handleError(e);
						}
						
					}
					
					
				}
				
			}
			#line default
		}
		
		
		public static   bool allResolved(object @as){
			unchecked {
				#line 317 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				{
					#line 317 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
					object __temp_iterator153 = ((object) (global::haxe.lang.Runtime.callField(@as, "iterator", 328878574, default(global::Array))) );
					#line 317 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
					while (global::haxe.lang.Runtime.toBool(global::haxe.lang.Runtime.callField(__temp_iterator153, "hasNext", 407283053, default(global::Array)))){
						#line 317 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						global::promhx.@base.AsyncBase a = ((global::promhx.@base.AsyncBase) (global::haxe.lang.Runtime.callField(__temp_iterator153, "next", 1224901875, default(global::Array))) );
						if (( ! (global::haxe.lang.Runtime.toBool(global::haxe.lang.Runtime.getField(a, "_resolved", 1413903191, true))) )) {
							#line 318 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
							return false;
						}
						
					}
					
				}
				
				#line 320 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				return true;
			}
			#line default
		}
		
		
		public static   bool allFulfilled(object @as){
			unchecked {
				#line 330 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				{
					#line 330 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
					object __temp_iterator154 = ((object) (global::haxe.lang.Runtime.callField(@as, "iterator", 328878574, default(global::Array))) );
					#line 330 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
					while (global::haxe.lang.Runtime.toBool(global::haxe.lang.Runtime.callField(__temp_iterator154, "hasNext", 407283053, default(global::Array)))){
						#line 330 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						global::promhx.@base.AsyncBase a = ((global::promhx.@base.AsyncBase) (global::haxe.lang.Runtime.callField(__temp_iterator154, "next", 1224901875, default(global::Array))) );
						if (( ! (global::haxe.lang.Runtime.toBool(global::haxe.lang.Runtime.getField(a, "_fulfilled", 471703904, true))) )) {
							#line 331 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
							return false;
						}
						
					}
					
				}
				
				#line 333 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				return true;
			}
			#line default
		}
		
		
		public static  new object __hx_createEmpty(){
			unchecked {
				#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				return new global::promhx.@base.AsyncBase<object>(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) ));
			}
			#line default
		}
		
		
		public static  new object __hx_create(global::Array arr){
			unchecked {
				#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				return new global::promhx.@base.AsyncBase<object>(((global::promhx.Deferred<object>) (global::promhx.Deferred<object>.__hx_cast<object>(((global::promhx.Deferred) (arr[0]) ))) ));
			}
			#line default
		}
		
		
		public virtual   object promhx_base_AsyncBase_cast<T_c>(){
			unchecked {
				#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				if (global::haxe.lang.Runtime.eq(typeof(T), typeof(T_c))) {
					#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
					return this;
				}
				
				#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				global::promhx.@base.AsyncBase<T_c> new_me = new global::promhx.@base.AsyncBase<T_c>(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) ));
				#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				{
					#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
					object __temp_iterator148 = global::Reflect.fields(this).iterator();
					#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
					while (global::haxe.lang.Runtime.toBool(global::haxe.lang.Runtime.callField(__temp_iterator148, "hasNext", 407283053, default(global::Array)))){
						#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						string field = global::haxe.lang.Runtime.toString(global::haxe.lang.Runtime.callField(__temp_iterator148, "next", 1224901875, default(global::Array)));
						#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						switch (field){
							default:
							{
								#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
								global::Reflect.setField(new_me, field, ((object) (global::Reflect.field(this, field)) ));
								#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
								break;
							}
							
						}
						
					}
					
				}
				
				#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				return new_me;
			}
			#line default
		}
		
		
		public  T _val;
		
		public  bool _resolved;
		
		public  bool _fulfilled;
		
		public  bool _pending;
		
		public  global::Array<object> _update;
		
		public  global::Array<object> _error;
		
		public  bool _errored;
		
		public  global::haxe.lang.Function _errorMap;
		
		public  object _errorVal;
		
		public  bool _errorPending;
		
		public virtual   global::promhx.@base.AsyncBase<T> catchError(global::haxe.lang.Function f){
			unchecked {
				#line 62 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				this._error.push(f);
				return this;
			}
			#line default
		}
		
		
		public virtual   global::promhx.@base.AsyncBase<T> errorThen(global::haxe.lang.Function f){
			unchecked {
				#line 70 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				this._errorMap = f;
				return this;
			}
			#line default
		}
		
		
		public   bool isResolved(){
			unchecked {
				#line 78 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				return this._resolved;
			}
			#line default
		}
		
		
		public   bool isErrored(){
			unchecked {
				#line 84 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				return this._errored;
			}
			#line default
		}
		
		
		public   bool isFulfilled(){
			unchecked {
				#line 91 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				return this._fulfilled;
			}
			#line default
		}
		
		
		public   bool isPending(){
			unchecked {
				#line 98 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				return this._pending;
			}
			#line default
		}
		
		
		public virtual   void handleResolve(T val){
			unchecked {
				#line 102 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				this._resolve(val);
			}
			#line default
		}
		
		
		public virtual   void _resolve(T val){
			unchecked {
				#line 107 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				global::Array<T> val1 = new global::Array<T>(new T[]{val});
				#line 107 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				global::Array<object> _g = new global::Array<object>(new object[]{this});
				#line 111 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				if (this._pending) {
					#line 112 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
					global::haxe.lang.Function __temp_stmt177 = default(global::haxe.lang.Function);
					#line 112 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
					{
						#line 112 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						global::Array<object> f = new global::Array<object>(new object[]{((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("_resolve") ), ((int) (555248749) ))) )});
						#line 112 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						global::Array<T> a1 = new global::Array<T>(new T[]{val1[0]});
						#line 112 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						__temp_stmt177 = new global::promhx.@base.AsyncBase__resolve_112__Fun<T>(((global::Array<T>) (a1) ), ((global::Array<object>) (f) ));
					}
					
					#line 112 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
					global::promhx.@base.EventLoop.queue.@add(__temp_stmt177);
					#line 112 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
					global::promhx.@base.EventLoop.continueOnNextLoop();
				}
				 else {
					#line 116 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
					this._resolved = true;
					#line 120 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
					this._pending = true;
					#line 123 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
					{
						#line 123 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						global::promhx.@base.EventLoop.queue.@add(new global::promhx.@base.AsyncBase__resolve_123__Fun<T>(((global::Array<T>) (val1) ), ((global::Array<object>) (_g) )));
						#line 123 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						global::promhx.@base.EventLoop.continueOnNextLoop();
					}
					
				}
				
			}
			#line default
		}
		
		
		public virtual   void handleError(object error){
			unchecked {
				#line 144 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				this._handleError(error);
			}
			#line default
		}
		
		
		public virtual   void _handleError(object error){
			unchecked {
				#line 147 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				global::Array error1 = new global::Array<object>(new object[]{error});
				#line 147 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				global::Array<object> _g = new global::Array<object>(new object[]{this});
				global::Array<object> update_errors = new global::Array<object>(new object[]{new global::promhx.@base.AsyncBase__handleError_148__Fun<T>(((global::Array<object>) (_g) ))});
				#line 161 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				if ( ! (this._errorPending) ) {
					#line 162 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
					this._errorPending = true;
					this._errored = true;
					this._errorVal = error1[0];
					#line 166 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
					{
						#line 166 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						global::promhx.@base.EventLoop.queue.@add(new global::promhx.@base.AsyncBase__handleError_166__Fun<T>(((global::Array) (error1) ), ((global::Array<object>) (update_errors) ), ((global::Array<object>) (_g) )));
						#line 166 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						global::promhx.@base.EventLoop.continueOnNextLoop();
					}
					
				}
				
			}
			#line default
		}
		
		
		public virtual   global::promhx.@base.AsyncBase<A> then<A>(global::haxe.lang.Function f){
			unchecked {
				#line 187 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				global::promhx.@base.AsyncBase<A> ret = new global::promhx.@base.AsyncBase<A>(((global::promhx.Deferred<A>) (default(global::promhx.Deferred<A>)) ));
				{
					#line 188 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
					global::Array<object> next = new global::Array<object>(new object[]{ret});
					#line 188 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
					global::Array<object> f1 = new global::Array<object>(new object[]{f});
					#line 188 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
					object __temp_stmt180 = default(object);
					#line 188 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
					{
						#line 188 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						global::promhx.@base.AsyncBase<A> __temp_odecl178 = ((global::promhx.@base.AsyncBase<A>) (global::promhx.@base.AsyncBase<object>.__hx_cast<A>(((global::promhx.@base.AsyncBase) (next[0]) ))) );
						#line 188 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						global::haxe.lang.Function __temp_odecl179 = new global::promhx.@base.AsyncBase_then_188__Fun<A, T>(((global::Array<object>) (f1) ), ((global::Array<object>) (next) ));
						#line 188 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						__temp_stmt180 = new global::haxe.lang.DynamicObject(new global::Array<int>(new int[]{641597244, 1963057964}), new global::Array<object>(new object[]{__temp_odecl178, __temp_odecl179}), new global::Array<int>(new int[]{}), new global::Array<double>(new double[]{}));
					}
					
					#line 188 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
					this._update.push(__temp_stmt180);
					#line 188 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
					global::promhx.@base.AsyncBase<object>.immediateLinkUpdate<T, A>(this, ((global::promhx.@base.AsyncBase<A>) (global::promhx.@base.AsyncBase<object>.__hx_cast<A>(((global::promhx.@base.AsyncBase) (next[0]) ))) ), ((global::haxe.lang.Function) (f1[0]) ));
				}
				
				#line 189 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				return ret;
			}
			#line default
		}
		
		
		public virtual   void unlink(global::promhx.@base.AsyncBase to){
			unchecked {
				#line 196 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				global::Array<object> to1 = new global::Array<object>(new object[]{to});
				#line 196 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				global::Array<object> _g = new global::Array<object>(new object[]{this});
				{
					#line 197 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
					global::promhx.@base.EventLoop.queue.@add(new global::promhx.@base.AsyncBase_unlink_197__Fun<T>(((global::Array<object>) (_g) ), ((global::Array<object>) (to1) )));
					#line 197 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
					global::promhx.@base.EventLoop.continueOnNextLoop();
				}
				
			}
			#line default
		}
		
		
		public virtual   bool isLinked(global::promhx.@base.AsyncBase to){
			unchecked {
				#line 206 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				bool updated = false;
				{
					#line 207 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
					int _g = 0;
					#line 207 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
					global::Array<object> _g1 = this._update;
					#line 207 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
					while (( _g < _g1.length )){
						#line 207 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						object u = _g1[_g];
						#line 207 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						 ++ _g;
						#line 207 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						if (( ((global::promhx.@base.AsyncBase) (global::haxe.lang.Runtime.getField(u, "async", 641597244, true)) ) == to )) {
							#line 207 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
							return true;
						}
						
					}
					
				}
				
				#line 208 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				return updated;
			}
			#line default
		}
		
		
		public override   double __hx_setField_f(string field, int hash, double @value, bool handleProperties){
			unchecked {
				#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				switch (hash){
					case 651251544:
					{
						#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						this._errorVal = ((object) (@value) );
						#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						return @value;
					}
					
					
					case 1059398626:
					{
						#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						this._val = global::haxe.lang.Runtime.genericCast<T>(((object) (@value) ));
						#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						return ((double) (global::haxe.lang.Runtime.toDouble(((object) (@value) ))) );
					}
					
					
					default:
					{
						#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						return base.__hx_setField_f(field, hash, @value, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_setField(string field, int hash, object @value, bool handleProperties){
			unchecked {
				#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				switch (hash){
					case 1066078286:
					{
						#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						this._errorPending = global::haxe.lang.Runtime.toBool(@value);
						#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						return @value;
					}
					
					
					case 651251544:
					{
						#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						this._errorVal = ((object) (@value) );
						#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						return @value;
					}
					
					
					case 650803987:
					{
						#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						this._errorMap = ((global::haxe.lang.Function) (@value) );
						#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						return @value;
					}
					
					
					case 599981992:
					{
						#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						this._errored = global::haxe.lang.Runtime.toBool(@value);
						#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						return @value;
					}
					
					
					case 1863389961:
					{
						#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						this._error = ((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (@value) ))) );
						#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						return @value;
					}
					
					
					case 1971099560:
					{
						#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						this._update = ((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (@value) ))) );
						#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						return @value;
					}
					
					
					case 1705308632:
					{
						#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						this._pending = global::haxe.lang.Runtime.toBool(@value);
						#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						return @value;
					}
					
					
					case 471703904:
					{
						#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						this._fulfilled = global::haxe.lang.Runtime.toBool(@value);
						#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						return @value;
					}
					
					
					case 1413903191:
					{
						#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						this._resolved = global::haxe.lang.Runtime.toBool(@value);
						#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						return @value;
					}
					
					
					case 1059398626:
					{
						#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						this._val = global::haxe.lang.Runtime.genericCast<T>(@value);
						#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						return @value;
					}
					
					
					default:
					{
						#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						return base.__hx_setField(field, hash, @value, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_getField(string field, int hash, bool throwErrors, bool isCheck, bool handleProperties){
			unchecked {
				#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				switch (hash){
					case 1158577763:
					{
						#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("isLinked") ), ((int) (1158577763) ))) );
					}
					
					
					case 1703419603:
					{
						#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("unlink") ), ((int) (1703419603) ))) );
					}
					
					
					case 1291584221:
					{
						#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("then") ), ((int) (1291584221) ))) );
					}
					
					
					case 192750849:
					{
						#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("_handleError") ), ((int) (192750849) ))) );
					}
					
					
					case 628324096:
					{
						#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("handleError") ), ((int) (628324096) ))) );
					}
					
					
					case 555248749:
					{
						#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("_resolve") ), ((int) (555248749) ))) );
					}
					
					
					case 2144664612:
					{
						#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("handleResolve") ), ((int) (2144664612) ))) );
					}
					
					
					case 803935629:
					{
						#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("isPending") ), ((int) (803935629) ))) );
					}
					
					
					case 519822421:
					{
						#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("isFulfilled") ), ((int) (519822421) ))) );
					}
					
					
					case 1846092637:
					{
						#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("isErrored") ), ((int) (1846092637) ))) );
					}
					
					
					case 123702786:
					{
						#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("isResolved") ), ((int) (123702786) ))) );
					}
					
					
					case 1935965893:
					{
						#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("errorThen") ), ((int) (1935965893) ))) );
					}
					
					
					case 1700956557:
					{
						#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("catchError") ), ((int) (1700956557) ))) );
					}
					
					
					case 1066078286:
					{
						#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						return this._errorPending;
					}
					
					
					case 651251544:
					{
						#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						return this._errorVal;
					}
					
					
					case 650803987:
					{
						#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						return this._errorMap;
					}
					
					
					case 599981992:
					{
						#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						return this._errored;
					}
					
					
					case 1863389961:
					{
						#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						return this._error;
					}
					
					
					case 1971099560:
					{
						#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						return this._update;
					}
					
					
					case 1705308632:
					{
						#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						return this._pending;
					}
					
					
					case 471703904:
					{
						#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						return this._fulfilled;
					}
					
					
					case 1413903191:
					{
						#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						return this._resolved;
					}
					
					
					case 1059398626:
					{
						#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						return this._val;
					}
					
					
					default:
					{
						#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						return base.__hx_getField(field, hash, throwErrors, isCheck, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   double __hx_getField_f(string field, int hash, bool throwErrors, bool handleProperties){
			unchecked {
				#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				switch (hash){
					case 651251544:
					{
						#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						return ((double) (global::haxe.lang.Runtime.toDouble(this._errorVal)) );
					}
					
					
					case 1059398626:
					{
						#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						return ((double) (global::haxe.lang.Runtime.toDouble(((object) (this._val) ))) );
					}
					
					
					default:
					{
						#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						return base.__hx_getField_f(field, hash, throwErrors, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_invokeField(string field, int hash, global::Array dynargs){
			unchecked {
				#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				switch (hash){
					case 1158577763:
					{
						#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						return this.isLinked(((global::promhx.@base.AsyncBase) (dynargs[0]) ));
					}
					
					
					case 1703419603:
					{
						#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						this.unlink(((global::promhx.@base.AsyncBase) (dynargs[0]) ));
						#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						break;
					}
					
					
					case 1291584221:
					{
						#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						return this.then<object>(((global::haxe.lang.Function) (dynargs[0]) ));
					}
					
					
					case 192750849:
					{
						#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						this._handleError(dynargs[0]);
						#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						break;
					}
					
					
					case 628324096:
					{
						#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						this.handleError(dynargs[0]);
						#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						break;
					}
					
					
					case 555248749:
					{
						#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						this._resolve(global::haxe.lang.Runtime.genericCast<T>(dynargs[0]));
						#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						break;
					}
					
					
					case 2144664612:
					{
						#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						this.handleResolve(global::haxe.lang.Runtime.genericCast<T>(dynargs[0]));
						#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						break;
					}
					
					
					case 803935629:
					{
						#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						return this.isPending();
					}
					
					
					case 519822421:
					{
						#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						return this.isFulfilled();
					}
					
					
					case 1846092637:
					{
						#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						return this.isErrored();
					}
					
					
					case 123702786:
					{
						#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						return this.isResolved();
					}
					
					
					case 1935965893:
					{
						#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						return this.errorThen(((global::haxe.lang.Function) (dynargs[0]) ));
					}
					
					
					case 1700956557:
					{
						#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						return this.catchError(((global::haxe.lang.Function) (dynargs[0]) ));
					}
					
					
					default:
					{
						#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						return base.__hx_invokeField(field, hash, dynargs);
					}
					
				}
				
				#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				return default(object);
			}
			#line default
		}
		
		
		public override   void __hx_getFields(global::Array<object> baseArr){
			unchecked {
				#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				baseArr.push("_errorPending");
				#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				baseArr.push("_errorVal");
				#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				baseArr.push("_errorMap");
				#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				baseArr.push("_errored");
				#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				baseArr.push("_error");
				#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				baseArr.push("_update");
				#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				baseArr.push("_pending");
				#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				baseArr.push("_fulfilled");
				#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				baseArr.push("_resolved");
				#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				baseArr.push("_val");
				#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				{
					#line 23 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
					base.__hx_getFields(baseArr);
				}
				
			}
			#line default
		}
		
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace promhx.@base{
	public  class AsyncBase__resolve_112__Fun<T> : global::haxe.lang.Function {
		public    AsyncBase__resolve_112__Fun(global::Array<T> a1, global::Array<object> f) : base(0, 0){
			unchecked {
				#line 112 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				this.a1 = a1;
				#line 112 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				this.f = f;
			}
			#line default
		}
		
		
		public override   object __hx_invoke0_o(){
			unchecked {
				#line 112 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				return ((global::haxe.lang.Function) (this.f[0]) ).__hx_invoke1_o(default(double), this.a1[0]);
			}
			#line default
		}
		
		
		public  global::Array<T> a1;
		
		public  global::Array<object> f;
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace promhx.@base{
	public  class AsyncBase__resolve_123__Fun<T> : global::haxe.lang.Function {
		public    AsyncBase__resolve_123__Fun(global::Array<T> val1, global::Array<object> _g) : base(0, 0){
			unchecked {
				#line 123 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				this.val1 = val1;
				#line 123 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				this._g = _g;
			}
			#line default
		}
		
		
		public override   object __hx_invoke0_o(){
			unchecked {
				#line 124 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				((global::promhx.@base.AsyncBase<T>) (global::promhx.@base.AsyncBase<object>.__hx_cast<T>(((global::promhx.@base.AsyncBase) (this._g[0]) ))) )._val = this.val1[0];
				{
					#line 125 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
					int _g1 = 0;
					#line 125 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
					global::Array<object> _g2 = ((global::promhx.@base.AsyncBase<T>) (global::promhx.@base.AsyncBase<object>.__hx_cast<T>(((global::promhx.@base.AsyncBase) (this._g[0]) ))) )._update;
					#line 125 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
					while (( _g1 < _g2.length )){
						#line 125 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						object up = _g2[_g1];
						#line 125 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						 ++ _g1;
						#line 129 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						try {
							#line 129 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
							global::haxe.lang.Runtime.callField(up, "linkf", 1963057964, new global::Array<object>(new object[]{this.val1[0]}));
						}
						catch (global::System.Exception __temp_catchallException198){
							#line 129 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
							global::haxe.lang.Exceptions.exception = __temp_catchallException198;
							object __temp_catchall199 = __temp_catchallException198;
							#line 130 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
							if (( __temp_catchall199 is global::haxe.lang.HaxeException )) {
								#line 130 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
								__temp_catchall199 = ((global::haxe.lang.HaxeException) (__temp_catchallException198) ).obj;
							}
							
							#line 130 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
							{
								#line 130 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
								object e = __temp_catchall199;
								#line 130 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
								global::haxe.lang.Runtime.callField(((global::promhx.@base.AsyncBase) (global::haxe.lang.Runtime.getField(up, "async", 641597244, true)) ), "handleError", 628324096, new global::Array<object>(new object[]{e}));
							}
							
						}
						
						
					}
					
				}
				
				#line 133 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				((global::promhx.@base.AsyncBase<T>) (global::promhx.@base.AsyncBase<object>.__hx_cast<T>(((global::promhx.@base.AsyncBase) (this._g[0]) ))) )._fulfilled = true;
				((global::promhx.@base.AsyncBase<T>) (global::promhx.@base.AsyncBase<object>.__hx_cast<T>(((global::promhx.@base.AsyncBase) (this._g[0]) ))) )._pending = false;
				#line 123 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				return default(object);
			}
			#line default
		}
		
		
		public  global::Array<T> val1;
		
		public  global::Array<object> _g;
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace promhx.@base{
	public  class AsyncBase__handleError_148__Fun<T> : global::haxe.lang.Function {
		public    AsyncBase__handleError_148__Fun(global::Array<object> _g) : base(1, 0){
			unchecked {
				#line 148 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				this._g = _g;
			}
			#line default
		}
		
		
		public override   object __hx_invoke1_o(double __fn_float1, object __fn_dyn1){
			unchecked {
				#line 148 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				object e = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (((object) (__fn_float1) )) : (((object) (__fn_dyn1) )) );
				#line 150 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				if (( ((global::promhx.@base.AsyncBase<T>) (global::promhx.@base.AsyncBase<object>.__hx_cast<T>(((global::promhx.@base.AsyncBase) (this._g[0]) ))) )._error.length > 0 )) {
					#line 150 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
					int _g1 = 0;
					#line 150 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
					global::Array<object> _g2 = ((global::promhx.@base.AsyncBase<T>) (global::promhx.@base.AsyncBase<object>.__hx_cast<T>(((global::promhx.@base.AsyncBase) (this._g[0]) ))) )._error;
					#line 150 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
					while (( _g1 < _g2.length )){
						#line 150 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						global::haxe.lang.Function ef = ((global::haxe.lang.Function) (_g2[_g1]) );
						#line 150 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						 ++ _g1;
						#line 150 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						ef.__hx_invoke1_o(default(double), e);
					}
					
				}
				 else {
					#line 151 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
					if (( ((global::promhx.@base.AsyncBase<T>) (global::promhx.@base.AsyncBase<object>.__hx_cast<T>(((global::promhx.@base.AsyncBase) (this._g[0]) ))) )._update.length > 0 )) {
						#line 151 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						int _g11 = 0;
						#line 151 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						global::Array<object> _g21 = ((global::promhx.@base.AsyncBase<T>) (global::promhx.@base.AsyncBase<object>.__hx_cast<T>(((global::promhx.@base.AsyncBase) (this._g[0]) ))) )._update;
						#line 151 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						while (( _g11 < _g21.length )){
							#line 151 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
							object up = _g21[_g11];
							#line 151 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
							 ++ _g11;
							#line 151 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
							global::haxe.lang.Runtime.callField(((global::promhx.@base.AsyncBase) (global::haxe.lang.Runtime.getField(up, "async", 641597244, true)) ), "handleError", 628324096, new global::Array<object>(new object[]{e}));
						}
						
					}
					 else {
						#line 157 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						throw global::haxe.lang.HaxeException.wrap(e);
					}
					
				}
				
				#line 159 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				((global::promhx.@base.AsyncBase<T>) (global::promhx.@base.AsyncBase<object>.__hx_cast<T>(((global::promhx.@base.AsyncBase) (this._g[0]) ))) )._errorPending = false;
				#line 148 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				return default(object);
			}
			#line default
		}
		
		
		public  global::Array<object> _g;
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace promhx.@base{
	public  class AsyncBase__handleError_166__Fun<T> : global::haxe.lang.Function {
		public    AsyncBase__handleError_166__Fun(global::Array error1, global::Array<object> update_errors, global::Array<object> _g) : base(0, 0){
			unchecked {
				#line 167 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				this.error1 = error1;
				#line 167 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				this.update_errors = update_errors;
				#line 167 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				this._g = _g;
			}
			#line default
		}
		
		
		public override   object __hx_invoke0_o(){
			unchecked {
				#line 167 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				if (( ((global::promhx.@base.AsyncBase<T>) (global::promhx.@base.AsyncBase<object>.__hx_cast<T>(((global::promhx.@base.AsyncBase) (this._g[0]) ))) )._errorMap != default(global::haxe.lang.Function) )) {
					#line 172 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
					try {
						#line 172 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						((global::promhx.@base.AsyncBase<T>) (global::promhx.@base.AsyncBase<object>.__hx_cast<T>(((global::promhx.@base.AsyncBase) (this._g[0]) ))) )._resolve(global::haxe.lang.Runtime.genericCast<T>(((global::promhx.@base.AsyncBase<T>) (global::promhx.@base.AsyncBase<object>.__hx_cast<T>(((global::promhx.@base.AsyncBase) (this._g[0]) ))) )._errorMap.__hx_invoke1_o(default(double), this.error1[0])));
					}
					catch (global::System.Exception __temp_catchallException200){
						#line 172 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						global::haxe.lang.Exceptions.exception = __temp_catchallException200;
						object __temp_catchall201 = __temp_catchallException200;
						#line 173 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						if (( __temp_catchall201 is global::haxe.lang.HaxeException )) {
							#line 173 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
							__temp_catchall201 = ((global::haxe.lang.HaxeException) (__temp_catchallException200) ).obj;
						}
						
						#line 173 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						{
							#line 173 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
							object e1 = __temp_catchall201;
							#line 173 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
							((global::haxe.lang.Function) (this.update_errors[0]) ).__hx_invoke1_o(default(double), e1);
						}
						
					}
					
					
				}
				 else {
					#line 176 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
					((global::haxe.lang.Function) (this.update_errors[0]) ).__hx_invoke1_o(default(double), this.error1[0]);
				}
				
				#line 167 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				return default(object);
			}
			#line default
		}
		
		
		public  global::Array error1;
		
		public  global::Array<object> update_errors;
		
		public  global::Array<object> _g;
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace promhx.@base{
	public  class AsyncBase_then_188__Fun<A, T> : global::haxe.lang.Function {
		public    AsyncBase_then_188__Fun(global::Array<object> f1, global::Array<object> next) : base(1, 0){
			unchecked {
				#line 188 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				this.f1 = f1;
				#line 188 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				this.next = next;
			}
			#line default
		}
		
		
		public override   object __hx_invoke1_o(double __fn_float1, object __fn_dyn1){
			unchecked {
				#line 188 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				T x = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (global::haxe.lang.Runtime.genericCast<T>(((object) (__fn_float1) ))) : (global::haxe.lang.Runtime.genericCast<T>(__fn_dyn1)) );
				#line 188 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				((global::promhx.@base.AsyncBase<A>) (global::promhx.@base.AsyncBase<object>.__hx_cast<A>(((global::promhx.@base.AsyncBase) (this.next[0]) ))) ).handleResolve(global::haxe.lang.Runtime.genericCast<A>(((global::haxe.lang.Function) (this.f1[0]) ).__hx_invoke1_o(default(double), x)));
				#line 188 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				return default(object);
			}
			#line default
		}
		
		
		public  global::Array<object> f1;
		
		public  global::Array<object> next;
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace promhx.@base{
	public  class AsyncBase_unlink_198__Fun<T> : global::haxe.lang.Function {
		public    AsyncBase_unlink_198__Fun(global::Array<object> to1) : base(1, 0){
			unchecked {
				#line 198 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				this.to1 = to1;
			}
			#line default
		}
		
		
		public override   object __hx_invoke1_o(double __fn_float1, object __fn_dyn1){
			unchecked {
				#line 198 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				object x = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (((object) (__fn_float1) )) : (((object) (__fn_dyn1) )) );
				#line 198 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				return ( ((global::promhx.@base.AsyncBase) (global::haxe.lang.Runtime.getField(x, "async", 641597244, true)) ) != ((global::promhx.@base.AsyncBase) (this.to1[0]) ) );
			}
			#line default
		}
		
		
		public  global::Array<object> to1;
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace promhx.@base{
	public  class AsyncBase_unlink_197__Fun<T> : global::haxe.lang.Function {
		public    AsyncBase_unlink_197__Fun(global::Array<object> _g, global::Array<object> to1) : base(0, 0){
			unchecked {
				#line 198 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				this._g = _g;
				#line 198 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				this.to1 = to1;
			}
			#line default
		}
		
		
		public override   object __hx_invoke0_o(){
			unchecked {
				#line 198 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				((global::promhx.@base.AsyncBase<T>) (global::promhx.@base.AsyncBase<object>.__hx_cast<T>(((global::promhx.@base.AsyncBase) (this._g[0]) ))) )._update = ((global::promhx.@base.AsyncBase<T>) (global::promhx.@base.AsyncBase<object>.__hx_cast<T>(((global::promhx.@base.AsyncBase) (this._g[0]) ))) )._update.filter(new global::promhx.@base.AsyncBase_unlink_198__Fun<T>(((global::Array<object>) (this.to1) )));
				#line 198 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				return default(object);
			}
			#line default
		}
		
		
		public  global::Array<object> _g;
		
		public  global::Array<object> to1;
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace promhx.@base{
	public  class AsyncBase___hx_ctor_promhx_base_AsyncBase_51__Fun_0<T_c> : global::haxe.lang.Function {
		public    AsyncBase___hx_ctor_promhx_base_AsyncBase_51__Fun_0() : base(1, 0){
			unchecked {
			}
			#line default
		}
		
		
		public override   object __hx_invoke1_o(double __fn_float1, object __fn_dyn1){
			unchecked {
				#line 51 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				T_c x = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (global::haxe.lang.Runtime.genericCast<T_c>(((object) (__fn_float1) ))) : (global::haxe.lang.Runtime.genericCast<T_c>(__fn_dyn1)) );
				#line 51 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				return x;
			}
			#line default
		}
		
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace promhx.@base{
	public  class AsyncBase___hx_ctor_promhx_base_AsyncBase_51__Fun<T_c> : global::haxe.lang.Function {
		public    AsyncBase___hx_ctor_promhx_base_AsyncBase_51__Fun(global::Array<object> next, global::Array<object> f) : base(1, 0){
			unchecked {
				#line 51 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				this.next = next;
				#line 51 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				this.f = f;
			}
			#line default
		}
		
		
		public override   object __hx_invoke1_o(double __fn_float1, object __fn_dyn1){
			unchecked {
				#line 51 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				T_c x1 = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (global::haxe.lang.Runtime.genericCast<T_c>(((object) (__fn_float1) ))) : (global::haxe.lang.Runtime.genericCast<T_c>(__fn_dyn1)) );
				#line 51 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				((global::promhx.@base.AsyncBase<T_c>) (global::promhx.@base.AsyncBase<object>.__hx_cast<T_c>(((global::promhx.@base.AsyncBase) (this.next[0]) ))) ).handleResolve(global::haxe.lang.Runtime.genericCast<T_c>(((global::haxe.lang.Function) (this.f[0]) ).__hx_invoke1_o(default(double), x1)));
				#line 51 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				return default(object);
			}
			#line default
		}
		
		
		public  global::Array<object> next;
		
		public  global::Array<object> f;
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace promhx.@base{
	public  class AsyncBase_link_224__Fun<B, A> : global::haxe.lang.Function {
		public    AsyncBase_link_224__Fun(global::Array<object> next1, global::Array<object> f1) : base(1, 0){
			unchecked {
				#line 225 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				this.next1 = next1;
				#line 225 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				this.f1 = f1;
			}
			#line default
		}
		
		
		public override   object __hx_invoke1_o(double __fn_float1, object __fn_dyn1){
			unchecked {
				#line 224 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				A x = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (global::haxe.lang.Runtime.genericCast<A>(((object) (__fn_float1) ))) : (global::haxe.lang.Runtime.genericCast<A>(__fn_dyn1)) );
				((global::promhx.@base.AsyncBase<B>) (global::promhx.@base.AsyncBase<object>.__hx_cast<B>(((global::promhx.@base.AsyncBase) (this.next1[0]) ))) ).handleResolve(global::haxe.lang.Runtime.genericCast<B>(((global::haxe.lang.Function) (this.f1[0]) ).__hx_invoke1_o(default(double), x)));
				#line 225 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				return default(object);
			}
			#line default
		}
		
		
		public  global::Array<object> next1;
		
		public  global::Array<object> f1;
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace promhx.@base{
	public  class AsyncBase_linkAll_257__Fun<T1> : global::haxe.lang.Function {
		public    AsyncBase_linkAll_257__Fun(global::Array<object> next1, global::Array<object> all1) : base(3, 0){
			unchecked {
				#line 257 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				this.next1 = next1;
				#line 257 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				this.all1 = all1;
			}
			#line default
		}
		
		
		public override   object __hx_invoke3_o(double __fn_float1, object __fn_dyn1, double __fn_float2, object __fn_dyn2, double __fn_float3, object __fn_dyn3){
			unchecked {
				#line 257 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				T1 v = ( (global::haxe.lang.Runtime.eq(__fn_dyn3, global::haxe.lang.Runtime.undefined)) ? (global::haxe.lang.Runtime.genericCast<T1>(((object) (__fn_float3) ))) : (global::haxe.lang.Runtime.genericCast<T1>(__fn_dyn3)) );
				#line 257 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				global::promhx.@base.AsyncBase<T1> current = ( (global::haxe.lang.Runtime.eq(__fn_dyn2, global::haxe.lang.Runtime.undefined)) ? (((global::promhx.@base.AsyncBase<T1>) (global::promhx.@base.AsyncBase<object>.__hx_cast<T1>(((global::promhx.@base.AsyncBase) (((object) (__fn_float2) )) ))) )) : (((global::promhx.@base.AsyncBase<T1>) (global::promhx.@base.AsyncBase<object>.__hx_cast<T1>(((global::promhx.@base.AsyncBase) (__fn_dyn2) ))) )) );
				#line 257 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				global::Array<object> arr = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (((object) (__fn_float1) )) ))) )) : (((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (__fn_dyn1) ))) )) );
				if (( ( arr.length == 0 ) || global::promhx.@base.AsyncBase<object>.allFulfilled(arr) )) {
					#line 259 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
					global::Array<T1> vals = default(global::Array<T1>);
					#line 259 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
					{
						#line 259 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						global::Array<T1> _g = new global::Array<T1>(new T1[]{});
						#line 259 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						{
							#line 259 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
							object __temp_iterator149 = ((object) (global::haxe.lang.Runtime.callField(this.all1[0], "iterator", 328878574, default(global::Array))) );
							#line 259 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
							while (global::haxe.lang.Runtime.toBool(global::haxe.lang.Runtime.callField(__temp_iterator149, "hasNext", 407283053, default(global::Array)))){
								#line 259 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
								global::promhx.@base.AsyncBase<T1> a = ((global::promhx.@base.AsyncBase<T1>) (global::promhx.@base.AsyncBase<object>.__hx_cast<T1>(((global::promhx.@base.AsyncBase) (global::haxe.lang.Runtime.callField(__temp_iterator149, "next", 1224901875, default(global::Array))) ))) );
								#line 259 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
								_g.push(( (( a == current )) ? (v) : (a._val) ));
							}
							
						}
						
						#line 259 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						vals = _g;
					}
					
					#line 260 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
					((global::promhx.@base.AsyncBase<object>) (global::promhx.@base.AsyncBase<object>.__hx_cast<object>(((global::promhx.@base.AsyncBase) (this.next1[0]) ))) ).handleResolve(vals);
				}
				
				#line 262 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				return default(object);
			}
			#line default
		}
		
		
		public  global::Array<object> next1;
		
		public  global::Array<object> all1;
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace promhx.@base{
	public  class AsyncBase_linkAll_267__Fun<T1> : global::haxe.lang.Function {
		public    AsyncBase_linkAll_267__Fun(global::Array<object> a21, global::Array<object> a11, global::Array<object> f) : base(1, 0){
			unchecked {
				#line 267 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				this.a21 = a21;
				#line 267 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				this.a11 = a11;
				#line 267 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				this.f = f;
			}
			#line default
		}
		
		
		public override   object __hx_invoke1_o(double __fn_float1, object __fn_dyn1){
			unchecked {
				#line 267 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				T1 v1 = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (global::haxe.lang.Runtime.genericCast<T1>(((object) (__fn_float1) ))) : (global::haxe.lang.Runtime.genericCast<T1>(__fn_dyn1)) );
				#line 267 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				return ((global::haxe.lang.Function) (this.f[0]) ).__hx_invoke3_o(default(double), ((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (this.a11[0]) ))) ), default(double), ((global::promhx.@base.AsyncBase<T1>) (global::promhx.@base.AsyncBase<object>.__hx_cast<T1>(((global::promhx.@base.AsyncBase) (this.a21[0]) ))) ), default(double), v1);
			}
			#line default
		}
		
		
		public  global::Array<object> a21;
		
		public  global::Array<object> a11;
		
		public  global::Array<object> f;
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace promhx.@base{
	public  class AsyncBase_pipeLink_292__Fun<B> : global::haxe.lang.Function {
		public    AsyncBase_pipeLink_292__Fun() : base(1, 0){
			unchecked {
			}
			#line default
		}
		
		
		public override   object __hx_invoke1_o(double __fn_float1, object __fn_dyn1){
			unchecked {
				#line 292 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				B x1 = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (global::haxe.lang.Runtime.genericCast<B>(((object) (__fn_float1) ))) : (global::haxe.lang.Runtime.genericCast<B>(__fn_dyn1)) );
				#line 292 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				return x1;
			}
			#line default
		}
		
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace promhx.@base{
	public  class AsyncBase_pipeLink_284__Fun<B, A> : global::haxe.lang.Function {
		public    AsyncBase_pipeLink_284__Fun(global::Array<bool> linked, global::Array<object> ret1, global::Array<object> f1) : base(1, 0){
			unchecked {
				#line 285 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				this.linked = linked;
				#line 285 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				this.ret1 = ret1;
				#line 285 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				this.f1 = f1;
			}
			#line default
		}
		
		
		public override   object __hx_invoke1_o(double __fn_float1, object __fn_dyn1){
			unchecked {
				#line 284 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				A x = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (global::haxe.lang.Runtime.genericCast<A>(((object) (__fn_float1) ))) : (global::haxe.lang.Runtime.genericCast<A>(__fn_dyn1)) );
				if ( ! (this.linked[0]) ) {
					#line 286 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
					this.linked[0] = true;
					global::promhx.@base.AsyncBase<B> pipe_ret = ((global::promhx.@base.AsyncBase<B>) (global::promhx.@base.AsyncBase<object>.__hx_cast<B>(((global::promhx.@base.AsyncBase) (((global::haxe.lang.Function) (this.f1[0]) ).__hx_invoke1_o(default(double), x)) ))) );
					object __temp_stmt204 = default(object);
					#line 288 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
					{
						#line 289 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						global::promhx.@base.AsyncBase<B> __temp_odecl202 = ((global::promhx.@base.AsyncBase<B>) (global::promhx.@base.AsyncBase<object>.__hx_cast<B>(((global::promhx.@base.AsyncBase) (this.ret1[0]) ))) );
						global::haxe.lang.Function __temp_odecl203 = ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((global::promhx.@base.AsyncBase<B>) (global::promhx.@base.AsyncBase<object>.__hx_cast<B>(((global::promhx.@base.AsyncBase) (this.ret1[0]) ))) ), ((string) ("handleResolve") ), ((int) (2144664612) ))) );
						#line 288 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
						__temp_stmt204 = new global::haxe.lang.DynamicObject(new global::Array<int>(new int[]{641597244, 1963057964}), new global::Array<object>(new object[]{__temp_odecl202, __temp_odecl203}), new global::Array<int>(new int[]{}), new global::Array<double>(new double[]{}));
					}
					
					#line 288 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
					pipe_ret._update.push(__temp_stmt204);
					#line 292 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
					global::promhx.@base.AsyncBase<object>.immediateLinkUpdate<B, B>(pipe_ret, ((global::promhx.@base.AsyncBase<B>) (global::promhx.@base.AsyncBase<object>.__hx_cast<B>(((global::promhx.@base.AsyncBase) (this.ret1[0]) ))) ), new global::promhx.@base.AsyncBase_pipeLink_292__Fun<B>());
				}
				
				#line 285 "/usr/lib/haxe/lib/promhx/1,0,17/src/main/promhx/base/AsyncBase.hx"
				return default(object);
			}
			#line default
		}
		
		
		public  global::Array<bool> linked;
		
		public  global::Array<object> ret1;
		
		public  global::Array<object> f1;
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace promhx.@base{
	public  interface AsyncBase : global::haxe.lang.IHxObject, global::haxe.lang.IGenericObject {
		   object promhx_base_AsyncBase_cast<T_c>();
		
	}
}


