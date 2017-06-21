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
                    outputStyle: "compressed",
                    sourceMap: false
                },
                files: {
                    // Dictionary of files
                    "dist/styles/style.css": "src/styles/style.scss",
                    "dist/styles/bootstrap.css": "node_modules/bootstrap/scss/bootstrap.scss",
                    "dist/styles/bootstrap-grid.css": "node_modules/bootstrap/scss/bootstrap-grid.scss"
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
        purifycss: {
          options: {
            minify: true
          },
          target: {
            src: ['dist/index.html'],
            css: ['dist/styles/*.css'],
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
                dest: 'dist/images'}
            ]
          }
        },
        clean:  {
          css: ['dist/styles/*.css', '!dist/styles/bundle.css']
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
    grunt.loadNpmTasks('grunt-chokidar');
    grunt.loadNpmTasks('grunt-contrib-clean');
    // Default task(s).
    grunt.registerTask("default", [ "htmlmin", "sass", "postcss", "purifycss", "copy", "clean" ]);
    grunt.registerTask("watch", [ "chokidar" ]);

};