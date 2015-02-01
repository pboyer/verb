
#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.geom{
	public  class Line : global::verb.geom.NurbsCurve {
		public    Line(global::haxe.lang.EmptyObject empty) : base(global::haxe.lang.EmptyObject.EMPTY){
			unchecked {
			}
			#line default
		}
		
		
		public    Line(global::Array<double> start, global::Array<double> end) : base(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) )){
			unchecked {
				#line 26 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/Line.hx"
				global::verb.geom.Line.__hx_ctor_verb_geom_Line(this, start, end);
			}
			#line default
		}
		
		
		public static   void __hx_ctor_verb_geom_Line(global::verb.geom.Line __temp_me137, global::Array<double> start, global::Array<double> end){
			unchecked {
				#line 26 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/Line.hx"
				global::verb.geom.NurbsCurve.__hx_ctor_verb_geom_NurbsCurve(__temp_me137, global::verb.core.Make.polyline(new global::Array<object>(new object[]{start, end})));
				#line 28 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/Line.hx"
				__temp_me137._start = start;
				__temp_me137._end = end;
			}
			#line default
		}
		
		
		public static  new object __hx_createEmpty(){
			unchecked {
				#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/Line.hx"
				return new global::verb.geom.Line(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) ));
			}
			#line default
		}
		
		
		public static  new object __hx_create(global::Array arr){
			unchecked {
				#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/Line.hx"
				return new global::verb.geom.Line(((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (arr[0]) ))) ), ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (arr[1]) ))) ));
			}
			#line default
		}
		
		
		public  global::Array<double> _start;
		
		public  global::Array<double> _end;
		
		public virtual   global::Array<double> start(){
			unchecked {
				#line 16 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/Line.hx"
				return this._start;
			}
			#line default
		}
		
		
		public virtual   global::Array<double> end(){
			unchecked {
				#line 17 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/Line.hx"
				return this._end;
			}
			#line default
		}
		
		
		public override   object __hx_setField(string field, int hash, object @value, bool handleProperties){
			unchecked {
				#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/Line.hx"
				switch (hash){
					case 1058556124:
					{
						#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/Line.hx"
						this._end = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (@value) ))) );
						#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/Line.hx"
						return @value;
					}
					
					
					case 2146614179:
					{
						#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/Line.hx"
						this._start = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (@value) ))) );
						#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/Line.hx"
						return @value;
					}
					
					
					default:
					{
						#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/Line.hx"
						return base.__hx_setField(field, hash, @value, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_getField(string field, int hash, bool throwErrors, bool isCheck, bool handleProperties){
			unchecked {
				#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/Line.hx"
				switch (hash){
					case 5047259:
					{
						#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/Line.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("end") ), ((int) (5047259) ))) );
					}
					
					
					case 67859554:
					{
						#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/Line.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("start") ), ((int) (67859554) ))) );
					}
					
					
					case 1058556124:
					{
						#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/Line.hx"
						return this._end;
					}
					
					
					case 2146614179:
					{
						#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/Line.hx"
						return this._start;
					}
					
					
					default:
					{
						#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/Line.hx"
						return base.__hx_getField(field, hash, throwErrors, isCheck, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_invokeField(string field, int hash, global::Array dynargs){
			unchecked {
				#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/Line.hx"
				switch (hash){
					case 5047259:
					{
						#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/Line.hx"
						return this.end();
					}
					
					
					case 67859554:
					{
						#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/Line.hx"
						return this.start();
					}
					
					
					default:
					{
						#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/Line.hx"
						return base.__hx_invokeField(field, hash, dynargs);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   void __hx_getFields(global::Array<object> baseArr){
			unchecked {
				#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/Line.hx"
				baseArr.push("_end");
				#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/Line.hx"
				baseArr.push("_start");
				#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/Line.hx"
				{
					#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/geom/Line.hx"
					base.__hx_getFields(baseArr);
				}
				
			}
			#line default
		}
		
		
	}
}


