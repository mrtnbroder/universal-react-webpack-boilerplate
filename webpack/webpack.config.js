/* eslint-disable no-undefined, object-shorthand */

const webpack = require('webpack')
const config = require('../config/config')
const paths = require('../config/paths')
const { DEBUG } = config

const GLOBALS = {
  '__DEV__': DEBUG,
  'process.env.NODE_ENV': JSON.stringify(DEBUG ? 'development' : 'production')
}

const plugins = [
  new webpack.NoErrorsPlugin(),
  new webpack.DefinePlugin(GLOBALS)
]

exports.styleLoader = 'style-loader'
exports.postcssLoader = 'postcss-loader'
exports.cssLoader = {
  loader: 'css-loader',
  query: {
    localIdentName: DEBUG ? '[name]_[local]_[hash:base64:3]' : '[hash:base64:5]',
    minimize: !DEBUG,
    modules: true,
    sourceMap: DEBUG,
  },
}

const webpackConfig = {
  cache: DEBUG,
  context: paths.contextDir,
  bail: !DEBUG,
  devtool: DEBUG ? 'cheap-eval-source-map' : undefined,
  output: {
    publicPath: '/',
    path: paths.publicDir,
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
          plugins: DEBUG ? ['react-hot-loader/babel'] : [],
        },
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    modules: ['shared', 'node_modules'],
    extensions: [
      '.web.js',
      '.js',
      '.json',
      '.jsx',
    ],
  },
  stats: 'errors-only',
  plugins: plugins,
}

exports.webpackConfig = webpackConfig
