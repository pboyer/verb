package verb;

// topology
import verb.topo.Analyze;
import verb.topo.Make;
import verb.topo.Slice;


import verb.topo.Solid;
import verb.topo.Face;
import verb.topo.Vertex;
import verb.topo.Loop;
import verb.topo.HalfEdge;

// intersection
import verb.core.ExpIntersect;
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

class Verb {
	public static function main():Void {
		trace("verb 0.2.0");
	}
}