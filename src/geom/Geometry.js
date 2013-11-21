VERB.geom.Geometry = function() { 

	VERB.geom.WatchableObject.call(this);

	var id = VERB.core.uid();
	this.GetUniqueId = function() {
		return id;
	};

}.inherits(VERB.core.WatchObject);