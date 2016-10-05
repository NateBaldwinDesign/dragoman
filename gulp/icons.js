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


gulp.task('svg-optimize', ['clean-build'], function() {
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
    .pipe(gulp.dest( paths.dist + '/icons/svg'))
});

gulp.task('svg-sprite', ['svg-optimize'], function() {
  return gulp
    .src([ paths.dist + '/icons/**/*.svg'], {
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
    .pipe(gulp.dest( paths.dist + '/icons/svg'))
});

gulp.task('icons-android', ['svg-optimize']);

gulp.task('icons-web', ['svg-sprite']);