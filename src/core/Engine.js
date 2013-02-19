// engine nurbs handles nurbs eval requests
// it also acknowledges whether there are web workers available 
// in the broswer, if not, it defaults to blocking evaluation
// also handles situations where the server is unavailable
VERB.core.Engine = function(options) {

	// private properties
	var _use_pool = ( typeof Worker === 'function' ) && ( options.use_pool || options.use_pool === undefined );
	var _num_threads = options.num_workers || 2;
	var _tolerance = options.tolerance || 1e-4;
	var _url = options.url || 'verb_nurbs_eval.js';
	var _lib = options.library || VERB.eval.nurbs;
	var _error_handler = options.error_handler || ( function( message ) { console.warn( message ); } );
	var _pool = undefined;

	// private methods
	var init_pool = function() {

		try {
			_pool = new labor.Pool(_url, _num_threads );
			_pool.start();
		} catch (err) {
			_error_handler( 'Failed to initialize labor.Pool.' );
			return false;
		}
		return true;

	};

	// privleged methods
	this.start = function() {
		// initialize pool
		if ( _use_pool )
		{
			init_pool();
		}
	};

	this.eval = function(func, arguments_array, callback )
	{
		// if we are to use the pool we must init it 
		if ( _use_pool && ( _pool || ( _pool === undefined && init_pool() ) ) ) {
			_pool.addWork( func, arguments_array, callback );
		}	else {
			var that = this;
			_.defer( function() { callback( that.eval_sync(func, arguments_array ) ) } );
		}
	}

	this.eval_sync = function(func, arguments_array) {
		return _library[func].apply(null, arguments_array);
	}

	this.set_tolerance = function(tolerance) {
		// TODO: send message to worker pool in labor.js
		_tolerance = tolerance;
	}

	this.set_use_pool = function( use_pool ) {

		if ( use_pool && _pool === undefined && init_pool() ) {
			_use_pool = use_pool;
			return true;
		} else if ( !use_pool ) {
			_pool = null;
			delete _pool;
			return true;
		} else {
			return false;
		}
		
	}

	this.set_error_handler = function( handler ) {
		_error_handler = handler;
	}

	this.set_num_threads = function( num_threads ) {
		_num_threads = num_threads;
		// TODO: implement add or remove workers in labor.js
	}

};

