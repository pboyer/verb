package verb.topo;


import verb.core.Exception;
import verb.core.NurbsCurveData.Point;

import verb.core.Vec;
using verb.core.Vec;

typedef Polygon = Array<Point>;

@:expose('topo.Make')
class Make {

    public static function lamina( profile : Polygon ) : Solid {
        var s = Solid.mvfs( profile[0] );

        var p0 = profile[0];

        var e = s.f.l.e;
        var ce = s.f.l.e;

        for (pt in profile){
            if (pt == p0) continue;
            var nv = s.lmev( ce, ce, pt );
            ce = nv.e;
        }

        //the initial lmev moves the first half-edge to
        //start at the second vertex, so we need to
        //use e.nxt here
        s.lmef( e.nxt, ce );

        return s;
    }

    public static function extrusion( profile : Polygon, dir : Array<Float> ) : Solid {

        //assume all points are not coincident, form one continuous outline
        if (profile.length < 3) {
            throw new Exception("More than three points are required to define a polygon!");
        }

        //TODO: make sure you go through profile in the right order
//        var a = profile[0];
//        var b = profile[1];
//        var c = profile[2];
//
//        //pick 3 points and use the extrusion direction to define the plane
//        var n = a.sub(b).cross( c.sub(b) );
//
//        if ( n.dot(dir) > 0 ){
//            //reverse
//        }

        var s = lamina( profile );

        var nvs = s.f.l.halfEdges().map(function(e){
            return s.lmev( e, e, verb.core.Vec.add( e.v.pt, dir) );
        });

        nvs.map(function(v : Vertex){
                return v.e;
            })
            .map(function(e : HalfEdge){
                var nf = s.lmef(e, e.nxt.nxt.nxt);
                return nf;
            });

        return s;
    }

}
