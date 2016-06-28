/* eslint-disable no-undefined, object-shorthand */

const webpack = require('webpack')
const config = require('../config/config')
const paths = require('../config/paths')
const DEBUG = config.DEBUG
const VERBOSE = false

const GLOBALS = {
  '__DEV__': DEBUG,
  'process.env.NODE_ENV': JSON.stringify(DEBUG ? 'development' : 'production')
}

const plugins = [
  new webpack.NoErrorsPlugin(),
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
          cacheDirectory: true
        },
        exclude: /node_modules/
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
    // assets: VERBOSE,
    cached: VERBOSE,
    cachedAssets: VERBOSE,
    children: VERBOSE,
    chunkModules: VERBOSE,
    chunks: VERBOSE,
    colors: true,
    // context: VERBOSE,
    hash: VERBOSE,
    modules: VERBOSE,
    reasons: VERBOSE,
    source: VERBOSE,
    timings: true,
    version: VERBOSE,
  },
  plugins: plugins
}

module.exports = webpackConfig
