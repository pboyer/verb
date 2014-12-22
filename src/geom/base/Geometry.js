// ###new NurbsGeometry()
//
// Constructor for Geometry
//
// Geometry is the base class for all Geometry types
verb.Geometry = function() { 

	verb.core.WatchObject.call(this);

	var id = verb.core.uid();
	
	this.uniqueId = function() {
		return id;
	};

}.inherits(verb.core.WatchObject);