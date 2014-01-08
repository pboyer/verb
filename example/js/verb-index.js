verb.init();

// build a planar bezier patch
var degreeU = 3
	, degreeV = 3
	, knotsV = [0, 0, 0, 0, 1, 1, 1, 1]
	, knotsU =	[0, 0, 0, 0, 1, 1, 1, 1]
	, controlPoints = [ 	[ [0, 0, 0], 	[0.25, 0, 0], 	[0.5, 0, 0], 	[0.75, 0, 0] 		],
							[ [0, -0.25, 0], 	[0.25, -0.25, 0], 	[0.5, -0.25, 0], 	[0.75, -0.25, 0] 	],
							[ [0, -0.5, 0], 	[0.25, -0.5, 0], 	[0.5, -0.5, 0], 	[0.75, -0.5, 0] 	],
							[ [0, -0.75, 0], 	[0.25, -0.75, 0], 	[0.5, -0.75, 0], 	[0.75, -0.75, 0] 	] ]

	, weights = [ [1, 1, 1, 1],
				  [1, 1, 1, 1], 
				  [1, 1, 1, 1], 
				  [1, 1, 1, 1] ];

setControlPoints(Date.now(), controlPoints)

 
var srf = new verb.geom.NurbsSurface( degreeU, knotsU, degreeV, knotsV, controlPoints, weights);

// add the title viewer
var width = document.getElementById("header").offsetWidth;
var v = new TitleViewer( srf, width, 500, 0.8 );
var ele = document.getElementById("header").appendChild(v.gl.canvas);
 
 Array.prototype.flattenOnce = function(){

  if (this.length == 0) return [];

  var merged = [];

  for (var i = 0; i < this.length; i++){
    merged = merged.concat( this[i] );
  }

  return merged;

}

var makeLineNetwork = function(arr){

  var pts = [];

  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr[i].length-1; j++) {

      pts.push( arr[i][j] );
      pts.push( arr[i][j+1] );

    }
  }

  for (var i = 0; i < arr.length-1; i++) {
    for (var j = 0; j < arr[i].length; j++) {

      pts.push( arr[i][j] );
      pts.push( arr[i+1][j] );

    }
  }

  return pts;

}

// if control points changes, retesselate
var id = srf.watch('controlPoints', function(update){

  srf.toGlType(v.gl, function(mesh){

    var pts = srf.get('controlPoints').flattenOnce();

    v.points = makeGLCurveFromTesselation( v.gl, pts );
    v.points.compile();

    var pts2 = srf.get('controlPoints');

    v.lines = makeGLCurveFromTesselation( v.gl, makeLineNetwork(pts2) );
    v.lines.compile();

    v.mesh = mesh;
    mesh.compile();

    v.gl.ondraw();

  });

});

function setControlPoints(timestamp, controlPoints){
  var date = timestamp / 15000;
  var L = 0.23;

  for (var i = 0; i < controlPoints.length; i++){
    for (var j = 0; j < controlPoints[1].length; j++){

      // nice!
      controlPoints[i][j][2] = 0.3 * Math.cos( (controlPoints[i][j][0] + date) / L ) * Math.sin( (controlPoints[i][j][1] + date) / L  )
    }
  }
}

var update = function(timestamp){

  var controlPoints = srf.get('controlPoints');

  setControlPoints(timestamp, controlPoints);

  // automatically retesselates
  srf.set('controlPoints', controlPoints );

  window.requestAnimationFrame(update);

}

// regularly update the control points property of the surface
window.requestAnimationFrame(update);


var geom = [];

// extrusion
var extrusionProfile = new verb.geom.BezierCurve( [ [-0.5, -0.5, 0], [0, -0.5, 0], [-1, 1,0], [0.5,0.5,0] ] )
geom.push( new verb.geom.Extrusion( extrusionProfile, [0,0,1], 1 ) );

// revolved surface
var base = [0,0,0]
  , axis = [0,0,1]
  , angle = Math.PI * 2
  , profile = new verb.geom.BezierCurve( [ [0.1, 0, 1.0], [0.5, 0, 0.5], [-0.5, 0, 0.5], [0.5, 0, -0.5] ]);

geom.push( new verb.geom.RevolvedSurface( base, axis, angle, profile ) );

// nurbs curve
var p1 = [-0.5,-0.5,0.25]
  , p2 = [0.25,-0.5,0.5]
  , p3 = [0.5,-0.5,-2]
  , p4 = [1,0.25,0];

