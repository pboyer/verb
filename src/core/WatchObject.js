// A simple class that allows clients to register
// a callback to be updated when a property is changed
verb.core.WatchObject = function() {

	// name -> { id -> callback }
	var watchers = { "change" : {} };

	// name -> value
	var properties = {};

	// counter for watch ids
	var watcherId = 0;

	var that = this;

	// report a property change to the watchers
	var report = function(name, updateObject){

		for (ele in watchers[name]){
			watchers[ele]( updateObject );
		}

		for (ele in watchers["change"]){
			watchers[ele]( updateObject );
		}

	};

	// get the value of a property name
	this.get = function( name ){

		return properties[name];

	};

	// set the value of a property and update watchers
	this.set = function( name, value ){

		var old = properties[name];
		properties[name] = value;

		report({name: name, old: old, "new": value, target: that, type: "full"});

	};

	// set a number of properties given an object containing all of the properties
	this.setAll = function( propertyNameValuePairs ){

		var oldVals = {};

		for ( propName in propertyNameValuePairs ){
			oldVals[propName] = properties[propName];
			properties[propName] = propertyNameValuePairs[propName];
		}

		report({old: oldVals, "new": propertyNameValuePairs, target: that, type: "multi"});

	};

	// set an index of array property and update watchers
	this.setAt = function( name, index, value ){

		var oldArr = properties[name];

		if (oldArr === undefined || oldArr.length >= index || index < 0){
			return;
		}

		var old = properties[name][index];
		properties[name][index] = value;

		report( {name: name, index: index, old: old, "new": value, target: that, type: "index"} );

	};

	// start watching a particular property.  use "name" to receive all 
	// updates
	this.watch = function( name, callback ){

		if ( watchers[name] === undefined || !callback ){
			return;
		}

		var id = watcherId++;
		watchers[name][watcherId] = callback;

		return watcherId++;
	};

	// start watching a list of properties
	this.watchAll = function( names, callback ){

		var watcherIds = [];

		for (var i = 0; i < names.length; i++){
			watcherIds.push( this.watch( names[i], callback ) );
		}

		return watcherIds;

	};

	// stop watching a particular property, given a propertyName
	// and watcherId
	this.ignore = function( name, watcherId ){
	
		if ( watchers[name] === undefined 
			|| watchers[name][watcherId] === undefined){
			return;
		}

		watchers[name][watcherId] = undefined;

	};

};