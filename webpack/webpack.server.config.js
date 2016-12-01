/* eslint-disable no-undefined, object-shorthand */

const webpack = require('webpack')
const merge = require('lodash.merge')
const paths = require('../config/paths')
const { webpackConfig, cssLoader, postcssLoader } = require('./webpack.config.js')

const cssLoaderServer = Object.assign({}, cssLoader, { loader: 'css-loader/locals' })

//
// Server Config
// -----------------------------------------------------------------------------
const webpackServerConfig = merge({}, webpackConfig, {
  name: 'server',
  target: 'node',
  entry: './src/server',
  output: {
    filename: 'server.js',
    libraryTarget: 'commonjs2',
    path: paths.buildDir,
  },
  module: {
    loaders: webpackConfig.module.loaders.concat([{
      test: /\.css$/,
      loaders: [cssLoaderServer, postcssLoader],
      exclude: /node_modules/,
    }]),
  },
  plugins: webpackConfig.plugins.concat(
    new webpack.DefinePlugin({ __BROWSER__: false })
  ),
  node: {
    __dirname: false,
    __filename: false,
    Buffer: false,
    console: false,
    global: false,
    process: false,
  },
  externals: require('webpack-node-externals')(),
})

module.exports = webpackServerConfig
