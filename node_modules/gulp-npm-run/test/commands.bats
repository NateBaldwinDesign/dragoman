load $(which batshit-helpers)

base="$(pwd)/test/node_modules/.bin/gulp"
gulp="${base} --gulpfile $(pwd)/test/gulpfile.js"
pwd=$(pwd)

@test "gulp-npm-run should create a test task for npm test" {
  run $gulp test
  assert_success
}

@test "gulp-npm-run should create a test task for any of the package.json scripts" {
  run $gulp deps
  assert_success
}

@test "except gulp-npm-run shouldn't create tasks for explicitly excluded scripts" {
  run $gulp prune
  assert_failure
}

@test "gulp-npm-run can require certain scripts being wanted and complain about any missing ones" {
  run $base --gulpfile ${pwd}/test/gulpfile-req.js test
  assert_success
  assert_output_contains "Missing scripts: [ 'wanted' ]"
}

@test "gulp-npm-run can require that some scripts be present, in order to work" {
  run $base --gulpfile ${pwd}/test/gulpfile-req-strict.js test
  assert_failure
  assert_output_contains "Missing scripts: [ 'necessary', 'v' ]"
}
