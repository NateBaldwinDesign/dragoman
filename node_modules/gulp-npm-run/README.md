# gulp-npm-run

Creates gulp tasks for your npm scripts.
Notifies if a task fails, using node-notifier via childish-process.
Notifications can be customized.

## Use

[![NPM](https://nodei.co/npm/gulp-npm-run.png?mini=true)](https://www.npmjs.org/package/gulp-npm-run)

As simple as it gets:

```javascript
var gulp = require('gulp-npm-run')(require('gulp'));
```

### Configure

It can take configuration options, here are a few of them:

```javascript
var gulp = require('gulp-npm-run')(require('gulp'), {
  exclude: ['test'], // the test script is excluded
  include: {'necessary': 'a must-have task, because...'} // just a helpful description
  require: ['necessary'], // maybe because other tasks depend it
  requireStrict: false,
  npmRun: false // rather than `npm run script` gulp runs the script's value / command(s)
});
```

By `require` we insist there must be corresponding scripts in `package.json` -
it's a declaration of assumptions or dependencies to insist on being satisfied.
Use `requireStrict: true` to make sure require is actually satisfied -
gulp will not run any tasks until all the scripts are found, with this option.
There will be a warning in either case.  Require is a separate concern
with regards to exclude, a script can be both required and excluded -- i.e.
if it's expected in package.json without corresponding task created,
for whatever reason.

The `test` script / task is good to `exclude` in favor of
[gulp-npm-test](https://github.com/gulpsome/gulp-npm-test),
which does the same, only better.
Or, perhaps because you'd like to implement your very own test task.
In any case, excluding scripts isn't strictly required to gulp-implement them,
as one can simply call `gulp.task` to replace any pre-existing task code.
Anyway, there may be npm scripts for which you do not want to have gulp tasks.
Exclude enables that.

#### Include / Help

The counterpart of exclude is include, which could be an Array whitelist.
Its more useful form is an Object, the keys corresponding to npm scripts,
the values as `help` for [gulp-help](https://github.com/chmontgomery/gulp-help).
In accordance with its `gulp.task` api this help can be a message String,
or `false` in which case the script's gulp task doesn't show with `gulp help`.
All tasks created by `gulp-npm-run` will have help messages by default -
these basically show what the script (i.e. command) being `npm run` is, exactly.
Use the [new task api](https://github.com/chmontgomery/gulp-help#new-task-api)
to describe tasks subsequently added, if more complete documentation is desired.

```sh
gulp help
```

However, please note that in order to enable help, you'd either have to either:

1. use [beverage](https://github.com/gulpsome/beverage) for this and other reasons,
2. or setup [gulp-help](https://github.com/chmontgomery/gulp-help) on your own:

```javascript
var gulp = require('gulp-npm-run')(require('gulp-help')(require('gulp')));
```

Help is entirely optional, `gulp-npm-run` does not modify `gulp`'s api for you.

#### Further

See [datomiki](https://github.com/datomicon/datomiki)
for a practical, somewhat more advanced usage example.

See [childish-process](https://github.com/orlin/childish-process)
for further understanding of `templates`, `default` and `customize` - options
for configuring a task's event-handlers / notifications.

## Tests [![Build Status](https://img.shields.io/travis/gulpsome/gulp-npm-run.svg?style=flat)](http://travis-ci.org/gulpsome/gulp-npm-run)

```sh
install.sh #once
npm test
```

Though `gulp-npm-run` should work on any platform, its tests may
need a _*nix_ to run, e.g. Linux, MacOS, etc.

## Develop

[![Dependency Status](https://david-dm.org/gulpsome/beverage.svg)](https://david-dm.org/gulpsome/gulp-npm-run)
[![devDependency Status](https://david-dm.org/gulpsome/beverage/dev-status.svg)](https://david-dm.org/gulpsome/gulp-npm-run#info=devDependencies)

## License

[MIT](http://orlin.mit-license.org)
