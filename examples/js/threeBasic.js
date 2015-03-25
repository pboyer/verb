// Some helper methods for the examples

var scene, camera, renderer;

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

raycaster.lineprecision = 0.00001;
raycaster.precision = 0.001;

function onMouseMove( event ) {

	// calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}

window.addEventListener( 'mousemove', onMouseMove, false );

function threeSetup(doUseRaycaster){
    useRaycaster = doUseRaycaster;

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.z = 20;
    camera.up.set( 0, 0, 1 );

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    var ambientLight = new THREE.AmbientLight( 0xbbbbbb );
    scene.add( ambientLight );

    var lights = [];
    lights[0] = new THREE.PointLight( 0xececec, 0.25, 0 );
    lights[1] = new THREE.PointLight( 0xececec, 0.25, 0 );
    lights[2] = new THREE.PointLight( 0xececec, 0.25, 0 );

    lights[0].position.set( 0, 100, 0 );
    lights[1].position.set( 100, 200, 100 );
    lights[2].position.set( -100, -200, -100 );

    scene.add( lights[0] );
    scene.add( lights[1] );
    scene.add( lights[2] );
}

var intersects = [];

function threeRender(){
    var controls = new THREE.OrbitControls(camera, renderer.domElement);

    function render() {
        if (useRaycaster){

            // update the picking ray with the camera and mouse position
            raycaster.setFromCamera( mouse, camera );

            // clear color
            for ( var i = 0; i < intersects.length; i++ ) {
                if (!intersects[ i ].object.material.color) continue;
                intersects[ i ].object.material.color.set( 0xffffff );
            }

            // calculate objects intersecting the picking ray
            intersects = raycaster.intersectObjects( scene.children );

            for ( var i = 0; i < intersects.length; i++ ) {
                if (!intersects[ i ].object.material.color) continue;
                intersects[ i ].object.material.color.set( 0xff0000 );
            }
        }

    	requestAnimationFrame( render );
        renderer.render( scene, camera );
    }
    render();
}

function addCurveToScene(geom, material){
    material = material || new THREE.LineBasicMaterial({ linewidth: 2, color: 0xdcdcdc});
    scene.add( new THREE.Line( geom, material ) );
}

function addLineToScene(pts, mat){
    addCurveToScene(asGeometry(asVector3(pts)), mat);
}

function addMeshToScene(mesh, material, wireframe ){
    material = material || new THREE.MeshNormalMaterial( { side: THREE.DoubleSide, wireframe: false, shading: THREE.SmoothShading, transparent: true, opacity: 0.4 } )

//    new THREE.MeshPhongMaterial({
//                               specular: '#ffffff',
//                               color: '#8e8e8e',
//                               side: THREE.DoubleSide,
//                               ambient: '#ffffff',
//                               emissive: '#111111',
//                               shininess: 40
//                             });

    scene.add( new THREE.Mesh( mesh, material ) );

    if (wireframe){
        var material2 = new THREE.MeshBasicMaterial( { color: 0x000000, side: THREE.DoubleSide, wireframe: true } );
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

function benchmark(func, runs){
	var d1 = Date.now();
	for (var i = 0 ; i < runs; i++)
		res = func();
	var d2 = Date.now();
	return { result : res, elapsed : d2-d1, each : (d2-d1)/runs };
}

function pointsAsGeometry(pts){
    return asGeometry( asVector3(pts) )
}

function addPointsToScene(pts){

    var geom = asGeometry( asVector3( pts ) );
    var cloudMat2 = new THREE.PointCloudMaterial({ size: 6.5, sizeAttenuation: false, color: 0xffffff });
    var cloud2 = new THREE.PointCloud( geom, cloudMat2 );

    scene.add( cloud2 );
}

