var gulp = require('beverage')(require('gulp'))

gulp.task('dev', 'DEVELOP', ['build', 'build:watch'])
