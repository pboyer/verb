//@auther : FishOrBear
//@git : https://github.com/FishOrBear/verb

export declare module core
{

    /**
    * Haxe port of
    * 
    * -d Tree JavaScript - V 1.
    * 
    * ttps://github.com/ubilabs/kd-tree-javascrip
    * 
    * author Mircea Pricop <pricop@ubilabs.net>, 201
    * author Martin Kleppe <kleppe@ubilabs.net>, 201
    * author Ubilabs http://ubilabs.net, 201
    * license MIT License <http://www.opensource.org/licenses/mit-license.php
    */
    class KdTree<T> {

        constructor(points: any, distanceFunction: any);

        dim: any;

        diff: any;
        nearest(point: Data.Point, maxNodes: number, maxDistance: number): Array<Data.Pair<KdPoint<T>, number>>;

        bestNodes: any;

        nearestSearch(node: KdNode<T>): any;

        saveNode(node: KdNode<T>, distance: number): void;

    }    


    //Binary heap implementation from:
    //http://eloquentjavascript.net/appendix2.html

    class BinaryHeap<T> {

        public content: Array<Data.Pair<T, number>>;
        constructor(scoreFunction);
        push(element: Data.Pair<T, number>): void;
        pop(): Data.Pair<T, number>;
        peek(): Data.Pair<T, number>;
        remove(node: Data.Pair<T, number>): void
    }

    // A point in a KdTree
    class KdPoint<T> {

        // The point
        public point: Data.Point;

        // An arbitrary object to attach
        public obj: T;
        constructor(point, obj);
    }

    // A node in a KdTree
    class KdNode<T> {

        // The point itself
        public kdPoint: KdPoint<T>;

        // The left child
        public left: KdNode<T>;

        // The right child
        public right: KdNode<T>;

        // The parent of the node
        public parent: KdNode<T>;

        // The dimensionality of the point

        public dimension: number;//Int

        constructor(kdPoint: KdPoint<T>, dimension: number, parent: KdNode<T>);
    }



    /**
    * `BoundingBox` is an n-dimensional bounding box implementation. It is used by many of verb's intersection algorithms
    * 
    * The first point added to the `BoundingBox` using `BoundingBox.add` will be used to define the dimensionality of th
    * bounding box
    */
    class BoundingBox
    {

        initialized: boolean;

        dim: number;

        /**
         * oundingBox Constructo
         * 
         * params*
         * 
         * Points to add, if desired.  Otherwise, will not be initialized until add is called
         */
        constructor(pts?: Array<Data.Point>);

        min: Data.Point;

        /**
         * The minimum point of the BoundingBox - the coordinates of this point are always <= max
         */
        max: Data.Point;

        /**
         * The maximum point of the BoundingBox. The coordinates of this point are always >= min
         * reate a bounding box initialized with a single elemen
         * 
         * params*
         * 
         * A array of number
         * 
         * returns*
         * 
         * This BoundingBox for chainin
         */
        fromPoint(pt: any): any;

        /**
         * dds a point to the bounding box, expanding the bounding box if the point is outside of it
         * f the bounding box is not initialized, this method has that side effect
         * 
         * params*
         * 
         * A length-n array of number
         * 
         * returns*
         * 
         * This BoundingBox for chainin
         */
        add(point: Data.Point): BoundingBox;

    }

    class AdaptiveRefinementOptions {
        normTol : number;
        minDepth : number;
        maxDepth : number;
        refine : boolean;
        minDivsU : number;
        minDivsV : number;
    
        new();
    
    }

    class SurfacePoint {

        uv : core.Data.UV;
        point : core.Data.Point;
        normal : core.Data.Point;
        id : number;
        degen : boolean;
    
        new(point : core.Data.Point, normal : core.Data.Point, uv : core.Data.UV, id : number, degen : boolean);
    
        static  fromUv(u: number,v: number);
    }

    class AdaptiveRefinementNode {

        srf : core.Data.NurbsSurfaceData;
        neighbors : Array<AdaptiveRefinementNode>;
        children : Array<AdaptiveRefinementNode>;
        corners : Array<SurfacePoint>;
        midPoints : Array<SurfacePoint>;
        centerPoint : SurfacePoint;
        splitVert : boolean;
        splitHoriz : boolean;
        horizontal : boolean;
        u05 : number;
        v05 : number;
    
        new( srf : core.Data.NurbsSurfaceData, corners : Array<SurfacePoint>, neighbors : Array<AdaptiveRefinementNode> );

        isLeaf();

        center();

        evalCorners();

        evalSrf( u : number, v : number, srfPt : SurfacePoint ) : SurfacePoint;

        getEdgeCorners( edgeIndex : number ) : Array<SurfacePoint>;

        getAllCorners( edgeIndex : number ) : Array<SurfacePoint>;

        midpoint( index : number );

        hasBadNormals() : boolean;

        fixNormals() : void;

        shouldDivide( options : AdaptiveRefinementOptions, currentDepth : number );

        divide( options : AdaptiveRefinementOptions ) : void;

        triangulate( mesh : core.Data.MeshData ) : core.Data.MeshData;

        triangulateLeaf( mesh : core.Data.MeshData ) : core.Data.MeshData;

    }

    /**
     * Tools for working with matrice
     */
    class Mat {

        /**
         * Multiply a `Matrix` by a constan
         */
        static mul(a:number, b:Data.Matrix): Data.Matrix;

        /**
         * Multiply two matrices assuming they are of compatible dimensions
         * 
         * Based on the numeric.js routine - `numeric.dotMMsmall
         */
        static mult(x:Data.Matrix, y:Data.Matrix): Data.Matrix;

        /**
         * Add two matrice
         */
        static add(a:Data.Matrix, b:Data.Matrix): Data.Matrix;

        /**
         * Divide each of entry of a Matrix by a constan
         */
        static div(a:Data.Matrix, b:number): Data.Matrix;

        /**
         * Subtract two matrice
         */
        static sub(a:Data.Matrix, b:Data.Matrix): Data.Matrix;

        /**
         * Multiply a `Matrix` by a `Vector
         */
        static dot(a:Data.Matrix, b:Data.Vector): Data.Vector;

        /**
         * Build an identity matrix of a given siz
         */
        static identity(n:number): Data.Matrix;

        /**
         * Transpose a matri
         */
        static transpose<T>(a:Array<Array<T>>): Array<Array<T>>;

        /**
         * Solve a system of equation
         */
        static solve(a:Data.Matrix, b:Data.Vector): Data.Vector;

    }

     /**
     * Tools for working with matrice
     */
    class Vec {

        static angleBetween(a:Array<number>, b:Array<number>): number;

        static positiveAngleBetween(a:Array<number>, b:Array<number>, n:Array<number>): number;


        static signedAngleBetween(a:Array<number>, b:Array<number>, n:Array<number>): number;

        static angleBetweenNormalized2d(a:Array<number>, b:Array<number>): number;


        static domain(a:Array<number>): number;

        static range(max:number): Array<number>;


        static span(min:number, max:number, step:number): Array<number>;

    }


     /**
     * `Mesh` provides various convenience methods for working with meshes
     */
    class Mesh {

        /**
         * et triangle norma
         * 
         * params*
         * 
         * array of length 3 arrays of numbers representing the point
         * length 3 array of point indices for the triangl
         * 
         * returns*
         * 
         * a normal vector represented by an array of length
         * 
         */
        static getTriangleNorm(points:Array<Data.Point>, tri:Data.Tri): Data.Point;

        /**
         * orm axis-aligned bounding box from triangles of mes
         * 
         * params*
         * 
         * a mes
         * face indices of the mesh to include in the bounding bo
         * 
         * returns*
         * 
         * a BoundingBox containing the mes
         * 
         */
        static makeMeshAabb(mesh:Data.MeshData, faceIndices:Array<number>): BoundingBox;

        /**
         * ort particular faces of a mesh on the longest axi
         * 
         * params*
         * 
         * bounding box containing the face
         * the mesh it sel
         * the indices of the mesh faces to inspec
         * 
         * returns*
         * 
         * a point represented by an array of length (dim
         * 
         */
        static sortTrianglesOnLongestAxis(bb:BoundingBox, mesh:Data.MeshData, faceIndices:Array<number>): Array<number>;
    }

    class Minimizer {

        static uncmin(f:(Vector)=>number, x0:Data.Vector, tol?:number, gradient?:(Vector)=>Data.Vector, maxit?:number): Minimizer.MinimizationResult;

    }

    module Minimizer {

        /**
         * ine searc
         */
        class MinimizationResult {

            solution: Data.Vector;

            value: number;

            gradient: Data.Vector;

            invHessian: Data.Matrix;

            iterations: number;

            message: string;

            constructor(solution:any, value:any, gradient:any, invHessian:any, iterations:any, message:any);

        }

    }

    class Trig {

        static isPointInPlane(pt:Data.Point, p:Data.Plane, tol:number): boolean;

    }

    module Intersections
    {

        class CurveCurveIntersection
        {

            point0: Data.Point;

            /**
             * here the intersection took plac
             */
            point1: Data.Point;

            /**
             * here the intersection took place on the second curv
             */
            u0: number;

            /**
             * he parameter on the first curv
             */
            u1: number;

            /**
             * he parameter on the second curv
             */
            constructor(point0: any, point1: any, u0: any, u1: any);

        }

        class CurveSurfaceIntersection
        {

            u: number;

            uv: Data.UV;

            curvePoint: Data.Point;

            surfacePoint: Data.Point;

            constructor(u: any, uv: any, curvePoint: any, surfacePoint: any);

        }

        class MeshIntersectionPoint
        {

            uv0: Data.UV;

            uv1: Data.UV;

            point: Data.Point;

            faceIndex0: number;

            faceIndex1: number;

            opp: MeshIntersectionPoint;

            /**
             * ags to navigate a segment structur
             */
            adj: MeshIntersectionPoint;

            visited: boolean;

            constructor(uv0: any, uv1: any, point: any, faceIndex0: any, faceIndex1: any);

        }

        class PolylineMeshIntersection
        {

            point: Data.Point;

            u: number;

            uv: Data.UV;

            polylineIndex: number;

            faceIndex: number;

            constructor(point: any, u: any, uv: any, polylineIndex: any, faceIndex: any);

        }

        class SurfaceSurfaceIntersectionPoint
        {

            uv0: Data.UV;

            uv1: Data.UV;

            point: Data.Point;

            dist: number;

            constructor(uv0: any, uv1: any, point: any, dist: any);

        }

        class TriSegmentIntersection
        {

            point: Data.Point;

            /**
             * here the intersection took plac
             */
            s: number;

            /**
             * he u param where u is the axis from v0 to v
             */
            t: number;

            /**
             * he v param where v is the axis from v0 to v
             */
            p: number;

            /**
             * he parameter along the segmen
             */
            constructor(point: any, s: any, t: any, r: any);

        }

        class CurveTriPoint
        {

            u: number;

            uv: Data.UV;

            point: Data.Point;

            constructor(u: number, point: Data.Point, uv: Data.UV);

        }

        class SurfacePoint
        {

            uv: Data.UV;

            point: Data.Point;

            normal: Data.Point;

            id: number;

            degen: boolean;

            constructor(point: Data.Point, normal: Data.Point, uv: Data.UV, id?: number, degen?: boolean);

            static fromUv(u: any, v: any): any;

        }

        class CurvePoint
        {

            u: number;

            pt: Data.Point;

            constructor(u: any, pt: any);

        }

    }

    //src/verb/core/Serialization.hx
    module Serialization
    {
        /**
                 * An interface describing a type that can be serialized as
                 * string. Use verb.core.Deserializer to construct an instance of th
                 * the type from the resultant string. The string is the serialized representation of a hax
                 * object and is strongly typed. For details, se
                 * [http://haxe.org/manual/std-serialization.html](http://haxe.org/manual/std-serialization.html) for details
                 */
        interface ISerializable
        {
            serialize(): string;
        }

        /**
         * Forms a base class for serializable data type
         */
        class SerializableBase
        {
            serialize(): string;
            serializer: any;
        }

        /**
         * Deserializes strings for types implementing ISerializabl
         */
        class Deserializer
        {

            /**
             * onstruct an ISerializable from its string representation, given a parameter T. You ca
             * se this to deserialize almost any type in verb.geom or verb.core.*Data types
             * 
             * params*
             * 
             * A string representing something implementing ISerializabl
             * 
             * returns*
             * 
             * A new T from the strin
             */
            static deserialize<T>(s: string): T;

            unserializer: any;
        }

    }

    module Data
    {

        /**
         * A `Point` in verb is represented simply by an array of floating point numbers
         * 
         * So, in JavaScript, one would write simply `[0,0,0]` to create a Point at the origin
         */
        type Point = Array<number>;
        type Vector = Array<number>;
        type Matrix = Array<Array<number>>

