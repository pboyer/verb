package verb.core;

import verb.core.Data;

//A Haxe port of:
//
//k-d Tree JavaScript - V 1.0
//
//https://github.com/ubilabs/kd-tree-javascript
//
//@author Mircea Pricop <pricop@ubilabs.net>, 2012
//@author Martin Kleppe <kleppe@ubilabs.net>, 2012
//@author Ubilabs http://ubilabs.net, 2012
//@license MIT License <http://www.opensource.org/licenses/mit-license.php>

@:expose("core.KdTree")
class KdTree<T> {

    private var points : Array<KdPoint<T>>;
    private var distanceFunction : Point -> Point -> Float;
    private var dim : Int = 3;
    private var root : KdNode<T>;

    public function new(points, distanceFunction) {
        this.points = points;
        this.distanceFunction = distanceFunction;
        this.dim = points[0].point.length;

        this.root = buildTree(points, 0, null);
    }

    private function buildTree(points : Array<KdPoint<T>>, depth : Int, parent : KdNode<T>) : KdNode<T> {
        var dim = depth % dim,
            median,
            node;

        if (points.length == 0) return null;
        if (points.length == 1) return new KdNode<T>(points[0], dim, parent);

        points.sort(function(a : KdPoint<T>, b : KdPoint<T>) {
            var diff = a.point[dim] - b.point[dim];
            if (diff == 0.0){
                return 0;
            } else if (diff > 0) {
                return 1;
            } else {
                return -1;
            }
        });

        median = Math.floor(points.length / 2);

        node = new KdNode(points[median], dim, parent);

        node.left = buildTree( points.slice(0, median), depth + 1, node);
        node.right = buildTree( points.slice(median + 1), depth + 1, node);

        return node;
    }

    public function nearest(point : Point, maxNodes : Int, maxDistance : Float ) : Array<Pair<KdPoint<T>, Float>> {

        var bestNodes = new BinaryHeap<KdNode<T>>(
            function (e : Pair<KdNode<T>, Float>) { return -e.item1; }
        );

        function nearestSearch(node : KdNode<T>) {

            var bestChild,
                dimension = node.dimension,
                ownDistance = distanceFunction( point, node.kdPoint.point ),
                linearPoint = [for (i in 0...dim) 0.0],
                linearDistance,
                otherChild,
                i;

            function saveNode(node : KdNode<T>, distance : Float) : Void {
                bestNodes.push(new Pair(node, distance));
                if (bestNodes.size() > maxNodes) {
                    bestNodes.pop();
                }
            }

            for (i in 0...dim){
                if (i == node.dimension) {
                    linearPoint[i] = point[i];
                } else {
                    linearPoint[i] = node.kdPoint.point[i];
                }
            }

            linearDistance = distanceFunction( linearPoint, node.kdPoint.point );

            if (node.right == null && node.left == null) {
                if (bestNodes.size() < maxNodes || ownDistance < bestNodes.peek().item1) {
                    saveNode(node, ownDistance);
                }
                return;
            }

            if (node.right == null) {
                bestChild = node.left;
            } else if (node.left == null) {
                bestChild = node.right;
            } else {
                if (point[dimension] < node.kdPoint.point[dimension]) {
                    bestChild = node.left;
                } else {
                    bestChild = node.right;
                }
            }

            nearestSearch( bestChild );

            if (bestNodes.size() < maxNodes || ownDistance < bestNodes.peek().item1) {
                saveNode(node, ownDistance);
            }

            if (bestNodes.size() < maxNodes || Math.abs(linearDistance) < bestNodes.peek().item1) {
                if (bestChild == node.left) {
                    otherChild = node.right;
                } else {
                    otherChild = node.left;
                }
                if (otherChild != null) {
                    nearestSearch(otherChild);
                }
            }
        }

        for (i in 0...maxNodes){
            bestNodes.push(new Pair<KdNode<T>, Float>(null, maxDistance));
        }

        nearestSearch( this.root );

        var result = [];

        for (i in 0...maxNodes){
            if (bestNodes.content[i].item0 != null) {
                result.push(new Pair<KdPoint<T>, Float>(bestNodes.content[i].item0.kdPoint, bestNodes.content[i].item1));
            }
        }

        return result;
    }
}

