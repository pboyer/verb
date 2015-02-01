
#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core{
	public  class Tess : global::haxe.lang.HxObject {
		public    Tess(global::haxe.lang.EmptyObject empty){
			unchecked {
				#line 13 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
				{
				}
				
			}
			#line default
		}
		
		
		public    Tess(){
			unchecked {
				#line 13 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
				global::verb.core.Tess.__hx_ctor_verb_core_Tess(this);
			}
			#line default
		}
		
		
		public static   void __hx_ctor_verb_core_Tess(global::verb.core.Tess __temp_me70){
			unchecked {
				#line 13 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
				{
				}
				
			}
			#line default
		}
		
		
		public static   global::Array<object> rationalCurveRegularSample(global::verb.core.types.NurbsCurveData curve, int numSamples, bool includeU){
			unchecked {
				#line 28 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
				double __temp_stmt256 = default(double);
				#line 28 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
				{
					#line 28 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
					global::Array<double> a = curve.knots;
					#line 28 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
					__temp_stmt256 = a[( a.length - 1 )];
				}
				
				#line 28 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
				return global::verb.core.Tess.rationalCurveRegularSampleRange(curve, curve.knots[0], __temp_stmt256, numSamples, includeU);
			}
			#line default
		}
		
		
		public static   global::Array<object> rationalCurveRegularSampleRange(global::verb.core.types.NurbsCurveData curve, double start, double end, int numSamples, bool includeU){
			unchecked {
				#line 48 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
				if (( numSamples < 1 )) {
					#line 49 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
					numSamples = 2;
				}
				
				#line 52 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
				global::Array<object> p = new global::Array<object>(new object[]{});
				double span = ( (( end - start )) / (( numSamples - 1 )) );
				double u = ((double) (0) );
				#line 56 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
				{
					#line 56 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
					int _g = 0;
					#line 56 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
					while (( _g < numSamples )){
						#line 56 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
						int i = _g++;
						#line 58 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
						u = ( start + ( span * i ) );
						#line 60 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
						if (includeU) {
							#line 61 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
							p.push(new global::Array<double>(new double[]{u}).concat(global::verb.core.Eval.rationalCurvePoint(curve, u)));
						}
						 else {
							#line 63 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
							p.push(global::verb.core.Eval.rationalCurvePoint(curve, u));
						}
						
					}
					
				}
				
				#line 68 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
				return p;
			}
			#line default
		}
		
		
		public static   global::Array<object> rationalCurveAdaptiveSample(global::verb.core.types.NurbsCurveData curve, global::haxe.lang.Null<double> tol, global::haxe.lang.Null<bool> includeU){
			unchecked {
				#line 84 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
				bool __temp_includeU69 = ( ( ! (includeU.hasValue) ) ? (global::haxe.lang.Runtime.toBool(false)) : (includeU.@value) );
				#line 84 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
				double __temp_tol68 = ( ( ! (tol.hasValue) ) ? (((double) (1e-6) )) : (tol.@value) );
				#line 87 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
				if (( curve.degree == 1 )) {
					#line 88 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
					if ( ! (__temp_includeU69) ) {
						#line 89 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
						return curve.controlPoints.map<object>(((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (typeof(global::verb.core.Eval)) ), ((string) ("dehomogenize") ), ((int) (486392430) ))) ));
					}
					 else {
						#line 93 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
						global::Array<object> _g = new global::Array<object>(new object[]{});
						#line 92 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
						{
							#line 92 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
							int _g2 = 0;
							#line 92 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
							int _g1 = curve.controlPoints.length;
							#line 92 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
							while (( _g2 < _g1 )){
								#line 92 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
								int i = _g2++;
								_g.push(new global::Array<double>(new double[]{curve.knots[( i + 1 )]}).concat(global::verb.core.Eval.dehomogenize(((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (curve.controlPoints[i]) ))) ))));
							}
							
						}
						
						#line 92 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
						return _g;
					}
					
				}
				
				#line 97 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
				double __temp_stmt257 = default(double);
				#line 97 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
				{
					#line 97 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
					global::Array<double> a = curve.knots;
					#line 97 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
					__temp_stmt257 = a[( a.length - 1 )];
				}
				
				#line 97 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
				return global::verb.core.Tess.rationalCurveAdaptiveSample_range(curve, curve.knots[0], __temp_stmt257, __temp_tol68, __temp_includeU69);
			}
			#line default
		}
		
		
		public static   global::Array<object> rationalCurveAdaptiveSample_range(global::verb.core.types.NurbsCurveData curve, double start, double end, double tol, bool includeU){
			unchecked {
				#line 116 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
				global::Array<double> p1 = global::verb.core.Eval.rationalCurvePoint(curve, start);
				global::Array<double> p3 = global::verb.core.Eval.rationalCurvePoint(curve, end);
				double t = ( 0.5 + ( 0.2 * global::Math.rand.NextDouble() ) );
				double mid = ( start + ( (( end - start )) * t ) );
				global::Array<double> p2 = global::verb.core.Eval.rationalCurvePoint(curve, mid);
				#line 123 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
				global::Array<double> diff = global::verb.core.Vec.sub(p1, p3);
				global::Array<double> diff2 = global::verb.core.Vec.sub(p1, p2);
				#line 127 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
				if (( ( ( global::verb.core.Vec.dot(diff, diff) < tol ) && ( global::verb.core.Vec.dot(diff2, diff2) > tol ) ) ||  ! (global::verb.core.Trig.threePointsAreFlat(p1, p2, p3, tol))  )) {
					#line 130 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
					double exact_mid = ( start + ( (( end - start )) * 0.5 ) );
					#line 133 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
					global::Array<object> left_pts = global::verb.core.Tess.rationalCurveAdaptiveSample_range(curve, start, exact_mid, tol, includeU);
					global::Array<object> right_pts = global::verb.core.Tess.rationalCurveAdaptiveSample_range(curve, exact_mid, end, tol, includeU);
					#line 137 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
					return left_pts.slice(0, new global::haxe.lang.Null<int>(-1, true)).concat(right_pts);
				}
				 else {
					#line 140 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
					if (includeU) {
						#line 141 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
						return new global::Array<object>(new object[]{new global::Array<double>(new double[]{start}).concat(p1), new global::Array<double>(new double[]{end}).concat(p3)});
					}
					 else {
						#line 143 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
						return new global::Array<object>(new object[]{p1, p3});
					}
					
				}
				
			}
			#line default
		}
		
		
		public static   global::verb.core.types.MeshData rationalSurfaceNaive(global::verb.core.types.NurbsSurfaceData surface, int divs_u, int divs_v){
			unchecked {
				#line 162 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
				if (( divs_u < 1 )) {
					#line 162 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
					divs_u = 1;
				}
				
				#line 163 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
				if (( divs_v < 1 )) {
					#line 163 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
					divs_v = 1;
				}
				
				#line 165 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
				int degreeU = surface.degreeU;
				int degreeV = surface.degreeV;
				global::Array<object> controlPoints = surface.controlPoints;
				global::Array<double> knotsU = surface.knotsU;
				global::Array<double> knotsV = surface.knotsV;
				#line 171 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
				double u_span = ( knotsU[( knotsU.length - 1 )] - knotsU[0] );
				double v_span = ( knotsV[( knotsV.length - 1 )] - knotsV[0] );
				#line 174 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
				double span_u = ( u_span / divs_u );
				double span_v = ( v_span / divs_v );
				#line 177 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
				global::Array<object> points = new global::Array<object>(new object[]{});
				global::Array<object> uvs = new global::Array<object>(new object[]{});
				global::Array<object> normals = new global::Array<object>(new object[]{});
				#line 181 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
				{
					#line 181 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
					int _g1 = 0;
					#line 181 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
					int _g = ( divs_u + 1 );
					#line 181 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
					while (( _g1 < _g )){
						#line 181 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
						int i = _g1++;
						{
							#line 182 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
							int _g3 = 0;
							#line 182 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
							int _g2 = ( divs_v + 1 );
							#line 182 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
							while (( _g3 < _g2 )){
								#line 182 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
								int j = _g3++;
								#line 184 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
								double pt_u = ( i * span_u );
								double pt_v = ( j * span_v );
								#line 187 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
								uvs.push(new global::Array<double>(new double[]{pt_u, pt_v}));
								#line 189 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
								global::Array<object> derivs = global::verb.core.Eval.rationalSurfaceDerivatives(surface, pt_u, pt_v, new global::haxe.lang.Null<int>(1, true));
								global::Array<double> pt = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (derivs[0]) ))) )[0]) ))) );
								#line 192 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
								points.push(pt);
								#line 194 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
								global::Array<double> normal = global::verb.core.Vec.normalized(global::verb.core.Vec.cross(((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (derivs[1]) ))) )[0]) ))) ), ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (derivs[0]) ))) )[1]) ))) )));
								normals.push(normal);
							}
							
						}
						
					}
					
				}
				
				#line 199 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
				global::Array<object> faces = new global::Array<object>(new object[]{});
				#line 201 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
				{
					#line 201 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
					int _g4 = 0;
					#line 201 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
					while (( _g4 < divs_u )){
						#line 201 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
						int i1 = _g4++;
						{
							#line 202 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
							int _g11 = 0;
							#line 202 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
							while (( _g11 < divs_v )){
								#line 202 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
								int j1 = _g11++;
								int a_i = ( ( i1 * (( divs_v + 1 )) ) + j1 );
								int b_i = ( ( (( i1 + 1 )) * (( divs_v + 1 )) ) + j1 );
								int c_i = ( b_i + 1 );
								int d_i = ( a_i + 1 );
								global::Array<int> abc = new global::Array<int>(new int[]{a_i, b_i, c_i});
								global::Array<int> acd = new global::Array<int>(new int[]{a_i, c_i, d_i});
								#line 210 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
								faces.push(abc);
								faces.push(acd);
							}
							
						}
						
					}
					
				}
				
				#line 215 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
				return new global::verb.core.types.MeshData(((global::Array<object>) (faces) ), ((global::Array<object>) (points) ), ((global::Array<object>) (normals) ), ((global::Array<object>) (uvs) ));
			}
			#line default
		}
		
		
		public static   global::Array<object> divideRationalSurfaceAdaptive(global::verb.core.types.NurbsSurfaceData surface, global::verb.core.types.AdaptiveRefinementOptions options){
			unchecked {
				#line 232 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
				if (( options == default(global::verb.core.types.AdaptiveRefinementOptions) )) {
					#line 232 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
					options = new global::verb.core.types.AdaptiveRefinementOptions();
				}
				
				#line 240 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
				int minU = ( (( surface.controlPoints.length - 1 )) * 2 );
				int minV = ( (( ((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (surface.controlPoints[0]) ))) ).length - 1 )) * 2 );
				#line 243 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
				int divsU = default(int);
				#line 243 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
				divsU = ( (( options.minDivsU > minU )) ? (options.minDivsU = options.minDivsU) : (options.minDivsU = minU) );
				int divsV = default(int);
				#line 244 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
				divsV = ( (( options.minDivsV > minV )) ? (options.minDivsV = options.minDivsV) : (options.minDivsV = minV) );
				#line 247 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
				double umax = default(double);
				#line 247 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
				{
					#line 247 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
					global::Array<double> a = surface.knotsU;
					#line 247 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
					umax = a[( a.length - 1 )];
				}
				
				#line 248 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
				double umin = surface.knotsU[0];
				double vmax = default(double);
				#line 249 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
				{
					#line 249 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
					global::Array<double> a1 = surface.knotsV;
					#line 249 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
					vmax = a1[( a1.length - 1 )];
				}
				
				#line 250 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
				double vmin = surface.knotsV[0];
				#line 252 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
				double du = ( (( umax - umin )) / divsU );
				double dv = ( (( vmax - vmin )) / divsV );
				#line 255 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
				global::Array<object> divs = new global::Array<object>(new object[]{});
				global::Array<object> pts = new global::Array<object>(new object[]{});
				#line 259 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
				{
					#line 259 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
					int _g1 = 0;
					#line 259 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
					int _g = ( divsV + 1 );
					#line 259 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
					while (( _g1 < _g )){
						#line 259 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
						int i = _g1++;
						global::Array<object> ptrow = new global::Array<object>(new object[]{});
						{
							#line 261 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
							int _g3 = 0;
							#line 261 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
							int _g2 = ( divsU + 1 );
							#line 261 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
							while (( _g3 < _g2 )){
								#line 261 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
								int j = _g3++;
								#line 263 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
								double u = ( umin + ( du * j ) );
								double v = ( vmin + ( dv * i ) );
								#line 267 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
								global::Array<object> ds = global::verb.core.Eval.rationalSurfaceDerivatives(surface, u, v, new global::haxe.lang.Null<int>(1, true));
								#line 269 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
								global::Array<double> norm = global::verb.core.Vec.normalized(global::verb.core.Vec.cross(((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (ds[0]) ))) )[1]) ))) ), ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (ds[1]) ))) )[0]) ))) )));
								ptrow.push(new global::verb.core.types.SurfacePoint(((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (ds[0]) ))) )[0]) ))) ), ((global::Array<double>) (norm) ), ((global::Array<double>) (new global::Array<double>(new double[]{u, v})) ), new global::haxe.lang.Null<int>(-1, true), new global::haxe.lang.Null<bool>(global::verb.core.Vec.isZero(norm), true)));
							}
							
						}
						
						#line 272 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
						pts.push(ptrow);
					}
					
				}
				
				#line 276 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
				{
					#line 276 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
					int _g4 = 0;
					#line 276 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
					while (( _g4 < ((int) (divsV) ) )){
						#line 276 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
						int i1 = _g4++;
						{
							#line 277 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
							int _g11 = 0;
							#line 277 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
							while (( _g11 < ((int) (divsU) ) )){
								#line 277 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
								int j1 = _g11++;
								global::Array<object> corners = new global::Array<object>(new object[]{((global::verb.core.types.SurfacePoint) (((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (pts[( ( divsV - i1 ) - 1 )]) ))) )[j1]) ), ((global::verb.core.types.SurfacePoint) (((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (pts[( ( divsV - i1 ) - 1 )]) ))) )[( j1 + 1 )]) ), ((global::verb.core.types.SurfacePoint) (((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (pts[( divsV - i1 )]) ))) )[( j1 + 1 )]) ), ((global::verb.core.types.SurfacePoint) (((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (pts[( divsV - i1 )]) ))) )[j1]) )});
								#line 283 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
								divs.push(new global::verb.core.types.AdaptiveRefinementNode(((global::verb.core.types.NurbsSurfaceData) (surface) ), ((global::Array<object>) (corners) ), ((global::Array<object>) (default(global::Array<object>)) )));
							}
							
						}
						
					}
					
				}
				
				#line 287 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
				if ( ! (options.refine) ) {
					#line 287 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
					return divs;
				}
				
				#line 290 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
				{
					#line 290 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
					int _g5 = 0;
					#line 290 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
					while (( _g5 < ((int) (divsV) ) )){
						#line 290 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
						int i2 = _g5++;
						{
							#line 291 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
							int _g12 = 0;
							#line 291 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
							while (( _g12 < ((int) (divsU) ) )){
								#line 291 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
								int j2 = _g12++;
								#line 293 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
								int ci = ( ( i2 * divsU ) + j2 );
								global::verb.core.types.AdaptiveRefinementNode n = global::verb.core.Tess.north(ci, i2, j2, divsU, divsV, divs);
								global::verb.core.types.AdaptiveRefinementNode e = global::verb.core.Tess.east(ci, i2, j2, divsU, divsV, divs);
								global::verb.core.types.AdaptiveRefinementNode s = global::verb.core.Tess.south(ci, i2, j2, divsU, divsV, divs);
								global::verb.core.types.AdaptiveRefinementNode w = global::verb.core.Tess.west(ci, i2, j2, divsU, divsV, divs);
								#line 299 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
								((global::verb.core.types.AdaptiveRefinementNode) (divs[ci]) ).neighbors = new global::Array<object>(new object[]{s, e, n, w});
								((global::verb.core.types.AdaptiveRefinementNode) (divs[ci]) ).divide(options);
							}
							
						}
						
					}
					
				}
				
				#line 304 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
				return divs;
			}
			#line default
		}
		
		
		public static   global::verb.core.types.AdaptiveRefinementNode north(int index, int i, int j, int divsU, int divsV, global::Array<object> divs){
			unchecked {
				#line 308 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
				if (( i == 0 )) {
					#line 308 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
					return default(global::verb.core.types.AdaptiveRefinementNode);
				}
				
				#line 309 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
				return ((global::verb.core.types.AdaptiveRefinementNode) (divs[( index - divsU )]) );
			}
			#line default
		}
		
		
		public static   global::verb.core.types.AdaptiveRefinementNode south(int index, int i, int j, int divsU, int divsV, global::Array<object> divs){
			unchecked {
				#line 313 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
				if (( i == ( divsV - 1 ) )) {
					#line 313 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
					return default(global::verb.core.types.AdaptiveRefinementNode);
				}
				
				#line 314 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
				return ((global::verb.core.types.AdaptiveRefinementNode) (divs[( index + divsU )]) );
			}
			#line default
		}
		
		
		public static   global::verb.core.types.AdaptiveRefinementNode east(int index, int i, int j, int divsU, int divsV, global::Array<object> divs){
			unchecked {
				#line 318 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
				if (( j == ( divsU - 1 ) )) {
					#line 318 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
					return default(global::verb.core.types.AdaptiveRefinementNode);
				}
				
				#line 319 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
				return ((global::verb.core.types.AdaptiveRefinementNode) (divs[( index + 1 )]) );
			}
			#line default
		}
		
		
		public static   global::verb.core.types.AdaptiveRefinementNode west(int index, int i, int j, int divsU, int divsV, global::Array<object> divs){
			unchecked {
				#line 323 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
				if (( j == 0 )) {
					#line 323 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
					return default(global::verb.core.types.AdaptiveRefinementNode);
				}
				
				#line 324 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
				return ((global::verb.core.types.AdaptiveRefinementNode) (divs[( index - 1 )]) );
			}
			#line default
		}
		
		
		public static   global::verb.core.types.MeshData triangulateAdaptiveRefinementNodeTree(global::Array<object> arrTree){
			unchecked {
				#line 330 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
				global::verb.core.types.MeshData mesh = global::verb.core.types.MeshData.empty();
				{
					#line 331 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
					int _g = 0;
					#line 331 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
					while (( _g < arrTree.length )){
						#line 331 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
						global::verb.core.types.AdaptiveRefinementNode x = ((global::verb.core.types.AdaptiveRefinementNode) (arrTree[_g]) );
						#line 331 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
						 ++ _g;
						#line 331 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
						x.triangulate(mesh);
					}
					
				}
				
				#line 332 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
				return mesh;
			}
			#line default
		}
		
		
		public static   global::verb.core.types.MeshData rationalSurfaceAdaptive(global::verb.core.types.NurbsSurfaceData surface, global::verb.core.types.AdaptiveRefinementOptions options){
			unchecked {
				#line 338 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
				if (( options != default(global::verb.core.types.AdaptiveRefinementOptions) )) {
					#line 338 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
					options = options;
				}
				 else {
					#line 338 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
					options = new global::verb.core.types.AdaptiveRefinementOptions();
				}
				
				#line 341 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
				global::Array<object> arrTrees = global::verb.core.Tess.divideRationalSurfaceAdaptive(surface, options);
				#line 344 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
				return global::verb.core.Tess.triangulateAdaptiveRefinementNodeTree(arrTrees);
			}
			#line default
		}
		
		
		public static  new object __hx_createEmpty(){
			unchecked {
				#line 13 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
				return new global::verb.core.Tess(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) ));
			}
			#line default
		}
		
		
		public static  new object __hx_create(global::Array arr){
			unchecked {
				#line 13 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Tess.hx"
				return new global::verb.core.Tess();
			}
			#line default
		}
		
		
	}
}


