var gulp = require('gulp'),
  concat = require('gulp-concat'),
  sass = require('gulp-sass'),
  minifyCss = require('gulp-minify-css'),
  rename = require('gulp-rename'),
  karma = require('gulp-karma'),
  ngmin = require('gulp-ngmin'),
  plumber = require('gulp-plumber'),
  stylish = require('jshint-stylish'),
  jshint = require('gulp-jshint'),
  ngHtml2Js = require('gulp-ng-html2js'),
  rev = require('gulp-rev'),
  size = require('gulp-size'),
  jade = require('gulp-jade'),
  linker = require('gulp-linker'),
  runSequence = require('run-sequence'),
  livereload = require('gulp-livereload');


var paths = {
  sass: ['./scss/**/*.scss']
};

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('default', ['sass']);