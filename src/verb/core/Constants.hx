package verb.core;

@:expose("core.Constants")
class Constants {
    
    //The default euclidean distance that identifies whether two points are coincident
    @:expose("TOLERANCE")
    public static var TOLERANCE : Float = 1e-6;
    
    //The minimum value to determine whether two floating point numbers are the same
    @:expose("EPSILON")
    public static var EPSILON : Float = 1e-10;
}
