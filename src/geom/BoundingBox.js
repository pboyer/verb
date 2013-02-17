/**
 * BoundngBox Constructor
 *
 * @param {Array} Points to add, if desired.  Otherwise, will not be initialized until add is called.
 * @return {Object} Newly formed BoundingBox object
 * @api public
 */	

VERB.geom.BoundingBox = function() {
	this.initialized = false;
	this.min = [0,0,0];
	this.max = [0,0,0];

 	var pt_args = Array.prototype.slice.call( arguments, 0);
 	this.add_points_sync(pt_args);
}	

/**
 * Asynchronously add an array of points to the bounding box
 *
 * @param {Array} An array of length-3 array of numbers 
 * @param {Function} Function to call when all of the points in array have been added.  The only parameter to this
 * callback is this bounding box.
 * @api public
 */

VERB.geom.BoundingBox.prototype.add_points = function( point_array, callback ) 
{

	var that = this; 
	_.defer(function() {
		_.each( point_array, function(elem, index) {
			that.add(elem);
		});
		callback(that);
	});

};

/**
 * Synchronously add an array of points to the bounding box
 *
 * @param {Array} An array of length-3 array of numbers 
 * @return {Object} This BoundingBox for chaining
 * @api public
 */

VERB.geom.BoundingBox.prototype.add_points_sync = function( point_array ) 
{
	var that = this; 
	_.each( point_array, function(elem) {
		that.add(elem);
	});
	return this;
};

/** 
 * Adds a point to the bounding box, expanding the bounding box if the point is outside of it.
 * If the bounding box is not initialized, this method has that side effect.
 *
 * @param {Array} A length-3 array of numbers 
 * @return {Object} This BoundingBox for chaining
 * @api public
 */

VERB.geom.BoundingBox.prototype.add = function( point ) 
{
	if ( !this.initialized )
	{
		this.min = point.slice(0);
		this.max = point.slice(0);
		this.initialized = true;
		return this;
	}

	if (point[0] > this.max[0] )
	{
		this.max[0] = point[0];
	}

	if (point[1] > this.max[1] )
	{
		this.max[1] = point[1];
	}

	if (point[2] > this.max[2] )
	{
		this.max[2] = point[2];
	}

	if (point[0] < this.min[0] )
	{
		this.min[0] = point[0];
	}

	if (point[1] < this.min[1] )
	{
		this.min[1] = point[1];
	}

	if (point[2] < this.min[2] )
	{
		this.min[2] = point[2];
	}

	return this;

};

/**
 * Determines if two intervals on the real number line intersect
 *
 * @param {Number} Beginning of first interval
 * @param {Number} End of first interval
 * @param {Number} Beginning of second interval
 * @param {Number} End of second interval
 * @return {Boolean} true if the two intervals overlap, otherwise false
 * @api public
 */

VERB.geom.BoundingBox.prototype.contains = function(point) {

	if ( !this.initialized )
	{
		return false;
	}

	return this.intersects( new VERB.geom.BoundingBox(point) );

}

/**
 * Defines the tolerance for bounding box operations
 *
 * @api public
 */

VERB.geom.BoundingBox.prototype.TOLERANCE = 1e-4;

/**
 * Determines if two intervals on the real number line intersect
 *
 * @param {Number} Beginning of first interval
 * @param {Number} End of first interval
 * @param {Number} Beginning of second interval
 * @param {Number} End of second interval
 * @return {Boolean} true if the two intervals overlap, otherwise false
 * @api public
 */

VERB.geom.BoundingBox.prototype.intervals_overlap = function( a1, a2, b1, b2 ) {

	var tol = VERB.geom.BoundingBox.prototype.TOLERANCE
		, x1 = Math.min(a1, a2) - tol
		, x2 = Math.max(a1, a2) + tol
		, y1 = Math.min(b1, b2) - tol
		, y2 = Math.max(b1, b2) + tol;

	if ( (x1 >= y1 && x1 <= y2) || (x2 >= y1 && x2 <= y2) || (y1 >= x1 && y1 <= x2) || (y2 >= x1 && y2 <= x2) )
	{
		return true;
	}
	else 
	{
		return false;
	}

}

/**
 * Determines if this bounding box intersects with another
 *
 * @param {Object} BoundingBox to check for intersection with this one
 * @return {Boolean} true if the two bounding boxes intersect, otherwise false
 * @api public
 */

VERB.geom.BoundingBox.prototype.intersects = function( bb ) {

	if ( !this.initialized || !bb.initialized )
	{
		return false;
	}

	var a1 = this.min
		, a2 = this.max
		, b1 = bb.min
		, b2 = bb.max;

	if ( this.intervals_overlap(a1[0], a2[0], b1[0], b2[0]) 
				&& this.intervals_overlap(a1[1], a2[1], b1[1], b2[1]) 
				&& this.intervals_overlap(a1[2], a2[2], b1[2], b2[2] ) )
	{
		return true;
	}

	return false;

};

/**
 * Clear the bounding box, leaving it in an uninitialized state.  Call add, add_points in order to 
 * initialize
 *
 * @return {Object} this BoundingBox for chaining
 * @api public
 */

VERB.geom.BoundingBox.prototype.clear = function( bb ) {

	this.initialized = false;
	return this;

};

/**
 * Compute the boolean intersection of this with another axis-aligned bounding box.  If the two
 * bounding boxes do not intersect, returns null.
 *
 * @param {Object} BoundingBox to intersect with
 * @return {Object} The bounding box formed by the intersection or null if there is no intersection.
 * @api public
 */

VERB.geom.BoundingBox.prototype.intersect = function( bb ) {

	if ( !this.initialized )
	{
		return null;
	}

	var a1 = this.min
		, a2 = this.max
		, b1 = bb.min
		, b2 = bb.max;

	if ( !this.intersects(bb) )
		return null;

	var xmax = Math.min( a2[0], b2[0] )
		, xmin = Math.max( a1[0], b1[0] )
		, ymax = Math.min( a2[1], b2[1] )
		, ymin = Math.max( a1[1], b1[1] )
		, zmax = Math.min( a2[2], b2[2] )
		, zmin = Math.max( a1[2], b1[2] )
		, max_bb = [ xmax, ymax, zmax]
		, min_bb = [ xmin, ymin, zmin];

	return new VERB.geom.BoundingBox(min_bb, max_bb);

}

