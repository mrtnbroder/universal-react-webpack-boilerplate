
var path = require('path')
var config = require('./config')

var paths = {
  contextDir: () => path.join(__dirname),
  // production
  publicDir: () => path.join(paths.contextDir(), 'public'),
  buildDir: () => path.join(paths.contextDir(), 'build'),
  serverOutputDir: () => path.join(paths.buildDir(), 'server'),
  clientOutputDir: () => paths.publicDir(),
  // development
  webpackDir: () => path.join(paths.contextDir(), config.tmpDir),
  devPublicDir: () => `http://${config.host}:${config.webpackDevServerPort}/${config.tmpDir}`,
  devServerOutputDir: () => path.join(paths.webpackDir(), 'server'),
  devClientOutputDir: () => path.join(paths.webpackDir(), 'client')
}

module.exports = paths
