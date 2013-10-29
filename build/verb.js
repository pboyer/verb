if ( typeof exports != 'object' || exports === undefined )  // browser context
{
	var VERB = {}
		, numeric = window.numeric
		, binomial = window.binomial
		, labor = window.labor
		, _ = window.underscore;
}
else // node.js context
{
	var VERB = module.exports = {}
		, numeric = require('numeric')
		, binomial = require('binomial')
		, labor = require('labor')
		, _ = require('underscore');
}

VERB.geom = {};
VERB.core = {};
VERB.eval = {};

VERB.eval.nurbs = {};

VERB.init = function() {

	VERB.nurbs_engine = new VERB.core.Engine( VERB.eval.nurbs );
	VERB.geom.NURBSGeometry.prototype.nurbs_engine = VERB.nurbs_engine;
	
}

if (typeof Object.create !== 'function') {
    Object.create = function (o) {
        function F() {}
        F.prototype = o;
        return new F();
    };
}

Function.prototype.method = function (name, func) {
    this.prototype[name] = func;
    return this;
};

Function.method('inherits', function (parent) {
    this.prototype = new parent();
    var d = {}, 
        p = this.prototype;
    this.prototype.constructor = parent; 
    return this;
});

// engine nurbs handles nurbs eval requests
// it also acknowledges whether there are web workers available 
// in the broswer, if not, it defaults to blocking evaluation
// also handles situations where the server is unavailable
VERB.core.Engine = function(options) {

	// private properties
	var _use_pool = ( typeof Worker === 'function' ) && ( options.use_pool || options.use_pool === undefined );
	var _num_threads = options.num_workers || 2;
	var _tolerance = options.tolerance || 1e-4;
	var _url = options.url || 'verb_nurbs_eval.js';
	var _lib = options.library || VERB.eval.nurbs;
	var _error_handler = options.error_handler || ( function( message ) { console.warn( message ); } );
	var _pool = undefined;

	// private methods
	var init_pool = function() {

		try {
			_pool = new labor.Pool(_url, _num_threads );
			_pool.start();
		} catch (err) {
			_error_handler( 'Failed to initialize labor.Pool.' );
			return false;
		}
		return true;

	};

	// privleged methods
	this.start = function() {
		// initialize pool
		if ( _use_pool )
		{
			init_pool();
		}
	};

	this.eval = function(func, arguments_array, callback )
	{
		// if we are to use the pool we must init it 
		if ( _use_pool && ( _pool || ( _pool === undefined && init_pool() ) ) ) {
			_pool.addWork( func, arguments_array, callback );
		}	else {
			var that = this;
			_.defer( function() { callback( that.eval_sync(func, arguments_array ) ) } );
		}
	}

	this.eval_sync = function(func, arguments_array) {
		return _library[func].apply(null, arguments_array);
	}

	this.set_tolerance = function(tolerance) {
		// TODO: send message to worker pool in labor.js
		_tolerance = tolerance;
	}

	this.set_use_pool = function( use_pool ) {

		if ( use_pool && _pool === undefined && init_pool() ) {
			_use_pool = use_pool;
			return true;
		} else if ( !use_pool ) {
			_pool = null;
			delete _pool;
			return true;
		} else {
			return false;
		}
		
	}

	this.set_error_handler = function( handler ) {
		_error_handler = handler;
	}

	this.set_num_threads = function( num_threads ) {
		_num_threads = num_threads;
		// TODO: implement add or remove workers in labor.js
	}

};


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
/**
 * k-d Tree JavaScript - V 1.0
 *
 * https://github.com/ubilabs/kd-tree-javascript
 *
 * @author Mircea Pricop <pricop@ubilabs.net>, 2012
 * @author Martin Kleppe <kleppe@ubilabs.net>, 2012
 * @author Ubilabs http://ubilabs.net, 2012
 * @license MIT License <http://www.opensource.org/licenses/mit-license.php>
 *
 * Modified for use with VERB by pboyer 2013
 */

