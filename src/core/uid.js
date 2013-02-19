/**
 * Generate a unique id.
 *
 * @return {Number} The id
 * @api public
 */

VERB.core.uid = (function(){
	var id = 0;
	return function() {
		return id++;
	};
})();