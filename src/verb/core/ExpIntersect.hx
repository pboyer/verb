package verb.core;

// experimental surface intersection work

class ExpIntersect {
    public function new() {
    }
}

// developing the del phi field

    // subdivide two surfaces and intersect via recursive aabb intersection
    //  - this allows us to omit non-intersecting subpatches
    // get closest pt for each

    // dot prod this vector with surface partial derivs to get del phi (pg 45 first paragraph)

// approximating critical pts in field

    // iterate through the rectangles formed by 4 points in the initial subdivision
    // we determine the approximate rotation number in each area by sampling del phi vectors and determining their rotation
    // see second paragraph pg 45

// do minimization to determine minima

/*

Great starting point:
http://www.cs.berkeley.edu/~hling/research/paper/intersection.htm


Notes from: Topological and differential-equation methods for surface intersections

phi - the oriented distance function can be constructed between q(s,t) and a point on another surface r(u,v)
* phi(u,v) = nq[ Q( r(u,v) ) ]  . [r(u,v) - q(Q(r(u,v)))]
* phi is the dot product of the normal of r at the closest point to r
* q(Q(r(u,v))) is unique nearest point to r(u,v) on q
* n2[ Q( r(u,v) ) ] is the unit normal at this closest point on q
* it describes the minimum distance from one surface to the other
* parameterized over uv over r

the intersection curve is the level set of the implicit eq phi(u,v) = 0

the gradient of the distance field (with respect to u,v) can be constructed easily, there is only one term that depends explicitly on u, v

* grad phi = [  nq[ Q( r(u,v) ) ] . ru(u,v),  nq[ Q( r(u,v) ) ] . rv(u,v) ]
* when grad phi /= 0, this is orthogonal to the level curves


we need to discover the significant points

* boundary pts - points on the edge of the parametric domains where phi = 0
* critical points - the local extremum of phi where del phi = 0, i.e. local minima/maxima of phi

boundary pts are easy - just intersect a curve and surface

discovering critical points /= easy

the rotation number (W(V, c))
* the number of rotations of V when traversing c, a closed curve through V
* V may not be 0 on the curve

if the rotation number is nonzero, there must be a critical point within the closed curve!

how to approximate critical points

1) approximate del phi
    i) subdivide the surface
    ii) approximate del phi by n^2 comparison of control pts (aabb's help quick reject)
    iii) these vectors are the approximations, applied at the "nodes"
2) by constructing many loops, we can determine the "rotation number"
	* the rotation number tells us the

*/