/* eslint-disable no-undefined, object-shorthand */

const webpack = require('webpack')
const config = require('../config/config')
const merge = require('webpack-merge')
const paths = require('../config/paths')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpackConfig = require('./webpack.config.js')
const DEBUG = config.DEBUG
const STYLE = paths.styleSheet

//
// Server Config
// -----------------------------------------------------------------------------
const webpackServerConfig = merge(webpackConfig, {
  name: 'server',
  target: 'node',
  entry: './src/server',
  output: {
    filename: 'server.js',
    libraryTarget: 'commonjs2',
    path: paths.buildDir
  },
  module: {
    loaders: webpackConfig.module.loaders.concat([
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: DEBUG ? 'css?modules&localIdentName=[name]_[local]_[hash:base64:3]!postcss' : 'css?modules&minimize!postcss' }),
        exclude: /node_modules/
      }
    ])
  }, // paths.styleSheet, { allChunks: true }
  plugins: webpackConfig.plugins.concat(
    new webpack.DefinePlugin({ __BROWSER__: false }),
    new ExtractTextPlugin({ filename: 'public/style.css', disable: false, allChunks: true })
  ).concat(DEBUG ? [] : [
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
  ]),
  node: {
    __dirname: false,
    __filename: false,
    Buffer: false,
    console: false,
    global: false,
    process: false
  },
  externals: /^[a-z][a-z\.\-0-9]*$/
})

module.exports = webpackServerConfig
