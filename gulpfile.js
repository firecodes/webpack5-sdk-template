const gulp = require('gulp')
const startServer = require('./server.js')
const fse = require('fs-extra');

function existsFile(dist = 'dist', callback) {
  fse.exists(dist, (exists) => {
    if (exists) {
      callback && callback()
    } else {
      shell.echo(`please run build first`)
    }
  })
}

async function copyAssets() {
  existsFile('dist', async function () {
    await fse.emptyDir('dist-examples')
    await gulp
      .src('./examples/**', { nodir: true })
      .pipe(gulp.dest('dist-examples'))
    await gulp
      .src('./dist/**', { nodir: true })
      .pipe(gulp.dest('dist-examples/libs/sdk/'))
  })
}

gulp.task('server', gulp.series((done) => {
  startServer()
  done();
}));

gulp.task('build', gulp.series((done) => {
  copyAssets()
  done();
}));
