

var geom = [];

// arc
var arc = new verb.Arc([0,0,0], [1,0,0], [0,1,0], 0.5, new verb.Interval(0, Math.PI ) );
geom.push(arc);

// BezierCurve
var p1 = [-0.5,-0.5,0.25]
	, p2 = [0.25,-0.5,0.5]
	, p3 = [0.5,-0.5,-2]
	, p4 = [1,0.25,0];

geom.push( new verb.BezierCurve( [p1, p2, p3, p4] ) );

// circle
geom.push( new verb.Circle([0,0,0], [1,0,0], [0,1,0], 0.5 ) );

// cone
var axis = [0,0,1]
	, xaxis = [1,0,0]
	, base = [0,0,0]
	, height = 0.5
	, radius = 0.5;

geom.push( new verb.Cone( axis, xaxis, base, height, radius ) );

// cylinder
var axis = [0,0,1]
	, xaxis = [1,0,0]
	, base = [0,0,-0.5]
	, height = 1
	, radius = 0.5;

geom.push( new verb.Cylinder( axis, xaxis, base, height, radius ) );

// ellipse
geom.push( new verb.Ellipse([0,0,0], [1,0,0], [0,1,0], 0.5, 0.25 ) );

// ellipse arc
geom.push( new verb.EllipseArc([0,0,0], [1,0,0], [0,1,0], 0.5, 0.25, new verb.Interval( 0, 3 *  Math.PI / 2) ) );

// extrusion
var extrusionProfile = new verb.BezierCurve( [ [-0.5, -0.5, 0], [0, -0.5, 0], [-1, 1,0], [0.5,0.5,0] ] )
geom.push( new verb.Extrusion( extrusionProfile, [0,0,1], 1 ) );

// four point surface
var p1 = [-0.5,-0.5,0.5]
	, p2 = [0.5,-0.5,0]
	, p3 = [0.5,0.5,0.5]
	, p4 = [-0.5,0.5,0];

geom.push( new verb.FourPointSurface( p1, p2, p3, p4 ) );

// line
// geom.push( new verb.Line( p1, p2 ) );

// nurbs curve
var p1 = [-0.5,-0.5,0.25]
	, p2 = [0.25,-0.5,0.5]
	, p3 = [0.5,-0.5,-2]
	, p4 = [1,0.25,0];

geom.push( new verb.NurbsCurve( 3, [p1, p2, p3, p4],  [1, 0.2, 0.4, 0.9], [0,0,0,0,1,1,1,1] ) );

// nurbs surface
var degreeU = 3
	, degreeV = 3
	, knotsV = [0, 0, 0, 0, 1, 1, 1, 1]
	, knotsU =	[0, 0, 0, 0, 1, 1, 1, 1]
	, controlPoints = [ 	[ [0, 0, 0.25], 	[0.25, 0, 0], 	[0.5, 0, 0], 	[0.75, 0, 0] 		],
							[ [0, -0.25, 0], 	[0.25, -0.25, 0.25], 	[0.5, -0.25, 0.25], 	[0.75, -0.25, 0] 	],
							[ [0, -0.5, 0], 	[0.25, -0.5, -0.75], 	[0.5, -0.5, 0.25], 	[0.75, -0.5, 0] 	],
							[ [0, -0.75, -0.25], 	[0.25, -0.75, 0], 	[0.5, -0.75, 0], 	[0.75, -0.75, 0] 	] ]
	, weights = [ [1, 1, 1, 1],
				  [1, 1, 1, 1], 
				  [1, 1, 1, 1], 
				  [1, 1, 1, 1] ];

geom.push( new verb.NurbsSurface( degreeU, knotsU, degreeV, knotsV, controlPoints, weights) );


// planar surface
var base = [-0.5,-0.5,0]
	, uaxis = [0.5,0.5,0]
	, vaxis = [0,1,0]
	, ulength = 1
	, vlength = 1;

geom.push( new verb.PlanarSurface( base, uaxis, vaxis, ulength, vlength ) );

// polyline
geom.push( new verb.PolyLine( [ [0,0,0], [0.3,0.3,0.3], [-0.2, 0.3, 0.4], [0.3, -0.3, 0.2], [0.4, 0.5, 0.8] ] ) );

// revolved surface
var base = [0,0,0]
	, axis = [0,0,1]
	, angle = Math.PI * 2
	, profile = new verb.BezierCurve( [ [0.1, 0, 0.5], [0.5, 0, 0.5], [-0.5, 0, 0.5], [0.5, 0, 0.1] ]);

geom.push( new verb.RevolvedSurface( base, axis, angle, profile ) );

// sphere
geom.push( new verb.Sphere( [ 0, 0, 0 ], 0.5 ) );

// sweep one rail
var p1 = [0,0,0]
	, p2 = [0.5,0,0.5]
	, p3 = [1,0,-2]
	, p4 = [1.5,0,0];

var rail = new verb.BezierCurve( [p1, p2, p3, p4] )
	, profile = new verb.Line( [-0.3,0.3,0], [-0.3,-0.3,0]  );

geom.push( new verb.SweepOneRail( rail, profile ) );

geom.map(function(g){
	addViewer(new Viewer( g, 300, 300, 2 ) );
});
