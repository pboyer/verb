function drawSolid(s){

    s.faces().forEach(function(x){
        addMeshToScene( x.toThreeGeometry(),
            new THREE.MeshNormalMaterial(
                { side: THREE.FrontSide, wireframe: false, shading: THREE.SmoothShading, transparent: true, opacity: 0.95 } ));
    });

    s.halfEdges().forEach(function(x){
        addLineToScene( [x.v.pt,x.nxt.v.pt] );
    });

    s.vertices().forEach(function(x){
        addPointsToScene( [x.pt] );
    });
}

threeSetup(true);

var ptsa = [[0,0,0], [10,0,0], [10,10,0], [0,10,0] ];
var a = verb.topo.Make.extrusion( ptsa, [0,0,10] );

var ptsb = [[5,5,-5], [15,5,-5], [15,15,-5], [5,15,-5] ];
var b = verb.topo.Make.extrusion( ptsb, [0,0,10] );

var res = verb.topo.Boolean.split( a, b, 1e-6 );

drawSolid( a );
drawSolid( b );

threeRender();