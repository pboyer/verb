package verb.eval;

import verb.core.ArrayExtensions;
using verb.core.ArrayExtensions;

import verb.core.Intersections;
import verb.core.AdaptiveRefinementNode;
import verb.core.Data;
import verb.core.Vec;
import verb.core.Trig;

// `Tess` contains static, immutable algorithms for tessellation of NURBS curves and sufaces. Tessellation is the decomposition
// of the analytical NURBS representation into discrete meshes or polylines that are useful for drawing.
//
// Some of these algorithms are "adaptive" - using certain heuristics to sample geometry where such samples make sense - while
// others are "regular" in that they sample regularly throughout a parametric domain. There are tradeoffs here. While
// adaptive algorithms can sometimes yield "better" results that are smaller or more economical, this can sometimes come at
// increased computational cost. For example, it is sometimes necessarily to compute higher order derivatives in order to
// obtain these more economical results. Your usage of these algorithms should consider these tradeoffs.

@:expose("eval.Tess")
class Tess {

	//Sample a NURBS curve at equally spaced parametric intervals
	//
    //**params**
    //
    //* NurbsCurveData object
	//* integer number of samples
	//* whether to prefix the point with the parameter
	//
    //**returns**
    //
    //* an array of points, prepended by the point param if required

	public static function rationalCurveRegularSample( curve : NurbsCurveData, numSamples : Int, includeU : Bool ) : Array<Point> {
		return rationalCurveRegularSampleRange( curve, curve.knots[0], curve.knots.last(), numSamples, includeU);
	}

	//Sample a range of a NURBS curve at equally spaced parametric intervals
	//
    //**params**
    //
    //* NurbsCurveData object
	//* start parameter for sampling
	//* end parameter for sampling
	//* integer number of samples
	//* whether to prefix the point with the parameter
	//
    //**returns**
    //
    //* an dictionary of parameter - point pairs

	public static function rationalCurveRegularSampleRange( curve : NurbsCurveData, start : Float, end : Float,
																numSamples : Int, includeU  : Bool) : Array<Point>  {

		if (numSamples < 1){
			numSamples = 2;
		}

		var p = [];
		var span : Float = (end - start) / (numSamples - 1);
		var u : Float = 0;

		for (i in 0...numSamples){

			u = start + span * i;

			if ( includeU ){
				p.push( [u].concat( Eval.rationalCurvePoint(curve, u) ) );
			} else {
				p.push( Eval.rationalCurvePoint(curve, u) );
			}

		}

		return p;
	}


	//Sample a NURBS curve over its entire domain, corresponds to [this algorithm](http://ariel.chronotext.org/dd/defigueiredo93adaptive.pdf)
	//
    //**params**
    //
    //* NurbsCurveData object
	//* tol for the adaptive scheme
	//* whether to prefix the point with the parameter
	//
    //**returns**
    //
    //* an array of dim + 1 length where the first element is the param where it was sampled and the remaining the pt

	public static function rationalCurveAdaptiveSample( curve : NurbsCurveData, tol : Float = 1e-6, includeU : Bool = false ) : Array<Point> {

		//if degree is 1, just return the dehomogenized control points
		if (curve.degree == 1){
			if ( !includeU ) {
				return curve.controlPoints.map( Eval.dehomogenize );
			} else {
				//the first element of each array is the parameter
				return [ for (i in 0...curve.controlPoints.length)
					[ curve.knots[i+1] ].concat( Eval.dehomogenize( curve.controlPoints[i] ) ) ];
			}
		}

		return rationalCurveAdaptiveSampleRange( curve, curve.knots[0], curve.knots.last(), tol, includeU );
	}

	//Sample a NURBS curve at 3 points, facilitating adaptive sampling
	//
    //**params**
    //
    //* NurbsCurveData object
	//* start parameter for sampling
	//* end parameter for sampling
	//* whether to prefix the point with the parameter
	//
    //**returns**
    //
    //* an array of dim + 1 length where the first element is the param where it was sampled and the remaining the pt

