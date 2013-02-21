if ( typeof exports != 'object' || exports === undefined )  // browser context
{
	importScripts('labor.js');  
}
else // node.js context
{
	var labor = require('labor');
}

var VERB = VERB || {};
VERB.eval = VERB.eval || {};
VERB.eval.nurbs = VERB.eval.nurbs || {};

var router = new labor.Router(VERB.eval.nurbs);