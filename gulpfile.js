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
    minimist      = require('minimist'),
    config        = require('./config.json'),
    paths         = {
      tokens: config.path.tokens,
      dist: config.path.dist,
      temp: config.path.temp,
      assets: config.path.assets
    };

require('require-dir')('./gulp');

gulp.task('clean-build', function() {
  gulp.src( paths.dist ).pipe(clean());
});

// Default task
gulp.task('dragoman', [
  'clean-build', 
  'json-scss-stylesheet',
  'json-sass-stylesheet',
  'json-less-stylesheet',
  'json-stylus-stylesheet',
  'json-android-color',
  'json-ios-color', 
  'iconography'
]);
// Only Styles
gulp.task('dragoman-scss', ['clean-build', 'json-scss-stylesheet']);

gulp.task('dragoman-sass', ['clean-build', 'json-sass-stylesheet']);

gulp.task('dragoman-less', ['clean-build', 'json-less-stylesheet']);

gulp.task('dragoman-stylus', ['clean-build', 'json-stylus-stylesheet']);

gulp.task('dragoman-android', ['clean-build', 'json-android-color']);

gulp.task('dragoman-ios', ['clean-build', 'json-ios-color']);

// Styles and Icons
gulp.task('dragoman-scss-icons', ['clean-build', 'json-scss-stylesheet', 'icons-web']);

gulp.task('dragoman-sass-icons', ['clean-build', 'json-sass-stylesheet', 'icons-web']);

gulp.task('dragoman-less-icons', ['clean-build', 'json-less-stylesheet', 'icons-web']);

gulp.task('dragoman-stylus-icons', ['clean-build', 'json-stylus-stylesheet', 'icons-web']);

gulp.task('dragoman-android-icons', ['clean-build', 'json-android-color', 'icons-android']);

gulp.task('dragoman-ios-icons', ['clean-build', 'json-ios-color']); // Need to add 'icons-ios' when svg2png works

// Platforms
gulp.task('dragoman-web', [
  'clean-build', 
  'json-scss-stylesheet',
  'json-sass-stylesheet',
  'json-less-stylesheet',
  'json-stylus-stylesheet', 
  'icons-web'
]);
gulp.task('dragoman-mobile', [
  'clean-build', 
  'json-android-color',
  'json-ios-color',
  'icons-android'
  // 'icons-ios' wait to add this until svg2png working again
]);
