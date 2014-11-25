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
                                        'src/eval/intersect.js',
                                        'src/eval/tessellate.js',
                                        'src/eval/geom.js',
                                        'src/eval/eval.js' ],
          'build/<%= pkg.name %>Eval.js': [ 'src/eval/header.js', 
                                            'src/eval/intersect.js', 
                                            'src/eval/tessellate.js', 
                                            'src/eval/geom.js', 
                                            'src/eval/eval.js']
        }
      }
    },

    // Configure a mochaTest task
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          quiet: false // Optionally suppress output to standard out (defaults to false)
        },
        src: ['test/test.js']
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

    benchmark: {
      all: {
        src: ['benchmark/*.js']
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

  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-docco');
  grunt.loadNpmTasks('grunt-benchmark');

  var build_steps = ['concat', 'uglify', 'docco'];
  grunt.registerTask('default', build_steps );
  grunt.registerTask('build', build_steps);
  grunt.registerTask('test', ['concat', 'mochaTest']);
  grunt.registerTask('test', ['concat', 'benchmark']);


};