'use strict';

var gulp          = require('gulp'),
    fs            = require('fs'),
    clean         = require('gulp-rimraf'),
    rename        = require('gulp-rename'),
    replace       = require('gulp-replace'),
    wrapper       = require('gulp-wrapper'),
    jsonTransform = require('gulp-json-transform'),
    run           = require('gulp-run'),
    concat_json   = require("gulp-concat-json"),
    beautify      = require('gulp-beautify'),
    flatten       = require('gulp-flatten'),
    regexReplace  = require('gulp-regex-replace'),
    gutil         = require('gulp-util'),
    gulpif        = require('gulp-if'),
    config        = require('./config.json'),
    paths         = {
      tokens: config.path.tokens,
      dist: config.path.dist,
      temp: config.path.temp,
      assets: config.path.assets
    },

    jsonCss       = require('gulp-json-css');

require('require-dir')('./gulp');

gulp.task('clean-build', function() {
  gulp.src( paths.dist ).pipe(clean());
});

gulp.task('generate-tokens', [
  'clean-build', 
  'json-stylus-stylesheet',
  'json-ios-color', 
  'iconography'
]);

function myFunction() {
  return gulp
    .src([
      paths.tokens + '/**/*.json',
      '!' + paths.tokens + '/**/styles.json'
    ])
  .pipe(jsonCss({
    targetPre: "scss",
    delim: "-"
  }))
  .pipe(rename({
    prefix: "_"
  }))
  .pipe(replace('%', '$'))
}
  

gulp.task('test', ['clean-build'], function() {
  return gulp
    .src([
      paths.tokens + '/**/*.json',
      '!' + paths.tokens + '/**/styles.json'
    ])
    .pipe(gulpif(config.languages.sass === true, myFunction()))
    .pipe(gulp.dest( paths.dist + '/scss'));
});