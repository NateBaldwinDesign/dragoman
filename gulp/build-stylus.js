'use strict';

var jsonCss       = require('gulp-json-css'),
    gulp          = require('gulp'),
    clean         = require('gulp-rimraf'),
    rename        = require('gulp-rename'),
    replace       = require('gulp-replace'),
    regexReplace  = require('gulp-regex-replace'),
    paths         = require('../config.json');

//===========================================//
// Convert JSON to Stylus variables
gulp.task('json-stylus-global', ['json-less-component', 'clean-build'], function() {
  return gulp
    .src([
      paths.tokens + '/global/**/*.json'
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
    .pipe(gulp.dest( paths.dist + '/global'));
});
gulp.task('json-stylus-stylesheet', ['json-stylus-global', 'clean-build'], function() {
  return gulp
    .src([
      paths.tokens + 'styles.json'
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
    .pipe(regexReplace({regex: '/[0-9]/', replace: '/'}))
    .pipe(rename({
      extname: ".styl"
    }))
    .pipe(gulp.dest( paths.dist ));
});
gulp.task('json-stylus', ['json-stylus-stylesheet', 'clean-build'], function() {
  return gulp
    .src([
      paths.tokens + '/components/**/theme-*.json',
      paths.tokens + '/components/**/variables.json'
    ])
    .pipe(jsonCss({
      targetPre: "sass",
      delim: "-"
    }))
    .pipe(replace('$', ''))
    .pipe(replace('%', ''))
    .pipe(replace(':', ' ='))
    .pipe(rename({
      prefix: "_",
      extname: ".styl"
    }))
    // .pipe(replace('%', '@'))
    .pipe(gulp.dest( paths.dist + '/components'));
});
gulp.task('json-stylus-component', ['json-stylus', 'clean-build'], function() {
  return gulp
    .src([paths.tokens + '/components/**/*.json', 
      '!' + paths.tokens + '/components/**/theme-*.json',
      '!' + paths.tokens + '/components/**/variables.json'
      ])
    .pipe(rename({
      prefix: "_",
      extname: ".styl"
    }))
    .pipe(replace('%', ''))
    .pipe(replace('"', ''))
    .pipe(replace(',', ';'))
    .pipe(replace('{\n\tname: ', '.'))
    .pipe(replace(';\n\tproperties: ', ' '))
    .pipe(replace('}\n}', ''))
    .pipe(replace('\n\t', '\n'))
    .pipe(replace('{', ''))
    .pipe(replace('}', ''))
    .pipe(replace(';', ''))
    .pipe(replace(':', ''))
    .pipe(gulp.dest( paths.dist + '/components'));
});