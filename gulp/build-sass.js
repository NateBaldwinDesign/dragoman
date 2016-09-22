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
gulp.task('json-sass-global', ['json-scss-component', 'clean-build'], function() {
  return gulp
    .src([
      paths.tokens + '/global/**/*.json'
    ])
    .pipe(jsonCss({
      targetPre: "sass",
      delim: "-"
    }))
    .pipe(rename({
      prefix: "_"
    }))
    .pipe(replace('%', '$'))
    .pipe(gulp.dest( paths.dist + '/global'));
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
    .pipe(regexReplace({regex: '/[0-9]/', replace: '/'}))
    .pipe(gulp.dest( paths.dist ));
});
gulp.task('json-sass', ['json-sass-stylesheet', 'clean-build'], function() {
  return gulp
    .src([
      paths.tokens + '/components/**/theme-*.json',
      paths.tokens + '/components/**/variables.json'
    ])
    .pipe(jsonCss({
      targetPre: "sass",
      delim: "-"
    }))
    .pipe(rename({
      prefix: "_"
    }))
    .pipe(replace('%', '$'))
    .pipe(gulp.dest( paths.dist + '/components'));
});
gulp.task('json-sass-component', ['json-sass', 'clean-build'], function() {
  return gulp
    .src([paths.tokens + '/components/**/*.json', 
      '!' + paths.tokens + '/components/**/theme-*.json',
      '!' + paths.tokens + '/components/**/variables.json'
      ])
    .pipe(rename({
      prefix: "_",
      extname: ".sass"
    }))
    .pipe(replace('%', '$'))
    .pipe(replace('"', ''))
    .pipe(replace(',', ';'))
    .pipe(replace('{\n\tname: ', '.'))
    .pipe(replace(';\n\tproperties: ', ' '))
    .pipe(replace('}\n}', ''))
    .pipe(replace('\n\t', '\n'))
    .pipe(replace('{', ''))
    .pipe(replace('}', ''))
    .pipe(replace(';', ''))
    .pipe(gulp.dest( paths.dist + '/components'));
});