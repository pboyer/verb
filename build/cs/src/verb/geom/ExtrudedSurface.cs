
#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.geom{
	public  class ExtrudedSurface : global::verb.geom.NurbsSurface {
		public    ExtrudedSurface(global::haxe.lang.EmptyObject empty) : base(global::haxe.lang.EmptyObject.EMPTY){
			unchecked {
			}
			#line default
		}
		
		
		public    ExtrudedSurface(global::verb.geom.ICurve profile, global::Array<double> direction) : base(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) )){
			unchecked {
				#line 24 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/ExtrudedSurface.hx"
				global::verb.geom.ExtrudedSurface.__hx_ctor_verb_geom_ExtrudedSurface(this, profile, direction);
			}
			#line default
		}
		
		
		public static   void __hx_ctor_verb_geom_ExtrudedSurface(global::verb.geom.ExtrudedSurface __temp_me129, global::verb.geom.ICurve profile, global::Array<double> direction){
			unchecked {
				#line 24 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/ExtrudedSurface.hx"
				global::verb.geom.NurbsSurface.__hx_ctor_verb_geom_NurbsSurface(__temp_me129, global::verb.core.Make.extrudedSurface(global::verb.core.Vec.normalized(direction), global::verb.core.Vec.norm(direction), profile.asNurbs()));
				#line 26 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/ExtrudedSurface.hx"
				__temp_me129._profile = profile;
				__temp_me129._direction = direction;
			}
			#line default
		}
		
		
		public static  new object __hx_createEmpty(){
			unchecked {
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/ExtrudedSurface.hx"
				return new global::verb.geom.ExtrudedSurface(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) ));
			}
			#line default
		}
		
		
		public static  new object __hx_create(global::Array arr){
			unchecked {
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/ExtrudedSurface.hx"
				return new global::verb.geom.ExtrudedSurface(((global::verb.geom.ICurve) (arr[0]) ), ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (arr[1]) ))) ));
			}
			#line default
		}
		
		
		public  global::verb.geom.ICurve _profile;
		
		public  global::Array<double> _direction;
		
		public virtual   global::verb.geom.ICurve profile(){
			unchecked {
				#line 14 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/ExtrudedSurface.hx"
				return this._profile;
			}
			#line default
		}
		
		
		public virtual   global::Array<double> direction(){
			unchecked {
				#line 15 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/ExtrudedSurface.hx"
				return this._direction;
			}
			#line default
		}
		
		
		public override   object __hx_setField(string field, int hash, object @value, bool handleProperties){
			unchecked {
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/ExtrudedSurface.hx"
				switch (hash){
					case 1810030080:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/ExtrudedSurface.hx"
						this._direction = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (@value) ))) );
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/ExtrudedSurface.hx"
						return @value;
					}
					
					
					case 755081898:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/ExtrudedSurface.hx"
						this._profile = ((global::verb.geom.ICurve) (@value) );
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/ExtrudedSurface.hx"
						return @value;
					}
					
					
					default:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/ExtrudedSurface.hx"
						return base.__hx_setField(field, hash, @value, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_getField(string field, int hash, bool throwErrors, bool isCheck, bool handleProperties){
			unchecked {
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/ExtrudedSurface.hx"
				switch (hash){
					case 272654911:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/ExtrudedSurface.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("direction") ), ((int) (272654911) ))) );
					}
					
					
					case 1934182697:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/ExtrudedSurface.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("profile") ), ((int) (1934182697) ))) );
					}
					
					
					case 1810030080:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/ExtrudedSurface.hx"
						return this._direction;
					}
					
					
					case 755081898:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/ExtrudedSurface.hx"
						return this._profile;
					}
					
					
					default:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/ExtrudedSurface.hx"
						return base.__hx_getField(field, hash, throwErrors, isCheck, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_invokeField(string field, int hash, global::Array dynargs){
			unchecked {
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/ExtrudedSurface.hx"
				switch (hash){
					case 272654911:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/ExtrudedSurface.hx"
						return this.direction();
					}
					
					
					case 1934182697:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/ExtrudedSurface.hx"
						return this.profile();
					}
					
					
					default:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/ExtrudedSurface.hx"
						return base.__hx_invokeField(field, hash, dynargs);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   void __hx_getFields(global::Array<object> baseArr){
			unchecked {
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/ExtrudedSurface.hx"
				baseArr.push("_direction");
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/ExtrudedSurface.hx"
				baseArr.push("_profile");
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/ExtrudedSurface.hx"
				{
					#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/ExtrudedSurface.hx"
					base.__hx_getFields(baseArr);
				}
				
			}
			#line default
		}
		
		
	}
}


