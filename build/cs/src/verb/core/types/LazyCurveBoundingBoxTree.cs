
#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core.types{
	public  class LazyCurveBoundingBoxTree : global::haxe.lang.HxObject, global::verb.core.types.IBoundingBoxTree<object> {
		public    LazyCurveBoundingBoxTree(global::haxe.lang.EmptyObject empty){
			unchecked {
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyCurveBoundingBoxTree.hx"
				{
				}
				
			}
			#line default
		}
		
		
		public    LazyCurveBoundingBoxTree(global::verb.core.types.NurbsCurveData curve, global::haxe.lang.Null<double> knotTol){
			unchecked {
				#line 11 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyCurveBoundingBoxTree.hx"
				global::verb.core.types.LazyCurveBoundingBoxTree.__hx_ctor_verb_core_types_LazyCurveBoundingBoxTree(this, curve, knotTol);
			}
			#line default
		}
		
		
		public static   void __hx_ctor_verb_core_types_LazyCurveBoundingBoxTree(global::verb.core.types.LazyCurveBoundingBoxTree __temp_me87, global::verb.core.types.NurbsCurveData curve, global::haxe.lang.Null<double> knotTol){
			unchecked {
				#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyCurveBoundingBoxTree.hx"
				__temp_me87._boundingBox = default(global::verb.core.types.BoundingBox);
				#line 12 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyCurveBoundingBoxTree.hx"
				__temp_me87._curve = curve;
				if ( ! (knotTol.hasValue) ) {
					#line 14 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyCurveBoundingBoxTree.hx"
					double __temp_stmt260 = default(double);
					#line 14 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyCurveBoundingBoxTree.hx"
					{
						#line 14 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyCurveBoundingBoxTree.hx"
						global::Array<double> a = __temp_me87._curve.knots;
						#line 14 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyCurveBoundingBoxTree.hx"
						__temp_stmt260 = a[( a.length - 1 )];
					}
					
					#line 14 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyCurveBoundingBoxTree.hx"
					knotTol = new global::haxe.lang.Null<double>(( __temp_stmt260 - ( __temp_me87._curve.knots[0] / 1000 ) ), true);
				}
				
				#line 16 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyCurveBoundingBoxTree.hx"
				__temp_me87._knotTol = knotTol.@value;
			}
			#line default
		}
		
		
		public static  new object __hx_createEmpty(){
			unchecked {
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyCurveBoundingBoxTree.hx"
				return new global::verb.core.types.LazyCurveBoundingBoxTree(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) ));
			}
			#line default
		}
		
		
		public static  new object __hx_create(global::Array arr){
			unchecked {
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyCurveBoundingBoxTree.hx"
				return new global::verb.core.types.LazyCurveBoundingBoxTree(((global::verb.core.types.NurbsCurveData) (arr[0]) ), global::haxe.lang.Null<object>.ofDynamic<double>(arr[1]));
			}
			#line default
		}
		
		
		public virtual   object verb_core_types_IBoundingBoxTree_cast<T_c>(){
			unchecked {
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyCurveBoundingBoxTree.hx"
				return this;
			}
			#line default
		}
		
		
		public  global::verb.core.types.NurbsCurveData _curve;
		
		public  global::verb.core.types.BoundingBox _boundingBox;
		
		public  double _knotTol;
		
		public virtual   global::verb.core.types.Pair<object, object> split(){
			unchecked {
				#line 20 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyCurveBoundingBoxTree.hx"
				double min = this._curve.knots[0];
				double max = default(double);
				#line 21 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyCurveBoundingBoxTree.hx"
				{
					#line 21 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyCurveBoundingBoxTree.hx"
					global::Array<double> a = this._curve.knots;
					#line 21 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyCurveBoundingBoxTree.hx"
					max = a[( a.length - 1 )];
				}
				
				#line 22 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyCurveBoundingBoxTree.hx"
				double dom = ( max - min );
				#line 24 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyCurveBoundingBoxTree.hx"
				global::Array<object> crvs = global::verb.core.Modify.curveSplit(this._curve, ( ( (( max + min )) / 2.0 ) + ( ( dom * 0.01 ) * global::Math.rand.NextDouble() ) ));
				#line 26 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyCurveBoundingBoxTree.hx"
				return new global::verb.core.types.Pair<object, object>(((object) (new global::verb.core.types.LazyCurveBoundingBoxTree(((global::verb.core.types.NurbsCurveData) (crvs[0]) ), new global::haxe.lang.Null<double>(this._knotTol, true))) ), ((object) (new global::verb.core.types.LazyCurveBoundingBoxTree(((global::verb.core.types.NurbsCurveData) (crvs[1]) ), new global::haxe.lang.Null<double>(this._knotTol, true))) ));
			}
			#line default
		}
		
		
		public virtual   global::verb.core.types.BoundingBox boundingBox(){
			unchecked {
				#line 32 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyCurveBoundingBoxTree.hx"
				if (( this._boundingBox == default(global::verb.core.types.BoundingBox) )) {
					#line 33 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyCurveBoundingBoxTree.hx"
					this._boundingBox = new global::verb.core.types.BoundingBox(((global::Array<object>) (global::verb.core.Eval.dehomogenize1d(this._curve.controlPoints)) ));
				}
				
				#line 35 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyCurveBoundingBoxTree.hx"
				return this._boundingBox;
			}
			#line default
		}
		
		
		   object global::verb.core.types.IBoundingBoxTree<object>.yield(){
			unchecked {
				#line 38 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyCurveBoundingBoxTree.hx"
				return ((global::verb.core.types.NurbsCurveData) (this.@yield()) );
			}
			#line default
		}
		
		
		public virtual   global::verb.core.types.NurbsCurveData @yield(){
			unchecked {
				#line 39 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyCurveBoundingBoxTree.hx"
				return this._curve;
			}
			#line default
		}
		
		
		public virtual   bool indivisible(double tolerance){
			unchecked {
				#line 43 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyCurveBoundingBoxTree.hx"
				double __temp_stmt259 = default(double);
				#line 43 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyCurveBoundingBoxTree.hx"
				{
					#line 43 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyCurveBoundingBoxTree.hx"
					global::Array<double> a = this._curve.knots;
					#line 43 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyCurveBoundingBoxTree.hx"
					__temp_stmt259 = a[( a.length - 1 )];
				}
				
				#line 43 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyCurveBoundingBoxTree.hx"
				return ( ( __temp_stmt259 - this._curve.knots[0] ) < this._knotTol );
			}
			#line default
		}
		
		
		public virtual   bool empty(){
			unchecked {
				#line 47 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyCurveBoundingBoxTree.hx"
				return false;
			}
			#line default
		}
		
		
		public override   double __hx_setField_f(string field, int hash, double @value, bool handleProperties){
			unchecked {
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyCurveBoundingBoxTree.hx"
				switch (hash){
					case 1289351018:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyCurveBoundingBoxTree.hx"
						this._knotTol = ((double) (@value) );
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyCurveBoundingBoxTree.hx"
						return @value;
					}
					
					
					default:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyCurveBoundingBoxTree.hx"
						return base.__hx_setField_f(field, hash, @value, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_setField(string field, int hash, object @value, bool handleProperties){
			unchecked {
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyCurveBoundingBoxTree.hx"
				switch (hash){
					case 1289351018:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyCurveBoundingBoxTree.hx"
						this._knotTol = ((double) (global::haxe.lang.Runtime.toDouble(@value)) );
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyCurveBoundingBoxTree.hx"
						return @value;
					}
					
					
					case 1806779144:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyCurveBoundingBoxTree.hx"
						this._boundingBox = ((global::verb.core.types.BoundingBox) (@value) );
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyCurveBoundingBoxTree.hx"
						return @value;
					}
					
					
					case 1245680624:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyCurveBoundingBoxTree.hx"
						this._curve = ((global::verb.core.types.NurbsCurveData) (@value) );
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyCurveBoundingBoxTree.hx"
						return @value;
					}
					
					
					default:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyCurveBoundingBoxTree.hx"
						return base.__hx_setField(field, hash, @value, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_getField(string field, int hash, bool throwErrors, bool isCheck, bool handleProperties){
			unchecked {
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyCurveBoundingBoxTree.hx"
				switch (hash){
					case 1876572813:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyCurveBoundingBoxTree.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("empty") ), ((int) (1876572813) ))) );
					}
					
					
					case 2052836104:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyCurveBoundingBoxTree.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("indivisible") ), ((int) (2052836104) ))) );
					}
					
					
					case 1899010637:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyCurveBoundingBoxTree.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("yield") ), ((int) (1899010637) ))) );
					}
					
					
					case 94868743:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyCurveBoundingBoxTree.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("boundingBox") ), ((int) (94868743) ))) );
					}
					
					
					case 24046298:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyCurveBoundingBoxTree.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("split") ), ((int) (24046298) ))) );
					}
					
					
					case 1289351018:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyCurveBoundingBoxTree.hx"
						return this._knotTol;
					}
					
					
					case 1806779144:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyCurveBoundingBoxTree.hx"
						return this._boundingBox;
					}
					
					
					case 1245680624:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyCurveBoundingBoxTree.hx"
						return this._curve;
					}
					
					
					default:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyCurveBoundingBoxTree.hx"
						return base.__hx_getField(field, hash, throwErrors, isCheck, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   double __hx_getField_f(string field, int hash, bool throwErrors, bool handleProperties){
			unchecked {
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyCurveBoundingBoxTree.hx"
				switch (hash){
					case 1289351018:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyCurveBoundingBoxTree.hx"
						return this._knotTol;
					}
					
					
					default:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyCurveBoundingBoxTree.hx"
						return base.__hx_getField_f(field, hash, throwErrors, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_invokeField(string field, int hash, global::Array dynargs){
			unchecked {
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyCurveBoundingBoxTree.hx"
				switch (hash){
					case 1876572813:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyCurveBoundingBoxTree.hx"
						return this.empty();
					}
					
					
					case 2052836104:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyCurveBoundingBoxTree.hx"
						return this.indivisible(((double) (global::haxe.lang.Runtime.toDouble(dynargs[0])) ));
					}
					
					
					case 1899010637:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyCurveBoundingBoxTree.hx"
						return ((global::verb.core.types.NurbsCurveData) (this.@yield()) );
					}
					
					
					case 94868743:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyCurveBoundingBoxTree.hx"
						return this.boundingBox();
					}
					
					
					case 24046298:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyCurveBoundingBoxTree.hx"
						return this.split();
					}
					
					
					default:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyCurveBoundingBoxTree.hx"
						return base.__hx_invokeField(field, hash, dynargs);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   void __hx_getFields(global::Array<object> baseArr){
			unchecked {
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyCurveBoundingBoxTree.hx"
				baseArr.push("_knotTol");
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyCurveBoundingBoxTree.hx"
				baseArr.push("_boundingBox");
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyCurveBoundingBoxTree.hx"
				baseArr.push("_curve");
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyCurveBoundingBoxTree.hx"
				{
					#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/LazyCurveBoundingBoxTree.hx"
					base.__hx_getFields(baseArr);
				}
				
			}
			#line default
		}
		
		
	}
}


