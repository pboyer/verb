
#pragma warning disable 109, 114, 219, 429, 168, 162
public  interface IMap<K, V> : global::haxe.lang.IHxObject, global::IMap {
}
public class IMap__Statics_{
	public static   object __hx_cast<K_c_c, V_c_c>(global::IMap me){
		unchecked {
			#line 165 "/usr/lib/haxe/std/Map.hx"
			return ( (( me != default(global::IMap) )) ? (me.IMap_cast<K_c_c, V_c_c>()) : (default(global::IMap)) );
		}
		#line default
	}
	
	
}



#pragma warning disable 109, 114, 219, 429, 168, 162
public  interface IMap : global::haxe.lang.IHxObject, global::haxe.lang.IGenericObject {
	   object IMap_cast<K_c, V_c>();
	
}


