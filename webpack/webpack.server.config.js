/* eslint-disable no-undefined, object-shorthand */

var webpack = require('webpack')
var config = require('../config/config')
var merge = require('lodash.merge')
var paths = require('../config/paths')
var webpackConfig = require('./webpack.config.js')
var DEBUG = config.DEBUG

//
// Server Config
// -----------------------------------------------------------------------------
var webpackServerConfig = merge({}, webpackConfig, {
  name: 'server',
  target: 'node',
  entry: {
    [config.appName]: './src/server'
  },
  output: {
    chunkFilename: '[name].js',
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    path: DEBUG ? paths.devServerOutputDir : paths.serverOutputDir
  },
  plugins: webpackConfig.plugins.concat(
    new webpack.DefinePlugin({ __BROWSER__: false })
  ).concat(DEBUG ? [] : [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        warnings: false
      }
    })
  ]),
  node: {
    __dirname: true
  },
  externals: /^[a-z][a-z\.\-0-9]*$/
})

module.exports = webpackServerConfig
