# The Verb 2.0.0 Docs

verb is a library for manipulating NURBS geometry. It does some other things well, but that's the main focus.

## Library Structure

The library is split into several parts:

* **core** - Mathematical and geometric utilities that are shared throughout the library.
* **eval** - Fundamental NURBS algorithms for evaluation, intersection, analysis, and more.
* **exe** - Tools for managing multi-core evaluation on different platforms.
* **geom** - Geometric types that make it easy to work with NURBS without knowing much.

## Platforms

verb is written in Haxe. Haxe compiles to more than one language. It's JavaScript output is superb. The rest is so-so,
but still extremely valuable.