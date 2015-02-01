
#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core.types{
	public  class LazyMeshBoundingBoxTree : global::haxe.lang.HxObject, global::verb.core.types.IBoundingBoxTree<int> {
		public    LazyMeshBoundingBoxTree(global::haxe.lang.EmptyObject empty){
			unchecked {
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyMeshBoundingBoxTree.hx"
				{
				}
				
			}
			#line default
		}
		
		
		public    LazyMeshBoundingBoxTree(global::verb.core.types.MeshData mesh, global::Array<int> faceIndices){
			unchecked {
				#line 10 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyMeshBoundingBoxTree.hx"
				global::verb.core.types.LazyMeshBoundingBoxTree.__hx_ctor_verb_core_types_LazyMeshBoundingBoxTree(this, mesh, faceIndices);
			}
			#line default
		}
		
		
		public static   void __hx_ctor_verb_core_types_LazyMeshBoundingBoxTree(global::verb.core.types.LazyMeshBoundingBoxTree __temp_me88, global::verb.core.types.MeshData mesh, global::Array<int> faceIndices){
			unchecked {
				#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyMeshBoundingBoxTree.hx"
				__temp_me88._boundingBox = default(global::verb.core.types.BoundingBox);
				#line 11 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyMeshBoundingBoxTree.hx"
				__temp_me88._mesh = mesh;
				if (( faceIndices == default(global::Array<int>) )) {
					#line 13 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyMeshBoundingBoxTree.hx"
					global::Array<int> _g = new global::Array<int>(new int[]{});
					#line 13 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyMeshBoundingBoxTree.hx"
					{
						#line 13 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyMeshBoundingBoxTree.hx"
						int _g2 = 0;
						#line 13 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyMeshBoundingBoxTree.hx"
						int _g1 = mesh.faces.length;
						#line 13 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyMeshBoundingBoxTree.hx"
						while (( _g2 < _g1 )){
							#line 13 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyMeshBoundingBoxTree.hx"
							int i = _g2++;
							#line 13 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyMeshBoundingBoxTree.hx"
							_g.push(i);
						}
						
					}
					
					#line 13 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyMeshBoundingBoxTree.hx"
					faceIndices = _g;
				}
				
				#line 15 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyMeshBoundingBoxTree.hx"
				__temp_me88._faceIndices = faceIndices;
			}
			#line default
		}
		
		
		public static  new object __hx_createEmpty(){
			unchecked {
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyMeshBoundingBoxTree.hx"
				return new global::verb.core.types.LazyMeshBoundingBoxTree(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) ));
			}
			#line default
		}
		
		
		public static  new object __hx_create(global::Array arr){
			unchecked {
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyMeshBoundingBoxTree.hx"
				return new global::verb.core.types.LazyMeshBoundingBoxTree(((global::verb.core.types.MeshData) (arr[0]) ), ((global::Array<int>) (global::Array<object>.__hx_cast<int>(((global::Array) (arr[1]) ))) ));
			}
			#line default
		}
		
		
		public virtual   object verb_core_types_IBoundingBoxTree_cast<T_c>(){
			unchecked {
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyMeshBoundingBoxTree.hx"
				return this;
			}
			#line default
		}
		
		
		public  global::verb.core.types.MeshData _mesh;
		
		public  global::Array<int> _faceIndices;
		
		public  global::verb.core.types.BoundingBox _boundingBox;
		
		public virtual   global::verb.core.types.Pair<object, object> split(){
			unchecked {
				#line 19 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyMeshBoundingBoxTree.hx"
				global::Array<int> @as = global::verb.core.Mesh.sortTrianglesOnLongestAxis(this.boundingBox(), this._mesh, this._faceIndices);
				global::Array<int> l = global::verb.core.ArrayExtensions.left<int>(@as);
				global::Array<int> r = global::verb.core.ArrayExtensions.right<int>(@as);
				#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyMeshBoundingBoxTree.hx"
				return new global::verb.core.types.Pair<object, object>(((object) (new global::verb.core.types.LazyMeshBoundingBoxTree(((global::verb.core.types.MeshData) (this._mesh) ), ((global::Array<int>) (l) ))) ), ((object) (new global::verb.core.types.LazyMeshBoundingBoxTree(((global::verb.core.types.MeshData) (this._mesh) ), ((global::Array<int>) (r) ))) ));
			}
			#line default
		}
		
		
		public virtual   global::verb.core.types.BoundingBox boundingBox(){
			unchecked {
				#line 29 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyMeshBoundingBoxTree.hx"
				if (( this._boundingBox == default(global::verb.core.types.BoundingBox) )) {
					#line 30 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyMeshBoundingBoxTree.hx"
					this._boundingBox = global::verb.core.Mesh.makeMeshAabb(this._mesh, this._faceIndices);
				}
				
				#line 32 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyMeshBoundingBoxTree.hx"
				return this._boundingBox;
			}
			#line default
		}
		
		
		public virtual   int @yield(){
			unchecked {
				#line 36 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyMeshBoundingBoxTree.hx"
				return this._faceIndices[0];
			}
			#line default
		}
		
		
		public virtual   bool indivisible(double tolerance){
			unchecked {
				#line 40 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyMeshBoundingBoxTree.hx"
				return ( this._faceIndices.length == 1 );
			}
			#line default
		}
		
		
		public virtual   bool empty(){
			unchecked {
				#line 44 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyMeshBoundingBoxTree.hx"
				return ( this._faceIndices.length == 0 );
			}
			#line default
		}
		
		
		public override   object __hx_setField(string field, int hash, object @value, bool handleProperties){
			unchecked {
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyMeshBoundingBoxTree.hx"
				switch (hash){
					case 1806779144:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyMeshBoundingBoxTree.hx"
						this._boundingBox = ((global::verb.core.types.BoundingBox) (@value) );
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyMeshBoundingBoxTree.hx"
						return @value;
					}
					
					
					case 1875371531:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyMeshBoundingBoxTree.hx"
						this._faceIndices = ((global::Array<int>) (global::Array<object>.__hx_cast<int>(((global::Array) (@value) ))) );
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyMeshBoundingBoxTree.hx"
						return @value;
					}
					
					
					case 2070570444:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyMeshBoundingBoxTree.hx"
						this._mesh = ((global::verb.core.types.MeshData) (@value) );
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyMeshBoundingBoxTree.hx"
						return @value;
					}
					
					
					default:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyMeshBoundingBoxTree.hx"
						return base.__hx_setField(field, hash, @value, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_getField(string field, int hash, bool throwErrors, bool isCheck, bool handleProperties){
			unchecked {
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyMeshBoundingBoxTree.hx"
				switch (hash){
					case 1876572813:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyMeshBoundingBoxTree.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("empty") ), ((int) (1876572813) ))) );
					}
					
					
					case 2052836104:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyMeshBoundingBoxTree.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("indivisible") ), ((int) (2052836104) ))) );
					}
					
					
					case 1899010637:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyMeshBoundingBoxTree.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("yield") ), ((int) (1899010637) ))) );
					}
					
					
					case 94868743:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyMeshBoundingBoxTree.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("boundingBox") ), ((int) (94868743) ))) );
					}
					
					
					case 24046298:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyMeshBoundingBoxTree.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("split") ), ((int) (24046298) ))) );
					}
					
					
					case 1806779144:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyMeshBoundingBoxTree.hx"
						return this._boundingBox;
					}
					
					
					case 1875371531:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyMeshBoundingBoxTree.hx"
						return this._faceIndices;
					}
					
					
					case 2070570444:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyMeshBoundingBoxTree.hx"
						return this._mesh;
					}
					
					
					default:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyMeshBoundingBoxTree.hx"
						return base.__hx_getField(field, hash, throwErrors, isCheck, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_invokeField(string field, int hash, global::Array dynargs){
			unchecked {
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyMeshBoundingBoxTree.hx"
				switch (hash){
					case 1876572813:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyMeshBoundingBoxTree.hx"
						return this.empty();
					}
					
					
					case 2052836104:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyMeshBoundingBoxTree.hx"
						return this.indivisible(((double) (global::haxe.lang.Runtime.toDouble(dynargs[0])) ));
					}
					
					
					case 1899010637:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyMeshBoundingBoxTree.hx"
						return this.@yield();
					}
					
					
					case 94868743:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyMeshBoundingBoxTree.hx"
						return this.boundingBox();
					}
					
					
					case 24046298:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyMeshBoundingBoxTree.hx"
						return this.split();
					}
					
					
					default:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyMeshBoundingBoxTree.hx"
						return base.__hx_invokeField(field, hash, dynargs);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   void __hx_getFields(global::Array<object> baseArr){
			unchecked {
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyMeshBoundingBoxTree.hx"
				baseArr.push("_boundingBox");
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyMeshBoundingBoxTree.hx"
				baseArr.push("_faceIndices");
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyMeshBoundingBoxTree.hx"
				baseArr.push("_mesh");
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyMeshBoundingBoxTree.hx"
				{
					#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyMeshBoundingBoxTree.hx"
					base.__hx_getFields(baseArr);
				}
				
			}
			#line default
		}
		
		
	}
}


