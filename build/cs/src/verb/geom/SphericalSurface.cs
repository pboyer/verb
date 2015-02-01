
#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.geom{
	public  class SphericalSurface : global::verb.geom.NurbsSurface {
		public    SphericalSurface(global::haxe.lang.EmptyObject empty) : base(global::haxe.lang.EmptyObject.EMPTY){
			unchecked {
			}
			#line default
		}
		
		
		public    SphericalSurface(global::Array<double> center, double radius) : base(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) )){
			unchecked {
				#line 26 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/SphericalSurface.hx"
				global::verb.geom.SphericalSurface.__hx_ctor_verb_geom_SphericalSurface(this, center, radius);
			}
			#line default
		}
		
		
		public static   void __hx_ctor_verb_geom_SphericalSurface(global::verb.geom.SphericalSurface __temp_me139, global::Array<double> center, double radius){
			unchecked {
				#line 26 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/SphericalSurface.hx"
				global::verb.geom.NurbsSurface.__hx_ctor_verb_geom_NurbsSurface(__temp_me139, global::verb.core.Make.SphericalSurface(center, new global::Array<double>(new double[]{((double) (0) ), ((double) (0) ), ((double) (1) )}), new global::Array<double>(new double[]{((double) (1) ), ((double) (0) ), ((double) (0) )}), radius));
				#line 28 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/SphericalSurface.hx"
				__temp_me139._center = center;
				__temp_me139._radius = radius;
			}
			#line default
		}
		
		
		public static  new object __hx_createEmpty(){
			unchecked {
				#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/SphericalSurface.hx"
				return new global::verb.geom.SphericalSurface(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) ));
			}
			#line default
		}
		
		
		public static  new object __hx_create(global::Array arr){
			unchecked {
				#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/SphericalSurface.hx"
				return new global::verb.geom.SphericalSurface(((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (arr[0]) ))) ), ((double) (global::haxe.lang.Runtime.toDouble(arr[1])) ));
			}
			#line default
		}
		
		
		public  global::Array<double> _center;
		
		public  double _radius;
		
		public virtual   global::Array<double> center(){
			unchecked {
				#line 15 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/SphericalSurface.hx"
				return this._center;
			}
			#line default
		}
		
		
		public virtual   double radius(){
			unchecked {
				#line 16 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/SphericalSurface.hx"
				return this._radius;
			}
			#line default
		}
		
		
		public override   double __hx_setField_f(string field, int hash, double @value, bool handleProperties){
			unchecked {
				#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/SphericalSurface.hx"
				switch (hash){
					case 527294961:
					{
						#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/SphericalSurface.hx"
						this._radius = ((double) (@value) );
						#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/SphericalSurface.hx"
						return @value;
					}
					
					
					default:
					{
						#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/SphericalSurface.hx"
						return base.__hx_setField_f(field, hash, @value, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_setField(string field, int hash, object @value, bool handleProperties){
			unchecked {
				#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/SphericalSurface.hx"
				switch (hash){
					case 527294961:
					{
						#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/SphericalSurface.hx"
						this._radius = ((double) (global::haxe.lang.Runtime.toDouble(@value)) );
						#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/SphericalSurface.hx"
						return @value;
					}
					
					
					case 1951545204:
					{
						#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/SphericalSurface.hx"
						this._center = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (@value) ))) );
						#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/SphericalSurface.hx"
						return @value;
					}
					
					
					default:
					{
						#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/SphericalSurface.hx"
						return base.__hx_setField(field, hash, @value, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_getField(string field, int hash, bool throwErrors, bool isCheck, bool handleProperties){
			unchecked {
				#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/SphericalSurface.hx"
				switch (hash){
					case 821481554:
					{
						#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/SphericalSurface.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("radius") ), ((int) (821481554) ))) );
					}
					
					
					case 98248149:
					{
						#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/SphericalSurface.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("center") ), ((int) (98248149) ))) );
					}
					
					
					case 527294961:
					{
						#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/SphericalSurface.hx"
						return this._radius;
					}
					
					
					case 1951545204:
					{
						#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/SphericalSurface.hx"
						return this._center;
					}
					
					
					default:
					{
						#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/SphericalSurface.hx"
						return base.__hx_getField(field, hash, throwErrors, isCheck, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   double __hx_getField_f(string field, int hash, bool throwErrors, bool handleProperties){
			unchecked {
				#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/SphericalSurface.hx"
				switch (hash){
					case 527294961:
					{
						#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/SphericalSurface.hx"
						return this._radius;
					}
					
					
					default:
					{
						#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/SphericalSurface.hx"
						return base.__hx_getField_f(field, hash, throwErrors, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_invokeField(string field, int hash, global::Array dynargs){
			unchecked {
				#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/SphericalSurface.hx"
				switch (hash){
					case 821481554:
					{
						#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/SphericalSurface.hx"
						return this.radius();
					}
					
					
					case 98248149:
					{
						#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/SphericalSurface.hx"
						return this.center();
					}
					
					
					default:
					{
						#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/SphericalSurface.hx"
						return base.__hx_invokeField(field, hash, dynargs);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   void __hx_getFields(global::Array<object> baseArr){
			unchecked {
				#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/SphericalSurface.hx"
				baseArr.push("_radius");
				#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/SphericalSurface.hx"
				baseArr.push("_center");
				#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/SphericalSurface.hx"
				{
					#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/SphericalSurface.hx"
					base.__hx_getFields(baseArr);
				}
				
			}
			#line default
		}
		
		
	}
}


