package verb.eval;

import verb.core.ArrayExtensions;
using verb.core.ArrayExtensions;

import verb.core.Intersections;
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

@:expose("core.AdaptiveRefinementOptions")
class AdaptiveRefinementOptions {
    public var normTol : Float = 2.5e-2;
    public var minDepth : Int = 0;
    public var maxDepth : Int = 10;
    public var refine : Bool = true;
    public var minDivsU : Int = 1;
    public var minDivsV : Int = 1;

    public function new(){}

}

//```
//Structure of the child nodes
//in the adaptive refinement tree
//
//  v
//  ^
//  |
//  +--> u
//
//                        neighbors[2]
//
//                (u0,v1)---(u05,v1)---(u1,v1)
//                  |           |          |
//                  |     3     |     2    |
//                  |           |          |
//neighbors[3]   (u0,v05)--(u05,v05)--(u1,v05)   neighbors[1]
//                  |           |          |
//                  |     0     |     1    |
//                  |           |          |
//                (u0,v0)---(u05,v0)---(u1,v0)
//
//                        neighbors[0]
//```

@:expose("core.AdaptiveRefinementNode")
class AdaptiveRefinementNode {

    var srf : NurbsSurfaceData;
    public var neighbors : Array<AdaptiveRefinementNode>;
    var children : Array<AdaptiveRefinementNode>;
    var corners : Array<SurfacePoint>;
    var midPoints : Array<SurfacePoint>;
    var centerPoint : SurfacePoint;
    var splitVert : Bool;
    var splitHoriz : Bool;
    var horizontal : Bool;
    var u05 : Float;
    var v05 : Float;

    public function new( srf : NurbsSurfaceData, corners : Array<SurfacePoint>, neighbors : Array<AdaptiveRefinementNode> = null ) {


        this.srf = srf;
        this.neighbors = neighbors == null ? [null, null, null, null] : neighbors;

        this.corners = corners;

        //if no corners, we need to construct initial corners from the surface
        if (this.corners == null){
            var u0 : Float = srf.knotsU[0];
            var u1 : Float = srf.knotsU.last();
            var v0 : Float = srf.knotsV[0];
            var v1 : Float = srf.knotsV.last();

            this.corners = [
            SurfacePoint.fromUv( u0, v0 ),
            SurfacePoint.fromUv( u1, v0 ),
            SurfacePoint.fromUv( u1, v1 ),
            SurfacePoint.fromUv( u0, v1 ) ];
        }

    }

    public function isLeaf(){
        return this.children == null;
    }

    public function center(){
        return this.centerPoint != null ? this.centerPoint : this.evalSrf( this.u05, this.v05 );
    }

    public function evalCorners(){

//eval the center
        this.u05 = (this.corners[0].uv[0] + this.corners[2].uv[0]) / 2;
        this.v05 = (this.corners[0].uv[1] + this.corners[2].uv[1]) / 2;

//eval all of the corners
        for (i in 0...4) {
//if it's not already evaluated
            if ( this.corners[i].point == null ){
//evaluate it
                var c = this.corners[i];
                this.evalSrf( c.uv[0], c.uv[1], c );
            }
        }
    }

    public function evalSrf( u : Float, v : Float, srfPt : SurfacePoint = null ) : SurfacePoint {

        var derivs = Eval.rationalSurfaceDerivatives( this.srf, u, v, 1 );
        var pt = derivs[0][0];
        var norm = Vec.cross(  derivs[0][1], derivs[1][0] );
        var degen = Vec.isZero( norm );

        if (!degen) norm = Vec.normalized( norm );

        if (srfPt != null){
            srfPt.degen = degen;
            srfPt.point = pt;
            srfPt.normal = norm;
            return srfPt;
        } else {
            return new SurfacePoint( pt, norm, [u,v], -1, degen );
        }
    }

    public function getEdgeCorners( edgeIndex : Int ) : Array<SurfacePoint> {

//if its a leaf, there are no children to obtain uvs from
        if ( this.isLeaf() ) return [ this.corners[ edgeIndex ] ];

        if ( this.horizontal ){

            switch (edgeIndex){
                case 0:
                    return this.children[0].getEdgeCorners( 0 );
                case 1:
                    return this.children[0].getEdgeCorners( 1 ).concat( this.children[1].getEdgeCorners( 1 ) );
                case 2:
                    return this.children[1].getEdgeCorners( 2 );
                case 3:
                    return this.children[1].getEdgeCorners( 3 ).concat( this.children[0].getEdgeCorners( 3 ) );
            }

        }

//vertical case
        switch (edgeIndex) {
            case 0:
                return this.children[0].getEdgeCorners( 0 ).concat( this.children[1].getEdgeCorners( 0 ) );
            case 1:
                return this.children[1].getEdgeCorners( 1 );
            case 2:
                return this.children[1].getEdgeCorners( 2 ).concat( this.children[0].getEdgeCorners( 2 ) );
            case 3:
                return this.children[0].getEdgeCorners( 3 );
        }

        return null;
    }

