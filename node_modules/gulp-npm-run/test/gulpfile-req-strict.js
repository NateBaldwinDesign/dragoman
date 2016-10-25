var gulp = require('gulp')

require('../index.js')(gulp, {
  require: ['necessary', 'v', 'ver'],
  exclude: ['v', 'ver'],
  requireStrict: true
})
