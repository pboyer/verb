package verb.exe;

#if (neko || cpp)
	import verb.exe.ThreadPool;
#elseif js
    import verb.exe.WorkerPool;
#end

import promhx.Deferred;
import promhx.Promise;

@:expose("exe.Dispatcher")
class Dispatcher {

    public static var THREADS : Int = 1;

    #if (neko || cpp)
        private static var _threadPool : ThreadPool;
    #elseif js
        private static var _workerPool : WorkerPool;
    #end

    private static var _init : Bool = false;

    private static function init() : Void {

        if (_init) return;

        #if (neko || cpp)
            _threadPool = new ThreadPool( THREADS );
        #elseif js
            _workerPool = new WorkerPool( THREADS );
        #end

        _init = true;

    }

    public static function dispatchMethod<T>( classType : Class<Dynamic>, methodName : String, args : Array<Dynamic> ) : Promise<T> {

        init();

        var def = new Deferred<T>();

        var callback = function(x){
            def.resolve( x );
        };

        #if js

            _workerPool.addWork( Type.getClassName( classType ), methodName, args, callback );

        #else

            _threadPool.addTask(function(){ return Reflect.callMethod(classType, Reflect.field(classType, methodName), args )  },
                null, callback);

        #end

        return new Promise<T>( def );
    }
}
