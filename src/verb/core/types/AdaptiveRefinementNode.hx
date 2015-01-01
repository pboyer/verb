package verb.core.types;

using verb.core.ArrayExtensions;

class AdaptiveRefinementOptions {
    public var normTol : Float = 8.5e-2;
    public var minDepth : Int = 0;
    public var maxDepth : Int = 10;
    public var refine : Bool = true;
    public var minDivsU : Int = 1;
    public var minDivsV : Int = 1;
}

@:expose("core.AdaptiveRefinementNode")
class AdaptiveRefinementNode {

    var srf : SurfaceData;
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

    public function new( srf : SurfaceData, corners : Array<SurfacePoint>, neighbors : Array<AdaptiveRefinementNode> = null ) {

        //
        // Structure of the child nodes
        // in the adaptive refinement tree
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
        // neighbors[3]   (u0,v05)--(u05,v05)--(u1,v05)   neighbors[1]
        //                  |           |          |
        //                  |     0     |     1    |
        //                  |           |          |
        //                (u0,v0)---(u05,v0)---(u1,v0)
        //
        //                        neighbors[0]
        //

        this.srf = srf;
        this.neighbors = neighbors == null ? [null, null, null, null] : neighbors;

        this.corners = corners;

        // if no corners, we need to construct initial corners from the surface
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

        // eval the center
        this.u05 = (this.corners[0].uv[0] + this.corners[2].uv[0]) / 2;
        this.v05 = (this.corners[0].uv[1] + this.corners[2].uv[1]) / 2;

        // eval all of the corners
        for (i in 0...4) {
            // if it's not already evaluated
            if ( this.corners[i].point == null ){
                // evaluate it
                var c = this.corners[i];
                this.evalSrf( c.uv[0], c.uv[1], c );
            }
        }
    }

    public function evalSrf( u : Float, v : Float, srfPt : SurfacePoint = null ) : SurfacePoint {

        var derivs = Eval.rational_surface_derivs( this.srf, 1, u, v );
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

        // if its a leaf, there are no children to obtain uvs from
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

        // vertical case
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

        // get opposite edges uvs
        var corners = this.neighbors[edgeIndex].getEdgeCorners( ( edgeIndex + 2 ) % 4 );

        var funcIndex = edgeIndex % 2;

        var e = verb.core.Constants.EPSILON;
        var that = this;

        // range clipping functions
        var rangeFuncMap = [
            function(c){ return c.uv[0] > that.corners[0].uv[0] + e && c.uv[0] < that.corners[2].uv[0] - e;  },
            function(c){ return c.uv[1] > that.corners[0].uv[1] + e && c.uv[1] < that.corners[2].uv[1] - e;  }
        ];

        // clip the range of uvs to match this one
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
                // get neighbors
                var v1 = this.corners[(i + 1) % l];
                var v2 = this.corners[(i + 3) % l];

                // correct the normal
                this.corners[i].normal = v1.degen ? v2.normal : v1.normal;
            }
        }
    }

    public function shouldDivide( options : AdaptiveRefinementOptions, currentDepth : Int ){

        if ( currentDepth < options.minDepth ) return true;
        if ( currentDepth >= options.maxDepth ) return false;

        if ( this.hasBadNormals() ) {
            this.fixNormals();
            // don't divide any further when encountering a degenerate normal
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

        if (options.normTol == null) options.normTol = 8.5e-2;
        if (options.minDepth == null) options.minDepth = 0;
        if (options.maxDepth == null) options.maxDepth = 10;

        this._divide( options, 0, true );
    }

    private function _divide( options : AdaptiveRefinementOptions, currentDepth : Int, horiz : Bool ) : Void {

        this.evalCorners();

        if ( !this.shouldDivide( options, currentDepth )  ) return;

        currentDepth++;

        // is the quad flat in one dir and curved in the other?
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

            // assign neighbors to bottom node
            this.children[0].neighbors = [ this.neighbors[0], this.neighbors[1], this.children[1], this.neighbors[3] ];

            // assign neighbors to top node
            this.children[1].neighbors = [ this.children[0], this.neighbors[1], this.neighbors[2], this.neighbors[3] ];

        } else {

            var left = [ this.corners[0], this.midpoint(0), this.midpoint(2), this.corners[3]  ];
            var right = [ this.midpoint(0), this.corners[1], this.corners[2], this.midpoint(2)  ];

            this.children = [ new AdaptiveRefinementNode( this.srf, left ),  new AdaptiveRefinementNode( this.srf, right ) ];

            this.children[0].neighbors = [ this.neighbors[0], this.children[1], this.neighbors[2], this.neighbors[3] ];
            this.children[1].neighbors = [ this.neighbors[0], this.neighbors[1], this.neighbors[2], this.children[0] ];

        }

        // divide all children recursively
        for (child in this.children){
            child._divide( options, currentDepth, !horiz );
        }

    }

    public function triangulate( mesh : MeshData = null ) : MeshData {

        if (mesh == null) mesh = MeshData.empty();

        if ( this.isLeaf() ) return this.triangulateLeaf( mesh );

// recurse on the children
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

// enumerate all uvs in counter clockwise direction
        for (i in 0...4){

            var edgeCorners = this.getAllCorners(i);

// this is the vertex that is split
            if (edgeCorners.length == 2 ) splitid = i + 1;

            for (j in 0...edgeCorners.length) {
                uvs.push(edgeCorners[j]);
            }
        }

        for (corner in uvs){

// if the id is defined, we can just push it and continue
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

// if the number of points is 4, we're just doing a
// rectangle - just build the basic triangulated square
            mesh.faces.push( [ ids[0], ids[3], ids[1] ] );
            mesh.faces.push( [ ids[3], ids[2], ids[1] ] );

// all done
            return mesh;

        } else if (uvs.length == 5){

// use the splitcorner to triangulate
            var il = ids.length;

// there will be 3 triangles
            mesh.faces.push( [ ids[ splitid ],
            ids[ (splitid + 1) % il ],
            ids[ (splitid + 2) % il ] ] );

            mesh.faces.push( [ ids[ (splitid + 4) % il ],
            ids[ (splitid + 3) % il ],
            ids[ splitid ] ] );

            mesh.faces.push( [ ids[ splitid ],
            ids[ (splitid + 2) % il ],
            ids[ (splitid + 3) % il ] ]);

            return mesh;

        }

// make point at center of face
        var center = this.center();

        mesh.uvs.push( center.uv );
        mesh.points.push( center.point );
        mesh.normals.push( center.normal );

// get index
        var centerIndex = mesh.points.length - 1;

// build triangle fan from center
        var i = 0;
        var j = uvs.length - 1;
        while (i < uvs.length){
            mesh.faces.push( [	centerIndex, ids[j], ids[i]   ]);
            j = i++;
        }

        return mesh;

    }
}