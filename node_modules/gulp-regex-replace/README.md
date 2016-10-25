# gulp-regex-replace [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]

> [gulp](http://gulpjs.com) plugin to replace your code using regular expressions.

## Install

```bash
$ npm install --save-dev gulp-regex-replace
```

## Usage

```js
var gulp = require('gulp');
var replace = require('gulp-regex-replace');

gulp.task('default', function () {
	return gulp.src('test.js')
		.pipe(replace({regex:'Lorem', replace:'DeLorean'}));
});
```

## Example

To see how gulp-regex-replace is being used in other projects checkout [gulp-obfuscate](https://github.com/mikrofusion/gulp-obfuscate).

## API

### replace(options)

#### options.regex

Type: `String`, `Array of Strings`, or `Key/value with 'include' and 'exclude' as keys`

Default: ` `

Values: `word`, `__v_[_A-Za-z0-9]+__`, `.(abc).`, `[ 'var(.*?;)', '([a-zA-Z_$]+)[, =;]' ]`, `...`

The regular expresion (or array of regular expressions) used to match words to be
replaced.  If an array is provided then the string to be replaced will be the cumulative
result of the regular expressions.

If the regular expression contains groups (denoted by a value within parenthesis)
then only the groups will be replaced rather than the entire matching string.

Regex may also be key value pairs 'include' and 'exclude' indicating the regular expression matches to
include or exclude.  e.g. `{ include: '([a-zA-Z0-9_$]+)[, =;]', exclude: '=[ ]*?([a-zA-Z0-9_$]+)[, =;]' }`
will replace `abc` in `var abc` but exclude `def` in `var abc = def`.

#### options.replace

Type: `String` or `Method`

Default: `''`

Values: `DeLorean`, `Lorem`, `function(match) { return 'DeLorean'; }`, `...`

The replace string or method.

If a method is given then the result of that method will be the replace string.
The input to that method will be the string matching the regular expression.

#### options.exclude

Type: `String` or `Array of Strings`

This is a single or array of regular expression strings which will override the default logic and
prevent matching strings from being replaced.

## License

[MIT](http://opensource.org/licenses/MIT) © Mike Groseclose

[npm-url]: https://npmjs.org/package/gulp-regex-replace
[npm-image]: https://badge.fury.io/js/gulp-regex-replace.png

[travis-url]: http://travis-ci.org/mikrofusion/gulp-regex-replace
[travis-image]: https://secure.travis-ci.org/mikrofusion/gulp-regex-replace.png?branch=master