(function(){
  
  function Node(obj, dimension, parent) {
    this.obj = obj;
    this.left = null;
    this.right = null;
    this.parent = parent;
    this.dimension = dimension;
  }

  function kdTree(points, metric, dimensions) {

    var self = this;
    
    function buildTree(points, depth, parent) {
      var dim = depth % dimensions.length,
        median,
        node;

      if (points.length === 0) {
        return null;
      }
      if (points.length === 1) {
        return new Node(points[0], dim, parent);
      }

      points.sort(function (a, b) {
        return a[dimensions[dim]] - b[dimensions[dim]];
      });

      median = Math.floor(points.length / 2);
      node = new Node(points[median], dim, parent);
      node.left = buildTree(points.slice(0, median), depth + 1, node);
      node.right = buildTree(points.slice(median + 1), depth + 1, node);

      return node;
    }

    this.root = buildTree(points, 0, null);

    this.insert = function (point) {
      function innerSearch(node, parent) {

        if (node === null) {
          return parent;
        }

        var dimension = dimensions[node.dimension];
        if (point[dimension] < node.obj[dimension]) {
          return innerSearch(node.left, node);
        } else {
          return innerSearch(node.right, node);
        }
      }

      var insertPosition = innerSearch(this.root, null),
        newNode,
        dimension;

      if (insertPosition === null) {
        this.root = new Node(point, 0, null);
        return;
      }

      newNode = new Node(point, (insertPosition.dimension + 1) % dimensions.length, insertPosition);
      dimension = dimensions[insertPosition.dimension];

      if (point[dimension] < insertPosition.obj[dimension]) {
        insertPosition.left = newNode;
      } else {
        insertPosition.right = newNode;
      }
    };

    this.remove = function (point) {
      var node;

      function nodeSearch(node) {
        if (node === null) {
          return null;
        }

        if (node.obj === point) {
          return node;
        }

        var dimension = dimensions[node.dimension];

        if (point[dimension] < node.obj[dimension]) {
          return nodeSearch(node.left, node);
        } else {
          return nodeSearch(node.right, node);
        }
      }

      function removeNode(node) {
        var nextNode,
          nextObj,
          pDimension;

        function findMax(node, dim) {
          var dimension,
            own,
            left,
            right,
            max;

          if (node === null) {
            return null;
          }

          dimension = dimensions[dim];
          if (node.dimension === dim) {
            if (node.right !== null) {
              return findMax(node.right, dim);
            }
            return node;
          }

          own = node.obj[dimension];
          left = findMax(node.left, dim);
          right = findMax(node.right, dim);
          max = node;

          if (left !== null && left.obj[dimension] > own) {
            max = left;
          }

          if (right !== null && right.obj[dimension] > max.obj[dimension]) {
            max = right;
          }
          return max;
        }

        function findMin(node, dim) {
          var dimension,
            own,
            left,
            right,
            min;

          if (node === null) {
            return null;
          }

          dimension = dimensions[dim];

          if (node.dimension === dim) {
            if (node.left !== null) {
              return findMin(node.left, dim);
            }
            return node;
          }

          own = node.obj[dimension];
          left = findMin(node.left, dim);
          right = findMin(node.right, dim);
          min = node;

          if (left !== null && left.obj[dimension] < own) {
            min = left;
          }
          if (right !== null && right.obj[dimension] < min.obj[dimension]) {
            min = right;
          }
          return min;
        }

        if (node.left === null && node.right === null) {
          if (node.parent === null) {
            self.root = null;
            return;
          }

          pDimension = dimensions[node.parent.dimension];

          if (node.obj[pDimension] < node.parent.obj[pDimension]) {
            node.parent.left = null;
          } else {
            node.parent.right = null;
          }
          return;
        }

        if (node.left !== null) {
          nextNode = findMax(node.left, node.dimension);
        } else {
          nextNode = findMin(node.right, node.dimension);
        }

        nextObj = nextNode.obj;
        removeNode(nextNode);
        node.obj = nextObj;

      }

      node = nodeSearch(self.root);

      if (node === null) { return; }

      removeNode(node);
    };

    this.nearest = function (point, maxNodes, maxDistance) {
      var i,
        result,
        bestNodes;

      bestNodes = new BinaryHeap(
        function (e) { return -e[1]; }
      );

      function nearestSearch(node) {
        var bestChild,
          dimension = dimensions[node.dimension],
          ownDistance = metric(point, node.obj),
          linearPoint = {},
          linearDistance,
          otherChild,
          i;

        function saveNode(node, distance) {
          bestNodes.push([node, distance]);
          if (bestNodes.size() > maxNodes) {
            bestNodes.pop();
          }
        }

        for (i = 0; i < dimensions.length; i += 1) {
          if (i === node.dimension) {
            linearPoint[dimensions[i]] = point[dimensions[i]];
          } else {
            linearPoint[dimensions[i]] = node.obj[dimensions[i]];
          }
        }

        linearDistance = metric(linearPoint, node.obj);

        if (node.right === null && node.left === null) {
          if (bestNodes.size() < maxNodes || ownDistance < bestNodes.peek()[1]) {
            saveNode(node, ownDistance);
          }
          return;
        }

        if (node.right === null) {
          bestChild = node.left;
        } else if (node.left === null) {
          bestChild = node.right;
        } else {
          if (point[dimension] < node.obj[dimension]) {
            bestChild = node.left;
          } else {
            bestChild = node.right;
          }
        }

        nearestSearch(bestChild);

        if (bestNodes.size() < maxNodes || ownDistance < bestNodes.peek()[1]) {
          saveNode(node, ownDistance);
        }

        if (bestNodes.size() < maxNodes || Math.abs(linearDistance) < bestNodes.peek()[1]) {
          if (bestChild === node.left) {
            otherChild = node.right;
          } else {
            otherChild = node.left;
          }
          if (otherChild !== null) {
            nearestSearch(otherChild);
          }
        }
      }

      if (maxDistance) {
        for (i = 0; i < maxNodes; i += 1) {
          bestNodes.push([null, maxDistance]);
        }
      }

      nearestSearch(self.root);

      result = [];

      for (i = 0; i < maxNodes; i += 1) {
        if (bestNodes.content[i][0]) {
          result.push([bestNodes.content[i][0].obj, bestNodes.content[i][1]]);
        }
      }
      return result;
    };

    this.balanceFactor = function () {
      function height(node) {
        if (node === null) {
          return 0;
        }
        return Math.max(height(node.left), height(node.right)) + 1;
      }

      function count(node) {
        if (node === null) {
          return 0;
        }
        return count(node.left) + count(node.right) + 1;
      }

      return height(self.root) / (Math.log(count(self.root)) / Math.log(2));
    };
  }

  // Binary heap implementation from:
  // http://eloquentjavascript.net/appendix2.html

  function BinaryHeap(scoreFunction){
    this.content = [];
    this.scoreFunction = scoreFunction;
  }

  BinaryHeap.prototype = {
    push: function(element) {
      // Add the new element to the end of the array.
      this.content.push(element);
      // Allow it to bubble up.
      this.bubbleUp(this.content.length - 1);
    },

    pop: function() {
      // Store the first element so we can return it later.
      var result = this.content[0];
      // Get the element at the end of the array.
      var end = this.content.pop();
      // If there are any elements left, put the end element at the
      // start, and let it sink down.
      if (this.content.length > 0) {
        this.content[0] = end;
        this.sinkDown(0);
      }
      return result;
    },

    peek: function() {
      return this.content[0];
    },

    remove: function(node) {
      var len = this.content.length;
      // To remove a value, we must search through the array to find
      // it.
      for (var i = 0; i < len; i++) {
        if (this.content[i] == node) {
          // When it is found, the process seen in 'pop' is repeated
          // to fill up the hole.
          var end = this.content.pop();
          if (i != len - 1) {
            this.content[i] = end;
            if (this.scoreFunction(end) < this.scoreFunction(node))
              this.bubbleUp(i);
            else
              this.sinkDown(i);
          }
          return;
        }
      }
      throw new Error("Node not found.");
    },

    size: function() {
      return this.content.length;
    },

    bubbleUp: function(n) {
      // Fetch the element that has to be moved.
      var element = this.content[n];
      // When at 0, an element can not go up any further.
      while (n > 0) {
        // Compute the parent element's index, and fetch it.
        var parentN = Math.floor((n + 1) / 2) - 1,
            parent = this.content[parentN];
        // Swap the elements if the parent is greater.
        if (this.scoreFunction(element) < this.scoreFunction(parent)) {
          this.content[parentN] = element;
          this.content[n] = parent;
          // Update 'n' to continue at the new position.
          n = parentN;
        }
        // Found a parent that is less, no need to move it further.
        else {
          break;
        }
      }
    },

    sinkDown: function(n) {
      // Look up the target element and its score.
      var length = this.content.length,
          element = this.content[n],
          elemScore = this.scoreFunction(element);

      while(true) {
        // Compute the indices of the child elements.
        var child2N = (n + 1) * 2, child1N = child2N - 1;
        // This is used to store the new position of the element,
        // if any.
        var swap = null;
        // If the first child exists (is inside the array)...
        if (child1N < length) {
          // Look it up and compute its score.
          var child1 = this.content[child1N],
              child1Score = this.scoreFunction(child1);
          // If the score is less than our element's, we need to swap.
          if (child1Score < elemScore)
            swap = child1N;
        }
        // Do the same checks for the other child.
        if (child2N < length) {
          var child2 = this.content[child2N],
              child2Score = this.scoreFunction(child2);
          if (child2Score < (swap == null ? elemScore : child1Score)){
            swap = child2N;
          }
        }

        // If the element needs to be moved, swap it, and continue.
        if (swap != null) {
          this.content[n] = this.content[swap];
          this.content[swap] = element;
          n = swap;
        }
        // Otherwise, we are done.
        else {
          break;
        }
      }
    }
  };

  VERB.geom.KDTree = kdTree;

})(VERB);

