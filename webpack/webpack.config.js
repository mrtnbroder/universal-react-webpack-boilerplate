/* eslint-disable no-undefined, object-shorthand */

var webpack = require('webpack')
var merge = require('lodash.merge')
var config = require('../config')
var paths = require('../paths')
var StatsWriterPlugin = require('webpack-stats-plugin').StatsWriterPlugin
var DEBUG = config.DEBUG

var GLOBALS = {
  '__DEV__': DEBUG,
  'process.env.NODE_ENV': JSON.stringify(DEBUG ? 'development' : 'production')
}

var plugins = [
  new webpack.NoErrorsPlugin(),
  new webpack.PrefetchPlugin('react'),
  new webpack.PrefetchPlugin('react-dom'),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.OccurenceOrderPlugin(true)
]

var filename = DEBUG ? '[name].js' : '[name].[chunkhash].js'

var webpackConfig = {
  cache: DEBUG,
  context: paths.contextDir,
  bail: !DEBUG,
  debug: DEBUG,
  devtool: DEBUG ? 'eval' : undefined,
  output: {
    publicPath: DEBUG ? `${paths.devPublicDir}/` : paths.publicDir,
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

//
// Client Config
// -----------------------------------------------------------------------------
var webpackClientConfig = merge({}, webpackConfig, {
  name: 'browser',
  target: 'web',
  entry: {
    [config.appName]: './src/client',
    [config.vendorName]: [
      'history/lib/createBrowserHistory',
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'redux'
    ]
  },
  output: {
    path: DEBUG ? paths.devClientOutputDir : paths.clientOutputDir
  },
  plugins: webpackConfig.plugins.concat(
    new webpack.DefinePlugin(Object.assign({}, GLOBALS, { __BROWSER__: true })),
    new webpack.optimize.CommonsChunkPlugin(config.vendorName, filename)
  ).concat(DEBUG ? [] : [
    new webpack.optimize.CommonsChunkPlugin(config.inlineName, `${config.inlineName}.js`),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        warnings: false
      }
    }),
    new StatsWriterPlugin({ filename: `${config.statsName}.json` })
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
    path: DEBUG ? paths.devServerOutputDir : paths.serverOutputDir,
    libraryTarget: 'commonjs2'
  },
  plugins: webpackConfig.plugins.concat(
    new webpack.DefinePlugin(Object.assign({}, GLOBALS, { __BROWSER__: false }))
  ),
  node: {
    __dirname: true
  },
  externals: /^[a-z][a-z\.\-0-9]*$/
})

module.exports = {
  client: webpackClientConfig,
  server: webpackServerConfig
}
