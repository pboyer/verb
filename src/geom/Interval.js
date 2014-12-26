// ###new Interval(min, max)
//
// Constructor for Interval
//
// **params**
// + *Number*, Start of interval 
// + *Number*, End of the interval 
//
verb.Interval = function(min, max) {

	verb.WatchObject.call(this);
	
	this.setAll({ 
		"min": min,
		"max": max 
	});

}.inherits(verb.WatchObject);
