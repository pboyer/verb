package verb.exe;

#if js
    import verb.exe.WorkerPool;
#else
    import verb.exe.ThreadPool;
#end

import promhx.Deferred;
import promhx.Promise;

@:expose("exe.Dispatcher")
class Dispatcher {

    public static var THREADS : Int = 1;

    #if js
        private static var _workerPool : WorkerPool;
    #else
        private static var _threadPool : ThreadPool;
    #end

    private static var _init : Bool = false;

    private static function init() : Void {

        if (_init) return;

        #if js
            _workerPool = new WorkerPool( THREADS );
        #else
            _threadPool = new ThreadPool( THREADS );
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
            _threadPool.addTask(function(_ : Dynamic){ var r : Dynamic = Reflect.callMethod(classType, Reflect.field(classType, methodName), args ); return r; }, null, callback);
        #end

        return new Promise<T>( def );
    }
}
