VERB.geom.Inverval2 = function(minu, maxu, minv, maxv) {

	this.set("uinterval", new VERB.geom.Interval(minu, maxu));
	this.set("vinterval", new VERB.geom.Interval(minv, maxv));

}.inherits(VERB.core.WatchObject);
