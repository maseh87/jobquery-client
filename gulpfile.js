var gulp = require('gulp');

var jshint = require('gulp-jshint');
var nodemon = require('gulp-nodemon');
var processhtml = require('gulp-processhtml');

gulp.task('lint', function(){
  return gulp.src('public/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('nodemon', function(){
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

gulp.task('processhtml', function(){

});

gulp.task('default', ['nodemon', 'processhtml']);