        /**
         * Like a `Point`, a `Vector` is simply an array of floating point number
         * 
         * So, in JavaScript, one would write simply `[1,0,0]` to create the a unit vector in the x directio
         * `Matrix` is represented by a nested array of floating point number array
         * 
         * So, in JavaScript, one would write simply `[[1,0],[0,1]]` to create a 2x2 identity matri
         * A `KnotArray` is a non-decreasing sequence of floating point . Use the methods in `Check` to validate `KnotArray`'
         */
        interface KnotArray extends Array<number> { }

        /**
         * A `Plane` is simply an origin point and norma
         */

        class Plane extends Serialization.SerializableBase
        {

            normal: Vector;

            origin: Point;

            constructor(origin: any, normal: any);

        }

        /**
         * A `Ray` is simply an origin point and a directio
         */
        class Ray extends Serialization.SerializableBase
        {

            dir: Vector;

            origin: Point;

            constructor(origin: any, dir: any);

        }

        /**
         * A simple data structure representing a NURBS curve. `NurbsCurveData` does no checks for legality. You can us
         * `verb.eval.Check` for that
         */
        class NurbsCurveData extends Serialization.SerializableBase
        {

            constructor(degree: any, knots: any, controlPoints: any);

            degree: number;

            /**
             * nteger degree of curv
             */
            controlPoints: Array<Point>;

            /**
             * 2d array of control points, where each control point is an array of length (dim
             */
            knots: Array<number>;

        }

        /**
         * rray of nondecreasing knot value
         * A simple data structure representing a NURBS surface. `NurbsSurfaceData` does no checks for legality. You can us
         * `verb.eval.Check` for that
         */
        class NurbsSurfaceData extends Serialization.SerializableBase
        {

            constructor(degreeU: any, degreeV: any, knotsU: any, knotsV: any, controlPoints: any);

            degreeU: number;

            /**
             * nteger degree of surface in u directio
             */
            degreeV: number;

            /**
             * nteger degree of surface in v directio
             */
            knotsU: KnotArray;

            /**
             * rray of nondecreasing knot values in u directio
             */
            knotsV: KnotArray;

            /**
             * rray of nondecreasing knot values in v directio
             */
            controlPoints: Array<Array<Point>>;

        }

        /**
         * 2d array of control points, the vertical direction (u) increases from top to bottom, the v direction from left to right
         * nd where each control point is an array of length (dim
         * A triangular face of a mes
         */
        interface Tri extends Array<number> { }

        /**
         * A `UV` is simply an array of floating point numbers
         * 
         * So, in JavaScript, one would write simply `[1,0]` to create a U
         */
        interface UV extends Array<number> { }

        /**
         * A simple data structure representing a mesh. `MeshData` does not check for legality
         */
        class MeshData extends Serialization.SerializableBase
        {

            faces: Array<Tri>;

            points: Array<Point>;

            normals: Array<Point>;

            uvs: Array<UV>;

            constructor(faces: Array<Tri>, points: Array<Point>, normals: Array<Point>, uvs: Array<UV>);

            static empty(): MeshData;

        }

        /**
         * A simple data structure representing a polyline. `PolylineData` is useful, for example, as the result of a curve tessellation
         */
        class PolylineData extends Serialization.SerializableBase
        {

            points: Array<Point>;

            /**
             * The points in the polylin
             */
            params: Array<number>;

            /**
             * The parameters of the individual point
             */
            constructor(points: any, params: any);

        }

        /**
         * A simple data structure representing a NURBS volume. This data structure is largely experimental in intent. Like CurveDat
         * and SurfaceData, this data structure does no legality checks
         */
        class VolumeData extends Serialization.SerializableBase
        {

            constructor(degreeU: any, degreeV: any, degreeW: any, knotsU: any, knotsV: any, knotsW: any, controlPoints: any);

            degreeU: number;

            /**
             * nteger degree in u directio
             */
            degreeV: number;

            /**
             * nteger degree in v directio
             */
            degreeW: number;

            /**
             * nteger degree in w directio
             */
            knotsU: KnotArray;

            /**
             * rray of nondecreasing knot values in u directio
             */
            knotsV: KnotArray;

            /**
             * rray of nondecreasing knot values in v directio
             */
            knotsW: KnotArray;

            /**
             * rray of nondecreasing knot values in w directio
             */
            controlPoints: Array<Array<Array<Point>>>;

        }

        /**
         * 3d array of control points, where rows are the u dir, and columns run along the positive v direction
         * nd where each control point is an array of length (dim
         * A simple parametric data type representing a pair of two object
         */
        class Pair<T1, T2> {

            item0: T1;

            item1: T2;

            constructor(item1: T1, item2: T2);

        }

        /**
         * A simple parametric data type representing an "interval" between two numbers. This data structure does no legality checks
         */
        class Interval<T> {

            min: T;

            max: T;

            constructor(min: any, max: any);

        }

    }

    /**
     * `Constants` contains a collection of default constants used throughout the library. These can be set to adjust verb'
     * defaults
     */
    //src/verb/core/Constants.hx
    class Constants
    {

        /**
         * he default euclidean distance that identifies whether two points are coinciden
         */
        static TOLERANCE: number;

        /**
         * he minimum value to determine whether two floating point numbers are the sam
         */
        static EPSILON: number;

        /**
         * he current version of ver
         */
        static VERSION: string;

    }
    /**
     * A simple data structure representing a polyline. `PolylineData` is useful, for example, as the result of a curve tessellation
     */
    //src/verb/core/Data.hx
    class PolylineData extends Serialization.SerializableBase
    {

        points: Array<Data.Point>;

        /**
         * The points in the polylin
         */
        params: Array<number>;

        /**
         * The parameters of the individual point
         */
        constructor(points: Array<Data.Point>, params: Array<number>);

    }
}

export declare module geom
{
    /**
     * A class providing simplified access to verb's intersection tools. Intersect contains only static methods
     * 
     * Similar to `NurbsCurve` and `NurbsSurface`, `Intersect` provides asynchronous versions of all of its methods
     */
    export class Intersect
    {

        /**
         * etermine the intersection of two curve
         * 
         * params*
         * 
         * ICurve objec
         * ICurve objec
         * tolerance for the intersectio
         * 
         * returns*
         * 
         * a possibly empty array of CurveCurveIntersection object
         */
        static curves(first: ICurve, second: ICurve, tol?: number): Array<core.Intersections.CurveCurveIntersection>;

        /**
         * The async version of `curves
         */
        static curvesAsync(first: ICurve, second: ICurve, tol?: number): Promise<Array<core.Intersections.CurveCurveIntersection>>;

        /**
         * etermine the intersection of a curve and a surfac
         * 
         * params*
         * 
         * ICurv
         * ISurfac
         * tolerance for the curve intersectio
         * 
         * returns*
         * 
         * array of CurveSurfaceIntersection object
         */
        static curveAndSurface(curve: ICurve, surface: ISurface, tol?: number): Array<core.Intersections.CurveSurfaceIntersection>;

        /**
         * The async version of `curveAndSurface
         */
        static curveAndSurfaceAsync(curve: ICurve, surface: ISurface, tol?: number): Promise<Array<core.Intersections.CurveSurfaceIntersection>>;

        /**
         * etermine the intersection of two surface
         * 
         * params*
         * 
         * ISurfac
         * ISurfac
         * 
         * returns*
         * 
         * array of NurbsCurveData object
         */
        static surfaces(first: ISurface, second: ISurface, tol?: number): Array<NurbsCurve>;

        /**
         * The async version of `surfaces
         */
        static surfacesAsync(first: ISurface, second: ISurface, tol?: number): Promise<Array<NurbsCurve>>;

    }

    /**
    * n interface representing a Curv
    */

    export interface ICurve extends core.Serialization.ISerializable
    {

        /**
         * rovide the NURBS representation of the curv
         * 
         * returns*
         * 
         * A NurbsCurveData object representing the curv
         */

        asNurbs(): core.Data.NurbsCurveData;

        /**
         * btain the parametric domain of the curv
         * 
         * returns*
         * 
         * An Interval object containing the min and max of the domai
         */
        domain(): core.Data.Interval<number>;

        /**
         * valuate a point on the curv
         * 
         * params*
         * 
         * The parameter on the curv
         * 
         * returns*
         * 
         * The evaluated poin
         */
        point(u: number): core.Data.Point;

        /**
         * valuate the derivatives at a point on a curv
         * 
         * params*
         * 
         * The parameter on the curv
         * The number of derivatives to evaluate on the curv
         * 
         * returns*
         * 
         * An array of derivative vector
         */


        derivatives(u: number, numDerivs?: number): Array<core.Data.Vector>;

    }


    /**
    * An interface representing a Surfac
    */
    export interface ISurface extends core.Serialization.ISerializable
    {

        /**
         * rovide the NURBS representation of the curv
         * 
         * returns*
         * 
         * A NurbsCurveData object representing the curv
         */
        asNurbs(): core.Data.NurbsSurfaceData;

        /**
         * rovide the domain of the surface in the U directio
         * 
         * returns*
         * 
         * An interval object with min and max propertie
         */
        domainU(): core.Data.Interval<number>;

        /**
         * rovide the domain of the surface in the V directio
         * 
         * returns*
         * 
         * An interval object with min and max propertie
         */
        domainV(): core.Data.Interval<number>;

        /**
         * btain a point on the surface at the given paramete
         * 
         * params*
         * 
         * The u paramete
         * The v paramete
         * 
         * returns*
         * 
         * A point on the surfac
         */
        point(u: number, v: number): core.Data.Point;

        /**
         * btain the derivatives of the NurbsSurface.  Returns a two dimensional arra
         * ontaining the derivative vectors.  Increasing U partial derivatives are increasin
         * ow-wise.  Increasing V partial derivatives are increasing column-wise.  Therefore
         * he [0][0] position is a point on the surface, [n][0] is the nth V partial derivative
         * he [1][1] position is twist vector or mixed partial derivative Puv
         * 
         * params*
         * 
         * The u paramete
         * The v paramete
         * Number of derivatives to evaluat
         * 
         * returns*
         * 
         * A two dimensional array of vector
         */
        derivatives(u: number, v: number, numDerivs?: number): Array<Array<core.Data.Vector>>;

    }

    /**
     * A NURBS surface - this class represents the base class of many of verb's surface types and provides many tools for analysis and evaluation
     * This object is deliberately constrained to be immutable. The methods to inspect the properties of this class deliberately return copies. `asNurbs` ca
     * be used to obtain a simplified NurbsCurveData object that can be used with `verb.core` or for serialization purposes
     * 
     * Under the hood, this type takes advantage of verb's asynchronous runtime using the _Async methods. Calling one of thes
     * methods returns a `Promise` that respect the  You can find further documentation for this type a
     * [https://github.com/jdonaldson/promhx](https://github.com/jdonaldson/promhx)
     */
    export class NurbsSurface extends core.Serialization.SerializableBase implements ISurface {

        /**
         * onstruct a NurbsSurface by a NurbsSurfaceData objec
         * 
         * params*
         * 
         * The data objec
         * 
         * returns*
         * 
         * A new NurbsSurfac
         */
        constructor(data:core.Data.NurbsSurfaceData);

        /**
         * onstruct a NurbsSurface by degree, knots, control points, weight
         * 
         * params*
         * 
         * The degree in the U directio
         * The degree in the V directio
         * The knot array in the U directio
         * The knot array in the V directio
         * Two dimensional array of point
         * Two dimensional array of weight value
         * 
         * returns*
         * 
         * A new NurbsSurfac
         */
        static byKnotsControlPointsWeights(degreeU:number, degreeV:number, knotsU:core.Data.KnotArray, knotsV:core.Data.KnotArray, controlPoints:Array<Array<core.Data.Point>>, weights?:Array<Array<number>>): NurbsSurface;

        /**
         * onstruct a NurbsSurface from four perimeter points in counter-clockwise orde
         * 
         * params*
         * 
         * The first poin
         * The second poin
         * The third poin
         * The fourth poin
         * 
         * returns*
         * 
         * A new NurbsSurfac
         */
        static byCorners(point0:core.Data.Point, point1:core.Data.Point, point2:core.Data.Point, point3:core.Data.Point): NurbsSurface;

        /**
         * onstruct a NurbsSurface by lofting between a collection of curve
         * 
         * params*
         * 
         * A collection of curve
         * 
         * returns*
         * 
         * A new NurbsSurfac
         */
        static byLoftingCurves(curves:Array<ICurve>, degreeV?:number): NurbsSurface;

        /**
         * he degree in the U directio
         */
        degreeU(): number;

        /**
         * he degree in the V directio
         */
        degreeV(): number;

        /**
         * he knot array in the U directio
         */
        knotsU(): Array<number>;

