
#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core{
	public  class LUDecomp : global::haxe.lang.HxObject {
		public    LUDecomp(global::haxe.lang.EmptyObject empty){
			unchecked {
				#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
				{
				}
				
			}
			#line default
		}
		
		
		public    LUDecomp(global::Array<object> lu, global::Array<int> p){
			unchecked {
				#line 10 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
				global::verb.core.LUDecomp.__hx_ctor_verb_core_LUDecomp(this, lu, p);
			}
			#line default
		}
		
		
		public static   void __hx_ctor_verb_core_LUDecomp(global::verb.core.LUDecomp __temp_me60, global::Array<object> lu, global::Array<int> p){
			unchecked {
				#line 11 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
				__temp_me60.LU = lu;
				__temp_me60.P = p;
			}
			#line default
		}
		
		
		public static  new object __hx_createEmpty(){
			unchecked {
				#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
				return new global::verb.core.LUDecomp(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) ));
			}
			#line default
		}
		
		
		public static  new object __hx_create(global::Array arr){
			unchecked {
				#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
				return new global::verb.core.LUDecomp(((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (arr[0]) ))) ), ((global::Array<int>) (global::Array<object>.__hx_cast<int>(((global::Array) (arr[1]) ))) ));
			}
			#line default
		}
		
		
		public  global::Array<object> LU;
		
		public  global::Array<int> P;
		
		public override   object __hx_setField(string field, int hash, object @value, bool handleProperties){
			unchecked {
				#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
				switch (hash){
					case 80:
					{
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
						this.P = ((global::Array<int>) (global::Array<object>.__hx_cast<int>(((global::Array) (@value) ))) );
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
						return @value;
					}
					
					
					case 17033:
					{
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
						this.LU = ((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (@value) ))) );
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
						return @value;
					}
					
					
					default:
					{
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
						return base.__hx_setField(field, hash, @value, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_getField(string field, int hash, bool throwErrors, bool isCheck, bool handleProperties){
			unchecked {
				#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
				switch (hash){
					case 80:
					{
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
						return this.P;
					}
					
					
					case 17033:
					{
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
						return this.LU;
					}
					
					
					default:
					{
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
						return base.__hx_getField(field, hash, throwErrors, isCheck, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   void __hx_getFields(global::Array<object> baseArr){
			unchecked {
				#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
				baseArr.push("P");
				#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
				baseArr.push("LU");
				#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
				{
					#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
					base.__hx_getFields(baseArr);
				}
				
			}
			#line default
		}
		
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core{
	public  class Mat : global::haxe.lang.HxObject {
		public    Mat(global::haxe.lang.EmptyObject empty){
			unchecked {
				#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
				{
				}
				
			}
			#line default
		}
		
		
		public    Mat(){
			unchecked {
				#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
				global::verb.core.Mat.__hx_ctor_verb_core_Mat(this);
			}
			#line default
		}
		
		
		public static   void __hx_ctor_verb_core_Mat(global::verb.core.Mat __temp_me61){
			unchecked {
				#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
				{
				}
				
			}
			#line default
		}
		
		
		public static   global::Array<object> mul(double a, global::Array<object> b){
			unchecked {
				#line 21 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
				{
					#line 21 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
					global::Array<object> _g = new global::Array<object>(new object[]{});
					#line 21 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
					{
						#line 21 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
						int _g2 = 0;
						#line 21 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
						int _g1 = b.length;
						#line 21 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
						while (( _g2 < _g1 )){
							#line 21 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
							int i = _g2++;
							#line 21 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
							_g.push(global::verb.core.Vec.mul(a, ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (b[i]) ))) )));
						}
						
					}
					
					#line 21 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
					return _g;
				}
				
			}
			#line default
		}
		
		
		public static   global::Array<object> @add(global::Array<object> a, global::Array<object> b){
			unchecked {
				#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
				{
					#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
					global::Array<object> _g = new global::Array<object>(new object[]{});
					#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
					{
						#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
						int _g2 = 0;
						#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
						int _g1 = a.length;
						#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
						while (( _g2 < _g1 )){
							#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
							int i = _g2++;
							#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
							_g.push(global::verb.core.Vec.@add(((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (a[i]) ))) ), ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (b[i]) ))) )));
						}
						
					}
					
					#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
					return _g;
				}
				
			}
			#line default
		}
		
		
		public static   global::Array<object> div(global::Array<object> a, double b){
			unchecked {
				#line 29 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
				{
					#line 29 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
					global::Array<object> _g = new global::Array<object>(new object[]{});
					#line 29 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
					{
						#line 29 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
						int _g2 = 0;
						#line 29 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
						int _g1 = a.length;
						#line 29 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
						while (( _g2 < _g1 )){
							#line 29 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
							int i = _g2++;
							#line 29 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
							_g.push(global::verb.core.Vec.div(((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (a[i]) ))) ), b));
						}
						
					}
					
					#line 29 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
					return _g;
				}
				
			}
			#line default
		}
		
		
		public static   global::Array<object> sub(global::Array<object> a, global::Array<object> b){
			unchecked {
				#line 33 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
				{
					#line 33 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
					global::Array<object> _g = new global::Array<object>(new object[]{});
					#line 33 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
					{
						#line 33 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
						int _g2 = 0;
						#line 33 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
						int _g1 = a.length;
						#line 33 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
						while (( _g2 < _g1 )){
							#line 33 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
							int i = _g2++;
							#line 33 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
							_g.push(global::verb.core.Vec.sub(((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (a[i]) ))) ), ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (b[i]) ))) )));
						}
						
					}
					
					#line 33 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
					return _g;
				}
				
			}
			#line default
		}
		
		
		public static   global::Array<double> dot(global::Array<object> a, global::Array<double> b){
			unchecked {
				#line 37 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
				{
					#line 37 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
					global::Array<double> _g = new global::Array<double>(new double[]{});
					#line 37 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
					{
						#line 37 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
						int _g2 = 0;
						#line 37 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
						int _g1 = a.length;
						#line 37 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
						while (( _g2 < _g1 )){
							#line 37 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
							int i = _g2++;
							#line 37 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
							_g.push(global::verb.core.Vec.dot(((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (a[i]) ))) ), b));
						}
						
					}
					
					#line 37 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
					return _g;
				}
				
			}
			#line default
		}
		
		
		public static   global::Array<object> identity(int n){
			unchecked {
				#line 41 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
				global::Array<object> zeros = global::verb.core.Vec.zeros2d(n, n);
				{
					#line 42 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
					int _g = 0;
					#line 42 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
					while (( _g < n )){
						#line 42 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
						int i = _g++;
						#line 42 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
						((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (zeros[i]) ))) )[i] = 1.0;
					}
					
				}
				
				#line 43 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
				return zeros;
			}
			#line default
		}
		
		
		public static   global::Array<object> transpose<T>(global::Array<object> a){
			unchecked {
				#line 47 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
				if (( a.length == 0 )) {
					#line 47 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
					return new global::Array<object>(new object[]{});
				}
				
				#line 48 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
				{
					#line 48 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
					global::Array<object> _g = new global::Array<object>(new object[]{});
					#line 48 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
					{
						#line 48 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
						int _g2 = 0;
						#line 48 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
						int _g1 = ((global::Array<T>) (global::Array<object>.__hx_cast<T>(((global::Array) (a[0]) ))) ).length;
						#line 48 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
						while (( _g2 < _g1 )){
							#line 48 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
							int i = _g2++;
							#line 48 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
							global::Array<T> __temp_stmt252 = default(global::Array<T>);
							#line 48 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
							{
								#line 48 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
								global::Array<T> _g3 = new global::Array<T>(new T[]{});
								#line 48 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
								{
									#line 48 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
									int _g5 = 0;
									#line 48 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
									int _g4 = a.length;
									#line 48 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
									while (( _g5 < _g4 )){
										#line 48 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
										int j = _g5++;
										#line 48 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
										_g3.push(((global::Array<T>) (global::Array<object>.__hx_cast<T>(((global::Array) (a[j]) ))) )[i]);
									}
									
								}
								
								#line 48 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
								__temp_stmt252 = _g3;
							}
							
							#line 48 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
							_g.push(__temp_stmt252);
						}
						
					}
					
					#line 48 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
					return _g;
				}
				
			}
			#line default
		}
		
		
		public static   global::Array<double> solve(global::Array<object> A, global::Array<double> b){
			unchecked {
				#line 52 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
				return global::verb.core.Mat.LUsolve(global::verb.core.Mat.LU(A), b);
			}
			#line default
		}
		
		
		public static   global::Array<double> LUsolve(global::verb.core.LUDecomp LUP, global::Array<double> b){
			unchecked {
				#line 56 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
				int i = default(int);
				#line 56 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
				int j = default(int);
				global::Array<object> LU = LUP.LU;
				int n = LU.length;
				global::Array<double> x = b.copy();
				global::Array<int> P = LUP.P;
				int Pi = default(int);
				#line 61 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
				global::Array<double> LUi = default(global::Array<double>);
				#line 61 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
				object LUii = default(object);
				#line 61 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
				double tmp = default(double);
				#line 63 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
				i = ( n - 1 );
				while (( i != -1 )){
					#line 65 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
					x[i] = b[i];
					 -- i;
				}
				
				#line 69 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
				i = 0;
				while (( i < n )){
					#line 71 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
					Pi = P[i];
					if (( P[i] != i )) {
						#line 73 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
						tmp = x[i];
						x[i] = x[Pi];
						x[Pi] = tmp;
					}
					
					#line 78 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
					LUi = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (LU[i]) ))) );
					j = 0;
					while (( j < i )){
						#line 81 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
						x[i] -= ( x[j] * LUi[j] );
						 ++ j;
					}
					
					#line 84 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
					 ++ i;
				}
				
				#line 87 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
				i = ( n - 1 );
				while (( i >= 0 )){
					#line 89 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
					LUi = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (LU[i]) ))) );
					j = ( i + 1 );
					while (( j < n )){
						#line 92 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
						x[i] -= ( x[j] * LUi[j] );
						 ++ j;
					}
					
					#line 96 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
					x[i] /= LUi[i];
					 -- i;
				}
				
				#line 100 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
				return x;
			}
			#line default
		}
		
		
		public static   global::verb.core.LUDecomp LU(global::Array<object> A){
			unchecked {
				#line 105 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
				global::haxe.lang.Function abs = ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (typeof(global::Math)) ), ((string) ("abs") ), ((int) (4845682) ))) );
				int i = default(int);
				#line 106 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
				int j = default(int);
				#line 106 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
				int k = default(int);
				#line 106 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
				double absAjk = default(double);
				#line 106 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
				double Akk = default(double);
				#line 106 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
				global::Array<double> Ak = default(global::Array<double>);
				#line 106 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
				int Pk = default(int);
				#line 106 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
				global::Array<double> Ai = default(global::Array<double>);
				double max = default(double);
				#line 109 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
				{
					#line 109 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
					global::Array<object> _g = new global::Array<object>(new object[]{});
					#line 109 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
					{
						#line 109 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
						int _g2 = 0;
						#line 109 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
						int _g1 = A.length;
						#line 109 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
						while (( _g2 < _g1 )){
							#line 109 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
							int i1 = _g2++;
							#line 109 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
							_g.push(((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (A[i1]) ))) ).copy());
						}
						
					}
					
					#line 109 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
					A = _g;
				}
				
				#line 110 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
				int n = A.length;
				#line 110 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
				int n1 = ( n - 1 );
				global::Array<int> P = new global::Array<int>();
				#line 113 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
				k = 0;
				while (( k < n )){
					#line 115 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
					Pk = k;
					Ak = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (A[k]) ))) );
					max = global::System.Math.Abs(((double) (Ak[k]) ));
					#line 119 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
					j = ( k + 1 );
					while (( j < n )){
						#line 121 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
						absAjk = global::System.Math.Abs(((double) (((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (A[j]) ))) )[k]) ));
						if (( max < absAjk )) {
							#line 123 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
							max = absAjk;
							Pk = j;
						}
						
						#line 126 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
						 ++ j;
					}
					
					#line 128 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
					P[k] = Pk;
					#line 130 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
					if (( Pk != k )) {
						#line 131 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
						A[k] = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (A[Pk]) ))) );
						A[Pk] = Ak;
						Ak = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (A[k]) ))) );
					}
					
					#line 136 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
					Akk = Ak[k];
					#line 138 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
					i = ( k + 1 );
					while (( i < n )){
						#line 140 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
						((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (A[i]) ))) )[k] /= Akk;
						 ++ i;
					}
					
					#line 144 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
					i = ( k + 1 );
					while (( i < n )){
						#line 146 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
						Ai = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (A[i]) ))) );
						j = ( k + 1 );
						while (( j < n1 )){
							#line 149 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
							Ai[j] -= ( Ai[k] * Ak[j] );
							 ++ j;
							Ai[j] -= ( Ai[k] * Ak[j] );
							 ++ j;
						}
						
						#line 154 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
						if (( j == n1 )) {
							#line 154 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
							Ai[j] -= ( Ai[k] * Ak[j] );
						}
						
						#line 155 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
						 ++ i;
					}
					
					#line 158 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
					 ++ k;
				}
				
				#line 161 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
				return new global::verb.core.LUDecomp(((global::Array<object>) (A) ), ((global::Array<int>) (P) ));
			}
			#line default
		}
		
		
		public static  new object __hx_createEmpty(){
			unchecked {
				#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
				return new global::verb.core.Mat(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) ));
			}
			#line default
		}
		
		
		public static  new object __hx_create(global::Array arr){
			unchecked {
				#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mat.hx"
				return new global::verb.core.Mat();
			}
			#line default
		}
		
		
	}
}


