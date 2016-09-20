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
    paths         = gulp.paths;

//===========================================//
// Create SVG symbol sprite
gulp.task('svg-optimize', function() {
  return gulp
    .src( paths.tokens + '/**/*.svg')
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
    .pipe(gulp.dest( paths.dist ))
});

gulp.task('svg-sprite', ['svg-optimize'], function() {
  return gulp
    .src([ paths.dist + '/**/icons/**/*.svg'], {
      base: '.'
    })
    .pipe(rename({
      prefix: 'icon-'
    }))
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(cheerio({
      run: function($) {
        $('svg').attr('style', 'display: none');
      },
      parserOptions: {
        xmlMode: true
      }
    }))
    .pipe(rename('_icon-sprite.svg'))
    .pipe(gulp.dest( paths.dist + 'components/icons/svg'))
});

//===========================================//
// Create PNG images at ios sizes

// resize original svg to control 1x scale
gulp.task('ios-resize', function() {
  return gulp.src( paths.dist + '/**/svg/*.svg')
    // Use Gulp replace to add styles to SVG
    .pipe(replace('<svg ', '<svg fill="#ffffff" width="18px" height="" '))
    .pipe(flatten())
    .pipe(gulp.dest(paths.tmp + '18px'));
});
// convert at 1x
gulp.task('svg2png-1x', ['ios-resize'], function() {
  return gulp.src(paths.tmp + '18px/**/*.svg')
    .pipe(svg2png(1, false, 20))
    .pipe(flatten())
    .pipe(gulp.dest( paths.dist + 'components/icons/ios-1x'));
});
// convert at 2x
gulp.task('svg2png-2x', ['ios-resize'], function() {
  return gulp.src(paths.tmp + '18px/**/*.svg')
    .pipe(svg2png(2, false, 20))
    .pipe(flatten())
    .pipe(gulp.dest( paths.dist + 'components/icons/ios-2x'));
});
// convert at 3x
gulp.task('svg2png-3x', ['ios-resize'], function() {
  return gulp.src(paths.tmp + '18px/**/*.svg')
    .pipe(svg2png(3, false, 20))
    .pipe(flatten())
    .pipe(gulp.dest( paths.dist + 'components/icons/ios-3x'));
});
// Clean Build directory
gulp.task('ios-icons-resize', ['svg2png-1x', 'svg2png-2x', 'svg2png-3x'], function() {
  gulp.src(['temp']).pipe(clean());
});

gulp.task('ios-icons', ['ios-icons-resize'], function() {
  return gulp
    .src([ 
      paths.dist + 'components/icons/ios-1x',  
      paths.dist + 'components/icons/ios-2x',
      paths.dist + 'components/icons/ios-3x'])
    .pipe(imagemin({
      optimizationLevel: 6,
      use: [pngquant()]
    }))
    .pipe(gulp.dest( paths.dist + '/icons'));
});
// need to add 'ios-icons' to the 'iconography' task, but also need to find out why svg2png is not working properly
gulp.task('iconography', ['svg-sprite']);