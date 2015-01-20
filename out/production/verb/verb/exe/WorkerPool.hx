package verb.exe;

import haxe.ds.IntMap;

import js.html.Worker;

class Work {

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

class WorkerPool {

    private var _queue : Array<Work> = [];
    private var _pool : Array<Worker> = [];
    private var _working = new IntMap<Worker>();
    private var _callbacks = new IntMap<Dynamic -> Dynamic>();

    public function new( numThreads : Int, fileName : String = "verb.js" ) {

        for (i in 0...numThreads){
           _pool.push( new Worker("verb.js") );
        }
    }

    public function addWork( className : String,
                             methodName : String,
                             arguments : Array<Dynamic>,
                             callback : Dynamic->Dynamic ) : Void {

        var work = new Work( className, methodName, arguments );
        _callbacks.set(work.id, callback);
        _queue.push( work );

        processQueue();
    }

    public function processQueue() {

        while (_queue.length > 0 && _pool.length > 0) {

            var work = _queue.shift();
            var workId = work.id;

            var worker = _pool.shift();

            _working.set(workId, worker);

            // upon completing your task...
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

