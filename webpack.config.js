
var path = require('path')
var webpack = require('webpack')
var _ = require('lodash')
var defaults = require('./defaults')

var DEBUG = process.env.NODE_ENV !== 'production'
var SERVER = process.env.SERVER || true
var webpackConfig
var webpackClientConfig
var webpackServerConfig

var publicPath = SERVER
  ? 'http://' + defaults.host + ':' + defaults.webpackDevServerPort
  + '/' + defaults.webpackVirtualDir + '/'
  : '/' + defaults.webpackVirtualDir + '/'

var buildPath = path.join(__dirname, 'build')
var clientOutputPath = path.join(__dirname, 'public')
var devClientOutputPath = path.join(__dirname, '_tmp', 'client')
var serverOutputPath = path.join(buildPath, 'server')
var devServerOutputPath = path.join(__dirname, '_tmp', 'server')

var GLOBALS = {
  __DEV__: DEBUG,
  'process.env': {
    NODE_ENV: JSON.stringify(DEBUG ? 'development' : 'production')
  }
}

var plugins = [
  new webpack.NoErrorsPlugin(),
  new webpack.PrefetchPlugin('react')
]

var aliases = {}

if (!DEBUG) {
  plugins.push(
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  )
}

webpackConfig = {
  cache: DEBUG,
  context: __dirname,
  // bail: true,
  debug: DEBUG,
  devtool: DEBUG ? 'eval' : undefined,
  output: {
    publicPath: publicPath,
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
        // include: path.join(__dirname, 'app'),
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
      '.jsx'
    ],
    alias: aliases
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },
  plugins: plugins
}

//
// Client Config
// -----------------------------------------------------------------------------
webpackClientConfig = _.merge({}, webpackConfig, {
  name: 'browser',
  target: 'web',
  entry: { app: './app/app' },
  output: {
    path: DEBUG ? devClientOutputPath : clientOutputPath
  },
  plugins: webpackConfig.plugins.concat(
    new webpack.DefinePlugin(_.assign({}, GLOBALS, { __BROWSER__: true }))
  )
})

//
// Server Config
// -----------------------------------------------------------------------------
webpackServerConfig = _.merge({}, webpackConfig, {
  name: 'server',
  target: 'node',
  entry: { app: './app/server' },
  output: {
    path: DEBUG ? devServerOutputPath : serverOutputPath,
    libraryTarget: 'commonjs2'
  },
  plugins: webpackConfig.plugins.concat(
    new webpack.DefinePlugin(_.assign({}, GLOBALS, { __BROWSER__: false }))
  ),
  externals: /^[a-z][a-z\.\-0-9]*$/
})

module.exports = [webpackClientConfig, webpackServerConfig]
