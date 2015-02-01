
#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.geom{
	public  class Intersect : global::haxe.lang.HxObject {
		public    Intersect(global::haxe.lang.EmptyObject empty){
			unchecked {
				#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/Intersect.hx"
				{
				}
				
			}
			#line default
		}
		
		
		public    Intersect(){
			unchecked {
				#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/Intersect.hx"
				global::verb.geom.Intersect.__hx_ctor_verb_geom_Intersect(this);
			}
			#line default
		}
		
		
		public static   void __hx_ctor_verb_geom_Intersect(global::verb.geom.Intersect __temp_me136){
			unchecked {
				#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/Intersect.hx"
				{
				}
				
			}
			#line default
		}
		
		
		public static   global::Array<object> curves(global::verb.geom.ICurve first, global::verb.geom.ICurve second, global::haxe.lang.Null<double> tol){
			unchecked {
				#line 22 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/Intersect.hx"
				double __temp_tol130 = ( ( ! (tol.hasValue) ) ? (((double) (1e-3) )) : (tol.@value) );
				#line 22 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/Intersect.hx"
				return global::verb.core.Intersect.curves(first.asNurbs(), second.asNurbs(), __temp_tol130);
			}
			#line default
		}
		
		
		public static   global::promhx.Promise<object> curvesAsync(global::verb.geom.ICurve first, global::verb.geom.ICurve second, global::haxe.lang.Null<double> tol){
			unchecked {
				#line 26 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/Intersect.hx"
				double __temp_tol131 = ( ( ! (tol.hasValue) ) ? (((double) (1e-3) )) : (tol.@value) );
				#line 26 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/Intersect.hx"
				return global::verb.exe.Dispatcher.dispatchMethod<object>(typeof(global::verb.core.Intersect), "curves", new global::Array<object>(new object[]{first.asNurbs(), second.asNurbs(), __temp_tol131}));
			}
			#line default
		}
		
		
		public static   global::Array<object> curveAndSurface(global::verb.geom.ICurve curve, global::verb.geom.ISurface surface, global::haxe.lang.Null<double> tol){
			unchecked {
				#line 40 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/Intersect.hx"
				double __temp_tol132 = ( ( ! (tol.hasValue) ) ? (((double) (1e-3) )) : (tol.@value) );
				#line 40 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/Intersect.hx"
				return global::verb.core.Intersect.curveAndSurface(curve.asNurbs(), surface.asNurbs(), new global::haxe.lang.Null<double>(__temp_tol132, true));
			}
			#line default
		}
		
		
		public static   global::promhx.Promise<object> curveAndSurfaceAsync(global::verb.geom.ICurve curve, global::verb.geom.ISurface surface, global::haxe.lang.Null<double> tol){
			unchecked {
				#line 44 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/Intersect.hx"
				double __temp_tol133 = ( ( ! (tol.hasValue) ) ? (((double) (1e-3) )) : (tol.@value) );
				#line 44 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/Intersect.hx"
				return global::verb.exe.Dispatcher.dispatchMethod<object>(typeof(global::verb.core.Intersect), "curveAndSurface", new global::Array<object>(new object[]{curve.asNurbs(), surface.asNurbs(), __temp_tol133}));
			}
			#line default
		}
		
		
		public static   global::Array<object> surfaces(global::verb.geom.ISurface first, global::verb.geom.ISurface second, global::haxe.lang.Null<double> tol){
			unchecked {
				#line 57 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/Intersect.hx"
				double __temp_tol134 = ( ( ! (tol.hasValue) ) ? (((double) (1e-3) )) : (tol.@value) );
				#line 57 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/Intersect.hx"
				return global::verb.core.Intersect.surfaces(first.asNurbs(), second.asNurbs(), __temp_tol134).map<object>(( (( global::verb.geom.Intersect_surfaces_58__Fun.__hx_current != default(global::verb.geom.Intersect_surfaces_58__Fun) )) ? (global::verb.geom.Intersect_surfaces_58__Fun.__hx_current) : (global::verb.geom.Intersect_surfaces_58__Fun.__hx_current = ((global::verb.geom.Intersect_surfaces_58__Fun) (new global::verb.geom.Intersect_surfaces_58__Fun()) )) ));
			}
			#line default
		}
		
		
		public static   global::promhx.Promise<object> surfacesAsync(global::verb.geom.ISurface first, global::verb.geom.ISurface second, global::haxe.lang.Null<double> tol){
			unchecked {
				#line 62 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/Intersect.hx"
				double __temp_tol135 = ( ( ! (tol.hasValue) ) ? (((double) (1e-3) )) : (tol.@value) );
				#line 62 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/Intersect.hx"
				return ((global::promhx.Promise<object>) (global::promhx.Promise<object>.__hx_cast<object>(((global::promhx.Promise) (global::verb.exe.Dispatcher.dispatchMethod<object>(typeof(global::verb.core.Intersect), "surfaces", new global::Array<object>(new object[]{first.asNurbs(), second.asNurbs(), __temp_tol135})).then<object>(( (( global::verb.geom.Intersect_surfacesAsync_63__Fun.__hx_current != default(global::verb.geom.Intersect_surfacesAsync_63__Fun) )) ? (global::verb.geom.Intersect_surfacesAsync_63__Fun.__hx_current) : (global::verb.geom.Intersect_surfacesAsync_63__Fun.__hx_current = ((global::verb.geom.Intersect_surfacesAsync_63__Fun) (new global::verb.geom.Intersect_surfacesAsync_63__Fun()) )) ))) ))) );
			}
			#line default
		}
		
		
		public static  new object __hx_createEmpty(){
			unchecked {
				#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/Intersect.hx"
				return new global::verb.geom.Intersect(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) ));
			}
			#line default
		}
		
		
		public static  new object __hx_create(global::Array arr){
			unchecked {
				#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/Intersect.hx"
				return new global::verb.geom.Intersect();
			}
			#line default
		}
		
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.geom{
	public  class Intersect_surfaces_58__Fun : global::haxe.lang.Function {
		public    Intersect_surfaces_58__Fun() : base(1, 0){
			unchecked {
			}
			#line default
		}
		
		
		public static  global::verb.geom.Intersect_surfaces_58__Fun __hx_current;
		
		public override   object __hx_invoke1_o(double __fn_float1, object __fn_dyn1){
			unchecked {
				#line 58 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/Intersect.hx"
				global::verb.core.types.NurbsCurveData cd = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (((global::verb.core.types.NurbsCurveData) (((object) (__fn_float1) )) )) : (((global::verb.core.types.NurbsCurveData) (__fn_dyn1) )) );
				#line 58 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/Intersect.hx"
				return new global::verb.geom.NurbsCurve(((global::verb.core.types.NurbsCurveData) (cd) ));
			}
			#line default
		}
		
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.geom{
	public  class Intersect_surfacesAsync_64__Fun : global::haxe.lang.Function {
		public    Intersect_surfacesAsync_64__Fun() : base(1, 0){
			unchecked {
			}
			#line default
		}
		
		
		public static  global::verb.geom.Intersect_surfacesAsync_64__Fun __hx_current;
		
		public override   object __hx_invoke1_o(double __fn_float1, object __fn_dyn1){
			unchecked {
				#line 64 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/Intersect.hx"
				global::verb.core.types.NurbsCurveData cd = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (((global::verb.core.types.NurbsCurveData) (((object) (__fn_float1) )) )) : (((global::verb.core.types.NurbsCurveData) (__fn_dyn1) )) );
				#line 64 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/Intersect.hx"
				return new global::verb.geom.NurbsCurve(((global::verb.core.types.NurbsCurveData) (cd) ));
			}
			#line default
		}
		
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.geom{
	public  class Intersect_surfacesAsync_63__Fun : global::haxe.lang.Function {
		public    Intersect_surfacesAsync_63__Fun() : base(1, 0){
			unchecked {
			}
			#line default
		}
		
		
		public static  global::verb.geom.Intersect_surfacesAsync_63__Fun __hx_current;
		
		public override   object __hx_invoke1_o(double __fn_float1, object __fn_dyn1){
			unchecked {
				#line 63 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/Intersect.hx"
				object cds = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (((object) (__fn_float1) )) : (((object) (__fn_dyn1) )) );
				return ((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (global::haxe.lang.Runtime.callField(cds, "map", 5442204, new global::Array<object>(new object[]{( (( global::verb.geom.Intersect_surfacesAsync_64__Fun.__hx_current != default(global::verb.geom.Intersect_surfacesAsync_64__Fun) )) ? (global::verb.geom.Intersect_surfacesAsync_64__Fun.__hx_current) : (global::verb.geom.Intersect_surfacesAsync_64__Fun.__hx_current = ((global::verb.geom.Intersect_surfacesAsync_64__Fun) (new global::verb.geom.Intersect_surfacesAsync_64__Fun()) )) )}))) ))) );
			}
			#line default
		}
		
		
	}
}