VERB.geom.NurbsCurve = function( degree, control_points, weights, knots ) {

	VERB.geom.NURBSGeometry.call(this);

	// check for valid relations
	if ( !VERB.eval.nurbs.are_valid_relations( degree, control_points.length, knots.length ) ) 
	{
		console.warn( "Invalid relations were used to instantiate a NurbsCurve - using defaults.")
		var _control_points = [];
		var _homo_control_points = [];
		var _knots = [];
		var _weights = [];
		var _degree = 2;
	}
else
	{
		// private members
		var _control_points = control_points.slice(0);
		var _homo_control_points = VERB.eval.nurbs.homogenize_1d( control_points, weights );
		var _knots = knots.slice(0);
		var _weights = weights.slice(0);
		var _degree = degree;
	}

	// PRIVILEGED METHODS
	this.set_control_point = function( u_index, value ) {
		_control_points[u_index] = value;
		_homo_control_points[u_index] = value * _weights[u_index];
		return this;
	};

	this.set_weight = function( u_index, value ) {
		_weights[u_index] = value;
		set_control_point( u_index, _control_points[u_index] );
		return this;
	};

	this.set_knot = function( u_index, value ) {
		_knots[u_index] = value;
		return this;
	};

	this.point_sync = function( u ) {
		return this.nurbs_engine.eval_sync( 'rational_curve_point', [ _degree, _knot_vector, _homo_control_points, u ] );
	};

	this.derivs_sync = function( u, num_derivs ) {
		return this.nurbs_engine.eval_sync( 'rational_curve_derivs', [ _degree, _knot_vector, _homo_control_points, u, num_derivs] );
	};

	this.point = function( u, callback ) {
		nurbs_engine.eval( 'rational_curve_point', [ _degree, _knot_vector, _homo_control_points, u ], callback ); 
	};

	this.derivs = function( u, num_derivs, callback ) {
		this.nurbs_engine.eval( 'rational_curve_derivs', [ _degree, _knot_vector, _homo_control_points, u, num_derivs  ], callback ); 
	};

	// this.points = function( num_samples, callback ) {
	// 	// TODO: here we would use the worker to generate all of the points
	// 	// wait for callback
	// };

};


VERB.geom.NURBSGeometry = function() {

	VERB.geom.Geometry.call(this);

}.inherits(VERB.geom.Geometry);




VERB.geom.NurbsSurface = function( degree, control_points, weights, knots ) {

	VERB.geom.NURBSGeometry.call(this);

	// private members
	var _control_points = control_points.slice(0);
	var _knots = knots.slice(0);
	var _weights = weights.slice(0);
	var _degree = degree;

	this.set_control_point = function(u_index, v_index, value) {

	};

	this.set_weight = function(u_index, v_index, value) {

	};

	this.set_control_point = function(u_index, v_index, value) {

	};

	// privileged methods
	this.point = function(u, v, callback) {

	};

	this.derivs = function(u, v, num_u, num_v, callback) {

	};

}.inherits( VERB.geom.NURBSGeometry );



VERB.geom.Vector = function(x, y, z) {

  if (arguments.length == 3) {
    this.x = x;
    this.y = y;
    this.z = z;
  } else if ('x' in x) {
    this.x = x.x;
    this.y = x.y;
    this.z = x.z;
  } else {
    this.x = x[0];
    this.y = x[1];
    this.z = x[2];
  }

};

VERB.geom.Vector.prototype = {
  clone: function() {
    return new VERB.geom.Vector(this.x, this.y, this.z);
  },

  negated: function() {
    return new VERB.geom.Vector(-this.x, -this.y, -this.z);
  },

  plus: function(a) {
    return new VERB.geom.Vector(this.x + a.x, this.y + a.y, this.z + a.z);
  },

  minus: function(a) {
    return new VERB.geom.Vector(this.x - a.x, this.y - a.y, this.z - a.z);
  },

  times: function(a) {
    return new VERB.geom.Vector(this.x * a, this.y * a, this.z * a);
  },

  dividedBy: function(a) {
    return new VERB.geom.Vector(this.x / a, this.y / a, this.z / a);
  },

  dot: function(a) {
    return this.x * a.x + this.y * a.y + this.z * a.z;
  },

  lerp: function(a, t) {
    return this.plus(a.minus(this).times(t));
  },

  length: function() {
    return Math.sqrt(this.dot(this));
  },

  unit: function() {
    return this.dividedBy(this.length());
  },

  cross: function(a) {
    return new VERB.geom.Vector(
      this.y * a.z - this.z * a.y,
      this.z * a.x - this.x * a.z,
      this.x * a.y - this.y * a.x
    );
  }
};
/**
 * Intersect two NURBS surfaces
 *
 * @param {Number} integer degree of surface in u direction
 * @param {Array} array of nondecreasing knot values in u direction
 * @param {Number} integer degree of surface in v direction
 * @param {Array} array of nondecreasing knot values in v direction
 * @param {Array} 3d array of control points, top to bottom is increasing u direction, left to right is increasing v direction,
 									and where each control point is an array of length (dim+1)
 * @param {Number} u parameter at which to evaluate the surface point
 * @param {Number} v parameter at which to evaluate the surface point
 * @return {Array} a point represented by an array of length (dim)
 * @api public
 */

VERB.eval.nurbs.rational_surface_surface_intersect = function( not, sure, yet ) {



}


/**
 * Intersect two NURBS curves
 *
 * @param {Number} integer degree of curve1
 * @param {Array} array of nondecreasing knot values for curve 1
 * @param {Array} 2d array of homogeneous control points, where each control point is an array of length (dim+1) 
 									and form (wi*pi, wi) for curve 1
 * @param {Number} integer degree of curve2
 * @param {Array} array of nondecreasing knot values for curve 2
 * @param {Array} 2d array of homogeneous control points, where each control point is an array of length (dim+1) 
 									and form (wi*pi, wi) for curve 2
 * @param {Number} tolerance for the intersection
 * @return {Array} a 2d array specifying the intersections on u params of intersections on curve 1 and cruve 2
 * @api public
 */

VERB.eval.nurbs.rational_curve_curve_bb_intersect = function( degree1, knot_vector1, control_points1, degree2, knot_vector2, control_points2, tol ) {



}


/**
 * Sample a NURBS curve assuming parameterization 0 to 1, corresponds to http://ariel.chronotext.org/dd/defigueiredo93adaptive.pdf
 *
 * @param {Number} integer degree
 * @param {Array} array of nondecreasing knot values 
 * @param {Array} 1d array of homogeneous control points, where each control point is an array of length (dim+1) and form (wi*pi, wi) 
 * @param {Number} integer number of samples
 * @return {Array} an dictionary of parameter - point pairs
 * @api public
 */

VERB.eval.nurbs.rational_curve_regular_sample = function( degree, knot_vector, control_points, num_samples ) {

	return VERB.eval.nurbs.rational_curve_regular_sample_range( degree, knot_vector, control_points, 0, 1.0, num_samples );

}

/**
 * Sample a NURBS curve assuming parameterization 0 to 1, corresponds to http://ariel.chronotext.org/dd/defigueiredo93adaptive.pdf
 *
 * @param {Number} integer degree
 * @param {Array} array of nondecreasing knot values 
 * @param {Array} 1d array of homogeneous control points, where each control point is an array of length (dim+1) and form (wi*pi, wi) 
 * @param {Number} start parameter for sampling
 * @param {Number} end parameter for sampling
 * @param {Number} integer number of samples
 * @return {Array} an dictionary of parameter - point pairs
 * @api public
 */

VERB.eval.nurbs.rational_curve_regular_sample_range = function( degree, knot_vector, control_points, start_u, end_u, num_samples ) {

	if (num_samples < 1){
		num_samples = 2;
	}

	var p = [],
		span = (end_u - start_u) / (num_samples - 1),
		u = 0;

	for (var i = 0; i < num_samples; i++){

		u = start_u + span * i;
		p.push( [u].concat( VERB.eval.nurbs.rational_curve_point(degree, knot_vector, control_points, u) ) );
		
	}

	return p;

}

/**
 * Sample a NURBS curve assuming parameterization 0 to 1, corresponds to http://ariel.chronotext.org/dd/defigueiredo93adaptive.pdf
 *
 * @param {Number} integer degree
 * @param {Array} array of nondecreasing knot values 
 * @param {Array} 2d array of homogeneous control points, where each control point is an array of length (dim+1) 
 									and form (wi*pi, wi) 
 * @param {Number} tolerance for the adaptive scheme
 * @return {Array} an array of dim + 1 length where the first element is the param where it was sampled and the remaining the pt
 * @api public
 */

