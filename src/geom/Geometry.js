/**
 * Geometry Constructor.
 *
 * @return {Object} Newly formed Geometry object
 * @api public
 */	

VERB.geom.Geometry = function() { 

	var id = VERB.core.uid();
	this.uid = function() {
		return id;
	};

};