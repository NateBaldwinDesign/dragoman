# gulp-concat-json

> A plugin for Gulp to combine several JSON files

## Usage

First, install `gulp-concat-json` as a development dependency:

```shell
npm install --save-dev gulp-concat-json
```

Then, add it to your `gulpfile.js`:

```javascript
var concat_json = require("gulp-concat-json");

gulp.src("api/project/*.json")
	.pipe(concat_json("project.js"))
	.pipe(gulp.dest("dist/api"));
```

## API

### concat-json(fileName, processor)

#### fileName
Type: `String`  

The output filename