        /**
         * he knot array in the V directio
         */
        knotsV(): Array<number>;

        /**
         * wo dimensional array of point
         */
        controlPoints(): Array<Array<core.Data.Point>>;

        /**
         * wo dimensional array of weight value
         */
        weights(): Array<core.Data.Point>;

        /**
         * btain a copy of the underlying data structure for the Surface. Used with verb.core
         * 
         * returns*
         * 
         * A new NurbsSurfaceData objec
         */
        asNurbs(): core.Data.NurbsSurfaceData;

        /**
         * btain a copy of the Surfac
         * 
         * returns*
         * 
         * A new NurbsSurfac
         */
        clone(): NurbsSurface;

        /**
         * he parametric domain in the U directio
         * 
         * returns*
         * 
         * An Interval object with min and max propert
         */
        domainU(): core.Data.Interval<number>;

        /**
         * he parametric domain in the V directio
         * 
         * returns*
         * 
         * An Interval object with min and max propert
         */
        domainV(): core.Data.Interval<number>;

        /**
         * btain a point on the surface at the given paramete
         * 
         * params*
         * 
         * The u paramete
         * The v paramete
         * 
         * returns*
         * 
         * A point on the surfac
         */
        point(u:number, v:number): core.Data.Point;

        /**
         * he async version of `point
         */
        pointAsync(u:number, v:number): Promise<core.Data.Point>;

        /**
         * btain the normal to the surface at the given paramete
         * 
         * params*
         * 
         * The u paramete
         * The v paramete
         * 
         * returns*
         * 
         * A normalized vector normal to the surfac
         */
        normal(u:number, v:number): core.Data.Point;

        /**
         * he async version of `normal
         */
        normalAsync(u:number, v:number): Promise<Array<Array<core.Data.Vector>>>;

        /**
         * btain the derivatives of the NurbsSurface.  Returns a two dimensional arra
         * ontaining the derivative vectors.  Increasing U partial derivatives are increasin
         * ow-wise.  Increasing V partial derivatives are increasing column-wise.  Therefore
         * he [0][0] position is a point on the surface, [n][0] is the nth V partial derivative
         * he [1][1] position is twist vector or mixed partial derivative Puv
         * 
         * params*
         * 
         * The u paramete
         * The v paramete
         * Number of derivatives to evaluat
         * 
         * returns*
         * 
         * A two dimensional array of vector
         */
        derivatives(u:number, v:number, numDerivs?:number): Array<Array<core.Data.Vector>>;

        /**
         * he async version of `derivatives
         */
        derivativesAsync(u:number, v:number, numDerivs?:number): Promise<Array<Array<core.Data.Vector>>>;

        /**
         * et the closest parameter on the surface to a poin
         * 
         * params*
         * 
         * The poin
         * 
         * returns*
         * 
         * The closest poin
         */
        closestParam(pt:core.Data.Point): core.Data.UV;

        /**
         * he async version of `closestParam
         */
        closestParamAsync(pt:core.Data.Point): Promise<core.Data.UV>;

        /**
         * et the closest point on the surface to a poin
         * 
         * params*
         * 
         * The poin
         * 
         * returns*
         * 
         * The closest poin
         */
        closestPoint(pt:core.Data.Point): core.Data.Point;

        /**
         * he async version of `closestParam
         */
        closestPointAsync(pt:core.Data.Point): Promise<core.Data.Point>;

        /**
         * plit a surfac
         * 
         * params*
         * 
         * The parameter to do the spli
         * Whether to divide in V or
         * 
         * returns*
         * 
         * A length 2 array with two new NurbsSurface object
         */
        split(u:number, useV?:boolean): Array<NurbsSurface>;

        /**
         * he async version of `split
         */
        splitAsync(u:number, useV?:boolean): Promise<Array<NurbsSurface>>;

        /**
         * everse the parameterization of the curv
         * 
         * params*
         * 
         * False to reverse u, true to reverse
         * 
         * returns*
         * 
         * The reversed surfac
         */
        reverse(useV?:boolean): NurbsSurface;

        /**
         * he async version of `reverse
         */
        reverseAsync(useV?:boolean): Promise<NurbsSurface>;

        /**
         * xtract an isocurve from a surfac
         * 
         * params*
         * 
         * The parameter at which to obtain the isocurv
         * False for a u-iso, true for a v-is
         * 
         * returns*
         * 
         * A NurbsCurve in the provided directio
         */
        isocurve(u:number, useV?:boolean): NurbsCurve;

        /**
         * he async version of `isocurve
         */
        isocurveAsync(u:number, useV?:boolean): Promise<NurbsCurve>;

        /**
         * xtract the boundary curves from a surfac
         * 
         * returns*
         * 
         * an array containing 4 elements, first 2 curves in the V direction, then 2 curves in the U directio
         */
        boundaries(options?:core.AdaptiveRefinementOptions): Array<NurbsCurve>;

        /**
         * he async version of `boundaries
         */
        boundariesAsync(options?:core.AdaptiveRefinementOptions): Promise<Array<NurbsCurve>>;

        /**
         * essellate the surfac
         * 
         * params*
         * 
         * an AdaptiveRefinementOptions objec
         * 
         * returns*
         * 
         * A MeshData objec
         */
        tessellate(options?:core.AdaptiveRefinementOptions): core.Data.MeshData;

        /**
         * he async version of `boundaries
         */
        tessellateAsync(options?:core.AdaptiveRefinementOptions): Promise<core.Data.MeshData>;

        /**
         * ransform a Surface with the given matrix
         * 
         * params*
         * 
         * 4x4 array representing the transfor
         * 
         * returns*
         * 
         * A new Surfac
         */
        transform(mat:core.Data.Matrix): NurbsSurface;

        /**
         * he async version of `transform
         */
        transformAsync(mat:core.Data.Matrix): Promise<NurbsSurface>;

    }

    export class RevolvedSurface extends NurbsSurface {

        /**
         * onstruct a revolved surfac
         * 
         * params*
         * 
         * The profile curv
         * A point on the axis of revolutio
         * The direction of the axis of revolutio
         * The angle to revolve around.  2 * Math.PI corresponds to a complete revolutio
         */
        constructor(profile:NurbsCurve, center:core.Data.Point, axis:core.Data.Vector, angle:number);

        /**
         * he profile curv
         */
        profile(): ICurve;

        /**
         * point on the axis of revolutio
         */
        center(): core.Data.Point;

        /**
         * he direction of the axis of revolutio
         */
        axis(): core.Data.Vector;

        /**
         * he angle to revolve around.  2 * Math.PI corresponds to a complete revolutio
         */
        angle(): number;

    }

    /**
     * A surface representing the doubly curved surface of a spher
     */
    export class SphericalSurface extends NurbsSurface {

        /**
         * reate a spherical surfac
         * 
         * params*
         * 
         * Length 3 array representing the center of the circl
         * Radius of the circl
         */
        constructor(center:core.Data.Point, radius:number);

        /**
         * ength 3 array representing the center of the circl
         */
        center(): core.Data.Point;

        /**
         * adius of the circl
         */
        radius(): number;

    }

    /**
     * A SweptSurface uses a profile curve and a guide rail to form a surface. The profile curve is "swept" along the guid
     * rail by a lofting operation
     */
    export class SweptSurface extends NurbsSurface {

        /**
         * onstruct a Surface by translating along a rail curv
         * 
         * params*
         * 
         * The profile curv
         * The rail curv
         */
        constructor(profile:ICurve, rail:ICurve);

        /**
         * he profile curv
         */
        profile(): ICurve;

        /**
         * he rail curv
         */
        rail(): ICurve;

    }


    /**
    * A NURBS curve - this class represents the base class of many of verb.geom's curve types and provides many tools for analysis and evaluation
    * This object is deliberately constrained to be immutable. The methods to inspect the properties of this class deliberately return copies. `asNurbs` ca
    * be used to obtain a simplified NurbsCurveData object that can be used with `verb.core` or for serialization purposes
    * 
    * Under the hood, this type takes advantage of verb's asynchronous runtime using the _Async methods. Calling one of thes
    * methods returns a `Promise` instead of the value. This allows you to run the computation in a background thread and obtain the value asynchronously
    * 
    * You can find further documentation for using `Promise`'s at [https://github.com/jdonaldson/promhx](https://github.com/jdonaldson/promhx)
    */
    export class NurbsCurve extends core.Serialization.SerializableBase implements ICurve
    {

        /**
         * onstruct a NurbsCurve by a NurbsCurveData objec
         * 
         * params*
         * 
         * The data objec
         * 
         * returns*
         * 
         * A new NurbsCurv
         */

        constructor(data: core.Data.NurbsCurveData);

        /**
         * onstruct a NurbsCurve by degree, knots, control points, weight
         * 
         * params*
         * 
         * The degre
         * The knot arra
         * Array of control point
         * Array of weight value
         * 
         * returns*
         * 
         * A new NurbsCurv
         */
        static byKnotsControlPointsWeights(degree: number, knots: core.Data.KnotArray, controlPoints: Array<core.Data.Point>, weights?: Array<number>): NurbsCurve;

        /**
         * onstruct a NurbsCurve by interpolating a collection of points.  The resultant curv
         * ill pass through all of the points
         * 
         * params*
         * 
         * An array of point
         * Optional : The degree of resultant curv
         * 
         * returns*
         * 
         * A new NurbsCurv
         */
        static byPoints(points: Array<core.Data.Point>, degree?: number): NurbsCurve;

        /**
         * nderlying serializable, data objec
         */
        degree(): number;

        /**
         * he degree of the curv
         */
        knots(): core.Data.KnotArray;

        /**
         * he knot arra
         */
        controlPoints(): Array<core.Data.Point>;

        /**
         * rray of control point
         */
        weights(): Array<number>;

        /**
         * rray of weight value
         * btain a copy of the underlying data structure for the Curve. Used with verb.core
         * 
         * returns*
         * 
         * A new NurbsCurveData objec
         */
        asNurbs(): core.Data.NurbsCurveData;

        /**
         * btain a copy of the curv
         * 
         * returns*
         * 
         * The copied curv
         */
        clone(): any;

        /**
         * etermine the valid domain of the curv
         * 
         * returns*
         * 
         * An array representing the high and end point of the domain of the curv
         */
        domain(): core.Data.Interval<number>;

        /**
         * ransform a curve with the given matrix
         * 
         * params*
         * 
         * 4d array representing the transfor
         * 
         * returns*
         * 
         * A point represented as an arra
         */
        transform(mat: core.Data.Matrix): NurbsCurve;

        /**
         * he async version of `transform
         */
        transformAsync(mat: core.Data.Matrix): Promise<NurbsCurve>;

        /**
         * ample a point at the given paramete
         * 
         * params*
         * 
         * The parameter to sample the curv
         * 
         * returns*
         * 
         * A point represented as an arra
         */
        point(u: number): core.Data.Point;

        /**
         * he async version of `point
         */
        pointAsync(u: number): Promise<core.Data.Point>;

        /**
         * btain the curve tangent at the given parameter.  This is the first derivative and i
         * ot normalize
         * 
         * params*
         * 
         * The parameter to sample the curv
         * 
         * returns*
         * 
         * A point represented as an arra
         */
        tangent(u: number): core.Data.Vector;

        /**
         * he async version of `tangent
         */
        tangentAsync(u: number): Promise<core.Data.Vector>;

        /**
         * et derivatives at a given paramete
         * 
         * params*
         * 
         * The parameter to sample the curv
         * The number of derivatives to obtai
         * 
         * returns*
         * 
         * A point represented as an arra
         */
        derivatives(u: number, numDerivs?: number): Array<core.Data.Vector>;

        /**
         * he async version of `derivatives
         */
        derivativesAsync(u: number, numDerivs?: number): Promise<Array<core.Data.Vector>>;

        /**
         * etermine the closest point on the curve to the given poin
         * 
         * params*
         * 
         * A length 3 array representing the poin
         * 
         * returns*
         * 
         * The closest poin
         */
        closestPoint(pt: core.Data.Point): core.Data.Point;

        /**
         * he async version of `closestPoint
         */
        closestPointAsync(pt: core.Data.Point): Promise<core.Data.Point>;

        /**
         * etermine the closest parameter on the curve to the given poin
         * 
         * params*
         * 
         * A length 3 array representing the poin
         * 
         * returns*
         * 
         * The closest paramete
         */
        closestParam(pt: core.Data.Point): number;

        /**
         * he async version of `length
         */
        closestParamAsync(pt: any): Promise<core.Data.Point>;

        /**
         * etermine the arc length of the curv
         * 
         * returns*
         * 
         * The length of the curv
         */
        length(): number;

        /**
         * he async version of `length
         */
        lengthAsync(): Promise<number>;

