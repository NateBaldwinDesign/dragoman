import 'source-map-support/register'

import R from 'ramda'
import path from 'path'
import help from 'gulp-help'
import sourcegate from 'sourcegate'
import chalk from 'chalk'
import tracer from 'tracer'

export const pkg = require(path.join(process.cwd(), 'package.json'))

export function isLocal(name) {
  let dep = R.has(name)
  return dep(pkg.dependencies || {}) || dep(pkg.devDependencies || {})
}

export function myRequire(name) {
  let where = path.normalize(`${process.cwd()}/node_modules/${name}`)
  return require(path.join(where, require(path.join(where, 'package.json')).main))
}

export let logger = tracer.console({
  'filters': {'log': chalk.green, 'warn': chalk.yellow, 'error': chalk.red},
  'format': `<${pkg.name} using {{path}}:{{line}}>\n{{message}}\n`
})

export function gulpIsHelpful(gulp) {
  return R.is(Object, R.path(['help', 'help'], gulp.tasks))
}

export function gulpHelpify(gulp, opts) {
  return gulpIsHelpful(gulp) ? gulp : help(gulp, opts)
}

// Helpful task creation.  The given desc is discarded if gulp isn't gulp-help "helpful".
export function gulpTask(gulp, name, desc, ...rest) {
  let args = (gulpIsHelpful(gulp)) ? [].concat(name, desc, rest) : [].concat(name, rest)
  return gulp.task(...args)
}

export function pollen(anthers, where) {
  let flaments = require(where || path.normalize('../src/pollen.json'))
  let got = anthers.map(select => {
    return typeof select === 'string' ? flaments[select] : select // object assumed
  })
  return sourcegate(got)
}
