var makeGLCurveFromTesselation = function(gl, s){

  gl.makeCurrent();

  var crv = new GL.Curve({ colors: false });
  crv.lines = s;
  crv.compile();

  return crv;

};

// Simple function to take
var makeGLMeshFromTesselation = function(gl, s){

  gl.makeCurrent();

  var mesh = new GL.Mesh({ colors: true, normals: true });
  mesh.triangles = s.faces;
  mesh.vertices = s.points;

  mesh.colors = mesh.vertices.map(function(v) { return [0.95,0.95,0.90,1] });
  mesh.normals = s.normals;

  mesh.computeWireframe();

  return mesh;

};

verb.NurbsCurve.prototype.toGlType = function(gl, callback) {
  
  if (callback){
    this.tesselate({}, function(s){
      callback(makeGLCurveFromTesselation(gl, s));
    })
  }

  var s = this.tesselate();
  return makeGLCurveFromTesselation(gl, s);

};

verb.NurbsSurface.prototype.toGlType = function(gl, callback) {

  if (callback){
    this.tesselate({ minDivsV: 10, minDivsU: 10 }, function(s){
      callback( makeGLMeshFromTesselation(gl, s) );
    })
  }

  // do sync
  var s = this.tesselate({ minDivsV: 10, minDivsU: 10 });
  return makeGLMeshFromTesselation(gl, s)

};
