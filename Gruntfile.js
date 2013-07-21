module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      files: [
        'gruntfile.js', 
        'js/controllers/*.js',
        'js/directives/*.js',
        'js/filters/*.js',
        'js/services/*.js',
        'js/*.js'
      ],
      options: {
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },

    concat: {
      options: {
        separator: '\n',
      },
      dist: {
        src: ['app/util/*.js','domReady.min.js','app/app.js','app/modules/*.js'],
        dest: 'app/main.js',
      },
    },

    uglify: {
      options: {
        compress: true
      },
      minify: {
        files: {
          'app/main.min.js': ['app/main.js']
        }
      }
    },

    connect: {
      all: {
        options:{
          port: 9000,
          hostname: "0.0.0.0",
          keepalive: true
        }
      }
    },

    watch: {
      js: {
        files: [
          'Gruntfile.js',
          'app/modules/*.js',
          'app/util/*.js', 
          'app/app.js',
          './index.html'
        ],
        tasks: ['default']
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('server', ['connect']);
  grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
};