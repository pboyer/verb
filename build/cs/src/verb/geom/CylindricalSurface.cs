
#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.geom{
	public  class CylindricalSurface : global::verb.geom.NurbsSurface {
		public    CylindricalSurface(global::haxe.lang.EmptyObject empty) : base(global::haxe.lang.EmptyObject.EMPTY){
			unchecked {
			}
			#line default
		}
		
		
		public    CylindricalSurface(global::Array<double> axis, global::Array<double> xaxis, global::Array<double> @base, double height, double radius) : base(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) )){
			unchecked {
				#line 34 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/CylindricalSurface.hx"
				global::verb.geom.CylindricalSurface.__hx_ctor_verb_geom_CylindricalSurface(this, axis, xaxis, @base, height, radius);
			}
			#line default
		}
		
		
		public static   void __hx_ctor_verb_geom_CylindricalSurface(global::verb.geom.CylindricalSurface __temp_me126, global::Array<double> axis, global::Array<double> xaxis, global::Array<double> @base, double height, double radius){
			unchecked {
				#line 34 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/CylindricalSurface.hx"
				global::verb.geom.NurbsSurface.__hx_ctor_verb_geom_NurbsSurface(__temp_me126, global::verb.core.Make.CylindricalSurface(axis, xaxis, @base, height, radius));
				#line 36 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/CylindricalSurface.hx"
				__temp_me126._axis = axis;
				__temp_me126._xaxis = xaxis;
				__temp_me126._base = @base;
				__temp_me126._height = height;
				__temp_me126._radius = radius;
			}
			#line default
		}
		
		
		public static  new object __hx_createEmpty(){
			unchecked {
				#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/CylindricalSurface.hx"
				return new global::verb.geom.CylindricalSurface(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) ));
			}
			#line default
		}
		
		
		public static  new object __hx_create(global::Array arr){
			unchecked {
				#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/CylindricalSurface.hx"
				return new global::verb.geom.CylindricalSurface(((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (arr[0]) ))) ), ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (arr[1]) ))) ), ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (arr[2]) ))) ), ((double) (global::haxe.lang.Runtime.toDouble(arr[3])) ), ((double) (global::haxe.lang.Runtime.toDouble(arr[4])) ));
			}
			#line default
		}
		
		
		public  global::Array<double> _axis;
		
		public  global::Array<double> _xaxis;
		
		public  global::Array<double> _base;
		
		public  double _height;
		
		public  double _radius;
		
		public virtual   global::Array<double> axis(){
			unchecked {
				#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/CylindricalSurface.hx"
				return this._axis;
			}
			#line default
		}
		
		
		public virtual   global::Array<double> xaxis(){
			unchecked {
				#line 19 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/CylindricalSurface.hx"
				return this._xaxis;
			}
			#line default
		}
		
		
		public virtual   global::Array<double> @base(){
			unchecked {
				#line 20 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/CylindricalSurface.hx"
				return this._base;
			}
			#line default
		}
		
		
		public virtual   double height(){
			unchecked {
				#line 21 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/CylindricalSurface.hx"
				return this._height;
			}
			#line default
		}
		
		
		public virtual   double radius(){
			unchecked {
				#line 22 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/CylindricalSurface.hx"
				return this._radius;
			}
			#line default
		}
		
		
		public override   double __hx_setField_f(string field, int hash, double @value, bool handleProperties){
			unchecked {
				#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/CylindricalSurface.hx"
				switch (hash){
					case 527294961:
					{
						#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/CylindricalSurface.hx"
						this._radius = ((double) (@value) );
						#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/CylindricalSurface.hx"
						return @value;
					}
					
					
					case 1891834246:
					{
						#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/CylindricalSurface.hx"
						this._height = ((double) (@value) );
						#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/CylindricalSurface.hx"
						return @value;
					}
					
					
					default:
					{
						#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/CylindricalSurface.hx"
						return base.__hx_setField_f(field, hash, @value, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_setField(string field, int hash, object @value, bool handleProperties){
			unchecked {
				#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/CylindricalSurface.hx"
				switch (hash){
					case 527294961:
					{
						#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/CylindricalSurface.hx"
						this._radius = ((double) (global::haxe.lang.Runtime.toDouble(@value)) );
						#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/CylindricalSurface.hx"
						return @value;
					}
					
					
					case 1891834246:
					{
						#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/CylindricalSurface.hx"
						this._height = ((double) (global::haxe.lang.Runtime.toDouble(@value)) );
						#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/CylindricalSurface.hx"
						return @value;
					}
					
					
					case 1948386288:
					{
						#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/CylindricalSurface.hx"
						this._base = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (@value) ))) );
						#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/CylindricalSurface.hx"
						return @value;
					}
					
					
					case 1417019482:
					{
						#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/CylindricalSurface.hx"
						this._xaxis = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (@value) ))) );
						#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/CylindricalSurface.hx"
						return @value;
					}
					
					
					case 1938438272:
					{
						#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/CylindricalSurface.hx"
						this._axis = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (@value) ))) );
						#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/CylindricalSurface.hx"
						return @value;
					}
					
					
					default:
					{
						#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/CylindricalSurface.hx"
						return base.__hx_setField(field, hash, @value, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_getField(string field, int hash, bool throwErrors, bool isCheck, bool handleProperties){
			unchecked {
				#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/CylindricalSurface.hx"
				switch (hash){
					case 821481554:
					{
						#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/CylindricalSurface.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("radius") ), ((int) (821481554) ))) );
					}
					
					
					case 38537191:
					{
						#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/CylindricalSurface.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("height") ), ((int) (38537191) ))) );
					}
					
					
					case 1091627025:
					{
						#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/CylindricalSurface.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("base") ), ((int) (1091627025) ))) );
					}
					
					
					case 1485748505:
					{
						#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/CylindricalSurface.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("xaxis") ), ((int) (1485748505) ))) );
					}
					
					
					case 1081679009:
					{
						#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/CylindricalSurface.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("axis") ), ((int) (1081679009) ))) );
					}
					
					
					case 527294961:
					{
						#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/CylindricalSurface.hx"
						return this._radius;
					}
					
					
					case 1891834246:
					{
						#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/CylindricalSurface.hx"
						return this._height;
					}
					
					
					case 1948386288:
					{
						#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/CylindricalSurface.hx"
						return this._base;
					}
					
					
					case 1417019482:
					{
						#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/CylindricalSurface.hx"
						return this._xaxis;
					}
					
					
					case 1938438272:
					{
						#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/CylindricalSurface.hx"
						return this._axis;
					}
					
					
					default:
					{
						#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/CylindricalSurface.hx"
						return base.__hx_getField(field, hash, throwErrors, isCheck, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   double __hx_getField_f(string field, int hash, bool throwErrors, bool handleProperties){
			unchecked {
				#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/CylindricalSurface.hx"
				switch (hash){
					case 527294961:
					{
						#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/CylindricalSurface.hx"
						return this._radius;
					}
					
					
					case 1891834246:
					{
						#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/CylindricalSurface.hx"
						return this._height;
					}
					
					
					default:
					{
						#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/CylindricalSurface.hx"
						return base.__hx_getField_f(field, hash, throwErrors, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_invokeField(string field, int hash, global::Array dynargs){
			unchecked {
				#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/CylindricalSurface.hx"
				switch (hash){
					case 821481554:
					{
						#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/CylindricalSurface.hx"
						return this.radius();
					}
					
					
					case 38537191:
					{
						#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/CylindricalSurface.hx"
						return this.height();
					}
					
					
					case 1091627025:
					{
						#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/CylindricalSurface.hx"
						return this.@base();
					}
					
					
					case 1485748505:
					{
						#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/CylindricalSurface.hx"
						return this.xaxis();
					}
					
					
					case 1081679009:
					{
						#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/CylindricalSurface.hx"
						return this.axis();
					}
					
					
					default:
					{
						#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/CylindricalSurface.hx"
						return base.__hx_invokeField(field, hash, dynargs);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   void __hx_getFields(global::Array<object> baseArr){
			unchecked {
				#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/CylindricalSurface.hx"
				baseArr.push("_radius");
				#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/CylindricalSurface.hx"
				baseArr.push("_height");
				#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/CylindricalSurface.hx"
				baseArr.push("_base");
				#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/CylindricalSurface.hx"
				baseArr.push("_xaxis");
				#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/CylindricalSurface.hx"
				baseArr.push("_axis");
				#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/CylindricalSurface.hx"
				{
					#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/CylindricalSurface.hx"
					base.__hx_getFields(baseArr);
				}
				
			}
			#line default
		}
		
		
	}
}


