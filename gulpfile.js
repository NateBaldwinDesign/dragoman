var jsonSass = require('gulp-json-sass'),
    gulp = require('gulp'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    clean = require('gulp-rimraf'),
    sourcemaps = require('gulp-sourcemaps'),
    rename = require('gulp-rename'),
    replace = require('gulp-replace'),
    designProperties = require('./config.json');

// Convert JSON to SCSS variables
gulp.task('json-scss', function() {
  return gulp
    .src('principles/typography.json')
    .pipe(jsonSass({
      sass: true,
      ignoreJsonErrors: false
    }))
    .pipe(concat('_principles.scss'))
    .pipe(gulp.dest('dest/'));
});
// Convert JSON to SASS variables
gulp.task('json-sass', function() {
  return gulp
    .src('config.json')
    .pipe(jsonSass({
      sass: true,
      ignoreJsonErrors: false
    }))
    .pipe(concat('_principles.scss'))
    .pipe(replace(';', ''))
    .pipe(rename('_principles.sass'))
    .pipe(gulp.dest('dest/'));
});
// Convert JSON to Less variables
gulp.task('json-less', function() {
  return gulp
    .src('config.json')
    .pipe(jsonSass({
      sass: true,
      ignoreJsonErrors: false
    }))
    .pipe(concat('_principles.scss'))    
    .pipe(replace('$', '@'))
    .pipe(rename('_principles.less'))
    .pipe(gulp.dest('dest/'));
});
// Convert JSON to Stylus variables
gulp.task('json-stylus', function() {
  return gulp
    .src('config.json')
    .pipe(jsonSass({
      sass: true,
      ignoreJsonErrors: false
    }))
    .pipe(concat('_principles.scss'))    
    .pipe(replace('$', ''))
    .pipe(replace(':', '='))
    .pipe(replace(';', ''))
    .pipe(rename('_principles.styl'))
    .pipe(gulp.dest('dest/'));
});
// Convert JSON to Android XML

// Convert JSON to iOS JSON format


