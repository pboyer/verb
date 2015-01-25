module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      build: {
        files: {
          'build/<%= pkg.name %>.js': [ 'src/support/header.js',
                                        'build/verbHaxe.js']
        }
      }
    },

    replace: {
      build: {
        src: ['build/verb.js'],
        overwrite: true,                 // overwrite matched source files
        replacements: [{
          from: "typeof window != \"undefined\" ? window : exports",
          to: "typeof verb != \"undefined\" ? verb : exports"
        }]
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        files: {
          'build/<%= pkg.name %>.min.js': ['build/<%= pkg.name %>.js']
        }
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          quiet: false // Optionally suppress output to standard out (defaults to false)
        },
        src: ['test/test.js']
      }
    },

    benchmark: {
      all: {
        src: ['benchmark/*.js']
      }
    },

    haxe: {
        hxml: {
            hxml: 'build.hxml'
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

  grunt.loadNpmTasks('grunt-text-replace');
  grunt.loadNpmTasks('grunt-haxe');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-docco');
  grunt.loadNpmTasks('grunt-benchmark');

  var build_steps = [ 'haxe', 'concat', 'replace', 'uglify' ]; // 'docco'];
  grunt.registerTask('default', build_steps );

  grunt.registerTask('build', build_steps);
  grunt.registerTask('test', ['haxe', 'concat', 'replace', 'mochaTest']);
  grunt.registerTask('benchmarks', ['concat', 'benchmark']);

};