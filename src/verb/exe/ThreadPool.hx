package verb.exe;

#if neko
	import neko.vm.Thread;
	import neko.vm.Mutex;
#elseif cpp
	import cpp.vm.Thread;
	import cpp.vm.Mutex;
#end

#if (neko || cpp)
	private class PoolThread
	{
		private var thread:Thread;
		private var task:Dynamic->Dynamic;
		private var mutex:Mutex;
		public var started:Bool;
		private var _done:Bool;
		public var done(get, never):Bool;
		private function get_done():Bool
		{
			mutex.acquire();
			var d:Bool = _done;
			mutex.release();
			return d;
		}
		private var _result:Dynamic;
		public var result(get, never):Dynamic;
		private function get_result():Dynamic
		{
			mutex.acquire();
			var r:Dynamic = _result;
			mutex.release();
			return r;
		}

		public function new()
		{
			mutex = new Mutex();
		}

		public function start(task:Dynamic->Dynamic, arg:Dynamic):Void
		{
			this.task = task;
			started = true;
			_done = false;
			thread = Thread.create(doWork);
			thread.sendMessage(arg);
		}

		private function doWork():Void
		{
			var arg:Dynamic = Thread.readMessage(true);
			var ret:Dynamic = task(arg);
			mutex.acquire();
			_result = ret;
			_done = true;
			mutex.release();
		}
	}
#end

private typedef Task =
{
    var id:Int;
    var task:Dynamic->Dynamic;
    var done:Bool;
    var arg:Dynamic;
    #if (neko || cpp)
		var thread:PoolThread;
	#end
    var onFinish:Dynamic->Void;
}

/**
 * ...
 * @author Kenton Hamaluik
 */
class ThreadPool
{
    #if (neko || cpp)
		private var numThreads:Int = 1;
		private var threads:Array<PoolThread>;
	#end
    private var tasks:Array<Task>;
    private var nextID:Int = 0;

    public function new(numThreads:Int)
    {
        tasks = new Array <Task> ();
        #if (neko || cpp)
			this.numThreads = numThreads;
			threads = new Array<PoolThread>();
			for (i in 0...this.numThreads)
			{
				threads.push(new PoolThread());
			}
		#end
    }

    public function addTask(task:Dynamic->Dynamic, arg:Dynamic, onFinish:Dynamic->Void):Void
    {
        tasks.push( { id: nextID, task: task, done: false, arg: arg, #if (neko || cpp) thread: null, #end onFinish: onFinish } );
        nextID++;
    }

    #if (neko || cpp)
		private function allTasksAreDone():Bool
		{
			for (task in tasks)
				if (!task.done)
					return false;
			return true;
		}

		private function getNextFreeThread():PoolThread
		{
			for (thread in threads)
				if (!thread.started)
					return thread;
			return null;
		}
	#end

    public function blockRunAllTasks():Void
    {
        #if (neko || cpp)
			while (!allTasksAreDone())
			{
				//get a free thread
				var thread:PoolThread = getNextFreeThread();
				//but if it doesn't exist, try again
				if (thread == null)
					continue;

				for (task in tasks)
				{
					//skip any tasks that are done
					if (task.done)
						continue;

					//if this task is currently being run, see if it's done yet
					if (task.thread != null && task.thread.started)
					{
						if (task.thread.done)
						{
							//yay, it finished!
							task.done = true;
							//reset the thread
							task.thread.started = false;
							//call the on finish function
							if (task.onFinish != null)
								task.onFinish(task.thread.result);
						}
						continue;
					}

					//ok, we have a task that needs running
					//and a thread to run it
					//combine forces!
					task.thread = thread;
					thread.start(task.task, task.arg);

					//break to try to assign the next thread
					break;
				}
			}
		#else
        for (task in tasks)
        {
            if (task.onFinish != null)
                task.onFinish(task.task(task.arg));
        }
        #end

        //clear the old tasks
        tasks = new Array<Task>();
    }
}
