module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    paths: {
      src: 'src',
      test: 'test',
      dist: 'dist'
    },
    clean: {
      dist: 'dist',
      coverage: 'test/coverage'
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= paths.src %>/**/*.js'
        ]
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['<%= paths.test %>/spec/{,*/}*.js']
      }
    },
    jscs: {
      options: {
        config: './.jscsrc'
      },
      all: {
        files: {
          src: ['<%= paths.src %>/**/*.js']
        }
      },
      test: {
        src: ['test/<%= paths.src %>/**/*.js']
      }
    },

    lintspaces: {
      options: {
        newline: true,
        newlineMaximum: 1,
        trailingspaces: true
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= paths.src %>/**/*.js'
        ]
      },
      test: {
        src: [
          'test/**/*.js'
        ]
      }
    },

    jsonlint: {
      src: '<%= paths.test %>/mock/**/*.json'
    },
    coverage: {
      dist: {
        options: {
          thresholds: {
            statements: 27,
            branches: 17,
            functions: 10,
            lines: 27
          },
          dir: 'coverage',
          root: '<%= paths.test %>'
        }
      }
    },
    copy: {
      dist: {
        src: '<%= paths.src %>/moxConfig.js',
        dest: '<%= paths.dist %>/moxConfig.js'
      }
    },
    concat: {
      dist: {
        src: [
          '<%= paths.src %>/**/*.js',
          '!<%= paths.src %>/moxConfig.js'
        ],
        dest: '<%= paths.dist %>/<%= pkg.name %>.js'
      }
    },
    uglify: {
      dist: {
        expand: true,
        cwd: '<%= paths.dist %>/',
        src: ['*.js', '!moxConfig.js'],
        dest: '<%= paths.dist %>',
        ext: '.min.js'
      }
    },
    karma: {
      dist: {
        configFile: 'karma.conf.js'
      }
    },
    watch: {
      karma: {
        files: ['Gruntfile.js', '<%= paths.src %>/**/*.js', '<%= paths.test %>/spec/**/*.js'],
        tasks: ['test']
      }
    }
  });

  grunt.registerTask('build', ['clean', 'test', 'copy', 'concat', 'uglify']);
  grunt.registerTask('test', ['jscs', 'jshint', 'lintspaces', 'jsonlint', 'karma', 'coverage']);
  grunt.registerTask('default', ['build']);

};
