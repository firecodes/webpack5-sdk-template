const gulp = require('gulp')
const startServer = require('./server.js')
// import gulp from 'gulp'
// import startServer from './server.js'

gulp.task('server', gulp.series((done) => {
  startServer()
  done();
}));
