/* eslint-disable no-undefined, object-shorthand */

var webpack = require('webpack')
var fs = require('fs')
var path = require('path')
var config = require('../config')
var paths = require('../paths')
var babelrc = JSON.parse(fs.readFileSync(path.join(paths.contextDir, '.babelrc'), 'utf-8'))
var DEBUG = config.DEBUG

var GLOBALS = {
  '__DEV__': DEBUG,
  'process.env.NODE_ENV': JSON.stringify(DEBUG ? 'development' : 'production')
}

var plugins = [
  new webpack.NoErrorsPlugin(),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.OccurrenceOrderPlugin(true),
  new webpack.DefinePlugin(GLOBALS)
]

var webpackConfig = {
  cache: DEBUG,
  context: paths.contextDir,
  bail: !DEBUG,
  debug: DEBUG,
  devtool: DEBUG ? 'eval' : undefined,
  output: {
    publicPath: DEBUG ? `${paths.devPublicDir}/` : paths.publicDir
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel',
        query: {
          presets: babelrc.presets,
          plugins: babelrc.plugins.concat(DEBUG ? ['transform-runtime'] : [])
        },
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [
      '',
      '.web.js',
      '.js',
      '.json',
      '.jsx'
    ]
  },
  plugins: plugins,
  devServer: {
    noInfo: true,
    quiet: true,
    host: config.host,
    port: config.webpackDevServerPort
  }
}

module.exports = webpackConfig
