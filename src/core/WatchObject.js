// ###new WatchObject()
//
// Constructor for WatchObject
//
// WatchObject is a simple type with observable properties.  You can register callbacks for
// when these properties change
//

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

		if (typeof name === "string"){

			for (var ele in watchers[name]){
				watchers[name][ele]( updateObject );
			}

			for (var ele in watchers["change"]){
				watchers["change"][ele]( updateObject );
			}
			
		} else {
			for (var n in name){
				report( n, updateObject );
			}
		}

	};

	// ####eval(func, arguments_array, callback )
	//
	// Get the value of a property name. 
	//
	// **params**
	// + *String*, The name of the property
	//
	// **returns** 
	// + *Unknown*, The value of the property
	//
	this.get = function( name ){

		return properties[name];

	};

	// ####set( name, value )
	//
	// Set the value of a property and update watchers.  Initializes the value if it doesn't already exist
	//
	// **params**
	// + *String*, The name of the property
	// + *Unknown*, The new value for the property
	this.set = function( name, value ){

		var old = properties[name];

		properties[name] = value;
		watchers[name] = watchers[name] || {};

		report( name, {name: name, old: old, "new": value, target: that, type: "full"});

	};


	// ####setAll( propertyNameValuePairs )
	//
	// Set the value of a collection of properties simultaneously
	//
	// **params**
	// + *Object*, An object literal mapping from property names to new values
	this.setAll = function( propertyNameValuePairs ){

		var oldVals = {};

		for ( var propName in propertyNameValuePairs ){
			oldVals[propName] = properties[propName];
			properties[propName] = propertyNameValuePairs[propName];
			watchers[propName] = watchers[propName] || {};
		}

		report( propertyNameValuePairs, { old: oldVals, "new": propertyNameValuePairs, target: that, type: "multi" } );

	};

	// ####setAt( name, index, value  )
	//
	// Set the value of an array property at a particular index.  Update watchers
	// indicating that it is an "index" type update.
	//
	// **params**
	// + *String*, The name of the property
	// + *Number*, The index at which to change the value
	// + *Unknown*, The new value for the index

	this.setAt = function( name, index, value ){

		var oldArr = properties[name];

		if (oldArr === undefined || oldArr.length >= index || index < 0){
			return;
		}

		var old = properties[name][index];
		properties[name][index] = value;

		report( name, {name: name, index: index, old: old, "new": value, target: that, type: "index"} );

	};

	// ####watch( name, callback )
	//
	// Start watching a particular property.  Use "change" as the name to receive all 
	// updates from this object
	//
	// **params**
	// + *String*, The name of the property
	// + *Function*, The callback
	//
	// **returns** 
	// + *Number*, A watcher id which can be used to unregister the callback
	//
	this.watch = function( name, callback ){

		if ( properties[name] === undefined || !callback ){
			return;
		}

		var id = watcherId++;
		watchers[name][watcherId] = callback;

		return watcherId++;
	};

	// ####watchAll( names, callback )
	//
	// Start watching multiple properties
	//
	// **params**
	// + *Array*, Array of property names
	// + *Function*, The callback
	//
	// **returns** 
	// + *Array*, An array of watcher ids which can be used to unregister the callbacks
	//
	this.watchAll = function( names, callback ){

		var watcherIds = [];

		for (var i = 0; i < names.length; i++){
			watcherIds.push( this.watch( names[i], callback ) );
		}

		return watcherIds;

	};

	// ####watchAll( names, callback )
	//
	// Stop watching a property
	//
	// **params**
	// + *String*, Property name
	// + *Number*, Watcher id to remove

	this.ignore = function( name, watcherId ){
	
		if ( watchers[name] === undefined 
			|| watchers[name][watcherId] === undefined){
			return;
		}

		watchers[name][watcherId] = undefined;

	};

};