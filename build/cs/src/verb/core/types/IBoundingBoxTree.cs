
#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core.types{
	public  interface IBoundingBoxTree<T> : global::haxe.lang.IHxObject, global::verb.core.types.IBoundingBoxTree {
		   global::verb.core.types.BoundingBox boundingBox();
		
		   global::verb.core.types.Pair<object, object> split();
		
		   T @yield();
		
		   bool indivisible(double tolerance);
		
		   bool empty();
		
	}
	public class IBoundingBoxTree__Statics_{
		public static   object __hx_cast<T_c_c>(global::verb.core.types.IBoundingBoxTree me){
			unchecked {
				#line 3 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/IBoundingBoxTree.hx"
				return ( (( me != default(global::verb.core.types.IBoundingBoxTree) )) ? (me.verb_core_types_IBoundingBoxTree_cast<T_c_c>()) : (default(global::verb.core.types.IBoundingBoxTree)) );
			}
			#line default
		}
		
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core.types{
	public  interface IBoundingBoxTree : global::haxe.lang.IHxObject, global::haxe.lang.IGenericObject {
		   object verb_core_types_IBoundingBoxTree_cast<T_c>();
		
	}
}


