
#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core.types{
	public  class MeshBoundingBoxTree : global::haxe.lang.HxObject, global::verb.core.types.IBoundingBoxTree<int> {
		public    MeshBoundingBoxTree(global::haxe.lang.EmptyObject empty){
			unchecked {
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshBoundingBoxTree.hx"
				{
				}
				
			}
			#line default
		}
		
		
		public    MeshBoundingBoxTree(global::verb.core.types.MeshData mesh, global::Array<int> faceIndices){
			unchecked {
				#line 12 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshBoundingBoxTree.hx"
				global::verb.core.types.MeshBoundingBoxTree.__hx_ctor_verb_core_types_MeshBoundingBoxTree(this, mesh, faceIndices);
			}
			#line default
		}
		
		
		public static   void __hx_ctor_verb_core_types_MeshBoundingBoxTree(global::verb.core.types.MeshBoundingBoxTree __temp_me92, global::verb.core.types.MeshData mesh, global::Array<int> faceIndices){
			unchecked {
				#line 10 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshBoundingBoxTree.hx"
				__temp_me92._empty = false;
				#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshBoundingBoxTree.hx"
				__temp_me92._face = -1;
				#line 14 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshBoundingBoxTree.hx"
				if (( faceIndices == default(global::Array<int>) )) {
					#line 15 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshBoundingBoxTree.hx"
					global::Array<int> _g = new global::Array<int>(new int[]{});
					#line 15 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshBoundingBoxTree.hx"
					{
						#line 15 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshBoundingBoxTree.hx"
						int _g2 = 0;
						#line 15 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshBoundingBoxTree.hx"
						int _g1 = mesh.faces.length;
						#line 15 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshBoundingBoxTree.hx"
						while (( _g2 < _g1 )){
							#line 15 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshBoundingBoxTree.hx"
							int i = _g2++;
							#line 15 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshBoundingBoxTree.hx"
							_g.push(i);
						}
						
					}
					
					#line 15 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshBoundingBoxTree.hx"
					faceIndices = _g;
				}
				
				#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshBoundingBoxTree.hx"
				__temp_me92._boundingBox = global::verb.core.Mesh.makeMeshAabb(mesh, faceIndices);
				#line 20 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshBoundingBoxTree.hx"
				if (( faceIndices.length < 1 )) {
					#line 21 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshBoundingBoxTree.hx"
					__temp_me92._empty = true;
					return ;
				}
				 else {
					#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshBoundingBoxTree.hx"
					if (( faceIndices.length < 2 )) {
						#line 24 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshBoundingBoxTree.hx"
						__temp_me92._face = faceIndices[0];
						return ;
					}
					
				}
				
				#line 28 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshBoundingBoxTree.hx"
				global::Array<int> @as = global::verb.core.Mesh.sortTrianglesOnLongestAxis(__temp_me92._boundingBox, mesh, faceIndices);
				global::Array<int> l = global::verb.core.ArrayExtensions.left<int>(@as);
				global::Array<int> r = global::verb.core.ArrayExtensions.right<int>(@as);
				#line 32 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshBoundingBoxTree.hx"
				__temp_me92._children = new global::verb.core.types.Pair<object, object>(((object) (new global::verb.core.types.MeshBoundingBoxTree(((global::verb.core.types.MeshData) (mesh) ), ((global::Array<int>) (l) ))) ), ((object) (new global::verb.core.types.MeshBoundingBoxTree(((global::verb.core.types.MeshData) (mesh) ), ((global::Array<int>) (r) ))) ));
			}
			#line default
		}
		
		
		public static  new object __hx_createEmpty(){
			unchecked {
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshBoundingBoxTree.hx"
				return new global::verb.core.types.MeshBoundingBoxTree(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) ));
			}
			#line default
		}
		
		
		public static  new object __hx_create(global::Array arr){
			unchecked {
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshBoundingBoxTree.hx"
				return new global::verb.core.types.MeshBoundingBoxTree(((global::verb.core.types.MeshData) (arr[0]) ), ((global::Array<int>) (global::Array<object>.__hx_cast<int>(((global::Array) (arr[1]) ))) ));
			}
			#line default
		}
		
		
		public virtual   object verb_core_types_IBoundingBoxTree_cast<T_c>(){
			unchecked {
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshBoundingBoxTree.hx"
				return this;
			}
			#line default
		}
		
		
		public  global::verb.core.types.Pair<object, object> _children;
		
		public  global::verb.core.types.BoundingBox _boundingBox;
		
		public  int _face;
		
		public  bool _empty;
		
		public virtual   global::verb.core.types.Pair<object, object> split(){
			unchecked {
				#line 39 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshBoundingBoxTree.hx"
				return this._children;
			}
			#line default
		}
		
		
		public virtual   global::verb.core.types.BoundingBox boundingBox(){
			unchecked {
				#line 43 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshBoundingBoxTree.hx"
				return this._boundingBox;
			}
			#line default
		}
		
		
		public virtual   int @yield(){
			unchecked {
				#line 47 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshBoundingBoxTree.hx"
				return this._face;
			}
			#line default
		}
		
		
		public virtual   bool indivisible(double tolerance){
			unchecked {
				#line 51 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshBoundingBoxTree.hx"
				return ( this._children == default(global::verb.core.types.Pair<object, object>) );
			}
			#line default
		}
		
		
		public virtual   bool empty(){
			unchecked {
				#line 55 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshBoundingBoxTree.hx"
				return this._empty;
			}
			#line default
		}
		
		
		public override   double __hx_setField_f(string field, int hash, double @value, bool handleProperties){
			unchecked {
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshBoundingBoxTree.hx"
				switch (hash){
					case 1992740988:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshBoundingBoxTree.hx"
						this._face = ((int) (@value) );
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshBoundingBoxTree.hx"
						return @value;
					}
					
					
					default:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshBoundingBoxTree.hx"
						return base.__hx_setField_f(field, hash, @value, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_setField(string field, int hash, object @value, bool handleProperties){
			unchecked {
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshBoundingBoxTree.hx"
				switch (hash){
					case 1807843790:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshBoundingBoxTree.hx"
						this._empty = global::haxe.lang.Runtime.toBool(@value);
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshBoundingBoxTree.hx"
						return @value;
					}
					
					
					case 1992740988:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshBoundingBoxTree.hx"
						this._face = ((int) (global::haxe.lang.Runtime.toInt(@value)) );
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshBoundingBoxTree.hx"
						return @value;
					}
					
					
					case 1806779144:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshBoundingBoxTree.hx"
						this._boundingBox = ((global::verb.core.types.BoundingBox) (@value) );
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshBoundingBoxTree.hx"
						return @value;
					}
					
					
					case 939528350:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshBoundingBoxTree.hx"
						this._children = ((global::verb.core.types.Pair<object, object>) (global::verb.core.types.Pair<object, object>.__hx_cast<object, object>(((global::verb.core.types.Pair) (@value) ))) );
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshBoundingBoxTree.hx"
						return @value;
					}
					
					
					default:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshBoundingBoxTree.hx"
						return base.__hx_setField(field, hash, @value, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_getField(string field, int hash, bool throwErrors, bool isCheck, bool handleProperties){
			unchecked {
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshBoundingBoxTree.hx"
				switch (hash){
					case 1876572813:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshBoundingBoxTree.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("empty") ), ((int) (1876572813) ))) );
					}
					
					
					case 2052836104:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshBoundingBoxTree.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("indivisible") ), ((int) (2052836104) ))) );
					}
					
					
					case 1899010637:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshBoundingBoxTree.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("yield") ), ((int) (1899010637) ))) );
					}
					
					
					case 94868743:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshBoundingBoxTree.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("boundingBox") ), ((int) (94868743) ))) );
					}
					
					
					case 24046298:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshBoundingBoxTree.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("split") ), ((int) (24046298) ))) );
					}
					
					
					case 1807843790:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshBoundingBoxTree.hx"
						return this._empty;
					}
					
					
					case 1992740988:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshBoundingBoxTree.hx"
						return this._face;
					}
					
					
					case 1806779144:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshBoundingBoxTree.hx"
						return this._boundingBox;
					}
					
					
					case 939528350:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshBoundingBoxTree.hx"
						return this._children;
					}
					
					
					default:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshBoundingBoxTree.hx"
						return base.__hx_getField(field, hash, throwErrors, isCheck, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   double __hx_getField_f(string field, int hash, bool throwErrors, bool handleProperties){
			unchecked {
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshBoundingBoxTree.hx"
				switch (hash){
					case 1992740988:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshBoundingBoxTree.hx"
						return ((double) (this._face) );
					}
					
					
					default:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshBoundingBoxTree.hx"
						return base.__hx_getField_f(field, hash, throwErrors, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_invokeField(string field, int hash, global::Array dynargs){
			unchecked {
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshBoundingBoxTree.hx"
				switch (hash){
					case 1876572813:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshBoundingBoxTree.hx"
						return this.empty();
					}
					
					
					case 2052836104:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshBoundingBoxTree.hx"
						return this.indivisible(((double) (global::haxe.lang.Runtime.toDouble(dynargs[0])) ));
					}
					
					
					case 1899010637:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshBoundingBoxTree.hx"
						return this.@yield();
					}
					
					
					case 94868743:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshBoundingBoxTree.hx"
						return this.boundingBox();
					}
					
					
					case 24046298:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshBoundingBoxTree.hx"
						return this.split();
					}
					
					
					default:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshBoundingBoxTree.hx"
						return base.__hx_invokeField(field, hash, dynargs);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   void __hx_getFields(global::Array<object> baseArr){
			unchecked {
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshBoundingBoxTree.hx"
				baseArr.push("_empty");
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshBoundingBoxTree.hx"
				baseArr.push("_face");
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshBoundingBoxTree.hx"
				baseArr.push("_boundingBox");
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshBoundingBoxTree.hx"
				baseArr.push("_children");
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshBoundingBoxTree.hx"
				{
					#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshBoundingBoxTree.hx"
					base.__hx_getFields(baseArr);
				}
				
			}
			#line default
		}
		
		
	}
}


