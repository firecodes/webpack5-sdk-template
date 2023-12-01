/* eslint-disable no-undef */
const express = require('express');
const portfinder = require('portfinder');
const fse = require('fs-extra');
const shell = require('shelljs');

module.exports = function start() {
  let dist = 'dist' // distjs | distTs
  const server = express()
  portfinder.setBasePort(8088)
  fse.exists(dist, (exists) => {
    if (exists) {
      portfinder.getPort((err, port) => {
        server.listen(port)
        shell.echo(`the url is : http://localhost:${port}`)
        server.use('/libs/sdk/', express.static(dist))
        server.use(express.static('examples'))
      })
    } else {
      shell.echo(`please run build first`)
    }
  })
}
