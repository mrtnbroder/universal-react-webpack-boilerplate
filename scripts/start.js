
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

  return onPluginDone(bundler)
    .then(runServer)
    .then(startBrowserSync(middlewares))
}

const onPluginDone = b => new Promise(accept => b.plugin('done', accept))
const createHotMiddlewares = compilers => compilers.filter(onlyBrowserCompiler).map(webpackHotMiddleware)
const onlyBrowserCompiler = compiler => onlyBrowser(compiler.options)
const onlyBrowser = x => x.target === 'web'
const onlyBabel = x => x.loader === 'babel'
const addTransformQuery = () => {
  const query = {
    plugins: [
      ['react-transform', {
        transforms: [{
          transform: 'react-transform-hmr',
          imports: ['react'],
          locals: ['module']
        }]
      }]
    ]
  }

  return x => x.query = query
}
const addHotMiddleware = c => {
  c.entry[config.appName] = ['webpack-hot-middleware/client', c.entry[config.appName]]
  c.plugins.push(new webpack.HotModuleReplacementPlugin())
  c.module.loaders.filter(onlyBabel).forEach(addTransformQuery())
}
const startBrowserSync = middlewares => () => new Promise(accept => {
  const bs = browsersync.create()

  bs.init({
    proxy: {
      target: `${config.host}:${config.expressPort}`,
      middleware: middlewares
    }
  }, accept)
})

module.exports = start
