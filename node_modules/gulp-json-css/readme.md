# Gulp-json-css

> Gulp plugin for turning JSON files into files of scss/sass/less variable definitions. This plugin is based on https://www.npmjs.com/package/gulp-json-sass

*Issues should be reported on the [issue tracker](https://github.com/SimonHarte/gulp-json-scss/issues).*

Now you can share configurations between your CSS files and Javascript!

Supports all JSON objects, including nested objects, arrays and keys which are not legal key names.
Variable names that begin with a number will be prefixed and such containing illegal characters will have those characters removed.

Ignores (passes through) files with a extensions other than `.json`.

## Installation

```sh
npm install gulp-json-css --save-dev
```

## Example

In this example gulpfile, a JSON file is turned into a file of scss variables, concatenated with a scss file, and compiled using `gulp-sass`.

```js
var jsonCss = require('gulp-json-css'),
    gulp = require('gulp'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass');

gulp.task('scss', function() {
  return gulp
    .src(['example.json', 'example.scss'])
    .pipe(jsonCss())
    .pipe(concat('output.scss'))
    .pipe(sass())
    .pipe(gulp.dest('out/'));
});
```

## API

### jsonCss(options)

Returns: `stream`

#### options

Type: `object`

##### targetPre

Type: `string` (`scss|sass|less`)  
Default: `scss`

Defines the target preprocessor for which JSON files should be converted.

##### delim

Type: `string`  
Default: `-`

Delimiter used to chain nested objects keys to a simple variables. For example, if `delim` is `'-'`, then

```js
{
  "someObject" : {
    "someKey" : 123
  }
}
```

will be converted into (in SCSS):

```scss
$someObject-someKey: 123;
```

Note that keys themselves can contain the delimiter.
No attempt is made to ensure that variable names are unique.

##### keepObjects

Type: `boolean`  
Default: `false`

Instead of creating a variable with every object value you can instead convert objects to maps and arrays to lists.
With the example above you'd get this output instead (still SCSS):

```scss
$someObject: (someKey 123);
```

And with a more complex setup:

```js
{
	"anArray": [1, 2, 3],
	"anObject": {
		"aSubObject": {
			"key1": "value1",
			"key2": "value2"
		},
		"aSubArray": [4, 5, 6]
	}
}
```

This output (the actual output is flattened into one line):

```scss
$anArray: (1, 2, 3);
$anObject: (
	aSubObject: (
		key1: value1,
		key2: value2
	),
	aSubArray: (4, 5, 6)
);
```

> Note that you can only build simple lists in LessCSS.

Since LessCSS does not allow for nested objects or objects in general for that matter,
we can only convert arrays to lists, so for objects we go back to chaining keys to simple variables.
Output with the above setup:

```less
@anObject-anArray: 1, 2, 3;
@anObject-aSubObject-key1: value1;
@anObject-aSubObject-key2: value2;
@anObject-aSubArray: 4, 5, 6;
```

##### numberPrefix

Type: `string`  
Default: `_`

What string is used to prefix numeric keys,
it is necessary since variables aren't allowed to start with a number.
This means that the following object:

```js
{
  "1maca" : {
    "2maca" : "asdf"
  },
  "3maca" : "rena"
}
```

Will result in (SCSS):

```scss
$_1maca-2maca: asdf;
$_3maca: rena;
```

Note that chained sub keys won't be prefixed since it's not necessary anymore,
if you use the `keepObjects` setting though, every key starting with a number will be prefixed.

```scss
$_1maca: (_2maca asdf);
$_3maca: rena;
```

##### ignoreJsonErrors

- Type: `boolean`  
- Default: `false`

If true, malformed JSON does not result in the plugin emitting an error.

## License

MIT.