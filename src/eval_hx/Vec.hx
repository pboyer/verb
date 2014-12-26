class Vec {
    public static function zeros1d(rows : Int) : Array<Float> {
        return [ for (i in 0...rows) 0.0 ];
    }

    public static function zeros2d(rows : Int, cols : Int) : Array<Array<Float>> {
        return [ for (i in 0...rows) zeros1d(cols) ];
    }

    public static function zeros3d(rows : Int, cols : Int, depth : Int) : Array<Array<Array<Float>>> {
        return [ for (i in 0...rows) zeros2d(cols, depth) ];
    }

    public static function add(a : Array<Float>, b : Array<Float>){
        return [ for (i in 0...a.length) a[i] + b[i] ];
    }

    public static function mul(a : Float, b : Array<Float>){
        return [ for (i in 0...b.length) a * b[i] ];
    }

    public static function sub(a : Array<Float>, b : Array<Float>){
        return [ for (i in 0...a.length) a[i] - b[i] ];
    }
}