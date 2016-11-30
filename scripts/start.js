
const merge = require('lodash.merge')
const browsersync = require('browser-sync')
const { appName, host, port } = require('../config/config')
const runServer = require('./runServer')
const webpack = require('webpack')
const webpackConfigs = require('../webpack')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackMiddleware = require('webpack-middleware')

function start() {
  const bs = browsersync.create()
  const configs = webpackConfigs.map(addHotMiddleware)
  const multicompiler = webpack(configs)
  const wpMiddleware = webpackMiddleware(multicompiler, {
    publicPath: configs[0].output.publicPath,
    stats: configs[0].stats,
  })
  const hotMiddlewares = createHotMiddlewares(multicompiler.compilers)
  const middlewares = [wpMiddleware, ...hotMiddlewares]
  const restartServer = runServer()

  return onPluginDone(multicompiler)
    .then(restartServer)
    .then(() => new Promise((resolve) => {
      multicompiler.plugin('done', restartServer)

      bs.init({
        notify: false,
        proxy: {
          target: `${host}:${port}`,
          middleware: middlewares,
        },
      }, resolve)
    }))
}

const onPluginDone = (multicompiler) => new Promise((resolve) => multicompiler.plugin('done', resolve))
const onlyBrowser = (x) => x.target === 'web'
const onlyBrowserCompiler = (compiler) => onlyBrowser(compiler.options)
const createHotMiddlewares = (compilers) => compilers.filter(onlyBrowserCompiler).map(webpackHotMiddleware)
const addHotMiddleware = (config) => {
  if (onlyBrowser(config)) {
    return merge({}, config, {
      entry: {
        [appName]: ['react-hot-loader/patch', 'webpack-hot-middleware/client?reload=true', config.entry[appName]],
      },
      plugins: [new webpack.HotModuleReplacementPlugin()],
    })
  }
  return config
}

module.exports = start
