/* eslint-disable no-undefined, object-shorthand */

const webpack = require('webpack')
const fs = require('fs')
const path = require('path')
const config = require('../config/config')
const paths = require('../config/paths')
// const babelrc = JSON.parse(fs.readFileSync(path.join(paths.contextDir, '.babelrc'), 'utf-8'))
const DEBUG = config.DEBUG
const VERBOSE = false

const GLOBALS = {
  '__DEV__': DEBUG,
  'process.env.NODE_ENV': JSON.stringify(DEBUG ? 'development' : 'production')
}

const plugins = [
  new webpack.NoErrorsPlugin(),
  // new webpack.optimize.OccurrenceOrderPlugin(true),
  // new webpack.optimize.DedupePlugin(),
  new webpack.DefinePlugin(GLOBALS)
]

const webpackConfig = {
  cache: DEBUG,
  context: paths.contextDir,
  bail: !DEBUG,
  debug: DEBUG,
  devtool: DEBUG ? 'eval' : undefined,
  output: {
    publicPath: '/',
    path: paths.publicDir
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
          // presets: babelrc.presets,
          // plugins: babelrc.plugins
        },
        exclude: [/node_modules/, /react-router-route-reducers/]
      }
    ]
  },
  postcss: [
    require('autoprefixer')({ browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'IE 10'] }),
  ],
  resolve: {
    modules: ['shared', 'node_modules'],
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
