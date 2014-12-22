verb.init();

var p1 = [-0.5,-0.5,0.5]
	, p2 = [0.5,-0.5,0]
	, p3 = [0.5,0.5,0.5]
	, p4 = [-0.5,0.5,0];

var l = new verb.BezierCurve( [p1, p2, p3, p4] );

l.tesselate({}, function(e){

});

addViewer( new Viewer( l, 300, 300, 2 ) );