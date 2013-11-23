verb.geom.Geometry = function() { 

	var id = verb.core.uid();
	this.GetUniqueId = function() {
		return id;
	};

}.inherits(verb.core.WatchObject);