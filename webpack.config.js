
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
var clientOutputPath = path.join(buildPath, 'client')
var serverOutputPath = path.join(buildPath, 'server')

var GLOBALS = {
  __DEV__: DEBUG,
  'process.env': {
    NODE_ENV: JSON.stringify(DEBUG ? 'development' : 'production')
  }
}

var plugins = [
  new webpack.NoErrorsPlugin(),
  new webpack.PrefetchPlugin('react'),
  new webpack.PrefetchPlugin('react/lib/ReactComponentBrowserEnvironment')
]

var aliases = {}

if (!DEBUG) {
  aliases['react-a11y'] = 'lodash/utility/noop'

  plugins.push(
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
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
          ? ['react-hot', 'babel-loader?stage=0']
          : ['babel-loader?stage=0'],
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
  entry: { app: DEBUG ? './app/app' : './build/client/app' },
  output: {
    path: clientOutputPath
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
  entry: { app: DEBUG ? './app/server' : './build/server/app' },
  output: {
    path: serverOutputPath,
    libraryTarget: 'commonjs2'
  },
  plugins: webpackConfig.plugins.concat(
    new webpack.DefinePlugin(_.assign({}, GLOBALS, { __BROWSER__: false }))
  ),
  externals: /^[a-z][a-z\.\-0-9]*$/
})

module.exports = [webpackClientConfig, webpackServerConfig]
