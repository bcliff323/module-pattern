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
          'app/*.js',
          './index.html'
        ],
        tasks: ['default']
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-less');

  grunt.registerTask('server', ['connect']);
  grunt.registerTask('default', ['jshint']);
};