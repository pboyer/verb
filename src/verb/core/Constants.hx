package verb.core;

// `Constants` contains a collection of default constants used throughout the library. These can be set to adjust verb's
// defaults.

@:expose("core.Constants")
class Constants {
    //The default euclidean distance that identifies whether two points are coincident
    @:expose("TOLERANCE")
    public static var TOLERANCE : Float = 1e-6;
    
    //The minimum value to determine whether two floating point numbers are the same
    @:expose("EPSILON")
    public static var EPSILON : Float = 1e-10;

    //The current version of verb
    @:expose("VERSION")
    public static var VERSION : String = "2.0.0";
}
