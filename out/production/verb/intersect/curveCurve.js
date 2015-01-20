verb.intersectCurves = function( curve1, curve2, callback ){

	return verb.nurbsEngine.eval( 'intersect_rational_curves_by_aabb_refine', 
							[ 	curve1.get('degree'), curve1.get('knots'), curve1.homogenize(), 
							curve2.get('degree'), curve2.get('knots'), 
							curve2.homogenize(), verb.TOLERANCE, verb.TOLERANCE ], callback );
}