// ###new Interval2(minu, maxu, minv, maxv)
//
// Constructor for Interval2
//
// **params**
// + *Number*, Start of interval in the u direction
// + *Number*, End of the interval in the u direction
// + *Number*, Start of interval in the v direction
// + *Number*, End of the interval in the v direction
//
verb.Interval2 = function(minu, maxu, minv, maxv) {

	verb.core.WatchObject.call(this);
	
	this.setAll({ 
		"uinterval": new verb.Interval(minu, maxu),
		"vinterval": new verb.Interval(minv, maxv)
	});

}.inherits(verb.core.WatchObject);
