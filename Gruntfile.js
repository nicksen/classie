module.exports = function (grunt) {
    grunt.config.init({
        paths: {
            app: "./src",
            dist: ".",
            file: "classie"
        },

        clean: [ "<%= paths.dist %>/<%= paths.file %>*.js" ],

        jshint: {
            options: {
                jshintrc: true,
                reporter: require("jshint-stylish")
            },
            files: [ "<%= paths.app %>/<%= paths.file %>.js" ]
        },

        umd: {
            all: {
                src: "<%= paths.app %>/<%= paths.file %>.js",
                dest: "<%= paths.dist %>/<%= paths.file %>.js",
                template: "umd",
                objectToExport: "classie",
                indent: "    "
            }
        },

        uglify: {
            options: {
                mangle: true,
                compress: true,
                report: "gzip",
                sourceMap: false,
                preserveComments: false,
            },
            dist: {
                files: {
                    "<%= paths.dist %>/<%= paths.file %>.min.js": "<%= paths.dist %>/<%= paths.file %>.js"
                }
            }
        },

        watch: {
            js: {
                files: [ "<%= paths.app %>/<%= paths.file %>.js" ],
                tasks: [ "jshint" ]
            }
        }
    });

    grunt.registerTask("default", [ "clean", "jshint", "umd", "watch" ]);
    grunt.registerTask("dist", [ "clean", "jshint", "umd", "uglify" ]);

    require("load-grunt-tasks")(grunt);
};