VERB.eval.nurbs.rational_curve_adaptive_sample = function( degree, knot_vector, control_points, tol ) {

	return VERB.eval.nurbs.rational_curve_adaptive_sample_range( degree, knot_vector, control_points, 0, 1.0, tol );

}

/**
 * Sample a NURBS curve at 3 points, facilitating adaptive sampling
 *
 * @param {Number} integer degree
 * @param {Array} array of nondecreasing knot values 
 * @param {Array} 2d array of homogeneous control points, where each control point is an array of length (dim+1) 
 									and form (wi*pi, wi) 
 * @param {Number} start parameter for sampling
 * @param {Number} end parameter for sampling
 * @return {Array} an array of dim + 1 length where the first element is the param where it was sampled and the remaining the pt
 * @api public
 */

VERB.eval.nurbs.rational_curve_adaptive_sample_range = function( degree, knot_vector, control_points, start_u, end_u, tol ) {

	// sample curve at three pts
	var p1 = VERB.eval.nurbs.rational_curve_point(degree, knot_vector, control_points, start_u),
		p3 = VERB.eval.nurbs.rational_curve_point(degree, knot_vector, control_points, end_u),
		t = 0.45 + 0.1 * Math.random(),
		mid_u = start_u + (end_u - start_u) * t,
		p2 = VERB.eval.nurbs.rational_curve_point(degree, knot_vector, control_points, mid_u);

		// the if three points are "flat", return the two end pts
		if ( VERB.eval.nurbs.three_points_are_flat( p1, p2, p3, tol ) ) {

			return [ 	[start_u, p1[0], p1[1], p1[2]], 
								[ end_u, p3[0], p3[1], p3[2] ] ];

		} else {

			// recurse on the two halves
			var left_pts = VERB.eval.nurbs.rational_curve_adaptive_sample_range( degree, knot_vector, control_points, start_u, mid_u, tol )
				, right_pts = VERB.eval.nurbs.rational_curve_adaptive_sample_range( degree, knot_vector, control_points, mid_u, end_u, tol );

			// concatenate the two		
			return left_pts.slice(0, -1).concat(right_pts);

		}
}

/**
 * Determine if three points form a straight line within a given tolerance for their 2 * squared area
 *
 *          * p2
 *         / \
 *        /   \
 *       /     \ 
 *      /       \
 *  p1 * -------- * p3
 *
 * The area metric is 2 * the squared norm of the cross product of two edges, requiring no square roots and no divisions
 *
 * @param {Array} p1
 * @param {Array} p2
 * @param {Array} p3
 * @param {Number} The tolerance for whether the three points form a line
 * @return {Boolean} Whether the triangle passes the test
 * @api public
 */

VERB.eval.nurbs.three_points_are_flat = function( p1_arr, p2_arr, p3_arr, tol ) {

	// convert to vectors, this is probably unnecessary
	var p1 = new VERB.geom.Vector( p1_arr ),
		p2 = new VERB.geom.Vector( p2_arr ),
		p3 = new VERB.geom.Vector( p3_arr );

	// find the area of the triangle wihout using a square root
	var norm = p2.minus( p1 ).cross( p3.minus( p1 ) ),
			area = norm.dot( norm );

	return area < tol;

}



/**
 * Compute the derivatives at a point on a NURBS surface
 *
 * @param {Number} integer degree of surface in u direction
 * @param {Array} array of nondecreasing knot values in u direction
 * @param {Number} integer degree of surface in v direction
 * @param {Array} array of nondecreasing knot values in v direction
 * @param {Array} 3d array of control points, where rows are the u dir, and columns run along the positive v direction, 
 									and where each control point is an array of length (dim)  
 * @param {Number} u parameter at which to evaluate the derivatives
 * @param {Number} v parameter at which to evaluate the derivatives
 * @param {Array} 1d array of control point weights 
 * @return {Array} a point represented by an array of length (dim)
 * @api public
 */

VERB.eval.nurbs.curve_knot_insert = function( degree, knots, control_points, u, s, r ) {

	// np is n for the initial curve
	// nq is n for the output curve with knots inserted
	// k is the span on which the knots are inserted
	// s is the initial multiplicity of the point
	// r is the number of times to insert the knot
	// control_points is initial set of control points

	var dim = control_points[0].length
		, np = knots.length - degree - 2
		, num_pts = control_points.length
		, k = VERB.eval.nurbs.knot_span( degree, u, knots )
		, mp = np + degree + 1
		, nq = np + r
		, num_pts_post = num_pts + r    
		, Rw = new Array( degree + 1 )  
		, knots_post = new Array( knots.length + r ) 
		, control_points_post = new Array( num_pts_post ) 
		, i = 0;

	// new knot vector
	for (i = 0; i <= k; i++) {
		knots_post[i] = knots[i];
	}
	
	for (i = 1; i <= r; i++) {
		knots_post[k+i] = u; 
	}

	for (i = k+1; i <= mp; i++)
	{
		knots_post[i+r] = knots[i];
	}

	// control point generation
	for (i = 0; i <= k-degree; i++)
	{
		control_points_post[i] = control_points[i]; 
	}

	for (i = k-s; i <= np; i++)
	{
		control_points_post[i+r] = control_points[i];
	}

	for (i = 0; i <= degree-s; i++)
	{
		Rw[i] = control_points[k-degree+1];
	}

	var L = 0
		, alpha = 0;

	// insert knot r times
	for (var j = 1; j <= r; j++) {

		L = k-degree+j;

		for (i = 0; i <= degree-j-s; i++) {

			alpha = ( u - knots[L+i] ) / ( knots[i+k+1] - knots[L+i] );
			Rw[i] = numeric.add( numeric.mul( alpha, Rw[i+1] ), numeric.mul( (1.0 - alpha), Rw[i]) );

		}

		control_points_post[ L ] = Rw[0];
		control_points_post[k+r-j-s] = Rw[degree-j-s];

	}

	// not so confident about this part
	for (i = L+1; i < k-s; i++) // set remaining control points
	{
		control_points_post[i] = Rw[ i - L ];
	}

	return [knots_post, control_points_post];

}

/**
 * Compute the derivatives at a point on a NURBS surface
 *
 * @param {Number} integer degree of surface in u direction
 * @param {Array} array of nondecreasing knot values in u direction
 * @param {Number} integer degree of surface in v direction
 * @param {Array} array of nondecreasing knot values in v direction
 * @param {Array} 3d array of control points, where rows are the u dir, and columns run along the positive v direction, 
 									and where each control point is an array of length (dim)  
 * @param {Number} u parameter at which to evaluate the derivatives
 * @param {Number} v parameter at which to evaluate the derivatives
 * @param {Array} 1d array of control point weights 
 * @return {Array} a point represented by an array of length (dim)
 * @api public
 */

