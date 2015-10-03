package verb.core;

class ArrayExtensions {

    //Fill an array with n copies of null by mutation
    //
    //**params**
    //
    //* the array to fill
    //* the number of null's to add to the array
    //
    //**returns**
    //
    //* nothing, just mutates the given array

    public static function alloc<T>( a : Array<T>, n : Int ){
        if (n < 0) return;
        while (a.length < n) {
            a.push(null);
        }
    }

    //Obtain a reversed copy of an array
    //
    //**params**
    //
    //* array of stuff
    //
    //**returns**
    //
    //* a reversed copy of the array

    public static function reversed<T>(a : Array<T>) : Array<T> {
        var ac = a.copy();
        ac.reverse();
        return ac;
    }

    //Get the last element of an array
    //
    //**params**
    //
    //* array of stuff
    //
    //**returns**
    //
    //* the last element of the array

    public static function last<T>(a : Array<T>) : T {
        return a[a.length-1];
    }

    //Get the first element of an array
    //
    //**params**
    //
    //* array of stuff
    //
    //**returns**
    //
    //* the last element of the array

    public static function first<T>(a : Array<T>) : T {
        return a[0];
    }

    public static function spliceAndInsert<T>(a : Array<T>, start : Int, end : Int, ele : T) : Void {
        a.splice(start, end);
        a.insert(start, ele);
    }

    //Get the first half of an array including the pivot
    //
    //**params**
    //
    //* array of stuff
    //
    //**returns**
    //
    //* the left half

    public static function left<T>(arr : Array<T>) : Array<T>{
        if (arr.length == 0) return [];
        var len = Math.ceil( arr.length / 2 );
        return arr.slice( 0, len );
    }

    //Get the second half of an array, not including the pivot
    //
    //**params**
    //
    //* array of stuff
    //
    //**returns**
    //
    //* the right half

    public static function right<T>(arr : Array<T>) : Array<T>{
        if (arr.length == 0) return [];
        var len = Math.ceil( arr.length / 2 );
        return arr.slice( len );
    }

    //Get the second half of an array including the pivot
    //
    //**params**
    //
    //* array of stuff
    //
    //**returns**
    //
    //* the right half

    public static function rightWithPivot<T>(arr : Array<T>) : Array<T>{
        if (arr.length == 0) return [];
        var len = Math.ceil( arr.length / 2 );
        return arr.slice( len-1 );
    }

    //Obtain the unique set of elements in an array
    //
    //**params**
    //
    //* array of stuff
    //* *Function*, a function that receives two arguments (two objects from the array).  Returning true indicates
    //the objects are equal.
    //
    //**returns**
    //
    //* array of unique elements

    public static function unique<T>( arr : Array<T>, comp : T -> T -> Bool ){

        if (arr.length == 0) return [];

        var uniques = [ arr.pop() ];

        while (arr.length > 0){

            var ele = arr.pop();
            var isUnique = true;

            for (unique in uniques){
                if ( comp( ele, unique ) ){
                    isUnique = false;
                    break;
                }
            }

            if ( isUnique ){
                uniques.push( ele );
            }
        }

        return uniques;
    }

}
