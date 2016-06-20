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
    eventStream = require('event-stream'),

    //===========================================//
    // SET THE PATH TO YOUR SOURCE & DESTINATION
    // FOR BUILD PROCESSES.
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
      header: '<?xml version="1.0" encoding="utf-8"?><resources> \n',
      footer: '</resources> \n'
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
      header: '<?xml version="1.0" encoding="utf-8"?><resources> \n',
      footer: '</resources> \n'
    }))
    .pipe(replace('$', '    <color name="'))
    .pipe(replace(': ', '">'))
    .pipe(replace(';', '</color>'))
    .pipe(rename('colors-android.xml'))
    .pipe(gulp.dest( pathToDest ));
});

//===========================================//
// Convert JSON to iOS JSON format
function convertHex(hex,opacity){
    var hex = hex.replace('#',''),
        r = parseInt(hex.substring(0,2), 16),
        g = parseInt(hex.substring(2,4), 16),
        b = parseInt(hex.substring(4,6), 16);

    result = 'rgba('+r+','+g+','+b+','+opacity/100+')';
  return eventStream.map(convertHex);
}

gulp.task('color-to-rgba', function() {
  return gulp
    .src( pathToSource + 'color.json')
    .pipe(jsonTransform(function(data) {
      return {
        'color': data.color
      };
    }))
    .pipe(convertHex())
    .pipe(rename('colors-ios.xml'))
    .pipe(gulp.dest( pathToDest ));
})


// $('h1').html(convertHex('#A7D136',50));

gulp.task('default', ['json-android-color']);
