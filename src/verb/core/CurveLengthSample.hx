package verb.core;

@:expose("core.CurveLengthSample")
class CurveLengthSample {
    public var u : Float;
    public var len : Float;

    public function new(u, len) {
        this.u = u;
        this.len = len;
    }
}

