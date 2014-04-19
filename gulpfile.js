var gulp = require('gulp'),
  concat = require('gulp-concat'),
  sass = require('gulp-sass'),
  connect = require('gulp-connect'),
  minifyCss = require('gulp-minify-css'),
  rename = require('gulp-rename'),
  karma = require('gulp-karma'),
  ngmin = require('gulp-ngmin'),
  plumber = require('gulp-plumber'),
  stylish = require('jshint-stylish'),
  jshint = require('gulp-jshint'),
  ngHtml2Js = require('gulp-ng-html2js'),
  cache = require('gulp-cached'),
  rev = require('gulp-rev'),
  size = require('gulp-size'),
  jade = require('gulp-jade'),
  linker = require('gulp-linker'),
  runSequence = require('run-sequence'),
  shell = require('gulp-shell'),
  livereload = require('gulp-livereload');


var onError = function (err) {  
  gutil.beep();
  console.log(err);
};



var paths = {
  scripts: ['app/scripts/**/*.js'],
  scriptsWithoutTests: ['app/scripts/**/*.js', '!app/scripts/**/*_test.js'],
  images: 'app/images/**/*',
  templates: {
    html: ['www/templates/**/*.html'],
    jade: ['www/templates/**/*.jade']
  },
  sass: ['./scss/**/*.scss'],
  notLinted: ['!app/scripts/templates.js', '!app/scripts/services/BusuuPopcorn.js']
};


/**
 * Development tasks
 */
gulp.task('develop', ['connect', 'preprocess', 'kill_karma', 'karma', 'watch']);
gulp.task('preprocess', ['templates', 'all-sass']);
// The default task (called when you run `gulp` from cli)
gulp.task('default', ['develop']);

gulp.task('connect', function() {
  connect.server({
    root: ['www'],
    port: 9000,
    livereload: true,
    // open: {
    //   browser: 'chrome' // if not working OS X browser: 'Google Chrome'
    // },

  })
});


gulp.task('hint', function() {
  gulp.src(paths.scripts.concat(paths.notLinted))
    .pipe(cache('linting'))
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('templates', ['jade', 'html2js']);



// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['hint', 'watchJs']);
  gulp.watch(paths.templates.html, ['html2js']);
  gulp.watch(paths.templates.jade, ['templates']);
  gulp.watch(paths.sass, ['sass']);
});


gulp.task('jade', function() {
  return gulp.src(paths.templates.jade)
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(cache('jade'))
    .pipe(jade({
      pretty: true,
      doctype: "html"
    }))
    .pipe(gulp.dest("www/templates"));
});

gulp.task('html2js', function() {
  return gulp.src(paths.templates.html)
    .pipe(ngHtml2Js({
      moduleName: "busuuApp.templates",
      prefix: "template/"
    }))
    .pipe(concat("templates.js"))
    .pipe(gulp.dest("app/scripts"))
    .pipe(livereload());
});



gulp.task('linker', function() {
  return gulp.src('www/index.html')
    .pipe(linker({
      scripts: 'www/js/**/*.js',
      startTag: '<!--SCRIPTS-->',
      endTag: '<!--SCRIPTS END-->',
      fileTmpl: '<script src="%s"></script>',
      appRoot: 'www/'
    }))
    .pipe(gulp.dest('www/'));
});


gulp.task('all-sass', function() {
  return gulp.src(['./app/styles/main.scss', './app/styles/busuu-bootstrap.scss'])
    .pipe(sass({
      outputStyle: "compressed",
      includePaths: ["./app/styles/bootstrap-sass", "./app"]
    }))
    .on('error', gutil.log)
    .pipe(gulp.dest('./app/styles'));
});


gulp.task('sass-main', function() {
  return gulp.src('./scss/ionic.app.scss')
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(sass({
      outputStyle: "compressed"
    }))
    .on('error', gutil.log)
    .pipe(gulp.dest('./www/css/'))
    .pipe(livereload());
});



gulp.task('karma', function() {
  // https://github.com/lazd/gulp-karma/issues/9
  return gulp.src(['./workaround'])
    .pipe(karma({
      configFile: 'test/karma.conf.js',
      action: 'watch'
    }))
    .on('error', function(err) {
      throw err;
    });
});

gulp.task('single-test', function() {
  return gulp.src(['./workaround'])
    .pipe(karma({
      configFile: 'test/karma.conf.js',
      action: 'run'
    }))
    .on('error', function(err) {
      throw err;
    });

});

gulp.task('kill_karma', shell.task([
  "kill -9 $(ps aux | awk '/[k]arma/ {print $2}')"
]));
