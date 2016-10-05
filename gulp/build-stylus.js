'use strict';

var jsonCss       = require('gulp-json-css'),
    gulp          = require('gulp'),
    clean         = require('gulp-rimraf'),
    rename        = require('gulp-rename'),
    replace       = require('gulp-replace'),
    regexReplace  = require('gulp-regex-replace'),
    config        = require('../config.json'),
    paths = {
      tokens: config.path.tokens,
      dist: config.path.dist,
      css: config.path.css,
      js: config.path.js,
      temp: config.path.temp,
      assets: config.path.assets
    };

//===========================================//
// Convert JSON to Stylus variables
gulp.task('json-stylus-global', ['clean-build'], function() {
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
    .pipe(replace('%', ''))
    .pipe(rename({
      prefix: "_",
      extname: ".styl"
    }))
    // .pipe(replace('%', '@'))
    .pipe(gulp.dest( paths.dist + paths.css + 'stylus'));
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
      prefix: "",
      basename: "tokens"
    }))
    .pipe(replace('$', '@'))
    .pipe(replace('@meta', '/'))
    .pipe(replace('name:', ''))
    .pipe(replace(': ', '/_'))
    .pipe(replace('import/', 'import "'))
    .pipe(replace(';', '"'))
    .pipe(replace('version/_', ' Version: '))
    .pipe(regexReplace({regex: '[0-9]/', replace: 'stylus/'}))
    .pipe(rename({
      extname: ".styl"
    }))
    .pipe(gulp.dest( paths.dist + paths.css + 'stylus'));
});
