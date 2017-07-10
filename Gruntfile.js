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
                    "docs/index.html": "src/index.html"
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
                    "docs/styles/style.css": "src/styles/style.scss",
                    "docs/styles/bootstrap.css": "node_modules/bootstrap/scss/bootstrap.scss",
                    "docs/styles/bootstrap-grid.css": "node_modules/bootstrap/scss/bootstrap-grid.scss"
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
                src: 'docs/styles/*.css'
            }
        },
        purifycss: {
          options: {
            minify: true
          },
          target: {
            src: ['docs/index.html'],
            css: ['docs/styles/bootstrap-grid.css', 'docs/styles/bootstrap.css', 'docs/styles/style.css'],
            dest: 'docs/styles/bundle.css'
          },
        },
        browserify: {
            dist: {
                files: {
                    'docs/js/browserify.js': 'src/js/script.js'
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
                    'docs/js/bundle.js': 'docs/js/browserify.js'
                }
            }
        },
        copy: {
          dist: {
            files: [
              {
                expand: true,
                cwd: 'src/images',
                src: ['**'],
                dest: 'docs/images'
              }
            ]
          }
        },
        clean:  {
          css: ['docs/styles/*.css', '!docs/styles/bundle.css'],
          js: 'docs/js/browserify.js'
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