'use strict'

var R = require('ramda'),
    path = require('path'),
    task = require('be-goods').gulpTask,
    run = require('childish-process'),
    def = R.merge({
      include: [],
      exclude: [],
      require: [],
      requireStrict: false,
      npmRun: false,
      customize: {}
    }),
    logger = require('be-goods').logger,
    scriptHelp = function (str) {
      var matches = str.match(/^(\.?\/?node_modules\/.bin\/)?(.*)$/)
      // - stands for having shortened the local script path down its essential
      // ≈ is "approximately equal to" - a global of unknown location / version
      return (matches[1] ? '-' : '≈') + ' `' + matches[2] + '`'
    }

module.exports = function (gulp, opts) {
  var o = def(opts || {})
  if(o.hasOwnProperty('withoutNpmRun')) {
    o.npmRun = ! o.withoutNpmRun
    logger.warn('Option withoutNpmRun is deprecated, use npmRun instead.')
  }
  var theScripts = require('be-goods').pkg.scripts
  var includeHelp = R.mapObj(scriptHelp, theScripts)
  if (R.is(Object, o.include)) {
    includeHelp = R.merge(includeHelp, o.include)
    o.include = R.keys(o.include)
  }
  var allScripts = R.keys(theScripts)
  var useScripts = R.difference(allScripts, o.exclude) // the ones to become tasks
  if (o.templates) {
    run = run({childish: {templates: require(path.join(process.cwd(), o.templates))}})
  }

  if (useScripts.length) {
    if(R.intersection(allScripts, o.require).length < o.require.length) {
      // some required script was not in package.json
      logger.error("Not all of the required scripts were found in package.json")
      logger.error("Missing scripts:", R.difference(o.require, allScripts))
      if (o.requireStrict) process.exit(1)
    }
    useScripts.forEach(function (script) {
      task(gulp, script, includeHelp[script], function () {
        var recipe = o.customize[script] || o.default || 'default'
        if (typeof recipe === "string") {
          recipe = {template: recipe}
        }

        if (o.npmRun)
          run('npm run ' + script, {childish: recipe})
        else
          run(theScripts[script], {childish: recipe})
      })
    })
  }

  return gulp
}
