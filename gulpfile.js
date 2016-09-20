// 'use strict';

var gulp          = require('gulp'),
    clean         = require('gulp-rimraf'),
    rename        = require('gulp-rename'),
    replace       = require('gulp-replace'),
    wrapper       = require('gulp-wrapper'),
    jsonTransform = require('gulp-json-transform'),
    run           = require('gulp-run'),
    concat_json   = require("gulp-concat-json"),
    beautify      = require('gulp-beautify'),
    flatten       = require('gulp-flatten'),
    regexReplace  = require('gulp-regex-replace');

gulp.paths = {
  tokens: 'tokens',
  dist: 'dist',
  tmp: 'temp'
};

require('require-dir')('./gulp');

// Clean Build
gulp.task('clean-build', function() {
  gulp.src( paths.dist ).pipe(clean());
});


gulp.task('default', [
  'clean-build', 
  'json-stylus-component', 
  'json-ios-color', 
  'iconography'
]);