//Binary heap implementation from:
//http://eloquentjavascript.net/appendix2.html

class BinaryHeap<T> {

    public var content : Array<Pair<T, Float>>;
    private var scoreFunction : Pair<T, Float> -> Float;

    public function new(scoreFunction){
        this.content = [];
        this.scoreFunction = scoreFunction;
    }

    public function push(element : Pair<T, Float>) : Void {
        //Add the new element to the end of the array.
        this.content.push(element);
        //Allow it to bubble up.
        this.bubbleUp(this.content.length - 1);
    }

    public function pop() : Pair<T, Float> {
        //Store the first element so we can return it later.
        var result = this.content[0];
        //Get the element at the end of the array.
        var end = this.content.pop();
        //If there are any elements left, put the end element at the
        //start, and let it sink down.
        if (this.content.length > 0) {
            this.content[0] = end;
            this.sinkDown(0);
        }
        return result;
    }

    public function peek() : Pair<T, Float> {
        return this.content[0];
    }

    public function remove(node : Pair<T, Float>) : Void {
        var len = this.content.length;
        //To remove a value, we must search through the array to find
        //it.
        for (i in 0...len){
            if (this.content[i] == node) {
                //When it is found, the process seen in 'pop' is repeated
                //to fill up the hole.
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
        throw "Node not found.";
    }

    public function size() : Int {
        return this.content.length;
    }

    private function bubbleUp(n : Int) : Void {
        //Fetch the element that has to be moved.
        var element = this.content[n];
        //When at 0, an element can not go up any further.
        while (n > 0) {
            //Compute the parent element's index, and fetch it.
            var parentN = Math.floor((n + 1.0) / 2) - 1,
            parent = this.content[parentN];
            //Swap the elements if the parent is greater.
            if (this.scoreFunction(element) < this.scoreFunction(parent)) {
                this.content[parentN] = element;
                this.content[n] = parent;
                //Update 'n' to continue at the new position.
                n = parentN;
            }
            //Found a parent that is less, no need to move it further.
            else {
                break;
            }
        }
    }

    private function sinkDown(n : Int) : Void {
        //Look up the target element and its score.
        var length = this.content.length,
        element = this.content[n],
        elemScore = this.scoreFunction(element);

        while(true) {
            //Compute the indices of the child elements.
            var child2N = (n + 1) * 2;
            var child1N = child2N - 1;
            //This is used to store the new position of the element,
            //if any.
            var swap = -1;
            var child1Score : Float = 0.0;

            //If the first child exists (is inside the array)...
            if (child1N < length) {
                //Look it up and compute its score.
                var child1 = this.content[child1N];
                child1Score = this.scoreFunction(child1);
                //If the score is less than our element's, we need to swap.
                if (child1Score < elemScore)
                    swap = child1N;
            }
            //Do the same checks for the other child.
            if (child2N < length) {
                var child2 = this.content[child2N];
                var child2Score = this.scoreFunction(child2);
                if (child2Score < (swap == -1 ? elemScore : child1Score)){
                    swap = child2N;
                }
            }

            //If the element needs to be moved, swap it, and continue.
            if (swap != -1) {
                this.content[n] = this.content[swap];
                this.content[swap] = element;
                n = swap;
            }
            //Otherwise, we are done.
            else {
                break;
            }
        }
    }
}

// A point in a KdTree
@:expose("core.KdPoint")
class KdPoint<T> {

    // The point
    public var point : Point;

    // An arbitrary object to attach
    public var obj : T;

    public function new(point, obj){
        this.point = point;
        this.obj = obj;
    }
}

// A node in a KdTree
@:expose("core.KdNode")
class KdNode<T> {

    // The point itself
    public var kdPoint : KdPoint<T>;

    // The left child
    public var left : KdNode<T>;

    // The right child
    public var right : KdNode<T>;

    // The parent of the node
    public var parent : KdNode<T>;

    // The dimensionality of the point
    public var dimension : Int;

    public function new(kdPoint : KdPoint<T>, dimension : Int, parent : KdNode<T>) {
        this.kdPoint = kdPoint;
        this.left = null;
        this.right = null;
        this.parent = parent;
        this.dimension = dimension;
    }
}
