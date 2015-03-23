// Utility methods to support converting verb.geom types to THREE.Geometry

(function(verb){

    verb.geom.NurbsCurve.prototype.toThreeGeometry = function(){
        return tessellateCurve( this );
    }

    verb.geom.NurbsSurface.prototype.toThreeGeometry = function(){
        return tessellateSurface( this );
    }

//    verb.topo.Solid.prototype.toThreeGeometry = function(){
//
//        var f = this.faces().map(function(x){
//            return x.tessellate();
//        });
//
//
//
//
//
////        return tessellateSurface( this );
//    }

    verb.topo.Face.prototype.toThreeGeometry = function(){

        var geometry = new THREE.Geometry();

        var t = this.tessellate();

        var verts = [];
        for (var i = 0; i < t.vertexCount; i++){
            verts.push( new THREE.Vector3( t.vertices[i * 3], t.vertices[i * 3 + 1], t.vertices[i * 3 + 2] ));
        }

        geometry.vertices.push.apply( geometry.vertices, verts );

        var an = this.normal();
        var n = new THREE.Vector3( an[0], an[1], an[2] );

        var faces = [];
        for (var i = 0; i < t.elementCount; i++){
            faces.push(  new THREE.Face3(t.elements[i * 3], t.elements[i * 3 + 1], t.elements[i * 3 + 2], n ) );
        }

        geometry.faces.push.apply(geometry.faces, faces);

        return geometry;
    }

    function asVector3(pts){
        return pts.map(function(x){
            return new THREE.Vector3(x[0],x[1],x[2]);
        });
    }

    function asGeometry(threePts){
        var geometry = new THREE.Geometry();
        geometry.vertices.push.apply( geometry.vertices, threePts );
        return geometry;
    }

    function tessellateCurve( curve ){
        return asGeometry( asVector3(  curve.tessellate() ) );
    }

    function tessellateSurface(srf) {

        var tess = srf.tessellate();

        var geometry = new THREE.Geometry();
        var threePts = asVector3( tess.points );

        geometry.vertices.push.apply( geometry.vertices, threePts );

        var threeFaces = tess.faces.map(function(faceIndices){
            var normals = faceIndices.map(function(x){
                var vn = tess.normals[x];
                return new THREE.Vector3( vn[0], vn[1], vn[2] );
            });

            return new THREE.Face3(faceIndices[0],faceIndices[1],faceIndices[2], normals);
        });

        geometry.faces.push.apply(geometry.faces, threeFaces);
        return geometry;
    }

})(verb);