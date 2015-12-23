
var path = require('path')
var config = require('./config')

// Root Dir
var contextDir = path.join(__dirname)

// production
var publicDir = path.join(contextDir, 'public')
var buildDir = path.join(contextDir, 'build')
var serverOutputDir = path.join(buildDir, 'server')
var clientOutputDir = publicDir

// development
var webpackDir = path.join(contextDir, config.tmpDir)
var devPublicDir = `http://${config.host}:${config.webpackDevServerPort}/${config.tmpDir}`
var devServerOutputDir = path.join(webpackDir, 'server')
var devClientOutputDir = path.join(webpackDir, 'client')

exports.contextDir = contextDir
exports.publicDir = publicDir
exports.buildDir = buildDir
exports.serverOutputDir = serverOutputDir
exports.clientOutputDir = clientOutputDir
exports.webpackDir = webpackDir
exports.devPublicDir = devPublicDir
exports.devServerOutputDir = devServerOutputDir
exports.devClientOutputDir = devClientOutputDir
