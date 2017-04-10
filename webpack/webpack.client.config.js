
const { appName, cssName, inlineName, isDev, statsName, vendorName, srcPath } = require('./env')
const { webpackConfig, styleLoader, cssLoader, postcssLoader } = require('./webpack.config')
const { StatsWriterPlugin } = require('webpack-stats-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const merge = require('lodash.merge')
const webpack = require('webpack')

const filename = isDev ? '[name].js' : '[name].[chunkhash].js'
const extractCSS = new ExtractTextPlugin({
  filename: `${cssName}.[contenthash].css`,
  allChunks: true
})

//
// Client Config
// -----------------------------------------------------------------------------
const webpackClientConfig = merge({}, webpackConfig, {
  name: 'browser',
  target: 'web',
  entry: {
    [appName]: './src/client',
  },
  output: {
    chunkFilename: filename,
    filename,
  },
  module: {
    rules: webpackConfig.module.rules.concat([
      {
        test: /\.css$/,
        use: isDev
          ? [styleLoader, cssLoader, postcssLoader]
          : extractCSS.extract([cssLoader, postcssLoader]),
        include: srcPath,
      },
    ]),
  },
  plugins: webpackConfig.plugins.concat(
    new webpack.optimize.CommonsChunkPlugin({
      name: vendorName,
      filename,
      minChunks: (module) => /node_modules/.test(module.resource),
    })
  ).concat(isDev ? [] : [
    extractCSS,
    new webpack.optimize.CommonsChunkPlugin({
      name: inlineName,
      filename: `${inlineName}.js`,
    }),
    new StatsWriterPlugin({ filename: `${statsName}.json` }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        screw_ie8: true, // React doesn't support IE8
        warnings: false,
        unused: true,
        dead_code: true,
      },
      mangle: {
        screw_ie8: true,
      },
      output: {
        comments: false,
        screw_ie8: true,
      },
    }),
  ]),
})

module.exports = webpackClientConfig
