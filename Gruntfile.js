module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      options: {
        sourceMap: true
      },
      dist: {
       src: [
        'bower_components/chosen/chosen.min.css',
        'assets/sass/application.scss'
       ],
       dest: 'assets/sass/build.scss',
      }
    },

    sass: {
      options: {
        sourceMap: '../assets/sass/',
        outputStyle: 'compressed'
      },
      dist: {
        files: {
          'assets/stylesheets/application.css' : 'assets/sass/build.scss'
        }
      }
    },

    uglify : {
      options: {
        beautify: false,
        mangle: false,
        sourceMap: true,
        sourceMapName: 'assets/javascripts/application.min.map'
      },
      main : {
        src : [
          'bower_components/jquery/dist/jquery.js',
          'bower_components/chosen/chosen.jquery.min.js',
          'assets/javascripts/application/navigation.js',
          'assets/javascripts/application/main.js'
        ],
        dest : 'assets/javascripts/application.min.js'
      }
    },

    svgmin: {
      options: {
        plugins: [
          {
            removeViewBox: false
          },
          {
            removeUselessStrokeAndFill: false
          }
        ]
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'assets/svgs/raw/',
          src: ['**/*.svg'],
          dest: 'assets/svgs/'
        }]
      },
    },

    postcss: {
      options: {
        map: {
          inline: false,
          annotation: 'assets/sass/'
        },
        processors: [
          require('autoprefixer-core')({
            browsers: 'last 2 versions'
          })
        ]
      },
      dist: {
        files: {
          'assets/stylesheets/application.prefix.css': 'assets/stylesheets/application.css'
        }
      }
    },

    watch: {
      js: {
        files: ['assets/javascripts/application/*.js' ],
        tasks: ['uglify'],
        options: {
          livereload: true
        }
      },
      css: {
        files: 'assets/**/*.scss',
        tasks: ['sass', 'svgmin', 'postcss'],
        options: {
          livereload: true
        }
      },
      php: {
        files: '**/*.php',
        options: {
          livereload: true
        }
      },
      html: {
        files: '**/*.html',
        options: {
          livereload: true
        }
      },
      images: {
        files: 'assets/images/{,*/}*'
      },
      livereload: {
        options: {
          livereload: true
        },
        files: ['assets/**/*.scss', 'assets/javascripts/*.js', '**/*.php', '**/*.html'],
      }
    }

  });
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-svgmin');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default',['concat', 'sass', 'watch']);
}