    public function getAllCorners( edgeIndex : Int ) : Array<SurfacePoint> {

        var baseArr = [ this.corners[edgeIndex] ];

        if ( this.neighbors[edgeIndex] == null ) {
            return baseArr;
        }

//get opposite edges uvs
        var corners = this.neighbors[edgeIndex].getEdgeCorners( ( edgeIndex + 2 ) % 4 );

        var funcIndex = edgeIndex % 2;

        var e = verb.core.Constants.EPSILON;
        var that = this;

//range clipping functions
        var rangeFuncMap = [
        function(c){ return c.uv[0] > that.corners[0].uv[0] + e && c.uv[0] < that.corners[2].uv[0] - e;  },
        function(c){ return c.uv[1] > that.corners[0].uv[1] + e && c.uv[1] < that.corners[2].uv[1] - e;  }
        ];

//clip the range of uvs to match this one
        var cornercopy = corners.filter( rangeFuncMap[ funcIndex ] );
        cornercopy.reverse();
        return baseArr.concat( cornercopy );

    }

    public function midpoint( index ){

        if (this.midPoints == null) this.midPoints = [null, null, null, null];
        if (!(this.midPoints[index] == null)) return this.midPoints[index];

        switch (index){
            case 0:
                this.midPoints[0] = this.evalSrf( this.u05, this.corners[0].uv[1] );
            case 1:
                this.midPoints[1] = this.evalSrf( this.corners[1].uv[0], this.v05 );
            case 2:
                this.midPoints[2] = this.evalSrf( this.u05, this.corners[2].uv[1] );
            case 3:
                this.midPoints[3] = this.evalSrf( this.corners[0].uv[0], this.v05 );
        }

        return this.midPoints[index];

    }

    public function hasBadNormals() : Bool {
        return this.corners[0].degen || this.corners[1].degen || this.corners[2].degen || this.corners[3].degen;
    }

    public function fixNormals() : Void {
        var l = this.corners.length;

        for (i in 0...l){
            var corn = this.corners[i];

            if (this.corners[i].degen) {
//get neighbors
                var v1 = this.corners[(i + 1) % l];
                var v2 = this.corners[(i + 3) % l];

//correct the normal
                this.corners[i].normal = v1.degen ? v2.normal : v1.normal;
            }
        }
    }

    public function shouldDivide( options : AdaptiveRefinementOptions, currentDepth : Int ){

        if ( currentDepth < options.minDepth ) return true;
        if ( currentDepth >= options.maxDepth ) return false;

        if ( this.hasBadNormals() ) {
            this.fixNormals();
//don't divide any further when encountering a degenerate normal
            return false;
        }

        this.splitVert = Vec.normSquared( Vec.sub( this.corners[0].normal, this.corners[1].normal ) ) > options.normTol ||
        Vec.normSquared( Vec.sub( this.corners[2].normal, this.corners[3].normal ) ) > options.normTol;

        this.splitHoriz = Vec.normSquared( Vec.sub( this.corners[1].normal, this.corners[2].normal ) ) > options.normTol ||
        Vec.normSquared( Vec.sub( this.corners[3].normal, this.corners[0].normal ) ) > options.normTol;

        if ( this.splitVert || this.splitHoriz ) return true;

        var center = this.center();

        return Vec.normSquared( Vec.sub( center.normal, this.corners[0].normal ) ) > options.normTol ||
        Vec.normSquared( Vec.sub( center.normal, this.corners[1].normal ) ) > options.normTol ||
        Vec.normSquared( Vec.sub( center.normal, this.corners[2].normal ) ) > options.normTol ||
        Vec.normSquared( Vec.sub( center.normal, this.corners[3].normal ) ) > options.normTol;
    }

    public function divide( options : AdaptiveRefinementOptions = null ) : Void {
        if (options == null) options = new AdaptiveRefinementOptions();
#if (!cpp && !cs && !java)
            if (options.normTol == null) options.normTol = 8.5e-2;
        if (options.minDepth == null) options.minDepth = 0;
        if (options.maxDepth == null) options.maxDepth = 10;
#end

        this._divide( options, 0, true );
    }

