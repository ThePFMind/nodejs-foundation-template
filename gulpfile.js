var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var rimraf = require('rimraf');
var sequence = require('run-sequence');

// File paths to various assets are defined here.
var PATHS = {
  sass: [
    'bower_components/foundation-sites/scss',
    'bower_components/motion-ui/src'
  ],
  javascript: [
    'bower_components/foundation-sites/dist/foundation.js',
    'bower_components/jquery/dist/jquery.js',
    'bower_components/what-input/what-input.js'
  ]
};

// Delete the "dist" folder
// This happens every time a build starts
gulp.task('clean', function (done) {
  rimraf('public/js/libs', (err) => {
      rimraf('public/css/libs', done);
  });
});

// Compile Sass into CSS
gulp.task('sass', function () {
  return gulp.src('public/scss/app.scss')
    .pipe($.sass({
      includePaths: PATHS.sass
    }).on('error', $.sass.logError))

    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))

    .pipe(gulp.dest('public/css/libs'));
});

// Copy files to assets folder
gulp.task('copy', function () {
  return gulp.src(PATHS.javascript)
    .pipe(gulp.dest('public/js/libs'));
});

// Build the "public" folder by running all of the above tasks
gulp.task('build', function (done) {
  sequence('clean', ['sass', 'copy'], done);
});

gulp.task('default', ['sass'], function () {
  gulp.watch(['public/scss/**/*.scss'], ['sass']);
});
