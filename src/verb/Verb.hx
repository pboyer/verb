package verb;

// geom

import verb.geom.NurbsCurve;
import verb.geom.Arc;
import verb.geom.Line;
import verb.geom.BezierCurve;
import verb.geom.Circle;
import verb.geom.Ellipse;
import verb.geom.EllipseArc;
import verb.geom.NurbsSurface;
import verb.geom.SphericalSurface;
import verb.geom.RevolvedSurface;
import verb.geom.ExtrudedSurface;
import verb.geom.CylindricalSurface;
import verb.geom.ConicalSurface;
import verb.geom.SweptSurface;
import verb.geom.Intersect;

// core

import verb.core.Serialization;
import verb.core.BoundingBox;
import verb.core.Constants;
import verb.core.Trig;
import verb.core.Minimizer;
import verb.core.ArrayExtensions;
import verb.core.Mesh;
import verb.core.KdTree;

// eval

import verb.eval.Eval;
import verb.eval.Intersect;
import verb.eval.Tess;
import verb.eval.Make;
import verb.eval.Modify;
import verb.eval.Analyze;
import verb.eval.Divide;
import verb.eval.Check;

class Verb {
	public static function main():Void {
		trace("verb 2.1.0");
	}
}