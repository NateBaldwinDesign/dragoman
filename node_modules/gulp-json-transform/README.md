gulp-json-transform
===================
[![NPM Version](http://img.shields.io/npm/v/gulp-json-transform.svg?style=flat)](https://www.npmjs.com/package/gulp-json-transform)
[![Build Status](https://travis-ci.org/thaggie/gulp-json-transform.svg)](https://travis-ci.org/thaggie/gulp-json-transform)
[![Dependencies Status](https://david-dm.org/thaggie/gulp-json-transform.svg)](https://david-dm.org/thaggie/gulp-json-transform)


A [gulp](https://github.com/gulpjs/gulp) plugin to transform JSON files, pipe JSON files through it and transform them to other JSON files or other text based formats.


## Usage


First install `gulp-json-transform` as a development dependency:

```shell
npm install gulp-json-transform --save-dev
```

Then, add it to your gulpfile.js:

```javascript
var jsonTransform = require('gulp-json-transform');
```

Then create a task that uses it:

```javascript
gulp.task('do-something', function() {
	gulp.src('./app/**/*.json')
	.pipe(jsonTransform(function(data, file) {
		return {
			foobar: data.foo + file.relative
		};
	}))
	.pipe(gulp.dest('./dist/out/'));
});
```

## API

### jsonTransform(transformFn [, whiteSpace])

#### transformFn
Type: `function`

A function that takes the JSON object and a file object (parameters path, base and relative are exposed) as the input parameters and should return either a string which is written raw to the file, a JSON object which is stringified or a Promise which resolves to a string or a JSON object.

Example structure of the file object:
```
{
  path: 'test/fixtures/input.json',
  relative: 'input.json',
  base: 'test/fixtures'
}
```

#### whiteSpace

Type: `String` or `Number`
Default: `undefined`

JSON.stringify's whitespace attribute for pretty-printing the resulting JSON.
See [MDN docs on JSON.stringify()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) for more information.

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
