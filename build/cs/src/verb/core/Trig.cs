
#pragma warning disable 109, 114, 219, 429, 168, 162
namespace verb.core{
	public  class Trig : global::haxe.lang.HxObject {
		public    Trig(global::haxe.lang.EmptyObject empty){
			unchecked {
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Trig.hx"
				{
				}
				
			}
			#line default
		}
		
		
		public    Trig(){
			unchecked {
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Trig.hx"
				global::verb.core.Trig.__hx_ctor_verb_core_Trig(this);
			}
			#line default
		}
		
		
		public static   void __hx_ctor_verb_core_Trig(global::verb.core.Trig __temp_me71){
			unchecked {
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Trig.hx"
				{
				}
				
			}
			#line default
		}
		
		
		public static   double distToSegment(global::Array<double> a, global::Array<double> b, global::Array<double> c){
			unchecked {
				#line 10 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Trig.hx"
				global::Array<double> acv = global::verb.core.Vec.sub(c, a);
				double acl = global::verb.core.Vec.norm(acv);
				#line 14 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Trig.hx"
				global::Array<double> bma = global::verb.core.Vec.sub(b, a);
				#line 16 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Trig.hx"
				if (( acl < 1e-6 )) {
					#line 17 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Trig.hx"
					return global::verb.core.Vec.norm(bma);
				}
				
				#line 21 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Trig.hx"
				global::Array<double> ac = global::verb.core.Vec.mul(( 1 / acl ), acv);
				#line 24 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Trig.hx"
				double p = global::verb.core.Vec.dot(bma, ac);
				#line 27 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Trig.hx"
				global::Array<double> acd = global::verb.core.Vec.@add(a, global::verb.core.Vec.mul(p, ac));
				#line 30 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Trig.hx"
				return global::verb.core.Vec.dist(acd, b);
			}
			#line default
		}
		
		
		public static   global::Array<double> rayClosestPoint(global::Array<double> pt, global::Array<double> o, global::Array<double> r){
			unchecked {
				#line 48 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Trig.hx"
				global::Array<double> o2pt = global::verb.core.Vec.sub(pt, o);
				double do2ptr = global::verb.core.Vec.dot(o2pt, r);
				global::Array<double> proj = global::verb.core.Vec.@add(o, global::verb.core.Vec.mul(do2ptr, r));
				#line 52 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Trig.hx"
				return proj;
			}
			#line default
		}
		
		
		public static   double distToRay(global::Array<double> pt, global::Array<double> o, global::Array<double> r){
			unchecked {
				#line 72 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Trig.hx"
				global::Array<double> d = global::verb.core.Trig.rayClosestPoint(pt, o, r);
				global::Array<double> dif = global::verb.core.Vec.sub(d, pt);
				#line 75 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Trig.hx"
				return global::verb.core.Vec.norm(dif);
			}
			#line default
		}
		
		
		public static   bool threePointsAreFlat(global::Array<double> p1, global::Array<double> p2, global::Array<double> p3, double tol){
			unchecked {
				#line 103 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Trig.hx"
				global::Array<double> p2mp1 = global::verb.core.Vec.sub(p2, p1);
				global::Array<double> p3mp1 = global::verb.core.Vec.sub(p3, p1);
				global::Array<double> norm = global::verb.core.Vec.cross(p2mp1, p3mp1);
				double area = global::verb.core.Vec.dot(norm, norm);
				#line 108 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Trig.hx"
				return ( area < tol );
			}
			#line default
		}
		
		
		public static   object segmentClosestPoint(global::Array<double> pt, global::Array<double> segpt0, global::Array<double> segpt1, double u0, double u1){
			unchecked {
				#line 128 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Trig.hx"
				global::Array<double> dif = global::verb.core.Vec.sub(segpt1, segpt0);
				double l = global::verb.core.Vec.norm(dif);
				#line 131 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Trig.hx"
				if (( l < 1e-10 )) {
					#line 132 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Trig.hx"
					return new global::haxe.lang.DynamicObject(new global::Array<int>(new int[]{25092}), new global::Array<object>(new object[]{segpt0}), new global::Array<int>(new int[]{117}), new global::Array<double>(new double[]{u0}));
				}
				
				#line 135 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Trig.hx"
				global::Array<double> o = segpt0;
				global::Array<double> r = global::verb.core.Vec.mul(( 1 / l ), dif);
				global::Array<double> o2pt = global::verb.core.Vec.sub(pt, o);
				double do2ptr = global::verb.core.Vec.dot(o2pt, r);
				#line 140 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Trig.hx"
				if (( do2ptr < 0 )) {
					#line 141 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Trig.hx"
					return new global::haxe.lang.DynamicObject(new global::Array<int>(new int[]{25092}), new global::Array<object>(new object[]{segpt0}), new global::Array<int>(new int[]{117}), new global::Array<double>(new double[]{u0}));
				}
				 else {
					#line 142 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Trig.hx"
					if (( do2ptr > l )) {
						#line 143 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Trig.hx"
						return new global::haxe.lang.DynamicObject(new global::Array<int>(new int[]{25092}), new global::Array<object>(new object[]{segpt1}), new global::Array<int>(new int[]{117}), new global::Array<double>(new double[]{u1}));
					}
					
				}
				
				#line 146 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Trig.hx"
				{
					#line 146 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Trig.hx"
					global::Array<double> __temp_odecl258 = global::verb.core.Vec.@add(o, global::verb.core.Vec.mul(do2ptr, r));
					#line 146 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Trig.hx"
					return new global::haxe.lang.DynamicObject(new global::Array<int>(new int[]{25092}), new global::Array<object>(new object[]{__temp_odecl258}), new global::Array<int>(new int[]{117}), new global::Array<double>(new double[]{( u0 + ( ( (( u1 - u0 )) * do2ptr ) / l ) )}));
				}
				
			}
			#line default
		}
		
		
		public static  new object __hx_createEmpty(){
			unchecked {
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Trig.hx"
				return new global::verb.core.Trig(((global::haxe.lang.EmptyObject) (global::haxe.lang.EmptyObject.EMPTY) ));
			}
			#line default
		}
		
		
		public static  new object __hx_create(global::Array arr){
			unchecked {
				#line 5 "/Users/peter/Dropbox/Github/personal/verb2/verb/src/verb/core/Trig.hx"
				return new global::verb.core.Trig();
			}
			#line default
		}
		
		
	}
}


