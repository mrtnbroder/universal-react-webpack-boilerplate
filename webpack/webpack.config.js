
const { isDev, contextPath, outputPath, srcPath } = require('./env')
const webpack = require('webpack')

const GLOBALS = {
  '__DEV__': isDev,
  'process.env.NODE_ENV': JSON.stringify(isDev ? 'development' : 'production')
}

const plugins = [
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.DefinePlugin(GLOBALS),
]

exports.styleLoader = 'style-loader'
exports.postcssLoader = {
  loader: 'postcss-loader',
  options: {
    plugins: [
      require('postcss-import'),
      require('postcss-cssnext'),
    ],
  },
}
exports.cssLoader = {
  loader: 'css-loader',
  options: {
    localIdentName: isDev ? '[name]_[local]_[hash:base64:3]' : '[hash:base64:5]',
    minimize: !isDev,
    modules: true,
    importLoaders: 1,
    sourceMap: isDev,
    // CSS Nano http://cssnano.co/options/
    discardComments: {
      removeAll: true,
    },
  },
}

const webpackConfig = {
  bail: !isDev,
  cache: isDev,
  context: contextPath,
  devtool: isDev && 'cheap-eval-source-map',
  output: {
    publicPath: '/',
    path: outputPath,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
        include: srcPath,
      },
    ],
  },
  stats: 'errors-only',
  plugins,
}

exports.webpackConfig = webpackConfig
