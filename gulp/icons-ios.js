'use strict';

var gulp          = require('gulp'),
    clean         = require('gulp-rimraf'),
    rename        = require('gulp-rename'),
    replace       = require('gulp-replace'),
    run           = require('gulp-run'),
    pngquant      = require('imagemin-pngquant'),
    // svg2png       = require('gulp-svg2png'),
    imagemin      = require('gulp-imagemin'),
    svgstore      = require('gulp-svgstore'),
    svgmin        = require('gulp-svgmin'),
    cheerio       = require('gulp-cheerio'),
    flatten       = require('gulp-flatten'),
    config        = require('../config.json'),
    paths = {
      tokens: config.path.tokens,
      dist: config.path.dist,
      css: config.path.css,
      js: config.path.js,
      temp: config.path.temp,
      assets: config.path.assets
    };

gulp.task('svg-temp', function() {
  return gulp
    .src( paths.assets + '/**/*.svg')
    .pipe(svgmin({
        plugins: [{
          removeXMLProcInst: false
        }, {
          removeViewBox: false
        }, {
          removeStyleElement: true
        }, {
          removeAttrs: {
            attrs: ['id', 'path:fill', 'class']
          }
        }, {
          removeDimensions: true
        }, {
          removeTitle: true
        }]
      }))
    .pipe(flatten())
    .pipe(gulp.dest( paths.temp + '/icons/svg'))
});
// resize original svg to control 1x scale
gulp.task('ios-resize', ['svg-temp'], function() {
  return gulp.src( paths.temp + '/**/svg/*.svg')
    // Use Gulp replace to add styles to SVG
    .pipe(replace('<svg ', '<svg fill="#ffffff" width="18px" height="18px" '))
    .pipe(flatten())
    .pipe(gulp.dest(paths.temp + '/18px'));
});
// convert at 1x
gulp.task('svg2png-1x', ['ios-resize'], function() {
  return gulp.src(paths.temp + '/18px/**/*.svg')
    .pipe(svg2png(1, false, 20))
    .pipe(flatten())
    .pipe(gulp.dest( paths.dist + '/icons/ios/1x'));
});
// convert at 2x
gulp.task('svg2png-2x', ['ios-resize'], function() {
  return gulp.src(paths.temp + '/18px/**/*.svg')
    .pipe(svg2png(2, false, 20))
    .pipe(flatten())
    .pipe(gulp.dest( paths.dist + '/icons/ios/2x'));
});
// convert at 3x
gulp.task('svg2png-3x', ['ios-resize'], function() {
  return gulp.src(paths.temp + '/18px/**/*.svg')
    .pipe(svg2png(3, false, 20))
    .pipe(flatten())
    .pipe(gulp.dest( paths.dist + '/icons/ios/3x'));
});
// Clean Build directory
gulp.task('ios-icons-resize', ['svg2png-1x', 'svg2png-2x', 'svg2png-3x'], function() {
  gulp.src(['temp']).pipe(clean());
});

gulp.task('icons-ios', ['ios-icons-resize'], function() {
  return gulp
    .src([ 
      paths.dist + '/icons/ios/1x',  
      paths.dist + '/icons/ios/2x',
      paths.dist + '/icons/ios/3x'])
    .pipe(imagemin({
      optimizationLevel: 6,
      use: [pngquant()]
    }))
    .pipe(gulp.dest( paths.dist + '/icons'));
});
