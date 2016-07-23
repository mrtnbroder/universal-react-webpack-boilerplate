/* eslint-disable no-undefined, object-shorthand */

const path = require('path')
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
  new webpack.DefinePlugin(GLOBALS),
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
        exclude: /node_modules/,
        include: path.resolve('.')
      }, {
        test: /\.json$/,
        loaders: ['json-loader']
      }, {
        test: /\.eot(\?v=\d+.\d+.\d+)?$/,
        loader: 'file'
      }, {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff"
      }, {
        test: /\.ttf(\?v=\d+.\d+.\d+)?$/,
        loader: 'file-loader?limit=10000&mimetype=application/octet-stream'
      }, {
        test: /\.svg(\?v=\d+.\d+.\d+)?$/,
        loader: 'file-loader?limit=10000&mimetype=image/svg+xml'
      }, { test: /\.(jpe?g|png|gif)$/i,
        loaders: ['file']
      }, {
        test: /\.ico$/,
        loader: 'file-loader?name=[name].[ext]'
      },
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
