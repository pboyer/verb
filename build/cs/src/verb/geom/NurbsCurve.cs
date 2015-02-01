
#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.geom{
	public  class NurbsCurve : global::verb.exe.AsyncObject, global::verb.geom.ICurve {
		public    NurbsCurve(global::haxe.lang.EmptyObject empty) : base(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) )){
			unchecked {
			}
			#line default
		}
		
		
		public    NurbsCurve(global::verb.core.types.NurbsCurveData data){
			unchecked {
				#line 46 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
				global::verb.geom.NurbsCurve.__hx_ctor_verb_geom_NurbsCurve(this, data);
			}
			#line default
		}
		
		
		public static   void __hx_ctor_verb_geom_NurbsCurve(global::verb.geom.NurbsCurve __temp_me112, global::verb.core.types.NurbsCurveData data){
			unchecked {
				#line 47 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
				__temp_me112._data = global::verb.core.Check.nurbsCurveData(data);
			}
			#line default
		}
		
		
		public static   global::verb.geom.NurbsCurve byKnotsControlPointsWeights(int degree, global::Array<double> knots, global::Array<object> controlPoints, global::Array<double> weights){
			unchecked {
				#line 65 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
				return new global::verb.geom.NurbsCurve(((global::verb.core.types.NurbsCurveData) (new global::verb.core.types.NurbsCurveData(((int) (degree) ), ((global::Array<double>) (knots.copy()) ), ((global::Array<object>) (global::verb.core.Eval.homogenize1d(controlPoints, weights)) ))) ));
			}
			#line default
		}
		
		
		public static   global::verb.geom.NurbsCurve byPoints(global::Array<object> points, global::haxe.lang.Null<int> degree){
			unchecked {
				#line 79 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
				int __temp_degree111 = ( ( ! (degree.hasValue) ) ? (((int) (3) )) : (degree.@value) );
				#line 79 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
				return new global::verb.geom.NurbsCurve(((global::verb.core.types.NurbsCurveData) (global::verb.core.Make.rationalInterpCurve(points, new global::haxe.lang.Null<int>(__temp_degree111, true), default(global::haxe.lang.Null<bool>), default(global::Array<double>), default(global::Array<double>))) ));
			}
			#line default
		}
		
		
		public static  new object __hx_createEmpty(){
			unchecked {
				#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
				return new global::verb.geom.NurbsCurve(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) ));
			}
			#line default
		}
		
		
		public static  new object __hx_create(global::Array arr){
			unchecked {
				#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
				return new global::verb.geom.NurbsCurve(((global::verb.core.types.NurbsCurveData) (arr[0]) ));
			}
			#line default
		}
		
		
		public  global::verb.core.types.NurbsCurveData _data;
		
		public virtual   int degree(){
			unchecked {
				#line 33 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
				return this._data.degree;
			}
			#line default
		}
		
		
		public virtual   global::Array<double> knots(){
			unchecked {
				#line 34 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
				return this._data.knots.slice(0, default(global::haxe.lang.Null<int>));
			}
			#line default
		}
		
		
		public virtual   global::Array<object> controlPoints(){
			unchecked {
				#line 35 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
				return global::verb.core.Eval.dehomogenize1d(this._data.controlPoints);
			}
			#line default
		}
		
		
		public virtual   global::Array<double> weights(){
			unchecked {
				#line 36 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
				return global::verb.core.Eval.weight1d(this._data.controlPoints);
			}
			#line default
		}
		
		
		public virtual   global::verb.core.types.NurbsCurveData asNurbs(){
			unchecked {
				#line 88 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
				return new global::verb.core.types.NurbsCurveData(((int) (this.degree()) ), ((global::Array<double>) (this.knots()) ), ((global::Array<object>) (global::verb.core.Eval.homogenize1d(this.controlPoints(), this.weights())) ));
			}
			#line default
		}
		
		
		public virtual   global::verb.geom.NurbsCurve clone(){
			unchecked {
				#line 98 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
				return new global::verb.geom.NurbsCurve(((global::verb.core.types.NurbsCurveData) (this._data) ));
			}
			#line default
		}
		
		
		public virtual   global::verb.core.types.Interval<double> domain(){
			unchecked {
				#line 108 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
				double __temp_stmt268 = default(double);
				#line 108 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
				{
					#line 108 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
					global::Array<double> a = this._data.knots;
					#line 108 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
					__temp_stmt268 = a[( a.length - 1 )];
				}
				
				#line 108 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
				return new global::verb.core.types.Interval<double>(((double) (this._data.knots[0]) ), ((double) (__temp_stmt268) ));
			}
			#line default
		}
		
		
		public virtual   global::verb.geom.NurbsCurve transform(global::Array<object> mat){
			unchecked {
				#line 120 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
				return new global::verb.geom.NurbsCurve(((global::verb.core.types.NurbsCurveData) (global::verb.core.Modify.rationalCurveTransform(this._data, mat)) ));
			}
			#line default
		}
		
		
		public virtual   global::promhx.Promise<object> transformAsync(global::Array<object> mat){
			unchecked {
				#line 124 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
				return ((global::promhx.Promise<object>) (global::promhx.Promise<object>.__hx_cast<object>(((global::promhx.Promise) (this.defer<object>(typeof(global::verb.core.Modify), "rationalCurveTransform", new global::Array<object>(new object[]{this._data, mat})).then<object>(( (( global::verb.geom.NurbsCurve_transformAsync_125__Fun.__hx_current != default(global::verb.geom.NurbsCurve_transformAsync_125__Fun) )) ? (global::verb.geom.NurbsCurve_transformAsync_125__Fun.__hx_current) : (global::verb.geom.NurbsCurve_transformAsync_125__Fun.__hx_current = ((global::verb.geom.NurbsCurve_transformAsync_125__Fun) (new global::verb.geom.NurbsCurve_transformAsync_125__Fun()) )) ))) ))) );
			}
			#line default
		}
		
		
		public virtual   global::Array<double> point(double u){
			unchecked {
				#line 137 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
				return global::verb.core.Eval.rationalCurvePoint(this._data, u);
			}
			#line default
		}
		
		
		public virtual   global::promhx.Promise<object> pointAsync(double u){
			unchecked {
				#line 141 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
				return this.defer<object>(typeof(global::verb.core.Eval), "rationalCurvePoint", new global::Array<object>(new object[]{this._data, u}));
			}
			#line default
		}
		
		
		public virtual   global::Array<double> tangent(double u){
			unchecked {
				#line 154 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
				return global::verb.core.Eval.rationalCurveTangent(this._data, u);
			}
			#line default
		}
		
		
		public virtual   global::promhx.Promise<object> tangentAsync(double u){
			unchecked {
				#line 158 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
				return this.defer<object>(typeof(global::verb.core.Eval), "rationalCurveTangent", new global::Array<object>(new object[]{this._data, u}));
			}
			#line default
		}
		
		
		public virtual   global::Array<object> derivatives(double u, global::haxe.lang.Null<int> numDerivs){
			unchecked {
				#line 171 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
				int __temp_numDerivs109 = ( ( ! (numDerivs.hasValue) ) ? (((int) (1) )) : (numDerivs.@value) );
				#line 171 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
				return global::verb.core.Eval.rationalCurveDerivatives(this._data, u, new global::haxe.lang.Null<int>(__temp_numDerivs109, true));
			}
			#line default
		}
		
		
		public virtual   global::promhx.Promise<object> derivativesAsync(double u, global::haxe.lang.Null<int> numDerivs){
			unchecked {
				#line 175 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
				int __temp_numDerivs110 = ( ( ! (numDerivs.hasValue) ) ? (((int) (1) )) : (numDerivs.@value) );
				#line 175 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
				return this.defer<object>(typeof(global::verb.core.Eval), "rationalCurveDerivatives", new global::Array<object>(new object[]{this._data, u, __temp_numDerivs110}));
			}
			#line default
		}
		
		
		public virtual   global::Array<double> closestPoint(global::Array<double> pt){
			unchecked {
				#line 187 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
				return global::verb.core.Analyze.rationalCurveClosestPoint(this._data, pt);
			}
			#line default
		}
		
		
		public virtual   global::promhx.Promise<object> closestPointAsync(global::Array<double> pt){
			unchecked {
				#line 191 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
				return this.defer<object>(typeof(global::verb.core.Analyze), "rationalCurveClosestPoint", new global::Array<object>(new object[]{this._data, pt}));
			}
			#line default
		}
		
		
		public virtual   double closestParam(global::Array<double> pt){
			unchecked {
				#line 203 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
				return global::verb.core.Analyze.rationalCurveClosestParam(this._data, pt);
			}
			#line default
		}
		
		
		public virtual   global::promhx.Promise<object> closestParamAsync(object pt){
			unchecked {
				#line 207 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
				return this.defer<object>(typeof(global::verb.core.Analyze), "rationalCurveClosestParam", new global::Array<object>(new object[]{this._data, pt}));
			}
			#line default
		}
		
		
		public virtual   double length(){
			unchecked {
				#line 216 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
				return global::verb.core.Analyze.rationalCurveArcLength(this._data, default(global::haxe.lang.Null<double>), default(global::haxe.lang.Null<int>));
			}
			#line default
		}
		
		
		public virtual   global::promhx.Promise<double> lengthAsync(){
			unchecked {
				#line 220 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
				return this.defer<double>(typeof(global::verb.core.Analyze), "rationalCurveArcLength", new global::Array<object>(new object[]{this._data}));
			}
			#line default
		}
		
		
		public virtual   double lengthAtParam(double u){
			unchecked {
				#line 232 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
				return global::verb.core.Analyze.rationalCurveArcLength(this._data, new global::haxe.lang.Null<double>(u, true), default(global::haxe.lang.Null<int>));
			}
			#line default
		}
		
		
		public virtual   global::promhx.Promise<double> lengthAtParamAsync(){
			unchecked {
				#line 236 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
				return this.defer<double>(typeof(global::verb.core.Analyze), "rationalCurveArcLength", new global::Array<object>(new object[]{this._data}));
			}
			#line default
		}
		
		
		public virtual   double paramAtLength(double len, global::haxe.lang.Null<double> tolerance){
			unchecked {
				#line 248 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
				return global::verb.core.Analyze.rationalCurveParamAtArcLength(this._data, len, tolerance, default(global::Array<object>), default(global::Array<double>));
			}
			#line default
		}
		
		
		public virtual   global::promhx.Promise<double> paramAtLengthAsync(double len, global::haxe.lang.Null<double> tolerance){
			unchecked {
				#line 252 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
				return this.defer<double>(typeof(global::verb.core.Analyze), "rationalCurveParamAtArcLength", new global::Array<object>(new object[]{this._data, len, (tolerance).toDynamic()}));
			}
			#line default
		}
		
		
		public virtual   global::Array<object> divideByEqualArcLength(int divisions){
			unchecked {
				#line 264 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
				return global::verb.core.Divide.rationalCurveByEqualArcLength(this._data, divisions);
			}
			#line default
		}
		
		
		public virtual   global::promhx.Promise<object> divideByEqualArcLengthAsync(int divisions){
			unchecked {
				#line 268 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
				return this.defer<object>(typeof(global::verb.core.Divide), "rationalCurveByEqualArcLength", new global::Array<object>(new object[]{this._data, divisions}));
			}
			#line default
		}
		
		
		public virtual   global::Array<object> divideByArcLength(double arcLength){
			unchecked {
				#line 280 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
				return global::verb.core.Divide.rationalCurveByArcLength(this._data, arcLength);
			}
			#line default
		}
		
		
		public virtual   global::promhx.Promise<object> divideByArcLengthAsync(int divisions){
			unchecked {
				#line 284 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
				return this.defer<object>(typeof(global::verb.core.Divide), "rationalCurveByArcLength", new global::Array<object>(new object[]{this._data, divisions}));
			}
			#line default
		}
		
		
		public virtual   global::Array<object> split(double u){
			unchecked {
				#line 296 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
				return global::verb.core.Modify.curveSplit(this._data, u).map<object>(( (( global::verb.geom.NurbsCurve_split_296__Fun.__hx_current != default(global::verb.geom.NurbsCurve_split_296__Fun) )) ? (global::verb.geom.NurbsCurve_split_296__Fun.__hx_current) : (global::verb.geom.NurbsCurve_split_296__Fun.__hx_current = ((global::verb.geom.NurbsCurve_split_296__Fun) (new global::verb.geom.NurbsCurve_split_296__Fun()) )) ));
			}
			#line default
		}
		
		
		public virtual   global::promhx.Promise<object> splitAsync(double u){
			unchecked {
				#line 300 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
				return ((global::promhx.Promise<object>) (global::promhx.Promise<object>.__hx_cast<object>(((global::promhx.Promise) (this.defer<object>(typeof(global::verb.core.Modify), "curveSplit", new global::Array<object>(new object[]{this._data, u})).then<object>(( (( global::verb.geom.NurbsCurve_splitAsync_301__Fun.__hx_current != default(global::verb.geom.NurbsCurve_splitAsync_301__Fun) )) ? (global::verb.geom.NurbsCurve_splitAsync_301__Fun.__hx_current) : (global::verb.geom.NurbsCurve_splitAsync_301__Fun.__hx_current = ((global::verb.geom.NurbsCurve_splitAsync_301__Fun) (new global::verb.geom.NurbsCurve_splitAsync_301__Fun()) )) ))) ))) );
			}
			#line default
		}
		
		
		public virtual   global::verb.geom.NurbsCurve reverse(){
			unchecked {
				#line 312 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
				return new global::verb.geom.NurbsCurve(((global::verb.core.types.NurbsCurveData) (global::verb.core.Modify.curveReverse(this._data)) ));
			}
			#line default
		}
		
		
		public virtual   global::promhx.Promise<object> reverseAsync(){
			unchecked {
				#line 316 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
				return ((global::promhx.Promise<object>) (global::promhx.Promise<object>.__hx_cast<object>(((global::promhx.Promise) (this.defer<object>(typeof(global::verb.core.Modify), "curveReverse", new global::Array<object>(new object[]{this._data})).then<object>(( (( global::verb.geom.NurbsCurve_reverseAsync_317__Fun.__hx_current != default(global::verb.geom.NurbsCurve_reverseAsync_317__Fun) )) ? (global::verb.geom.NurbsCurve_reverseAsync_317__Fun.__hx_current) : (global::verb.geom.NurbsCurve_reverseAsync_317__Fun.__hx_current = ((global::verb.geom.NurbsCurve_reverseAsync_317__Fun) (new global::verb.geom.NurbsCurve_reverseAsync_317__Fun()) )) ))) ))) );
			}
			#line default
		}
		
		
		public virtual   global::Array<object> tessellate(global::haxe.lang.Null<double> tolerance){
			unchecked {
				#line 330 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
				return global::verb.core.Tess.rationalCurveAdaptiveSample(this._data, tolerance, new global::haxe.lang.Null<bool>(false, true));
			}
			#line default
		}
		
		
		public virtual   global::promhx.Promise<object> tessellateAsync(global::haxe.lang.Null<double> tolerance){
			unchecked {
				#line 334 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
				return this.defer<object>(typeof(global::verb.core.Tess), "rationalCurveAdaptiveSample", new global::Array<object>(new object[]{this._data, (tolerance).toDynamic(), false}));
			}
			#line default
		}
		
		
		public override   object __hx_setField(string field, int hash, object @value, bool handleProperties){
			unchecked {
				#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
				switch (hash){
					case 1970565641:
					{
						#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
						this._data = ((global::verb.core.types.NurbsCurveData) (@value) );
						#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
						return @value;
					}
					
					
					default:
					{
						#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
						return base.__hx_setField(field, hash, @value, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_getField(string field, int hash, bool throwErrors, bool isCheck, bool handleProperties){
			unchecked {
				#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
				switch (hash){
					case 1127089214:
					{
						#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("tessellateAsync") ), ((int) (1127089214) ))) );
					}
					
					
					case 331972126:
					{
						#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("tessellate") ), ((int) (331972126) ))) );
					}
					
					
					case 1017305786:
					{
						#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("reverseAsync") ), ((int) (1017305786) ))) );
					}
					
					
					case 452737314:
					{
						#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("reverse") ), ((int) (452737314) ))) );
					}
					
					
					case 1970859522:
					{
						#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("splitAsync") ), ((int) (1970859522) ))) );
					}
					
					
					case 24046298:
					{
						#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("split") ), ((int) (24046298) ))) );
					}
					
					
					case 1219227924:
					{
						#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("divideByArcLengthAsync") ), ((int) (1219227924) ))) );
					}
					
					
					case 461291784:
					{
						#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("divideByArcLength") ), ((int) (461291784) ))) );
					}
					
					
					case 1996886600:
					{
						#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("divideByEqualArcLengthAsync") ), ((int) (1996886600) ))) );
					}
					
					
					case 608185428:
					{
						#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("divideByEqualArcLength") ), ((int) (608185428) ))) );
					}
					
					
					case 570549622:
					{
						#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("paramAtLengthAsync") ), ((int) (570549622) ))) );
					}
					
					
					case 787556326:
					{
						#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("paramAtLength") ), ((int) (787556326) ))) );
					}
					
					
					case 613587016:
					{
						#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("lengthAtParamAsync") ), ((int) (613587016) ))) );
					}
					
					
					case 771843668:
					{
						#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("lengthAtParam") ), ((int) (771843668) ))) );
					}
					
					
					case 142628982:
					{
						#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("lengthAsync") ), ((int) (142628982) ))) );
					}
					
					
					case 520590566:
					{
						#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("length") ), ((int) (520590566) ))) );
					}
					
					
					case 963868456:
					{
						#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("closestParamAsync") ), ((int) (963868456) ))) );
					}
					
					
					case 1586295668:
					{
						#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("closestParam") ), ((int) (1586295668) ))) );
					}
					
					
					case 687325317:
					{
						#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("closestPointAsync") ), ((int) (687325317) ))) );
					}
					
					
					case 1741104951:
					{
						#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("closestPoint") ), ((int) (1741104951) ))) );
					}
					
					
					case 640459024:
					{
						#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("derivativesAsync") ), ((int) (640459024) ))) );
					}
					
					
					case 489951884:
					{
						#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("derivatives") ), ((int) (489951884) ))) );
					}
					
					
					case 672557111:
					{
						#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("tangentAsync") ), ((int) (672557111) ))) );
					}
					
					
					case 986553541:
					{
						#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("tangent") ), ((int) (986553541) ))) );
					}
					
					
					case 100407500:
					{
						#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("pointAsync") ), ((int) (100407500) ))) );
					}
					
					
					case 1183822928:
					{
						#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("point") ), ((int) (1183822928) ))) );
					}
					
					
					case 482351664:
					{
						#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("transformAsync") ), ((int) (482351664) ))) );
					}
					
					
					case 1167273324:
					{
						#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("transform") ), ((int) (1167273324) ))) );
					}
					
					
					case 763408708:
					{
						#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("domain") ), ((int) (763408708) ))) );
					}
					
					
					case 1214452573:
					{
						#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("clone") ), ((int) (1214452573) ))) );
					}
					
					
					case 1939507850:
					{
						#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("asNurbs") ), ((int) (1939507850) ))) );
					}
					
					
					case 1878841339:
					{
						#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("weights") ), ((int) (1878841339) ))) );
					}
					
					
					case 1878152544:
					{
						#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("controlPoints") ), ((int) (1878152544) ))) );
					}
					
					
					case 1693067755:
					{
						#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("knots") ), ((int) (1693067755) ))) );
					}
					
					
					case 1737785164:
					{
						#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("degree") ), ((int) (1737785164) ))) );
					}
					
					
					case 1970565641:
					{
						#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
						return this._data;
					}
					
					
					default:
					{
						#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
						return base.__hx_getField(field, hash, throwErrors, isCheck, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_invokeField(string field, int hash, global::Array dynargs){
			unchecked {
				#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
				switch (hash){
					case 1127089214:
					{
						#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
						return this.tessellateAsync(global::haxe.lang.Null<object>.ofDynamic<double>(dynargs[0]));
					}
					
					
					case 331972126:
					{
						#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
						return this.tessellate(global::haxe.lang.Null<object>.ofDynamic<double>(dynargs[0]));
					}
					
					
					case 1017305786:
					{
						#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
						return this.reverseAsync();
					}
					
					
					case 452737314:
					{
						#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
						return this.reverse();
					}
					
					
					case 1970859522:
					{
						#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
						return this.splitAsync(((double) (global::haxe.lang.Runtime.toDouble(dynargs[0])) ));
					}
					
					
					case 24046298:
					{
						#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
						return this.split(((double) (global::haxe.lang.Runtime.toDouble(dynargs[0])) ));
					}
					
					
					case 1219227924:
					{
						#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
						return this.divideByArcLengthAsync(((int) (global::haxe.lang.Runtime.toInt(dynargs[0])) ));
					}
					
					
					case 461291784:
					{
						#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
						return this.divideByArcLength(((double) (global::haxe.lang.Runtime.toDouble(dynargs[0])) ));
					}
					
					
					case 1996886600:
					{
						#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
						return this.divideByEqualArcLengthAsync(((int) (global::haxe.lang.Runtime.toInt(dynargs[0])) ));
					}
					
					
					case 608185428:
					{
						#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
						return this.divideByEqualArcLength(((int) (global::haxe.lang.Runtime.toInt(dynargs[0])) ));
					}
					
					
					case 570549622:
					{
						#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
						return this.paramAtLengthAsync(((double) (global::haxe.lang.Runtime.toDouble(dynargs[0])) ), global::haxe.lang.Null<object>.ofDynamic<double>(dynargs[1]));
					}
					
					
					case 787556326:
					{
						#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
						return this.paramAtLength(((double) (global::haxe.lang.Runtime.toDouble(dynargs[0])) ), global::haxe.lang.Null<object>.ofDynamic<double>(dynargs[1]));
					}
					
					
					case 613587016:
					{
						#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
						return this.lengthAtParamAsync();
					}
					
					
					case 771843668:
					{
						#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
						return this.lengthAtParam(((double) (global::haxe.lang.Runtime.toDouble(dynargs[0])) ));
					}
					
					
					case 142628982:
					{
						#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
						return this.lengthAsync();
					}
					
					
					case 520590566:
					{
						#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
						return this.length();
					}
					
					
					case 963868456:
					{
						#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
						return this.closestParamAsync(dynargs[0]);
					}
					
					
					case 1586295668:
					{
						#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
						return this.closestParam(((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (dynargs[0]) ))) ));
					}
					
					
					case 687325317:
					{
						#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
						return this.closestPointAsync(((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (dynargs[0]) ))) ));
					}
					
					
					case 1741104951:
					{
						#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
						return this.closestPoint(((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (dynargs[0]) ))) ));
					}
					
					
					case 640459024:
					{
						#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
						return this.derivativesAsync(((double) (global::haxe.lang.Runtime.toDouble(dynargs[0])) ), global::haxe.lang.Null<object>.ofDynamic<int>(dynargs[1]));
					}
					
					
					case 489951884:
					{
						#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
						return this.derivatives(((double) (global::haxe.lang.Runtime.toDouble(dynargs[0])) ), global::haxe.lang.Null<object>.ofDynamic<int>(dynargs[1]));
					}
					
					
					case 672557111:
					{
						#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
						return this.tangentAsync(((double) (global::haxe.lang.Runtime.toDouble(dynargs[0])) ));
					}
					
					
					case 986553541:
					{
						#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
						return this.tangent(((double) (global::haxe.lang.Runtime.toDouble(dynargs[0])) ));
					}
					
					
					case 100407500:
					{
						#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
						return this.pointAsync(((double) (global::haxe.lang.Runtime.toDouble(dynargs[0])) ));
					}
					
					
					case 1183822928:
					{
						#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
						return this.point(((double) (global::haxe.lang.Runtime.toDouble(dynargs[0])) ));
					}
					
					
					case 482351664:
					{
						#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
						return this.transformAsync(((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (dynargs[0]) ))) ));
					}
					
					
					case 1167273324:
					{
						#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
						return this.transform(((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (dynargs[0]) ))) ));
					}
					
					
					case 763408708:
					{
						#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
						return this.domain();
					}
					
					
					case 1214452573:
					{
						#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
						return this.clone();
					}
					
					
					case 1939507850:
					{
						#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
						return this.asNurbs();
					}
					
					
					case 1878841339:
					{
						#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
						return this.weights();
					}
					
					
					case 1878152544:
					{
						#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
						return this.controlPoints();
					}
					
					
					case 1693067755:
					{
						#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
						return this.knots();
					}
					
					
					case 1737785164:
					{
						#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
						return this.degree();
					}
					
					
					default:
					{
						#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
						return base.__hx_invokeField(field, hash, dynargs);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   void __hx_getFields(global::Array<object> baseArr){
			unchecked {
				#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
				baseArr.push("_data");
				#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
				{
					#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
					base.__hx_getFields(baseArr);
				}
				
			}
			#line default
		}
		
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.geom{
	public  class NurbsCurve_transformAsync_125__Fun : global::haxe.lang.Function {
		public    NurbsCurve_transformAsync_125__Fun() : base(1, 0){
			unchecked {
			}
			#line default
		}
		
		
		public static  global::verb.geom.NurbsCurve_transformAsync_125__Fun __hx_current;
		
		public override   object __hx_invoke1_o(double __fn_float1, object __fn_dyn1){
			unchecked {
				#line 125 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
				global::verb.core.types.NurbsCurveData x = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (((global::verb.core.types.NurbsCurveData) (((object) (__fn_float1) )) )) : (((global::verb.core.types.NurbsCurveData) (__fn_dyn1) )) );
				#line 125 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
				return new global::verb.geom.NurbsCurve(((global::verb.core.types.NurbsCurveData) (x) ));
			}
			#line default
		}
		
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.geom{
	public  class NurbsCurve_split_296__Fun : global::haxe.lang.Function {
		public    NurbsCurve_split_296__Fun() : base(1, 0){
			unchecked {
			}
			#line default
		}
		
		
		public static  global::verb.geom.NurbsCurve_split_296__Fun __hx_current;
		
		public override   object __hx_invoke1_o(double __fn_float1, object __fn_dyn1){
			unchecked {
				#line 296 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
				global::verb.core.types.NurbsCurveData x = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (((global::verb.core.types.NurbsCurveData) (((object) (__fn_float1) )) )) : (((global::verb.core.types.NurbsCurveData) (__fn_dyn1) )) );
				#line 296 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
				return new global::verb.geom.NurbsCurve(((global::verb.core.types.NurbsCurveData) (x) ));
			}
			#line default
		}
		
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.geom{
	public  class NurbsCurve_splitAsync_302__Fun : global::haxe.lang.Function {
		public    NurbsCurve_splitAsync_302__Fun() : base(1, 0){
			unchecked {
			}
			#line default
		}
		
		
		public static  global::verb.geom.NurbsCurve_splitAsync_302__Fun __hx_current;
		
		public override   object __hx_invoke1_o(double __fn_float1, object __fn_dyn1){
			unchecked {
				#line 302 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
				global::verb.core.types.NurbsCurveData x = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (((global::verb.core.types.NurbsCurveData) (((object) (__fn_float1) )) )) : (((global::verb.core.types.NurbsCurveData) (__fn_dyn1) )) );
				#line 302 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
				return new global::verb.geom.NurbsCurve(((global::verb.core.types.NurbsCurveData) (x) ));
			}
			#line default
		}
		
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.geom{
	public  class NurbsCurve_splitAsync_301__Fun : global::haxe.lang.Function {
		public    NurbsCurve_splitAsync_301__Fun() : base(1, 0){
			unchecked {
			}
			#line default
		}
		
		
		public static  global::verb.geom.NurbsCurve_splitAsync_301__Fun __hx_current;
		
		public override   object __hx_invoke1_o(double __fn_float1, object __fn_dyn1){
			unchecked {
				#line 301 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
				global::Array<object> cs = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (((object) (__fn_float1) )) ))) )) : (((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (__fn_dyn1) ))) )) );
				return cs.map<object>(( (( global::verb.geom.NurbsCurve_splitAsync_302__Fun.__hx_current != default(global::verb.geom.NurbsCurve_splitAsync_302__Fun) )) ? (global::verb.geom.NurbsCurve_splitAsync_302__Fun.__hx_current) : (global::verb.geom.NurbsCurve_splitAsync_302__Fun.__hx_current = ((global::verb.geom.NurbsCurve_splitAsync_302__Fun) (new global::verb.geom.NurbsCurve_splitAsync_302__Fun()) )) ));
			}
			#line default
		}
		
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.geom{
	public  class NurbsCurve_reverseAsync_317__Fun : global::haxe.lang.Function {
		public    NurbsCurve_reverseAsync_317__Fun() : base(1, 0){
			unchecked {
			}
			#line default
		}
		
		
		public static  global::verb.geom.NurbsCurve_reverseAsync_317__Fun __hx_current;
		
		public override   object __hx_invoke1_o(double __fn_float1, object __fn_dyn1){
			unchecked {
				#line 317 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
				global::verb.core.types.NurbsCurveData c = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (((global::verb.core.types.NurbsCurveData) (((object) (__fn_float1) )) )) : (((global::verb.core.types.NurbsCurveData) (__fn_dyn1) )) );
				#line 317 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsCurve.hx"
				return new global::verb.geom.NurbsCurve(((global::verb.core.types.NurbsCurveData) (c) ));
			}
			#line default
		}
		
		
	}
}


