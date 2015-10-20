package verb.core;

import haxe.Serializer;
import haxe.Unserializer;

interface ISerializable {
    function serialize() : String;
}

@:expose("core.Serializable")
class Serializable {
    public function serialize() : String {
        var serializer = new Serializer();
        serializer.serialize(this);
        return serializer.toString();
    }
}

@:expose("core.Deserializer")
class Deserializer {

    //Construct an ISerializable from its string representation, given a parameter T
    //
    //**params**
    //
    //* A string representing something implementing ISerializable
    //
    //**returns**
    //
    //* A new T from the string

    public static function deserialize<T>(s : String) : T {
        var unserializer = new Unserializer(s);
        var r : T = unserializer.unserialize();
        return r;
    }
}
