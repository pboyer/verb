package verb.core.types;

@:expose("core.CurveCurveIntersectionOptions")
class CurveCurveIntersectionOptions {

    public var sampleTol : Float = Constants.TOLERANCE;
    public var tol : Float = Constants.TOLERANCE;

    public function new(){ }

}