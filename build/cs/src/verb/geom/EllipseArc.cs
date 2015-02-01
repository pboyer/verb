
#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.geom{
	public  class EllipseArc : global::verb.geom.NurbsCurve {
		public    EllipseArc(global::haxe.lang.EmptyObject empty) : base(global::haxe.lang.EmptyObject.EMPTY){
			unchecked {
			}
			#line default
		}
		
		
		public    EllipseArc(global::Array<double> center, global::Array<double> xaxis, global::Array<double> yaxis, double minAngle, double maxAngle) : base(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) )){
			unchecked {
				#line 39 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/EllipseArc.hx"
				global::verb.geom.EllipseArc.__hx_ctor_verb_geom_EllipseArc(this, center, xaxis, yaxis, minAngle, maxAngle);
			}
			#line default
		}
		
		
		public static   void __hx_ctor_verb_geom_EllipseArc(global::verb.geom.EllipseArc __temp_me127, global::Array<double> center, global::Array<double> xaxis, global::Array<double> yaxis, double minAngle, double maxAngle){
			unchecked {
				#line 39 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/EllipseArc.hx"
				global::verb.geom.NurbsCurve.__hx_ctor_verb_geom_NurbsCurve(__temp_me127, global::verb.core.Make.ellipseArc(center, xaxis, yaxis, minAngle, maxAngle));
				#line 41 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/EllipseArc.hx"
				__temp_me127._center = center;
				__temp_me127._xaxis = xaxis;
				__temp_me127._yaxis = yaxis;
				__temp_me127._minAngle = minAngle;
				__temp_me127._maxAngle = maxAngle;
			}
			#line default
		}
		
		
		public static  new object __hx_createEmpty(){
			unchecked {
				#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/EllipseArc.hx"
				return new global::verb.geom.EllipseArc(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) ));
			}
			#line default
		}
		
		
		public static  new object __hx_create(global::Array arr){
			unchecked {
				#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/EllipseArc.hx"
				return new global::verb.geom.EllipseArc(((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (arr[0]) ))) ), ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (arr[1]) ))) ), ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (arr[2]) ))) ), ((double) (global::haxe.lang.Runtime.toDouble(arr[3])) ), ((double) (global::haxe.lang.Runtime.toDouble(arr[4])) ));
			}
			#line default
		}
		
		
		public  global::Array<double> _center;
		
		public  global::Array<double> _xaxis;
		
		public  global::Array<double> _yaxis;
		
		public  double _minAngle;
		
		public  double _maxAngle;
		
		public virtual   global::Array<double> center(){
			unchecked {
				#line 19 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/EllipseArc.hx"
				return this._center;
			}
			#line default
		}
		
		
		public virtual   global::Array<double> xaxis(){
			unchecked {
				#line 20 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/EllipseArc.hx"
				return this._xaxis;
			}
			#line default
		}
		
		
		public virtual   global::Array<double> yaxis(){
			unchecked {
				#line 21 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/EllipseArc.hx"
				return this._yaxis;
			}
			#line default
		}
		
		
		public virtual   double minAngle(){
			unchecked {
				#line 22 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/EllipseArc.hx"
				return this._minAngle;
			}
			#line default
		}
		
		
		public virtual   double maxAngle(){
			unchecked {
				#line 23 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/EllipseArc.hx"
				return this._maxAngle;
			}
			#line default
		}
		
		
		public override   double __hx_setField_f(string field, int hash, double @value, bool handleProperties){
			unchecked {
				#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/EllipseArc.hx"
				switch (hash){
					case 345345518:
					{
						#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/EllipseArc.hx"
						this._maxAngle = ((double) (@value) );
						#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/EllipseArc.hx"
						return @value;
					}
					
					
					case 1638901824:
					{
						#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/EllipseArc.hx"
						this._minAngle = ((double) (@value) );
						#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/EllipseArc.hx"
						return @value;
					}
					
					
					default:
					{
						#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/EllipseArc.hx"
						return base.__hx_setField_f(field, hash, @value, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_setField(string field, int hash, object @value, bool handleProperties){
			unchecked {
				#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/EllipseArc.hx"
				switch (hash){
					case 345345518:
					{
						#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/EllipseArc.hx"
						this._maxAngle = ((double) (global::haxe.lang.Runtime.toDouble(@value)) );
						#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/EllipseArc.hx"
						return @value;
					}
					
					
					case 1638901824:
					{
						#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/EllipseArc.hx"
						this._minAngle = ((double) (global::haxe.lang.Runtime.toDouble(@value)) );
						#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/EllipseArc.hx"
						return @value;
					}
					
					
					case 1742509275:
					{
						#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/EllipseArc.hx"
						this._yaxis = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (@value) ))) );
						#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/EllipseArc.hx"
						return @value;
					}
					
					
					case 1417019482:
					{
						#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/EllipseArc.hx"
						this._xaxis = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (@value) ))) );
						#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/EllipseArc.hx"
						return @value;
					}
					
					
					case 1951545204:
					{
						#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/EllipseArc.hx"
						this._center = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (@value) ))) );
						#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/EllipseArc.hx"
						return @value;
					}
					
					
					default:
					{
						#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/EllipseArc.hx"
						return base.__hx_setField(field, hash, @value, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_getField(string field, int hash, bool throwErrors, bool isCheck, bool handleProperties){
			unchecked {
				#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/EllipseArc.hx"
				switch (hash){
					case 1291818639:
					{
						#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/EllipseArc.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("maxAngle") ), ((int) (1291818639) ))) );
					}
					
					
					case 437891297:
					{
						#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/EllipseArc.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("minAngle") ), ((int) (437891297) ))) );
					}
					
					
					case 1811238298:
					{
						#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/EllipseArc.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("yaxis") ), ((int) (1811238298) ))) );
					}
					
					
					case 1485748505:
					{
						#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/EllipseArc.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("xaxis") ), ((int) (1485748505) ))) );
					}
					
					
					case 98248149:
					{
						#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/EllipseArc.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("center") ), ((int) (98248149) ))) );
					}
					
					
					case 345345518:
					{
						#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/EllipseArc.hx"
						return this._maxAngle;
					}
					
					
					case 1638901824:
					{
						#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/EllipseArc.hx"
						return this._minAngle;
					}
					
					
					case 1742509275:
					{
						#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/EllipseArc.hx"
						return this._yaxis;
					}
					
					
					case 1417019482:
					{
						#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/EllipseArc.hx"
						return this._xaxis;
					}
					
					
					case 1951545204:
					{
						#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/EllipseArc.hx"
						return this._center;
					}
					
					
					default:
					{
						#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/EllipseArc.hx"
						return base.__hx_getField(field, hash, throwErrors, isCheck, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   double __hx_getField_f(string field, int hash, bool throwErrors, bool handleProperties){
			unchecked {
				#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/EllipseArc.hx"
				switch (hash){
					case 345345518:
					{
						#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/EllipseArc.hx"
						return this._maxAngle;
					}
					
					
					case 1638901824:
					{
						#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/EllipseArc.hx"
						return this._minAngle;
					}
					
					
					default:
					{
						#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/EllipseArc.hx"
						return base.__hx_getField_f(field, hash, throwErrors, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_invokeField(string field, int hash, global::Array dynargs){
			unchecked {
				#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/EllipseArc.hx"
				switch (hash){
					case 1291818639:
					{
						#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/EllipseArc.hx"
						return this.maxAngle();
					}
					
					
					case 437891297:
					{
						#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/EllipseArc.hx"
						return this.minAngle();
					}
					
					
					case 1811238298:
					{
						#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/EllipseArc.hx"
						return this.yaxis();
					}
					
					
					case 1485748505:
					{
						#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/EllipseArc.hx"
						return this.xaxis();
					}
					
					
					case 98248149:
					{
						#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/EllipseArc.hx"
						return this.center();
					}
					
					
					default:
					{
						#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/EllipseArc.hx"
						return base.__hx_invokeField(field, hash, dynargs);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   void __hx_getFields(global::Array<object> baseArr){
			unchecked {
				#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/EllipseArc.hx"
				baseArr.push("_maxAngle");
				#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/EllipseArc.hx"
				baseArr.push("_minAngle");
				#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/EllipseArc.hx"
				baseArr.push("_yaxis");
				#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/EllipseArc.hx"
				baseArr.push("_xaxis");
				#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/EllipseArc.hx"
				baseArr.push("_center");
				#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/EllipseArc.hx"
				{
					#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/EllipseArc.hx"
					base.__hx_getFields(baseArr);
				}
				
			}
			#line default
		}
		
		
	}
}


