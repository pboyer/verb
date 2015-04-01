$(function(){ // on dom ready

    function triangularLamina(){
        var s = verb.topo.Solid.mvfs( [0,0,0] );

        var e0 = s.f.l.e;
        var v0 = s.v;
        var f0 = s.f;

        var nv0 = s.lmev( e0, e0, [10,0,0] );
        nv1 = s.lmev( nv0.e, nv0.e, [10,10,0] );

        var nf = s.lmef( v0.e, v0.e.nxt.nxt );

        return s;
    }

    function triangularPrism(){
        var s = triangularLamina();

        var nvs = s.f.l.halfEdges().map(function(e){
            return s.lmev( e, e, verb.core.Vec.add( e.v.pt, [0,0,1]) );
        });

        var nfs = nvs
            .map(function(v){
                return v.e;
            })
            .map(function(e){
                var nf = s.lmef(e, e.nxt.nxt.nxt);
                return nf;
            });

        return s;
    }

    var pts = [[0,0,0], [10,0,0], [10,10,0], [20,10,0], [20,20,0], [0,20,0] ]
    var s = verb.topo.Make.extrusion( pts, [-5,5,10] );    // hollowPrism();

    var faces = s.faces();
    var vertices = s.vertices();

    var eles = vertices;

    var graphEdges = eles.reduce(function(a, f){
        return a.concat(
             f.neighbors().map(function(fo){
                return { data: { source: f.id.toString(), target: fo.id.toString() } };
            }));
    }, []);

    var graphNodes = eles.map(function(x){
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
        name: 'grid',
        padding: 10
      },

      // on graph initial layout done (could be async depending on layout...)
      ready: function(){
        window.cy = this;

        // giddy up...

        cy.elements().unselectify();

        cy.on('tap', 'node', function(e){
          var node = e.cyTarget;
          var neighborhood = node.neighborhood().add(node);

          cy.elements().addClass('faded');
          neighborhood.removeClass('faded');
        });

        cy.on('tap', function(e){
          if( e.cyTarget === cy ){
            cy.elements().removeClass('faded');
          }
        });
      }
    });

}); // on dom ready