    private function _divide( options : AdaptiveRefinementOptions, currentDepth : Int, horiz : Bool ) : Void {

        this.evalCorners();

        if ( !this.shouldDivide( options, currentDepth )  ) return;

        currentDepth++;

//is the quad flat in one dir and curved in the other?
        if (this.splitVert && !this.splitHoriz) {
            horiz = false;
        } else if (!this.splitVert && this.splitHoriz){
            horiz = true;
        }

        this.horizontal = horiz;

        if (this.horizontal){

            var bott = 	[ this.corners[0], this.corners[1], this.midpoint(1), this.midpoint(3)  ];
            var top = 	[ this.midpoint(3), this.midpoint(1), this.corners[2], this.corners[3]  ];

            this.children = [ new AdaptiveRefinementNode( this.srf, bott ), new AdaptiveRefinementNode( this.srf, top ) ];

//assign neighbors to bottom node
            this.children[0].neighbors = [ this.neighbors[0], this.neighbors[1], this.children[1], this.neighbors[3] ];

//assign neighbors to top node
            this.children[1].neighbors = [ this.children[0], this.neighbors[1], this.neighbors[2], this.neighbors[3] ];

        } else {

            var left = [ this.corners[0], this.midpoint(0), this.midpoint(2), this.corners[3]  ];
            var right = [ this.midpoint(0), this.corners[1], this.corners[2], this.midpoint(2)  ];

            this.children = [ new AdaptiveRefinementNode( this.srf, left ),  new AdaptiveRefinementNode( this.srf, right ) ];

            this.children[0].neighbors = [ this.neighbors[0], this.children[1], this.neighbors[2], this.neighbors[3] ];
            this.children[1].neighbors = [ this.neighbors[0], this.neighbors[1], this.neighbors[2], this.children[0] ];

        }

//divide all children recursively
        for (child in this.children){
            child._divide( options, currentDepth, !horiz );
        }

    }

    public function triangulate( mesh : MeshData = null ) : MeshData {

        if (mesh == null) mesh = MeshData.empty();

        if ( this.isLeaf() ) return this.triangulateLeaf( mesh );

//recurse on the children
        for (x in this.children){
            if (x == null) break;
            x.triangulate( mesh );
        }

        return mesh;
    }

    public function triangulateLeaf( mesh : MeshData ) : MeshData{

        var baseIndex = mesh.points.length
        , uvs = []
        , ids = []
        , splitid = 0;

//enumerate all uvs in counter clockwise direction
        for (i in 0...4){

            var edgeCorners = this.getAllCorners(i);

//this is the vertex that is split
            if (edgeCorners.length == 2 ) splitid = i + 1;

            for (j in 0...edgeCorners.length) {
                uvs.push(edgeCorners[j]);
            }
        }

        for (corner in uvs){

//if the id is defined, we can just push it and continue
            if (corner.id != -1){
                ids.push(corner.id);
                continue;
            }

            mesh.uvs.push( corner.uv );
            mesh.points.push( corner.point );
            mesh.normals.push( corner.normal );

            corner.id = baseIndex;
            ids.push( baseIndex );

            baseIndex++;
        }

        if (uvs.length == 4){

//if the number of points is 4, we're just doing a
//rectangle - just build the basic triangulated square
            mesh.faces.push( [ ids[0], ids[3], ids[1] ] );
            mesh.faces.push( [ ids[3], ids[2], ids[1] ] );

//all done
            return mesh;

        } else if (uvs.length == 5){

//use the splitcorner to triangulate
            var il = ids.length;

//there will be 3 triangles
            mesh.faces.push( [ ids[ splitid ], ids[ (splitid + 2) % il ], ids[ (splitid + 1) % il ] ] );
            mesh.faces.push( [ ids[ (splitid + 4) % il ],  ids[ (splitid + 3) % il ], ids[ splitid ] ] );
            mesh.faces.push( [ ids[ splitid ], ids[ (splitid + 3) % il ],ids[ (splitid + 2) % il ] ]);

            return mesh;

        }

//make point at center of face
        var center = this.center();

        mesh.uvs.push( center.uv );
        mesh.points.push( center.point );
        mesh.normals.push( center.normal );

//get index
        var centerIndex = mesh.points.length - 1;

//build triangle fan from center
        var i = 0;
        var j = uvs.length - 1;
        while (i < uvs.length){
            mesh.faces.push( [	centerIndex, ids[i], ids[j]  ]);
            j = i++;
        }

        return mesh;

    }
}
