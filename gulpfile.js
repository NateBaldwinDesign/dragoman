var jsonSass = require('gulp-json-sass'),
    jsonCss = require('gulp-json-css'),
    gulp = require('gulp'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    clean = require('gulp-rimraf'),
    rename = require('gulp-rename'),
    replace = require('gulp-replace'),
    wrapper = require('gulp-wrapper'),
    data = require('gulp-data'),
    jsonTransform = require('gulp-json-transform'),

    //===========================================//
    // SET THE PATH TO YOUR SOURCE & DESTINATION
    // FOR BUILD PROCESSES.
    // [1] Path to your source JSON files
    // [2] Path to distribute variable files
    //===========================================//
    pathToSource = 'config/',
    pathToDest = 'dest/';

//===========================================//
// Clean Build
gulp.task('clean-build', function() {
  gulp.src( pathToDest + '**/*.*').pipe(clean());
});
//===========================================//
// Convert JSON to SCSS variables
gulp.task('json-scss', ['clean-build'], function() {
  return gulp
    .src( pathToSource + '*.json')
    .pipe(jsonCss({
      targetPre: "scss",
      delim: "-"
    }))
    .pipe(rename({
      prefix: "_"
    }))
    .pipe(gulp.dest( pathToDest ));
});
//===========================================//
// Convert JSON to SASS variables
gulp.task('json-sass', ['json-scss'], function() {
  return gulp
    .src( pathToSource + '*.json')
    .pipe(jsonCss({
      targetPre: "sass",
      delim: "-"
    }))
    .pipe(rename({
      prefix: "_"
    }))
    .pipe(gulp.dest( pathToDest ));
});
//===========================================//
// Convert JSON to Less variables
gulp.task('json-less', ['json-sass'], function() {
  return gulp
    .src( pathToSource + '*.json')
    .pipe(jsonCss({
      targetPre: "less",
      delim: "-"
    }))
    .pipe(rename({
      prefix: "_"
    }))
    .pipe(gulp.dest( pathToDest ));
});
//===========================================//
// Convert JSON to Stylus variables
gulp.task('json-stylus', ['json-less'], function() {
  return gulp
    .src( pathToSource + '*.json')
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
    .pipe(gulp.dest( pathToDest ));
});
//===========================================//
// Convert JSON to Android XML
gulp.task('json-android-dimensions', ['json-stylus'], function() {
  return gulp
    .src( pathToSource + '*.json')
    .pipe(jsonTransform(function(data) {
      return {
        base: data.base,
        whitespace: data.whitespace
      };
    }))
    .pipe(jsonCss({
      targetPre: "scss",
      delim: "-"
    }))
    .pipe(wrapper({
      header: '<?xml version="1.0" encoding="utf-8"?> \n<resources> \n',
      footer: '\n</resources> \n'
    }))
    .pipe(replace('$', '    <dimen name="'))
    .pipe(replace(': ', '">'))
    .pipe(replace(';', '</dimen>'))
    .pipe(rename('dimens-android.xml'))
    .pipe(gulp.dest( pathToDest ));
});
gulp.task('json-android-color', ['json-android-dimensions'], function() {
  return gulp
    .src( pathToSource + 'color.json')
    .pipe(jsonCss({
      targetPre: "scss",
      delim: "-"
    }))
    .pipe(wrapper({
      header: '<?xml version="1.0" encoding="utf-8"?> \n<resources> \n',
      footer: '\n</resources> \n'
    }))
    .pipe(replace('$', '    <color name="'))
    .pipe(replace(': ', '">'))
    .pipe(replace(';', '</color>'))
    .pipe(rename('colors-android.xml'))
    .pipe(gulp.dest( pathToDest ));
});

//===========================================//
// Convert JSON to iOS JSON format
gulp.task('json-ios-color', ['json-android-color'], function() {
  return gulp
    // Convert JSON to Scss
    .src( pathToSource + 'color.json')
    .pipe(jsonCss({
      targetPre: "scss",
      delim: "-"
    }))
    // Replace characters to allow compiling 
    // valid CSS in order to convert HEX to RGBA
    .pipe(replace('$', 'div#'))
    .pipe(replace(': #', ' { background-color: rgba(#'))
    .pipe(replace(';', ', 0.999999999); }'))
    // Convert to CSS
    .pipe(sass())
    // Replace temporaty characters with strings
    // that will produce valid swift declarations
    .pipe(replace('div#', '  class func '))
    .pipe(replace(' {', '() -> UIColor {'))
    .pipe(replace('}', '\n  }'))
    .pipe(replace('  background-color: rgba(', '    return UIColor('))
    .pipe(replace('1)', 'alpha: 1'))
    .pipe(replace(',', '.0/255.0,'))
    .pipe(replace('; }', ');\n}'))
    // Add wrapper with UIKit declarations
    .pipe(wrapper({
      header: 'import UIKit\nextension UIColor {\n',
      footer: '}\n'
    }))
    .pipe(rename('colors-ios.xml'))
    .pipe(gulp.dest( pathToDest ));
});

gulp.task('default', ['json-ios-color']);
