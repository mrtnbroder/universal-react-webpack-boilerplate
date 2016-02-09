/* eslint-disable no-undefined, object-shorthand */

var config = require('../config/config')
var merge = require('lodash.merge')
var paths = require('../config/paths')
var StatsWriterPlugin = require('webpack-stats-plugin').StatsWriterPlugin
var webpack = require('webpack')
var webpackConfig = require('./webpack.config.js')
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
    path: paths.publicDir
  },
  module: {
    loaders: webpackConfig.module.loaders.concat(DEBUG ? [
      {
        test: /\.css$/,
        loader: 'style!css-loader?modules!postcss',
        exclude: /node_modules/
      }
    ] : [
      {
        test: /\.css$/,
        loader: 'css/locals?modules!postcss',
        exclude: /node_modules/
      }
    ])
  },
  plugins: webpackConfig.plugins.concat(
    new webpack.DefinePlugin({ __BROWSER__: true }),
    new webpack.optimize.CommonsChunkPlugin({
      name: config.vendorName,
      filename: filename
    })
  ).concat(DEBUG ? [] : [
    new webpack.optimize.CommonsChunkPlugin({
      name: config.inlineName,
      filename: `${config.inlineName}.js`
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        screw_ie8: true, // eslint-disable-line camelcase
        warnings: false
      }
    }),
    new StatsWriterPlugin({ filename: `${config.statsName}.json` })
  ])
})

module.exports = webpackClientConfig