VERB.eval.nurbs.rational_surface_derivs = function( degree_u, knot_vector_u, degree_v, knot_vector_v, homo_control_points, num_derivs, u, v) {

	var SKL_homo = VERB.eval.nurbs.surface_derivs( degree_u, knot_vector_u, degree_v, knot_vector_v, homo_control_points, num_derivs, u, v )
		, ders = VERB.eval.nurbs.separate_homo_derivs_2d( SKL_homo )
		, Aders = ders[0]
		, wders = ders[1]
		, k = 0
		, i  = 0
		, j = 0
		, l = 0
		, SKL = []
		, dim = Aders[0][0].length;

	for (k = 0; k <= num_derivs; k++) {
		SKL.push([]);

		for (l = 0; l <= num_derivs-k; l++) {

			var v = Aders[k][l];
			for (j=1; j <= l; j++) {
				v = numeric.sub( v, numeric.mul( numeric.mul( binomial.get(l, j), wders[0][j] ), SKL[k][l-j] ) );
			}

			for (i = 1; i <= k; i++) {
				v = numeric.sub( v, numeric.mul( numeric.mul( binomial.get(k, i), wders[i][0] ), SKL[k-i][l] ) );
				
				var v2 = VERB.eval.nurbs.zeros_1d(dim);

				for (j = 1; j <= l; j++) {
					v2 = numeric.add( v2, numeric.mul( numeric.mul( binomial.get(l, j), wders[i][j] ), SKL[k-i][l-j] ) );
				}

				v = numeric.sub( v, numeric.mul( binomial.get(k, i), v2) );

			}
			SKL[k].push( numeric.mul(1/wders[0][0], v )); // demogenize

		}
	}

	return SKL;

}

/**
 * Compute a point on a NURBS surface
 *
 * @param {Number} integer degree of surface in u direction
 * @param {Array} array of nondecreasing knot values in u direction
 * @param {Number} integer degree of surface in v direction
 * @param {Array} array of nondecreasing knot values in v direction
 * @param {Array} 3d array of control points, top to bottom is increasing u direction, left to right is increasing v direction,
 									and where each control point is an array of length (dim+1)
 * @param {Number} u parameter at which to evaluate the surface point
 * @param {Number} v parameter at which to evaluate the surface point
 * @return {Array} a point represented by an array of length (dim)
 * @api public
 */

VERB.eval.nurbs.rational_surface_point = function( degree_u, knot_vector_u,  degree_v, knot_vector_v, homo_control_points, u, v ) {

	return VERB.eval.nurbs.dehomogenize( VERB.eval.nurbs.surface_point( degree_u, knot_vector_u,  degree_v, knot_vector_v, homo_control_points, u, v ) );

}

/**
 * Determine the derivatives of a NURBS curve at a given parameter
 *
 * @param {Number} integer degree of curve
 * @param {Array} array of nondecreasing knot values
 * @param {Array} 2d array of homogeneous control points, where each control point is an array of length (dim+1) and form (wi*pi, wi)
 * @param {Number} parameter on the curve at which the point is to be evaluated
 * @return {Array} a point represented by an array of length (dim)
 * @api public
 */

VERB.eval.nurbs.rational_curve_derivs = function( degree, knot_vector, homo_control_points, u, num_derivs ) {

	// compute the derivatives of the control points
	// separate derivative array into two
	var ders = VERB.eval.nurbs.separate_homo_derivs_1d( VERB.eval.nurbs.curve_derivs( degree, knot_vector, homo_control_points, u, num_derivs ) )
		, Aders = ders[0]
		, wders = ders[1]
		, k = 0
		, i  = 0
		, CK = [];

	for (k = 0; k <= num_derivs; k++) {
		var v = Aders[k];

		for (i = 1; i <= k; i++) {
			v = numeric.sub( v, numeric.mul( numeric.mul( binomial.get(k, i), wders[i] ), CK[k-i] ) );
		}
		CK.push( numeric.mul(1/wders[0], v )); // demogenize
	}

	return CK;

}		

/**
 * Separate the array of derivatives into the A(u) component and w(u), i.e. the weight and everything else without dehomogenization
 *
 * @param {Array} 1d array of homogeneous derivatives
 * @return {Array} an array with Aders and wders as element 0 and 1, respectively
 * @api public
 */

VERB.eval.nurbs.separate_homo_derivs_1d = function( CK ) {

	var dim = CK[0].length
		, last = dim-1
		, Aders = []
		, wders = [];

	for ( var i = 0, l = CK.length; i < l; i++ ) {
		Aders.push( CK[i].slice(0, last) );
		wders.push( CK[i][last] );
	}

	return [Aders, wders];

}	

/**
 * Separate the array of derivatives into the A(u) component and w(u), i.e. the weight and everything else without dehomogenization
 *
 * @param {Array} 2d array of homogeneous derivatives
 * @return {Array} an array with Aders and wders as element 0 and 1, respectively
 * @api public
 */

VERB.eval.nurbs.separate_homo_derivs_2d = function( SKL ) {

	var Aders = []
		, wders = [];

	for ( var i = 0, l = SKL.length; i < l; i++ ) {
		var CK = VERB.eval.nurbs.separate_homo_derivs_1d( SKL[i] );
		Aders.push( CK[0] );
		wders.push( CK[1] );
	}

	return [Aders, wders];

}	


/**
 * Compute a point on a NURBS curve
 *
 * @param {Number} integer degree of curve
 * @param {Array} array of nondecreasing knot values
 * @param {Array} 2d array of homogeneous control points, where each control point is an array of length (dim+1) 
 									and form (wi*pi, wi)
 * @param {Number} parameter on the curve at which the point is to be evaluated
 * @return {Array} a point represented by an array of length (dim)
 * @api public
 */

VERB.eval.nurbs.rational_curve_point = function( degree, knot_vector, homo_control_points, u) {

	return VERB.eval.nurbs.dehomogenize( VERB.eval.nurbs.curve_point( degree, knot_vector, homo_control_points, u) );

}	

/**
 * Dehomogenize a point 
 *
 * @param {Array} a point represented by an array (wi*pi, wi) with length (dim+1)
 * @return {Array} a point represented by an array pi with length (dim)
 * @api public
 */

VERB.eval.nurbs.dehomogenize = function( homo_point ) {

	var dim = homo_point.length
		, point = []
		, wt = homo_point[dim-1];

	for (var i = 0; i < homo_point.length-1;i++)
		point.push( homo_point[i] / wt );

	return point;

}

/**
 * Transform a 1d array of points into their homogeneous equivalents
 *
 * @param {Array} 1d array of control points, (actually a 2d array of size (m x dim) )
 * @param {Array} array of control point weights, the same size as the array of control points (m x 1)
 * @return {Array} 1d array of control points where each point is (wi*pi, wi) where wi 
 									 is the ith control point weight and pi is the ith control point, 
 									 hence the dimension of the point is dim + 1
 * @api public
 */

VERB.eval.nurbs.homogenize_1d = function( control_points, weights) {

	var rows = control_points.length
		, dim = control_points[0].length
		, k = 0
		, homo_control_points = []
		, wt = 0
		, ref_pt = [];

	for (var i = 0; i < rows; i++) {

		var pt = [];
		ref_pt = control_points[i];
		wt = weights[i];

		for (k = 0; k < dim; k++) {
			pt.push( ref_pt[k] * wt );
		}

		// append the weight
		pt.push(wt);

		homo_control_points.push(pt);
	}

	return homo_control_points;

}

/**
 * Transform a 2d array of points into their homogeneous equivalents
 *
 * @param {Array} 2d array of control points, (actually a 3d array of size m x n x dim)
 * @param {Array} array of control point weights, the same size as the control points array (m x n x 1)
 * @return {Array} 1d array of control points where each point is (wi*pi, wi) where wi 
 									 is the ith control point weight and pi is the ith control point, the size is 
 									 (m x n x dim+1)
 * @api public
 */

