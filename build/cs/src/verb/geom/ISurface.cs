
#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.geom{
	public  interface ISurface : global::haxe.lang.IHxObject {
		   global::verb.core.types.NurbsSurfaceData asNurbs();
		
		   global::verb.core.types.Interval<double> domainU();
		
		   global::verb.core.types.Interval<double> domainV();
		
		   global::Array<double> point(double u, double v);
		
		   global::Array<object> derivatives(double u, double v, global::haxe.lang.Null<int> numDerivs);
		
	}
}


