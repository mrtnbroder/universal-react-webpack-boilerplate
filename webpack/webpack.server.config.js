
const merge = require('lodash.merge')
const { distPath } = require('./env')
const { webpackConfig, cssLoader, postcssLoader } = require('./webpack.config')

const cssLoaderServer = Object.assign({}, cssLoader, { loader: 'css-loader/locals' })

//
// Server Config
// -----------------------------------------------------------------------------
const webpackServerConfig = merge({}, webpackConfig, {
  name: 'server',
  target: 'node',
  entry: './src/server',
  output: {
    filename: 'server.js',
    libraryTarget: 'commonjs2',
    path: distPath,
  },
  module: {
    rules: webpackConfig.module.rules.concat([{
      test: /\.css$/,
      use: [cssLoaderServer, postcssLoader],
      exclude: /node_modules/,
    }]),
  },
  node: {
    __dirname: false,
    __filename: false,
    Buffer: false,
    console: false,
    global: false,
    process: false,
  },
  externals: require('webpack-node-externals')(),
})

module.exports = webpackServerConfig
