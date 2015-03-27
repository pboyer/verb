package verb.topo;

import verb.core.types.IDoublyLinkedList;
import verb.core.types.DoublyLinkedListExtensions;
using verb.core.types.DoublyLinkedListExtensions;

import verb.core.Vec;
using verb.core.Vec;

using Lambda;

@:expose('topo.Analyze')
class Analyze {

    public static function volume(s : Solid, o : Array<Float> = null) : Float {
        if (o == null) o = [0.0,0.0,0.0];
        var v = 0.0;

        for (f in s.f.iter()){
            for (l in f.l.iter()){
                var se : HalfEdge = l.e;
                var ce = se.nxt;
                do {
                    v += tetravol( se.v.pt, ce.v.pt, ce.nxt.v.pt, o );
                    ce = ce.nxt;
                } while ( ce.nxt != se );
            }
        }

        return v / 6.0;
    }

    // helper method for volume of a solid, as an optimization does not mult by 6
    private static function tetravol( a : Array<Float>, b : Array<Float>, c : Array<Float>, d : Array<Float> ){
        return ( a.sub(d) ).dot( b.sub(d).cross( c.sub(d) ) );
    }

    public static function area(s : Solid) : Float {
        return s.f.iter().fold(function(f,a){ return a + faceArea( f );  }, 0.0);
    }

    public static function faceArea(f : Face) : Float {
        var n = f.normal();
        return f.l.iter().fold(function(l,a){ return a + loopArea( l, n );  }, 0.0);
    }

    public static function loopArea(l : Loop, n : Array<Float> = null) : Float {
        var e = l.e;
        if (e == e.nxt || e == e.nxt.nxt) return 0.0;

        var v = 0.0;

        if (n == null) n = l.f.normal();

        var se = l.e;
        var o = l.e.v.pt;
        var ce = se.nxt;

        do {
            var a = ce.v.pt;
            var b = ce.nxt.v.pt;

            v += n.dot( a.sub(o).cross(b.sub(o)) );

            ce = ce.nxt;
        } while ( ce.nxt != se );

        return v / 2;
    }
}

