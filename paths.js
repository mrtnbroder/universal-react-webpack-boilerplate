
var path = require('path')
var config = require('./config')

// Root Dir
exports.contextDir = path.join(__dirname)

// production
exports.publicDir = path.join(exports.contextDir, 'public')
exports.buildDir = path.join(exports.contextDir, 'build')
exports.serverOutputDir = path.join(exports.buildDir, 'server')
exports.clientOutputDir = exports.publicDir

// development
exports.webpackDir = path.join(exports.contextDir, config.tmpDir)
exports.devPublicDir = `http://${config.host}:${config.webpackDevServerPort}/${config.tmpDir}`
exports.devServerOutputDir = path.join(exports.webpackDir, 'server')
exports.devClientOutputDir = path.join(exports.webpackDir, 'client')
