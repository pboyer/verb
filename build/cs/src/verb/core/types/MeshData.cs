
#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core.types{
	public  class MeshData : global::haxe.lang.HxObject {
		public    MeshData(global::haxe.lang.EmptyObject empty){
			unchecked {
				#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshData.hx"
				{
				}
				
			}
			#line default
		}
		
		
		public    MeshData(global::Array<object> faces, global::Array<object> points, global::Array<object> normals, global::Array<object> uvs){
			unchecked {
				#line 16 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshData.hx"
				global::verb.core.types.MeshData.__hx_ctor_verb_core_types_MeshData(this, faces, points, normals, uvs);
			}
			#line default
		}
		
		
		public static   void __hx_ctor_verb_core_types_MeshData(global::verb.core.types.MeshData __temp_me93, global::Array<object> faces, global::Array<object> points, global::Array<object> normals, global::Array<object> uvs){
			unchecked {
				#line 17 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshData.hx"
				__temp_me93.faces = faces;
				__temp_me93.points = points;
				__temp_me93.normals = normals;
				__temp_me93.uvs = uvs;
			}
			#line default
		}
		
		
		public static   global::verb.core.types.MeshData empty(){
			unchecked {
				#line 24 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshData.hx"
				return new global::verb.core.types.MeshData(((global::Array<object>) (new global::Array<object>(new object[]{})) ), ((global::Array<object>) (new global::Array<object>(new object[]{})) ), ((global::Array<object>) (new global::Array<object>(new object[]{})) ), ((global::Array<object>) (new global::Array<object>(new object[]{})) ));
			}
			#line default
		}
		
		
		public static  new object __hx_createEmpty(){
			unchecked {
				#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshData.hx"
				return new global::verb.core.types.MeshData(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) ));
			}
			#line default
		}
		
		
		public static  new object __hx_create(global::Array arr){
			unchecked {
				#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshData.hx"
				return new global::verb.core.types.MeshData(((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (arr[0]) ))) ), ((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (arr[1]) ))) ), ((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (arr[2]) ))) ), ((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (arr[3]) ))) ));
			}
			#line default
		}
		
		
		public  global::Array<object> faces;
		
		public  global::Array<object> points;
		
		public  global::Array<object> normals;
		
		public  global::Array<object> uvs;
		
		public override   object __hx_setField(string field, int hash, object @value, bool handleProperties){
			unchecked {
				#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshData.hx"
				switch (hash){
					case 5844722:
					{
						#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshData.hx"
						this.uvs = ((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (@value) ))) );
						#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshData.hx"
						return @value;
					}
					
					
					case 735735916:
					{
						#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshData.hx"
						this.normals = ((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (@value) ))) );
						#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshData.hx"
						return @value;
					}
					
					
					case 1999508003:
					{
						#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshData.hx"
						this.points = ((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (@value) ))) );
						#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshData.hx"
						return @value;
					}
					
					
					case 2068337974:
					{
						#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshData.hx"
						this.faces = ((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (@value) ))) );
						#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshData.hx"
						return @value;
					}
					
					
					default:
					{
						#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshData.hx"
						return base.__hx_setField(field, hash, @value, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_getField(string field, int hash, bool throwErrors, bool isCheck, bool handleProperties){
			unchecked {
				#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshData.hx"
				switch (hash){
					case 5844722:
					{
						#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshData.hx"
						return this.uvs;
					}
					
					
					case 735735916:
					{
						#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshData.hx"
						return this.normals;
					}
					
					
					case 1999508003:
					{
						#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshData.hx"
						return this.points;
					}
					
					
					case 2068337974:
					{
						#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshData.hx"
						return this.faces;
					}
					
					
					default:
					{
						#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshData.hx"
						return base.__hx_getField(field, hash, throwErrors, isCheck, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   void __hx_getFields(global::Array<object> baseArr){
			unchecked {
				#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshData.hx"
				baseArr.push("uvs");
				#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshData.hx"
				baseArr.push("normals");
				#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshData.hx"
				baseArr.push("points");
				#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshData.hx"
				baseArr.push("faces");
				#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshData.hx"
				{
					#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/MeshData.hx"
					base.__hx_getFields(baseArr);
				}
				
			}
			#line default
		}
		
		
	}
}


