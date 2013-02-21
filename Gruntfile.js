module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    
    pkg: grunt.file.readJSON('package.json'),

    // concat step
    concat: {
      build: {
        files: {
          'build/<%= pkg.name %>.js': ['src/VERB.js', 'src/core/*.js', 'src/geom/*.js', 'src/eval/nurbs.js' ],
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

    simplemocha: {
      options: {
        globals: ['should'],
        grep: '*-test',
        ui: 'bdd',
        reporter: 'tap'
      },

      all: { src: 'test/test.js' }
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