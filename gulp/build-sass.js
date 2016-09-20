'use strict';

var jsonCss       = require('gulp-json-css'),
    gulp          = require('gulp'),
    clean         = require('gulp-rimraf'),
    rename        = require('gulp-rename'),
    replace       = require('gulp-replace'),
    regexReplace  = require('gulp-regex-replace'),
    paths         = gulp.paths;

//===========================================//
// Convert JSON to Less variables
gulp.task('json-less-global', ['json-sass-component', 'clean-build'], function() {
  return gulp
    .src([
      paths.tokens + '/global/**/*.json'
    ])
    .pipe(jsonCss({
      targetPre: "less",
      delim: "-"
    }))
    .pipe(rename({
      prefix: "_"
    }))
    .pipe(replace('%', '@'))
    .pipe(gulp.dest( paths.dist + '/global'));
});
gulp.task('json-less-stylesheet', ['json-less-global', 'clean-build'], function() {
  return gulp
    .src([
      paths.tokens + 'styles.json'
    ])
    .pipe(jsonCss({
      targetPre: "less",
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
    .pipe(replace(';', '";'))
    .pipe(replace('version/_', ' Version: '))
    .pipe(regexReplace({regex: '/[0-9]/', replace: '/'}))
    .pipe(gulp.dest( paths.dist ));
});
gulp.task('json-less', ['json-less-stylesheet', 'clean-build'], function() {
  return gulp
    .src([
      paths.tokens + '/components/**/theme-*.json',
      paths.tokens + '/components/**/variables.json'
    ])
    .pipe(jsonCss({
      targetPre: "less",
      delim: "-"
    }))
    .pipe(rename({
      prefix: "_"
    }))
    .pipe(replace('%', '@'))
    .pipe(gulp.dest( paths.dist + '/components'));
});
gulp.task('json-less-component', ['json-less', 'clean-build'], function() {
  return gulp
    .src([paths.tokens + '/components/**/*.json', 
      '!' + paths.tokens + '/components/**/theme-*.json',
      '!' + paths.tokens + '/components/**/variables.json'
      ])
    .pipe(rename({
      prefix: "_",
      extname: ".less"
    }))
    .pipe(replace('%', '@'))
    .pipe(replace('"', ''))
    .pipe(replace(',', ';'))
    .pipe(replace('{\n\tname: ', '.'))
    .pipe(replace(';\n\tproperties: ', ' '))
    .pipe(replace('}\n}', '}'))
    .pipe(replace('\n\t', '\n'))
    .pipe(replace('\n}', ';\n}'))
    .pipe(gulp.dest( paths.dist + '/components'));
});