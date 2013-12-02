module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    
    pkg: grunt.file.readJSON('package.json'),

    // concat step
    concat: {
      build: {
        files: {
          'build/<%= pkg.name %>.js': [ 'src/verb.js', 
                                        'src/core/*.js', 
                                        'src/geom/base/Geometry.js', 
                                        'src/geom/base/NurbsGeometry.js', 
                                        'src/geom/base/NurbsCurve.js', 
                                        'src/geom/base/NurbsSurface.js', 
                                        'src/geom/*.js', 
                                        'src/intersect/*.js', 
                                        'src/eval/nurbs.js' ],
          'build/<%= pkg.name %>_nurbs_eval.js': ['src/eval/eval_header.js', 'src/eval/nurbs.js']
        }
      }
    },

    // uglify step
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        files: {
          'build/<%= pkg.name %>.min.js': ['build/<%= pkg.name %>.js'],
          'build/<%= pkg.name %>_nurbs_eval.min.js': ['build/<%= pkg.name %>_nurbs_eval.js']
        }
      }
    },

    // test
    simplemocha: {
      all: {
        src: 'test/test.js', 
        options: {
          globals: ['should'],
          ui: 'bdd',
          reporter: 'tap'
        },
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-simple-mocha');

  var build_steps = ['concat', 'uglify'];
  grunt.registerTask('default', build_steps );
  grunt.registerTask('build', build_steps);
  grunt.registerTask('test', ['concat', 'simplemocha']);


};