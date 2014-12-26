// ###new NurbsGeometry()
//
// Constructor for Geometry
//
// Geometry is the base class for all Geometry types
verb.Geometry = function() { 

	verb.WatchObject.call(this);

	var id = verb.uid();
	
	this.uniqueId = function() {
		return id;
	};

}.inherits(verb.WatchObject);