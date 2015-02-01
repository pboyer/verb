
#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.geom{
	public  class RevolvedSurface : global::verb.geom.NurbsSurface {
		public    RevolvedSurface(global::haxe.lang.EmptyObject empty) : base(global::haxe.lang.EmptyObject.EMPTY){
			unchecked {
			}
			#line default
		}
		
		
		public    RevolvedSurface(global::verb.geom.NurbsCurve profile, global::Array<double> center, global::Array<double> axis, double angle) : base(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) )){
			unchecked {
				#line 28 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/RevolvedSurface.hx"
				global::verb.geom.RevolvedSurface.__hx_ctor_verb_geom_RevolvedSurface(this, profile, center, axis, angle);
			}
			#line default
		}
		
		
		public static   void __hx_ctor_verb_geom_RevolvedSurface(global::verb.geom.RevolvedSurface __temp_me138, global::verb.geom.NurbsCurve profile, global::Array<double> center, global::Array<double> axis, double angle){
			unchecked {
				#line 28 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/RevolvedSurface.hx"
				global::verb.geom.NurbsSurface.__hx_ctor_verb_geom_NurbsSurface(__temp_me138, global::verb.core.Make.revolvedSurface(profile.asNurbs(), center, axis, angle));
				#line 30 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/RevolvedSurface.hx"
				__temp_me138._profile = profile;
				__temp_me138._center = center;
				__temp_me138._axis = axis;
				__temp_me138._angle = angle;
			}
			#line default
		}
		
		
		public static  new object __hx_createEmpty(){
			unchecked {
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/RevolvedSurface.hx"
				return new global::verb.geom.RevolvedSurface(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) ));
			}
			#line default
		}
		
		
		public static  new object __hx_create(global::Array arr){
			unchecked {
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/RevolvedSurface.hx"
				return new global::verb.geom.RevolvedSurface(((global::verb.geom.NurbsCurve) (arr[0]) ), ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (arr[1]) ))) ), ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (arr[2]) ))) ), ((double) (global::haxe.lang.Runtime.toDouble(arr[3])) ));
			}
			#line default
		}
		
		
		public  global::verb.geom.ICurve _profile;
		
		public  global::Array<double> _center;
		
		public  global::Array<double> _axis;
		
		public  double _angle;
		
		public virtual   global::verb.geom.ICurve profile(){
			unchecked {
				#line 14 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/RevolvedSurface.hx"
				return this._profile;
			}
			#line default
		}
		
		
		public virtual   global::Array<double> center(){
			unchecked {
				#line 15 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/RevolvedSurface.hx"
				return this._center;
			}
			#line default
		}
		
		
		public virtual   global::Array<double> axis(){
			unchecked {
				#line 16 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/RevolvedSurface.hx"
				return this._center;
			}
			#line default
		}
		
		
		public virtual   double angle(){
			unchecked {
				#line 17 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/RevolvedSurface.hx"
				return this._angle;
			}
			#line default
		}
		
		
		public override   double __hx_setField_f(string field, int hash, double @value, bool handleProperties){
			unchecked {
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/RevolvedSurface.hx"
				switch (hash){
					case 516524820:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/RevolvedSurface.hx"
						this._angle = ((double) (@value) );
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/RevolvedSurface.hx"
						return @value;
					}
					
					
					default:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/RevolvedSurface.hx"
						return base.__hx_setField_f(field, hash, @value, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_setField(string field, int hash, object @value, bool handleProperties){
			unchecked {
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/RevolvedSurface.hx"
				switch (hash){
					case 516524820:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/RevolvedSurface.hx"
						this._angle = ((double) (global::haxe.lang.Runtime.toDouble(@value)) );
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/RevolvedSurface.hx"
						return @value;
					}
					
					
					case 1938438272:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/RevolvedSurface.hx"
						this._axis = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (@value) ))) );
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/RevolvedSurface.hx"
						return @value;
					}
					
					
					case 1951545204:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/RevolvedSurface.hx"
						this._center = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (@value) ))) );
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/RevolvedSurface.hx"
						return @value;
					}
					
					
					case 755081898:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/RevolvedSurface.hx"
						this._profile = ((global::verb.geom.ICurve) (@value) );
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/RevolvedSurface.hx"
						return @value;
					}
					
					
					default:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/RevolvedSurface.hx"
						return base.__hx_setField(field, hash, @value, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_getField(string field, int hash, bool throwErrors, bool isCheck, bool handleProperties){
			unchecked {
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/RevolvedSurface.hx"
				switch (hash){
					case 585253843:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/RevolvedSurface.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("angle") ), ((int) (585253843) ))) );
					}
					
					
					case 1081679009:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/RevolvedSurface.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("axis") ), ((int) (1081679009) ))) );
					}
					
					
					case 98248149:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/RevolvedSurface.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("center") ), ((int) (98248149) ))) );
					}
					
					
					case 1934182697:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/RevolvedSurface.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("profile") ), ((int) (1934182697) ))) );
					}
					
					
					case 516524820:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/RevolvedSurface.hx"
						return this._angle;
					}
					
					
					case 1938438272:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/RevolvedSurface.hx"
						return this._axis;
					}
					
					
					case 1951545204:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/RevolvedSurface.hx"
						return this._center;
					}
					
					
					case 755081898:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/RevolvedSurface.hx"
						return this._profile;
					}
					
					
					default:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/RevolvedSurface.hx"
						return base.__hx_getField(field, hash, throwErrors, isCheck, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   double __hx_getField_f(string field, int hash, bool throwErrors, bool handleProperties){
			unchecked {
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/RevolvedSurface.hx"
				switch (hash){
					case 516524820:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/RevolvedSurface.hx"
						return this._angle;
					}
					
					
					default:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/RevolvedSurface.hx"
						return base.__hx_getField_f(field, hash, throwErrors, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_invokeField(string field, int hash, global::Array dynargs){
			unchecked {
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/RevolvedSurface.hx"
				switch (hash){
					case 585253843:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/RevolvedSurface.hx"
						return this.angle();
					}
					
					
					case 1081679009:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/RevolvedSurface.hx"
						return this.axis();
					}
					
					
					case 98248149:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/RevolvedSurface.hx"
						return this.center();
					}
					
					
					case 1934182697:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/RevolvedSurface.hx"
						return this.profile();
					}
					
					
					default:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/RevolvedSurface.hx"
						return base.__hx_invokeField(field, hash, dynargs);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   void __hx_getFields(global::Array<object> baseArr){
			unchecked {
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/RevolvedSurface.hx"
				baseArr.push("_angle");
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/RevolvedSurface.hx"
				baseArr.push("_axis");
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/RevolvedSurface.hx"
				baseArr.push("_center");
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/RevolvedSurface.hx"
				baseArr.push("_profile");
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/RevolvedSurface.hx"
				{
					#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/RevolvedSurface.hx"
					base.__hx_getFields(baseArr);
				}
				
			}
			#line default
		}
		
		
	}
}


