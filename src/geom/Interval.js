verb.geom.Interval = function(min, max) {

	verb.core.WatchObject.call(this);
	
	this.setAll({ 
		"min": min,
		"max": max 
	});

}.inherits(verb.core.WatchObject);
