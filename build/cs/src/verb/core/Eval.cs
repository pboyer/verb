
#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core{
	public  class Eval : global::haxe.lang.HxObject {
		public    Eval(global::haxe.lang.EmptyObject empty){
			unchecked {
				#line 10 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				{
				}
				
			}
			#line default
		}
		
		
		public    Eval(){
			unchecked {
				#line 10 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				global::verb.core.Eval.__hx_ctor_verb_core_Eval(this);
			}
			#line default
		}
		
		
		public static   void __hx_ctor_verb_core_Eval(global::verb.core.Eval __temp_me46){
			unchecked {
				#line 10 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				{
				}
				
			}
			#line default
		}
		
		
		public static   global::Array<double> volumePoint(global::verb.core.types.VolumeData volume, double u, double v, double w){
			unchecked {
				#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				int n = ( ( volume.knotsU.length - volume.degreeU ) - 2 );
				int m = ( ( volume.knotsV.length - volume.degreeV ) - 2 );
				int l = ( ( volume.knotsW.length - volume.degreeW ) - 2 );
				#line 29 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				return global::verb.core.Eval.volumePointGivenNML(volume, n, m, l, u, v, w);
			}
			#line default
		}
		
		
		public static   global::Array<double> volumePointGivenNML(global::verb.core.types.VolumeData volume, int n, int m, int l, double u, double v, double w){
			unchecked {
				#line 52 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				if (( (  ! (global::verb.core.Eval.areValidRelations(volume.degreeU, volume.controlPoints.length, volume.knotsU.length))  ||  ! (global::verb.core.Eval.areValidRelations(volume.degreeV, ((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (volume.controlPoints[0]) ))) ).length, volume.knotsV.length))  ) ||  ! (global::verb.core.Eval.areValidRelations(volume.degreeW, ((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (volume.controlPoints[0]) ))) )[0]) ))) ).length, volume.knotsW.length))  )) {
					#line 55 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
					throw global::haxe.lang.HaxeException.wrap("Invalid relations between control points and knot vector");
				}
				
				#line 58 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				global::Array<object> controlPoints = volume.controlPoints;
				int degreeU = volume.degreeU;
				int degreeV = volume.degreeV;
				int degreeW = volume.degreeW;
				global::Array<double> knotsU = volume.knotsU;
				global::Array<double> knotsV = volume.knotsV;
				global::Array<double> knotsW = volume.knotsW;
				#line 66 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				int dim = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (controlPoints[0]) ))) )[0]) ))) )[0]) ))) ).length;
				int knotSpan_index_u = global::verb.core.Eval.knotSpanGivenN(n, degreeU, u, knotsU);
				int knotSpan_index_v = global::verb.core.Eval.knotSpanGivenN(m, degreeV, v, knotsV);
				int knotSpan_index_w = global::verb.core.Eval.knotSpanGivenN(l, degreeW, w, knotsW);
				global::Array<double> u_basis_vals = global::verb.core.Eval.basisFunctionsGivenKnotSpanIndex(knotSpan_index_u, u, degreeU, knotsU);
				global::Array<double> v_basis_vals = global::verb.core.Eval.basisFunctionsGivenKnotSpanIndex(knotSpan_index_v, v, degreeV, knotsV);
				global::Array<double> w_basis_vals = global::verb.core.Eval.basisFunctionsGivenKnotSpanIndex(knotSpan_index_w, w, degreeW, knotsW);
				int uind = ( knotSpan_index_u - degreeU );
				global::Array<double> position = global::verb.core.Vec.zeros1d(dim);
				global::Array<double> temp = global::verb.core.Vec.zeros1d(dim);
				global::Array<double> temp2 = global::verb.core.Vec.zeros1d(dim);
				#line 78 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				{
					#line 78 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
					int _g1 = 0;
					#line 78 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
					int _g = ( degreeW + 1 );
					#line 78 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
					while (( _g1 < _g )){
						#line 78 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
						int i = _g1++;
						#line 80 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
						temp2 = global::verb.core.Vec.zeros1d(dim);
						int wind = ( ( knotSpan_index_w - degreeW ) + i );
						#line 83 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
						{
							#line 83 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
							int _g3 = 0;
							#line 83 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
							int _g2 = ( degreeV + 1 );
							#line 83 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
							while (( _g3 < _g2 )){
								#line 83 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
								int j = _g3++;
								#line 85 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
								temp = global::verb.core.Vec.zeros1d(dim);
								int vind = ( ( knotSpan_index_v - degreeV ) + j );
								#line 88 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
								{
									#line 88 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
									int _g5 = 0;
									#line 88 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
									int _g4 = ( degreeU + 1 );
									#line 88 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
									while (( _g5 < _g4 )){
										#line 88 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
										int k = _g5++;
										temp = global::verb.core.Vec.@add(temp, global::verb.core.Vec.mul(u_basis_vals[k], ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (controlPoints[( uind + k )]) ))) )[vind]) ))) )[wind]) ))) )));
									}
									
								}
								
								#line 93 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
								temp2 = global::verb.core.Vec.@add(temp2, global::verb.core.Vec.mul(v_basis_vals[j], temp));
							}
							
						}
						
						#line 97 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
						position = global::verb.core.Vec.@add(position, global::verb.core.Vec.mul(w_basis_vals[i], temp2));
					}
					
				}
				
				#line 100 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				return position;
			}
			#line default
		}
		
		
		public static   global::Array<double> rationalCurveTangent(global::verb.core.types.NurbsCurveData curve, double u){
			unchecked {
				#line 114 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				global::Array<object> derivs = global::verb.core.Eval.rationalCurveDerivatives(curve, u, new global::haxe.lang.Null<int>(1, true));
				return ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (derivs[1]) ))) );
			}
			#line default
		}
		
		
		public static   global::Array<double> rationalSurfaceNormal(global::verb.core.types.NurbsSurfaceData surface, double u, double v){
			unchecked {
				#line 129 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				global::Array<object> derivs = global::verb.core.Eval.rationalSurfaceDerivatives(surface, u, v, new global::haxe.lang.Null<int>(1, true));
				return global::verb.core.Vec.cross(((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (derivs[1]) ))) )[0]) ))) ), ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (derivs[0]) ))) )[1]) ))) ));
			}
			#line default
		}
		
		
		public static   global::Array<object> rationalSurfaceDerivatives(global::verb.core.types.NurbsSurfaceData surface, double u, double v, global::haxe.lang.Null<int> numDerivs){
			unchecked {
				#line 147 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				int __temp_numDerivs44 = ( ( ! (numDerivs.hasValue) ) ? (((int) (1) )) : (numDerivs.@value) );
				#line 149 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				global::Array<object> ders = global::verb.core.Eval.surfaceDerivatives(surface, u, v, __temp_numDerivs44);
				global::Array<object> Aders = global::verb.core.Eval.rational2d(ders);
				global::Array<object> wders = global::verb.core.Eval.weight2d(ders);
				global::Array<object> SKL = new global::Array<object>();
				int dim = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (Aders[0]) ))) )[0]) ))) ).length;
				#line 155 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				{
					#line 155 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
					int _g1 = 0;
					#line 155 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
					int _g = ( __temp_numDerivs44 + 1 );
					#line 155 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
					while (( _g1 < _g )){
						#line 155 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
						int k = _g1++;
						SKL.push(new global::Array<object>());
						#line 158 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
						{
							#line 158 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
							int _g3 = 0;
							#line 158 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
							int _g2 = ( ( __temp_numDerivs44 - k ) + 1 );
							#line 158 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
							while (( _g3 < _g2 )){
								#line 158 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
								int l = _g3++;
								global::Array<double> v1 = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (Aders[k]) ))) )[l]) ))) );
								#line 161 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
								{
									#line 161 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
									int _g5 = 1;
									#line 161 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
									int _g4 = ( l + 1 );
									#line 161 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
									while (( _g5 < _g4 )){
										#line 161 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
										int j = _g5++;
										v1 = global::verb.core.Vec.sub(v1, global::verb.core.Vec.mul(( global::verb.core.Binomial.@get(l, j) * ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (wders[0]) ))) )[j] ), ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (SKL[k]) ))) )[( l - j )]) ))) )));
									}
									
								}
								
								#line 165 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
								{
									#line 165 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
									int _g51 = 1;
									#line 165 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
									int _g41 = ( k + 1 );
									#line 165 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
									while (( _g51 < _g41 )){
										#line 165 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
										int i = _g51++;
										v1 = global::verb.core.Vec.sub(v1, global::verb.core.Vec.mul(( global::verb.core.Binomial.@get(k, i) * ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (wders[i]) ))) )[0] ), ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (SKL[( k - i )]) ))) )[l]) ))) )));
										#line 168 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
										global::Array<double> v2 = global::verb.core.Vec.zeros1d(dim);
										#line 170 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
										{
											#line 170 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
											int _g7 = 1;
											#line 170 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
											int _g6 = ( l + 1 );
											#line 170 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
											while (( _g7 < _g6 )){
												#line 170 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
												int j1 = _g7++;
												v2 = global::verb.core.Vec.@add(v2, global::verb.core.Vec.mul(( global::verb.core.Binomial.@get(l, j1) * ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (wders[i]) ))) )[j1] ), ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (SKL[( k - i )]) ))) )[( l - j1 )]) ))) )));
											}
											
										}
										
										#line 174 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
										v1 = global::verb.core.Vec.sub(v1, global::verb.core.Vec.mul(global::verb.core.Binomial.@get(k, i), v2));
									}
									
								}
								
								#line 178 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
								((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (SKL[k]) ))) ).push(global::verb.core.Vec.mul(( 1 / ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (wders[0]) ))) )[0] ), v1));
							}
							
						}
						
					}
					
				}
				
				#line 182 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				return SKL;
			}
			#line default
		}
		
		
		public static   global::Array<double> rationalSurfacePoint(global::verb.core.types.NurbsSurfaceData surface, double u, double v){
			unchecked {
				#line 202 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				return global::verb.core.Eval.dehomogenize(global::verb.core.Eval.surfacePoint(surface, u, v));
			}
			#line default
		}
		
		
		public static   global::Array<object> rationalCurveDerivatives(global::verb.core.types.NurbsCurveData curve, double u, global::haxe.lang.Null<int> numDerivs){
			unchecked {
				#line 216 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				int __temp_numDerivs45 = ( ( ! (numDerivs.hasValue) ) ? (((int) (1) )) : (numDerivs.@value) );
				#line 218 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				global::Array<object> ders = global::verb.core.Eval.curveDerivatives(curve, u, __temp_numDerivs45);
				global::Array<object> Aders = global::verb.core.Eval.rational1d(ders);
				global::Array<double> wders = global::verb.core.Eval.weight1d(ders);
				int k = 0;
				int i = 0;
				global::Array<object> CK = new global::Array<object>(new object[]{});
				#line 225 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				{
					#line 225 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
					int _g1 = 0;
					#line 225 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
					int _g = ( __temp_numDerivs45 + 1 );
					#line 225 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
					while (( _g1 < _g )){
						#line 225 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
						int k1 = _g1++;
						global::Array<double> v = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (Aders[k1]) ))) );
						#line 228 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
						{
							#line 228 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
							int _g3 = 1;
							#line 228 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
							int _g2 = ( k1 + 1 );
							#line 228 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
							while (( _g3 < _g2 )){
								#line 228 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
								int i1 = _g3++;
								v = global::verb.core.Vec.sub(v, global::verb.core.Vec.mul(( global::verb.core.Binomial.@get(k1, i1) * wders[i1] ), ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (CK[( k1 - i1 )]) ))) )));
							}
							
						}
						
						#line 231 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
						CK.push(global::verb.core.Vec.mul(( 1 / wders[0] ), v));
					}
					
				}
				
				#line 234 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				return CK;
			}
			#line default
		}
		
		
		public static   global::Array<double> rationalCurvePoint(global::verb.core.types.NurbsCurveData curve, double u){
			unchecked {
				#line 251 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				return global::verb.core.Eval.dehomogenize(global::verb.core.Eval.curvePoint(curve, u));
			}
			#line default
		}
		
		
		public static   global::Array<double> dehomogenize(global::Array<double> homoPoint){
			unchecked {
				#line 264 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				int dim = homoPoint.length;
				global::Array<double> point = new global::Array<double>(new double[]{});
				double wt = homoPoint[( dim - 1 )];
				int l = ( homoPoint.length - 1 );
				#line 269 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				{
					#line 269 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
					int _g = 0;
					#line 269 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
					while (( _g < ((int) (l) ) )){
						#line 269 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
						int i = _g++;
						point.push(( homoPoint[i] / wt ));
					}
					
				}
				
				#line 273 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				return point;
			}
			#line default
		}
		
		
		public static   global::Array<object> rational1d(global::Array<object> homoPoints){
			unchecked {
				#line 286 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				global::Array<int> dim = new global::Array<int>(new int[]{( ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (homoPoints[0]) ))) ).length - 1 )});
				return homoPoints.map<object>(new global::verb.core.Eval_rational1d_287__Fun(((global::Array<int>) (dim) )));
			}
			#line default
		}
		
		
		public static   global::Array<object> rational2d(global::Array<object> homoPoints){
			unchecked {
				#line 300 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				return homoPoints.map<object>(((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (typeof(global::verb.core.Eval)) ), ((string) ("rational1d") ), ((int) (2146190145) ))) ));
			}
			#line default
		}
		
		
		public static   global::Array<double> weight1d(global::Array<object> homoPoints){
			unchecked {
				#line 313 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				global::Array<int> dim = new global::Array<int>(new int[]{( ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (homoPoints[0]) ))) ).length - 1 )});
				return homoPoints.map<double>(new global::verb.core.Eval_weight1d_314__Fun(((global::Array<int>) (dim) )));
			}
			#line default
		}
		
		
		public static   global::Array<object> weight2d(global::Array<object> homoPoints){
			unchecked {
				#line 327 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				return homoPoints.map<object>(((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (typeof(global::verb.core.Eval)) ), ((string) ("weight1d") ), ((int) (222292619) ))) ));
			}
			#line default
		}
		
		
		public static   global::Array<object> dehomogenize1d(global::Array<object> homoPoints){
			unchecked {
				#line 340 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				return homoPoints.map<object>(((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (typeof(global::verb.core.Eval)) ), ((string) ("dehomogenize") ), ((int) (486392430) ))) ));
			}
			#line default
		}
		
		
		public static   global::Array<object> dehomogenize2d(global::Array<object> homoPoints){
			unchecked {
				#line 352 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				return homoPoints.map<object>(((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (typeof(global::verb.core.Eval)) ), ((string) ("dehomogenize1d") ), ((int) (700835073) ))) ));
			}
			#line default
		}
		
		
		public static   global::Array<object> homogenize1d(global::Array<object> controlPoints, global::Array<double> weights){
			unchecked {
				#line 368 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				int rows = controlPoints.length;
				int dim = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (controlPoints[0]) ))) ).length;
				global::Array<object> homo_controlPoints = new global::Array<object>();
				double wt = 0.0;
				global::Array<double> ref_pt = new global::Array<double>();
				global::Array<double> weights1 = default(global::Array<double>);
				#line 373 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				if (( weights != default(global::Array<double>) )) {
					#line 373 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
					weights1 = weights;
				}
				 else {
					#line 373 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
					weights1 = global::verb.core.Vec.rep<double>(controlPoints.length, 1.0);
				}
				
				#line 375 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				{
					#line 375 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
					int _g = 0;
					#line 375 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
					while (( _g < ((int) (rows) ) )){
						#line 375 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
						int i = _g++;
						#line 377 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
						global::Array<double> pt = new global::Array<double>(new double[]{});
						ref_pt = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (controlPoints[i]) ))) );
						wt = weights1[i];
						#line 381 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
						{
							#line 381 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
							int _g1 = 0;
							#line 381 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
							while (( _g1 < ((int) (dim) ) )){
								#line 381 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
								int k = _g1++;
								pt.push(( ref_pt[k] * wt ));
							}
							
						}
						
						#line 386 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
						pt.push(wt);
						#line 388 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
						homo_controlPoints.push(pt);
					}
					
				}
				
				#line 391 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				return homo_controlPoints;
			}
			#line default
		}
		
		
		public static   global::Array<object> homogenize2d(global::Array<object> controlPoints, global::Array<object> weights){
			unchecked {
				#line 406 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				int rows = controlPoints.length;
				global::Array<object> homo_controlPoints = new global::Array<object>();
				global::Array<object> weights1 = default(global::Array<object>);
				#line 408 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				if (( weights != default(global::Array<object>) )) {
					#line 408 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
					weights1 = weights;
				}
				 else {
					#line 408 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
					global::Array<object> _g = new global::Array<object>(new object[]{});
					#line 408 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
					{
						#line 408 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
						int _g1 = 0;
						#line 408 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
						while (( _g1 < ((int) (rows) ) )){
							#line 408 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
							int i = _g1++;
							#line 408 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
							_g.push(global::verb.core.Vec.rep<double>(((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (controlPoints[0]) ))) ).length, 1.0));
						}
						
					}
					
					#line 408 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
					weights1 = _g;
				}
				
				#line 410 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				{
					#line 410 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
					int _g11 = 0;
					#line 410 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
					while (( _g11 < ((int) (rows) ) )){
						#line 410 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
						int i1 = _g11++;
						homo_controlPoints.push(global::verb.core.Eval.homogenize1d(((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (controlPoints[i1]) ))) ), ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (weights1[i1]) ))) )));
					}
					
				}
				
				#line 414 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				return homo_controlPoints;
			}
			#line default
		}
		
		
		public static   global::Array<object> surfaceDerivatives(global::verb.core.types.NurbsSurfaceData surface, double u, double v, int numDerivs){
			unchecked {
				#line 430 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				int n = ( ( surface.knotsU.length - surface.degreeU ) - 2 );
				int m = ( ( surface.knotsV.length - surface.degreeV ) - 2 );
				#line 433 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				return global::verb.core.Eval.surfaceDerivativesGivenNM(n, m, surface, u, v, numDerivs);
			}
			#line default
		}
		
		
		public static   global::Array<object> surfaceDerivativesGivenNM(int n, int m, global::verb.core.types.NurbsSurfaceData surface, double u, double v, int numDerivs){
			unchecked {
				#line 457 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				int degreeU = surface.degreeU;
				int degreeV = surface.degreeV;
				global::Array<object> controlPoints = surface.controlPoints;
				global::Array<double> knotsU = surface.knotsU;
				global::Array<double> knotsV = surface.knotsV;
				#line 463 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				if ((  ! (global::verb.core.Eval.areValidRelations(degreeU, controlPoints.length, knotsU.length))  ||  ! (global::verb.core.Eval.areValidRelations(degreeV, ((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (controlPoints[0]) ))) ).length, knotsV.length))  )) {
					#line 466 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
					throw global::haxe.lang.HaxeException.wrap("Invalid relations between control points, knot vector, and n");
				}
				
				#line 469 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				int dim = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (controlPoints[0]) ))) )[0]) ))) ).length;
				int du = default(int);
				#line 470 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				if (( numDerivs < degreeU )) {
					#line 470 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
					du = numDerivs;
				}
				 else {
					#line 470 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
					du = degreeU;
				}
				
				#line 471 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				int dv = default(int);
				#line 471 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				if (( numDerivs < degreeV )) {
					#line 471 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
					dv = numDerivs;
				}
				 else {
					#line 471 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
					dv = degreeV;
				}
				
				#line 472 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				global::Array<object> SKL = global::verb.core.Vec.zeros3d(( du + 1 ), ( dv + 1 ), dim);
				int knotSpan_index_u = global::verb.core.Eval.knotSpanGivenN(n, degreeU, u, knotsU);
				int knotSpan_index_v = global::verb.core.Eval.knotSpanGivenN(m, degreeV, v, knotsV);
				global::Array<object> uders = global::verb.core.Eval.derivativeBasisFunctionsGivenNI(knotSpan_index_u, u, degreeU, n, knotsU);
				global::Array<object> vders = global::verb.core.Eval.derivativeBasisFunctionsGivenNI(knotSpan_index_v, v, degreeV, m, knotsV);
				global::Array<object> temp = global::verb.core.Vec.zeros2d(( degreeV + 1 ), dim);
				int dd = 0;
				#line 480 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				{
					#line 480 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
					int _g1 = 0;
					#line 480 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
					int _g = ( du + 1 );
					#line 480 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
					while (( _g1 < _g )){
						#line 480 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
						int k = _g1++;
						{
							#line 481 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
							int _g3 = 0;
							#line 481 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
							int _g2 = ( degreeV + 1 );
							#line 481 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
							while (( _g3 < _g2 )){
								#line 481 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
								int s = _g3++;
								temp[s] = global::verb.core.Vec.zeros1d(dim);
								#line 484 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
								{
									#line 484 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
									int _g5 = 0;
									#line 484 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
									int _g4 = ( degreeU + 1 );
									#line 484 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
									while (( _g5 < _g4 )){
										#line 484 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
										int r = _g5++;
										temp[s] = global::verb.core.Vec.@add(((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (temp[s]) ))) ), global::verb.core.Vec.mul(((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (uders[k]) ))) )[r], ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (controlPoints[( ( knotSpan_index_u - degreeU ) + r )]) ))) )[( ( knotSpan_index_v - degreeV ) + s )]) ))) )));
									}
									
								}
								
							}
							
						}
						
						#line 490 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
						int nk = ( numDerivs - k );
						if (( nk < dv )) {
							#line 491 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
							dd = nk;
						}
						 else {
							#line 491 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
							dd = dv;
						}
						
						#line 493 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
						{
							#line 493 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
							int _g31 = 0;
							#line 493 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
							int _g21 = ( dd + 1 );
							#line 493 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
							while (( _g31 < _g21 )){
								#line 493 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
								int l = _g31++;
								((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (SKL[k]) ))) )[l] = global::verb.core.Vec.zeros1d(dim);
								#line 496 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
								{
									#line 496 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
									int _g51 = 0;
									#line 496 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
									int _g41 = ( degreeV + 1 );
									#line 496 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
									while (( _g51 < _g41 )){
										#line 496 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
										int s1 = _g51++;
										((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (SKL[k]) ))) )[l] = global::verb.core.Vec.@add(((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (SKL[k]) ))) )[l]) ))) ), global::verb.core.Vec.mul(((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (vders[l]) ))) )[s1], ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (temp[s1]) ))) )));
									}
									
								}
								
							}
							
						}
						
					}
					
				}
				
				#line 502 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				return SKL;
			}
			#line default
		}
		
		
		public static   global::Array<double> surfacePoint(global::verb.core.types.NurbsSurfaceData surface, double u, double v){
			unchecked {
				#line 517 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				int n = ( ( surface.knotsU.length - surface.degreeU ) - 2 );
				int m = ( ( surface.knotsV.length - surface.degreeV ) - 2 );
				#line 520 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				return global::verb.core.Eval.surfacePointGivenNM(n, m, surface, u, v);
			}
			#line default
		}
		
		
		public static   global::Array<double> surfacePointGivenNM(int n, int m, global::verb.core.types.NurbsSurfaceData surface, double u, double v){
			unchecked {
				#line 539 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				int degreeU = surface.degreeU;
				int degreeV = surface.degreeV;
				global::Array<object> controlPoints = surface.controlPoints;
				global::Array<double> knotsU = surface.knotsU;
				global::Array<double> knotsV = surface.knotsV;
				#line 545 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				if ((  ! (global::verb.core.Eval.areValidRelations(degreeU, controlPoints.length, knotsU.length))  ||  ! (global::verb.core.Eval.areValidRelations(degreeV, ((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (controlPoints[0]) ))) ).length, knotsV.length))  )) {
					#line 548 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
					throw global::haxe.lang.HaxeException.wrap("Invalid relations between control points, knot vector, and n");
				}
				
				#line 551 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				int dim = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (controlPoints[0]) ))) )[0]) ))) ).length;
				int knotSpan_index_u = global::verb.core.Eval.knotSpanGivenN(n, degreeU, u, knotsU);
				int knotSpan_index_v = global::verb.core.Eval.knotSpanGivenN(m, degreeV, v, knotsV);
				global::Array<double> u_basis_vals = global::verb.core.Eval.basisFunctionsGivenKnotSpanIndex(knotSpan_index_u, u, degreeU, knotsU);
				global::Array<double> v_basis_vals = global::verb.core.Eval.basisFunctionsGivenKnotSpanIndex(knotSpan_index_v, v, degreeV, knotsV);
				int uind = ( knotSpan_index_u - degreeU );
				int vind = knotSpan_index_v;
				global::Array<double> position = global::verb.core.Vec.zeros1d(dim);
				global::Array<double> temp = global::verb.core.Vec.zeros1d(dim);
				#line 561 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				{
					#line 561 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
					int _g1 = 0;
					#line 561 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
					int _g = ( degreeV + 1 );
					#line 561 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
					while (( _g1 < _g )){
						#line 561 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
						int l = _g1++;
						#line 563 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
						temp = global::verb.core.Vec.zeros1d(dim);
						vind = ( ( knotSpan_index_v - degreeV ) + l );
						#line 567 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
						{
							#line 567 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
							int _g3 = 0;
							#line 567 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
							int _g2 = ( degreeU + 1 );
							#line 567 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
							while (( _g3 < _g2 )){
								#line 567 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
								int k = _g3++;
								temp = global::verb.core.Vec.@add(temp, global::verb.core.Vec.mul(u_basis_vals[k], ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (controlPoints[( uind + k )]) ))) )[vind]) ))) )));
							}
							
						}
						
						#line 572 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
						position = global::verb.core.Vec.@add(position, global::verb.core.Vec.mul(v_basis_vals[l], temp));
					}
					
				}
				
				#line 575 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				return position;
			}
			#line default
		}
		
		
		public static   global::Array<object> curveDerivatives(global::verb.core.types.NurbsCurveData crv, double u, int numDerivs){
			unchecked {
				#line 591 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				int n = ( ( crv.knots.length - crv.degree ) - 2 );
				return global::verb.core.Eval.curveDerivativesGivenN(n, crv, u, numDerivs);
			}
			#line default
		}
		
		
		public static   global::Array<object> curveDerivativesGivenN(int n, global::verb.core.types.NurbsCurveData curve, double u, int numDerivs){
			unchecked {
				#line 610 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				int degree = curve.degree;
				global::Array<object> controlPoints = curve.controlPoints;
				global::Array<double> knots = curve.knots;
				#line 614 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				if ( ! (global::verb.core.Eval.areValidRelations(degree, controlPoints.length, knots.length)) ) {
					#line 615 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
					throw global::haxe.lang.HaxeException.wrap("Invalid relations between control points, knot vector, and n");
				}
				
				#line 618 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				int dim = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (controlPoints[0]) ))) ).length;
				int du = default(int);
				#line 619 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				if (( numDerivs < degree )) {
					#line 619 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
					du = numDerivs;
				}
				 else {
					#line 619 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
					du = degree;
				}
				
				#line 620 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				global::Array<object> CK = global::verb.core.Vec.zeros2d(( du + 1 ), dim);
				int knotSpan_index = global::verb.core.Eval.knotSpanGivenN(n, degree, u, knots);
				global::Array<object> nders = global::verb.core.Eval.derivativeBasisFunctionsGivenNI(knotSpan_index, u, degree, du, knots);
				int k = 0;
				int j = 0;
				#line 626 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				{
					#line 626 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
					int _g1 = 0;
					#line 626 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
					int _g = ( du + 1 );
					#line 626 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
					while (( _g1 < _g )){
						#line 626 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
						int k1 = _g1++;
						{
							#line 627 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
							int _g3 = 0;
							#line 627 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
							int _g2 = ( degree + 1 );
							#line 627 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
							while (( _g3 < _g2 )){
								#line 627 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
								int j1 = _g3++;
								CK[k1] = global::verb.core.Vec.@add(((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (CK[k1]) ))) ), global::verb.core.Vec.mul(((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (nders[k1]) ))) )[j1], ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (controlPoints[( ( knotSpan_index - degree ) + j1 )]) ))) )));
							}
							
						}
						
					}
					
				}
				
				#line 631 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				return CK;
			}
			#line default
		}
		
		
		public static   global::Array<double> curvePoint(global::verb.core.types.NurbsCurveData curve, double u){
			unchecked {
				#line 644 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				int n = ( ( curve.knots.length - curve.degree ) - 2 );
				return global::verb.core.Eval.curvePointGivenN(n, curve, u);
			}
			#line default
		}
		
		
		public static   bool areValidRelations(int degree, int num_controlPoints, int knots_length){
			unchecked {
				#line 660 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				return ( ( ( ( num_controlPoints + degree ) + 1 ) - knots_length ) == 0 );
			}
			#line default
		}
		
		
		public static   global::Array<double> curvePointGivenN(int n, global::verb.core.types.NurbsCurveData curve, double u){
			unchecked {
				#line 676 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				int degree = curve.degree;
				global::Array<object> controlPoints = curve.controlPoints;
				global::Array<double> knots = curve.knots;
				#line 680 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				if ( ! (global::verb.core.Eval.areValidRelations(degree, controlPoints.length, knots.length)) ) {
					#line 681 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
					throw global::haxe.lang.HaxeException.wrap("Invalid relations between control points, knot Array, and n");
				}
				
				#line 685 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				int knotSpan_index = global::verb.core.Eval.knotSpanGivenN(n, degree, u, knots);
				global::Array<double> basis_values = global::verb.core.Eval.basisFunctionsGivenKnotSpanIndex(knotSpan_index, u, degree, knots);
				global::Array<double> position = global::verb.core.Vec.zeros1d(((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (controlPoints[0]) ))) ).length);
				#line 689 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				{
					#line 689 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
					int _g1 = 0;
					#line 689 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
					int _g = ( degree + 1 );
					#line 689 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
					while (( _g1 < _g )){
						#line 689 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
						int j = _g1++;
						position = global::verb.core.Vec.@add(position, global::verb.core.Vec.mul(basis_values[j], ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (controlPoints[( ( knotSpan_index - degree ) + j )]) ))) )));
					}
					
				}
				
				#line 695 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				return position;
			}
			#line default
		}
		
		
		public static   global::Array<object> derivativeBasisFunctions(double u, int degree, global::Array<double> knots){
			unchecked {
				#line 710 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				int knotSpan_index = global::verb.core.Eval.knotSpan(degree, u, knots);
				int m = ( knots.length - 1 );
				int n = ( ( m - degree ) - 1 );
				#line 714 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				return global::verb.core.Eval.derivativeBasisFunctionsGivenNI(knotSpan_index, u, degree, n, knots);
			}
			#line default
		}
		
		
		public static   global::Array<object> derivativeBasisFunctionsGivenNI(int knotSpan_index, double u, int p, int n, global::Array<double> knots){
			unchecked {
				#line 733 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				global::Array<object> ndu = global::verb.core.Vec.zeros2d(( p + 1 ), ( p + 1 ));
				global::Array<double> left = global::verb.core.Vec.zeros1d(( p + 1 ));
				global::Array<double> right = global::verb.core.Vec.zeros1d(( p + 1 ));
				double saved = 0.0;
				double temp = 0.0;
				#line 739 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (ndu[0]) ))) )[0] = 1.0;
				#line 741 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				{
					#line 741 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
					int _g1 = 1;
					#line 741 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
					int _g = ( p + 1 );
					#line 741 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
					while (( _g1 < _g )){
						#line 741 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
						int j = _g1++;
						left[j] = ( u - knots[( ( knotSpan_index + 1 ) - j )] );
						right[j] = ( knots[( knotSpan_index + j )] - u );
						saved = 0.0;
						#line 746 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
						{
							#line 746 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
							int _g2 = 0;
							#line 746 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
							while (( _g2 < j )){
								#line 746 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
								int r = _g2++;
								((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (ndu[j]) ))) )[r] = ( right[( r + 1 )] + left[( j - r )] );
								temp = ( ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (ndu[r]) ))) )[( j - 1 )] / ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (ndu[j]) ))) )[r] );
								#line 750 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
								((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (ndu[r]) ))) )[j] = ( saved + ( right[( r + 1 )] * temp ) );
								saved = ( left[( j - r )] * temp );
							}
							
						}
						
						#line 754 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
						((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (ndu[j]) ))) )[j] = saved;
					}
					
				}
				
				#line 757 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				global::Array<object> ders = global::verb.core.Vec.zeros2d(( n + 1 ), ( p + 1 ));
				global::Array<object> a = global::verb.core.Vec.zeros2d(2, ( p + 1 ));
				int s1 = 0;
				int s2 = 1;
				double d = 0.0;
				int rk = 0;
				int pk = 0;
				int j1 = 0;
				int j2 = 0;
				#line 767 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				{
					#line 767 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
					int _g11 = 0;
					#line 767 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
					int _g3 = ( p + 1 );
					#line 767 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
					while (( _g11 < _g3 )){
						#line 767 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
						int j3 = _g11++;
						((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (ders[0]) ))) )[j3] = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (ndu[j3]) ))) )[p];
					}
					
				}
				
				#line 771 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				{
					#line 771 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
					int _g12 = 0;
					#line 771 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
					int _g4 = ( p + 1 );
					#line 771 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
					while (( _g12 < _g4 )){
						#line 771 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
						int r1 = _g12++;
						s1 = 0;
						s2 = 1;
						((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (a[0]) ))) )[0] = 1.0;
						#line 776 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
						{
							#line 776 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
							int _g31 = 1;
							#line 776 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
							int _g21 = ( n + 1 );
							#line 776 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
							while (( _g31 < _g21 )){
								#line 776 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
								int k = _g31++;
								#line 778 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
								d = 0.0;
								rk = ( r1 - k );
								pk = ( p - k );
								#line 782 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
								if (( r1 >= k )) {
									#line 783 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
									((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (a[s2]) ))) )[0] = ( ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (a[s1]) ))) )[0] / ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (ndu[( pk + 1 )]) ))) )[rk] );
									d = ( ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (a[s2]) ))) )[0] * ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (ndu[rk]) ))) )[pk] );
								}
								
								#line 787 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
								if (( rk >= -1 )) {
									#line 788 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
									j1 = 1;
								}
								 else {
									#line 790 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
									j1 =  - (rk) ;
								}
								
								#line 793 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
								if (( ( r1 - 1 ) <= pk )) {
									#line 794 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
									j2 = ( k - 1 );
								}
								 else {
									#line 796 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
									j2 = ( p - r1 );
								}
								
								#line 799 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
								{
									#line 799 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
									int _g5 = j1;
									#line 799 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
									int _g41 = ( j2 + 1 );
									#line 799 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
									while (( _g5 < _g41 )){
										#line 799 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
										int j4 = _g5++;
										((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (a[s2]) ))) )[j4] = ( (( ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (a[s1]) ))) )[j4] - ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (a[s1]) ))) )[( j4 - 1 )] )) / ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (ndu[( pk + 1 )]) ))) )[( rk + j4 )] );
										d += ( ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (a[s2]) ))) )[j4] * ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (ndu[( rk + j4 )]) ))) )[pk] );
									}
									
								}
								
								#line 804 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
								if (( r1 <= pk )) {
									#line 805 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
									((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (a[s2]) ))) )[k] = (  - (((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (a[s1]) ))) )[( k - 1 )])  / ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (ndu[( pk + 1 )]) ))) )[r1] );
									d += ( ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (a[s2]) ))) )[k] * ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (ndu[r1]) ))) )[pk] );
								}
								
								#line 809 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
								((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (ders[k]) ))) )[r1] = d;
								#line 811 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
								int temp1 = s1;
								s1 = s2;
								s2 = temp1;
							}
							
						}
						
					}
					
				}
				
				#line 817 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				int acc = p;
				{
					#line 818 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
					int _g13 = 1;
					#line 818 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
					int _g6 = ( n + 1 );
					#line 818 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
					while (( _g13 < _g6 )){
						#line 818 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
						int k1 = _g13++;
						{
							#line 819 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
							int _g32 = 0;
							#line 819 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
							int _g22 = ( p + 1 );
							#line 819 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
							while (( _g32 < _g22 )){
								#line 819 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
								int j5 = _g32++;
								((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (ders[k1]) ))) )[j5] *= ((double) (acc) );
							}
							
						}
						
						#line 822 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
						acc *= ( p - k1 );
					}
					
				}
				
				#line 825 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				return ders;
			}
			#line default
		}
		
		
		public static   global::Array<double> basisFunctions(double u, int degree, global::Array<double> knots){
			unchecked {
				#line 842 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				int knotSpan_index = global::verb.core.Eval.knotSpan(degree, u, knots);
				return global::verb.core.Eval.basisFunctionsGivenKnotSpanIndex(knotSpan_index, u, degree, knots);
			}
			#line default
		}
		
		
		public static   global::Array<double> basisFunctionsGivenKnotSpanIndex(int knotSpan_index, double u, int degree, global::Array<double> knots){
			unchecked {
				#line 864 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				global::Array<double> basisFunctions = global::verb.core.Vec.zeros1d(( degree + 1 ));
				global::Array<double> left = global::verb.core.Vec.zeros1d(( degree + 1 ));
				global::Array<double> right = global::verb.core.Vec.zeros1d(( degree + 1 ));
				double saved = ((double) (0) );
				double temp = ((double) (0) );
				#line 870 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				basisFunctions[0] = 1.0;
				#line 872 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				{
					#line 872 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
					int _g1 = 1;
					#line 872 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
					int _g = ( degree + 1 );
					#line 872 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
					while (( _g1 < _g )){
						#line 872 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
						int j = _g1++;
						left[j] = ( u - knots[( ( knotSpan_index + 1 ) - j )] );
						right[j] = ( knots[( knotSpan_index + j )] - u );
						saved = 0.0;
						#line 877 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
						{
							#line 877 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
							int _g2 = 0;
							#line 877 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
							while (( _g2 < j )){
								#line 877 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
								int r = _g2++;
								temp = ( basisFunctions[r] / (( right[( r + 1 )] + left[( j - r )] )) );
								basisFunctions[r] = ( saved + ( right[( r + 1 )] * temp ) );
								saved = ( left[( j - r )] * temp );
							}
							
						}
						
						#line 883 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
						basisFunctions[j] = saved;
					}
					
				}
				
				#line 886 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				return basisFunctions;
			}
			#line default
		}
		
		
		public static   int knotSpan(int degree, double u, global::Array<double> knots){
			unchecked {
				#line 903 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				int m = ( knots.length - 1 );
				int n = ( ( m - degree ) - 1 );
				#line 906 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				return global::verb.core.Eval.knotSpanGivenN(n, degree, u, knots);
			}
			#line default
		}
		
		
		public static   int knotSpanGivenN(int n, int degree, double u, global::Array<double> knots){
			unchecked {
				#line 924 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				if (( u >= knots[( n + 1 )] )) {
					#line 926 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
					return n;
				}
				
				#line 929 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				if (( u < knots[degree] )) {
					#line 931 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
					return degree;
				}
				
				#line 934 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				int low = degree;
				int high = ( n + 1 );
				int mid = default(int);
				#line 936 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				{
					#line 936 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
					double x = global::System.Math.Floor(((double) (( ((double) ((( low + high ))) ) / 2 )) ));
					#line 936 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
					mid = ((int) (x) );
				}
				
				#line 938 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				while (( ( u < knots[mid] ) || ( u >= knots[( mid + 1 )] ) )){
					#line 940 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
					if (( u < knots[mid] )) {
						#line 942 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
						high = mid;
					}
					 else {
						#line 946 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
						low = mid;
					}
					
					#line 948 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
					{
						#line 948 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
						double x1 = global::System.Math.Floor(((double) (( ((double) ((( low + high ))) ) / 2 )) ));
						#line 948 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
						mid = ((int) (x1) );
					}
					
				}
				
				#line 951 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				return mid;
			}
			#line default
		}
		
		
		public static  new object __hx_createEmpty(){
			unchecked {
				#line 10 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				return new global::verb.core.Eval(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) ));
			}
			#line default
		}
		
		
		public static  new object __hx_create(global::Array arr){
			unchecked {
				#line 10 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				return new global::verb.core.Eval();
			}
			#line default
		}
		
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core{
	public  class Eval_rational1d_287__Fun : global::haxe.lang.Function {
		public    Eval_rational1d_287__Fun(global::Array<int> dim) : base(1, 0){
			unchecked {
				#line 287 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				this.dim = dim;
			}
			#line default
		}
		
		
		public override   object __hx_invoke1_o(double __fn_float1, object __fn_dyn1){
			unchecked {
				#line 287 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				global::Array<double> x = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (((object) (__fn_float1) )) ))) )) : (((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (__fn_dyn1) ))) )) );
				#line 287 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				return x.slice(0, new global::haxe.lang.Null<int>(this.dim[0], true));
			}
			#line default
		}
		
		
		public  global::Array<int> dim;
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core{
	public  class Eval_weight1d_314__Fun : global::haxe.lang.Function {
		public    Eval_weight1d_314__Fun(global::Array<int> dim) : base(1, 1){
			unchecked {
				#line 314 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				this.dim = dim;
			}
			#line default
		}
		
		
		public override   double __hx_invoke1_f(double __fn_float1, object __fn_dyn1){
			unchecked {
				#line 314 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				global::Array<double> x = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (((object) (__fn_float1) )) ))) )) : (((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (__fn_dyn1) ))) )) );
				#line 314 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Eval.hx"
				return x[this.dim[0]];
			}
			#line default
		}
		
		
		public  global::Array<int> dim;
		
	}
}


