package verb;

// intersection
import verb.geom.Intersect;

// curves
import verb.geom.NurbsCurve;
import verb.geom.Arc;
import verb.geom.Line;
import verb.geom.BezierCurve;
import verb.geom.Circle;
import verb.geom.Ellipse;
import verb.geom.EllipseArc;

// surfaces
import verb.geom.NurbsSurface;
import verb.geom.SphericalSurface;
import verb.geom.RevolvedSurface;
import verb.geom.ExtrudedSurface;
import verb.geom.CylindricalSurface;
import verb.geom.ConicalSurface;
import verb.geom.SweptSurface;

// core
import verb.core.types.BoundingBox;
import verb.core.Constants;
import verb.core.Trig;
import verb.core.Numeric;
import verb.core.ArrayExtensions;
import verb.core.Eval;
import verb.core.Mesh;
import verb.core.KdTree;
import verb.core.Intersect;
import verb.core.Tess;
import verb.core.Make;
import verb.core.Modify;
import verb.core.Analyze;
import verb.core.Divide;
import verb.core.Check;

class Init {
	public static function main():Void {
		trace("verb 0.2.0");
	}
}