package verb.exe;

#if js

import haxe.ds.IntMap;

import js.html.Worker;

// `WorkerPool` provides a pool of WebWorker objects for concurrent evaluation in JavaScript

@:expose("exe.WorkerPool")
class WorkerPool {

    private var _queue : Array<Work> = [];
    private var _pool : Array<Worker> = [];
    private var _working = new IntMap<Worker>();
    private var _callbacks = new IntMap<Dynamic>();

    // Create a new `WorkerPool`
    //
    //**params**
    //
    //* the number of `Worker` threads to form
    //* the filename of verb's javascript file - defaults to "verb.js". The final path is formed by concatenating `WorkerPool.basePath` and this.

    public function new( numThreads : Int = 1, fileName : String = "verb.js" ) {

        for (i in 0...numThreads){
            var w : Worker;
            try {
                w = new Worker( basePath + fileName );
            } catch (e : Dynamic ) {
                w = new Worker( basePath + fileName.substring(0,-3) + ".min.js" );
            }

           _pool.push( w );
        }
    }

    // The base path to look for verb's source code

    public static var basePath  = "";

    // Add work to perform to the queue

    public function addWork( className : String,
                             methodName : String,
                             args : Array<Dynamic>,
                             callback : Dynamic ) : Void {

        var work = new Work( className, methodName, args );
        _callbacks.set(work.id, callback);
        _queue.push( work );

        processQueue();
    }

    private function processQueue() {

        while (_queue.length > 0 && _pool.length > 0) {

            var work = _queue.shift();
            var workId = work.id;

            var worker = _pool.shift();

            _working.set(workId, worker);

            //upon completing your task...
            worker.onmessage = function( e ){

                _working.remove( workId );
                _pool.push( worker );

                try {
                    if ( _callbacks.exists( workId ) )
                    {
                        _callbacks.get( workId )( e.data.result );
                        _callbacks.remove( workId );
                    }
                } catch(error : Dynamic) {
                    trace( error );
                }

                processQueue();
            };

            worker.postMessage( work );
        }
    }

}

private class Work {

    private static var uuid : Int = 0;

    public var className : String;
    public var methodName : String;
    public var args : Array<Dynamic>;
    public var id : Int;

    public function new(className, methodName, args){
        this.className = className;
        this.methodName = methodName;
        this.args = args;
        this.id = uuid++;
    }
}

#end

