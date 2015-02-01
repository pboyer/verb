
#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core.types{
	public  class LazySurfaceBoundingBoxTree : global::haxe.lang.HxObject, global::verb.core.types.IBoundingBoxTree<object> {
		public    LazySurfaceBoundingBoxTree(global::haxe.lang.EmptyObject empty){
			unchecked {
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
				{
				}
				
			}
			#line default
		}
		
		
		public    LazySurfaceBoundingBoxTree(global::verb.core.types.NurbsSurfaceData surface, global::haxe.lang.Null<bool> splitV, global::haxe.lang.Null<double> knotTolU, global::haxe.lang.Null<double> knotTolV){
			unchecked {
				#line 13 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
				global::verb.core.types.LazySurfaceBoundingBoxTree.__hx_ctor_verb_core_types_LazySurfaceBoundingBoxTree(this, surface, splitV, knotTolU, knotTolV);
			}
			#line default
		}
		
		
		public static   void __hx_ctor_verb_core_types_LazySurfaceBoundingBoxTree(global::verb.core.types.LazySurfaceBoundingBoxTree __temp_me91, global::verb.core.types.NurbsSurfaceData surface, global::haxe.lang.Null<bool> splitV, global::haxe.lang.Null<double> knotTolU, global::haxe.lang.Null<double> knotTolV){
			unchecked {
				#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
				__temp_me91._boundingBox = default(global::verb.core.types.BoundingBox);
				#line 13 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
				bool __temp_splitV90 = ( ( ! (splitV.hasValue) ) ? (global::haxe.lang.Runtime.toBool(false)) : (splitV.@value) );
				__temp_me91._surface = surface;
				__temp_me91._splitV = __temp_splitV90;
				#line 17 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
				if ( ! (knotTolU.hasValue) ) {
					#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
					double __temp_stmt264 = default(double);
					#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
					{
						#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
						global::Array<double> a = surface.knotsU;
						#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
						__temp_stmt264 = a[( a.length - 1 )];
					}
					
					#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
					knotTolU = new global::haxe.lang.Null<double>(( (( __temp_stmt264 - surface.knotsU[0] )) / 1000 ), true);
				}
				
				#line 21 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
				if ( ! (knotTolV.hasValue) ) {
					#line 22 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
					double __temp_stmt265 = default(double);
					#line 22 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
					{
						#line 22 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
						global::Array<double> a1 = surface.knotsV;
						#line 22 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
						__temp_stmt265 = a1[( a1.length - 1 )];
					}
					
					#line 22 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
					knotTolV = new global::haxe.lang.Null<double>(( (( __temp_stmt265 - surface.knotsV[0] )) / 1000 ), true);
				}
				
				#line 25 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
				__temp_me91._knotTolU = knotTolU.@value;
				__temp_me91._knotTolV = knotTolV.@value;
			}
			#line default
		}
		
		
		public static  new object __hx_createEmpty(){
			unchecked {
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
				return new global::verb.core.types.LazySurfaceBoundingBoxTree(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) ));
			}
			#line default
		}
		
		
		public static  new object __hx_create(global::Array arr){
			unchecked {
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
				return new global::verb.core.types.LazySurfaceBoundingBoxTree(((global::verb.core.types.NurbsSurfaceData) (arr[0]) ), global::haxe.lang.Null<object>.ofDynamic<bool>(arr[1]), global::haxe.lang.Null<object>.ofDynamic<double>(arr[2]), global::haxe.lang.Null<object>.ofDynamic<double>(arr[3]));
			}
			#line default
		}
		
		
		public virtual   object verb_core_types_IBoundingBoxTree_cast<T_c>(){
			unchecked {
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
				return this;
			}
			#line default
		}
		
		
		public  global::verb.core.types.NurbsSurfaceData _surface;
		
		public  global::verb.core.types.BoundingBox _boundingBox;
		
		public  bool _splitV;
		
		public  double _knotTolU;
		
		public  double _knotTolV;
		
		public virtual   global::verb.core.types.Pair<object, object> split(){
			unchecked {
				#line 31 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
				double min = default(double);
				double max = default(double);
				#line 34 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
				if (this._splitV) {
					#line 35 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
					min = this._surface.knotsV[0];
					{
						#line 36 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
						global::Array<double> a = this._surface.knotsV;
						#line 36 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
						max = a[( a.length - 1 )];
					}
					
				}
				 else {
					#line 38 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
					min = this._surface.knotsU[0];
					{
						#line 39 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
						global::Array<double> a1 = this._surface.knotsU;
						#line 39 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
						max = a1[( a1.length - 1 )];
					}
					
				}
				
				#line 42 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
				double dom = ( max - min );
				double pivot = ( ( (( min + max )) / 2.0 ) + ( ( dom * 0.01 ) * global::Math.rand.NextDouble() ) );
				#line 45 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
				global::Array<object> srfs = global::verb.core.Modify.surfaceSplit(this._surface, pivot, new global::haxe.lang.Null<bool>(this._splitV, true));
				#line 47 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
				return new global::verb.core.types.Pair<object, object>(((object) (new global::verb.core.types.LazySurfaceBoundingBoxTree(((global::verb.core.types.NurbsSurfaceData) (srfs[0]) ), new global::haxe.lang.Null<bool>( ! (this._splitV) , true), new global::haxe.lang.Null<double>(this._knotTolU, true), new global::haxe.lang.Null<double>(this._knotTolV, true))) ), ((object) (new global::verb.core.types.LazySurfaceBoundingBoxTree(((global::verb.core.types.NurbsSurfaceData) (srfs[1]) ), new global::haxe.lang.Null<bool>( ! (this._splitV) , true), new global::haxe.lang.Null<double>(this._knotTolU, true), new global::haxe.lang.Null<double>(this._knotTolV, true))) ));
			}
			#line default
		}
		
		
		public virtual   global::verb.core.types.BoundingBox boundingBox(){
			unchecked {
				#line 53 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
				if (( this._boundingBox == default(global::verb.core.types.BoundingBox) )) {
					#line 54 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
					this._boundingBox = new global::verb.core.types.BoundingBox(((global::Array<object>) (default(global::Array<object>)) ));
					{
						#line 55 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
						int _g = 0;
						#line 55 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
						global::Array<object> _g1 = this._surface.controlPoints;
						#line 55 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
						while (( _g < _g1.length )){
							#line 55 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
							global::Array<object> row = ((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (_g1[_g]) ))) );
							#line 55 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
							 ++ _g;
							this._boundingBox.addRange(global::verb.core.Eval.dehomogenize1d(row));
						}
						
					}
					
				}
				
				#line 59 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
				return this._boundingBox;
			}
			#line default
		}
		
		
		   object global::verb.core.types.IBoundingBoxTree<object>.yield(){
			unchecked {
				#line 62 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
				return ((global::verb.core.types.NurbsSurfaceData) (this.@yield()) );
			}
			#line default
		}
		
		
		public virtual   global::verb.core.types.NurbsSurfaceData @yield(){
			unchecked {
				#line 63 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
				return this._surface;
			}
			#line default
		}
		
		
		public virtual   bool indivisible(double tolerance){
			unchecked {
				#line 67 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
				if (this._splitV) {
					#line 68 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
					double __temp_stmt263 = default(double);
					#line 68 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
					{
						#line 68 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
						global::Array<double> a = this._surface.knotsV;
						#line 68 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
						__temp_stmt263 = a[( a.length - 1 )];
					}
					
					#line 68 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
					return ( ( __temp_stmt263 - this._surface.knotsV[0] ) < this._knotTolV );
				}
				 else {
					#line 70 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
					double __temp_stmt262 = default(double);
					#line 70 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
					{
						#line 70 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
						global::Array<double> a1 = this._surface.knotsU;
						#line 70 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
						__temp_stmt262 = a1[( a1.length - 1 )];
					}
					
					#line 70 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
					return ( ( __temp_stmt262 - this._surface.knotsU[0] ) < this._knotTolU );
				}
				
			}
			#line default
		}
		
		
		public virtual   bool empty(){
			unchecked {
				#line 75 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
				return false;
			}
			#line default
		}
		
		
		public override   double __hx_setField_f(string field, int hash, double @value, bool handleProperties){
			unchecked {
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
				switch (hash){
					case 1909951916:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
						this._knotTolV = ((double) (@value) );
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
						return @value;
					}
					
					
					case 1909951915:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
						this._knotTolU = ((double) (@value) );
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
						return @value;
					}
					
					
					default:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
						return base.__hx_setField_f(field, hash, @value, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_setField(string field, int hash, object @value, bool handleProperties){
			unchecked {
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
				switch (hash){
					case 1909951916:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
						this._knotTolV = ((double) (global::haxe.lang.Runtime.toDouble(@value)) );
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
						return @value;
					}
					
					
					case 1909951915:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
						this._knotTolU = ((double) (global::haxe.lang.Runtime.toDouble(@value)) );
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
						return @value;
					}
					
					
					case 773170651:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
						this._splitV = global::haxe.lang.Runtime.toBool(@value);
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
						return @value;
					}
					
					
					case 1806779144:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
						this._boundingBox = ((global::verb.core.types.BoundingBox) (@value) );
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
						return @value;
					}
					
					
					case 385990574:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
						this._surface = ((global::verb.core.types.NurbsSurfaceData) (@value) );
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
						return @value;
					}
					
					
					default:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
						return base.__hx_setField(field, hash, @value, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_getField(string field, int hash, bool throwErrors, bool isCheck, bool handleProperties){
			unchecked {
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
				switch (hash){
					case 1876572813:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("empty") ), ((int) (1876572813) ))) );
					}
					
					
					case 2052836104:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("indivisible") ), ((int) (2052836104) ))) );
					}
					
					
					case 1899010637:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("yield") ), ((int) (1899010637) ))) );
					}
					
					
					case 94868743:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("boundingBox") ), ((int) (94868743) ))) );
					}
					
					
					case 24046298:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("split") ), ((int) (24046298) ))) );
					}
					
					
					case 1909951916:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
						return this._knotTolV;
					}
					
					
					case 1909951915:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
						return this._knotTolU;
					}
					
					
					case 773170651:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
						return this._splitV;
					}
					
					
					case 1806779144:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
						return this._boundingBox;
					}
					
					
					case 385990574:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
						return this._surface;
					}
					
					
					default:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
						return base.__hx_getField(field, hash, throwErrors, isCheck, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   double __hx_getField_f(string field, int hash, bool throwErrors, bool handleProperties){
			unchecked {
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
				switch (hash){
					case 1909951916:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
						return this._knotTolV;
					}
					
					
					case 1909951915:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
						return this._knotTolU;
					}
					
					
					default:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
						return base.__hx_getField_f(field, hash, throwErrors, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_invokeField(string field, int hash, global::Array dynargs){
			unchecked {
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
				switch (hash){
					case 1876572813:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
						return this.empty();
					}
					
					
					case 2052836104:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
						return this.indivisible(((double) (global::haxe.lang.Runtime.toDouble(dynargs[0])) ));
					}
					
					
					case 1899010637:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
						return ((global::verb.core.types.NurbsSurfaceData) (this.@yield()) );
					}
					
					
					case 94868743:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
						return this.boundingBox();
					}
					
					
					case 24046298:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
						return this.split();
					}
					
					
					default:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
						return base.__hx_invokeField(field, hash, dynargs);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   void __hx_getFields(global::Array<object> baseArr){
			unchecked {
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
				baseArr.push("_knotTolV");
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
				baseArr.push("_knotTolU");
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
				baseArr.push("_splitV");
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
				baseArr.push("_boundingBox");
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
				baseArr.push("_surface");
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
				{
					#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazySurfaceBoundingBoxTree.hx"
					base.__hx_getFields(baseArr);
				}
				
			}
			#line default
		}
		
		
	}
}


