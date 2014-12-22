// ###new BoundingBox([ points ])
// 
// BoundingBox Constructor
//
// **params**
// + *Array*, Points to add, if desired.  Otherwise, will not be initialized until add is called.

verb.BoundingBox = function( pts ) {

	this.initialized = false;

	this.dim = 3;
	this.min = null;
	this.max = null;

 	if ( pts ) {
 		this.addRange( pts );
 	}
}	

// ####fromPoint( point ) 
//
// Create a bounding box initialized with a single element
//
// **params**
// + *Array*, A array of numbers 
//
// **returns**
// + *Object*, This BoundingBox for chaining
//

verb.BoundingBox.fromPoint = function( pt ){
	var bb = new verb.BoundingBox();
	bb.add( pt );
	return bb;
}

// ####add( point ) 
//
// Adds a point to the bounding box, expanding the bounding box if the point is outside of it.
// If the bounding box is not initialized, this method has that side effect.
//
// **params**
// + *Array*, A length-n array of numbers 
//
// **returns**
// + *Object*, This BoundingBox for chaining
//

verb.BoundingBox.prototype.add = function( point ) 
{
	if ( !this.initialized )
	{
		this.dim = point.length;
		this.min = point.slice(0);
		this.max = point.slice(0);
		this.initialized = true;
		return this;
	}

	var i = 0, l = this.dim;

	for (i = 0; i < l; i++){
		if (point[i] > this.max[i] ) 
			this.max[i] = point[i];
	}

	for (i = 0; i < l; i++){
		if (point[i] < this.min[i] )
			this.min[i] = point[i];
	}

	return this;

};

// ####addRange( points, callback ) 
//
// Asynchronously add an array of points to the bounding box
//
// **params**
// + *Array*, An array of length-n array of numbers 
// + *Function*, Function to call when all of the points in array have been added.  The only parameter to this
// callback is this bounding box.
//

verb.BoundingBox.prototype.addRange = function( points, callback ) 
{
	var l = points.length;

	if (callback){
		setTimeout(function() {
			for (var i = 0; i < l; i++) {
				this.add(points[i]);
			}
			callback(this);
		}.bind(this), 0);
	} else {
		for (var i = 0; i < l; i++) {
			this.add(points[i]);
		}
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

verb.BoundingBox.prototype.contains = function(point, tol) {

	if ( !this.initialized )
	{
		return false;
	}

	return this.intersects( new verb.BoundingBox([point]), tol );

}

// #### TOLERANCE
//
// Defines the tolerance for bounding box operations

verb.BoundingBox.prototype.TOLERANCE = 1e-4;


// ####intervalsOverlap( a1, a2, b1, b2 )
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

verb.BoundingBox.prototype.intervalsOverlap = function( a1, a2, b1, b2, tol ) {

	var tol = tol || verb.BoundingBox.prototype.TOLERANCE
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

verb.BoundingBox.prototype.intersects = function( bb, tol ) {

	if ( !this.initialized || !bb.initialized )
	{
		return false;
	}

	var a1 = this.min
		, a2 = this.max
		, b1 = bb.min
		, b2 = bb.max;

	if ( this.intervalsOverlap(a1[0], a2[0], b1[0], b2[0], tol ) 
			&& this.intervalsOverlap(a1[1], a2[1], b1[1], b2[1], tol ) 
			&& this.intervalsOverlap(a1[2], a2[2], b1[2], b2[2], tol ) )
	{
		return true;
	}

	return false;

};

// ####clear( bb )
//
// Clear the bounding box, leaving it in an uninitialized state.  Call add, addRange in order to 
// initialize
//
// **returns**
// + *Object*, this BoundingBox for chaining
//

verb.BoundingBox.prototype.clear = function( bb ) {

	this.initialized = false;
	return this;

};

// ####getLongestAxis( bb )
//
// Get longest axis of bounding box
//
// **returns**
// + *Number*, Index of longest axis
//

verb.BoundingBox.prototype.getLongestAxis = function( bb ) {

	var axisLengths = [];
	for (var i = 0; i < this.dim; i++){
		axisLengths.push( this.getAxisLength(i) );
	}

	return axisLengths.indexOf(Math.max.apply(Math, axisLengths));

};

// ####getAxisLength( i )
//
// Get length of given axis. 
//
// **params**
// + *Number*, Index of axis to inspect (between 0 and 2)
//
// **returns**
// + *Number*, Length of the given axis.  If axis is out of bounds, returns 0.
//

verb.BoundingBox.prototype.getAxisLength = function( i ) {

	if (i < 0 || i > this.dim-1) return 0;

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

verb.BoundingBox.prototype.intersect = function( bb, tol ) {

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

	var maxbb = []
		, minbb = [];
		
	for (var i = 0; i < this.dim; i++){
		maxbb.push( Math.min( a2[i], b2[i] ) );
		minbb.push( Math.max( a1[i], b1[i] ) );
	}

	return new verb.BoundingBox([minbb, maxbb]);

}

