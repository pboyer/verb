
#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core.types{
	public  class BoundingBoxNode : global::haxe.lang.HxObject {
		public    BoundingBoxNode(global::haxe.lang.EmptyObject empty){
			unchecked {
				#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBoxNode.hx"
				{
				}
				
			}
			#line default
		}
		
		
		public    BoundingBoxNode(global::verb.core.types.BoundingBox bb){
			unchecked {
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBoxNode.hx"
				global::verb.core.types.BoundingBoxNode.__hx_ctor_verb_core_types_BoundingBoxNode(this, bb);
			}
			#line default
		}
		
		
		public static   void __hx_ctor_verb_core_types_BoundingBoxNode(global::verb.core.types.BoundingBoxNode __temp_me79, global::verb.core.types.BoundingBox bb){
			unchecked {
				#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBoxNode.hx"
				__temp_me79.boundingBox = bb;
			}
			#line default
		}
		
		
		public static  new object __hx_createEmpty(){
			unchecked {
				#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBoxNode.hx"
				return new global::verb.core.types.BoundingBoxNode(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) ));
			}
			#line default
		}
		
		
		public static  new object __hx_create(global::Array arr){
			unchecked {
				#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBoxNode.hx"
				return new global::verb.core.types.BoundingBoxNode(((global::verb.core.types.BoundingBox) (arr[0]) ));
			}
			#line default
		}
		
		
		public  global::verb.core.types.BoundingBox boundingBox;
		
		public override   object __hx_setField(string field, int hash, object @value, bool handleProperties){
			unchecked {
				#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBoxNode.hx"
				switch (hash){
					case 94868743:
					{
						#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBoxNode.hx"
						this.boundingBox = ((global::verb.core.types.BoundingBox) (@value) );
						#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBoxNode.hx"
						return @value;
					}
					
					
					default:
					{
						#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBoxNode.hx"
						return base.__hx_setField(field, hash, @value, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_getField(string field, int hash, bool throwErrors, bool isCheck, bool handleProperties){
			unchecked {
				#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBoxNode.hx"
				switch (hash){
					case 94868743:
					{
						#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBoxNode.hx"
						return this.boundingBox;
					}
					
					
					default:
					{
						#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBoxNode.hx"
						return base.__hx_getField(field, hash, throwErrors, isCheck, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   void __hx_getFields(global::Array<object> baseArr){
			unchecked {
				#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBoxNode.hx"
				baseArr.push("boundingBox");
				#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBoxNode.hx"
				{
					#line 4 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBoxNode.hx"
					base.__hx_getFields(baseArr);
				}
				
			}
			#line default
		}
		
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core.types{
	public  class BoundingBoxInnerNode : global::verb.core.types.BoundingBoxNode {
		public    BoundingBoxInnerNode(global::haxe.lang.EmptyObject empty) : base(global::haxe.lang.EmptyObject.EMPTY){
			unchecked {
			}
			#line default
		}
		
		
		public    BoundingBoxInnerNode(global::verb.core.types.BoundingBox bb, global::Array<object> children) : base(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) )){
			unchecked {
				#line 17 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBoxNode.hx"
				global::verb.core.types.BoundingBoxInnerNode.__hx_ctor_verb_core_types_BoundingBoxInnerNode(this, bb, children);
			}
			#line default
		}
		
		
		public static   void __hx_ctor_verb_core_types_BoundingBoxInnerNode(global::verb.core.types.BoundingBoxInnerNode __temp_me80, global::verb.core.types.BoundingBox bb, global::Array<object> children){
			unchecked {
				#line 17 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBoxNode.hx"
				global::verb.core.types.BoundingBoxNode.__hx_ctor_verb_core_types_BoundingBoxNode(__temp_me80, bb);
				__temp_me80.children = children;
			}
			#line default
		}
		
		
		public static  new object __hx_createEmpty(){
			unchecked {
				#line 13 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBoxNode.hx"
				return new global::verb.core.types.BoundingBoxInnerNode(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) ));
			}
			#line default
		}
		
		
		public static  new object __hx_create(global::Array arr){
			unchecked {
				#line 13 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBoxNode.hx"
				return new global::verb.core.types.BoundingBoxInnerNode(((global::verb.core.types.BoundingBox) (arr[0]) ), ((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (arr[1]) ))) ));
			}
			#line default
		}
		
		
		public  global::Array<object> children;
		
		public override   object __hx_setField(string field, int hash, object @value, bool handleProperties){
			unchecked {
				#line 13 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBoxNode.hx"
				switch (hash){
					case 1886001471:
					{
						#line 13 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBoxNode.hx"
						this.children = ((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (@value) ))) );
						#line 13 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBoxNode.hx"
						return @value;
					}
					
					
					default:
					{
						#line 13 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBoxNode.hx"
						return base.__hx_setField(field, hash, @value, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_getField(string field, int hash, bool throwErrors, bool isCheck, bool handleProperties){
			unchecked {
				#line 13 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBoxNode.hx"
				switch (hash){
					case 1886001471:
					{
						#line 13 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBoxNode.hx"
						return this.children;
					}
					
					
					default:
					{
						#line 13 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBoxNode.hx"
						return base.__hx_getField(field, hash, throwErrors, isCheck, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   void __hx_getFields(global::Array<object> baseArr){
			unchecked {
				#line 13 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBoxNode.hx"
				baseArr.push("children");
				#line 13 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBoxNode.hx"
				{
					#line 13 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBoxNode.hx"
					base.__hx_getFields(baseArr);
				}
				
			}
			#line default
		}
		
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core.types{
	public  class BoundingBoxLeaf<T> : global::verb.core.types.BoundingBoxNode, global::verb.core.types.BoundingBoxLeaf {
		public    BoundingBoxLeaf(global::haxe.lang.EmptyObject empty) : base(global::haxe.lang.EmptyObject.EMPTY){
			unchecked {
			}
			#line default
		}
		
		
		public    BoundingBoxLeaf(global::verb.core.types.BoundingBox bb, T item) : base(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) )){
			unchecked {
				#line 27 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBoxNode.hx"
				global::verb.core.types.BoundingBoxLeaf<object>.__hx_ctor_verb_core_types_BoundingBoxLeaf<T>(this, bb, item);
			}
			#line default
		}
		
		
		public static   void __hx_ctor_verb_core_types_BoundingBoxLeaf<T_c>(global::verb.core.types.BoundingBoxLeaf<T_c> __temp_me81, global::verb.core.types.BoundingBox bb, T_c item){
			unchecked {
				#line 27 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBoxNode.hx"
				global::verb.core.types.BoundingBoxNode.__hx_ctor_verb_core_types_BoundingBoxNode(__temp_me81, bb);
				__temp_me81.item = item;
			}
			#line default
		}
		
		
		public static   object __hx_cast<T_c_c>(global::verb.core.types.BoundingBoxLeaf me){
			unchecked {
				#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBoxNode.hx"
				return ( (( me != default(global::verb.core.types.BoundingBoxLeaf) )) ? (me.verb_core_types_BoundingBoxLeaf_cast<T_c_c>()) : (default(global::verb.core.types.BoundingBoxLeaf)) );
			}
			#line default
		}
		
		
		public static  new object __hx_createEmpty(){
			unchecked {
				#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBoxNode.hx"
				return new global::verb.core.types.BoundingBoxLeaf<object>(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) ));
			}
			#line default
		}
		
		
		public static  new object __hx_create(global::Array arr){
			unchecked {
				#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBoxNode.hx"
				return new global::verb.core.types.BoundingBoxLeaf<object>(((global::verb.core.types.BoundingBox) (arr[0]) ), ((object) (arr[1]) ));
			}
			#line default
		}
		
		
		public virtual   object verb_core_types_BoundingBoxLeaf_cast<T_c>(){
			unchecked {
				#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBoxNode.hx"
				if (global::haxe.lang.Runtime.eq(typeof(T), typeof(T_c))) {
					#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBoxNode.hx"
					return this;
				}
				
				#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBoxNode.hx"
				global::verb.core.types.BoundingBoxLeaf<T_c> new_me = new global::verb.core.types.BoundingBoxLeaf<T_c>(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) ));
				#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBoxNode.hx"
				{
					#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBoxNode.hx"
					object __temp_iterator174 = global::Reflect.fields(this).iterator();
					#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBoxNode.hx"
					while (global::haxe.lang.Runtime.toBool(global::haxe.lang.Runtime.callField(__temp_iterator174, "hasNext", 407283053, default(global::Array)))){
						#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBoxNode.hx"
						string field = global::haxe.lang.Runtime.toString(global::haxe.lang.Runtime.callField(__temp_iterator174, "next", 1224901875, default(global::Array)));
						#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBoxNode.hx"
						switch (field){
							default:
							{
								#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBoxNode.hx"
								global::Reflect.setField(new_me, field, ((object) (global::Reflect.field(this, field)) ));
								#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBoxNode.hx"
								break;
							}
							
						}
						
					}
					
				}
				
				#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBoxNode.hx"
				return new_me;
			}
			#line default
		}
		
		
		public  T item;
		
		public override   double __hx_setField_f(string field, int hash, double @value, bool handleProperties){
			unchecked {
				#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBoxNode.hx"
				switch (hash){
					case 1170195731:
					{
						#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBoxNode.hx"
						this.item = global::haxe.lang.Runtime.genericCast<T>(((object) (@value) ));
						#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBoxNode.hx"
						return ((double) (global::haxe.lang.Runtime.toDouble(((object) (@value) ))) );
					}
					
					
					default:
					{
						#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBoxNode.hx"
						return base.__hx_setField_f(field, hash, @value, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_setField(string field, int hash, object @value, bool handleProperties){
			unchecked {
				#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBoxNode.hx"
				switch (hash){
					case 1170195731:
					{
						#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBoxNode.hx"
						this.item = global::haxe.lang.Runtime.genericCast<T>(@value);
						#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBoxNode.hx"
						return @value;
					}
					
					
					default:
					{
						#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBoxNode.hx"
						return base.__hx_setField(field, hash, @value, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_getField(string field, int hash, bool throwErrors, bool isCheck, bool handleProperties){
			unchecked {
				#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBoxNode.hx"
				switch (hash){
					case 1170195731:
					{
						#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBoxNode.hx"
						return this.item;
					}
					
					
					default:
					{
						#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBoxNode.hx"
						return base.__hx_getField(field, hash, throwErrors, isCheck, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   double __hx_getField_f(string field, int hash, bool throwErrors, bool handleProperties){
			unchecked {
				#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBoxNode.hx"
				switch (hash){
					case 1170195731:
					{
						#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBoxNode.hx"
						return ((double) (global::haxe.lang.Runtime.toDouble(((object) (this.item) ))) );
					}
					
					
					default:
					{
						#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBoxNode.hx"
						return base.__hx_getField_f(field, hash, throwErrors, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   void __hx_getFields(global::Array<object> baseArr){
			unchecked {
				#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBoxNode.hx"
				baseArr.push("item");
				#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBoxNode.hx"
				{
					#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBoxNode.hx"
					base.__hx_getFields(baseArr);
				}
				
			}
			#line default
		}
		
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core.types{
	public  interface BoundingBoxLeaf : global::haxe.lang.IHxObject, global::haxe.lang.IGenericObject {
		   object verb_core_types_BoundingBoxLeaf_cast<T_c>();
		
	}
}


