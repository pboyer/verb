
#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core{
	public  class Mesh : global::haxe.lang.HxObject {
		public    Mesh(global::haxe.lang.EmptyObject empty){
			unchecked {
				#line 12 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mesh.hx"
				{
				}
				
			}
			#line default
		}
		
		
		public    Mesh(){
			unchecked {
				#line 12 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mesh.hx"
				global::verb.core.Mesh.__hx_ctor_verb_core_Mesh(this);
			}
			#line default
		}
		
		
		public static   void __hx_ctor_verb_core_Mesh(global::verb.core.Mesh __temp_me62){
			unchecked {
				#line 12 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mesh.hx"
				{
				}
				
			}
			#line default
		}
		
		
		public static   global::Array<double> getTriangleNorm(global::Array<object> points, global::Array<int> tri){
			unchecked {
				#line 27 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mesh.hx"
				global::Array<double> v0 = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (points[tri[0]]) ))) );
				global::Array<double> v1 = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (points[tri[1]]) ))) );
				global::Array<double> v2 = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (points[tri[2]]) ))) );
				global::Array<double> u = global::verb.core.Vec.sub(v1, v0);
				global::Array<double> v = global::verb.core.Vec.sub(v2, v0);
				global::Array<double> n = global::verb.core.Vec.cross(u, v);
				#line 34 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mesh.hx"
				return global::verb.core.Vec.mul(( 1 / global::verb.core.Vec.norm(n) ), n);
			}
			#line default
		}
		
		
		public static   global::verb.core.types.BoundingBox makeMeshAabb(global::verb.core.types.MeshData mesh, global::Array<int> faceIndices){
			unchecked {
				#line 51 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mesh.hx"
				global::verb.core.types.BoundingBox bb = new global::verb.core.types.BoundingBox(((global::Array<object>) (default(global::Array<object>)) ));
				#line 53 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mesh.hx"
				{
					#line 53 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mesh.hx"
					int _g = 0;
					#line 53 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mesh.hx"
					while (( _g < faceIndices.length )){
						#line 53 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mesh.hx"
						int x = faceIndices[_g];
						#line 53 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mesh.hx"
						 ++ _g;
						bb.@add(((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (mesh.points[((global::Array<int>) (global::Array<object>.__hx_cast<int>(((global::Array) (mesh.faces[x]) ))) )[0]]) ))) ));
						bb.@add(((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (mesh.points[((global::Array<int>) (global::Array<object>.__hx_cast<int>(((global::Array) (mesh.faces[x]) ))) )[1]]) ))) ));
						bb.@add(((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (mesh.points[((global::Array<int>) (global::Array<object>.__hx_cast<int>(((global::Array) (mesh.faces[x]) ))) )[2]]) ))) ));
					}
					
				}
				
				#line 59 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mesh.hx"
				return bb;
			}
			#line default
		}
		
		
		public static   global::verb.core.types.BoundingBoxNode makeMeshAabbTree(global::verb.core.types.MeshData mesh, global::Array<int> faceIndices){
			unchecked {
				#line 76 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mesh.hx"
				global::verb.core.types.BoundingBox aabb = global::verb.core.Mesh.makeMeshAabb(mesh, faceIndices);
				#line 78 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mesh.hx"
				if (( faceIndices.length == 1 )) {
					#line 79 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mesh.hx"
					return new global::verb.core.types.BoundingBoxLeaf<int>(((global::verb.core.types.BoundingBox) (aabb) ), ((int) (faceIndices[0]) ));
				}
				
				#line 82 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mesh.hx"
				global::Array<int> sortedIndices = global::verb.core.Mesh.sortTrianglesOnLongestAxis(aabb, mesh, faceIndices);
				global::Array<int> leftIndices = global::verb.core.ArrayExtensions.left<int>(sortedIndices);
				global::Array<int> rightIndices = global::verb.core.ArrayExtensions.right<int>(sortedIndices);
				#line 86 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mesh.hx"
				return new global::verb.core.types.BoundingBoxInnerNode(((global::verb.core.types.BoundingBox) (aabb) ), ((global::Array<object>) (new global::Array<object>(new object[]{global::verb.core.Mesh.makeMeshAabbTree(mesh, leftIndices), global::verb.core.Mesh.makeMeshAabbTree(mesh, rightIndices)})) ));
			}
			#line default
		}
		
		
		public static   global::Array<int> sortTrianglesOnLongestAxis(global::verb.core.types.BoundingBox bb, global::verb.core.types.MeshData mesh, global::Array<int> faceIndices){
			unchecked {
				#line 103 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mesh.hx"
				int longAxis = bb.getLongestAxis();
				#line 105 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mesh.hx"
				global::Array<object> minCoordFaceMap = new global::Array<object>();
				{
					#line 106 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mesh.hx"
					int _g = 0;
					#line 106 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mesh.hx"
					while (( _g < faceIndices.length )){
						#line 106 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mesh.hx"
						int faceIndex = faceIndices[_g];
						#line 106 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mesh.hx"
						 ++ _g;
						double tri_min = global::verb.core.Mesh.getMinCoordOnAxis(mesh.points, ((global::Array<int>) (global::Array<object>.__hx_cast<int>(((global::Array) (mesh.faces[faceIndex]) ))) ), longAxis);
						minCoordFaceMap.push(new global::verb.core.types.Pair<double, int>(((double) (tri_min) ), ((int) (faceIndex) )));
					}
					
				}
				
				#line 111 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mesh.hx"
				minCoordFaceMap.sort(( (( global::verb.core.Mesh_sortTrianglesOnLongestAxis_111__Fun.__hx_current != default(global::verb.core.Mesh_sortTrianglesOnLongestAxis_111__Fun) )) ? (global::verb.core.Mesh_sortTrianglesOnLongestAxis_111__Fun.__hx_current) : (global::verb.core.Mesh_sortTrianglesOnLongestAxis_111__Fun.__hx_current = ((global::verb.core.Mesh_sortTrianglesOnLongestAxis_111__Fun) (new global::verb.core.Mesh_sortTrianglesOnLongestAxis_111__Fun()) )) ));
				#line 118 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mesh.hx"
				global::Array<int> sortedFaceIndices = new global::Array<int>();
				{
					#line 119 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mesh.hx"
					int _g1 = 0;
					#line 119 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mesh.hx"
					int _g2 = minCoordFaceMap.length;
					#line 119 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mesh.hx"
					while (( _g1 < _g2 )){
						#line 119 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mesh.hx"
						int i = _g1++;
						sortedFaceIndices.push(((global::verb.core.types.Pair<double, int>) (global::verb.core.types.Pair<object, object>.__hx_cast<double, int>(((global::verb.core.types.Pair) (minCoordFaceMap[i]) ))) ).item1);
					}
					
				}
				
				#line 123 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mesh.hx"
				return sortedFaceIndices;
			}
			#line default
		}
		
		
		public static   double getMinCoordOnAxis(global::Array<object> points, global::Array<int> tri, int axis){
			unchecked {
				#line 140 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mesh.hx"
				double min = global::Math.POSITIVE_INFINITY;
				#line 142 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mesh.hx"
				{
					#line 142 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mesh.hx"
					int _g = 0;
					#line 142 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mesh.hx"
					while (( _g < 3 )){
						#line 142 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mesh.hx"
						int i = _g++;
						double coord = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (points[tri[i]]) ))) )[axis];
						if (( coord < min )) {
							#line 144 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mesh.hx"
							min = coord;
						}
						
					}
					
				}
				
				#line 147 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mesh.hx"
				return min;
			}
			#line default
		}
		
		
		public static   global::Array<double> getTriangleCentroid(global::Array<object> points, global::Array<int> tri){
			unchecked {
				#line 163 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mesh.hx"
				global::Array<double> centroid = new global::Array<double>(new double[]{0.0, 0.0, 0.0});
				#line 165 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mesh.hx"
				{
					#line 165 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mesh.hx"
					int _g = 0;
					#line 165 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mesh.hx"
					while (( _g < 3 )){
						#line 165 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mesh.hx"
						int i = _g++;
						{
							#line 166 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mesh.hx"
							int _g1 = 0;
							#line 166 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mesh.hx"
							while (( _g1 < 3 )){
								#line 166 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mesh.hx"
								int j = _g1++;
								centroid[j] += ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (points[tri[i]]) ))) )[j];
							}
							
						}
						
					}
					
				}
				
				#line 171 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mesh.hx"
				{
					#line 171 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mesh.hx"
					int _g2 = 0;
					#line 171 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mesh.hx"
					while (( _g2 < 3 )){
						#line 171 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mesh.hx"
						int i1 = _g2++;
						centroid[i1] /= ((double) (3) );
					}
					
				}
				
				#line 175 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mesh.hx"
				return centroid;
			}
			#line default
		}
		
		
		public static   global::Array<double> triangleUVFromPoint(global::verb.core.types.MeshData mesh, int faceIndex, global::Array<double> f){
			unchecked {
				#line 181 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mesh.hx"
				global::Array<int> tri = ((global::Array<int>) (global::Array<object>.__hx_cast<int>(((global::Array) (mesh.faces[faceIndex]) ))) );
				#line 183 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mesh.hx"
				global::Array<double> p1 = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (mesh.points[tri[0]]) ))) );
				global::Array<double> p2 = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (mesh.points[tri[1]]) ))) );
				global::Array<double> p3 = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (mesh.points[tri[2]]) ))) );
				#line 187 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mesh.hx"
				global::Array<double> uv1 = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (mesh.uvs[tri[0]]) ))) );
				global::Array<double> uv2 = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (mesh.uvs[tri[1]]) ))) );
				global::Array<double> uv3 = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (mesh.uvs[tri[2]]) ))) );
				#line 191 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mesh.hx"
				global::Array<double> f1 = global::verb.core.Vec.sub(p1, f);
				global::Array<double> f2 = global::verb.core.Vec.sub(p2, f);
				global::Array<double> f3 = global::verb.core.Vec.sub(p3, f);
				#line 196 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mesh.hx"
				double a = global::verb.core.Vec.norm(global::verb.core.Vec.cross(global::verb.core.Vec.sub(p1, p2), global::verb.core.Vec.sub(p1, p3)));
				double a1 = ( global::verb.core.Vec.norm(global::verb.core.Vec.cross(f2, f3)) / a );
				double a2 = ( global::verb.core.Vec.norm(global::verb.core.Vec.cross(f3, f1)) / a );
				double a3 = ( global::verb.core.Vec.norm(global::verb.core.Vec.cross(f1, f2)) / a );
				#line 202 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mesh.hx"
				return global::verb.core.Vec.@add(global::verb.core.Vec.mul(a1, uv1), global::verb.core.Vec.@add(global::verb.core.Vec.mul(a2, uv2), global::verb.core.Vec.mul(a3, uv3)));
			}
			#line default
		}
		
		
		public static  new object __hx_createEmpty(){
			unchecked {
				#line 12 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mesh.hx"
				return new global::verb.core.Mesh(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) ));
			}
			#line default
		}
		
		
		public static  new object __hx_create(global::Array arr){
			unchecked {
				#line 12 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mesh.hx"
				return new global::verb.core.Mesh();
			}
			#line default
		}
		
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core{
	public  class Mesh_sortTrianglesOnLongestAxis_111__Fun : global::haxe.lang.Function {
		public    Mesh_sortTrianglesOnLongestAxis_111__Fun() : base(2, 1){
			unchecked {
			}
			#line default
		}
		
		
		public static  global::verb.core.Mesh_sortTrianglesOnLongestAxis_111__Fun __hx_current;
		
		public override   double __hx_invoke2_f(double __fn_float1, object __fn_dyn1, double __fn_float2, object __fn_dyn2){
			unchecked {
				#line 111 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mesh.hx"
				global::verb.core.types.Pair<double, int> b = ( (global::haxe.lang.Runtime.eq(__fn_dyn2, global::haxe.lang.Runtime.undefined)) ? (((global::verb.core.types.Pair<double, int>) (global::verb.core.types.Pair<object, object>.__hx_cast<double, int>(((global::verb.core.types.Pair) (((object) (__fn_float2) )) ))) )) : (((global::verb.core.types.Pair<double, int>) (global::verb.core.types.Pair<object, object>.__hx_cast<double, int>(((global::verb.core.types.Pair) (__fn_dyn2) ))) )) );
				#line 111 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mesh.hx"
				global::verb.core.types.Pair<double, int> a = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (((global::verb.core.types.Pair<double, int>) (global::verb.core.types.Pair<object, object>.__hx_cast<double, int>(((global::verb.core.types.Pair) (((object) (__fn_float1) )) ))) )) : (((global::verb.core.types.Pair<double, int>) (global::verb.core.types.Pair<object, object>.__hx_cast<double, int>(((global::verb.core.types.Pair) (__fn_dyn1) ))) )) );
				double a0 = a.item0;
				double b0 = b.item0;
				#line 115 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mesh.hx"
				if (( a0 == b0 )) {
					#line 115 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mesh.hx"
					return ((double) (0) );
				}
				 else {
					#line 115 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mesh.hx"
					if (( a0 > b0 )) {
						#line 115 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mesh.hx"
						return ((double) (1) );
					}
					 else {
						#line 115 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Mesh.hx"
						return ((double) (-1) );
					}
					
				}
				
			}
			#line default
		}
		
		
	}
}


