



public static function triangulate_adaptive_refinement_node_tree( arrTree ){

	// triangulate all of the nodes of the tree
	var mesh = verb.TriMesh.empty();
	arrTree.forEach(function(x){  x.triangulate( mesh ); });
	return mesh;

}

public static function tessellate_rational_surface_adaptive( degree_u, knots_u, degree_v, knots_v, homo_control_points, options ) {

	// adaptive divide
	var arrTrees = divide_rational_surface_adaptive( degree_u, knots_u, degree_v, knots_v, homo_control_points, options );

	// triangulation
	return public static function triangulate_adaptive_refinement_node_tree( arrTrees );
}
