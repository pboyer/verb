
#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core{
	public  class Modify : global::haxe.lang.HxObject {
		public    Modify(global::haxe.lang.EmptyObject empty){
			unchecked {
				#line 14 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				{
				}
				
			}
			#line default
		}
		
		
		public    Modify(){
			unchecked {
				#line 14 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				global::verb.core.Modify.__hx_ctor_verb_core_Modify(this);
			}
			#line default
		}
		
		
		public static   void __hx_ctor_verb_core_Modify(global::verb.core.Modify __temp_me65){
			unchecked {
				#line 14 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				{
				}
				
			}
			#line default
		}
		
		
		public static   global::verb.core.types.NurbsCurveData curveReverse(global::verb.core.types.NurbsCurveData curve){
			unchecked {
				#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				return new global::verb.core.types.NurbsCurveData(((int) (curve.degree) ), ((global::Array<double>) (global::verb.core.Modify.knotsReverse(curve.knots)) ), ((global::Array<object>) (global::verb.core.ArrayExtensions.reversed<object>(curve.controlPoints)) ));
			}
			#line default
		}
		
		
		public static   global::verb.core.types.NurbsSurfaceData surfaceReverse(global::verb.core.types.NurbsSurfaceData surface, global::haxe.lang.Null<bool> useV){
			unchecked {
				#line 21 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				bool __temp_useV63 = ( ( ! (useV.hasValue) ) ? (global::haxe.lang.Runtime.toBool(false)) : (useV.@value) );
				if (__temp_useV63) {
					#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					global::Array<double> __temp_stmt253 = ((global::Array<double>) (global::verb.core.Modify.knotsReverse(surface.knotsV)) );
					global::Array<object> __temp_stmt254 = default(global::Array<object>);
					#line 24 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					{
						#line 24 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
						global::Array<object> _g = new global::Array<object>(new object[]{});
						#line 24 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
						{
							#line 24 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
							int _g1 = 0;
							#line 24 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
							global::Array<object> _g2 = surface.controlPoints;
							#line 24 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
							while (( _g1 < _g2.length )){
								#line 24 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
								global::Array<object> row = ((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (_g2[_g1]) ))) );
								#line 24 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
								 ++ _g1;
								#line 24 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
								_g.push(global::verb.core.ArrayExtensions.reversed<object>(row));
							}
							
						}
						
						#line 24 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
						__temp_stmt254 = _g;
					}
					
					#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					return new global::verb.core.types.NurbsSurfaceData(((int) (surface.degreeU) ), ((int) (surface.degreeV) ), ((global::Array<double>) (surface.knotsU) ), __temp_stmt253, ((global::Array<object>) (__temp_stmt254) ));
				}
				
				#line 28 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				return new global::verb.core.types.NurbsSurfaceData(((int) (surface.degreeU) ), ((int) (surface.degreeV) ), ((global::Array<double>) (global::verb.core.Modify.knotsReverse(surface.knotsU)) ), ((global::Array<double>) (surface.knotsV) ), ((global::Array<object>) (global::verb.core.ArrayExtensions.reversed<object>(surface.controlPoints)) ));
			}
			#line default
		}
		
		
		public static   global::Array<double> knotsReverse(global::Array<double> knots){
			unchecked {
				#line 33 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				double min = knots[0];
				double max = knots[( knots.length - 1 )];
				#line 36 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				global::Array<double> l = new global::Array<double>(new double[]{min});
				int len = knots.length;
				{
					#line 38 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					int _g = 1;
					#line 38 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					while (( _g < ((int) (len) ) )){
						#line 38 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
						int i = _g++;
						l.push(( l[( i - 1 )] + (( knots[( len - i )] - knots[( ( len - i ) - 1 )] )) ));
					}
					
				}
				
				#line 42 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				return l;
			}
			#line default
		}
		
		
		public static   global::Array<object> unifyCurveKnotVectors(global::Array<object> curves){
			unchecked {
				#line 46 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				curves = curves.map<object>(((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (typeof(global::verb.core.Make)) ), ((string) ("clonedCurve") ), ((int) (1156925640) ))) ));
				#line 48 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				int maxDegree = ((int) (global::haxe.lang.Runtime.toInt(global::Lambda.fold<object, object>(curves, ( (( global::verb.core.Modify_unifyCurveKnotVectors_48__Fun.__hx_current != default(global::verb.core.Modify_unifyCurveKnotVectors_48__Fun) )) ? (global::verb.core.Modify_unifyCurveKnotVectors_48__Fun.__hx_current) : (global::verb.core.Modify_unifyCurveKnotVectors_48__Fun.__hx_current = ((global::verb.core.Modify_unifyCurveKnotVectors_48__Fun) (new global::verb.core.Modify_unifyCurveKnotVectors_48__Fun()) )) ), 0))) );
				#line 51 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				{
					#line 51 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					int _g1 = 0;
					#line 51 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					int _g = curves.length;
					#line 51 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					while (( _g1 < _g )){
						#line 51 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
						int i = _g1++;
						if (( ((global::verb.core.types.NurbsCurveData) (curves[i]) ).degree < maxDegree )) {
							#line 53 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
							curves[i] = global::verb.core.Modify.curveElevateDegree(((global::verb.core.types.NurbsCurveData) (curves[i]) ), maxDegree);
						}
						
					}
					
				}
				
				#line 57 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				global::Array<object> knotIntervals = default(global::Array<object>);
				#line 57 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				{
					#line 57 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					global::Array<object> _g2 = new global::Array<object>(new object[]{});
					#line 57 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					{
						#line 57 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
						int _g11 = 0;
						#line 57 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
						while (( _g11 < curves.length )){
							#line 57 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
							global::verb.core.types.NurbsCurveData c = ((global::verb.core.types.NurbsCurveData) (curves[_g11]) );
							#line 57 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
							 ++ _g11;
							#line 57 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
							double __temp_stmt255 = default(double);
							#line 57 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
							{
								#line 57 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
								global::Array<double> a2 = c.knots;
								#line 57 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
								__temp_stmt255 = a2[( a2.length - 1 )];
							}
							
							#line 57 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
							_g2.push(new global::verb.core.types.Interval<double>(((double) (c.knots[0]) ), ((double) (__temp_stmt255) )));
						}
						
					}
					
					#line 57 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					knotIntervals = _g2;
				}
				
				#line 60 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				{
					#line 60 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					int _g21 = 0;
					#line 60 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					int _g12 = curves.length;
					#line 60 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					while (( _g21 < _g12 )){
						#line 60 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
						int i1 = _g21++;
						global::Array<double> min = new global::Array<double>(new double[]{((global::verb.core.types.Interval<double>) (global::verb.core.types.Interval<object>.__hx_cast<double>(((global::verb.core.types.Interval) (knotIntervals[i1]) ))) ).min});
						((global::verb.core.types.NurbsCurveData) (curves[i1]) ).knots = ((global::verb.core.types.NurbsCurveData) (curves[i1]) ).knots.map<double>(new global::verb.core.Modify_unifyCurveKnotVectors_62__Fun(((global::Array<double>) (min) )));
					}
					
				}
				
				#line 66 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				global::Array<double> knotSpans = knotIntervals.map<double>(( (( global::verb.core.Modify_unifyCurveKnotVectors_66__Fun.__hx_current != default(global::verb.core.Modify_unifyCurveKnotVectors_66__Fun) )) ? (global::verb.core.Modify_unifyCurveKnotVectors_66__Fun.__hx_current) : (global::verb.core.Modify_unifyCurveKnotVectors_66__Fun.__hx_current = ((global::verb.core.Modify_unifyCurveKnotVectors_66__Fun) (new global::verb.core.Modify_unifyCurveKnotVectors_66__Fun()) )) ));
				double maxKnotSpan = ((double) (global::haxe.lang.Runtime.toDouble(global::Lambda.fold<double, object>(knotSpans, ( (( global::verb.core.Modify_unifyCurveKnotVectors_67__Fun.__hx_current != default(global::verb.core.Modify_unifyCurveKnotVectors_67__Fun) )) ? (global::verb.core.Modify_unifyCurveKnotVectors_67__Fun.__hx_current) : (global::verb.core.Modify_unifyCurveKnotVectors_67__Fun.__hx_current = ((global::verb.core.Modify_unifyCurveKnotVectors_67__Fun) (new global::verb.core.Modify_unifyCurveKnotVectors_67__Fun()) )) ), 0.0))) );
				#line 70 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				{
					#line 70 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					int _g22 = 0;
					#line 70 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					int _g13 = curves.length;
					#line 70 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					while (( _g22 < _g13 )){
						#line 70 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
						int i2 = _g22++;
						global::Array<double> scale = new global::Array<double>(new double[]{( maxKnotSpan / knotSpans[i2] )});
						((global::verb.core.types.NurbsCurveData) (curves[i2]) ).knots = ((global::verb.core.types.NurbsCurveData) (curves[i2]) ).knots.map<double>(new global::verb.core.Modify_unifyCurveKnotVectors_72__Fun(((global::Array<double>) (scale) )));
					}
					
				}
				
				#line 76 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				global::Array<double> mergedKnots = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (global::Lambda.fold<object, object>(curves, ( (( global::verb.core.Modify_unifyCurveKnotVectors_76__Fun.__hx_current != default(global::verb.core.Modify_unifyCurveKnotVectors_76__Fun) )) ? (global::verb.core.Modify_unifyCurveKnotVectors_76__Fun.__hx_current) : (global::verb.core.Modify_unifyCurveKnotVectors_76__Fun.__hx_current = ((global::verb.core.Modify_unifyCurveKnotVectors_76__Fun) (new global::verb.core.Modify_unifyCurveKnotVectors_76__Fun()) )) ), new global::Array<double>(new double[]{}))) ))) );
				#line 79 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				{
					#line 79 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					int _g23 = 0;
					#line 79 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					int _g14 = curves.length;
					#line 79 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					while (( _g23 < _g14 )){
						#line 79 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
						int i3 = _g23++;
						global::Array<double> rem = global::verb.core.Vec.sortedSetSub(mergedKnots, ((global::verb.core.types.NurbsCurveData) (curves[i3]) ).knots);
						if (( rem.length == 0 )) {
							#line 82 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
							curves[i3] = ((global::verb.core.types.NurbsCurveData) (curves[i3]) );
						}
						
						#line 84 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
						curves[i3] = global::verb.core.Modify.curveKnotRefine(((global::verb.core.types.NurbsCurveData) (curves[i3]) ), rem);
					}
					
				}
				
				#line 87 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				return curves;
			}
			#line default
		}
		
		
		public static   int imin(int a, int b){
			unchecked {
				#line 91 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				if (( a < b )) {
					#line 91 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					return a;
				}
				 else {
					#line 91 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					return b;
				}
				
			}
			#line default
		}
		
		
		public static   int imax(int a, int b){
			unchecked {
				#line 95 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				if (( a > b )) {
					#line 95 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					return a;
				}
				 else {
					#line 95 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					return b;
				}
				
			}
			#line default
		}
		
		
		public static   global::verb.core.types.NurbsCurveData curveElevateDegree(global::verb.core.types.NurbsCurveData curve, int finalDegree){
			unchecked {
				#line 100 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				if (( finalDegree <= curve.degree )) {
					#line 100 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					return curve;
				}
				
				#line 103 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				int n = ( ( curve.knots.length - curve.degree ) - 2 );
				int newDegree = curve.degree;
				global::Array<double> knots = curve.knots;
				global::Array<object> controlPoints = curve.controlPoints;
				int degreeInc = ( finalDegree - curve.degree );
				#line 109 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				int dim = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (curve.controlPoints[0]) ))) ).length;
				#line 112 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				global::Array<object> bezalfs = global::verb.core.Vec.zeros2d(( ( newDegree + degreeInc ) + 1 ), ( newDegree + 1 ));
				global::Array<object> bpts = new global::Array<object>(new object[]{});
				global::Array<object> ebpts = new global::Array<object>(new object[]{});
				global::Array<object> Nextbpts = new global::Array<object>(new object[]{});
				global::Array alphas = new global::Array<object>(new object[]{});
				#line 118 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				int m = ( ( n + newDegree ) + 1 );
				int ph = finalDegree;
				int ph2 = default(int);
				#line 120 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				{
					#line 120 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					double x = global::System.Math.Floor(((double) (( ((double) (ph) ) / 2 )) ));
					#line 120 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					ph2 = ((int) (x) );
				}
				
				#line 123 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				global::Array<object> Qw = new global::Array<object>(new object[]{});
				global::Array<double> Uh = new global::Array<double>(new double[]{});
				int nh = default(int);
				#line 127 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (bezalfs[0]) ))) )[0] = 1.0;
				((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (bezalfs[ph]) ))) )[newDegree] = 1.0;
				#line 130 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				{
					#line 130 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					int _g1 = 1;
					#line 130 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					int _g = ( ph2 + 1 );
					#line 130 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					while (( _g1 < _g )){
						#line 130 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
						int i = _g1++;
						double inv = ( 1.0 / global::verb.core.Binomial.@get(ph, i) );
						int mpi = default(int);
						#line 132 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
						if (( newDegree < i )) {
							#line 132 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
							mpi = newDegree;
						}
						 else {
							#line 132 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
							mpi = i;
						}
						
						#line 133 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
						{
							#line 133 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
							int _g3 = default(int);
							#line 133 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
							{
								#line 133 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
								int b = ( i - degreeInc );
								#line 133 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
								if (( 0 > b )) {
									#line 133 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
									_g3 = 0;
								}
								 else {
									#line 133 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
									_g3 = b;
								}
								
							}
							
							#line 133 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
							int _g2 = ( mpi + 1 );
							#line 133 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
							while (( _g3 < _g2 )){
								#line 133 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
								int j = _g3++;
								((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (bezalfs[i]) ))) )[j] = ( ( inv * global::verb.core.Binomial.@get(newDegree, j) ) * global::verb.core.Binomial.@get(degreeInc, ( i - j )) );
							}
							
						}
						
					}
					
				}
				
				#line 137 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				{
					#line 137 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					int _g4 = ( ph2 + 1 );
					#line 137 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					while (( _g4 < ((int) (ph) ) )){
						#line 137 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
						int i1 = _g4++;
						int mpi1 = default(int);
						#line 138 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
						if (( newDegree < i1 )) {
							#line 138 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
							mpi1 = newDegree;
						}
						 else {
							#line 138 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
							mpi1 = i1;
						}
						
						#line 139 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
						{
							#line 139 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
							int _g21 = default(int);
							#line 139 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
							{
								#line 139 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
								int b1 = ( i1 - degreeInc );
								#line 139 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
								if (( 0 > b1 )) {
									#line 139 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
									_g21 = 0;
								}
								 else {
									#line 139 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
									_g21 = b1;
								}
								
							}
							
							#line 139 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
							int _g11 = ( mpi1 + 1 );
							#line 139 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
							while (( _g21 < _g11 )){
								#line 139 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
								int j1 = _g21++;
								((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (bezalfs[i1]) ))) )[j1] = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (bezalfs[( ph - i1 )]) ))) )[( newDegree - j1 )];
							}
							
						}
						
					}
					
				}
				
				#line 143 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				int mh = ph;
				int kind = ( ph + 1 );
				int r = -1;
				int a = newDegree;
				int b2 = ( newDegree + 1 );
				int cind = 1;
				double ua = knots[0];
				Qw[0] = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (controlPoints[0]) ))) );
				{
					#line 151 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					int _g12 = 0;
					#line 151 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					int _g5 = ( ph + 1 );
					#line 151 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					while (( _g12 < _g5 )){
						#line 151 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
						int i2 = _g12++;
						Uh[i2] = ua;
					}
					
				}
				
				#line 154 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				{
					#line 154 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					int _g13 = 0;
					#line 154 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					int _g6 = ( newDegree + 1 );
					#line 154 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					while (( _g13 < _g6 )){
						#line 154 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
						int i3 = _g13++;
						bpts[i3] = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (controlPoints[i3]) ))) );
					}
					
				}
				
				#line 157 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				while (( b2 < m )){
					#line 158 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					int i4 = b2;
					while (( ( b2 < m ) && ( knots[b2] == knots[( b2 + 1 )] ) )){
						#line 160 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
						b2 = ( b2 + 1 );
					}
					
					#line 162 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					int mul = ( ( b2 - i4 ) + 1 );
					int mh1 = ( ( mh + mul ) + degreeInc );
					double ub = knots[b2];
					int oldr = r;
					r = ( newDegree - mul );
					#line 168 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					int lbz = default(int);
					#line 168 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					if (( oldr > 0 )) {
						#line 168 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
						double x1 = global::System.Math.Floor(((double) (( ((double) ((( oldr + 2 ))) ) / 2 )) ));
						#line 168 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
						lbz = ((int) (x1) );
					}
					 else {
						#line 168 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
						lbz = 1;
					}
					
					#line 169 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					int rbz = default(int);
					#line 169 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					if (( r > 0 )) {
						#line 169 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
						double x2 = global::System.Math.Floor(((double) (( ph - ( ((double) ((( r + 1 ))) ) / 2 ) )) ));
						#line 169 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
						rbz = ((int) (x2) );
					}
					 else {
						#line 169 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
						rbz = ph;
					}
					
					#line 170 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					if (( r > 0 )) {
						#line 171 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
						double numer = ( ub - ua );
						global::Array<double> alfs = new global::Array<double>(new double[]{});
						int k = newDegree;
						while (( k > mul )){
							#line 175 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
							alfs[( ( k - mul ) - 1 )] = ( numer / (( knots[( a + k )] - ua )) );
							k--;
						}
						
						#line 178 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
						{
							#line 178 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
							int _g14 = 1;
							#line 178 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
							int _g7 = ( r + 1 );
							#line 178 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
							while (( _g14 < _g7 )){
								#line 178 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
								int j2 = _g14++;
								int save = ( r - j2 );
								int s = ( mul + j2 );
								int k1 = newDegree;
								while (( k1 >= s )){
									#line 183 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
									bpts[k1] = global::verb.core.Vec.@add(global::verb.core.Vec.mul(alfs[( k1 - s )], ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (bpts[k1]) ))) )), global::verb.core.Vec.mul(( 1.0 - alfs[( k1 - s )] ), ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (bpts[( k1 - 1 )]) ))) )));
									k1--;
								}
								
								#line 186 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
								Nextbpts[save] = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (bpts[newDegree]) ))) );
							}
							
						}
						
					}
					
					#line 190 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					{
						#line 190 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
						int _g15 = lbz;
						#line 190 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
						int _g8 = ( ph + 1 );
						#line 190 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
						while (( _g15 < _g8 )){
							#line 190 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
							int i5 = _g15++;
							ebpts[i5] = global::verb.core.Vec.zeros1d(dim);
							int mpi2 = default(int);
							#line 192 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
							if (( newDegree < i5 )) {
								#line 192 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
								mpi2 = newDegree;
							}
							 else {
								#line 192 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
								mpi2 = i5;
							}
							
							#line 193 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
							{
								#line 193 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
								int _g31 = default(int);
								#line 193 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
								{
									#line 193 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
									int b3 = ( i5 - degreeInc );
									#line 193 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
									if (( 0 > b3 )) {
										#line 193 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
										_g31 = 0;
									}
									 else {
										#line 193 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
										_g31 = b3;
									}
									
								}
								
								#line 193 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
								int _g22 = ( mpi2 + 1 );
								#line 193 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
								while (( _g31 < _g22 )){
									#line 193 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
									int j3 = _g31++;
									ebpts[i5] = global::verb.core.Vec.@add(((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (ebpts[i5]) ))) ), global::verb.core.Vec.mul(((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (bezalfs[i5]) ))) )[j3], ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (bpts[j3]) ))) )));
								}
								
							}
							
						}
						
					}
					
					#line 198 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					if (( oldr > 1 )) {
						#line 199 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
						int first = ( kind - 2 );
						int last = kind;
						double den = ( ub - ua );
						double bet = ( (( ub - Uh[( kind - 1 )] )) / den );
						{
							#line 203 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
							int _g9 = 1;
							#line 203 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
							while (( _g9 < ((int) (oldr) ) )){
								#line 203 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
								int tr = _g9++;
								int i6 = first;
								int j4 = last;
								int kj = ( ( j4 - kind ) + 1 );
								while (( ( j4 - i6 ) > tr )){
									#line 208 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
									if (( i6 < cind )) {
										#line 209 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
										double alf = ( (( ub - Uh[i6] )) / (( ua - Uh[i6] )) );
										Qw[i6] = global::verb.core.Vec.lerp(alf, ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (Qw[i6]) ))) ), ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (Qw[( i6 - 1 )]) ))) ));
									}
									
									#line 212 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
									if (( j4 >= lbz )) {
										#line 213 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
										if (( ( j4 - tr ) <= ( ( kind - ph ) + oldr ) )) {
											#line 214 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
											double gam = ( (( ub - Uh[( j4 - tr )] )) / den );
											ebpts[kj] = global::verb.core.Vec.lerp(gam, ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (ebpts[kj]) ))) ), ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (ebpts[( kj + 1 )]) ))) ));
										}
										
									}
									 else {
										#line 218 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
										ebpts[kj] = global::verb.core.Vec.lerp(bet, ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (ebpts[kj]) ))) ), ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (ebpts[( kj + 1 )]) ))) ));
									}
									
									#line 220 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
									i6 = ( i6 + 1 );
									j4 = ( j4 - 1 );
									kj = ( kj - 1 );
								}
								
								#line 224 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
								first = ( first - 1 );
								last = ( last + 1 );
							}
							
						}
						
					}
					
					#line 229 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					if (( a != newDegree )) {
						#line 230 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
						int _g16 = 0;
						#line 230 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
						int _g10 = ( ph - oldr );
						#line 230 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
						while (( _g16 < _g10 )){
							#line 230 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
							int i7 = _g16++;
							Uh[kind] = ua;
							kind = ( kind + 1 );
						}
						
					}
					
					#line 236 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					{
						#line 236 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
						int _g17 = lbz;
						#line 236 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
						int _g18 = ( rbz + 1 );
						#line 236 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
						while (( _g17 < _g18 )){
							#line 236 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
							int j5 = _g17++;
							Qw[cind] = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (ebpts[j5]) ))) );
							cind = ( cind + 1 );
						}
						
					}
					
					#line 241 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					if (( b2 < m )) {
						#line 242 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
						{
							#line 242 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
							int _g19 = 0;
							#line 242 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
							while (( _g19 < ((int) (r) ) )){
								#line 242 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
								int j6 = _g19++;
								bpts[j6] = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (Nextbpts[j6]) ))) );
							}
							
						}
						
						#line 245 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
						{
							#line 245 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
							int _g110 = r;
							#line 245 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
							int _g20 = ( newDegree + 1 );
							#line 245 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
							while (( _g110 < _g20 )){
								#line 245 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
								int j7 = _g110++;
								bpts[j7] = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (controlPoints[( ( b2 - newDegree ) + j7 )]) ))) );
							}
							
						}
						
						#line 248 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
						a = b2;
						b2 = ( b2 + 1 );
						ua = ub;
					}
					 else {
						#line 253 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
						int _g111 = 0;
						#line 253 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
						int _g23 = ( ph + 1 );
						#line 253 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
						while (( _g111 < _g23 )){
							#line 253 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
							int i8 = _g111++;
							Uh[( kind + i8 )] = ub;
						}
						
					}
					
				}
				
				#line 258 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				nh = ( ( mh - ph ) - 1 );
				#line 260 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				return new global::verb.core.types.NurbsCurveData(((int) (finalDegree) ), ((global::Array<double>) (Uh) ), ((global::Array<object>) (Qw) ));
			}
			#line default
		}
		
		
		public static   global::verb.core.types.NurbsSurfaceData rationalSurfaceTransform(global::verb.core.types.NurbsSurfaceData surface, global::Array<object> mat){
			unchecked {
				#line 265 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				global::Array<object> pts = global::verb.core.Eval.dehomogenize2d(surface.controlPoints);
				#line 267 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				{
					#line 267 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					int _g1 = 0;
					#line 267 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					int _g = pts.length;
					#line 267 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					while (( _g1 < _g )){
						#line 267 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
						int i = _g1++;
						{
							#line 268 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
							int _g3 = 0;
							#line 268 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
							int _g2 = ((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (pts[i]) ))) ).length;
							#line 268 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
							while (( _g3 < _g2 )){
								#line 268 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
								int j = _g3++;
								global::Array<double> homoPt = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (pts[i]) ))) )[j]) ))) );
								homoPt.push(1.0);
								#line 272 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
								((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (pts[i]) ))) )[j] = global::verb.core.Mat.dot(mat, homoPt).slice(0, new global::haxe.lang.Null<int>(( homoPt.length - 1 ), true));
							}
							
						}
						
					}
					
				}
				
				#line 276 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				return new global::verb.core.types.NurbsSurfaceData(((int) (surface.degreeU) ), ((int) (surface.degreeV) ), ((global::Array<double>) (surface.knotsU.copy()) ), ((global::Array<double>) (surface.knotsV.copy()) ), ((global::Array<object>) (global::verb.core.Eval.homogenize2d(pts, global::verb.core.Eval.weight2d(surface.controlPoints))) ));
			}
			#line default
		}
		
		
		public static   global::verb.core.types.NurbsCurveData rationalCurveTransform(global::verb.core.types.NurbsCurveData curve, global::Array<object> mat){
			unchecked {
				#line 281 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				global::Array<object> pts = global::verb.core.Eval.dehomogenize1d(curve.controlPoints);
				#line 283 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				{
					#line 283 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					int _g1 = 0;
					#line 283 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					int _g = pts.length;
					#line 283 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					while (( _g1 < _g )){
						#line 283 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
						int i = _g1++;
						#line 285 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
						global::Array<double> homoPt = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (pts[i]) ))) );
						homoPt.push(1.0);
						#line 288 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
						pts[i] = global::verb.core.Mat.dot(mat, homoPt).slice(0, new global::haxe.lang.Null<int>(( homoPt.length - 1 ), true));
					}
					
				}
				
				#line 291 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				return new global::verb.core.types.NurbsCurveData(((int) (curve.degree) ), ((global::Array<double>) (curve.knots.copy()) ), ((global::Array<object>) (global::verb.core.Eval.homogenize1d(pts, global::verb.core.Eval.weight1d(curve.controlPoints))) ));
			}
			#line default
		}
		
		
		public static   global::verb.core.types.NurbsSurfaceData surfaceKnotRefine(global::verb.core.types.NurbsSurfaceData surface, global::Array<double> knotsToInsert, bool useV){
			unchecked {
				#line 300 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				global::Array<object> newPts = new global::Array<object>(new object[]{});
				#line 300 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				global::Array<double> knots = default(global::Array<double>);
				#line 300 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				int degree = default(int);
				#line 300 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				global::Array<object> ctrlPts = default(global::Array<object>);
				#line 306 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				if ( ! (useV) ) {
					#line 307 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					ctrlPts = global::verb.core.Mat.transpose<object>(surface.controlPoints);
					knots = surface.knotsU;
					degree = surface.degreeU;
				}
				 else {
					#line 312 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					ctrlPts = surface.controlPoints;
					knots = surface.knotsV;
					degree = surface.degreeV;
				}
				
				#line 318 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				global::verb.core.types.NurbsCurveData c = default(global::verb.core.types.NurbsCurveData);
				{
					#line 319 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					int _g = 0;
					#line 319 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					while (( _g < ctrlPts.length )){
						#line 319 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
						global::Array<object> cptrow = ((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (ctrlPts[_g]) ))) );
						#line 319 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
						 ++ _g;
						c = global::verb.core.Modify.curveKnotRefine(new global::verb.core.types.NurbsCurveData(((int) (degree) ), ((global::Array<double>) (knots) ), ((global::Array<object>) (cptrow) )), knotsToInsert);
						newPts.push(c.controlPoints);
					}
					
				}
				
				#line 324 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				global::Array<double> newknots = c.knots;
				#line 327 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				if ( ! (useV) ) {
					#line 328 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					newPts = global::verb.core.Mat.transpose<object>(newPts);
					return new global::verb.core.types.NurbsSurfaceData(((int) (surface.degreeU) ), ((int) (surface.degreeV) ), ((global::Array<double>) (newknots) ), ((global::Array<double>) (surface.knotsV.copy()) ), ((global::Array<object>) (newPts) ));
				}
				 else {
					#line 332 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					return new global::verb.core.types.NurbsSurfaceData(((int) (surface.degreeU) ), ((int) (surface.degreeV) ), ((global::Array<double>) (surface.knotsU.copy()) ), ((global::Array<double>) (newknots) ), ((global::Array<object>) (newPts) ));
				}
				
			}
			#line default
		}
		
		
		public static   global::Array<object> surfaceSplit(global::verb.core.types.NurbsSurfaceData surface, double u, global::haxe.lang.Null<bool> useV){
			unchecked {
				#line 337 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				bool __temp_useV64 = ( ( ! (useV.hasValue) ) ? (global::haxe.lang.Runtime.toBool(false)) : (useV.@value) );
				#line 339 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				global::Array<double> knots = default(global::Array<double>);
				#line 339 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				int degree = default(int);
				#line 339 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				global::Array<object> controlPoints = default(global::Array<object>);
				#line 343 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				if ( ! (__temp_useV64) ) {
					#line 345 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					controlPoints = global::verb.core.Mat.transpose<object>(surface.controlPoints);
					knots = surface.knotsU;
					degree = surface.degreeU;
				}
				 else {
					#line 351 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					controlPoints = surface.controlPoints;
					knots = surface.knotsV;
					degree = surface.degreeV;
				}
				
				#line 357 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				global::Array<double> knots_to_insert = default(global::Array<double>);
				#line 357 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				{
					#line 357 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					global::Array<double> _g = new global::Array<double>(new double[]{});
					#line 357 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					{
						#line 357 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
						int _g2 = 0;
						#line 357 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
						int _g1 = ( degree + 1 );
						#line 357 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
						while (( _g2 < _g1 )){
							#line 357 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
							int i = _g2++;
							#line 357 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
							_g.push(u);
						}
						
					}
					
					#line 357 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					knots_to_insert = _g;
				}
				
				#line 359 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				global::Array<object> newpts0 = new global::Array<object>();
				global::Array<object> newpts1 = new global::Array<object>();
				#line 362 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				int s = global::verb.core.Eval.knotSpan(degree, u, knots);
				global::verb.core.types.NurbsCurveData res = default(global::verb.core.types.NurbsCurveData);
				#line 365 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				{
					#line 365 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					int _g11 = 0;
					#line 365 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					while (( _g11 < controlPoints.length )){
						#line 365 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
						global::Array<object> cps = ((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (controlPoints[_g11]) ))) );
						#line 365 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
						 ++ _g11;
						#line 367 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
						res = global::verb.core.Modify.curveKnotRefine(new global::verb.core.types.NurbsCurveData(((int) (degree) ), ((global::Array<double>) (knots) ), ((global::Array<object>) (cps) )), knots_to_insert);
						#line 369 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
						newpts0.push(res.controlPoints.slice(0, new global::haxe.lang.Null<int>(( s + 1 ), true)));
						newpts1.push(res.controlPoints.slice(( s + 1 ), default(global::haxe.lang.Null<int>)));
					}
					
				}
				
				#line 374 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				global::Array<double> knots0 = res.knots.slice(0, new global::haxe.lang.Null<int>(( ( s + degree ) + 2 ), true));
				global::Array<double> knots1 = res.knots.slice(( s + 1 ), default(global::haxe.lang.Null<int>));
				#line 377 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				if ( ! (__temp_useV64) ) {
					#line 378 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					newpts0 = global::verb.core.Mat.transpose<object>(newpts0);
					newpts1 = global::verb.core.Mat.transpose<object>(newpts1);
					#line 381 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					return new global::Array<object>(new object[]{new global::verb.core.types.NurbsSurfaceData(((int) (degree) ), ((int) (surface.degreeV) ), ((global::Array<double>) (knots0) ), ((global::Array<double>) (surface.knotsV.copy()) ), ((global::Array<object>) (newpts0) )), new global::verb.core.types.NurbsSurfaceData(((int) (degree) ), ((int) (surface.degreeV) ), ((global::Array<double>) (knots1) ), ((global::Array<double>) (surface.knotsV.copy()) ), ((global::Array<object>) (newpts1) ))});
				}
				
				#line 386 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				return new global::Array<object>(new object[]{new global::verb.core.types.NurbsSurfaceData(((int) (surface.degreeU) ), ((int) (degree) ), ((global::Array<double>) (surface.knotsU.copy()) ), ((global::Array<double>) (knots0) ), ((global::Array<object>) (newpts0) )), new global::verb.core.types.NurbsSurfaceData(((int) (surface.degreeU) ), ((int) (degree) ), ((global::Array<double>) (surface.knotsU.copy()) ), ((global::Array<double>) (knots1) ), ((global::Array<object>) (newpts1) ))});
			}
			#line default
		}
		
		
		public static   global::Array<object> decomposeCurveIntoBeziers(global::verb.core.types.NurbsCurveData curve){
			unchecked {
				#line 403 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				int degree = curve.degree;
				global::Array<object> controlPoints = curve.controlPoints;
				global::Array<double> knots = curve.knots;
				#line 410 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				global::Array<object> knotmults = global::verb.core.Analyze.knotMultiplicities(knots);
				int reqMult = ( degree + 1 );
				#line 414 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				{
					#line 414 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					int _g = 0;
					#line 414 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					while (( _g < knotmults.length )){
						#line 414 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
						global::verb.core.KnotMultiplicity knotmult = ((global::verb.core.KnotMultiplicity) (knotmults[_g]) );
						#line 414 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
						 ++ _g;
						if (( knotmult.mult < reqMult )) {
							#line 417 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
							global::Array<double> knotsInsert = global::verb.core.Vec.rep<double>(( reqMult - knotmult.mult ), knotmult.knot);
							global::verb.core.types.NurbsCurveData res = global::verb.core.Modify.curveKnotRefine(new global::verb.core.types.NurbsCurveData(((int) (degree) ), ((global::Array<double>) (knots) ), ((global::Array<object>) (controlPoints) )), knotsInsert);
							#line 420 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
							knots = res.knots;
							controlPoints = res.controlPoints;
						}
						
					}
					
				}
				
				#line 425 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				double numCrvs = ( ( ((double) (knots.length) ) / reqMult ) - 1 );
				int crvKnotLength = ( reqMult * 2 );
				#line 428 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				global::Array<object> crvs = new global::Array<object>(new object[]{});
				#line 430 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				int i = 0;
				while (( i < controlPoints.length )){
					#line 432 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					global::Array<double> kts = knots.slice(i, new global::haxe.lang.Null<int>(( i + crvKnotLength ), true));
					global::Array<object> pts = controlPoints.slice(i, new global::haxe.lang.Null<int>(( i + reqMult ), true));
					#line 435 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					crvs.push(new global::verb.core.types.NurbsCurveData(((int) (degree) ), ((global::Array<double>) (kts) ), ((global::Array<object>) (pts) )));
					#line 437 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					i += reqMult;
				}
				
				#line 440 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				return crvs;
			}
			#line default
		}
		
		
		public static   global::Array<object> curveSplit(global::verb.core.types.NurbsCurveData curve, double u){
			unchecked {
				#line 455 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				int degree = curve.degree;
				global::Array<object> controlPoints = curve.controlPoints;
				global::Array<double> knots = curve.knots;
				#line 459 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				global::Array<double> knots_to_insert = default(global::Array<double>);
				#line 459 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				{
					#line 459 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					global::Array<double> _g = new global::Array<double>(new double[]{});
					#line 459 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					{
						#line 459 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
						int _g2 = 0;
						#line 459 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
						int _g1 = ( degree + 1 );
						#line 459 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
						while (( _g2 < _g1 )){
							#line 459 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
							int i = _g2++;
							#line 459 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
							_g.push(u);
						}
						
					}
					
					#line 459 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					knots_to_insert = _g;
				}
				
				#line 460 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				global::verb.core.types.NurbsCurveData res = global::verb.core.Modify.curveKnotRefine(curve, knots_to_insert);
				#line 462 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				int s = global::verb.core.Eval.knotSpan(degree, u, knots);
				#line 464 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				global::Array<double> knots0 = res.knots.slice(0, new global::haxe.lang.Null<int>(( ( s + degree ) + 2 ), true));
				global::Array<double> knots1 = res.knots.slice(( s + 1 ), default(global::haxe.lang.Null<int>));
				#line 467 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				global::Array<object> cpts0 = res.controlPoints.slice(0, new global::haxe.lang.Null<int>(( s + 1 ), true));
				global::Array<object> cpts1 = res.controlPoints.slice(( s + 1 ), default(global::haxe.lang.Null<int>));
				#line 470 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				return new global::Array<object>(new object[]{new global::verb.core.types.NurbsCurveData(((int) (degree) ), ((global::Array<double>) (knots0) ), ((global::Array<object>) (cpts0) )), new global::verb.core.types.NurbsCurveData(((int) (degree) ), ((global::Array<double>) (knots1) ), ((global::Array<object>) (cpts1) ))});
			}
			#line default
		}
		
		
		public static   global::verb.core.types.NurbsCurveData curveKnotRefine(global::verb.core.types.NurbsCurveData curve, global::Array<double> knotsToInsert){
			unchecked {
				#line 491 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				if (( knotsToInsert.length == 0 )) {
					#line 491 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					return global::verb.core.Make.clonedCurve(curve);
				}
				
				#line 493 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				int degree = curve.degree;
				global::Array<object> controlPoints = curve.controlPoints;
				global::Array<double> knots = curve.knots;
				#line 497 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				int n = ( controlPoints.length - 1 );
				int m = ( ( n + degree ) + 1 );
				int r = ( knotsToInsert.length - 1 );
				int a = global::verb.core.Eval.knotSpan(degree, knotsToInsert[0], knots);
				int b = global::verb.core.Eval.knotSpan(degree, knotsToInsert[r], knots);
				global::Array<object> controlPoints_post = new global::Array<object>();
				global::Array<double> knots_post = new global::Array<double>();
				#line 506 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				{
					#line 506 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					int _g1 = 0;
					#line 506 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					int _g = ( ( a - degree ) + 1 );
					#line 506 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					while (( _g1 < _g )){
						#line 506 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
						int i = _g1++;
						controlPoints_post[i] = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (controlPoints[i]) ))) );
					}
					
				}
				
				#line 510 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				{
					#line 510 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					int _g11 = ( b - 1 );
					#line 510 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					int _g2 = ( n + 1 );
					#line 510 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					while (( _g11 < _g2 )){
						#line 510 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
						int i1 = _g11++;
						controlPoints_post[( ( i1 + r ) + 1 )] = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (controlPoints[i1]) ))) );
					}
					
				}
				
				#line 515 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				{
					#line 515 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					int _g12 = 0;
					#line 515 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					int _g3 = ( a + 1 );
					#line 515 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					while (( _g12 < _g3 )){
						#line 515 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
						int i2 = _g12++;
						knots_post[i2] = knots[i2];
					}
					
				}
				
				#line 519 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				{
					#line 519 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					int _g13 = ( b + degree );
					#line 519 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					int _g4 = ( m + 1 );
					#line 519 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					while (( _g13 < _g4 )){
						#line 519 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
						int i3 = _g13++;
						knots_post[( ( i3 + r ) + 1 )] = knots[i3];
					}
					
				}
				
				#line 523 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				int i4 = ( ( b + degree ) - 1 );
				int k = ( ( b + degree ) + r );
				int j = r;
				#line 527 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				while (( j >= 0 )){
					#line 529 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					while (( ( knotsToInsert[j] <= knots[i4] ) && ( i4 > a ) )){
						#line 530 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
						controlPoints_post[( ( k - degree ) - 1 )] = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (controlPoints[( ( i4 - degree ) - 1 )]) ))) );
						knots_post[k] = knots[i4];
						k = ( k - 1 );
						i4 = ( i4 - 1 );
					}
					
					#line 536 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					controlPoints_post[( ( k - degree ) - 1 )] = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (controlPoints_post[( k - degree )]) ))) );
					#line 538 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					{
						#line 538 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
						int _g14 = 1;
						#line 538 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
						int _g5 = ( degree + 1 );
						#line 538 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
						while (( _g14 < _g5 )){
							#line 538 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
							int l = _g14++;
							#line 540 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
							int ind = ( ( k - degree ) + l );
							double alfa = ( knots_post[( k + l )] - knotsToInsert[j] );
							#line 543 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
							if (( global::System.Math.Abs(((double) (alfa) )) < 1e-10 )) {
								#line 544 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
								controlPoints_post[( ind - 1 )] = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (controlPoints_post[ind]) ))) );
							}
							 else {
								#line 546 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
								alfa = ( alfa / (( knots_post[( k + l )] - knots[( ( i4 - degree ) + l )] )) );
								#line 548 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
								controlPoints_post[( ind - 1 )] = global::verb.core.Vec.@add(global::verb.core.Vec.mul(alfa, ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (controlPoints_post[( ind - 1 )]) ))) )), global::verb.core.Vec.mul(( 1.0 - alfa ), ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (controlPoints_post[ind]) ))) )));
							}
							
						}
						
					}
					
					#line 555 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					knots_post[k] = knotsToInsert[j];
					k = ( k - 1 );
					#line 558 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					j--;
				}
				
				#line 562 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				return new global::verb.core.types.NurbsCurveData(((int) (degree) ), ((global::Array<double>) (knots_post) ), ((global::Array<object>) (controlPoints_post) ));
			}
			#line default
		}
		
		
		public static   global::verb.core.types.NurbsCurveData curveKnotInsert(global::verb.core.types.NurbsCurveData curve, double u, int r){
			unchecked {
				#line 585 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				int degree = curve.degree;
				global::Array<object> controlPoints = curve.controlPoints;
				global::Array<double> knots = curve.knots;
				#line 595 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				int s = 0;
				#line 597 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				int num_pts = controlPoints.length;
				int k = global::verb.core.Eval.knotSpan(degree, u, knots);
				int num_pts_post = ( num_pts + r );
				global::Array<object> controlPoints_temp = new global::Array<object>();
				global::Array<double> knots_post = new global::Array<double>();
				global::Array<object> controlPoints_post = new global::Array<object>();
				int i = 0;
				#line 608 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				{
					#line 608 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					int _g1 = 1;
					#line 608 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					int _g = ( k + 1 );
					#line 608 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					while (( _g1 < _g )){
						#line 608 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
						int i1 = _g1++;
						knots_post[i1] = knots[i1];
					}
					
				}
				
				#line 613 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				{
					#line 613 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					int _g11 = 1;
					#line 613 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					int _g2 = ( r + 1 );
					#line 613 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					while (( _g11 < _g2 )){
						#line 613 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
						int i2 = _g11++;
						knots_post[( k + i2 )] = u;
					}
					
				}
				
				#line 618 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				{
					#line 618 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					int _g12 = ( k + 1 );
					#line 618 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					int _g3 = knots.length;
					#line 618 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					while (( _g12 < _g3 )){
						#line 618 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
						int i3 = _g12++;
						knots_post[( i3 + r )] = knots[i3];
					}
					
				}
				
				#line 625 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				{
					#line 625 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					int _g13 = 0;
					#line 625 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					int _g4 = ( ( k - degree ) + 1 );
					#line 625 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					while (( _g13 < _g4 )){
						#line 625 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
						int i4 = _g13++;
						controlPoints_post[i4] = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (controlPoints[i4]) ))) );
					}
					
				}
				
				#line 630 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				{
					#line 630 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					int _g5 = ( k - s );
					#line 630 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					while (( _g5 < ((int) (num_pts) ) )){
						#line 630 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
						int i5 = _g5++;
						controlPoints_post[( i5 + r )] = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (controlPoints[i5]) ))) );
					}
					
				}
				
				#line 635 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				{
					#line 635 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					int _g14 = 0;
					#line 635 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					int _g6 = ( ( degree - s ) + 1 );
					#line 635 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					while (( _g14 < _g6 )){
						#line 635 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
						int i6 = _g14++;
						controlPoints_temp[i6] = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (controlPoints[( ( k - degree ) + i6 )]) ))) );
					}
					
				}
				
				#line 639 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				int L = 0;
				double alpha = ((double) (0) );
				#line 643 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				{
					#line 643 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					int _g15 = 1;
					#line 643 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					int _g7 = ( r + 1 );
					#line 643 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					while (( _g15 < _g7 )){
						#line 643 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
						int j = _g15++;
						#line 645 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
						L = ( ( k - degree ) + j );
						#line 647 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
						{
							#line 647 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
							int _g31 = 0;
							#line 647 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
							int _g21 = ( ( ( degree - j ) - s ) + 1 );
							#line 647 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
							while (( _g31 < _g21 )){
								#line 647 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
								int i7 = _g31++;
								#line 649 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
								alpha = ( (( u - knots[( L + i7 )] )) / (( knots[( ( i7 + k ) + 1 )] - knots[( L + i7 )] )) );
								#line 651 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
								controlPoints_temp[i7] = global::verb.core.Vec.@add(global::verb.core.Vec.mul(alpha, ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (controlPoints_temp[( i7 + 1 )]) ))) )), global::verb.core.Vec.mul(( 1.0 - alpha ), ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (controlPoints_temp[i7]) ))) )));
							}
							
						}
						
						#line 657 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
						controlPoints_post[L] = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (controlPoints_temp[0]) ))) );
						controlPoints_post[( ( ( k + r ) - j ) - s )] = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (controlPoints_temp[( ( degree - j ) - s )]) ))) );
					}
					
				}
				
				#line 663 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				{
					#line 663 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					int _g16 = ( L + 1 );
					#line 663 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					int _g8 = ( k - s );
					#line 663 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					while (( _g16 < _g8 )){
						#line 663 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
						int i8 = _g16++;
						controlPoints_post[i8] = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (controlPoints_temp[( i8 - L )]) ))) );
					}
					
				}
				
				#line 667 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				return new global::verb.core.types.NurbsCurveData(((int) (degree) ), ((global::Array<double>) (knots_post) ), ((global::Array<object>) (controlPoints_post) ));
			}
			#line default
		}
		
		
		public static  new object __hx_createEmpty(){
			unchecked {
				#line 14 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				return new global::verb.core.Modify(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) ));
			}
			#line default
		}
		
		
		public static  new object __hx_create(global::Array arr){
			unchecked {
				#line 14 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				return new global::verb.core.Modify();
			}
			#line default
		}
		
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core{
	public  class Modify_unifyCurveKnotVectors_48__Fun : global::haxe.lang.Function {
		public    Modify_unifyCurveKnotVectors_48__Fun() : base(2, 1){
			unchecked {
			}
			#line default
		}
		
		
		public static  global::verb.core.Modify_unifyCurveKnotVectors_48__Fun __hx_current;
		
		public override   double __hx_invoke2_f(double __fn_float1, object __fn_dyn1, double __fn_float2, object __fn_dyn2){
			unchecked {
				#line 48 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				int a = ( (global::haxe.lang.Runtime.eq(__fn_dyn2, global::haxe.lang.Runtime.undefined)) ? (((int) (__fn_float2) )) : (((int) (global::haxe.lang.Runtime.toInt(__fn_dyn2)) )) );
				#line 48 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				global::verb.core.types.NurbsCurveData x = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (((global::verb.core.types.NurbsCurveData) (((object) (__fn_float1) )) )) : (((global::verb.core.types.NurbsCurveData) (__fn_dyn1) )) );
				#line 48 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				{
					#line 48 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					int a1 = x.degree;
					#line 48 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
					if (( a1 > a )) {
						#line 48 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
						return ((double) (a1) );
					}
					 else {
						#line 48 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
						return ((double) (a) );
					}
					
				}
				
			}
			#line default
		}
		
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core{
	public  class Modify_unifyCurveKnotVectors_62__Fun : global::haxe.lang.Function {
		public    Modify_unifyCurveKnotVectors_62__Fun(global::Array<double> min) : base(1, 1){
			unchecked {
				#line 62 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				this.min = min;
			}
			#line default
		}
		
		
		public override   double __hx_invoke1_f(double __fn_float1, object __fn_dyn1){
			unchecked {
				#line 62 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				double x1 = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (((double) (__fn_float1) )) : (((double) (global::haxe.lang.Runtime.toDouble(__fn_dyn1)) )) );
				#line 62 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				return ( x1 - this.min[0] );
			}
			#line default
		}
		
		
		public  global::Array<double> min;
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core{
	public  class Modify_unifyCurveKnotVectors_66__Fun : global::haxe.lang.Function {
		public    Modify_unifyCurveKnotVectors_66__Fun() : base(1, 1){
			unchecked {
			}
			#line default
		}
		
		
		public static  global::verb.core.Modify_unifyCurveKnotVectors_66__Fun __hx_current;
		
		public override   double __hx_invoke1_f(double __fn_float1, object __fn_dyn1){
			unchecked {
				#line 66 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				global::verb.core.types.Interval<double> x2 = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (((global::verb.core.types.Interval<double>) (global::verb.core.types.Interval<object>.__hx_cast<double>(((global::verb.core.types.Interval) (((object) (__fn_float1) )) ))) )) : (((global::verb.core.types.Interval<double>) (global::verb.core.types.Interval<object>.__hx_cast<double>(((global::verb.core.types.Interval) (__fn_dyn1) ))) )) );
				#line 66 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				return ( x2.max - x2.min );
			}
			#line default
		}
		
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core{
	public  class Modify_unifyCurveKnotVectors_67__Fun : global::haxe.lang.Function {
		public    Modify_unifyCurveKnotVectors_67__Fun() : base(2, 1){
			unchecked {
			}
			#line default
		}
		
		
		public static  global::verb.core.Modify_unifyCurveKnotVectors_67__Fun __hx_current;
		
		public override   double __hx_invoke2_f(double __fn_float1, object __fn_dyn1, double __fn_float2, object __fn_dyn2){
			unchecked {
				#line 67 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				double a3 = ( (global::haxe.lang.Runtime.eq(__fn_dyn2, global::haxe.lang.Runtime.undefined)) ? (((double) (__fn_float2) )) : (((double) (global::haxe.lang.Runtime.toDouble(__fn_dyn2)) )) );
				#line 67 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				double x3 = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (((double) (__fn_float1) )) : (((double) (global::haxe.lang.Runtime.toDouble(__fn_dyn1)) )) );
				#line 67 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				return global::System.Math.Max(((double) (x3) ), ((double) (a3) ));
			}
			#line default
		}
		
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core{
	public  class Modify_unifyCurveKnotVectors_72__Fun : global::haxe.lang.Function {
		public    Modify_unifyCurveKnotVectors_72__Fun(global::Array<double> scale) : base(1, 1){
			unchecked {
				#line 72 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				this.scale = scale;
			}
			#line default
		}
		
		
		public override   double __hx_invoke1_f(double __fn_float1, object __fn_dyn1){
			unchecked {
				#line 72 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				double x4 = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (((double) (__fn_float1) )) : (((double) (global::haxe.lang.Runtime.toDouble(__fn_dyn1)) )) );
				#line 72 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				return ( x4 * this.scale[0] );
			}
			#line default
		}
		
		
		public  global::Array<double> scale;
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core{
	public  class Modify_unifyCurveKnotVectors_76__Fun : global::haxe.lang.Function {
		public    Modify_unifyCurveKnotVectors_76__Fun() : base(2, 0){
			unchecked {
			}
			#line default
		}
		
		
		public static  global::verb.core.Modify_unifyCurveKnotVectors_76__Fun __hx_current;
		
		public override   object __hx_invoke2_o(double __fn_float1, object __fn_dyn1, double __fn_float2, object __fn_dyn2){
			unchecked {
				#line 76 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				global::Array<double> a4 = ( (global::haxe.lang.Runtime.eq(__fn_dyn2, global::haxe.lang.Runtime.undefined)) ? (((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (((object) (__fn_float2) )) ))) )) : (((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (__fn_dyn2) ))) )) );
				#line 76 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				global::verb.core.types.NurbsCurveData x5 = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (((global::verb.core.types.NurbsCurveData) (((object) (__fn_float1) )) )) : (((global::verb.core.types.NurbsCurveData) (__fn_dyn1) )) );
				#line 76 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Modify.hx"
				return global::verb.core.Vec.sortedSetUnion(x5.knots, a4);
			}
			#line default
		}
		
		
	}
}


