/* eslint-disable no-trailing-spaces, no-process-env, object-shorthand */

var path = require('path')
var webpack = require('webpack')
var merge = require('lodash').merge
var assign = require('lodash').assign
var config = require('./config')

var DEBUG = process.env.NODE_ENV !== 'production'

var buildPath = path.join(__dirname, 'build')
var clientOutputPath = path.join(__dirname, 'public')
var serverOutputPath = path.join(buildPath, 'server')
var devServerOutputPath = path.join(__dirname, '_tmp', 'server')

var GLOBALS = {
  __DEV__: DEBUG,
  'process.env.NODE_ENV': JSON.stringify(DEBUG ? 'development' : 'production')
}

var plugins = [
  new webpack.NoErrorsPlugin(),
  new webpack.PrefetchPlugin('react')
]

var aliases = {}

var webpackConfig = {
  cache: DEBUG,
  context: __dirname,
  bail: true,
  debug: DEBUG,
  devtool: DEBUG ? 'eval' : undefined,
  output: {
    publicPath: DEBUG ? config.getDevPublicPath() : config.getPublicPath(),
    filename: '[name].js',
    chunkFilename: '[id].[chunkhash].js'
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.(js|jsx)$/,
        loaders: DEBUG
          ? ['react-hot', 'babel-loader?stage=0&optional=runtime']
          : ['babel-loader?stage=0&optional=runtime'],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    root: path.join(__dirname, 'app'),
    extensions: [
      '',
      '.web.js',
      '.js',
      '.json',
      '.jsx'
    ],
    alias: aliases
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },
  plugins: plugins,
  devServer: {
    noInfo: true,
    quiet: true,
    host: config.host,
    port: config.webpackDevServerPort
  }
}

//
// Client Config
// -----------------------------------------------------------------------------
var webpackClientConfig = merge({}, webpackConfig, {
  name: 'browser',
  target: 'web',
  entry: { app: './app/app' },
  output: {
    path: clientOutputPath
  },
  plugins: webpackConfig.plugins.concat(
    new webpack.DefinePlugin(assign({}, GLOBALS, { __BROWSER__: true }))
  ).concat(DEBUG ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ])
})

//
// Server Config
// -----------------------------------------------------------------------------
var webpackServerConfig = merge({}, webpackConfig, {
  name: 'server',
  target: 'node',
  entry: { app: './app/server' },
  output: {
    path: DEBUG ? devServerOutputPath : serverOutputPath,
    libraryTarget: 'commonjs2'
  },
  plugins: webpackConfig.plugins.concat(
    new webpack.DefinePlugin(assign({}, GLOBALS, { __BROWSER__: false }))
  ),
  externals: /^[a-z][a-z\.\-0-9]*$/
})

module.exports = [webpackClientConfig, webpackServerConfig]
