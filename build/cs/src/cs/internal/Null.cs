
#pragma warning disable 109, 114, 219, 429, 168, 162
namespace haxe.lang{
	public  struct Null<T> {
		
	//This function is here to be used with Reflection, when the haxe.lang.Null type is known
	public static haxe.lang.Null<T> _ofDynamic(object obj)
	{
		if (obj == null)
		{
			return new haxe.lang.Null<T>(default(T), false);
		} else if (typeof(T).Equals(typeof(double))) {
			return new haxe.lang.Null<T>((T) (object) haxe.lang.Runtime.toDouble(obj), true);
		} else if (typeof(T).Equals(typeof(int))) {
			return new haxe.lang.Null<T>((T) (object) haxe.lang.Runtime.toInt(obj), true);
		} else {
			return new haxe.lang.Null<T>((T) obj, true);
		}
	}
		public    Null(T v, bool hasValue){
			
			if ( !(v is System.ValueType) && System.Object.ReferenceEquals(v, default(T)))
			{
				hasValue = false;
			}

			this.@value = v;
			this.hasValue = hasValue;
	
		}
		
		
		public static   global::haxe.lang.Null<D> ofDynamic<D>(object obj){
			
		if (obj == null)
		{
			return new haxe.lang.Null<D>(default(D), false);
		} else if (typeof(D).Equals(typeof(double))) {
			return new haxe.lang.Null<D>((D) (object) haxe.lang.Runtime.toDouble(obj), true);
		} else if (typeof(D).Equals(typeof(int))) {
			return new haxe.lang.Null<D>((D) (object) haxe.lang.Runtime.toInt(obj), true);
		} else {
			return new haxe.lang.Null<D>((D) obj, true);
		}
	
		}
		
		
		public readonly T @value;
		
		public readonly bool hasValue;
		
		public   object toDynamic(){
			
		if (this.hasValue)
			return value;
		return null;
	
		}
		
		
	}
}


