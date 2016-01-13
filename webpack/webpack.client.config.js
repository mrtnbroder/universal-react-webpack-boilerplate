/* eslint-disable no-undefined, object-shorthand */

var webpack = require('webpack')
var merge = require('lodash.merge')
var config = require('../config')
var paths = require('../paths')
var webpackConfig = require('./webpack.config.js')
var StatsWriterPlugin = require('webpack-stats-plugin').StatsWriterPlugin
var DEBUG = config.DEBUG
var filename = DEBUG ? '[name].js' : '[name].[chunkhash].js'

//
// Client Config
// -----------------------------------------------------------------------------
var webpackClientConfig = merge({}, webpackConfig, {
  name: 'browser',
  target: 'web',
  entry: {
    [config.appName]: './src/client',
    [config.vendorName]: [
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'redux',
      'redux-actions',
      'redux-promise-middleware',
      'redux-thunk'
    ]
  },
  output: {
    chunkFilename: filename,
    filename: filename,
    path: DEBUG ? paths.devClientOutputDir : paths.clientOutputDir
  },
  plugins: webpackConfig.plugins.concat(
    new webpack.DefinePlugin({ __BROWSER__: true }),
    new webpack.optimize.CommonsChunkPlugin(config.vendorName, filename)
  ).concat(DEBUG ? [] : [
    new webpack.optimize.CommonsChunkPlugin(config.inlineName, `${config.inlineName}.js`),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        warnings: false
      }
    }),
    new StatsWriterPlugin({ filename: `${config.statsName}.json` })
  ])
})

module.exports = webpackClientConfig
