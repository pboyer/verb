
#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core{
	public  class KdPoint<T> : global::haxe.lang.HxObject, global::verb.core.KdPoint {
		public    KdPoint(global::haxe.lang.EmptyObject empty){
			unchecked {
				#line 19 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				{
				}
				
			}
			#line default
		}
		
		
		public    KdPoint(global::Array<double> point, T obj){
			unchecked {
				#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				global::verb.core.KdPoint<object>.__hx_ctor_verb_core_KdPoint<T>(this, point, obj);
			}
			#line default
		}
		
		
		public static   void __hx_ctor_verb_core_KdPoint<T_c>(global::verb.core.KdPoint<T_c> __temp_me51, global::Array<double> point, T_c obj){
			unchecked {
				#line 24 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				__temp_me51.point = point;
				__temp_me51.obj = obj;
			}
			#line default
		}
		
		
		public static   object __hx_cast<T_c_c>(global::verb.core.KdPoint me){
			unchecked {
				#line 19 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				return ( (( me != default(global::verb.core.KdPoint) )) ? (me.verb_core_KdPoint_cast<T_c_c>()) : (default(global::verb.core.KdPoint)) );
			}
			#line default
		}
		
		
		public static  new object __hx_createEmpty(){
			unchecked {
				#line 19 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				return new global::verb.core.KdPoint<object>(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) ));
			}
			#line default
		}
		
		
		public static  new object __hx_create(global::Array arr){
			unchecked {
				#line 19 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				return new global::verb.core.KdPoint<object>(((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (arr[0]) ))) ), ((object) (arr[1]) ));
			}
			#line default
		}
		
		
		public virtual   object verb_core_KdPoint_cast<T_c>(){
			unchecked {
				#line 19 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				if (global::haxe.lang.Runtime.eq(typeof(T), typeof(T_c))) {
					#line 19 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
					return this;
				}
				
				#line 19 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				global::verb.core.KdPoint<T_c> new_me = new global::verb.core.KdPoint<T_c>(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) ));
				#line 19 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				{
					#line 19 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
					object __temp_iterator170 = global::Reflect.fields(this).iterator();
					#line 19 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
					while (global::haxe.lang.Runtime.toBool(global::haxe.lang.Runtime.callField(__temp_iterator170, "hasNext", 407283053, default(global::Array)))){
						#line 19 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						string field = global::haxe.lang.Runtime.toString(global::haxe.lang.Runtime.callField(__temp_iterator170, "next", 1224901875, default(global::Array)));
						#line 19 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						switch (field){
							default:
							{
								#line 19 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
								global::Reflect.setField(new_me, field, ((object) (global::Reflect.field(this, field)) ));
								#line 19 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
								break;
							}
							
						}
						
					}
					
				}
				
				#line 19 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				return new_me;
			}
			#line default
		}
		
		
		public  global::Array<double> point;
		
		public  T obj;
		
		public override   double __hx_setField_f(string field, int hash, double @value, bool handleProperties){
			unchecked {
				#line 19 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				switch (hash){
					case 5541879:
					{
						#line 19 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						this.obj = global::haxe.lang.Runtime.genericCast<T>(((object) (@value) ));
						#line 19 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						return ((double) (global::haxe.lang.Runtime.toDouble(((object) (@value) ))) );
					}
					
					
					default:
					{
						#line 19 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						return base.__hx_setField_f(field, hash, @value, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_setField(string field, int hash, object @value, bool handleProperties){
			unchecked {
				#line 19 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				switch (hash){
					case 5541879:
					{
						#line 19 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						this.obj = global::haxe.lang.Runtime.genericCast<T>(@value);
						#line 19 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						return @value;
					}
					
					
					case 1183822928:
					{
						#line 19 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						this.point = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (@value) ))) );
						#line 19 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						return @value;
					}
					
					
					default:
					{
						#line 19 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						return base.__hx_setField(field, hash, @value, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_getField(string field, int hash, bool throwErrors, bool isCheck, bool handleProperties){
			unchecked {
				#line 19 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				switch (hash){
					case 5541879:
					{
						#line 19 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						return this.obj;
					}
					
					
					case 1183822928:
					{
						#line 19 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						return this.point;
					}
					
					
					default:
					{
						#line 19 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						return base.__hx_getField(field, hash, throwErrors, isCheck, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   double __hx_getField_f(string field, int hash, bool throwErrors, bool handleProperties){
			unchecked {
				#line 19 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				switch (hash){
					case 5541879:
					{
						#line 19 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						return ((double) (global::haxe.lang.Runtime.toDouble(((object) (this.obj) ))) );
					}
					
					
					default:
					{
						#line 19 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						return base.__hx_getField_f(field, hash, throwErrors, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   void __hx_getFields(global::Array<object> baseArr){
			unchecked {
				#line 19 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				baseArr.push("obj");
				#line 19 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				baseArr.push("point");
				#line 19 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				{
					#line 19 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
					base.__hx_getFields(baseArr);
				}
				
			}
			#line default
		}
		
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core{
	public  interface KdPoint : global::haxe.lang.IHxObject, global::haxe.lang.IGenericObject {
		   object verb_core_KdPoint_cast<T_c>();
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core{
	public  class KdNode<T> : global::haxe.lang.HxObject, global::verb.core.KdNode {
		public    KdNode(global::haxe.lang.EmptyObject empty){
			unchecked {
				#line 30 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				{
				}
				
			}
			#line default
		}
		
		
		public    KdNode(global::verb.core.KdPoint<T> kdPoint, int dimension, global::verb.core.KdNode<T> parent){
			unchecked {
				#line 37 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				global::verb.core.KdNode<object>.__hx_ctor_verb_core_KdNode<T>(this, kdPoint, dimension, parent);
			}
			#line default
		}
		
		
		public static   void __hx_ctor_verb_core_KdNode<T_c>(global::verb.core.KdNode<T_c> __temp_me52, global::verb.core.KdPoint<T_c> kdPoint, int dimension, global::verb.core.KdNode<T_c> parent){
			unchecked {
				#line 38 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				__temp_me52.kdPoint = kdPoint;
				__temp_me52.left = default(global::verb.core.KdNode<T_c>);
				__temp_me52.right = default(global::verb.core.KdNode<T_c>);
				__temp_me52.parent = parent;
				__temp_me52.dimension = dimension;
			}
			#line default
		}
		
		
		public static   object __hx_cast<T_c_c>(global::verb.core.KdNode me){
			unchecked {
				#line 30 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				return ( (( me != default(global::verb.core.KdNode) )) ? (me.verb_core_KdNode_cast<T_c_c>()) : (default(global::verb.core.KdNode)) );
			}
			#line default
		}
		
		
		public static  new object __hx_createEmpty(){
			unchecked {
				#line 30 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				return new global::verb.core.KdNode<object>(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) ));
			}
			#line default
		}
		
		
		public static  new object __hx_create(global::Array arr){
			unchecked {
				#line 30 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				return new global::verb.core.KdNode<object>(((global::verb.core.KdPoint<object>) (global::verb.core.KdPoint<object>.__hx_cast<object>(((global::verb.core.KdPoint) (arr[0]) ))) ), ((int) (global::haxe.lang.Runtime.toInt(arr[1])) ), ((global::verb.core.KdNode<object>) (global::verb.core.KdNode<object>.__hx_cast<object>(((global::verb.core.KdNode) (arr[2]) ))) ));
			}
			#line default
		}
		
		
		public virtual   object verb_core_KdNode_cast<T_c>(){
			unchecked {
				#line 30 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				if (global::haxe.lang.Runtime.eq(typeof(T), typeof(T_c))) {
					#line 30 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
					return this;
				}
				
				#line 30 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				global::verb.core.KdNode<T_c> new_me = new global::verb.core.KdNode<T_c>(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) ));
				#line 30 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				{
					#line 30 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
					object __temp_iterator171 = global::Reflect.fields(this).iterator();
					#line 30 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
					while (global::haxe.lang.Runtime.toBool(global::haxe.lang.Runtime.callField(__temp_iterator171, "hasNext", 407283053, default(global::Array)))){
						#line 30 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						string field = global::haxe.lang.Runtime.toString(global::haxe.lang.Runtime.callField(__temp_iterator171, "next", 1224901875, default(global::Array)));
						#line 30 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						switch (field){
							default:
							{
								#line 30 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
								global::Reflect.setField(new_me, field, ((object) (global::Reflect.field(this, field)) ));
								#line 30 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
								break;
							}
							
						}
						
					}
					
				}
				
				#line 30 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				return new_me;
			}
			#line default
		}
		
		
		public  global::verb.core.KdPoint<T> kdPoint;
		
		public  global::verb.core.KdNode<T> left;
		
		public  global::verb.core.KdNode<T> right;
		
		public  global::verb.core.KdNode<T> parent;
		
		public  int dimension;
		
		public override   double __hx_setField_f(string field, int hash, double @value, bool handleProperties){
			unchecked {
				#line 30 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				switch (hash){
					case 353647462:
					{
						#line 30 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						this.dimension = ((int) (@value) );
						#line 30 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						return @value;
					}
					
					
					default:
					{
						#line 30 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						return base.__hx_setField_f(field, hash, @value, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_setField(string field, int hash, object @value, bool handleProperties){
			unchecked {
				#line 30 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				switch (hash){
					case 353647462:
					{
						#line 30 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						this.dimension = ((int) (global::haxe.lang.Runtime.toInt(@value)) );
						#line 30 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						return @value;
					}
					
					
					case 1836975402:
					{
						#line 30 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						this.parent = ((global::verb.core.KdNode<T>) (global::verb.core.KdNode<object>.__hx_cast<T>(((global::verb.core.KdNode) (@value) ))) );
						#line 30 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						return @value;
					}
					
					
					case 1768164316:
					{
						#line 30 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						this.right = ((global::verb.core.KdNode<T>) (global::verb.core.KdNode<object>.__hx_cast<T>(((global::verb.core.KdNode) (@value) ))) );
						#line 30 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						return @value;
					}
					
					
					case 1202718727:
					{
						#line 30 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						this.left = ((global::verb.core.KdNode<T>) (global::verb.core.KdNode<object>.__hx_cast<T>(((global::verb.core.KdNode) (@value) ))) );
						#line 30 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						return @value;
					}
					
					
					case 921033719:
					{
						#line 30 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						this.kdPoint = ((global::verb.core.KdPoint<T>) (global::verb.core.KdPoint<object>.__hx_cast<T>(((global::verb.core.KdPoint) (@value) ))) );
						#line 30 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						return @value;
					}
					
					
					default:
					{
						#line 30 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						return base.__hx_setField(field, hash, @value, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_getField(string field, int hash, bool throwErrors, bool isCheck, bool handleProperties){
			unchecked {
				#line 30 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				switch (hash){
					case 353647462:
					{
						#line 30 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						return this.dimension;
					}
					
					
					case 1836975402:
					{
						#line 30 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						return this.parent;
					}
					
					
					case 1768164316:
					{
						#line 30 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						return this.right;
					}
					
					
					case 1202718727:
					{
						#line 30 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						return this.left;
					}
					
					
					case 921033719:
					{
						#line 30 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						return this.kdPoint;
					}
					
					
					default:
					{
						#line 30 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						return base.__hx_getField(field, hash, throwErrors, isCheck, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   double __hx_getField_f(string field, int hash, bool throwErrors, bool handleProperties){
			unchecked {
				#line 30 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				switch (hash){
					case 353647462:
					{
						#line 30 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						return ((double) (this.dimension) );
					}
					
					
					default:
					{
						#line 30 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						return base.__hx_getField_f(field, hash, throwErrors, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   void __hx_getFields(global::Array<object> baseArr){
			unchecked {
				#line 30 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				baseArr.push("dimension");
				#line 30 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				baseArr.push("parent");
				#line 30 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				baseArr.push("right");
				#line 30 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				baseArr.push("left");
				#line 30 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				baseArr.push("kdPoint");
				#line 30 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				{
					#line 30 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
					base.__hx_getFields(baseArr);
				}
				
			}
			#line default
		}
		
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core{
	public  interface KdNode : global::haxe.lang.IHxObject, global::haxe.lang.IGenericObject {
		   object verb_core_KdNode_cast<T_c>();
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core{
	public  class KdTree<T> : global::haxe.lang.HxObject, global::verb.core.KdTree {
		public    KdTree(global::haxe.lang.EmptyObject empty){
			unchecked {
				#line 47 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				{
				}
				
			}
			#line default
		}
		
		
		public    KdTree(global::Array<object> points, global::haxe.lang.Function distanceFunction){
			unchecked {
				#line 54 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				global::verb.core.KdTree<object>.__hx_ctor_verb_core_KdTree<T>(this, points, distanceFunction);
			}
			#line default
		}
		
		
		public static   void __hx_ctor_verb_core_KdTree<T_c>(global::verb.core.KdTree<T_c> __temp_me53, global::Array<object> points, global::haxe.lang.Function distanceFunction){
			unchecked {
				#line 51 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				__temp_me53.dim = 3;
				#line 55 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				__temp_me53.points = points;
				__temp_me53.distanceFunction = distanceFunction;
				__temp_me53.dim = ((global::verb.core.KdPoint<T_c>) (global::verb.core.KdPoint<object>.__hx_cast<T_c>(((global::verb.core.KdPoint) (points[0]) ))) ).point.length;
				#line 59 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				__temp_me53.root = __temp_me53.buildTree(points, 0, default(global::verb.core.KdNode<T_c>));
			}
			#line default
		}
		
		
		public static   object __hx_cast<T_c_c>(global::verb.core.KdTree me){
			unchecked {
				#line 47 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				return ( (( me != default(global::verb.core.KdTree) )) ? (me.verb_core_KdTree_cast<T_c_c>()) : (default(global::verb.core.KdTree)) );
			}
			#line default
		}
		
		
		public static  new object __hx_createEmpty(){
			unchecked {
				#line 47 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				return new global::verb.core.KdTree<object>(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) ));
			}
			#line default
		}
		
		
		public static  new object __hx_create(global::Array arr){
			unchecked {
				#line 47 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				return new global::verb.core.KdTree<object>(((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (arr[0]) ))) ), ((global::haxe.lang.Function) (arr[1]) ));
			}
			#line default
		}
		
		
		public virtual   object verb_core_KdTree_cast<T_c>(){
			unchecked {
				#line 47 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				if (global::haxe.lang.Runtime.eq(typeof(T), typeof(T_c))) {
					#line 47 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
					return this;
				}
				
				#line 47 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				global::verb.core.KdTree<T_c> new_me = new global::verb.core.KdTree<T_c>(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) ));
				#line 47 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				{
					#line 47 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
					object __temp_iterator172 = global::Reflect.fields(this).iterator();
					#line 47 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
					while (global::haxe.lang.Runtime.toBool(global::haxe.lang.Runtime.callField(__temp_iterator172, "hasNext", 407283053, default(global::Array)))){
						#line 47 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						string field = global::haxe.lang.Runtime.toString(global::haxe.lang.Runtime.callField(__temp_iterator172, "next", 1224901875, default(global::Array)));
						#line 47 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						switch (field){
							default:
							{
								#line 47 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
								global::Reflect.setField(new_me, field, ((object) (global::Reflect.field(this, field)) ));
								#line 47 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
								break;
							}
							
						}
						
					}
					
				}
				
				#line 47 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				return new_me;
			}
			#line default
		}
		
		
		public  global::Array<object> points;
		
		public  global::haxe.lang.Function distanceFunction;
		
		public  int dim;
		
		public  global::verb.core.KdNode<T> root;
		
		public virtual   global::verb.core.KdNode<T> buildTree(global::Array<object> points, int depth, global::verb.core.KdNode<T> parent){
			unchecked {
				#line 63 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				global::Array<int> dim = new global::Array<int>(new int[]{( depth % this.dim )});
				#line 63 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				int median = default(int);
				#line 63 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				global::verb.core.KdNode<T> node = default(global::verb.core.KdNode<T>);
				#line 67 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				if (( points.length == 0 )) {
					#line 67 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
					return default(global::verb.core.KdNode<T>);
				}
				
				#line 68 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				if (( points.length == 1 )) {
					#line 68 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
					return new global::verb.core.KdNode<T>(((global::verb.core.KdPoint<T>) (global::verb.core.KdPoint<object>.__hx_cast<T>(((global::verb.core.KdPoint) (points[0]) ))) ), ((int) (dim[0]) ), ((global::verb.core.KdNode<T>) (parent) ));
				}
				
				#line 70 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				points.sort(new global::verb.core.KdTree_buildTree_70__Fun<T>(((global::Array<int>) (dim) )));
				#line 81 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				{
					#line 81 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
					double x = global::System.Math.Floor(((double) (( ((double) (points.length) ) / 2 )) ));
					#line 81 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
					median = ((int) (x) );
				}
				
				#line 83 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				node = new global::verb.core.KdNode<T>(((global::verb.core.KdPoint<T>) (global::verb.core.KdPoint<object>.__hx_cast<T>(((global::verb.core.KdPoint) (points[median]) ))) ), ((int) (dim[0]) ), ((global::verb.core.KdNode<T>) (parent) ));
				#line 85 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				node.left = this.buildTree(points.slice(0, new global::haxe.lang.Null<int>(median, true)), ( depth + 1 ), node);
				node.right = this.buildTree(points.slice(( median + 1 ), default(global::haxe.lang.Null<int>)), ( depth + 1 ), node);
				#line 88 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				return node;
			}
			#line default
		}
		
		
		public virtual   global::Array<object> nearest(global::Array<double> point, int maxNodes, double maxDistance){
			unchecked {
				#line 91 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				global::Array<int> maxNodes1 = new global::Array<int>(new int[]{maxNodes});
				#line 91 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				global::Array<object> point1 = new global::Array<object>(new object[]{point});
				#line 91 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				global::Array<object> _g = new global::Array<object>(new object[]{this});
				#line 93 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				global::Array<object> bestNodes = new global::Array<object>(new object[]{new global::verb.core.BinaryHeap<object>(((global::haxe.lang.Function) (new global::verb.core.KdTree_nearest_94__Fun<T>()) ))});
				#line 97 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				global::haxe.lang.Function nearestSearch = default(global::haxe.lang.Function);
				#line 97 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				{
					#line 97 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
					global::Array<object> nearestSearch1 = new global::Array<object>(new object[]{default(global::haxe.lang.Function)});
					#line 97 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
					nearestSearch1[0] = new global::verb.core.KdTree_nearest_97__Fun<T>(((global::Array<object>) (point1) ), ((global::Array<int>) (maxNodes1) ), ((global::Array<object>) (nearestSearch1) ), ((global::Array<object>) (_g) ), ((global::Array<object>) (bestNodes) ));
					#line 97 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
					nearestSearch = ((global::haxe.lang.Function) (nearestSearch1[0]) );
				}
				
				#line 161 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				{
					#line 161 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
					int _g4 = 0;
					#line 161 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
					while (( _g4 < maxNodes1[0] )){
						#line 161 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						int i3 = _g4++;
						((global::verb.core.BinaryHeap<object>) (global::verb.core.BinaryHeap<object>.__hx_cast<object>(((global::verb.core.BinaryHeap) (bestNodes[0]) ))) ).push(new global::verb.core.types.Pair<object, double>(((object) (default(global::verb.core.KdNode<T>)) ), ((double) (maxDistance) )));
					}
					
				}
				
				#line 165 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				nearestSearch.__hx_invoke1_o(default(double), this.root);
				#line 167 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				global::Array<object> result = new global::Array<object>(new object[]{});
				#line 169 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				{
					#line 169 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
					int _g5 = 0;
					#line 169 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
					while (( _g5 < maxNodes1[0] )){
						#line 169 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						int i4 = _g5++;
						if (( ((global::verb.core.KdNode<T>) (global::verb.core.KdNode<object>.__hx_cast<T>(((global::verb.core.KdNode) (((global::verb.core.types.Pair<object, double>) (global::verb.core.types.Pair<object, object>.__hx_cast<object, double>(((global::verb.core.types.Pair) (((global::verb.core.BinaryHeap<object>) (global::verb.core.BinaryHeap<object>.__hx_cast<object>(((global::verb.core.BinaryHeap) (bestNodes[0]) ))) ).content[i4]) ))) ).item0) ))) ) != default(global::verb.core.KdNode<T>) )) {
							#line 171 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
							result.push(new global::verb.core.types.Pair<object, double>(((object) (((global::verb.core.KdNode<T>) (global::verb.core.KdNode<object>.__hx_cast<T>(((global::verb.core.KdNode) (((global::verb.core.types.Pair<object, double>) (global::verb.core.types.Pair<object, object>.__hx_cast<object, double>(((global::verb.core.types.Pair) (((global::verb.core.BinaryHeap<object>) (global::verb.core.BinaryHeap<object>.__hx_cast<object>(((global::verb.core.BinaryHeap) (bestNodes[0]) ))) ).content[i4]) ))) ).item0) ))) ).kdPoint) ), ((double) (((global::verb.core.types.Pair<object, double>) (global::verb.core.types.Pair<object, object>.__hx_cast<object, double>(((global::verb.core.types.Pair) (((global::verb.core.BinaryHeap<object>) (global::verb.core.BinaryHeap<object>.__hx_cast<object>(((global::verb.core.BinaryHeap) (bestNodes[0]) ))) ).content[i4]) ))) ).item1) )));
						}
						
					}
					
				}
				
				#line 175 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				return result;
			}
			#line default
		}
		
		
		public override   double __hx_setField_f(string field, int hash, double @value, bool handleProperties){
			unchecked {
				#line 47 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				switch (hash){
					case 4996424:
					{
						#line 47 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						this.dim = ((int) (@value) );
						#line 47 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						return @value;
					}
					
					
					default:
					{
						#line 47 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						return base.__hx_setField_f(field, hash, @value, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_setField(string field, int hash, object @value, bool handleProperties){
			unchecked {
				#line 47 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				switch (hash){
					case 1269755426:
					{
						#line 47 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						this.root = ((global::verb.core.KdNode<T>) (global::verb.core.KdNode<object>.__hx_cast<T>(((global::verb.core.KdNode) (@value) ))) );
						#line 47 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						return @value;
					}
					
					
					case 4996424:
					{
						#line 47 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						this.dim = ((int) (global::haxe.lang.Runtime.toInt(@value)) );
						#line 47 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						return @value;
					}
					
					
					case 1178842989:
					{
						#line 47 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						this.distanceFunction = ((global::haxe.lang.Function) (@value) );
						#line 47 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						return @value;
					}
					
					
					case 1999508003:
					{
						#line 47 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						this.points = ((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (@value) ))) );
						#line 47 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						return @value;
					}
					
					
					default:
					{
						#line 47 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						return base.__hx_setField(field, hash, @value, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_getField(string field, int hash, bool throwErrors, bool isCheck, bool handleProperties){
			unchecked {
				#line 47 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				switch (hash){
					case 1707743326:
					{
						#line 47 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("nearest") ), ((int) (1707743326) ))) );
					}
					
					
					case 1832898476:
					{
						#line 47 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("buildTree") ), ((int) (1832898476) ))) );
					}
					
					
					case 1269755426:
					{
						#line 47 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						return this.root;
					}
					
					
					case 4996424:
					{
						#line 47 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						return this.dim;
					}
					
					
					case 1178842989:
					{
						#line 47 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						return this.distanceFunction;
					}
					
					
					case 1999508003:
					{
						#line 47 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						return this.points;
					}
					
					
					default:
					{
						#line 47 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						return base.__hx_getField(field, hash, throwErrors, isCheck, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   double __hx_getField_f(string field, int hash, bool throwErrors, bool handleProperties){
			unchecked {
				#line 47 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				switch (hash){
					case 4996424:
					{
						#line 47 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						return ((double) (this.dim) );
					}
					
					
					default:
					{
						#line 47 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						return base.__hx_getField_f(field, hash, throwErrors, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_invokeField(string field, int hash, global::Array dynargs){
			unchecked {
				#line 47 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				switch (hash){
					case 1707743326:
					{
						#line 47 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						return this.nearest(((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (dynargs[0]) ))) ), ((int) (global::haxe.lang.Runtime.toInt(dynargs[1])) ), ((double) (global::haxe.lang.Runtime.toDouble(dynargs[2])) ));
					}
					
					
					case 1832898476:
					{
						#line 47 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						return this.buildTree(((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (dynargs[0]) ))) ), ((int) (global::haxe.lang.Runtime.toInt(dynargs[1])) ), ((global::verb.core.KdNode<T>) (global::verb.core.KdNode<object>.__hx_cast<T>(((global::verb.core.KdNode) (dynargs[2]) ))) ));
					}
					
					
					default:
					{
						#line 47 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						return base.__hx_invokeField(field, hash, dynargs);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   void __hx_getFields(global::Array<object> baseArr){
			unchecked {
				#line 47 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				baseArr.push("root");
				#line 47 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				baseArr.push("dim");
				#line 47 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				baseArr.push("distanceFunction");
				#line 47 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				baseArr.push("points");
				#line 47 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				{
					#line 47 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
					base.__hx_getFields(baseArr);
				}
				
			}
			#line default
		}
		
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core{
	public  class KdTree_buildTree_70__Fun<T> : global::haxe.lang.Function {
		public    KdTree_buildTree_70__Fun(global::Array<int> dim) : base(2, 1){
			unchecked {
				#line 70 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				this.dim = dim;
			}
			#line default
		}
		
		
		public override   double __hx_invoke2_f(double __fn_float1, object __fn_dyn1, double __fn_float2, object __fn_dyn2){
			unchecked {
				#line 70 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				global::verb.core.KdPoint<T> b = ( (global::haxe.lang.Runtime.eq(__fn_dyn2, global::haxe.lang.Runtime.undefined)) ? (((global::verb.core.KdPoint<T>) (global::verb.core.KdPoint<object>.__hx_cast<T>(((global::verb.core.KdPoint) (((object) (__fn_float2) )) ))) )) : (((global::verb.core.KdPoint<T>) (global::verb.core.KdPoint<object>.__hx_cast<T>(((global::verb.core.KdPoint) (__fn_dyn2) ))) )) );
				#line 70 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				global::verb.core.KdPoint<T> a = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (((global::verb.core.KdPoint<T>) (global::verb.core.KdPoint<object>.__hx_cast<T>(((global::verb.core.KdPoint) (((object) (__fn_float1) )) ))) )) : (((global::verb.core.KdPoint<T>) (global::verb.core.KdPoint<object>.__hx_cast<T>(((global::verb.core.KdPoint) (__fn_dyn1) ))) )) );
				double diff = ( a.point[this.dim[0]] - b.point[this.dim[0]] );
				if (( diff == 0.0 )) {
					#line 73 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
					return ((double) (0) );
				}
				 else {
					#line 74 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
					if (( diff > 0 )) {
						#line 75 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						return ((double) (1) );
					}
					 else {
						#line 77 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						return ((double) (-1) );
					}
					
				}
				
			}
			#line default
		}
		
		
		public  global::Array<int> dim;
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core{
	public  class KdTree_nearest_94__Fun<T> : global::haxe.lang.Function {
		public    KdTree_nearest_94__Fun() : base(1, 1){
			unchecked {
			}
			#line default
		}
		
		
		public override   double __hx_invoke1_f(double __fn_float1, object __fn_dyn1){
			unchecked {
				#line 94 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				global::verb.core.types.Pair<object, double> e = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (((global::verb.core.types.Pair<object, double>) (global::verb.core.types.Pair<object, object>.__hx_cast<object, double>(((global::verb.core.types.Pair) (((object) (__fn_float1) )) ))) )) : (((global::verb.core.types.Pair<object, double>) (global::verb.core.types.Pair<object, object>.__hx_cast<object, double>(((global::verb.core.types.Pair) (__fn_dyn1) ))) )) );
				#line 94 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				return  - (e.item1) ;
			}
			#line default
		}
		
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core{
	public  class KdTree_nearest_107__Fun<T> : global::haxe.lang.Function {
		public    KdTree_nearest_107__Fun(global::Array<int> maxNodes1, global::Array<object> bestNodes) : base(2, 0){
			unchecked {
				#line 107 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				this.maxNodes1 = maxNodes1;
				#line 107 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				this.bestNodes = bestNodes;
			}
			#line default
		}
		
		
		public override   object __hx_invoke2_o(double __fn_float1, object __fn_dyn1, double __fn_float2, object __fn_dyn2){
			unchecked {
				#line 107 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				double distance = ( (global::haxe.lang.Runtime.eq(__fn_dyn2, global::haxe.lang.Runtime.undefined)) ? (((double) (__fn_float2) )) : (((double) (global::haxe.lang.Runtime.toDouble(__fn_dyn2)) )) );
				#line 107 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				global::verb.core.KdNode<T> node1 = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (((global::verb.core.KdNode<T>) (global::verb.core.KdNode<object>.__hx_cast<T>(((global::verb.core.KdNode) (((object) (__fn_float1) )) ))) )) : (((global::verb.core.KdNode<T>) (global::verb.core.KdNode<object>.__hx_cast<T>(((global::verb.core.KdNode) (__fn_dyn1) ))) )) );
				((global::verb.core.BinaryHeap<object>) (global::verb.core.BinaryHeap<object>.__hx_cast<object>(((global::verb.core.BinaryHeap) (this.bestNodes[0]) ))) ).push(new global::verb.core.types.Pair<object, double>(((object) (node1) ), ((double) (distance) )));
				if (( ((global::verb.core.BinaryHeap<object>) (global::verb.core.BinaryHeap<object>.__hx_cast<object>(((global::verb.core.BinaryHeap) (this.bestNodes[0]) ))) ).size() > this.maxNodes1[0] )) {
					#line 110 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
					((global::verb.core.BinaryHeap<object>) (global::verb.core.BinaryHeap<object>.__hx_cast<object>(((global::verb.core.BinaryHeap) (this.bestNodes[0]) ))) ).pop();
				}
				
				#line 107 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				return default(object);
			}
			#line default
		}
		
		
		public  global::Array<int> maxNodes1;
		
		public  global::Array<object> bestNodes;
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core{
	public  class KdTree_nearest_97__Fun<T> : global::haxe.lang.Function {
		public    KdTree_nearest_97__Fun(global::Array<object> point1, global::Array<int> maxNodes1, global::Array<object> nearestSearch1, global::Array<object> _g, global::Array<object> bestNodes) : base(1, 0){
			unchecked {
				#line 97 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				this.point1 = point1;
				#line 97 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				this.maxNodes1 = maxNodes1;
				#line 97 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				this.nearestSearch1 = nearestSearch1;
				#line 97 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				this._g = _g;
				#line 97 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				this.bestNodes = bestNodes;
			}
			#line default
		}
		
		
		public override   object __hx_invoke1_o(double __fn_float1, object __fn_dyn1){
			unchecked {
				#line 97 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				global::verb.core.KdNode<T> node = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (((global::verb.core.KdNode<T>) (global::verb.core.KdNode<object>.__hx_cast<T>(((global::verb.core.KdNode) (((object) (__fn_float1) )) ))) )) : (((global::verb.core.KdNode<T>) (global::verb.core.KdNode<object>.__hx_cast<T>(((global::verb.core.KdNode) (__fn_dyn1) ))) )) );
				#line 99 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				global::verb.core.KdNode<T> bestChild = default(global::verb.core.KdNode<T>);
				int dimension = node.dimension;
				double ownDistance = ((double) (((global::verb.core.KdTree<T>) (global::verb.core.KdTree<object>.__hx_cast<T>(((global::verb.core.KdTree) (this._g[0]) ))) ).distanceFunction.__hx_invoke2_f(default(double), ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (this.point1[0]) ))) ), default(double), node.kdPoint.point)) );
				global::Array<double> linearPoint = default(global::Array<double>);
				#line 102 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				{
					#line 102 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
					global::Array<double> _g1 = new global::Array<double>(new double[]{});
					#line 102 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
					{
						#line 102 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						int _g3 = 0;
						#line 102 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						int _g2 = ((global::verb.core.KdTree<T>) (global::verb.core.KdTree<object>.__hx_cast<T>(((global::verb.core.KdTree) (this._g[0]) ))) ).dim;
						#line 102 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						while (( _g3 < _g2 )){
							#line 102 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
							int i = _g3++;
							#line 102 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
							_g1.push(0.0);
						}
						
					}
					
					#line 102 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
					linearPoint = _g1;
				}
				
				#line 99 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				double linearDistance = default(double);
				#line 99 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				global::verb.core.KdNode<T> otherChild = default(global::verb.core.KdNode<T>);
				#line 99 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				object i1 = default(object);
				#line 107 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				global::haxe.lang.Function saveNode = new global::verb.core.KdTree_nearest_107__Fun<T>(((global::Array<int>) (this.maxNodes1) ), ((global::Array<object>) (this.bestNodes) ));
				#line 114 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				{
					#line 114 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
					int _g31 = 0;
					#line 114 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
					int _g21 = ((global::verb.core.KdTree<T>) (global::verb.core.KdTree<object>.__hx_cast<T>(((global::verb.core.KdTree) (this._g[0]) ))) ).dim;
					#line 114 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
					while (( _g31 < _g21 )){
						#line 114 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						int i2 = _g31++;
						if (( i2 == node.dimension )) {
							#line 116 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
							linearPoint[i2] = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (this.point1[0]) ))) )[i2];
						}
						 else {
							#line 118 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
							linearPoint[i2] = node.kdPoint.point[i2];
						}
						
					}
					
				}
				
				#line 122 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				linearDistance = ((double) (((global::verb.core.KdTree<T>) (global::verb.core.KdTree<object>.__hx_cast<T>(((global::verb.core.KdTree) (this._g[0]) ))) ).distanceFunction.__hx_invoke2_f(default(double), linearPoint, default(double), node.kdPoint.point)) );
				#line 124 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				if (( ( node.right == default(global::verb.core.KdNode<T>) ) && ( node.left == default(global::verb.core.KdNode<T>) ) )) {
					#line 125 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
					if (( ( ((global::verb.core.BinaryHeap<object>) (global::verb.core.BinaryHeap<object>.__hx_cast<object>(((global::verb.core.BinaryHeap) (this.bestNodes[0]) ))) ).size() < this.maxNodes1[0] ) || ( ownDistance < ((global::verb.core.BinaryHeap<object>) (global::verb.core.BinaryHeap<object>.__hx_cast<object>(((global::verb.core.BinaryHeap) (this.bestNodes[0]) ))) ).peek().item1 ) )) {
						#line 126 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						saveNode.__hx_invoke2_o(default(double), node, ownDistance, global::haxe.lang.Runtime.undefined);
					}
					
					#line 128 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
					return default(object);
				}
				
				#line 131 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				if (( node.right == default(global::verb.core.KdNode<T>) )) {
					#line 132 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
					bestChild = node.left;
				}
				 else {
					#line 133 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
					if (( node.left == default(global::verb.core.KdNode<T>) )) {
						#line 134 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						bestChild = node.right;
					}
					 else {
						#line 136 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						if (( ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (this.point1[0]) ))) )[dimension] < node.kdPoint.point[dimension] )) {
							#line 137 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
							bestChild = node.left;
						}
						 else {
							#line 139 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
							bestChild = node.right;
						}
						
					}
					
				}
				
				#line 143 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				((global::haxe.lang.Function) (this.nearestSearch1[0]) ).__hx_invoke1_o(default(double), bestChild);
				#line 145 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				if (( ( ((global::verb.core.BinaryHeap<object>) (global::verb.core.BinaryHeap<object>.__hx_cast<object>(((global::verb.core.BinaryHeap) (this.bestNodes[0]) ))) ).size() < this.maxNodes1[0] ) || ( ownDistance < ((global::verb.core.BinaryHeap<object>) (global::verb.core.BinaryHeap<object>.__hx_cast<object>(((global::verb.core.BinaryHeap) (this.bestNodes[0]) ))) ).peek().item1 ) )) {
					#line 146 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
					saveNode.__hx_invoke2_o(default(double), node, ownDistance, global::haxe.lang.Runtime.undefined);
				}
				
				#line 149 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				if (( ( ((global::verb.core.BinaryHeap<object>) (global::verb.core.BinaryHeap<object>.__hx_cast<object>(((global::verb.core.BinaryHeap) (this.bestNodes[0]) ))) ).size() < this.maxNodes1[0] ) || ( global::System.Math.Abs(((double) (linearDistance) )) < ((global::verb.core.BinaryHeap<object>) (global::verb.core.BinaryHeap<object>.__hx_cast<object>(((global::verb.core.BinaryHeap) (this.bestNodes[0]) ))) ).peek().item1 ) )) {
					#line 150 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
					if (( bestChild == node.left )) {
						#line 151 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						otherChild = node.right;
					}
					 else {
						#line 153 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						otherChild = node.left;
					}
					
					#line 155 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
					if (( otherChild != default(global::verb.core.KdNode<T>) )) {
						#line 156 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						((global::haxe.lang.Function) (this.nearestSearch1[0]) ).__hx_invoke1_o(default(double), otherChild);
					}
					
				}
				
				#line 97 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				return default(object);
			}
			#line default
		}
		
		
		public  global::Array<object> point1;
		
		public  global::Array<int> maxNodes1;
		
		public  global::Array<object> nearestSearch1;
		
		public  global::Array<object> _g;
		
		public  global::Array<object> bestNodes;
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core{
	public  interface KdTree : global::haxe.lang.IHxObject, global::haxe.lang.IGenericObject {
		   object verb_core_KdTree_cast<T_c>();
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core{
	public  class BinaryHeap<T> : global::haxe.lang.HxObject, global::verb.core.BinaryHeap {
		public    BinaryHeap(global::haxe.lang.EmptyObject empty){
			unchecked {
				#line 182 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				{
				}
				
			}
			#line default
		}
		
		
		public    BinaryHeap(global::haxe.lang.Function scoreFunction){
			unchecked {
				#line 187 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				global::verb.core.BinaryHeap<object>.__hx_ctor_verb_core_BinaryHeap<T>(this, scoreFunction);
			}
			#line default
		}
		
		
		public static   void __hx_ctor_verb_core_BinaryHeap<T_c>(global::verb.core.BinaryHeap<T_c> __temp_me54, global::haxe.lang.Function scoreFunction){
			unchecked {
				#line 188 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				__temp_me54.content = new global::Array<object>(new object[]{});
				__temp_me54.scoreFunction = scoreFunction;
			}
			#line default
		}
		
		
		public static   object __hx_cast<T_c_c>(global::verb.core.BinaryHeap me){
			unchecked {
				#line 182 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				return ( (( me != default(global::verb.core.BinaryHeap) )) ? (me.verb_core_BinaryHeap_cast<T_c_c>()) : (default(global::verb.core.BinaryHeap)) );
			}
			#line default
		}
		
		
		public static  new object __hx_createEmpty(){
			unchecked {
				#line 182 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				return new global::verb.core.BinaryHeap<object>(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) ));
			}
			#line default
		}
		
		
		public static  new object __hx_create(global::Array arr){
			unchecked {
				#line 182 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				return new global::verb.core.BinaryHeap<object>(((global::haxe.lang.Function) (arr[0]) ));
			}
			#line default
		}
		
		
		public virtual   object verb_core_BinaryHeap_cast<T_c>(){
			unchecked {
				#line 182 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				if (global::haxe.lang.Runtime.eq(typeof(T), typeof(T_c))) {
					#line 182 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
					return this;
				}
				
				#line 182 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				global::verb.core.BinaryHeap<T_c> new_me = new global::verb.core.BinaryHeap<T_c>(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) ));
				#line 182 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				{
					#line 182 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
					object __temp_iterator173 = global::Reflect.fields(this).iterator();
					#line 182 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
					while (global::haxe.lang.Runtime.toBool(global::haxe.lang.Runtime.callField(__temp_iterator173, "hasNext", 407283053, default(global::Array)))){
						#line 182 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						string field = global::haxe.lang.Runtime.toString(global::haxe.lang.Runtime.callField(__temp_iterator173, "next", 1224901875, default(global::Array)));
						#line 182 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						switch (field){
							default:
							{
								#line 182 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
								global::Reflect.setField(new_me, field, ((object) (global::Reflect.field(this, field)) ));
								#line 182 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
								break;
							}
							
						}
						
					}
					
				}
				
				#line 182 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				return new_me;
			}
			#line default
		}
		
		
		public  global::Array<object> content;
		
		public  global::haxe.lang.Function scoreFunction;
		
		public virtual   void push(global::verb.core.types.Pair<T, double> element){
			unchecked {
				#line 194 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				this.content.push(element);
				#line 196 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				this.bubbleUp(( this.content.length - 1 ));
			}
			#line default
		}
		
		
		public virtual   global::verb.core.types.Pair<T, double> pop(){
			unchecked {
				#line 201 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				global::verb.core.types.Pair<T, double> result = ((global::verb.core.types.Pair<T, double>) (global::verb.core.types.Pair<object, object>.__hx_cast<T, double>(((global::verb.core.types.Pair) (this.content[0]) ))) );
				#line 203 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				global::verb.core.types.Pair<T, double> end = ((global::verb.core.types.Pair<T, double>) (global::verb.core.types.Pair<object, object>.__hx_cast<T, double>(((global::verb.core.types.Pair) (this.content.pop().@value) ))) );
				#line 206 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				if (( this.content.length > 0 )) {
					#line 207 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
					this.content[0] = end;
					this.sinkDown(0);
				}
				
				#line 210 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				return result;
			}
			#line default
		}
		
		
		public virtual   global::verb.core.types.Pair<T, double> peek(){
			unchecked {
				#line 214 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				return ((global::verb.core.types.Pair<T, double>) (global::verb.core.types.Pair<object, object>.__hx_cast<T, double>(((global::verb.core.types.Pair) (this.content[0]) ))) );
			}
			#line default
		}
		
		
		public virtual   void @remove(global::verb.core.types.Pair<T, double> node){
			unchecked {
				#line 218 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				int len = this.content.length;
				#line 221 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				{
					#line 221 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
					int _g = 0;
					#line 221 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
					while (( _g < ((int) (len) ) )){
						#line 221 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						int i = _g++;
						if (( ((global::verb.core.types.Pair<T, double>) (global::verb.core.types.Pair<object, object>.__hx_cast<T, double>(((global::verb.core.types.Pair) (this.content[i]) ))) ) == node )) {
							#line 225 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
							global::verb.core.types.Pair<T, double> end = ((global::verb.core.types.Pair<T, double>) (global::verb.core.types.Pair<object, object>.__hx_cast<T, double>(((global::verb.core.types.Pair) (this.content.pop().@value) ))) );
							if (( i != ( len - 1 ) )) {
								#line 227 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
								this.content[i] = end;
								if (( ((double) (this.scoreFunction.__hx_invoke1_f(default(double), end)) ) < ((double) (this.scoreFunction.__hx_invoke1_f(default(double), node)) ) )) {
									#line 229 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
									this.bubbleUp(i);
								}
								 else {
									#line 231 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
									this.sinkDown(i);
								}
								
							}
							
							#line 233 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
							return ;
						}
						
					}
					
				}
				
				#line 236 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				throw global::haxe.lang.HaxeException.wrap("Node not found.");
			}
			#line default
		}
		
		
		public virtual   int size(){
			unchecked {
				#line 240 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				return this.content.length;
			}
			#line default
		}
		
		
		public virtual   void bubbleUp(int n){
			unchecked {
				#line 245 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				global::verb.core.types.Pair<T, double> element = ((global::verb.core.types.Pair<T, double>) (global::verb.core.types.Pair<object, object>.__hx_cast<T, double>(((global::verb.core.types.Pair) (this.content[n]) ))) );
				#line 247 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				while (( n > 0 )){
					#line 249 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
					int parentN = default(int);
					#line 249 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
					int __temp_stmt250 = default(int);
					#line 249 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
					{
						#line 249 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						double x = global::System.Math.Floor(((double) (( (( n + 1.0 )) / 2 )) ));
						#line 249 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						__temp_stmt250 = ((int) (x) );
					}
					
					#line 249 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
					parentN = ( __temp_stmt250 - 1 );
					global::verb.core.types.Pair<T, double> parent = ((global::verb.core.types.Pair<T, double>) (global::verb.core.types.Pair<object, object>.__hx_cast<T, double>(((global::verb.core.types.Pair) (this.content[parentN]) ))) );
					#line 252 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
					if (( ((double) (this.scoreFunction.__hx_invoke1_f(default(double), element)) ) < ((double) (this.scoreFunction.__hx_invoke1_f(default(double), parent)) ) )) {
						#line 253 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						this.content[parentN] = element;
						this.content[n] = parent;
						#line 256 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						n = parentN;
					}
					 else {
						#line 260 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						break;
					}
					
				}
				
			}
			#line default
		}
		
		
		public virtual   void sinkDown(int n){
			unchecked {
				#line 267 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				int length = this.content.length;
				global::verb.core.types.Pair<T, double> element = ((global::verb.core.types.Pair<T, double>) (global::verb.core.types.Pair<object, object>.__hx_cast<T, double>(((global::verb.core.types.Pair) (this.content[n]) ))) );
				double elemScore = ((double) (this.scoreFunction.__hx_invoke1_f(default(double), element)) );
				#line 271 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				while (true){
					#line 273 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
					int child2N = ( (( n + 1 )) * 2 );
					int child1N = ( child2N - 1 );
					#line 277 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
					int swap = -1;
					double child1Score = 0.0;
					#line 281 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
					if (( child1N < length )) {
						#line 283 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						global::verb.core.types.Pair<T, double> child1 = ((global::verb.core.types.Pair<T, double>) (global::verb.core.types.Pair<object, object>.__hx_cast<T, double>(((global::verb.core.types.Pair) (this.content[child1N]) ))) );
						child1Score = ((double) (this.scoreFunction.__hx_invoke1_f(default(double), child1)) );
						#line 286 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						if (( child1Score < elemScore )) {
							#line 287 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
							swap = child1N;
						}
						
					}
					
					#line 290 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
					if (( child2N < length )) {
						#line 291 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						global::verb.core.types.Pair<T, double> child2 = ((global::verb.core.types.Pair<T, double>) (global::verb.core.types.Pair<object, object>.__hx_cast<T, double>(((global::verb.core.types.Pair) (this.content[child2N]) ))) );
						double child2Score = ((double) (this.scoreFunction.__hx_invoke1_f(default(double), child2)) );
						if (( child2Score < (( (( swap == -1 )) ? (elemScore) : (child1Score) )) )) {
							#line 294 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
							swap = child2N;
						}
						
					}
					
					#line 299 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
					if (( swap != -1 )) {
						#line 300 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						this.content[n] = ((global::verb.core.types.Pair<T, double>) (global::verb.core.types.Pair<object, object>.__hx_cast<T, double>(((global::verb.core.types.Pair) (this.content[swap]) ))) );
						this.content[swap] = element;
						n = swap;
					}
					 else {
						#line 306 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						break;
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_setField(string field, int hash, object @value, bool handleProperties){
			unchecked {
				#line 182 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				switch (hash){
					case 1801223306:
					{
						#line 182 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						this.scoreFunction = ((global::haxe.lang.Function) (@value) );
						#line 182 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						return @value;
					}
					
					
					case 427265337:
					{
						#line 182 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						this.content = ((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (@value) ))) );
						#line 182 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						return @value;
					}
					
					
					default:
					{
						#line 182 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						return base.__hx_setField(field, hash, @value, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_getField(string field, int hash, bool throwErrors, bool isCheck, bool handleProperties){
			unchecked {
				#line 182 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				switch (hash){
					case 73392213:
					{
						#line 182 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("sinkDown") ), ((int) (73392213) ))) );
					}
					
					
					case 1250764039:
					{
						#line 182 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("bubbleUp") ), ((int) (1250764039) ))) );
					}
					
					
					case 1280549057:
					{
						#line 182 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("size") ), ((int) (1280549057) ))) );
					}
					
					
					case 76061764:
					{
						#line 182 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("remove") ), ((int) (76061764) ))) );
					}
					
					
					case 1247076763:
					{
						#line 182 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("peek") ), ((int) (1247076763) ))) );
					}
					
					
					case 5594513:
					{
						#line 182 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("pop") ), ((int) (5594513) ))) );
					}
					
					
					case 1247875546:
					{
						#line 182 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("push") ), ((int) (1247875546) ))) );
					}
					
					
					case 1801223306:
					{
						#line 182 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						return this.scoreFunction;
					}
					
					
					case 427265337:
					{
						#line 182 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						return this.content;
					}
					
					
					default:
					{
						#line 182 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						return base.__hx_getField(field, hash, throwErrors, isCheck, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_invokeField(string field, int hash, global::Array dynargs){
			unchecked {
				#line 182 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				switch (hash){
					case 73392213:
					{
						#line 182 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						this.sinkDown(((int) (global::haxe.lang.Runtime.toInt(dynargs[0])) ));
						#line 182 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						break;
					}
					
					
					case 1250764039:
					{
						#line 182 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						this.bubbleUp(((int) (global::haxe.lang.Runtime.toInt(dynargs[0])) ));
						#line 182 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						break;
					}
					
					
					case 1280549057:
					{
						#line 182 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						return this.size();
					}
					
					
					case 76061764:
					{
						#line 182 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						this.@remove(((global::verb.core.types.Pair<T, double>) (global::verb.core.types.Pair<object, object>.__hx_cast<T, double>(((global::verb.core.types.Pair) (dynargs[0]) ))) ));
						#line 182 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						break;
					}
					
					
					case 1247076763:
					{
						#line 182 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						return this.peek();
					}
					
					
					case 5594513:
					{
						#line 182 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						return this.pop();
					}
					
					
					case 1247875546:
					{
						#line 182 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						this.push(((global::verb.core.types.Pair<T, double>) (global::verb.core.types.Pair<object, object>.__hx_cast<T, double>(((global::verb.core.types.Pair) (dynargs[0]) ))) ));
						#line 182 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						break;
					}
					
					
					default:
					{
						#line 182 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
						return base.__hx_invokeField(field, hash, dynargs);
					}
					
				}
				
				#line 182 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				return default(object);
			}
			#line default
		}
		
		
		public override   void __hx_getFields(global::Array<object> baseArr){
			unchecked {
				#line 182 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				baseArr.push("scoreFunction");
				#line 182 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				baseArr.push("content");
				#line 182 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
				{
					#line 182 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/KdTree.hx"
					base.__hx_getFields(baseArr);
				}
				
			}
			#line default
		}
		
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core{
	public  interface BinaryHeap : global::haxe.lang.IHxObject, global::haxe.lang.IGenericObject {
		   object verb_core_BinaryHeap_cast<T_c>();
		
	}
}