        /**
         * etermine the arc length of the curve at the given paramete
         * 
         * params*
         * 
         * The parameter at which to evaluat
         * 
         * returns*
         * 
         * The length of the curve at the given paramete
         */
        lengthAtParam(u: number): number;

        /**
         * he async version of `lengthAtParam
         */
        lengthAtParamAsync(): Promise<number>;

        /**
         * etermine the parameter of the curve at the given arc lengt
         * 
         * params*
         * 
         * The arc length at which to determine the paramete
         * 
         * returns*
         * 
         * The length of the curve at the given paramete
         */
        paramAtLength(len: number, tolerance?: number): number;

        /**
         * he async version of `paramAtLength
         */
        paramAtLengthAsync(len: number, tolerance?: number): Promise<number>;

        /**
         * etermine the parameters necessary to divide the curve into equal arc length segment
         * 
         * params*
         * 
         * Number of divisions of the curv
         * 
         * returns*
         * 
         * A collection of parameter
         */
        divideByEqualArcLength(divisions: number): Array<eval.CurveLengthSample>;

        /**
         * he async version of `divideByEqualArcLength`
         */
        divideByEqualArcLengthAsync(divisions: number): Promise<Array<eval.CurveLengthSample>>;

        /**
         * iven the distance to divide the curve, determine the parameters necessary to divide the curve into equal arc length segment
         * 
         * params*
         * 
         * Arc length of each segmen
         * 
         * returns*
         * 
         * A collection of parameter
         */
        divideByArcLength(arcLength: number): Array<eval.CurveLengthSample>;

        /**
         * he async version of `divideByArcLength
         */
        divideByArcLengthAsync(divisions: number): Promise<Array<eval.CurveLengthSample>>;

        /**
         * plit the curve at the given paramete
         * 
         * params*
         * 
         * The parameter at which to split the curv
         * 
         * returns*
         * 
         * Two curves - one at the lower end of the parameter range and one at the higher end
         */
        split(u: number): Array<NurbsCurve>;

        /**
         * The async version of `split
         */
        splitAsync(u: number): Promise<Array<NurbsCurve>>;

        /**
         * everse the parameterization of the curv
         * 
         * returns*
         * 
         * A reversed curv
         */
        reverse(): NurbsCurve;

        /**
         * The async version of `reverse
         */
        reverseAsync(): Promise<NurbsCurve>;

        /**
         * essellate a curve at a given toleranc
         * 
         * params*
         * 
         * The tolerance at which to sample the curv
         * 
         * returns*
         * 
         * A point represented as an arra
         */
        tessellate(tolerance?: number): Array<core.Data.Point>;

        /**
         * The async version of `tessellate
         */
        tessellateAsync(tolerance?: number): Promise<Array<core.Data.Point>>;

    }

    /**
     * A curve representing a straight lin
     */
    class Line extends NurbsCurve
    {

        /**
         * reate a lin
         * 
         * params*
         * 
         * Length 3 array representing the start poin
         * Length 3 array representing the end poin
         */
        constructor(start: core.Data.Point, end: core.Data.Point);

        start(): any;

        /**
         * ength 3 array representing the start poin
         */
        end(): any;

    }

    export class BezierCurve extends NurbsCurve {

        /**
         * reate a bezier curv
         * 
         * params*
         * 
         * Array of control point
         * Array of control point weights (optional
         */
        constructor(points:Array<core.Data.Point>, weights?:Array<number>);

    }

    /**
    * An Arc is a three dimensional curve representing a subset of a full Circl
    */
    export class Arc extends NurbsCurve
    {

        /**
         * onstructor for Ar
         * 
         * params*
         * 
         * Length 3 array representing the center of the ar
         * Length 3 array representing the xaxi
         * Length 3 array representing the perpendicular yaxi
         * Radius of the arc ar
         * Start angle in radian
         * End angle in radian
         */
        constructor(center: core.Data.Point, xaxis: core.Data.Vector, yaxis: core.Data.Vector, radius: number, minAngle: number, maxAngle: number);

        center(): core.Data.Point;

        /**
         * ength 3 array representing the center of the ar
         */
        xaxis(): core.Data.Vector;

        /**
         * ength 3 array representing the xaxi
         */
        yaxis(): core.Data.Vector;

        /**
         * ength 3 array representing the perpendicular yaxi
         */
        radius(): number;

        /**
         * adius of the ar
         */
        minAngle(): number;

        /**
         * tart angle in radian
         */
        maxAngle(): number;

    }

    /**
     * Form a Surface by extruding a curve along a vecto
     */
    export class ExtrudedSurface extends NurbsSurface {

        /**
         * onstruct a Surface by extruding a curv
         * 
         * params*
         * 
         * The profile curv
         * The direction and magnitude of the extrusio
         */
        constructor(profile:ICurve, direction:core.Data.Vector);

        /**
         * he profile curv
         */
        profile(): ICurve;

        /**
         * he direction and magnitude of the extrusio
         */
        direction(): core.Data.Vector;

    }

    /**
     * A CylindricalSurface is a surface making up the curve surface of a cylinde
     */
    export class CylindricalSurface extends NurbsSurface {

        /**
         * onstructor for Cylinde
         * 
         * params*
         * 
         * Length 3 array representing the axis of the cylinde
         * Length 3 array representing the x axis, perpendicular to the axi
         * Length 3 array representing the base of the cylinde
         * Height of the cylinde
         * Radius of the cylinde
         */
        constructor(axis:core.Data.Vector, xaxis:core.Data.Vector, base:core.Data.Point, height:number, radius:number);

        axis(): any;

        /**
         * ength 3 array representing the axis of the cylinde
         */
        xaxis(): any;

        /**
         * ength 3 array representing the x axis, perpendicular to the axi
         */
        base(): any;

        /**
         * ength 3 array representing the base of the cylinde
         */
        height(): any;

        /**
         * eight of the cylinde
         */
        radius(): any;

    }

    /**
     * An EllipseArc is a subset of an Ellips
     */
    export class EllipseArc extends NurbsCurve {

        /**
         * reate an EllipseAr
         * 
         * params*
         * 
         * Length 3 array representing the center of the ar
         * Length 3 array representing the xaxi
         * Length 3 array representing the perpendicular yaxi
         * Minimum angle of the EllipseAr
         * Maximum angle of the EllipseAr
         */
        constructor(center:core.Data.Point, xaxis:core.Data.Vector, yaxis:core.Data.Vector, minAngle:number, maxAngle:number);

        center(): any;

        /**
         * ength 3 array representing the center of the ar
         */
        xaxis(): any;

        /**
         * ength 3 array representing the xaxi
         */
        yaxis(): any;

        /**
         * ength 3 array representing the perpendicular yaxi
         */
        minAngle(): any;

        /**
         * inimum angle of the EllipseAr
         */
        maxAngle(): any;

    }

     /**
     * A CylindricalSurface is a surface making up part of a cylinder
     */
    export class Ellipse extends EllipseArc {

        /**
         * reate an ellips
         * 
         * params*
         * 
         * 
         * Length 3 array representing the center of the circl
         * Length 3 array representing the xaxi
         * Length 3 array representing the perpendicular yaxi
         */
        constructor(center:core.Data.Point, xaxis:core.Data.Vector, yaxis:core.Data.Vector);

    }

    /**
     * A ConicalSurface is a surface making up the curve surface of a con
     */
    export class ConicalSurface extends NurbsSurface {

        /**
         * ake a conical surfac
         * 
         * params*
         * 
         * Length 3 array representing the axis of the con
         * Length 3 array representing the x axis, perpendicular to the axi
         * Length 3 array representing the base of the con
         * Height of the con
         * Radius of the con
         */
        constructor(axis:core.Data.Vector, xaxis:core.Data.Vector, base:core.Data.Point, height:number, radius:number);

        axis(): any;

        /**
         * ength 3 array representing the axis of the con
         */
        xaxis(): any;

        /**
         * ength 3 array representing the x axis, perpendicular to the axi
         */
        base(): any;

        /**
         * ength 3 array representing the base of the con
         */
        height(): any;

        /**
         * eight of the con
         */
        radius(): any;

    }

    /**
    * A Circle is a three dimensional curve representing the points that are equidistant from a point in a particular plan
    */
    export class Circle extends Arc
    {

        /**
         * reate a circl
         * 
         * params*
         * 
         * Length 3 array representing the center of the circl
         * Length 3 array representing the xaxi
         * Length 3 array representing the perpendicular yaxi
         * Radius of the circl
         */
        constructor(center: core.Data.Point, xaxis: core.Data.Vector, yaxis: core.Data.Vector, radius: number);

    }
}

export declare module eval
{

    /**
     * `Tess` contains static, immutable algorithms for tessellation of NURBS curves and sufaces. Tessellation is the decompositio
     * of the analytical NURBS representation into discrete meshes or polylines that are useful for drawing
     * 
     * Some of these algorithms are "adaptive" - using certain heuristics to sample geometry where such samples make sense - whil
     * others are "regular" in that they sample regularly throughout a parametric domain. There are tradeoffs here. Whil
     * adaptive algorithms can sometimes yield "better" results that are smaller or more economical, this can sometimes come a
     * increased computational cost. For example, it is sometimes necessarily to compute higher order derivatives in order t
     * obtain these more economical results. Your usage of these algorithms should consider these tradeoffs
     */
    class Tess {

        /**
         * ample a NURBS curve at equally spaced parametric interval
         * 
         * params*
         * 
         * NurbsCurveData objec
         * integer number of sample
         * whether to prefix the point with the paramete
         * 
         * returns*
         * 
         * an array of points, prepended by the point param if require
         */
        static rationalCurveRegularSample(curve:core.Data.NurbsCurveData, numSamples:number, includeU:boolean): Array<core.Data.Point>;

        /**
         * ample a range of a NURBS curve at equally spaced parametric interval
         * 
         * params*
         * 
         * NurbsCurveData objec
         * start parameter for samplin
         * end parameter for samplin
         * integer number of sample
         * whether to prefix the point with the paramete
         * 
         * returns*
         * 
         * an dictionary of parameter - point pair
         */
        static rationalCurveRegularSampleRange(curve:core.Data.NurbsCurveData, start:number, end:number, numSamples:number, includeU:boolean): Array<core.Data.Point>;

        //Sample a NURBS curve over its entire domain, corresponds to [this algorithm](http://ariel.chronotext.org/dd/defigueiredo93adaptive.pdf)
        //
        //**params**
        //
        //* NurbsCurveData object
        //* tol for the adaptive scheme
        //* whether to prefix the point with the parameter
        //
        //**returns**
        //
        //* an array of dim + 1 length where the first element is the param where it was sampled and the remaining the pt

        static rationalCurveAdaptiveSample( curve : core.Data.NurbsCurveData, tol : number, includeU : boolean ) : Array<core.Data.Point>;

        //Sample a NURBS curve at 3 points, facilitating adaptive sampling
        //
        //**params**
        //
        //* NurbsCurveData object
        //* start parameter for sampling
        //* end parameter for sampling
        //* whether to prefix the point with the parameter
        //
        //**returns**
        //
        //* an array of dim + 1 length where the first element is the param where it was sampled and the remaining the pt

        static rationalCurveAdaptiveSampleRange( curve : core.Data.NurbsCurveData, start: any, end: any, tol: any, includeU: any ) : Array<core.Data.Point>;

        //Tessellate a NURBS surface on equal spaced intervals in the parametric domain
        //
        //**params**
        //
        //* NurbsSurfaceData object
        //* number of divisions in the u direction
        //* number of divisions in the v direction
        //
        //**returns**
        //
        //* MeshData object

        static rationalSurfaceNaive( surface : core.Data.NurbsSurfaceData, divs_u : number, divs_v : number ) : core.Data.MeshData;

        
        //Divide a NURBS surface int equal spaced intervals in the parametric domain as AdaptiveRefinementNodes
        //
        //**params**
        //
        //* NurbsSurfaceData object
        //* SurfaceDivideOptions object
        //
        //**returns**
        //
        //* MeshData object

        static divideRationalSurfaceAdaptive( surface : core.Data.NurbsSurfaceData, options : core.AdaptiveRefinementOptions): Array<core.AdaptiveRefinementNode>;

        static rationalSurfaceAdaptive( surface : core.Data.NurbsSurfaceData, options : core.AdaptiveRefinementOptions ) : core.Data.MeshData;

    }

     /**
     * `Modify` contains many fundamental algorithms for working with NURBS. These include algorithms for
     * 
     * knot insertio
     * knot refinemen
     * decomposition into bezier'
     * degree elevatio
     * reparameterizatio
     * 
     * Many of these algorithsm owe their implementation to Piegl & Tiller's, "The NURBS Book
     * 
     */
    export class Modify {

        /**
         * everses the parameterization of a NURBS curve. The domain is unaffected
         * 
         * params*
         * 
         * A NURBS curve to be reverse
         * 
         * returns*
         * 
         * A new NURBS curve with a reversed parameterizatio
         */
        static curveReverse(curve:core.Data.NurbsCurveData): core.Data.NurbsCurveData;

