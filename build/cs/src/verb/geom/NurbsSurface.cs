
#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.geom{
	public  class NurbsSurface : global::verb.exe.AsyncObject, global::verb.geom.ISurface {
		public    NurbsSurface(global::haxe.lang.EmptyObject empty) : base(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) )){
			unchecked {
			}
			#line default
		}
		
		
		public    NurbsSurface(global::verb.core.types.NurbsSurfaceData data){
			unchecked {
				#line 45 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
				global::verb.geom.NurbsSurface.__hx_ctor_verb_geom_NurbsSurface(this, data);
			}
			#line default
		}
		
		
		public static   void __hx_ctor_verb_geom_NurbsSurface(global::verb.geom.NurbsSurface __temp_me124, global::verb.core.types.NurbsSurfaceData data){
			unchecked {
				#line 46 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
				__temp_me124._data = global::verb.core.Check.nurbsSurfaceData(data);
			}
			#line default
		}
		
		
		public static   global::verb.geom.NurbsSurface byKnotsControlPointsWeights(int degreeU, int degreeV, global::Array<double> knotsU, global::Array<double> knotsV, global::Array<object> controlPoints, global::Array<object> weights){
			unchecked {
				#line 69 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
				return new global::verb.geom.NurbsSurface(((global::verb.core.types.NurbsSurfaceData) (new global::verb.core.types.NurbsSurfaceData(((int) (degreeU) ), ((int) (degreeV) ), ((global::Array<double>) (knotsU) ), ((global::Array<double>) (knotsV) ), ((global::Array<object>) (global::verb.core.Eval.homogenize2d(controlPoints, weights)) ))) ));
			}
			#line default
		}
		
		
		public static   global::verb.geom.NurbsSurface byCorners(global::Array<double> point0, global::Array<double> point1, global::Array<double> point2, global::Array<double> point3){
			unchecked {
				#line 84 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
				return new global::verb.geom.NurbsSurface(((global::verb.core.types.NurbsSurfaceData) (global::verb.core.Make.fourPointSurface(point0, point1, point2, point3, default(global::haxe.lang.Null<int>))) ));
			}
			#line default
		}
		
		
		public static   global::verb.geom.NurbsSurface byLoftingCurves(global::Array<object> curves, global::haxe.lang.Null<int> degreeV){
			unchecked {
				#line 96 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
				global::Array<object> __temp_stmt272 = default(global::Array<object>);
				#line 96 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
				{
					#line 96 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
					global::Array<object> _g = new global::Array<object>(new object[]{});
					#line 96 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
					{
						#line 96 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
						int _g1 = 0;
						#line 96 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
						while (( _g1 < curves.length )){
							#line 96 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
							global::verb.geom.ICurve c = ((global::verb.geom.ICurve) (curves[_g1]) );
							#line 96 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
							 ++ _g1;
							#line 96 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
							_g.push(c.asNurbs());
						}
						
					}
					
					#line 96 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
					__temp_stmt272 = _g;
				}
				
				#line 96 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
				global::verb.core.types.NurbsSurfaceData __temp_stmt271 = global::verb.core.Make.loftedSurface(__temp_stmt272, degreeV);
				#line 96 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
				return new global::verb.geom.NurbsSurface(((global::verb.core.types.NurbsSurfaceData) (__temp_stmt271) ));
			}
			#line default
		}
		
		
		public static  new object __hx_createEmpty(){
			unchecked {
				#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
				return new global::verb.geom.NurbsSurface(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) ));
			}
			#line default
		}
		
		
		public static  new object __hx_create(global::Array arr){
			unchecked {
				#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
				return new global::verb.geom.NurbsSurface(((global::verb.core.types.NurbsSurfaceData) (arr[0]) ));
			}
			#line default
		}
		
		
		public  global::verb.core.types.NurbsSurfaceData _data;
		
		public virtual   int degreeU(){
			unchecked {
				#line 30 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
				return this._data.degreeU;
			}
			#line default
		}
		
		
		public virtual   int degreeV(){
			unchecked {
				#line 31 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
				return this._data.degreeV;
			}
			#line default
		}
		
		
		public virtual   global::Array<double> knotsU(){
			unchecked {
				#line 32 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
				return this._data.knotsU.slice(0, default(global::haxe.lang.Null<int>));
			}
			#line default
		}
		
		
		public virtual   global::Array<double> knotsV(){
			unchecked {
				#line 33 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
				return this._data.knotsV.slice(0, default(global::haxe.lang.Null<int>));
			}
			#line default
		}
		
		
		public virtual   global::Array<object> controlPoints(){
			unchecked {
				#line 34 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
				return global::verb.core.Eval.dehomogenize2d(this._data.controlPoints);
			}
			#line default
		}
		
		
		public virtual   global::Array<object> weights(){
			unchecked {
				#line 35 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
				return global::verb.core.Eval.weight2d(this._data.controlPoints);
			}
			#line default
		}
		
		
		public virtual   global::verb.core.types.NurbsSurfaceData asNurbs(){
			unchecked {
				#line 105 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
				return new global::verb.core.types.NurbsSurfaceData(((int) (this.degreeU()) ), ((int) (this.degreeV()) ), ((global::Array<double>) (this.knotsU()) ), ((global::Array<double>) (this.knotsV()) ), ((global::Array<object>) (global::verb.core.Eval.homogenize2d(this.controlPoints(), this.weights())) ));
			}
			#line default
		}
		
		
		public virtual   global::verb.geom.NurbsSurface clone(){
			unchecked {
				#line 114 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
				return new global::verb.geom.NurbsSurface(((global::verb.core.types.NurbsSurfaceData) (this.asNurbs()) ));
			}
			#line default
		}
		
		
		public virtual   global::verb.core.types.Interval<double> domainU(){
			unchecked {
				#line 123 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
				double __temp_stmt269 = default(double);
				#line 123 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
				{
					#line 123 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
					global::Array<double> a = this._data.knotsU;
					#line 123 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
					__temp_stmt269 = a[( a.length - 1 )];
				}
				
				#line 123 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
				return new global::verb.core.types.Interval<double>(((double) (this._data.knotsU[0]) ), ((double) (__temp_stmt269) ));
			}
			#line default
		}
		
		
		public virtual   global::verb.core.types.Interval<double> domainV(){
			unchecked {
				#line 132 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
				double __temp_stmt270 = default(double);
				#line 132 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
				{
					#line 132 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
					global::Array<double> a = this._data.knotsV;
					#line 132 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
					__temp_stmt270 = a[( a.length - 1 )];
				}
				
				#line 132 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
				return new global::verb.core.types.Interval<double>(((double) (this._data.knotsV[0]) ), ((double) (__temp_stmt270) ));
			}
			#line default
		}
		
		
		public virtual   global::Array<double> point(double u, double v){
			unchecked {
				#line 145 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
				return global::verb.core.Eval.rationalSurfacePoint(this._data, u, v);
			}
			#line default
		}
		
		
		public virtual   global::promhx.Promise<object> pointAsync(double u, double v){
			unchecked {
				#line 149 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
				return this.defer<object>(typeof(global::verb.core.Eval), "rationalSurfacePoint", new global::Array<object>(new object[]{this._data, u, v}));
			}
			#line default
		}
		
		
		public virtual   global::Array<double> normal(double u, double v){
			unchecked {
				#line 162 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
				return global::verb.core.Eval.rationalSurfaceNormal(this._data, u, v);
			}
			#line default
		}
		
		
		public virtual   global::promhx.Promise<object> normalAsync(double u, double v){
			unchecked {
				#line 166 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
				return this.defer<object>(typeof(global::verb.core.Eval), "rationalSurfaceNormal", new global::Array<object>(new object[]{this._data, u, v}));
			}
			#line default
		}
		
		
		public virtual   global::Array<object> derivatives(double u, double v, global::haxe.lang.Null<int> numDerivs){
			unchecked {
				#line 184 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
				int __temp_numDerivs116 = ( ( ! (numDerivs.hasValue) ) ? (((int) (1) )) : (numDerivs.@value) );
				#line 184 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
				return global::verb.core.Eval.rationalSurfaceDerivatives(this._data, u, v, new global::haxe.lang.Null<int>(__temp_numDerivs116, true));
			}
			#line default
		}
		
		
		public virtual   global::promhx.Promise<object> derivativesAsync(double u, double v, global::haxe.lang.Null<int> numDerivs){
			unchecked {
				#line 188 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
				int __temp_numDerivs117 = ( ( ! (numDerivs.hasValue) ) ? (((int) (1) )) : (numDerivs.@value) );
				#line 188 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
				return this.defer<object>(typeof(global::verb.core.Eval), "rationalSurfaceDerivatives", new global::Array<object>(new object[]{this._data, u, v, __temp_numDerivs117}));
			}
			#line default
		}
		
		
		public virtual   global::Array<double> closestParam(global::Array<double> pt){
			unchecked {
				#line 200 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
				return global::verb.core.Analyze.rationalSurfaceClosestParam(this._data, pt);
			}
			#line default
		}
		
		
		public virtual   global::promhx.Promise<object> closestParamAsync(global::Array<double> pt){
			unchecked {
				#line 204 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
				return this.defer<object>(typeof(global::verb.core.Analyze), "rationalSurfaceClosestParam", new global::Array<object>(new object[]{this._data, pt}));
			}
			#line default
		}
		
		
		public virtual   global::Array<double> closestPoint(global::Array<double> pt){
			unchecked {
				#line 216 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
				return global::verb.core.Analyze.rationalSurfaceClosestPoint(this._data, pt);
			}
			#line default
		}
		
		
		public virtual   global::promhx.Promise<object> closestPointAsync(global::Array<double> pt){
			unchecked {
				#line 220 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
				return this.defer<object>(typeof(global::verb.core.Analyze), "rationalSurfaceClosestPoint", new global::Array<object>(new object[]{this._data, pt}));
			}
			#line default
		}
		
		
		public virtual   global::Array<object> split(double u, global::haxe.lang.Null<bool> useV){
			unchecked {
				#line 233 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
				bool __temp_useV118 = ( ( ! (useV.hasValue) ) ? (global::haxe.lang.Runtime.toBool(false)) : (useV.@value) );
				#line 233 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
				return global::verb.core.Modify.surfaceSplit(this._data, u, new global::haxe.lang.Null<bool>(__temp_useV118, true)).map<object>(( (( global::verb.geom.NurbsSurface_split_234__Fun.__hx_current != default(global::verb.geom.NurbsSurface_split_234__Fun) )) ? (global::verb.geom.NurbsSurface_split_234__Fun.__hx_current) : (global::verb.geom.NurbsSurface_split_234__Fun.__hx_current = ((global::verb.geom.NurbsSurface_split_234__Fun) (new global::verb.geom.NurbsSurface_split_234__Fun()) )) ));
			}
			#line default
		}
		
		
		public virtual   global::promhx.Promise<object> splitAsync(double u, global::haxe.lang.Null<bool> useV){
			unchecked {
				#line 238 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
				bool __temp_useV119 = ( ( ! (useV.hasValue) ) ? (global::haxe.lang.Runtime.toBool(false)) : (useV.@value) );
				#line 238 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
				return ((global::promhx.Promise<object>) (global::promhx.Promise<object>.__hx_cast<object>(((global::promhx.Promise) (this.defer<object>(typeof(global::verb.core.Modify), "surfaceSplit", new global::Array<object>(new object[]{this._data, u, __temp_useV119})).then<object>(( (( global::verb.geom.NurbsSurface_splitAsync_239__Fun.__hx_current != default(global::verb.geom.NurbsSurface_splitAsync_239__Fun) )) ? (global::verb.geom.NurbsSurface_splitAsync_239__Fun.__hx_current) : (global::verb.geom.NurbsSurface_splitAsync_239__Fun.__hx_current = ((global::verb.geom.NurbsSurface_splitAsync_239__Fun) (new global::verb.geom.NurbsSurface_splitAsync_239__Fun()) )) ))) ))) );
			}
			#line default
		}
		
		
		public virtual   global::verb.geom.NurbsSurface reverse(global::haxe.lang.Null<bool> useV){
			unchecked {
				#line 253 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
				bool __temp_useV120 = ( ( ! (useV.hasValue) ) ? (global::haxe.lang.Runtime.toBool(false)) : (useV.@value) );
				#line 253 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
				return new global::verb.geom.NurbsSurface(((global::verb.core.types.NurbsSurfaceData) (global::verb.core.Modify.surfaceReverse(this._data, new global::haxe.lang.Null<bool>(__temp_useV120, true))) ));
			}
			#line default
		}
		
		
		public virtual   global::promhx.Promise<object> reverseAsync(global::haxe.lang.Null<bool> useV){
			unchecked {
				#line 257 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
				bool __temp_useV121 = ( ( ! (useV.hasValue) ) ? (global::haxe.lang.Runtime.toBool(false)) : (useV.@value) );
				#line 257 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
				return ((global::promhx.Promise<object>) (global::promhx.Promise<object>.__hx_cast<object>(((global::promhx.Promise) (this.defer<object>(typeof(global::verb.core.Modify), "surfaceReverse", new global::Array<object>(new object[]{this._data, __temp_useV121})).then<object>(( (( global::verb.geom.NurbsSurface_reverseAsync_258__Fun.__hx_current != default(global::verb.geom.NurbsSurface_reverseAsync_258__Fun) )) ? (global::verb.geom.NurbsSurface_reverseAsync_258__Fun.__hx_current) : (global::verb.geom.NurbsSurface_reverseAsync_258__Fun.__hx_current = ((global::verb.geom.NurbsSurface_reverseAsync_258__Fun) (new global::verb.geom.NurbsSurface_reverseAsync_258__Fun()) )) ))) ))) );
			}
			#line default
		}
		
		
		public virtual   global::verb.geom.NurbsCurve isocurve(double u, global::haxe.lang.Null<bool> useV){
			unchecked {
				#line 271 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
				bool __temp_useV122 = ( ( ! (useV.hasValue) ) ? (global::haxe.lang.Runtime.toBool(false)) : (useV.@value) );
				#line 271 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
				return new global::verb.geom.NurbsCurve(((global::verb.core.types.NurbsCurveData) (global::verb.core.Make.surfaceIsocurve(this._data, u, new global::haxe.lang.Null<bool>(__temp_useV122, true))) ));
			}
			#line default
		}
		
		
		public virtual   global::promhx.Promise<object> isocurveAsync(double u, global::haxe.lang.Null<bool> useV){
			unchecked {
				#line 275 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
				bool __temp_useV123 = ( ( ! (useV.hasValue) ) ? (global::haxe.lang.Runtime.toBool(false)) : (useV.@value) );
				#line 275 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
				return ((global::promhx.Promise<object>) (global::promhx.Promise<object>.__hx_cast<object>(((global::promhx.Promise) (this.defer<object>(typeof(global::verb.core.Make), "surfaceIsocurve", new global::Array<object>(new object[]{this._data, u, __temp_useV123})).then<object>(( (( global::verb.geom.NurbsSurface_isocurveAsync_276__Fun.__hx_current != default(global::verb.geom.NurbsSurface_isocurveAsync_276__Fun) )) ? (global::verb.geom.NurbsSurface_isocurveAsync_276__Fun.__hx_current) : (global::verb.geom.NurbsSurface_isocurveAsync_276__Fun.__hx_current = ((global::verb.geom.NurbsSurface_isocurveAsync_276__Fun) (new global::verb.geom.NurbsSurface_isocurveAsync_276__Fun()) )) ))) ))) );
			}
			#line default
		}
		
		
		public virtual   global::verb.core.types.MeshData tessellate(global::verb.core.types.AdaptiveRefinementOptions options){
			unchecked {
				#line 288 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
				return global::verb.core.Tess.rationalSurfaceAdaptive(this._data, options);
			}
			#line default
		}
		
		
		public virtual   global::promhx.Promise<object> tessellateAsync(global::verb.core.types.AdaptiveRefinementOptions options){
			unchecked {
				#line 292 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
				return this.defer<object>(typeof(global::verb.core.Tess), "rationalSurfaceAdaptive", new global::Array<object>(new object[]{this._data, options}));
			}
			#line default
		}
		
		
		public virtual   global::verb.geom.NurbsSurface transform(global::Array<object> mat){
			unchecked {
				#line 304 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
				return new global::verb.geom.NurbsSurface(((global::verb.core.types.NurbsSurfaceData) (global::verb.core.Modify.rationalSurfaceTransform(this._data, mat)) ));
			}
			#line default
		}
		
		
		public virtual   global::promhx.Promise<object> transformAsync(global::Array<object> mat){
			unchecked {
				#line 308 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
				return ((global::promhx.Promise<object>) (global::promhx.Promise<object>.__hx_cast<object>(((global::promhx.Promise) (this.defer<object>(typeof(global::verb.core.Modify), "rationalSurfaceTransform", new global::Array<object>(new object[]{this._data, mat})).then<object>(( (( global::verb.geom.NurbsSurface_transformAsync_309__Fun.__hx_current != default(global::verb.geom.NurbsSurface_transformAsync_309__Fun) )) ? (global::verb.geom.NurbsSurface_transformAsync_309__Fun.__hx_current) : (global::verb.geom.NurbsSurface_transformAsync_309__Fun.__hx_current = ((global::verb.geom.NurbsSurface_transformAsync_309__Fun) (new global::verb.geom.NurbsSurface_transformAsync_309__Fun()) )) ))) ))) );
			}
			#line default
		}
		
		
		public override   object __hx_setField(string field, int hash, object @value, bool handleProperties){
			unchecked {
				#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
				switch (hash){
					case 1970565641:
					{
						#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
						this._data = ((global::verb.core.types.NurbsSurfaceData) (@value) );
						#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
						return @value;
					}
					
					
					default:
					{
						#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
						return base.__hx_setField(field, hash, @value, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_getField(string field, int hash, bool throwErrors, bool isCheck, bool handleProperties){
			unchecked {
				#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
				switch (hash){
					case 482351664:
					{
						#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("transformAsync") ), ((int) (482351664) ))) );
					}
					
					
					case 1167273324:
					{
						#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("transform") ), ((int) (1167273324) ))) );
					}
					
					
					case 1127089214:
					{
						#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("tessellateAsync") ), ((int) (1127089214) ))) );
					}
					
					
					case 331972126:
					{
						#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("tessellate") ), ((int) (331972126) ))) );
					}
					
					
					case 156631442:
					{
						#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("isocurveAsync") ), ((int) (156631442) ))) );
					}
					
					
					case 1405780298:
					{
						#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("isocurve") ), ((int) (1405780298) ))) );
					}
					
					
					case 1017305786:
					{
						#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("reverseAsync") ), ((int) (1017305786) ))) );
					}
					
					
					case 452737314:
					{
						#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("reverse") ), ((int) (452737314) ))) );
					}
					
					
					case 1970859522:
					{
						#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("splitAsync") ), ((int) (1970859522) ))) );
					}
					
					
					case 24046298:
					{
						#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("split") ), ((int) (24046298) ))) );
					}
					
					
					case 687325317:
					{
						#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("closestPointAsync") ), ((int) (687325317) ))) );
					}
					
					
					case 1741104951:
					{
						#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("closestPoint") ), ((int) (1741104951) ))) );
					}
					
					
					case 963868456:
					{
						#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("closestParamAsync") ), ((int) (963868456) ))) );
					}
					
					
					case 1586295668:
					{
						#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("closestParam") ), ((int) (1586295668) ))) );
					}
					
					
					case 640459024:
					{
						#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("derivativesAsync") ), ((int) (640459024) ))) );
					}
					
					
					case 489951884:
					{
						#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("derivatives") ), ((int) (489951884) ))) );
					}
					
					
					case 862965653:
					{
						#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("normalAsync") ), ((int) (862965653) ))) );
					}
					
					
					case 812216871:
					{
						#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("normal") ), ((int) (812216871) ))) );
					}
					
					
					case 100407500:
					{
						#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("pointAsync") ), ((int) (100407500) ))) );
					}
					
					
					case 1183822928:
					{
						#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("point") ), ((int) (1183822928) ))) );
					}
					
					
					case 588933778:
					{
						#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("domainV") ), ((int) (588933778) ))) );
					}
					
					
					case 588933777:
					{
						#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("domainU") ), ((int) (588933777) ))) );
					}
					
					
					case 1214452573:
					{
						#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("clone") ), ((int) (1214452573) ))) );
					}
					
					
					case 1939507850:
					{
						#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("asNurbs") ), ((int) (1939507850) ))) );
					}
					
					
					case 1878841339:
					{
						#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("weights") ), ((int) (1878841339) ))) );
					}
					
					
					case 1878152544:
					{
						#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("controlPoints") ), ((int) (1878152544) ))) );
					}
					
					
					case 1744471051:
					{
						#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("knotsV") ), ((int) (1744471051) ))) );
					}
					
					
					case 1744471050:
					{
						#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("knotsU") ), ((int) (1744471050) ))) );
					}
					
					
					case 979035018:
					{
						#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("degreeV") ), ((int) (979035018) ))) );
					}
					
					
					case 979035017:
					{
						#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("degreeU") ), ((int) (979035017) ))) );
					}
					
					
					case 1970565641:
					{
						#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
						return this._data;
					}
					
					
					default:
					{
						#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
						return base.__hx_getField(field, hash, throwErrors, isCheck, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_invokeField(string field, int hash, global::Array dynargs){
			unchecked {
				#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
				switch (hash){
					case 482351664:
					{
						#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
						return this.transformAsync(((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (dynargs[0]) ))) ));
					}
					
					
					case 1167273324:
					{
						#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
						return this.transform(((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (dynargs[0]) ))) ));
					}
					
					
					case 1127089214:
					{
						#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
						return this.tessellateAsync(((global::verb.core.types.AdaptiveRefinementOptions) (dynargs[0]) ));
					}
					
					
					case 331972126:
					{
						#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
						return this.tessellate(((global::verb.core.types.AdaptiveRefinementOptions) (dynargs[0]) ));
					}
					
					
					case 156631442:
					{
						#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
						return this.isocurveAsync(((double) (global::haxe.lang.Runtime.toDouble(dynargs[0])) ), global::haxe.lang.Null<object>.ofDynamic<bool>(dynargs[1]));
					}
					
					
					case 1405780298:
					{
						#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
						return this.isocurve(((double) (global::haxe.lang.Runtime.toDouble(dynargs[0])) ), global::haxe.lang.Null<object>.ofDynamic<bool>(dynargs[1]));
					}
					
					
					case 1017305786:
					{
						#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
						return this.reverseAsync(global::haxe.lang.Null<object>.ofDynamic<bool>(dynargs[0]));
					}
					
					
					case 452737314:
					{
						#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
						return this.reverse(global::haxe.lang.Null<object>.ofDynamic<bool>(dynargs[0]));
					}
					
					
					case 1970859522:
					{
						#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
						return this.splitAsync(((double) (global::haxe.lang.Runtime.toDouble(dynargs[0])) ), global::haxe.lang.Null<object>.ofDynamic<bool>(dynargs[1]));
					}
					
					
					case 24046298:
					{
						#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
						return this.split(((double) (global::haxe.lang.Runtime.toDouble(dynargs[0])) ), global::haxe.lang.Null<object>.ofDynamic<bool>(dynargs[1]));
					}
					
					
					case 687325317:
					{
						#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
						return this.closestPointAsync(((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (dynargs[0]) ))) ));
					}
					
					
					case 1741104951:
					{
						#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
						return this.closestPoint(((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (dynargs[0]) ))) ));
					}
					
					
					case 963868456:
					{
						#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
						return this.closestParamAsync(((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (dynargs[0]) ))) ));
					}
					
					
					case 1586295668:
					{
						#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
						return this.closestParam(((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (dynargs[0]) ))) ));
					}
					
					
					case 640459024:
					{
						#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
						return this.derivativesAsync(((double) (global::haxe.lang.Runtime.toDouble(dynargs[0])) ), ((double) (global::haxe.lang.Runtime.toDouble(dynargs[1])) ), global::haxe.lang.Null<object>.ofDynamic<int>(dynargs[2]));
					}
					
					
					case 489951884:
					{
						#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
						return this.derivatives(((double) (global::haxe.lang.Runtime.toDouble(dynargs[0])) ), ((double) (global::haxe.lang.Runtime.toDouble(dynargs[1])) ), global::haxe.lang.Null<object>.ofDynamic<int>(dynargs[2]));
					}
					
					
					case 862965653:
					{
						#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
						return this.normalAsync(((double) (global::haxe.lang.Runtime.toDouble(dynargs[0])) ), ((double) (global::haxe.lang.Runtime.toDouble(dynargs[1])) ));
					}
					
					
					case 812216871:
					{
						#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
						return this.normal(((double) (global::haxe.lang.Runtime.toDouble(dynargs[0])) ), ((double) (global::haxe.lang.Runtime.toDouble(dynargs[1])) ));
					}
					
					
					case 100407500:
					{
						#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
						return this.pointAsync(((double) (global::haxe.lang.Runtime.toDouble(dynargs[0])) ), ((double) (global::haxe.lang.Runtime.toDouble(dynargs[1])) ));
					}
					
					
					case 1183822928:
					{
						#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
						return this.point(((double) (global::haxe.lang.Runtime.toDouble(dynargs[0])) ), ((double) (global::haxe.lang.Runtime.toDouble(dynargs[1])) ));
					}
					
					
					case 588933778:
					{
						#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
						return this.domainV();
					}
					
					
					case 588933777:
					{
						#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
						return this.domainU();
					}
					
					
					case 1214452573:
					{
						#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
						return this.clone();
					}
					
					
					case 1939507850:
					{
						#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
						return this.asNurbs();
					}
					
					
					case 1878841339:
					{
						#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
						return this.weights();
					}
					
					
					case 1878152544:
					{
						#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
						return this.controlPoints();
					}
					
					
					case 1744471051:
					{
						#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
						return this.knotsV();
					}
					
					
					case 1744471050:
					{
						#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
						return this.knotsU();
					}
					
					
					case 979035018:
					{
						#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
						return this.degreeV();
					}
					
					
					case 979035017:
					{
						#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
						return this.degreeU();
					}
					
					
					default:
					{
						#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
						return base.__hx_invokeField(field, hash, dynargs);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   void __hx_getFields(global::Array<object> baseArr){
			unchecked {
				#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
				baseArr.push("_data");
				#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
				{
					#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
					base.__hx_getFields(baseArr);
				}
				
			}
			#line default
		}
		
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.geom{
	public  class NurbsSurface_split_234__Fun : global::haxe.lang.Function {
		public    NurbsSurface_split_234__Fun() : base(1, 0){
			unchecked {
			}
			#line default
		}
		
		
		public static  global::verb.geom.NurbsSurface_split_234__Fun __hx_current;
		
		public override   object __hx_invoke1_o(double __fn_float1, object __fn_dyn1){
			unchecked {
				#line 234 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
				global::verb.core.types.NurbsSurfaceData x = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (((global::verb.core.types.NurbsSurfaceData) (((object) (__fn_float1) )) )) : (((global::verb.core.types.NurbsSurfaceData) (__fn_dyn1) )) );
				#line 234 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
				return new global::verb.geom.NurbsSurface(((global::verb.core.types.NurbsSurfaceData) (x) ));
			}
			#line default
		}
		
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.geom{
	public  class NurbsSurface_splitAsync_240__Fun : global::haxe.lang.Function {
		public    NurbsSurface_splitAsync_240__Fun() : base(1, 0){
			unchecked {
			}
			#line default
		}
		
		
		public static  global::verb.geom.NurbsSurface_splitAsync_240__Fun __hx_current;
		
		public override   object __hx_invoke1_o(double __fn_float1, object __fn_dyn1){
			unchecked {
				#line 240 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
				global::verb.core.types.NurbsSurfaceData x = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (((global::verb.core.types.NurbsSurfaceData) (((object) (__fn_float1) )) )) : (((global::verb.core.types.NurbsSurfaceData) (__fn_dyn1) )) );
				#line 240 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
				return new global::verb.geom.NurbsSurface(((global::verb.core.types.NurbsSurfaceData) (x) ));
			}
			#line default
		}
		
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.geom{
	public  class NurbsSurface_splitAsync_239__Fun : global::haxe.lang.Function {
		public    NurbsSurface_splitAsync_239__Fun() : base(1, 0){
			unchecked {
			}
			#line default
		}
		
		
		public static  global::verb.geom.NurbsSurface_splitAsync_239__Fun __hx_current;
		
		public override   object __hx_invoke1_o(double __fn_float1, object __fn_dyn1){
			unchecked {
				#line 239 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
				object s = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (((object) (__fn_float1) )) : (((object) (__fn_dyn1) )) );
				return ((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (global::haxe.lang.Runtime.callField(s, "map", 5442204, new global::Array<object>(new object[]{( (( global::verb.geom.NurbsSurface_splitAsync_240__Fun.__hx_current != default(global::verb.geom.NurbsSurface_splitAsync_240__Fun) )) ? (global::verb.geom.NurbsSurface_splitAsync_240__Fun.__hx_current) : (global::verb.geom.NurbsSurface_splitAsync_240__Fun.__hx_current = ((global::verb.geom.NurbsSurface_splitAsync_240__Fun) (new global::verb.geom.NurbsSurface_splitAsync_240__Fun()) )) )}))) ))) );
			}
			#line default
		}
		
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.geom{
	public  class NurbsSurface_reverseAsync_258__Fun : global::haxe.lang.Function {
		public    NurbsSurface_reverseAsync_258__Fun() : base(1, 0){
			unchecked {
			}
			#line default
		}
		
		
		public static  global::verb.geom.NurbsSurface_reverseAsync_258__Fun __hx_current;
		
		public override   object __hx_invoke1_o(double __fn_float1, object __fn_dyn1){
			unchecked {
				#line 258 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
				global::verb.core.types.NurbsSurfaceData c = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (((global::verb.core.types.NurbsSurfaceData) (((object) (__fn_float1) )) )) : (((global::verb.core.types.NurbsSurfaceData) (__fn_dyn1) )) );
				#line 258 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
				return new global::verb.geom.NurbsSurface(((global::verb.core.types.NurbsSurfaceData) (c) ));
			}
			#line default
		}
		
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.geom{
	public  class NurbsSurface_isocurveAsync_276__Fun : global::haxe.lang.Function {
		public    NurbsSurface_isocurveAsync_276__Fun() : base(1, 0){
			unchecked {
			}
			#line default
		}
		
		
		public static  global::verb.geom.NurbsSurface_isocurveAsync_276__Fun __hx_current;
		
		public override   object __hx_invoke1_o(double __fn_float1, object __fn_dyn1){
			unchecked {
				#line 276 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
				global::verb.core.types.NurbsCurveData x = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (((global::verb.core.types.NurbsCurveData) (((object) (__fn_float1) )) )) : (((global::verb.core.types.NurbsCurveData) (__fn_dyn1) )) );
				#line 276 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
				return new global::verb.geom.NurbsCurve(((global::verb.core.types.NurbsCurveData) (x) ));
			}
			#line default
		}
		
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.geom{
	public  class NurbsSurface_transformAsync_309__Fun : global::haxe.lang.Function {
		public    NurbsSurface_transformAsync_309__Fun() : base(1, 0){
			unchecked {
			}
			#line default
		}
		
		
		public static  global::verb.geom.NurbsSurface_transformAsync_309__Fun __hx_current;
		
		public override   object __hx_invoke1_o(double __fn_float1, object __fn_dyn1){
			unchecked {
				#line 309 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
				global::verb.core.types.NurbsSurfaceData x = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (((global::verb.core.types.NurbsSurfaceData) (((object) (__fn_float1) )) )) : (((global::verb.core.types.NurbsSurfaceData) (__fn_dyn1) )) );
				#line 309 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/NurbsSurface.hx"
				return new global::verb.geom.NurbsSurface(((global::verb.core.types.NurbsSurfaceData) (x) ));
			}
			#line default
		}
		
		
	}
}


