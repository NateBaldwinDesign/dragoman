'use strict';

var jsonCss       = require('gulp-json-css'),
    gulp          = require('gulp'),
    clean         = require('gulp-rimraf'),
    rename        = require('gulp-rename'),
    replace       = require('gulp-replace'),
    regexReplace  = require('gulp-regex-replace'),
    config        = require('../config.json'),
    paths         = {
      tokens: config.path.tokens,
      dist: config.path.dist,
      temp: config.path.temp,
      assets: config.path.assets
    };

//===========================================//
// Convert JSON to Stylus variables
gulp.task('json-stylus-global', ['json-less-stylesheet', 'clean-build'], function() {
  return gulp
    .src([
      paths.tokens + '/**/*.json',
      '!' + paths.tokens + '/**/styles.json'
    ])
    .pipe(jsonCss({
      targetPre: "sass",
      delim: "-"
    }))
    .pipe(replace('$', ''))
    .pipe(replace(':', ' ='))
    .pipe(rename({
      prefix: "_",
      extname: ".styl"
    }))
    // .pipe(replace('%', '@'))
    .pipe(gulp.dest( paths.dist + '/stylus'));
});
gulp.task('json-stylus-stylesheet', ['json-stylus-global', 'clean-build'], function() {
  return gulp
    .src([
      paths.tokens + '/styles.json'
    ])
    .pipe(jsonCss({
      targetPre: "scss",
      delim: "/"
    }))
    .pipe(rename({
      prefix: ""
    }))
    .pipe(replace('$', '@'))
    .pipe(replace('@meta', '/'))
    .pipe(replace('name:', ''))
    .pipe(replace(': ', '/_'))
    .pipe(replace('import', 'import "'))
    .pipe(replace(';', '"'))
    .pipe(replace('version/_', ' Version: '))
    .pipe(regexReplace({regex: '[0-9]/', replace: 'stylus/'}))
    .pipe(rename({
      extname: ".styl"
    }))
    .pipe(gulp.dest( paths.dist + '/stylus'));
});
