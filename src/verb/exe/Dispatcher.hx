package verb.exe;

#if (neko || cpp)
	import verb.exe.ThreadPool;
#elseif js
    import verb.exe.WorkerPool;
#end

import promhx.Deferred;
import promhx.Promise;
class Dispatcher {

    public static var THREADS : Int = 1;
    private static var _instance: Dispatcher = null;

    #if (neko || cpp)
        private var _threadPool : ThreadPool;
    #elseif js
        private var _workerPool : WorkerPool;
    #end

    private function new() {
        #if (neko || cpp)
            _threadPool = new ThreadPool( THREADS );
        #elseif js
            _workerPool = new WorkerPool( THREADS );
        #end
    }

    public static function instance() : Dispatcher {
        if (_instance == null){
            _instance = new Dispatcher();
        }

        return _instance;
    }

    public function deferMethod<T>( className : String,
                                    methodName : String,
                                    args : Array<Dynamic> ) : Promise<T> {

        var def = new Deferred<T>();

        var callback = function(x){
            def.resolve( x );
        };

        #if js

            // use WorkerPool
            _workerPool.addWork( className, methodName, args, callback );

        #else
            // TODO: neko || cpp use ThreadPool
            var type = Type.resolveClass(className );
            var result = Reflect.callMethod(type, Reflect.field(type, methodName), args );
            callback( result );
        #end

        return new Promise<T>( def );
    }

}
