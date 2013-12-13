// ###new Interval(min, max)
//
// Constructor for Interval
//
// **params**
// + *Number*, Start of interval 
// + *Number*, End of the interval 
//
verb.geom.Interval = function(min, max) {

	verb.core.WatchObject.call(this);
	
	this.setAll({ 
		"min": min,
		"max": max 
	});

}.inherits(verb.core.WatchObject);
