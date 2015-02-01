
#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core{
	public  class Make : global::haxe.lang.HxObject {
		public    Make(global::haxe.lang.EmptyObject empty){
			unchecked {
				#line 12 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				{
				}
				
			}
			#line default
		}
		
		
		public    Make(){
			unchecked {
				#line 12 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				global::verb.core.Make.__hx_ctor_verb_core_Make(this);
			}
			#line default
		}
		
		
		public static   void __hx_ctor_verb_core_Make(global::verb.core.Make __temp_me59){
			unchecked {
				#line 12 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				{
				}
				
			}
			#line default
		}
		
		
		public static   global::verb.core.types.NurbsSurfaceData rationalTranslationalSurface(global::verb.core.types.NurbsCurveData profile, global::verb.core.types.NurbsCurveData rail){
			unchecked {
				#line 26 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				global::Array<double> rail_start = global::verb.core.Eval.rationalCurvePoint(rail, rail.knots[0]);
				double startu = rail.knots[0];
				double endu = default(double);
				#line 28 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				{
					#line 28 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
					global::Array<double> a = rail.knots;
					#line 28 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
					endu = a[( a.length - 1 )];
				}
				
				#line 29 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				double span = ( (( endu - startu )) / (( rail.controlPoints.length - 1 )) );
				global::Array<object> controlPoints = new global::Array<object>(new object[]{});
				global::Array<object> weights = new global::Array<object>(new object[]{});
				global::Array<double> rail_weights = global::verb.core.Eval.weight1d(rail.controlPoints);
				global::Array<double> profile_weights = global::verb.core.Eval.weight1d(profile.controlPoints);
				global::Array<object> profile_points = global::verb.core.Eval.dehomogenize1d(profile.controlPoints);
				#line 36 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				{
					#line 36 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
					int _g1 = 0;
					#line 36 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
					int _g = rail.controlPoints.length;
					#line 36 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
					while (( _g1 < _g )){
						#line 36 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
						int i = _g1++;
						#line 39 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
						global::Array<double> rail_point = global::verb.core.Eval.rationalCurvePoint(rail, ( i * span ));
						global::Array<double> rail_offset = global::verb.core.Vec.sub(rail_point, rail_start);
						global::Array<object> row_controlPoints = new global::Array<object>(new object[]{});
						global::Array<double> row_weights = new global::Array<double>(new double[]{});
						#line 45 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
						{
							#line 45 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
							int _g3 = 0;
							#line 45 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
							int _g2 = profile.controlPoints.length;
							#line 45 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
							while (( _g3 < _g2 )){
								#line 45 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
								int j = _g3++;
								row_controlPoints.push(global::verb.core.Vec.@add(rail_offset, ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (profile_points[j]) ))) )));
								row_weights.push(( profile_weights[j] * rail_weights[i] ));
							}
							
						}
						
						#line 50 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
						controlPoints.push(row_controlPoints);
						weights.push(row_weights);
					}
					
				}
				
				#line 54 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				return new global::verb.core.types.NurbsSurfaceData(((int) (rail.degree) ), ((int) (profile.degree) ), ((global::Array<double>) (rail.knots) ), ((global::Array<double>) (profile.knots) ), ((global::Array<object>) (global::verb.core.Eval.homogenize2d(controlPoints, weights)) ));
			}
			#line default
		}
		
		
		public static   global::verb.core.types.NurbsCurveData surfaceIsocurve(global::verb.core.types.NurbsSurfaceData surface, double u, global::haxe.lang.Null<bool> useV){
			unchecked {
				#line 57 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				bool __temp_useV55 = ( ( ! (useV.hasValue) ) ? (global::haxe.lang.Runtime.toBool(false)) : (useV.@value) );
				#line 59 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				global::Array<double> knots = default(global::Array<double>);
				#line 59 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				if (__temp_useV55) {
					#line 59 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
					knots = surface.knotsU;
				}
				 else {
					#line 59 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
					knots = surface.knotsV;
				}
				
				#line 60 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				int degree = default(int);
				#line 60 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				if (__temp_useV55) {
					#line 60 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
					degree = surface.degreeU;
				}
				 else {
					#line 60 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
					degree = surface.degreeV;
				}
				
				#line 62 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				global::Array<object> knotMults = global::verb.core.Analyze.knotMultiplicities(knots);
				#line 65 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				int reqKnotIndex = -1;
				{
					#line 66 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
					int _g1 = 0;
					#line 66 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
					int _g = knotMults.length;
					#line 66 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
					while (( _g1 < _g )){
						#line 66 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
						int i = _g1++;
						if (( global::System.Math.Abs(((double) (( u - ((global::verb.core.KnotMultiplicity) (knotMults[i]) ).knot )) )) < 1e-10 )) {
							#line 68 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
							reqKnotIndex = i;
							break;
						}
						
					}
					
				}
				
				#line 73 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				int numKnotsToInsert = ( degree + 1 );
				if (( reqKnotIndex > 0 )) {
					#line 75 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
					numKnotsToInsert = ( numKnotsToInsert - ((global::verb.core.KnotMultiplicity) (knotMults[reqKnotIndex]) ).mult );
				}
				
				#line 79 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				global::verb.core.types.NurbsSurfaceData newSrf = global::verb.core.Modify.surfaceKnotRefine(surface, global::verb.core.Vec.rep<double>(numKnotsToInsert, u), __temp_useV55);
				#line 82 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				int span = global::verb.core.Eval.knotSpan(degree, u, knots);
				#line 84 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				if (__temp_useV55) {
					#line 85 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
					global::Array<object> __temp_stmt251 = default(global::Array<object>);
					#line 85 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
					{
						#line 85 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
						global::Array<object> _g2 = new global::Array<object>(new object[]{});
						#line 85 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
						{
							#line 85 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
							int _g11 = 0;
							#line 85 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
							global::Array<object> _g21 = newSrf.controlPoints;
							#line 85 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
							while (( _g11 < _g21.length )){
								#line 85 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
								global::Array<object> row = ((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (_g21[_g11]) ))) );
								#line 85 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
								 ++ _g11;
								#line 85 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
								_g2.push(((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (row[span]) ))) ));
							}
							
						}
						
						#line 85 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
						__temp_stmt251 = _g2;
					}
					
					#line 85 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
					return new global::verb.core.types.NurbsCurveData(((int) (newSrf.degreeU) ), ((global::Array<double>) (newSrf.knotsU) ), ((global::Array<object>) (__temp_stmt251) ));
				}
				
				#line 88 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				return new global::verb.core.types.NurbsCurveData(((int) (newSrf.degreeV) ), ((global::Array<double>) (newSrf.knotsV) ), ((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (newSrf.controlPoints[span]) ))) ));
			}
			#line default
		}
		
		
		public static   global::verb.core.types.NurbsSurfaceData loftedSurface(global::Array<object> curves, global::haxe.lang.Null<int> degreeV){
			unchecked {
				#line 94 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				curves = global::verb.core.Modify.unifyCurveKnotVectors(curves);
				#line 97 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				int degreeU = ((global::verb.core.types.NurbsCurveData) (curves[0]) ).degree;
				if ( ! (degreeV.hasValue) ) {
					#line 98 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
					degreeV = new global::haxe.lang.Null<int>(3, true);
				}
				
				#line 99 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				if (( degreeV.@value > ( curves.length - 1 ) )) {
					#line 100 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
					degreeV = new global::haxe.lang.Null<int>(( curves.length - 1 ), true);
				}
				
				#line 104 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				global::Array<double> knotsU = ((global::verb.core.types.NurbsCurveData) (curves[0]) ).knots;
				#line 106 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				global::Array<double> knotsV = new global::Array<double>(new double[]{});
				global::Array<object> controlPoints = new global::Array<object>(new object[]{});
				{
					#line 108 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
					int _g1 = 0;
					#line 108 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
					int _g = ((global::verb.core.types.NurbsCurveData) (curves[0]) ).controlPoints.length;
					#line 108 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
					while (( _g1 < _g )){
						#line 108 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
						global::Array<int> i = new global::Array<int>(new int[]{_g1++});
						#line 111 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
						global::Array<object> points = curves.map<object>(new global::verb.core.Make_loftedSurface_111__Fun(((global::Array<int>) (i) )));
						#line 116 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
						global::verb.core.types.NurbsCurveData c = global::verb.core.Make.rationalInterpCurve(points, degreeV, new global::haxe.lang.Null<bool>(true, true), default(global::Array<double>), default(global::Array<double>));
						controlPoints.push(c.controlPoints);
						knotsV = c.knots;
					}
					
				}
				
				#line 121 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				return new global::verb.core.types.NurbsSurfaceData(((int) (degreeU) ), degreeV.@value, ((global::Array<double>) (knotsU) ), ((global::Array<double>) (knotsV) ), ((global::Array<object>) (controlPoints) ));
			}
			#line default
		}
		
		
		public static   global::verb.core.types.NurbsCurveData clonedCurve(global::verb.core.types.NurbsCurveData curve){
			unchecked {
				#line 125 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				return new global::verb.core.types.NurbsCurveData(((int) (curve.degree) ), ((global::Array<double>) (curve.knots.copy()) ), ((global::Array<object>) (curve.controlPoints.map<object>(( (( global::verb.core.Make_clonedCurve_125__Fun.__hx_current != default(global::verb.core.Make_clonedCurve_125__Fun) )) ? (global::verb.core.Make_clonedCurve_125__Fun.__hx_current) : (global::verb.core.Make_clonedCurve_125__Fun.__hx_current = ((global::verb.core.Make_clonedCurve_125__Fun) (new global::verb.core.Make_clonedCurve_125__Fun()) )) ))) ));
			}
			#line default
		}
		
		
		public static   global::verb.core.types.NurbsCurveData rationalBezierCurve(global::Array<object> controlPoints, global::Array<double> weights){
			unchecked {
				#line 141 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				int degree = ( controlPoints.length - 1 );
				#line 143 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				global::Array<double> knots = new global::Array<double>(new double[]{});
				{
					#line 144 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
					int _g1 = 0;
					#line 144 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
					int _g = ( degree + 1 );
					#line 144 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
					while (( _g1 < _g )){
						#line 144 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
						int i = _g1++;
						#line 144 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
						knots.push(0.0);
					}
					
				}
				
				#line 145 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				{
					#line 145 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
					int _g11 = 0;
					#line 145 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
					int _g2 = ( degree + 1 );
					#line 145 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
					while (( _g11 < _g2 )){
						#line 145 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
						int i1 = _g11++;
						#line 145 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
						knots.push(1.0);
					}
					
				}
				
				#line 148 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				if (( weights == default(global::Array<double>) )) {
					#line 148 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
					weights = global::verb.core.Vec.rep<double>(controlPoints.length, 1.0);
				}
				
				#line 150 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				return new global::verb.core.types.NurbsCurveData(((int) (degree) ), ((global::Array<double>) (knots) ), ((global::Array<object>) (global::verb.core.Eval.homogenize1d(controlPoints, weights)) ));
			}
			#line default
		}
		
		
		public static   global::verb.core.types.NurbsSurfaceData fourPointSurface(global::Array<double> p1, global::Array<double> p2, global::Array<double> p3, global::Array<double> p4, global::haxe.lang.Null<int> degree){
			unchecked {
				#line 164 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				int __temp_degree56 = ( ( ! (degree.hasValue) ) ? (((int) (3) )) : (degree.@value) );
				#line 166 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				double degreeFloat = ((double) (__temp_degree56) );
				#line 168 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				global::Array<object> pts = new global::Array<object>(new object[]{});
				{
					#line 169 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
					int _g1 = 0;
					#line 169 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
					int _g = ( __temp_degree56 + 1 );
					#line 169 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
					while (( _g1 < _g )){
						#line 169 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
						int i = _g1++;
						#line 171 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
						global::Array<object> row = new global::Array<object>(new object[]{});
						{
							#line 172 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
							int _g3 = 0;
							#line 172 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
							int _g2 = ( __temp_degree56 + 1 );
							#line 172 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
							while (( _g3 < _g2 )){
								#line 172 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
								int j = _g3++;
								#line 174 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
								double l = ( 1.0 - ( i / degreeFloat ) );
								global::Array<double> p1p2 = global::verb.core.Vec.lerp(l, p1, p2);
								global::Array<double> p4p3 = global::verb.core.Vec.lerp(l, p4, p3);
								#line 178 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
								global::Array<double> res = global::verb.core.Vec.lerp(( 1.0 - ( j / degreeFloat ) ), p1p2, p4p3);
								res.push(1.0);
								#line 181 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
								row.push(res);
							}
							
						}
						
						#line 184 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
						pts.push(row);
					}
					
				}
				
				#line 187 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				global::Array<double> zeros = global::verb.core.Vec.rep<double>(( __temp_degree56 + 1 ), 0.0);
				global::Array<double> ones = global::verb.core.Vec.rep<double>(( __temp_degree56 + 1 ), 1.0);
				#line 190 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				return new global::verb.core.types.NurbsSurfaceData(((int) (__temp_degree56) ), ((int) (__temp_degree56) ), ((global::Array<double>) (zeros.concat(ones)) ), ((global::Array<double>) (zeros.concat(ones)) ), ((global::Array<object>) (pts) ));
			}
			#line default
		}
		
		
		public static   global::verb.core.types.NurbsCurveData ellipseArc(global::Array<double> center, global::Array<double> xaxis, global::Array<double> yaxis, double startAngle, double endAngle){
			unchecked {
				#line 208 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				double xradius = global::verb.core.Vec.norm(xaxis);
				double yradius = global::verb.core.Vec.norm(yaxis);
				#line 211 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				xaxis = global::verb.core.Vec.normalized(xaxis);
				yaxis = global::verb.core.Vec.normalized(yaxis);
				#line 215 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				if (( endAngle < startAngle )) {
					#line 215 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
					endAngle = ( ( 2.0 * global::Math.PI ) + startAngle );
				}
				
				#line 217 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				double theta = ( endAngle - startAngle );
				int numArcs = 0;
				#line 221 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				if (( theta <= ( global::Math.PI / 2 ) )) {
					#line 222 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
					numArcs = 1;
				}
				 else {
					#line 224 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
					if (( theta <= global::Math.PI )) {
						#line 225 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
						numArcs = 2;
					}
					 else {
						#line 226 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
						if (( theta <= ( ( 3 * global::Math.PI ) / 2 ) )) {
							#line 227 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
							numArcs = 3;
						}
						 else {
							#line 229 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
							numArcs = 4;
						}
						
					}
					
				}
				
				#line 233 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				double dtheta = ( theta / numArcs );
				int n = ( 2 * numArcs );
				double w1 = global::System.Math.Cos(((double) (( dtheta / 2 )) ));
				global::Array<double> P0 = global::verb.core.Vec.@add(center, global::verb.core.Vec.@add(global::verb.core.Vec.mul(( xradius * global::System.Math.Cos(((double) (startAngle) )) ), xaxis), global::verb.core.Vec.mul(( yradius * global::System.Math.Sin(((double) (startAngle) )) ), yaxis)));
				global::Array<double> T0 = global::verb.core.Vec.sub(global::verb.core.Vec.mul(global::System.Math.Cos(((double) (startAngle) )), yaxis), global::verb.core.Vec.mul(global::System.Math.Sin(((double) (startAngle) )), xaxis));
				global::Array<object> controlPoints = new global::Array<object>(new object[]{});
				global::Array<double> knots = global::verb.core.Vec.zeros1d(( ( 2 * numArcs ) + 3 ));
				int index = 0;
				double angle = startAngle;
				global::Array<double> weights = global::verb.core.Vec.zeros1d(( numArcs * 2 ));
				#line 244 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				controlPoints[0] = P0;
				weights[0] = 1.0;
				#line 247 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				{
					#line 247 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
					int _g1 = 1;
					#line 247 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
					int _g = ( numArcs + 1 );
					#line 247 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
					while (( _g1 < _g )){
						#line 247 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
						int i = _g1++;
						#line 249 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
						angle += dtheta;
						global::Array<double> P2 = global::verb.core.Vec.@add(center, global::verb.core.Vec.@add(global::verb.core.Vec.mul(( xradius * global::System.Math.Cos(((double) (angle) )) ), xaxis), global::verb.core.Vec.mul(( yradius * global::System.Math.Sin(((double) (angle) )) ), yaxis)));
						#line 253 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
						weights[( index + 2 )] = ((double) (1) );
						controlPoints[( index + 2 )] = P2;
						#line 256 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
						global::Array<double> T2 = global::verb.core.Vec.sub(global::verb.core.Vec.mul(global::System.Math.Cos(((double) (angle) )), yaxis), global::verb.core.Vec.mul(global::System.Math.Sin(((double) (angle) )), xaxis));
						#line 258 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
						global::verb.core.types.CurveCurveIntersection inters = global::verb.core.Intersect.rays(P0, global::verb.core.Vec.mul(( 1 / global::verb.core.Vec.norm(T0) ), T0), P2, global::verb.core.Vec.mul(( 1 / global::verb.core.Vec.norm(T2) ), T2));
						global::Array<double> P1 = global::verb.core.Vec.@add(P0, global::verb.core.Vec.mul(inters.u0, T0));
						#line 261 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
						weights[( index + 1 )] = w1;
						controlPoints[( index + 1 )] = P1;
						#line 264 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
						index += 2;
						#line 266 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
						if (( i < numArcs )) {
							#line 267 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
							P0 = P2;
							T0 = T2;
						}
						
					}
					
				}
				
				#line 272 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				int j = ( ( 2 * numArcs ) + 1 );
				#line 274 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				{
					#line 274 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
					int _g2 = 0;
					#line 274 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
					while (( _g2 < 3 )){
						#line 274 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
						int i1 = _g2++;
						knots[i1] = 0.0;
						knots[( i1 + j )] = 1.0;
					}
					
				}
				
				#line 279 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				switch (numArcs){
					case 2:
					{
						#line 281 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
						knots[3] = knots[4] = 0.5;
						#line 281 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
						break;
					}
					
					
					case 3:
					{
						#line 283 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
						knots[3] = knots[4] = 0.333333333333333315;
						knots[5] = knots[6] = 0.66666666666666663;
						#line 282 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
						break;
					}
					
					
					case 4:
					{
						#line 286 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
						knots[3] = knots[4] = 0.25;
						knots[5] = knots[6] = 0.5;
						knots[7] = knots[8] = 0.75;
						#line 285 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
						break;
					}
					
					
				}
				
				#line 291 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				return new global::verb.core.types.NurbsCurveData(((int) (2) ), ((global::Array<double>) (knots) ), ((global::Array<object>) (global::verb.core.Eval.homogenize1d(controlPoints, weights)) ));
			}
			#line default
		}
		
		
		public static   global::verb.core.types.NurbsCurveData arc(global::Array<double> center, global::Array<double> xaxis, global::Array<double> yaxis, double radius, double startAngle, double endAngle){
			unchecked {
				#line 311 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				return global::verb.core.Make.ellipseArc(center, global::verb.core.Vec.mul(radius, global::verb.core.Vec.normalized(xaxis)), global::verb.core.Vec.mul(radius, global::verb.core.Vec.normalized(yaxis)), startAngle, endAngle);
			}
			#line default
		}
		
		
		public static   global::verb.core.types.NurbsCurveData polyline(global::Array<object> pts){
			unchecked {
				#line 324 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				global::Array<double> knots = new global::Array<double>(new double[]{0.0, 0.0});
				double lsum = 0.0;
				#line 327 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				{
					#line 327 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
					int _g1 = 0;
					#line 327 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
					int _g = ( pts.length - 1 );
					#line 327 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
					while (( _g1 < _g )){
						#line 327 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
						int i = _g1++;
						lsum += global::verb.core.Vec.dist(((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (pts[i]) ))) ), ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (pts[( i + 1 )]) ))) ));
						knots.push(lsum);
					}
					
				}
				
				#line 331 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				knots.push(lsum);
				#line 334 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				knots = global::verb.core.Vec.mul(( 1 / lsum ), knots);
				#line 336 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				global::Array<double> weights = default(global::Array<double>);
				#line 336 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				{
					#line 336 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
					global::Array<double> _g2 = new global::Array<double>(new double[]{});
					#line 336 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
					{
						#line 336 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
						int _g21 = 0;
						#line 336 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
						int _g11 = pts.length;
						#line 336 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
						while (( _g21 < _g11 )){
							#line 336 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
							int i1 = _g21++;
							#line 336 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
							_g2.push(1.0);
						}
						
					}
					
					#line 336 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
					weights = _g2;
				}
				
				#line 338 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				return new global::verb.core.types.NurbsCurveData(((int) (1) ), ((global::Array<double>) (knots) ), ((global::Array<object>) (global::verb.core.Eval.homogenize1d(pts.slice(0, default(global::haxe.lang.Null<int>)), weights)) ));
			}
			#line default
		}
		
		
		public static   global::verb.core.types.NurbsSurfaceData extrudedSurface(global::Array<double> axis, double length, global::verb.core.types.NurbsCurveData profile){
			unchecked {
				#line 354 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				global::Array<object> controlPoints = new global::Array<object>(new object[]{new global::Array<object>(new object[]{}), new global::Array<object>(new object[]{}), new global::Array<object>(new object[]{})});
				global::Array<object> weights = new global::Array<object>(new object[]{new global::Array<double>(new double[]{}), new global::Array<double>(new double[]{}), new global::Array<double>(new double[]{})});
				#line 357 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				global::Array<object> prof_controlPoints = global::verb.core.Eval.dehomogenize1d(profile.controlPoints);
				global::Array<double> prof_weights = global::verb.core.Eval.weight1d(profile.controlPoints);
				#line 360 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				global::Array<double> translation = global::verb.core.Vec.mul(length, axis);
				global::Array<double> halfTranslation = global::verb.core.Vec.mul(( 0.5 * length ), axis);
				#line 364 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				{
					#line 364 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
					int _g1 = 0;
					#line 364 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
					int _g = prof_controlPoints.length;
					#line 364 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
					while (( _g1 < _g )){
						#line 364 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
						int j = _g1++;
						#line 366 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
						((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (controlPoints[2]) ))) )[j] = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (prof_controlPoints[j]) ))) );
						((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (controlPoints[1]) ))) )[j] = global::verb.core.Vec.@add(halfTranslation, ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (prof_controlPoints[j]) ))) ));
						((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (controlPoints[0]) ))) )[j] = global::verb.core.Vec.@add(translation, ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (prof_controlPoints[j]) ))) ));
						#line 370 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
						((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (weights[0]) ))) )[j] = prof_weights[j];
						((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (weights[1]) ))) )[j] = prof_weights[j];
						((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (weights[2]) ))) )[j] = prof_weights[j];
					}
					
				}
				
				#line 375 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				return new global::verb.core.types.NurbsSurfaceData(((int) (2) ), ((int) (profile.degree) ), ((global::Array<double>) (new global::Array<double>(new double[]{((double) (0) ), ((double) (0) ), ((double) (0) ), ((double) (1) ), ((double) (1) ), ((double) (1) )})) ), ((global::Array<double>) (profile.knots) ), ((global::Array<object>) (global::verb.core.Eval.homogenize2d(controlPoints, weights)) ));
			}
			#line default
		}
		
		
		public static   global::verb.core.types.NurbsSurfaceData CylindricalSurface(global::Array<double> axis, global::Array<double> xaxis, global::Array<double> @base, double height, double radius){
			unchecked {
				#line 392 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				global::Array<double> yaxis = global::verb.core.Vec.cross(axis, xaxis);
				double angle = ( 2.0 * global::Math.PI );
				global::verb.core.types.NurbsCurveData circ = global::verb.core.Make.arc(@base, xaxis, yaxis, radius, 0.0, ( 2 * global::Math.PI ));
				#line 396 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				return global::verb.core.Make.extrudedSurface(axis, height, circ);
			}
			#line default
		}
		
		
		public static   global::verb.core.types.NurbsSurfaceData revolvedSurface(global::verb.core.types.NurbsCurveData profile, global::Array<double> center, global::Array<double> axis, double theta){
			unchecked {
				#line 416 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				global::Array<object> prof_controlPoints = global::verb.core.Eval.dehomogenize1d(profile.controlPoints);
				global::Array<double> prof_weights = global::verb.core.Eval.weight1d(profile.controlPoints);
				#line 419 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				int narcs = default(int);
				#line 419 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				global::Array<double> knotsU = default(global::Array<double>);
				#line 419 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				object controlPoints = default(object);
				#line 419 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				object weights = default(object);
				#line 421 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				if (( theta <= ( global::Math.PI / 2 ) )) {
					#line 422 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
					narcs = 1;
					knotsU = global::verb.core.Vec.zeros1d(( 6 + ( 2 * (( narcs - 1 )) ) ));
				}
				 else {
					#line 425 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
					if (( theta <= global::Math.PI )) {
						#line 426 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
						narcs = 2;
						knotsU = global::verb.core.Vec.zeros1d(( 6 + ( 2 * (( narcs - 1 )) ) ));
						knotsU[3] = knotsU[4] = 0.5;
					}
					 else {
						#line 429 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
						if (( theta <= ( ( 3 * global::Math.PI ) / 2 ) )) {
							#line 430 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
							narcs = 3;
							knotsU = global::verb.core.Vec.zeros1d(( 6 + ( 2 * (( narcs - 1 )) ) ));
							knotsU[3] = knotsU[4] = 0.333333333333333315;
							knotsU[5] = knotsU[6] = 0.66666666666666663;
						}
						 else {
							#line 435 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
							narcs = 4;
							knotsU = global::verb.core.Vec.zeros1d(( 6 + ( 2 * (( narcs - 1 )) ) ));
							knotsU[3] = knotsU[4] = 0.25;
							knotsU[5] = knotsU[6] = 0.5;
							knotsU[7] = knotsU[8] = 0.75;
						}
						
					}
					
				}
				
				#line 443 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				double dtheta = ( theta / narcs );
				int j = ( 3 + ( 2 * (( narcs - 1 )) ) );
				#line 448 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				{
					#line 448 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
					int _g = 0;
					#line 448 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
					while (( _g < 3 )){
						#line 448 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
						int i = _g++;
						knotsU[i] = 0.0;
						knotsU[( j + i )] = 1.0;
					}
					
				}
				
				#line 454 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				int n = ( 2 * narcs );
				double wm = global::System.Math.Cos(((double) (( dtheta / 2.0 )) ));
				double angle = 0.0;
				global::Array<double> sines = global::verb.core.Vec.zeros1d(( narcs + 1 ));
				global::Array<double> cosines = global::verb.core.Vec.zeros1d(( narcs + 1 ));
				global::Array<object> controlPoints1 = global::verb.core.Vec.zeros3d(( ( 2 * narcs ) + 1 ), prof_controlPoints.length, 3);
				global::Array<object> weights1 = global::verb.core.Vec.zeros2d(( ( 2 * narcs ) + 1 ), prof_controlPoints.length);
				#line 463 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				{
					#line 463 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
					int _g1 = 1;
					#line 463 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
					int _g2 = ( narcs + 1 );
					#line 463 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
					while (( _g1 < _g2 )){
						#line 463 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
						int i1 = _g1++;
						angle += dtheta;
						cosines[i1] = global::System.Math.Cos(((double) (angle) ));
						sines[i1] = global::System.Math.Sin(((double) (angle) ));
					}
					
				}
				
				#line 471 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				{
					#line 471 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
					int _g11 = 0;
					#line 471 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
					int _g3 = prof_controlPoints.length;
					#line 471 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
					while (( _g11 < _g3 )){
						#line 471 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
						int j1 = _g11++;
						#line 474 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
						global::Array<double> O = global::verb.core.Trig.rayClosestPoint(((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (prof_controlPoints[j1]) ))) ), center, axis);
						#line 476 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
						global::Array<double> X = global::verb.core.Vec.sub(((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (prof_controlPoints[j1]) ))) ), O);
						#line 478 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
						double r = global::verb.core.Vec.norm(X);
						#line 480 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
						global::Array<double> Y = global::verb.core.Vec.cross(axis, X);
						#line 482 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
						if (( r > 1e-10 )) {
							#line 483 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
							X = global::verb.core.Vec.mul(( 1 / r ), X);
							Y = global::verb.core.Vec.mul(( 1 / r ), Y);
						}
						
						#line 488 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
						((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (controlPoints1[0]) ))) )[j1] = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (prof_controlPoints[j1]) ))) );
						global::Array<double> P0 = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (prof_controlPoints[j1]) ))) );
						((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (weights1[0]) ))) )[j1] = prof_weights[j1];
						#line 493 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
						global::Array<double> T0 = Y;
						int index = 0;
						double angle1 = 0.0;
						#line 498 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
						{
							#line 498 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
							int _g31 = 1;
							#line 498 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
							int _g21 = ( narcs + 1 );
							#line 498 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
							while (( _g31 < _g21 )){
								#line 498 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
								int i2 = _g31++;
								#line 502 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
								global::Array<double> P2 = default(global::Array<double>);
								#line 502 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
								if (( r == 0 )) {
									#line 502 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
									P2 = O;
								}
								 else {
									#line 502 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
									P2 = global::verb.core.Vec.@add(O, global::verb.core.Vec.@add(global::verb.core.Vec.mul(( r * cosines[i2] ), X), global::verb.core.Vec.mul(( r * sines[i2] ), Y)));
								}
								
								#line 504 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
								((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (controlPoints1[( index + 2 )]) ))) )[j1] = P2;
								((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (weights1[( index + 2 )]) ))) )[j1] = prof_weights[j1];
								#line 508 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
								global::Array<double> T2 = global::verb.core.Vec.sub(global::verb.core.Vec.mul(cosines[i2], Y), global::verb.core.Vec.mul(sines[i2], X));
								#line 511 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
								if (( r == 0 )) {
									#line 512 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
									((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (controlPoints1[( index + 1 )]) ))) )[j1] = O;
								}
								 else {
									#line 515 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
									global::verb.core.types.CurveCurveIntersection inters = global::verb.core.Intersect.rays(P0, global::verb.core.Vec.mul(( 1 / global::verb.core.Vec.norm(T0) ), T0), P2, global::verb.core.Vec.mul(( 1 / global::verb.core.Vec.norm(T2) ), T2));
									global::Array<double> P1 = global::verb.core.Vec.@add(P0, global::verb.core.Vec.mul(inters.u0, T0));
									#line 518 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
									((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (controlPoints1[( index + 1 )]) ))) )[j1] = P1;
								}
								
								#line 521 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
								((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (weights1[( index + 1 )]) ))) )[j1] = ( wm * prof_weights[j1] );
								#line 523 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
								index += 2;
								#line 525 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
								if (( i2 < narcs )) {
									#line 526 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
									P0 = P2;
									T0 = T2;
								}
								
							}
							
						}
						
					}
					
				}
				
				#line 532 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				return new global::verb.core.types.NurbsSurfaceData(((int) (2) ), ((int) (profile.degree) ), ((global::Array<double>) (knotsU) ), ((global::Array<double>) (profile.knots) ), ((global::Array<object>) (global::verb.core.Eval.homogenize2d(controlPoints1, weights1)) ));
			}
			#line default
		}
		
		
		public static   global::verb.core.types.NurbsSurfaceData SphericalSurface(global::Array<double> center, global::Array<double> axis, global::Array<double> xaxis, double radius){
			unchecked {
				#line 551 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				global::verb.core.types.NurbsCurveData arc = global::verb.core.Make.arc(center, global::verb.core.Vec.mul(-1.0, axis), xaxis, radius, 0.0, global::Math.PI);
				return global::verb.core.Make.revolvedSurface(arc, center, axis, ( 2 * global::Math.PI ));
			}
			#line default
		}
		
		
		public static   global::verb.core.types.NurbsSurfaceData ConicalSurface(global::Array<double> axis, global::Array<double> xaxis, global::Array<double> @base, double height, double radius){
			unchecked {
				#line 571 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				double angle = ( 2 * global::Math.PI );
				int prof_degree = 1;
				global::Array<object> prof_ctrl_pts = new global::Array<object>(new object[]{global::verb.core.Vec.@add(@base, global::verb.core.Vec.mul(height, axis)), global::verb.core.Vec.@add(@base, global::verb.core.Vec.mul(radius, xaxis))});
				global::Array<double> prof_knots = new global::Array<double>(new double[]{0.0, 0.0, 1.0, 1.0});
				global::Array<double> prof_weights = new global::Array<double>(new double[]{1.0, 1.0});
				global::verb.core.types.NurbsCurveData prof = new global::verb.core.types.NurbsCurveData(((int) (prof_degree) ), ((global::Array<double>) (prof_knots) ), ((global::Array<object>) (global::verb.core.Eval.homogenize1d(prof_ctrl_pts, prof_weights)) ));
				#line 578 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				return global::verb.core.Make.revolvedSurface(prof, @base, axis, angle);
			}
			#line default
		}
		
		
		public static   global::verb.core.types.NurbsCurveData rationalInterpCurve(global::Array<object> points, global::haxe.lang.Null<int> degree, global::haxe.lang.Null<bool> homogeneousPoints, global::Array<double> start_tangent, global::Array<double> end_tangent){
			unchecked {
				#line 586 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				bool __temp_homogeneousPoints58 = ( ( ! (homogeneousPoints.hasValue) ) ? (global::haxe.lang.Runtime.toBool(false)) : (homogeneousPoints.@value) );
				#line 586 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				int __temp_degree57 = ( ( ! (degree.hasValue) ) ? (((int) (3) )) : (degree.@value) );
				#line 597 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				if (( points.length < ( __temp_degree57 + 1 ) )) {
					#line 598 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
					throw global::haxe.lang.HaxeException.wrap("You need to supply at least degree + 1 points!");
				}
				
				#line 601 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				global::Array<double> us = new global::Array<double>(new double[]{0.0});
				{
					#line 602 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
					int _g1 = 1;
					#line 602 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
					int _g = points.length;
					#line 602 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
					while (( _g1 < _g )){
						#line 602 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
						int i = _g1++;
						double chord = global::verb.core.Vec.norm(global::verb.core.Vec.sub(((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (points[i]) ))) ), ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (points[( i - 1 )]) ))) )));
						double last = us[( us.length - 1 )];
						us.push(( last + chord ));
					}
					
				}
				
				#line 609 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				double max = us[( us.length - 1 )];
				{
					#line 610 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
					int _g11 = 0;
					#line 610 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
					int _g2 = us.length;
					#line 610 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
					while (( _g11 < _g2 )){
						#line 610 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
						int i1 = _g11++;
						us[i1] = ( us[i1] / max );
					}
					
				}
				
				#line 614 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				global::Array<double> knotsStart = global::verb.core.Vec.rep<double>(( __temp_degree57 + 1 ), 0.0);
				#line 618 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				bool hasTangents = ( ( start_tangent != default(global::Array<double>) ) && ( end_tangent != default(global::Array<double>) ) );
				int start = default(int);
				#line 619 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				if (hasTangents) {
					#line 619 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
					start = 0;
				}
				 else {
					#line 619 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
					start = 1;
				}
				
				#line 620 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				int end = default(int);
				#line 620 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				if (hasTangents) {
					#line 620 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
					end = ( ( us.length - __temp_degree57 ) + 1 );
				}
				 else {
					#line 620 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
					end = ( us.length - __temp_degree57 );
				}
				
				#line 622 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				{
					#line 622 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
					int _g3 = start;
					#line 622 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
					while (( _g3 < ((int) (end) ) )){
						#line 622 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
						int i2 = _g3++;
						double weightSums = 0.0;
						{
							#line 624 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
							int _g12 = 0;
							#line 624 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
							while (( _g12 < __temp_degree57 )){
								#line 624 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
								int j = _g12++;
								weightSums += us[( i2 + j )];
							}
							
						}
						
						#line 628 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
						knotsStart.push(( ( ((double) (1) ) / __temp_degree57 ) * weightSums ));
					}
					
				}
				
				#line 631 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				global::Array<double> knots = knotsStart.concat(global::verb.core.Vec.rep<double>(( __temp_degree57 + 1 ), 1.0));
				#line 634 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				global::Array<object> A = new global::Array<object>(new object[]{});
				int n = default(int);
				#line 635 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				if (hasTangents) {
					#line 635 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
					n = ( points.length + 1 );
				}
				 else {
					#line 635 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
					n = ( points.length - 1 );
				}
				
				#line 637 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				int lst = default(int);
				#line 637 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				if (hasTangents) {
					#line 637 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
					lst = 1;
				}
				 else {
					#line 637 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
					lst = 0;
				}
				
				#line 638 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				int ld = default(int);
				#line 638 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				if (hasTangents) {
					#line 638 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
					ld = ( points.length - (( __temp_degree57 - 1 )) );
				}
				 else {
					#line 638 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
					ld = ( points.length - (( __temp_degree57 + 1 )) );
				}
				
				#line 640 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				{
					#line 640 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
					int _g4 = 0;
					#line 640 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
					while (( _g4 < us.length )){
						#line 640 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
						double u = us[_g4];
						#line 640 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
						 ++ _g4;
						int span = global::verb.core.Eval.knotSpanGivenN(n, __temp_degree57, u, knots);
						global::Array<double> basisFuncs = global::verb.core.Eval.basisFunctionsGivenKnotSpanIndex(span, u, __temp_degree57, knots);
						#line 644 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
						int ls = ( span - __temp_degree57 );
						#line 646 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
						global::Array<double> rowstart = global::verb.core.Vec.zeros1d(ls);
						global::Array<double> rowend = global::verb.core.Vec.zeros1d(( ld - ls ));
						#line 649 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
						A.push(rowstart.concat(basisFuncs).concat(rowend));
					}
					
				}
				
				#line 652 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				if (hasTangents) {
					#line 653 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
					int ln = ( ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (A[0]) ))) ).length - 2 );
					#line 655 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
					global::Array<double> tanRow0 = new global::Array<double>(new double[]{-1.0, 1.0}).concat(global::verb.core.Vec.zeros1d(ln));
					global::Array<double> tanRow1 = global::verb.core.Vec.zeros1d(ln).concat(new global::Array<double>(new double[]{-1.0, 1.0}));
					#line 658 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
					global::verb.core.ArrayExtensions.spliceAndInsert<object>(A, 1, 0, tanRow0);
					global::verb.core.ArrayExtensions.spliceAndInsert<object>(A, ( A.length - 1 ), 0, tanRow1);
				}
				
				#line 663 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				int dim = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (points[0]) ))) ).length;
				global::Array<object> xs = new global::Array<object>(new object[]{});
				#line 666 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				double mult1 = ( (( 1 - knots[( ( knots.length - __temp_degree57 ) - 2 )] )) / __temp_degree57 );
				double mult0 = ( knots[( __temp_degree57 + 1 )] / __temp_degree57 );
				#line 669 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				{
					#line 669 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
					int _g5 = 0;
					#line 669 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
					while (( _g5 < ((int) (dim) ) )){
						#line 669 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
						global::Array<int> i3 = new global::Array<int>(new int[]{_g5++});
						global::Array<double> b = default(global::Array<double>);
						#line 672 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
						if ( ! (hasTangents) ) {
							#line 673 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
							b = points.map<double>(new global::verb.core.Make_rationalInterpCurve_673__Fun(((global::Array<int>) (i3) )));
						}
						 else {
							#line 678 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
							b = new global::Array<double>(new double[]{((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (points[0]) ))) )[i3[0]]});
							b.push(( mult0 * start_tangent[i3[0]] ));
							{
								#line 680 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
								int _g21 = 1;
								#line 680 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
								int _g13 = ( points.length - 1 );
								#line 680 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
								while (( _g21 < _g13 )){
									#line 680 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
									int j1 = _g21++;
									#line 680 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
									b.push(((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (points[j1]) ))) )[i3[0]]);
								}
								
							}
							
							#line 681 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
							b.push(( mult1 * end_tangent[i3[0]] ));
							b.push(((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (points[( points.length - 1 )]) ))) )[i3[0]]);
						}
						
						#line 685 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
						global::Array<double> x1 = global::verb.core.Mat.solve(A, b);
						xs.push(x1);
					}
					
				}
				
				#line 689 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				global::Array<object> controlPts = global::verb.core.Mat.transpose<double>(xs);
				#line 691 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				if ( ! (__temp_homogeneousPoints58) ) {
					#line 692 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
					global::Array<double> weights = global::verb.core.Vec.rep<double>(controlPts.length, 1.0);
					controlPts = global::verb.core.Eval.homogenize1d(controlPts, weights);
				}
				
				#line 696 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				return new global::verb.core.types.NurbsCurveData(((int) (__temp_degree57) ), ((global::Array<double>) (knots) ), ((global::Array<object>) (controlPts) ));
			}
			#line default
		}
		
		
		public static  new object __hx_createEmpty(){
			unchecked {
				#line 12 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				return new global::verb.core.Make(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) ));
			}
			#line default
		}
		
		
		public static  new object __hx_create(global::Array arr){
			unchecked {
				#line 12 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				return new global::verb.core.Make();
			}
			#line default
		}
		
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core{
	public  class Make_loftedSurface_111__Fun : global::haxe.lang.Function {
		public    Make_loftedSurface_111__Fun(global::Array<int> i) : base(1, 0){
			unchecked {
				#line 112 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				this.i = i;
			}
			#line default
		}
		
		
		public override   object __hx_invoke1_o(double __fn_float1, object __fn_dyn1){
			unchecked {
				#line 111 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				global::verb.core.types.NurbsCurveData x = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (((global::verb.core.types.NurbsCurveData) (((object) (__fn_float1) )) )) : (((global::verb.core.types.NurbsCurveData) (__fn_dyn1) )) );
				return ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (x.controlPoints[this.i[0]]) ))) );
			}
			#line default
		}
		
		
		public  global::Array<int> i;
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core{
	public  class Make_clonedCurve_125__Fun : global::haxe.lang.Function {
		public    Make_clonedCurve_125__Fun() : base(1, 0){
			unchecked {
			}
			#line default
		}
		
		
		public static  global::verb.core.Make_clonedCurve_125__Fun __hx_current;
		
		public override   object __hx_invoke1_o(double __fn_float1, object __fn_dyn1){
			unchecked {
				#line 125 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				global::Array<double> x = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (((object) (__fn_float1) )) ))) )) : (((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (__fn_dyn1) ))) )) );
				#line 125 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				return x.copy();
			}
			#line default
		}
		
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core{
	public  class Make_rationalInterpCurve_673__Fun : global::haxe.lang.Function {
		public    Make_rationalInterpCurve_673__Fun(global::Array<int> i3) : base(1, 1){
			unchecked {
				#line 673 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				this.i3 = i3;
			}
			#line default
		}
		
		
		public override   double __hx_invoke1_f(double __fn_float1, object __fn_dyn1){
			unchecked {
				#line 673 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				global::Array<double> x = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (((object) (__fn_float1) )) ))) )) : (((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (__fn_dyn1) ))) )) );
				#line 673 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Make.hx"
				return x[this.i3[0]];
			}
			#line default
		}
		
		
		public  global::Array<int> i3;
		
	}
}


