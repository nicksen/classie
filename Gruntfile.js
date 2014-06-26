module.exports = function (grunt) {
    grunt.config.init({
        APP_DIR: "./",
        JS_FILES: "classie.js",
        jshint: {
            options: {
                jshintrc: true,
                reporter: require("jshint-stylish")
            },
            files: [ "<%= APP_DIR %>/<%= JS_FILES %>" ]
        },
        watch: {
            js: {
                files: [ "<%= APP_DIR %>/<%= JS_FILES %>" ],
                tasks: [ "jshint" ]
            }
        }
    });

    grunt.registerTask("default", [ "jshint", "watch" ]);

    require("load-grunt-tasks")(grunt);
};
