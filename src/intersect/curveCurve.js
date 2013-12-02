


verb.intersect.curveCurve = function( curve1, curve2, callback ){

	if (curve1 instanceof verb.geom.NurbsCurve && curve2 instanceof verb.geom.NurbsCurve ){

		return verb.nurbsEngine.eval( 'intersect_rational_curves_by_aabb', 
							[ 	curve1.get('degree'), curve1.get('knots'), curve1.homogenize(), curve2.get('degree'), curve2.get('knots'), curve2.homogenize(), verb.TOLERANCE ], callback );


	}

}