	public static function rationalCurveAdaptiveSampleRange( curve : NurbsCurveData, start, end, tol, includeU ) : Array<Point>{

		//sample curve at three pts
		var p1 = Eval.rationalCurvePoint(curve, start),
			p3 = Eval.rationalCurvePoint(curve, end),
			t = 0.5 + 0.2 * Math.random(),
			mid = start + (end - start) * t,
			p2 = Eval.rationalCurvePoint(curve, mid);

		//if the two end control points are coincident, the three point test will always return 0, let's split the curve
		var diff = Vec.sub( p1, p3);
		var diff2 = Vec.sub( p1, p2);

		//the first condition checks if the curve makes up a loop, if so, we will need to continue evaluation
		if ( ( Vec.dot( diff, diff ) < tol && Vec.dot( diff2, diff2 ) > tol ) || !Trig.threePointsAreFlat( p1, p2, p3, tol ) ) {

			//get the exact middle
			var exact_mid = start + (end - start) * 0.5;

			//recurse on the two halves
			var left_pts = rationalCurveAdaptiveSampleRange( curve, start, exact_mid, tol, includeU )
			, right_pts = rationalCurveAdaptiveSampleRange( curve, exact_mid, end, tol, includeU );

			//concatenate the two
			return left_pts.slice(0, -1).concat(right_pts);

		} else {
			if (includeU){
				return [ 	[ start ].concat(p1) , [end].concat(p3) ];
			} else {
				return [ 	p1, p3 ];
			}
		}
	}

	//Tessellate a NURBS surface on equal spaced intervals in the parametric domain
	//
    //**params**
    //
    //* NurbsSurfaceData object
	//* number of divisions in the u direction
	//* number of divisions in the v direction
	//
    //**returns**
    //
    //* MeshData object

	public static function rationalSurfaceNaive( surface : NurbsSurfaceData, divs_u : Int, divs_v : Int ) : MeshData {

		if ( divs_u < 1 ) { divs_u = 1; }
		if ( divs_v < 1 ) { divs_v = 1; }

		var degreeU = surface.degreeU
		, degreeV = surface.degreeV
		, controlPoints = surface.controlPoints
		, knotsU = surface.knotsU
		, knotsV = surface.knotsV;

		var u_span = knotsU.last() - knotsU[0];
		var v_span = knotsV.last() - knotsV[0];

		var span_u = u_span / divs_u,
		span_v = v_span / divs_v;

		var points = [];
		var uvs = [];
		var normals = [];

		for (i in 0...divs_u+1){
			for (j in 0...divs_v+1){

				var pt_u = i * span_u,
				pt_v = j * span_v;

				uvs.push( [pt_u, pt_v] );

				var derivs = Eval.rationalSurfaceDerivatives( surface, pt_u, pt_v, 1 );
				var pt = derivs[0][0];

				points.push( pt );

				var normal = Vec.normalized( Vec.cross(  derivs[1][0], derivs[0][1] ) );
				normals.push( normal );
			}
		}

		var faces = [];

		for (i in 0...divs_u){
			for (j in 0...divs_v){
				var a_i = i * (divs_v + 1) + j,
				b_i = (i + 1) * (divs_v + 1) + j,
				c_i = b_i + 1,
				d_i = a_i + 1,
				abc = [a_i, b_i, c_i],
				acd = [a_i, c_i, d_i];

				faces.push(abc);
				faces.push(acd);
			}
		}

		return new MeshData( faces, points, normals, uvs );

	}

	//Divide a NURBS surface int equal spaced intervals in the parametric domain as AdaptiveRefinementNodes
	//
    //**params**
    //
    //* NurbsSurfaceData object
	//* SurfaceDivideOptions object
	//
    //**returns**
    //
    //* MeshData object

