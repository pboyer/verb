// ###new Engine( [options] )
//
// Constructor for Engine
//
//
// **params**
// + *Object*, An options object defining the library location, number of threads to use, tolerance of the worker, etc.
//

verb.core.Engine = function(options) {

	// private properties
	var _use_pool = ( typeof Worker === 'function' ) && ( options.use_pool || options.use_pool === undefined );
	var _num_threads = options.num_workers || 2;
	var _tolerance = options.tolerance || 1e-4;
	var _url = options.url || 'js/verbEval.js';
	var _lib = options.library || verb.eval.nurbs;
	var _error_handler = options.error_handler || ( function( message ) { console.warn( message ); } );
	var _pool = undefined;

	// private methods
	var init_pool = function() {

		try {
			_pool = new labor.Pool(_url, _num_threads );
			_pool.start();
		} catch (err) {
			_error_handler( 'Failed to initialize labor.Pool: ' + err );
			return false;
		}
		return true;

	};

	var eval_sync = function(func, arguments_array) {
		return _lib[func].apply(null, arguments_array);
	}

	// ####start()
	//
	// Creates the thread pool if that is being used
	//
	this.start = function() {
		// initialize pool
		if ( _use_pool )
		{
			init_pool();
		}
	};

	// ####eval(func, arguments_array, callback )
	//
	// Evaluate a function asynchronously from the library
	//
	// **params**
	// + *String*, The name of the function to call in the library
	// + *Array*, The array of arguments to the function
	// + *Function*, Function to execute on completion, passing the value to it
	//
	// **returns** 
	// + *Unknown*, the return value of the function
	//
	this.eval = function(func, arguments_array, callback )
	{

		if (!callback){
			return eval_sync(func, arguments_array);
		}

		// if we are to use the pool we must init it 
		if ( _use_pool && ( _pool || ( _pool === undefined && init_pool() ) ) ) {
			_pool.addWork( func, arguments_array, callback );
		}	else {
			setTimeout( function() { callback( eval_sync(func, arguments_array ) ) }, 0);
		}
	}

	// ####setTolerance( tolerance )
	//
	// Set the tolerance of the library
	//
	// **params**
	// + *Number*, The tolerance value
	//
	this.setTolerance = function(tolerance) {
		// TODO: send message to worker pool in labor.js
		_tolerance = tolerance;
	}

	// ####setUsePool( use_pool )
	//
	// Whether to use the thread pool or do evaluations in the main thread
	//
	// **params**
	// + *Boolean*, Use the pool or not
	//
	this.setUsePool = function( use_pool ) {

		if ( use_pool && _pool === undefined && init_pool() ) {
			_use_pool = use_pool;
			return true;
		} else if ( !use_pool ) {
			_pool = null;
			return true;
		} else {
			return false;
		}
		
	}

	// ####setErrorHandler( handler )
	//
	// The error handler function
	//
	// **params**
	// + *Function*, The function that handles errors
	//
	this.setErrorHandler = function( handler ) {
		_error_handler = handler;
	}

	// ####setNumThreads( numThreads )
	//
	// Set the number of threads to use
	//
	// **params**
	// + *Number*, The number of threads to use
	//
	this.setNumThreads = function( num_threads ) {
		_num_threads = num_threads;
		// TODO: implement add or remove workers in labor.js
	}

};

