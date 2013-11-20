// ActiveObject is a simple class that allows clients to register
// a callback when a property is set

VERB.core.WatchableObject = function() {

	var propertyNameValuePairs = this.GetDefaults();

	// set the initial values
	for (ele in propertyNameValuePairs){
		valMap[ele] = propertyNameValuePairs[ele];
		watchMap[ele] = {};
	}

	var watchMap = {};
	var valMap = {};

	var watcherId = 0;

	this.Get = function( propertyName ){
		return valMap[propertyName];
	}

	this.Set = function( propertyName, value ){

		var oldValue = valMap[propertyName]

		if ( oldValue === undefined ){
			return;
		}

		// set the value
		valMap[propertyName] = value;

		// call all of the functions that are watching with update
		for (ele in watchMap[propertyName]){
			watchMap[ele]( {oldValue: oldValue, newValue: value, target: this} );
		}

	}

	this.Watch = function( propertyName, callback ){

		if ( watchMap[propertyName] === undefined || !callback ){
			return;
		}

		var id = watcherId++;
		watchMap[propertyName][watcherId] = callback;

		return watcherId++;
	}

	this.Ignore = function( propertyName, watcherId ){
	
		if ( watchMap[propertyName] === undefined 
			|| watchMap[propertyName][watcherId] === undefined){
			return;
		}

		watchMap[propertyName][watcherId] = undefined;

	}

};