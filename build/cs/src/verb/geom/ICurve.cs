
#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.geom{
	public  interface ICurve : global::haxe.lang.IHxObject {
		   global::verb.core.types.NurbsCurveData asNurbs();
		
		   global::verb.core.types.Interval<double> domain();
		
		   global::Array<double> point(double u);
		
		   global::Array<object> derivatives(double u, global::haxe.lang.Null<int> numDerivs);
		
	}
}


