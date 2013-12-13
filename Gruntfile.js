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
                                        'src/eval/eval.js' ],
          'build/<%= pkg.name %>Eval.js': ['src/eval/header.js', 'src/eval/eval.js']
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
          'build/<%= pkg.name %>Eval.min.js': ['build/<%= pkg.name %>Eval.js']
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
    },

    // docs
    docco: {
      debug: {
        src: ['build/verb.js'],
        options: {
          output: 'docs/'
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-docco');

  var build_steps = ['concat', 'uglify', 'docco'];
  grunt.registerTask('default', build_steps );
  grunt.registerTask('build', build_steps);
  grunt.registerTask('test', ['concat', 'simplemocha']);


};