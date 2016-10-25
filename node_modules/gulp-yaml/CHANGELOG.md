# 1.0.1 (2015-10-22)

### Bug Fixes

- error thrown when multiple files are processed [#4](https://github.com/crissdev/gulp-yaml/issues/4)

# 1.0.0 (2015-10-17)

### Features

- add support for `schema` option. The option must be specified as string, lower or upper case.
- add support for `filename` option. The default value will be set to the path of file being processed.

### Breaking changes

- `safe` option is `true` by default
- removed `pretty` option. Use the `space` option instead (e.g `space: 2`). This means more control of the output.

### Maintenance

- updated js-yaml dependency to its latest version available (3.4.3)
- remove iojs and use node stable version instead


# 0.2.4 (2015-03-15)

- target node.js 0.12 and io.js for Travis CI
- updated js-yaml dependency to its latest version available (3.2.7)
- option name for `replacer` was not correct in README.md


# 0.2.3 (2014-12-01)

- unsafe file was tested only in stream mode
- updated js-yaml dependency to its latest version available (3.2.3)


# 0.2.2 (2014-10-04)

- use new Github user name


# 0.2.1 (2014-09-26)

## Bug Fixes

- change resulting file extension to ```.json``` in stream mode


# 0.2.0 (2014-09-19)

## Features

- add support for streams
- add new options *space* and *replacer* to have a better control of the output
- upgrade js-yaml dependency to its last version available (3.2.2)

**The _pretty_ option has been deprecated, and _space_ option should be used instead**


# 0.1.0 (2014-08-26)

## Features

- upgrade js-yaml dependency to its last version available (3.2.1)


## Breaking changes

- Because this plugin uses [js-yaml](https://github.com/nodeca/js-yaml) this version might add some
breaking changes. Please check
[js-yaml Breaking changes](https://github.com/nodeca/js-yaml#breaking-changes-in-2xx---3xx)
for potential issues and how to fix them.


# 0.0.3 (2014-07-24)

## Features

- add ```safe``` to the list of supported options. The default value is ```false```
  to maintain compatibility with previous versions. If you suspect to have untrusted YAML in your
  project files, then turn this flag on.


# 0.0.2 (2014-07-23)

## Features

- **README.md** add badges for ```npm version```, ```build status``` and ```dependency status```


# 0.0.1 (2014-07-23)

## Features

- add ```pretty``` to the list of supported options. If this flag is true then resulting JSON will
be pretty printed. The default value is ```false```.
