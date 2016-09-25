'use strict';

var jsonCss       = require('gulp-json-css'),
    gulp          = require('gulp'),
    clean         = require('gulp-rimraf'),
    rename        = require('gulp-rename'),
    replace       = require('gulp-replace'),
    regexReplace  = require('gulp-regex-replace'),
    paths         = require('../config.json');

//===========================================//
// Convert JSON to Less variables
gulp.task('json-sass-global', ['json-scss-stylesheet', 'clean-build'], function() {
  return gulp
    .src([
      paths.tokens + '/**/*.json',
      '!' + paths.tokens + 'styles.json'
    ])
    .pipe(jsonCss({
      targetPre: "sass",
      delim: "-"
    }))
    .pipe(rename({
      prefix: "_"
    }))
    .pipe(replace('%', '$'))
    .pipe(gulp.dest( paths.dist + '/sass'));
});
gulp.task('json-sass-stylesheet', ['json-sass-global', 'clean-build'], function() {
  return gulp
    .src([
      paths.tokens + 'styles.json'
    ])
    .pipe(jsonCss({
      targetPre: "sass",
      delim: "/"
    }))
    .pipe(rename({
      prefix: ""
    }))
    .pipe(replace('$', '@'))
    .pipe(replace('@meta', '/'))
    .pipe(replace('name:', ''))
    .pipe(replace(': ', '/_'))
    .pipe(replace('import', 'import '))
    .pipe(replace('version/_', ' Version: '))
    .pipe(regexReplace({regex: '[0-9]/', replace: 'sass/'}))
    .pipe(gulp.dest( paths.dist + '/sass'));
});
