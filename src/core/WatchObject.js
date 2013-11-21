// WatchableObject is a simple class that allows clients to register
// a callback when a property is set

VERB.core.WatchObject = function() {

	// propertyName -> { id -> callback }
	var watchers = { "change" : {} };

	// propertyName -> value
	var properties = {};

	// counter for watch ids
	var watcherId = 0;

	var that = this;

	// report a property change to the watchers
	var report = function(propertyName, updateObject){
		for (ele in watchers[propertyName]){
			watchers[ele]( updateObject );
		}

		for (ele in watchers["change"]){
			watchers[ele]( updateObject );
		}
	};

	// get the value of a property name
	this.get = function( propertyName ){
		return properties[propertyName];
	}

	// set the value of a property and update watchers
	this.setAll = function( propertyName, value ){

		var oldValue = properties[propertyName];
		properties[propertyName] = value;

		report({propertyName: propertyName, oldValue: oldValue, newValue: value, target: that, updateType: "full"});

	}

	// set an index of array property and update watchers
	this.setAt = function( propertyName, index, value ){

		var oldArr = properties[propertyName];

		if (oldArr === undefined || oldArr.length >= index || index < 0){
			return;
		}

		var oldValue = properties[propertyName][index];
		properties[propertyName][index] = value;

		report( {propertyName: propertyName, index: index, oldValue: oldValue, newValue: value, target: that, updateType: "index"} );

	}

	this.watch = function( propertyName, callback ){

		if ( watchers[propertyName] === undefined || !callback ){
			return;
		}

		var id = watcherId++;
		watchers[propertyName][watcherId] = callback;

		return watcherId++;
	}

	this.ignore = function( propertyName, watcherId ){
	
		if ( watchers[propertyName] === undefined 
			|| watchers[propertyName][watcherId] === undefined){
			return;
		}

		watchers[propertyName][watcherId] = undefined;

	}

};