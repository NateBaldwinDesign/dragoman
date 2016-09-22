'use strict';

var jsonCss       = require('gulp-json-css'),
    gulp          = require('gulp'),
    clean         = require('gulp-rimraf'),
    rename        = require('gulp-rename'),
    replace       = require('gulp-replace'),
    regexReplace  = require('gulp-regex-replace'),
    paths         = require('../config.json');

//===========================================//
// Convert JSON to Android XML
gulp.task('json-android-dimensions', ['json-stylus-component', 'clean-build'], function() {
  return gulp
    .src( paths.tokens + '/global/spacing.json')
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
    .pipe(rename('spacing-android.xml'))
    .pipe(gulp.dest( paths.dist + '/global'));
});
gulp.task('json-android-color', ['json-android-dimensions', 'clean-build'], function() {
  return gulp
    .src( paths.tokens + '/global/color.json')
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
    .pipe(rename('colors-android.xml'))
    .pipe(gulp.dest( paths.dist + '/global'));
});