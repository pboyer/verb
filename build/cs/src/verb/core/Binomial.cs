
#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core{
	public  class Binomial : global::haxe.lang.HxObject {
		static Binomial() {
			#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Binomial.hx"
			global::verb.core.Binomial.memo = new global::haxe.ds.IntMap<object>();
		}
		public    Binomial(global::haxe.lang.EmptyObject empty){
			unchecked {
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Binomial.hx"
				{
				}
				
			}
			#line default
		}
		
		
		public    Binomial(){
			unchecked {
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Binomial.hx"
				global::verb.core.Binomial.__hx_ctor_verb_core_Binomial(this);
			}
			#line default
		}
		
		
		public static   void __hx_ctor_verb_core_Binomial(global::verb.core.Binomial __temp_me40){
			unchecked {
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Binomial.hx"
				{
				}
				
			}
			#line default
		}
		
		
		public static  global::haxe.ds.IntMap<object> memo;
		
		public static   double @get(int n, int k){
			unchecked {
				#line 10 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Binomial.hx"
				if (( k == 0.0 )) {
					#line 11 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Binomial.hx"
					return 1.0;
				}
				
				#line 14 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Binomial.hx"
				if (( ( n == 0 ) || ( k > n ) )) {
					#line 15 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Binomial.hx"
					return 0.0;
				}
				
				#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Binomial.hx"
				if (( k > ( n - k ) )) {
					#line 19 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Binomial.hx"
					k = ( n - k );
				}
				
				#line 22 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Binomial.hx"
				if (global::verb.core.Binomial.memo_exists(n, k)) {
					#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Binomial.hx"
					return global::verb.core.Binomial.get_memo(n, k);
				}
				
				#line 26 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Binomial.hx"
				double r = ((double) (1) );
				int n_o = n;
				#line 29 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Binomial.hx"
				{
					#line 29 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Binomial.hx"
					int _g1 = 1;
					#line 29 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Binomial.hx"
					int _g = ( k + 1 );
					#line 29 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Binomial.hx"
					while (( _g1 < _g )){
						#line 29 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Binomial.hx"
						int d = _g1++;
						#line 31 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Binomial.hx"
						if (global::verb.core.Binomial.memo_exists(n_o, d)) {
							#line 32 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Binomial.hx"
							n--;
							r = global::verb.core.Binomial.get_memo(n_o, d);
							continue;
						}
						
						#line 37 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Binomial.hx"
						r *= ((double) (n--) );
						r /= ((double) (d) );
						#line 40 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Binomial.hx"
						global::verb.core.Binomial.memoize(n_o, d, r);
					}
					
				}
				
				#line 44 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Binomial.hx"
				return r;
			}
			#line default
		}
		
		
		public static   double get_no_memo(int n, int k){
			unchecked {
				#line 48 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Binomial.hx"
				if (( k == 0 )) {
					#line 49 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Binomial.hx"
					return ((double) (1) );
				}
				
				#line 52 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Binomial.hx"
				if (( ( n == 0 ) || ( k > n ) )) {
					#line 53 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Binomial.hx"
					return ((double) (0) );
				}
				
				#line 56 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Binomial.hx"
				if (( k > ( n - k ) )) {
					#line 57 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Binomial.hx"
					k = ( n - k );
				}
				
				#line 60 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Binomial.hx"
				double r = ((double) (1) );
				int n_o = n;
				#line 63 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Binomial.hx"
				{
					#line 63 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Binomial.hx"
					int _g1 = 1;
					#line 63 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Binomial.hx"
					int _g = ( k + 1 );
					#line 63 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Binomial.hx"
					while (( _g1 < _g )){
						#line 63 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Binomial.hx"
						int d = _g1++;
						r *= ((double) (n--) );
						r /= ((double) (d) );
					}
					
				}
				
				#line 68 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Binomial.hx"
				return r;
			}
			#line default
		}
		
		
		public static   bool memo_exists(int n, int k){
			unchecked {
				#line 72 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Binomial.hx"
				return ( global::verb.core.Binomial.memo.exists(n) && ((global::haxe.ds.IntMap<double>) (global::haxe.ds.IntMap<object>.__hx_cast<double>(((global::haxe.ds.IntMap) (global::verb.core.Binomial.memo.@get(n).@value) ))) ).exists(k) );
			}
			#line default
		}
		
		
		public static   double get_memo(int n, int k){
			unchecked {
				#line 76 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Binomial.hx"
				return ((global::haxe.ds.IntMap<double>) (global::haxe.ds.IntMap<object>.__hx_cast<double>(((global::haxe.ds.IntMap) (global::verb.core.Binomial.memo.@get(n).@value) ))) ).@get(k).@value;
			}
			#line default
		}
		
		
		public static   void memoize(int n, int k, double val){
			unchecked {
				#line 80 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Binomial.hx"
				if ( ! (global::verb.core.Binomial.memo.exists(n)) ) {
					#line 81 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Binomial.hx"
					global::verb.core.Binomial.memo.@set(n, new global::haxe.ds.IntMap<double>());
				}
				
				#line 84 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Binomial.hx"
				((global::haxe.ds.IntMap<double>) (global::haxe.ds.IntMap<object>.__hx_cast<double>(((global::haxe.ds.IntMap) (global::verb.core.Binomial.memo.@get(n).@value) ))) ).@set(k, val);
			}
			#line default
		}
		
		
		public static  new object __hx_createEmpty(){
			unchecked {
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Binomial.hx"
				return new global::verb.core.Binomial(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) ));
			}
			#line default
		}
		
		
		public static  new object __hx_create(global::Array arr){
			unchecked {
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Binomial.hx"
				return new global::verb.core.Binomial();
			}
			#line default
		}
		
		
	}
}


