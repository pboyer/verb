verb.geom.Interval = function(min, max) {

	this.setAll({ 
		"min": min,
		"max": max 
	});

}.inherits(verb.core.WatchObject);
