/* eslint-disable no-undefined, object-shorthand */

const config = require('../config/config')
const merge = require('lodash.merge')
const paths = require('../config/paths')
const StatsWriterPlugin = require('webpack-stats-plugin').StatsWriterPlugin
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')
const { webpackConfig, styleLoader, cssLoader, postcssLoader } = require('./webpack.config.js')
const { DEBUG } = config
const filename = DEBUG ? '[name].js' : '[name].[chunkhash].js'

const extractCSS = new ExtractTextPlugin({ filename: paths.styleSheet, allChunks: true })

//
// Client Config
// -----------------------------------------------------------------------------
const webpackClientConfig = merge({}, webpackConfig, {
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
      'redux-thunk',
    ],
  },
  output: {
    chunkFilename: filename,
    filename: filename,
    path: paths.publicDir,
  },
  module: {
    loaders: webpackConfig.module.loaders.concat([
      {
        test: /\.css$/,
        loaders: DEBUG
          ? [styleLoader, cssLoader, postcssLoader]
          : extractCSS.extract([cssLoader, postcssLoader]),
        exclude: /node_modules/,
      },
    ]),
  },
  plugins: webpackConfig.plugins.concat(
    new webpack.DefinePlugin({ __BROWSER__: true }),
    new webpack.optimize.CommonsChunkPlugin({
      name: config.vendorName,
      filename: filename,
    })
  ).concat(DEBUG ? [] : [
    extractCSS,
    new webpack.optimize.CommonsChunkPlugin({
      name: config.inlineName,
      filename: `${config.inlineName}.js`,
    }),
    new StatsWriterPlugin({ filename: `${config.statsName}.json` }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      output: {
        comments: false,
      },
      compress: {
        screw_ie8: true, // eslint-disable-line camelcase
        warnings: false,
      },
    }),
  ]),
})

module.exports = webpackClientConfig
