[![Build Status](https://travis-ci.org/pboyer/verb.svg?branch=master)](https://travis-ci.org/pboyer/verb)

# verb

### Open-source, cross-platform NURBS

<strong>verb</strong> is a library for creating and manipulating NURBS surfaces and curves in many languages including JavaScript.

verb provides advanced tools like derivative evaluation, adaptive tessellation, and intersection.  Verb provides a concurrent execution runtime via WebWorkers in modern browsers and thread pools on other platforms and is suitable for use in a datacenter or in the browser.

### API Status : Stable

### Getting started

Install <a href="http://haxe.org/">haxe</a> and <a href="http://haxe.org/">node.js</a>

You should have installed **haxe 3.2.1** and **node.js 4.2.1**. If you're using OS X, ensure that you have installed XCode 7.

Install node.js dependencies:

	npm install

Install haxe dependencies:

	sudo haxelib install promhx

Install grunt:

	npm install -g grunt-cli

Compile to javascript:

	grunt build

Run all unit tests:

	grunt test

### License

The MIT License (MIT)

Copyright (c) Peter Boyer 2014-2015

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

