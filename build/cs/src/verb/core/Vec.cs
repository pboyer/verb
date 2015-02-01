
#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core{
	public  class Vec : global::haxe.lang.HxObject {
		public    Vec(global::haxe.lang.EmptyObject empty){
			unchecked {
				#line 11 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
				{
				}
				
			}
			#line default
		}
		
		
		public    Vec(){
			unchecked {
				#line 11 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
				global::verb.core.Vec.__hx_ctor_verb_core_Vec(this);
			}
			#line default
		}
		
		
		public static   void __hx_ctor_verb_core_Vec(global::verb.core.Vec __temp_me72){
			unchecked {
				#line 11 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
				{
				}
				
			}
			#line default
		}
		
		
		public static   global::Array<double> range(int max){
			unchecked {
				#line 14 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
				global::Array<double> l = new global::Array<double>(new double[]{});
				double f = 0.0;
				{
					#line 16 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
					int _g = 0;
					#line 16 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
					while (( _g < max )){
						#line 16 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
						int i = _g++;
						l.push(f);
						f += 1.0;
					}
					
				}
				
				#line 20 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
				return l;
			}
			#line default
		}
		
		
		public static   global::Array<double> span(double min, double max, double step){
			unchecked {
				#line 27 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
				if (( step < 1e-10 )) {
					#line 27 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
					return new global::Array<double>(new double[]{});
				}
				
				#line 28 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
				if (( ( min > max ) && ( step > 0.0 ) )) {
					#line 28 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
					return new global::Array<double>(new double[]{});
				}
				
				#line 29 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
				if (( ( max > min ) && ( step < 0.0 ) )) {
					#line 29 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
					return new global::Array<double>(new double[]{});
				}
				
				#line 31 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
				global::Array<double> l = new global::Array<double>(new double[]{});
				double cur = min;
				#line 34 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
				while (( cur <= max )){
					#line 35 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
					l.push(cur);
					cur += step;
				}
				
				#line 39 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
				return l;
			}
			#line default
		}
		
		
		public static   global::Array<double> neg(global::Array<double> arr){
			unchecked {
				#line 43 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
				return arr.map<double>(( (( global::verb.core.Vec_neg_43__Fun.__hx_current != default(global::verb.core.Vec_neg_43__Fun) )) ? (global::verb.core.Vec_neg_43__Fun.__hx_current) : (global::verb.core.Vec_neg_43__Fun.__hx_current = ((global::verb.core.Vec_neg_43__Fun) (new global::verb.core.Vec_neg_43__Fun()) )) ));
			}
			#line default
		}
		
		
		public static   double min(global::Array<double> arr){
			unchecked {
				#line 47 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
				return ((double) (global::haxe.lang.Runtime.toDouble(global::Lambda.fold<double, object>(arr, ( (( global::verb.core.Vec_min_47__Fun.__hx_current != default(global::verb.core.Vec_min_47__Fun) )) ? (global::verb.core.Vec_min_47__Fun.__hx_current) : (global::verb.core.Vec_min_47__Fun.__hx_current = ((global::verb.core.Vec_min_47__Fun) (new global::verb.core.Vec_min_47__Fun()) )) ), global::Math.POSITIVE_INFINITY))) );
			}
			#line default
		}
		
		
		public static   double max(global::Array<double> arr){
			unchecked {
				#line 51 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
				return ((double) (global::haxe.lang.Runtime.toDouble(global::Lambda.fold<double, object>(arr, ( (( global::verb.core.Vec_max_51__Fun.__hx_current != default(global::verb.core.Vec_max_51__Fun) )) ? (global::verb.core.Vec_max_51__Fun.__hx_current) : (global::verb.core.Vec_max_51__Fun.__hx_current = ((global::verb.core.Vec_max_51__Fun) (new global::verb.core.Vec_max_51__Fun()) )) ), global::Math.NEGATIVE_INFINITY))) );
			}
			#line default
		}
		
		
		public static   bool all(global::Array<bool> arr){
			unchecked {
				#line 55 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
				return global::haxe.lang.Runtime.toBool(global::Lambda.fold<bool, object>(arr, ( (( global::verb.core.Vec_all_55__Fun.__hx_current != default(global::verb.core.Vec_all_55__Fun) )) ? (global::verb.core.Vec_all_55__Fun.__hx_current) : (global::verb.core.Vec_all_55__Fun.__hx_current = ((global::verb.core.Vec_all_55__Fun) (new global::verb.core.Vec_all_55__Fun()) )) ), true));
			}
			#line default
		}
		
		
		public static   global::Array<bool> finite(global::Array<double> arr){
			unchecked {
				#line 59 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
				return arr.map<bool>(( (( global::verb.core.Vec_finite_59__Fun.__hx_current != default(global::verb.core.Vec_finite_59__Fun) )) ? (global::verb.core.Vec_finite_59__Fun.__hx_current) : (global::verb.core.Vec_finite_59__Fun.__hx_current = ((global::verb.core.Vec_finite_59__Fun) (new global::verb.core.Vec_finite_59__Fun()) )) ));
			}
			#line default
		}
		
		
		public static   global::Array<double> onRay(global::Array<double> origin, global::Array<double> dir, double u){
			unchecked {
				#line 63 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
				return global::verb.core.Vec.@add(origin, global::verb.core.Vec.mul(u, dir));
			}
			#line default
		}
		
		
		public static   global::Array<double> lerp(double i, global::Array<double> u, global::Array<double> v){
			unchecked {
				#line 67 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
				return global::verb.core.Vec.@add(global::verb.core.Vec.mul(i, u), global::verb.core.Vec.mul(( 1.0 - i ), v));
			}
			#line default
		}
		
		
		public static   global::Array<double> normalized(global::Array<double> arr){
			unchecked {
				#line 71 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
				return global::verb.core.Vec.div(arr, global::verb.core.Vec.norm(arr));
			}
			#line default
		}
		
		
		public static   global::Array<double> cross(global::Array<double> u, global::Array<double> v){
			unchecked {
				#line 75 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
				return new global::Array<double>(new double[]{( ( u[1] * v[2] ) - ( u[2] * v[1] ) ), ( ( u[2] * v[0] ) - ( u[0] * v[2] ) ), ( ( u[0] * v[1] ) - ( u[1] * v[0] ) )});
			}
			#line default
		}
		
		
		public static   double dist(global::Array<double> a, global::Array<double> b){
			unchecked {
				#line 79 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
				return global::verb.core.Vec.norm(global::verb.core.Vec.sub(a, b));
			}
			#line default
		}
		
		
		public static   double distSquared(global::Array<double> a, global::Array<double> b){
			unchecked {
				#line 83 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
				return global::verb.core.Vec.normSquared(global::verb.core.Vec.sub(a, b));
			}
			#line default
		}
		
		
		public static   double sum(object a){
			unchecked {
				#line 87 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
				return ((double) (global::haxe.lang.Runtime.toDouble(global::Lambda.fold<double, object>(a, ( (( global::verb.core.Vec_sum_87__Fun.__hx_current != default(global::verb.core.Vec_sum_87__Fun) )) ? (global::verb.core.Vec_sum_87__Fun.__hx_current) : (global::verb.core.Vec_sum_87__Fun.__hx_current = ((global::verb.core.Vec_sum_87__Fun) (new global::verb.core.Vec_sum_87__Fun()) )) ), 0))) );
			}
			#line default
		}
		
		
		public static   double norm(object a){
			unchecked {
				#line 91 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
				double norm2 = global::verb.core.Vec.normSquared(a);
				if (( norm2 != 0.0 )) {
					#line 92 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
					return global::System.Math.Sqrt(((double) (norm2) ));
				}
				 else {
					#line 92 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
					return norm2;
				}
				
			}
			#line default
		}
		
		
		public static   double normSquared(object a){
			unchecked {
				#line 96 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
				return ((double) (global::haxe.lang.Runtime.toDouble(global::Lambda.fold<double, object>(a, ( (( global::verb.core.Vec_normSquared_96__Fun.__hx_current != default(global::verb.core.Vec_normSquared_96__Fun) )) ? (global::verb.core.Vec_normSquared_96__Fun.__hx_current) : (global::verb.core.Vec_normSquared_96__Fun.__hx_current = ((global::verb.core.Vec_normSquared_96__Fun) (new global::verb.core.Vec_normSquared_96__Fun()) )) ), 0))) );
			}
			#line default
		}
		
		
		public static   global::Array<T> rep<T>(int num, T ele){
			unchecked {
				#line 100 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
				{
					#line 100 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
					global::Array<T> _g = new global::Array<T>(new T[]{});
					#line 100 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
					{
						#line 100 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
						int _g1 = 0;
						#line 100 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
						while (( _g1 < num )){
							#line 100 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
							int i = _g1++;
							#line 100 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
							_g.push(ele);
						}
						
					}
					
					#line 100 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
					return _g;
				}
				
			}
			#line default
		}
		
		
		public static   global::Array<double> zeros1d(int rows){
			unchecked {
				#line 104 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
				{
					#line 104 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
					global::Array<double> _g = new global::Array<double>(new double[]{});
					#line 104 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
					{
						#line 104 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
						int _g1 = 0;
						#line 104 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
						while (( _g1 < rows )){
							#line 104 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
							int i = _g1++;
							#line 104 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
							_g.push(0.0);
						}
						
					}
					
					#line 104 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
					return _g;
				}
				
			}
			#line default
		}
		
		
		public static   global::Array<object> zeros2d(int rows, int cols){
			unchecked {
				#line 108 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
				{
					#line 108 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
					global::Array<object> _g = new global::Array<object>(new object[]{});
					#line 108 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
					{
						#line 108 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
						int _g1 = 0;
						#line 108 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
						while (( _g1 < rows )){
							#line 108 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
							int i = _g1++;
							#line 108 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
							_g.push(global::verb.core.Vec.zeros1d(cols));
						}
						
					}
					
					#line 108 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
					return _g;
				}
				
			}
			#line default
		}
		
		
		public static   global::Array<object> zeros3d(int rows, int cols, int depth){
			unchecked {
				#line 112 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
				{
					#line 112 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
					global::Array<object> _g = new global::Array<object>(new object[]{});
					#line 112 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
					{
						#line 112 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
						int _g1 = 0;
						#line 112 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
						while (( _g1 < rows )){
							#line 112 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
							int i = _g1++;
							#line 112 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
							_g.push(global::verb.core.Vec.zeros2d(cols, depth));
						}
						
					}
					
					#line 112 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
					return _g;
				}
				
			}
			#line default
		}
		
		
		public static   double dot(global::Array<double> a, global::Array<double> b){
			unchecked {
				#line 116 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
				double sum = ((double) (0) );
				{
					#line 117 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
					int _g1 = 0;
					#line 117 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
					int _g = a.length;
					#line 117 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
					while (( _g1 < _g )){
						#line 117 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
						int i = _g1++;
						sum += ( a[i] * b[i] );
					}
					
				}
				
				#line 120 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
				return sum;
			}
			#line default
		}
		
		
		public static   global::Array<double> @add(global::Array<double> a, global::Array<double> b){
			unchecked {
				#line 124 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
				{
					#line 124 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
					global::Array<double> _g = new global::Array<double>(new double[]{});
					#line 124 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
					{
						#line 124 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
						int _g2 = 0;
						#line 124 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
						int _g1 = a.length;
						#line 124 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
						while (( _g2 < _g1 )){
							#line 124 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
							int i = _g2++;
							#line 124 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
							_g.push(( a[i] + b[i] ));
						}
						
					}
					
					#line 124 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
					return _g;
				}
				
			}
			#line default
		}
		
		
		public static   global::Array<double> mul(double a, global::Array<double> b){
			unchecked {
				#line 128 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
				{
					#line 128 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
					global::Array<double> _g = new global::Array<double>(new double[]{});
					#line 128 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
					{
						#line 128 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
						int _g2 = 0;
						#line 128 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
						int _g1 = b.length;
						#line 128 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
						while (( _g2 < _g1 )){
							#line 128 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
							int i = _g2++;
							#line 128 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
							_g.push(( a * b[i] ));
						}
						
					}
					
					#line 128 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
					return _g;
				}
				
			}
			#line default
		}
		
		
		public static   global::Array<double> div(global::Array<double> a, double b){
			unchecked {
				#line 132 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
				{
					#line 132 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
					global::Array<double> _g = new global::Array<double>(new double[]{});
					#line 132 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
					{
						#line 132 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
						int _g2 = 0;
						#line 132 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
						int _g1 = a.length;
						#line 132 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
						while (( _g2 < _g1 )){
							#line 132 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
							int i = _g2++;
							#line 132 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
							_g.push(( a[i] / b ));
						}
						
					}
					
					#line 132 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
					return _g;
				}
				
			}
			#line default
		}
		
		
		public static   global::Array<double> sub(global::Array<double> a, global::Array<double> b){
			unchecked {
				#line 136 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
				{
					#line 136 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
					global::Array<double> _g = new global::Array<double>(new double[]{});
					#line 136 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
					{
						#line 136 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
						int _g2 = 0;
						#line 136 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
						int _g1 = a.length;
						#line 136 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
						while (( _g2 < _g1 )){
							#line 136 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
							int i = _g2++;
							#line 136 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
							_g.push(( a[i] - b[i] ));
						}
						
					}
					
					#line 136 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
					return _g;
				}
				
			}
			#line default
		}
		
		
		public static   bool isZero(global::Array<double> vec){
			unchecked {
				#line 141 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
				{
					#line 141 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
					int _g1 = 0;
					#line 141 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
					int _g = vec.length;
					#line 141 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
					while (( _g1 < _g )){
						#line 141 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
						int i = _g1++;
						if (( global::System.Math.Abs(((double) (vec[i]) )) > 1e-6 )) {
							#line 142 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
							return false;
						}
						
					}
					
				}
				
				#line 145 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
				return true;
			}
			#line default
		}
		
		
		public static   global::Array<double> sortedSetUnion(global::Array<double> a, global::Array<double> b){
			unchecked {
				#line 150 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
				global::Array<double> merged = new global::Array<double>(new double[]{});
				#line 152 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
				int ai = 0;
				int bi = 0;
				while (( ( ai < a.length ) || ( bi < b.length ) )){
					#line 156 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
					if (( ai >= a.length )) {
						#line 157 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
						merged.push(b[bi]);
						bi++;
						continue;
					}
					 else {
						#line 160 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
						if (( bi >= b.length )) {
							#line 161 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
							merged.push(a[ai]);
							ai++;
							continue;
						}
						
					}
					
					#line 166 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
					double diff = ( a[ai] - b[bi] );
					#line 168 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
					if (( global::System.Math.Abs(((double) (diff) )) < 1e-10 )) {
						#line 169 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
						merged.push(a[ai]);
						ai++;
						bi++;
						continue;
					}
					
					#line 175 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
					if (( diff > 0.0 )) {
						#line 177 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
						merged.push(b[bi]);
						bi++;
						continue;
					}
					
					#line 183 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
					merged.push(a[ai]);
					ai++;
				}
				
				#line 188 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
				return merged;
			}
			#line default
		}
		
		
		public static   global::Array<double> sortedSetSub(global::Array<double> a, global::Array<double> b){
			unchecked {
				#line 194 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
				global::Array<double> result = new global::Array<double>(new double[]{});
				#line 196 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
				int ai = 0;
				int bi = 0;
				while (( ai < a.length )){
					#line 200 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
					if (( bi >= b.length )) {
						#line 201 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
						result.push(a[ai]);
						ai++;
						continue;
					}
					
					#line 206 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
					if (( global::System.Math.Abs(((double) (( a[ai] - b[bi] )) )) < 1e-10 )) {
						#line 207 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
						ai++;
						bi++;
						continue;
					}
					
					#line 212 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
					result.push(a[ai]);
					ai++;
				}
				
				#line 216 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
				return result;
			}
			#line default
		}
		
		
		public static  new object __hx_createEmpty(){
			unchecked {
				#line 11 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
				return new global::verb.core.Vec(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) ));
			}
			#line default
		}
		
		
		public static  new object __hx_create(global::Array arr){
			unchecked {
				#line 11 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
				return new global::verb.core.Vec();
			}
			#line default
		}
		
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core{
	public  class Vec_neg_43__Fun : global::haxe.lang.Function {
		public    Vec_neg_43__Fun() : base(1, 1){
			unchecked {
			}
			#line default
		}
		
		
		public static  global::verb.core.Vec_neg_43__Fun __hx_current;
		
		public override   double __hx_invoke1_f(double __fn_float1, object __fn_dyn1){
			unchecked {
				#line 43 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
				double x = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (((double) (__fn_float1) )) : (((double) (global::haxe.lang.Runtime.toDouble(__fn_dyn1)) )) );
				#line 43 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
				return  - (x) ;
			}
			#line default
		}
		
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core{
	public  class Vec_min_47__Fun : global::haxe.lang.Function {
		public    Vec_min_47__Fun() : base(2, 1){
			unchecked {
			}
			#line default
		}
		
		
		public static  global::verb.core.Vec_min_47__Fun __hx_current;
		
		public override   double __hx_invoke2_f(double __fn_float1, object __fn_dyn1, double __fn_float2, object __fn_dyn2){
			unchecked {
				#line 47 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
				double a = ( (global::haxe.lang.Runtime.eq(__fn_dyn2, global::haxe.lang.Runtime.undefined)) ? (((double) (__fn_float2) )) : (((double) (global::haxe.lang.Runtime.toDouble(__fn_dyn2)) )) );
				#line 47 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
				double x = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (((double) (__fn_float1) )) : (((double) (global::haxe.lang.Runtime.toDouble(__fn_dyn1)) )) );
				#line 47 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
				return global::System.Math.Min(((double) (x) ), ((double) (a) ));
			}
			#line default
		}
		
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core{
	public  class Vec_max_51__Fun : global::haxe.lang.Function {
		public    Vec_max_51__Fun() : base(2, 1){
			unchecked {
			}
			#line default
		}
		
		
		public static  global::verb.core.Vec_max_51__Fun __hx_current;
		
		public override   double __hx_invoke2_f(double __fn_float1, object __fn_dyn1, double __fn_float2, object __fn_dyn2){
			unchecked {
				#line 51 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
				double a = ( (global::haxe.lang.Runtime.eq(__fn_dyn2, global::haxe.lang.Runtime.undefined)) ? (((double) (__fn_float2) )) : (((double) (global::haxe.lang.Runtime.toDouble(__fn_dyn2)) )) );
				#line 51 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
				double x = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (((double) (__fn_float1) )) : (((double) (global::haxe.lang.Runtime.toDouble(__fn_dyn1)) )) );
				#line 51 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
				return global::System.Math.Max(((double) (x) ), ((double) (a) ));
			}
			#line default
		}
		
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core{
	public  class Vec_all_55__Fun : global::haxe.lang.Function {
		public    Vec_all_55__Fun() : base(2, 0){
			unchecked {
			}
			#line default
		}
		
		
		public static  global::verb.core.Vec_all_55__Fun __hx_current;
		
		public override   object __hx_invoke2_o(double __fn_float1, object __fn_dyn1, double __fn_float2, object __fn_dyn2){
			unchecked {
				#line 55 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
				bool a = ( (global::haxe.lang.Runtime.eq(__fn_dyn2, global::haxe.lang.Runtime.undefined)) ? (global::haxe.lang.Runtime.toBool(((object) (__fn_float2) ))) : (global::haxe.lang.Runtime.toBool(__fn_dyn2)) );
				#line 55 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
				bool x = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (global::haxe.lang.Runtime.toBool(((object) (__fn_float1) ))) : (global::haxe.lang.Runtime.toBool(__fn_dyn1)) );
				#line 55 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
				return ( a && x );
			}
			#line default
		}
		
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core{
	public  class Vec_finite_59__Fun : global::haxe.lang.Function {
		public    Vec_finite_59__Fun() : base(1, 0){
			unchecked {
			}
			#line default
		}
		
		
		public static  global::verb.core.Vec_finite_59__Fun __hx_current;
		
		public override   object __hx_invoke1_o(double __fn_float1, object __fn_dyn1){
			unchecked {
				#line 59 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
				double x = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (((double) (__fn_float1) )) : (((double) (global::haxe.lang.Runtime.toDouble(__fn_dyn1)) )) );
				#line 59 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
				return global::Math.isFinite(x);
			}
			#line default
		}
		
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core{
	public  class Vec_sum_87__Fun : global::haxe.lang.Function {
		public    Vec_sum_87__Fun() : base(2, 1){
			unchecked {
			}
			#line default
		}
		
		
		public static  global::verb.core.Vec_sum_87__Fun __hx_current;
		
		public override   double __hx_invoke2_f(double __fn_float1, object __fn_dyn1, double __fn_float2, object __fn_dyn2){
			unchecked {
				#line 87 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
				double a1 = ( (global::haxe.lang.Runtime.eq(__fn_dyn2, global::haxe.lang.Runtime.undefined)) ? (((double) (__fn_float2) )) : (((double) (global::haxe.lang.Runtime.toDouble(__fn_dyn2)) )) );
				#line 87 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
				double x = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (((double) (__fn_float1) )) : (((double) (global::haxe.lang.Runtime.toDouble(__fn_dyn1)) )) );
				#line 87 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
				return ( a1 + x );
			}
			#line default
		}
		
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core{
	public  class Vec_normSquared_96__Fun : global::haxe.lang.Function {
		public    Vec_normSquared_96__Fun() : base(2, 1){
			unchecked {
			}
			#line default
		}
		
		
		public static  global::verb.core.Vec_normSquared_96__Fun __hx_current;
		
		public override   double __hx_invoke2_f(double __fn_float1, object __fn_dyn1, double __fn_float2, object __fn_dyn2){
			unchecked {
				#line 96 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
				double a1 = ( (global::haxe.lang.Runtime.eq(__fn_dyn2, global::haxe.lang.Runtime.undefined)) ? (((double) (__fn_float2) )) : (((double) (global::haxe.lang.Runtime.toDouble(__fn_dyn2)) )) );
				#line 96 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
				double x = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (((double) (__fn_float1) )) : (((double) (global::haxe.lang.Runtime.toDouble(__fn_dyn1)) )) );
				#line 96 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Vec.hx"
				return ( a1 + ( x * x ) );
			}
			#line default
		}
		
		
	}
}


