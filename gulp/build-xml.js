'use strict';

var jsonCss       = require('gulp-json-css'),
    gulp          = require('gulp'),
    clean         = require('gulp-rimraf'),
    rename        = require('gulp-rename'),
    replace       = require('gulp-replace'),
    regexReplace  = require('gulp-regex-replace'),
    jsonTransform = require('gulp-json-transform'),
    wrapper       = require('gulp-wrapper'),
    config        = require('../config.json'),
    paths         = {
      tokens: config.path.tokens,
      dist: config.path.dist,
      temp: config.path.temp,
      assets: config.path.assets
    };

//===========================================//
// Convert JSON to Android XML
gulp.task('json-android-dimensions', ['clean-build'], function() {
  return gulp
    .src( paths.tokens + '/**/spacing.json')
    .pipe(jsonTransform(function(data) {
      return {
        base: data.spacing,
        whitespace: data.whitespace
      };
    }))
    .pipe(jsonCss({
      targetPre: "scss",
      delim: "-"
    }))
    .pipe(wrapper({
      header: '<?xml version="1.0" encoding="utf-8"?> \n<resources> \n',
      footer: '\n</resources> \n'
    }))
    .pipe(replace('$', '    <dimen name="'))
    .pipe(replace(': ', '">'))
    .pipe(replace(';', '</dimen>'))
    .pipe(rename('spacing.xml'))
    .pipe(gulp.dest( paths.dist + '/android'));
});
gulp.task('json-android-color', ['json-android-dimensions', 'clean-build'], function() {
  return gulp
    .src( paths.tokens + '/**/color.json')
    .pipe(jsonCss({
      targetPre: "scss",
      delim: "-"
    }))
    .pipe(wrapper({
      header: '<?xml version="1.0" encoding="utf-8"?> \n<resources> \n',
      footer: '\n</resources> \n'
    }))
    .pipe(replace('$', '    <color name="'))
    .pipe(replace(': ', '">'))
    .pipe(replace(';', '</color>'))
    .pipe(rename('colors.xml'))
    .pipe(gulp.dest( paths.dist + '/android'));
});