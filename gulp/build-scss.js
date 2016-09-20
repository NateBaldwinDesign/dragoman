'use strict';

var jsonCss       = require('gulp-json-css'),
    gulp          = require('gulp'),
    clean         = require('gulp-rimraf'),
    rename        = require('gulp-rename'),
    replace       = require('gulp-replace'),
    regexReplace  = require('gulp-regex-replace');

//===========================================//
// Convert JSON to SCSS variables
gulp.task('json-scss-global', ['clean-build'], function() {
  return gulp
    .src([
      paths.tokens + '/global/**/*.json'
    ])
    .pipe(jsonCss({
      targetPre: "scss",
      delim: "-"
    }))
    .pipe(rename({
      prefix: "_"
    }))
    .pipe(replace('%', '$'))
    .pipe(gulp.dest( paths.dist + '/global'));
});
gulp.task('json-scss-stylesheet', ['json-scss-global', 'clean-build'], function() {
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
    .pipe(replace(';', '";'))
    .pipe(replace('import', 'import "'))
    .pipe(replace('version/_', ' Version: '))
    .pipe(regexReplace({regex: '/[0-9]/', replace: '/'}))
    .pipe(gulp.dest( paths.dist ));
});
gulp.task('json-scss', ['json-scss-stylesheet', 'clean-build'], function() {
  return gulp
    .src([
      paths.tokens + '/components/**/theme-*.json',
      paths.tokens + '/components/**/variables.json'
    ])
    .pipe(jsonCss({
      targetPre: "scss",
      delim: "-"
    }))
    .pipe(rename({
      prefix: "_"
    }))
    .pipe(replace('%', '$'))
    .pipe(gulp.dest( paths.dist + '/components'));
});
gulp.task('json-scss-component', ['json-scss', 'clean-build'], function() {
  return gulp
    .src([paths.tokens + '/components/**/*.json', 
      '!' + paths.tokens + '/components/**/theme-*.json',
      '!' + paths.tokens + '/components/**/variables.json'
      ])
    .pipe(rename({
      prefix: "_",
      extname: ".scss"
    }))
    .pipe(replace('%', '$'))
    .pipe(replace('"', ''))
    .pipe(replace(',', ';'))
    .pipe(replace('{\n\tname: ', '.'))
    .pipe(replace(';\n\tproperties: ', ' '))
    .pipe(replace('}\n}', '}'))
    .pipe(replace('\n\t', '\n'))
    .pipe(replace('\n}', ';\n}'))
    .pipe(gulp.dest( paths.dist + '/components'));
});