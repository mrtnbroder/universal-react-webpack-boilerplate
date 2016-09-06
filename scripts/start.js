
const browsersync = require('browser-sync')
const config = require('../config/config')
const runServer = require('./runServer')
const webpack = require('webpack')
const webpackConfigs = require('../webpack')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackMiddleware = require('webpack-middleware')

function start() {
  webpackConfigs.filter(onlyBrowser).forEach(addHotMiddleware)
  const bundler = webpack(webpackConfigs)
  const wpMiddleware = webpackMiddleware(bundler, {
    publicPath: webpackConfigs[0].output.publicPath,
    stats: webpackConfigs[0].stats
  })
  const hotMiddlewares = createHotMiddlewares(bundler.compilers)
  const middlewares = [wpMiddleware, ...hotMiddlewares]
  const restartServer = runServer()

  return onPluginDone(bundler)
    .then(restartServer)
    .then(startBrowserSync(middlewares, bundler, restartServer))
}

const onPluginDone = (b) => new Promise((accept) => b.plugin('done', accept))
const createHotMiddlewares = (compilers) => compilers.filter(onlyBrowserCompiler).map(webpackHotMiddleware)
const onlyBrowserCompiler = (compiler) => onlyBrowser(compiler.options)
const onlyBrowser = (x) => x.target === 'web'
const addHotMiddleware = (c) => {
  c.entry[config.appName] = ['react-hot-loader/patch', 'webpack-hot-middleware/client', c.entry[config.appName]]
  c.plugins.push(new webpack.HotModuleReplacementPlugin())
}
const startBrowserSync = (middlewares, bundler, restartServer) =>
  () => new Promise((accept) => {
    const bs = browsersync.create()

    bundler.plugin('done', restartServer)

    bs.init({
      notify: false,
      proxy: {
        target: `${config.host}:${config.port}`,
        middleware: middlewares
      }
    }, accept)
  })

module.exports = start
