
const path = require('path')
const config = require('./config')

// Root Dir
exports.contextDir = path.join(__dirname, '..')

// production
exports.buildDir = path.join(exports.contextDir, 'build')
exports.publicDir = path.join(exports.buildDir, 'public')
exports.serverOutputDir = exports.buildDir
exports.clientOutputDir = exports.publicDir

exports.styleSheet = path.join(path.relative(exports.serverOutputDir, exports.publicDir), config.cssName)
