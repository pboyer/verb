package verb.core;

import haxe.Serializer;
import haxe.Unserializer;

// An interface describing a type that can be serialized as a
// string. Use verb.core.Deserializer to construct an instance of the
// the type from the resultant string. The string is the serialized representation of a haxe
// object and is strongly typed. For details, see
// [http://haxe.org/manual/std-serialization.html](http://haxe.org/manual/std-serialization.html) for details.

interface ISerializable {
    function serialize() : String;
}

// Forms a base class for serializable data types

@:expose("core.SerializableBase")
class SerializableBase {
    public function serialize() : String {
        var serializer = new Serializer();
        serializer.serialize(this);
        return serializer.toString();
    }
}

// Deserializes strings for types implementing ISerializable

@:expose("core.Deserializer")
class Deserializer {

    //Construct an ISerializable from its string representation, given a parameter T. You can
    //use this to deserialize almost any type in verb.geom or verb.core.*Data types.
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
