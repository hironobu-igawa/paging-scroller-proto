const gulp = require('gulp');

const runSequence = require('run-sequence');

const webserver = require('gulp-webserver');

const babel = require('gulp-babel');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');

const clean = require('gulp-clean');

gulp.task('default', ['deploy']);

gulp.task('deploy', ['build', 'watch'], () => {
  return gulp.src('app')
    .pipe(webserver({
      port: 3030,
      open: 'http://localhost:3030/'
    }));
});

gulp.task('watch', () => {
  gulp.watch('src/scripts/**/*.js', ['build-scripts']);
  gulp.watch(['src/index.html','src/views/**/*.html'], ['build-views']);
  gulp.watch('src/resources/**/*', ['build-resources']);
});

gulp.task('build', (cb) => {
  return runSequence(
    'build.clean',
    ['build-scripts', 'build-views', 'build-resources', 'build-libs'],
    cb
  );
});

gulp.task('build.clean', () => {
  return gulp.src('app')
    .pipe(clean());
});

gulp.task('build-scripts', () => {
  return gulp.src(['src/scripts/module.js', 'src/scripts/**/*.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('app'));
});

gulp.task('build-views', () => {
  return gulp.src('src/views/**/*.html')
    .pipe(gulp.dest('app'));
});

gulp.task('build-resources', () => {
  return gulp.src(['src/resources/**/*'])
    .pipe(gulp.dest('app'));
});

gulp.task('build-libs', () => {
  const libs = [
    'bower_components/lodash/dist/lodash.min.js',
    'bower_components/jquery/dist/jquery.min.js',
    'bower_components/angular/angular.min.js',
  ];

  return gulp.src(libs)
    .pipe(concat('libs.js'))
    .pipe(gulp.dest('app'));
});
