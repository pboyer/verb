verb.intersect.curveSurface = function( curve, surface, options, callback ){

	options = options || { tolerance: verb.TOLERANCE, sampleTolerance: verb.TOLERANCE, uDivs: 20, vDivs: 20 };

	return verb.nurbsEngine.eval( 'intersect_rational_curve_surface_by_aabb_refine', 
																[ surface.get('degreeU'), 
																	surface.get('knotsU'), 
																	surface.get('degreeV'), 
																	surface.get('knotsV'), 
																	surface.homogenize(), 
																	curve.get('degree'), 
																	curve.get('knots'), 
																	curve.homogenize(), 
																	options.sampleTolerance, 
																	options.tolerance, 
																	options.uDivs,
																	options.vDivs ], callback );
};