// Utility methods to support converting verb.geom types to THREE.Geometry

(function(verb){

    verb.geom.NurbsCurve.prototype.toThreeGeometry = function(){
        return tessellateCurve( this );
    }

    verb.geom.NurbsSurface.prototype.toThreeGeometry = function(){
        return tessellateSurface( this );
    }

    function asVector3(pts){
        return pts.map(function(x){
            return new THREE.Vector3(x[0],x[1],x[2]);
        });
    }

    function tessellateCurve( curve ){
        var geometry = new THREE.Geometry();
        geometry.vertices = asVector3( curve.tessellate() );
        return geometry;
    }

    function asSingleArray(pts) {
        var ptsArray = [];
        pts.map(function (x) {
          ptsArray.push(x[0], x[1], x[2]);
        });
        return ptsArray;
    }

    function tessellateSurface(srf) {
        var tess = srf.tessellate();
    
        var geometry = new THREE.BufferGeometry();
        var normals = [];
        var indices = [];
        tess.faces.map(function (faceIndices) {
          faceIndices.map(function (x) {
            var vn = tess.normals[x];
            normals.push(vn[0], vn[1], vn[2]);
          });
          indices.push(faceIndices[0], faceIndices[1], faceIndices[2]);
        });
    
        geometry.setIndex(indices);
        geometry.setAttribute(
          "normal",
          new THREE.Float32BufferAttribute(normals, 3)
        );
        geometry.setAttribute(
          "position",
          new THREE.Float32BufferAttribute(asSingleArray(tess.points), 3)
        );
        return geometry;
      }

})(verb);