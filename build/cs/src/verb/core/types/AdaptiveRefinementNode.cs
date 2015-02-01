
#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core.types{
	public  class AdaptiveRefinementOptions : global::haxe.lang.HxObject {
		public    AdaptiveRefinementOptions(global::haxe.lang.EmptyObject empty){
			unchecked {
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				{
				}
				
			}
			#line default
		}
		
		
		public    AdaptiveRefinementOptions(){
			unchecked {
				#line 13 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				global::verb.core.types.AdaptiveRefinementOptions.__hx_ctor_verb_core_types_AdaptiveRefinementOptions(this);
			}
			#line default
		}
		
		
		public static   void __hx_ctor_verb_core_types_AdaptiveRefinementOptions(global::verb.core.types.AdaptiveRefinementOptions __temp_me73){
			unchecked {
				#line 13 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				{
					#line 11 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
					__temp_me73.minDivsV = 1;
					#line 10 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
					__temp_me73.minDivsU = 1;
					#line 9 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
					__temp_me73.refine = true;
					#line 8 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
					__temp_me73.maxDepth = 10;
					#line 7 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
					__temp_me73.minDepth = 0;
					#line 6 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
					__temp_me73.normTol = 8.5e-2;
				}
				
			}
			#line default
		}
		
		
		public static  new object __hx_createEmpty(){
			unchecked {
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				return new global::verb.core.types.AdaptiveRefinementOptions(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) ));
			}
			#line default
		}
		
		
		public static  new object __hx_create(global::Array arr){
			unchecked {
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				return new global::verb.core.types.AdaptiveRefinementOptions();
			}
			#line default
		}
		
		
		public  double normTol;
		
		public  int minDepth;
		
		public  int maxDepth;
		
		public  bool refine;
		
		public  int minDivsU;
		
		public  int minDivsV;
		
		public override   double __hx_setField_f(string field, int hash, double @value, bool handleProperties){
			unchecked {
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				switch (hash){
					case 1359660322:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						this.minDivsV = ((int) (@value) );
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						return @value;
					}
					
					
					case 1359660321:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						this.minDivsU = ((int) (@value) );
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						return @value;
					}
					
					
					case 21447615:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						this.maxDepth = ((int) (@value) );
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						return @value;
					}
					
					
					case 1315003921:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						this.minDepth = ((int) (@value) );
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						return @value;
					}
					
					
					case 735090101:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						this.normTol = ((double) (@value) );
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						return @value;
					}
					
					
					default:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						return base.__hx_setField_f(field, hash, @value, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_setField(string field, int hash, object @value, bool handleProperties){
			unchecked {
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				switch (hash){
					case 1359660322:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						this.minDivsV = ((int) (global::haxe.lang.Runtime.toInt(@value)) );
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						return @value;
					}
					
					
					case 1359660321:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						this.minDivsU = ((int) (global::haxe.lang.Runtime.toInt(@value)) );
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						return @value;
					}
					
					
					case 2145618285:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						this.refine = global::haxe.lang.Runtime.toBool(@value);
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						return @value;
					}
					
					
					case 21447615:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						this.maxDepth = ((int) (global::haxe.lang.Runtime.toInt(@value)) );
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						return @value;
					}
					
					
					case 1315003921:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						this.minDepth = ((int) (global::haxe.lang.Runtime.toInt(@value)) );
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						return @value;
					}
					
					
					case 735090101:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						this.normTol = ((double) (global::haxe.lang.Runtime.toDouble(@value)) );
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						return @value;
					}
					
					
					default:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						return base.__hx_setField(field, hash, @value, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_getField(string field, int hash, bool throwErrors, bool isCheck, bool handleProperties){
			unchecked {
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				switch (hash){
					case 1359660322:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						return this.minDivsV;
					}
					
					
					case 1359660321:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						return this.minDivsU;
					}
					
					
					case 2145618285:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						return this.refine;
					}
					
					
					case 21447615:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						return this.maxDepth;
					}
					
					
					case 1315003921:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						return this.minDepth;
					}
					
					
					case 735090101:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						return this.normTol;
					}
					
					
					default:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						return base.__hx_getField(field, hash, throwErrors, isCheck, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   double __hx_getField_f(string field, int hash, bool throwErrors, bool handleProperties){
			unchecked {
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				switch (hash){
					case 1359660322:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						return ((double) (this.minDivsV) );
					}
					
					
					case 1359660321:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						return ((double) (this.minDivsU) );
					}
					
					
					case 21447615:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						return ((double) (this.maxDepth) );
					}
					
					
					case 1315003921:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						return ((double) (this.minDepth) );
					}
					
					
					case 735090101:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						return this.normTol;
					}
					
					
					default:
					{
						#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						return base.__hx_getField_f(field, hash, throwErrors, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   void __hx_getFields(global::Array<object> baseArr){
			unchecked {
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				baseArr.push("minDivsV");
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				baseArr.push("minDivsU");
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				baseArr.push("refine");
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				baseArr.push("maxDepth");
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				baseArr.push("minDepth");
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				baseArr.push("normTol");
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				{
					#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
					base.__hx_getFields(baseArr);
				}
				
			}
			#line default
		}
		
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core.types{
	public  class AdaptiveRefinementNode : global::haxe.lang.HxObject {
		public    AdaptiveRefinementNode(global::haxe.lang.EmptyObject empty){
			unchecked {
				#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				{
				}
				
			}
			#line default
		}
		
		
		public    AdaptiveRefinementNode(global::verb.core.types.NurbsSurfaceData srf, global::Array<object> corners, global::Array<object> neighbors){
			unchecked {
				#line 32 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				global::verb.core.types.AdaptiveRefinementNode.__hx_ctor_verb_core_types_AdaptiveRefinementNode(this, srf, corners, neighbors);
			}
			#line default
		}
		
		
		public static   void __hx_ctor_verb_core_types_AdaptiveRefinementNode(global::verb.core.types.AdaptiveRefinementNode __temp_me74, global::verb.core.types.NurbsSurfaceData srf, global::Array<object> corners, global::Array<object> neighbors){
			unchecked {
				#line 58 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				__temp_me74.srf = srf;
				if (( neighbors == default(global::Array<object>) )) {
					#line 59 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
					__temp_me74.neighbors = new global::Array<object>(new object[]{default(global::verb.core.types.AdaptiveRefinementNode), default(global::verb.core.types.AdaptiveRefinementNode), default(global::verb.core.types.AdaptiveRefinementNode), default(global::verb.core.types.AdaptiveRefinementNode)});
				}
				 else {
					#line 59 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
					__temp_me74.neighbors = neighbors;
				}
				
				#line 61 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				__temp_me74.corners = corners;
				#line 64 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				if (( __temp_me74.corners == default(global::Array<object>) )) {
					#line 65 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
					double u0 = srf.knotsU[0];
					double u1 = default(double);
					#line 66 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
					{
						#line 66 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						global::Array<double> a = srf.knotsU;
						#line 66 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						u1 = a[( a.length - 1 )];
					}
					
					#line 67 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
					double v0 = srf.knotsV[0];
					double v1 = default(double);
					#line 68 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
					{
						#line 68 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						global::Array<double> a1 = srf.knotsV;
						#line 68 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						v1 = a1[( a1.length - 1 )];
					}
					
					#line 70 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
					__temp_me74.corners = new global::Array<object>(new object[]{global::verb.core.types.SurfacePoint.fromUv(u0, v0), global::verb.core.types.SurfacePoint.fromUv(u1, v0), global::verb.core.types.SurfacePoint.fromUv(u1, v1), global::verb.core.types.SurfacePoint.fromUv(u0, v1)});
				}
				
			}
			#line default
		}
		
		
		public static  new object __hx_createEmpty(){
			unchecked {
				#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				return new global::verb.core.types.AdaptiveRefinementNode(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) ));
			}
			#line default
		}
		
		
		public static  new object __hx_create(global::Array arr){
			unchecked {
				#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				return new global::verb.core.types.AdaptiveRefinementNode(((global::verb.core.types.NurbsSurfaceData) (arr[0]) ), ((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (arr[1]) ))) ), ((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (arr[2]) ))) ));
			}
			#line default
		}
		
		
		public  global::verb.core.types.NurbsSurfaceData srf;
		
		public  global::Array<object> neighbors;
		
		public  global::Array<object> children;
		
		public  global::Array<object> corners;
		
		public  global::Array<object> midPoints;
		
		public  global::verb.core.types.SurfacePoint centerPoint;
		
		public  bool splitVert;
		
		public  bool splitHoriz;
		
		public  bool horizontal;
		
		public  double u05;
		
		public  double v05;
		
		public virtual   bool isLeaf(){
			unchecked {
				#line 80 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				return ( this.children == default(global::Array<object>) );
			}
			#line default
		}
		
		
		public virtual   global::verb.core.types.SurfacePoint center(){
			unchecked {
				#line 84 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				if (( this.centerPoint != default(global::verb.core.types.SurfacePoint) )) {
					#line 84 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
					return this.centerPoint;
				}
				 else {
					#line 84 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
					return this.evalSrf(this.u05, this.v05, default(global::verb.core.types.SurfacePoint));
				}
				
			}
			#line default
		}
		
		
		public virtual   void evalCorners(){
			unchecked {
				#line 90 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				this.u05 = ( (( ((global::verb.core.types.SurfacePoint) (this.corners[0]) ).uv[0] + ((global::verb.core.types.SurfacePoint) (this.corners[2]) ).uv[0] )) / 2 );
				this.v05 = ( (( ((global::verb.core.types.SurfacePoint) (this.corners[0]) ).uv[1] + ((global::verb.core.types.SurfacePoint) (this.corners[2]) ).uv[1] )) / 2 );
				#line 94 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				{
					#line 94 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
					int _g = 0;
					#line 94 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
					while (( _g < 4 )){
						#line 94 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						int i = _g++;
						#line 96 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						if (( ((global::verb.core.types.SurfacePoint) (this.corners[i]) ).point == default(global::Array<double>) )) {
							#line 98 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
							global::verb.core.types.SurfacePoint c = ((global::verb.core.types.SurfacePoint) (this.corners[i]) );
							this.evalSrf(c.uv[0], c.uv[1], c);
						}
						
					}
					
				}
				
			}
			#line default
		}
		
		
		public virtual   global::verb.core.types.SurfacePoint evalSrf(double u, double v, global::verb.core.types.SurfacePoint srfPt){
			unchecked {
				#line 106 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				global::Array<object> derivs = global::verb.core.Eval.rationalSurfaceDerivatives(this.srf, u, v, new global::haxe.lang.Null<int>(1, true));
				global::Array<double> pt = ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (derivs[0]) ))) )[0]) ))) );
				global::Array<double> norm = global::verb.core.Vec.cross(((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (derivs[0]) ))) )[1]) ))) ), ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (derivs[1]) ))) )[0]) ))) ));
				bool degen = global::verb.core.Vec.isZero(norm);
				#line 111 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				if ( ! (degen) ) {
					#line 111 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
					norm = global::verb.core.Vec.normalized(norm);
				}
				
				#line 113 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				if (( srfPt != default(global::verb.core.types.SurfacePoint) )) {
					#line 114 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
					srfPt.degen = degen;
					srfPt.point = pt;
					srfPt.normal = norm;
					return srfPt;
				}
				 else {
					#line 119 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
					return new global::verb.core.types.SurfacePoint(((global::Array<double>) (pt) ), ((global::Array<double>) (norm) ), ((global::Array<double>) (new global::Array<double>(new double[]{u, v})) ), new global::haxe.lang.Null<int>(-1, true), new global::haxe.lang.Null<bool>(degen, true));
				}
				
			}
			#line default
		}
		
		
		public virtual   global::Array<object> getEdgeCorners(int edgeIndex){
			unchecked {
				#line 126 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				if (this.isLeaf()) {
					#line 126 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
					return new global::Array<object>(new object[]{((global::verb.core.types.SurfacePoint) (this.corners[edgeIndex]) )});
				}
				
				#line 128 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				if (this.horizontal) {
					#line 130 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
					switch (edgeIndex){
						case 0:
						{
							#line 132 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
							return ((global::verb.core.types.AdaptiveRefinementNode) (this.children[0]) ).getEdgeCorners(0);
						}
						
						
						case 1:
						{
							#line 134 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
							return ((global::verb.core.types.AdaptiveRefinementNode) (this.children[0]) ).getEdgeCorners(1).concat(((global::verb.core.types.AdaptiveRefinementNode) (this.children[1]) ).getEdgeCorners(1));
						}
						
						
						case 2:
						{
							#line 136 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
							return ((global::verb.core.types.AdaptiveRefinementNode) (this.children[1]) ).getEdgeCorners(2);
						}
						
						
						case 3:
						{
							#line 138 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
							return ((global::verb.core.types.AdaptiveRefinementNode) (this.children[1]) ).getEdgeCorners(3).concat(((global::verb.core.types.AdaptiveRefinementNode) (this.children[0]) ).getEdgeCorners(3));
						}
						
						
					}
					
				}
				
				#line 144 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				switch (edgeIndex){
					case 0:
					{
						#line 146 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						return ((global::verb.core.types.AdaptiveRefinementNode) (this.children[0]) ).getEdgeCorners(0).concat(((global::verb.core.types.AdaptiveRefinementNode) (this.children[1]) ).getEdgeCorners(0));
					}
					
					
					case 1:
					{
						#line 148 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						return ((global::verb.core.types.AdaptiveRefinementNode) (this.children[1]) ).getEdgeCorners(1);
					}
					
					
					case 2:
					{
						#line 150 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						return ((global::verb.core.types.AdaptiveRefinementNode) (this.children[1]) ).getEdgeCorners(2).concat(((global::verb.core.types.AdaptiveRefinementNode) (this.children[0]) ).getEdgeCorners(2));
					}
					
					
					case 3:
					{
						#line 152 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						return ((global::verb.core.types.AdaptiveRefinementNode) (this.children[0]) ).getEdgeCorners(3);
					}
					
					
				}
				
				#line 155 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				return default(global::Array<object>);
			}
			#line default
		}
		
		
		public virtual   global::Array<object> getAllCorners(int edgeIndex){
			unchecked {
				#line 160 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				global::Array<object> baseArr = new global::Array<object>(new object[]{((global::verb.core.types.SurfacePoint) (this.corners[edgeIndex]) )});
				#line 162 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				if (( ((global::verb.core.types.AdaptiveRefinementNode) (this.neighbors[edgeIndex]) ) == default(global::verb.core.types.AdaptiveRefinementNode) )) {
					#line 163 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
					return baseArr;
				}
				
				#line 167 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				global::Array<object> corners = ((global::verb.core.types.AdaptiveRefinementNode) (this.neighbors[edgeIndex]) ).getEdgeCorners(( (( edgeIndex + 2 )) % 4 ));
				#line 169 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				int funcIndex = ( edgeIndex % 2 );
				#line 171 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				global::Array<double> e = new global::Array<double>(new double[]{1e-10});
				global::Array<object> that = new global::Array<object>(new object[]{this});
				#line 175 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				global::Array<object> rangeFuncMap = new global::Array<object>(new object[]{new global::verb.core.types.AdaptiveRefinementNode_getAllCorners_176__Fun(((global::Array<double>) (e) ), ((global::Array<object>) (that) )), new global::verb.core.types.AdaptiveRefinementNode_getAllCorners_177__Fun(((global::Array<double>) (e) ), ((global::Array<object>) (that) ))});
				#line 181 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				global::Array<object> cornercopy = corners.filter(((global::haxe.lang.Function) (rangeFuncMap[funcIndex]) ));
				cornercopy.reverse();
				return baseArr.concat(cornercopy);
			}
			#line default
		}
		
		
		public virtual   global::verb.core.types.SurfacePoint midpoint(int index){
			unchecked {
				#line 189 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				if (( this.midPoints == default(global::Array<object>) )) {
					#line 189 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
					this.midPoints = new global::Array<object>(new object[]{default(global::verb.core.types.SurfacePoint), default(global::verb.core.types.SurfacePoint), default(global::verb.core.types.SurfacePoint), default(global::verb.core.types.SurfacePoint)});
				}
				
				#line 190 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				if ( ! ((( ((global::verb.core.types.SurfacePoint) (this.midPoints[index]) ) == default(global::verb.core.types.SurfacePoint) ))) ) {
					#line 190 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
					return ((global::verb.core.types.SurfacePoint) (this.midPoints[index]) );
				}
				
				#line 192 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				switch (index){
					case 0:
					{
						#line 194 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						this.midPoints[0] = this.evalSrf(this.u05, ((global::verb.core.types.SurfacePoint) (this.corners[0]) ).uv[1], default(global::verb.core.types.SurfacePoint));
						#line 194 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						break;
					}
					
					
					case 1:
					{
						#line 196 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						this.midPoints[1] = this.evalSrf(((global::verb.core.types.SurfacePoint) (this.corners[1]) ).uv[0], this.v05, default(global::verb.core.types.SurfacePoint));
						#line 196 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						break;
					}
					
					
					case 2:
					{
						#line 198 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						this.midPoints[2] = this.evalSrf(this.u05, ((global::verb.core.types.SurfacePoint) (this.corners[2]) ).uv[1], default(global::verb.core.types.SurfacePoint));
						#line 198 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						break;
					}
					
					
					case 3:
					{
						#line 200 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						this.midPoints[3] = this.evalSrf(((global::verb.core.types.SurfacePoint) (this.corners[0]) ).uv[0], this.v05, default(global::verb.core.types.SurfacePoint));
						#line 200 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						break;
					}
					
					
				}
				
				#line 203 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				return ((global::verb.core.types.SurfacePoint) (this.midPoints[index]) );
			}
			#line default
		}
		
		
		public virtual   bool hasBadNormals(){
			unchecked {
				#line 208 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				return ( ( ( ((global::verb.core.types.SurfacePoint) (this.corners[0]) ).degen || ((global::verb.core.types.SurfacePoint) (this.corners[1]) ).degen ) || ((global::verb.core.types.SurfacePoint) (this.corners[2]) ).degen ) || ((global::verb.core.types.SurfacePoint) (this.corners[3]) ).degen );
			}
			#line default
		}
		
		
		public virtual   void fixNormals(){
			unchecked {
				#line 212 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				int l = this.corners.length;
				#line 214 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				{
					#line 214 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
					int _g = 0;
					#line 214 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
					while (( _g < ((int) (l) ) )){
						#line 214 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						int i = _g++;
						global::verb.core.types.SurfacePoint corn = ((global::verb.core.types.SurfacePoint) (this.corners[i]) );
						#line 217 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						if (((global::verb.core.types.SurfacePoint) (this.corners[i]) ).degen) {
							#line 219 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
							global::verb.core.types.SurfacePoint v1 = ((global::verb.core.types.SurfacePoint) (this.corners[( (( i + 1 )) % l )]) );
							global::verb.core.types.SurfacePoint v2 = ((global::verb.core.types.SurfacePoint) (this.corners[( (( i + 3 )) % l )]) );
							#line 223 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
							if (v1.degen) {
								#line 223 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
								((global::verb.core.types.SurfacePoint) (this.corners[i]) ).normal = v2.normal;
							}
							 else {
								#line 223 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
								((global::verb.core.types.SurfacePoint) (this.corners[i]) ).normal = v1.normal;
							}
							
						}
						
					}
					
				}
				
			}
			#line default
		}
		
		
		public virtual   bool shouldDivide(global::verb.core.types.AdaptiveRefinementOptions options, int currentDepth){
			unchecked {
				#line 230 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				if (( currentDepth < options.minDepth )) {
					#line 230 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
					return true;
				}
				
				#line 231 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				if (( currentDepth >= options.maxDepth )) {
					#line 231 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
					return false;
				}
				
				#line 233 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				if (this.hasBadNormals()) {
					#line 234 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
					this.fixNormals();
					#line 236 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
					return false;
				}
				
				#line 239 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				this.splitVert = ( ( global::verb.core.Vec.normSquared(global::verb.core.Vec.sub(((global::verb.core.types.SurfacePoint) (this.corners[0]) ).normal, ((global::verb.core.types.SurfacePoint) (this.corners[1]) ).normal)) > options.normTol ) || ( global::verb.core.Vec.normSquared(global::verb.core.Vec.sub(((global::verb.core.types.SurfacePoint) (this.corners[2]) ).normal, ((global::verb.core.types.SurfacePoint) (this.corners[3]) ).normal)) > options.normTol ) );
				#line 242 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				this.splitHoriz = ( ( global::verb.core.Vec.normSquared(global::verb.core.Vec.sub(((global::verb.core.types.SurfacePoint) (this.corners[1]) ).normal, ((global::verb.core.types.SurfacePoint) (this.corners[2]) ).normal)) > options.normTol ) || ( global::verb.core.Vec.normSquared(global::verb.core.Vec.sub(((global::verb.core.types.SurfacePoint) (this.corners[3]) ).normal, ((global::verb.core.types.SurfacePoint) (this.corners[0]) ).normal)) > options.normTol ) );
				#line 245 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				if (( this.splitVert || this.splitHoriz )) {
					#line 245 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
					return true;
				}
				
				#line 247 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				global::verb.core.types.SurfacePoint center = this.center();
				#line 249 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				return ( ( ( ( global::verb.core.Vec.normSquared(global::verb.core.Vec.sub(center.normal, ((global::verb.core.types.SurfacePoint) (this.corners[0]) ).normal)) > options.normTol ) || ( global::verb.core.Vec.normSquared(global::verb.core.Vec.sub(center.normal, ((global::verb.core.types.SurfacePoint) (this.corners[1]) ).normal)) > options.normTol ) ) || ( global::verb.core.Vec.normSquared(global::verb.core.Vec.sub(center.normal, ((global::verb.core.types.SurfacePoint) (this.corners[2]) ).normal)) > options.normTol ) ) || ( global::verb.core.Vec.normSquared(global::verb.core.Vec.sub(center.normal, ((global::verb.core.types.SurfacePoint) (this.corners[3]) ).normal)) > options.normTol ) );
			}
			#line default
		}
		
		
		public virtual   void divide(global::verb.core.types.AdaptiveRefinementOptions options){
			unchecked {
				#line 256 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				if (( options == default(global::verb.core.types.AdaptiveRefinementOptions) )) {
					#line 256 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
					options = new global::verb.core.types.AdaptiveRefinementOptions();
				}
				
				#line 263 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				this._divide(options, 0, true);
			}
			#line default
		}
		
		
		public virtual   void _divide(global::verb.core.types.AdaptiveRefinementOptions options, int currentDepth, bool horiz){
			unchecked {
				#line 268 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				this.evalCorners();
				#line 270 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				if ( ! (this.shouldDivide(options, currentDepth)) ) {
					#line 270 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
					return ;
				}
				
				#line 272 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				currentDepth++;
				#line 275 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				if (( this.splitVert &&  ! (this.splitHoriz)  )) {
					#line 276 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
					horiz = false;
				}
				 else {
					#line 277 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
					if ((  ! (this.splitVert)  && this.splitHoriz )) {
						#line 278 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						horiz = true;
					}
					
				}
				
				#line 281 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				this.horizontal = horiz;
				#line 283 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				if (this.horizontal) {
					#line 285 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
					global::Array<object> bott = new global::Array<object>(new object[]{((global::verb.core.types.SurfacePoint) (this.corners[0]) ), ((global::verb.core.types.SurfacePoint) (this.corners[1]) ), this.midpoint(1), this.midpoint(3)});
					global::Array<object> top = new global::Array<object>(new object[]{this.midpoint(3), this.midpoint(1), ((global::verb.core.types.SurfacePoint) (this.corners[2]) ), ((global::verb.core.types.SurfacePoint) (this.corners[3]) )});
					#line 288 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
					this.children = new global::Array<object>(new object[]{new global::verb.core.types.AdaptiveRefinementNode(((global::verb.core.types.NurbsSurfaceData) (this.srf) ), ((global::Array<object>) (bott) ), ((global::Array<object>) (default(global::Array<object>)) )), new global::verb.core.types.AdaptiveRefinementNode(((global::verb.core.types.NurbsSurfaceData) (this.srf) ), ((global::Array<object>) (top) ), ((global::Array<object>) (default(global::Array<object>)) ))});
					#line 291 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
					((global::verb.core.types.AdaptiveRefinementNode) (this.children[0]) ).neighbors = new global::Array<object>(new object[]{((global::verb.core.types.AdaptiveRefinementNode) (this.neighbors[0]) ), ((global::verb.core.types.AdaptiveRefinementNode) (this.neighbors[1]) ), ((global::verb.core.types.AdaptiveRefinementNode) (this.children[1]) ), ((global::verb.core.types.AdaptiveRefinementNode) (this.neighbors[3]) )});
					#line 294 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
					((global::verb.core.types.AdaptiveRefinementNode) (this.children[1]) ).neighbors = new global::Array<object>(new object[]{((global::verb.core.types.AdaptiveRefinementNode) (this.children[0]) ), ((global::verb.core.types.AdaptiveRefinementNode) (this.neighbors[1]) ), ((global::verb.core.types.AdaptiveRefinementNode) (this.neighbors[2]) ), ((global::verb.core.types.AdaptiveRefinementNode) (this.neighbors[3]) )});
				}
				 else {
					#line 298 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
					global::Array<object> left = new global::Array<object>(new object[]{((global::verb.core.types.SurfacePoint) (this.corners[0]) ), this.midpoint(0), this.midpoint(2), ((global::verb.core.types.SurfacePoint) (this.corners[3]) )});
					global::Array<object> right = new global::Array<object>(new object[]{this.midpoint(0), ((global::verb.core.types.SurfacePoint) (this.corners[1]) ), ((global::verb.core.types.SurfacePoint) (this.corners[2]) ), this.midpoint(2)});
					#line 301 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
					this.children = new global::Array<object>(new object[]{new global::verb.core.types.AdaptiveRefinementNode(((global::verb.core.types.NurbsSurfaceData) (this.srf) ), ((global::Array<object>) (left) ), ((global::Array<object>) (default(global::Array<object>)) )), new global::verb.core.types.AdaptiveRefinementNode(((global::verb.core.types.NurbsSurfaceData) (this.srf) ), ((global::Array<object>) (right) ), ((global::Array<object>) (default(global::Array<object>)) ))});
					#line 303 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
					((global::verb.core.types.AdaptiveRefinementNode) (this.children[0]) ).neighbors = new global::Array<object>(new object[]{((global::verb.core.types.AdaptiveRefinementNode) (this.neighbors[0]) ), ((global::verb.core.types.AdaptiveRefinementNode) (this.children[1]) ), ((global::verb.core.types.AdaptiveRefinementNode) (this.neighbors[2]) ), ((global::verb.core.types.AdaptiveRefinementNode) (this.neighbors[3]) )});
					((global::verb.core.types.AdaptiveRefinementNode) (this.children[1]) ).neighbors = new global::Array<object>(new object[]{((global::verb.core.types.AdaptiveRefinementNode) (this.neighbors[0]) ), ((global::verb.core.types.AdaptiveRefinementNode) (this.neighbors[1]) ), ((global::verb.core.types.AdaptiveRefinementNode) (this.neighbors[2]) ), ((global::verb.core.types.AdaptiveRefinementNode) (this.children[0]) )});
				}
				
				#line 309 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				{
					#line 309 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
					int _g = 0;
					#line 309 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
					global::Array<object> _g1 = this.children;
					#line 309 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
					while (( _g < _g1.length )){
						#line 309 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						global::verb.core.types.AdaptiveRefinementNode child = ((global::verb.core.types.AdaptiveRefinementNode) (_g1[_g]) );
						#line 309 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						 ++ _g;
						child._divide(options, currentDepth,  ! (horiz) );
					}
					
				}
				
			}
			#line default
		}
		
		
		public virtual   global::verb.core.types.MeshData triangulate(global::verb.core.types.MeshData mesh){
			unchecked {
				#line 317 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				if (( mesh == default(global::verb.core.types.MeshData) )) {
					#line 317 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
					mesh = global::verb.core.types.MeshData.empty();
				}
				
				#line 319 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				if (this.isLeaf()) {
					#line 319 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
					return this.triangulateLeaf(mesh);
				}
				
				#line 322 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				{
					#line 322 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
					int _g = 0;
					#line 322 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
					global::Array<object> _g1 = this.children;
					#line 322 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
					while (( _g < _g1.length )){
						#line 322 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						global::verb.core.types.AdaptiveRefinementNode x = ((global::verb.core.types.AdaptiveRefinementNode) (_g1[_g]) );
						#line 322 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						 ++ _g;
						if (( x == default(global::verb.core.types.AdaptiveRefinementNode) )) {
							#line 323 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
							break;
						}
						
						#line 324 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						x.triangulate(mesh);
					}
					
				}
				
				#line 327 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				return mesh;
			}
			#line default
		}
		
		
		public virtual   global::verb.core.types.MeshData triangulateLeaf(global::verb.core.types.MeshData mesh){
			unchecked {
				#line 332 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				int baseIndex = mesh.points.length;
				global::Array<object> uvs = new global::Array<object>(new object[]{});
				global::Array<int> ids = new global::Array<int>(new int[]{});
				int splitid = 0;
				#line 338 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				{
					#line 338 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
					int _g = 0;
					#line 338 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
					while (( _g < 4 )){
						#line 338 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						int i = _g++;
						#line 340 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						global::Array<object> edgeCorners = this.getAllCorners(i);
						#line 343 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						if (( edgeCorners.length == 2 )) {
							#line 343 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
							splitid = ( i + 1 );
						}
						
						#line 345 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						{
							#line 345 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
							int _g2 = 0;
							#line 345 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
							int _g1 = edgeCorners.length;
							#line 345 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
							while (( _g2 < _g1 )){
								#line 345 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
								int j = _g2++;
								uvs.push(((global::verb.core.types.SurfacePoint) (edgeCorners[j]) ));
							}
							
						}
						
					}
					
				}
				
				#line 350 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				{
					#line 350 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
					int _g3 = 0;
					#line 350 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
					while (( _g3 < uvs.length )){
						#line 350 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						global::verb.core.types.SurfacePoint corner = ((global::verb.core.types.SurfacePoint) (uvs[_g3]) );
						#line 350 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						 ++ _g3;
						#line 353 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						if (( corner.id != -1 )) {
							#line 354 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
							ids.push(corner.id);
							continue;
						}
						
						#line 358 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						mesh.uvs.push(corner.uv);
						mesh.points.push(corner.point);
						mesh.normals.push(corner.normal);
						#line 362 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						corner.id = baseIndex;
						ids.push(baseIndex);
						#line 365 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						baseIndex++;
					}
					
				}
				
				#line 368 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				if (( uvs.length == 4 )) {
					#line 372 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
					mesh.faces.push(new global::Array<int>(new int[]{ids[0], ids[3], ids[1]}));
					mesh.faces.push(new global::Array<int>(new int[]{ids[3], ids[2], ids[1]}));
					#line 376 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
					return mesh;
				}
				 else {
					#line 378 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
					if (( uvs.length == 5 )) {
						#line 381 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						int il = ids.length;
						#line 384 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						mesh.faces.push(new global::Array<int>(new int[]{ids[splitid], ids[( (( splitid + 1 )) % il )], ids[( (( splitid + 2 )) % il )]}));
						#line 388 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						mesh.faces.push(new global::Array<int>(new int[]{ids[( (( splitid + 4 )) % il )], ids[( (( splitid + 3 )) % il )], ids[splitid]}));
						#line 392 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						mesh.faces.push(new global::Array<int>(new int[]{ids[splitid], ids[( (( splitid + 2 )) % il )], ids[( (( splitid + 3 )) % il )]}));
						#line 396 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						return mesh;
					}
					
				}
				
				#line 401 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				global::verb.core.types.SurfacePoint center = this.center();
				#line 403 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				mesh.uvs.push(center.uv);
				mesh.points.push(center.point);
				mesh.normals.push(center.normal);
				#line 408 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				int centerIndex = ( mesh.points.length - 1 );
				#line 411 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				int i1 = 0;
				int j1 = ( uvs.length - 1 );
				while (( i1 < uvs.length )){
					#line 414 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
					mesh.faces.push(new global::Array<int>(new int[]{centerIndex, ids[j1], ids[i1]}));
					j1 = i1++;
				}
				
				#line 418 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				return mesh;
			}
			#line default
		}
		
		
		public override   double __hx_setField_f(string field, int hash, double @value, bool handleProperties){
			unchecked {
				#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				switch (hash){
					case 5878779:
					{
						#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						this.v05 = ((double) (@value) );
						#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						return @value;
					}
					
					
					case 5829050:
					{
						#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						this.u05 = ((double) (@value) );
						#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						return @value;
					}
					
					
					default:
					{
						#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						return base.__hx_setField_f(field, hash, @value, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_setField(string field, int hash, object @value, bool handleProperties){
			unchecked {
				#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				switch (hash){
					case 5878779:
					{
						#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						this.v05 = ((double) (global::haxe.lang.Runtime.toDouble(@value)) );
						#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						return @value;
					}
					
					
					case 5829050:
					{
						#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						this.u05 = ((double) (global::haxe.lang.Runtime.toDouble(@value)) );
						#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						return @value;
					}
					
					
					case 365165796:
					{
						#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						this.horizontal = global::haxe.lang.Runtime.toBool(@value);
						#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						return @value;
					}
					
					
					case 2057096962:
					{
						#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						this.splitHoriz = global::haxe.lang.Runtime.toBool(@value);
						#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						return @value;
					}
					
					
					case 1386987691:
					{
						#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						this.splitVert = global::haxe.lang.Runtime.toBool(@value);
						#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						return @value;
					}
					
					
					case 408926779:
					{
						#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						this.centerPoint = ((global::verb.core.types.SurfacePoint) (@value) );
						#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						return @value;
					}
					
					
					case 815754699:
					{
						#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						this.midPoints = ((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (@value) ))) );
						#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						return @value;
					}
					
					
					case 1662687998:
					{
						#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						this.corners = ((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (@value) ))) );
						#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						return @value;
					}
					
					
					case 1886001471:
					{
						#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						this.children = ((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (@value) ))) );
						#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						return @value;
					}
					
					
					case 343531329:
					{
						#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						this.neighbors = ((global::Array<object>) (global::Array<object>.__hx_cast<object>(((global::Array) (@value) ))) );
						#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						return @value;
					}
					
					
					case 5744359:
					{
						#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						this.srf = ((global::verb.core.types.NurbsSurfaceData) (@value) );
						#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						return @value;
					}
					
					
					default:
					{
						#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						return base.__hx_setField(field, hash, @value, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_getField(string field, int hash, bool throwErrors, bool isCheck, bool handleProperties){
			unchecked {
				#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				switch (hash){
					case 2094963434:
					{
						#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("triangulateLeaf") ), ((int) (2094963434) ))) );
					}
					
					
					case 1771922732:
					{
						#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("triangulate") ), ((int) (1771922732) ))) );
					}
					
					
					case 763969816:
					{
						#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("_divide") ), ((int) (763969816) ))) );
					}
					
					
					case 1058156409:
					{
						#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("divide") ), ((int) (1058156409) ))) );
					}
					
					
					case 2135553036:
					{
						#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("shouldDivide") ), ((int) (2135553036) ))) );
					}
					
					
					case 1803610903:
					{
						#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("fixNormals") ), ((int) (1803610903) ))) );
					}
					
					
					case 1966182689:
					{
						#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("hasBadNormals") ), ((int) (1966182689) ))) );
					}
					
					
					case 721950152:
					{
						#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("midpoint") ), ((int) (721950152) ))) );
					}
					
					
					case 137755667:
					{
						#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("getAllCorners") ), ((int) (137755667) ))) );
					}
					
					
					case 485064523:
					{
						#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("getEdgeCorners") ), ((int) (485064523) ))) );
					}
					
					
					case 932519083:
					{
						#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("evalSrf") ), ((int) (932519083) ))) );
					}
					
					
					case 960512706:
					{
						#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("evalCorners") ), ((int) (960512706) ))) );
					}
					
					
					case 98248149:
					{
						#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("center") ), ((int) (98248149) ))) );
					}
					
					
					case 1695991976:
					{
						#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						return ((global::haxe.lang.Function) (new global::haxe.lang.Closure(((object) (this) ), ((string) ("isLeaf") ), ((int) (1695991976) ))) );
					}
					
					
					case 5878779:
					{
						#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						return this.v05;
					}
					
					
					case 5829050:
					{
						#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						return this.u05;
					}
					
					
					case 365165796:
					{
						#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						return this.horizontal;
					}
					
					
					case 2057096962:
					{
						#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						return this.splitHoriz;
					}
					
					
					case 1386987691:
					{
						#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						return this.splitVert;
					}
					
					
					case 408926779:
					{
						#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						return this.centerPoint;
					}
					
					
					case 815754699:
					{
						#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						return this.midPoints;
					}
					
					
					case 1662687998:
					{
						#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						return this.corners;
					}
					
					
					case 1886001471:
					{
						#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						return this.children;
					}
					
					
					case 343531329:
					{
						#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						return this.neighbors;
					}
					
					
					case 5744359:
					{
						#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						return this.srf;
					}
					
					
					default:
					{
						#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						return base.__hx_getField(field, hash, throwErrors, isCheck, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   double __hx_getField_f(string field, int hash, bool throwErrors, bool handleProperties){
			unchecked {
				#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				switch (hash){
					case 5878779:
					{
						#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						return this.v05;
					}
					
					
					case 5829050:
					{
						#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						return this.u05;
					}
					
					
					default:
					{
						#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						return base.__hx_getField_f(field, hash, throwErrors, handleProperties);
					}
					
				}
				
			}
			#line default
		}
		
		
		public override   object __hx_invokeField(string field, int hash, global::Array dynargs){
			unchecked {
				#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				switch (hash){
					case 2094963434:
					{
						#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						return this.triangulateLeaf(((global::verb.core.types.MeshData) (dynargs[0]) ));
					}
					
					
					case 1771922732:
					{
						#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						return this.triangulate(((global::verb.core.types.MeshData) (dynargs[0]) ));
					}
					
					
					case 763969816:
					{
						#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						this._divide(((global::verb.core.types.AdaptiveRefinementOptions) (dynargs[0]) ), ((int) (global::haxe.lang.Runtime.toInt(dynargs[1])) ), global::haxe.lang.Runtime.toBool(dynargs[2]));
						#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						break;
					}
					
					
					case 1058156409:
					{
						#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						this.divide(((global::verb.core.types.AdaptiveRefinementOptions) (dynargs[0]) ));
						#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						break;
					}
					
					
					case 2135553036:
					{
						#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						return this.shouldDivide(((global::verb.core.types.AdaptiveRefinementOptions) (dynargs[0]) ), ((int) (global::haxe.lang.Runtime.toInt(dynargs[1])) ));
					}
					
					
					case 1803610903:
					{
						#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						this.fixNormals();
						#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						break;
					}
					
					
					case 1966182689:
					{
						#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						return this.hasBadNormals();
					}
					
					
					case 721950152:
					{
						#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						return this.midpoint(((int) (global::haxe.lang.Runtime.toInt(dynargs[0])) ));
					}
					
					
					case 137755667:
					{
						#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						return this.getAllCorners(((int) (global::haxe.lang.Runtime.toInt(dynargs[0])) ));
					}
					
					
					case 485064523:
					{
						#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						return this.getEdgeCorners(((int) (global::haxe.lang.Runtime.toInt(dynargs[0])) ));
					}
					
					
					case 932519083:
					{
						#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						return this.evalSrf(((double) (global::haxe.lang.Runtime.toDouble(dynargs[0])) ), ((double) (global::haxe.lang.Runtime.toDouble(dynargs[1])) ), ((global::verb.core.types.SurfacePoint) (dynargs[2]) ));
					}
					
					
					case 960512706:
					{
						#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						this.evalCorners();
						#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						break;
					}
					
					
					case 98248149:
					{
						#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						return this.center();
					}
					
					
					case 1695991976:
					{
						#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						return this.isLeaf();
					}
					
					
					default:
					{
						#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
						return base.__hx_invokeField(field, hash, dynargs);
					}
					
				}
				
				#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				return default(object);
			}
			#line default
		}
		
		
		public override   void __hx_getFields(global::Array<object> baseArr){
			unchecked {
				#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				baseArr.push("v05");
				#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				baseArr.push("u05");
				#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				baseArr.push("horizontal");
				#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				baseArr.push("splitHoriz");
				#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				baseArr.push("splitVert");
				#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				baseArr.push("centerPoint");
				#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				baseArr.push("midPoints");
				#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				baseArr.push("corners");
				#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				baseArr.push("children");
				#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				baseArr.push("neighbors");
				#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				baseArr.push("srf");
				#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				{
					#line 18 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
					base.__hx_getFields(baseArr);
				}
				
			}
			#line default
		}
		
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core.types{
	public  class AdaptiveRefinementNode_getAllCorners_176__Fun : global::haxe.lang.Function {
		public    AdaptiveRefinementNode_getAllCorners_176__Fun(global::Array<double> e, global::Array<object> that) : base(1, 0){
			unchecked {
				#line 176 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				this.e = e;
				#line 176 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				this.that = that;
			}
			#line default
		}
		
		
		public override   object __hx_invoke1_o(double __fn_float1, object __fn_dyn1){
			unchecked {
				#line 176 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				object c = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (((object) (__fn_float1) )) : (((object) (__fn_dyn1) )) );
				#line 176 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				return ( ( ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (global::haxe.lang.Runtime.getField(c, "uv", 26209, true)) ))) )[0] > ( ((global::verb.core.types.SurfacePoint) (((global::verb.core.types.AdaptiveRefinementNode) (this.that[0]) ).corners[0]) ).uv[0] + this.e[0] ) ) && ( ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (global::haxe.lang.Runtime.getField(c, "uv", 26209, true)) ))) )[0] < ( ((global::verb.core.types.SurfacePoint) (((global::verb.core.types.AdaptiveRefinementNode) (this.that[0]) ).corners[2]) ).uv[0] - this.e[0] ) ) );
			}
			#line default
		}
		
		
		public  global::Array<double> e;
		
		public  global::Array<object> that;
		
	}
}



#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core.types{
	public  class AdaptiveRefinementNode_getAllCorners_177__Fun : global::haxe.lang.Function {
		public    AdaptiveRefinementNode_getAllCorners_177__Fun(global::Array<double> e, global::Array<object> that) : base(1, 0){
			unchecked {
				#line 177 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				this.e = e;
				#line 177 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				this.that = that;
			}
			#line default
		}
		
		
		public override   object __hx_invoke1_o(double __fn_float1, object __fn_dyn1){
			unchecked {
				#line 177 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				object c1 = ( (global::haxe.lang.Runtime.eq(__fn_dyn1, global::haxe.lang.Runtime.undefined)) ? (((object) (__fn_float1) )) : (((object) (__fn_dyn1) )) );
				#line 177 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/types/AdaptiveRefinementNode.hx"
				return ( ( ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (global::haxe.lang.Runtime.getField(c1, "uv", 26209, true)) ))) )[1] > ( ((global::verb.core.types.SurfacePoint) (((global::verb.core.types.AdaptiveRefinementNode) (this.that[0]) ).corners[0]) ).uv[1] + this.e[0] ) ) && ( ((global::Array<double>) (global::Array<object>.__hx_cast<double>(((global::Array) (global::haxe.lang.Runtime.getField(c1, "uv", 26209, true)) ))) )[1] < ( ((global::verb.core.types.SurfacePoint) (((global::verb.core.types.AdaptiveRefinementNode) (this.that[0]) ).corners[2]) ).uv[1] - this.e[0] ) ) );
			}
			#line default
		}
		
		
		public  global::Array<double> e;
		
		public  global::Array<object> that;
		
	}
}


