import haxe.ds.Vector;

class Utils {
    public static function zeros_1d<T>(rows : Int) : Vector<Float>{
        rows = rows > 0 ? rows : 0;

        var l = new Vector<Float>(rows);
        var i : Int = 0;
        while (i < rows){
            l[i] = 0.0;
            i++;
        }
        return l;
    }

    public static function zeros_2d(rows : Int, cols : Int) : Vector<Vector<Float>>{
        cols = cols > 0 ? cols : 0;
        rows = rows > 0 ? rows : 0;

        var l = new Vector<Vector<Float>>(rows);
        var i : Int = 0;
        while (i < rows){
            l[i] = zeros_1d(cols);
            i++;
        }
        return l;
    }

    public static function zeros_3d(rows : Int, cols : Int, depth : Int) : Vector<Vector<Vector<Float>>>{
        cols = cols > 0 ? cols : 0;
        rows = rows > 0 ? rows : 0;
        depth = depth > 0 ? depth : 0;

        var l = new Vector<Vector<Vector<Float>>>(rows);
        var i : Int = 0;
        while (i < rows){
            l[i] = zeros_2d(cols, depth);
            i++;
        }
        return l;
    }
}