VERB.eval.nurbs.homogenize_2d = function( control_points, weights) {

	var rows = control_points.length
		, cols = control_points[0].length
		, dim = control_points[0][0].length
		, j = 0
		, k = 0
		, homo_control_points = []
		, wt = 0
		, ref_pt = [];

	for (var i = 0; i < rows; i++) {
		homo_control_points.push( VERB.eval.nurbs.homogenize_1d(control_points[i], weights[i]) );
	}

	return homo_control_points;

}

/**
 * Compute the derivatives on a non-uniform, non-rational B spline surface
 *
 * @param {Number} integer degree of surface in u direction
 * @param {Array} array of nondecreasing knot values in u direction
 * @param {Number} integer degree of surface in v direction
 * @param {Array} array of nondecreasing knot values in v direction
 * @param {Array} 3d array of control points, where rows are the u dir, and columns run along the positive v direction, 
 									and where each control point is an array of length (dim)  
 * @param {Number} u parameter at which to evaluate the derivatives
 * @param {Number} v parameter at which to evaluate the derivatives
 * @return {Array} a point represented by an array of length (dim)
 * @api public
 */

VERB.eval.nurbs.surface_derivs = function( degree_u, knot_vector_u, degree_v, knot_vector_v, control_points, num_derivatives, u, v ) {

	var n = knot_vector_u.length - degree_u - 2
		, m = knot_vector_v.length - degree_v - 2;

	return VERB.eval.nurbs.surface_derivs_given_n_m( n, degree_u, knot_vector_u, m, degree_v, knot_vector_v, control_points, num_derivatives, u, v );

}

/**
 * Compute the derivatives on a non-uniform, non-rational B spline surface 
 * (corresponds to algorithm 3.6 from The NURBS book, Piegl & Tiller 2nd edition)
 *
 * @param {Number} integer number of basis functions in u dir - 1 = knot_vector_u.length - degree_u - 2
 * @param {Number} integer degree of surface in u direction
 * @param {Array} array of nondecreasing knot values in u direction
 * @param {Number} integer number of basis functions in v dir - 1 = knot_vector_u.length - degree_u - 2
 * @param {Number} integer degree of surface in v direction
 * @param {Array} array of nondecreasing knot values in v direction
 * @param {Array} 3d array of control points, where rows are the u dir, and columns run along the positive v direction, 
 									and where each control point is an array of length (dim)  
 * @param {Number} u parameter at which to evaluate the derivatives
 * @param {Number} v parameter at which to evaluate the derivatives
 * @return {Array} a point represented by an array of length (dim)
 * @api public
 */

VERB.eval.nurbs.surface_derivs_given_n_m = function( n, degree_u, knot_vector_u, m, degree_v, knot_vector_v, control_points, num_derivatives, u, v ) {

	if ( VERB.eval.nurbs.are_valid_relations(degree_u, control_points.length, knot_vector_u.length ) === false ||
		VERB.eval.nurbs.are_valid_relations(degree_v, control_points[0].length, knot_vector_v.length ) === false ) {
		console.error('Invalid relations between control points, knot vector, and n');
		return null;
	}

	var dim = control_points[0][0].length
		, du = Math.min(num_derivatives, degree_u)
		, dv = Math.min(num_derivatives, degree_v)
		, SKL = VERB.eval.nurbs.zeros_3d( du+1, dv+1, dim )
		, knot_span_index_u = VERB.eval.nurbs.knot_span_given_n( n, degree_u, u, knot_vector_u )
		, knot_span_index_v = VERB.eval.nurbs.knot_span_given_n( m, degree_v, v, knot_vector_v )
		, uders = VERB.eval.nurbs.deriv_basis_functions_given_n_i( knot_span_index_u, u, degree_u, n, knot_vector_u )  
		, vders = VERB.eval.nurbs.deriv_basis_functions_given_n_i( knot_span_index_v, v, degree_v, m, knot_vector_v )
		, temp = VERB.eval.nurbs.zeros_2d( degree_v+1, dim )
		, k = 0
		, s = 0
		, r = 0
		, l = 0
		, dd = 0;

	for (k = 0; k <= du; k++) {	
		for (s = 0; s <= degree_v; s++) {		
			temp[s] = VERB.eval.nurbs.zeros_1d( dim );

			for (r = 0; r <= degree_u; r++) {	
				temp[s] = numeric.add( temp[s], numeric.mul( uders[k][r], control_points[knot_span_index_u-degree_u+r][knot_span_index_v-degree_v+s]) );
			}
		}

		dd = Math.min(num_derivatives-k, dv);

		for (l = 0; l <= dd; l++) {	
			SKL[k][l] = VERB.eval.nurbs.zeros_1d( dim );

			for (s = 0; s <= degree_v; s++) {	
				SKL[k][l] = numeric.add( SKL[k][l], numeric.mul( vders[l][s], temp[s] ) );
			}
		}
	}

	return SKL;
}

/**
 * Compute a point on a non-uniform, non-rational B-spline surface
 *
 * @param {Number} integer degree of surface in u direction
 * @param {Array} array of nondecreasing knot values in u direction
 * @param {Number} integer degree of surface in v direction
 * @param {Array} array of nondecreasing knot values in v direction
 * @param {Array} 3d array of control points, where rows are the u dir, and columns run along the positive v direction, 
 									and where each control point is an array of length (dim)  
 * @param {Number} u parameter at which to evaluate the surface point
 * @param {Number} v parameter at which to evaluate the surface point
 * @return {Array} a point represented by an array of length (dim)
 * @api public
 */

VERB.eval.nurbs.surface_point = function( degree_u, knot_vector_u,  degree_v, knot_vector_v, control_points, u, v ) {

	var n = knot_vector_u.length - degree_u - 2
		, m = knot_vector_v.length - degree_v - 2;

	return 	VERB.eval.nurbs.surface_point_given_n_m( n, degree_u, knot_vector_u, m, degree_v, knot_vector_v, control_points, u, v );

}

/**
 * Compute a point on a non-uniform, non-rational B spline surface
 * (corresponds to algorithm 3.5 from The NURBS book, Piegl & Tiller 2nd edition)
 *
 * @param {Number} integer number of basis functions in u dir - 1 = knot_vector_u.length - degree_u - 2
 * @param {Number} integer degree of surface in u direction
 * @param {Array} array of nondecreasing knot values in u direction
 * @param {Number} integer degree of surface in v direction
 * @param {Array} array of nondecreasing knot values in v direction
 * @param {Array} 3d array of control points, where rows are the u dir, and columns run along the positive v direction, 
 									and where each control point is an array of length (dim)  
 * @param {Number} u parameter at which to evaluate the surface point
 * @param {Number} v parameter at which to evaluate the surface point
 * @return {Array} a point represented by an array of length (dim)
 * @api public
 */

