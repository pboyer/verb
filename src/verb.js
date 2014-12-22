"use strict";

// browser context
if ( typeof exports != 'object' || exports === undefined )  
{
	var verb = {}
		, numeric = window.numeric
		, binomial = window.binomial
		, labor = window.labor;
} else  {
	var verb = module.exports = {}
		, numeric = require('numeric')
		, binomial = require('binomial')
		, labor = require('labor');
}

// Initialize the verb namespace objects
verb = verb || {};
verb.core = verb.core || {};
verb.eval = verb.eval || {};

// ####verb.EPSILON
//
// Used for numeric comparisons
verb.EPSILON = 1e-10;

// ####verb.TOLERANCE
//
// Default tolerance for geometric operations - defines "close enough" 
// for tesselation, intersection, and more
verb.TOLERANCE = 1e-6;

// ####init()
//
// Start a default Engine
//
verb.init = function() {
	verb.nurbsEngine = new verb.core.Engine( verb.eval );
	verb.NurbsGeometry.prototype.nurbsEngine = verb.nurbsEngine;
}

// ####Douglas Crockford's "method"
//
Function.prototype.method = function (name, func) {
    this.prototype[name] = func;
    return this;
};

// ####Douglas Crockford's "inherits"
//
Function.method('inherits', function (parent) {
    this.prototype = new parent();
    var d = {}, 
        p = this.prototype;
    this.prototype.constructor = parent; 
    return this;
});

// ####Array.flatten()
//
// Collapse a multidimensional arrays to a 1d
//
Array.prototype.flatten = function(){

	if (this.length == 0) return [];

	var merged = [];

	for (var i = 0; i < this.length; i++){
		if (this[i] instanceof Array){
			merged = merged.concat( this[i].flatten() );
		} else {
			merged = merged.concat( this[i] );
		}
	}

	return merged;

}

// ####numeric.normalized( arr )
//
// Extend numeric to obtain the normalized version of an array
//
// **params**
// + *Array*, Array of numbers
//
// **returns**
// + *Array*, The array after normalization

numeric.normalized = function(arr){

	return numeric.div( arr, numeric.norm2(arr) );

}

// ####numeric.cross( u, v )
//
// Extend numeric to form the cross product between two length 3 arrays
//
// **params**
// + *Array*, Length 3 array of numbers
// + *Array*, Length 3 array of numbers
//
// **returns**
// + *Array*, The length 3 array cross product
numeric.cross = function(u, v){

	return [u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]];

}

//
// ####left(arr)
//
// Get the first half of an array including the pivot
//
// **params**
// + *Array*, array of stuff
// 
// **returns** 
// + *Array*, the left half
//

verb.left = function(arr){ 
	if (arr.length === 0) return [];
	var len = Math.ceil( arr.length / 2 ); 
	return arr.slice( 0, len );
}

//
// ####right(arr)
//
// Get the second half of an array, not including the pivot
//
// **params**
// + *Array*, array of stuff
// 
// **returns** 
// + *Array*, the right half
//

verb.right = function(arr){
	if (arr.length === 0) return [];
	var len = Math.ceil( arr.length / 2 );
	return arr.slice( len );
}

//
// ####last(arr)
//
// Get the last element of an array
//
// **params**
// + *Array*, array of stuff
// 
// **returns** 
// + *Something*, the last element of the array
//

verb.last = function(arr){

	if (!arr.length) return undefined;

	return arr[arr.length-1];
}


//
// ####rightWithPivot(arr)
//
// Get the second half of an array including the pivot
//
// **params**
// + *Array*, array of stuff
// 
// **returns** 
// + *Array*, the right half
//

verb.rightWithPivot = function(arr){
	if (arr.length === 0) return [];
	var len = Math.ceil( arr.length / 2 );
	return arr.slice( len-1 );
}

//
// ####unique(arr, comparator)
//
// Obtain the unique set of elements in an array
//
// **params**
// + *Array*, array of stuff
// + *Function*, a function that receives two arguments (two objects from the array).  Returning true indicates
// the objects are equal.  
// 
// **returns** 
// + *Array*, array of unique elements
//

verb.unique = function( arr, comp ){

	if (arr.length === 0) return [];

	var uniques = [ arr.pop() ];

	while (arr.length > 0){

		var ele = arr.pop();
		var isUnique = true;

		for (var j = 0; j < uniques.length; j++ ){
			if ( comp( ele, uniques[j] ) ){
				isUnique = false;
				break;
			}
		}

		if ( isUnique ){
			uniques.push( ele );
		}

	}

	return uniques;

}

//
// ####isZero(vector)
//
// Determine if a vector is of zero length with
// no multiplies and no square roots
//
// **params**
// + *Array*, vector
// 
// **returns** 
// + *Boolean*, range array
//
verb.isZero = function( vec ){

  for (var i = 0, l = vec.length; i < l; i++){
    if (Math.abs( vec[i] ) > verb.TOLERANCE ) return false;
  }

  return true;
} 

//
// ####range(start, stop, step)
//
// Obtain a range of numbers
//
// Borrowed from underscore.js port of the python function
// of the same name
//
// **params**
// + *Number*, start point
// + *Number*, end point 
// + *Number*, step
// 
// **returns** 
// + *Array*, range array
//
verb.range = function(start, stop, step) {
  if (arguments.length <= 1) {
    stop = start || 0;
    start = 0;
  }
  step = arguments[2] || 1;

  var len = Math.max(Math.ceil((stop - start) / step), 0);
  var idx = 0;
  var range = new Array(len);

  while(idx < len) {
    range[idx++] = start;
    start += step;
  }

  return range;
};

 /**
 * AUTHOR OF INITIAL JS LIBRARY
 * k-d Tree JavaScript - V 1.0
 *
 * https://github.com/ubilabs/kd-tree-javascript
 *
 * @author Mircea Pricop <pricop@ubilabs.net>, 2012
 * @author Martin Kleppe <kleppe@ubilabs.net>, 2012
 * @author Ubilabs http://ubilabs.net, 2012
 * @license MIT License <http://www.opensource.org/licenses/mit-license.php>
 */


function Node(obj, dimension, parent) {
  this.obj = obj;
  this.left = null;
  this.right = null;
  this.parent = parent;
  this.dimension = dimension;
}

function KdTree(points, metric, dimensions) {

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

