/* eslint-disable no-undefined, object-shorthand */

var path = require('path')
var webpack = require('webpack')
var merge = require('lodash.merge')
var config = require('../config')
var StatsWriterPlugin = require('webpack-stats-plugin').StatsWriterPlugin

var DEBUG = process.env.NODE_ENV !== 'production'

var buildPath = path.join(__dirname, '..', 'build')
var clientOutputPath = path.join(__dirname, '..', 'public')
var devClientOutputPath = path.join(__dirname, '..', config.tmpDir, 'client')
var serverOutputPath = path.join(buildPath, 'server')
var devServerOutputPath = path.join(__dirname, '..', config.tmpDir, 'server')

var GLOBALS = {
  '__DEV__': DEBUG,
  'process.env.NODE_ENV': JSON.stringify(DEBUG ? 'development' : 'production')
}

var plugins = [
  new webpack.NoErrorsPlugin(),
  new webpack.PrefetchPlugin('react'),
  new webpack.PrefetchPlugin('react-dom')
]

var filename = DEBUG ? '[name].js' : '[name].[chunkhash].js'

var webpackConfig = {
  cache: DEBUG,
  context: path.join(__dirname, '..'),
  bail: !DEBUG,
  debug: DEBUG,
  devtool: DEBUG ? 'eval' : undefined,
  output: {
    publicPath: DEBUG ? config.getDevPublicPath() + '/' : config.publicPath,
    filename: filename,
    chunkFilename: filename
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['transform-runtime']
        },
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    root: path.join(__dirname, '..', 'src'),
    extensions: [
      '',
      '.web.js',
      '.js',
      '.json',
      '.jsx'
    ]
  },
  resolveLoader: {
    root: path.join(__dirname, '..', 'node_modules')
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
  entry: {
    [config.appName]: './src/app',
    [config.vendorName]: [
      'history',
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'redux'
    ]
  },
  output: {
    path: DEBUG ? devClientOutputPath : clientOutputPath
  },
  plugins: webpackConfig.plugins.concat(
    new webpack.DefinePlugin(Object.assign({}, GLOBALS, { __BROWSER__: true })),
    new webpack.optimize.CommonsChunkPlugin(config.vendorName, filename)
  ).concat(DEBUG ? [] : [
    new webpack.optimize.CommonsChunkPlugin(config.inlineName, config.inlineName + '.js'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        warnings: false
      }
    }),
    new StatsWriterPlugin({ filename: config.statsName + '.json' })
  ])
})

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
    filename: '[name].js',
    path: DEBUG ? devServerOutputPath : serverOutputPath,
    libraryTarget: 'commonjs2'
  },
  plugins: webpackConfig.plugins.concat(
    new webpack.DefinePlugin(Object.assign({}, GLOBALS, { __BROWSER__: false }))
  ),
  externals: /^[a-z][a-z\.\-0-9]*$/
})

module.exports = {
  client: webpackClientConfig,
  server: webpackServerConfig
}
