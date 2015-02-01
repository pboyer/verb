
#pragma warning disable 109, 114, 219, 429, 168, 162
public  class Reflect : global::haxe.lang.HxObject {
	public    Reflect(global::haxe.lang.EmptyObject empty){
		unchecked {
			#line 48 "/usr/lib/haxe/std/cs/_std/Reflect.hx"
			{
			}
			
		}
		#line default
	}
	
	
	public    Reflect(){
		unchecked {
			#line 48 "/usr/lib/haxe/std/cs/_std/Reflect.hx"
			global::Reflect.__hx_ctor__Reflect(this);
		}
		#line default
	}
	
	
	public static   void __hx_ctor__Reflect(global::Reflect __temp_me8){
		unchecked {
			#line 48 "/usr/lib/haxe/std/cs/_std/Reflect.hx"
			{
			}
			
		}
		#line default
	}
	
	
	public static   bool hasField(object o, string field){
		
		if (o is haxe.lang.IHxObject)
			return ((haxe.lang.IHxObject) o).__hx_getField(field, haxe.lang.FieldLookup.hash(field), false, true, false) != haxe.lang.Runtime.undefined;

		return haxe.lang.Runtime.slowHasField(o, field);
	
	}
	
	
	public static   object field(object o, string field){
		
		if (o is haxe.lang.IHxObject)
			return ((haxe.lang.IHxObject) o).__hx_getField(field, haxe.lang.FieldLookup.hash(field), false, false, false);

		return haxe.lang.Runtime.slowGetField(o, field, false);
	
	}
	
	
	public static   void setField(object o, string field, object @value){
		
		if (o is haxe.lang.IHxObject)
			((haxe.lang.IHxObject) o).__hx_setField(field, haxe.lang.FieldLookup.hash(field), value, false);
		else
			haxe.lang.Runtime.slowSetField(o, field, value);
	
	}
	
	
	public static   object getProperty(object o, string field){
		
		if (o is haxe.lang.IHxObject)
			return ((haxe.lang.IHxObject) o).__hx_getField(field, haxe.lang.FieldLookup.hash(field), false, false, true);

		if (haxe.lang.Runtime.slowHasField(o, "get_" + field))
			return haxe.lang.Runtime.slowCallField(o, "get_" + field, null);

		return haxe.lang.Runtime.slowGetField(o, field, false);
	
	}
	
	
	public static   void setProperty(object o, string field, object @value){
		
		if (o is haxe.lang.IHxObject)
			((haxe.lang.IHxObject) o).__hx_setField(field, haxe.lang.FieldLookup.hash(field), value, true);
		else if (haxe.lang.Runtime.slowHasField(o, "set_" + field))
			haxe.lang.Runtime.slowCallField(o, "set_" + field, new Array<object>(new object[]{value}));
		else
			haxe.lang.Runtime.slowSetField(o, field, value);
	
	}
	
	
	public static   object callMethod(object o, object func, global::Array args){
		
		return ((haxe.lang.Function) func).__hx_invokeDynamic(args);
	
	}
	
	
	public static   global::Array<object> fields(object o){
		
		if (o is haxe.lang.IHxObject)
		{
			Array<object> ret = new Array<object>();
				((haxe.lang.IHxObject) o).__hx_getFields(ret);
			return ret;
		} else if (o is System.Type) {
			return Type.getClassFields( (System.Type) o);
		} else {
			return new Array<object>();
		}
	
	}
	
	
	public static   bool isFunction(object f){
		
		return f is haxe.lang.Function;
	
	}
	
	
	public static   int compare<T>(T a, T b){
		
		return haxe.lang.Runtime.compare(a, b);
	
	}
	
	
	public static   bool compareMethods(object f1, object f2){
		
		if (f1 == f2)
			return true;

		if (f1 is haxe.lang.Closure && f2 is haxe.lang.Closure)
		{
			haxe.lang.Closure f1c = (haxe.lang.Closure) f1;
			haxe.lang.Closure f2c = (haxe.lang.Closure) f2;

			return haxe.lang.Runtime.refEq(f1c.obj, f2c.obj) && f1c.field.Equals(f2c.field);
		}

		return false;
	
	}
	
	
	public static   bool isObject(object v){
		
		return v != null && !(v is haxe.lang.Enum || v is haxe.lang.Function || v is System.ValueType);
	
	}
	
	
	public static   bool isEnumValue(object v){
		
		return v != null && (v is haxe.lang.Enum || v is System.Enum);
	
	}
	
	
	public static   bool deleteField(object o, string field){
		
		return (o is haxe.lang.DynamicObject && ((haxe.lang.DynamicObject) o).__hx_deleteField(field, haxe.lang.FieldLookup.hash(field)));
	
	}
	
	
	public static   T copy<T>(T o){
		unchecked {
			#line 198 "/usr/lib/haxe/std/cs/_std/Reflect.hx"
			object o2 = new global::haxe.lang.DynamicObject(new global::Array<int>(new int[]{}), new global::Array<object>(new object[]{}), new global::Array<int>(new int[]{}), new global::Array<double>(new double[]{}));
			{
				#line 199 "/usr/lib/haxe/std/cs/_std/Reflect.hx"
				int _g = 0;
				#line 199 "/usr/lib/haxe/std/cs/_std/Reflect.hx"
				global::Array<object> _g1 = global::Reflect.fields(o);
				#line 199 "/usr/lib/haxe/std/cs/_std/Reflect.hx"
				while (( _g < _g1.length )){
					#line 199 "/usr/lib/haxe/std/cs/_std/Reflect.hx"
					string f = global::haxe.lang.Runtime.toString(_g1[_g]);
					#line 199 "/usr/lib/haxe/std/cs/_std/Reflect.hx"
					 ++ _g;
					global::Reflect.setField(o2, f, global::Reflect.field(o, f));
				}
				
			}
			
			#line 201 "/usr/lib/haxe/std/cs/_std/Reflect.hx"
			return global::haxe.lang.Runtime.genericCast<T>(o2);
		}
		#line default
	}
	
	
	public static   object makeVarArgs(global::haxe.lang.Function f){
		unchecked {
			#line 207 "/usr/lib/haxe/std/cs/_std/Reflect.hx"
			return new global::haxe.lang.VarArgsFunction(((global::haxe.lang.Function) (f) ));
		}
		#line default
	}
	
	
	public static  new object __hx_createEmpty(){
		unchecked {
			#line 48 "/usr/lib/haxe/std/cs/_std/Reflect.hx"
			return new global::Reflect(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) ));
		}
		#line default
	}
	
	
	public static  new object __hx_create(global::Array arr){
		unchecked {
			#line 48 "/usr/lib/haxe/std/cs/_std/Reflect.hx"
			return new global::Reflect();
		}
		#line default
	}
	
	
}