        /**
         * everse the parameterization of a NURBS surface in the specified direction. The domain is unaffected
         * 
         * params*
         * 
         * A NURBS surface to be reverse
         * Whether to use the U direction or V directio
         * 
         * returns*
         * 
         * A new NURBS surface with a reversed parameterization in the given directio
         */
        static surfaceReverse(surface:core.Data.NurbsSurfaceData, useV?:boolean): core.Data.NurbsSurfaceData;

        /**
         * everse a knot vecto
         * 
         * params*
         * 
         * An array of knot
         * 
         * returns*
         * 
         * The reversed array of knot
         */
        static knotsReverse(knots:core.Data.KnotArray): core.Data.KnotArray;

        /**
         * nify the knot vectors of a collection of NURBS curves. This can be used, for example, is used for lofting between curves
         * 
         * params*
         * 
         * An array of NURBS curve
         * 
         * returns*
         * 
         * A collection of NURBS curves, all with the same knot vecto
         */
        static unifyCurveKnotVectors(curves:Array<core.Data.NurbsCurveData>): Array<core.Data.NurbsCurveData>;

        //Elevate the degree of a NURBS curve
        //
        //**params**
        //
        //* The curve to elevate
        //* The expected final degree
        //
        //**returns**
        //
        //* The NURBS curve after degree elevation - if the supplied degree is <= the curve is returned unmodified

        static curveElevateDegree( curve : core.Data.NurbsCurveData, finalDegree : number ) : core.Data.NurbsCurveData;

        //Transform a NURBS surface using a matrix
        //
        //**params**
        //
        //* The surface to transform
        //* The matrix to use for the transform - the dimensions should be the dimension of the surface + 1 in both directions
        //
        //**returns**
        //
        //* A new NURBS surface after transformation

        static rationalSurfaceTransform( surface : core.Data.NurbsSurfaceData, mat : core.Data.Matrix ) : core.Data.NurbsSurfaceData;

        //Transform a NURBS curve using a matrix
        //
        //**params**
        //
        //* The curve to transform
        //* The matrix to use for the transform - the dimensions should be the dimension of the curve + 1 in both directions
        //
        //**returns**
        //
        //* A new NURBS surface after transformation

        static rationalCurveTransform( curve : core.Data.NurbsCurveData, mat : core.Data.Matrix ) : core.Data.NurbsCurveData;

        //Perform knot refinement on a NURBS surface by inserting knots at various parameters
        //
        //**params**
        //
        //* The surface to insert the knots into
        //* The knots to insert - an array of parameter positions within the surface domain
        //* Whether to insert in the U direction or V direction of the surface
        //
        //**returns**
        //
        //* A new NURBS surface with the knots inserted

        static surfaceKnotRefine( surface : core.Data.NurbsSurfaceData, knotsToInsert : Array<number>, useV : boolean ) : core.Data.NurbsSurfaceData;

        //Decompose a NURBS curve into a collection of bezier's.  Useful
        //as each bezier fits into it's convex hull.  This is a useful starting
        //point for intersection, closest point, divide & conquer algorithms
        //
        //**params**
        //
        //* NurbsCurveData object representing the curve
        //
        //**returns**
        //
        //* *Array* of NurbsCurveData objects, defined by degree, knots, and control points

        static decomposeCurveIntoBeziers( curve : core.Data.NurbsCurveData ) : Array<core.Data.NurbsCurveData>;

        
        //Insert a collection of knots on a curve
        //
        //Corresponds to Algorithm A5.4 (Piegl & Tiller)
        //
        //**params**
        //
        //* NurbsCurveData object representing the curve
        //* array of knots to insert
        //
        //**returns**
        //
        //*  NurbsCurveData object representing the curve
        //

        static curveKnotRefine( curve : core.Data.NurbsCurveData, knotsToInsert : Array<number> ) : core.Data.NurbsCurveData;

        //Insert a knot along a rational curve.  Note that this algorithm only works
        //for r + s <= degree, where s is the initial multiplicity (number of duplicates) of the knot.
        //
        //Corresponds to algorithm A5.1 (Piegl & Tiller)
        //
        //Use the curveKnotRefine for applications like curve splitting.
        //
        //**params**
        //
        //* integer degree
        //* array of nondecreasing knot values
        //* array of control points
        //* parameter at which to insert the knot
        //* number of times to insert the knot
        //
        //**returns**
        //
        //* *Object* the new curve, defined by knots and controlPoints
        //

        static curveKnotInsert( curve : core.Data.NurbsCurveData, u : number, r : number ) : core.Data.NurbsCurveData;

    }


    /**
     * `Make` provides algorithms for generating NURBS representations of various special surfaces and curves. One of the ver
     * desirable properties of NURBS is the ability to represent common curve types like conics in NURBS. As a result, ver
     * is able to represent many curve types with exceptional economy as many of the algorithms (for example, for intersection
     * can be reused
     * 
     * This class includes methods for building
     * 
     * conic
     * polyline
     * loft
     * swept surface
     * 
     * Many of these algorithms owe their implementation to Piegl & Tiller's "The NURBS Book
     */
    class Make {

        /**
         * enerate a surface by translating a profile curve along a rail curv
         * 
         * params*
         * 
         * profile NurbsCurveDat
         * rail NurbsCurveDat
         * 
         * returns*
         * 
         * NurbsSurfaceData objec
         */
        static rationalTranslationalSurface(profile:core.Data.NurbsCurveData, rail:core.Data.NurbsCurveData): core.Data.NurbsSurfaceData;


        /**
         * xtract the boundary curves from a surfac
         * 
         * returns*
         * 
         * an array containing 4 elements, first 2 curves in the V direction, then 2 curves in the U directio
         */
        static surfaceBoundaryCurves(surface:core.Data.NurbsSurfaceData): Array<core.Data.NurbsCurveData>;


        static surfaceIsocurve(surface:core.Data.NurbsSurfaceData, u:number, useV?:boolean): core.Data.NurbsCurveData;

        static loftedSurface( curves : Array<core.Data.NurbsCurveData>, degreeV : number ) : core.Data.NurbsSurfaceData;

        static clonedCurve( curve : core.Data.NurbsCurveData ) : core.Data.NurbsCurveData;

        static rationalBezierCurve( controlPoints : Array<core.Data.Point>, weights : Array<number> ) : core.Data.NurbsCurveData;

        //Generate the control points, weights, and knots of a surface defined by 4 points
        //
        //**params**
        //
        //* first point in counter-clockwise form
        //* second point in counter-clockwise form
        //* third point in counter-clockwise form
        //* forth point in counter-clockwise form
        //
        //**returns**
        //
        //* NurbsSurfaceData object

        static fourPointSurface( p1 : core.Data.Point, p2 : core.Data.Point, p3 : core.Data.Point, p4 : core.Data.Point, degree : number ) : core.Data.NurbsSurfaceData;

            //Generate the control points, weights, and knots of an elliptical arc
        //
        //**params**
        //
        //* the center
        //* the scaled x axis
        //* the scaled y axis
        //* start angle of the ellipse arc, between 0 and 2pi, where 0 points at the xaxis
        //* end angle of the arc, between 0 and 2pi, greater than the start angle
        //
        //**returns**
        //
        //* a NurbsCurveData object representing a NURBS curve

        static ellipseArc( center : core.Data.Point, xaxis : core.Data.Point, yaxis : core.Data.Point, startAngle : number, endAngle : number ) : core.Data.NurbsCurveData;

            //Generate the control points, weights, and knots of an arbitrary arc
        // (Corresponds to Algorithm A7.1 from Piegl & Tiller)
        //
        //**params**
        //
        //* the center of the arc
        //* the xaxis of the arc
        //* orthogonal yaxis of the arc
        //* radius of the arc
        //* start angle of the arc, between 0 and 2pi
        //* end angle of the arc, between 0 and 2pi, greater than the start angle
        //
        //**returns**
        //
        //* a NurbsCurveData object representing a NURBS curve

        static arc( center : core.Data.Point, xaxis : core.Data.Vector, yaxis : core.Data.Vector, radius : number, startAngle : number,
            endAngle : number ) : core.Data.NurbsCurveData;

                //Generate the control points, weights, and knots of a polyline curve
        //
        //**params**
        //
        //* array of points in curve
        //
        //**returns**
        //
        //* a NurbsCurveData object representing a NURBS curve

        static polyline( pts : Array<core.Data.Point>) : core.Data.NurbsCurveData;

            //Generate the control points, weights, and knots of an extruded surface
        //
        //**params**
        //
        //* axis of the extrusion
        //* length of the extrusion
        //* a NurbsCurveData object representing a NURBS surface
        //
        //**returns**
        //
        //* an object with the following properties: controlPoints, weights, knots, degree

        static extrudedSurface( axis : core.Data.Point, length : number, profile : core.Data.NurbsCurveData ) : core.Data.NurbsSurfaceData;

        //Generate the control points, weights, and knots of a cylinder
        //
        //**params**
        //
        //* normalized axis of cylinder
        //* xaxis in plane of cylinder
        //* position of base of cylinder
        //* height from base to top
        //* radius of the cylinder
        //
        //**returns**
        //
        //* an object with the following properties: controlPoints, weights, knotsU, knotsV, degreeU, degreeV

        static cylindricalSurface( axis : core.Data.Point, xaxis : core.Data.Point, base : core.Data.Point, height : number, radius : number ) : core.Data.NurbsSurfaceData;

        //Generate the control points, weights, and knots of a revolved surface
        // (Corresponds to Algorithm A7.1 from Piegl & Tiller)
        //
        //**params**
        //
        //* center of the rotation axis
        //* axis of the rotation axis
        //* angle to revolve around axis
        //* degree of the generatrix
        //* control points of the generatrix
        //* weights of the generatrix
        //
        //**returns**
        //
        //* an object with the following properties: controlPoints, weights, knots, degree

        static revolvedSurface( profile : core.Data.NurbsCurveData, center : core.Data.Point, axis : core.Data.Point, theta : number ) : core.Data.NurbsSurfaceData;

        //Generate the control points, weights, and knots of a sphere
        //
        //**params**
        //
        //* the center of the sphere
        //* normalized axis of sphere
        //* vector perpendicular to axis of sphere, starting the rotation of the sphere
        //* radius of the sphere
        //
        //**returns**
        //
        //* an object with the following properties: controlPoints, weights, knotsU, knotsV, degreeU, degreeV
        //

        static sphericalSurface( center : core.Data.Point, axis : core.Data.Point, xaxis : core.Data.Point, radius : number );

        
        //Generate the control points, weights, and knots of a cone
        //
        //**params**
        //
        //* normalized axis of cone
        //* position of base of cone
        //* height from base to tip
        //* radius at the base of the cone
        //
        //**returns**
        //
        //* an object with the following properties: controlPoints, weights, knots, degree
        //

        static conicalSurface( axis : core.Data.Point, xaxis : core.Data.Point, base : core.Data.Point, height : number, radius : number ) : core.Data.NurbsSurfaceData;

        
        static rationalInterpCurve( points : Array<Array<number>>,
            degree : number,
            homogeneousPoints : boolean,
            start_tangent : core.Data.Point,
            end_tangent : core.Data.Point) : core.Data.NurbsCurveData;


    }


    /**
     * `Eval` provides all of the core algorithms for evaluating points and derivatives on NURBS curves and surfaces. Most of th
     * time, it makes more sense to use the tools in verb.geom for this, but in some cases this will make more sense
     * 
     * Eval also provides experimental tools for evaluating points in NURBS volumes
     * 
     * Many of these algorithms owe their implementation to Piegl & Tiller's "The NURBS Book
     */
    class Eval {

        /**
         * ompute the tangent at a point on a NURBS curv
         * 
         * params*
         * 
         * NurbsCurveData object representing the curv
         * u paramete
         * v paramete
         * 
         * returns*
         * 
         * a Vector represented by an array of length (dim
         */
        static rationalCurveTangent(curve: core.Data.NurbsCurveData, u:number): Array<number>;

        /**
         * ompute the derivatives at a point on a NURBS surfac
         * 
         * params*
         * 
         * NurbsSurfaceData object representing the surfac
         * u paramete
         * v paramete
         * 
         * returns*
         * 
         * a Vector represented by an array of length (dim
         */
        static rationalSurfaceNormal(surface:core.Data.NurbsSurfaceData, u:number, v:number): Array<number>;


        /**
         * ompute the derivatives at a point on a NURBS surfac
         * 
         * params*
         * 
         * NurbsSurfaceData object representing the surfac
         * number of derivatives to evaluat
         * u parameter at which to evaluate the derivative
         * v parameter at which to evaluate the derivative
         * 
         * returns*
         * 
         * a point represented by an array of length (dim
         */
        static rationalSurfaceDerivatives(surface:core.Data.NurbsSurfaceData, u:number, v:number, numDerivs?:number): Array<Array<Array<number>>>;

