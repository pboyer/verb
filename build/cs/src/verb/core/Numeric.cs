
#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core{
	public  class MinimizationResult : global::haxe.lang.HxObject {
		public    MinimizationResult(global::haxe.lang.EmptyObject empty){
			unchecked {
				#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
				{
				}
				
			}
			#line default
		}
		
		
		public    MinimizationResult(global::Array<double> solution, double @value, global::Array<double> gradient, global::Array<object> invHessian, int iterations, string message){
			unchecked {
				#line 13 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
				global::verb.core.MinimizationResult.__hx_ctor_verb_core_MinimizationResult(this, solution, @value, gradient, invHessian, iterations, message);
			}
			#line default
		}
		
		
		public static   void __hx_ctor_verb_core_MinimizationResult(global::verb.core.MinimizationResult __temp_me66, global::Array<double> solution, double @value, global::Array<double> gradient, global::Array<object> invHessian, int iterations, string message){
			unchecked {
				#line 14 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
				__temp_me66.solution = solution;
				__temp_me66.@value = @value;
				__temp_me66.gradient = gradient;
				__temp_me66.invHessian = invHessian;
				__temp_me66.iterations = iterations;
				__temp_me66.message = message;
			}
			#line default
		}
		
		
		public static  new object __hx_createEmpty(){
			unchecked {
				#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
				return new global::verb.core.MinimizationResult(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) ));
			}
			#line default
		}
		
		
		public static  new object __hx_create(global::Array arr){
			unchecked {
				#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
				return new global::verb.core.MinimizationResult(((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (arr[0]) ))) ), ((double) (global::haxe.lang.Runtime.toDouble(arr[1])) ), ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (arr[2]) ))) ), ((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (arr[3]) ))) ), ((int) (global::haxe.lang.Runtime.toInt(arr[4])) ), global::haxe.lang.Runtime.toString(arr[5]));
			}
			#line default
		}
		
		
		public  global::Array<double> solution;
		
		public  double @value;
		
		public  global::Array<double> gradient;
		
		public  global::Array<object> invHessian;
		
		public  int iterations;
		
		public  string message;
		
		public override   double __hx_setField_f(string field, int hash, double @value, bool handleProperties){
			unchecked {
				#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
				switch (hash){
					case 1647964982:
					{
						#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
						this.iterations = ((int) (@value) );
						#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
						return @value;
					}
					
					
					case 834174833:
					{
						#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
						this.@value = ((double) (@value) );
						#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
						return @value;
					}
					
					
					default:
					{
						#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
						return base.__hx_setField_f(field, hash, @value, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_setField(string field, int hash, object @value, bool handleProperties){
			unchecked {
				#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
				switch (hash){
					case 437335495:
					{
						#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
						this.message = global::haxe.lang.Runtime.toString(@value);
						#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
						return @value;
					}
					
					
					case 1647964982:
					{
						#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
						this.iterations = ((int) (global::haxe.lang.Runtime.toInt(@value)) );
						#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
						return @value;
					}
					
					
					case 1996749800:
					{
						#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
						this.invHessian = ((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (@value) ))) );
						#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
						return @value;
					}
					
					
					case 708786672:
					{
						#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
						this.gradient = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (@value) ))) );
						#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
						return @value;
					}
					
					
					case 834174833:
					{
						#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
						this.@value = ((double) (global::haxe.lang.Runtime.toDouble(@value)) );
						#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
						return @value;
					}
					
					
					case 316761721:
					{
						#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
						this.solution = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (@value) ))) );
						#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
						return @value;
					}
					
					
					default:
					{
						#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
						return base.__hx_setField(field, hash, @value, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_getField(string field, int hash, bool throwErrors, bool isCheck, bool handleProperties){
			unchecked {
				#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
				switch (hash){
					case 437335495:
					{
						#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
						return this.message;
					}
					
					
					case 1647964982:
					{
						#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
						return this.iterations;
					}
					
					
					case 1996749800:
					{
						#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
						return this.invHessian;
					}
					
					
					case 708786672:
					{
						#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
						return this.gradient;
					}
					
					
					case 834174833:
					{
						#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
						return this.@value;
					}
					
					
					case 316761721:
					{
						#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
						return this.solution;
					}
					
					
					default:
					{
						#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
						return base.__hx_getField(field, hash, throwErrors, isCheck, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   double __hx_getField_f(string field, int hash, bool throwErrors, bool handleProperties){
			unchecked {
				#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
				switch (hash){
					case 1647964982:
					{
						#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
						return ((double) (this.iterations) );
					}
					
					
					case 834174833:
					{
						#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
						return this.@value;
					}
					
					
					default:
					{
						#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
						return base.__hx_getField_f(field, hash, throwErrors, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   void __hx_getFields(global::Array<object> baseArr){
			unchecked {
				#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
				baseArr.push("message");
				#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
				baseArr.push("iterations");
				#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
				baseArr.push("invHessian");
				#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
				baseArr.push("gradient");
				#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
				baseArr.push("value");
				#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
				baseArr.push("solution");
				#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
				{
					#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
					base.__hx_getFields(baseArr);
				}
				
			}
			#line default
		}
		
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core{
	public  class Numeric : global::haxe.lang.HxObject {
		public    Numeric(global::haxe.lang.EmptyObject empty){
			unchecked {
				#line 24 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
				{
				}
				
			}
			#line default
		}
		
		
		public    Numeric(){
			unchecked {
				#line 24 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
				global::verb.core.Numeric.__hx_ctor_verb_core_Numeric(this);
			}
			#line default
		}
		
		
		public static   void __hx_ctor_verb_core_Numeric(global::verb.core.Numeric __temp_me67){
			unchecked {
				#line 24 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
				{
				}
				
			}
			#line default
		}
		
		
		public static   global::Array<double> numericalGradient(global::haxe.lang.Function f, global::Array<double> x){
			unchecked {
				#line 28 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
				int n = x.length;
				double f0 = ((double) (f.__hx_invoke1_f(default(double), x)) );
				#line 31 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
				if (( f0 == global::Math.NaN )) {
					#line 31 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
					throw global::haxe.lang.HaxeException.wrap("gradient: f(x) is a NaN!");
				}
				
				#line 33 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
				object i = default(object);
				#line 33 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
				global::Array<double> x0 = x.slice(0, default(global::haxe.lang.Null<int>));
				#line 33 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
				double f1 = default(double);
				#line 33 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
				double f2 = default(double);
				#line 33 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
				global::Array<double> J = new global::Array<double>(new double[]{});
				#line 35 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
				double errest = default(double);
				#line 35 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
				object roundoff = default(object);
				#line 35 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
				double eps = 1e-3;
				double t0 = default(double);
				#line 36 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
				double t1 = default(double);
				#line 36 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
				double t2 = default(double);
				#line 36 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
				int it = 0;
				#line 36 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
				double d1 = default(double);
				#line 36 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
				double d2 = default(double);
				#line 36 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
				double N = default(double);
				#line 38 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
				{
					#line 38 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
					int _g = 0;
					#line 38 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
					while (( _g < ((int) (n) ) )){
						#line 38 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
						int i1 = _g++;
						#line 40 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
						double h = global::System.Math.Max(((double) (( 1e-6 * f0 )) ), ((double) (1e-8) ));
						#line 42 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
						while (true){
							#line 43 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
							 ++ it;
							if (( it > 20 )) {
								#line 44 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
								throw global::haxe.lang.HaxeException.wrap("Numerical gradient fails");
							}
							
							#line 45 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
							x0[i1] = ( x[i1] + h );
							f1 = ((double) (f.__hx_invoke1_f(default(double), x0)) );
							x0[i1] = ( x[i1] - h );
							f2 = ((double) (f.__hx_invoke1_f(default(double), x0)) );
							x0[i1] = x[i1];
							#line 51 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
							if (( global::Math.isNaN(f1) || global::Math.isNaN(f2) )) {
								#line 51 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
								h /= ((double) (16) );
								#line 51 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
								continue;
							}
							
							#line 53 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
							J[i1] = ( (( f1 - f2 )) / (( 2 * h )) );
							t0 = ( x[i1] - h );
							t1 = x[i1];
							t2 = ( x[i1] + h );
							d1 = ( (( f1 - f0 )) / h );
							d2 = ( (( f0 - f2 )) / h );
							N = global::verb.core.Vec.max(new global::Array<double>(new double[]{global::System.Math.Abs(((double) (J[i1]) )), global::System.Math.Abs(((double) (f0) )), global::System.Math.Abs(((double) (f1) )), global::System.Math.Abs(((double) (f2) )), global::System.Math.Abs(((double) (t0) )), global::System.Math.Abs(((double) (t1) )), global::System.Math.Abs(((double) (t2) )), 1e-8}));
							#line 61 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
							{
								#line 61 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
								double a = ( global::verb.core.Vec.max(new global::Array<double>(new double[]{global::System.Math.Abs(((double) (( d1 - J[i1] )) )), global::System.Math.Abs(((double) (( d2 - J[i1] )) )), global::System.Math.Abs(((double) (( d1 - d2 )) ))})) / N );
								#line 61 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
								errest = global::System.Math.Min(((double) (a) ), ((double) (( h / N )) ));
							}
							
							#line 63 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
							if (( errest > eps )) {
								#line 63 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
								h /= ((double) (16) );
							}
							 else {
								#line 63 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
								break;
							}
							
						}
						
					}
					
				}
				
				#line 67 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
				return J;
			}
			#line default
		}
		
		
		public static   global::verb.core.MinimizationResult uncmin(global::haxe.lang.Function f, global::Array<double> x0, global::haxe.lang.Null<double> tol, global::haxe.lang.Function gradient, global::haxe.lang.Null<int> maxit){
			unchecked {
				#line 70 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
				global::Array<object> f1 = new global::Array<object>(new object[]{f});
				#line 72 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
				if ( ! (tol.hasValue) ) {
					#line 72 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
					tol = new global::haxe.lang.Null<double>(1e-8, true);
				}
				
				#line 73 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
				if (( gradient == default(global::haxe.lang.Function) )) {
					#line 73 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
					gradient = new global::verb.core.Numeric_uncmin_73__Fun(((global::Array<object>) (f1) ));
				}
				
				#line 74 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
				if ( ! (maxit.hasValue) ) {
					#line 74 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
					maxit = new global::haxe.lang.Null<int>(1000, true);
				}
				
				#line 76 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
				x0 = x0.slice(0, default(global::haxe.lang.Null<int>));
				int n = x0.length;
				double f0 = ((double) (((global::haxe.lang.Function) (f1[0]) ).__hx_invoke1_f(default(double), x0)) );
				#line 78 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
				double f11 = f0;
				#line 78 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
				double df0 = default(double);
				#line 80 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
				if (global::Math.isNaN(f0)) {
					#line 80 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
					throw global::haxe.lang.HaxeException.wrap("uncmin: f(x0) is a NaN!");
				}
				
				#line 82 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
				{
					#line 82 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
					double a = tol.@value;
					#line 82 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
					tol = new global::haxe.lang.Null<double>(global::System.Math.Max(((double) (a) ), ((double) (1e-10) )), true);
				}
				
				#line 83 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
				global::Array<double> step = default(global::Array<double>);
				#line 83 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
				global::Array<double> g0 = default(global::Array<double>);
				#line 83 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
				global::Array<double> g1 = default(global::Array<double>);
				#line 83 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
				global::Array<object> H1 = global::verb.core.Mat.identity(n);
				int it = 0;
				#line 84 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
				object i = default(object);
				#line 84 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
				global::Array<double> s = new global::Array<double>(new double[]{});
				#line 84 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
				global::Array<double> x1 = default(global::Array<double>);
				#line 84 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
				global::Array<double> y = default(global::Array<double>);
				#line 84 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
				global::Array<double> Hy = default(global::Array<double>);
				#line 84 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
				object Hs = default(object);
				#line 84 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
				double ys = default(double);
				#line 84 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
				object i0 = default(object);
				#line 84 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
				double t = default(double);
				#line 84 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
				double nstep = default(double);
				#line 84 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
				object t1 = default(object);
				#line 84 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
				object t2 = default(object);
				string msg = "";
				g0 = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (gradient.__hx_invoke1_o(default(double), x0)) ))) );
				#line 88 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
				while (( it < maxit.@value )){
					#line 90 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
					if ( ! (global::verb.core.Vec.all(global::verb.core.Vec.finite(g0))) ) {
						#line 90 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
						msg = "Gradient has Infinity or NaN";
						#line 90 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
						break;
					}
					
					#line 91 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
					step = global::verb.core.Vec.neg(global::verb.core.Mat.dot(H1, g0));
					#line 93 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
					if ( ! (global::verb.core.Vec.all(global::verb.core.Vec.finite(step))) ) {
						#line 93 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
						msg = "Search direction has Infinity or NaN";
						#line 93 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
						break;
					}
					
					#line 95 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
					nstep = global::verb.core.Vec.norm(step);
					if (( nstep < tol.@value )) {
						#line 96 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
						msg = "Newton step smaller than tol";
						#line 96 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
						break;
					}
					
					#line 98 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
					t = 1.0;
					df0 = global::verb.core.Vec.dot(g0, step);
					#line 102 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
					x1 = x0;
					while (( it < maxit.@value )){
						#line 104 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
						if (( ( t * nstep ) < tol.@value )) {
							#line 104 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
							break;
						}
						
						#line 105 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
						s = global::verb.core.Vec.mul(t, step);
						x1 = global::verb.core.Vec.@add(x0, s);
						f11 = ((double) (((global::haxe.lang.Function) (f1[0]) ).__hx_invoke1_f(default(double), x1)) );
						if (( ( ( f11 - f0 ) >= ( ( 0.1 * t ) * df0 ) ) || global::Math.isNaN(f11) )) {
							#line 109 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
							t *= 0.5;
							 ++ it;
							continue;
						}
						
						#line 113 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
						break;
					}
					
					#line 116 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
					if (( ( t * nstep ) < tol.@value )) {
						#line 116 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
						msg = "Line search step size smaller than tol";
						#line 116 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
						break;
					}
					
					#line 117 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
					if (global::haxe.lang.Runtime.eq(it, (maxit).toDynamic())) {
						#line 117 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
						msg = "maxit reached during line search";
						#line 117 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
						break;
					}
					
					#line 119 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
					g1 = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (gradient.__hx_invoke1_o(default(double), x1)) ))) );
					y = global::verb.core.Vec.sub(g1, g0);
					ys = global::verb.core.Vec.dot(y, s);
					Hy = global::verb.core.Mat.dot(H1, y);
					H1 = global::verb.core.Mat.sub(global::verb.core.Mat.@add(H1, global::verb.core.Mat.mul(( (( ys + global::verb.core.Vec.dot(y, Hy) )) / (( ys * ys )) ), global::verb.core.Numeric.tensor(s, s))), global::verb.core.Mat.div(global::verb.core.Mat.@add(global::verb.core.Numeric.tensor(Hy, s), global::verb.core.Numeric.tensor(s, Hy)), ys));
					#line 126 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
					x0 = x1;
					f0 = f11;
					g0 = g1;
					 ++ it;
				}
				
				#line 132 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
				return new global::verb.core.MinimizationResult(((global::Array<double>) (x0) ), ((double) (f0) ), ((global::Array<double>) (g0) ), ((global::Array<object>) (H1) ), ((int) (it) ), ((string) (msg) ));
			}
			#line default
		}
		
		
		public static   global::Array<object> tensor(global::Array<double> x, global::Array<double> y){
			unchecked {
				#line 137 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
				int m = x.length;
				#line 137 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
				int n = y.length;
				#line 137 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
				global::Array<object> A = new global::Array<object>(new object[]{});
				#line 137 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
				global::Array<double> Ai = default(global::Array<double>);
				#line 137 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
				double xi = default(double);
				#line 139 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
				int i = ( m - 1 );
				while (( i >= 0 )){
					#line 141 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
					Ai = new global::Array<double>(new double[]{});
					xi = x[i];
					int j = ( n - 1 );
					while (( j >= 3 )){
						#line 145 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
						Ai[j] = ( xi * y[j] );
						 -- j;
						Ai[j] = ( xi * y[j] );
						 -- j;
						Ai[j] = ( xi * y[j] );
						 -- j;
						Ai[j] = ( xi * y[j] );
						 -- j;
					}
					
					#line 154 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
					while (( j >= 0 )){
						#line 154 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
						Ai[j] = ( xi * y[j] );
						#line 154 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
						 -- j;
					}
					
					#line 155 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
					A[i] = Ai;
					i--;
				}
				
				#line 158 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
				return A;
			}
			#line default
		}
		
		
		public static  new object __hx_createEmpty(){
			unchecked {
				#line 24 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
				return new global::verb.core.Numeric(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) ));
			}
			#line default
		}
		
		
		public static  new object __hx_create(global::Array arr){
			unchecked {
				#line 24 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
				return new global::verb.core.Numeric();
			}
			#line default
		}
		
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core{
	public  class Numeric_uncmin_73__Fun : global::haxe.lang.Function {
		public    Numeric_uncmin_73__Fun(global::Array<object> f1) : base(1, 0){
			unchecked {
				#line 73 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
				this.f1 = f1;
			}
			#line default
		}
		
		
		public override   object __hx_invoke1_o(double __fn_float1, object __fn_dyn1){
			unchecked {
				#line 73 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
				global::Array<double> x = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (((object) (__fn_float1) )) ))) )) : (((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (__fn_dyn1) ))) )) );
				#line 73 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Numeric.hx"
				return global::verb.core.Numeric.numericalGradient(((global::haxe.lang.Function) (this.f1[0]) ), x);
			}
			#line default
		}
		
		
		public  global::Array<object> f1;
		
	}
}