    public static function divideRationalSurfaceAdaptive( surface : NurbsSurfaceData, options : AdaptiveRefinementOptions = null ): Array<AdaptiveRefinementNode> {

		if (options == null) options = new AdaptiveRefinementOptions();

		#if (!cs && !cpp && !java)
            options.minDivsU = options.minDivsU != null ? options.minDivsU : 1;
            options.minDivsU = options.minDivsV != null ? options.minDivsV : 1;
            options.refine = options.refine != null ? options.refine : true;
        #end

		var minU = (surface.controlPoints.length - 1) * 2;
		var minV = (surface.controlPoints[0].length - 1) * 2;

		var divsU = options.minDivsU = options.minDivsU > minU ? options.minDivsU : minU;
		var divsV = options.minDivsV = options.minDivsV > minV ? options.minDivsV : minV;

		//get necessary intervals
		var umax = surface.knotsU.last();
		var umin = surface.knotsU[0];
		var vmax =	surface.knotsV.last();
		var vmin = surface.knotsV[0];

		var du = (umax - umin) / divsU
		, dv = (vmax - vmin) / divsV;

		var divs = [];
		var pts = [];

		// 1) evaluate all of the corners
		for( i in 0...divsV + 1){
			var ptrow = [];
			for (j in 0...divsU + 1){

				var u = umin + du * j
				, v = vmin + dv * i;

				//todo: make this faster by specifying n,m
				var ds = Eval.rationalSurfaceDerivatives( surface, u, v, 1 );

				var norm = Vec.normalized( Vec.cross(  ds[0][1], ds[1][0] ) );
				ptrow.push( new SurfacePoint( ds[0][0], norm, [u,v], -1, Vec.isZero( norm ) ) );
			}
			pts.push( ptrow );
		}

		// 2) make all of the nodes
		for (i in 0...divsV){
			for (j in 0...divsU){
				var corners = [ pts[divsV - i - 1][j],
				pts[divsV - i - 1][j+1],
				pts[divsV - i][j+1],
				pts[divsV - i][j] ];

				divs.push( new AdaptiveRefinementNode( surface, corners ) );
			}
		}

		if (!options.refine) return divs;

		// 3) assign all of the neighbors and divide
		for (i in 0...divsV){
			for (j in 0...divsU){

				var ci = i * divsU + j
				, n = north( ci, i, j, divsU, divsV, divs )
				, e = east( ci, i, j, divsU, divsV, divs  )
				, s = south( ci, i, j, divsU, divsV, divs )
				, w = west( ci, i, j, divsU, divsV, divs  );

				divs[ci].neighbors = [ s, e, n, w ];
				divs[ci].divide( options );
			}
		}

		return divs;
	}

	private static function north(index, i, j, divsU, divsV, divs){
		if (i == 0) return null;
		return divs[ index - divsU ];
	}
	
	private static function south(index, i, j, divsU, divsV, divs){
		if (i == divsV - 1) return null;
		return divs[ index + divsU ];
	}
	
	private static function east(index, i, j, divsU, divsV, divs){
		if (j == divsU - 1) return null;
		return divs[ index + 1 ];
	}
	
	private static function west(index, i, j, divsU, divsV, divs){
		if (j == 0) return null;
		return divs[ index - 1 ];
	}

	private static function triangulateAdaptiveRefinementNodeTree( arrTree : Array<AdaptiveRefinementNode> ) : MeshData {

		//triangulate all of the nodes of the tree
		var mesh = MeshData.empty();
		for (x in arrTree)  x.triangulate( mesh );
		return mesh;

	}

	public static function rationalSurfaceAdaptive( surface : NurbsSurfaceData, options : AdaptiveRefinementOptions = null ) : MeshData {

		options = options != null ? options : new AdaptiveRefinementOptions();

		//adaptive divide
		var arrTrees = divideRationalSurfaceAdaptive( surface, options );

		//triangulation
		return triangulateAdaptiveRefinementNodeTree( arrTrees );
	}

}
