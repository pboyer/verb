# verb 2.0.0 docs

**verb is a library for manipulating NURBS geometry.** It does some other things well, but that's the main focus.

**[Project website](http://www.verbnurbs.com)**

**[Repository](http://github.com/pboyer/verb)**

## Library Structure

The library is split into four parts:

* **verb.core** - Mathematical and geometric utilities that are shared throughout the library.
* **verb.eval** - Fundamental NURBS algorithms for evaluation, intersection, analysis, and more.
* **verb.exe** - Tools for managing multi-core evaluation on different platforms.
* **verb.geom** - Geometric types that make it easy to work with NURBS without knowing much.

## Getting started


Install <a href="http://haxe.org/">haxe</a> and <a href="http://haxe.org/">node.js</a>

You should have installed **haxe 3.2.1** and **node.js 4.2.1**. If you're using OS X, ensure that you have installed XCode 7.

Install node.js dependencies:

	npm install

Install haxe dependencies:

	haxelib install promhx

Install grunt:

	npm install -g grunt-cli

### Compiling for JavaScript

Compile to javascript:

	grunt build

Run all unit tests:

	grunt test

### Compiling for C&#35;
 
Install [mono](http://www.mono-project.com/docs/getting-started/install/)

Install hxcs:

    haxelib install hxcs
    
Build:

    haxe buildcs.hxml
    
Output goes to build/cs.

### Compiling for C++

Install hxcpp:

    haxelib install hxcpp
    
Build:

    haxe buildcpp.hxml

Output goes to build/cpp. 

### Compiling for Python

Make sure python is installed.

Build:

    haxe buildpython.hxml
    
Output goes to build/verb.py

### Compiling for PHP

verb does not currently compile for Java. It probably wouldn't be hard to do. [Would you like to contribute?](http://github.com/pboyer/verb)
    

### Compiling for Java

verb does not currently compile for Java. It probably wouldn't be hard to do. [Would you like to contribute?](http://github.com/pboyer/verb)
    
