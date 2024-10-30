$(function(){ // on dom ready

    var pts = [[0,0,0], [10,0,0], [10,10,0] ] //, [20,10,0], [20,20,0], [0,20,0] ]
    var s = verb.topo.Make.extrusion( pts, [0,0,10] );    // hollowPrism();

    var p = { n : [0,0,1], o : [0,0,5] };
    var r = verb.topo.Split.split( s, p );

//    s = r.item1;

    var faces = s.faces();
//    var vertices = s.vertices();

    var eles = faces;

    var graphEdges = eles.reduce(function(a, f){
        return a.concat(
             f.neighbors().map(function(fo){
                return { data: { source: f.id.toString(), target: fo.id.toString() } };
            }));
    }, []);

    var graphNodes = eles.map(function(x){

//        var pos = verb.core.Vec.sub( x.l.e.v.pt, [5,15,-2]);
//
//        var r = 3 * pos[2];
//
//        var xp = x.pt[0] + r * pos[0];
//        var yp = x.pt[1] + r * pos[1];

        return { data: { id: x.id.toString(), name: 'Ele' + x.id.toString() } };
    });

    $('#cy').cytoscape({
      style: cytoscape.stylesheet()
        .selector('node')
          .css({
            'content': 'data(name)'
          })
        .selector('edge')
          .css({
            'target-arrow-shape': 'triangle'
          })
        .selector(':selected')
          .css({
            'background-color': 'black',
            'line-color': 'black',
            'target-arrow-color': 'black',
            'source-arrow-color': 'black'
          })
        .selector('.faded')
          .css({
            'opacity': 0.25,
            'text-opacity': 0
          }),

      elements: {
        nodes: graphNodes,
        edges: graphEdges
      },

      layout: {
        name: 'grid'
      },

      // on graph initial layout done (could be async depending on layout...)
      ready: function(){
        window.cy = this;

        // giddy up...

        cy.elements().unselectify();

      }
    });

}); // on dom ready