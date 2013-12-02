var ele = document.getElementById('viewer');

console.log(ele);



verb.init();

var arc = new verb.geom.Arc([0,0,1], [1,0,0], [0,1,0], 1, new verb.geom.Interval(0, Math.PI/ 2) );
var p1 = arc.point(0);
var p2 = arc.point(0.5);
var p3 = arc.point(1);

var pts = arc.tesselate();

console.log(pts);