var gulp = require('gulp');

var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var nodemon = require('gulp-nodemon');
var processhtml = require('gulp-processhtml');

gulp.task('lint', function () {
  return gulp.src('public/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('minify', function () {
  return gulp.src('public/js/**/*.js')
    .pipe(concat('jobquery.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/assets/js/'));
});

gulp.task('html', function () {
  return gulp.src('public/assets/index.html')
    .pipe(processhtml('index.html'))
    .pipe(gulp.dest('public/'));
});

gulp.task('html-dev', function () {
  return gulp.src('public/assets/index.html')
    .pipe(gulp.dest('public/'));
});

gulp.task('concatbower', function () {
  return gulp.src([
    // 'public/bower_components/jquery/dist/jquery.min.js',
    // 'public/bower_components/bootstrap/dist/js/bootstrap.min.js',
    'public/bower_components/angular/angular.min.js',
    'public/bower_components/angular-ui-router/release/angular-ui-router.min.js',
    'public/bower_components/angular-resource/angular-resource.min.js',
    'public/bower_components/angular-local-storage/angular-local-storage.min.js',
    'public/assets/js/jobquery.min.js'],
    {  base: 'public/'  })
      .pipe(concat('jobquery.master.min.js'))
      .pipe(gulp.dest('public/assets/js/'));
});

gulp.task('nodemon', function () {
  return nodemon({
    script: 'server.js',
    ext: 'js',
    ignore: ['test/']
  })
  .on('change', ['lint'])
  .on('restart', function(){
    console.log('######## Change Detected, Restarting Server ########');
  });
});

gulp.task('prod',['minify','html']);

gulp.task('dev',['html-dev']);