VERB.eval.nurbs.surface_point_given_n_m = function( n, degree_u, knot_vector_u, m, degree_v, knot_vector_v, control_points, u, v ) {

	if ( VERB.eval.nurbs.are_valid_relations(degree_u, control_points.length, knot_vector_u.length ) === false ||
		VERB.eval.nurbs.are_valid_relations(degree_v, control_points[0].length, knot_vector_v.length ) === false ) {
		console.error('Invalid relations between control points, knot vector, and n');
		return null;
	}

	var dim = control_points[0][0].length
		, knot_span_index_u = VERB.eval.nurbs.knot_span_given_n( n, degree_u, u, knot_vector_u )
		, knot_span_index_v = VERB.eval.nurbs.knot_span_given_n( m, degree_v, v, knot_vector_v )
		, u_basis_vals = VERB.eval.nurbs.basis_functions_given_knot_span_index( knot_span_index_u, u, degree_u, knot_vector_u )
		, v_basis_vals = VERB.eval.nurbs.basis_functions_given_knot_span_index( knot_span_index_v, v, degree_v, knot_vector_v )
		, uind = knot_span_index_u - degree_u
		, vind = knot_span_index_v
		, position = VERB.eval.nurbs.zeros_1d( control_points[0][0].length )
		, temp = VERB.eval.nurbs.zeros_1d( control_points[0][0].length )
		, l = 0
		, k = 0;

	for (l = 0; l <= degree_v; l++) {	

		temp = VERB.eval.nurbs.zeros_1d( control_points[0][0].length );
		vind = knot_span_index_v - degree_v + l;

		for (k = 0; k <= degree_u; k++) {	
			temp = numeric.add( temp, numeric.mul( u_basis_vals[k], control_points[uind+k][vind]) );
		}
		position = numeric.add( position, numeric.mul(v_basis_vals[l], temp) );
	}

	return position;
}

/**
 * Determine the derivatives of a non-uniform, non-rational B-spline curve at a given parameter
 *
 * @param {Number} integer degree of curve
 * @param {Array} array of nondecreasing knot values
 * @param {Array} 2d array of control points, where each control point is an array of length (dim)  
 * @param {Number} parameter on the curve at which the point is to be evaluated
 * @return {Array} a point represented by an array of length (dim)
 * @api public
 */

VERB.eval.nurbs.curve_derivs = function( degree, knot_vector, control_points, u, num_derivs ) {

	var n = knot_vector.length - degree - 2;
	return VERB.eval.nurbs.curve_derivs_given_n( n, degree, knot_vector, control_points, u, num_derivs );

}		

/**
 * Determine the derivatives of a non-uniform, non-rational B-spline curve at a given parameter
 * (corresponds to algorithm 3.1 from The NURBS book, Piegl & Tiller 2nd edition)
 *
 * @param {Number} integer number of basis functions - 1 = knot_vector.length - degree - 2
 * @param {Number} integer degree of curve
 * @param {Array} array of nondecreasing knot values
 * @param {Array} 2d array of control points, where each control point is an array of length (dim)  
 * @param {Number} parameter on the curve at which the point is to be evaluated
 * @return {Array} a point represented by an array of length (dim)
 * @api public
 */

VERB.eval.nurbs.curve_derivs_given_n = function( n, degree, knot_vector, control_points, u, num_derivatives ) {

	if ( VERB.eval.nurbs.are_valid_relations(degree, control_points.length, knot_vector.length ) === false ) {
		console.error('Invalid relations between control points, knot vector, and n');
		return null;
	}

	var dim = control_points[0].length
		, du = Math.min(num_derivatives, degree)
		, CK = VERB.eval.nurbs.zeros_2d( du+1, dim )
		, knot_span_index = VERB.eval.nurbs.knot_span_given_n( n, degree, u, knot_vector )
		, nders = VERB.eval.nurbs.deriv_basis_functions_given_n_i( knot_span_index, u, degree, du, knot_vector )
		, k = 0
		, j = 0;

	for (k = 0; k <= du; k++) {	
		for (j = 0; j <= degree; j++) {
			CK[k] = numeric.add( CK[k], numeric.mul( nders[k][j], control_points[ knot_span_index - degree + j ] ) )
		}
	}
	return CK;

}		

/**
 * Confirm the relations between degree (p), number of control points(n+1), and the number of knots (m+1)
 * via The NURBS Book (section 3.2, Second Edition)
 *
 * @param {Number} integer degree
 * @param {Number} integer number of control points
 * @param {Number} integer length of the knot vector (including duplicate knots)
 * @return {Boolean} whether the values are correct
 * @api public
 */

VERB.eval.nurbs.are_valid_relations = function( degree, num_control_points, knot_vector_length ) {

	return ( num_control_points + degree + 1 - knot_vector_length ) === 0 ? true : false;

}		

/**
 * Compute a point on a non-uniform, non-rational b-spline curve
 *
 * @param {Number} integer degree of curve
 * @param {Array} array of nondecreasing knot values
 * @param {Array} 2d array of control points, where each control point is an array of length (dim)  
 * @param {Number} parameter on the curve at which the point is to be evaluated
 * @return {Array} a point represented by an array of length (dim)
 * @api public
 */

VERB.eval.nurbs.curve_point = function( degree, knot_vector, control_points, u) {

	var n = knot_vector.length - degree - 2;
	return VERB.eval.nurbs.curve_point_given_n( n, degree, knot_vector, control_points, u);

}		

/**
 * Compute a point on a non-uniform, non-rational b-spline curve
 * (corresponds to algorithm 3.1 from The NURBS book, Piegl & Tiller 2nd edition)
 *
 * @param {Number} integer number of basis functions - 1 = knot_vector.length - degree - 2
 * @param {Number} integer degree of curve
 * @param {Array} array of nondecreasing knot values
 * @param {Array} 2d array of control points, where each control point is an array of length (dim)  
 * @param {Number} parameter on the curve at which the point is to be evaluated
 * @return {Array} a point represented by an array of length (dim)
 * @api public
 */

VERB.eval.nurbs.curve_point_given_n = function( n, degree, knot_vector, control_points, u) {

	if ( VERB.eval.nurbs.are_valid_relations(degree, control_points.length, knot_vector.length ) === false ) {
		console.error('Invalid relations between control points, knot vector, and n');
		return null;
	}

	var knot_span_index = VERB.eval.nurbs.knot_span_given_n( n, degree, u, knot_vector )
		, basis_values = VERB.eval.nurbs.basis_functions_given_knot_span_index( knot_span_index, u, degree, knot_vector ) 
		, position = VERB.eval.nurbs.zeros_1d( control_points[0].length );

		for (var j = 0; j <= degree; j++ )	{
			position = numeric.add( position, numeric.mul( basis_values[j], control_points[ knot_span_index - degree + j ] ) );
		}

		return position;
}	

/**
 * Generate a 1d array of zeros
 *
 * @param {Number} integer number of rows
 * @return {Array} 1d array of given size
 * @api public
 */

VERB.eval.nurbs.zeros_1d = function(size) {
  size = size > 0 ? size : 0;

  var arr = [];

  while(size--) {
    arr.push(0);
  }

  return arr;
}

/**
 * Generate a 2D array of zeros
 *
 * @param {Number} integer number of rows
 * @param {Number} integer number of columns
 * @return {Array} 2d array of given size
 * @api public
 */

VERB.eval.nurbs.zeros_2d = function(rows, cols) {
  cols = cols > 0 ? cols : 0;
  rows = rows > 0 ? rows : 0;

  var arr = [];
  var cols_temp = cols;
  var rows_temp = rows;

  while(rows--) {
    arr.push([]);

    while(cols_temp--) {
      arr[rows_temp-rows-1].push(0);
    }
    cols_temp = cols;
  }

  return arr;
}

/**
 * Generate a 3D array of zeros
 *
 * @param {Number} integer number of rows
 * @param {Number} integer number of columns
 * @param {Number} integer depth (i.e. dimension of arrays in 2d matrix)
 * @return {Array} 3d array of given size
 * @api public
 */

VERB.eval.nurbs.zeros_3d = function(rows, cols, dim) {
  cols = cols > 0 ? cols : 0;
  rows = rows > 0 ? rows : 0;

  var arr = [];
  var cols_temp = cols;
  var rows_temp = rows;

  while(rows--) {
    arr.push([]);

    while(cols_temp--) {
      arr[rows_temp-rows-1].push( VERB.eval.nurbs.zeros_1d(dim) );
    }
    cols_temp = cols;
  }

  return arr;
}

