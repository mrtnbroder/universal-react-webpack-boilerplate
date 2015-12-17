
var config = {
  // Port used by express
  expressPort: 8080,
  // Port used by the webpack-dev-server
  webpackDevServerPort: 2992,
  // temp dir created by webpack-dev-server
  webpackVirtualDir: '_tmp',
  // webpack + server
  host: 'localhost',
  // app.js
  appName: 'app',
  // vendor.js
  vendorName: 'vendor',

  getPublicPath: function getPublicPath() {
    return './public'
  },

  getDevPublicPath: function getDevPublicPath() {
    return 'http://' + config.host + ':' + config.webpackDevServerPort + '/'
          + config.webpackVirtualDir
  },

  getDevClientApp: function getDevClientApp() {
    return config.getDevPublicPath() + config.getClientApp()
  },

  getClientApp: function getClientApp() {
    return '/' + config.appName + '.js'
  },

  getDevClientVendor: function getDevClientVendor() {
    return config.getDevPublicPath() + config.getClientVendor()
  },

  getClientVendor: function getClientVendor() {
    return '/' + config.vendorName + '.js'
  }

}

module.exports = config