        /**
         * emogeniz
         * ompute a point on a NURBS surfac
         * 
         * params*
         * 
         * integer degree of surface in u directio
         * array of nondecreasing knot values in u directio
         * integer degree of surface in v directio
         * array of nondecreasing knot values in v directio
         * 3d array of control points (tensor), top to bottom is increasing u direction, left to right is increasing v direction
         * nd where each control point is an array of length (dim+1
         * u parameter at which to evaluate the surface poin
         * v parameter at which to evaluate the surface poin
         * 
         * returns*
         * 
         * a point represented by an array of length (dim
         */
        static rationalSurfacePoint(surface:core.Data.NurbsSurfaceData, u:number, v:number): core.Data.Point;

        /**
         * etermine the derivatives of a NURBS curve at a given paramete
         * 
         * params*
         * 
         * NurbsCurveData object representing the curve - the control points are in homogeneous coordinate
         * parameter on the curve at which the point is to be evaluate
         * number of derivatives to evaluat
         * 
         * returns*
         * 
         * a point represented by an array of length (dim
         */
        static rationalCurveDerivatives(curve:core.Data.NurbsCurveData, u:number, numDerivs?:number): Array<core.Data.Point>;

        /**
         * emogeniz
         * ompute a point on a NURBS curv
         * 
         * params*
         * 
         * integer degree of curv
         * array of nondecreasing knot value
         * 2d array of homogeneous control points, where each control point is an array of length (dim+1
         * nd form (wi*pi, wi
         * parameter on the curve at which the point is to be evaluate
         * 
         * returns*
         * 
         * a point represented by an array of length (dim
         */
        static rationalCurvePoint(curve:core.Data.NurbsCurveData, u:number): core.Data.Point;

        /**
         * ompute the derivatives on a non-uniform, non-rational B spline surfac
         * 
         * params*
         * 
         * NurbsSurfaceData object representing the surfac
         * number of derivatives to evaluat
         * u parameter at which to evaluate the derivative
         * v parameter at which to evaluate the derivative
         * 
         * returns*
         * 
         * a 2d jagged array representing the derivatives - u derivatives increase by row, v by colum
         */
        static surfaceDerivatives(surface:core.Data.NurbsSurfaceData, u:number, v:number, numDerivs:number): Array<Array<core.Data.Point>>;

        /**
         * Compute the derivatives on a non-uniform, non-rational B spline surfac
         * (corresponds to algorithm 3.6 from The NURBS book, Piegl & Tiller 2nd edition
         * 
         * params*
         * 
         * integer number of basis functions in u dir - 1 = knotsU.length - degreeU -
         * integer number of basis functions in v dir - 1 = knotsU.length - degreeU -
         * NurbsSurfaceData object representing the surfac
         * u parameter at which to evaluate the derivative
         * v parameter at which to evaluate the derivative
         * 
         * returns*
         * 
         * a 2d jagged array representing the derivatives - u derivatives increase by row, v by colum
         */
        static surfaceDerivativesGivenNM(n:number, m:number, surface:core.Data.NurbsSurfaceData, u:number, v:number, numDerivs:number): Array<Array<core.Data.Point>>;
        
        //Compute a point on a non-uniform, non-rational B-spline surface
        //
        //**params**
        //
        //* NurbsSurfaceData object representing the surface
        //* u parameter at which to evaluate the surface point
        //* v parameter at which to evaluate the surface point
        //
        //**returns**
        //
        //* a point represented by an array of length (dim)

        static surfacePoint( surface : core.Data.NurbsSurfaceData, u : number, v : number) : core.Data.Point;

        //Compute a point on a non-uniform, non-rational B spline surface
        // (corresponds to algorithm 3.5 from The NURBS book, Piegl & Tiller 2nd edition)
        //
        //**params**
        //
        //* integer number of basis functions in u dir - 1 = knotsU.length - degreeU - 2
        //* integer number of basis functions in v dir - 1 = knotsV.length - degreeV - 2
        //* NurbsSurfaceData object representing the surface
        //* u parameter at which to evaluate the surface point
        //* v parameter at which to evaluate the surface point
        //
        //**returns**
        //
        //* a point represented by an array of length (dim)

        static surfacePointGivenNM( n : number, m : number, surface : core.Data.NurbsSurfaceData, u : number, v : number ) : core.Data.Point;

        static curveRegularSamplePoints( crv : core.Data.NurbsCurveData, divs : number );

        static curveRegularSamplePoints2( crv : core.Data.NurbsCurveData, divs : number );

            // Compute a regularly spaced grid of derivatives on a non-uniform, rational, B spline surface. Generally, this algorithm
        // is faster than directly evaluating these as we can pre-compute all of the basis function arrays
        //
        //**params**
        //
        //* NurbsSurfaceData object representing the surface
        //* number of divisions in the U direction
        //* number of divisions in the V direction
        //* number of derivatives
        //
        //**returns**
        //
        //* a 2d array of dimension (divsU+1, divsV+1) of derivative values where each entry is similar to that returned by `rationalSurfaceDerivatives`

        static rationalSurfaceRegularSampleDerivatives( surface : core.Data.NurbsSurfaceData, divsU : number, divsV : number, numDerivs : number );

            // Compute a regularly spaced grid of derivatives on a non-uniform, non-rational, B spline surface. Generally, this algorithm
        // is faster than directly evaluating these as we can pre-compute all of the basis function arrays
        //
        //**params**
        //
        //* NurbsSurfaceData object representing the surface
        //* number of divisions in the U direction
        //* number of divisions in the V direction
        //
        //**returns**
        //
        //* a 2d array of dimension (divsU+1, divsV+1) of derivative values where each entry is similar to that returned by surfaceDerivatives

        static surfaceRegularSampleDerivatives( surface : core.Data.NurbsSurfaceData, divsU : number, divsV : number, numDerivs : number );

            // Compute a regularly spaced grid of points on a non-uniform, rational, B spline surface. Generally, this algorithm
        // is faster than directly evaluating these as we can pre-compute all of the basis function arrays
        //
        //**params**
        //
        //* NurbsSurfaceData object representing the surface
        //* number of divisions in the U direction
        //* number of divisions in the V direction
        //
        //**returns**
        //
        //* a 2d array of dimension (divsU+1, divsV+1) of points

        static rationalSurfaceRegularSamplePoints( surface : core.Data.NurbsSurfaceData, divsU : number, divsV : number ) : Array<Array<core.Data.Point>>;

            // Compute a regularly spaced grid of points on a non-uniform, non-rational, B spline surface. Generally, this algorithm
        // is faster than directly evaluating these as we can pre-compute all of the basis function arrays
        //
        //**params**
        //
        //* NurbsSurfaceData object representing the surface
        //* number of divisions in the U direction
        //* number of divisions in the V direction
        //
        //**returns**
        //
        //* a 2d array of dimension (divsU+1, divsV+1) of points

        static surfaceRegularSamplePoints( surface : core.Data.NurbsSurfaceData, divsU : number, divsV : number ) : Array<Array<core.Data.Point>>;

            //Determine the derivatives of a non-uniform, non-rational B-spline curve at a given parameter
        //
        //**params**
        //
        //* NurbsCurveData object representing the curve
        //* parameter on the curve at which the point is to be evaluated
        //* number of derivatives to evaluate
        //
        //**returns**
        //
        //* a point represented by an array of length (dim)

        static curveDerivatives( crv : core.Data.NurbsCurveData, u : number, numDerivs : number ) : Array<core.Data.Point>;

            //Determine the derivatives of a non-uniform, non-rational B-spline curve at a given parameter
        // (corresponds to algorithm 3.1 from The NURBS book, Piegl & Tiller 2nd edition)
        //
        //**params**
        //
        //* integer number of basis functions - 1 = knots.length - degree - 2
        //* NurbsCurveData object representing the curve
        //* parameter on the curve at which the point is to be evaluated
        //
        //**returns**
        //
        //* a point represented by an array of length (dim)

        static curveDerivativesGivenN( n : number, curve : core.Data.NurbsCurveData, u : number, numDerivs : number ) : Array<core.Data.Point> ;

        
        //Compute a point on a non-uniform, non-rational b-spline curve
        //
        //**params**
        //
        //* NurbsCurveData object representing the curve
        //* parameter on the curve at which the point is to be evaluated
        //
        //**returns**
        //
        //* a point represented by an array of length (dim)

        static curvePoint( curve : core.Data.NurbsCurveData, u : number);

            //Confirm the relations between degree (p), number of control points(n+1), and the number of knots (m+1)
        //via The NURBS Book (section 3.2, Second Edition)
        //
        //**params**
        //
        //* integer degree
        //* integer number of control points
        //* integer length of the knot Array (including duplicate knots)
        //
        //**returns**
        //
        //* whether the values are correct

        static areValidRelations( degree : number, num_controlPoints : number, knots_length : number ) : boolean;

            //Compute a point on a non-uniform, non-rational b-spline curve
        // (corresponds to algorithm 3.1 from The NURBS book, Piegl & Tiller 2nd edition)
        //
        //**params**
        //
        //* integer number of basis functions - 1 = knots.length - degree - 2
        //* NurbsCurveData object representing the curve
        //* parameter on the curve at which the point is to be evaluated
        //
        //**returns**
        //
        //* a point represented by an array of length (dim)

        static curvePointGivenN( n : number, curve : core.Data.NurbsCurveData, u : number) : core.Data.Point;

        
        //Compute a point in a non-uniform, non-rational B spline volume
        //
        //**params**
        //
        //* VolumeData
        //* u parameter at which to evaluate the volume point
        //* v parameter at which to evaluate the volume point
        //* w parameter at which to evaluate the volume point
        //
        //**returns**
        //
        //* a point represented by an array of length (dim)

        static volumePoint( volume : core.Data.VolumeData, u : number, v : number, w : number ) : core.Data.Point;

            //Compute a point in a non-uniform, non-rational B spline volume
        //
        //**params**
        //
        //* VolumeData
        //* u parameter at which to evaluate the volume point
        //* v parameter at which to evaluate the volume point
        //* w parameter at which to evaluate the volume point
        //
        //**returns**
        //
        //* a point represented by an array of length (dim)

        static volumePointGivenNML( volume : core.Data.VolumeData,
            n : number,
            m : number,
            l : number,
            u : number,
            v : number,
            w : number  ) : core.Data.Point;

        //Compute the non-vanishing basis functions and their derivatives
        //
        //**params**
        //
        //* float parameter
        //* integer degree
        //* array of nondecreasing knot values
        //
        //**returns**
        //
        //* 2d array of basis and derivative values of size (n+1, p+1) The nth row is the nth derivative and the first row is made up of the basis function values.

        static derivativeBasisFunctions( u : number, degree : number, knots : core.Data.KnotArray ): Array<Array<number>>;

            // Compute the non-vanishing basis functions and their derivatives
        // (corresponds to algorithm 2.3 from The NURBS book, Piegl & Tiller 2nd edition)
        //
        //**params**
        //
        //* integer knot span index
        //* float parameter
        //* integer degree
        //* integer number of basis functions - 1 = knots.length - degree - 2
        //* array of nondecreasing knot values
        //
        //**returns**
        //
        //* 2d array of basis and derivative values of size (n+1, p+1) The nth row is the nth derivative and the first row is made up of the basis function values.

        static derivativeBasisFunctionsGivenNI( knotIndex : number, u : number, p : number,
            n : number, knots : core.Data.KnotArray ) : Array<Array<number>>;

            
        //Compute the non-vanishing basis functions
        //
        //**params**
        //
        //* float parameter
        //* integer degree of function
        //* array of nondecreasing knot values
        //
        //**returns**
        //
        //* list of non-vanishing basis functions
        //

        static basisFunctions( u : number, degree : number, knots : core.Data.KnotArray) : Array<number>;

        
        //Compute the non-vanishing basis functions
        // (corresponds to algorithm 2.2 from The NURBS book, Piegl & Tiller 2nd edition)
        //
        //**params**
        //
        //* *Number*, integer knot span index
        //* *Number*, float parameter
        //* *Number*, integer degree of function
        //* array of nondecreasing knot values
        //
        //**returns**
        //
        //* list of non-vanishing basis functions
        //

        static basisFunctionsGivenKnotSpanIndex( knotSpan_index : number,
            u : number,
            degree : number,
            knots : core.Data.KnotArray ) : Array<number>;

        //Find the span on the knot Array without supplying n
        //
        //**params**
        //
        //* integer degree of function
        //* float parameter
        //* array of nondecreasing knot values
        //
        //**returns**
        //
        //* the index of the knot span
        //

