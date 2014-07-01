var gulp = require("gulp"),
    gutil = require("gulp-util"),
    rimraf = require("gulp-rimraf"),
    jshint = require("gulp-jshint"),
    wrap = require("gulp-wrap-umd"),
    uglify = require("gulp-uglify"),
    rename = require("gulp-rename");

gulp.task("clean", function () {
    return gulp.src("./classie.{js,min.js}", { read: false })
        .pipe(rimraf());
});

gulp.task("build", function () {
    return gulp.src("./src/classie.js")
        .pipe(jshint())
        .pipe(jshint.reporter("jshint-stylish"))
        .pipe(wrap({
            exports: "classie",
            namespace: "classie"
        }))
        .pipe(gulp.dest("./"));
});

gulp.task("compress", [ "build" ], function () {
    return gulp.src("./classie.js")
        .pipe(uglify())
        .pipe(rename("classie.min.js"))
        .pipe(gulp.dest("./"));
});

gulp.task("watch", function () {
    gulp.watch("./src/classie.js", [ "build" ]);
});

gulp.task("default", [ "clean", "build", "watch" ]);

gulp.task("dist", [ "clean", "compress" ]);
