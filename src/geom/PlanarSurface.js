// ###new PlanarSurface( base, uaxis, vaxis, ulength, vlength )
//
// Constructor for PlanarSurface
//
// **params**
// + *Array*, Length 3 array representing the base point
// + *Array*, Length 3 array representing the uaxis, defines the one axis of the planar surface
// + *Array*, Length 3 array representing the vaxis, defines the one second axis of the planar surface
// + *Number*, Length in the u direction 
// + *Number*, Length in the v direction
//
verb.geom.PlanarSurface = function( base, uaxis, vaxis, ulength, vlength ) {

	verb.geom.NurbsSurface.call(this);

	this.setAll({
		"base": base,
		"uaxis": uaxis,
		"vaxis": vaxis,
		"ulength": ulength,
		"vlength": vlength
	});

	this.update();

	this.watchAll( ['base', 'uaxis', 'vaxis', 'ulength', 'vlength'], this.update );

}.inherits(verb.geom.NurbsSurface);

// #### nurbsRep()
//
// Construct the Nurbs representation
verb.geom.PlanarSurface.prototype.nurbsRep = function(){

	var p1 = this.get('base')
		, uedge = numeric.mul( this.get('uaxis'), this.get('ulength'))
		, vedge = numeric.mul( this.get('vaxis'), this.get('vlength'))
		, p2 = numeric.add( p1, uedge )
		, p3 = numeric.add( p1, vedge, uedge )
		, p4 = numeric.add( p1, vedge );

	return this.nurbsEngine.eval( 'get_4pt_surface', [ p1, p2, p3, p4 ]);

};