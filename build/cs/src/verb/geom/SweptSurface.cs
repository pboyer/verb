
#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.geom{
	public  class SweptSurface : global::verb.geom.NurbsSurface {
		public    SweptSurface(global::haxe.lang.EmptyObject empty) : base(global::haxe.lang.EmptyObject.EMPTY){
			unchecked {
			}
			#line default
		}
		
		
		public    SweptSurface(global::verb.geom.ICurve profile, global::verb.geom.ICurve rail) : base(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) )){
			unchecked {
				#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/SweptSurface.hx"
				global::verb.geom.SweptSurface.__hx_ctor_verb_geom_SweptSurface(this, profile, rail);
			}
			#line default
		}
		
		
		public static   void __hx_ctor_verb_geom_SweptSurface(global::verb.geom.SweptSurface __temp_me140, global::verb.geom.ICurve profile, global::verb.geom.ICurve rail){
			unchecked {
				#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/SweptSurface.hx"
				global::verb.geom.NurbsSurface.__hx_ctor_verb_geom_NurbsSurface(__temp_me140, global::verb.core.Make.rationalTranslationalSurface(profile.asNurbs(), rail.asNurbs()));
				#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/SweptSurface.hx"
				__temp_me140._profile = profile;
				__temp_me140._rail = rail;
			}
			#line default
		}
		
		
		public static  new object __hx_createEmpty(){
			unchecked {
				#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/SweptSurface.hx"
				return new global::verb.geom.SweptSurface(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) ));
			}
			#line default
		}
		
		
		public static  new object __hx_create(global::Array arr){
			unchecked {
				#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/SweptSurface.hx"
				return new global::verb.geom.SweptSurface(((global::verb.geom.ICurve) (arr[0]) ), ((global::verb.geom.ICurve) (arr[1]) ));
			}
			#line default
		}
		
		
		public  global::verb.geom.ICurve _profile;
		
		public  global::verb.geom.ICurve _rail;
		
		public virtual   global::verb.geom.ICurve profile(){
			unchecked {
				#line 13 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/SweptSurface.hx"
				return this._profile;
			}
			#line default
		}
		
		
		public virtual   global::verb.geom.ICurve rail(){
			unchecked {
				#line 14 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/SweptSurface.hx"
				return this._rail;
			}
			#line default
		}
		
		
		public override   object __hx_setField(string field, int hash, object @value, bool handleProperties){
			unchecked {
				#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/SweptSurface.hx"
				switch (hash){
					case 2125817137:
					{
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/SweptSurface.hx"
						this._rail = ((global::verb.geom.ICurve) (@value) );
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/SweptSurface.hx"
						return @value;
					}
					
					
					case 755081898:
					{
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/SweptSurface.hx"
						this._profile = ((global::verb.geom.ICurve) (@value) );
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/SweptSurface.hx"
						return @value;
					}
					
					
					default:
					{
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/SweptSurface.hx"
						return base.__hx_setField(field, hash, @value, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_getField(string field, int hash, bool throwErrors, bool isCheck, bool handleProperties){
			unchecked {
				#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/SweptSurface.hx"
				switch (hash){
					case 1269057874:
					{
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/SweptSurface.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("rail") ), ((int) (1269057874) ))) );
					}
					
					
					case 1934182697:
					{
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/SweptSurface.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("profile") ), ((int) (1934182697) ))) );
					}
					
					
					case 2125817137:
					{
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/SweptSurface.hx"
						return this._rail;
					}
					
					
					case 755081898:
					{
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/SweptSurface.hx"
						return this._profile;
					}
					
					
					default:
					{
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/SweptSurface.hx"
						return base.__hx_getField(field, hash, throwErrors, isCheck, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_invokeField(string field, int hash, global::Array dynargs){
			unchecked {
				#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/SweptSurface.hx"
				switch (hash){
					case 1269057874:
					{
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/SweptSurface.hx"
						return this.rail();
					}
					
					
					case 1934182697:
					{
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/SweptSurface.hx"
						return this.profile();
					}
					
					
					default:
					{
						#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/SweptSurface.hx"
						return base.__hx_invokeField(field, hash, dynargs);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   void __hx_getFields(global::Array<object> baseArr){
			unchecked {
				#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/SweptSurface.hx"
				baseArr.push("_rail");
				#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/SweptSurface.hx"
				baseArr.push("_profile");
				#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/SweptSurface.hx"
				{
					#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/SweptSurface.hx"
					base.__hx_getFields(baseArr);
				}
				
			}
			#line default
		}
		
		
	}
}


