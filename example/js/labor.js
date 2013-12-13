if ( typeof exports != 'object' || exports === undefined )  // browser context
{
	var labor = {};
}
else // node.js context
{

	var labor = module.exports = {}
		, Worker = require('webworker-threads').Worker;
}

(function(labor) { 

	labor.Router = function( library )
	{

		if ( arguments.callee._singletonInstance )
	    return arguments.callee._singletonInstance;

	  arguments.callee._singletonInstance = this;

		this.lib = library;

		var self = this;

		onmessage = function( e ){
			postMessage( { result: self.lib[ e.data.func ].apply( null, e.data.arguments ), id: e.data.id } );
		};

	};

	labor.Pool = function(filename, count) {

		this.callbacks = {};
	  this.filename = filename;
	  this.count = count || 4;
	  this.queue = [];
	  this.results = [];
	  this.pool = [];
	  this.working = {};
	  this.uuid = 0;
	  return this;

	};

	labor.Pool.prototype.start = function() {
		this.fillPool();
		return this;
	}

	labor.Pool.prototype.onfinish = function() {};

	labor.Pool.prototype.addWork = function( function_name, arguments_array, callback ) {

	  var id = this.uuid++;
	  this.callbacks[ id ] = callback;
	  this.queue.push( { func: function_name, arguments: arguments_array, 'id': id });
	  this.processQueue();
	  return this;

	};

	labor.Pool.prototype.processQueue = function() {

	  if (this.queue.length == 0 && this.pool.length == this.count) {

	    if (this.onfinish)
	      this.onfinish();

	  } else {
	    while (this.queue.length > 0 && this.pool.length > 0) {

	      var unit = this.queue.shift();
	      var worker = this.pool.shift();
	      worker.id = unit.id;
	      this.working[worker.id] = worker;
	      var self = this;

	      // we tell the worker what to do upon completing its task
	      worker.onmessage = function( e ){
		
				var id = this.id;
			    delete self.working[this.id];
			    this.id = null;
			    self.pool.push(this); 

			    try { 

			      if ( self.callbacks[ id ] )
						{
							self.callbacks[ id ]( e.data.result );
							delete self.callbacks[id];
						}

			    } catch(error) {
			      console.warn(error);
			    }

			    self.processQueue();

				};

	      worker.postMessage( unit ); 

	    }
	  }
	  return this;
	};

	labor.Pool.prototype.addWorker = function() {

	  var w = new Worker(this.filename);
	  var self = this;

	  this.pool.push(w);
	  return this;

	};

	labor.Pool.prototype.fillPool = function() {
	  for (var i=0; i<this.count; i++) {
	    this.addWorker();
	  }
	};

})(labor);

