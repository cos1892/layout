'use strict';

var gulp = require("gulp"),
    del = require('del'),
    sass = require('gulp-sass'),
    scssLint = require('gulp-scss-lint'),
    scssLintStylish = require('gulp-scss-lint-stylish'),
    cleanCSS = require('gulp-clean-css'),
    rename = require("gulp-rename"),
    sourcemaps = require('gulp-sourcemaps'),
	watch = require('gulp-watch');

gulp.task("styles", function(){
  return gulp.src("scss/entry.scss")
    // .pipe(scssLint({ customReport: scssLintStylish }))
    .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(rename({
        basename: "styles",
        suffix: ".min"
      }))
      .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("css"))
});

gulp.task('clean', function(cb) {
  return del(['css'], cb);
});

gulp.task('default', ['clean'],
  function() {
    gulp.start('styles', 'watch');
  }
);

gulp.task('watch', function() {
  gulp.watch('scss/**/*.scss',
  ['styles']);
});