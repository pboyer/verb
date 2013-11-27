/**
 * Constructor for Geometry
 *
 * @api public
 */

verb.geom.Geometry = function() { 

	var id = verb.core.uid();
	
	this.uniqueId = function() {
		return id;
	};

}.inherits(verb.core.WatchObject);