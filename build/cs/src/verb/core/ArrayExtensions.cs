
#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core{
	public  class ArrayExtensions : global::haxe.lang.HxObject {
		public    ArrayExtensions(global::haxe.lang.EmptyObject empty){
			unchecked {
				#line 3 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/ArrayExtensions.hx"
				{
				}
				
			}
			#line default
		}
		
		
		public    ArrayExtensions(){
			unchecked {
				#line 3 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/ArrayExtensions.hx"
				global::verb.core.ArrayExtensions.__hx_ctor_verb_core_ArrayExtensions(this);
			}
			#line default
		}
		
		
		public static   void __hx_ctor_verb_core_ArrayExtensions(global::verb.core.ArrayExtensions __temp_me39){
			unchecked {
				#line 3 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/ArrayExtensions.hx"
				{
				}
				
			}
			#line default
		}
		
		
		public static   global::Array<T> reversed<T>(global::Array<T> a){
			unchecked {
				#line 14 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/ArrayExtensions.hx"
				global::Array<T> ac = a.copy();
				ac.reverse();
				return ac;
			}
			#line default
		}
		
		
		public static   T last<T>(global::Array<T> a){
			unchecked {
				#line 29 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/ArrayExtensions.hx"
				return a[( a.length - 1 )];
			}
			#line default
		}
		
		
		public static   T first<T>(global::Array<T> a){
			unchecked {
				#line 42 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/ArrayExtensions.hx"
				return a[0];
			}
			#line default
		}
		
		
		public static   void spliceAndInsert<T>(global::Array<T> a, int start, int end, T ele){
			unchecked {
				#line 46 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/ArrayExtensions.hx"
				a.splice(start, end);
				a.insert(start, ele);
			}
			#line default
		}
		
		
		public static   global::Array<T> left<T>(global::Array<T> arr){
			unchecked {
				#line 61 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/ArrayExtensions.hx"
				if (( arr.length == 0 )) {
					#line 61 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/ArrayExtensions.hx"
					return new global::Array<T>(new T[]{});
				}
				
				#line 62 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/ArrayExtensions.hx"
				int len = default(int);
				#line 62 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/ArrayExtensions.hx"
				{
					#line 62 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/ArrayExtensions.hx"
					double x = global::System.Math.Ceiling(((double) (( ((double) (arr.length) ) / 2 )) ));
					#line 62 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/ArrayExtensions.hx"
					len = ((int) (x) );
				}
				
				#line 63 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/ArrayExtensions.hx"
				return arr.slice(0, new global::haxe.lang.Null<int>(len, true));
			}
			#line default
		}
		
		
		public static   global::Array<T> right<T>(global::Array<T> arr){
			unchecked {
				#line 77 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/ArrayExtensions.hx"
				if (( arr.length == 0 )) {
					#line 77 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/ArrayExtensions.hx"
					return new global::Array<T>(new T[]{});
				}
				
				#line 78 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/ArrayExtensions.hx"
				int len = default(int);
				#line 78 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/ArrayExtensions.hx"
				{
					#line 78 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/ArrayExtensions.hx"
					double x = global::System.Math.Ceiling(((double) (( ((double) (arr.length) ) / 2 )) ));
					#line 78 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/ArrayExtensions.hx"
					len = ((int) (x) );
				}
				
				#line 79 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/ArrayExtensions.hx"
				return arr.slice(len, default(global::haxe.lang.Null<int>));
			}
			#line default
		}
		
		
		public static   global::Array<T> rightWithPivot<T>(global::Array<T> arr){
			unchecked {
				#line 93 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/ArrayExtensions.hx"
				if (( arr.length == 0 )) {
					#line 93 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/ArrayExtensions.hx"
					return new global::Array<T>(new T[]{});
				}
				
				#line 94 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/ArrayExtensions.hx"
				int len = default(int);
				#line 94 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/ArrayExtensions.hx"
				{
					#line 94 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/ArrayExtensions.hx"
					double x = global::System.Math.Ceiling(((double) (( ((double) (arr.length) ) / 2 )) ));
					#line 94 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/ArrayExtensions.hx"
					len = ((int) (x) );
				}
				
				#line 95 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/ArrayExtensions.hx"
				return arr.slice(( len - 1 ), default(global::haxe.lang.Null<int>));
			}
			#line default
		}
		
		
		public static   global::Array<object> unique<T>(global::Array<T> arr, global::haxe.lang.Function comp){
			unchecked {
				#line 112 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/ArrayExtensions.hx"
				if (( arr.length == 0 )) {
					#line 112 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/ArrayExtensions.hx"
					return new global::Array<object>(new object[]{});
				}
				
				#line 114 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/ArrayExtensions.hx"
				global::Array<object> uniques = new global::Array<object>(new object[]{(arr.pop()).toDynamic()});
				#line 116 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/ArrayExtensions.hx"
				while (( arr.length > 0 )){
					#line 118 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/ArrayExtensions.hx"
					global::haxe.lang.Null<T> ele = arr.pop();
					bool isUnique = true;
					#line 121 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/ArrayExtensions.hx"
					{
						#line 121 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/ArrayExtensions.hx"
						int _g = 0;
						#line 121 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/ArrayExtensions.hx"
						while (( _g < uniques.length )){
							#line 121 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/ArrayExtensions.hx"
							global::haxe.lang.Null<T> unique = global::haxe.lang.Null<object>.ofDynamic<T>(uniques[_g]);
							#line 121 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/ArrayExtensions.hx"
							 ++ _g;
							if (global::haxe.lang.Runtime.toBool(comp.__hx_invoke2_o(default(double), (ele).toDynamic(), default(double), (unique).toDynamic()))) {
								#line 123 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/ArrayExtensions.hx"
								isUnique = false;
								break;
							}
							
						}
						
					}
					
					#line 128 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/ArrayExtensions.hx"
					if (isUnique) {
						#line 129 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/ArrayExtensions.hx"
						uniques.push((ele).toDynamic());
					}
					
				}
				
				#line 133 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/ArrayExtensions.hx"
				return uniques;
			}
			#line default
		}
		
		
		public static  new object __hx_createEmpty(){
			unchecked {
				#line 3 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/ArrayExtensions.hx"
				return new global::verb.core.ArrayExtensions(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) ));
			}
			#line default
		}
		
		
		public static  new object __hx_create(global::Array arr){
			unchecked {
				#line 3 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/ArrayExtensions.hx"
				return new global::verb.core.ArrayExtensions();
			}
			#line default
		}
		
		
	}
}


