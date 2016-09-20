'use strict';

var gulp          = require('gulp'),
    clean         = require('gulp-rimraf'),
    rename        = require('gulp-rename'),
    replace       = require('gulp-replace'),
    wrapper       = require('gulp-wrapper'),
    concat_json   = require("gulp-concat-json"),
    beautify      = require('gulp-beautify');

//===========================================//
//===========================================//
//       CRAFT LIBRARY TRANSLATIONS
//       --------IN PROGRESS-------
//===========================================//
//===========================================//
// Generate Colors Token from .library
// These craft gulp tasks are not properly converting colors. Needs lots of work
gulp.task('craft-sass', function() {
  return gulp
    .src('*.library/*.color/*.json')
    .pipe(concat_json('colors-craft.json'))  // pull all color metadata json into one

    .pipe(beautify())
    .pipe(replace("[", ""))
    .pipe(replace("]", "")) 
    // .pipe(jsonCss({
    //   targetPre: "scss",
    //   delim: "-"
    // }))
    // .pipe(rename('_colors-craft.scss'))
    .pipe(gulp.dest( 'temp' ));
});

//===========================================//
// Read JSON from Craft .library files
gulp.task('craft-color-ios', function() {
  return gulp
    .src('*.library/*.color/*.json')
    .pipe(concat_json('colors.js'))   // pull all color metadata json into one
    .pipe(replace('"r"', 'red'))      // spell out RGBA name
    .pipe(replace('"g"', 'green'))    // spell out RGBA name
    .pipe(replace('"b"', 'blue'))     // spell out RGBA name
    .pipe(replace('"a"', 'alpha'))    // spell out RGBA name
    // Strategically replace to inject iOS declarations
    .pipe(replace('{"', '\n  class func '))
    .pipe(replace('":{', '-temp() -> UIColor {\n    return UIColor('))
    .pipe(replace('},', ')'))
    .pipe(replace(/"name"[^\n]*/g, '}')) // removes all lines beginning with "name"
    .pipe(replace('}', '\n  }'))
    .pipe(replace("[", ""))
    .pipe(replace("]", ""))
    // Wrap document with iOS declaration for UI color extension
    .pipe(wrapper({
      header: 'import UIKit\nextension UIColor {',
      footer: '\n}\n'
    }))
    .pipe(rename('colors-ios.swift'))  // Name as swift file
    .pipe(gulp.dest( paths.dist ));
});