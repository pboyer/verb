verb.geom.Inverval2 = function(minu, maxu, minv, maxv) {

	this.setAll({ 
		"uinterval": new verb.geom.Interval(minu, maxu),
		"vinterval": new verb.geom.Interval(minv, maxv)
	});

}.inherits(verb.core.WatchObject);
