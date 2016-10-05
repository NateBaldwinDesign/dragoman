'use strict';

var gulp = require('gulp'),
  fs = require('fs'),
  clean = require('gulp-rimraf'),
  del = require('del'),
  rename = require('gulp-rename'),
  replace = require('gulp-replace'),
  wrapper = require('gulp-wrapper'),
  jsonTransform = require('gulp-json-transform'),
  run = require('gulp-run'),
  concat_json = require("gulp-concat-json"),
  beautify = require('gulp-beautify'),
  flatten = require('gulp-flatten'),
  regexReplace = require('gulp-regex-replace'),
  gutil = require('gulp-util'),
  yaml = require('gulp-yaml'),
  config = require('./config.json'),
  paths = {
    tokens: config.path.tokens,
    dist: config.path.dist,
    css: config.path.css,
    js: config.path.js,
    temp: config.path.temp,
    assets: config.path.assets
  };

require('require-dir')('./gulp');

// deletes all items in the ./dist folder  
gulp.task('clean-build', function () {
  // return del(paths.dist + paths.css + '/*');
});

//Temp 
gulp.task('yaml-json', function () {
  return gulp
    .src(paths.tokens + "/**/*.yml")
    .pipe(yaml({ safe: true }))
    .pipe(gulp.dest(paths.tokens));
});

gulp.task('clean-json', function () {
  gulp.src(paths.tokens + '/**/*.json').pipe(clean());
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
  'icons-web'
  // 'icons-ios' when this works
], function () { gulp.src(paths.tokens + '/**/*.json'); });

for (var key in config.compileStyles) {
  // Only Styles
  gulp.task('dragoman-'+ key, ['clean-build', config.compileStyles[key][0]], function () { 
    gulp.src(paths.tokens + '/**/*.json')
    .pipe(clean(paths.tokens + '/**/*.json'));
  });
  // Styles and Icons
  gulp.task('dragoman-'+ key + '-icons', ['clean-build', config.compileStyles[key][0], config.compileStyles[key][1]], function () { 
    gulp.src(paths.tokens + '/**/*.json')
    .pipe(clean(paths.tokens + '/**/*.json')); 
  }); // Need to add 'icons-ios' to config.json when svg2png works
}

// Platforms
gulp.task('dragoman-web', [
  'clean-build',
  'json-scss-stylesheet',
  'json-sass-stylesheet',
  'json-less-stylesheet',
  'json-stylus-stylesheet',
  'icons-web'
], function () { gulp.src(paths.tokens + '/**/*.json'); });

gulp.task('dragoman-mobile', [
  'clean-build',
  'json-android-color',
  'json-ios-color',
  'icons-android'
  // 'icons-ios' wait to add this until svg2png working again
], function () { gulp.src(paths.tokens + '/**/*.json'); });