        static knotSpan( degree : number, u : number, knots : Array<number> ) : number;

            //Find the span on the knot Array knots of the given parameter
        // (corresponds to algorithm 2.1 from The NURBS book, Piegl & Tiller 2nd edition)
        //
        //**params**
        //
        //* integer number of basis functions - 1 = knots.length - degree - 2
        //* integer degree of function
        //* parameter
        //* array of nondecreasing knot values
        //
        //**returns**
        //
        //* the index of the knot span
        //

        static knotSpanGivenN( n : number, degree : number, u : number, knots : Array<number> ) : number;

        
        //Dehomogenize a point
        //
        //**params**
        //
        //* a point represented by an array (wi*pi, wi) with length (dim+1)
        //
        //**returns**
        //
        //* a point represented by an array pi with length (dim)

        static dehomogenize( homoPoint : core.Data.Point ) : core.Data.Point;

            //Obtain the point from a point in homogeneous space without dehomogenization, assuming all are the same
        //length
        //
        //**params**
        //
        //* array of points represented by an array (wi*pi, wi) with length (dim+1)
        //
        //**returns**
        //
        //* array of points represented by an array (wi*pi) with length (dim)

        static rational1d( homoPoints : Array<core.Data.Point> ) : Array<core.Data.Point>;

            //Obtain the weight from a collection of points in homogeneous space, assuming all
        //are the same dimension
        //
        //**params**
        //
        //* array of arrays of of points represented by an array (wi*pi, wi) with length (dim+1)
        //
        //**returns**
        //
        //*  array of arrays of points, each represented by an array pi with length (dim)

        static rational2d( homoPoints : Array<Array<core.Data.Point>> ) : Array<Array<core.Data.Point>>;

            //Obtain the weight from a collection of points in homogeneous space, assuming all
        //are the same dimension
        //
        //**params**
        //
        //* array of points represented by an array (wi*pi, wi) with length (dim+1)
        //
        //**returns**
        //
        //* a point represented by an array pi with length (dim)

        static weight1d( homoPoints : Array<core.Data.Point> ) : Array<number>; 

            //Obtain the weight from a collection of points in homogeneous space, assuming all
        //are the same dimension
        //
        //**params**
        //
        //* array of arrays of of points represented by an array (wi*pi, wi) with length (dim+1)
        //
        //**returns**
        //
        //*  array of arrays of points, each represented by an array pi with length (dim)

        static weight2d( homoPoints : Array<Array<core.Data.Point>> ) : Array<Array<number>>;

            //Dehomogenize an array of points
        //
        //**params**
        //
        //* array of points represented by an array (wi*pi, wi) with length (dim+1)
        //
        //**returns**
        //
        //* an array of points, each of length dim

        static dehomogenize1d( homoPoints : Array<core.Data.Point> ) : Array<core.Data.Point>;

        
        //Dehomogenize a 2d array of pts
        //
        //**params**
        //
        //* array of arrays of points represented by an array (wi*pi, wi) with length (dim+1)
        //
        //**returns**
        //
        //* array of arrays of points, each of length dim

        static dehomogenize2d( homoPoints : Array<Array<core.Data.Point>> ) : Array<Array<core.Data.Point>>;

            //Transform a 1d array of points into their homogeneous equivalents
        //
        //**params**
        //
        //* 1d array of control points, (actually a 2d array of size (m x dim) )
        //* array of control point weights, the same size as the array of control points (m x 1)
        //
        //**returns**
        //
        //* 1d array of control points where each point is (wi*pi, wi) where wi
        //i the ith control point weight and pi is the ith control point,
        //hence the dimension of the point is dim + 1

        static homogenize1d( controlPoints : Array<core.Data.Point>, weights : Array<number>) : Array<core.Data.Point>;

            //**params**
        //
        //* 2d array of control points, (actually a 3d array of size m x n x dim)
        //* array of control point weights, the same size as the control points array (m x n x 1)
        //
        //**returns**
        //
        //* 1d array of control points where each point is (wi*pi, wi) where wi
        //i the ith control point weight and pi is the ith control point, the size is
        // (m x n x dim+1)

        static homogenize2d( controlPoints : Array<Array<core.Data.Point>>,
            weights: Array<Array<number>> ) : Array<Array<core.Data.Point>>;

    }

    /**
     * `Check` includes various tools for checking the validity of various NURBS data structures. This is important because it i
     * very easy to construct such data structures with incorrect structure. This class contains static, immutable functions fo
     * doing those checks
     * 
     * Note that the classes in verb.eval are very tolerant of incorrect NURBS data structures for performance reasons.** You shoul
     * perform these checks before using these classes
     */
    class Check {

        /**
         * heck whether a given array is a valid NURBS knot vector. This also checks the validity of the end points
         * ore specifically, this method checks if the knot vector is of the following structure
         * 
         * The knot vector must be non-decreasing and of length (degree + 1) * 2 or greate
         * 
         * [ (degree + 1 copies of the first knot), internal non-decreasing knots, (degree + 1 copies of the last knot)
         * 
         * params*
         * 
         * The knot vector to tes
         * The degre
         * 
         * returns*
         * 
         * Whether the array is a valid knot vector or kno
         */
        static isValidKnotVector(vec:Array<number>, degree:number): boolean;

        /**
         * heck if an array of floating point numbers is non-decreasing, although there may be repeats. This is an importan
         * alidation step for NURBS knot vectors
         * 
         * params*
         * 
         * The data objec
         * 
         * returns*
         * 
         * Whether the array is non-decreasin
         */
        static isNonDecreasing(vec:Array<number>): any;

        //Validate a NurbsCurveData object
        //
        //**params**
        //
        //* The data object
        //
        //**returns**
        //
        //* The original, unmodified data

        static isValidNurbsCurveData( data : core.Data.NurbsCurveData ) : core.Data.NurbsCurveData;

        //Validate a NurbsSurfaceData object
        //
        //**params**
        //
        //* The data object
        //
        //**returns**
        //
        //* The original, unmodified data

        static isValidNurbsSurfaceData( data : core.Data.NurbsSurfaceData ) : core.Data.NurbsSurfaceData

    }

    /**
     * `Analyze` contains static immutable methods for analyzing NURBS geometry. This includes, but is not limited to
     * 
     * Determining the closest points on NURBS geometry to given point
     * Determining knot structur
     * Evaluating geometric properties (like arc length) of NURBS curve
     * Determining the parameter of at arc length of NURBS curve
     */
    class Analyze {

        /**
         * etermine the multiplicities of the values in a knot vecto
         * 
         * params*
         * 
         * array of nondecreasing knot value
         * 
         * returns*
         * 
         * Array of KnotMultiplicity object
         */
        static knotMultiplicities(knots:core.Data.KnotArray): Array<KnotMultiplicity>;

        /**
         * etermine whether a NURBS surface is "closed" in the given direction. Essentially, this determines if the end of th
         * urface in the given direction is continuous at its end. This is an experimental method and not hightly reliable
         * 
         * params*
         * 
         * The NURBS surfac
         * Whether to analyze the continuity in the U direction or the V directio
         * 
         * returns*
         * 
         * Whether the surface is continuous or not in the supplied direction
         */
        static isRationalSurfaceClosed(surface: core.Data.NurbsSurfaceData, uDir?:boolean): boolean;

        
        //Determine the closest point on a NURBS surface to a given point. *This is an experimental method and not hightly reliable.*
        //
        //**params**
        //
        //* The NURBS surface
        //* The point to which we're trying to locate the closest point on the surface
        //
        //**returns**
        //
        //* The closest point on the surface, bounded by the parametric range of the surface

        static rationalSurfaceClosestPoint( surface : core.Data.NurbsSurfaceData, p : core.Data.Point ) : core.Data.Point;

        //Determine the closest parameters on a NURBS surface to a given point. *This is an experimental method and not hightly reliable.*
        //
        //**params**
        //
        //* The NURBS surface
        //* The point to which we're trying to locate the closest parameters on the surface
        //
        //**returns**
        //
        //* The closest parameters on the surface, bounded by the parametric domain of the surface

        static rationalSurfaceClosestParam( surface : core.Data.NurbsSurfaceData, p : core.Data.Point ) : core.Data.UV;

        //Determine the closest point on a NURBS curve to a given point.
        //
        //**params**
        //
        //* The NURBS curve
        //* The point to which we're trying to locate the closest point on the curve
        //
        //**returns**
        //
        //* The closest point on the surface, bounded by the parametric domain of the surface

        static rationalCurveClosestPoint( curve : core.Data.NurbsCurveData, p : core.Data.Point ) : core.Data.Point;

        //Determine the closest parameters on a NURBS curve to a given point.
        //
        //**params**
        //
        //* The NURBS curve
        //* The point to which we're trying to locate the closest parameter on the curve
        //
        //**returns**
        //
        //* The closest parameter on the curve, bounded by the parametric domain of the curve

        static rationalCurveClosestParam( curve : core.Data.NurbsCurveData, p : core.Data.Point ) : number;

        //Approximate the parameter at a given arc length on a NURBS curve
        //
        //**params**
        //
        //* The curve for which to do the procedure
        //* The arc length for which to do the procedure
        //* the tolerance - increasing the tolerance can make this computation quite expensive
        //* The curve decomposed into a sequence of beziers - this will be computed if omitted but speeds up the computation computed repeatedly
        //* The lengths of the beziers after being decomposed
        //
        //**returns**
        //
        //* The parameter

        static rationalCurveParamAtArcLength(curve : core.Data.NurbsCurveData,
            len : number,
            tol : number,
            beziers : Array<core.Data.NurbsCurveData>,
            bezierLengths : Array<number> ) : number; 

        //Get the curve parameter at an arc length
        //
        //**params**
        //
        //* NurbsCurveData object representing the curve
        //* the arc length to find the parameter
        //* the tolerance - increasing the tolerance can make this computation quite expensive
        //* the total length of the curve, if already computed
        //
        //**returns**
        //
        //* the parameter

        static rationalBezierCurveParamAtArcLength(curve : core.Data.NurbsCurveData,
            len : number, 
            tol : number, 
            totalLength : number) : number;

        //Approximate the length of a rational curve by gaussian quadrature - assumes a smooth curve
        //
        //**params**
        //
        //* NurbsCurveData object representing the curve
        //* the parameter at which to approximate the length
        //* the degree of gaussian quadrature to perform - a higher number yields a more exact result
        //
        //**returns**
        //
        //* the approximate length

        static rationalCurveArcLength(curve : core.Data.NurbsCurveData, u : number, gaussDegIncrease : number);

        //Approximate the length of a rational bezier curve by gaussian quadrature - assumes a smooth curve
        //
        //**params**
        //
        //* NurbsCurveData object representing the curve
        //* the parameter at which to approximate the length
        //* the degree of gaussian quadrature to perform - a higher number yields a more exact result
        //
        //**returns**
        //
        //* the approximate length

        static rationalBezierCurveArcLength(curve : core.Data.NurbsCurveData, u : number, gaussDegIncrease : number) : number;

    }

    class KnotMultiplicity {

        // The parameter of the knot
        knot : number;
    
        // The multiplicity (i.e. the number of repeated occurrences) of the given knot in a knot vector
        mult : number;
    
        // Create a new KnotMultiplicity object
        //**params**
        //
        //* The knot position
        //* The multiplicity of the knot
    
        new(knot : number, mult : number );
    
        // Increments the multiplicity of the knot
        inc();
    }

    class IBoundingBoxTree<T>
    {
        constructor();
        boundingBox(): core.BoundingBox;
        split(): core.Data.Pair<IBoundingBoxTree<T>, IBoundingBoxTree<T>>;
        yield(): T;
        indivisible(tolerance: number): boolean;
        empty(): boolean;
    }
    /**
         * `Intersect` provides various tools for all kinds of intersection. This includes but not limited to
         * 
         * curve
         * surface
         * meshe
         * polyline
         * 
         * Under the hood, most of these algorithms call the recursive bounding box intersection algorith
         * (`Intersect.boundingBoxTrees<T1, T2>`) followed by some kind of minimization
         */
    class Intersect
    {
        //Intersect two NURBS surfaces, yielding a list of curves
        //
        //**params**
        //
        //* NurbsSurfaceData for the first surface
        //* NurbsSurfaceData for the second
        //
        //**returns**
        //
        //* array of NurbsCurveData objects

        static surfaces(surface0: core.Data.NurbsSurfaceData, surface1: core.Data.NurbsSurfaceData, tol: number): Array<core.Data.NurbsCurveData>;

        //Refine a pair of surface points to a point where the two surfaces intersect
        //
        //**params**
        //
        //* NurbsSurfaceData for the first surface
        //* NurbsSurfaceData for the second
        //* the UV for the point on the first surface
        //* the UV for the point on the second surface
        //* a tolerance value to terminate the refinement procedure
        //
        //**returns**
        //
        //* a SurfaceSurfaceIntersectionPoint object

