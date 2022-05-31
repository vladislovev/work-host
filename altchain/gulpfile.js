let gulp = require('gulp');
let zip = require('gulp-zip');
let notify = require("gulp-notify");
let path = require('path');
let fs = require('fs');


function altchainJSZip() {
  let filename = 'altchain-js.zip'
  return gulp.src([
    './dist/**/*',
  ], {dot: true,}).pipe(zip(filename))
    .pipe(gulp.dest('../'))
    .pipe(notify({
      message: 'Архив готов',
      sound: true,
      title: 'altchain JS'
    }))

}

exports.packJS = gulp.series(altchainJSZip);
exports.altchainJSZip = () => {
  return altchainJSZip()
};