VERB.geom.ActiveGeometry = function(propertyNameValuePairs) { 

	VERB.geom.WatchableObject.call(this, propertyNameValuePairs);

	var id = VERB.core.uid();
	this.GetUniqueId = function() {
		return id;
	};

}.inherits(VERB.core.WatchableObject);