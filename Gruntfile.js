module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      build: {
        files: {
          'build/js/verb.js': [ 'src/support/header.js',
                                        'build/js/verbHaxe.js',
                                        'src/support/footer.js',]
        }
      }
    },

    replace: {
      build: {
        src: ['build/js/verbHaxe.js'],
        overwrite: true,                 // overwrite matched source files
        replacements: [{
          from: '{log:function(){}}, typeof window != "undefined" ? window : exports',
          to: '{log:function(){}}, verb'
        }]
      }
    },

    uglify: {
      options: {
        banner: '/*! verb <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        files: {
          'build/js/verb.min.js': ['build/js/verb.js']
        }
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          quiet: false // Optionally suppress output to standard out (defaults to false)
        },
        src: ['test/testCore.js', 'test/testEval.js', 'test/testGeom.js']
      }
    },

    benchmark: {
      all: {
        src: ['benchmark/*.js']
      }
    },

    haxe: {
        hxml: {
            hxml: 'buildjs.hxml'
        }
    }

  });

  grunt.loadNpmTasks('grunt-text-replace');
  grunt.loadNpmTasks('grunt-haxe');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-benchmark');

  var build_steps = [ 'haxe', 'replace', 'concat', 'uglify' ];
  grunt.registerTask('default', ['haxe', 'concat', 'replace'] );

  grunt.registerTask('build', build_steps);
  grunt.registerTask('mocha', ['mochaTest']);
  grunt.registerTask('test', ['haxe', 'replace','concat', 'mochaTest']);
  grunt.registerTask('benchmarks', ['concat', 'benchmark']);

};
