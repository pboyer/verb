verb.geom.Interval2 = function(minu, maxu, minv, maxv) {

	verb.core.WatchObject.call(this);
	
	this.setAll({ 
		"uinterval": new verb.geom.Interval(minu, maxu),
		"vinterval": new verb.geom.Interval(minv, maxv)
	});

}.inherits(verb.core.WatchObject);
