var gulp = require('gulp');

var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var nodemon = require('gulp-nodemon');
var gulpIgnore = require('gulp-ignore');
var processhtml = require('gulp-processhtml');
var preprocess = require('gulp-preprocess');

gulp.task('config', function () {
  return gulp.src('public/js/*.js')
    .pipe(preprocess(
        {
          context: {
            SERVER_URL : process.env.SERVER_URL || 'http://localhost:9000'
          }
        }
    ))
    .pipe(gulp.dest('public/dist/'));
});

gulp.task('lint', function () {
  return gulp.src('public/js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('minify-prod', function () {
  return gulp.src(['public/js/**/*.js', 'public/dist/app.js', '!public/dist/appdev.js', '!public/js/app.js', '!public/js/appdev.js'])
    .pipe(concat('jobquery.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/lib/'));
});

gulp.task('html-prod', function () {
  return gulp.src('public/dev.html')
    .pipe(processhtml('index.html'))
    .pipe(gulp.dest('public/'));
});

gulp.task('concatbower-prod',['minify-prod'], function () {
  return gulp.src([
    'public/bower_components/angular/angular.min.js',
    'public/bower_components/angular-ui-router/release/angular-ui-router.min.js',
    'public/bower_components/angular-resource/angular-resource.min.js',
    'public/bower_components/angular-local-storage/angular-local-storage.min.js',
    'public/lib/jobquery.min.js'],
    {  base: 'public/'  })
      .pipe(concat('jobquery.master.min.js'))
      .pipe(gulp.dest('public/lib/'));
});

gulp.task('nodemon', function () {
  nodemon({ script: 'server.js', ext: 'html js'})
    .on('change', ['lint'])
    .on('restart', function () {
      console.log('restarted!');
    });
});

gulp.task('html-dev', function () {
  return gulp.src('public/dev.html')
    .pipe(rename('index.html'))
    .pipe(gulp.dest('public/'));
});


gulp.task('staging',['config', 'concatbower-prod','html-prod']);
gulp.task('prod',['concatbower-prod','html-prod']);
gulp.task('dev',['config', 'html-dev']);

gulp.task('devserve',['config', 'html-dev', 'nodemon', 'lint']);