geom.push( new verb.geom.BezierCurve( [p1, p2, p3, p4] ) );

geom.map(function(g){
  addViewer(new Viewer( g, 270, 270, 2.2 ) );
});


TitleViewer.lineOverlay = false;
function TitleViewer(ele, width, height, depth) {

  // Get a new WebGL canvas
  var gl = GL.create();
  this.gl = gl;

  var that = this;

  this.makeCurrent = (function(context) {
    return function(){
      that.gl = context;
      that.gl.makeCurrent();
    };
  })(gl);

  // make the mesh
  this.mesh = ele.toGlType(this.gl);

  // Set up the viewport
  gl.canvas.width = width;
  gl.canvas.height = height;
  gl.viewport(0, 0, width, height);
  gl.matrixMode( gl.PROJECTION );
  gl.loadIdentity();
  gl.perspective(20, width / height, 0.1, 100);
  gl.matrixMode( gl.MODELVIEW );

  // Set up WebGL state
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  gl.clearColor(0.93, 0.93, 0.93, 1);
  gl.enable(gl.DEPTH_TEST);
  gl.disable(gl.CULL_FACE);
  gl.polygonOffset(1, 1);


  // Black shader for wireframe
  this.opaqueBlackShader = new GL.Shader('\
    uniform float pointSize;\
    void main() {\
      gl_PointSize = 3.0;\
      gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;\
    }\
  ', '\
    void main() {\
      gl_FragColor = vec4(0.0, 0.0, 0.0, 0.3);\
    }\
  ');

  this.blueShader = new GL.Shader('\
    uniform float pointSize;\
    void main() {\
      gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;\
    }\
  ', '\
    void main() {\
      gl_FragColor = vec4(0.0, 0.0, 1.0, 0.15);\
    }\
  ');

  // Black shader for wireframe
  this.blackShader = new GL.Shader('\
    uniform float pointSize;\
    void main() {\
      gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;\
    }\
  ', '\
    void main() {\
      gl_FragColor = vec4(0.0, 0.0, 0.0, 0.1);\
    }\
  ');

  this.blackShader.uniforms({ pointSize: 5.0 });

  // Shader with diffuse and specular lighting
  this.lightingShader = new GL.Shader('\
    varying vec3 color;\
    varying vec3 normal;\
    varying vec3 light;\
    void main() {\
      const vec3 lightDir = vec3(0.0, 0.0, -1.0);\
      light = (gl_ModelViewMatrix * vec4(lightDir, 0.0)).xyz;\
      color = gl_Color.rgb;\
      normal = gl_NormalMatrix * gl_Normal;\
      gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;\
    }\
  ', '\
    varying vec3 color;\
    varying vec3 normal;\
    varying vec3 light;\
    void main() {\
      vec3 n = normalize(normal);\
      float diffuse = max(0.0, dot(light, n));\
      float specular = pow( max(0.0, -reflect(light, n).z), 12.0) * sqrt(diffuse);\
      gl_FragColor = vec4(mix(color * (0.3 + 0.7 * diffuse), vec3(1.0), specular), 1.0);\
    }\
  ');

  gl.ondraw = function() {

    gl.makeCurrent();

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.loadIdentity();
    gl.lookAt(0, 0.8, 0.8, 0.375, -0.375, 0, 0, 0, 1);

    if ( that.mesh instanceof GL.Mesh) {

      if (!TitleViewer.lineOverlay) gl.enable(gl.POLYGON_OFFSET_FILL);
      that.lightingShader.draw(that.mesh, gl.TRIANGLES);
      if (!TitleViewer.lineOverlay) gl.disable(gl.POLYGON_OFFSET_FILL);

      // draw control points
      gl.disable(gl.DEPTH_TEST);
      gl.enable(gl.BLEND);
      
      if ( that.points ) that.opaqueBlackShader.draw( that.points, gl.POINTS );
      if ( that.lines ) that.blueShader.draw( that.lines, gl.LINES );

      gl.disable(gl.BLEND);
      gl.enable(gl.DEPTH_TEST);

      // 
      if (TitleViewer.lineOverlay) gl.disable(gl.DEPTH_TEST);
      gl.enable(gl.BLEND);
      that.blackShader.draw(that.mesh, gl.LINES);
      gl.disable(gl.BLEND);
      if (TitleViewer.lineOverlay) gl.enable(gl.DEPTH_TEST);



    } 



  };

  gl.ondraw();

}
