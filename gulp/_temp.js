'use strict';

var gulp          = require('gulp'),
    fs            = require('fs'),
    clean         = require('gulp-rimraf'),
    rename        = require('gulp-rename'),
    replace       = require('gulp-replace'),
    wrapper       = require('gulp-wrapper'),
    jsonTransform = require('gulp-json-transform'),
    run           = require('gulp-run'),
    concat_json   = require("gulp-concat-json"),
    beautify      = require('gulp-beautify'),
    flatten       = require('gulp-flatten'),
    regexReplace  = require('gulp-regex-replace'),
    gutil         = require('gulp-util');
    
// gulp.task('test', function() {
//   console.log(paths.tokens + '/**/*.*')
// });

gulp.task('test2', function() {
  return gulp
    .src(paths.tokens + '/**/color.json')
    .pipe(flatten())
    .pipe(gulp.dest(paths.dist + '/color'));
});