        static surfacesAtPointWithEstimate(surface0: core.Data.NurbsSurfaceData,
            surface1: core.Data.NurbsSurfaceData,
            uv1: core.Data.UV,
            uv2: core.Data.UV,
            tol: number): core.Intersections.SurfaceSurfaceIntersectionPoint;


        //Intersect two meshes, yielding a list of polylines
        //
        //**params**
        //
        //* MeshData for the first mesh
        //* MeshData for the latter
        //* optional boundingbox tree for first mesh
        //* optional boundingbox tree for second mesh
        //
        //**returns**
        //
        //* array of array of MeshIntersectionPoints

        static meshes(mesh0: core.Data.MeshData,
            mesh1: core.Data.MeshData,
            bbtree0?: eval.IBoundingBoxTree<number>/* = null*/,
            bbtree1?: eval.IBoundingBoxTree<number>/* = null*/): Array<Array<core.Intersections.MeshIntersectionPoint>>;


        //Slice a mesh by repeated planar intersections yielding a sequence of polylines. Each plane
        //is along the z axis, so you'll need to transform your mesh if you wish to cut in any other direction.
        //
        //**params**
        //
        //* MeshData for the mesh to be sliced
        //* Minimum z value
        //* Maximum z value
        //* Step size
        //
        //**returns**
        //
        //* array of array of array of MeshIntersectionPoints - corresponding to the collection of polylines formed with
        // each slice


        static meshSlices(mesh: core.Data.MeshData, min: number, max: number, step: number): Array<Array<Array<core.Intersections.MeshIntersectionPoint>>>;


        //Given a list of unstructured mesh intersection segments, reconstruct into polylines
        //
        //**params**
        //
        //* unstructured collection of segments
        //
        //**returns**
        //
        //* array of array of MeshIntersectionPoint

        static makeMeshIntersectionPolylines(segments: Array<core.Data.Interval<core.Intersections.MeshIntersectionPoint>>): Array<Array<core.Intersections.MeshIntersectionPoint>>;


        //Given a segment end
        //
        //**params**
        //
        //* unstructured collection of segments
        //
        //**returns**
        //
        //* array of array of MeshIntersectionPoint

        static lookupAdjacentSegment(segEnd: core.Intersections.MeshIntersectionPoint, tree: core.KdTree<core.Intersections.MeshIntersectionPoint>, numResults: number);


        //Get the intersection of a NURBS curve and a NURBS surface without an estimate
        //
        //**params**
        //
        //* NurbsCurveData
        //* NurbsSurfaceData
        //* tolerance for the curve intersection
        //
        //**returns**
        //
        //* array of CurveSurfaceIntersection objects

        static curveAndSurface(curve: core.Data.NurbsCurveData,
            surface: core.Data.NurbsSurfaceData,
            tol: number/* = 1e-3*/,
            crvBbTree?: IBoundingBoxTree<core.Data.NurbsCurveData>/* = null*/,
            srfBbTree?: IBoundingBoxTree<core.Data.NurbsSurfaceData>/* = null */): Array<core.Intersections.CurveSurfaceIntersection>;



        //Refine an intersection pair for a surface and curve given an initial guess.  This is an unconstrained minimization,
        //so the caller is responsible for providing a very good initial guess.
        //
        //**params**
        //
        //* NurbsCurveData
        //* NurbsSurfaceData
        //* array of initial parameter values [ u_crv, u_srf, v_srf ]
        //
        //**returns**
        //
        //* a CurveSurfaceIntersection object

        static curveAndSurfaceWithEstimate(curve: core.Data.NurbsCurveData,
            surface: core.Data.NurbsSurfaceData,
            start_params: Array<number>,
            tol?/* number = 1e-3*/): core.Intersections.CurveSurfaceIntersection;



        //Approximate the intersection of a polyline and mesh while maintaining parameter information
        //
        //**params**
        //
        //* PolylineData
        //* MeshData
        //
        //**returns**
        //
        //* an array of PolylineMeshIntersection object

        static polylineAndMesh(polyline: core.Data.PolylineData,
            mesh: core.Data.MeshData,
            tol: number): Array<core.Intersections.PolylineMeshIntersection>;

        //Approximate the intersection of two NURBS curves
        //
        //**params**
        //
        //* NurbsCurveData object representing the first NURBS curve
        //* NurbsCurveData object representing the second NURBS curve
        //* tolerance for the intersection
        //
        //**returns**
        //
        //* the intersections

        static curves(curve1: core.Data.NurbsCurveData, curve2: core.Data.NurbsCurveData, tolerance?: number): Array<core.Intersections.CurveCurveIntersection>;


        //Refine an intersection pair for two curves given an initial guess.  This is an unconstrained minimization,
        //so the caller is responsible for providing a very good initial guess.
        //
        //**params**
        //
        //* NurbsCurveData object representing the first NURBS curve
        //* NurbsCurveData object representing the second NURBS curve
        //* guess for first parameter
        //* guess for second parameter
        //* tolerance for the intersection
        //
        //**returns**
        //
        //* array of CurveCurveIntersection objects

        private static curvesWithEstimate(curve0: core.Data.NurbsCurveData,
            curve1: core.Data.NurbsCurveData,
            u0: number,
            u1: number,
            tolerance: number): core.Intersections.CurveCurveIntersection;

        //Intersect two triangles
        //
        //**params**
        //
        //* array of length 3 arrays of numbers representing the points of mesh1
        //* array of length 3 arrays of number representing the triangles of mesh1
        //* array of length 3 arrays of numbers representing the points of mesh2
        //* array of length 3 arrays of number representing the triangles of mesh2
        //
        //**returns**
        //
        //* a point represented by an array of length (dim)

        static triangles(mesh0: core.Data.MeshData, faceIndex0: number, mesh1: core.Data.MeshData, faceIndex1: number): core.Data.Interval<core.Intersections.MeshIntersectionPoint>;

        static clipRayInCoplanarTriangle(ray: core.Data.Ray, mesh: core.Data.MeshData, faceIndex: number): core.Data.Interval<core.Intersections.CurveTriPoint>;

        static mergeTriangleClipIntervals(clip1: core.Data.Interval<core.Intersections.CurveTriPoint>, clip2: core.Data.Interval<core.Intersections.CurveTriPoint>,
            mesh1: core.Data.MeshData, faceIndex1: number, mesh2: core.Data.MeshData, faceIndex2: number): core.Data.Interval<core.Intersections.MeshIntersectionPoint>;


        //Intersect two planes, yielding a Ray
        //
        //**params**
        //
        //* point in plane 0
        //* normal to plane 0
        //* point in plane 1
        //* normal to plane 1
        //
        //**returns**
        //
        //* a point represented by an array of length (dim)

        static planes(origin0: core.Data.Point, normal0: core.Data.Vector, origin1: core.Data.Point, normal1: core.Data.Vector): core.Data.Ray;


        //Intersect three planes, expects the planes to form a single point of
        //intersection
        //
        //**params**
        //
        //* normal for plane 0
        //* d for plane 0 ( where the plane eq is normal * (x,y,z) = d )
        //* normal for plane 1
        //* d for plane 1 ( where the plane eq is normal * (x,y,z) = d )
        //* normal for plane 2
        //* d for plane 2 ( where the plane eq is normal * (x,y,z) = d )
        //
        //**returns**
        //
        //* the point representing the intersection

        static threePlanes(n0: core.Data.Point, d0: number, n1: core.Data.Point, d1: number, n2: core.Data.Point, d2: number): core.Data.Point;

        //Intersect two polyline curves, keeping track of parameterization on each
        //
        //**params**
        //
        //* PolylineData for first polyline
        //* PolylineData for second polyline
        //* tolerance for the intersection
        //
        //**returns**
        //
        //* array of parameter pairs representing the intersection of the two parameteric polylines

        static polylines(polyline0: core.Data.PolylineData, polyline1: core.Data.PolylineData, tol: number)
            : Array<core.Intersections.CurveCurveIntersection>


        //Find the closest parameter on two rays, see http://geomalgorithms.com/a07-_distance.html
        //
        //**params**
        //
        //* first end of the first segment
        //* second end of the first segment
        //* first end of the second segment
        //* second end of the second segment
        //* tolerance for the intersection
        //
        //**returns**
        //
        //* a CurveCurveIntersection object

        static segments(a0: core.Data.Point, a1: core.Data.Point, b0: core.Data.Point, b1: core.Data.Point, tol: number): core.Intersections.CurveCurveIntersection

        //Find the closest parameter on two rays, see http://geomalgorithms.com/a07-_distance.html
        //
        //**params**
        //
        //* origin for ray 1
        //* direction of ray 1, assumed normalized
        //* origin for ray 1
        //* direction of ray 1, assumed normalized
        //
        //**returns**
        //
        //* a CurveCurveIntersection object

        static rays(a0: core.Data.Point, a: core.Data.Point, b0: core.Data.Point, b: core.Data.Point): core.Intersections.CurveCurveIntersection

        //  Intersect segment with triangle (from http://geomalgorithms.com/a06-_intersect-2.html)
        //
        //**params**
        //
        //* array of length 3 representing first point of the segment
        //* array of length 3 representing second point of the segment
        //* array of length 3 arrays representing the points of the triangle
        //* array of length 3 containing int indices in the array of points, this allows passing a full mesh
        //
        //**returns**
        //
        //* a TriangleSegmentIntersection or null if failed

        static segmentWithTriangle(p0: core.Data.Point, p1: core.Data.Point, points: Array<core.Data.Point>, tri: core.Data.Tri): core.Intersections.TriSegmentIntersection

        //  Intersect ray/segment with plane (from http://geomalgorithms.com/a06-_intersect-2.html)
        //
        //  If intersecting a ray, the param needs to be between 0 and 1 and the caller is responsible
        //  for making that check
        //
        //**params**
        //
        //* array of length 3 representing first point of the segment
        //* array of length 3 representing second point of the segment
        //* array of length 3 representing an origin point on the plane
        //* array of length 3 representing the normal of the plane
        //
        //**returns**
        //null or an object with a p property representing the param on the segment

        static segmentAndPlane(p0: core.Data.Point, p1: core.Data.Point, v0: core.Data.Point, n: core.Data.Point)

        /**
         * ntersect two NURBS surfaces, yielding a list of curve
         * 
         * params*
         * 
         * NurbsSurfaceData for the first surfac
         * NurbsSurfaceData for the secon
         * 
         * returns*
         * 
         * array of NurbsCurveData object
         */
        // static surfaces(surface0: NurbsSurfaceData, surface1: NurbsSurfaceData, tol: number): Array<NurbsCurveData>;
        static polylines(polyline0: core.PolylineData, polyline1: core.PolylineData, tol: number): Array<core.Intersections.CurveCurveIntersection>;

    }

    /**
    * Divide provides various tools for dividing and splitting NURBS geometry
    */
    class Divide
    {

        /**
         * plit a NURBS surface in two at a given paramete
         * 
         * params*
         * 
         * The surface to spli
         * The parameter at which to split the surfac
         * Whether to split in the U direction or V direction of the surfac
         * 
         * returns*
         * 
         * A length two array of new surface
         */
        static surfaceSplit(surface: core.Data.NurbsSurfaceData, u: number, useV?: boolean): Array<core.Data.NurbsSurfaceData>;

        /**
         * di
         * plit a NURBS curve into two parts at a given paramete
         * 
         * params*
         * 
         * NurbsCurveData object representing the curv
         * location to split the curv
         * 
         * returns*
         * 
         * Array* two new curves, defined by degree, knots, and control pointpoint
         */
        static curveSplit(curve: core.Data.NurbsCurveData, u: number): Array<core.Data.NurbsCurveData>;

        /**
         * ivide a NURBS curve given a given number of times, including the end points. The result is not split curve
         * ut a collection of `CurveLengthSample` objects that can be used for splitting. As with all arc length methods
         * he result is an approximation
         * 
         * params*
         * 
         * NurbsCurveData object representing the curv
         * The number of parts to split the curve int
         * 
         * returns*
         * 
         * An array of `CurveLengthSample` object
         */
        static rationalCurveByEqualArcLength(curve: core.Data.NurbsCurveData, num: number): Array<CurveLengthSample>;

        /**
         * ivide a NURBS curve given a given number of times, including the end points
         * 
         * params*
         * 
         * NurbsCurveData object representing the curv
         * The arc length separating the resultant sample
         * 
         * returns*
         * 
         * A sequence of `CurveLengthSample` object
         */
        static rationalCurveByArcLength(curve: core.Data.NurbsCurveData, l: number): Array<CurveLengthSample>;

    }

    class CurveLengthSample
    {
        u: number;//float
        len: number;//float

        constructor(u: number, len: number);
    }
}