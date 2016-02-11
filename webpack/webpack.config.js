/* eslint-disable no-undefined, object-shorthand */

var webpack = require('webpack')
var fs = require('fs')
var path = require('path')
var config = require('../config/config')
var paths = require('../config/paths')
var babelrc = JSON.parse(fs.readFileSync(path.join(paths.contextDir, '.babelrc'), 'utf-8'))
var DEBUG = config.DEBUG
var VERBOSE = false

var GLOBALS = {
  '__DEV__': DEBUG,
  'process.env.NODE_ENV': JSON.stringify(DEBUG ? 'development' : 'production')
}

var plugins = [
  new webpack.optimize.OccurrenceOrderPlugin(true),
  new webpack.NoErrorsPlugin(),
  new webpack.optimize.DedupePlugin(),
  new webpack.DefinePlugin(GLOBALS)
]

var webpackConfig = {
  cache: DEBUG,
  context: paths.contextDir,
  bail: !DEBUG,
  debug: DEBUG,
  devtool: DEBUG ? 'eval' : undefined,
  output: {
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel',
        query: {
          presets: babelrc.presets,
          plugins: babelrc.plugins.concat(DEBUG ? 'transform-runtime' : [])
        },
        exclude: /node_modules/
      }
    ]
  },
  postcss: [
    require('autoprefixer')
  ],
  resolve: {
    extensions: [
      '',
      '.web.js',
      '.js',
      '.json',
      '.jsx'
    ]
  },
  stats: {
    colors: true,
    reasons: DEBUG,
    hash: VERBOSE,
    version: VERBOSE,
    timings: true,
    chunks: VERBOSE,
    chunkModules: VERBOSE,
    cached: VERBOSE,
    cachedAssets: VERBOSE
  },
  plugins: plugins
}

module.exports = webpackConfig
