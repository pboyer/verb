#verb
###A CAD Library for the Web
####Current version: 0.1.0

<strong>verb</strong> is a JavaScript library for creating and manipulating <a href="http://en.wikipedia.org/wiki/Non-uniform_rational_B-spline">NURBS</a> surfaces and curves in the browser or <a href="http://nodejs.org/">node.js</a>.  It provides a rich set of features with <a href="geometry.html">many types of surfaces and curves</a> in a <a href="http://verbnurbs.com.s3-website-us-east-1.amazonaws.com/js/verb.min.js">10kb (gzipped, minified) package</a>.

verb also provides advanced tools like derivative evaluation, adaptive tesselation, and intersection.  Geometry can be "watched" in a <a href="http://backbonejs.org/">backbone-like</a> style and defaults to multi-threaded parallel execution via <a href="http://en.wikipedia.org/wiki/Web_worker">WebWorkers</a> in modern browsers.  

###Documentation

The latest build of the documentation is located [here](http://verbnurbs.com.s3-website-us-east-1.amazonaws.com/docs/verb.html)

###Latest build

The *kernel* provides nice geometric types like NurbsSurface and an abstraction around external execution of the *library*, which is the stripped down stateless library.  

+ [Latest kernel 0.1.0](https://raw.github.com/pboyer/verb/master/build/verb.min.js)
+ [Latest library 0.1.0](https://raw.github.com/pboyer/verb/master/build/verbEval.min.js)

###Getting started

Install dependencies:

	npm install

Build compiled library and documentation:

	grunt 

Run all unit tests (>160 in total):

	grunt test


###License

The MIT License (MIT)

Copyright (c) Peter Boyer 2014

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

