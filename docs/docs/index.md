# verb

## What is verb?

verb is a library for creating and manipulating NURBS surfaces and curves in many languages including JavaScript.

verb provides advanced tools like derivative evaluation, adaptive tessellation, and intersection. Verb provides a 
concurrent execution runtime via WebWorkers in modern browsers and thread pools on other platforms and is suitable 
for use in a datacenter or in the browser.

verb is not a graphics library. It nicely compliments web graphics libraries like three.js, but is happy to live without
one.

## How is verb organized?

The library is split into four parts:

* **verb.geom** - Geometric types that make it easy to work with NURBS. Includes many commonly used curve and surface types.
* **verb.core** - Mathematical and geometric utilities that are shared throughout the library.
* **verb.eval** - Fundamental NURBS algorithms for evaluation, intersection, analysis, and more.
* **verb.exe** - Tools for managing multi-core evaluation on different platforms.

**Most people should just use verb.geom.** The other parts provide more powerful features and more direct access to 
core parts of the library.

## Platforms

verb compiles for:

* JavaScript
* C#
* C++
* Python
* PHP

## Getting started

Install <a href="http://haxe.org/">haxe</a> and <a href="http://nodejs.org/">node.js</a>

You should have installed **haxe** and **node.js**.

  haxe --version

  node --version

Install node.js dependencies:

	npm install

Install haxe dependencies:

	haxelib install promhx

## Using with JavaScript

You can install verb with npm
    
  npm install verb-nurbs
    
You can use verb with require.js (AMD) or browserify (commonjs) in the browser or in node.js.

Pre-compiled JavaScript can be found in [build/js](https://github.com/pboyer/verb/blob/master/build/js).

You'll find many usage examples in the [examples directory](https://github.com/pboyer/verb/blob/master/examples).

## Compiling for JavaScript

Compile to javascript:

	npm run build

Run all unit tests:

	npm run test

## Compiling for C&#35;
 
If you're using OS X, ensure that you have installed XCode 7.

Install [mono](http://www.mono-project.com/docs/getting-started/install/)

Install hxcs:

    haxelib install hxcs
    
Build:

    haxe buildcs.hxml
    
Output goes to build/cs.

## Compiling for C++

If you're using OS X, ensure that you have installed XCode 7.

Install hxcpp:

    haxelib install hxcpp
    
Build:

    haxe buildcpp.hxml

Output goes to build/cpp. 

## Compiling for Python

Make sure python is installed.

Build:

    haxe buildpython.hxml
    
Output goes to build/verb.py

## Compiling for PHP

Build:

    haxe buildphp.hxml
    
Output goes to build/php

## Compiling for other platforms

Haxe compiles for other platforms, including Flash and Neko. I have not tried to compile for these platforms - [would you like to contribute?](http://github.com/pboyer/verb)

### Compiling for Java

verb does not currently compile for Java. It probably wouldn't be hard to do - [would you like to contribute?](http://github.com/pboyer/verb)
    
## Using verb with three.js

You can find good examples of using verb with three in the examples directory. There's an example code showing how
to convert verb geometric types in to three.js Meshes and Lines [in the verb examples](https://github.com/pboyer/verb/blob/master/examples/js/verbToThreeConversion.js).
