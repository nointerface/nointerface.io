module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        htmlmin: {
            // Task
            dist: {
                // Target
                options: {
                    // Target options
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    // Dictionary of files
                    "dist/index.html": "src/index.html"
                }
            }
        },
        sass: {
            // Task
            dist: {
                // Target
                options: {
                    // Target options
                    outputStyle: "compact",
                    sourceMap: false
                },
                files: {
                    // Dictionary of files
                    "dist/styles/style.css": "src/styles/style.scss"
                }
            }
        },
        postcss: {
            options: {
                map: true,
                processors: [
                    require('autoprefixer')
                ]
            },
            dist: {
                src: 'dist/styles/*.css'
            }
        },
        browserify: {
            dist: {
                files: {
                    'dist/js/browserify.js': 'src/js/script.js'
                },
                options: {
                }
            }
        },
        babel: {
            options: {
                "presets": [
                    [ "env", {
                        "targets": {
                            "browsers": ["last 2 versions", "> 5%"]
                        }
                    }]
                ],
                minified: true,
                comments: false
            },
            dist: {
                files: {
                    'dist/js/bundle.js': 'dist/js/browserify.js'
                }
            }
        },
        purifycss: {
          options: {
            minify: true
          },
          target: {
            src: ['dist/index.html', 'dist/js/bundle.js'],
            css: ['dist/styles/bootstrap-grid.css', 'dist/styles/bootstrap.css', 'dist/styles/style.css'],
            dest: 'dist/styles/bundle.css'
          },
        },
        copy: {
          dist: {
            files: [
              {
                expand: true,
                cwd: 'src/images',
                src: ['**'],
                dest: 'dist/images'
              }
            ]
          }
        },
        clean:  {
          css: ['dist/styles/*.css', '!dist/styles/bundle.css'],
          js: 'dist/js/browserify.js'
        },
        shell: {
            command: 'afplay /System/Library/Sounds/Glass.aiff'
        },
        chokidar: {
          scripts: {
            files: ['src/**'],
            tasks: ['default']
          }
        }
    });
    grunt.loadNpmTasks("grunt-contrib-htmlmin");
    grunt.loadNpmTasks("grunt-sass");
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-purifycss');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-chokidar');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-shell');
    // Default task(s).
    grunt.registerTask("default", [ "htmlmin", "sass", "postcss", "purifycss", "copy", "browserify", "babel", "clean", "shell" ]);
    grunt.registerTask("watch", [ "chokidar" ]);

};