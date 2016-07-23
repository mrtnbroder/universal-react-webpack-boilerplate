/* eslint-disable no-undefined, object-shorthand */

const config = require('../config/config')
const merge = require('webpack-merge')
const paths = require('../config/paths')
const StatsWriterPlugin = require('webpack-stats-plugin').StatsWriterPlugin
const webpack = require('webpack')
const webpackConfig = require('./webpack.config.js')
const DEBUG = config.DEBUG
const filename = DEBUG ? '[name].js' : '[name].[chunkhash].js'

//
// Client Config
// -----------------------------------------------------------------------------
const webpackClientConfig = merge(webpackConfig, {
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
      'redux-promise-middleware'
    ]
  },
  output: {
    chunkFilename: filename,
    filename: filename,
    path: paths.publicDir
  },
  module: {
    loaders: webpackConfig.module.loaders.concat([
      {
        test: /\.css$/,
        loader: `style!css?modules${ DEBUG ? '&localIdentName=[name]_[local]_[hash:base64:3]' : '' }!postcss`,
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
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      output: {
        comments: false
      },
      compress: {
        screw_ie8: true, // eslint-disable-line camelcase
        warnings: false
      }
    }),
    new StatsWriterPlugin({ filename: `${config.statsName}.json` })
  ])
})

module.exports = webpackClientConfig
