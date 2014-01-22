// ###new BoundingBox([ points ])
// 
// BoundingBox Constructor
//
// **params**
// + *Array*, Points to add, if desired.  Otherwise, will not be initialized until add is called.

verb.geom.BoundingBox = function() {
	this.initialized = false;
	this.min = [0,0,0];
	this.max = [0,0,0];

 	var pt_args = Array.prototype.slice.call( arguments, 0);

 	if (pt_args.length === 1 && pt_args[0] instanceof Array && pt_args[0][0] instanceof Array ){
 		this.add_elements_sync(pt_args[0]);
 	} else {
 		this.add_elements_sync(pt_args);
 	}
}	

// ####add_elements( point_array, callback ) 
//
// Asynchronously add an array of points to the bounding box
//
// **params**
// + *Array*, An array of length-3 array of numbers 
// + *Function*, Function to call when all of the points in array have been added.  The only parameter to this
// callback is this bounding box.
//

verb.geom.BoundingBox.prototype.add_elements = function( point_array, callback ) 
{

	var that = this; 
	setTimeout(function() {
		point_array.forEach(function(elem, index) {
			that.add(elem);
		});
		callback(that);
	}, 0);

};

// ####add_elements_sync( point_array ) 
//
// Synchronously add an array of points to the bounding box
//
// **params**
// + *Array*, An array of length-3 array of numbers 
//
// **returns**
// + *Object*, This BoundingBox for chaining
//

verb.geom.BoundingBox.prototype.add_elements_sync = function( point_array ) 
{
	var that = this; 
	point_array.forEach( function(elem) {
		that.add(elem);
	});
	return this;
};
 
// ####add( point ) 
//
// Adds a point to the bounding box, expanding the bounding box if the point is outside of it.
// If the bounding box is not initialized, this method has that side effect.
//
// **params**
// + *Array*, A length-3 array of numbers 
//
// **returns**
// + *Object*, This BoundingBox for chaining
//

verb.geom.BoundingBox.prototype.add = function( point ) 
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

// ####contains( point ) 
//
// Determines if two intervals on the real number line intersect
//
// **params**
// + *Number*, Beginning of first interval
// + *Number*, End of first interval
// + *Number*, Beginning of second interval
// + *Number*, End of second interval
//
// **returns**
// + *Boolean*, true if the two intervals overlap, otherwise false
//

verb.geom.BoundingBox.prototype.contains = function(point, tol) {

	if ( !this.initialized )
	{
		return false;
	}

	return this.intersects( new verb.geom.BoundingBox(point), tol );

}

// #### TOLERANCE
//
// Defines the tolerance for bounding box operations

verb.geom.BoundingBox.prototype.TOLERANCE = 1e-4;


// ####intervals_overlap( a1, a2, b1, b2 )
//
// Determines if two intervals on the real number line intersect
//
// **params**
// + *Number*, Beginning of first interval
// + *Number*, End of first interval
// + *Number*, Beginning of second interval
// + *Number*, End of second interval
//
// **returns**
// + *Boolean*, true if the two intervals overlap, otherwise false
//

verb.geom.BoundingBox.prototype.intervals_overlap = function( a1, a2, b1, b2, tol ) {

	var tol = tol || verb.geom.BoundingBox.prototype.TOLERANCE
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

// ####intersects( bb )
//
// Determines if this bounding box intersects with another
//
// **params**
// + *Object*, BoundingBox to check for intersection with this one
//
// **returns**
// + *Boolean*, true if the two bounding boxes intersect, otherwise false
//

verb.geom.BoundingBox.prototype.intersects = function( bb, tol ) {

	if ( !this.initialized || !bb.initialized )
	{
		return false;
	}

	var a1 = this.min
		, a2 = this.max
		, b1 = bb.min
		, b2 = bb.max;

	if ( this.intervals_overlap(a1[0], a2[0], b1[0], b2[0], tol ) 
			&& this.intervals_overlap(a1[1], a2[1], b1[1], b2[1], tol ) 
			&& this.intervals_overlap(a1[2], a2[2], b1[2], b2[2], tol ) )
	{
		return true;
	}

	return false;

};

// ####clear( bb )
//
// Clear the bounding box, leaving it in an uninitialized state.  Call add, add_elements in order to 
// initialize
//
// **returns**
// + *Object*, this BoundingBox for chaining
//

verb.geom.BoundingBox.prototype.clear = function( bb ) {

	this.initialized = false;
	return this;

};

// ####get_longest_axis( bb )
//
// Get longest axis of bounding box
//
// **returns**
// + *Number*, Index of longest axis
//

verb.geom.BoundingBox.prototype.get_longest_axis = function( bb ) {

	var axis_lengths = [ 	this.get_axis_length(0), 
							this.get_axis_length(1), 
							this.get_axis_length(2)];

	return axis_lengths.indexOf(Math.max.apply(Math, axis_lengths));

};

// ####get_axis_length( i )
//
// Get length of given axis. 
//
// **params**
// + *Number*, Index of axis to inspect (between 0 and 2)
//
// **returns**
// + *Number*, Length of the given axis.  If axis is out of bounds, returns 0.
//

verb.geom.BoundingBox.prototype.get_axis_length = function( i ) {

	if (i < 0 || i > 2) return 0;

	return Math.abs( this.min[i] - this.max[i] );

};

// ####intersect( bb )
//
// Compute the boolean intersection of this with another axis-aligned bounding box.  If the two
// bounding boxes do not intersect, returns null.
//
// **params**
// + *Object*, BoundingBox to intersect with
//
// **returns**
// + *Object*, The bounding box formed by the intersection or null if there is no intersection.
//

verb.geom.BoundingBox.prototype.intersect = function( bb, tol ) {

	if ( !this.initialized )
	{
		return null;
	}

	var a1 = this.min
		, a2 = this.max
		, b1 = bb.min
		, b2 = bb.max;

	if ( !this.intersects( bb, tol ) )
		return null;

	var xmax = Math.min( a2[0], b2[0] )
		, xmin = Math.max( a1[0], b1[0] )
		, ymax = Math.min( a2[1], b2[1] )
		, ymin = Math.max( a1[1], b1[1] )
		, zmax = Math.min( a2[2], b2[2] )
		, zmin = Math.max( a1[2], b1[2] )
		, max_bb = [ xmax, ymax, zmax]
		, min_bb = [ xmin, ymin, zmin];

	return new verb.geom.BoundingBox(min_bb, max_bb);

}