/**
 * Compute the non-vanishing basis functions and their derivatives
 *
 * @param {Number} float parameter
 * @param {Number} integer degree
 * @param {Array} array of nondecreasing knot values
 * @return {Array} 2d array of basis and derivative values of size (n+1, p+1) The nth row is the nth derivative and the first row is made up of the basis function values.
 * @api public
 */

VERB.eval.nurbs.deriv_basis_functions = function( u, degree, knot_vector )
{
	var knot_span_index = VERB.eval.nurbs.knot_span( degree, u, knot_vector )
		, m = knot_vector.length - 1
		, n = m - degree - 1;

	return VERB.eval.nurbs.deriv_basis_functions_given_n_i( knot_span_index, u, degree, n, knot_vector );
}	

/**
 * Compute the non-vanishing basis functions and their derivatives
 * (corresponds to algorithm 2.3 from The NURBS book, Piegl & Tiller 2nd edition)
 *
 * @param {Number} integer knot span index
 * @param {Number} float parameter
 * @param {Number} integer degree
 * @param {Number} integer number of basis functions - 1 = knot_vector.length - degree - 2
 * @param {Array} array of nondecreasing knot values
 * @return {Array} 2d array of basis and derivative values of size (n+1, p+1) The nth row is the nth derivative and the first row is made up of the basis function values.
 * @api public
 */

VERB.eval.nurbs.deriv_basis_functions_given_n_i = function( knot_span_index, u, p, n, knot_vector )
{
	var ndu = VERB.eval.nurbs.zeros_2d(p+1, p+1)
		, left = new Array( p + 1 )
		, right = new Array( p + 1 )
		, saved = 0
		, temp = 0
		, j = 1
		, r = 0;

	ndu[0][0] = 1.0;

	for(j = 1; j <= p; j++) {

		left[j] = u - knot_vector[knot_span_index+1-j];
		right[j] = knot_vector[knot_span_index+j] - u;
		saved = 0.0;

		for (r = 0; r < j; r++) {

			ndu[j][r] = right[r+1] + left[j-r];
			temp = ndu[r][j-1] / ndu[j][r];

			ndu[r][j] = saved + right[r+1]*temp;
			saved = left[j-r]*temp;

		}
		ndu[j][j] = saved;
	}


	var ders = VERB.eval.nurbs.zeros_2d(n+1, p+1)
		, a = VERB.eval.nurbs.zeros_2d(2, p+1)
		, k = 1
		, s1 = 0
		, s2 = 1
		, d = 0
		, rk = 0
		, pk = 0
		, j1 = 0
		, j2 = 0;

	for(j = 0; j <= p; j++) {
		ders[0][j] = ndu[j][p];
	}

	for (r = 0; r<=p; r++) {
		s1 = 0;
		s2 = 1;
		a[0][0] = 1.0;

		for (k=1; k<=n ;k++)
		{
			d = 0.0;
			rk = r - k;
			pk = p - k;

			if (r >= k) {
				a[s2][0] = a[s1][0] / ndu[pk+1][rk];
				d = a[s2][0]*ndu[rk][pk];
			}

			if (rk >= -1) {
				j1 = 1;
			} else {
				j1 = -rk;
			}

			if (r-1 <= pk) {
				j2 = k-1;
			} else {
				j2 = p - r;
			}

			for (j = j1; j <= j2; j++) {
				a[s2][j] = ( a[s1][j] - a[s1][ j - 1 ] ) / ndu[ pk + 1 ][ rk + j ];
				d += a[s2][j]*ndu[rk+j][pk];
			}

			if (r <= pk)
			{
				a[s2][k] = -a[s1][k-1]/ndu[pk+1][r];
				d += a[s2][k] * ndu[r][pk];
			}

			ders[k][r] = d;
			j = s1;
			s1 = s2;
			s2 = j;
		}
	}

	r = p;
	for (k = 1; k <= n; k++) {
		for (j = 0; j <= p; j++) {
			ders[k][j] *= r;
		}
		r *= (p-k);
	}

	return ders;

};

/**
 * Compute the non-vanishing basis functions
 *
 * @param {Number} float parameter
 * @param {Number} integer degree of function
 * @param {Array} array of nondecreasing knot values
 * @return {Array} list of non-vanishing basis functions
 * @api public
 */

VERB.eval.nurbs.basis_functions = function( u, degree, knot_vector )
{
	var knot_span_index = VERB.eval.nurbs.knot_span(u, degree, knot_vector);
	return VERB.eval.nurbs.basis_functions_given_knot_span_index( knot_span_index, u, degree, knot_vector );
};

/**
 * Compute the non-vanishing basis functions
 * (corresponds to algorithm 2.2 from The NURBS book, Piegl & Tiller 2nd edition)
 *
 * @param {Number} integer knot span index
 * @param {Number} float parameter
 * @param {Number} integer degree of function
 * @param {Array} array of nondecreasing knot values
 * @return {Array} list of non-vanishing basis functions
 * @api public
 */

VERB.eval.nurbs.basis_functions_given_knot_span_index = function( knot_span_index, u, degree, knot_vector )
{
	var basis_functions = new Array( degree + 1 )
		, left = new Array( degree + 1 )
		, right = new Array( degree + 1 )
		, saved = 0
		, temp = 0;

	basis_functions[0] = 1.0;

	for(var j = 1; j <= degree; j++) {

		left[j] = u - knot_vector[knot_span_index+1-j];
		right[j] = knot_vector[knot_span_index+j] - u;
		saved = 0.0;

		for (var r = 0; r < j; r++) {

			temp = basis_functions[r] / ( right[r+1] + left[j-r] );
			basis_functions[r] = saved + right[r+1]*temp;
			saved = left[j-r]*temp;

		}

		basis_functions[j] = saved;
	}

	return basis_functions;
};


/**
 * Find the span on the knot vector without supplying n
 *
 * @param {Number} integer degree of function
 * @param {Number} float parameter
 * @param {Array} array of nondecreasing knot values
 * @return {Number} the index of the knot span
 * @api public
 */

VERB.eval.nurbs.knot_span = function( degree, u, knot_vector )
{

	var m = knot_vector.length - 1
		, n = m - degree - 1;

	return VERB.eval.nurbs.knot_span_given_n(n, degree, u, knot_vector);

};

/**
 * Find the span on the knot vector knot_vector of the given parameter
 * (corresponds to algorithm 2.1 from The NURBS book, Piegl & Tiller 2nd edition)
 *
 * @param {Number} integer number of basis functions - 1 = knot_vector.length - degree - 2
 * @param {Number} integer degree of function
 * @param {Number} float parameter
 * @param {Array} array of nondecreasing knot values
 * @return {Number} the index of the knot span
 * @api public
 */

VERB.eval.nurbs.knot_span_given_n = function( n, degree, u, knot_vector )
{
	if ( u >= knot_vector[n+1] )
	{
		return n;
	}

	if ( u < knot_vector[degree] )
	{
		return degree;
	}

	var low = degree
		, high = n+1
		, mid = Math.floor( (low + high) / 2 );

	while( u < knot_vector[ mid ] || u >= knot_vector[ mid + 1 ] )
	{
		if ( u < knot_vector[ mid ] )
		{
			high = mid;
		}
		else 
		{
			low = mid;
		}
		mid = Math.floor( (low + high) / 2 );
	}

	return mid;

};
