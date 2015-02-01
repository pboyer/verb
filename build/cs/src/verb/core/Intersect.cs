
#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core{
	public  class Intersect : global::haxe.lang.HxObject {
		public    Intersect(global::haxe.lang.EmptyObject empty){
			unchecked {
				#line 31 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				{
				}
				
			}
			#line default
		}
		
		
		public    Intersect(){
			unchecked {
				#line 31 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::verb.core.Intersect.__hx_ctor_verb_core_Intersect(this);
			}
			#line default
		}
		
		
		public static   void __hx_ctor_verb_core_Intersect(global::verb.core.Intersect __temp_me50){
			unchecked {
				#line 31 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				{
				}
				
			}
			#line default
		}
		
		
		public static   global::Array<object> meshSlices(global::verb.core.types.MeshData mesh, double min, double max, double step){
			unchecked {
				#line 43 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::verb.core.types.MeshBoundingBoxTree bbtree = new global::verb.core.types.MeshBoundingBoxTree(((global::verb.core.types.MeshData) (mesh) ), ((global::Array<int>) (default(global::Array<int>)) ));
				global::verb.core.types.BoundingBox bb = bbtree.boundingBox();
				#line 46 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				double x0 = bb.min[0];
				double y0 = bb.min[1];
				#line 49 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				double x1 = bb.max[0];
				double y1 = bb.max[1];
				#line 52 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::Array<double> span = global::verb.core.Vec.span(min, max, step);
				global::Array<object> slices = new global::Array<object>(new object[]{});
				#line 55 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				{
					#line 55 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
					int _g = 0;
					#line 55 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
					while (( _g < span.length )){
						#line 55 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
						double z = span[_g];
						#line 55 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
						 ++ _g;
						global::Array<object> pts = new global::Array<object>(new object[]{new global::Array<double>(new double[]{x0, y0, z}), new global::Array<double>(new double[]{x1, y0, z}), new global::Array<double>(new double[]{x1, y1, z}), new global::Array<double>(new double[]{x0, y1, z})});
						global::Array<object> uvs = new global::Array<object>(new object[]{new global::Array<double>(new double[]{0.0, 0.0}), new global::Array<double>(new double[]{1.0, 0.0}), new global::Array<double>(new double[]{1.0, 1.0}), new global::Array<double>(new double[]{0.0, 1.0})});
						global::Array<object> faces = new global::Array<object>(new object[]{new global::Array<int>(new int[]{0, 1, 2}), new global::Array<int>(new int[]{0, 2, 3})});
						global::verb.core.types.MeshData plane = new global::verb.core.types.MeshData(((global::Array<object>) (faces) ), ((global::Array<object>) (pts) ), ((global::Array<object>) (default(global::Array<object>)) ), ((global::Array<object>) (uvs) ));
						#line 61 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
						slices.push(global::verb.core.Intersect.meshes(mesh, plane, bbtree, default(global::verb.core.types.IBoundingBoxTree<int>)));
						z += 1.0;
					}
					
				}
				
				#line 65 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				return slices;
			}
			#line default
		}
		
		
		public static   global::Array<object> surfaces(global::verb.core.types.NurbsSurfaceData surface0, global::verb.core.types.NurbsSurfaceData surface1, double tol){
			unchecked {
				#line 78 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::Array<double> tol1 = new global::Array<double>(new double[]{tol});
				#line 78 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::Array<object> surface11 = new global::Array<object>(new object[]{surface1});
				#line 78 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::Array<object> surface01 = new global::Array<object>(new object[]{surface0});
				#line 81 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::verb.core.types.MeshData tess1 = global::verb.core.Tess.rationalSurfaceAdaptive(((global::verb.core.types.NurbsSurfaceData) (surface01[0]) ), default(global::verb.core.types.AdaptiveRefinementOptions));
				global::verb.core.types.MeshData tess2 = global::verb.core.Tess.rationalSurfaceAdaptive(((global::verb.core.types.NurbsSurfaceData) (surface11[0]) ), default(global::verb.core.types.AdaptiveRefinementOptions));
				#line 84 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::Array<object> resApprox = global::verb.core.Intersect.meshes(tess1, tess2, default(global::verb.core.types.IBoundingBoxTree<int>), default(global::verb.core.types.IBoundingBoxTree<int>));
				#line 87 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::Array<object> exactPls = resApprox.map<object>(new global::verb.core.Intersect_surfaces_87__Fun(((global::Array<object>) (surface01) ), ((global::Array<object>) (surface11) ), ((global::Array<double>) (tol1) )));
				#line 94 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				return exactPls.map<object>(( (( global::verb.core.Intersect_surfaces_94__Fun.__hx_current != default(global::verb.core.Intersect_surfaces_94__Fun) )) ? (global::verb.core.Intersect_surfaces_94__Fun.__hx_current) : (global::verb.core.Intersect_surfaces_94__Fun.__hx_current = ((global::verb.core.Intersect_surfaces_94__Fun) (new global::verb.core.Intersect_surfaces_94__Fun()) )) ));
			}
			#line default
		}
		
		
		public static   global::verb.core.types.SurfaceSurfaceIntersectionPoint surfacesAtPointWithEstimate(global::verb.core.types.NurbsSurfaceData surface0, global::verb.core.types.NurbsSurfaceData surface1, global::Array<double> uv1, global::Array<double> uv2, double tol){
			unchecked {
				#line 118 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::Array<object> pds = default(global::Array<object>);
				#line 118 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::Array<double> p = default(global::Array<double>);
				#line 118 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::Array<double> pn = default(global::Array<double>);
				#line 118 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::Array<double> pu = default(global::Array<double>);
				#line 118 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::Array<double> pv = default(global::Array<double>);
				#line 118 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				double pd = default(double);
				#line 118 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::Array<object> qds = default(global::Array<object>);
				#line 118 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::Array<double> q = default(global::Array<double>);
				#line 118 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::Array<double> qn = default(global::Array<double>);
				#line 118 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::Array<double> qu = default(global::Array<double>);
				#line 118 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::Array<double> qv = default(global::Array<double>);
				#line 118 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				double qd = default(double);
				#line 118 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				double dist = default(double);
				int maxits = 5;
				int its = 0;
				#line 122 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				do {
					#line 124 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
					pds = global::verb.core.Eval.rationalSurfaceDerivatives(surface0, uv1[0], uv1[1], new global::haxe.lang.Null<int>(1, true));
					p = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (pds[0]) ))) )[0]) ))) );
					pu = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (pds[1]) ))) )[0]) ))) );
					pv = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (pds[0]) ))) )[1]) ))) );
					pn = global::verb.core.Vec.normalized(global::verb.core.Vec.cross(pu, pv));
					pd = global::verb.core.Vec.dot(pn, p);
					#line 131 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
					qds = global::verb.core.Eval.rationalSurfaceDerivatives(surface1, uv2[0], uv2[1], new global::haxe.lang.Null<int>(1, true));
					q = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (qds[0]) ))) )[0]) ))) );
					qu = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (qds[1]) ))) )[0]) ))) );
					qv = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (qds[0]) ))) )[1]) ))) );
					qn = global::verb.core.Vec.normalized(global::verb.core.Vec.cross(qu, qv));
					qd = global::verb.core.Vec.dot(qn, q);
					#line 139 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
					dist = global::verb.core.Vec.norm(global::verb.core.Vec.sub(p, q));
					#line 141 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
					if (( dist < tol )) {
						#line 142 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
						break;
					}
					
					#line 146 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
					global::Array<double> fn = global::verb.core.Vec.normalized(global::verb.core.Vec.cross(pn, qn));
					double fd = global::verb.core.Vec.dot(fn, p);
					#line 150 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
					global::Array<double> x = global::verb.core.Intersect.threePlanes(pn, pd, qn, qd, fn, fd);
					#line 152 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
					if (( x == default(global::Array<double>) )) {
						#line 152 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
						throw global::haxe.lang.HaxeException.wrap("panic!");
					}
					
					#line 157 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
					global::Array<double> pdif = global::verb.core.Vec.sub(x, p);
					global::Array<double> qdif = global::verb.core.Vec.sub(x, q);
					#line 160 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
					global::Array<double> rw = global::verb.core.Vec.cross(pu, pn);
					global::Array<double> rt = global::verb.core.Vec.cross(pv, pn);
					#line 163 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
					global::Array<double> su = global::verb.core.Vec.cross(qu, qn);
					global::Array<double> sv = global::verb.core.Vec.cross(qv, qn);
					#line 166 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
					double dw = ( global::verb.core.Vec.dot(rt, pdif) / global::verb.core.Vec.dot(rt, pu) );
					double dt = ( global::verb.core.Vec.dot(rw, pdif) / global::verb.core.Vec.dot(rw, pv) );
					#line 169 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
					double du = ( global::verb.core.Vec.dot(sv, qdif) / global::verb.core.Vec.dot(sv, qu) );
					double dv = ( global::verb.core.Vec.dot(su, qdif) / global::verb.core.Vec.dot(su, qv) );
					#line 172 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
					uv1 = global::verb.core.Vec.@add(new global::Array<double>(new double[]{dw, dt}), uv1);
					uv2 = global::verb.core.Vec.@add(new global::Array<double>(new double[]{du, dv}), uv2);
					#line 176 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
					its++;
				}
				while (( its < maxits ));
				#line 180 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				return new global::verb.core.types.SurfaceSurfaceIntersectionPoint(((global::Array<double>) (uv1) ), ((global::Array<double>) (uv2) ), ((global::Array<double>) (p) ), ((double) (dist) ));
			}
			#line default
		}
		
		
		public static   global::Array<object> meshes(global::verb.core.types.MeshData mesh0, global::verb.core.types.MeshData mesh1, global::verb.core.types.IBoundingBoxTree<int> bbtree0, global::verb.core.types.IBoundingBoxTree<int> bbtree1){
			unchecked {
				#line 194 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::Array<object> mesh11 = new global::Array<object>(new object[]{mesh1});
				#line 194 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::Array<object> mesh01 = new global::Array<object>(new object[]{mesh0});
				#line 199 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				if (( bbtree0 == default(global::verb.core.types.IBoundingBoxTree<int>) )) {
					#line 199 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
					bbtree0 = new global::verb.core.types.LazyMeshBoundingBoxTree(((global::verb.core.types.MeshData) (mesh01[0]) ), ((global::Array<int>) (default(global::Array<int>)) ));
				}
				
				#line 200 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				if (( bbtree1 == default(global::verb.core.types.IBoundingBoxTree<int>) )) {
					#line 200 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
					bbtree1 = new global::verb.core.types.LazyMeshBoundingBoxTree(((global::verb.core.types.MeshData) (mesh11[0]) ), ((global::Array<int>) (default(global::Array<int>)) ));
				}
				
				#line 203 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::Array<object> bbints = global::verb.core.Intersect.bounding_box_trees<int, int>(bbtree0, bbtree1, new global::haxe.lang.Null<double>(((double) (0) ), true));
				#line 206 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::Array<object> segments0 = bbints.map<object>(new global::verb.core.Intersect_meshes_206__Fun(((global::Array<object>) (mesh11) ), ((global::Array<object>) (mesh01) )));
				#line 212 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::Array<object> segments1 = segments0.filter(( (( global::verb.core.Intersect_meshes_212__Fun.__hx_current != default(global::verb.core.Intersect_meshes_212__Fun) )) ? (global::verb.core.Intersect_meshes_212__Fun.__hx_current) : (global::verb.core.Intersect_meshes_212__Fun.__hx_current = ((global::verb.core.Intersect_meshes_212__Fun) (new global::verb.core.Intersect_meshes_212__Fun()) )) ));
				#line 218 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::Array<object> segments = global::verb.core.ArrayExtensions.unique<object>(segments1.filter(( (( global::verb.core.Intersect_meshes_218__Fun.__hx_current != default(global::verb.core.Intersect_meshes_218__Fun) )) ? (global::verb.core.Intersect_meshes_218__Fun.__hx_current) : (global::verb.core.Intersect_meshes_218__Fun.__hx_current = ((global::verb.core.Intersect_meshes_218__Fun) (new global::verb.core.Intersect_meshes_218__Fun()) )) )), ( (( global::verb.core.Intersect_meshes_220__Fun.__hx_current != default(global::verb.core.Intersect_meshes_220__Fun) )) ? (global::verb.core.Intersect_meshes_220__Fun.__hx_current) : (global::verb.core.Intersect_meshes_220__Fun.__hx_current = ((global::verb.core.Intersect_meshes_220__Fun) (new global::verb.core.Intersect_meshes_220__Fun()) )) ));
				#line 244 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				return global::verb.core.Intersect.makeMeshIntersectionPolylines(segments);
			}
			#line default
		}
		
		
		public static   global::Array<object> makeMeshIntersectionPolylines(global::Array<object> segments){
			unchecked {
				#line 257 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				if (( segments.length == 0 )) {
					#line 257 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
					return new global::Array<object>(new object[]{});
				}
				
				#line 260 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				{
					#line 260 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
					int _g = 0;
					#line 260 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
					while (( _g < segments.length )){
						#line 260 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
						global::verb.core.types.Interval<object> s = ((global::verb.core.types.Interval<object>) (global::verb.core.types.Interval<object>.__hx_cast<object>(((global::verb.core.types.Interval) (segments[_g]) ))) );
						#line 260 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
						 ++ _g;
						((global::verb.core.types.MeshIntersectionPoint) (s.max) ).opp = ((global::verb.core.types.MeshIntersectionPoint) (s.min) );
						((global::verb.core.types.MeshIntersectionPoint) (s.min) ).opp = ((global::verb.core.types.MeshIntersectionPoint) (s.max) );
					}
					
				}
				
				#line 266 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::verb.core.KdTree<object> tree = global::verb.core.Intersect.kdTreeFromSegments(segments);
				#line 269 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::Array<object> ends = new global::Array<object>(new object[]{});
				#line 271 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				{
					#line 271 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
					int _g1 = 0;
					#line 271 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
					while (( _g1 < segments.length )){
						#line 271 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
						global::verb.core.types.Interval<object> seg = ((global::verb.core.types.Interval<object>) (global::verb.core.types.Interval<object>.__hx_cast<object>(((global::verb.core.types.Interval) (segments[_g1]) ))) );
						#line 271 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
						 ++ _g1;
						ends.push(((global::verb.core.types.MeshIntersectionPoint) (seg.min) ));
						ends.push(((global::verb.core.types.MeshIntersectionPoint) (seg.max) ));
					}
					
				}
				
				#line 277 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				{
					#line 277 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
					int _g2 = 0;
					#line 277 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
					while (( _g2 < ends.length )){
						#line 277 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
						global::verb.core.types.MeshIntersectionPoint segEnd = ((global::verb.core.types.MeshIntersectionPoint) (ends[_g2]) );
						#line 277 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
						 ++ _g2;
						if (( segEnd.adj != default(global::verb.core.types.MeshIntersectionPoint) )) {
							#line 278 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
							continue;
						}
						
						#line 280 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
						global::verb.core.types.MeshIntersectionPoint adjEnd = global::verb.core.Intersect.lookupAdjacentSegment(segEnd, tree, 3);
						#line 282 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
						if (( ( adjEnd != default(global::verb.core.types.MeshIntersectionPoint) ) && ( adjEnd.adj == default(global::verb.core.types.MeshIntersectionPoint) ) )) {
							#line 283 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
							segEnd.adj = adjEnd;
							adjEnd.adj = segEnd;
						}
						
					}
					
				}
				
				#line 289 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::Array<object> freeEnds = ends.filter(( (( global::verb.core.Intersect_makeMeshIntersectionPolylines_289__Fun.__hx_current != default(global::verb.core.Intersect_makeMeshIntersectionPolylines_289__Fun) )) ? (global::verb.core.Intersect_makeMeshIntersectionPolylines_289__Fun.__hx_current) : (global::verb.core.Intersect_makeMeshIntersectionPolylines_289__Fun.__hx_current = ((global::verb.core.Intersect_makeMeshIntersectionPolylines_289__Fun) (new global::verb.core.Intersect_makeMeshIntersectionPolylines_289__Fun()) )) ));
				#line 294 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				if (( freeEnds.length == 0 )) {
					#line 295 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
					freeEnds = ends;
				}
				
				#line 300 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::Array<object> pls = new global::Array<object>(new object[]{});
				int numVisitedEnds = 0;
				bool loopDetected = false;
				#line 304 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				while (( freeEnds.length != 0 )){
					#line 306 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
					global::verb.core.types.MeshIntersectionPoint end = ((global::verb.core.types.MeshIntersectionPoint) (freeEnds.pop().@value) );
					#line 308 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
					if ( ! (end.visited) ) {
						#line 311 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
						global::Array<object> pl = new global::Array<object>(new object[]{});
						global::verb.core.types.MeshIntersectionPoint curEnd = end;
						#line 314 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
						while (( curEnd != default(global::verb.core.types.MeshIntersectionPoint) )){
							#line 317 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
							if (curEnd.visited) {
								#line 319 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
								break;
							}
							
							#line 323 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
							curEnd.visited = true;
							curEnd.opp.visited = true;
							#line 326 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
							pl.push(curEnd);
							numVisitedEnds += 2;
							#line 329 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
							curEnd = curEnd.opp.adj;
							#line 332 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
							if (( curEnd == end )) {
								#line 334 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
								break;
							}
							
						}
						
						#line 338 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
						if (( pl.length > 0 )) {
							#line 339 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
							pl.push(((global::verb.core.types.MeshIntersectionPoint) (pl[( pl.length - 1 )]) ).opp);
							pls.push(pl);
						}
						
					}
					 else {
						#line 342 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
						{
						}
						
					}
					
					#line 346 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
					if (( ( ( freeEnds.length == 0 ) && ( ends.length > 0 ) ) && (( loopDetected || ( numVisitedEnds < ends.length ) )) )) {
						#line 347 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
						loopDetected = true;
						global::verb.core.types.MeshIntersectionPoint e = ((global::verb.core.types.MeshIntersectionPoint) (ends.pop().@value) );
						freeEnds.push(e);
					}
					
				}
				
				#line 353 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				return pls;
			}
			#line default
		}
		
		
		public static   global::verb.core.KdTree<object> kdTreeFromSegments(global::Array<object> segments){
			unchecked {
				#line 366 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::Array<object> treePoints = new global::Array<object>(new object[]{});
				#line 369 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				{
					#line 369 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
					int _g = 0;
					#line 369 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
					while (( _g < segments.length )){
						#line 369 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
						global::verb.core.types.Interval<object> seg = ((global::verb.core.types.Interval<object>) (global::verb.core.types.Interval<object>.__hx_cast<object>(((global::verb.core.types.Interval) (segments[_g]) ))) );
						#line 369 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
						 ++ _g;
						treePoints.push(new global::verb.core.KdPoint<object>(((global::Array<double>) (((global::verb.core.types.MeshIntersectionPoint) (seg.min) ).point) ), ((global::verb.core.types.MeshIntersectionPoint) (seg.min) )));
						treePoints.push(new global::verb.core.KdPoint<object>(((global::Array<double>) (((global::verb.core.types.MeshIntersectionPoint) (seg.max) ).point) ), ((global::verb.core.types.MeshIntersectionPoint) (seg.max) )));
					}
					
				}
				
				#line 375 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				return new global::verb.core.KdTree<object>(((global::Array<object>) (treePoints) ), ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (typeof(global::verb.core.Vec)) ), ((string) ("distSquared") ), ((int) (718971489) ))) ));
			}
			#line default
		}
		
		
		public static   global::verb.core.types.MeshIntersectionPoint lookupAdjacentSegment(global::verb.core.types.MeshIntersectionPoint segEnd, global::verb.core.KdTree<object> tree, int numResults){
			unchecked {
				#line 386 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::Array<object> segEnd1 = new global::Array<object>(new object[]{segEnd});
				#line 390 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::Array<object> adj = tree.nearest(((global::verb.core.types.MeshIntersectionPoint) (segEnd1[0]) ).point, numResults, 1e-10).filter(new global::verb.core.Intersect_lookupAdjacentSegment_391__Fun(((global::Array<object>) (segEnd1) ))).map<object>(( (( global::verb.core.Intersect_lookupAdjacentSegment_394__Fun.__hx_current != default(global::verb.core.Intersect_lookupAdjacentSegment_394__Fun) )) ? (global::verb.core.Intersect_lookupAdjacentSegment_394__Fun.__hx_current) : (global::verb.core.Intersect_lookupAdjacentSegment_394__Fun.__hx_current = ((global::verb.core.Intersect_lookupAdjacentSegment_394__Fun) (new global::verb.core.Intersect_lookupAdjacentSegment_394__Fun()) )) ));
				#line 397 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				if (( adj.length == 1 )) {
					#line 397 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
					return ((global::verb.core.types.MeshIntersectionPoint) (adj[0]) );
				}
				 else {
					#line 397 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
					return default(global::verb.core.types.MeshIntersectionPoint);
				}
				
			}
			#line default
		}
		
		
		public static   global::Array<object> curveAndSurface(global::verb.core.types.NurbsCurveData curve, global::verb.core.types.NurbsSurfaceData surface, global::haxe.lang.Null<double> tol){
			unchecked {
				#line 410 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				double __temp_tol47 = ( ( ! (tol.hasValue) ) ? (((double) (1e-3) )) : (tol.@value) );
				#line 410 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::Array<double> tol1 = new global::Array<double>(new double[]{__temp_tol47});
				#line 414 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::Array<object> ints = global::verb.core.Intersect.bounding_box_trees<object, object>(((global::verb.core.types.IBoundingBoxTree<object>) (global::verb.core.types.IBoundingBoxTree__Statics_.__hx_cast<object>(((global::verb.core.types.IBoundingBoxTree) (new global::verb.core.types.LazyCurveBoundingBoxTree(((global::verb.core.types.NurbsCurveData) (curve) ), ((global::haxe.lang.Null<double>) (default(global::haxe.lang.Null<double>)) ))) ))) ), ((global::verb.core.types.IBoundingBoxTree<object>) (global::verb.core.types.IBoundingBoxTree__Statics_.__hx_cast<object>(((global::verb.core.types.IBoundingBoxTree) (new global::verb.core.types.LazySurfaceBoundingBoxTree(((global::verb.core.types.NurbsSurfaceData) (surface) ), ((global::haxe.lang.Null<bool>) (default(global::haxe.lang.Null<bool>)) ), ((global::haxe.lang.Null<double>) (default(global::haxe.lang.Null<double>)) ), ((global::haxe.lang.Null<double>) (default(global::haxe.lang.Null<double>)) ))) ))) ), new global::haxe.lang.Null<double>(((double) (0) ), true));
				#line 418 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				return ints.map<object>(new global::verb.core.Intersect_curveAndSurface_418__Fun(((global::Array<double>) (tol1) )));
			}
			#line default
		}
		
		
		public static   global::verb.core.types.CurveSurfaceIntersection curveAndSurfaceWithEstimate(global::verb.core.types.NurbsCurveData curve, global::verb.core.types.NurbsSurfaceData surface, global::Array<double> start_params, global::haxe.lang.Null<double> tol){
			unchecked {
				#line 454 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				double __temp_tol48 = ( ( ! (tol.hasValue) ) ? (((double) (1e-3) )) : (tol.@value) );
				#line 454 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::Array<object> surface1 = new global::Array<object>(new object[]{surface});
				#line 454 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::Array<object> curve1 = new global::Array<object>(new object[]{curve});
				#line 459 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::haxe.lang.Function objective = new global::verb.core.Intersect_curveAndSurfaceWithEstimate_459__Fun(((global::Array<object>) (surface1) ), ((global::Array<object>) (curve1) ));
				#line 467 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::verb.core.MinimizationResult sol_obj = global::verb.core.Numeric.uncmin(objective, start_params, new global::haxe.lang.Null<double>(__temp_tol48, true), default(global::haxe.lang.Function), default(global::haxe.lang.Null<int>));
				global::Array<double> final = sol_obj.solution;
				#line 470 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				return new global::verb.core.types.CurveSurfaceIntersection(((double) (final[0]) ), ((global::Array<double>) (new global::Array<double>(new double[]{final[1], final[2]})) ));
			}
			#line default
		}
		
		
		public static   global::Array<object> polyline_and_mesh(global::verb.core.types.PolylineData polyline, global::verb.core.types.MeshData mesh, double tol){
			unchecked {
				#line 486 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::Array<object> res = global::verb.core.Intersect.bounding_box_trees<int, int>(new global::verb.core.types.LazyPolylineBoundingBoxTree(((global::verb.core.types.PolylineData) (polyline) ), ((global::verb.core.types.Interval<int>) (default(global::verb.core.types.Interval<int>)) )), new global::verb.core.types.LazyMeshBoundingBoxTree(((global::verb.core.types.MeshData) (mesh) ), ((global::Array<int>) (default(global::Array<int>)) )), new global::haxe.lang.Null<double>(tol, true));
				#line 490 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::Array<object> finalResults = new global::Array<object>(new object[]{});
				#line 492 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				{
					#line 492 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
					int _g = 0;
					#line 492 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
					while (( _g < res.length )){
						#line 492 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
						global::verb.core.types.Pair<int, int> @event = ((global::verb.core.types.Pair<int, int>) (global::verb.core.types.Pair<object, object>.__hx_cast<int, int>(((global::verb.core.types.Pair) (res[_g]) ))) );
						#line 492 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
						 ++ _g;
						#line 494 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
						int polid = @event.item0;
						int faceid = @event.item1;
						#line 497 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
						global::verb.core.types.TriSegmentIntersection inter = global::verb.core.Intersect.segmentWithTriangle(((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (polyline.points[polid]) ))) ), ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (polyline.points[( polid + 1 )]) ))) ), mesh.points, ((global::Array<int>) (global::Array<object>.__hx_cast<int>(((global::Array) (mesh.faces[faceid]) ))) ));
						if (( inter == default(global::verb.core.types.TriSegmentIntersection) )) {
							#line 498 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
							continue;
						}
						
						#line 500 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
						global::Array<double> pt = inter.point;
						double u = global::verb.core.Vec.lerp(inter.p, new global::Array<double>(new double[]{polyline.@params[polid]}), new global::Array<double>(new double[]{polyline.@params[( polid + 1 )]}))[0];
						global::Array<double> uv = global::verb.core.Mesh.triangleUVFromPoint(mesh, faceid, pt);
						#line 504 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
						finalResults.push(new global::verb.core.types.PolylineMeshIntersection(((global::Array<double>) (pt) ), ((double) (u) ), ((global::Array<double>) (uv) ), ((int) (polid) ), ((int) (faceid) )));
					}
					
				}
				
				#line 508 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				return finalResults;
			}
			#line default
		}
		
		
		public static   global::Array<object> mesh_bounding_boxes(global::verb.core.types.MeshData a, global::verb.core.types.MeshData b, double tol){
			unchecked {
				#line 512 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				return global::verb.core.Intersect.bounding_box_trees<int, int>(new global::verb.core.types.LazyMeshBoundingBoxTree(((global::verb.core.types.MeshData) (a) ), ((global::Array<int>) (default(global::Array<int>)) )), new global::verb.core.types.LazyMeshBoundingBoxTree(((global::verb.core.types.MeshData) (b) ), ((global::Array<int>) (default(global::Array<int>)) )), new global::haxe.lang.Null<double>(tol, true));
			}
			#line default
		}
		
		
		public static   global::Array<object> bounding_box_trees<T1, T2>(global::verb.core.types.IBoundingBoxTree<T1> a, global::verb.core.types.IBoundingBoxTree<T2> b, global::haxe.lang.Null<double> tol){
			unchecked {
				#line 527 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				double __temp_tol49 = ( ( ! (tol.hasValue) ) ? (((double) (1e-9) )) : (tol.@value) );
				#line 529 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				if (( a.empty() || b.empty() )) {
					#line 529 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
					return new global::Array<object>(new object[]{});
				}
				
				#line 531 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				if ( ! (a.boundingBox().intersects(b.boundingBox(), new global::haxe.lang.Null<double>(__temp_tol49, true))) ) {
					#line 531 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
					return new global::Array<object>(new object[]{});
				}
				
				#line 533 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				if (( a.indivisible(__temp_tol49) && b.indivisible(__temp_tol49) )) {
					#line 533 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
					return new global::Array<object>(new object[]{new global::verb.core.types.Pair<T1, T2>(global::haxe.lang.Runtime.genericCast<T1>(a.@yield()), global::haxe.lang.Runtime.genericCast<T2>(b.@yield()))});
				}
				
				#line 535 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::verb.core.types.Pair<object, object> asplit = a.split();
				global::verb.core.types.Pair<object, object> bsplit = b.split();
				#line 538 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				return global::verb.core.Intersect.bounding_box_trees<T1, T2>(((global::verb.core.types.IBoundingBoxTree<T1>) (global::verb.core.types.IBoundingBoxTree__Statics_.__hx_cast<T1>(((global::verb.core.types.IBoundingBoxTree) (asplit.item0) ))) ), ((global::verb.core.types.IBoundingBoxTree<T2>) (global::verb.core.types.IBoundingBoxTree__Statics_.__hx_cast<T2>(((global::verb.core.types.IBoundingBoxTree) (bsplit.item0) ))) ), new global::haxe.lang.Null<double>(__temp_tol49, true)).concat(global::verb.core.Intersect.bounding_box_trees<T1, T2>(((global::verb.core.types.IBoundingBoxTree<T1>) (global::verb.core.types.IBoundingBoxTree__Statics_.__hx_cast<T1>(((global::verb.core.types.IBoundingBoxTree) (asplit.item0) ))) ), ((global::verb.core.types.IBoundingBoxTree<T2>) (global::verb.core.types.IBoundingBoxTree__Statics_.__hx_cast<T2>(((global::verb.core.types.IBoundingBoxTree) (bsplit.item1) ))) ), new global::haxe.lang.Null<double>(__temp_tol49, true))).concat(global::verb.core.Intersect.bounding_box_trees<T1, T2>(((global::verb.core.types.IBoundingBoxTree<T1>) (global::verb.core.types.IBoundingBoxTree__Statics_.__hx_cast<T1>(((global::verb.core.types.IBoundingBoxTree) (asplit.item1) ))) ), ((global::verb.core.types.IBoundingBoxTree<T2>) (global::verb.core.types.IBoundingBoxTree__Statics_.__hx_cast<T2>(((global::verb.core.types.IBoundingBoxTree) (bsplit.item0) ))) ), new global::haxe.lang.Null<double>(__temp_tol49, true))).concat(global::verb.core.Intersect.bounding_box_trees<T1, T2>(((global::verb.core.types.IBoundingBoxTree<T1>) (global::verb.core.types.IBoundingBoxTree__Statics_.__hx_cast<T1>(((global::verb.core.types.IBoundingBoxTree) (asplit.item1) ))) ), ((global::verb.core.types.IBoundingBoxTree<T2>) (global::verb.core.types.IBoundingBoxTree__Statics_.__hx_cast<T2>(((global::verb.core.types.IBoundingBoxTree) (bsplit.item1) ))) ), new global::haxe.lang.Null<double>(__temp_tol49, true)));
			}
			#line default
		}
		
		
		public static   global::Array<object> curves(global::verb.core.types.NurbsCurveData curve1, global::verb.core.types.NurbsCurveData curve2, double tolerance){
			unchecked {
				#line 554 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::Array<double> tolerance1 = new global::Array<double>(new double[]{tolerance});
				#line 554 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::Array<object> curve21 = new global::Array<object>(new object[]{curve2});
				#line 554 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::Array<object> curve11 = new global::Array<object>(new object[]{curve1});
				#line 556 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::Array<object> ints = global::verb.core.Intersect.bounding_box_trees<object, object>(((global::verb.core.types.IBoundingBoxTree<object>) (global::verb.core.types.IBoundingBoxTree__Statics_.__hx_cast<object>(((global::verb.core.types.IBoundingBoxTree) (new global::verb.core.types.LazyCurveBoundingBoxTree(((global::verb.core.types.NurbsCurveData) (curve11[0]) ), ((global::haxe.lang.Null<double>) (default(global::haxe.lang.Null<double>)) ))) ))) ), ((global::verb.core.types.IBoundingBoxTree<object>) (global::verb.core.types.IBoundingBoxTree__Statics_.__hx_cast<object>(((global::verb.core.types.IBoundingBoxTree) (new global::verb.core.types.LazyCurveBoundingBoxTree(((global::verb.core.types.NurbsCurveData) (curve21[0]) ), ((global::haxe.lang.Null<double>) (default(global::haxe.lang.Null<double>)) ))) ))) ), new global::haxe.lang.Null<double>(((double) (0) ), true));
				#line 560 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				return ints.map<object>(new global::verb.core.Intersect_curves_560__Fun(((global::Array<double>) (tolerance1) ), ((global::Array<object>) (curve11) ), ((global::Array<object>) (curve21) )));
			}
			#line default
		}
		
		
		public static   global::verb.core.types.CurveCurveIntersection curves_with_estimate(global::verb.core.types.NurbsCurveData curve0, global::verb.core.types.NurbsCurveData curve1, double u0, double u1, double tolerance){
			unchecked {
				#line 578 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::Array<object> curve11 = new global::Array<object>(new object[]{curve1});
				#line 578 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::Array<object> curve01 = new global::Array<object>(new object[]{curve0});
				#line 584 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::haxe.lang.Function objective = new global::verb.core.Intersect_curves_with_estimate_584__Fun(((global::Array<object>) (curve11) ), ((global::Array<object>) (curve01) ));
				#line 592 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::verb.core.MinimizationResult sol_obj = global::verb.core.Numeric.uncmin(objective, new global::Array<double>(new double[]{u0, u1}), new global::haxe.lang.Null<double>(tolerance, true), default(global::haxe.lang.Function), default(global::haxe.lang.Null<int>));
				#line 594 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				double u11 = sol_obj.solution[0];
				double u2 = sol_obj.solution[1];
				#line 597 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::Array<double> p11 = global::verb.core.Eval.rationalCurvePoint(((global::verb.core.types.NurbsCurveData) (curve01[0]) ), u11);
				global::Array<double> p21 = global::verb.core.Eval.rationalCurvePoint(((global::verb.core.types.NurbsCurveData) (curve11[0]) ), u2);
				#line 600 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				return new global::verb.core.types.CurveCurveIntersection(((global::Array<double>) (p11) ), ((global::Array<double>) (p21) ), ((double) (u11) ), ((double) (u2) ));
			}
			#line default
		}
		
		
		public static   global::verb.core.types.Interval<object> triangles(global::verb.core.types.MeshData mesh0, int faceIndex0, global::verb.core.types.MeshData mesh1, int faceIndex1){
			unchecked {
				#line 616 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::Array<int> tri0 = ((global::Array<int>) (global::Array<object>.__hx_cast<int>(((global::Array) (mesh0.faces[faceIndex0]) ))) );
				global::Array<int> tri1 = ((global::Array<int>) (global::Array<object>.__hx_cast<int>(((global::Array) (mesh1.faces[faceIndex1]) ))) );
				#line 620 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::Array<double> n0 = global::verb.core.Mesh.getTriangleNorm(mesh0.points, tri0);
				global::Array<double> n1 = global::verb.core.Mesh.getTriangleNorm(mesh1.points, tri1);
				global::Array<double> o0 = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (mesh0.points[tri0[0]]) ))) );
				global::Array<double> o1 = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (mesh1.points[tri1[0]]) ))) );
				#line 626 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::verb.core.types.Ray ray = global::verb.core.Intersect.planes(o0, n0, o1, n1);
				if (( ray == default(global::verb.core.types.Ray) )) {
					#line 627 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
					return default(global::verb.core.types.Interval<object>);
				}
				
				#line 630 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::verb.core.types.Interval<object> clip1 = global::verb.core.Intersect.clipRayInCoplanarTriangle(ray, mesh0, faceIndex0);
				if (( clip1 == default(global::verb.core.types.Interval<object>) )) {
					#line 631 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
					return default(global::verb.core.types.Interval<object>);
				}
				
				#line 634 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::verb.core.types.Interval<object> clip2 = global::verb.core.Intersect.clipRayInCoplanarTriangle(ray, mesh1, faceIndex1);
				if (( clip2 == default(global::verb.core.types.Interval<object>) )) {
					#line 635 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
					return default(global::verb.core.types.Interval<object>);
				}
				
				#line 638 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::verb.core.types.Interval<object> merged = global::verb.core.Intersect.mergeTriangleClipIntervals(clip1, clip2, mesh0, faceIndex0, mesh1, faceIndex1);
				if (( merged == default(global::verb.core.types.Interval<object>) )) {
					#line 639 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
					return default(global::verb.core.types.Interval<object>);
				}
				
				#line 641 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				return new global::verb.core.types.Interval<object>(((object) (new global::verb.core.types.MeshIntersectionPoint(((global::Array<double>) (((global::verb.core.types.MeshIntersectionPoint) (merged.min) ).uv0) ), ((global::Array<double>) (((global::verb.core.types.MeshIntersectionPoint) (merged.min) ).uv1) ), ((global::Array<double>) (((global::verb.core.types.MeshIntersectionPoint) (merged.min) ).point) ), ((int) (faceIndex0) ), ((int) (faceIndex1) ))) ), ((object) (new global::verb.core.types.MeshIntersectionPoint(((global::Array<double>) (((global::verb.core.types.MeshIntersectionPoint) (merged.max) ).uv0) ), ((global::Array<double>) (((global::verb.core.types.MeshIntersectionPoint) (merged.max) ).uv1) ), ((global::Array<double>) (((global::verb.core.types.MeshIntersectionPoint) (merged.max) ).point) ), ((int) (faceIndex0) ), ((int) (faceIndex1) ))) ));
			}
			#line default
		}
		
		
		public static   global::verb.core.types.Interval<object> clipRayInCoplanarTriangle(global::verb.core.types.Ray ray, global::verb.core.types.MeshData mesh, int faceIndex){
			unchecked {
				#line 650 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::Array<int> tri = ((global::Array<int>) (global::Array<object>.__hx_cast<int>(((global::Array) (mesh.faces[faceIndex]) ))) );
				global::Array<object> o = new global::Array<object>(new object[]{((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (mesh.points[tri[0]]) ))) ), ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (mesh.points[tri[1]]) ))) ), ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (mesh.points[tri[2]]) ))) )});
				global::Array<object> uvs = new global::Array<object>(new object[]{((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (mesh.uvs[tri[0]]) ))) ), ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (mesh.uvs[tri[1]]) ))) ), ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (mesh.uvs[tri[2]]) ))) )});
				global::Array<object> uvd = new global::Array<object>(new object[]{global::verb.core.Vec.sub(((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (uvs[1]) ))) ), ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (uvs[0]) ))) )), global::verb.core.Vec.sub(((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (uvs[2]) ))) ), ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (uvs[1]) ))) )), global::verb.core.Vec.sub(((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (uvs[0]) ))) ), ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (uvs[2]) ))) ))});
				global::Array<object> s = new global::Array<object>(new object[]{global::verb.core.Vec.sub(((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (o[1]) ))) ), ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (o[0]) ))) )), global::verb.core.Vec.sub(((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (o[2]) ))) ), ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (o[1]) ))) )), global::verb.core.Vec.sub(((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (o[0]) ))) ), ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (o[2]) ))) ))});
				global::Array<object> d = s.map<object>(((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (typeof(global::verb.core.Vec)) ), ((string) ("normalized") ), ((int) (24077367) ))) ));
				global::Array<double> l = s.map<double>(((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (typeof(global::verb.core.Vec)) ), ((string) ("norm") ), ((int) (1225397820) ))) ));
				#line 659 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::verb.core.types.CurveTriPoint minU = default(global::verb.core.types.CurveTriPoint);
				global::verb.core.types.CurveTriPoint maxU = default(global::verb.core.types.CurveTriPoint);
				#line 663 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				{
					#line 663 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
					int _g = 0;
					#line 663 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
					while (( _g < 3 )){
						#line 663 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
						int i = _g++;
						global::Array<double> o0 = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (o[i]) ))) );
						global::Array<double> d0 = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (d[i]) ))) );
						#line 667 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
						global::verb.core.types.CurveCurveIntersection res = global::verb.core.Intersect.rays(o0, d0, ray.origin, ray.dir);
						#line 669 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
						if (( res == default(global::verb.core.types.CurveCurveIntersection) )) {
							#line 670 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
							continue;
						}
						
						#line 673 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
						double useg = res.u0;
						double uray = res.u1;
						#line 677 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
						if (( ( useg < -1e-10 ) || ( useg > ( l[i] + 1e-10 ) ) )) {
							#line 677 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
							continue;
						}
						
						#line 680 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
						if (( ( minU == default(global::verb.core.types.CurveTriPoint) ) || ( uray < minU.u ) )) {
							#line 681 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
							minU = new global::verb.core.types.CurveTriPoint(((double) (uray) ), ((global::Array<double>) (global::verb.core.Vec.onRay(ray.origin, ray.dir, uray)) ), ((global::Array<double>) (global::verb.core.Vec.onRay(((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (uvs[i]) ))) ), ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (uvd[i]) ))) ), ( useg / l[i] ))) ));
						}
						
						#line 684 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
						if (( ( maxU == default(global::verb.core.types.CurveTriPoint) ) || ( uray > maxU.u ) )) {
							#line 685 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
							maxU = new global::verb.core.types.CurveTriPoint(((double) (uray) ), ((global::Array<double>) (global::verb.core.Vec.onRay(ray.origin, ray.dir, uray)) ), ((global::Array<double>) (global::verb.core.Vec.onRay(((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (uvs[i]) ))) ), ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (uvd[i]) ))) ), ( useg / l[i] ))) ));
						}
						
					}
					
				}
				
				#line 689 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				if (( ( maxU == default(global::verb.core.types.CurveTriPoint) ) || ( minU == default(global::verb.core.types.CurveTriPoint) ) )) {
					#line 690 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
					return default(global::verb.core.types.Interval<object>);
				}
				
				#line 694 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				return new global::verb.core.types.Interval<object>(((object) (minU) ), ((object) (maxU) ));
			}
			#line default
		}
		
		
		public static   global::verb.core.types.Interval<object> mergeTriangleClipIntervals(global::verb.core.types.Interval<object> clip1, global::verb.core.types.Interval<object> clip2, global::verb.core.types.MeshData mesh1, int faceIndex1, global::verb.core.types.MeshData mesh2, int faceIndex2){
			unchecked {
				#line 702 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				if (( ( ((global::verb.core.types.CurveTriPoint) (clip2.min) ).u > ( ((global::verb.core.types.CurveTriPoint) (clip1.max) ).u + 1e-10 ) ) || ( ((global::verb.core.types.CurveTriPoint) (clip1.min) ).u > ( ((global::verb.core.types.CurveTriPoint) (clip2.max) ).u + 1e-10 ) ) )) {
					#line 704 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
					return default(global::verb.core.types.Interval<object>);
				}
				
				#line 708 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::verb.core.types.Pair<object, int> min = default(global::verb.core.types.Pair<object, int>);
				#line 708 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				if (( ((global::verb.core.types.CurveTriPoint) (clip1.min) ).u > ((global::verb.core.types.CurveTriPoint) (clip2.min) ).u )) {
					#line 708 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
					min = new global::verb.core.types.Pair<object, int>(((global::verb.core.types.CurveTriPoint) (clip1.min) ), ((int) (0) ));
				}
				 else {
					#line 708 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
					min = new global::verb.core.types.Pair<object, int>(((global::verb.core.types.CurveTriPoint) (clip2.min) ), ((int) (1) ));
				}
				
				#line 709 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::verb.core.types.Pair<object, int> max = default(global::verb.core.types.Pair<object, int>);
				#line 709 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				if (( ((global::verb.core.types.CurveTriPoint) (clip1.max) ).u < ((global::verb.core.types.CurveTriPoint) (clip2.max) ).u )) {
					#line 709 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
					max = new global::verb.core.types.Pair<object, int>(((global::verb.core.types.CurveTriPoint) (clip1.max) ), ((int) (0) ));
				}
				 else {
					#line 709 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
					max = new global::verb.core.types.Pair<object, int>(((global::verb.core.types.CurveTriPoint) (clip2.max) ), ((int) (1) ));
				}
				
				#line 711 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::verb.core.types.Interval<object> res = new global::verb.core.types.Interval<object>(((object) (new global::verb.core.types.MeshIntersectionPoint(((global::Array<double>) (default(global::Array<double>)) ), ((global::Array<double>) (default(global::Array<double>)) ), ((global::Array<double>) (((global::verb.core.types.CurveTriPoint) (min.item0) ).point) ), ((int) (faceIndex1) ), ((int) (faceIndex2) ))) ), ((object) (new global::verb.core.types.MeshIntersectionPoint(((global::Array<double>) (default(global::Array<double>)) ), ((global::Array<double>) (default(global::Array<double>)) ), ((global::Array<double>) (((global::verb.core.types.CurveTriPoint) (max.item0) ).point) ), ((int) (faceIndex1) ), ((int) (faceIndex2) ))) ));
				#line 715 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				if (( min.item1 == 0 )) {
					#line 716 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
					((global::verb.core.types.MeshIntersectionPoint) (res.min) ).uv0 = ((global::verb.core.types.CurveTriPoint) (min.item0) ).uv;
					((global::verb.core.types.MeshIntersectionPoint) (res.min) ).uv1 = global::verb.core.Mesh.triangleUVFromPoint(mesh2, faceIndex2, ((global::verb.core.types.CurveTriPoint) (min.item0) ).point);
				}
				 else {
					#line 719 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
					((global::verb.core.types.MeshIntersectionPoint) (res.min) ).uv0 = global::verb.core.Mesh.triangleUVFromPoint(mesh1, faceIndex1, ((global::verb.core.types.CurveTriPoint) (min.item0) ).point);
					((global::verb.core.types.MeshIntersectionPoint) (res.min) ).uv1 = ((global::verb.core.types.CurveTriPoint) (min.item0) ).uv;
				}
				
				#line 723 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				if (( max.item1 == 0 )) {
					#line 724 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
					((global::verb.core.types.MeshIntersectionPoint) (res.max) ).uv0 = ((global::verb.core.types.CurveTriPoint) (max.item0) ).uv;
					((global::verb.core.types.MeshIntersectionPoint) (res.max) ).uv1 = global::verb.core.Mesh.triangleUVFromPoint(mesh2, faceIndex2, ((global::verb.core.types.CurveTriPoint) (max.item0) ).point);
				}
				 else {
					#line 727 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
					((global::verb.core.types.MeshIntersectionPoint) (res.max) ).uv0 = global::verb.core.Mesh.triangleUVFromPoint(mesh1, faceIndex1, ((global::verb.core.types.CurveTriPoint) (max.item0) ).point);
					((global::verb.core.types.MeshIntersectionPoint) (res.max) ).uv1 = ((global::verb.core.types.CurveTriPoint) (max.item0) ).uv;
				}
				
				#line 731 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				return res;
			}
			#line default
		}
		
		
		public static   global::verb.core.types.Ray planes(global::Array<double> origin0, global::Array<double> normal0, global::Array<double> origin1, global::Array<double> normal1){
			unchecked {
				#line 747 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::Array<double> d = global::verb.core.Vec.cross(normal0, normal1);
				#line 749 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				if (( global::verb.core.Vec.dot(d, d) < 1e-10 )) {
					#line 749 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
					return default(global::verb.core.types.Ray);
				}
				
				#line 752 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				int li = 0;
				double mi = global::System.Math.Abs(((double) (d[0]) ));
				double m1 = global::System.Math.Abs(((double) (d[1]) ));
				double m2 = global::System.Math.Abs(((double) (d[2]) ));
				#line 757 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				if (( m1 > mi )) {
					#line 758 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
					li = 1;
					mi = m1;
				}
				
				#line 762 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				if (( m2 > mi )) {
					#line 763 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
					li = 2;
					mi = m2;
				}
				
				#line 767 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				double a1 = default(double);
				#line 767 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				double b1 = default(double);
				#line 767 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				double a2 = default(double);
				#line 767 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				double b2 = default(double);
				#line 769 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				if (( li == 0 )) {
					#line 770 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
					a1 = normal0[1];
					b1 = normal0[2];
					a2 = normal1[1];
					b2 = normal1[2];
				}
				 else {
					#line 774 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
					if (( li == 1 )) {
						#line 775 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
						a1 = normal0[0];
						b1 = normal0[2];
						a2 = normal1[0];
						b2 = normal1[2];
					}
					 else {
						#line 780 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
						a1 = normal0[0];
						b1 = normal0[1];
						a2 = normal1[0];
						b2 = normal1[1];
					}
					
				}
				
				#line 787 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				double d1 =  - (global::verb.core.Vec.dot(origin0, normal0)) ;
				double d2 =  - (global::verb.core.Vec.dot(origin1, normal1)) ;
				#line 790 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				double den = ( ( a1 * b2 ) - ( b1 * a2 ) );
				#line 792 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				double x = ( (( ( b1 * d2 ) - ( d1 * b2 ) )) / den );
				double y = ( (( ( d1 * a2 ) - ( a1 * d2 ) )) / den );
				global::Array<double> p = default(global::Array<double>);
				#line 796 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				if (( li == 0 )) {
					#line 797 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
					p = new global::Array<double>(new double[]{((double) (0) ), x, y});
				}
				 else {
					#line 798 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
					if (( li == 1 )) {
						#line 799 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
						p = new global::Array<double>(new double[]{x, ((double) (0) ), y});
					}
					 else {
						#line 801 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
						p = new global::Array<double>(new double[]{x, y, ((double) (0) )});
					}
					
				}
				
				#line 804 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				return new global::verb.core.types.Ray(((global::Array<double>) (p) ), ((global::Array<double>) (global::verb.core.Vec.normalized(d)) ));
			}
			#line default
		}
		
		
		public static   global::Array<double> threePlanes(global::Array<double> n0, double d0, global::Array<double> n1, double d1, global::Array<double> n2, double d2){
			unchecked {
				#line 824 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::Array<double> u = global::verb.core.Vec.cross(n1, n2);
				double den = global::verb.core.Vec.dot(n0, u);
				#line 827 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				if (( global::System.Math.Abs(((double) (den) )) < 1e-10 )) {
					#line 827 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
					return default(global::Array<double>);
				}
				
				#line 829 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::Array<double> diff = global::verb.core.Vec.sub(global::verb.core.Vec.mul(d2, n1), global::verb.core.Vec.mul(d1, n2));
				global::Array<double> num = global::verb.core.Vec.@add(global::verb.core.Vec.mul(d0, u), global::verb.core.Vec.cross(n0, diff));
				#line 832 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				return global::verb.core.Vec.mul(( 1 / den ), num);
			}
			#line default
		}
		
		
		public static   global::Array<object> polylines(global::verb.core.types.PolylineData polyline0, global::verb.core.types.PolylineData polyline1, double tol){
			unchecked {
				#line 849 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::Array<object> res = global::verb.core.Intersect.bounding_box_trees<int, int>(new global::verb.core.types.LazyPolylineBoundingBoxTree(((global::verb.core.types.PolylineData) (polyline0) ), ((global::verb.core.types.Interval<int>) (default(global::verb.core.types.Interval<int>)) )), new global::verb.core.types.LazyPolylineBoundingBoxTree(((global::verb.core.types.PolylineData) (polyline1) ), ((global::verb.core.types.Interval<int>) (default(global::verb.core.types.Interval<int>)) )), new global::haxe.lang.Null<double>(tol, true));
				#line 853 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::Array<object> finalResults = new global::Array<object>(new object[]{});
				#line 855 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				{
					#line 855 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
					int _g = 0;
					#line 855 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
					while (( _g < res.length )){
						#line 855 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
						global::verb.core.types.Pair<int, int> @event = ((global::verb.core.types.Pair<int, int>) (global::verb.core.types.Pair<object, object>.__hx_cast<int, int>(((global::verb.core.types.Pair) (res[_g]) ))) );
						#line 855 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
						 ++ _g;
						int polid0 = @event.item0;
						int polid1 = @event.item1;
						#line 859 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
						global::verb.core.types.CurveCurveIntersection inter = global::verb.core.Intersect.segments(((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (polyline0.points[polid0]) ))) ), ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (polyline0.points[( polid0 + 1 )]) ))) ), ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (polyline1.points[polid1]) ))) ), ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (polyline1.points[( polid1 + 1 )]) ))) ), tol);
						#line 862 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
						if (( inter == default(global::verb.core.types.CurveCurveIntersection) )) {
							#line 862 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
							continue;
						}
						
						#line 865 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
						inter.u0 = global::verb.core.Vec.lerp(inter.u0, new global::Array<double>(new double[]{polyline0.@params[polid0]}), new global::Array<double>(new double[]{polyline0.@params[( polid0 + 1 )]}))[0];
						inter.u1 = global::verb.core.Vec.lerp(inter.u1, new global::Array<double>(new double[]{polyline1.@params[polid1]}), new global::Array<double>(new double[]{polyline1.@params[( polid1 + 1 )]}))[0];
						#line 868 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
						finalResults.push(inter);
					}
					
				}
				
				#line 871 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				return finalResults;
			}
			#line default
		}
		
		
		public static   global::verb.core.types.CurveCurveIntersection segments(global::Array<double> a0, global::Array<double> a1, global::Array<double> b0, global::Array<double> b1, double tol){
			unchecked {
				#line 888 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::Array<double> a1ma0 = global::verb.core.Vec.sub(a1, a0);
				double aN = default(double);
				#line 889 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				{
					#line 889 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
					double v = global::verb.core.Vec.dot(a1ma0, a1ma0);
					#line 889 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
					aN = global::System.Math.Sqrt(((double) (v) ));
				}
				
				#line 890 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::Array<double> a = global::verb.core.Vec.mul(( 1 / aN ), a1ma0);
				global::Array<double> b1mb0 = global::verb.core.Vec.sub(b1, b0);
				double bN = default(double);
				#line 892 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				{
					#line 892 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
					double v1 = global::verb.core.Vec.dot(b1mb0, b1mb0);
					#line 892 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
					bN = global::System.Math.Sqrt(((double) (v1) ));
				}
				
				#line 893 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::Array<double> b = global::verb.core.Vec.mul(( 1 / bN ), b1mb0);
				global::verb.core.types.CurveCurveIntersection int_params = global::verb.core.Intersect.rays(a0, a, b0, b);
				#line 896 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				if (( int_params != default(global::verb.core.types.CurveCurveIntersection) )) {
					#line 898 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
					double u0 = default(double);
					#line 898 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
					{
						#line 898 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
						double a2 = global::System.Math.Max(((double) (0) ), ((double) (( int_params.u0 / aN )) ));
						#line 898 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
						u0 = global::System.Math.Min(((double) (a2) ), ((double) (1.0) ));
					}
					
					#line 899 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
					double u1 = default(double);
					#line 899 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
					{
						#line 899 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
						double a3 = global::System.Math.Max(((double) (0) ), ((double) (( int_params.u1 / bN )) ));
						#line 899 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
						u1 = global::System.Math.Min(((double) (a3) ), ((double) (1.0) ));
					}
					
					#line 900 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
					global::Array<double> point0 = global::verb.core.Vec.onRay(a0, a1ma0, u0);
					global::Array<double> point1 = global::verb.core.Vec.onRay(b0, b1mb0, u1);
					double dist = global::verb.core.Vec.distSquared(point0, point1);
					#line 904 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
					if (( dist < ( tol * tol ) )) {
						#line 905 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
						return new global::verb.core.types.CurveCurveIntersection(((global::Array<double>) (point0) ), ((global::Array<double>) (point1) ), ((double) (u0) ), ((double) (u1) ));
					}
					
				}
				
				#line 909 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				return default(global::verb.core.types.CurveCurveIntersection);
			}
			#line default
		}
		
		
		public static   global::verb.core.types.CurveCurveIntersection rays(global::Array<double> a0, global::Array<double> a, global::Array<double> b0, global::Array<double> b){
			unchecked {
				#line 925 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				double dab = global::verb.core.Vec.dot(a, b);
				double dab0 = global::verb.core.Vec.dot(a, b0);
				double daa0 = global::verb.core.Vec.dot(a, a0);
				double dbb0 = global::verb.core.Vec.dot(b, b0);
				double dba0 = global::verb.core.Vec.dot(b, a0);
				double daa = global::verb.core.Vec.dot(a, a);
				double dbb = global::verb.core.Vec.dot(b, b);
				double div = ( ( daa * dbb ) - ( dab * dab ) );
				#line 935 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				if (( global::System.Math.Abs(((double) (div) )) < 1e-10 )) {
					#line 936 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
					return default(global::verb.core.types.CurveCurveIntersection);
				}
				
				#line 939 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				double num = ( ( dab * (( dab0 - daa0 )) ) - ( daa * (( dbb0 - dba0 )) ) );
				double w = ( num / div );
				double t = ( (( ( dab0 - daa0 ) + ( w * dab ) )) / daa );
				#line 943 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::Array<double> p0 = global::verb.core.Vec.onRay(a0, a, t);
				global::Array<double> p1 = global::verb.core.Vec.onRay(b0, b, w);
				#line 946 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				return new global::verb.core.types.CurveCurveIntersection(((global::Array<double>) (p0) ), ((global::Array<double>) (p1) ), ((double) (t) ), ((double) (w) ));
			}
			#line default
		}
		
		
		public static   global::verb.core.types.TriSegmentIntersection segmentWithTriangle(global::Array<double> p0, global::Array<double> p1, global::Array<object> points, global::Array<int> tri){
			unchecked {
				#line 962 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::Array<double> v0 = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (points[tri[0]]) ))) );
				global::Array<double> v1 = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (points[tri[1]]) ))) );
				global::Array<double> v2 = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (points[tri[2]]) ))) );
				global::Array<double> u = global::verb.core.Vec.sub(v1, v0);
				global::Array<double> v = global::verb.core.Vec.sub(v2, v0);
				global::Array<double> n = global::verb.core.Vec.cross(u, v);
				#line 969 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::Array<double> dir = global::verb.core.Vec.sub(p1, p0);
				global::Array<double> w0 = global::verb.core.Vec.sub(p0, v0);
				double a =  - (global::verb.core.Vec.dot(n, w0)) ;
				double b = global::verb.core.Vec.dot(n, dir);
				#line 975 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				if (( global::System.Math.Abs(((double) (b) )) < 1e-10 )) {
					#line 976 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
					return default(global::verb.core.types.TriSegmentIntersection);
				}
				
				#line 979 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				double r = ( a / b );
				#line 982 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				if (( ( r < 0 ) || ( r > 1 ) )) {
					#line 983 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
					return default(global::verb.core.types.TriSegmentIntersection);
				}
				
				#line 987 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::Array<double> pt = global::verb.core.Vec.@add(p0, global::verb.core.Vec.mul(r, dir));
				#line 990 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				double uv = global::verb.core.Vec.dot(u, v);
				double uu = global::verb.core.Vec.dot(u, u);
				double vv = global::verb.core.Vec.dot(v, v);
				global::Array<double> w = global::verb.core.Vec.sub(pt, v0);
				double wu = global::verb.core.Vec.dot(w, u);
				double wv = global::verb.core.Vec.dot(w, v);
				double denom = ( ( uv * uv ) - ( uu * vv ) );
				#line 998 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				if (( global::System.Math.Abs(((double) (denom) )) < 1e-10 )) {
					#line 999 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
					return default(global::verb.core.types.TriSegmentIntersection);
				}
				
				#line 1002 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				double s = ( (( ( uv * wv ) - ( vv * wu ) )) / denom );
				double t = ( (( ( uv * wu ) - ( uu * wv ) )) / denom );
				#line 1005 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				if (( ( ( ( ( s > 1.0000000001 ) || ( t > 1.0000000001 ) ) || ( t < -1e-10 ) ) || ( s < -1e-10 ) ) || ( ( s + t ) > 1.0000000001 ) )) {
					#line 1006 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
					return default(global::verb.core.types.TriSegmentIntersection);
				}
				
				#line 1009 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				return new global::verb.core.types.TriSegmentIntersection(((global::Array<double>) (pt) ), ((double) (s) ), ((double) (t) ), ((double) (r) ));
			}
			#line default
		}
		
		
		public static   object segment_with_plane(global::Array<double> p0, global::Array<double> p1, global::Array<double> v0, global::Array<double> n){
			unchecked {
				#line 1029 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				double denom = global::verb.core.Vec.dot(n, global::verb.core.Vec.sub(p0, p1));
				#line 1032 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				if (( global::System.Math.Abs(((double) (denom) )) < 1e-10 )) {
					#line 1033 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
					return default(object);
				}
				
				#line 1036 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				double numer = global::verb.core.Vec.dot(n, global::verb.core.Vec.sub(v0, p0));
				#line 1038 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				return new global::haxe.lang.DynamicObject(new global::Array<int>(new int[]{}), new global::Array<object>(new object[]{}), new global::Array<int>(new int[]{112}), new global::Array<double>(new double[]{( numer / denom )}));
			}
			#line default
		}
		
		
		public static  new object __hx_createEmpty(){
			unchecked {
				#line 31 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				return new global::verb.core.Intersect(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) ));
			}
			#line default
		}
		
		
		public static  new object __hx_create(global::Array arr){
			unchecked {
				#line 31 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				return new global::verb.core.Intersect();
			}
			#line default
		}
		
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core{
	public  class Intersect_surfaces_88__Fun : global::haxe.lang.Function {
		public    Intersect_surfaces_88__Fun(global::Array<object> surface01, global::Array<object> surface11, global::Array<double> tol1) : base(1, 0){
			unchecked {
				#line 89 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				this.surface01 = surface01;
				#line 89 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				this.surface11 = surface11;
				#line 89 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				this.tol1 = tol1;
			}
			#line default
		}
		
		
		public override   object __hx_invoke1_o(double __fn_float1, object __fn_dyn1){
			unchecked {
				#line 88 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::verb.core.types.MeshIntersectionPoint inter = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (((global::verb.core.types.MeshIntersectionPoint) (((object) (__fn_float1) )) )) : (((global::verb.core.types.MeshIntersectionPoint) (__fn_dyn1) )) );
				return global::verb.core.Intersect.surfacesAtPointWithEstimate(((global::verb.core.types.NurbsSurfaceData) (this.surface01[0]) ), ((global::verb.core.types.NurbsSurfaceData) (this.surface11[0]) ), inter.uv0, inter.uv1, this.tol1[0]);
			}
			#line default
		}
		
		
		public  global::Array<object> surface01;
		
		public  global::Array<object> surface11;
		
		public  global::Array<double> tol1;
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core{
	public  class Intersect_surfaces_87__Fun : global::haxe.lang.Function {
		public    Intersect_surfaces_87__Fun(global::Array<object> surface01, global::Array<object> surface11, global::Array<double> tol1) : base(1, 0){
			unchecked {
				#line 88 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				this.surface01 = surface01;
				#line 88 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				this.surface11 = surface11;
				#line 88 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				this.tol1 = tol1;
			}
			#line default
		}
		
		
		public override   object __hx_invoke1_o(double __fn_float1, object __fn_dyn1){
			unchecked {
				#line 87 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::Array<object> pl = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (((object) (__fn_float1) )) ))) )) : (((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (__fn_dyn1) ))) )) );
				return pl.map<object>(new global::verb.core.Intersect_surfaces_88__Fun(((global::Array<object>) (this.surface01) ), ((global::Array<object>) (this.surface11) ), ((global::Array<double>) (this.tol1) )));
			}
			#line default
		}
		
		
		public  global::Array<object> surface01;
		
		public  global::Array<object> surface11;
		
		public  global::Array<double> tol1;
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core{
	public  class Intersect_surfaces_95__Fun : global::haxe.lang.Function {
		public    Intersect_surfaces_95__Fun() : base(1, 0){
			unchecked {
			}
			#line default
		}
		
		
		public static  global::verb.core.Intersect_surfaces_95__Fun __hx_current;
		
		public override   object __hx_invoke1_o(double __fn_float1, object __fn_dyn1){
			unchecked {
				#line 95 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::verb.core.types.SurfaceSurfaceIntersectionPoint x1 = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (((global::verb.core.types.SurfaceSurfaceIntersectionPoint) (((object) (__fn_float1) )) )) : (((global::verb.core.types.SurfaceSurfaceIntersectionPoint) (__fn_dyn1) )) );
				#line 95 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				return x1.point;
			}
			#line default
		}
		
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core{
	public  class Intersect_surfaces_94__Fun : global::haxe.lang.Function {
		public    Intersect_surfaces_94__Fun() : base(1, 0){
			unchecked {
			}
			#line default
		}
		
		
		public static  global::verb.core.Intersect_surfaces_94__Fun __hx_current;
		
		public override   object __hx_invoke1_o(double __fn_float1, object __fn_dyn1){
			unchecked {
				#line 94 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::Array<object> x = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (((object) (__fn_float1) )) ))) )) : (((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (__fn_dyn1) ))) )) );
				return global::verb.core.Make.rationalInterpCurve(x.map<object>(( (( global::verb.core.Intersect_surfaces_95__Fun.__hx_current != default(global::verb.core.Intersect_surfaces_95__Fun) )) ? (global::verb.core.Intersect_surfaces_95__Fun.__hx_current) : (global::verb.core.Intersect_surfaces_95__Fun.__hx_current = ((global::verb.core.Intersect_surfaces_95__Fun) (new global::verb.core.Intersect_surfaces_95__Fun()) )) )), new global::haxe.lang.Null<int>(3, true), default(global::haxe.lang.Null<bool>), default(global::Array<double>), default(global::Array<double>));
			}
			#line default
		}
		
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core{
	public  class Intersect_meshes_206__Fun : global::haxe.lang.Function {
		public    Intersect_meshes_206__Fun(global::Array<object> mesh11, global::Array<object> mesh01) : base(1, 0){
			unchecked {
				#line 207 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				this.mesh11 = mesh11;
				#line 207 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				this.mesh01 = mesh01;
			}
			#line default
		}
		
		
		public override   object __hx_invoke1_o(double __fn_float1, object __fn_dyn1){
			unchecked {
				#line 206 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::verb.core.types.Pair<int, int> ids = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (((global::verb.core.types.Pair<int, int>) (global::verb.core.types.Pair<object, object>.__hx_cast<int, int>(((global::verb.core.types.Pair) (((object) (__fn_float1) )) ))) )) : (((global::verb.core.types.Pair<int, int>) (global::verb.core.types.Pair<object, object>.__hx_cast<int, int>(((global::verb.core.types.Pair) (__fn_dyn1) ))) )) );
				return global::verb.core.Intersect.triangles(((global::verb.core.types.MeshData) (this.mesh01[0]) ), ids.item0, ((global::verb.core.types.MeshData) (this.mesh11[0]) ), ids.item1);
			}
			#line default
		}
		
		
		public  global::Array<object> mesh11;
		
		public  global::Array<object> mesh01;
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core{
	public  class Intersect_meshes_212__Fun : global::haxe.lang.Function {
		public    Intersect_meshes_212__Fun() : base(1, 0){
			unchecked {
			}
			#line default
		}
		
		
		public static  global::verb.core.Intersect_meshes_212__Fun __hx_current;
		
		public override   object __hx_invoke1_o(double __fn_float1, object __fn_dyn1){
			unchecked {
				#line 212 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::verb.core.types.Interval<object> x = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (((global::verb.core.types.Interval<object>) (global::verb.core.types.Interval<object>.__hx_cast<object>(((global::verb.core.types.Interval) (((object) (__fn_float1) )) ))) )) : (((global::verb.core.types.Interval<object>) (global::verb.core.types.Interval<object>.__hx_cast<object>(((global::verb.core.types.Interval) (__fn_dyn1) ))) )) );
				return ( x != default(global::verb.core.types.Interval<object>) );
			}
			#line default
		}
		
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core{
	public  class Intersect_meshes_218__Fun : global::haxe.lang.Function {
		public    Intersect_meshes_218__Fun() : base(1, 0){
			unchecked {
			}
			#line default
		}
		
		
		public static  global::verb.core.Intersect_meshes_218__Fun __hx_current;
		
		public override   object __hx_invoke1_o(double __fn_float1, object __fn_dyn1){
			unchecked {
				#line 218 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::verb.core.types.Interval<object> x1 = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (((global::verb.core.types.Interval<object>) (global::verb.core.types.Interval<object>.__hx_cast<object>(((global::verb.core.types.Interval) (((object) (__fn_float1) )) ))) )) : (((global::verb.core.types.Interval<object>) (global::verb.core.types.Interval<object>.__hx_cast<object>(((global::verb.core.types.Interval) (__fn_dyn1) ))) )) );
				return ( global::verb.core.Vec.distSquared(((global::verb.core.types.MeshIntersectionPoint) (x1.min) ).point, ((global::verb.core.types.MeshIntersectionPoint) (x1.max) ).point) > 1e-10 );
			}
			#line default
		}
		
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core{
	public  class Intersect_meshes_220__Fun : global::haxe.lang.Function {
		public    Intersect_meshes_220__Fun() : base(2, 0){
			unchecked {
			}
			#line default
		}
		
		
		public static  global::verb.core.Intersect_meshes_220__Fun __hx_current;
		
		public override   object __hx_invoke2_o(double __fn_float1, object __fn_dyn1, double __fn_float2, object __fn_dyn2){
			unchecked {
				#line 220 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::verb.core.types.Interval<object> b = ( (global::haxe.lang.Runtime.eq(__fn_dyn2, global::haxe.lang.Runtime.undefined)) ? (((global::verb.core.types.Interval<object>) (global::verb.core.types.Interval<object>.__hx_cast<object>(((global::verb.core.types.Interval) (((object) (__fn_float2) )) ))) )) : (((global::verb.core.types.Interval<object>) (global::verb.core.types.Interval<object>.__hx_cast<object>(((global::verb.core.types.Interval) (__fn_dyn2) ))) )) );
				#line 220 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::verb.core.types.Interval<object> a = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (((global::verb.core.types.Interval<object>) (global::verb.core.types.Interval<object>.__hx_cast<object>(((global::verb.core.types.Interval) (((object) (__fn_float1) )) ))) )) : (((global::verb.core.types.Interval<object>) (global::verb.core.types.Interval<object>.__hx_cast<object>(((global::verb.core.types.Interval) (__fn_dyn1) ))) )) );
				#line 226 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::Array<double> s1 = global::verb.core.Vec.sub(((global::verb.core.types.MeshIntersectionPoint) (a.min) ).uv0, ((global::verb.core.types.MeshIntersectionPoint) (b.min) ).uv0);
				double d1 = global::verb.core.Vec.dot(s1, s1);
				#line 229 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::Array<double> s2 = global::verb.core.Vec.sub(((global::verb.core.types.MeshIntersectionPoint) (a.max) ).uv0, ((global::verb.core.types.MeshIntersectionPoint) (b.max) ).uv0);
				double d2 = global::verb.core.Vec.dot(s2, s2);
				#line 232 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::Array<double> s3 = global::verb.core.Vec.sub(((global::verb.core.types.MeshIntersectionPoint) (a.min) ).uv0, ((global::verb.core.types.MeshIntersectionPoint) (b.max) ).uv0);
				double d3 = global::verb.core.Vec.dot(s3, s3);
				#line 235 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::Array<double> s4 = global::verb.core.Vec.sub(((global::verb.core.types.MeshIntersectionPoint) (a.max) ).uv0, ((global::verb.core.types.MeshIntersectionPoint) (b.min) ).uv0);
				double d4 = global::verb.core.Vec.dot(s4, s4);
				#line 238 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				return ( ( ( d1 < 1e-10 ) && ( d2 < 1e-10 ) ) || ( ( d3 < 1e-10 ) && ( d4 < 1e-10 ) ) );
			}
			#line default
		}
		
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core{
	public  class Intersect_makeMeshIntersectionPolylines_289__Fun : global::haxe.lang.Function {
		public    Intersect_makeMeshIntersectionPolylines_289__Fun() : base(1, 0){
			unchecked {
			}
			#line default
		}
		
		
		public static  global::verb.core.Intersect_makeMeshIntersectionPolylines_289__Fun __hx_current;
		
		public override   object __hx_invoke1_o(double __fn_float1, object __fn_dyn1){
			unchecked {
				#line 289 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::verb.core.types.MeshIntersectionPoint x = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (((global::verb.core.types.MeshIntersectionPoint) (((object) (__fn_float1) )) )) : (((global::verb.core.types.MeshIntersectionPoint) (__fn_dyn1) )) );
				return ( x.adj == default(global::verb.core.types.MeshIntersectionPoint) );
			}
			#line default
		}
		
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core{
	public  class Intersect_lookupAdjacentSegment_394__Fun : global::haxe.lang.Function {
		public    Intersect_lookupAdjacentSegment_394__Fun() : base(1, 0){
			unchecked {
			}
			#line default
		}
		
		
		public static  global::verb.core.Intersect_lookupAdjacentSegment_394__Fun __hx_current;
		
		public override   object __hx_invoke1_o(double __fn_float1, object __fn_dyn1){
			unchecked {
				#line 394 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::verb.core.types.Pair<object, double> r1 = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (((global::verb.core.types.Pair<object, double>) (global::verb.core.types.Pair<object, object>.__hx_cast<object, double>(((global::verb.core.types.Pair) (((object) (__fn_float1) )) ))) )) : (((global::verb.core.types.Pair<object, double>) (global::verb.core.types.Pair<object, object>.__hx_cast<object, double>(((global::verb.core.types.Pair) (__fn_dyn1) ))) )) );
				#line 394 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				return ((global::verb.core.types.MeshIntersectionPoint) (((global::verb.core.KdPoint<object>) (global::verb.core.KdPoint<object>.__hx_cast<object>(((global::verb.core.KdPoint) (r1.item0) ))) ).obj) );
			}
			#line default
		}
		
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core{
	public  class Intersect_lookupAdjacentSegment_391__Fun : global::haxe.lang.Function {
		public    Intersect_lookupAdjacentSegment_391__Fun(global::Array<object> segEnd1) : base(1, 0){
			unchecked {
				#line 392 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				this.segEnd1 = segEnd1;
			}
			#line default
		}
		
		
		public override   object __hx_invoke1_o(double __fn_float1, object __fn_dyn1){
			unchecked {
				#line 391 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::verb.core.types.Pair<object, double> r = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (((global::verb.core.types.Pair<object, double>) (global::verb.core.types.Pair<object, object>.__hx_cast<object, double>(((global::verb.core.types.Pair) (((object) (__fn_float1) )) ))) )) : (((global::verb.core.types.Pair<object, double>) (global::verb.core.types.Pair<object, object>.__hx_cast<object, double>(((global::verb.core.types.Pair) (__fn_dyn1) ))) )) );
				return ( ((global::verb.core.types.MeshIntersectionPoint) (this.segEnd1[0]) ) != ((global::verb.core.types.MeshIntersectionPoint) (((global::verb.core.KdPoint<object>) (global::verb.core.KdPoint<object>.__hx_cast<object>(((global::verb.core.KdPoint) (r.item0) ))) ).obj) ) );
			}
			#line default
		}
		
		
		public  global::Array<object> segEnd1;
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core{
	public  class Intersect_curveAndSurface_418__Fun : global::haxe.lang.Function {
		public    Intersect_curveAndSurface_418__Fun(global::Array<double> tol1) : base(1, 0){
			unchecked {
				#line 418 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				this.tol1 = tol1;
			}
			#line default
		}
		
		
		public override   object __hx_invoke1_o(double __fn_float1, object __fn_dyn1){
			unchecked {
				#line 418 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::verb.core.types.Pair<object, object> inter = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (((global::verb.core.types.Pair<object, object>) (global::verb.core.types.Pair<object, object>.__hx_cast<object, object>(((global::verb.core.types.Pair) (((object) (__fn_float1) )) ))) )) : (((global::verb.core.types.Pair<object, object>) (global::verb.core.types.Pair<object, object>.__hx_cast<object, object>(((global::verb.core.types.Pair) (__fn_dyn1) ))) )) );
				#line 420 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::verb.core.types.NurbsCurveData crvSeg = ((global::verb.core.types.NurbsCurveData) (inter.item0) );
				global::verb.core.types.NurbsSurfaceData srfPart = ((global::verb.core.types.NurbsSurfaceData) (inter.item1) );
				#line 424 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				double min = crvSeg.knots[0];
				double max = default(double);
				#line 425 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				{
					#line 425 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
					global::Array<double> a = crvSeg.knots;
					#line 425 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
					max = a[( a.length - 1 )];
				}
				
				#line 427 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				double u = ( (( min + max )) / 2.0 );
				#line 430 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				double minu = srfPart.knotsU[0];
				double maxu = default(double);
				#line 431 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				{
					#line 431 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
					global::Array<double> a1 = srfPart.knotsU;
					#line 431 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
					maxu = a1[( a1.length - 1 )];
				}
				
				#line 433 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				double minv = srfPart.knotsV[0];
				double maxv = default(double);
				#line 434 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				{
					#line 434 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
					global::Array<double> a2 = srfPart.knotsV;
					#line 434 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
					maxv = a2[( a2.length - 1 )];
				}
				
				#line 436 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::Array<double> uv = new global::Array<double>(new double[]{( (( minu + maxu )) / 2.0 ), ( (( minv + maxv )) / 2.0 )});
				#line 438 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				return global::verb.core.Intersect.curveAndSurfaceWithEstimate(crvSeg, srfPart, new global::Array<double>(new double[]{u}).concat(uv), new global::haxe.lang.Null<double>(this.tol1[0], true));
			}
			#line default
		}
		
		
		public  global::Array<double> tol1;
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core{
	public  class Intersect_curveAndSurfaceWithEstimate_459__Fun : global::haxe.lang.Function {
		public    Intersect_curveAndSurfaceWithEstimate_459__Fun(global::Array<object> surface1, global::Array<object> curve1) : base(1, 1){
			unchecked {
				#line 459 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				this.surface1 = surface1;
				#line 459 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				this.curve1 = curve1;
			}
			#line default
		}
		
		
		public override   double __hx_invoke1_f(double __fn_float1, object __fn_dyn1){
			unchecked {
				#line 459 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::Array<double> x = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (((object) (__fn_float1) )) ))) )) : (((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (__fn_dyn1) ))) )) );
				global::Array<double> p1 = global::verb.core.Eval.rationalCurvePoint(((global::verb.core.types.NurbsCurveData) (this.curve1[0]) ), x[0]);
				global::Array<double> p2 = global::verb.core.Eval.rationalSurfacePoint(((global::verb.core.types.NurbsSurfaceData) (this.surface1[0]) ), x[1], x[2]);
				global::Array<double> p1_p2 = global::verb.core.Vec.sub(p1, p2);
				#line 464 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				return global::verb.core.Vec.dot(p1_p2, p1_p2);
			}
			#line default
		}
		
		
		public  global::Array<object> surface1;
		
		public  global::Array<object> curve1;
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core{
	public  class Intersect_curves_560__Fun : global::haxe.lang.Function {
		public    Intersect_curves_560__Fun(global::Array<double> tolerance1, global::Array<object> curve11, global::Array<object> curve21) : base(1, 0){
			unchecked {
				#line 561 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				this.tolerance1 = tolerance1;
				#line 561 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				this.curve11 = curve11;
				#line 561 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				this.curve21 = curve21;
			}
			#line default
		}
		
		
		public override   object __hx_invoke1_o(double __fn_float1, object __fn_dyn1){
			unchecked {
				#line 560 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::verb.core.types.Pair<object, object> x = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (((global::verb.core.types.Pair<object, object>) (global::verb.core.types.Pair<object, object>.__hx_cast<object, object>(((global::verb.core.types.Pair) (((object) (__fn_float1) )) ))) )) : (((global::verb.core.types.Pair<object, object>) (global::verb.core.types.Pair<object, object>.__hx_cast<object, object>(((global::verb.core.types.Pair) (__fn_dyn1) ))) )) );
				return global::verb.core.Intersect.curves_with_estimate(((global::verb.core.types.NurbsCurveData) (this.curve11[0]) ), ((global::verb.core.types.NurbsCurveData) (this.curve21[0]) ), ((global::verb.core.types.NurbsCurveData) (x.item0) ).knots[0], ((global::verb.core.types.NurbsCurveData) (x.item1) ).knots[0], this.tolerance1[0]);
			}
			#line default
		}
		
		
		public  global::Array<double> tolerance1;
		
		public  global::Array<object> curve11;
		
		public  global::Array<object> curve21;
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core{
	public  class Intersect_curves_with_estimate_584__Fun : global::haxe.lang.Function {
		public    Intersect_curves_with_estimate_584__Fun(global::Array<object> curve11, global::Array<object> curve01) : base(1, 1){
			unchecked {
				#line 584 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				this.curve11 = curve11;
				#line 584 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				this.curve01 = curve01;
			}
			#line default
		}
		
		
		public override   double __hx_invoke1_f(double __fn_float1, object __fn_dyn1){
			unchecked {
				#line 584 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				global::Array<double> x = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (((object) (__fn_float1) )) ))) )) : (((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (__fn_dyn1) ))) )) );
				global::Array<double> p1 = global::verb.core.Eval.rationalCurvePoint(((global::verb.core.types.NurbsCurveData) (this.curve01[0]) ), x[0]);
				global::Array<double> p2 = global::verb.core.Eval.rationalCurvePoint(((global::verb.core.types.NurbsCurveData) (this.curve11[0]) ), x[1]);
				global::Array<double> p1_p2 = global::verb.core.Vec.sub(p1, p2);
				#line 589 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Intersect.hx"
				return global::verb.core.Vec.dot(p1_p2, p1_p2);
			}
			#line default
		}
		
		
		public  global::Array<object> curve11;
		
		public  global::Array<object> curve01;
		
	}
}


