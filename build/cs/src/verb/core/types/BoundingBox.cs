
#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core.types{
	public  class BoundingBox : global::haxe.lang.HxObject {
		static BoundingBox() {
			#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
			global::verb.core.types.BoundingBox.TOLERANCE = 1e-4;
		}
		public    BoundingBox(global::haxe.lang.EmptyObject empty){
			unchecked {
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
				{
				}
				
			}
			#line default
		}
		
		
		public    BoundingBox(global::Array<object> pts){
			unchecked {
				#line 20 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
				global::verb.core.types.BoundingBox.__hx_ctor_verb_core_types_BoundingBox(this, pts);
			}
			#line default
		}
		
		
		public static   void __hx_ctor_verb_core_types_BoundingBox(global::verb.core.types.BoundingBox __temp_me78, global::Array<object> pts){
			unchecked {
				#line 13 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
				__temp_me78.max = default(global::Array<double>);
				#line 12 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
				__temp_me78.min = default(global::Array<double>);
				#line 11 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
				__temp_me78.dim = 3;
				#line 10 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
				__temp_me78.initialized = false;
				#line 21 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
				if (( pts != default(global::Array<object>) )) {
					#line 22 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
					__temp_me78.addRange(pts);
				}
				
			}
			#line default
		}
		
		
		public static  double TOLERANCE;
		
		public static   bool intervalsOverlap(double a1, double a2, double b1, double b2, global::haxe.lang.Null<double> tol){
			unchecked {
				#line 117 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
				double __temp_tol77 = ( ( ! (tol.hasValue) ) ? (((double) (-1) )) : (tol.@value) );
				#line 119 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
				double tol1 = default(double);
				#line 119 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
				if (( __temp_tol77 < 0 )) {
					#line 119 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
					tol1 = global::verb.core.types.BoundingBox.TOLERANCE;
				}
				 else {
					#line 119 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
					tol1 = __temp_tol77;
				}
				
				#line 120 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
				double x1 = ( global::System.Math.Min(((double) (a1) ), ((double) (a2) )) - tol1 );
				double x2 = ( global::System.Math.Max(((double) (a1) ), ((double) (a2) )) + tol1 );
				double y1 = ( global::System.Math.Min(((double) (b1) ), ((double) (b2) )) - tol1 );
				double y2 = ( global::System.Math.Max(((double) (b1) ), ((double) (b2) )) + tol1 );
				#line 125 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
				return ( ( ( ( ( x1 >= y1 ) && ( x1 <= y2 ) ) || ( ( x2 >= y1 ) && ( x2 <= y2 ) ) ) || ( ( y1 >= x1 ) && ( y1 <= x2 ) ) ) || ( ( y2 >= x1 ) && ( y2 <= x2 ) ) );
			}
			#line default
		}
		
		
		public static  new object __hx_createEmpty(){
			unchecked {
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
				return new global::verb.core.types.BoundingBox(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) ));
			}
			#line default
		}
		
		
		public static  new object __hx_create(global::Array arr){
			unchecked {
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
				return new global::verb.core.types.BoundingBox(((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (arr[0]) ))) ));
			}
			#line default
		}
		
		
		public  bool initialized;
		
		public  int dim;
		
		public  global::Array<double> min;
		
		public  global::Array<double> max;
		
		public virtual   global::verb.core.types.BoundingBox fromPoint(global::Array<double> pt){
			unchecked {
				#line 35 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
				return new global::verb.core.types.BoundingBox(((global::Array<object>) (new global::Array<object>(new object[]{pt})) ));
			}
			#line default
		}
		
		
		public virtual   global::verb.core.types.BoundingBox @add(global::Array<double> point){
			unchecked {
				#line 49 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
				if ( ! (this.initialized) ) {
					#line 51 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
					this.dim = point.length;
					this.min = point.slice(0, default(global::haxe.lang.Null<int>));
					this.max = point.slice(0, default(global::haxe.lang.Null<int>));
					this.initialized = true;
					#line 56 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
					return this;
				}
				
				#line 59 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
				{
					#line 59 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
					int _g1 = 0;
					#line 59 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
					int _g = this.dim;
					#line 59 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
					while (( _g1 < _g )){
						#line 59 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
						int i = _g1++;
						if (( point[i] > this.max[i] )) {
							#line 60 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
							this.max[i] = point[i];
						}
						
						#line 61 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
						if (( point[i] < this.min[i] )) {
							#line 61 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
							this.min[i] = point[i];
						}
						
					}
					
				}
				
				#line 64 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
				return this;
			}
			#line default
		}
		
		
		public virtual   global::verb.core.types.BoundingBox addRange(global::Array<object> points){
			unchecked {
				#line 78 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
				int l = points.length;
				#line 80 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
				{
					#line 80 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
					int _g = 0;
					#line 80 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
					while (( _g < ((int) (l) ) )){
						#line 80 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
						int i = _g++;
						this.@add(((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (points[i]) ))) ));
					}
					
				}
				
				#line 84 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
				return this;
			}
			#line default
		}
		
		
		public virtual   bool contains(global::Array<double> point, global::haxe.lang.Null<double> tol){
			unchecked {
				#line 96 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
				double __temp_tol75 = ( ( ! (tol.hasValue) ) ? (((double) (-1) )) : (tol.@value) );
				#line 98 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
				if ( ! (this.initialized) ) {
					#line 100 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
					return false;
				}
				
				#line 103 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
				return this.intersects(new global::verb.core.types.BoundingBox(((global::Array<object>) (new global::Array<object>(new object[]{point})) )), new global::haxe.lang.Null<double>(__temp_tol75, true));
			}
			#line default
		}
		
		
		public virtual   bool intersects(global::verb.core.types.BoundingBox bb, global::haxe.lang.Null<double> tol){
			unchecked {
				#line 136 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
				double __temp_tol76 = ( ( ! (tol.hasValue) ) ? (((double) (-1) )) : (tol.@value) );
				#line 138 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
				if ((  ! (this.initialized)  ||  ! (bb.initialized)  )) {
					#line 138 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
					return false;
				}
				
				#line 140 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
				global::Array<double> a1 = this.min;
				global::Array<double> a2 = this.max;
				global::Array<double> b1 = bb.min;
				global::Array<double> b2 = bb.max;
				#line 145 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
				{
					#line 145 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
					int _g1 = 0;
					#line 145 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
					int _g = ((int) (this.dim) );
					#line 145 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
					while (( _g1 < _g )){
						#line 145 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
						int i = _g1++;
						if ( ! (global::verb.core.types.BoundingBox.intervalsOverlap(a1[i], a2[i], b1[i], b2[i], new global::haxe.lang.Null<double>(__temp_tol76, true))) ) {
							#line 146 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
							return false;
						}
						
					}
					
				}
				
				#line 149 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
				return true;
			}
			#line default
		}
		
		
		public virtual   global::verb.core.types.BoundingBox clear(){
			unchecked {
				#line 159 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
				this.initialized = false;
				return this;
			}
			#line default
		}
		
		
		public virtual   int getLongestAxis(){
			unchecked {
				#line 170 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
				double max = 0.0;
				int id = 0;
				#line 173 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
				{
					#line 173 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
					int _g1 = 0;
					#line 173 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
					int _g = this.dim;
					#line 173 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
					while (( _g1 < _g )){
						#line 173 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
						int i = _g1++;
						double l = this.getAxisLength(i);
						if (( l > max )) {
							#line 176 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
							max = l;
							id = i;
						}
						
					}
					
				}
				
				#line 181 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
				return id;
			}
			#line default
		}
		
		
		public virtual   double getAxisLength(int i){
			unchecked {
				#line 193 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
				if (( ( i < 0 ) || ( i > ( this.dim - 1 ) ) )) {
					#line 193 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
					return 0.0;
				}
				
				#line 194 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
				return global::System.Math.Abs(((double) (( this.min[i] - this.max[i] )) ));
			}
			#line default
		}
		
		
		public virtual   global::verb.core.types.BoundingBox intersect(global::verb.core.types.BoundingBox bb, double tol){
			unchecked {
				#line 208 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
				if ( ! (this.initialized) ) {
					#line 208 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
					return default(global::verb.core.types.BoundingBox);
				}
				
				#line 210 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
				global::Array<double> a1 = this.min;
				global::Array<double> a2 = this.max;
				global::Array<double> b1 = bb.min;
				global::Array<double> b2 = bb.max;
				#line 215 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
				if ( ! (this.intersects(bb, new global::haxe.lang.Null<double>(tol, true))) ) {
					#line 215 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
					return default(global::verb.core.types.BoundingBox);
				}
				
				#line 217 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
				global::Array<double> maxbb = new global::Array<double>(new double[]{});
				global::Array<double> minbb = new global::Array<double>(new double[]{});
				#line 220 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
				{
					#line 220 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
					int _g1 = 0;
					#line 220 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
					int _g = this.dim;
					#line 220 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
					while (( _g1 < _g )){
						#line 220 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
						int i = _g1++;
						maxbb.push(global::System.Math.Min(((double) (a2[i]) ), ((double) (b2[i]) )));
						minbb.push(global::System.Math.Max(((double) (a1[i]) ), ((double) (b1[i]) )));
					}
					
				}
				
				#line 225 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
				return new global::verb.core.types.BoundingBox(((global::Array<object>) (new global::Array<object>(new object[]{minbb, maxbb})) ));
			}
			#line default
		}
		
		
		public override   double __hx_setField_f(string field, int hash, double @value, bool handleProperties){
			unchecked {
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
				switch (hash){
					case 4996424:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
						this.dim = ((int) (@value) );
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
						return @value;
					}
					
					
					default:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
						return base.__hx_setField_f(field, hash, @value, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_setField(string field, int hash, object @value, bool handleProperties){
			unchecked {
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
				switch (hash){
					case 5442212:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
						this.max = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (@value) ))) );
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
						return @value;
					}
					
					
					case 5443986:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
						this.min = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (@value) ))) );
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
						return @value;
					}
					
					
					case 4996424:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
						this.dim = ((int) (global::haxe.lang.Runtime.toInt(@value)) );
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
						return @value;
					}
					
					
					case 923792660:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
						this.initialized = global::haxe.lang.Runtime.toBool(@value);
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
						return @value;
					}
					
					
					default:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
						return base.__hx_setField(field, hash, @value, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_getField(string field, int hash, bool throwErrors, bool isCheck, bool handleProperties){
			unchecked {
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
				switch (hash){
					case 1114964191:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("intersect") ), ((int) (1114964191) ))) );
					}
					
					
					case 289681565:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("getAxisLength") ), ((int) (289681565) ))) );
					}
					
					
					case 1167360277:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("getLongestAxis") ), ((int) (1167360277) ))) );
					}
					
					
					case 1213952397:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("clear") ), ((int) (1213952397) ))) );
					}
					
					
					case 1676395188:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("intersects") ), ((int) (1676395188) ))) );
					}
					
					
					case 746281503:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("contains") ), ((int) (746281503) ))) );
					}
					
					
					case 1568459740:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("addRange") ), ((int) (1568459740) ))) );
					}
					
					
					case 4846113:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("add") ), ((int) (4846113) ))) );
					}
					
					
					case 2065211014:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("fromPoint") ), ((int) (2065211014) ))) );
					}
					
					
					case 5442212:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
						return this.max;
					}
					
					
					case 5443986:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
						return this.min;
					}
					
					
					case 4996424:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
						return this.dim;
					}
					
					
					case 923792660:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
						return this.initialized;
					}
					
					
					default:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
						return base.__hx_getField(field, hash, throwErrors, isCheck, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   double __hx_getField_f(string field, int hash, bool throwErrors, bool handleProperties){
			unchecked {
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
				switch (hash){
					case 4996424:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
						return ((double) (this.dim) );
					}
					
					
					default:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
						return base.__hx_getField_f(field, hash, throwErrors, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_invokeField(string field, int hash, global::Array dynargs){
			unchecked {
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
				switch (hash){
					case 1114964191:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
						return this.intersect(((global::verb.core.types.BoundingBox) (dynargs[0]) ), ((double) (global::haxe.lang.Runtime.toDouble(dynargs[1])) ));
					}
					
					
					case 289681565:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
						return this.getAxisLength(((int) (global::haxe.lang.Runtime.toInt(dynargs[0])) ));
					}
					
					
					case 1167360277:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
						return this.getLongestAxis();
					}
					
					
					case 1213952397:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
						return this.clear();
					}
					
					
					case 1676395188:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
						return this.intersects(((global::verb.core.types.BoundingBox) (dynargs[0]) ), global::haxe.lang.Null<object>.ofDynamic<double>(dynargs[1]));
					}
					
					
					case 746281503:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
						return this.contains(((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (dynargs[0]) ))) ), global::haxe.lang.Null<object>.ofDynamic<double>(dynargs[1]));
					}
					
					
					case 1568459740:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
						return this.addRange(((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (dynargs[0]) ))) ));
					}
					
					
					case 4846113:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
						return this.@add(((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (dynargs[0]) ))) ));
					}
					
					
					case 2065211014:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
						return this.fromPoint(((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (dynargs[0]) ))) ));
					}
					
					
					default:
					{
						#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
						return base.__hx_invokeField(field, hash, dynargs);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   void __hx_getFields(global::Array<object> baseArr){
			unchecked {
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
				baseArr.push("max");
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
				baseArr.push("min");
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
				baseArr.push("dim");
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
				baseArr.push("initialized");
				#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
				{
					#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/BoundingBox.hx"
					base.__hx_getFields(baseArr);
				}
				
			}
			#line default
		}
		
		
	}
}


