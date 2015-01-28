// Some helper methods for the examples

var scene, camera, renderer;

function threeSetup(){
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.z = 20;
    camera.up.set( 0, 0, 1 );

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
}

function threeRender(){
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    function render() {
        requestAnimationFrame( render );
        renderer.render( scene, camera );
    }
    render();
}

function addCurveToScene(geom, material){
    material = material || new THREE.LineBasicMaterial({ linewidth: 3, color: 0xffffff});
    scene.add( new THREE.Line( geom, material ) );
}

function addMeshToScene(mesh, wireframe, material){
    material = material || new THREE.MeshNormalMaterial( { transparent: true, side: THREE.DoubleSide, opacity: 0.8, shading: THREE.SmoothShading, side: THREE.DoubleSide } );
    scene.add( new THREE.Mesh( mesh, material ) );

    if (wireframe){
        var material2 = new THREE.MeshBasicMaterial( { color: 0x888888, side: THREE.DoubleSide, wireframe: true } );
        var mesh2 = new THREE.Mesh( mesh, material2 );
        scene.add( mesh2 );
    }
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

function pointsAsGeometry(pts){
    return asGeometry( asVector3(pts) )
}

function addPointsToScene(pts){

    var geom = asGeometry( asVector3(pts) );
    var cloudMat2 = new THREE.PointCloudMaterial({ size: 0.5, color: 0xffffff });
    var cloud2 = new THREE.PointCloud( geom, cloudMat2 );

    scene.add( cloud2 );
}